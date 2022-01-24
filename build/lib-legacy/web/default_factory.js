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
exports.DefaultXfaLayerFactory = exports.DefaultTextLayerFactory = exports.DefaultStructTreeLayerFactory = exports.DefaultAnnotationLayerFactory = void 0;

var _annotation_layer_builder = require("./annotation_layer_builder.js");

var _l10n_utils = require("./l10n_utils.js");

var _pdf_link_service = require("./pdf_link_service.js");

var _struct_tree_layer_builder = require("./struct_tree_layer_builder.js");

var _text_layer_builder = require("./text_layer_builder.js");

var _xfa_layer_builder = require("./xfa_layer_builder.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DefaultAnnotationLayerFactory = /*#__PURE__*/function () {
  function DefaultAnnotationLayerFactory() {
    _classCallCheck(this, DefaultAnnotationLayerFactory);
  }

  _createClass(DefaultAnnotationLayerFactory, [{
    key: "createAnnotationLayerBuilder",
    value: function createAnnotationLayerBuilder(pageDiv, pdfPage) {
      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var imageResourcesPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var renderForms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var l10n = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _l10n_utils.NullL10n;
      var enableScripting = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var hasJSActionsPromise = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var mouseState = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
      var fieldObjectsPromise = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
      var annotationCanvasMap = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
      return new _annotation_layer_builder.AnnotationLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        imageResourcesPath: imageResourcesPath,
        renderForms: renderForms,
        linkService: new _pdf_link_service.SimpleLinkService(),
        l10n: l10n,
        annotationStorage: annotationStorage,
        enableScripting: enableScripting,
        hasJSActionsPromise: hasJSActionsPromise,
        fieldObjectsPromise: fieldObjectsPromise,
        mouseState: mouseState,
        annotationCanvasMap: annotationCanvasMap
      });
    }
  }]);

  return DefaultAnnotationLayerFactory;
}();

exports.DefaultAnnotationLayerFactory = DefaultAnnotationLayerFactory;

var DefaultStructTreeLayerFactory = /*#__PURE__*/function () {
  function DefaultStructTreeLayerFactory() {
    _classCallCheck(this, DefaultStructTreeLayerFactory);
  }

  _createClass(DefaultStructTreeLayerFactory, [{
    key: "createStructTreeLayerBuilder",
    value: function createStructTreeLayerBuilder(pdfPage) {
      return new _struct_tree_layer_builder.StructTreeLayerBuilder({
        pdfPage: pdfPage
      });
    }
  }]);

  return DefaultStructTreeLayerFactory;
}();

exports.DefaultStructTreeLayerFactory = DefaultStructTreeLayerFactory;

var DefaultTextLayerFactory = /*#__PURE__*/function () {
  function DefaultTextLayerFactory() {
    _classCallCheck(this, DefaultTextLayerFactory);
  }

  _createClass(DefaultTextLayerFactory, [{
    key: "createTextLayerBuilder",
    value: function createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
      var enhanceTextSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var eventBus = arguments.length > 4 ? arguments[4] : undefined;
      var highlighter = arguments.length > 5 ? arguments[5] : undefined;
      return new _text_layer_builder.TextLayerBuilder({
        textLayerDiv: textLayerDiv,
        pageIndex: pageIndex,
        viewport: viewport,
        enhanceTextSelection: enhanceTextSelection,
        eventBus: eventBus,
        highlighter: highlighter
      });
    }
  }]);

  return DefaultTextLayerFactory;
}();

exports.DefaultTextLayerFactory = DefaultTextLayerFactory;

var DefaultXfaLayerFactory = /*#__PURE__*/function () {
  function DefaultXfaLayerFactory() {
    _classCallCheck(this, DefaultXfaLayerFactory);
  }

  _createClass(DefaultXfaLayerFactory, [{
    key: "createXfaLayerBuilder",
    value: function createXfaLayerBuilder(pageDiv, pdfPage) {
      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var xfaHtml = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      return new _xfa_layer_builder.XfaLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        annotationStorage: annotationStorage,
        linkService: new _pdf_link_service.SimpleLinkService(),
        xfaHtml: xfaHtml
      });
    }
  }]);

  return DefaultXfaLayerFactory;
}();

exports.DefaultXfaLayerFactory = DefaultXfaLayerFactory;