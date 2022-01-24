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
exports.PDFOutlineViewer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _base_tree_viewer = require("./base_tree_viewer.js");

var _pdf = require("../pdf");

var _ui_utils = require("./ui_utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDFOutlineViewer = /*#__PURE__*/function (_BaseTreeViewer) {
  _inherits(PDFOutlineViewer, _BaseTreeViewer);

  var _super = _createSuper(PDFOutlineViewer);

  function PDFOutlineViewer(options) {
    var _this;

    _classCallCheck(this, PDFOutlineViewer);

    _this = _super.call(this, options);
    _this.linkService = options.linkService;

    _this.eventBus._on("toggleoutlinetree", _this._toggleAllTreeItems.bind(_assertThisInitialized(_this)));

    _this.eventBus._on("currentoutlineitem", _this._currentOutlineItem.bind(_assertThisInitialized(_this)));

    _this.eventBus._on("pagechanging", function (evt) {
      _this._currentPageNumber = evt.pageNumber;
    });

    _this.eventBus._on("pagesloaded", function (evt) {
      _this._isPagesLoaded = !!evt.pagesCount;

      if (_this._currentOutlineItemCapability && !_this._currentOutlineItemCapability.settled) {
        _this._currentOutlineItemCapability.resolve(_this._isPagesLoaded);
      }
    });

    _this.eventBus._on("sidebarviewchanged", function (evt) {
      _this._sidebarView = evt.view;
    });

    return _this;
  }

  _createClass(PDFOutlineViewer, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(PDFOutlineViewer.prototype), "reset", this).call(this);

      this._outline = null;
      this._pageNumberToDestHashCapability = null;
      this._currentPageNumber = 1;
      this._isPagesLoaded = null;

      if (this._currentOutlineItemCapability && !this._currentOutlineItemCapability.settled) {
        this._currentOutlineItemCapability.resolve(false);
      }

      this._currentOutlineItemCapability = null;
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(outlineCount) {
      var _this$_pdfDocument;

      this._currentOutlineItemCapability = (0, _pdf.createPromiseCapability)();

      if (outlineCount === 0 || (_this$_pdfDocument = this._pdfDocument) !== null && _this$_pdfDocument !== void 0 && _this$_pdfDocument.loadingParams.disableAutoFetch) {
        this._currentOutlineItemCapability.resolve(false);
      } else if (this._isPagesLoaded !== null) {
        this._currentOutlineItemCapability.resolve(this._isPagesLoaded);
      }

      this.eventBus.dispatch("outlineloaded", {
        source: this,
        outlineCount: outlineCount,
        currentOutlineItemPromise: this._currentOutlineItemCapability.promise
      });
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(element, _ref) {
      var _this2 = this;

      var url = _ref.url,
          newWindow = _ref.newWindow,
          dest = _ref.dest;
      var linkService = this.linkService;

      if (url) {
        linkService.addLinkAttributes(element, url, newWindow);
        return;
      }

      element.href = linkService.getDestinationHash(dest);

      element.onclick = function (evt) {
        _this2._updateCurrentTreeItem(evt.target.parentNode);

        if (dest) {
          linkService.goToDestination(dest);
        }

        return false;
      };
    }
  }, {
    key: "_setStyles",
    value: function _setStyles(element, _ref2) {
      var bold = _ref2.bold,
          italic = _ref2.italic;

      if (bold) {
        element.style.fontWeight = "bold";
      }

      if (italic) {
        element.style.fontStyle = "italic";
      }
    }
  }, {
    key: "_addToggleButton",
    value: function _addToggleButton(div, _ref3) {
      var count = _ref3.count,
          items = _ref3.items;
      var hidden = false;

      if (count < 0) {
        var totalCount = items.length;

        if (totalCount > 0) {
          var queue = _toConsumableArray(items);

          while (queue.length > 0) {
            var _queue$shift = queue.shift(),
                nestedCount = _queue$shift.count,
                nestedItems = _queue$shift.items;

            if (nestedCount > 0 && nestedItems.length > 0) {
              totalCount += nestedItems.length;
              queue.push.apply(queue, _toConsumableArray(nestedItems));
            }
          }
        }

        if (Math.abs(count) === totalCount) {
          hidden = true;
        }
      }

      _get(_getPrototypeOf(PDFOutlineViewer.prototype), "_addToggleButton", this).call(this, div, hidden);
    }
  }, {
    key: "_toggleAllTreeItems",
    value: function _toggleAllTreeItems() {
      if (!this._outline) {
        return;
      }

      _get(_getPrototypeOf(PDFOutlineViewer.prototype), "_toggleAllTreeItems", this).call(this);
    }
  }, {
    key: "render",
    value: function render(_ref4) {
      var outline = _ref4.outline,
          pdfDocument = _ref4.pdfDocument;

      if (this._outline) {
        this.reset();
      }

      this._outline = outline || null;
      this._pdfDocument = pdfDocument || null;

      if (!outline) {
        this._dispatchEvent(0);

        return;
      }

      var fragment = document.createDocumentFragment();
      var queue = [{
        parent: fragment,
        items: outline
      }];
      var outlineCount = 0,
          hasAnyNesting = false;

      while (queue.length > 0) {
        var levelData = queue.shift();

        var _iterator = _createForOfIteratorHelper(levelData.items),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            var div = document.createElement("div");
            div.className = "treeItem";
            var element = document.createElement("a");

            this._bindLink(element, item);

            this._setStyles(element, item);

            element.textContent = this._normalizeTextContent(item.title);
            div.appendChild(element);

            if (item.items.length > 0) {
              hasAnyNesting = true;

              this._addToggleButton(div, item);

              var itemsDiv = document.createElement("div");
              itemsDiv.className = "treeItems";
              div.appendChild(itemsDiv);
              queue.push({
                parent: itemsDiv,
                items: item.items
              });
            }

            levelData.parent.appendChild(div);
            outlineCount++;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this._finishRendering(fragment, outlineCount, hasAnyNesting);
    }
  }, {
    key: "_currentOutlineItem",
    value: function () {
      var _currentOutlineItem2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var pageNumberToDestHash, i, destHash, linkElement;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._isPagesLoaded) {
                  _context.next = 2;
                  break;
                }

                throw new Error("_currentOutlineItem: All pages have not been loaded.");

              case 2:
                if (!(!this._outline || !this._pdfDocument)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                _context.next = 6;
                return this._getPageNumberToDestHash(this._pdfDocument);

              case 6:
                pageNumberToDestHash = _context.sent;

                if (pageNumberToDestHash) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return");

              case 9:
                this._updateCurrentTreeItem(null);

                if (!(this._sidebarView !== _ui_utils.SidebarView.OUTLINE)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return");

              case 12:
                i = this._currentPageNumber;

              case 13:
                if (!(i > 0)) {
                  _context.next = 25;
                  break;
                }

                destHash = pageNumberToDestHash.get(i);

                if (destHash) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("continue", 22);

              case 17:
                linkElement = this.container.querySelector("a[href=\"".concat(destHash, "\"]"));

                if (linkElement) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("continue", 22);

              case 20:
                this._scrollToCurrentTreeItem(linkElement.parentNode);

                return _context.abrupt("break", 25);

              case 22:
                i--;
                _context.next = 13;
                break;

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _currentOutlineItem() {
        return _currentOutlineItem2.apply(this, arguments);
      }

      return _currentOutlineItem;
    }()
  }, {
    key: "_getPageNumberToDestHash",
    value: function () {
      var _getPageNumberToDestHash2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(pdfDocument) {
        var pageNumberToDestHash, pageNumberNesting, queue, levelData, currentNesting, _iterator2, _step2, _step2$value, dest, items, explicitDest, pageNumber, _explicitDest, _explicitDest2, destRef, destHash;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._pageNumberToDestHashCapability) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", this._pageNumberToDestHashCapability.promise);

              case 2:
                this._pageNumberToDestHashCapability = (0, _pdf.createPromiseCapability)();
                pageNumberToDestHash = new Map(), pageNumberNesting = new Map();
                queue = [{
                  nesting: 0,
                  items: this._outline
                }];

              case 5:
                if (!(queue.length > 0)) {
                  _context2.next = 56;
                  break;
                }

                levelData = queue.shift(), currentNesting = levelData.nesting;
                _iterator2 = _createForOfIteratorHelper(levelData.items);
                _context2.prev = 8;

                _iterator2.s();

              case 10:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 46;
                  break;
                }

                _step2$value = _step2.value, dest = _step2$value.dest, items = _step2$value.items;
                explicitDest = void 0, pageNumber = void 0;

                if (!(typeof dest === "string")) {
                  _context2.next = 21;
                  break;
                }

                _context2.next = 16;
                return pdfDocument.getDestination(dest);

              case 16:
                explicitDest = _context2.sent;

                if (!(pdfDocument !== this._pdfDocument)) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt("return", null);

              case 19:
                _context2.next = 22;
                break;

              case 21:
                explicitDest = dest;

              case 22:
                if (!Array.isArray(explicitDest)) {
                  _context2.next = 43;
                  break;
                }

                _explicitDest = explicitDest, _explicitDest2 = _slicedToArray(_explicitDest, 1), destRef = _explicitDest2[0];

                if (!(_typeof(destRef) === "object" && destRef !== null)) {
                  _context2.next = 41;
                  break;
                }

                pageNumber = this.linkService._cachedPageNumber(destRef);

                if (pageNumber) {
                  _context2.next = 39;
                  break;
                }

                _context2.prev = 27;
                _context2.next = 30;
                return pdfDocument.getPageIndex(destRef);

              case 30:
                _context2.t0 = _context2.sent;
                pageNumber = _context2.t0 + 1;

                if (!(pdfDocument !== this._pdfDocument)) {
                  _context2.next = 34;
                  break;
                }

                return _context2.abrupt("return", null);

              case 34:
                this.linkService.cachePageRef(pageNumber, destRef);
                _context2.next = 39;
                break;

              case 37:
                _context2.prev = 37;
                _context2.t1 = _context2["catch"](27);

              case 39:
                _context2.next = 42;
                break;

              case 41:
                if (Number.isInteger(destRef)) {
                  pageNumber = destRef + 1;
                }

              case 42:
                if (Number.isInteger(pageNumber) && (!pageNumberToDestHash.has(pageNumber) || currentNesting > pageNumberNesting.get(pageNumber))) {
                  destHash = this.linkService.getDestinationHash(dest);
                  pageNumberToDestHash.set(pageNumber, destHash);
                  pageNumberNesting.set(pageNumber, currentNesting);
                }

              case 43:
                if (items.length > 0) {
                  queue.push({
                    nesting: currentNesting + 1,
                    items: items
                  });
                }

              case 44:
                _context2.next = 10;
                break;

              case 46:
                _context2.next = 51;
                break;

              case 48:
                _context2.prev = 48;
                _context2.t2 = _context2["catch"](8);

                _iterator2.e(_context2.t2);

              case 51:
                _context2.prev = 51;

                _iterator2.f();

                return _context2.finish(51);

              case 54:
                _context2.next = 5;
                break;

              case 56:
                this._pageNumberToDestHashCapability.resolve(pageNumberToDestHash.size > 0 ? pageNumberToDestHash : null);

                return _context2.abrupt("return", this._pageNumberToDestHashCapability.promise);

              case 58:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 48, 51, 54], [27, 37]]);
      }));

      function _getPageNumberToDestHash(_x) {
        return _getPageNumberToDestHash2.apply(this, arguments);
      }

      return _getPageNumberToDestHash;
    }()
  }]);

  return PDFOutlineViewer;
}(_base_tree_viewer.BaseTreeViewer);

exports.PDFOutlineViewer = PDFOutlineViewer;