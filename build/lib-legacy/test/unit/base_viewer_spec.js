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

var _base_viewer = require("../../web/base_viewer.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

describe("BaseViewer", function () {
  describe("PDFPageViewBuffer", function () {
    function createViewsMap(startId, endId) {
      var map = new Map();

      for (var id = startId; id <= endId; id++) {
        map.set(id, {
          id: id,
          destroy: function destroy() {}
        });
      }

      return map;
    }

    it("handles `push` correctly", function () {
      var buffer = new _base_viewer.PDFPageViewBuffer(3);
      var viewsMap = createViewsMap(1, 5),
          iterator = viewsMap.values();

      for (var i = 0; i < 3; i++) {
        var view = iterator.next().value;
        buffer.push(view);
      }

      expect(_toConsumableArray(buffer)).toEqual([viewsMap.get(1), viewsMap.get(2), viewsMap.get(3)]);

      for (var _i = 3; _i < 5; _i++) {
        var _view = iterator.next().value;
        buffer.push(_view);
      }

      expect(_toConsumableArray(buffer)).toEqual([viewsMap.get(3), viewsMap.get(4), viewsMap.get(5)]);
    });
    it("handles `resize` correctly", function () {
      var buffer = new _base_viewer.PDFPageViewBuffer(5);
      var viewsMap = createViewsMap(1, 5),
          iterator = viewsMap.values();

      for (var i = 0; i < 5; i++) {
        var view = iterator.next().value;
        buffer.push(view);
      }

      buffer.resize(5);
      expect(_toConsumableArray(buffer)).toEqual([viewsMap.get(1), viewsMap.get(2), viewsMap.get(3), viewsMap.get(4), viewsMap.get(5)]);
      buffer.resize(10);
      expect(_toConsumableArray(buffer)).toEqual([viewsMap.get(1), viewsMap.get(2), viewsMap.get(3), viewsMap.get(4), viewsMap.get(5)]);
      buffer.resize(3);
      expect(_toConsumableArray(buffer)).toEqual([viewsMap.get(3), viewsMap.get(4), viewsMap.get(5)]);
    });
    it("handles `resize` correctly, with `idsToKeep` provided", function () {
      var buffer = new _base_viewer.PDFPageViewBuffer(5);
      var viewsMap = createViewsMap(1, 5),
          iterator = viewsMap.values();

      for (var i = 0; i < 5; i++) {
        var view = iterator.next().value;
        buffer.push(view);
      }

      buffer.resize(5, new Set([1, 2]));
      expect(_toConsumableArray(buffer)).toEqual([viewsMap.get(3), viewsMap.get(4), viewsMap.get(5), viewsMap.get(1), viewsMap.get(2)]);
      buffer.resize(10, new Set([3, 4, 5]));
      expect(_toConsumableArray(buffer)).toEqual([viewsMap.get(1), viewsMap.get(2), viewsMap.get(3), viewsMap.get(4), viewsMap.get(5)]);
      buffer.resize(3, new Set([1, 2, 5]));
      expect(_toConsumableArray(buffer)).toEqual([viewsMap.get(1), viewsMap.get(2), viewsMap.get(5)]);
    });
    it("handles `has` correctly", function () {
      var buffer = new _base_viewer.PDFPageViewBuffer(3);
      var viewsMap = createViewsMap(1, 2),
          iterator = viewsMap.values();

      for (var i = 0; i < 1; i++) {
        var view = iterator.next().value;
        buffer.push(view);
      }

      expect(buffer.has(viewsMap.get(1))).toEqual(true);
      expect(buffer.has(viewsMap.get(2))).toEqual(false);
    });
  });
});