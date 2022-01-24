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
exports.PDFRenderingQueue = void 0;

var _pdf = require("../pdf");

var _ui_utils = require("./ui_utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CLEANUP_TIMEOUT = 30000;

var PDFRenderingQueue = /*#__PURE__*/function () {
  function PDFRenderingQueue() {
    _classCallCheck(this, PDFRenderingQueue);

    this.pdfViewer = null;
    this.pdfThumbnailViewer = null;
    this.onIdle = null;
    this.highestPriorityPage = null;
    this.idleTimeout = null;
    this.printing = false;
    this.isThumbnailViewEnabled = false;
  }

  _createClass(PDFRenderingQueue, [{
    key: "setViewer",
    value: function setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    }
  }, {
    key: "setThumbnailViewer",
    value: function setThumbnailViewer(pdfThumbnailViewer) {
      this.pdfThumbnailViewer = pdfThumbnailViewer;
    }
  }, {
    key: "isHighestPriority",
    value: function isHighestPriority(view) {
      return this.highestPriorityPage === view.renderingId;
    }
  }, {
    key: "hasViewer",
    value: function hasViewer() {
      return !!this.pdfViewer;
    }
  }, {
    key: "renderHighestPriority",
    value: function renderHighestPriority(currentlyVisiblePages) {
      var _this$pdfThumbnailVie;

      if (this.idleTimeout) {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
      }

      if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
        return;
      }

      if (this.isThumbnailViewEnabled && (_this$pdfThumbnailVie = this.pdfThumbnailViewer) !== null && _this$pdfThumbnailVie !== void 0 && _this$pdfThumbnailVie.forceRendering()) {
        return;
      }

      if (this.printing) {
        return;
      }

      if (this.onIdle) {
        this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
      }
    }
  }, {
    key: "getHighestPriority",
    value: function getHighestPriority(visible, views, scrolledDown) {
      var preRenderExtra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var visibleViews = visible.views,
          numVisible = visibleViews.length;

      if (numVisible === 0) {
        return null;
      }

      for (var i = 0; i < numVisible; i++) {
        var view = visibleViews[i].view;

        if (!this.isViewFinished(view)) {
          return view;
        }
      }

      var firstId = visible.first.id,
          lastId = visible.last.id;

      if (lastId - firstId + 1 > numVisible) {
        var visibleIds = visible.ids;

        for (var _i = 1, ii = lastId - firstId; _i < ii; _i++) {
          var holeId = scrolledDown ? firstId + _i : lastId - _i;

          if (visibleIds.has(holeId)) {
            continue;
          }

          var holeView = views[holeId - 1];

          if (!this.isViewFinished(holeView)) {
            return holeView;
          }
        }
      }

      var preRenderIndex = scrolledDown ? lastId : firstId - 2;
      var preRenderView = views[preRenderIndex];

      if (preRenderView && !this.isViewFinished(preRenderView)) {
        return preRenderView;
      }

      if (preRenderExtra) {
        preRenderIndex += scrolledDown ? 1 : -1;
        preRenderView = views[preRenderIndex];

        if (preRenderView && !this.isViewFinished(preRenderView)) {
          return preRenderView;
        }
      }

      return null;
    }
  }, {
    key: "isViewFinished",
    value: function isViewFinished(view) {
      return view.renderingState === _ui_utils.RenderingStates.FINISHED;
    }
  }, {
    key: "renderView",
    value: function renderView(view) {
      var _this = this;

      switch (view.renderingState) {
        case _ui_utils.RenderingStates.FINISHED:
          return false;

        case _ui_utils.RenderingStates.PAUSED:
          this.highestPriorityPage = view.renderingId;
          view.resume();
          break;

        case _ui_utils.RenderingStates.RUNNING:
          this.highestPriorityPage = view.renderingId;
          break;

        case _ui_utils.RenderingStates.INITIAL:
          this.highestPriorityPage = view.renderingId;
          view.draw()["finally"](function () {
            _this.renderHighestPriority();
          })["catch"](function (reason) {
            if (reason instanceof _pdf.RenderingCancelledException) {
              return;
            }

            console.error("renderView: \"".concat(reason, "\""));
          });
          break;
      }

      return true;
    }
  }]);

  return PDFRenderingQueue;
}();

exports.PDFRenderingQueue = PDFRenderingQueue;