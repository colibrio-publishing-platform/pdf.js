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
exports.XRef = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

var _core_utils = require("./core_utils.js");

var _parser2 = require("./parser.js");

var _base_stream = require("./base_stream.js");

var _crypto = require("./crypto.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var XRef = /*#__PURE__*/function () {
  function XRef(stream, pdfManager) {
    _classCallCheck(this, XRef);

    this.stream = stream;
    this.pdfManager = pdfManager;
    this.entries = [];
    this.xrefstms = Object.create(null);
    this._cacheMap = new Map();
    this._pendingRefs = new _primitives.RefSet();
    this.stats = new _core_utils.DocStats(pdfManager.msgHandler);
    this._newRefNum = null;
  }

  _createClass(XRef, [{
    key: "getNewRef",
    value: function getNewRef() {
      if (this._newRefNum === null) {
        this._newRefNum = this.entries.length;
      }

      return _primitives.Ref.get(this._newRefNum++, 0);
    }
  }, {
    key: "resetNewRef",
    value: function resetNewRef() {
      this._newRefNum = null;
    }
  }, {
    key: "setStartXRef",
    value: function setStartXRef(startXRef) {
      this.startXRefQueue = [startXRef];
    }
  }, {
    key: "parse",
    value: function parse() {
      var recoveryMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var trailerDict;

      if (!recoveryMode) {
        trailerDict = this.readXRef();
      } else {
        (0, _util.warn)("Indexing all PDF objects");
        trailerDict = this.indexObjects();
      }

      trailerDict.assignXref(this);
      this.trailer = trailerDict;
      var encrypt;

      try {
        encrypt = trailerDict.get("Encrypt");
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.warn)("XRef.parse - Invalid \"Encrypt\" reference: \"".concat(ex, "\"."));
      }

      if (encrypt instanceof _primitives.Dict) {
        var ids = trailerDict.get("ID");
        var fileId = ids && ids.length ? ids[0] : "";
        encrypt.suppressEncryption = true;
        this.encrypt = new _crypto.CipherTransformFactory(encrypt, fileId, this.pdfManager.password);
      }

      var root;

      try {
        root = trailerDict.get("Root");
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.warn)("XRef.parse - Invalid \"Root\" reference: \"".concat(ex, "\"."));
      }

      if (root instanceof _primitives.Dict) {
        try {
          var pages = root.get("Pages");

          if (pages instanceof _primitives.Dict) {
            this.root = root;
            return;
          }
        } catch (ex) {
          if (ex instanceof _core_utils.MissingDataException) {
            throw ex;
          }

          (0, _util.warn)("XRef.parse - Invalid \"Pages\" reference: \"".concat(ex, "\"."));
        }
      }

      if (!recoveryMode) {
        throw new _core_utils.XRefParseException();
      }

      throw new _util.InvalidPDFException("Invalid Root reference.");
    }
  }, {
    key: "processXRefTable",
    value: function processXRefTable(parser) {
      if (!("tableState" in this)) {
        this.tableState = {
          entryNum: 0,
          streamPos: parser.lexer.stream.pos,
          parserBuf1: parser.buf1,
          parserBuf2: parser.buf2
        };
      }

      var obj = this.readXRefTable(parser);

      if (!(0, _primitives.isCmd)(obj, "trailer")) {
        throw new _util.FormatError("Invalid XRef table: could not find trailer dictionary");
      }

      var dict = parser.getObj();

      if (!(dict instanceof _primitives.Dict) && dict.dict) {
        dict = dict.dict;
      }

      if (!(dict instanceof _primitives.Dict)) {
        throw new _util.FormatError("Invalid XRef table: could not parse trailer dictionary");
      }

      delete this.tableState;
      return dict;
    }
  }, {
    key: "readXRefTable",
    value: function readXRefTable(parser) {
      var stream = parser.lexer.stream;
      var tableState = this.tableState;
      stream.pos = tableState.streamPos;
      parser.buf1 = tableState.parserBuf1;
      parser.buf2 = tableState.parserBuf2;
      var obj;

      while (true) {
        if (!("firstEntryNum" in tableState) || !("entryCount" in tableState)) {
          if ((0, _primitives.isCmd)(obj = parser.getObj(), "trailer")) {
            break;
          }

          tableState.firstEntryNum = obj;
          tableState.entryCount = parser.getObj();
        }

        var first = tableState.firstEntryNum;
        var count = tableState.entryCount;

        if (!Number.isInteger(first) || !Number.isInteger(count)) {
          throw new _util.FormatError("Invalid XRef table: wrong types in subsection header");
        }

        for (var i = tableState.entryNum; i < count; i++) {
          tableState.streamPos = stream.pos;
          tableState.entryNum = i;
          tableState.parserBuf1 = parser.buf1;
          tableState.parserBuf2 = parser.buf2;
          var entry = {};
          entry.offset = parser.getObj();
          entry.gen = parser.getObj();
          var type = parser.getObj();

          if (type instanceof _primitives.Cmd) {
            switch (type.cmd) {
              case "f":
                entry.free = true;
                break;

              case "n":
                entry.uncompressed = true;
                break;
            }
          }

          if (!Number.isInteger(entry.offset) || !Number.isInteger(entry.gen) || !(entry.free || entry.uncompressed)) {
            throw new _util.FormatError("Invalid entry in XRef subsection: ".concat(first, ", ").concat(count));
          }

          if (i === 0 && entry.free && first === 1) {
            first = 0;
          }

          if (!this.entries[i + first]) {
            this.entries[i + first] = entry;
          }
        }

        tableState.entryNum = 0;
        tableState.streamPos = stream.pos;
        tableState.parserBuf1 = parser.buf1;
        tableState.parserBuf2 = parser.buf2;
        delete tableState.firstEntryNum;
        delete tableState.entryCount;
      }

      if (this.entries[0] && !this.entries[0].free) {
        throw new _util.FormatError("Invalid XRef table: unexpected first object");
      }

      return obj;
    }
  }, {
    key: "processXRefStream",
    value: function processXRefStream(stream) {
      if (!("streamState" in this)) {
        var streamParameters = stream.dict;
        var byteWidths = streamParameters.get("W");
        var range = streamParameters.get("Index");

        if (!range) {
          range = [0, streamParameters.get("Size")];
        }

        this.streamState = {
          entryRanges: range,
          byteWidths: byteWidths,
          entryNum: 0,
          streamPos: stream.pos
        };
      }

      this.readXRefStream(stream);
      delete this.streamState;
      return stream.dict;
    }
  }, {
    key: "readXRefStream",
    value: function readXRefStream(stream) {
      var streamState = this.streamState;
      stream.pos = streamState.streamPos;

      var _streamState$byteWidt = _slicedToArray(streamState.byteWidths, 3),
          typeFieldWidth = _streamState$byteWidt[0],
          offsetFieldWidth = _streamState$byteWidt[1],
          generationFieldWidth = _streamState$byteWidt[2];

      var entryRanges = streamState.entryRanges;

      while (entryRanges.length > 0) {
        var _entryRanges = _slicedToArray(entryRanges, 2),
            first = _entryRanges[0],
            n = _entryRanges[1];

        if (!Number.isInteger(first) || !Number.isInteger(n)) {
          throw new _util.FormatError("Invalid XRef range fields: ".concat(first, ", ").concat(n));
        }

        if (!Number.isInteger(typeFieldWidth) || !Number.isInteger(offsetFieldWidth) || !Number.isInteger(generationFieldWidth)) {
          throw new _util.FormatError("Invalid XRef entry fields length: ".concat(first, ", ").concat(n));
        }

        for (var i = streamState.entryNum; i < n; ++i) {
          streamState.entryNum = i;
          streamState.streamPos = stream.pos;
          var type = 0,
              offset = 0,
              generation = 0;

          for (var j = 0; j < typeFieldWidth; ++j) {
            var typeByte = stream.getByte();

            if (typeByte === -1) {
              throw new _util.FormatError("Invalid XRef byteWidths 'type'.");
            }

            type = type << 8 | typeByte;
          }

          if (typeFieldWidth === 0) {
            type = 1;
          }

          for (var _j = 0; _j < offsetFieldWidth; ++_j) {
            var offsetByte = stream.getByte();

            if (offsetByte === -1) {
              throw new _util.FormatError("Invalid XRef byteWidths 'offset'.");
            }

            offset = offset << 8 | offsetByte;
          }

          for (var _j2 = 0; _j2 < generationFieldWidth; ++_j2) {
            var generationByte = stream.getByte();

            if (generationByte === -1) {
              throw new _util.FormatError("Invalid XRef byteWidths 'generation'.");
            }

            generation = generation << 8 | generationByte;
          }

          var entry = {};
          entry.offset = offset;
          entry.gen = generation;

          switch (type) {
            case 0:
              entry.free = true;
              break;

            case 1:
              entry.uncompressed = true;
              break;

            case 2:
              break;

            default:
              throw new _util.FormatError("Invalid XRef entry type: ".concat(type));
          }

          if (!this.entries[first + i]) {
            this.entries[first + i] = entry;
          }
        }

        streamState.entryNum = 0;
        streamState.streamPos = stream.pos;
        entryRanges.splice(0, 2);
      }
    }
  }, {
    key: "indexObjects",
    value: function indexObjects() {
      var TAB = 0x9,
          LF = 0xa,
          CR = 0xd,
          SPACE = 0x20;
      var PERCENT = 0x25,
          LT = 0x3c;

      function readToken(data, offset) {
        var token = "",
            ch = data[offset];

        while (ch !== LF && ch !== CR && ch !== LT) {
          if (++offset >= data.length) {
            break;
          }

          token += String.fromCharCode(ch);
          ch = data[offset];
        }

        return token;
      }

      function skipUntil(data, offset, what) {
        var length = what.length,
            dataLength = data.length;
        var skipped = 0;

        while (offset < dataLength) {
          var i = 0;

          while (i < length && data[offset + i] === what[i]) {
            ++i;
          }

          if (i >= length) {
            break;
          }

          offset++;
          skipped++;
        }

        return skipped;
      }

      var objRegExp = /^(\d+)\s+(\d+)\s+obj\b/;
      var endobjRegExp = /\bendobj[\b\s]$/;
      var nestedObjRegExp = /\s+(\d+\s+\d+\s+obj[\b\s<])$/;
      var CHECK_CONTENT_LENGTH = 25;
      var trailerBytes = new Uint8Array([116, 114, 97, 105, 108, 101, 114]);
      var startxrefBytes = new Uint8Array([115, 116, 97, 114, 116, 120, 114, 101, 102]);
      var objBytes = new Uint8Array([111, 98, 106]);
      var xrefBytes = new Uint8Array([47, 88, 82, 101, 102]);
      this.entries.length = 0;

      this._cacheMap.clear();

      var stream = this.stream;
      stream.pos = 0;
      var buffer = stream.getBytes(),
          length = buffer.length;
      var position = stream.start;
      var trailers = [],
          xrefStms = [];

      while (position < length) {
        var ch = buffer[position];

        if (ch === TAB || ch === LF || ch === CR || ch === SPACE) {
          ++position;
          continue;
        }

        if (ch === PERCENT) {
          do {
            ++position;

            if (position >= length) {
              break;
            }

            ch = buffer[position];
          } while (ch !== LF && ch !== CR);

          continue;
        }

        var token = readToken(buffer, position);
        var m = void 0;

        if (token.startsWith("xref") && (token.length === 4 || /\s/.test(token[4]))) {
          position += skipUntil(buffer, position, trailerBytes);
          trailers.push(position);
          position += skipUntil(buffer, position, startxrefBytes);
        } else if (m = objRegExp.exec(token)) {
          var num = m[1] | 0,
              gen = m[2] | 0;
          var contentLength = void 0,
              startPos = position + token.length,
              updateEntries = false;

          if (!this.entries[num]) {
            updateEntries = true;
          } else if (this.entries[num].gen === gen) {
            try {
              var parser = new _parser2.Parser({
                lexer: new _parser2.Lexer(stream.makeSubStream(startPos))
              });
              parser.getObj();
              updateEntries = true;
            } catch (ex) {
              if (ex instanceof _core_utils.ParserEOFException) {
                (0, _util.warn)("indexObjects -- checking object (".concat(token, "): \"").concat(ex, "\"."));
              } else {
                updateEntries = true;
              }
            }
          }

          if (updateEntries) {
            this.entries[num] = {
              offset: position - stream.start,
              gen: gen,
              uncompressed: true
            };
          }

          while (startPos < buffer.length) {
            var endPos = startPos + skipUntil(buffer, startPos, objBytes) + 4;
            contentLength = endPos - position;
            var checkPos = Math.max(endPos - CHECK_CONTENT_LENGTH, startPos);
            var tokenStr = (0, _util.bytesToString)(buffer.subarray(checkPos, endPos));

            if (endobjRegExp.test(tokenStr)) {
              break;
            } else {
              var objToken = nestedObjRegExp.exec(tokenStr);

              if (objToken && objToken[1]) {
                (0, _util.warn)('indexObjects: Found new "obj" inside of another "obj", ' + 'caused by missing "endobj" -- trying to recover.');
                contentLength -= objToken[1].length;
                break;
              }
            }

            startPos = endPos;
          }

          var content = buffer.subarray(position, position + contentLength);
          var xrefTagOffset = skipUntil(content, 0, xrefBytes);

          if (xrefTagOffset < contentLength && content[xrefTagOffset + 5] < 64) {
            xrefStms.push(position - stream.start);
            this.xrefstms[position - stream.start] = 1;
          }

          position += contentLength;
        } else if (token.startsWith("trailer") && (token.length === 7 || /\s/.test(token[7]))) {
          trailers.push(position);
          position += skipUntil(buffer, position, startxrefBytes);
        } else {
          position += token.length + 1;
        }
      }

      for (var i = 0, ii = xrefStms.length; i < ii; ++i) {
        this.startXRefQueue.push(xrefStms[i]);
        this.readXRef(true);
      }

      var trailerDict;

      for (var _i2 = 0, _ii = trailers.length; _i2 < _ii; ++_i2) {
        stream.pos = trailers[_i2];

        var _parser = new _parser2.Parser({
          lexer: new _parser2.Lexer(stream),
          xref: this,
          allowStreams: true,
          recoveryMode: true
        });

        var obj = _parser.getObj();

        if (!(0, _primitives.isCmd)(obj, "trailer")) {
          continue;
        }

        var dict = _parser.getObj();

        if (!(dict instanceof _primitives.Dict)) {
          continue;
        }

        try {
          var rootDict = dict.get("Root");

          if (!(rootDict instanceof _primitives.Dict)) {
            continue;
          }

          var pagesDict = rootDict.get("Pages");

          if (!(pagesDict instanceof _primitives.Dict)) {
            continue;
          }

          var pagesCount = pagesDict.get("Count");

          if (!Number.isInteger(pagesCount)) {
            continue;
          }
        } catch (ex) {
          continue;
        }

        if (dict.has("ID")) {
          return dict;
        }

        trailerDict = dict;
      }

      if (trailerDict) {
        return trailerDict;
      }

      if (this.topDict) {
        return this.topDict;
      }

      throw new _util.InvalidPDFException("Invalid PDF structure.");
    }
  }, {
    key: "readXRef",
    value: function readXRef() {
      var recoveryMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var stream = this.stream;
      var startXRefParsedCache = new Set();

      try {
        while (this.startXRefQueue.length) {
          var startXRef = this.startXRefQueue[0];

          if (startXRefParsedCache.has(startXRef)) {
            (0, _util.warn)("readXRef - skipping XRef table since it was already parsed.");
            this.startXRefQueue.shift();
            continue;
          }

          startXRefParsedCache.add(startXRef);
          stream.pos = startXRef + stream.start;
          var parser = new _parser2.Parser({
            lexer: new _parser2.Lexer(stream),
            xref: this,
            allowStreams: true
          });
          var obj = parser.getObj();
          var dict = void 0;

          if ((0, _primitives.isCmd)(obj, "xref")) {
            dict = this.processXRefTable(parser);

            if (!this.topDict) {
              this.topDict = dict;
            }

            obj = dict.get("XRefStm");

            if (Number.isInteger(obj)) {
              var pos = obj;

              if (!(pos in this.xrefstms)) {
                this.xrefstms[pos] = 1;
                this.startXRefQueue.push(pos);
              }
            }
          } else if (Number.isInteger(obj)) {
            if (!Number.isInteger(parser.getObj()) || !(0, _primitives.isCmd)(parser.getObj(), "obj") || !((obj = parser.getObj()) instanceof _base_stream.BaseStream)) {
              throw new _util.FormatError("Invalid XRef stream");
            }

            dict = this.processXRefStream(obj);

            if (!this.topDict) {
              this.topDict = dict;
            }

            if (!dict) {
              throw new _util.FormatError("Failed to read XRef stream");
            }
          } else {
            throw new _util.FormatError("Invalid XRef stream header");
          }

          obj = dict.get("Prev");

          if (Number.isInteger(obj)) {
            this.startXRefQueue.push(obj);
          } else if (obj instanceof _primitives.Ref) {
            this.startXRefQueue.push(obj.num);
          }

          this.startXRefQueue.shift();
        }

        return this.topDict;
      } catch (e) {
        if (e instanceof _core_utils.MissingDataException) {
          throw e;
        }

        (0, _util.info)("(while reading XRef): " + e);
        this.startXRefQueue.shift();
      }

      if (recoveryMode) {
        return undefined;
      }

      throw new _core_utils.XRefParseException();
    }
  }, {
    key: "getEntry",
    value: function getEntry(i) {
      var xrefEntry = this.entries[i];

      if (xrefEntry && !xrefEntry.free && xrefEntry.offset) {
        return xrefEntry;
      }

      return null;
    }
  }, {
    key: "fetchIfRef",
    value: function fetchIfRef(obj) {
      var suppressEncryption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (obj instanceof _primitives.Ref) {
        return this.fetch(obj, suppressEncryption);
      }

      return obj;
    }
  }, {
    key: "fetch",
    value: function fetch(ref) {
      var suppressEncryption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!(ref instanceof _primitives.Ref)) {
        throw new Error("ref object is not a reference");
      }

      var num = ref.num;

      var cacheEntry = this._cacheMap.get(num);

      if (cacheEntry !== undefined) {
        if (cacheEntry instanceof _primitives.Dict && !cacheEntry.objId) {
          cacheEntry.objId = ref.toString();
        }

        return cacheEntry;
      }

      var xrefEntry = this.getEntry(num);

      if (xrefEntry === null) {
        this._cacheMap.set(num, xrefEntry);

        return xrefEntry;
      }

      if (this._pendingRefs.has(ref)) {
        this._pendingRefs.remove(ref);

        (0, _util.warn)("Ignoring circular reference: ".concat(ref, "."));
        return _primitives.CIRCULAR_REF;
      }

      this._pendingRefs.put(ref);

      try {
        if (xrefEntry.uncompressed) {
          xrefEntry = this.fetchUncompressed(ref, xrefEntry, suppressEncryption);
        } else {
          xrefEntry = this.fetchCompressed(ref, xrefEntry, suppressEncryption);
        }

        this._pendingRefs.remove(ref);
      } catch (ex) {
        this._pendingRefs.remove(ref);

        throw ex;
      }

      if (xrefEntry instanceof _primitives.Dict) {
        xrefEntry.objId = ref.toString();
      } else if (xrefEntry instanceof _base_stream.BaseStream) {
        xrefEntry.dict.objId = ref.toString();
      }

      return xrefEntry;
    }
  }, {
    key: "fetchUncompressed",
    value: function fetchUncompressed(ref, xrefEntry) {
      var suppressEncryption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var gen = ref.gen;
      var num = ref.num;

      if (xrefEntry.gen !== gen) {
        throw new _core_utils.XRefEntryException("Inconsistent generation in XRef: ".concat(ref));
      }

      var stream = this.stream.makeSubStream(xrefEntry.offset + this.stream.start);
      var parser = new _parser2.Parser({
        lexer: new _parser2.Lexer(stream),
        xref: this,
        allowStreams: true
      });
      var obj1 = parser.getObj();
      var obj2 = parser.getObj();
      var obj3 = parser.getObj();

      if (obj1 !== num || obj2 !== gen || !(obj3 instanceof _primitives.Cmd)) {
        throw new _core_utils.XRefEntryException("Bad (uncompressed) XRef entry: ".concat(ref));
      }

      if (obj3.cmd !== "obj") {
        if (obj3.cmd.startsWith("obj")) {
          num = parseInt(obj3.cmd.substring(3), 10);

          if (!Number.isNaN(num)) {
            return num;
          }
        }

        throw new _core_utils.XRefEntryException("Bad (uncompressed) XRef entry: ".concat(ref));
      }

      if (this.encrypt && !suppressEncryption) {
        xrefEntry = parser.getObj(this.encrypt.createCipherTransform(num, gen));
      } else {
        xrefEntry = parser.getObj();
      }

      if (!(xrefEntry instanceof _base_stream.BaseStream)) {
        (0, _util.assert)(xrefEntry !== undefined, 'fetchUncompressed: The "xrefEntry" cannot be undefined.');

        this._cacheMap.set(num, xrefEntry);
      }

      return xrefEntry;
    }
  }, {
    key: "fetchCompressed",
    value: function fetchCompressed(ref, xrefEntry) {
      var suppressEncryption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var tableOffset = xrefEntry.offset;
      var stream = this.fetch(_primitives.Ref.get(tableOffset, 0));

      if (!(stream instanceof _base_stream.BaseStream)) {
        throw new _util.FormatError("bad ObjStm stream");
      }

      var first = stream.dict.get("First");
      var n = stream.dict.get("N");

      if (!Number.isInteger(first) || !Number.isInteger(n)) {
        throw new _util.FormatError("invalid first and n parameters for ObjStm stream");
      }

      var parser = new _parser2.Parser({
        lexer: new _parser2.Lexer(stream),
        xref: this,
        allowStreams: true
      });
      var nums = new Array(n);
      var offsets = new Array(n);

      for (var i = 0; i < n; ++i) {
        var num = parser.getObj();

        if (!Number.isInteger(num)) {
          throw new _util.FormatError("invalid object number in the ObjStm stream: ".concat(num));
        }

        var offset = parser.getObj();

        if (!Number.isInteger(offset)) {
          throw new _util.FormatError("invalid object offset in the ObjStm stream: ".concat(offset));
        }

        nums[i] = num;
        offsets[i] = offset;
      }

      var start = (stream.start || 0) + first;
      var entries = new Array(n);

      for (var _i3 = 0; _i3 < n; ++_i3) {
        var length = _i3 < n - 1 ? offsets[_i3 + 1] - offsets[_i3] : undefined;

        if (length < 0) {
          throw new _util.FormatError("Invalid offset in the ObjStm stream.");
        }

        parser = new _parser2.Parser({
          lexer: new _parser2.Lexer(stream.makeSubStream(start + offsets[_i3], length, stream.dict)),
          xref: this,
          allowStreams: true
        });
        var obj = parser.getObj();
        entries[_i3] = obj;

        if (obj instanceof _base_stream.BaseStream) {
          continue;
        }

        var _num = nums[_i3],
            entry = this.entries[_num];

        if (entry && entry.offset === tableOffset && entry.gen === _i3) {
          (0, _util.assert)(obj !== undefined, 'fetchCompressed: The "obj" cannot be undefined.');

          this._cacheMap.set(_num, obj);
        }
      }

      xrefEntry = entries[xrefEntry.gen];

      if (xrefEntry === undefined) {
        throw new _core_utils.XRefEntryException("Bad (compressed) XRef entry: ".concat(ref));
      }

      return xrefEntry;
    }
  }, {
    key: "fetchIfRefAsync",
    value: function () {
      var _fetchIfRefAsync = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, suppressEncryption) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(obj instanceof _primitives.Ref)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", this.fetchAsync(obj, suppressEncryption));

              case 2:
                return _context.abrupt("return", obj);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchIfRefAsync(_x, _x2) {
        return _fetchIfRefAsync.apply(this, arguments);
      }

      return fetchIfRefAsync;
    }()
  }, {
    key: "fetchAsync",
    value: function () {
      var _fetchAsync = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ref, suppressEncryption) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                return _context2.abrupt("return", this.fetch(ref, suppressEncryption));

              case 4:
                _context2.prev = 4;
                _context2.t0 = _context2["catch"](0);

                if (_context2.t0 instanceof _core_utils.MissingDataException) {
                  _context2.next = 8;
                  break;
                }

                throw _context2.t0;

              case 8:
                _context2.next = 10;
                return this.pdfManager.requestRange(_context2.t0.begin, _context2.t0.end);

              case 10:
                return _context2.abrupt("return", this.fetchAsync(ref, suppressEncryption));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 4]]);
      }));

      function fetchAsync(_x3, _x4) {
        return _fetchAsync.apply(this, arguments);
      }

      return fetchAsync;
    }()
  }, {
    key: "getCatalogObj",
    value: function getCatalogObj() {
      return this.root;
    }
  }]);

  return XRef;
}();

exports.XRef = XRef;