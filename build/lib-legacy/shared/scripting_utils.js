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
exports.ColorConverters = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function makeColorComp(n) {
  return Math.floor(Math.max(0, Math.min(1, n)) * 255).toString(16).padStart(2, "0");
}

var ColorConverters = /*#__PURE__*/function () {
  function ColorConverters() {
    _classCallCheck(this, ColorConverters);
  }

  _createClass(ColorConverters, null, [{
    key: "CMYK_G",
    value: function CMYK_G(_ref) {
      var _ref2 = _slicedToArray(_ref, 4),
          c = _ref2[0],
          y = _ref2[1],
          m = _ref2[2],
          k = _ref2[3];

      return ["G", 1 - Math.min(1, 0.3 * c + 0.59 * m + 0.11 * y + k)];
    }
  }, {
    key: "G_CMYK",
    value: function G_CMYK(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          g = _ref4[0];

      return ["CMYK", 0, 0, 0, 1 - g];
    }
  }, {
    key: "G_RGB",
    value: function G_RGB(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          g = _ref6[0];

      return ["RGB", g, g, g];
    }
  }, {
    key: "G_HTML",
    value: function G_HTML(_ref7) {
      var _ref8 = _slicedToArray(_ref7, 1),
          g = _ref8[0];

      var G = makeColorComp(g);
      return "#".concat(G).concat(G).concat(G);
    }
  }, {
    key: "RGB_G",
    value: function RGB_G(_ref9) {
      var _ref10 = _slicedToArray(_ref9, 3),
          r = _ref10[0],
          g = _ref10[1],
          b = _ref10[2];

      return ["G", 0.3 * r + 0.59 * g + 0.11 * b];
    }
  }, {
    key: "RGB_HTML",
    value: function RGB_HTML(_ref11) {
      var _ref12 = _slicedToArray(_ref11, 3),
          r = _ref12[0],
          g = _ref12[1],
          b = _ref12[2];

      var R = makeColorComp(r);
      var G = makeColorComp(g);
      var B = makeColorComp(b);
      return "#".concat(R).concat(G).concat(B);
    }
  }, {
    key: "T_HTML",
    value: function T_HTML() {
      return "#00000000";
    }
  }, {
    key: "CMYK_RGB",
    value: function CMYK_RGB(_ref13) {
      var _ref14 = _slicedToArray(_ref13, 4),
          c = _ref14[0],
          y = _ref14[1],
          m = _ref14[2],
          k = _ref14[3];

      return ["RGB", 1 - Math.min(1, c + k), 1 - Math.min(1, m + k), 1 - Math.min(1, y + k)];
    }
  }, {
    key: "CMYK_HTML",
    value: function CMYK_HTML(components) {
      return this.RGB_HTML(this.CMYK_RGB(components));
    }
  }, {
    key: "RGB_CMYK",
    value: function RGB_CMYK(_ref15) {
      var _ref16 = _slicedToArray(_ref15, 3),
          r = _ref16[0],
          g = _ref16[1],
          b = _ref16[2];

      var c = 1 - r;
      var m = 1 - g;
      var y = 1 - b;
      var k = Math.min(c, m, y);
      return ["CMYK", c, m, y, k];
    }
  }]);

  return ColorConverters;
}();

exports.ColorConverters = ColorConverters;