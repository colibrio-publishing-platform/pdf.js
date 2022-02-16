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
exports.AnnotationStorage = void 0;

var _util = require("../shared/util.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var AnnotationStorage = /*#__PURE__*/function () {
  function AnnotationStorage() {
    _classCallCheck(this, AnnotationStorage);

    this._storage = new Map();
    this._timeStamp = Date.now();
    this._modified = false;
    this.onSetModified = null;
    this.onResetModified = null;
  }

  _createClass(AnnotationStorage, [{
    key: "getValue",
    value: function getValue(key, defaultValue) {
      var value = this._storage.get(key);

      if (value === undefined) {
        return defaultValue;
      }

      return Object.assign(defaultValue, value);
    }
  }, {
    key: "setValue",
    value: function setValue(key, value) {
      var obj = this._storage.get(key);

      var modified = false;

      if (obj !== undefined) {
        for (var _i = 0, _Object$entries = Object.entries(value); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              entry = _Object$entries$_i[0],
              val = _Object$entries$_i[1];

          if (obj[entry] !== val) {
            modified = true;
            obj[entry] = val;
          }
        }
      } else {
        modified = true;

        this._storage.set(key, value);
      }

      if (modified) {
        this._timeStamp = Date.now();

        this._setModified();
      }
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this._storage.size > 0 ? (0, _util.objectFromMap)(this._storage) : null;
    }
  }, {
    key: "size",
    get: function get() {
      return this._storage.size;
    }
  }, {
    key: "_setModified",
    value: function _setModified() {
      if (!this._modified) {
        this._modified = true;

        if (typeof this.onSetModified === "function") {
          this.onSetModified();
        }
      }
    }
  }, {
    key: "resetModified",
    value: function resetModified() {
      if (this._modified) {
        this._modified = false;

        if (typeof this.onResetModified === "function") {
          this.onResetModified();
        }
      }
    }
  }, {
    key: "serializable",
    get: function get() {
      return this._storage.size > 0 ? this._storage : null;
    }
  }, {
    key: "lastModified",
    get: function get() {
      return this._timeStamp.toString();
    }
  }]);

  return AnnotationStorage;
}();

exports.AnnotationStorage = AnnotationStorage;