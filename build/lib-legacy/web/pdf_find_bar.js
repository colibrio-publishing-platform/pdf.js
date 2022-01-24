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
exports.PDFFindBar = void 0;

var _pdf_find_controller = require("./pdf_find_controller.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MATCHES_COUNT_LIMIT = 1000;

var PDFFindBar = /*#__PURE__*/function () {
  function PDFFindBar(options, eventBus, l10n) {
    var _this = this;

    _classCallCheck(this, PDFFindBar);

    this.opened = false;
    this.bar = options.bar;
    this.toggleButton = options.toggleButton;
    this.findField = options.findField;
    this.highlightAll = options.highlightAllCheckbox;
    this.caseSensitive = options.caseSensitiveCheckbox;
    this.entireWord = options.entireWordCheckbox;
    this.findMsg = options.findMsg;
    this.findResultsCount = options.findResultsCount;
    this.findPreviousButton = options.findPreviousButton;
    this.findNextButton = options.findNextButton;
    this.eventBus = eventBus;
    this.l10n = l10n;
    this.toggleButton.addEventListener("click", function () {
      _this.toggle();
    });
    this.findField.addEventListener("input", function () {
      _this.dispatchEvent("");
    });
    this.bar.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 13:
          if (e.target === _this.findField) {
            _this.dispatchEvent("again", e.shiftKey);
          }

          break;

        case 27:
          _this.close();

          break;
      }
    });
    this.findPreviousButton.addEventListener("click", function () {
      _this.dispatchEvent("again", true);
    });
    this.findNextButton.addEventListener("click", function () {
      _this.dispatchEvent("again", false);
    });
    this.highlightAll.addEventListener("click", function () {
      _this.dispatchEvent("highlightallchange");
    });
    this.caseSensitive.addEventListener("click", function () {
      _this.dispatchEvent("casesensitivitychange");
    });
    this.entireWord.addEventListener("click", function () {
      _this.dispatchEvent("entirewordchange");
    });

    this.eventBus._on("resize", this._adjustWidth.bind(this));
  }

  _createClass(PDFFindBar, [{
    key: "reset",
    value: function reset() {
      this.updateUIState();
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(type) {
      var findPrev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.eventBus.dispatch("find", {
        source: this,
        type: type,
        query: this.findField.value,
        phraseSearch: true,
        caseSensitive: this.caseSensitive.checked,
        entireWord: this.entireWord.checked,
        highlightAll: this.highlightAll.checked,
        findPrevious: findPrev
      });
    }
  }, {
    key: "updateUIState",
    value: function updateUIState(state, previous, matchesCount) {
      var _this2 = this;

      var findMsg = Promise.resolve("");
      var status = "";

      switch (state) {
        case _pdf_find_controller.FindState.FOUND:
          break;

        case _pdf_find_controller.FindState.PENDING:
          status = "pending";
          break;

        case _pdf_find_controller.FindState.NOT_FOUND:
          findMsg = this.l10n.get("find_not_found");
          status = "notFound";
          break;

        case _pdf_find_controller.FindState.WRAPPED:
          findMsg = this.l10n.get("find_reached_".concat(previous ? "top" : "bottom"));
          break;
      }

      this.findField.setAttribute("data-status", status);
      findMsg.then(function (msg) {
        _this2.findMsg.textContent = msg;

        _this2._adjustWidth();
      });
      this.updateResultsCount(matchesCount);
    }
  }, {
    key: "updateResultsCount",
    value: function updateResultsCount() {
      var _this3 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$current = _ref.current,
          current = _ref$current === void 0 ? 0 : _ref$current,
          _ref$total = _ref.total,
          total = _ref$total === void 0 ? 0 : _ref$total;

      var limit = MATCHES_COUNT_LIMIT;
      var matchCountMsg = Promise.resolve("");

      if (total > 0) {
        if (total > limit) {
          var key = "find_match_count_limit";
          matchCountMsg = this.l10n.get(key, {
            limit: limit
          });
        } else {
          var _key = "find_match_count";
          matchCountMsg = this.l10n.get(_key, {
            current: current,
            total: total
          });
        }
      }

      matchCountMsg.then(function (msg) {
        _this3.findResultsCount.textContent = msg;

        _this3.findResultsCount.classList.toggle("hidden", !total);

        _this3._adjustWidth();
      });
    }
  }, {
    key: "open",
    value: function open() {
      if (!this.opened) {
        this.opened = true;
        this.toggleButton.classList.add("toggled");
        this.toggleButton.setAttribute("aria-expanded", "true");
        this.bar.classList.remove("hidden");
      }

      this.findField.select();
      this.findField.focus();

      this._adjustWidth();
    }
  }, {
    key: "close",
    value: function close() {
      if (!this.opened) {
        return;
      }

      this.opened = false;
      this.toggleButton.classList.remove("toggled");
      this.toggleButton.setAttribute("aria-expanded", "false");
      this.bar.classList.add("hidden");
      this.eventBus.dispatch("findbarclose", {
        source: this
      });
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
    key: "_adjustWidth",
    value: function _adjustWidth() {
      if (!this.opened) {
        return;
      }

      this.bar.classList.remove("wrapContainers");
      var findbarHeight = this.bar.clientHeight;
      var inputContainerHeight = this.bar.firstElementChild.clientHeight;

      if (findbarHeight > inputContainerHeight) {
        this.bar.classList.add("wrapContainers");
      }
    }
  }]);

  return PDFFindBar;
}();

exports.PDFFindBar = PDFFindBar;