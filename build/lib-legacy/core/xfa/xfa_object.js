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
exports.XmlObject = exports.XFAObjectArray = exports.XFAObject = exports.XFAAttribute = exports.StringObject = exports.OptionObject = exports.Option10 = exports.Option01 = exports.IntegerObject = exports.ContentObject = exports.$uid = exports.$toStyle = exports.$toString = exports.$toPages = exports.$toHTML = exports.$text = exports.$tabIndex = exports.$setValue = exports.$setSetAttributes = exports.$setId = exports.$searchNode = exports.$root = exports.$resolvePrototypes = exports.$removeChild = exports.$pushPara = exports.$pushGlyphs = exports.$popPara = exports.$onText = exports.$onChildCheck = exports.$onChild = exports.$nsAttributes = exports.$nodeName = exports.$namespaceId = exports.$isUsable = exports.$isTransparent = exports.$isThereMoreWidth = exports.$isSplittable = exports.$isNsAgnostic = exports.$isDescendent = exports.$isDataValue = exports.$isCDATAXml = exports.$isBindable = exports.$insertAt = exports.$indexOf = exports.$ids = exports.$hasSettableValue = exports.$globalData = exports.$getTemplateRoot = exports.$getSubformParent = exports.$getRealChildrenByNameIt = exports.$getParent = exports.$getNextPage = exports.$getExtra = exports.$getDataValue = exports.$getContainedChildren = exports.$getChildrenByNameIt = exports.$getChildrenByName = exports.$getChildrenByClass = exports.$getChildren = exports.$getAvailableSpace = exports.$getAttributes = exports.$getAttributeIt = exports.$flushHTML = exports.$finalize = exports.$extra = exports.$dump = exports.$data = exports.$content = exports.$consumed = exports.$clone = exports.$cleanup = exports.$cleanPage = exports.$clean = exports.$childrenToHTML = exports.$appendChild = exports.$addHTML = exports.$acceptWhitespace = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _utils = require("./utils.js");

var _util = require("../../shared/util.js");

var _core_utils = require("../core_utils.js");

var _namespaces = require("./namespaces.js");

var _som = require("./som.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var $acceptWhitespace = Symbol();
exports.$acceptWhitespace = $acceptWhitespace;
var $addHTML = Symbol();
exports.$addHTML = $addHTML;
var $appendChild = Symbol();
exports.$appendChild = $appendChild;
var $childrenToHTML = Symbol();
exports.$childrenToHTML = $childrenToHTML;
var $clean = Symbol();
exports.$clean = $clean;
var $cleanPage = Symbol();
exports.$cleanPage = $cleanPage;
var $cleanup = Symbol();
exports.$cleanup = $cleanup;
var $clone = Symbol();
exports.$clone = $clone;
var $consumed = Symbol();
exports.$consumed = $consumed;
var $content = Symbol("content");
exports.$content = $content;
var $data = Symbol("data");
exports.$data = $data;
var $dump = Symbol();
exports.$dump = $dump;
var $extra = Symbol("extra");
exports.$extra = $extra;
var $finalize = Symbol();
exports.$finalize = $finalize;
var $flushHTML = Symbol();
exports.$flushHTML = $flushHTML;
var $getAttributeIt = Symbol();
exports.$getAttributeIt = $getAttributeIt;
var $getAttributes = Symbol();
exports.$getAttributes = $getAttributes;
var $getAvailableSpace = Symbol();
exports.$getAvailableSpace = $getAvailableSpace;
var $getChildrenByClass = Symbol();
exports.$getChildrenByClass = $getChildrenByClass;
var $getChildrenByName = Symbol();
exports.$getChildrenByName = $getChildrenByName;
var $getChildrenByNameIt = Symbol();
exports.$getChildrenByNameIt = $getChildrenByNameIt;
var $getDataValue = Symbol();
exports.$getDataValue = $getDataValue;
var $getExtra = Symbol();
exports.$getExtra = $getExtra;
var $getRealChildrenByNameIt = Symbol();
exports.$getRealChildrenByNameIt = $getRealChildrenByNameIt;
var $getChildren = Symbol();
exports.$getChildren = $getChildren;
var $getContainedChildren = Symbol();
exports.$getContainedChildren = $getContainedChildren;
var $getNextPage = Symbol();
exports.$getNextPage = $getNextPage;
var $getSubformParent = Symbol();
exports.$getSubformParent = $getSubformParent;
var $getParent = Symbol();
exports.$getParent = $getParent;
var $getTemplateRoot = Symbol();
exports.$getTemplateRoot = $getTemplateRoot;
var $globalData = Symbol();
exports.$globalData = $globalData;
var $hasSettableValue = Symbol();
exports.$hasSettableValue = $hasSettableValue;
var $ids = Symbol();
exports.$ids = $ids;
var $indexOf = Symbol();
exports.$indexOf = $indexOf;
var $insertAt = Symbol();
exports.$insertAt = $insertAt;
var $isCDATAXml = Symbol();
exports.$isCDATAXml = $isCDATAXml;
var $isBindable = Symbol();
exports.$isBindable = $isBindable;
var $isDataValue = Symbol();
exports.$isDataValue = $isDataValue;
var $isDescendent = Symbol();
exports.$isDescendent = $isDescendent;
var $isNsAgnostic = Symbol();
exports.$isNsAgnostic = $isNsAgnostic;
var $isSplittable = Symbol();
exports.$isSplittable = $isSplittable;
var $isThereMoreWidth = Symbol();
exports.$isThereMoreWidth = $isThereMoreWidth;
var $isTransparent = Symbol();
exports.$isTransparent = $isTransparent;
var $isUsable = Symbol();
exports.$isUsable = $isUsable;
var $lastAttribute = Symbol();
var $namespaceId = Symbol("namespaceId");
exports.$namespaceId = $namespaceId;
var $nodeName = Symbol("nodeName");
exports.$nodeName = $nodeName;
var $nsAttributes = Symbol();
exports.$nsAttributes = $nsAttributes;
var $onChild = Symbol();
exports.$onChild = $onChild;
var $onChildCheck = Symbol();
exports.$onChildCheck = $onChildCheck;
var $onText = Symbol();
exports.$onText = $onText;
var $pushGlyphs = Symbol();
exports.$pushGlyphs = $pushGlyphs;
var $popPara = Symbol();
exports.$popPara = $popPara;
var $pushPara = Symbol();
exports.$pushPara = $pushPara;
var $removeChild = Symbol();
exports.$removeChild = $removeChild;
var $root = Symbol("root");
exports.$root = $root;
var $resolvePrototypes = Symbol();
exports.$resolvePrototypes = $resolvePrototypes;
var $searchNode = Symbol();
exports.$searchNode = $searchNode;
var $setId = Symbol();
exports.$setId = $setId;
var $setSetAttributes = Symbol();
exports.$setSetAttributes = $setSetAttributes;
var $setValue = Symbol();
exports.$setValue = $setValue;
var $tabIndex = Symbol();
exports.$tabIndex = $tabIndex;
var $text = Symbol();
exports.$text = $text;
var $toPages = Symbol();
exports.$toPages = $toPages;
var $toHTML = Symbol();
exports.$toHTML = $toHTML;
var $toString = Symbol();
exports.$toString = $toString;
var $toStyle = Symbol();
exports.$toStyle = $toStyle;
var $uid = Symbol("uid");
exports.$uid = $uid;

var _applyPrototype = Symbol();

var _attributes = Symbol();

var _attributeNames = Symbol();

var _children = Symbol("_children");

var _cloneAttribute = Symbol();

var _dataValue = Symbol();

var _defaultValue = Symbol();

var _filteredChildrenGenerator = Symbol();

var _getPrototype = Symbol();

var _getUnsetAttributes = Symbol();

var _hasChildren = Symbol();

var _max = Symbol();

var _options = Symbol();

var _parent = Symbol("parent");

var _resolvePrototypesHelper = Symbol();

var _setAttributes = Symbol();

var _validator = Symbol();

var uid = 0;
var NS_DATASETS = _namespaces.NamespaceIds.datasets.id;

var XFAObject = /*#__PURE__*/function () {
  function XFAObject(nsId, name) {
    var hasChildren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, XFAObject);

    this[$namespaceId] = nsId;
    this[$nodeName] = name;
    this[_hasChildren] = hasChildren;
    this[_parent] = null;
    this[_children] = [];
    this[$uid] = "".concat(name).concat(uid++);
    this[$globalData] = null;
  }

  _createClass(XFAObject, [{
    key: $onChild,
    value: function value(child) {
      if (!this[_hasChildren] || !this[$onChildCheck](child)) {
        return false;
      }

      var name = child[$nodeName];
      var node = this[name];

      if (node instanceof XFAObjectArray) {
        if (node.push(child)) {
          this[$appendChild](child);
          return true;
        }
      } else {
        if (node !== null) {
          this[$removeChild](node);
        }

        this[name] = child;
        this[$appendChild](child);
        return true;
      }

      var id = "";

      if (this.id) {
        id = " (id: ".concat(this.id, ")");
      } else if (this.name) {
        id = " (name: ".concat(this.name, " ").concat(this.h.value, ")");
      }

      (0, _util.warn)("XFA - node \"".concat(this[$nodeName], "\"").concat(id, " has already enough \"").concat(name, "\"!"));
      return false;
    }
  }, {
    key: $onChildCheck,
    value: function value(child) {
      return this.hasOwnProperty(child[$nodeName]) && child[$namespaceId] === this[$namespaceId];
    }
  }, {
    key: $isNsAgnostic,
    value: function value() {
      return false;
    }
  }, {
    key: $acceptWhitespace,
    value: function value() {
      return false;
    }
  }, {
    key: $isCDATAXml,
    value: function value() {
      return false;
    }
  }, {
    key: $isBindable,
    value: function value() {
      return false;
    }
  }, {
    key: $popPara,
    value: function value() {
      if (this.para) {
        this[$getTemplateRoot]()[$extra].paraStack.pop();
      }
    }
  }, {
    key: $pushPara,
    value: function value() {
      this[$getTemplateRoot]()[$extra].paraStack.push(this.para);
    }
  }, {
    key: $setId,
    value: function value(ids) {
      if (this.id && this[$namespaceId] === _namespaces.NamespaceIds.template.id) {
        ids.set(this.id, this);
      }
    }
  }, {
    key: $getTemplateRoot,
    value: function value() {
      return this[$globalData].template;
    }
  }, {
    key: $isSplittable,
    value: function value() {
      return false;
    }
  }, {
    key: $isThereMoreWidth,
    value: function value() {
      return false;
    }
  }, {
    key: $appendChild,
    value: function value(child) {
      child[_parent] = this;

      this[_children].push(child);

      if (!child[$globalData] && this[$globalData]) {
        child[$globalData] = this[$globalData];
      }
    }
  }, {
    key: $removeChild,
    value: function value(child) {
      var i = this[_children].indexOf(child);

      this[_children].splice(i, 1);
    }
  }, {
    key: $hasSettableValue,
    value: function value() {
      return this.hasOwnProperty("value");
    }
  }, {
    key: $setValue,
    value: function value(_) {}
  }, {
    key: $onText,
    value: function value(_) {}
  }, {
    key: $finalize,
    value: function value() {}
  }, {
    key: $clean,
    value: function value(builder) {
      delete this[_hasChildren];

      if (this[$cleanup]) {
        builder.clean(this[$cleanup]);
        delete this[$cleanup];
      }
    }
  }, {
    key: $indexOf,
    value: function value(child) {
      return this[_children].indexOf(child);
    }
  }, {
    key: $insertAt,
    value: function value(i, child) {
      child[_parent] = this;

      this[_children].splice(i, 0, child);

      if (!child[$globalData] && this[$globalData]) {
        child[$globalData] = this[$globalData];
      }
    }
  }, {
    key: $isTransparent,
    value: function value() {
      return !this.name;
    }
  }, {
    key: $lastAttribute,
    value: function value() {
      return "";
    }
  }, {
    key: $text,
    value: function value() {
      if (this[_children].length === 0) {
        return this[$content];
      }

      return this[_children].map(function (c) {
        return c[$text]();
      }).join("");
    }
  }, {
    key: _attributeNames,
    get: function get() {
      var proto = Object.getPrototypeOf(this);

      if (!proto._attributes) {
        var attributes = proto._attributes = new Set();

        var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var name = _step.value;

            if (this[name] === null || this[name] instanceof XFAObject || this[name] instanceof XFAObjectArray) {
              break;
            }

            attributes.add(name);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return (0, _util.shadow)(this, _attributeNames, proto._attributes);
    }
  }, {
    key: $isDescendent,
    value: function value(parent) {
      var node = this;

      while (node) {
        if (node === parent) {
          return true;
        }

        node = node[$getParent]();
      }

      return false;
    }
  }, {
    key: $getParent,
    value: function value() {
      return this[_parent];
    }
  }, {
    key: $getSubformParent,
    value: function value() {
      return this[$getParent]();
    }
  }, {
    key: $getChildren,
    value: function value() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!name) {
        return this[_children];
      }

      return this[name];
    }
  }, {
    key: $dump,
    value: function value() {
      var dumped = Object.create(null);

      if (this[$content]) {
        dumped.$content = this[$content];
      }

      var _iterator2 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var name = _step2.value;
          var value = this[name];

          if (value === null) {
            continue;
          }

          if (value instanceof XFAObject) {
            dumped[name] = value[$dump]();
          } else if (value instanceof XFAObjectArray) {
            if (!value.isEmpty()) {
              dumped[name] = value.dump();
            }
          } else {
            dumped[name] = value;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return dumped;
    }
  }, {
    key: $toStyle,
    value: function value() {
      return null;
    }
  }, {
    key: $toHTML,
    value: function value() {
      return _utils.HTMLResult.EMPTY;
    }
  }, {
    key: $getContainedChildren,
    value: /*#__PURE__*/_regenerator["default"].mark(function value() {
      var _iterator3, _step3, node;

      return _regenerator["default"].wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator3 = _createForOfIteratorHelper(this[$getChildren]());
              _context.prev = 1;

              _iterator3.s();

            case 3:
              if ((_step3 = _iterator3.n()).done) {
                _context.next = 9;
                break;
              }

              node = _step3.value;
              _context.next = 7;
              return node;

            case 7:
              _context.next = 3;
              break;

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

              _iterator3.e(_context.t0);

            case 14:
              _context.prev = 14;

              _iterator3.f();

              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, value, this, [[1, 11, 14, 17]]);
    })
  }, {
    key: _filteredChildrenGenerator,
    value: /*#__PURE__*/_regenerator["default"].mark(function value(filter, include) {
      var _iterator4, _step4, node, availableSpace, res;

      return _regenerator["default"].wrap(function value$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iterator4 = _createForOfIteratorHelper(this[$getContainedChildren]());
              _context2.prev = 1;

              _iterator4.s();

            case 3:
              if ((_step4 = _iterator4.n()).done) {
                _context2.next = 13;
                break;
              }

              node = _step4.value;

              if (!(!filter || include === filter.has(node[$nodeName]))) {
                _context2.next = 11;
                break;
              }

              availableSpace = this[$getAvailableSpace]();
              res = node[$toHTML](availableSpace);

              if (!res.success) {
                this[$extra].failingNode = node;
              }

              _context2.next = 11;
              return res;

            case 11:
              _context2.next = 3;
              break;

            case 13:
              _context2.next = 18;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](1);

              _iterator4.e(_context2.t0);

            case 18:
              _context2.prev = 18;

              _iterator4.f();

              return _context2.finish(18);

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, value, this, [[1, 15, 18, 21]]);
    })
  }, {
    key: $flushHTML,
    value: function value() {
      return null;
    }
  }, {
    key: $addHTML,
    value: function value(html, bbox) {
      this[$extra].children.push(html);
    }
  }, {
    key: $getAvailableSpace,
    value: function value() {}
  }, {
    key: $childrenToHTML,
    value: function value(_ref) {
      var _ref$filter = _ref.filter,
          filter = _ref$filter === void 0 ? null : _ref$filter,
          _ref$include = _ref.include,
          include = _ref$include === void 0 ? true : _ref$include;

      if (!this[$extra].generator) {
        this[$extra].generator = this[_filteredChildrenGenerator](filter, include);
      } else {
        var availableSpace = this[$getAvailableSpace]();
        var res = this[$extra].failingNode[$toHTML](availableSpace);

        if (!res.success) {
          return res;
        }

        if (res.html) {
          this[$addHTML](res.html, res.bbox);
        }

        delete this[$extra].failingNode;
      }

      while (true) {
        var gen = this[$extra].generator.next();

        if (gen.done) {
          break;
        }

        var _res = gen.value;

        if (!_res.success) {
          return _res;
        }

        if (_res.html) {
          this[$addHTML](_res.html, _res.bbox);
        }
      }

      this[$extra].generator = null;
      return _utils.HTMLResult.EMPTY;
    }
  }, {
    key: $setSetAttributes,
    value: function value(attributes) {
      this[_setAttributes] = new Set(Object.keys(attributes));
    }
  }, {
    key: _getUnsetAttributes,
    value: function value(protoAttributes) {
      var allAttr = this[_attributeNames];
      var setAttr = this[_setAttributes];
      return _toConsumableArray(protoAttributes).filter(function (x) {
        return allAttr.has(x) && !setAttr.has(x);
      });
    }
  }, {
    key: $resolvePrototypes,
    value: function value(ids) {
      var ancestors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();

      var _iterator5 = _createForOfIteratorHelper(this[_children]),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var child = _step5.value;

          child[_resolvePrototypesHelper](ids, ancestors);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  }, {
    key: _resolvePrototypesHelper,
    value: function value(ids, ancestors) {
      var proto = this[_getPrototype](ids, ancestors);

      if (proto) {
        this[_applyPrototype](proto, ids, ancestors);
      } else {
        this[$resolvePrototypes](ids, ancestors);
      }
    }
  }, {
    key: _getPrototype,
    value: function value(ids, ancestors) {
      var use = this.use,
          usehref = this.usehref;

      if (!use && !usehref) {
        return null;
      }

      var proto = null;
      var somExpression = null;
      var id = null;
      var ref = use;

      if (usehref) {
        ref = usehref;

        if (usehref.startsWith("#som(") && usehref.endsWith(")")) {
          somExpression = usehref.slice("#som(".length, usehref.length - 1);
        } else if (usehref.startsWith(".#som(") && usehref.endsWith(")")) {
          somExpression = usehref.slice(".#som(".length, usehref.length - 1);
        } else if (usehref.startsWith("#")) {
          id = usehref.slice(1);
        } else if (usehref.startsWith(".#")) {
          id = usehref.slice(2);
        }
      } else if (use.startsWith("#")) {
        id = use.slice(1);
      } else {
        somExpression = use;
      }

      this.use = this.usehref = "";

      if (id) {
        proto = ids.get(id);
      } else {
        proto = (0, _som.searchNode)(ids.get($root), this, somExpression, true, false);

        if (proto) {
          proto = proto[0];
        }
      }

      if (!proto) {
        (0, _util.warn)("XFA - Invalid prototype reference: ".concat(ref, "."));
        return null;
      }

      if (proto[$nodeName] !== this[$nodeName]) {
        (0, _util.warn)("XFA - Incompatible prototype: ".concat(proto[$nodeName], " !== ").concat(this[$nodeName], "."));
        return null;
      }

      if (ancestors.has(proto)) {
        (0, _util.warn)("XFA - Cycle detected in prototypes use.");
        return null;
      }

      ancestors.add(proto);

      var protoProto = proto[_getPrototype](ids, ancestors);

      if (protoProto) {
        proto[_applyPrototype](protoProto, ids, ancestors);
      }

      proto[$resolvePrototypes](ids, ancestors);
      ancestors["delete"](proto);
      return proto;
    }
  }, {
    key: _applyPrototype,
    value: function value(proto, ids, ancestors) {
      if (ancestors.has(proto)) {
        (0, _util.warn)("XFA - Cycle detected in prototypes use.");
        return;
      }

      if (!this[$content] && proto[$content]) {
        this[$content] = proto[$content];
      }

      var newAncestors = new Set(ancestors);
      newAncestors.add(proto);

      var _iterator6 = _createForOfIteratorHelper(this[_getUnsetAttributes](proto[_setAttributes])),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var unsetAttrName = _step6.value;
          this[unsetAttrName] = proto[unsetAttrName];

          if (this[_setAttributes]) {
            this[_setAttributes].add(unsetAttrName);
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      var _iterator7 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var name = _step7.value;

          if (this[_attributeNames].has(name)) {
            continue;
          }

          var _value = this[name];
          var protoValue = proto[name];

          if (_value instanceof XFAObjectArray) {
            var _iterator8 = _createForOfIteratorHelper(_value[_children]),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var _child = _step8.value;

                _child[_resolvePrototypesHelper](ids, ancestors);
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }

            for (var i = _value[_children].length, ii = protoValue[_children].length; i < ii; i++) {
              var child = proto[_children][i][$clone]();

              if (_value.push(child)) {
                child[_parent] = this;

                this[_children].push(child);

                child[_resolvePrototypesHelper](ids, ancestors);
              } else {
                break;
              }
            }

            continue;
          }

          if (_value !== null) {
            _value[$resolvePrototypes](ids, ancestors);

            if (protoValue) {
              _value[_applyPrototype](protoValue, ids, ancestors);
            }

            continue;
          }

          if (protoValue !== null) {
            var _child2 = protoValue[$clone]();

            _child2[_parent] = this;
            this[name] = _child2;

            this[_children].push(_child2);

            _child2[_resolvePrototypesHelper](ids, ancestors);
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  }, {
    key: $clone,
    value: function value() {
      var clone = Object.create(Object.getPrototypeOf(this));

      var _iterator9 = _createForOfIteratorHelper(Object.getOwnPropertySymbols(this)),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var $symbol = _step9.value;

          try {
            clone[$symbol] = this[$symbol];
          } catch (_) {
            (0, _util.shadow)(clone, $symbol, this[$symbol]);
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      clone[$uid] = "".concat(clone[$nodeName]).concat(uid++);
      clone[_children] = [];

      var _iterator10 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var name = _step10.value;

          if (this[_attributeNames].has(name)) {
            clone[name] = XFAObject[_cloneAttribute](this[name]);
            continue;
          }

          var _value2 = this[name];

          if (_value2 instanceof XFAObjectArray) {
            clone[name] = new XFAObjectArray(_value2[_max]);
          } else {
            clone[name] = null;
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      var _iterator11 = _createForOfIteratorHelper(this[_children]),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var child = _step11.value;
          var _name = child[$nodeName];
          var clonedChild = child[$clone]();

          clone[_children].push(clonedChild);

          clonedChild[_parent] = clone;

          if (clone[_name] === null) {
            clone[_name] = clonedChild;
          } else {
            clone[_name][_children].push(clonedChild);
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      return clone;
    }
  }, {
    key: $getChildren,
    value: function value() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!name) {
        return this[_children];
      }

      return this[_children].filter(function (c) {
        return c[$nodeName] === name;
      });
    }
  }, {
    key: $getChildrenByClass,
    value: function value(name) {
      return this[name];
    }
  }, {
    key: $getChildrenByName,
    value: function value(name, allTransparent) {
      var first = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return Array.from(this[$getChildrenByNameIt](name, allTransparent, first));
    }
  }, {
    key: $getChildrenByNameIt,
    value: /*#__PURE__*/_regenerator["default"].mark(function value(name, allTransparent) {
      var first,
          _iterator12,
          _step12,
          child,
          _args3 = arguments;

      return _regenerator["default"].wrap(function value$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              first = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : true;

              if (!(name === "parent")) {
                _context3.next = 5;
                break;
              }

              _context3.next = 4;
              return this[_parent];

            case 4:
              return _context3.abrupt("return");

            case 5:
              _iterator12 = _createForOfIteratorHelper(this[_children]);
              _context3.prev = 6;

              _iterator12.s();

            case 8:
              if ((_step12 = _iterator12.n()).done) {
                _context3.next = 20;
                break;
              }

              child = _step12.value;

              if (!(child[$nodeName] === name)) {
                _context3.next = 13;
                break;
              }

              _context3.next = 13;
              return child;

            case 13:
              if (!(child.name === name)) {
                _context3.next = 16;
                break;
              }

              _context3.next = 16;
              return child;

            case 16:
              if (!(allTransparent || child[$isTransparent]())) {
                _context3.next = 18;
                break;
              }

              return _context3.delegateYield(child[$getChildrenByNameIt](name, allTransparent, false), "t0", 18);

            case 18:
              _context3.next = 8;
              break;

            case 20:
              _context3.next = 25;
              break;

            case 22:
              _context3.prev = 22;
              _context3.t1 = _context3["catch"](6);

              _iterator12.e(_context3.t1);

            case 25:
              _context3.prev = 25;

              _iterator12.f();

              return _context3.finish(25);

            case 28:
              if (!(first && this[_attributeNames].has(name))) {
                _context3.next = 31;
                break;
              }

              _context3.next = 31;
              return new XFAAttribute(this, name, this[name]);

            case 31:
            case "end":
              return _context3.stop();
          }
        }
      }, value, this, [[6, 22, 25, 28]]);
    })
  }], [{
    key: _cloneAttribute,
    value: function value(obj) {
      if (Array.isArray(obj)) {
        return obj.map(function (x) {
          return XFAObject[_cloneAttribute](x);
        });
      }

      if (_typeof(obj) === "object" && obj !== null) {
        return Object.assign({}, obj);
      }

      return obj;
    }
  }]);

  return XFAObject;
}();

exports.XFAObject = XFAObject;

var XFAObjectArray = /*#__PURE__*/function () {
  function XFAObjectArray() {
    var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;

    _classCallCheck(this, XFAObjectArray);

    this[_max] = max;
    this[_children] = [];
  }

  _createClass(XFAObjectArray, [{
    key: "push",
    value: function push(child) {
      var len = this[_children].length;

      if (len <= this[_max]) {
        this[_children].push(child);

        return true;
      }

      (0, _util.warn)("XFA - node \"".concat(child[$nodeName], "\" accepts no more than ").concat(this[_max], " children"));
      return false;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this[_children].length === 0;
    }
  }, {
    key: "dump",
    value: function dump() {
      return this[_children].length === 1 ? this[_children][0][$dump]() : this[_children].map(function (x) {
        return x[$dump]();
      });
    }
  }, {
    key: $clone,
    value: function value() {
      var clone = new XFAObjectArray(this[_max]);
      clone[_children] = this[_children].map(function (c) {
        return c[$clone]();
      });
      return clone;
    }
  }, {
    key: "children",
    get: function get() {
      return this[_children];
    }
  }, {
    key: "clear",
    value: function clear() {
      this[_children].length = 0;
    }
  }]);

  return XFAObjectArray;
}();

exports.XFAObjectArray = XFAObjectArray;

var XFAAttribute = /*#__PURE__*/function () {
  function XFAAttribute(node, name, value) {
    _classCallCheck(this, XFAAttribute);

    this[_parent] = node;
    this[$nodeName] = name;
    this[$content] = value;
    this[$consumed] = false;
    this[$uid] = "attribute".concat(uid++);
  }

  _createClass(XFAAttribute, [{
    key: $getParent,
    value: function value() {
      return this[_parent];
    }
  }, {
    key: $isDataValue,
    value: function value() {
      return true;
    }
  }, {
    key: $getDataValue,
    value: function value() {
      return this[$content].trim();
    }
  }, {
    key: $setValue,
    value: function (_value3) {
      function value(_x) {
        return _value3.apply(this, arguments);
      }

      value.toString = function () {
        return _value3.toString();
      };

      return value;
    }(function (value) {
      value = value.value || "";
      this[$content] = value.toString();
    })
  }, {
    key: $text,
    value: function value() {
      return this[$content];
    }
  }, {
    key: $isDescendent,
    value: function value(parent) {
      return this[_parent] === parent || this[_parent][$isDescendent](parent);
    }
  }]);

  return XFAAttribute;
}();

exports.XFAAttribute = XFAAttribute;

var XmlObject = /*#__PURE__*/function (_XFAObject) {
  _inherits(XmlObject, _XFAObject);

  var _super = _createSuper(XmlObject);

  function XmlObject(nsId, name) {
    var _this;

    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, XmlObject);

    _this = _super.call(this, nsId, name);
    _this[$content] = "";
    _this[_dataValue] = null;

    if (name !== "#text") {
      var map = new Map();
      _this[_attributes] = map;

      for (var _i = 0, _Object$entries = Object.entries(attributes); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            attrName = _Object$entries$_i[0],
            _value4 = _Object$entries$_i[1];

        map.set(attrName, new XFAAttribute(_assertThisInitialized(_this), attrName, _value4));
      }

      if (attributes.hasOwnProperty($nsAttributes)) {
        var dataNode = attributes[$nsAttributes].xfa.dataNode;

        if (dataNode !== undefined) {
          if (dataNode === "dataGroup") {
            _this[_dataValue] = false;
          } else if (dataNode === "dataValue") {
            _this[_dataValue] = true;
          }
        }
      }
    }

    _this[$consumed] = false;
    return _this;
  }

  _createClass(XmlObject, [{
    key: $toString,
    value: function value(buf) {
      var tagName = this[$nodeName];

      if (tagName === "#text") {
        buf.push((0, _core_utils.encodeToXmlString)(this[$content]));
        return;
      }

      var utf8TagName = (0, _util.utf8StringToString)(tagName);
      var prefix = this[$namespaceId] === NS_DATASETS ? "xfa:" : "";
      buf.push("<".concat(prefix).concat(utf8TagName));

      var _iterator13 = _createForOfIteratorHelper(this[_attributes].entries()),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var _step13$value = _slicedToArray(_step13.value, 2),
              name = _step13$value[0],
              _value5 = _step13$value[1];

          var utf8Name = (0, _util.utf8StringToString)(name);
          buf.push(" ".concat(utf8Name, "=\"").concat((0, _core_utils.encodeToXmlString)(_value5[$content]), "\""));
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }

      if (this[_dataValue] !== null) {
        if (this[_dataValue]) {
          buf.push(" xfa:dataNode=\"dataValue\"");
        } else {
          buf.push(" xfa:dataNode=\"dataGroup\"");
        }
      }

      if (!this[$content] && this[_children].length === 0) {
        buf.push("/>");
        return;
      }

      buf.push(">");

      if (this[$content]) {
        if (typeof this[$content] === "string") {
          buf.push((0, _core_utils.encodeToXmlString)(this[$content]));
        } else {
          this[$content][$toString](buf);
        }
      } else {
        var _iterator14 = _createForOfIteratorHelper(this[_children]),
            _step14;

        try {
          for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
            var child = _step14.value;
            child[$toString](buf);
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }
      }

      buf.push("</".concat(prefix).concat(utf8TagName, ">"));
    }
  }, {
    key: $onChild,
    value: function value(child) {
      if (this[$content]) {
        var node = new XmlObject(this[$namespaceId], "#text");
        this[$appendChild](node);
        node[$content] = this[$content];
        this[$content] = "";
      }

      this[$appendChild](child);
      return true;
    }
  }, {
    key: $onText,
    value: function value(str) {
      this[$content] += str;
    }
  }, {
    key: $finalize,
    value: function value() {
      if (this[$content] && this[_children].length > 0) {
        var node = new XmlObject(this[$namespaceId], "#text");
        this[$appendChild](node);
        node[$content] = this[$content];
        delete this[$content];
      }
    }
  }, {
    key: $toHTML,
    value: function value() {
      if (this[$nodeName] === "#text") {
        return _utils.HTMLResult.success({
          name: "#text",
          value: this[$content]
        });
      }

      return _utils.HTMLResult.EMPTY;
    }
  }, {
    key: $getChildren,
    value: function value() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!name) {
        return this[_children];
      }

      return this[_children].filter(function (c) {
        return c[$nodeName] === name;
      });
    }
  }, {
    key: $getAttributes,
    value: function value() {
      return this[_attributes];
    }
  }, {
    key: $getChildrenByClass,
    value: function value(name) {
      var value = this[_attributes].get(name);

      if (value !== undefined) {
        return value;
      }

      return this[$getChildren](name);
    }
  }, {
    key: $getChildrenByNameIt,
    value: /*#__PURE__*/_regenerator["default"].mark(function value(name, allTransparent) {
      var value, _iterator15, _step15, child;

      return _regenerator["default"].wrap(function value$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              value = this[_attributes].get(name);

              if (!value) {
                _context4.next = 4;
                break;
              }

              _context4.next = 4;
              return value;

            case 4:
              _iterator15 = _createForOfIteratorHelper(this[_children]);
              _context4.prev = 5;

              _iterator15.s();

            case 7:
              if ((_step15 = _iterator15.n()).done) {
                _context4.next = 16;
                break;
              }

              child = _step15.value;

              if (!(child[$nodeName] === name)) {
                _context4.next = 12;
                break;
              }

              _context4.next = 12;
              return child;

            case 12:
              if (!allTransparent) {
                _context4.next = 14;
                break;
              }

              return _context4.delegateYield(child[$getChildrenByNameIt](name, allTransparent), "t0", 14);

            case 14:
              _context4.next = 7;
              break;

            case 16:
              _context4.next = 21;
              break;

            case 18:
              _context4.prev = 18;
              _context4.t1 = _context4["catch"](5);

              _iterator15.e(_context4.t1);

            case 21:
              _context4.prev = 21;

              _iterator15.f();

              return _context4.finish(21);

            case 24:
            case "end":
              return _context4.stop();
          }
        }
      }, value, this, [[5, 18, 21, 24]]);
    })
  }, {
    key: $getAttributeIt,
    value: /*#__PURE__*/_regenerator["default"].mark(function value(name, skipConsumed) {
      var value, _iterator16, _step16, child;

      return _regenerator["default"].wrap(function value$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              value = this[_attributes].get(name);

              if (!(value && (!skipConsumed || !value[$consumed]))) {
                _context5.next = 4;
                break;
              }

              _context5.next = 4;
              return value;

            case 4:
              _iterator16 = _createForOfIteratorHelper(this[_children]);
              _context5.prev = 5;

              _iterator16.s();

            case 7:
              if ((_step16 = _iterator16.n()).done) {
                _context5.next = 12;
                break;
              }

              child = _step16.value;
              return _context5.delegateYield(child[$getAttributeIt](name, skipConsumed), "t0", 10);

            case 10:
              _context5.next = 7;
              break;

            case 12:
              _context5.next = 17;
              break;

            case 14:
              _context5.prev = 14;
              _context5.t1 = _context5["catch"](5);

              _iterator16.e(_context5.t1);

            case 17:
              _context5.prev = 17;

              _iterator16.f();

              return _context5.finish(17);

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      }, value, this, [[5, 14, 17, 20]]);
    })
  }, {
    key: $getRealChildrenByNameIt,
    value: /*#__PURE__*/_regenerator["default"].mark(function value(name, allTransparent, skipConsumed) {
      var _iterator17, _step17, child;

      return _regenerator["default"].wrap(function value$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _iterator17 = _createForOfIteratorHelper(this[_children]);
              _context6.prev = 1;

              _iterator17.s();

            case 3:
              if ((_step17 = _iterator17.n()).done) {
                _context6.next = 12;
                break;
              }

              child = _step17.value;

              if (!(child[$nodeName] === name && (!skipConsumed || !child[$consumed]))) {
                _context6.next = 8;
                break;
              }

              _context6.next = 8;
              return child;

            case 8:
              if (!allTransparent) {
                _context6.next = 10;
                break;
              }

              return _context6.delegateYield(child[$getRealChildrenByNameIt](name, allTransparent, skipConsumed), "t0", 10);

            case 10:
              _context6.next = 3;
              break;

            case 12:
              _context6.next = 17;
              break;

            case 14:
              _context6.prev = 14;
              _context6.t1 = _context6["catch"](1);

              _iterator17.e(_context6.t1);

            case 17:
              _context6.prev = 17;

              _iterator17.f();

              return _context6.finish(17);

            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, value, this, [[1, 14, 17, 20]]);
    })
  }, {
    key: $isDataValue,
    value: function value() {
      if (this[_dataValue] === null) {
        return this[_children].length === 0 || this[_children][0][$namespaceId] === _namespaces.NamespaceIds.xhtml.id;
      }

      return this[_dataValue];
    }
  }, {
    key: $getDataValue,
    value: function value() {
      if (this[_dataValue] === null) {
        if (this[_children].length === 0) {
          return this[$content].trim();
        }

        if (this[_children][0][$namespaceId] === _namespaces.NamespaceIds.xhtml.id) {
          return this[_children][0][$text]().trim();
        }

        return null;
      }

      return this[$content].trim();
    }
  }, {
    key: $setValue,
    value: function (_value6) {
      function value(_x2) {
        return _value6.apply(this, arguments);
      }

      value.toString = function () {
        return _value6.toString();
      };

      return value;
    }(function (value) {
      value = value.value || "";
      this[$content] = value.toString();
    })
  }, {
    key: $dump,
    value: function value() {
      var hasNS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var dumped = Object.create(null);

      if (hasNS) {
        dumped.$ns = this[$namespaceId];
      }

      if (this[$content]) {
        dumped.$content = this[$content];
      }

      dumped.$name = this[$nodeName];
      dumped.children = [];

      var _iterator18 = _createForOfIteratorHelper(this[_children]),
          _step18;

      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var child = _step18.value;
          dumped.children.push(child[$dump](hasNS));
        }
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }

      dumped.attributes = Object.create(null);

      var _iterator19 = _createForOfIteratorHelper(this[_attributes]),
          _step19;

      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var _step19$value = _slicedToArray(_step19.value, 2),
              name = _step19$value[0],
              _value7 = _step19$value[1];

          dumped.attributes[name] = _value7[$content];
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }

      return dumped;
    }
  }]);

  return XmlObject;
}(XFAObject);

exports.XmlObject = XmlObject;

var ContentObject = /*#__PURE__*/function (_XFAObject2) {
  _inherits(ContentObject, _XFAObject2);

  var _super2 = _createSuper(ContentObject);

  function ContentObject(nsId, name) {
    var _this2;

    _classCallCheck(this, ContentObject);

    _this2 = _super2.call(this, nsId, name);
    _this2[$content] = "";
    return _this2;
  }

  _createClass(ContentObject, [{
    key: $onText,
    value: function value(text) {
      this[$content] += text;
    }
  }, {
    key: $finalize,
    value: function value() {}
  }]);

  return ContentObject;
}(XFAObject);

exports.ContentObject = ContentObject;

var OptionObject = /*#__PURE__*/function (_ContentObject) {
  _inherits(OptionObject, _ContentObject);

  var _super3 = _createSuper(OptionObject);

  function OptionObject(nsId, name, options) {
    var _this3;

    _classCallCheck(this, OptionObject);

    _this3 = _super3.call(this, nsId, name);
    _this3[_options] = options;
    return _this3;
  }

  _createClass(OptionObject, [{
    key: $finalize,
    value: function value() {
      var _this4 = this;

      this[$content] = (0, _utils.getKeyword)({
        data: this[$content],
        defaultValue: this[_options][0],
        validate: function validate(k) {
          return _this4[_options].includes(k);
        }
      });
    }
  }, {
    key: $clean,
    value: function value(builder) {
      _get(_getPrototypeOf(OptionObject.prototype), $clean, this).call(this, builder);

      delete this[_options];
    }
  }]);

  return OptionObject;
}(ContentObject);

exports.OptionObject = OptionObject;

var StringObject = /*#__PURE__*/function (_ContentObject2) {
  _inherits(StringObject, _ContentObject2);

  var _super4 = _createSuper(StringObject);

  function StringObject() {
    _classCallCheck(this, StringObject);

    return _super4.apply(this, arguments);
  }

  _createClass(StringObject, [{
    key: $finalize,
    value: function value() {
      this[$content] = this[$content].trim();
    }
  }]);

  return StringObject;
}(ContentObject);

exports.StringObject = StringObject;

var IntegerObject = /*#__PURE__*/function (_ContentObject3) {
  _inherits(IntegerObject, _ContentObject3);

  var _super5 = _createSuper(IntegerObject);

  function IntegerObject(nsId, name, defaultValue, validator) {
    var _this5;

    _classCallCheck(this, IntegerObject);

    _this5 = _super5.call(this, nsId, name);
    _this5[_defaultValue] = defaultValue;
    _this5[_validator] = validator;
    return _this5;
  }

  _createClass(IntegerObject, [{
    key: $finalize,
    value: function value() {
      this[$content] = (0, _utils.getInteger)({
        data: this[$content],
        defaultValue: this[_defaultValue],
        validate: this[_validator]
      });
    }
  }, {
    key: $clean,
    value: function value(builder) {
      _get(_getPrototypeOf(IntegerObject.prototype), $clean, this).call(this, builder);

      delete this[_defaultValue];
      delete this[_validator];
    }
  }]);

  return IntegerObject;
}(ContentObject);

exports.IntegerObject = IntegerObject;

var Option01 = /*#__PURE__*/function (_IntegerObject) {
  _inherits(Option01, _IntegerObject);

  var _super6 = _createSuper(Option01);

  function Option01(nsId, name) {
    _classCallCheck(this, Option01);

    return _super6.call(this, nsId, name, 0, function (n) {
      return n === 1;
    });
  }

  return _createClass(Option01);
}(IntegerObject);

exports.Option01 = Option01;

var Option10 = /*#__PURE__*/function (_IntegerObject2) {
  _inherits(Option10, _IntegerObject2);

  var _super7 = _createSuper(Option10);

  function Option10(nsId, name) {
    _classCallCheck(this, Option10);

    return _super7.call(this, nsId, name, 1, function (n) {
      return n === 0;
    });
  }

  return _createClass(Option10);
}(IntegerObject);

exports.Option10 = Option10;