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
exports.PDFViewerApplication = exports.PDFPrintServiceFactory = exports.DefaultExternalServices = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _ui_utils = require("./ui_utils.js");

var _app_options = require("./app_options.js");

var _event_utils = require("./event_utils.js");

var _pdf = require("../pdf");

var _pdf_cursor_tools = require("./pdf_cursor_tools.js");

var _overlay_manager = require("./overlay_manager.js");

var _password_prompt = require("./password_prompt.js");

var _pdf_attachment_viewer = require("./pdf_attachment_viewer.js");

var _pdf_document_properties = require("./pdf_document_properties.js");

var _pdf_find_bar = require("./pdf_find_bar.js");

var _pdf_find_controller = require("./pdf_find_controller.js");

var _pdf_history = require("./pdf_history.js");

var _pdf_layer_viewer = require("./pdf_layer_viewer.js");

var _pdf_link_service = require("./pdf_link_service.js");

var _pdf_outline_viewer = require("./pdf_outline_viewer.js");

var _pdf_presentation_mode = require("./pdf_presentation_mode.js");

var _pdf_rendering_queue = require("./pdf_rendering_queue.js");

var _pdf_scripting_manager = require("./pdf_scripting_manager.js");

var _pdf_sidebar = require("./pdf_sidebar.js");

var _pdf_sidebar_resizer = require("./pdf_sidebar_resizer.js");

var _pdf_thumbnail_viewer = require("./pdf_thumbnail_viewer.js");

var _pdf_viewer = require("./pdf_viewer.js");

var _secondary_toolbar = require("./secondary_toolbar.js");

var _toolbar = require("./toolbar.js");

var _view_history = require("./view_history.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
var FORCE_PAGES_LOADED_TIMEOUT = 10000;
var WHEEL_ZOOM_DISABLED_TIMEOUT = 1000;
var ViewOnLoad = {
  UNKNOWN: -1,
  PREVIOUS: 0,
  INITIAL: 1
};
var ViewerCssTheme = {
  AUTOMATIC: 0,
  LIGHT: 1,
  DARK: 2
};
var KNOWN_VERSIONS = ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0", "2.1", "2.2", "2.3"];
var KNOWN_GENERATORS = ["acrobat distiller", "acrobat pdfwriter", "adobe livecycle", "adobe pdf library", "adobe photoshop", "ghostscript", "tcpdf", "cairo", "dvipdfm", "dvips", "pdftex", "pdfkit", "itext", "prince", "quarkxpress", "mac os x", "microsoft", "openoffice", "oracle", "luradocument", "pdf-xchange", "antenna house", "aspose.cells", "fpdf"];

var DefaultExternalServices = /*#__PURE__*/function () {
  function DefaultExternalServices() {
    _classCallCheck(this, DefaultExternalServices);

    throw new Error("Cannot initialize DefaultExternalServices.");
  }

  _createClass(DefaultExternalServices, null, [{
    key: "updateFindControlState",
    value: function updateFindControlState(data) {}
  }, {
    key: "updateFindMatchesCount",
    value: function updateFindMatchesCount(data) {}
  }, {
    key: "initPassiveLoading",
    value: function initPassiveLoading(callbacks) {}
  }, {
    key: "fallback",
    value: function () {
      var _fallback = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function fallback(_x) {
        return _fallback.apply(this, arguments);
      }

      return fallback;
    }()
  }, {
    key: "reportTelemetry",
    value: function reportTelemetry(data) {}
  }, {
    key: "createDownloadManager",
    value: function createDownloadManager(options) {
      throw new Error("Not implemented: createDownloadManager");
    }
  }, {
    key: "createPreferences",
    value: function createPreferences() {
      throw new Error("Not implemented: createPreferences");
    }
  }, {
    key: "createL10n",
    value: function createL10n(options) {
      throw new Error("Not implemented: createL10n");
    }
  }, {
    key: "createScripting",
    value: function createScripting(options) {
      throw new Error("Not implemented: createScripting");
    }
  }, {
    key: "supportsIntegratedFind",
    get: function get() {
      return (0, _pdf.shadow)(this, "supportsIntegratedFind", false);
    }
  }, {
    key: "supportsDocumentFonts",
    get: function get() {
      return (0, _pdf.shadow)(this, "supportsDocumentFonts", true);
    }
  }, {
    key: "supportedMouseWheelZoomModifierKeys",
    get: function get() {
      return (0, _pdf.shadow)(this, "supportedMouseWheelZoomModifierKeys", {
        ctrlKey: true,
        metaKey: true
      });
    }
  }, {
    key: "isInAutomation",
    get: function get() {
      return (0, _pdf.shadow)(this, "isInAutomation", false);
    }
  }]);

  return DefaultExternalServices;
}();

exports.DefaultExternalServices = DefaultExternalServices;
var PDFViewerApplication = {
  initialBookmark: document.location.hash.substring(1),
  _initializedCapability: (0, _pdf.createPromiseCapability)(),
  _fellback: false,
  appConfig: null,
  pdfDocument: null,
  pdfLoadingTask: null,
  printService: null,
  pdfViewer: null,
  pdfThumbnailViewer: null,
  pdfRenderingQueue: null,
  pdfPresentationMode: null,
  pdfDocumentProperties: null,
  pdfLinkService: null,
  pdfHistory: null,
  pdfSidebar: null,
  pdfSidebarResizer: null,
  pdfOutlineViewer: null,
  pdfAttachmentViewer: null,
  pdfLayerViewer: null,
  pdfCursorTools: null,
  pdfScriptingManager: null,
  store: null,
  downloadManager: null,
  overlayManager: null,
  preferences: null,
  toolbar: null,
  secondaryToolbar: null,
  eventBus: null,
  l10n: null,
  isInitialViewSet: false,
  downloadComplete: false,
  isViewerEmbedded: window.parent !== window,
  url: "",
  baseUrl: "",
  _downloadUrl: "",
  externalServices: DefaultExternalServices,
  _boundEvents: Object.create(null),
  documentInfo: null,
  metadata: null,
  _contentDispositionFilename: null,
  _contentLength: null,
  _saveInProgress: false,
  _docStats: null,
  _wheelUnusedTicks: 0,
  _idleCallbacks: new Set(),
  initialize: function initialize(appConfig) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var appContainer;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.preferences = _this.externalServices.createPreferences();
              _this.appConfig = appConfig;
              _context2.next = 4;
              return _this._readPreferences();

            case 4:
              _context2.next = 6;
              return _this._parseHashParameters();

            case 6:
              _this._forceCssTheme();

              _context2.next = 9;
              return _this._initializeL10n();

            case 9:
              if (_this.isViewerEmbedded && _app_options.AppOptions.get("externalLinkTarget") === _pdf.LinkTarget.NONE) {
                _app_options.AppOptions.set("externalLinkTarget", _pdf.LinkTarget.TOP);
              }

              _context2.next = 12;
              return _this._initializeViewerComponents();

            case 12:
              _this.bindEvents();

              _this.bindWindowEvents();

              appContainer = appConfig.appContainer || document.documentElement;

              _this.l10n.translate(appContainer).then(function () {
                _this.eventBus.dispatch("localized", {
                  source: _this
                });
              });

              _this._initializedCapability.resolve();

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  _readPreferences: function _readPreferences() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!_app_options.AppOptions.get("disablePreferences")) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              if (_app_options.AppOptions._hasUserOptions()) {
                console.warn("_readPreferences: The Preferences may override manually set AppOptions; " + 'please use the "disablePreferences"-option in order to prevent that.');
              }

              _context3.prev = 3;
              _context3.t0 = _app_options.AppOptions;
              _context3.next = 7;
              return _this2.preferences.getAll();

            case 7:
              _context3.t1 = _context3.sent;

              _context3.t0.setAll.call(_context3.t0, _context3.t1);

              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t2 = _context3["catch"](3);
              console.error("_readPreferences: \"".concat(_context3.t2 === null || _context3.t2 === void 0 ? void 0 : _context3.t2.message, "\"."));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 11]]);
    }))();
  },
  _parseHashParameters: function _parseHashParameters() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var hash, params, waitOn, viewer, enabled;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (_app_options.AppOptions.get("pdfBugEnabled")) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return");

            case 2:
              hash = document.location.hash.substring(1);

              if (hash) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return");

            case 5:
              params = (0, _ui_utils.parseQueryString)(hash), waitOn = [];

              if (params.get("disableworker") === "true") {
                waitOn.push(loadFakeWorker());
              }

              if (params.has("disablerange")) {
                _app_options.AppOptions.set("disableRange", params.get("disablerange") === "true");
              }

              if (params.has("disablestream")) {
                _app_options.AppOptions.set("disableStream", params.get("disablestream") === "true");
              }

              if (params.has("disableautofetch")) {
                _app_options.AppOptions.set("disableAutoFetch", params.get("disableautofetch") === "true");
              }

              if (params.has("disablefontface")) {
                _app_options.AppOptions.set("disableFontFace", params.get("disablefontface") === "true");
              }

              if (params.has("disablehistory")) {
                _app_options.AppOptions.set("disableHistory", params.get("disablehistory") === "true");
              }

              if (params.has("verbosity")) {
                _app_options.AppOptions.set("verbosity", params.get("verbosity") | 0);
              }

              if (!params.has("textlayer")) {
                _context4.next = 22;
                break;
              }

              _context4.t0 = params.get("textlayer");
              _context4.next = _context4.t0 === "off" ? 17 : _context4.t0 === "visible" ? 19 : _context4.t0 === "shadow" ? 19 : _context4.t0 === "hover" ? 19 : 22;
              break;

            case 17:
              _app_options.AppOptions.set("textLayerMode", _ui_utils.TextLayerMode.DISABLE);

              return _context4.abrupt("break", 22);

            case 19:
              viewer = _this3.appConfig.viewerContainer;
              viewer.classList.add("textLayer-".concat(params.get("textlayer")));
              return _context4.abrupt("break", 22);

            case 22:
              if (params.has("pdfbug")) {
                _app_options.AppOptions.set("pdfBug", true);

                _app_options.AppOptions.set("fontExtraProperties", true);

                enabled = params.get("pdfbug").split(",");
                waitOn.push(initPDFBug(enabled));
              }

              if (params.has("locale")) {
                _app_options.AppOptions.set("locale", params.get("locale"));
              }

              if (!(waitOn.length === 0)) {
                _context4.next = 26;
                break;
              }

              return _context4.abrupt("return");

            case 26:
              _context4.prev = 26;
              _context4.next = 29;
              return Promise.all(waitOn);

            case 29:
              _context4.next = 34;
              break;

            case 31:
              _context4.prev = 31;
              _context4.t1 = _context4["catch"](26);
              console.error("_parseHashParameters: \"".concat(_context4.t1.message, "\"."));

            case 34:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[26, 31]]);
    }))();
  },
  _initializeL10n: function _initializeL10n() {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var dir;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this4.l10n = _this4.externalServices.createL10n({
                locale: _app_options.AppOptions.get("locale")
              });
              _context5.next = 3;
              return _this4.l10n.getDirection();

            case 3:
              dir = _context5.sent;
              document.getElementsByTagName("html")[0].dir = dir;

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  _forceCssTheme: function _forceCssTheme() {
    var cssTheme = _app_options.AppOptions.get("viewerCssTheme");

    if (cssTheme === ViewerCssTheme.AUTOMATIC || !Object.values(ViewerCssTheme).includes(cssTheme)) {
      return;
    }

    try {
      var styleSheet = document.styleSheets[0];
      var cssRules = (styleSheet === null || styleSheet === void 0 ? void 0 : styleSheet.cssRules) || [];

      for (var i = 0, ii = cssRules.length; i < ii; i++) {
        var _rule$media;

        var rule = cssRules[i];

        if (rule instanceof CSSMediaRule && ((_rule$media = rule.media) === null || _rule$media === void 0 ? void 0 : _rule$media[0]) === "(prefers-color-scheme: dark)") {
          if (cssTheme === ViewerCssTheme.LIGHT) {
            styleSheet.deleteRule(i);
            return;
          }

          var darkRules = /^@media \(prefers-color-scheme: dark\) {\n\s*([\w\s-.,:;/\\{}()]+)\n}$/.exec(rule.cssText);

          if (darkRules !== null && darkRules !== void 0 && darkRules[1]) {
            styleSheet.deleteRule(i);
            styleSheet.insertRule(darkRules[1], i);
          }

          return;
        }
      }
    } catch (reason) {
      console.error("_forceCssTheme: \"".concat(reason === null || reason === void 0 ? void 0 : reason.message, "\"."));
    }
  },
  _initializeViewerComponents: function _initializeViewerComponents() {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var appConfig, externalServices, eventBus, pdfRenderingQueue, pdfLinkService, downloadManager, findController, pdfScriptingManager, container, viewer;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              appConfig = _this5.appConfig, externalServices = _this5.externalServices;

              if (appConfig.eventBus) {
                eventBus = appConfig.eventBus;
              } else if (externalServices.isInAutomation) {
                eventBus = new _event_utils.AutomationEventBus();
              } else {
                eventBus = new _event_utils.EventBus();
              }

              _this5.eventBus = eventBus;
              _this5.overlayManager = new _overlay_manager.OverlayManager();
              pdfRenderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
              pdfRenderingQueue.onIdle = _this5._cleanup.bind(_this5);
              _this5.pdfRenderingQueue = pdfRenderingQueue;
              pdfLinkService = new _pdf_link_service.PDFLinkService({
                eventBus: eventBus,
                externalLinkTarget: _app_options.AppOptions.get("externalLinkTarget"),
                externalLinkRel: _app_options.AppOptions.get("externalLinkRel"),
                ignoreDestinationZoom: _app_options.AppOptions.get("ignoreDestinationZoom")
              });
              _this5.pdfLinkService = pdfLinkService;
              downloadManager = externalServices.createDownloadManager();
              _this5.downloadManager = downloadManager;
              findController = new _pdf_find_controller.PDFFindController({
                linkService: pdfLinkService,
                eventBus: eventBus
              });
              _this5.findController = findController;
              pdfScriptingManager = new _pdf_scripting_manager.PDFScriptingManager({
                eventBus: eventBus,
                sandboxBundleSrc: _app_options.AppOptions.get("sandboxBundleSrc"),
                scriptingFactory: externalServices,
                docPropertiesLookup: _this5._scriptingDocProperties.bind(_this5)
              });
              _this5.pdfScriptingManager = pdfScriptingManager;
              container = appConfig.mainContainer;
              viewer = appConfig.viewerContainer;
              _this5.pdfViewer = new _pdf_viewer.PDFViewer({
                container: container,
                viewer: viewer,
                eventBus: eventBus,
                renderingQueue: pdfRenderingQueue,
                linkService: pdfLinkService,
                downloadManager: downloadManager,
                findController: findController,
                scriptingManager: _app_options.AppOptions.get("enableScripting") && pdfScriptingManager,
                renderer: _app_options.AppOptions.get("renderer"),
                l10n: _this5.l10n,
                textLayerMode: _app_options.AppOptions.get("textLayerMode"),
                annotationMode: _app_options.AppOptions.get("annotationMode"),
                imageResourcesPath: _app_options.AppOptions.get("imageResourcesPath"),
                enablePrintAutoRotate: _app_options.AppOptions.get("enablePrintAutoRotate"),
                useOnlyCssZoom: _app_options.AppOptions.get("useOnlyCssZoom"),
                maxCanvasPixels: _app_options.AppOptions.get("maxCanvasPixels"),
                enablePermissions: _app_options.AppOptions.get("enablePermissions")
              });
              pdfRenderingQueue.setViewer(_this5.pdfViewer);
              pdfLinkService.setViewer(_this5.pdfViewer);
              pdfScriptingManager.setViewer(_this5.pdfViewer);
              _this5.pdfThumbnailViewer = new _pdf_thumbnail_viewer.PDFThumbnailViewer({
                container: appConfig.sidebar.thumbnailView,
                eventBus: eventBus,
                renderingQueue: pdfRenderingQueue,
                linkService: pdfLinkService,
                l10n: _this5.l10n
              });
              pdfRenderingQueue.setThumbnailViewer(_this5.pdfThumbnailViewer);

              if (!_this5.isViewerEmbedded && !_app_options.AppOptions.get("disableHistory")) {
                _this5.pdfHistory = new _pdf_history.PDFHistory({
                  linkService: pdfLinkService,
                  eventBus: eventBus
                });
                pdfLinkService.setHistory(_this5.pdfHistory);
              }

              if (!_this5.supportsIntegratedFind) {
                _this5.findBar = new _pdf_find_bar.PDFFindBar(appConfig.findBar, eventBus, _this5.l10n);
              }

              _this5.pdfDocumentProperties = new _pdf_document_properties.PDFDocumentProperties(appConfig.documentProperties, _this5.overlayManager, eventBus, _this5.l10n);
              _this5.pdfCursorTools = new _pdf_cursor_tools.PDFCursorTools({
                container: container,
                eventBus: eventBus,
                cursorToolOnLoad: _app_options.AppOptions.get("cursorToolOnLoad")
              });
              _this5.toolbar = new _toolbar.Toolbar(appConfig.toolbar, eventBus, _this5.l10n);
              _this5.secondaryToolbar = new _secondary_toolbar.SecondaryToolbar(appConfig.secondaryToolbar, container, eventBus);

              if (_this5.supportsFullscreen) {
                _this5.pdfPresentationMode = new _pdf_presentation_mode.PDFPresentationMode({
                  container: container,
                  pdfViewer: _this5.pdfViewer,
                  eventBus: eventBus
                });
              }

              _this5.passwordPrompt = new _password_prompt.PasswordPrompt(appConfig.passwordOverlay, _this5.overlayManager, _this5.l10n, _this5.isViewerEmbedded);
              _this5.pdfOutlineViewer = new _pdf_outline_viewer.PDFOutlineViewer({
                container: appConfig.sidebar.outlineView,
                eventBus: eventBus,
                linkService: pdfLinkService
              });
              _this5.pdfAttachmentViewer = new _pdf_attachment_viewer.PDFAttachmentViewer({
                container: appConfig.sidebar.attachmentsView,
                eventBus: eventBus,
                downloadManager: downloadManager
              });
              _this5.pdfLayerViewer = new _pdf_layer_viewer.PDFLayerViewer({
                container: appConfig.sidebar.layersView,
                eventBus: eventBus,
                l10n: _this5.l10n
              });
              _this5.pdfSidebar = new _pdf_sidebar.PDFSidebar({
                elements: appConfig.sidebar,
                pdfViewer: _this5.pdfViewer,
                pdfThumbnailViewer: _this5.pdfThumbnailViewer,
                eventBus: eventBus,
                l10n: _this5.l10n
              });
              _this5.pdfSidebar.onToggled = _this5.forceRendering.bind(_this5);
              _this5.pdfSidebarResizer = new _pdf_sidebar_resizer.PDFSidebarResizer(appConfig.sidebarResizer, eventBus, _this5.l10n);

            case 37:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  run: function run(config) {
    this.initialize(config).then(webViewerInitialized);
  },

  get initialized() {
    return this._initializedCapability.settled;
  },

  get initializedPromise() {
    return this._initializedCapability.promise;
  },

  zoomIn: function zoomIn(steps) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    this.pdfViewer.increaseScale(steps);
  },
  zoomOut: function zoomOut(steps) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    this.pdfViewer.decreaseScale(steps);
  },
  zoomReset: function zoomReset() {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
  },

  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  },

  get page() {
    return this.pdfViewer.currentPageNumber;
  },

  set page(val) {
    this.pdfViewer.currentPageNumber = val;
  },

  get supportsPrinting() {
    return PDFPrintServiceFactory.instance.supportsPrinting;
  },

  get supportsFullscreen() {
    return (0, _pdf.shadow)(this, "supportsFullscreen", document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled);
  },

  get supportsIntegratedFind() {
    return this.externalServices.supportsIntegratedFind;
  },

  get supportsDocumentFonts() {
    return this.externalServices.supportsDocumentFonts;
  },

  get loadingBar() {
    var bar = new _ui_utils.ProgressBar("#loadingBar");
    return (0, _pdf.shadow)(this, "loadingBar", bar);
  },

  get supportedMouseWheelZoomModifierKeys() {
    return this.externalServices.supportedMouseWheelZoomModifierKeys;
  },

  initPassiveLoading: function initPassiveLoading() {
    throw new Error("Not implemented: initPassiveLoading");
  },
  setTitleUsingUrl: function setTitleUsingUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var downloadUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    this.url = url;
    this.baseUrl = url.split("#")[0];

    if (downloadUrl) {
      this._downloadUrl = downloadUrl === url ? this.baseUrl : downloadUrl.split("#")[0];
    }

    var title = (0, _pdf.getPdfFilenameFromUrl)(url, "");

    if (!title) {
      try {
        title = decodeURIComponent((0, _pdf.getFilenameFromUrl)(url)) || url;
      } catch (ex) {
        title = url;
      }
    }

    this.setTitle(title);
  },
  setTitle: function setTitle(title) {
    if (this.isViewerEmbedded) {
      return;
    }

    document.title = title;
  },

  get _docFilename() {
    return this._contentDispositionFilename || (0, _pdf.getPdfFilenameFromUrl)(this.url);
  },

  _hideViewBookmark: function _hideViewBookmark() {
    var _this$appConfig = this.appConfig,
        toolbar = _this$appConfig.toolbar,
        secondaryToolbar = _this$appConfig.secondaryToolbar;
    toolbar.viewBookmark.hidden = true;
    secondaryToolbar.viewBookmarkButton.hidden = true;
  },
  _cancelIdleCallbacks: function _cancelIdleCallbacks() {
    if (!this._idleCallbacks.size) {
      return;
    }

    var _iterator = _createForOfIteratorHelper(this._idleCallbacks),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var callback = _step.value;
        window.cancelIdleCallback(callback);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this._idleCallbacks.clear();
  },
  close: function close() {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _this6$pdfDocument, _this6$pdfHistory, _this6$findBar;

      var container, promises;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _this6._unblockDocumentLoadEvent();

              _this6._hideViewBookmark();

              container = _this6.appConfig.errorWrapper.container;
              container.hidden = true;

              if (_this6.pdfLoadingTask) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return");

            case 6:
              if (!(((_this6$pdfDocument = _this6.pdfDocument) === null || _this6$pdfDocument === void 0 ? void 0 : _this6$pdfDocument.annotationStorage.size) > 0 && _this6._annotationStorageModified)) {
                _context7.next = 14;
                break;
              }

              _context7.prev = 7;
              _context7.next = 10;
              return _this6.save({
                sourceEventType: "save"
              });

            case 10:
              _context7.next = 14;
              break;

            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](7);

            case 14:
              promises = [];
              promises.push(_this6.pdfLoadingTask.destroy());
              _this6.pdfLoadingTask = null;

              if (_this6.pdfDocument) {
                _this6.pdfDocument = null;

                _this6.pdfThumbnailViewer.setDocument(null);

                _this6.pdfViewer.setDocument(null);

                _this6.pdfLinkService.setDocument(null);

                _this6.pdfDocumentProperties.setDocument(null);
              }

              _this6.pdfLinkService.externalLinkEnabled = true;
              _this6._fellback = false;
              _this6.store = null;
              _this6.isInitialViewSet = false;
              _this6.downloadComplete = false;
              _this6.url = "";
              _this6.baseUrl = "";
              _this6._downloadUrl = "";
              _this6.documentInfo = null;
              _this6.metadata = null;
              _this6._contentDispositionFilename = null;
              _this6._contentLength = null;
              _this6._saveInProgress = false;
              _this6._docStats = null;

              _this6._cancelIdleCallbacks();

              promises.push(_this6.pdfScriptingManager.destroyPromise);

              _this6.pdfSidebar.reset();

              _this6.pdfOutlineViewer.reset();

              _this6.pdfAttachmentViewer.reset();

              _this6.pdfLayerViewer.reset();

              (_this6$pdfHistory = _this6.pdfHistory) === null || _this6$pdfHistory === void 0 ? void 0 : _this6$pdfHistory.reset();
              (_this6$findBar = _this6.findBar) === null || _this6$findBar === void 0 ? void 0 : _this6$findBar.reset();

              _this6.toolbar.reset();

              _this6.secondaryToolbar.reset();

              if (typeof PDFBug !== "undefined") {
                PDFBug.cleanup();
              }

              _context7.next = 45;
              return Promise.all(promises);

            case 45:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[7, 12]]);
    }))();
  },
  open: function open(file, args) {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var workerParameters, key, parameters, apiParameters, _key, value, _key2, loadingTask;

      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!_this7.pdfLoadingTask) {
                _context8.next = 3;
                break;
              }

              _context8.next = 3;
              return _this7.close();

            case 3:
              workerParameters = _app_options.AppOptions.getAll(_app_options.OptionKind.WORKER);

              for (key in workerParameters) {
                _pdf.GlobalWorkerOptions[key] = workerParameters[key];
              }

              parameters = Object.create(null);

              if (typeof file === "string") {
                _this7.setTitleUsingUrl(file, file);

                parameters.url = file;
              } else if (file && "byteLength" in file) {
                parameters.data = file;
              } else if (file.url && file.originalUrl) {
                _this7.setTitleUsingUrl(file.originalUrl, file.url);

                parameters.url = file.url;
              }

              apiParameters = _app_options.AppOptions.getAll(_app_options.OptionKind.API);

              for (_key in apiParameters) {
                value = apiParameters[_key];

                if (_key === "docBaseUrl" && !value) {}

                parameters[_key] = value;
              }

              if (args) {
                for (_key2 in args) {
                  parameters[_key2] = args[_key2];
                }
              }

              loadingTask = (0, _pdf.getDocument)(parameters);
              _this7.pdfLoadingTask = loadingTask;

              loadingTask.onPassword = function (updateCallback, reason) {
                _this7.pdfLinkService.externalLinkEnabled = false;

                _this7.passwordPrompt.setUpdateCallback(updateCallback, reason);

                _this7.passwordPrompt.open();
              };

              loadingTask.onProgress = function (_ref) {
                var loaded = _ref.loaded,
                    total = _ref.total;

                _this7.progress(loaded / total);
              };

              loadingTask.onUnsupportedFeature = _this7.fallback.bind(_this7);
              return _context8.abrupt("return", loadingTask.promise.then(function (pdfDocument) {
                _this7.load(pdfDocument);
              }, function (reason) {
                if (loadingTask !== _this7.pdfLoadingTask) {
                  return undefined;
                }

                var key = "loading_error";

                if (reason instanceof _pdf.InvalidPDFException) {
                  key = "invalid_file_error";
                } else if (reason instanceof _pdf.MissingPDFException) {
                  key = "missing_file_error";
                } else if (reason instanceof _pdf.UnexpectedResponseException) {
                  key = "unexpected_response_error";
                }

                return _this7.l10n.get(key).then(function (msg) {
                  _this7._documentError(msg, {
                    message: reason === null || reason === void 0 ? void 0 : reason.message
                  });

                  throw reason;
                });
              }));

            case 16:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  _ensureDownloadComplete: function _ensureDownloadComplete() {
    if (this.pdfDocument && this.downloadComplete) {
      return;
    }

    throw new Error("PDF document not downloaded.");
  },
  download: function download() {
    var _arguments = arguments,
        _this8 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var _ref2, _ref2$sourceEventType, sourceEventType, url, filename, data, blob;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _ref2 = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {}, _ref2$sourceEventType = _ref2.sourceEventType, sourceEventType = _ref2$sourceEventType === void 0 ? "download" : _ref2$sourceEventType;
              url = _this8._downloadUrl, filename = _this8._docFilename;
              _context9.prev = 2;

              _this8._ensureDownloadComplete();

              _context9.next = 6;
              return _this8.pdfDocument.getData();

            case 6:
              data = _context9.sent;
              blob = new Blob([data], {
                type: "application/pdf"
              });
              _context9.next = 10;
              return _this8.downloadManager.download(blob, url, filename, sourceEventType);

            case 10:
              _context9.next = 16;
              break;

            case 12:
              _context9.prev = 12;
              _context9.t0 = _context9["catch"](2);
              _context9.next = 16;
              return _this8.downloadManager.downloadUrl(url, filename);

            case 16:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[2, 12]]);
    }))();
  },
  save: function save() {
    var _arguments2 = arguments,
        _this9 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var _ref3, _ref3$sourceEventType, sourceEventType, url, filename, data, blob;

      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _ref3 = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {}, _ref3$sourceEventType = _ref3.sourceEventType, sourceEventType = _ref3$sourceEventType === void 0 ? "download" : _ref3$sourceEventType;

              if (!_this9._saveInProgress) {
                _context10.next = 3;
                break;
              }

              return _context10.abrupt("return");

            case 3:
              _this9._saveInProgress = true;
              _context10.next = 6;
              return _this9.pdfScriptingManager.dispatchWillSave();

            case 6:
              url = _this9._downloadUrl, filename = _this9._docFilename;
              _context10.prev = 7;

              _this9._ensureDownloadComplete();

              _context10.next = 11;
              return _this9.pdfDocument.saveDocument();

            case 11:
              data = _context10.sent;
              blob = new Blob([data], {
                type: "application/pdf"
              });
              _context10.next = 15;
              return _this9.downloadManager.download(blob, url, filename, sourceEventType);

            case 15:
              _context10.next = 22;
              break;

            case 17:
              _context10.prev = 17;
              _context10.t0 = _context10["catch"](7);
              console.error("Error when saving the document: ".concat(_context10.t0.message));
              _context10.next = 22;
              return _this9.download({
                sourceEventType: sourceEventType
              });

            case 22:
              _context10.prev = 22;
              _context10.next = 25;
              return _this9.pdfScriptingManager.dispatchDidSave();

            case 25:
              _this9._saveInProgress = false;
              return _context10.finish(22);

            case 27:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[7, 17, 22, 27]]);
    }))();
  },
  downloadOrSave: function downloadOrSave(options) {
    var _this$pdfDocument;

    if (((_this$pdfDocument = this.pdfDocument) === null || _this$pdfDocument === void 0 ? void 0 : _this$pdfDocument.annotationStorage.size) > 0) {
      this.save(options);
    } else {
      this.download(options);
    }
  },
  fallback: function fallback(featureId) {
    var _this10 = this;

    this.externalServices.reportTelemetry({
      type: "unsupportedFeature",
      featureId: featureId
    });

    if (this._fellback) {
      return;
    }

    this._fellback = true;
    this.externalServices.fallback({
      featureId: featureId,
      url: this.baseUrl
    }).then(function (download) {
      if (!download) {
        return;
      }

      _this10.download({
        sourceEventType: "download"
      });
    });
  },
  _documentError: function _documentError(message) {
    var moreInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    this._unblockDocumentLoadEvent();

    this._otherError(message, moreInfo);
  },
  _otherError: function _otherError(message) {
    var moreInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var moreInfoText = [this.l10n.get("error_version_info", {
      version: _pdf.version || "?",
      build: _pdf.build || "?"
    })];

    if (moreInfo) {
      moreInfoText.push(this.l10n.get("error_message", {
        message: moreInfo.message
      }));

      if (moreInfo.stack) {
        moreInfoText.push(this.l10n.get("error_stack", {
          stack: moreInfo.stack
        }));
      } else {
        if (moreInfo.filename) {
          moreInfoText.push(this.l10n.get("error_file", {
            file: moreInfo.filename
          }));
        }

        if (moreInfo.lineNumber) {
          moreInfoText.push(this.l10n.get("error_line", {
            line: moreInfo.lineNumber
          }));
        }
      }
    }

    var errorWrapperConfig = this.appConfig.errorWrapper;
    var errorWrapper = errorWrapperConfig.container;
    errorWrapper.hidden = false;
    var errorMessage = errorWrapperConfig.errorMessage;
    errorMessage.textContent = message;
    var closeButton = errorWrapperConfig.closeButton;

    closeButton.onclick = function () {
      errorWrapper.hidden = true;
    };

    var errorMoreInfo = errorWrapperConfig.errorMoreInfo;
    var moreInfoButton = errorWrapperConfig.moreInfoButton;
    var lessInfoButton = errorWrapperConfig.lessInfoButton;

    moreInfoButton.onclick = function () {
      errorMoreInfo.hidden = false;
      moreInfoButton.hidden = true;
      lessInfoButton.hidden = false;
      errorMoreInfo.style.height = errorMoreInfo.scrollHeight + "px";
    };

    lessInfoButton.onclick = function () {
      errorMoreInfo.hidden = true;
      moreInfoButton.hidden = false;
      lessInfoButton.hidden = true;
    };

    moreInfoButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    lessInfoButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    closeButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    moreInfoButton.hidden = false;
    lessInfoButton.hidden = true;
    Promise.all(moreInfoText).then(function (parts) {
      errorMoreInfo.value = parts.join("\n");
    });
  },
  progress: function progress(level) {
    var _this11 = this;

    if (this.downloadComplete) {
      return;
    }

    var percent = Math.round(level * 100);

    if (percent > this.loadingBar.percent || isNaN(percent)) {
      this.loadingBar.percent = percent;
      var disableAutoFetch = this.pdfDocument ? this.pdfDocument.loadingParams.disableAutoFetch : _app_options.AppOptions.get("disableAutoFetch");

      if (disableAutoFetch && percent) {
        if (this.disableAutoFetchLoadingBarTimeout) {
          clearTimeout(this.disableAutoFetchLoadingBarTimeout);
          this.disableAutoFetchLoadingBarTimeout = null;
        }

        this.loadingBar.show();
        this.disableAutoFetchLoadingBarTimeout = setTimeout(function () {
          _this11.loadingBar.hide();

          _this11.disableAutoFetchLoadingBarTimeout = null;
        }, DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT);
      }
    }
  },
  load: function load(pdfDocument) {
    var _this12 = this;

    this.pdfDocument = pdfDocument;
    pdfDocument.getDownloadInfo().then(function (_ref4) {
      var length = _ref4.length;
      _this12._contentLength = length;
      _this12.downloadComplete = true;

      _this12.loadingBar.hide();

      firstPagePromise.then(function () {
        _this12.eventBus.dispatch("documentloaded", {
          source: _this12
        });
      });
    });
    var pageLayoutPromise = pdfDocument.getPageLayout()["catch"](function () {});
    var pageModePromise = pdfDocument.getPageMode()["catch"](function () {});
    var openActionPromise = pdfDocument.getOpenAction()["catch"](function () {});
    this.toolbar.setPagesCount(pdfDocument.numPages, false);
    this.secondaryToolbar.setPagesCount(pdfDocument.numPages);
    var baseDocumentUrl;
    baseDocumentUrl = null;
    this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
    this.pdfDocumentProperties.setDocument(pdfDocument, this.url);
    var pdfViewer = this.pdfViewer;
    pdfViewer.setDocument(pdfDocument);
    var firstPagePromise = pdfViewer.firstPagePromise,
        onePageRendered = pdfViewer.onePageRendered,
        pagesPromise = pdfViewer.pagesPromise;
    var pdfThumbnailViewer = this.pdfThumbnailViewer;
    pdfThumbnailViewer.setDocument(pdfDocument);
    var storedPromise = (this.store = new _view_history.ViewHistory(pdfDocument.fingerprints[0])).getMultiple({
      page: null,
      zoom: _ui_utils.DEFAULT_SCALE_VALUE,
      scrollLeft: "0",
      scrollTop: "0",
      rotation: null,
      sidebarView: _ui_utils.SidebarView.UNKNOWN,
      scrollMode: _ui_utils.ScrollMode.UNKNOWN,
      spreadMode: _ui_utils.SpreadMode.UNKNOWN
    })["catch"](function () {
      return Object.create(null);
    });
    firstPagePromise.then(function (pdfPage) {
      _this12.loadingBar.setWidth(_this12.appConfig.viewerContainer);

      _this12._initializeAnnotationStorageCallbacks(pdfDocument);

      Promise.all([_ui_utils.animationStarted, storedPromise, pageLayoutPromise, pageModePromise, openActionPromise]).then( /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11(_ref5) {
          var _ref7, timeStamp, stored, pageLayout, pageMode, openAction, viewOnLoad, initialBookmark, zoom, hash, rotation, sidebarView, scrollMode, spreadMode, modes;

          return _regenerator["default"].wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _ref7 = _slicedToArray(_ref5, 5), timeStamp = _ref7[0], stored = _ref7[1], pageLayout = _ref7[2], pageMode = _ref7[3], openAction = _ref7[4];
                  viewOnLoad = _app_options.AppOptions.get("viewOnLoad");

                  _this12._initializePdfHistory({
                    fingerprint: pdfDocument.fingerprints[0],
                    viewOnLoad: viewOnLoad,
                    initialDest: openAction === null || openAction === void 0 ? void 0 : openAction.dest
                  });

                  initialBookmark = _this12.initialBookmark;
                  zoom = _app_options.AppOptions.get("defaultZoomValue");
                  hash = zoom ? "zoom=".concat(zoom) : null;
                  rotation = null;
                  sidebarView = _app_options.AppOptions.get("sidebarViewOnLoad");
                  scrollMode = _app_options.AppOptions.get("scrollModeOnLoad");
                  spreadMode = _app_options.AppOptions.get("spreadModeOnLoad");

                  if (stored.page && viewOnLoad !== ViewOnLoad.INITIAL) {
                    hash = "page=".concat(stored.page, "&zoom=").concat(zoom || stored.zoom, ",") + "".concat(stored.scrollLeft, ",").concat(stored.scrollTop);
                    rotation = parseInt(stored.rotation, 10);

                    if (sidebarView === _ui_utils.SidebarView.UNKNOWN) {
                      sidebarView = stored.sidebarView | 0;
                    }

                    if (scrollMode === _ui_utils.ScrollMode.UNKNOWN) {
                      scrollMode = stored.scrollMode | 0;
                    }

                    if (spreadMode === _ui_utils.SpreadMode.UNKNOWN) {
                      spreadMode = stored.spreadMode | 0;
                    }
                  }

                  if (pageMode && sidebarView === _ui_utils.SidebarView.UNKNOWN) {
                    sidebarView = (0, _ui_utils.apiPageModeToSidebarView)(pageMode);
                  }

                  if (pageLayout && scrollMode === _ui_utils.ScrollMode.UNKNOWN && spreadMode === _ui_utils.SpreadMode.UNKNOWN) {
                    modes = (0, _ui_utils.apiPageLayoutToViewerModes)(pageLayout);
                    spreadMode = modes.spreadMode;
                  }

                  _this12.setInitialView(hash, {
                    rotation: rotation,
                    sidebarView: sidebarView,
                    scrollMode: scrollMode,
                    spreadMode: spreadMode
                  });

                  _this12.eventBus.dispatch("documentinit", {
                    source: _this12
                  });

                  if (!_this12.isViewerEmbedded) {
                    pdfViewer.focus();
                  }

                  _context11.next = 18;
                  return Promise.race([pagesPromise, new Promise(function (resolve) {
                    setTimeout(resolve, FORCE_PAGES_LOADED_TIMEOUT);
                  })]);

                case 18:
                  if (!(!initialBookmark && !hash)) {
                    _context11.next = 20;
                    break;
                  }

                  return _context11.abrupt("return");

                case 20:
                  if (!pdfViewer.hasEqualPageSizes) {
                    _context11.next = 22;
                    break;
                  }

                  return _context11.abrupt("return");

                case 22:
                  _this12.initialBookmark = initialBookmark;
                  pdfViewer.currentScaleValue = pdfViewer.currentScaleValue;

                  _this12.setInitialView(hash);

                case 25:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee11);
        }));

        return function (_x2) {
          return _ref6.apply(this, arguments);
        };
      }())["catch"](function () {
        _this12.setInitialView();
      }).then(function () {
        pdfViewer.update();
      });
    });
    pagesPromise.then(function () {
      _this12._unblockDocumentLoadEvent();

      _this12._initializeAutoPrint(pdfDocument, openActionPromise);
    }, function (reason) {
      _this12.l10n.get("loading_error").then(function (msg) {
        _this12._documentError(msg, {
          message: reason === null || reason === void 0 ? void 0 : reason.message
        });
      });
    });
    onePageRendered.then(function (data) {
      _this12.externalServices.reportTelemetry({
        type: "pageInfo",
        timestamp: data.timestamp
      });

      pdfDocument.getOutline().then(function (outline) {
        if (pdfDocument !== _this12.pdfDocument) {
          return;
        }

        _this12.pdfOutlineViewer.render({
          outline: outline,
          pdfDocument: pdfDocument
        });
      });
      pdfDocument.getAttachments().then(function (attachments) {
        if (pdfDocument !== _this12.pdfDocument) {
          return;
        }

        _this12.pdfAttachmentViewer.render({
          attachments: attachments
        });
      });
      pdfViewer.optionalContentConfigPromise.then(function (optionalContentConfig) {
        if (pdfDocument !== _this12.pdfDocument) {
          return;
        }

        _this12.pdfLayerViewer.render({
          optionalContentConfig: optionalContentConfig,
          pdfDocument: pdfDocument
        });
      });

      if ("requestIdleCallback" in window) {
        var callback = window.requestIdleCallback(function () {
          _this12._collectTelemetry(pdfDocument);

          _this12._idleCallbacks["delete"](callback);
        }, {
          timeout: 1000
        });

        _this12._idleCallbacks.add(callback);
      }
    });

    this._initializePageLabels(pdfDocument);

    this._initializeMetadata(pdfDocument);
  },
  _scriptingDocProperties: function _scriptingDocProperties(pdfDocument) {
    var _this13 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var _this13$metadata, _this13$metadata2;

      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (_this13.documentInfo) {
                _context12.next = 5;
                break;
              }

              _context12.next = 3;
              return new Promise(function (resolve) {
                _this13.eventBus._on("metadataloaded", resolve, {
                  once: true
                });
              });

            case 3:
              if (!(pdfDocument !== _this13.pdfDocument)) {
                _context12.next = 5;
                break;
              }

              return _context12.abrupt("return", null);

            case 5:
              if (_this13._contentLength) {
                _context12.next = 10;
                break;
              }

              _context12.next = 8;
              return new Promise(function (resolve) {
                _this13.eventBus._on("documentloaded", resolve, {
                  once: true
                });
              });

            case 8:
              if (!(pdfDocument !== _this13.pdfDocument)) {
                _context12.next = 10;
                break;
              }

              return _context12.abrupt("return", null);

            case 10:
              return _context12.abrupt("return", _objectSpread(_objectSpread({}, _this13.documentInfo), {}, {
                baseURL: _this13.baseUrl,
                filesize: _this13._contentLength,
                filename: _this13._docFilename,
                metadata: (_this13$metadata = _this13.metadata) === null || _this13$metadata === void 0 ? void 0 : _this13$metadata.getRaw(),
                authors: (_this13$metadata2 = _this13.metadata) === null || _this13$metadata2 === void 0 ? void 0 : _this13$metadata2.get("dc:creator"),
                numPages: _this13.pagesCount,
                URL: _this13.url
              }));

            case 11:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
  },
  _collectTelemetry: function _collectTelemetry(pdfDocument) {
    var _this14 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var markInfo, tagged;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return _this14.pdfDocument.getMarkInfo();

            case 2:
              markInfo = _context13.sent;

              if (!(pdfDocument !== _this14.pdfDocument)) {
                _context13.next = 5;
                break;
              }

              return _context13.abrupt("return");

            case 5:
              tagged = (markInfo === null || markInfo === void 0 ? void 0 : markInfo.Marked) || false;

              _this14.externalServices.reportTelemetry({
                type: "tagged",
                tagged: tagged
              });

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  },
  _initializeAutoPrint: function _initializeAutoPrint(pdfDocument, openActionPromise) {
    var _this15 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var _yield$Promise$all, _yield$Promise$all2, openAction, javaScript, triggerAutoPrint, _iterator2, _step2, js;

      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return Promise.all([openActionPromise, !_this15.pdfViewer.enableScripting ? pdfDocument.getJavaScript() : null]);

            case 2:
              _yield$Promise$all = _context14.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              openAction = _yield$Promise$all2[0];
              javaScript = _yield$Promise$all2[1];

              if (!(pdfDocument !== _this15.pdfDocument)) {
                _context14.next = 8;
                break;
              }

              return _context14.abrupt("return");

            case 8:
              triggerAutoPrint = false;

              if ((openAction === null || openAction === void 0 ? void 0 : openAction.action) === "Print") {
                triggerAutoPrint = true;
              }

              if (!javaScript) {
                _context14.next = 31;
                break;
              }

              javaScript.some(function (js) {
                if (!js) {
                  return false;
                }

                console.warn("Warning: JavaScript support is not enabled");

                _this15.fallback(_pdf.UNSUPPORTED_FEATURES.javaScript);

                return true;
              });

              if (triggerAutoPrint) {
                _context14.next = 31;
                break;
              }

              _iterator2 = _createForOfIteratorHelper(javaScript);
              _context14.prev = 14;

              _iterator2.s();

            case 16:
              if ((_step2 = _iterator2.n()).done) {
                _context14.next = 23;
                break;
              }

              js = _step2.value;

              if (!(js && _ui_utils.AutoPrintRegExp.test(js))) {
                _context14.next = 21;
                break;
              }

              triggerAutoPrint = true;
              return _context14.abrupt("break", 23);

            case 21:
              _context14.next = 16;
              break;

            case 23:
              _context14.next = 28;
              break;

            case 25:
              _context14.prev = 25;
              _context14.t0 = _context14["catch"](14);

              _iterator2.e(_context14.t0);

            case 28:
              _context14.prev = 28;

              _iterator2.f();

              return _context14.finish(28);

            case 31:
              if (triggerAutoPrint) {
                _this15.triggerPrinting();
              }

            case 32:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[14, 25, 28, 31]]);
    }))();
  },
  _initializeMetadata: function _initializeMetadata(pdfDocument) {
    var _this16 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var _this16$_contentDispo, _this16$_contentLengt;

      var _yield$pdfDocument$ge, info, metadata, contentDispositionFilename, contentLength, pdfTitle, metadataTitle, versionId, generatorId, producer, formType;

      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return pdfDocument.getMetadata();

            case 2:
              _yield$pdfDocument$ge = _context15.sent;
              info = _yield$pdfDocument$ge.info;
              metadata = _yield$pdfDocument$ge.metadata;
              contentDispositionFilename = _yield$pdfDocument$ge.contentDispositionFilename;
              contentLength = _yield$pdfDocument$ge.contentLength;

              if (!(pdfDocument !== _this16.pdfDocument)) {
                _context15.next = 9;
                break;
              }

              return _context15.abrupt("return");

            case 9:
              _this16.documentInfo = info;
              _this16.metadata = metadata;
              (_this16$_contentDispo = _this16._contentDispositionFilename) !== null && _this16$_contentDispo !== void 0 ? _this16$_contentDispo : _this16._contentDispositionFilename = contentDispositionFilename;
              (_this16$_contentLengt = _this16._contentLength) !== null && _this16$_contentLengt !== void 0 ? _this16$_contentLengt : _this16._contentLength = contentLength;
              console.log("PDF ".concat(pdfDocument.fingerprints[0], " [").concat(info.PDFFormatVersion, " ") + "".concat((info.Producer || "-").trim(), " / ").concat((info.Creator || "-").trim(), "] ") + "(PDF.js: ".concat(_pdf.version || "-", ")"));
              pdfTitle = info === null || info === void 0 ? void 0 : info.Title;
              metadataTitle = metadata === null || metadata === void 0 ? void 0 : metadata.get("dc:title");

              if (metadataTitle) {
                if (metadataTitle !== "Untitled" && !/[\uFFF0-\uFFFF]/g.test(metadataTitle)) {
                  pdfTitle = metadataTitle;
                }
              }

              if (pdfTitle) {
                _this16.setTitle("".concat(pdfTitle, " - ").concat(contentDispositionFilename || document.title));
              } else if (contentDispositionFilename) {
                _this16.setTitle(contentDispositionFilename);
              }

              if (info.IsXFAPresent && !info.IsAcroFormPresent && !pdfDocument.isPureXfa) {
                if (pdfDocument.loadingParams.enableXfa) {
                  console.warn("Warning: XFA Foreground documents are not supported");
                } else {
                  console.warn("Warning: XFA support is not enabled");
                }

                _this16.fallback(_pdf.UNSUPPORTED_FEATURES.forms);
              } else if ((info.IsAcroFormPresent || info.IsXFAPresent) && !_this16.pdfViewer.renderForms) {
                console.warn("Warning: Interactive form support is not enabled");

                _this16.fallback(_pdf.UNSUPPORTED_FEATURES.forms);
              }

              if (info.IsSignaturesPresent) {
                console.warn("Warning: Digital signatures validation is not supported");

                _this16.fallback(_pdf.UNSUPPORTED_FEATURES.signatures);
              }

              versionId = "other";

              if (KNOWN_VERSIONS.includes(info.PDFFormatVersion)) {
                versionId = "v".concat(info.PDFFormatVersion.replace(".", "_"));
              }

              generatorId = "other";

              if (info.Producer) {
                producer = info.Producer.toLowerCase();
                KNOWN_GENERATORS.some(function (generator) {
                  if (!producer.includes(generator)) {
                    return false;
                  }

                  generatorId = generator.replace(/[ .-]/g, "_");
                  return true;
                });
              }

              formType = null;

              if (info.IsXFAPresent) {
                formType = "xfa";
              } else if (info.IsAcroFormPresent) {
                formType = "acroform";
              }

              _this16.externalServices.reportTelemetry({
                type: "documentInfo",
                version: versionId,
                generator: generatorId,
                formType: formType
              });

              _this16.eventBus.dispatch("metadataloaded", {
                source: _this16
              });

            case 28:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }))();
  },
  _initializePageLabels: function _initializePageLabels(pdfDocument) {
    var _this17 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var labels, numLabels, standardLabels, emptyLabels, i, label, pdfViewer, pdfThumbnailViewer, toolbar;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return pdfDocument.getPageLabels();

            case 2:
              labels = _context16.sent;

              if (!(pdfDocument !== _this17.pdfDocument)) {
                _context16.next = 5;
                break;
              }

              return _context16.abrupt("return");

            case 5:
              if (!(!labels || _app_options.AppOptions.get("disablePageLabels"))) {
                _context16.next = 7;
                break;
              }

              return _context16.abrupt("return");

            case 7:
              numLabels = labels.length;
              standardLabels = 0, emptyLabels = 0;
              i = 0;

            case 10:
              if (!(i < numLabels)) {
                _context16.next = 24;
                break;
              }

              label = labels[i];

              if (!(label === (i + 1).toString())) {
                _context16.next = 16;
                break;
              }

              standardLabels++;
              _context16.next = 21;
              break;

            case 16:
              if (!(label === "")) {
                _context16.next = 20;
                break;
              }

              emptyLabels++;
              _context16.next = 21;
              break;

            case 20:
              return _context16.abrupt("break", 24);

            case 21:
              i++;
              _context16.next = 10;
              break;

            case 24:
              if (!(standardLabels >= numLabels || emptyLabels >= numLabels)) {
                _context16.next = 26;
                break;
              }

              return _context16.abrupt("return");

            case 26:
              pdfViewer = _this17.pdfViewer, pdfThumbnailViewer = _this17.pdfThumbnailViewer, toolbar = _this17.toolbar;
              pdfViewer.setPageLabels(labels);
              pdfThumbnailViewer.setPageLabels(labels);
              toolbar.setPagesCount(numLabels, true);
              toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);

            case 31:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }))();
  },
  _initializePdfHistory: function _initializePdfHistory(_ref8) {
    var fingerprint = _ref8.fingerprint,
        viewOnLoad = _ref8.viewOnLoad,
        _ref8$initialDest = _ref8.initialDest,
        initialDest = _ref8$initialDest === void 0 ? null : _ref8$initialDest;

    if (!this.pdfHistory) {
      return;
    }

    this.pdfHistory.initialize({
      fingerprint: fingerprint,
      resetHistory: viewOnLoad === ViewOnLoad.INITIAL,
      updateUrl: _app_options.AppOptions.get("historyUpdateUrl")
    });

    if (this.pdfHistory.initialBookmark) {
      this.initialBookmark = this.pdfHistory.initialBookmark;
      this.initialRotation = this.pdfHistory.initialRotation;
    }

    if (initialDest && !this.initialBookmark && viewOnLoad === ViewOnLoad.UNKNOWN) {
      this.initialBookmark = JSON.stringify(initialDest);
      this.pdfHistory.push({
        explicitDest: initialDest,
        pageNumber: null
      });
    }
  },
  _initializeAnnotationStorageCallbacks: function _initializeAnnotationStorageCallbacks(pdfDocument) {
    var _this18 = this;

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    var annotationStorage = pdfDocument.annotationStorage;

    annotationStorage.onSetModified = function () {
      window.addEventListener("beforeunload", beforeUnload);
      _this18._annotationStorageModified = true;
    };

    annotationStorage.onResetModified = function () {
      window.removeEventListener("beforeunload", beforeUnload);
      delete _this18._annotationStorageModified;
    };
  },
  setInitialView: function setInitialView(storedHash) {
    var _this19 = this;

    var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        rotation = _ref9.rotation,
        sidebarView = _ref9.sidebarView,
        scrollMode = _ref9.scrollMode,
        spreadMode = _ref9.spreadMode;

    var setRotation = function setRotation(angle) {
      if ((0, _ui_utils.isValidRotation)(angle)) {
        _this19.pdfViewer.pagesRotation = angle;
      }
    };

    var setViewerModes = function setViewerModes(scroll, spread) {
      if ((0, _ui_utils.isValidScrollMode)(scroll)) {
        _this19.pdfViewer.scrollMode = scroll;
      }

      if ((0, _ui_utils.isValidSpreadMode)(spread)) {
        _this19.pdfViewer.spreadMode = spread;
      }
    };

    this.isInitialViewSet = true;
    this.pdfSidebar.setInitialView(sidebarView);
    setViewerModes(scrollMode, spreadMode);

    if (this.initialBookmark) {
      setRotation(this.initialRotation);
      delete this.initialRotation;
      this.pdfLinkService.setHash(this.initialBookmark);
      this.initialBookmark = null;
    } else if (storedHash) {
      setRotation(rotation);
      this.pdfLinkService.setHash(storedHash);
    }

    this.toolbar.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel);
    this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber);

    if (!this.pdfViewer.currentScaleValue) {
      this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
    }
  },
  _cleanup: function _cleanup() {
    if (!this.pdfDocument) {
      return;
    }

    this.pdfViewer.cleanup();
    this.pdfThumbnailViewer.cleanup();
    this.pdfDocument.cleanup(this.pdfViewer.renderer === _ui_utils.RendererType.SVG);
  },
  forceRendering: function forceRendering() {
    this.pdfRenderingQueue.printing = !!this.printService;
    this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar.isThumbnailViewVisible;
    this.pdfRenderingQueue.renderHighestPriority();
  },
  beforePrint: function beforePrint() {
    var _this20 = this;

    this.pdfScriptingManager.dispatchWillPrint();

    if (this.printService) {
      return;
    }

    if (!this.supportsPrinting) {
      this.l10n.get("printing_not_supported").then(function (msg) {
        _this20._otherError(msg);
      });
      return;
    }

    if (!this.pdfViewer.pageViewsReady) {
      this.l10n.get("printing_not_ready").then(function (msg) {
        window.alert(msg);
      });
      return;
    }

    var pagesOverview = this.pdfViewer.getPagesOverview();
    var printContainer = this.appConfig.printContainer;

    var printResolution = _app_options.AppOptions.get("printResolution");

    var optionalContentConfigPromise = this.pdfViewer.optionalContentConfigPromise;
    var printService = PDFPrintServiceFactory.instance.createPrintService(this.pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, this.l10n);
    this.printService = printService;
    this.forceRendering();
    printService.layout();
    this.externalServices.reportTelemetry({
      type: "print"
    });
  },
  afterPrint: function afterPrint() {
    this.pdfScriptingManager.dispatchDidPrint();

    if (this.printService) {
      var _this$pdfDocument2;

      this.printService.destroy();
      this.printService = null;
      (_this$pdfDocument2 = this.pdfDocument) === null || _this$pdfDocument2 === void 0 ? void 0 : _this$pdfDocument2.annotationStorage.resetModified();
    }

    this.forceRendering();
  },
  rotatePages: function rotatePages(delta) {
    this.pdfViewer.pagesRotation += delta;
  },
  requestPresentationMode: function requestPresentationMode() {
    var _this$pdfPresentation;

    (_this$pdfPresentation = this.pdfPresentationMode) === null || _this$pdfPresentation === void 0 ? void 0 : _this$pdfPresentation.request();
  },
  triggerPrinting: function triggerPrinting() {
    if (!this.supportsPrinting) {
      return;
    }

    window.print();
  },
  bindEvents: function bindEvents() {
    var eventBus = this.eventBus,
        _boundEvents = this._boundEvents;
    _boundEvents.beforePrint = this.beforePrint.bind(this);
    _boundEvents.afterPrint = this.afterPrint.bind(this);

    eventBus._on("resize", webViewerResize);

    eventBus._on("hashchange", webViewerHashchange);

    eventBus._on("beforeprint", _boundEvents.beforePrint);

    eventBus._on("afterprint", _boundEvents.afterPrint);

    eventBus._on("pagerendered", webViewerPageRendered);

    eventBus._on("updateviewarea", webViewerUpdateViewarea);

    eventBus._on("pagechanging", webViewerPageChanging);

    eventBus._on("scalechanging", webViewerScaleChanging);

    eventBus._on("rotationchanging", webViewerRotationChanging);

    eventBus._on("sidebarviewchanged", webViewerSidebarViewChanged);

    eventBus._on("pagemode", webViewerPageMode);

    eventBus._on("namedaction", webViewerNamedAction);

    eventBus._on("presentationmodechanged", webViewerPresentationModeChanged);

    eventBus._on("presentationmode", webViewerPresentationMode);

    eventBus._on("print", webViewerPrint);

    eventBus._on("download", webViewerDownload);

    eventBus._on("save", webViewerSave);

    eventBus._on("firstpage", webViewerFirstPage);

    eventBus._on("lastpage", webViewerLastPage);

    eventBus._on("nextpage", webViewerNextPage);

    eventBus._on("previouspage", webViewerPreviousPage);

    eventBus._on("zoomin", webViewerZoomIn);

    eventBus._on("zoomout", webViewerZoomOut);

    eventBus._on("zoomreset", webViewerZoomReset);

    eventBus._on("pagenumberchanged", webViewerPageNumberChanged);

    eventBus._on("scalechanged", webViewerScaleChanged);

    eventBus._on("rotatecw", webViewerRotateCw);

    eventBus._on("rotateccw", webViewerRotateCcw);

    eventBus._on("optionalcontentconfig", webViewerOptionalContentConfig);

    eventBus._on("switchscrollmode", webViewerSwitchScrollMode);

    eventBus._on("scrollmodechanged", webViewerScrollModeChanged);

    eventBus._on("switchspreadmode", webViewerSwitchSpreadMode);

    eventBus._on("spreadmodechanged", webViewerSpreadModeChanged);

    eventBus._on("documentproperties", webViewerDocumentProperties);

    eventBus._on("findfromurlhash", webViewerFindFromUrlHash);

    eventBus._on("updatefindmatchescount", webViewerUpdateFindMatchesCount);

    eventBus._on("updatefindcontrolstate", webViewerUpdateFindControlState);

    if (_app_options.AppOptions.get("pdfBug")) {
      _boundEvents.reportPageStatsPDFBug = reportPageStatsPDFBug;

      eventBus._on("pagerendered", _boundEvents.reportPageStatsPDFBug);

      eventBus._on("pagechanging", _boundEvents.reportPageStatsPDFBug);
    }

    eventBus._on("fileinputchange", webViewerFileInputChange);

    eventBus._on("openfile", webViewerOpenFile);
  },
  bindWindowEvents: function bindWindowEvents() {
    var eventBus = this.eventBus,
        _boundEvents = this._boundEvents;

    _boundEvents.windowResize = function () {
      eventBus.dispatch("resize", {
        source: window
      });
    };

    _boundEvents.windowHashChange = function () {
      eventBus.dispatch("hashchange", {
        source: window,
        hash: document.location.hash.substring(1)
      });
    };

    _boundEvents.windowBeforePrint = function () {
      eventBus.dispatch("beforeprint", {
        source: window
      });
    };

    _boundEvents.windowAfterPrint = function () {
      eventBus.dispatch("afterprint", {
        source: window
      });
    };

    _boundEvents.windowUpdateFromSandbox = function (event) {
      eventBus.dispatch("updatefromsandbox", {
        source: window,
        detail: event.detail
      });
    };

    window.addEventListener("visibilitychange", webViewerVisibilityChange);
    window.addEventListener("wheel", webViewerWheel, {
      passive: false
    });
    window.addEventListener("touchstart", webViewerTouchStart, {
      passive: false
    });
    window.addEventListener("click", webViewerClick);
    window.addEventListener("keydown", webViewerKeyDown);
    window.addEventListener("resize", _boundEvents.windowResize);
    window.addEventListener("hashchange", _boundEvents.windowHashChange);
    window.addEventListener("beforeprint", _boundEvents.windowBeforePrint);
    window.addEventListener("afterprint", _boundEvents.windowAfterPrint);
    window.addEventListener("updatefromsandbox", _boundEvents.windowUpdateFromSandbox);
  },
  unbindEvents: function unbindEvents() {
    var eventBus = this.eventBus,
        _boundEvents = this._boundEvents;

    eventBus._off("resize", webViewerResize);

    eventBus._off("hashchange", webViewerHashchange);

    eventBus._off("beforeprint", _boundEvents.beforePrint);

    eventBus._off("afterprint", _boundEvents.afterPrint);

    eventBus._off("pagerendered", webViewerPageRendered);

    eventBus._off("updateviewarea", webViewerUpdateViewarea);

    eventBus._off("pagechanging", webViewerPageChanging);

    eventBus._off("scalechanging", webViewerScaleChanging);

    eventBus._off("rotationchanging", webViewerRotationChanging);

    eventBus._off("sidebarviewchanged", webViewerSidebarViewChanged);

    eventBus._off("pagemode", webViewerPageMode);

    eventBus._off("namedaction", webViewerNamedAction);

    eventBus._off("presentationmodechanged", webViewerPresentationModeChanged);

    eventBus._off("presentationmode", webViewerPresentationMode);

    eventBus._off("print", webViewerPrint);

    eventBus._off("download", webViewerDownload);

    eventBus._off("save", webViewerSave);

    eventBus._off("firstpage", webViewerFirstPage);

    eventBus._off("lastpage", webViewerLastPage);

    eventBus._off("nextpage", webViewerNextPage);

    eventBus._off("previouspage", webViewerPreviousPage);

    eventBus._off("zoomin", webViewerZoomIn);

    eventBus._off("zoomout", webViewerZoomOut);

    eventBus._off("zoomreset", webViewerZoomReset);

    eventBus._off("pagenumberchanged", webViewerPageNumberChanged);

    eventBus._off("scalechanged", webViewerScaleChanged);

    eventBus._off("rotatecw", webViewerRotateCw);

    eventBus._off("rotateccw", webViewerRotateCcw);

    eventBus._off("optionalcontentconfig", webViewerOptionalContentConfig);

    eventBus._off("switchscrollmode", webViewerSwitchScrollMode);

    eventBus._off("scrollmodechanged", webViewerScrollModeChanged);

    eventBus._off("switchspreadmode", webViewerSwitchSpreadMode);

    eventBus._off("spreadmodechanged", webViewerSpreadModeChanged);

    eventBus._off("documentproperties", webViewerDocumentProperties);

    eventBus._off("findfromurlhash", webViewerFindFromUrlHash);

    eventBus._off("updatefindmatchescount", webViewerUpdateFindMatchesCount);

    eventBus._off("updatefindcontrolstate", webViewerUpdateFindControlState);

    if (_boundEvents.reportPageStatsPDFBug) {
      eventBus._off("pagerendered", _boundEvents.reportPageStatsPDFBug);

      eventBus._off("pagechanging", _boundEvents.reportPageStatsPDFBug);

      _boundEvents.reportPageStatsPDFBug = null;
    }

    eventBus._off("fileinputchange", webViewerFileInputChange);

    eventBus._off("openfile", webViewerOpenFile);

    _boundEvents.beforePrint = null;
    _boundEvents.afterPrint = null;
  },
  unbindWindowEvents: function unbindWindowEvents() {
    var _boundEvents = this._boundEvents;
    window.removeEventListener("visibilitychange", webViewerVisibilityChange);
    window.removeEventListener("wheel", webViewerWheel, {
      passive: false
    });
    window.removeEventListener("touchstart", webViewerTouchStart, {
      passive: false
    });
    window.removeEventListener("click", webViewerClick);
    window.removeEventListener("keydown", webViewerKeyDown);
    window.removeEventListener("resize", _boundEvents.windowResize);
    window.removeEventListener("hashchange", _boundEvents.windowHashChange);
    window.removeEventListener("beforeprint", _boundEvents.windowBeforePrint);
    window.removeEventListener("afterprint", _boundEvents.windowAfterPrint);
    window.removeEventListener("updatefromsandbox", _boundEvents.windowUpdateFromSandbox);
    _boundEvents.windowResize = null;
    _boundEvents.windowHashChange = null;
    _boundEvents.windowBeforePrint = null;
    _boundEvents.windowAfterPrint = null;
    _boundEvents.windowUpdateFromSandbox = null;
  },
  accumulateWheelTicks: function accumulateWheelTicks(ticks) {
    if (this._wheelUnusedTicks > 0 && ticks < 0 || this._wheelUnusedTicks < 0 && ticks > 0) {
      this._wheelUnusedTicks = 0;
    }

    this._wheelUnusedTicks += ticks;
    var wholeTicks = Math.sign(this._wheelUnusedTicks) * Math.floor(Math.abs(this._wheelUnusedTicks));
    this._wheelUnusedTicks -= wholeTicks;
    return wholeTicks;
  },
  _unblockDocumentLoadEvent: function _unblockDocumentLoadEvent() {
    if (document.blockUnblockOnload) {
      document.blockUnblockOnload(false);
    }

    this._unblockDocumentLoadEvent = function () {};
  },
  _reportDocumentStatsTelemetry: function _reportDocumentStatsTelemetry() {
    var stats = this.pdfDocument.stats;

    if (stats !== this._docStats) {
      this._docStats = stats;
      this.externalServices.reportTelemetry({
        type: "documentStats",
        stats: stats
      });
    }
  },

  get scriptingReady() {
    return this.pdfScriptingManager.ready;
  }

};
exports.PDFViewerApplication = PDFViewerApplication;
var validateFileURL;
{
  var HOSTED_VIEWER_ORIGINS = ["null", "http://mozilla.github.io", "https://mozilla.github.io"];

  validateFileURL = function validateFileURL(file) {
    if (file === undefined) {
      return;
    }

    try {
      var viewerOrigin = new URL(window.location.href).origin || "null";

      if (HOSTED_VIEWER_ORIGINS.includes(viewerOrigin)) {
        return;
      }

      var _URL = new URL(file, window.location.href),
          origin = _URL.origin,
          protocol = _URL.protocol;

      if (origin !== viewerOrigin && protocol !== "blob:") {
        throw new Error("file origin does not match viewer's");
      }
    } catch (ex) {
      PDFViewerApplication.l10n.get("loading_error").then(function (msg) {
        PDFViewerApplication._documentError(msg, {
          message: ex === null || ex === void 0 ? void 0 : ex.message
        });
      });
      throw ex;
    }
  };
}

function loadFakeWorker() {
  return _loadFakeWorker.apply(this, arguments);
}

function _loadFakeWorker() {
  _loadFakeWorker = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            if (!_pdf.GlobalWorkerOptions.workerSrc) {
              _pdf.GlobalWorkerOptions.workerSrc = _app_options.AppOptions.get("workerSrc");
            }

            _context17.next = 3;
            return (0, _pdf.loadScript)(_pdf.PDFWorker.workerSrc);

          case 3:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _loadFakeWorker.apply(this, arguments);
}

function initPDFBug(_x3) {
  return _initPDFBug.apply(this, arguments);
}

function _initPDFBug() {
  _initPDFBug = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee18(enabledTabs) {
    var _PDFViewerApplication7, debuggerScriptPath, mainContainer;

    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _PDFViewerApplication7 = PDFViewerApplication.appConfig, debuggerScriptPath = _PDFViewerApplication7.debuggerScriptPath, mainContainer = _PDFViewerApplication7.mainContainer;
            _context18.next = 3;
            return (0, _pdf.loadScript)(debuggerScriptPath);

          case 3:
            PDFBug.init({
              OPS: _pdf.OPS
            }, mainContainer, enabledTabs);

          case 4:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _initPDFBug.apply(this, arguments);
}

function reportPageStatsPDFBug(_ref10) {
  var _pageView$pdfPage;

  var pageNumber = _ref10.pageNumber;

  if (typeof Stats === "undefined" || !Stats.enabled) {
    return;
  }

  var pageView = PDFViewerApplication.pdfViewer.getPageView(pageNumber - 1);
  var pageStats = pageView === null || pageView === void 0 ? void 0 : (_pageView$pdfPage = pageView.pdfPage) === null || _pageView$pdfPage === void 0 ? void 0 : _pageView$pdfPage.stats;

  if (!pageStats) {
    return;
  }

  Stats.add(pageNumber, pageStats);
}

function webViewerInitialized() {
  var _params$get;

  var appConfig = PDFViewerApplication.appConfig;
  var file;
  var queryString = document.location.search.substring(1);
  var params = (0, _ui_utils.parseQueryString)(queryString);
  file = (_params$get = params.get("file")) !== null && _params$get !== void 0 ? _params$get : _app_options.AppOptions.get("defaultUrl");
  validateFileURL(file);
  var fileInput = document.createElement("input");
  fileInput.id = appConfig.openFileInputName;
  fileInput.className = "fileInput";
  fileInput.setAttribute("type", "file");
  fileInput.oncontextmenu = _ui_utils.noContextMenuHandler;
  document.body.appendChild(fileInput);

  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    appConfig.toolbar.openFile.hidden = true;
    appConfig.secondaryToolbar.openFileButton.hidden = true;
  } else {
    fileInput.value = null;
  }

  fileInput.addEventListener("change", function (evt) {
    var files = evt.target.files;

    if (!files || files.length === 0) {
      return;
    }

    PDFViewerApplication.eventBus.dispatch("fileinputchange", {
      source: this,
      fileInput: evt.target
    });
  });
  appConfig.mainContainer.addEventListener("dragover", function (evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  });
  appConfig.mainContainer.addEventListener("drop", function (evt) {
    evt.preventDefault();
    var files = evt.dataTransfer.files;

    if (!files || files.length === 0) {
      return;
    }

    PDFViewerApplication.eventBus.dispatch("fileinputchange", {
      source: this,
      fileInput: evt.dataTransfer
    });
  });

  if (!PDFViewerApplication.supportsDocumentFonts) {
    _app_options.AppOptions.set("disableFontFace", true);

    PDFViewerApplication.l10n.get("web_fonts_disabled").then(function (msg) {
      console.warn(msg);
    });
  }

  if (!PDFViewerApplication.supportsPrinting) {
    appConfig.toolbar.print.classList.add("hidden");
    appConfig.secondaryToolbar.printButton.classList.add("hidden");
  }

  if (!PDFViewerApplication.supportsFullscreen) {
    appConfig.toolbar.presentationModeButton.classList.add("hidden");
    appConfig.secondaryToolbar.presentationModeButton.classList.add("hidden");
  }

  if (PDFViewerApplication.supportsIntegratedFind) {
    appConfig.toolbar.viewFind.classList.add("hidden");
  }

  appConfig.mainContainer.addEventListener("transitionend", function (evt) {
    if (evt.target === this) {
      PDFViewerApplication.eventBus.dispatch("resize", {
        source: this
      });
    }
  }, true);

  try {
    webViewerOpenFileViaURL(file);
  } catch (reason) {
    PDFViewerApplication.l10n.get("loading_error").then(function (msg) {
      PDFViewerApplication._documentError(msg, reason);
    });
  }
}

function webViewerOpenFileViaURL(file) {
  if (file) {
    PDFViewerApplication.open(file);
  } else {
    PDFViewerApplication._hideViewBookmark();
  }
}

function webViewerPageRendered(_ref11) {
  var pageNumber = _ref11.pageNumber,
      error = _ref11.error;

  if (pageNumber === PDFViewerApplication.page) {
    PDFViewerApplication.toolbar.updateLoadingIndicatorState(false);
  }

  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    var pageView = PDFViewerApplication.pdfViewer.getPageView(pageNumber - 1);
    var thumbnailView = PDFViewerApplication.pdfThumbnailViewer.getThumbnail(pageNumber - 1);

    if (pageView && thumbnailView) {
      thumbnailView.setImage(pageView);
    }
  }

  if (error) {
    PDFViewerApplication.l10n.get("rendering_error").then(function (msg) {
      PDFViewerApplication._otherError(msg, error);
    });
  }

  PDFViewerApplication._reportDocumentStatsTelemetry();
}

function webViewerPageMode(_ref12) {
  var mode = _ref12.mode;
  var view;

  switch (mode) {
    case "thumbs":
      view = _ui_utils.SidebarView.THUMBS;
      break;

    case "bookmarks":
    case "outline":
      view = _ui_utils.SidebarView.OUTLINE;
      break;

    case "attachments":
      view = _ui_utils.SidebarView.ATTACHMENTS;
      break;

    case "layers":
      view = _ui_utils.SidebarView.LAYERS;
      break;

    case "none":
      view = _ui_utils.SidebarView.NONE;
      break;

    default:
      console.error('Invalid "pagemode" hash parameter: ' + mode);
      return;
  }

  PDFViewerApplication.pdfSidebar.switchView(view, true);
}

function webViewerNamedAction(evt) {
  switch (evt.action) {
    case "GoToPage":
      PDFViewerApplication.appConfig.toolbar.pageNumber.select();
      break;

    case "Find":
      if (!PDFViewerApplication.supportsIntegratedFind) {
        PDFViewerApplication.findBar.toggle();
      }

      break;

    case "Print":
      PDFViewerApplication.triggerPrinting();
      break;

    case "SaveAs":
      webViewerSave();
      break;
  }
}

function webViewerPresentationModeChanged(evt) {
  PDFViewerApplication.pdfViewer.presentationModeState = evt.state;
}

function webViewerSidebarViewChanged(evt) {
  PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled = PDFViewerApplication.pdfSidebar.isThumbnailViewVisible;

  if (PDFViewerApplication.isInitialViewSet) {
    var _PDFViewerApplication;

    (_PDFViewerApplication = PDFViewerApplication.store) === null || _PDFViewerApplication === void 0 ? void 0 : _PDFViewerApplication.set("sidebarView", evt.view)["catch"](function () {});
  }
}

function webViewerUpdateViewarea(evt) {
  var location = evt.location;

  if (PDFViewerApplication.isInitialViewSet) {
    var _PDFViewerApplication2;

    (_PDFViewerApplication2 = PDFViewerApplication.store) === null || _PDFViewerApplication2 === void 0 ? void 0 : _PDFViewerApplication2.setMultiple({
      page: location.pageNumber,
      zoom: location.scale,
      scrollLeft: location.left,
      scrollTop: location.top,
      rotation: location.rotation
    })["catch"](function () {});
  }

  var href = PDFViewerApplication.pdfLinkService.getAnchorUrl(location.pdfOpenParams);
  PDFViewerApplication.appConfig.toolbar.viewBookmark.href = href;
  PDFViewerApplication.appConfig.secondaryToolbar.viewBookmarkButton.href = href;
  var currentPage = PDFViewerApplication.pdfViewer.getPageView(PDFViewerApplication.page - 1);
  var loading = (currentPage === null || currentPage === void 0 ? void 0 : currentPage.renderingState) !== _ui_utils.RenderingStates.FINISHED;
  PDFViewerApplication.toolbar.updateLoadingIndicatorState(loading);
}

function webViewerScrollModeChanged(evt) {
  if (PDFViewerApplication.isInitialViewSet) {
    var _PDFViewerApplication3;

    (_PDFViewerApplication3 = PDFViewerApplication.store) === null || _PDFViewerApplication3 === void 0 ? void 0 : _PDFViewerApplication3.set("scrollMode", evt.mode)["catch"](function () {});
  }
}

function webViewerSpreadModeChanged(evt) {
  if (PDFViewerApplication.isInitialViewSet) {
    var _PDFViewerApplication4;

    (_PDFViewerApplication4 = PDFViewerApplication.store) === null || _PDFViewerApplication4 === void 0 ? void 0 : _PDFViewerApplication4.set("spreadMode", evt.mode)["catch"](function () {});
  }
}

function webViewerResize() {
  var pdfDocument = PDFViewerApplication.pdfDocument,
      pdfViewer = PDFViewerApplication.pdfViewer;

  if (!pdfDocument) {
    return;
  }

  var currentScaleValue = pdfViewer.currentScaleValue;

  if (currentScaleValue === "auto" || currentScaleValue === "page-fit" || currentScaleValue === "page-width") {
    pdfViewer.currentScaleValue = currentScaleValue;
  }

  pdfViewer.update();
}

function webViewerHashchange(evt) {
  var _PDFViewerApplication5;

  var hash = evt.hash;

  if (!hash) {
    return;
  }

  if (!PDFViewerApplication.isInitialViewSet) {
    PDFViewerApplication.initialBookmark = hash;
  } else if (!((_PDFViewerApplication5 = PDFViewerApplication.pdfHistory) !== null && _PDFViewerApplication5 !== void 0 && _PDFViewerApplication5.popStateInProgress)) {
    PDFViewerApplication.pdfLinkService.setHash(hash);
  }
}

var webViewerFileInputChange, webViewerOpenFile;
{
  webViewerFileInputChange = function webViewerFileInputChange(evt) {
    var _PDFViewerApplication6;

    if ((_PDFViewerApplication6 = PDFViewerApplication.pdfViewer) !== null && _PDFViewerApplication6 !== void 0 && _PDFViewerApplication6.isInPresentationMode) {
      return;
    }

    var file = evt.fileInput.files[0];

    if (!_app_options.compatibilityParams.disableCreateObjectURL) {
      var url = URL.createObjectURL(file);

      if (file.name) {
        url = {
          url: url,
          originalUrl: file.name
        };
      }

      PDFViewerApplication.open(url);
    } else {
      PDFViewerApplication.setTitleUsingUrl(file.name);
      var fileReader = new FileReader();

      fileReader.onload = function webViewerChangeFileReaderOnload(event) {
        var buffer = event.target.result;
        PDFViewerApplication.open(new Uint8Array(buffer));
      };

      fileReader.readAsArrayBuffer(file);
    }
  };

  webViewerOpenFile = function webViewerOpenFile(evt) {
    var openFileInputName = PDFViewerApplication.appConfig.openFileInputName;
    document.getElementById(openFileInputName).click();
  };
}

function webViewerPresentationMode() {
  PDFViewerApplication.requestPresentationMode();
}

function webViewerPrint() {
  PDFViewerApplication.triggerPrinting();
}

function webViewerDownload() {
  PDFViewerApplication.downloadOrSave({
    sourceEventType: "download"
  });
}

function webViewerSave() {
  PDFViewerApplication.downloadOrSave({
    sourceEventType: "save"
  });
}

function webViewerFirstPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = 1;
  }
}

function webViewerLastPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = PDFViewerApplication.pagesCount;
  }
}

function webViewerNextPage() {
  PDFViewerApplication.pdfViewer.nextPage();
}

function webViewerPreviousPage() {
  PDFViewerApplication.pdfViewer.previousPage();
}

function webViewerZoomIn() {
  PDFViewerApplication.zoomIn();
}

function webViewerZoomOut() {
  PDFViewerApplication.zoomOut();
}

function webViewerZoomReset() {
  PDFViewerApplication.zoomReset();
}

function webViewerPageNumberChanged(evt) {
  var pdfViewer = PDFViewerApplication.pdfViewer;

  if (evt.value !== "") {
    PDFViewerApplication.pdfLinkService.goToPage(evt.value);
  }

  if (evt.value !== pdfViewer.currentPageNumber.toString() && evt.value !== pdfViewer.currentPageLabel) {
    PDFViewerApplication.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  }
}

function webViewerScaleChanged(evt) {
  PDFViewerApplication.pdfViewer.currentScaleValue = evt.value;
}

function webViewerRotateCw() {
  PDFViewerApplication.rotatePages(90);
}

function webViewerRotateCcw() {
  PDFViewerApplication.rotatePages(-90);
}

function webViewerOptionalContentConfig(evt) {
  PDFViewerApplication.pdfViewer.optionalContentConfigPromise = evt.promise;
}

function webViewerSwitchScrollMode(evt) {
  PDFViewerApplication.pdfViewer.scrollMode = evt.mode;
}

function webViewerSwitchSpreadMode(evt) {
  PDFViewerApplication.pdfViewer.spreadMode = evt.mode;
}

function webViewerDocumentProperties() {
  PDFViewerApplication.pdfDocumentProperties.open();
}

function webViewerFindFromUrlHash(evt) {
  PDFViewerApplication.eventBus.dispatch("find", {
    source: evt.source,
    type: "",
    query: evt.query,
    phraseSearch: evt.phraseSearch,
    caseSensitive: false,
    entireWord: false,
    highlightAll: true,
    findPrevious: false
  });
}

function webViewerUpdateFindMatchesCount(_ref13) {
  var matchesCount = _ref13.matchesCount;

  if (PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.externalServices.updateFindMatchesCount(matchesCount);
  } else {
    PDFViewerApplication.findBar.updateResultsCount(matchesCount);
  }
}

function webViewerUpdateFindControlState(_ref14) {
  var state = _ref14.state,
      previous = _ref14.previous,
      matchesCount = _ref14.matchesCount,
      rawQuery = _ref14.rawQuery;

  if (PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.externalServices.updateFindControlState({
      result: state,
      findPrevious: previous,
      matchesCount: matchesCount,
      rawQuery: rawQuery
    });
  } else {
    PDFViewerApplication.findBar.updateUIState(state, previous, matchesCount);
  }
}

function webViewerScaleChanging(evt) {
  PDFViewerApplication.toolbar.setPageScale(evt.presetValue, evt.scale);
  PDFViewerApplication.pdfViewer.update();
}

function webViewerRotationChanging(evt) {
  PDFViewerApplication.pdfThumbnailViewer.pagesRotation = evt.pagesRotation;
  PDFViewerApplication.forceRendering();
  PDFViewerApplication.pdfViewer.currentPageNumber = evt.pageNumber;
}

function webViewerPageChanging(_ref15) {
  var pageNumber = _ref15.pageNumber,
      pageLabel = _ref15.pageLabel;
  PDFViewerApplication.toolbar.setPageNumber(pageNumber, pageLabel);
  PDFViewerApplication.secondaryToolbar.setPageNumber(pageNumber);

  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(pageNumber);
  }
}

function webViewerVisibilityChange(evt) {
  if (document.visibilityState === "visible") {
    setZoomDisabledTimeout();
  }
}

var zoomDisabledTimeout = null;

function setZoomDisabledTimeout() {
  if (zoomDisabledTimeout) {
    clearTimeout(zoomDisabledTimeout);
  }

  zoomDisabledTimeout = setTimeout(function () {
    zoomDisabledTimeout = null;
  }, WHEEL_ZOOM_DISABLED_TIMEOUT);
}

function webViewerWheel(evt) {
  var pdfViewer = PDFViewerApplication.pdfViewer,
      supportedMouseWheelZoomModifierKeys = PDFViewerApplication.supportedMouseWheelZoomModifierKeys;

  if (pdfViewer.isInPresentationMode) {
    return;
  }

  if (evt.ctrlKey && supportedMouseWheelZoomModifierKeys.ctrlKey || evt.metaKey && supportedMouseWheelZoomModifierKeys.metaKey) {
    evt.preventDefault();

    if (zoomDisabledTimeout || document.visibilityState === "hidden") {
      return;
    }

    var previousScale = pdfViewer.currentScale;
    var delta = (0, _ui_utils.normalizeWheelEventDirection)(evt);
    var ticks = 0;

    if (evt.deltaMode === WheelEvent.DOM_DELTA_LINE || evt.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      if (Math.abs(delta) >= 1) {
        ticks = Math.sign(delta);
      } else {
        ticks = PDFViewerApplication.accumulateWheelTicks(delta);
      }
    } else {
      var PIXELS_PER_LINE_SCALE = 30;
      ticks = PDFViewerApplication.accumulateWheelTicks(delta / PIXELS_PER_LINE_SCALE);
    }

    if (ticks < 0) {
      PDFViewerApplication.zoomOut(-ticks);
    } else if (ticks > 0) {
      PDFViewerApplication.zoomIn(ticks);
    }

    var currentScale = pdfViewer.currentScale;

    if (previousScale !== currentScale) {
      var scaleCorrectionFactor = currentScale / previousScale - 1;
      var rect = pdfViewer.container.getBoundingClientRect();
      var dx = evt.clientX - rect.left;
      var dy = evt.clientY - rect.top;
      pdfViewer.container.scrollLeft += dx * scaleCorrectionFactor;
      pdfViewer.container.scrollTop += dy * scaleCorrectionFactor;
    }
  } else {
    setZoomDisabledTimeout();
  }
}

function webViewerTouchStart(evt) {
  if (evt.touches.length > 1) {
    evt.preventDefault();
  }
}

function webViewerClick(evt) {
  if (!PDFViewerApplication.secondaryToolbar.isOpen) {
    return;
  }

  var appConfig = PDFViewerApplication.appConfig;

  if (PDFViewerApplication.pdfViewer.containsElement(evt.target) || appConfig.toolbar.container.contains(evt.target) && evt.target !== appConfig.secondaryToolbar.toggleButton) {
    PDFViewerApplication.secondaryToolbar.close();
  }
}

function webViewerKeyDown(evt) {
  if (PDFViewerApplication.overlayManager.active) {
    return;
  }

  var eventBus = PDFViewerApplication.eventBus,
      pdfViewer = PDFViewerApplication.pdfViewer;
  var isViewerInPresentationMode = pdfViewer.isInPresentationMode;
  var handled = false,
      ensureViewerFocused = false;
  var cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);

  if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
    switch (evt.keyCode) {
      case 70:
        if (!PDFViewerApplication.supportsIntegratedFind && !evt.shiftKey) {
          PDFViewerApplication.findBar.open();
          handled = true;
        }

        break;

      case 71:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          var state = PDFViewerApplication.findController.state;

          if (state) {
            var eventState = Object.assign(Object.create(null), state, {
              source: window,
              type: "again",
              findPrevious: cmd === 5 || cmd === 12
            });
            eventBus.dispatch("find", eventState);
          }

          handled = true;
        }

        break;

      case 61:
      case 107:
      case 187:
      case 171:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomIn();
        }

        handled = true;
        break;

      case 173:
      case 109:
      case 189:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomOut();
        }

        handled = true;
        break;

      case 48:
      case 96:
        if (!isViewerInPresentationMode) {
          setTimeout(function () {
            PDFViewerApplication.zoomReset();
          });
          handled = false;
        }

        break;

      case 38:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 40:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }

        break;
    }
  }

  if (cmd === 1 || cmd === 8) {
    switch (evt.keyCode) {
      case 83:
        eventBus.dispatch("download", {
          source: window
        });
        handled = true;
        break;

      case 79:
        {
          eventBus.dispatch("openfile", {
            source: window
          });
          handled = true;
        }
        break;
    }
  }

  if (cmd === 3 || cmd === 10) {
    switch (evt.keyCode) {
      case 80:
        PDFViewerApplication.requestPresentationMode();
        handled = true;
        break;

      case 71:
        PDFViewerApplication.appConfig.toolbar.pageNumber.select();
        handled = true;
        break;
    }
  }

  if (handled) {
    if (ensureViewerFocused && !isViewerInPresentationMode) {
      pdfViewer.focus();
    }

    evt.preventDefault();
    return;
  }

  var curElement = (0, _ui_utils.getActiveOrFocusedElement)();
  var curElementTagName = curElement === null || curElement === void 0 ? void 0 : curElement.tagName.toUpperCase();

  if (curElementTagName === "INPUT" || curElementTagName === "TEXTAREA" || curElementTagName === "SELECT" || curElement !== null && curElement !== void 0 && curElement.isContentEditable) {
    if (evt.keyCode !== 27) {
      return;
    }
  }

  if (cmd === 0) {
    var turnPage = 0,
        turnOnlyIfPageFit = false;

    switch (evt.keyCode) {
      case 38:
      case 33:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

        turnPage = -1;
        break;

      case 8:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }

        turnPage = -1;
        break;

      case 37:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

      case 75:
      case 80:
        turnPage = -1;
        break;

      case 27:
        if (PDFViewerApplication.secondaryToolbar.isOpen) {
          PDFViewerApplication.secondaryToolbar.close();
          handled = true;
        }

        if (!PDFViewerApplication.supportsIntegratedFind && PDFViewerApplication.findBar.opened) {
          PDFViewerApplication.findBar.close();
          handled = true;
        }

        break;

      case 40:
      case 34:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

        turnPage = 1;
        break;

      case 13:
      case 32:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }

        turnPage = 1;
        break;

      case 39:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

      case 74:
      case 78:
        turnPage = 1;
        break;

      case 36:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 35:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 83:
        PDFViewerApplication.pdfCursorTools.switchTool(_pdf_cursor_tools.CursorTool.SELECT);
        break;

      case 72:
        PDFViewerApplication.pdfCursorTools.switchTool(_pdf_cursor_tools.CursorTool.HAND);
        break;

      case 82:
        PDFViewerApplication.rotatePages(90);
        break;

      case 115:
        PDFViewerApplication.pdfSidebar.toggle();
        break;
    }

    if (turnPage !== 0 && (!turnOnlyIfPageFit || pdfViewer.currentScaleValue === "page-fit")) {
      if (turnPage > 0) {
        pdfViewer.nextPage();
      } else {
        pdfViewer.previousPage();
      }

      handled = true;
    }
  }

  if (cmd === 4) {
    switch (evt.keyCode) {
      case 13:
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== "page-fit") {
          break;
        }

        pdfViewer.previousPage();
        handled = true;
        break;

      case 82:
        PDFViewerApplication.rotatePages(-90);
        break;
    }
  }

  if (!handled && !isViewerInPresentationMode) {
    if (evt.keyCode >= 33 && evt.keyCode <= 40 || evt.keyCode === 32 && curElementTagName !== "BUTTON") {
      ensureViewerFocused = true;
    }
  }

  if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
    pdfViewer.focus();
  }

  if (handled) {
    evt.preventDefault();
  }
}

function beforeUnload(evt) {
  evt.preventDefault();
  evt.returnValue = "";
  return false;
}

var PDFPrintServiceFactory = {
  instance: {
    supportsPrinting: false,
    createPrintService: function createPrintService() {
      throw new Error("Not implemented: createPrintService");
    }
  }
};
exports.PDFPrintServiceFactory = PDFPrintServiceFactory;