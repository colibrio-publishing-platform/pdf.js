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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../../shared/util.js");

var _test_utils = require("./test_utils.js");

var _api = require("../../display/api.js");

var _display_utils = require("../../display/display_utils.js");

var _ui_utils = require("../../web/ui_utils.js");

var _image_utils = require("../../core/image_utils.js");

var _worker_options = require("../../display/worker_options.js");

var _is_node = require("../../shared/is_node.js");

var _metadata = require("../../display/metadata.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("api", function () {
  var basicApiFileName = "basicapi.pdf";
  var basicApiFileLength = 105779;
  var basicApiGetDocumentParams = (0, _test_utils.buildGetDocumentParams)(basicApiFileName);
  var CanvasFactory;
  beforeAll(function () {
    CanvasFactory = new _api.DefaultCanvasFactory();
  });
  afterAll(function () {
    CanvasFactory = null;
  });

  function waitSome(callback) {
    var WAIT_TIMEOUT = 10;
    setTimeout(function () {
      callback();
    }, WAIT_TIMEOUT);
  }

  function mergeText(items) {
    return items.map(function (chunk) {
      return chunk.str + (chunk.hasEOL ? "\n" : "");
    }).join("");
  }

  describe("getDocument", function () {
    it("creates pdf doc from URL-string", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var urlStr, loadingTask, pdfDocument;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              urlStr = _test_utils.TEST_PDFS_PATH + basicApiFileName;
              loadingTask = (0, _api.getDocument)(urlStr);
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context.next = 5;
              return loadingTask.promise;

            case 5:
              pdfDocument = _context.sent;
              expect(_typeof(urlStr)).toEqual("string");
              expect(pdfDocument instanceof _api.PDFDocumentProxy).toEqual(true);
              expect(pdfDocument.numPages).toEqual(3);
              _context.next = 11;
              return loadingTask.destroy();

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it("creates pdf doc from URL-object", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var urlObj, loadingTask, pdfDocument;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_is_node.isNodeJS) {
                pending("window.location is not supported in Node.js.");
              }

              urlObj = new URL(_test_utils.TEST_PDFS_PATH + basicApiFileName, window.location);
              loadingTask = (0, _api.getDocument)(urlObj);
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context2.next = 6;
              return loadingTask.promise;

            case 6:
              pdfDocument = _context2.sent;
              expect(urlObj instanceof URL).toEqual(true);
              expect(pdfDocument instanceof _api.PDFDocumentProxy).toEqual(true);
              expect(pdfDocument.numPages).toEqual(3);
              _context2.next = 12;
              return loadingTask.destroy();

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("creates pdf doc from URL", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var loadingTask, progressReportedCapability, data;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              loadingTask = (0, _api.getDocument)(basicApiGetDocumentParams);
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              progressReportedCapability = (0, _util.createPromiseCapability)();

              loadingTask.onProgress = function (progressData) {
                if (!progressReportedCapability.settled) {
                  progressReportedCapability.resolve(progressData);
                }
              };

              _context3.next = 6;
              return Promise.all([progressReportedCapability.promise, loadingTask.promise]);

            case 6:
              data = _context3.sent;
              expect(data[0].loaded / data[0].total >= 0).toEqual(true);
              expect(data[1] instanceof _api.PDFDocumentProxy).toEqual(true);
              expect(loadingTask).toEqual(data[1].loadingTask);
              _context3.next = 12;
              return loadingTask.destroy();

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it("creates pdf doc from URL and aborts before worker initialized", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var loadingTask, destroyed;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              loadingTask = (0, _api.getDocument)(basicApiGetDocumentParams);
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              destroyed = loadingTask.destroy();
              _context4.prev = 3;
              _context4.next = 6;
              return loadingTask.promise;

            case 6:
              expect(false).toEqual(true);
              _context4.next = 14;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](3);
              expect(true).toEqual(true);
              _context4.next = 14;
              return destroyed;

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 9]]);
    })));
    it("creates pdf doc from URL and aborts loading after worker initialized", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var loadingTask, destroyed;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              loadingTask = (0, _api.getDocument)(basicApiGetDocumentParams);
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              destroyed = loadingTask._worker.promise.then(function () {
                return loadingTask.destroy();
              });
              _context5.next = 5;
              return destroyed;

            case 5:
              expect(true).toEqual(true);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it("creates pdf doc from typed array", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var typedArrayPdf, loadingTask, progressReportedCapability, data;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _test_utils.DefaultFileReaderFactory.fetch({
                path: _test_utils.TEST_PDFS_PATH + basicApiFileName
              });

            case 2:
              typedArrayPdf = _context6.sent;
              expect(typedArrayPdf.length).toEqual(basicApiFileLength);
              loadingTask = (0, _api.getDocument)(typedArrayPdf);
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              progressReportedCapability = (0, _util.createPromiseCapability)();

              loadingTask.onProgress = function (data) {
                progressReportedCapability.resolve(data);
              };

              _context6.next = 10;
              return Promise.all([loadingTask.promise, progressReportedCapability.promise]);

            case 10:
              data = _context6.sent;
              expect(data[0] instanceof _api.PDFDocumentProxy).toEqual(true);
              expect(data[1].loaded / data[1].total).toEqual(1);
              _context6.next = 15;
              return loadingTask.destroy();

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it("creates pdf doc from invalid PDF file", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var loadingTask;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("bug1020226.pdf"));
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context7.prev = 2;
              _context7.next = 5;
              return loadingTask.promise;

            case 5:
              expect(false).toEqual(true);
              _context7.next = 12;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](2);
              expect(_context7.t0 instanceof _util.InvalidPDFException).toEqual(true);
              expect(_context7.t0.message).toEqual("Invalid PDF structure.");

            case 12:
              _context7.next = 14;
              return loadingTask.destroy();

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[2, 8]]);
    })));
    it("creates pdf doc from non-existent URL", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var loadingTask;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!_is_node.isNodeJS) {
                pending("Fails intermittently on Linux in browsers.");
              }

              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("non-existent.pdf"));
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context8.prev = 3;
              _context8.next = 6;
              return loadingTask.promise;

            case 6:
              expect(false).toEqual(true);
              _context8.next = 12;
              break;

            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](3);
              expect(_context8.t0 instanceof _util.MissingPDFException).toEqual(true);

            case 12:
              _context8.next = 14;
              return loadingTask.destroy();

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[3, 9]]);
    })));
    it("creates pdf doc from PDF file protected with user and owner password", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var loadingTask, passwordNeededCapability, passwordIncorrectCapability, data;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("pr6531_1.pdf"));
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              passwordNeededCapability = (0, _util.createPromiseCapability)();
              passwordIncorrectCapability = (0, _util.createPromiseCapability)();

              loadingTask.onPassword = function (updatePassword, reason) {
                if (reason === _util.PasswordResponses.NEED_PASSWORD && !passwordNeededCapability.settled) {
                  passwordNeededCapability.resolve();
                  updatePassword("qwerty");
                  return;
                }

                if (reason === _util.PasswordResponses.INCORRECT_PASSWORD && !passwordIncorrectCapability.settled) {
                  passwordIncorrectCapability.resolve();
                  updatePassword("asdfasdf");
                  return;
                }

                expect(false).toEqual(true);
              };

              _context9.next = 7;
              return Promise.all([passwordNeededCapability.promise, passwordIncorrectCapability.promise, loadingTask.promise]);

            case 7:
              data = _context9.sent;
              expect(data[2] instanceof _api.PDFDocumentProxy).toEqual(true);
              _context9.next = 11;
              return loadingTask.destroy();

            case 11:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it("creates pdf doc from PDF file protected with only a user password", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var filename, passwordNeededLoadingTask, result1, passwordIncorrectLoadingTask, result2, passwordAcceptedLoadingTask, result3;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              filename = "pr6531_2.pdf";
              passwordNeededLoadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename, {
                password: ""
              }));
              expect(passwordNeededLoadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              result1 = passwordNeededLoadingTask.promise.then(function () {
                expect(false).toEqual(true);
                return Promise.reject(new Error("loadingTask should be rejected"));
              }, function (data) {
                expect(data instanceof _util.PasswordException).toEqual(true);
                expect(data.code).toEqual(_util.PasswordResponses.NEED_PASSWORD);
                return passwordNeededLoadingTask.destroy();
              });
              passwordIncorrectLoadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename, {
                password: "qwerty"
              }));
              expect(passwordIncorrectLoadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              result2 = passwordIncorrectLoadingTask.promise.then(function () {
                expect(false).toEqual(true);
                return Promise.reject(new Error("loadingTask should be rejected"));
              }, function (data) {
                expect(data instanceof _util.PasswordException).toEqual(true);
                expect(data.code).toEqual(_util.PasswordResponses.INCORRECT_PASSWORD);
                return passwordIncorrectLoadingTask.destroy();
              });
              passwordAcceptedLoadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename, {
                password: "asdfasdf"
              }));
              expect(passwordAcceptedLoadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              result3 = passwordAcceptedLoadingTask.promise.then(function (data) {
                expect(data instanceof _api.PDFDocumentProxy).toEqual(true);
                return passwordAcceptedLoadingTask.destroy();
              });
              _context10.next = 12;
              return Promise.all([result1, result2, result3]);

            case 12:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it("creates pdf doc from password protected PDF file and aborts/throws " + "in the onPassword callback (issue 7806)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var filename, passwordNeededLoadingTask, passwordIncorrectLoadingTask, passwordNeededDestroyed, result1, result2;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              filename = "issue3371.pdf";
              passwordNeededLoadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename));
              expect(passwordNeededLoadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              passwordIncorrectLoadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename, {
                password: "qwerty"
              }));
              expect(passwordIncorrectLoadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);

              passwordNeededLoadingTask.onPassword = function (callback, reason) {
                if (reason === _util.PasswordResponses.NEED_PASSWORD) {
                  passwordNeededDestroyed = passwordNeededLoadingTask.destroy();
                  return;
                }

                expect(false).toEqual(true);
              };

              result1 = passwordNeededLoadingTask.promise.then(function () {
                expect(false).toEqual(true);
                return Promise.reject(new Error("loadingTask should be rejected"));
              }, function (reason) {
                expect(reason instanceof _util.PasswordException).toEqual(true);
                expect(reason.code).toEqual(_util.PasswordResponses.NEED_PASSWORD);
                return passwordNeededDestroyed;
              });

              passwordIncorrectLoadingTask.onPassword = function (callback, reason) {
                if (reason === _util.PasswordResponses.INCORRECT_PASSWORD) {
                  throw new Error("Incorrect password");
                }

                expect(false).toEqual(true);
              };

              result2 = passwordIncorrectLoadingTask.promise.then(function () {
                expect(false).toEqual(true);
                return Promise.reject(new Error("loadingTask should be rejected"));
              }, function (reason) {
                expect(reason instanceof _util.PasswordException).toEqual(true);
                expect(reason.code).toEqual(_util.PasswordResponses.INCORRECT_PASSWORD);
                return passwordIncorrectLoadingTask.destroy();
              });
              _context11.next = 11;
              return Promise.all([result1, result2]);

            case 11:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it("creates pdf doc from empty typed array", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var loadingTask;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              loadingTask = (0, _api.getDocument)(new Uint8Array(0));
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context12.prev = 2;
              _context12.next = 5;
              return loadingTask.promise;

            case 5:
              expect(false).toEqual(true);
              _context12.next = 12;
              break;

            case 8:
              _context12.prev = 8;
              _context12.t0 = _context12["catch"](2);
              expect(_context12.t0 instanceof _util.InvalidPDFException).toEqual(true);
              expect(_context12.t0.message).toEqual("The PDF file is empty, i.e. its size is zero bytes.");

            case 12:
              _context12.next = 14;
              return loadingTask.destroy();

            case 14:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[2, 8]]);
    })));
    it("checks that `docId`s are unique and increasing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var _docIdRegExp$exec, _docIdRegExp$exec2;

      var loadingTask1, docId1, loadingTask2, docId2, docIdRegExp, docNum1, docNum2;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              loadingTask1 = (0, _api.getDocument)(basicApiGetDocumentParams);
              expect(loadingTask1 instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context13.next = 4;
              return loadingTask1.promise;

            case 4:
              docId1 = loadingTask1.docId;
              loadingTask2 = (0, _api.getDocument)(basicApiGetDocumentParams);
              expect(loadingTask2 instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context13.next = 9;
              return loadingTask2.promise;

            case 9:
              docId2 = loadingTask2.docId;
              expect(docId1).not.toEqual(docId2);
              docIdRegExp = /^d(\d+)$/, docNum1 = (_docIdRegExp$exec = docIdRegExp.exec(docId1)) === null || _docIdRegExp$exec === void 0 ? void 0 : _docIdRegExp$exec[1], docNum2 = (_docIdRegExp$exec2 = docIdRegExp.exec(docId2)) === null || _docIdRegExp$exec2 === void 0 ? void 0 : _docIdRegExp$exec2[1];
              expect(+docNum1).toBeLessThan(+docNum2);
              _context13.next = 15;
              return Promise.all([loadingTask1.destroy(), loadingTask2.destroy()]);

            case 15:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    it("creates pdf doc from PDF file with bad XRef entry", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var loadingTask, pdfDocument, page, opList;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("PDFBOX-4352-0.pdf", {
                rangeChunkSize: 100
              }));
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context14.next = 4;
              return loadingTask.promise;

            case 4:
              pdfDocument = _context14.sent;
              expect(pdfDocument.numPages).toEqual(1);
              _context14.next = 8;
              return pdfDocument.getPage(1);

            case 8:
              page = _context14.sent;
              expect(page instanceof _api.PDFPageProxy).toEqual(true);
              _context14.next = 12;
              return page.getOperatorList();

            case 12:
              opList = _context14.sent;
              expect(opList.fnArray.length).toEqual(0);
              expect(opList.argsArray.length).toEqual(0);
              expect(opList.lastChunk).toEqual(true);
              _context14.next = 18;
              return loadingTask.destroy();

            case 18:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it("creates pdf doc from PDF file with bad XRef header", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var loadingTask, pdfDocument, page, opList;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("GHOSTSCRIPT-698804-1-fuzzed.pdf"));
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context15.next = 4;
              return loadingTask.promise;

            case 4:
              pdfDocument = _context15.sent;
              expect(pdfDocument.numPages).toEqual(1);
              _context15.next = 8;
              return pdfDocument.getPage(1);

            case 8:
              page = _context15.sent;
              expect(page instanceof _api.PDFPageProxy).toEqual(true);
              _context15.next = 12;
              return page.getOperatorList();

            case 12:
              opList = _context15.sent;
              expect(opList.fnArray.length).toEqual(0);
              expect(opList.argsArray.length).toEqual(0);
              expect(opList.lastChunk).toEqual(true);
              _context15.next = 18;
              return loadingTask.destroy();

            case 18:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it("creates pdf doc from PDF file with bad XRef byteWidths", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var loadingTask;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("REDHAT-1531897-0.pdf"));
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context16.prev = 2;
              _context16.next = 5;
              return loadingTask.promise;

            case 5:
              expect(false).toEqual(true);
              _context16.next = 12;
              break;

            case 8:
              _context16.prev = 8;
              _context16.t0 = _context16["catch"](2);
              expect(_context16.t0 instanceof _util.InvalidPDFException).toEqual(true);
              expect(_context16.t0.message).toEqual("Invalid PDF structure.");

            case 12:
              _context16.next = 14;
              return loadingTask.destroy();

            case 14:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, null, [[2, 8]]);
    })));
    it("creates pdf doc from PDF file with inaccessible /Pages tree", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var loadingTask;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("poppler-395-0-fuzzed.pdf"));
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context17.prev = 2;
              _context17.next = 5;
              return loadingTask.promise;

            case 5:
              expect(false).toEqual(true);
              _context17.next = 12;
              break;

            case 8:
              _context17.prev = 8;
              _context17.t0 = _context17["catch"](2);
              expect(_context17.t0 instanceof _util.InvalidPDFException).toEqual(true);
              expect(_context17.t0.message).toEqual("Invalid Root reference.");

            case 12:
              _context17.next = 14;
              return loadingTask.destroy();

            case 14:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[2, 8]]);
    })));
    it("creates pdf doc from PDF files, with bad /Pages tree /Count", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var loadingTask1, loadingTask2, pdfDocument1, pdfDocument2, page, opList;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              loadingTask1 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("poppler-67295-0.pdf"));
              loadingTask2 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("poppler-85140-0.pdf"));
              expect(loadingTask1 instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              expect(loadingTask2 instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context18.next = 6;
              return loadingTask1.promise;

            case 6:
              pdfDocument1 = _context18.sent;
              _context18.next = 9;
              return loadingTask2.promise;

            case 9:
              pdfDocument2 = _context18.sent;
              expect(pdfDocument1.numPages).toEqual(1);
              expect(pdfDocument2.numPages).toEqual(1);
              _context18.next = 14;
              return pdfDocument1.getPage(1);

            case 14:
              page = _context18.sent;
              expect(page instanceof _api.PDFPageProxy).toEqual(true);
              _context18.next = 18;
              return page.getOperatorList();

            case 18:
              opList = _context18.sent;
              expect(opList.fnArray.length).toBeGreaterThan(5);
              expect(opList.argsArray.length).toBeGreaterThan(5);
              expect(opList.lastChunk).toEqual(true);
              _context18.prev = 22;
              _context18.next = 25;
              return pdfDocument2.getPage(1);

            case 25:
              expect(false).toEqual(true);
              _context18.next = 32;
              break;

            case 28:
              _context18.prev = 28;
              _context18.t0 = _context18["catch"](22);
              expect(_context18.t0 instanceof _util.UnknownErrorException).toEqual(true);
              expect(_context18.t0.message).toEqual("Bad (uncompressed) XRef entry: 3R");

            case 32:
              _context18.next = 34;
              return Promise.all([loadingTask1.destroy(), loadingTask2.destroy()]);

            case 34:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, null, [[22, 28]]);
    })));
    it("creates pdf doc from PDF files, with circular references", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var loadingTask1, loadingTask2, pdfDocument1, pdfDocument2, pageA, pageB, _i, _arr, opList;

      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              loadingTask1 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("poppler-91414-0-53.pdf"));
              loadingTask2 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("poppler-91414-0-54.pdf"));
              expect(loadingTask1 instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              expect(loadingTask2 instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context19.next = 6;
              return loadingTask1.promise;

            case 6:
              pdfDocument1 = _context19.sent;
              _context19.next = 9;
              return loadingTask2.promise;

            case 9:
              pdfDocument2 = _context19.sent;
              expect(pdfDocument1.numPages).toEqual(1);
              expect(pdfDocument2.numPages).toEqual(1);
              _context19.next = 14;
              return pdfDocument1.getPage(1);

            case 14:
              pageA = _context19.sent;
              _context19.next = 17;
              return pdfDocument2.getPage(1);

            case 17:
              pageB = _context19.sent;
              expect(pageA instanceof _api.PDFPageProxy).toEqual(true);
              expect(pageB instanceof _api.PDFPageProxy).toEqual(true);
              _i = 0;
              _context19.next = 23;
              return pageA.getOperatorList();

            case 23:
              _context19.t0 = _context19.sent;
              _context19.next = 26;
              return pageB.getOperatorList();

            case 26:
              _context19.t1 = _context19.sent;
              _arr = [_context19.t0, _context19.t1];

            case 28:
              if (!(_i < _arr.length)) {
                _context19.next = 36;
                break;
              }

              opList = _arr[_i];
              expect(opList.fnArray.length).toBeGreaterThan(5);
              expect(opList.argsArray.length).toBeGreaterThan(5);
              expect(opList.lastChunk).toEqual(true);

            case 33:
              _i++;
              _context19.next = 28;
              break;

            case 36:
              _context19.next = 38;
              return Promise.all([loadingTask1.destroy(), loadingTask2.destroy()]);

            case 38:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    it("creates pdf doc from PDF files, with bad /Pages tree /Kids entries", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var loadingTask1, loadingTask2, pdfDocument1, pdfDocument2;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              loadingTask1 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("poppler-742-0-fuzzed.pdf"));
              loadingTask2 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("poppler-937-0-fuzzed.pdf"));
              expect(loadingTask1 instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              expect(loadingTask2 instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context20.next = 6;
              return loadingTask1.promise;

            case 6:
              pdfDocument1 = _context20.sent;
              _context20.next = 9;
              return loadingTask2.promise;

            case 9:
              pdfDocument2 = _context20.sent;
              expect(pdfDocument1.numPages).toEqual(1);
              expect(pdfDocument2.numPages).toEqual(1);
              _context20.prev = 12;
              _context20.next = 15;
              return pdfDocument1.getPage(1);

            case 15:
              expect(false).toEqual(true);
              _context20.next = 22;
              break;

            case 18:
              _context20.prev = 18;
              _context20.t0 = _context20["catch"](12);
              expect(_context20.t0 instanceof _util.UnknownErrorException).toEqual(true);
              expect(_context20.t0.message).toEqual("Page dictionary kids object is not an array.");

            case 22:
              _context20.prev = 22;
              _context20.next = 25;
              return pdfDocument2.getPage(1);

            case 25:
              expect(false).toEqual(true);
              _context20.next = 32;
              break;

            case 28:
              _context20.prev = 28;
              _context20.t1 = _context20["catch"](22);
              expect(_context20.t1 instanceof _util.UnknownErrorException).toEqual(true);
              expect(_context20.t1.message).toEqual("Page dictionary kids object is not an array.");

            case 32:
              _context20.next = 34;
              return Promise.all([loadingTask1.destroy(), loadingTask2.destroy()]);

            case 34:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, null, [[12, 18], [22, 28]]);
    })));
  });
  describe("PDFWorker", function () {
    it("worker created or destroyed", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      var worker;
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              if (_is_node.isNodeJS) {
                pending("Worker is not supported in Node.js.");
              }

              worker = new _api.PDFWorker({
                name: "test1"
              });
              _context21.next = 4;
              return worker.promise;

            case 4:
              expect(worker.name).toEqual("test1");
              expect(!!worker.port).toEqual(true);
              expect(worker.destroyed).toEqual(false);
              expect(!!worker._webWorker).toEqual(true);
              expect(worker.port === worker._webWorker).toEqual(true);
              worker.destroy();
              expect(!!worker.port).toEqual(false);
              expect(worker.destroyed).toEqual(true);

            case 12:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    })));
    it("worker created or destroyed by getDocument", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      var loadingTask, worker, destroyPromise, destroyedWorker;
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              if (_is_node.isNodeJS) {
                pending("Worker is not supported in Node.js.");
              }

              loadingTask = (0, _api.getDocument)(basicApiGetDocumentParams);
              loadingTask.promise.then(function () {
                worker = loadingTask._worker;
                expect(!!worker).toEqual(true);
              });
              destroyPromise = loadingTask.promise.then(function () {
                return loadingTask.destroy();
              });
              _context22.next = 6;
              return destroyPromise;

            case 6:
              destroyedWorker = loadingTask._worker;
              expect(!!destroyedWorker).toEqual(false);
              expect(worker.destroyed).toEqual(true);

            case 9:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
    it("worker created and can be used in getDocument", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      var worker, loadingTask, destroyPromise;
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              if (_is_node.isNodeJS) {
                pending("Worker is not supported in Node.js.");
              }

              worker = new _api.PDFWorker({
                name: "test1"
              });
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(basicApiFileName, {
                worker: worker
              }));
              loadingTask.promise.then(function () {
                var docWorker = loadingTask._worker;
                expect(!!docWorker).toEqual(false);
                var messageHandlerPort = loadingTask._transport.messageHandler.comObj;
                expect(messageHandlerPort === worker.port).toEqual(true);
              });
              destroyPromise = loadingTask.promise.then(function () {
                return loadingTask.destroy();
              });
              _context23.next = 7;
              return destroyPromise;

            case 7:
              expect(worker.destroyed).toEqual(false);
              worker.destroy();

            case 9:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    })));
    it("creates more than one worker", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      var worker1, worker2, worker3;
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              if (_is_node.isNodeJS) {
                pending("Worker is not supported in Node.js.");
              }

              worker1 = new _api.PDFWorker({
                name: "test1"
              });
              worker2 = new _api.PDFWorker({
                name: "test2"
              });
              worker3 = new _api.PDFWorker({
                name: "test3"
              });
              _context24.next = 6;
              return Promise.all([worker1.promise, worker2.promise, worker3.promise]);

            case 6:
              expect(worker1.port !== worker2.port && worker1.port !== worker3.port && worker2.port !== worker3.port).toEqual(true);
              worker1.destroy();
              worker2.destroy();
              worker3.destroy();

            case 10:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    })));
    it("gets current workerSrc", function () {
      if (_is_node.isNodeJS) {
        pending("Worker is not supported in Node.js.");
      }

      var workerSrc = _api.PDFWorker.workerSrc;
      expect(_typeof(workerSrc)).toEqual("string");
      expect(workerSrc).toEqual(_worker_options.GlobalWorkerOptions.workerSrc);
    });
  });
  describe("PDFDocument", function () {
    var pdfLoadingTask, pdfDocument;
    beforeAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              pdfLoadingTask = (0, _api.getDocument)(basicApiGetDocumentParams);
              _context25.next = 3;
              return pdfLoadingTask.promise;

            case 3:
              pdfDocument = _context25.sent;

            case 4:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    })));
    afterAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return pdfLoadingTask.destroy();

            case 2:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    })));
    it("gets number of pages", function () {
      expect(pdfDocument.numPages).toEqual(3);
    });
    it("gets fingerprints", function () {
      expect(pdfDocument.fingerprints).toEqual(["ea8b35919d6279a369e835bde778611b", null]);
    });
    it("gets fingerprints, from modified document", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      var loadingTask, pdfDoc;
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("annotation-tx.pdf"));
              _context27.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context27.sent;
              expect(pdfDoc.fingerprints).toEqual(["3ebd77c320274649a68f10dbf3b9f882", "e7087346aa4b4ae0911c1f1643b57345"]);
              _context27.next = 7;
              return loadingTask.destroy();

            case 7:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27);
    })));
    it("gets page", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
      var data;
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return pdfDocument.getPage(1);

            case 2:
              data = _context28.sent;
              expect(data instanceof _api.PDFPageProxy).toEqual(true);
              expect(data.pageNumber).toEqual(1);

            case 5:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28);
    })));
    it("gets non-existent page", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
      var outOfRangePromise, nonIntegerPromise, nonNumberPromise;
      return _regenerator["default"].wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              outOfRangePromise = pdfDocument.getPage(100);
              nonIntegerPromise = pdfDocument.getPage(2.5);
              nonNumberPromise = pdfDocument.getPage("1");
              outOfRangePromise = outOfRangePromise.then(function () {
                throw new Error("shall fail for out-of-range pageNumber parameter");
              }, function (reason) {
                expect(reason instanceof Error).toEqual(true);
              });
              nonIntegerPromise = nonIntegerPromise.then(function () {
                throw new Error("shall fail for non-integer pageNumber parameter");
              }, function (reason) {
                expect(reason instanceof Error).toEqual(true);
              });
              nonNumberPromise = nonNumberPromise.then(function () {
                throw new Error("shall fail for non-number pageNumber parameter");
              }, function (reason) {
                expect(reason instanceof Error).toEqual(true);
              });
              _context29.next = 8;
              return Promise.all([outOfRangePromise, nonIntegerPromise, nonNumberPromise]);

            case 8:
            case "end":
              return _context29.stop();
          }
        }
      }, _callee29);
    })));
    it("gets page, from /Pages tree with circular reference", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
      var loadingTask, page1, page2;
      return _regenerator["default"].wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("Pages-tree-refs.pdf"));
              page1 = loadingTask.promise.then(function (pdfDoc) {
                return pdfDoc.getPage(1).then(function (pdfPage) {
                  expect(pdfPage instanceof _api.PDFPageProxy).toEqual(true);
                  expect(pdfPage.ref).toEqual({
                    num: 6,
                    gen: 0
                  });
                }, function (reason) {
                  throw new Error("shall not fail for valid page");
                });
              });
              page2 = loadingTask.promise.then(function (pdfDoc) {
                return pdfDoc.getPage(2).then(function (pdfPage) {
                  throw new Error("shall fail for invalid page");
                }, function (reason) {
                  expect(reason instanceof _util.UnknownErrorException).toEqual(true);
                  expect(reason.message).toEqual("Pages tree contains circular reference.");
                });
              });
              _context30.next = 5;
              return Promise.all([page1, page2]);

            case 5:
              _context30.next = 7;
              return loadingTask.destroy();

            case 7:
            case "end":
              return _context30.stop();
          }
        }
      }, _callee30);
    })));
    it("gets page multiple time, with working caches", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
      var promiseA, promiseB, pageA, pageB;
      return _regenerator["default"].wrap(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              promiseA = pdfDocument.getPage(1);
              promiseB = pdfDocument.getPage(1);
              expect(promiseA instanceof Promise).toEqual(true);
              expect(promiseA).toBe(promiseB);
              _context31.next = 6;
              return promiseA;

            case 6:
              pageA = _context31.sent;
              _context31.next = 9;
              return promiseB;

            case 9:
              pageB = _context31.sent;
              expect(pageA instanceof _api.PDFPageProxy).toEqual(true);
              expect(pageA).toBe(pageB);

            case 12:
            case "end":
              return _context31.stop();
          }
        }
      }, _callee31);
    })));
    it("gets page index", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
      var ref, pageIndex;
      return _regenerator["default"].wrap(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              ref = {
                num: 17,
                gen: 0
              };
              _context32.next = 3;
              return pdfDocument.getPageIndex(ref);

            case 3:
              pageIndex = _context32.sent;
              expect(pageIndex).toEqual(1);

            case 5:
            case "end":
              return _context32.stop();
          }
        }
      }, _callee32);
    })));
    it("gets invalid page index", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
      var ref;
      return _regenerator["default"].wrap(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              ref = {
                num: 3,
                gen: 0
              };
              _context33.prev = 1;
              _context33.next = 4;
              return pdfDocument.getPageIndex(ref);

            case 4:
              expect(false).toEqual(true);
              _context33.next = 11;
              break;

            case 7:
              _context33.prev = 7;
              _context33.t0 = _context33["catch"](1);
              expect(_context33.t0 instanceof _util.UnknownErrorException).toEqual(true);
              expect(_context33.t0.message).toEqual("The reference does not point to a /Page dictionary.");

            case 11:
            case "end":
              return _context33.stop();
          }
        }
      }, _callee33, null, [[1, 7]]);
    })));
    it("gets destinations, from /Dests dictionary", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee34() {
      var destinations;
      return _regenerator["default"].wrap(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.next = 2;
              return pdfDocument.getDestinations();

            case 2:
              destinations = _context34.sent;
              expect(destinations).toEqual({
                chapter1: [{
                  gen: 0,
                  num: 17
                }, {
                  name: "XYZ"
                }, 0, 841.89, null]
              });

            case 4:
            case "end":
              return _context34.stop();
          }
        }
      }, _callee34);
    })));
    it("gets a destination, from /Dests dictionary", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee35() {
      var destination;
      return _regenerator["default"].wrap(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              _context35.next = 2;
              return pdfDocument.getDestination("chapter1");

            case 2:
              destination = _context35.sent;
              expect(destination).toEqual([{
                gen: 0,
                num: 17
              }, {
                name: "XYZ"
              }, 0, 841.89, null]);

            case 4:
            case "end":
              return _context35.stop();
          }
        }
      }, _callee35);
    })));
    it("gets a non-existent destination, from /Dests dictionary", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee36() {
      var destination;
      return _regenerator["default"].wrap(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              _context36.next = 2;
              return pdfDocument.getDestination("non-existent-named-destination");

            case 2:
              destination = _context36.sent;
              expect(destination).toEqual(null);

            case 4:
            case "end":
              return _context36.stop();
          }
        }
      }, _callee36);
    })));
    it("gets destinations, from /Names (NameTree) dictionary", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
      var loadingTask, pdfDoc, destinations;
      return _regenerator["default"].wrap(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue6204.pdf"));
              _context37.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context37.sent;
              _context37.next = 6;
              return pdfDoc.getDestinations();

            case 6:
              destinations = _context37.sent;
              expect(destinations).toEqual({
                "Page.1": [{
                  num: 1,
                  gen: 0
                }, {
                  name: "XYZ"
                }, 0, 375, null],
                "Page.2": [{
                  num: 6,
                  gen: 0
                }, {
                  name: "XYZ"
                }, 0, 375, null]
              });
              _context37.next = 10;
              return loadingTask.destroy();

            case 10:
            case "end":
              return _context37.stop();
          }
        }
      }, _callee37);
    })));
    it("gets a destination, from /Names (NameTree) dictionary", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee38() {
      var loadingTask, pdfDoc, destination;
      return _regenerator["default"].wrap(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue6204.pdf"));
              _context38.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context38.sent;
              _context38.next = 6;
              return pdfDoc.getDestination("Page.1");

            case 6:
              destination = _context38.sent;
              expect(destination).toEqual([{
                num: 1,
                gen: 0
              }, {
                name: "XYZ"
              }, 0, 375, null]);
              _context38.next = 10;
              return loadingTask.destroy();

            case 10:
            case "end":
              return _context38.stop();
          }
        }
      }, _callee38);
    })));
    it("gets a non-existent destination, from /Names (NameTree) dictionary", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee39() {
      var loadingTask, pdfDoc, destination;
      return _regenerator["default"].wrap(function _callee39$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue6204.pdf"));
              _context39.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context39.sent;
              _context39.next = 6;
              return pdfDoc.getDestination("non-existent-named-destination");

            case 6:
              destination = _context39.sent;
              expect(destination).toEqual(null);
              _context39.next = 10;
              return loadingTask.destroy();

            case 10:
            case "end":
              return _context39.stop();
          }
        }
      }, _callee39);
    })));
    it("gets a destination, from out-of-order /Names (NameTree) dictionary (issue 10272)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee40() {
      var loadingTask, pdfDoc, destination;
      return _regenerator["default"].wrap(function _callee40$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              if (_is_node.isNodeJS) {
                pending("Linked test-cases are not supported in Node.js.");
              }

              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue10272.pdf"));
              _context40.next = 4;
              return loadingTask.promise;

            case 4:
              pdfDoc = _context40.sent;
              _context40.next = 7;
              return pdfDoc.getDestination("link_1");

            case 7:
              destination = _context40.sent;
              expect(destination).toEqual([{
                num: 17,
                gen: 0
              }, {
                name: "XYZ"
              }, 69, 125, 0]);
              _context40.next = 11;
              return loadingTask.destroy();

            case 11:
            case "end":
              return _context40.stop();
          }
        }
      }, _callee40);
    })));
    it("gets non-string destination", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee41() {
      var numberPromise, booleanPromise, arrayPromise;
      return _regenerator["default"].wrap(function _callee41$(_context41) {
        while (1) {
          switch (_context41.prev = _context41.next) {
            case 0:
              numberPromise = pdfDocument.getDestination(4.3);
              booleanPromise = pdfDocument.getDestination(true);
              arrayPromise = pdfDocument.getDestination([{
                num: 17,
                gen: 0
              }, {
                name: "XYZ"
              }, 0, 841.89, null]);
              numberPromise = numberPromise.then(function () {
                throw new Error("shall fail for non-string destination.");
              }, function (reason) {
                expect(reason instanceof Error).toEqual(true);
              });
              booleanPromise = booleanPromise.then(function () {
                throw new Error("shall fail for non-string destination.");
              }, function (reason) {
                expect(reason instanceof Error).toEqual(true);
              });
              arrayPromise = arrayPromise.then(function () {
                throw new Error("shall fail for non-string destination.");
              }, function (reason) {
                expect(reason instanceof Error).toEqual(true);
              });
              _context41.next = 8;
              return Promise.all([numberPromise, booleanPromise, arrayPromise]);

            case 8:
            case "end":
              return _context41.stop();
          }
        }
      }, _callee41);
    })));
    it("gets non-existent page labels", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee42() {
      var pageLabels;
      return _regenerator["default"].wrap(function _callee42$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              _context42.next = 2;
              return pdfDocument.getPageLabels();

            case 2:
              pageLabels = _context42.sent;
              expect(pageLabels).toEqual(null);

            case 4:
            case "end":
              return _context42.stop();
          }
        }
      }, _callee42);
    })));
    it("gets page labels", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee43() {
      var loadingTask0, promise0, loadingTask1, promise1, loadingTask2, promise2, loadingTask3, promise3, pageLabels;
      return _regenerator["default"].wrap(function _callee43$(_context43) {
        while (1) {
          switch (_context43.prev = _context43.next) {
            case 0:
              loadingTask0 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("bug793632.pdf"));
              promise0 = loadingTask0.promise.then(function (pdfDoc) {
                return pdfDoc.getPageLabels();
              });
              loadingTask1 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue1453.pdf"));
              promise1 = loadingTask1.promise.then(function (pdfDoc) {
                return pdfDoc.getPageLabels();
              });
              loadingTask2 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("rotation.pdf"));
              promise2 = loadingTask2.promise.then(function (pdfDoc) {
                return pdfDoc.getPageLabels();
              });
              loadingTask3 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("bad-PageLabels.pdf"));
              promise3 = loadingTask3.promise.then(function (pdfDoc) {
                return pdfDoc.getPageLabels();
              });
              _context43.next = 10;
              return Promise.all([promise0, promise1, promise2, promise3]);

            case 10:
              pageLabels = _context43.sent;
              expect(pageLabels[0]).toEqual(["i", "ii", "iii", "1"]);
              expect(pageLabels[1]).toEqual(["Front Page1"]);
              expect(pageLabels[2]).toEqual(["1", "2"]);
              expect(pageLabels[3]).toEqual(["X3"]);
              _context43.next = 17;
              return Promise.all([loadingTask0.destroy(), loadingTask1.destroy(), loadingTask2.destroy(), loadingTask3.destroy()]);

            case 17:
            case "end":
              return _context43.stop();
          }
        }
      }, _callee43);
    })));
    it("gets default page layout", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee44() {
      var loadingTask, pdfDoc, pageLayout;
      return _regenerator["default"].wrap(function _callee44$(_context44) {
        while (1) {
          switch (_context44.prev = _context44.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("tracemonkey.pdf"));
              _context44.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context44.sent;
              _context44.next = 6;
              return pdfDoc.getPageLayout();

            case 6:
              pageLayout = _context44.sent;
              expect(pageLayout).toEqual("");
              _context44.next = 10;
              return loadingTask.destroy();

            case 10:
            case "end":
              return _context44.stop();
          }
        }
      }, _callee44);
    })));
    it("gets non-default page layout", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee45() {
      var pageLayout;
      return _regenerator["default"].wrap(function _callee45$(_context45) {
        while (1) {
          switch (_context45.prev = _context45.next) {
            case 0:
              _context45.next = 2;
              return pdfDocument.getPageLayout();

            case 2:
              pageLayout = _context45.sent;
              expect(pageLayout).toEqual("SinglePage");

            case 4:
            case "end":
              return _context45.stop();
          }
        }
      }, _callee45);
    })));
    it("gets default page mode", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee46() {
      var loadingTask, pdfDoc, pageMode;
      return _regenerator["default"].wrap(function _callee46$(_context46) {
        while (1) {
          switch (_context46.prev = _context46.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("tracemonkey.pdf"));
              _context46.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context46.sent;
              _context46.next = 6;
              return pdfDoc.getPageMode();

            case 6:
              pageMode = _context46.sent;
              expect(pageMode).toEqual("UseNone");
              _context46.next = 10;
              return loadingTask.destroy();

            case 10:
            case "end":
              return _context46.stop();
          }
        }
      }, _callee46);
    })));
    it("gets non-default page mode", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee47() {
      var pageMode;
      return _regenerator["default"].wrap(function _callee47$(_context47) {
        while (1) {
          switch (_context47.prev = _context47.next) {
            case 0:
              _context47.next = 2;
              return pdfDocument.getPageMode();

            case 2:
              pageMode = _context47.sent;
              expect(pageMode).toEqual("UseOutlines");

            case 4:
            case "end":
              return _context47.stop();
          }
        }
      }, _callee47);
    })));
    it("gets default viewer preferences", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee48() {
      var loadingTask, pdfDoc, prefs;
      return _regenerator["default"].wrap(function _callee48$(_context48) {
        while (1) {
          switch (_context48.prev = _context48.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("tracemonkey.pdf"));
              _context48.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context48.sent;
              _context48.next = 6;
              return pdfDoc.getViewerPreferences();

            case 6:
              prefs = _context48.sent;
              expect(prefs).toEqual(null);
              _context48.next = 10;
              return loadingTask.destroy();

            case 10:
            case "end":
              return _context48.stop();
          }
        }
      }, _callee48);
    })));
    it("gets non-default viewer preferences", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee49() {
      var prefs;
      return _regenerator["default"].wrap(function _callee49$(_context49) {
        while (1) {
          switch (_context49.prev = _context49.next) {
            case 0:
              _context49.next = 2;
              return pdfDocument.getViewerPreferences();

            case 2:
              prefs = _context49.sent;
              expect(prefs).toEqual({
                Direction: "L2R"
              });

            case 4:
            case "end":
              return _context49.stop();
          }
        }
      }, _callee49);
    })));
    it("gets default open action", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee50() {
      var loadingTask, pdfDoc, openAction;
      return _regenerator["default"].wrap(function _callee50$(_context50) {
        while (1) {
          switch (_context50.prev = _context50.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("tracemonkey.pdf"));
              _context50.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context50.sent;
              _context50.next = 6;
              return pdfDoc.getOpenAction();

            case 6:
              openAction = _context50.sent;
              expect(openAction).toEqual(null);
              _context50.next = 10;
              return loadingTask.destroy();

            case 10:
            case "end":
              return _context50.stop();
          }
        }
      }, _callee50);
    })));
    it("gets non-default open action (with destination)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee51() {
      var openAction;
      return _regenerator["default"].wrap(function _callee51$(_context51) {
        while (1) {
          switch (_context51.prev = _context51.next) {
            case 0:
              _context51.next = 2;
              return pdfDocument.getOpenAction();

            case 2:
              openAction = _context51.sent;
              expect(openAction.dest).toEqual([{
                num: 15,
                gen: 0
              }, {
                name: "FitH"
              }, null]);
              expect(openAction.action).toBeUndefined();

            case 5:
            case "end":
              return _context51.stop();
          }
        }
      }, _callee51);
    })));
    it("gets non-default open action (with Print action)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee52() {
      var loadingTask1, loadingTask2, promise1, promise2;
      return _regenerator["default"].wrap(function _callee52$(_context52) {
        while (1) {
          switch (_context52.prev = _context52.next) {
            case 0:
              loadingTask1 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("bug1001080.pdf"));
              loadingTask2 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue11442_reduced.pdf"));
              promise1 = loadingTask1.promise.then(function (pdfDoc) {
                return pdfDoc.getOpenAction();
              }).then(function (openAction) {
                expect(openAction.dest).toBeUndefined();
                expect(openAction.action).toEqual("Print");
                return loadingTask1.destroy();
              });
              promise2 = loadingTask2.promise.then(function (pdfDoc) {
                return pdfDoc.getOpenAction();
              }).then(function (openAction) {
                expect(openAction.dest).toBeUndefined();
                expect(openAction.action).toEqual("Print");
                return loadingTask2.destroy();
              });
              _context52.next = 6;
              return Promise.all([promise1, promise2]);

            case 6:
            case "end":
              return _context52.stop();
          }
        }
      }, _callee52);
    })));
    it("gets non-existent attachments", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee53() {
      var attachments;
      return _regenerator["default"].wrap(function _callee53$(_context53) {
        while (1) {
          switch (_context53.prev = _context53.next) {
            case 0:
              _context53.next = 2;
              return pdfDocument.getAttachments();

            case 2:
              attachments = _context53.sent;
              expect(attachments).toEqual(null);

            case 4:
            case "end":
              return _context53.stop();
          }
        }
      }, _callee53);
    })));
    it("gets attachments", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee54() {
      var loadingTask, pdfDoc, attachments, attachment;
      return _regenerator["default"].wrap(function _callee54$(_context54) {
        while (1) {
          switch (_context54.prev = _context54.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("attachment.pdf"));
              _context54.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context54.sent;
              _context54.next = 6;
              return pdfDoc.getAttachments();

            case 6:
              attachments = _context54.sent;
              attachment = attachments["foo.txt"];
              expect(attachment.filename).toEqual("foo.txt");
              expect(attachment.content).toEqual(new Uint8Array([98, 97, 114, 32, 98, 97, 122, 32, 10]));
              _context54.next = 12;
              return loadingTask.destroy();

            case 12:
            case "end":
              return _context54.stop();
          }
        }
      }, _callee54);
    })));
    it("gets javascript", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee55() {
      var javascript;
      return _regenerator["default"].wrap(function _callee55$(_context55) {
        while (1) {
          switch (_context55.prev = _context55.next) {
            case 0:
              _context55.next = 2;
              return pdfDocument.getJavaScript();

            case 2:
              javascript = _context55.sent;
              expect(javascript).toEqual(null);

            case 4:
            case "end":
              return _context55.stop();
          }
        }
      }, _callee55);
    })));
    it("gets javascript with printing instructions (JS action)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee56() {
      var loadingTask, pdfDoc, javascript;
      return _regenerator["default"].wrap(function _callee56$(_context56) {
        while (1) {
          switch (_context56.prev = _context56.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue6106.pdf"));
              _context56.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context56.sent;
              _context56.next = 6;
              return pdfDoc.getJavaScript();

            case 6:
              javascript = _context56.sent;
              expect(javascript).toEqual(["this.print({bUI:true,bSilent:false,bShrinkToFit:true});"]);
              expect(javascript[0]).toMatch(_ui_utils.AutoPrintRegExp);
              _context56.next = 11;
              return loadingTask.destroy();

            case 11:
            case "end":
              return _context56.stop();
          }
        }
      }, _callee56);
    })));
    it("gets hasJSActions, in document without javaScript", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee57() {
      var hasJSActions;
      return _regenerator["default"].wrap(function _callee57$(_context57) {
        while (1) {
          switch (_context57.prev = _context57.next) {
            case 0:
              _context57.next = 2;
              return pdfDocument.hasJSActions();

            case 2:
              hasJSActions = _context57.sent;
              expect(hasJSActions).toEqual(false);

            case 4:
            case "end":
              return _context57.stop();
          }
        }
      }, _callee57);
    })));
    it("gets hasJSActions, in document with javaScript", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee58() {
      var loadingTask, pdfDoc, hasJSActions;
      return _regenerator["default"].wrap(function _callee58$(_context58) {
        while (1) {
          switch (_context58.prev = _context58.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("doc_actions.pdf"));
              _context58.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context58.sent;
              _context58.next = 6;
              return pdfDoc.hasJSActions();

            case 6:
              hasJSActions = _context58.sent;
              expect(hasJSActions).toEqual(true);
              _context58.next = 10;
              return loadingTask.destroy();

            case 10:
            case "end":
              return _context58.stop();
          }
        }
      }, _callee58);
    })));
    it("gets non-existent JSActions", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee59() {
      var jsActions;
      return _regenerator["default"].wrap(function _callee59$(_context59) {
        while (1) {
          switch (_context59.prev = _context59.next) {
            case 0:
              _context59.next = 2;
              return pdfDocument.getJSActions();

            case 2:
              jsActions = _context59.sent;
              expect(jsActions).toEqual(null);

            case 4:
            case "end":
              return _context59.stop();
          }
        }
      }, _callee59);
    })));
    it("gets JSActions", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee60() {
      var loadingTask, pdfDoc, docActions, page1, page1Actions, page3, page3Actions;
      return _regenerator["default"].wrap(function _callee60$(_context60) {
        while (1) {
          switch (_context60.prev = _context60.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("doc_actions.pdf"));
              _context60.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context60.sent;
              _context60.next = 6;
              return pdfDoc.getJSActions();

            case 6:
              docActions = _context60.sent;
              _context60.next = 9;
              return pdfDoc.getPage(1);

            case 9:
              page1 = _context60.sent;
              _context60.next = 12;
              return page1.getJSActions();

            case 12:
              page1Actions = _context60.sent;
              _context60.next = 15;
              return pdfDoc.getPage(3);

            case 15:
              page3 = _context60.sent;
              _context60.next = 18;
              return page3.getJSActions();

            case 18:
              page3Actions = _context60.sent;
              expect(docActions).toEqual({
                DidPrint: ["this.getField(\"Text2\").value = \"DidPrint\";"],
                DidSave: ["this.getField(\"Text2\").value = \"DidSave\";"],
                WillClose: ["this.getField(\"Text1\").value = \"WillClose\";"],
                WillPrint: ["this.getField(\"Text1\").value = \"WillPrint\";"],
                WillSave: ["this.getField(\"Text1\").value = \"WillSave\";"]
              });
              expect(page1Actions).toEqual({
                PageOpen: ["this.getField(\"Text1\").value = \"PageOpen 1\";"],
                PageClose: ["this.getField(\"Text2\").value = \"PageClose 1\";"]
              });
              expect(page3Actions).toEqual({
                PageOpen: ["this.getField(\"Text5\").value = \"PageOpen 3\";"],
                PageClose: ["this.getField(\"Text6\").value = \"PageClose 3\";"]
              });
              _context60.next = 24;
              return loadingTask.destroy();

            case 24:
            case "end":
              return _context60.stop();
          }
        }
      }, _callee60);
    })));
    it("gets non-existent outline", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee61() {
      var loadingTask, pdfDoc, outline;
      return _regenerator["default"].wrap(function _callee61$(_context61) {
        while (1) {
          switch (_context61.prev = _context61.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("tracemonkey.pdf"));
              _context61.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context61.sent;
              _context61.next = 6;
              return pdfDoc.getOutline();

            case 6:
              outline = _context61.sent;
              expect(outline).toEqual(null);
              _context61.next = 10;
              return loadingTask.destroy();

            case 10:
            case "end":
              return _context61.stop();
          }
        }
      }, _callee61);
    })));
    it("gets outline", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee62() {
      var outline, outlineItem;
      return _regenerator["default"].wrap(function _callee62$(_context62) {
        while (1) {
          switch (_context62.prev = _context62.next) {
            case 0:
              _context62.next = 2;
              return pdfDocument.getOutline();

            case 2:
              outline = _context62.sent;
              expect(Array.isArray(outline)).toEqual(true);
              expect(outline.length).toEqual(2);
              outlineItem = outline[1];
              expect(outlineItem.title).toEqual("Chapter 1");
              expect(Array.isArray(outlineItem.dest)).toEqual(true);
              expect(outlineItem.url).toEqual(null);
              expect(outlineItem.unsafeUrl).toBeUndefined();
              expect(outlineItem.newWindow).toBeUndefined();
              expect(outlineItem.bold).toEqual(true);
              expect(outlineItem.italic).toEqual(false);
              expect(outlineItem.color).toEqual(new Uint8ClampedArray([0, 64, 128]));
              expect(outlineItem.items.length).toEqual(1);
              expect(outlineItem.items[0].title).toEqual("Paragraph 1.1");

            case 16:
            case "end":
              return _context62.stop();
          }
        }
      }, _callee62);
    })));
    it("gets outline containing a URL", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee63() {
      var loadingTask, pdfDoc, outline, outlineItemTwo, outlineItemOne;
      return _regenerator["default"].wrap(function _callee63$(_context63) {
        while (1) {
          switch (_context63.prev = _context63.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue3214.pdf"));
              _context63.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context63.sent;
              _context63.next = 6;
              return pdfDoc.getOutline();

            case 6:
              outline = _context63.sent;
              expect(Array.isArray(outline)).toEqual(true);
              expect(outline.length).toEqual(5);
              outlineItemTwo = outline[2];
              expect(_typeof(outlineItemTwo.title)).toEqual("string");
              expect(outlineItemTwo.dest).toEqual(null);
              expect(outlineItemTwo.url).toEqual("http://google.com/");
              expect(outlineItemTwo.unsafeUrl).toEqual("http://google.com");
              expect(outlineItemTwo.newWindow).toBeUndefined();
              outlineItemOne = outline[1];
              expect(outlineItemOne.bold).toEqual(false);
              expect(outlineItemOne.italic).toEqual(true);
              expect(outlineItemOne.color).toEqual(new Uint8ClampedArray([0, 0, 0]));
              _context63.next = 21;
              return loadingTask.destroy();

            case 21:
            case "end":
              return _context63.stop();
          }
        }
      }, _callee63);
    })));
    it("gets outline with non-displayable chars", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee64() {
      var loadingTask, pdfDoc, outline, outlineItem;
      return _regenerator["default"].wrap(function _callee64$(_context64) {
        while (1) {
          switch (_context64.prev = _context64.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue14267.pdf"));
              _context64.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context64.sent;
              _context64.next = 6;
              return pdfDoc.getOutline();

            case 6:
              outline = _context64.sent;
              expect(Array.isArray(outline)).toEqual(true);
              expect(outline.length).toEqual(1);
              outlineItem = outline[0];
              expect(outlineItem.title).toEqual("hello\x11world");
              _context64.next = 13;
              return loadingTask.destroy();

            case 13:
            case "end":
              return _context64.stop();
          }
        }
      }, _callee64);
    })));
    it("gets non-existent permissions", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee65() {
      var permissions;
      return _regenerator["default"].wrap(function _callee65$(_context65) {
        while (1) {
          switch (_context65.prev = _context65.next) {
            case 0:
              _context65.next = 2;
              return pdfDocument.getPermissions();

            case 2:
              permissions = _context65.sent;
              expect(permissions).toEqual(null);

            case 4:
            case "end":
              return _context65.stop();
          }
        }
      }, _callee65);
    })));
    it("gets permissions", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee66() {
      var loadingTask0, promise0, loadingTask1, promise1, loadingTask2, promise2, totalPermissionCount, permissions;
      return _regenerator["default"].wrap(function _callee66$(_context66) {
        while (1) {
          switch (_context66.prev = _context66.next) {
            case 0:
              loadingTask0 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue9972-1.pdf"));
              promise0 = loadingTask0.promise.then(function (pdfDoc) {
                return pdfDoc.getPermissions();
              });
              loadingTask1 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue9972-2.pdf"));
              promise1 = loadingTask1.promise.then(function (pdfDoc) {
                return pdfDoc.getPermissions();
              });
              loadingTask2 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue9972-3.pdf"));
              promise2 = loadingTask2.promise.then(function (pdfDoc) {
                return pdfDoc.getPermissions();
              });
              totalPermissionCount = Object.keys(_util.PermissionFlag).length;
              _context66.next = 9;
              return Promise.all([promise0, promise1, promise2]);

            case 9:
              permissions = _context66.sent;
              expect(permissions[0].length).toEqual(totalPermissionCount - 1);
              expect(permissions[0].includes(_util.PermissionFlag.MODIFY_CONTENTS)).toBeFalsy();
              expect(permissions[1].length).toEqual(totalPermissionCount - 2);
              expect(permissions[1].includes(_util.PermissionFlag.PRINT)).toBeFalsy();
              expect(permissions[1].includes(_util.PermissionFlag.PRINT_HIGH_QUALITY)).toBeFalsy();
              expect(permissions[2].length).toEqual(totalPermissionCount - 1);
              expect(permissions[2].includes(_util.PermissionFlag.COPY)).toBeFalsy();
              _context66.next = 19;
              return Promise.all([loadingTask0.destroy(), loadingTask1.destroy(), loadingTask2.destroy()]);

            case 19:
            case "end":
              return _context66.stop();
          }
        }
      }, _callee66);
    })));
    it("gets metadata", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee67() {
      var _yield$pdfDocument$ge, info, metadata, contentDispositionFilename, contentLength;

      return _regenerator["default"].wrap(function _callee67$(_context67) {
        while (1) {
          switch (_context67.prev = _context67.next) {
            case 0:
              _context67.next = 2;
              return pdfDocument.getMetadata();

            case 2:
              _yield$pdfDocument$ge = _context67.sent;
              info = _yield$pdfDocument$ge.info;
              metadata = _yield$pdfDocument$ge.metadata;
              contentDispositionFilename = _yield$pdfDocument$ge.contentDispositionFilename;
              contentLength = _yield$pdfDocument$ge.contentLength;
              expect(info.Title).toEqual("Basic API Test");
              expect(info.Custom).toEqual(undefined);
              expect(info.PDFFormatVersion).toEqual("1.7");
              expect(info.Language).toEqual("en");
              expect(info.EncryptFilterName).toEqual(null);
              expect(info.IsLinearized).toEqual(false);
              expect(info.IsAcroFormPresent).toEqual(false);
              expect(info.IsXFAPresent).toEqual(false);
              expect(info.IsCollectionPresent).toEqual(false);
              expect(info.IsSignaturesPresent).toEqual(false);
              expect(metadata instanceof _metadata.Metadata).toEqual(true);
              expect(metadata.get("dc:title")).toEqual("Basic API Test");
              expect(contentDispositionFilename).toEqual(null);
              expect(contentLength).toEqual(basicApiFileLength);

            case 21:
            case "end":
              return _context67.stop();
          }
        }
      }, _callee67);
    })));
    it("gets metadata, with custom info dict entries", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee68() {
      var loadingTask, pdfDoc, _yield$pdfDoc$getMeta, info, metadata, contentDispositionFilename, contentLength, custom;

      return _regenerator["default"].wrap(function _callee68$(_context68) {
        while (1) {
          switch (_context68.prev = _context68.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("tracemonkey.pdf"));
              _context68.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context68.sent;
              _context68.next = 6;
              return pdfDoc.getMetadata();

            case 6:
              _yield$pdfDoc$getMeta = _context68.sent;
              info = _yield$pdfDoc$getMeta.info;
              metadata = _yield$pdfDoc$getMeta.metadata;
              contentDispositionFilename = _yield$pdfDoc$getMeta.contentDispositionFilename;
              contentLength = _yield$pdfDoc$getMeta.contentLength;
              expect(info.Creator).toEqual("TeX");
              expect(info.Producer).toEqual("pdfeTeX-1.21a");
              expect(info.CreationDate).toEqual("D:20090401163925-07'00'");
              custom = info.Custom;
              expect(_typeof(custom) === "object" && custom !== null).toEqual(true);
              expect(custom["PTEX.Fullbanner"]).toEqual("This is pdfeTeX, " + "Version 3.141592-1.21a-2.2 (Web2C 7.5.4) kpathsea version 3.5.6");
              expect(info.PDFFormatVersion).toEqual("1.4");
              expect(info.Language).toEqual(null);
              expect(info.EncryptFilterName).toEqual(null);
              expect(info.IsLinearized).toEqual(false);
              expect(info.IsAcroFormPresent).toEqual(false);
              expect(info.IsXFAPresent).toEqual(false);
              expect(info.IsCollectionPresent).toEqual(false);
              expect(info.IsSignaturesPresent).toEqual(false);
              expect(metadata).toEqual(null);
              expect(contentDispositionFilename).toEqual(null);
              expect(contentLength).toEqual(1016315);
              _context68.next = 30;
              return loadingTask.destroy();

            case 30:
            case "end":
              return _context68.stop();
          }
        }
      }, _callee68);
    })));
    it("gets metadata, with missing PDF header (bug 1606566)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee69() {
      var loadingTask, pdfDoc, _yield$pdfDoc$getMeta2, info, metadata, contentDispositionFilename, contentLength;

      return _regenerator["default"].wrap(function _callee69$(_context69) {
        while (1) {
          switch (_context69.prev = _context69.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("bug1606566.pdf"));
              _context69.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context69.sent;
              _context69.next = 6;
              return pdfDoc.getMetadata();

            case 6:
              _yield$pdfDoc$getMeta2 = _context69.sent;
              info = _yield$pdfDoc$getMeta2.info;
              metadata = _yield$pdfDoc$getMeta2.metadata;
              contentDispositionFilename = _yield$pdfDoc$getMeta2.contentDispositionFilename;
              contentLength = _yield$pdfDoc$getMeta2.contentLength;
              expect(info.Custom).toEqual(undefined);
              expect(info.PDFFormatVersion).toEqual(null);
              expect(info.Language).toEqual(null);
              expect(info.EncryptFilterName).toEqual(null);
              expect(info.IsLinearized).toEqual(false);
              expect(info.IsAcroFormPresent).toEqual(false);
              expect(info.IsXFAPresent).toEqual(false);
              expect(info.IsCollectionPresent).toEqual(false);
              expect(info.IsSignaturesPresent).toEqual(false);
              expect(metadata).toEqual(null);
              expect(contentDispositionFilename).toEqual(null);
              expect(contentLength).toEqual(624);
              _context69.next = 25;
              return loadingTask.destroy();

            case 25:
            case "end":
              return _context69.stop();
          }
        }
      }, _callee69);
    })));
    it("gets metadata, with corrupt /Metadata XRef entry", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee70() {
      var loadingTask, pdfDoc, _yield$pdfDoc$getMeta3, info, metadata, contentDispositionFilename, contentLength;

      return _regenerator["default"].wrap(function _callee70$(_context70) {
        while (1) {
          switch (_context70.prev = _context70.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("PDFBOX-3148-2-fuzzed.pdf"));
              _context70.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context70.sent;
              _context70.next = 6;
              return pdfDoc.getMetadata();

            case 6:
              _yield$pdfDoc$getMeta3 = _context70.sent;
              info = _yield$pdfDoc$getMeta3.info;
              metadata = _yield$pdfDoc$getMeta3.metadata;
              contentDispositionFilename = _yield$pdfDoc$getMeta3.contentDispositionFilename;
              contentLength = _yield$pdfDoc$getMeta3.contentLength;
              expect(info.Custom).toEqual(undefined);
              expect(info.PDFFormatVersion).toEqual("1.6");
              expect(info.Language).toEqual(null);
              expect(info.EncryptFilterName).toEqual(null);
              expect(info.IsLinearized).toEqual(false);
              expect(info.IsAcroFormPresent).toEqual(true);
              expect(info.IsXFAPresent).toEqual(false);
              expect(info.IsCollectionPresent).toEqual(false);
              expect(info.IsSignaturesPresent).toEqual(false);
              expect(metadata).toEqual(null);
              expect(contentDispositionFilename).toEqual(null);
              expect(contentLength).toEqual(244351);
              _context70.next = 25;
              return loadingTask.destroy();

            case 25:
            case "end":
              return _context70.stop();
          }
        }
      }, _callee70);
    })));
    it("gets markInfo", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee71() {
      var loadingTask, pdfDoc, markInfo;
      return _regenerator["default"].wrap(function _callee71$(_context71) {
        while (1) {
          switch (_context71.prev = _context71.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("annotation-line.pdf"));
              _context71.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context71.sent;
              _context71.next = 6;
              return pdfDoc.getMarkInfo();

            case 6:
              markInfo = _context71.sent;
              expect(markInfo.Marked).toEqual(true);
              expect(markInfo.UserProperties).toEqual(false);
              expect(markInfo.Suspects).toEqual(false);

            case 10:
            case "end":
              return _context71.stop();
          }
        }
      }, _callee71);
    })));
    it("gets data", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee72() {
      var data;
      return _regenerator["default"].wrap(function _callee72$(_context72) {
        while (1) {
          switch (_context72.prev = _context72.next) {
            case 0:
              _context72.next = 2;
              return pdfDocument.getData();

            case 2:
              data = _context72.sent;
              expect(data instanceof Uint8Array).toEqual(true);
              expect(data.length).toEqual(basicApiFileLength);

            case 5:
            case "end":
              return _context72.stop();
          }
        }
      }, _callee72);
    })));
    it("gets download info", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee73() {
      var downloadInfo;
      return _regenerator["default"].wrap(function _callee73$(_context73) {
        while (1) {
          switch (_context73.prev = _context73.next) {
            case 0:
              _context73.next = 2;
              return pdfDocument.getDownloadInfo();

            case 2:
              downloadInfo = _context73.sent;
              expect(downloadInfo).toEqual({
                length: basicApiFileLength
              });

            case 4:
            case "end":
              return _context73.stop();
          }
        }
      }, _callee73);
    })));
    it("gets document stats", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee74() {
      var stats;
      return _regenerator["default"].wrap(function _callee74$(_context74) {
        while (1) {
          switch (_context74.prev = _context74.next) {
            case 0:
              stats = pdfDocument.stats;
              expect(stats).toEqual(null);

            case 2:
            case "end":
              return _context74.stop();
          }
        }
      }, _callee74);
    })));
    it("cleans up document resources", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee75() {
      return _regenerator["default"].wrap(function _callee75$(_context75) {
        while (1) {
          switch (_context75.prev = _context75.next) {
            case 0:
              _context75.next = 2;
              return pdfDocument.cleanup();

            case 2:
              expect(true).toEqual(true);

            case 3:
            case "end":
              return _context75.stop();
          }
        }
      }, _callee75);
    })));
    it("checks that fingerprints are unique", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee76() {
      var loadingTask1, loadingTask2, data, fingerprints1, fingerprints2;
      return _regenerator["default"].wrap(function _callee76$(_context76) {
        while (1) {
          switch (_context76.prev = _context76.next) {
            case 0:
              loadingTask1 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue4436r.pdf"));
              loadingTask2 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue4575.pdf"));
              _context76.next = 4;
              return Promise.all([loadingTask1.promise, loadingTask2.promise]);

            case 4:
              data = _context76.sent;
              fingerprints1 = data[0].fingerprints;
              fingerprints2 = data[1].fingerprints;
              expect(fingerprints1).not.toEqual(fingerprints2);
              expect(fingerprints1).toEqual(["2f695a83d6e7553c24fc08b7ac69712d", null]);
              expect(fingerprints2).toEqual(["04c7126b34a46b6d4d6e7a1eff7edcb6", null]);
              _context76.next = 12;
              return Promise.all([loadingTask1.destroy(), loadingTask2.destroy()]);

            case 12:
            case "end":
              return _context76.stop();
          }
        }
      }, _callee76);
    })));
    it("write a value in an annotation, save the pdf and load it", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee77() {
      var loadingTask, pdfDoc, value, data, pdfPage, annotations, field;
      return _regenerator["default"].wrap(function _callee77$(_context77) {
        while (1) {
          switch (_context77.prev = _context77.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("evaljs.pdf"));
              _context77.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context77.sent;
              value = "Hello World";
              pdfDoc.annotationStorage.setValue("55R", {
                value: value
              });
              _context77.next = 8;
              return pdfDoc.saveDocument();

            case 8:
              data = _context77.sent;
              _context77.next = 11;
              return loadingTask.destroy();

            case 11:
              loadingTask = (0, _api.getDocument)(data);
              _context77.next = 14;
              return loadingTask.promise;

            case 14:
              pdfDoc = _context77.sent;
              _context77.next = 17;
              return pdfDoc.getPage(1);

            case 17:
              pdfPage = _context77.sent;
              _context77.next = 20;
              return pdfPage.getAnnotations();

            case 20:
              annotations = _context77.sent;
              field = annotations.find(function (annotation) {
                return annotation.id === "55R";
              });
              expect(!!field).toEqual(true);
              expect(field.fieldValue).toEqual(value);
              _context77.next = 26;
              return loadingTask.destroy();

            case 26:
            case "end":
              return _context77.stop();
          }
        }
      }, _callee77);
    })));
    describe("Cross-origin", function () {
      var loadingTask;

      function _checkCanLoad(expectSuccess, filename, options) {
        if (_is_node.isNodeJS) {
          pending("Cannot simulate cross-origin requests in Node.js");
        }

        var params = (0, _test_utils.buildGetDocumentParams)(filename, options);
        var url = new URL(params.url);

        if (url.hostname === "localhost") {
          url.hostname = "127.0.0.1";
        } else if (params.url.hostname === "127.0.0.1") {
          url.hostname = "localhost";
        } else {
          pending("Can only run cross-origin test on localhost!");
        }

        params.url = url.href;
        loadingTask = (0, _api.getDocument)(params);
        return loadingTask.promise.then(function (pdf) {
          return pdf.destroy();
        }).then(function () {
          expect(expectSuccess).toEqual(true);
        }, function (error) {
          if (expectSuccess) {
            expect(error).toEqual("There should not be any error");
          }

          expect(expectSuccess).toEqual(false);
        });
      }

      function testCanLoad(filename, options) {
        return _checkCanLoad(true, filename, options);
      }

      function testCannotLoad(filename, options) {
        return _checkCanLoad(false, filename, options);
      }

      afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee78() {
        return _regenerator["default"].wrap(function _callee78$(_context78) {
          while (1) {
            switch (_context78.prev = _context78.next) {
              case 0:
                if (!(loadingTask && !loadingTask.destroyed)) {
                  _context78.next = 3;
                  break;
                }

                _context78.next = 3;
                return loadingTask.destroy();

              case 3:
              case "end":
                return _context78.stop();
            }
          }
        }, _callee78);
      })));
      it("server disallows cors", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee79() {
        return _regenerator["default"].wrap(function _callee79$(_context79) {
          while (1) {
            switch (_context79.prev = _context79.next) {
              case 0:
                _context79.next = 2;
                return testCannotLoad("basicapi.pdf");

              case 2:
              case "end":
                return _context79.stop();
            }
          }
        }, _callee79);
      })));
      it("server allows cors without credentials, default withCredentials", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee80() {
        return _regenerator["default"].wrap(function _callee80$(_context80) {
          while (1) {
            switch (_context80.prev = _context80.next) {
              case 0:
                _context80.next = 2;
                return testCanLoad("basicapi.pdf?cors=withoutCredentials");

              case 2:
              case "end":
                return _context80.stop();
            }
          }
        }, _callee80);
      })));
      it("server allows cors without credentials, and withCredentials=false", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee81() {
        return _regenerator["default"].wrap(function _callee81$(_context81) {
          while (1) {
            switch (_context81.prev = _context81.next) {
              case 0:
                _context81.next = 2;
                return testCanLoad("basicapi.pdf?cors=withoutCredentials", {
                  withCredentials: false
                });

              case 2:
              case "end":
                return _context81.stop();
            }
          }
        }, _callee81);
      })));
      it("server allows cors without credentials, but withCredentials=true", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee82() {
        return _regenerator["default"].wrap(function _callee82$(_context82) {
          while (1) {
            switch (_context82.prev = _context82.next) {
              case 0:
                _context82.next = 2;
                return testCannotLoad("basicapi.pdf?cors=withoutCredentials", {
                  withCredentials: true
                });

              case 2:
              case "end":
                return _context82.stop();
            }
          }
        }, _callee82);
      })));
      it("server allows cors with credentials, and withCredentials=true", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee83() {
        return _regenerator["default"].wrap(function _callee83$(_context83) {
          while (1) {
            switch (_context83.prev = _context83.next) {
              case 0:
                _context83.next = 2;
                return testCanLoad("basicapi.pdf?cors=withCredentials", {
                  withCredentials: true
                });

              case 2:
              case "end":
                return _context83.stop();
            }
          }
        }, _callee83);
      })));
      it("server allows cors with credentials, and withCredentials=false", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee84() {
        return _regenerator["default"].wrap(function _callee84$(_context84) {
          while (1) {
            switch (_context84.prev = _context84.next) {
              case 0:
                _context84.next = 2;
                return testCanLoad("basicapi.pdf?cors=withCredentials", {
                  withCredentials: false
                });

              case 2:
              case "end":
                return _context84.stop();
            }
          }
        }, _callee84);
      })));
    });
  });
  describe("Page", function () {
    var pdfLoadingTask, pdfDocument, page;
    beforeAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee85() {
      return _regenerator["default"].wrap(function _callee85$(_context85) {
        while (1) {
          switch (_context85.prev = _context85.next) {
            case 0:
              pdfLoadingTask = (0, _api.getDocument)(basicApiGetDocumentParams);
              _context85.next = 3;
              return pdfLoadingTask.promise;

            case 3:
              pdfDocument = _context85.sent;
              _context85.next = 6;
              return pdfDocument.getPage(1);

            case 6:
              page = _context85.sent;

            case 7:
            case "end":
              return _context85.stop();
          }
        }
      }, _callee85);
    })));
    afterAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee86() {
      return _regenerator["default"].wrap(function _callee86$(_context86) {
        while (1) {
          switch (_context86.prev = _context86.next) {
            case 0:
              _context86.next = 2;
              return pdfLoadingTask.destroy();

            case 2:
            case "end":
              return _context86.stop();
          }
        }
      }, _callee86);
    })));
    it("gets page number", function () {
      expect(page.pageNumber).toEqual(1);
    });
    it("gets rotate", function () {
      expect(page.rotate).toEqual(0);
    });
    it("gets ref", function () {
      expect(page.ref).toEqual({
        num: 15,
        gen: 0
      });
    });
    it("gets userUnit", function () {
      expect(page.userUnit).toEqual(1.0);
    });
    it("gets view", function () {
      expect(page.view).toEqual([0, 0, 595.28, 841.89]);
    });
    it("gets view, with empty/invalid bounding boxes", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee87() {
      var viewLoadingTask, pdfDoc, numPages, viewPromises, i, _yield$Promise$all, _yield$Promise$all2, page1, page2, page3;

      return _regenerator["default"].wrap(function _callee87$(_context87) {
        while (1) {
          switch (_context87.prev = _context87.next) {
            case 0:
              viewLoadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("boundingBox_invalid.pdf"));
              _context87.next = 3;
              return viewLoadingTask.promise;

            case 3:
              pdfDoc = _context87.sent;
              numPages = pdfDoc.numPages;
              expect(numPages).toEqual(3);
              viewPromises = [];

              for (i = 0; i < numPages; i++) {
                viewPromises[i] = pdfDoc.getPage(i + 1).then(function (pdfPage) {
                  return pdfPage.view;
                });
              }

              _context87.next = 10;
              return Promise.all(viewPromises);

            case 10:
              _yield$Promise$all = _context87.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
              page1 = _yield$Promise$all2[0];
              page2 = _yield$Promise$all2[1];
              page3 = _yield$Promise$all2[2];
              expect(page1).toEqual([0, 0, 612, 792]);
              expect(page2).toEqual([0, 0, 800, 600]);
              expect(page3).toEqual([0, 0, 600, 800]);
              _context87.next = 20;
              return viewLoadingTask.destroy();

            case 20:
            case "end":
              return _context87.stop();
          }
        }
      }, _callee87);
    })));
    it("gets viewport", function () {
      var viewport = page.getViewport({
        scale: 1.5,
        rotation: 90
      });
      expect(viewport.viewBox).toEqual(page.view);
      expect(viewport.scale).toEqual(1.5);
      expect(viewport.rotation).toEqual(90);
      expect(viewport.transform).toEqual([0, 1.5, 1.5, 0, 0, 0]);
      expect(viewport.width).toEqual(1262.835);
      expect(viewport.height).toEqual(892.92);
    });
    it('gets viewport with "offsetX/offsetY" arguments', function () {
      var viewport = page.getViewport({
        scale: 1,
        rotation: 0,
        offsetX: 100,
        offsetY: -100
      });
      expect(viewport.transform).toEqual([1, 0, 0, -1, 100, 741.89]);
    });
    it('gets viewport respecting "dontFlip" argument', function () {
      var scale = 1,
          rotation = 0;
      var viewport = page.getViewport({
        scale: scale,
        rotation: rotation
      });
      var dontFlipViewport = page.getViewport({
        scale: scale,
        rotation: rotation,
        dontFlip: true
      });
      expect(dontFlipViewport).not.toEqual(viewport);
      expect(dontFlipViewport).toEqual(viewport.clone({
        dontFlip: true
      }));
      expect(viewport.transform).toEqual([1, 0, 0, -1, 0, 841.89]);
      expect(dontFlipViewport.transform).toEqual([1, 0, -0, 1, 0, 0]);
    });
    it("gets viewport with invalid rotation", function () {
      expect(function () {
        page.getViewport({
          scale: 1,
          rotation: 45
        });
      }).toThrow(new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees."));
    });
    it("gets annotations", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee88() {
      var defaultPromise, anyPromise, displayPromise, printPromise;
      return _regenerator["default"].wrap(function _callee88$(_context88) {
        while (1) {
          switch (_context88.prev = _context88.next) {
            case 0:
              defaultPromise = page.getAnnotations().then(function (data) {
                expect(data.length).toEqual(4);
              });
              anyPromise = page.getAnnotations({
                intent: "any"
              }).then(function (data) {
                expect(data.length).toEqual(4);
              });
              displayPromise = page.getAnnotations({
                intent: "display"
              }).then(function (data) {
                expect(data.length).toEqual(4);
              });
              printPromise = page.getAnnotations({
                intent: "print"
              }).then(function (data) {
                expect(data.length).toEqual(4);
              });
              _context88.next = 6;
              return Promise.all([defaultPromise, anyPromise, displayPromise, printPromise]);

            case 6:
            case "end":
              return _context88.stop();
          }
        }
      }, _callee88);
    })));
    it("gets annotations containing relative URLs (bug 766086)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee89() {
      var filename, defaultLoadingTask, defaultPromise, docBaseUrlLoadingTask, docBaseUrlPromise, invalidDocBaseUrlLoadingTask, invalidDocBaseUrlPromise, _yield$Promise$all3, _yield$Promise$all4, defaultAnnotations, docBaseUrlAnnotations, invalidDocBaseUrlAnnotations;

      return _regenerator["default"].wrap(function _callee89$(_context89) {
        while (1) {
          switch (_context89.prev = _context89.next) {
            case 0:
              filename = "bug766086.pdf";
              defaultLoadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename));
              defaultPromise = defaultLoadingTask.promise.then(function (pdfDoc) {
                return pdfDoc.getPage(1).then(function (pdfPage) {
                  return pdfPage.getAnnotations();
                });
              });
              docBaseUrlLoadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename, {
                docBaseUrl: "http://www.example.com/test/pdfs/qwerty.pdf"
              }));
              docBaseUrlPromise = docBaseUrlLoadingTask.promise.then(function (pdfDoc) {
                return pdfDoc.getPage(1).then(function (pdfPage) {
                  return pdfPage.getAnnotations();
                });
              });
              invalidDocBaseUrlLoadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename, {
                docBaseUrl: "qwerty.pdf"
              }));
              invalidDocBaseUrlPromise = invalidDocBaseUrlLoadingTask.promise.then(function (pdfDoc) {
                return pdfDoc.getPage(1).then(function (pdfPage) {
                  return pdfPage.getAnnotations();
                });
              });
              _context89.next = 9;
              return Promise.all([defaultPromise, docBaseUrlPromise, invalidDocBaseUrlPromise]);

            case 9:
              _yield$Promise$all3 = _context89.sent;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 3);
              defaultAnnotations = _yield$Promise$all4[0];
              docBaseUrlAnnotations = _yield$Promise$all4[1];
              invalidDocBaseUrlAnnotations = _yield$Promise$all4[2];
              expect(defaultAnnotations[0].url).toBeUndefined();
              expect(defaultAnnotations[0].unsafeUrl).toEqual("../../0021/002156/215675E.pdf#15");
              expect(docBaseUrlAnnotations[0].url).toEqual("http://www.example.com/0021/002156/215675E.pdf#15");
              expect(docBaseUrlAnnotations[0].unsafeUrl).toEqual("../../0021/002156/215675E.pdf#15");
              expect(invalidDocBaseUrlAnnotations[0].url).toBeUndefined();
              expect(invalidDocBaseUrlAnnotations[0].unsafeUrl).toEqual("../../0021/002156/215675E.pdf#15");
              _context89.next = 22;
              return Promise.all([defaultLoadingTask.destroy(), docBaseUrlLoadingTask.destroy(), invalidDocBaseUrlLoadingTask.destroy()]);

            case 22:
            case "end":
              return _context89.stop();
          }
        }
      }, _callee89);
    })));
    it("gets text content", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee90() {
      var defaultPromise, parametersPromise, data, page1;
      return _regenerator["default"].wrap(function _callee90$(_context90) {
        while (1) {
          switch (_context90.prev = _context90.next) {
            case 0:
              defaultPromise = page.getTextContent();
              parametersPromise = page.getTextContent({
                normalizeWhitespace: true,
                disableCombineTextItems: true
              });
              _context90.next = 4;
              return Promise.all([defaultPromise, parametersPromise]);

            case 4:
              data = _context90.sent;
              expect(!!data[0].items).toEqual(true);
              expect(data[0].items.length).toEqual(11);
              expect(!!data[0].styles).toEqual(true);
              page1 = mergeText(data[0].items);
              expect(page1).toEqual("Table Of Content\nChapter 1 .......................................................... 2\nParagraph 1.1 ...................................................... 3\npage 1 / 3");
              expect(!!data[1].items).toEqual(true);
              expect(data[1].items.length).toEqual(6);
              expect(!!data[1].styles).toEqual(true);

            case 13:
            case "end":
              return _context90.stop();
          }
        }
      }, _callee90);
    })));
    it("gets text content, with correct properties (issue 8276)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee91() {
      var loadingTask, pdfDoc, pdfPage, _yield$pdfPage$getTex, items, styles, fontName;

      return _regenerator["default"].wrap(function _callee91$(_context91) {
        while (1) {
          switch (_context91.prev = _context91.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue8276_reduced.pdf"));
              _context91.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context91.sent;
              _context91.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context91.sent;
              _context91.next = 9;
              return pdfPage.getTextContent();

            case 9:
              _yield$pdfPage$getTex = _context91.sent;
              items = _yield$pdfPage$getTex.items;
              styles = _yield$pdfPage$getTex.styles;
              expect(items.length).toEqual(1);
              fontName = items[0].fontName;
              expect(Object.keys(styles)).toEqual([fontName]);
              expect(items[0]).toEqual({
                dir: "ltr",
                fontName: fontName,
                height: 18,
                str: "Issue 8276",
                transform: [18, 0, 0, 18, 441.81, 708.4499999999999],
                width: 77.49,
                hasEOL: false
              });
              expect(styles[fontName]).toEqual({
                fontFamily: "serif",
                ascent: NaN,
                descent: NaN,
                vertical: false
              });
              _context91.next = 19;
              return loadingTask.destroy();

            case 19:
            case "end":
              return _context91.stop();
          }
        }
      }, _callee91);
    })));
    it("gets text content, with no extra spaces (issue 13226)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee92() {
      var loadingTask, pdfDoc, pdfPage, _yield$pdfPage$getTex2, items, text;

      return _regenerator["default"].wrap(function _callee92$(_context92) {
        while (1) {
          switch (_context92.prev = _context92.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue13226.pdf"));
              _context92.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context92.sent;
              _context92.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context92.sent;
              _context92.next = 9;
              return pdfPage.getTextContent();

            case 9:
              _yield$pdfPage$getTex2 = _context92.sent;
              items = _yield$pdfPage$getTex2.items;
              text = mergeText(items);
              expect(text).toEqual("Mitarbeiterinnen und Mitarbeiter arbeiten in über 100 Ländern engagiert im Dienste");
              _context92.next = 15;
              return loadingTask.destroy();

            case 15:
            case "end":
              return _context92.stop();
          }
        }
      }, _callee92);
    })));
    it("gets text content, with merged spaces (issue 13201)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee93() {
      var loadingTask, pdfDoc, pdfPage, _yield$pdfPage$getTex3, items, text;

      return _regenerator["default"].wrap(function _callee93$(_context93) {
        while (1) {
          switch (_context93.prev = _context93.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue13201.pdf"));
              _context93.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context93.sent;
              _context93.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context93.sent;
              _context93.next = 9;
              return pdfPage.getTextContent();

            case 9:
              _yield$pdfPage$getTex3 = _context93.sent;
              items = _yield$pdfPage$getTex3.items;
              text = mergeText(items);
              expect(text.includes("Abstract. A purely peer-to-peer version of electronic cash would allow online")).toEqual(true);
              expect(text.includes("avoid mediating disputes. The cost of mediation increases transaction costs, limiting the")).toEqual(true);
              expect(text.includes("system is secure as long as honest nodes collectively control more CPU power than any")).toEqual(true);
              _context93.next = 17;
              return loadingTask.destroy();

            case 17:
            case "end":
              return _context93.stop();
          }
        }
      }, _callee93);
    })));
    it("gets text content, with no spaces between letters of words (issue 11913)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee94() {
      var loadingTask, pdfDoc, pdfPage, _yield$pdfPage$getTex4, items, text;

      return _regenerator["default"].wrap(function _callee94$(_context94) {
        while (1) {
          switch (_context94.prev = _context94.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue11913.pdf"));
              _context94.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context94.sent;
              _context94.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context94.sent;
              _context94.next = 9;
              return pdfPage.getTextContent();

            case 9:
              _yield$pdfPage$getTex4 = _context94.sent;
              items = _yield$pdfPage$getTex4.items;
              text = mergeText(items);
              expect(text.includes("1. The first of these cases arises from the tragic handicap which has blighted the life of the Plaintiff, and from the response of the")).toEqual(true);
              expect(text.includes("argued in this Court the appeal raises narrower, but important, issues which may be summarised as follows:-")).toEqual(true);
              _context94.next = 16;
              return loadingTask.destroy();

            case 16:
            case "end":
              return _context94.stop();
          }
        }
      }, _callee94);
    })));
    it("gets text content, with merged spaces (issue 10900)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee95() {
      var loadingTask, pdfDoc, pdfPage, _yield$pdfPage$getTex5, items, text;

      return _regenerator["default"].wrap(function _callee95$(_context95) {
        while (1) {
          switch (_context95.prev = _context95.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue10900.pdf"));
              _context95.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context95.sent;
              _context95.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context95.sent;
              _context95.next = 9;
              return pdfPage.getTextContent();

            case 9:
              _yield$pdfPage$getTex5 = _context95.sent;
              items = _yield$pdfPage$getTex5.items;
              text = mergeText(items);
              expect(text.includes("3 3 3 3\n851.5 854.9 839.3 837.5\n633.6 727.8 789.9 796.2\n1,485.1 1,582.7 1,629.2 1,633.7\n114.2 121.7 125.3 130.7\n13.0x 13.0x 13.0x 12.5x")).toEqual(true);
              _context95.next = 15;
              return loadingTask.destroy();

            case 15:
            case "end":
              return _context95.stop();
          }
        }
      }, _callee95);
    })));
    it("gets text content, with spaces (issue 10640)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee96() {
      var loadingTask, pdfDoc, pdfPage, _yield$pdfPage$getTex6, items, text;

      return _regenerator["default"].wrap(function _callee96$(_context96) {
        while (1) {
          switch (_context96.prev = _context96.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue10640.pdf"));
              _context96.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context96.sent;
              _context96.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context96.sent;
              _context96.next = 9;
              return pdfPage.getTextContent();

            case 9:
              _yield$pdfPage$getTex6 = _context96.sent;
              items = _yield$pdfPage$getTex6.items;
              text = mergeText(items);
              expect(text.includes("Open Sans is a humanist sans serif typeface designed by Steve Matteson.\nOpen Sans was designed with an upright stress, open forms and a neu-\ntral, yet friendly appearance. It was optimized for print, web, and mobile\ninterfaces, and has excellent legibility characteristics in its letterforms (see\nfigure \x81 on the following page). This font is available from the Google Font\nDirectory [\x81] as TrueType files licensed under the Apache License version \x82.\x80.\nThis package provides support for this font in LATEX. It includes Type \x81\nversions of the fonts, converted for this package using FontForge from its\nsources, for full support with Dvips.")).toEqual(true);
              _context96.next = 15;
              return loadingTask.destroy();

            case 15:
            case "end":
              return _context96.stop();
          }
        }
      }, _callee96);
    })));
    it("gets text content, with negative spaces (bug 931481)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee97() {
      var loadingTask, pdfDoc, pdfPage, _yield$pdfPage$getTex7, items, text;

      return _regenerator["default"].wrap(function _callee97$(_context97) {
        while (1) {
          switch (_context97.prev = _context97.next) {
            case 0:
              if (_is_node.isNodeJS) {
                pending("Linked test-cases are not supported in Node.js.");
              }

              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("bug931481.pdf"));
              _context97.next = 4;
              return loadingTask.promise;

            case 4:
              pdfDoc = _context97.sent;
              _context97.next = 7;
              return pdfDoc.getPage(1);

            case 7:
              pdfPage = _context97.sent;
              _context97.next = 10;
              return pdfPage.getTextContent();

            case 10:
              _yield$pdfPage$getTex7 = _context97.sent;
              items = _yield$pdfPage$getTex7.items;
              text = mergeText(items);
              expect(text.includes("Kathrin Nachbaur\nDie promovierte Juristin ist 1979 in Graz geboren und aufgewachsen. Nach\nerfolgreichem Studienabschluss mit Fokus auf Europarecht absolvierte sie ein\nPraktikum bei Magna International in Kanada in der Human Resources Abteilung.\nAnschliessend wurde sie geschult in Human Resources, Arbeitsrecht und\nKommunikation, w\xE4hrenddessen sie auch an ihrem Doktorat im Wirtschaftsrecht\narbeitete. Seither arbeitete sie bei Magna International als Projekt Manager in der\nInnovationsabteilung. Seit 2009 ist sie Frank Stronachs B\xFCroleiterin in \xD6sterreich und\nKanada. Zus\xE4tzlich ist sie seit 2012 Vice President, Business Development der\nStronach Group und Vizepr\xE4sidentin und Institutsleiterin des Stronach Institut f\xFCr\nsozial\xF6konomische Gerechtigkeit.")).toEqual(true);
              _context97.next = 16;
              return loadingTask.destroy();

            case 16:
            case "end":
              return _context97.stop();
          }
        }
      }, _callee97);
    })));
    it("gets text content, with beginbfrange operator handled correctly (bug 1627427)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee98() {
      var loadingTask, pdfDoc, pdfPage, _yield$pdfPage$getTex8, items, text;

      return _regenerator["default"].wrap(function _callee98$(_context98) {
        while (1) {
          switch (_context98.prev = _context98.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("bug1627427_reduced.pdf"));
              _context98.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context98.sent;
              _context98.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context98.sent;
              _context98.next = 9;
              return pdfPage.getTextContent();

            case 9:
              _yield$pdfPage$getTex8 = _context98.sent;
              items = _yield$pdfPage$getTex8.items;
              text = mergeText(items);
              expect(text).toEqual("침하게 흐린 품이 눈이 올 듯하더니 눈은 아니 오고 얼다가 만 비가 추");
              _context98.next = 15;
              return loadingTask.destroy();

            case 15:
            case "end":
              return _context98.stop();
          }
        }
      }, _callee98);
    })));
    it("gets empty structure tree", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee99() {
      var tree;
      return _regenerator["default"].wrap(function _callee99$(_context99) {
        while (1) {
          switch (_context99.prev = _context99.next) {
            case 0:
              _context99.next = 2;
              return page.getStructTree();

            case 2:
              tree = _context99.sent;
              expect(tree).toEqual(null);

            case 4:
            case "end":
              return _context99.stop();
          }
        }
      }, _callee99);
    })));
    it("gets simple structure tree", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee100() {
      var loadingTask, pdfDoc, pdfPage, tree;
      return _regenerator["default"].wrap(function _callee100$(_context100) {
        while (1) {
          switch (_context100.prev = _context100.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("structure_simple.pdf"));
              _context100.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context100.sent;
              _context100.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context100.sent;
              _context100.next = 9;
              return pdfPage.getStructTree();

            case 9:
              tree = _context100.sent;
              expect(tree).toEqual({
                role: "Root",
                children: [{
                  role: "Document",
                  lang: "en-US",
                  children: [{
                    role: "H1",
                    children: [{
                      role: "NonStruct",
                      children: [{
                        type: "content",
                        id: "page2R_mcid0"
                      }]
                    }]
                  }, {
                    role: "P",
                    children: [{
                      role: "NonStruct",
                      children: [{
                        type: "content",
                        id: "page2R_mcid1"
                      }]
                    }]
                  }, {
                    role: "H2",
                    children: [{
                      role: "NonStruct",
                      children: [{
                        type: "content",
                        id: "page2R_mcid2"
                      }]
                    }]
                  }, {
                    role: "P",
                    children: [{
                      role: "NonStruct",
                      children: [{
                        type: "content",
                        id: "page2R_mcid3"
                      }]
                    }]
                  }]
                }]
              });
              _context100.next = 13;
              return loadingTask.destroy();

            case 13:
            case "end":
              return _context100.stop();
          }
        }
      }, _callee100);
    })));
    it("gets operator list", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee101() {
      var operatorList;
      return _regenerator["default"].wrap(function _callee101$(_context101) {
        while (1) {
          switch (_context101.prev = _context101.next) {
            case 0:
              _context101.next = 2;
              return page.getOperatorList();

            case 2:
              operatorList = _context101.sent;
              expect(operatorList.fnArray.length).toBeGreaterThan(100);
              expect(operatorList.argsArray.length).toBeGreaterThan(100);
              expect(operatorList.lastChunk).toEqual(true);

            case 6:
            case "end":
              return _context101.stop();
          }
        }
      }, _callee101);
    })));
    it("gets operatorList with JPEG image (issue 4888)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee102() {
      var loadingTask, pdfDoc, pdfPage, operatorList, imgIndex, imgArgs, _pdfPage$objs$get, data;

      return _regenerator["default"].wrap(function _callee102$(_context102) {
        while (1) {
          switch (_context102.prev = _context102.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("cmykjpeg.pdf"));
              _context102.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context102.sent;
              _context102.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context102.sent;
              _context102.next = 9;
              return pdfPage.getOperatorList();

            case 9:
              operatorList = _context102.sent;
              imgIndex = operatorList.fnArray.indexOf(_util.OPS.paintImageXObject);
              imgArgs = operatorList.argsArray[imgIndex];
              _pdfPage$objs$get = pdfPage.objs.get(imgArgs[0]), data = _pdfPage$objs$get.data;
              expect(data instanceof Uint8ClampedArray).toEqual(true);
              expect(data.length).toEqual(90000);
              _context102.next = 17;
              return loadingTask.destroy();

            case 17:
            case "end":
              return _context102.stop();
          }
        }
      }, _callee102);
    })));
    it("gets operatorList, from corrupt PDF file (issue 8702), " + "with/without `stopAtErrors` set", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee103() {
      var loadingTask1, loadingTask2, result1, result2;
      return _regenerator["default"].wrap(function _callee103$(_context103) {
        while (1) {
          switch (_context103.prev = _context103.next) {
            case 0:
              loadingTask1 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue8702.pdf", {
                stopAtErrors: false
              }));
              loadingTask2 = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue8702.pdf", {
                stopAtErrors: true
              }));
              result1 = loadingTask1.promise.then(function (pdfDoc) {
                return pdfDoc.getPage(1).then(function (pdfPage) {
                  return pdfPage.getOperatorList().then(function (opList) {
                    expect(opList.fnArray.length).toBeGreaterThan(100);
                    expect(opList.argsArray.length).toBeGreaterThan(100);
                    expect(opList.lastChunk).toEqual(true);
                    return loadingTask1.destroy();
                  });
                });
              });
              result2 = loadingTask2.promise.then(function (pdfDoc) {
                return pdfDoc.getPage(1).then(function (pdfPage) {
                  return pdfPage.getOperatorList().then(function (opList) {
                    expect(opList.fnArray.length).toEqual(0);
                    expect(opList.argsArray.length).toEqual(0);
                    expect(opList.lastChunk).toEqual(true);
                    return loadingTask2.destroy();
                  });
                });
              });
              _context103.next = 6;
              return Promise.all([result1, result2]);

            case 6:
            case "end":
              return _context103.stop();
          }
        }
      }, _callee103);
    })));
    it("gets operator list, containing Annotation-operatorLists", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee104() {
      var loadingTask, pdfDoc, pdfPage, operatorList;
      return _regenerator["default"].wrap(function _callee104$(_context104) {
        while (1) {
          switch (_context104.prev = _context104.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("annotation-line.pdf"));
              _context104.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context104.sent;
              _context104.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context104.sent;
              _context104.next = 9;
              return pdfPage.getOperatorList();

            case 9:
              operatorList = _context104.sent;
              expect(operatorList.fnArray.length).toBeGreaterThan(20);
              expect(operatorList.argsArray.length).toBeGreaterThan(20);
              expect(operatorList.lastChunk).toEqual(true);
              expect(operatorList.fnArray.includes(_util.OPS.beginAnnotation)).toEqual(true);
              expect(operatorList.fnArray.includes(_util.OPS.endAnnotation)).toEqual(true);
              _context104.next = 17;
              return loadingTask.destroy();

            case 17:
            case "end":
              return _context104.stop();
          }
        }
      }, _callee104);
    })));
    it("gets operator list, with `annotationMode`-option", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee105() {
      var loadingTask, pdfDoc, pdfPage, opListAnnotDisable, opListAnnotEnable, opListAnnotEnableForms, opListAnnotEnableStorage;
      return _regenerator["default"].wrap(function _callee105$(_context105) {
        while (1) {
          switch (_context105.prev = _context105.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("evaljs.pdf"));
              _context105.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context105.sent;
              _context105.next = 6;
              return pdfDoc.getPage(2);

            case 6:
              pdfPage = _context105.sent;
              pdfDoc.annotationStorage.setValue("30R", {
                value: "test"
              });
              pdfDoc.annotationStorage.setValue("31R", {
                value: true
              });
              _context105.next = 11;
              return pdfPage.getOperatorList({
                annotationMode: _util.AnnotationMode.DISABLE
              });

            case 11:
              opListAnnotDisable = _context105.sent;
              expect(opListAnnotDisable.fnArray.length).toEqual(0);
              expect(opListAnnotDisable.argsArray.length).toEqual(0);
              expect(opListAnnotDisable.lastChunk).toEqual(true);
              _context105.next = 17;
              return pdfPage.getOperatorList({
                annotationMode: _util.AnnotationMode.ENABLE
              });

            case 17:
              opListAnnotEnable = _context105.sent;
              expect(opListAnnotEnable.fnArray.length).toBeGreaterThan(150);
              expect(opListAnnotEnable.argsArray.length).toBeGreaterThan(150);
              expect(opListAnnotEnable.lastChunk).toEqual(true);
              _context105.next = 23;
              return pdfPage.getOperatorList({
                annotationMode: _util.AnnotationMode.ENABLE_FORMS
              });

            case 23:
              opListAnnotEnableForms = _context105.sent;
              expect(opListAnnotEnableForms.fnArray.length).toBeGreaterThan(40);
              expect(opListAnnotEnableForms.argsArray.length).toBeGreaterThan(40);
              expect(opListAnnotEnableForms.lastChunk).toEqual(true);
              _context105.next = 29;
              return pdfPage.getOperatorList({
                annotationMode: _util.AnnotationMode.ENABLE_STORAGE
              });

            case 29:
              opListAnnotEnableStorage = _context105.sent;
              expect(opListAnnotEnableStorage.fnArray.length).toBeGreaterThan(170);
              expect(opListAnnotEnableStorage.argsArray.length).toBeGreaterThan(170);
              expect(opListAnnotEnableStorage.lastChunk).toEqual(true);
              expect(opListAnnotDisable.fnArray.length).toBeLessThan(opListAnnotEnableForms.fnArray.length);
              expect(opListAnnotEnableForms.fnArray.length).toBeLessThan(opListAnnotEnable.fnArray.length);
              expect(opListAnnotEnable.fnArray.length).toBeLessThan(opListAnnotEnableStorage.fnArray.length);
              _context105.next = 38;
              return loadingTask.destroy();

            case 38:
            case "end":
              return _context105.stop();
          }
        }
      }, _callee105);
    })));
    it("gets operatorList, with page resources containing corrupt /CCITTFaxDecode data", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee106() {
      var loadingTask, pdfDoc, pdfPage, opList;
      return _regenerator["default"].wrap(function _callee106$(_context106) {
        while (1) {
          switch (_context106.prev = _context106.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("poppler-90-0-fuzzed.pdf"));
              expect(loadingTask instanceof _api.PDFDocumentLoadingTask).toEqual(true);
              _context106.next = 4;
              return loadingTask.promise;

            case 4:
              pdfDoc = _context106.sent;
              expect(pdfDoc.numPages).toEqual(16);
              _context106.next = 8;
              return pdfDoc.getPage(6);

            case 8:
              pdfPage = _context106.sent;
              expect(pdfPage instanceof _api.PDFPageProxy).toEqual(true);
              _context106.next = 12;
              return pdfPage.getOperatorList();

            case 12:
              opList = _context106.sent;
              expect(opList.fnArray.length).toBeGreaterThan(25);
              expect(opList.argsArray.length).toBeGreaterThan(25);
              expect(opList.lastChunk).toEqual(true);
              _context106.next = 18;
              return loadingTask.destroy();

            case 18:
            case "end":
              return _context106.stop();
          }
        }
      }, _callee106);
    })));
    it("gets document stats after parsing page", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee107() {
      var _expectedFontTypes;

      var stats, expectedStreamTypes, expectedFontTypes;
      return _regenerator["default"].wrap(function _callee107$(_context107) {
        while (1) {
          switch (_context107.prev = _context107.next) {
            case 0:
              _context107.next = 2;
              return page.getOperatorList();

            case 2:
              stats = pdfDocument.stats;
              expectedStreamTypes = _defineProperty({}, _util.StreamType.FLATE, true);
              expectedFontTypes = (_expectedFontTypes = {}, _defineProperty(_expectedFontTypes, _util.FontType.TYPE1STANDARD, true), _defineProperty(_expectedFontTypes, _util.FontType.CIDFONTTYPE2, true), _expectedFontTypes);
              expect(stats).toEqual({
                streamTypes: expectedStreamTypes,
                fontTypes: expectedFontTypes
              });

            case 6:
            case "end":
              return _context107.stop();
          }
        }
      }, _callee107);
    })));
    it("gets page stats after parsing page, without `pdfBug` set", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee108() {
      return _regenerator["default"].wrap(function _callee108$(_context108) {
        while (1) {
          switch (_context108.prev = _context108.next) {
            case 0:
              _context108.next = 2;
              return page.getOperatorList();

            case 2:
              expect(page.stats).toEqual(null);

            case 3:
            case "end":
              return _context108.stop();
          }
        }
      }, _callee108);
    })));
    it("gets page stats after parsing page, with `pdfBug` set", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee109() {
      var loadingTask, pdfDoc, pdfPage, stats, _stats$times, statEntry;

      return _regenerator["default"].wrap(function _callee109$(_context109) {
        while (1) {
          switch (_context109.prev = _context109.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(basicApiFileName, {
                pdfBug: true
              }));
              _context109.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context109.sent;
              _context109.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context109.sent;
              _context109.next = 9;
              return pdfPage.getOperatorList();

            case 9:
              stats = pdfPage.stats;
              expect(stats instanceof _display_utils.StatTimer).toEqual(true);
              expect(stats.times.length).toEqual(1);
              _stats$times = _slicedToArray(stats.times, 1), statEntry = _stats$times[0];
              expect(statEntry.name).toEqual("Page Request");
              expect(statEntry.end - statEntry.start).toBeGreaterThanOrEqual(0);
              _context109.next = 17;
              return loadingTask.destroy();

            case 17:
            case "end":
              return _context109.stop();
          }
        }
      }, _callee109);
    })));
    it("gets page stats after rendering page, with `pdfBug` set", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee110() {
      var loadingTask, pdfDoc, pdfPage, viewport, canvasAndCtx, renderTask, stats, _stats$times2, statEntryOne, statEntryTwo, statEntryThree;

      return _regenerator["default"].wrap(function _callee110$(_context110) {
        while (1) {
          switch (_context110.prev = _context110.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(basicApiFileName, {
                pdfBug: true
              }));
              _context110.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context110.sent;
              _context110.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context110.sent;
              viewport = pdfPage.getViewport({
                scale: 1
              });
              canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
              renderTask = pdfPage.render({
                canvasContext: canvasAndCtx.context,
                canvasFactory: CanvasFactory,
                viewport: viewport
              });
              expect(renderTask instanceof _api.RenderTask).toEqual(true);
              _context110.next = 13;
              return renderTask.promise;

            case 13:
              stats = pdfPage.stats;
              expect(stats instanceof _display_utils.StatTimer).toEqual(true);
              expect(stats.times.length).toEqual(3);
              _stats$times2 = _slicedToArray(stats.times, 3), statEntryOne = _stats$times2[0], statEntryTwo = _stats$times2[1], statEntryThree = _stats$times2[2];
              expect(statEntryOne.name).toEqual("Page Request");
              expect(statEntryOne.end - statEntryOne.start).toBeGreaterThanOrEqual(0);
              expect(statEntryTwo.name).toEqual("Rendering");
              expect(statEntryTwo.end - statEntryTwo.start).toBeGreaterThan(0);
              expect(statEntryThree.name).toEqual("Overall");
              expect(statEntryThree.end - statEntryThree.start).toBeGreaterThan(0);
              CanvasFactory.destroy(canvasAndCtx);
              _context110.next = 26;
              return loadingTask.destroy();

            case 26:
            case "end":
              return _context110.stop();
          }
        }
      }, _callee110);
    })));
    it("cancels rendering of page", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee111() {
      var viewport, canvasAndCtx, renderTask;
      return _regenerator["default"].wrap(function _callee111$(_context111) {
        while (1) {
          switch (_context111.prev = _context111.next) {
            case 0:
              viewport = page.getViewport({
                scale: 1
              });
              canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
              renderTask = page.render({
                canvasContext: canvasAndCtx.context,
                canvasFactory: CanvasFactory,
                viewport: viewport
              });
              expect(renderTask instanceof _api.RenderTask).toEqual(true);
              renderTask.cancel();
              _context111.prev = 5;
              _context111.next = 8;
              return renderTask.promise;

            case 8:
              expect(false).toEqual(true);
              _context111.next = 16;
              break;

            case 11:
              _context111.prev = 11;
              _context111.t0 = _context111["catch"](5);
              expect(_context111.t0 instanceof _display_utils.RenderingCancelledException).toEqual(true);
              expect(_context111.t0.message).toEqual("Rendering cancelled, page 1");
              expect(_context111.t0.type).toEqual("canvas");

            case 16:
              CanvasFactory.destroy(canvasAndCtx);

            case 17:
            case "end":
              return _context111.stop();
          }
        }
      }, _callee111, null, [[5, 11]]);
    })));
    it("re-render page, using the same canvas, after cancelling rendering", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee112() {
      var viewport, canvasAndCtx, renderTask, reRenderTask;
      return _regenerator["default"].wrap(function _callee112$(_context112) {
        while (1) {
          switch (_context112.prev = _context112.next) {
            case 0:
              viewport = page.getViewport({
                scale: 1
              });
              canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
              renderTask = page.render({
                canvasContext: canvasAndCtx.context,
                canvasFactory: CanvasFactory,
                viewport: viewport
              });
              expect(renderTask instanceof _api.RenderTask).toEqual(true);
              renderTask.cancel();
              _context112.prev = 5;
              _context112.next = 8;
              return renderTask.promise;

            case 8:
              expect(false).toEqual(true);
              _context112.next = 14;
              break;

            case 11:
              _context112.prev = 11;
              _context112.t0 = _context112["catch"](5);
              expect(_context112.t0 instanceof _display_utils.RenderingCancelledException).toEqual(true);

            case 14:
              reRenderTask = page.render({
                canvasContext: canvasAndCtx.context,
                canvasFactory: CanvasFactory,
                viewport: viewport
              });
              expect(reRenderTask instanceof _api.RenderTask).toEqual(true);
              _context112.next = 18;
              return reRenderTask.promise;

            case 18:
              CanvasFactory.destroy(canvasAndCtx);

            case 19:
            case "end":
              return _context112.stop();
          }
        }
      }, _callee112, null, [[5, 11]]);
    })));
    it("multiple render() on the same canvas", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee113() {
      var optionalContentConfigPromise, viewport, canvasAndCtx, renderTask1, renderTask2;
      return _regenerator["default"].wrap(function _callee113$(_context113) {
        while (1) {
          switch (_context113.prev = _context113.next) {
            case 0:
              optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();
              viewport = page.getViewport({
                scale: 1
              });
              canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
              renderTask1 = page.render({
                canvasContext: canvasAndCtx.context,
                canvasFactory: CanvasFactory,
                viewport: viewport,
                optionalContentConfigPromise: optionalContentConfigPromise
              });
              expect(renderTask1 instanceof _api.RenderTask).toEqual(true);
              renderTask2 = page.render({
                canvasContext: canvasAndCtx.context,
                canvasFactory: CanvasFactory,
                viewport: viewport,
                optionalContentConfigPromise: optionalContentConfigPromise
              });
              expect(renderTask2 instanceof _api.RenderTask).toEqual(true);
              _context113.next = 9;
              return Promise.all([renderTask1.promise, renderTask2.promise.then(function () {
                expect(false).toEqual(true);
              }, function (reason) {
                expect(/multiple render\(\)/.test(reason.message)).toEqual(true);
              })]);

            case 9:
            case "end":
              return _context113.stop();
          }
        }
      }, _callee113);
    })));
    it("cleans up document resources after rendering of page", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee114() {
      var loadingTask, pdfDoc, pdfPage, viewport, canvasAndCtx, renderTask;
      return _regenerator["default"].wrap(function _callee114$(_context114) {
        while (1) {
          switch (_context114.prev = _context114.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(basicApiFileName));
              _context114.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context114.sent;
              _context114.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context114.sent;
              viewport = pdfPage.getViewport({
                scale: 1
              });
              canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
              renderTask = pdfPage.render({
                canvasContext: canvasAndCtx.context,
                canvasFactory: CanvasFactory,
                viewport: viewport
              });
              expect(renderTask instanceof _api.RenderTask).toEqual(true);
              _context114.next = 13;
              return renderTask.promise;

            case 13:
              _context114.next = 15;
              return pdfDoc.cleanup();

            case 15:
              expect(true).toEqual(true);
              CanvasFactory.destroy(canvasAndCtx);
              _context114.next = 19;
              return loadingTask.destroy();

            case 19:
            case "end":
              return _context114.stop();
          }
        }
      }, _callee114);
    })));
    it("cleans up document resources during rendering of page", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee115() {
      var loadingTask, pdfDoc, pdfPage, viewport, canvasAndCtx, renderTask;
      return _regenerator["default"].wrap(function _callee115$(_context115) {
        while (1) {
          switch (_context115.prev = _context115.next) {
            case 0:
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("tracemonkey.pdf"));
              _context115.next = 3;
              return loadingTask.promise;

            case 3:
              pdfDoc = _context115.sent;
              _context115.next = 6;
              return pdfDoc.getPage(1);

            case 6:
              pdfPage = _context115.sent;
              viewport = pdfPage.getViewport({
                scale: 1
              });
              canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
              renderTask = pdfPage.render({
                canvasContext: canvasAndCtx.context,
                canvasFactory: CanvasFactory,
                viewport: viewport
              });
              expect(renderTask instanceof _api.RenderTask).toEqual(true);

              renderTask.onContinue = function (cont) {
                waitSome(cont);
              };

              _context115.prev = 12;
              _context115.next = 15;
              return pdfDoc.cleanup();

            case 15:
              expect(false).toEqual(true);
              _context115.next = 22;
              break;

            case 18:
              _context115.prev = 18;
              _context115.t0 = _context115["catch"](12);
              expect(_context115.t0 instanceof Error).toEqual(true);
              expect(_context115.t0.message).toEqual("startCleanup: Page 1 is currently rendering.");

            case 22:
              _context115.next = 24;
              return renderTask.promise;

            case 24:
              CanvasFactory.destroy(canvasAndCtx);
              _context115.next = 27;
              return loadingTask.destroy();

            case 27:
            case "end":
              return _context115.stop();
          }
        }
      }, _callee115, null, [[12, 18]]);
    })));
    it("caches image resources at the document/page level as expected (issue 11878)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee116() {
      var NUM_PAGES_THRESHOLD, EXPECTED_WIDTH, EXPECTED_HEIGHT, loadingTask, pdfDoc, firstImgData, i, pdfPage, opList, commonObjs, objs, imgIndex, _opList$argsArray$img, objId, width, height, objsPool, currentImgData;

      return _regenerator["default"].wrap(function _callee116$(_context116) {
        while (1) {
          switch (_context116.prev = _context116.next) {
            case 0:
              NUM_PAGES_THRESHOLD = _image_utils.GlobalImageCache.NUM_PAGES_THRESHOLD, EXPECTED_WIDTH = 2550, EXPECTED_HEIGHT = 3300;
              loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("issue11878.pdf"));
              _context116.next = 4;
              return loadingTask.promise;

            case 4:
              pdfDoc = _context116.sent;
              firstImgData = null;
              i = 1;

            case 7:
              if (!(i <= pdfDoc.numPages)) {
                _context116.next = 24;
                break;
              }

              _context116.next = 10;
              return pdfDoc.getPage(i);

            case 10:
              pdfPage = _context116.sent;
              _context116.next = 13;
              return pdfPage.getOperatorList();

            case 13:
              opList = _context116.sent;
              commonObjs = pdfPage.commonObjs, objs = pdfPage.objs;
              imgIndex = opList.fnArray.indexOf(_util.OPS.paintImageXObject);
              _opList$argsArray$img = _slicedToArray(opList.argsArray[imgIndex], 3), objId = _opList$argsArray$img[0], width = _opList$argsArray$img[1], height = _opList$argsArray$img[2];

              if (i < NUM_PAGES_THRESHOLD) {
                expect(objId).toEqual("img_p".concat(i - 1, "_1"));
                expect(objs.has(objId)).toEqual(true);
                expect(commonObjs.has(objId)).toEqual(false);
              } else {
                expect(objId).toEqual("g_".concat(loadingTask.docId, "_img_p").concat(NUM_PAGES_THRESHOLD - 1, "_1"));
                expect(objs.has(objId)).toEqual(false);
                expect(commonObjs.has(objId)).toEqual(true);
              }

              expect(width).toEqual(EXPECTED_WIDTH);
              expect(height).toEqual(EXPECTED_HEIGHT);

              if (i === 1) {
                firstImgData = objs.get(objId);
                expect(firstImgData.width).toEqual(EXPECTED_WIDTH);
                expect(firstImgData.height).toEqual(EXPECTED_HEIGHT);
                expect(firstImgData.kind).toEqual(_util.ImageKind.RGB_24BPP);
                expect(firstImgData.data instanceof Uint8ClampedArray).toEqual(true);
                expect(firstImgData.data.length).toEqual(25245000);
              } else {
                objsPool = i >= NUM_PAGES_THRESHOLD ? commonObjs : objs;
                currentImgData = objsPool.get(objId);
                expect(currentImgData.width).toEqual(firstImgData.width);
                expect(currentImgData.height).toEqual(firstImgData.height);
                expect(currentImgData.kind).toEqual(firstImgData.kind);
                expect(currentImgData.data instanceof Uint8ClampedArray).toEqual(true);
                expect(currentImgData.data.every(function (value, index) {
                  return value === firstImgData.data[index];
                })).toEqual(true);
              }

            case 21:
              i++;
              _context116.next = 7;
              break;

            case 24:
              _context116.next = 26;
              return loadingTask.destroy();

            case 26:
              firstImgData = null;

            case 27:
            case "end":
              return _context116.stop();
          }
        }
      }, _callee116);
    })));
  });
  describe("Multiple `getDocument` instances", function () {
    var pdf1 = (0, _test_utils.buildGetDocumentParams)("tracemonkey.pdf");
    var pdf2 = (0, _test_utils.buildGetDocumentParams)("TAMReview.pdf");
    var pdf3 = (0, _test_utils.buildGetDocumentParams)("issue6068.pdf");
    var loadingTasks = [];

    function renderPDF(_x) {
      return _renderPDF.apply(this, arguments);
    }

    function _renderPDF() {
      _renderPDF = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee119(filename) {
        var loadingTask, pdf, page, viewport, canvasAndCtx, renderTask, data;
        return _regenerator["default"].wrap(function _callee119$(_context119) {
          while (1) {
            switch (_context119.prev = _context119.next) {
              case 0:
                loadingTask = (0, _api.getDocument)(filename);
                loadingTasks.push(loadingTask);
                _context119.next = 4;
                return loadingTask.promise;

              case 4:
                pdf = _context119.sent;
                _context119.next = 7;
                return pdf.getPage(1);

              case 7:
                page = _context119.sent;
                viewport = page.getViewport({
                  scale: 1.2
                });
                canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
                renderTask = page.render({
                  canvasContext: canvasAndCtx.context,
                  canvasFactory: CanvasFactory,
                  viewport: viewport
                });
                _context119.next = 13;
                return renderTask.promise;

              case 13:
                data = canvasAndCtx.canvas.toDataURL();
                CanvasFactory.destroy(canvasAndCtx);
                return _context119.abrupt("return", data);

              case 16:
              case "end":
                return _context119.stop();
            }
          }
        }, _callee119);
      }));
      return _renderPDF.apply(this, arguments);
    }

    afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee117() {
      var destroyPromises;
      return _regenerator["default"].wrap(function _callee117$(_context117) {
        while (1) {
          switch (_context117.prev = _context117.next) {
            case 0:
              destroyPromises = loadingTasks.map(function (loadingTask) {
                return loadingTask.destroy();
              });
              _context117.next = 3;
              return Promise.all(destroyPromises);

            case 3:
            case "end":
              return _context117.stop();
          }
        }
      }, _callee117);
    })));
    it("should correctly render PDFs in parallel", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee118() {
      var baseline1, baseline2, baseline3, promiseDone;
      return _regenerator["default"].wrap(function _callee118$(_context118) {
        while (1) {
          switch (_context118.prev = _context118.next) {
            case 0:
              promiseDone = renderPDF(pdf1).then(function (data1) {
                baseline1 = data1;
                return renderPDF(pdf2);
              }).then(function (data2) {
                baseline2 = data2;
                return renderPDF(pdf3);
              }).then(function (data3) {
                baseline3 = data3;
                return Promise.all([renderPDF(pdf1), renderPDF(pdf2), renderPDF(pdf3)]);
              }).then(function (dataUrls) {
                expect(dataUrls[0]).toEqual(baseline1);
                expect(dataUrls[1]).toEqual(baseline2);
                expect(dataUrls[2]).toEqual(baseline3);
                return true;
              });
              _context118.next = 3;
              return promiseDone;

            case 3:
            case "end":
              return _context118.stop();
          }
        }
      }, _callee118);
    })));
  });
  describe("PDFDataRangeTransport", function () {
    var dataPromise;
    beforeAll(function () {
      var fileName = "tracemonkey.pdf";
      dataPromise = _test_utils.DefaultFileReaderFactory.fetch({
        path: _test_utils.TEST_PDFS_PATH + fileName
      });
    });
    afterAll(function () {
      dataPromise = null;
    });
    it("should fetch document info and page using ranges", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee120() {
      var initialDataLength, fetches, data, initialData, transport, loadingTask, pdfDocument, pdfPage;
      return _regenerator["default"].wrap(function _callee120$(_context120) {
        while (1) {
          switch (_context120.prev = _context120.next) {
            case 0:
              initialDataLength = 4000;
              fetches = 0;
              _context120.next = 4;
              return dataPromise;

            case 4:
              data = _context120.sent;
              initialData = data.subarray(0, initialDataLength);
              transport = new _api.PDFDataRangeTransport(data.length, initialData);

              transport.requestDataRange = function (begin, end) {
                fetches++;
                waitSome(function () {
                  transport.onDataProgress(4000);
                  transport.onDataRange(begin, data.subarray(begin, end));
                });
              };

              loadingTask = (0, _api.getDocument)(transport);
              _context120.next = 11;
              return loadingTask.promise;

            case 11:
              pdfDocument = _context120.sent;
              expect(pdfDocument.numPages).toEqual(14);
              _context120.next = 15;
              return pdfDocument.getPage(10);

            case 15:
              pdfPage = _context120.sent;
              expect(pdfPage.rotate).toEqual(0);
              expect(fetches).toBeGreaterThan(2);
              _context120.next = 20;
              return loadingTask.destroy();

            case 20:
            case "end":
              return _context120.stop();
          }
        }
      }, _callee120);
    })));
    it("should fetch document info and page using range and streaming", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee121() {
      var initialDataLength, fetches, data, initialData, transport, loadingTask, pdfDocument, pdfPage;
      return _regenerator["default"].wrap(function _callee121$(_context121) {
        while (1) {
          switch (_context121.prev = _context121.next) {
            case 0:
              initialDataLength = 4000;
              fetches = 0;
              _context121.next = 4;
              return dataPromise;

            case 4:
              data = _context121.sent;
              initialData = data.subarray(0, initialDataLength);
              transport = new _api.PDFDataRangeTransport(data.length, initialData);

              transport.requestDataRange = function (begin, end) {
                fetches++;

                if (fetches === 1) {
                  transport.onDataProgressiveRead(data.subarray(initialDataLength));
                }

                waitSome(function () {
                  transport.onDataRange(begin, data.subarray(begin, end));
                });
              };

              loadingTask = (0, _api.getDocument)(transport);
              _context121.next = 11;
              return loadingTask.promise;

            case 11:
              pdfDocument = _context121.sent;
              expect(pdfDocument.numPages).toEqual(14);
              _context121.next = 15;
              return pdfDocument.getPage(10);

            case 15:
              pdfPage = _context121.sent;
              expect(pdfPage.rotate).toEqual(0);
              expect(fetches).toEqual(1);
              _context121.next = 20;
              return new Promise(function (resolve) {
                waitSome(resolve);
              });

            case 20:
              _context121.next = 22;
              return loadingTask.destroy();

            case 22:
            case "end":
              return _context121.stop();
          }
        }
      }, _callee121);
    })));
    it("should fetch document info and page, without range, " + "using complete initialData", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee122() {
      var fetches, data, transport, loadingTask, pdfDocument, pdfPage;
      return _regenerator["default"].wrap(function _callee122$(_context122) {
        while (1) {
          switch (_context122.prev = _context122.next) {
            case 0:
              fetches = 0;
              _context122.next = 3;
              return dataPromise;

            case 3:
              data = _context122.sent;
              transport = new _api.PDFDataRangeTransport(data.length, data, true);

              transport.requestDataRange = function (begin, end) {
                fetches++;
              };

              loadingTask = (0, _api.getDocument)({
                disableRange: true,
                range: transport
              });
              _context122.next = 9;
              return loadingTask.promise;

            case 9:
              pdfDocument = _context122.sent;
              expect(pdfDocument.numPages).toEqual(14);
              _context122.next = 13;
              return pdfDocument.getPage(10);

            case 13:
              pdfPage = _context122.sent;
              expect(pdfPage.rotate).toEqual(0);
              expect(fetches).toEqual(0);
              _context122.next = 18;
              return loadingTask.destroy();

            case 18:
            case "end":
              return _context122.stop();
          }
        }
      }, _callee122);
    })));
  });
});