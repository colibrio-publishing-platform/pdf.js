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
exports.PDFPageView = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _pdf = require("../pdf");

var _ui_utils = require("./ui_utils.js");

var _app_options = require("./app_options.js");

var _l10n_utils = require("./l10n_utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var MAX_CANVAS_PIXELS = _app_options.compatibilityParams.maxCanvasPixels || 16777216;

var _annotationMode = /*#__PURE__*/new WeakMap();

var PDFPageView = /*#__PURE__*/function () {
  function PDFPageView(options) {
    var _options$textLayerMod, _options$annotationMo, _options$textHighligh, _this$renderingQueue;

    _classCallCheck(this, PDFPageView);

    _classPrivateFieldInitSpec(this, _annotationMode, {
      writable: true,
      value: _pdf.AnnotationMode.ENABLE_FORMS
    });

    var container = options.container;
    var defaultViewport = options.defaultViewport;
    this.id = options.id;
    this.renderingId = "page" + this.id;
    this.pdfPage = null;
    this.pageLabel = null;
    this.rotation = 0;
    this.scale = options.scale || _ui_utils.DEFAULT_SCALE;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = options.optionalContentConfigPromise || null;
    this.hasRestrictedScaling = false;
    this.textLayerMode = (_options$textLayerMod = options.textLayerMode) !== null && _options$textLayerMod !== void 0 ? _options$textLayerMod : _ui_utils.TextLayerMode.ENABLE;

    _classPrivateFieldSet(this, _annotationMode, (_options$annotationMo = options.annotationMode) !== null && _options$annotationMo !== void 0 ? _options$annotationMo : _pdf.AnnotationMode.ENABLE_FORMS);

    this.imageResourcesPath = options.imageResourcesPath || "";
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels || MAX_CANVAS_PIXELS;
    this.eventBus = options.eventBus;
    this.renderingQueue = options.renderingQueue;
    this.textLayerFactory = options.textLayerFactory;
    this.annotationLayerFactory = options.annotationLayerFactory;
    this.xfaLayerFactory = options.xfaLayerFactory;
    this.textHighlighter = (_options$textHighligh = options.textHighlighterFactory) === null || _options$textHighligh === void 0 ? void 0 : _options$textHighligh.createTextHighlighter(this.id - 1, this.eventBus);
    this.structTreeLayerFactory = options.structTreeLayerFactory;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.l10n = options.l10n || _l10n_utils.NullL10n;
    this.paintTask = null;
    this.paintedViewportMap = new WeakMap();
    this.renderingState = _ui_utils.RenderingStates.INITIAL;
    this.resume = null;
    this._renderError = null;
    this._isStandalone = !((_this$renderingQueue = this.renderingQueue) !== null && _this$renderingQueue !== void 0 && _this$renderingQueue.hasViewer());
    this._annotationCanvasMap = null;
    this.annotationLayer = null;
    this.textLayer = null;
    this.zoomLayer = null;
    this.xfaLayer = null;
    this.structTreeLayer = null;
    var div = document.createElement("div");
    div.className = "page";
    div.style.width = Math.floor(this.viewport.width) + "px";
    div.style.height = Math.floor(this.viewport.height) + "px";
    div.setAttribute("data-page-number", this.id);
    div.setAttribute("role", "region");
    this.l10n.get("page_landmark", {
      page: this.id
    }).then(function (msg) {
      div.setAttribute("aria-label", msg);
    });
    this.div = div;
    container === null || container === void 0 ? void 0 : container.appendChild(div);
  }

  _createClass(PDFPageView, [{
    key: "setPdfPage",
    value: function setPdfPage(pdfPage) {
      this.pdfPage = pdfPage;
      this.pdfPageRotate = pdfPage.rotate;
      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = pdfPage.getViewport({
        scale: this.scale * _pdf.PixelsPerInch.PDF_TO_CSS_UNITS,
        rotation: totalRotation
      });
      this.reset();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.reset();

      if (this.pdfPage) {
        this.pdfPage.cleanup();
      }
    }
  }, {
    key: "_renderAnnotationLayer",
    value: function () {
      var _renderAnnotationLayer2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var error;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                error = null;
                _context.prev = 1;
                _context.next = 4;
                return this.annotationLayer.render(this.viewport, "display");

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                error = _context.t0;

              case 9:
                _context.prev = 9;
                this.eventBus.dispatch("annotationlayerrendered", {
                  source: this,
                  pageNumber: this.id,
                  error: error
                });
                return _context.finish(9);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6, 9, 12]]);
      }));

      function _renderAnnotationLayer() {
        return _renderAnnotationLayer2.apply(this, arguments);
      }

      return _renderAnnotationLayer;
    }()
  }, {
    key: "_renderXfaLayer",
    value: function () {
      var _renderXfaLayer2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var error, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                error = null;
                _context2.prev = 1;
                _context2.next = 4;
                return this.xfaLayer.render(this.viewport, "display");

              case 4:
                result = _context2.sent;

                if (this.textHighlighter) {
                  this._buildXfaTextContentItems(result.textDivs);
                }

                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                error = _context2.t0;

              case 11:
                _context2.prev = 11;
                this.eventBus.dispatch("xfalayerrendered", {
                  source: this,
                  pageNumber: this.id,
                  error: error
                });
                return _context2.finish(11);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8, 11, 14]]);
      }));

      function _renderXfaLayer() {
        return _renderXfaLayer2.apply(this, arguments);
      }

      return _renderXfaLayer;
    }()
  }, {
    key: "_buildXfaTextContentItems",
    value: function () {
      var _buildXfaTextContentItems2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(textDivs) {
        var text, items, _iterator, _step, item;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.pdfPage.getTextContent();

              case 2:
                text = _context3.sent;
                items = [];
                _iterator = _createForOfIteratorHelper(text.items);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    item = _step.value;
                    items.push(item.str);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                this.textHighlighter.setTextMapping(textDivs, items);
                this.textHighlighter.enable();

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _buildXfaTextContentItems(_x) {
        return _buildXfaTextContentItems2.apply(this, arguments);
      }

      return _buildXfaTextContentItems;
    }()
  }, {
    key: "_resetZoomLayer",
    value: function _resetZoomLayer() {
      var removeFromDOM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.zoomLayer) {
        return;
      }

      var zoomLayerCanvas = this.zoomLayer.firstChild;
      this.paintedViewportMap["delete"](zoomLayerCanvas);
      zoomLayerCanvas.width = 0;
      zoomLayerCanvas.height = 0;

      if (removeFromDOM) {
        this.zoomLayer.remove();
      }

      this.zoomLayer = null;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this$annotationLayer,
          _this$xfaLayer,
          _this = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$keepZoomLayer = _ref.keepZoomLayer,
          keepZoomLayer = _ref$keepZoomLayer === void 0 ? false : _ref$keepZoomLayer,
          _ref$keepAnnotationLa = _ref.keepAnnotationLayer,
          keepAnnotationLayer = _ref$keepAnnotationLa === void 0 ? false : _ref$keepAnnotationLa,
          _ref$keepXfaLayer = _ref.keepXfaLayer,
          keepXfaLayer = _ref$keepXfaLayer === void 0 ? false : _ref$keepXfaLayer;

      this.cancelRendering({
        keepAnnotationLayer: keepAnnotationLayer,
        keepXfaLayer: keepXfaLayer
      });
      this.renderingState = _ui_utils.RenderingStates.INITIAL;
      var div = this.div;
      div.style.width = Math.floor(this.viewport.width) + "px";
      div.style.height = Math.floor(this.viewport.height) + "px";
      var childNodes = div.childNodes,
          zoomLayerNode = keepZoomLayer && this.zoomLayer || null,
          annotationLayerNode = keepAnnotationLayer && ((_this$annotationLayer = this.annotationLayer) === null || _this$annotationLayer === void 0 ? void 0 : _this$annotationLayer.div) || null,
          xfaLayerNode = keepXfaLayer && ((_this$xfaLayer = this.xfaLayer) === null || _this$xfaLayer === void 0 ? void 0 : _this$xfaLayer.div) || null;

      for (var i = childNodes.length - 1; i >= 0; i--) {
        var node = childNodes[i];

        switch (node) {
          case zoomLayerNode:
          case annotationLayerNode:
          case xfaLayerNode:
            continue;
        }

        node.remove();
      }

      div.removeAttribute("data-loaded");

      if (annotationLayerNode) {
        this.annotationLayer.hide();
      }

      if (xfaLayerNode) {
        this.xfaLayer.hide();
      }

      if (!zoomLayerNode) {
        if (this.canvas) {
          this.paintedViewportMap["delete"](this.canvas);
          this.canvas.width = 0;
          this.canvas.height = 0;
          delete this.canvas;
        }

        this._resetZoomLayer();
      }

      if (this.svg) {
        this.paintedViewportMap["delete"](this.svg);
        delete this.svg;
      }

      this.loadingIconDiv = document.createElement("div");
      this.loadingIconDiv.className = "loadingIcon notVisible";

      if (this._isStandalone) {
        this.toggleLoadingIconSpinner(true);
      }

      this.loadingIconDiv.setAttribute("role", "img");
      this.l10n.get("loading").then(function (msg) {
        var _this$loadingIconDiv;

        (_this$loadingIconDiv = _this.loadingIconDiv) === null || _this$loadingIconDiv === void 0 ? void 0 : _this$loadingIconDiv.setAttribute("aria-label", msg);
      });
      div.appendChild(this.loadingIconDiv);
    }
  }, {
    key: "update",
    value: function update(_ref2) {
      var _ref2$scale = _ref2.scale,
          scale = _ref2$scale === void 0 ? 0 : _ref2$scale,
          _ref2$rotation = _ref2.rotation,
          rotation = _ref2$rotation === void 0 ? null : _ref2$rotation,
          _ref2$optionalContent = _ref2.optionalContentConfigPromise,
          optionalContentConfigPromise = _ref2$optionalContent === void 0 ? null : _ref2$optionalContent;

      if (_typeof(arguments[0]) !== "object") {
        console.error("PDFPageView.update called with separate parameters, please use an object instead.");
        this.update({
          scale: arguments[0],
          rotation: arguments[1],
          optionalContentConfigPromise: arguments[2]
        });
        return;
      }

      this.scale = scale || this.scale;

      if (typeof rotation === "number") {
        this.rotation = rotation;
      }

      if (optionalContentConfigPromise instanceof Promise) {
        this._optionalContentConfigPromise = optionalContentConfigPromise;
      }

      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      var viewportScale = this.scale * _pdf.PixelsPerInch.PDF_TO_CSS_UNITS;
      this.viewport = this.viewport.clone({
        scale: viewportScale,
        rotation: totalRotation
      });

      if (this._isStandalone) {
        var style = document.documentElement.style;
        style.setProperty("--zoom-factor", this.scale);
        style.setProperty("--viewport-scale-factor", viewportScale);
      }

      if (this.svg) {
        this.cssTransform({
          target: this.svg,
          redrawAnnotationLayer: true,
          redrawXfaLayer: true
        });
        this.eventBus.dispatch("pagerendered", {
          source: this,
          pageNumber: this.id,
          cssTransform: true,
          timestamp: performance.now(),
          error: this._renderError
        });
        return;
      }

      var isScalingRestricted = false;

      if (this.canvas && this.maxCanvasPixels > 0) {
        var outputScale = this.outputScale;

        if ((Math.floor(this.viewport.width) * outputScale.sx | 0) * (Math.floor(this.viewport.height) * outputScale.sy | 0) > this.maxCanvasPixels) {
          isScalingRestricted = true;
        }
      }

      if (this.canvas) {
        if (this.useOnlyCssZoom || this.hasRestrictedScaling && isScalingRestricted) {
          this.cssTransform({
            target: this.canvas,
            redrawAnnotationLayer: true,
            redrawXfaLayer: true
          });
          this.eventBus.dispatch("pagerendered", {
            source: this,
            pageNumber: this.id,
            cssTransform: true,
            timestamp: performance.now(),
            error: this._renderError
          });
          return;
        }

        if (!this.zoomLayer && !this.canvas.hidden) {
          this.zoomLayer = this.canvas.parentNode;
          this.zoomLayer.style.position = "absolute";
        }
      }

      if (this.zoomLayer) {
        this.cssTransform({
          target: this.zoomLayer.firstChild
        });
      }

      this.reset({
        keepZoomLayer: true,
        keepAnnotationLayer: true,
        keepXfaLayer: true
      });
    }
  }, {
    key: "cancelRendering",
    value: function cancelRendering() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$keepAnnotationL = _ref3.keepAnnotationLayer,
          keepAnnotationLayer = _ref3$keepAnnotationL === void 0 ? false : _ref3$keepAnnotationL,
          _ref3$keepXfaLayer = _ref3.keepXfaLayer,
          keepXfaLayer = _ref3$keepXfaLayer === void 0 ? false : _ref3$keepXfaLayer;

      if (this.paintTask) {
        this.paintTask.cancel();
        this.paintTask = null;
      }

      this.resume = null;

      if (this.textLayer) {
        this.textLayer.cancel();
        this.textLayer = null;
      }

      if (this.annotationLayer && (!keepAnnotationLayer || !this.annotationLayer.div)) {
        this.annotationLayer.cancel();
        this.annotationLayer = null;
        this._annotationCanvasMap = null;
      }

      if (this.xfaLayer && (!keepXfaLayer || !this.xfaLayer.div)) {
        var _this$textHighlighter;

        this.xfaLayer.cancel();
        this.xfaLayer = null;
        (_this$textHighlighter = this.textHighlighter) === null || _this$textHighlighter === void 0 ? void 0 : _this$textHighlighter.disable();
      }

      if (this._onTextLayerRendered) {
        this.eventBus._off("textlayerrendered", this._onTextLayerRendered);

        this._onTextLayerRendered = null;
      }
    }
  }, {
    key: "cssTransform",
    value: function cssTransform(_ref4) {
      var target = _ref4.target,
          _ref4$redrawAnnotatio = _ref4.redrawAnnotationLayer,
          redrawAnnotationLayer = _ref4$redrawAnnotatio === void 0 ? false : _ref4$redrawAnnotatio,
          _ref4$redrawXfaLayer = _ref4.redrawXfaLayer,
          redrawXfaLayer = _ref4$redrawXfaLayer === void 0 ? false : _ref4$redrawXfaLayer;
      var width = this.viewport.width;
      var height = this.viewport.height;
      var div = this.div;
      target.style.width = target.parentNode.style.width = div.style.width = Math.floor(width) + "px";
      target.style.height = target.parentNode.style.height = div.style.height = Math.floor(height) + "px";
      var relativeRotation = this.viewport.rotation - this.paintedViewportMap.get(target).rotation;
      var absRotation = Math.abs(relativeRotation);
      var scaleX = 1,
          scaleY = 1;

      if (absRotation === 90 || absRotation === 270) {
        scaleX = height / width;
        scaleY = width / height;
      }

      target.style.transform = "rotate(".concat(relativeRotation, "deg) scale(").concat(scaleX, ", ").concat(scaleY, ")");

      if (this.textLayer) {
        var textLayerViewport = this.textLayer.viewport;
        var textRelativeRotation = this.viewport.rotation - textLayerViewport.rotation;
        var textAbsRotation = Math.abs(textRelativeRotation);
        var scale = width / textLayerViewport.width;

        if (textAbsRotation === 90 || textAbsRotation === 270) {
          scale = width / textLayerViewport.height;
        }

        var textLayerDiv = this.textLayer.textLayerDiv;
        var transX, transY;

        switch (textAbsRotation) {
          case 0:
            transX = transY = 0;
            break;

          case 90:
            transX = 0;
            transY = "-" + textLayerDiv.style.height;
            break;

          case 180:
            transX = "-" + textLayerDiv.style.width;
            transY = "-" + textLayerDiv.style.height;
            break;

          case 270:
            transX = "-" + textLayerDiv.style.width;
            transY = 0;
            break;

          default:
            console.error("Bad rotation value.");
            break;
        }

        textLayerDiv.style.transform = "rotate(".concat(textAbsRotation, "deg) ") + "scale(".concat(scale, ") ") + "translate(".concat(transX, ", ").concat(transY, ")");
        textLayerDiv.style.transformOrigin = "0% 0%";
      }

      if (redrawAnnotationLayer && this.annotationLayer) {
        this._renderAnnotationLayer();
      }

      if (redrawXfaLayer && this.xfaLayer) {
        this._renderXfaLayer();
      }
    }
  }, {
    key: "width",
    get: function get() {
      return this.viewport.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.viewport.height;
    }
  }, {
    key: "getPagePoint",
    value: function getPagePoint(x, y) {
      return this.viewport.convertToPdfPoint(x, y);
    }
  }, {
    key: "toggleLoadingIconSpinner",
    value: function toggleLoadingIconSpinner() {
      var _this$loadingIconDiv2;

      var viewVisible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      (_this$loadingIconDiv2 = this.loadingIconDiv) === null || _this$loadingIconDiv2 === void 0 ? void 0 : _this$loadingIconDiv2.classList.toggle("notVisible", !viewVisible);
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this$annotationLayer2,
          _this$xfaLayer2,
          _this2 = this;

      if (this.renderingState !== _ui_utils.RenderingStates.INITIAL) {
        console.error("Must be in new state before drawing");
        this.reset();
      }

      var div = this.div,
          pdfPage = this.pdfPage;

      if (!pdfPage) {
        this.renderingState = _ui_utils.RenderingStates.FINISHED;

        if (this.loadingIconDiv) {
          this.loadingIconDiv.remove();
          delete this.loadingIconDiv;
        }

        return Promise.reject(new Error("pdfPage is not loaded"));
      }

      this.renderingState = _ui_utils.RenderingStates.RUNNING;
      var canvasWrapper = document.createElement("div");
      canvasWrapper.style.width = div.style.width;
      canvasWrapper.style.height = div.style.height;
      canvasWrapper.classList.add("canvasWrapper");

      if ((_this$annotationLayer2 = this.annotationLayer) !== null && _this$annotationLayer2 !== void 0 && _this$annotationLayer2.div) {
        div.insertBefore(canvasWrapper, this.annotationLayer.div);
      } else {
        div.appendChild(canvasWrapper);
      }

      var textLayer = null;

      if (this.textLayerMode !== _ui_utils.TextLayerMode.DISABLE && this.textLayerFactory) {
        var _this$annotationLayer3;

        var textLayerDiv = document.createElement("div");
        textLayerDiv.className = "textLayer";
        textLayerDiv.style.width = canvasWrapper.style.width;
        textLayerDiv.style.height = canvasWrapper.style.height;

        if ((_this$annotationLayer3 = this.annotationLayer) !== null && _this$annotationLayer3 !== void 0 && _this$annotationLayer3.div) {
          div.insertBefore(textLayerDiv, this.annotationLayer.div);
        } else {
          div.appendChild(textLayerDiv);
        }

        textLayer = this.textLayerFactory.createTextLayerBuilder(textLayerDiv, this.id - 1, this.viewport, this.textLayerMode === _ui_utils.TextLayerMode.ENABLE_ENHANCE, this.eventBus, this.textHighlighter);
      }

      this.textLayer = textLayer;

      if (_classPrivateFieldGet(this, _annotationMode) !== _pdf.AnnotationMode.DISABLE && this.annotationLayerFactory) {
        this._annotationCanvasMap || (this._annotationCanvasMap = new Map());
        this.annotationLayer || (this.annotationLayer = this.annotationLayerFactory.createAnnotationLayerBuilder(div, pdfPage, null, this.imageResourcesPath, _classPrivateFieldGet(this, _annotationMode) === _pdf.AnnotationMode.ENABLE_FORMS, this.l10n, null, null, null, null, this._annotationCanvasMap));
      }

      if ((_this$xfaLayer2 = this.xfaLayer) !== null && _this$xfaLayer2 !== void 0 && _this$xfaLayer2.div) {
        div.appendChild(this.xfaLayer.div);
      }

      var renderContinueCallback = null;

      if (this.renderingQueue) {
        renderContinueCallback = function renderContinueCallback(cont) {
          if (!_this2.renderingQueue.isHighestPriority(_this2)) {
            _this2.renderingState = _ui_utils.RenderingStates.PAUSED;

            _this2.resume = function () {
              _this2.renderingState = _ui_utils.RenderingStates.RUNNING;
              cont();
            };

            return;
          }

          cont();
        };
      }

      var finishPaintTask = /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
          var error,
              _args4 = arguments;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  error = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;

                  if (paintTask === _this2.paintTask) {
                    _this2.paintTask = null;
                  }

                  if (!(error instanceof _pdf.RenderingCancelledException)) {
                    _context4.next = 5;
                    break;
                  }

                  _this2._renderError = null;
                  return _context4.abrupt("return");

                case 5:
                  _this2._renderError = error;
                  _this2.renderingState = _ui_utils.RenderingStates.FINISHED;

                  if (_this2.loadingIconDiv) {
                    _this2.loadingIconDiv.remove();

                    delete _this2.loadingIconDiv;
                  }

                  _this2._resetZoomLayer(true);

                  _this2.eventBus.dispatch("pagerendered", {
                    source: _this2,
                    pageNumber: _this2.id,
                    cssTransform: false,
                    timestamp: performance.now(),
                    error: _this2._renderError
                  });

                  if (!error) {
                    _context4.next = 12;
                    break;
                  }

                  throw error;

                case 12:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function finishPaintTask() {
          return _ref5.apply(this, arguments);
        };
      }();

      var paintTask = this.renderer === _ui_utils.RendererType.SVG ? this.paintOnSvg(canvasWrapper) : this.paintOnCanvas(canvasWrapper);
      paintTask.onRenderContinue = renderContinueCallback;
      this.paintTask = paintTask;
      var resultPromise = paintTask.promise.then(function () {
        return finishPaintTask(null).then(function () {
          if (textLayer) {
            var readableStream = pdfPage.streamTextContent({
              normalizeWhitespace: true,
              includeMarkedContent: true
            });
            textLayer.setTextContentStream(readableStream);
            textLayer.render();
          }

          if (_this2.annotationLayer) {
            _this2._renderAnnotationLayer();
          }
        });
      }, function (reason) {
        return finishPaintTask(reason);
      });

      if (this.xfaLayerFactory) {
        if (!this.xfaLayer) {
          this.xfaLayer = this.xfaLayerFactory.createXfaLayerBuilder(div, pdfPage, null);
        }

        this._renderXfaLayer();
      }

      if (this.structTreeLayerFactory && this.textLayer && this.canvas) {
        this._onTextLayerRendered = function (event) {
          if (event.pageNumber !== _this2.id) {
            return;
          }

          _this2.eventBus._off("textlayerrendered", _this2._onTextLayerRendered);

          _this2._onTextLayerRendered = null;

          if (!_this2.canvas) {
            return;
          }

          _this2.pdfPage.getStructTree().then(function (tree) {
            if (!tree) {
              return;
            }

            if (!_this2.canvas) {
              return;
            }

            var treeDom = _this2.structTreeLayer.render(tree);

            treeDom.classList.add("structTree");

            _this2.canvas.appendChild(treeDom);
          });
        };

        this.eventBus._on("textlayerrendered", this._onTextLayerRendered);

        this.structTreeLayer = this.structTreeLayerFactory.createStructTreeLayerBuilder(pdfPage);
      }

      div.setAttribute("data-loaded", true);
      this.eventBus.dispatch("pagerender", {
        source: this,
        pageNumber: this.id
      });
      return resultPromise;
    }
  }, {
    key: "paintOnCanvas",
    value: function paintOnCanvas(canvasWrapper) {
      var renderCapability = (0, _pdf.createPromiseCapability)();
      var result = {
        promise: renderCapability.promise,
        onRenderContinue: function onRenderContinue(cont) {
          cont();
        },
        cancel: function cancel() {
          renderTask.cancel();
        }
      };
      var viewport = this.viewport;
      var canvas = document.createElement("canvas");
      canvas.hidden = true;
      var isCanvasHidden = true;

      var showCanvas = function showCanvas() {
        if (isCanvasHidden) {
          canvas.hidden = false;
          isCanvasHidden = false;
        }
      };

      canvasWrapper.appendChild(canvas);
      this.canvas = canvas;
      canvas.mozOpaque = true;
      var ctx = canvas.getContext("2d", {
        alpha: false
      });
      var outputScale = (0, _ui_utils.getOutputScale)(ctx);
      this.outputScale = outputScale;

      if (this.useOnlyCssZoom) {
        var actualSizeViewport = viewport.clone({
          scale: _pdf.PixelsPerInch.PDF_TO_CSS_UNITS
        });
        outputScale.sx *= actualSizeViewport.width / viewport.width;
        outputScale.sy *= actualSizeViewport.height / viewport.height;
        outputScale.scaled = true;
      }

      if (this.maxCanvasPixels > 0) {
        var pixelsInViewport = viewport.width * viewport.height;
        var maxScale = Math.sqrt(this.maxCanvasPixels / pixelsInViewport);

        if (outputScale.sx > maxScale || outputScale.sy > maxScale) {
          outputScale.sx = maxScale;
          outputScale.sy = maxScale;
          outputScale.scaled = true;
          this.hasRestrictedScaling = true;
        } else {
          this.hasRestrictedScaling = false;
        }
      }

      var sfx = (0, _ui_utils.approximateFraction)(outputScale.sx);
      var sfy = (0, _ui_utils.approximateFraction)(outputScale.sy);
      canvas.width = (0, _ui_utils.roundToDivide)(viewport.width * outputScale.sx, sfx[0]);
      canvas.height = (0, _ui_utils.roundToDivide)(viewport.height * outputScale.sy, sfy[0]);
      canvas.style.width = (0, _ui_utils.roundToDivide)(viewport.width, sfx[1]) + "px";
      canvas.style.height = (0, _ui_utils.roundToDivide)(viewport.height, sfy[1]) + "px";
      this.paintedViewportMap.set(canvas, viewport);
      var transform = !outputScale.scaled ? null : [outputScale.sx, 0, 0, outputScale.sy, 0, 0];
      var renderContext = {
        canvasContext: ctx,
        transform: transform,
        viewport: this.viewport,
        annotationMode: _classPrivateFieldGet(this, _annotationMode),
        optionalContentConfigPromise: this._optionalContentConfigPromise,
        annotationCanvasMap: this._annotationCanvasMap
      };
      var renderTask = this.pdfPage.render(renderContext);

      renderTask.onContinue = function (cont) {
        showCanvas();

        if (result.onRenderContinue) {
          result.onRenderContinue(cont);
        } else {
          cont();
        }
      };

      renderTask.promise.then(function () {
        showCanvas();
        renderCapability.resolve();
      }, function (error) {
        showCanvas();
        renderCapability.reject(error);
      });
      return result;
    }
  }, {
    key: "paintOnSvg",
    value: function paintOnSvg(wrapper) {
      var _this3 = this;

      var cancelled = false;

      var ensureNotCancelled = function ensureNotCancelled() {
        if (cancelled) {
          throw new _pdf.RenderingCancelledException("Rendering cancelled, page ".concat(_this3.id), "svg");
        }
      };

      var pdfPage = this.pdfPage;
      var actualSizeViewport = this.viewport.clone({
        scale: _pdf.PixelsPerInch.PDF_TO_CSS_UNITS
      });
      var promise = pdfPage.getOperatorList({
        annotationMode: _classPrivateFieldGet(this, _annotationMode)
      }).then(function (opList) {
        ensureNotCancelled();
        var svgGfx = new _pdf.SVGGraphics(pdfPage.commonObjs, pdfPage.objs, _app_options.compatibilityParams.disableCreateObjectURL);
        return svgGfx.getSVG(opList, actualSizeViewport).then(function (svg) {
          ensureNotCancelled();
          _this3.svg = svg;

          _this3.paintedViewportMap.set(svg, actualSizeViewport);

          svg.style.width = wrapper.style.width;
          svg.style.height = wrapper.style.height;
          _this3.renderingState = _ui_utils.RenderingStates.FINISHED;
          wrapper.appendChild(svg);
        });
      });
      return {
        promise: promise,
        onRenderContinue: function onRenderContinue(cont) {
          cont();
        },
        cancel: function cancel() {
          cancelled = true;
        }
      };
    }
  }, {
    key: "setPageLabel",
    value: function setPageLabel(label) {
      this.pageLabel = typeof label === "string" ? label : null;

      if (this.pageLabel !== null) {
        this.div.setAttribute("data-page-label", this.pageLabel);
      } else {
        this.div.removeAttribute("data-page-label");
      }
    }
  }]);

  return PDFPageView;
}();

exports.PDFPageView = PDFPageView;