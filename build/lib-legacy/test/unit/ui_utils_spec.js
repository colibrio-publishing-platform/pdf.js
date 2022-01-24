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

var _ui_utils = require("../../web/ui_utils.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

describe("ui_utils", function () {
  describe("binary search", function () {
    function isTrue(_boolean) {
      return _boolean;
    }

    function isGreater3(number) {
      return number > 3;
    }

    it("empty array", function () {
      expect((0, _ui_utils.binarySearchFirstItem)([], isTrue)).toEqual(0);
    });
    it("single boolean entry", function () {
      expect((0, _ui_utils.binarySearchFirstItem)([false], isTrue)).toEqual(1);
      expect((0, _ui_utils.binarySearchFirstItem)([true], isTrue)).toEqual(0);
    });
    it("three boolean entries", function () {
      expect((0, _ui_utils.binarySearchFirstItem)([true, true, true], isTrue)).toEqual(0);
      expect((0, _ui_utils.binarySearchFirstItem)([false, true, true], isTrue)).toEqual(1);
      expect((0, _ui_utils.binarySearchFirstItem)([false, false, true], isTrue)).toEqual(2);
      expect((0, _ui_utils.binarySearchFirstItem)([false, false, false], isTrue)).toEqual(3);
    });
    it("three numeric entries", function () {
      expect((0, _ui_utils.binarySearchFirstItem)([0, 1, 2], isGreater3)).toEqual(3);
      expect((0, _ui_utils.binarySearchFirstItem)([2, 3, 4], isGreater3)).toEqual(2);
      expect((0, _ui_utils.binarySearchFirstItem)([4, 5, 6], isGreater3)).toEqual(0);
    });
  });
  describe("isValidRotation", function () {
    it("should reject non-integer angles", function () {
      expect((0, _ui_utils.isValidRotation)()).toEqual(false);
      expect((0, _ui_utils.isValidRotation)(null)).toEqual(false);
      expect((0, _ui_utils.isValidRotation)(NaN)).toEqual(false);
      expect((0, _ui_utils.isValidRotation)([90])).toEqual(false);
      expect((0, _ui_utils.isValidRotation)("90")).toEqual(false);
      expect((0, _ui_utils.isValidRotation)(90.5)).toEqual(false);
    });
    it("should reject non-multiple of 90 degree angles", function () {
      expect((0, _ui_utils.isValidRotation)(45)).toEqual(false);
      expect((0, _ui_utils.isValidRotation)(-123)).toEqual(false);
    });
    it("should accept valid angles", function () {
      expect((0, _ui_utils.isValidRotation)(0)).toEqual(true);
      expect((0, _ui_utils.isValidRotation)(90)).toEqual(true);
      expect((0, _ui_utils.isValidRotation)(-270)).toEqual(true);
      expect((0, _ui_utils.isValidRotation)(540)).toEqual(true);
    });
  });
  describe("isPortraitOrientation", function () {
    it("should be portrait orientation", function () {
      expect((0, _ui_utils.isPortraitOrientation)({
        width: 200,
        height: 400
      })).toEqual(true);
      expect((0, _ui_utils.isPortraitOrientation)({
        width: 500,
        height: 500
      })).toEqual(true);
    });
    it("should be landscape orientation", function () {
      expect((0, _ui_utils.isPortraitOrientation)({
        width: 600,
        height: 300
      })).toEqual(false);
    });
  });
  describe("parseQueryString", function () {
    it("should parse one key/value pair", function () {
      var parameters = (0, _ui_utils.parseQueryString)("key1=value1");
      expect(parameters.size).toEqual(1);
      expect(parameters.get("key1")).toEqual("value1");
    });
    it("should parse multiple key/value pairs", function () {
      var parameters = (0, _ui_utils.parseQueryString)("key1=value1&key2=value2&key3=value3");
      expect(parameters.size).toEqual(3);
      expect(parameters.get("key1")).toEqual("value1");
      expect(parameters.get("key2")).toEqual("value2");
      expect(parameters.get("key3")).toEqual("value3");
    });
    it("should parse keys without values", function () {
      var parameters = (0, _ui_utils.parseQueryString)("key1");
      expect(parameters.size).toEqual(1);
      expect(parameters.get("key1")).toEqual("");
    });
    it("should decode encoded key/value pairs", function () {
      var parameters = (0, _ui_utils.parseQueryString)("k%C3%ABy1=valu%C3%AB1");
      expect(parameters.size).toEqual(1);
      expect(parameters.get("këy1")).toEqual("valuë1");
    });
    it("should convert keys to lowercase", function () {
      var parameters = (0, _ui_utils.parseQueryString)("Key1=Value1&KEY2=Value2");
      expect(parameters.size).toEqual(2);
      expect(parameters.get("key1")).toEqual("Value1");
      expect(parameters.get("key2")).toEqual("Value2");
    });
  });
  describe("getPageSizeInches", function () {
    it("gets page size (in inches)", function () {
      var page = {
        view: [0, 0, 595.28, 841.89],
        userUnit: 1.0,
        rotate: 0
      };

      var _getPageSizeInches = (0, _ui_utils.getPageSizeInches)(page),
          width = _getPageSizeInches.width,
          height = _getPageSizeInches.height;

      expect(+width.toPrecision(3)).toEqual(8.27);
      expect(+height.toPrecision(4)).toEqual(11.69);
    });
    it("gets page size (in inches), for non-default /Rotate entry", function () {
      var pdfPage1 = {
        view: [0, 0, 612, 792],
        userUnit: 1,
        rotate: 0
      };

      var _getPageSizeInches2 = (0, _ui_utils.getPageSizeInches)(pdfPage1),
          width1 = _getPageSizeInches2.width,
          height1 = _getPageSizeInches2.height;

      expect(width1).toEqual(8.5);
      expect(height1).toEqual(11);
      var pdfPage2 = {
        view: [0, 0, 612, 792],
        userUnit: 1,
        rotate: 90
      };

      var _getPageSizeInches3 = (0, _ui_utils.getPageSizeInches)(pdfPage2),
          width2 = _getPageSizeInches3.width,
          height2 = _getPageSizeInches3.height;

      expect(width2).toEqual(11);
      expect(height2).toEqual(8.5);
    });
  });
  describe("getVisibleElements", function () {
    var BORDER_WIDTH = 9;
    var SPACING = 2 * BORDER_WIDTH - 7;

    function makePages(lines) {
      var result = [];
      var lineTop = 0,
          id = 0;

      var _iterator = _createForOfIteratorHelper(lines),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          var lineHeight = line.reduce(function (maxHeight, pair) {
            return Math.max(maxHeight, pair[1]);
          }, 0);
          var offsetLeft = -BORDER_WIDTH;

          var _iterator2 = _createForOfIteratorHelper(line),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _step2$value = _slicedToArray(_step2.value, 2),
                  clientWidth = _step2$value[0],
                  clientHeight = _step2$value[1];

              var offsetTop = lineTop + (lineHeight - clientHeight) / 2 - BORDER_WIDTH;
              var div = {
                offsetLeft: offsetLeft,
                offsetTop: offsetTop,
                clientWidth: clientWidth,
                clientHeight: clientHeight,
                clientLeft: BORDER_WIDTH,
                clientTop: BORDER_WIDTH
              };
              result.push({
                id: id,
                div: div
              });
              ++id;
              offsetLeft += clientWidth + SPACING;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          lineTop += lineHeight + SPACING;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result;
    }

    function slowGetVisibleElements(scroll, pages) {
      var views = [],
          ids = new Set();
      var scrollLeft = scroll.scrollLeft,
          scrollTop = scroll.scrollTop;
      var scrollRight = scrollLeft + scroll.clientWidth;
      var scrollBottom = scrollTop + scroll.clientHeight;

      var _iterator3 = _createForOfIteratorHelper(pages),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var view = _step3.value;
          var div = view.div;
          var viewLeft = div.offsetLeft + div.clientLeft;
          var viewRight = viewLeft + div.clientWidth;
          var viewTop = div.offsetTop + div.clientTop;
          var viewBottom = viewTop + div.clientHeight;

          if (viewLeft < scrollRight && viewRight > scrollLeft && viewTop < scrollBottom && viewBottom > scrollTop) {
            var hiddenHeight = Math.max(0, scrollTop - viewTop) + Math.max(0, viewBottom - scrollBottom);
            var hiddenWidth = Math.max(0, scrollLeft - viewLeft) + Math.max(0, viewRight - scrollRight);
            var fractionHeight = (div.clientHeight - hiddenHeight) / div.clientHeight;
            var fractionWidth = (div.clientWidth - hiddenWidth) / div.clientWidth;
            var percent = fractionHeight * fractionWidth * 100 | 0;
            views.push({
              id: view.id,
              x: viewLeft,
              y: viewTop,
              view: view,
              percent: percent,
              widthPercent: fractionWidth * 100 | 0
            });
            ids.add(view.id);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return {
        first: views[0],
        last: views[views.length - 1],
        views: views,
        ids: ids
      };
    }

    function scrollOverDocument(pages) {
      var horizontal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var rtl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var size = pages.reduce(function (max, _ref) {
        var div = _ref.div;
        return Math.max(max, horizontal ? Math.abs(div.offsetLeft + div.clientLeft + div.clientWidth) : div.offsetTop + div.clientTop + div.clientHeight);
      }, 0);

      for (var i = -size; i < size; i += 7) {
        for (var j = i + 5; j < size; j += j - i) {
          var scrollEl = horizontal ? {
            scrollTop: 0,
            scrollLeft: i,
            clientHeight: 10000,
            clientWidth: j - i
          } : {
            scrollTop: i,
            scrollLeft: 0,
            clientHeight: j - i,
            clientWidth: 10000
          };
          expect((0, _ui_utils.getVisibleElements)({
            scrollEl: scrollEl,
            views: pages,
            sortByVisibility: false,
            horizontal: horizontal,
            rtl: rtl
          })).toEqual(slowGetVisibleElements(scrollEl, pages));
        }
      }
    }

    it("with pages of varying height", function () {
      var pages = makePages([[[50, 20], [20, 50]], [[30, 12], [12, 30]], [[20, 50], [50, 20]], [[50, 20], [20, 50]]]);
      scrollOverDocument(pages);
    });
    it("widescreen challenge", function () {
      var pages = makePages([[[10, 50], [10, 60], [10, 70], [10, 80], [10, 90]], [[10, 90], [10, 80], [10, 70], [10, 60], [10, 50]], [[10, 50], [10, 60], [10, 70], [10, 80], [10, 90]]]);
      scrollOverDocument(pages);
    });
    it("works with horizontal scrolling", function () {
      var pages = makePages([[[10, 50], [20, 20], [30, 10]]]);
      scrollOverDocument(pages, true);
    });
    it("works with horizontal scrolling with RTL-documents", function () {
      var pages = makePages([[[-10, 50], [-20, 20], [-30, 10]]]);
      scrollOverDocument(pages, true, true);
    });
    it("handles `sortByVisibility` correctly", function () {
      var scrollEl = {
        scrollTop: 75,
        scrollLeft: 0,
        clientHeight: 750,
        clientWidth: 1500
      };
      var views = makePages([[[100, 150]], [[100, 150]], [[100, 150]]]);
      var visible = (0, _ui_utils.getVisibleElements)({
        scrollEl: scrollEl,
        views: views
      });
      var visibleSorted = (0, _ui_utils.getVisibleElements)({
        scrollEl: scrollEl,
        views: views,
        sortByVisibility: true
      });
      var viewsOrder = [],
          viewsSortedOrder = [];

      var _iterator4 = _createForOfIteratorHelper(visible.views),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var view = _step4.value;
          viewsOrder.push(view.id);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var _iterator5 = _createForOfIteratorHelper(visibleSorted.views),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _view = _step5.value;
          viewsSortedOrder.push(_view.id);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      expect(viewsOrder).toEqual([0, 1, 2]);
      expect(viewsSortedOrder).toEqual([1, 2, 0]);
    });
    it("handles views being empty", function () {
      var scrollEl = {
        scrollTop: 10,
        scrollLeft: 0,
        clientHeight: 750,
        clientWidth: 1500
      };
      var views = [];
      expect((0, _ui_utils.getVisibleElements)({
        scrollEl: scrollEl,
        views: views
      })).toEqual({
        first: undefined,
        last: undefined,
        views: [],
        ids: new Set()
      });
    });
    it("handles all views being hidden (without errors)", function () {
      var scrollEl = {
        scrollTop: 100000,
        scrollLeft: 0,
        clientHeight: 750,
        clientWidth: 1500
      };
      var views = makePages([[[100, 150]], [[100, 150]], [[100, 150]]]);
      expect((0, _ui_utils.getVisibleElements)({
        scrollEl: scrollEl,
        views: views
      })).toEqual({
        first: undefined,
        last: undefined,
        views: [],
        ids: new Set()
      });
    });
    describe("backtrackBeforeAllVisibleElements", function () {
      var tallPage = [10, 50];
      var shortPage = [10, 10];
      var top1 = 20 + SPACING + 40;
      var top2 = 20 + SPACING + 10;
      it("handles case 1", function () {
        var pages = makePages([[[10, 20], [10, 20], [10, 20], [10, 20]], [tallPage, shortPage, tallPage, shortPage], [[10, 50], [10, 50], [10, 50], [10, 50]], [[10, 20], [10, 20], [10, 20], [10, 20]], [[10, 20]]]);
        var bsResult = 4;
        expect((0, _ui_utils.backtrackBeforeAllVisibleElements)(bsResult, pages, top1)).toEqual(4);
      });
      it("handles case 2", function () {
        var pages = makePages([[[10, 20], [10, 20], [10, 20], [10, 20]], [tallPage, shortPage, tallPage, tallPage], [[10, 50], [10, 50], [10, 50], [10, 50]], [[10, 20], [10, 20], [10, 20], [10, 20]]]);
        var bsResult = 6;
        expect((0, _ui_utils.backtrackBeforeAllVisibleElements)(bsResult, pages, top1)).toEqual(4);
      });
      it("handles case 3", function () {
        var pages = makePages([[[10, 20], [10, 20], [10, 20], [10, 20]], [tallPage, shortPage, tallPage, shortPage], [[10, 50], [10, 50], [10, 50], [10, 50]], [[10, 20], [10, 20], [10, 20], [10, 20]]]);
        var bsResult = 8;
        expect((0, _ui_utils.backtrackBeforeAllVisibleElements)(bsResult, pages, top1)).toEqual(4);
      });
      it("handles case 4", function () {
        var pages = makePages([[[10, 20], [10, 20], [10, 20], [10, 20]], [tallPage, shortPage, tallPage, shortPage], [[10, 50], [10, 50], [10, 50], [10, 50]], [[10, 20], [10, 20], [10, 20], [10, 20]]]);
        var bsResult = 4;
        expect((0, _ui_utils.backtrackBeforeAllVisibleElements)(bsResult, pages, top2)).toEqual(4);
      });
    });
  });
});