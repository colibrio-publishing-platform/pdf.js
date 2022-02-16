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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFDataTransportStream = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util.js");

var _display_utils = require("./display_utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PDFDataTransportStream = /*#__PURE__*/function () {
  function PDFDataTransportStream(params, pdfDataRangeTransport) {
    var _this = this;

    _classCallCheck(this, PDFDataTransportStream);

    (0, _util.assert)(pdfDataRangeTransport, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');
    this._queuedChunks = [];
    this._progressiveDone = params.progressiveDone || false;
    this._contentDispositionFilename = params.contentDispositionFilename || null;
    var initialData = params.initialData;

    if ((initialData === null || initialData === void 0 ? void 0 : initialData.length) > 0) {
      var buffer = new Uint8Array(initialData).buffer;

      this._queuedChunks.push(buffer);
    }

    this._pdfDataRangeTransport = pdfDataRangeTransport;
    this._isStreamingSupported = !params.disableStream;
    this._isRangeSupported = !params.disableRange;
    this._contentLength = params.length;
    this._fullRequestReader = null;
    this._rangeReaders = [];

    this._pdfDataRangeTransport.addRangeListener(function (begin, chunk) {
      _this._onReceiveData({
        begin: begin,
        chunk: chunk
      });
    });

    this._pdfDataRangeTransport.addProgressListener(function (loaded, total) {
      _this._onProgress({
        loaded: loaded,
        total: total
      });
    });

    this._pdfDataRangeTransport.addProgressiveReadListener(function (chunk) {
      _this._onReceiveData({
        chunk: chunk
      });
    });

    this._pdfDataRangeTransport.addProgressiveDoneListener(function () {
      _this._onProgressiveDone();
    });

    this._pdfDataRangeTransport.transportReady();
  }

  _createClass(PDFDataTransportStream, [{
    key: "_onReceiveData",
    value: function _onReceiveData(args) {
      var buffer = new Uint8Array(args.chunk).buffer;

      if (args.begin === undefined) {
        if (this._fullRequestReader) {
          this._fullRequestReader._enqueue(buffer);
        } else {
          this._queuedChunks.push(buffer);
        }
      } else {
        var found = this._rangeReaders.some(function (rangeReader) {
          if (rangeReader._begin !== args.begin) {
            return false;
          }

          rangeReader._enqueue(buffer);

          return true;
        });

        (0, _util.assert)(found, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
      }
    }
  }, {
    key: "_progressiveDataLength",
    get: function get() {
      var _this$_fullRequestRea, _this$_fullRequestRea2;

      return (_this$_fullRequestRea = (_this$_fullRequestRea2 = this._fullRequestReader) === null || _this$_fullRequestRea2 === void 0 ? void 0 : _this$_fullRequestRea2._loaded) !== null && _this$_fullRequestRea !== void 0 ? _this$_fullRequestRea : 0;
    }
  }, {
    key: "_onProgress",
    value: function _onProgress(evt) {
      if (evt.total === undefined) {
        var firstReader = this._rangeReaders[0];

        if (firstReader !== null && firstReader !== void 0 && firstReader.onProgress) {
          firstReader.onProgress({
            loaded: evt.loaded
          });
        }
      } else {
        var fullReader = this._fullRequestReader;

        if (fullReader !== null && fullReader !== void 0 && fullReader.onProgress) {
          fullReader.onProgress({
            loaded: evt.loaded,
            total: evt.total
          });
        }
      }
    }
  }, {
    key: "_onProgressiveDone",
    value: function _onProgressiveDone() {
      if (this._fullRequestReader) {
        this._fullRequestReader.progressiveDone();
      }

      this._progressiveDone = true;
    }
  }, {
    key: "_removeRangeReader",
    value: function _removeRangeReader(reader) {
      var i = this._rangeReaders.indexOf(reader);

      if (i >= 0) {
        this._rangeReaders.splice(i, 1);
      }
    }
  }, {
    key: "getFullReader",
    value: function getFullReader() {
      (0, _util.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
      var queuedChunks = this._queuedChunks;
      this._queuedChunks = null;
      return new PDFDataTransportStreamReader(this, queuedChunks, this._progressiveDone, this._contentDispositionFilename);
    }
  }, {
    key: "getRangeReader",
    value: function getRangeReader(begin, end) {
      if (end <= this._progressiveDataLength) {
        return null;
      }

      var reader = new PDFDataTransportStreamRangeReader(this, begin, end);

      this._pdfDataRangeTransport.requestDataRange(begin, end);

      this._rangeReaders.push(reader);

      return reader;
    }
  }, {
    key: "cancelAllRequests",
    value: function cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }

      var _iterator = _createForOfIteratorHelper(this._rangeReaders.slice(0)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var reader = _step.value;
          reader.cancel(reason);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this._pdfDataRangeTransport.abort();
    }
  }]);

  return PDFDataTransportStream;
}();

exports.PDFDataTransportStream = PDFDataTransportStream;

var PDFDataTransportStreamReader = /*#__PURE__*/function () {
  function PDFDataTransportStreamReader(stream, queuedChunks) {
    var progressiveDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var contentDispositionFilename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, PDFDataTransportStreamReader);

    this._stream = stream;
    this._done = progressiveDone || false;
    this._filename = (0, _display_utils.isPdfFile)(contentDispositionFilename) ? contentDispositionFilename : null;
    this._queuedChunks = queuedChunks || [];
    this._loaded = 0;

    var _iterator2 = _createForOfIteratorHelper(this._queuedChunks),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var chunk = _step2.value;
        this._loaded += chunk.byteLength;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    this._requests = [];
    this._headersReady = Promise.resolve();
    stream._fullRequestReader = this;
    this.onProgress = null;
  }

  _createClass(PDFDataTransportStreamReader, [{
    key: "_enqueue",
    value: function _enqueue(chunk) {
      if (this._done) {
        return;
      }

      if (this._requests.length > 0) {
        var requestCapability = this._requests.shift();

        requestCapability.resolve({
          value: chunk,
          done: false
        });
      } else {
        this._queuedChunks.push(chunk);
      }

      this._loaded += chunk.byteLength;
    }
  }, {
    key: "headersReady",
    get: function get() {
      return this._headersReady;
    }
  }, {
    key: "filename",
    get: function get() {
      return this._filename;
    }
  }, {
    key: "isRangeSupported",
    get: function get() {
      return this._stream._isRangeSupported;
    }
  }, {
    key: "isStreamingSupported",
    get: function get() {
      return this._stream._isStreamingSupported;
    }
  }, {
    key: "contentLength",
    get: function get() {
      return this._stream._contentLength;
    }
  }, {
    key: "read",
    value: function () {
      var _read = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var chunk, requestCapability;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this._queuedChunks.length > 0)) {
                  _context.next = 3;
                  break;
                }

                chunk = this._queuedChunks.shift();
                return _context.abrupt("return", {
                  value: chunk,
                  done: false
                });

              case 3:
                if (!this._done) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 5:
                requestCapability = (0, _util.createPromiseCapability)();

                this._requests.push(requestCapability);

                return _context.abrupt("return", requestCapability.promise);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function read() {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      this._done = true;

      var _iterator3 = _createForOfIteratorHelper(this._requests),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var requestCapability = _step3.value;
          requestCapability.resolve({
            value: undefined,
            done: true
          });
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this._requests.length = 0;
    }
  }, {
    key: "progressiveDone",
    value: function progressiveDone() {
      if (this._done) {
        return;
      }

      this._done = true;
    }
  }]);

  return PDFDataTransportStreamReader;
}();

var PDFDataTransportStreamRangeReader = /*#__PURE__*/function () {
  function PDFDataTransportStreamRangeReader(stream, begin, end) {
    _classCallCheck(this, PDFDataTransportStreamRangeReader);

    this._stream = stream;
    this._begin = begin;
    this._end = end;
    this._queuedChunk = null;
    this._requests = [];
    this._done = false;
    this.onProgress = null;
  }

  _createClass(PDFDataTransportStreamRangeReader, [{
    key: "_enqueue",
    value: function _enqueue(chunk) {
      if (this._done) {
        return;
      }

      if (this._requests.length === 0) {
        this._queuedChunk = chunk;
      } else {
        var requestsCapability = this._requests.shift();

        requestsCapability.resolve({
          value: chunk,
          done: false
        });

        var _iterator4 = _createForOfIteratorHelper(this._requests),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var requestCapability = _step4.value;
            requestCapability.resolve({
              value: undefined,
              done: true
            });
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        this._requests.length = 0;
      }

      this._done = true;

      this._stream._removeRangeReader(this);
    }
  }, {
    key: "isStreamingSupported",
    get: function get() {
      return false;
    }
  }, {
    key: "read",
    value: function () {
      var _read2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var chunk, requestCapability;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._queuedChunk) {
                  _context2.next = 4;
                  break;
                }

                chunk = this._queuedChunk;
                this._queuedChunk = null;
                return _context2.abrupt("return", {
                  value: chunk,
                  done: false
                });

              case 4:
                if (!this._done) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 6:
                requestCapability = (0, _util.createPromiseCapability)();

                this._requests.push(requestCapability);

                return _context2.abrupt("return", requestCapability.promise);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read() {
        return _read2.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      this._done = true;

      var _iterator5 = _createForOfIteratorHelper(this._requests),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var requestCapability = _step5.value;
          requestCapability.resolve({
            value: undefined,
            done: true
          });
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this._requests.length = 0;

      this._stream._removeRangeReader(this);
    }
  }]);

  return PDFDataTransportStreamRangeReader;
}();