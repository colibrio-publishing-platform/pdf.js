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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = exports.Errors = void 0;

var _formcalc_lexer = require("./formcalc_lexer.js");

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Errors = {
  assignment: "Invalid token in assignment.",
  block: "Invalid token in do ... end declaration.",
  elseif: "Invalid elseif declaration.",
  "for": "Invalid token in for ... endfor declaration.",
  foreach: "Invalid token in foreach ... endfor declaration.",
  func: "Invalid token in func declaration.",
  "if": "Invalid token if ... endif declaration.",
  index: "Invalid token in index.",
  params: "Invalid token in parameter list.",
  "var": "Invalid token in var declaration.",
  "while": "Invalid token while ... endwhile declaration."
};
exports.Errors = Errors;
var BUILTINS = new Set(["abs", "avg", "ceil", "count", "floor", "max", "min", "mod", "round", "sum", "date", "date2num", "datefmt", "isodate2num", "isotime2num", "localdatefmt", "localtimefmt", "num2date", "num2gmtime", "num2time", "time", "time2num", "timefmt", "apr", "cterm", "fv", "ipmt", "npv", "pmt", "ppmt", "pv", "rate", "term", "choose", "exists", "hasvalue", "oneof", "within", "at", "concat", "decode", "encode", "format", "left", "len", "lower", "ltrim", "parse", "replace", "right", "rtrim", "space", "str", "stuff", "substr", "uuid", "upper", "wordnum", "get", "post", "put", "eval", "ref", "unitvalue", "unittype", "acos", "asin", "atan", "cos", "deg2rad", "exp", "log", "pi", "pow", "rad2deg", "sin", "sqrt", "tan"]);
var LTR = true;
var RTL = false;
var Operators = {
  dot: {
    id: 0,
    prec: 0,
    assoc: RTL,
    nargs: 0,
    repr: "."
  },
  dotDot: {
    id: 1,
    prec: 0,
    assoc: RTL,
    nargs: 0,
    repr: ".."
  },
  dotHash: {
    id: 2,
    prec: 0,
    assoc: RTL,
    nargs: 0,
    repr: ".#"
  },
  call: {
    id: 1,
    prec: 1,
    assoc: LTR,
    nargs: 0
  },
  minus: {
    id: 4,
    nargs: 1,
    prec: 2,
    assoc: RTL,
    repr: "-",
    op: function op(x) {
      return -x;
    }
  },
  plus: {
    id: 5,
    nargs: 1,
    prec: 2,
    assoc: RTL,
    repr: "+",
    op: function op(x) {
      return +x;
    }
  },
  not: {
    id: 6,
    nargs: 1,
    prec: 2,
    assoc: RTL,
    repr: "!",
    op: function op(x) {
      return !x ? 1 : 0;
    }
  },
  mul: {
    id: 7,
    nargs: 2,
    prec: 3,
    assoc: LTR,
    repr: "*",
    op: function op(x, y) {
      return x * y;
    }
  },
  div: {
    id: 8,
    nargs: 2,
    prec: 3,
    assoc: LTR,
    repr: "/",
    op: function op(x, y) {
      return x / y;
    }
  },
  add: {
    id: 9,
    nargs: 2,
    prec: 4,
    assoc: LTR,
    repr: "+",
    op: function op(x, y) {
      return x + y;
    }
  },
  sub: {
    id: 10,
    nargs: 2,
    prec: 4,
    assoc: LTR,
    repr: "-",
    op: function op(x, y) {
      return x - y;
    }
  },
  lt: {
    id: 11,
    nargs: 2,
    prec: 5,
    assoc: LTR,
    repr: "<",
    op: function op(x, y) {
      return x < y ? 1 : 0;
    }
  },
  le: {
    id: 12,
    nargs: 2,
    prec: 5,
    assoc: LTR,
    repr: "<=",
    op: function op(x, y) {
      return x <= y ? 1 : 0;
    }
  },
  gt: {
    id: 13,
    nargs: 2,
    prec: 5,
    assoc: LTR,
    repr: ">",
    op: function op(x, y) {
      return x > y ? 1 : 0;
    }
  },
  ge: {
    id: 14,
    nargs: 2,
    prec: 5,
    assoc: LTR,
    repr: ">=",
    op: function op(x, y) {
      return x >= y ? 1 : 0;
    }
  },
  eq: {
    id: 15,
    nargs: 2,
    prec: 6,
    assoc: LTR,
    repr: "===",
    op: function op(x, y) {
      return x === y ? 1 : 0;
    }
  },
  ne: {
    id: 16,
    nargs: 2,
    prec: 6,
    assoc: LTR,
    repr: "!==",
    op: function op(x, y) {
      return x !== y ? 1 : 0;
    }
  },
  and: {
    id: 17,
    nargs: 2,
    prec: 7,
    assoc: LTR,
    repr: "&&",
    op: function op(x, y) {
      return x && y ? 1 : 0;
    }
  },
  or: {
    id: 18,
    nargs: 2,
    prec: 8,
    assoc: LTR,
    repr: "||",
    op: function op(x, y) {
      return x || y ? 1 : 0;
    }
  },
  paren: {
    id: 19,
    prec: 9,
    assoc: RTL,
    nargs: 0
  },
  subscript: {
    id: 20,
    prec: 9,
    assoc: RTL,
    nargs: 0
  }
};
var OPERATOR = true;
var OPERAND = false;

var SimpleExprParser = /*#__PURE__*/function () {
  function SimpleExprParser(lexer) {
    _classCallCheck(this, SimpleExprParser);

    this.lexer = lexer;
    this.operands = [];
    this.operators = [];
    this.last = OPERATOR;
  }

  _createClass(SimpleExprParser, [{
    key: "reset",
    value: function reset() {
      this.operands.length = 0;
      this.operators.length = 0;
      this.last = OPERATOR;
    }
  }, {
    key: "parse",
    value: function parse(tok) {
      tok = tok || this.lexer.next();

      while (true) {
        switch (tok.id) {
          case _formcalc_lexer.TOKEN.and:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.and);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.divide:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.div);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.dot:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.dot);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.dotDot:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.dotDot);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.dotHash:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.dotHash);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.dotStar:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.dot);
              this.pushOperand(new AstEveryOccurence());
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.eq:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.eq);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.ge:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.ge);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.gt:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.gt);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.le:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.le);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.leftBracket:
            if (this.last === OPERAND) {
              this.flushWithOperator(Operators.subscript);
              var operand = this.operands.pop();
              var index = SimpleExprParser.parseIndex(this.lexer);
              this.operands.push(new AstSubscript(operand, index));
              this.last = OPERAND;
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.leftParen:
            if (this.last === OPERAND) {
              var lastOperand = this.operands[this.operands.length - 1];

              if (!(lastOperand instanceof AstIdentifier)) {
                return [tok, this.getNode()];
              }

              lastOperand.toLowerCase();
              var name = lastOperand.id;
              this.flushWithOperator(Operators.call);
              var callee = this.operands.pop();
              var params = SimpleExprParser.parseParams(this.lexer);

              if (callee instanceof AstIdentifier && BUILTINS.has(name)) {
                this.operands.push(new AstBuiltinCall(name, params));
              } else {
                this.operands.push(new AstCall(callee, params));
              }

              this.last = OPERAND;
            } else {
              this.operators.push(Operators.paren);
              this.last = OPERATOR;
            }

            break;

          case _formcalc_lexer.TOKEN.lt:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.lt);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.minus:
            if (this.last === OPERATOR) {
              this.pushOperator(Operators.minus);
            } else {
              this.pushOperator(Operators.sub);
            }

            break;

          case _formcalc_lexer.TOKEN.ne:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.ne);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.not:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.not);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN["null"]:
            if (this.last === OPERATOR) {
              this.pushOperand(new AstNull());
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.number:
            if (this.last === OPERATOR) {
              this.pushOperand(new AstNumber(tok.value));
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.or:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.or);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.plus:
            if (this.last === OPERATOR) {
              this.pushOperator(Operators.plus);
            } else {
              this.pushOperator(Operators.add);
            }

            break;

          case _formcalc_lexer.TOKEN.rightBracket:
            if (!this.flushUntil(Operators.subscript.id)) {
              return [tok, this.getNode()];
            }

            break;

          case _formcalc_lexer.TOKEN.rightParen:
            if (!this.flushUntil(Operators.paren.id)) {
              return [tok, this.getNode()];
            }

            break;

          case _formcalc_lexer.TOKEN.string:
            if (this.last === OPERATOR) {
              this.pushOperand(new AstString(tok.value));
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN["this"]:
            if (this.last === OPERATOR) {
              this.pushOperand(new AstThis());
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.times:
            if (this.last === OPERAND) {
              this.pushOperator(Operators.mul);
              break;
            }

            return [tok, this.getNode()];

          case _formcalc_lexer.TOKEN.identifier:
            if (this.last === OPERATOR) {
              this.pushOperand(new AstIdentifier(tok.value));
              break;
            }

            return [tok, this.getNode()];

          default:
            return [tok, this.getNode()];
        }

        tok = this.lexer.next();
      }
    }
  }, {
    key: "pushOperator",
    value: function pushOperator(op) {
      this.flushWithOperator(op);
      this.operators.push(op);
      this.last = OPERATOR;
    }
  }, {
    key: "pushOperand",
    value: function pushOperand(op) {
      this.operands.push(op);
      this.last = OPERAND;
    }
  }, {
    key: "operate",
    value: function operate(op) {
      if (op.nargs === 1) {
        var arg = this.operands.pop();
        this.operands.push(AstUnaryOperator.getOperatorOrValue(op, arg));
      } else {
        var arg2 = this.operands.pop();
        var arg1 = this.operands.pop();
        this.operands.push(AstBinaryOperator.getOperatorOrValue(op, arg1, arg2));
      }
    }
  }, {
    key: "flushWithOperator",
    value: function flushWithOperator(op) {
      while (true) {
        var top = this.operators[this.operators.length - 1];

        if (top) {
          if (top.id >= 0 && SimpleExprParser.checkPrecedence(top, op)) {
            this.operators.pop();
            this.operate(top);
            continue;
          }
        }

        return;
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      while (true) {
        var op = this.operators.pop();

        if (!op) {
          return;
        }

        this.operate(op);
      }
    }
  }, {
    key: "flushUntil",
    value: function flushUntil(id) {
      while (true) {
        var op = this.operators.pop();

        if (!op) {
          return false;
        }

        if (op.id === id) {
          return true;
        }

        this.operate(op);
      }
    }
  }, {
    key: "getNode",
    value: function getNode() {
      this.flush();
      return this.operands.pop();
    }
  }], [{
    key: "parseParams",
    value: function parseParams(lexer) {
      var parser = new SimpleExprParser(lexer);
      var params = [];

      while (true) {
        var _parser$parse = parser.parse(),
            _parser$parse2 = _slicedToArray(_parser$parse, 2),
            tok = _parser$parse2[0],
            param = _parser$parse2[1];

        if (param) {
          params.push(param);
        }

        if (tok.id === _formcalc_lexer.TOKEN.rightParen) {
          return params;
        } else if (tok.id !== _formcalc_lexer.TOKEN.comma) {
          throw new Error(Errors.params);
        }

        parser.reset();
      }
    }
  }, {
    key: "parseIndex",
    value: function parseIndex(lexer) {
      var tok = lexer.next();

      if (tok.id === _formcalc_lexer.TOKEN.times) {
        tok = lexer.next();

        if (tok.id !== _formcalc_lexer.TOKEN.rightBracket) {
          throw new Error(Errors.index);
        }

        return new AstEveryOccurence();
      }

      var _SimpleExprParser$par = new SimpleExprParser(lexer).parse(tok),
          _SimpleExprParser$par2 = _slicedToArray(_SimpleExprParser$par, 2),
          token = _SimpleExprParser$par2[0],
          expr = _SimpleExprParser$par2[1];

      if (token.id !== _formcalc_lexer.TOKEN.rightBracket) {
        throw new Error(Errors.index);
      }

      return expr;
    }
  }, {
    key: "checkPrecedence",
    value: function checkPrecedence(left, right) {
      return left.prec < right.prec || left.prec === right.prec && left.assoc === LTR;
    }
  }]);

  return SimpleExprParser;
}();

var Leaf = /*#__PURE__*/function () {
  function Leaf() {
    _classCallCheck(this, Leaf);
  }

  _createClass(Leaf, [{
    key: "dump",
    value: function dump() {
      throw new Error("Not implemented method");
    }
  }, {
    key: "isSomPredicate",
    value: function isSomPredicate() {
      return false;
    }
  }, {
    key: "isDotExpression",
    value: function isDotExpression() {
      return false;
    }
  }, {
    key: "isConstant",
    value: function isConstant() {
      return false;
    }
  }, {
    key: "toNumber",
    value: function toNumber() {
      return 0;
    }
  }, {
    key: "toComparable",
    value: function toComparable() {
      return null;
    }
  }]);

  return Leaf;
}();

var AstCall = /*#__PURE__*/function (_Leaf) {
  _inherits(AstCall, _Leaf);

  var _super = _createSuper(AstCall);

  function AstCall(callee, params) {
    var _this;

    _classCallCheck(this, AstCall);

    _this = _super.call(this);
    _this.callee = callee;
    _this.params = params;
    return _this;
  }

  _createClass(AstCall, [{
    key: "dump",
    value: function dump() {
      return {
        callee: this.callee.dump(),
        params: this.params.map(function (x) {
          return x.dump();
        })
      };
    }
  }]);

  return AstCall;
}(Leaf);

var AstBuiltinCall = /*#__PURE__*/function (_Leaf2) {
  _inherits(AstBuiltinCall, _Leaf2);

  var _super2 = _createSuper(AstBuiltinCall);

  function AstBuiltinCall(id, params) {
    var _this2;

    _classCallCheck(this, AstBuiltinCall);

    _this2 = _super2.call(this);
    _this2.id = id;
    _this2.params = params;
    return _this2;
  }

  _createClass(AstBuiltinCall, [{
    key: "dump",
    value: function dump() {
      return {
        builtin: this.id,
        params: this.params.map(function (x) {
          return x.dump();
        })
      };
    }
  }]);

  return AstBuiltinCall;
}(Leaf);

var AstSubscript = /*#__PURE__*/function (_Leaf3) {
  _inherits(AstSubscript, _Leaf3);

  var _super3 = _createSuper(AstSubscript);

  function AstSubscript(operand, index) {
    var _this3;

    _classCallCheck(this, AstSubscript);

    _this3 = _super3.call(this);
    _this3.operand = operand;
    _this3.index = index;
    return _this3;
  }

  _createClass(AstSubscript, [{
    key: "dump",
    value: function dump() {
      return {
        operand: this.operand.dump(),
        index: this.index.dump()
      };
    }
  }]);

  return AstSubscript;
}(Leaf);

var AstBinaryOperator = /*#__PURE__*/function (_Leaf4) {
  _inherits(AstBinaryOperator, _Leaf4);

  var _super4 = _createSuper(AstBinaryOperator);

  function AstBinaryOperator(id, left, right, repr) {
    var _this4;

    _classCallCheck(this, AstBinaryOperator);

    _this4 = _super4.call(this);
    _this4.id = id;
    _this4.left = left;
    _this4.right = right;
    _this4.repr = repr;
    return _this4;
  }

  _createClass(AstBinaryOperator, [{
    key: "dump",
    value: function dump() {
      return {
        operator: this.repr,
        left: this.left.dump(),
        right: this.right.dump()
      };
    }
  }, {
    key: "isDotExpression",
    value: function isDotExpression() {
      return Operators.id.dot <= this.id && this.id <= Operators.id.dotHash;
    }
  }, {
    key: "isSomPredicate",
    value: function isSomPredicate() {
      return this.isDotExpression() || Operators.id.lt <= this.id && this.id <= Operators.id.or && (this.left.isDotExpression() && this.right.isConstant() || this.left.isConstant() && this.right.isDotExpression() || this.left.isDotExpression() && this.right.isDotExpression());
    }
  }], [{
    key: "getOperatorOrValue",
    value: function getOperatorOrValue(operator, left, right) {
      if (!left.isConstant() || !right.isConstant()) {
        return new AstBinaryOperator(operator.id, left, right, operator.repr);
      }

      if (Operators.lt.id <= operator.id && operator.id <= Operators.ne.id && !(left instanceof AstNumber) && !(right instanceof AstNumber)) {
        return new AstNumber(operator.op(left.toComparable(), right.toComparable()));
      }

      return new AstNumber(operator.op(left.toNumber(), right.toNumber()));
    }
  }]);

  return AstBinaryOperator;
}(Leaf);

var AstUnaryOperator = /*#__PURE__*/function (_Leaf5) {
  _inherits(AstUnaryOperator, _Leaf5);

  var _super5 = _createSuper(AstUnaryOperator);

  function AstUnaryOperator(id, arg, repr) {
    var _this5;

    _classCallCheck(this, AstUnaryOperator);

    _this5 = _super5.call(this);
    _this5.id = id;
    _this5.arg = arg;
    _this5.repr = repr;
    return _this5;
  }

  _createClass(AstUnaryOperator, [{
    key: "dump",
    value: function dump() {
      return {
        operator: this.repr,
        arg: this.arg.dump()
      };
    }
  }], [{
    key: "getOperatorOrValue",
    value: function getOperatorOrValue(operator, arg) {
      if (!arg.isConstant()) {
        return new AstUnaryOperator(operator.id, arg, operator.repr);
      }

      return new AstNumber(operator.op(arg.toNumber()));
    }
  }]);

  return AstUnaryOperator;
}(Leaf);

var AstNumber = /*#__PURE__*/function (_Leaf6) {
  _inherits(AstNumber, _Leaf6);

  var _super6 = _createSuper(AstNumber);

  function AstNumber(number) {
    var _this6;

    _classCallCheck(this, AstNumber);

    _this6 = _super6.call(this);
    _this6.number = number;
    return _this6;
  }

  _createClass(AstNumber, [{
    key: "dump",
    value: function dump() {
      return this.number;
    }
  }, {
    key: "isConstant",
    value: function isConstant() {
      return true;
    }
  }, {
    key: "toNumber",
    value: function toNumber() {
      return this.number;
    }
  }]);

  return AstNumber;
}(Leaf);

var AstString = /*#__PURE__*/function (_Leaf7) {
  _inherits(AstString, _Leaf7);

  var _super7 = _createSuper(AstString);

  function AstString(str) {
    var _this7;

    _classCallCheck(this, AstString);

    _this7 = _super7.call(this);
    _this7.str = str;
    return _this7;
  }

  _createClass(AstString, [{
    key: "dump",
    value: function dump() {
      return this.str;
    }
  }, {
    key: "isConstant",
    value: function isConstant() {
      return true;
    }
  }, {
    key: "toNumber",
    value: function toNumber() {
      return !isNaN(this.str) ? parseFloat(this.str) : 0;
    }
  }, {
    key: "toComparable",
    value: function toComparable() {
      return this.str;
    }
  }]);

  return AstString;
}(Leaf);

var AstThis = /*#__PURE__*/function (_Leaf8) {
  _inherits(AstThis, _Leaf8);

  var _super8 = _createSuper(AstThis);

  function AstThis() {
    _classCallCheck(this, AstThis);

    return _super8.apply(this, arguments);
  }

  _createClass(AstThis, [{
    key: "dump",
    value: function dump() {
      return {
        special: "this"
      };
    }
  }]);

  return AstThis;
}(Leaf);

var AstIdentifier = /*#__PURE__*/function (_Leaf9) {
  _inherits(AstIdentifier, _Leaf9);

  var _super9 = _createSuper(AstIdentifier);

  function AstIdentifier(id) {
    var _this8;

    _classCallCheck(this, AstIdentifier);

    _this8 = _super9.call(this);
    _this8.id = id;
    return _this8;
  }

  _createClass(AstIdentifier, [{
    key: "dump",
    value: function dump() {
      return {
        id: this.id
      };
    }
  }, {
    key: "toLowerCase",
    value: function toLowerCase() {
      this.id = this.id.toLowerCase();
    }
  }]);

  return AstIdentifier;
}(Leaf);

var AstNull = /*#__PURE__*/function (_Leaf10) {
  _inherits(AstNull, _Leaf10);

  var _super10 = _createSuper(AstNull);

  function AstNull() {
    _classCallCheck(this, AstNull);

    return _super10.apply(this, arguments);
  }

  _createClass(AstNull, [{
    key: "dump",
    value: function dump() {
      return {
        special: null
      };
    }
  }, {
    key: "isConstant",
    value: function isConstant() {
      return true;
    }
  }, {
    key: "toComparable",
    value: function toComparable() {
      return null;
    }
  }]);

  return AstNull;
}(Leaf);

var AstEveryOccurence = /*#__PURE__*/function () {
  function AstEveryOccurence() {
    _classCallCheck(this, AstEveryOccurence);
  }

  _createClass(AstEveryOccurence, [{
    key: "dump",
    value: function dump() {
      return {
        special: "*"
      };
    }
  }]);

  return AstEveryOccurence;
}();

var VarDecl = /*#__PURE__*/function (_Leaf11) {
  _inherits(VarDecl, _Leaf11);

  var _super11 = _createSuper(VarDecl);

  function VarDecl(id, expr) {
    var _this9;

    _classCallCheck(this, VarDecl);

    _this9 = _super11.call(this);
    _this9.id = id;
    _this9.expr = expr;
    return _this9;
  }

  _createClass(VarDecl, [{
    key: "dump",
    value: function dump() {
      return {
        "var": this.id,
        expr: this.expr.dump()
      };
    }
  }]);

  return VarDecl;
}(Leaf);

var Assignment = /*#__PURE__*/function (_Leaf12) {
  _inherits(Assignment, _Leaf12);

  var _super12 = _createSuper(Assignment);

  function Assignment(id, expr) {
    var _this10;

    _classCallCheck(this, Assignment);

    _this10 = _super12.call(this);
    _this10.id = id;
    _this10.expr = expr;
    return _this10;
  }

  _createClass(Assignment, [{
    key: "dump",
    value: function dump() {
      return {
        assignment: this.id,
        expr: this.expr.dump()
      };
    }
  }]);

  return Assignment;
}(Leaf);

var FuncDecl = /*#__PURE__*/function (_Leaf13) {
  _inherits(FuncDecl, _Leaf13);

  var _super13 = _createSuper(FuncDecl);

  function FuncDecl(id, params, body) {
    var _this11;

    _classCallCheck(this, FuncDecl);

    _this11 = _super13.call(this);
    _this11.id = id;
    _this11.params = params;
    _this11.body = body;
    return _this11;
  }

  _createClass(FuncDecl, [{
    key: "dump",
    value: function dump() {
      return {
        func: this.id,
        params: this.params,
        body: this.body.dump()
      };
    }
  }]);

  return FuncDecl;
}(Leaf);

var IfDecl = /*#__PURE__*/function (_Leaf14) {
  _inherits(IfDecl, _Leaf14);

  var _super14 = _createSuper(IfDecl);

  function IfDecl(condition, thenClause, elseIfClause, elseClause) {
    var _this12;

    _classCallCheck(this, IfDecl);

    _this12 = _super14.call(this);
    _this12.condition = condition;
    _this12.then = thenClause;
    _this12.elseif = elseIfClause;
    _this12["else"] = elseClause;
    return _this12;
  }

  _createClass(IfDecl, [{
    key: "dump",
    value: function dump() {
      return {
        decl: "if",
        condition: this.condition.dump(),
        then: this.then.dump(),
        elseif: this.elseif ? this.elseif.map(function (x) {
          return x.dump();
        }) : null,
        "else": this["else"] ? this["else"].dump() : null
      };
    }
  }]);

  return IfDecl;
}(Leaf);

var ElseIfDecl = /*#__PURE__*/function (_Leaf15) {
  _inherits(ElseIfDecl, _Leaf15);

  var _super15 = _createSuper(ElseIfDecl);

  function ElseIfDecl(condition, thenClause) {
    var _this13;

    _classCallCheck(this, ElseIfDecl);

    _this13 = _super15.call(this);
    _this13.condition = condition;
    _this13.then = thenClause;
    return _this13;
  }

  _createClass(ElseIfDecl, [{
    key: "dump",
    value: function dump() {
      return {
        decl: "elseif",
        condition: this.condition.dump(),
        then: this.then.dump()
      };
    }
  }]);

  return ElseIfDecl;
}(Leaf);

var WhileDecl = /*#__PURE__*/function (_Leaf16) {
  _inherits(WhileDecl, _Leaf16);

  var _super16 = _createSuper(WhileDecl);

  function WhileDecl(condition, whileClause) {
    var _this14;

    _classCallCheck(this, WhileDecl);

    _this14 = _super16.call(this);
    _this14.condition = condition;
    _this14.body = whileClause;
    return _this14;
  }

  _createClass(WhileDecl, [{
    key: "dump",
    value: function dump() {
      return {
        decl: "while",
        condition: this.condition.dump(),
        body: this.body.dump()
      };
    }
  }]);

  return WhileDecl;
}(Leaf);

var ForDecl = /*#__PURE__*/function (_Leaf17) {
  _inherits(ForDecl, _Leaf17);

  var _super17 = _createSuper(ForDecl);

  function ForDecl(assignment, upto, end, step, body) {
    var _this15;

    _classCallCheck(this, ForDecl);

    _this15 = _super17.call(this);
    _this15.assignment = assignment;
    _this15.upto = upto;
    _this15.end = end;
    _this15.step = step;
    _this15.body = body;
    return _this15;
  }

  _createClass(ForDecl, [{
    key: "dump",
    value: function dump() {
      return {
        decl: "for",
        assignment: this.assignment.dump(),
        type: this.upto ? "upto" : "downto",
        end: this.end.dump(),
        step: this.step ? this.step.dump() : null,
        body: this.body.dump()
      };
    }
  }]);

  return ForDecl;
}(Leaf);

var ForeachDecl = /*#__PURE__*/function (_Leaf18) {
  _inherits(ForeachDecl, _Leaf18);

  var _super18 = _createSuper(ForeachDecl);

  function ForeachDecl(id, params, body) {
    var _this16;

    _classCallCheck(this, ForeachDecl);

    _this16 = _super18.call(this);
    _this16.id = id;
    _this16.params = params;
    _this16.body = body;
    return _this16;
  }

  _createClass(ForeachDecl, [{
    key: "dump",
    value: function dump() {
      return {
        decl: "foreach",
        id: this.id,
        params: this.params.map(function (x) {
          return x.dump();
        }),
        body: this.body.dump()
      };
    }
  }]);

  return ForeachDecl;
}(Leaf);

var BlockDecl = /*#__PURE__*/function (_Leaf19) {
  _inherits(BlockDecl, _Leaf19);

  var _super19 = _createSuper(BlockDecl);

  function BlockDecl(body) {
    var _this17;

    _classCallCheck(this, BlockDecl);

    _this17 = _super19.call(this);
    _this17.body = body;
    return _this17;
  }

  _createClass(BlockDecl, [{
    key: "dump",
    value: function dump() {
      return {
        decl: "block",
        body: this.body.dump()
      };
    }
  }]);

  return BlockDecl;
}(Leaf);

var ExprList = /*#__PURE__*/function (_Leaf20) {
  _inherits(ExprList, _Leaf20);

  var _super20 = _createSuper(ExprList);

  function ExprList(expressions) {
    var _this18;

    _classCallCheck(this, ExprList);

    _this18 = _super20.call(this);
    _this18.expressions = expressions;
    return _this18;
  }

  _createClass(ExprList, [{
    key: "dump",
    value: function dump() {
      return this.expressions.map(function (x) {
        return x.dump();
      });
    }
  }]);

  return ExprList;
}(Leaf);

var BreakDecl = /*#__PURE__*/function (_Leaf21) {
  _inherits(BreakDecl, _Leaf21);

  var _super21 = _createSuper(BreakDecl);

  function BreakDecl() {
    _classCallCheck(this, BreakDecl);

    return _super21.apply(this, arguments);
  }

  _createClass(BreakDecl, [{
    key: "dump",
    value: function dump() {
      return {
        special: "break"
      };
    }
  }]);

  return BreakDecl;
}(Leaf);

var ContinueDecl = /*#__PURE__*/function (_Leaf22) {
  _inherits(ContinueDecl, _Leaf22);

  var _super22 = _createSuper(ContinueDecl);

  function ContinueDecl() {
    _classCallCheck(this, ContinueDecl);

    return _super22.apply(this, arguments);
  }

  _createClass(ContinueDecl, [{
    key: "dump",
    value: function dump() {
      return {
        special: "continue"
      };
    }
  }]);

  return ContinueDecl;
}(Leaf);

var Parser = /*#__PURE__*/function () {
  function Parser(code) {
    _classCallCheck(this, Parser);

    this.lexer = new _formcalc_lexer.Lexer(code);
  }

  _createClass(Parser, [{
    key: "parse",
    value: function parse() {
      var _this$parseExprList = this.parseExprList(),
          _this$parseExprList2 = _slicedToArray(_this$parseExprList, 2),
          tok = _this$parseExprList2[0],
          decls = _this$parseExprList2[1];

      if (tok.id !== _formcalc_lexer.TOKEN.eof) {
        throw new Error("Invalid token in Form code");
      }

      return decls;
    }
  }, {
    key: "parseExprList",
    value: function parseExprList() {
      var expressions = [];
      var tok = null,
          expr;

      while (true) {
        var _this$parseExpr = this.parseExpr(tok);

        var _this$parseExpr2 = _slicedToArray(_this$parseExpr, 2);

        tok = _this$parseExpr2[0];
        expr = _this$parseExpr2[1];

        if (!expr) {
          return [tok, new ExprList(expressions)];
        }

        expressions.push(expr);
      }
    }
  }, {
    key: "parseExpr",
    value: function parseExpr(tok) {
      tok = tok || this.lexer.next();

      switch (tok.id) {
        case _formcalc_lexer.TOKEN.identifier:
          return this.parseAssigmentOrExpr(tok);

        case _formcalc_lexer.TOKEN["break"]:
          return [null, new BreakDecl()];

        case _formcalc_lexer.TOKEN["continue"]:
          return [null, new ContinueDecl()];

        case _formcalc_lexer.TOKEN["do"]:
          return this.parseBlock();

        case _formcalc_lexer.TOKEN["for"]:
          return this.parseFor();

        case _formcalc_lexer.TOKEN.foreach:
          return this.parseForeach();

        case _formcalc_lexer.TOKEN.func:
          return this.parseFuncDecl();

        case _formcalc_lexer.TOKEN["if"]:
          return this.parseIf();

        case _formcalc_lexer.TOKEN["var"]:
          return this.parseVarDecl();

        case _formcalc_lexer.TOKEN["while"]:
          return this.parseWhile();

        default:
          return this.parseSimpleExpr(tok);
      }
    }
  }, {
    key: "parseAssigmentOrExpr",
    value: function parseAssigmentOrExpr(tok) {
      var savedTok = tok;
      tok = this.lexer.next();

      if (tok.id === _formcalc_lexer.TOKEN.assign) {
        var _this$parseSimpleExpr = this.parseSimpleExpr(null),
            _this$parseSimpleExpr2 = _slicedToArray(_this$parseSimpleExpr, 2),
            tok1 = _this$parseSimpleExpr2[0],
            expr = _this$parseSimpleExpr2[1];

        return [tok1, new Assignment(savedTok.value, expr)];
      }

      var parser = new SimpleExprParser(this.lexer);
      parser.pushOperand(new AstIdentifier(savedTok.value));
      return parser.parse(tok);
    }
  }, {
    key: "parseBlock",
    value: function parseBlock() {
      var _this$parseExprList3 = this.parseExprList(),
          _this$parseExprList4 = _slicedToArray(_this$parseExprList3, 2),
          tok1 = _this$parseExprList4[0],
          body = _this$parseExprList4[1];

      var tok = tok1 || this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.end) {
        throw new Error(Errors.block);
      }

      return [null, new BlockDecl(body)];
    }
  }, {
    key: "parseVarDecl",
    value: function parseVarDecl() {
      var tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.identifier) {
        throw new Error(Errors["var"]);
      }

      var identifier = tok.value;
      tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.assign) {
        return [tok, new VarDecl(identifier, null)];
      }

      var _this$parseSimpleExpr3 = this.parseSimpleExpr(),
          _this$parseSimpleExpr4 = _slicedToArray(_this$parseSimpleExpr3, 2),
          tok1 = _this$parseSimpleExpr4[0],
          expr = _this$parseSimpleExpr4[1];

      return [tok1, new VarDecl(identifier, expr)];
    }
  }, {
    key: "parseFuncDecl",
    value: function parseFuncDecl() {
      var tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.identifier) {
        throw new Error(Errors.func);
      }

      var identifier = tok.value;
      var params = this.parseParamList();
      tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN["do"]) {
        throw new Error(Errors.func);
      }

      var _this$parseExprList5 = this.parseExprList(),
          _this$parseExprList6 = _slicedToArray(_this$parseExprList5, 2),
          tok1 = _this$parseExprList6[0],
          body = _this$parseExprList6[1];

      tok = tok1 || this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.endfunc) {
        throw new Error(Errors.func);
      }

      return [null, new FuncDecl(identifier, params, body)];
    }
  }, {
    key: "parseParamList",
    value: function parseParamList() {
      var params = [];
      var tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.leftParen) {
        throw new Error(Errors.func);
      }

      tok = this.lexer.next();

      if (tok.id === _formcalc_lexer.TOKEN.rightParen) {
        return params;
      }

      while (true) {
        if (tok.id !== _formcalc_lexer.TOKEN.identifier) {
          throw new Error(Errors.func);
        }

        params.push(tok.value);
        tok = this.lexer.next();

        if (tok.id === _formcalc_lexer.TOKEN.rightParen) {
          return params;
        }

        if (tok.id !== _formcalc_lexer.TOKEN.comma) {
          throw new Error(Errors.func);
        }

        tok = this.lexer.next();
      }
    }
  }, {
    key: "parseSimpleExpr",
    value: function parseSimpleExpr() {
      var tok = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return new SimpleExprParser(this.lexer).parse(tok);
    }
  }, {
    key: "parseIf",
    value: function parseIf() {
      var elseIfClause = [];
      var tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.leftParen) {
        throw new Error(Errors["if"]);
      }

      var _this$parseSimpleExpr5 = this.parseSimpleExpr(),
          _this$parseSimpleExpr6 = _slicedToArray(_this$parseSimpleExpr5, 2),
          tok1 = _this$parseSimpleExpr6[0],
          condition = _this$parseSimpleExpr6[1];

      tok = tok1 || this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.rightParen) {
        throw new Error(Errors["if"]);
      }

      tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.then) {
        throw new Error(Errors["if"]);
      }

      var _this$parseExprList7 = this.parseExprList(),
          _this$parseExprList8 = _slicedToArray(_this$parseExprList7, 2),
          tok2 = _this$parseExprList8[0],
          thenClause = _this$parseExprList8[1];

      tok = tok2 || this.lexer.next();

      while (tok.id === _formcalc_lexer.TOKEN.elseif) {
        tok = this.lexer.next();

        if (tok.id !== _formcalc_lexer.TOKEN.leftParen) {
          throw new Error(Errors.elseif);
        }

        var _this$parseSimpleExpr7 = this.parseSimpleExpr(),
            _this$parseSimpleExpr8 = _slicedToArray(_this$parseSimpleExpr7, 2),
            tok3 = _this$parseSimpleExpr8[0],
            elseIfCondition = _this$parseSimpleExpr8[1];

        tok = tok3 || this.lexer.next();

        if (tok.id !== _formcalc_lexer.TOKEN.rightParen) {
          throw new Error(Errors.elseif);
        }

        tok = this.lexer.next();

        if (tok.id !== _formcalc_lexer.TOKEN.then) {
          throw new Error(Errors.elseif);
        }

        var _this$parseExprList9 = this.parseExprList(),
            _this$parseExprList10 = _slicedToArray(_this$parseExprList9, 2),
            tok4 = _this$parseExprList10[0],
            elseIfThenClause = _this$parseExprList10[1];

        elseIfClause.push(new ElseIfDecl(elseIfCondition, elseIfThenClause));
        tok = tok4 || this.lexer.next();
      }

      if (elseIfClause.length === 0) {
        elseIfClause = null;
      }

      if (tok.id === _formcalc_lexer.TOKEN.endif) {
        return [null, new IfDecl(condition, thenClause, elseIfClause, null)];
      }

      if (tok.id !== _formcalc_lexer.TOKEN["else"]) {
        throw new Error(Errors["if"]);
      }

      var _this$parseExprList11 = this.parseExprList(),
          _this$parseExprList12 = _slicedToArray(_this$parseExprList11, 2),
          tok5 = _this$parseExprList12[0],
          elseClause = _this$parseExprList12[1];

      tok = tok5 || this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.endif) {
        throw new Error(Errors["if"]);
      }

      return [null, new IfDecl(condition, thenClause, elseIfClause, elseClause)];
    }
  }, {
    key: "parseWhile",
    value: function parseWhile() {
      var tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.leftParen) {
        throw new Error(Errors["while"]);
      }

      var _this$parseSimpleExpr9 = this.parseSimpleExpr(),
          _this$parseSimpleExpr10 = _slicedToArray(_this$parseSimpleExpr9, 2),
          tok1 = _this$parseSimpleExpr10[0],
          condition = _this$parseSimpleExpr10[1];

      tok = tok1 || this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.rightParen) {
        throw new Error(Errors["while"]);
      }

      tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN["do"]) {
        throw new Error(Errors["while"]);
      }

      var _this$parseExprList13 = this.parseExprList(),
          _this$parseExprList14 = _slicedToArray(_this$parseExprList13, 2),
          tok2 = _this$parseExprList14[0],
          whileClause = _this$parseExprList14[1];

      tok = tok2 || this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.endwhile) {
        throw new Error(Errors["while"]);
      }

      return [null, new WhileDecl(condition, whileClause)];
    }
  }, {
    key: "parseAssignment",
    value: function parseAssignment() {
      var tok = this.lexer.next();
      var hasVar = false;

      if (tok.id === _formcalc_lexer.TOKEN["var"]) {
        hasVar = true;
        tok = this.lexer.next();
      }

      if (tok.id !== _formcalc_lexer.TOKEN.identifier) {
        throw new Error(Errors.assignment);
      }

      var identifier = tok.value;
      tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.assign) {
        throw new Error(Errors.assignment);
      }

      var _this$parseSimpleExpr11 = this.parseSimpleExpr(),
          _this$parseSimpleExpr12 = _slicedToArray(_this$parseSimpleExpr11, 2),
          tok1 = _this$parseSimpleExpr12[0],
          expr = _this$parseSimpleExpr12[1];

      if (hasVar) {
        return [tok1, new VarDecl(identifier, expr)];
      }

      return [tok1, new Assignment(identifier, expr)];
    }
  }, {
    key: "parseFor",
    value: function parseFor() {
      var tok,
          step = null;
      var upto = false;

      var _this$parseAssignment = this.parseAssignment(),
          _this$parseAssignment2 = _slicedToArray(_this$parseAssignment, 2),
          tok1 = _this$parseAssignment2[0],
          assignment = _this$parseAssignment2[1];

      tok = tok1 || this.lexer.next();

      if (tok.id === _formcalc_lexer.TOKEN.upto) {
        upto = true;
      } else if (tok.id !== _formcalc_lexer.TOKEN.downto) {
        throw new Error(Errors["for"]);
      }

      var _this$parseSimpleExpr13 = this.parseSimpleExpr(),
          _this$parseSimpleExpr14 = _slicedToArray(_this$parseSimpleExpr13, 2),
          tok2 = _this$parseSimpleExpr14[0],
          end = _this$parseSimpleExpr14[1];

      tok = tok2 || this.lexer.next();

      if (tok.id === _formcalc_lexer.TOKEN.step) {
        var _this$parseSimpleExpr15 = this.parseSimpleExpr();

        var _this$parseSimpleExpr16 = _slicedToArray(_this$parseSimpleExpr15, 2);

        tok = _this$parseSimpleExpr16[0];
        step = _this$parseSimpleExpr16[1];
        tok = tok || this.lexer.next();
      }

      if (tok.id !== _formcalc_lexer.TOKEN["do"]) {
        throw new Error(Errors["for"]);
      }

      var _this$parseExprList15 = this.parseExprList(),
          _this$parseExprList16 = _slicedToArray(_this$parseExprList15, 2),
          tok3 = _this$parseExprList16[0],
          body = _this$parseExprList16[1];

      tok = tok3 || this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.endfor) {
        throw new Error(Errors["for"]);
      }

      return [null, new ForDecl(assignment, upto, end, step, body)];
    }
  }, {
    key: "parseForeach",
    value: function parseForeach() {
      var tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.identifier) {
        throw new Error(Errors.foreach);
      }

      var identifier = tok.value;
      tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN["in"]) {
        throw new Error(Errors.foreach);
      }

      tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.leftParen) {
        throw new Error(Errors.foreach);
      }

      var params = SimpleExprParser.parseParams(this.lexer);
      tok = this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN["do"]) {
        throw new Error(Errors.foreach);
      }

      var _this$parseExprList17 = this.parseExprList(),
          _this$parseExprList18 = _slicedToArray(_this$parseExprList17, 2),
          tok1 = _this$parseExprList18[0],
          body = _this$parseExprList18[1];

      tok = tok1 || this.lexer.next();

      if (tok.id !== _formcalc_lexer.TOKEN.endfor) {
        throw new Error(Errors.foreach);
      }

      return [null, new ForeachDecl(identifier, params, body)];
    }
  }]);

  return Parser;
}();

exports.Parser = Parser;