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
exports.PDFFindController = exports.FindState = void 0;

var _pdf = require("../pdf");

var _pdf_find_utils = require("./pdf_find_utils.js");

var _ui_utils = require("./ui_utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3
};
exports.FindState = FindState;
var FIND_TIMEOUT = 250;
var MATCH_SCROLL_OFFSET_TOP = -50;
var MATCH_SCROLL_OFFSET_LEFT = -400;
var CHARACTERS_TO_NORMALIZE = {
  "\u2010": "-",
  "\u2018": "'",
  "\u2019": "'",
  "\u201A": "'",
  "\u201B": "'",
  "\u201C": '"',
  "\u201D": '"',
  "\u201E": '"',
  "\u201F": '"',
  "\xBC": "1/4",
  "\xBD": "1/2",
  "\xBE": "3/4"
};
var normalizationRegex = null;

function normalize(text) {
  if (!normalizationRegex) {
    var replace = Object.keys(CHARACTERS_TO_NORMALIZE).join("");
    normalizationRegex = new RegExp("[".concat(replace, "]"), "g");
  }

  var diffs = null;
  var normalizedText = text.replace(normalizationRegex, function (ch, index) {
    var normalizedCh = CHARACTERS_TO_NORMALIZE[ch],
        diff = normalizedCh.length - ch.length;

    if (diff !== 0) {
      (diffs || (diffs = [])).push([index, diff]);
    }

    return normalizedCh;
  });
  return [normalizedText, diffs];
}

function getOriginalIndex(matchIndex) {
  var diffs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!diffs) {
    return matchIndex;
  }

  var totalDiff = 0;

  var _iterator = _createForOfIteratorHelper(diffs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          index = _step$value[0],
          diff = _step$value[1];

      var currentIndex = index + totalDiff;

      if (currentIndex >= matchIndex) {
        break;
      }

      if (currentIndex + diff > matchIndex) {
        totalDiff += matchIndex - currentIndex;
        break;
      }

      totalDiff += diff;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return matchIndex - totalDiff;
}

var PDFFindController = /*#__PURE__*/function () {
  function PDFFindController(_ref) {
    var _this = this;

    var linkService = _ref.linkService,
        eventBus = _ref.eventBus;

    _classCallCheck(this, PDFFindController);

    this._linkService = linkService;
    this._eventBus = eventBus;

    this._reset();

    eventBus._on("find", this._onFind.bind(this));

    eventBus._on("findbarclose", this._onFindBarClose.bind(this));

    this.executeCommand = function (cmd, state) {
      console.error("Deprecated method `PDFFindController.executeCommand` called, " + 'please dispatch a "find"-event using the EventBus instead.');
      var eventState = Object.assign(Object.create(null), state, {
        type: cmd.substring("find".length)
      });

      _this._onFind(eventState);
    };
  }

  _createClass(PDFFindController, [{
    key: "highlightMatches",
    get: function get() {
      return this._highlightMatches;
    }
  }, {
    key: "pageMatches",
    get: function get() {
      return this._pageMatches;
    }
  }, {
    key: "pageMatchesLength",
    get: function get() {
      return this._pageMatchesLength;
    }
  }, {
    key: "selected",
    get: function get() {
      return this._selected;
    }
  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
  }, {
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      if (this._pdfDocument) {
        this._reset();
      }

      if (!pdfDocument) {
        return;
      }

      this._pdfDocument = pdfDocument;

      this._firstPageCapability.resolve();
    }
  }, {
    key: "_onFind",
    value: function _onFind(state) {
      var _this2 = this;

      if (!state) {
        return;
      }

      var pdfDocument = this._pdfDocument;
      var type = state.type;

      if (this._state === null || this._shouldDirtyMatch(state)) {
        this._dirtyMatch = true;
      }

      this._state = state;

      if (type !== "highlightallchange") {
        this._updateUIState(FindState.PENDING);
      }

      this._firstPageCapability.promise.then(function () {
        if (!_this2._pdfDocument || pdfDocument && _this2._pdfDocument !== pdfDocument) {
          return;
        }

        _this2._extractText();

        var findbarClosed = !_this2._highlightMatches;
        var pendingTimeout = !!_this2._findTimeout;

        if (_this2._findTimeout) {
          clearTimeout(_this2._findTimeout);
          _this2._findTimeout = null;
        }

        if (!type) {
          _this2._findTimeout = setTimeout(function () {
            _this2._nextMatch();

            _this2._findTimeout = null;
          }, FIND_TIMEOUT);
        } else if (_this2._dirtyMatch) {
          _this2._nextMatch();
        } else if (type === "again") {
          _this2._nextMatch();

          if (findbarClosed && _this2._state.highlightAll) {
            _this2._updateAllPages();
          }
        } else if (type === "highlightallchange") {
          if (pendingTimeout) {
            _this2._nextMatch();
          } else {
            _this2._highlightMatches = true;
          }

          _this2._updateAllPages();
        } else {
          _this2._nextMatch();
        }
      });
    }
  }, {
    key: "scrollMatchIntoView",
    value: function scrollMatchIntoView(_ref2) {
      var _ref2$element = _ref2.element,
          element = _ref2$element === void 0 ? null : _ref2$element,
          _ref2$selectedLeft = _ref2.selectedLeft,
          selectedLeft = _ref2$selectedLeft === void 0 ? 0 : _ref2$selectedLeft,
          _ref2$pageIndex = _ref2.pageIndex,
          pageIndex = _ref2$pageIndex === void 0 ? -1 : _ref2$pageIndex,
          _ref2$matchIndex = _ref2.matchIndex,
          matchIndex = _ref2$matchIndex === void 0 ? -1 : _ref2$matchIndex;

      if (!this._scrollMatches || !element) {
        return;
      } else if (matchIndex === -1 || matchIndex !== this._selected.matchIdx) {
        return;
      } else if (pageIndex === -1 || pageIndex !== this._selected.pageIdx) {
        return;
      }

      this._scrollMatches = false;
      var spot = {
        top: MATCH_SCROLL_OFFSET_TOP,
        left: selectedLeft + MATCH_SCROLL_OFFSET_LEFT
      };
      (0, _ui_utils.scrollIntoView)(element, spot, true);
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._highlightMatches = false;
      this._scrollMatches = false;
      this._pdfDocument = null;
      this._pageMatches = [];
      this._pageMatchesLength = [];
      this._state = null;
      this._selected = {
        pageIdx: -1,
        matchIdx: -1
      };
      this._offset = {
        pageIdx: null,
        matchIdx: null,
        wrapped: false
      };
      this._extractTextPromises = [];
      this._pageContents = [];
      this._pageDiffs = [];
      this._matchesCountTotal = 0;
      this._pagesToSearch = null;
      this._pendingFindMatches = new Set();
      this._resumePageIdx = null;
      this._dirtyMatch = false;
      clearTimeout(this._findTimeout);
      this._findTimeout = null;
      this._firstPageCapability = (0, _pdf.createPromiseCapability)();
    }
  }, {
    key: "_query",
    get: function get() {
      if (this._state.query !== this._rawQuery) {
        this._rawQuery = this._state.query;

        var _normalize = normalize(this._state.query);

        var _normalize2 = _slicedToArray(_normalize, 1);

        this._normalizedQuery = _normalize2[0];
      }

      return this._normalizedQuery;
    }
  }, {
    key: "_shouldDirtyMatch",
    value: function _shouldDirtyMatch(state) {
      if (state.query !== this._state.query) {
        return true;
      }

      switch (state.type) {
        case "again":
          var pageNumber = this._selected.pageIdx + 1;
          var linkService = this._linkService;

          if (pageNumber >= 1 && pageNumber <= linkService.pagesCount && pageNumber !== linkService.page && !linkService.isPageVisible(pageNumber)) {
            return true;
          }

          return false;

        case "highlightallchange":
          return false;
      }

      return true;
    }
  }, {
    key: "_prepareMatches",
    value: function _prepareMatches(matchesWithLength, matches, matchesLength) {
      function isSubTerm(currentIndex) {
        var currentElem = matchesWithLength[currentIndex];
        var nextElem = matchesWithLength[currentIndex + 1];

        if (currentIndex < matchesWithLength.length - 1 && currentElem.match === nextElem.match) {
          currentElem.skipped = true;
          return true;
        }

        for (var i = currentIndex - 1; i >= 0; i--) {
          var prevElem = matchesWithLength[i];

          if (prevElem.skipped) {
            continue;
          }

          if (prevElem.match + prevElem.matchLength < currentElem.match) {
            break;
          }

          if (prevElem.match + prevElem.matchLength >= currentElem.match + currentElem.matchLength) {
            currentElem.skipped = true;
            return true;
          }
        }

        return false;
      }

      matchesWithLength.sort(function (a, b) {
        return a.match === b.match ? a.matchLength - b.matchLength : a.match - b.match;
      });

      for (var i = 0, len = matchesWithLength.length; i < len; i++) {
        if (isSubTerm(i)) {
          continue;
        }

        matches.push(matchesWithLength[i].match);
        matchesLength.push(matchesWithLength[i].matchLength);
      }
    }
  }, {
    key: "_isEntireWord",
    value: function _isEntireWord(content, startIdx, length) {
      if (startIdx > 0) {
        var first = content.charCodeAt(startIdx);
        var limit = content.charCodeAt(startIdx - 1);

        if ((0, _pdf_find_utils.getCharacterType)(first) === (0, _pdf_find_utils.getCharacterType)(limit)) {
          return false;
        }
      }

      var endIdx = startIdx + length - 1;

      if (endIdx < content.length - 1) {
        var last = content.charCodeAt(endIdx);

        var _limit = content.charCodeAt(endIdx + 1);

        if ((0, _pdf_find_utils.getCharacterType)(last) === (0, _pdf_find_utils.getCharacterType)(_limit)) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_calculatePhraseMatch",
    value: function _calculatePhraseMatch(query, pageIndex, pageContent, pageDiffs, entireWord) {
      var matches = [],
          matchesLength = [];
      var queryLen = query.length;
      var matchIdx = -queryLen;

      while (true) {
        matchIdx = pageContent.indexOf(query, matchIdx + queryLen);

        if (matchIdx === -1) {
          break;
        }

        if (entireWord && !this._isEntireWord(pageContent, matchIdx, queryLen)) {
          continue;
        }

        var originalMatchIdx = getOriginalIndex(matchIdx, pageDiffs),
            matchEnd = matchIdx + queryLen - 1,
            originalQueryLen = getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;
        matches.push(originalMatchIdx);
        matchesLength.push(originalQueryLen);
      }

      this._pageMatches[pageIndex] = matches;
      this._pageMatchesLength[pageIndex] = matchesLength;
    }
  }, {
    key: "_calculateWordMatch",
    value: function _calculateWordMatch(query, pageIndex, pageContent, pageDiffs, entireWord) {
      var matchesWithLength = [];
      var queryArray = query.match(/\S+/g);

      for (var i = 0, len = queryArray.length; i < len; i++) {
        var subquery = queryArray[i];
        var subqueryLen = subquery.length;
        var matchIdx = -subqueryLen;

        while (true) {
          matchIdx = pageContent.indexOf(subquery, matchIdx + subqueryLen);

          if (matchIdx === -1) {
            break;
          }

          if (entireWord && !this._isEntireWord(pageContent, matchIdx, subqueryLen)) {
            continue;
          }

          var originalMatchIdx = getOriginalIndex(matchIdx, pageDiffs),
              matchEnd = matchIdx + subqueryLen - 1,
              originalQueryLen = getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;
          matchesWithLength.push({
            match: originalMatchIdx,
            matchLength: originalQueryLen,
            skipped: false
          });
        }
      }

      this._pageMatchesLength[pageIndex] = [];
      this._pageMatches[pageIndex] = [];

      this._prepareMatches(matchesWithLength, this._pageMatches[pageIndex], this._pageMatchesLength[pageIndex]);
    }
  }, {
    key: "_calculateMatch",
    value: function _calculateMatch(pageIndex) {
      var pageContent = this._pageContents[pageIndex];
      var pageDiffs = this._pageDiffs[pageIndex];
      var query = this._query;
      var _this$_state = this._state,
          caseSensitive = _this$_state.caseSensitive,
          entireWord = _this$_state.entireWord,
          phraseSearch = _this$_state.phraseSearch;

      if (query.length === 0) {
        return;
      }

      if (!caseSensitive) {
        pageContent = pageContent.toLowerCase();
        query = query.toLowerCase();
      }

      if (phraseSearch) {
        this._calculatePhraseMatch(query, pageIndex, pageContent, pageDiffs, entireWord);
      } else {
        this._calculateWordMatch(query, pageIndex, pageContent, pageDiffs, entireWord);
      }

      if (this._state.highlightAll) {
        this._updatePage(pageIndex);
      }

      if (this._resumePageIdx === pageIndex) {
        this._resumePageIdx = null;

        this._nextPageMatch();
      }

      var pageMatchesCount = this._pageMatches[pageIndex].length;

      if (pageMatchesCount > 0) {
        this._matchesCountTotal += pageMatchesCount;

        this._updateUIResultsCount();
      }
    }
  }, {
    key: "_extractText",
    value: function _extractText() {
      var _this3 = this;

      if (this._extractTextPromises.length > 0) {
        return;
      }

      var promise = Promise.resolve();

      var _loop = function _loop(i, ii) {
        var extractTextCapability = (0, _pdf.createPromiseCapability)();
        _this3._extractTextPromises[i] = extractTextCapability.promise;
        promise = promise.then(function () {
          return _this3._pdfDocument.getPage(i + 1).then(function (pdfPage) {
            return pdfPage.getTextContent({
              normalizeWhitespace: true
            });
          }).then(function (textContent) {
            var textItems = textContent.items;
            var strBuf = [];

            for (var j = 0, jj = textItems.length; j < jj; j++) {
              strBuf.push(textItems[j].str);
            }

            var _normalize3 = normalize(strBuf.join(""));

            var _normalize4 = _slicedToArray(_normalize3, 2);

            _this3._pageContents[i] = _normalize4[0];
            _this3._pageDiffs[i] = _normalize4[1];
            extractTextCapability.resolve(i);
          }, function (reason) {
            console.error("Unable to get text content for page ".concat(i + 1), reason);
            _this3._pageContents[i] = "";
            _this3._pageDiffs[i] = null;
            extractTextCapability.resolve(i);
          });
        });
      };

      for (var i = 0, ii = this._linkService.pagesCount; i < ii; i++) {
        _loop(i, ii);
      }
    }
  }, {
    key: "_updatePage",
    value: function _updatePage(index) {
      if (this._scrollMatches && this._selected.pageIdx === index) {
        this._linkService.page = index + 1;
      }

      this._eventBus.dispatch("updatetextlayermatches", {
        source: this,
        pageIndex: index
      });
    }
  }, {
    key: "_updateAllPages",
    value: function _updateAllPages() {
      this._eventBus.dispatch("updatetextlayermatches", {
        source: this,
        pageIndex: -1
      });
    }
  }, {
    key: "_nextMatch",
    value: function _nextMatch() {
      var _this4 = this;

      var previous = this._state.findPrevious;
      var currentPageIndex = this._linkService.page - 1;
      var numPages = this._linkService.pagesCount;
      this._highlightMatches = true;

      if (this._dirtyMatch) {
        this._dirtyMatch = false;
        this._selected.pageIdx = this._selected.matchIdx = -1;
        this._offset.pageIdx = currentPageIndex;
        this._offset.matchIdx = null;
        this._offset.wrapped = false;
        this._resumePageIdx = null;
        this._pageMatches.length = 0;
        this._pageMatchesLength.length = 0;
        this._matchesCountTotal = 0;

        this._updateAllPages();

        for (var i = 0; i < numPages; i++) {
          if (this._pendingFindMatches.has(i)) {
            continue;
          }

          this._pendingFindMatches.add(i);

          this._extractTextPromises[i].then(function (pageIdx) {
            _this4._pendingFindMatches["delete"](pageIdx);

            _this4._calculateMatch(pageIdx);
          });
        }
      }

      if (this._query === "") {
        this._updateUIState(FindState.FOUND);

        return;
      }

      if (this._resumePageIdx) {
        return;
      }

      var offset = this._offset;
      this._pagesToSearch = numPages;

      if (offset.matchIdx !== null) {
        var numPageMatches = this._pageMatches[offset.pageIdx].length;

        if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0) {
          offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;

          this._updateMatch(true);

          return;
        }

        this._advanceOffsetPage(previous);
      }

      this._nextPageMatch();
    }
  }, {
    key: "_matchesReady",
    value: function _matchesReady(matches) {
      var offset = this._offset;
      var numMatches = matches.length;
      var previous = this._state.findPrevious;

      if (numMatches) {
        offset.matchIdx = previous ? numMatches - 1 : 0;

        this._updateMatch(true);

        return true;
      }

      this._advanceOffsetPage(previous);

      if (offset.wrapped) {
        offset.matchIdx = null;

        if (this._pagesToSearch < 0) {
          this._updateMatch(false);

          return true;
        }
      }

      return false;
    }
  }, {
    key: "_nextPageMatch",
    value: function _nextPageMatch() {
      if (this._resumePageIdx !== null) {
        console.error("There can only be one pending page.");
      }

      var matches = null;

      do {
        var pageIdx = this._offset.pageIdx;
        matches = this._pageMatches[pageIdx];

        if (!matches) {
          this._resumePageIdx = pageIdx;
          break;
        }
      } while (!this._matchesReady(matches));
    }
  }, {
    key: "_advanceOffsetPage",
    value: function _advanceOffsetPage(previous) {
      var offset = this._offset;
      var numPages = this._linkService.pagesCount;
      offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
      offset.matchIdx = null;
      this._pagesToSearch--;

      if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
        offset.pageIdx = previous ? numPages - 1 : 0;
        offset.wrapped = true;
      }
    }
  }, {
    key: "_updateMatch",
    value: function _updateMatch() {
      var found = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var state = FindState.NOT_FOUND;
      var wrapped = this._offset.wrapped;
      this._offset.wrapped = false;

      if (found) {
        var previousPage = this._selected.pageIdx;
        this._selected.pageIdx = this._offset.pageIdx;
        this._selected.matchIdx = this._offset.matchIdx;
        state = wrapped ? FindState.WRAPPED : FindState.FOUND;

        if (previousPage !== -1 && previousPage !== this._selected.pageIdx) {
          this._updatePage(previousPage);
        }
      }

      this._updateUIState(state, this._state.findPrevious);

      if (this._selected.pageIdx !== -1) {
        this._scrollMatches = true;

        this._updatePage(this._selected.pageIdx);
      }
    }
  }, {
    key: "_onFindBarClose",
    value: function _onFindBarClose(evt) {
      var _this5 = this;

      var pdfDocument = this._pdfDocument;

      this._firstPageCapability.promise.then(function () {
        if (!_this5._pdfDocument || pdfDocument && _this5._pdfDocument !== pdfDocument) {
          return;
        }

        if (_this5._findTimeout) {
          clearTimeout(_this5._findTimeout);
          _this5._findTimeout = null;
        }

        if (_this5._resumePageIdx) {
          _this5._resumePageIdx = null;
          _this5._dirtyMatch = true;
        }

        _this5._updateUIState(FindState.FOUND);

        _this5._highlightMatches = false;

        _this5._updateAllPages();
      });
    }
  }, {
    key: "_requestMatchesCount",
    value: function _requestMatchesCount() {
      var _this$_selected = this._selected,
          pageIdx = _this$_selected.pageIdx,
          matchIdx = _this$_selected.matchIdx;
      var current = 0,
          total = this._matchesCountTotal;

      if (matchIdx !== -1) {
        for (var i = 0; i < pageIdx; i++) {
          var _this$_pageMatches$i;

          current += ((_this$_pageMatches$i = this._pageMatches[i]) === null || _this$_pageMatches$i === void 0 ? void 0 : _this$_pageMatches$i.length) || 0;
        }

        current += matchIdx + 1;
      }

      if (current < 1 || current > total) {
        current = total = 0;
      }

      return {
        current: current,
        total: total
      };
    }
  }, {
    key: "_updateUIResultsCount",
    value: function _updateUIResultsCount() {
      this._eventBus.dispatch("updatefindmatchescount", {
        source: this,
        matchesCount: this._requestMatchesCount()
      });
    }
  }, {
    key: "_updateUIState",
    value: function _updateUIState(state) {
      var _this$_state$query, _this$_state2;

      var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._eventBus.dispatch("updatefindcontrolstate", {
        source: this,
        state: state,
        previous: previous,
        matchesCount: this._requestMatchesCount(),
        rawQuery: (_this$_state$query = (_this$_state2 = this._state) === null || _this$_state2 === void 0 ? void 0 : _this$_state2.query) !== null && _this$_state$query !== void 0 ? _this$_state$query : null
      });
    }
  }]);

  return PDFFindController;
}();

exports.PDFFindController = PDFFindController;