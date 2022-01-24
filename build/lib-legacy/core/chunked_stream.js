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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChunkedStreamManager = exports.ChunkedStream = void 0;

var _util = require("../shared/util.js");

var _core_utils = require("./core_utils.js");

var _stream = require("./stream.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ChunkedStream = /*#__PURE__*/function (_Stream) {
  _inherits(ChunkedStream, _Stream);

  var _super = _createSuper(ChunkedStream);

  function ChunkedStream(length, chunkSize, manager) {
    var _this;

    _classCallCheck(this, ChunkedStream);

    _this = _super.call(this, new Uint8Array(length), 0, length, null);
    _this.chunkSize = chunkSize;
    _this._loadedChunks = new Set();
    _this.numChunks = Math.ceil(length / chunkSize);
    _this.manager = manager;
    _this.progressiveDataLength = 0;
    _this.lastSuccessfulEnsureByteChunk = -1;
    return _this;
  }

  _createClass(ChunkedStream, [{
    key: "getMissingChunks",
    value: function getMissingChunks() {
      var chunks = [];

      for (var chunk = 0, n = this.numChunks; chunk < n; ++chunk) {
        if (!this._loadedChunks.has(chunk)) {
          chunks.push(chunk);
        }
      }

      return chunks;
    }
  }, {
    key: "numChunksLoaded",
    get: function get() {
      return this._loadedChunks.size;
    }
  }, {
    key: "isDataLoaded",
    get: function get() {
      return this.numChunksLoaded === this.numChunks;
    }
  }, {
    key: "onReceiveData",
    value: function onReceiveData(begin, chunk) {
      var chunkSize = this.chunkSize;

      if (begin % chunkSize !== 0) {
        throw new Error("Bad begin offset: ".concat(begin));
      }

      var end = begin + chunk.byteLength;

      if (end % chunkSize !== 0 && end !== this.bytes.length) {
        throw new Error("Bad end offset: ".concat(end));
      }

      this.bytes.set(new Uint8Array(chunk), begin);
      var beginChunk = Math.floor(begin / chunkSize);
      var endChunk = Math.floor((end - 1) / chunkSize) + 1;

      for (var curChunk = beginChunk; curChunk < endChunk; ++curChunk) {
        this._loadedChunks.add(curChunk);
      }
    }
  }, {
    key: "onReceiveProgressiveData",
    value: function onReceiveProgressiveData(data) {
      var position = this.progressiveDataLength;
      var beginChunk = Math.floor(position / this.chunkSize);
      this.bytes.set(new Uint8Array(data), position);
      position += data.byteLength;
      this.progressiveDataLength = position;
      var endChunk = position >= this.end ? this.numChunks : Math.floor(position / this.chunkSize);

      for (var curChunk = beginChunk; curChunk < endChunk; ++curChunk) {
        this._loadedChunks.add(curChunk);
      }
    }
  }, {
    key: "ensureByte",
    value: function ensureByte(pos) {
      if (pos < this.progressiveDataLength) {
        return;
      }

      var chunk = Math.floor(pos / this.chunkSize);

      if (chunk > this.numChunks) {
        return;
      }

      if (chunk === this.lastSuccessfulEnsureByteChunk) {
        return;
      }

      if (!this._loadedChunks.has(chunk)) {
        throw new _core_utils.MissingDataException(pos, pos + 1);
      }

      this.lastSuccessfulEnsureByteChunk = chunk;
    }
  }, {
    key: "ensureRange",
    value: function ensureRange(begin, end) {
      if (begin >= end) {
        return;
      }

      if (end <= this.progressiveDataLength) {
        return;
      }

      var beginChunk = Math.floor(begin / this.chunkSize);

      if (beginChunk > this.numChunks) {
        return;
      }

      var endChunk = Math.min(Math.floor((end - 1) / this.chunkSize) + 1, this.numChunks);

      for (var chunk = beginChunk; chunk < endChunk; ++chunk) {
        if (!this._loadedChunks.has(chunk)) {
          throw new _core_utils.MissingDataException(begin, end);
        }
      }
    }
  }, {
    key: "nextEmptyChunk",
    value: function nextEmptyChunk(beginChunk) {
      var numChunks = this.numChunks;

      for (var i = 0; i < numChunks; ++i) {
        var chunk = (beginChunk + i) % numChunks;

        if (!this._loadedChunks.has(chunk)) {
          return chunk;
        }
      }

      return null;
    }
  }, {
    key: "hasChunk",
    value: function hasChunk(chunk) {
      return this._loadedChunks.has(chunk);
    }
  }, {
    key: "getByte",
    value: function getByte() {
      var pos = this.pos;

      if (pos >= this.end) {
        return -1;
      }

      if (pos >= this.progressiveDataLength) {
        this.ensureByte(pos);
      }

      return this.bytes[this.pos++];
    }
  }, {
    key: "getBytes",
    value: function getBytes(length) {
      var forceClamped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var bytes = this.bytes;
      var pos = this.pos;
      var strEnd = this.end;

      if (!length) {
        if (strEnd > this.progressiveDataLength) {
          this.ensureRange(pos, strEnd);
        }

        var _subarray = bytes.subarray(pos, strEnd);

        return forceClamped ? new Uint8ClampedArray(_subarray) : _subarray;
      }

      var end = pos + length;

      if (end > strEnd) {
        end = strEnd;
      }

      if (end > this.progressiveDataLength) {
        this.ensureRange(pos, end);
      }

      this.pos = end;
      var subarray = bytes.subarray(pos, end);
      return forceClamped ? new Uint8ClampedArray(subarray) : subarray;
    }
  }, {
    key: "getByteRange",
    value: function getByteRange(begin, end) {
      if (begin < 0) {
        begin = 0;
      }

      if (end > this.end) {
        end = this.end;
      }

      if (end > this.progressiveDataLength) {
        this.ensureRange(begin, end);
      }

      return this.bytes.subarray(begin, end);
    }
  }, {
    key: "makeSubStream",
    value: function makeSubStream(start, length) {
      var dict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (length) {
        if (start + length > this.progressiveDataLength) {
          this.ensureRange(start, start + length);
        }
      } else {
        if (start >= this.progressiveDataLength) {
          this.ensureByte(start);
        }
      }

      function ChunkedStreamSubstream() {}

      ChunkedStreamSubstream.prototype = Object.create(this);

      ChunkedStreamSubstream.prototype.getMissingChunks = function () {
        var chunkSize = this.chunkSize;
        var beginChunk = Math.floor(this.start / chunkSize);
        var endChunk = Math.floor((this.end - 1) / chunkSize) + 1;
        var missingChunks = [];

        for (var chunk = beginChunk; chunk < endChunk; ++chunk) {
          if (!this._loadedChunks.has(chunk)) {
            missingChunks.push(chunk);
          }
        }

        return missingChunks;
      };

      Object.defineProperty(ChunkedStreamSubstream.prototype, "isDataLoaded", {
        get: function get() {
          if (this.numChunksLoaded === this.numChunks) {
            return true;
          }

          return this.getMissingChunks().length === 0;
        },
        configurable: true
      });
      var subStream = new ChunkedStreamSubstream();
      subStream.pos = subStream.start = start;
      subStream.end = start + length || this.end;
      subStream.dict = dict;
      return subStream;
    }
  }, {
    key: "getBaseStreams",
    value: function getBaseStreams() {
      return [this];
    }
  }]);

  return ChunkedStream;
}(_stream.Stream);

exports.ChunkedStream = ChunkedStream;

var ChunkedStreamManager = /*#__PURE__*/function () {
  function ChunkedStreamManager(pdfNetworkStream, args) {
    _classCallCheck(this, ChunkedStreamManager);

    this.length = args.length;
    this.chunkSize = args.rangeChunkSize;
    this.stream = new ChunkedStream(this.length, this.chunkSize, this);
    this.pdfNetworkStream = pdfNetworkStream;
    this.disableAutoFetch = args.disableAutoFetch;
    this.msgHandler = args.msgHandler;
    this.currRequestId = 0;
    this._chunksNeededByRequest = new Map();
    this._requestsByChunk = new Map();
    this._promisesByRequest = new Map();
    this.progressiveDataLength = 0;
    this.aborted = false;
    this._loadedStreamCapability = (0, _util.createPromiseCapability)();
  }

  _createClass(ChunkedStreamManager, [{
    key: "onLoadedStream",
    value: function onLoadedStream() {
      return this._loadedStreamCapability.promise;
    }
  }, {
    key: "sendRequest",
    value: function sendRequest(begin, end) {
      var _this2 = this;

      var rangeReader = this.pdfNetworkStream.getRangeReader(begin, end);

      if (!rangeReader.isStreamingSupported) {
        rangeReader.onProgress = this.onProgress.bind(this);
      }

      var chunks = [],
          loaded = 0;
      return new Promise(function (resolve, reject) {
        var readChunk = function readChunk(chunk) {
          try {
            if (!chunk.done) {
              var data = chunk.value;
              chunks.push(data);
              loaded += (0, _util.arrayByteLength)(data);

              if (rangeReader.isStreamingSupported) {
                _this2.onProgress({
                  loaded: loaded
                });
              }

              rangeReader.read().then(readChunk, reject);
              return;
            }

            var chunkData = (0, _util.arraysToBytes)(chunks);
            chunks = null;
            resolve(chunkData);
          } catch (e) {
            reject(e);
          }
        };

        rangeReader.read().then(readChunk, reject);
      }).then(function (data) {
        if (_this2.aborted) {
          return;
        }

        _this2.onReceiveData({
          chunk: data,
          begin: begin
        });
      });
    }
  }, {
    key: "requestAllChunks",
    value: function requestAllChunks() {
      var missingChunks = this.stream.getMissingChunks();

      this._requestChunks(missingChunks);

      return this._loadedStreamCapability.promise;
    }
  }, {
    key: "_requestChunks",
    value: function _requestChunks(chunks) {
      var _this3 = this;

      var requestId = this.currRequestId++;
      var chunksNeeded = new Set();

      this._chunksNeededByRequest.set(requestId, chunksNeeded);

      var _iterator = _createForOfIteratorHelper(chunks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var chunk = _step.value;

          if (!this.stream.hasChunk(chunk)) {
            chunksNeeded.add(chunk);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (chunksNeeded.size === 0) {
        return Promise.resolve();
      }

      var capability = (0, _util.createPromiseCapability)();

      this._promisesByRequest.set(requestId, capability);

      var chunksToRequest = [];

      var _iterator2 = _createForOfIteratorHelper(chunksNeeded),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _chunk = _step2.value;

          var requestIds = this._requestsByChunk.get(_chunk);

          if (!requestIds) {
            requestIds = [];

            this._requestsByChunk.set(_chunk, requestIds);

            chunksToRequest.push(_chunk);
          }

          requestIds.push(requestId);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (chunksToRequest.length > 0) {
        var groupedChunksToRequest = this.groupChunks(chunksToRequest);

        var _iterator3 = _createForOfIteratorHelper(groupedChunksToRequest),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var groupedChunk = _step3.value;
            var begin = groupedChunk.beginChunk * this.chunkSize;
            var end = Math.min(groupedChunk.endChunk * this.chunkSize, this.length);
            this.sendRequest(begin, end)["catch"](capability.reject);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      return capability.promise["catch"](function (reason) {
        if (_this3.aborted) {
          return;
        }

        throw reason;
      });
    }
  }, {
    key: "getStream",
    value: function getStream() {
      return this.stream;
    }
  }, {
    key: "requestRange",
    value: function requestRange(begin, end) {
      end = Math.min(end, this.length);
      var beginChunk = this.getBeginChunk(begin);
      var endChunk = this.getEndChunk(end);
      var chunks = [];

      for (var chunk = beginChunk; chunk < endChunk; ++chunk) {
        chunks.push(chunk);
      }

      return this._requestChunks(chunks);
    }
  }, {
    key: "requestRanges",
    value: function requestRanges() {
      var ranges = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var chunksToRequest = [];

      var _iterator4 = _createForOfIteratorHelper(ranges),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var range = _step4.value;
          var beginChunk = this.getBeginChunk(range.begin);
          var endChunk = this.getEndChunk(range.end);

          for (var chunk = beginChunk; chunk < endChunk; ++chunk) {
            if (!chunksToRequest.includes(chunk)) {
              chunksToRequest.push(chunk);
            }
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      chunksToRequest.sort(function (a, b) {
        return a - b;
      });
      return this._requestChunks(chunksToRequest);
    }
  }, {
    key: "groupChunks",
    value: function groupChunks(chunks) {
      var groupedChunks = [];
      var beginChunk = -1;
      var prevChunk = -1;

      for (var i = 0, ii = chunks.length; i < ii; ++i) {
        var chunk = chunks[i];

        if (beginChunk < 0) {
          beginChunk = chunk;
        }

        if (prevChunk >= 0 && prevChunk + 1 !== chunk) {
          groupedChunks.push({
            beginChunk: beginChunk,
            endChunk: prevChunk + 1
          });
          beginChunk = chunk;
        }

        if (i + 1 === chunks.length) {
          groupedChunks.push({
            beginChunk: beginChunk,
            endChunk: chunk + 1
          });
        }

        prevChunk = chunk;
      }

      return groupedChunks;
    }
  }, {
    key: "onProgress",
    value: function onProgress(args) {
      this.msgHandler.send("DocProgress", {
        loaded: this.stream.numChunksLoaded * this.chunkSize + args.loaded,
        total: this.length
      });
    }
  }, {
    key: "onReceiveData",
    value: function onReceiveData(args) {
      var chunk = args.chunk;
      var isProgressive = args.begin === undefined;
      var begin = isProgressive ? this.progressiveDataLength : args.begin;
      var end = begin + chunk.byteLength;
      var beginChunk = Math.floor(begin / this.chunkSize);
      var endChunk = end < this.length ? Math.floor(end / this.chunkSize) : Math.ceil(end / this.chunkSize);

      if (isProgressive) {
        this.stream.onReceiveProgressiveData(chunk);
        this.progressiveDataLength = end;
      } else {
        this.stream.onReceiveData(begin, chunk);
      }

      if (this.stream.isDataLoaded) {
        this._loadedStreamCapability.resolve(this.stream);
      }

      var loadedRequests = [];

      for (var curChunk = beginChunk; curChunk < endChunk; ++curChunk) {
        var requestIds = this._requestsByChunk.get(curChunk);

        if (!requestIds) {
          continue;
        }

        this._requestsByChunk["delete"](curChunk);

        var _iterator5 = _createForOfIteratorHelper(requestIds),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var requestId = _step5.value;

            var chunksNeeded = this._chunksNeededByRequest.get(requestId);

            if (chunksNeeded.has(curChunk)) {
              chunksNeeded["delete"](curChunk);
            }

            if (chunksNeeded.size > 0) {
              continue;
            }

            loadedRequests.push(requestId);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }

      if (!this.disableAutoFetch && this._requestsByChunk.size === 0) {
        var nextEmptyChunk;

        if (this.stream.numChunksLoaded === 1) {
          var lastChunk = this.stream.numChunks - 1;

          if (!this.stream.hasChunk(lastChunk)) {
            nextEmptyChunk = lastChunk;
          }
        } else {
          nextEmptyChunk = this.stream.nextEmptyChunk(endChunk);
        }

        if (Number.isInteger(nextEmptyChunk)) {
          this._requestChunks([nextEmptyChunk]);
        }
      }

      for (var _i = 0, _loadedRequests = loadedRequests; _i < _loadedRequests.length; _i++) {
        var _requestId = _loadedRequests[_i];

        var capability = this._promisesByRequest.get(_requestId);

        this._promisesByRequest["delete"](_requestId);

        capability.resolve();
      }

      this.msgHandler.send("DocProgress", {
        loaded: this.stream.numChunksLoaded * this.chunkSize,
        total: this.length
      });
    }
  }, {
    key: "onError",
    value: function onError(err) {
      this._loadedStreamCapability.reject(err);
    }
  }, {
    key: "getBeginChunk",
    value: function getBeginChunk(begin) {
      return Math.floor(begin / this.chunkSize);
    }
  }, {
    key: "getEndChunk",
    value: function getEndChunk(end) {
      return Math.floor((end - 1) / this.chunkSize) + 1;
    }
  }, {
    key: "abort",
    value: function abort(reason) {
      this.aborted = true;

      if (this.pdfNetworkStream) {
        this.pdfNetworkStream.cancelAllRequests(reason);
      }

      var _iterator6 = _createForOfIteratorHelper(this._promisesByRequest.values()),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var capability = _step6.value;
          capability.reject(reason);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }]);

  return ChunkedStreamManager;
}();

exports.ChunkedStreamManager = ChunkedStreamManager;