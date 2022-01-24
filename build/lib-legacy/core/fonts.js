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
exports.Font = exports.ErrorFont = void 0;

var _util = require("../shared/util.js");

var _cff_parser = require("./cff_parser.js");

var _fonts_utils = require("./fonts_utils.js");

var _glyphlist = require("./glyphlist.js");

var _encodings = require("./encodings.js");

var _standard_fonts = require("./standard_fonts.js");

var _unicode = require("./unicode.js");

var _to_unicode_map = require("./to_unicode_map.js");

var _cff_font = require("./cff_font.js");

var _font_renderer = require("./font_renderer.js");

var _glyf = require("./glyf.js");

var _cmap = require("./cmap.js");

var _opentype_file_builder = require("./opentype_file_builder.js");

var _core_utils = require("./core_utils.js");

var _stream = require("./stream.js");

var _type1_font = require("./type1_font.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PRIVATE_USE_AREAS = [[0xe000, 0xf8ff], [0x100000, 0x10fffd]];
var PDF_GLYPH_SPACE_UNITS = 1000;
var EXPORT_DATA_PROPERTIES = ["ascent", "bbox", "black", "bold", "charProcOperatorList", "composite", "cssFontInfo", "data", "defaultVMetrics", "defaultWidth", "descent", "fallbackName", "fontMatrix", "fontType", "isType3Font", "italic", "loadedName", "mimetype", "missingFile", "name", "remeasure", "subtype", "type", "vertical"];
var EXPORT_DATA_EXTRA_PROPERTIES = ["cMap", "defaultEncoding", "differences", "isMonospace", "isSerifFont", "isSymbolicFont", "seacMap", "toFontChar", "toUnicode", "vmetrics", "widths"];

function adjustWidths(properties) {
  if (!properties.fontMatrix) {
    return;
  }

  if (properties.fontMatrix[0] === _util.FONT_IDENTITY_MATRIX[0]) {
    return;
  }

  var scale = 0.001 / properties.fontMatrix[0];
  var glyphsWidths = properties.widths;

  for (var glyph in glyphsWidths) {
    glyphsWidths[glyph] *= scale;
  }

  properties.defaultWidth *= scale;
}

function adjustToUnicode(properties, builtInEncoding) {
  if (properties.isInternalFont) {
    return;
  }

  if (builtInEncoding === properties.defaultEncoding) {
    return;
  }

  if (properties.toUnicode instanceof _to_unicode_map.IdentityToUnicodeMap) {
    return;
  }

  var toUnicode = [],
      glyphsUnicodeMap = (0, _glyphlist.getGlyphsUnicode)();

  for (var charCode in builtInEncoding) {
    if (properties.hasIncludedToUnicodeMap) {
      if (properties.toUnicode.has(charCode)) {
        continue;
      }
    } else if (properties.hasEncoding) {
      if (properties.differences.length === 0 || properties.differences[charCode] !== undefined) {
        continue;
      }
    }

    var glyphName = builtInEncoding[charCode];
    var unicode = (0, _unicode.getUnicodeForGlyph)(glyphName, glyphsUnicodeMap);

    if (unicode !== -1) {
      toUnicode[charCode] = String.fromCharCode(unicode);
    }
  }

  if (toUnicode.length > 0) {
    properties.toUnicode.amend(toUnicode);
  }
}

function amendFallbackToUnicode(properties) {
  if (!properties.fallbackToUnicode) {
    return;
  }

  if (properties.toUnicode instanceof _to_unicode_map.IdentityToUnicodeMap) {
    return;
  }

  var toUnicode = [];

  for (var charCode in properties.fallbackToUnicode) {
    if (properties.toUnicode.has(charCode)) {
      continue;
    }

    toUnicode[charCode] = properties.fallbackToUnicode[charCode];
  }

  if (toUnicode.length > 0) {
    properties.toUnicode.amend(toUnicode);
  }
}

var Glyph = /*#__PURE__*/function () {
  function Glyph(originalCharCode, fontChar, unicode, accent, width, vmetric, operatorListId, isSpace, isInFont) {
    _classCallCheck(this, Glyph);

    this.originalCharCode = originalCharCode;
    this.fontChar = fontChar;
    this.unicode = unicode;
    this.accent = accent;
    this.width = width;
    this.vmetric = vmetric;
    this.operatorListId = operatorListId;
    this.isSpace = isSpace;
    this.isInFont = isInFont;
  }

  _createClass(Glyph, [{
    key: "matchesForCache",
    value: function matchesForCache(originalCharCode, fontChar, unicode, accent, width, vmetric, operatorListId, isSpace, isInFont) {
      return this.originalCharCode === originalCharCode && this.fontChar === fontChar && this.unicode === unicode && this.accent === accent && this.width === width && this.vmetric === vmetric && this.operatorListId === operatorListId && this.isSpace === isSpace && this.isInFont === isInFont;
    }
  }]);

  return Glyph;
}();

function int16(b0, b1) {
  return (b0 << 8) + b1;
}

function writeSignedInt16(bytes, index, value) {
  bytes[index + 1] = value;
  bytes[index] = value >>> 8;
}

function signedInt16(b0, b1) {
  var value = (b0 << 8) + b1;
  return value & 1 << 15 ? value - 0x10000 : value;
}

function int32(b0, b1, b2, b3) {
  return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
}

function string16(value) {
  (0, _util.assert)(typeof value === "number" && Math.abs(value) < Math.pow(2, 16), "string16: Unexpected input \"".concat(value, "\"."));
  return String.fromCharCode(value >> 8 & 0xff, value & 0xff);
}

function safeString16(value) {
  (0, _util.assert)(typeof value === "number" && !Number.isNaN(value), "safeString16: Unexpected input \"".concat(value, "\"."));

  if (value > 0x7fff) {
    value = 0x7fff;
  } else if (value < -0x8000) {
    value = -0x8000;
  }

  return String.fromCharCode(value >> 8 & 0xff, value & 0xff);
}

function isTrueTypeFile(file) {
  var header = file.peekBytes(4);
  return (0, _core_utils.readUint32)(header, 0) === 0x00010000 || (0, _util.bytesToString)(header) === "true";
}

function isTrueTypeCollectionFile(file) {
  var header = file.peekBytes(4);
  return (0, _util.bytesToString)(header) === "ttcf";
}

function isOpenTypeFile(file) {
  var header = file.peekBytes(4);
  return (0, _util.bytesToString)(header) === "OTTO";
}

function isType1File(file) {
  var header = file.peekBytes(2);

  if (header[0] === 0x25 && header[1] === 0x21) {
    return true;
  }

  if (header[0] === 0x80 && header[1] === 0x01) {
    return true;
  }

  return false;
}

function isCFFFile(file) {
  var header = file.peekBytes(4);

  if (header[0] >= 1 && header[3] >= 1 && header[3] <= 4) {
    return true;
  }

  return false;
}

function getFontFileType(file, _ref) {
  var type = _ref.type,
      subtype = _ref.subtype,
      composite = _ref.composite;
  var fileType, fileSubtype;

  if (isTrueTypeFile(file) || isTrueTypeCollectionFile(file)) {
    if (composite) {
      fileType = "CIDFontType2";
    } else {
      fileType = "TrueType";
    }
  } else if (isOpenTypeFile(file)) {
    if (composite) {
      fileType = "CIDFontType2";
    } else {
      fileType = "OpenType";
    }
  } else if (isType1File(file)) {
    if (composite) {
      fileType = "CIDFontType0";
    } else {
      fileType = type === "MMType1" ? "MMType1" : "Type1";
    }
  } else if (isCFFFile(file)) {
    if (composite) {
      fileType = "CIDFontType0";
      fileSubtype = "CIDFontType0C";
    } else {
      fileType = type === "MMType1" ? "MMType1" : "Type1";
      fileSubtype = "Type1C";
    }
  } else {
    (0, _util.warn)("getFontFileType: Unable to detect correct font file Type/Subtype.");
    fileType = type;
    fileSubtype = subtype;
  }

  return [fileType, fileSubtype];
}

function applyStandardFontGlyphMap(map, glyphMap) {
  for (var charCode in glyphMap) {
    map[+charCode] = glyphMap[charCode];
  }
}

function buildToFontChar(encoding, glyphsUnicodeMap, differences) {
  var toFontChar = [];
  var unicode;

  for (var i = 0, ii = encoding.length; i < ii; i++) {
    unicode = (0, _unicode.getUnicodeForGlyph)(encoding[i], glyphsUnicodeMap);

    if (unicode !== -1) {
      toFontChar[i] = unicode;
    }
  }

  for (var charCode in differences) {
    unicode = (0, _unicode.getUnicodeForGlyph)(differences[charCode], glyphsUnicodeMap);

    if (unicode !== -1) {
      toFontChar[+charCode] = unicode;
    }
  }

  return toFontChar;
}

function convertCidString(charCode, cid) {
  var shouldThrow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  switch (cid.length) {
    case 1:
      return cid.charCodeAt(0);

    case 2:
      return cid.charCodeAt(0) << 8 | cid.charCodeAt(1);
  }

  var msg = "Unsupported CID string (charCode ".concat(charCode, "): \"").concat(cid, "\".");

  if (shouldThrow) {
    throw new _util.FormatError(msg);
  }

  (0, _util.warn)(msg);
  return cid;
}

function adjustMapping(charCodeToGlyphId, hasGlyph, newGlyphZeroId) {
  var newMap = Object.create(null);
  var toFontChar = [];
  var privateUseAreaIndex = 0;
  var nextAvailableFontCharCode = PRIVATE_USE_AREAS[privateUseAreaIndex][0];
  var privateUseOffetEnd = PRIVATE_USE_AREAS[privateUseAreaIndex][1];

  for (var originalCharCode in charCodeToGlyphId) {
    originalCharCode |= 0;
    var glyphId = charCodeToGlyphId[originalCharCode];

    if (!hasGlyph(glyphId)) {
      continue;
    }

    if (nextAvailableFontCharCode > privateUseOffetEnd) {
      privateUseAreaIndex++;

      if (privateUseAreaIndex >= PRIVATE_USE_AREAS.length) {
        (0, _util.warn)("Ran out of space in font private use area.");
        break;
      }

      nextAvailableFontCharCode = PRIVATE_USE_AREAS[privateUseAreaIndex][0];
      privateUseOffetEnd = PRIVATE_USE_AREAS[privateUseAreaIndex][1];
    }

    var fontCharCode = nextAvailableFontCharCode++;

    if (glyphId === 0) {
      glyphId = newGlyphZeroId;
    }

    newMap[fontCharCode] = glyphId;
    toFontChar[originalCharCode] = fontCharCode;
  }

  return {
    toFontChar: toFontChar,
    charCodeToGlyphId: newMap,
    nextAvailableFontCharCode: nextAvailableFontCharCode
  };
}

function getRanges(glyphs, numGlyphs) {
  var codes = [];

  for (var charCode in glyphs) {
    if (glyphs[charCode] >= numGlyphs) {
      continue;
    }

    codes.push({
      fontCharCode: charCode | 0,
      glyphId: glyphs[charCode]
    });
  }

  if (codes.length === 0) {
    codes.push({
      fontCharCode: 0,
      glyphId: 0
    });
  }

  codes.sort(function fontGetRangesSort(a, b) {
    return a.fontCharCode - b.fontCharCode;
  });
  var ranges = [];
  var length = codes.length;

  for (var n = 0; n < length;) {
    var start = codes[n].fontCharCode;
    var codeIndices = [codes[n].glyphId];
    ++n;
    var end = start;

    while (n < length && end + 1 === codes[n].fontCharCode) {
      codeIndices.push(codes[n].glyphId);
      ++end;
      ++n;

      if (end === 0xffff) {
        break;
      }
    }

    ranges.push([start, end, codeIndices]);
  }

  return ranges;
}

function createCmapTable(glyphs, numGlyphs) {
  var ranges = getRanges(glyphs, numGlyphs);
  var numTables = ranges[ranges.length - 1][1] > 0xffff ? 2 : 1;
  var cmap = "\x00\x00" + string16(numTables) + "\x00\x03" + "\x00\x01" + (0, _util.string32)(4 + numTables * 8);
  var i, ii, j, jj;

  for (i = ranges.length - 1; i >= 0; --i) {
    if (ranges[i][0] <= 0xffff) {
      break;
    }
  }

  var bmpLength = i + 1;

  if (ranges[i][0] < 0xffff && ranges[i][1] === 0xffff) {
    ranges[i][1] = 0xfffe;
  }

  var trailingRangesCount = ranges[i][1] < 0xffff ? 1 : 0;
  var segCount = bmpLength + trailingRangesCount;

  var searchParams = _opentype_file_builder.OpenTypeFileBuilder.getSearchParams(segCount, 2);

  var startCount = "";
  var endCount = "";
  var idDeltas = "";
  var idRangeOffsets = "";
  var glyphsIds = "";
  var bias = 0;
  var range, start, end, codes;

  for (i = 0, ii = bmpLength; i < ii; i++) {
    range = ranges[i];
    start = range[0];
    end = range[1];
    startCount += string16(start);
    endCount += string16(end);
    codes = range[2];
    var contiguous = true;

    for (j = 1, jj = codes.length; j < jj; ++j) {
      if (codes[j] !== codes[j - 1] + 1) {
        contiguous = false;
        break;
      }
    }

    if (!contiguous) {
      var offset = (segCount - i) * 2 + bias * 2;
      bias += end - start + 1;
      idDeltas += string16(0);
      idRangeOffsets += string16(offset);

      for (j = 0, jj = codes.length; j < jj; ++j) {
        glyphsIds += string16(codes[j]);
      }
    } else {
      var startCode = codes[0];
      idDeltas += string16(startCode - start & 0xffff);
      idRangeOffsets += string16(0);
    }
  }

  if (trailingRangesCount > 0) {
    endCount += "\xFF\xFF";
    startCount += "\xFF\xFF";
    idDeltas += "\x00\x01";
    idRangeOffsets += "\x00\x00";
  }

  var format314 = "\x00\x00" + string16(2 * segCount) + string16(searchParams.range) + string16(searchParams.entry) + string16(searchParams.rangeShift) + endCount + "\x00\x00" + startCount + idDeltas + idRangeOffsets + glyphsIds;
  var format31012 = "";
  var header31012 = "";

  if (numTables > 1) {
    cmap += "\x00\x03" + "\x00\x0A" + (0, _util.string32)(4 + numTables * 8 + 4 + format314.length);
    format31012 = "";

    for (i = 0, ii = ranges.length; i < ii; i++) {
      range = ranges[i];
      start = range[0];
      codes = range[2];
      var code = codes[0];

      for (j = 1, jj = codes.length; j < jj; ++j) {
        if (codes[j] !== codes[j - 1] + 1) {
          end = range[0] + j - 1;
          format31012 += (0, _util.string32)(start) + (0, _util.string32)(end) + (0, _util.string32)(code);
          start = end + 1;
          code = codes[j];
        }
      }

      format31012 += (0, _util.string32)(start) + (0, _util.string32)(range[1]) + (0, _util.string32)(code);
    }

    header31012 = "\x00\x0C" + "\x00\x00" + (0, _util.string32)(format31012.length + 16) + "\x00\x00\x00\x00" + (0, _util.string32)(format31012.length / 12);
  }

  return cmap + "\x00\x04" + string16(format314.length + 4) + format314 + header31012 + format31012;
}

function validateOS2Table(os2, file) {
  file.pos = (file.start || 0) + os2.offset;
  var version = file.getUint16();
  file.skip(60);
  var selection = file.getUint16();

  if (version < 4 && selection & 0x0300) {
    return false;
  }

  var firstChar = file.getUint16();
  var lastChar = file.getUint16();

  if (firstChar > lastChar) {
    return false;
  }

  file.skip(6);
  var usWinAscent = file.getUint16();

  if (usWinAscent === 0) {
    return false;
  }

  os2.data[8] = os2.data[9] = 0;
  return true;
}

function createOS2Table(properties, charstrings, override) {
  override = override || {
    unitsPerEm: 0,
    yMax: 0,
    yMin: 0,
    ascent: 0,
    descent: 0
  };
  var ulUnicodeRange1 = 0;
  var ulUnicodeRange2 = 0;
  var ulUnicodeRange3 = 0;
  var ulUnicodeRange4 = 0;
  var firstCharIndex = null;
  var lastCharIndex = 0;

  if (charstrings) {
    for (var code in charstrings) {
      code |= 0;

      if (firstCharIndex > code || !firstCharIndex) {
        firstCharIndex = code;
      }

      if (lastCharIndex < code) {
        lastCharIndex = code;
      }

      var position = (0, _unicode.getUnicodeRangeFor)(code);

      if (position < 32) {
        ulUnicodeRange1 |= 1 << position;
      } else if (position < 64) {
        ulUnicodeRange2 |= 1 << position - 32;
      } else if (position < 96) {
        ulUnicodeRange3 |= 1 << position - 64;
      } else if (position < 123) {
        ulUnicodeRange4 |= 1 << position - 96;
      } else {
        throw new _util.FormatError("Unicode ranges Bits > 123 are reserved for internal usage");
      }
    }

    if (lastCharIndex > 0xffff) {
      lastCharIndex = 0xffff;
    }
  } else {
    firstCharIndex = 0;
    lastCharIndex = 255;
  }

  var bbox = properties.bbox || [0, 0, 0, 0];
  var unitsPerEm = override.unitsPerEm || 1 / (properties.fontMatrix || _util.FONT_IDENTITY_MATRIX)[0];
  var scale = properties.ascentScaled ? 1.0 : unitsPerEm / PDF_GLYPH_SPACE_UNITS;
  var typoAscent = override.ascent || Math.round(scale * (properties.ascent || bbox[3]));
  var typoDescent = override.descent || Math.round(scale * (properties.descent || bbox[1]));

  if (typoDescent > 0 && properties.descent > 0 && bbox[1] < 0) {
    typoDescent = -typoDescent;
  }

  var winAscent = override.yMax || typoAscent;
  var winDescent = -override.yMin || -typoDescent;
  return "\x00\x03" + "\x02\x24" + "\x01\xF4" + "\x00\x05" + "\x00\x00" + "\x02\x8A" + "\x02\xBB" + "\x00\x00" + "\x00\x8C" + "\x02\x8A" + "\x02\xBB" + "\x00\x00" + "\x01\xDF" + "\x00\x31" + "\x01\x02" + "\x00\x00" + "\x00\x00\x06" + String.fromCharCode(properties.fixedPitch ? 0x09 : 0x00) + "\x00\x00\x00\x00\x00\x00" + (0, _util.string32)(ulUnicodeRange1) + (0, _util.string32)(ulUnicodeRange2) + (0, _util.string32)(ulUnicodeRange3) + (0, _util.string32)(ulUnicodeRange4) + "\x2A\x32\x31\x2A" + string16(properties.italicAngle ? 1 : 0) + string16(firstCharIndex || properties.firstChar) + string16(lastCharIndex || properties.lastChar) + string16(typoAscent) + string16(typoDescent) + "\x00\x64" + string16(winAscent) + string16(winDescent) + "\x00\x00\x00\x00" + "\x00\x00\x00\x00" + string16(properties.xHeight) + string16(properties.capHeight) + string16(0) + string16(firstCharIndex || properties.firstChar) + "\x00\x03";
}

function createPostTable(properties) {
  var angle = Math.floor(properties.italicAngle * Math.pow(2, 16));
  return "\x00\x03\x00\x00" + (0, _util.string32)(angle) + "\x00\x00" + "\x00\x00" + (0, _util.string32)(properties.fixedPitch ? 1 : 0) + "\x00\x00\x00\x00" + "\x00\x00\x00\x00" + "\x00\x00\x00\x00" + "\x00\x00\x00\x00";
}

function createPostscriptName(name) {
  return name.replace(/[^\x21-\x7E]|[[\](){}<>/%]/g, "").slice(0, 63);
}

function createNameTable(name, proto) {
  if (!proto) {
    proto = [[], []];
  }

  var strings = [proto[0][0] || "Original licence", proto[0][1] || name, proto[0][2] || "Unknown", proto[0][3] || "uniqueID", proto[0][4] || name, proto[0][5] || "Version 0.11", proto[0][6] || createPostscriptName(name), proto[0][7] || "Unknown", proto[0][8] || "Unknown", proto[0][9] || "Unknown"];
  var stringsUnicode = [];
  var i, ii, j, jj, str;

  for (i = 0, ii = strings.length; i < ii; i++) {
    str = proto[1][i] || strings[i];
    var strBufUnicode = [];

    for (j = 0, jj = str.length; j < jj; j++) {
      strBufUnicode.push(string16(str.charCodeAt(j)));
    }

    stringsUnicode.push(strBufUnicode.join(""));
  }

  var names = [strings, stringsUnicode];
  var platforms = ["\x00\x01", "\x00\x03"];
  var encodings = ["\x00\x00", "\x00\x01"];
  var languages = ["\x00\x00", "\x04\x09"];
  var namesRecordCount = strings.length * platforms.length;
  var nameTable = "\x00\x00" + string16(namesRecordCount) + string16(namesRecordCount * 12 + 6);
  var strOffset = 0;

  for (i = 0, ii = platforms.length; i < ii; i++) {
    var strs = names[i];

    for (j = 0, jj = strs.length; j < jj; j++) {
      str = strs[j];
      var nameRecord = platforms[i] + encodings[i] + languages[i] + string16(j) + string16(str.length) + string16(strOffset);
      nameTable += nameRecord;
      strOffset += str.length;
    }
  }

  nameTable += strings.join("") + stringsUnicode.join("");
  return nameTable;
}

var Font = /*#__PURE__*/function () {
  function Font(name, file, properties) {
    _classCallCheck(this, Font);

    this.name = name;
    this.psName = null;
    this.mimetype = null;
    this.disableFontFace = false;
    this.loadedName = properties.loadedName;
    this.isType3Font = properties.isType3Font;
    this.missingFile = false;
    this.cssFontInfo = properties.cssFontInfo;
    this._charsCache = Object.create(null);
    this._glyphCache = Object.create(null);
    var isSerifFont = !!(properties.flags & _fonts_utils.FontFlags.Serif);

    if (!isSerifFont && !properties.isSimulatedFlags) {
      var baseName = name.replace(/[,_]/g, "-").split("-")[0],
          serifFonts = (0, _standard_fonts.getSerifFonts)();

      var _iterator = _createForOfIteratorHelper(baseName.split("+")),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var namePart = _step.value;

          if (serifFonts[namePart]) {
            isSerifFont = true;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    this.isSerifFont = isSerifFont;
    this.isSymbolicFont = !!(properties.flags & _fonts_utils.FontFlags.Symbolic);
    this.isMonospace = !!(properties.flags & _fonts_utils.FontFlags.FixedPitch);
    var type = properties.type;
    var subtype = properties.subtype;
    this.type = type;
    this.subtype = subtype;
    var fallbackName = "sans-serif";

    if (this.isMonospace) {
      fallbackName = "monospace";
    } else if (this.isSerifFont) {
      fallbackName = "serif";
    }

    this.fallbackName = fallbackName;
    this.differences = properties.differences;
    this.widths = properties.widths;
    this.defaultWidth = properties.defaultWidth;
    this.composite = properties.composite;
    this.cMap = properties.cMap;
    this.capHeight = properties.capHeight / PDF_GLYPH_SPACE_UNITS;
    this.ascent = properties.ascent / PDF_GLYPH_SPACE_UNITS;
    this.descent = properties.descent / PDF_GLYPH_SPACE_UNITS;
    this.lineHeight = this.ascent - this.descent;
    this.fontMatrix = properties.fontMatrix;
    this.bbox = properties.bbox;
    this.defaultEncoding = properties.defaultEncoding;
    this.toUnicode = properties.toUnicode;
    this.toFontChar = [];

    if (properties.type === "Type3") {
      for (var charCode = 0; charCode < 256; charCode++) {
        this.toFontChar[charCode] = this.differences[charCode] || properties.defaultEncoding[charCode];
      }

      this.fontType = _util.FontType.TYPE3;
      return;
    }

    this.cidEncoding = properties.cidEncoding || "";
    this.vertical = !!properties.vertical;

    if (this.vertical) {
      this.vmetrics = properties.vmetrics;
      this.defaultVMetrics = properties.defaultVMetrics;
    }

    if (!file || file.isEmpty) {
      if (file) {
        (0, _util.warn)('Font file is empty in "' + name + '" (' + this.loadedName + ")");
      }

      this.fallbackToSystemFont(properties);
      return;
    }

    var _getFontFileType = getFontFileType(file, properties);

    var _getFontFileType2 = _slicedToArray(_getFontFileType, 2);

    type = _getFontFileType2[0];
    subtype = _getFontFileType2[1];

    if (type !== this.type || subtype !== this.subtype) {
      (0, _util.info)("Inconsistent font file Type/SubType, expected: " + "".concat(this.type, "/").concat(this.subtype, " but found: ").concat(type, "/").concat(subtype, "."));
    }

    var data;

    try {
      switch (type) {
        case "MMType1":
          (0, _util.info)("MMType1 font (" + name + "), falling back to Type1.");

        case "Type1":
        case "CIDFontType0":
          this.mimetype = "font/opentype";
          var cff = subtype === "Type1C" || subtype === "CIDFontType0C" ? new _cff_font.CFFFont(file, properties) : new _type1_font.Type1Font(name, file, properties);
          adjustWidths(properties);
          data = this.convert(name, cff, properties);
          break;

        case "OpenType":
        case "TrueType":
        case "CIDFontType2":
          this.mimetype = "font/opentype";
          data = this.checkAndRepair(name, file, properties);

          if (this.isOpenType) {
            adjustWidths(properties);
            type = "OpenType";
          }

          break;

        default:
          throw new _util.FormatError("Font ".concat(type, " is not supported"));
      }
    } catch (e) {
      (0, _util.warn)(e);
      this.fallbackToSystemFont(properties);
      return;
    }

    amendFallbackToUnicode(properties);
    this.data = data;
    this.fontType = (0, _fonts_utils.getFontType)(type, subtype, properties.isStandardFont);
    this.fontMatrix = properties.fontMatrix;
    this.widths = properties.widths;
    this.defaultWidth = properties.defaultWidth;
    this.toUnicode = properties.toUnicode;
    this.seacMap = properties.seacMap;
  }

  _createClass(Font, [{
    key: "renderer",
    get: function get() {
      var renderer = _font_renderer.FontRendererFactory.create(this, _fonts_utils.SEAC_ANALYSIS_ENABLED);

      return (0, _util.shadow)(this, "renderer", renderer);
    }
  }, {
    key: "exportData",
    value: function exportData() {
      var extraProperties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var exportDataProperties = extraProperties ? [].concat(EXPORT_DATA_PROPERTIES, EXPORT_DATA_EXTRA_PROPERTIES) : EXPORT_DATA_PROPERTIES;
      var data = Object.create(null);
      var property, value;

      var _iterator2 = _createForOfIteratorHelper(exportDataProperties),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          property = _step2.value;
          value = this[property];

          if (value !== undefined) {
            data[property] = value;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return data;
    }
  }, {
    key: "fallbackToSystemFont",
    value: function fallbackToSystemFont(properties) {
      var _this = this;

      this.missingFile = true;
      var name = this.name;
      var type = this.type;
      var subtype = this.subtype;
      var fontName = (0, _fonts_utils.normalizeFontName)(name);
      var stdFontMap = (0, _standard_fonts.getStdFontMap)(),
          nonStdFontMap = (0, _standard_fonts.getNonStdFontMap)();
      var isStandardFont = !!stdFontMap[fontName];
      var isMappedToStandardFont = !!(nonStdFontMap[fontName] && stdFontMap[nonStdFontMap[fontName]]);
      fontName = stdFontMap[fontName] || nonStdFontMap[fontName] || fontName;
      this.bold = fontName.search(/bold/gi) !== -1;
      this.italic = fontName.search(/oblique/gi) !== -1 || fontName.search(/italic/gi) !== -1;
      this.black = name.search(/Black/g) !== -1;
      var isNarrow = name.search(/Narrow/g) !== -1;
      this.remeasure = (!isStandardFont || isNarrow) && Object.keys(this.widths).length > 0;

      if ((isStandardFont || isMappedToStandardFont) && type === "CIDFontType2" && this.cidEncoding.startsWith("Identity-")) {
        var cidToGidMap = properties.cidToGidMap;
        var map = [];
        applyStandardFontGlyphMap(map, (0, _standard_fonts.getGlyphMapForStandardFonts)());

        if (/Arial-?Black/i.test(name)) {
          applyStandardFontGlyphMap(map, (0, _standard_fonts.getSupplementalGlyphMapForArialBlack)());
        } else if (/Calibri/i.test(name)) {
          applyStandardFontGlyphMap(map, (0, _standard_fonts.getSupplementalGlyphMapForCalibri)());
        }

        if (cidToGidMap) {
          for (var charCode in map) {
            var cid = map[charCode];

            if (cidToGidMap[cid] !== undefined) {
              map[+charCode] = cidToGidMap[cid];
            }
          }

          if (cidToGidMap.length !== this.toUnicode.length && properties.hasIncludedToUnicodeMap && this.toUnicode instanceof _to_unicode_map.IdentityToUnicodeMap) {
            this.toUnicode.forEach(function (charCode, unicodeCharCode) {
              var cid = map[charCode];

              if (cidToGidMap[cid] === undefined) {
                map[+charCode] = unicodeCharCode;
              }
            });
          }
        }

        if (!(this.toUnicode instanceof _to_unicode_map.IdentityToUnicodeMap)) {
          this.toUnicode.forEach(function (charCode, unicodeCharCode) {
            map[+charCode] = unicodeCharCode;
          });
        }

        this.toFontChar = map;
        this.toUnicode = new _to_unicode_map.ToUnicodeMap(map);
      } else if (/Symbol/i.test(fontName)) {
        this.toFontChar = buildToFontChar(_encodings.SymbolSetEncoding, (0, _glyphlist.getGlyphsUnicode)(), this.differences);
      } else if (/Dingbats/i.test(fontName)) {
        if (/Wingdings/i.test(name)) {
          (0, _util.warn)("Non-embedded Wingdings font, falling back to ZapfDingbats.");
        }

        this.toFontChar = buildToFontChar(_encodings.ZapfDingbatsEncoding, (0, _glyphlist.getDingbatsGlyphsUnicode)(), this.differences);
      } else if (isStandardFont) {
        var _map = buildToFontChar(this.defaultEncoding, (0, _glyphlist.getGlyphsUnicode)(), this.differences);

        if (type === "CIDFontType2" && !this.cidEncoding.startsWith("Identity-") && !(this.toUnicode instanceof _to_unicode_map.IdentityToUnicodeMap)) {
          this.toUnicode.forEach(function (charCode, unicodeCharCode) {
            _map[+charCode] = unicodeCharCode;
          });
        }

        this.toFontChar = _map;
      } else {
        var glyphsUnicodeMap = (0, _glyphlist.getGlyphsUnicode)();
        var _map2 = [];
        this.toUnicode.forEach(function (charCode, unicodeCharCode) {
          if (!_this.composite) {
            var glyphName = _this.differences[charCode] || _this.defaultEncoding[charCode];
            var unicode = (0, _unicode.getUnicodeForGlyph)(glyphName, glyphsUnicodeMap);

            if (unicode !== -1) {
              unicodeCharCode = unicode;
            }
          }

          _map2[+charCode] = unicodeCharCode;
        });

        if (this.composite && this.toUnicode instanceof _to_unicode_map.IdentityToUnicodeMap) {
          if (/Verdana/i.test(name)) {
            applyStandardFontGlyphMap(_map2, (0, _standard_fonts.getGlyphMapForStandardFonts)());
          }
        }

        this.toFontChar = _map2;
      }

      amendFallbackToUnicode(properties);
      this.loadedName = fontName.split("-")[0];
      this.fontType = (0, _fonts_utils.getFontType)(type, subtype, properties.isStandardFont);
    }
  }, {
    key: "checkAndRepair",
    value: function checkAndRepair(name, font, properties) {
      var VALID_TABLES = ["OS/2", "cmap", "head", "hhea", "hmtx", "maxp", "name", "post", "loca", "glyf", "fpgm", "prep", "cvt ", "CFF "];

      function readTables(file, numTables) {
        var tables = Object.create(null);
        tables["OS/2"] = null;
        tables.cmap = null;
        tables.head = null;
        tables.hhea = null;
        tables.hmtx = null;
        tables.maxp = null;
        tables.name = null;
        tables.post = null;

        for (var i = 0; i < numTables; i++) {
          var table = readTableEntry(file);

          if (!VALID_TABLES.includes(table.tag)) {
            continue;
          }

          if (table.length === 0) {
            continue;
          }

          tables[table.tag] = table;
        }

        return tables;
      }

      function readTableEntry(file) {
        var tag = file.getString(4);
        var checksum = file.getInt32() >>> 0;
        var offset = file.getInt32() >>> 0;
        var length = file.getInt32() >>> 0;
        var previousPosition = file.pos;
        file.pos = file.start ? file.start : 0;
        file.skip(offset);
        var data = file.getBytes(length);
        file.pos = previousPosition;

        if (tag === "head") {
          data[8] = data[9] = data[10] = data[11] = 0;
          data[17] |= 0x20;
        }

        return {
          tag: tag,
          checksum: checksum,
          length: length,
          offset: offset,
          data: data
        };
      }

      function readOpenTypeHeader(ttf) {
        return {
          version: ttf.getString(4),
          numTables: ttf.getUint16(),
          searchRange: ttf.getUint16(),
          entrySelector: ttf.getUint16(),
          rangeShift: ttf.getUint16()
        };
      }

      function readTrueTypeCollectionHeader(ttc) {
        var ttcTag = ttc.getString(4);
        (0, _util.assert)(ttcTag === "ttcf", "Must be a TrueType Collection font.");
        var majorVersion = ttc.getUint16();
        var minorVersion = ttc.getUint16();
        var numFonts = ttc.getInt32() >>> 0;
        var offsetTable = [];

        for (var i = 0; i < numFonts; i++) {
          offsetTable.push(ttc.getInt32() >>> 0);
        }

        var header = {
          ttcTag: ttcTag,
          majorVersion: majorVersion,
          minorVersion: minorVersion,
          numFonts: numFonts,
          offsetTable: offsetTable
        };

        switch (majorVersion) {
          case 1:
            return header;

          case 2:
            header.dsigTag = ttc.getInt32() >>> 0;
            header.dsigLength = ttc.getInt32() >>> 0;
            header.dsigOffset = ttc.getInt32() >>> 0;
            return header;
        }

        throw new _util.FormatError("Invalid TrueType Collection majorVersion: ".concat(majorVersion, "."));
      }

      function readTrueTypeCollectionData(ttc, fontName) {
        var _readTrueTypeCollecti = readTrueTypeCollectionHeader(ttc),
            numFonts = _readTrueTypeCollecti.numFonts,
            offsetTable = _readTrueTypeCollecti.offsetTable;

        var fontNameParts = fontName.split("+");
        var fallbackData;

        for (var i = 0; i < numFonts; i++) {
          ttc.pos = (ttc.start || 0) + offsetTable[i];
          var potentialHeader = readOpenTypeHeader(ttc);
          var potentialTables = readTables(ttc, potentialHeader.numTables);

          if (!potentialTables.name) {
            throw new _util.FormatError('TrueType Collection font must contain a "name" table.');
          }

          var nameTable = readNameTable(potentialTables.name);

          for (var j = 0, jj = nameTable.length; j < jj; j++) {
            for (var k = 0, kk = nameTable[j].length; k < kk; k++) {
              var nameEntry = nameTable[j][k] && nameTable[j][k].replace(/\s/g, "");

              if (!nameEntry) {
                continue;
              }

              if (nameEntry === fontName) {
                return {
                  header: potentialHeader,
                  tables: potentialTables
                };
              }

              if (fontNameParts.length < 2) {
                continue;
              }

              var _iterator3 = _createForOfIteratorHelper(fontNameParts),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var part = _step3.value;

                  if (nameEntry === part) {
                    fallbackData = {
                      name: part,
                      header: potentialHeader,
                      tables: potentialTables
                    };
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
          }
        }

        if (fallbackData) {
          (0, _util.warn)("TrueType Collection does not contain \"".concat(fontName, "\" font, ") + "falling back to \"".concat(fallbackData.name, "\" font instead."));
          return {
            header: fallbackData.header,
            tables: fallbackData.tables
          };
        }

        throw new _util.FormatError("TrueType Collection does not contain \"".concat(fontName, "\" font."));
      }

      function readCmapTable(cmap, file, isSymbolicFont, hasEncoding) {
        if (!cmap) {
          (0, _util.warn)("No cmap table available.");
          return {
            platformId: -1,
            encodingId: -1,
            mappings: [],
            hasShortCmap: false
          };
        }

        var segment;
        var start = (file.start ? file.start : 0) + cmap.offset;
        file.pos = start;
        file.skip(2);
        var numTables = file.getUint16();
        var potentialTable;
        var canBreak = false;

        for (var i = 0; i < numTables; i++) {
          var platformId = file.getUint16();
          var encodingId = file.getUint16();
          var offset = file.getInt32() >>> 0;
          var useTable = false;

          if (potentialTable && potentialTable.platformId === platformId && potentialTable.encodingId === encodingId) {
            continue;
          }

          if (platformId === 0 && (encodingId === 0 || encodingId === 1 || encodingId === 3)) {
            useTable = true;
          } else if (platformId === 1 && encodingId === 0) {
            useTable = true;
          } else if (platformId === 3 && encodingId === 1 && (hasEncoding || !potentialTable)) {
            useTable = true;

            if (!isSymbolicFont) {
              canBreak = true;
            }
          } else if (isSymbolicFont && platformId === 3 && encodingId === 0) {
            useTable = true;
            var correctlySorted = true;

            if (i < numTables - 1) {
              var nextBytes = file.peekBytes(2),
                  nextPlatformId = int16(nextBytes[0], nextBytes[1]);

              if (nextPlatformId < platformId) {
                correctlySorted = false;
              }
            }

            if (correctlySorted) {
              canBreak = true;
            }
          }

          if (useTable) {
            potentialTable = {
              platformId: platformId,
              encodingId: encodingId,
              offset: offset
            };
          }

          if (canBreak) {
            break;
          }
        }

        if (potentialTable) {
          file.pos = start + potentialTable.offset;
        }

        if (!potentialTable || file.peekByte() === -1) {
          (0, _util.warn)("Could not find a preferred cmap table.");
          return {
            platformId: -1,
            encodingId: -1,
            mappings: [],
            hasShortCmap: false
          };
        }

        var format = file.getUint16();
        file.skip(2 + 2);
        var hasShortCmap = false;
        var mappings = [];
        var j, glyphId;

        if (format === 0) {
          for (j = 0; j < 256; j++) {
            var index = file.getByte();

            if (!index) {
              continue;
            }

            mappings.push({
              charCode: j,
              glyphId: index
            });
          }

          hasShortCmap = true;
        } else if (format === 2) {
          var subHeaderKeys = [];
          var maxSubHeaderKey = 0;

          for (var _i2 = 0; _i2 < 256; _i2++) {
            var subHeaderKey = file.getUint16() >> 3;
            subHeaderKeys.push(subHeaderKey);
            maxSubHeaderKey = Math.max(subHeaderKey, maxSubHeaderKey);
          }

          var subHeaders = [];

          for (var _i3 = 0; _i3 <= maxSubHeaderKey; _i3++) {
            subHeaders.push({
              firstCode: file.getUint16(),
              entryCount: file.getUint16(),
              idDelta: signedInt16(file.getByte(), file.getByte()),
              idRangePos: file.pos + file.getUint16()
            });
          }

          for (var _i4 = 0; _i4 < 256; _i4++) {
            if (subHeaderKeys[_i4] === 0) {
              file.pos = subHeaders[0].idRangePos + 2 * _i4;
              glyphId = file.getUint16();
              mappings.push({
                charCode: _i4,
                glyphId: glyphId
              });
            } else {
              var s = subHeaders[subHeaderKeys[_i4]];

              for (j = 0; j < s.entryCount; j++) {
                var charCode = (_i4 << 8) + j + s.firstCode;
                file.pos = s.idRangePos + 2 * j;
                glyphId = file.getUint16();

                if (glyphId !== 0) {
                  glyphId = (glyphId + s.idDelta) % 65536;
                }

                mappings.push({
                  charCode: charCode,
                  glyphId: glyphId
                });
              }
            }
          }
        } else if (format === 4) {
          var segCount = file.getUint16() >> 1;
          file.skip(6);
          var segments = [];
          var segIndex;

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments.push({
              end: file.getUint16()
            });
          }

          file.skip(2);

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments[segIndex].start = file.getUint16();
          }

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments[segIndex].delta = file.getUint16();
          }

          var offsetsCount = 0,
              offsetIndex;

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segment = segments[segIndex];
            var rangeOffset = file.getUint16();

            if (!rangeOffset) {
              segment.offsetIndex = -1;
              continue;
            }

            offsetIndex = (rangeOffset >> 1) - (segCount - segIndex);
            segment.offsetIndex = offsetIndex;
            offsetsCount = Math.max(offsetsCount, offsetIndex + segment.end - segment.start + 1);
          }

          var offsets = [];

          for (j = 0; j < offsetsCount; j++) {
            offsets.push(file.getUint16());
          }

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segment = segments[segIndex];
            start = segment.start;
            var end = segment.end;
            var delta = segment.delta;
            offsetIndex = segment.offsetIndex;

            for (j = start; j <= end; j++) {
              if (j === 0xffff) {
                continue;
              }

              glyphId = offsetIndex < 0 ? j : offsets[offsetIndex + j - start];
              glyphId = glyphId + delta & 0xffff;
              mappings.push({
                charCode: j,
                glyphId: glyphId
              });
            }
          }
        } else if (format === 6) {
          var firstCode = file.getUint16();
          var entryCount = file.getUint16();

          for (j = 0; j < entryCount; j++) {
            glyphId = file.getUint16();

            var _charCode = firstCode + j;

            mappings.push({
              charCode: _charCode,
              glyphId: glyphId
            });
          }
        } else {
          (0, _util.warn)("cmap table has unsupported format: " + format);
          return {
            platformId: -1,
            encodingId: -1,
            mappings: [],
            hasShortCmap: false
          };
        }

        mappings.sort(function (a, b) {
          return a.charCode - b.charCode;
        });

        for (var _i5 = 1; _i5 < mappings.length; _i5++) {
          if (mappings[_i5 - 1].charCode === mappings[_i5].charCode) {
            mappings.splice(_i5, 1);
            _i5--;
          }
        }

        return {
          platformId: potentialTable.platformId,
          encodingId: potentialTable.encodingId,
          mappings: mappings,
          hasShortCmap: hasShortCmap
        };
      }

      function sanitizeMetrics(file, header, metrics, headTable, numGlyphs, dupFirstEntry) {
        if (!header) {
          if (metrics) {
            metrics.data = null;
          }

          return;
        }

        file.pos = (file.start ? file.start : 0) + header.offset;
        file.pos += 4;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        var caretOffset = file.getUint16();
        file.pos += 8;
        file.pos += 2;
        var numOfMetrics = file.getUint16();

        if (caretOffset !== 0) {
          var macStyle = int16(headTable.data[44], headTable.data[45]);

          if (!(macStyle & 2)) {
            header.data[22] = 0;
            header.data[23] = 0;
          }
        }

        if (numOfMetrics > numGlyphs) {
          (0, _util.info)("The numOfMetrics (".concat(numOfMetrics, ") should not be ") + "greater than the numGlyphs (".concat(numGlyphs, ")."));
          numOfMetrics = numGlyphs;
          header.data[34] = (numOfMetrics & 0xff00) >> 8;
          header.data[35] = numOfMetrics & 0x00ff;
        }

        var numOfSidebearings = numGlyphs - numOfMetrics;
        var numMissing = numOfSidebearings - (metrics.length - numOfMetrics * 4 >> 1);

        if (numMissing > 0) {
          var entries = new Uint8Array(metrics.length + numMissing * 2);
          entries.set(metrics.data);

          if (dupFirstEntry) {
            entries[metrics.length] = metrics.data[2];
            entries[metrics.length + 1] = metrics.data[3];
          }

          metrics.data = entries;
        }
      }

      function sanitizeGlyph(source, sourceStart, sourceEnd, dest, destStart, hintsValid) {
        var glyphProfile = {
          length: 0,
          sizeOfInstructions: 0
        };

        if (sourceEnd - sourceStart <= 12) {
          return glyphProfile;
        }

        var glyf = source.subarray(sourceStart, sourceEnd);
        var contoursCount = signedInt16(glyf[0], glyf[1]);

        if (contoursCount < 0) {
          contoursCount = -1;
          writeSignedInt16(glyf, 0, contoursCount);
          dest.set(glyf, destStart);
          glyphProfile.length = glyf.length;
          return glyphProfile;
        }

        var i,
            j = 10,
            flagsCount = 0;

        for (i = 0; i < contoursCount; i++) {
          var endPoint = glyf[j] << 8 | glyf[j + 1];
          flagsCount = endPoint + 1;
          j += 2;
        }

        var instructionsStart = j;
        var instructionsLength = glyf[j] << 8 | glyf[j + 1];
        glyphProfile.sizeOfInstructions = instructionsLength;
        j += 2 + instructionsLength;
        var instructionsEnd = j;
        var coordinatesLength = 0;

        for (i = 0; i < flagsCount; i++) {
          var flag = glyf[j++];

          if (flag & 0xc0) {
            glyf[j - 1] = flag & 0x3f;
          }

          var xLength = 2;

          if (flag & 2) {
            xLength = 1;
          } else if (flag & 16) {
            xLength = 0;
          }

          var yLength = 2;

          if (flag & 4) {
            yLength = 1;
          } else if (flag & 32) {
            yLength = 0;
          }

          var xyLength = xLength + yLength;
          coordinatesLength += xyLength;

          if (flag & 8) {
            var repeat = glyf[j++];
            i += repeat;
            coordinatesLength += repeat * xyLength;
          }
        }

        if (coordinatesLength === 0) {
          return glyphProfile;
        }

        var glyphDataLength = j + coordinatesLength;

        if (glyphDataLength > glyf.length) {
          return glyphProfile;
        }

        if (!hintsValid && instructionsLength > 0) {
          dest.set(glyf.subarray(0, instructionsStart), destStart);
          dest.set([0, 0], destStart + instructionsStart);
          dest.set(glyf.subarray(instructionsEnd, glyphDataLength), destStart + instructionsStart + 2);
          glyphDataLength -= instructionsLength;

          if (glyf.length - glyphDataLength > 3) {
            glyphDataLength = glyphDataLength + 3 & ~3;
          }

          glyphProfile.length = glyphDataLength;
          return glyphProfile;
        }

        if (glyf.length - glyphDataLength > 3) {
          glyphDataLength = glyphDataLength + 3 & ~3;
          dest.set(glyf.subarray(0, glyphDataLength), destStart);
          glyphProfile.length = glyphDataLength;
          return glyphProfile;
        }

        dest.set(glyf, destStart);
        glyphProfile.length = glyf.length;
        return glyphProfile;
      }

      function sanitizeHead(head, numGlyphs, locaLength) {
        var data = head.data;
        var version = int32(data[0], data[1], data[2], data[3]);

        if (version >> 16 !== 1) {
          (0, _util.info)("Attempting to fix invalid version in head table: " + version);
          data[0] = 0;
          data[1] = 1;
          data[2] = 0;
          data[3] = 0;
        }

        var indexToLocFormat = int16(data[50], data[51]);

        if (indexToLocFormat < 0 || indexToLocFormat > 1) {
          (0, _util.info)("Attempting to fix invalid indexToLocFormat in head table: " + indexToLocFormat);
          var numGlyphsPlusOne = numGlyphs + 1;

          if (locaLength === numGlyphsPlusOne << 1) {
            data[50] = 0;
            data[51] = 0;
          } else if (locaLength === numGlyphsPlusOne << 2) {
            data[50] = 0;
            data[51] = 1;
          } else {
            throw new _util.FormatError("Could not fix indexToLocFormat: " + indexToLocFormat);
          }
        }
      }

      function sanitizeGlyphLocations(loca, glyf, numGlyphs, isGlyphLocationsLong, hintsValid, dupFirstEntry, maxSizeOfInstructions) {
        var itemSize, itemDecode, itemEncode;

        if (isGlyphLocationsLong) {
          itemSize = 4;

          itemDecode = function fontItemDecodeLong(data, offset) {
            return data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3];
          };

          itemEncode = function fontItemEncodeLong(data, offset, value) {
            data[offset] = value >>> 24 & 0xff;
            data[offset + 1] = value >> 16 & 0xff;
            data[offset + 2] = value >> 8 & 0xff;
            data[offset + 3] = value & 0xff;
          };
        } else {
          itemSize = 2;

          itemDecode = function fontItemDecode(data, offset) {
            return data[offset] << 9 | data[offset + 1] << 1;
          };

          itemEncode = function fontItemEncode(data, offset, value) {
            data[offset] = value >> 9 & 0xff;
            data[offset + 1] = value >> 1 & 0xff;
          };
        }

        var numGlyphsOut = dupFirstEntry ? numGlyphs + 1 : numGlyphs;
        var locaDataSize = itemSize * (1 + numGlyphsOut);
        var locaData = new Uint8Array(locaDataSize);
        locaData.set(loca.data.subarray(0, locaDataSize));
        loca.data = locaData;
        var oldGlyfData = glyf.data;
        var oldGlyfDataLength = oldGlyfData.length;
        var newGlyfData = new Uint8Array(oldGlyfDataLength);
        var i, j;
        var locaEntries = [];

        for (i = 0, j = 0; i < numGlyphs + 1; i++, j += itemSize) {
          var offset = itemDecode(locaData, j);

          if (offset > oldGlyfDataLength) {
            offset = oldGlyfDataLength;
          }

          locaEntries.push({
            index: i,
            offset: offset,
            endOffset: 0
          });
        }

        locaEntries.sort(function (a, b) {
          return a.offset - b.offset;
        });

        for (i = 0; i < numGlyphs; i++) {
          locaEntries[i].endOffset = locaEntries[i + 1].offset;
        }

        locaEntries.sort(function (a, b) {
          return a.index - b.index;
        });
        var missingGlyphs = Object.create(null);
        var writeOffset = 0;
        itemEncode(locaData, 0, writeOffset);

        for (i = 0, j = itemSize; i < numGlyphs; i++, j += itemSize) {
          var glyphProfile = sanitizeGlyph(oldGlyfData, locaEntries[i].offset, locaEntries[i].endOffset, newGlyfData, writeOffset, hintsValid);
          var newLength = glyphProfile.length;

          if (newLength === 0) {
            missingGlyphs[i] = true;
          }

          if (glyphProfile.sizeOfInstructions > maxSizeOfInstructions) {
            maxSizeOfInstructions = glyphProfile.sizeOfInstructions;
          }

          writeOffset += newLength;
          itemEncode(locaData, j, writeOffset);
        }

        if (writeOffset === 0) {
          var simpleGlyph = new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0]);

          for (i = 0, j = itemSize; i < numGlyphsOut; i++, j += itemSize) {
            itemEncode(locaData, j, simpleGlyph.length);
          }

          glyf.data = simpleGlyph;
        } else if (dupFirstEntry) {
          var firstEntryLength = itemDecode(locaData, itemSize);

          if (newGlyfData.length > firstEntryLength + writeOffset) {
            glyf.data = newGlyfData.subarray(0, firstEntryLength + writeOffset);
          } else {
            glyf.data = new Uint8Array(firstEntryLength + writeOffset);
            glyf.data.set(newGlyfData.subarray(0, writeOffset));
          }

          glyf.data.set(newGlyfData.subarray(0, firstEntryLength), writeOffset);
          itemEncode(loca.data, locaData.length - itemSize, writeOffset + firstEntryLength);
        } else {
          glyf.data = newGlyfData.subarray(0, writeOffset);
        }

        return {
          missingGlyphs: missingGlyphs,
          maxSizeOfInstructions: maxSizeOfInstructions
        };
      }

      function readPostScriptTable(post, propertiesObj, maxpNumGlyphs) {
        var start = (font.start ? font.start : 0) + post.offset;
        font.pos = start;
        var length = post.length,
            end = start + length;
        var version = font.getInt32();
        font.skip(28);
        var glyphNames;
        var valid = true;
        var i;

        switch (version) {
          case 0x00010000:
            glyphNames = _fonts_utils.MacStandardGlyphOrdering;
            break;

          case 0x00020000:
            var _numGlyphs = font.getUint16();

            if (_numGlyphs !== maxpNumGlyphs) {
              valid = false;
              break;
            }

            var glyphNameIndexes = [];

            for (i = 0; i < _numGlyphs; ++i) {
              var index = font.getUint16();

              if (index >= 32768) {
                valid = false;
                break;
              }

              glyphNameIndexes.push(index);
            }

            if (!valid) {
              break;
            }

            var customNames = [],
                strBuf = [];

            while (font.pos < end) {
              var stringLength = font.getByte();
              strBuf.length = stringLength;

              for (i = 0; i < stringLength; ++i) {
                strBuf[i] = String.fromCharCode(font.getByte());
              }

              customNames.push(strBuf.join(""));
            }

            glyphNames = [];

            for (i = 0; i < _numGlyphs; ++i) {
              var j = glyphNameIndexes[i];

              if (j < 258) {
                glyphNames.push(_fonts_utils.MacStandardGlyphOrdering[j]);
                continue;
              }

              glyphNames.push(customNames[j - 258]);
            }

            break;

          case 0x00030000:
            break;

          default:
            (0, _util.warn)("Unknown/unsupported post table version " + version);
            valid = false;

            if (propertiesObj.defaultEncoding) {
              glyphNames = propertiesObj.defaultEncoding;
            }

            break;
        }

        propertiesObj.glyphNames = glyphNames;
        return valid;
      }

      function readNameTable(nameTable) {
        var start = (font.start ? font.start : 0) + nameTable.offset;
        font.pos = start;
        var names = [[], []];
        var length = nameTable.length,
            end = start + length;
        var format = font.getUint16();
        var FORMAT_0_HEADER_LENGTH = 6;

        if (format !== 0 || length < FORMAT_0_HEADER_LENGTH) {
          return names;
        }

        var numRecords = font.getUint16();
        var stringsStart = font.getUint16();
        var records = [];
        var NAME_RECORD_LENGTH = 12;
        var i, ii;

        for (i = 0; i < numRecords && font.pos + NAME_RECORD_LENGTH <= end; i++) {
          var r = {
            platform: font.getUint16(),
            encoding: font.getUint16(),
            language: font.getUint16(),
            name: font.getUint16(),
            length: font.getUint16(),
            offset: font.getUint16()
          };

          if (r.platform === 1 && r.encoding === 0 && r.language === 0 || r.platform === 3 && r.encoding === 1 && r.language === 0x409) {
            records.push(r);
          }
        }

        for (i = 0, ii = records.length; i < ii; i++) {
          var record = records[i];

          if (record.length <= 0) {
            continue;
          }

          var pos = start + stringsStart + record.offset;

          if (pos + record.length > end) {
            continue;
          }

          font.pos = pos;
          var nameIndex = record.name;

          if (record.encoding) {
            var str = "";

            for (var j = 0, jj = record.length; j < jj; j += 2) {
              str += String.fromCharCode(font.getUint16());
            }

            names[1][nameIndex] = str;
          } else {
            names[0][nameIndex] = font.getString(record.length);
          }
        }

        return names;
      }

      var TTOpsStackDeltas = [0, 0, 0, 0, 0, 0, 0, 0, -2, -2, -2, -2, 0, 0, -2, -5, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, 0, -1, -1, -1, -1, 1, -1, -999, 0, 1, 0, -1, -2, 0, -1, -2, -1, -1, 0, -1, -1, 0, 0, -999, -999, -1, -1, -1, -1, -2, -999, -2, -2, -999, 0, -2, -2, 0, 0, -2, 0, -2, 0, 0, 0, -2, -1, -1, 1, 1, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, 0, -1, -1, 0, -999, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2, -999, -999, -999, -999, -999, -1, -1, -2, -2, 0, 0, 0, 0, -1, -1, -999, -2, -2, 0, 0, -1, -2, -2, 0, 0, 0, -1, -1, -1, -2];

      function sanitizeTTProgram(table, ttContext) {
        var data = table.data;
        var i = 0,
            j,
            n,
            b,
            funcId,
            pc,
            lastEndf = 0,
            lastDeff = 0;
        var stack = [];
        var callstack = [];
        var functionsCalled = [];
        var tooComplexToFollowFunctions = ttContext.tooComplexToFollowFunctions;
        var inFDEF = false,
            ifLevel = 0,
            inELSE = 0;

        for (var ii = data.length; i < ii;) {
          var op = data[i++];

          if (op === 0x40) {
            n = data[i++];

            if (inFDEF || inELSE) {
              i += n;
            } else {
              for (j = 0; j < n; j++) {
                stack.push(data[i++]);
              }
            }
          } else if (op === 0x41) {
            n = data[i++];

            if (inFDEF || inELSE) {
              i += n * 2;
            } else {
              for (j = 0; j < n; j++) {
                b = data[i++];
                stack.push(b << 8 | data[i++]);
              }
            }
          } else if ((op & 0xf8) === 0xb0) {
            n = op - 0xb0 + 1;

            if (inFDEF || inELSE) {
              i += n;
            } else {
              for (j = 0; j < n; j++) {
                stack.push(data[i++]);
              }
            }
          } else if ((op & 0xf8) === 0xb8) {
            n = op - 0xb8 + 1;

            if (inFDEF || inELSE) {
              i += n * 2;
            } else {
              for (j = 0; j < n; j++) {
                b = data[i++];
                stack.push(b << 8 | data[i++]);
              }
            }
          } else if (op === 0x2b && !tooComplexToFollowFunctions) {
            if (!inFDEF && !inELSE) {
              funcId = stack[stack.length - 1];

              if (isNaN(funcId)) {
                (0, _util.info)("TT: CALL empty stack (or invalid entry).");
              } else {
                ttContext.functionsUsed[funcId] = true;

                if (funcId in ttContext.functionsStackDeltas) {
                  var newStackLength = stack.length + ttContext.functionsStackDeltas[funcId];

                  if (newStackLength < 0) {
                    (0, _util.warn)("TT: CALL invalid functions stack delta.");
                    ttContext.hintsValid = false;
                    return;
                  }

                  stack.length = newStackLength;
                } else if (funcId in ttContext.functionsDefined && !functionsCalled.includes(funcId)) {
                  callstack.push({
                    data: data,
                    i: i,
                    stackTop: stack.length - 1
                  });
                  functionsCalled.push(funcId);
                  pc = ttContext.functionsDefined[funcId];

                  if (!pc) {
                    (0, _util.warn)("TT: CALL non-existent function");
                    ttContext.hintsValid = false;
                    return;
                  }

                  data = pc.data;
                  i = pc.i;
                }
              }
            }
          } else if (op === 0x2c && !tooComplexToFollowFunctions) {
            if (inFDEF || inELSE) {
              (0, _util.warn)("TT: nested FDEFs not allowed");
              tooComplexToFollowFunctions = true;
            }

            inFDEF = true;
            lastDeff = i;
            funcId = stack.pop();
            ttContext.functionsDefined[funcId] = {
              data: data,
              i: i
            };
          } else if (op === 0x2d) {
            if (inFDEF) {
              inFDEF = false;
              lastEndf = i;
            } else {
              pc = callstack.pop();

              if (!pc) {
                (0, _util.warn)("TT: ENDF bad stack");
                ttContext.hintsValid = false;
                return;
              }

              funcId = functionsCalled.pop();
              data = pc.data;
              i = pc.i;
              ttContext.functionsStackDeltas[funcId] = stack.length - pc.stackTop;
            }
          } else if (op === 0x89) {
            if (inFDEF || inELSE) {
              (0, _util.warn)("TT: nested IDEFs not allowed");
              tooComplexToFollowFunctions = true;
            }

            inFDEF = true;
            lastDeff = i;
          } else if (op === 0x58) {
            ++ifLevel;
          } else if (op === 0x1b) {
            inELSE = ifLevel;
          } else if (op === 0x59) {
            if (inELSE === ifLevel) {
              inELSE = 0;
            }

            --ifLevel;
          } else if (op === 0x1c) {
            if (!inFDEF && !inELSE) {
              var offset = stack[stack.length - 1];

              if (offset > 0) {
                i += offset - 1;
              }
            }
          }

          if (!inFDEF && !inELSE) {
            var stackDelta = 0;

            if (op <= 0x8e) {
              stackDelta = TTOpsStackDeltas[op];
            } else if (op >= 0xc0 && op <= 0xdf) {
              stackDelta = -1;
            } else if (op >= 0xe0) {
              stackDelta = -2;
            }

            if (op >= 0x71 && op <= 0x75) {
              n = stack.pop();

              if (!isNaN(n)) {
                stackDelta = -n * 2;
              }
            }

            while (stackDelta < 0 && stack.length > 0) {
              stack.pop();
              stackDelta++;
            }

            while (stackDelta > 0) {
              stack.push(NaN);
              stackDelta--;
            }
          }
        }

        ttContext.tooComplexToFollowFunctions = tooComplexToFollowFunctions;
        var content = [data];

        if (i > data.length) {
          content.push(new Uint8Array(i - data.length));
        }

        if (lastDeff > lastEndf) {
          (0, _util.warn)("TT: complementing a missing function tail");
          content.push(new Uint8Array([0x22, 0x2d]));
        }

        foldTTTable(table, content);
      }

      function checkInvalidFunctions(ttContext, maxFunctionDefs) {
        if (ttContext.tooComplexToFollowFunctions) {
          return;
        }

        if (ttContext.functionsDefined.length > maxFunctionDefs) {
          (0, _util.warn)("TT: more functions defined than expected");
          ttContext.hintsValid = false;
          return;
        }

        for (var j = 0, jj = ttContext.functionsUsed.length; j < jj; j++) {
          if (j > maxFunctionDefs) {
            (0, _util.warn)("TT: invalid function id: " + j);
            ttContext.hintsValid = false;
            return;
          }

          if (ttContext.functionsUsed[j] && !ttContext.functionsDefined[j]) {
            (0, _util.warn)("TT: undefined function: " + j);
            ttContext.hintsValid = false;
            return;
          }
        }
      }

      function foldTTTable(table, content) {
        if (content.length > 1) {
          var newLength = 0;
          var j, jj;

          for (j = 0, jj = content.length; j < jj; j++) {
            newLength += content[j].length;
          }

          newLength = newLength + 3 & ~3;
          var result = new Uint8Array(newLength);
          var pos = 0;

          for (j = 0, jj = content.length; j < jj; j++) {
            result.set(content[j], pos);
            pos += content[j].length;
          }

          table.data = result;
          table.length = newLength;
        }
      }

      function sanitizeTTPrograms(fpgm, prep, cvt, maxFunctionDefs) {
        var ttContext = {
          functionsDefined: [],
          functionsUsed: [],
          functionsStackDeltas: [],
          tooComplexToFollowFunctions: false,
          hintsValid: true
        };

        if (fpgm) {
          sanitizeTTProgram(fpgm, ttContext);
        }

        if (prep) {
          sanitizeTTProgram(prep, ttContext);
        }

        if (fpgm) {
          checkInvalidFunctions(ttContext, maxFunctionDefs);
        }

        if (cvt && cvt.length & 1) {
          var cvtData = new Uint8Array(cvt.length + 1);
          cvtData.set(cvt.data);
          cvt.data = cvtData;
        }

        return ttContext.hintsValid;
      }

      font = new _stream.Stream(new Uint8Array(font.getBytes()));
      var header, tables;

      if (isTrueTypeCollectionFile(font)) {
        var ttcData = readTrueTypeCollectionData(font, this.name);
        header = ttcData.header;
        tables = ttcData.tables;
      } else {
        header = readOpenTypeHeader(font);
        tables = readTables(font, header.numTables);
      }

      var cff, cffFile;
      var isTrueType = !tables["CFF "];

      if (!isTrueType) {
        var isComposite = properties.composite && ((properties.cidToGidMap || []).length > 0 || !(properties.cMap instanceof _cmap.IdentityCMap));

        if (header.version === "OTTO" && !isComposite || !tables.head || !tables.hhea || !tables.maxp || !tables.post) {
          cffFile = new _stream.Stream(tables["CFF "].data);
          cff = new _cff_font.CFFFont(cffFile, properties);
          adjustWidths(properties);
          return this.convert(name, cff, properties);
        }

        delete tables.glyf;
        delete tables.loca;
        delete tables.fpgm;
        delete tables.prep;
        delete tables["cvt "];
        this.isOpenType = true;
      } else {
        if (!tables.loca) {
          throw new _util.FormatError('Required "loca" table is not found');
        }

        if (!tables.glyf) {
          (0, _util.warn)('Required "glyf" table is not found -- trying to recover.');
          tables.glyf = {
            tag: "glyf",
            data: new Uint8Array(0)
          };
        }

        this.isOpenType = false;
      }

      if (!tables.maxp) {
        throw new _util.FormatError('Required "maxp" table is not found');
      }

      font.pos = (font.start || 0) + tables.maxp.offset;
      var version = font.getInt32();
      var numGlyphs = font.getUint16();

      if (properties.scaleFactors && properties.scaleFactors.length === numGlyphs && isTrueType) {
        var scaleFactors = properties.scaleFactors;
        var isGlyphLocationsLong = int16(tables.head.data[50], tables.head.data[51]);
        var glyphs = new _glyf.GlyfTable({
          glyfTable: tables.glyf.data,
          isGlyphLocationsLong: isGlyphLocationsLong,
          locaTable: tables.loca.data,
          numGlyphs: numGlyphs
        });
        glyphs.scale(scaleFactors);

        var _glyphs$write = glyphs.write(),
            glyf = _glyphs$write.glyf,
            loca = _glyphs$write.loca,
            isLocationLong = _glyphs$write.isLocationLong;

        tables.glyf.data = glyf;
        tables.loca.data = loca;

        if (isLocationLong !== !!isGlyphLocationsLong) {
          tables.head.data[50] = 0;
          tables.head.data[51] = isLocationLong ? 1 : 0;
        }

        var metrics = tables.hmtx.data;

        for (var i = 0; i < numGlyphs; i++) {
          var j = 4 * i;
          var advanceWidth = Math.round(scaleFactors[i] * int16(metrics[j], metrics[j + 1]));
          metrics[j] = advanceWidth >> 8 & 0xff;
          metrics[j + 1] = advanceWidth & 0xff;
          var lsb = Math.round(scaleFactors[i] * signedInt16(metrics[j + 2], metrics[j + 3]));
          writeSignedInt16(metrics, j + 2, lsb);
        }
      }

      var numGlyphsOut = numGlyphs + 1;
      var dupFirstEntry = true;

      if (numGlyphsOut > 0xffff) {
        dupFirstEntry = false;
        numGlyphsOut = numGlyphs;
        (0, _util.warn)("Not enough space in glyfs to duplicate first glyph.");
      }

      var maxFunctionDefs = 0;
      var maxSizeOfInstructions = 0;

      if (version >= 0x00010000 && tables.maxp.length >= 22) {
        font.pos += 8;
        var maxZones = font.getUint16();

        if (maxZones > 2) {
          tables.maxp.data[14] = 0;
          tables.maxp.data[15] = 2;
        }

        font.pos += 4;
        maxFunctionDefs = font.getUint16();
        font.pos += 4;
        maxSizeOfInstructions = font.getUint16();
      }

      tables.maxp.data[4] = numGlyphsOut >> 8;
      tables.maxp.data[5] = numGlyphsOut & 255;
      var hintsValid = sanitizeTTPrograms(tables.fpgm, tables.prep, tables["cvt "], maxFunctionDefs);

      if (!hintsValid) {
        delete tables.fpgm;
        delete tables.prep;
        delete tables["cvt "];
      }

      sanitizeMetrics(font, tables.hhea, tables.hmtx, tables.head, numGlyphsOut, dupFirstEntry);

      if (!tables.head) {
        throw new _util.FormatError('Required "head" table is not found');
      }

      sanitizeHead(tables.head, numGlyphs, isTrueType ? tables.loca.length : 0);
      var missingGlyphs = Object.create(null);

      if (isTrueType) {
        var _isGlyphLocationsLong = int16(tables.head.data[50], tables.head.data[51]);

        var glyphsInfo = sanitizeGlyphLocations(tables.loca, tables.glyf, numGlyphs, _isGlyphLocationsLong, hintsValid, dupFirstEntry, maxSizeOfInstructions);
        missingGlyphs = glyphsInfo.missingGlyphs;

        if (version >= 0x00010000 && tables.maxp.length >= 22) {
          tables.maxp.data[26] = glyphsInfo.maxSizeOfInstructions >> 8;
          tables.maxp.data[27] = glyphsInfo.maxSizeOfInstructions & 255;
        }
      }

      if (!tables.hhea) {
        throw new _util.FormatError('Required "hhea" table is not found');
      }

      if (tables.hhea.data[10] === 0 && tables.hhea.data[11] === 0) {
        tables.hhea.data[10] = 0xff;
        tables.hhea.data[11] = 0xff;
      }

      var metricsOverride = {
        unitsPerEm: int16(tables.head.data[18], tables.head.data[19]),
        yMax: int16(tables.head.data[42], tables.head.data[43]),
        yMin: signedInt16(tables.head.data[38], tables.head.data[39]),
        ascent: signedInt16(tables.hhea.data[4], tables.hhea.data[5]),
        descent: signedInt16(tables.hhea.data[6], tables.hhea.data[7]),
        lineGap: signedInt16(tables.hhea.data[8], tables.hhea.data[9])
      };
      this.ascent = metricsOverride.ascent / metricsOverride.unitsPerEm;
      this.descent = metricsOverride.descent / metricsOverride.unitsPerEm;
      this.lineGap = metricsOverride.lineGap / metricsOverride.unitsPerEm;

      if (this.cssFontInfo && this.cssFontInfo.lineHeight) {
        this.lineHeight = this.cssFontInfo.metrics.lineHeight;
        this.lineGap = this.cssFontInfo.metrics.lineGap;
      } else {
        this.lineHeight = this.ascent - this.descent + this.lineGap;
      }

      if (tables.post) {
        readPostScriptTable(tables.post, properties, numGlyphs);
      }

      tables.post = {
        tag: "post",
        data: createPostTable(properties)
      };
      var charCodeToGlyphId = [];

      function hasGlyph(glyphId) {
        return !missingGlyphs[glyphId];
      }

      if (properties.composite) {
        var cidToGidMap = properties.cidToGidMap || [];
        var isCidToGidMapEmpty = cidToGidMap.length === 0;
        properties.cMap.forEach(function (charCode, cid) {
          if (typeof cid === "string") {
            cid = convertCidString(charCode, cid, true);
          }

          if (cid > 0xffff) {
            throw new _util.FormatError("Max size of CID is 65,535");
          }

          var glyphId = -1;

          if (isCidToGidMapEmpty) {
            glyphId = cid;
          } else if (cidToGidMap[cid] !== undefined) {
            glyphId = cidToGidMap[cid];
          }

          if (glyphId >= 0 && glyphId < numGlyphs && hasGlyph(glyphId)) {
            charCodeToGlyphId[charCode] = glyphId;
          }
        });
      } else {
        var cmapTable = readCmapTable(tables.cmap, font, this.isSymbolicFont, properties.hasEncoding);
        var cmapPlatformId = cmapTable.platformId;
        var cmapEncodingId = cmapTable.encodingId;
        var cmapMappings = cmapTable.mappings;
        var cmapMappingsLength = cmapMappings.length;
        var baseEncoding = [],
            forcePostTable = false;

        if (properties.hasEncoding && (properties.baseEncodingName === "MacRomanEncoding" || properties.baseEncodingName === "WinAnsiEncoding")) {
          baseEncoding = (0, _encodings.getEncoding)(properties.baseEncodingName);
        }

        if (properties.hasEncoding && !this.isSymbolicFont && (cmapPlatformId === 3 && cmapEncodingId === 1 || cmapPlatformId === 1 && cmapEncodingId === 0)) {
          var glyphsUnicodeMap = (0, _glyphlist.getGlyphsUnicode)();

          for (var charCode = 0; charCode < 256; charCode++) {
            var glyphName = void 0;

            if (this.differences[charCode] !== undefined) {
              glyphName = this.differences[charCode];
            } else if (baseEncoding.length && baseEncoding[charCode] !== "") {
              glyphName = baseEncoding[charCode];
            } else {
              glyphName = _encodings.StandardEncoding[charCode];
            }

            if (!glyphName) {
              continue;
            }

            var standardGlyphName = (0, _fonts_utils.recoverGlyphName)(glyphName, glyphsUnicodeMap);
            var unicodeOrCharCode = void 0;

            if (cmapPlatformId === 3 && cmapEncodingId === 1) {
              unicodeOrCharCode = glyphsUnicodeMap[standardGlyphName];
            } else if (cmapPlatformId === 1 && cmapEncodingId === 0) {
              unicodeOrCharCode = _encodings.MacRomanEncoding.indexOf(standardGlyphName);
            }

            if (unicodeOrCharCode === undefined) {
              if (!properties.glyphNames && properties.hasIncludedToUnicodeMap && !(this.toUnicode instanceof _to_unicode_map.IdentityToUnicodeMap)) {
                var unicode = this.toUnicode.get(charCode);

                if (unicode) {
                  unicodeOrCharCode = unicode.codePointAt(0);
                }
              }

              if (unicodeOrCharCode === undefined) {
                continue;
              }
            }

            for (var _i6 = 0; _i6 < cmapMappingsLength; ++_i6) {
              if (cmapMappings[_i6].charCode !== unicodeOrCharCode) {
                continue;
              }

              charCodeToGlyphId[charCode] = cmapMappings[_i6].glyphId;
              break;
            }
          }
        } else if (cmapPlatformId === 0) {
          for (var _i7 = 0; _i7 < cmapMappingsLength; ++_i7) {
            charCodeToGlyphId[cmapMappings[_i7].charCode] = cmapMappings[_i7].glyphId;
          }

          forcePostTable = true;
        } else {
          for (var _i8 = 0; _i8 < cmapMappingsLength; ++_i8) {
            var _charCode2 = cmapMappings[_i8].charCode;

            if (cmapPlatformId === 3 && _charCode2 >= 0xf000 && _charCode2 <= 0xf0ff) {
              _charCode2 &= 0xff;
            }

            charCodeToGlyphId[_charCode2] = cmapMappings[_i8].glyphId;
          }
        }

        if (properties.glyphNames && (baseEncoding.length || this.differences.length)) {
          for (var _i9 = 0; _i9 < 256; ++_i9) {
            if (!forcePostTable && charCodeToGlyphId[_i9] !== undefined) {
              continue;
            }

            var _glyphName = this.differences[_i9] || baseEncoding[_i9];

            if (!_glyphName) {
              continue;
            }

            var glyphId = properties.glyphNames.indexOf(_glyphName);

            if (glyphId > 0 && hasGlyph(glyphId)) {
              charCodeToGlyphId[_i9] = glyphId;
            }
          }
        }
      }

      if (charCodeToGlyphId.length === 0) {
        charCodeToGlyphId[0] = 0;
      }

      var glyphZeroId = numGlyphsOut - 1;

      if (!dupFirstEntry) {
        glyphZeroId = 0;
      }

      if (!properties.cssFontInfo) {
        var newMapping = adjustMapping(charCodeToGlyphId, hasGlyph, glyphZeroId);
        this.toFontChar = newMapping.toFontChar;
        tables.cmap = {
          tag: "cmap",
          data: createCmapTable(newMapping.charCodeToGlyphId, numGlyphsOut)
        };

        if (!tables["OS/2"] || !validateOS2Table(tables["OS/2"], font)) {
          tables["OS/2"] = {
            tag: "OS/2",
            data: createOS2Table(properties, newMapping.charCodeToGlyphId, metricsOverride)
          };
        }
      }

      if (!isTrueType) {
        try {
          cffFile = new _stream.Stream(tables["CFF "].data);
          var parser = new _cff_parser.CFFParser(cffFile, properties, _fonts_utils.SEAC_ANALYSIS_ENABLED);
          cff = parser.parse();
          cff.duplicateFirstGlyph();
          var compiler = new _cff_parser.CFFCompiler(cff);
          tables["CFF "].data = compiler.compile();
        } catch (e) {
          (0, _util.warn)("Failed to compile font " + properties.loadedName);
        }
      }

      if (!tables.name) {
        tables.name = {
          tag: "name",
          data: createNameTable(this.name)
        };
      } else {
        var namePrototype = readNameTable(tables.name);
        tables.name.data = createNameTable(name, namePrototype);
        this.psName = namePrototype[0][6] || null;
      }

      var builder = new _opentype_file_builder.OpenTypeFileBuilder(header.version);

      for (var tableTag in tables) {
        builder.addTable(tableTag, tables[tableTag].data);
      }

      return builder.toArray();
    }
  }, {
    key: "convert",
    value: function convert(fontName, font, properties) {
      properties.fixedPitch = false;

      if (properties.builtInEncoding) {
        adjustToUnicode(properties, properties.builtInEncoding);
      }

      var glyphZeroId = 1;

      if (font instanceof _cff_font.CFFFont) {
        glyphZeroId = font.numGlyphs - 1;
      }

      var mapping = font.getGlyphMapping(properties);
      var newMapping = null;
      var newCharCodeToGlyphId = mapping;

      if (!properties.cssFontInfo) {
        newMapping = adjustMapping(mapping, font.hasGlyphId.bind(font), glyphZeroId);
        this.toFontChar = newMapping.toFontChar;
        newCharCodeToGlyphId = newMapping.charCodeToGlyphId;
      }

      var numGlyphs = font.numGlyphs;

      function getCharCodes(charCodeToGlyphId, glyphId) {
        var charCodes = null;

        for (var charCode in charCodeToGlyphId) {
          if (glyphId === charCodeToGlyphId[charCode]) {
            if (!charCodes) {
              charCodes = [];
            }

            charCodes.push(charCode | 0);
          }
        }

        return charCodes;
      }

      function createCharCode(charCodeToGlyphId, glyphId) {
        for (var charCode in charCodeToGlyphId) {
          if (glyphId === charCodeToGlyphId[charCode]) {
            return charCode | 0;
          }
        }

        newMapping.charCodeToGlyphId[newMapping.nextAvailableFontCharCode] = glyphId;
        return newMapping.nextAvailableFontCharCode++;
      }

      var seacs = font.seacs;

      if (newMapping && _fonts_utils.SEAC_ANALYSIS_ENABLED && seacs && seacs.length) {
        var matrix = properties.fontMatrix || _util.FONT_IDENTITY_MATRIX;
        var charset = font.getCharset();
        var seacMap = Object.create(null);

        for (var glyphId in seacs) {
          glyphId |= 0;
          var seac = seacs[glyphId];
          var baseGlyphName = _encodings.StandardEncoding[seac[2]];
          var accentGlyphName = _encodings.StandardEncoding[seac[3]];
          var baseGlyphId = charset.indexOf(baseGlyphName);
          var accentGlyphId = charset.indexOf(accentGlyphName);

          if (baseGlyphId < 0 || accentGlyphId < 0) {
            continue;
          }

          var accentOffset = {
            x: seac[0] * matrix[0] + seac[1] * matrix[2] + matrix[4],
            y: seac[0] * matrix[1] + seac[1] * matrix[3] + matrix[5]
          };
          var charCodes = getCharCodes(mapping, glyphId);

          if (!charCodes) {
            continue;
          }

          for (var i = 0, ii = charCodes.length; i < ii; i++) {
            var charCode = charCodes[i];
            var charCodeToGlyphId = newMapping.charCodeToGlyphId;
            var baseFontCharCode = createCharCode(charCodeToGlyphId, baseGlyphId);
            var accentFontCharCode = createCharCode(charCodeToGlyphId, accentGlyphId);
            seacMap[charCode] = {
              baseFontCharCode: baseFontCharCode,
              accentFontCharCode: accentFontCharCode,
              accentOffset: accentOffset
            };
          }
        }

        properties.seacMap = seacMap;
      }

      var unitsPerEm = 1 / (properties.fontMatrix || _util.FONT_IDENTITY_MATRIX)[0];
      var builder = new _opentype_file_builder.OpenTypeFileBuilder("\x4F\x54\x54\x4F");
      builder.addTable("CFF ", font.data);
      builder.addTable("OS/2", createOS2Table(properties, newCharCodeToGlyphId));
      builder.addTable("cmap", createCmapTable(newCharCodeToGlyphId, numGlyphs));
      builder.addTable("head", "\x00\x01\x00\x00" + "\x00\x00\x10\x00" + "\x00\x00\x00\x00" + "\x5F\x0F\x3C\xF5" + "\x00\x00" + safeString16(unitsPerEm) + "\x00\x00\x00\x00\x9e\x0b\x7e\x27" + "\x00\x00\x00\x00\x9e\x0b\x7e\x27" + "\x00\x00" + safeString16(properties.descent) + "\x0F\xFF" + safeString16(properties.ascent) + string16(properties.italicAngle ? 2 : 0) + "\x00\x11" + "\x00\x00" + "\x00\x00" + "\x00\x00");
      builder.addTable("hhea", "\x00\x01\x00\x00" + safeString16(properties.ascent) + safeString16(properties.descent) + "\x00\x00" + "\xFF\xFF" + "\x00\x00" + "\x00\x00" + "\x00\x00" + safeString16(properties.capHeight) + safeString16(Math.tan(properties.italicAngle) * properties.xHeight) + "\x00\x00" + "\x00\x00" + "\x00\x00" + "\x00\x00" + "\x00\x00" + "\x00\x00" + string16(numGlyphs));
      builder.addTable("hmtx", function fontFieldsHmtx() {
        var charstrings = font.charstrings;
        var cffWidths = font.cff ? font.cff.widths : null;
        var hmtx = "\x00\x00\x00\x00";

        for (var _i10 = 1, _ii = numGlyphs; _i10 < _ii; _i10++) {
          var width = 0;

          if (charstrings) {
            var charstring = charstrings[_i10 - 1];
            width = "width" in charstring ? charstring.width : 0;
          } else if (cffWidths) {
            width = Math.ceil(cffWidths[_i10] || 0);
          }

          hmtx += string16(width) + string16(0);
        }

        return hmtx;
      }());
      builder.addTable("maxp", "\x00\x00\x50\x00" + string16(numGlyphs));
      builder.addTable("name", createNameTable(fontName));
      builder.addTable("post", createPostTable(properties));
      return builder.toArray();
    }
  }, {
    key: "spaceWidth",
    get: function get() {
      var possibleSpaceReplacements = ["space", "minus", "one", "i", "I"];
      var width;

      for (var i = 0, ii = possibleSpaceReplacements.length; i < ii; i++) {
        var glyphName = possibleSpaceReplacements[i];

        if (glyphName in this.widths) {
          width = this.widths[glyphName];
          break;
        }

        var glyphsUnicodeMap = (0, _glyphlist.getGlyphsUnicode)();
        var glyphUnicode = glyphsUnicodeMap[glyphName];
        var charcode = 0;

        if (this.composite && this.cMap.contains(glyphUnicode)) {
          charcode = this.cMap.lookup(glyphUnicode);

          if (typeof charcode === "string") {
            charcode = convertCidString(glyphUnicode, charcode);
          }
        }

        if (!charcode && this.toUnicode) {
          charcode = this.toUnicode.charCodeOf(glyphUnicode);
        }

        if (charcode <= 0) {
          charcode = glyphUnicode;
        }

        width = this.widths[charcode];

        if (width) {
          break;
        }
      }

      width = width || this.defaultWidth;
      return (0, _util.shadow)(this, "spaceWidth", width);
    }
  }, {
    key: "_charToGlyph",
    value: function _charToGlyph(charcode) {
      var isSpace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var fontCharCode, width, operatorListId;
      var widthCode = charcode;

      if (this.cMap && this.cMap.contains(charcode)) {
        widthCode = this.cMap.lookup(charcode);

        if (typeof widthCode === "string") {
          widthCode = convertCidString(charcode, widthCode);
        }
      }

      width = this.widths[widthCode];
      width = (0, _util.isNum)(width) ? width : this.defaultWidth;
      var vmetric = this.vmetrics && this.vmetrics[widthCode];
      var unicode = this.toUnicode.get(charcode) || charcode;

      if (typeof unicode === "number") {
        unicode = String.fromCharCode(unicode);
      }

      var isInFont = this.toFontChar[charcode] !== undefined;
      fontCharCode = this.toFontChar[charcode] || charcode;

      if (this.missingFile) {
        var glyphName = this.differences[charcode] || this.defaultEncoding[charcode];

        if ((glyphName === ".notdef" || glyphName === "") && this.type === "Type1") {
          fontCharCode = 0x20;
        }

        fontCharCode = (0, _unicode.mapSpecialUnicodeValues)(fontCharCode);
      }

      if (this.isType3Font) {
        operatorListId = fontCharCode;
      }

      var accent = null;

      if (this.seacMap && this.seacMap[charcode]) {
        isInFont = true;
        var seac = this.seacMap[charcode];
        fontCharCode = seac.baseFontCharCode;
        accent = {
          fontChar: String.fromCodePoint(seac.accentFontCharCode),
          offset: seac.accentOffset
        };
      }

      var fontChar = "";

      if (typeof fontCharCode === "number") {
        if (fontCharCode <= 0x10ffff) {
          fontChar = String.fromCodePoint(fontCharCode);
        } else {
          (0, _util.warn)("charToGlyph - invalid fontCharCode: ".concat(fontCharCode));
        }
      }

      var glyph = this._glyphCache[charcode];

      if (!glyph || !glyph.matchesForCache(charcode, fontChar, unicode, accent, width, vmetric, operatorListId, isSpace, isInFont)) {
        glyph = new Glyph(charcode, fontChar, unicode, accent, width, vmetric, operatorListId, isSpace, isInFont);
        this._glyphCache[charcode] = glyph;
      }

      return glyph;
    }
  }, {
    key: "charsToGlyphs",
    value: function charsToGlyphs(chars) {
      var glyphs = this._charsCache[chars];

      if (glyphs) {
        return glyphs;
      }

      glyphs = [];

      if (this.cMap) {
        var c = Object.create(null),
            ii = chars.length;
        var i = 0;

        while (i < ii) {
          this.cMap.readCharCode(chars, i, c);
          var charcode = c.charcode,
              length = c.length;
          i += length;

          var glyph = this._charToGlyph(charcode, length === 1 && chars.charCodeAt(i - 1) === 0x20);

          glyphs.push(glyph);
        }
      } else {
        for (var _i11 = 0, _ii2 = chars.length; _i11 < _ii2; ++_i11) {
          var _charcode = chars.charCodeAt(_i11);

          var _glyph = this._charToGlyph(_charcode, _charcode === 0x20);

          glyphs.push(_glyph);
        }
      }

      return this._charsCache[chars] = glyphs;
    }
  }, {
    key: "getCharPositions",
    value: function getCharPositions(chars) {
      var positions = [];

      if (this.cMap) {
        var c = Object.create(null);
        var i = 0;

        while (i < chars.length) {
          this.cMap.readCharCode(chars, i, c);
          var length = c.length;
          positions.push([i, i + length]);
          i += length;
        }
      } else {
        for (var _i12 = 0, ii = chars.length; _i12 < ii; ++_i12) {
          positions.push([_i12, _i12 + 1]);
        }
      }

      return positions;
    }
  }, {
    key: "glyphCacheValues",
    get: function get() {
      return Object.values(this._glyphCache);
    }
  }, {
    key: "encodeString",
    value: function encodeString(str) {
      var _this2 = this;

      var buffers = [];
      var currentBuf = [];

      var hasCurrentBufErrors = function hasCurrentBufErrors() {
        return buffers.length % 2 === 1;
      };

      var getCharCode = this.toUnicode instanceof _to_unicode_map.IdentityToUnicodeMap ? function (unicode) {
        return _this2.toUnicode.charCodeOf(unicode);
      } : function (unicode) {
        return _this2.toUnicode.charCodeOf(String.fromCodePoint(unicode));
      };

      for (var i = 0, ii = str.length; i < ii; i++) {
        var unicode = str.codePointAt(i);

        if (unicode > 0xd7ff && (unicode < 0xe000 || unicode > 0xfffd)) {
          i++;
        }

        if (this.toUnicode) {
          var charCode = getCharCode(unicode);

          if (charCode !== -1) {
            if (hasCurrentBufErrors()) {
              buffers.push(currentBuf.join(""));
              currentBuf.length = 0;
            }

            var charCodeLength = this.cMap ? this.cMap.getCharCodeLength(charCode) : 1;

            for (var j = charCodeLength - 1; j >= 0; j--) {
              currentBuf.push(String.fromCharCode(charCode >> 8 * j & 0xff));
            }

            continue;
          }
        }

        if (!hasCurrentBufErrors()) {
          buffers.push(currentBuf.join(""));
          currentBuf.length = 0;
        }

        currentBuf.push(String.fromCodePoint(unicode));
      }

      buffers.push(currentBuf.join(""));
      return buffers;
    }
  }]);

  return Font;
}();

exports.Font = Font;

var ErrorFont = /*#__PURE__*/function () {
  function ErrorFont(error) {
    _classCallCheck(this, ErrorFont);

    this.error = error;
    this.loadedName = "g_font_error";
    this.missingFile = true;
  }

  _createClass(ErrorFont, [{
    key: "charsToGlyphs",
    value: function charsToGlyphs() {
      return [];
    }
  }, {
    key: "encodeString",
    value: function encodeString(chars) {
      return [chars];
    }
  }, {
    key: "exportData",
    value: function exportData() {
      var extraProperties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return {
        error: this.error
      };
    }
  }]);

  return ErrorFont;
}();

exports.ErrorFont = ErrorFont;