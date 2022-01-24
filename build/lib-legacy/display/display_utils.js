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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatTimer = exports.RenderingCancelledException = exports.PixelsPerInch = exports.PageViewport = exports.PDFDateString = exports.LinkTarget = exports.DOMStandardFontDataFactory = exports.DOMSVGFactory = exports.DOMCanvasFactory = exports.DOMCMapReaderFactory = void 0;
exports.addLinkAttributes = addLinkAttributes;
exports.deprecated = deprecated;
exports.getFilenameFromUrl = getFilenameFromUrl;
exports.getPdfFilenameFromUrl = getPdfFilenameFromUrl;
exports.getXfaPageViewport = getXfaPageViewport;
exports.isDataScheme = isDataScheme;
exports.isPdfFile = isPdfFile;
exports.isValidFetchUrl = isValidFetchUrl;
exports.loadScript = loadScript;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util.js");

var _base_factory = require("./base_factory.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DEFAULT_LINK_REL = "noopener noreferrer nofollow";
var SVG_NS = "http://www.w3.org/2000/svg";
var PixelsPerInch = {
  CSS: 96.0,
  PDF: 72.0,

  get PDF_TO_CSS_UNITS() {
    return (0, _util.shadow)(this, "PDF_TO_CSS_UNITS", this.CSS / this.PDF);
  }

};
exports.PixelsPerInch = PixelsPerInch;

var DOMCanvasFactory = /*#__PURE__*/function (_BaseCanvasFactory) {
  _inherits(DOMCanvasFactory, _BaseCanvasFactory);

  var _super = _createSuper(DOMCanvasFactory);

  function DOMCanvasFactory() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$ownerDocument = _ref.ownerDocument,
        ownerDocument = _ref$ownerDocument === void 0 ? globalThis.document : _ref$ownerDocument;

    _classCallCheck(this, DOMCanvasFactory);

    _this = _super.call(this);
    _this._document = ownerDocument;
    return _this;
  }

  _createClass(DOMCanvasFactory, [{
    key: "_createCanvas",
    value: function _createCanvas(width, height) {
      var canvas = this._document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;
      return canvas;
    }
  }]);

  return DOMCanvasFactory;
}(_base_factory.BaseCanvasFactory);

exports.DOMCanvasFactory = DOMCanvasFactory;

function fetchData(_x) {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var asTypedArray,
        response,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            asTypedArray = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

            if (!isValidFetchUrl(url, document.baseURI)) {
              _context.next = 21;
              break;
            }

            _context.next = 4;
            return fetch(url);

          case 4:
            response = _context.sent;

            if (response.ok) {
              _context.next = 7;
              break;
            }

            throw new Error(response.statusText);

          case 7:
            if (!asTypedArray) {
              _context.next = 15;
              break;
            }

            _context.t1 = Uint8Array;
            _context.next = 11;
            return response.arrayBuffer();

          case 11:
            _context.t2 = _context.sent;
            _context.t0 = new _context.t1(_context.t2);
            _context.next = 20;
            break;

          case 15:
            _context.t3 = _util.stringToBytes;
            _context.next = 18;
            return response.text();

          case 18:
            _context.t4 = _context.sent;
            _context.t0 = (0, _context.t3)(_context.t4);

          case 20:
            return _context.abrupt("return", _context.t0);

          case 21:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var request = new XMLHttpRequest();
              request.open("GET", url, true);

              if (asTypedArray) {
                request.responseType = "arraybuffer";
              }

              request.onreadystatechange = function () {
                if (request.readyState !== XMLHttpRequest.DONE) {
                  return;
                }

                if (request.status === 200 || request.status === 0) {
                  var data;

                  if (asTypedArray && request.response) {
                    data = new Uint8Array(request.response);
                  } else if (!asTypedArray && request.responseText) {
                    data = (0, _util.stringToBytes)(request.responseText);
                  }

                  if (data) {
                    resolve(data);
                    return;
                  }
                }

                reject(new Error(request.statusText));
              };

              request.send(null);
            }));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchData.apply(this, arguments);
}

var DOMCMapReaderFactory = /*#__PURE__*/function (_BaseCMapReaderFactor) {
  _inherits(DOMCMapReaderFactory, _BaseCMapReaderFactor);

  var _super2 = _createSuper(DOMCMapReaderFactory);

  function DOMCMapReaderFactory() {
    _classCallCheck(this, DOMCMapReaderFactory);

    return _super2.apply(this, arguments);
  }

  _createClass(DOMCMapReaderFactory, [{
    key: "_fetchData",
    value: function _fetchData(url, compressionType) {
      return fetchData(url, this.isCompressed).then(function (data) {
        return {
          cMapData: data,
          compressionType: compressionType
        };
      });
    }
  }]);

  return DOMCMapReaderFactory;
}(_base_factory.BaseCMapReaderFactory);

exports.DOMCMapReaderFactory = DOMCMapReaderFactory;

var DOMStandardFontDataFactory = /*#__PURE__*/function (_BaseStandardFontData) {
  _inherits(DOMStandardFontDataFactory, _BaseStandardFontData);

  var _super3 = _createSuper(DOMStandardFontDataFactory);

  function DOMStandardFontDataFactory() {
    _classCallCheck(this, DOMStandardFontDataFactory);

    return _super3.apply(this, arguments);
  }

  _createClass(DOMStandardFontDataFactory, [{
    key: "_fetchData",
    value: function _fetchData(url) {
      return fetchData(url, true);
    }
  }]);

  return DOMStandardFontDataFactory;
}(_base_factory.BaseStandardFontDataFactory);

exports.DOMStandardFontDataFactory = DOMStandardFontDataFactory;

var DOMSVGFactory = /*#__PURE__*/function (_BaseSVGFactory) {
  _inherits(DOMSVGFactory, _BaseSVGFactory);

  var _super4 = _createSuper(DOMSVGFactory);

  function DOMSVGFactory() {
    _classCallCheck(this, DOMSVGFactory);

    return _super4.apply(this, arguments);
  }

  _createClass(DOMSVGFactory, [{
    key: "_createSVG",
    value: function _createSVG(type) {
      return document.createElementNS(SVG_NS, type);
    }
  }]);

  return DOMSVGFactory;
}(_base_factory.BaseSVGFactory);

exports.DOMSVGFactory = DOMSVGFactory;

var PageViewport = /*#__PURE__*/function () {
  function PageViewport(_ref2) {
    var viewBox = _ref2.viewBox,
        scale = _ref2.scale,
        rotation = _ref2.rotation,
        _ref2$offsetX = _ref2.offsetX,
        offsetX = _ref2$offsetX === void 0 ? 0 : _ref2$offsetX,
        _ref2$offsetY = _ref2.offsetY,
        offsetY = _ref2$offsetY === void 0 ? 0 : _ref2$offsetY,
        _ref2$dontFlip = _ref2.dontFlip,
        dontFlip = _ref2$dontFlip === void 0 ? false : _ref2$dontFlip;

    _classCallCheck(this, PageViewport);

    this.viewBox = viewBox;
    this.scale = scale;
    this.rotation = rotation;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    var centerX = (viewBox[2] + viewBox[0]) / 2;
    var centerY = (viewBox[3] + viewBox[1]) / 2;
    var rotateA, rotateB, rotateC, rotateD;
    rotation %= 360;

    if (rotation < 0) {
      rotation += 360;
    }

    switch (rotation) {
      case 180:
        rotateA = -1;
        rotateB = 0;
        rotateC = 0;
        rotateD = 1;
        break;

      case 90:
        rotateA = 0;
        rotateB = 1;
        rotateC = 1;
        rotateD = 0;
        break;

      case 270:
        rotateA = 0;
        rotateB = -1;
        rotateC = -1;
        rotateD = 0;
        break;

      case 0:
        rotateA = 1;
        rotateB = 0;
        rotateC = 0;
        rotateD = -1;
        break;

      default:
        throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
    }

    if (dontFlip) {
      rotateC = -rotateC;
      rotateD = -rotateD;
    }

    var offsetCanvasX, offsetCanvasY;
    var width, height;

    if (rotateA === 0) {
      offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
      offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
      width = Math.abs(viewBox[3] - viewBox[1]) * scale;
      height = Math.abs(viewBox[2] - viewBox[0]) * scale;
    } else {
      offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
      offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
      width = Math.abs(viewBox[2] - viewBox[0]) * scale;
      height = Math.abs(viewBox[3] - viewBox[1]) * scale;
    }

    this.transform = [rotateA * scale, rotateB * scale, rotateC * scale, rotateD * scale, offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY, offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY];
    this.width = width;
    this.height = height;
  }

  _createClass(PageViewport, [{
    key: "clone",
    value: function clone() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$scale = _ref3.scale,
          scale = _ref3$scale === void 0 ? this.scale : _ref3$scale,
          _ref3$rotation = _ref3.rotation,
          rotation = _ref3$rotation === void 0 ? this.rotation : _ref3$rotation,
          _ref3$offsetX = _ref3.offsetX,
          offsetX = _ref3$offsetX === void 0 ? this.offsetX : _ref3$offsetX,
          _ref3$offsetY = _ref3.offsetY,
          offsetY = _ref3$offsetY === void 0 ? this.offsetY : _ref3$offsetY,
          _ref3$dontFlip = _ref3.dontFlip,
          dontFlip = _ref3$dontFlip === void 0 ? false : _ref3$dontFlip;

      return new PageViewport({
        viewBox: this.viewBox.slice(),
        scale: scale,
        rotation: rotation,
        offsetX: offsetX,
        offsetY: offsetY,
        dontFlip: dontFlip
      });
    }
  }, {
    key: "convertToViewportPoint",
    value: function convertToViewportPoint(x, y) {
      return _util.Util.applyTransform([x, y], this.transform);
    }
  }, {
    key: "convertToViewportRectangle",
    value: function convertToViewportRectangle(rect) {
      var topLeft = _util.Util.applyTransform([rect[0], rect[1]], this.transform);

      var bottomRight = _util.Util.applyTransform([rect[2], rect[3]], this.transform);

      return [topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]];
    }
  }, {
    key: "convertToPdfPoint",
    value: function convertToPdfPoint(x, y) {
      return _util.Util.applyInverseTransform([x, y], this.transform);
    }
  }]);

  return PageViewport;
}();

exports.PageViewport = PageViewport;

var RenderingCancelledException = /*#__PURE__*/function (_BaseException) {
  _inherits(RenderingCancelledException, _BaseException);

  var _super5 = _createSuper(RenderingCancelledException);

  function RenderingCancelledException(msg, type) {
    var _this2;

    _classCallCheck(this, RenderingCancelledException);

    _this2 = _super5.call(this, msg, "RenderingCancelledException");
    _this2.type = type;
    return _this2;
  }

  return RenderingCancelledException;
}(_util.BaseException);

exports.RenderingCancelledException = RenderingCancelledException;
var LinkTarget = {
  NONE: 0,
  SELF: 1,
  BLANK: 2,
  PARENT: 3,
  TOP: 4
};
exports.LinkTarget = LinkTarget;

function addLinkAttributes(link) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      url = _ref4.url,
      target = _ref4.target,
      rel = _ref4.rel,
      _ref4$enabled = _ref4.enabled,
      enabled = _ref4$enabled === void 0 ? true : _ref4$enabled;

  (0, _util.assert)(url && typeof url === "string", 'addLinkAttributes: A valid "url" parameter must provided.');
  var urlNullRemoved = (0, _util.removeNullCharacters)(url);

  if (enabled) {
    link.href = link.title = urlNullRemoved;
  } else {
    link.href = "";
    link.title = "Disabled: ".concat(urlNullRemoved);

    link.onclick = function () {
      return false;
    };
  }

  var targetStr = "";

  switch (target) {
    case LinkTarget.NONE:
      break;

    case LinkTarget.SELF:
      targetStr = "_self";
      break;

    case LinkTarget.BLANK:
      targetStr = "_blank";
      break;

    case LinkTarget.PARENT:
      targetStr = "_parent";
      break;

    case LinkTarget.TOP:
      targetStr = "_top";
      break;
  }

  link.target = targetStr;
  link.rel = typeof rel === "string" ? rel : DEFAULT_LINK_REL;
}

function isDataScheme(url) {
  var ii = url.length;
  var i = 0;

  while (i < ii && url[i].trim() === "") {
    i++;
  }

  return url.substring(i, i + 5).toLowerCase() === "data:";
}

function isPdfFile(filename) {
  return typeof filename === "string" && /\.pdf$/i.test(filename);
}

function getFilenameFromUrl(url) {
  var anchor = url.indexOf("#");
  var query = url.indexOf("?");
  var end = Math.min(anchor > 0 ? anchor : url.length, query > 0 ? query : url.length);
  return url.substring(url.lastIndexOf("/", end) + 1, end);
}

function getPdfFilenameFromUrl(url) {
  var defaultFilename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "document.pdf";

  if (typeof url !== "string") {
    return defaultFilename;
  }

  if (isDataScheme(url)) {
    (0, _util.warn)('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.');
    return defaultFilename;
  }

  var reURI = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
  var reFilename = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
  var splitURI = reURI.exec(url);
  var suggestedFilename = reFilename.exec(splitURI[1]) || reFilename.exec(splitURI[2]) || reFilename.exec(splitURI[3]);

  if (suggestedFilename) {
    suggestedFilename = suggestedFilename[0];

    if (suggestedFilename.includes("%")) {
      try {
        suggestedFilename = reFilename.exec(decodeURIComponent(suggestedFilename))[0];
      } catch (ex) {}
    }
  }

  return suggestedFilename || defaultFilename;
}

var StatTimer = /*#__PURE__*/function () {
  function StatTimer() {
    _classCallCheck(this, StatTimer);

    this.started = Object.create(null);
    this.times = [];
  }

  _createClass(StatTimer, [{
    key: "time",
    value: function time(name) {
      if (name in this.started) {
        (0, _util.warn)("Timer is already running for ".concat(name));
      }

      this.started[name] = Date.now();
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(name) {
      if (!(name in this.started)) {
        (0, _util.warn)("Timer has not been started for ".concat(name));
      }

      this.times.push({
        name: name,
        start: this.started[name],
        end: Date.now()
      });
      delete this.started[name];
    }
  }, {
    key: "toString",
    value: function toString() {
      var outBuf = [];
      var longest = 0;

      var _iterator = _createForOfIteratorHelper(this.times),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var time = _step.value;
          var name = time.name;

          if (name.length > longest) {
            longest = name.length;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(this.times),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _time = _step2.value;
          var duration = _time.end - _time.start;
          outBuf.push("".concat(_time.name.padEnd(longest), " ").concat(duration, "ms\n"));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return outBuf.join("");
    }
  }]);

  return StatTimer;
}();

exports.StatTimer = StatTimer;

function isValidFetchUrl(url, baseUrl) {
  try {
    var _ref5 = baseUrl ? new URL(url, baseUrl) : new URL(url),
        protocol = _ref5.protocol;

    return protocol === "http:" || protocol === "https:";
  } catch (ex) {
    return false;
  }
}

function loadScript(src) {
  var removeScriptElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return new Promise(function (resolve, reject) {
    var script = document.createElement("script");
    script.src = src;

    script.onload = function (evt) {
      if (removeScriptElement) {
        script.remove();
      }

      resolve(evt);
    };

    script.onerror = function () {
      reject(new Error("Cannot load script at: ".concat(script.src)));
    };

    (document.head || document.documentElement).appendChild(script);
  });
}

function deprecated(details) {
  console.log("Deprecated API usage: " + details);
}

var pdfDateStringRegex;

var PDFDateString = /*#__PURE__*/function () {
  function PDFDateString() {
    _classCallCheck(this, PDFDateString);
  }

  _createClass(PDFDateString, null, [{
    key: "toDateObject",
    value: function toDateObject(input) {
      if (!input || !(0, _util.isString)(input)) {
        return null;
      }

      if (!pdfDateStringRegex) {
        pdfDateStringRegex = new RegExp("^D:" + "(\\d{4})" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "([Z|+|-])?" + "(\\d{2})?" + "'?" + "(\\d{2})?" + "'?");
      }

      var matches = pdfDateStringRegex.exec(input);

      if (!matches) {
        return null;
      }

      var year = parseInt(matches[1], 10);
      var month = parseInt(matches[2], 10);
      month = month >= 1 && month <= 12 ? month - 1 : 0;
      var day = parseInt(matches[3], 10);
      day = day >= 1 && day <= 31 ? day : 1;
      var hour = parseInt(matches[4], 10);
      hour = hour >= 0 && hour <= 23 ? hour : 0;
      var minute = parseInt(matches[5], 10);
      minute = minute >= 0 && minute <= 59 ? minute : 0;
      var second = parseInt(matches[6], 10);
      second = second >= 0 && second <= 59 ? second : 0;
      var universalTimeRelation = matches[7] || "Z";
      var offsetHour = parseInt(matches[8], 10);
      offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
      var offsetMinute = parseInt(matches[9], 10) || 0;
      offsetMinute = offsetMinute >= 0 && offsetMinute <= 59 ? offsetMinute : 0;

      if (universalTimeRelation === "-") {
        hour += offsetHour;
        minute += offsetMinute;
      } else if (universalTimeRelation === "+") {
        hour -= offsetHour;
        minute -= offsetMinute;
      }

      return new Date(Date.UTC(year, month, day, hour, minute, second));
    }
  }]);

  return PDFDateString;
}();

exports.PDFDateString = PDFDateString;

function getXfaPageViewport(xfaPage, _ref6) {
  var _ref6$scale = _ref6.scale,
      scale = _ref6$scale === void 0 ? 1 : _ref6$scale,
      _ref6$rotation = _ref6.rotation,
      rotation = _ref6$rotation === void 0 ? 0 : _ref6$rotation;
  var _xfaPage$attributes$s = xfaPage.attributes.style,
      width = _xfaPage$attributes$s.width,
      height = _xfaPage$attributes$s.height;
  var viewBox = [0, 0, parseInt(width), parseInt(height)];
  return new PageViewport({
    viewBox: viewBox,
    scale: scale,
    rotation: rotation
  });
}