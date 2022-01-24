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
exports.BaseStandardFontDataFactory = exports.BaseSVGFactory = exports.BaseCanvasFactory = exports.BaseCMapReaderFactory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseCanvasFactory = /*#__PURE__*/function () {
  function BaseCanvasFactory() {
    _classCallCheck(this, BaseCanvasFactory);

    if (this.constructor === BaseCanvasFactory) {
      (0, _util.unreachable)("Cannot initialize BaseCanvasFactory.");
    }
  }

  _createClass(BaseCanvasFactory, [{
    key: "create",
    value: function create(width, height) {
      if (width <= 0 || height <= 0) {
        throw new Error("Invalid canvas size");
      }

      var canvas = this._createCanvas(width, height);

      return {
        canvas: canvas,
        context: canvas.getContext("2d")
      };
    }
  }, {
    key: "reset",
    value: function reset(canvasAndContext, width, height) {
      if (!canvasAndContext.canvas) {
        throw new Error("Canvas is not specified");
      }

      if (width <= 0 || height <= 0) {
        throw new Error("Invalid canvas size");
      }

      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    }
  }, {
    key: "destroy",
    value: function destroy(canvasAndContext) {
      if (!canvasAndContext.canvas) {
        throw new Error("Canvas is not specified");
      }

      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    }
  }, {
    key: "_createCanvas",
    value: function _createCanvas(width, height) {
      (0, _util.unreachable)("Abstract method `_createCanvas` called.");
    }
  }]);

  return BaseCanvasFactory;
}();

exports.BaseCanvasFactory = BaseCanvasFactory;

var BaseCMapReaderFactory = /*#__PURE__*/function () {
  function BaseCMapReaderFactory(_ref) {
    var _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === void 0 ? null : _ref$baseUrl,
        _ref$isCompressed = _ref.isCompressed,
        isCompressed = _ref$isCompressed === void 0 ? false : _ref$isCompressed;

    _classCallCheck(this, BaseCMapReaderFactory);

    if (this.constructor === BaseCMapReaderFactory) {
      (0, _util.unreachable)("Cannot initialize BaseCMapReaderFactory.");
    }

    this.baseUrl = baseUrl;
    this.isCompressed = isCompressed;
  }

  _createClass(BaseCMapReaderFactory, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
        var _this = this;

        var name, url, compressionType;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref2.name;

                if (this.baseUrl) {
                  _context.next = 3;
                  break;
                }

                throw new Error('The CMap "baseUrl" parameter must be specified, ensure that ' + 'the "cMapUrl" and "cMapPacked" API parameters are provided.');

              case 3:
                if (name) {
                  _context.next = 5;
                  break;
                }

                throw new Error("CMap name must be specified.");

              case 5:
                url = this.baseUrl + name + (this.isCompressed ? ".bcmap" : "");
                compressionType = this.isCompressed ? _util.CMapCompressionType.BINARY : _util.CMapCompressionType.NONE;
                return _context.abrupt("return", this._fetchData(url, compressionType)["catch"](function (reason) {
                  throw new Error("Unable to load ".concat(_this.isCompressed ? "binary " : "", "CMap at: ").concat(url));
                }));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "_fetchData",
    value: function _fetchData(url, compressionType) {
      (0, _util.unreachable)("Abstract method `_fetchData` called.");
    }
  }]);

  return BaseCMapReaderFactory;
}();

exports.BaseCMapReaderFactory = BaseCMapReaderFactory;

var BaseStandardFontDataFactory = /*#__PURE__*/function () {
  function BaseStandardFontDataFactory(_ref3) {
    var _ref3$baseUrl = _ref3.baseUrl,
        baseUrl = _ref3$baseUrl === void 0 ? null : _ref3$baseUrl;

    _classCallCheck(this, BaseStandardFontDataFactory);

    if (this.constructor === BaseStandardFontDataFactory) {
      (0, _util.unreachable)("Cannot initialize BaseStandardFontDataFactory.");
    }

    this.baseUrl = baseUrl;
  }

  _createClass(BaseStandardFontDataFactory, [{
    key: "fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref4) {
        var filename, url;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filename = _ref4.filename;

                if (this.baseUrl) {
                  _context2.next = 3;
                  break;
                }

                throw new Error('The standard font "baseUrl" parameter must be specified, ensure that ' + 'the "standardFontDataUrl" API parameter is provided.');

              case 3:
                if (filename) {
                  _context2.next = 5;
                  break;
                }

                throw new Error("Font filename must be specified.");

              case 5:
                url = "".concat(this.baseUrl).concat(filename);
                return _context2.abrupt("return", this._fetchData(url)["catch"](function (reason) {
                  throw new Error("Unable to load font data at: ".concat(url));
                }));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetch(_x2) {
        return _fetch2.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "_fetchData",
    value: function _fetchData(url) {
      (0, _util.unreachable)("Abstract method `_fetchData` called.");
    }
  }]);

  return BaseStandardFontDataFactory;
}();

exports.BaseStandardFontDataFactory = BaseStandardFontDataFactory;

var BaseSVGFactory = /*#__PURE__*/function () {
  function BaseSVGFactory() {
    _classCallCheck(this, BaseSVGFactory);

    if (this.constructor === BaseSVGFactory) {
      (0, _util.unreachable)("Cannot initialize BaseSVGFactory.");
    }
  }

  _createClass(BaseSVGFactory, [{
    key: "create",
    value: function create(width, height) {
      if (width <= 0 || height <= 0) {
        throw new Error("Invalid SVG dimensions");
      }

      var svg = this._createSVG("svg:svg");

      svg.setAttribute("version", "1.1");
      svg.setAttribute("width", "".concat(width, "px"));
      svg.setAttribute("height", "".concat(height, "px"));
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("viewBox", "0 0 ".concat(width, " ").concat(height));
      return svg;
    }
  }, {
    key: "createElement",
    value: function createElement(type) {
      if (typeof type !== "string") {
        throw new Error("Invalid SVG element type");
      }

      return this._createSVG(type);
    }
  }, {
    key: "_createSVG",
    value: function _createSVG(type) {
      (0, _util.unreachable)("Abstract method `_createSVG` called.");
    }
  }]);

  return BaseSVGFactory;
}();

exports.BaseSVGFactory = BaseSVGFactory;