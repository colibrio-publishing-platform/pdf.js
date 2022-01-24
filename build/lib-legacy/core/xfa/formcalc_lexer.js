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
exports.Token = exports.TOKEN = exports.Lexer = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEYWORDS = new Set(["and", "break", "continue", "do", "downto", "else", "elseif", "end", "endfor", "endfunc", "endif", "endwhile", "eq", "exit", "for", "foreach", "func", "ge", "gt", "if", "in", "infinity", "le", "lt", "nan", "ne", "not", "null", "or", "return", "step", "then", "this", "throw", "upto", "var", "while"]);
var TOKEN = {
  and: 0,
  divide: 1,
  dot: 2,
  dotDot: 3,
  dotHash: 4,
  dotStar: 5,
  eq: 6,
  ge: 7,
  gt: 8,
  le: 9,
  leftBracket: 10,
  leftParen: 11,
  lt: 12,
  minus: 13,
  ne: 14,
  not: 15,
  "null": 16,
  number: 17,
  or: 18,
  plus: 19,
  rightBracket: 20,
  rightParen: 21,
  string: 22,
  "this": 23,
  times: 24,
  identifier: 25,
  "break": 26,
  "continue": 27,
  "do": 28,
  "for": 29,
  foreach: 30,
  func: 31,
  "if": 32,
  "var": 33,
  "while": 34,
  assign: 35,
  comma: 36,
  downto: 37,
  "else": 38,
  elseif: 39,
  end: 40,
  endif: 41,
  endfor: 42,
  endfunc: 43,
  endwhile: 44,
  eof: 45,
  exit: 46,
  "in": 47,
  infinity: 48,
  nan: 49,
  "return": 50,
  step: 51,
  then: 52,
  "throw": 53,
  upto: 54
};
exports.TOKEN = TOKEN;
var hexPattern = /^[uU]([0-9a-fA-F]{4,8})/;
var numberPattern = /^\d*(?:\.\d*)?(?:[Ee][+-]?\d+)?/;
var dotNumberPattern = /^\d*(?:[Ee][+-]?\d+)?/;
var eolPattern = /[\r\n]+/;
var identifierPattern = new RegExp("^[\\p{L}_$!][\\p{L}\\p{N}_$]*", "u");

var Token = function Token(id) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  _classCallCheck(this, Token);

  this.id = id;
  this.value = value;
};

exports.Token = Token;

var Singletons = function () {
  var obj = Object.create(null);
  var nonSingleton = new Set(["identifier", "string", "number", "nan", "infinity"]);

  for (var _i = 0, _Object$entries = Object.entries(TOKEN); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        name = _Object$entries$_i[0],
        id = _Object$entries$_i[1];

    if (!nonSingleton.has(name)) {
      obj[name] = new Token(id);
    }
  }

  obj.nan = new Token(TOKEN.number, NaN);
  obj.infinity = new Token(TOKEN.number, Infinity);
  return obj;
}();

var Lexer = /*#__PURE__*/function () {
  function Lexer(data) {
    _classCallCheck(this, Lexer);

    this.data = data;
    this.pos = 0;
    this.len = data.length;
    this.strBuf = [];
  }

  _createClass(Lexer, [{
    key: "skipUntilEOL",
    value: function skipUntilEOL() {
      var match = this.data.slice(this.pos).match(eolPattern);

      if (match) {
        this.pos += match.index + match[0].length;
      } else {
        this.pos = this.len;
      }
    }
  }, {
    key: "getIdentifier",
    value: function getIdentifier() {
      this.pos--;
      var match = this.data.slice(this.pos).match(identifierPattern);

      if (!match) {
        throw new Error("Invalid token in FormCalc expression at position ".concat(this.pos, "."));
      }

      var identifier = this.data.slice(this.pos, this.pos + match[0].length);
      this.pos += match[0].length;
      var lower = identifier.toLowerCase();

      if (!KEYWORDS.has(lower)) {
        return new Token(TOKEN.identifier, identifier);
      }

      return Singletons[lower];
    }
  }, {
    key: "getString",
    value: function getString() {
      var str = this.strBuf;
      var data = this.data;
      var start = this.pos;

      while (this.pos < this.len) {
        var _char = data.charCodeAt(this.pos++);

        if (_char === 0x22) {
          if (data.charCodeAt(this.pos) === 0x22) {
            str.push(data.slice(start, this.pos++));
            start = this.pos;
            continue;
          }

          break;
        }

        if (_char === 0x5c) {
          var match = data.substring(this.pos, this.pos + 10).match(hexPattern);

          if (!match) {
            continue;
          }

          str.push(data.slice(start, this.pos - 1));
          var code = match[1];

          if (code.length === 4) {
            str.push(String.fromCharCode(parseInt(code, 16)));
            start = this.pos += 5;
          } else if (code.length !== 8) {
            str.push(String.fromCharCode(parseInt(code.slice(0, 4), 16)));
            start = this.pos += 5;
          } else {
            str.push(String.fromCharCode(parseInt(code, 16)));
            start = this.pos += 9;
          }
        }
      }

      var lastChunk = data.slice(start, this.pos - 1);

      if (str.length === 0) {
        return new Token(TOKEN.string, lastChunk);
      }

      str.push(lastChunk);
      var string = str.join("");
      str.length = 0;
      return new Token(TOKEN.string, string);
    }
  }, {
    key: "getNumber",
    value: function getNumber(first) {
      var match = this.data.substring(this.pos).match(numberPattern);

      if (!match) {
        return first - 0x30;
      }

      var number = parseFloat(this.data.substring(this.pos - 1, this.pos + match[0].length));
      this.pos += match[0].length;
      return new Token(TOKEN.number, number);
    }
  }, {
    key: "getCompOperator",
    value: function getCompOperator(alt1, alt2) {
      if (this.data.charCodeAt(this.pos) === 0x3d) {
        this.pos++;
        return alt1;
      }

      return alt2;
    }
  }, {
    key: "getLower",
    value: function getLower() {
      var _char2 = this.data.charCodeAt(this.pos);

      if (_char2 === 0x3d) {
        this.pos++;
        return Singletons.le;
      }

      if (_char2 === 0x3e) {
        this.pos++;
        return Singletons.ne;
      }

      return Singletons.lt;
    }
  }, {
    key: "getSlash",
    value: function getSlash() {
      if (this.data.charCodeAt(this.pos) === 0x2f) {
        this.skipUntilEOL();
        return false;
      }

      return true;
    }
  }, {
    key: "getDot",
    value: function getDot() {
      var _char3 = this.data.charCodeAt(this.pos);

      if (_char3 === 0x2e) {
        this.pos++;
        return Singletons.dotDot;
      }

      if (_char3 === 0x2a) {
        this.pos++;
        return Singletons.dotStar;
      }

      if (_char3 === 0x23) {
        this.pos++;
        return Singletons.dotHash;
      }

      if (0x30 <= _char3 && _char3 <= 0x39) {
        this.pos++;
        var match = this.data.substring(this.pos).match(dotNumberPattern);

        if (!match) {
          return new Token(TOKEN.number, (_char3 - 0x30) / 10);
        }

        var end = this.pos + match[0].length;
        var number = parseFloat(this.data.substring(this.pos - 2, end));
        this.pos = end;
        return new Token(TOKEN.number, number);
      }

      return Singletons.dot;
    }
  }, {
    key: "next",
    value: function next() {
      while (this.pos < this.len) {
        var _char4 = this.data.charCodeAt(this.pos++);

        switch (_char4) {
          case 0x09:
          case 0x0a:
          case 0x0b:
          case 0x0c:
          case 0x0d:
          case 0x20:
            break;

          case 0x22:
            return this.getString();

          case 0x26:
            return Singletons.and;

          case 0x28:
            return Singletons.leftParen;

          case 0x29:
            return Singletons.rightParen;

          case 0x2a:
            return Singletons.times;

          case 0x2b:
            return Singletons.plus;

          case 0x2c:
            return Singletons.comma;

          case 0x2d:
            return Singletons.minus;

          case 0x2e:
            return this.getDot();

          case 0x2f:
            if (this.getSlash()) {
              return Singletons.divide;
            }

            break;

          case 0x30:
          case 0x31:
          case 0x32:
          case 0x33:
          case 0x34:
          case 0x35:
          case 0x36:
          case 0x37:
          case 0x38:
          case 0x39:
            return this.getNumber(_char4);

          case 0x3b:
            this.skipUntilEOL();
            break;

          case 0x3c:
            return this.getLower();

          case 0x3d:
            return this.getCompOperator(Singletons.eq, Singletons.assign);

          case 0x3e:
            return this.getCompOperator(Singletons.ge, Singletons.gt);

          case 0x5b:
            return Singletons.leftBracket;

          case 0x5d:
            return Singletons.rightBracket;

          case 0x7c:
            return Singletons.or;

          default:
            return this.getIdentifier();
        }
      }

      return Singletons.eof;
    }
  }]);

  return Lexer;
}();

exports.Lexer = Lexer;