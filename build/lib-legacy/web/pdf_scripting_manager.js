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
exports.PDFScriptingManager = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _ui_utils = require("./ui_utils.js");

var _pdf = require("../pdf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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

var PDFScriptingManager = /*#__PURE__*/function () {
  function PDFScriptingManager(_ref) {
    var eventBus = _ref.eventBus,
        _ref$sandboxBundleSrc = _ref.sandboxBundleSrc,
        sandboxBundleSrc = _ref$sandboxBundleSrc === void 0 ? null : _ref$sandboxBundleSrc,
        _ref$scriptingFactory = _ref.scriptingFactory,
        scriptingFactory = _ref$scriptingFactory === void 0 ? null : _ref$scriptingFactory,
        _ref$docPropertiesLoo = _ref.docPropertiesLookup,
        docPropertiesLookup = _ref$docPropertiesLoo === void 0 ? null : _ref$docPropertiesLoo;

    _classCallCheck(this, PDFScriptingManager);

    this._pdfDocument = null;
    this._pdfViewer = null;
    this._closeCapability = null;
    this._destroyCapability = null;
    this._scripting = null;
    this._mouseState = Object.create(null);
    this._ready = false;
    this._eventBus = eventBus;
    this._sandboxBundleSrc = sandboxBundleSrc;
    this._scriptingFactory = scriptingFactory;
    this._docPropertiesLookup = docPropertiesLookup;
  }

  _createClass(PDFScriptingManager, [{
    key: "setViewer",
    value: function setViewer(pdfViewer) {
      this._pdfViewer = pdfViewer;
    }
  }, {
    key: "setDocument",
    value: function () {
      var _setDocument = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(pdfDocument) {
        var _this = this,
            _this$_scripting3;

        var _yield$Promise$all, _yield$Promise$all2, objects, calculationOrder, docActions, _iterator, _step, _step$value, name, listener, _iterator2, _step2, _step2$value, _name, _listener, docProperties;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._pdfDocument) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this._destroyScripting();

              case 3:
                this._pdfDocument = pdfDocument;

                if (pdfDocument) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return");

              case 6:
                _context2.next = 8;
                return Promise.all([pdfDocument.getFieldObjects(), pdfDocument.getCalculationOrderIds(), pdfDocument.getJSActions()]);

              case 8:
                _yield$Promise$all = _context2.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
                objects = _yield$Promise$all2[0];
                calculationOrder = _yield$Promise$all2[1];
                docActions = _yield$Promise$all2[2];

                if (!(!objects && !docActions)) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 16;
                return this._destroyScripting();

              case 16:
                return _context2.abrupt("return");

              case 17:
                if (!(pdfDocument !== this._pdfDocument)) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt("return");

              case 19:
                _context2.prev = 19;
                this._scripting = this._createScripting();
                _context2.next = 29;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](19);
                console.error("PDFScriptingManager.setDocument: \"".concat(_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.message, "\"."));
                _context2.next = 28;
                return this._destroyScripting();

              case 28:
                return _context2.abrupt("return");

              case 29:
                this._internalEvents.set("updatefromsandbox", function (event) {
                  if ((event === null || event === void 0 ? void 0 : event.source) !== window) {
                    return;
                  }

                  _this._updateFromSandbox(event.detail);
                });

                this._internalEvents.set("dispatcheventinsandbox", function (event) {
                  var _this$_scripting;

                  (_this$_scripting = _this._scripting) === null || _this$_scripting === void 0 ? void 0 : _this$_scripting.dispatchEventInSandbox(event.detail);
                });

                this._internalEvents.set("pagechanging", function (_ref2) {
                  var pageNumber = _ref2.pageNumber,
                      previous = _ref2.previous;

                  if (pageNumber === previous) {
                    return;
                  }

                  _this._dispatchPageClose(previous);

                  _this._dispatchPageOpen(pageNumber);
                });

                this._internalEvents.set("pagerendered", function (_ref3) {
                  var pageNumber = _ref3.pageNumber;

                  if (!_this._pageOpenPending.has(pageNumber)) {
                    return;
                  }

                  if (pageNumber !== _this._pdfViewer.currentPageNumber) {
                    return;
                  }

                  _this._dispatchPageOpen(pageNumber);
                });

                this._internalEvents.set("pagesdestroy", /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(event) {
                    var _this$_scripting2, _this$_closeCapabilit;

                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this._dispatchPageClose(_this._pdfViewer.currentPageNumber);

                          case 2:
                            _context.next = 4;
                            return (_this$_scripting2 = _this._scripting) === null || _this$_scripting2 === void 0 ? void 0 : _this$_scripting2.dispatchEventInSandbox({
                              id: "doc",
                              name: "WillClose"
                            });

                          case 4:
                            (_this$_closeCapabilit = _this._closeCapability) === null || _this$_closeCapabilit === void 0 ? void 0 : _this$_closeCapabilit.resolve();

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref4.apply(this, arguments);
                  };
                }());

                this._domEvents.set("mousedown", function (event) {
                  _this._mouseState.isDown = true;
                });

                this._domEvents.set("mouseup", function (event) {
                  _this._mouseState.isDown = false;
                });

                _iterator = _createForOfIteratorHelper(this._internalEvents);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _step$value = _slicedToArray(_step.value, 2), name = _step$value[0], listener = _step$value[1];

                    this._eventBus._on(name, listener);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _iterator2 = _createForOfIteratorHelper(this._domEvents);

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    _step2$value = _slicedToArray(_step2.value, 2), _name = _step2$value[0], _listener = _step2$value[1];
                    window.addEventListener(_name, _listener);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

                _context2.prev = 40;
                _context2.next = 43;
                return this._getDocProperties();

              case 43:
                docProperties = _context2.sent;

                if (!(pdfDocument !== this._pdfDocument)) {
                  _context2.next = 46;
                  break;
                }

                return _context2.abrupt("return");

              case 46:
                _context2.next = 48;
                return this._scripting.createSandbox({
                  objects: objects,
                  calculationOrder: calculationOrder,
                  appInfo: {
                    platform: navigator.platform,
                    language: navigator.language
                  },
                  docInfo: _objectSpread(_objectSpread({}, docProperties), {}, {
                    actions: docActions
                  })
                });

              case 48:
                this._eventBus.dispatch("sandboxcreated", {
                  source: this
                });

                _context2.next = 57;
                break;

              case 51:
                _context2.prev = 51;
                _context2.t1 = _context2["catch"](40);
                console.error("PDFScriptingManager.setDocument: \"".concat(_context2.t1 === null || _context2.t1 === void 0 ? void 0 : _context2.t1.message, "\"."));
                _context2.next = 56;
                return this._destroyScripting();

              case 56:
                return _context2.abrupt("return");

              case 57:
                _context2.next = 59;
                return (_this$_scripting3 = this._scripting) === null || _this$_scripting3 === void 0 ? void 0 : _this$_scripting3.dispatchEventInSandbox({
                  id: "doc",
                  name: "Open"
                });

              case 59:
                _context2.next = 61;
                return this._dispatchPageOpen(this._pdfViewer.currentPageNumber, true);

              case 61:
                Promise.resolve().then(function () {
                  if (pdfDocument === _this._pdfDocument) {
                    _this._ready = true;
                  }
                });

              case 62:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[19, 23], [40, 51]]);
      }));

      function setDocument(_x) {
        return _setDocument.apply(this, arguments);
      }

      return setDocument;
    }()
  }, {
    key: "dispatchWillSave",
    value: function () {
      var _dispatchWillSave = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(detail) {
        var _this$_scripting4;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", (_this$_scripting4 = this._scripting) === null || _this$_scripting4 === void 0 ? void 0 : _this$_scripting4.dispatchEventInSandbox({
                  id: "doc",
                  name: "WillSave"
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function dispatchWillSave(_x3) {
        return _dispatchWillSave.apply(this, arguments);
      }

      return dispatchWillSave;
    }()
  }, {
    key: "dispatchDidSave",
    value: function () {
      var _dispatchDidSave = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(detail) {
        var _this$_scripting5;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", (_this$_scripting5 = this._scripting) === null || _this$_scripting5 === void 0 ? void 0 : _this$_scripting5.dispatchEventInSandbox({
                  id: "doc",
                  name: "DidSave"
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function dispatchDidSave(_x4) {
        return _dispatchDidSave.apply(this, arguments);
      }

      return dispatchDidSave;
    }()
  }, {
    key: "dispatchWillPrint",
    value: function () {
      var _dispatchWillPrint = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(detail) {
        var _this$_scripting6;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", (_this$_scripting6 = this._scripting) === null || _this$_scripting6 === void 0 ? void 0 : _this$_scripting6.dispatchEventInSandbox({
                  id: "doc",
                  name: "WillPrint"
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function dispatchWillPrint(_x5) {
        return _dispatchWillPrint.apply(this, arguments);
      }

      return dispatchWillPrint;
    }()
  }, {
    key: "dispatchDidPrint",
    value: function () {
      var _dispatchDidPrint = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6(detail) {
        var _this$_scripting7;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", (_this$_scripting7 = this._scripting) === null || _this$_scripting7 === void 0 ? void 0 : _this$_scripting7.dispatchEventInSandbox({
                  id: "doc",
                  name: "DidPrint"
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function dispatchDidPrint(_x6) {
        return _dispatchDidPrint.apply(this, arguments);
      }

      return dispatchDidPrint;
    }()
  }, {
    key: "mouseState",
    get: function get() {
      return this._mouseState;
    }
  }, {
    key: "destroyPromise",
    get: function get() {
      var _this$_destroyCapabil;

      return ((_this$_destroyCapabil = this._destroyCapability) === null || _this$_destroyCapabil === void 0 ? void 0 : _this$_destroyCapabil.promise) || null;
    }
  }, {
    key: "ready",
    get: function get() {
      return this._ready;
    }
  }, {
    key: "_internalEvents",
    get: function get() {
      return (0, _pdf.shadow)(this, "_internalEvents", new Map());
    }
  }, {
    key: "_domEvents",
    get: function get() {
      return (0, _pdf.shadow)(this, "_domEvents", new Map());
    }
  }, {
    key: "_pageOpenPending",
    get: function get() {
      return (0, _pdf.shadow)(this, "_pageOpenPending", new Set());
    }
  }, {
    key: "_visitedPages",
    get: function get() {
      return (0, _pdf.shadow)(this, "_visitedPages", new Map());
    }
  }, {
    key: "_updateFromSandbox",
    value: function () {
      var _updateFromSandbox2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7(detail) {
        var isInPresentationMode, id, siblings, command, value, modes, ids, _iterator3, _step3, elementId, element, _this$_pdfDocument;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                isInPresentationMode = this._pdfViewer.isInPresentationMode || this._pdfViewer.isChangingPresentationMode;
                id = detail.id, siblings = detail.siblings, command = detail.command, value = detail.value;

                if (id) {
                  _context7.next = 46;
                  break;
                }

                _context7.t0 = command;
                _context7.next = _context7.t0 === "clear" ? 6 : _context7.t0 === "error" ? 8 : _context7.t0 === "layout" ? 10 : _context7.t0 === "page-num" ? 15 : _context7.t0 === "print" ? 17 : _context7.t0 === "println" ? 21 : _context7.t0 === "zoom" ? 23 : _context7.t0 === "SaveAs" ? 27 : _context7.t0 === "FirstPage" ? 29 : _context7.t0 === "LastPage" ? 31 : _context7.t0 === "NextPage" ? 33 : _context7.t0 === "PrevPage" ? 35 : _context7.t0 === "ZoomViewIn" ? 37 : _context7.t0 === "ZoomViewOut" ? 41 : 45;
                break;

              case 6:
                console.clear();
                return _context7.abrupt("break", 45);

              case 8:
                console.error(value);
                return _context7.abrupt("break", 45);

              case 10:
                if (!isInPresentationMode) {
                  _context7.next = 12;
                  break;
                }

                return _context7.abrupt("return");

              case 12:
                modes = (0, _ui_utils.apiPageLayoutToViewerModes)(value);
                this._pdfViewer.spreadMode = modes.spreadMode;
                return _context7.abrupt("break", 45);

              case 15:
                this._pdfViewer.currentPageNumber = value + 1;
                return _context7.abrupt("break", 45);

              case 17:
                _context7.next = 19;
                return this._pdfViewer.pagesPromise;

              case 19:
                this._eventBus.dispatch("print", {
                  source: this
                });

                return _context7.abrupt("break", 45);

              case 21:
                console.log(value);
                return _context7.abrupt("break", 45);

              case 23:
                if (!isInPresentationMode) {
                  _context7.next = 25;
                  break;
                }

                return _context7.abrupt("return");

              case 25:
                this._pdfViewer.currentScaleValue = value;
                return _context7.abrupt("break", 45);

              case 27:
                this._eventBus.dispatch("save", {
                  source: this
                });

                return _context7.abrupt("break", 45);

              case 29:
                this._pdfViewer.currentPageNumber = 1;
                return _context7.abrupt("break", 45);

              case 31:
                this._pdfViewer.currentPageNumber = this._pdfViewer.pagesCount;
                return _context7.abrupt("break", 45);

              case 33:
                this._pdfViewer.nextPage();

                return _context7.abrupt("break", 45);

              case 35:
                this._pdfViewer.previousPage();

                return _context7.abrupt("break", 45);

              case 37:
                if (!isInPresentationMode) {
                  _context7.next = 39;
                  break;
                }

                return _context7.abrupt("return");

              case 39:
                this._pdfViewer.increaseScale();

                return _context7.abrupt("break", 45);

              case 41:
                if (!isInPresentationMode) {
                  _context7.next = 43;
                  break;
                }

                return _context7.abrupt("return");

              case 43:
                this._pdfViewer.decreaseScale();

                return _context7.abrupt("break", 45);

              case 45:
                return _context7.abrupt("return");

              case 46:
                if (!isInPresentationMode) {
                  _context7.next = 49;
                  break;
                }

                if (!detail.focus) {
                  _context7.next = 49;
                  break;
                }

                return _context7.abrupt("return");

              case 49:
                delete detail.id;
                delete detail.siblings;
                ids = siblings ? [id].concat(_toConsumableArray(siblings)) : [id];
                _iterator3 = _createForOfIteratorHelper(ids);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    elementId = _step3.value;
                    element = document.getElementById(elementId);

                    if (element) {
                      element.dispatchEvent(new CustomEvent("updatefromsandbox", {
                        detail: detail
                      }));
                    } else {
                      (_this$_pdfDocument = this._pdfDocument) === null || _this$_pdfDocument === void 0 ? void 0 : _this$_pdfDocument.annotationStorage.setValue(elementId, detail);
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

              case 54:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _updateFromSandbox(_x7) {
        return _updateFromSandbox2.apply(this, arguments);
      }

      return _updateFromSandbox;
    }()
  }, {
    key: "_dispatchPageOpen",
    value: function () {
      var _dispatchPageOpen2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9(pageNumber) {
        var _this2 = this;

        var initialize,
            pdfDocument,
            visitedPages,
            pageView,
            actionsPromise,
            _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                initialize = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : false;
                pdfDocument = this._pdfDocument, visitedPages = this._visitedPages;

                if (initialize) {
                  this._closeCapability = (0, _pdf.createPromiseCapability)();
                }

                if (this._closeCapability) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt("return");

              case 5:
                pageView = this._pdfViewer.getPageView(pageNumber - 1);

                if (!((pageView === null || pageView === void 0 ? void 0 : pageView.renderingState) !== _ui_utils.RenderingStates.FINISHED)) {
                  _context9.next = 9;
                  break;
                }

                this._pageOpenPending.add(pageNumber);

                return _context9.abrupt("return");

              case 9:
                this._pageOpenPending["delete"](pageNumber);

                actionsPromise = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
                  var _pageView$pdfPage, _this2$_scripting;

                  var actions;
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          _context8.next = 2;
                          return !visitedPages.has(pageNumber) ? (_pageView$pdfPage = pageView.pdfPage) === null || _pageView$pdfPage === void 0 ? void 0 : _pageView$pdfPage.getJSActions() : null;

                        case 2:
                          actions = _context8.sent;

                          if (!(pdfDocument !== _this2._pdfDocument)) {
                            _context8.next = 5;
                            break;
                          }

                          return _context8.abrupt("return");

                        case 5:
                          _context8.next = 7;
                          return (_this2$_scripting = _this2._scripting) === null || _this2$_scripting === void 0 ? void 0 : _this2$_scripting.dispatchEventInSandbox({
                            id: "page",
                            name: "PageOpen",
                            pageNumber: pageNumber,
                            actions: actions
                          });

                        case 7:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }))();
                visitedPages.set(pageNumber, actionsPromise);

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _dispatchPageOpen(_x8) {
        return _dispatchPageOpen2.apply(this, arguments);
      }

      return _dispatchPageOpen;
    }()
  }, {
    key: "_dispatchPageClose",
    value: function () {
      var _dispatchPageClose2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10(pageNumber) {
        var _this$_scripting8;

        var pdfDocument, visitedPages, actionsPromise;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                pdfDocument = this._pdfDocument, visitedPages = this._visitedPages;

                if (this._closeCapability) {
                  _context10.next = 3;
                  break;
                }

                return _context10.abrupt("return");

              case 3:
                if (!this._pageOpenPending.has(pageNumber)) {
                  _context10.next = 5;
                  break;
                }

                return _context10.abrupt("return");

              case 5:
                actionsPromise = visitedPages.get(pageNumber);

                if (actionsPromise) {
                  _context10.next = 8;
                  break;
                }

                return _context10.abrupt("return");

              case 8:
                visitedPages.set(pageNumber, null);
                _context10.next = 11;
                return actionsPromise;

              case 11:
                if (!(pdfDocument !== this._pdfDocument)) {
                  _context10.next = 13;
                  break;
                }

                return _context10.abrupt("return");

              case 13:
                _context10.next = 15;
                return (_this$_scripting8 = this._scripting) === null || _this$_scripting8 === void 0 ? void 0 : _this$_scripting8.dispatchEventInSandbox({
                  id: "page",
                  name: "PageClose",
                  pageNumber: pageNumber
                });

              case 15:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _dispatchPageClose(_x9) {
        return _dispatchPageClose2.apply(this, arguments);
      }

      return _dispatchPageClose;
    }()
  }, {
    key: "_getDocProperties",
    value: function () {
      var _getDocProperties2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this._docPropertiesLookup) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt("return", this._docPropertiesLookup(this._pdfDocument));

              case 2:
                throw new Error("_getDocProperties: Unable to lookup properties.");

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function _getDocProperties() {
        return _getDocProperties2.apply(this, arguments);
      }

      return _getDocProperties;
    }()
  }, {
    key: "_createScripting",
    value: function _createScripting() {
      this._destroyCapability = (0, _pdf.createPromiseCapability)();

      if (this._scripting) {
        throw new Error("_createScripting: Scripting already exists.");
      }

      if (this._scriptingFactory) {
        return this._scriptingFactory.createScripting({
          sandboxBundleSrc: this._sandboxBundleSrc
        });
      }

      throw new Error("_createScripting: Cannot create scripting.");
    }
  }, {
    key: "_destroyScripting",
    value: function () {
      var _destroyScripting2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
        var _this$_destroyCapabil3;

        var _this$_destroyCapabil2, _iterator4, _step4, _step4$value, name, listener, _iterator5, _step5, _step5$value, _name2, _listener2;

        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (this._scripting) {
                  _context12.next = 4;
                  break;
                }

                this._pdfDocument = null;
                (_this$_destroyCapabil2 = this._destroyCapability) === null || _this$_destroyCapabil2 === void 0 ? void 0 : _this$_destroyCapabil2.resolve();
                return _context12.abrupt("return");

              case 4:
                if (!this._closeCapability) {
                  _context12.next = 8;
                  break;
                }

                _context12.next = 7;
                return Promise.race([this._closeCapability.promise, new Promise(function (resolve) {
                  setTimeout(resolve, 1000);
                })])["catch"](function (reason) {});

              case 7:
                this._closeCapability = null;

              case 8:
                this._pdfDocument = null;
                _context12.prev = 9;
                _context12.next = 12;
                return this._scripting.destroySandbox();

              case 12:
                _context12.next = 16;
                break;

              case 14:
                _context12.prev = 14;
                _context12.t0 = _context12["catch"](9);

              case 16:
                _iterator4 = _createForOfIteratorHelper(this._internalEvents);

                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    _step4$value = _slicedToArray(_step4.value, 2), name = _step4$value[0], listener = _step4$value[1];

                    this._eventBus._off(name, listener);
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }

                this._internalEvents.clear();

                _iterator5 = _createForOfIteratorHelper(this._domEvents);

                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    _step5$value = _slicedToArray(_step5.value, 2), _name2 = _step5$value[0], _listener2 = _step5$value[1];
                    window.removeEventListener(_name2, _listener2);
                  }
                } catch (err) {
                  _iterator5.e(err);
                } finally {
                  _iterator5.f();
                }

                this._domEvents.clear();

                this._pageOpenPending.clear();

                this._visitedPages.clear();

                this._scripting = null;
                delete this._mouseState.isDown;
                this._ready = false;
                (_this$_destroyCapabil3 = this._destroyCapability) === null || _this$_destroyCapabil3 === void 0 ? void 0 : _this$_destroyCapabil3.resolve();

              case 28:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[9, 14]]);
      }));

      function _destroyScripting() {
        return _destroyScripting2.apply(this, arguments);
      }

      return _destroyScripting;
    }()
  }]);

  return PDFScriptingManager;
}();

exports.PDFScriptingManager = PDFScriptingManager;