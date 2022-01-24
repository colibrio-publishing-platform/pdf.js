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
exports.PredictorStream = void 0;

var _decode_stream = require("./decode_stream.js");

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PredictorStream = /*#__PURE__*/function (_DecodeStream) {
  _inherits(PredictorStream, _DecodeStream);

  var _super = _createSuper(PredictorStream);

  function PredictorStream(str, maybeLength, params) {
    var _this;

    _classCallCheck(this, PredictorStream);

    _this = _super.call(this, maybeLength);

    if (!(0, _primitives.isDict)(params)) {
      return _possibleConstructorReturn(_this, str);
    }

    var predictor = _this.predictor = params.get("Predictor") || 1;

    if (predictor <= 1) {
      return _possibleConstructorReturn(_this, str);
    }

    if (predictor !== 2 && (predictor < 10 || predictor > 15)) {
      throw new _util.FormatError("Unsupported predictor: ".concat(predictor));
    }

    if (predictor === 2) {
      _this.readBlock = _this.readBlockTiff;
    } else {
      _this.readBlock = _this.readBlockPng;
    }

    _this.str = str;
    _this.dict = str.dict;
    var colors = _this.colors = params.get("Colors") || 1;
    var bits = _this.bits = params.get("BPC", "BitsPerComponent") || 8;
    var columns = _this.columns = params.get("Columns") || 1;
    _this.pixBytes = colors * bits + 7 >> 3;
    _this.rowBytes = columns * colors * bits + 7 >> 3;
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(PredictorStream, [{
    key: "readBlockTiff",
    value: function readBlockTiff() {
      var rowBytes = this.rowBytes;
      var bufferLength = this.bufferLength;
      var buffer = this.ensureBuffer(bufferLength + rowBytes);
      var bits = this.bits;
      var colors = this.colors;
      var rawBytes = this.str.getBytes(rowBytes);
      this.eof = !rawBytes.length;

      if (this.eof) {
        return;
      }

      var inbuf = 0,
          outbuf = 0;
      var inbits = 0,
          outbits = 0;
      var pos = bufferLength;
      var i;

      if (bits === 1 && colors === 1) {
        for (i = 0; i < rowBytes; ++i) {
          var c = rawBytes[i] ^ inbuf;
          c ^= c >> 1;
          c ^= c >> 2;
          c ^= c >> 4;
          inbuf = (c & 1) << 7;
          buffer[pos++] = c;
        }
      } else if (bits === 8) {
        for (i = 0; i < colors; ++i) {
          buffer[pos++] = rawBytes[i];
        }

        for (; i < rowBytes; ++i) {
          buffer[pos] = buffer[pos - colors] + rawBytes[i];
          pos++;
        }
      } else if (bits === 16) {
        var bytesPerPixel = colors * 2;

        for (i = 0; i < bytesPerPixel; ++i) {
          buffer[pos++] = rawBytes[i];
        }

        for (; i < rowBytes; i += 2) {
          var sum = ((rawBytes[i] & 0xff) << 8) + (rawBytes[i + 1] & 0xff) + ((buffer[pos - bytesPerPixel] & 0xff) << 8) + (buffer[pos - bytesPerPixel + 1] & 0xff);
          buffer[pos++] = sum >> 8 & 0xff;
          buffer[pos++] = sum & 0xff;
        }
      } else {
        var compArray = new Uint8Array(colors + 1);
        var bitMask = (1 << bits) - 1;
        var j = 0,
            k = bufferLength;
        var columns = this.columns;

        for (i = 0; i < columns; ++i) {
          for (var kk = 0; kk < colors; ++kk) {
            if (inbits < bits) {
              inbuf = inbuf << 8 | rawBytes[j++] & 0xff;
              inbits += 8;
            }

            compArray[kk] = compArray[kk] + (inbuf >> inbits - bits) & bitMask;
            inbits -= bits;
            outbuf = outbuf << bits | compArray[kk];
            outbits += bits;

            if (outbits >= 8) {
              buffer[k++] = outbuf >> outbits - 8 & 0xff;
              outbits -= 8;
            }
          }
        }

        if (outbits > 0) {
          buffer[k++] = (outbuf << 8 - outbits) + (inbuf & (1 << 8 - outbits) - 1);
        }
      }

      this.bufferLength += rowBytes;
    }
  }, {
    key: "readBlockPng",
    value: function readBlockPng() {
      var rowBytes = this.rowBytes;
      var pixBytes = this.pixBytes;
      var predictor = this.str.getByte();
      var rawBytes = this.str.getBytes(rowBytes);
      this.eof = !rawBytes.length;

      if (this.eof) {
        return;
      }

      var bufferLength = this.bufferLength;
      var buffer = this.ensureBuffer(bufferLength + rowBytes);
      var prevRow = buffer.subarray(bufferLength - rowBytes, bufferLength);

      if (prevRow.length === 0) {
        prevRow = new Uint8Array(rowBytes);
      }

      var i,
          j = bufferLength,
          up,
          c;

      switch (predictor) {
        case 0:
          for (i = 0; i < rowBytes; ++i) {
            buffer[j++] = rawBytes[i];
          }

          break;

        case 1:
          for (i = 0; i < pixBytes; ++i) {
            buffer[j++] = rawBytes[i];
          }

          for (; i < rowBytes; ++i) {
            buffer[j] = buffer[j - pixBytes] + rawBytes[i] & 0xff;
            j++;
          }

          break;

        case 2:
          for (i = 0; i < rowBytes; ++i) {
            buffer[j++] = prevRow[i] + rawBytes[i] & 0xff;
          }

          break;

        case 3:
          for (i = 0; i < pixBytes; ++i) {
            buffer[j++] = (prevRow[i] >> 1) + rawBytes[i];
          }

          for (; i < rowBytes; ++i) {
            buffer[j] = (prevRow[i] + buffer[j - pixBytes] >> 1) + rawBytes[i] & 0xff;
            j++;
          }

          break;

        case 4:
          for (i = 0; i < pixBytes; ++i) {
            up = prevRow[i];
            c = rawBytes[i];
            buffer[j++] = up + c;
          }

          for (; i < rowBytes; ++i) {
            up = prevRow[i];
            var upLeft = prevRow[i - pixBytes];
            var left = buffer[j - pixBytes];
            var p = left + up - upLeft;
            var pa = p - left;

            if (pa < 0) {
              pa = -pa;
            }

            var pb = p - up;

            if (pb < 0) {
              pb = -pb;
            }

            var pc = p - upLeft;

            if (pc < 0) {
              pc = -pc;
            }

            c = rawBytes[i];

            if (pa <= pb && pa <= pc) {
              buffer[j++] = left + c;
            } else if (pb <= pc) {
              buffer[j++] = up + c;
            } else {
              buffer[j++] = upLeft + c;
            }
          }

          break;

        default:
          throw new _util.FormatError("Unsupported predictor: ".concat(predictor));
      }

      this.bufferLength += rowBytes;
    }
  }]);

  return PredictorStream;
}(_decode_stream.DecodeStream);

exports.PredictorStream = PredictorStream;