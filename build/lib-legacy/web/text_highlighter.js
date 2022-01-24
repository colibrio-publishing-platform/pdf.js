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
exports.TextHighlighter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TextHighlighter = /*#__PURE__*/function () {
  function TextHighlighter(_ref) {
    var findController = _ref.findController,
        eventBus = _ref.eventBus,
        pageIndex = _ref.pageIndex;

    _classCallCheck(this, TextHighlighter);

    this.findController = findController;
    this.matches = [];
    this.eventBus = eventBus;
    this.pageIdx = pageIndex;
    this._onUpdateTextLayerMatches = null;
    this.textDivs = null;
    this.textContentItemsStr = null;
    this.enabled = false;
  }

  _createClass(TextHighlighter, [{
    key: "setTextMapping",
    value: function setTextMapping(divs, texts) {
      this.textDivs = divs;
      this.textContentItemsStr = texts;
    }
  }, {
    key: "enable",
    value: function enable() {
      var _this = this;

      if (!this.textDivs || !this.textContentItemsStr) {
        throw new Error("Text divs and strings have not been set.");
      }

      if (this.enabled) {
        throw new Error("TextHighlighter is already enabled.");
      }

      this.enabled = true;

      if (!this._onUpdateTextLayerMatches) {
        this._onUpdateTextLayerMatches = function (evt) {
          if (evt.pageIndex === _this.pageIdx || evt.pageIndex === -1) {
            _this._updateMatches();
          }
        };

        this.eventBus._on("updatetextlayermatches", this._onUpdateTextLayerMatches);
      }

      this._updateMatches();
    }
  }, {
    key: "disable",
    value: function disable() {
      if (!this.enabled) {
        return;
      }

      this.enabled = false;

      if (this._onUpdateTextLayerMatches) {
        this.eventBus._off("updatetextlayermatches", this._onUpdateTextLayerMatches);

        this._onUpdateTextLayerMatches = null;
      }
    }
  }, {
    key: "_convertMatches",
    value: function _convertMatches(matches, matchesLength) {
      if (!matches) {
        return [];
      }

      var textContentItemsStr = this.textContentItemsStr;
      var i = 0,
          iIndex = 0;
      var end = textContentItemsStr.length - 1;
      var result = [];

      for (var m = 0, mm = matches.length; m < mm; m++) {
        var matchIdx = matches[m];

        while (i !== end && matchIdx >= iIndex + textContentItemsStr[i].length) {
          iIndex += textContentItemsStr[i].length;
          i++;
        }

        if (i === textContentItemsStr.length) {
          console.error("Could not find a matching mapping");
        }

        var match = {
          begin: {
            divIdx: i,
            offset: matchIdx - iIndex
          }
        };
        matchIdx += matchesLength[m];

        while (i !== end && matchIdx > iIndex + textContentItemsStr[i].length) {
          iIndex += textContentItemsStr[i].length;
          i++;
        }

        match.end = {
          divIdx: i,
          offset: matchIdx - iIndex
        };
        result.push(match);
      }

      return result;
    }
  }, {
    key: "_renderMatches",
    value: function _renderMatches(matches) {
      if (matches.length === 0) {
        return;
      }

      var findController = this.findController,
          pageIdx = this.pageIdx;
      var textContentItemsStr = this.textContentItemsStr,
          textDivs = this.textDivs;
      var isSelectedPage = pageIdx === findController.selected.pageIdx;
      var selectedMatchIdx = findController.selected.matchIdx;
      var highlightAll = findController.state.highlightAll;
      var prevEnd = null;
      var infinity = {
        divIdx: -1,
        offset: undefined
      };

      function beginText(begin, className) {
        var divIdx = begin.divIdx;
        textDivs[divIdx].textContent = "";
        return appendTextToDiv(divIdx, 0, begin.offset, className);
      }

      function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
        var div = textDivs[divIdx];

        if (div.nodeType === Node.TEXT_NODE) {
          var span = document.createElement("span");
          div.parentNode.insertBefore(span, div);
          span.appendChild(div);
          textDivs[divIdx] = span;
          div = span;
        }

        var content = textContentItemsStr[divIdx].substring(fromOffset, toOffset);
        var node = document.createTextNode(content);

        if (className) {
          var _span = document.createElement("span");

          _span.className = "".concat(className, " appended");

          _span.appendChild(node);

          div.appendChild(_span);
          return className.includes("selected") ? _span.offsetLeft : 0;
        }

        div.appendChild(node);
        return 0;
      }

      var i0 = selectedMatchIdx,
          i1 = i0 + 1;

      if (highlightAll) {
        i0 = 0;
        i1 = matches.length;
      } else if (!isSelectedPage) {
        return;
      }

      for (var i = i0; i < i1; i++) {
        var match = matches[i];
        var begin = match.begin;
        var end = match.end;
        var isSelected = isSelectedPage && i === selectedMatchIdx;
        var highlightSuffix = isSelected ? " selected" : "";
        var selectedLeft = 0;

        if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
          if (prevEnd !== null) {
            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
          }

          beginText(begin);
        } else {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
        }

        if (begin.divIdx === end.divIdx) {
          selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, end.offset, "highlight" + highlightSuffix);
        } else {
          selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, "highlight begin" + highlightSuffix);

          for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
            textDivs[n0].className = "highlight middle" + highlightSuffix;
          }

          beginText(end, "highlight end" + highlightSuffix);
        }

        prevEnd = end;

        if (isSelected) {
          findController.scrollMatchIntoView({
            element: textDivs[begin.divIdx],
            selectedLeft: selectedLeft,
            pageIndex: pageIdx,
            matchIndex: selectedMatchIdx
          });
        }
      }

      if (prevEnd) {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
      }
    }
  }, {
    key: "_updateMatches",
    value: function _updateMatches() {
      if (!this.enabled) {
        return;
      }

      var findController = this.findController,
          matches = this.matches,
          pageIdx = this.pageIdx;
      var textContentItemsStr = this.textContentItemsStr,
          textDivs = this.textDivs;
      var clearedUntilDivIdx = -1;

      for (var i = 0, ii = matches.length; i < ii; i++) {
        var match = matches[i];
        var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);

        for (var n = begin, end = match.end.divIdx; n <= end; n++) {
          var div = textDivs[n];
          div.textContent = textContentItemsStr[n];
          div.className = "";
        }

        clearedUntilDivIdx = match.end.divIdx + 1;
      }

      if (!(findController !== null && findController !== void 0 && findController.highlightMatches)) {
        return;
      }

      var pageMatches = findController.pageMatches[pageIdx] || null;
      var pageMatchesLength = findController.pageMatchesLength[pageIdx] || null;
      this.matches = this._convertMatches(pageMatches, pageMatchesLength);

      this._renderMatches(this.matches);
    }
  }]);

  return TextHighlighter;
}();

exports.TextHighlighter = TextHighlighter;