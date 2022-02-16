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
exports.CFFFont = void 0;

var _cff_parser = require("./cff_parser.js");

var _fonts_utils = require("./fonts_utils.js");

var _util = require("../shared/util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var CFFFont = /*#__PURE__*/function () {
  function CFFFont(file, properties) {
    _classCallCheck(this, CFFFont);

    this.properties = properties;
    var parser = new _cff_parser.CFFParser(file, properties, _fonts_utils.SEAC_ANALYSIS_ENABLED);
    this.cff = parser.parse();
    this.cff.duplicateFirstGlyph();
    var compiler = new _cff_parser.CFFCompiler(this.cff);
    this.seacs = this.cff.seacs;

    try {
      this.data = compiler.compile();
    } catch (e) {
      (0, _util.warn)("Failed to compile font " + properties.loadedName);
      this.data = file;
    }

    this._createBuiltInEncoding();
  }

  _createClass(CFFFont, [{
    key: "numGlyphs",
    get: function get() {
      return this.cff.charStrings.count;
    }
  }, {
    key: "getCharset",
    value: function getCharset() {
      return this.cff.charset.charset;
    }
  }, {
    key: "getGlyphMapping",
    value: function getGlyphMapping() {
      var cff = this.cff;
      var properties = this.properties;
      var charsets = cff.charset.charset;
      var charCodeToGlyphId;
      var glyphId;

      if (properties.composite) {
        charCodeToGlyphId = Object.create(null);
        var charCode;

        if (cff.isCIDFont) {
          for (glyphId = 0; glyphId < charsets.length; glyphId++) {
            var cid = charsets[glyphId];
            charCode = properties.cMap.charCodeOf(cid);
            charCodeToGlyphId[charCode] = glyphId;
          }
        } else {
          for (glyphId = 0; glyphId < cff.charStrings.count; glyphId++) {
            charCode = properties.cMap.charCodeOf(glyphId);
            charCodeToGlyphId[charCode] = glyphId;
          }
        }

        return charCodeToGlyphId;
      }

      var encoding = cff.encoding ? cff.encoding.encoding : null;

      if (properties.isInternalFont) {
        encoding = properties.defaultEncoding;
      }

      charCodeToGlyphId = (0, _fonts_utils.type1FontGlyphMapping)(properties, encoding, charsets);
      return charCodeToGlyphId;
    }
  }, {
    key: "hasGlyphId",
    value: function hasGlyphId(id) {
      return this.cff.hasGlyphId(id);
    }
  }, {
    key: "_createBuiltInEncoding",
    value: function _createBuiltInEncoding() {
      var _this$cff = this.cff,
          charset = _this$cff.charset,
          encoding = _this$cff.encoding;

      if (!charset || !encoding) {
        return;
      }

      var charsets = charset.charset,
          encodings = encoding.encoding;
      var map = [];

      for (var charCode in encodings) {
        var glyphId = encodings[charCode];

        if (glyphId >= 0) {
          var glyphName = charsets[glyphId];

          if (glyphName) {
            map[charCode] = glyphName;
          }
        }
      }

      if (map.length > 0) {
        this.properties.builtInEncoding = map;
      }
    }
  }]);

  return CFFFont;
}();

exports.CFFFont = CFFFont;