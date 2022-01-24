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

var _network = require("../../display/network.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("network", function () {
  var pdf1 = new URL("../pdfs/tracemonkey.pdf", window.location).href;
  var pdf1Length = 1016315;
  it("read without stream and range", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var stream, fullReader, isStreamingSupported, isRangeSupported, promise, len, count, read;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stream = new _network.PDFNetworkStream({
              url: pdf1,
              rangeChunkSize: 65536,
              disableStream: true,
              disableRange: true
            });
            fullReader = stream.getFullReader();
            promise = fullReader.headersReady.then(function () {
              isStreamingSupported = fullReader.isStreamingSupported;
              isRangeSupported = fullReader.isRangeSupported;
            });
            len = 0, count = 0;

            read = function read() {
              return fullReader.read().then(function (result) {
                if (result.done) {
                  return undefined;
                }

                count++;
                len += result.value.byteLength;
                return read();
              });
            };

            _context.next = 7;
            return Promise.all([read(), promise]);

          case 7:
            expect(len).toEqual(pdf1Length);
            expect(count).toEqual(1);
            expect(isStreamingSupported).toEqual(false);
            expect(isRangeSupported).toEqual(false);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("read custom ranges", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var rangeSize, stream, fullReader, isStreamingSupported, isRangeSupported, fullReaderCancelled, promise, tailSize, range1Reader, range2Reader, result1, result2, read;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            rangeSize = 32768;
            stream = new _network.PDFNetworkStream({
              url: pdf1,
              length: pdf1Length,
              rangeChunkSize: rangeSize,
              disableStream: true,
              disableRange: false
            });
            fullReader = stream.getFullReader();
            promise = fullReader.headersReady.then(function () {
              isStreamingSupported = fullReader.isStreamingSupported;
              isRangeSupported = fullReader.isRangeSupported;
              fullReader.cancel(new _util.AbortException("Don't need fullReader."));
              fullReaderCancelled = true;
            });
            tailSize = pdf1Length % rangeSize || rangeSize;
            range1Reader = stream.getRangeReader(pdf1Length - tailSize - rangeSize, pdf1Length - tailSize);
            range2Reader = stream.getRangeReader(pdf1Length - tailSize, pdf1Length);
            result1 = {
              value: 0
            }, result2 = {
              value: 0
            };

            read = function read(reader, lenResult) {
              return reader.read().then(function (result) {
                if (result.done) {
                  return undefined;
                }

                lenResult.value += result.value.byteLength;
                return read(reader, lenResult);
              });
            };

            _context2.next = 11;
            return Promise.all([read(range1Reader, result1), read(range2Reader, result2), promise]);

          case 11:
            expect(result1.value).toEqual(rangeSize);
            expect(result2.value).toEqual(tailSize);
            expect(isStreamingSupported).toEqual(false);
            expect(isRangeSupported).toEqual(true);
            expect(fullReaderCancelled).toEqual(true);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});