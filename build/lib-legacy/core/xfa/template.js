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

var _regeneratorRuntime2 = require("@babel/runtime/regenerator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Value = exports.Text = exports.TemplateNamespace = exports.Template = exports.SetProperty = exports.Items = exports.Field = exports.BindItems = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _xfa_object = require("./xfa_object.js");

var _namespaces = require("./namespaces.js");

var _layout = require("./layout.js");

var _html_utils = require("./html_utils.js");

var _utils = require("./utils.js");

var _util = require("../../shared/util.js");

var _fonts = require("./fonts.js");

var _core_utils = require("../core_utils.js");

var _som = require("./som.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _marked = /*#__PURE__*/_regeneratorRuntime2.mark(getContainedChildren);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var TEMPLATE_NS_ID = _namespaces.NamespaceIds.template.id;
var SVG_NS = "http://www.w3.org/2000/svg";
var MAX_ATTEMPTS_FOR_LRTB_LAYOUT = 2;
var MAX_EMPTY_PAGES = 3;
var DEFAULT_TAB_INDEX = 5000;
var HEADING_PATTERN = /^H(\d+)$/;
var MIMES = new Set(["image/gif", "image/jpeg", "image/jpg", "image/pjpeg", "image/png", "image/apng", "image/x-png", "image/bmp", "image/x-ms-bmp", "image/tiff", "image/tif", "application/octet-stream"]);
var IMAGES_HEADERS = [[[0x42, 0x4d], "image/bmp"], [[0xff, 0xd8, 0xff], "image/jpeg"], [[0x49, 0x49, 0x2a, 0x00], "image/tiff"], [[0x4d, 0x4d, 0x00, 0x2a], "image/tiff"], [[0x47, 0x49, 0x46, 0x38, 0x39, 0x61], "image/gif"], [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], "image/png"]];

function getBorderDims(node) {
  if (!node || !node.border) {
    return {
      w: 0,
      h: 0
    };
  }

  var borderExtra = node.border[_xfa_object.$getExtra]();

  if (!borderExtra) {
    return {
      w: 0,
      h: 0
    };
  }

  return {
    w: borderExtra.widths[0] + borderExtra.widths[2] + borderExtra.insets[0] + borderExtra.insets[2],
    h: borderExtra.widths[1] + borderExtra.widths[3] + borderExtra.insets[1] + borderExtra.insets[3]
  };
}

function hasMargin(node) {
  return node.margin && (node.margin.topInset || node.margin.rightInset || node.margin.bottomInset || node.margin.leftInset);
}

function _setValue(templateNode, value) {
  if (!templateNode.value) {
    var nodeValue = new Value({});

    templateNode[_xfa_object.$appendChild](nodeValue);

    templateNode.value = nodeValue;
  }

  templateNode.value[_xfa_object.$setValue](value);
}

function getContainedChildren(node) {
  var _iterator, _step, child;

  return _regenerator["default"].wrap(function getContainedChildren$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iterator = _createForOfIteratorHelper(node[_xfa_object.$getChildren]());
          _context.prev = 1;

          _iterator.s();

        case 3:
          if ((_step = _iterator.n()).done) {
            _context.next = 12;
            break;
          }

          child = _step.value;

          if (!(child instanceof SubformSet)) {
            _context.next = 8;
            break;
          }

          return _context.delegateYield(child[_xfa_object.$getContainedChildren](), "t0", 7);

        case 7:
          return _context.abrupt("continue", 10);

        case 8:
          _context.next = 10;
          return child;

        case 10:
          _context.next = 3;
          break;

        case 12:
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t1 = _context["catch"](1);

          _iterator.e(_context.t1);

        case 17:
          _context.prev = 17;

          _iterator.f();

          return _context.finish(17);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 14, 17, 20]]);
}

function setTabIndex(node) {
  while (node) {
    if (!node.traversal) {
      node[_xfa_object.$tabIndex] = node[_xfa_object.$getParent]()[_xfa_object.$tabIndex];
      return;
    }

    if (node[_xfa_object.$tabIndex]) {
      return;
    }

    var next = null;

    var _iterator2 = _createForOfIteratorHelper(node.traversal[_xfa_object.$getChildren]()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var child = _step2.value;

        if (child.operation === "next") {
          next = child;
          break;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    if (!next || !next.ref) {
      node[_xfa_object.$tabIndex] = node[_xfa_object.$getParent]()[_xfa_object.$tabIndex];
      return;
    }

    var root = node[_xfa_object.$getTemplateRoot]();

    node[_xfa_object.$tabIndex] = ++root[_xfa_object.$tabIndex];

    var ref = root[_xfa_object.$searchNode](next.ref, node);

    if (!ref) {
      return;
    }

    node = ref[0];
  }
}

function applyAssist(obj, attributes) {
  var assist = obj.assist;

  if (assist) {
    var assistTitle = assist[_xfa_object.$toHTML]();

    if (assistTitle) {
      attributes.title = assistTitle;
    }

    var role = assist.role;
    var match = role.match(HEADING_PATTERN);

    if (match) {
      var ariaRole = "heading";
      var ariaLevel = match[1];
      attributes.role = ariaRole;
      attributes["aria-level"] = ariaLevel;
    }
  }

  if (obj.layout === "table") {
    attributes.role = "table";
  } else if (obj.layout === "row") {
    attributes.role = "row";
  } else {
    var parent = obj[_xfa_object.$getParent]();

    if (parent.layout === "row") {
      if (parent.assist && parent.assist.role === "TH") {
        attributes.role = "columnheader";
      } else {
        attributes.role = "cell";
      }
    }
  }
}

function ariaLabel(obj) {
  if (!obj.assist) {
    return null;
  }

  var assist = obj.assist;

  if (assist.speak && assist.speak[_xfa_object.$content] !== "") {
    return assist.speak[_xfa_object.$content];
  }

  if (assist.toolTip) {
    return assist.toolTip[_xfa_object.$content];
  }

  return null;
}

function valueToHtml(value) {
  return _utils.HTMLResult.success({
    name: "div",
    attributes: {
      "class": ["xfaRich"],
      style: Object.create(null)
    },
    children: [{
      name: "span",
      attributes: {
        style: Object.create(null)
      },
      value: value
    }]
  });
}

function setFirstUnsplittable(node) {
  var root = node[_xfa_object.$getTemplateRoot]();

  if (root[_xfa_object.$extra].firstUnsplittable === null) {
    root[_xfa_object.$extra].firstUnsplittable = node;
    root[_xfa_object.$extra].noLayoutFailure = true;
  }
}

function unsetFirstUnsplittable(node) {
  var root = node[_xfa_object.$getTemplateRoot]();

  if (root[_xfa_object.$extra].firstUnsplittable === node) {
    root[_xfa_object.$extra].noLayoutFailure = false;
  }
}

function handleBreak(node) {
  if (node[_xfa_object.$extra]) {
    return false;
  }

  node[_xfa_object.$extra] = Object.create(null);

  if (node.targetType === "auto") {
    return false;
  }

  var root = node[_xfa_object.$getTemplateRoot]();

  var target = null;

  if (node.target) {
    target = root[_xfa_object.$searchNode](node.target, node[_xfa_object.$getParent]());

    if (!target) {
      return false;
    }

    target = target[0];
  }

  var _root$$extra = root[_xfa_object.$extra],
      currentPageArea = _root$$extra.currentPageArea,
      currentContentArea = _root$$extra.currentContentArea;

  if (node.targetType === "pageArea") {
    if (!(target instanceof PageArea)) {
      target = null;
    }

    if (node.startNew) {
      node[_xfa_object.$extra].target = target || currentPageArea;
      return true;
    } else if (target && target !== currentPageArea) {
      node[_xfa_object.$extra].target = target;
      return true;
    }

    return false;
  }

  if (!(target instanceof ContentArea)) {
    target = null;
  }

  var pageArea = target && target[_xfa_object.$getParent]();

  var index;
  var nextPageArea = pageArea;

  if (node.startNew) {
    if (target) {
      var contentAreas = pageArea.contentArea.children;
      var indexForCurrent = contentAreas.indexOf(currentContentArea);
      var indexForTarget = contentAreas.indexOf(target);

      if (indexForCurrent !== -1 && indexForCurrent < indexForTarget) {
        nextPageArea = null;
      }

      index = indexForTarget - 1;
    } else {
      index = currentPageArea.contentArea.children.indexOf(currentContentArea);
    }
  } else if (target && target !== currentContentArea) {
    var _contentAreas = pageArea.contentArea.children;
    index = _contentAreas.indexOf(target) - 1;
    nextPageArea = pageArea === currentPageArea ? null : pageArea;
  } else {
    return false;
  }

  node[_xfa_object.$extra].target = nextPageArea;
  node[_xfa_object.$extra].index = index;
  return true;
}

function handleOverflow(node, extraNode, space) {
  var root = node[_xfa_object.$getTemplateRoot]();

  var saved = root[_xfa_object.$extra].noLayoutFailure;
  var savedMethod = extraNode[_xfa_object.$getSubformParent];

  extraNode[_xfa_object.$getSubformParent] = function () {
    return node;
  };

  root[_xfa_object.$extra].noLayoutFailure = true;

  var res = extraNode[_xfa_object.$toHTML](space);

  node[_xfa_object.$addHTML](res.html, res.bbox);

  root[_xfa_object.$extra].noLayoutFailure = saved;
  extraNode[_xfa_object.$getSubformParent] = savedMethod;
}

var AppearanceFilter = /*#__PURE__*/function (_StringObject) {
  _inherits(AppearanceFilter, _StringObject);

  var _super = _createSuper(AppearanceFilter);

  function AppearanceFilter(attributes) {
    var _this;

    _classCallCheck(this, AppearanceFilter);

    _this = _super.call(this, TEMPLATE_NS_ID, "appearanceFilter");
    _this.id = attributes.id || "";
    _this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this.use = attributes.use || "";
    _this.usehref = attributes.usehref || "";
    return _this;
  }

  return AppearanceFilter;
}(_xfa_object.StringObject);

var Arc = /*#__PURE__*/function (_XFAObject) {
  _inherits(Arc, _XFAObject);

  var _super2 = _createSuper(Arc);

  function Arc(attributes) {
    var _this2;

    _classCallCheck(this, Arc);

    _this2 = _super2.call(this, TEMPLATE_NS_ID, "arc", true);
    _this2.circular = (0, _utils.getInteger)({
      data: attributes.circular,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this2.hand = (0, _utils.getStringOption)(attributes.hand, ["even", "left", "right"]);
    _this2.id = attributes.id || "";
    _this2.startAngle = (0, _utils.getFloat)({
      data: attributes.startAngle,
      defaultValue: 0,
      validate: function validate(x) {
        return true;
      }
    });
    _this2.sweepAngle = (0, _utils.getFloat)({
      data: attributes.sweepAngle,
      defaultValue: 360,
      validate: function validate(x) {
        return true;
      }
    });
    _this2.use = attributes.use || "";
    _this2.usehref = attributes.usehref || "";
    _this2.edge = null;
    _this2.fill = null;
    return _this2;
  }

  _createClass(Arc, [{
    key: _xfa_object.$toHTML,
    value: function value() {
      var edge = this.edge ? this.edge : new Edge({});

      var edgeStyle = edge[_xfa_object.$toStyle]();

      var style = Object.create(null);

      if (this.fill && this.fill.presence === "visible") {
        Object.assign(style, this.fill[_xfa_object.$toStyle]());
      } else {
        style.fill = "transparent";
      }

      style.strokeWidth = (0, _html_utils.measureToString)(edge.presence === "visible" ? edge.thickness : 0);
      style.stroke = edgeStyle.color;
      var arc;
      var attributes = {
        xmlns: SVG_NS,
        style: {
          width: "100%",
          height: "100%",
          overflow: "visible"
        }
      };

      if (this.sweepAngle === 360) {
        arc = {
          name: "ellipse",
          attributes: {
            xmlns: SVG_NS,
            cx: "50%",
            cy: "50%",
            rx: "50%",
            ry: "50%",
            style: style
          }
        };
      } else {
        var startAngle = this.startAngle * Math.PI / 180;
        var sweepAngle = this.sweepAngle * Math.PI / 180;
        var largeArc = this.sweepAngle > 180 ? 1 : 0;
        var x1 = 50 * (1 + Math.cos(startAngle)),
            y1 = 50 * (1 - Math.sin(startAngle)),
            x2 = 50 * (1 + Math.cos(startAngle + sweepAngle)),
            y2 = 50 * (1 - Math.sin(startAngle + sweepAngle));
        arc = {
          name: "path",
          attributes: {
            xmlns: SVG_NS,
            d: "M ".concat(x1, " ").concat(y1, " A 50 50 0 ").concat(largeArc, " 0 ").concat(x2, " ").concat(y2),
            vectorEffect: "non-scaling-stroke",
            style: style
          }
        };
        Object.assign(attributes, {
          viewBox: "0 0 100 100",
          preserveAspectRatio: "none"
        });
      }

      var svg = {
        name: "svg",
        children: [arc],
        attributes: attributes
      };

      var parent = this[_xfa_object.$getParent]()[_xfa_object.$getParent]();

      if (hasMargin(parent)) {
        return _utils.HTMLResult.success({
          name: "div",
          attributes: {
            style: {
              display: "inline",
              width: "100%",
              height: "100%"
            }
          },
          children: [svg]
        });
      }

      svg.attributes.style.position = "absolute";
      return _utils.HTMLResult.success(svg);
    }
  }]);

  return Arc;
}(_xfa_object.XFAObject);

var Area = /*#__PURE__*/function (_XFAObject2) {
  _inherits(Area, _XFAObject2);

  var _super3 = _createSuper(Area);

  function Area(attributes) {
    var _this3;

    _classCallCheck(this, Area);

    _this3 = _super3.call(this, TEMPLATE_NS_ID, "area", true);
    _this3.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: function validate(n) {
        return n >= 1 || n === -1;
      }
    });
    _this3.id = attributes.id || "";
    _this3.name = attributes.name || "";
    _this3.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this3.use = attributes.use || "";
    _this3.usehref = attributes.usehref || "";
    _this3.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    _this3.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    _this3.desc = null;
    _this3.extras = null;
    _this3.area = new _xfa_object.XFAObjectArray();
    _this3.draw = new _xfa_object.XFAObjectArray();
    _this3.exObject = new _xfa_object.XFAObjectArray();
    _this3.exclGroup = new _xfa_object.XFAObjectArray();
    _this3.field = new _xfa_object.XFAObjectArray();
    _this3.subform = new _xfa_object.XFAObjectArray();
    _this3.subformSet = new _xfa_object.XFAObjectArray();
    return _this3;
  }

  _createClass(Area, [{
    key: _xfa_object.$getContainedChildren,
    value: /*#__PURE__*/_regenerator["default"].mark(function value() {
      return _regenerator["default"].wrap(function value$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.delegateYield(getContainedChildren(this), "t0", 1);

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, value, this);
    })
  }, {
    key: _xfa_object.$isTransparent,
    value: function value() {
      return true;
    }
  }, {
    key: _xfa_object.$isBindable,
    value: function value() {
      return true;
    }
  }, {
    key: _xfa_object.$addHTML,
    value: function value(html, bbox) {
      var _bbox = _slicedToArray(bbox, 4),
          x = _bbox[0],
          y = _bbox[1],
          w = _bbox[2],
          h = _bbox[3];

      this[_xfa_object.$extra].width = Math.max(this[_xfa_object.$extra].width, x + w);
      this[_xfa_object.$extra].height = Math.max(this[_xfa_object.$extra].height, y + h);

      this[_xfa_object.$extra].children.push(html);
    }
  }, {
    key: _xfa_object.$getAvailableSpace,
    value: function value() {
      return this[_xfa_object.$extra].availableSpace;
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var style = (0, _html_utils.toStyle)(this, "position");
      var attributes = {
        style: style,
        id: this[_xfa_object.$uid],
        "class": ["xfaArea"]
      };

      if ((0, _html_utils.isPrintOnly)(this)) {
        attributes["class"].push("xfaPrintOnly");
      }

      if (this.name) {
        attributes.xfaName = this.name;
      }

      var children = [];
      this[_xfa_object.$extra] = {
        children: children,
        width: 0,
        height: 0,
        availableSpace: availableSpace
      };

      var result = this[_xfa_object.$childrenToHTML]({
        filter: new Set(["area", "draw", "field", "exclGroup", "subform", "subformSet"]),
        include: true
      });

      if (!result.success) {
        if (result.isBreak()) {
          return result;
        }

        delete this[_xfa_object.$extra];
        return _utils.HTMLResult.FAILURE;
      }

      style.width = (0, _html_utils.measureToString)(this[_xfa_object.$extra].width);
      style.height = (0, _html_utils.measureToString)(this[_xfa_object.$extra].height);
      var html = {
        name: "div",
        attributes: attributes,
        children: children
      };
      var bbox = [this.x, this.y, this[_xfa_object.$extra].width, this[_xfa_object.$extra].height];
      delete this[_xfa_object.$extra];
      return _utils.HTMLResult.success(html, bbox);
    }
  }]);

  return Area;
}(_xfa_object.XFAObject);

var Assist = /*#__PURE__*/function (_XFAObject3) {
  _inherits(Assist, _XFAObject3);

  var _super4 = _createSuper(Assist);

  function Assist(attributes) {
    var _this4;

    _classCallCheck(this, Assist);

    _this4 = _super4.call(this, TEMPLATE_NS_ID, "assist", true);
    _this4.id = attributes.id || "";
    _this4.role = attributes.role || "";
    _this4.use = attributes.use || "";
    _this4.usehref = attributes.usehref || "";
    _this4.speak = null;
    _this4.toolTip = null;
    return _this4;
  }

  _createClass(Assist, [{
    key: _xfa_object.$toHTML,
    value: function value() {
      return this.toolTip && this.toolTip[_xfa_object.$content] ? this.toolTip[_xfa_object.$content] : null;
    }
  }]);

  return Assist;
}(_xfa_object.XFAObject);

var Barcode = /*#__PURE__*/function (_XFAObject4) {
  _inherits(Barcode, _XFAObject4);

  var _super5 = _createSuper(Barcode);

  function Barcode(attributes) {
    var _this5;

    _classCallCheck(this, Barcode);

    _this5 = _super5.call(this, TEMPLATE_NS_ID, "barcode", true);
    _this5.charEncoding = (0, _utils.getKeyword)({
      data: attributes.charEncoding ? attributes.charEncoding.toLowerCase() : "",
      defaultValue: "",
      validate: function validate(k) {
        return ["utf-8", "big-five", "fontspecific", "gbk", "gb-18030", "gb-2312", "ksc-5601", "none", "shift-jis", "ucs-2", "utf-16"].includes(k) || k.match(/iso-8859-\d{2}/);
      }
    });
    _this5.checksum = (0, _utils.getStringOption)(attributes.checksum, ["none", "1mod10", "1mod10_1mod11", "2mod10", "auto"]);
    _this5.dataColumnCount = (0, _utils.getInteger)({
      data: attributes.dataColumnCount,
      defaultValue: -1,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this5.dataLength = (0, _utils.getInteger)({
      data: attributes.dataLength,
      defaultValue: -1,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this5.dataPrep = (0, _utils.getStringOption)(attributes.dataPrep, ["none", "flateCompress"]);
    _this5.dataRowCount = (0, _utils.getInteger)({
      data: attributes.dataRowCount,
      defaultValue: -1,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this5.endChar = attributes.endChar || "";
    _this5.errorCorrectionLevel = (0, _utils.getInteger)({
      data: attributes.errorCorrectionLevel,
      defaultValue: -1,
      validate: function validate(x) {
        return x >= 0 && x <= 8;
      }
    });
    _this5.id = attributes.id || "";
    _this5.moduleHeight = (0, _utils.getMeasurement)(attributes.moduleHeight, "5mm");
    _this5.moduleWidth = (0, _utils.getMeasurement)(attributes.moduleWidth, "0.25mm");
    _this5.printCheckDigit = (0, _utils.getInteger)({
      data: attributes.printCheckDigit,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this5.rowColumnRatio = (0, _utils.getRatio)(attributes.rowColumnRatio);
    _this5.startChar = attributes.startChar || "";
    _this5.textLocation = (0, _utils.getStringOption)(attributes.textLocation, ["below", "above", "aboveEmbedded", "belowEmbedded", "none"]);
    _this5.truncate = (0, _utils.getInteger)({
      data: attributes.truncate,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this5.type = (0, _utils.getStringOption)(attributes.type ? attributes.type.toLowerCase() : "", ["aztec", "codabar", "code2of5industrial", "code2of5interleaved", "code2of5matrix", "code2of5standard", "code3of9", "code3of9extended", "code11", "code49", "code93", "code128", "code128a", "code128b", "code128c", "code128sscc", "datamatrix", "ean8", "ean8add2", "ean8add5", "ean13", "ean13add2", "ean13add5", "ean13pwcd", "fim", "logmars", "maxicode", "msi", "pdf417", "pdf417macro", "plessey", "postauscust2", "postauscust3", "postausreplypaid", "postausstandard", "postukrm4scc", "postusdpbc", "postusimb", "postusstandard", "postus5zip", "qrcode", "rfid", "rss14", "rss14expanded", "rss14limited", "rss14stacked", "rss14stackedomni", "rss14truncated", "telepen", "ucc128", "ucc128random", "ucc128sscc", "upca", "upcaadd2", "upcaadd5", "upcapwcd", "upce", "upceadd2", "upceadd5", "upcean2", "upcean5", "upsmaxicode"]);
    _this5.upsMode = (0, _utils.getStringOption)(attributes.upsMode, ["usCarrier", "internationalCarrier", "secureSymbol", "standardSymbol"]);
    _this5.use = attributes.use || "";
    _this5.usehref = attributes.usehref || "";
    _this5.wideNarrowRatio = (0, _utils.getRatio)(attributes.wideNarrowRatio);
    _this5.encrypt = null;
    _this5.extras = null;
    return _this5;
  }

  return Barcode;
}(_xfa_object.XFAObject);

var Bind = /*#__PURE__*/function (_XFAObject5) {
  _inherits(Bind, _XFAObject5);

  var _super6 = _createSuper(Bind);

  function Bind(attributes) {
    var _this6;

    _classCallCheck(this, Bind);

    _this6 = _super6.call(this, TEMPLATE_NS_ID, "bind", true);
    _this6.match = (0, _utils.getStringOption)(attributes.match, ["once", "dataRef", "global", "none"]);
    _this6.ref = attributes.ref || "";
    _this6.picture = null;
    return _this6;
  }

  return Bind;
}(_xfa_object.XFAObject);

var BindItems = /*#__PURE__*/function (_XFAObject6) {
  _inherits(BindItems, _XFAObject6);

  var _super7 = _createSuper(BindItems);

  function BindItems(attributes) {
    var _this7;

    _classCallCheck(this, BindItems);

    _this7 = _super7.call(this, TEMPLATE_NS_ID, "bindItems");
    _this7.connection = attributes.connection || "";
    _this7.labelRef = attributes.labelRef || "";
    _this7.ref = attributes.ref || "";
    _this7.valueRef = attributes.valueRef || "";
    return _this7;
  }

  return BindItems;
}(_xfa_object.XFAObject);

exports.BindItems = BindItems;

var Bookend = /*#__PURE__*/function (_XFAObject7) {
  _inherits(Bookend, _XFAObject7);

  var _super8 = _createSuper(Bookend);

  function Bookend(attributes) {
    var _this8;

    _classCallCheck(this, Bookend);

    _this8 = _super8.call(this, TEMPLATE_NS_ID, "bookend");
    _this8.id = attributes.id || "";
    _this8.leader = attributes.leader || "";
    _this8.trailer = attributes.trailer || "";
    _this8.use = attributes.use || "";
    _this8.usehref = attributes.usehref || "";
    return _this8;
  }

  return Bookend;
}(_xfa_object.XFAObject);

var BooleanElement = /*#__PURE__*/function (_Option) {
  _inherits(BooleanElement, _Option);

  var _super9 = _createSuper(BooleanElement);

  function BooleanElement(attributes) {
    var _this9;

    _classCallCheck(this, BooleanElement);

    _this9 = _super9.call(this, TEMPLATE_NS_ID, "boolean");
    _this9.id = attributes.id || "";
    _this9.name = attributes.name || "";
    _this9.use = attributes.use || "";
    _this9.usehref = attributes.usehref || "";
    return _this9;
  }

  _createClass(BooleanElement, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      return valueToHtml(this[_xfa_object.$content] === 1 ? "1" : "0");
    }
  }]);

  return BooleanElement;
}(_xfa_object.Option01);

var Border = /*#__PURE__*/function (_XFAObject8) {
  _inherits(Border, _XFAObject8);

  var _super10 = _createSuper(Border);

  function Border(attributes) {
    var _this10;

    _classCallCheck(this, Border);

    _this10 = _super10.call(this, TEMPLATE_NS_ID, "border", true);
    _this10["break"] = (0, _utils.getStringOption)(attributes["break"], ["close", "open"]);
    _this10.hand = (0, _utils.getStringOption)(attributes.hand, ["even", "left", "right"]);
    _this10.id = attributes.id || "";
    _this10.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    _this10.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this10.use = attributes.use || "";
    _this10.usehref = attributes.usehref || "";
    _this10.corner = new _xfa_object.XFAObjectArray(4);
    _this10.edge = new _xfa_object.XFAObjectArray(4);
    _this10.extras = null;
    _this10.fill = null;
    _this10.margin = null;
    return _this10;
  }

  _createClass(Border, [{
    key: _xfa_object.$getExtra,
    value: function value() {
      if (!this[_xfa_object.$extra]) {
        var edges = this.edge.children.slice();

        if (edges.length < 4) {
          var defaultEdge = edges[edges.length - 1] || new Edge({});

          for (var i = edges.length; i < 4; i++) {
            edges.push(defaultEdge);
          }
        }

        var widths = edges.map(function (edge) {
          return edge.thickness;
        });
        var insets = [0, 0, 0, 0];

        if (this.margin) {
          insets[0] = this.margin.topInset;
          insets[1] = this.margin.rightInset;
          insets[2] = this.margin.bottomInset;
          insets[3] = this.margin.leftInset;
        }

        this[_xfa_object.$extra] = {
          widths: widths,
          insets: insets,
          edges: edges
        };
      }

      return this[_xfa_object.$extra];
    }
  }, {
    key: _xfa_object.$toStyle,
    value: function value() {
      var _this$$getExtra = this[_xfa_object.$getExtra](),
          edges = _this$$getExtra.edges;

      var edgeStyles = edges.map(function (node) {
        var style = node[_xfa_object.$toStyle]();

        style.color = style.color || "#000000";
        return style;
      });
      var style = Object.create(null);

      if (this.margin) {
        Object.assign(style, this.margin[_xfa_object.$toStyle]());
      }

      if (this.fill && this.fill.presence === "visible") {
        Object.assign(style, this.fill[_xfa_object.$toStyle]());
      }

      if (this.corner.children.some(function (node) {
        return node.radius !== 0;
      })) {
        var cornerStyles = this.corner.children.map(function (node) {
          return node[_xfa_object.$toStyle]();
        });

        if (cornerStyles.length === 2 || cornerStyles.length === 3) {
          var last = cornerStyles[cornerStyles.length - 1];

          for (var i = cornerStyles.length; i < 4; i++) {
            cornerStyles.push(last);
          }
        }

        style.borderRadius = cornerStyles.map(function (s) {
          return s.radius;
        }).join(" ");
      }

      switch (this.presence) {
        case "invisible":
        case "hidden":
          style.borderStyle = "";
          break;

        case "inactive":
          style.borderStyle = "none";
          break;

        default:
          style.borderStyle = edgeStyles.map(function (s) {
            return s.style;
          }).join(" ");
          break;
      }

      style.borderWidth = edgeStyles.map(function (s) {
        return s.width;
      }).join(" ");
      style.borderColor = edgeStyles.map(function (s) {
        return s.color;
      }).join(" ");
      return style;
    }
  }]);

  return Border;
}(_xfa_object.XFAObject);

var Break = /*#__PURE__*/function (_XFAObject9) {
  _inherits(Break, _XFAObject9);

  var _super11 = _createSuper(Break);

  function Break(attributes) {
    var _this11;

    _classCallCheck(this, Break);

    _this11 = _super11.call(this, TEMPLATE_NS_ID, "break", true);
    _this11.after = (0, _utils.getStringOption)(attributes.after, ["auto", "contentArea", "pageArea", "pageEven", "pageOdd"]);
    _this11.afterTarget = attributes.afterTarget || "";
    _this11.before = (0, _utils.getStringOption)(attributes.before, ["auto", "contentArea", "pageArea", "pageEven", "pageOdd"]);
    _this11.beforeTarget = attributes.beforeTarget || "";
    _this11.bookendLeader = attributes.bookendLeader || "";
    _this11.bookendTrailer = attributes.bookendTrailer || "";
    _this11.id = attributes.id || "";
    _this11.overflowLeader = attributes.overflowLeader || "";
    _this11.overflowTarget = attributes.overflowTarget || "";
    _this11.overflowTrailer = attributes.overflowTrailer || "";
    _this11.startNew = (0, _utils.getInteger)({
      data: attributes.startNew,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this11.use = attributes.use || "";
    _this11.usehref = attributes.usehref || "";
    _this11.extras = null;
    return _this11;
  }

  return Break;
}(_xfa_object.XFAObject);

var BreakAfter = /*#__PURE__*/function (_XFAObject10) {
  _inherits(BreakAfter, _XFAObject10);

  var _super12 = _createSuper(BreakAfter);

  function BreakAfter(attributes) {
    var _this12;

    _classCallCheck(this, BreakAfter);

    _this12 = _super12.call(this, TEMPLATE_NS_ID, "breakAfter", true);
    _this12.id = attributes.id || "";
    _this12.leader = attributes.leader || "";
    _this12.startNew = (0, _utils.getInteger)({
      data: attributes.startNew,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this12.target = attributes.target || "";
    _this12.targetType = (0, _utils.getStringOption)(attributes.targetType, ["auto", "contentArea", "pageArea"]);
    _this12.trailer = attributes.trailer || "";
    _this12.use = attributes.use || "";
    _this12.usehref = attributes.usehref || "";
    _this12.script = null;
    return _this12;
  }

  return BreakAfter;
}(_xfa_object.XFAObject);

var BreakBefore = /*#__PURE__*/function (_XFAObject11) {
  _inherits(BreakBefore, _XFAObject11);

  var _super13 = _createSuper(BreakBefore);

  function BreakBefore(attributes) {
    var _this13;

    _classCallCheck(this, BreakBefore);

    _this13 = _super13.call(this, TEMPLATE_NS_ID, "breakBefore", true);
    _this13.id = attributes.id || "";
    _this13.leader = attributes.leader || "";
    _this13.startNew = (0, _utils.getInteger)({
      data: attributes.startNew,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this13.target = attributes.target || "";
    _this13.targetType = (0, _utils.getStringOption)(attributes.targetType, ["auto", "contentArea", "pageArea"]);
    _this13.trailer = attributes.trailer || "";
    _this13.use = attributes.use || "";
    _this13.usehref = attributes.usehref || "";
    _this13.script = null;
    return _this13;
  }

  _createClass(BreakBefore, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      this[_xfa_object.$extra] = {};
      return _utils.HTMLResult.FAILURE;
    }
  }]);

  return BreakBefore;
}(_xfa_object.XFAObject);

var Button = /*#__PURE__*/function (_XFAObject12) {
  _inherits(Button, _XFAObject12);

  var _super14 = _createSuper(Button);

  function Button(attributes) {
    var _this14;

    _classCallCheck(this, Button);

    _this14 = _super14.call(this, TEMPLATE_NS_ID, "button", true);
    _this14.highlight = (0, _utils.getStringOption)(attributes.highlight, ["inverted", "none", "outline", "push"]);
    _this14.id = attributes.id || "";
    _this14.use = attributes.use || "";
    _this14.usehref = attributes.usehref || "";
    _this14.extras = null;
    return _this14;
  }

  _createClass(Button, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var parent = this[_xfa_object.$getParent]();

      var grandpa = parent[_xfa_object.$getParent]();

      var htmlButton = {
        name: "button",
        attributes: {
          id: this[_xfa_object.$uid],
          "class": ["xfaButton"],
          style: {}
        },
        children: []
      };

      var _iterator3 = _createForOfIteratorHelper(grandpa.event.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var event = _step3.value;

          if (event.activity !== "click" || !event.script) {
            continue;
          }

          var jsURL = (0, _core_utils.recoverJsURL)(event.script[_xfa_object.$content]);

          if (!jsURL) {
            continue;
          }

          var href = (0, _html_utils.fixURL)(jsURL.url);

          if (!href) {
            continue;
          }

          htmlButton.children.push({
            name: "a",
            attributes: {
              id: "link" + this[_xfa_object.$uid],
              href: href,
              newWindow: jsURL.newWindow,
              "class": ["xfaLink"],
              style: {}
            },
            children: []
          });
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return _utils.HTMLResult.success(htmlButton);
    }
  }]);

  return Button;
}(_xfa_object.XFAObject);

var Calculate = /*#__PURE__*/function (_XFAObject13) {
  _inherits(Calculate, _XFAObject13);

  var _super15 = _createSuper(Calculate);

  function Calculate(attributes) {
    var _this15;

    _classCallCheck(this, Calculate);

    _this15 = _super15.call(this, TEMPLATE_NS_ID, "calculate", true);
    _this15.id = attributes.id || "";
    _this15.override = (0, _utils.getStringOption)(attributes.override, ["disabled", "error", "ignore", "warning"]);
    _this15.use = attributes.use || "";
    _this15.usehref = attributes.usehref || "";
    _this15.extras = null;
    _this15.message = null;
    _this15.script = null;
    return _this15;
  }

  return Calculate;
}(_xfa_object.XFAObject);

var Caption = /*#__PURE__*/function (_XFAObject14) {
  _inherits(Caption, _XFAObject14);

  var _super16 = _createSuper(Caption);

  function Caption(attributes) {
    var _this16;

    _classCallCheck(this, Caption);

    _this16 = _super16.call(this, TEMPLATE_NS_ID, "caption", true);
    _this16.id = attributes.id || "";
    _this16.placement = (0, _utils.getStringOption)(attributes.placement, ["left", "bottom", "inline", "right", "top"]);
    _this16.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    _this16.reserve = Math.ceil((0, _utils.getMeasurement)(attributes.reserve));
    _this16.use = attributes.use || "";
    _this16.usehref = attributes.usehref || "";
    _this16.extras = null;
    _this16.font = null;
    _this16.margin = null;
    _this16.para = null;
    _this16.value = null;
    return _this16;
  }

  _createClass(Caption, [{
    key: _xfa_object.$setValue,
    value: function (_value) {
      function value(_x) {
        return _value.apply(this, arguments);
      }

      value.toString = function () {
        return _value.toString();
      };

      return value;
    }(function (value) {
      _setValue(this, value);
    })
  }, {
    key: _xfa_object.$getExtra,
    value: function value(availableSpace) {
      if (!this[_xfa_object.$extra]) {
        var width = availableSpace.width,
            height = availableSpace.height;

        switch (this.placement) {
          case "left":
          case "right":
          case "inline":
            width = this.reserve <= 0 ? width : this.reserve;
            break;

          case "top":
          case "bottom":
            height = this.reserve <= 0 ? height : this.reserve;
            break;
        }

        this[_xfa_object.$extra] = (0, _html_utils.layoutNode)(this, {
          width: width,
          height: height
        });
      }

      return this[_xfa_object.$extra];
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      if (!this.value) {
        return _utils.HTMLResult.EMPTY;
      }

      this[_xfa_object.$pushPara]();

      var value = this.value[_xfa_object.$toHTML](availableSpace).html;

      if (!value) {
        this[_xfa_object.$popPara]();

        return _utils.HTMLResult.EMPTY;
      }

      var savedReserve = this.reserve;

      if (this.reserve <= 0) {
        var _this$$getExtra2 = this[_xfa_object.$getExtra](availableSpace),
            w = _this$$getExtra2.w,
            h = _this$$getExtra2.h;

        switch (this.placement) {
          case "left":
          case "right":
          case "inline":
            this.reserve = w;
            break;

          case "top":
          case "bottom":
            this.reserve = h;
            break;
        }
      }

      var children = [];

      if (typeof value === "string") {
        children.push({
          name: "#text",
          value: value
        });
      } else {
        children.push(value);
      }

      var style = (0, _html_utils.toStyle)(this, "font", "margin", "visibility");

      switch (this.placement) {
        case "left":
        case "right":
          if (this.reserve > 0) {
            style.width = (0, _html_utils.measureToString)(this.reserve);
          }

          break;

        case "top":
        case "bottom":
          if (this.reserve > 0) {
            style.height = (0, _html_utils.measureToString)(this.reserve);
          }

          break;
      }

      (0, _html_utils.setPara)(this, null, value);

      this[_xfa_object.$popPara]();

      this.reserve = savedReserve;
      return _utils.HTMLResult.success({
        name: "div",
        attributes: {
          style: style,
          "class": ["xfaCaption"]
        },
        children: children
      });
    }
  }]);

  return Caption;
}(_xfa_object.XFAObject);

var Certificate = /*#__PURE__*/function (_StringObject2) {
  _inherits(Certificate, _StringObject2);

  var _super17 = _createSuper(Certificate);

  function Certificate(attributes) {
    var _this17;

    _classCallCheck(this, Certificate);

    _this17 = _super17.call(this, TEMPLATE_NS_ID, "certificate");
    _this17.id = attributes.id || "";
    _this17.name = attributes.name || "";
    _this17.use = attributes.use || "";
    _this17.usehref = attributes.usehref || "";
    return _this17;
  }

  return Certificate;
}(_xfa_object.StringObject);

var Certificates = /*#__PURE__*/function (_XFAObject15) {
  _inherits(Certificates, _XFAObject15);

  var _super18 = _createSuper(Certificates);

  function Certificates(attributes) {
    var _this18;

    _classCallCheck(this, Certificates);

    _this18 = _super18.call(this, TEMPLATE_NS_ID, "certificates", true);
    _this18.credentialServerPolicy = (0, _utils.getStringOption)(attributes.credentialServerPolicy, ["optional", "required"]);
    _this18.id = attributes.id || "";
    _this18.url = attributes.url || "";
    _this18.urlPolicy = attributes.urlPolicy || "";
    _this18.use = attributes.use || "";
    _this18.usehref = attributes.usehref || "";
    _this18.encryption = null;
    _this18.issuers = null;
    _this18.keyUsage = null;
    _this18.oids = null;
    _this18.signing = null;
    _this18.subjectDNs = null;
    return _this18;
  }

  return Certificates;
}(_xfa_object.XFAObject);

var CheckButton = /*#__PURE__*/function (_XFAObject16) {
  _inherits(CheckButton, _XFAObject16);

  var _super19 = _createSuper(CheckButton);

  function CheckButton(attributes) {
    var _this19;

    _classCallCheck(this, CheckButton);

    _this19 = _super19.call(this, TEMPLATE_NS_ID, "checkButton", true);
    _this19.id = attributes.id || "";
    _this19.mark = (0, _utils.getStringOption)(attributes.mark, ["default", "check", "circle", "cross", "diamond", "square", "star"]);
    _this19.shape = (0, _utils.getStringOption)(attributes.shape, ["square", "round"]);
    _this19.size = (0, _utils.getMeasurement)(attributes.size, "10pt");
    _this19.use = attributes.use || "";
    _this19.usehref = attributes.usehref || "";
    _this19.border = null;
    _this19.extras = null;
    _this19.margin = null;
    return _this19;
  }

  _createClass(CheckButton, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var style = (0, _html_utils.toStyle)("margin");
      var size = (0, _html_utils.measureToString)(this.size);
      style.width = style.height = size;
      var type;
      var className;
      var groupId;

      var field = this[_xfa_object.$getParent]()[_xfa_object.$getParent]();

      var items = field.items.children.length && field.items.children[0][_xfa_object.$toHTML]().html || [];
      var exportedValue = {
        on: (items[0] !== undefined ? items[0] : "on").toString(),
        off: (items[1] !== undefined ? items[1] : "off").toString()
      };
      var value = field.value && field.value[_xfa_object.$text]() || "off";
      var checked = value === exportedValue.on || undefined;

      var container = field[_xfa_object.$getSubformParent]();

      var fieldId = field[_xfa_object.$uid];
      var dataId;

      if (container instanceof ExclGroup) {
        groupId = container[_xfa_object.$uid];
        type = "radio";
        className = "xfaRadio";
        dataId = container[_xfa_object.$data] && container[_xfa_object.$data][_xfa_object.$uid] || container[_xfa_object.$uid];
      } else {
        type = "checkbox";
        className = "xfaCheckbox";
        dataId = field[_xfa_object.$data] && field[_xfa_object.$data][_xfa_object.$uid] || field[_xfa_object.$uid];
      }

      var input = {
        name: "input",
        attributes: {
          "class": [className],
          style: style,
          fieldId: fieldId,
          dataId: dataId,
          type: type,
          checked: checked,
          xfaOn: exportedValue.on,
          xfaOff: exportedValue.off,
          "aria-label": ariaLabel(field)
        }
      };

      if (groupId) {
        input.attributes.name = groupId;
      }

      return _utils.HTMLResult.success({
        name: "label",
        attributes: {
          "class": ["xfaLabel"]
        },
        children: [input]
      });
    }
  }]);

  return CheckButton;
}(_xfa_object.XFAObject);

var ChoiceList = /*#__PURE__*/function (_XFAObject17) {
  _inherits(ChoiceList, _XFAObject17);

  var _super20 = _createSuper(ChoiceList);

  function ChoiceList(attributes) {
    var _this20;

    _classCallCheck(this, ChoiceList);

    _this20 = _super20.call(this, TEMPLATE_NS_ID, "choiceList", true);
    _this20.commitOn = (0, _utils.getStringOption)(attributes.commitOn, ["select", "exit"]);
    _this20.id = attributes.id || "";
    _this20.open = (0, _utils.getStringOption)(attributes.open, ["userControl", "always", "multiSelect", "onEntry"]);
    _this20.textEntry = (0, _utils.getInteger)({
      data: attributes.textEntry,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this20.use = attributes.use || "";
    _this20.usehref = attributes.usehref || "";
    _this20.border = null;
    _this20.extras = null;
    _this20.margin = null;
    return _this20;
  }

  _createClass(ChoiceList, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var style = (0, _html_utils.toStyle)(this, "border", "margin");

      var ui = this[_xfa_object.$getParent]();

      var field = ui[_xfa_object.$getParent]();

      var fontSize = field.font && field.font.size || 10;
      var optionStyle = {
        fontSize: "calc(".concat(fontSize, "px * var(--zoom-factor))")
      };
      var children = [];

      if (field.items.children.length > 0) {
        var items = field.items;
        var displayedIndex = 0;
        var saveIndex = 0;

        if (items.children.length === 2) {
          displayedIndex = items.children[0].save;
          saveIndex = 1 - displayedIndex;
        }

        var displayed = items.children[displayedIndex][_xfa_object.$toHTML]().html;

        var values = items.children[saveIndex][_xfa_object.$toHTML]().html;

        var selected = false;

        var _value2 = field.value && field.value[_xfa_object.$text]() || "";

        for (var i = 0, ii = displayed.length; i < ii; i++) {
          var option = {
            name: "option",
            attributes: {
              value: values[i] || displayed[i],
              style: optionStyle
            },
            value: displayed[i]
          };

          if (values[i] === _value2) {
            option.attributes.selected = selected = true;
          }

          children.push(option);
        }

        if (!selected) {
          children.splice(0, 0, {
            name: "option",
            attributes: {
              hidden: true,
              selected: true
            },
            value: " "
          });
        }
      }

      var selectAttributes = {
        "class": ["xfaSelect"],
        fieldId: field[_xfa_object.$uid],
        dataId: field[_xfa_object.$data] && field[_xfa_object.$data][_xfa_object.$uid] || field[_xfa_object.$uid],
        style: style,
        "aria-label": ariaLabel(field)
      };

      if (this.open === "multiSelect") {
        selectAttributes.multiple = true;
      }

      return _utils.HTMLResult.success({
        name: "label",
        attributes: {
          "class": ["xfaLabel"]
        },
        children: [{
          name: "select",
          children: children,
          attributes: selectAttributes
        }]
      });
    }
  }]);

  return ChoiceList;
}(_xfa_object.XFAObject);

var Color = /*#__PURE__*/function (_XFAObject18) {
  _inherits(Color, _XFAObject18);

  var _super21 = _createSuper(Color);

  function Color(attributes) {
    var _this21;

    _classCallCheck(this, Color);

    _this21 = _super21.call(this, TEMPLATE_NS_ID, "color", true);
    _this21.cSpace = (0, _utils.getStringOption)(attributes.cSpace, ["SRGB"]);
    _this21.id = attributes.id || "";
    _this21.use = attributes.use || "";
    _this21.usehref = attributes.usehref || "";
    _this21.value = attributes.value ? (0, _utils.getColor)(attributes.value) : "";
    _this21.extras = null;
    return _this21;
  }

  _createClass(Color, [{
    key: _xfa_object.$hasSettableValue,
    value: function value() {
      return false;
    }
  }, {
    key: _xfa_object.$toStyle,
    value: function value() {
      return this.value ? _util.Util.makeHexColor(this.value.r, this.value.g, this.value.b) : null;
    }
  }]);

  return Color;
}(_xfa_object.XFAObject);

var Comb = /*#__PURE__*/function (_XFAObject19) {
  _inherits(Comb, _XFAObject19);

  var _super22 = _createSuper(Comb);

  function Comb(attributes) {
    var _this22;

    _classCallCheck(this, Comb);

    _this22 = _super22.call(this, TEMPLATE_NS_ID, "comb");
    _this22.id = attributes.id || "";
    _this22.numberOfCells = (0, _utils.getInteger)({
      data: attributes.numberOfCells,
      defaultValue: 0,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this22.use = attributes.use || "";
    _this22.usehref = attributes.usehref || "";
    return _this22;
  }

  return Comb;
}(_xfa_object.XFAObject);

var Connect = /*#__PURE__*/function (_XFAObject20) {
  _inherits(Connect, _XFAObject20);

  var _super23 = _createSuper(Connect);

  function Connect(attributes) {
    var _this23;

    _classCallCheck(this, Connect);

    _this23 = _super23.call(this, TEMPLATE_NS_ID, "connect", true);
    _this23.connection = attributes.connection || "";
    _this23.id = attributes.id || "";
    _this23.ref = attributes.ref || "";
    _this23.usage = (0, _utils.getStringOption)(attributes.usage, ["exportAndImport", "exportOnly", "importOnly"]);
    _this23.use = attributes.use || "";
    _this23.usehref = attributes.usehref || "";
    _this23.picture = null;
    return _this23;
  }

  return Connect;
}(_xfa_object.XFAObject);

var ContentArea = /*#__PURE__*/function (_XFAObject21) {
  _inherits(ContentArea, _XFAObject21);

  var _super24 = _createSuper(ContentArea);

  function ContentArea(attributes) {
    var _this24;

    _classCallCheck(this, ContentArea);

    _this24 = _super24.call(this, TEMPLATE_NS_ID, "contentArea", true);
    _this24.h = (0, _utils.getMeasurement)(attributes.h);
    _this24.id = attributes.id || "";
    _this24.name = attributes.name || "";
    _this24.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this24.use = attributes.use || "";
    _this24.usehref = attributes.usehref || "";
    _this24.w = (0, _utils.getMeasurement)(attributes.w);
    _this24.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    _this24.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    _this24.desc = null;
    _this24.extras = null;
    return _this24;
  }

  _createClass(ContentArea, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var left = (0, _html_utils.measureToString)(this.x);
      var top = (0, _html_utils.measureToString)(this.y);
      var style = {
        left: left,
        top: top,
        width: (0, _html_utils.measureToString)(this.w),
        height: (0, _html_utils.measureToString)(this.h)
      };
      var classNames = ["xfaContentarea"];

      if ((0, _html_utils.isPrintOnly)(this)) {
        classNames.push("xfaPrintOnly");
      }

      return _utils.HTMLResult.success({
        name: "div",
        children: [],
        attributes: {
          style: style,
          "class": classNames,
          id: this[_xfa_object.$uid]
        }
      });
    }
  }]);

  return ContentArea;
}(_xfa_object.XFAObject);

var Corner = /*#__PURE__*/function (_XFAObject22) {
  _inherits(Corner, _XFAObject22);

  var _super25 = _createSuper(Corner);

  function Corner(attributes) {
    var _this25;

    _classCallCheck(this, Corner);

    _this25 = _super25.call(this, TEMPLATE_NS_ID, "corner", true);
    _this25.id = attributes.id || "";
    _this25.inverted = (0, _utils.getInteger)({
      data: attributes.inverted,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this25.join = (0, _utils.getStringOption)(attributes.join, ["square", "round"]);
    _this25.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    _this25.radius = (0, _utils.getMeasurement)(attributes.radius);
    _this25.stroke = (0, _utils.getStringOption)(attributes.stroke, ["solid", "dashDot", "dashDotDot", "dashed", "dotted", "embossed", "etched", "lowered", "raised"]);
    _this25.thickness = (0, _utils.getMeasurement)(attributes.thickness, "0.5pt");
    _this25.use = attributes.use || "";
    _this25.usehref = attributes.usehref || "";
    _this25.color = null;
    _this25.extras = null;
    return _this25;
  }

  _createClass(Corner, [{
    key: _xfa_object.$toStyle,
    value: function value() {
      var style = (0, _html_utils.toStyle)(this, "visibility");
      style.radius = (0, _html_utils.measureToString)(this.join === "square" ? 0 : this.radius);
      return style;
    }
  }]);

  return Corner;
}(_xfa_object.XFAObject);

var DateElement = /*#__PURE__*/function (_ContentObject) {
  _inherits(DateElement, _ContentObject);

  var _super26 = _createSuper(DateElement);

  function DateElement(attributes) {
    var _this26;

    _classCallCheck(this, DateElement);

    _this26 = _super26.call(this, TEMPLATE_NS_ID, "date");
    _this26.id = attributes.id || "";
    _this26.name = attributes.name || "";
    _this26.use = attributes.use || "";
    _this26.usehref = attributes.usehref || "";
    return _this26;
  }

  _createClass(DateElement, [{
    key: _xfa_object.$finalize,
    value: function value() {
      var date = this[_xfa_object.$content].trim();

      this[_xfa_object.$content] = date ? new Date(date) : null;
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      return valueToHtml(this[_xfa_object.$content] ? this[_xfa_object.$content].toString() : "");
    }
  }]);

  return DateElement;
}(_xfa_object.ContentObject);

var DateTime = /*#__PURE__*/function (_ContentObject2) {
  _inherits(DateTime, _ContentObject2);

  var _super27 = _createSuper(DateTime);

  function DateTime(attributes) {
    var _this27;

    _classCallCheck(this, DateTime);

    _this27 = _super27.call(this, TEMPLATE_NS_ID, "dateTime");
    _this27.id = attributes.id || "";
    _this27.name = attributes.name || "";
    _this27.use = attributes.use || "";
    _this27.usehref = attributes.usehref || "";
    return _this27;
  }

  _createClass(DateTime, [{
    key: _xfa_object.$finalize,
    value: function value() {
      var date = this[_xfa_object.$content].trim();

      this[_xfa_object.$content] = date ? new Date(date) : null;
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      return valueToHtml(this[_xfa_object.$content] ? this[_xfa_object.$content].toString() : "");
    }
  }]);

  return DateTime;
}(_xfa_object.ContentObject);

var DateTimeEdit = /*#__PURE__*/function (_XFAObject23) {
  _inherits(DateTimeEdit, _XFAObject23);

  var _super28 = _createSuper(DateTimeEdit);

  function DateTimeEdit(attributes) {
    var _this28;

    _classCallCheck(this, DateTimeEdit);

    _this28 = _super28.call(this, TEMPLATE_NS_ID, "dateTimeEdit", true);
    _this28.hScrollPolicy = (0, _utils.getStringOption)(attributes.hScrollPolicy, ["auto", "off", "on"]);
    _this28.id = attributes.id || "";
    _this28.picker = (0, _utils.getStringOption)(attributes.picker, ["host", "none"]);
    _this28.use = attributes.use || "";
    _this28.usehref = attributes.usehref || "";
    _this28.border = null;
    _this28.comb = null;
    _this28.extras = null;
    _this28.margin = null;
    return _this28;
  }

  _createClass(DateTimeEdit, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var style = (0, _html_utils.toStyle)(this, "border", "font", "margin");

      var field = this[_xfa_object.$getParent]()[_xfa_object.$getParent]();

      var html = {
        name: "input",
        attributes: {
          type: "text",
          fieldId: field[_xfa_object.$uid],
          dataId: field[_xfa_object.$data] && field[_xfa_object.$data][_xfa_object.$uid] || field[_xfa_object.$uid],
          "class": ["xfaTextfield"],
          style: style,
          "aria-label": ariaLabel(field)
        }
      };
      return _utils.HTMLResult.success({
        name: "label",
        attributes: {
          "class": ["xfaLabel"]
        },
        children: [html]
      });
    }
  }]);

  return DateTimeEdit;
}(_xfa_object.XFAObject);

var Decimal = /*#__PURE__*/function (_ContentObject3) {
  _inherits(Decimal, _ContentObject3);

  var _super29 = _createSuper(Decimal);

  function Decimal(attributes) {
    var _this29;

    _classCallCheck(this, Decimal);

    _this29 = _super29.call(this, TEMPLATE_NS_ID, "decimal");
    _this29.fracDigits = (0, _utils.getInteger)({
      data: attributes.fracDigits,
      defaultValue: 2,
      validate: function validate(x) {
        return true;
      }
    });
    _this29.id = attributes.id || "";
    _this29.leadDigits = (0, _utils.getInteger)({
      data: attributes.leadDigits,
      defaultValue: -1,
      validate: function validate(x) {
        return true;
      }
    });
    _this29.name = attributes.name || "";
    _this29.use = attributes.use || "";
    _this29.usehref = attributes.usehref || "";
    return _this29;
  }

  _createClass(Decimal, [{
    key: _xfa_object.$finalize,
    value: function value() {
      var number = parseFloat(this[_xfa_object.$content].trim());
      this[_xfa_object.$content] = isNaN(number) ? null : number;
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      return valueToHtml(this[_xfa_object.$content] !== null ? this[_xfa_object.$content].toString() : "");
    }
  }]);

  return Decimal;
}(_xfa_object.ContentObject);

var DefaultUi = /*#__PURE__*/function (_XFAObject24) {
  _inherits(DefaultUi, _XFAObject24);

  var _super30 = _createSuper(DefaultUi);

  function DefaultUi(attributes) {
    var _this30;

    _classCallCheck(this, DefaultUi);

    _this30 = _super30.call(this, TEMPLATE_NS_ID, "defaultUi", true);
    _this30.id = attributes.id || "";
    _this30.use = attributes.use || "";
    _this30.usehref = attributes.usehref || "";
    _this30.extras = null;
    return _this30;
  }

  return DefaultUi;
}(_xfa_object.XFAObject);

var Desc = /*#__PURE__*/function (_XFAObject25) {
  _inherits(Desc, _XFAObject25);

  var _super31 = _createSuper(Desc);

  function Desc(attributes) {
    var _this31;

    _classCallCheck(this, Desc);

    _this31 = _super31.call(this, TEMPLATE_NS_ID, "desc", true);
    _this31.id = attributes.id || "";
    _this31.use = attributes.use || "";
    _this31.usehref = attributes.usehref || "";
    _this31["boolean"] = new _xfa_object.XFAObjectArray();
    _this31.date = new _xfa_object.XFAObjectArray();
    _this31.dateTime = new _xfa_object.XFAObjectArray();
    _this31.decimal = new _xfa_object.XFAObjectArray();
    _this31.exData = new _xfa_object.XFAObjectArray();
    _this31["float"] = new _xfa_object.XFAObjectArray();
    _this31.image = new _xfa_object.XFAObjectArray();
    _this31.integer = new _xfa_object.XFAObjectArray();
    _this31.text = new _xfa_object.XFAObjectArray();
    _this31.time = new _xfa_object.XFAObjectArray();
    return _this31;
  }

  return Desc;
}(_xfa_object.XFAObject);

var DigestMethod = /*#__PURE__*/function (_OptionObject) {
  _inherits(DigestMethod, _OptionObject);

  var _super32 = _createSuper(DigestMethod);

  function DigestMethod(attributes) {
    var _this32;

    _classCallCheck(this, DigestMethod);

    _this32 = _super32.call(this, TEMPLATE_NS_ID, "digestMethod", ["", "SHA1", "SHA256", "SHA512", "RIPEMD160"]);
    _this32.id = attributes.id || "";
    _this32.use = attributes.use || "";
    _this32.usehref = attributes.usehref || "";
    return _this32;
  }

  return DigestMethod;
}(_xfa_object.OptionObject);

var DigestMethods = /*#__PURE__*/function (_XFAObject26) {
  _inherits(DigestMethods, _XFAObject26);

  var _super33 = _createSuper(DigestMethods);

  function DigestMethods(attributes) {
    var _this33;

    _classCallCheck(this, DigestMethods);

    _this33 = _super33.call(this, TEMPLATE_NS_ID, "digestMethods", true);
    _this33.id = attributes.id || "";
    _this33.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this33.use = attributes.use || "";
    _this33.usehref = attributes.usehref || "";
    _this33.digestMethod = new _xfa_object.XFAObjectArray();
    return _this33;
  }

  return DigestMethods;
}(_xfa_object.XFAObject);

var Draw = /*#__PURE__*/function (_XFAObject27) {
  _inherits(Draw, _XFAObject27);

  var _super34 = _createSuper(Draw);

  function Draw(attributes) {
    var _this34;

    _classCallCheck(this, Draw);

    _this34 = _super34.call(this, TEMPLATE_NS_ID, "draw", true);
    _this34.anchorType = (0, _utils.getStringOption)(attributes.anchorType, ["topLeft", "bottomCenter", "bottomLeft", "bottomRight", "middleCenter", "middleLeft", "middleRight", "topCenter", "topRight"]);
    _this34.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: function validate(n) {
        return n >= 1 || n === -1;
      }
    });
    _this34.h = attributes.h ? (0, _utils.getMeasurement)(attributes.h) : "";
    _this34.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    _this34.id = attributes.id || "";
    _this34.locale = attributes.locale || "";
    _this34.maxH = (0, _utils.getMeasurement)(attributes.maxH, "0pt");
    _this34.maxW = (0, _utils.getMeasurement)(attributes.maxW, "0pt");
    _this34.minH = (0, _utils.getMeasurement)(attributes.minH, "0pt");
    _this34.minW = (0, _utils.getMeasurement)(attributes.minW, "0pt");
    _this34.name = attributes.name || "";
    _this34.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    _this34.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this34.rotate = (0, _utils.getInteger)({
      data: attributes.rotate,
      defaultValue: 0,
      validate: function validate(x) {
        return x % 90 === 0;
      }
    });
    _this34.use = attributes.use || "";
    _this34.usehref = attributes.usehref || "";
    _this34.w = attributes.w ? (0, _utils.getMeasurement)(attributes.w) : "";
    _this34.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    _this34.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    _this34.assist = null;
    _this34.border = null;
    _this34.caption = null;
    _this34.desc = null;
    _this34.extras = null;
    _this34.font = null;
    _this34.keep = null;
    _this34.margin = null;
    _this34.para = null;
    _this34.traversal = null;
    _this34.ui = null;
    _this34.value = null;
    _this34.setProperty = new _xfa_object.XFAObjectArray();
    return _this34;
  }

  _createClass(Draw, [{
    key: _xfa_object.$setValue,
    value: function (_value3) {
      function value(_x2) {
        return _value3.apply(this, arguments);
      }

      value.toString = function () {
        return _value3.toString();
      };

      return value;
    }(function (value) {
      _setValue(this, value);
    })
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      setTabIndex(this);

      if (this.presence === "hidden" || this.presence === "inactive") {
        return _utils.HTMLResult.EMPTY;
      }

      (0, _html_utils.fixDimensions)(this);

      this[_xfa_object.$pushPara]();

      var savedW = this.w;
      var savedH = this.h;

      var _layoutNode = (0, _html_utils.layoutNode)(this, availableSpace),
          w = _layoutNode.w,
          h = _layoutNode.h,
          isBroken = _layoutNode.isBroken;

      if (w && this.w === "") {
        if (isBroken && this[_xfa_object.$getSubformParent]()[_xfa_object.$isThereMoreWidth]()) {
          this[_xfa_object.$popPara]();

          return _utils.HTMLResult.FAILURE;
        }

        this.w = w;
      }

      if (h && this.h === "") {
        this.h = h;
      }

      setFirstUnsplittable(this);

      if (!(0, _layout.checkDimensions)(this, availableSpace)) {
        this.w = savedW;
        this.h = savedH;

        this[_xfa_object.$popPara]();

        return _utils.HTMLResult.FAILURE;
      }

      unsetFirstUnsplittable(this);
      var style = (0, _html_utils.toStyle)(this, "font", "hAlign", "dimensions", "position", "presence", "rotate", "anchorType", "border", "margin");
      (0, _html_utils.setMinMaxDimensions)(this, style);

      if (style.margin) {
        style.padding = style.margin;
        delete style.margin;
      }

      var classNames = ["xfaDraw"];

      if (this.font) {
        classNames.push("xfaFont");
      }

      if ((0, _html_utils.isPrintOnly)(this)) {
        classNames.push("xfaPrintOnly");
      }

      var attributes = {
        style: style,
        id: this[_xfa_object.$uid],
        "class": classNames
      };

      if (this.name) {
        attributes.xfaName = this.name;
      }

      var html = {
        name: "div",
        attributes: attributes,
        children: []
      };
      applyAssist(this, attributes);
      var bbox = (0, _html_utils.computeBbox)(this, html, availableSpace);
      var value = this.value ? this.value[_xfa_object.$toHTML](availableSpace).html : null;

      if (value === null) {
        this.w = savedW;
        this.h = savedH;

        this[_xfa_object.$popPara]();

        return _utils.HTMLResult.success((0, _html_utils.createWrapper)(this, html), bbox);
      }

      html.children.push(value);
      (0, _html_utils.setPara)(this, style, value);
      this.w = savedW;
      this.h = savedH;

      this[_xfa_object.$popPara]();

      return _utils.HTMLResult.success((0, _html_utils.createWrapper)(this, html), bbox);
    }
  }]);

  return Draw;
}(_xfa_object.XFAObject);

var Edge = /*#__PURE__*/function (_XFAObject28) {
  _inherits(Edge, _XFAObject28);

  var _super35 = _createSuper(Edge);

  function Edge(attributes) {
    var _this35;

    _classCallCheck(this, Edge);

    _this35 = _super35.call(this, TEMPLATE_NS_ID, "edge", true);
    _this35.cap = (0, _utils.getStringOption)(attributes.cap, ["square", "butt", "round"]);
    _this35.id = attributes.id || "";
    _this35.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    _this35.stroke = (0, _utils.getStringOption)(attributes.stroke, ["solid", "dashDot", "dashDotDot", "dashed", "dotted", "embossed", "etched", "lowered", "raised"]);
    _this35.thickness = (0, _utils.getMeasurement)(attributes.thickness, "0.5pt");
    _this35.use = attributes.use || "";
    _this35.usehref = attributes.usehref || "";
    _this35.color = null;
    _this35.extras = null;
    return _this35;
  }

  _createClass(Edge, [{
    key: _xfa_object.$toStyle,
    value: function value() {
      var style = (0, _html_utils.toStyle)(this, "visibility");
      Object.assign(style, {
        linecap: this.cap,
        width: (0, _html_utils.measureToString)(this.thickness),
        color: this.color ? this.color[_xfa_object.$toStyle]() : "#000000",
        style: ""
      });

      if (this.presence !== "visible") {
        style.style = "none";
      } else {
        switch (this.stroke) {
          case "solid":
            style.style = "solid";
            break;

          case "dashDot":
            style.style = "dashed";
            break;

          case "dashDotDot":
            style.style = "dashed";
            break;

          case "dashed":
            style.style = "dashed";
            break;

          case "dotted":
            style.style = "dotted";
            break;

          case "embossed":
            style.style = "ridge";
            break;

          case "etched":
            style.style = "groove";
            break;

          case "lowered":
            style.style = "inset";
            break;

          case "raised":
            style.style = "outset";
            break;
        }
      }

      return style;
    }
  }]);

  return Edge;
}(_xfa_object.XFAObject);

var Encoding = /*#__PURE__*/function (_OptionObject2) {
  _inherits(Encoding, _OptionObject2);

  var _super36 = _createSuper(Encoding);

  function Encoding(attributes) {
    var _this36;

    _classCallCheck(this, Encoding);

    _this36 = _super36.call(this, TEMPLATE_NS_ID, "encoding", ["adbe.x509.rsa_sha1", "adbe.pkcs7.detached", "adbe.pkcs7.sha1"]);
    _this36.id = attributes.id || "";
    _this36.use = attributes.use || "";
    _this36.usehref = attributes.usehref || "";
    return _this36;
  }

  return Encoding;
}(_xfa_object.OptionObject);

var Encodings = /*#__PURE__*/function (_XFAObject29) {
  _inherits(Encodings, _XFAObject29);

  var _super37 = _createSuper(Encodings);

  function Encodings(attributes) {
    var _this37;

    _classCallCheck(this, Encodings);

    _this37 = _super37.call(this, TEMPLATE_NS_ID, "encodings", true);
    _this37.id = attributes.id || "";
    _this37.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this37.use = attributes.use || "";
    _this37.usehref = attributes.usehref || "";
    _this37.encoding = new _xfa_object.XFAObjectArray();
    return _this37;
  }

  return Encodings;
}(_xfa_object.XFAObject);

var Encrypt = /*#__PURE__*/function (_XFAObject30) {
  _inherits(Encrypt, _XFAObject30);

  var _super38 = _createSuper(Encrypt);

  function Encrypt(attributes) {
    var _this38;

    _classCallCheck(this, Encrypt);

    _this38 = _super38.call(this, TEMPLATE_NS_ID, "encrypt", true);
    _this38.id = attributes.id || "";
    _this38.use = attributes.use || "";
    _this38.usehref = attributes.usehref || "";
    _this38.certificate = null;
    return _this38;
  }

  return Encrypt;
}(_xfa_object.XFAObject);

var EncryptData = /*#__PURE__*/function (_XFAObject31) {
  _inherits(EncryptData, _XFAObject31);

  var _super39 = _createSuper(EncryptData);

  function EncryptData(attributes) {
    var _this39;

    _classCallCheck(this, EncryptData);

    _this39 = _super39.call(this, TEMPLATE_NS_ID, "encryptData", true);
    _this39.id = attributes.id || "";
    _this39.operation = (0, _utils.getStringOption)(attributes.operation, ["encrypt", "decrypt"]);
    _this39.target = attributes.target || "";
    _this39.use = attributes.use || "";
    _this39.usehref = attributes.usehref || "";
    _this39.filter = null;
    _this39.manifest = null;
    return _this39;
  }

  return EncryptData;
}(_xfa_object.XFAObject);

var Encryption = /*#__PURE__*/function (_XFAObject32) {
  _inherits(Encryption, _XFAObject32);

  var _super40 = _createSuper(Encryption);

  function Encryption(attributes) {
    var _this40;

    _classCallCheck(this, Encryption);

    _this40 = _super40.call(this, TEMPLATE_NS_ID, "encryption", true);
    _this40.id = attributes.id || "";
    _this40.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this40.use = attributes.use || "";
    _this40.usehref = attributes.usehref || "";
    _this40.certificate = new _xfa_object.XFAObjectArray();
    return _this40;
  }

  return Encryption;
}(_xfa_object.XFAObject);

var EncryptionMethod = /*#__PURE__*/function (_OptionObject3) {
  _inherits(EncryptionMethod, _OptionObject3);

  var _super41 = _createSuper(EncryptionMethod);

  function EncryptionMethod(attributes) {
    var _this41;

    _classCallCheck(this, EncryptionMethod);

    _this41 = _super41.call(this, TEMPLATE_NS_ID, "encryptionMethod", ["", "AES256-CBC", "TRIPLEDES-CBC", "AES128-CBC", "AES192-CBC"]);
    _this41.id = attributes.id || "";
    _this41.use = attributes.use || "";
    _this41.usehref = attributes.usehref || "";
    return _this41;
  }

  return EncryptionMethod;
}(_xfa_object.OptionObject);

var EncryptionMethods = /*#__PURE__*/function (_XFAObject33) {
  _inherits(EncryptionMethods, _XFAObject33);

  var _super42 = _createSuper(EncryptionMethods);

  function EncryptionMethods(attributes) {
    var _this42;

    _classCallCheck(this, EncryptionMethods);

    _this42 = _super42.call(this, TEMPLATE_NS_ID, "encryptionMethods", true);
    _this42.id = attributes.id || "";
    _this42.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this42.use = attributes.use || "";
    _this42.usehref = attributes.usehref || "";
    _this42.encryptionMethod = new _xfa_object.XFAObjectArray();
    return _this42;
  }

  return EncryptionMethods;
}(_xfa_object.XFAObject);

var Event = /*#__PURE__*/function (_XFAObject34) {
  _inherits(Event, _XFAObject34);

  var _super43 = _createSuper(Event);

  function Event(attributes) {
    var _this43;

    _classCallCheck(this, Event);

    _this43 = _super43.call(this, TEMPLATE_NS_ID, "event", true);
    _this43.activity = (0, _utils.getStringOption)(attributes.activity, ["click", "change", "docClose", "docReady", "enter", "exit", "full", "indexChange", "initialize", "mouseDown", "mouseEnter", "mouseExit", "mouseUp", "postExecute", "postOpen", "postPrint", "postSave", "postSign", "postSubmit", "preExecute", "preOpen", "prePrint", "preSave", "preSign", "preSubmit", "ready", "validationState"]);
    _this43.id = attributes.id || "";
    _this43.listen = (0, _utils.getStringOption)(attributes.listen, ["refOnly", "refAndDescendents"]);
    _this43.name = attributes.name || "";
    _this43.ref = attributes.ref || "";
    _this43.use = attributes.use || "";
    _this43.usehref = attributes.usehref || "";
    _this43.extras = null;
    _this43.encryptData = null;
    _this43.execute = null;
    _this43.script = null;
    _this43.signData = null;
    _this43.submit = null;
    return _this43;
  }

  return Event;
}(_xfa_object.XFAObject);

var ExData = /*#__PURE__*/function (_ContentObject4) {
  _inherits(ExData, _ContentObject4);

  var _super44 = _createSuper(ExData);

  function ExData(attributes) {
    var _this44;

    _classCallCheck(this, ExData);

    _this44 = _super44.call(this, TEMPLATE_NS_ID, "exData");
    _this44.contentType = attributes.contentType || "";
    _this44.href = attributes.href || "";
    _this44.id = attributes.id || "";
    _this44.maxLength = (0, _utils.getInteger)({
      data: attributes.maxLength,
      defaultValue: -1,
      validate: function validate(x) {
        return x >= -1;
      }
    });
    _this44.name = attributes.name || "";
    _this44.rid = attributes.rid || "";
    _this44.transferEncoding = (0, _utils.getStringOption)(attributes.transferEncoding, ["none", "base64", "package"]);
    _this44.use = attributes.use || "";
    _this44.usehref = attributes.usehref || "";
    return _this44;
  }

  _createClass(ExData, [{
    key: _xfa_object.$isCDATAXml,
    value: function value() {
      return this.contentType === "text/html";
    }
  }, {
    key: _xfa_object.$onChild,
    value: function value(child) {
      if (this.contentType === "text/html" && child[_xfa_object.$namespaceId] === _namespaces.NamespaceIds.xhtml.id) {
        this[_xfa_object.$content] = child;
        return true;
      }

      if (this.contentType === "text/xml") {
        this[_xfa_object.$content] = child;
        return true;
      }

      return false;
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      if (this.contentType !== "text/html" || !this[_xfa_object.$content]) {
        return _utils.HTMLResult.EMPTY;
      }

      return this[_xfa_object.$content][_xfa_object.$toHTML](availableSpace);
    }
  }]);

  return ExData;
}(_xfa_object.ContentObject);

var ExObject = /*#__PURE__*/function (_XFAObject35) {
  _inherits(ExObject, _XFAObject35);

  var _super45 = _createSuper(ExObject);

  function ExObject(attributes) {
    var _this45;

    _classCallCheck(this, ExObject);

    _this45 = _super45.call(this, TEMPLATE_NS_ID, "exObject", true);
    _this45.archive = attributes.archive || "";
    _this45.classId = attributes.classId || "";
    _this45.codeBase = attributes.codeBase || "";
    _this45.codeType = attributes.codeType || "";
    _this45.id = attributes.id || "";
    _this45.name = attributes.name || "";
    _this45.use = attributes.use || "";
    _this45.usehref = attributes.usehref || "";
    _this45.extras = null;
    _this45["boolean"] = new _xfa_object.XFAObjectArray();
    _this45.date = new _xfa_object.XFAObjectArray();
    _this45.dateTime = new _xfa_object.XFAObjectArray();
    _this45.decimal = new _xfa_object.XFAObjectArray();
    _this45.exData = new _xfa_object.XFAObjectArray();
    _this45.exObject = new _xfa_object.XFAObjectArray();
    _this45["float"] = new _xfa_object.XFAObjectArray();
    _this45.image = new _xfa_object.XFAObjectArray();
    _this45.integer = new _xfa_object.XFAObjectArray();
    _this45.text = new _xfa_object.XFAObjectArray();
    _this45.time = new _xfa_object.XFAObjectArray();
    return _this45;
  }

  return ExObject;
}(_xfa_object.XFAObject);

var ExclGroup = /*#__PURE__*/function (_XFAObject36) {
  _inherits(ExclGroup, _XFAObject36);

  var _super46 = _createSuper(ExclGroup);

  function ExclGroup(attributes) {
    var _this46;

    _classCallCheck(this, ExclGroup);

    _this46 = _super46.call(this, TEMPLATE_NS_ID, "exclGroup", true);
    _this46.access = (0, _utils.getStringOption)(attributes.access, ["open", "nonInteractive", "protected", "readOnly"]);
    _this46.accessKey = attributes.accessKey || "";
    _this46.anchorType = (0, _utils.getStringOption)(attributes.anchorType, ["topLeft", "bottomCenter", "bottomLeft", "bottomRight", "middleCenter", "middleLeft", "middleRight", "topCenter", "topRight"]);
    _this46.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: function validate(n) {
        return n >= 1 || n === -1;
      }
    });
    _this46.h = attributes.h ? (0, _utils.getMeasurement)(attributes.h) : "";
    _this46.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    _this46.id = attributes.id || "";
    _this46.layout = (0, _utils.getStringOption)(attributes.layout, ["position", "lr-tb", "rl-row", "rl-tb", "row", "table", "tb"]);
    _this46.maxH = (0, _utils.getMeasurement)(attributes.maxH, "0pt");
    _this46.maxW = (0, _utils.getMeasurement)(attributes.maxW, "0pt");
    _this46.minH = (0, _utils.getMeasurement)(attributes.minH, "0pt");
    _this46.minW = (0, _utils.getMeasurement)(attributes.minW, "0pt");
    _this46.name = attributes.name || "";
    _this46.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    _this46.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this46.use = attributes.use || "";
    _this46.usehref = attributes.usehref || "";
    _this46.w = attributes.w ? (0, _utils.getMeasurement)(attributes.w) : "";
    _this46.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    _this46.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    _this46.assist = null;
    _this46.bind = null;
    _this46.border = null;
    _this46.calculate = null;
    _this46.caption = null;
    _this46.desc = null;
    _this46.extras = null;
    _this46.margin = null;
    _this46.para = null;
    _this46.traversal = null;
    _this46.validate = null;
    _this46.connect = new _xfa_object.XFAObjectArray();
    _this46.event = new _xfa_object.XFAObjectArray();
    _this46.field = new _xfa_object.XFAObjectArray();
    _this46.setProperty = new _xfa_object.XFAObjectArray();
    return _this46;
  }

  _createClass(ExclGroup, [{
    key: _xfa_object.$isBindable,
    value: function value() {
      return true;
    }
  }, {
    key: _xfa_object.$hasSettableValue,
    value: function value() {
      return true;
    }
  }, {
    key: _xfa_object.$setValue,
    value: function (_value4) {
      function value(_x3) {
        return _value4.apply(this, arguments);
      }

      value.toString = function () {
        return _value4.toString();
      };

      return value;
    }(function (value) {
      var _iterator4 = _createForOfIteratorHelper(this.field.children),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var field = _step4.value;

          if (!field.value) {
            var nodeValue = new Value({});

            field[_xfa_object.$appendChild](nodeValue);

            field.value = nodeValue;
          }

          field.value[_xfa_object.$setValue](value);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    })
  }, {
    key: _xfa_object.$isThereMoreWidth,
    value: function value() {
      return this.layout.endsWith("-tb") && this[_xfa_object.$extra].attempt === 0 && this[_xfa_object.$extra].numberInLine > 0 || this[_xfa_object.$getParent]()[_xfa_object.$isThereMoreWidth]();
    }
  }, {
    key: _xfa_object.$isSplittable,
    value: function value() {
      var parent = this[_xfa_object.$getSubformParent]();

      if (!parent[_xfa_object.$isSplittable]()) {
        return false;
      }

      if (this[_xfa_object.$extra]._isSplittable !== undefined) {
        return this[_xfa_object.$extra]._isSplittable;
      }

      if (this.layout === "position" || this.layout.includes("row")) {
        this[_xfa_object.$extra]._isSplittable = false;
        return false;
      }

      if (parent.layout && parent.layout.endsWith("-tb") && parent[_xfa_object.$extra].numberInLine !== 0) {
        return false;
      }

      this[_xfa_object.$extra]._isSplittable = true;
      return true;
    }
  }, {
    key: _xfa_object.$flushHTML,
    value: function value() {
      return (0, _layout.flushHTML)(this);
    }
  }, {
    key: _xfa_object.$addHTML,
    value: function value(html, bbox) {
      (0, _layout.addHTML)(this, html, bbox);
    }
  }, {
    key: _xfa_object.$getAvailableSpace,
    value: function value() {
      return (0, _layout.getAvailableSpace)(this);
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      setTabIndex(this);

      if (this.presence === "hidden" || this.presence === "inactive" || this.h === 0 || this.w === 0) {
        return _utils.HTMLResult.EMPTY;
      }

      (0, _html_utils.fixDimensions)(this);
      var children = [];
      var attributes = {
        id: this[_xfa_object.$uid],
        "class": []
      };
      (0, _html_utils.setAccess)(this, attributes["class"]);

      if (!this[_xfa_object.$extra]) {
        this[_xfa_object.$extra] = Object.create(null);
      }

      Object.assign(this[_xfa_object.$extra], {
        children: children,
        attributes: attributes,
        attempt: 0,
        line: null,
        numberInLine: 0,
        availableSpace: {
          width: Math.min(this.w || Infinity, availableSpace.width),
          height: Math.min(this.h || Infinity, availableSpace.height)
        },
        width: 0,
        height: 0,
        prevHeight: 0,
        currentWidth: 0
      });

      var isSplittable = this[_xfa_object.$isSplittable]();

      if (!isSplittable) {
        setFirstUnsplittable(this);
      }

      if (!(0, _layout.checkDimensions)(this, availableSpace)) {
        return _utils.HTMLResult.FAILURE;
      }

      var filter = new Set(["field"]);

      if (this.layout.includes("row")) {
        var columnWidths = this[_xfa_object.$getSubformParent]().columnWidths;

        if (Array.isArray(columnWidths) && columnWidths.length > 0) {
          this[_xfa_object.$extra].columnWidths = columnWidths;
          this[_xfa_object.$extra].currentColumn = 0;
        }
      }

      var style = (0, _html_utils.toStyle)(this, "anchorType", "dimensions", "position", "presence", "border", "margin", "hAlign");
      var classNames = ["xfaExclgroup"];
      var cl = (0, _html_utils.layoutClass)(this);

      if (cl) {
        classNames.push(cl);
      }

      if ((0, _html_utils.isPrintOnly)(this)) {
        classNames.push("xfaPrintOnly");
      }

      attributes.style = style;
      attributes["class"] = classNames;

      if (this.name) {
        attributes.xfaName = this.name;
      }

      this[_xfa_object.$pushPara]();

      var isLrTb = this.layout === "lr-tb" || this.layout === "rl-tb";
      var maxRun = isLrTb ? MAX_ATTEMPTS_FOR_LRTB_LAYOUT : 1;

      for (; this[_xfa_object.$extra].attempt < maxRun; this[_xfa_object.$extra].attempt++) {
        if (isLrTb && this[_xfa_object.$extra].attempt === MAX_ATTEMPTS_FOR_LRTB_LAYOUT - 1) {
          this[_xfa_object.$extra].numberInLine = 0;
        }

        var result = this[_xfa_object.$childrenToHTML]({
          filter: filter,
          include: true
        });

        if (result.success) {
          break;
        }

        if (result.isBreak()) {
          this[_xfa_object.$popPara]();

          return result;
        }

        if (isLrTb && this[_xfa_object.$extra].attempt === 0 && this[_xfa_object.$extra].numberInLine === 0 && !this[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure) {
          this[_xfa_object.$extra].attempt = maxRun;
          break;
        }
      }

      this[_xfa_object.$popPara]();

      if (!isSplittable) {
        unsetFirstUnsplittable(this);
      }

      if (this[_xfa_object.$extra].attempt === maxRun) {
        if (!isSplittable) {
          delete this[_xfa_object.$extra];
        }

        return _utils.HTMLResult.FAILURE;
      }

      var marginH = 0;
      var marginV = 0;

      if (this.margin) {
        marginH = this.margin.leftInset + this.margin.rightInset;
        marginV = this.margin.topInset + this.margin.bottomInset;
      }

      var width = Math.max(this[_xfa_object.$extra].width + marginH, this.w || 0);
      var height = Math.max(this[_xfa_object.$extra].height + marginV, this.h || 0);
      var bbox = [this.x, this.y, width, height];

      if (this.w === "") {
        style.width = (0, _html_utils.measureToString)(width);
      }

      if (this.h === "") {
        style.height = (0, _html_utils.measureToString)(height);
      }

      var html = {
        name: "div",
        attributes: attributes,
        children: children
      };
      applyAssist(this, attributes);
      delete this[_xfa_object.$extra];
      return _utils.HTMLResult.success((0, _html_utils.createWrapper)(this, html), bbox);
    }
  }]);

  return ExclGroup;
}(_xfa_object.XFAObject);

var Execute = /*#__PURE__*/function (_XFAObject37) {
  _inherits(Execute, _XFAObject37);

  var _super47 = _createSuper(Execute);

  function Execute(attributes) {
    var _this47;

    _classCallCheck(this, Execute);

    _this47 = _super47.call(this, TEMPLATE_NS_ID, "execute");
    _this47.connection = attributes.connection || "";
    _this47.executeType = (0, _utils.getStringOption)(attributes.executeType, ["import", "remerge"]);
    _this47.id = attributes.id || "";
    _this47.runAt = (0, _utils.getStringOption)(attributes.runAt, ["client", "both", "server"]);
    _this47.use = attributes.use || "";
    _this47.usehref = attributes.usehref || "";
    return _this47;
  }

  return Execute;
}(_xfa_object.XFAObject);

var Extras = /*#__PURE__*/function (_XFAObject38) {
  _inherits(Extras, _XFAObject38);

  var _super48 = _createSuper(Extras);

  function Extras(attributes) {
    var _this48;

    _classCallCheck(this, Extras);

    _this48 = _super48.call(this, TEMPLATE_NS_ID, "extras", true);
    _this48.id = attributes.id || "";
    _this48.name = attributes.name || "";
    _this48.use = attributes.use || "";
    _this48.usehref = attributes.usehref || "";
    _this48["boolean"] = new _xfa_object.XFAObjectArray();
    _this48.date = new _xfa_object.XFAObjectArray();
    _this48.dateTime = new _xfa_object.XFAObjectArray();
    _this48.decimal = new _xfa_object.XFAObjectArray();
    _this48.exData = new _xfa_object.XFAObjectArray();
    _this48.extras = new _xfa_object.XFAObjectArray();
    _this48["float"] = new _xfa_object.XFAObjectArray();
    _this48.image = new _xfa_object.XFAObjectArray();
    _this48.integer = new _xfa_object.XFAObjectArray();
    _this48.text = new _xfa_object.XFAObjectArray();
    _this48.time = new _xfa_object.XFAObjectArray();
    return _this48;
  }

  return Extras;
}(_xfa_object.XFAObject);

var Field = /*#__PURE__*/function (_XFAObject39) {
  _inherits(Field, _XFAObject39);

  var _super49 = _createSuper(Field);

  function Field(attributes) {
    var _this49;

    _classCallCheck(this, Field);

    _this49 = _super49.call(this, TEMPLATE_NS_ID, "field", true);
    _this49.access = (0, _utils.getStringOption)(attributes.access, ["open", "nonInteractive", "protected", "readOnly"]);
    _this49.accessKey = attributes.accessKey || "";
    _this49.anchorType = (0, _utils.getStringOption)(attributes.anchorType, ["topLeft", "bottomCenter", "bottomLeft", "bottomRight", "middleCenter", "middleLeft", "middleRight", "topCenter", "topRight"]);
    _this49.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: function validate(n) {
        return n >= 1 || n === -1;
      }
    });
    _this49.h = attributes.h ? (0, _utils.getMeasurement)(attributes.h) : "";
    _this49.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    _this49.id = attributes.id || "";
    _this49.locale = attributes.locale || "";
    _this49.maxH = (0, _utils.getMeasurement)(attributes.maxH, "0pt");
    _this49.maxW = (0, _utils.getMeasurement)(attributes.maxW, "0pt");
    _this49.minH = (0, _utils.getMeasurement)(attributes.minH, "0pt");
    _this49.minW = (0, _utils.getMeasurement)(attributes.minW, "0pt");
    _this49.name = attributes.name || "";
    _this49.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    _this49.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this49.rotate = (0, _utils.getInteger)({
      data: attributes.rotate,
      defaultValue: 0,
      validate: function validate(x) {
        return x % 90 === 0;
      }
    });
    _this49.use = attributes.use || "";
    _this49.usehref = attributes.usehref || "";
    _this49.w = attributes.w ? (0, _utils.getMeasurement)(attributes.w) : "";
    _this49.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    _this49.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    _this49.assist = null;
    _this49.bind = null;
    _this49.border = null;
    _this49.calculate = null;
    _this49.caption = null;
    _this49.desc = null;
    _this49.extras = null;
    _this49.font = null;
    _this49.format = null;
    _this49.items = new _xfa_object.XFAObjectArray(2);
    _this49.keep = null;
    _this49.margin = null;
    _this49.para = null;
    _this49.traversal = null;
    _this49.ui = null;
    _this49.validate = null;
    _this49.value = null;
    _this49.bindItems = new _xfa_object.XFAObjectArray();
    _this49.connect = new _xfa_object.XFAObjectArray();
    _this49.event = new _xfa_object.XFAObjectArray();
    _this49.setProperty = new _xfa_object.XFAObjectArray();
    return _this49;
  }

  _createClass(Field, [{
    key: _xfa_object.$isBindable,
    value: function value() {
      return true;
    }
  }, {
    key: _xfa_object.$setValue,
    value: function (_value5) {
      function value(_x4) {
        return _value5.apply(this, arguments);
      }

      value.toString = function () {
        return _value5.toString();
      };

      return value;
    }(function (value) {
      _setValue(this, value);
    })
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      setTabIndex(this);

      if (!this.ui) {
        this.ui = new Ui({});
        this.ui[_xfa_object.$globalData] = this[_xfa_object.$globalData];

        this[_xfa_object.$appendChild](this.ui);

        var node;

        switch (this.items.children.length) {
          case 0:
            node = new TextEdit({});
            this.ui.textEdit = node;
            break;

          case 1:
            node = new CheckButton({});
            this.ui.checkButton = node;
            break;

          case 2:
            node = new ChoiceList({});
            this.ui.choiceList = node;
            break;
        }

        this.ui[_xfa_object.$appendChild](node);
      }

      if (!this.ui || this.presence === "hidden" || this.presence === "inactive" || this.h === 0 || this.w === 0) {
        return _utils.HTMLResult.EMPTY;
      }

      if (this.caption) {
        delete this.caption[_xfa_object.$extra];
      }

      this[_xfa_object.$pushPara]();

      var caption = this.caption ? this.caption[_xfa_object.$toHTML](availableSpace).html : null;
      var savedW = this.w;
      var savedH = this.h;
      var marginH = 0;
      var marginV = 0;

      if (this.margin) {
        marginH = this.margin.leftInset + this.margin.rightInset;
        marginV = this.margin.topInset + this.margin.bottomInset;
      }

      var borderDims = null;

      if (this.w === "" || this.h === "") {
        var width = null;
        var height = null;
        var uiW = 0;
        var uiH = 0;

        if (this.ui.checkButton) {
          uiW = uiH = this.ui.checkButton.size;
        } else {
          var _layoutNode2 = (0, _html_utils.layoutNode)(this, availableSpace),
              w = _layoutNode2.w,
              h = _layoutNode2.h;

          if (w !== null) {
            uiW = w;
            uiH = h;
          } else {
            uiH = (0, _fonts.getMetrics)(this.font, true).lineNoGap;
          }
        }

        borderDims = getBorderDims(this.ui[_xfa_object.$getExtra]());
        uiW += borderDims.w;
        uiH += borderDims.h;

        if (this.caption) {
          var _this$caption$$getExt = this.caption[_xfa_object.$getExtra](availableSpace),
              _w = _this$caption$$getExt.w,
              _h = _this$caption$$getExt.h,
              isBroken = _this$caption$$getExt.isBroken;

          if (isBroken && this[_xfa_object.$getSubformParent]()[_xfa_object.$isThereMoreWidth]()) {
            this[_xfa_object.$popPara]();

            return _utils.HTMLResult.FAILURE;
          }

          width = _w;
          height = _h;

          switch (this.caption.placement) {
            case "left":
            case "right":
            case "inline":
              width += uiW;
              break;

            case "top":
            case "bottom":
              height += uiH;
              break;
          }
        } else {
          width = uiW;
          height = uiH;
        }

        if (width && this.w === "") {
          width += marginH;
          this.w = Math.min(this.maxW <= 0 ? Infinity : this.maxW, this.minW + 1 < width ? width : this.minW);
        }

        if (height && this.h === "") {
          height += marginV;
          this.h = Math.min(this.maxH <= 0 ? Infinity : this.maxH, this.minH + 1 < height ? height : this.minH);
        }
      }

      this[_xfa_object.$popPara]();

      (0, _html_utils.fixDimensions)(this);
      setFirstUnsplittable(this);

      if (!(0, _layout.checkDimensions)(this, availableSpace)) {
        this.w = savedW;
        this.h = savedH;

        this[_xfa_object.$popPara]();

        return _utils.HTMLResult.FAILURE;
      }

      unsetFirstUnsplittable(this);
      var style = (0, _html_utils.toStyle)(this, "font", "dimensions", "position", "rotate", "anchorType", "presence", "margin", "hAlign");
      (0, _html_utils.setMinMaxDimensions)(this, style);
      var classNames = ["xfaField"];

      if (this.font) {
        classNames.push("xfaFont");
      }

      if ((0, _html_utils.isPrintOnly)(this)) {
        classNames.push("xfaPrintOnly");
      }

      var attributes = {
        style: style,
        id: this[_xfa_object.$uid],
        "class": classNames
      };

      if (style.margin) {
        style.padding = style.margin;
        delete style.margin;
      }

      (0, _html_utils.setAccess)(this, classNames);

      if (this.name) {
        attributes.xfaName = this.name;
      }

      var children = [];
      var html = {
        name: "div",
        attributes: attributes,
        children: children
      };
      applyAssist(this, attributes);
      var borderStyle = this.border ? this.border[_xfa_object.$toStyle]() : null;
      var bbox = (0, _html_utils.computeBbox)(this, html, availableSpace);

      var ui = this.ui[_xfa_object.$toHTML]().html;

      if (!ui) {
        Object.assign(style, borderStyle);
        return _utils.HTMLResult.success((0, _html_utils.createWrapper)(this, html), bbox);
      }

      if (this[_xfa_object.$tabIndex]) {
        if (ui.children && ui.children[0]) {
          ui.children[0].attributes.tabindex = this[_xfa_object.$tabIndex];
        } else {
          ui.attributes.tabindex = this[_xfa_object.$tabIndex];
        }
      }

      if (!ui.attributes.style) {
        ui.attributes.style = Object.create(null);
      }

      var aElement = null;

      if (this.ui.button) {
        if (ui.children.length === 1) {
          var _ui$children$splice = ui.children.splice(0, 1);

          var _ui$children$splice2 = _slicedToArray(_ui$children$splice, 1);

          aElement = _ui$children$splice2[0];
        }

        Object.assign(ui.attributes.style, borderStyle);
      } else {
        Object.assign(style, borderStyle);
      }

      children.push(ui);

      if (this.value) {
        if (this.ui.imageEdit) {
          ui.children.push(this.value[_xfa_object.$toHTML]().html);
        } else if (!this.ui.button) {
          var _value6 = "";

          if (this.value.exData) {
            _value6 = this.value.exData[_xfa_object.$text]();
          } else if (this.value.text) {
            _value6 = this.value.text[_xfa_object.$getExtra]();
          } else {
            var htmlValue = this.value[_xfa_object.$toHTML]().html;

            if (htmlValue !== null) {
              _value6 = htmlValue.children[0].value;
            }
          }

          if (this.ui.textEdit && this.value.text && this.value.text.maxChars) {
            ui.children[0].attributes.maxLength = this.value.text.maxChars;
          }

          if (_value6) {
            if (this.ui.numericEdit) {
              _value6 = parseFloat(_value6);
              _value6 = isNaN(_value6) ? "" : _value6.toString();
            }

            if (ui.children[0].name === "textarea") {
              ui.children[0].attributes.textContent = _value6;
            } else {
              ui.children[0].attributes.value = _value6;
            }
          }
        }
      }

      if (!this.ui.imageEdit && ui.children && ui.children[0] && this.h) {
        borderDims = borderDims || getBorderDims(this.ui[_xfa_object.$getExtra]());
        var captionHeight = 0;

        if (this.caption && ["top", "bottom"].includes(this.caption.placement)) {
          captionHeight = this.caption.reserve;

          if (captionHeight <= 0) {
            captionHeight = this.caption[_xfa_object.$getExtra](availableSpace).h;
          }

          var inputHeight = this.h - captionHeight - marginV - borderDims.h;
          ui.children[0].attributes.style.height = (0, _html_utils.measureToString)(inputHeight);
        } else {
          ui.children[0].attributes.style.height = "100%";
        }
      }

      if (aElement) {
        ui.children.push(aElement);
      }

      if (!caption) {
        if (ui.attributes["class"]) {
          ui.attributes["class"].push("xfaLeft");
        }

        this.w = savedW;
        this.h = savedH;
        return _utils.HTMLResult.success((0, _html_utils.createWrapper)(this, html), bbox);
      }

      if (this.ui.button) {
        if (style.padding) {
          delete style.padding;
        }

        if (caption.name === "div") {
          caption.name = "span";
        }

        ui.children.push(caption);
        return _utils.HTMLResult.success(html, bbox);
      } else if (this.ui.checkButton) {
        caption.attributes["class"][0] = "xfaCaptionForCheckButton";
      }

      if (!ui.attributes["class"]) {
        ui.attributes["class"] = [];
      }

      ui.children.splice(0, 0, caption);

      switch (this.caption.placement) {
        case "left":
          ui.attributes["class"].push("xfaLeft");
          break;

        case "right":
          ui.attributes["class"].push("xfaRight");
          break;

        case "top":
          ui.attributes["class"].push("xfaTop");
          break;

        case "bottom":
          ui.attributes["class"].push("xfaBottom");
          break;

        case "inline":
          ui.attributes["class"].push("xfaLeft");
          break;
      }

      this.w = savedW;
      this.h = savedH;
      return _utils.HTMLResult.success((0, _html_utils.createWrapper)(this, html), bbox);
    }
  }]);

  return Field;
}(_xfa_object.XFAObject);

exports.Field = Field;

var Fill = /*#__PURE__*/function (_XFAObject40) {
  _inherits(Fill, _XFAObject40);

  var _super50 = _createSuper(Fill);

  function Fill(attributes) {
    var _this50;

    _classCallCheck(this, Fill);

    _this50 = _super50.call(this, TEMPLATE_NS_ID, "fill", true);
    _this50.id = attributes.id || "";
    _this50.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    _this50.use = attributes.use || "";
    _this50.usehref = attributes.usehref || "";
    _this50.color = null;
    _this50.extras = null;
    _this50.linear = null;
    _this50.pattern = null;
    _this50.radial = null;
    _this50.solid = null;
    _this50.stipple = null;
    return _this50;
  }

  _createClass(Fill, [{
    key: _xfa_object.$toStyle,
    value: function value() {
      var parent = this[_xfa_object.$getParent]();

      var grandpa = parent[_xfa_object.$getParent]();

      var ggrandpa = grandpa[_xfa_object.$getParent]();

      var style = Object.create(null);
      var propName = "color";
      var altPropName = propName;

      if (parent instanceof Border) {
        propName = "background-color";
        altPropName = "background";

        if (ggrandpa instanceof Ui) {
          style.backgroundColor = "white";
        }
      }

      if (parent instanceof Rectangle || parent instanceof Arc) {
        propName = altPropName = "fill";
        style.fill = "white";
      }

      var _iterator5 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var name = _step5.value;

          if (name === "extras" || name === "color") {
            continue;
          }

          var obj = this[name];

          if (!(obj instanceof _xfa_object.XFAObject)) {
            continue;
          }

          var _color = obj[_xfa_object.$toStyle](this.color);

          if (_color) {
            style[_color.startsWith("#") ? propName : altPropName] = _color;
          }

          return style;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      if (this.color && this.color.value) {
        var color = this.color[_xfa_object.$toStyle]();

        style[color.startsWith("#") ? propName : altPropName] = color;
      }

      return style;
    }
  }]);

  return Fill;
}(_xfa_object.XFAObject);

var Filter = /*#__PURE__*/function (_XFAObject41) {
  _inherits(Filter, _XFAObject41);

  var _super51 = _createSuper(Filter);

  function Filter(attributes) {
    var _this51;

    _classCallCheck(this, Filter);

    _this51 = _super51.call(this, TEMPLATE_NS_ID, "filter", true);
    _this51.addRevocationInfo = (0, _utils.getStringOption)(attributes.addRevocationInfo, ["", "required", "optional", "none"]);
    _this51.id = attributes.id || "";
    _this51.name = attributes.name || "";
    _this51.use = attributes.use || "";
    _this51.usehref = attributes.usehref || "";
    _this51.version = (0, _utils.getInteger)({
      data: _this51.version,
      defaultValue: 5,
      validate: function validate(x) {
        return x >= 1 && x <= 5;
      }
    });
    _this51.appearanceFilter = null;
    _this51.certificates = null;
    _this51.digestMethods = null;
    _this51.encodings = null;
    _this51.encryptionMethods = null;
    _this51.handler = null;
    _this51.lockDocument = null;
    _this51.mdp = null;
    _this51.reasons = null;
    _this51.timeStamp = null;
    return _this51;
  }

  return Filter;
}(_xfa_object.XFAObject);

var Float = /*#__PURE__*/function (_ContentObject5) {
  _inherits(Float, _ContentObject5);

  var _super52 = _createSuper(Float);

  function Float(attributes) {
    var _this52;

    _classCallCheck(this, Float);

    _this52 = _super52.call(this, TEMPLATE_NS_ID, "float");
    _this52.id = attributes.id || "";
    _this52.name = attributes.name || "";
    _this52.use = attributes.use || "";
    _this52.usehref = attributes.usehref || "";
    return _this52;
  }

  _createClass(Float, [{
    key: _xfa_object.$finalize,
    value: function value() {
      var number = parseFloat(this[_xfa_object.$content].trim());
      this[_xfa_object.$content] = isNaN(number) ? null : number;
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      return valueToHtml(this[_xfa_object.$content] !== null ? this[_xfa_object.$content].toString() : "");
    }
  }]);

  return Float;
}(_xfa_object.ContentObject);

var Font = /*#__PURE__*/function (_XFAObject42) {
  _inherits(Font, _XFAObject42);

  var _super53 = _createSuper(Font);

  function Font(attributes) {
    var _this53;

    _classCallCheck(this, Font);

    _this53 = _super53.call(this, TEMPLATE_NS_ID, "font", true);
    _this53.baselineShift = (0, _utils.getMeasurement)(attributes.baselineShift);
    _this53.fontHorizontalScale = (0, _utils.getFloat)({
      data: attributes.fontHorizontalScale,
      defaultValue: 100,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this53.fontVerticalScale = (0, _utils.getFloat)({
      data: attributes.fontVerticalScale,
      defaultValue: 100,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this53.id = attributes.id || "";
    _this53.kerningMode = (0, _utils.getStringOption)(attributes.kerningMode, ["none", "pair"]);
    _this53.letterSpacing = (0, _utils.getMeasurement)(attributes.letterSpacing, "0");
    _this53.lineThrough = (0, _utils.getInteger)({
      data: attributes.lineThrough,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1 || x === 2;
      }
    });
    _this53.lineThroughPeriod = (0, _utils.getStringOption)(attributes.lineThroughPeriod, ["all", "word"]);
    _this53.overline = (0, _utils.getInteger)({
      data: attributes.overline,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1 || x === 2;
      }
    });
    _this53.overlinePeriod = (0, _utils.getStringOption)(attributes.overlinePeriod, ["all", "word"]);
    _this53.posture = (0, _utils.getStringOption)(attributes.posture, ["normal", "italic"]);
    _this53.size = (0, _utils.getMeasurement)(attributes.size, "10pt");
    _this53.typeface = attributes.typeface || "Courier";
    _this53.underline = (0, _utils.getInteger)({
      data: attributes.underline,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1 || x === 2;
      }
    });
    _this53.underlinePeriod = (0, _utils.getStringOption)(attributes.underlinePeriod, ["all", "word"]);
    _this53.use = attributes.use || "";
    _this53.usehref = attributes.usehref || "";
    _this53.weight = (0, _utils.getStringOption)(attributes.weight, ["normal", "bold"]);
    _this53.extras = null;
    _this53.fill = null;
    return _this53;
  }

  _createClass(Font, [{
    key: _xfa_object.$clean,
    value: function value(builder) {
      _get(_getPrototypeOf(Font.prototype), _xfa_object.$clean, this).call(this, builder);

      this[_xfa_object.$globalData].usedTypefaces.add(this.typeface);
    }
  }, {
    key: _xfa_object.$toStyle,
    value: function value() {
      var style = (0, _html_utils.toStyle)(this, "fill");
      var color = style.color;

      if (color) {
        if (color === "#000000") {
          delete style.color;
        } else if (!color.startsWith("#")) {
          style.background = color;
          style.backgroundClip = "text";
          style.color = "transparent";
        }
      }

      if (this.baselineShift) {
        style.verticalAlign = (0, _html_utils.measureToString)(this.baselineShift);
      }

      style.fontKerning = this.kerningMode === "none" ? "none" : "normal";
      style.letterSpacing = (0, _html_utils.measureToString)(this.letterSpacing);

      if (this.lineThrough !== 0) {
        style.textDecoration = "line-through";

        if (this.lineThrough === 2) {
          style.textDecorationStyle = "double";
        }
      }

      if (this.overline !== 0) {
        style.textDecoration = "overline";

        if (this.overline === 2) {
          style.textDecorationStyle = "double";
        }
      }

      style.fontStyle = this.posture;
      style.fontSize = (0, _html_utils.measureToString)(0.99 * this.size);
      (0, _html_utils.setFontFamily)(this, this, this[_xfa_object.$globalData].fontFinder, style);

      if (this.underline !== 0) {
        style.textDecoration = "underline";

        if (this.underline === 2) {
          style.textDecorationStyle = "double";
        }
      }

      style.fontWeight = this.weight;
      return style;
    }
  }]);

  return Font;
}(_xfa_object.XFAObject);

var Format = /*#__PURE__*/function (_XFAObject43) {
  _inherits(Format, _XFAObject43);

  var _super54 = _createSuper(Format);

  function Format(attributes) {
    var _this54;

    _classCallCheck(this, Format);

    _this54 = _super54.call(this, TEMPLATE_NS_ID, "format", true);
    _this54.id = attributes.id || "";
    _this54.use = attributes.use || "";
    _this54.usehref = attributes.usehref || "";
    _this54.extras = null;
    _this54.picture = null;
    return _this54;
  }

  return Format;
}(_xfa_object.XFAObject);

var Handler = /*#__PURE__*/function (_StringObject3) {
  _inherits(Handler, _StringObject3);

  var _super55 = _createSuper(Handler);

  function Handler(attributes) {
    var _this55;

    _classCallCheck(this, Handler);

    _this55 = _super55.call(this, TEMPLATE_NS_ID, "handler");
    _this55.id = attributes.id || "";
    _this55.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this55.use = attributes.use || "";
    _this55.usehref = attributes.usehref || "";
    return _this55;
  }

  return Handler;
}(_xfa_object.StringObject);

var Hyphenation = /*#__PURE__*/function (_XFAObject44) {
  _inherits(Hyphenation, _XFAObject44);

  var _super56 = _createSuper(Hyphenation);

  function Hyphenation(attributes) {
    var _this56;

    _classCallCheck(this, Hyphenation);

    _this56 = _super56.call(this, TEMPLATE_NS_ID, "hyphenation");
    _this56.excludeAllCaps = (0, _utils.getInteger)({
      data: attributes.excludeAllCaps,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this56.excludeInitialCap = (0, _utils.getInteger)({
      data: attributes.excludeInitialCap,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this56.hyphenate = (0, _utils.getInteger)({
      data: attributes.hyphenate,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this56.id = attributes.id || "";
    _this56.pushCharacterCount = (0, _utils.getInteger)({
      data: attributes.pushCharacterCount,
      defaultValue: 3,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this56.remainCharacterCount = (0, _utils.getInteger)({
      data: attributes.remainCharacterCount,
      defaultValue: 3,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this56.use = attributes.use || "";
    _this56.usehref = attributes.usehref || "";
    _this56.wordCharacterCount = (0, _utils.getInteger)({
      data: attributes.wordCharacterCount,
      defaultValue: 7,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    return _this56;
  }

  return Hyphenation;
}(_xfa_object.XFAObject);

var Image = /*#__PURE__*/function (_StringObject4) {
  _inherits(Image, _StringObject4);

  var _super57 = _createSuper(Image);

  function Image(attributes) {
    var _this57;

    _classCallCheck(this, Image);

    _this57 = _super57.call(this, TEMPLATE_NS_ID, "image");
    _this57.aspect = (0, _utils.getStringOption)(attributes.aspect, ["fit", "actual", "height", "none", "width"]);
    _this57.contentType = attributes.contentType || "";
    _this57.href = attributes.href || "";
    _this57.id = attributes.id || "";
    _this57.name = attributes.name || "";
    _this57.transferEncoding = (0, _utils.getStringOption)(attributes.transferEncoding, ["base64", "none", "package"]);
    _this57.use = attributes.use || "";
    _this57.usehref = attributes.usehref || "";
    return _this57;
  }

  _createClass(Image, [{
    key: _xfa_object.$toHTML,
    value: function value() {
      if (this.contentType && !MIMES.has(this.contentType.toLowerCase())) {
        return _utils.HTMLResult.EMPTY;
      }

      var buffer = this[_xfa_object.$globalData].images && this[_xfa_object.$globalData].images.get(this.href);

      if (!buffer && (this.href || !this[_xfa_object.$content])) {
        return _utils.HTMLResult.EMPTY;
      }

      if (!buffer && this.transferEncoding === "base64") {
        buffer = (0, _util.stringToBytes)(atob(this[_xfa_object.$content]));
      }

      if (!buffer) {
        return _utils.HTMLResult.EMPTY;
      }

      if (!this.contentType) {
        var _iterator6 = _createForOfIteratorHelper(IMAGES_HEADERS),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _step6$value = _slicedToArray(_step6.value, 2),
                header = _step6$value[0],
                type = _step6$value[1];

            if (buffer.length > header.length && header.every(function (x, i) {
              return x === buffer[i];
            })) {
              this.contentType = type;
              break;
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        if (!this.contentType) {
          return _utils.HTMLResult.EMPTY;
        }
      }

      var blob = new Blob([buffer], {
        type: this.contentType
      });
      var style;

      switch (this.aspect) {
        case "fit":
        case "actual":
          break;

        case "height":
          style = {
            height: "100%",
            objectFit: "fill"
          };
          break;

        case "none":
          style = {
            width: "100%",
            height: "100%",
            objectFit: "fill"
          };
          break;

        case "width":
          style = {
            width: "100%",
            objectFit: "fill"
          };
          break;
      }

      var parent = this[_xfa_object.$getParent]();

      return _utils.HTMLResult.success({
        name: "img",
        attributes: {
          "class": ["xfaImage"],
          style: style,
          src: URL.createObjectURL(blob),
          alt: parent ? ariaLabel(parent[_xfa_object.$getParent]()) : null
        }
      });
    }
  }]);

  return Image;
}(_xfa_object.StringObject);

var ImageEdit = /*#__PURE__*/function (_XFAObject45) {
  _inherits(ImageEdit, _XFAObject45);

  var _super58 = _createSuper(ImageEdit);

  function ImageEdit(attributes) {
    var _this58;

    _classCallCheck(this, ImageEdit);

    _this58 = _super58.call(this, TEMPLATE_NS_ID, "imageEdit", true);
    _this58.data = (0, _utils.getStringOption)(attributes.data, ["link", "embed"]);
    _this58.id = attributes.id || "";
    _this58.use = attributes.use || "";
    _this58.usehref = attributes.usehref || "";
    _this58.border = null;
    _this58.extras = null;
    _this58.margin = null;
    return _this58;
  }

  _createClass(ImageEdit, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      if (this.data === "embed") {
        return _utils.HTMLResult.success({
          name: "div",
          children: [],
          attributes: {}
        });
      }

      return _utils.HTMLResult.EMPTY;
    }
  }]);

  return ImageEdit;
}(_xfa_object.XFAObject);

var Integer = /*#__PURE__*/function (_ContentObject6) {
  _inherits(Integer, _ContentObject6);

  var _super59 = _createSuper(Integer);

  function Integer(attributes) {
    var _this59;

    _classCallCheck(this, Integer);

    _this59 = _super59.call(this, TEMPLATE_NS_ID, "integer");
    _this59.id = attributes.id || "";
    _this59.name = attributes.name || "";
    _this59.use = attributes.use || "";
    _this59.usehref = attributes.usehref || "";
    return _this59;
  }

  _createClass(Integer, [{
    key: _xfa_object.$finalize,
    value: function value() {
      var number = parseInt(this[_xfa_object.$content].trim(), 10);
      this[_xfa_object.$content] = isNaN(number) ? null : number;
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      return valueToHtml(this[_xfa_object.$content] !== null ? this[_xfa_object.$content].toString() : "");
    }
  }]);

  return Integer;
}(_xfa_object.ContentObject);

var Issuers = /*#__PURE__*/function (_XFAObject46) {
  _inherits(Issuers, _XFAObject46);

  var _super60 = _createSuper(Issuers);

  function Issuers(attributes) {
    var _this60;

    _classCallCheck(this, Issuers);

    _this60 = _super60.call(this, TEMPLATE_NS_ID, "issuers", true);
    _this60.id = attributes.id || "";
    _this60.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this60.use = attributes.use || "";
    _this60.usehref = attributes.usehref || "";
    _this60.certificate = new _xfa_object.XFAObjectArray();
    return _this60;
  }

  return Issuers;
}(_xfa_object.XFAObject);

var Items = /*#__PURE__*/function (_XFAObject47) {
  _inherits(Items, _XFAObject47);

  var _super61 = _createSuper(Items);

  function Items(attributes) {
    var _this61;

    _classCallCheck(this, Items);

    _this61 = _super61.call(this, TEMPLATE_NS_ID, "items", true);
    _this61.id = attributes.id || "";
    _this61.name = attributes.name || "";
    _this61.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    _this61.ref = attributes.ref || "";
    _this61.save = (0, _utils.getInteger)({
      data: attributes.save,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this61.use = attributes.use || "";
    _this61.usehref = attributes.usehref || "";
    _this61["boolean"] = new _xfa_object.XFAObjectArray();
    _this61.date = new _xfa_object.XFAObjectArray();
    _this61.dateTime = new _xfa_object.XFAObjectArray();
    _this61.decimal = new _xfa_object.XFAObjectArray();
    _this61.exData = new _xfa_object.XFAObjectArray();
    _this61["float"] = new _xfa_object.XFAObjectArray();
    _this61.image = new _xfa_object.XFAObjectArray();
    _this61.integer = new _xfa_object.XFAObjectArray();
    _this61.text = new _xfa_object.XFAObjectArray();
    _this61.time = new _xfa_object.XFAObjectArray();
    return _this61;
  }

  _createClass(Items, [{
    key: _xfa_object.$toHTML,
    value: function value() {
      var output = [];

      var _iterator7 = _createForOfIteratorHelper(this[_xfa_object.$getChildren]()),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var child = _step7.value;
          output.push(child[_xfa_object.$text]());
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      return _utils.HTMLResult.success(output);
    }
  }]);

  return Items;
}(_xfa_object.XFAObject);

exports.Items = Items;

var Keep = /*#__PURE__*/function (_XFAObject48) {
  _inherits(Keep, _XFAObject48);

  var _super62 = _createSuper(Keep);

  function Keep(attributes) {
    var _this62;

    _classCallCheck(this, Keep);

    _this62 = _super62.call(this, TEMPLATE_NS_ID, "keep", true);
    _this62.id = attributes.id || "";
    var options = ["none", "contentArea", "pageArea"];
    _this62.intact = (0, _utils.getStringOption)(attributes.intact, options);
    _this62.next = (0, _utils.getStringOption)(attributes.next, options);
    _this62.previous = (0, _utils.getStringOption)(attributes.previous, options);
    _this62.use = attributes.use || "";
    _this62.usehref = attributes.usehref || "";
    _this62.extras = null;
    return _this62;
  }

  return Keep;
}(_xfa_object.XFAObject);

var KeyUsage = /*#__PURE__*/function (_XFAObject49) {
  _inherits(KeyUsage, _XFAObject49);

  var _super63 = _createSuper(KeyUsage);

  function KeyUsage(attributes) {
    var _this63;

    _classCallCheck(this, KeyUsage);

    _this63 = _super63.call(this, TEMPLATE_NS_ID, "keyUsage");
    var options = ["", "yes", "no"];
    _this63.crlSign = (0, _utils.getStringOption)(attributes.crlSign, options);
    _this63.dataEncipherment = (0, _utils.getStringOption)(attributes.dataEncipherment, options);
    _this63.decipherOnly = (0, _utils.getStringOption)(attributes.decipherOnly, options);
    _this63.digitalSignature = (0, _utils.getStringOption)(attributes.digitalSignature, options);
    _this63.encipherOnly = (0, _utils.getStringOption)(attributes.encipherOnly, options);
    _this63.id = attributes.id || "";
    _this63.keyAgreement = (0, _utils.getStringOption)(attributes.keyAgreement, options);
    _this63.keyCertSign = (0, _utils.getStringOption)(attributes.keyCertSign, options);
    _this63.keyEncipherment = (0, _utils.getStringOption)(attributes.keyEncipherment, options);
    _this63.nonRepudiation = (0, _utils.getStringOption)(attributes.nonRepudiation, options);
    _this63.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this63.use = attributes.use || "";
    _this63.usehref = attributes.usehref || "";
    return _this63;
  }

  return KeyUsage;
}(_xfa_object.XFAObject);

var Line = /*#__PURE__*/function (_XFAObject50) {
  _inherits(Line, _XFAObject50);

  var _super64 = _createSuper(Line);

  function Line(attributes) {
    var _this64;

    _classCallCheck(this, Line);

    _this64 = _super64.call(this, TEMPLATE_NS_ID, "line", true);
    _this64.hand = (0, _utils.getStringOption)(attributes.hand, ["even", "left", "right"]);
    _this64.id = attributes.id || "";
    _this64.slope = (0, _utils.getStringOption)(attributes.slope, ["\\", "/"]);
    _this64.use = attributes.use || "";
    _this64.usehref = attributes.usehref || "";
    _this64.edge = null;
    return _this64;
  }

  _createClass(Line, [{
    key: _xfa_object.$toHTML,
    value: function value() {
      var parent = this[_xfa_object.$getParent]()[_xfa_object.$getParent]();

      var edge = this.edge ? this.edge : new Edge({});

      var edgeStyle = edge[_xfa_object.$toStyle]();

      var style = Object.create(null);
      var thickness = edge.presence === "visible" ? edge.thickness : 0;
      style.strokeWidth = (0, _html_utils.measureToString)(thickness);
      style.stroke = edgeStyle.color;
      var x1, y1, x2, y2;
      var width = "100%";
      var height = "100%";

      if (parent.w <= thickness) {
        x1 = "50%";
        y1 = 0;
        x2 = "50%";
        y2 = "100%";
        width = style.strokeWidth;
      } else if (parent.h <= thickness) {
        x1 = 0;
        y1 = "50%";
        x2 = "100%";
        y2 = "50%";
        height = style.strokeWidth;
      } else {
        if (this.slope === "\\") {
          x1 = 0;
          y1 = 0;
          x2 = "100%";
          y2 = "100%";
        } else {
          x1 = 0;
          y1 = "100%";
          x2 = "100%";
          y2 = 0;
        }
      }

      var line = {
        name: "line",
        attributes: {
          xmlns: SVG_NS,
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          style: style
        }
      };
      var svg = {
        name: "svg",
        children: [line],
        attributes: {
          xmlns: SVG_NS,
          width: width,
          height: height,
          style: {
            overflow: "visible"
          }
        }
      };

      if (hasMargin(parent)) {
        return _utils.HTMLResult.success({
          name: "div",
          attributes: {
            style: {
              display: "inline",
              width: "100%",
              height: "100%"
            }
          },
          children: [svg]
        });
      }

      svg.attributes.style.position = "absolute";
      return _utils.HTMLResult.success(svg);
    }
  }]);

  return Line;
}(_xfa_object.XFAObject);

var Linear = /*#__PURE__*/function (_XFAObject51) {
  _inherits(Linear, _XFAObject51);

  var _super65 = _createSuper(Linear);

  function Linear(attributes) {
    var _this65;

    _classCallCheck(this, Linear);

    _this65 = _super65.call(this, TEMPLATE_NS_ID, "linear", true);
    _this65.id = attributes.id || "";
    _this65.type = (0, _utils.getStringOption)(attributes.type, ["toRight", "toBottom", "toLeft", "toTop"]);
    _this65.use = attributes.use || "";
    _this65.usehref = attributes.usehref || "";
    _this65.color = null;
    _this65.extras = null;
    return _this65;
  }

  _createClass(Linear, [{
    key: _xfa_object.$toStyle,
    value: function value(startColor) {
      startColor = startColor ? startColor[_xfa_object.$toStyle]() : "#FFFFFF";
      var transf = this.type.replace(/([RBLT])/, " $1").toLowerCase();
      var endColor = this.color ? this.color[_xfa_object.$toStyle]() : "#000000";
      return "linear-gradient(".concat(transf, ", ").concat(startColor, ", ").concat(endColor, ")");
    }
  }]);

  return Linear;
}(_xfa_object.XFAObject);

var LockDocument = /*#__PURE__*/function (_ContentObject7) {
  _inherits(LockDocument, _ContentObject7);

  var _super66 = _createSuper(LockDocument);

  function LockDocument(attributes) {
    var _this66;

    _classCallCheck(this, LockDocument);

    _this66 = _super66.call(this, TEMPLATE_NS_ID, "lockDocument");
    _this66.id = attributes.id || "";
    _this66.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this66.use = attributes.use || "";
    _this66.usehref = attributes.usehref || "";
    return _this66;
  }

  _createClass(LockDocument, [{
    key: _xfa_object.$finalize,
    value: function value() {
      this[_xfa_object.$content] = (0, _utils.getStringOption)(this[_xfa_object.$content], ["auto", "0", "1"]);
    }
  }]);

  return LockDocument;
}(_xfa_object.ContentObject);

var Manifest = /*#__PURE__*/function (_XFAObject52) {
  _inherits(Manifest, _XFAObject52);

  var _super67 = _createSuper(Manifest);

  function Manifest(attributes) {
    var _this67;

    _classCallCheck(this, Manifest);

    _this67 = _super67.call(this, TEMPLATE_NS_ID, "manifest", true);
    _this67.action = (0, _utils.getStringOption)(attributes.action, ["include", "all", "exclude"]);
    _this67.id = attributes.id || "";
    _this67.name = attributes.name || "";
    _this67.use = attributes.use || "";
    _this67.usehref = attributes.usehref || "";
    _this67.extras = null;
    _this67.ref = new _xfa_object.XFAObjectArray();
    return _this67;
  }

  return Manifest;
}(_xfa_object.XFAObject);

var Margin = /*#__PURE__*/function (_XFAObject53) {
  _inherits(Margin, _XFAObject53);

  var _super68 = _createSuper(Margin);

  function Margin(attributes) {
    var _this68;

    _classCallCheck(this, Margin);

    _this68 = _super68.call(this, TEMPLATE_NS_ID, "margin", true);
    _this68.bottomInset = (0, _utils.getMeasurement)(attributes.bottomInset, "0");
    _this68.id = attributes.id || "";
    _this68.leftInset = (0, _utils.getMeasurement)(attributes.leftInset, "0");
    _this68.rightInset = (0, _utils.getMeasurement)(attributes.rightInset, "0");
    _this68.topInset = (0, _utils.getMeasurement)(attributes.topInset, "0");
    _this68.use = attributes.use || "";
    _this68.usehref = attributes.usehref || "";
    _this68.extras = null;
    return _this68;
  }

  _createClass(Margin, [{
    key: _xfa_object.$toStyle,
    value: function value() {
      return {
        margin: (0, _html_utils.measureToString)(this.topInset) + " " + (0, _html_utils.measureToString)(this.rightInset) + " " + (0, _html_utils.measureToString)(this.bottomInset) + " " + (0, _html_utils.measureToString)(this.leftInset)
      };
    }
  }]);

  return Margin;
}(_xfa_object.XFAObject);

var Mdp = /*#__PURE__*/function (_XFAObject54) {
  _inherits(Mdp, _XFAObject54);

  var _super69 = _createSuper(Mdp);

  function Mdp(attributes) {
    var _this69;

    _classCallCheck(this, Mdp);

    _this69 = _super69.call(this, TEMPLATE_NS_ID, "mdp");
    _this69.id = attributes.id || "";
    _this69.permissions = (0, _utils.getInteger)({
      data: attributes.permissions,
      defaultValue: 2,
      validate: function validate(x) {
        return x === 1 || x === 3;
      }
    });
    _this69.signatureType = (0, _utils.getStringOption)(attributes.signatureType, ["filler", "author"]);
    _this69.use = attributes.use || "";
    _this69.usehref = attributes.usehref || "";
    return _this69;
  }

  return Mdp;
}(_xfa_object.XFAObject);

var Medium = /*#__PURE__*/function (_XFAObject55) {
  _inherits(Medium, _XFAObject55);

  var _super70 = _createSuper(Medium);

  function Medium(attributes) {
    var _this70;

    _classCallCheck(this, Medium);

    _this70 = _super70.call(this, TEMPLATE_NS_ID, "medium");
    _this70.id = attributes.id || "";
    _this70.imagingBBox = (0, _utils.getBBox)(attributes.imagingBBox);
    _this70["long"] = (0, _utils.getMeasurement)(attributes["long"]);
    _this70.orientation = (0, _utils.getStringOption)(attributes.orientation, ["portrait", "landscape"]);
    _this70["short"] = (0, _utils.getMeasurement)(attributes["short"]);
    _this70.stock = attributes.stock || "";
    _this70.trayIn = (0, _utils.getStringOption)(attributes.trayIn, ["auto", "delegate", "pageFront"]);
    _this70.trayOut = (0, _utils.getStringOption)(attributes.trayOut, ["auto", "delegate"]);
    _this70.use = attributes.use || "";
    _this70.usehref = attributes.usehref || "";
    return _this70;
  }

  return Medium;
}(_xfa_object.XFAObject);

var Message = /*#__PURE__*/function (_XFAObject56) {
  _inherits(Message, _XFAObject56);

  var _super71 = _createSuper(Message);

  function Message(attributes) {
    var _this71;

    _classCallCheck(this, Message);

    _this71 = _super71.call(this, TEMPLATE_NS_ID, "message", true);
    _this71.id = attributes.id || "";
    _this71.use = attributes.use || "";
    _this71.usehref = attributes.usehref || "";
    _this71.text = new _xfa_object.XFAObjectArray();
    return _this71;
  }

  return Message;
}(_xfa_object.XFAObject);

var NumericEdit = /*#__PURE__*/function (_XFAObject57) {
  _inherits(NumericEdit, _XFAObject57);

  var _super72 = _createSuper(NumericEdit);

  function NumericEdit(attributes) {
    var _this72;

    _classCallCheck(this, NumericEdit);

    _this72 = _super72.call(this, TEMPLATE_NS_ID, "numericEdit", true);
    _this72.hScrollPolicy = (0, _utils.getStringOption)(attributes.hScrollPolicy, ["auto", "off", "on"]);
    _this72.id = attributes.id || "";
    _this72.use = attributes.use || "";
    _this72.usehref = attributes.usehref || "";
    _this72.border = null;
    _this72.comb = null;
    _this72.extras = null;
    _this72.margin = null;
    return _this72;
  }

  _createClass(NumericEdit, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var style = (0, _html_utils.toStyle)(this, "border", "font", "margin");

      var field = this[_xfa_object.$getParent]()[_xfa_object.$getParent]();

      var html = {
        name: "input",
        attributes: {
          type: "text",
          fieldId: field[_xfa_object.$uid],
          dataId: field[_xfa_object.$data] && field[_xfa_object.$data][_xfa_object.$uid] || field[_xfa_object.$uid],
          "class": ["xfaTextfield"],
          style: style,
          "aria-label": ariaLabel(field)
        }
      };
      return _utils.HTMLResult.success({
        name: "label",
        attributes: {
          "class": ["xfaLabel"]
        },
        children: [html]
      });
    }
  }]);

  return NumericEdit;
}(_xfa_object.XFAObject);

var Occur = /*#__PURE__*/function (_XFAObject58) {
  _inherits(Occur, _XFAObject58);

  var _super73 = _createSuper(Occur);

  function Occur(attributes) {
    var _this73;

    _classCallCheck(this, Occur);

    _this73 = _super73.call(this, TEMPLATE_NS_ID, "occur", true);
    _this73.id = attributes.id || "";
    _this73.initial = attributes.initial !== "" ? (0, _utils.getInteger)({
      data: attributes.initial,
      defaultValue: "",
      validate: function validate(x) {
        return true;
      }
    }) : "";
    _this73.max = attributes.max !== "" ? (0, _utils.getInteger)({
      data: attributes.max,
      defaultValue: 1,
      validate: function validate(x) {
        return true;
      }
    }) : "";
    _this73.min = attributes.min !== "" ? (0, _utils.getInteger)({
      data: attributes.min,
      defaultValue: 1,
      validate: function validate(x) {
        return true;
      }
    }) : "";
    _this73.use = attributes.use || "";
    _this73.usehref = attributes.usehref || "";
    _this73.extras = null;
    return _this73;
  }

  _createClass(Occur, [{
    key: _xfa_object.$clean,
    value: function value() {
      var parent = this[_xfa_object.$getParent]();

      var originalMin = this.min;

      if (this.min === "") {
        this.min = parent instanceof PageArea || parent instanceof PageSet ? 0 : 1;
      }

      if (this.max === "") {
        if (originalMin === "") {
          this.max = parent instanceof PageArea || parent instanceof PageSet ? -1 : 1;
        } else {
          this.max = this.min;
        }
      }

      if (this.max !== -1 && this.max < this.min) {
        this.max = this.min;
      }

      if (this.initial === "") {
        this.initial = parent instanceof Template ? 1 : this.min;
      }
    }
  }]);

  return Occur;
}(_xfa_object.XFAObject);

var Oid = /*#__PURE__*/function (_StringObject5) {
  _inherits(Oid, _StringObject5);

  var _super74 = _createSuper(Oid);

  function Oid(attributes) {
    var _this74;

    _classCallCheck(this, Oid);

    _this74 = _super74.call(this, TEMPLATE_NS_ID, "oid");
    _this74.id = attributes.id || "";
    _this74.name = attributes.name || "";
    _this74.use = attributes.use || "";
    _this74.usehref = attributes.usehref || "";
    return _this74;
  }

  return Oid;
}(_xfa_object.StringObject);

var Oids = /*#__PURE__*/function (_XFAObject59) {
  _inherits(Oids, _XFAObject59);

  var _super75 = _createSuper(Oids);

  function Oids(attributes) {
    var _this75;

    _classCallCheck(this, Oids);

    _this75 = _super75.call(this, TEMPLATE_NS_ID, "oids", true);
    _this75.id = attributes.id || "";
    _this75.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this75.use = attributes.use || "";
    _this75.usehref = attributes.usehref || "";
    _this75.oid = new _xfa_object.XFAObjectArray();
    return _this75;
  }

  return Oids;
}(_xfa_object.XFAObject);

var Overflow = /*#__PURE__*/function (_XFAObject60) {
  _inherits(Overflow, _XFAObject60);

  var _super76 = _createSuper(Overflow);

  function Overflow(attributes) {
    var _this76;

    _classCallCheck(this, Overflow);

    _this76 = _super76.call(this, TEMPLATE_NS_ID, "overflow");
    _this76.id = attributes.id || "";
    _this76.leader = attributes.leader || "";
    _this76.target = attributes.target || "";
    _this76.trailer = attributes.trailer || "";
    _this76.use = attributes.use || "";
    _this76.usehref = attributes.usehref || "";
    return _this76;
  }

  _createClass(Overflow, [{
    key: _xfa_object.$getExtra,
    value: function value() {
      if (!this[_xfa_object.$extra]) {
        var parent = this[_xfa_object.$getParent]();

        var root = this[_xfa_object.$getTemplateRoot]();

        var target = root[_xfa_object.$searchNode](this.target, parent);

        var leader = root[_xfa_object.$searchNode](this.leader, parent);

        var trailer = root[_xfa_object.$searchNode](this.trailer, parent);

        this[_xfa_object.$extra] = {
          target: target && target[0] || null,
          leader: leader && leader[0] || null,
          trailer: trailer && trailer[0] || null,
          addLeader: false,
          addTrailer: false
        };
      }

      return this[_xfa_object.$extra];
    }
  }]);

  return Overflow;
}(_xfa_object.XFAObject);

var PageArea = /*#__PURE__*/function (_XFAObject61) {
  _inherits(PageArea, _XFAObject61);

  var _super77 = _createSuper(PageArea);

  function PageArea(attributes) {
    var _this77;

    _classCallCheck(this, PageArea);

    _this77 = _super77.call(this, TEMPLATE_NS_ID, "pageArea", true);
    _this77.blankOrNotBlank = (0, _utils.getStringOption)(attributes.blankOrNotBlank, ["any", "blank", "notBlank"]);
    _this77.id = attributes.id || "";
    _this77.initialNumber = (0, _utils.getInteger)({
      data: attributes.initialNumber,
      defaultValue: 1,
      validate: function validate(x) {
        return true;
      }
    });
    _this77.name = attributes.name || "";
    _this77.numbered = (0, _utils.getInteger)({
      data: attributes.numbered,
      defaultValue: 1,
      validate: function validate(x) {
        return true;
      }
    });
    _this77.oddOrEven = (0, _utils.getStringOption)(attributes.oddOrEven, ["any", "even", "odd"]);
    _this77.pagePosition = (0, _utils.getStringOption)(attributes.pagePosition, ["any", "first", "last", "only", "rest"]);
    _this77.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this77.use = attributes.use || "";
    _this77.usehref = attributes.usehref || "";
    _this77.desc = null;
    _this77.extras = null;
    _this77.medium = null;
    _this77.occur = null;
    _this77.area = new _xfa_object.XFAObjectArray();
    _this77.contentArea = new _xfa_object.XFAObjectArray();
    _this77.draw = new _xfa_object.XFAObjectArray();
    _this77.exclGroup = new _xfa_object.XFAObjectArray();
    _this77.field = new _xfa_object.XFAObjectArray();
    _this77.subform = new _xfa_object.XFAObjectArray();
    return _this77;
  }

  _createClass(PageArea, [{
    key: _xfa_object.$isUsable,
    value: function value() {
      if (!this[_xfa_object.$extra]) {
        this[_xfa_object.$extra] = {
          numberOfUse: 0
        };
        return true;
      }

      return !this.occur || this.occur.max === -1 || this[_xfa_object.$extra].numberOfUse < this.occur.max;
    }
  }, {
    key: _xfa_object.$cleanPage,
    value: function value() {
      delete this[_xfa_object.$extra];
    }
  }, {
    key: _xfa_object.$getNextPage,
    value: function value() {
      if (!this[_xfa_object.$extra]) {
        this[_xfa_object.$extra] = {
          numberOfUse: 0
        };
      }

      var parent = this[_xfa_object.$getParent]();

      if (parent.relation === "orderedOccurrence") {
        if (this[_xfa_object.$isUsable]()) {
          this[_xfa_object.$extra].numberOfUse += 1;
          return this;
        }
      }

      return parent[_xfa_object.$getNextPage]();
    }
  }, {
    key: _xfa_object.$getAvailableSpace,
    value: function value() {
      return this[_xfa_object.$extra].space || {
        width: 0,
        height: 0
      };
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value() {
      if (!this[_xfa_object.$extra]) {
        this[_xfa_object.$extra] = {
          numberOfUse: 1
        };
      }

      var children = [];
      this[_xfa_object.$extra].children = children;
      var style = Object.create(null);

      if (this.medium && this.medium["short"] && this.medium["long"]) {
        style.width = (0, _html_utils.measureToString)(this.medium["short"]);
        style.height = (0, _html_utils.measureToString)(this.medium["long"]);
        this[_xfa_object.$extra].space = {
          width: this.medium["short"],
          height: this.medium["long"]
        };

        if (this.medium.orientation === "landscape") {
          var x = style.width;
          style.width = style.height;
          style.height = x;
          this[_xfa_object.$extra].space = {
            width: this.medium["long"],
            height: this.medium["short"]
          };
        }
      } else {
        (0, _util.warn)("XFA - No medium specified in pageArea: please file a bug.");
      }

      this[_xfa_object.$childrenToHTML]({
        filter: new Set(["area", "draw", "field", "subform"]),
        include: true
      });

      this[_xfa_object.$childrenToHTML]({
        filter: new Set(["contentArea"]),
        include: true
      });

      return _utils.HTMLResult.success({
        name: "div",
        children: children,
        attributes: {
          "class": ["xfaPage"],
          id: this[_xfa_object.$uid],
          style: style,
          xfaName: this.name
        }
      });
    }
  }]);

  return PageArea;
}(_xfa_object.XFAObject);

var PageSet = /*#__PURE__*/function (_XFAObject62) {
  _inherits(PageSet, _XFAObject62);

  var _super78 = _createSuper(PageSet);

  function PageSet(attributes) {
    var _this78;

    _classCallCheck(this, PageSet);

    _this78 = _super78.call(this, TEMPLATE_NS_ID, "pageSet", true);
    _this78.duplexImposition = (0, _utils.getStringOption)(attributes.duplexImposition, ["longEdge", "shortEdge"]);
    _this78.id = attributes.id || "";
    _this78.name = attributes.name || "";
    _this78.relation = (0, _utils.getStringOption)(attributes.relation, ["orderedOccurrence", "duplexPaginated", "simplexPaginated"]);
    _this78.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this78.use = attributes.use || "";
    _this78.usehref = attributes.usehref || "";
    _this78.extras = null;
    _this78.occur = null;
    _this78.pageArea = new _xfa_object.XFAObjectArray();
    _this78.pageSet = new _xfa_object.XFAObjectArray();
    return _this78;
  }

  _createClass(PageSet, [{
    key: _xfa_object.$cleanPage,
    value: function value() {
      var _iterator8 = _createForOfIteratorHelper(this.pageArea.children),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var page = _step8.value;

          page[_xfa_object.$cleanPage]();
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      var _iterator9 = _createForOfIteratorHelper(this.pageSet.children),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var _page = _step9.value;

          _page[_xfa_object.$cleanPage]();
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  }, {
    key: _xfa_object.$isUsable,
    value: function value() {
      return !this.occur || this.occur.max === -1 || this[_xfa_object.$extra].numberOfUse < this.occur.max;
    }
  }, {
    key: _xfa_object.$getNextPage,
    value: function value() {
      if (!this[_xfa_object.$extra]) {
        this[_xfa_object.$extra] = {
          numberOfUse: 1,
          pageIndex: -1,
          pageSetIndex: -1
        };
      }

      if (this.relation === "orderedOccurrence") {
        if (this[_xfa_object.$extra].pageIndex + 1 < this.pageArea.children.length) {
          this[_xfa_object.$extra].pageIndex += 1;
          var pageArea = this.pageArea.children[this[_xfa_object.$extra].pageIndex];
          return pageArea[_xfa_object.$getNextPage]();
        }

        if (this[_xfa_object.$extra].pageSetIndex + 1 < this.pageSet.children.length) {
          this[_xfa_object.$extra].pageSetIndex += 1;
          return this.pageSet.children[this[_xfa_object.$extra].pageSetIndex][_xfa_object.$getNextPage]();
        }

        if (this[_xfa_object.$isUsable]()) {
          this[_xfa_object.$extra].numberOfUse += 1;
          this[_xfa_object.$extra].pageIndex = -1;
          this[_xfa_object.$extra].pageSetIndex = -1;
          return this[_xfa_object.$getNextPage]();
        }

        var parent = this[_xfa_object.$getParent]();

        if (parent instanceof PageSet) {
          return parent[_xfa_object.$getNextPage]();
        }

        this[_xfa_object.$cleanPage]();

        return this[_xfa_object.$getNextPage]();
      }

      var pageNumber = this[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].pageNumber;

      var parity = pageNumber % 2 === 0 ? "even" : "odd";
      var position = pageNumber === 0 ? "first" : "rest";
      var page = this.pageArea.children.find(function (p) {
        return p.oddOrEven === parity && p.pagePosition === position;
      });

      if (page) {
        return page;
      }

      page = this.pageArea.children.find(function (p) {
        return p.oddOrEven === "any" && p.pagePosition === position;
      });

      if (page) {
        return page;
      }

      page = this.pageArea.children.find(function (p) {
        return p.oddOrEven === "any" && p.pagePosition === "any";
      });

      if (page) {
        return page;
      }

      return this.pageArea.children[0];
    }
  }]);

  return PageSet;
}(_xfa_object.XFAObject);

var Para = /*#__PURE__*/function (_XFAObject63) {
  _inherits(Para, _XFAObject63);

  var _super79 = _createSuper(Para);

  function Para(attributes) {
    var _this79;

    _classCallCheck(this, Para);

    _this79 = _super79.call(this, TEMPLATE_NS_ID, "para", true);
    _this79.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    _this79.id = attributes.id || "";
    _this79.lineHeight = attributes.lineHeight ? (0, _utils.getMeasurement)(attributes.lineHeight, "0pt") : "";
    _this79.marginLeft = attributes.marginLeft ? (0, _utils.getMeasurement)(attributes.marginLeft, "0pt") : "";
    _this79.marginRight = attributes.marginRight ? (0, _utils.getMeasurement)(attributes.marginRight, "0pt") : "";
    _this79.orphans = (0, _utils.getInteger)({
      data: attributes.orphans,
      defaultValue: 0,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this79.preserve = attributes.preserve || "";
    _this79.radixOffset = attributes.radixOffset ? (0, _utils.getMeasurement)(attributes.radixOffset, "0pt") : "";
    _this79.spaceAbove = attributes.spaceAbove ? (0, _utils.getMeasurement)(attributes.spaceAbove, "0pt") : "";
    _this79.spaceBelow = attributes.spaceBelow ? (0, _utils.getMeasurement)(attributes.spaceBelow, "0pt") : "";
    _this79.tabDefault = attributes.tabDefault ? (0, _utils.getMeasurement)(_this79.tabDefault) : "";
    _this79.tabStops = (attributes.tabStops || "").trim().split(/\s+/).map(function (x, i) {
      return i % 2 === 1 ? (0, _utils.getMeasurement)(x) : x;
    });
    _this79.textIndent = attributes.textIndent ? (0, _utils.getMeasurement)(attributes.textIndent, "0pt") : "";
    _this79.use = attributes.use || "";
    _this79.usehref = attributes.usehref || "";
    _this79.vAlign = (0, _utils.getStringOption)(attributes.vAlign, ["top", "bottom", "middle"]);
    _this79.widows = (0, _utils.getInteger)({
      data: attributes.widows,
      defaultValue: 0,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this79.hyphenation = null;
    return _this79;
  }

  _createClass(Para, [{
    key: _xfa_object.$toStyle,
    value: function value() {
      var style = (0, _html_utils.toStyle)(this, "hAlign");

      if (this.marginLeft !== "") {
        style.paddingLeft = (0, _html_utils.measureToString)(this.marginLeft);
      }

      if (this.marginRight !== "") {
        style.paddingight = (0, _html_utils.measureToString)(this.marginRight);
      }

      if (this.spaceAbove !== "") {
        style.paddingTop = (0, _html_utils.measureToString)(this.spaceAbove);
      }

      if (this.spaceBelow !== "") {
        style.paddingBottom = (0, _html_utils.measureToString)(this.spaceBelow);
      }

      if (this.textIndent !== "") {
        style.textIndent = (0, _html_utils.measureToString)(this.textIndent);
        (0, _html_utils.fixTextIndent)(style);
      }

      if (this.lineHeight > 0) {
        style.lineHeight = (0, _html_utils.measureToString)(this.lineHeight);
      }

      if (this.tabDefault !== "") {
        style.tabSize = (0, _html_utils.measureToString)(this.tabDefault);
      }

      if (this.tabStops.length > 0) {}

      if (this.hyphenatation) {
        Object.assign(style, this.hyphenatation[_xfa_object.$toStyle]());
      }

      return style;
    }
  }]);

  return Para;
}(_xfa_object.XFAObject);

var PasswordEdit = /*#__PURE__*/function (_XFAObject64) {
  _inherits(PasswordEdit, _XFAObject64);

  var _super80 = _createSuper(PasswordEdit);

  function PasswordEdit(attributes) {
    var _this80;

    _classCallCheck(this, PasswordEdit);

    _this80 = _super80.call(this, TEMPLATE_NS_ID, "passwordEdit", true);
    _this80.hScrollPolicy = (0, _utils.getStringOption)(attributes.hScrollPolicy, ["auto", "off", "on"]);
    _this80.id = attributes.id || "";
    _this80.passwordChar = attributes.passwordChar || "*";
    _this80.use = attributes.use || "";
    _this80.usehref = attributes.usehref || "";
    _this80.border = null;
    _this80.extras = null;
    _this80.margin = null;
    return _this80;
  }

  return PasswordEdit;
}(_xfa_object.XFAObject);

var Pattern = /*#__PURE__*/function (_XFAObject65) {
  _inherits(Pattern, _XFAObject65);

  var _super81 = _createSuper(Pattern);

  function Pattern(attributes) {
    var _this81;

    _classCallCheck(this, Pattern);

    _this81 = _super81.call(this, TEMPLATE_NS_ID, "pattern", true);
    _this81.id = attributes.id || "";
    _this81.type = (0, _utils.getStringOption)(attributes.type, ["crossHatch", "crossDiagonal", "diagonalLeft", "diagonalRight", "horizontal", "vertical"]);
    _this81.use = attributes.use || "";
    _this81.usehref = attributes.usehref || "";
    _this81.color = null;
    _this81.extras = null;
    return _this81;
  }

  _createClass(Pattern, [{
    key: _xfa_object.$toStyle,
    value: function value(startColor) {
      startColor = startColor ? startColor[_xfa_object.$toStyle]() : "#FFFFFF";
      var endColor = this.color ? this.color[_xfa_object.$toStyle]() : "#000000";
      var width = 5;
      var cmd = "repeating-linear-gradient";
      var colors = "".concat(startColor, ",").concat(startColor, " ").concat(width, "px,").concat(endColor, " ").concat(width, "px,").concat(endColor, " ").concat(2 * width, "px");

      switch (this.type) {
        case "crossHatch":
          return "".concat(cmd, "(to top,").concat(colors, ") ").concat(cmd, "(to right,").concat(colors, ")");

        case "crossDiagonal":
          return "".concat(cmd, "(45deg,").concat(colors, ") ").concat(cmd, "(-45deg,").concat(colors, ")");

        case "diagonalLeft":
          return "".concat(cmd, "(45deg,").concat(colors, ")");

        case "diagonalRight":
          return "".concat(cmd, "(-45deg,").concat(colors, ")");

        case "horizontal":
          return "".concat(cmd, "(to top,").concat(colors, ")");

        case "vertical":
          return "".concat(cmd, "(to right,").concat(colors, ")");
      }

      return "";
    }
  }]);

  return Pattern;
}(_xfa_object.XFAObject);

var Picture = /*#__PURE__*/function (_StringObject6) {
  _inherits(Picture, _StringObject6);

  var _super82 = _createSuper(Picture);

  function Picture(attributes) {
    var _this82;

    _classCallCheck(this, Picture);

    _this82 = _super82.call(this, TEMPLATE_NS_ID, "picture");
    _this82.id = attributes.id || "";
    _this82.use = attributes.use || "";
    _this82.usehref = attributes.usehref || "";
    return _this82;
  }

  return Picture;
}(_xfa_object.StringObject);

var Proto = /*#__PURE__*/function (_XFAObject66) {
  _inherits(Proto, _XFAObject66);

  var _super83 = _createSuper(Proto);

  function Proto(attributes) {
    var _this83;

    _classCallCheck(this, Proto);

    _this83 = _super83.call(this, TEMPLATE_NS_ID, "proto", true);
    _this83.appearanceFilter = new _xfa_object.XFAObjectArray();
    _this83.arc = new _xfa_object.XFAObjectArray();
    _this83.area = new _xfa_object.XFAObjectArray();
    _this83.assist = new _xfa_object.XFAObjectArray();
    _this83.barcode = new _xfa_object.XFAObjectArray();
    _this83.bindItems = new _xfa_object.XFAObjectArray();
    _this83.bookend = new _xfa_object.XFAObjectArray();
    _this83["boolean"] = new _xfa_object.XFAObjectArray();
    _this83.border = new _xfa_object.XFAObjectArray();
    _this83["break"] = new _xfa_object.XFAObjectArray();
    _this83.breakAfter = new _xfa_object.XFAObjectArray();
    _this83.breakBefore = new _xfa_object.XFAObjectArray();
    _this83.button = new _xfa_object.XFAObjectArray();
    _this83.calculate = new _xfa_object.XFAObjectArray();
    _this83.caption = new _xfa_object.XFAObjectArray();
    _this83.certificate = new _xfa_object.XFAObjectArray();
    _this83.certificates = new _xfa_object.XFAObjectArray();
    _this83.checkButton = new _xfa_object.XFAObjectArray();
    _this83.choiceList = new _xfa_object.XFAObjectArray();
    _this83.color = new _xfa_object.XFAObjectArray();
    _this83.comb = new _xfa_object.XFAObjectArray();
    _this83.connect = new _xfa_object.XFAObjectArray();
    _this83.contentArea = new _xfa_object.XFAObjectArray();
    _this83.corner = new _xfa_object.XFAObjectArray();
    _this83.date = new _xfa_object.XFAObjectArray();
    _this83.dateTime = new _xfa_object.XFAObjectArray();
    _this83.dateTimeEdit = new _xfa_object.XFAObjectArray();
    _this83.decimal = new _xfa_object.XFAObjectArray();
    _this83.defaultUi = new _xfa_object.XFAObjectArray();
    _this83.desc = new _xfa_object.XFAObjectArray();
    _this83.digestMethod = new _xfa_object.XFAObjectArray();
    _this83.digestMethods = new _xfa_object.XFAObjectArray();
    _this83.draw = new _xfa_object.XFAObjectArray();
    _this83.edge = new _xfa_object.XFAObjectArray();
    _this83.encoding = new _xfa_object.XFAObjectArray();
    _this83.encodings = new _xfa_object.XFAObjectArray();
    _this83.encrypt = new _xfa_object.XFAObjectArray();
    _this83.encryptData = new _xfa_object.XFAObjectArray();
    _this83.encryption = new _xfa_object.XFAObjectArray();
    _this83.encryptionMethod = new _xfa_object.XFAObjectArray();
    _this83.encryptionMethods = new _xfa_object.XFAObjectArray();
    _this83.event = new _xfa_object.XFAObjectArray();
    _this83.exData = new _xfa_object.XFAObjectArray();
    _this83.exObject = new _xfa_object.XFAObjectArray();
    _this83.exclGroup = new _xfa_object.XFAObjectArray();
    _this83.execute = new _xfa_object.XFAObjectArray();
    _this83.extras = new _xfa_object.XFAObjectArray();
    _this83.field = new _xfa_object.XFAObjectArray();
    _this83.fill = new _xfa_object.XFAObjectArray();
    _this83.filter = new _xfa_object.XFAObjectArray();
    _this83["float"] = new _xfa_object.XFAObjectArray();
    _this83.font = new _xfa_object.XFAObjectArray();
    _this83.format = new _xfa_object.XFAObjectArray();
    _this83.handler = new _xfa_object.XFAObjectArray();
    _this83.hyphenation = new _xfa_object.XFAObjectArray();
    _this83.image = new _xfa_object.XFAObjectArray();
    _this83.imageEdit = new _xfa_object.XFAObjectArray();
    _this83.integer = new _xfa_object.XFAObjectArray();
    _this83.issuers = new _xfa_object.XFAObjectArray();
    _this83.items = new _xfa_object.XFAObjectArray();
    _this83.keep = new _xfa_object.XFAObjectArray();
    _this83.keyUsage = new _xfa_object.XFAObjectArray();
    _this83.line = new _xfa_object.XFAObjectArray();
    _this83.linear = new _xfa_object.XFAObjectArray();
    _this83.lockDocument = new _xfa_object.XFAObjectArray();
    _this83.manifest = new _xfa_object.XFAObjectArray();
    _this83.margin = new _xfa_object.XFAObjectArray();
    _this83.mdp = new _xfa_object.XFAObjectArray();
    _this83.medium = new _xfa_object.XFAObjectArray();
    _this83.message = new _xfa_object.XFAObjectArray();
    _this83.numericEdit = new _xfa_object.XFAObjectArray();
    _this83.occur = new _xfa_object.XFAObjectArray();
    _this83.oid = new _xfa_object.XFAObjectArray();
    _this83.oids = new _xfa_object.XFAObjectArray();
    _this83.overflow = new _xfa_object.XFAObjectArray();
    _this83.pageArea = new _xfa_object.XFAObjectArray();
    _this83.pageSet = new _xfa_object.XFAObjectArray();
    _this83.para = new _xfa_object.XFAObjectArray();
    _this83.passwordEdit = new _xfa_object.XFAObjectArray();
    _this83.pattern = new _xfa_object.XFAObjectArray();
    _this83.picture = new _xfa_object.XFAObjectArray();
    _this83.radial = new _xfa_object.XFAObjectArray();
    _this83.reason = new _xfa_object.XFAObjectArray();
    _this83.reasons = new _xfa_object.XFAObjectArray();
    _this83.rectangle = new _xfa_object.XFAObjectArray();
    _this83.ref = new _xfa_object.XFAObjectArray();
    _this83.script = new _xfa_object.XFAObjectArray();
    _this83.setProperty = new _xfa_object.XFAObjectArray();
    _this83.signData = new _xfa_object.XFAObjectArray();
    _this83.signature = new _xfa_object.XFAObjectArray();
    _this83.signing = new _xfa_object.XFAObjectArray();
    _this83.solid = new _xfa_object.XFAObjectArray();
    _this83.speak = new _xfa_object.XFAObjectArray();
    _this83.stipple = new _xfa_object.XFAObjectArray();
    _this83.subform = new _xfa_object.XFAObjectArray();
    _this83.subformSet = new _xfa_object.XFAObjectArray();
    _this83.subjectDN = new _xfa_object.XFAObjectArray();
    _this83.subjectDNs = new _xfa_object.XFAObjectArray();
    _this83.submit = new _xfa_object.XFAObjectArray();
    _this83.text = new _xfa_object.XFAObjectArray();
    _this83.textEdit = new _xfa_object.XFAObjectArray();
    _this83.time = new _xfa_object.XFAObjectArray();
    _this83.timeStamp = new _xfa_object.XFAObjectArray();
    _this83.toolTip = new _xfa_object.XFAObjectArray();
    _this83.traversal = new _xfa_object.XFAObjectArray();
    _this83.traverse = new _xfa_object.XFAObjectArray();
    _this83.ui = new _xfa_object.XFAObjectArray();
    _this83.validate = new _xfa_object.XFAObjectArray();
    _this83.value = new _xfa_object.XFAObjectArray();
    _this83.variables = new _xfa_object.XFAObjectArray();
    return _this83;
  }

  return Proto;
}(_xfa_object.XFAObject);

var Radial = /*#__PURE__*/function (_XFAObject67) {
  _inherits(Radial, _XFAObject67);

  var _super84 = _createSuper(Radial);

  function Radial(attributes) {
    var _this84;

    _classCallCheck(this, Radial);

    _this84 = _super84.call(this, TEMPLATE_NS_ID, "radial", true);
    _this84.id = attributes.id || "";
    _this84.type = (0, _utils.getStringOption)(attributes.type, ["toEdge", "toCenter"]);
    _this84.use = attributes.use || "";
    _this84.usehref = attributes.usehref || "";
    _this84.color = null;
    _this84.extras = null;
    return _this84;
  }

  _createClass(Radial, [{
    key: _xfa_object.$toStyle,
    value: function value(startColor) {
      startColor = startColor ? startColor[_xfa_object.$toStyle]() : "#FFFFFF";
      var endColor = this.color ? this.color[_xfa_object.$toStyle]() : "#000000";
      var colors = this.type === "toEdge" ? "".concat(startColor, ",").concat(endColor) : "".concat(endColor, ",").concat(startColor);
      return "radial-gradient(circle at center, ".concat(colors, ")");
    }
  }]);

  return Radial;
}(_xfa_object.XFAObject);

var Reason = /*#__PURE__*/function (_StringObject7) {
  _inherits(Reason, _StringObject7);

  var _super85 = _createSuper(Reason);

  function Reason(attributes) {
    var _this85;

    _classCallCheck(this, Reason);

    _this85 = _super85.call(this, TEMPLATE_NS_ID, "reason");
    _this85.id = attributes.id || "";
    _this85.name = attributes.name || "";
    _this85.use = attributes.use || "";
    _this85.usehref = attributes.usehref || "";
    return _this85;
  }

  return Reason;
}(_xfa_object.StringObject);

var Reasons = /*#__PURE__*/function (_XFAObject68) {
  _inherits(Reasons, _XFAObject68);

  var _super86 = _createSuper(Reasons);

  function Reasons(attributes) {
    var _this86;

    _classCallCheck(this, Reasons);

    _this86 = _super86.call(this, TEMPLATE_NS_ID, "reasons", true);
    _this86.id = attributes.id || "";
    _this86.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this86.use = attributes.use || "";
    _this86.usehref = attributes.usehref || "";
    _this86.reason = new _xfa_object.XFAObjectArray();
    return _this86;
  }

  return Reasons;
}(_xfa_object.XFAObject);

var Rectangle = /*#__PURE__*/function (_XFAObject69) {
  _inherits(Rectangle, _XFAObject69);

  var _super87 = _createSuper(Rectangle);

  function Rectangle(attributes) {
    var _this87;

    _classCallCheck(this, Rectangle);

    _this87 = _super87.call(this, TEMPLATE_NS_ID, "rectangle", true);
    _this87.hand = (0, _utils.getStringOption)(attributes.hand, ["even", "left", "right"]);
    _this87.id = attributes.id || "";
    _this87.use = attributes.use || "";
    _this87.usehref = attributes.usehref || "";
    _this87.corner = new _xfa_object.XFAObjectArray(4);
    _this87.edge = new _xfa_object.XFAObjectArray(4);
    _this87.fill = null;
    return _this87;
  }

  _createClass(Rectangle, [{
    key: _xfa_object.$toHTML,
    value: function value() {
      var edge = this.edge.children.length ? this.edge.children[0] : new Edge({});

      var edgeStyle = edge[_xfa_object.$toStyle]();

      var style = Object.create(null);

      if (this.fill && this.fill.presence === "visible") {
        Object.assign(style, this.fill[_xfa_object.$toStyle]());
      } else {
        style.fill = "transparent";
      }

      style.strokeWidth = (0, _html_utils.measureToString)(edge.presence === "visible" ? edge.thickness : 0);
      style.stroke = edgeStyle.color;
      var corner = this.corner.children.length ? this.corner.children[0] : new Corner({});

      var cornerStyle = corner[_xfa_object.$toStyle]();

      var rect = {
        name: "rect",
        attributes: {
          xmlns: SVG_NS,
          width: "100%",
          height: "100%",
          x: 0,
          y: 0,
          rx: cornerStyle.radius,
          ry: cornerStyle.radius,
          style: style
        }
      };
      var svg = {
        name: "svg",
        children: [rect],
        attributes: {
          xmlns: SVG_NS,
          style: {
            overflow: "visible"
          },
          width: "100%",
          height: "100%"
        }
      };

      var parent = this[_xfa_object.$getParent]()[_xfa_object.$getParent]();

      if (hasMargin(parent)) {
        return _utils.HTMLResult.success({
          name: "div",
          attributes: {
            style: {
              display: "inline",
              width: "100%",
              height: "100%"
            }
          },
          children: [svg]
        });
      }

      svg.attributes.style.position = "absolute";
      return _utils.HTMLResult.success(svg);
    }
  }]);

  return Rectangle;
}(_xfa_object.XFAObject);

var RefElement = /*#__PURE__*/function (_StringObject8) {
  _inherits(RefElement, _StringObject8);

  var _super88 = _createSuper(RefElement);

  function RefElement(attributes) {
    var _this88;

    _classCallCheck(this, RefElement);

    _this88 = _super88.call(this, TEMPLATE_NS_ID, "ref");
    _this88.id = attributes.id || "";
    _this88.use = attributes.use || "";
    _this88.usehref = attributes.usehref || "";
    return _this88;
  }

  return RefElement;
}(_xfa_object.StringObject);

var Script = /*#__PURE__*/function (_StringObject9) {
  _inherits(Script, _StringObject9);

  var _super89 = _createSuper(Script);

  function Script(attributes) {
    var _this89;

    _classCallCheck(this, Script);

    _this89 = _super89.call(this, TEMPLATE_NS_ID, "script");
    _this89.binding = attributes.binding || "";
    _this89.contentType = attributes.contentType || "";
    _this89.id = attributes.id || "";
    _this89.name = attributes.name || "";
    _this89.runAt = (0, _utils.getStringOption)(attributes.runAt, ["client", "both", "server"]);
    _this89.use = attributes.use || "";
    _this89.usehref = attributes.usehref || "";
    return _this89;
  }

  return Script;
}(_xfa_object.StringObject);

var SetProperty = /*#__PURE__*/function (_XFAObject70) {
  _inherits(SetProperty, _XFAObject70);

  var _super90 = _createSuper(SetProperty);

  function SetProperty(attributes) {
    var _this90;

    _classCallCheck(this, SetProperty);

    _this90 = _super90.call(this, TEMPLATE_NS_ID, "setProperty");
    _this90.connection = attributes.connection || "";
    _this90.ref = attributes.ref || "";
    _this90.target = attributes.target || "";
    return _this90;
  }

  return SetProperty;
}(_xfa_object.XFAObject);

exports.SetProperty = SetProperty;

var SignData = /*#__PURE__*/function (_XFAObject71) {
  _inherits(SignData, _XFAObject71);

  var _super91 = _createSuper(SignData);

  function SignData(attributes) {
    var _this91;

    _classCallCheck(this, SignData);

    _this91 = _super91.call(this, TEMPLATE_NS_ID, "signData", true);
    _this91.id = attributes.id || "";
    _this91.operation = (0, _utils.getStringOption)(attributes.operation, ["sign", "clear", "verify"]);
    _this91.ref = attributes.ref || "";
    _this91.target = attributes.target || "";
    _this91.use = attributes.use || "";
    _this91.usehref = attributes.usehref || "";
    _this91.filter = null;
    _this91.manifest = null;
    return _this91;
  }

  return SignData;
}(_xfa_object.XFAObject);

var Signature = /*#__PURE__*/function (_XFAObject72) {
  _inherits(Signature, _XFAObject72);

  var _super92 = _createSuper(Signature);

  function Signature(attributes) {
    var _this92;

    _classCallCheck(this, Signature);

    _this92 = _super92.call(this, TEMPLATE_NS_ID, "signature", true);
    _this92.id = attributes.id || "";
    _this92.type = (0, _utils.getStringOption)(attributes.type, ["PDF1.3", "PDF1.6"]);
    _this92.use = attributes.use || "";
    _this92.usehref = attributes.usehref || "";
    _this92.border = null;
    _this92.extras = null;
    _this92.filter = null;
    _this92.manifest = null;
    _this92.margin = null;
    return _this92;
  }

  return Signature;
}(_xfa_object.XFAObject);

var Signing = /*#__PURE__*/function (_XFAObject73) {
  _inherits(Signing, _XFAObject73);

  var _super93 = _createSuper(Signing);

  function Signing(attributes) {
    var _this93;

    _classCallCheck(this, Signing);

    _this93 = _super93.call(this, TEMPLATE_NS_ID, "signing", true);
    _this93.id = attributes.id || "";
    _this93.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this93.use = attributes.use || "";
    _this93.usehref = attributes.usehref || "";
    _this93.certificate = new _xfa_object.XFAObjectArray();
    return _this93;
  }

  return Signing;
}(_xfa_object.XFAObject);

var Solid = /*#__PURE__*/function (_XFAObject74) {
  _inherits(Solid, _XFAObject74);

  var _super94 = _createSuper(Solid);

  function Solid(attributes) {
    var _this94;

    _classCallCheck(this, Solid);

    _this94 = _super94.call(this, TEMPLATE_NS_ID, "solid", true);
    _this94.id = attributes.id || "";
    _this94.use = attributes.use || "";
    _this94.usehref = attributes.usehref || "";
    _this94.extras = null;
    return _this94;
  }

  _createClass(Solid, [{
    key: _xfa_object.$toStyle,
    value: function value(startColor) {
      return startColor ? startColor[_xfa_object.$toStyle]() : "#FFFFFF";
    }
  }]);

  return Solid;
}(_xfa_object.XFAObject);

var Speak = /*#__PURE__*/function (_StringObject10) {
  _inherits(Speak, _StringObject10);

  var _super95 = _createSuper(Speak);

  function Speak(attributes) {
    var _this95;

    _classCallCheck(this, Speak);

    _this95 = _super95.call(this, TEMPLATE_NS_ID, "speak");
    _this95.disable = (0, _utils.getInteger)({
      data: attributes.disable,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this95.id = attributes.id || "";
    _this95.priority = (0, _utils.getStringOption)(attributes.priority, ["custom", "caption", "name", "toolTip"]);
    _this95.rid = attributes.rid || "";
    _this95.use = attributes.use || "";
    _this95.usehref = attributes.usehref || "";
    return _this95;
  }

  return Speak;
}(_xfa_object.StringObject);

var Stipple = /*#__PURE__*/function (_XFAObject75) {
  _inherits(Stipple, _XFAObject75);

  var _super96 = _createSuper(Stipple);

  function Stipple(attributes) {
    var _this96;

    _classCallCheck(this, Stipple);

    _this96 = _super96.call(this, TEMPLATE_NS_ID, "stipple", true);
    _this96.id = attributes.id || "";
    _this96.rate = (0, _utils.getInteger)({
      data: attributes.rate,
      defaultValue: 50,
      validate: function validate(x) {
        return x >= 0 && x <= 100;
      }
    });
    _this96.use = attributes.use || "";
    _this96.usehref = attributes.usehref || "";
    _this96.color = null;
    _this96.extras = null;
    return _this96;
  }

  _createClass(Stipple, [{
    key: _xfa_object.$toStyle,
    value: function value(bgColor) {
      var alpha = this.rate / 100;
      return _util.Util.makeHexColor(Math.round(bgColor.value.r * (1 - alpha) + this.value.r * alpha), Math.round(bgColor.value.g * (1 - alpha) + this.value.g * alpha), Math.round(bgColor.value.b * (1 - alpha) + this.value.b * alpha));
    }
  }]);

  return Stipple;
}(_xfa_object.XFAObject);

var Subform = /*#__PURE__*/function (_XFAObject76) {
  _inherits(Subform, _XFAObject76);

  var _super97 = _createSuper(Subform);

  function Subform(attributes) {
    var _this97;

    _classCallCheck(this, Subform);

    _this97 = _super97.call(this, TEMPLATE_NS_ID, "subform", true);
    _this97.access = (0, _utils.getStringOption)(attributes.access, ["open", "nonInteractive", "protected", "readOnly"]);
    _this97.allowMacro = (0, _utils.getInteger)({
      data: attributes.allowMacro,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this97.anchorType = (0, _utils.getStringOption)(attributes.anchorType, ["topLeft", "bottomCenter", "bottomLeft", "bottomRight", "middleCenter", "middleLeft", "middleRight", "topCenter", "topRight"]);
    _this97.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: function validate(n) {
        return n >= 1 || n === -1;
      }
    });
    _this97.columnWidths = (attributes.columnWidths || "").trim().split(/\s+/).map(function (x) {
      return x === "-1" ? -1 : (0, _utils.getMeasurement)(x);
    });
    _this97.h = attributes.h ? (0, _utils.getMeasurement)(attributes.h) : "";
    _this97.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    _this97.id = attributes.id || "";
    _this97.layout = (0, _utils.getStringOption)(attributes.layout, ["position", "lr-tb", "rl-row", "rl-tb", "row", "table", "tb"]);
    _this97.locale = attributes.locale || "";
    _this97.maxH = (0, _utils.getMeasurement)(attributes.maxH, "0pt");
    _this97.maxW = (0, _utils.getMeasurement)(attributes.maxW, "0pt");
    _this97.mergeMode = (0, _utils.getStringOption)(attributes.mergeMode, ["consumeData", "matchTemplate"]);
    _this97.minH = (0, _utils.getMeasurement)(attributes.minH, "0pt");
    _this97.minW = (0, _utils.getMeasurement)(attributes.minW, "0pt");
    _this97.name = attributes.name || "";
    _this97.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    _this97.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this97.restoreState = (0, _utils.getStringOption)(attributes.restoreState, ["manual", "auto"]);
    _this97.scope = (0, _utils.getStringOption)(attributes.scope, ["name", "none"]);
    _this97.use = attributes.use || "";
    _this97.usehref = attributes.usehref || "";
    _this97.w = attributes.w ? (0, _utils.getMeasurement)(attributes.w) : "";
    _this97.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    _this97.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    _this97.assist = null;
    _this97.bind = null;
    _this97.bookend = null;
    _this97.border = null;
    _this97["break"] = null;
    _this97.calculate = null;
    _this97.desc = null;
    _this97.extras = null;
    _this97.keep = null;
    _this97.margin = null;
    _this97.occur = null;
    _this97.overflow = null;
    _this97.pageSet = null;
    _this97.para = null;
    _this97.traversal = null;
    _this97.validate = null;
    _this97.variables = null;
    _this97.area = new _xfa_object.XFAObjectArray();
    _this97.breakAfter = new _xfa_object.XFAObjectArray();
    _this97.breakBefore = new _xfa_object.XFAObjectArray();
    _this97.connect = new _xfa_object.XFAObjectArray();
    _this97.draw = new _xfa_object.XFAObjectArray();
    _this97.event = new _xfa_object.XFAObjectArray();
    _this97.exObject = new _xfa_object.XFAObjectArray();
    _this97.exclGroup = new _xfa_object.XFAObjectArray();
    _this97.field = new _xfa_object.XFAObjectArray();
    _this97.proto = new _xfa_object.XFAObjectArray();
    _this97.setProperty = new _xfa_object.XFAObjectArray();
    _this97.subform = new _xfa_object.XFAObjectArray();
    _this97.subformSet = new _xfa_object.XFAObjectArray();
    return _this97;
  }

  _createClass(Subform, [{
    key: _xfa_object.$getSubformParent,
    value: function value() {
      var parent = this[_xfa_object.$getParent]();

      if (parent instanceof SubformSet) {
        return parent[_xfa_object.$getSubformParent]();
      }

      return parent;
    }
  }, {
    key: _xfa_object.$isBindable,
    value: function value() {
      return true;
    }
  }, {
    key: _xfa_object.$isThereMoreWidth,
    value: function value() {
      return this.layout.endsWith("-tb") && this[_xfa_object.$extra].attempt === 0 && this[_xfa_object.$extra].numberInLine > 0 || this[_xfa_object.$getParent]()[_xfa_object.$isThereMoreWidth]();
    }
  }, {
    key: _xfa_object.$getContainedChildren,
    value: /*#__PURE__*/_regenerator["default"].mark(function value() {
      return _regenerator["default"].wrap(function value$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.delegateYield(getContainedChildren(this), "t0", 1);

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, value, this);
    })
  }, {
    key: _xfa_object.$flushHTML,
    value: function value() {
      return (0, _layout.flushHTML)(this);
    }
  }, {
    key: _xfa_object.$addHTML,
    value: function value(html, bbox) {
      (0, _layout.addHTML)(this, html, bbox);
    }
  }, {
    key: _xfa_object.$getAvailableSpace,
    value: function value() {
      return (0, _layout.getAvailableSpace)(this);
    }
  }, {
    key: _xfa_object.$isSplittable,
    value: function value() {
      var parent = this[_xfa_object.$getSubformParent]();

      if (!parent[_xfa_object.$isSplittable]()) {
        return false;
      }

      if (this[_xfa_object.$extra]._isSplittable !== undefined) {
        return this[_xfa_object.$extra]._isSplittable;
      }

      if (this.layout === "position" || this.layout.includes("row")) {
        this[_xfa_object.$extra]._isSplittable = false;
        return false;
      }

      if (this.keep && this.keep.intact !== "none") {
        this[_xfa_object.$extra]._isSplittable = false;
        return false;
      }

      if (parent.layout && parent.layout.endsWith("-tb") && parent[_xfa_object.$extra].numberInLine !== 0) {
        return false;
      }

      this[_xfa_object.$extra]._isSplittable = true;
      return true;
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      setTabIndex(this);

      if (this["break"]) {
        if (this["break"].after !== "auto" || this["break"].afterTarget !== "") {
          var node = new BreakAfter({
            targetType: this["break"].after,
            target: this["break"].afterTarget,
            startNew: this["break"].startNew.toString()
          });
          node[_xfa_object.$globalData] = this[_xfa_object.$globalData];

          this[_xfa_object.$appendChild](node);

          this.breakAfter.push(node);
        }

        if (this["break"].before !== "auto" || this["break"].beforeTarget !== "") {
          var _node = new BreakBefore({
            targetType: this["break"].before,
            target: this["break"].beforeTarget,
            startNew: this["break"].startNew.toString()
          });

          _node[_xfa_object.$globalData] = this[_xfa_object.$globalData];

          this[_xfa_object.$appendChild](_node);

          this.breakBefore.push(_node);
        }

        if (this["break"].overflowTarget !== "") {
          var _node2 = new Overflow({
            target: this["break"].overflowTarget,
            leader: this["break"].overflowLeader,
            trailer: this["break"].overflowTrailer
          });

          _node2[_xfa_object.$globalData] = this[_xfa_object.$globalData];

          this[_xfa_object.$appendChild](_node2);

          this.overflow.push(_node2);
        }

        this[_xfa_object.$removeChild](this["break"]);

        this["break"] = null;
      }

      if (this.presence === "hidden" || this.presence === "inactive") {
        return _utils.HTMLResult.EMPTY;
      }

      if (this.breakBefore.children.length > 1 || this.breakAfter.children.length > 1) {
        (0, _util.warn)("XFA - Several breakBefore or breakAfter in subforms: please file a bug.");
      }

      if (this.breakBefore.children.length >= 1) {
        var breakBefore = this.breakBefore.children[0];

        if (handleBreak(breakBefore)) {
          return _utils.HTMLResult.breakNode(breakBefore);
        }
      }

      if (this[_xfa_object.$extra] && this[_xfa_object.$extra].afterBreakAfter) {
        return _utils.HTMLResult.EMPTY;
      }

      (0, _html_utils.fixDimensions)(this);
      var children = [];
      var attributes = {
        id: this[_xfa_object.$uid],
        "class": []
      };
      (0, _html_utils.setAccess)(this, attributes["class"]);

      if (!this[_xfa_object.$extra]) {
        this[_xfa_object.$extra] = Object.create(null);
      }

      Object.assign(this[_xfa_object.$extra], {
        children: children,
        line: null,
        attributes: attributes,
        attempt: 0,
        numberInLine: 0,
        availableSpace: {
          width: Math.min(this.w || Infinity, availableSpace.width),
          height: Math.min(this.h || Infinity, availableSpace.height)
        },
        width: 0,
        height: 0,
        prevHeight: 0,
        currentWidth: 0
      });

      var root = this[_xfa_object.$getTemplateRoot]();

      var savedNoLayoutFailure = root[_xfa_object.$extra].noLayoutFailure;

      var isSplittable = this[_xfa_object.$isSplittable]();

      if (!isSplittable) {
        setFirstUnsplittable(this);
      }

      if (!(0, _layout.checkDimensions)(this, availableSpace)) {
        return _utils.HTMLResult.FAILURE;
      }

      var filter = new Set(["area", "draw", "exclGroup", "field", "subform", "subformSet"]);

      if (this.layout.includes("row")) {
        var columnWidths = this[_xfa_object.$getSubformParent]().columnWidths;

        if (Array.isArray(columnWidths) && columnWidths.length > 0) {
          this[_xfa_object.$extra].columnWidths = columnWidths;
          this[_xfa_object.$extra].currentColumn = 0;
        }
      }

      var style = (0, _html_utils.toStyle)(this, "anchorType", "dimensions", "position", "presence", "border", "margin", "hAlign");
      var classNames = ["xfaSubform"];
      var cl = (0, _html_utils.layoutClass)(this);

      if (cl) {
        classNames.push(cl);
      }

      attributes.style = style;
      attributes["class"] = classNames;

      if (this.name) {
        attributes.xfaName = this.name;
      }

      if (this.overflow) {
        var overflowExtra = this.overflow[_xfa_object.$getExtra]();

        if (overflowExtra.addLeader) {
          overflowExtra.addLeader = false;
          handleOverflow(this, overflowExtra.leader, availableSpace);
        }
      }

      this[_xfa_object.$pushPara]();

      var isLrTb = this.layout === "lr-tb" || this.layout === "rl-tb";
      var maxRun = isLrTb ? MAX_ATTEMPTS_FOR_LRTB_LAYOUT : 1;

      for (; this[_xfa_object.$extra].attempt < maxRun; this[_xfa_object.$extra].attempt++) {
        if (isLrTb && this[_xfa_object.$extra].attempt === MAX_ATTEMPTS_FOR_LRTB_LAYOUT - 1) {
          this[_xfa_object.$extra].numberInLine = 0;
        }

        var _result = this[_xfa_object.$childrenToHTML]({
          filter: filter,
          include: true
        });

        if (_result.success) {
          break;
        }

        if (_result.isBreak()) {
          this[_xfa_object.$popPara]();

          return _result;
        }

        if (isLrTb && this[_xfa_object.$extra].attempt === 0 && this[_xfa_object.$extra].numberInLine === 0 && !root[_xfa_object.$extra].noLayoutFailure) {
          this[_xfa_object.$extra].attempt = maxRun;
          break;
        }
      }

      this[_xfa_object.$popPara]();

      if (!isSplittable) {
        unsetFirstUnsplittable(this);
      }

      root[_xfa_object.$extra].noLayoutFailure = savedNoLayoutFailure;

      if (this[_xfa_object.$extra].attempt === maxRun) {
        if (this.overflow) {
          this[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].overflowNode = this.overflow;
        }

        if (!isSplittable) {
          delete this[_xfa_object.$extra];
        }

        return _utils.HTMLResult.FAILURE;
      }

      if (this.overflow) {
        var _overflowExtra = this.overflow[_xfa_object.$getExtra]();

        if (_overflowExtra.addTrailer) {
          _overflowExtra.addTrailer = false;
          handleOverflow(this, _overflowExtra.trailer, availableSpace);
        }
      }

      var marginH = 0;
      var marginV = 0;

      if (this.margin) {
        marginH = this.margin.leftInset + this.margin.rightInset;
        marginV = this.margin.topInset + this.margin.bottomInset;
      }

      var width = Math.max(this[_xfa_object.$extra].width + marginH, this.w || 0);
      var height = Math.max(this[_xfa_object.$extra].height + marginV, this.h || 0);
      var bbox = [this.x, this.y, width, height];

      if (this.w === "") {
        style.width = (0, _html_utils.measureToString)(width);
      }

      if (this.h === "") {
        style.height = (0, _html_utils.measureToString)(height);
      }

      if ((style.width === "0px" || style.height === "0px") && children.length === 0) {
        return _utils.HTMLResult.EMPTY;
      }

      var html = {
        name: "div",
        attributes: attributes,
        children: children
      };
      applyAssist(this, attributes);

      var result = _utils.HTMLResult.success((0, _html_utils.createWrapper)(this, html), bbox);

      if (this.breakAfter.children.length >= 1) {
        var breakAfter = this.breakAfter.children[0];

        if (handleBreak(breakAfter)) {
          this[_xfa_object.$extra].afterBreakAfter = result;
          return _utils.HTMLResult.breakNode(breakAfter);
        }
      }

      delete this[_xfa_object.$extra];
      return result;
    }
  }]);

  return Subform;
}(_xfa_object.XFAObject);

var SubformSet = /*#__PURE__*/function (_XFAObject77) {
  _inherits(SubformSet, _XFAObject77);

  var _super98 = _createSuper(SubformSet);

  function SubformSet(attributes) {
    var _this98;

    _classCallCheck(this, SubformSet);

    _this98 = _super98.call(this, TEMPLATE_NS_ID, "subformSet", true);
    _this98.id = attributes.id || "";
    _this98.name = attributes.name || "";
    _this98.relation = (0, _utils.getStringOption)(attributes.relation, ["ordered", "choice", "unordered"]);
    _this98.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this98.use = attributes.use || "";
    _this98.usehref = attributes.usehref || "";
    _this98.bookend = null;
    _this98["break"] = null;
    _this98.desc = null;
    _this98.extras = null;
    _this98.occur = null;
    _this98.overflow = null;
    _this98.breakAfter = new _xfa_object.XFAObjectArray();
    _this98.breakBefore = new _xfa_object.XFAObjectArray();
    _this98.subform = new _xfa_object.XFAObjectArray();
    _this98.subformSet = new _xfa_object.XFAObjectArray();
    return _this98;
  }

  _createClass(SubformSet, [{
    key: _xfa_object.$getContainedChildren,
    value: /*#__PURE__*/_regenerator["default"].mark(function value() {
      return _regenerator["default"].wrap(function value$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.delegateYield(getContainedChildren(this), "t0", 1);

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, value, this);
    })
  }, {
    key: _xfa_object.$getSubformParent,
    value: function value() {
      var parent = this[_xfa_object.$getParent]();

      while (!(parent instanceof Subform)) {
        parent = parent[_xfa_object.$getParent]();
      }

      return parent;
    }
  }, {
    key: _xfa_object.$isBindable,
    value: function value() {
      return true;
    }
  }]);

  return SubformSet;
}(_xfa_object.XFAObject);

var SubjectDN = /*#__PURE__*/function (_ContentObject8) {
  _inherits(SubjectDN, _ContentObject8);

  var _super99 = _createSuper(SubjectDN);

  function SubjectDN(attributes) {
    var _this99;

    _classCallCheck(this, SubjectDN);

    _this99 = _super99.call(this, TEMPLATE_NS_ID, "subjectDN");
    _this99.delimiter = attributes.delimiter || ",";
    _this99.id = attributes.id || "";
    _this99.name = attributes.name || "";
    _this99.use = attributes.use || "";
    _this99.usehref = attributes.usehref || "";
    return _this99;
  }

  _createClass(SubjectDN, [{
    key: _xfa_object.$finalize,
    value: function value() {
      this[_xfa_object.$content] = new Map(this[_xfa_object.$content].split(this.delimiter).map(function (kv) {
        kv = kv.split("=", 2);
        kv[0] = kv[0].trim();
        return kv;
      }));
    }
  }]);

  return SubjectDN;
}(_xfa_object.ContentObject);

var SubjectDNs = /*#__PURE__*/function (_XFAObject78) {
  _inherits(SubjectDNs, _XFAObject78);

  var _super100 = _createSuper(SubjectDNs);

  function SubjectDNs(attributes) {
    var _this100;

    _classCallCheck(this, SubjectDNs);

    _this100 = _super100.call(this, TEMPLATE_NS_ID, "subjectDNs", true);
    _this100.id = attributes.id || "";
    _this100.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this100.use = attributes.use || "";
    _this100.usehref = attributes.usehref || "";
    _this100.subjectDN = new _xfa_object.XFAObjectArray();
    return _this100;
  }

  return SubjectDNs;
}(_xfa_object.XFAObject);

var Submit = /*#__PURE__*/function (_XFAObject79) {
  _inherits(Submit, _XFAObject79);

  var _super101 = _createSuper(Submit);

  function Submit(attributes) {
    var _this101;

    _classCallCheck(this, Submit);

    _this101 = _super101.call(this, TEMPLATE_NS_ID, "submit", true);
    _this101.embedPDF = (0, _utils.getInteger)({
      data: attributes.embedPDF,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this101.format = (0, _utils.getStringOption)(attributes.format, ["xdp", "formdata", "pdf", "urlencoded", "xfd", "xml"]);
    _this101.id = attributes.id || "";
    _this101.target = attributes.target || "";
    _this101.textEncoding = (0, _utils.getKeyword)({
      data: attributes.textEncoding ? attributes.textEncoding.toLowerCase() : "",
      defaultValue: "",
      validate: function validate(k) {
        return ["utf-8", "big-five", "fontspecific", "gbk", "gb-18030", "gb-2312", "ksc-5601", "none", "shift-jis", "ucs-2", "utf-16"].includes(k) || k.match(/iso-8859-\d{2}/);
      }
    });
    _this101.use = attributes.use || "";
    _this101.usehref = attributes.usehref || "";
    _this101.xdpContent = attributes.xdpContent || "";
    _this101.encrypt = null;
    _this101.encryptData = new _xfa_object.XFAObjectArray();
    _this101.signData = new _xfa_object.XFAObjectArray();
    return _this101;
  }

  return Submit;
}(_xfa_object.XFAObject);

var Template = /*#__PURE__*/function (_XFAObject80) {
  _inherits(Template, _XFAObject80);

  var _super102 = _createSuper(Template);

  function Template(attributes) {
    var _this102;

    _classCallCheck(this, Template);

    _this102 = _super102.call(this, TEMPLATE_NS_ID, "template", true);
    _this102.baseProfile = (0, _utils.getStringOption)(attributes.baseProfile, ["full", "interactiveForms"]);
    _this102.extras = null;
    _this102.subform = new _xfa_object.XFAObjectArray();
    return _this102;
  }

  _createClass(Template, [{
    key: _xfa_object.$finalize,
    value: function value() {
      if (this.subform.children.length === 0) {
        (0, _util.warn)("XFA - No subforms in template node.");
      }

      if (this.subform.children.length >= 2) {
        (0, _util.warn)("XFA - Several subforms in template node: please file a bug.");
      }

      this[_xfa_object.$tabIndex] = DEFAULT_TAB_INDEX;
    }
  }, {
    key: _xfa_object.$isSplittable,
    value: function value() {
      return true;
    }
  }, {
    key: _xfa_object.$searchNode,
    value: function value(expr, container) {
      if (expr.startsWith("#")) {
        return [this[_xfa_object.$ids].get(expr.slice(1))];
      }

      return (0, _som.searchNode)(this, container, expr, true, true);
    }
  }, {
    key: _xfa_object.$toPages,
    value: /*#__PURE__*/_regenerator["default"].mark(function value() {
      var _this103 = this;

      var root, pageAreas, mainHtml, pageArea, breakBefore, breakBeforeTarget, target, pageAreaParent, targetPageArea, leader, trailer, hasSomething, hasSomethingCounter, startIndex, _loop, _ret;

      return _regenerator["default"].wrap(function value$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (this.subform.children.length) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", _utils.HTMLResult.success({
                name: "div",
                children: []
              }));

            case 2:
              this[_xfa_object.$extra] = {
                overflowNode: null,
                firstUnsplittable: null,
                currentContentArea: null,
                currentPageArea: null,
                noLayoutFailure: false,
                pageNumber: 1,
                pagePosition: "first",
                oddOrEven: "odd",
                blankOrNotBlank: "nonBlank",
                paraStack: []
              };
              root = this.subform.children[0];

              root.pageSet[_xfa_object.$cleanPage]();

              pageAreas = root.pageSet.pageArea.children;
              mainHtml = {
                name: "div",
                children: []
              };
              pageArea = null;
              breakBefore = null;
              breakBeforeTarget = null;

              if (root.breakBefore.children.length >= 1) {
                breakBefore = root.breakBefore.children[0];
                breakBeforeTarget = breakBefore.target;
              } else if (root.subform.children.length >= 1 && root.subform.children[0].breakBefore.children.length >= 1) {
                breakBefore = root.subform.children[0].breakBefore.children[0];
                breakBeforeTarget = breakBefore.target;
              } else if (root["break"] && root["break"].beforeTarget) {
                breakBefore = root["break"];
                breakBeforeTarget = breakBefore.beforeTarget;
              } else if (root.subform.children.length >= 1 && root.subform.children[0]["break"] && root.subform.children[0]["break"].beforeTarget) {
                breakBefore = root.subform.children[0]["break"];
                breakBeforeTarget = breakBefore.beforeTarget;
              }

              if (breakBefore) {
                target = this[_xfa_object.$searchNode](breakBeforeTarget, breakBefore[_xfa_object.$getParent]());

                if (target instanceof PageArea) {
                  pageArea = target;
                  breakBefore[_xfa_object.$extra] = {};
                }
              }

              if (!pageArea) {
                pageArea = pageAreas[0];
              }

              pageArea[_xfa_object.$extra] = {
                numberOfUse: 1
              };
              pageAreaParent = pageArea[_xfa_object.$getParent]();
              pageAreaParent[_xfa_object.$extra] = {
                numberOfUse: 1,
                pageIndex: pageAreaParent.pageArea.children.indexOf(pageArea),
                pageSetIndex: 0
              };
              leader = null;
              trailer = null;
              hasSomething = true;
              hasSomethingCounter = 0;
              startIndex = 0;
              _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
                var page, contentAreas, htmlContentAreas, flush, i, ii, contentArea, space, html, node, _ret2;

                return _regenerator["default"].wrap(function _loop$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (hasSomething) {
                          _context5.next = 7;
                          break;
                        }

                        mainHtml.children.pop();

                        if (!(++hasSomethingCounter === MAX_EMPTY_PAGES)) {
                          _context5.next = 5;
                          break;
                        }

                        (0, _util.warn)("XFA - Something goes wrong: please file a bug.");
                        return _context5.abrupt("return", {
                          v: mainHtml
                        });

                      case 5:
                        _context5.next = 8;
                        break;

                      case 7:
                        hasSomethingCounter = 0;

                      case 8:
                        targetPageArea = null;
                        _this103[_xfa_object.$extra].currentPageArea = pageArea;
                        page = pageArea[_xfa_object.$toHTML]().html;
                        mainHtml.children.push(page);

                        if (leader) {
                          _this103[_xfa_object.$extra].noLayoutFailure = true;
                          page.children.push(leader[_xfa_object.$toHTML](pageArea[_xfa_object.$extra].space).html);
                          leader = null;
                        }

                        if (trailer) {
                          _this103[_xfa_object.$extra].noLayoutFailure = true;
                          page.children.push(trailer[_xfa_object.$toHTML](pageArea[_xfa_object.$extra].space).html);
                          trailer = null;
                        }

                        contentAreas = pageArea.contentArea.children;
                        htmlContentAreas = page.children.filter(function (node) {
                          return node.attributes["class"].includes("xfaContentarea");
                        });
                        hasSomething = false;
                        _this103[_xfa_object.$extra].firstUnsplittable = null;
                        _this103[_xfa_object.$extra].noLayoutFailure = false;

                        flush = function flush(index) {
                          var html = root[_xfa_object.$flushHTML]();

                          if (html) {
                            hasSomething = hasSomething || html.children && html.children.length !== 0;
                            htmlContentAreas[index].children.push(html);
                          }
                        };

                        i = startIndex, ii = contentAreas.length;

                      case 21:
                        if (!(i < ii)) {
                          _context5.next = 48;
                          break;
                        }

                        contentArea = _this103[_xfa_object.$extra].currentContentArea = contentAreas[i];
                        space = {
                          width: contentArea.w,
                          height: contentArea.h
                        };
                        startIndex = 0;

                        if (leader) {
                          htmlContentAreas[i].children.push(leader[_xfa_object.$toHTML](space).html);
                          leader = null;
                        }

                        if (trailer) {
                          htmlContentAreas[i].children.push(trailer[_xfa_object.$toHTML](space).html);
                          trailer = null;
                        }

                        html = root[_xfa_object.$toHTML](space);

                        if (!html.success) {
                          _context5.next = 31;
                          break;
                        }

                        if (html.html) {
                          hasSomething = hasSomething || html.html.children && html.html.children.length !== 0;
                          htmlContentAreas[i].children.push(html.html);
                        } else if (!hasSomething && mainHtml.children.length > 1) {
                          mainHtml.children.pop();
                        }

                        return _context5.abrupt("return", {
                          v: mainHtml
                        });

                      case 31:
                        if (!html.isBreak()) {
                          _context5.next = 40;
                          break;
                        }

                        node = html.breakNode;
                        flush(i);

                        if (!(node.targetType === "auto")) {
                          _context5.next = 36;
                          break;
                        }

                        return _context5.abrupt("continue", 45);

                      case 36:
                        if (node.leader) {
                          leader = _this103[_xfa_object.$searchNode](node.leader, node[_xfa_object.$getParent]());
                          leader = leader ? leader[0] : null;
                        }

                        if (node.trailer) {
                          trailer = _this103[_xfa_object.$searchNode](node.trailer, node[_xfa_object.$getParent]());
                          trailer = trailer ? trailer[0] : null;
                        }

                        if (node.targetType === "pageArea") {
                          targetPageArea = node[_xfa_object.$extra].target;
                          i = Infinity;
                        } else if (!node[_xfa_object.$extra].target) {
                          i = node[_xfa_object.$extra].index;
                        } else {
                          targetPageArea = node[_xfa_object.$extra].target;
                          startIndex = node[_xfa_object.$extra].index + 1;
                          i = Infinity;
                        }

                        return _context5.abrupt("continue", 45);

                      case 40:
                        if (!_this103[_xfa_object.$extra].overflowNode) {
                          _context5.next = 44;
                          break;
                        }

                        _ret2 = function () {
                          var node = _this103[_xfa_object.$extra].overflowNode;
                          _this103[_xfa_object.$extra].overflowNode = null;

                          var overflowExtra = node[_xfa_object.$getExtra]();

                          var target = overflowExtra.target;
                          overflowExtra.addLeader = overflowExtra.leader !== null;
                          overflowExtra.addTrailer = overflowExtra.trailer !== null;
                          flush(i);
                          var currentIndex = i;
                          i = Infinity;

                          if (target instanceof PageArea) {
                            targetPageArea = target;
                          } else if (target instanceof ContentArea) {
                            var index = contentAreas.findIndex(function (e) {
                              return e === target;
                            });

                            if (index !== -1) {
                              if (index > currentIndex) {
                                i = index - 1;
                              } else {
                                startIndex = index;
                              }
                            } else {
                              targetPageArea = target[_xfa_object.$getParent]();
                              startIndex = targetPageArea.contentArea.children.findIndex(function (e) {
                                return e === target;
                              });
                            }
                          }

                          return "continue";
                        }();

                        if (!(_ret2 === "continue")) {
                          _context5.next = 44;
                          break;
                        }

                        return _context5.abrupt("continue", 45);

                      case 44:
                        flush(i);

                      case 45:
                        i++;
                        _context5.next = 21;
                        break;

                      case 48:
                        _this103[_xfa_object.$extra].pageNumber += 1;

                        if (targetPageArea) {
                          if (targetPageArea[_xfa_object.$isUsable]()) {
                            targetPageArea[_xfa_object.$extra].numberOfUse += 1;
                          } else {
                            targetPageArea = null;
                          }
                        }

                        pageArea = targetPageArea || pageArea[_xfa_object.$getNextPage]();
                        _context5.next = 53;
                        return null;

                      case 53:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _loop);
              });

            case 22:
              if (!true) {
                _context6.next = 29;
                break;
              }

              return _context6.delegateYield(_loop(), "t0", 24);

            case 24:
              _ret = _context6.t0;

              if (!(_typeof(_ret) === "object")) {
                _context6.next = 27;
                break;
              }

              return _context6.abrupt("return", _ret.v);

            case 27:
              _context6.next = 22;
              break;

            case 29:
            case "end":
              return _context6.stop();
          }
        }
      }, value, this);
    })
  }]);

  return Template;
}(_xfa_object.XFAObject);

exports.Template = Template;

var Text = /*#__PURE__*/function (_ContentObject9) {
  _inherits(Text, _ContentObject9);

  var _super103 = _createSuper(Text);

  function Text(attributes) {
    var _this104;

    _classCallCheck(this, Text);

    _this104 = _super103.call(this, TEMPLATE_NS_ID, "text");
    _this104.id = attributes.id || "";
    _this104.maxChars = (0, _utils.getInteger)({
      data: attributes.maxChars,
      defaultValue: 0,
      validate: function validate(x) {
        return x >= 0;
      }
    });
    _this104.name = attributes.name || "";
    _this104.rid = attributes.rid || "";
    _this104.use = attributes.use || "";
    _this104.usehref = attributes.usehref || "";
    return _this104;
  }

  _createClass(Text, [{
    key: _xfa_object.$acceptWhitespace,
    value: function value() {
      return true;
    }
  }, {
    key: _xfa_object.$onChild,
    value: function value(child) {
      if (child[_xfa_object.$namespaceId] === _namespaces.NamespaceIds.xhtml.id) {
        this[_xfa_object.$content] = child;
        return true;
      }

      (0, _util.warn)("XFA - Invalid content in Text: ".concat(child[_xfa_object.$nodeName], "."));
      return false;
    }
  }, {
    key: _xfa_object.$onText,
    value: function value(str) {
      if (this[_xfa_object.$content] instanceof _xfa_object.XFAObject) {
        return;
      }

      _get(_getPrototypeOf(Text.prototype), _xfa_object.$onText, this).call(this, str);
    }
  }, {
    key: _xfa_object.$finalize,
    value: function value() {
      if (typeof this[_xfa_object.$content] === "string") {
        this[_xfa_object.$content] = this[_xfa_object.$content].replace(/\r\n/g, "\n");
      }
    }
  }, {
    key: _xfa_object.$getExtra,
    value: function value() {
      if (typeof this[_xfa_object.$content] === "string") {
        return this[_xfa_object.$content].split(/[\u2029\u2028\n]/).reduce(function (acc, line) {
          if (line) {
            acc.push(line);
          }

          return acc;
        }, []).join("\n");
      }

      return this[_xfa_object.$content][_xfa_object.$text]();
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      if (typeof this[_xfa_object.$content] === "string") {
        var html = valueToHtml(this[_xfa_object.$content]).html;

        if (this[_xfa_object.$content].includes("\u2029")) {
          html.name = "div";
          html.children = [];

          this[_xfa_object.$content].split("\u2029").map(function (para) {
            return para.split(/[\u2028\n]/).reduce(function (acc, line) {
              acc.push({
                name: "span",
                value: line
              }, {
                name: "br"
              });
              return acc;
            }, []);
          }).forEach(function (lines) {
            html.children.push({
              name: "p",
              children: lines
            });
          });
        } else if (/[\u2028\n]/.test(this[_xfa_object.$content])) {
          html.name = "div";
          html.children = [];

          this[_xfa_object.$content].split(/[\u2028\n]/).forEach(function (line) {
            html.children.push({
              name: "span",
              value: line
            }, {
              name: "br"
            });
          });
        }

        return _utils.HTMLResult.success(html);
      }

      return this[_xfa_object.$content][_xfa_object.$toHTML](availableSpace);
    }
  }]);

  return Text;
}(_xfa_object.ContentObject);

exports.Text = Text;

var TextEdit = /*#__PURE__*/function (_XFAObject81) {
  _inherits(TextEdit, _XFAObject81);

  var _super104 = _createSuper(TextEdit);

  function TextEdit(attributes) {
    var _this105;

    _classCallCheck(this, TextEdit);

    _this105 = _super104.call(this, TEMPLATE_NS_ID, "textEdit", true);
    _this105.allowRichText = (0, _utils.getInteger)({
      data: attributes.allowRichText,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this105.hScrollPolicy = (0, _utils.getStringOption)(attributes.hScrollPolicy, ["auto", "off", "on"]);
    _this105.id = attributes.id || "";
    _this105.multiLine = (0, _utils.getInteger)({
      data: attributes.multiLine,
      defaultValue: "",
      validate: function validate(x) {
        return x === 0 || x === 1;
      }
    });
    _this105.use = attributes.use || "";
    _this105.usehref = attributes.usehref || "";
    _this105.vScrollPolicy = (0, _utils.getStringOption)(attributes.vScrollPolicy, ["auto", "off", "on"]);
    _this105.border = null;
    _this105.comb = null;
    _this105.extras = null;
    _this105.margin = null;
    return _this105;
  }

  _createClass(TextEdit, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var style = (0, _html_utils.toStyle)(this, "border", "font", "margin");
      var html;

      var field = this[_xfa_object.$getParent]()[_xfa_object.$getParent]();

      if (this.multiLine === "") {
        this.multiLine = field instanceof Draw ? 1 : 0;
      }

      if (this.multiLine === 1) {
        html = {
          name: "textarea",
          attributes: {
            dataId: field[_xfa_object.$data] && field[_xfa_object.$data][_xfa_object.$uid] || field[_xfa_object.$uid],
            fieldId: field[_xfa_object.$uid],
            "class": ["xfaTextfield"],
            style: style,
            "aria-label": ariaLabel(field)
          }
        };
      } else {
        html = {
          name: "input",
          attributes: {
            type: "text",
            dataId: field[_xfa_object.$data] && field[_xfa_object.$data][_xfa_object.$uid] || field[_xfa_object.$uid],
            fieldId: field[_xfa_object.$uid],
            "class": ["xfaTextfield"],
            style: style,
            "aria-label": ariaLabel(field)
          }
        };
      }

      return _utils.HTMLResult.success({
        name: "label",
        attributes: {
          "class": ["xfaLabel"]
        },
        children: [html]
      });
    }
  }]);

  return TextEdit;
}(_xfa_object.XFAObject);

var Time = /*#__PURE__*/function (_StringObject11) {
  _inherits(Time, _StringObject11);

  var _super105 = _createSuper(Time);

  function Time(attributes) {
    var _this106;

    _classCallCheck(this, Time);

    _this106 = _super105.call(this, TEMPLATE_NS_ID, "time");
    _this106.id = attributes.id || "";
    _this106.name = attributes.name || "";
    _this106.use = attributes.use || "";
    _this106.usehref = attributes.usehref || "";
    return _this106;
  }

  _createClass(Time, [{
    key: _xfa_object.$finalize,
    value: function value() {
      var date = this[_xfa_object.$content].trim();

      this[_xfa_object.$content] = date ? new Date(date) : null;
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      return valueToHtml(this[_xfa_object.$content] ? this[_xfa_object.$content].toString() : "");
    }
  }]);

  return Time;
}(_xfa_object.StringObject);

var TimeStamp = /*#__PURE__*/function (_XFAObject82) {
  _inherits(TimeStamp, _XFAObject82);

  var _super106 = _createSuper(TimeStamp);

  function TimeStamp(attributes) {
    var _this107;

    _classCallCheck(this, TimeStamp);

    _this107 = _super106.call(this, TEMPLATE_NS_ID, "timeStamp");
    _this107.id = attributes.id || "";
    _this107.server = attributes.server || "";
    _this107.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    _this107.use = attributes.use || "";
    _this107.usehref = attributes.usehref || "";
    return _this107;
  }

  return TimeStamp;
}(_xfa_object.XFAObject);

var ToolTip = /*#__PURE__*/function (_StringObject12) {
  _inherits(ToolTip, _StringObject12);

  var _super107 = _createSuper(ToolTip);

  function ToolTip(attributes) {
    var _this108;

    _classCallCheck(this, ToolTip);

    _this108 = _super107.call(this, TEMPLATE_NS_ID, "toolTip");
    _this108.id = attributes.id || "";
    _this108.rid = attributes.rid || "";
    _this108.use = attributes.use || "";
    _this108.usehref = attributes.usehref || "";
    return _this108;
  }

  return ToolTip;
}(_xfa_object.StringObject);

var Traversal = /*#__PURE__*/function (_XFAObject83) {
  _inherits(Traversal, _XFAObject83);

  var _super108 = _createSuper(Traversal);

  function Traversal(attributes) {
    var _this109;

    _classCallCheck(this, Traversal);

    _this109 = _super108.call(this, TEMPLATE_NS_ID, "traversal", true);
    _this109.id = attributes.id || "";
    _this109.use = attributes.use || "";
    _this109.usehref = attributes.usehref || "";
    _this109.extras = null;
    _this109.traverse = new _xfa_object.XFAObjectArray();
    return _this109;
  }

  return Traversal;
}(_xfa_object.XFAObject);

var Traverse = /*#__PURE__*/function (_XFAObject84) {
  _inherits(Traverse, _XFAObject84);

  var _super109 = _createSuper(Traverse);

  function Traverse(attributes) {
    var _this110;

    _classCallCheck(this, Traverse);

    _this110 = _super109.call(this, TEMPLATE_NS_ID, "traverse", true);
    _this110.id = attributes.id || "";
    _this110.operation = (0, _utils.getStringOption)(attributes.operation, ["next", "back", "down", "first", "left", "right", "up"]);
    _this110.ref = attributes.ref || "";
    _this110.use = attributes.use || "";
    _this110.usehref = attributes.usehref || "";
    _this110.extras = null;
    _this110.script = null;
    return _this110;
  }

  _createClass(Traverse, [{
    key: "name",
    get: function get() {
      return this.operation;
    }
  }, {
    key: _xfa_object.$isTransparent,
    value: function value() {
      return false;
    }
  }]);

  return Traverse;
}(_xfa_object.XFAObject);

var Ui = /*#__PURE__*/function (_XFAObject85) {
  _inherits(Ui, _XFAObject85);

  var _super110 = _createSuper(Ui);

  function Ui(attributes) {
    var _this111;

    _classCallCheck(this, Ui);

    _this111 = _super110.call(this, TEMPLATE_NS_ID, "ui", true);
    _this111.id = attributes.id || "";
    _this111.use = attributes.use || "";
    _this111.usehref = attributes.usehref || "";
    _this111.extras = null;
    _this111.picture = null;
    _this111.barcode = null;
    _this111.button = null;
    _this111.checkButton = null;
    _this111.choiceList = null;
    _this111.dateTimeEdit = null;
    _this111.defaultUi = null;
    _this111.imageEdit = null;
    _this111.numericEdit = null;
    _this111.passwordEdit = null;
    _this111.signature = null;
    _this111.textEdit = null;
    return _this111;
  }

  _createClass(Ui, [{
    key: _xfa_object.$getExtra,
    value: function value() {
      if (this[_xfa_object.$extra] === undefined) {
        var _iterator10 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var name = _step10.value;

            if (name === "extras" || name === "picture") {
              continue;
            }

            var obj = this[name];

            if (!(obj instanceof _xfa_object.XFAObject)) {
              continue;
            }

            this[_xfa_object.$extra] = obj;
            return obj;
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }

        this[_xfa_object.$extra] = null;
      }

      return this[_xfa_object.$extra];
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var obj = this[_xfa_object.$getExtra]();

      if (obj) {
        return obj[_xfa_object.$toHTML](availableSpace);
      }

      return _utils.HTMLResult.EMPTY;
    }
  }]);

  return Ui;
}(_xfa_object.XFAObject);

var Validate = /*#__PURE__*/function (_XFAObject86) {
  _inherits(Validate, _XFAObject86);

  var _super111 = _createSuper(Validate);

  function Validate(attributes) {
    var _this112;

    _classCallCheck(this, Validate);

    _this112 = _super111.call(this, TEMPLATE_NS_ID, "validate", true);
    _this112.formatTest = (0, _utils.getStringOption)(attributes.formatTest, ["warning", "disabled", "error"]);
    _this112.id = attributes.id || "";
    _this112.nullTest = (0, _utils.getStringOption)(attributes.nullTest, ["disabled", "error", "warning"]);
    _this112.scriptTest = (0, _utils.getStringOption)(attributes.scriptTest, ["error", "disabled", "warning"]);
    _this112.use = attributes.use || "";
    _this112.usehref = attributes.usehref || "";
    _this112.extras = null;
    _this112.message = null;
    _this112.picture = null;
    _this112.script = null;
    return _this112;
  }

  return Validate;
}(_xfa_object.XFAObject);

var Value = /*#__PURE__*/function (_XFAObject87) {
  _inherits(Value, _XFAObject87);

  var _super112 = _createSuper(Value);

  function Value(attributes) {
    var _this113;

    _classCallCheck(this, Value);

    _this113 = _super112.call(this, TEMPLATE_NS_ID, "value", true);
    _this113.id = attributes.id || "";
    _this113.override = (0, _utils.getInteger)({
      data: attributes.override,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this113.relevant = (0, _utils.getRelevant)(attributes.relevant);
    _this113.use = attributes.use || "";
    _this113.usehref = attributes.usehref || "";
    _this113.arc = null;
    _this113["boolean"] = null;
    _this113.date = null;
    _this113.dateTime = null;
    _this113.decimal = null;
    _this113.exData = null;
    _this113["float"] = null;
    _this113.image = null;
    _this113.integer = null;
    _this113.line = null;
    _this113.rectangle = null;
    _this113.text = null;
    _this113.time = null;
    return _this113;
  }

  _createClass(Value, [{
    key: _xfa_object.$setValue,
    value: function (_value7) {
      function value(_x5) {
        return _value7.apply(this, arguments);
      }

      value.toString = function () {
        return _value7.toString();
      };

      return value;
    }(function (value) {
      var parent = this[_xfa_object.$getParent]();

      if (parent instanceof Field) {
        if (parent.ui && parent.ui.imageEdit) {
          if (!this.image) {
            this.image = new Image({});

            this[_xfa_object.$appendChild](this.image);
          }

          this.image[_xfa_object.$content] = value[_xfa_object.$content];
          return;
        }
      }

      var valueName = value[_xfa_object.$nodeName];

      if (this[valueName] !== null) {
        this[valueName][_xfa_object.$content] = value[_xfa_object.$content];
        return;
      }

      var _iterator11 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var name = _step11.value;
          var obj = this[name];

          if (obj instanceof _xfa_object.XFAObject) {
            this[name] = null;

            this[_xfa_object.$removeChild](obj);
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      this[value[_xfa_object.$nodeName]] = value;

      this[_xfa_object.$appendChild](value);
    })
  }, {
    key: _xfa_object.$text,
    value: function value() {
      if (this.exData) {
        if (typeof this.exData[_xfa_object.$content] === "string") {
          return this.exData[_xfa_object.$content].trim();
        }

        return this.exData[_xfa_object.$content][_xfa_object.$text]().trim();
      }

      var _iterator12 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var name = _step12.value;

          if (name === "image") {
            continue;
          }

          var obj = this[name];

          if (obj instanceof _xfa_object.XFAObject) {
            return (obj[_xfa_object.$content] || "").toString().trim();
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }

      return null;
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var _iterator13 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var name = _step13.value;
          var obj = this[name];

          if (!(obj instanceof _xfa_object.XFAObject)) {
            continue;
          }

          return obj[_xfa_object.$toHTML](availableSpace);
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }

      return _utils.HTMLResult.EMPTY;
    }
  }]);

  return Value;
}(_xfa_object.XFAObject);

exports.Value = Value;

var Variables = /*#__PURE__*/function (_XFAObject88) {
  _inherits(Variables, _XFAObject88);

  var _super113 = _createSuper(Variables);

  function Variables(attributes) {
    var _this114;

    _classCallCheck(this, Variables);

    _this114 = _super113.call(this, TEMPLATE_NS_ID, "variables", true);
    _this114.id = attributes.id || "";
    _this114.use = attributes.use || "";
    _this114.usehref = attributes.usehref || "";
    _this114["boolean"] = new _xfa_object.XFAObjectArray();
    _this114.date = new _xfa_object.XFAObjectArray();
    _this114.dateTime = new _xfa_object.XFAObjectArray();
    _this114.decimal = new _xfa_object.XFAObjectArray();
    _this114.exData = new _xfa_object.XFAObjectArray();
    _this114["float"] = new _xfa_object.XFAObjectArray();
    _this114.image = new _xfa_object.XFAObjectArray();
    _this114.integer = new _xfa_object.XFAObjectArray();
    _this114.manifest = new _xfa_object.XFAObjectArray();
    _this114.script = new _xfa_object.XFAObjectArray();
    _this114.text = new _xfa_object.XFAObjectArray();
    _this114.time = new _xfa_object.XFAObjectArray();
    return _this114;
  }

  _createClass(Variables, [{
    key: _xfa_object.$isTransparent,
    value: function value() {
      return true;
    }
  }]);

  return Variables;
}(_xfa_object.XFAObject);

var TemplateNamespace = /*#__PURE__*/function () {
  function TemplateNamespace() {
    _classCallCheck(this, TemplateNamespace);
  }

  _createClass(TemplateNamespace, null, [{
    key: _namespaces.$buildXFAObject,
    value: function value(name, attributes) {
      if (TemplateNamespace.hasOwnProperty(name)) {
        var node = TemplateNamespace[name](attributes);

        node[_xfa_object.$setSetAttributes](attributes);

        return node;
      }

      return undefined;
    }
  }, {
    key: "appearanceFilter",
    value: function appearanceFilter(attrs) {
      return new AppearanceFilter(attrs);
    }
  }, {
    key: "arc",
    value: function arc(attrs) {
      return new Arc(attrs);
    }
  }, {
    key: "area",
    value: function area(attrs) {
      return new Area(attrs);
    }
  }, {
    key: "assist",
    value: function assist(attrs) {
      return new Assist(attrs);
    }
  }, {
    key: "barcode",
    value: function barcode(attrs) {
      return new Barcode(attrs);
    }
  }, {
    key: "bind",
    value: function bind(attrs) {
      return new Bind(attrs);
    }
  }, {
    key: "bindItems",
    value: function bindItems(attrs) {
      return new BindItems(attrs);
    }
  }, {
    key: "bookend",
    value: function bookend(attrs) {
      return new Bookend(attrs);
    }
  }, {
    key: "boolean",
    value: function boolean(attrs) {
      return new BooleanElement(attrs);
    }
  }, {
    key: "border",
    value: function border(attrs) {
      return new Border(attrs);
    }
  }, {
    key: "break",
    value: function _break(attrs) {
      return new Break(attrs);
    }
  }, {
    key: "breakAfter",
    value: function breakAfter(attrs) {
      return new BreakAfter(attrs);
    }
  }, {
    key: "breakBefore",
    value: function breakBefore(attrs) {
      return new BreakBefore(attrs);
    }
  }, {
    key: "button",
    value: function button(attrs) {
      return new Button(attrs);
    }
  }, {
    key: "calculate",
    value: function calculate(attrs) {
      return new Calculate(attrs);
    }
  }, {
    key: "caption",
    value: function caption(attrs) {
      return new Caption(attrs);
    }
  }, {
    key: "certificate",
    value: function certificate(attrs) {
      return new Certificate(attrs);
    }
  }, {
    key: "certificates",
    value: function certificates(attrs) {
      return new Certificates(attrs);
    }
  }, {
    key: "checkButton",
    value: function checkButton(attrs) {
      return new CheckButton(attrs);
    }
  }, {
    key: "choiceList",
    value: function choiceList(attrs) {
      return new ChoiceList(attrs);
    }
  }, {
    key: "color",
    value: function color(attrs) {
      return new Color(attrs);
    }
  }, {
    key: "comb",
    value: function comb(attrs) {
      return new Comb(attrs);
    }
  }, {
    key: "connect",
    value: function connect(attrs) {
      return new Connect(attrs);
    }
  }, {
    key: "contentArea",
    value: function contentArea(attrs) {
      return new ContentArea(attrs);
    }
  }, {
    key: "corner",
    value: function corner(attrs) {
      return new Corner(attrs);
    }
  }, {
    key: "date",
    value: function date(attrs) {
      return new DateElement(attrs);
    }
  }, {
    key: "dateTime",
    value: function dateTime(attrs) {
      return new DateTime(attrs);
    }
  }, {
    key: "dateTimeEdit",
    value: function dateTimeEdit(attrs) {
      return new DateTimeEdit(attrs);
    }
  }, {
    key: "decimal",
    value: function decimal(attrs) {
      return new Decimal(attrs);
    }
  }, {
    key: "defaultUi",
    value: function defaultUi(attrs) {
      return new DefaultUi(attrs);
    }
  }, {
    key: "desc",
    value: function desc(attrs) {
      return new Desc(attrs);
    }
  }, {
    key: "digestMethod",
    value: function digestMethod(attrs) {
      return new DigestMethod(attrs);
    }
  }, {
    key: "digestMethods",
    value: function digestMethods(attrs) {
      return new DigestMethods(attrs);
    }
  }, {
    key: "draw",
    value: function draw(attrs) {
      return new Draw(attrs);
    }
  }, {
    key: "edge",
    value: function edge(attrs) {
      return new Edge(attrs);
    }
  }, {
    key: "encoding",
    value: function encoding(attrs) {
      return new Encoding(attrs);
    }
  }, {
    key: "encodings",
    value: function encodings(attrs) {
      return new Encodings(attrs);
    }
  }, {
    key: "encrypt",
    value: function encrypt(attrs) {
      return new Encrypt(attrs);
    }
  }, {
    key: "encryptData",
    value: function encryptData(attrs) {
      return new EncryptData(attrs);
    }
  }, {
    key: "encryption",
    value: function encryption(attrs) {
      return new Encryption(attrs);
    }
  }, {
    key: "encryptionMethod",
    value: function encryptionMethod(attrs) {
      return new EncryptionMethod(attrs);
    }
  }, {
    key: "encryptionMethods",
    value: function encryptionMethods(attrs) {
      return new EncryptionMethods(attrs);
    }
  }, {
    key: "event",
    value: function event(attrs) {
      return new Event(attrs);
    }
  }, {
    key: "exData",
    value: function exData(attrs) {
      return new ExData(attrs);
    }
  }, {
    key: "exObject",
    value: function exObject(attrs) {
      return new ExObject(attrs);
    }
  }, {
    key: "exclGroup",
    value: function exclGroup(attrs) {
      return new ExclGroup(attrs);
    }
  }, {
    key: "execute",
    value: function execute(attrs) {
      return new Execute(attrs);
    }
  }, {
    key: "extras",
    value: function extras(attrs) {
      return new Extras(attrs);
    }
  }, {
    key: "field",
    value: function field(attrs) {
      return new Field(attrs);
    }
  }, {
    key: "fill",
    value: function fill(attrs) {
      return new Fill(attrs);
    }
  }, {
    key: "filter",
    value: function filter(attrs) {
      return new Filter(attrs);
    }
  }, {
    key: "float",
    value: function float(attrs) {
      return new Float(attrs);
    }
  }, {
    key: "font",
    value: function font(attrs) {
      return new Font(attrs);
    }
  }, {
    key: "format",
    value: function format(attrs) {
      return new Format(attrs);
    }
  }, {
    key: "handler",
    value: function handler(attrs) {
      return new Handler(attrs);
    }
  }, {
    key: "hyphenation",
    value: function hyphenation(attrs) {
      return new Hyphenation(attrs);
    }
  }, {
    key: "image",
    value: function image(attrs) {
      return new Image(attrs);
    }
  }, {
    key: "imageEdit",
    value: function imageEdit(attrs) {
      return new ImageEdit(attrs);
    }
  }, {
    key: "integer",
    value: function integer(attrs) {
      return new Integer(attrs);
    }
  }, {
    key: "issuers",
    value: function issuers(attrs) {
      return new Issuers(attrs);
    }
  }, {
    key: "items",
    value: function items(attrs) {
      return new Items(attrs);
    }
  }, {
    key: "keep",
    value: function keep(attrs) {
      return new Keep(attrs);
    }
  }, {
    key: "keyUsage",
    value: function keyUsage(attrs) {
      return new KeyUsage(attrs);
    }
  }, {
    key: "line",
    value: function line(attrs) {
      return new Line(attrs);
    }
  }, {
    key: "linear",
    value: function linear(attrs) {
      return new Linear(attrs);
    }
  }, {
    key: "lockDocument",
    value: function lockDocument(attrs) {
      return new LockDocument(attrs);
    }
  }, {
    key: "manifest",
    value: function manifest(attrs) {
      return new Manifest(attrs);
    }
  }, {
    key: "margin",
    value: function margin(attrs) {
      return new Margin(attrs);
    }
  }, {
    key: "mdp",
    value: function mdp(attrs) {
      return new Mdp(attrs);
    }
  }, {
    key: "medium",
    value: function medium(attrs) {
      return new Medium(attrs);
    }
  }, {
    key: "message",
    value: function message(attrs) {
      return new Message(attrs);
    }
  }, {
    key: "numericEdit",
    value: function numericEdit(attrs) {
      return new NumericEdit(attrs);
    }
  }, {
    key: "occur",
    value: function occur(attrs) {
      return new Occur(attrs);
    }
  }, {
    key: "oid",
    value: function oid(attrs) {
      return new Oid(attrs);
    }
  }, {
    key: "oids",
    value: function oids(attrs) {
      return new Oids(attrs);
    }
  }, {
    key: "overflow",
    value: function overflow(attrs) {
      return new Overflow(attrs);
    }
  }, {
    key: "pageArea",
    value: function pageArea(attrs) {
      return new PageArea(attrs);
    }
  }, {
    key: "pageSet",
    value: function pageSet(attrs) {
      return new PageSet(attrs);
    }
  }, {
    key: "para",
    value: function para(attrs) {
      return new Para(attrs);
    }
  }, {
    key: "passwordEdit",
    value: function passwordEdit(attrs) {
      return new PasswordEdit(attrs);
    }
  }, {
    key: "pattern",
    value: function pattern(attrs) {
      return new Pattern(attrs);
    }
  }, {
    key: "picture",
    value: function picture(attrs) {
      return new Picture(attrs);
    }
  }, {
    key: "proto",
    value: function proto(attrs) {
      return new Proto(attrs);
    }
  }, {
    key: "radial",
    value: function radial(attrs) {
      return new Radial(attrs);
    }
  }, {
    key: "reason",
    value: function reason(attrs) {
      return new Reason(attrs);
    }
  }, {
    key: "reasons",
    value: function reasons(attrs) {
      return new Reasons(attrs);
    }
  }, {
    key: "rectangle",
    value: function rectangle(attrs) {
      return new Rectangle(attrs);
    }
  }, {
    key: "ref",
    value: function ref(attrs) {
      return new RefElement(attrs);
    }
  }, {
    key: "script",
    value: function script(attrs) {
      return new Script(attrs);
    }
  }, {
    key: "setProperty",
    value: function setProperty(attrs) {
      return new SetProperty(attrs);
    }
  }, {
    key: "signData",
    value: function signData(attrs) {
      return new SignData(attrs);
    }
  }, {
    key: "signature",
    value: function signature(attrs) {
      return new Signature(attrs);
    }
  }, {
    key: "signing",
    value: function signing(attrs) {
      return new Signing(attrs);
    }
  }, {
    key: "solid",
    value: function solid(attrs) {
      return new Solid(attrs);
    }
  }, {
    key: "speak",
    value: function speak(attrs) {
      return new Speak(attrs);
    }
  }, {
    key: "stipple",
    value: function stipple(attrs) {
      return new Stipple(attrs);
    }
  }, {
    key: "subform",
    value: function subform(attrs) {
      return new Subform(attrs);
    }
  }, {
    key: "subformSet",
    value: function subformSet(attrs) {
      return new SubformSet(attrs);
    }
  }, {
    key: "subjectDN",
    value: function subjectDN(attrs) {
      return new SubjectDN(attrs);
    }
  }, {
    key: "subjectDNs",
    value: function subjectDNs(attrs) {
      return new SubjectDNs(attrs);
    }
  }, {
    key: "submit",
    value: function submit(attrs) {
      return new Submit(attrs);
    }
  }, {
    key: "template",
    value: function template(attrs) {
      return new Template(attrs);
    }
  }, {
    key: "text",
    value: function text(attrs) {
      return new Text(attrs);
    }
  }, {
    key: "textEdit",
    value: function textEdit(attrs) {
      return new TextEdit(attrs);
    }
  }, {
    key: "time",
    value: function time(attrs) {
      return new Time(attrs);
    }
  }, {
    key: "timeStamp",
    value: function timeStamp(attrs) {
      return new TimeStamp(attrs);
    }
  }, {
    key: "toolTip",
    value: function toolTip(attrs) {
      return new ToolTip(attrs);
    }
  }, {
    key: "traversal",
    value: function traversal(attrs) {
      return new Traversal(attrs);
    }
  }, {
    key: "traverse",
    value: function traverse(attrs) {
      return new Traverse(attrs);
    }
  }, {
    key: "ui",
    value: function ui(attrs) {
      return new Ui(attrs);
    }
  }, {
    key: "validate",
    value: function validate(attrs) {
      return new Validate(attrs);
    }
  }, {
    key: "value",
    value: function value(attrs) {
      return new Value(attrs);
    }
  }, {
    key: "variables",
    value: function variables(attrs) {
      return new Variables(attrs);
    }
  }]);

  return TemplateNamespace;
}();

exports.TemplateNamespace = TemplateNamespace;