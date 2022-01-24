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
exports.Ascii85Stream = void 0;

var _decode_stream = require("./decode_stream.js");

var _core_utils = require("./core_utils.js");

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

var Ascii85Stream = /*#__PURE__*/function (_DecodeStream) {
  _inherits(Ascii85Stream, _DecodeStream);

  var _super = _createSuper(Ascii85Stream);

  function Ascii85Stream(str, maybeLength) {
    var _this;

    _classCallCheck(this, Ascii85Stream);

    if (maybeLength) {
      maybeLength *= 0.8;
    }

    _this = _super.call(this, maybeLength);
    _this.str = str;
    _this.dict = str.dict;
    _this.input = new Uint8Array(5);
    return _this;
  }

  _createClass(Ascii85Stream, [{
    key: "readBlock",
    value: function readBlock() {
      var TILDA_CHAR = 0x7e;
      var Z_LOWER_CHAR = 0x7a;
      var EOF = -1;
      var str = this.str;
      var c = str.getByte();

      while ((0, _core_utils.isWhiteSpace)(c)) {
        c = str.getByte();
      }

      if (c === EOF || c === TILDA_CHAR) {
        this.eof = true;
        return;
      }

      var bufferLength = this.bufferLength;
      var buffer, i;

      if (c === Z_LOWER_CHAR) {
        buffer = this.ensureBuffer(bufferLength + 4);

        for (i = 0; i < 4; ++i) {
          buffer[bufferLength + i] = 0;
        }

        this.bufferLength += 4;
      } else {
        var input = this.input;
        input[0] = c;

        for (i = 1; i < 5; ++i) {
          c = str.getByte();

          while ((0, _core_utils.isWhiteSpace)(c)) {
            c = str.getByte();
          }

          input[i] = c;

          if (c === EOF || c === TILDA_CHAR) {
            break;
          }
        }

        buffer = this.ensureBuffer(bufferLength + i - 1);
        this.bufferLength += i - 1;

        if (i < 5) {
          for (; i < 5; ++i) {
            input[i] = 0x21 + 84;
          }

          this.eof = true;
        }

        var t = 0;

        for (i = 0; i < 5; ++i) {
          t = t * 85 + (input[i] - 0x21);
        }

        for (i = 3; i >= 0; --i) {
          buffer[bufferLength + i] = t & 0xff;
          t >>= 8;
        }
      }
    }
  }]);

  return Ascii85Stream;
}(_decode_stream.DecodeStream);

exports.Ascii85Stream = Ascii85Stream;