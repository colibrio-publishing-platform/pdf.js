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
exports.ToUnicodeMap = exports.IdentityToUnicodeMap = void 0;

var _util = require("../shared/util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ToUnicodeMap = /*#__PURE__*/function () {
  function ToUnicodeMap() {
    var cmap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, ToUnicodeMap);

    this._map = cmap;
  }

  _createClass(ToUnicodeMap, [{
    key: "length",
    get: function get() {
      return this._map.length;
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      for (var charCode in this._map) {
        callback(charCode, this._map[charCode].charCodeAt(0));
      }
    }
  }, {
    key: "has",
    value: function has(i) {
      return this._map[i] !== undefined;
    }
  }, {
    key: "get",
    value: function get(i) {
      return this._map[i];
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
    key: "amend",
    value: function amend(map) {
      for (var charCode in map) {
        this._map[charCode] = map[charCode];
      }
    }
  }]);

  return ToUnicodeMap;
}();

exports.ToUnicodeMap = ToUnicodeMap;

var IdentityToUnicodeMap = /*#__PURE__*/function () {
  function IdentityToUnicodeMap(firstChar, lastChar) {
    _classCallCheck(this, IdentityToUnicodeMap);

    this.firstChar = firstChar;
    this.lastChar = lastChar;
  }

  _createClass(IdentityToUnicodeMap, [{
    key: "length",
    get: function get() {
      return this.lastChar + 1 - this.firstChar;
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      for (var i = this.firstChar, ii = this.lastChar; i <= ii; i++) {
        callback(i, i);
      }
    }
  }, {
    key: "has",
    value: function has(i) {
      return this.firstChar <= i && i <= this.lastChar;
    }
  }, {
    key: "get",
    value: function get(i) {
      if (this.firstChar <= i && i <= this.lastChar) {
        return String.fromCharCode(i);
      }

      return undefined;
    }
  }, {
    key: "charCodeOf",
    value: function charCodeOf(v) {
      return Number.isInteger(v) && v >= this.firstChar && v <= this.lastChar ? v : -1;
    }
  }, {
    key: "amend",
    value: function amend(map) {
      (0, _util.unreachable)("Should not call amend()");
    }
  }]);

  return IdentityToUnicodeMap;
}();

exports.IdentityToUnicodeMap = IdentityToUnicodeMap;