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
exports.FontFinder = void 0;
exports.getMetrics = getMetrics;
exports.selectFont = selectFont;

var _xfa_object = require("./xfa_object.js");

var _utils = require("./utils.js");

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

var FontFinder = /*#__PURE__*/function () {
  function FontFinder(pdfFonts) {
    _classCallCheck(this, FontFinder);

    this.fonts = new Map();
    this.cache = new Map();
    this.warned = new Set();
    this.defaultFont = null;
    this.add(pdfFonts);
  }

  _createClass(FontFinder, [{
    key: "add",
    value: function add(pdfFonts) {
      var reallyMissingFonts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var _iterator = _createForOfIteratorHelper(pdfFonts),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pdfFont = _step.value;
          this.addPdfFont(pdfFont);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(this.fonts.values()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _pdfFont = _step2.value;

          if (!_pdfFont.regular) {
            _pdfFont.regular = _pdfFont.italic || _pdfFont.bold || _pdfFont.bolditalic;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (!reallyMissingFonts || reallyMissingFonts.size === 0) {
        return;
      }

      var myriad = this.fonts.get("PdfJS-Fallback-PdfJS-XFA");

      var _iterator3 = _createForOfIteratorHelper(reallyMissingFonts),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var missing = _step3.value;
          this.fonts.set(missing, myriad);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "addPdfFont",
    value: function addPdfFont(pdfFont) {
      var cssFontInfo = pdfFont.cssFontInfo;
      var name = cssFontInfo.fontFamily;
      var font = this.fonts.get(name);

      if (!font) {
        font = Object.create(null);
        this.fonts.set(name, font);

        if (!this.defaultFont) {
          this.defaultFont = font;
        }
      }

      var property = "";
      var fontWeight = parseFloat(cssFontInfo.fontWeight);

      if (parseFloat(cssFontInfo.italicAngle) !== 0) {
        property = fontWeight >= 700 ? "bolditalic" : "italic";
      } else if (fontWeight >= 700) {
        property = "bold";
      }

      if (!property) {
        if (pdfFont.name.includes("Bold") || pdfFont.psName && pdfFont.psName.includes("Bold")) {
          property = "bold";
        }

        if (pdfFont.name.includes("Italic") || pdfFont.name.endsWith("It") || pdfFont.psName && (pdfFont.psName.includes("Italic") || pdfFont.psName.endsWith("It"))) {
          property += "italic";
        }
      }

      if (!property) {
        property = "regular";
      }

      font[property] = pdfFont;
    }
  }, {
    key: "getDefault",
    value: function getDefault() {
      return this.defaultFont;
    }
  }, {
    key: "find",
    value: function find(fontName) {
      var mustWarn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var font = this.fonts.get(fontName) || this.cache.get(fontName);

      if (font) {
        return font;
      }

      var pattern = /,|-|_| |bolditalic|bold|italic|regular|it/gi;
      var name = fontName.replace(pattern, "");
      font = this.fonts.get(name);

      if (font) {
        this.cache.set(fontName, font);
        return font;
      }

      name = name.toLowerCase();
      var maybe = [];

      var _iterator4 = _createForOfIteratorHelper(this.fonts.entries()),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              _family = _step4$value[0],
              _pdfFont4 = _step4$value[1];

          if (_family.replace(pattern, "").toLowerCase().startsWith(name)) {
            maybe.push(_pdfFont4);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (maybe.length === 0) {
        var _iterator5 = _createForOfIteratorHelper(this.fonts.entries()),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _step5$value = _slicedToArray(_step5.value, 2),
                pdfFont = _step5$value[1];

            if (pdfFont.regular.name && pdfFont.regular.name.replace(pattern, "").toLowerCase().startsWith(name)) {
              maybe.push(pdfFont);
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }

      if (maybe.length === 0) {
        name = name.replace(/psmt|mt/gi, "");

        var _iterator6 = _createForOfIteratorHelper(this.fonts.entries()),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _step6$value = _slicedToArray(_step6.value, 2),
                family = _step6$value[0],
                _pdfFont2 = _step6$value[1];

            if (family.replace(pattern, "").toLowerCase().startsWith(name)) {
              maybe.push(_pdfFont2);
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }

      if (maybe.length === 0) {
        var _iterator7 = _createForOfIteratorHelper(this.fonts.values()),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _pdfFont3 = _step7.value;

            if (_pdfFont3.regular.name && _pdfFont3.regular.name.replace(pattern, "").toLowerCase().startsWith(name)) {
              maybe.push(_pdfFont3);
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }

      if (maybe.length >= 1) {
        if (maybe.length !== 1 && mustWarn) {
          (0, _util.warn)("XFA - Too many choices to guess the correct font: ".concat(fontName));
        }

        this.cache.set(fontName, maybe[0]);
        return maybe[0];
      }

      if (mustWarn && !this.warned.has(fontName)) {
        this.warned.add(fontName);
        (0, _util.warn)("XFA - Cannot find the font: ".concat(fontName));
      }

      return null;
    }
  }]);

  return FontFinder;
}();

exports.FontFinder = FontFinder;

function selectFont(xfaFont, typeface) {
  if (xfaFont.posture === "italic") {
    if (xfaFont.weight === "bold") {
      return typeface.bolditalic;
    }

    return typeface.italic;
  } else if (xfaFont.weight === "bold") {
    return typeface.bold;
  }

  return typeface.regular;
}

function getMetrics(xfaFont) {
  var real = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var pdfFont = null;

  if (xfaFont) {
    var name = (0, _utils.stripQuotes)(xfaFont.typeface);

    var typeface = xfaFont[_xfa_object.$globalData].fontFinder.find(name);

    pdfFont = selectFont(xfaFont, typeface);
  }

  if (!pdfFont) {
    return {
      lineHeight: 12,
      lineGap: 2,
      lineNoGap: 10
    };
  }

  var size = xfaFont.size || 10;
  var lineHeight = pdfFont.lineHeight ? Math.max(real ? 0 : 1.2, pdfFont.lineHeight) : 1.2;
  var lineGap = pdfFont.lineGap === undefined ? 0.2 : pdfFont.lineGap;
  return {
    lineHeight: lineHeight * size,
    lineGap: lineGap * size,
    lineNoGap: Math.max(1, lineHeight - lineGap) * size
  };
}