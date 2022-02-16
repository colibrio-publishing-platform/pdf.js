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

var _test_utils = require("./test_utils.js");

var _primitives = require("../../core/primitives.js");

var _util = require("../../shared/util.js");

var _stream = require("../../core/stream.js");

var _operator_list = require("../../core/operator_list.js");

var _evaluator = require("../../core/evaluator.js");

var _worker = require("../../core/worker.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("evaluator", function () {
  function HandlerMock() {
    this.inputs = [];
  }

  HandlerMock.prototype = {
    send: function send(name, data) {
      this.inputs.push({
        name: name,
        data: data
      });
    }
  };

  function ResourcesMock() {}

  ResourcesMock.prototype = {
    get: function get(name) {
      return this[name];
    }
  };

  function runOperatorListCheck(_x, _x2, _x3) {
    return _runOperatorListCheck.apply(this, arguments);
  }

  function _runOperatorListCheck() {
    _runOperatorListCheck = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee18(evaluator, stream, resources) {
      var operatorList, task;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              operatorList = new _operator_list.OperatorList();
              task = new _worker.WorkerTask("OperatorListCheck");
              _context18.next = 4;
              return evaluator.getOperatorList({
                stream: stream,
                task: task,
                resources: resources,
                operatorList: operatorList
              });

            case 4:
              return _context18.abrupt("return", operatorList);

            case 5:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));
    return _runOperatorListCheck.apply(this, arguments);
  }

  var partialEvaluator;
  beforeAll(function () {
    partialEvaluator = new _evaluator.PartialEvaluator({
      xref: new _test_utils.XRefMock(),
      handler: new HandlerMock(),
      pageIndex: 0,
      idFactory: (0, _test_utils.createIdFactory)(0)
    });
  });
  afterAll(function () {
    partialEvaluator = null;
  });
  describe("splitCombinedOperations", function () {
    it("should reject unknown operations", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var stream, result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              stream = new _stream.StringStream("fTT");
              _context.next = 3;
              return runOperatorListCheck(partialEvaluator, stream, new ResourcesMock());

            case 3:
              result = _context.sent;
              expect(!!result.fnArray && !!result.argsArray).toEqual(true);
              expect(result.fnArray.length).toEqual(1);
              expect(result.fnArray[0]).toEqual(_util.OPS.fill);
              expect(result.argsArray[0]).toEqual(null);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it("should handle one operation", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var stream, result;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              stream = new _stream.StringStream("Q");
              _context2.next = 3;
              return runOperatorListCheck(partialEvaluator, stream, new ResourcesMock());

            case 3:
              result = _context2.sent;
              expect(!!result.fnArray && !!result.argsArray).toEqual(true);
              expect(result.fnArray.length).toEqual(1);
              expect(result.fnArray[0]).toEqual(_util.OPS.restore);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("should handle two glued operations", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var imgDict, imgStream, xObject, resources, stream, result;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              imgDict = new _primitives.Dict();
              imgDict.set("Subtype", _primitives.Name.get("Image"));
              imgDict.set("Width", 1);
              imgDict.set("Height", 1);
              imgStream = new _stream.Stream([0]);
              imgStream.dict = imgDict;
              xObject = new _primitives.Dict();
              xObject.set("Res1", imgStream);
              resources = new ResourcesMock();
              resources.XObject = xObject;
              stream = new _stream.StringStream("/Res1 DoQ");
              _context3.next = 13;
              return runOperatorListCheck(partialEvaluator, stream, resources);

            case 13:
              result = _context3.sent;
              expect(result.fnArray.length).toEqual(3);
              expect(result.fnArray[0]).toEqual(_util.OPS.dependency);
              expect(result.fnArray[1]).toEqual(_util.OPS.paintImageXObject);
              expect(result.fnArray[2]).toEqual(_util.OPS.restore);
              expect(result.argsArray.length).toEqual(3);
              expect(result.argsArray[0]).toEqual(["img_p0_1"]);
              expect(result.argsArray[1]).toEqual(["img_p0_1", 1, 1]);
              expect(result.argsArray[2]).toEqual(null);

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it("should handle three glued operations", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var stream, result;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              stream = new _stream.StringStream("fff");
              _context4.next = 3;
              return runOperatorListCheck(partialEvaluator, stream, new ResourcesMock());

            case 3:
              result = _context4.sent;
              expect(!!result.fnArray && !!result.argsArray).toEqual(true);
              expect(result.fnArray.length).toEqual(3);
              expect(result.fnArray[0]).toEqual(_util.OPS.fill);
              expect(result.fnArray[1]).toEqual(_util.OPS.fill);
              expect(result.fnArray[2]).toEqual(_util.OPS.fill);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it("should handle three glued operations #2", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var resources, stream, result;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              resources = new ResourcesMock();
              resources.Res1 = {};
              stream = new _stream.StringStream("B*Bf*");
              _context5.next = 5;
              return runOperatorListCheck(partialEvaluator, stream, resources);

            case 5:
              result = _context5.sent;
              expect(!!result.fnArray && !!result.argsArray).toEqual(true);
              expect(result.fnArray.length).toEqual(3);
              expect(result.fnArray[0]).toEqual(_util.OPS.eoFillStroke);
              expect(result.fnArray[1]).toEqual(_util.OPS.fillStroke);
              expect(result.fnArray[2]).toEqual(_util.OPS.eoFill);

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it("should handle glued operations and operands", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var stream, result;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              stream = new _stream.StringStream("f5 Ts");
              _context6.next = 3;
              return runOperatorListCheck(partialEvaluator, stream, new ResourcesMock());

            case 3:
              result = _context6.sent;
              expect(!!result.fnArray && !!result.argsArray).toEqual(true);
              expect(result.fnArray.length).toEqual(2);
              expect(result.fnArray[0]).toEqual(_util.OPS.fill);
              expect(result.fnArray[1]).toEqual(_util.OPS.setTextRise);
              expect(result.argsArray.length).toEqual(2);
              expect(result.argsArray[1].length).toEqual(1);
              expect(result.argsArray[1][0]).toEqual(5);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it("should handle glued operations and literals", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var stream, result;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              stream = new _stream.StringStream("trueifalserinulln");
              _context7.next = 3;
              return runOperatorListCheck(partialEvaluator, stream, new ResourcesMock());

            case 3:
              result = _context7.sent;
              expect(!!result.fnArray && !!result.argsArray).toEqual(true);
              expect(result.fnArray.length).toEqual(3);
              expect(result.fnArray[0]).toEqual(_util.OPS.setFlatness);
              expect(result.fnArray[1]).toEqual(_util.OPS.setRenderingIntent);
              expect(result.fnArray[2]).toEqual(_util.OPS.endPath);
              expect(result.argsArray.length).toEqual(3);
              expect(result.argsArray[0].length).toEqual(1);
              expect(result.argsArray[0][0]).toEqual(true);
              expect(result.argsArray[1].length).toEqual(1);
              expect(result.argsArray[1][0]).toEqual(false);
              expect(result.argsArray[2]).toEqual(null);

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  describe("validateNumberOfArgs", function () {
    it("should execute if correct number of arguments", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var stream, result;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              stream = new _stream.StringStream("5 1 d0");
              _context8.next = 3;
              return runOperatorListCheck(partialEvaluator, stream, new ResourcesMock());

            case 3:
              result = _context8.sent;
              expect(result.argsArray[0][0]).toEqual(5);
              expect(result.argsArray[0][1]).toEqual(1);
              expect(result.fnArray[0]).toEqual(_util.OPS.setCharWidth);

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it("should execute if too many arguments", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var stream, result;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              stream = new _stream.StringStream("5 1 4 d0");
              _context9.next = 3;
              return runOperatorListCheck(partialEvaluator, stream, new ResourcesMock());

            case 3:
              result = _context9.sent;
              expect(result.argsArray[0][0]).toEqual(1);
              expect(result.argsArray[0][1]).toEqual(4);
              expect(result.fnArray[0]).toEqual(_util.OPS.setCharWidth);

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it("should execute if nested commands", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var gState, extGState, resources, stream, result;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              gState = new _primitives.Dict();
              gState.set("LW", 2);
              gState.set("CA", 0.5);
              extGState = new _primitives.Dict();
              extGState.set("GS2", gState);
              resources = new ResourcesMock();
              resources.ExtGState = extGState;
              stream = new _stream.StringStream("/F2 /GS2 gs 5.711 Tf");
              _context10.next = 10;
              return runOperatorListCheck(partialEvaluator, stream, resources);

            case 10:
              result = _context10.sent;
              expect(result.fnArray.length).toEqual(3);
              expect(result.fnArray[0]).toEqual(_util.OPS.setGState);
              expect(result.fnArray[1]).toEqual(_util.OPS.dependency);
              expect(result.fnArray[2]).toEqual(_util.OPS.setFont);
              expect(result.argsArray.length).toEqual(3);
              expect(result.argsArray[0]).toEqual([[["LW", 2], ["CA", 0.5]]]);
              expect(result.argsArray[1]).toEqual(["g_font_error"]);
              expect(result.argsArray[2]).toEqual(["g_font_error", 5.711]);

            case 19:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it("should skip if too few arguments", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var stream, result;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              stream = new _stream.StringStream("5 d0");
              _context11.next = 3;
              return runOperatorListCheck(partialEvaluator, stream, new ResourcesMock());

            case 3:
              result = _context11.sent;
              expect(result.argsArray).toEqual([]);
              expect(result.fnArray).toEqual([]);

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it("should error if (many) path operators have too few arguments " + "(bug 1443140)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var NUM_INVALID_OPS, tempArr, invalidMoveText, moveTextStream, result, invalidLineTo, lineToStream;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              NUM_INVALID_OPS = 25;
              tempArr = new Array(NUM_INVALID_OPS + 1);
              invalidMoveText = tempArr.join("10 Td\n");
              moveTextStream = new _stream.StringStream(invalidMoveText);
              _context12.next = 6;
              return runOperatorListCheck(partialEvaluator, moveTextStream, new ResourcesMock());

            case 6:
              result = _context12.sent;
              expect(result.argsArray).toEqual([]);
              expect(result.fnArray).toEqual([]);
              invalidLineTo = tempArr.join("20 l\n");
              lineToStream = new _stream.StringStream(invalidLineTo);
              _context12.prev = 11;
              _context12.next = 14;
              return runOperatorListCheck(partialEvaluator, lineToStream, new ResourcesMock());

            case 14:
              expect(false).toEqual(true);
              _context12.next = 21;
              break;

            case 17:
              _context12.prev = 17;
              _context12.t0 = _context12["catch"](11);
              expect(_context12.t0 instanceof _util.FormatError).toEqual(true);
              expect(_context12.t0.message).toEqual("Invalid command l: expected 2 args, but received 1 args.");

            case 21:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[11, 17]]);
    })));
    it("should close opened saves", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var stream, result;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              stream = new _stream.StringStream("qq");
              _context13.next = 3;
              return runOperatorListCheck(partialEvaluator, stream, new ResourcesMock());

            case 3:
              result = _context13.sent;
              expect(!!result.fnArray && !!result.argsArray).toEqual(true);
              expect(result.fnArray.length).toEqual(4);
              expect(result.fnArray[0]).toEqual(_util.OPS.save);
              expect(result.fnArray[1]).toEqual(_util.OPS.save);
              expect(result.fnArray[2]).toEqual(_util.OPS.restore);
              expect(result.fnArray[3]).toEqual(_util.OPS.restore);

            case 10:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    it("should error on paintXObject if name is missing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var stream;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              stream = new _stream.StringStream("/ Do");
              _context14.prev = 1;
              _context14.next = 4;
              return runOperatorListCheck(partialEvaluator, stream, new ResourcesMock());

            case 4:
              expect(false).toEqual(true);
              _context14.next = 11;
              break;

            case 7:
              _context14.prev = 7;
              _context14.t0 = _context14["catch"](1);
              expect(_context14.t0 instanceof _util.FormatError).toEqual(true);
              expect(_context14.t0.message).toEqual("XObject should be a stream");

            case 11:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[1, 7]]);
    })));
    it("should skip paintXObject if subtype is PS", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var xobjStreamDict, xobjStream, xobjs, resources, stream, result;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              xobjStreamDict = new _primitives.Dict();
              xobjStreamDict.set("Subtype", _primitives.Name.get("PS"));
              xobjStream = new _stream.Stream([], 0, 0, xobjStreamDict);
              xobjs = new _primitives.Dict();
              xobjs.set("Res1", xobjStream);
              resources = new _primitives.Dict();
              resources.set("XObject", xobjs);
              stream = new _stream.StringStream("/Res1 Do");
              _context15.next = 10;
              return runOperatorListCheck(partialEvaluator, stream, resources);

            case 10:
              result = _context15.sent;
              expect(result.argsArray).toEqual([]);
              expect(result.fnArray).toEqual([]);

            case 13:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
  });
  describe("thread control", function () {
    it("should abort operator list parsing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var stream, resources, result, task;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              stream = new _stream.StringStream("qqQQ");
              resources = new ResourcesMock();
              result = new _operator_list.OperatorList();
              task = new _worker.WorkerTask("OperatorListAbort");
              task.terminate();
              _context16.prev = 5;
              _context16.next = 8;
              return partialEvaluator.getOperatorList({
                stream: stream,
                task: task,
                resources: resources,
                operatorList: result
              });

            case 8:
              expect(false).toEqual(true);
              _context16.next = 15;
              break;

            case 11:
              _context16.prev = 11;
              _context16.t0 = _context16["catch"](5);
              expect(!!result.fnArray && !!result.argsArray).toEqual(true);
              expect(result.fnArray.length).toEqual(0);

            case 15:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, null, [[5, 11]]);
    })));
    it("should abort text content parsing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var resources, stream, task;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              resources = new ResourcesMock();
              stream = new _stream.StringStream("qqQQ");
              task = new _worker.WorkerTask("TextContentAbort");
              task.terminate();
              _context17.prev = 4;
              _context17.next = 7;
              return partialEvaluator.getTextContent({
                stream: stream,
                task: task,
                resources: resources
              });

            case 7:
              expect(false).toEqual(true);
              _context17.next = 13;
              break;

            case 10:
              _context17.prev = 10;
              _context17.t0 = _context17["catch"](4);
              expect(true).toEqual(true);

            case 13:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[4, 10]]);
    })));
  });
  describe("operator list", function () {
    var StreamSinkMock = /*#__PURE__*/function () {
      function StreamSinkMock() {
        _classCallCheck(this, StreamSinkMock);
      }

      _createClass(StreamSinkMock, [{
        key: "enqueue",
        value: function enqueue() {}
      }]);

      return StreamSinkMock;
    }();

    it("should get correct total length after flushing", function () {
      var operatorList = new _operator_list.OperatorList(null, new StreamSinkMock());
      operatorList.addOp(_util.OPS.save, null);
      operatorList.addOp(_util.OPS.restore, null);
      expect(operatorList.totalLength).toEqual(2);
      expect(operatorList.length).toEqual(2);
      operatorList.flush();
      expect(operatorList.totalLength).toEqual(2);
      expect(operatorList.length).toEqual(0);
    });
  });
});