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
exports.WorkerTask = exports.WorkerMessageHandler = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

var _pdf_manager = require("./pdf_manager.js");

var _writer = require("./writer.js");

var _is_node = require("../shared/is_node.js");

var _message_handler = require("../shared/message_handler.js");

var _worker_stream = require("./worker_stream.js");

var _core_utils = require("./core_utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WorkerTask = /*#__PURE__*/function () {
  function WorkerTask(name) {
    _classCallCheck(this, WorkerTask);

    this.name = name;
    this.terminated = false;
    this._capability = (0, _util.createPromiseCapability)();
  }

  _createClass(WorkerTask, [{
    key: "finished",
    get: function get() {
      return this._capability.promise;
    }
  }, {
    key: "finish",
    value: function finish() {
      this._capability.resolve();
    }
  }, {
    key: "terminate",
    value: function terminate() {
      this.terminated = true;
    }
  }, {
    key: "ensureNotTerminated",
    value: function ensureNotTerminated() {
      if (this.terminated) {
        throw new Error("Worker task was terminated");
      }
    }
  }]);

  return WorkerTask;
}();

exports.WorkerTask = WorkerTask;

var WorkerMessageHandler = /*#__PURE__*/function () {
  function WorkerMessageHandler() {
    _classCallCheck(this, WorkerMessageHandler);
  }

  _createClass(WorkerMessageHandler, null, [{
    key: "setup",
    value: function setup(handler, port) {
      var testMessageProcessed = false;
      handler.on("test", function wphSetupTest(data) {
        if (testMessageProcessed) {
          return;
        }

        testMessageProcessed = true;
        handler.send("test", data instanceof Uint8Array && data[0] === 255);
      });
      handler.on("configure", function wphConfigure(data) {
        (0, _util.setVerbosityLevel)(data.verbosity);
      });
      handler.on("GetDocRequest", function wphSetupDoc(data) {
        return WorkerMessageHandler.createDocumentHandler(data, port);
      });
    }
  }, {
    key: "createDocumentHandler",
    value: function createDocumentHandler(docParams, port) {
      var pdfManager;
      var terminated = false;
      var cancelXHRs = null;
      var WorkerTasks = [];
      var verbosity = (0, _util.getVerbosityLevel)();
      var apiVersion = docParams.apiVersion;
      var workerVersion = null;

      if (apiVersion !== workerVersion) {
        throw new Error("The API version \"".concat(apiVersion, "\" does not match ") + "the Worker version \"".concat(workerVersion, "\"."));
      }

      var enumerableProperties = [];

      for (var property in []) {
        enumerableProperties.push(property);
      }

      if (enumerableProperties.length) {
        throw new Error("The `Array.prototype` contains unexpected enumerable properties: " + enumerableProperties.join(", ") + "; thus breaking e.g. `for...in` iteration of `Array`s.");
      }

      var docId = docParams.docId;
      var docBaseUrl = docParams.docBaseUrl;
      var workerHandlerName = docParams.docId + "_worker";
      var handler = new _message_handler.MessageHandler(workerHandlerName, docId, port);

      function ensureNotTerminated() {
        if (terminated) {
          throw new Error("Worker was terminated");
        }
      }

      function startWorkerTask(task) {
        WorkerTasks.push(task);
      }

      function finishWorkerTask(task) {
        task.finish();
        var i = WorkerTasks.indexOf(task);
        WorkerTasks.splice(i, 1);
      }

      function loadDocument(_x) {
        return _loadDocument.apply(this, arguments);
      }

      function _loadDocument() {
        _loadDocument = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(recoveryMode) {
          var isPureXfa, task, _yield$Promise$all, _yield$Promise$all2, numPages, fingerprints, htmlForXfa;

          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return pdfManager.ensureDoc("checkHeader");

                case 2:
                  _context.next = 4;
                  return pdfManager.ensureDoc("parseStartXRef");

                case 4:
                  _context.next = 6;
                  return pdfManager.ensureDoc("parse", [recoveryMode]);

                case 6:
                  _context.next = 8;
                  return pdfManager.ensureDoc("checkFirstPage", [recoveryMode]);

                case 8:
                  _context.next = 10;
                  return pdfManager.ensureDoc("checkLastPage", [recoveryMode]);

                case 10:
                  _context.next = 12;
                  return pdfManager.ensureDoc("isPureXfa");

                case 12:
                  isPureXfa = _context.sent;

                  if (!isPureXfa) {
                    _context.next = 18;
                    break;
                  }

                  task = new WorkerTask("loadXfaFonts");
                  startWorkerTask(task);
                  _context.next = 18;
                  return Promise.all([pdfManager.loadXfaFonts(handler, task)["catch"](function (reason) {}).then(function () {
                    return finishWorkerTask(task);
                  }), pdfManager.loadXfaImages()]);

                case 18:
                  _context.next = 20;
                  return Promise.all([pdfManager.ensureDoc("numPages"), pdfManager.ensureDoc("fingerprints")]);

                case 20:
                  _yield$Promise$all = _context.sent;
                  _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                  numPages = _yield$Promise$all2[0];
                  fingerprints = _yield$Promise$all2[1];

                  if (!isPureXfa) {
                    _context.next = 30;
                    break;
                  }

                  _context.next = 27;
                  return pdfManager.ensureDoc("htmlForXfa");

                case 27:
                  _context.t0 = _context.sent;
                  _context.next = 31;
                  break;

                case 30:
                  _context.t0 = null;

                case 31:
                  htmlForXfa = _context.t0;
                  return _context.abrupt("return", {
                    numPages: numPages,
                    fingerprints: fingerprints,
                    htmlForXfa: htmlForXfa
                  });

                case 33:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return _loadDocument.apply(this, arguments);
      }

      function getPdfManager(data, evaluatorOptions, enableXfa) {
        var pdfManagerCapability = (0, _util.createPromiseCapability)();
        var newPdfManager;
        var source = data.source;

        if (source.data) {
          try {
            newPdfManager = new _pdf_manager.LocalPdfManager(docId, source.data, source.password, handler, evaluatorOptions, enableXfa, docBaseUrl);
            pdfManagerCapability.resolve(newPdfManager);
          } catch (ex) {
            pdfManagerCapability.reject(ex);
          }

          return pdfManagerCapability.promise;
        }

        var pdfStream,
            cachedChunks = [];

        try {
          pdfStream = new _worker_stream.PDFWorkerStream(handler);
        } catch (ex) {
          pdfManagerCapability.reject(ex);
          return pdfManagerCapability.promise;
        }

        var fullRequest = pdfStream.getFullReader();
        fullRequest.headersReady.then(function () {
          if (!fullRequest.isRangeSupported) {
            return;
          }

          var disableAutoFetch = source.disableAutoFetch || fullRequest.isStreamingSupported;
          newPdfManager = new _pdf_manager.NetworkPdfManager(docId, pdfStream, {
            msgHandler: handler,
            password: source.password,
            length: fullRequest.contentLength,
            disableAutoFetch: disableAutoFetch,
            rangeChunkSize: source.rangeChunkSize
          }, evaluatorOptions, enableXfa, docBaseUrl);

          for (var i = 0; i < cachedChunks.length; i++) {
            newPdfManager.sendProgressiveData(cachedChunks[i]);
          }

          cachedChunks = [];
          pdfManagerCapability.resolve(newPdfManager);
          cancelXHRs = null;
        })["catch"](function (reason) {
          pdfManagerCapability.reject(reason);
          cancelXHRs = null;
        });
        var loaded = 0;

        var flushChunks = function flushChunks() {
          var pdfFile = (0, _util.arraysToBytes)(cachedChunks);

          if (source.length && pdfFile.length !== source.length) {
            (0, _util.warn)("reported HTTP length is different from actual");
          }

          try {
            newPdfManager = new _pdf_manager.LocalPdfManager(docId, pdfFile, source.password, handler, evaluatorOptions, enableXfa, docBaseUrl);
            pdfManagerCapability.resolve(newPdfManager);
          } catch (ex) {
            pdfManagerCapability.reject(ex);
          }

          cachedChunks = [];
        };

        var readPromise = new Promise(function (resolve, reject) {
          var readChunk = function readChunk(_ref) {
            var value = _ref.value,
                done = _ref.done;

            try {
              ensureNotTerminated();

              if (done) {
                if (!newPdfManager) {
                  flushChunks();
                }

                cancelXHRs = null;
                return;
              }

              loaded += (0, _util.arrayByteLength)(value);

              if (!fullRequest.isStreamingSupported) {
                handler.send("DocProgress", {
                  loaded: loaded,
                  total: Math.max(loaded, fullRequest.contentLength || 0)
                });
              }

              if (newPdfManager) {
                newPdfManager.sendProgressiveData(value);
              } else {
                cachedChunks.push(value);
              }

              fullRequest.read().then(readChunk, reject);
            } catch (e) {
              reject(e);
            }
          };

          fullRequest.read().then(readChunk, reject);
        });
        readPromise["catch"](function (e) {
          pdfManagerCapability.reject(e);
          cancelXHRs = null;
        });

        cancelXHRs = function cancelXHRs(reason) {
          pdfStream.cancelAllRequests(reason);
        };

        return pdfManagerCapability.promise;
      }

      function setupDoc(data) {
        function onSuccess(doc) {
          ensureNotTerminated();
          handler.send("GetDoc", {
            pdfInfo: doc
          });
        }

        function onFailure(ex) {
          ensureNotTerminated();

          if (ex instanceof _util.PasswordException) {
            var task = new WorkerTask("PasswordException: response ".concat(ex.code));
            startWorkerTask(task);
            handler.sendWithPromise("PasswordRequest", ex).then(function (_ref2) {
              var password = _ref2.password;
              finishWorkerTask(task);
              pdfManager.updatePassword(password);
              pdfManagerReady();
            })["catch"](function () {
              finishWorkerTask(task);
              handler.send("DocException", ex);
            });
          } else if (ex instanceof _util.InvalidPDFException || ex instanceof _util.MissingPDFException || ex instanceof _util.UnexpectedResponseException || ex instanceof _util.UnknownErrorException) {
            handler.send("DocException", ex);
          } else {
            handler.send("DocException", new _util.UnknownErrorException(ex.message, ex.toString()));
          }
        }

        function pdfManagerReady() {
          ensureNotTerminated();
          loadDocument(false).then(onSuccess, function (reason) {
            ensureNotTerminated();

            if (!(reason instanceof _core_utils.XRefParseException)) {
              onFailure(reason);
              return;
            }

            pdfManager.requestLoadedStream();
            pdfManager.onLoadedStream().then(function () {
              ensureNotTerminated();
              loadDocument(true).then(onSuccess, onFailure);
            });
          });
        }

        ensureNotTerminated();
        var evaluatorOptions = {
          maxImageSize: data.maxImageSize,
          disableFontFace: data.disableFontFace,
          ignoreErrors: data.ignoreErrors,
          isEvalSupported: data.isEvalSupported,
          fontExtraProperties: data.fontExtraProperties,
          useSystemFonts: data.useSystemFonts,
          cMapUrl: data.cMapUrl,
          standardFontDataUrl: data.standardFontDataUrl
        };
        getPdfManager(data, evaluatorOptions, data.enableXfa).then(function (newPdfManager) {
          if (terminated) {
            newPdfManager.terminate(new _util.AbortException("Worker was terminated."));
            throw new Error("Worker was terminated");
          }

          pdfManager = newPdfManager;
          pdfManager.onLoadedStream().then(function (stream) {
            handler.send("DataLoaded", {
              length: stream.bytes.byteLength
            });
          });
        }).then(pdfManagerReady, onFailure);
      }

      handler.on("GetPage", function wphSetupGetPage(data) {
        return pdfManager.getPage(data.pageIndex).then(function (page) {
          return Promise.all([pdfManager.ensure(page, "rotate"), pdfManager.ensure(page, "ref"), pdfManager.ensure(page, "userUnit"), pdfManager.ensure(page, "view")]).then(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 4),
                rotate = _ref4[0],
                ref = _ref4[1],
                userUnit = _ref4[2],
                view = _ref4[3];

            return {
              rotate: rotate,
              ref: ref,
              userUnit: userUnit,
              view: view
            };
          });
        });
      });
      handler.on("GetPageIndex", function wphSetupGetPageIndex(_ref5) {
        var ref = _ref5.ref;

        var pageRef = _primitives.Ref.get(ref.num, ref.gen);

        return pdfManager.ensureCatalog("getPageIndex", [pageRef]);
      });
      handler.on("GetDestinations", function wphSetupGetDestinations(data) {
        return pdfManager.ensureCatalog("destinations");
      });
      handler.on("GetDestination", function wphSetupGetDestination(data) {
        return pdfManager.ensureCatalog("getDestination", [data.id]);
      });
      handler.on("GetPageLabels", function wphSetupGetPageLabels(data) {
        return pdfManager.ensureCatalog("pageLabels");
      });
      handler.on("GetPageLayout", function wphSetupGetPageLayout(data) {
        return pdfManager.ensureCatalog("pageLayout");
      });
      handler.on("GetPageMode", function wphSetupGetPageMode(data) {
        return pdfManager.ensureCatalog("pageMode");
      });
      handler.on("GetViewerPreferences", function (data) {
        return pdfManager.ensureCatalog("viewerPreferences");
      });
      handler.on("GetOpenAction", function (data) {
        return pdfManager.ensureCatalog("openAction");
      });
      handler.on("GetAttachments", function wphSetupGetAttachments(data) {
        return pdfManager.ensureCatalog("attachments");
      });
      handler.on("GetJavaScript", function wphSetupGetJavaScript(data) {
        return pdfManager.ensureCatalog("javaScript");
      });
      handler.on("GetDocJSActions", function wphSetupGetDocJSActions(data) {
        return pdfManager.ensureCatalog("jsActions");
      });
      handler.on("GetPageJSActions", function (_ref6) {
        var pageIndex = _ref6.pageIndex;
        return pdfManager.getPage(pageIndex).then(function (page) {
          return pdfManager.ensure(page, "jsActions");
        });
      });
      handler.on("GetOutline", function wphSetupGetOutline(data) {
        return pdfManager.ensureCatalog("documentOutline");
      });
      handler.on("GetOptionalContentConfig", function (data) {
        return pdfManager.ensureCatalog("optionalContentConfig");
      });
      handler.on("GetPermissions", function (data) {
        return pdfManager.ensureCatalog("permissions");
      });
      handler.on("GetMetadata", function wphSetupGetMetadata(data) {
        return Promise.all([pdfManager.ensureDoc("documentInfo"), pdfManager.ensureCatalog("metadata")]);
      });
      handler.on("GetMarkInfo", function wphSetupGetMarkInfo(data) {
        return pdfManager.ensureCatalog("markInfo");
      });
      handler.on("GetData", function wphSetupGetData(data) {
        pdfManager.requestLoadedStream();
        return pdfManager.onLoadedStream().then(function (stream) {
          return stream.bytes;
        });
      });
      handler.on("GetAnnotations", function (_ref7) {
        var pageIndex = _ref7.pageIndex,
            intent = _ref7.intent;
        return pdfManager.getPage(pageIndex).then(function (page) {
          return page.getAnnotationsData(intent);
        });
      });
      handler.on("GetFieldObjects", function (data) {
        return pdfManager.ensureDoc("fieldObjects");
      });
      handler.on("HasJSActions", function (data) {
        return pdfManager.ensureDoc("hasJSActions");
      });
      handler.on("GetCalculationOrderIds", function (data) {
        return pdfManager.ensureDoc("calculationOrderIds");
      });
      handler.on("SaveDocument", function (_ref8) {
        var isPureXfa = _ref8.isPureXfa,
            numPages = _ref8.numPages,
            annotationStorage = _ref8.annotationStorage,
            filename = _ref8.filename;
        pdfManager.requestLoadedStream();
        var promises = [pdfManager.onLoadedStream(), pdfManager.ensureCatalog("acroForm"), pdfManager.ensureCatalog("acroFormRef"), pdfManager.ensureDoc("xref"), pdfManager.ensureDoc("startXRef")];

        if (isPureXfa) {
          promises.push(pdfManager.serializeXfaData(annotationStorage));
        } else {
          var _loop = function _loop(pageIndex) {
            promises.push(pdfManager.getPage(pageIndex).then(function (page) {
              var task = new WorkerTask("Save: page ".concat(pageIndex));
              return page.save(handler, task, annotationStorage)["finally"](function () {
                finishWorkerTask(task);
              });
            }));
          };

          for (var pageIndex = 0; pageIndex < numPages; pageIndex++) {
            _loop(pageIndex);
          }
        }

        return Promise.all(promises).then(function (_ref9) {
          var _ref10 = _toArray(_ref9),
              stream = _ref10[0],
              acroForm = _ref10[1],
              acroFormRef = _ref10[2],
              xref = _ref10[3],
              startXRef = _ref10[4],
              refs = _ref10.slice(5);

          var newRefs = [];
          var xfaData = null;

          if (isPureXfa) {
            xfaData = refs[0];

            if (!xfaData) {
              return stream.bytes;
            }
          } else {
            var _iterator = _createForOfIteratorHelper(refs),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var ref = _step.value;
                newRefs = ref.filter(function (x) {
                  return x !== null;
                }).reduce(function (a, b) {
                  return a.concat(b);
                }, newRefs);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            if (newRefs.length === 0) {
              return stream.bytes;
            }
          }

          var xfa = acroForm instanceof _primitives.Dict && acroForm.get("XFA") || null;
          var xfaDatasetsRef = null;
          var hasXfaDatasetsEntry = false;

          if (Array.isArray(xfa)) {
            for (var i = 0, ii = xfa.length; i < ii; i += 2) {
              if (xfa[i] === "datasets") {
                xfaDatasetsRef = xfa[i + 1];
                acroFormRef = null;
                hasXfaDatasetsEntry = true;
              }
            }

            if (xfaDatasetsRef === null) {
              xfaDatasetsRef = xref.getNewRef();
            }
          } else if (xfa) {
            acroFormRef = null;
            (0, _util.warn)("Unsupported XFA type.");
          }

          var newXrefInfo = Object.create(null);

          if (xref.trailer) {
            var infoObj = Object.create(null);
            var xrefInfo = xref.trailer.get("Info") || null;

            if (xrefInfo instanceof _primitives.Dict) {
              xrefInfo.forEach(function (key, value) {
                if ((0, _util.isString)(key) && (0, _util.isString)(value)) {
                  infoObj[key] = (0, _util.stringToPDFString)(value);
                }
              });
            }

            newXrefInfo = {
              rootRef: xref.trailer.getRaw("Root") || null,
              encryptRef: xref.trailer.getRaw("Encrypt") || null,
              newRef: xref.getNewRef(),
              infoRef: xref.trailer.getRaw("Info") || null,
              info: infoObj,
              fileIds: xref.trailer.get("ID") || null,
              startXRef: startXRef,
              filename: filename
            };
          }

          xref.resetNewRef();
          return (0, _writer.incrementalUpdate)({
            originalData: stream.bytes,
            xrefInfo: newXrefInfo,
            newRefs: newRefs,
            xref: xref,
            hasXfa: !!xfa,
            xfaDatasetsRef: xfaDatasetsRef,
            hasXfaDatasetsEntry: hasXfaDatasetsEntry,
            acroFormRef: acroFormRef,
            acroForm: acroForm,
            xfaData: xfaData
          });
        });
      });
      handler.on("GetOperatorList", function wphSetupRenderPage(data, sink) {
        var pageIndex = data.pageIndex;
        pdfManager.getPage(pageIndex).then(function (page) {
          var task = new WorkerTask("GetOperatorList: page ".concat(pageIndex));
          startWorkerTask(task);
          var start = verbosity >= _util.VerbosityLevel.INFOS ? Date.now() : 0;
          page.getOperatorList({
            handler: handler,
            sink: sink,
            task: task,
            intent: data.intent,
            cacheKey: data.cacheKey,
            annotationStorage: data.annotationStorage
          }).then(function (operatorListInfo) {
            finishWorkerTask(task);

            if (start) {
              (0, _util.info)("page=".concat(pageIndex + 1, " - getOperatorList: time=") + "".concat(Date.now() - start, "ms, len=").concat(operatorListInfo.length));
            }

            sink.close();
          }, function (reason) {
            finishWorkerTask(task);

            if (task.terminated) {
              return;
            }

            handler.send("UnsupportedFeature", {
              featureId: _util.UNSUPPORTED_FEATURES.errorOperatorList
            });
            sink.error(reason);
          });
        });
      });
      handler.on("GetTextContent", function wphExtractText(data, sink) {
        var pageIndex = data.pageIndex;
        pdfManager.getPage(pageIndex).then(function (page) {
          var task = new WorkerTask("GetTextContent: page " + pageIndex);
          startWorkerTask(task);
          var start = verbosity >= _util.VerbosityLevel.INFOS ? Date.now() : 0;
          page.extractTextContent({
            handler: handler,
            task: task,
            sink: sink,
            normalizeWhitespace: data.normalizeWhitespace,
            includeMarkedContent: data.includeMarkedContent,
            combineTextItems: data.combineTextItems
          }).then(function () {
            finishWorkerTask(task);

            if (start) {
              (0, _util.info)("page=".concat(pageIndex + 1, " - getTextContent: time=") + "".concat(Date.now() - start, "ms"));
            }

            sink.close();
          }, function (reason) {
            finishWorkerTask(task);

            if (task.terminated) {
              return;
            }

            sink.error(reason);
          });
        });
      });
      handler.on("GetStructTree", function wphGetStructTree(data) {
        return pdfManager.getPage(data.pageIndex).then(function (page) {
          return pdfManager.ensure(page, "getStructTree");
        });
      });
      handler.on("FontFallback", function (data) {
        return pdfManager.fontFallback(data.id, handler);
      });
      handler.on("Cleanup", function wphCleanup(data) {
        return pdfManager.cleanup(true);
      });
      handler.on("Terminate", function wphTerminate(data) {
        terminated = true;
        var waitOn = [];

        if (pdfManager) {
          pdfManager.terminate(new _util.AbortException("Worker was terminated."));
          var cleanupPromise = pdfManager.cleanup();
          waitOn.push(cleanupPromise);
          pdfManager = null;
        } else {
          (0, _primitives.clearPrimitiveCaches)();
        }

        if (cancelXHRs) {
          cancelXHRs(new _util.AbortException("Worker was terminated."));
        }

        var _iterator2 = _createForOfIteratorHelper(WorkerTasks),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var task = _step2.value;
            waitOn.push(task.finished);
            task.terminate();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return Promise.all(waitOn).then(function () {
          handler.destroy();
          handler = null;
        });
      });
      handler.on("Ready", function wphReady(data) {
        setupDoc(docParams);
        docParams = null;
      });
      return workerHandlerName;
    }
  }, {
    key: "initializeFromPort",
    value: function initializeFromPort(port) {
      var handler = new _message_handler.MessageHandler("worker", "main", port);
      WorkerMessageHandler.setup(handler, port);
      handler.send("ready", null);
    }
  }]);

  return WorkerMessageHandler;
}();

exports.WorkerMessageHandler = WorkerMessageHandler;

function isMessagePort(maybePort) {
  return typeof maybePort.postMessage === "function" && "onmessage" in maybePort;
}

if (typeof window === "undefined" && !_is_node.isNodeJS && typeof self !== "undefined" && isMessagePort(self)) {
  WorkerMessageHandler.initializeFromPort(self);
}