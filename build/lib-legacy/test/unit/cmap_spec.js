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

var _cmap = require("../../core/cmap.js");

var _test_utils = require("./test_utils.js");

var _api = require("../../display/api.js");

var _primitives = require("../../core/primitives.js");

var _stream = require("../../core/stream.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("cmap", function () {
  var fetchBuiltInCMap;
  beforeAll(function () {
    var CMapReaderFactory = new _api.DefaultCMapReaderFactory({
      baseUrl: _test_utils.CMAP_PARAMS.cMapUrl,
      isCompressed: _test_utils.CMAP_PARAMS.cMapPacked
    });

    fetchBuiltInCMap = function fetchBuiltInCMap(name) {
      return CMapReaderFactory.fetch({
        name: name
      });
    };
  });
  afterAll(function () {
    fetchBuiltInCMap = null;
  });
  it("parses beginbfchar", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var str, stream, cmap;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            str = "2 beginbfchar\n" + "<03> <00>\n" + "<04> <01>\n" + "endbfchar\n";
            stream = new _stream.StringStream(str);
            _context.next = 4;
            return _cmap.CMapFactory.create({
              encoding: stream
            });

          case 4:
            cmap = _context.sent;
            expect(cmap.lookup(0x03)).toEqual(String.fromCharCode(0x00));
            expect(cmap.lookup(0x04)).toEqual(String.fromCharCode(0x01));
            expect(cmap.lookup(0x05)).toBeUndefined();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("parses beginbfrange with range", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var str, stream, cmap;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            str = "1 beginbfrange\n" + "<06> <0B> 0\n" + "endbfrange\n";
            stream = new _stream.StringStream(str);
            _context2.next = 4;
            return _cmap.CMapFactory.create({
              encoding: stream
            });

          case 4:
            cmap = _context2.sent;
            expect(cmap.lookup(0x05)).toBeUndefined();
            expect(cmap.lookup(0x06)).toEqual(String.fromCharCode(0x00));
            expect(cmap.lookup(0x0b)).toEqual(String.fromCharCode(0x05));
            expect(cmap.lookup(0x0c)).toBeUndefined();

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("parses beginbfrange with array", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var str, stream, cmap;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            str = "1 beginbfrange\n" + "<0D> <12> [ 0 1 2 3 4 5 ]\n" + "endbfrange\n";
            stream = new _stream.StringStream(str);
            _context3.next = 4;
            return _cmap.CMapFactory.create({
              encoding: stream
            });

          case 4:
            cmap = _context3.sent;
            expect(cmap.lookup(0x0c)).toBeUndefined();
            expect(cmap.lookup(0x0d)).toEqual(0x00);
            expect(cmap.lookup(0x12)).toEqual(0x05);
            expect(cmap.lookup(0x13)).toBeUndefined();

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it("parses begincidchar", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var str, stream, cmap;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            str = "1 begincidchar\n" + "<14> 0\n" + "endcidchar\n";
            stream = new _stream.StringStream(str);
            _context4.next = 4;
            return _cmap.CMapFactory.create({
              encoding: stream
            });

          case 4:
            cmap = _context4.sent;
            expect(cmap.lookup(0x14)).toEqual(0x00);
            expect(cmap.lookup(0x15)).toBeUndefined();

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it("parses begincidrange", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var str, stream, cmap;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            str = "1 begincidrange\n" + "<0016> <001B>   0\n" + "endcidrange\n";
            stream = new _stream.StringStream(str);
            _context5.next = 4;
            return _cmap.CMapFactory.create({
              encoding: stream
            });

          case 4:
            cmap = _context5.sent;
            expect(cmap.lookup(0x15)).toBeUndefined();
            expect(cmap.lookup(0x16)).toEqual(0x00);
            expect(cmap.lookup(0x1b)).toEqual(0x05);
            expect(cmap.lookup(0x1c)).toBeUndefined();

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it("decodes codespace ranges", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var str, stream, cmap, c;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            str = "1 begincodespacerange\n" + "<01> <02>\n" + "<00000003> <00000004>\n" + "endcodespacerange\n";
            stream = new _stream.StringStream(str);
            _context6.next = 4;
            return _cmap.CMapFactory.create({
              encoding: stream
            });

          case 4:
            cmap = _context6.sent;
            c = {};
            cmap.readCharCode(String.fromCharCode(1), 0, c);
            expect(c.charcode).toEqual(1);
            expect(c.length).toEqual(1);
            cmap.readCharCode(String.fromCharCode(0, 0, 0, 3), 0, c);
            expect(c.charcode).toEqual(3);
            expect(c.length).toEqual(4);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it("decodes 4 byte codespace ranges", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var str, stream, cmap, c;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            str = "1 begincodespacerange\n" + "<8EA1A1A1> <8EA1FEFE>\n" + "endcodespacerange\n";
            stream = new _stream.StringStream(str);
            _context7.next = 4;
            return _cmap.CMapFactory.create({
              encoding: stream
            });

          case 4:
            cmap = _context7.sent;
            c = {};
            cmap.readCharCode(String.fromCharCode(0x8e, 0xa1, 0xa1, 0xa1), 0, c);
            expect(c.charcode).toEqual(0x8ea1a1a1);
            expect(c.length).toEqual(4);

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it("read usecmap", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var str, stream, cmap;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            str = "/Adobe-Japan1-1 usecmap\n";
            stream = new _stream.StringStream(str);
            _context8.next = 4;
            return _cmap.CMapFactory.create({
              encoding: stream,
              fetchBuiltInCMap: fetchBuiltInCMap,
              useCMap: null
            });

          case 4:
            cmap = _context8.sent;
            expect(cmap instanceof _cmap.CMap).toEqual(true);
            expect(cmap.useCMap).not.toBeNull();
            expect(cmap.builtInCMap).toBeFalsy();
            expect(cmap.length).toEqual(0x20a7);
            expect(cmap.isIdentityCMap).toEqual(false);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it("parses cmapname", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var str, stream, cmap;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            str = "/CMapName /Identity-H def\n";
            stream = new _stream.StringStream(str);
            _context9.next = 4;
            return _cmap.CMapFactory.create({
              encoding: stream
            });

          case 4:
            cmap = _context9.sent;
            expect(cmap.name).toEqual("Identity-H");

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it("parses wmode", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var str, stream, cmap;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            str = "/WMode 1 def\n";
            stream = new _stream.StringStream(str);
            _context10.next = 4;
            return _cmap.CMapFactory.create({
              encoding: stream
            });

          case 4:
            cmap = _context10.sent;
            expect(cmap.vertical).toEqual(true);

          case 6:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it("loads built in cmap", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var cmap;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _cmap.CMapFactory.create({
              encoding: _primitives.Name.get("Adobe-Japan1-1"),
              fetchBuiltInCMap: fetchBuiltInCMap,
              useCMap: null
            });

          case 2:
            cmap = _context11.sent;
            expect(cmap instanceof _cmap.CMap).toEqual(true);
            expect(cmap.useCMap).toBeNull();
            expect(cmap.builtInCMap).toBeTruthy();
            expect(cmap.length).toEqual(0x20a7);
            expect(cmap.isIdentityCMap).toEqual(false);

          case 8:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it("loads built in identity cmap", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    var cmap;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _cmap.CMapFactory.create({
              encoding: _primitives.Name.get("Identity-H"),
              fetchBuiltInCMap: fetchBuiltInCMap,
              useCMap: null
            });

          case 2:
            cmap = _context12.sent;
            expect(cmap instanceof _cmap.IdentityCMap).toEqual(true);
            expect(cmap.vertical).toEqual(false);
            expect(cmap.length).toEqual(0x10000);
            expect(function () {
              return cmap.isIdentityCMap;
            }).toThrow(new Error("should not access .isIdentityCMap"));

          case 7:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it("attempts to load a non-existent built-in CMap", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _cmap.CMapFactory.create({
              encoding: _primitives.Name.get("null"),
              fetchBuiltInCMap: fetchBuiltInCMap,
              useCMap: null
            });

          case 3:
            expect(false).toEqual(true);
            _context13.next = 10;
            break;

          case 6:
            _context13.prev = 6;
            _context13.t0 = _context13["catch"](0);
            expect(_context13.t0 instanceof Error).toEqual(true);
            expect(_context13.t0.message).toEqual("Unknown CMap name: null");

          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 6]]);
  })));
  it("attempts to load a built-in CMap without the necessary API parameters", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
    var tmpFetchBuiltInCMap;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            tmpFetchBuiltInCMap = function _tmpFetchBuiltInCMap(name) {
              var CMapReaderFactory = new _api.DefaultCMapReaderFactory({});
              return CMapReaderFactory.fetch({
                name: name
              });
            };

            _context14.prev = 1;
            _context14.next = 4;
            return _cmap.CMapFactory.create({
              encoding: _primitives.Name.get("Adobe-Japan1-1"),
              fetchBuiltInCMap: tmpFetchBuiltInCMap,
              useCMap: null
            });

          case 4:
            expect(false).toEqual(true);
            _context14.next = 11;
            break;

          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](1);
            expect(_context14.t0 instanceof Error).toEqual(true);
            expect(_context14.t0.message).toEqual('The CMap "baseUrl" parameter must be specified, ensure that ' + 'the "cMapUrl" and "cMapPacked" API parameters are provided.');

          case 11:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[1, 7]]);
  })));
  it("attempts to load a built-in CMap with inconsistent API parameters", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
    var tmpFetchBuiltInCMap, message;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            tmpFetchBuiltInCMap = function _tmpFetchBuiltInCMap2(name) {
              var CMapReaderFactory = new _api.DefaultCMapReaderFactory({
                baseUrl: _test_utils.CMAP_PARAMS.cMapUrl,
                isCompressed: false
              });
              return CMapReaderFactory.fetch({
                name: name
              });
            };

            _context15.prev = 1;
            _context15.next = 4;
            return _cmap.CMapFactory.create({
              encoding: _primitives.Name.get("Adobe-Japan1-1"),
              fetchBuiltInCMap: tmpFetchBuiltInCMap,
              useCMap: null
            });

          case 4:
            expect(false).toEqual(true);
            _context15.next = 13;
            break;

          case 7:
            _context15.prev = 7;
            _context15.t0 = _context15["catch"](1);
            expect(_context15.t0 instanceof Error).toEqual(true);
            message = _context15.t0.message;
            expect(message.startsWith("Unable to load CMap at: ")).toEqual(true);
            expect(message.endsWith("/external/bcmaps/Adobe-Japan1-1")).toEqual(true);

          case 13:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[1, 7]]);
  })));
});