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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XFAParser = void 0;

var _xfa_object = require("./xfa_object.js");

var _xml_parser = require("../xml_parser.js");

var _builder = require("./builder.js");

var _util = require("../../shared/util.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var XFAParser = /*#__PURE__*/function (_XMLParserBase) {
  _inherits(XFAParser, _XMLParserBase);

  var _super = _createSuper(XFAParser);

  function XFAParser() {
    var _this;

    var rootNameSpace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var richText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, XFAParser);

    _this = _super.call(this);
    _this._builder = new _builder.Builder(rootNameSpace);
    _this._stack = [];
    _this._globalData = {
      usedTypefaces: new Set()
    };
    _this._ids = new Map();
    _this._current = _this._builder.buildRoot(_this._ids);
    _this._errorCode = _xml_parser.XMLParserErrorCode.NoError;
    _this._whiteRegex = /^\s+$/;
    _this._nbsps = /\xa0+/g;
    _this._richText = richText;
    return _this;
  }

  _createClass(XFAParser, [{
    key: "parse",
    value: function parse(data) {
      this.parseXml(data);

      if (this._errorCode !== _xml_parser.XMLParserErrorCode.NoError) {
        return undefined;
      }

      this._current[_xfa_object.$finalize]();

      return this._current.element;
    }
  }, {
    key: "onText",
    value: function onText(text) {
      text = text.replace(this._nbsps, function (match) {
        return match.slice(1) + " ";
      });

      if (this._richText || this._current[_xfa_object.$acceptWhitespace]()) {
        this._current[_xfa_object.$onText](text, this._richText);

        return;
      }

      if (this._whiteRegex.test(text)) {
        return;
      }

      this._current[_xfa_object.$onText](text.trim());
    }
  }, {
    key: "onCdata",
    value: function onCdata(text) {
      this._current[_xfa_object.$onText](text);
    }
  }, {
    key: "_mkAttributes",
    value: function _mkAttributes(attributes, tagName) {
      var namespace = null;
      var prefixes = null;
      var attributeObj = Object.create({});

      var _iterator = _createForOfIteratorHelper(attributes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _step.value,
              name = _step$value.name,
              value = _step$value.value;

          if (name === "xmlns") {
            if (!namespace) {
              namespace = value;
            } else {
              (0, _util.warn)("XFA - multiple namespace definition in <".concat(tagName, ">"));
            }
          } else if (name.startsWith("xmlns:")) {
            var prefix = name.substring("xmlns:".length);

            if (!prefixes) {
              prefixes = [];
            }

            prefixes.push({
              prefix: prefix,
              value: value
            });
          } else {
            var i = name.indexOf(":");

            if (i === -1) {
              attributeObj[name] = value;
            } else {
              var nsAttrs = attributeObj[_xfa_object.$nsAttributes];

              if (!nsAttrs) {
                nsAttrs = attributeObj[_xfa_object.$nsAttributes] = Object.create(null);
              }

              var _ref = [name.slice(0, i), name.slice(i + 1)],
                  ns = _ref[0],
                  attrName = _ref[1];
              var attrs = nsAttrs[ns];

              if (!attrs) {
                attrs = nsAttrs[ns] = Object.create(null);
              }

              attrs[attrName] = value;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return [namespace, prefixes, attributeObj];
    }
  }, {
    key: "_getNameAndPrefix",
    value: function _getNameAndPrefix(name, nsAgnostic) {
      var i = name.indexOf(":");

      if (i === -1) {
        return [name, null];
      }

      return [name.substring(i + 1), nsAgnostic ? "" : name.substring(0, i)];
    }
  }, {
    key: "onBeginElement",
    value: function onBeginElement(tagName, attributes, isEmpty) {
      var _this$_mkAttributes = this._mkAttributes(attributes, tagName),
          _this$_mkAttributes2 = _slicedToArray(_this$_mkAttributes, 3),
          namespace = _this$_mkAttributes2[0],
          prefixes = _this$_mkAttributes2[1],
          attributesObj = _this$_mkAttributes2[2];

      var _this$_getNameAndPref = this._getNameAndPrefix(tagName, this._builder.isNsAgnostic()),
          _this$_getNameAndPref2 = _slicedToArray(_this$_getNameAndPref, 2),
          name = _this$_getNameAndPref2[0],
          nsPrefix = _this$_getNameAndPref2[1];

      var node = this._builder.build({
        nsPrefix: nsPrefix,
        name: name,
        attributes: attributesObj,
        namespace: namespace,
        prefixes: prefixes
      });

      node[_xfa_object.$globalData] = this._globalData;

      if (isEmpty) {
        node[_xfa_object.$finalize]();

        if (this._current[_xfa_object.$onChild](node)) {
          node[_xfa_object.$setId](this._ids);
        }

        node[_xfa_object.$clean](this._builder);

        return;
      }

      this._stack.push(this._current);

      this._current = node;
    }
  }, {
    key: "onEndElement",
    value: function onEndElement(name) {
      var node = this._current;

      if (node[_xfa_object.$isCDATAXml]() && typeof node[_xfa_object.$content] === "string") {
        var parser = new XFAParser();
        parser._globalData = this._globalData;
        var root = parser.parse(node[_xfa_object.$content]);
        node[_xfa_object.$content] = null;

        node[_xfa_object.$onChild](root);
      }

      node[_xfa_object.$finalize]();

      this._current = this._stack.pop();

      if (this._current[_xfa_object.$onChild](node)) {
        node[_xfa_object.$setId](this._ids);
      }

      node[_xfa_object.$clean](this._builder);
    }
  }, {
    key: "onError",
    value: function onError(code) {
      this._errorCode = code;
    }
  }]);

  return XFAParser;
}(_xml_parser.XMLParserBase);

exports.XFAParser = XFAParser;