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
exports.StreamsSequenceStream = exports.DecodeStream = void 0;

var _base_stream = require("./base_stream.js");

var _stream = require("./stream.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var emptyBuffer = new Uint8Array(0);

var DecodeStream = /*#__PURE__*/function (_BaseStream) {
  _inherits(DecodeStream, _BaseStream);

  var _super = _createSuper(DecodeStream);

  function DecodeStream(maybeMinBufferLength) {
    var _this;

    _classCallCheck(this, DecodeStream);

    _this = _super.call(this);
    _this._rawMinBufferLength = maybeMinBufferLength || 0;
    _this.pos = 0;
    _this.bufferLength = 0;
    _this.eof = false;
    _this.buffer = emptyBuffer;
    _this.minBufferLength = 512;

    if (maybeMinBufferLength) {
      while (_this.minBufferLength < maybeMinBufferLength) {
        _this.minBufferLength *= 2;
      }
    }

    return _this;
  }

  _createClass(DecodeStream, [{
    key: "isEmpty",
    get: function get() {
      while (!this.eof && this.bufferLength === 0) {
        this.readBlock();
      }

      return this.bufferLength === 0;
    }
  }, {
    key: "ensureBuffer",
    value: function ensureBuffer(requested) {
      var buffer = this.buffer;

      if (requested <= buffer.byteLength) {
        return buffer;
      }

      var size = this.minBufferLength;

      while (size < requested) {
        size *= 2;
      }

      var buffer2 = new Uint8Array(size);
      buffer2.set(buffer);
      return this.buffer = buffer2;
    }
  }, {
    key: "getByte",
    value: function getByte() {
      var pos = this.pos;

      while (this.bufferLength <= pos) {
        if (this.eof) {
          return -1;
        }

        this.readBlock();
      }

      return this.buffer[this.pos++];
    }
  }, {
    key: "getBytes",
    value: function getBytes(length) {
      var forceClamped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var pos = this.pos;
      var end;

      if (length) {
        this.ensureBuffer(pos + length);
        end = pos + length;

        while (!this.eof && this.bufferLength < end) {
          this.readBlock();
        }

        var bufEnd = this.bufferLength;

        if (end > bufEnd) {
          end = bufEnd;
        }
      } else {
        while (!this.eof) {
          this.readBlock();
        }

        end = this.bufferLength;
      }

      this.pos = end;
      var subarray = this.buffer.subarray(pos, end);
      return forceClamped && !(subarray instanceof Uint8ClampedArray) ? new Uint8ClampedArray(subarray) : subarray;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pos = 0;
    }
  }, {
    key: "makeSubStream",
    value: function makeSubStream(start, length) {
      var dict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (length === undefined) {
        while (!this.eof) {
          this.readBlock();
        }
      } else {
        var end = start + length;

        while (this.bufferLength <= end && !this.eof) {
          this.readBlock();
        }
      }

      return new _stream.Stream(this.buffer, start, length, dict);
    }
  }, {
    key: "getBaseStreams",
    value: function getBaseStreams() {
      return this.str ? this.str.getBaseStreams() : null;
    }
  }]);

  return DecodeStream;
}(_base_stream.BaseStream);

exports.DecodeStream = DecodeStream;

var StreamsSequenceStream = /*#__PURE__*/function (_DecodeStream) {
  _inherits(StreamsSequenceStream, _DecodeStream);

  var _super2 = _createSuper(StreamsSequenceStream);

  function StreamsSequenceStream(streams) {
    var _this2;

    var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, StreamsSequenceStream);

    var maybeLength = 0;

    var _iterator = _createForOfIteratorHelper(streams),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var stream = _step.value;
        maybeLength += stream instanceof DecodeStream ? stream._rawMinBufferLength : stream.length;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    _this2 = _super2.call(this, maybeLength);
    _this2.streams = streams;
    _this2._onError = onError;
    return _this2;
  }

  _createClass(StreamsSequenceStream, [{
    key: "readBlock",
    value: function readBlock() {
      var streams = this.streams;

      if (streams.length === 0) {
        this.eof = true;
        return;
      }

      var stream = streams.shift();
      var chunk;

      try {
        chunk = stream.getBytes();
      } catch (reason) {
        if (this._onError) {
          this._onError(reason, stream.dict && stream.dict.objId);

          return;
        }

        throw reason;
      }

      var bufferLength = this.bufferLength;
      var newLength = bufferLength + chunk.length;
      var buffer = this.ensureBuffer(newLength);
      buffer.set(chunk, bufferLength);
      this.bufferLength = newLength;
    }
  }, {
    key: "getBaseStreams",
    value: function getBaseStreams() {
      var baseStreamsBuf = [];

      var _iterator2 = _createForOfIteratorHelper(this.streams),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var stream = _step2.value;
          var baseStreams = stream.getBaseStreams();

          if (baseStreams) {
            baseStreamsBuf.push.apply(baseStreamsBuf, _toConsumableArray(baseStreams));
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return baseStreamsBuf.length > 0 ? baseStreamsBuf : null;
    }
  }]);

  return StreamsSequenceStream;
}(DecodeStream);

exports.StreamsSequenceStream = StreamsSequenceStream;