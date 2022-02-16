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
exports.PostScriptEvaluator = exports.PostScriptCompiler = exports.PDFFunctionFactory = void 0;
exports.isPDFFunction = isPDFFunction;

var _primitives = require("./primitives.js");

var _util = require("../shared/util.js");

var _ps_parser = require("./ps_parser.js");

var _image_utils = require("./image_utils.js");

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PDFFunctionFactory = /*#__PURE__*/function () {
  function PDFFunctionFactory(_ref) {
    var xref = _ref.xref,
        _ref$isEvalSupported = _ref.isEvalSupported,
        isEvalSupported = _ref$isEvalSupported === void 0 ? true : _ref$isEvalSupported;

    _classCallCheck(this, PDFFunctionFactory);

    this.xref = xref;
    this.isEvalSupported = isEvalSupported !== false;
  }

  _createClass(PDFFunctionFactory, [{
    key: "create",
    value: function create(fn) {
      var cachedFunction = this.getCached(fn);

      if (cachedFunction) {
        return cachedFunction;
      }

      var parsedFunction = PDFFunction.parse({
        xref: this.xref,
        isEvalSupported: this.isEvalSupported,
        fn: fn instanceof _primitives.Ref ? this.xref.fetch(fn) : fn
      });

      this._cache(fn, parsedFunction);

      return parsedFunction;
    }
  }, {
    key: "createFromArray",
    value: function createFromArray(fnObj) {
      var cachedFunction = this.getCached(fnObj);

      if (cachedFunction) {
        return cachedFunction;
      }

      var parsedFunction = PDFFunction.parseArray({
        xref: this.xref,
        isEvalSupported: this.isEvalSupported,
        fnObj: fnObj instanceof _primitives.Ref ? this.xref.fetch(fnObj) : fnObj
      });

      this._cache(fnObj, parsedFunction);

      return parsedFunction;
    }
  }, {
    key: "getCached",
    value: function getCached(cacheKey) {
      var fnRef;

      if (cacheKey instanceof _primitives.Ref) {
        fnRef = cacheKey;
      } else if (cacheKey instanceof _primitives.Dict) {
        fnRef = cacheKey.objId;
      } else if ((0, _primitives.isStream)(cacheKey)) {
        fnRef = cacheKey.dict && cacheKey.dict.objId;
      }

      if (fnRef) {
        var localFunction = this._localFunctionCache.getByRef(fnRef);

        if (localFunction) {
          return localFunction;
        }
      }

      return null;
    }
  }, {
    key: "_cache",
    value: function _cache(cacheKey, parsedFunction) {
      if (!parsedFunction) {
        throw new Error('PDFFunctionFactory._cache - expected "parsedFunction" argument.');
      }

      var fnRef;

      if (cacheKey instanceof _primitives.Ref) {
        fnRef = cacheKey;
      } else if (cacheKey instanceof _primitives.Dict) {
        fnRef = cacheKey.objId;
      } else if ((0, _primitives.isStream)(cacheKey)) {
        fnRef = cacheKey.dict && cacheKey.dict.objId;
      }

      if (fnRef) {
        this._localFunctionCache.set(null, fnRef, parsedFunction);
      }
    }
  }, {
    key: "_localFunctionCache",
    get: function get() {
      return (0, _util.shadow)(this, "_localFunctionCache", new _image_utils.LocalFunctionCache());
    }
  }]);

  return PDFFunctionFactory;
}();

exports.PDFFunctionFactory = PDFFunctionFactory;

function toNumberArray(arr) {
  if (!Array.isArray(arr)) {
    return null;
  }

  var length = arr.length;

  for (var i = 0; i < length; i++) {
    if (typeof arr[i] !== "number") {
      var result = new Array(length);

      for (var j = 0; j < length; j++) {
        result[j] = +arr[j];
      }

      return result;
    }
  }

  return arr;
}

var PDFFunction = /*#__PURE__*/function () {
  function PDFFunction() {
    _classCallCheck(this, PDFFunction);
  }

  _createClass(PDFFunction, null, [{
    key: "getSampleArray",
    value: function getSampleArray(size, outputSize, bps, stream) {
      var i, ii;
      var length = 1;

      for (i = 0, ii = size.length; i < ii; i++) {
        length *= size[i];
      }

      length *= outputSize;
      var array = new Array(length);
      var codeSize = 0;
      var codeBuf = 0;
      var sampleMul = 1.0 / (Math.pow(2.0, bps) - 1);
      var strBytes = stream.getBytes((length * bps + 7) / 8);
      var strIdx = 0;

      for (i = 0; i < length; i++) {
        while (codeSize < bps) {
          codeBuf <<= 8;
          codeBuf |= strBytes[strIdx++];
          codeSize += 8;
        }

        codeSize -= bps;
        array[i] = (codeBuf >> codeSize) * sampleMul;
        codeBuf &= (1 << codeSize) - 1;
      }

      return array;
    }
  }, {
    key: "parse",
    value: function parse(_ref2) {
      var xref = _ref2.xref,
          isEvalSupported = _ref2.isEvalSupported,
          fn = _ref2.fn;
      var dict = fn.dict || fn;
      var typeNum = dict.get("FunctionType");

      switch (typeNum) {
        case 0:
          return this.constructSampled({
            xref: xref,
            isEvalSupported: isEvalSupported,
            fn: fn,
            dict: dict
          });

        case 1:
          break;

        case 2:
          return this.constructInterpolated({
            xref: xref,
            isEvalSupported: isEvalSupported,
            dict: dict
          });

        case 3:
          return this.constructStiched({
            xref: xref,
            isEvalSupported: isEvalSupported,
            dict: dict
          });

        case 4:
          return this.constructPostScript({
            xref: xref,
            isEvalSupported: isEvalSupported,
            fn: fn,
            dict: dict
          });
      }

      throw new _util.FormatError("Unknown type of function");
    }
  }, {
    key: "parseArray",
    value: function parseArray(_ref3) {
      var xref = _ref3.xref,
          isEvalSupported = _ref3.isEvalSupported,
          fnObj = _ref3.fnObj;

      if (!Array.isArray(fnObj)) {
        return this.parse({
          xref: xref,
          isEvalSupported: isEvalSupported,
          fn: fnObj
        });
      }

      var fnArray = [];

      for (var j = 0, jj = fnObj.length; j < jj; j++) {
        fnArray.push(this.parse({
          xref: xref,
          isEvalSupported: isEvalSupported,
          fn: xref.fetchIfRef(fnObj[j])
        }));
      }

      return function (src, srcOffset, dest, destOffset) {
        for (var i = 0, ii = fnArray.length; i < ii; i++) {
          fnArray[i](src, srcOffset, dest, destOffset + i);
        }
      };
    }
  }, {
    key: "constructSampled",
    value: function constructSampled(_ref4) {
      var xref = _ref4.xref,
          isEvalSupported = _ref4.isEvalSupported,
          fn = _ref4.fn,
          dict = _ref4.dict;

      function toMultiArray(arr) {
        var inputLength = arr.length;
        var out = [];
        var index = 0;

        for (var i = 0; i < inputLength; i += 2) {
          out[index++] = [arr[i], arr[i + 1]];
        }

        return out;
      }

      function interpolate(x, xmin, xmax, ymin, ymax) {
        return ymin + (x - xmin) * ((ymax - ymin) / (xmax - xmin));
      }

      var domain = toNumberArray(dict.getArray("Domain"));
      var range = toNumberArray(dict.getArray("Range"));

      if (!domain || !range) {
        throw new _util.FormatError("No domain or range");
      }

      var inputSize = domain.length / 2;
      var outputSize = range.length / 2;
      domain = toMultiArray(domain);
      range = toMultiArray(range);
      var size = toNumberArray(dict.getArray("Size"));
      var bps = dict.get("BitsPerSample");
      var order = dict.get("Order") || 1;

      if (order !== 1) {
        (0, _util.info)("No support for cubic spline interpolation: " + order);
      }

      var encode = toNumberArray(dict.getArray("Encode"));

      if (!encode) {
        encode = [];

        for (var i = 0; i < inputSize; ++i) {
          encode.push([0, size[i] - 1]);
        }
      } else {
        encode = toMultiArray(encode);
      }

      var decode = toNumberArray(dict.getArray("Decode"));

      if (!decode) {
        decode = range;
      } else {
        decode = toMultiArray(decode);
      }

      var samples = this.getSampleArray(size, outputSize, bps, fn);
      return function constructSampledFn(src, srcOffset, dest, destOffset) {
        var cubeVertices = 1 << inputSize;
        var cubeN = new Float64Array(cubeVertices);
        var cubeVertex = new Uint32Array(cubeVertices);
        var i, j;

        for (j = 0; j < cubeVertices; j++) {
          cubeN[j] = 1;
        }

        var k = outputSize,
            pos = 1;

        for (i = 0; i < inputSize; ++i) {
          var domain_2i = domain[i][0];
          var domain_2i_1 = domain[i][1];
          var xi = Math.min(Math.max(src[srcOffset + i], domain_2i), domain_2i_1);
          var e = interpolate(xi, domain_2i, domain_2i_1, encode[i][0], encode[i][1]);
          var size_i = size[i];
          e = Math.min(Math.max(e, 0), size_i - 1);
          var e0 = e < size_i - 1 ? Math.floor(e) : e - 1;
          var n0 = e0 + 1 - e;
          var n1 = e - e0;
          var offset0 = e0 * k;
          var offset1 = offset0 + k;

          for (j = 0; j < cubeVertices; j++) {
            if (j & pos) {
              cubeN[j] *= n1;
              cubeVertex[j] += offset1;
            } else {
              cubeN[j] *= n0;
              cubeVertex[j] += offset0;
            }
          }

          k *= size_i;
          pos <<= 1;
        }

        for (j = 0; j < outputSize; ++j) {
          var rj = 0;

          for (i = 0; i < cubeVertices; i++) {
            rj += samples[cubeVertex[i] + j] * cubeN[i];
          }

          rj = interpolate(rj, 0, 1, decode[j][0], decode[j][1]);
          dest[destOffset + j] = Math.min(Math.max(rj, range[j][0]), range[j][1]);
        }
      };
    }
  }, {
    key: "constructInterpolated",
    value: function constructInterpolated(_ref5) {
      var xref = _ref5.xref,
          isEvalSupported = _ref5.isEvalSupported,
          dict = _ref5.dict;
      var c0 = toNumberArray(dict.getArray("C0")) || [0];
      var c1 = toNumberArray(dict.getArray("C1")) || [1];
      var n = dict.get("N");
      var diff = [];

      for (var i = 0, ii = c0.length; i < ii; ++i) {
        diff.push(c1[i] - c0[i]);
      }

      var length = diff.length;
      return function constructInterpolatedFn(src, srcOffset, dest, destOffset) {
        var x = n === 1 ? src[srcOffset] : Math.pow(src[srcOffset], n);

        for (var j = 0; j < length; ++j) {
          dest[destOffset + j] = c0[j] + x * diff[j];
        }
      };
    }
  }, {
    key: "constructStiched",
    value: function constructStiched(_ref6) {
      var xref = _ref6.xref,
          isEvalSupported = _ref6.isEvalSupported,
          dict = _ref6.dict;
      var domain = toNumberArray(dict.getArray("Domain"));

      if (!domain) {
        throw new _util.FormatError("No domain");
      }

      var inputSize = domain.length / 2;

      if (inputSize !== 1) {
        throw new _util.FormatError("Bad domain for stiched function");
      }

      var fnRefs = dict.get("Functions");
      var fns = [];

      for (var i = 0, ii = fnRefs.length; i < ii; ++i) {
        fns.push(this.parse({
          xref: xref,
          isEvalSupported: isEvalSupported,
          fn: xref.fetchIfRef(fnRefs[i])
        }));
      }

      var bounds = toNumberArray(dict.getArray("Bounds"));
      var encode = toNumberArray(dict.getArray("Encode"));
      var tmpBuf = new Float32Array(1);
      return function constructStichedFn(src, srcOffset, dest, destOffset) {
        var clip = function constructStichedFromIRClip(v, min, max) {
          if (v > max) {
            v = max;
          } else if (v < min) {
            v = min;
          }

          return v;
        };

        var v = clip(src[srcOffset], domain[0], domain[1]);
        var length = bounds.length;
        var i;

        for (i = 0; i < length; ++i) {
          if (v < bounds[i]) {
            break;
          }
        }

        var dmin = domain[0];

        if (i > 0) {
          dmin = bounds[i - 1];
        }

        var dmax = domain[1];

        if (i < bounds.length) {
          dmax = bounds[i];
        }

        var rmin = encode[2 * i];
        var rmax = encode[2 * i + 1];
        tmpBuf[0] = dmin === dmax ? rmin : rmin + (v - dmin) * (rmax - rmin) / (dmax - dmin);
        fns[i](tmpBuf, 0, dest, destOffset);
      };
    }
  }, {
    key: "constructPostScript",
    value: function constructPostScript(_ref7) {
      var xref = _ref7.xref,
          isEvalSupported = _ref7.isEvalSupported,
          fn = _ref7.fn,
          dict = _ref7.dict;
      var domain = toNumberArray(dict.getArray("Domain"));
      var range = toNumberArray(dict.getArray("Range"));

      if (!domain) {
        throw new _util.FormatError("No domain.");
      }

      if (!range) {
        throw new _util.FormatError("No range.");
      }

      var lexer = new _ps_parser.PostScriptLexer(fn);
      var parser = new _ps_parser.PostScriptParser(lexer);
      var code = parser.parse();

      if (isEvalSupported && _util.IsEvalSupportedCached.value) {
        var compiled = new PostScriptCompiler().compile(code, domain, range);

        if (compiled) {
          return new Function("src", "srcOffset", "dest", "destOffset", compiled);
        }
      }

      (0, _util.info)("Unable to compile PS function");
      var numOutputs = range.length >> 1;
      var numInputs = domain.length >> 1;
      var evaluator = new PostScriptEvaluator(code);
      var cache = Object.create(null);
      var MAX_CACHE_SIZE = 2048 * 4;
      var cache_available = MAX_CACHE_SIZE;
      var tmpBuf = new Float32Array(numInputs);
      return function constructPostScriptFn(src, srcOffset, dest, destOffset) {
        var i, value;
        var key = "";
        var input = tmpBuf;

        for (i = 0; i < numInputs; i++) {
          value = src[srcOffset + i];
          input[i] = value;
          key += value + "_";
        }

        var cachedValue = cache[key];

        if (cachedValue !== undefined) {
          dest.set(cachedValue, destOffset);
          return;
        }

        var output = new Float32Array(numOutputs);
        var stack = evaluator.execute(input);
        var stackIndex = stack.length - numOutputs;

        for (i = 0; i < numOutputs; i++) {
          value = stack[stackIndex + i];
          var bound = range[i * 2];

          if (value < bound) {
            value = bound;
          } else {
            bound = range[i * 2 + 1];

            if (value > bound) {
              value = bound;
            }
          }

          output[i] = value;
        }

        if (cache_available > 0) {
          cache_available--;
          cache[key] = output;
        }

        dest.set(output, destOffset);
      };
    }
  }]);

  return PDFFunction;
}();

function isPDFFunction(v) {
  var fnDict;

  if (_typeof(v) !== "object") {
    return false;
  } else if ((0, _primitives.isDict)(v)) {
    fnDict = v;
  } else if ((0, _primitives.isStream)(v)) {
    fnDict = v.dict;
  } else {
    return false;
  }

  return fnDict.has("FunctionType");
}

var PostScriptStack = /*#__PURE__*/function () {
  function PostScriptStack(initialStack) {
    _classCallCheck(this, PostScriptStack);

    this.stack = !initialStack ? [] : Array.prototype.slice.call(initialStack, 0);
  }

  _createClass(PostScriptStack, [{
    key: "push",
    value: function push(value) {
      if (this.stack.length >= PostScriptStack.MAX_STACK_SIZE) {
        throw new Error("PostScript function stack overflow.");
      }

      this.stack.push(value);
    }
  }, {
    key: "pop",
    value: function pop() {
      if (this.stack.length <= 0) {
        throw new Error("PostScript function stack underflow.");
      }

      return this.stack.pop();
    }
  }, {
    key: "copy",
    value: function copy(n) {
      if (this.stack.length + n >= PostScriptStack.MAX_STACK_SIZE) {
        throw new Error("PostScript function stack overflow.");
      }

      var stack = this.stack;

      for (var i = stack.length - n, j = n - 1; j >= 0; j--, i++) {
        stack.push(stack[i]);
      }
    }
  }, {
    key: "index",
    value: function index(n) {
      this.push(this.stack[this.stack.length - n - 1]);
    }
  }, {
    key: "roll",
    value: function roll(n, p) {
      var stack = this.stack;
      var l = stack.length - n;
      var r = stack.length - 1;
      var c = l + (p - Math.floor(p / n) * n);

      for (var i = l, j = r; i < j; i++, j--) {
        var t = stack[i];
        stack[i] = stack[j];
        stack[j] = t;
      }

      for (var _i = l, _j = c - 1; _i < _j; _i++, _j--) {
        var _t = stack[_i];
        stack[_i] = stack[_j];
        stack[_j] = _t;
      }

      for (var _i2 = c, _j2 = r; _i2 < _j2; _i2++, _j2--) {
        var _t2 = stack[_i2];
        stack[_i2] = stack[_j2];
        stack[_j2] = _t2;
      }
    }
  }], [{
    key: "MAX_STACK_SIZE",
    get: function get() {
      return (0, _util.shadow)(this, "MAX_STACK_SIZE", 100);
    }
  }]);

  return PostScriptStack;
}();

var PostScriptEvaluator = /*#__PURE__*/function () {
  function PostScriptEvaluator(operators) {
    _classCallCheck(this, PostScriptEvaluator);

    this.operators = operators;
  }

  _createClass(PostScriptEvaluator, [{
    key: "execute",
    value: function execute(initialStack) {
      var stack = new PostScriptStack(initialStack);
      var counter = 0;
      var operators = this.operators;
      var length = operators.length;
      var operator, a, b;

      while (counter < length) {
        operator = operators[counter++];

        if (typeof operator === "number") {
          stack.push(operator);
          continue;
        }

        switch (operator) {
          case "jz":
            b = stack.pop();
            a = stack.pop();

            if (!a) {
              counter = b;
            }

            break;

          case "j":
            a = stack.pop();
            counter = a;
            break;

          case "abs":
            a = stack.pop();
            stack.push(Math.abs(a));
            break;

          case "add":
            b = stack.pop();
            a = stack.pop();
            stack.push(a + b);
            break;

          case "and":
            b = stack.pop();
            a = stack.pop();

            if ((0, _util.isBool)(a) && (0, _util.isBool)(b)) {
              stack.push(a && b);
            } else {
              stack.push(a & b);
            }

            break;

          case "atan":
            a = stack.pop();
            stack.push(Math.atan(a));
            break;

          case "bitshift":
            b = stack.pop();
            a = stack.pop();

            if (a > 0) {
              stack.push(a << b);
            } else {
              stack.push(a >> b);
            }

            break;

          case "ceiling":
            a = stack.pop();
            stack.push(Math.ceil(a));
            break;

          case "copy":
            a = stack.pop();
            stack.copy(a);
            break;

          case "cos":
            a = stack.pop();
            stack.push(Math.cos(a));
            break;

          case "cvi":
            a = stack.pop() | 0;
            stack.push(a);
            break;

          case "cvr":
            break;

          case "div":
            b = stack.pop();
            a = stack.pop();
            stack.push(a / b);
            break;

          case "dup":
            stack.copy(1);
            break;

          case "eq":
            b = stack.pop();
            a = stack.pop();
            stack.push(a === b);
            break;

          case "exch":
            stack.roll(2, 1);
            break;

          case "exp":
            b = stack.pop();
            a = stack.pop();
            stack.push(Math.pow(a, b));
            break;

          case "false":
            stack.push(false);
            break;

          case "floor":
            a = stack.pop();
            stack.push(Math.floor(a));
            break;

          case "ge":
            b = stack.pop();
            a = stack.pop();
            stack.push(a >= b);
            break;

          case "gt":
            b = stack.pop();
            a = stack.pop();
            stack.push(a > b);
            break;

          case "idiv":
            b = stack.pop();
            a = stack.pop();
            stack.push(a / b | 0);
            break;

          case "index":
            a = stack.pop();
            stack.index(a);
            break;

          case "le":
            b = stack.pop();
            a = stack.pop();
            stack.push(a <= b);
            break;

          case "ln":
            a = stack.pop();
            stack.push(Math.log(a));
            break;

          case "log":
            a = stack.pop();
            stack.push(Math.log(a) / Math.LN10);
            break;

          case "lt":
            b = stack.pop();
            a = stack.pop();
            stack.push(a < b);
            break;

          case "mod":
            b = stack.pop();
            a = stack.pop();
            stack.push(a % b);
            break;

          case "mul":
            b = stack.pop();
            a = stack.pop();
            stack.push(a * b);
            break;

          case "ne":
            b = stack.pop();
            a = stack.pop();
            stack.push(a !== b);
            break;

          case "neg":
            a = stack.pop();
            stack.push(-a);
            break;

          case "not":
            a = stack.pop();

            if ((0, _util.isBool)(a)) {
              stack.push(!a);
            } else {
              stack.push(~a);
            }

            break;

          case "or":
            b = stack.pop();
            a = stack.pop();

            if ((0, _util.isBool)(a) && (0, _util.isBool)(b)) {
              stack.push(a || b);
            } else {
              stack.push(a | b);
            }

            break;

          case "pop":
            stack.pop();
            break;

          case "roll":
            b = stack.pop();
            a = stack.pop();
            stack.roll(a, b);
            break;

          case "round":
            a = stack.pop();
            stack.push(Math.round(a));
            break;

          case "sin":
            a = stack.pop();
            stack.push(Math.sin(a));
            break;

          case "sqrt":
            a = stack.pop();
            stack.push(Math.sqrt(a));
            break;

          case "sub":
            b = stack.pop();
            a = stack.pop();
            stack.push(a - b);
            break;

          case "true":
            stack.push(true);
            break;

          case "truncate":
            a = stack.pop();
            a = a < 0 ? Math.ceil(a) : Math.floor(a);
            stack.push(a);
            break;

          case "xor":
            b = stack.pop();
            a = stack.pop();

            if ((0, _util.isBool)(a) && (0, _util.isBool)(b)) {
              stack.push(a !== b);
            } else {
              stack.push(a ^ b);
            }

            break;

          default:
            throw new _util.FormatError("Unknown operator ".concat(operator));
        }
      }

      return stack.stack;
    }
  }]);

  return PostScriptEvaluator;
}();

exports.PostScriptEvaluator = PostScriptEvaluator;

var PostScriptCompiler = function PostScriptCompilerClosure() {
  var AstNode = /*#__PURE__*/function () {
    function AstNode(type) {
      _classCallCheck(this, AstNode);

      this.type = type;
    }

    _createClass(AstNode, [{
      key: "visit",
      value: function visit(visitor) {
        (0, _util.unreachable)("abstract method");
      }
    }]);

    return AstNode;
  }();

  var AstArgument = /*#__PURE__*/function (_AstNode) {
    _inherits(AstArgument, _AstNode);

    var _super = _createSuper(AstArgument);

    function AstArgument(index, min, max) {
      var _this;

      _classCallCheck(this, AstArgument);

      _this = _super.call(this, "args");
      _this.index = index;
      _this.min = min;
      _this.max = max;
      return _this;
    }

    _createClass(AstArgument, [{
      key: "visit",
      value: function visit(visitor) {
        visitor.visitArgument(this);
      }
    }]);

    return AstArgument;
  }(AstNode);

  var AstLiteral = /*#__PURE__*/function (_AstNode2) {
    _inherits(AstLiteral, _AstNode2);

    var _super2 = _createSuper(AstLiteral);

    function AstLiteral(number) {
      var _this2;

      _classCallCheck(this, AstLiteral);

      _this2 = _super2.call(this, "literal");
      _this2.number = number;
      _this2.min = number;
      _this2.max = number;
      return _this2;
    }

    _createClass(AstLiteral, [{
      key: "visit",
      value: function visit(visitor) {
        visitor.visitLiteral(this);
      }
    }]);

    return AstLiteral;
  }(AstNode);

  var AstBinaryOperation = /*#__PURE__*/function (_AstNode3) {
    _inherits(AstBinaryOperation, _AstNode3);

    var _super3 = _createSuper(AstBinaryOperation);

    function AstBinaryOperation(op, arg1, arg2, min, max) {
      var _this3;

      _classCallCheck(this, AstBinaryOperation);

      _this3 = _super3.call(this, "binary");
      _this3.op = op;
      _this3.arg1 = arg1;
      _this3.arg2 = arg2;
      _this3.min = min;
      _this3.max = max;
      return _this3;
    }

    _createClass(AstBinaryOperation, [{
      key: "visit",
      value: function visit(visitor) {
        visitor.visitBinaryOperation(this);
      }
    }]);

    return AstBinaryOperation;
  }(AstNode);

  var AstMin = /*#__PURE__*/function (_AstNode4) {
    _inherits(AstMin, _AstNode4);

    var _super4 = _createSuper(AstMin);

    function AstMin(arg, max) {
      var _this4;

      _classCallCheck(this, AstMin);

      _this4 = _super4.call(this, "max");
      _this4.arg = arg;
      _this4.min = arg.min;
      _this4.max = max;
      return _this4;
    }

    _createClass(AstMin, [{
      key: "visit",
      value: function visit(visitor) {
        visitor.visitMin(this);
      }
    }]);

    return AstMin;
  }(AstNode);

  var AstVariable = /*#__PURE__*/function (_AstNode5) {
    _inherits(AstVariable, _AstNode5);

    var _super5 = _createSuper(AstVariable);

    function AstVariable(index, min, max) {
      var _this5;

      _classCallCheck(this, AstVariable);

      _this5 = _super5.call(this, "var");
      _this5.index = index;
      _this5.min = min;
      _this5.max = max;
      return _this5;
    }

    _createClass(AstVariable, [{
      key: "visit",
      value: function visit(visitor) {
        visitor.visitVariable(this);
      }
    }]);

    return AstVariable;
  }(AstNode);

  var AstVariableDefinition = /*#__PURE__*/function (_AstNode6) {
    _inherits(AstVariableDefinition, _AstNode6);

    var _super6 = _createSuper(AstVariableDefinition);

    function AstVariableDefinition(variable, arg) {
      var _this6;

      _classCallCheck(this, AstVariableDefinition);

      _this6 = _super6.call(this, "definition");
      _this6.variable = variable;
      _this6.arg = arg;
      return _this6;
    }

    _createClass(AstVariableDefinition, [{
      key: "visit",
      value: function visit(visitor) {
        visitor.visitVariableDefinition(this);
      }
    }]);

    return AstVariableDefinition;
  }(AstNode);

  var ExpressionBuilderVisitor = /*#__PURE__*/function () {
    function ExpressionBuilderVisitor() {
      _classCallCheck(this, ExpressionBuilderVisitor);

      this.parts = [];
    }

    _createClass(ExpressionBuilderVisitor, [{
      key: "visitArgument",
      value: function visitArgument(arg) {
        this.parts.push("Math.max(", arg.min, ", Math.min(", arg.max, ", src[srcOffset + ", arg.index, "]))");
      }
    }, {
      key: "visitVariable",
      value: function visitVariable(variable) {
        this.parts.push("v", variable.index);
      }
    }, {
      key: "visitLiteral",
      value: function visitLiteral(literal) {
        this.parts.push(literal.number);
      }
    }, {
      key: "visitBinaryOperation",
      value: function visitBinaryOperation(operation) {
        this.parts.push("(");
        operation.arg1.visit(this);
        this.parts.push(" ", operation.op, " ");
        operation.arg2.visit(this);
        this.parts.push(")");
      }
    }, {
      key: "visitVariableDefinition",
      value: function visitVariableDefinition(definition) {
        this.parts.push("var ");
        definition.variable.visit(this);
        this.parts.push(" = ");
        definition.arg.visit(this);
        this.parts.push(";");
      }
    }, {
      key: "visitMin",
      value: function visitMin(max) {
        this.parts.push("Math.min(");
        max.arg.visit(this);
        this.parts.push(", ", max.max, ")");
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.parts.join("");
      }
    }]);

    return ExpressionBuilderVisitor;
  }();

  function buildAddOperation(num1, num2) {
    if (num2.type === "literal" && num2.number === 0) {
      return num1;
    }

    if (num1.type === "literal" && num1.number === 0) {
      return num2;
    }

    if (num2.type === "literal" && num1.type === "literal") {
      return new AstLiteral(num1.number + num2.number);
    }

    return new AstBinaryOperation("+", num1, num2, num1.min + num2.min, num1.max + num2.max);
  }

  function buildMulOperation(num1, num2) {
    if (num2.type === "literal") {
      if (num2.number === 0) {
        return new AstLiteral(0);
      } else if (num2.number === 1) {
        return num1;
      } else if (num1.type === "literal") {
        return new AstLiteral(num1.number * num2.number);
      }
    }

    if (num1.type === "literal") {
      if (num1.number === 0) {
        return new AstLiteral(0);
      } else if (num1.number === 1) {
        return num2;
      }
    }

    var min = Math.min(num1.min * num2.min, num1.min * num2.max, num1.max * num2.min, num1.max * num2.max);
    var max = Math.max(num1.min * num2.min, num1.min * num2.max, num1.max * num2.min, num1.max * num2.max);
    return new AstBinaryOperation("*", num1, num2, min, max);
  }

  function buildSubOperation(num1, num2) {
    if (num2.type === "literal") {
      if (num2.number === 0) {
        return num1;
      } else if (num1.type === "literal") {
        return new AstLiteral(num1.number - num2.number);
      }
    }

    if (num2.type === "binary" && num2.op === "-" && num1.type === "literal" && num1.number === 1 && num2.arg1.type === "literal" && num2.arg1.number === 1) {
      return num2.arg2;
    }

    return new AstBinaryOperation("-", num1, num2, num1.min - num2.max, num1.max - num2.min);
  }

  function buildMinOperation(num1, max) {
    if (num1.min >= max) {
      return new AstLiteral(max);
    } else if (num1.max <= max) {
      return num1;
    }

    return new AstMin(num1, max);
  }

  var PostScriptCompiler = /*#__PURE__*/function () {
    function PostScriptCompiler() {
      _classCallCheck(this, PostScriptCompiler);
    }

    _createClass(PostScriptCompiler, [{
      key: "compile",
      value: function compile(code, domain, range) {
        var stack = [];
        var instructions = [];
        var inputSize = domain.length >> 1,
            outputSize = range.length >> 1;
        var lastRegister = 0;
        var n, j;
        var num1, num2, ast1, ast2, tmpVar, item;

        for (var i = 0; i < inputSize; i++) {
          stack.push(new AstArgument(i, domain[i * 2], domain[i * 2 + 1]));
        }

        for (var _i3 = 0, ii = code.length; _i3 < ii; _i3++) {
          item = code[_i3];

          if (typeof item === "number") {
            stack.push(new AstLiteral(item));
            continue;
          }

          switch (item) {
            case "add":
              if (stack.length < 2) {
                return null;
              }

              num2 = stack.pop();
              num1 = stack.pop();
              stack.push(buildAddOperation(num1, num2));
              break;

            case "cvr":
              if (stack.length < 1) {
                return null;
              }

              break;

            case "mul":
              if (stack.length < 2) {
                return null;
              }

              num2 = stack.pop();
              num1 = stack.pop();
              stack.push(buildMulOperation(num1, num2));
              break;

            case "sub":
              if (stack.length < 2) {
                return null;
              }

              num2 = stack.pop();
              num1 = stack.pop();
              stack.push(buildSubOperation(num1, num2));
              break;

            case "exch":
              if (stack.length < 2) {
                return null;
              }

              ast1 = stack.pop();
              ast2 = stack.pop();
              stack.push(ast1, ast2);
              break;

            case "pop":
              if (stack.length < 1) {
                return null;
              }

              stack.pop();
              break;

            case "index":
              if (stack.length < 1) {
                return null;
              }

              num1 = stack.pop();

              if (num1.type !== "literal") {
                return null;
              }

              n = num1.number;

              if (n < 0 || !Number.isInteger(n) || stack.length < n) {
                return null;
              }

              ast1 = stack[stack.length - n - 1];

              if (ast1.type === "literal" || ast1.type === "var") {
                stack.push(ast1);
                break;
              }

              tmpVar = new AstVariable(lastRegister++, ast1.min, ast1.max);
              stack[stack.length - n - 1] = tmpVar;
              stack.push(tmpVar);
              instructions.push(new AstVariableDefinition(tmpVar, ast1));
              break;

            case "dup":
              if (stack.length < 1) {
                return null;
              }

              if (typeof code[_i3 + 1] === "number" && code[_i3 + 2] === "gt" && code[_i3 + 3] === _i3 + 7 && code[_i3 + 4] === "jz" && code[_i3 + 5] === "pop" && code[_i3 + 6] === code[_i3 + 1]) {
                num1 = stack.pop();
                stack.push(buildMinOperation(num1, code[_i3 + 1]));
                _i3 += 6;
                break;
              }

              ast1 = stack[stack.length - 1];

              if (ast1.type === "literal" || ast1.type === "var") {
                stack.push(ast1);
                break;
              }

              tmpVar = new AstVariable(lastRegister++, ast1.min, ast1.max);
              stack[stack.length - 1] = tmpVar;
              stack.push(tmpVar);
              instructions.push(new AstVariableDefinition(tmpVar, ast1));
              break;

            case "roll":
              if (stack.length < 2) {
                return null;
              }

              num2 = stack.pop();
              num1 = stack.pop();

              if (num2.type !== "literal" || num1.type !== "literal") {
                return null;
              }

              j = num2.number;
              n = num1.number;

              if (n <= 0 || !Number.isInteger(n) || !Number.isInteger(j) || stack.length < n) {
                return null;
              }

              j = (j % n + n) % n;

              if (j === 0) {
                break;
              }

              Array.prototype.push.apply(stack, stack.splice(stack.length - n, n - j));
              break;

            default:
              return null;
          }
        }

        if (stack.length !== outputSize) {
          return null;
        }

        var result = [];

        for (var _i4 = 0, _instructions = instructions; _i4 < _instructions.length; _i4++) {
          var instruction = _instructions[_i4];
          var statementBuilder = new ExpressionBuilderVisitor();
          instruction.visit(statementBuilder);
          result.push(statementBuilder.toString());
        }

        for (var _i5 = 0, _ii = stack.length; _i5 < _ii; _i5++) {
          var expr = stack[_i5],
              _statementBuilder = new ExpressionBuilderVisitor();

          expr.visit(_statementBuilder);
          var min = range[_i5 * 2],
              max = range[_i5 * 2 + 1];
          var out = [_statementBuilder.toString()];

          if (min > expr.min) {
            out.unshift("Math.max(", min, ", ");
            out.push(")");
          }

          if (max < expr.max) {
            out.unshift("Math.min(", max, ", ");
            out.push(")");
          }

          out.unshift("dest[destOffset + ", _i5, "] = ");
          out.push(";");
          result.push(out.join(""));
        }

        return result.join("\n");
      }
    }]);

    return PostScriptCompiler;
  }();

  return PostScriptCompiler;
}();

exports.PostScriptCompiler = PostScriptCompiler;