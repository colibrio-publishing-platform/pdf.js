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
exports.getXfaFontDict = getXfaFontDict;
exports.getXfaFontName = getXfaFontName;

var _calibri_factors = require("./calibri_factors.js");

var _primitives = require("./primitives.js");

var _helvetica_factors = require("./helvetica_factors.js");

var _liberationsans_widths = require("./liberationsans_widths.js");

var _myriadpro_factors = require("./myriadpro_factors.js");

var _segoeui_factors = require("./segoeui_factors.js");

var _core_utils = require("./core_utils.js");

var _fonts_utils = require("./fonts_utils.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getXFAFontMap = (0, _core_utils.getLookupTableFactory)(function (t) {
  t["MyriadPro-Regular"] = t["PdfJS-Fallback-Regular"] = {
    name: "LiberationSans-Regular",
    factors: _myriadpro_factors.MyriadProRegularFactors,
    baseWidths: _liberationsans_widths.LiberationSansRegularWidths,
    baseMapping: _liberationsans_widths.LiberationSansRegularMapping,
    metrics: _myriadpro_factors.MyriadProRegularMetrics
  };
  t["MyriadPro-Bold"] = t["PdfJS-Fallback-Bold"] = {
    name: "LiberationSans-Bold",
    factors: _myriadpro_factors.MyriadProBoldFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldWidths,
    baseMapping: _liberationsans_widths.LiberationSansBoldMapping,
    metrics: _myriadpro_factors.MyriadProBoldMetrics
  };
  t["MyriadPro-It"] = t["MyriadPro-Italic"] = t["PdfJS-Fallback-Italic"] = {
    name: "LiberationSans-Italic",
    factors: _myriadpro_factors.MyriadProItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansItalicWidths,
    baseMapping: _liberationsans_widths.LiberationSansItalicMapping,
    metrics: _myriadpro_factors.MyriadProItalicMetrics
  };
  t["MyriadPro-BoldIt"] = t["MyriadPro-BoldItalic"] = t["PdfJS-Fallback-BoldItalic"] = {
    name: "LiberationSans-BoldItalic",
    factors: _myriadpro_factors.MyriadProBoldItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldItalicWidths,
    baseMapping: _liberationsans_widths.LiberationSansBoldItalicMapping,
    metrics: _myriadpro_factors.MyriadProBoldItalicMetrics
  };
  t.ArialMT = t.Arial = t["Arial-Regular"] = {
    name: "LiberationSans-Regular",
    baseWidths: _liberationsans_widths.LiberationSansRegularWidths,
    baseMapping: _liberationsans_widths.LiberationSansRegularMapping
  };
  t["Arial-BoldMT"] = t["Arial-Bold"] = {
    name: "LiberationSans-Bold",
    baseWidths: _liberationsans_widths.LiberationSansBoldWidths,
    baseMapping: _liberationsans_widths.LiberationSansBoldMapping
  };
  t["Arial-ItalicMT"] = t["Arial-Italic"] = {
    name: "LiberationSans-Italic",
    baseWidths: _liberationsans_widths.LiberationSansItalicWidths,
    baseMapping: _liberationsans_widths.LiberationSansItalicMapping
  };
  t["Arial-BoldItalicMT"] = t["Arial-BoldItalic"] = {
    name: "LiberationSans-BoldItalic",
    baseWidths: _liberationsans_widths.LiberationSansBoldItalicWidths,
    baseMapping: _liberationsans_widths.LiberationSansBoldItalicMapping
  };
  t["Calibri-Regular"] = {
    name: "LiberationSans-Regular",
    factors: _calibri_factors.CalibriRegularFactors,
    baseWidths: _liberationsans_widths.LiberationSansRegularWidths,
    baseMapping: _liberationsans_widths.LiberationSansRegularMapping,
    metrics: _calibri_factors.CalibriRegularMetrics
  };
  t["Calibri-Bold"] = {
    name: "LiberationSans-Bold",
    factors: _calibri_factors.CalibriBoldFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldWidths,
    baseMapping: _liberationsans_widths.LiberationSansBoldMapping,
    metrics: _calibri_factors.CalibriBoldMetrics
  };
  t["Calibri-Italic"] = {
    name: "LiberationSans-Italic",
    factors: _calibri_factors.CalibriItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansItalicWidths,
    baseMapping: _liberationsans_widths.LiberationSansItalicMapping,
    metrics: _calibri_factors.CalibriItalicMetrics
  };
  t["Calibri-BoldItalic"] = {
    name: "LiberationSans-BoldItalic",
    factors: _calibri_factors.CalibriBoldItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldItalicWidths,
    baseMapping: _liberationsans_widths.LiberationSansBoldItalicMapping,
    metrics: _calibri_factors.CalibriBoldItalicMetrics
  };
  t["Segoeui-Regular"] = {
    name: "LiberationSans-Regular",
    factors: _segoeui_factors.SegoeuiRegularFactors,
    baseWidths: _liberationsans_widths.LiberationSansRegularWidths,
    baseMapping: _liberationsans_widths.LiberationSansRegularMapping,
    metrics: _segoeui_factors.SegoeuiRegularMetrics
  };
  t["Segoeui-Bold"] = {
    name: "LiberationSans-Bold",
    factors: _segoeui_factors.SegoeuiBoldFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldWidths,
    baseMapping: _liberationsans_widths.LiberationSansBoldMapping,
    metrics: _segoeui_factors.SegoeuiBoldMetrics
  };
  t["Segoeui-Italic"] = {
    name: "LiberationSans-Italic",
    factors: _segoeui_factors.SegoeuiItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansItalicWidths,
    baseMapping: _liberationsans_widths.LiberationSansItalicMapping,
    metrics: _segoeui_factors.SegoeuiItalicMetrics
  };
  t["Segoeui-BoldItalic"] = {
    name: "LiberationSans-BoldItalic",
    factors: _segoeui_factors.SegoeuiBoldItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldItalicWidths,
    baseMapping: _liberationsans_widths.LiberationSansBoldItalicMapping,
    metrics: _segoeui_factors.SegoeuiBoldItalicMetrics
  };
  t["Helvetica-Regular"] = t.Helvetica = {
    name: "LiberationSans-Regular",
    factors: _helvetica_factors.HelveticaRegularFactors,
    baseWidths: _liberationsans_widths.LiberationSansRegularWidths,
    baseMapping: _liberationsans_widths.LiberationSansRegularMapping,
    metrics: _helvetica_factors.HelveticaRegularMetrics
  };
  t["Helvetica-Bold"] = {
    name: "LiberationSans-Bold",
    factors: _helvetica_factors.HelveticaBoldFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldWidths,
    baseMapping: _liberationsans_widths.LiberationSansBoldMapping,
    metrics: _helvetica_factors.HelveticaBoldMetrics
  };
  t["Helvetica-Italic"] = {
    name: "LiberationSans-Italic",
    factors: _helvetica_factors.HelveticaItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansItalicWidths,
    baseMapping: _liberationsans_widths.LiberationSansItalicMapping,
    metrics: _helvetica_factors.HelveticaItalicMetrics
  };
  t["Helvetica-BoldItalic"] = {
    name: "LiberationSans-BoldItalic",
    factors: _helvetica_factors.HelveticaBoldItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldItalicWidths,
    baseMapping: _liberationsans_widths.LiberationSansBoldItalicMapping,
    metrics: _helvetica_factors.HelveticaBoldItalicMetrics
  };
});

function getXfaFontName(name) {
  var fontName = (0, _fonts_utils.normalizeFontName)(name);
  var fontMap = getXFAFontMap();
  return fontMap[fontName];
}

function getXfaFontWidths(name) {
  var info = getXfaFontName(name);

  if (!info) {
    return null;
  }

  var baseWidths = info.baseWidths,
      baseMapping = info.baseMapping,
      factors = info.factors;
  var rescaledBaseWidths;

  if (!factors) {
    rescaledBaseWidths = baseWidths;
  } else {
    rescaledBaseWidths = baseWidths.map(function (w, i) {
      return w * factors[i];
    });
  }

  var currentCode = -2;
  var currentArray;
  var newWidths = [];

  var _iterator = _createForOfIteratorHelper(baseMapping.map(function (charUnicode, index) {
    return [charUnicode, index];
  }).sort(function (_ref, _ref2) {
    var _ref3 = _slicedToArray(_ref, 1),
        unicode1 = _ref3[0];

    var _ref4 = _slicedToArray(_ref2, 1),
        unicode2 = _ref4[0];

    return unicode1 - unicode2;
  })),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          unicode = _step$value[0],
          glyphIndex = _step$value[1];

      if (unicode === -1) {
        continue;
      }

      if (unicode === currentCode + 1) {
        currentArray.push(rescaledBaseWidths[glyphIndex]);
        currentCode += 1;
      } else {
        currentCode = unicode;
        currentArray = [rescaledBaseWidths[glyphIndex]];
        newWidths.push(unicode, currentArray);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return newWidths;
}

function getXfaFontDict(name) {
  var widths = getXfaFontWidths(name);
  var dict = new _primitives.Dict(null);
  dict.set("BaseFont", _primitives.Name.get(name));
  dict.set("Type", _primitives.Name.get("Font"));
  dict.set("Subtype", _primitives.Name.get("CIDFontType2"));
  dict.set("Encoding", _primitives.Name.get("Identity-H"));
  dict.set("CIDToGIDMap", _primitives.Name.get("Identity"));
  dict.set("W", widths);
  dict.set("FirstChar", widths[0]);
  dict.set("LastChar", widths[widths.length - 2] + widths[widths.length - 1].length - 1);
  var descriptor = new _primitives.Dict(null);
  dict.set("FontDescriptor", descriptor);
  var systemInfo = new _primitives.Dict(null);
  systemInfo.set("Ordering", "Identity");
  systemInfo.set("Registry", "Adobe");
  systemInfo.set("Supplement", 0);
  dict.set("CIDSystemInfo", systemInfo);
  return dict;
}