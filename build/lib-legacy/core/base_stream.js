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
exports.BaseStream = void 0;

var _util = require("../shared/util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var BaseStream = /*#__PURE__*/function () {
  function BaseStream() {
    _classCallCheck(this, BaseStream);

    if (this.constructor === BaseStream) {
      (0, _util.unreachable)("Cannot initialize BaseStream.");
    }
  }

  _createClass(BaseStream, [{
    key: "length",
    get: function get() {
      (0, _util.unreachable)("Abstract getter `length` accessed");
    }
  }, {
    key: "isEmpty",
    get: function get() {
      (0, _util.unreachable)("Abstract getter `isEmpty` accessed");
    }
  }, {
    key: "isDataLoaded",
    get: function get() {
      return (0, _util.shadow)(this, "isDataLoaded", true);
    }
  }, {
    key: "getByte",
    value: function getByte() {
      (0, _util.unreachable)("Abstract method `getByte` called");
    }
  }, {
    key: "getBytes",
    value: function getBytes(length) {
      var forceClamped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      (0, _util.unreachable)("Abstract method `getBytes` called");
    }
  }, {
    key: "peekByte",
    value: function peekByte() {
      var peekedByte = this.getByte();

      if (peekedByte !== -1) {
        this.pos--;
      }

      return peekedByte;
    }
  }, {
    key: "peekBytes",
    value: function peekBytes(length) {
      var forceClamped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var bytes = this.getBytes(length, forceClamped);
      this.pos -= bytes.length;
      return bytes;
    }
  }, {
    key: "getUint16",
    value: function getUint16() {
      var b0 = this.getByte();
      var b1 = this.getByte();

      if (b0 === -1 || b1 === -1) {
        return -1;
      }

      return (b0 << 8) + b1;
    }
  }, {
    key: "getInt32",
    value: function getInt32() {
      var b0 = this.getByte();
      var b1 = this.getByte();
      var b2 = this.getByte();
      var b3 = this.getByte();
      return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
    }
  }, {
    key: "getByteRange",
    value: function getByteRange(begin, end) {
      (0, _util.unreachable)("Abstract method `getByteRange` called");
    }
  }, {
    key: "getString",
    value: function getString(length) {
      return (0, _util.bytesToString)(this.getBytes(length, false));
    }
  }, {
    key: "skip",
    value: function skip(n) {
      this.pos += n || 1;
    }
  }, {
    key: "reset",
    value: function reset() {
      (0, _util.unreachable)("Abstract method `reset` called");
    }
  }, {
    key: "moveStart",
    value: function moveStart() {
      (0, _util.unreachable)("Abstract method `moveStart` called");
    }
  }, {
    key: "makeSubStream",
    value: function makeSubStream(start, length) {
      var dict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      (0, _util.unreachable)("Abstract method `makeSubStream` called");
    }
  }, {
    key: "getBaseStreams",
    value: function getBaseStreams() {
      return null;
    }
  }]);

  return BaseStream;
}();

exports.BaseStream = BaseStream;