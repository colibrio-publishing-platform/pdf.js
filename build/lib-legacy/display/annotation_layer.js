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
exports.AnnotationLayer = exports.AnnotationElement = void 0;

var _util = require("../shared/util.js");

var _display_utils = require("./display_utils.js");

var _annotation_storage = require("./annotation_storage.js");

var _scripting_utils = require("../shared/scripting_utils.js");

var _xfa_layer = require("./xfa_layer.js");

function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_TAB_INDEX = 1000;
var GetElementsByNameSet = new WeakSet();

var AnnotationElementFactory = /*#__PURE__*/function () {
  function AnnotationElementFactory() {
    _classCallCheck(this, AnnotationElementFactory);
  }

  _createClass(AnnotationElementFactory, null, [{
    key: "create",
    value: function create(parameters) {
      var subtype = parameters.data.annotationType;

      switch (subtype) {
        case _util.AnnotationType.LINK:
          return new LinkAnnotationElement(parameters);

        case _util.AnnotationType.TEXT:
          return new TextAnnotationElement(parameters);

        case _util.AnnotationType.WIDGET:
          var fieldType = parameters.data.fieldType;

          switch (fieldType) {
            case "Tx":
              return new TextWidgetAnnotationElement(parameters);

            case "Btn":
              if (parameters.data.radioButton) {
                return new RadioButtonWidgetAnnotationElement(parameters);
              } else if (parameters.data.checkBox) {
                return new CheckboxWidgetAnnotationElement(parameters);
              }

              return new PushButtonWidgetAnnotationElement(parameters);

            case "Ch":
              return new ChoiceWidgetAnnotationElement(parameters);
          }

          return new WidgetAnnotationElement(parameters);

        case _util.AnnotationType.POPUP:
          return new PopupAnnotationElement(parameters);

        case _util.AnnotationType.FREETEXT:
          return new FreeTextAnnotationElement(parameters);

        case _util.AnnotationType.LINE:
          return new LineAnnotationElement(parameters);

        case _util.AnnotationType.SQUARE:
          return new SquareAnnotationElement(parameters);

        case _util.AnnotationType.CIRCLE:
          return new CircleAnnotationElement(parameters);

        case _util.AnnotationType.POLYLINE:
          return new PolylineAnnotationElement(parameters);

        case _util.AnnotationType.CARET:
          return new CaretAnnotationElement(parameters);

        case _util.AnnotationType.INK:
          return new InkAnnotationElement(parameters);

        case _util.AnnotationType.POLYGON:
          return new PolygonAnnotationElement(parameters);

        case _util.AnnotationType.HIGHLIGHT:
          return new HighlightAnnotationElement(parameters);

        case _util.AnnotationType.UNDERLINE:
          return new UnderlineAnnotationElement(parameters);

        case _util.AnnotationType.SQUIGGLY:
          return new SquigglyAnnotationElement(parameters);

        case _util.AnnotationType.STRIKEOUT:
          return new StrikeOutAnnotationElement(parameters);

        case _util.AnnotationType.STAMP:
          return new StampAnnotationElement(parameters);

        case _util.AnnotationType.FILEATTACHMENT:
          return new FileAttachmentAnnotationElement(parameters);

        default:
          return new AnnotationElement(parameters);
      }
    }
  }]);

  return AnnotationElementFactory;
}();

var AnnotationElement = /*#__PURE__*/function () {
  function AnnotationElement(parameters) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$isRenderable = _ref.isRenderable,
        isRenderable = _ref$isRenderable === void 0 ? false : _ref$isRenderable,
        _ref$ignoreBorder = _ref.ignoreBorder,
        ignoreBorder = _ref$ignoreBorder === void 0 ? false : _ref$ignoreBorder,
        _ref$createQuadrilate = _ref.createQuadrilaterals,
        createQuadrilaterals = _ref$createQuadrilate === void 0 ? false : _ref$createQuadrilate;

    _classCallCheck(this, AnnotationElement);

    this.isRenderable = isRenderable;
    this.data = parameters.data;
    this.layer = parameters.layer;
    this.page = parameters.page;
    this.viewport = parameters.viewport;
    this.linkService = parameters.linkService;
    this.downloadManager = parameters.downloadManager;
    this.imageResourcesPath = parameters.imageResourcesPath;
    this.renderForms = parameters.renderForms;
    this.svgFactory = parameters.svgFactory;
    this.annotationStorage = parameters.annotationStorage;
    this.enableScripting = parameters.enableScripting;
    this.hasJSActions = parameters.hasJSActions;
    this._fieldObjects = parameters.fieldObjects;
    this._mouseState = parameters.mouseState;

    if (isRenderable) {
      this.container = this._createContainer(ignoreBorder);
    }

    if (createQuadrilaterals) {
      this.quadrilaterals = this._createQuadrilaterals(ignoreBorder);
    }
  }

  _createClass(AnnotationElement, [{
    key: "_createContainer",
    value: function _createContainer() {
      var ignoreBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var data = this.data,
          page = this.page,
          viewport = this.viewport;
      var container = document.createElement("section");
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      container.setAttribute("data-annotation-id", data.id);

      var rect = _util.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

      if (data.hasOwnCanvas) {
        var transform = viewport.transform.slice();

        var _Util$singularValueDe = _util.Util.singularValueDecompose2dScale(transform),
            _Util$singularValueDe2 = _slicedToArray(_Util$singularValueDe, 2),
            scaleX = _Util$singularValueDe2[0],
            scaleY = _Util$singularValueDe2[1];

        width = Math.ceil(width * scaleX);
        height = Math.ceil(height * scaleY);
        rect[0] *= scaleX;
        rect[1] *= scaleY;

        for (var i = 0; i < 4; i++) {
          transform[i] = Math.sign(transform[i]);
        }

        container.style.transform = "matrix(".concat(transform.join(","), ")");
      } else {
        container.style.transform = "matrix(".concat(viewport.transform.join(","), ")");
      }

      container.style.transformOrigin = "".concat(-rect[0], "px ").concat(-rect[1], "px");

      if (!ignoreBorder && data.borderStyle.width > 0) {
        container.style.borderWidth = "".concat(data.borderStyle.width, "px");

        if (data.borderStyle.style !== _util.AnnotationBorderStyleType.UNDERLINE) {
          width -= 2 * data.borderStyle.width;
          height -= 2 * data.borderStyle.width;
        }

        var horizontalRadius = data.borderStyle.horizontalCornerRadius;
        var verticalRadius = data.borderStyle.verticalCornerRadius;

        if (horizontalRadius > 0 || verticalRadius > 0) {
          var radius = "".concat(horizontalRadius, "px / ").concat(verticalRadius, "px");
          container.style.borderRadius = radius;
        }

        switch (data.borderStyle.style) {
          case _util.AnnotationBorderStyleType.SOLID:
            container.style.borderStyle = "solid";
            break;

          case _util.AnnotationBorderStyleType.DASHED:
            container.style.borderStyle = "dashed";
            break;

          case _util.AnnotationBorderStyleType.BEVELED:
            (0, _util.warn)("Unimplemented border style: beveled");
            break;

          case _util.AnnotationBorderStyleType.INSET:
            (0, _util.warn)("Unimplemented border style: inset");
            break;

          case _util.AnnotationBorderStyleType.UNDERLINE:
            container.style.borderBottomStyle = "solid";
            break;

          default:
            break;
        }

        var borderColor = data.borderColor || data.color || null;

        if (borderColor) {
          container.style.borderColor = _util.Util.makeHexColor(data.color[0] | 0, data.color[1] | 0, data.color[2] | 0);
        } else {
          container.style.borderWidth = 0;
        }
      }

      container.style.left = "".concat(rect[0], "px");
      container.style.top = "".concat(rect[1], "px");

      if (data.hasOwnCanvas) {
        container.style.width = container.style.height = "auto";
      } else {
        container.style.width = "".concat(width, "px");
        container.style.height = "".concat(height, "px");
      }

      return container;
    }
  }, {
    key: "_createQuadrilaterals",
    value: function _createQuadrilaterals() {
      var ignoreBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.data.quadPoints) {
        return null;
      }

      var quadrilaterals = [];
      var savedRect = this.data.rect;

      var _iterator = _createForOfIteratorHelper(this.data.quadPoints),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var quadPoint = _step.value;
          this.data.rect = [quadPoint[2].x, quadPoint[2].y, quadPoint[1].x, quadPoint[1].y];
          quadrilaterals.push(this._createContainer(ignoreBorder));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.data.rect = savedRect;
      return quadrilaterals;
    }
  }, {
    key: "_createPopup",
    value: function _createPopup(trigger, data) {
      var container = this.container;

      if (this.quadrilaterals) {
        trigger = trigger || this.quadrilaterals;
        container = this.quadrilaterals[0];
      }

      if (!trigger) {
        trigger = document.createElement("div");
        trigger.style.height = container.style.height;
        trigger.style.width = container.style.width;
        container.appendChild(trigger);
      }

      var popupElement = new PopupElement({
        container: container,
        trigger: trigger,
        color: data.color,
        titleObj: data.titleObj,
        modificationDate: data.modificationDate,
        contentsObj: data.contentsObj,
        richText: data.richText,
        hideWrapper: true
      });
      var popup = popupElement.render();
      popup.style.left = container.style.width;
      container.appendChild(popup);
    }
  }, {
    key: "_renderQuadrilaterals",
    value: function _renderQuadrilaterals(className) {
      (0, _util.assert)(this.quadrilaterals, "Missing quadrilaterals during rendering");

      var _iterator2 = _createForOfIteratorHelper(this.quadrilaterals),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var quadrilateral = _step2.value;
          quadrilateral.className = className;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return this.quadrilaterals;
    }
  }, {
    key: "render",
    value: function render() {
      (0, _util.unreachable)("Abstract method `AnnotationElement.render` called");
    }
  }, {
    key: "_getElementsByName",
    value: function _getElementsByName(name) {
      var skipId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fields = [];

      if (this._fieldObjects) {
        var fieldObj = this._fieldObjects[name];

        if (fieldObj) {
          var _iterator3 = _createForOfIteratorHelper(fieldObj),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _step3$value = _step3.value,
                  page = _step3$value.page,
                  id = _step3$value.id,
                  exportValues = _step3$value.exportValues;

              if (page === -1) {
                continue;
              }

              if (id === skipId) {
                continue;
              }

              var exportValue = typeof exportValues === "string" ? exportValues : null;
              var domElement = document.getElementById(id);

              if (domElement && !GetElementsByNameSet.has(domElement)) {
                (0, _util.warn)("_getElementsByName - element not allowed: ".concat(id));
                continue;
              }

              fields.push({
                id: id,
                exportValue: exportValue,
                domElement: domElement
              });
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }

        return fields;
      }

      var _iterator4 = _createForOfIteratorHelper(document.getElementsByName(name)),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _domElement = _step4.value;
          var _id = _domElement.id,
              _exportValue = _domElement.exportValue;

          if (_id === skipId) {
            continue;
          }

          if (!GetElementsByNameSet.has(_domElement)) {
            continue;
          }

          fields.push({
            id: _id,
            exportValue: _exportValue,
            domElement: _domElement
          });
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return fields;
    }
  }], [{
    key: "platform",
    get: function get() {
      var platform = typeof navigator !== "undefined" ? navigator.platform : "";
      return (0, _util.shadow)(this, "platform", {
        isWin: platform.includes("Win"),
        isMac: platform.includes("Mac")
      });
    }
  }]);

  return AnnotationElement;
}();

exports.AnnotationElement = AnnotationElement;

var LinkAnnotationElement = /*#__PURE__*/function (_AnnotationElement) {
  _inherits(LinkAnnotationElement, _AnnotationElement);

  var _super = _createSuper(LinkAnnotationElement);

  function LinkAnnotationElement(parameters) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, LinkAnnotationElement);

    var isRenderable = !!(parameters.data.url || parameters.data.dest || parameters.data.action || parameters.data.isTooltipOnly || parameters.data.resetForm || parameters.data.actions && (parameters.data.actions.Action || parameters.data.actions["Mouse Up"] || parameters.data.actions["Mouse Down"]));
    return _super.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: !!(options !== null && options !== void 0 && options.ignoreBorder),
      createQuadrilaterals: true
    });
  }

  _createClass(LinkAnnotationElement, [{
    key: "render",
    value: function render() {
      var data = this.data,
          linkService = this.linkService;
      var link = document.createElement("a");

      if (data.url) {
        var _linkService$addLinkA;

        if (!linkService.addLinkAttributes) {
          (0, _util.warn)("LinkAnnotationElement.render - missing `addLinkAttributes`-method on the `linkService`-instance.");
        }

        (_linkService$addLinkA = linkService.addLinkAttributes) === null || _linkService$addLinkA === void 0 ? void 0 : _linkService$addLinkA.call(linkService, link, data.url, data.newWindow);
      } else if (data.action) {
        this._bindNamedAction(link, data.action);
      } else if (data.dest) {
        this._bindLink(link, data.dest);
      } else {
        var hasClickAction = false;

        if (data.actions && (data.actions.Action || data.actions["Mouse Up"] || data.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions) {
          hasClickAction = true;

          this._bindJSAction(link, data);
        }

        if (data.resetForm) {
          this._bindResetFormAction(link, data.resetForm);
        } else if (!hasClickAction) {
          this._bindLink(link, "");
        }
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("linkAnnotation").map(function (quadrilateral, index) {
          var linkElement = index === 0 ? link : link.cloneNode();
          quadrilateral.appendChild(linkElement);
          return quadrilateral;
        });
      }

      this.container.className = "linkAnnotation";
      this.container.appendChild(link);
      return this.container;
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(link, destination) {
      var _this = this;

      link.href = this.linkService.getDestinationHash(destination);

      link.onclick = function () {
        if (destination) {
          _this.linkService.goToDestination(destination);
        }

        return false;
      };

      if (destination || destination === "") {
        link.className = "internalLink";
      }
    }
  }, {
    key: "_bindNamedAction",
    value: function _bindNamedAction(link, action) {
      var _this2 = this;

      link.href = this.linkService.getAnchorUrl("");

      link.onclick = function () {
        _this2.linkService.executeNamedAction(action);

        return false;
      };

      link.className = "internalLink";
    }
  }, {
    key: "_bindJSAction",
    value: function _bindJSAction(link, data) {
      var _this3 = this;

      link.href = this.linkService.getAnchorUrl("");
      var map = new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);

      var _loop = function _loop() {
        var name = _Object$keys[_i2];
        var jsName = map.get(name);

        if (!jsName) {
          return "continue";
        }

        link[jsName] = function () {
          var _this3$linkService$ev;

          (_this3$linkService$ev = _this3.linkService.eventBus) === null || _this3$linkService$ev === void 0 ? void 0 : _this3$linkService$ev.dispatch("dispatcheventinsandbox", {
            source: _this3,
            detail: {
              id: data.id,
              name: name
            }
          });
          return false;
        };
      };

      for (var _i2 = 0, _Object$keys = Object.keys(data.actions); _i2 < _Object$keys.length; _i2++) {
        var _ret = _loop();

        if (_ret === "continue") continue;
      }

      if (!link.onclick) {
        link.onclick = function () {
          return false;
        };
      }

      link.className = "internalLink";
    }
  }, {
    key: "_bindResetFormAction",
    value: function _bindResetFormAction(link, resetForm) {
      var _this4 = this;

      var otherClickAction = link.onclick;

      if (!otherClickAction) {
        link.href = this.linkService.getAnchorUrl("");
      }

      link.className = "internalLink";

      if (!this._fieldObjects) {
        (0, _util.warn)("_bindResetFormAction - \"resetForm\" action not supported, " + "ensure that the `fieldObjects` parameter is provided.");

        if (!otherClickAction) {
          link.onclick = function () {
            return false;
          };
        }

        return;
      }

      link.onclick = function () {
        if (otherClickAction) {
          otherClickAction();
        }

        var resetFormFields = resetForm.fields,
            resetFormRefs = resetForm.refs,
            include = resetForm.include;
        var allFields = [];

        if (resetFormFields.length !== 0 || resetFormRefs.length !== 0) {
          var fieldIds = new Set(resetFormRefs);

          var _iterator5 = _createForOfIteratorHelper(resetFormFields),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var fieldName = _step5.value;

              var _fields = _this4._fieldObjects[fieldName] || [];

              var _iterator7 = _createForOfIteratorHelper(_fields),
                  _step7;

              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  var id = _step7.value.id;
                  fieldIds.add(id);
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          for (var _i3 = 0, _Object$values = Object.values(_this4._fieldObjects); _i3 < _Object$values.length; _i3++) {
            var fields = _Object$values[_i3];

            var _iterator6 = _createForOfIteratorHelper(fields),
                _step6;

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var field = _step6.value;

                if (fieldIds.has(field.id) === include) {
                  allFields.push(field);
                }
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
        } else {
          for (var _i4 = 0, _Object$values2 = Object.values(_this4._fieldObjects); _i4 < _Object$values2.length; _i4++) {
            var _fields2 = _Object$values2[_i4];
            allFields.push.apply(allFields, _toConsumableArray(_fields2));
          }
        }

        var storage = _this4.annotationStorage;
        var allIds = [];

        for (var _i5 = 0, _allFields = allFields; _i5 < _allFields.length; _i5++) {
          var _field = _allFields[_i5];
          var _id2 = _field.id;
          allIds.push(_id2);

          switch (_field.type) {
            case "text":
              {
                var value = _field.defaultValue || "";
                storage.setValue(_id2, {
                  value: value,
                  valueAsString: value
                });
                break;
              }

            case "checkbox":
            case "radiobutton":
              {
                var _value = _field.defaultValue === _field.exportValues;

                storage.setValue(_id2, {
                  value: _value
                });
                break;
              }

            case "combobox":
            case "listbox":
              {
                var _value2 = _field.defaultValue || "";

                storage.setValue(_id2, {
                  value: _value2
                });
                break;
              }

            default:
              continue;
          }

          var domElement = document.getElementById(_id2);

          if (!domElement || !GetElementsByNameSet.has(domElement)) {
            continue;
          }

          domElement.dispatchEvent(new Event("resetform"));
        }

        if (_this4.enableScripting) {
          var _this4$linkService$ev;

          (_this4$linkService$ev = _this4.linkService.eventBus) === null || _this4$linkService$ev === void 0 ? void 0 : _this4$linkService$ev.dispatch("dispatcheventinsandbox", {
            source: _this4,
            detail: {
              id: "app",
              ids: allIds,
              name: "ResetForm"
            }
          });
        }

        return false;
      };
    }
  }]);

  return LinkAnnotationElement;
}(AnnotationElement);

var TextAnnotationElement = /*#__PURE__*/function (_AnnotationElement2) {
  _inherits(TextAnnotationElement, _AnnotationElement2);

  var _super2 = _createSuper(TextAnnotationElement);

  function TextAnnotationElement(parameters) {
    var _parameters$data$titl, _parameters$data$cont, _parameters$data$rich;

    _classCallCheck(this, TextAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl = parameters.data.titleObj) !== null && _parameters$data$titl !== void 0 && _parameters$data$titl.str || (_parameters$data$cont = parameters.data.contentsObj) !== null && _parameters$data$cont !== void 0 && _parameters$data$cont.str || (_parameters$data$rich = parameters.data.richText) !== null && _parameters$data$rich !== void 0 && _parameters$data$rich.str);
    return _super2.call(this, parameters, {
      isRenderable: isRenderable
    });
  }

  _createClass(TextAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "textAnnotation";
      var image = document.createElement("img");
      image.style.height = this.container.style.height;
      image.style.width = this.container.style.width;
      image.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg";
      image.alt = "[{{type}} Annotation]";
      image.dataset.l10nId = "text_annotation_type";
      image.dataset.l10nArgs = JSON.stringify({
        type: this.data.name
      });

      if (!this.data.hasPopup) {
        this._createPopup(image, this.data);
      }

      this.container.appendChild(image);
      return this.container;
    }
  }]);

  return TextAnnotationElement;
}(AnnotationElement);

var WidgetAnnotationElement = /*#__PURE__*/function (_AnnotationElement3) {
  _inherits(WidgetAnnotationElement, _AnnotationElement3);

  var _super3 = _createSuper(WidgetAnnotationElement);

  function WidgetAnnotationElement() {
    _classCallCheck(this, WidgetAnnotationElement);

    return _super3.apply(this, arguments);
  }

  _createClass(WidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      if (this.data.alternativeText) {
        this.container.title = this.data.alternativeText;
      }

      return this.container;
    }
  }, {
    key: "_getKeyModifier",
    value: function _getKeyModifier(event) {
      var _AnnotationElement$pl = AnnotationElement.platform,
          isWin = _AnnotationElement$pl.isWin,
          isMac = _AnnotationElement$pl.isMac;
      return isWin && event.ctrlKey || isMac && event.metaKey;
    }
  }, {
    key: "_setEventListener",
    value: function _setEventListener(element, baseName, eventName, valueGetter) {
      var _this5 = this;

      if (baseName.includes("mouse")) {
        element.addEventListener(baseName, function (event) {
          var _this5$linkService$ev;

          (_this5$linkService$ev = _this5.linkService.eventBus) === null || _this5$linkService$ev === void 0 ? void 0 : _this5$linkService$ev.dispatch("dispatcheventinsandbox", {
            source: _this5,
            detail: {
              id: _this5.data.id,
              name: eventName,
              value: valueGetter(event),
              shift: event.shiftKey,
              modifier: _this5._getKeyModifier(event)
            }
          });
        });
      } else {
        element.addEventListener(baseName, function (event) {
          var _this5$linkService$ev2;

          (_this5$linkService$ev2 = _this5.linkService.eventBus) === null || _this5$linkService$ev2 === void 0 ? void 0 : _this5$linkService$ev2.dispatch("dispatcheventinsandbox", {
            source: _this5,
            detail: {
              id: _this5.data.id,
              name: eventName,
              value: event.target.checked
            }
          });
        });
      }
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners(element, names, getter) {
      var _iterator8 = _createForOfIteratorHelper(names),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _this$data$actions;

          var _step8$value = _slicedToArray(_step8.value, 2),
              baseName = _step8$value[0],
              eventName = _step8$value[1];

          if (eventName === "Action" || (_this$data$actions = this.data.actions) !== null && _this$data$actions !== void 0 && _this$data$actions[eventName]) {
            this._setEventListener(element, baseName, eventName, getter);
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  }, {
    key: "_setBackgroundColor",
    value: function _setBackgroundColor(element) {
      var color = this.data.backgroundColor || null;
      element.style.backgroundColor = color === null ? "transparent" : _util.Util.makeHexColor(color[0], color[1], color[2]);
    }
  }, {
    key: "_dispatchEventFromSandbox",
    value: function _dispatchEventFromSandbox(actions, jsEvent) {
      var _this6 = this;

      var setColor = function setColor(jsName, styleName, event) {
        var color = event.detail[jsName];
        event.target.style[styleName] = _scripting_utils.ColorConverters["".concat(color[0], "_HTML")](color.slice(1));
      };

      var commonActions = {
        display: function display(event) {
          var hidden = event.detail.display % 2 === 1;
          event.target.style.visibility = hidden ? "hidden" : "visible";

          _this6.annotationStorage.setValue(_this6.data.id, {
            hidden: hidden,
            print: event.detail.display === 0 || event.detail.display === 3
          });
        },
        print: function print(event) {
          _this6.annotationStorage.setValue(_this6.data.id, {
            print: event.detail.print
          });
        },
        hidden: function hidden(event) {
          event.target.style.visibility = event.detail.hidden ? "hidden" : "visible";

          _this6.annotationStorage.setValue(_this6.data.id, {
            hidden: event.detail.hidden
          });
        },
        focus: function focus(event) {
          setTimeout(function () {
            return event.target.focus({
              preventScroll: false
            });
          }, 0);
        },
        userName: function userName(event) {
          event.target.title = event.detail.userName;
        },
        readonly: function readonly(event) {
          if (event.detail.readonly) {
            event.target.setAttribute("readonly", "");
          } else {
            event.target.removeAttribute("readonly");
          }
        },
        required: function required(event) {
          if (event.detail.required) {
            event.target.setAttribute("required", "");
          } else {
            event.target.removeAttribute("required");
          }
        },
        bgColor: function bgColor(event) {
          setColor("bgColor", "backgroundColor", event);
        },
        fillColor: function fillColor(event) {
          setColor("fillColor", "backgroundColor", event);
        },
        fgColor: function fgColor(event) {
          setColor("fgColor", "color", event);
        },
        textColor: function textColor(event) {
          setColor("textColor", "color", event);
        },
        borderColor: function borderColor(event) {
          setColor("borderColor", "borderColor", event);
        },
        strokeColor: function strokeColor(event) {
          setColor("strokeColor", "borderColor", event);
        }
      };

      for (var _i6 = 0, _Object$keys2 = Object.keys(jsEvent.detail); _i6 < _Object$keys2.length; _i6++) {
        var name = _Object$keys2[_i6];
        var action = actions[name] || commonActions[name];

        if (action) {
          action(jsEvent);
        }
      }
    }
  }]);

  return WidgetAnnotationElement;
}(AnnotationElement);

var TextWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem) {
  _inherits(TextWidgetAnnotationElement, _WidgetAnnotationElem);

  var _super4 = _createSuper(TextWidgetAnnotationElement);

  function TextWidgetAnnotationElement(parameters) {
    _classCallCheck(this, TextWidgetAnnotationElement);

    var isRenderable = parameters.renderForms || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
    return _super4.call(this, parameters, {
      isRenderable: isRenderable
    });
  }

  _createClass(TextWidgetAnnotationElement, [{
    key: "setPropertyOnSiblings",
    value: function setPropertyOnSiblings(base, key, value, keyInStorage) {
      var storage = this.annotationStorage;

      var _iterator9 = _createForOfIteratorHelper(this._getElementsByName(base.name, base.id)),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var element = _step9.value;

          if (element.domElement) {
            element.domElement[key] = value;
          }

          storage.setValue(element.id, _defineProperty({}, keyInStorage, value));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var storage = this.annotationStorage;
      var id = this.data.id;
      this.container.className = "textWidgetAnnotation";
      var element = null;

      if (this.renderForms) {
        var storedData = storage.getValue(id, {
          value: this.data.fieldValue,
          valueAsString: this.data.fieldValue
        });
        var textContent = storedData.valueAsString || storedData.value || "";
        var elementData = {
          userValue: null,
          formattedValue: null,
          beforeInputSelectionRange: null,
          beforeInputValue: null
        };

        if (this.data.multiLine) {
          element = document.createElement("textarea");
          element.textContent = textContent;
        } else {
          element = document.createElement("input");
          element.type = "text";
          element.setAttribute("value", textContent);
        }

        GetElementsByNameSet.add(element);
        element.disabled = this.data.readOnly;
        element.name = this.data.fieldName;
        element.tabIndex = DEFAULT_TAB_INDEX;
        elementData.userValue = textContent;
        element.setAttribute("id", id);
        element.addEventListener("input", function (event) {
          storage.setValue(id, {
            value: event.target.value
          });

          _this7.setPropertyOnSiblings(element, "value", event.target.value, "value");
        });
        element.addEventListener("resetform", function (event) {
          var defaultValue = _this7.data.defaultFieldValue || "";
          element.value = elementData.userValue = defaultValue;
          delete elementData.formattedValue;
        });

        var blurListener = function blurListener(event) {
          if (elementData.formattedValue) {
            event.target.value = elementData.formattedValue;
          }

          event.target.scrollLeft = 0;
          elementData.beforeInputSelectionRange = null;
        };

        if (this.enableScripting && this.hasJSActions) {
          var _this$data$actions2;

          element.addEventListener("focus", function (event) {
            if (elementData.userValue) {
              event.target.value = elementData.userValue;
            }
          });
          element.addEventListener("updatefromsandbox", function (jsEvent) {
            var actions = {
              value: function value(event) {
                elementData.userValue = event.detail.value || "";
                storage.setValue(id, {
                  value: elementData.userValue.toString()
                });

                if (!elementData.formattedValue) {
                  event.target.value = elementData.userValue;
                }
              },
              valueAsString: function valueAsString(event) {
                elementData.formattedValue = event.detail.valueAsString || "";

                if (event.target !== document.activeElement) {
                  event.target.value = elementData.formattedValue;
                }

                storage.setValue(id, {
                  formattedValue: elementData.formattedValue
                });
              },
              selRange: function selRange(event) {
                var _event$detail$selRang = _slicedToArray(event.detail.selRange, 2),
                    selStart = _event$detail$selRang[0],
                    selEnd = _event$detail$selRang[1];

                if (selStart >= 0 && selEnd < event.target.value.length) {
                  event.target.setSelectionRange(selStart, selEnd);
                }
              }
            };

            _this7._dispatchEventFromSandbox(actions, jsEvent);
          });
          element.addEventListener("keydown", function (event) {
            var _this7$linkService$ev;

            elementData.beforeInputValue = event.target.value;
            var commitKey = -1;

            if (event.key === "Escape") {
              commitKey = 0;
            } else if (event.key === "Enter") {
              commitKey = 2;
            } else if (event.key === "Tab") {
              commitKey = 3;
            }

            if (commitKey === -1) {
              return;
            }

            elementData.userValue = event.target.value;
            (_this7$linkService$ev = _this7.linkService.eventBus) === null || _this7$linkService$ev === void 0 ? void 0 : _this7$linkService$ev.dispatch("dispatcheventinsandbox", {
              source: _this7,
              detail: {
                id: id,
                name: "Keystroke",
                value: event.target.value,
                willCommit: true,
                commitKey: commitKey,
                selStart: event.target.selectionStart,
                selEnd: event.target.selectionEnd
              }
            });
          });
          var _blurListener = blurListener;
          blurListener = null;
          element.addEventListener("blur", function (event) {
            if (_this7._mouseState.isDown) {
              var _this7$linkService$ev2;

              elementData.userValue = event.target.value;
              (_this7$linkService$ev2 = _this7.linkService.eventBus) === null || _this7$linkService$ev2 === void 0 ? void 0 : _this7$linkService$ev2.dispatch("dispatcheventinsandbox", {
                source: _this7,
                detail: {
                  id: id,
                  name: "Keystroke",
                  value: event.target.value,
                  willCommit: true,
                  commitKey: 1,
                  selStart: event.target.selectionStart,
                  selEnd: event.target.selectionEnd
                }
              });
            }

            _blurListener(event);
          });
          element.addEventListener("mousedown", function (event) {
            elementData.beforeInputValue = event.target.value;
            elementData.beforeInputSelectionRange = null;
          });
          element.addEventListener("keyup", function (event) {
            if (event.target.selectionStart === event.target.selectionEnd) {
              elementData.beforeInputSelectionRange = null;
            }
          });
          element.addEventListener("select", function (event) {
            elementData.beforeInputSelectionRange = [event.target.selectionStart, event.target.selectionEnd];
          });

          if ((_this$data$actions2 = this.data.actions) !== null && _this$data$actions2 !== void 0 && _this$data$actions2.Keystroke) {
            element.addEventListener("input", function (event) {
              var _this7$linkService$ev3;

              var selStart = -1;
              var selEnd = -1;

              if (elementData.beforeInputSelectionRange) {
                var _elementData$beforeIn = _slicedToArray(elementData.beforeInputSelectionRange, 2);

                selStart = _elementData$beforeIn[0];
                selEnd = _elementData$beforeIn[1];
              }

              (_this7$linkService$ev3 = _this7.linkService.eventBus) === null || _this7$linkService$ev3 === void 0 ? void 0 : _this7$linkService$ev3.dispatch("dispatcheventinsandbox", {
                source: _this7,
                detail: {
                  id: id,
                  name: "Keystroke",
                  value: elementData.beforeInputValue,
                  change: event.data,
                  willCommit: false,
                  selStart: selStart,
                  selEnd: selEnd
                }
              });
            });
          }

          this._setEventListeners(element, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], function (event) {
            return event.target.value;
          });
        }

        if (blurListener) {
          element.addEventListener("blur", blurListener);
        }

        if (this.data.maxLen !== null) {
          element.maxLength = this.data.maxLen;
        }

        if (this.data.comb) {
          var fieldWidth = this.data.rect[2] - this.data.rect[0];
          var combWidth = fieldWidth / this.data.maxLen;
          element.classList.add("comb");
          element.style.letterSpacing = "calc(".concat(combWidth, "px - 1ch)");
        }
      } else {
        element = document.createElement("div");
        element.textContent = this.data.fieldValue;
        element.style.verticalAlign = "middle";
        element.style.display = "table-cell";
      }

      this._setTextStyle(element);

      this._setBackgroundColor(element);

      this.container.appendChild(element);
      return this.container;
    }
  }, {
    key: "_setTextStyle",
    value: function _setTextStyle(element) {
      var TEXT_ALIGNMENT = ["left", "center", "right"];
      var _this$data$defaultApp = this.data.defaultAppearanceData,
          fontSize = _this$data$defaultApp.fontSize,
          fontColor = _this$data$defaultApp.fontColor;
      var style = element.style;

      if (fontSize) {
        style.fontSize = "".concat(fontSize, "px");
      }

      style.color = _util.Util.makeHexColor(fontColor[0], fontColor[1], fontColor[2]);

      if (this.data.textAlignment !== null) {
        style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
      }
    }
  }]);

  return TextWidgetAnnotationElement;
}(WidgetAnnotationElement);

var CheckboxWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem2) {
  _inherits(CheckboxWidgetAnnotationElement, _WidgetAnnotationElem2);

  var _super5 = _createSuper(CheckboxWidgetAnnotationElement);

  function CheckboxWidgetAnnotationElement(parameters) {
    _classCallCheck(this, CheckboxWidgetAnnotationElement);

    return _super5.call(this, parameters, {
      isRenderable: parameters.renderForms
    });
  }

  _createClass(CheckboxWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var _this8 = this;

      var storage = this.annotationStorage;
      var data = this.data;
      var id = data.id;
      var value = storage.getValue(id, {
        value: data.exportValue === data.fieldValue
      }).value;

      if (typeof value === "string") {
        value = value !== "Off";
        storage.setValue(id, {
          value: value
        });
      }

      this.container.className = "buttonWidgetAnnotation checkBox";
      var element = document.createElement("input");
      GetElementsByNameSet.add(element);
      element.disabled = data.readOnly;
      element.type = "checkbox";
      element.name = data.fieldName;

      if (value) {
        element.setAttribute("checked", true);
      }

      element.setAttribute("id", id);
      element.setAttribute("exportValue", data.exportValue);
      element.tabIndex = DEFAULT_TAB_INDEX;
      element.addEventListener("change", function (event) {
        var _event$target = event.target,
            name = _event$target.name,
            checked = _event$target.checked;

        var _iterator10 = _createForOfIteratorHelper(_this8._getElementsByName(name, id)),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var checkbox = _step10.value;
            var curChecked = checked && checkbox.exportValue === data.exportValue;

            if (checkbox.domElement) {
              checkbox.domElement.checked = curChecked;
            }

            storage.setValue(checkbox.id, {
              value: curChecked
            });
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }

        storage.setValue(id, {
          value: checked
        });
      });
      element.addEventListener("resetform", function (event) {
        var defaultValue = data.defaultFieldValue || "Off";
        event.target.checked = defaultValue === data.exportValue;
      });

      if (this.enableScripting && this.hasJSActions) {
        element.addEventListener("updatefromsandbox", function (jsEvent) {
          var actions = {
            value: function value(event) {
              event.target.checked = event.detail.value !== "Off";
              storage.setValue(id, {
                value: event.target.checked
              });
            }
          };

          _this8._dispatchEventFromSandbox(actions, jsEvent);
        });

        this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], function (event) {
          return event.target.checked;
        });
      }

      this._setBackgroundColor(element);

      this.container.appendChild(element);
      return this.container;
    }
  }]);

  return CheckboxWidgetAnnotationElement;
}(WidgetAnnotationElement);

var RadioButtonWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem3) {
  _inherits(RadioButtonWidgetAnnotationElement, _WidgetAnnotationElem3);

  var _super6 = _createSuper(RadioButtonWidgetAnnotationElement);

  function RadioButtonWidgetAnnotationElement(parameters) {
    _classCallCheck(this, RadioButtonWidgetAnnotationElement);

    return _super6.call(this, parameters, {
      isRenderable: parameters.renderForms
    });
  }

  _createClass(RadioButtonWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var _this9 = this;

      this.container.className = "buttonWidgetAnnotation radioButton";
      var storage = this.annotationStorage;
      var data = this.data;
      var id = data.id;
      var value = storage.getValue(id, {
        value: data.fieldValue === data.buttonValue
      }).value;

      if (typeof value === "string") {
        value = value !== data.buttonValue;
        storage.setValue(id, {
          value: value
        });
      }

      var element = document.createElement("input");
      GetElementsByNameSet.add(element);
      element.disabled = data.readOnly;
      element.type = "radio";
      element.name = data.fieldName;

      if (value) {
        element.setAttribute("checked", true);
      }

      element.setAttribute("id", id);
      element.tabIndex = DEFAULT_TAB_INDEX;
      element.addEventListener("change", function (event) {
        var _event$target2 = event.target,
            name = _event$target2.name,
            checked = _event$target2.checked;

        var _iterator11 = _createForOfIteratorHelper(_this9._getElementsByName(name, id)),
            _step11;

        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var radio = _step11.value;
            storage.setValue(radio.id, {
              value: false
            });
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }

        storage.setValue(id, {
          value: checked
        });
      });
      element.addEventListener("resetform", function (event) {
        var defaultValue = data.defaultFieldValue;
        event.target.checked = defaultValue !== null && defaultValue !== undefined && defaultValue === data.buttonValue;
      });

      if (this.enableScripting && this.hasJSActions) {
        var pdfButtonValue = data.buttonValue;
        element.addEventListener("updatefromsandbox", function (jsEvent) {
          var actions = {
            value: function value(event) {
              var checked = pdfButtonValue === event.detail.value;

              var _iterator12 = _createForOfIteratorHelper(_this9._getElementsByName(event.target.name)),
                  _step12;

              try {
                for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                  var radio = _step12.value;
                  var curChecked = checked && radio.id === id;

                  if (radio.domElement) {
                    radio.domElement.checked = curChecked;
                  }

                  storage.setValue(radio.id, {
                    value: curChecked
                  });
                }
              } catch (err) {
                _iterator12.e(err);
              } finally {
                _iterator12.f();
              }
            }
          };

          _this9._dispatchEventFromSandbox(actions, jsEvent);
        });

        this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], function (event) {
          return event.target.checked;
        });
      }

      this._setBackgroundColor(element);

      this.container.appendChild(element);
      return this.container;
    }
  }]);

  return RadioButtonWidgetAnnotationElement;
}(WidgetAnnotationElement);

var PushButtonWidgetAnnotationElement = /*#__PURE__*/function (_LinkAnnotationElemen) {
  _inherits(PushButtonWidgetAnnotationElement, _LinkAnnotationElemen);

  var _super7 = _createSuper(PushButtonWidgetAnnotationElement);

  function PushButtonWidgetAnnotationElement(parameters) {
    _classCallCheck(this, PushButtonWidgetAnnotationElement);

    return _super7.call(this, parameters, {
      ignoreBorder: parameters.data.hasAppearance
    });
  }

  _createClass(PushButtonWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var container = _get(_getPrototypeOf(PushButtonWidgetAnnotationElement.prototype), "render", this).call(this);

      container.className = "buttonWidgetAnnotation pushButton";

      if (this.data.alternativeText) {
        container.title = this.data.alternativeText;
      }

      return container;
    }
  }]);

  return PushButtonWidgetAnnotationElement;
}(LinkAnnotationElement);

var ChoiceWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem4) {
  _inherits(ChoiceWidgetAnnotationElement, _WidgetAnnotationElem4);

  var _super8 = _createSuper(ChoiceWidgetAnnotationElement);

  function ChoiceWidgetAnnotationElement(parameters) {
    _classCallCheck(this, ChoiceWidgetAnnotationElement);

    return _super8.call(this, parameters, {
      isRenderable: parameters.renderForms
    });
  }

  _createClass(ChoiceWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var _this10 = this;

      this.container.className = "choiceWidgetAnnotation";
      var storage = this.annotationStorage;
      var id = this.data.id;
      storage.getValue(id, {
        value: this.data.fieldValue.length > 0 ? this.data.fieldValue[0] : undefined
      });
      var fontSize = this.data.defaultAppearanceData.fontSize;

      if (!fontSize) {
        fontSize = 9;
      }

      var fontSizeStyle = "calc(".concat(fontSize, "px * var(--zoom-factor))");
      var selectElement = document.createElement("select");
      GetElementsByNameSet.add(selectElement);
      selectElement.disabled = this.data.readOnly;
      selectElement.name = this.data.fieldName;
      selectElement.setAttribute("id", id);
      selectElement.tabIndex = DEFAULT_TAB_INDEX;
      selectElement.style.fontSize = "".concat(fontSize, "px");

      if (!this.data.combo) {
        selectElement.size = this.data.options.length;

        if (this.data.multiSelect) {
          selectElement.multiple = true;
        }
      }

      selectElement.addEventListener("resetform", function (event) {
        var defaultValue = _this10.data.defaultFieldValue;

        var _iterator13 = _createForOfIteratorHelper(selectElement.options),
            _step13;

        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var option = _step13.value;
            option.selected = option.value === defaultValue;
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
      });

      var _iterator14 = _createForOfIteratorHelper(this.data.options),
          _step14;

      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var option = _step14.value;
          var optionElement = document.createElement("option");
          optionElement.textContent = option.displayValue;
          optionElement.value = option.exportValue;

          if (this.data.combo) {
            optionElement.style.fontSize = fontSizeStyle;
          }

          if (this.data.fieldValue.includes(option.exportValue)) {
            optionElement.setAttribute("selected", true);
          }

          selectElement.appendChild(optionElement);
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }

      var getValue = function getValue(event, isExport) {
        var name = isExport ? "value" : "textContent";
        var options = event.target.options;

        if (!event.target.multiple) {
          return options.selectedIndex === -1 ? null : options[options.selectedIndex][name];
        }

        return Array.prototype.filter.call(options, function (option) {
          return option.selected;
        }).map(function (option) {
          return option[name];
        });
      };

      var getItems = function getItems(event) {
        var options = event.target.options;
        return Array.prototype.map.call(options, function (option) {
          return {
            displayValue: option.textContent,
            exportValue: option.value
          };
        });
      };

      if (this.enableScripting && this.hasJSActions) {
        selectElement.addEventListener("updatefromsandbox", function (jsEvent) {
          var actions = {
            value: function value(event) {
              var value = event.detail.value;
              var values = new Set(Array.isArray(value) ? value : [value]);

              var _iterator15 = _createForOfIteratorHelper(selectElement.options),
                  _step15;

              try {
                for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                  var option = _step15.value;
                  option.selected = values.has(option.value);
                }
              } catch (err) {
                _iterator15.e(err);
              } finally {
                _iterator15.f();
              }

              storage.setValue(id, {
                value: getValue(event, true)
              });
            },
            multipleSelection: function multipleSelection(event) {
              selectElement.multiple = true;
            },
            remove: function remove(event) {
              var options = selectElement.options;
              var index = event.detail.remove;
              options[index].selected = false;
              selectElement.remove(index);

              if (options.length > 0) {
                var i = Array.prototype.findIndex.call(options, function (option) {
                  return option.selected;
                });

                if (i === -1) {
                  options[0].selected = true;
                }
              }

              storage.setValue(id, {
                value: getValue(event, true),
                items: getItems(event)
              });
            },
            clear: function clear(event) {
              while (selectElement.length !== 0) {
                selectElement.remove(0);
              }

              storage.setValue(id, {
                value: null,
                items: []
              });
            },
            insert: function insert(event) {
              var _event$detail$insert = event.detail.insert,
                  index = _event$detail$insert.index,
                  displayValue = _event$detail$insert.displayValue,
                  exportValue = _event$detail$insert.exportValue;
              var optionElement = document.createElement("option");
              optionElement.textContent = displayValue;
              optionElement.value = exportValue;
              selectElement.insertBefore(optionElement, selectElement.children[index]);
              storage.setValue(id, {
                value: getValue(event, true),
                items: getItems(event)
              });
            },
            items: function items(event) {
              var items = event.detail.items;

              while (selectElement.length !== 0) {
                selectElement.remove(0);
              }

              var _iterator16 = _createForOfIteratorHelper(items),
                  _step16;

              try {
                for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                  var item = _step16.value;
                  var displayValue = item.displayValue,
                      exportValue = item.exportValue;
                  var optionElement = document.createElement("option");
                  optionElement.textContent = displayValue;
                  optionElement.value = exportValue;
                  selectElement.appendChild(optionElement);
                }
              } catch (err) {
                _iterator16.e(err);
              } finally {
                _iterator16.f();
              }

              if (selectElement.options.length > 0) {
                selectElement.options[0].selected = true;
              }

              storage.setValue(id, {
                value: getValue(event, true),
                items: getItems(event)
              });
            },
            indices: function indices(event) {
              var indices = new Set(event.detail.indices);

              var _iterator17 = _createForOfIteratorHelper(event.target.options),
                  _step17;

              try {
                for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
                  var option = _step17.value;
                  option.selected = indices.has(option.index);
                }
              } catch (err) {
                _iterator17.e(err);
              } finally {
                _iterator17.f();
              }

              storage.setValue(id, {
                value: getValue(event, true)
              });
            },
            editable: function editable(event) {
              event.target.disabled = !event.detail.editable;
            }
          };

          _this10._dispatchEventFromSandbox(actions, jsEvent);
        });
        selectElement.addEventListener("input", function (event) {
          var _this10$linkService$e;

          var exportValue = getValue(event, true);
          var value = getValue(event, false);
          storage.setValue(id, {
            value: exportValue
          });
          (_this10$linkService$e = _this10.linkService.eventBus) === null || _this10$linkService$e === void 0 ? void 0 : _this10$linkService$e.dispatch("dispatcheventinsandbox", {
            source: _this10,
            detail: {
              id: id,
              name: "Keystroke",
              value: value,
              changeEx: exportValue,
              willCommit: true,
              commitKey: 1,
              keyDown: false
            }
          });
        });

        this._setEventListeners(selectElement, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"]], function (event) {
          return event.target.checked;
        });
      } else {
        selectElement.addEventListener("input", function (event) {
          storage.setValue(id, {
            value: getValue(event)
          });
        });
      }

      this._setBackgroundColor(selectElement);

      this.container.appendChild(selectElement);
      return this.container;
    }
  }]);

  return ChoiceWidgetAnnotationElement;
}(WidgetAnnotationElement);

var PopupAnnotationElement = /*#__PURE__*/function (_AnnotationElement4) {
  _inherits(PopupAnnotationElement, _AnnotationElement4);

  var _super9 = _createSuper(PopupAnnotationElement);

  function PopupAnnotationElement(parameters) {
    var _parameters$data$titl2, _parameters$data$cont2, _parameters$data$rich2;

    _classCallCheck(this, PopupAnnotationElement);

    var isRenderable = !!((_parameters$data$titl2 = parameters.data.titleObj) !== null && _parameters$data$titl2 !== void 0 && _parameters$data$titl2.str || (_parameters$data$cont2 = parameters.data.contentsObj) !== null && _parameters$data$cont2 !== void 0 && _parameters$data$cont2.str || (_parameters$data$rich2 = parameters.data.richText) !== null && _parameters$data$rich2 !== void 0 && _parameters$data$rich2.str);
    return _super9.call(this, parameters, {
      isRenderable: isRenderable
    });
  }

  _createClass(PopupAnnotationElement, [{
    key: "render",
    value: function render() {
      var IGNORE_TYPES = ["Line", "Square", "Circle", "PolyLine", "Polygon", "Ink"];
      this.container.className = "popupAnnotation";

      if (IGNORE_TYPES.includes(this.data.parentType)) {
        return this.container;
      }

      var selector = "[data-annotation-id=\"".concat(this.data.parentId, "\"]");
      var parentElements = this.layer.querySelectorAll(selector);

      if (parentElements.length === 0) {
        return this.container;
      }

      var popup = new PopupElement({
        container: this.container,
        trigger: Array.from(parentElements),
        color: this.data.color,
        titleObj: this.data.titleObj,
        modificationDate: this.data.modificationDate,
        contentsObj: this.data.contentsObj,
        richText: this.data.richText
      });
      var page = this.page;

      var rect = _util.Util.normalizeRect([this.data.parentRect[0], page.view[3] - this.data.parentRect[1] + page.view[1], this.data.parentRect[2], page.view[3] - this.data.parentRect[3] + page.view[1]]);

      var popupLeft = rect[0] + this.data.parentRect[2] - this.data.parentRect[0];
      var popupTop = rect[1];
      this.container.style.transformOrigin = "".concat(-popupLeft, "px ").concat(-popupTop, "px");
      this.container.style.left = "".concat(popupLeft, "px");
      this.container.style.top = "".concat(popupTop, "px");
      this.container.appendChild(popup.render());
      return this.container;
    }
  }]);

  return PopupAnnotationElement;
}(AnnotationElement);

var PopupElement = /*#__PURE__*/function () {
  function PopupElement(parameters) {
    _classCallCheck(this, PopupElement);

    this.container = parameters.container;
    this.trigger = parameters.trigger;
    this.color = parameters.color;
    this.titleObj = parameters.titleObj;
    this.modificationDate = parameters.modificationDate;
    this.contentsObj = parameters.contentsObj;
    this.richText = parameters.richText;
    this.hideWrapper = parameters.hideWrapper || false;
    this.pinned = false;
  }

  _createClass(PopupElement, [{
    key: "render",
    value: function render() {
      var _this$richText, _this$contentsObj;

      var BACKGROUND_ENLIGHT = 0.7;
      var wrapper = document.createElement("div");
      wrapper.className = "popupWrapper";
      this.hideElement = this.hideWrapper ? wrapper : this.container;
      this.hideElement.hidden = true;
      var popup = document.createElement("div");
      popup.className = "popup";
      var color = this.color;

      if (color) {
        var r = BACKGROUND_ENLIGHT * (255 - color[0]) + color[0];
        var g = BACKGROUND_ENLIGHT * (255 - color[1]) + color[1];
        var b = BACKGROUND_ENLIGHT * (255 - color[2]) + color[2];
        popup.style.backgroundColor = _util.Util.makeHexColor(r | 0, g | 0, b | 0);
      }

      var title = document.createElement("h1");
      title.dir = this.titleObj.dir;
      title.textContent = this.titleObj.str;
      popup.appendChild(title);

      var dateObject = _display_utils.PDFDateString.toDateObject(this.modificationDate);

      if (dateObject) {
        var modificationDate = document.createElement("span");
        modificationDate.className = "popupDate";
        modificationDate.textContent = "{{date}}, {{time}}";
        modificationDate.dataset.l10nId = "annotation_date_string";
        modificationDate.dataset.l10nArgs = JSON.stringify({
          date: dateObject.toLocaleDateString(),
          time: dateObject.toLocaleTimeString()
        });
        popup.appendChild(modificationDate);
      }

      if ((_this$richText = this.richText) !== null && _this$richText !== void 0 && _this$richText.str && (!((_this$contentsObj = this.contentsObj) !== null && _this$contentsObj !== void 0 && _this$contentsObj.str) || this.contentsObj.str === this.richText.str)) {
        _xfa_layer.XfaLayer.render({
          xfaHtml: this.richText.html,
          intent: "richText",
          div: popup
        });

        popup.lastChild.className = "richText popupContent";
      } else {
        var contents = this._formatContents(this.contentsObj);

        popup.appendChild(contents);
      }

      if (!Array.isArray(this.trigger)) {
        this.trigger = [this.trigger];
      }

      var _iterator18 = _createForOfIteratorHelper(this.trigger),
          _step18;

      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var element = _step18.value;
          element.addEventListener("click", this._toggle.bind(this));
          element.addEventListener("mouseover", this._show.bind(this, false));
          element.addEventListener("mouseout", this._hide.bind(this, false));
        }
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }

      popup.addEventListener("click", this._hide.bind(this, true));
      wrapper.appendChild(popup);
      return wrapper;
    }
  }, {
    key: "_formatContents",
    value: function _formatContents(_ref2) {
      var str = _ref2.str,
          dir = _ref2.dir;
      var p = document.createElement("p");
      p.className = "popupContent";
      p.dir = dir;
      var lines = str.split(/(?:\r\n?|\n)/);

      for (var i = 0, ii = lines.length; i < ii; ++i) {
        var line = lines[i];
        p.appendChild(document.createTextNode(line));

        if (i < ii - 1) {
          p.appendChild(document.createElement("br"));
        }
      }

      return p;
    }
  }, {
    key: "_toggle",
    value: function _toggle() {
      if (this.pinned) {
        this._hide(true);
      } else {
        this._show(true);
      }
    }
  }, {
    key: "_show",
    value: function _show() {
      var pin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (pin) {
        this.pinned = true;
      }

      if (this.hideElement.hidden) {
        this.hideElement.hidden = false;
        this.container.style.zIndex += 1;
      }
    }
  }, {
    key: "_hide",
    value: function _hide() {
      var unpin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (unpin) {
        this.pinned = false;
      }

      if (!this.hideElement.hidden && !this.pinned) {
        this.hideElement.hidden = true;
        this.container.style.zIndex -= 1;
      }
    }
  }]);

  return PopupElement;
}();

var FreeTextAnnotationElement = /*#__PURE__*/function (_AnnotationElement5) {
  _inherits(FreeTextAnnotationElement, _AnnotationElement5);

  var _super10 = _createSuper(FreeTextAnnotationElement);

  function FreeTextAnnotationElement(parameters) {
    var _parameters$data$titl3, _parameters$data$cont3, _parameters$data$rich3;

    _classCallCheck(this, FreeTextAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl3 = parameters.data.titleObj) !== null && _parameters$data$titl3 !== void 0 && _parameters$data$titl3.str || (_parameters$data$cont3 = parameters.data.contentsObj) !== null && _parameters$data$cont3 !== void 0 && _parameters$data$cont3.str || (_parameters$data$rich3 = parameters.data.richText) !== null && _parameters$data$rich3 !== void 0 && _parameters$data$rich3.str);
    return _super10.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(FreeTextAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "freeTextAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return FreeTextAnnotationElement;
}(AnnotationElement);

var LineAnnotationElement = /*#__PURE__*/function (_AnnotationElement6) {
  _inherits(LineAnnotationElement, _AnnotationElement6);

  var _super11 = _createSuper(LineAnnotationElement);

  function LineAnnotationElement(parameters) {
    var _parameters$data$titl4, _parameters$data$cont4, _parameters$data$rich4;

    _classCallCheck(this, LineAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl4 = parameters.data.titleObj) !== null && _parameters$data$titl4 !== void 0 && _parameters$data$titl4.str || (_parameters$data$cont4 = parameters.data.contentsObj) !== null && _parameters$data$cont4 !== void 0 && _parameters$data$cont4.str || (_parameters$data$rich4 = parameters.data.richText) !== null && _parameters$data$rich4 !== void 0 && _parameters$data$rich4.str);
    return _super11.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(LineAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "lineAnnotation";
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var line = this.svgFactory.createElement("svg:line");
      line.setAttribute("x1", data.rect[2] - data.lineCoordinates[0]);
      line.setAttribute("y1", data.rect[3] - data.lineCoordinates[1]);
      line.setAttribute("x2", data.rect[2] - data.lineCoordinates[2]);
      line.setAttribute("y2", data.rect[3] - data.lineCoordinates[3]);
      line.setAttribute("stroke-width", data.borderStyle.width || 1);
      line.setAttribute("stroke", "transparent");
      line.setAttribute("fill", "transparent");
      svg.appendChild(line);
      this.container.append(svg);

      this._createPopup(line, data);

      return this.container;
    }
  }]);

  return LineAnnotationElement;
}(AnnotationElement);

var SquareAnnotationElement = /*#__PURE__*/function (_AnnotationElement7) {
  _inherits(SquareAnnotationElement, _AnnotationElement7);

  var _super12 = _createSuper(SquareAnnotationElement);

  function SquareAnnotationElement(parameters) {
    var _parameters$data$titl5, _parameters$data$cont5, _parameters$data$rich5;

    _classCallCheck(this, SquareAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl5 = parameters.data.titleObj) !== null && _parameters$data$titl5 !== void 0 && _parameters$data$titl5.str || (_parameters$data$cont5 = parameters.data.contentsObj) !== null && _parameters$data$cont5 !== void 0 && _parameters$data$cont5.str || (_parameters$data$rich5 = parameters.data.richText) !== null && _parameters$data$rich5 !== void 0 && _parameters$data$rich5.str);
    return _super12.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(SquareAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "squareAnnotation";
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var borderWidth = data.borderStyle.width;
      var square = this.svgFactory.createElement("svg:rect");
      square.setAttribute("x", borderWidth / 2);
      square.setAttribute("y", borderWidth / 2);
      square.setAttribute("width", width - borderWidth);
      square.setAttribute("height", height - borderWidth);
      square.setAttribute("stroke-width", borderWidth || 1);
      square.setAttribute("stroke", "transparent");
      square.setAttribute("fill", "transparent");
      svg.appendChild(square);
      this.container.append(svg);

      this._createPopup(square, data);

      return this.container;
    }
  }]);

  return SquareAnnotationElement;
}(AnnotationElement);

var CircleAnnotationElement = /*#__PURE__*/function (_AnnotationElement8) {
  _inherits(CircleAnnotationElement, _AnnotationElement8);

  var _super13 = _createSuper(CircleAnnotationElement);

  function CircleAnnotationElement(parameters) {
    var _parameters$data$titl6, _parameters$data$cont6, _parameters$data$rich6;

    _classCallCheck(this, CircleAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl6 = parameters.data.titleObj) !== null && _parameters$data$titl6 !== void 0 && _parameters$data$titl6.str || (_parameters$data$cont6 = parameters.data.contentsObj) !== null && _parameters$data$cont6 !== void 0 && _parameters$data$cont6.str || (_parameters$data$rich6 = parameters.data.richText) !== null && _parameters$data$rich6 !== void 0 && _parameters$data$rich6.str);
    return _super13.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(CircleAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "circleAnnotation";
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var borderWidth = data.borderStyle.width;
      var circle = this.svgFactory.createElement("svg:ellipse");
      circle.setAttribute("cx", width / 2);
      circle.setAttribute("cy", height / 2);
      circle.setAttribute("rx", width / 2 - borderWidth / 2);
      circle.setAttribute("ry", height / 2 - borderWidth / 2);
      circle.setAttribute("stroke-width", borderWidth || 1);
      circle.setAttribute("stroke", "transparent");
      circle.setAttribute("fill", "transparent");
      svg.appendChild(circle);
      this.container.append(svg);

      this._createPopup(circle, data);

      return this.container;
    }
  }]);

  return CircleAnnotationElement;
}(AnnotationElement);

var PolylineAnnotationElement = /*#__PURE__*/function (_AnnotationElement9) {
  _inherits(PolylineAnnotationElement, _AnnotationElement9);

  var _super14 = _createSuper(PolylineAnnotationElement);

  function PolylineAnnotationElement(parameters) {
    var _parameters$data$titl7, _parameters$data$cont7, _parameters$data$rich7;

    var _this11;

    _classCallCheck(this, PolylineAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl7 = parameters.data.titleObj) !== null && _parameters$data$titl7 !== void 0 && _parameters$data$titl7.str || (_parameters$data$cont7 = parameters.data.contentsObj) !== null && _parameters$data$cont7 !== void 0 && _parameters$data$cont7.str || (_parameters$data$rich7 = parameters.data.richText) !== null && _parameters$data$rich7 !== void 0 && _parameters$data$rich7.str);
    _this11 = _super14.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
    _this11.containerClassName = "polylineAnnotation";
    _this11.svgElementName = "svg:polyline";
    return _this11;
  }

  _createClass(PolylineAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = this.containerClassName;
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var points = [];

      var _iterator19 = _createForOfIteratorHelper(data.vertices),
          _step19;

      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var coordinate = _step19.value;
          var x = coordinate.x - data.rect[0];
          var y = data.rect[3] - coordinate.y;
          points.push(x + "," + y);
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }

      points = points.join(" ");
      var polyline = this.svgFactory.createElement(this.svgElementName);
      polyline.setAttribute("points", points);
      polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
      polyline.setAttribute("stroke", "transparent");
      polyline.setAttribute("fill", "transparent");
      svg.appendChild(polyline);
      this.container.append(svg);

      this._createPopup(polyline, data);

      return this.container;
    }
  }]);

  return PolylineAnnotationElement;
}(AnnotationElement);

var PolygonAnnotationElement = /*#__PURE__*/function (_PolylineAnnotationEl) {
  _inherits(PolygonAnnotationElement, _PolylineAnnotationEl);

  var _super15 = _createSuper(PolygonAnnotationElement);

  function PolygonAnnotationElement(parameters) {
    var _this12;

    _classCallCheck(this, PolygonAnnotationElement);

    _this12 = _super15.call(this, parameters);
    _this12.containerClassName = "polygonAnnotation";
    _this12.svgElementName = "svg:polygon";
    return _this12;
  }

  return PolygonAnnotationElement;
}(PolylineAnnotationElement);

var CaretAnnotationElement = /*#__PURE__*/function (_AnnotationElement10) {
  _inherits(CaretAnnotationElement, _AnnotationElement10);

  var _super16 = _createSuper(CaretAnnotationElement);

  function CaretAnnotationElement(parameters) {
    var _parameters$data$titl8, _parameters$data$cont8, _parameters$data$rich8;

    _classCallCheck(this, CaretAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl8 = parameters.data.titleObj) !== null && _parameters$data$titl8 !== void 0 && _parameters$data$titl8.str || (_parameters$data$cont8 = parameters.data.contentsObj) !== null && _parameters$data$cont8 !== void 0 && _parameters$data$cont8.str || (_parameters$data$rich8 = parameters.data.richText) !== null && _parameters$data$rich8 !== void 0 && _parameters$data$rich8.str);
    return _super16.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(CaretAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "caretAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return CaretAnnotationElement;
}(AnnotationElement);

var InkAnnotationElement = /*#__PURE__*/function (_AnnotationElement11) {
  _inherits(InkAnnotationElement, _AnnotationElement11);

  var _super17 = _createSuper(InkAnnotationElement);

  function InkAnnotationElement(parameters) {
    var _parameters$data$titl9, _parameters$data$cont9, _parameters$data$rich9;

    var _this13;

    _classCallCheck(this, InkAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl9 = parameters.data.titleObj) !== null && _parameters$data$titl9 !== void 0 && _parameters$data$titl9.str || (_parameters$data$cont9 = parameters.data.contentsObj) !== null && _parameters$data$cont9 !== void 0 && _parameters$data$cont9.str || (_parameters$data$rich9 = parameters.data.richText) !== null && _parameters$data$rich9 !== void 0 && _parameters$data$rich9.str);
    _this13 = _super17.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
    _this13.containerClassName = "inkAnnotation";
    _this13.svgElementName = "svg:polyline";
    return _this13;
  }

  _createClass(InkAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = this.containerClassName;
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);

      var _iterator20 = _createForOfIteratorHelper(data.inkLists),
          _step20;

      try {
        for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
          var inkList = _step20.value;
          var points = [];

          var _iterator21 = _createForOfIteratorHelper(inkList),
              _step21;

          try {
            for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
              var coordinate = _step21.value;
              var x = coordinate.x - data.rect[0];
              var y = data.rect[3] - coordinate.y;
              points.push("".concat(x, ",").concat(y));
            }
          } catch (err) {
            _iterator21.e(err);
          } finally {
            _iterator21.f();
          }

          points = points.join(" ");
          var polyline = this.svgFactory.createElement(this.svgElementName);
          polyline.setAttribute("points", points);
          polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
          polyline.setAttribute("stroke", "transparent");
          polyline.setAttribute("fill", "transparent");

          this._createPopup(polyline, data);

          svg.appendChild(polyline);
        }
      } catch (err) {
        _iterator20.e(err);
      } finally {
        _iterator20.f();
      }

      this.container.append(svg);
      return this.container;
    }
  }]);

  return InkAnnotationElement;
}(AnnotationElement);

var HighlightAnnotationElement = /*#__PURE__*/function (_AnnotationElement12) {
  _inherits(HighlightAnnotationElement, _AnnotationElement12);

  var _super18 = _createSuper(HighlightAnnotationElement);

  function HighlightAnnotationElement(parameters) {
    var _parameters$data$titl10, _parameters$data$cont10, _parameters$data$rich10;

    _classCallCheck(this, HighlightAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl10 = parameters.data.titleObj) !== null && _parameters$data$titl10 !== void 0 && _parameters$data$titl10.str || (_parameters$data$cont10 = parameters.data.contentsObj) !== null && _parameters$data$cont10 !== void 0 && _parameters$data$cont10.str || (_parameters$data$rich10 = parameters.data.richText) !== null && _parameters$data$rich10 !== void 0 && _parameters$data$rich10.str);
    return _super18.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  _createClass(HighlightAnnotationElement, [{
    key: "render",
    value: function render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("highlightAnnotation");
      }

      this.container.className = "highlightAnnotation";
      return this.container;
    }
  }]);

  return HighlightAnnotationElement;
}(AnnotationElement);

var UnderlineAnnotationElement = /*#__PURE__*/function (_AnnotationElement13) {
  _inherits(UnderlineAnnotationElement, _AnnotationElement13);

  var _super19 = _createSuper(UnderlineAnnotationElement);

  function UnderlineAnnotationElement(parameters) {
    var _parameters$data$titl11, _parameters$data$cont11, _parameters$data$rich11;

    _classCallCheck(this, UnderlineAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl11 = parameters.data.titleObj) !== null && _parameters$data$titl11 !== void 0 && _parameters$data$titl11.str || (_parameters$data$cont11 = parameters.data.contentsObj) !== null && _parameters$data$cont11 !== void 0 && _parameters$data$cont11.str || (_parameters$data$rich11 = parameters.data.richText) !== null && _parameters$data$rich11 !== void 0 && _parameters$data$rich11.str);
    return _super19.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  _createClass(UnderlineAnnotationElement, [{
    key: "render",
    value: function render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("underlineAnnotation");
      }

      this.container.className = "underlineAnnotation";
      return this.container;
    }
  }]);

  return UnderlineAnnotationElement;
}(AnnotationElement);

var SquigglyAnnotationElement = /*#__PURE__*/function (_AnnotationElement14) {
  _inherits(SquigglyAnnotationElement, _AnnotationElement14);

  var _super20 = _createSuper(SquigglyAnnotationElement);

  function SquigglyAnnotationElement(parameters) {
    var _parameters$data$titl12, _parameters$data$cont12, _parameters$data$rich12;

    _classCallCheck(this, SquigglyAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl12 = parameters.data.titleObj) !== null && _parameters$data$titl12 !== void 0 && _parameters$data$titl12.str || (_parameters$data$cont12 = parameters.data.contentsObj) !== null && _parameters$data$cont12 !== void 0 && _parameters$data$cont12.str || (_parameters$data$rich12 = parameters.data.richText) !== null && _parameters$data$rich12 !== void 0 && _parameters$data$rich12.str);
    return _super20.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  _createClass(SquigglyAnnotationElement, [{
    key: "render",
    value: function render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("squigglyAnnotation");
      }

      this.container.className = "squigglyAnnotation";
      return this.container;
    }
  }]);

  return SquigglyAnnotationElement;
}(AnnotationElement);

var StrikeOutAnnotationElement = /*#__PURE__*/function (_AnnotationElement15) {
  _inherits(StrikeOutAnnotationElement, _AnnotationElement15);

  var _super21 = _createSuper(StrikeOutAnnotationElement);

  function StrikeOutAnnotationElement(parameters) {
    var _parameters$data$titl13, _parameters$data$cont13, _parameters$data$rich13;

    _classCallCheck(this, StrikeOutAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl13 = parameters.data.titleObj) !== null && _parameters$data$titl13 !== void 0 && _parameters$data$titl13.str || (_parameters$data$cont13 = parameters.data.contentsObj) !== null && _parameters$data$cont13 !== void 0 && _parameters$data$cont13.str || (_parameters$data$rich13 = parameters.data.richText) !== null && _parameters$data$rich13 !== void 0 && _parameters$data$rich13.str);
    return _super21.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  _createClass(StrikeOutAnnotationElement, [{
    key: "render",
    value: function render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("strikeoutAnnotation");
      }

      this.container.className = "strikeoutAnnotation";
      return this.container;
    }
  }]);

  return StrikeOutAnnotationElement;
}(AnnotationElement);

var StampAnnotationElement = /*#__PURE__*/function (_AnnotationElement16) {
  _inherits(StampAnnotationElement, _AnnotationElement16);

  var _super22 = _createSuper(StampAnnotationElement);

  function StampAnnotationElement(parameters) {
    var _parameters$data$titl14, _parameters$data$cont14, _parameters$data$rich14;

    _classCallCheck(this, StampAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl14 = parameters.data.titleObj) !== null && _parameters$data$titl14 !== void 0 && _parameters$data$titl14.str || (_parameters$data$cont14 = parameters.data.contentsObj) !== null && _parameters$data$cont14 !== void 0 && _parameters$data$cont14.str || (_parameters$data$rich14 = parameters.data.richText) !== null && _parameters$data$rich14 !== void 0 && _parameters$data$rich14.str);
    return _super22.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(StampAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "stampAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return StampAnnotationElement;
}(AnnotationElement);

var FileAttachmentAnnotationElement = /*#__PURE__*/function (_AnnotationElement17) {
  _inherits(FileAttachmentAnnotationElement, _AnnotationElement17);

  var _super23 = _createSuper(FileAttachmentAnnotationElement);

  function FileAttachmentAnnotationElement(parameters) {
    var _this14$linkService$e;

    var _this14;

    _classCallCheck(this, FileAttachmentAnnotationElement);

    _this14 = _super23.call(this, parameters, {
      isRenderable: true
    });
    var _this14$data$file = _this14.data.file,
        filename = _this14$data$file.filename,
        content = _this14$data$file.content;
    _this14.filename = (0, _display_utils.getFilenameFromUrl)(filename);
    _this14.content = content;
    (_this14$linkService$e = _this14.linkService.eventBus) === null || _this14$linkService$e === void 0 ? void 0 : _this14$linkService$e.dispatch("fileattachmentannotation", {
      source: _assertThisInitialized(_this14),
      id: (0, _util.stringToPDFString)(filename),
      filename: filename,
      content: content
    });
    return _this14;
  }

  _createClass(FileAttachmentAnnotationElement, [{
    key: "render",
    value: function render() {
      var _this$data$titleObj, _this$data$contentsOb;

      this.container.className = "fileAttachmentAnnotation";
      var trigger = document.createElement("div");
      trigger.style.height = this.container.style.height;
      trigger.style.width = this.container.style.width;
      trigger.addEventListener("dblclick", this._download.bind(this));

      if (!this.data.hasPopup && ((_this$data$titleObj = this.data.titleObj) !== null && _this$data$titleObj !== void 0 && _this$data$titleObj.str || (_this$data$contentsOb = this.data.contentsObj) !== null && _this$data$contentsOb !== void 0 && _this$data$contentsOb.str || this.data.richText)) {
        this._createPopup(trigger, this.data);
      }

      this.container.appendChild(trigger);
      return this.container;
    }
  }, {
    key: "_download",
    value: function _download() {
      var _this$downloadManager;

      (_this$downloadManager = this.downloadManager) === null || _this$downloadManager === void 0 ? void 0 : _this$downloadManager.openOrDownloadData(this.container, this.content, this.filename);
    }
  }]);

  return FileAttachmentAnnotationElement;
}(AnnotationElement);

var AnnotationLayer = /*#__PURE__*/function () {
  function AnnotationLayer() {
    _classCallCheck(this, AnnotationLayer);
  }

  _createClass(AnnotationLayer, null, [{
    key: "render",
    value: function render(parameters) {
      var sortedAnnotations = [],
          popupAnnotations = [];

      var _iterator22 = _createForOfIteratorHelper(parameters.annotations),
          _step22;

      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var _data = _step22.value;

          if (!_data) {
            continue;
          }

          if (_data.annotationType === _util.AnnotationType.POPUP) {
            popupAnnotations.push(_data);
            continue;
          }

          sortedAnnotations.push(_data);
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }

      if (popupAnnotations.length) {
        sortedAnnotations.push.apply(sortedAnnotations, popupAnnotations);
      }

      var div = parameters.div;

      for (var _i7 = 0, _sortedAnnotations = sortedAnnotations; _i7 < _sortedAnnotations.length; _i7++) {
        var data = _sortedAnnotations[_i7];
        var element = AnnotationElementFactory.create({
          data: data,
          layer: div,
          page: parameters.page,
          viewport: parameters.viewport,
          linkService: parameters.linkService,
          downloadManager: parameters.downloadManager,
          imageResourcesPath: parameters.imageResourcesPath || "",
          renderForms: parameters.renderForms !== false,
          svgFactory: new _display_utils.DOMSVGFactory(),
          annotationStorage: parameters.annotationStorage || new _annotation_storage.AnnotationStorage(),
          enableScripting: parameters.enableScripting,
          hasJSActions: parameters.hasJSActions,
          fieldObjects: parameters.fieldObjects,
          mouseState: parameters.mouseState || {
            isDown: false
          }
        });

        if (element.isRenderable) {
          var rendered = element.render();

          if (data.hidden) {
            rendered.style.visibility = "hidden";
          }

          if (Array.isArray(rendered)) {
            var _iterator23 = _createForOfIteratorHelper(rendered),
                _step23;

            try {
              for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
                var renderedElement = _step23.value;
                div.appendChild(renderedElement);
              }
            } catch (err) {
              _iterator23.e(err);
            } finally {
              _iterator23.f();
            }
          } else {
            if (element instanceof PopupAnnotationElement) {
              div.prepend(rendered);
            } else {
              div.appendChild(rendered);
            }
          }
        }
      }

      _classStaticPrivateMethodGet(this, AnnotationLayer, _setAnnotationCanvasMap).call(this, div, parameters.annotationCanvasMap);
    }
  }, {
    key: "update",
    value: function update(parameters) {
      var page = parameters.page,
          viewport = parameters.viewport,
          annotations = parameters.annotations,
          annotationCanvasMap = parameters.annotationCanvasMap,
          div = parameters.div;
      var transform = viewport.transform;
      var matrix = "matrix(".concat(transform.join(","), ")");
      var scale, ownMatrix;

      var _iterator24 = _createForOfIteratorHelper(annotations),
          _step24;

      try {
        for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
          var data = _step24.value;
          var elements = div.querySelectorAll("[data-annotation-id=\"".concat(data.id, "\"]"));

          if (elements) {
            var _iterator25 = _createForOfIteratorHelper(elements),
                _step25;

            try {
              for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
                var element = _step25.value;

                if (data.hasOwnCanvas) {
                  var rect = _util.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

                  if (!ownMatrix) {
                    scale = Math.abs(transform[0] || transform[1]);
                    var ownTransform = transform.slice();

                    for (var i = 0; i < 4; i++) {
                      ownTransform[i] = Math.sign(ownTransform[i]);
                    }

                    ownMatrix = "matrix(".concat(ownTransform.join(","), ")");
                  }

                  var left = rect[0] * scale;
                  var top = rect[1] * scale;
                  element.style.left = "".concat(left, "px");
                  element.style.top = "".concat(top, "px");
                  element.style.transformOrigin = "".concat(-left, "px ").concat(-top, "px");
                  element.style.transform = ownMatrix;
                } else {
                  element.style.transform = matrix;
                }
              }
            } catch (err) {
              _iterator25.e(err);
            } finally {
              _iterator25.f();
            }
          }
        }
      } catch (err) {
        _iterator24.e(err);
      } finally {
        _iterator24.f();
      }

      _classStaticPrivateMethodGet(this, AnnotationLayer, _setAnnotationCanvasMap).call(this, div, annotationCanvasMap);

      div.hidden = false;
    }
  }]);

  return AnnotationLayer;
}();

exports.AnnotationLayer = AnnotationLayer;

function _setAnnotationCanvasMap(div, annotationCanvasMap) {
  if (!annotationCanvasMap) {
    return;
  }

  var _iterator26 = _createForOfIteratorHelper(annotationCanvasMap),
      _step26;

  try {
    for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
      var _step26$value = _slicedToArray(_step26.value, 2),
          id = _step26$value[0],
          canvas = _step26$value[1];

      var element = div.querySelector("[data-annotation-id=\"".concat(id, "\"]"));

      if (!element) {
        continue;
      }

      var firstChild = element.firstChild;

      if (firstChild.nodeName === "CANVAS") {
        element.replaceChild(canvas, firstChild);
      } else {
        element.insertBefore(canvas, firstChild);
      }
    }
  } catch (err) {
    _iterator26.e(err);
  } finally {
    _iterator26.f();
  }

  annotationCanvasMap.clear();
}