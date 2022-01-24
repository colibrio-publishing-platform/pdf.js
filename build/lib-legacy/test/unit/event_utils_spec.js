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

var _event_utils = require("../../web/event_utils.js");

var _is_node = require("../../shared/is_node.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("event_utils", function () {
  describe("EventBus", function () {
    it("dispatch event", function () {
      var eventBus = new _event_utils.EventBus();
      var count = 0;
      eventBus.on("test", function (evt) {
        expect(evt).toEqual(undefined);
        count++;
      });
      eventBus.dispatch("test");
      expect(count).toEqual(1);
    });
    it("dispatch event with arguments", function () {
      var eventBus = new _event_utils.EventBus();
      var count = 0;
      eventBus.on("test", function (evt) {
        expect(evt).toEqual({
          abc: 123
        });
        count++;
      });
      eventBus.dispatch("test", {
        abc: 123
      });
      expect(count).toEqual(1);
    });
    it("dispatch different event", function () {
      var eventBus = new _event_utils.EventBus();
      var count = 0;
      eventBus.on("test", function () {
        count++;
      });
      eventBus.dispatch("nottest");
      expect(count).toEqual(0);
    });
    it("dispatch event multiple times", function () {
      var eventBus = new _event_utils.EventBus();
      var count = 0;
      eventBus.dispatch("test");
      eventBus.on("test", function () {
        count++;
      });
      eventBus.dispatch("test");
      eventBus.dispatch("test");
      expect(count).toEqual(2);
    });
    it("dispatch event to multiple handlers", function () {
      var eventBus = new _event_utils.EventBus();
      var count = 0;
      eventBus.on("test", function () {
        count++;
      });
      eventBus.on("test", function () {
        count++;
      });
      eventBus.dispatch("test");
      expect(count).toEqual(2);
    });
    it("dispatch to detached", function () {
      var eventBus = new _event_utils.EventBus();
      var count = 0;

      var listener = function listener() {
        count++;
      };

      eventBus.on("test", listener);
      eventBus.dispatch("test");
      eventBus.off("test", listener);
      eventBus.dispatch("test");
      expect(count).toEqual(1);
    });
    it("dispatch to wrong detached", function () {
      var eventBus = new _event_utils.EventBus();
      var count = 0;
      eventBus.on("test", function () {
        count++;
      });
      eventBus.dispatch("test");
      eventBus.off("test", function () {
        count++;
      });
      eventBus.dispatch("test");
      expect(count).toEqual(2);
    });
    it("dispatch to detached during handling", function () {
      var eventBus = new _event_utils.EventBus();
      var count = 0;

      var listener1 = function listener1() {
        eventBus.off("test", listener2);
        count++;
      };

      var listener2 = function listener2() {
        eventBus.off("test", listener1);
        count++;
      };

      eventBus.on("test", listener1);
      eventBus.on("test", listener2);
      eventBus.dispatch("test");
      eventBus.dispatch("test");
      expect(count).toEqual(2);
    });
    it("dispatch event to handlers with/without 'once' option", function () {
      var eventBus = new _event_utils.EventBus();
      var multipleCount = 0,
          onceCount = 0;
      eventBus.on("test", function () {
        multipleCount++;
      });
      eventBus.on("test", function () {
        onceCount++;
      }, {
        once: true
      });
      eventBus.dispatch("test");
      eventBus.dispatch("test");
      eventBus.dispatch("test");
      expect(multipleCount).toEqual(3);
      expect(onceCount).toEqual(1);
    });
    it("should not re-dispatch to DOM", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var eventBus, count, domEventListener;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              domEventListener = function _domEventListener() {
                expect(false).toEqual(true);
              };

              if (_is_node.isNodeJS) {
                pending("Document is not supported in Node.js.");
              }

              eventBus = new _event_utils.EventBus();
              count = 0;
              eventBus.on("test", function (evt) {
                expect(evt).toEqual(undefined);
                count++;
              });
              document.addEventListener("test", domEventListener);
              eventBus.dispatch("test");
              _context.next = 9;
              return Promise.resolve();

            case 9:
              expect(count).toEqual(1);
              document.removeEventListener("test", domEventListener);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe("waitOnEventOrTimeout", function () {
    var eventBus;
    beforeAll(function () {
      eventBus = new _event_utils.EventBus();
    });
    afterAll(function () {
      eventBus = null;
    });
    it("should reject invalid parameters", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var invalidTarget, invalidName, invalidDelay;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              invalidTarget = (0, _event_utils.waitOnEventOrTimeout)({
                target: "window",
                name: "DOMContentLoaded"
              }).then(function () {
                expect(false).toEqual(true);
              }, function (reason) {
                expect(reason instanceof Error).toEqual(true);
              });
              invalidName = (0, _event_utils.waitOnEventOrTimeout)({
                target: eventBus,
                name: ""
              }).then(function () {
                expect(false).toEqual(true);
              }, function (reason) {
                expect(reason instanceof Error).toEqual(true);
              });
              invalidDelay = (0, _event_utils.waitOnEventOrTimeout)({
                target: eventBus,
                name: "pagerendered",
                delay: -1000
              }).then(function () {
                expect(false).toEqual(true);
              }, function (reason) {
                expect(reason instanceof Error).toEqual(true);
              });
              _context2.next = 5;
              return Promise.all([invalidTarget, invalidName, invalidDelay]);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("should resolve on event, using the DOM", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var button, buttonClicked, type;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (_is_node.isNodeJS) {
                pending("Document is not supported in Node.js.");
              }

              button = document.createElement("button");
              buttonClicked = (0, _event_utils.waitOnEventOrTimeout)({
                target: button,
                name: "click",
                delay: 10000
              });
              button.click();
              _context3.next = 6;
              return buttonClicked;

            case 6:
              type = _context3.sent;
              expect(type).toEqual(_event_utils.WaitOnType.EVENT);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it("should resolve on timeout, using the DOM", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var button, buttonClicked, type;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (_is_node.isNodeJS) {
                pending("Document is not supported in Node.js.");
              }

              button = document.createElement("button");
              buttonClicked = (0, _event_utils.waitOnEventOrTimeout)({
                target: button,
                name: "click",
                delay: 10
              });
              _context4.next = 5;
              return buttonClicked;

            case 5:
              type = _context4.sent;
              expect(type).toEqual(_event_utils.WaitOnType.TIMEOUT);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it("should resolve on event, using the EventBus", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var pageRendered, type;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              pageRendered = (0, _event_utils.waitOnEventOrTimeout)({
                target: eventBus,
                name: "pagerendered",
                delay: 10000
              });
              eventBus.dispatch("pagerendered");
              _context5.next = 4;
              return pageRendered;

            case 4:
              type = _context5.sent;
              expect(type).toEqual(_event_utils.WaitOnType.EVENT);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it("should resolve on timeout, using the EventBus", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var pageRendered, type;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              pageRendered = (0, _event_utils.waitOnEventOrTimeout)({
                target: eventBus,
                name: "pagerendered",
                delay: 10
              });
              _context6.next = 3;
              return pageRendered;

            case 3:
              type = _context6.sent;
              expect(type).toEqual(_event_utils.WaitOnType.TIMEOUT);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
});