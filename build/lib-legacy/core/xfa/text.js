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
exports.TextMeasure = void 0;

var _fonts = require("./fonts.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var WIDTH_FACTOR = 1.02;

var FontInfo = /*#__PURE__*/function () {
  function FontInfo(xfaFont, margin, lineHeight, fontFinder) {
    _classCallCheck(this, FontInfo);

    this.lineHeight = lineHeight;
    this.paraMargin = margin || {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    if (!xfaFont) {
      var _this$defaultFont = this.defaultFont(fontFinder);

      var _this$defaultFont2 = _slicedToArray(_this$defaultFont, 2);

      this.pdfFont = _this$defaultFont2[0];
      this.xfaFont = _this$defaultFont2[1];
      return;
    }

    this.xfaFont = {
      typeface: xfaFont.typeface,
      posture: xfaFont.posture,
      weight: xfaFont.weight,
      size: xfaFont.size,
      letterSpacing: xfaFont.letterSpacing
    };
    var typeface = fontFinder.find(xfaFont.typeface);

    if (!typeface) {
      var _this$defaultFont3 = this.defaultFont(fontFinder);

      var _this$defaultFont4 = _slicedToArray(_this$defaultFont3, 2);

      this.pdfFont = _this$defaultFont4[0];
      this.xfaFont = _this$defaultFont4[1];
      return;
    }

    this.pdfFont = (0, _fonts.selectFont)(xfaFont, typeface);

    if (!this.pdfFont) {
      var _this$defaultFont5 = this.defaultFont(fontFinder);

      var _this$defaultFont6 = _slicedToArray(_this$defaultFont5, 2);

      this.pdfFont = _this$defaultFont6[0];
      this.xfaFont = _this$defaultFont6[1];
    }
  }

  _createClass(FontInfo, [{
    key: "defaultFont",
    value: function defaultFont(fontFinder) {
      var font = fontFinder.find("Helvetica", false) || fontFinder.find("Myriad Pro", false) || fontFinder.find("Arial", false) || fontFinder.getDefault();

      if (font && font.regular) {
        var pdfFont = font.regular;
        var info = pdfFont.cssFontInfo;
        var _xfaFont = {
          typeface: info.fontFamily,
          posture: "normal",
          weight: "normal",
          size: 10,
          letterSpacing: 0
        };
        return [pdfFont, _xfaFont];
      }

      var xfaFont = {
        typeface: "Courier",
        posture: "normal",
        weight: "normal",
        size: 10,
        letterSpacing: 0
      };
      return [null, xfaFont];
    }
  }]);

  return FontInfo;
}();

var FontSelector = /*#__PURE__*/function () {
  function FontSelector(defaultXfaFont, defaultParaMargin, defaultLineHeight, fontFinder) {
    _classCallCheck(this, FontSelector);

    this.fontFinder = fontFinder;
    this.stack = [new FontInfo(defaultXfaFont, defaultParaMargin, defaultLineHeight, fontFinder)];
  }

  _createClass(FontSelector, [{
    key: "pushData",
    value: function pushData(xfaFont, margin, lineHeight) {
      var lastFont = this.stack[this.stack.length - 1];

      for (var _i2 = 0, _arr2 = ["typeface", "posture", "weight", "size", "letterSpacing"]; _i2 < _arr2.length; _i2++) {
        var name = _arr2[_i2];

        if (!xfaFont[name]) {
          xfaFont[name] = lastFont.xfaFont[name];
        }
      }

      for (var _i3 = 0, _arr3 = ["top", "bottom", "left", "right"]; _i3 < _arr3.length; _i3++) {
        var _name = _arr3[_i3];

        if (isNaN(margin[_name])) {
          margin[_name] = lastFont.paraMargin[_name];
        }
      }

      var fontInfo = new FontInfo(xfaFont, margin, lineHeight || lastFont.lineHeight, this.fontFinder);

      if (!fontInfo.pdfFont) {
        fontInfo.pdfFont = lastFont.pdfFont;
      }

      this.stack.push(fontInfo);
    }
  }, {
    key: "popFont",
    value: function popFont() {
      this.stack.pop();
    }
  }, {
    key: "topFont",
    value: function topFont() {
      return this.stack[this.stack.length - 1];
    }
  }]);

  return FontSelector;
}();

var TextMeasure = /*#__PURE__*/function () {
  function TextMeasure(defaultXfaFont, defaultParaMargin, defaultLineHeight, fonts) {
    _classCallCheck(this, TextMeasure);

    this.glyphs = [];
    this.fontSelector = new FontSelector(defaultXfaFont, defaultParaMargin, defaultLineHeight, fonts);
    this.extraHeight = 0;
  }

  _createClass(TextMeasure, [{
    key: "pushData",
    value: function pushData(xfaFont, margin, lineHeight) {
      this.fontSelector.pushData(xfaFont, margin, lineHeight);
    }
  }, {
    key: "popFont",
    value: function popFont(xfaFont) {
      return this.fontSelector.popFont();
    }
  }, {
    key: "addPara",
    value: function addPara() {
      var lastFont = this.fontSelector.topFont();
      this.extraHeight += lastFont.paraMargin.top + lastFont.paraMargin.bottom;
    }
  }, {
    key: "addString",
    value: function addString(str) {
      if (!str) {
        return;
      }

      var lastFont = this.fontSelector.topFont();
      var fontSize = lastFont.xfaFont.size;

      if (lastFont.pdfFont) {
        var letterSpacing = lastFont.xfaFont.letterSpacing;
        var pdfFont = lastFont.pdfFont;
        var fontLineHeight = pdfFont.lineHeight || 1.2;
        var lineHeight = lastFont.lineHeight || Math.max(1.2, fontLineHeight) * fontSize;
        var lineGap = pdfFont.lineGap === undefined ? 0.2 : pdfFont.lineGap;
        var noGap = fontLineHeight - lineGap;
        var firstLineHeight = Math.max(1, noGap) * fontSize;
        var scale = fontSize / 1000;
        var fallbackWidth = pdfFont.defaultWidth || pdfFont.charsToGlyphs(" ")[0].width;

        var _iterator = _createForOfIteratorHelper(str.split(/[\u2029\n]/)),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var line = _step.value;
            var encodedLine = pdfFont.encodeString(line).join("");
            var glyphs = pdfFont.charsToGlyphs(encodedLine);

            var _iterator2 = _createForOfIteratorHelper(glyphs),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var glyph = _step2.value;
                var width = glyph.width || fallbackWidth;
                this.glyphs.push([width * scale + letterSpacing, lineHeight, firstLineHeight, glyph.unicode, false]);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            this.glyphs.push([0, 0, 0, "\n", true]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        this.glyphs.pop();
        return;
      }

      var _iterator3 = _createForOfIteratorHelper(str.split(/[\u2029\n]/)),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _line = _step3.value;

          var _iterator4 = _createForOfIteratorHelper(_line.split("")),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _char = _step4.value;
              this.glyphs.push([fontSize, 1.2 * fontSize, fontSize, _char, false]);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          this.glyphs.push([0, 0, 0, "\n", true]);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.glyphs.pop();
    }
  }, {
    key: "compute",
    value: function compute(maxWidth) {
      var lastSpacePos = -1,
          lastSpaceWidth = 0,
          width = 0,
          height = 0,
          currentLineWidth = 0,
          currentLineHeight = 0;
      var isBroken = false;
      var isFirstLine = true;

      for (var i = 0, ii = this.glyphs.length; i < ii; i++) {
        var _this$glyphs$i = _slicedToArray(this.glyphs[i], 5),
            glyphWidth = _this$glyphs$i[0],
            lineHeight = _this$glyphs$i[1],
            firstLineHeight = _this$glyphs$i[2],
            _char2 = _this$glyphs$i[3],
            isEOL = _this$glyphs$i[4];

        var isSpace = _char2 === " ";
        var glyphHeight = isFirstLine ? firstLineHeight : lineHeight;

        if (isEOL) {
          width = Math.max(width, currentLineWidth);
          currentLineWidth = 0;
          height += currentLineHeight;
          currentLineHeight = glyphHeight;
          lastSpacePos = -1;
          lastSpaceWidth = 0;
          isFirstLine = false;
          continue;
        }

        if (isSpace) {
          if (currentLineWidth + glyphWidth > maxWidth) {
            width = Math.max(width, currentLineWidth);
            currentLineWidth = 0;
            height += currentLineHeight;
            currentLineHeight = glyphHeight;
            lastSpacePos = -1;
            lastSpaceWidth = 0;
            isBroken = true;
            isFirstLine = false;
          } else {
            currentLineHeight = Math.max(glyphHeight, currentLineHeight);
            lastSpaceWidth = currentLineWidth;
            currentLineWidth += glyphWidth;
            lastSpacePos = i;
          }

          continue;
        }

        if (currentLineWidth + glyphWidth > maxWidth) {
          height += currentLineHeight;
          currentLineHeight = glyphHeight;

          if (lastSpacePos !== -1) {
            i = lastSpacePos;
            width = Math.max(width, lastSpaceWidth);
            currentLineWidth = 0;
            lastSpacePos = -1;
            lastSpaceWidth = 0;
          } else {
            width = Math.max(width, currentLineWidth);
            currentLineWidth = glyphWidth;
          }

          isBroken = true;
          isFirstLine = false;
          continue;
        }

        currentLineWidth += glyphWidth;
        currentLineHeight = Math.max(glyphHeight, currentLineHeight);
      }

      width = Math.max(width, currentLineWidth);
      height += currentLineHeight + this.extraHeight;
      return {
        width: WIDTH_FACTOR * width,
        height: height,
        isBroken: isBroken
      };
    }
  }]);

  return TextMeasure;
}();

exports.TextMeasure = TextMeasure;