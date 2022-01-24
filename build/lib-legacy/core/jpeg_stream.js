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
exports.JpegStream = void 0;

var _decode_stream = require("./decode_stream.js");

var _primitives = require("./primitives.js");

var _jpg = require("./jpg.js");

var _util = require("../shared/util.js");

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

var JpegStream = /*#__PURE__*/function (_DecodeStream) {
  _inherits(JpegStream, _DecodeStream);

  var _super = _createSuper(JpegStream);

  function JpegStream(stream, maybeLength, params) {
    var _this;

    _classCallCheck(this, JpegStream);

    var ch;

    while ((ch = stream.getByte()) !== -1) {
      if (ch === 0xff) {
        stream.skip(-1);
        break;
      }
    }

    _this = _super.call(this, maybeLength);
    _this.stream = stream;
    _this.dict = stream.dict;
    _this.maybeLength = maybeLength;
    _this.params = params;
    return _this;
  }

  _createClass(JpegStream, [{
    key: "bytes",
    get: function get() {
      return (0, _util.shadow)(this, "bytes", this.stream.getBytes(this.maybeLength));
    }
  }, {
    key: "ensureBuffer",
    value: function ensureBuffer(requested) {}
  }, {
    key: "readBlock",
    value: function readBlock() {
      if (this.eof) {
        return;
      }

      var jpegOptions = {
        decodeTransform: undefined,
        colorTransform: undefined
      };
      var decodeArr = this.dict.getArray("D", "Decode");

      if (this.forceRGB && Array.isArray(decodeArr)) {
        var bitsPerComponent = this.dict.get("BPC", "BitsPerComponent") || 8;
        var decodeArrLength = decodeArr.length;
        var transform = new Int32Array(decodeArrLength);
        var transformNeeded = false;
        var maxValue = (1 << bitsPerComponent) - 1;

        for (var i = 0; i < decodeArrLength; i += 2) {
          transform[i] = (decodeArr[i + 1] - decodeArr[i]) * 256 | 0;
          transform[i + 1] = decodeArr[i] * maxValue | 0;

          if (transform[i] !== 256 || transform[i + 1] !== 0) {
            transformNeeded = true;
          }
        }

        if (transformNeeded) {
          jpegOptions.decodeTransform = transform;
        }
      }

      if ((0, _primitives.isDict)(this.params)) {
        var colorTransform = this.params.get("ColorTransform");

        if (Number.isInteger(colorTransform)) {
          jpegOptions.colorTransform = colorTransform;
        }
      }

      var jpegImage = new _jpg.JpegImage(jpegOptions);
      jpegImage.parse(this.bytes);
      var data = jpegImage.getData({
        width: this.drawWidth,
        height: this.drawHeight,
        forceRGB: this.forceRGB,
        isSourcePDF: true
      });
      this.buffer = data;
      this.bufferLength = data.length;
      this.eof = true;
    }
  }]);

  return JpegStream;
}(_decode_stream.DecodeStream);

exports.JpegStream = JpegStream;