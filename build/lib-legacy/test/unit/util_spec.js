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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

describe("util", function () {
  describe("bytesToString", function () {
    it("handles non-array arguments", function () {
      expect(function () {
        (0, _util.bytesToString)(null);
      }).toThrow(new Error("Invalid argument for bytesToString"));
    });
    it("handles array arguments with a length not exceeding the maximum", function () {
      expect((0, _util.bytesToString)(new Uint8Array([]))).toEqual("");
      expect((0, _util.bytesToString)(new Uint8Array([102, 111, 111]))).toEqual("foo");
    });
    it("handles array arguments with a length exceeding the maximum", function () {
      var length = 10000;
      var bytes = new Uint8Array(length);

      for (var i = 0; i < length; i++) {
        bytes[i] = "a".charCodeAt(0);
      }

      var string = Array(length + 1).join("a");
      expect((0, _util.bytesToString)(bytes)).toEqual(string);
    });
  });
  describe("isArrayBuffer", function () {
    it("handles array buffer values", function () {
      expect((0, _util.isArrayBuffer)(new ArrayBuffer(0))).toEqual(true);
      expect((0, _util.isArrayBuffer)(new Uint8Array(0))).toEqual(true);
    });
    it("handles non-array buffer values", function () {
      expect((0, _util.isArrayBuffer)("true")).toEqual(false);
      expect((0, _util.isArrayBuffer)(1)).toEqual(false);
      expect((0, _util.isArrayBuffer)(null)).toEqual(false);
      expect((0, _util.isArrayBuffer)(undefined)).toEqual(false);
    });
  });
  describe("isBool", function () {
    it("handles boolean values", function () {
      expect((0, _util.isBool)(true)).toEqual(true);
      expect((0, _util.isBool)(false)).toEqual(true);
    });
    it("handles non-boolean values", function () {
      expect((0, _util.isBool)("true")).toEqual(false);
      expect((0, _util.isBool)("false")).toEqual(false);
      expect((0, _util.isBool)(1)).toEqual(false);
      expect((0, _util.isBool)(0)).toEqual(false);
      expect((0, _util.isBool)(null)).toEqual(false);
      expect((0, _util.isBool)(undefined)).toEqual(false);
    });
  });
  describe("isNum", function () {
    it("handles numeric values", function () {
      expect((0, _util.isNum)(1)).toEqual(true);
      expect((0, _util.isNum)(0)).toEqual(true);
      expect((0, _util.isNum)(-1)).toEqual(true);
      expect((0, _util.isNum)(1000000000000000000)).toEqual(true);
      expect((0, _util.isNum)(12.34)).toEqual(true);
    });
    it("handles non-numeric values", function () {
      expect((0, _util.isNum)("true")).toEqual(false);
      expect((0, _util.isNum)(true)).toEqual(false);
      expect((0, _util.isNum)(null)).toEqual(false);
      expect((0, _util.isNum)(undefined)).toEqual(false);
    });
  });
  describe("isString", function () {
    it("handles string values", function () {
      expect((0, _util.isString)("foo")).toEqual(true);
      expect((0, _util.isString)("")).toEqual(true);
    });
    it("handles non-string values", function () {
      expect((0, _util.isString)(true)).toEqual(false);
      expect((0, _util.isString)(1)).toEqual(false);
      expect((0, _util.isString)(null)).toEqual(false);
      expect((0, _util.isString)(undefined)).toEqual(false);
    });
  });
  describe("string32", function () {
    it("converts unsigned 32-bit integers to strings", function () {
      expect((0, _util.string32)(0x74727565)).toEqual("true");
      expect((0, _util.string32)(0x74797031)).toEqual("typ1");
      expect((0, _util.string32)(0x4f54544f)).toEqual("OTTO");
    });
  });
  describe("stringToBytes", function () {
    it("handles non-string arguments", function () {
      expect(function () {
        (0, _util.stringToBytes)(null);
      }).toThrow(new Error("Invalid argument for stringToBytes"));
    });
    it("handles string arguments", function () {
      expect((0, _util.stringToBytes)("")).toEqual(new Uint8Array([]));
      expect((0, _util.stringToBytes)("foo")).toEqual(new Uint8Array([102, 111, 111]));
    });
  });
  describe("stringToPDFString", function () {
    it("handles ISO Latin 1 strings", function () {
      var str = "\x8Dstring\x8E";
      expect((0, _util.stringToPDFString)(str)).toEqual("\u201Cstring\u201D");
    });
    it("handles UTF-16 big-endian strings", function () {
      var str = "\xFE\xFF\x00\x73\x00\x74\x00\x72\x00\x69\x00\x6E\x00\x67";
      expect((0, _util.stringToPDFString)(str)).toEqual("string");
    });
    it("handles UTF-16 little-endian strings", function () {
      var str = "\xFF\xFE\x73\x00\x74\x00\x72\x00\x69\x00\x6E\x00\x67\x00";
      expect((0, _util.stringToPDFString)(str)).toEqual("string");
    });
    it("handles empty strings", function () {
      var str1 = "";
      expect((0, _util.stringToPDFString)(str1)).toEqual("");
      var str2 = "\xFE\xFF";
      expect((0, _util.stringToPDFString)(str2)).toEqual("");
      var str3 = "\xFF\xFE";
      expect((0, _util.stringToPDFString)(str3)).toEqual("");
    });
  });
  describe("removeNullCharacters", function () {
    it("should not modify string without null characters", function () {
      var str = "string without null chars";
      expect((0, _util.removeNullCharacters)(str)).toEqual("string without null chars");
    });
    it("should modify string with null characters", function () {
      var str = "string\x00With\x00Null\x00Chars";
      expect((0, _util.removeNullCharacters)(str)).toEqual("stringWithNullChars");
    });
    it("should modify string with non-displayable characters", function () {
      var str = Array.from(Array(32).keys()).map(function (x) {
        return String.fromCharCode(x) + "a";
      }).join("");
      var expected = "a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a";
      expect((0, _util.removeNullCharacters)(str, true)).toEqual(expected);
    });
  });
  describe("ReadableStream", function () {
    it("should return an Object", function () {
      var readable = new ReadableStream();
      expect(_typeof(readable)).toEqual("object");
    });
    it("should have property getReader", function () {
      var readable = new ReadableStream();
      expect(_typeof(readable.getReader)).toEqual("function");
    });
  });
  describe("URL", function () {
    it("should return an Object", function () {
      var url = new URL("https://example.com");
      expect(_typeof(url)).toEqual("object");
    });
    it("should have property `href`", function () {
      var url = new URL("https://example.com");
      expect(_typeof(url.href)).toEqual("string");
    });
  });
  describe("isSameOrigin", function () {
    it("handles invalid base URLs", function () {
      expect((0, _util.isSameOrigin)("/foo", "/bar")).toEqual(false);
      expect((0, _util.isSameOrigin)("blob:foo", "/bar")).toEqual(false);
    });
    it("correctly checks if the origin of both URLs matches", function () {
      expect((0, _util.isSameOrigin)("https://www.mozilla.org/foo", "https://www.mozilla.org/bar")).toEqual(true);
      expect((0, _util.isSameOrigin)("https://www.mozilla.org/foo", "https://www.example.com/bar")).toEqual(false);
    });
  });
  describe("createValidAbsoluteUrl", function () {
    it("handles invalid URLs", function () {
      expect((0, _util.createValidAbsoluteUrl)(undefined, undefined)).toEqual(null);
      expect((0, _util.createValidAbsoluteUrl)(null, null)).toEqual(null);
      expect((0, _util.createValidAbsoluteUrl)("/foo", "/bar")).toEqual(null);
    });
    it("handles URLs that do not use an allowed protocol", function () {
      expect((0, _util.createValidAbsoluteUrl)("magnet:?foo", null)).toEqual(null);
    });
    it("correctly creates a valid URL for allowed protocols", function () {
      expect((0, _util.createValidAbsoluteUrl)("http://www.mozilla.org/foo", null)).toEqual(new URL("http://www.mozilla.org/foo"));
      expect((0, _util.createValidAbsoluteUrl)("/foo", "http://www.mozilla.org")).toEqual(new URL("http://www.mozilla.org/foo"));
      expect((0, _util.createValidAbsoluteUrl)("https://www.mozilla.org/foo", null)).toEqual(new URL("https://www.mozilla.org/foo"));
      expect((0, _util.createValidAbsoluteUrl)("/foo", "https://www.mozilla.org")).toEqual(new URL("https://www.mozilla.org/foo"));
      expect((0, _util.createValidAbsoluteUrl)("ftp://www.mozilla.org/foo", null)).toEqual(new URL("ftp://www.mozilla.org/foo"));
      expect((0, _util.createValidAbsoluteUrl)("/foo", "ftp://www.mozilla.org")).toEqual(new URL("ftp://www.mozilla.org/foo"));
      expect((0, _util.createValidAbsoluteUrl)("mailto:foo@bar.baz", null)).toEqual(new URL("mailto:foo@bar.baz"));
      expect((0, _util.createValidAbsoluteUrl)("/foo", "mailto:foo@bar.baz")).toEqual(null);
      expect((0, _util.createValidAbsoluteUrl)("tel:+0123456789", null)).toEqual(new URL("tel:+0123456789"));
      expect((0, _util.createValidAbsoluteUrl)("/foo", "tel:0123456789")).toEqual(null);
    });
  });
  describe("createPromiseCapability", function () {
    it("should resolve with correct data", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var promiseCapability, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              promiseCapability = (0, _util.createPromiseCapability)();
              expect(promiseCapability.settled).toEqual(false);
              promiseCapability.resolve({
                test: "abc"
              });
              _context.next = 5;
              return promiseCapability.promise;

            case 5:
              data = _context.sent;
              expect(promiseCapability.settled).toEqual(true);
              expect(data).toEqual({
                test: "abc"
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it("should reject with correct reason", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var promiseCapability;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              promiseCapability = (0, _util.createPromiseCapability)();
              expect(promiseCapability.settled).toEqual(false);
              promiseCapability.reject(new Error("reason"));
              _context2.prev = 3;
              _context2.next = 6;
              return promiseCapability.promise;

            case 6:
              expect(false).toEqual(true);
              _context2.next = 14;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](3);
              expect(promiseCapability.settled).toEqual(true);
              expect(_context2.t0 instanceof Error).toEqual(true);
              expect(_context2.t0.message).toEqual("reason");

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 9]]);
    })));
  });
  describe("escapeString", function () {
    it("should escape (, ), \\n, \\r, and \\", function () {
      expect((0, _util.escapeString)("((a\\a))\n(b(b\\b)\rb)")).toEqual("\\(\\(a\\\\a\\)\\)\\n\\(b\\(b\\\\b\\)\\rb\\)");
    });
  });
  describe("getModificationDate", function () {
    it("should get a correctly formatted date", function () {
      var date = new Date(Date.UTC(3141, 5, 9, 2, 6, 53));
      expect((0, _util.getModificationDate)(date)).toEqual("31410609020653");
    });
  });
  describe("isAscii", function () {
    it("handles ascii/non-ascii strings", function () {
      expect((0, _util.isAscii)("hello world")).toEqual(true);
      expect((0, _util.isAscii)("こんにちは世界の")).toEqual(false);
      expect((0, _util.isAscii)("hello world in Japanese is こんにちは世界の")).toEqual(false);
    });
  });
  describe("stringToUTF16BEString", function () {
    it("should encode a string in UTF16BE with a BOM", function () {
      expect((0, _util.stringToUTF16BEString)("hello world")).toEqual("\xfe\xff\0h\0e\0l\0l\0o\0 \0w\0o\0r\0l\0d");
      expect((0, _util.stringToUTF16BEString)("こんにちは世界の")).toEqual("\xfe\xff\x30\x53\x30\x93\x30\x6b\x30\x61" + "\x30\x6f\x4e\x16\x75\x4c\x30\x6e");
    });
  });
});