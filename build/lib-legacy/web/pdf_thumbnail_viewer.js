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
exports.PDFThumbnailViewer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _ui_utils = require("./ui_utils.js");

var _pdf_thumbnail_view = require("./pdf_thumbnail_view.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var THUMBNAIL_SCROLL_MARGIN = -19;
var THUMBNAIL_SELECTED_CLASS = "selected";

var _ensurePdfPageLoaded = /*#__PURE__*/new WeakSet();

var _getScrollAhead = /*#__PURE__*/new WeakSet();

var PDFThumbnailViewer = /*#__PURE__*/function () {
  function PDFThumbnailViewer(_ref) {
    var _this = this;

    var container = _ref.container,
        eventBus = _ref.eventBus,
        linkService = _ref.linkService,
        renderingQueue = _ref.renderingQueue,
        l10n = _ref.l10n;

    _classCallCheck(this, PDFThumbnailViewer);

    _classPrivateMethodInitSpec(this, _getScrollAhead);

    _classPrivateMethodInitSpec(this, _ensurePdfPageLoaded);

    this.container = container;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.l10n = l10n;
    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdated.bind(this));

    this._resetView();

    eventBus._on("optionalcontentconfigchanged", function () {
      _this._setImageDisabled = true;
    });
  }

  _createClass(PDFThumbnailViewer, [{
    key: "_scrollUpdated",
    value: function _scrollUpdated() {
      this.renderingQueue.renderHighestPriority();
    }
  }, {
    key: "getThumbnail",
    value: function getThumbnail(index) {
      return this._thumbnails[index];
    }
  }, {
    key: "_getVisibleThumbs",
    value: function _getVisibleThumbs() {
      return (0, _ui_utils.getVisibleElements)({
        scrollEl: this.container,
        views: this._thumbnails
      });
    }
  }, {
    key: "scrollThumbnailIntoView",
    value: function scrollThumbnailIntoView(pageNumber) {
      if (!this.pdfDocument) {
        return;
      }

      var thumbnailView = this._thumbnails[pageNumber - 1];

      if (!thumbnailView) {
        console.error('scrollThumbnailIntoView: Invalid "pageNumber" parameter.');
        return;
      }

      if (pageNumber !== this._currentPageNumber) {
        var prevThumbnailView = this._thumbnails[this._currentPageNumber - 1];
        prevThumbnailView.div.classList.remove(THUMBNAIL_SELECTED_CLASS);
        thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
      }

      var _this$_getVisibleThum = this._getVisibleThumbs(),
          first = _this$_getVisibleThum.first,
          last = _this$_getVisibleThum.last,
          views = _this$_getVisibleThum.views;

      if (views.length > 0) {
        var shouldScroll = false;

        if (pageNumber <= first.id || pageNumber >= last.id) {
          shouldScroll = true;
        } else {
          var _iterator = _createForOfIteratorHelper(views),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _step.value,
                  id = _step$value.id,
                  percent = _step$value.percent;

              if (id !== pageNumber) {
                continue;
              }

              shouldScroll = percent < 100;
              break;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        if (shouldScroll) {
          (0, _ui_utils.scrollIntoView)(thumbnailView.div, {
            top: THUMBNAIL_SCROLL_MARGIN
          });
        }
      }

      this._currentPageNumber = pageNumber;
    }
  }, {
    key: "pagesRotation",
    get: function get() {
      return this._pagesRotation;
    },
    set: function set(rotation) {
      if (!(0, _ui_utils.isValidRotation)(rotation)) {
        throw new Error("Invalid thumbnails rotation angle.");
      }

      if (!this.pdfDocument) {
        return;
      }

      if (this._pagesRotation === rotation) {
        return;
      }

      this._pagesRotation = rotation;
      var updateArgs = {
        rotation: rotation
      };

      var _iterator2 = _createForOfIteratorHelper(this._thumbnails),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var thumbnail = _step2.value;
          thumbnail.update(updateArgs);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      for (var i = 0, ii = this._thumbnails.length; i < ii; i++) {
        if (this._thumbnails[i] && this._thumbnails[i].renderingState !== _ui_utils.RenderingStates.FINISHED) {
          this._thumbnails[i].reset();
        }
      }

      _pdf_thumbnail_view.TempImageFactory.destroyCanvas();
    }
  }, {
    key: "_resetView",
    value: function _resetView() {
      this._thumbnails = [];
      this._currentPageNumber = 1;
      this._pageLabels = null;
      this._pagesRotation = 0;
      this._optionalContentConfigPromise = null;
      this._setImageDisabled = false;
      this.container.textContent = "";
    }
  }, {
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      var _this2 = this;

      if (this.pdfDocument) {
        this._cancelRendering();

        this._resetView();
      }

      this.pdfDocument = pdfDocument;

      if (!pdfDocument) {
        return;
      }

      var firstPagePromise = pdfDocument.getPage(1);
      var optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();
      firstPagePromise.then(function (firstPdfPage) {
        _this2._optionalContentConfigPromise = optionalContentConfigPromise;
        var pagesCount = pdfDocument.numPages;
        var viewport = firstPdfPage.getViewport({
          scale: 1
        });

        var checkSetImageDisabled = function checkSetImageDisabled() {
          return _this2._setImageDisabled;
        };

        for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
          var thumbnail = new _pdf_thumbnail_view.PDFThumbnailView({
            container: _this2.container,
            id: pageNum,
            defaultViewport: viewport.clone(),
            optionalContentConfigPromise: optionalContentConfigPromise,
            linkService: _this2.linkService,
            renderingQueue: _this2.renderingQueue,
            checkSetImageDisabled: checkSetImageDisabled,
            l10n: _this2.l10n
          });

          _this2._thumbnails.push(thumbnail);
        }

        var firstThumbnailView = _this2._thumbnails[0];

        if (firstThumbnailView) {
          firstThumbnailView.setPdfPage(firstPdfPage);
        }

        var thumbnailView = _this2._thumbnails[_this2._currentPageNumber - 1];
        thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
      })["catch"](function (reason) {
        console.error("Unable to initialize thumbnail viewer", reason);
      });
    }
  }, {
    key: "_cancelRendering",
    value: function _cancelRendering() {
      for (var i = 0, ii = this._thumbnails.length; i < ii; i++) {
        if (this._thumbnails[i]) {
          this._thumbnails[i].cancelRendering();
        }
      }
    }
  }, {
    key: "setPageLabels",
    value: function setPageLabels(labels) {
      if (!this.pdfDocument) {
        return;
      }

      if (!labels) {
        this._pageLabels = null;
      } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
        this._pageLabels = null;
        console.error("PDFThumbnailViewer_setPageLabels: Invalid page labels.");
      } else {
        this._pageLabels = labels;
      }

      for (var i = 0, ii = this._thumbnails.length; i < ii; i++) {
        var _this$_pageLabels$i, _this$_pageLabels;

        this._thumbnails[i].setPageLabel((_this$_pageLabels$i = (_this$_pageLabels = this._pageLabels) === null || _this$_pageLabels === void 0 ? void 0 : _this$_pageLabels[i]) !== null && _this$_pageLabels$i !== void 0 ? _this$_pageLabels$i : null);
      }
    }
  }, {
    key: "forceRendering",
    value: function forceRendering() {
      var _this3 = this;

      var visibleThumbs = this._getVisibleThumbs();

      var scrollAhead = _classPrivateMethodGet(this, _getScrollAhead, _getScrollAhead2).call(this, visibleThumbs);

      var thumbView = this.renderingQueue.getHighestPriority(visibleThumbs, this._thumbnails, scrollAhead);

      if (thumbView) {
        _classPrivateMethodGet(this, _ensurePdfPageLoaded, _ensurePdfPageLoaded2).call(this, thumbView).then(function () {
          _this3.renderingQueue.renderView(thumbView);
        });

        return true;
      }

      return false;
    }
  }]);

  return PDFThumbnailViewer;
}();

exports.PDFThumbnailViewer = PDFThumbnailViewer;

function _ensurePdfPageLoaded2(_x) {
  return _ensurePdfPageLoaded3.apply(this, arguments);
}

function _ensurePdfPageLoaded3() {
  _ensurePdfPageLoaded3 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(thumbView) {
    var pdfPage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!thumbView.pdfPage) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", thumbView.pdfPage);

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return this.pdfDocument.getPage(thumbView.id);

          case 5:
            pdfPage = _context.sent;

            if (!thumbView.pdfPage) {
              thumbView.setPdfPage(pdfPage);
            }

            return _context.abrupt("return", pdfPage);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            console.error("Unable to get page for thumb view", _context.t0);
            return _context.abrupt("return", null);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 10]]);
  }));
  return _ensurePdfPageLoaded3.apply(this, arguments);
}

function _getScrollAhead2(visible) {
  var _visible$first, _visible$last;

  if (((_visible$first = visible.first) === null || _visible$first === void 0 ? void 0 : _visible$first.id) === 1) {
    return true;
  } else if (((_visible$last = visible.last) === null || _visible$last === void 0 ? void 0 : _visible$last.id) === this._thumbnails.length) {
    return false;
  }

  return this.scroll.down;
}