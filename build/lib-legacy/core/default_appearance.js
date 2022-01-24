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
exports.createDefaultAppearance = createDefaultAppearance;
exports.parseDefaultAppearance = parseDefaultAppearance;

var _util = require("../shared/util.js");

var _colorspace = require("./colorspace.js");

var _core_utils = require("./core_utils.js");

var _evaluator = require("./evaluator.js");

var _primitives = require("./primitives.js");

var _stream = require("./stream.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var DefaultAppearanceEvaluator = /*#__PURE__*/function (_EvaluatorPreprocesso) {
  _inherits(DefaultAppearanceEvaluator, _EvaluatorPreprocesso);

  var _super = _createSuper(DefaultAppearanceEvaluator);

  function DefaultAppearanceEvaluator(str) {
    _classCallCheck(this, DefaultAppearanceEvaluator);

    return _super.call(this, new _stream.StringStream(str));
  }

  _createClass(DefaultAppearanceEvaluator, [{
    key: "parse",
    value: function parse() {
      var operation = {
        fn: 0,
        args: []
      };
      var result = {
        fontSize: 0,
        fontName: "",
        fontColor: new Uint8ClampedArray(3)
      };

      try {
        while (true) {
          operation.args.length = 0;

          if (!this.read(operation)) {
            break;
          }

          if (this.savedStatesDepth !== 0) {
            continue;
          }

          var fn = operation.fn,
              args = operation.args;

          switch (fn | 0) {
            case _util.OPS.setFont:
              var _args = _slicedToArray(args, 2),
                  fontName = _args[0],
                  fontSize = _args[1];

              if (fontName instanceof _primitives.Name) {
                result.fontName = fontName.name;
              }

              if (typeof fontSize === "number" && fontSize > 0) {
                result.fontSize = fontSize;
              }

              break;

            case _util.OPS.setFillRGBColor:
              _colorspace.ColorSpace.singletons.rgb.getRgbItem(args, 0, result.fontColor, 0);

              break;

            case _util.OPS.setFillGray:
              _colorspace.ColorSpace.singletons.gray.getRgbItem(args, 0, result.fontColor, 0);

              break;

            case _util.OPS.setFillColorSpace:
              _colorspace.ColorSpace.singletons.cmyk.getRgbItem(args, 0, result.fontColor, 0);

              break;
          }
        }
      } catch (reason) {
        (0, _util.warn)("parseDefaultAppearance - ignoring errors: \"".concat(reason, "\"."));
      }

      return result;
    }
  }]);

  return DefaultAppearanceEvaluator;
}(_evaluator.EvaluatorPreprocessor);

function parseDefaultAppearance(str) {
  return new DefaultAppearanceEvaluator(str).parse();
}

function createDefaultAppearance(_ref) {
  var fontSize = _ref.fontSize,
      fontName = _ref.fontName,
      fontColor = _ref.fontColor;
  var colorCmd;

  if (fontColor.every(function (c) {
    return c === 0;
  })) {
    colorCmd = "0 g";
  } else {
    colorCmd = Array.from(fontColor).map(function (c) {
      return (c / 255).toFixed(2);
    }).join(" ") + " rg";
  }

  return "/".concat((0, _core_utils.escapePDFName)(fontName), " ").concat(fontSize, " Tf ").concat(colorCmd);
}