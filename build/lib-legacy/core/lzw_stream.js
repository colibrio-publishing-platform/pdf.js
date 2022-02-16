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
exports.LZWStream = void 0;

var _decode_stream = require("./decode_stream.js");

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

var LZWStream = /*#__PURE__*/function (_DecodeStream) {
  _inherits(LZWStream, _DecodeStream);

  var _super = _createSuper(LZWStream);

  function LZWStream(str, maybeLength, earlyChange) {
    var _this;

    _classCallCheck(this, LZWStream);

    _this = _super.call(this, maybeLength);
    _this.str = str;
    _this.dict = str.dict;
    _this.cachedData = 0;
    _this.bitsCached = 0;
    var maxLzwDictionarySize = 4096;
    var lzwState = {
      earlyChange: earlyChange,
      codeLength: 9,
      nextCode: 258,
      dictionaryValues: new Uint8Array(maxLzwDictionarySize),
      dictionaryLengths: new Uint16Array(maxLzwDictionarySize),
      dictionaryPrevCodes: new Uint16Array(maxLzwDictionarySize),
      currentSequence: new Uint8Array(maxLzwDictionarySize),
      currentSequenceLength: 0
    };

    for (var i = 0; i < 256; ++i) {
      lzwState.dictionaryValues[i] = i;
      lzwState.dictionaryLengths[i] = 1;
    }

    _this.lzwState = lzwState;
    return _this;
  }

  _createClass(LZWStream, [{
    key: "readBits",
    value: function readBits(n) {
      var bitsCached = this.bitsCached;
      var cachedData = this.cachedData;

      while (bitsCached < n) {
        var c = this.str.getByte();

        if (c === -1) {
          this.eof = true;
          return null;
        }

        cachedData = cachedData << 8 | c;
        bitsCached += 8;
      }

      this.bitsCached = bitsCached -= n;
      this.cachedData = cachedData;
      this.lastCode = null;
      return cachedData >>> bitsCached & (1 << n) - 1;
    }
  }, {
    key: "readBlock",
    value: function readBlock() {
      var blockSize = 512,
          decodedSizeDelta = blockSize;
      var estimatedDecodedSize = blockSize * 2;
      var i, j, q;
      var lzwState = this.lzwState;

      if (!lzwState) {
        return;
      }

      var earlyChange = lzwState.earlyChange;
      var nextCode = lzwState.nextCode;
      var dictionaryValues = lzwState.dictionaryValues;
      var dictionaryLengths = lzwState.dictionaryLengths;
      var dictionaryPrevCodes = lzwState.dictionaryPrevCodes;
      var codeLength = lzwState.codeLength;
      var prevCode = lzwState.prevCode;
      var currentSequence = lzwState.currentSequence;
      var currentSequenceLength = lzwState.currentSequenceLength;
      var decodedLength = 0;
      var currentBufferLength = this.bufferLength;
      var buffer = this.ensureBuffer(this.bufferLength + estimatedDecodedSize);

      for (i = 0; i < blockSize; i++) {
        var code = this.readBits(codeLength);
        var hasPrev = currentSequenceLength > 0;

        if (code < 256) {
          currentSequence[0] = code;
          currentSequenceLength = 1;
        } else if (code >= 258) {
          if (code < nextCode) {
            currentSequenceLength = dictionaryLengths[code];

            for (j = currentSequenceLength - 1, q = code; j >= 0; j--) {
              currentSequence[j] = dictionaryValues[q];
              q = dictionaryPrevCodes[q];
            }
          } else {
            currentSequence[currentSequenceLength++] = currentSequence[0];
          }
        } else if (code === 256) {
          codeLength = 9;
          nextCode = 258;
          currentSequenceLength = 0;
          continue;
        } else {
          this.eof = true;
          delete this.lzwState;
          break;
        }

        if (hasPrev) {
          dictionaryPrevCodes[nextCode] = prevCode;
          dictionaryLengths[nextCode] = dictionaryLengths[prevCode] + 1;
          dictionaryValues[nextCode] = currentSequence[0];
          nextCode++;
          codeLength = nextCode + earlyChange & nextCode + earlyChange - 1 ? codeLength : Math.min(Math.log(nextCode + earlyChange) / 0.6931471805599453 + 1, 12) | 0;
        }

        prevCode = code;
        decodedLength += currentSequenceLength;

        if (estimatedDecodedSize < decodedLength) {
          do {
            estimatedDecodedSize += decodedSizeDelta;
          } while (estimatedDecodedSize < decodedLength);

          buffer = this.ensureBuffer(this.bufferLength + estimatedDecodedSize);
        }

        for (j = 0; j < currentSequenceLength; j++) {
          buffer[currentBufferLength++] = currentSequence[j];
        }
      }

      lzwState.nextCode = nextCode;
      lzwState.codeLength = codeLength;
      lzwState.prevCode = prevCode;
      lzwState.currentSequenceLength = currentSequenceLength;
      this.bufferLength = currentBufferLength;
    }
  }]);

  return LZWStream;
}(_decode_stream.DecodeStream);

exports.LZWStream = LZWStream;