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
exports.StringStream = exports.Stream = exports.NullStream = void 0;

var _base_stream = require("./base_stream.js");

var _util = require("../shared/util.js");

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

var Stream = /*#__PURE__*/function (_BaseStream) {
  _inherits(Stream, _BaseStream);

  var _super = _createSuper(Stream);

  function Stream(arrayBuffer, start, length, dict) {
    var _this;

    _classCallCheck(this, Stream);

    _this = _super.call(this);
    _this.bytes = arrayBuffer instanceof Uint8Array ? arrayBuffer : new Uint8Array(arrayBuffer);
    _this.start = start || 0;
    _this.pos = _this.start;
    _this.end = start + length || _this.bytes.length;
    _this.dict = dict;
    return _this;
  }

  _createClass(Stream, [{
    key: "length",
    get: function get() {
      return this.end - this.start;
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return this.length === 0;
    }
  }, {
    key: "getByte",
    value: function getByte() {
      if (this.pos >= this.end) {
        return -1;
      }

      return this.bytes[this.pos++];
    }
  }, {
    key: "getBytes",
    value: function getBytes(length) {
      var forceClamped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var bytes = this.bytes;
      var pos = this.pos;
      var strEnd = this.end;

      if (!length) {
        var _subarray = bytes.subarray(pos, strEnd);

        return forceClamped ? new Uint8ClampedArray(_subarray) : _subarray;
      }

      var end = pos + length;

      if (end > strEnd) {
        end = strEnd;
      }

      this.pos = end;
      var subarray = bytes.subarray(pos, end);
      return forceClamped ? new Uint8ClampedArray(subarray) : subarray;
    }
  }, {
    key: "getByteRange",
    value: function getByteRange(begin, end) {
      if (begin < 0) {
        begin = 0;
      }

      if (end > this.end) {
        end = this.end;
      }

      return this.bytes.subarray(begin, end);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pos = this.start;
    }
  }, {
    key: "moveStart",
    value: function moveStart() {
      this.start = this.pos;
    }
  }, {
    key: "makeSubStream",
    value: function makeSubStream(start, length) {
      var dict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return new Stream(this.bytes.buffer, start, length, dict);
    }
  }]);

  return Stream;
}(_base_stream.BaseStream);

exports.Stream = Stream;

var StringStream = /*#__PURE__*/function (_Stream) {
  _inherits(StringStream, _Stream);

  var _super2 = _createSuper(StringStream);

  function StringStream(str) {
    _classCallCheck(this, StringStream);

    return _super2.call(this, (0, _util.stringToBytes)(str));
  }

  return _createClass(StringStream);
}(Stream);

exports.StringStream = StringStream;

var NullStream = /*#__PURE__*/function (_Stream2) {
  _inherits(NullStream, _Stream2);

  var _super3 = _createSuper(NullStream);

  function NullStream() {
    _classCallCheck(this, NullStream);

    return _super3.call(this, new Uint8Array(0));
  }

  return _createClass(NullStream);
}(Stream);

exports.NullStream = NullStream;