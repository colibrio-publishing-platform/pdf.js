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
exports.IdentityCMap = exports.CMapFactory = exports.CMap = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

var _parser = require("./parser.js");

var _core_utils = require("./core_utils.js");

var _stream = require("./stream.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var BUILT_IN_CMAPS = ["Adobe-GB1-UCS2", "Adobe-CNS1-UCS2", "Adobe-Japan1-UCS2", "Adobe-Korea1-UCS2", "78-EUC-H", "78-EUC-V", "78-H", "78-RKSJ-H", "78-RKSJ-V", "78-V", "78ms-RKSJ-H", "78ms-RKSJ-V", "83pv-RKSJ-H", "90ms-RKSJ-H", "90ms-RKSJ-V", "90msp-RKSJ-H", "90msp-RKSJ-V", "90pv-RKSJ-H", "90pv-RKSJ-V", "Add-H", "Add-RKSJ-H", "Add-RKSJ-V", "Add-V", "Adobe-CNS1-0", "Adobe-CNS1-1", "Adobe-CNS1-2", "Adobe-CNS1-3", "Adobe-CNS1-4", "Adobe-CNS1-5", "Adobe-CNS1-6", "Adobe-GB1-0", "Adobe-GB1-1", "Adobe-GB1-2", "Adobe-GB1-3", "Adobe-GB1-4", "Adobe-GB1-5", "Adobe-Japan1-0", "Adobe-Japan1-1", "Adobe-Japan1-2", "Adobe-Japan1-3", "Adobe-Japan1-4", "Adobe-Japan1-5", "Adobe-Japan1-6", "Adobe-Korea1-0", "Adobe-Korea1-1", "Adobe-Korea1-2", "B5-H", "B5-V", "B5pc-H", "B5pc-V", "CNS-EUC-H", "CNS-EUC-V", "CNS1-H", "CNS1-V", "CNS2-H", "CNS2-V", "ETHK-B5-H", "ETHK-B5-V", "ETen-B5-H", "ETen-B5-V", "ETenms-B5-H", "ETenms-B5-V", "EUC-H", "EUC-V", "Ext-H", "Ext-RKSJ-H", "Ext-RKSJ-V", "Ext-V", "GB-EUC-H", "GB-EUC-V", "GB-H", "GB-V", "GBK-EUC-H", "GBK-EUC-V", "GBK2K-H", "GBK2K-V", "GBKp-EUC-H", "GBKp-EUC-V", "GBT-EUC-H", "GBT-EUC-V", "GBT-H", "GBT-V", "GBTpc-EUC-H", "GBTpc-EUC-V", "GBpc-EUC-H", "GBpc-EUC-V", "H", "HKdla-B5-H", "HKdla-B5-V", "HKdlb-B5-H", "HKdlb-B5-V", "HKgccs-B5-H", "HKgccs-B5-V", "HKm314-B5-H", "HKm314-B5-V", "HKm471-B5-H", "HKm471-B5-V", "HKscs-B5-H", "HKscs-B5-V", "Hankaku", "Hiragana", "KSC-EUC-H", "KSC-EUC-V", "KSC-H", "KSC-Johab-H", "KSC-Johab-V", "KSC-V", "KSCms-UHC-H", "KSCms-UHC-HW-H", "KSCms-UHC-HW-V", "KSCms-UHC-V", "KSCpc-EUC-H", "KSCpc-EUC-V", "Katakana", "NWP-H", "NWP-V", "RKSJ-H", "RKSJ-V", "Roman", "UniCNS-UCS2-H", "UniCNS-UCS2-V", "UniCNS-UTF16-H", "UniCNS-UTF16-V", "UniCNS-UTF32-H", "UniCNS-UTF32-V", "UniCNS-UTF8-H", "UniCNS-UTF8-V", "UniGB-UCS2-H", "UniGB-UCS2-V", "UniGB-UTF16-H", "UniGB-UTF16-V", "UniGB-UTF32-H", "UniGB-UTF32-V", "UniGB-UTF8-H", "UniGB-UTF8-V", "UniJIS-UCS2-H", "UniJIS-UCS2-HW-H", "UniJIS-UCS2-HW-V", "UniJIS-UCS2-V", "UniJIS-UTF16-H", "UniJIS-UTF16-V", "UniJIS-UTF32-H", "UniJIS-UTF32-V", "UniJIS-UTF8-H", "UniJIS-UTF8-V", "UniJIS2004-UTF16-H", "UniJIS2004-UTF16-V", "UniJIS2004-UTF32-H", "UniJIS2004-UTF32-V", "UniJIS2004-UTF8-H", "UniJIS2004-UTF8-V", "UniJISPro-UCS2-HW-V", "UniJISPro-UCS2-V", "UniJISPro-UTF8-V", "UniJISX0213-UTF32-H", "UniJISX0213-UTF32-V", "UniJISX02132004-UTF32-H", "UniJISX02132004-UTF32-V", "UniKS-UCS2-H", "UniKS-UCS2-V", "UniKS-UTF16-H", "UniKS-UTF16-V", "UniKS-UTF32-H", "UniKS-UTF32-V", "UniKS-UTF8-H", "UniKS-UTF8-V", "V", "WP-Symbol"];
var MAX_MAP_RANGE = Math.pow(2, 24) - 1;

var CMap = /*#__PURE__*/function () {
  function CMap() {
    var builtInCMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, CMap);

    this.codespaceRanges = [[], [], [], []];
    this.numCodespaceRanges = 0;
    this._map = [];
    this.name = "";
    this.vertical = false;
    this.useCMap = null;
    this.builtInCMap = builtInCMap;
  }

  _createClass(CMap, [{
    key: "addCodespaceRange",
    value: function addCodespaceRange(n, low, high) {
      this.codespaceRanges[n - 1].push(low, high);
      this.numCodespaceRanges++;
    }
  }, {
    key: "mapCidRange",
    value: function mapCidRange(low, high, dstLow) {
      if (high - low > MAX_MAP_RANGE) {
        throw new Error("mapCidRange - ignoring data above MAX_MAP_RANGE.");
      }

      while (low <= high) {
        this._map[low++] = dstLow++;
      }
    }
  }, {
    key: "mapBfRange",
    value: function mapBfRange(low, high, dstLow) {
      if (high - low > MAX_MAP_RANGE) {
        throw new Error("mapBfRange - ignoring data above MAX_MAP_RANGE.");
      }

      var lastByte = dstLow.length - 1;

      while (low <= high) {
        this._map[low++] = dstLow;
        var nextCharCode = dstLow.charCodeAt(lastByte) + 1;

        if (nextCharCode > 0xff) {
          dstLow = dstLow.substring(0, lastByte - 1) + String.fromCharCode(dstLow.charCodeAt(lastByte - 1) + 1) + "\x00";
          continue;
        }

        dstLow = dstLow.substring(0, lastByte) + String.fromCharCode(nextCharCode);
      }
    }
  }, {
    key: "mapBfRangeToArray",
    value: function mapBfRangeToArray(low, high, array) {
      if (high - low > MAX_MAP_RANGE) {
        throw new Error("mapBfRangeToArray - ignoring data above MAX_MAP_RANGE.");
      }

      var ii = array.length;
      var i = 0;

      while (low <= high && i < ii) {
        this._map[low] = array[i++];
        ++low;
      }
    }
  }, {
    key: "mapOne",
    value: function mapOne(src, dst) {
      this._map[src] = dst;
    }
  }, {
    key: "lookup",
    value: function lookup(code) {
      return this._map[code];
    }
  }, {
    key: "contains",
    value: function contains(code) {
      return this._map[code] !== undefined;
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      var map = this._map;
      var length = map.length;

      if (length <= 0x10000) {
        for (var i = 0; i < length; i++) {
          if (map[i] !== undefined) {
            callback(i, map[i]);
          }
        }
      } else {
        for (var _i in map) {
          callback(_i, map[_i]);
        }
      }
    }
  }, {
    key: "charCodeOf",
    value: function charCodeOf(value) {
      var map = this._map;

      if (map.length <= 0x10000) {
        return map.indexOf(value);
      }

      for (var charCode in map) {
        if (map[charCode] === value) {
          return charCode | 0;
        }
      }

      return -1;
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this._map;
    }
  }, {
    key: "readCharCode",
    value: function readCharCode(str, offset, out) {
      var c = 0;
      var codespaceRanges = this.codespaceRanges;

      for (var n = 0, nn = codespaceRanges.length; n < nn; n++) {
        c = (c << 8 | str.charCodeAt(offset + n)) >>> 0;
        var codespaceRange = codespaceRanges[n];

        for (var k = 0, kk = codespaceRange.length; k < kk;) {
          var low = codespaceRange[k++];
          var high = codespaceRange[k++];

          if (c >= low && c <= high) {
            out.charcode = c;
            out.length = n + 1;
            return;
          }
        }
      }

      out.charcode = 0;
      out.length = 1;
    }
  }, {
    key: "getCharCodeLength",
    value: function getCharCodeLength(charCode) {
      var codespaceRanges = this.codespaceRanges;

      for (var n = 0, nn = codespaceRanges.length; n < nn; n++) {
        var codespaceRange = codespaceRanges[n];

        for (var k = 0, kk = codespaceRange.length; k < kk;) {
          var low = codespaceRange[k++];
          var high = codespaceRange[k++];

          if (charCode >= low && charCode <= high) {
            return n + 1;
          }
        }
      }

      return 1;
    }
  }, {
    key: "length",
    get: function get() {
      return this._map.length;
    }
  }, {
    key: "isIdentityCMap",
    get: function get() {
      if (!(this.name === "Identity-H" || this.name === "Identity-V")) {
        return false;
      }

      if (this._map.length !== 0x10000) {
        return false;
      }

      for (var i = 0; i < 0x10000; i++) {
        if (this._map[i] !== i) {
          return false;
        }
      }

      return true;
    }
  }]);

  return CMap;
}();

exports.CMap = CMap;

var IdentityCMap = /*#__PURE__*/function (_CMap) {
  _inherits(IdentityCMap, _CMap);

  var _super = _createSuper(IdentityCMap);

  function IdentityCMap(vertical, n) {
    var _this;

    _classCallCheck(this, IdentityCMap);

    _this = _super.call(this);
    _this.vertical = vertical;

    _this.addCodespaceRange(n, 0, 0xffff);

    return _this;
  }

  _createClass(IdentityCMap, [{
    key: "mapCidRange",
    value: function mapCidRange(low, high, dstLow) {
      (0, _util.unreachable)("should not call mapCidRange");
    }
  }, {
    key: "mapBfRange",
    value: function mapBfRange(low, high, dstLow) {
      (0, _util.unreachable)("should not call mapBfRange");
    }
  }, {
    key: "mapBfRangeToArray",
    value: function mapBfRangeToArray(low, high, array) {
      (0, _util.unreachable)("should not call mapBfRangeToArray");
    }
  }, {
    key: "mapOne",
    value: function mapOne(src, dst) {
      (0, _util.unreachable)("should not call mapCidOne");
    }
  }, {
    key: "lookup",
    value: function lookup(code) {
      return Number.isInteger(code) && code <= 0xffff ? code : undefined;
    }
  }, {
    key: "contains",
    value: function contains(code) {
      return Number.isInteger(code) && code <= 0xffff;
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      for (var i = 0; i <= 0xffff; i++) {
        callback(i, i);
      }
    }
  }, {
    key: "charCodeOf",
    value: function charCodeOf(value) {
      return Number.isInteger(value) && value <= 0xffff ? value : -1;
    }
  }, {
    key: "getMap",
    value: function getMap() {
      var map = new Array(0x10000);

      for (var i = 0; i <= 0xffff; i++) {
        map[i] = i;
      }

      return map;
    }
  }, {
    key: "length",
    get: function get() {
      return 0x10000;
    }
  }, {
    key: "isIdentityCMap",
    get: function get() {
      (0, _util.unreachable)("should not access .isIdentityCMap");
    }
  }]);

  return IdentityCMap;
}(CMap);

exports.IdentityCMap = IdentityCMap;

var BinaryCMapReader = function BinaryCMapReaderClosure() {
  function hexToInt(a, size) {
    var n = 0;

    for (var i = 0; i <= size; i++) {
      n = n << 8 | a[i];
    }

    return n >>> 0;
  }

  function hexToStr(a, size) {
    if (size === 1) {
      return String.fromCharCode(a[0], a[1]);
    }

    if (size === 3) {
      return String.fromCharCode(a[0], a[1], a[2], a[3]);
    }

    return String.fromCharCode.apply(null, a.subarray(0, size + 1));
  }

  function addHex(a, b, size) {
    var c = 0;

    for (var i = size; i >= 0; i--) {
      c += a[i] + b[i];
      a[i] = c & 255;
      c >>= 8;
    }
  }

  function incHex(a, size) {
    var c = 1;

    for (var i = size; i >= 0 && c > 0; i--) {
      c += a[i];
      a[i] = c & 255;
      c >>= 8;
    }
  }

  var MAX_NUM_SIZE = 16;
  var MAX_ENCODED_NUM_SIZE = 19;

  var BinaryCMapStream = /*#__PURE__*/function () {
    function BinaryCMapStream(data) {
      _classCallCheck(this, BinaryCMapStream);

      this.buffer = data;
      this.pos = 0;
      this.end = data.length;
      this.tmpBuf = new Uint8Array(MAX_ENCODED_NUM_SIZE);
    }

    _createClass(BinaryCMapStream, [{
      key: "readByte",
      value: function readByte() {
        if (this.pos >= this.end) {
          return -1;
        }

        return this.buffer[this.pos++];
      }
    }, {
      key: "readNumber",
      value: function readNumber() {
        var n = 0;
        var last;

        do {
          var b = this.readByte();

          if (b < 0) {
            throw new _util.FormatError("unexpected EOF in bcmap");
          }

          last = !(b & 0x80);
          n = n << 7 | b & 0x7f;
        } while (!last);

        return n;
      }
    }, {
      key: "readSigned",
      value: function readSigned() {
        var n = this.readNumber();
        return n & 1 ? ~(n >>> 1) : n >>> 1;
      }
    }, {
      key: "readHex",
      value: function readHex(num, size) {
        num.set(this.buffer.subarray(this.pos, this.pos + size + 1));
        this.pos += size + 1;
      }
    }, {
      key: "readHexNumber",
      value: function readHexNumber(num, size) {
        var last;
        var stack = this.tmpBuf;
        var sp = 0;

        do {
          var b = this.readByte();

          if (b < 0) {
            throw new _util.FormatError("unexpected EOF in bcmap");
          }

          last = !(b & 0x80);
          stack[sp++] = b & 0x7f;
        } while (!last);

        var i = size,
            buffer = 0,
            bufferSize = 0;

        while (i >= 0) {
          while (bufferSize < 8 && stack.length > 0) {
            buffer |= stack[--sp] << bufferSize;
            bufferSize += 7;
          }

          num[i] = buffer & 255;
          i--;
          buffer >>= 8;
          bufferSize -= 8;
        }
      }
    }, {
      key: "readHexSigned",
      value: function readHexSigned(num, size) {
        this.readHexNumber(num, size);
        var sign = num[size] & 1 ? 255 : 0;
        var c = 0;

        for (var i = 0; i <= size; i++) {
          c = (c & 1) << 8 | num[i];
          num[i] = c >> 1 ^ sign;
        }
      }
    }, {
      key: "readString",
      value: function readString() {
        var len = this.readNumber();
        var s = "";

        for (var i = 0; i < len; i++) {
          s += String.fromCharCode(this.readNumber());
        }

        return s;
      }
    }]);

    return BinaryCMapStream;
  }();

  var BinaryCMapReader = /*#__PURE__*/function () {
    function BinaryCMapReader() {
      _classCallCheck(this, BinaryCMapReader);
    }

    _createClass(BinaryCMapReader, [{
      key: "process",
      value: function () {
        var _process = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, cMap, extend) {
          var stream, header, useCMap, start, end, _char, charCode, tmp, code, b, type, sequence, dataSize, ucs2DataSize, subitemsCount, i, _i2, _i3, _i4, _i5, _i6;

          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  stream = new BinaryCMapStream(data);
                  header = stream.readByte();
                  cMap.vertical = !!(header & 1);
                  useCMap = null;
                  start = new Uint8Array(MAX_NUM_SIZE);
                  end = new Uint8Array(MAX_NUM_SIZE);
                  _char = new Uint8Array(MAX_NUM_SIZE);
                  charCode = new Uint8Array(MAX_NUM_SIZE);
                  tmp = new Uint8Array(MAX_NUM_SIZE);

                case 9:
                  if (!((b = stream.readByte()) >= 0)) {
                    _context.next = 68;
                    break;
                  }

                  type = b >> 5;

                  if (!(type === 7)) {
                    _context.next = 20;
                    break;
                  }

                  _context.t0 = b & 0x1f;
                  _context.next = _context.t0 === 0 ? 15 : _context.t0 === 1 ? 17 : 19;
                  break;

                case 15:
                  stream.readString();
                  return _context.abrupt("break", 19);

                case 17:
                  useCMap = stream.readString();
                  return _context.abrupt("break", 19);

                case 19:
                  return _context.abrupt("continue", 9);

                case 20:
                  sequence = !!(b & 0x10);
                  dataSize = b & 15;

                  if (!(dataSize + 1 > MAX_NUM_SIZE)) {
                    _context.next = 24;
                    break;
                  }

                  throw new Error("BinaryCMapReader.process: Invalid dataSize.");

                case 24:
                  ucs2DataSize = 1;
                  subitemsCount = stream.readNumber();
                  _context.t1 = type;
                  _context.next = _context.t1 === 0 ? 29 : _context.t1 === 1 ? 35 : _context.t1 === 2 ? 41 : _context.t1 === 3 ? 46 : _context.t1 === 4 ? 53 : _context.t1 === 5 ? 58 : 65;
                  break;

                case 29:
                  stream.readHex(start, dataSize);
                  stream.readHexNumber(end, dataSize);
                  addHex(end, start, dataSize);
                  cMap.addCodespaceRange(dataSize + 1, hexToInt(start, dataSize), hexToInt(end, dataSize));

                  for (i = 1; i < subitemsCount; i++) {
                    incHex(end, dataSize);
                    stream.readHexNumber(start, dataSize);
                    addHex(start, end, dataSize);
                    stream.readHexNumber(end, dataSize);
                    addHex(end, start, dataSize);
                    cMap.addCodespaceRange(dataSize + 1, hexToInt(start, dataSize), hexToInt(end, dataSize));
                  }

                  return _context.abrupt("break", 66);

                case 35:
                  stream.readHex(start, dataSize);
                  stream.readHexNumber(end, dataSize);
                  addHex(end, start, dataSize);
                  stream.readNumber();

                  for (_i2 = 1; _i2 < subitemsCount; _i2++) {
                    incHex(end, dataSize);
                    stream.readHexNumber(start, dataSize);
                    addHex(start, end, dataSize);
                    stream.readHexNumber(end, dataSize);
                    addHex(end, start, dataSize);
                    stream.readNumber();
                  }

                  return _context.abrupt("break", 66);

                case 41:
                  stream.readHex(_char, dataSize);
                  code = stream.readNumber();
                  cMap.mapOne(hexToInt(_char, dataSize), code);

                  for (_i3 = 1; _i3 < subitemsCount; _i3++) {
                    incHex(_char, dataSize);

                    if (!sequence) {
                      stream.readHexNumber(tmp, dataSize);
                      addHex(_char, tmp, dataSize);
                    }

                    code = stream.readSigned() + (code + 1);
                    cMap.mapOne(hexToInt(_char, dataSize), code);
                  }

                  return _context.abrupt("break", 66);

                case 46:
                  stream.readHex(start, dataSize);
                  stream.readHexNumber(end, dataSize);
                  addHex(end, start, dataSize);
                  code = stream.readNumber();
                  cMap.mapCidRange(hexToInt(start, dataSize), hexToInt(end, dataSize), code);

                  for (_i4 = 1; _i4 < subitemsCount; _i4++) {
                    incHex(end, dataSize);

                    if (!sequence) {
                      stream.readHexNumber(start, dataSize);
                      addHex(start, end, dataSize);
                    } else {
                      start.set(end);
                    }

                    stream.readHexNumber(end, dataSize);
                    addHex(end, start, dataSize);
                    code = stream.readNumber();
                    cMap.mapCidRange(hexToInt(start, dataSize), hexToInt(end, dataSize), code);
                  }

                  return _context.abrupt("break", 66);

                case 53:
                  stream.readHex(_char, ucs2DataSize);
                  stream.readHex(charCode, dataSize);
                  cMap.mapOne(hexToInt(_char, ucs2DataSize), hexToStr(charCode, dataSize));

                  for (_i5 = 1; _i5 < subitemsCount; _i5++) {
                    incHex(_char, ucs2DataSize);

                    if (!sequence) {
                      stream.readHexNumber(tmp, ucs2DataSize);
                      addHex(_char, tmp, ucs2DataSize);
                    }

                    incHex(charCode, dataSize);
                    stream.readHexSigned(tmp, dataSize);
                    addHex(charCode, tmp, dataSize);
                    cMap.mapOne(hexToInt(_char, ucs2DataSize), hexToStr(charCode, dataSize));
                  }

                  return _context.abrupt("break", 66);

                case 58:
                  stream.readHex(start, ucs2DataSize);
                  stream.readHexNumber(end, ucs2DataSize);
                  addHex(end, start, ucs2DataSize);
                  stream.readHex(charCode, dataSize);
                  cMap.mapBfRange(hexToInt(start, ucs2DataSize), hexToInt(end, ucs2DataSize), hexToStr(charCode, dataSize));

                  for (_i6 = 1; _i6 < subitemsCount; _i6++) {
                    incHex(end, ucs2DataSize);

                    if (!sequence) {
                      stream.readHexNumber(start, ucs2DataSize);
                      addHex(start, end, ucs2DataSize);
                    } else {
                      start.set(end);
                    }

                    stream.readHexNumber(end, ucs2DataSize);
                    addHex(end, start, ucs2DataSize);
                    stream.readHex(charCode, dataSize);
                    cMap.mapBfRange(hexToInt(start, ucs2DataSize), hexToInt(end, ucs2DataSize), hexToStr(charCode, dataSize));
                  }

                  return _context.abrupt("break", 66);

                case 65:
                  throw new Error("BinaryCMapReader.process - unknown type: ".concat(type));

                case 66:
                  _context.next = 9;
                  break;

                case 68:
                  if (!useCMap) {
                    _context.next = 70;
                    break;
                  }

                  return _context.abrupt("return", extend(useCMap));

                case 70:
                  return _context.abrupt("return", cMap);

                case 71:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function process(_x, _x2, _x3) {
          return _process.apply(this, arguments);
        }

        return process;
      }()
    }]);

    return BinaryCMapReader;
  }();

  return BinaryCMapReader;
}();

var CMapFactory = function CMapFactoryClosure() {
  function strToInt(str) {
    var a = 0;

    for (var i = 0; i < str.length; i++) {
      a = a << 8 | str.charCodeAt(i);
    }

    return a >>> 0;
  }

  function expectString(obj) {
    if (!(0, _util.isString)(obj)) {
      throw new _util.FormatError("Malformed CMap: expected string.");
    }
  }

  function expectInt(obj) {
    if (!Number.isInteger(obj)) {
      throw new _util.FormatError("Malformed CMap: expected int.");
    }
  }

  function parseBfChar(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();

      if (obj === _primitives.EOF) {
        break;
      }

      if ((0, _primitives.isCmd)(obj, "endbfchar")) {
        return;
      }

      expectString(obj);
      var src = strToInt(obj);
      obj = lexer.getObj();
      expectString(obj);
      var dst = obj;
      cMap.mapOne(src, dst);
    }
  }

  function parseBfRange(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();

      if (obj === _primitives.EOF) {
        break;
      }

      if ((0, _primitives.isCmd)(obj, "endbfrange")) {
        return;
      }

      expectString(obj);
      var low = strToInt(obj);
      obj = lexer.getObj();
      expectString(obj);
      var high = strToInt(obj);
      obj = lexer.getObj();

      if (Number.isInteger(obj) || (0, _util.isString)(obj)) {
        var dstLow = Number.isInteger(obj) ? String.fromCharCode(obj) : obj;
        cMap.mapBfRange(low, high, dstLow);
      } else if ((0, _primitives.isCmd)(obj, "[")) {
        obj = lexer.getObj();
        var array = [];

        while (!(0, _primitives.isCmd)(obj, "]") && obj !== _primitives.EOF) {
          array.push(obj);
          obj = lexer.getObj();
        }

        cMap.mapBfRangeToArray(low, high, array);
      } else {
        break;
      }
    }

    throw new _util.FormatError("Invalid bf range.");
  }

  function parseCidChar(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();

      if (obj === _primitives.EOF) {
        break;
      }

      if ((0, _primitives.isCmd)(obj, "endcidchar")) {
        return;
      }

      expectString(obj);
      var src = strToInt(obj);
      obj = lexer.getObj();
      expectInt(obj);
      var dst = obj;
      cMap.mapOne(src, dst);
    }
  }

  function parseCidRange(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();

      if (obj === _primitives.EOF) {
        break;
      }

      if ((0, _primitives.isCmd)(obj, "endcidrange")) {
        return;
      }

      expectString(obj);
      var low = strToInt(obj);
      obj = lexer.getObj();
      expectString(obj);
      var high = strToInt(obj);
      obj = lexer.getObj();
      expectInt(obj);
      var dstLow = obj;
      cMap.mapCidRange(low, high, dstLow);
    }
  }

  function parseCodespaceRange(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();

      if (obj === _primitives.EOF) {
        break;
      }

      if ((0, _primitives.isCmd)(obj, "endcodespacerange")) {
        return;
      }

      if (!(0, _util.isString)(obj)) {
        break;
      }

      var low = strToInt(obj);
      obj = lexer.getObj();

      if (!(0, _util.isString)(obj)) {
        break;
      }

      var high = strToInt(obj);
      cMap.addCodespaceRange(obj.length, low, high);
    }

    throw new _util.FormatError("Invalid codespace range.");
  }

  function parseWMode(cMap, lexer) {
    var obj = lexer.getObj();

    if (Number.isInteger(obj)) {
      cMap.vertical = !!obj;
    }
  }

  function parseCMapName(cMap, lexer) {
    var obj = lexer.getObj();

    if ((0, _primitives.isName)(obj) && (0, _util.isString)(obj.name)) {
      cMap.name = obj.name;
    }
  }

  function parseCMap(_x4, _x5, _x6, _x7) {
    return _parseCMap.apply(this, arguments);
  }

  function _parseCMap() {
    _parseCMap = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(cMap, lexer, fetchBuiltInCMap, useCMap) {
      var previous, embeddedUseCMap, obj;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!true) {
                _context3.next = 39;
                break;
              }

              _context3.prev = 1;
              obj = lexer.getObj();

              if (!(obj === _primitives.EOF)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("break", 39);

            case 7:
              if (!(0, _primitives.isName)(obj)) {
                _context3.next = 12;
                break;
              }

              if (obj.name === "WMode") {
                parseWMode(cMap, lexer);
              } else if (obj.name === "CMapName") {
                parseCMapName(cMap, lexer);
              }

              previous = obj;
              _context3.next = 29;
              break;

            case 12:
              if (!(0, _primitives.isCmd)(obj)) {
                _context3.next = 29;
                break;
              }

              _context3.t0 = obj.cmd;
              _context3.next = _context3.t0 === "endcmap" ? 16 : _context3.t0 === "usecmap" ? 17 : _context3.t0 === "begincodespacerange" ? 19 : _context3.t0 === "beginbfchar" ? 21 : _context3.t0 === "begincidchar" ? 23 : _context3.t0 === "beginbfrange" ? 25 : _context3.t0 === "begincidrange" ? 27 : 29;
              break;

            case 16:
              return _context3.abrupt("break", 39);

            case 17:
              if ((0, _primitives.isName)(previous)) {
                embeddedUseCMap = previous.name;
              }

              return _context3.abrupt("break", 29);

            case 19:
              parseCodespaceRange(cMap, lexer);
              return _context3.abrupt("break", 29);

            case 21:
              parseBfChar(cMap, lexer);
              return _context3.abrupt("break", 29);

            case 23:
              parseCidChar(cMap, lexer);
              return _context3.abrupt("break", 29);

            case 25:
              parseBfRange(cMap, lexer);
              return _context3.abrupt("break", 29);

            case 27:
              parseCidRange(cMap, lexer);
              return _context3.abrupt("break", 29);

            case 29:
              _context3.next = 37;
              break;

            case 31:
              _context3.prev = 31;
              _context3.t1 = _context3["catch"](1);

              if (!(_context3.t1 instanceof _core_utils.MissingDataException)) {
                _context3.next = 35;
                break;
              }

              throw _context3.t1;

            case 35:
              (0, _util.warn)("Invalid cMap data: " + _context3.t1);
              return _context3.abrupt("continue", 0);

            case 37:
              _context3.next = 0;
              break;

            case 39:
              if (!useCMap && embeddedUseCMap) {
                useCMap = embeddedUseCMap;
              }

              if (!useCMap) {
                _context3.next = 42;
                break;
              }

              return _context3.abrupt("return", extendCMap(cMap, fetchBuiltInCMap, useCMap));

            case 42:
              return _context3.abrupt("return", cMap);

            case 43:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 31]]);
    }));
    return _parseCMap.apply(this, arguments);
  }

  function extendCMap(_x8, _x9, _x10) {
    return _extendCMap.apply(this, arguments);
  }

  function _extendCMap() {
    _extendCMap = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(cMap, fetchBuiltInCMap, useCMap) {
      var useCodespaceRanges, i;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return createBuiltInCMap(useCMap, fetchBuiltInCMap);

            case 2:
              cMap.useCMap = _context4.sent;

              if (cMap.numCodespaceRanges === 0) {
                useCodespaceRanges = cMap.useCMap.codespaceRanges;

                for (i = 0; i < useCodespaceRanges.length; i++) {
                  cMap.codespaceRanges[i] = useCodespaceRanges[i].slice();
                }

                cMap.numCodespaceRanges = cMap.useCMap.numCodespaceRanges;
              }

              cMap.useCMap.forEach(function (key, value) {
                if (!cMap.contains(key)) {
                  cMap.mapOne(key, cMap.useCMap.lookup(key));
                }
              });
              return _context4.abrupt("return", cMap);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _extendCMap.apply(this, arguments);
  }

  function createBuiltInCMap(_x11, _x12) {
    return _createBuiltInCMap.apply(this, arguments);
  }

  function _createBuiltInCMap() {
    _createBuiltInCMap = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(name, fetchBuiltInCMap) {
      var _yield$fetchBuiltInCM, cMapData, compressionType, cMap, lexer;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(name === "Identity-H")) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return", new IdentityCMap(false, 2));

            case 4:
              if (!(name === "Identity-V")) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", new IdentityCMap(true, 2));

            case 6:
              if (BUILT_IN_CMAPS.includes(name)) {
                _context5.next = 8;
                break;
              }

              throw new Error("Unknown CMap name: " + name);

            case 8:
              if (fetchBuiltInCMap) {
                _context5.next = 10;
                break;
              }

              throw new Error("Built-in CMap parameters are not provided.");

            case 10:
              _context5.next = 12;
              return fetchBuiltInCMap(name);

            case 12:
              _yield$fetchBuiltInCM = _context5.sent;
              cMapData = _yield$fetchBuiltInCM.cMapData;
              compressionType = _yield$fetchBuiltInCM.compressionType;
              cMap = new CMap(true);

              if (!(compressionType === _util.CMapCompressionType.BINARY)) {
                _context5.next = 18;
                break;
              }

              return _context5.abrupt("return", new BinaryCMapReader().process(cMapData, cMap, function (useCMap) {
                return extendCMap(cMap, fetchBuiltInCMap, useCMap);
              }));

            case 18:
              if (!(compressionType === _util.CMapCompressionType.NONE)) {
                _context5.next = 21;
                break;
              }

              lexer = new _parser.Lexer(new _stream.Stream(cMapData));
              return _context5.abrupt("return", parseCMap(cMap, lexer, fetchBuiltInCMap, null));

            case 21:
              throw new Error("TODO: Only BINARY/NONE CMap compression is currently supported.");

            case 22:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _createBuiltInCMap.apply(this, arguments);
  }

  return {
    create: function create(params) {
      return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var encoding, fetchBuiltInCMap, useCMap, parsedCMap;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                encoding = params.encoding;
                fetchBuiltInCMap = params.fetchBuiltInCMap;
                useCMap = params.useCMap;

                if (!(0, _primitives.isName)(encoding)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", createBuiltInCMap(encoding.name, fetchBuiltInCMap));

              case 7:
                if (!(0, _primitives.isStream)(encoding)) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 10;
                return parseCMap(new CMap(), new _parser.Lexer(encoding), fetchBuiltInCMap, useCMap);

              case 10:
                parsedCMap = _context2.sent;

                if (!parsedCMap.isIdentityCMap) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", createBuiltInCMap(parsedCMap.name, fetchBuiltInCMap));

              case 13:
                return _context2.abrupt("return", parsedCMap);

              case 14:
                throw new Error("Encoding required.");

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  };
}();

exports.CMapFactory = CMapFactory;