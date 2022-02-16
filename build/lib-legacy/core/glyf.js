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
exports.GlyfTable = void 0;

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

var ON_CURVE_POINT = 1 << 0;
var X_SHORT_VECTOR = 1 << 1;
var Y_SHORT_VECTOR = 1 << 2;
var REPEAT_FLAG = 1 << 3;
var X_IS_SAME_OR_POSITIVE_X_SHORT_VECTOR = 1 << 4;
var Y_IS_SAME_OR_POSITIVE_Y_SHORT_VECTOR = 1 << 5;
var OVERLAP_SIMPLE = 1 << 6;
var ARG_1_AND_2_ARE_WORDS = 1 << 0;
var ARGS_ARE_XY_VALUES = 1 << 1;
var WE_HAVE_A_SCALE = 1 << 3;
var MORE_COMPONENTS = 1 << 5;
var WE_HAVE_AN_X_AND_Y_SCALE = 1 << 6;
var WE_HAVE_A_TWO_BY_TWO = 1 << 7;
var WE_HAVE_INSTRUCTIONS = 1 << 8;

var GlyfTable = /*#__PURE__*/function () {
  function GlyfTable(_ref) {
    var glyfTable = _ref.glyfTable,
        isGlyphLocationsLong = _ref.isGlyphLocationsLong,
        locaTable = _ref.locaTable,
        numGlyphs = _ref.numGlyphs;

    _classCallCheck(this, GlyfTable);

    this.glyphs = [];
    var loca = new DataView(locaTable.buffer, locaTable.byteOffset, locaTable.byteLength);
    var glyf = new DataView(glyfTable.buffer, glyfTable.byteOffset, glyfTable.byteLength);
    var offsetSize = isGlyphLocationsLong ? 4 : 2;
    var prev = isGlyphLocationsLong ? loca.getUint32(0) : 2 * loca.getUint16(0);
    var pos = 0;

    for (var i = 0; i < numGlyphs; i++) {
      pos += offsetSize;
      var next = isGlyphLocationsLong ? loca.getUint32(pos) : 2 * loca.getUint16(pos);

      if (next === prev) {
        this.glyphs.push(new Glyph({}));
        continue;
      }

      var glyph = Glyph.parse(prev, glyf);
      this.glyphs.push(glyph);
      prev = next;
    }
  }

  _createClass(GlyfTable, [{
    key: "getSize",
    value: function getSize() {
      return this.glyphs.reduce(function (a, g) {
        var size = g.getSize();
        return a + (size + 3 & ~3);
      }, 0);
    }
  }, {
    key: "write",
    value: function write() {
      var totalSize = this.getSize();
      var glyfTable = new DataView(new ArrayBuffer(totalSize));
      var isLocationLong = totalSize > 0x1fffe;
      var offsetSize = isLocationLong ? 4 : 2;
      var locaTable = new DataView(new ArrayBuffer((this.glyphs.length + 1) * offsetSize));

      if (isLocationLong) {
        locaTable.setUint32(0, 0);
      } else {
        locaTable.setUint16(0, 0);
      }

      var pos = 0;
      var locaIndex = 0;

      var _iterator = _createForOfIteratorHelper(this.glyphs),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var glyph = _step.value;
          pos += glyph.write(pos, glyfTable);
          pos = pos + 3 & ~3;
          locaIndex += offsetSize;

          if (isLocationLong) {
            locaTable.setUint32(locaIndex, pos);
          } else {
            locaTable.setUint16(locaIndex, pos >> 1);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return {
        isLocationLong: isLocationLong,
        loca: new Uint8Array(locaTable.buffer),
        glyf: new Uint8Array(glyfTable.buffer)
      };
    }
  }, {
    key: "scale",
    value: function scale(factors) {
      for (var i = 0, ii = this.glyphs.length; i < ii; i++) {
        this.glyphs[i].scale(factors[i]);
      }
    }
  }]);

  return GlyfTable;
}();

exports.GlyfTable = GlyfTable;

var Glyph = /*#__PURE__*/function () {
  function Glyph(_ref2) {
    var _ref2$header = _ref2.header,
        header = _ref2$header === void 0 ? null : _ref2$header,
        _ref2$simple = _ref2.simple,
        simple = _ref2$simple === void 0 ? null : _ref2$simple,
        _ref2$composites = _ref2.composites,
        composites = _ref2$composites === void 0 ? null : _ref2$composites;

    _classCallCheck(this, Glyph);

    this.header = header;
    this.simple = simple;
    this.composites = composites;
  }

  _createClass(Glyph, [{
    key: "getSize",
    value: function getSize() {
      if (!this.header) {
        return 0;
      }

      var size = this.simple ? this.simple.getSize() : this.composites.reduce(function (a, c) {
        return a + c.getSize();
      }, 0);
      return this.header.getSize() + size;
    }
  }, {
    key: "write",
    value: function write(pos, buf) {
      if (!this.header) {
        return 0;
      }

      var spos = pos;
      pos += this.header.write(pos, buf);

      if (this.simple) {
        pos += this.simple.write(pos, buf);
      } else {
        var _iterator2 = _createForOfIteratorHelper(this.composites),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var composite = _step2.value;
            pos += composite.write(pos, buf);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return pos - spos;
    }
  }, {
    key: "scale",
    value: function scale(factor) {
      if (!this.header) {
        return;
      }

      var xMiddle = (this.header.xMin + this.header.xMax) / 2;
      this.header.scale(xMiddle, factor);

      if (this.simple) {
        this.simple.scale(xMiddle, factor);
      } else {
        var _iterator3 = _createForOfIteratorHelper(this.composites),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var composite = _step3.value;
            composite.scale(xMiddle, factor);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
  }], [{
    key: "parse",
    value: function parse(pos, glyf) {
      var _GlyphHeader$parse = GlyphHeader.parse(pos, glyf),
          _GlyphHeader$parse2 = _slicedToArray(_GlyphHeader$parse, 2),
          read = _GlyphHeader$parse2[0],
          header = _GlyphHeader$parse2[1];

      pos += read;

      if (header.numberOfContours < 0) {
        var composites = [];

        while (true) {
          var _CompositeGlyph$parse = CompositeGlyph.parse(pos, glyf),
              _CompositeGlyph$parse2 = _slicedToArray(_CompositeGlyph$parse, 2),
              n = _CompositeGlyph$parse2[0],
              composite = _CompositeGlyph$parse2[1];

          pos += n;
          composites.push(composite);

          if (!(composite.flags & MORE_COMPONENTS)) {
            break;
          }
        }

        return new Glyph({
          header: header,
          composites: composites
        });
      }

      var simple = SimpleGlyph.parse(pos, glyf, header.numberOfContours);
      return new Glyph({
        header: header,
        simple: simple
      });
    }
  }]);

  return Glyph;
}();

var GlyphHeader = /*#__PURE__*/function () {
  function GlyphHeader(_ref3) {
    var numberOfContours = _ref3.numberOfContours,
        xMin = _ref3.xMin,
        yMin = _ref3.yMin,
        xMax = _ref3.xMax,
        yMax = _ref3.yMax;

    _classCallCheck(this, GlyphHeader);

    this.numberOfContours = numberOfContours;
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
  }

  _createClass(GlyphHeader, [{
    key: "getSize",
    value: function getSize() {
      return 10;
    }
  }, {
    key: "write",
    value: function write(pos, buf) {
      buf.setInt16(pos, this.numberOfContours);
      buf.setInt16(pos + 2, this.xMin);
      buf.setInt16(pos + 4, this.yMin);
      buf.setInt16(pos + 6, this.xMax);
      buf.setInt16(pos + 8, this.yMax);
      return 10;
    }
  }, {
    key: "scale",
    value: function scale(x, factor) {
      this.xMin = Math.round(x + (this.xMin - x) * factor);
      this.xMax = Math.round(x + (this.xMax - x) * factor);
    }
  }], [{
    key: "parse",
    value: function parse(pos, glyf) {
      return [10, new GlyphHeader({
        numberOfContours: glyf.getInt16(pos),
        xMin: glyf.getInt16(pos + 2),
        yMin: glyf.getInt16(pos + 4),
        xMax: glyf.getInt16(pos + 6),
        yMax: glyf.getInt16(pos + 8)
      })];
    }
  }]);

  return GlyphHeader;
}();

var Contour = /*#__PURE__*/_createClass(function Contour(_ref4) {
  var flags = _ref4.flags,
      xCoordinates = _ref4.xCoordinates,
      yCoordinates = _ref4.yCoordinates;

  _classCallCheck(this, Contour);

  this.xCoordinates = xCoordinates;
  this.yCoordinates = yCoordinates;
  this.flags = flags;
});

var SimpleGlyph = /*#__PURE__*/function () {
  function SimpleGlyph(_ref5) {
    var contours = _ref5.contours,
        instructions = _ref5.instructions;

    _classCallCheck(this, SimpleGlyph);

    this.contours = contours;
    this.instructions = instructions;
  }

  _createClass(SimpleGlyph, [{
    key: "getSize",
    value: function getSize() {
      var size = this.contours.length * 2 + 2 + this.instructions.length;
      var lastX = 0;
      var lastY = 0;

      var _iterator4 = _createForOfIteratorHelper(this.contours),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var contour = _step4.value;
          size += contour.flags.length;

          for (var i = 0, ii = contour.xCoordinates.length; i < ii; i++) {
            var x = contour.xCoordinates[i];
            var y = contour.yCoordinates[i];
            var abs = Math.abs(x - lastX);

            if (abs > 255) {
              size += 2;
            } else if (abs > 0) {
              size += 1;
            }

            lastX = x;
            abs = Math.abs(y - lastY);

            if (abs > 255) {
              size += 2;
            } else if (abs > 0) {
              size += 1;
            }

            lastY = y;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return size;
    }
  }, {
    key: "write",
    value: function write(pos, buf) {
      var spos = pos;
      var xCoordinates = [];
      var yCoordinates = [];
      var flags = [];
      var lastX = 0;
      var lastY = 0;

      var _iterator5 = _createForOfIteratorHelper(this.contours),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var contour = _step5.value;

          for (var _i4 = 0, _ii2 = contour.xCoordinates.length; _i4 < _ii2; _i4++) {
            var _flag3 = contour.flags[_i4];
            var _x = contour.xCoordinates[_i4];
            var delta = _x - lastX;

            if (delta === 0) {
              _flag3 |= X_IS_SAME_OR_POSITIVE_X_SHORT_VECTOR;
              xCoordinates.push(0);
            } else {
              var abs = Math.abs(delta);

              if (abs <= 255) {
                _flag3 |= delta >= 0 ? X_SHORT_VECTOR | X_IS_SAME_OR_POSITIVE_X_SHORT_VECTOR : X_SHORT_VECTOR;
                xCoordinates.push(abs);
              } else {
                xCoordinates.push(delta);
              }
            }

            lastX = _x;
            var _y = contour.yCoordinates[_i4];
            delta = _y - lastY;

            if (delta === 0) {
              _flag3 |= Y_IS_SAME_OR_POSITIVE_Y_SHORT_VECTOR;
              yCoordinates.push(0);
            } else {
              var _abs = Math.abs(delta);

              if (_abs <= 255) {
                _flag3 |= delta >= 0 ? Y_SHORT_VECTOR | Y_IS_SAME_OR_POSITIVE_Y_SHORT_VECTOR : Y_SHORT_VECTOR;
                yCoordinates.push(_abs);
              } else {
                yCoordinates.push(delta);
              }
            }

            lastY = _y;
            flags.push(_flag3);
          }

          buf.setUint16(pos, xCoordinates.length - 1);
          pos += 2;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      buf.setUint16(pos, this.instructions.length);
      pos += 2;

      if (this.instructions.length) {
        new Uint8Array(buf.buffer, 0, buf.buffer.byteLength).set(this.instructions, pos);
        pos += this.instructions.length;
      }

      for (var _i2 = 0, _flags = flags; _i2 < _flags.length; _i2++) {
        var flag = _flags[_i2];
        buf.setUint8(pos++, flag);
      }

      for (var i = 0, ii = xCoordinates.length; i < ii; i++) {
        var x = xCoordinates[i];
        var _flag = flags[i];

        if (_flag & X_SHORT_VECTOR) {
          buf.setUint8(pos++, x);
        } else if (!(_flag & X_IS_SAME_OR_POSITIVE_X_SHORT_VECTOR)) {
          buf.setInt16(pos, x);
          pos += 2;
        }
      }

      for (var _i3 = 0, _ii = yCoordinates.length; _i3 < _ii; _i3++) {
        var y = yCoordinates[_i3];
        var _flag2 = flags[_i3];

        if (_flag2 & Y_SHORT_VECTOR) {
          buf.setUint8(pos++, y);
        } else if (!(_flag2 & Y_IS_SAME_OR_POSITIVE_Y_SHORT_VECTOR)) {
          buf.setInt16(pos, y);
          pos += 2;
        }
      }

      return pos - spos;
    }
  }, {
    key: "scale",
    value: function scale(x, factor) {
      var _iterator6 = _createForOfIteratorHelper(this.contours),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var contour = _step6.value;

          if (contour.xCoordinates.length === 0) {
            continue;
          }

          for (var i = 0, ii = contour.xCoordinates.length; i < ii; i++) {
            contour.xCoordinates[i] = Math.round(x + (contour.xCoordinates[i] - x) * factor);
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }], [{
    key: "parse",
    value: function parse(pos, glyf, numberOfContours) {
      var endPtsOfContours = [];

      for (var i = 0; i < numberOfContours; i++) {
        var endPt = glyf.getUint16(pos);
        pos += 2;
        endPtsOfContours.push(endPt);
      }

      var numberOfPt = endPtsOfContours[numberOfContours - 1] + 1;
      var instructionLength = glyf.getUint16(pos);
      pos += 2;
      var instructions = new Uint8Array(glyf).slice(pos, pos + instructionLength);
      pos += instructionLength;
      var flags = [];

      for (var _i5 = 0; _i5 < numberOfPt; pos++, _i5++) {
        var flag = glyf.getUint8(pos);
        flags.push(flag);

        if (flag & REPEAT_FLAG) {
          var count = glyf.getUint8(++pos);
          flag ^= REPEAT_FLAG;

          for (var m = 0; m < count; m++) {
            flags.push(flag);
          }

          _i5 += count;
        }
      }

      var allXCoordinates = [];
      var xCoordinates = [];
      var yCoordinates = [];
      var pointFlags = [];
      var contours = [];
      var endPtsOfContoursIndex = 0;
      var lastCoordinate = 0;

      for (var _i6 = 0; _i6 < numberOfPt; _i6++) {
        var _flag4 = flags[_i6];

        if (_flag4 & X_SHORT_VECTOR) {
          var x = glyf.getUint8(pos++);
          lastCoordinate += _flag4 & X_IS_SAME_OR_POSITIVE_X_SHORT_VECTOR ? x : -x;
          xCoordinates.push(lastCoordinate);
        } else if (_flag4 & X_IS_SAME_OR_POSITIVE_X_SHORT_VECTOR) {
          xCoordinates.push(lastCoordinate);
        } else {
          lastCoordinate += glyf.getInt16(pos);
          pos += 2;
          xCoordinates.push(lastCoordinate);
        }

        if (endPtsOfContours[endPtsOfContoursIndex] === _i6) {
          endPtsOfContoursIndex++;
          allXCoordinates.push(xCoordinates);
          xCoordinates = [];
        }
      }

      lastCoordinate = 0;
      endPtsOfContoursIndex = 0;

      for (var _i7 = 0; _i7 < numberOfPt; _i7++) {
        var _flag5 = flags[_i7];

        if (_flag5 & Y_SHORT_VECTOR) {
          var y = glyf.getUint8(pos++);
          lastCoordinate += _flag5 & Y_IS_SAME_OR_POSITIVE_Y_SHORT_VECTOR ? y : -y;
          yCoordinates.push(lastCoordinate);
        } else if (_flag5 & Y_IS_SAME_OR_POSITIVE_Y_SHORT_VECTOR) {
          yCoordinates.push(lastCoordinate);
        } else {
          lastCoordinate += glyf.getInt16(pos);
          pos += 2;
          yCoordinates.push(lastCoordinate);
        }

        pointFlags.push(_flag5 & ON_CURVE_POINT | _flag5 & OVERLAP_SIMPLE);

        if (endPtsOfContours[endPtsOfContoursIndex] === _i7) {
          xCoordinates = allXCoordinates[endPtsOfContoursIndex];
          endPtsOfContoursIndex++;
          contours.push(new Contour({
            flags: pointFlags,
            xCoordinates: xCoordinates,
            yCoordinates: yCoordinates
          }));
          yCoordinates = [];
          pointFlags = [];
        }
      }

      return new SimpleGlyph({
        contours: contours,
        instructions: instructions
      });
    }
  }]);

  return SimpleGlyph;
}();

var CompositeGlyph = /*#__PURE__*/function () {
  function CompositeGlyph(_ref6) {
    var flags = _ref6.flags,
        glyphIndex = _ref6.glyphIndex,
        argument1 = _ref6.argument1,
        argument2 = _ref6.argument2,
        transf = _ref6.transf,
        instructions = _ref6.instructions;

    _classCallCheck(this, CompositeGlyph);

    this.flags = flags;
    this.glyphIndex = glyphIndex;
    this.argument1 = argument1;
    this.argument2 = argument2;
    this.transf = transf;
    this.instructions = instructions;
  }

  _createClass(CompositeGlyph, [{
    key: "getSize",
    value: function getSize() {
      var size = 2 + 2 + this.transf.length * 2;

      if (this.flags & WE_HAVE_INSTRUCTIONS) {
        size += 2 + this.instructions.length;
      }

      size += 2;

      if (this.flags & 2) {
        if (!(this.argument1 >= -128 && this.argument1 <= 127 && this.argument2 >= -128 && this.argument2 <= 127)) {
          size += 2;
        }
      } else {
        if (!(this.argument1 >= 0 && this.argument1 <= 255 && this.argument2 >= 0 && this.argument2 <= 255)) {
          size += 2;
        }
      }

      return size;
    }
  }, {
    key: "write",
    value: function write(pos, buf) {
      var spos = pos;

      if (this.flags & ARGS_ARE_XY_VALUES) {
        if (!(this.argument1 >= -128 && this.argument1 <= 127 && this.argument2 >= -128 && this.argument2 <= 127)) {
          this.flags |= ARG_1_AND_2_ARE_WORDS;
        }
      } else {
        if (!(this.argument1 >= 0 && this.argument1 <= 255 && this.argument2 >= 0 && this.argument2 <= 255)) {
          this.flags |= ARG_1_AND_2_ARE_WORDS;
        }
      }

      buf.setUint16(pos, this.flags);
      buf.setUint16(pos + 2, this.glyphIndex);
      pos += 4;

      if (this.flags & ARG_1_AND_2_ARE_WORDS) {
        if (this.flags & ARGS_ARE_XY_VALUES) {
          buf.setInt16(pos, this.argument1);
          buf.setInt16(pos + 2, this.argument2);
        } else {
          buf.setUint16(pos, this.argument1);
          buf.setUint16(pos + 2, this.argument2);
        }

        pos += 4;
      } else {
        buf.setUint8(pos, this.argument1);
        buf.setUint8(pos + 1, this.argument2);
        pos += 2;
      }

      if (this.flags & WE_HAVE_INSTRUCTIONS) {
        buf.setUint16(pos, this.instructions.length);
        pos += 2;

        if (this.instructions.length) {
          new Uint8Array(buf.buffer, 0, buf.buffer.byteLength).set(this.instructions, pos);
          pos += this.instructions.length;
        }
      }

      return pos - spos;
    }
  }, {
    key: "scale",
    value: function scale(x, factor) {}
  }], [{
    key: "parse",
    value: function parse(pos, glyf) {
      var spos = pos;
      var transf = [];
      var flags = glyf.getUint16(pos);
      var glyphIndex = glyf.getUint16(pos + 2);
      pos += 4;
      var argument1, argument2;

      if (flags & ARG_1_AND_2_ARE_WORDS) {
        if (flags & ARGS_ARE_XY_VALUES) {
          argument1 = glyf.getInt16(pos);
          argument2 = glyf.getInt16(pos + 2);
        } else {
          argument1 = glyf.getUint16(pos);
          argument2 = glyf.getUint16(pos + 2);
        }

        pos += 4;
        flags ^= ARG_1_AND_2_ARE_WORDS;
      } else {
        argument1 = glyf.getUint8(pos);
        argument2 = glyf.getUint8(pos + 1);

        if (flags & ARGS_ARE_XY_VALUES) {
          var abs1 = argument1 & 0x7f;
          argument1 = argument1 & 0x80 ? -abs1 : abs1;
          var abs2 = argument2 & 0x7f;
          argument2 = argument2 & 0x80 ? -abs2 : abs2;
        }

        pos += 2;
      }

      if (flags & WE_HAVE_A_SCALE) {
        transf.push(glyf.getUint16(pos));
        pos += 2;
      } else if (flags & WE_HAVE_AN_X_AND_Y_SCALE) {
        transf.push(glyf.getUint16(pos), glyf.getUint16(pos + 2));
        pos += 4;
      } else if (flags & WE_HAVE_A_TWO_BY_TWO) {
        transf.push(glyf.getUint16(pos), glyf.getUint16(pos + 2), glyf.getUint16(pos + 4), glyf.getUint16(pos + 6));
        pos += 8;
      }

      var instructions = null;

      if (flags & WE_HAVE_INSTRUCTIONS) {
        var instructionLength = glyf.getUint16(pos);
        pos += 2;
        instructions = new Uint8Array(glyf).slice(pos, pos + instructionLength);
        pos += instructionLength;
      }

      return [pos - spos, new CompositeGlyph({
        flags: flags,
        glyphIndex: glyphIndex,
        argument1: argument1,
        argument2: argument2,
        transf: transf,
        instructions: instructions
      })];
    }
  }]);

  return CompositeGlyph;
}();