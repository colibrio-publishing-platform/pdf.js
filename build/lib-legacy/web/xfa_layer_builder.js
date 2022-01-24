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
exports.XfaLayerBuilder = void 0;

var _pdf = require("../pdf");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var XfaLayerBuilder = /*#__PURE__*/function () {
  function XfaLayerBuilder(_ref) {
    var pageDiv = _ref.pageDiv,
        pdfPage = _ref.pdfPage,
        _ref$annotationStorag = _ref.annotationStorage,
        annotationStorage = _ref$annotationStorag === void 0 ? null : _ref$annotationStorag,
        linkService = _ref.linkService,
        _ref$xfaHtml = _ref.xfaHtml,
        xfaHtml = _ref$xfaHtml === void 0 ? null : _ref$xfaHtml;

    _classCallCheck(this, XfaLayerBuilder);

    this.pageDiv = pageDiv;
    this.pdfPage = pdfPage;
    this.annotationStorage = annotationStorage;
    this.linkService = linkService;
    this.xfaHtml = xfaHtml;
    this.div = null;
    this._cancelled = false;
  }

  _createClass(XfaLayerBuilder, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      var intent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "display";

      if (intent === "print") {
        var parameters = {
          viewport: viewport.clone({
            dontFlip: true
          }),
          div: this.div,
          xfaHtml: this.xfaHtml,
          annotationStorage: this.annotationStorage,
          linkService: this.linkService,
          intent: intent
        };
        var div = document.createElement("div");
        this.pageDiv.appendChild(div);
        parameters.div = div;

        var result = _pdf.XfaLayer.render(parameters);

        return Promise.resolve(result);
      }

      return this.pdfPage.getXfa().then(function (xfaHtml) {
        if (_this._cancelled || !xfaHtml) {
          return {
            textDivs: []
          };
        }

        var parameters = {
          viewport: viewport.clone({
            dontFlip: true
          }),
          div: _this.div,
          xfaHtml: xfaHtml,
          annotationStorage: _this.annotationStorage,
          linkService: _this.linkService,
          intent: intent
        };

        if (_this.div) {
          return _pdf.XfaLayer.update(parameters);
        }

        _this.div = document.createElement("div");

        _this.pageDiv.appendChild(_this.div);

        parameters.div = _this.div;
        return _pdf.XfaLayer.render(parameters);
      })["catch"](function (error) {
        console.error(error);
      });
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this._cancelled = true;
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.div) {
        return;
      }

      this.div.hidden = true;
    }
  }]);

  return XfaLayerBuilder;
}();

exports.XfaLayerBuilder = XfaLayerBuilder;