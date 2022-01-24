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
exports.getXfaHtmlForPrinting = getXfaHtmlForPrinting;

var _pdf = require("../pdf");

var _pdf_link_service = require("./pdf_link_service.js");

var _xfa_layer_builder = require("./xfa_layer_builder.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getXfaHtmlForPrinting(printContainer, pdfDocument) {
  var xfaHtml = pdfDocument.allXfaHtml;
  var linkService = new _pdf_link_service.SimpleLinkService();
  var scale = Math.round(_pdf.PixelsPerInch.PDF_TO_CSS_UNITS * 100) / 100;

  var _iterator = _createForOfIteratorHelper(xfaHtml.children),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var xfaPage = _step.value;
      var page = document.createElement("div");
      page.className = "xfaPrintedPage";
      printContainer.appendChild(page);
      var builder = new _xfa_layer_builder.XfaLayerBuilder({
        pageDiv: page,
        pdfPage: null,
        annotationStorage: pdfDocument.annotationStorage,
        linkService: linkService,
        xfaHtml: xfaPage
      });
      var viewport = (0, _pdf.getXfaPageViewport)(xfaPage, {
        scale: scale
      });
      builder.render(viewport, "print");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}