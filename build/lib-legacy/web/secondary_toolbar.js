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
exports.SecondaryToolbar = void 0;

var _ui_utils = require("./ui_utils.js");

var _pdf_cursor_tools = require("./pdf_cursor_tools.js");

var _base_viewer = require("./base_viewer.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var SecondaryToolbar = /*#__PURE__*/function () {
  function SecondaryToolbar(options, mainContainer, eventBus) {
    _classCallCheck(this, SecondaryToolbar);

    this.toolbar = options.toolbar;
    this.toggleButton = options.toggleButton;
    this.toolbarButtonContainer = options.toolbarButtonContainer;
    this.buttons = [{
      element: options.presentationModeButton,
      eventName: "presentationmode",
      close: true
    }, {
      element: options.openFileButton,
      eventName: "openfile",
      close: true
    }, {
      element: options.printButton,
      eventName: "print",
      close: true
    }, {
      element: options.downloadButton,
      eventName: "download",
      close: true
    }, {
      element: options.viewBookmarkButton,
      eventName: null,
      close: true
    }, {
      element: options.firstPageButton,
      eventName: "firstpage",
      close: true
    }, {
      element: options.lastPageButton,
      eventName: "lastpage",
      close: true
    }, {
      element: options.pageRotateCwButton,
      eventName: "rotatecw",
      close: false
    }, {
      element: options.pageRotateCcwButton,
      eventName: "rotateccw",
      close: false
    }, {
      element: options.cursorSelectToolButton,
      eventName: "switchcursortool",
      eventDetails: {
        tool: _pdf_cursor_tools.CursorTool.SELECT
      },
      close: true
    }, {
      element: options.cursorHandToolButton,
      eventName: "switchcursortool",
      eventDetails: {
        tool: _pdf_cursor_tools.CursorTool.HAND
      },
      close: true
    }, {
      element: options.scrollPageButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: _ui_utils.ScrollMode.PAGE
      },
      close: true
    }, {
      element: options.scrollVerticalButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: _ui_utils.ScrollMode.VERTICAL
      },
      close: true
    }, {
      element: options.scrollHorizontalButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: _ui_utils.ScrollMode.HORIZONTAL
      },
      close: true
    }, {
      element: options.scrollWrappedButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: _ui_utils.ScrollMode.WRAPPED
      },
      close: true
    }, {
      element: options.spreadNoneButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: _ui_utils.SpreadMode.NONE
      },
      close: true
    }, {
      element: options.spreadOddButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: _ui_utils.SpreadMode.ODD
      },
      close: true
    }, {
      element: options.spreadEvenButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: _ui_utils.SpreadMode.EVEN
      },
      close: true
    }, {
      element: options.documentPropertiesButton,
      eventName: "documentproperties",
      close: true
    }];
    this.items = {
      firstPage: options.firstPageButton,
      lastPage: options.lastPageButton,
      pageRotateCw: options.pageRotateCwButton,
      pageRotateCcw: options.pageRotateCcwButton
    };
    this.mainContainer = mainContainer;
    this.eventBus = eventBus;
    this.opened = false;
    this.containerHeight = null;
    this.previousContainerHeight = null;
    this.reset();

    this._bindClickListeners();

    this._bindCursorToolsListener(options);

    this._bindScrollModeListener(options);

    this._bindSpreadModeListener(options);

    this.eventBus._on("resize", this._setMaxHeight.bind(this));
  }

  _createClass(SecondaryToolbar, [{
    key: "isOpen",
    get: function get() {
      return this.opened;
    }
  }, {
    key: "setPageNumber",
    value: function setPageNumber(pageNumber) {
      this.pageNumber = pageNumber;

      this._updateUIState();
    }
  }, {
    key: "setPagesCount",
    value: function setPagesCount(pagesCount) {
      this.pagesCount = pagesCount;

      this._updateUIState();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pageNumber = 0;
      this.pagesCount = 0;

      this._updateUIState();

      this.eventBus.dispatch("secondarytoolbarreset", {
        source: this
      });
    }
  }, {
    key: "_updateUIState",
    value: function _updateUIState() {
      this.items.firstPage.disabled = this.pageNumber <= 1;
      this.items.lastPage.disabled = this.pageNumber >= this.pagesCount;
      this.items.pageRotateCw.disabled = this.pagesCount === 0;
      this.items.pageRotateCcw.disabled = this.pagesCount === 0;
    }
  }, {
    key: "_bindClickListeners",
    value: function _bindClickListeners() {
      var _this = this;

      this.toggleButton.addEventListener("click", this.toggle.bind(this));

      var _iterator = _createForOfIteratorHelper(this.buttons),
          _step;

      try {
        var _loop = function _loop() {
          var _step$value = _step.value,
              element = _step$value.element,
              eventName = _step$value.eventName,
              close = _step$value.close,
              eventDetails = _step$value.eventDetails;
          element.addEventListener("click", function (evt) {
            if (eventName !== null) {
              var details = {
                source: _this
              };

              for (var property in eventDetails) {
                details[property] = eventDetails[property];
              }

              _this.eventBus.dispatch(eventName, details);
            }

            if (close) {
              _this.close();
            }
          });
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_bindCursorToolsListener",
    value: function _bindCursorToolsListener(buttons) {
      this.eventBus._on("cursortoolchanged", function (_ref) {
        var tool = _ref.tool;
        buttons.cursorSelectToolButton.classList.toggle("toggled", tool === _pdf_cursor_tools.CursorTool.SELECT);
        buttons.cursorHandToolButton.classList.toggle("toggled", tool === _pdf_cursor_tools.CursorTool.HAND);
      });
    }
  }, {
    key: "_bindScrollModeListener",
    value: function _bindScrollModeListener(buttons) {
      var _this2 = this;

      var scrollModeChanged = function scrollModeChanged(_ref2) {
        var mode = _ref2.mode;
        buttons.scrollPageButton.classList.toggle("toggled", mode === _ui_utils.ScrollMode.PAGE);
        buttons.scrollVerticalButton.classList.toggle("toggled", mode === _ui_utils.ScrollMode.VERTICAL);
        buttons.scrollHorizontalButton.classList.toggle("toggled", mode === _ui_utils.ScrollMode.HORIZONTAL);
        buttons.scrollWrappedButton.classList.toggle("toggled", mode === _ui_utils.ScrollMode.WRAPPED);
        var forceScrollModePage = _this2.pagesCount > _base_viewer.PagesCountLimit.FORCE_SCROLL_MODE_PAGE;
        buttons.scrollPageButton.disabled = forceScrollModePage;
        buttons.scrollVerticalButton.disabled = forceScrollModePage;
        buttons.scrollHorizontalButton.disabled = forceScrollModePage;
        buttons.scrollWrappedButton.disabled = forceScrollModePage;
        var isScrollModeHorizontal = mode === _ui_utils.ScrollMode.HORIZONTAL;
        buttons.spreadNoneButton.disabled = isScrollModeHorizontal;
        buttons.spreadOddButton.disabled = isScrollModeHorizontal;
        buttons.spreadEvenButton.disabled = isScrollModeHorizontal;
      };

      this.eventBus._on("scrollmodechanged", scrollModeChanged);

      this.eventBus._on("secondarytoolbarreset", function (evt) {
        if (evt.source === _this2) {
          scrollModeChanged({
            mode: _ui_utils.ScrollMode.VERTICAL
          });
        }
      });
    }
  }, {
    key: "_bindSpreadModeListener",
    value: function _bindSpreadModeListener(buttons) {
      var _this3 = this;

      function spreadModeChanged(_ref3) {
        var mode = _ref3.mode;
        buttons.spreadNoneButton.classList.toggle("toggled", mode === _ui_utils.SpreadMode.NONE);
        buttons.spreadOddButton.classList.toggle("toggled", mode === _ui_utils.SpreadMode.ODD);
        buttons.spreadEvenButton.classList.toggle("toggled", mode === _ui_utils.SpreadMode.EVEN);
      }

      this.eventBus._on("spreadmodechanged", spreadModeChanged);

      this.eventBus._on("secondarytoolbarreset", function (evt) {
        if (evt.source === _this3) {
          spreadModeChanged({
            mode: _ui_utils.SpreadMode.NONE
          });
        }
      });
    }
  }, {
    key: "open",
    value: function open() {
      if (this.opened) {
        return;
      }

      this.opened = true;

      this._setMaxHeight();

      this.toggleButton.classList.add("toggled");
      this.toggleButton.setAttribute("aria-expanded", "true");
      this.toolbar.classList.remove("hidden");
    }
  }, {
    key: "close",
    value: function close() {
      if (!this.opened) {
        return;
      }

      this.opened = false;
      this.toolbar.classList.add("hidden");
      this.toggleButton.classList.remove("toggled");
      this.toggleButton.setAttribute("aria-expanded", "false");
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: "_setMaxHeight",
    value: function _setMaxHeight() {
      if (!this.opened) {
        return;
      }

      this.containerHeight = this.mainContainer.clientHeight;

      if (this.containerHeight === this.previousContainerHeight) {
        return;
      }

      this.toolbarButtonContainer.style.maxHeight = "".concat(this.containerHeight - _ui_utils.SCROLLBAR_PADDING, "px");
      this.previousContainerHeight = this.containerHeight;
    }
  }]);

  return SecondaryToolbar;
}();

exports.SecondaryToolbar = SecondaryToolbar;