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
exports.PDFSidebar = void 0;

var _ui_utils = require("./ui_utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI_NOTIFICATION_CLASS = "pdfSidebarNotification";

var PDFSidebar = /*#__PURE__*/function () {
  function PDFSidebar(_ref) {
    var elements = _ref.elements,
        pdfViewer = _ref.pdfViewer,
        pdfThumbnailViewer = _ref.pdfThumbnailViewer,
        eventBus = _ref.eventBus,
        l10n = _ref.l10n;

    _classCallCheck(this, PDFSidebar);

    this.isOpen = false;
    this.active = _ui_utils.SidebarView.THUMBS;
    this.isInitialViewSet = false;
    this.onToggled = null;
    this.pdfViewer = pdfViewer;
    this.pdfThumbnailViewer = pdfThumbnailViewer;
    this.outerContainer = elements.outerContainer;
    this.viewerContainer = elements.viewerContainer;
    this.toggleButton = elements.toggleButton;
    this.thumbnailButton = elements.thumbnailButton;
    this.outlineButton = elements.outlineButton;
    this.attachmentsButton = elements.attachmentsButton;
    this.layersButton = elements.layersButton;
    this.thumbnailView = elements.thumbnailView;
    this.outlineView = elements.outlineView;
    this.attachmentsView = elements.attachmentsView;
    this.layersView = elements.layersView;
    this._outlineOptionsContainer = elements.outlineOptionsContainer;
    this._currentOutlineItemButton = elements.currentOutlineItemButton;
    this.eventBus = eventBus;
    this.l10n = l10n;

    this._addEventListeners();
  }

  _createClass(PDFSidebar, [{
    key: "reset",
    value: function reset() {
      this.isInitialViewSet = false;

      this._hideUINotification(true);

      this.switchView(_ui_utils.SidebarView.THUMBS);
      this.outlineButton.disabled = false;
      this.attachmentsButton.disabled = false;
      this.layersButton.disabled = false;
      this._currentOutlineItemButton.disabled = true;
    }
  }, {
    key: "visibleView",
    get: function get() {
      return this.isOpen ? this.active : _ui_utils.SidebarView.NONE;
    }
  }, {
    key: "isThumbnailViewVisible",
    get: function get() {
      return this.isOpen && this.active === _ui_utils.SidebarView.THUMBS;
    }
  }, {
    key: "isOutlineViewVisible",
    get: function get() {
      return this.isOpen && this.active === _ui_utils.SidebarView.OUTLINE;
    }
  }, {
    key: "isAttachmentsViewVisible",
    get: function get() {
      return this.isOpen && this.active === _ui_utils.SidebarView.ATTACHMENTS;
    }
  }, {
    key: "isLayersViewVisible",
    get: function get() {
      return this.isOpen && this.active === _ui_utils.SidebarView.LAYERS;
    }
  }, {
    key: "setInitialView",
    value: function setInitialView() {
      var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ui_utils.SidebarView.NONE;

      if (this.isInitialViewSet) {
        return;
      }

      this.isInitialViewSet = true;

      if (view === _ui_utils.SidebarView.NONE || view === _ui_utils.SidebarView.UNKNOWN) {
        this._dispatchEvent();

        return;
      }

      if (!this._switchView(view, true)) {
        this._dispatchEvent();
      }
    }
  }, {
    key: "switchView",
    value: function switchView(view) {
      var forceOpen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._switchView(view, forceOpen);
    }
  }, {
    key: "_switchView",
    value: function _switchView(view) {
      var forceOpen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isViewChanged = view !== this.active;
      var shouldForceRendering = false;

      switch (view) {
        case _ui_utils.SidebarView.NONE:
          if (this.isOpen) {
            this.close();
            return true;
          }

          return false;

        case _ui_utils.SidebarView.THUMBS:
          if (this.isOpen && isViewChanged) {
            shouldForceRendering = true;
          }

          break;

        case _ui_utils.SidebarView.OUTLINE:
          if (this.outlineButton.disabled) {
            return false;
          }

          break;

        case _ui_utils.SidebarView.ATTACHMENTS:
          if (this.attachmentsButton.disabled) {
            return false;
          }

          break;

        case _ui_utils.SidebarView.LAYERS:
          if (this.layersButton.disabled) {
            return false;
          }

          break;

        default:
          console.error("PDFSidebar._switchView: \"".concat(view, "\" is not a valid view."));
          return false;
      }

      this.active = view;
      this.thumbnailButton.classList.toggle("toggled", view === _ui_utils.SidebarView.THUMBS);
      this.outlineButton.classList.toggle("toggled", view === _ui_utils.SidebarView.OUTLINE);
      this.attachmentsButton.classList.toggle("toggled", view === _ui_utils.SidebarView.ATTACHMENTS);
      this.layersButton.classList.toggle("toggled", view === _ui_utils.SidebarView.LAYERS);
      this.thumbnailView.classList.toggle("hidden", view !== _ui_utils.SidebarView.THUMBS);
      this.outlineView.classList.toggle("hidden", view !== _ui_utils.SidebarView.OUTLINE);
      this.attachmentsView.classList.toggle("hidden", view !== _ui_utils.SidebarView.ATTACHMENTS);
      this.layersView.classList.toggle("hidden", view !== _ui_utils.SidebarView.LAYERS);

      this._outlineOptionsContainer.classList.toggle("hidden", view !== _ui_utils.SidebarView.OUTLINE);

      if (forceOpen && !this.isOpen) {
        this.open();
        return true;
      }

      if (shouldForceRendering) {
        this._updateThumbnailViewer();

        this._forceRendering();
      }

      if (isViewChanged) {
        this._dispatchEvent();
      }

      return isViewChanged;
    }
  }, {
    key: "open",
    value: function open() {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      this.toggleButton.classList.add("toggled");
      this.toggleButton.setAttribute("aria-expanded", "true");
      this.outerContainer.classList.add("sidebarMoving", "sidebarOpen");

      if (this.active === _ui_utils.SidebarView.THUMBS) {
        this._updateThumbnailViewer();
      }

      this._forceRendering();

      this._dispatchEvent();

      this._hideUINotification();
    }
  }, {
    key: "close",
    value: function close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      this.toggleButton.classList.remove("toggled");
      this.toggleButton.setAttribute("aria-expanded", "false");
      this.outerContainer.classList.add("sidebarMoving");
      this.outerContainer.classList.remove("sidebarOpen");

      this._forceRendering();

      this._dispatchEvent();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent() {
      this.eventBus.dispatch("sidebarviewchanged", {
        source: this,
        view: this.visibleView
      });
    }
  }, {
    key: "_forceRendering",
    value: function _forceRendering() {
      if (this.onToggled) {
        this.onToggled();
      } else {
        this.pdfViewer.forceRendering();
        this.pdfThumbnailViewer.forceRendering();
      }
    }
  }, {
    key: "_updateThumbnailViewer",
    value: function _updateThumbnailViewer() {
      var pdfViewer = this.pdfViewer,
          pdfThumbnailViewer = this.pdfThumbnailViewer;
      var pagesCount = pdfViewer.pagesCount;

      for (var pageIndex = 0; pageIndex < pagesCount; pageIndex++) {
        var pageView = pdfViewer.getPageView(pageIndex);

        if ((pageView === null || pageView === void 0 ? void 0 : pageView.renderingState) === _ui_utils.RenderingStates.FINISHED) {
          var thumbnailView = pdfThumbnailViewer.getThumbnail(pageIndex);
          thumbnailView.setImage(pageView);
        }
      }

      pdfThumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber);
    }
  }, {
    key: "_showUINotification",
    value: function _showUINotification() {
      var _this = this;

      this.l10n.get("toggle_sidebar_notification2.title").then(function (msg) {
        _this.toggleButton.title = msg;
      });

      if (!this.isOpen) {
        this.toggleButton.classList.add(UI_NOTIFICATION_CLASS);
      }
    }
  }, {
    key: "_hideUINotification",
    value: function _hideUINotification() {
      var _this2 = this;

      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.isOpen || reset) {
        this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS);
      }

      if (reset) {
        this.l10n.get("toggle_sidebar.title").then(function (msg) {
          _this2.toggleButton.title = msg;
        });
      }
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this3 = this;

      this.viewerContainer.addEventListener("transitionend", function (evt) {
        if (evt.target === _this3.viewerContainer) {
          _this3.outerContainer.classList.remove("sidebarMoving");
        }
      });
      this.toggleButton.addEventListener("click", function () {
        _this3.toggle();
      });
      this.thumbnailButton.addEventListener("click", function () {
        _this3.switchView(_ui_utils.SidebarView.THUMBS);
      });
      this.outlineButton.addEventListener("click", function () {
        _this3.switchView(_ui_utils.SidebarView.OUTLINE);
      });
      this.outlineButton.addEventListener("dblclick", function () {
        _this3.eventBus.dispatch("toggleoutlinetree", {
          source: _this3
        });
      });
      this.attachmentsButton.addEventListener("click", function () {
        _this3.switchView(_ui_utils.SidebarView.ATTACHMENTS);
      });
      this.layersButton.addEventListener("click", function () {
        _this3.switchView(_ui_utils.SidebarView.LAYERS);
      });
      this.layersButton.addEventListener("dblclick", function () {
        _this3.eventBus.dispatch("resetlayers", {
          source: _this3
        });
      });

      this._currentOutlineItemButton.addEventListener("click", function () {
        _this3.eventBus.dispatch("currentoutlineitem", {
          source: _this3
        });
      });

      var onTreeLoaded = function onTreeLoaded(count, button, view) {
        button.disabled = !count;

        if (count) {
          _this3._showUINotification();
        } else if (_this3.active === view) {
          _this3.switchView(_ui_utils.SidebarView.THUMBS);
        }
      };

      this.eventBus._on("outlineloaded", function (evt) {
        onTreeLoaded(evt.outlineCount, _this3.outlineButton, _ui_utils.SidebarView.OUTLINE);
        evt.currentOutlineItemPromise.then(function (enabled) {
          if (!_this3.isInitialViewSet) {
            return;
          }

          _this3._currentOutlineItemButton.disabled = !enabled;
        });
      });

      this.eventBus._on("attachmentsloaded", function (evt) {
        onTreeLoaded(evt.attachmentsCount, _this3.attachmentsButton, _ui_utils.SidebarView.ATTACHMENTS);
      });

      this.eventBus._on("layersloaded", function (evt) {
        onTreeLoaded(evt.layersCount, _this3.layersButton, _ui_utils.SidebarView.LAYERS);
      });

      this.eventBus._on("presentationmodechanged", function (evt) {
        if (evt.state === _ui_utils.PresentationModeState.NORMAL && _this3.isThumbnailViewVisible) {
          _this3._updateThumbnailViewer();
        }
      });
    }
  }]);

  return PDFSidebar;
}();

exports.PDFSidebar = PDFSidebar;