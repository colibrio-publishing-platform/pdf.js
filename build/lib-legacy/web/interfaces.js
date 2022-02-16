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
exports.IRenderableView = exports.IPDFXfaLayerFactory = exports.IPDFTextLayerFactory = exports.IPDFStructTreeLayerFactory = exports.IPDFLinkService = exports.IPDFAnnotationLayerFactory = exports.IL10n = exports.IDownloadManager = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var IPDFLinkService = /*#__PURE__*/function () {
  function IPDFLinkService() {
    _classCallCheck(this, IPDFLinkService);
  }

  _createClass(IPDFLinkService, [{
    key: "pagesCount",
    get: function get() {}
  }, {
    key: "page",
    get: function get() {},
    set: function set(value) {}
  }, {
    key: "rotation",
    get: function get() {},
    set: function set(value) {}
  }, {
    key: "externalLinkEnabled",
    get: function get() {},
    set: function set(value) {}
  }, {
    key: "goToDestination",
    value: function () {
      var _goToDestination = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(dest) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function goToDestination(_x) {
        return _goToDestination.apply(this, arguments);
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
    }
  }, {
    key: "getDestinationHash",
    value: function getDestinationHash(dest) {}
  }, {
    key: "getAnchorUrl",
    value: function getAnchorUrl(hash) {}
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
    value: function isPageVisible(pageNumber) {}
  }, {
    key: "isPageCached",
    value: function isPageCached(pageNumber) {}
  }]);

  return IPDFLinkService;
}();

exports.IPDFLinkService = IPDFLinkService;

var IRenderableView = /*#__PURE__*/function () {
  function IRenderableView() {
    _classCallCheck(this, IRenderableView);

    this.resume = null;
  }

  _createClass(IRenderableView, [{
    key: "renderingId",
    get: function get() {}
  }, {
    key: "renderingState",
    get: function get() {}
  }, {
    key: "draw",
    value: function draw() {}
  }]);

  return IRenderableView;
}();

exports.IRenderableView = IRenderableView;

var IPDFTextLayerFactory = /*#__PURE__*/function () {
  function IPDFTextLayerFactory() {
    _classCallCheck(this, IPDFTextLayerFactory);
  }

  _createClass(IPDFTextLayerFactory, [{
    key: "createTextLayerBuilder",
    value: function createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
      var enhanceTextSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var eventBus = arguments.length > 4 ? arguments[4] : undefined;
      var highlighter = arguments.length > 5 ? arguments[5] : undefined;
    }
  }]);

  return IPDFTextLayerFactory;
}();

exports.IPDFTextLayerFactory = IPDFTextLayerFactory;

var IPDFAnnotationLayerFactory = /*#__PURE__*/function () {
  function IPDFAnnotationLayerFactory() {
    _classCallCheck(this, IPDFAnnotationLayerFactory);
  }

  _createClass(IPDFAnnotationLayerFactory, [{
    key: "createAnnotationLayerBuilder",
    value: function createAnnotationLayerBuilder(pageDiv, pdfPage) {
      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var imageResourcesPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var renderForms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var l10n = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var enableScripting = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var hasJSActionsPromise = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var mouseState = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
      var fieldObjectsPromise = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
      var annotationCanvasMap = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
    }
  }]);

  return IPDFAnnotationLayerFactory;
}();

exports.IPDFAnnotationLayerFactory = IPDFAnnotationLayerFactory;

var IPDFXfaLayerFactory = /*#__PURE__*/function () {
  function IPDFXfaLayerFactory() {
    _classCallCheck(this, IPDFXfaLayerFactory);
  }

  _createClass(IPDFXfaLayerFactory, [{
    key: "createXfaLayerBuilder",
    value: function createXfaLayerBuilder(pageDiv, pdfPage) {
      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var xfaHtml = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    }
  }]);

  return IPDFXfaLayerFactory;
}();

exports.IPDFXfaLayerFactory = IPDFXfaLayerFactory;

var IPDFStructTreeLayerFactory = /*#__PURE__*/function () {
  function IPDFStructTreeLayerFactory() {
    _classCallCheck(this, IPDFStructTreeLayerFactory);
  }

  _createClass(IPDFStructTreeLayerFactory, [{
    key: "createStructTreeLayerBuilder",
    value: function createStructTreeLayerBuilder(pdfPage) {}
  }]);

  return IPDFStructTreeLayerFactory;
}();

exports.IPDFStructTreeLayerFactory = IPDFStructTreeLayerFactory;

var IDownloadManager = /*#__PURE__*/function () {
  function IDownloadManager() {
    _classCallCheck(this, IDownloadManager);
  }

  _createClass(IDownloadManager, [{
    key: "downloadUrl",
    value: function downloadUrl(url, filename) {}
  }, {
    key: "downloadData",
    value: function downloadData(data, filename, contentType) {}
  }, {
    key: "openOrDownloadData",
    value: function openOrDownloadData(element, data, filename) {}
  }, {
    key: "download",
    value: function download(blob, url, filename) {
      var sourceEventType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "download";
    }
  }]);

  return IDownloadManager;
}();

exports.IDownloadManager = IDownloadManager;

var IL10n = /*#__PURE__*/function () {
  function IL10n() {
    _classCallCheck(this, IL10n);
  }

  _createClass(IL10n, [{
    key: "getLanguage",
    value: function () {
      var _getLanguage = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
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

      function getLanguage() {
        return _getLanguage.apply(this, arguments);
      }

      return getLanguage;
    }()
  }, {
    key: "getDirection",
    value: function () {
      var _getDirection = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getDirection() {
        return _getDirection.apply(this, arguments);
      }

      return getDirection;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(key) {
        var args,
            fallback,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                args = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : null;
                fallback = _args4.length > 2 ? _args4[2] : undefined;

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "translate",
    value: function () {
      var _translate = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(element) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function translate(_x3) {
        return _translate.apply(this, arguments);
      }

      return translate;
    }()
  }]);

  return IL10n;
}();

exports.IL10n = IL10n;