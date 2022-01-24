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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pattern = void 0;
exports.getTilingPatternIR = getTilingPatternIR;

var _util = require("../shared/util.js");

var _colorspace = require("./colorspace.js");

var _primitives = require("./primitives.js");

var _core_utils = require("./core_utils.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShadingType = {
  FUNCTION_BASED: 1,
  AXIAL: 2,
  RADIAL: 3,
  FREE_FORM_MESH: 4,
  LATTICE_FORM_MESH: 5,
  COONS_PATCH_MESH: 6,
  TENSOR_PATCH_MESH: 7
};

var Pattern = /*#__PURE__*/function () {
  function Pattern() {
    _classCallCheck(this, Pattern);

    (0, _util.unreachable)("Cannot initialize Pattern.");
  }

  _createClass(Pattern, null, [{
    key: "parseShading",
    value: function parseShading(shading, xref, res, handler, pdfFunctionFactory, localColorSpaceCache) {
      var dict = (0, _primitives.isStream)(shading) ? shading.dict : shading;
      var type = dict.get("ShadingType");

      try {
        switch (type) {
          case ShadingType.AXIAL:
          case ShadingType.RADIAL:
            return new RadialAxialShading(dict, xref, res, pdfFunctionFactory, localColorSpaceCache);

          case ShadingType.FREE_FORM_MESH:
          case ShadingType.LATTICE_FORM_MESH:
          case ShadingType.COONS_PATCH_MESH:
          case ShadingType.TENSOR_PATCH_MESH:
            return new MeshShading(shading, xref, res, pdfFunctionFactory, localColorSpaceCache);

          default:
            throw new _util.FormatError("Unsupported ShadingType: " + type);
        }
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        handler.send("UnsupportedFeature", {
          featureId: _util.UNSUPPORTED_FEATURES.shadingPattern
        });
        (0, _util.warn)(ex);
        return new DummyShading();
      }
    }
  }]);

  return Pattern;
}();

exports.Pattern = Pattern;

var BaseShading = /*#__PURE__*/function () {
  function BaseShading() {
    _classCallCheck(this, BaseShading);

    if (this.constructor === BaseShading) {
      (0, _util.unreachable)("Cannot initialize BaseShading.");
    }
  }

  _createClass(BaseShading, [{
    key: "getIR",
    value: function getIR() {
      (0, _util.unreachable)("Abstract method `getIR` called.");
    }
  }], [{
    key: "SMALL_NUMBER",
    get: function get() {
      return (0, _util.shadow)(this, "SMALL_NUMBER", 1e-6);
    }
  }]);

  return BaseShading;
}();

var RadialAxialShading = /*#__PURE__*/function (_BaseShading) {
  _inherits(RadialAxialShading, _BaseShading);

  var _super = _createSuper(RadialAxialShading);

  function RadialAxialShading(dict, xref, resources, pdfFunctionFactory, localColorSpaceCache) {
    var _this;

    _classCallCheck(this, RadialAxialShading);

    _this = _super.call(this);
    _this.coordsArr = dict.getArray("Coords");
    _this.shadingType = dict.get("ShadingType");

    var cs = _colorspace.ColorSpace.parse({
      cs: dict.getRaw("CS") || dict.getRaw("ColorSpace"),
      xref: xref,
      resources: resources,
      pdfFunctionFactory: pdfFunctionFactory,
      localColorSpaceCache: localColorSpaceCache
    });

    var bbox = dict.getArray("BBox");

    if (Array.isArray(bbox) && bbox.length === 4) {
      _this.bbox = _util.Util.normalizeRect(bbox);
    } else {
      _this.bbox = null;
    }

    var t0 = 0.0,
        t1 = 1.0;

    if (dict.has("Domain")) {
      var domainArr = dict.getArray("Domain");
      t0 = domainArr[0];
      t1 = domainArr[1];
    }

    var extendStart = false,
        extendEnd = false;

    if (dict.has("Extend")) {
      var extendArr = dict.getArray("Extend");
      extendStart = extendArr[0];
      extendEnd = extendArr[1];
    }

    if (_this.shadingType === ShadingType.RADIAL && (!extendStart || !extendEnd)) {
      var _this$coordsArr = _slicedToArray(_this.coordsArr, 6),
          x1 = _this$coordsArr[0],
          y1 = _this$coordsArr[1],
          r1 = _this$coordsArr[2],
          x2 = _this$coordsArr[3],
          y2 = _this$coordsArr[4],
          r2 = _this$coordsArr[5];

      var distance = Math.hypot(x1 - x2, y1 - y2);

      if (r1 <= r2 + distance && r2 <= r1 + distance) {
        (0, _util.warn)("Unsupported radial gradient.");
      }
    }

    _this.extendStart = extendStart;
    _this.extendEnd = extendEnd;
    var fnObj = dict.getRaw("Function");
    var fn = pdfFunctionFactory.createFromArray(fnObj);
    var NUMBER_OF_SAMPLES = 10;
    var step = (t1 - t0) / NUMBER_OF_SAMPLES;
    var colorStops = _this.colorStops = [];

    if (t0 >= t1 || step <= 0) {
      (0, _util.info)("Bad shading domain.");
      return _possibleConstructorReturn(_this);
    }

    var color = new Float32Array(cs.numComps),
        ratio = new Float32Array(1);
    var rgbColor;

    for (var i = 0; i <= NUMBER_OF_SAMPLES; i++) {
      ratio[0] = t0 + i * step;
      fn(ratio, 0, color, 0);
      rgbColor = cs.getRgb(color, 0);

      var cssColor = _util.Util.makeHexColor(rgbColor[0], rgbColor[1], rgbColor[2]);

      colorStops.push([i / NUMBER_OF_SAMPLES, cssColor]);
    }

    var background = "transparent";

    if (dict.has("Background")) {
      rgbColor = cs.getRgb(dict.get("Background"), 0);
      background = _util.Util.makeHexColor(rgbColor[0], rgbColor[1], rgbColor[2]);
    }

    if (!extendStart) {
      colorStops.unshift([0, background]);
      colorStops[1][0] += BaseShading.SMALL_NUMBER;
    }

    if (!extendEnd) {
      colorStops[colorStops.length - 1][0] -= BaseShading.SMALL_NUMBER;
      colorStops.push([1, background]);
    }

    _this.colorStops = colorStops;
    return _this;
  }

  _createClass(RadialAxialShading, [{
    key: "getIR",
    value: function getIR() {
      var coordsArr = this.coordsArr;
      var shadingType = this.shadingType;
      var type, p0, p1, r0, r1;

      if (shadingType === ShadingType.AXIAL) {
        p0 = [coordsArr[0], coordsArr[1]];
        p1 = [coordsArr[2], coordsArr[3]];
        r0 = null;
        r1 = null;
        type = "axial";
      } else if (shadingType === ShadingType.RADIAL) {
        p0 = [coordsArr[0], coordsArr[1]];
        p1 = [coordsArr[3], coordsArr[4]];
        r0 = coordsArr[2];
        r1 = coordsArr[5];
        type = "radial";
      } else {
        (0, _util.unreachable)("getPattern type unknown: ".concat(shadingType));
      }

      return ["RadialAxial", type, this.bbox, this.colorStops, p0, p1, r0, r1];
    }
  }]);

  return RadialAxialShading;
}(BaseShading);

var MeshStreamReader = /*#__PURE__*/function () {
  function MeshStreamReader(stream, context) {
    _classCallCheck(this, MeshStreamReader);

    this.stream = stream;
    this.context = context;
    this.buffer = 0;
    this.bufferLength = 0;
    var numComps = context.numComps;
    this.tmpCompsBuf = new Float32Array(numComps);
    var csNumComps = context.colorSpace.numComps;
    this.tmpCsCompsBuf = context.colorFn ? new Float32Array(csNumComps) : this.tmpCompsBuf;
  }

  _createClass(MeshStreamReader, [{
    key: "hasData",
    get: function get() {
      if (this.stream.end) {
        return this.stream.pos < this.stream.end;
      }

      if (this.bufferLength > 0) {
        return true;
      }

      var nextByte = this.stream.getByte();

      if (nextByte < 0) {
        return false;
      }

      this.buffer = nextByte;
      this.bufferLength = 8;
      return true;
    }
  }, {
    key: "readBits",
    value: function readBits(n) {
      var buffer = this.buffer;
      var bufferLength = this.bufferLength;

      if (n === 32) {
        if (bufferLength === 0) {
          return (this.stream.getByte() << 24 | this.stream.getByte() << 16 | this.stream.getByte() << 8 | this.stream.getByte()) >>> 0;
        }

        buffer = buffer << 24 | this.stream.getByte() << 16 | this.stream.getByte() << 8 | this.stream.getByte();
        var nextByte = this.stream.getByte();
        this.buffer = nextByte & (1 << bufferLength) - 1;
        return (buffer << 8 - bufferLength | (nextByte & 0xff) >> bufferLength) >>> 0;
      }

      if (n === 8 && bufferLength === 0) {
        return this.stream.getByte();
      }

      while (bufferLength < n) {
        buffer = buffer << 8 | this.stream.getByte();
        bufferLength += 8;
      }

      bufferLength -= n;
      this.bufferLength = bufferLength;
      this.buffer = buffer & (1 << bufferLength) - 1;
      return buffer >> bufferLength;
    }
  }, {
    key: "align",
    value: function align() {
      this.buffer = 0;
      this.bufferLength = 0;
    }
  }, {
    key: "readFlag",
    value: function readFlag() {
      return this.readBits(this.context.bitsPerFlag);
    }
  }, {
    key: "readCoordinate",
    value: function readCoordinate() {
      var bitsPerCoordinate = this.context.bitsPerCoordinate;
      var xi = this.readBits(bitsPerCoordinate);
      var yi = this.readBits(bitsPerCoordinate);
      var decode = this.context.decode;
      var scale = bitsPerCoordinate < 32 ? 1 / ((1 << bitsPerCoordinate) - 1) : 2.3283064365386963e-10;
      return [xi * scale * (decode[1] - decode[0]) + decode[0], yi * scale * (decode[3] - decode[2]) + decode[2]];
    }
  }, {
    key: "readComponents",
    value: function readComponents() {
      var numComps = this.context.numComps;
      var bitsPerComponent = this.context.bitsPerComponent;
      var scale = bitsPerComponent < 32 ? 1 / ((1 << bitsPerComponent) - 1) : 2.3283064365386963e-10;
      var decode = this.context.decode;
      var components = this.tmpCompsBuf;

      for (var i = 0, j = 4; i < numComps; i++, j += 2) {
        var ci = this.readBits(bitsPerComponent);
        components[i] = ci * scale * (decode[j + 1] - decode[j]) + decode[j];
      }

      var color = this.tmpCsCompsBuf;

      if (this.context.colorFn) {
        this.context.colorFn(components, 0, color, 0);
      }

      return this.context.colorSpace.getRgb(color, 0);
    }
  }]);

  return MeshStreamReader;
}();

var getB = function getBClosure() {
  function buildB(count) {
    var lut = [];

    for (var i = 0; i <= count; i++) {
      var t = i / count,
          t_ = 1 - t;
      lut.push(new Float32Array([t_ * t_ * t_, 3 * t * t_ * t_, 3 * t * t * t_, t * t * t]));
    }

    return lut;
  }

  var cache = [];
  return function (count) {
    if (!cache[count]) {
      cache[count] = buildB(count);
    }

    return cache[count];
  };
}();

var MeshShading = /*#__PURE__*/function (_BaseShading2) {
  _inherits(MeshShading, _BaseShading2);

  var _super2 = _createSuper(MeshShading);

  function MeshShading(stream, xref, resources, pdfFunctionFactory, localColorSpaceCache) {
    var _this2;

    _classCallCheck(this, MeshShading);

    _this2 = _super2.call(this);

    if (!(0, _primitives.isStream)(stream)) {
      throw new _util.FormatError("Mesh data is not a stream");
    }

    var dict = stream.dict;
    _this2.shadingType = dict.get("ShadingType");
    var bbox = dict.getArray("BBox");

    if (Array.isArray(bbox) && bbox.length === 4) {
      _this2.bbox = _util.Util.normalizeRect(bbox);
    } else {
      _this2.bbox = null;
    }

    var cs = _colorspace.ColorSpace.parse({
      cs: dict.getRaw("CS") || dict.getRaw("ColorSpace"),
      xref: xref,
      resources: resources,
      pdfFunctionFactory: pdfFunctionFactory,
      localColorSpaceCache: localColorSpaceCache
    });

    _this2.background = dict.has("Background") ? cs.getRgb(dict.get("Background"), 0) : null;
    var fnObj = dict.getRaw("Function");
    var fn = fnObj ? pdfFunctionFactory.createFromArray(fnObj) : null;
    _this2.coords = [];
    _this2.colors = [];
    _this2.figures = [];
    var decodeContext = {
      bitsPerCoordinate: dict.get("BitsPerCoordinate"),
      bitsPerComponent: dict.get("BitsPerComponent"),
      bitsPerFlag: dict.get("BitsPerFlag"),
      decode: dict.getArray("Decode"),
      colorFn: fn,
      colorSpace: cs,
      numComps: fn ? 1 : cs.numComps
    };
    var reader = new MeshStreamReader(stream, decodeContext);
    var patchMesh = false;

    switch (_this2.shadingType) {
      case ShadingType.FREE_FORM_MESH:
        _this2._decodeType4Shading(reader);

        break;

      case ShadingType.LATTICE_FORM_MESH:
        var verticesPerRow = dict.get("VerticesPerRow") | 0;

        if (verticesPerRow < 2) {
          throw new _util.FormatError("Invalid VerticesPerRow");
        }

        _this2._decodeType5Shading(reader, verticesPerRow);

        break;

      case ShadingType.COONS_PATCH_MESH:
        _this2._decodeType6Shading(reader);

        patchMesh = true;
        break;

      case ShadingType.TENSOR_PATCH_MESH:
        _this2._decodeType7Shading(reader);

        patchMesh = true;
        break;

      default:
        (0, _util.unreachable)("Unsupported mesh type.");
        break;
    }

    if (patchMesh) {
      _this2._updateBounds();

      for (var i = 0, ii = _this2.figures.length; i < ii; i++) {
        _this2._buildFigureFromPatch(i);
      }
    }

    _this2._updateBounds();

    _this2._packData();

    return _this2;
  }

  _createClass(MeshShading, [{
    key: "_decodeType4Shading",
    value: function _decodeType4Shading(reader) {
      var coords = this.coords;
      var colors = this.colors;
      var operators = [];
      var ps = [];
      var verticesLeft = 0;

      while (reader.hasData) {
        var f = reader.readFlag();
        var coord = reader.readCoordinate();
        var color = reader.readComponents();

        if (verticesLeft === 0) {
          if (!(0 <= f && f <= 2)) {
            throw new _util.FormatError("Unknown type4 flag");
          }

          switch (f) {
            case 0:
              verticesLeft = 3;
              break;

            case 1:
              ps.push(ps[ps.length - 2], ps[ps.length - 1]);
              verticesLeft = 1;
              break;

            case 2:
              ps.push(ps[ps.length - 3], ps[ps.length - 1]);
              verticesLeft = 1;
              break;
          }

          operators.push(f);
        }

        ps.push(coords.length);
        coords.push(coord);
        colors.push(color);
        verticesLeft--;
        reader.align();
      }

      this.figures.push({
        type: "triangles",
        coords: new Int32Array(ps),
        colors: new Int32Array(ps)
      });
    }
  }, {
    key: "_decodeType5Shading",
    value: function _decodeType5Shading(reader, verticesPerRow) {
      var coords = this.coords;
      var colors = this.colors;
      var ps = [];

      while (reader.hasData) {
        var coord = reader.readCoordinate();
        var color = reader.readComponents();
        ps.push(coords.length);
        coords.push(coord);
        colors.push(color);
      }

      this.figures.push({
        type: "lattice",
        coords: new Int32Array(ps),
        colors: new Int32Array(ps),
        verticesPerRow: verticesPerRow
      });
    }
  }, {
    key: "_decodeType6Shading",
    value: function _decodeType6Shading(reader) {
      var coords = this.coords;
      var colors = this.colors;
      var ps = new Int32Array(16);
      var cs = new Int32Array(4);

      while (reader.hasData) {
        var f = reader.readFlag();

        if (!(0 <= f && f <= 3)) {
          throw new _util.FormatError("Unknown type6 flag");
        }

        var pi = coords.length;

        for (var i = 0, ii = f !== 0 ? 8 : 12; i < ii; i++) {
          coords.push(reader.readCoordinate());
        }

        var ci = colors.length;

        for (var _i2 = 0, _ii = f !== 0 ? 2 : 4; _i2 < _ii; _i2++) {
          colors.push(reader.readComponents());
        }

        var tmp1 = void 0,
            tmp2 = void 0,
            tmp3 = void 0,
            tmp4 = void 0;

        switch (f) {
          case 0:
            ps[12] = pi + 3;
            ps[13] = pi + 4;
            ps[14] = pi + 5;
            ps[15] = pi + 6;
            ps[8] = pi + 2;
            ps[11] = pi + 7;
            ps[4] = pi + 1;
            ps[7] = pi + 8;
            ps[0] = pi;
            ps[1] = pi + 11;
            ps[2] = pi + 10;
            ps[3] = pi + 9;
            cs[2] = ci + 1;
            cs[3] = ci + 2;
            cs[0] = ci;
            cs[1] = ci + 3;
            break;

          case 1:
            tmp1 = ps[12];
            tmp2 = ps[13];
            tmp3 = ps[14];
            tmp4 = ps[15];
            ps[12] = tmp4;
            ps[13] = pi + 0;
            ps[14] = pi + 1;
            ps[15] = pi + 2;
            ps[8] = tmp3;
            ps[11] = pi + 3;
            ps[4] = tmp2;
            ps[7] = pi + 4;
            ps[0] = tmp1;
            ps[1] = pi + 7;
            ps[2] = pi + 6;
            ps[3] = pi + 5;
            tmp1 = cs[2];
            tmp2 = cs[3];
            cs[2] = tmp2;
            cs[3] = ci;
            cs[0] = tmp1;
            cs[1] = ci + 1;
            break;

          case 2:
            tmp1 = ps[15];
            tmp2 = ps[11];
            ps[12] = ps[3];
            ps[13] = pi + 0;
            ps[14] = pi + 1;
            ps[15] = pi + 2;
            ps[8] = ps[7];
            ps[11] = pi + 3;
            ps[4] = tmp2;
            ps[7] = pi + 4;
            ps[0] = tmp1;
            ps[1] = pi + 7;
            ps[2] = pi + 6;
            ps[3] = pi + 5;
            tmp1 = cs[3];
            cs[2] = cs[1];
            cs[3] = ci;
            cs[0] = tmp1;
            cs[1] = ci + 1;
            break;

          case 3:
            ps[12] = ps[0];
            ps[13] = pi + 0;
            ps[14] = pi + 1;
            ps[15] = pi + 2;
            ps[8] = ps[1];
            ps[11] = pi + 3;
            ps[4] = ps[2];
            ps[7] = pi + 4;
            ps[0] = ps[3];
            ps[1] = pi + 7;
            ps[2] = pi + 6;
            ps[3] = pi + 5;
            cs[2] = cs[0];
            cs[3] = ci;
            cs[0] = cs[1];
            cs[1] = ci + 1;
            break;
        }

        ps[5] = coords.length;
        coords.push([(-4 * coords[ps[0]][0] - coords[ps[15]][0] + 6 * (coords[ps[4]][0] + coords[ps[1]][0]) - 2 * (coords[ps[12]][0] + coords[ps[3]][0]) + 3 * (coords[ps[13]][0] + coords[ps[7]][0])) / 9, (-4 * coords[ps[0]][1] - coords[ps[15]][1] + 6 * (coords[ps[4]][1] + coords[ps[1]][1]) - 2 * (coords[ps[12]][1] + coords[ps[3]][1]) + 3 * (coords[ps[13]][1] + coords[ps[7]][1])) / 9]);
        ps[6] = coords.length;
        coords.push([(-4 * coords[ps[3]][0] - coords[ps[12]][0] + 6 * (coords[ps[2]][0] + coords[ps[7]][0]) - 2 * (coords[ps[0]][0] + coords[ps[15]][0]) + 3 * (coords[ps[4]][0] + coords[ps[14]][0])) / 9, (-4 * coords[ps[3]][1] - coords[ps[12]][1] + 6 * (coords[ps[2]][1] + coords[ps[7]][1]) - 2 * (coords[ps[0]][1] + coords[ps[15]][1]) + 3 * (coords[ps[4]][1] + coords[ps[14]][1])) / 9]);
        ps[9] = coords.length;
        coords.push([(-4 * coords[ps[12]][0] - coords[ps[3]][0] + 6 * (coords[ps[8]][0] + coords[ps[13]][0]) - 2 * (coords[ps[0]][0] + coords[ps[15]][0]) + 3 * (coords[ps[11]][0] + coords[ps[1]][0])) / 9, (-4 * coords[ps[12]][1] - coords[ps[3]][1] + 6 * (coords[ps[8]][1] + coords[ps[13]][1]) - 2 * (coords[ps[0]][1] + coords[ps[15]][1]) + 3 * (coords[ps[11]][1] + coords[ps[1]][1])) / 9]);
        ps[10] = coords.length;
        coords.push([(-4 * coords[ps[15]][0] - coords[ps[0]][0] + 6 * (coords[ps[11]][0] + coords[ps[14]][0]) - 2 * (coords[ps[12]][0] + coords[ps[3]][0]) + 3 * (coords[ps[2]][0] + coords[ps[8]][0])) / 9, (-4 * coords[ps[15]][1] - coords[ps[0]][1] + 6 * (coords[ps[11]][1] + coords[ps[14]][1]) - 2 * (coords[ps[12]][1] + coords[ps[3]][1]) + 3 * (coords[ps[2]][1] + coords[ps[8]][1])) / 9]);
        this.figures.push({
          type: "patch",
          coords: new Int32Array(ps),
          colors: new Int32Array(cs)
        });
      }
    }
  }, {
    key: "_decodeType7Shading",
    value: function _decodeType7Shading(reader) {
      var coords = this.coords;
      var colors = this.colors;
      var ps = new Int32Array(16);
      var cs = new Int32Array(4);

      while (reader.hasData) {
        var f = reader.readFlag();

        if (!(0 <= f && f <= 3)) {
          throw new _util.FormatError("Unknown type7 flag");
        }

        var pi = coords.length;

        for (var i = 0, ii = f !== 0 ? 12 : 16; i < ii; i++) {
          coords.push(reader.readCoordinate());
        }

        var ci = colors.length;

        for (var _i3 = 0, _ii2 = f !== 0 ? 2 : 4; _i3 < _ii2; _i3++) {
          colors.push(reader.readComponents());
        }

        var tmp1 = void 0,
            tmp2 = void 0,
            tmp3 = void 0,
            tmp4 = void 0;

        switch (f) {
          case 0:
            ps[12] = pi + 3;
            ps[13] = pi + 4;
            ps[14] = pi + 5;
            ps[15] = pi + 6;
            ps[8] = pi + 2;
            ps[9] = pi + 13;
            ps[10] = pi + 14;
            ps[11] = pi + 7;
            ps[4] = pi + 1;
            ps[5] = pi + 12;
            ps[6] = pi + 15;
            ps[7] = pi + 8;
            ps[0] = pi;
            ps[1] = pi + 11;
            ps[2] = pi + 10;
            ps[3] = pi + 9;
            cs[2] = ci + 1;
            cs[3] = ci + 2;
            cs[0] = ci;
            cs[1] = ci + 3;
            break;

          case 1:
            tmp1 = ps[12];
            tmp2 = ps[13];
            tmp3 = ps[14];
            tmp4 = ps[15];
            ps[12] = tmp4;
            ps[13] = pi + 0;
            ps[14] = pi + 1;
            ps[15] = pi + 2;
            ps[8] = tmp3;
            ps[9] = pi + 9;
            ps[10] = pi + 10;
            ps[11] = pi + 3;
            ps[4] = tmp2;
            ps[5] = pi + 8;
            ps[6] = pi + 11;
            ps[7] = pi + 4;
            ps[0] = tmp1;
            ps[1] = pi + 7;
            ps[2] = pi + 6;
            ps[3] = pi + 5;
            tmp1 = cs[2];
            tmp2 = cs[3];
            cs[2] = tmp2;
            cs[3] = ci;
            cs[0] = tmp1;
            cs[1] = ci + 1;
            break;

          case 2:
            tmp1 = ps[15];
            tmp2 = ps[11];
            ps[12] = ps[3];
            ps[13] = pi + 0;
            ps[14] = pi + 1;
            ps[15] = pi + 2;
            ps[8] = ps[7];
            ps[9] = pi + 9;
            ps[10] = pi + 10;
            ps[11] = pi + 3;
            ps[4] = tmp2;
            ps[5] = pi + 8;
            ps[6] = pi + 11;
            ps[7] = pi + 4;
            ps[0] = tmp1;
            ps[1] = pi + 7;
            ps[2] = pi + 6;
            ps[3] = pi + 5;
            tmp1 = cs[3];
            cs[2] = cs[1];
            cs[3] = ci;
            cs[0] = tmp1;
            cs[1] = ci + 1;
            break;

          case 3:
            ps[12] = ps[0];
            ps[13] = pi + 0;
            ps[14] = pi + 1;
            ps[15] = pi + 2;
            ps[8] = ps[1];
            ps[9] = pi + 9;
            ps[10] = pi + 10;
            ps[11] = pi + 3;
            ps[4] = ps[2];
            ps[5] = pi + 8;
            ps[6] = pi + 11;
            ps[7] = pi + 4;
            ps[0] = ps[3];
            ps[1] = pi + 7;
            ps[2] = pi + 6;
            ps[3] = pi + 5;
            cs[2] = cs[0];
            cs[3] = ci;
            cs[0] = cs[1];
            cs[1] = ci + 1;
            break;
        }

        this.figures.push({
          type: "patch",
          coords: new Int32Array(ps),
          colors: new Int32Array(cs)
        });
      }
    }
  }, {
    key: "_buildFigureFromPatch",
    value: function _buildFigureFromPatch(index) {
      var figure = this.figures[index];
      (0, _util.assert)(figure.type === "patch", "Unexpected patch mesh figure");
      var coords = this.coords,
          colors = this.colors;
      var pi = figure.coords;
      var ci = figure.colors;
      var figureMinX = Math.min(coords[pi[0]][0], coords[pi[3]][0], coords[pi[12]][0], coords[pi[15]][0]);
      var figureMinY = Math.min(coords[pi[0]][1], coords[pi[3]][1], coords[pi[12]][1], coords[pi[15]][1]);
      var figureMaxX = Math.max(coords[pi[0]][0], coords[pi[3]][0], coords[pi[12]][0], coords[pi[15]][0]);
      var figureMaxY = Math.max(coords[pi[0]][1], coords[pi[3]][1], coords[pi[12]][1], coords[pi[15]][1]);
      var splitXBy = Math.ceil((figureMaxX - figureMinX) * MeshShading.TRIANGLE_DENSITY / (this.bounds[2] - this.bounds[0]));
      splitXBy = Math.max(MeshShading.MIN_SPLIT_PATCH_CHUNKS_AMOUNT, Math.min(MeshShading.MAX_SPLIT_PATCH_CHUNKS_AMOUNT, splitXBy));
      var splitYBy = Math.ceil((figureMaxY - figureMinY) * MeshShading.TRIANGLE_DENSITY / (this.bounds[3] - this.bounds[1]));
      splitYBy = Math.max(MeshShading.MIN_SPLIT_PATCH_CHUNKS_AMOUNT, Math.min(MeshShading.MAX_SPLIT_PATCH_CHUNKS_AMOUNT, splitYBy));
      var verticesPerRow = splitXBy + 1;
      var figureCoords = new Int32Array((splitYBy + 1) * verticesPerRow);
      var figureColors = new Int32Array((splitYBy + 1) * verticesPerRow);
      var k = 0;
      var cl = new Uint8Array(3),
          cr = new Uint8Array(3);
      var c0 = colors[ci[0]],
          c1 = colors[ci[1]],
          c2 = colors[ci[2]],
          c3 = colors[ci[3]];
      var bRow = getB(splitYBy),
          bCol = getB(splitXBy);

      for (var row = 0; row <= splitYBy; row++) {
        cl[0] = (c0[0] * (splitYBy - row) + c2[0] * row) / splitYBy | 0;
        cl[1] = (c0[1] * (splitYBy - row) + c2[1] * row) / splitYBy | 0;
        cl[2] = (c0[2] * (splitYBy - row) + c2[2] * row) / splitYBy | 0;
        cr[0] = (c1[0] * (splitYBy - row) + c3[0] * row) / splitYBy | 0;
        cr[1] = (c1[1] * (splitYBy - row) + c3[1] * row) / splitYBy | 0;
        cr[2] = (c1[2] * (splitYBy - row) + c3[2] * row) / splitYBy | 0;

        for (var col = 0; col <= splitXBy; col++, k++) {
          if ((row === 0 || row === splitYBy) && (col === 0 || col === splitXBy)) {
            continue;
          }

          var x = 0,
              y = 0;
          var q = 0;

          for (var i = 0; i <= 3; i++) {
            for (var j = 0; j <= 3; j++, q++) {
              var m = bRow[row][i] * bCol[col][j];
              x += coords[pi[q]][0] * m;
              y += coords[pi[q]][1] * m;
            }
          }

          figureCoords[k] = coords.length;
          coords.push([x, y]);
          figureColors[k] = colors.length;
          var newColor = new Uint8Array(3);
          newColor[0] = (cl[0] * (splitXBy - col) + cr[0] * col) / splitXBy | 0;
          newColor[1] = (cl[1] * (splitXBy - col) + cr[1] * col) / splitXBy | 0;
          newColor[2] = (cl[2] * (splitXBy - col) + cr[2] * col) / splitXBy | 0;
          colors.push(newColor);
        }
      }

      figureCoords[0] = pi[0];
      figureColors[0] = ci[0];
      figureCoords[splitXBy] = pi[3];
      figureColors[splitXBy] = ci[1];
      figureCoords[verticesPerRow * splitYBy] = pi[12];
      figureColors[verticesPerRow * splitYBy] = ci[2];
      figureCoords[verticesPerRow * splitYBy + splitXBy] = pi[15];
      figureColors[verticesPerRow * splitYBy + splitXBy] = ci[3];
      this.figures[index] = {
        type: "lattice",
        coords: figureCoords,
        colors: figureColors,
        verticesPerRow: verticesPerRow
      };
    }
  }, {
    key: "_updateBounds",
    value: function _updateBounds() {
      var minX = this.coords[0][0],
          minY = this.coords[0][1],
          maxX = minX,
          maxY = minY;

      for (var i = 1, ii = this.coords.length; i < ii; i++) {
        var x = this.coords[i][0],
            y = this.coords[i][1];
        minX = minX > x ? x : minX;
        minY = minY > y ? y : minY;
        maxX = maxX < x ? x : maxX;
        maxY = maxY < y ? y : maxY;
      }

      this.bounds = [minX, minY, maxX, maxY];
    }
  }, {
    key: "_packData",
    value: function _packData() {
      var i, ii, j, jj;
      var coords = this.coords;
      var coordsPacked = new Float32Array(coords.length * 2);

      for (i = 0, j = 0, ii = coords.length; i < ii; i++) {
        var xy = coords[i];
        coordsPacked[j++] = xy[0];
        coordsPacked[j++] = xy[1];
      }

      this.coords = coordsPacked;
      var colors = this.colors;
      var colorsPacked = new Uint8Array(colors.length * 3);

      for (i = 0, j = 0, ii = colors.length; i < ii; i++) {
        var c = colors[i];
        colorsPacked[j++] = c[0];
        colorsPacked[j++] = c[1];
        colorsPacked[j++] = c[2];
      }

      this.colors = colorsPacked;
      var figures = this.figures;

      for (i = 0, ii = figures.length; i < ii; i++) {
        var figure = figures[i],
            ps = figure.coords,
            cs = figure.colors;

        for (j = 0, jj = ps.length; j < jj; j++) {
          ps[j] *= 2;
          cs[j] *= 3;
        }
      }
    }
  }, {
    key: "getIR",
    value: function getIR() {
      return ["Mesh", this.shadingType, this.coords, this.colors, this.figures, this.bounds, this.bbox, this.background];
    }
  }], [{
    key: "MIN_SPLIT_PATCH_CHUNKS_AMOUNT",
    get: function get() {
      return (0, _util.shadow)(this, "MIN_SPLIT_PATCH_CHUNKS_AMOUNT", 3);
    }
  }, {
    key: "MAX_SPLIT_PATCH_CHUNKS_AMOUNT",
    get: function get() {
      return (0, _util.shadow)(this, "MAX_SPLIT_PATCH_CHUNKS_AMOUNT", 20);
    }
  }, {
    key: "TRIANGLE_DENSITY",
    get: function get() {
      return (0, _util.shadow)(this, "TRIANGLE_DENSITY", 20);
    }
  }]);

  return MeshShading;
}(BaseShading);

var DummyShading = /*#__PURE__*/function (_BaseShading3) {
  _inherits(DummyShading, _BaseShading3);

  var _super3 = _createSuper(DummyShading);

  function DummyShading() {
    _classCallCheck(this, DummyShading);

    return _super3.apply(this, arguments);
  }

  _createClass(DummyShading, [{
    key: "getIR",
    value: function getIR() {
      return ["Dummy"];
    }
  }]);

  return DummyShading;
}(BaseShading);

function getTilingPatternIR(operatorList, dict, color) {
  var matrix = dict.getArray("Matrix");

  var bbox = _util.Util.normalizeRect(dict.getArray("BBox"));

  var xstep = dict.get("XStep");
  var ystep = dict.get("YStep");
  var paintType = dict.get("PaintType");
  var tilingType = dict.get("TilingType");

  if (bbox[2] - bbox[0] === 0 || bbox[3] - bbox[1] === 0) {
    throw new _util.FormatError("Invalid getTilingPatternIR /BBox array: [".concat(bbox, "]."));
  }

  return ["TilingPattern", color, operatorList, matrix, bbox, xstep, ystep, paintType, tilingType];
}