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
exports.CCITTFaxStream = void 0;

var _primitives = require("./primitives.js");

var _ccitt = require("./ccitt.js");

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

var CCITTFaxStream = /*#__PURE__*/function (_DecodeStream) {
  _inherits(CCITTFaxStream, _DecodeStream);

  var _super = _createSuper(CCITTFaxStream);

  function CCITTFaxStream(str, maybeLength, params) {
    var _this;

    _classCallCheck(this, CCITTFaxStream);

    _this = _super.call(this, maybeLength);
    _this.str = str;
    _this.dict = str.dict;

    if (!(0, _primitives.isDict)(params)) {
      params = _primitives.Dict.empty;
    }

    var source = {
      next: function next() {
        return str.getByte();
      }
    };
    _this.ccittFaxDecoder = new _ccitt.CCITTFaxDecoder(source, {
      K: params.get("K"),
      EndOfLine: params.get("EndOfLine"),
      EncodedByteAlign: params.get("EncodedByteAlign"),
      Columns: params.get("Columns"),
      Rows: params.get("Rows"),
      EndOfBlock: params.get("EndOfBlock"),
      BlackIs1: params.get("BlackIs1")
    });
    return _this;
  }

  _createClass(CCITTFaxStream, [{
    key: "readBlock",
    value: function readBlock() {
      while (!this.eof) {
        var c = this.ccittFaxDecoder.readNextChar();

        if (c === -1) {
          this.eof = true;
          return;
        }

        this.ensureBuffer(this.bufferLength + 1);
        this.buffer[this.bufferLength++] = c;
      }
    }
  }]);

  return CCITTFaxStream;
}(_decode_stream.DecodeStream);

exports.CCITTFaxStream = CCITTFaxStream;