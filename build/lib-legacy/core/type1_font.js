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
exports.Type1Font = void 0;

var _cff_parser = require("./cff_parser.js");

var _fonts_utils = require("./fonts_utils.js");

var _core_utils = require("./core_utils.js");

var _stream = require("./stream.js");

var _type1_parser = require("./type1_parser.js");

var _util = require("../shared/util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function findBlock(streamBytes, signature, startIndex) {
  var streamBytesLength = streamBytes.length;
  var signatureLength = signature.length;
  var scanLength = streamBytesLength - signatureLength;
  var i = startIndex,
      found = false;

  while (i < scanLength) {
    var j = 0;

    while (j < signatureLength && streamBytes[i + j] === signature[j]) {
      j++;
    }

    if (j >= signatureLength) {
      i += j;

      while (i < streamBytesLength && (0, _core_utils.isWhiteSpace)(streamBytes[i])) {
        i++;
      }

      found = true;
      break;
    }

    i++;
  }

  return {
    found: found,
    length: i
  };
}

function getHeaderBlock(stream, suggestedLength) {
  var EEXEC_SIGNATURE = [0x65, 0x65, 0x78, 0x65, 0x63];
  var streamStartPos = stream.pos;
  var headerBytes, headerBytesLength, block;

  try {
    headerBytes = stream.getBytes(suggestedLength);
    headerBytesLength = headerBytes.length;
  } catch (ex) {}

  if (headerBytesLength === suggestedLength) {
    block = findBlock(headerBytes, EEXEC_SIGNATURE, suggestedLength - 2 * EEXEC_SIGNATURE.length);

    if (block.found && block.length === suggestedLength) {
      return {
        stream: new _stream.Stream(headerBytes),
        length: suggestedLength
      };
    }
  }

  (0, _util.warn)('Invalid "Length1" property in Type1 font -- trying to recover.');
  stream.pos = streamStartPos;
  var SCAN_BLOCK_LENGTH = 2048;
  var actualLength;

  while (true) {
    var scanBytes = stream.peekBytes(SCAN_BLOCK_LENGTH);
    block = findBlock(scanBytes, EEXEC_SIGNATURE, 0);

    if (block.length === 0) {
      break;
    }

    stream.pos += block.length;

    if (block.found) {
      actualLength = stream.pos - streamStartPos;
      break;
    }
  }

  stream.pos = streamStartPos;

  if (actualLength) {
    return {
      stream: new _stream.Stream(stream.getBytes(actualLength)),
      length: actualLength
    };
  }

  (0, _util.warn)('Unable to recover "Length1" property in Type1 font -- using as is.');
  return {
    stream: new _stream.Stream(stream.getBytes(suggestedLength)),
    length: suggestedLength
  };
}

function getEexecBlock(stream, suggestedLength) {
  var eexecBytes = stream.getBytes();
  return {
    stream: new _stream.Stream(eexecBytes),
    length: eexecBytes.length
  };
}

var Type1Font = /*#__PURE__*/function () {
  function Type1Font(name, file, properties) {
    _classCallCheck(this, Type1Font);

    var PFB_HEADER_SIZE = 6;
    var headerBlockLength = properties.length1;
    var eexecBlockLength = properties.length2;
    var pfbHeader = file.peekBytes(PFB_HEADER_SIZE);
    var pfbHeaderPresent = pfbHeader[0] === 0x80 && pfbHeader[1] === 0x01;

    if (pfbHeaderPresent) {
      file.skip(PFB_HEADER_SIZE);
      headerBlockLength = pfbHeader[5] << 24 | pfbHeader[4] << 16 | pfbHeader[3] << 8 | pfbHeader[2];
    }

    var headerBlock = getHeaderBlock(file, headerBlockLength);
    var headerBlockParser = new _type1_parser.Type1Parser(headerBlock.stream, false, _fonts_utils.SEAC_ANALYSIS_ENABLED);
    headerBlockParser.extractFontHeader(properties);

    if (pfbHeaderPresent) {
      pfbHeader = file.getBytes(PFB_HEADER_SIZE);
      eexecBlockLength = pfbHeader[5] << 24 | pfbHeader[4] << 16 | pfbHeader[3] << 8 | pfbHeader[2];
    }

    var eexecBlock = getEexecBlock(file, eexecBlockLength);
    var eexecBlockParser = new _type1_parser.Type1Parser(eexecBlock.stream, true, _fonts_utils.SEAC_ANALYSIS_ENABLED);
    var data = eexecBlockParser.extractFontProgram(properties);

    for (var key in data.properties) {
      properties[key] = data.properties[key];
    }

    var charstrings = data.charstrings;
    var type2Charstrings = this.getType2Charstrings(charstrings);
    var subrs = this.getType2Subrs(data.subrs);
    this.charstrings = charstrings;
    this.data = this.wrap(name, type2Charstrings, this.charstrings, subrs, properties);
    this.seacs = this.getSeacs(data.charstrings);
  }

  _createClass(Type1Font, [{
    key: "numGlyphs",
    get: function get() {
      return this.charstrings.length + 1;
    }
  }, {
    key: "getCharset",
    value: function getCharset() {
      var charset = [".notdef"];
      var charstrings = this.charstrings;

      for (var glyphId = 0; glyphId < charstrings.length; glyphId++) {
        charset.push(charstrings[glyphId].glyphName);
      }

      return charset;
    }
  }, {
    key: "getGlyphMapping",
    value: function getGlyphMapping(properties) {
      var charstrings = this.charstrings;

      if (properties.composite) {
        var charCodeToGlyphId = Object.create(null);

        for (var _glyphId = 0, charstringsLen = charstrings.length; _glyphId < charstringsLen; _glyphId++) {
          var charCode = properties.cMap.charCodeOf(_glyphId);
          charCodeToGlyphId[charCode] = _glyphId + 1;
        }

        return charCodeToGlyphId;
      }

      var glyphNames = [".notdef"];
      var builtInEncoding, glyphId;

      for (glyphId = 0; glyphId < charstrings.length; glyphId++) {
        glyphNames.push(charstrings[glyphId].glyphName);
      }

      var encoding = properties.builtInEncoding;

      if (encoding) {
        builtInEncoding = Object.create(null);

        for (var _charCode in encoding) {
          glyphId = glyphNames.indexOf(encoding[_charCode]);

          if (glyphId >= 0) {
            builtInEncoding[_charCode] = glyphId;
          }
        }
      }

      return (0, _fonts_utils.type1FontGlyphMapping)(properties, builtInEncoding, glyphNames);
    }
  }, {
    key: "hasGlyphId",
    value: function hasGlyphId(id) {
      if (id < 0 || id >= this.numGlyphs) {
        return false;
      }

      if (id === 0) {
        return true;
      }

      var glyph = this.charstrings[id - 1];
      return glyph.charstring.length > 0;
    }
  }, {
    key: "getSeacs",
    value: function getSeacs(charstrings) {
      var seacMap = [];

      for (var i = 0, ii = charstrings.length; i < ii; i++) {
        var charstring = charstrings[i];

        if (charstring.seac) {
          seacMap[i + 1] = charstring.seac;
        }
      }

      return seacMap;
    }
  }, {
    key: "getType2Charstrings",
    value: function getType2Charstrings(type1Charstrings) {
      var type2Charstrings = [];

      for (var i = 0, ii = type1Charstrings.length; i < ii; i++) {
        type2Charstrings.push(type1Charstrings[i].charstring);
      }

      return type2Charstrings;
    }
  }, {
    key: "getType2Subrs",
    value: function getType2Subrs(type1Subrs) {
      var bias = 0;
      var count = type1Subrs.length;

      if (count < 1133) {
        bias = 107;
      } else if (count < 33769) {
        bias = 1131;
      } else {
        bias = 32768;
      }

      var type2Subrs = [];
      var i;

      for (i = 0; i < bias; i++) {
        type2Subrs.push([0x0b]);
      }

      for (i = 0; i < count; i++) {
        type2Subrs.push(type1Subrs[i]);
      }

      return type2Subrs;
    }
  }, {
    key: "wrap",
    value: function wrap(name, glyphs, charstrings, subrs, properties) {
      var cff = new _cff_parser.CFF();
      cff.header = new _cff_parser.CFFHeader(1, 0, 4, 4);
      cff.names = [name];
      var topDict = new _cff_parser.CFFTopDict();
      topDict.setByName("version", 391);
      topDict.setByName("Notice", 392);
      topDict.setByName("FullName", 393);
      topDict.setByName("FamilyName", 394);
      topDict.setByName("Weight", 395);
      topDict.setByName("Encoding", null);
      topDict.setByName("FontMatrix", properties.fontMatrix);
      topDict.setByName("FontBBox", properties.bbox);
      topDict.setByName("charset", null);
      topDict.setByName("CharStrings", null);
      topDict.setByName("Private", null);
      cff.topDict = topDict;
      var strings = new _cff_parser.CFFStrings();
      strings.add("Version 0.11");
      strings.add("See original notice");
      strings.add(name);
      strings.add(name);
      strings.add("Medium");
      cff.strings = strings;
      cff.globalSubrIndex = new _cff_parser.CFFIndex();
      var count = glyphs.length;
      var charsetArray = [".notdef"];
      var i, ii;

      for (i = 0; i < count; i++) {
        var glyphName = charstrings[i].glyphName;

        var index = _cff_parser.CFFStandardStrings.indexOf(glyphName);

        if (index === -1) {
          strings.add(glyphName);
        }

        charsetArray.push(glyphName);
      }

      cff.charset = new _cff_parser.CFFCharset(false, 0, charsetArray);
      var charStringsIndex = new _cff_parser.CFFIndex();
      charStringsIndex.add([0x8b, 0x0e]);

      for (i = 0; i < count; i++) {
        charStringsIndex.add(glyphs[i]);
      }

      cff.charStrings = charStringsIndex;
      var privateDict = new _cff_parser.CFFPrivateDict();
      privateDict.setByName("Subrs", null);
      var fields = ["BlueValues", "OtherBlues", "FamilyBlues", "FamilyOtherBlues", "StemSnapH", "StemSnapV", "BlueShift", "BlueFuzz", "BlueScale", "LanguageGroup", "ExpansionFactor", "ForceBold", "StdHW", "StdVW"];

      for (i = 0, ii = fields.length; i < ii; i++) {
        var field = fields[i];

        if (!(field in properties.privateData)) {
          continue;
        }

        var value = properties.privateData[field];

        if (Array.isArray(value)) {
          for (var j = value.length - 1; j > 0; j--) {
            value[j] -= value[j - 1];
          }
        }

        privateDict.setByName(field, value);
      }

      cff.topDict.privateDict = privateDict;
      var subrIndex = new _cff_parser.CFFIndex();

      for (i = 0, ii = subrs.length; i < ii; i++) {
        subrIndex.add(subrs[i]);
      }

      privateDict.subrsIndex = subrIndex;
      var compiler = new _cff_parser.CFFCompiler(cff);
      return compiler.compile();
    }
  }]);

  return Type1Font;
}();

exports.Type1Font = Type1Font;