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
exports.build = exports.RenderTask = exports.PDFWorker = exports.PDFPageProxy = exports.PDFDocumentProxy = exports.PDFDocumentLoadingTask = exports.PDFDataRangeTransport = exports.LoopbackPort = exports.DefaultStandardFontDataFactory = exports.DefaultCanvasFactory = exports.DefaultCMapReaderFactory = void 0;
exports.getDocument = getDocument;
exports.setPDFNetworkStreamFactory = setPDFNetworkStreamFactory;
exports.version = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util.js");

var _display_utils = require("./display_utils.js");

var _font_loader = require("./font_loader.js");

var _node_utils = require("./node_utils.js");

var _annotation_storage = require("./annotation_storage.js");

var _canvas = require("./canvas.js");

var _worker_options = require("./worker_options.js");

var _is_node = require("../shared/is_node.js");

var _message_handler = require("../shared/message_handler.js");

var _metadata = require("./metadata.js");

var _optional_content_config = require("./optional_content_config.js");

var _transport_stream = require("./transport_stream.js");

var _xfa_text = require("./xfa_text.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var DEFAULT_RANGE_CHUNK_SIZE = 65536;
var RENDERING_CANCELLED_TIMEOUT = 100;
var DefaultCanvasFactory = _is_node.isNodeJS ? _node_utils.NodeCanvasFactory : _display_utils.DOMCanvasFactory;
exports.DefaultCanvasFactory = DefaultCanvasFactory;
var DefaultCMapReaderFactory = _is_node.isNodeJS ? _node_utils.NodeCMapReaderFactory : _display_utils.DOMCMapReaderFactory;
exports.DefaultCMapReaderFactory = DefaultCMapReaderFactory;
var DefaultStandardFontDataFactory = _is_node.isNodeJS ? _node_utils.NodeStandardFontDataFactory : _display_utils.DOMStandardFontDataFactory;
exports.DefaultStandardFontDataFactory = DefaultStandardFontDataFactory;
var createPDFNetworkStream;

function setPDFNetworkStreamFactory(pdfNetworkStreamFactory) {
  createPDFNetworkStream = pdfNetworkStreamFactory;
}

function getDocument(src) {
  var task = new PDFDocumentLoadingTask();
  var source;

  if (typeof src === "string" || src instanceof URL) {
    source = {
      url: src
    };
  } else if ((0, _util.isArrayBuffer)(src)) {
    source = {
      data: src
    };
  } else if (src instanceof PDFDataRangeTransport) {
    source = {
      range: src
    };
  } else {
    if (_typeof(src) !== "object") {
      throw new Error("Invalid parameter in getDocument, " + "need either string, URL, Uint8Array, or parameter object.");
    }

    if (!src.url && !src.data && !src.range) {
      throw new Error("Invalid parameter object: need either .data, .range or .url");
    }

    source = src;
  }

  var params = Object.create(null);
  var rangeTransport = null,
      worker = null;

  for (var key in source) {
    var value = source[key];

    switch (key) {
      case "url":
        if (typeof window !== "undefined") {
          try {
            params[key] = new URL(value, window.location).href;
            continue;
          } catch (ex) {
            (0, _util.warn)("Cannot create valid URL: \"".concat(ex, "\"."));
          }
        } else if (typeof value === "string" || value instanceof URL) {
          params[key] = value.toString();
          continue;
        }

        throw new Error("Invalid PDF url data: " + "either string or URL-object is expected in the url property.");

      case "range":
        rangeTransport = value;
        continue;

      case "worker":
        worker = value;
        continue;

      case "data":
        if (_is_node.isNodeJS && typeof Buffer !== "undefined" && value instanceof Buffer) {
          params[key] = new Uint8Array(value);
        } else if (value instanceof Uint8Array) {
          break;
        } else if (typeof value === "string") {
          params[key] = (0, _util.stringToBytes)(value);
        } else if (_typeof(value) === "object" && value !== null && !isNaN(value.length)) {
          params[key] = new Uint8Array(value);
        } else if ((0, _util.isArrayBuffer)(value)) {
          params[key] = new Uint8Array(value);
        } else {
          throw new Error("Invalid PDF binary data: either typed array, " + "string, or array-like object is expected in the data property.");
        }

        continue;
    }

    params[key] = value;
  }

  params.rangeChunkSize = params.rangeChunkSize || DEFAULT_RANGE_CHUNK_SIZE;
  params.CMapReaderFactory = params.CMapReaderFactory || DefaultCMapReaderFactory;
  params.StandardFontDataFactory = params.StandardFontDataFactory || DefaultStandardFontDataFactory;
  params.ignoreErrors = params.stopAtErrors !== true;
  params.fontExtraProperties = params.fontExtraProperties === true;
  params.pdfBug = params.pdfBug === true;
  params.enableXfa = params.enableXfa === true;

  if (typeof params.docBaseUrl !== "string" || (0, _display_utils.isDataScheme)(params.docBaseUrl)) {
    params.docBaseUrl = null;
  }

  if (!Number.isInteger(params.maxImageSize)) {
    params.maxImageSize = -1;
  }

  if (typeof params.useWorkerFetch !== "boolean") {
    params.useWorkerFetch = params.CMapReaderFactory === _display_utils.DOMCMapReaderFactory && params.StandardFontDataFactory === _display_utils.DOMStandardFontDataFactory;
  }

  if (typeof params.isEvalSupported !== "boolean") {
    params.isEvalSupported = true;
  }

  if (typeof params.disableFontFace !== "boolean") {
    params.disableFontFace = _is_node.isNodeJS;
  }

  if (typeof params.useSystemFonts !== "boolean") {
    params.useSystemFonts = !_is_node.isNodeJS && !params.disableFontFace;
  }

  if (typeof params.ownerDocument === "undefined") {
    params.ownerDocument = globalThis.document;
  }

  if (typeof params.disableRange !== "boolean") {
    params.disableRange = false;
  }

  if (typeof params.disableStream !== "boolean") {
    params.disableStream = false;
  }

  if (typeof params.disableAutoFetch !== "boolean") {
    params.disableAutoFetch = false;
  }

  (0, _util.setVerbosityLevel)(params.verbosity);

  if (!worker) {
    var workerParams = {
      verbosity: params.verbosity,
      port: _worker_options.GlobalWorkerOptions.workerPort
    };
    worker = workerParams.port ? PDFWorker.fromPort(workerParams) : new PDFWorker(workerParams);
    task._worker = worker;
  }

  var docId = task.docId;
  worker.promise.then(function () {
    if (task.destroyed) {
      throw new Error("Loading aborted");
    }

    var workerIdPromise = _fetchDocument(worker, params, rangeTransport, docId);

    var networkStreamPromise = new Promise(function (resolve) {
      var networkStream;

      if (rangeTransport) {
        networkStream = new _transport_stream.PDFDataTransportStream({
          length: params.length,
          initialData: params.initialData,
          progressiveDone: params.progressiveDone,
          contentDispositionFilename: params.contentDispositionFilename,
          disableRange: params.disableRange,
          disableStream: params.disableStream
        }, rangeTransport);
      } else if (!params.data) {
        networkStream = createPDFNetworkStream({
          url: params.url,
          length: params.length,
          httpHeaders: params.httpHeaders,
          withCredentials: params.withCredentials,
          rangeChunkSize: params.rangeChunkSize,
          disableRange: params.disableRange,
          disableStream: params.disableStream
        });
      }

      resolve(networkStream);
    });
    return Promise.all([workerIdPromise, networkStreamPromise]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          workerId = _ref2[0],
          networkStream = _ref2[1];

      if (task.destroyed) {
        throw new Error("Loading aborted");
      }

      var messageHandler = new _message_handler.MessageHandler(docId, workerId, worker.port);
      var transport = new WorkerTransport(messageHandler, task, networkStream, params);
      task._transport = transport;
      messageHandler.send("Ready", null);
    });
  })["catch"](task._capability.reject);
  return task;
}

function _fetchDocument(_x, _x2, _x3, _x4) {
  return _fetchDocument2.apply(this, arguments);
}

function _fetchDocument2() {
  _fetchDocument2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7(worker, source, pdfDataRangeTransport, docId) {
    var workerId;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!worker.destroyed) {
              _context7.next = 2;
              break;
            }

            throw new Error("Worker was destroyed");

          case 2:
            if (pdfDataRangeTransport) {
              source.length = pdfDataRangeTransport.length;
              source.initialData = pdfDataRangeTransport.initialData;
              source.progressiveDone = pdfDataRangeTransport.progressiveDone;
              source.contentDispositionFilename = pdfDataRangeTransport.contentDispositionFilename;
            }

            _context7.next = 5;
            return worker.messageHandler.sendWithPromise("GetDocRequest", {
              docId: docId,
              apiVersion: null,
              source: {
                data: source.data,
                url: source.url,
                password: source.password,
                disableAutoFetch: source.disableAutoFetch,
                rangeChunkSize: source.rangeChunkSize,
                length: source.length
              },
              maxImageSize: source.maxImageSize,
              disableFontFace: source.disableFontFace,
              docBaseUrl: source.docBaseUrl,
              ignoreErrors: source.ignoreErrors,
              isEvalSupported: source.isEvalSupported,
              fontExtraProperties: source.fontExtraProperties,
              enableXfa: source.enableXfa,
              useSystemFonts: source.useSystemFonts,
              cMapUrl: source.useWorkerFetch ? source.cMapUrl : null,
              standardFontDataUrl: source.useWorkerFetch ? source.standardFontDataUrl : null
            });

          case 5:
            workerId = _context7.sent;

            if (!worker.destroyed) {
              _context7.next = 8;
              break;
            }

            throw new Error("Worker was destroyed");

          case 8:
            return _context7.abrupt("return", workerId);

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _fetchDocument2.apply(this, arguments);
}

var PDFDocumentLoadingTask = /*#__PURE__*/function () {
  function PDFDocumentLoadingTask() {
    _classCallCheck(this, PDFDocumentLoadingTask);

    this._capability = (0, _util.createPromiseCapability)();
    this._transport = null;
    this._worker = null;
    this.docId = "d".concat(PDFDocumentLoadingTask.idCounters.doc++);
    this.destroyed = false;
    this.onPassword = null;
    this.onProgress = null;
    this.onUnsupportedFeature = null;
  }

  _createClass(PDFDocumentLoadingTask, [{
    key: "promise",
    get: function get() {
      return this._capability.promise;
    }
  }, {
    key: "destroy",
    value: function () {
      var _destroy = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this$_transport;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.destroyed = true;
                _context.next = 3;
                return (_this$_transport = this._transport) === null || _this$_transport === void 0 ? void 0 : _this$_transport.destroy();

              case 3:
                this._transport = null;

                if (this._worker) {
                  this._worker.destroy();

                  this._worker = null;
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function destroy() {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
  }], [{
    key: "idCounters",
    get: function get() {
      return (0, _util.shadow)(this, "idCounters", {
        doc: 0
      });
    }
  }]);

  return PDFDocumentLoadingTask;
}();

exports.PDFDocumentLoadingTask = PDFDocumentLoadingTask;

var PDFDataRangeTransport = /*#__PURE__*/function () {
  function PDFDataRangeTransport(length, initialData) {
    var progressiveDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var contentDispositionFilename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, PDFDataRangeTransport);

    this.length = length;
    this.initialData = initialData;
    this.progressiveDone = progressiveDone;
    this.contentDispositionFilename = contentDispositionFilename;
    this._rangeListeners = [];
    this._progressListeners = [];
    this._progressiveReadListeners = [];
    this._progressiveDoneListeners = [];
    this._readyCapability = (0, _util.createPromiseCapability)();
  }

  _createClass(PDFDataRangeTransport, [{
    key: "addRangeListener",
    value: function addRangeListener(listener) {
      this._rangeListeners.push(listener);
    }
  }, {
    key: "addProgressListener",
    value: function addProgressListener(listener) {
      this._progressListeners.push(listener);
    }
  }, {
    key: "addProgressiveReadListener",
    value: function addProgressiveReadListener(listener) {
      this._progressiveReadListeners.push(listener);
    }
  }, {
    key: "addProgressiveDoneListener",
    value: function addProgressiveDoneListener(listener) {
      this._progressiveDoneListeners.push(listener);
    }
  }, {
    key: "onDataRange",
    value: function onDataRange(begin, chunk) {
      var _iterator = _createForOfIteratorHelper(this._rangeListeners),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listener = _step.value;
          listener(begin, chunk);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "onDataProgress",
    value: function onDataProgress(loaded, total) {
      var _this = this;

      this._readyCapability.promise.then(function () {
        var _iterator2 = _createForOfIteratorHelper(_this._progressListeners),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var listener = _step2.value;
            listener(loaded, total);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      });
    }
  }, {
    key: "onDataProgressiveRead",
    value: function onDataProgressiveRead(chunk) {
      var _this2 = this;

      this._readyCapability.promise.then(function () {
        var _iterator3 = _createForOfIteratorHelper(_this2._progressiveReadListeners),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var listener = _step3.value;
            listener(chunk);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
    }
  }, {
    key: "onDataProgressiveDone",
    value: function onDataProgressiveDone() {
      var _this3 = this;

      this._readyCapability.promise.then(function () {
        var _iterator4 = _createForOfIteratorHelper(_this3._progressiveDoneListeners),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var listener = _step4.value;
            listener();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      });
    }
  }, {
    key: "transportReady",
    value: function transportReady() {
      this._readyCapability.resolve();
    }
  }, {
    key: "requestDataRange",
    value: function requestDataRange(begin, end) {
      (0, _util.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
    }
  }, {
    key: "abort",
    value: function abort() {}
  }]);

  return PDFDataRangeTransport;
}();

exports.PDFDataRangeTransport = PDFDataRangeTransport;

var PDFDocumentProxy = /*#__PURE__*/function () {
  function PDFDocumentProxy(pdfInfo, transport) {
    var _this4 = this;

    _classCallCheck(this, PDFDocumentProxy);

    this._pdfInfo = pdfInfo;
    this._transport = transport;
    Object.defineProperty(this, "fingerprint", {
      get: function get() {
        (0, _display_utils.deprecated)("`PDFDocumentProxy.fingerprint`, " + "please use `PDFDocumentProxy.fingerprints` instead.");
        return this.fingerprints[0];
      }
    });
    Object.defineProperty(this, "getStats", {
      value: function () {
        var _value = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  (0, _display_utils.deprecated)("`PDFDocumentProxy.getStats`, " + "please use the `PDFDocumentProxy.stats`-getter instead.");
                  return _context2.abrupt("return", _this4.stats || {
                    streamTypes: {},
                    fontTypes: {}
                  });

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function value() {
          return _value.apply(this, arguments);
        }

        return value;
      }()
    });
  }

  _createClass(PDFDocumentProxy, [{
    key: "annotationStorage",
    get: function get() {
      return this._transport.annotationStorage;
    }
  }, {
    key: "numPages",
    get: function get() {
      return this._pdfInfo.numPages;
    }
  }, {
    key: "fingerprints",
    get: function get() {
      return this._pdfInfo.fingerprints;
    }
  }, {
    key: "stats",
    get: function get() {
      return this._transport.stats;
    }
  }, {
    key: "isPureXfa",
    get: function get() {
      return !!this._transport._htmlForXfa;
    }
  }, {
    key: "allXfaHtml",
    get: function get() {
      return this._transport._htmlForXfa;
    }
  }, {
    key: "getPage",
    value: function getPage(pageNumber) {
      return this._transport.getPage(pageNumber);
    }
  }, {
    key: "getPageIndex",
    value: function getPageIndex(ref) {
      return this._transport.getPageIndex(ref);
    }
  }, {
    key: "getDestinations",
    value: function getDestinations() {
      return this._transport.getDestinations();
    }
  }, {
    key: "getDestination",
    value: function getDestination(id) {
      return this._transport.getDestination(id);
    }
  }, {
    key: "getPageLabels",
    value: function getPageLabels() {
      return this._transport.getPageLabels();
    }
  }, {
    key: "getPageLayout",
    value: function getPageLayout() {
      return this._transport.getPageLayout();
    }
  }, {
    key: "getPageMode",
    value: function getPageMode() {
      return this._transport.getPageMode();
    }
  }, {
    key: "getViewerPreferences",
    value: function getViewerPreferences() {
      return this._transport.getViewerPreferences();
    }
  }, {
    key: "getOpenAction",
    value: function getOpenAction() {
      return this._transport.getOpenAction();
    }
  }, {
    key: "getAttachments",
    value: function getAttachments() {
      return this._transport.getAttachments();
    }
  }, {
    key: "getJavaScript",
    value: function getJavaScript() {
      return this._transport.getJavaScript();
    }
  }, {
    key: "getJSActions",
    value: function getJSActions() {
      return this._transport.getDocJSActions();
    }
  }, {
    key: "getOutline",
    value: function getOutline() {
      return this._transport.getOutline();
    }
  }, {
    key: "getOptionalContentConfig",
    value: function getOptionalContentConfig() {
      return this._transport.getOptionalContentConfig();
    }
  }, {
    key: "getPermissions",
    value: function getPermissions() {
      return this._transport.getPermissions();
    }
  }, {
    key: "getMetadata",
    value: function getMetadata() {
      return this._transport.getMetadata();
    }
  }, {
    key: "getMarkInfo",
    value: function getMarkInfo() {
      return this._transport.getMarkInfo();
    }
  }, {
    key: "getData",
    value: function getData() {
      return this._transport.getData();
    }
  }, {
    key: "getDownloadInfo",
    value: function getDownloadInfo() {
      return this._transport.downloadInfoCapability.promise;
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      var keepLoadedFonts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this._transport.startCleanup(keepLoadedFonts || this.isPureXfa);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      return this.loadingTask.destroy();
    }
  }, {
    key: "loadingParams",
    get: function get() {
      return this._transport.loadingParams;
    }
  }, {
    key: "loadingTask",
    get: function get() {
      return this._transport.loadingTask;
    }
  }, {
    key: "saveDocument",
    value: function saveDocument() {
      if (this._transport.annotationStorage.size <= 0) {
        (0, _display_utils.deprecated)("saveDocument called while `annotationStorage` is empty, " + "please use the getData-method instead.");
      }

      return this._transport.saveDocument();
    }
  }, {
    key: "getFieldObjects",
    value: function getFieldObjects() {
      return this._transport.getFieldObjects();
    }
  }, {
    key: "hasJSActions",
    value: function hasJSActions() {
      return this._transport.hasJSActions();
    }
  }, {
    key: "getCalculationOrderIds",
    value: function getCalculationOrderIds() {
      return this._transport.getCalculationOrderIds();
    }
  }]);

  return PDFDocumentProxy;
}();

exports.PDFDocumentProxy = PDFDocumentProxy;

var PDFPageProxy = /*#__PURE__*/function () {
  function PDFPageProxy(pageIndex, pageInfo, transport, ownerDocument) {
    var pdfBug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, PDFPageProxy);

    this._pageIndex = pageIndex;
    this._pageInfo = pageInfo;
    this._ownerDocument = ownerDocument;
    this._transport = transport;
    this._stats = pdfBug ? new _display_utils.StatTimer() : null;
    this._pdfBug = pdfBug;
    this.commonObjs = transport.commonObjs;
    this.objs = new PDFObjects();
    this.cleanupAfterRender = false;
    this.pendingCleanup = false;
    this._intentStates = new Map();
    this._annotationPromises = new Map();
    this.destroyed = false;
  }

  _createClass(PDFPageProxy, [{
    key: "pageNumber",
    get: function get() {
      return this._pageIndex + 1;
    }
  }, {
    key: "rotate",
    get: function get() {
      return this._pageInfo.rotate;
    }
  }, {
    key: "ref",
    get: function get() {
      return this._pageInfo.ref;
    }
  }, {
    key: "userUnit",
    get: function get() {
      return this._pageInfo.userUnit;
    }
  }, {
    key: "view",
    get: function get() {
      return this._pageInfo.view;
    }
  }, {
    key: "getViewport",
    value: function getViewport() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          scale = _ref3.scale,
          _ref3$rotation = _ref3.rotation,
          rotation = _ref3$rotation === void 0 ? this.rotate : _ref3$rotation,
          _ref3$offsetX = _ref3.offsetX,
          offsetX = _ref3$offsetX === void 0 ? 0 : _ref3$offsetX,
          _ref3$offsetY = _ref3.offsetY,
          offsetY = _ref3$offsetY === void 0 ? 0 : _ref3$offsetY,
          _ref3$dontFlip = _ref3.dontFlip,
          dontFlip = _ref3$dontFlip === void 0 ? false : _ref3$dontFlip;

      return new _display_utils.PageViewport({
        viewBox: this.view,
        scale: scale,
        rotation: rotation,
        offsetX: offsetX,
        offsetY: offsetY,
        dontFlip: dontFlip
      });
    }
  }, {
    key: "getAnnotations",
    value: function getAnnotations() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$intent = _ref4.intent,
          intent = _ref4$intent === void 0 ? "display" : _ref4$intent;

      var intentArgs = this._transport.getRenderingIntent(intent);

      var promise = this._annotationPromises.get(intentArgs.cacheKey);

      if (!promise) {
        promise = this._transport.getAnnotations(this._pageIndex, intentArgs.renderingIntent);

        this._annotationPromises.set(intentArgs.cacheKey, promise);

        promise = promise.then(function (annotations) {
          var _iterator5 = _createForOfIteratorHelper(annotations),
              _step5;

          try {
            var _loop = function _loop() {
              var annotation = _step5.value;

              if (annotation.titleObj !== undefined) {
                Object.defineProperty(annotation, "title", {
                  get: function get() {
                    (0, _display_utils.deprecated)("`title`-property on annotation, please use `titleObj` instead.");
                    return annotation.titleObj.str;
                  }
                });
              }

              if (annotation.contentsObj !== undefined) {
                Object.defineProperty(annotation, "contents", {
                  get: function get() {
                    (0, _display_utils.deprecated)("`contents`-property on annotation, please use `contentsObj` instead.");
                    return annotation.contentsObj.str;
                  }
                });
              }
            };

            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          return annotations;
        });
      }

      return promise;
    }
  }, {
    key: "getJSActions",
    value: function getJSActions() {
      return this._jsActionsPromise || (this._jsActionsPromise = this._transport.getPageJSActions(this._pageIndex));
    }
  }, {
    key: "getXfa",
    value: function () {
      var _getXfa = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var _this$_transport$_htm;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", ((_this$_transport$_htm = this._transport._htmlForXfa) === null || _this$_transport$_htm === void 0 ? void 0 : _this$_transport$_htm.children[this._pageIndex]) || null);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getXfa() {
        return _getXfa.apply(this, arguments);
      }

      return getXfa;
    }()
  }, {
    key: "render",
    value: function render(_ref5) {
      var _arguments$,
          _arguments$2,
          _this5 = this,
          _intentState;

      var canvasContext = _ref5.canvasContext,
          viewport = _ref5.viewport,
          _ref5$intent = _ref5.intent,
          intent = _ref5$intent === void 0 ? "display" : _ref5$intent,
          _ref5$annotationMode = _ref5.annotationMode,
          annotationMode = _ref5$annotationMode === void 0 ? _util.AnnotationMode.ENABLE : _ref5$annotationMode,
          _ref5$transform = _ref5.transform,
          transform = _ref5$transform === void 0 ? null : _ref5$transform,
          _ref5$imageLayer = _ref5.imageLayer,
          imageLayer = _ref5$imageLayer === void 0 ? null : _ref5$imageLayer,
          _ref5$canvasFactory = _ref5.canvasFactory,
          canvasFactory = _ref5$canvasFactory === void 0 ? null : _ref5$canvasFactory,
          _ref5$background = _ref5.background,
          background = _ref5$background === void 0 ? null : _ref5$background,
          _ref5$optionalContent = _ref5.optionalContentConfigPromise,
          optionalContentConfigPromise = _ref5$optionalContent === void 0 ? null : _ref5$optionalContent,
          _ref5$annotationCanva = _ref5.annotationCanvasMap,
          annotationCanvasMap = _ref5$annotationCanva === void 0 ? null : _ref5$annotationCanva;

      if (((_arguments$ = arguments[0]) === null || _arguments$ === void 0 ? void 0 : _arguments$.renderInteractiveForms) !== undefined) {
        (0, _display_utils.deprecated)("render no longer accepts the `renderInteractiveForms`-option, " + "please use the `annotationMode`-option instead.");

        if (arguments[0].renderInteractiveForms === true && annotationMode === _util.AnnotationMode.ENABLE) {
          annotationMode = _util.AnnotationMode.ENABLE_FORMS;
        }
      }

      if (((_arguments$2 = arguments[0]) === null || _arguments$2 === void 0 ? void 0 : _arguments$2.includeAnnotationStorage) !== undefined) {
        (0, _display_utils.deprecated)("render no longer accepts the `includeAnnotationStorage`-option, " + "please use the `annotationMode`-option instead.");

        if (arguments[0].includeAnnotationStorage === true && annotationMode === _util.AnnotationMode.ENABLE) {
          annotationMode = _util.AnnotationMode.ENABLE_STORAGE;
        }
      }

      if (this._stats) {
        this._stats.time("Overall");
      }

      var intentArgs = this._transport.getRenderingIntent(intent, annotationMode);

      this.pendingCleanup = false;

      if (!optionalContentConfigPromise) {
        optionalContentConfigPromise = this._transport.getOptionalContentConfig();
      }

      var intentState = this._intentStates.get(intentArgs.cacheKey);

      if (!intentState) {
        intentState = Object.create(null);

        this._intentStates.set(intentArgs.cacheKey, intentState);
      }

      if (intentState.streamReaderCancelTimeout) {
        clearTimeout(intentState.streamReaderCancelTimeout);
        intentState.streamReaderCancelTimeout = null;
      }

      var canvasFactoryInstance = canvasFactory || new DefaultCanvasFactory({
        ownerDocument: this._ownerDocument
      });
      var intentPrint = !!(intentArgs.renderingIntent & _util.RenderingIntentFlag.PRINT);

      if (!intentState.displayReadyCapability) {
        intentState.displayReadyCapability = (0, _util.createPromiseCapability)();
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };

        if (this._stats) {
          this._stats.time("Page Request");
        }

        this._pumpOperatorList(intentArgs);
      }

      var complete = function complete(error) {
        intentState.renderTasks["delete"](internalRenderTask);

        if (_this5.cleanupAfterRender || intentPrint) {
          _this5.pendingCleanup = true;
        }

        _this5._tryCleanup();

        if (error) {
          internalRenderTask.capability.reject(error);

          _this5._abortOperatorList({
            intentState: intentState,
            reason: error instanceof Error ? error : new Error(error)
          });
        } else {
          internalRenderTask.capability.resolve();
        }

        if (_this5._stats) {
          _this5._stats.timeEnd("Rendering");

          _this5._stats.timeEnd("Overall");
        }
      };

      var internalRenderTask = new InternalRenderTask({
        callback: complete,
        params: {
          canvasContext: canvasContext,
          viewport: viewport,
          transform: transform,
          imageLayer: imageLayer,
          background: background
        },
        objs: this.objs,
        commonObjs: this.commonObjs,
        annotationCanvasMap: annotationCanvasMap,
        operatorList: intentState.operatorList,
        pageIndex: this._pageIndex,
        canvasFactory: canvasFactoryInstance,
        useRequestAnimationFrame: !intentPrint,
        pdfBug: this._pdfBug
      });
      ((_intentState = intentState).renderTasks || (_intentState.renderTasks = new Set())).add(internalRenderTask);
      var renderTask = internalRenderTask.task;
      Promise.all([intentState.displayReadyCapability.promise, optionalContentConfigPromise]).then(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            transparency = _ref7[0],
            optionalContentConfig = _ref7[1];

        if (_this5.pendingCleanup) {
          complete();
          return;
        }

        if (_this5._stats) {
          _this5._stats.time("Rendering");
        }

        internalRenderTask.initializeGraphics({
          transparency: transparency,
          optionalContentConfig: optionalContentConfig
        });
        internalRenderTask.operatorListChanged();
      })["catch"](complete);
      return renderTask;
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref8$intent = _ref8.intent,
          intent = _ref8$intent === void 0 ? "display" : _ref8$intent,
          _ref8$annotationMode = _ref8.annotationMode,
          annotationMode = _ref8$annotationMode === void 0 ? _util.AnnotationMode.ENABLE : _ref8$annotationMode;

      function operatorListChanged() {
        if (intentState.operatorList.lastChunk) {
          intentState.opListReadCapability.resolve(intentState.operatorList);
          intentState.renderTasks["delete"](opListTask);
        }
      }

      var intentArgs = this._transport.getRenderingIntent(intent, annotationMode, true);

      var intentState = this._intentStates.get(intentArgs.cacheKey);

      if (!intentState) {
        intentState = Object.create(null);

        this._intentStates.set(intentArgs.cacheKey, intentState);
      }

      var opListTask;

      if (!intentState.opListReadCapability) {
        var _intentState2;

        opListTask = Object.create(null);
        opListTask.operatorListChanged = operatorListChanged;
        intentState.opListReadCapability = (0, _util.createPromiseCapability)();
        ((_intentState2 = intentState).renderTasks || (_intentState2.renderTasks = new Set())).add(opListTask);
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };

        if (this._stats) {
          this._stats.time("Page Request");
        }

        this._pumpOperatorList(intentArgs);
      }

      return intentState.opListReadCapability.promise;
    }
  }, {
    key: "streamTextContent",
    value: function streamTextContent() {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref9$normalizeWhites = _ref9.normalizeWhitespace,
          normalizeWhitespace = _ref9$normalizeWhites === void 0 ? false : _ref9$normalizeWhites,
          _ref9$disableCombineT = _ref9.disableCombineTextItems,
          disableCombineTextItems = _ref9$disableCombineT === void 0 ? false : _ref9$disableCombineT,
          _ref9$includeMarkedCo = _ref9.includeMarkedContent,
          includeMarkedContent = _ref9$includeMarkedCo === void 0 ? false : _ref9$includeMarkedCo;

      var TEXT_CONTENT_CHUNK_SIZE = 100;
      return this._transport.messageHandler.sendWithStream("GetTextContent", {
        pageIndex: this._pageIndex,
        normalizeWhitespace: normalizeWhitespace === true,
        combineTextItems: disableCombineTextItems !== true,
        includeMarkedContent: includeMarkedContent === true
      }, {
        highWaterMark: TEXT_CONTENT_CHUNK_SIZE,
        size: function size(textContent) {
          return textContent.items.length;
        }
      });
    }
  }, {
    key: "getTextContent",
    value: function getTextContent() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this._transport._htmlForXfa) {
        return this.getXfa().then(function (xfa) {
          return _xfa_text.XfaText.textContent(xfa);
        });
      }

      var readableStream = this.streamTextContent(params);
      return new Promise(function (resolve, reject) {
        function pump() {
          reader.read().then(function (_ref10) {
            var _textContent$items;

            var value = _ref10.value,
                done = _ref10.done;

            if (done) {
              resolve(textContent);
              return;
            }

            Object.assign(textContent.styles, value.styles);

            (_textContent$items = textContent.items).push.apply(_textContent$items, _toConsumableArray(value.items));

            pump();
          }, reject);
        }

        var reader = readableStream.getReader();
        var textContent = {
          items: [],
          styles: Object.create(null)
        };
        pump();
      });
    }
  }, {
    key: "getStructTree",
    value: function getStructTree() {
      return this._structTreePromise || (this._structTreePromise = this._transport.getStructTree(this._pageIndex));
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      this.destroyed = true;
      var waitOn = [];

      var _iterator6 = _createForOfIteratorHelper(this._intentStates.values()),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var intentState = _step6.value;

          this._abortOperatorList({
            intentState: intentState,
            reason: new Error("Page was destroyed."),
            force: true
          });

          if (intentState.opListReadCapability) {
            continue;
          }

          var _iterator7 = _createForOfIteratorHelper(intentState.renderTasks),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var internalRenderTask = _step7.value;
              waitOn.push(internalRenderTask.completed);
              internalRenderTask.cancel();
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      this.objs.clear();

      this._annotationPromises.clear();

      this._jsActionsPromise = null;
      this._structTreePromise = null;
      this.pendingCleanup = false;
      return Promise.all(waitOn);
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      var resetStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.pendingCleanup = true;
      return this._tryCleanup(resetStats);
    }
  }, {
    key: "_tryCleanup",
    value: function _tryCleanup() {
      var resetStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.pendingCleanup) {
        return false;
      }

      var _iterator8 = _createForOfIteratorHelper(this._intentStates.values()),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _step8$value = _step8.value,
              renderTasks = _step8$value.renderTasks,
              operatorList = _step8$value.operatorList;

          if (renderTasks.size > 0 || !operatorList.lastChunk) {
            return false;
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      this._intentStates.clear();

      this.objs.clear();

      this._annotationPromises.clear();

      this._jsActionsPromise = null;
      this._structTreePromise = null;

      if (resetStats && this._stats) {
        this._stats = new _display_utils.StatTimer();
      }

      this.pendingCleanup = false;
      return true;
    }
  }, {
    key: "_startRenderPage",
    value: function _startRenderPage(transparency, cacheKey) {
      var intentState = this._intentStates.get(cacheKey);

      if (!intentState) {
        return;
      }

      if (this._stats) {
        this._stats.timeEnd("Page Request");
      }

      if (intentState.displayReadyCapability) {
        intentState.displayReadyCapability.resolve(transparency);
      }
    }
  }, {
    key: "_renderPageChunk",
    value: function _renderPageChunk(operatorListChunk, intentState) {
      for (var i = 0, ii = operatorListChunk.length; i < ii; i++) {
        intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]);
        intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i]);
      }

      intentState.operatorList.lastChunk = operatorListChunk.lastChunk;

      var _iterator9 = _createForOfIteratorHelper(intentState.renderTasks),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var internalRenderTask = _step9.value;
          internalRenderTask.operatorListChanged();
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      if (operatorListChunk.lastChunk) {
        this._tryCleanup();
      }
    }
  }, {
    key: "_pumpOperatorList",
    value: function _pumpOperatorList(_ref11) {
      var _this6 = this;

      var renderingIntent = _ref11.renderingIntent,
          cacheKey = _ref11.cacheKey;
      (0, _util.assert)(Number.isInteger(renderingIntent) && renderingIntent > 0, '_pumpOperatorList: Expected valid "renderingIntent" argument.');

      var readableStream = this._transport.messageHandler.sendWithStream("GetOperatorList", {
        pageIndex: this._pageIndex,
        intent: renderingIntent,
        cacheKey: cacheKey,
        annotationStorage: renderingIntent & _util.RenderingIntentFlag.ANNOTATIONS_STORAGE ? this._transport.annotationStorage.serializable : null
      });

      var reader = readableStream.getReader();

      var intentState = this._intentStates.get(cacheKey);

      intentState.streamReader = reader;

      var pump = function pump() {
        reader.read().then(function (_ref12) {
          var value = _ref12.value,
              done = _ref12.done;

          if (done) {
            intentState.streamReader = null;
            return;
          }

          if (_this6._transport.destroyed) {
            return;
          }

          _this6._renderPageChunk(value, intentState);

          pump();
        }, function (reason) {
          intentState.streamReader = null;

          if (_this6._transport.destroyed) {
            return;
          }

          if (intentState.operatorList) {
            intentState.operatorList.lastChunk = true;

            var _iterator10 = _createForOfIteratorHelper(intentState.renderTasks),
                _step10;

            try {
              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                var internalRenderTask = _step10.value;
                internalRenderTask.operatorListChanged();
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
            }

            _this6._tryCleanup();
          }

          if (intentState.displayReadyCapability) {
            intentState.displayReadyCapability.reject(reason);
          } else if (intentState.opListReadCapability) {
            intentState.opListReadCapability.reject(reason);
          } else {
            throw reason;
          }
        });
      };

      pump();
    }
  }, {
    key: "_abortOperatorList",
    value: function _abortOperatorList(_ref13) {
      var _this7 = this;

      var intentState = _ref13.intentState,
          reason = _ref13.reason,
          _ref13$force = _ref13.force,
          force = _ref13$force === void 0 ? false : _ref13$force;
      (0, _util.assert)(reason instanceof Error, '_abortOperatorList: Expected valid "reason" argument.');

      if (!intentState.streamReader) {
        return;
      }

      if (!force) {
        if (intentState.renderTasks.size > 0) {
          return;
        }

        if (reason instanceof _display_utils.RenderingCancelledException) {
          intentState.streamReaderCancelTimeout = setTimeout(function () {
            _this7._abortOperatorList({
              intentState: intentState,
              reason: reason,
              force: true
            });

            intentState.streamReaderCancelTimeout = null;
          }, RENDERING_CANCELLED_TIMEOUT);
          return;
        }
      }

      intentState.streamReader.cancel(new _util.AbortException(reason.message))["catch"](function () {});
      intentState.streamReader = null;

      if (this._transport.destroyed) {
        return;
      }

      var _iterator11 = _createForOfIteratorHelper(this._intentStates),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var _step11$value = _slicedToArray(_step11.value, 2),
              curCacheKey = _step11$value[0],
              curIntentState = _step11$value[1];

          if (curIntentState === intentState) {
            this._intentStates["delete"](curCacheKey);

            break;
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      this.cleanup();
    }
  }, {
    key: "stats",
    get: function get() {
      return this._stats;
    }
  }]);

  return PDFPageProxy;
}();

exports.PDFPageProxy = PDFPageProxy;

var LoopbackPort = /*#__PURE__*/function () {
  function LoopbackPort() {
    _classCallCheck(this, LoopbackPort);

    this._listeners = [];
    this._deferred = Promise.resolve();
  }

  _createClass(LoopbackPort, [{
    key: "postMessage",
    value: function postMessage(obj, transfers) {
      var _this8 = this;

      function cloneValue(object) {
        if (globalThis.structuredClone) {
          return globalThis.structuredClone(object, transfers);
        }

        function fallbackCloneValue(value) {
          if (typeof value === "function" || _typeof(value) === "symbol" || value instanceof URL) {
            throw new Error("LoopbackPort.postMessage - cannot clone: ".concat(value === null || value === void 0 ? void 0 : value.toString()));
          }

          if (_typeof(value) !== "object" || value === null) {
            return value;
          }

          if (cloned.has(value)) {
            return cloned.get(value);
          }

          var buffer, result;

          if ((buffer = value.buffer) && (0, _util.isArrayBuffer)(buffer)) {
            if (transfers !== null && transfers !== void 0 && transfers.includes(buffer)) {
              result = new value.constructor(buffer, value.byteOffset, value.byteLength);
            } else {
              result = new value.constructor(value);
            }

            cloned.set(value, result);
            return result;
          }

          if (value instanceof Map) {
            result = new Map();
            cloned.set(value, result);

            var _iterator12 = _createForOfIteratorHelper(value),
                _step12;

            try {
              for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                var _step12$value = _slicedToArray(_step12.value, 2),
                    key = _step12$value[0],
                    val = _step12$value[1];

                result.set(key, fallbackCloneValue(val));
              }
            } catch (err) {
              _iterator12.e(err);
            } finally {
              _iterator12.f();
            }

            return result;
          }

          if (value instanceof Set) {
            result = new Set();
            cloned.set(value, result);

            var _iterator13 = _createForOfIteratorHelper(value),
                _step13;

            try {
              for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                var _val = _step13.value;
                result.add(fallbackCloneValue(_val));
              }
            } catch (err) {
              _iterator13.e(err);
            } finally {
              _iterator13.f();
            }

            return result;
          }

          result = Array.isArray(value) ? [] : Object.create(null);
          cloned.set(value, result);

          for (var i in value) {
            var _value$hasOwnProperty;

            var desc = void 0,
                p = value;

            while (!(desc = Object.getOwnPropertyDescriptor(p, i))) {
              p = Object.getPrototypeOf(p);
            }

            if (typeof desc.value === "undefined") {
              continue;
            }

            if (typeof desc.value === "function" && !((_value$hasOwnProperty = value.hasOwnProperty) !== null && _value$hasOwnProperty !== void 0 && _value$hasOwnProperty.call(value, i))) {
              continue;
            }

            result[i] = fallbackCloneValue(desc.value);
          }

          return result;
        }

        var cloned = new WeakMap();
        return fallbackCloneValue(object);
      }

      var event = {
        data: cloneValue(obj)
      };

      this._deferred.then(function () {
        var _iterator14 = _createForOfIteratorHelper(_this8._listeners),
            _step14;

        try {
          for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
            var listener = _step14.value;
            listener.call(_this8, event);
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }
      });
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(name, listener) {
      this._listeners.push(listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(name, listener) {
      var i = this._listeners.indexOf(listener);

      this._listeners.splice(i, 1);
    }
  }, {
    key: "terminate",
    value: function terminate() {
      this._listeners.length = 0;
    }
  }]);

  return LoopbackPort;
}();

exports.LoopbackPort = LoopbackPort;
var PDFWorkerUtil = {
  isWorkerDisabled: false,
  fallbackWorkerSrc: null,
  fakeWorkerId: 0
};
{
  if (_is_node.isNodeJS && typeof require === "function") {
    PDFWorkerUtil.isWorkerDisabled = true;
    PDFWorkerUtil.fallbackWorkerSrc = "../pdf.worker.js";
  } else if ((typeof document === "undefined" ? "undefined" : _typeof(document)) === "object") {
    var _document, _document$currentScri;

    var pdfjsFilePath = (_document = document) === null || _document === void 0 ? void 0 : (_document$currentScri = _document.currentScript) === null || _document$currentScri === void 0 ? void 0 : _document$currentScri.src;

    if (pdfjsFilePath) {
      PDFWorkerUtil.fallbackWorkerSrc = pdfjsFilePath.replace(/(\.(?:min\.)?js)(\?.*)?$/i, ".worker$1$2");
    }
  }

  PDFWorkerUtil.createCDNWrapper = function (url) {
    var wrapper = "importScripts(\"".concat(url, "\");");
    return URL.createObjectURL(new Blob([wrapper]));
  };
}

var PDFWorker = /*#__PURE__*/function () {
  function PDFWorker() {
    var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref14$name = _ref14.name,
        name = _ref14$name === void 0 ? null : _ref14$name,
        _ref14$port = _ref14.port,
        port = _ref14$port === void 0 ? null : _ref14$port,
        _ref14$verbosity = _ref14.verbosity,
        verbosity = _ref14$verbosity === void 0 ? (0, _util.getVerbosityLevel)() : _ref14$verbosity;

    _classCallCheck(this, PDFWorker);

    if (port && PDFWorker._workerPorts.has(port)) {
      throw new Error("Cannot use more than one PDFWorker per port.");
    }

    this.name = name;
    this.destroyed = false;
    this.verbosity = verbosity;
    this._readyCapability = (0, _util.createPromiseCapability)();
    this._port = null;
    this._webWorker = null;
    this._messageHandler = null;

    if (port) {
      PDFWorker._workerPorts.set(port, this);

      this._initializeFromPort(port);

      return;
    }

    this._initialize();
  }

  _createClass(PDFWorker, [{
    key: "promise",
    get: function get() {
      return this._readyCapability.promise;
    }
  }, {
    key: "port",
    get: function get() {
      return this._port;
    }
  }, {
    key: "messageHandler",
    get: function get() {
      return this._messageHandler;
    }
  }, {
    key: "_initializeFromPort",
    value: function _initializeFromPort(port) {
      this._port = port;
      this._messageHandler = new _message_handler.MessageHandler("main", "worker", port);

      this._messageHandler.on("ready", function () {});

      this._readyCapability.resolve();
    }
  }, {
    key: "_initialize",
    value: function _initialize() {
      var _this9 = this;

      if (typeof Worker !== "undefined" && !PDFWorkerUtil.isWorkerDisabled && !PDFWorker._mainThreadWorkerMessageHandler) {
        var workerSrc = PDFWorker.workerSrc;

        try {
          if (!(0, _util.isSameOrigin)(window.location.href, workerSrc)) {
            workerSrc = PDFWorkerUtil.createCDNWrapper(new URL(workerSrc, window.location).href);
          }

          var worker = new Worker(workerSrc);
          var messageHandler = new _message_handler.MessageHandler("main", "worker", worker);

          var terminateEarly = function terminateEarly() {
            worker.removeEventListener("error", onWorkerError);
            messageHandler.destroy();
            worker.terminate();

            if (_this9.destroyed) {
              _this9._readyCapability.reject(new Error("Worker was destroyed"));
            } else {
              _this9._setupFakeWorker();
            }
          };

          var onWorkerError = function onWorkerError() {
            if (!_this9._webWorker) {
              terminateEarly();
            }
          };

          worker.addEventListener("error", onWorkerError);
          messageHandler.on("test", function (data) {
            worker.removeEventListener("error", onWorkerError);

            if (_this9.destroyed) {
              terminateEarly();
              return;
            }

            if (data) {
              _this9._messageHandler = messageHandler;
              _this9._port = worker;
              _this9._webWorker = worker;

              _this9._readyCapability.resolve();

              messageHandler.send("configure", {
                verbosity: _this9.verbosity
              });
            } else {
              _this9._setupFakeWorker();

              messageHandler.destroy();
              worker.terminate();
            }
          });
          messageHandler.on("ready", function (data) {
            worker.removeEventListener("error", onWorkerError);

            if (_this9.destroyed) {
              terminateEarly();
              return;
            }

            try {
              sendTest();
            } catch (e) {
              _this9._setupFakeWorker();
            }
          });

          var sendTest = function sendTest() {
            var testObj = new Uint8Array([255]);

            try {
              messageHandler.send("test", testObj, [testObj.buffer]);
            } catch (ex) {
              (0, _util.warn)("Cannot use postMessage transfers.");
              testObj[0] = 0;
              messageHandler.send("test", testObj);
            }
          };

          sendTest();
          return;
        } catch (e) {
          (0, _util.info)("The worker has been disabled.");
        }
      }

      this._setupFakeWorker();
    }
  }, {
    key: "_setupFakeWorker",
    value: function _setupFakeWorker() {
      var _this10 = this;

      if (!PDFWorkerUtil.isWorkerDisabled) {
        (0, _util.warn)("Setting up fake worker.");
        PDFWorkerUtil.isWorkerDisabled = true;
      }

      PDFWorker._setupFakeWorkerGlobal.then(function (WorkerMessageHandler) {
        if (_this10.destroyed) {
          _this10._readyCapability.reject(new Error("Worker was destroyed"));

          return;
        }

        var port = new LoopbackPort();
        _this10._port = port;
        var id = "fake".concat(PDFWorkerUtil.fakeWorkerId++);
        var workerHandler = new _message_handler.MessageHandler(id + "_worker", id, port);
        WorkerMessageHandler.setup(workerHandler, port);
        var messageHandler = new _message_handler.MessageHandler(id, id + "_worker", port);
        _this10._messageHandler = messageHandler;

        _this10._readyCapability.resolve();

        messageHandler.send("configure", {
          verbosity: _this10.verbosity
        });
      })["catch"](function (reason) {
        _this10._readyCapability.reject(new Error("Setting up fake worker failed: \"".concat(reason.message, "\".")));
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.destroyed = true;

      if (this._webWorker) {
        this._webWorker.terminate();

        this._webWorker = null;
      }

      PDFWorker._workerPorts["delete"](this._port);

      this._port = null;

      if (this._messageHandler) {
        this._messageHandler.destroy();

        this._messageHandler = null;
      }
    }
  }], [{
    key: "_workerPorts",
    get: function get() {
      return (0, _util.shadow)(this, "_workerPorts", new WeakMap());
    }
  }, {
    key: "fromPort",
    value: function fromPort(params) {
      if (!(params !== null && params !== void 0 && params.port)) {
        throw new Error("PDFWorker.fromPort - invalid method signature.");
      }

      if (this._workerPorts.has(params.port)) {
        return this._workerPorts.get(params.port);
      }

      return new PDFWorker(params);
    }
  }, {
    key: "workerSrc",
    get: function get() {
      if (_worker_options.GlobalWorkerOptions.workerSrc) {
        return _worker_options.GlobalWorkerOptions.workerSrc;
      }

      if (PDFWorkerUtil.fallbackWorkerSrc !== null) {
        if (!_is_node.isNodeJS) {
          (0, _display_utils.deprecated)('No "GlobalWorkerOptions.workerSrc" specified.');
        }

        return PDFWorkerUtil.fallbackWorkerSrc;
      }

      throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
    }
  }, {
    key: "_mainThreadWorkerMessageHandler",
    get: function get() {
      try {
        var _globalThis$pdfjsWork;

        return ((_globalThis$pdfjsWork = globalThis.pdfjsWorker) === null || _globalThis$pdfjsWork === void 0 ? void 0 : _globalThis$pdfjsWork.WorkerMessageHandler) || null;
      } catch (ex) {
        return null;
      }
    }
  }, {
    key: "_setupFakeWorkerGlobal",
    get: function get() {
      var _this11 = this;

      var loader = /*#__PURE__*/function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
          var mainWorkerMessageHandler, worker;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  mainWorkerMessageHandler = _this11._mainThreadWorkerMessageHandler;

                  if (!mainWorkerMessageHandler) {
                    _context4.next = 3;
                    break;
                  }

                  return _context4.abrupt("return", mainWorkerMessageHandler);

                case 3:
                  if (!(_is_node.isNodeJS && typeof require === "function")) {
                    _context4.next = 6;
                    break;
                  }

                  worker = eval("require")(_this11.workerSrc);
                  return _context4.abrupt("return", worker.WorkerMessageHandler);

                case 6:
                  _context4.next = 8;
                  return (0, _display_utils.loadScript)(_this11.workerSrc);

                case 8:
                  return _context4.abrupt("return", window.pdfjsWorker.WorkerMessageHandler);

                case 9:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function loader() {
          return _ref15.apply(this, arguments);
        };
      }();

      return (0, _util.shadow)(this, "_setupFakeWorkerGlobal", loader());
    }
  }]);

  return PDFWorker;
}();

exports.PDFWorker = PDFWorker;
{
  PDFWorker.getWorkerSrc = function () {
    (0, _display_utils.deprecated)("`PDFWorker.getWorkerSrc()`, please use `PDFWorker.workerSrc` instead.");
    return this.workerSrc;
  };
}

var _docStats = /*#__PURE__*/new WeakMap();

var _pageCache = /*#__PURE__*/new WeakMap();

var _pagePromises = /*#__PURE__*/new WeakMap();

var _metadataPromise = /*#__PURE__*/new WeakMap();

var WorkerTransport = /*#__PURE__*/function () {
  function WorkerTransport(messageHandler, loadingTask, networkStream, params) {
    _classCallCheck(this, WorkerTransport);

    _classPrivateFieldInitSpec(this, _docStats, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _pageCache, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _pagePromises, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _metadataPromise, {
      writable: true,
      value: null
    });

    this.messageHandler = messageHandler;
    this.loadingTask = loadingTask;
    this.commonObjs = new PDFObjects();
    this.fontLoader = new _font_loader.FontLoader({
      docId: loadingTask.docId,
      onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
      ownerDocument: params.ownerDocument,
      styleElement: params.styleElement
    });
    this._params = params;

    if (!params.useWorkerFetch) {
      this.CMapReaderFactory = new params.CMapReaderFactory({
        baseUrl: params.cMapUrl,
        isCompressed: params.cMapPacked
      });
      this.StandardFontDataFactory = new params.StandardFontDataFactory({
        baseUrl: params.standardFontDataUrl
      });
    }

    this.destroyed = false;
    this.destroyCapability = null;
    this._passwordCapability = null;
    this._networkStream = networkStream;
    this._fullReader = null;
    this._lastProgress = null;
    this.downloadInfoCapability = (0, _util.createPromiseCapability)();
    this.setupMessageHandler();
  }

  _createClass(WorkerTransport, [{
    key: "annotationStorage",
    get: function get() {
      return (0, _util.shadow)(this, "annotationStorage", new _annotation_storage.AnnotationStorage());
    }
  }, {
    key: "stats",
    get: function get() {
      return _classPrivateFieldGet(this, _docStats);
    }
  }, {
    key: "getRenderingIntent",
    value: function getRenderingIntent(intent) {
      var annotationMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util.AnnotationMode.ENABLE;
      var isOpList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var renderingIntent = _util.RenderingIntentFlag.DISPLAY;
      var lastModified = "";

      switch (intent) {
        case "any":
          renderingIntent = _util.RenderingIntentFlag.ANY;
          break;

        case "display":
          break;

        case "print":
          renderingIntent = _util.RenderingIntentFlag.PRINT;
          break;

        default:
          (0, _util.warn)("getRenderingIntent - invalid intent: ".concat(intent));
      }

      switch (annotationMode) {
        case _util.AnnotationMode.DISABLE:
          renderingIntent += _util.RenderingIntentFlag.ANNOTATIONS_DISABLE;
          break;

        case _util.AnnotationMode.ENABLE:
          break;

        case _util.AnnotationMode.ENABLE_FORMS:
          renderingIntent += _util.RenderingIntentFlag.ANNOTATIONS_FORMS;
          break;

        case _util.AnnotationMode.ENABLE_STORAGE:
          renderingIntent += _util.RenderingIntentFlag.ANNOTATIONS_STORAGE;
          lastModified = this.annotationStorage.lastModified;
          break;

        default:
          (0, _util.warn)("getRenderingIntent - invalid annotationMode: ".concat(annotationMode));
      }

      if (isOpList) {
        renderingIntent += _util.RenderingIntentFlag.OPLIST;
      }

      return {
        renderingIntent: renderingIntent,
        cacheKey: "".concat(renderingIntent, "_").concat(lastModified)
      };
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this12 = this;

      if (this.destroyCapability) {
        return this.destroyCapability.promise;
      }

      this.destroyed = true;
      this.destroyCapability = (0, _util.createPromiseCapability)();

      if (this._passwordCapability) {
        this._passwordCapability.reject(new Error("Worker was destroyed during onPassword callback"));
      }

      var waitOn = [];

      var _iterator15 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _pageCache).values()),
          _step15;

      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var page = _step15.value;
          waitOn.push(page._destroy());
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }

      _classPrivateFieldGet(this, _pageCache).clear();

      _classPrivateFieldGet(this, _pagePromises).clear();

      if (this.hasOwnProperty("annotationStorage")) {
        this.annotationStorage.resetModified();
      }

      var terminated = this.messageHandler.sendWithPromise("Terminate", null);
      waitOn.push(terminated);
      Promise.all(waitOn).then(function () {
        _this12.commonObjs.clear();

        _this12.fontLoader.clear();

        _classPrivateFieldSet(_this12, _metadataPromise, null);

        _this12._getFieldObjectsPromise = null;
        _this12._hasJSActionsPromise = null;

        if (_this12._networkStream) {
          _this12._networkStream.cancelAllRequests(new _util.AbortException("Worker was terminated."));
        }

        if (_this12.messageHandler) {
          _this12.messageHandler.destroy();

          _this12.messageHandler = null;
        }

        _this12.destroyCapability.resolve();
      }, this.destroyCapability.reject);
      return this.destroyCapability.promise;
    }
  }, {
    key: "setupMessageHandler",
    value: function setupMessageHandler() {
      var _this13 = this;

      var messageHandler = this.messageHandler,
          loadingTask = this.loadingTask;
      messageHandler.on("GetReader", function (data, sink) {
        (0, _util.assert)(_this13._networkStream, "GetReader - no `IPDFStream` instance available.");
        _this13._fullReader = _this13._networkStream.getFullReader();

        _this13._fullReader.onProgress = function (evt) {
          _this13._lastProgress = {
            loaded: evt.loaded,
            total: evt.total
          };
        };

        sink.onPull = function () {
          _this13._fullReader.read().then(function (_ref16) {
            var value = _ref16.value,
                done = _ref16.done;

            if (done) {
              sink.close();
              return;
            }

            (0, _util.assert)((0, _util.isArrayBuffer)(value), "GetReader - expected an ArrayBuffer.");
            sink.enqueue(new Uint8Array(value), 1, [value]);
          })["catch"](function (reason) {
            sink.error(reason);
          });
        };

        sink.onCancel = function (reason) {
          _this13._fullReader.cancel(reason);

          sink.ready["catch"](function (readyReason) {
            if (_this13.destroyed) {
              return;
            }

            throw readyReason;
          });
        };
      });
      messageHandler.on("ReaderHeadersReady", function (data) {
        var headersCapability = (0, _util.createPromiseCapability)();
        var fullReader = _this13._fullReader;
        fullReader.headersReady.then(function () {
          if (!fullReader.isStreamingSupported || !fullReader.isRangeSupported) {
            if (_this13._lastProgress) {
              var _loadingTask$onProgre;

              (_loadingTask$onProgre = loadingTask.onProgress) === null || _loadingTask$onProgre === void 0 ? void 0 : _loadingTask$onProgre.call(loadingTask, _this13._lastProgress);
            }

            fullReader.onProgress = function (evt) {
              var _loadingTask$onProgre2;

              (_loadingTask$onProgre2 = loadingTask.onProgress) === null || _loadingTask$onProgre2 === void 0 ? void 0 : _loadingTask$onProgre2.call(loadingTask, {
                loaded: evt.loaded,
                total: evt.total
              });
            };
          }

          headersCapability.resolve({
            isStreamingSupported: fullReader.isStreamingSupported,
            isRangeSupported: fullReader.isRangeSupported,
            contentLength: fullReader.contentLength
          });
        }, headersCapability.reject);
        return headersCapability.promise;
      });
      messageHandler.on("GetRangeReader", function (data, sink) {
        (0, _util.assert)(_this13._networkStream, "GetRangeReader - no `IPDFStream` instance available.");

        var rangeReader = _this13._networkStream.getRangeReader(data.begin, data.end);

        if (!rangeReader) {
          sink.close();
          return;
        }

        sink.onPull = function () {
          rangeReader.read().then(function (_ref17) {
            var value = _ref17.value,
                done = _ref17.done;

            if (done) {
              sink.close();
              return;
            }

            (0, _util.assert)((0, _util.isArrayBuffer)(value), "GetRangeReader - expected an ArrayBuffer.");
            sink.enqueue(new Uint8Array(value), 1, [value]);
          })["catch"](function (reason) {
            sink.error(reason);
          });
        };

        sink.onCancel = function (reason) {
          rangeReader.cancel(reason);
          sink.ready["catch"](function (readyReason) {
            if (_this13.destroyed) {
              return;
            }

            throw readyReason;
          });
        };
      });
      messageHandler.on("GetDoc", function (_ref18) {
        var pdfInfo = _ref18.pdfInfo;
        _this13._numPages = pdfInfo.numPages;
        _this13._htmlForXfa = pdfInfo.htmlForXfa;
        delete pdfInfo.htmlForXfa;

        loadingTask._capability.resolve(new PDFDocumentProxy(pdfInfo, _this13));
      });
      messageHandler.on("DocException", function (ex) {
        var reason;

        switch (ex.name) {
          case "PasswordException":
            reason = new _util.PasswordException(ex.message, ex.code);
            break;

          case "InvalidPDFException":
            reason = new _util.InvalidPDFException(ex.message);
            break;

          case "MissingPDFException":
            reason = new _util.MissingPDFException(ex.message);
            break;

          case "UnexpectedResponseException":
            reason = new _util.UnexpectedResponseException(ex.message, ex.status);
            break;

          case "UnknownErrorException":
            reason = new _util.UnknownErrorException(ex.message, ex.details);
            break;

          default:
            (0, _util.unreachable)("DocException - expected a valid Error.");
        }

        loadingTask._capability.reject(reason);
      });
      messageHandler.on("PasswordRequest", function (exception) {
        _this13._passwordCapability = (0, _util.createPromiseCapability)();

        if (loadingTask.onPassword) {
          var updatePassword = function updatePassword(password) {
            _this13._passwordCapability.resolve({
              password: password
            });
          };

          try {
            loadingTask.onPassword(updatePassword, exception.code);
          } catch (ex) {
            _this13._passwordCapability.reject(ex);
          }
        } else {
          _this13._passwordCapability.reject(new _util.PasswordException(exception.message, exception.code));
        }

        return _this13._passwordCapability.promise;
      });
      messageHandler.on("DataLoaded", function (data) {
        var _loadingTask$onProgre3;

        (_loadingTask$onProgre3 = loadingTask.onProgress) === null || _loadingTask$onProgre3 === void 0 ? void 0 : _loadingTask$onProgre3.call(loadingTask, {
          loaded: data.length,
          total: data.length
        });

        _this13.downloadInfoCapability.resolve(data);
      });
      messageHandler.on("StartRenderPage", function (data) {
        if (_this13.destroyed) {
          return;
        }

        var page = _classPrivateFieldGet(_this13, _pageCache).get(data.pageIndex);

        page._startRenderPage(data.transparency, data.cacheKey);
      });
      messageHandler.on("commonobj", function (_ref19) {
        var _globalThis$FontInspe;

        var _ref20 = _slicedToArray(_ref19, 3),
            id = _ref20[0],
            type = _ref20[1],
            exportedData = _ref20[2];

        if (_this13.destroyed) {
          return;
        }

        if (_this13.commonObjs.has(id)) {
          return;
        }

        switch (type) {
          case "Font":
            var params = _this13._params;

            if ("error" in exportedData) {
              var exportedError = exportedData.error;
              (0, _util.warn)("Error during font loading: ".concat(exportedError));

              _this13.commonObjs.resolve(id, exportedError);

              break;
            }

            var fontRegistry = null;

            if (params.pdfBug && (_globalThis$FontInspe = globalThis.FontInspector) !== null && _globalThis$FontInspe !== void 0 && _globalThis$FontInspe.enabled) {
              fontRegistry = {
                registerFont: function registerFont(font, url) {
                  globalThis.FontInspector.fontAdded(font, url);
                }
              };
            }

            var font = new _font_loader.FontFaceObject(exportedData, {
              isEvalSupported: params.isEvalSupported,
              disableFontFace: params.disableFontFace,
              ignoreErrors: params.ignoreErrors,
              onUnsupportedFeature: _this13._onUnsupportedFeature.bind(_this13),
              fontRegistry: fontRegistry
            });

            _this13.fontLoader.bind(font)["catch"](function (reason) {
              return messageHandler.sendWithPromise("FontFallback", {
                id: id
              });
            })["finally"](function () {
              if (!params.fontExtraProperties && font.data) {
                font.data = null;
              }

              _this13.commonObjs.resolve(id, font);
            });

            break;

          case "FontPath":
          case "Image":
            _this13.commonObjs.resolve(id, exportedData);

            break;

          default:
            throw new Error("Got unknown common object type ".concat(type));
        }
      });
      messageHandler.on("obj", function (_ref21) {
        var _imageData$data;

        var _ref22 = _slicedToArray(_ref21, 4),
            id = _ref22[0],
            pageIndex = _ref22[1],
            type = _ref22[2],
            imageData = _ref22[3];

        if (_this13.destroyed) {
          return;
        }

        var pageProxy = _classPrivateFieldGet(_this13, _pageCache).get(pageIndex);

        if (pageProxy.objs.has(id)) {
          return;
        }

        switch (type) {
          case "Image":
            pageProxy.objs.resolve(id, imageData);
            var MAX_IMAGE_SIZE_TO_STORE = 8000000;

            if ((imageData === null || imageData === void 0 ? void 0 : (_imageData$data = imageData.data) === null || _imageData$data === void 0 ? void 0 : _imageData$data.length) > MAX_IMAGE_SIZE_TO_STORE) {
              pageProxy.cleanupAfterRender = true;
            }

            break;

          case "Pattern":
            pageProxy.objs.resolve(id, imageData);
            break;

          default:
            throw new Error("Got unknown object type ".concat(type));
        }
      });
      messageHandler.on("DocProgress", function (data) {
        var _loadingTask$onProgre4;

        if (_this13.destroyed) {
          return;
        }

        (_loadingTask$onProgre4 = loadingTask.onProgress) === null || _loadingTask$onProgre4 === void 0 ? void 0 : _loadingTask$onProgre4.call(loadingTask, {
          loaded: data.loaded,
          total: data.total
        });
      });
      messageHandler.on("DocStats", function (data) {
        if (_this13.destroyed) {
          return;
        }

        _classPrivateFieldSet(_this13, _docStats, Object.freeze({
          streamTypes: Object.freeze(data.streamTypes),
          fontTypes: Object.freeze(data.fontTypes)
        }));
      });
      messageHandler.on("UnsupportedFeature", this._onUnsupportedFeature.bind(this));
      messageHandler.on("FetchBuiltInCMap", function (data) {
        if (_this13.destroyed) {
          return Promise.reject(new Error("Worker was destroyed."));
        }

        if (!_this13.CMapReaderFactory) {
          return Promise.reject(new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."));
        }

        return _this13.CMapReaderFactory.fetch(data);
      });
      messageHandler.on("FetchStandardFontData", function (data) {
        if (_this13.destroyed) {
          return Promise.reject(new Error("Worker was destroyed."));
        }

        if (!_this13.StandardFontDataFactory) {
          return Promise.reject(new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter."));
        }

        return _this13.StandardFontDataFactory.fetch(data);
      });
    }
  }, {
    key: "_onUnsupportedFeature",
    value: function _onUnsupportedFeature(_ref23) {
      var _this$loadingTask$onU, _this$loadingTask;

      var featureId = _ref23.featureId;

      if (this.destroyed) {
        return;
      }

      (_this$loadingTask$onU = (_this$loadingTask = this.loadingTask).onUnsupportedFeature) === null || _this$loadingTask$onU === void 0 ? void 0 : _this$loadingTask$onU.call(_this$loadingTask, featureId);
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.messageHandler.sendWithPromise("GetData", null);
    }
  }, {
    key: "getPage",
    value: function getPage(pageNumber) {
      var _this14 = this;

      if (!Number.isInteger(pageNumber) || pageNumber <= 0 || pageNumber > this._numPages) {
        return Promise.reject(new Error("Invalid page request"));
      }

      var pageIndex = pageNumber - 1,
          cachedPromise = _classPrivateFieldGet(this, _pagePromises).get(pageIndex);

      if (cachedPromise) {
        return cachedPromise;
      }

      var promise = this.messageHandler.sendWithPromise("GetPage", {
        pageIndex: pageIndex
      }).then(function (pageInfo) {
        if (_this14.destroyed) {
          throw new Error("Transport destroyed");
        }

        var page = new PDFPageProxy(pageIndex, pageInfo, _this14, _this14._params.ownerDocument, _this14._params.pdfBug);

        _classPrivateFieldGet(_this14, _pageCache).set(pageIndex, page);

        return page;
      });

      _classPrivateFieldGet(this, _pagePromises).set(pageIndex, promise);

      return promise;
    }
  }, {
    key: "getPageIndex",
    value: function getPageIndex(ref) {
      return this.messageHandler.sendWithPromise("GetPageIndex", {
        ref: ref
      });
    }
  }, {
    key: "getAnnotations",
    value: function getAnnotations(pageIndex, intent) {
      return this.messageHandler.sendWithPromise("GetAnnotations", {
        pageIndex: pageIndex,
        intent: intent
      });
    }
  }, {
    key: "saveDocument",
    value: function saveDocument() {
      var _this$_fullReader$fil,
          _this$_fullReader,
          _this15 = this;

      return this.messageHandler.sendWithPromise("SaveDocument", {
        isPureXfa: !!this._htmlForXfa,
        numPages: this._numPages,
        annotationStorage: this.annotationStorage.serializable,
        filename: (_this$_fullReader$fil = (_this$_fullReader = this._fullReader) === null || _this$_fullReader === void 0 ? void 0 : _this$_fullReader.filename) !== null && _this$_fullReader$fil !== void 0 ? _this$_fullReader$fil : null
      })["finally"](function () {
        _this15.annotationStorage.resetModified();
      });
    }
  }, {
    key: "getFieldObjects",
    value: function getFieldObjects() {
      return this._getFieldObjectsPromise || (this._getFieldObjectsPromise = this.messageHandler.sendWithPromise("GetFieldObjects", null));
    }
  }, {
    key: "hasJSActions",
    value: function hasJSActions() {
      return this._hasJSActionsPromise || (this._hasJSActionsPromise = this.messageHandler.sendWithPromise("HasJSActions", null));
    }
  }, {
    key: "getCalculationOrderIds",
    value: function getCalculationOrderIds() {
      return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
    }
  }, {
    key: "getDestinations",
    value: function getDestinations() {
      return this.messageHandler.sendWithPromise("GetDestinations", null);
    }
  }, {
    key: "getDestination",
    value: function getDestination(id) {
      if (typeof id !== "string") {
        return Promise.reject(new Error("Invalid destination request."));
      }

      return this.messageHandler.sendWithPromise("GetDestination", {
        id: id
      });
    }
  }, {
    key: "getPageLabels",
    value: function getPageLabels() {
      return this.messageHandler.sendWithPromise("GetPageLabels", null);
    }
  }, {
    key: "getPageLayout",
    value: function getPageLayout() {
      return this.messageHandler.sendWithPromise("GetPageLayout", null);
    }
  }, {
    key: "getPageMode",
    value: function getPageMode() {
      return this.messageHandler.sendWithPromise("GetPageMode", null);
    }
  }, {
    key: "getViewerPreferences",
    value: function getViewerPreferences() {
      return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
    }
  }, {
    key: "getOpenAction",
    value: function getOpenAction() {
      return this.messageHandler.sendWithPromise("GetOpenAction", null);
    }
  }, {
    key: "getAttachments",
    value: function getAttachments() {
      return this.messageHandler.sendWithPromise("GetAttachments", null);
    }
  }, {
    key: "getJavaScript",
    value: function getJavaScript() {
      return this.messageHandler.sendWithPromise("GetJavaScript", null);
    }
  }, {
    key: "getDocJSActions",
    value: function getDocJSActions() {
      return this.messageHandler.sendWithPromise("GetDocJSActions", null);
    }
  }, {
    key: "getPageJSActions",
    value: function getPageJSActions(pageIndex) {
      return this.messageHandler.sendWithPromise("GetPageJSActions", {
        pageIndex: pageIndex
      });
    }
  }, {
    key: "getStructTree",
    value: function getStructTree(pageIndex) {
      return this.messageHandler.sendWithPromise("GetStructTree", {
        pageIndex: pageIndex
      });
    }
  }, {
    key: "getOutline",
    value: function getOutline() {
      return this.messageHandler.sendWithPromise("GetOutline", null);
    }
  }, {
    key: "getOptionalContentConfig",
    value: function getOptionalContentConfig() {
      return this.messageHandler.sendWithPromise("GetOptionalContentConfig", null).then(function (results) {
        return new _optional_content_config.OptionalContentConfig(results);
      });
    }
  }, {
    key: "getPermissions",
    value: function getPermissions() {
      return this.messageHandler.sendWithPromise("GetPermissions", null);
    }
  }, {
    key: "getMetadata",
    value: function getMetadata() {
      var _this16 = this;

      return _classPrivateFieldGet(this, _metadataPromise) || _classPrivateFieldSet(this, _metadataPromise, this.messageHandler.sendWithPromise("GetMetadata", null).then(function (results) {
        var _this16$_fullReader$f, _this16$_fullReader, _this16$_fullReader$c, _this16$_fullReader2;

        return {
          info: results[0],
          metadata: results[1] ? new _metadata.Metadata(results[1]) : null,
          contentDispositionFilename: (_this16$_fullReader$f = (_this16$_fullReader = _this16._fullReader) === null || _this16$_fullReader === void 0 ? void 0 : _this16$_fullReader.filename) !== null && _this16$_fullReader$f !== void 0 ? _this16$_fullReader$f : null,
          contentLength: (_this16$_fullReader$c = (_this16$_fullReader2 = _this16._fullReader) === null || _this16$_fullReader2 === void 0 ? void 0 : _this16$_fullReader2.contentLength) !== null && _this16$_fullReader$c !== void 0 ? _this16$_fullReader$c : null
        };
      }));
    }
  }, {
    key: "getMarkInfo",
    value: function getMarkInfo() {
      return this.messageHandler.sendWithPromise("GetMarkInfo", null);
    }
  }, {
    key: "startCleanup",
    value: function () {
      var _startCleanup = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var keepLoadedFonts,
            _iterator16,
            _step16,
            page,
            cleanupSuccessful,
            _args5 = arguments;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                keepLoadedFonts = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : false;
                _context5.next = 3;
                return this.messageHandler.sendWithPromise("Cleanup", null);

              case 3:
                if (!this.destroyed) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return");

              case 5:
                _iterator16 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _pageCache).values());
                _context5.prev = 6;

                _iterator16.s();

              case 8:
                if ((_step16 = _iterator16.n()).done) {
                  _context5.next = 15;
                  break;
                }

                page = _step16.value;
                cleanupSuccessful = page.cleanup();

                if (cleanupSuccessful) {
                  _context5.next = 13;
                  break;
                }

                throw new Error("startCleanup: Page ".concat(page.pageNumber, " is currently rendering."));

              case 13:
                _context5.next = 8;
                break;

              case 15:
                _context5.next = 20;
                break;

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5["catch"](6);

                _iterator16.e(_context5.t0);

              case 20:
                _context5.prev = 20;

                _iterator16.f();

                return _context5.finish(20);

              case 23:
                this.commonObjs.clear();

                if (!keepLoadedFonts) {
                  this.fontLoader.clear();
                }

                _classPrivateFieldSet(this, _metadataPromise, null);

                this._getFieldObjectsPromise = null;
                this._hasJSActionsPromise = null;

              case 28:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[6, 17, 20, 23]]);
      }));

      function startCleanup() {
        return _startCleanup.apply(this, arguments);
      }

      return startCleanup;
    }()
  }, {
    key: "loadingParams",
    get: function get() {
      var params = this._params;
      return (0, _util.shadow)(this, "loadingParams", {
        disableAutoFetch: params.disableAutoFetch,
        enableXfa: params.enableXfa
      });
    }
  }]);

  return WorkerTransport;
}();

var PDFObjects = /*#__PURE__*/function () {
  function PDFObjects() {
    _classCallCheck(this, PDFObjects);

    this._objs = Object.create(null);
  }

  _createClass(PDFObjects, [{
    key: "_ensureObj",
    value: function _ensureObj(objId) {
      if (this._objs[objId]) {
        return this._objs[objId];
      }

      return this._objs[objId] = {
        capability: (0, _util.createPromiseCapability)(),
        data: null,
        resolved: false
      };
    }
  }, {
    key: "get",
    value: function get(objId) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (callback) {
        this._ensureObj(objId).capability.promise.then(callback);

        return null;
      }

      var obj = this._objs[objId];

      if (!obj || !obj.resolved) {
        throw new Error("Requesting object that isn't resolved yet ".concat(objId, "."));
      }

      return obj.data;
    }
  }, {
    key: "has",
    value: function has(objId) {
      var obj = this._objs[objId];
      return (obj === null || obj === void 0 ? void 0 : obj.resolved) || false;
    }
  }, {
    key: "resolve",
    value: function resolve(objId, data) {
      var obj = this._ensureObj(objId);

      obj.resolved = true;
      obj.data = data;
      obj.capability.resolve(data);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._objs = Object.create(null);
    }
  }]);

  return PDFObjects;
}();

var RenderTask = /*#__PURE__*/function () {
  function RenderTask(internalRenderTask) {
    _classCallCheck(this, RenderTask);

    this._internalRenderTask = internalRenderTask;
    this.onContinue = null;
  }

  _createClass(RenderTask, [{
    key: "promise",
    get: function get() {
      return this._internalRenderTask.capability.promise;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this._internalRenderTask.cancel();
    }
  }]);

  return RenderTask;
}();

exports.RenderTask = RenderTask;

var InternalRenderTask = /*#__PURE__*/function () {
  function InternalRenderTask(_ref24) {
    var callback = _ref24.callback,
        params = _ref24.params,
        objs = _ref24.objs,
        commonObjs = _ref24.commonObjs,
        annotationCanvasMap = _ref24.annotationCanvasMap,
        operatorList = _ref24.operatorList,
        pageIndex = _ref24.pageIndex,
        canvasFactory = _ref24.canvasFactory,
        _ref24$useRequestAnim = _ref24.useRequestAnimationFrame,
        useRequestAnimationFrame = _ref24$useRequestAnim === void 0 ? false : _ref24$useRequestAnim,
        _ref24$pdfBug = _ref24.pdfBug,
        pdfBug = _ref24$pdfBug === void 0 ? false : _ref24$pdfBug;

    _classCallCheck(this, InternalRenderTask);

    this.callback = callback;
    this.params = params;
    this.objs = objs;
    this.commonObjs = commonObjs;
    this.annotationCanvasMap = annotationCanvasMap;
    this.operatorListIdx = null;
    this.operatorList = operatorList;
    this._pageIndex = pageIndex;
    this.canvasFactory = canvasFactory;
    this._pdfBug = pdfBug;
    this.running = false;
    this.graphicsReadyCallback = null;
    this.graphicsReady = false;
    this._useRequestAnimationFrame = useRequestAnimationFrame === true && typeof window !== "undefined";
    this.cancelled = false;
    this.capability = (0, _util.createPromiseCapability)();
    this.task = new RenderTask(this);
    this._cancelBound = this.cancel.bind(this);
    this._continueBound = this._continue.bind(this);
    this._scheduleNextBound = this._scheduleNext.bind(this);
    this._nextBound = this._next.bind(this);
    this._canvas = params.canvasContext.canvas;
  }

  _createClass(InternalRenderTask, [{
    key: "completed",
    get: function get() {
      return this.capability.promise["catch"](function () {});
    }
  }, {
    key: "initializeGraphics",
    value: function initializeGraphics(_ref25) {
      var _globalThis$StepperMa;

      var _ref25$transparency = _ref25.transparency,
          transparency = _ref25$transparency === void 0 ? false : _ref25$transparency,
          optionalContentConfig = _ref25.optionalContentConfig;

      if (this.cancelled) {
        return;
      }

      if (this._canvas) {
        if (InternalRenderTask.canvasInUse.has(this._canvas)) {
          throw new Error("Cannot use the same canvas during multiple render() operations. " + "Use different canvas or ensure previous operations were " + "cancelled or completed.");
        }

        InternalRenderTask.canvasInUse.add(this._canvas);
      }

      if (this._pdfBug && (_globalThis$StepperMa = globalThis.StepperManager) !== null && _globalThis$StepperMa !== void 0 && _globalThis$StepperMa.enabled) {
        this.stepper = globalThis.StepperManager.create(this._pageIndex);
        this.stepper.init(this.operatorList);
        this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
      }

      var _this$params = this.params,
          canvasContext = _this$params.canvasContext,
          viewport = _this$params.viewport,
          transform = _this$params.transform,
          imageLayer = _this$params.imageLayer,
          background = _this$params.background;
      this.gfx = new _canvas.CanvasGraphics(canvasContext, this.commonObjs, this.objs, this.canvasFactory, imageLayer, optionalContentConfig, this.annotationCanvasMap);
      this.gfx.beginDrawing({
        transform: transform,
        viewport: viewport,
        transparency: transparency,
        background: background
      });
      this.operatorListIdx = 0;
      this.graphicsReady = true;

      if (this.graphicsReadyCallback) {
        this.graphicsReadyCallback();
      }
    }
  }, {
    key: "cancel",
    value: function cancel() {
      var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.running = false;
      this.cancelled = true;

      if (this.gfx) {
        this.gfx.endDrawing();
      }

      if (this._canvas) {
        InternalRenderTask.canvasInUse["delete"](this._canvas);
      }

      this.callback(error || new _display_utils.RenderingCancelledException("Rendering cancelled, page ".concat(this._pageIndex + 1), "canvas"));
    }
  }, {
    key: "operatorListChanged",
    value: function operatorListChanged() {
      if (!this.graphicsReady) {
        if (!this.graphicsReadyCallback) {
          this.graphicsReadyCallback = this._continueBound;
        }

        return;
      }

      if (this.stepper) {
        this.stepper.updateOperatorList(this.operatorList);
      }

      if (this.running) {
        return;
      }

      this._continue();
    }
  }, {
    key: "_continue",
    value: function _continue() {
      this.running = true;

      if (this.cancelled) {
        return;
      }

      if (this.task.onContinue) {
        this.task.onContinue(this._scheduleNextBound);
      } else {
        this._scheduleNext();
      }
    }
  }, {
    key: "_scheduleNext",
    value: function _scheduleNext() {
      var _this17 = this;

      if (this._useRequestAnimationFrame) {
        window.requestAnimationFrame(function () {
          _this17._nextBound()["catch"](_this17._cancelBound);
        });
      } else {
        Promise.resolve().then(this._nextBound)["catch"](this._cancelBound);
      }
    }
  }, {
    key: "_next",
    value: function () {
      var _next2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.cancelled) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper);

                if (this.operatorListIdx === this.operatorList.argsArray.length) {
                  this.running = false;

                  if (this.operatorList.lastChunk) {
                    this.gfx.endDrawing();

                    if (this._canvas) {
                      InternalRenderTask.canvasInUse["delete"](this._canvas);
                    }

                    this.callback();
                  }
                }

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _next() {
        return _next2.apply(this, arguments);
      }

      return _next;
    }()
  }], [{
    key: "canvasInUse",
    get: function get() {
      return (0, _util.shadow)(this, "canvasInUse", new WeakSet());
    }
  }]);

  return InternalRenderTask;
}();

var version = '2.12.323';
exports.version = version;
var build = '7ad106951';
exports.build = build;