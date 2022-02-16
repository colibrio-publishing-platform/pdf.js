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
exports.PDFPresentationMode = void 0;

var _ui_utils = require("./ui_utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS = 1500;
var DELAY_BEFORE_HIDING_CONTROLS = 3000;
var ACTIVE_SELECTOR = "pdfPresentationMode";
var CONTROLS_SELECTOR = "pdfPresentationModeControls";
var MOUSE_SCROLL_COOLDOWN_TIME = 50;
var PAGE_SWITCH_THRESHOLD = 0.1;
var SWIPE_MIN_DISTANCE_THRESHOLD = 50;
var SWIPE_ANGLE_THRESHOLD = Math.PI / 6;

var PDFPresentationMode = /*#__PURE__*/function () {
  function PDFPresentationMode(_ref) {
    var container = _ref.container,
        pdfViewer = _ref.pdfViewer,
        eventBus = _ref.eventBus;

    _classCallCheck(this, PDFPresentationMode);

    this.container = container;
    this.pdfViewer = pdfViewer;
    this.eventBus = eventBus;
    this.active = false;
    this.args = null;
    this.contextMenuOpen = false;
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
    this.touchSwipeState = null;
  }

  _createClass(PDFPresentationMode, [{
    key: "request",
    value: function request() {
      if (this.switchInProgress || this.active || !this.pdfViewer.pagesCount) {
        return false;
      }

      this._addFullscreenChangeListeners();

      this._setSwitchInProgress();

      this._notifyStateChange();

      if (this.container.requestFullscreen) {
        this.container.requestFullscreen();
      } else if (this.container.mozRequestFullScreen) {
        this.container.mozRequestFullScreen();
      } else if (this.container.webkitRequestFullscreen) {
        this.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else {
        return false;
      }

      this.args = {
        pageNumber: this.pdfViewer.currentPageNumber,
        scaleValue: this.pdfViewer.currentScaleValue,
        scrollMode: this.pdfViewer.scrollMode,
        spreadMode: this.pdfViewer.spreadMode
      };
      return true;
    }
  }, {
    key: "_mouseWheel",
    value: function _mouseWheel(evt) {
      if (!this.active) {
        return;
      }

      evt.preventDefault();
      var delta = (0, _ui_utils.normalizeWheelEventDelta)(evt);
      var currentTime = Date.now();
      var storedTime = this.mouseScrollTimeStamp;

      if (currentTime > storedTime && currentTime - storedTime < MOUSE_SCROLL_COOLDOWN_TIME) {
        return;
      }

      if (this.mouseScrollDelta > 0 && delta < 0 || this.mouseScrollDelta < 0 && delta > 0) {
        this._resetMouseScrollState();
      }

      this.mouseScrollDelta += delta;

      if (Math.abs(this.mouseScrollDelta) >= PAGE_SWITCH_THRESHOLD) {
        var totalDelta = this.mouseScrollDelta;

        this._resetMouseScrollState();

        var success = totalDelta > 0 ? this.pdfViewer.previousPage() : this.pdfViewer.nextPage();

        if (success) {
          this.mouseScrollTimeStamp = currentTime;
        }
      }
    }
  }, {
    key: "isFullscreen",
    get: function get() {
      return !!(document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen);
    }
  }, {
    key: "_notifyStateChange",
    value: function _notifyStateChange() {
      var state = _ui_utils.PresentationModeState.NORMAL;

      if (this.switchInProgress) {
        state = _ui_utils.PresentationModeState.CHANGING;
      } else if (this.active) {
        state = _ui_utils.PresentationModeState.FULLSCREEN;
      }

      this.eventBus.dispatch("presentationmodechanged", {
        source: this,
        state: state
      });
    }
  }, {
    key: "_setSwitchInProgress",
    value: function _setSwitchInProgress() {
      var _this = this;

      if (this.switchInProgress) {
        clearTimeout(this.switchInProgress);
      }

      this.switchInProgress = setTimeout(function () {
        _this._removeFullscreenChangeListeners();

        delete _this.switchInProgress;

        _this._notifyStateChange();
      }, DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS);
    }
  }, {
    key: "_resetSwitchInProgress",
    value: function _resetSwitchInProgress() {
      if (this.switchInProgress) {
        clearTimeout(this.switchInProgress);
        delete this.switchInProgress;
      }
    }
  }, {
    key: "_enter",
    value: function _enter() {
      var _this2 = this;

      this.active = true;

      this._resetSwitchInProgress();

      this._notifyStateChange();

      this.container.classList.add(ACTIVE_SELECTOR);
      setTimeout(function () {
        _this2.pdfViewer.scrollMode = _ui_utils.ScrollMode.PAGE;
        _this2.pdfViewer.spreadMode = _ui_utils.SpreadMode.NONE;
        _this2.pdfViewer.currentPageNumber = _this2.args.pageNumber;
        _this2.pdfViewer.currentScaleValue = "page-fit";
      }, 0);

      this._addWindowListeners();

      this._showControls();

      this.contextMenuOpen = false;
      window.getSelection().removeAllRanges();
    }
  }, {
    key: "_exit",
    value: function _exit() {
      var _this3 = this;

      var pageNumber = this.pdfViewer.currentPageNumber;
      this.container.classList.remove(ACTIVE_SELECTOR);
      setTimeout(function () {
        _this3.active = false;

        _this3._removeFullscreenChangeListeners();

        _this3._notifyStateChange();

        _this3.pdfViewer.scrollMode = _this3.args.scrollMode;
        _this3.pdfViewer.spreadMode = _this3.args.spreadMode;
        _this3.pdfViewer.currentScaleValue = _this3.args.scaleValue;
        _this3.pdfViewer.currentPageNumber = pageNumber;
        _this3.args = null;
      }, 0);

      this._removeWindowListeners();

      this._hideControls();

      this._resetMouseScrollState();

      this.contextMenuOpen = false;
    }
  }, {
    key: "_mouseDown",
    value: function _mouseDown(evt) {
      if (this.contextMenuOpen) {
        this.contextMenuOpen = false;
        evt.preventDefault();
        return;
      }

      if (evt.button === 0) {
        var isInternalLink = evt.target.href && evt.target.classList.contains("internalLink");

        if (!isInternalLink) {
          evt.preventDefault();

          if (evt.shiftKey) {
            this.pdfViewer.previousPage();
          } else {
            this.pdfViewer.nextPage();
          }
        }
      }
    }
  }, {
    key: "_contextMenu",
    value: function _contextMenu() {
      this.contextMenuOpen = true;
    }
  }, {
    key: "_showControls",
    value: function _showControls() {
      var _this4 = this;

      if (this.controlsTimeout) {
        clearTimeout(this.controlsTimeout);
      } else {
        this.container.classList.add(CONTROLS_SELECTOR);
      }

      this.controlsTimeout = setTimeout(function () {
        _this4.container.classList.remove(CONTROLS_SELECTOR);

        delete _this4.controlsTimeout;
      }, DELAY_BEFORE_HIDING_CONTROLS);
    }
  }, {
    key: "_hideControls",
    value: function _hideControls() {
      if (!this.controlsTimeout) {
        return;
      }

      clearTimeout(this.controlsTimeout);
      this.container.classList.remove(CONTROLS_SELECTOR);
      delete this.controlsTimeout;
    }
  }, {
    key: "_resetMouseScrollState",
    value: function _resetMouseScrollState() {
      this.mouseScrollTimeStamp = 0;
      this.mouseScrollDelta = 0;
    }
  }, {
    key: "_touchSwipe",
    value: function _touchSwipe(evt) {
      if (!this.active) {
        return;
      }

      if (evt.touches.length > 1) {
        this.touchSwipeState = null;
        return;
      }

      switch (evt.type) {
        case "touchstart":
          this.touchSwipeState = {
            startX: evt.touches[0].pageX,
            startY: evt.touches[0].pageY,
            endX: evt.touches[0].pageX,
            endY: evt.touches[0].pageY
          };
          break;

        case "touchmove":
          if (this.touchSwipeState === null) {
            return;
          }

          this.touchSwipeState.endX = evt.touches[0].pageX;
          this.touchSwipeState.endY = evt.touches[0].pageY;
          evt.preventDefault();
          break;

        case "touchend":
          if (this.touchSwipeState === null) {
            return;
          }

          var delta = 0;
          var dx = this.touchSwipeState.endX - this.touchSwipeState.startX;
          var dy = this.touchSwipeState.endY - this.touchSwipeState.startY;
          var absAngle = Math.abs(Math.atan2(dy, dx));

          if (Math.abs(dx) > SWIPE_MIN_DISTANCE_THRESHOLD && (absAngle <= SWIPE_ANGLE_THRESHOLD || absAngle >= Math.PI - SWIPE_ANGLE_THRESHOLD)) {
            delta = dx;
          } else if (Math.abs(dy) > SWIPE_MIN_DISTANCE_THRESHOLD && Math.abs(absAngle - Math.PI / 2) <= SWIPE_ANGLE_THRESHOLD) {
            delta = dy;
          }

          if (delta > 0) {
            this.pdfViewer.previousPage();
          } else if (delta < 0) {
            this.pdfViewer.nextPage();
          }

          break;
      }
    }
  }, {
    key: "_addWindowListeners",
    value: function _addWindowListeners() {
      this.showControlsBind = this._showControls.bind(this);
      this.mouseDownBind = this._mouseDown.bind(this);
      this.mouseWheelBind = this._mouseWheel.bind(this);
      this.resetMouseScrollStateBind = this._resetMouseScrollState.bind(this);
      this.contextMenuBind = this._contextMenu.bind(this);
      this.touchSwipeBind = this._touchSwipe.bind(this);
      window.addEventListener("mousemove", this.showControlsBind);
      window.addEventListener("mousedown", this.mouseDownBind);
      window.addEventListener("wheel", this.mouseWheelBind, {
        passive: false
      });
      window.addEventListener("keydown", this.resetMouseScrollStateBind);
      window.addEventListener("contextmenu", this.contextMenuBind);
      window.addEventListener("touchstart", this.touchSwipeBind);
      window.addEventListener("touchmove", this.touchSwipeBind);
      window.addEventListener("touchend", this.touchSwipeBind);
    }
  }, {
    key: "_removeWindowListeners",
    value: function _removeWindowListeners() {
      window.removeEventListener("mousemove", this.showControlsBind);
      window.removeEventListener("mousedown", this.mouseDownBind);
      window.removeEventListener("wheel", this.mouseWheelBind, {
        passive: false
      });
      window.removeEventListener("keydown", this.resetMouseScrollStateBind);
      window.removeEventListener("contextmenu", this.contextMenuBind);
      window.removeEventListener("touchstart", this.touchSwipeBind);
      window.removeEventListener("touchmove", this.touchSwipeBind);
      window.removeEventListener("touchend", this.touchSwipeBind);
      delete this.showControlsBind;
      delete this.mouseDownBind;
      delete this.mouseWheelBind;
      delete this.resetMouseScrollStateBind;
      delete this.contextMenuBind;
      delete this.touchSwipeBind;
    }
  }, {
    key: "_fullscreenChange",
    value: function _fullscreenChange() {
      if (this.isFullscreen) {
        this._enter();
      } else {
        this._exit();
      }
    }
  }, {
    key: "_addFullscreenChangeListeners",
    value: function _addFullscreenChangeListeners() {
      this.fullscreenChangeBind = this._fullscreenChange.bind(this);
      window.addEventListener("fullscreenchange", this.fullscreenChangeBind);
      window.addEventListener("mozfullscreenchange", this.fullscreenChangeBind);
      window.addEventListener("webkitfullscreenchange", this.fullscreenChangeBind);
    }
  }, {
    key: "_removeFullscreenChangeListeners",
    value: function _removeFullscreenChangeListeners() {
      window.removeEventListener("fullscreenchange", this.fullscreenChangeBind);
      window.removeEventListener("mozfullscreenchange", this.fullscreenChangeBind);
      window.removeEventListener("webkitfullscreenchange", this.fullscreenChangeBind);
      delete this.fullscreenChangeBind;
    }
  }]);

  return PDFPresentationMode;
}();

exports.PDFPresentationMode = PDFPresentationMode;