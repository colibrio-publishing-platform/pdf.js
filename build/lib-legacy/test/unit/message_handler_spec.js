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

var _api = require("../../display/api.js");

var _message_handler = require("../../shared/message_handler.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

describe("message_handler", function () {
  function sleep(ticks) {
    return Promise.resolve().then(function () {
      return ticks && sleep(ticks - 1);
    });
  }

  describe("sendWithStream", function () {
    it("should return a ReadableStream", function () {
      var port = new _api.LoopbackPort();
      var messageHandler1 = new _message_handler.MessageHandler("main", "worker", port);
      var readable = messageHandler1.sendWithStream("fakeHandler");
      expect(_typeof(readable)).toEqual("object");
      expect(_typeof(readable.getReader)).toEqual("function");
    });
    it("should read using a reader", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var log, port, messageHandler1, messageHandler2, readable, reader, result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              log = "";
              port = new _api.LoopbackPort();
              messageHandler1 = new _message_handler.MessageHandler("main", "worker", port);
              messageHandler2 = new _message_handler.MessageHandler("worker", "main", port);
              messageHandler2.on("fakeHandler", function (data, sink) {
                sink.onPull = function () {
                  log += "p";
                };

                sink.onCancel = function (reason) {
                  log += "c";
                };

                sink.ready.then(function () {
                  sink.enqueue("hi");
                  return sink.ready;
                }).then(function () {
                  sink.close();
                });
                return sleep(5);
              });
              readable = messageHandler1.sendWithStream("fakeHandler", {}, {
                highWaterMark: 1,
                size: function size() {
                  return 1;
                }
              });
              reader = readable.getReader();
              _context.next = 9;
              return sleep(10);

            case 9:
              expect(log).toEqual("");
              _context.next = 12;
              return reader.read();

            case 12:
              result = _context.sent;
              expect(log).toEqual("p");
              expect(result.value).toEqual("hi");
              expect(result.done).toEqual(false);
              _context.next = 18;
              return sleep(10);

            case 18:
              _context.next = 20;
              return reader.read();

            case 20:
              result = _context.sent;
              expect(result.value).toEqual(undefined);
              expect(result.done).toEqual(true);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it("should not read any data when cancelled", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var log, port, messageHandler2, messageHandler1, readable, reader, result;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              log = "";
              port = new _api.LoopbackPort();
              messageHandler2 = new _message_handler.MessageHandler("worker", "main", port);
              messageHandler2.on("fakeHandler", function (data, sink) {
                sink.onPull = function () {
                  log += "p";
                };

                sink.onCancel = function (reason) {
                  log += "c";
                };

                log += "0";
                sink.ready.then(function () {
                  log += "1";
                  sink.enqueue([1, 2, 3, 4], 4);
                  return sink.ready;
                }).then(function () {
                  log += "2";
                  sink.enqueue([5, 6, 7, 8], 4);
                  return sink.ready;
                }).then(function () {
                  log += "3";
                  sink.close();
                }, function () {
                  log += "4";
                });
              });
              messageHandler1 = new _message_handler.MessageHandler("main", "worker", port);
              readable = messageHandler1.sendWithStream("fakeHandler", {}, {
                highWaterMark: 4,
                size: function size(arr) {
                  return arr.length;
                }
              });
              reader = readable.getReader();
              _context2.next = 9;
              return sleep(10);

            case 9:
              expect(log).toEqual("01");
              _context2.next = 12;
              return reader.read();

            case 12:
              result = _context2.sent;
              expect(result.value).toEqual([1, 2, 3, 4]);
              expect(result.done).toEqual(false);
              _context2.next = 17;
              return sleep(10);

            case 17:
              expect(log).toEqual("01p2");
              _context2.next = 20;
              return reader.cancel(new _util.AbortException("reader cancelled."));

            case 20:
              expect(log).toEqual("01p2c4");

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("should not read when errored", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var log, port, messageHandler2, messageHandler1, readable, reader, result;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              log = "";
              port = new _api.LoopbackPort();
              messageHandler2 = new _message_handler.MessageHandler("worker", "main", port);
              messageHandler2.on("fakeHandler", function (data, sink) {
                sink.onPull = function () {
                  log += "p";
                };

                sink.onCancel = function (reason) {
                  log += "c";
                };

                log += "0";
                sink.ready.then(function () {
                  log += "1";
                  sink.enqueue([1, 2, 3, 4], 4);
                  return sink.ready;
                }).then(function () {
                  log += "e";
                  sink.error(new Error("should not read when errored"));
                });
              });
              messageHandler1 = new _message_handler.MessageHandler("main", "worker", port);
              readable = messageHandler1.sendWithStream("fakeHandler", {}, {
                highWaterMark: 4,
                size: function size(arr) {
                  return arr.length;
                }
              });
              reader = readable.getReader();
              _context3.next = 9;
              return sleep(10);

            case 9:
              expect(log).toEqual("01");
              _context3.next = 12;
              return reader.read();

            case 12:
              result = _context3.sent;
              expect(result.value).toEqual([1, 2, 3, 4]);
              expect(result.done).toEqual(false);
              _context3.prev = 15;
              _context3.next = 18;
              return reader.read();

            case 18:
              expect(false).toEqual(true);
              _context3.next = 26;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](15);
              expect(log).toEqual("01pe");
              expect(_context3.t0 instanceof _util.UnknownErrorException).toEqual(true);
              expect(_context3.t0.message).toEqual("should not read when errored");

            case 26:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[15, 21]]);
    })));
    it("should read data with blocking promise", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var log, port, messageHandler2, messageHandler1, readable, reader, result;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              log = "";
              port = new _api.LoopbackPort();
              messageHandler2 = new _message_handler.MessageHandler("worker", "main", port);
              messageHandler2.on("fakeHandler", function (data, sink) {
                sink.onPull = function () {
                  log += "p";
                };

                sink.onCancel = function (reason) {
                  log += "c";
                };

                log += "0";
                sink.ready.then(function () {
                  log += "1";
                  sink.enqueue([1, 2, 3, 4], 4);
                  return sink.ready;
                }).then(function () {
                  log += "2";
                  sink.enqueue([5, 6, 7, 8], 4);
                  return sink.ready;
                }).then(function () {
                  sink.close();
                });
              });
              messageHandler1 = new _message_handler.MessageHandler("main", "worker", port);
              readable = messageHandler1.sendWithStream("fakeHandler", {}, {
                highWaterMark: 4,
                size: function size(arr) {
                  return arr.length;
                }
              });
              reader = readable.getReader();
              _context4.next = 9;
              return sleep(10);

            case 9:
              expect(log).toEqual("01");
              _context4.next = 12;
              return reader.read();

            case 12:
              result = _context4.sent;
              expect(result.value).toEqual([1, 2, 3, 4]);
              expect(result.done).toEqual(false);
              _context4.next = 17;
              return sleep(10);

            case 17:
              expect(log).toEqual("01p2");
              _context4.next = 20;
              return reader.read();

            case 20:
              result = _context4.sent;
              expect(result.value).toEqual([5, 6, 7, 8]);
              expect(result.done).toEqual(false);
              _context4.next = 25;
              return sleep(10);

            case 25:
              expect(log).toEqual("01p2p");
              _context4.next = 28;
              return reader.read();

            case 28:
              result = _context4.sent;
              expect(result.value).toEqual(undefined);
              expect(result.done).toEqual(true);

            case 31:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it("should read data with blocking promise and buffer whole data" + " into stream", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var log, port, messageHandler2, messageHandler1, readable, reader, result;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              log = "";
              port = new _api.LoopbackPort();
              messageHandler2 = new _message_handler.MessageHandler("worker", "main", port);
              messageHandler2.on("fakeHandler", function (data, sink) {
                sink.onPull = function () {
                  log += "p";
                };

                sink.onCancel = function (reason) {
                  log += "c";
                };

                log += "0";
                sink.ready.then(function () {
                  log += "1";
                  sink.enqueue([1, 2, 3, 4], 4);
                  return sink.ready;
                }).then(function () {
                  log += "2";
                  sink.enqueue([5, 6, 7, 8], 4);
                  return sink.ready;
                }).then(function () {
                  sink.close();
                });
                return sleep(10);
              });
              messageHandler1 = new _message_handler.MessageHandler("main", "worker", port);
              readable = messageHandler1.sendWithStream("fakeHandler", {}, {
                highWaterMark: 8,
                size: function size(arr) {
                  return arr.length;
                }
              });
              reader = readable.getReader();
              _context5.next = 9;
              return sleep(10);

            case 9:
              expect(log).toEqual("012");
              _context5.next = 12;
              return reader.read();

            case 12:
              result = _context5.sent;
              expect(result.value).toEqual([1, 2, 3, 4]);
              expect(result.done).toEqual(false);
              _context5.next = 17;
              return sleep(10);

            case 17:
              expect(log).toEqual("012p");
              _context5.next = 20;
              return reader.read();

            case 20:
              result = _context5.sent;
              expect(result.value).toEqual([5, 6, 7, 8]);
              expect(result.done).toEqual(false);
              _context5.next = 25;
              return sleep(10);

            case 25:
              expect(log).toEqual("012p");
              _context5.next = 28;
              return reader.read();

            case 28:
              result = _context5.sent;
              expect(result.value).toEqual(undefined);
              expect(result.done).toEqual(true);

            case 31:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it("should ignore any pull after close is called", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var log, port, capability, messageHandler2, messageHandler1, readable, reader, result;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              log = "";
              port = new _api.LoopbackPort();
              capability = (0, _util.createPromiseCapability)();
              messageHandler2 = new _message_handler.MessageHandler("worker", "main", port);
              messageHandler2.on("fakeHandler", function (data, sink) {
                sink.onPull = function () {
                  log += "p";
                };

                sink.onCancel = function (reason) {
                  log += "c";
                };

                log += "0";
                sink.ready.then(function () {
                  log += "1";
                  sink.enqueue([1, 2, 3, 4], 4);
                });
                return capability.promise.then(function () {
                  sink.close();
                });
              });
              messageHandler1 = new _message_handler.MessageHandler("main", "worker", port);
              readable = messageHandler1.sendWithStream("fakeHandler", {}, {
                highWaterMark: 10,
                size: function size(arr) {
                  return arr.length;
                }
              });
              reader = readable.getReader();
              _context6.next = 10;
              return sleep(10);

            case 10:
              expect(log).toEqual("01");
              capability.resolve();
              _context6.next = 14;
              return capability.promise;

            case 14:
              _context6.next = 16;
              return reader.read();

            case 16:
              result = _context6.sent;
              expect(result.value).toEqual([1, 2, 3, 4]);
              expect(result.done).toEqual(false);
              _context6.next = 21;
              return sleep(10);

            case 21:
              expect(log).toEqual("01");
              _context6.next = 24;
              return reader.read();

            case 24:
              result = _context6.sent;
              expect(result.value).toEqual(undefined);
              expect(result.done).toEqual(true);

            case 27:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
});