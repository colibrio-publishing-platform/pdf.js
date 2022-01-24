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

var _is_node = require("../../shared/is_node.js");

var _node_stream = require("../../display/node_stream.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

if (!_is_node.isNodeJS) {
  throw new Error('The "node_stream" unit-tests can only be run in Node.js environments.');
}

var path = require("path");

var url = require("url");

var http = require("http");

var fs = require("fs");

describe("node_stream", function () {
  var server = null;
  var port = null;
  var pdf = url.parse(encodeURI("file://" + path.join(process.cwd(), "./test/pdfs/tracemonkey.pdf"))).href;
  var pdfLength = 1016315;
  beforeAll(function () {
    server = http.createServer(function (request, response) {
      var filePath = process.cwd() + "/test/pdfs" + request.url;
      fs.lstat(filePath, function (error, stat) {
        if (error) {
          response.writeHead(404);
          response.end("File ".concat(request.url, " not found!"));
          return;
        }

        if (!request.headers.range) {
          var contentLength = stat.size;
          var stream = fs.createReadStream(filePath);
          response.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Length": contentLength,
            "Accept-Ranges": "bytes"
          });
          stream.pipe(response);
        } else {
          var _request$headers$rang = request.headers.range.split("=")[1].split("-").map(function (x) {
            return Number(x);
          }),
              _request$headers$rang2 = _slicedToArray(_request$headers$rang, 2),
              start = _request$headers$rang2[0],
              end = _request$headers$rang2[1];

          var _stream = fs.createReadStream(filePath, {
            start: start,
            end: end
          });

          response.writeHead(206, {
            "Content-Type": "application/pdf"
          });

          _stream.pipe(response);
        }
      });
    }).listen(0);
    port = server.address().port;
  });
  afterAll(function () {
    server.close();
  });
  it("read both http(s) and filesystem pdf files", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var stream1, stream2, fullReader1, fullReader2, isStreamingSupported1, isRangeSupported1, promise1, isStreamingSupported2, isRangeSupported2, promise2, len1, len2, read1, read2;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stream1 = new _node_stream.PDFNodeStream({
              url: "http://127.0.0.1:".concat(port, "/tracemonkey.pdf"),
              rangeChunkSize: 65536,
              disableStream: true,
              disableRange: true
            });
            stream2 = new _node_stream.PDFNodeStream({
              url: pdf,
              rangeChunkSize: 65536,
              disableStream: true,
              disableRange: true
            });
            fullReader1 = stream1.getFullReader();
            fullReader2 = stream2.getFullReader();
            promise1 = fullReader1.headersReady.then(function () {
              isStreamingSupported1 = fullReader1.isStreamingSupported;
              isRangeSupported1 = fullReader1.isRangeSupported;
            });
            promise2 = fullReader2.headersReady.then(function () {
              isStreamingSupported2 = fullReader2.isStreamingSupported;
              isRangeSupported2 = fullReader2.isRangeSupported;
            });
            len1 = 0, len2 = 0;

            read1 = function read1() {
              return fullReader1.read().then(function (result) {
                if (result.done) {
                  return undefined;
                }

                len1 += result.value.byteLength;
                return read1();
              });
            };

            read2 = function read2() {
              return fullReader2.read().then(function (result) {
                if (result.done) {
                  return undefined;
                }

                len2 += result.value.byteLength;
                return read2();
              });
            };

            _context.next = 11;
            return Promise.all([read1(), read2(), promise1, promise2]);

          case 11:
            expect(isStreamingSupported1).toEqual(false);
            expect(isRangeSupported1).toEqual(false);
            expect(isStreamingSupported2).toEqual(false);
            expect(isRangeSupported2).toEqual(false);
            expect(len1).toEqual(pdfLength);
            expect(len1).toEqual(len2);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("read custom ranges for both http(s) and filesystem urls", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var rangeSize, stream1, stream2, fullReader1, fullReader2, isStreamingSupported1, isRangeSupported1, fullReaderCancelled1, isStreamingSupported2, isRangeSupported2, fullReaderCancelled2, promise1, promise2, tailSize, range11Reader, range12Reader, range21Reader, range22Reader, result11, result12, result21, result22, read;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            rangeSize = 32768;
            stream1 = new _node_stream.PDFNodeStream({
              url: "http://127.0.0.1:".concat(port, "/tracemonkey.pdf"),
              length: pdfLength,
              rangeChunkSize: rangeSize,
              disableStream: true,
              disableRange: false
            });
            stream2 = new _node_stream.PDFNodeStream({
              url: pdf,
              length: pdfLength,
              rangeChunkSize: rangeSize,
              disableStream: true,
              disableRange: false
            });
            fullReader1 = stream1.getFullReader();
            fullReader2 = stream2.getFullReader();
            promise1 = fullReader1.headersReady.then(function () {
              isStreamingSupported1 = fullReader1.isStreamingSupported;
              isRangeSupported1 = fullReader1.isRangeSupported;
              fullReader1.cancel(new _util.AbortException("Don't need fullReader1."));
              fullReaderCancelled1 = true;
            });
            promise2 = fullReader2.headersReady.then(function () {
              isStreamingSupported2 = fullReader2.isStreamingSupported;
              isRangeSupported2 = fullReader2.isRangeSupported;
              fullReader2.cancel(new _util.AbortException("Don't need fullReader2."));
              fullReaderCancelled2 = true;
            });
            tailSize = pdfLength % rangeSize || rangeSize;
            range11Reader = stream1.getRangeReader(pdfLength - tailSize - rangeSize, pdfLength - tailSize);
            range12Reader = stream1.getRangeReader(pdfLength - tailSize, pdfLength);
            range21Reader = stream2.getRangeReader(pdfLength - tailSize - rangeSize, pdfLength - tailSize);
            range22Reader = stream2.getRangeReader(pdfLength - tailSize, pdfLength);
            result11 = {
              value: 0
            }, result12 = {
              value: 0
            };
            result21 = {
              value: 0
            }, result22 = {
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

            _context2.next = 17;
            return Promise.all([read(range11Reader, result11), read(range12Reader, result12), read(range21Reader, result21), read(range22Reader, result22), promise1, promise2]);

          case 17:
            expect(result11.value).toEqual(rangeSize);
            expect(result12.value).toEqual(tailSize);
            expect(result21.value).toEqual(rangeSize);
            expect(result22.value).toEqual(tailSize);
            expect(isStreamingSupported1).toEqual(false);
            expect(isRangeSupported1).toEqual(true);
            expect(fullReaderCancelled1).toEqual(true);
            expect(isStreamingSupported2).toEqual(false);
            expect(isRangeSupported2).toEqual(true);
            expect(fullReaderCancelled2).toEqual(true);

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});