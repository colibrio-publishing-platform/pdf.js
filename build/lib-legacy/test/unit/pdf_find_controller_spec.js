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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _test_utils = require("./test_utils.js");

var _event_utils = require("../../web/event_utils.js");

var _api = require("../../display/api.js");

var _pdf_find_controller = require("../../web/pdf_find_controller.js");

var _pdf_link_service = require("../../web/pdf_link_service.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var tracemonkeyFileName = "tracemonkey.pdf";

var MockLinkService = /*#__PURE__*/function (_SimpleLinkService) {
  _inherits(MockLinkService, _SimpleLinkService);

  var _super = _createSuper(MockLinkService);

  function MockLinkService() {
    var _this;

    _classCallCheck(this, MockLinkService);

    _this = _super.call(this);
    _this._page = 1;
    _this._pdfDocument = null;
    return _this;
  }

  _createClass(MockLinkService, [{
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      this._pdfDocument = pdfDocument;
    }
  }, {
    key: "pagesCount",
    get: function get() {
      return this._pdfDocument.numPages;
    }
  }, {
    key: "page",
    get: function get() {
      return this._page;
    },
    set: function set(value) {
      this._page = value;
    }
  }]);

  return MockLinkService;
}(_pdf_link_service.SimpleLinkService);

function initPdfFindController(_x) {
  return _initPdfFindController.apply(this, arguments);
}

function _initPdfFindController() {
  _initPdfFindController = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7(filename) {
    var loadingTask, pdfDocument, eventBus, linkService, pdfFindController;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename || tracemonkeyFileName));
            _context7.next = 3;
            return loadingTask.promise;

          case 3:
            pdfDocument = _context7.sent;
            eventBus = new _event_utils.EventBus();
            linkService = new MockLinkService();
            linkService.setDocument(pdfDocument);
            pdfFindController = new _pdf_find_controller.PDFFindController({
              linkService: linkService,
              eventBus: eventBus
            });
            pdfFindController.setDocument(pdfDocument);
            return _context7.abrupt("return", {
              eventBus: eventBus,
              pdfFindController: pdfFindController
            });

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _initPdfFindController.apply(this, arguments);
}

function testSearch(_ref) {
  var eventBus = _ref.eventBus,
      pdfFindController = _ref.pdfFindController,
      state = _ref.state,
      matchesPerPage = _ref.matchesPerPage,
      selectedMatch = _ref.selectedMatch,
      _ref$pageMatches = _ref.pageMatches,
      pageMatches = _ref$pageMatches === void 0 ? null : _ref$pageMatches,
      _ref$pageMatchesLengt = _ref.pageMatchesLength,
      pageMatchesLength = _ref$pageMatchesLengt === void 0 ? null : _ref$pageMatchesLengt;
  return new Promise(function (resolve) {
    var eventState = Object.assign(Object.create(null), {
      source: this,
      type: "",
      query: null,
      caseSensitive: false,
      entireWord: false,
      phraseSearch: true,
      findPrevious: false
    }, state);
    eventBus.dispatch("find", eventState);
    var totalPages = matchesPerPage.length;

    for (var i = totalPages - 1; i >= 0; i--) {
      if (matchesPerPage[i] > 0) {
        totalPages = i + 1;
        break;
      }
    }

    var totalMatches = matchesPerPage.reduce(function (a, b) {
      return a + b;
    });
    eventBus.on("updatefindmatchescount", function onUpdateFindMatchesCount(evt) {
      if (pdfFindController.pageMatches.length !== totalPages) {
        return;
      }

      eventBus.off("updatefindmatchescount", onUpdateFindMatchesCount);
      expect(evt.matchesCount.total).toBe(totalMatches);

      for (var _i = 0; _i < totalPages; _i++) {
        expect(pdfFindController.pageMatches[_i].length).toEqual(matchesPerPage[_i]);
      }

      expect(pdfFindController.selected.pageIdx).toEqual(selectedMatch.pageIndex);
      expect(pdfFindController.selected.matchIdx).toEqual(selectedMatch.matchIndex);

      if (pageMatches) {
        expect(pdfFindController.pageMatches).toEqual(pageMatches);
        expect(pdfFindController.pageMatchesLength).toEqual(pageMatchesLength);
      }

      resolve();
    });
  });
}

describe("pdf_find_controller", function () {
  it("performs a normal search", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _yield$initPdfFindCon, eventBus, pdfFindController;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return initPdfFindController();

          case 2:
            _yield$initPdfFindCon = _context.sent;
            eventBus = _yield$initPdfFindCon.eventBus;
            pdfFindController = _yield$initPdfFindCon.pdfFindController;
            _context.next = 7;
            return testSearch({
              eventBus: eventBus,
              pdfFindController: pdfFindController,
              state: {
                query: "Dynamic"
              },
              matchesPerPage: [11, 5, 0, 3, 0, 0, 0, 1, 1, 1, 0, 3, 4, 4],
              selectedMatch: {
                pageIndex: 0,
                matchIndex: 0
              }
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("performs a normal search and finds the previous result", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var _yield$initPdfFindCon2, eventBus, pdfFindController;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return initPdfFindController();

          case 2:
            _yield$initPdfFindCon2 = _context2.sent;
            eventBus = _yield$initPdfFindCon2.eventBus;
            pdfFindController = _yield$initPdfFindCon2.pdfFindController;
            _context2.next = 7;
            return testSearch({
              eventBus: eventBus,
              pdfFindController: pdfFindController,
              state: {
                query: "conference",
                findPrevious: true
              },
              matchesPerPage: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
              selectedMatch: {
                pageIndex: 13,
                matchIndex: 4
              }
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("performs a case sensitive search", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var _yield$initPdfFindCon3, eventBus, pdfFindController;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return initPdfFindController();

          case 2:
            _yield$initPdfFindCon3 = _context3.sent;
            eventBus = _yield$initPdfFindCon3.eventBus;
            pdfFindController = _yield$initPdfFindCon3.pdfFindController;
            _context3.next = 7;
            return testSearch({
              eventBus: eventBus,
              pdfFindController: pdfFindController,
              state: {
                query: "Dynamic",
                caseSensitive: true
              },
              matchesPerPage: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3],
              selectedMatch: {
                pageIndex: 0,
                matchIndex: 0
              }
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it("performs an entire word search", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var _yield$initPdfFindCon4, eventBus, pdfFindController;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return initPdfFindController();

          case 2:
            _yield$initPdfFindCon4 = _context4.sent;
            eventBus = _yield$initPdfFindCon4.eventBus;
            pdfFindController = _yield$initPdfFindCon4.pdfFindController;
            _context4.next = 7;
            return testSearch({
              eventBus: eventBus,
              pdfFindController: pdfFindController,
              state: {
                query: "Government",
                entireWord: true
              },
              matchesPerPage: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
              selectedMatch: {
                pageIndex: 12,
                matchIndex: 0
              }
            });

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it("performs a multiple term (no phrase) search", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var _yield$initPdfFindCon5, eventBus, pdfFindController;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return initPdfFindController();

          case 2:
            _yield$initPdfFindCon5 = _context5.sent;
            eventBus = _yield$initPdfFindCon5.eventBus;
            pdfFindController = _yield$initPdfFindCon5.pdfFindController;
            _context5.next = 7;
            return testSearch({
              eventBus: eventBus,
              pdfFindController: pdfFindController,
              state: {
                query: "alternate solution",
                phraseSearch: false
              },
              matchesPerPage: [0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0],
              selectedMatch: {
                pageIndex: 5,
                matchIndex: 0
              }
            });

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it("performs a normal search, where the text is normalized", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var _yield$initPdfFindCon6, eventBus, pdfFindController;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return initPdfFindController("fraction-highlight.pdf");

          case 2:
            _yield$initPdfFindCon6 = _context6.sent;
            eventBus = _yield$initPdfFindCon6.eventBus;
            pdfFindController = _yield$initPdfFindCon6.pdfFindController;
            _context6.next = 7;
            return testSearch({
              eventBus: eventBus,
              pdfFindController: pdfFindController,
              state: {
                query: "fraction"
              },
              matchesPerPage: [3],
              selectedMatch: {
                pageIndex: 0,
                matchIndex: 0
              },
              pageMatches: [[19, 46, 62]],
              pageMatchesLength: [[8, 8, 8]]
            });

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
});