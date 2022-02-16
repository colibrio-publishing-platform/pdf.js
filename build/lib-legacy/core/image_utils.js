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
exports.LocalTilingPatternCache = exports.LocalImageCache = exports.LocalGStateCache = exports.LocalFunctionCache = exports.LocalColorSpaceCache = exports.GlobalImageCache = void 0;

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var BaseLocalCache = /*#__PURE__*/function () {
  function BaseLocalCache(options) {
    _classCallCheck(this, BaseLocalCache);

    if (this.constructor === BaseLocalCache) {
      (0, _util.unreachable)("Cannot initialize BaseLocalCache.");
    }

    this._onlyRefs = (options && options.onlyRefs) === true;

    if (!this._onlyRefs) {
      this._nameRefMap = new Map();
      this._imageMap = new Map();
    }

    this._imageCache = new _primitives.RefSetCache();
  }

  _createClass(BaseLocalCache, [{
    key: "getByName",
    value: function getByName(name) {
      if (this._onlyRefs) {
        (0, _util.unreachable)("Should not call `getByName` method.");
      }

      var ref = this._nameRefMap.get(name);

      if (ref) {
        return this.getByRef(ref);
      }

      return this._imageMap.get(name) || null;
    }
  }, {
    key: "getByRef",
    value: function getByRef(ref) {
      return this._imageCache.get(ref) || null;
    }
  }, {
    key: "set",
    value: function set(name, ref, data) {
      (0, _util.unreachable)("Abstract method `set` called.");
    }
  }]);

  return BaseLocalCache;
}();

var LocalImageCache = /*#__PURE__*/function (_BaseLocalCache) {
  _inherits(LocalImageCache, _BaseLocalCache);

  var _super = _createSuper(LocalImageCache);

  function LocalImageCache() {
    _classCallCheck(this, LocalImageCache);

    return _super.apply(this, arguments);
  }

  _createClass(LocalImageCache, [{
    key: "set",
    value: function set(name) {
      var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = arguments.length > 2 ? arguments[2] : undefined;

      if (typeof name !== "string") {
        throw new Error('LocalImageCache.set - expected "name" argument.');
      }

      if (ref) {
        if (this._imageCache.has(ref)) {
          return;
        }

        this._nameRefMap.set(name, ref);

        this._imageCache.put(ref, data);

        return;
      }

      if (this._imageMap.has(name)) {
        return;
      }

      this._imageMap.set(name, data);
    }
  }]);

  return LocalImageCache;
}(BaseLocalCache);

exports.LocalImageCache = LocalImageCache;

var LocalColorSpaceCache = /*#__PURE__*/function (_BaseLocalCache2) {
  _inherits(LocalColorSpaceCache, _BaseLocalCache2);

  var _super2 = _createSuper(LocalColorSpaceCache);

  function LocalColorSpaceCache() {
    _classCallCheck(this, LocalColorSpaceCache);

    return _super2.apply(this, arguments);
  }

  _createClass(LocalColorSpaceCache, [{
    key: "set",
    value: function set() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = arguments.length > 2 ? arguments[2] : undefined;

      if (typeof name !== "string" && !ref) {
        throw new Error('LocalColorSpaceCache.set - expected "name" and/or "ref" argument.');
      }

      if (ref) {
        if (this._imageCache.has(ref)) {
          return;
        }

        if (name !== null) {
          this._nameRefMap.set(name, ref);
        }

        this._imageCache.put(ref, data);

        return;
      }

      if (this._imageMap.has(name)) {
        return;
      }

      this._imageMap.set(name, data);
    }
  }]);

  return LocalColorSpaceCache;
}(BaseLocalCache);

exports.LocalColorSpaceCache = LocalColorSpaceCache;

var LocalFunctionCache = /*#__PURE__*/function (_BaseLocalCache3) {
  _inherits(LocalFunctionCache, _BaseLocalCache3);

  var _super3 = _createSuper(LocalFunctionCache);

  function LocalFunctionCache(options) {
    _classCallCheck(this, LocalFunctionCache);

    return _super3.call(this, {
      onlyRefs: true
    });
  }

  _createClass(LocalFunctionCache, [{
    key: "set",
    value: function set() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var ref = arguments.length > 1 ? arguments[1] : undefined;
      var data = arguments.length > 2 ? arguments[2] : undefined;

      if (!ref) {
        throw new Error('LocalFunctionCache.set - expected "ref" argument.');
      }

      if (this._imageCache.has(ref)) {
        return;
      }

      this._imageCache.put(ref, data);
    }
  }]);

  return LocalFunctionCache;
}(BaseLocalCache);

exports.LocalFunctionCache = LocalFunctionCache;

var LocalGStateCache = /*#__PURE__*/function (_BaseLocalCache4) {
  _inherits(LocalGStateCache, _BaseLocalCache4);

  var _super4 = _createSuper(LocalGStateCache);

  function LocalGStateCache() {
    _classCallCheck(this, LocalGStateCache);

    return _super4.apply(this, arguments);
  }

  _createClass(LocalGStateCache, [{
    key: "set",
    value: function set(name) {
      var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = arguments.length > 2 ? arguments[2] : undefined;

      if (typeof name !== "string") {
        throw new Error('LocalGStateCache.set - expected "name" argument.');
      }

      if (ref) {
        if (this._imageCache.has(ref)) {
          return;
        }

        this._nameRefMap.set(name, ref);

        this._imageCache.put(ref, data);

        return;
      }

      if (this._imageMap.has(name)) {
        return;
      }

      this._imageMap.set(name, data);
    }
  }]);

  return LocalGStateCache;
}(BaseLocalCache);

exports.LocalGStateCache = LocalGStateCache;

var LocalTilingPatternCache = /*#__PURE__*/function (_BaseLocalCache5) {
  _inherits(LocalTilingPatternCache, _BaseLocalCache5);

  var _super5 = _createSuper(LocalTilingPatternCache);

  function LocalTilingPatternCache(options) {
    _classCallCheck(this, LocalTilingPatternCache);

    return _super5.call(this, {
      onlyRefs: true
    });
  }

  _createClass(LocalTilingPatternCache, [{
    key: "set",
    value: function set() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var ref = arguments.length > 1 ? arguments[1] : undefined;
      var data = arguments.length > 2 ? arguments[2] : undefined;

      if (!ref) {
        throw new Error('LocalTilingPatternCache.set - expected "ref" argument.');
      }

      if (this._imageCache.has(ref)) {
        return;
      }

      this._imageCache.put(ref, data);
    }
  }]);

  return LocalTilingPatternCache;
}(BaseLocalCache);

exports.LocalTilingPatternCache = LocalTilingPatternCache;

var GlobalImageCache = /*#__PURE__*/function () {
  function GlobalImageCache() {
    _classCallCheck(this, GlobalImageCache);

    (0, _util.assert)(GlobalImageCache.NUM_PAGES_THRESHOLD > 1, "GlobalImageCache - invalid NUM_PAGES_THRESHOLD constant.");
    this._refCache = new _primitives.RefSetCache();
    this._imageCache = new _primitives.RefSetCache();
  }

  _createClass(GlobalImageCache, [{
    key: "_byteSize",
    get: function get() {
      var byteSize = 0;

      this._imageCache.forEach(function (imageData) {
        byteSize += imageData.byteSize;
      });

      return byteSize;
    }
  }, {
    key: "_cacheLimitReached",
    get: function get() {
      if (this._imageCache.size < GlobalImageCache.MIN_IMAGES_TO_CACHE) {
        return false;
      }

      if (this._byteSize < GlobalImageCache.MAX_BYTE_SIZE) {
        return false;
      }

      return true;
    }
  }, {
    key: "shouldCache",
    value: function shouldCache(ref, pageIndex) {
      var pageIndexSet = this._refCache.get(ref);

      var numPages = pageIndexSet ? pageIndexSet.size + (pageIndexSet.has(pageIndex) ? 0 : 1) : 1;

      if (numPages < GlobalImageCache.NUM_PAGES_THRESHOLD) {
        return false;
      }

      if (!this._imageCache.has(ref) && this._cacheLimitReached) {
        return false;
      }

      return true;
    }
  }, {
    key: "addPageIndex",
    value: function addPageIndex(ref, pageIndex) {
      var pageIndexSet = this._refCache.get(ref);

      if (!pageIndexSet) {
        pageIndexSet = new Set();

        this._refCache.put(ref, pageIndexSet);
      }

      pageIndexSet.add(pageIndex);
    }
  }, {
    key: "addByteSize",
    value: function addByteSize(ref, byteSize) {
      var imageData = this._imageCache.get(ref);

      if (!imageData) {
        return;
      }

      if (imageData.byteSize) {
        return;
      }

      imageData.byteSize = byteSize;
    }
  }, {
    key: "getData",
    value: function getData(ref, pageIndex) {
      var pageIndexSet = this._refCache.get(ref);

      if (!pageIndexSet) {
        return null;
      }

      if (pageIndexSet.size < GlobalImageCache.NUM_PAGES_THRESHOLD) {
        return null;
      }

      var imageData = this._imageCache.get(ref);

      if (!imageData) {
        return null;
      }

      pageIndexSet.add(pageIndex);
      return imageData;
    }
  }, {
    key: "setData",
    value: function setData(ref, data) {
      if (!this._refCache.has(ref)) {
        throw new Error('GlobalImageCache.setData - expected "addPageIndex" to have been called.');
      }

      if (this._imageCache.has(ref)) {
        return;
      }

      if (this._cacheLimitReached) {
        (0, _util.warn)("GlobalImageCache.setData - cache limit reached.");
        return;
      }

      this._imageCache.put(ref, data);
    }
  }, {
    key: "clear",
    value: function clear() {
      var onlyData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!onlyData) {
        this._refCache.clear();
      }

      this._imageCache.clear();
    }
  }], [{
    key: "NUM_PAGES_THRESHOLD",
    get: function get() {
      return (0, _util.shadow)(this, "NUM_PAGES_THRESHOLD", 2);
    }
  }, {
    key: "MIN_IMAGES_TO_CACHE",
    get: function get() {
      return (0, _util.shadow)(this, "MIN_IMAGES_TO_CACHE", 10);
    }
  }, {
    key: "MAX_BYTE_SIZE",
    get: function get() {
      return (0, _util.shadow)(this, "MAX_BYTE_SIZE", 40e6);
    }
  }]);

  return GlobalImageCache;
}();

exports.GlobalImageCache = GlobalImageCache;