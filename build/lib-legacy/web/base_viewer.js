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
exports.PagesCountLimit = exports.PDFPageViewBuffer = exports.BaseViewer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _pdf = require("../pdf");

var _ui_utils = require("./ui_utils.js");

var _annotation_layer_builder = require("./annotation_layer_builder.js");

var _l10n_utils = require("./l10n_utils.js");

var _pdf_page_view = require("./pdf_page_view.js");

var _pdf_rendering_queue = require("./pdf_rendering_queue.js");

var _pdf_link_service = require("./pdf_link_service.js");

var _struct_tree_layer_builder = require("./struct_tree_layer_builder.js");

var _text_highlighter = require("./text_highlighter.js");

var _text_layer_builder = require("./text_layer_builder.js");

var _xfa_layer_builder = require("./xfa_layer_builder.js");

var _Symbol$iterator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var DEFAULT_CACHE_SIZE = 10;
var ENABLE_PERMISSIONS_CLASS = "enablePermissions";
var PagesCountLimit = {
  FORCE_SCROLL_MODE_PAGE: 15000,
  FORCE_LAZY_PAGE_INIT: 7500,
  PAUSE_EAGER_PAGE_INIT: 500
};
exports.PagesCountLimit = PagesCountLimit;

var _buf = /*#__PURE__*/new WeakMap();

var _size = /*#__PURE__*/new WeakMap();

var _destroyFirstView = /*#__PURE__*/new WeakSet();

_Symbol$iterator = Symbol.iterator;

var PDFPageViewBuffer = /*#__PURE__*/function () {
  function PDFPageViewBuffer(size) {
    _classCallCheck(this, PDFPageViewBuffer);

    _classPrivateMethodInitSpec(this, _destroyFirstView);

    _classPrivateFieldInitSpec(this, _buf, {
      writable: true,
      value: new Set()
    });

    _classPrivateFieldInitSpec(this, _size, {
      writable: true,
      value: 0
    });

    _classPrivateFieldSet(this, _size, size);
  }

  _createClass(PDFPageViewBuffer, [{
    key: "push",
    value: function push(view) {
      var buf = _classPrivateFieldGet(this, _buf);

      if (buf.has(view)) {
        buf["delete"](view);
      }

      buf.add(view);

      if (buf.size > _classPrivateFieldGet(this, _size)) {
        _classPrivateMethodGet(this, _destroyFirstView, _destroyFirstView2).call(this);
      }
    }
  }, {
    key: "resize",
    value: function resize(newSize) {
      var idsToKeep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _classPrivateFieldSet(this, _size, newSize);

      var buf = _classPrivateFieldGet(this, _buf);

      if (idsToKeep) {
        var ii = buf.size;
        var i = 1;

        var _iterator = _createForOfIteratorHelper(buf),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var view = _step.value;

            if (idsToKeep.has(view.id)) {
              buf["delete"](view);
              buf.add(view);
            }

            if (++i > ii) {
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      while (buf.size > _classPrivateFieldGet(this, _size)) {
        _classPrivateMethodGet(this, _destroyFirstView, _destroyFirstView2).call(this);
      }
    }
  }, {
    key: "has",
    value: function has(view) {
      return _classPrivateFieldGet(this, _buf).has(view);
    }
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return _classPrivateFieldGet(this, _buf).keys();
    }
  }]);

  return PDFPageViewBuffer;
}();

exports.PDFPageViewBuffer = PDFPageViewBuffer;

function _destroyFirstView2() {
  var firstView = _classPrivateFieldGet(this, _buf).keys().next().value;

  firstView === null || firstView === void 0 ? void 0 : firstView.destroy();

  _classPrivateFieldGet(this, _buf)["delete"](firstView);
}

var _buffer = /*#__PURE__*/new WeakMap();

var _annotationMode = /*#__PURE__*/new WeakMap();

var _previousAnnotationMode = /*#__PURE__*/new WeakMap();

var _enablePermissions = /*#__PURE__*/new WeakMap();

var _previousContainerHeight = /*#__PURE__*/new WeakMap();

var _scrollModePageState = /*#__PURE__*/new WeakMap();

var _initializePermissions = /*#__PURE__*/new WeakSet();

var _onePageRenderedOrForceFetch = /*#__PURE__*/new WeakSet();

var _ensurePageViewVisible = /*#__PURE__*/new WeakSet();

var _isSameScale = /*#__PURE__*/new WeakSet();

var _ensurePdfPageLoaded = /*#__PURE__*/new WeakSet();

var _getScrollAhead = /*#__PURE__*/new WeakSet();

var _toggleLoadingIconSpinner = /*#__PURE__*/new WeakSet();

var BaseViewer = /*#__PURE__*/function () {
  function BaseViewer(options) {
    var _this$container,
        _this$viewer,
        _options$textLayerMod,
        _options$annotationMo,
        _this = this;

    _classCallCheck(this, BaseViewer);

    _classPrivateMethodInitSpec(this, _toggleLoadingIconSpinner);

    _classPrivateMethodInitSpec(this, _getScrollAhead);

    _classPrivateMethodInitSpec(this, _ensurePdfPageLoaded);

    _classPrivateMethodInitSpec(this, _isSameScale);

    _classPrivateMethodInitSpec(this, _ensurePageViewVisible);

    _classPrivateMethodInitSpec(this, _onePageRenderedOrForceFetch);

    _classPrivateMethodInitSpec(this, _initializePermissions);

    _classPrivateFieldInitSpec(this, _buffer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _annotationMode, {
      writable: true,
      value: _pdf.AnnotationMode.ENABLE_FORMS
    });

    _classPrivateFieldInitSpec(this, _previousAnnotationMode, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _enablePermissions, {
      writable: true,
      value: false
    });

    _classPrivateFieldInitSpec(this, _previousContainerHeight, {
      writable: true,
      value: 0
    });

    _classPrivateFieldInitSpec(this, _scrollModePageState, {
      writable: true,
      value: null
    });

    if (this.constructor === BaseViewer) {
      throw new Error("Cannot initialize BaseViewer.");
    }

    var viewerVersion = '2.12.323';

    if (_pdf.version !== viewerVersion) {
      throw new Error("The API version \"".concat(_pdf.version, "\" does not match the Viewer version \"").concat(viewerVersion, "\"."));
    }

    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;

    if (!(((_this$container = this.container) === null || _this$container === void 0 ? void 0 : _this$container.tagName.toUpperCase()) === "DIV" && ((_this$viewer = this.viewer) === null || _this$viewer === void 0 ? void 0 : _this$viewer.tagName.toUpperCase()) === "DIV")) {
      throw new Error("Invalid `container` and/or `viewer` option.");
    }

    if (this.container.offsetParent && getComputedStyle(this.container).position !== "absolute") {
      throw new Error("The `container` must be absolutely positioned.");
    }

    this.eventBus = options.eventBus;
    this.linkService = options.linkService || new _pdf_link_service.SimpleLinkService();
    this.downloadManager = options.downloadManager || null;
    this.findController = options.findController || null;
    this._scriptingManager = options.scriptingManager || null;
    this.removePageBorders = options.removePageBorders || false;
    this.textLayerMode = (_options$textLayerMod = options.textLayerMode) !== null && _options$textLayerMod !== void 0 ? _options$textLayerMod : _ui_utils.TextLayerMode.ENABLE;

    _classPrivateFieldSet(this, _annotationMode, (_options$annotationMo = options.annotationMode) !== null && _options$annotationMo !== void 0 ? _options$annotationMo : _pdf.AnnotationMode.ENABLE_FORMS);

    this.imageResourcesPath = options.imageResourcesPath || "";
    this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels;
    this.l10n = options.l10n || _l10n_utils.NullL10n;

    _classPrivateFieldSet(this, _enablePermissions, options.enablePermissions || false);

    this.defaultRenderingQueue = !options.renderingQueue;

    if (this.defaultRenderingQueue) {
      this.renderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
      this.renderingQueue.setViewer(this);
    } else {
      this.renderingQueue = options.renderingQueue;
    }

    this._doc = document.documentElement;
    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdate.bind(this));
    this.presentationModeState = _ui_utils.PresentationModeState.UNKNOWN;
    this._onBeforeDraw = this._onAfterDraw = null;

    this._resetView();

    if (this.removePageBorders) {
      this.viewer.classList.add("removePageBorders");
    }

    Promise.resolve().then(function () {
      _this.eventBus.dispatch("baseviewerinit", {
        source: _this
      });
    });
  }

  _createClass(BaseViewer, [{
    key: "pagesCount",
    get: function get() {
      return this._pages.length;
    }
  }, {
    key: "getPageView",
    value: function getPageView(index) {
      return this._pages[index];
    }
  }, {
    key: "pageViewsReady",
    get: function get() {
      if (!this._pagesCapability.settled) {
        return false;
      }

      return this._pages.every(function (pageView) {
        return pageView === null || pageView === void 0 ? void 0 : pageView.pdfPage;
      });
    }
  }, {
    key: "renderForms",
    get: function get() {
      return _classPrivateFieldGet(this, _annotationMode) === _pdf.AnnotationMode.ENABLE_FORMS;
    }
  }, {
    key: "enableScripting",
    get: function get() {
      return !!this._scriptingManager;
    }
  }, {
    key: "currentPageNumber",
    get: function get() {
      return this._currentPageNumber;
    },
    set: function set(val) {
      if (!Number.isInteger(val)) {
        throw new Error("Invalid page number.");
      }

      if (!this.pdfDocument) {
        return;
      }

      if (!this._setCurrentPageNumber(val, true)) {
        console.error("currentPageNumber: \"".concat(val, "\" is not a valid page."));
      }
    }
  }, {
    key: "_setCurrentPageNumber",
    value: function _setCurrentPageNumber(val) {
      var _this$_pageLabels, _this$_pageLabels2;

      var resetCurrentPageView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this._currentPageNumber === val) {
        if (resetCurrentPageView) {
          this._resetCurrentPageView();
        }

        return true;
      }

      if (!(0 < val && val <= this.pagesCount)) {
        return false;
      }

      var previous = this._currentPageNumber;
      this._currentPageNumber = val;
      this.eventBus.dispatch("pagechanging", {
        source: this,
        pageNumber: val,
        pageLabel: (_this$_pageLabels = (_this$_pageLabels2 = this._pageLabels) === null || _this$_pageLabels2 === void 0 ? void 0 : _this$_pageLabels2[val - 1]) !== null && _this$_pageLabels !== void 0 ? _this$_pageLabels : null,
        previous: previous
      });

      if (resetCurrentPageView) {
        this._resetCurrentPageView();
      }

      return true;
    }
  }, {
    key: "currentPageLabel",
    get: function get() {
      var _this$_pageLabels3, _this$_pageLabels4;

      return (_this$_pageLabels3 = (_this$_pageLabels4 = this._pageLabels) === null || _this$_pageLabels4 === void 0 ? void 0 : _this$_pageLabels4[this._currentPageNumber - 1]) !== null && _this$_pageLabels3 !== void 0 ? _this$_pageLabels3 : null;
    },
    set: function set(val) {
      if (!this.pdfDocument) {
        return;
      }

      var page = val | 0;

      if (this._pageLabels) {
        var i = this._pageLabels.indexOf(val);

        if (i >= 0) {
          page = i + 1;
        }
      }

      if (!this._setCurrentPageNumber(page, true)) {
        console.error("currentPageLabel: \"".concat(val, "\" is not a valid page."));
      }
    }
  }, {
    key: "currentScale",
    get: function get() {
      return this._currentScale !== _ui_utils.UNKNOWN_SCALE ? this._currentScale : _ui_utils.DEFAULT_SCALE;
    },
    set: function set(val) {
      if (isNaN(val)) {
        throw new Error("Invalid numeric scale.");
      }

      if (!this.pdfDocument) {
        return;
      }

      this._setScale(val, false);
    }
  }, {
    key: "currentScaleValue",
    get: function get() {
      return this._currentScaleValue;
    },
    set: function set(val) {
      if (!this.pdfDocument) {
        return;
      }

      this._setScale(val, false);
    }
  }, {
    key: "pagesRotation",
    get: function get() {
      return this._pagesRotation;
    },
    set: function set(rotation) {
      if (!(0, _ui_utils.isValidRotation)(rotation)) {
        throw new Error("Invalid pages rotation angle.");
      }

      if (!this.pdfDocument) {
        return;
      }

      rotation %= 360;

      if (rotation < 0) {
        rotation += 360;
      }

      if (this._pagesRotation === rotation) {
        return;
      }

      this._pagesRotation = rotation;
      var pageNumber = this._currentPageNumber;
      var updateArgs = {
        rotation: rotation
      };

      var _iterator2 = _createForOfIteratorHelper(this._pages),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var pageView = _step2.value;
          pageView.update(updateArgs);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (this._currentScaleValue) {
        this._setScale(this._currentScaleValue, true);
      }

      this.eventBus.dispatch("rotationchanging", {
        source: this,
        pagesRotation: rotation,
        pageNumber: pageNumber
      });

      if (this.defaultRenderingQueue) {
        this.update();
      }
    }
  }, {
    key: "firstPagePromise",
    get: function get() {
      return this.pdfDocument ? this._firstPageCapability.promise : null;
    }
  }, {
    key: "onePageRendered",
    get: function get() {
      return this.pdfDocument ? this._onePageRenderedCapability.promise : null;
    }
  }, {
    key: "pagesPromise",
    get: function get() {
      return this.pdfDocument ? this._pagesCapability.promise : null;
    }
  }, {
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      var _this2 = this;

      if (this.pdfDocument) {
        this.eventBus.dispatch("pagesdestroy", {
          source: this
        });

        this._cancelRendering();

        this._resetView();

        if (this.findController) {
          this.findController.setDocument(null);
        }

        if (this._scriptingManager) {
          this._scriptingManager.setDocument(null);
        }
      }

      this.pdfDocument = pdfDocument;

      if (!pdfDocument) {
        return;
      }

      var isPureXfa = pdfDocument.isPureXfa;
      var pagesCount = pdfDocument.numPages;
      var firstPagePromise = pdfDocument.getPage(1);
      var optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();
      var permissionsPromise = _classPrivateFieldGet(this, _enablePermissions) ? pdfDocument.getPermissions() : Promise.resolve();

      if (pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
        console.warn("Forcing PAGE-scrolling for performance reasons, given the length of the document.");
        var mode = this._scrollMode = _ui_utils.ScrollMode.PAGE;
        this.eventBus.dispatch("scrollmodechanged", {
          source: this,
          mode: mode
        });
      }

      this._pagesCapability.promise.then(function () {
        _this2.eventBus.dispatch("pagesloaded", {
          source: _this2,
          pagesCount: pagesCount
        });
      }, function () {});

      this._onBeforeDraw = function (evt) {
        var pageView = _this2._pages[evt.pageNumber - 1];

        if (!pageView) {
          return;
        }

        _classPrivateFieldGet(_this2, _buffer).push(pageView);
      };

      this.eventBus._on("pagerender", this._onBeforeDraw);

      this._onAfterDraw = function (evt) {
        if (evt.cssTransform || _this2._onePageRenderedCapability.settled) {
          return;
        }

        _this2._onePageRenderedCapability.resolve({
          timestamp: evt.timestamp
        });

        _this2.eventBus._off("pagerendered", _this2._onAfterDraw);

        _this2._onAfterDraw = null;
      };

      this.eventBus._on("pagerendered", this._onAfterDraw);

      Promise.all([firstPagePromise, permissionsPromise]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            firstPdfPage = _ref2[0],
            permissions = _ref2[1];

        if (pdfDocument !== _this2.pdfDocument) {
          return;
        }

        _this2._firstPageCapability.resolve(firstPdfPage);

        _this2._optionalContentConfigPromise = optionalContentConfigPromise;

        _classPrivateMethodGet(_this2, _initializePermissions, _initializePermissions2).call(_this2, permissions);

        var viewerElement = _this2._scrollMode === _ui_utils.ScrollMode.PAGE ? null : _this2.viewer;
        var scale = _this2.currentScale;
        var viewport = firstPdfPage.getViewport({
          scale: scale * _pdf.PixelsPerInch.PDF_TO_CSS_UNITS
        });
        var textLayerFactory = _this2.textLayerMode !== _ui_utils.TextLayerMode.DISABLE && !isPureXfa ? _this2 : null;
        var annotationLayerFactory = _classPrivateFieldGet(_this2, _annotationMode) !== _pdf.AnnotationMode.DISABLE ? _this2 : null;
        var xfaLayerFactory = isPureXfa ? _this2 : null;

        for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
          var pageView = new _pdf_page_view.PDFPageView({
            container: viewerElement,
            eventBus: _this2.eventBus,
            id: pageNum,
            scale: scale,
            defaultViewport: viewport.clone(),
            optionalContentConfigPromise: optionalContentConfigPromise,
            renderingQueue: _this2.renderingQueue,
            textLayerFactory: textLayerFactory,
            textLayerMode: _this2.textLayerMode,
            annotationLayerFactory: annotationLayerFactory,
            annotationMode: _classPrivateFieldGet(_this2, _annotationMode),
            xfaLayerFactory: xfaLayerFactory,
            textHighlighterFactory: _this2,
            structTreeLayerFactory: _this2,
            imageResourcesPath: _this2.imageResourcesPath,
            renderer: _this2.renderer,
            useOnlyCssZoom: _this2.useOnlyCssZoom,
            maxCanvasPixels: _this2.maxCanvasPixels,
            l10n: _this2.l10n
          });

          _this2._pages.push(pageView);
        }

        var firstPageView = _this2._pages[0];

        if (firstPageView) {
          firstPageView.setPdfPage(firstPdfPage);

          _this2.linkService.cachePageRef(1, firstPdfPage.ref);
        }

        if (_this2._scrollMode === _ui_utils.ScrollMode.PAGE) {
          _classPrivateMethodGet(_this2, _ensurePageViewVisible, _ensurePageViewVisible2).call(_this2);
        } else if (_this2._spreadMode !== _ui_utils.SpreadMode.NONE) {
          _this2._updateSpreadMode();
        }

        _classPrivateMethodGet(_this2, _onePageRenderedOrForceFetch, _onePageRenderedOrForceFetch2).call(_this2).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          var getPagesLeft, _loop, _pageNum;

          return _regenerator["default"].wrap(function _callee$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (_this2.findController) {
                    _this2.findController.setDocument(pdfDocument);
                  }

                  if (_this2._scriptingManager) {
                    _this2._scriptingManager.setDocument(pdfDocument);
                  }

                  if (!(pdfDocument.loadingParams.disableAutoFetch || pagesCount > PagesCountLimit.FORCE_LAZY_PAGE_INIT)) {
                    _context2.next = 5;
                    break;
                  }

                  _this2._pagesCapability.resolve();

                  return _context2.abrupt("return");

                case 5:
                  getPagesLeft = pagesCount - 1;

                  if (!(getPagesLeft <= 0)) {
                    _context2.next = 9;
                    break;
                  }

                  _this2._pagesCapability.resolve();

                  return _context2.abrupt("return");

                case 9:
                  _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop(_pageNum) {
                    var promise;
                    return _regenerator["default"].wrap(function _loop$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            promise = pdfDocument.getPage(_pageNum).then(function (pdfPage) {
                              var pageView = _this2._pages[_pageNum - 1];

                              if (!pageView.pdfPage) {
                                pageView.setPdfPage(pdfPage);
                              }

                              _this2.linkService.cachePageRef(_pageNum, pdfPage.ref);

                              if (--getPagesLeft === 0) {
                                _this2._pagesCapability.resolve();
                              }
                            }, function (reason) {
                              console.error("Unable to get page ".concat(_pageNum, " to initialize viewer"), reason);

                              if (--getPagesLeft === 0) {
                                _this2._pagesCapability.resolve();
                              }
                            });

                            if (!(_pageNum % PagesCountLimit.PAUSE_EAGER_PAGE_INIT === 0)) {
                              _context.next = 4;
                              break;
                            }

                            _context.next = 4;
                            return promise;

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _loop);
                  });
                  _pageNum = 2;

                case 11:
                  if (!(_pageNum <= pagesCount)) {
                    _context2.next = 16;
                    break;
                  }

                  return _context2.delegateYield(_loop(_pageNum), "t0", 13);

                case 13:
                  ++_pageNum;
                  _context2.next = 11;
                  break;

                case 16:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee);
        })));

        _this2.eventBus.dispatch("pagesinit", {
          source: _this2
        });

        pdfDocument.getMetadata().then(function (_ref4) {
          var info = _ref4.info;

          if (pdfDocument !== _this2.pdfDocument) {
            return;
          }

          if (info.Language) {
            _this2.viewer.lang = info.Language;
          }
        });

        if (_this2.defaultRenderingQueue) {
          _this2.update();
        }
      })["catch"](function (reason) {
        console.error("Unable to initialize viewer", reason);

        _this2._pagesCapability.reject(reason);
      });
    }
  }, {
    key: "setPageLabels",
    value: function setPageLabels(labels) {
      if (!this.pdfDocument) {
        return;
      }

      if (!labels) {
        this._pageLabels = null;
      } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
        this._pageLabels = null;
        console.error("setPageLabels: Invalid page labels.");
      } else {
        this._pageLabels = labels;
      }

      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        var _this$_pageLabels$i, _this$_pageLabels5;

        this._pages[i].setPageLabel((_this$_pageLabels$i = (_this$_pageLabels5 = this._pageLabels) === null || _this$_pageLabels5 === void 0 ? void 0 : _this$_pageLabels5[i]) !== null && _this$_pageLabels$i !== void 0 ? _this$_pageLabels$i : null);
      }
    }
  }, {
    key: "_resetView",
    value: function _resetView() {
      this._pages = [];
      this._currentPageNumber = 1;
      this._currentScale = _ui_utils.UNKNOWN_SCALE;
      this._currentScaleValue = null;
      this._pageLabels = null;

      _classPrivateFieldSet(this, _buffer, new PDFPageViewBuffer(DEFAULT_CACHE_SIZE));

      this._location = null;
      this._pagesRotation = 0;
      this._optionalContentConfigPromise = null;
      this._firstPageCapability = (0, _pdf.createPromiseCapability)();
      this._onePageRenderedCapability = (0, _pdf.createPromiseCapability)();
      this._pagesCapability = (0, _pdf.createPromiseCapability)();
      this._scrollMode = _ui_utils.ScrollMode.VERTICAL;
      this._previousScrollMode = _ui_utils.ScrollMode.UNKNOWN;
      this._spreadMode = _ui_utils.SpreadMode.NONE;

      _classPrivateFieldSet(this, _scrollModePageState, {
        previousPageNumber: 1,
        scrollDown: true,
        pages: []
      });

      if (this._onBeforeDraw) {
        this.eventBus._off("pagerender", this._onBeforeDraw);

        this._onBeforeDraw = null;
      }

      if (this._onAfterDraw) {
        this.eventBus._off("pagerendered", this._onAfterDraw);

        this._onAfterDraw = null;
      }

      this.viewer.textContent = "";

      this._updateScrollMode();

      this.viewer.removeAttribute("lang");
      this.viewer.classList.remove(ENABLE_PERMISSIONS_CLASS);

      if (_classPrivateFieldGet(this, _previousAnnotationMode) !== null) {
        _classPrivateFieldSet(this, _annotationMode, _classPrivateFieldGet(this, _previousAnnotationMode));

        _classPrivateFieldSet(this, _previousAnnotationMode, null);
      }
    }
  }, {
    key: "_scrollUpdate",
    value: function _scrollUpdate() {
      if (this.pagesCount === 0) {
        return;
      }

      this.update();
    }
  }, {
    key: "_scrollIntoView",
    value: function _scrollIntoView(_ref5) {
      var pageDiv = _ref5.pageDiv,
          _ref5$pageSpot = _ref5.pageSpot,
          pageSpot = _ref5$pageSpot === void 0 ? null : _ref5$pageSpot,
          _ref5$pageNumber = _ref5.pageNumber,
          pageNumber = _ref5$pageNumber === void 0 ? null : _ref5$pageNumber;

      if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
        if (pageNumber) {
          this._setCurrentPageNumber(pageNumber);
        }

        _classPrivateMethodGet(this, _ensurePageViewVisible, _ensurePageViewVisible2).call(this);

        this.update();
      }

      if (!pageSpot && !this.isInPresentationMode) {
        var left = pageDiv.offsetLeft + pageDiv.clientLeft;
        var right = left + pageDiv.clientWidth;
        var _this$container2 = this.container,
            scrollLeft = _this$container2.scrollLeft,
            clientWidth = _this$container2.clientWidth;

        if (this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL || left < scrollLeft || right > scrollLeft + clientWidth) {
          pageSpot = {
            left: 0,
            top: 0
          };
        }
      }

      (0, _ui_utils.scrollIntoView)(pageDiv, pageSpot);
    }
  }, {
    key: "_setScaleUpdatePages",
    value: function _setScaleUpdatePages(newScale, newValue) {
      var noScroll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var preset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this._currentScaleValue = newValue.toString();

      if (_classPrivateMethodGet(this, _isSameScale, _isSameScale2).call(this, newScale)) {
        if (preset) {
          this.eventBus.dispatch("scalechanging", {
            source: this,
            scale: newScale,
            presetValue: newValue
          });
        }

        return;
      }

      this._doc.style.setProperty("--zoom-factor", newScale);

      this._doc.style.setProperty("--viewport-scale-factor", newScale * _pdf.PixelsPerInch.PDF_TO_CSS_UNITS);

      var updateArgs = {
        scale: newScale
      };

      var _iterator3 = _createForOfIteratorHelper(this._pages),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var pageView = _step3.value;
          pageView.update(updateArgs);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this._currentScale = newScale;

      if (!noScroll) {
        var page = this._currentPageNumber,
            dest;

        if (this._location && !(this.isInPresentationMode || this.isChangingPresentationMode)) {
          page = this._location.pageNumber;
          dest = [null, {
            name: "XYZ"
          }, this._location.left, this._location.top, null];
        }

        this.scrollPageIntoView({
          pageNumber: page,
          destArray: dest,
          allowNegativeOffset: true
        });
      }

      this.eventBus.dispatch("scalechanging", {
        source: this,
        scale: newScale,
        presetValue: preset ? newValue : undefined
      });

      if (this.defaultRenderingQueue) {
        this.update();
      }

      _classPrivateFieldSet(this, _previousContainerHeight, this.container.clientHeight);
    }
  }, {
    key: "_pageWidthScaleFactor",
    get: function get() {
      if (this._spreadMode !== _ui_utils.SpreadMode.NONE && this._scrollMode !== _ui_utils.ScrollMode.HORIZONTAL) {
        return 2;
      }

      return 1;
    }
  }, {
    key: "_setScale",
    value: function _setScale(value) {
      var noScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var scale = parseFloat(value);

      if (scale > 0) {
        this._setScaleUpdatePages(scale, value, noScroll, false);
      } else {
        var currentPage = this._pages[this._currentPageNumber - 1];

        if (!currentPage) {
          return;
        }

        var hPadding = _ui_utils.SCROLLBAR_PADDING,
            vPadding = _ui_utils.VERTICAL_PADDING;

        if (this.isInPresentationMode) {
          hPadding = vPadding = 4;
        } else if (this.removePageBorders) {
          hPadding = vPadding = 0;
        }

        if (this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL) {
          var _ref6 = [vPadding, hPadding];
          hPadding = _ref6[0];
          vPadding = _ref6[1];
        }

        var pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale / this._pageWidthScaleFactor;
        var pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;

        switch (value) {
          case "page-actual":
            scale = 1;
            break;

          case "page-width":
            scale = pageWidthScale;
            break;

          case "page-height":
            scale = pageHeightScale;
            break;

          case "page-fit":
            scale = Math.min(pageWidthScale, pageHeightScale);
            break;

          case "auto":
            var horizontalScale = (0, _ui_utils.isPortraitOrientation)(currentPage) ? pageWidthScale : Math.min(pageHeightScale, pageWidthScale);
            scale = Math.min(_ui_utils.MAX_AUTO_SCALE, horizontalScale);
            break;

          default:
            console.error("_setScale: \"".concat(value, "\" is an unknown zoom value."));
            return;
        }

        this._setScaleUpdatePages(scale, value, noScroll, true);
      }
    }
  }, {
    key: "_resetCurrentPageView",
    value: function _resetCurrentPageView() {
      if (this.isInPresentationMode) {
        this._setScale(this._currentScaleValue, true);
      }

      var pageView = this._pages[this._currentPageNumber - 1];

      this._scrollIntoView({
        pageDiv: pageView.div
      });
    }
  }, {
    key: "pageLabelToPageNumber",
    value: function pageLabelToPageNumber(label) {
      if (!this._pageLabels) {
        return null;
      }

      var i = this._pageLabels.indexOf(label);

      if (i < 0) {
        return null;
      }

      return i + 1;
    }
  }, {
    key: "scrollPageIntoView",
    value: function scrollPageIntoView(_ref7) {
      var pageNumber = _ref7.pageNumber,
          _ref7$destArray = _ref7.destArray,
          destArray = _ref7$destArray === void 0 ? null : _ref7$destArray,
          _ref7$allowNegativeOf = _ref7.allowNegativeOffset,
          allowNegativeOffset = _ref7$allowNegativeOf === void 0 ? false : _ref7$allowNegativeOf,
          _ref7$ignoreDestinati = _ref7.ignoreDestinationZoom,
          ignoreDestinationZoom = _ref7$ignoreDestinati === void 0 ? false : _ref7$ignoreDestinati;

      if (!this.pdfDocument) {
        return;
      }

      var pageView = Number.isInteger(pageNumber) && this._pages[pageNumber - 1];

      if (!pageView) {
        console.error("scrollPageIntoView: \"".concat(pageNumber, "\" is not a valid pageNumber parameter."));
        return;
      }

      if (this.isInPresentationMode || !destArray) {
        this._setCurrentPageNumber(pageNumber, true);

        return;
      }

      var x = 0,
          y = 0;
      var width = 0,
          height = 0,
          widthScale,
          heightScale;
      var changeOrientation = pageView.rotation % 180 !== 0;
      var pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / _pdf.PixelsPerInch.PDF_TO_CSS_UNITS;
      var pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / _pdf.PixelsPerInch.PDF_TO_CSS_UNITS;
      var scale = 0;

      switch (destArray[1].name) {
        case "XYZ":
          x = destArray[2];
          y = destArray[3];
          scale = destArray[4];
          x = x !== null ? x : 0;
          y = y !== null ? y : pageHeight;
          break;

        case "Fit":
        case "FitB":
          scale = "page-fit";
          break;

        case "FitH":
        case "FitBH":
          y = destArray[2];
          scale = "page-width";

          if (y === null && this._location) {
            x = this._location.left;
            y = this._location.top;
          } else if (typeof y !== "number" || y < 0) {
            y = pageHeight;
          }

          break;

        case "FitV":
        case "FitBV":
          x = destArray[2];
          width = pageWidth;
          height = pageHeight;
          scale = "page-height";
          break;

        case "FitR":
          x = destArray[2];
          y = destArray[3];
          width = destArray[4] - x;
          height = destArray[5] - y;
          var hPadding = this.removePageBorders ? 0 : _ui_utils.SCROLLBAR_PADDING;
          var vPadding = this.removePageBorders ? 0 : _ui_utils.VERTICAL_PADDING;
          widthScale = (this.container.clientWidth - hPadding) / width / _pdf.PixelsPerInch.PDF_TO_CSS_UNITS;
          heightScale = (this.container.clientHeight - vPadding) / height / _pdf.PixelsPerInch.PDF_TO_CSS_UNITS;
          scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
          break;

        default:
          console.error("scrollPageIntoView: \"".concat(destArray[1].name, "\" is not a valid destination type."));
          return;
      }

      if (!ignoreDestinationZoom) {
        if (scale && scale !== this._currentScale) {
          this.currentScaleValue = scale;
        } else if (this._currentScale === _ui_utils.UNKNOWN_SCALE) {
          this.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
        }
      }

      if (scale === "page-fit" && !destArray[4]) {
        this._scrollIntoView({
          pageDiv: pageView.div,
          pageNumber: pageNumber
        });

        return;
      }

      var boundingRect = [pageView.viewport.convertToViewportPoint(x, y), pageView.viewport.convertToViewportPoint(x + width, y + height)];
      var left = Math.min(boundingRect[0][0], boundingRect[1][0]);
      var top = Math.min(boundingRect[0][1], boundingRect[1][1]);

      if (!allowNegativeOffset) {
        left = Math.max(left, 0);
        top = Math.max(top, 0);
      }

      this._scrollIntoView({
        pageDiv: pageView.div,
        pageSpot: {
          left: left,
          top: top
        },
        pageNumber: pageNumber
      });
    }
  }, {
    key: "_updateLocation",
    value: function _updateLocation(firstPage) {
      var currentScale = this._currentScale;
      var currentScaleValue = this._currentScaleValue;
      var normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 10000) / 100 : currentScaleValue;
      var pageNumber = firstPage.id;
      var pdfOpenParams = "#page=" + pageNumber;
      pdfOpenParams += "&zoom=" + normalizedScaleValue;
      var currentPageView = this._pages[pageNumber - 1];
      var container = this.container;
      var topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
      var intLeft = Math.round(topLeft[0]);
      var intTop = Math.round(topLeft[1]);
      pdfOpenParams += "," + intLeft + "," + intTop;
      this._location = {
        pageNumber: pageNumber,
        scale: normalizedScaleValue,
        top: intTop,
        left: intLeft,
        rotation: this._pagesRotation,
        pdfOpenParams: pdfOpenParams
      };
    }
  }, {
    key: "update",
    value: function update() {
      var visible = this._getVisiblePages();

      var visiblePages = visible.views,
          numVisiblePages = visiblePages.length;

      if (numVisiblePages === 0) {
        return;
      }

      var newCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * numVisiblePages + 1);

      _classPrivateFieldGet(this, _buffer).resize(newCacheSize, visible.ids);

      this.renderingQueue.renderHighestPriority(visible);

      if (!this.isInPresentationMode) {
        var isSimpleLayout = this._spreadMode === _ui_utils.SpreadMode.NONE && (this._scrollMode === _ui_utils.ScrollMode.PAGE || this._scrollMode === _ui_utils.ScrollMode.VERTICAL);
        var currentId = this._currentPageNumber;
        var stillFullyVisible = false;

        var _iterator4 = _createForOfIteratorHelper(visiblePages),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var page = _step4.value;

            if (page.percent < 100) {
              break;
            }

            if (page.id === currentId && isSimpleLayout) {
              stillFullyVisible = true;
              break;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        if (!stillFullyVisible) {
          currentId = visiblePages[0].id;
        }

        this._setCurrentPageNumber(currentId);
      }

      this._updateLocation(visible.first);

      this.eventBus.dispatch("updateviewarea", {
        source: this,
        location: this._location
      });
    }
  }, {
    key: "containsElement",
    value: function containsElement(element) {
      return this.container.contains(element);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.container.focus();
    }
  }, {
    key: "_isContainerRtl",
    get: function get() {
      return getComputedStyle(this.container).direction === "rtl";
    }
  }, {
    key: "isInPresentationMode",
    get: function get() {
      return this.presentationModeState === _ui_utils.PresentationModeState.FULLSCREEN;
    }
  }, {
    key: "isChangingPresentationMode",
    get: function get() {
      return this.presentationModeState === _ui_utils.PresentationModeState.CHANGING;
    }
  }, {
    key: "isHorizontalScrollbarEnabled",
    get: function get() {
      return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
    }
  }, {
    key: "isVerticalScrollbarEnabled",
    get: function get() {
      return this.isInPresentationMode ? false : this.container.scrollHeight > this.container.clientHeight;
    }
  }, {
    key: "_getCurrentVisiblePage",
    value: function _getCurrentVisiblePage() {
      if (!this.pagesCount) {
        return {
          views: []
        };
      }

      var pageView = this._pages[this._currentPageNumber - 1];
      var element = pageView.div;
      var view = {
        id: pageView.id,
        x: element.offsetLeft + element.clientLeft,
        y: element.offsetTop + element.clientTop,
        view: pageView
      };
      var ids = new Set([pageView.id]);
      return {
        first: view,
        last: view,
        views: [view],
        ids: ids
      };
    }
  }, {
    key: "_getVisiblePages",
    value: function _getVisiblePages() {
      if (this.isInPresentationMode) {
        return this._getCurrentVisiblePage();
      }

      var views = this._scrollMode === _ui_utils.ScrollMode.PAGE ? _classPrivateFieldGet(this, _scrollModePageState).pages : this._pages,
          horizontal = this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL,
          rtl = horizontal && this._isContainerRtl;
      return (0, _ui_utils.getVisibleElements)({
        scrollEl: this.container,
        views: views,
        sortByVisibility: true,
        horizontal: horizontal,
        rtl: rtl
      });
    }
  }, {
    key: "isPageVisible",
    value: function isPageVisible(pageNumber) {
      if (!this.pdfDocument) {
        return false;
      }

      if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
        console.error("isPageVisible: \"".concat(pageNumber, "\" is not a valid page."));
        return false;
      }

      return this._getVisiblePages().ids.has(pageNumber);
    }
  }, {
    key: "isPageCached",
    value: function isPageCached(pageNumber) {
      if (!this.pdfDocument) {
        return false;
      }

      if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
        console.error("isPageCached: \"".concat(pageNumber, "\" is not a valid page."));
        return false;
      }

      var pageView = this._pages[pageNumber - 1];
      return _classPrivateFieldGet(this, _buffer).has(pageView);
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        if (this._pages[i] && this._pages[i].renderingState !== _ui_utils.RenderingStates.FINISHED) {
          this._pages[i].reset();
        }
      }
    }
  }, {
    key: "_cancelRendering",
    value: function _cancelRendering() {
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        if (this._pages[i]) {
          this._pages[i].cancelRendering();
        }
      }
    }
  }, {
    key: "forceRendering",
    value: function forceRendering(currentlyVisiblePages) {
      var _this3 = this;

      var visiblePages = currentlyVisiblePages || this._getVisiblePages();

      var scrollAhead = _classPrivateMethodGet(this, _getScrollAhead, _getScrollAhead2).call(this, visiblePages);

      var preRenderExtra = this._spreadMode !== _ui_utils.SpreadMode.NONE && this._scrollMode !== _ui_utils.ScrollMode.HORIZONTAL;
      var pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, scrollAhead, preRenderExtra);

      _classPrivateMethodGet(this, _toggleLoadingIconSpinner, _toggleLoadingIconSpinner2).call(this, visiblePages.ids);

      if (pageView) {
        _classPrivateMethodGet(this, _ensurePdfPageLoaded, _ensurePdfPageLoaded2).call(this, pageView).then(function () {
          _this3.renderingQueue.renderView(pageView);
        });

        return true;
      }

      return false;
    }
  }, {
    key: "createTextLayerBuilder",
    value: function createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
      var enhanceTextSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var eventBus = arguments.length > 4 ? arguments[4] : undefined;
      var highlighter = arguments.length > 5 ? arguments[5] : undefined;
      return new _text_layer_builder.TextLayerBuilder({
        textLayerDiv: textLayerDiv,
        eventBus: eventBus,
        pageIndex: pageIndex,
        viewport: viewport,
        enhanceTextSelection: this.isInPresentationMode ? false : enhanceTextSelection,
        highlighter: highlighter
      });
    }
  }, {
    key: "createTextHighlighter",
    value: function createTextHighlighter(pageIndex, eventBus) {
      return new _text_highlighter.TextHighlighter({
        eventBus: eventBus,
        pageIndex: pageIndex,
        findController: this.isInPresentationMode ? null : this.findController
      });
    }
  }, {
    key: "createAnnotationLayerBuilder",
    value: function createAnnotationLayerBuilder(pageDiv, pdfPage) {
      var _this$pdfDocument, _this$pdfDocument2, _this$pdfDocument3, _this$_scriptingManag;

      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var imageResourcesPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var renderForms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var l10n = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _l10n_utils.NullL10n;
      var enableScripting = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var hasJSActionsPromise = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var mouseState = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
      var fieldObjectsPromise = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
      var annotationCanvasMap = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
      return new _annotation_layer_builder.AnnotationLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        annotationStorage: annotationStorage || ((_this$pdfDocument = this.pdfDocument) === null || _this$pdfDocument === void 0 ? void 0 : _this$pdfDocument.annotationStorage),
        imageResourcesPath: imageResourcesPath,
        renderForms: renderForms,
        linkService: this.linkService,
        downloadManager: this.downloadManager,
        l10n: l10n,
        enableScripting: enableScripting !== null && enableScripting !== void 0 ? enableScripting : this.enableScripting,
        hasJSActionsPromise: hasJSActionsPromise || ((_this$pdfDocument2 = this.pdfDocument) === null || _this$pdfDocument2 === void 0 ? void 0 : _this$pdfDocument2.hasJSActions()),
        fieldObjectsPromise: fieldObjectsPromise || ((_this$pdfDocument3 = this.pdfDocument) === null || _this$pdfDocument3 === void 0 ? void 0 : _this$pdfDocument3.getFieldObjects()),
        mouseState: mouseState || ((_this$_scriptingManag = this._scriptingManager) === null || _this$_scriptingManag === void 0 ? void 0 : _this$_scriptingManag.mouseState),
        annotationCanvasMap: annotationCanvasMap
      });
    }
  }, {
    key: "createXfaLayerBuilder",
    value: function createXfaLayerBuilder(pageDiv, pdfPage) {
      var _this$pdfDocument4;

      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return new _xfa_layer_builder.XfaLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        annotationStorage: annotationStorage || ((_this$pdfDocument4 = this.pdfDocument) === null || _this$pdfDocument4 === void 0 ? void 0 : _this$pdfDocument4.annotationStorage),
        linkService: this.linkService
      });
    }
  }, {
    key: "createStructTreeLayerBuilder",
    value: function createStructTreeLayerBuilder(pdfPage) {
      return new _struct_tree_layer_builder.StructTreeLayerBuilder({
        pdfPage: pdfPage
      });
    }
  }, {
    key: "hasEqualPageSizes",
    get: function get() {
      var firstPageView = this._pages[0];

      for (var i = 1, ii = this._pages.length; i < ii; ++i) {
        var pageView = this._pages[i];

        if (pageView.width !== firstPageView.width || pageView.height !== firstPageView.height) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "getPagesOverview",
    value: function getPagesOverview() {
      var _this4 = this;

      return this._pages.map(function (pageView) {
        var viewport = pageView.pdfPage.getViewport({
          scale: 1
        });

        if (!_this4.enablePrintAutoRotate || (0, _ui_utils.isPortraitOrientation)(viewport)) {
          return {
            width: viewport.width,
            height: viewport.height,
            rotation: viewport.rotation
          };
        }

        return {
          width: viewport.height,
          height: viewport.width,
          rotation: (viewport.rotation - 90) % 360
        };
      });
    }
  }, {
    key: "optionalContentConfigPromise",
    get: function get() {
      if (!this.pdfDocument) {
        return Promise.resolve(null);
      }

      if (!this._optionalContentConfigPromise) {
        return this.pdfDocument.getOptionalContentConfig();
      }

      return this._optionalContentConfigPromise;
    },
    set: function set(promise) {
      if (!(promise instanceof Promise)) {
        throw new Error("Invalid optionalContentConfigPromise: ".concat(promise));
      }

      if (!this.pdfDocument) {
        return;
      }

      if (!this._optionalContentConfigPromise) {
        return;
      }

      this._optionalContentConfigPromise = promise;
      var updateArgs = {
        optionalContentConfigPromise: promise
      };

      var _iterator5 = _createForOfIteratorHelper(this._pages),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var pageView = _step5.value;
          pageView.update(updateArgs);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this.update();
      this.eventBus.dispatch("optionalcontentconfigchanged", {
        source: this,
        promise: promise
      });
    }
  }, {
    key: "scrollMode",
    get: function get() {
      return this._scrollMode;
    },
    set: function set(mode) {
      if (this._scrollMode === mode) {
        return;
      }

      if (!(0, _ui_utils.isValidScrollMode)(mode)) {
        throw new Error("Invalid scroll mode: ".concat(mode));
      }

      if (this.pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
        return;
      }

      this._previousScrollMode = this._scrollMode;
      this._scrollMode = mode;
      this.eventBus.dispatch("scrollmodechanged", {
        source: this,
        mode: mode
      });

      this._updateScrollMode(this._currentPageNumber);
    }
  }, {
    key: "_updateScrollMode",
    value: function _updateScrollMode() {
      var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var scrollMode = this._scrollMode,
          viewer = this.viewer;
      viewer.classList.toggle("scrollHorizontal", scrollMode === _ui_utils.ScrollMode.HORIZONTAL);
      viewer.classList.toggle("scrollWrapped", scrollMode === _ui_utils.ScrollMode.WRAPPED);

      if (!this.pdfDocument || !pageNumber) {
        return;
      }

      if (scrollMode === _ui_utils.ScrollMode.PAGE) {
        _classPrivateMethodGet(this, _ensurePageViewVisible, _ensurePageViewVisible2).call(this);
      } else if (this._previousScrollMode === _ui_utils.ScrollMode.PAGE) {
        this._updateSpreadMode();
      }

      if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
        this._setScale(this._currentScaleValue, true);
      }

      this._setCurrentPageNumber(pageNumber, true);

      this.update();
    }
  }, {
    key: "spreadMode",
    get: function get() {
      return this._spreadMode;
    },
    set: function set(mode) {
      if (this._spreadMode === mode) {
        return;
      }

      if (!(0, _ui_utils.isValidSpreadMode)(mode)) {
        throw new Error("Invalid spread mode: ".concat(mode));
      }

      this._spreadMode = mode;
      this.eventBus.dispatch("spreadmodechanged", {
        source: this,
        mode: mode
      });

      this._updateSpreadMode(this._currentPageNumber);
    }
  }, {
    key: "_updateSpreadMode",
    value: function _updateSpreadMode() {
      var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!this.pdfDocument) {
        return;
      }

      var viewer = this.viewer,
          pages = this._pages;

      if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
        _classPrivateMethodGet(this, _ensurePageViewVisible, _ensurePageViewVisible2).call(this);
      } else {
        viewer.textContent = "";

        if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
          for (var i = 0, ii = pages.length; i < ii; ++i) {
            viewer.appendChild(pages[i].div);
          }
        } else {
          var parity = this._spreadMode - 1;
          var spread = null;

          for (var _i2 = 0, _ii = pages.length; _i2 < _ii; ++_i2) {
            if (spread === null) {
              spread = document.createElement("div");
              spread.className = "spread";
              viewer.appendChild(spread);
            } else if (_i2 % 2 === parity) {
              spread = spread.cloneNode(false);
              viewer.appendChild(spread);
            }

            spread.appendChild(pages[_i2].div);
          }
        }
      }

      if (!pageNumber) {
        return;
      }

      if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
        this._setScale(this._currentScaleValue, true);
      }

      this._setCurrentPageNumber(pageNumber, true);

      this.update();
    }
  }, {
    key: "_getPageAdvance",
    value: function _getPageAdvance(currentPageNumber) {
      var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      switch (this._scrollMode) {
        case _ui_utils.ScrollMode.WRAPPED:
          {
            var _this$_getVisiblePage = this._getVisiblePages(),
                views = _this$_getVisiblePage.views,
                pageLayout = new Map();

            var _iterator6 = _createForOfIteratorHelper(views),
                _step6;

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var _step6$value = _step6.value,
                    id = _step6$value.id,
                    y = _step6$value.y,
                    percent = _step6$value.percent,
                    widthPercent = _step6$value.widthPercent;

                if (percent === 0 || widthPercent < 100) {
                  continue;
                }

                var yArray = pageLayout.get(y);

                if (!yArray) {
                  pageLayout.set(y, yArray || (yArray = []));
                }

                yArray.push(id);
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }

            var _iterator7 = _createForOfIteratorHelper(pageLayout.values()),
                _step7;

            try {
              for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                var _yArray = _step7.value;

                var currentIndex = _yArray.indexOf(currentPageNumber);

                if (currentIndex === -1) {
                  continue;
                }

                var numPages = _yArray.length;

                if (numPages === 1) {
                  break;
                }

                if (previous) {
                  for (var i = currentIndex - 1, ii = 0; i >= ii; i--) {
                    var currentId = _yArray[i],
                        expectedId = _yArray[i + 1] - 1;

                    if (currentId < expectedId) {
                      return currentPageNumber - expectedId;
                    }
                  }
                } else {
                  for (var _i3 = currentIndex + 1, _ii2 = numPages; _i3 < _ii2; _i3++) {
                    var _currentId = _yArray[_i3],
                        _expectedId = _yArray[_i3 - 1] + 1;

                    if (_currentId > _expectedId) {
                      return _expectedId - currentPageNumber;
                    }
                  }
                }

                if (previous) {
                  var firstId = _yArray[0];

                  if (firstId < currentPageNumber) {
                    return currentPageNumber - firstId + 1;
                  }
                } else {
                  var lastId = _yArray[numPages - 1];

                  if (lastId > currentPageNumber) {
                    return lastId - currentPageNumber + 1;
                  }
                }

                break;
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }

            break;
          }

        case _ui_utils.ScrollMode.HORIZONTAL:
          {
            break;
          }

        case _ui_utils.ScrollMode.PAGE:
        case _ui_utils.ScrollMode.VERTICAL:
          {
            if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
              break;
            }

            var parity = this._spreadMode - 1;

            if (previous && currentPageNumber % 2 !== parity) {
              break;
            } else if (!previous && currentPageNumber % 2 === parity) {
              break;
            }

            var _this$_getVisiblePage2 = this._getVisiblePages(),
                _views = _this$_getVisiblePage2.views,
                _expectedId2 = previous ? currentPageNumber - 1 : currentPageNumber + 1;

            var _iterator8 = _createForOfIteratorHelper(_views),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var _step8$value = _step8.value,
                    _id = _step8$value.id,
                    _percent = _step8$value.percent,
                    _widthPercent = _step8$value.widthPercent;

                if (_id !== _expectedId2) {
                  continue;
                }

                if (_percent > 0 && _widthPercent === 100) {
                  return 2;
                }

                break;
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }

            break;
          }
      }

      return 1;
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      var currentPageNumber = this._currentPageNumber,
          pagesCount = this.pagesCount;

      if (currentPageNumber >= pagesCount) {
        return false;
      }

      var advance = this._getPageAdvance(currentPageNumber, false) || 1;
      this.currentPageNumber = Math.min(currentPageNumber + advance, pagesCount);
      return true;
    }
  }, {
    key: "previousPage",
    value: function previousPage() {
      var currentPageNumber = this._currentPageNumber;

      if (currentPageNumber <= 1) {
        return false;
      }

      var advance = this._getPageAdvance(currentPageNumber, true) || 1;
      this.currentPageNumber = Math.max(currentPageNumber - advance, 1);
      return true;
    }
  }, {
    key: "increaseScale",
    value: function increaseScale() {
      var steps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var newScale = this._currentScale;

      do {
        newScale = (newScale * _ui_utils.DEFAULT_SCALE_DELTA).toFixed(2);
        newScale = Math.ceil(newScale * 10) / 10;
        newScale = Math.min(_ui_utils.MAX_SCALE, newScale);
      } while (--steps > 0 && newScale < _ui_utils.MAX_SCALE);

      this.currentScaleValue = newScale;
    }
  }, {
    key: "decreaseScale",
    value: function decreaseScale() {
      var steps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var newScale = this._currentScale;

      do {
        newScale = (newScale / _ui_utils.DEFAULT_SCALE_DELTA).toFixed(2);
        newScale = Math.floor(newScale * 10) / 10;
        newScale = Math.max(_ui_utils.MIN_SCALE, newScale);
      } while (--steps > 0 && newScale > _ui_utils.MIN_SCALE);

      this.currentScaleValue = newScale;
    }
  }]);

  return BaseViewer;
}();

exports.BaseViewer = BaseViewer;

function _initializePermissions2(permissions) {
  if (!permissions) {
    return;
  }

  if (!permissions.includes(_pdf.PermissionFlag.COPY)) {
    this.viewer.classList.add(ENABLE_PERMISSIONS_CLASS);
  }

  if (!permissions.includes(_pdf.PermissionFlag.MODIFY_ANNOTATIONS) && !permissions.includes(_pdf.PermissionFlag.FILL_INTERACTIVE_FORMS)) {
    if (_classPrivateFieldGet(this, _annotationMode) === _pdf.AnnotationMode.ENABLE_FORMS) {
      _classPrivateFieldSet(this, _previousAnnotationMode, _classPrivateFieldGet(this, _annotationMode));

      _classPrivateFieldSet(this, _annotationMode, _pdf.AnnotationMode.ENABLE);
    }
  }
}

function _onePageRenderedOrForceFetch2() {
  if (!this.container.offsetParent || this._getVisiblePages().views.length === 0) {
    return Promise.resolve();
  }

  return this._onePageRenderedCapability.promise;
}

function _ensurePageViewVisible2() {
  if (this._scrollMode !== _ui_utils.ScrollMode.PAGE) {
    throw new Error("#ensurePageViewVisible: Invalid scrollMode value.");
  }

  var pageNumber = this._currentPageNumber,
      state = _classPrivateFieldGet(this, _scrollModePageState),
      viewer = this.viewer;

  viewer.textContent = "";
  state.pages.length = 0;

  if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
    var pageView = this._pages[pageNumber - 1];

    if (this.isInPresentationMode) {
      var spread = document.createElement("div");
      spread.className = "spread";
      var dummyPage = document.createElement("div");
      dummyPage.className = "dummyPage";
      dummyPage.style.height = "".concat(this.container.clientHeight, "px");
      spread.appendChild(dummyPage);
      spread.appendChild(pageView.div);
      viewer.appendChild(spread);
    } else {
      viewer.appendChild(pageView.div);
    }

    state.pages.push(pageView);
  } else {
    var pageIndexSet = new Set(),
        parity = this._spreadMode - 1;

    if (pageNumber % 2 !== parity) {
      pageIndexSet.add(pageNumber - 1);
      pageIndexSet.add(pageNumber);
    } else {
      pageIndexSet.add(pageNumber - 2);
      pageIndexSet.add(pageNumber - 1);
    }

    var _spread = null;

    var _iterator9 = _createForOfIteratorHelper(pageIndexSet),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var i = _step9.value;
        var _pageView = this._pages[i];

        if (!_pageView) {
          continue;
        }

        if (_spread === null) {
          _spread = document.createElement("div");
          _spread.className = "spread";
          viewer.appendChild(_spread);
        } else if (i % 2 === parity) {
          _spread = _spread.cloneNode(false);
          viewer.appendChild(_spread);
        }

        _spread.appendChild(_pageView.div);

        state.pages.push(_pageView);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
  }

  state.scrollDown = pageNumber >= state.previousPageNumber;
  state.previousPageNumber = pageNumber;
}

function _isSameScale2(newScale) {
  if (this.isInPresentationMode && this.container.clientHeight !== _classPrivateFieldGet(this, _previousContainerHeight)) {
    return false;
  }

  return newScale === this._currentScale || Math.abs(newScale - this._currentScale) < 1e-15;
}

function _ensurePdfPageLoaded2(_x) {
  return _ensurePdfPageLoaded3.apply(this, arguments);
}

function _ensurePdfPageLoaded3() {
  _ensurePdfPageLoaded3 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(pageView) {
    var pdfPage;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!pageView.pdfPage) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", pageView.pdfPage);

          case 2:
            _context3.prev = 2;
            _context3.next = 5;
            return this.pdfDocument.getPage(pageView.id);

          case 5:
            pdfPage = _context3.sent;

            if (!pageView.pdfPage) {
              pageView.setPdfPage(pdfPage);
            }

            if (!this.linkService._cachedPageNumber(pdfPage.ref)) {
              this.linkService.cachePageRef(pageView.id, pdfPage.ref);
            }

            return _context3.abrupt("return", pdfPage);

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](2);
            console.error("Unable to get page for page view", _context3.t0);
            return _context3.abrupt("return", null);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, this, [[2, 11]]);
  }));
  return _ensurePdfPageLoaded3.apply(this, arguments);
}

function _getScrollAhead2(visible) {
  var _visible$first, _visible$last;

  if (((_visible$first = visible.first) === null || _visible$first === void 0 ? void 0 : _visible$first.id) === 1) {
    return true;
  } else if (((_visible$last = visible.last) === null || _visible$last === void 0 ? void 0 : _visible$last.id) === this.pagesCount) {
    return false;
  }

  switch (this._scrollMode) {
    case _ui_utils.ScrollMode.PAGE:
      return _classPrivateFieldGet(this, _scrollModePageState).scrollDown;

    case _ui_utils.ScrollMode.HORIZONTAL:
      return this.scroll.right;
  }

  return this.scroll.down;
}

function _toggleLoadingIconSpinner2(visibleIds) {
  var _iterator10 = _createForOfIteratorHelper(visibleIds),
      _step10;

  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var id = _step10.value;
      var pageView = this._pages[id - 1];
      pageView === null || pageView === void 0 ? void 0 : pageView.toggleLoadingIconSpinner(true);
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }

  var _iterator11 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _buffer)),
      _step11;

  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var _pageView2 = _step11.value;

      if (visibleIds.has(_pageView2.id)) {
        continue;
      }

      _pageView2.toggleLoadingIconSpinner(false);
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
}