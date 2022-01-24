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

var _display_utils = require("../../display/display_utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sandboxBundleSrc = "../../build/generic/build/pdf.sandbox.js";
describe("Scripting", function () {
  var sandbox, send_queue, test_id, ref, windowAlert;

  function getId() {
    var id = "".concat(ref++, "R");
    return id;
  }

  function myeval(code) {
    var key = (test_id++).toString();
    return sandbox.eval(code, key).then(function () {
      var result = send_queue.get(key).result;
      send_queue["delete"](key);
      return result;
    });
  }

  beforeAll(function () {
    test_id = 0;
    ref = 1;
    send_queue = new Map();

    window.dispatchEvent = function (event) {
      if (event.detail.command) {
        send_queue.set(event.detail.command, event.detail);
      } else if (send_queue.has(event.detail.id)) {
        var prev = send_queue.get(event.detail.id);
        Object.assign(prev, event.detail);
      } else {
        send_queue.set(event.detail.id, event.detail);
      }
    };

    windowAlert = window.alert;

    window.alert = function (value) {
      var command = "alert";
      send_queue.set(command, {
        command: command,
        value: value
      });
    };

    var promise = (0, _display_utils.loadScript)(sandboxBundleSrc).then(function () {
      return window.pdfjsSandbox.QuickJSSandbox();
    });
    sandbox = {
      createSandbox: function createSandbox(data) {
        promise.then(function (sbx) {
          return sbx.create(data);
        });
      },
      dispatchEventInSandbox: function dispatchEventInSandbox(data) {
        return promise.then(function (sbx) {
          return sbx.dispatchEvent(data);
        });
      },
      nukeSandbox: function nukeSandbox() {
        promise.then(function (sbx) {
          return sbx.nukeSandbox();
        });
      },
      eval: function _eval(code, key) {
        return promise.then(function (sbx) {
          return sbx.evalForTesting(code, key);
        });
      }
    };
  });
  afterAll(function () {
    sandbox.nukeSandbox();
    sandbox = null;
    send_queue = null;
    window.alert = windowAlert;
  });
  describe("Sandbox", function () {
    it("should send a value, execute an action and get back a new value", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var compute, number, expected, refId, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              compute = function _compute(n) {
                var s = 0;

                for (var i = 0; i < n; i++) {
                  s += i;
                }

                return s;
              };

              number = 123;
              expected = ((number - 1) * number / 2).toString();
              refId = getId();
              data = {
                objects: {
                  field: [{
                    id: refId,
                    value: "",
                    actions: {
                      Keystroke: ["".concat(compute.toString(), "event.value = compute(parseInt(event.value));")]
                    },
                    type: "text"
                  }]
                },
                calculationOrder: [],
                appInfo: {
                  language: "en-US",
                  platform: "Linux x86_64"
                }
              };
              sandbox.createSandbox(data);
              _context.next = 8;
              return sandbox.dispatchEventInSandbox({
                id: refId,
                value: "".concat(number),
                name: "Keystroke",
                willCommit: true
              });

            case 8:
              expect(send_queue.has(refId)).toEqual(true);
              expect(send_queue.get(refId)).toEqual({
                id: refId,
                valueAsString: expected
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe("Doc", function () {
    it("should treat globalThis as the doc", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var refId, data, value;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              refId = getId();
              data = {
                objects: {
                  field: [{
                    id: refId,
                    value: "",
                    actions: {},
                    type: "text"
                  }]
                },
                appInfo: {
                  language: "en-US",
                  platform: "Linux x86_64"
                },
                calculationOrder: [],
                dispatchEventName: "_dispatchMe"
              };
              sandbox.createSandbox(data);
              _context2.next = 5;
              return myeval("(this.foobar = 123456, 0)");

            case 5:
              _context2.next = 7;
              return myeval("this.getField(\"field\").doc.foobar");

            case 7:
              value = _context2.sent;
              expect(value).toEqual(123456);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("should get field using a path", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var base, data, value;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              base = function base(value) {
                return {
                  id: getId(),
                  value: value,
                  actions: {},
                  type: "text"
                };
              };

              data = {
                objects: {
                  A: [base(1)],
                  "A.B": [base(2)],
                  "A.B.C": [base(3)],
                  "A.B.C.D": [base(4)],
                  "A.B.C.D.E": [base(5)],
                  "A.B.C.D.E.F": [base(6)],
                  "A.B.C.D.G": [base(7)],
                  C: [base(8)]
                },
                appInfo: {
                  language: "en-US",
                  platform: "Linux x86_64"
                },
                calculationOrder: [],
                dispatchEventName: "_dispatchMe"
              };
              sandbox.createSandbox(data);
              _context3.next = 5;
              return myeval("this.getField(\"A\").value");

            case 5:
              value = _context3.sent;
              expect(value).toEqual(1);
              _context3.next = 9;
              return myeval("this.getField(\"B.C\").value");

            case 9:
              value = _context3.sent;
              expect(value).toEqual(3);
              _context3.next = 13;
              return myeval("this.getField(\"B.C\").value");

            case 13:
              value = _context3.sent;
              expect(value).toEqual(3);
              _context3.next = 17;
              return myeval("this.getField(\"B.C.D#0\").value");

            case 17:
              value = _context3.sent;
              expect(value).toEqual(5);
              _context3.next = 21;
              return myeval("this.getField(\"B.C.D#1\").value");

            case 21:
              value = _context3.sent;
              expect(value).toEqual(7);
              _context3.next = 25;
              return myeval("this.getField(\"C\").value");

            case 25:
              value = _context3.sent;
              expect(value).toEqual(8);
              _context3.next = 29;
              return myeval("this.getField(\"A.B.C.D\").getArray().map((x) => x.value)");

            case 29:
              value = _context3.sent;
              expect(value).toEqual([5, 7]);

            case 31:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe("Util", function () {
    beforeAll(function () {
      sandbox.createSandbox({
        appInfo: {
          language: "en-US",
          platform: "Linux x86_64"
        },
        objects: {},
        calculationOrder: []
      });
    });
    describe("printd", function () {
      it("should print a date according to a format", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var date, value;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                date = "new Date(\"Sun Apr 15 2007 03:14:15\")";
                _context4.next = 3;
                return myeval("util.printd(0, ".concat(date, ")"));

              case 3:
                value = _context4.sent;
                expect(value).toEqual("D:20070415031415");
                _context4.next = 7;
                return myeval("util.printd(1, ".concat(date, ")"));

              case 7:
                value = _context4.sent;
                expect(value).toEqual("2007.04.15 03:14:15");
                _context4.next = 11;
                return myeval("util.printd(2, ".concat(date, ")"));

              case 11:
                value = _context4.sent;
                expect(value).toEqual("4/15/07 3:14:15 am");
                _context4.next = 15;
                return myeval("util.printd(\"mmmm mmm mm m\", ".concat(date, ")"));

              case 15:
                value = _context4.sent;
                expect(value).toEqual("April Apr 04 4");
                _context4.next = 19;
                return myeval("util.printd(\"dddd ddd dd d\", ".concat(date, ")"));

              case 19:
                value = _context4.sent;
                expect(value).toEqual("Sunday Sun 15 15");

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
    });
    describe("scand", function () {
      it("should parse a date according to a format", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var date, value;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                date = new Date("Sun Apr 15 2007 03:14:15");
                _context5.next = 3;
                return myeval("util.scand(0, \"D:20070415031415\").toString()");

              case 3:
                value = _context5.sent;
                expect(new Date(value)).toEqual(date);
                _context5.next = 7;
                return myeval("util.scand(1, \"2007.04.15 03:14:15\").toString()");

              case 7:
                value = _context5.sent;
                expect(new Date(value)).toEqual(date);
                _context5.next = 11;
                return myeval("util.scand(2, \"4/15/07 3:14:15 am\").toString()");

              case 11:
                value = _context5.sent;
                expect(new Date(value)).toEqual(date);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
    });
    describe("printf", function () {
      it("should print some data according to a format", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var value;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return myeval("util.printf(\"Integer numbers: %d, %d,...\", 1.234, 56.789)");

              case 2:
                value = _context6.sent;
                expect(value).toEqual("Integer numbers: 1, 56,...");
                _context6.next = 6;
                return myeval("util.printf(\"Hex numbers: %x, %x,...\", 1234, 56789)");

              case 6:
                value = _context6.sent;
                expect(value).toEqual("Hex numbers: 4D2, DDD5,...");
                _context6.next = 10;
                return myeval("util.printf(\"Hex numbers with 0x: %#x, %#x,...\", 1234, 56789)");

              case 10:
                value = _context6.sent;
                expect(value).toEqual("Hex numbers with 0x: 0x4D2, 0xDDD5,...");
                _context6.next = 14;
                return myeval("util.printf(\"Decimal number: %,0+.3f\", 1234567.89123)");

              case 14:
                value = _context6.sent;
                expect(value).toEqual("Decimal number: +1,234,567.891");
                _context6.next = 18;
                return myeval("util.printf(\"Decimal number: %,0+8.3f\", 1.234567)");

              case 18:
                value = _context6.sent;
                expect(value).toEqual("Decimal number: +  1.235");
                _context6.next = 22;
                return myeval("util.printf(\"Decimal number: %,0.2f\", -12.34567)");

              case 22:
                value = _context6.sent;
                expect(value).toEqual("Decimal number: -12.35");

              case 24:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })));
      it("should print a string with no argument", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var value;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return myeval("util.printf(\"hello world\")");

              case 2:
                value = _context7.sent;
                expect(value).toEqual("hello world");

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      })));
      it("print a string with a percent", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var value;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return myeval("util.printf(\"%%s\")");

              case 2:
                value = _context8.sent;
                expect(value).toEqual("%%s");

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      })));
    });
    describe("printx", function () {
      it("should print some data according to a format", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var value;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return myeval("util.printx(\"9 (999) 999-9999\", \"aaa14159697489zzz\")");

              case 2:
                value = _context9.sent;
                expect(value).toEqual("1 (415) 969-7489");

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      })));
    });
  });
  describe("Events", function () {
    it("should trigger an event and modify the source", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var refId, data;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              refId = getId();
              data = {
                objects: {
                  field: [{
                    id: refId,
                    value: "",
                    actions: {
                      test: ["event.source.value = \"123\";"]
                    },
                    type: "text"
                  }]
                },
                appInfo: {
                  language: "en-US",
                  platform: "Linux x86_64"
                },
                calculationOrder: []
              };
              sandbox.createSandbox(data);
              _context10.next = 5;
              return sandbox.dispatchEventInSandbox({
                id: refId,
                value: "",
                name: "test",
                willCommit: true
              });

            case 5:
              expect(send_queue.has(refId)).toEqual(true);
              expect(send_queue.get(refId)).toEqual({
                id: refId,
                value: "123"
              });

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it("should trigger a Keystroke event and invalidate it", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var refId, data;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              refId = getId();
              data = {
                objects: {
                  field: [{
                    id: refId,
                    value: "",
                    actions: {
                      Keystroke: ["event.rc = false;"]
                    },
                    type: "text"
                  }]
                },
                appInfo: {
                  language: "en-US",
                  platform: "Linux x86_64"
                },
                calculationOrder: []
              };
              sandbox.createSandbox(data);
              _context11.next = 5;
              return sandbox.dispatchEventInSandbox({
                id: refId,
                value: "hell",
                name: "Keystroke",
                willCommit: false,
                change: "o",
                selStart: 4,
                selEnd: 4
              });

            case 5:
              expect(send_queue.has(refId)).toEqual(true);
              expect(send_queue.get(refId)).toEqual({
                id: refId,
                value: "hell",
                selRange: [4, 4]
              });

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it("should trigger a Keystroke event and change it", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var refId, data;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              refId = getId();
              data = {
                objects: {
                  field: [{
                    id: refId,
                    value: "",
                    actions: {
                      Keystroke: ["event.change = \"a\";"]
                    },
                    type: "text"
                  }]
                },
                appInfo: {
                  language: "en-US",
                  platform: "Linux x86_64"
                },
                calculationOrder: []
              };
              sandbox.createSandbox(data);
              _context12.next = 5;
              return sandbox.dispatchEventInSandbox({
                id: refId,
                value: "hell",
                name: "Keystroke",
                willCommit: false,
                change: "o",
                selStart: 4,
                selEnd: 4
              });

            case 5:
              expect(send_queue.has(refId)).toEqual(true);
              expect(send_queue.get(refId)).toEqual({
                id: refId,
                value: "hella"
              });

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it("should trigger an invalid commit Keystroke event", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var refId, data;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              refId = getId();
              data = {
                objects: {
                  field: [{
                    id: refId,
                    value: "",
                    actions: {
                      test: ["event.rc = false;"]
                    },
                    type: "text"
                  }]
                },
                appInfo: {
                  language: "en-US",
                  platform: "Linux x86_64"
                },
                calculationOrder: []
              };
              sandbox.createSandbox(data);
              _context13.next = 5;
              return sandbox.dispatchEventInSandbox({
                id: refId,
                value: "",
                name: "test",
                willCommit: true
              });

            case 5:
              expect(send_queue.has(refId)).toEqual(false);

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    it("should trigger a valid commit Keystroke event", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var refId1, refId2, data;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              refId1 = getId();
              refId2 = getId();
              data = {
                objects: {
                  field1: [{
                    id: refId1,
                    value: "",
                    actions: {
                      Validate: ["event.value = \"world\";"]
                    },
                    type: "text"
                  }],
                  field2: [{
                    id: refId2,
                    value: "",
                    actions: {
                      Calculate: ["event.value = \"hello\";"]
                    },
                    type: "text"
                  }]
                },
                appInfo: {
                  language: "en-US",
                  platform: "Linux x86_64"
                },
                calculationOrder: [refId2]
              };
              sandbox.createSandbox(data);
              _context14.next = 6;
              return sandbox.dispatchEventInSandbox({
                id: refId1,
                value: "hello",
                name: "Keystroke",
                willCommit: true
              });

            case 6:
              expect(send_queue.has(refId1)).toEqual(true);
              expect(send_queue.get(refId1)).toEqual({
                id: refId1,
                value: "world",
                valueAsString: "world"
              });

            case 8:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
  });
  describe("Color", function () {
    beforeAll(function () {
      sandbox.createSandbox({
        appInfo: {
          language: "en-US",
          platform: "Linux x86_64"
        },
        objects: {},
        calculationOrder: []
      });
    });

    function round(color) {
      return [color[0]].concat(_toConsumableArray(color.slice(1).map(function (x) {
        return Math.round(x * 1000) / 1000;
      })));
    }

    it("should convert RGB color for different color spaces", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var value;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return myeval("color.convert([\"RGB\", 0.1, 0.2, 0.3], \"T\")");

            case 2:
              value = _context15.sent;
              expect(round(value)).toEqual(["T"]);
              _context15.next = 6;
              return myeval("color.convert([\"RGB\", 0.1, 0.2, 0.3], \"G\")");

            case 6:
              value = _context15.sent;
              expect(round(value)).toEqual(["G", 0.181]);
              _context15.next = 10;
              return myeval("color.convert([\"RGB\", 0.1, 0.2, 0.3], \"RGB\")");

            case 10:
              value = _context15.sent;
              expect(round(value)).toEqual(["RGB", 0.1, 0.2, 0.3]);
              _context15.next = 14;
              return myeval("color.convert([\"RGB\", 0.1, 0.2, 0.3], \"CMYK\")");

            case 14:
              value = _context15.sent;
              expect(round(value)).toEqual(["CMYK", 0.9, 0.8, 0.7, 0.7]);

            case 16:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it("should convert CMYK color for different color spaces", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var value;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return myeval("color.convert([\"CMYK\", 0.1, 0.2, 0.3, 0.4], \"T\")");

            case 2:
              value = _context16.sent;
              expect(round(value)).toEqual(["T"]);
              _context16.next = 6;
              return myeval("color.convert([\"CMYK\", 0.1, 0.2, 0.3, 0.4], \"G\")");

            case 6:
              value = _context16.sent;
              expect(round(value)).toEqual(["G", 0.371]);
              _context16.next = 10;
              return myeval("color.convert([\"CMYK\", 0.1, 0.2, 0.3, 0.4], \"RGB\")");

            case 10:
              value = _context16.sent;
              expect(round(value)).toEqual(["RGB", 0.5, 0.3, 0.4]);
              _context16.next = 14;
              return myeval("color.convert([\"CMYK\", 0.1, 0.2, 0.3, 0.4], \"CMYK\")");

            case 14:
              value = _context16.sent;
              expect(round(value)).toEqual(["CMYK", 0.1, 0.2, 0.3, 0.4]);

            case 16:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    it("should convert Gray color for different color spaces", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var value;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return myeval("color.convert([\"G\", 0.1], \"T\")");

            case 2:
              value = _context17.sent;
              expect(round(value)).toEqual(["T"]);
              _context17.next = 6;
              return myeval("color.convert([\"G\", 0.1], \"G\")");

            case 6:
              value = _context17.sent;
              expect(round(value)).toEqual(["G", 0.1]);
              _context17.next = 10;
              return myeval("color.convert([\"G\", 0.1], \"RGB\")");

            case 10:
              value = _context17.sent;
              expect(round(value)).toEqual(["RGB", 0.1, 0.1, 0.1]);
              _context17.next = 14;
              return myeval("color.convert([\"G\", 0.1], \"CMYK\")");

            case 14:
              value = _context17.sent;
              expect(round(value)).toEqual(["CMYK", 0, 0, 0, 0.9]);

            case 16:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
    it("should convert Transparent color for different color spaces", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var value;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return myeval("color.convert([\"T\"], \"T\")");

            case 2:
              value = _context18.sent;
              expect(round(value)).toEqual(["T"]);
              _context18.next = 6;
              return myeval("color.convert([\"T\"], \"G\")");

            case 6:
              value = _context18.sent;
              expect(round(value)).toEqual(["G", 0]);
              _context18.next = 10;
              return myeval("color.convert([\"T\"], \"RGB\")");

            case 10:
              value = _context18.sent;
              expect(round(value)).toEqual(["RGB", 0, 0, 0]);
              _context18.next = 14;
              return myeval("color.convert([\"T\"], \"CMYK\")");

            case 14:
              value = _context18.sent;
              expect(round(value)).toEqual(["CMYK", 0, 0, 0, 1]);

            case 16:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
  });
  describe("App", function () {
    beforeAll(function () {
      sandbox.createSandbox({
        appInfo: {
          language: "en-US",
          platform: "Linux x86_64"
        },
        objects: {},
        calculationOrder: []
      });
    });
    it("should test language", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var value;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return myeval("app.language");

            case 2:
              value = _context19.sent;
              expect(value).toEqual("ENU");
              _context19.next = 6;
              return myeval("app.language = \"hello\"");

            case 6:
              value = _context19.sent;
              expect(value).toEqual("app.language is read-only");

            case 8:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    it("should test platform", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var value;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return myeval("app.platform");

            case 2:
              value = _context20.sent;
              expect(value).toEqual("UNIX");
              _context20.next = 6;
              return myeval("app.platform = \"hello\"");

            case 6:
              value = _context20.sent;
              expect(value).toEqual("app.platform is read-only");

            case 8:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
  });
  describe("AForm", function () {
    beforeAll(function () {
      sandbox.createSandbox({
        appInfo: {
          language: "en-US",
          platform: "Linux x86_64"
        },
        objects: {},
        calculationOrder: [],
        dispatchEventName: "_dispatchMe"
      });
    });
    describe("AFExtractNums", function () {
      it("should extract numbers", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
        var value;
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return myeval("AFExtractNums(\"123 456 789\")");

              case 2:
                value = _context21.sent;
                expect(value).toEqual(["123", "456", "789"]);
                _context21.next = 6;
                return myeval("AFExtractNums(\"123.456\")");

              case 6:
                value = _context21.sent;
                expect(value).toEqual(["123", "456"]);
                _context21.next = 10;
                return myeval("AFExtractNums(\"123\")");

              case 10:
                value = _context21.sent;
                expect(value).toEqual(["123"]);
                _context21.next = 14;
                return myeval("AFExtractNums(\".123\")");

              case 14:
                value = _context21.sent;
                expect(value).toEqual(["0", "123"]);
                _context21.next = 18;
                return myeval("AFExtractNums(\",123\")");

              case 18:
                value = _context21.sent;
                expect(value).toEqual(["0", "123"]);

              case 20:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      })));
    });
    describe("AFMakeNumber", function () {
      it("should convert string to number", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
        var value;
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return myeval("AFMakeNumber(\"123.456\")");

              case 2:
                value = _context22.sent;
                expect(value).toEqual(123.456);
                _context22.next = 6;
                return myeval("AFMakeNumber(123.456)");

              case 6:
                value = _context22.sent;
                expect(value).toEqual(123.456);
                _context22.next = 10;
                return myeval("AFMakeNumber(\"-123.456\")");

              case 10:
                value = _context22.sent;
                expect(value).toEqual(-123.456);
                _context22.next = 14;
                return myeval("AFMakeNumber(\"-123,456\")");

              case 14:
                value = _context22.sent;
                expect(value).toEqual(-123.456);
                _context22.next = 18;
                return myeval("AFMakeNumber(\"not a number\")");

              case 18:
                value = _context22.sent;
                expect(value).toEqual(null);

              case 20:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      })));
    });
    describe("AFMakeArrayFromList", function () {
      it("should split a string into an array of strings", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
        var value;
        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return myeval("AFMakeArrayFromList(\"aaaa,  bbbbbbb,cc,ddd, e\")");

              case 2:
                value = _context23.sent;
                expect(value).toEqual(["aaaa", " bbbbbbb", "cc", "ddd", "e"]);

              case 4:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      })));
    });
    describe("AFNumber_format", function () {
      it("should format a number", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
        var refId, data;
        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                refId = getId();
                data = {
                  objects: {
                    field: [{
                      id: refId,
                      value: "",
                      actions: {
                        test1: ["AFNumber_Format(2, 0, 0, 0, \"\u20AC\", false);" + "event.source.value = event.value;"],
                        test2: ["AFNumber_Format(1, 3, 0, 0, \"$\", true);" + "event.source.value = event.value;"],
                        test3: ["AFNumber_Format(2, 0, 1, 0, \"\u20AC\", false);" + "event.source.value = event.value;"],
                        test4: ["AFNumber_Format(2, 0, 2, 0, \"\u20AC\", false);" + "event.source.value = event.value;"],
                        test5: ["AFNumber_Format(2, 0, 3, 0, \"\u20AC\", false);" + "event.source.value = event.value;"]
                      },
                      type: "text"
                    }]
                  },
                  appInfo: {
                    language: "en-US",
                    platform: "Linux x86_64"
                  },
                  calculationOrder: [],
                  dispatchEventName: "_dispatchMe"
                };
                sandbox.createSandbox(data);
                _context24.next = 5;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "123456.789",
                  name: "test1"
                });

              case 5:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "123,456.79€"
                });
                send_queue["delete"](refId);
                _context24.next = 10;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "223456.789",
                  name: "test2"
                });

              case 10:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "$223456,8"
                });
                send_queue["delete"](refId);
                _context24.next = 15;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "-323456.789",
                  name: "test3"
                });

              case 15:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "323,456.79€",
                  textColor: ["RGB", 1, 0, 0]
                });
                send_queue["delete"](refId);
                _context24.next = 20;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "-423456.789",
                  name: "test4"
                });

              case 20:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "(423,456.79€)"
                });
                send_queue["delete"](refId);
                _context24.next = 25;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "-52345.678",
                  name: "test5"
                });

              case 25:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "(52,345.68€)",
                  textColor: ["RGB", 1, 0, 0]
                });

              case 27:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24);
      })));
    });
    describe("AFNumber_Keystroke", function () {
      it("should validate a number on a keystroke event", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
        var refId, data;
        return _regenerator["default"].wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                refId = getId();
                data = {
                  objects: {
                    field: [{
                      id: refId,
                      value: "",
                      actions: {
                        Validate: ["AFNumber_Keystroke(null, 0, null, null, null, null);"]
                      },
                      type: "text",
                      name: "MyField"
                    }]
                  },
                  appInfo: {
                    language: "en-US",
                    platform: "Linux x86_64"
                  },
                  calculationOrder: [],
                  dispatchEventName: "_dispatchMe"
                };
                sandbox.createSandbox(data);
                _context25.next = 5;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "123456.789",
                  name: "Keystroke",
                  willCommit: true
                });

              case 5:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "123456.789",
                  valueAsString: "123456.789"
                });

              case 7:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25);
      })));
      it("should not validate a number on a keystroke event", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
        var refId, data;
        return _regenerator["default"].wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                refId = getId();
                data = {
                  objects: {
                    field: [{
                      id: refId,
                      value: "",
                      actions: {
                        Validate: ["AFNumber_Keystroke(null, 0, null, null, null, null);"]
                      },
                      type: "text",
                      name: "MyField"
                    }]
                  },
                  appInfo: {
                    language: "en-US",
                    platform: "Linux x86_64"
                  },
                  calculationOrder: [],
                  dispatchEventName: "_dispatchMe"
                };
                sandbox.createSandbox(data);
                _context26.next = 5;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "123s456.789",
                  name: "Keystroke",
                  willCommit: true
                });

              case 5:
                expect(send_queue.has("alert")).toEqual(true);
                expect(send_queue.get("alert")).toEqual({
                  command: "alert",
                  value: "The value entered does not match the format of the field [ MyField ]"
                });

              case 7:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      })));
    });
    describe("AFPercent_Format", function () {
      it("should format a percentage", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
        var refId, data;
        return _regenerator["default"].wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                refId = getId();
                data = {
                  objects: {
                    field: [{
                      id: refId,
                      value: "",
                      actions: {
                        test1: ["AFPercent_Format(2, 1, false);" + "event.source.value = event.value;"],
                        test2: ["AFPercent_Format(2, 1, true);" + "event.source.value = event.value;"]
                      },
                      type: "text"
                    }]
                  },
                  appInfo: {
                    language: "en-US",
                    platform: "Linux x86_64"
                  },
                  calculationOrder: [],
                  dispatchEventName: "_dispatchMe"
                };
                sandbox.createSandbox(data);
                _context27.next = 5;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "0.456789",
                  name: "test1"
                });

              case 5:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "45.68%"
                });
                send_queue["delete"](refId);
                _context27.next = 10;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "0.456789",
                  name: "test2"
                });

              case 10:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "%45.68"
                });

              case 12:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27);
      })));
    });
    describe("AFDate_Format", function () {
      it("should format a date", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
        var refId, data;
        return _regenerator["default"].wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                refId = getId();
                data = {
                  objects: {
                    field: [{
                      id: refId,
                      value: "",
                      actions: {
                        test1: ["AFDate_Format(0);event.source.value = event.value;"],
                        test2: ["AFDate_Format(12);event.source.value = event.value;"]
                      },
                      type: "text"
                    }]
                  },
                  appInfo: {
                    language: "en-US",
                    platform: "Linux x86_64"
                  },
                  calculationOrder: [],
                  dispatchEventName: "_dispatchMe"
                };
                sandbox.createSandbox(data);
                _context28.next = 5;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "Sun Apr 15 2007 03:14:15",
                  name: "test1"
                });

              case 5:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "4/15"
                });
                send_queue["delete"](refId);
                _context28.next = 10;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "Sun Apr 15 2007 03:14:15",
                  name: "test2"
                });

              case 10:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "4/15/07 3:14 am"
                });

              case 12:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28);
      })));
    });
    describe("AFRange_Validate", function () {
      it("should validate a number in range [a, b]", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
        var refId, data;
        return _regenerator["default"].wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                refId = getId();
                data = {
                  objects: {
                    field: [{
                      id: refId,
                      value: "",
                      actions: {
                        Validate: ["AFRange_Validate(true, 123, true, 456);"]
                      },
                      type: "text"
                    }]
                  },
                  appInfo: {
                    language: "en-US",
                    platform: "Linux x86_64"
                  },
                  calculationOrder: [],
                  dispatchEventName: "_dispatchMe"
                };
                sandbox.createSandbox(data);
                _context29.next = 5;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "321",
                  name: "Keystroke",
                  willCommit: true
                });

              case 5:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "321",
                  valueAsString: "321"
                });

              case 7:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29);
      })));
      it("should invalidate a number out of range [a, b]", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
        var refId, data;
        return _regenerator["default"].wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                refId = getId();
                data = {
                  objects: {
                    field: [{
                      id: refId,
                      value: "",
                      actions: {
                        Validate: ["AFRange_Validate(true, 123, true, 456);"]
                      },
                      type: "text"
                    }]
                  },
                  appInfo: {
                    language: "en-US",
                    platform: "Linux x86_64"
                  },
                  calculationOrder: [],
                  dispatchEventName: "_dispatchMe"
                };
                sandbox.createSandbox(data);
                _context30.next = 5;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "12",
                  name: "Keystroke",
                  willCommit: true
                });

              case 5:
                expect(send_queue.has("alert")).toEqual(true);
                expect(send_queue.get("alert")).toEqual({
                  command: "alert",
                  value: "Invalid value: must be greater than or equal to 123 and less than or equal to 456."
                });

              case 7:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30);
      })));
    });
    describe("ASSimple_Calculate", function () {
      it("should compute the sum of several fields", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
        var refIds, data;
        return _regenerator["default"].wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                refIds = [0, 1, 2, 3].map(function (_) {
                  return getId();
                });
                data = {
                  objects: {
                    field1: [{
                      id: refIds[0],
                      value: "",
                      actions: {},
                      type: "text"
                    }],
                    field2: [{
                      id: refIds[1],
                      value: "",
                      actions: {},
                      type: "text"
                    }],
                    field3: [{
                      id: refIds[2],
                      value: "",
                      actions: {},
                      type: "text"
                    }],
                    field4: [{
                      id: refIds[3],
                      value: "",
                      actions: {
                        Calculate: ["AFSimple_Calculate(\"SUM\", [\"field1\", \"field2\", \"field3\"]);"]
                      },
                      type: "text"
                    }]
                  },
                  appInfo: {
                    language: "en-US",
                    platform: "Linux x86_64"
                  },
                  calculationOrder: [refIds[3]],
                  dispatchEventName: "_dispatchMe"
                };
                sandbox.createSandbox(data);
                _context31.next = 5;
                return sandbox.dispatchEventInSandbox({
                  id: refIds[0],
                  value: "1",
                  name: "Keystroke",
                  willCommit: true
                });

              case 5:
                expect(send_queue.has(refIds[3])).toEqual(true);
                expect(send_queue.get(refIds[3])).toEqual({
                  id: refIds[3],
                  value: 1,
                  valueAsString: "1"
                });
                _context31.next = 9;
                return sandbox.dispatchEventInSandbox({
                  id: refIds[1],
                  value: "2",
                  name: "Keystroke",
                  willCommit: true
                });

              case 9:
                expect(send_queue.has(refIds[3])).toEqual(true);
                expect(send_queue.get(refIds[3])).toEqual({
                  id: refIds[3],
                  value: 3,
                  valueAsString: "3"
                });
                _context31.next = 13;
                return sandbox.dispatchEventInSandbox({
                  id: refIds[2],
                  value: "3",
                  name: "Keystroke",
                  willCommit: true
                });

              case 13:
                expect(send_queue.has(refIds[3])).toEqual(true);
                expect(send_queue.get(refIds[3])).toEqual({
                  id: refIds[3],
                  value: 6,
                  valueAsString: "6"
                });

              case 15:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31);
      })));
    });
    describe("AFSpecial_KeystrokeEx", function () {
      it("should validate a phone number on a keystroke event", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
        var refId, data;
        return _regenerator["default"].wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                refId = getId();
                data = {
                  objects: {
                    field: [{
                      id: refId,
                      value: "",
                      actions: {
                        Keystroke: ["AFSpecial_KeystrokeEx(\"9AXO\");"]
                      },
                      type: "text"
                    }]
                  },
                  appInfo: {
                    language: "en-US",
                    platform: "Linux x86_64"
                  },
                  calculationOrder: [],
                  dispatchEventName: "_dispatchMe"
                };
                sandbox.createSandbox(data);
                _context32.next = 5;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "",
                  change: "3",
                  name: "Keystroke",
                  willCommit: false,
                  selStart: 0,
                  selEnd: 0
                });

              case 5:
                expect(send_queue.has(refId)).toEqual(false);
                _context32.next = 8;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "3",
                  change: "F",
                  name: "Keystroke",
                  willCommit: false,
                  selStart: 1,
                  selEnd: 1
                });

              case 8:
                expect(send_queue.has(refId)).toEqual(false);
                _context32.next = 11;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "3F",
                  change: "?",
                  name: "Keystroke",
                  willCommit: false,
                  selStart: 2,
                  selEnd: 2
                });

              case 11:
                expect(send_queue.has(refId)).toEqual(false);
                _context32.next = 14;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "3F?",
                  change: "@",
                  name: "Keystroke",
                  willCommit: false,
                  selStart: 3,
                  selEnd: 3
                });

              case 14:
                expect(send_queue.has(refId)).toEqual(true);
                expect(send_queue.get(refId)).toEqual({
                  id: refId,
                  value: "3F?",
                  selRange: [3, 3]
                });
                send_queue["delete"](refId);
                _context32.next = 19;
                return sandbox.dispatchEventInSandbox({
                  id: refId,
                  value: "3F?",
                  change: "0",
                  name: "Keystroke",
                  willCommit: true,
                  selStart: 3,
                  selEnd: 3
                });

              case 19:
                expect(send_queue.has(refId)).toEqual(false);

              case 20:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32);
      })));
    });
    describe("eMailValidate", function () {
      it("should validate an e-mail address", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
        var value;
        return _regenerator["default"].wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return myeval("eMailValidate(123)");

              case 2:
                value = _context33.sent;
                expect(value).toEqual(false);
                _context33.next = 6;
                return myeval("eMailValidate(\"foo@bar.com\")");

              case 6:
                value = _context33.sent;
                expect(value).toEqual(true);
                _context33.next = 10;
                return myeval("eMailValidate(\"foo bar\")");

              case 10:
                value = _context33.sent;
                expect(value).toEqual(false);

              case 12:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33);
      })));
    });
  });
});