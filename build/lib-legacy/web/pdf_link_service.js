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
exports.SimpleLinkService = exports.PDFLinkService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _pdf = require("../pdf");

var _ui_utils = require("./ui_utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PDFLinkService = /*#__PURE__*/function () {
  function PDFLinkService() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        eventBus = _ref.eventBus,
        _ref$externalLinkTarg = _ref.externalLinkTarget,
        externalLinkTarget = _ref$externalLinkTarg === void 0 ? null : _ref$externalLinkTarg,
        _ref$externalLinkRel = _ref.externalLinkRel,
        externalLinkRel = _ref$externalLinkRel === void 0 ? null : _ref$externalLinkRel,
        _ref$ignoreDestinatio = _ref.ignoreDestinationZoom,
        ignoreDestinationZoom = _ref$ignoreDestinatio === void 0 ? false : _ref$ignoreDestinatio;

    _classCallCheck(this, PDFLinkService);

    this.eventBus = eventBus;
    this.externalLinkTarget = externalLinkTarget;
    this.externalLinkRel = externalLinkRel;
    this.externalLinkEnabled = true;
    this._ignoreDestinationZoom = ignoreDestinationZoom;
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
    this._pagesRefCache = null;
  }

  _createClass(PDFLinkService, [{
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      var baseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.baseUrl = baseUrl;
      this.pdfDocument = pdfDocument;
      this._pagesRefCache = Object.create(null);
    }
  }, {
    key: "setViewer",
    value: function setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    }
  }, {
    key: "setHistory",
    value: function setHistory(pdfHistory) {
      this.pdfHistory = pdfHistory;
    }
  }, {
    key: "pagesCount",
    get: function get() {
      return this.pdfDocument ? this.pdfDocument.numPages : 0;
    }
  }, {
    key: "page",
    get: function get() {
      return this.pdfViewer.currentPageNumber;
    },
    set: function set(value) {
      this.pdfViewer.currentPageNumber = value;
    }
  }, {
    key: "rotation",
    get: function get() {
      return this.pdfViewer.pagesRotation;
    },
    set: function set(value) {
      this.pdfViewer.pagesRotation = value;
    }
  }, {
    key: "_goToDestinationHelper",
    value: function _goToDestinationHelper(rawDest) {
      var _this = this;

      var namedDest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var explicitDest = arguments.length > 2 ? arguments[2] : undefined;
      var destRef = explicitDest[0];
      var pageNumber;

      if (_typeof(destRef) === "object" && destRef !== null) {
        pageNumber = this._cachedPageNumber(destRef);

        if (!pageNumber) {
          this.pdfDocument.getPageIndex(destRef).then(function (pageIndex) {
            _this.cachePageRef(pageIndex + 1, destRef);

            _this._goToDestinationHelper(rawDest, namedDest, explicitDest);
          })["catch"](function () {
            console.error("PDFLinkService._goToDestinationHelper: \"".concat(destRef, "\" is not ") + "a valid page reference, for dest=\"".concat(rawDest, "\"."));
          });
          return;
        }
      } else if (Number.isInteger(destRef)) {
        pageNumber = destRef + 1;
      } else {
        console.error("PDFLinkService._goToDestinationHelper: \"".concat(destRef, "\" is not ") + "a valid destination reference, for dest=\"".concat(rawDest, "\"."));
        return;
      }

      if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount) {
        console.error("PDFLinkService._goToDestinationHelper: \"".concat(pageNumber, "\" is not ") + "a valid page number, for dest=\"".concat(rawDest, "\"."));
        return;
      }

      if (this.pdfHistory) {
        this.pdfHistory.pushCurrentPosition();
        this.pdfHistory.push({
          namedDest: namedDest,
          explicitDest: explicitDest,
          pageNumber: pageNumber
        });
      }

      this.pdfViewer.scrollPageIntoView({
        pageNumber: pageNumber,
        destArray: explicitDest,
        ignoreDestinationZoom: this._ignoreDestinationZoom
      });
    }
  }, {
    key: "goToDestination",
    value: function () {
      var _goToDestination = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(dest) {
        var namedDest, explicitDest;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.pdfDocument) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (!(typeof dest === "string")) {
                  _context.next = 9;
                  break;
                }

                namedDest = dest;
                _context.next = 6;
                return this.pdfDocument.getDestination(dest);

              case 6:
                explicitDest = _context.sent;
                _context.next = 13;
                break;

              case 9:
                namedDest = null;
                _context.next = 12;
                return dest;

              case 12:
                explicitDest = _context.sent;

              case 13:
                if (Array.isArray(explicitDest)) {
                  _context.next = 16;
                  break;
                }

                console.error("PDFLinkService.goToDestination: \"".concat(explicitDest, "\" is not ") + "a valid destination array, for dest=\"".concat(dest, "\"."));
                return _context.abrupt("return");

              case 16:
                this._goToDestinationHelper(dest, namedDest, explicitDest);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function goToDestination(_x) {
        return _goToDestination.apply(this, arguments);
      }

      return goToDestination;
    }()
  }, {
    key: "goToPage",
    value: function goToPage(val) {
      if (!this.pdfDocument) {
        return;
      }

      var pageNumber = typeof val === "string" && this.pdfViewer.pageLabelToPageNumber(val) || val | 0;

      if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
        console.error("PDFLinkService.goToPage: \"".concat(val, "\" is not a valid page."));
        return;
      }

      if (this.pdfHistory) {
        this.pdfHistory.pushCurrentPosition();
        this.pdfHistory.pushPage(pageNumber);
      }

      this.pdfViewer.scrollPageIntoView({
        pageNumber: pageNumber
      });
    }
  }, {
    key: "addLinkAttributes",
    value: function addLinkAttributes(link, url) {
      var newWindow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      (0, _pdf.addLinkAttributes)(link, {
        url: url,
        target: newWindow ? _pdf.LinkTarget.BLANK : this.externalLinkTarget,
        rel: this.externalLinkRel,
        enabled: this.externalLinkEnabled
      });
    }
  }, {
    key: "getDestinationHash",
    value: function getDestinationHash(dest) {
      if (typeof dest === "string") {
        if (dest.length > 0) {
          return this.getAnchorUrl("#" + escape(dest));
        }
      } else if (Array.isArray(dest)) {
        var str = JSON.stringify(dest);

        if (str.length > 0) {
          return this.getAnchorUrl("#" + escape(str));
        }
      }

      return this.getAnchorUrl("");
    }
  }, {
    key: "getAnchorUrl",
    value: function getAnchorUrl(anchor) {
      return (this.baseUrl || "") + anchor;
    }
  }, {
    key: "setHash",
    value: function setHash(hash) {
      if (!this.pdfDocument) {
        return;
      }

      var pageNumber, dest;

      if (hash.includes("=")) {
        var params = (0, _ui_utils.parseQueryString)(hash);

        if (params.has("search")) {
          this.eventBus.dispatch("findfromurlhash", {
            source: this,
            query: params.get("search").replace(/"/g, ""),
            phraseSearch: params.get("phrase") === "true"
          });
        }

        if (params.has("page")) {
          pageNumber = params.get("page") | 0 || 1;
        }

        if (params.has("zoom")) {
          var zoomArgs = params.get("zoom").split(",");
          var zoomArg = zoomArgs[0];
          var zoomArgNumber = parseFloat(zoomArg);

          if (!zoomArg.includes("Fit")) {
            dest = [null, {
              name: "XYZ"
            }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null, zoomArgs.length > 2 ? zoomArgs[2] | 0 : null, zoomArgNumber ? zoomArgNumber / 100 : zoomArg];
          } else {
            if (zoomArg === "Fit" || zoomArg === "FitB") {
              dest = [null, {
                name: zoomArg
              }];
            } else if (zoomArg === "FitH" || zoomArg === "FitBH" || zoomArg === "FitV" || zoomArg === "FitBV") {
              dest = [null, {
                name: zoomArg
              }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null];
            } else if (zoomArg === "FitR") {
              if (zoomArgs.length !== 5) {
                console.error('PDFLinkService.setHash: Not enough parameters for "FitR".');
              } else {
                dest = [null, {
                  name: zoomArg
                }, zoomArgs[1] | 0, zoomArgs[2] | 0, zoomArgs[3] | 0, zoomArgs[4] | 0];
              }
            } else {
              console.error("PDFLinkService.setHash: \"".concat(zoomArg, "\" is not ") + "a valid zoom value.");
            }
          }
        }

        if (dest) {
          this.pdfViewer.scrollPageIntoView({
            pageNumber: pageNumber || this.page,
            destArray: dest,
            allowNegativeOffset: true
          });
        } else if (pageNumber) {
          this.page = pageNumber;
        }

        if (params.has("pagemode")) {
          this.eventBus.dispatch("pagemode", {
            source: this,
            mode: params.get("pagemode")
          });
        }

        if (params.has("nameddest")) {
          this.goToDestination(params.get("nameddest"));
        }
      } else {
        dest = unescape(hash);

        try {
          dest = JSON.parse(dest);

          if (!Array.isArray(dest)) {
            dest = dest.toString();
          }
        } catch (ex) {}

        if (typeof dest === "string" || isValidExplicitDestination(dest)) {
          this.goToDestination(dest);
          return;
        }

        console.error("PDFLinkService.setHash: \"".concat(unescape(hash), "\" is not ") + "a valid destination.");
      }
    }
  }, {
    key: "executeNamedAction",
    value: function executeNamedAction(action) {
      var _this$pdfHistory, _this$pdfHistory2;

      switch (action) {
        case "GoBack":
          (_this$pdfHistory = this.pdfHistory) === null || _this$pdfHistory === void 0 ? void 0 : _this$pdfHistory.back();
          break;

        case "GoForward":
          (_this$pdfHistory2 = this.pdfHistory) === null || _this$pdfHistory2 === void 0 ? void 0 : _this$pdfHistory2.forward();
          break;

        case "NextPage":
          this.pdfViewer.nextPage();
          break;

        case "PrevPage":
          this.pdfViewer.previousPage();
          break;

        case "LastPage":
          this.page = this.pagesCount;
          break;

        case "FirstPage":
          this.page = 1;
          break;

        default:
          break;
      }

      this.eventBus.dispatch("namedaction", {
        source: this,
        action: action
      });
    }
  }, {
    key: "cachePageRef",
    value: function cachePageRef(pageNum, pageRef) {
      if (!pageRef) {
        return;
      }

      var refStr = pageRef.gen === 0 ? "".concat(pageRef.num, "R") : "".concat(pageRef.num, "R").concat(pageRef.gen);
      this._pagesRefCache[refStr] = pageNum;
    }
  }, {
    key: "_cachedPageNumber",
    value: function _cachedPageNumber(pageRef) {
      var _this$_pagesRefCache;

      if (!pageRef) {
        return null;
      }

      var refStr = pageRef.gen === 0 ? "".concat(pageRef.num, "R") : "".concat(pageRef.num, "R").concat(pageRef.gen);
      return ((_this$_pagesRefCache = this._pagesRefCache) === null || _this$_pagesRefCache === void 0 ? void 0 : _this$_pagesRefCache[refStr]) || null;
    }
  }, {
    key: "isPageVisible",
    value: function isPageVisible(pageNumber) {
      return this.pdfViewer.isPageVisible(pageNumber);
    }
  }, {
    key: "isPageCached",
    value: function isPageCached(pageNumber) {
      return this.pdfViewer.isPageCached(pageNumber);
    }
  }]);

  return PDFLinkService;
}();

exports.PDFLinkService = PDFLinkService;

function isValidExplicitDestination(dest) {
  if (!Array.isArray(dest)) {
    return false;
  }

  var destLength = dest.length;

  if (destLength < 2) {
    return false;
  }

  var page = dest[0];

  if (!(_typeof(page) === "object" && Number.isInteger(page.num) && Number.isInteger(page.gen)) && !(Number.isInteger(page) && page >= 0)) {
    return false;
  }

  var zoom = dest[1];

  if (!(_typeof(zoom) === "object" && typeof zoom.name === "string")) {
    return false;
  }

  var allowNull = true;

  switch (zoom.name) {
    case "XYZ":
      if (destLength !== 5) {
        return false;
      }

      break;

    case "Fit":
    case "FitB":
      return destLength === 2;

    case "FitH":
    case "FitBH":
    case "FitV":
    case "FitBV":
      if (destLength !== 3) {
        return false;
      }

      break;

    case "FitR":
      if (destLength !== 6) {
        return false;
      }

      allowNull = false;
      break;

    default:
      return false;
  }

  for (var i = 2; i < destLength; i++) {
    var param = dest[i];

    if (!(typeof param === "number" || allowNull && param === null)) {
      return false;
    }
  }

  return true;
}

var SimpleLinkService = /*#__PURE__*/function () {
  function SimpleLinkService() {
    _classCallCheck(this, SimpleLinkService);

    this.externalLinkEnabled = true;
  }

  _createClass(SimpleLinkService, [{
    key: "pagesCount",
    get: function get() {
      return 0;
    }
  }, {
    key: "page",
    get: function get() {
      return 0;
    },
    set: function set(value) {}
  }, {
    key: "rotation",
    get: function get() {
      return 0;
    },
    set: function set(value) {}
  }, {
    key: "goToDestination",
    value: function () {
      var _goToDestination2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(dest) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function goToDestination(_x2) {
        return _goToDestination2.apply(this, arguments);
      }

      return goToDestination;
    }()
  }, {
    key: "goToPage",
    value: function goToPage(val) {}
  }, {
    key: "addLinkAttributes",
    value: function addLinkAttributes(link, url) {
      var newWindow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      (0, _pdf.addLinkAttributes)(link, {
        url: url,
        enabled: this.externalLinkEnabled
      });
    }
  }, {
    key: "getDestinationHash",
    value: function getDestinationHash(dest) {
      return "#";
    }
  }, {
    key: "getAnchorUrl",
    value: function getAnchorUrl(hash) {
      return "#";
    }
  }, {
    key: "setHash",
    value: function setHash(hash) {}
  }, {
    key: "executeNamedAction",
    value: function executeNamedAction(action) {}
  }, {
    key: "cachePageRef",
    value: function cachePageRef(pageNum, pageRef) {}
  }, {
    key: "isPageVisible",
    value: function isPageVisible(pageNumber) {
      return true;
    }
  }, {
    key: "isPageCached",
    value: function isPageCached(pageNumber) {
      return true;
    }
  }]);

  return SimpleLinkService;
}();

exports.SimpleLinkService = SimpleLinkService;