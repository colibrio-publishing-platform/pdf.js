/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2021 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetadataParser = void 0;

var _xml_parser = require("./xml_parser.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MetadataParser = /*#__PURE__*/function () {
  function MetadataParser(data) {
    _classCallCheck(this, MetadataParser);

    data = this._repair(data);
    var parser = new _xml_parser.SimpleXMLParser({
      lowerCaseName: true
    });
    var xmlDocument = parser.parseFromString(data);
    this._metadataMap = new Map();
    this._data = data;

    if (xmlDocument) {
      this._parse(xmlDocument);
    }
  }

  _createClass(MetadataParser, [{
    key: "_repair",
    value: function _repair(data) {
      return data.replace(/^[^<]+/, "").replace(/>\\376\\377([^<]+)/g, function (all, codes) {
        var bytes = codes.replace(/\\([0-3])([0-7])([0-7])/g, function (code, d1, d2, d3) {
          return String.fromCharCode(d1 * 64 + d2 * 8 + d3 * 1);
        }).replace(/&(amp|apos|gt|lt|quot);/g, function (str, name) {
          switch (name) {
            case "amp":
              return "&";

            case "apos":
              return "'";

            case "gt":
              return ">";

            case "lt":
              return "<";

            case "quot":
              return '"';
          }

          throw new Error("_repair: ".concat(name, " isn't defined."));
        });
        var charBuf = [];

        for (var i = 0, ii = bytes.length; i < ii; i += 2) {
          var code = bytes.charCodeAt(i) * 256 + bytes.charCodeAt(i + 1);

          if (code >= 32 && code < 127 && code !== 60 && code !== 62 && code !== 38) {
            charBuf.push(String.fromCharCode(code));
          } else {
            charBuf.push("&#x" + (0x10000 + code).toString(16).substring(1) + ";");
          }
        }

        return ">" + charBuf.join("");
      });
    }
  }, {
    key: "_getSequence",
    value: function _getSequence(entry) {
      var name = entry.nodeName;

      if (name !== "rdf:bag" && name !== "rdf:seq" && name !== "rdf:alt") {
        return null;
      }

      return entry.childNodes.filter(function (node) {
        return node.nodeName === "rdf:li";
      });
    }
  }, {
    key: "_parseArray",
    value: function _parseArray(entry) {
      if (!entry.hasChildNodes()) {
        return;
      }

      var _entry$childNodes = _slicedToArray(entry.childNodes, 1),
          seqNode = _entry$childNodes[0];

      var sequence = this._getSequence(seqNode) || [];

      this._metadataMap.set(entry.nodeName, sequence.map(function (node) {
        return node.textContent.trim();
      }));
    }
  }, {
    key: "_parse",
    value: function _parse(xmlDocument) {
      var rdf = xmlDocument.documentElement;

      if (rdf.nodeName !== "rdf:rdf") {
        rdf = rdf.firstChild;

        while (rdf && rdf.nodeName !== "rdf:rdf") {
          rdf = rdf.nextSibling;
        }
      }

      if (!rdf || rdf.nodeName !== "rdf:rdf" || !rdf.hasChildNodes()) {
        return;
      }

      var _iterator = _createForOfIteratorHelper(rdf.childNodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var desc = _step.value;

          if (desc.nodeName !== "rdf:description") {
            continue;
          }

          var _iterator2 = _createForOfIteratorHelper(desc.childNodes),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var entry = _step2.value;
              var name = entry.nodeName;

              switch (name) {
                case "#text":
                  continue;

                case "dc:creator":
                case "dc:subject":
                  this._parseArray(entry);

                  continue;
              }

              this._metadataMap.set(name, entry.textContent.trim());
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "serializable",
    get: function get() {
      return {
        parsedData: this._metadataMap,
        rawData: this._data
      };
    }
  }]);

  return MetadataParser;
}();

exports.MetadataParser = MetadataParser;