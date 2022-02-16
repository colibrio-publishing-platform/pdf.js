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
exports.XhtmlNamespace = void 0;

var _xfa_object = require("./xfa_object.js");

var _namespaces = require("./namespaces.js");

var _html_utils = require("./html_utils.js");

var _utils = require("./utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var XHTML_NS_ID = _namespaces.NamespaceIds.xhtml.id;
var $richText = Symbol();
var VALID_STYLES = new Set(["color", "font", "font-family", "font-size", "font-stretch", "font-style", "font-weight", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "letter-spacing", "line-height", "orphans", "page-break-after", "page-break-before", "page-break-inside", "tab-interval", "tab-stop", "text-align", "text-decoration", "text-indent", "vertical-align", "widows", "kerning-mode", "xfa-font-horizontal-scale", "xfa-font-vertical-scale", "xfa-spacerun", "xfa-tab-stops"]);
var StyleMapping = new Map([["page-break-after", "breakAfter"], ["page-break-before", "breakBefore"], ["page-break-inside", "breakInside"], ["kerning-mode", function (value) {
  return value === "none" ? "none" : "normal";
}], ["xfa-font-horizontal-scale", function (value) {
  return "scaleX(".concat(Math.max(0, Math.min(parseInt(value) / 100)).toFixed(2), ")");
}], ["xfa-font-vertical-scale", function (value) {
  return "scaleY(".concat(Math.max(0, Math.min(parseInt(value) / 100)).toFixed(2), ")");
}], ["xfa-spacerun", ""], ["xfa-tab-stops", ""], ["font-size", function (value, original) {
  value = original.fontSize = (0, _utils.getMeasurement)(value);
  return (0, _html_utils.measureToString)(0.99 * value);
}], ["letter-spacing", function (value) {
  return (0, _html_utils.measureToString)((0, _utils.getMeasurement)(value));
}], ["line-height", function (value) {
  return (0, _html_utils.measureToString)((0, _utils.getMeasurement)(value));
}], ["margin", function (value) {
  return (0, _html_utils.measureToString)((0, _utils.getMeasurement)(value));
}], ["margin-bottom", function (value) {
  return (0, _html_utils.measureToString)((0, _utils.getMeasurement)(value));
}], ["margin-left", function (value) {
  return (0, _html_utils.measureToString)((0, _utils.getMeasurement)(value));
}], ["margin-right", function (value) {
  return (0, _html_utils.measureToString)((0, _utils.getMeasurement)(value));
}], ["margin-top", function (value) {
  return (0, _html_utils.measureToString)((0, _utils.getMeasurement)(value));
}], ["text-indent", function (value) {
  return (0, _html_utils.measureToString)((0, _utils.getMeasurement)(value));
}], ["font-family", function (value) {
  return value;
}], ["vertical-align", function (value) {
  return (0, _html_utils.measureToString)((0, _utils.getMeasurement)(value));
}]]);
var spacesRegExp = /\s+/g;
var crlfRegExp = /[\r\n]+/g;
var crlfForRichTextRegExp = /\r\n?/g;

function mapStyle(styleStr, node, richText) {
  var style = Object.create(null);

  if (!styleStr) {
    return style;
  }

  var original = Object.create(null);

  var _iterator = _createForOfIteratorHelper(styleStr.split(";").map(function (s) {
    return s.split(":", 2);
  })),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      var mapping = StyleMapping.get(key);

      if (mapping === "") {
        continue;
      }

      var newValue = value;

      if (mapping) {
        if (typeof mapping === "string") {
          newValue = mapping;
        } else {
          newValue = mapping(value, original);
        }
      }

      if (key.endsWith("scale")) {
        if (style.transform) {
          style.transform = "".concat(style[key], " ").concat(newValue);
        } else {
          style.transform = newValue;
        }
      } else {
        style[key.replaceAll(/-([a-zA-Z])/g, function (_, x) {
          return x.toUpperCase();
        })] = newValue;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (style.fontFamily) {
    (0, _html_utils.setFontFamily)({
      typeface: style.fontFamily,
      weight: style.fontWeight || "normal",
      posture: style.fontStyle || "normal",
      size: original.fontSize || 0
    }, node, node[_xfa_object.$globalData].fontFinder, style);
  }

  if (richText && style.verticalAlign && style.verticalAlign !== "0px" && style.fontSize) {
    var SUB_SUPER_SCRIPT_FACTOR = 0.583;
    var VERTICAL_FACTOR = 0.333;
    var fontSize = (0, _utils.getMeasurement)(style.fontSize);
    style.fontSize = (0, _html_utils.measureToString)(fontSize * SUB_SUPER_SCRIPT_FACTOR);
    style.verticalAlign = (0, _html_utils.measureToString)(Math.sign((0, _utils.getMeasurement)(style.verticalAlign)) * fontSize * VERTICAL_FACTOR);
  }

  (0, _html_utils.fixTextIndent)(style);
  return style;
}

function checkStyle(node) {
  if (!node.style) {
    return "";
  }

  return node.style.trim().split(/\s*;\s*/).filter(function (s) {
    return !!s;
  }).map(function (s) {
    return s.split(/\s*:\s*/, 2);
  }).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (key === "font-family") {
      node[_xfa_object.$globalData].usedTypefaces.add(value);
    }

    return VALID_STYLES.has(key);
  }).map(function (kv) {
    return kv.join(":");
  }).join(";");
}

var NoWhites = new Set(["body", "html"]);

var XhtmlObject = /*#__PURE__*/function (_XmlObject) {
  _inherits(XhtmlObject, _XmlObject);

  var _super = _createSuper(XhtmlObject);

  function XhtmlObject(attributes, name) {
    var _this;

    _classCallCheck(this, XhtmlObject);

    _this = _super.call(this, XHTML_NS_ID, name);
    _this[$richText] = false;
    _this.style = attributes.style || "";
    return _this;
  }

  _createClass(XhtmlObject, [{
    key: _xfa_object.$clean,
    value: function value(builder) {
      _get(_getPrototypeOf(XhtmlObject.prototype), _xfa_object.$clean, this).call(this, builder);

      this.style = checkStyle(this);
    }
  }, {
    key: _xfa_object.$acceptWhitespace,
    value: function value() {
      return !NoWhites.has(this[_xfa_object.$nodeName]);
    }
  }, {
    key: _xfa_object.$onText,
    value: function value(str) {
      var richText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!richText) {
        str = str.replace(crlfRegExp, "");

        if (!this.style.includes("xfa-spacerun:yes")) {
          str = str.replace(spacesRegExp, " ");
        }
      } else {
        this[$richText] = true;
      }

      if (str) {
        this[_xfa_object.$content] += str;
      }
    }
  }, {
    key: _xfa_object.$pushGlyphs,
    value: function value(measure) {
      var mustPop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var xfaFont = Object.create(null);
      var margin = {
        top: NaN,
        bottom: NaN,
        left: NaN,
        right: NaN
      };
      var lineHeight = null;

      var _iterator2 = _createForOfIteratorHelper(this.style.split(";").map(function (s) {
        return s.split(":", 2);
      })),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              key = _step2$value[0],
              value = _step2$value[1];

          switch (key) {
            case "font-family":
              xfaFont.typeface = (0, _utils.stripQuotes)(value);
              break;

            case "font-size":
              xfaFont.size = (0, _utils.getMeasurement)(value);
              break;

            case "font-weight":
              xfaFont.weight = value;
              break;

            case "font-style":
              xfaFont.posture = value;
              break;

            case "letter-spacing":
              xfaFont.letterSpacing = (0, _utils.getMeasurement)(value);
              break;

            case "margin":
              var values = value.split(/ \t/).map(function (x) {
                return (0, _utils.getMeasurement)(x);
              });

              switch (values.length) {
                case 1:
                  margin.top = margin.bottom = margin.left = margin.right = values[0];
                  break;

                case 2:
                  margin.top = margin.bottom = values[0];
                  margin.left = margin.right = values[1];
                  break;

                case 3:
                  margin.top = values[0];
                  margin.bottom = values[2];
                  margin.left = margin.right = values[1];
                  break;

                case 4:
                  margin.top = values[0];
                  margin.left = values[1];
                  margin.bottom = values[2];
                  margin.right = values[3];
                  break;
              }

              break;

            case "margin-top":
              margin.top = (0, _utils.getMeasurement)(value);
              break;

            case "margin-bottom":
              margin.bottom = (0, _utils.getMeasurement)(value);
              break;

            case "margin-left":
              margin.left = (0, _utils.getMeasurement)(value);
              break;

            case "margin-right":
              margin.right = (0, _utils.getMeasurement)(value);
              break;

            case "line-height":
              lineHeight = (0, _utils.getMeasurement)(value);
              break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      measure.pushData(xfaFont, margin, lineHeight);

      if (this[_xfa_object.$content]) {
        measure.addString(this[_xfa_object.$content]);
      } else {
        var _iterator3 = _createForOfIteratorHelper(this[_xfa_object.$getChildren]()),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var child = _step3.value;

            if (child[_xfa_object.$nodeName] === "#text") {
              measure.addString(child[_xfa_object.$content]);
              continue;
            }

            child[_xfa_object.$pushGlyphs](measure);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      if (mustPop) {
        measure.popFont();
      }
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var children = [];
      this[_xfa_object.$extra] = {
        children: children
      };

      this[_xfa_object.$childrenToHTML]({});

      if (children.length === 0 && !this[_xfa_object.$content]) {
        return _utils.HTMLResult.EMPTY;
      }

      var value;

      if (this[$richText]) {
        value = this[_xfa_object.$content] ? this[_xfa_object.$content].replace(crlfForRichTextRegExp, "\n") : undefined;
      } else {
        value = this[_xfa_object.$content] || undefined;
      }

      return _utils.HTMLResult.success({
        name: this[_xfa_object.$nodeName],
        attributes: {
          href: this.href,
          style: mapStyle(this.style, this, this[$richText])
        },
        children: children,
        value: value
      });
    }
  }]);

  return XhtmlObject;
}(_xfa_object.XmlObject);

var A = /*#__PURE__*/function (_XhtmlObject) {
  _inherits(A, _XhtmlObject);

  var _super2 = _createSuper(A);

  function A(attributes) {
    var _this2;

    _classCallCheck(this, A);

    _this2 = _super2.call(this, attributes, "a");
    _this2.href = (0, _html_utils.fixURL)(attributes.href) || "";
    return _this2;
  }

  return _createClass(A);
}(XhtmlObject);

var B = /*#__PURE__*/function (_XhtmlObject2) {
  _inherits(B, _XhtmlObject2);

  var _super3 = _createSuper(B);

  function B(attributes) {
    _classCallCheck(this, B);

    return _super3.call(this, attributes, "b");
  }

  _createClass(B, [{
    key: _xfa_object.$pushGlyphs,
    value: function value(measure) {
      measure.pushFont({
        weight: "bold"
      });

      _get(_getPrototypeOf(B.prototype), _xfa_object.$pushGlyphs, this).call(this, measure);

      measure.popFont();
    }
  }]);

  return B;
}(XhtmlObject);

var Body = /*#__PURE__*/function (_XhtmlObject3) {
  _inherits(Body, _XhtmlObject3);

  var _super4 = _createSuper(Body);

  function Body(attributes) {
    _classCallCheck(this, Body);

    return _super4.call(this, attributes, "body");
  }

  _createClass(Body, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var res = _get(_getPrototypeOf(Body.prototype), _xfa_object.$toHTML, this).call(this, availableSpace);

      var html = res.html;

      if (!html) {
        return _utils.HTMLResult.EMPTY;
      }

      html.name = "div";
      html.attributes["class"] = ["xfaRich"];
      return res;
    }
  }]);

  return Body;
}(XhtmlObject);

var Br = /*#__PURE__*/function (_XhtmlObject4) {
  _inherits(Br, _XhtmlObject4);

  var _super5 = _createSuper(Br);

  function Br(attributes) {
    _classCallCheck(this, Br);

    return _super5.call(this, attributes, "br");
  }

  _createClass(Br, [{
    key: _xfa_object.$text,
    value: function value() {
      return "\n";
    }
  }, {
    key: _xfa_object.$pushGlyphs,
    value: function value(measure) {
      measure.addString("\n");
    }
  }, {
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      return _utils.HTMLResult.success({
        name: "br"
      });
    }
  }]);

  return Br;
}(XhtmlObject);

var Html = /*#__PURE__*/function (_XhtmlObject5) {
  _inherits(Html, _XhtmlObject5);

  var _super6 = _createSuper(Html);

  function Html(attributes) {
    _classCallCheck(this, Html);

    return _super6.call(this, attributes, "html");
  }

  _createClass(Html, [{
    key: _xfa_object.$toHTML,
    value: function value(availableSpace) {
      var children = [];
      this[_xfa_object.$extra] = {
        children: children
      };

      this[_xfa_object.$childrenToHTML]({});

      if (children.length === 0) {
        return _utils.HTMLResult.success({
          name: "div",
          attributes: {
            "class": ["xfaRich"],
            style: {}
          },
          value: this[_xfa_object.$content] || ""
        });
      }

      if (children.length === 1) {
        var child = children[0];

        if (child.attributes && child.attributes["class"].includes("xfaRich")) {
          return _utils.HTMLResult.success(child);
        }
      }

      return _utils.HTMLResult.success({
        name: "div",
        attributes: {
          "class": ["xfaRich"],
          style: {}
        },
        children: children
      });
    }
  }]);

  return Html;
}(XhtmlObject);

var I = /*#__PURE__*/function (_XhtmlObject6) {
  _inherits(I, _XhtmlObject6);

  var _super7 = _createSuper(I);

  function I(attributes) {
    _classCallCheck(this, I);

    return _super7.call(this, attributes, "i");
  }

  _createClass(I, [{
    key: _xfa_object.$pushGlyphs,
    value: function value(measure) {
      measure.pushFont({
        posture: "italic"
      });

      _get(_getPrototypeOf(I.prototype), _xfa_object.$pushGlyphs, this).call(this, measure);

      measure.popFont();
    }
  }]);

  return I;
}(XhtmlObject);

var Li = /*#__PURE__*/function (_XhtmlObject7) {
  _inherits(Li, _XhtmlObject7);

  var _super8 = _createSuper(Li);

  function Li(attributes) {
    _classCallCheck(this, Li);

    return _super8.call(this, attributes, "li");
  }

  return _createClass(Li);
}(XhtmlObject);

var Ol = /*#__PURE__*/function (_XhtmlObject8) {
  _inherits(Ol, _XhtmlObject8);

  var _super9 = _createSuper(Ol);

  function Ol(attributes) {
    _classCallCheck(this, Ol);

    return _super9.call(this, attributes, "ol");
  }

  return _createClass(Ol);
}(XhtmlObject);

var P = /*#__PURE__*/function (_XhtmlObject9) {
  _inherits(P, _XhtmlObject9);

  var _super10 = _createSuper(P);

  function P(attributes) {
    _classCallCheck(this, P);

    return _super10.call(this, attributes, "p");
  }

  _createClass(P, [{
    key: _xfa_object.$pushGlyphs,
    value: function value(measure) {
      _get(_getPrototypeOf(P.prototype), _xfa_object.$pushGlyphs, this).call(this, measure, false);

      measure.addString("\n");
      measure.addPara();
      measure.popFont();
    }
  }, {
    key: _xfa_object.$text,
    value: function value() {
      var siblings = this[_xfa_object.$getParent]()[_xfa_object.$getChildren]();

      if (siblings[siblings.length - 1] === this) {
        return _get(_getPrototypeOf(P.prototype), _xfa_object.$text, this).call(this);
      }

      return _get(_getPrototypeOf(P.prototype), _xfa_object.$text, this).call(this) + "\n";
    }
  }]);

  return P;
}(XhtmlObject);

var Span = /*#__PURE__*/function (_XhtmlObject10) {
  _inherits(Span, _XhtmlObject10);

  var _super11 = _createSuper(Span);

  function Span(attributes) {
    _classCallCheck(this, Span);

    return _super11.call(this, attributes, "span");
  }

  return _createClass(Span);
}(XhtmlObject);

var Sub = /*#__PURE__*/function (_XhtmlObject11) {
  _inherits(Sub, _XhtmlObject11);

  var _super12 = _createSuper(Sub);

  function Sub(attributes) {
    _classCallCheck(this, Sub);

    return _super12.call(this, attributes, "sub");
  }

  return _createClass(Sub);
}(XhtmlObject);

var Sup = /*#__PURE__*/function (_XhtmlObject12) {
  _inherits(Sup, _XhtmlObject12);

  var _super13 = _createSuper(Sup);

  function Sup(attributes) {
    _classCallCheck(this, Sup);

    return _super13.call(this, attributes, "sup");
  }

  return _createClass(Sup);
}(XhtmlObject);

var Ul = /*#__PURE__*/function (_XhtmlObject13) {
  _inherits(Ul, _XhtmlObject13);

  var _super14 = _createSuper(Ul);

  function Ul(attributes) {
    _classCallCheck(this, Ul);

    return _super14.call(this, attributes, "ul");
  }

  return _createClass(Ul);
}(XhtmlObject);

var XhtmlNamespace = /*#__PURE__*/function () {
  function XhtmlNamespace() {
    _classCallCheck(this, XhtmlNamespace);
  }

  _createClass(XhtmlNamespace, null, [{
    key: _namespaces.$buildXFAObject,
    value: function value(name, attributes) {
      if (XhtmlNamespace.hasOwnProperty(name)) {
        return XhtmlNamespace[name](attributes);
      }

      return undefined;
    }
  }, {
    key: "a",
    value: function a(attributes) {
      return new A(attributes);
    }
  }, {
    key: "b",
    value: function b(attributes) {
      return new B(attributes);
    }
  }, {
    key: "body",
    value: function body(attributes) {
      return new Body(attributes);
    }
  }, {
    key: "br",
    value: function br(attributes) {
      return new Br(attributes);
    }
  }, {
    key: "html",
    value: function html(attributes) {
      return new Html(attributes);
    }
  }, {
    key: "i",
    value: function i(attributes) {
      return new I(attributes);
    }
  }, {
    key: "li",
    value: function li(attributes) {
      return new Li(attributes);
    }
  }, {
    key: "ol",
    value: function ol(attributes) {
      return new Ol(attributes);
    }
  }, {
    key: "p",
    value: function p(attributes) {
      return new P(attributes);
    }
  }, {
    key: "span",
    value: function span(attributes) {
      return new Span(attributes);
    }
  }, {
    key: "sub",
    value: function sub(attributes) {
      return new Sub(attributes);
    }
  }, {
    key: "sup",
    value: function sup(attributes) {
      return new Sup(attributes);
    }
  }, {
    key: "ul",
    value: function ul(attributes) {
      return new Ul(attributes);
    }
  }]);

  return XhtmlNamespace;
}();

exports.XhtmlNamespace = XhtmlNamespace;