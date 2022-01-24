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
exports.NumberTree = exports.NameTree = void 0;

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NameOrNumberTree = /*#__PURE__*/function () {
  function NameOrNumberTree(root, xref, type) {
    _classCallCheck(this, NameOrNumberTree);

    if (this.constructor === NameOrNumberTree) {
      (0, _util.unreachable)("Cannot initialize NameOrNumberTree.");
    }

    this.root = root;
    this.xref = xref;
    this._type = type;
  }

  _createClass(NameOrNumberTree, [{
    key: "getAll",
    value: function getAll() {
      var map = new Map();

      if (!this.root) {
        return map;
      }

      var xref = this.xref;
      var processed = new _primitives.RefSet();
      processed.put(this.root);
      var queue = [this.root];

      while (queue.length > 0) {
        var obj = xref.fetchIfRef(queue.shift());

        if (!(0, _primitives.isDict)(obj)) {
          continue;
        }

        if (obj.has("Kids")) {
          var kids = obj.get("Kids");

          for (var i = 0, ii = kids.length; i < ii; i++) {
            var kid = kids[i];

            if (processed.has(kid)) {
              throw new _util.FormatError("Duplicate entry in \"".concat(this._type, "\" tree."));
            }

            queue.push(kid);
            processed.put(kid);
          }

          continue;
        }

        var entries = obj.get(this._type);

        if (!Array.isArray(entries)) {
          continue;
        }

        for (var _i = 0, _ii = entries.length; _i < _ii; _i += 2) {
          map.set(xref.fetchIfRef(entries[_i]), xref.fetchIfRef(entries[_i + 1]));
        }
      }

      return map;
    }
  }, {
    key: "get",
    value: function get(key) {
      if (!this.root) {
        return null;
      }

      var xref = this.xref;
      var kidsOrEntries = xref.fetchIfRef(this.root);
      var loopCount = 0;
      var MAX_LEVELS = 10;

      while (kidsOrEntries.has("Kids")) {
        if (++loopCount > MAX_LEVELS) {
          (0, _util.warn)("Search depth limit reached for \"".concat(this._type, "\" tree."));
          return null;
        }

        var kids = kidsOrEntries.get("Kids");

        if (!Array.isArray(kids)) {
          return null;
        }

        var l = 0,
            r = kids.length - 1;

        while (l <= r) {
          var m = l + r >> 1;
          var kid = xref.fetchIfRef(kids[m]);
          var limits = kid.get("Limits");

          if (key < xref.fetchIfRef(limits[0])) {
            r = m - 1;
          } else if (key > xref.fetchIfRef(limits[1])) {
            l = m + 1;
          } else {
            kidsOrEntries = xref.fetchIfRef(kids[m]);
            break;
          }
        }

        if (l > r) {
          return null;
        }
      }

      var entries = kidsOrEntries.get(this._type);

      if (Array.isArray(entries)) {
        var _l = 0,
            _r = entries.length - 2;

        while (_l <= _r) {
          var tmp = _l + _r >> 1,
              _m = tmp + (tmp & 1);

          var currentKey = xref.fetchIfRef(entries[_m]);

          if (key < currentKey) {
            _r = _m - 2;
          } else if (key > currentKey) {
            _l = _m + 2;
          } else {
            return xref.fetchIfRef(entries[_m + 1]);
          }
        }
      }

      return null;
    }
  }]);

  return NameOrNumberTree;
}();

var NameTree = /*#__PURE__*/function (_NameOrNumberTree) {
  _inherits(NameTree, _NameOrNumberTree);

  var _super = _createSuper(NameTree);

  function NameTree(root, xref) {
    _classCallCheck(this, NameTree);

    return _super.call(this, root, xref, "Names");
  }

  return NameTree;
}(NameOrNumberTree);

exports.NameTree = NameTree;

var NumberTree = /*#__PURE__*/function (_NameOrNumberTree2) {
  _inherits(NumberTree, _NameOrNumberTree2);

  var _super2 = _createSuper(NumberTree);

  function NumberTree(root, xref) {
    _classCallCheck(this, NumberTree);

    return _super2.call(this, root, xref, "Nums");
  }

  return NumberTree;
}(NameOrNumberTree);

exports.NumberTree = NumberTree;