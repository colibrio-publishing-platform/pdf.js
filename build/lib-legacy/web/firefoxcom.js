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
exports.FirefoxCom = exports.DownloadManager = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("../extensions/firefox/tools/l10n.js");

var _app = require("./app.js");

var _pdf = require("../pdf");

var _preferences = require("./preferences.js");

var _ui_utils = require("./ui_utils.js");

var _l10n_utils = require("./l10n_utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

{
  throw new Error('Module "./firefoxcom.js" shall not be used outside MOZCENTRAL builds.');
}

var FirefoxCom = /*#__PURE__*/function () {
  function FirefoxCom() {
    _classCallCheck(this, FirefoxCom);
  }

  _createClass(FirefoxCom, null, [{
    key: "requestSync",
    value: function requestSync(action, data) {
      var request = document.createTextNode("");
      document.documentElement.appendChild(request);
      var sender = document.createEvent("CustomEvent");
      sender.initCustomEvent("pdf.js.message", true, false, {
        action: action,
        data: data,
        sync: true
      });
      request.dispatchEvent(sender);
      var response = sender.detail.response;
      request.remove();
      return response;
    }
  }, {
    key: "requestAsync",
    value: function requestAsync(action, data) {
      var _this = this;

      return new Promise(function (resolve) {
        _this.request(action, data, resolve);
      });
    }
  }, {
    key: "request",
    value: function request(action, data) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var request = document.createTextNode("");

      if (callback) {
        request.addEventListener("pdf.js.response", function (event) {
          var response = event.detail.response;
          event.target.remove();
          callback(response);
        }, {
          once: true
        });
      }

      document.documentElement.appendChild(request);
      var sender = document.createEvent("CustomEvent");
      sender.initCustomEvent("pdf.js.message", true, false, {
        action: action,
        data: data,
        sync: false,
        responseExpected: !!callback
      });
      request.dispatchEvent(sender);
    }
  }]);

  return FirefoxCom;
}();

exports.FirefoxCom = FirefoxCom;

var DownloadManager = /*#__PURE__*/function () {
  function DownloadManager() {
    _classCallCheck(this, DownloadManager);

    this._openBlobUrls = new WeakMap();
  }

  _createClass(DownloadManager, [{
    key: "downloadUrl",
    value: function downloadUrl(url, filename) {
      FirefoxCom.request("download", {
        originalUrl: url,
        filename: filename
      });
    }
  }, {
    key: "downloadData",
    value: function downloadData(data, filename, contentType) {
      var blobUrl = URL.createObjectURL(new Blob([data], {
        type: contentType
      }));
      FirefoxCom.requestAsync("download", {
        blobUrl: blobUrl,
        originalUrl: blobUrl,
        filename: filename,
        isAttachment: true
      }).then(function (error) {
        URL.revokeObjectURL(blobUrl);
      });
    }
  }, {
    key: "openOrDownloadData",
    value: function openOrDownloadData(element, data, filename) {
      var isPdfData = (0, _pdf.isPdfFile)(filename);
      var contentType = isPdfData ? "application/pdf" : "";

      if (isPdfData) {
        var blobUrl = this._openBlobUrls.get(element);

        if (!blobUrl) {
          blobUrl = URL.createObjectURL(new Blob([data], {
            type: contentType
          }));

          this._openBlobUrls.set(element, blobUrl);
        }

        var viewerUrl = blobUrl + "#filename=" + encodeURIComponent(filename);

        try {
          window.open(viewerUrl);
          return true;
        } catch (ex) {
          console.error("openOrDownloadData: ".concat(ex));
          URL.revokeObjectURL(blobUrl);

          this._openBlobUrls["delete"](element);
        }
      }

      this.downloadData(data, filename, contentType);
      return false;
    }
  }, {
    key: "download",
    value: function download(blob, url, filename) {
      var sourceEventType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "download";
      var blobUrl = URL.createObjectURL(blob);
      FirefoxCom.requestAsync("download", {
        blobUrl: blobUrl,
        originalUrl: url,
        filename: filename,
        sourceEventType: sourceEventType
      }).then(function (error) {
        if (error) {
          console.error("`ChromeActions.download` failed.");
        }

        URL.revokeObjectURL(blobUrl);
      });
    }
  }]);

  return DownloadManager;
}();

exports.DownloadManager = DownloadManager;

var FirefoxPreferences = /*#__PURE__*/function (_BasePreferences) {
  _inherits(FirefoxPreferences, _BasePreferences);

  var _super = _createSuper(FirefoxPreferences);

  function FirefoxPreferences() {
    _classCallCheck(this, FirefoxPreferences);

    return _super.apply(this, arguments);
  }

  _createClass(FirefoxPreferences, [{
    key: "_writeToStorage",
    value: function () {
      var _writeToStorage2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(prefObj) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", FirefoxCom.requestAsync("setPreferences", prefObj));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function _writeToStorage(_x) {
        return _writeToStorage2.apply(this, arguments);
      }

      return _writeToStorage;
    }()
  }, {
    key: "_readFromStorage",
    value: function () {
      var _readFromStorage2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(prefObj) {
        var prefStr;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return FirefoxCom.requestAsync("getPreferences", prefObj);

              case 2:
                prefStr = _context2.sent;
                return _context2.abrupt("return", JSON.parse(prefStr));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function _readFromStorage(_x2) {
        return _readFromStorage2.apply(this, arguments);
      }

      return _readFromStorage;
    }()
  }]);

  return FirefoxPreferences;
}(_preferences.BasePreferences);

var MozL10n = /*#__PURE__*/function () {
  function MozL10n(mozL10n) {
    _classCallCheck(this, MozL10n);

    this.mozL10n = mozL10n;
  }

  _createClass(MozL10n, [{
    key: "getLanguage",
    value: function () {
      var _getLanguage = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.mozL10n.getLanguage());

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getLanguage() {
        return _getLanguage.apply(this, arguments);
      }

      return getLanguage;
    }()
  }, {
    key: "getDirection",
    value: function () {
      var _getDirection = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.mozL10n.getDirection());

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getDirection() {
        return _getDirection.apply(this, arguments);
      }

      return getDirection;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(key) {
        var args,
            fallback,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                args = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : null;
                fallback = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : (0, _l10n_utils.getL10nFallback)(key, args);
                return _context5.abrupt("return", this.mozL10n.get(key, args, fallback));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function get(_x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "translate",
    value: function () {
      var _translate = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6(element) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.mozL10n.translate(element);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function translate(_x4) {
        return _translate.apply(this, arguments);
      }

      return translate;
    }()
  }]);

  return MozL10n;
}();

(function listenFindEvents() {
  var events = ["find", "findagain", "findhighlightallchange", "findcasesensitivitychange", "findentirewordchange", "findbarclose"];
  var findLen = "find".length;

  var handleEvent = function handleEvent(_ref) {
    var type = _ref.type,
        detail = _ref.detail;

    if (!_app.PDFViewerApplication.initialized) {
      return;
    }

    if (type === "findbarclose") {
      _app.PDFViewerApplication.eventBus.dispatch(type, {
        source: window
      });

      return;
    }

    _app.PDFViewerApplication.eventBus.dispatch("find", {
      source: window,
      type: type.substring(findLen),
      query: detail.query,
      phraseSearch: true,
      caseSensitive: !!detail.caseSensitive,
      entireWord: !!detail.entireWord,
      highlightAll: !!detail.highlightAll,
      findPrevious: !!detail.findPrevious
    });
  };

  for (var _i = 0, _events = events; _i < _events.length; _i++) {
    var event = _events[_i];
    window.addEventListener(event, handleEvent);
  }
})();

(function listenZoomEvents() {
  var events = ["zoomin", "zoomout", "zoomreset"];

  var handleEvent = function handleEvent(_ref2) {
    var type = _ref2.type,
        detail = _ref2.detail;

    if (!_app.PDFViewerApplication.initialized) {
      return;
    }

    if (type === "zoomreset" && _app.PDFViewerApplication.pdfViewer.currentScaleValue === _ui_utils.DEFAULT_SCALE_VALUE) {
      return;
    }

    _app.PDFViewerApplication.eventBus.dispatch(type, {
      source: window
    });
  };

  for (var _i2 = 0, _events2 = events; _i2 < _events2.length; _i2++) {
    var event = _events2[_i2];
    window.addEventListener(event, handleEvent);
  }
})();

(function listenSaveEvent() {
  var handleEvent = function handleEvent(_ref3) {
    var type = _ref3.type,
        detail = _ref3.detail;

    if (!_app.PDFViewerApplication.initialized) {
      return;
    }

    _app.PDFViewerApplication.eventBus.dispatch(type, {
      source: window
    });
  };

  window.addEventListener("save", handleEvent);
})();

var FirefoxComDataRangeTransport = /*#__PURE__*/function (_PDFDataRangeTranspor) {
  _inherits(FirefoxComDataRangeTransport, _PDFDataRangeTranspor);

  var _super2 = _createSuper(FirefoxComDataRangeTransport);

  function FirefoxComDataRangeTransport() {
    _classCallCheck(this, FirefoxComDataRangeTransport);

    return _super2.apply(this, arguments);
  }

  _createClass(FirefoxComDataRangeTransport, [{
    key: "requestDataRange",
    value: function requestDataRange(begin, end) {
      FirefoxCom.request("requestDataRange", {
        begin: begin,
        end: end
      });
    }
  }, {
    key: "abort",
    value: function abort() {
      FirefoxCom.requestSync("abortLoading", null);
    }
  }]);

  return FirefoxComDataRangeTransport;
}(_pdf.PDFDataRangeTransport);

var FirefoxScripting = /*#__PURE__*/function () {
  function FirefoxScripting() {
    _classCallCheck(this, FirefoxScripting);
  }

  _createClass(FirefoxScripting, null, [{
    key: "createSandbox",
    value: function () {
      var _createSandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7(data) {
        var success;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return FirefoxCom.requestAsync("createSandbox", data);

              case 2:
                success = _context7.sent;

                if (success) {
                  _context7.next = 5;
                  break;
                }

                throw new Error("Cannot create sandbox.");

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function createSandbox(_x5) {
        return _createSandbox.apply(this, arguments);
      }

      return createSandbox;
    }()
  }, {
    key: "dispatchEventInSandbox",
    value: function () {
      var _dispatchEventInSandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8(event) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                FirefoxCom.request("dispatchEventInSandbox", event);

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function dispatchEventInSandbox(_x6) {
        return _dispatchEventInSandbox.apply(this, arguments);
      }

      return dispatchEventInSandbox;
    }()
  }, {
    key: "destroySandbox",
    value: function () {
      var _destroySandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                FirefoxCom.request("destroySandbox", null);

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function destroySandbox() {
        return _destroySandbox.apply(this, arguments);
      }

      return destroySandbox;
    }()
  }]);

  return FirefoxScripting;
}();

var FirefoxExternalServices = /*#__PURE__*/function (_DefaultExternalServi) {
  _inherits(FirefoxExternalServices, _DefaultExternalServi);

  var _super3 = _createSuper(FirefoxExternalServices);

  function FirefoxExternalServices() {
    _classCallCheck(this, FirefoxExternalServices);

    return _super3.apply(this, arguments);
  }

  _createClass(FirefoxExternalServices, null, [{
    key: "updateFindControlState",
    value: function updateFindControlState(data) {
      FirefoxCom.request("updateFindControlState", data);
    }
  }, {
    key: "updateFindMatchesCount",
    value: function updateFindMatchesCount(data) {
      FirefoxCom.request("updateFindMatchesCount", data);
    }
  }, {
    key: "initPassiveLoading",
    value: function initPassiveLoading(callbacks) {
      var pdfDataRangeTransport;
      window.addEventListener("message", function windowMessage(e) {
        var _pdfDataRangeTranspor;

        if (e.source !== null) {
          console.warn("Rejected untrusted message from " + e.origin);
          return;
        }

        var args = e.data;

        if (_typeof(args) !== "object" || !("pdfjsLoadAction" in args)) {
          return;
        }

        switch (args.pdfjsLoadAction) {
          case "supportsRangedLoading":
            if (args.done && !args.data) {
              callbacks.onError();
              break;
            }

            pdfDataRangeTransport = new FirefoxComDataRangeTransport(args.length, args.data, args.done, args.filename);
            callbacks.onOpenWithTransport(args.pdfUrl, args.length, pdfDataRangeTransport);
            break;

          case "range":
            pdfDataRangeTransport.onDataRange(args.begin, args.chunk);
            break;

          case "rangeProgress":
            pdfDataRangeTransport.onDataProgress(args.loaded);
            break;

          case "progressiveRead":
            pdfDataRangeTransport.onDataProgressiveRead(args.chunk);
            pdfDataRangeTransport.onDataProgress(args.loaded, args.total);
            break;

          case "progressiveDone":
            (_pdfDataRangeTranspor = pdfDataRangeTransport) === null || _pdfDataRangeTranspor === void 0 ? void 0 : _pdfDataRangeTranspor.onDataProgressiveDone();
            break;

          case "progress":
            callbacks.onProgress(args.loaded, args.total);
            break;

          case "complete":
            if (!args.data) {
              callbacks.onError(args.errorCode);
              break;
            }

            callbacks.onOpenWithData(args.data, args.filename);
            break;
        }
      });
      FirefoxCom.requestSync("initPassiveLoading", null);
    }
  }, {
    key: "fallback",
    value: function () {
      var _fallback = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10(data) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", FirefoxCom.requestAsync("fallback", data));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function fallback(_x7) {
        return _fallback.apply(this, arguments);
      }

      return fallback;
    }()
  }, {
    key: "reportTelemetry",
    value: function reportTelemetry(data) {
      FirefoxCom.request("reportTelemetry", JSON.stringify(data));
    }
  }, {
    key: "createDownloadManager",
    value: function createDownloadManager(options) {
      return new DownloadManager();
    }
  }, {
    key: "createPreferences",
    value: function createPreferences() {
      return new FirefoxPreferences();
    }
  }, {
    key: "createL10n",
    value: function createL10n(options) {
      var mozL10n = document.mozL10n;
      return new MozL10n(mozL10n);
    }
  }, {
    key: "createScripting",
    value: function createScripting(options) {
      return FirefoxScripting;
    }
  }, {
    key: "supportsIntegratedFind",
    get: function get() {
      var support = FirefoxCom.requestSync("supportsIntegratedFind");
      return (0, _pdf.shadow)(this, "supportsIntegratedFind", support);
    }
  }, {
    key: "supportsDocumentFonts",
    get: function get() {
      var support = FirefoxCom.requestSync("supportsDocumentFonts");
      return (0, _pdf.shadow)(this, "supportsDocumentFonts", support);
    }
  }, {
    key: "supportedMouseWheelZoomModifierKeys",
    get: function get() {
      var support = FirefoxCom.requestSync("supportedMouseWheelZoomModifierKeys");
      return (0, _pdf.shadow)(this, "supportedMouseWheelZoomModifierKeys", support);
    }
  }, {
    key: "isInAutomation",
    get: function get() {
      var isInAutomation = FirefoxCom.requestSync("isInAutomation");
      return (0, _pdf.shadow)(this, "isInAutomation", isInAutomation);
    }
  }]);

  return FirefoxExternalServices;
}(_app.DefaultExternalServices);

_app.PDFViewerApplication.externalServices = FirefoxExternalServices;
document.mozL10n.setExternalLocalizerServices({
  getLocale: function getLocale() {
    return FirefoxCom.requestSync("getLocale", null);
  },
  getStrings: function getStrings(key) {
    return FirefoxCom.requestSync("getStrings", key);
  }
});