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

var _formcalc_parser = require("../../core/xfa/formcalc_parser.js");

var _formcalc_lexer = require("../../core/xfa/formcalc_lexer.js");

describe("FormCalc expression parser", function () {
  var EOF = new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.eof);
  describe("FormCalc lexer", function () {
    it("should lex numbers", function () {
      var lexer = new _formcalc_lexer.Lexer("12 1.2345 .7 .12345 1e-2 1.2E+3 1e2 1.2E3 nan 12. 2.e3 infinity 99999999999999999 123456789.012345678 9e99999");
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 12));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 1.2345));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 0.7));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 0.12345));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 1e-2));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 1.2e3));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 1e2));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 1.2e3));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, NaN));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 12));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 2e3));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, Infinity));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 100000000000000000));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 123456789.01234567));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, Infinity));
      expect(lexer.next()).toEqual(EOF);
    });
    it("should lex strings", function () {
      var lexer = new _formcalc_lexer.Lexer("\"hello world\" \"hello \"\"world\" \"hello \"\"world\"\" \"\"world\"\"\"\"hello\"\"\" \"hello \\uabcdeh \\Uabcd \\u00000123abc\" \"a \\a \\ub \\Uc \\b\"");
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.string, "hello world"));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.string, "hello \"world"));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.string, "hello \"world\" \"world\"\"hello\""));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.string, "hello \uABCDeh \uABCD \u0123abc"));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.string, "a \\a \\ub \\Uc \\b"));
      expect(lexer.next()).toEqual(EOF);
    });
    it("should lex operators", function () {
      var lexer = new _formcalc_lexer.Lexer("( , ) <= <> = == >= < > / * . .* .# [ ] & |");
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.leftParen));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.comma));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.rightParen));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.le));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.ne));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.assign));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.eq));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.ge));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.lt));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.gt));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.divide));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.times));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.dot));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.dotStar));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.dotHash));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.leftBracket));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.rightBracket));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.and));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.or));
      expect(lexer.next()).toEqual(EOF);
    });
    it("should skip comments", function () {
      var lexer = new _formcalc_lexer.Lexer("\n\n  \t\t  1 \r\n\r\n\n\n  ;  blah blah blah\n\n  2\n\n  // blah blah blah blah blah\n\n\n  3\n      ");
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 1));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 2));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.number, 3));
      expect(lexer.next()).toEqual(EOF);
    });
    it("should lex identifiers", function () {
      var lexer = new _formcalc_lexer.Lexer("eq for fore while continue hello こんにちは世界 $!hello今日は12今日は");
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.eq));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN["for"]));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.identifier, "fore"));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN["while"]));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN["continue"]));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.identifier, "hello"));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.identifier, "こんにちは世界"));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.identifier, "$"));
      expect(lexer.next()).toEqual(new _formcalc_lexer.Token(_formcalc_lexer.TOKEN.identifier, "!hello今日は12今日は"));
      expect(lexer.next()).toEqual(EOF);
    });
  });
  describe("FormCalc parser", function () {
    it("should parse basic arithmetic expression", function () {
      var parser = new _formcalc_parser.Parser("1 + 2 * 3");
      expect(parser.parse().dump()[0]).toEqual(7);
    });
    it("should parse basic arithmetic expression with the same operator", function () {
      var parser = new _formcalc_parser.Parser("1 + a + 3");
      expect(parser.parse().dump()[0]).toEqual({
        operator: "+",
        left: {
          operator: "+",
          left: 1,
          right: {
            id: "a"
          }
        },
        right: 3
      });
    });
    it("should parse expressions with unary operators", function () {
      var parser = new _formcalc_parser.Parser("\n  s = +x + 1\n  t = -+u * 2\n  t = +-u * 2\n  u = -foo()\n      ");
      expect(parser.parse().dump()).toEqual([{
        assignment: "s",
        expr: {
          operator: "+",
          left: {
            operator: "+",
            arg: {
              id: "x"
            }
          },
          right: 1
        }
      }, {
        assignment: "t",
        expr: {
          operator: "*",
          left: {
            operator: "-",
            arg: {
              operator: "+",
              arg: {
                id: "u"
              }
            }
          },
          right: 2
        }
      }, {
        assignment: "t",
        expr: {
          operator: "*",
          left: {
            operator: "+",
            arg: {
              operator: "-",
              arg: {
                id: "u"
              }
            }
          },
          right: 2
        }
      }, {
        assignment: "u",
        expr: {
          operator: "-",
          arg: {
            callee: {
              id: "foo"
            },
            params: []
          }
        }
      }]);
    });
    it("should parse basic expression with a string", function () {
      var parser = new _formcalc_parser.Parser("(5 - \"abc\") * 3");
      expect(parser.parse().dump()[0]).toEqual(15);
    });
    it("should parse basic expression with a calls", function () {
      var parser = new _formcalc_parser.Parser("foo(2, 3, a & b) or c * d + 1.234 / e");
      expect(parser.parse().dump()[0]).toEqual({
        operator: "||",
        left: {
          callee: {
            id: "foo"
          },
          params: [2, 3, {
            operator: "&&",
            left: {
              id: "a"
            },
            right: {
              id: "b"
            }
          }]
        },
        right: {
          operator: "+",
          left: {
            operator: "*",
            left: {
              id: "c"
            },
            right: {
              id: "d"
            }
          },
          right: {
            operator: "/",
            left: 1.234,
            right: {
              id: "e"
            }
          }
        }
      });
    });
    it("should parse basic expression with a subscript", function () {
      var parser = new _formcalc_parser.Parser("\u3053\u3093\u306B\u3061\u306F\u4E16\u754C[-0]");
      var dump = parser.parse().dump()[0];
      expect(dump).toEqual({
        operand: {
          id: "こんにちは世界"
        },
        index: -0
      });
      expect(Object.is(-0, dump.index)).toBe(true);
      parser = new _formcalc_parser.Parser("\u3053\u3093\u306B\u3061\u306F\u4E16\u754C[+0]");
      dump = parser.parse().dump()[0];
      expect(dump).toEqual({
        operand: {
          id: "こんにちは世界"
        },
        index: +0
      });
      expect(Object.is(+0, dump.index)).toBe(true);
      parser = new _formcalc_parser.Parser("\u3053\u3093\u306B\u3061\u306F\u4E16\u754C[*]");
      expect(parser.parse().dump()[0]).toEqual({
        operand: {
          id: "こんにちは世界"
        },
        index: {
          special: "*"
        }
      });
    });
    it("should parse basic expression with dots", function () {
      var parser = new _formcalc_parser.Parser("a.b.c.#d..e.f..g.*");
      expect(parser.parse().dump()[0]).toEqual({
        operator: ".",
        left: {
          id: "a"
        },
        right: {
          operator: ".",
          left: {
            id: "b"
          },
          right: {
            operator: ".#",
            left: {
              id: "c"
            },
            right: {
              operator: "..",
              left: {
                id: "d"
              },
              right: {
                operator: ".",
                left: {
                  id: "e"
                },
                right: {
                  operator: "..",
                  left: {
                    id: "f"
                  },
                  right: {
                    operator: ".",
                    left: {
                      id: "g"
                    },
                    right: {
                      special: "*"
                    }
                  }
                }
              }
            }
          }
        }
      });
    });
    it("should parse var declaration with error", function () {
      var parser = new _formcalc_parser.Parser("var 123 = a");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["var"]));
      parser = new _formcalc_parser.Parser("var \"123\" = a");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["var"]));
      parser = new _formcalc_parser.Parser("var for var a");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["var"]));
    });
    it("should parse for declaration with a step", function () {
      var parser = new _formcalc_parser.Parser("\nvar s = 0\nfor var i = 1 upto 10 + x step 1 do\n  s = s + i * 2\nendfor");
      expect(parser.parse().dump()).toEqual([{
        "var": "s",
        expr: 0
      }, {
        decl: "for",
        assignment: {
          "var": "i",
          expr: 1
        },
        type: "upto",
        end: {
          operator: "+",
          left: 10,
          right: {
            id: "x"
          }
        },
        step: 1,
        body: [{
          assignment: "s",
          expr: {
            operator: "+",
            left: {
              id: "s"
            },
            right: {
              operator: "*",
              left: {
                id: "i"
              },
              right: 2
            }
          }
        }]
      }]);
    });
    it("should parse for declaration without a step", function () {
      var parser = new _formcalc_parser.Parser("\nfor i = 1 + 2 downto 10 do\n  s = foo()\nendfor");
      expect(parser.parse().dump()).toEqual([{
        decl: "for",
        assignment: {
          assignment: "i",
          expr: 3
        },
        type: "downto",
        end: 10,
        step: null,
        body: [{
          assignment: "s",
          expr: {
            callee: {
              id: "foo"
            },
            params: []
          }
        }]
      }]);
    });
    it("should parse for declaration with error", function () {
      var parser = new _formcalc_parser.Parser("for 123 = i upto 1 do a = 1 endfor");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.assignment));
      parser = new _formcalc_parser.Parser("for var 123 = i upto 1 do a = 1 endfor");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.assignment));
      parser = new _formcalc_parser.Parser("for var i = 123 upt 1 do a = 1 endfor");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["for"]));
      parser = new _formcalc_parser.Parser("for var i = 123 var 1 do a = 1 endfor");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["for"]));
      parser = new _formcalc_parser.Parser("for var i = 123 upto 1 step for var j = 1 do endfor do a = 1 endfor");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["for"]));
      parser = new _formcalc_parser.Parser("for var i = 123 downto 1 do a = 1 endfunc");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["for"]));
      parser = new _formcalc_parser.Parser("for var i = 123 downto 1 do a = 1");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["for"]));
    });
    it("should parse foreach declaration", function () {
      var parser = new _formcalc_parser.Parser("\nforeach i in (a, b, c, d) do\n  s = foo()[i]\nendfor");
      expect(parser.parse().dump()).toEqual([{
        decl: "foreach",
        id: "i",
        params: [{
          id: "a"
        }, {
          id: "b"
        }, {
          id: "c"
        }, {
          id: "d"
        }],
        body: [{
          assignment: "s",
          expr: {
            operand: {
              callee: {
                id: "foo"
              },
              params: []
            },
            index: {
              id: "i"
            }
          }
        }]
      }]);
    });
    it("should parse foreach declaration with error", function () {
      var parser = new _formcalc_parser.Parser("foreach 123 in (1, 2, 3) do a = 1 endfor");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.foreach));
      parser = new _formcalc_parser.Parser("foreach foo in 1, 2, 3) do a = 1 endfor");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.foreach));
      parser = new _formcalc_parser.Parser("foreach foo in (1, 2, 3 do a = 1 endfor");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.params));
      parser = new _formcalc_parser.Parser("foreach foo in (1, 2 3) do a = 1 endfor");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.params));
      parser = new _formcalc_parser.Parser("foreach foo in (1, 2, 3) od a = 1 endfor");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.foreach));
      parser = new _formcalc_parser.Parser("foreach foo in (1, 2, 3) do a = 1 endforeach");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.foreach));
      parser = new _formcalc_parser.Parser("foreach foo in (1, 2, 3) do a = 1  123");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.foreach));
    });
    it("should parse while declaration", function () {
      var parser = new _formcalc_parser.Parser("\nwhile (1) do\n  if (0) then\n    break\n  else\n    continue\n  endif\nendwhile\n      ");
      expect(parser.parse().dump()).toEqual([{
        decl: "while",
        condition: 1,
        body: [{
          decl: "if",
          condition: 0,
          then: [{
            special: "break"
          }],
          elseif: null,
          "else": [{
            special: "continue"
          }]
        }]
      }]);
    });
    it("should parse while declaration with error", function () {
      var parser = new _formcalc_parser.Parser("while a == 1 do a = 2 endwhile");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["while"]));
      parser = new _formcalc_parser.Parser("while (a == 1 do a = 2 endwhile");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["while"]));
      parser = new _formcalc_parser.Parser("while (a == 1) var a = 2 endwhile");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["while"]));
      parser = new _formcalc_parser.Parser("while (a == 1) do var a = 2 end");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["while"]));
    });
    it("should parse do declaration", function () {
      var parser = new _formcalc_parser.Parser("\ndo\n  x = 1\n; a comment in the middle of the block\n  y = 2\nend\n    ");
      expect(parser.parse().dump()).toEqual([{
        decl: "block",
        body: [{
          assignment: "x",
          expr: 1
        }, {
          assignment: "y",
          expr: 2
        }]
      }]);
    });
    it("should parse do declaration with error", function () {
      var parser = new _formcalc_parser.Parser("\ndo\n  x = 1\n  y = 2\nendfunc\n      ");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.block));
    });
    it("should parse func declaration", function () {
      var parser = new _formcalc_parser.Parser("\nfunc \u3053\u3093\u306B\u3061\u306F\u4E16\u754C123(a, b) do\n  a + b\nendfunc\n      ");
      expect(parser.parse().dump()).toEqual([{
        func: "こんにちは世界123",
        params: ["a", "b"],
        body: [{
          operator: "+",
          left: {
            id: "a"
          },
          right: {
            id: "b"
          }
        }]
      }]);
    });
    it("should parse func declaration with error", function () {
      var parser = new _formcalc_parser.Parser("func 123(a, b) do a = 1 endfunc");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.func));
      parser = new _formcalc_parser.Parser("func foo(a, b) for a = 1 endfunc");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.func));
      parser = new _formcalc_parser.Parser("func foo(a, b) do a = 1 endfun");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.func));
      parser = new _formcalc_parser.Parser("func foo(a, b, c do a = 1 endfunc");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.func));
      parser = new _formcalc_parser.Parser("func foo(a, b, 123) do a = 1 endfunc");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors.func));
    });
    it("should parse if declaration", function () {
      var parser = new _formcalc_parser.Parser("\n  if (a & b) then\n    var s = 1\n  endif\n\n  if (a or b) then\n    var s = 1\n  else\n    var x = 2\n  endif\n\n  if (0) then\n    s = 1\n  elseif (1) then\n    s = 2\n  elseif (2) then\n    s = 3\n  elseif (3) then\n    s = 4\n  else\n    s = 5\n  endif\n\n// a comment\n\n  if (0) then\n    s = 1\n  elseif (1) then\n    s = 2\n  endif\n      ");
      expect(parser.parse().dump()).toEqual([{
        decl: "if",
        condition: {
          operator: "&&",
          left: {
            id: "a"
          },
          right: {
            id: "b"
          }
        },
        then: [{
          "var": "s",
          expr: 1
        }],
        elseif: null,
        "else": null
      }, {
        decl: "if",
        condition: {
          operator: "||",
          left: {
            id: "a"
          },
          right: {
            id: "b"
          }
        },
        then: [{
          "var": "s",
          expr: 1
        }],
        elseif: null,
        "else": [{
          "var": "x",
          expr: 2
        }]
      }, {
        decl: "if",
        condition: 0,
        then: [{
          assignment: "s",
          expr: 1
        }],
        elseif: [{
          decl: "elseif",
          condition: 1,
          then: [{
            assignment: "s",
            expr: 2
          }]
        }, {
          decl: "elseif",
          condition: 2,
          then: [{
            assignment: "s",
            expr: 3
          }]
        }, {
          decl: "elseif",
          condition: 3,
          then: [{
            assignment: "s",
            expr: 4
          }]
        }],
        "else": [{
          assignment: "s",
          expr: 5
        }]
      }, {
        decl: "if",
        condition: 0,
        then: [{
          assignment: "s",
          expr: 1
        }],
        elseif: [{
          decl: "elseif",
          condition: 1,
          then: [{
            assignment: "s",
            expr: 2
          }]
        }],
        "else": null
      }]);
    });
    it("should parse if declaration with error", function () {
      var parser = new _formcalc_parser.Parser("if foo == 1 then a = 1 endif");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["if"]));
      parser = new _formcalc_parser.Parser("if (foo == 1 then a = 1 endif");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["if"]));
      parser = new _formcalc_parser.Parser("if (foo == 1) then a = 1 elseiff (foo == 2) then a = 2 endif");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["if"]));
      parser = new _formcalc_parser.Parser("if (foo == 1) then a = 1 elseif (foo == 2) then a = 2 end");
      expect(function () {
        return parser.parse();
      }).toThrow(new Error(_formcalc_parser.Errors["if"]));
    });
  });
});