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
exports.PartialEvaluator = exports.EvaluatorPreprocessor = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util.js");

var _cmap = require("./cmap.js");

var _primitives = require("./primitives.js");

var _fonts = require("./fonts.js");

var _fonts_utils = require("./fonts_utils.js");

var _encodings = require("./encodings.js");

var _standard_fonts = require("./standard_fonts.js");

var _unicode = require("./unicode.js");

var _pattern = require("./pattern.js");

var _xfa_fonts = require("./xfa_fonts.js");

var _to_unicode_map = require("./to_unicode_map.js");

var _function = require("./function.js");

var _parser = require("./parser.js");

var _image_utils = require("./image_utils.js");

var _stream = require("./stream.js");

var _base_stream = require("./base_stream.js");

var _bidi = require("./bidi.js");

var _colorspace = require("./colorspace.js");

var _decode_stream = require("./decode_stream.js");

var _glyphlist = require("./glyphlist.js");

var _core_utils = require("./core_utils.js");

var _metrics = require("./metrics.js");

var _murmurhash = require("./murmurhash3.js");

var _operator_list = require("./operator_list.js");

var _image = require("./image.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DefaultPartialEvaluatorOptions = Object.freeze({
  maxImageSize: -1,
  disableFontFace: false,
  ignoreErrors: false,
  isEvalSupported: true,
  fontExtraProperties: false,
  useSystemFonts: true,
  cMapUrl: null,
  standardFontDataUrl: null
});
var PatternType = {
  TILING: 1,
  SHADING: 2
};
var TEXT_CHUNK_BATCH_SIZE = 10;
var deferred = Promise.resolve();

function normalizeBlendMode(value) {
  var parsingArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (Array.isArray(value)) {
    for (var i = 0, ii = value.length; i < ii; i++) {
      var maybeBM = normalizeBlendMode(value[i], true);

      if (maybeBM) {
        return maybeBM;
      }
    }

    (0, _util.warn)("Unsupported blend mode Array: ".concat(value));
    return "source-over";
  }

  if (!(0, _primitives.isName)(value)) {
    if (parsingArray) {
      return null;
    }

    return "source-over";
  }

  switch (value.name) {
    case "Normal":
    case "Compatible":
      return "source-over";

    case "Multiply":
      return "multiply";

    case "Screen":
      return "screen";

    case "Overlay":
      return "overlay";

    case "Darken":
      return "darken";

    case "Lighten":
      return "lighten";

    case "ColorDodge":
      return "color-dodge";

    case "ColorBurn":
      return "color-burn";

    case "HardLight":
      return "hard-light";

    case "SoftLight":
      return "soft-light";

    case "Difference":
      return "difference";

    case "Exclusion":
      return "exclusion";

    case "Hue":
      return "hue";

    case "Saturation":
      return "saturation";

    case "Color":
      return "color";

    case "Luminosity":
      return "luminosity";
  }

  if (parsingArray) {
    return null;
  }

  (0, _util.warn)("Unsupported blend mode: ".concat(value.name));
  return "source-over";
}

var TimeSlotManager = /*#__PURE__*/function () {
  function TimeSlotManager() {
    _classCallCheck(this, TimeSlotManager);

    this.reset();
  }

  _createClass(TimeSlotManager, [{
    key: "check",
    value: function check() {
      if (++this.checked < TimeSlotManager.CHECK_TIME_EVERY) {
        return false;
      }

      this.checked = 0;
      return this.endTime <= Date.now();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.endTime = Date.now() + TimeSlotManager.TIME_SLOT_DURATION_MS;
      this.checked = 0;
    }
  }], [{
    key: "TIME_SLOT_DURATION_MS",
    get: function get() {
      return (0, _util.shadow)(this, "TIME_SLOT_DURATION_MS", 20);
    }
  }, {
    key: "CHECK_TIME_EVERY",
    get: function get() {
      return (0, _util.shadow)(this, "CHECK_TIME_EVERY", 100);
    }
  }]);

  return TimeSlotManager;
}();

var PartialEvaluator = /*#__PURE__*/function () {
  function PartialEvaluator(_ref) {
    var xref = _ref.xref,
        handler = _ref.handler,
        pageIndex = _ref.pageIndex,
        idFactory = _ref.idFactory,
        fontCache = _ref.fontCache,
        builtInCMapCache = _ref.builtInCMapCache,
        standardFontDataCache = _ref.standardFontDataCache,
        globalImageCache = _ref.globalImageCache,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? null : _ref$options;

    _classCallCheck(this, PartialEvaluator);

    this.xref = xref;
    this.handler = handler;
    this.pageIndex = pageIndex;
    this.idFactory = idFactory;
    this.fontCache = fontCache;
    this.builtInCMapCache = builtInCMapCache;
    this.standardFontDataCache = standardFontDataCache;
    this.globalImageCache = globalImageCache;
    this.options = options || DefaultPartialEvaluatorOptions;
    this.parsingType3Font = false;
    this._fetchBuiltInCMapBound = this.fetchBuiltInCMap.bind(this);
  }

  _createClass(PartialEvaluator, [{
    key: "_pdfFunctionFactory",
    get: function get() {
      var pdfFunctionFactory = new _function.PDFFunctionFactory({
        xref: this.xref,
        isEvalSupported: this.options.isEvalSupported
      });
      return (0, _util.shadow)(this, "_pdfFunctionFactory", pdfFunctionFactory);
    }
  }, {
    key: "clone",
    value: function clone() {
      var newOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var newEvaluator = Object.create(this);
      newEvaluator.options = Object.assign(Object.create(null), this.options, newOptions);
      return newEvaluator;
    }
  }, {
    key: "hasBlendModes",
    value: function hasBlendModes(resources, nonBlendModesSet) {
      if (!(resources instanceof _primitives.Dict)) {
        return false;
      }

      if (resources.objId && nonBlendModesSet.has(resources.objId)) {
        return false;
      }

      var processed = new _primitives.RefSet(nonBlendModesSet);

      if (resources.objId) {
        processed.put(resources.objId);
      }

      var nodes = [resources],
          xref = this.xref;

      while (nodes.length) {
        var node = nodes.shift();
        var graphicStates = node.get("ExtGState");

        if (graphicStates instanceof _primitives.Dict) {
          var _iterator = _createForOfIteratorHelper(graphicStates.getRawValues()),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var graphicState = _step.value;

              if (graphicState instanceof _primitives.Ref) {
                if (processed.has(graphicState)) {
                  continue;
                }

                try {
                  graphicState = xref.fetch(graphicState);
                } catch (ex) {
                  processed.put(graphicState);
                  (0, _util.info)("hasBlendModes - ignoring ExtGState: \"".concat(ex, "\"."));
                  continue;
                }
              }

              if (!(graphicState instanceof _primitives.Dict)) {
                continue;
              }

              if (graphicState.objId) {
                processed.put(graphicState.objId);
              }

              var bm = graphicState.get("BM");

              if (bm instanceof _primitives.Name) {
                if (bm.name !== "Normal") {
                  return true;
                }

                continue;
              }

              if (bm !== undefined && Array.isArray(bm)) {
                var _iterator2 = _createForOfIteratorHelper(bm),
                    _step2;

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var element = _step2.value;

                    if (element instanceof _primitives.Name && element.name !== "Normal") {
                      return true;
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        var xObjects = node.get("XObject");

        if (!(xObjects instanceof _primitives.Dict)) {
          continue;
        }

        var _iterator3 = _createForOfIteratorHelper(xObjects.getRawValues()),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var xObject = _step3.value;

            if (xObject instanceof _primitives.Ref) {
              if (processed.has(xObject)) {
                continue;
              }

              try {
                xObject = xref.fetch(xObject);
              } catch (ex) {
                processed.put(xObject);
                (0, _util.info)("hasBlendModes - ignoring XObject: \"".concat(ex, "\"."));
                continue;
              }
            }

            if (!(0, _primitives.isStream)(xObject)) {
              continue;
            }

            if (xObject.dict.objId) {
              processed.put(xObject.dict.objId);
            }

            var xResources = xObject.dict.get("Resources");

            if (!(xResources instanceof _primitives.Dict)) {
              continue;
            }

            if (xResources.objId && processed.has(xResources.objId)) {
              continue;
            }

            nodes.push(xResources);

            if (xResources.objId) {
              processed.put(xResources.objId);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      processed.forEach(function (ref) {
        nonBlendModesSet.put(ref);
      });
      return false;
    }
  }, {
    key: "fetchBuiltInCMap",
    value: function () {
      var _fetchBuiltInCMap = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(name) {
        var cachedData, data, url, response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cachedData = this.builtInCMapCache.get(name);

                if (!cachedData) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", cachedData);

              case 3:
                if (!(this.options.cMapUrl !== null)) {
                  _context.next = 19;
                  break;
                }

                url = "".concat(this.options.cMapUrl).concat(name, ".bcmap");
                _context.next = 7;
                return fetch(url);

              case 7:
                response = _context.sent;

                if (response.ok) {
                  _context.next = 10;
                  break;
                }

                throw new Error("fetchBuiltInCMap: failed to fetch file \"".concat(url, "\" with \"").concat(response.statusText, "\"."));

              case 10:
                _context.t0 = Uint8Array;
                _context.next = 13;
                return response.arrayBuffer();

              case 13:
                _context.t1 = _context.sent;
                _context.t2 = new _context.t0(_context.t1);
                _context.t3 = _util.CMapCompressionType.BINARY;
                data = {
                  cMapData: _context.t2,
                  compressionType: _context.t3
                };
                _context.next = 22;
                break;

              case 19:
                _context.next = 21;
                return this.handler.sendWithPromise("FetchBuiltInCMap", {
                  name: name
                });

              case 21:
                data = _context.sent;

              case 22:
                if (data.compressionType !== _util.CMapCompressionType.NONE) {
                  this.builtInCMapCache.set(name, data);
                }

                return _context.abrupt("return", data);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchBuiltInCMap(_x) {
        return _fetchBuiltInCMap.apply(this, arguments);
      }

      return fetchBuiltInCMap;
    }()
  }, {
    key: "fetchStandardFontData",
    value: function () {
      var _fetchStandardFontData = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(name) {
        var cachedData, standardFontNameToFileName, filename, data, url, response;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cachedData = this.standardFontDataCache.get(name);

                if (!cachedData) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", new _stream.Stream(cachedData));

              case 3:
                if (!(this.options.useSystemFonts && name !== "Symbol" && name !== "ZapfDingbats")) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", null);

              case 5:
                standardFontNameToFileName = (0, _standard_fonts.getFontNameToFileMap)(), filename = standardFontNameToFileName[name];

                if (!(this.options.standardFontDataUrl !== null)) {
                  _context2.next = 20;
                  break;
                }

                url = "".concat(this.options.standardFontDataUrl).concat(filename);
                _context2.next = 10;
                return fetch(url);

              case 10:
                response = _context2.sent;

                if (response.ok) {
                  _context2.next = 15;
                  break;
                }

                (0, _util.warn)("fetchStandardFontData: failed to fetch file \"".concat(url, "\" with \"").concat(response.statusText, "\"."));
                _context2.next = 18;
                break;

              case 15:
                _context2.next = 17;
                return response.arrayBuffer();

              case 17:
                data = _context2.sent;

              case 18:
                _context2.next = 29;
                break;

              case 20:
                _context2.prev = 20;
                _context2.next = 23;
                return this.handler.sendWithPromise("FetchStandardFontData", {
                  filename: filename
                });

              case 23:
                data = _context2.sent;
                _context2.next = 29;
                break;

              case 26:
                _context2.prev = 26;
                _context2.t0 = _context2["catch"](20);
                (0, _util.warn)("fetchStandardFontData: failed to fetch file \"".concat(filename, "\" with \"").concat(_context2.t0, "\"."));

              case 29:
                if (data) {
                  _context2.next = 31;
                  break;
                }

                return _context2.abrupt("return", null);

              case 31:
                this.standardFontDataCache.set(name, data);
                return _context2.abrupt("return", new _stream.Stream(data));

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[20, 26]]);
      }));

      function fetchStandardFontData(_x2) {
        return _fetchStandardFontData.apply(this, arguments);
      }

      return fetchStandardFontData;
    }()
  }, {
    key: "buildFormXObject",
    value: function () {
      var _buildFormXObject = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resources, xobj, smask, operatorList, task, initialState, localColorSpaceCache) {
        var dict, matrix, bbox, optionalContent, groupOptions, group, groupSubtype, colorSpace, cs, cachedColorSpace, args;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                dict = xobj.dict;
                matrix = dict.getArray("Matrix");
                bbox = dict.getArray("BBox");

                if (Array.isArray(bbox) && bbox.length === 4) {
                  bbox = _util.Util.normalizeRect(bbox);
                } else {
                  bbox = null;
                }

                if (!dict.has("OC")) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 7;
                return this.parseMarkedContentProps(dict.get("OC"), resources);

              case 7:
                optionalContent = _context3.sent;

              case 8:
                if (optionalContent !== undefined) {
                  operatorList.addOp(_util.OPS.beginMarkedContentProps, ["OC", optionalContent]);
                }

                group = dict.get("Group");

                if (!group) {
                  _context3.next = 29;
                  break;
                }

                groupOptions = {
                  matrix: matrix,
                  bbox: bbox,
                  smask: smask,
                  isolated: false,
                  knockout: false
                };
                groupSubtype = group.get("S");
                colorSpace = null;

                if (!(0, _primitives.isName)(groupSubtype, "Transparency")) {
                  _context3.next = 27;
                  break;
                }

                groupOptions.isolated = group.get("I") || false;
                groupOptions.knockout = group.get("K") || false;

                if (!group.has("CS")) {
                  _context3.next = 27;
                  break;
                }

                cs = group.getRaw("CS");
                cachedColorSpace = _colorspace.ColorSpace.getCached(cs, this.xref, localColorSpaceCache);

                if (!cachedColorSpace) {
                  _context3.next = 24;
                  break;
                }

                colorSpace = cachedColorSpace;
                _context3.next = 27;
                break;

              case 24:
                _context3.next = 26;
                return this.parseColorSpace({
                  cs: cs,
                  resources: resources,
                  localColorSpaceCache: localColorSpaceCache
                });

              case 26:
                colorSpace = _context3.sent;

              case 27:
                if (smask && smask.backdrop) {
                  colorSpace = colorSpace || _colorspace.ColorSpace.singletons.rgb;
                  smask.backdrop = colorSpace.getRgb(smask.backdrop, 0);
                }

                operatorList.addOp(_util.OPS.beginGroup, [groupOptions]);

              case 29:
                args = group ? [matrix, null] : [matrix, bbox];
                operatorList.addOp(_util.OPS.paintFormXObjectBegin, args);
                return _context3.abrupt("return", this.getOperatorList({
                  stream: xobj,
                  task: task,
                  resources: dict.get("Resources") || resources,
                  operatorList: operatorList,
                  initialState: initialState
                }).then(function () {
                  operatorList.addOp(_util.OPS.paintFormXObjectEnd, []);

                  if (group) {
                    operatorList.addOp(_util.OPS.endGroup, [groupOptions]);
                  }

                  if (optionalContent !== undefined) {
                    operatorList.addOp(_util.OPS.endMarkedContent, []);
                  }
                }));

              case 32:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function buildFormXObject(_x3, _x4, _x5, _x6, _x7, _x8, _x9) {
        return _buildFormXObject.apply(this, arguments);
      }

      return buildFormXObject;
    }()
  }, {
    key: "_sendImgData",
    value: function _sendImgData(objId, imgData) {
      var cacheGlobally = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var transfers = imgData ? [imgData.data.buffer] : null;

      if (this.parsingType3Font || cacheGlobally) {
        return this.handler.send("commonobj", [objId, "Image", imgData], transfers);
      }

      return this.handler.send("obj", [objId, this.pageIndex, "Image", imgData], transfers);
    }
  }, {
    key: "buildPaintImageXObject",
    value: function () {
      var _buildPaintImageXObject = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref2) {
        var _this = this;

        var resources, image, _ref2$isInline, isInline, operatorList, cacheKey, localImageCache, localColorSpaceCache, dict, imageRef, w, h, maxImageSize, optionalContent, imageMask, interpolate, imgData, args, bitStrideLength, imgArray, decode, softMask, mask, SMALL_IMAGE_DIMENSIONS, imageObj, objId, cacheGlobally;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resources = _ref2.resources, image = _ref2.image, _ref2$isInline = _ref2.isInline, isInline = _ref2$isInline === void 0 ? false : _ref2$isInline, operatorList = _ref2.operatorList, cacheKey = _ref2.cacheKey, localImageCache = _ref2.localImageCache, localColorSpaceCache = _ref2.localColorSpaceCache;
                dict = image.dict;
                imageRef = dict.objId;
                w = dict.get("W", "Width");
                h = dict.get("H", "Height");

                if (!(!(w && (0, _util.isNum)(w)) || !(h && (0, _util.isNum)(h)))) {
                  _context4.next = 8;
                  break;
                }

                (0, _util.warn)("Image dimensions are missing, or not numbers.");
                return _context4.abrupt("return");

              case 8:
                maxImageSize = this.options.maxImageSize;

                if (!(maxImageSize !== -1 && w * h > maxImageSize)) {
                  _context4.next = 12;
                  break;
                }

                (0, _util.warn)("Image exceeded maximum allowed size and was removed.");
                return _context4.abrupt("return");

              case 12:
                if (!dict.has("OC")) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 15;
                return this.parseMarkedContentProps(dict.get("OC"), resources);

              case 15:
                optionalContent = _context4.sent;

              case 16:
                if (optionalContent !== undefined) {
                  operatorList.addOp(_util.OPS.beginMarkedContentProps, ["OC", optionalContent]);
                }

                imageMask = dict.get("IM", "ImageMask") || false;
                interpolate = dict.get("I", "Interpolate");

                if (!imageMask) {
                  _context4.next = 30;
                  break;
                }

                bitStrideLength = w + 7 >> 3;
                imgArray = image.getBytes(bitStrideLength * h, true);
                decode = dict.getArray("D", "Decode");
                imgData = _image.PDFImage.createMask({
                  imgArray: imgArray,
                  width: w,
                  height: h,
                  imageIsFromDecodeStream: image instanceof _decode_stream.DecodeStream,
                  inverseDecode: !!decode && decode[0] > 0,
                  interpolate: interpolate
                });
                imgData.cached = !!cacheKey;
                args = [imgData];
                operatorList.addOp(_util.OPS.paintImageMaskXObject, args);

                if (cacheKey) {
                  localImageCache.set(cacheKey, imageRef, {
                    fn: _util.OPS.paintImageMaskXObject,
                    args: args
                  });
                }

                if (optionalContent !== undefined) {
                  operatorList.addOp(_util.OPS.endMarkedContent, []);
                }

                return _context4.abrupt("return");

              case 30:
                softMask = dict.get("SM", "SMask") || false;
                mask = dict.get("Mask") || false;
                SMALL_IMAGE_DIMENSIONS = 200;

                if (!(isInline && !softMask && !mask && w + h < SMALL_IMAGE_DIMENSIONS)) {
                  _context4.next = 39;
                  break;
                }

                imageObj = new _image.PDFImage({
                  xref: this.xref,
                  res: resources,
                  image: image,
                  isInline: isInline,
                  pdfFunctionFactory: this._pdfFunctionFactory,
                  localColorSpaceCache: localColorSpaceCache
                });
                imgData = imageObj.createImageData(true);
                operatorList.addOp(_util.OPS.paintInlineImageXObject, [imgData]);

                if (optionalContent !== undefined) {
                  operatorList.addOp(_util.OPS.endMarkedContent, []);
                }

                return _context4.abrupt("return");

              case 39:
                objId = "img_".concat(this.idFactory.createObjId()), cacheGlobally = false;

                if (this.parsingType3Font) {
                  objId = "".concat(this.idFactory.getDocId(), "_type3_").concat(objId);
                } else if (imageRef) {
                  cacheGlobally = this.globalImageCache.shouldCache(imageRef, this.pageIndex);

                  if (cacheGlobally) {
                    objId = "".concat(this.idFactory.getDocId(), "_").concat(objId);
                  }
                }

                operatorList.addDependency(objId);
                args = [objId, w, h];

                _image.PDFImage.buildImage({
                  xref: this.xref,
                  res: resources,
                  image: image,
                  isInline: isInline,
                  pdfFunctionFactory: this._pdfFunctionFactory,
                  localColorSpaceCache: localColorSpaceCache
                }).then(function (imageObj) {
                  imgData = imageObj.createImageData(false);

                  if (cacheKey && imageRef && cacheGlobally) {
                    _this.globalImageCache.addByteSize(imageRef, imgData.data.length);
                  }

                  return _this._sendImgData(objId, imgData, cacheGlobally);
                })["catch"](function (reason) {
                  (0, _util.warn)("Unable to decode image \"".concat(objId, "\": \"").concat(reason, "\"."));
                  return _this._sendImgData(objId, null, cacheGlobally);
                });

                operatorList.addOp(_util.OPS.paintImageXObject, args);

                if (cacheKey) {
                  localImageCache.set(cacheKey, imageRef, {
                    fn: _util.OPS.paintImageXObject,
                    args: args
                  });

                  if (imageRef) {
                    (0, _util.assert)(!isInline, "Cannot cache an inline image globally.");
                    this.globalImageCache.addPageIndex(imageRef, this.pageIndex);

                    if (cacheGlobally) {
                      this.globalImageCache.setData(imageRef, {
                        objId: objId,
                        fn: _util.OPS.paintImageXObject,
                        args: args,
                        byteSize: 0
                      });
                    }
                  }
                }

                if (optionalContent !== undefined) {
                  operatorList.addOp(_util.OPS.endMarkedContent, []);
                }

              case 47:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function buildPaintImageXObject(_x10) {
        return _buildPaintImageXObject.apply(this, arguments);
      }

      return buildPaintImageXObject;
    }()
  }, {
    key: "handleSMask",
    value: function handleSMask(smask, resources, operatorList, task, stateManager, localColorSpaceCache) {
      var smaskContent = smask.get("G");
      var smaskOptions = {
        subtype: smask.get("S").name,
        backdrop: smask.get("BC")
      };
      var transferObj = smask.get("TR");

      if ((0, _function.isPDFFunction)(transferObj)) {
        var transferFn = this._pdfFunctionFactory.create(transferObj);

        var transferMap = new Uint8Array(256);
        var tmp = new Float32Array(1);

        for (var i = 0; i < 256; i++) {
          tmp[0] = i / 255;
          transferFn(tmp, 0, tmp, 0);
          transferMap[i] = tmp[0] * 255 | 0;
        }

        smaskOptions.transferMap = transferMap;
      }

      return this.buildFormXObject(resources, smaskContent, smaskOptions, operatorList, task, stateManager.state.clone(), localColorSpaceCache);
    }
  }, {
    key: "handleTransferFunction",
    value: function handleTransferFunction(tr) {
      var transferArray;

      if (Array.isArray(tr)) {
        transferArray = tr;
      } else if ((0, _function.isPDFFunction)(tr)) {
        transferArray = [tr];
      } else {
        return null;
      }

      var transferMaps = [];
      var numFns = 0,
          numEffectfulFns = 0;

      var _iterator4 = _createForOfIteratorHelper(transferArray),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var entry = _step4.value;
          var transferObj = this.xref.fetchIfRef(entry);
          numFns++;

          if ((0, _primitives.isName)(transferObj, "Identity")) {
            transferMaps.push(null);
            continue;
          } else if (!(0, _function.isPDFFunction)(transferObj)) {
            return null;
          }

          var transferFn = this._pdfFunctionFactory.create(transferObj);

          var transferMap = new Uint8Array(256),
              tmp = new Float32Array(1);

          for (var j = 0; j < 256; j++) {
            tmp[0] = j / 255;
            transferFn(tmp, 0, tmp, 0);
            transferMap[j] = tmp[0] * 255 | 0;
          }

          transferMaps.push(transferMap);
          numEffectfulFns++;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (!(numFns === 1 || numFns === 4)) {
        return null;
      }

      if (numEffectfulFns === 0) {
        return null;
      }

      return transferMaps;
    }
  }, {
    key: "handleTilingType",
    value: function handleTilingType(fn, color, resources, pattern, patternDict, operatorList, task, localTilingPatternCache) {
      var _this2 = this;

      var tilingOpList = new _operator_list.OperatorList();

      var patternResources = _primitives.Dict.merge({
        xref: this.xref,
        dictArray: [patternDict.get("Resources"), resources]
      });

      return this.getOperatorList({
        stream: pattern,
        task: task,
        resources: patternResources,
        operatorList: tilingOpList
      }).then(function () {
        var operatorListIR = tilingOpList.getIR();
        var tilingPatternIR = (0, _pattern.getTilingPatternIR)(operatorListIR, patternDict, color);
        operatorList.addDependencies(tilingOpList.dependencies);
        operatorList.addOp(fn, tilingPatternIR);

        if (patternDict.objId) {
          localTilingPatternCache.set(null, patternDict.objId, {
            operatorListIR: operatorListIR,
            dict: patternDict
          });
        }
      })["catch"](function (reason) {
        if (reason instanceof _util.AbortException) {
          return;
        }

        if (_this2.options.ignoreErrors) {
          _this2.handler.send("UnsupportedFeature", {
            featureId: _util.UNSUPPORTED_FEATURES.errorTilingPattern
          });

          (0, _util.warn)("handleTilingType - ignoring pattern: \"".concat(reason, "\"."));
          return;
        }

        throw reason;
      });
    }
  }, {
    key: "handleSetFont",
    value: function handleSetFont(resources, fontArgs, fontRef, operatorList, task, state) {
      var _this3 = this;

      var fallbackFontDict = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var cssFontInfo = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var fontName = fontArgs && fontArgs[0] instanceof _primitives.Name ? fontArgs[0].name : null;
      return this.loadFont(fontName, fontRef, resources, fallbackFontDict, cssFontInfo).then(function (translated) {
        if (!translated.font.isType3Font) {
          return translated;
        }

        return translated.loadType3Data(_this3, resources, task).then(function () {
          operatorList.addDependencies(translated.type3Dependencies);
          return translated;
        })["catch"](function (reason) {
          _this3.handler.send("UnsupportedFeature", {
            featureId: _util.UNSUPPORTED_FEATURES.errorFontLoadType3
          });

          return new TranslatedFont({
            loadedName: "g_font_error",
            font: new _fonts.ErrorFont("Type3 font load error: ".concat(reason)),
            dict: translated.font,
            evaluatorOptions: _this3.options
          });
        });
      }).then(function (translated) {
        state.font = translated.font;
        translated.send(_this3.handler);
        return translated.loadedName;
      });
    }
  }, {
    key: "handleText",
    value: function handleText(chars, state) {
      var font = state.font;
      var glyphs = font.charsToGlyphs(chars);

      if (font.data) {
        var isAddToPathSet = !!(state.textRenderingMode & _util.TextRenderingMode.ADD_TO_PATH_FLAG);

        if (isAddToPathSet || state.fillColorSpace.name === "Pattern" || font.disableFontFace || this.options.disableFontFace) {
          PartialEvaluator.buildFontPaths(font, glyphs, this.handler, this.options);
        }
      }

      return glyphs;
    }
  }, {
    key: "ensureStateFont",
    value: function ensureStateFont(state) {
      if (state.font) {
        return;
      }

      var reason = new _util.FormatError("Missing setFont (Tf) operator before text rendering operator.");

      if (this.options.ignoreErrors) {
        this.handler.send("UnsupportedFeature", {
          featureId: _util.UNSUPPORTED_FEATURES.errorFontState
        });
        (0, _util.warn)("ensureStateFont: \"".concat(reason, "\"."));
        return;
      }

      throw reason;
    }
  }, {
    key: "setGState",
    value: function () {
      var _setGState = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref3) {
        var _this4 = this;

        var resources, gState, operatorList, cacheKey, task, stateManager, localGStateCache, localColorSpaceCache, gStateRef, isSimpleGState, gStateObj, gStateKeys, promise, _loop, i, ii;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                resources = _ref3.resources, gState = _ref3.gState, operatorList = _ref3.operatorList, cacheKey = _ref3.cacheKey, task = _ref3.task, stateManager = _ref3.stateManager, localGStateCache = _ref3.localGStateCache, localColorSpaceCache = _ref3.localColorSpaceCache;
                gStateRef = gState.objId;
                isSimpleGState = true;
                gStateObj = [];
                gStateKeys = gState.getKeys();
                promise = Promise.resolve();

                _loop = function _loop(i, ii) {
                  var key = gStateKeys[i];
                  var value = gState.get(key);

                  switch (key) {
                    case "Type":
                      break;

                    case "LW":
                    case "LC":
                    case "LJ":
                    case "ML":
                    case "D":
                    case "RI":
                    case "FL":
                    case "CA":
                    case "ca":
                      gStateObj.push([key, value]);
                      break;

                    case "Font":
                      isSimpleGState = false;
                      promise = promise.then(function () {
                        return _this4.handleSetFont(resources, null, value[0], operatorList, task, stateManager.state).then(function (loadedName) {
                          operatorList.addDependency(loadedName);
                          gStateObj.push([key, [loadedName, value[1]]]);
                        });
                      });
                      break;

                    case "BM":
                      gStateObj.push([key, normalizeBlendMode(value)]);
                      break;

                    case "SMask":
                      if ((0, _primitives.isName)(value, "None")) {
                        gStateObj.push([key, false]);
                        break;
                      }

                      if ((0, _primitives.isDict)(value)) {
                        isSimpleGState = false;
                        promise = promise.then(function () {
                          return _this4.handleSMask(value, resources, operatorList, task, stateManager, localColorSpaceCache);
                        });
                        gStateObj.push([key, true]);
                      } else {
                        (0, _util.warn)("Unsupported SMask type");
                      }

                      break;

                    case "TR":
                      var transferMaps = _this4.handleTransferFunction(value);

                      gStateObj.push([key, transferMaps]);
                      break;

                    case "OP":
                    case "op":
                    case "OPM":
                    case "BG":
                    case "BG2":
                    case "UCR":
                    case "UCR2":
                    case "TR2":
                    case "HT":
                    case "SM":
                    case "SA":
                    case "AIS":
                    case "TK":
                      (0, _util.info)("graphic state operator " + key);
                      break;

                    default:
                      (0, _util.info)("Unknown graphic state operator " + key);
                      break;
                  }
                };

                for (i = 0, ii = gStateKeys.length; i < ii; i++) {
                  _loop(i, ii);
                }

                return _context5.abrupt("return", promise.then(function () {
                  if (gStateObj.length > 0) {
                    operatorList.addOp(_util.OPS.setGState, [gStateObj]);
                  }

                  if (isSimpleGState) {
                    localGStateCache.set(cacheKey, gStateRef, gStateObj);
                  }
                }));

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function setGState(_x11) {
        return _setGState.apply(this, arguments);
      }

      return setGState;
    }()
  }, {
    key: "loadFont",
    value: function loadFont(fontName, font, resources) {
      var _this5 = this;

      var fallbackFontDict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var cssFontInfo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      var errorFont = /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
          return _regenerator["default"].wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt("return", new TranslatedFont({
                    loadedName: "g_font_error",
                    font: new _fonts.ErrorFont("Font \"".concat(fontName, "\" is not available.")),
                    dict: font,
                    evaluatorOptions: _this5.options
                  }));

                case 1:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function errorFont() {
          return _ref4.apply(this, arguments);
        };
      }();

      var xref = this.xref;
      var fontRef;

      if (font) {
        if (!(0, _primitives.isRef)(font)) {
          throw new _util.FormatError('The "font" object should be a reference.');
        }

        fontRef = font;
      } else {
        var fontRes = resources.get("Font");

        if (fontRes) {
          fontRef = fontRes.getRaw(fontName);
        }
      }

      if (!fontRef) {
        var partialMsg = "Font \"".concat(fontName || font && font.toString(), "\" is not available");

        if (!this.options.ignoreErrors && !this.parsingType3Font) {
          (0, _util.warn)("".concat(partialMsg, "."));
          return errorFont();
        }

        this.handler.send("UnsupportedFeature", {
          featureId: _util.UNSUPPORTED_FEATURES.errorFontMissing
        });
        (0, _util.warn)("".concat(partialMsg, " -- attempting to fallback to a default font."));

        if (fallbackFontDict) {
          fontRef = fallbackFontDict;
        } else {
          fontRef = PartialEvaluator.fallbackFontDict;
        }
      }

      if (this.fontCache.has(fontRef)) {
        return this.fontCache.get(fontRef);
      }

      font = xref.fetchIfRef(fontRef);

      if (!(0, _primitives.isDict)(font)) {
        return errorFont();
      }

      if (font.cacheKey && this.fontCache.has(font.cacheKey)) {
        return this.fontCache.get(font.cacheKey);
      }

      var fontCapability = (0, _util.createPromiseCapability)();
      var preEvaluatedFont;

      try {
        preEvaluatedFont = this.preEvaluateFont(font);
        preEvaluatedFont.cssFontInfo = cssFontInfo;
      } catch (reason) {
        (0, _util.warn)("loadFont - preEvaluateFont failed: \"".concat(reason, "\"."));
        return errorFont();
      }

      var _preEvaluatedFont = preEvaluatedFont,
          descriptor = _preEvaluatedFont.descriptor,
          hash = _preEvaluatedFont.hash;
      var fontRefIsRef = (0, _primitives.isRef)(fontRef);
      var fontID;

      if (fontRefIsRef) {
        fontID = "f".concat(fontRef.toString());
      }

      if (hash && (0, _primitives.isDict)(descriptor)) {
        if (!descriptor.fontAliases) {
          descriptor.fontAliases = Object.create(null);
        }

        var fontAliases = descriptor.fontAliases;

        if (fontAliases[hash]) {
          var aliasFontRef = fontAliases[hash].aliasRef;

          if (fontRefIsRef && aliasFontRef && this.fontCache.has(aliasFontRef)) {
            this.fontCache.putAlias(fontRef, aliasFontRef);
            return this.fontCache.get(fontRef);
          }
        } else {
          fontAliases[hash] = {
            fontID: this.idFactory.createFontId()
          };
        }

        if (fontRefIsRef) {
          fontAliases[hash].aliasRef = fontRef;
        }

        fontID = fontAliases[hash].fontID;
      }

      if (fontRefIsRef) {
        this.fontCache.put(fontRef, fontCapability.promise);
      } else {
        if (!fontID) {
          fontID = this.idFactory.createFontId();
        }

        font.cacheKey = "cacheKey_".concat(fontID);
        this.fontCache.put(font.cacheKey, fontCapability.promise);
      }

      (0, _util.assert)(fontID && fontID.startsWith("f"), 'The "fontID" must be (correctly) defined.');
      font.loadedName = "".concat(this.idFactory.getDocId(), "_").concat(fontID);
      this.translateFont(preEvaluatedFont).then(function (translatedFont) {
        if (translatedFont.fontType !== undefined) {
          xref.stats.addFontType(translatedFont.fontType);
        }

        fontCapability.resolve(new TranslatedFont({
          loadedName: font.loadedName,
          font: translatedFont,
          dict: font,
          evaluatorOptions: _this5.options
        }));
      })["catch"](function (reason) {
        _this5.handler.send("UnsupportedFeature", {
          featureId: _util.UNSUPPORTED_FEATURES.errorFontTranslate
        });

        (0, _util.warn)("loadFont - translateFont failed: \"".concat(reason, "\"."));

        try {
          var fontFile3 = descriptor && descriptor.get("FontFile3");
          var subtype = fontFile3 && fontFile3.get("Subtype");
          var fontType = (0, _fonts_utils.getFontType)(preEvaluatedFont.type, subtype && subtype.name);

          if (fontType !== undefined) {
            xref.stats.addFontType(fontType);
          }
        } catch (ex) {}

        fontCapability.resolve(new TranslatedFont({
          loadedName: font.loadedName,
          font: new _fonts.ErrorFont(reason instanceof Error ? reason.message : reason),
          dict: font,
          evaluatorOptions: _this5.options
        }));
      });
      return fontCapability.promise;
    }
  }, {
    key: "buildPath",
    value: function buildPath(operatorList, fn, args) {
      var parsingText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var lastIndex = operatorList.length - 1;

      if (!args) {
        args = [];
      }

      if (lastIndex < 0 || operatorList.fnArray[lastIndex] !== _util.OPS.constructPath) {
        if (parsingText) {
          (0, _util.warn)("Encountered path operator \"".concat(fn, "\" inside of a text object."));
          operatorList.addOp(_util.OPS.save, null);
        }

        operatorList.addOp(_util.OPS.constructPath, [[fn], args]);

        if (parsingText) {
          operatorList.addOp(_util.OPS.restore, null);
        }
      } else {
        var opArgs = operatorList.argsArray[lastIndex];
        opArgs[0].push(fn);
        Array.prototype.push.apply(opArgs[1], args);
      }
    }
  }, {
    key: "parseColorSpace",
    value: function parseColorSpace(_ref5) {
      var _this6 = this;

      var cs = _ref5.cs,
          resources = _ref5.resources,
          localColorSpaceCache = _ref5.localColorSpaceCache;
      return _colorspace.ColorSpace.parseAsync({
        cs: cs,
        xref: this.xref,
        resources: resources,
        pdfFunctionFactory: this._pdfFunctionFactory,
        localColorSpaceCache: localColorSpaceCache
      })["catch"](function (reason) {
        if (reason instanceof _util.AbortException) {
          return null;
        }

        if (_this6.options.ignoreErrors) {
          _this6.handler.send("UnsupportedFeature", {
            featureId: _util.UNSUPPORTED_FEATURES.errorColorSpace
          });

          (0, _util.warn)("parseColorSpace - ignoring ColorSpace: \"".concat(reason, "\"."));
          return null;
        }

        throw reason;
      });
    }
  }, {
    key: "parseShading",
    value: function parseShading(_ref6) {
      var shading = _ref6.shading,
          resources = _ref6.resources,
          localColorSpaceCache = _ref6.localColorSpaceCache,
          localShadingPatternCache = _ref6.localShadingPatternCache;
      var id = localShadingPatternCache.get(shading);

      if (!id) {
        var shadingFill = _pattern.Pattern.parseShading(shading, this.xref, resources, this.handler, this._pdfFunctionFactory, localColorSpaceCache);

        var patternIR = shadingFill.getIR();
        id = "pattern_".concat(this.idFactory.createObjId());
        localShadingPatternCache.set(shading, id);
        this.handler.send("obj", [id, this.pageIndex, "Pattern", patternIR]);
      }

      return id;
    }
  }, {
    key: "handleColorN",
    value: function handleColorN(operatorList, fn, args, cs, patterns, resources, task, localColorSpaceCache, localTilingPatternCache, localShadingPatternCache) {
      var patternName = args.pop();

      if (patternName instanceof _primitives.Name) {
        var rawPattern = patterns.getRaw(patternName.name);
        var localTilingPattern = rawPattern instanceof _primitives.Ref && localTilingPatternCache.getByRef(rawPattern);

        if (localTilingPattern) {
          try {
            var color = cs.base ? cs.base.getRgb(args, 0) : null;
            var tilingPatternIR = (0, _pattern.getTilingPatternIR)(localTilingPattern.operatorListIR, localTilingPattern.dict, color);
            operatorList.addOp(fn, tilingPatternIR);
            return undefined;
          } catch (ex) {}
        }

        var pattern = this.xref.fetchIfRef(rawPattern);

        if (pattern) {
          var dict = (0, _primitives.isStream)(pattern) ? pattern.dict : pattern;
          var typeNum = dict.get("PatternType");

          if (typeNum === PatternType.TILING) {
            var _color = cs.base ? cs.base.getRgb(args, 0) : null;

            return this.handleTilingType(fn, _color, resources, pattern, dict, operatorList, task, localTilingPatternCache);
          } else if (typeNum === PatternType.SHADING) {
            var shading = dict.get("Shading");
            var matrix = dict.getArray("Matrix");
            var objId = this.parseShading({
              shading: shading,
              resources: resources,
              localColorSpaceCache: localColorSpaceCache,
              localShadingPatternCache: localShadingPatternCache
            });
            operatorList.addOp(fn, ["Shading", objId, matrix]);
            return undefined;
          }

          throw new _util.FormatError("Unknown PatternType: ".concat(typeNum));
        }
      }

      throw new _util.FormatError("Unknown PatternName: ".concat(patternName));
    }
  }, {
    key: "_parseVisibilityExpression",
    value: function _parseVisibilityExpression(array, nestingCounter, currentResult) {
      var MAX_NESTING = 10;

      if (++nestingCounter > MAX_NESTING) {
        (0, _util.warn)("Visibility expression is too deeply nested");
        return;
      }

      var length = array.length;
      var operator = this.xref.fetchIfRef(array[0]);

      if (length < 2 || !(0, _primitives.isName)(operator)) {
        (0, _util.warn)("Invalid visibility expression");
        return;
      }

      switch (operator.name) {
        case "And":
        case "Or":
        case "Not":
          currentResult.push(operator.name);
          break;

        default:
          (0, _util.warn)("Invalid operator ".concat(operator.name, " in visibility expression"));
          return;
      }

      for (var i = 1; i < length; i++) {
        var raw = array[i];
        var object = this.xref.fetchIfRef(raw);

        if (Array.isArray(object)) {
          var nestedResult = [];
          currentResult.push(nestedResult);

          this._parseVisibilityExpression(object, nestingCounter, nestedResult);
        } else if ((0, _primitives.isRef)(raw)) {
          currentResult.push(raw.toString());
        }
      }
    }
  }, {
    key: "parseMarkedContentProps",
    value: function () {
      var _parseMarkedContentProps = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7(contentProperties, resources) {
        var optionalContent, properties, optionalContentType, expression, result, optionalContentGroups, groupIds, _iterator5, _step5, ocg;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(0, _primitives.isName)(contentProperties)) {
                  _context7.next = 5;
                  break;
                }

                properties = resources.get("Properties");
                optionalContent = properties.get(contentProperties.name);
                _context7.next = 10;
                break;

              case 5:
                if (!(0, _primitives.isDict)(contentProperties)) {
                  _context7.next = 9;
                  break;
                }

                optionalContent = contentProperties;
                _context7.next = 10;
                break;

              case 9:
                throw new _util.FormatError("Optional content properties malformed.");

              case 10:
                optionalContentType = optionalContent.get("Type").name;

                if (!(optionalContentType === "OCG")) {
                  _context7.next = 15;
                  break;
                }

                return _context7.abrupt("return", {
                  type: optionalContentType,
                  id: optionalContent.objId
                });

              case 15:
                if (!(optionalContentType === "OCMD")) {
                  _context7.next = 31;
                  break;
                }

                expression = optionalContent.get("VE");

                if (!Array.isArray(expression)) {
                  _context7.next = 22;
                  break;
                }

                result = [];

                this._parseVisibilityExpression(expression, 0, result);

                if (!(result.length > 0)) {
                  _context7.next = 22;
                  break;
                }

                return _context7.abrupt("return", {
                  type: "OCMD",
                  expression: result
                });

              case 22:
                optionalContentGroups = optionalContent.get("OCGs");

                if (!(Array.isArray(optionalContentGroups) || (0, _primitives.isDict)(optionalContentGroups))) {
                  _context7.next = 29;
                  break;
                }

                groupIds = [];

                if (Array.isArray(optionalContentGroups)) {
                  _iterator5 = _createForOfIteratorHelper(optionalContentGroups);

                  try {
                    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                      ocg = _step5.value;
                      groupIds.push(ocg.toString());
                    }
                  } catch (err) {
                    _iterator5.e(err);
                  } finally {
                    _iterator5.f();
                  }
                } else {
                  groupIds.push(optionalContentGroups.objId);
                }

                return _context7.abrupt("return", {
                  type: optionalContentType,
                  ids: groupIds,
                  policy: (0, _primitives.isName)(optionalContent.get("P")) ? optionalContent.get("P").name : null,
                  expression: null
                });

              case 29:
                if (!(0, _primitives.isRef)(optionalContentGroups)) {
                  _context7.next = 31;
                  break;
                }

                return _context7.abrupt("return", {
                  type: optionalContentType,
                  id: optionalContentGroups.toString()
                });

              case 31:
                return _context7.abrupt("return", null);

              case 32:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function parseMarkedContentProps(_x12, _x13) {
        return _parseMarkedContentProps.apply(this, arguments);
      }

      return parseMarkedContentProps;
    }()
  }, {
    key: "getOperatorList",
    value: function getOperatorList(_ref7) {
      var _this7 = this;

      var stream = _ref7.stream,
          task = _ref7.task,
          resources = _ref7.resources,
          operatorList = _ref7.operatorList,
          _ref7$initialState = _ref7.initialState,
          initialState = _ref7$initialState === void 0 ? null : _ref7$initialState,
          _ref7$fallbackFontDic = _ref7.fallbackFontDict,
          fallbackFontDict = _ref7$fallbackFontDic === void 0 ? null : _ref7$fallbackFontDic;
      resources = resources || _primitives.Dict.empty;
      initialState = initialState || new EvalState();

      if (!operatorList) {
        throw new Error('getOperatorList: missing "operatorList" parameter');
      }

      var self = this;
      var xref = this.xref;
      var parsingText = false;
      var localImageCache = new _image_utils.LocalImageCache();
      var localColorSpaceCache = new _image_utils.LocalColorSpaceCache();
      var localGStateCache = new _image_utils.LocalGStateCache();
      var localTilingPatternCache = new _image_utils.LocalTilingPatternCache();
      var localShadingPatternCache = new Map();

      var xobjs = resources.get("XObject") || _primitives.Dict.empty;

      var patterns = resources.get("Pattern") || _primitives.Dict.empty;

      var stateManager = new StateManager(initialState);
      var preprocessor = new EvaluatorPreprocessor(stream, xref, stateManager);
      var timeSlotManager = new TimeSlotManager();

      function closePendingRestoreOPS(argument) {
        for (var i = 0, ii = preprocessor.savedStatesDepth; i < ii; i++) {
          operatorList.addOp(_util.OPS.restore, []);
        }
      }

      return new Promise(function promiseBody(resolve, reject) {
        var next = function next(promise) {
          Promise.all([promise, operatorList.ready]).then(function () {
            try {
              promiseBody(resolve, reject);
            } catch (ex) {
              reject(ex);
            }
          }, reject);
        };

        task.ensureNotTerminated();
        timeSlotManager.reset();
        var operation = {};
        var stop, i, ii, cs, name, isValidName;

        while (!(stop = timeSlotManager.check())) {
          operation.args = null;

          if (!preprocessor.read(operation)) {
            break;
          }

          var args = operation.args;
          var fn = operation.fn;

          switch (fn | 0) {
            case _util.OPS.paintXObject:
              isValidName = args[0] instanceof _primitives.Name;
              name = args[0].name;

              if (isValidName) {
                var localImage = localImageCache.getByName(name);

                if (localImage) {
                  operatorList.addOp(localImage.fn, localImage.args);
                  args = null;
                  continue;
                }
              }

              next(new Promise(function (resolveXObject, rejectXObject) {
                if (!isValidName) {
                  throw new _util.FormatError("XObject must be referred to by name.");
                }

                var xobj = xobjs.getRaw(name);

                if (xobj instanceof _primitives.Ref) {
                  var _localImage = localImageCache.getByRef(xobj);

                  if (_localImage) {
                    operatorList.addOp(_localImage.fn, _localImage.args);
                    resolveXObject();
                    return;
                  }

                  var globalImage = self.globalImageCache.getData(xobj, self.pageIndex);

                  if (globalImage) {
                    operatorList.addDependency(globalImage.objId);
                    operatorList.addOp(globalImage.fn, globalImage.args);
                    resolveXObject();
                    return;
                  }

                  xobj = xref.fetch(xobj);
                }

                if (!(0, _primitives.isStream)(xobj)) {
                  throw new _util.FormatError("XObject should be a stream");
                }

                var type = xobj.dict.get("Subtype");

                if (!(0, _primitives.isName)(type)) {
                  throw new _util.FormatError("XObject should have a Name subtype");
                }

                if (type.name === "Form") {
                  stateManager.save();
                  self.buildFormXObject(resources, xobj, null, operatorList, task, stateManager.state.clone(), localColorSpaceCache).then(function () {
                    stateManager.restore();
                    resolveXObject();
                  }, rejectXObject);
                  return;
                } else if (type.name === "Image") {
                  self.buildPaintImageXObject({
                    resources: resources,
                    image: xobj,
                    operatorList: operatorList,
                    cacheKey: name,
                    localImageCache: localImageCache,
                    localColorSpaceCache: localColorSpaceCache
                  }).then(resolveXObject, rejectXObject);
                  return;
                } else if (type.name === "PS") {
                  (0, _util.info)("Ignored XObject subtype PS");
                } else {
                  throw new _util.FormatError("Unhandled XObject subtype ".concat(type.name));
                }

                resolveXObject();
              })["catch"](function (reason) {
                if (reason instanceof _util.AbortException) {
                  return;
                }

                if (self.options.ignoreErrors) {
                  self.handler.send("UnsupportedFeature", {
                    featureId: _util.UNSUPPORTED_FEATURES.errorXObject
                  });
                  (0, _util.warn)("getOperatorList - ignoring XObject: \"".concat(reason, "\"."));
                  return;
                }

                throw reason;
              }));
              return;

            case _util.OPS.setFont:
              var fontSize = args[1];
              next(self.handleSetFont(resources, args, null, operatorList, task, stateManager.state, fallbackFontDict).then(function (loadedName) {
                operatorList.addDependency(loadedName);
                operatorList.addOp(_util.OPS.setFont, [loadedName, fontSize]);
              }));
              return;

            case _util.OPS.beginText:
              parsingText = true;
              break;

            case _util.OPS.endText:
              parsingText = false;
              break;

            case _util.OPS.endInlineImage:
              var cacheKey = args[0].cacheKey;

              if (cacheKey) {
                var _localImage2 = localImageCache.getByName(cacheKey);

                if (_localImage2) {
                  operatorList.addOp(_localImage2.fn, _localImage2.args);
                  args = null;
                  continue;
                }
              }

              next(self.buildPaintImageXObject({
                resources: resources,
                image: args[0],
                isInline: true,
                operatorList: operatorList,
                cacheKey: cacheKey,
                localImageCache: localImageCache,
                localColorSpaceCache: localColorSpaceCache
              }));
              return;

            case _util.OPS.showText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              args[0] = self.handleText(args[0], stateManager.state);
              break;

            case _util.OPS.showSpacedText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              var arr = args[0];
              var combinedGlyphs = [];
              var arrLength = arr.length;
              var state = stateManager.state;

              for (i = 0; i < arrLength; ++i) {
                var arrItem = arr[i];

                if ((0, _util.isString)(arrItem)) {
                  Array.prototype.push.apply(combinedGlyphs, self.handleText(arrItem, state));
                } else if ((0, _util.isNum)(arrItem)) {
                  combinedGlyphs.push(arrItem);
                }
              }

              args[0] = combinedGlyphs;
              fn = _util.OPS.showText;
              break;

            case _util.OPS.nextLineShowText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              operatorList.addOp(_util.OPS.nextLine);
              args[0] = self.handleText(args[0], stateManager.state);
              fn = _util.OPS.showText;
              break;

            case _util.OPS.nextLineSetSpacingShowText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              operatorList.addOp(_util.OPS.nextLine);
              operatorList.addOp(_util.OPS.setWordSpacing, [args.shift()]);
              operatorList.addOp(_util.OPS.setCharSpacing, [args.shift()]);
              args[0] = self.handleText(args[0], stateManager.state);
              fn = _util.OPS.showText;
              break;

            case _util.OPS.setTextRenderingMode:
              stateManager.state.textRenderingMode = args[0];
              break;

            case _util.OPS.setFillColorSpace:
              {
                var cachedColorSpace = _colorspace.ColorSpace.getCached(args[0], xref, localColorSpaceCache);

                if (cachedColorSpace) {
                  stateManager.state.fillColorSpace = cachedColorSpace;
                  continue;
                }

                next(self.parseColorSpace({
                  cs: args[0],
                  resources: resources,
                  localColorSpaceCache: localColorSpaceCache
                }).then(function (colorSpace) {
                  if (colorSpace) {
                    stateManager.state.fillColorSpace = colorSpace;
                  }
                }));
                return;
              }

            case _util.OPS.setStrokeColorSpace:
              {
                var _cachedColorSpace = _colorspace.ColorSpace.getCached(args[0], xref, localColorSpaceCache);

                if (_cachedColorSpace) {
                  stateManager.state.strokeColorSpace = _cachedColorSpace;
                  continue;
                }

                next(self.parseColorSpace({
                  cs: args[0],
                  resources: resources,
                  localColorSpaceCache: localColorSpaceCache
                }).then(function (colorSpace) {
                  if (colorSpace) {
                    stateManager.state.strokeColorSpace = colorSpace;
                  }
                }));
                return;
              }

            case _util.OPS.setFillColor:
              cs = stateManager.state.fillColorSpace;
              args = cs.getRgb(args, 0);
              fn = _util.OPS.setFillRGBColor;
              break;

            case _util.OPS.setStrokeColor:
              cs = stateManager.state.strokeColorSpace;
              args = cs.getRgb(args, 0);
              fn = _util.OPS.setStrokeRGBColor;
              break;

            case _util.OPS.setFillGray:
              stateManager.state.fillColorSpace = _colorspace.ColorSpace.singletons.gray;
              args = _colorspace.ColorSpace.singletons.gray.getRgb(args, 0);
              fn = _util.OPS.setFillRGBColor;
              break;

            case _util.OPS.setStrokeGray:
              stateManager.state.strokeColorSpace = _colorspace.ColorSpace.singletons.gray;
              args = _colorspace.ColorSpace.singletons.gray.getRgb(args, 0);
              fn = _util.OPS.setStrokeRGBColor;
              break;

            case _util.OPS.setFillCMYKColor:
              stateManager.state.fillColorSpace = _colorspace.ColorSpace.singletons.cmyk;
              args = _colorspace.ColorSpace.singletons.cmyk.getRgb(args, 0);
              fn = _util.OPS.setFillRGBColor;
              break;

            case _util.OPS.setStrokeCMYKColor:
              stateManager.state.strokeColorSpace = _colorspace.ColorSpace.singletons.cmyk;
              args = _colorspace.ColorSpace.singletons.cmyk.getRgb(args, 0);
              fn = _util.OPS.setStrokeRGBColor;
              break;

            case _util.OPS.setFillRGBColor:
              stateManager.state.fillColorSpace = _colorspace.ColorSpace.singletons.rgb;
              args = _colorspace.ColorSpace.singletons.rgb.getRgb(args, 0);
              break;

            case _util.OPS.setStrokeRGBColor:
              stateManager.state.strokeColorSpace = _colorspace.ColorSpace.singletons.rgb;
              args = _colorspace.ColorSpace.singletons.rgb.getRgb(args, 0);
              break;

            case _util.OPS.setFillColorN:
              cs = stateManager.state.fillColorSpace;

              if (cs.name === "Pattern") {
                next(self.handleColorN(operatorList, _util.OPS.setFillColorN, args, cs, patterns, resources, task, localColorSpaceCache, localTilingPatternCache, localShadingPatternCache));
                return;
              }

              args = cs.getRgb(args, 0);
              fn = _util.OPS.setFillRGBColor;
              break;

            case _util.OPS.setStrokeColorN:
              cs = stateManager.state.strokeColorSpace;

              if (cs.name === "Pattern") {
                next(self.handleColorN(operatorList, _util.OPS.setStrokeColorN, args, cs, patterns, resources, task, localColorSpaceCache, localTilingPatternCache, localShadingPatternCache));
                return;
              }

              args = cs.getRgb(args, 0);
              fn = _util.OPS.setStrokeRGBColor;
              break;

            case _util.OPS.shadingFill:
              var shadingRes = resources.get("Shading");

              if (!shadingRes) {
                throw new _util.FormatError("No shading resource found");
              }

              var shading = shadingRes.get(args[0].name);

              if (!shading) {
                throw new _util.FormatError("No shading object found");
              }

              var patternId = self.parseShading({
                shading: shading,
                resources: resources,
                localColorSpaceCache: localColorSpaceCache,
                localShadingPatternCache: localShadingPatternCache
              });
              args = [patternId];
              fn = _util.OPS.shadingFill;
              break;

            case _util.OPS.setGState:
              isValidName = args[0] instanceof _primitives.Name;
              name = args[0].name;

              if (isValidName) {
                var localGStateObj = localGStateCache.getByName(name);

                if (localGStateObj) {
                  if (localGStateObj.length > 0) {
                    operatorList.addOp(_util.OPS.setGState, [localGStateObj]);
                  }

                  args = null;
                  continue;
                }
              }

              next(new Promise(function (resolveGState, rejectGState) {
                if (!isValidName) {
                  throw new _util.FormatError("GState must be referred to by name.");
                }

                var extGState = resources.get("ExtGState");

                if (!(extGState instanceof _primitives.Dict)) {
                  throw new _util.FormatError("ExtGState should be a dictionary.");
                }

                var gState = extGState.get(name);

                if (!(gState instanceof _primitives.Dict)) {
                  throw new _util.FormatError("GState should be a dictionary.");
                }

                self.setGState({
                  resources: resources,
                  gState: gState,
                  operatorList: operatorList,
                  cacheKey: name,
                  task: task,
                  stateManager: stateManager,
                  localGStateCache: localGStateCache,
                  localColorSpaceCache: localColorSpaceCache
                }).then(resolveGState, rejectGState);
              })["catch"](function (reason) {
                if (reason instanceof _util.AbortException) {
                  return;
                }

                if (self.options.ignoreErrors) {
                  self.handler.send("UnsupportedFeature", {
                    featureId: _util.UNSUPPORTED_FEATURES.errorExtGState
                  });
                  (0, _util.warn)("getOperatorList - ignoring ExtGState: \"".concat(reason, "\"."));
                  return;
                }

                throw reason;
              }));
              return;

            case _util.OPS.moveTo:
            case _util.OPS.lineTo:
            case _util.OPS.curveTo:
            case _util.OPS.curveTo2:
            case _util.OPS.curveTo3:
            case _util.OPS.closePath:
            case _util.OPS.rectangle:
              self.buildPath(operatorList, fn, args, parsingText);
              continue;

            case _util.OPS.markPoint:
            case _util.OPS.markPointProps:
            case _util.OPS.beginCompat:
            case _util.OPS.endCompat:
              continue;

            case _util.OPS.beginMarkedContentProps:
              if (!(0, _primitives.isName)(args[0])) {
                (0, _util.warn)("Expected name for beginMarkedContentProps arg0=".concat(args[0]));
                continue;
              }

              if (args[0].name === "OC") {
                next(self.parseMarkedContentProps(args[1], resources).then(function (data) {
                  operatorList.addOp(_util.OPS.beginMarkedContentProps, ["OC", data]);
                })["catch"](function (reason) {
                  if (reason instanceof _util.AbortException) {
                    return;
                  }

                  if (self.options.ignoreErrors) {
                    self.handler.send("UnsupportedFeature", {
                      featureId: _util.UNSUPPORTED_FEATURES.errorMarkedContent
                    });
                    (0, _util.warn)("getOperatorList - ignoring beginMarkedContentProps: \"".concat(reason, "\"."));
                    return;
                  }

                  throw reason;
                }));
                return;
              }

              args = [args[0].name, args[1] instanceof _primitives.Dict ? args[1].get("MCID") : null];
              break;

            case _util.OPS.beginMarkedContent:
            case _util.OPS.endMarkedContent:
            default:
              if (args !== null) {
                for (i = 0, ii = args.length; i < ii; i++) {
                  if (args[i] instanceof _primitives.Dict) {
                    break;
                  }
                }

                if (i < ii) {
                  (0, _util.warn)("getOperatorList - ignoring operator: " + fn);
                  continue;
                }
              }

          }

          operatorList.addOp(fn, args);
        }

        if (stop) {
          next(deferred);
          return;
        }

        closePendingRestoreOPS();
        resolve();
      })["catch"](function (reason) {
        if (reason instanceof _util.AbortException) {
          return;
        }

        if (_this7.options.ignoreErrors) {
          _this7.handler.send("UnsupportedFeature", {
            featureId: _util.UNSUPPORTED_FEATURES.errorOperatorList
          });

          (0, _util.warn)("getOperatorList - ignoring errors during \"".concat(task.name, "\" ") + "task: \"".concat(reason, "\"."));
          closePendingRestoreOPS();
          return;
        }

        throw reason;
      });
    }
  }, {
    key: "getTextContent",
    value: function getTextContent(_ref8) {
      var _this8 = this;

      var stream = _ref8.stream,
          task = _ref8.task,
          resources = _ref8.resources,
          _ref8$stateManager = _ref8.stateManager,
          stateManager = _ref8$stateManager === void 0 ? null : _ref8$stateManager,
          _ref8$normalizeWhites = _ref8.normalizeWhitespace,
          normalizeWhitespace = _ref8$normalizeWhites === void 0 ? false : _ref8$normalizeWhites,
          _ref8$combineTextItem = _ref8.combineTextItems,
          combineTextItems = _ref8$combineTextItem === void 0 ? false : _ref8$combineTextItem,
          _ref8$includeMarkedCo = _ref8.includeMarkedContent,
          includeMarkedContent = _ref8$includeMarkedCo === void 0 ? false : _ref8$includeMarkedCo,
          sink = _ref8.sink,
          _ref8$seenStyles = _ref8.seenStyles,
          seenStyles = _ref8$seenStyles === void 0 ? new Set() : _ref8$seenStyles;
      resources = resources || _primitives.Dict.empty;
      stateManager = stateManager || new StateManager(new TextState());
      var WhitespaceRegexp = /\s/g;
      var DiacriticRegExp = new RegExp("^\\p{Mn}$", "u");
      var NormalizedUnicodes = (0, _unicode.getNormalizedUnicodes)();
      var textContent = {
        items: [],
        styles: Object.create(null)
      };
      var textContentItem = {
        initialized: false,
        str: [],
        totalWidth: 0,
        totalHeight: 0,
        width: 0,
        height: 0,
        vertical: false,
        prevTransform: null,
        textAdvanceScale: 0,
        spaceInFlowMin: 0,
        spaceInFlowMax: 0,
        trackingSpaceMin: Infinity,
        negativeSpaceMax: -Infinity,
        transform: null,
        fontName: null,
        hasEOL: false
      };
      var TRACKING_SPACE_FACTOR = 0.1;
      var NEGATIVE_SPACE_FACTOR = -0.2;
      var SPACE_IN_FLOW_MIN_FACTOR = 0.1;
      var SPACE_IN_FLOW_MAX_FACTOR = 0.6;
      var self = this;
      var xref = this.xref;
      var showSpacedTextBuffer = [];
      var xobjs = null;
      var emptyXObjectCache = new _image_utils.LocalImageCache();
      var emptyGStateCache = new _image_utils.LocalGStateCache();
      var preprocessor = new EvaluatorPreprocessor(stream, xref, stateManager);
      var textState;

      function getCurrentTextTransform() {
        var font = textState.font;
        var tsm = [textState.fontSize * textState.textHScale, 0, 0, textState.fontSize, 0, textState.textRise];

        if (font.isType3Font && (textState.fontSize <= 1 || font.isCharBBox) && !(0, _util.isArrayEqual)(textState.fontMatrix, _util.FONT_IDENTITY_MATRIX)) {
          var glyphHeight = font.bbox[3] - font.bbox[1];

          if (glyphHeight > 0) {
            tsm[3] *= glyphHeight * textState.fontMatrix[3];
          }
        }

        return _util.Util.transform(textState.ctm, _util.Util.transform(textState.textMatrix, tsm));
      }

      function ensureTextContentItem() {
        if (textContentItem.initialized) {
          return textContentItem;
        }

        var font = textState.font,
            loadedName = font.loadedName;

        if (!seenStyles.has(loadedName)) {
          seenStyles.add(loadedName);
          textContent.styles[loadedName] = {
            fontFamily: font.fallbackName,
            ascent: font.ascent,
            descent: font.descent,
            vertical: font.vertical
          };
        }

        textContentItem.fontName = loadedName;
        var trm = textContentItem.transform = getCurrentTextTransform();

        if (!font.vertical) {
          textContentItem.width = textContentItem.totalWidth = 0;
          textContentItem.height = textContentItem.totalHeight = Math.hypot(trm[2], trm[3]);
          textContentItem.vertical = false;
        } else {
          textContentItem.width = textContentItem.totalWidth = Math.hypot(trm[0], trm[1]);
          textContentItem.height = textContentItem.totalHeight = 0;
          textContentItem.vertical = true;
        }

        var scaleLineX = Math.hypot(textState.textLineMatrix[0], textState.textLineMatrix[1]);
        var scaleCtmX = Math.hypot(textState.ctm[0], textState.ctm[1]);
        textContentItem.textAdvanceScale = scaleCtmX * scaleLineX;
        textContentItem.trackingSpaceMin = textState.fontSize * TRACKING_SPACE_FACTOR;
        textContentItem.negativeSpaceMax = textState.fontSize * NEGATIVE_SPACE_FACTOR;
        textContentItem.spaceInFlowMin = textState.fontSize * SPACE_IN_FLOW_MIN_FACTOR;
        textContentItem.spaceInFlowMax = textState.fontSize * SPACE_IN_FLOW_MAX_FACTOR;
        textContentItem.hasEOL = false;
        textContentItem.initialized = true;
        return textContentItem;
      }

      function updateAdvanceScale() {
        if (!textContentItem.initialized) {
          return;
        }

        var scaleLineX = Math.hypot(textState.textLineMatrix[0], textState.textLineMatrix[1]);
        var scaleCtmX = Math.hypot(textState.ctm[0], textState.ctm[1]);
        var scaleFactor = scaleCtmX * scaleLineX;

        if (scaleFactor === textContentItem.textAdvanceScale) {
          return;
        }

        if (!textContentItem.vertical) {
          textContentItem.totalWidth += textContentItem.width * textContentItem.textAdvanceScale;
          textContentItem.width = 0;
        } else {
          textContentItem.totalHeight += textContentItem.height * textContentItem.textAdvanceScale;
          textContentItem.height = 0;
        }

        textContentItem.textAdvanceScale = scaleFactor;
      }

      function replaceWhitespace(str) {
        var ii = str.length;
        var i = 0,
            code;

        while (i < ii && (code = str.charCodeAt(i)) >= 0x20 && code <= 0x7f) {
          i++;
        }

        return i < ii ? str.replace(WhitespaceRegexp, " ") : str;
      }

      function runBidiTransform(textChunk) {
        var text = textChunk.str.join("");
        var bidiResult = (0, _bidi.bidi)(text, -1, textChunk.vertical);
        var str = normalizeWhitespace ? replaceWhitespace(bidiResult.str) : bidiResult.str;
        return {
          str: str,
          dir: bidiResult.dir,
          width: textChunk.totalWidth,
          height: textChunk.totalHeight,
          transform: textChunk.transform,
          fontName: textChunk.fontName,
          hasEOL: textChunk.hasEOL
        };
      }

      function handleSetFont(fontName, fontRef) {
        return self.loadFont(fontName, fontRef, resources).then(function (translated) {
          if (!translated.font.isType3Font) {
            return translated;
          }

          return translated.loadType3Data(self, resources, task)["catch"](function () {}).then(function () {
            return translated;
          });
        }).then(function (translated) {
          textState.font = translated.font;
          textState.fontMatrix = translated.font.fontMatrix || _util.FONT_IDENTITY_MATRIX;
        });
      }

      function compareWithLastPosition() {
        if (!combineTextItems || !textState.font || !textContentItem.prevTransform) {
          return;
        }

        var currentTransform = getCurrentTextTransform();
        var posX = currentTransform[4];
        var posY = currentTransform[5];
        var lastPosX = textContentItem.prevTransform[4];
        var lastPosY = textContentItem.prevTransform[5];

        if (lastPosX === posX && lastPosY === posY) {
          return;
        }

        var rotate = 0;

        if (currentTransform[0] && currentTransform[1] === 0 && currentTransform[2] === 0) {
          rotate = currentTransform[0] > 0 ? 0 : 180;
        } else if (currentTransform[1] && currentTransform[0] === 0 && currentTransform[3] === 0) {
          rotate += currentTransform[1] > 0 ? 90 : 270;
        }

        if (rotate !== 0) {
          switch (rotate) {
            case 90:
              var _ref9 = [posY, posX];
              posX = _ref9[0];
              posY = _ref9[1];
              var _ref10 = [lastPosY, lastPosX];
              lastPosX = _ref10[0];
              lastPosY = _ref10[1];
              break;

            case 180:
              var _ref11 = [-posX, -posY, -lastPosX, -lastPosY];
              posX = _ref11[0];
              posY = _ref11[1];
              lastPosX = _ref11[2];
              lastPosY = _ref11[3];
              break;

            case 270:
              var _ref12 = [-posY, -posX];
              posX = _ref12[0];
              posY = _ref12[1];
              var _ref13 = [-lastPosY, -lastPosX];
              lastPosX = _ref13[0];
              lastPosY = _ref13[1];
              break;
          }
        }

        if (textState.font.vertical) {
          var _advanceY = (lastPosY - posY) / textContentItem.textAdvanceScale;

          var _advanceX = posX - lastPosX;

          if (_advanceY < textContentItem.negativeSpaceMax) {
            if (Math.abs(_advanceX) > 0.5 * textContentItem.width) {
              appendEOL();
              return;
            }

            flushTextContentItem();
            return;
          }

          if (Math.abs(_advanceX) > textContentItem.height) {
            appendEOL();
            return;
          }

          if (_advanceY <= textContentItem.trackingSpaceMin) {
            textContentItem.height += _advanceY;
          } else if (!addFakeSpaces(_advanceY, textContentItem.prevTransform)) {
            if (textContentItem.str.length === 0) {
              textContent.items.push({
                str: " ",
                dir: "ltr",
                width: 0,
                height: _advanceY,
                transform: textContentItem.prevTransform,
                fontName: textContentItem.fontName,
                hasEOL: false
              });
            } else {
              textContentItem.height += _advanceY;
            }
          }

          return;
        }

        var advanceX = (posX - lastPosX) / textContentItem.textAdvanceScale;
        var advanceY = posY - lastPosY;

        if (advanceX < textContentItem.negativeSpaceMax) {
          if (Math.abs(advanceY) > 0.5 * textContentItem.height) {
            appendEOL();
            return;
          }

          flushTextContentItem();
          return;
        }

        if (Math.abs(advanceY) > textContentItem.height) {
          appendEOL();
          return;
        }

        if (advanceX <= textContentItem.trackingSpaceMin) {
          textContentItem.width += advanceX;
        } else if (!addFakeSpaces(advanceX, textContentItem.prevTransform)) {
          if (textContentItem.str.length === 0) {
            textContent.items.push({
              str: " ",
              dir: "ltr",
              width: advanceX,
              height: 0,
              transform: textContentItem.prevTransform,
              fontName: textContentItem.fontName,
              hasEOL: false
            });
          } else {
            textContentItem.width += advanceX;
          }
        }
      }

      function buildTextContentItem(_ref14) {
        var chars = _ref14.chars,
            extraSpacing = _ref14.extraSpacing;
        var font = textState.font;

        if (!chars) {
          var charSpacing = textState.charSpacing + extraSpacing;

          if (charSpacing) {
            if (!font.vertical) {
              textState.translateTextMatrix(charSpacing * textState.textHScale, 0);
            } else {
              textState.translateTextMatrix(0, -charSpacing);
            }
          }

          return;
        }

        var glyphs = font.charsToGlyphs(chars);
        var scale = textState.fontMatrix[0] * textState.fontSize;

        for (var i = 0, ii = glyphs.length; i < ii; i++) {
          var glyph = glyphs[i];

          var _charSpacing = textState.charSpacing + (i + 1 === ii ? extraSpacing : 0);

          var glyphWidth = glyph.width;

          if (font.vertical) {
            glyphWidth = glyph.vmetric ? glyph.vmetric[0] : -glyphWidth;
          }

          var scaledDim = glyphWidth * scale;
          var glyphUnicode = glyph.unicode;

          if (glyphUnicode === " " && (i === 0 || i + 1 === ii || glyphs[i - 1].unicode === " " || glyphs[i + 1].unicode === " " || extraSpacing)) {
            if (!font.vertical) {
              _charSpacing += scaledDim + textState.wordSpacing;
              textState.translateTextMatrix(_charSpacing * textState.textHScale, 0);
            } else {
              _charSpacing += -scaledDim + textState.wordSpacing;
              textState.translateTextMatrix(0, -_charSpacing);
            }

            continue;
          }

          compareWithLastPosition();
          var textChunk = ensureTextContentItem();

          if (DiacriticRegExp.test(glyph.unicode)) {
            scaledDim = 0;
          }

          if (!font.vertical) {
            scaledDim *= textState.textHScale;
            textState.translateTextMatrix(scaledDim, 0);
            textChunk.width += scaledDim;
          } else {
            textState.translateTextMatrix(0, scaledDim);
            scaledDim = Math.abs(scaledDim);
            textChunk.height += scaledDim;
          }

          if (scaledDim) {
            textChunk.prevTransform = getCurrentTextTransform();
          }

          glyphUnicode = NormalizedUnicodes[glyphUnicode] || glyphUnicode;
          glyphUnicode = (0, _unicode.reverseIfRtl)(glyphUnicode);
          textChunk.str.push(glyphUnicode);

          if (_charSpacing) {
            if (!font.vertical) {
              textState.translateTextMatrix(_charSpacing * textState.textHScale, 0);
            } else {
              textState.translateTextMatrix(0, -_charSpacing);
            }
          }
        }
      }

      function appendEOL() {
        if (textContentItem.initialized) {
          textContentItem.hasEOL = true;
          flushTextContentItem();
        } else {
          textContent.items.push({
            str: "",
            dir: "ltr",
            width: 0,
            height: 0,
            transform: getCurrentTextTransform(),
            fontName: textState.font.loadedName,
            hasEOL: true
          });
        }
      }

      function addFakeSpaces(width, transf) {
        if (textContentItem.spaceInFlowMin <= width && width <= textContentItem.spaceInFlowMax) {
          if (textContentItem.initialized) {
            textContentItem.str.push(" ");
          }

          return false;
        }

        var fontName = textContentItem.fontName;
        var height = 0;

        if (textContentItem.vertical) {
          height = width;
          width = 0;
        }

        flushTextContentItem();
        textContent.items.push({
          str: " ",
          dir: "ltr",
          width: width,
          height: height,
          transform: transf || getCurrentTextTransform(),
          fontName: fontName,
          hasEOL: false
        });
        return true;
      }

      function flushTextContentItem() {
        if (!textContentItem.initialized || !textContentItem.str) {
          return;
        }

        if (!textContentItem.vertical) {
          textContentItem.totalWidth += textContentItem.width * textContentItem.textAdvanceScale;
        } else {
          textContentItem.totalHeight += textContentItem.height * textContentItem.textAdvanceScale;
        }

        textContent.items.push(runBidiTransform(textContentItem));
        textContentItem.initialized = false;
        textContentItem.str.length = 0;
      }

      function enqueueChunk() {
        var batch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var length = textContent.items.length;

        if (length === 0) {
          return;
        }

        if (batch && length < TEXT_CHUNK_BATCH_SIZE) {
          return;
        }

        sink.enqueue(textContent, length);
        textContent.items = [];
        textContent.styles = Object.create(null);
      }

      var timeSlotManager = new TimeSlotManager();
      return new Promise(function promiseBody(resolve, reject) {
        var next = function next(promise) {
          enqueueChunk(true);
          Promise.all([promise, sink.ready]).then(function () {
            try {
              promiseBody(resolve, reject);
            } catch (ex) {
              reject(ex);
            }
          }, reject);
        };

        task.ensureNotTerminated();
        timeSlotManager.reset();
        var operation = {};
        var stop,
            args = [];

        while (!(stop = timeSlotManager.check())) {
          args.length = 0;
          operation.args = args;

          if (!preprocessor.read(operation)) {
            break;
          }

          textState = stateManager.state;
          var fn = operation.fn;
          args = operation.args;

          switch (fn | 0) {
            case _util.OPS.setFont:
              var fontNameArg = args[0].name,
                  fontSizeArg = args[1];

              if (textState.font && fontNameArg === textState.fontName && fontSizeArg === textState.fontSize) {
                break;
              }

              flushTextContentItem();
              textState.fontName = fontNameArg;
              textState.fontSize = fontSizeArg;
              next(handleSetFont(fontNameArg, null));
              return;

            case _util.OPS.setTextRise:
              textState.textRise = args[0];
              break;

            case _util.OPS.setHScale:
              textState.textHScale = args[0] / 100;
              break;

            case _util.OPS.setLeading:
              textState.leading = args[0];
              break;

            case _util.OPS.moveText:
              textState.translateTextLineMatrix(args[0], args[1]);
              textState.textMatrix = textState.textLineMatrix.slice();
              break;

            case _util.OPS.setLeadingMoveText:
              textState.leading = -args[1];
              textState.translateTextLineMatrix(args[0], args[1]);
              textState.textMatrix = textState.textLineMatrix.slice();
              break;

            case _util.OPS.nextLine:
              textState.carriageReturn();
              break;

            case _util.OPS.setTextMatrix:
              textState.setTextMatrix(args[0], args[1], args[2], args[3], args[4], args[5]);
              textState.setTextLineMatrix(args[0], args[1], args[2], args[3], args[4], args[5]);
              updateAdvanceScale();
              break;

            case _util.OPS.setCharSpacing:
              textState.charSpacing = args[0];
              break;

            case _util.OPS.setWordSpacing:
              textState.wordSpacing = args[0];
              break;

            case _util.OPS.beginText:
              textState.textMatrix = _util.IDENTITY_MATRIX.slice();
              textState.textLineMatrix = _util.IDENTITY_MATRIX.slice();
              break;

            case _util.OPS.showSpacedText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              var spaceFactor = (textState.font.vertical ? 1 : -1) * textState.fontSize / 1000;
              var elements = args[0];

              for (var i = 0, ii = elements.length; i < ii - 1; i++) {
                var _item = elements[i];

                if (typeof _item === "string") {
                  showSpacedTextBuffer.push(_item);
                } else if (typeof _item === "number" && _item !== 0) {
                  var str = showSpacedTextBuffer.join("");
                  showSpacedTextBuffer.length = 0;
                  buildTextContentItem({
                    chars: str,
                    extraSpacing: _item * spaceFactor
                  });
                }
              }

              var item = elements[elements.length - 1];

              if (typeof item === "string") {
                showSpacedTextBuffer.push(item);
              }

              if (showSpacedTextBuffer.length > 0) {
                var _str = showSpacedTextBuffer.join("");

                showSpacedTextBuffer.length = 0;
                buildTextContentItem({
                  chars: _str,
                  extraSpacing: 0
                });
              }

              break;

            case _util.OPS.showText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              buildTextContentItem({
                chars: args[0],
                extraSpacing: 0
              });
              break;

            case _util.OPS.nextLineShowText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              textState.carriageReturn();
              buildTextContentItem({
                chars: args[0],
                extraSpacing: 0
              });
              break;

            case _util.OPS.nextLineSetSpacingShowText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              textState.wordSpacing = args[0];
              textState.charSpacing = args[1];
              textState.carriageReturn();
              buildTextContentItem({
                chars: args[2],
                extraSpacing: 0
              });
              break;

            case _util.OPS.paintXObject:
              flushTextContentItem();

              if (!xobjs) {
                xobjs = resources.get("XObject") || _primitives.Dict.empty;
              }

              var isValidName = args[0] instanceof _primitives.Name;
              var name = args[0].name;

              if (isValidName && emptyXObjectCache.getByName(name)) {
                break;
              }

              next(new Promise(function (resolveXObject, rejectXObject) {
                if (!isValidName) {
                  throw new _util.FormatError("XObject must be referred to by name.");
                }

                var xobj = xobjs.getRaw(name);

                if (xobj instanceof _primitives.Ref) {
                  if (emptyXObjectCache.getByRef(xobj)) {
                    resolveXObject();
                    return;
                  }

                  var globalImage = self.globalImageCache.getData(xobj, self.pageIndex);

                  if (globalImage) {
                    resolveXObject();
                    return;
                  }

                  xobj = xref.fetch(xobj);
                }

                if (!(0, _primitives.isStream)(xobj)) {
                  throw new _util.FormatError("XObject should be a stream");
                }

                var type = xobj.dict.get("Subtype");

                if (!(0, _primitives.isName)(type)) {
                  throw new _util.FormatError("XObject should have a Name subtype");
                }

                if (type.name !== "Form") {
                  emptyXObjectCache.set(name, xobj.dict.objId, true);
                  resolveXObject();
                  return;
                }

                var currentState = stateManager.state.clone();
                var xObjStateManager = new StateManager(currentState);
                var matrix = xobj.dict.getArray("Matrix");

                if (Array.isArray(matrix) && matrix.length === 6) {
                  xObjStateManager.transform(matrix);
                }

                enqueueChunk();
                var sinkWrapper = {
                  enqueueInvoked: false,
                  enqueue: function enqueue(chunk, size) {
                    this.enqueueInvoked = true;
                    sink.enqueue(chunk, size);
                  },

                  get desiredSize() {
                    return sink.desiredSize;
                  },

                  get ready() {
                    return sink.ready;
                  }

                };
                self.getTextContent({
                  stream: xobj,
                  task: task,
                  resources: xobj.dict.get("Resources") || resources,
                  stateManager: xObjStateManager,
                  normalizeWhitespace: normalizeWhitespace,
                  combineTextItems: combineTextItems,
                  includeMarkedContent: includeMarkedContent,
                  sink: sinkWrapper,
                  seenStyles: seenStyles
                }).then(function () {
                  if (!sinkWrapper.enqueueInvoked) {
                    emptyXObjectCache.set(name, xobj.dict.objId, true);
                  }

                  resolveXObject();
                }, rejectXObject);
              })["catch"](function (reason) {
                if (reason instanceof _util.AbortException) {
                  return;
                }

                if (self.options.ignoreErrors) {
                  (0, _util.warn)("getTextContent - ignoring XObject: \"".concat(reason, "\"."));
                  return;
                }

                throw reason;
              }));
              return;

            case _util.OPS.setGState:
              isValidName = args[0] instanceof _primitives.Name;
              name = args[0].name;

              if (isValidName && emptyGStateCache.getByName(name)) {
                break;
              }

              next(new Promise(function (resolveGState, rejectGState) {
                if (!isValidName) {
                  throw new _util.FormatError("GState must be referred to by name.");
                }

                var extGState = resources.get("ExtGState");

                if (!(extGState instanceof _primitives.Dict)) {
                  throw new _util.FormatError("ExtGState should be a dictionary.");
                }

                var gState = extGState.get(name);

                if (!(gState instanceof _primitives.Dict)) {
                  throw new _util.FormatError("GState should be a dictionary.");
                }

                var gStateFont = gState.get("Font");

                if (!gStateFont) {
                  emptyGStateCache.set(name, gState.objId, true);
                  resolveGState();
                  return;
                }

                flushTextContentItem();
                textState.fontName = null;
                textState.fontSize = gStateFont[1];
                handleSetFont(null, gStateFont[0]).then(resolveGState, rejectGState);
              })["catch"](function (reason) {
                if (reason instanceof _util.AbortException) {
                  return;
                }

                if (self.options.ignoreErrors) {
                  (0, _util.warn)("getTextContent - ignoring ExtGState: \"".concat(reason, "\"."));
                  return;
                }

                throw reason;
              }));
              return;

            case _util.OPS.beginMarkedContent:
              if (includeMarkedContent) {
                textContent.items.push({
                  type: "beginMarkedContent",
                  tag: (0, _primitives.isName)(args[0]) ? args[0].name : null
                });
              }

              break;

            case _util.OPS.beginMarkedContentProps:
              if (includeMarkedContent) {
                flushTextContentItem();
                var mcid = null;

                if ((0, _primitives.isDict)(args[1])) {
                  mcid = args[1].get("MCID");
                }

                textContent.items.push({
                  type: "beginMarkedContentProps",
                  id: Number.isInteger(mcid) ? "".concat(self.idFactory.getPageObjId(), "_mcid").concat(mcid) : null,
                  tag: (0, _primitives.isName)(args[0]) ? args[0].name : null
                });
              }

              break;

            case _util.OPS.endMarkedContent:
              if (includeMarkedContent) {
                flushTextContentItem();
                textContent.items.push({
                  type: "endMarkedContent"
                });
              }

              break;
          }

          if (textContent.items.length >= sink.desiredSize) {
            stop = true;
            break;
          }
        }

        if (stop) {
          next(deferred);
          return;
        }

        flushTextContentItem();
        enqueueChunk();
        resolve();
      })["catch"](function (reason) {
        if (reason instanceof _util.AbortException) {
          return;
        }

        if (_this8.options.ignoreErrors) {
          (0, _util.warn)("getTextContent - ignoring errors during \"".concat(task.name, "\" ") + "task: \"".concat(reason, "\"."));
          flushTextContentItem();
          enqueueChunk();
          return;
        }

        throw reason;
      });
    }
  }, {
    key: "extractDataStructures",
    value: function extractDataStructures(dict, baseDict, properties) {
      var _this9 = this;

      var xref = this.xref;
      var cidToGidBytes;
      var toUnicodePromise = this.readToUnicode(properties.toUnicode || dict.get("ToUnicode") || baseDict.get("ToUnicode"));

      if (properties.composite) {
        var cidSystemInfo = dict.get("CIDSystemInfo");

        if ((0, _primitives.isDict)(cidSystemInfo)) {
          properties.cidSystemInfo = {
            registry: (0, _util.stringToPDFString)(cidSystemInfo.get("Registry")),
            ordering: (0, _util.stringToPDFString)(cidSystemInfo.get("Ordering")),
            supplement: cidSystemInfo.get("Supplement")
          };
        }

        var cidToGidMap = dict.get("CIDToGIDMap");

        if (cidToGidMap instanceof _base_stream.BaseStream) {
          cidToGidBytes = cidToGidMap.getBytes();
        }
      }

      var differences = [];
      var baseEncodingName = null;
      var encoding;

      if (dict.has("Encoding")) {
        encoding = dict.get("Encoding");

        if ((0, _primitives.isDict)(encoding)) {
          baseEncodingName = encoding.get("BaseEncoding");
          baseEncodingName = (0, _primitives.isName)(baseEncodingName) ? baseEncodingName.name : null;

          if (encoding.has("Differences")) {
            var diffEncoding = encoding.get("Differences");
            var index = 0;

            for (var j = 0, jj = diffEncoding.length; j < jj; j++) {
              var data = xref.fetchIfRef(diffEncoding[j]);

              if ((0, _util.isNum)(data)) {
                index = data;
              } else if ((0, _primitives.isName)(data)) {
                differences[index++] = data.name;
              } else {
                throw new _util.FormatError("Invalid entry in 'Differences' array: ".concat(data));
              }
            }
          }
        } else if ((0, _primitives.isName)(encoding)) {
          baseEncodingName = encoding.name;
        } else {
          throw new _util.FormatError("Encoding is not a Name nor a Dict");
        }

        if (baseEncodingName !== "MacRomanEncoding" && baseEncodingName !== "MacExpertEncoding" && baseEncodingName !== "WinAnsiEncoding") {
          baseEncodingName = null;
        }
      }

      if (baseEncodingName) {
        properties.defaultEncoding = (0, _encodings.getEncoding)(baseEncodingName);
      } else {
        var isSymbolicFont = !!(properties.flags & _fonts_utils.FontFlags.Symbolic);
        var isNonsymbolicFont = !!(properties.flags & _fonts_utils.FontFlags.Nonsymbolic);
        encoding = _encodings.StandardEncoding;

        if (properties.type === "TrueType" && !isNonsymbolicFont) {
          encoding = _encodings.WinAnsiEncoding;
        }

        if (isSymbolicFont) {
          encoding = _encodings.MacRomanEncoding;

          if (!properties.file || properties.isInternalFont) {
            if (/Symbol/i.test(properties.name)) {
              encoding = _encodings.SymbolSetEncoding;
            } else if (/Dingbats|Wingdings/i.test(properties.name)) {
              encoding = _encodings.ZapfDingbatsEncoding;
            }
          }
        }

        properties.defaultEncoding = encoding;
      }

      properties.differences = differences;
      properties.baseEncodingName = baseEncodingName;
      properties.hasEncoding = !!baseEncodingName || differences.length > 0;
      properties.dict = dict;
      return toUnicodePromise.then(function (readToUnicode) {
        properties.toUnicode = readToUnicode;
        return _this9.buildToUnicode(properties);
      }).then(function (builtToUnicode) {
        properties.toUnicode = builtToUnicode;

        if (cidToGidBytes) {
          properties.cidToGidMap = _this9.readCidToGidMap(cidToGidBytes, builtToUnicode);
        }

        return properties;
      });
    }
  }, {
    key: "_simpleFontToUnicode",
    value: function _simpleFontToUnicode(properties) {
      var forceGlyphs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      (0, _util.assert)(!properties.composite, "Must be a simple font.");
      var toUnicode = [];
      var encoding = properties.defaultEncoding.slice();
      var baseEncodingName = properties.baseEncodingName;
      var differences = properties.differences;

      for (var charcode in differences) {
        var glyphName = differences[charcode];

        if (glyphName === ".notdef") {
          continue;
        }

        encoding[charcode] = glyphName;
      }

      var glyphsUnicodeMap = (0, _glyphlist.getGlyphsUnicode)();

      for (var _charcode in encoding) {
        var _glyphName = encoding[_charcode];

        if (_glyphName === "") {
          continue;
        } else if (glyphsUnicodeMap[_glyphName] === undefined) {
          var code = 0;

          switch (_glyphName[0]) {
            case "G":
              if (_glyphName.length === 3) {
                code = parseInt(_glyphName.substring(1), 16);
              }

              break;

            case "g":
              if (_glyphName.length === 5) {
                code = parseInt(_glyphName.substring(1), 16);
              }

              break;

            case "C":
            case "c":
              if (_glyphName.length >= 3 && _glyphName.length <= 4) {
                var codeStr = _glyphName.substring(1);

                if (forceGlyphs) {
                  code = parseInt(codeStr, 16);
                  break;
                }

                code = +codeStr;

                if (Number.isNaN(code) && Number.isInteger(parseInt(codeStr, 16))) {
                  return this._simpleFontToUnicode(properties, true);
                }
              }

              break;

            default:
              var unicode = (0, _unicode.getUnicodeForGlyph)(_glyphName, glyphsUnicodeMap);

              if (unicode !== -1) {
                code = unicode;
              }

          }

          if (code > 0 && code <= 0x10ffff && Number.isInteger(code)) {
            if (baseEncodingName && code === +_charcode) {
              var baseEncoding = (0, _encodings.getEncoding)(baseEncodingName);

              if (baseEncoding && (_glyphName = baseEncoding[_charcode])) {
                toUnicode[_charcode] = String.fromCharCode(glyphsUnicodeMap[_glyphName]);
                continue;
              }
            }

            toUnicode[_charcode] = String.fromCodePoint(code);
          }

          continue;
        }

        toUnicode[_charcode] = String.fromCharCode(glyphsUnicodeMap[_glyphName]);
      }

      return toUnicode;
    }
  }, {
    key: "buildToUnicode",
    value: function () {
      var _buildToUnicode = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8(properties) {
        var _properties$cidSystem, registry, ordering, ucs2CMapName, ucs2CMap, toUnicode;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                properties.hasIncludedToUnicodeMap = !!properties.toUnicode && properties.toUnicode.length > 0;

                if (!properties.hasIncludedToUnicodeMap) {
                  _context8.next = 4;
                  break;
                }

                if (!properties.composite && properties.hasEncoding) {
                  properties.fallbackToUnicode = this._simpleFontToUnicode(properties);
                }

                return _context8.abrupt("return", properties.toUnicode);

              case 4:
                if (properties.composite) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt("return", new _to_unicode_map.ToUnicodeMap(this._simpleFontToUnicode(properties)));

              case 6:
                if (!(properties.composite && (properties.cMap.builtInCMap && !(properties.cMap instanceof _cmap.IdentityCMap) || properties.cidSystemInfo.registry === "Adobe" && (properties.cidSystemInfo.ordering === "GB1" || properties.cidSystemInfo.ordering === "CNS1" || properties.cidSystemInfo.ordering === "Japan1" || properties.cidSystemInfo.ordering === "Korea1")))) {
                  _context8.next = 15;
                  break;
                }

                _properties$cidSystem = properties.cidSystemInfo, registry = _properties$cidSystem.registry, ordering = _properties$cidSystem.ordering;
                ucs2CMapName = _primitives.Name.get("".concat(registry, "-").concat(ordering, "-UCS2"));
                _context8.next = 11;
                return _cmap.CMapFactory.create({
                  encoding: ucs2CMapName,
                  fetchBuiltInCMap: this._fetchBuiltInCMapBound,
                  useCMap: null
                });

              case 11:
                ucs2CMap = _context8.sent;
                toUnicode = [];
                properties.cMap.forEach(function (charcode, cid) {
                  if (cid > 0xffff) {
                    throw new _util.FormatError("Max size of CID is 65,535");
                  }

                  var ucs2 = ucs2CMap.lookup(cid);

                  if (ucs2) {
                    toUnicode[charcode] = String.fromCharCode((ucs2.charCodeAt(0) << 8) + ucs2.charCodeAt(1));
                  }
                });
                return _context8.abrupt("return", new _to_unicode_map.ToUnicodeMap(toUnicode));

              case 15:
                return _context8.abrupt("return", new _to_unicode_map.IdentityToUnicodeMap(properties.firstChar, properties.lastChar));

              case 16:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function buildToUnicode(_x14) {
        return _buildToUnicode.apply(this, arguments);
      }

      return buildToUnicode;
    }()
  }, {
    key: "readToUnicode",
    value: function readToUnicode(cmapObj) {
      var _this10 = this;

      if (!cmapObj) {
        return Promise.resolve(null);
      }

      if ((0, _primitives.isName)(cmapObj)) {
        return _cmap.CMapFactory.create({
          encoding: cmapObj,
          fetchBuiltInCMap: this._fetchBuiltInCMapBound,
          useCMap: null
        }).then(function (cmap) {
          if (cmap instanceof _cmap.IdentityCMap) {
            return new _to_unicode_map.IdentityToUnicodeMap(0, 0xffff);
          }

          return new _to_unicode_map.ToUnicodeMap(cmap.getMap());
        });
      } else if ((0, _primitives.isStream)(cmapObj)) {
        return _cmap.CMapFactory.create({
          encoding: cmapObj,
          fetchBuiltInCMap: this._fetchBuiltInCMapBound,
          useCMap: null
        }).then(function (cmap) {
          if (cmap instanceof _cmap.IdentityCMap) {
            return new _to_unicode_map.IdentityToUnicodeMap(0, 0xffff);
          }

          var map = new Array(cmap.length);
          cmap.forEach(function (charCode, token) {
            if (typeof token === "number") {
              map[charCode] = String.fromCodePoint(token);
              return;
            }

            var str = [];

            for (var k = 0; k < token.length; k += 2) {
              var w1 = token.charCodeAt(k) << 8 | token.charCodeAt(k + 1);

              if ((w1 & 0xf800) !== 0xd800) {
                str.push(w1);
                continue;
              }

              k += 2;
              var w2 = token.charCodeAt(k) << 8 | token.charCodeAt(k + 1);
              str.push(((w1 & 0x3ff) << 10) + (w2 & 0x3ff) + 0x10000);
            }

            map[charCode] = String.fromCodePoint.apply(String, str);
          });
          return new _to_unicode_map.ToUnicodeMap(map);
        }, function (reason) {
          if (reason instanceof _util.AbortException) {
            return null;
          }

          if (_this10.options.ignoreErrors) {
            _this10.handler.send("UnsupportedFeature", {
              featureId: _util.UNSUPPORTED_FEATURES.errorFontToUnicode
            });

            (0, _util.warn)("readToUnicode - ignoring ToUnicode data: \"".concat(reason, "\"."));
            return null;
          }

          throw reason;
        });
      }

      return Promise.resolve(null);
    }
  }, {
    key: "readCidToGidMap",
    value: function readCidToGidMap(glyphsData, toUnicode) {
      var result = [];

      for (var j = 0, jj = glyphsData.length; j < jj; j++) {
        var glyphID = glyphsData[j++] << 8 | glyphsData[j];
        var code = j >> 1;

        if (glyphID === 0 && !toUnicode.has(code)) {
          continue;
        }

        result[code] = glyphID;
      }

      return result;
    }
  }, {
    key: "extractWidths",
    value: function extractWidths(dict, descriptor, properties) {
      var xref = this.xref;
      var glyphsWidths = [];
      var defaultWidth = 0;
      var glyphsVMetrics = [];
      var defaultVMetrics;
      var i, ii, j, jj, start, code, widths;

      if (properties.composite) {
        defaultWidth = dict.has("DW") ? dict.get("DW") : 1000;
        widths = dict.get("W");

        if (widths) {
          for (i = 0, ii = widths.length; i < ii; i++) {
            start = xref.fetchIfRef(widths[i++]);
            code = xref.fetchIfRef(widths[i]);

            if (Array.isArray(code)) {
              for (j = 0, jj = code.length; j < jj; j++) {
                glyphsWidths[start++] = xref.fetchIfRef(code[j]);
              }
            } else {
              var width = xref.fetchIfRef(widths[++i]);

              for (j = start; j <= code; j++) {
                glyphsWidths[j] = width;
              }
            }
          }
        }

        if (properties.vertical) {
          var vmetrics = dict.getArray("DW2") || [880, -1000];
          defaultVMetrics = [vmetrics[1], defaultWidth * 0.5, vmetrics[0]];
          vmetrics = dict.get("W2");

          if (vmetrics) {
            for (i = 0, ii = vmetrics.length; i < ii; i++) {
              start = xref.fetchIfRef(vmetrics[i++]);
              code = xref.fetchIfRef(vmetrics[i]);

              if (Array.isArray(code)) {
                for (j = 0, jj = code.length; j < jj; j++) {
                  glyphsVMetrics[start++] = [xref.fetchIfRef(code[j++]), xref.fetchIfRef(code[j++]), xref.fetchIfRef(code[j])];
                }
              } else {
                var vmetric = [xref.fetchIfRef(vmetrics[++i]), xref.fetchIfRef(vmetrics[++i]), xref.fetchIfRef(vmetrics[++i])];

                for (j = start; j <= code; j++) {
                  glyphsVMetrics[j] = vmetric;
                }
              }
            }
          }
        }
      } else {
        var firstChar = properties.firstChar;
        widths = dict.get("Widths");

        if (widths) {
          j = firstChar;

          for (i = 0, ii = widths.length; i < ii; i++) {
            glyphsWidths[j++] = xref.fetchIfRef(widths[i]);
          }

          defaultWidth = parseFloat(descriptor.get("MissingWidth")) || 0;
        } else {
          var baseFontName = dict.get("BaseFont");

          if ((0, _primitives.isName)(baseFontName)) {
            var metrics = this.getBaseFontMetrics(baseFontName.name);
            glyphsWidths = this.buildCharCodeToWidth(metrics.widths, properties);
            defaultWidth = metrics.defaultWidth;
          }
        }
      }

      var isMonospace = true;
      var firstWidth = defaultWidth;

      for (var glyph in glyphsWidths) {
        var glyphWidth = glyphsWidths[glyph];

        if (!glyphWidth) {
          continue;
        }

        if (!firstWidth) {
          firstWidth = glyphWidth;
          continue;
        }

        if (firstWidth !== glyphWidth) {
          isMonospace = false;
          break;
        }
      }

      if (isMonospace) {
        properties.flags |= _fonts_utils.FontFlags.FixedPitch;
      }

      properties.defaultWidth = defaultWidth;
      properties.widths = glyphsWidths;
      properties.defaultVMetrics = defaultVMetrics;
      properties.vmetrics = glyphsVMetrics;
    }
  }, {
    key: "isSerifFont",
    value: function isSerifFont(baseFontName) {
      var fontNameWoStyle = baseFontName.split("-")[0];
      return fontNameWoStyle in (0, _standard_fonts.getSerifFonts)() || fontNameWoStyle.search(/serif/gi) !== -1;
    }
  }, {
    key: "getBaseFontMetrics",
    value: function getBaseFontMetrics(name) {
      var defaultWidth = 0;
      var widths = Object.create(null);
      var monospace = false;
      var stdFontMap = (0, _standard_fonts.getStdFontMap)();
      var lookupName = stdFontMap[name] || name;
      var Metrics = (0, _metrics.getMetrics)();

      if (!(lookupName in Metrics)) {
        if (this.isSerifFont(name)) {
          lookupName = "Times-Roman";
        } else {
          lookupName = "Helvetica";
        }
      }

      var glyphWidths = Metrics[lookupName];

      if ((0, _util.isNum)(glyphWidths)) {
        defaultWidth = glyphWidths;
        monospace = true;
      } else {
        widths = glyphWidths();
      }

      return {
        defaultWidth: defaultWidth,
        monospace: monospace,
        widths: widths
      };
    }
  }, {
    key: "buildCharCodeToWidth",
    value: function buildCharCodeToWidth(widthsByGlyphName, properties) {
      var widths = Object.create(null);
      var differences = properties.differences;
      var encoding = properties.defaultEncoding;

      for (var charCode = 0; charCode < 256; charCode++) {
        if (charCode in differences && widthsByGlyphName[differences[charCode]]) {
          widths[charCode] = widthsByGlyphName[differences[charCode]];
          continue;
        }

        if (charCode in encoding && widthsByGlyphName[encoding[charCode]]) {
          widths[charCode] = widthsByGlyphName[encoding[charCode]];
          continue;
        }
      }

      return widths;
    }
  }, {
    key: "preEvaluateFont",
    value: function preEvaluateFont(dict) {
      var baseDict = dict;
      var type = dict.get("Subtype");

      if (!(0, _primitives.isName)(type)) {
        throw new _util.FormatError("invalid font Subtype");
      }

      var composite = false;
      var hash, toUnicode;

      if (type.name === "Type0") {
        var df = dict.get("DescendantFonts");

        if (!df) {
          throw new _util.FormatError("Descendant fonts are not specified");
        }

        dict = Array.isArray(df) ? this.xref.fetchIfRef(df[0]) : df;

        if (!(dict instanceof _primitives.Dict)) {
          throw new _util.FormatError("Descendant font is not a dictionary.");
        }

        type = dict.get("Subtype");

        if (!(0, _primitives.isName)(type)) {
          throw new _util.FormatError("invalid font Subtype");
        }

        composite = true;
      }

      var firstChar = dict.get("FirstChar") || 0,
          lastChar = dict.get("LastChar") || (composite ? 0xffff : 0xff);
      var descriptor = dict.get("FontDescriptor");

      if (descriptor) {
        hash = new _murmurhash.MurmurHash3_64();
        var encoding = baseDict.getRaw("Encoding");

        if ((0, _primitives.isName)(encoding)) {
          hash.update(encoding.name);
        } else if ((0, _primitives.isRef)(encoding)) {
          hash.update(encoding.toString());
        } else if ((0, _primitives.isDict)(encoding)) {
          var _iterator6 = _createForOfIteratorHelper(encoding.getRawValues()),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var entry = _step6.value;

              if ((0, _primitives.isName)(entry)) {
                hash.update(entry.name);
              } else if ((0, _primitives.isRef)(entry)) {
                hash.update(entry.toString());
              } else if (Array.isArray(entry)) {
                var diffLength = entry.length,
                    diffBuf = new Array(diffLength);

                for (var j = 0; j < diffLength; j++) {
                  var diffEntry = entry[j];

                  if ((0, _primitives.isName)(diffEntry)) {
                    diffBuf[j] = diffEntry.name;
                  } else if ((0, _util.isNum)(diffEntry) || (0, _primitives.isRef)(diffEntry)) {
                    diffBuf[j] = diffEntry.toString();
                  }
                }

                hash.update(diffBuf.join());
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }

        hash.update("".concat(firstChar, "-").concat(lastChar));
        toUnicode = dict.get("ToUnicode") || baseDict.get("ToUnicode");

        if ((0, _primitives.isStream)(toUnicode)) {
          var stream = toUnicode.str || toUnicode;
          var uint8array = stream.buffer ? new Uint8Array(stream.buffer.buffer, 0, stream.bufferLength) : new Uint8Array(stream.bytes.buffer, stream.start, stream.end - stream.start);
          hash.update(uint8array);
        } else if ((0, _primitives.isName)(toUnicode)) {
          hash.update(toUnicode.name);
        }

        var widths = dict.get("Widths") || baseDict.get("Widths");

        if (Array.isArray(widths)) {
          var widthsBuf = [];

          var _iterator7 = _createForOfIteratorHelper(widths),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var _entry = _step7.value;

              if ((0, _util.isNum)(_entry) || (0, _primitives.isRef)(_entry)) {
                widthsBuf.push(_entry.toString());
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }

          hash.update(widthsBuf.join());
        }

        if (composite) {
          hash.update("compositeFont");
          var compositeWidths = dict.get("W") || baseDict.get("W");

          if (Array.isArray(compositeWidths)) {
            var _widthsBuf = [];

            var _iterator8 = _createForOfIteratorHelper(compositeWidths),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var _entry2 = _step8.value;

                if ((0, _util.isNum)(_entry2) || (0, _primitives.isRef)(_entry2)) {
                  _widthsBuf.push(_entry2.toString());
                } else if (Array.isArray(_entry2)) {
                  var subWidthsBuf = [];

                  var _iterator9 = _createForOfIteratorHelper(_entry2),
                      _step9;

                  try {
                    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                      var element = _step9.value;

                      if ((0, _util.isNum)(element) || (0, _primitives.isRef)(element)) {
                        subWidthsBuf.push(element.toString());
                      }
                    }
                  } catch (err) {
                    _iterator9.e(err);
                  } finally {
                    _iterator9.f();
                  }

                  _widthsBuf.push("[".concat(subWidthsBuf.join(), "]"));
                }
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }

            hash.update(_widthsBuf.join());
          }

          var cidToGidMap = dict.getRaw("CIDToGIDMap") || baseDict.getRaw("CIDToGIDMap");

          if (cidToGidMap instanceof _primitives.Name) {
            hash.update(cidToGidMap.name);
          } else if (cidToGidMap instanceof _primitives.Ref) {
            hash.update(cidToGidMap.toString());
          } else if (cidToGidMap instanceof _base_stream.BaseStream) {
            hash.update(cidToGidMap.peekBytes());
          }
        }
      }

      return {
        descriptor: descriptor,
        dict: dict,
        baseDict: baseDict,
        composite: composite,
        type: type.name,
        firstChar: firstChar,
        lastChar: lastChar,
        toUnicode: toUnicode,
        hash: hash ? hash.hexdigest() : ""
      };
    }
  }, {
    key: "translateFont",
    value: function () {
      var _translateFont = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9(_ref15) {
        var _this11 = this;

        var descriptor, dict, baseDict, composite, type, firstChar, lastChar, toUnicode, cssFontInfo, isType3Font, properties, baseFontName, metrics, fontNameWoStyle, flags, widths, standardFontName, file, fontName, baseFont, fontNameStr, baseFontStr, fontFile, subtype, length1, length2, length3, isStandardFont, isInternalFont, glyphScaleFactors, subtypeEntry, _standardFontName, _standardFontName2, cidEncoding, cMap;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                descriptor = _ref15.descriptor, dict = _ref15.dict, baseDict = _ref15.baseDict, composite = _ref15.composite, type = _ref15.type, firstChar = _ref15.firstChar, lastChar = _ref15.lastChar, toUnicode = _ref15.toUnicode, cssFontInfo = _ref15.cssFontInfo;
                isType3Font = type === "Type3";

                if (descriptor) {
                  _context9.next = 27;
                  break;
                }

                if (!isType3Font) {
                  _context9.next = 9;
                  break;
                }

                descriptor = new _primitives.Dict(null);
                descriptor.set("FontName", _primitives.Name.get(type));
                descriptor.set("FontBBox", dict.getArray("FontBBox") || [0, 0, 0, 0]);
                _context9.next = 27;
                break;

              case 9:
                baseFontName = dict.get("BaseFont");

                if ((0, _primitives.isName)(baseFontName)) {
                  _context9.next = 12;
                  break;
                }

                throw new _util.FormatError("Base font is not specified");

              case 12:
                baseFontName = baseFontName.name.replace(/[,_]/g, "-");
                metrics = this.getBaseFontMetrics(baseFontName);
                fontNameWoStyle = baseFontName.split("-")[0];
                flags = (this.isSerifFont(fontNameWoStyle) ? _fonts_utils.FontFlags.Serif : 0) | (metrics.monospace ? _fonts_utils.FontFlags.FixedPitch : 0) | ((0, _standard_fonts.getSymbolsFonts)()[fontNameWoStyle] ? _fonts_utils.FontFlags.Symbolic : _fonts_utils.FontFlags.Nonsymbolic);
                properties = {
                  type: type,
                  name: baseFontName,
                  loadedName: baseDict.loadedName,
                  widths: metrics.widths,
                  defaultWidth: metrics.defaultWidth,
                  isSimulatedFlags: true,
                  flags: flags,
                  firstChar: firstChar,
                  lastChar: lastChar,
                  toUnicode: toUnicode,
                  xHeight: 0,
                  capHeight: 0,
                  italicAngle: 0,
                  isType3Font: isType3Font
                };
                widths = dict.get("Widths");
                standardFontName = (0, _standard_fonts.getStandardFontName)(baseFontName);
                file = null;

                if (!standardFontName) {
                  _context9.next = 26;
                  break;
                }

                properties.isStandardFont = true;
                _context9.next = 24;
                return this.fetchStandardFontData(standardFontName);

              case 24:
                file = _context9.sent;
                properties.isInternalFont = !!file;

              case 26:
                return _context9.abrupt("return", this.extractDataStructures(dict, dict, properties).then(function (newProperties) {
                  if (widths) {
                    var glyphWidths = [];
                    var j = firstChar;

                    for (var i = 0, ii = widths.length; i < ii; i++) {
                      glyphWidths[j++] = _this11.xref.fetchIfRef(widths[i]);
                    }

                    newProperties.widths = glyphWidths;
                  } else {
                    newProperties.widths = _this11.buildCharCodeToWidth(metrics.widths, newProperties);
                  }

                  return new _fonts.Font(baseFontName, file, newProperties);
                }));

              case 27:
                fontName = descriptor.get("FontName");
                baseFont = dict.get("BaseFont");

                if ((0, _util.isString)(fontName)) {
                  fontName = _primitives.Name.get(fontName);
                }

                if ((0, _util.isString)(baseFont)) {
                  baseFont = _primitives.Name.get(baseFont);
                }

                if (!isType3Font) {
                  fontNameStr = fontName && fontName.name;
                  baseFontStr = baseFont && baseFont.name;

                  if (fontNameStr !== baseFontStr) {
                    (0, _util.info)("The FontDescriptor's FontName is \"".concat(fontNameStr, "\" but ") + "should be the same as the Font's BaseFont \"".concat(baseFontStr, "\"."));

                    if (fontNameStr && baseFontStr && baseFontStr.startsWith(fontNameStr)) {
                      fontName = baseFont;
                    }
                  }
                }

                fontName = fontName || baseFont;

                if ((0, _primitives.isName)(fontName)) {
                  _context9.next = 35;
                  break;
                }

                throw new _util.FormatError("invalid font name");

              case 35:
                _context9.prev = 35;
                fontFile = descriptor.get("FontFile", "FontFile2", "FontFile3");
                _context9.next = 45;
                break;

              case 39:
                _context9.prev = 39;
                _context9.t0 = _context9["catch"](35);

                if (this.options.ignoreErrors) {
                  _context9.next = 43;
                  break;
                }

                throw _context9.t0;

              case 43:
                (0, _util.warn)("translateFont - fetching \"".concat(fontName.name, "\" font file: \"").concat(_context9.t0, "\"."));
                fontFile = new _stream.NullStream();

              case 45:
                isStandardFont = false;
                isInternalFont = false;
                glyphScaleFactors = null;

                if (!fontFile) {
                  _context9.next = 52;
                  break;
                }

                if (fontFile.dict) {
                  subtypeEntry = fontFile.dict.get("Subtype");

                  if (subtypeEntry instanceof _primitives.Name) {
                    subtype = subtypeEntry.name;
                  }

                  length1 = fontFile.dict.get("Length1");
                  length2 = fontFile.dict.get("Length2");
                  length3 = fontFile.dict.get("Length3");
                }

                _context9.next = 74;
                break;

              case 52:
                if (!cssFontInfo) {
                  _context9.next = 66;
                  break;
                }

                _standardFontName = (0, _xfa_fonts.getXfaFontName)(fontName.name);

                if (!_standardFontName) {
                  _context9.next = 64;
                  break;
                }

                cssFontInfo.fontFamily = "".concat(cssFontInfo.fontFamily, "-PdfJS-XFA");
                cssFontInfo.metrics = _standardFontName.metrics || null;
                glyphScaleFactors = _standardFontName.factors || null;
                _context9.next = 60;
                return this.fetchStandardFontData(_standardFontName.name);

              case 60:
                fontFile = _context9.sent;
                isInternalFont = !!fontFile;
                baseDict = dict = (0, _xfa_fonts.getXfaFontDict)(fontName.name);
                composite = true;

              case 64:
                _context9.next = 74;
                break;

              case 66:
                if (isType3Font) {
                  _context9.next = 74;
                  break;
                }

                _standardFontName2 = (0, _standard_fonts.getStandardFontName)(fontName.name);

                if (!_standardFontName2) {
                  _context9.next = 74;
                  break;
                }

                isStandardFont = true;
                _context9.next = 72;
                return this.fetchStandardFontData(_standardFontName2);

              case 72:
                fontFile = _context9.sent;
                isInternalFont = !!fontFile;

              case 74:
                properties = {
                  type: type,
                  name: fontName.name,
                  subtype: subtype,
                  file: fontFile,
                  length1: length1,
                  length2: length2,
                  length3: length3,
                  isStandardFont: isStandardFont,
                  isInternalFont: isInternalFont,
                  loadedName: baseDict.loadedName,
                  composite: composite,
                  fixedPitch: false,
                  fontMatrix: dict.getArray("FontMatrix") || _util.FONT_IDENTITY_MATRIX,
                  firstChar: firstChar,
                  lastChar: lastChar,
                  toUnicode: toUnicode,
                  bbox: descriptor.getArray("FontBBox") || dict.getArray("FontBBox"),
                  ascent: descriptor.get("Ascent"),
                  descent: descriptor.get("Descent"),
                  xHeight: descriptor.get("XHeight") || 0,
                  capHeight: descriptor.get("CapHeight") || 0,
                  flags: descriptor.get("Flags"),
                  italicAngle: descriptor.get("ItalicAngle") || 0,
                  isType3Font: isType3Font,
                  cssFontInfo: cssFontInfo,
                  scaleFactors: glyphScaleFactors
                };

                if (!composite) {
                  _context9.next = 83;
                  break;
                }

                cidEncoding = baseDict.get("Encoding");

                if ((0, _primitives.isName)(cidEncoding)) {
                  properties.cidEncoding = cidEncoding.name;
                }

                _context9.next = 80;
                return _cmap.CMapFactory.create({
                  encoding: cidEncoding,
                  fetchBuiltInCMap: this._fetchBuiltInCMapBound,
                  useCMap: null
                });

              case 80:
                cMap = _context9.sent;
                properties.cMap = cMap;
                properties.vertical = properties.cMap.vertical;

              case 83:
                return _context9.abrupt("return", this.extractDataStructures(dict, baseDict, properties).then(function (newProperties) {
                  _this11.extractWidths(dict, descriptor, newProperties);

                  return new _fonts.Font(fontName.name, fontFile, newProperties);
                }));

              case 84:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[35, 39]]);
      }));

      function translateFont(_x15) {
        return _translateFont.apply(this, arguments);
      }

      return translateFont;
    }()
  }], [{
    key: "buildFontPaths",
    value: function buildFontPaths(font, glyphs, handler, evaluatorOptions) {
      function buildPath(fontChar) {
        var glyphName = "".concat(font.loadedName, "_path_").concat(fontChar);

        try {
          if (font.renderer.hasBuiltPath(fontChar)) {
            return;
          }

          handler.send("commonobj", [glyphName, "FontPath", font.renderer.getPathJs(fontChar)]);
        } catch (reason) {
          if (evaluatorOptions.ignoreErrors) {
            handler.send("UnsupportedFeature", {
              featureId: _util.UNSUPPORTED_FEATURES.errorFontBuildPath
            });
            (0, _util.warn)("buildFontPaths - ignoring ".concat(glyphName, " glyph: \"").concat(reason, "\"."));
            return;
          }

          throw reason;
        }
      }

      var _iterator10 = _createForOfIteratorHelper(glyphs),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var glyph = _step10.value;
          buildPath(glyph.fontChar);
          var accent = glyph.accent;

          if (accent && accent.fontChar) {
            buildPath(accent.fontChar);
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    }
  }, {
    key: "fallbackFontDict",
    get: function get() {
      var dict = new _primitives.Dict();
      dict.set("BaseFont", _primitives.Name.get("PDFJS-FallbackFont"));
      dict.set("Type", _primitives.Name.get("FallbackType"));
      dict.set("Subtype", _primitives.Name.get("FallbackType"));
      dict.set("Encoding", _primitives.Name.get("WinAnsiEncoding"));
      return (0, _util.shadow)(this, "fallbackFontDict", dict);
    }
  }]);

  return PartialEvaluator;
}();

exports.PartialEvaluator = PartialEvaluator;

var TranslatedFont = /*#__PURE__*/function () {
  function TranslatedFont(_ref16) {
    var loadedName = _ref16.loadedName,
        font = _ref16.font,
        dict = _ref16.dict,
        evaluatorOptions = _ref16.evaluatorOptions;

    _classCallCheck(this, TranslatedFont);

    this.loadedName = loadedName;
    this.font = font;
    this.dict = dict;
    this._evaluatorOptions = evaluatorOptions || DefaultPartialEvaluatorOptions;
    this.type3Loaded = null;
    this.type3Dependencies = font.isType3Font ? new Set() : null;
    this.sent = false;
  }

  _createClass(TranslatedFont, [{
    key: "send",
    value: function send(handler) {
      if (this.sent) {
        return;
      }

      this.sent = true;
      handler.send("commonobj", [this.loadedName, "Font", this.font.exportData(this._evaluatorOptions.fontExtraProperties)]);
    }
  }, {
    key: "fallback",
    value: function fallback(handler) {
      if (!this.font.data) {
        return;
      }

      this.font.disableFontFace = true;
      PartialEvaluator.buildFontPaths(this.font, this.font.glyphCacheValues, handler, this._evaluatorOptions);
    }
  }, {
    key: "loadType3Data",
    value: function loadType3Data(evaluator, resources, task) {
      var _this12 = this;

      if (this.type3Loaded) {
        return this.type3Loaded;
      }

      if (!this.font.isType3Font) {
        throw new Error("Must be a Type3 font.");
      }

      var type3Evaluator = evaluator.clone({
        ignoreErrors: false
      });
      type3Evaluator.parsingType3Font = true;
      var translatedFont = this.font,
          type3Dependencies = this.type3Dependencies;
      var loadCharProcsPromise = Promise.resolve();
      var charProcs = this.dict.get("CharProcs");
      var fontResources = this.dict.get("Resources") || resources;
      var charProcOperatorList = Object.create(null);
      var isEmptyBBox = !translatedFont.bbox || (0, _util.isArrayEqual)(translatedFont.bbox, [0, 0, 0, 0]);

      var _iterator11 = _createForOfIteratorHelper(charProcs.getKeys()),
          _step11;

      try {
        var _loop2 = function _loop2() {
          var key = _step11.value;
          loadCharProcsPromise = loadCharProcsPromise.then(function () {
            var glyphStream = charProcs.get(key);
            var operatorList = new _operator_list.OperatorList();
            return type3Evaluator.getOperatorList({
              stream: glyphStream,
              task: task,
              resources: fontResources,
              operatorList: operatorList
            }).then(function () {
              if (operatorList.fnArray[0] === _util.OPS.setCharWidthAndBounds) {
                _this12._removeType3ColorOperators(operatorList, isEmptyBBox);
              }

              charProcOperatorList[key] = operatorList.getIR();

              var _iterator12 = _createForOfIteratorHelper(operatorList.dependencies),
                  _step12;

              try {
                for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                  var dependency = _step12.value;
                  type3Dependencies.add(dependency);
                }
              } catch (err) {
                _iterator12.e(err);
              } finally {
                _iterator12.f();
              }
            })["catch"](function (reason) {
              (0, _util.warn)("Type3 font resource \"".concat(key, "\" is not available."));
              var dummyOperatorList = new _operator_list.OperatorList();
              charProcOperatorList[key] = dummyOperatorList.getIR();
            });
          });
        };

        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      this.type3Loaded = loadCharProcsPromise.then(function () {
        translatedFont.charProcOperatorList = charProcOperatorList;

        if (_this12._bbox) {
          translatedFont.isCharBBox = true;
          translatedFont.bbox = _this12._bbox;
        }
      });
      return this.type3Loaded;
    }
  }, {
    key: "_removeType3ColorOperators",
    value: function _removeType3ColorOperators(operatorList) {
      var isEmptyBBox = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      (0, _util.assert)(operatorList.fnArray[0] === _util.OPS.setCharWidthAndBounds, "Type3 glyph shall start with the d1 operator.");

      if (isEmptyBBox) {
        if (!this._bbox) {
          this._bbox = [Infinity, Infinity, -Infinity, -Infinity];
        }

        var charBBox = _util.Util.normalizeRect(operatorList.argsArray[0].slice(2));

        this._bbox[0] = Math.min(this._bbox[0], charBBox[0]);
        this._bbox[1] = Math.min(this._bbox[1], charBBox[1]);
        this._bbox[2] = Math.max(this._bbox[2], charBBox[2]);
        this._bbox[3] = Math.max(this._bbox[3], charBBox[3]);
      }

      var i = 1,
          ii = operatorList.length;

      while (i < ii) {
        switch (operatorList.fnArray[i]) {
          case _util.OPS.setStrokeColorSpace:
          case _util.OPS.setFillColorSpace:
          case _util.OPS.setStrokeColor:
          case _util.OPS.setStrokeColorN:
          case _util.OPS.setFillColor:
          case _util.OPS.setFillColorN:
          case _util.OPS.setStrokeGray:
          case _util.OPS.setFillGray:
          case _util.OPS.setStrokeRGBColor:
          case _util.OPS.setFillRGBColor:
          case _util.OPS.setStrokeCMYKColor:
          case _util.OPS.setFillCMYKColor:
          case _util.OPS.shadingFill:
          case _util.OPS.setRenderingIntent:
            operatorList.fnArray.splice(i, 1);
            operatorList.argsArray.splice(i, 1);
            ii--;
            continue;

          case _util.OPS.setGState:
            var _operatorList$argsArr = _slicedToArray(operatorList.argsArray[i], 1),
                _gStateObj = _operatorList$argsArr[0];

            var j = 0,
                jj = _gStateObj.length;

            while (j < jj) {
              var _gStateObj$j = _slicedToArray(_gStateObj[j], 1),
                  gStateKey = _gStateObj$j[0];

              switch (gStateKey) {
                case "TR":
                case "TR2":
                case "HT":
                case "BG":
                case "BG2":
                case "UCR":
                case "UCR2":
                  _gStateObj.splice(j, 1);

                  jj--;
                  continue;
              }

              j++;
            }

            break;
        }

        i++;
      }
    }
  }]);

  return TranslatedFont;
}();

var StateManager = /*#__PURE__*/function () {
  function StateManager() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new EvalState();

    _classCallCheck(this, StateManager);

    this.state = initialState;
    this.stateStack = [];
  }

  _createClass(StateManager, [{
    key: "save",
    value: function save() {
      var old = this.state;
      this.stateStack.push(this.state);
      this.state = old.clone();
    }
  }, {
    key: "restore",
    value: function restore() {
      var prev = this.stateStack.pop();

      if (prev) {
        this.state = prev;
      }
    }
  }, {
    key: "transform",
    value: function transform(args) {
      this.state.ctm = _util.Util.transform(this.state.ctm, args);
    }
  }]);

  return StateManager;
}();

var TextState = /*#__PURE__*/function () {
  function TextState() {
    _classCallCheck(this, TextState);

    this.ctm = new Float32Array(_util.IDENTITY_MATRIX);
    this.fontName = null;
    this.fontSize = 0;
    this.font = null;
    this.fontMatrix = _util.FONT_IDENTITY_MATRIX;
    this.textMatrix = _util.IDENTITY_MATRIX.slice();
    this.textLineMatrix = _util.IDENTITY_MATRIX.slice();
    this.charSpacing = 0;
    this.wordSpacing = 0;
    this.leading = 0;
    this.textHScale = 1;
    this.textRise = 0;
  }

  _createClass(TextState, [{
    key: "setTextMatrix",
    value: function setTextMatrix(a, b, c, d, e, f) {
      var m = this.textMatrix;
      m[0] = a;
      m[1] = b;
      m[2] = c;
      m[3] = d;
      m[4] = e;
      m[5] = f;
    }
  }, {
    key: "setTextLineMatrix",
    value: function setTextLineMatrix(a, b, c, d, e, f) {
      var m = this.textLineMatrix;
      m[0] = a;
      m[1] = b;
      m[2] = c;
      m[3] = d;
      m[4] = e;
      m[5] = f;
    }
  }, {
    key: "translateTextMatrix",
    value: function translateTextMatrix(x, y) {
      var m = this.textMatrix;
      m[4] = m[0] * x + m[2] * y + m[4];
      m[5] = m[1] * x + m[3] * y + m[5];
    }
  }, {
    key: "translateTextLineMatrix",
    value: function translateTextLineMatrix(x, y) {
      var m = this.textLineMatrix;
      m[4] = m[0] * x + m[2] * y + m[4];
      m[5] = m[1] * x + m[3] * y + m[5];
    }
  }, {
    key: "carriageReturn",
    value: function carriageReturn() {
      this.translateTextLineMatrix(0, -this.leading);
      this.textMatrix = this.textLineMatrix.slice();
    }
  }, {
    key: "clone",
    value: function clone() {
      var clone = Object.create(this);
      clone.textMatrix = this.textMatrix.slice();
      clone.textLineMatrix = this.textLineMatrix.slice();
      clone.fontMatrix = this.fontMatrix.slice();
      return clone;
    }
  }]);

  return TextState;
}();

var EvalState = /*#__PURE__*/function () {
  function EvalState() {
    _classCallCheck(this, EvalState);

    this.ctm = new Float32Array(_util.IDENTITY_MATRIX);
    this.font = null;
    this.textRenderingMode = _util.TextRenderingMode.FILL;
    this.fillColorSpace = _colorspace.ColorSpace.singletons.gray;
    this.strokeColorSpace = _colorspace.ColorSpace.singletons.gray;
  }

  _createClass(EvalState, [{
    key: "clone",
    value: function clone() {
      return Object.create(this);
    }
  }]);

  return EvalState;
}();

var EvaluatorPreprocessor = /*#__PURE__*/function () {
  function EvaluatorPreprocessor(stream, xref) {
    var stateManager = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new StateManager();

    _classCallCheck(this, EvaluatorPreprocessor);

    this.parser = new _parser.Parser({
      lexer: new _parser.Lexer(stream, EvaluatorPreprocessor.opMap),
      xref: xref
    });
    this.stateManager = stateManager;
    this.nonProcessedArgs = [];
    this._numInvalidPathOPS = 0;
  }

  _createClass(EvaluatorPreprocessor, [{
    key: "savedStatesDepth",
    get: function get() {
      return this.stateManager.stateStack.length;
    }
  }, {
    key: "read",
    value: function read(operation) {
      var args = operation.args;

      while (true) {
        var obj = this.parser.getObj();

        if (obj instanceof _primitives.Cmd) {
          var cmd = obj.cmd;
          var opSpec = EvaluatorPreprocessor.opMap[cmd];

          if (!opSpec) {
            (0, _util.warn)("Unknown command \"".concat(cmd, "\"."));
            continue;
          }

          var fn = opSpec.id;
          var numArgs = opSpec.numArgs;
          var argsLength = args !== null ? args.length : 0;

          if (!opSpec.variableArgs) {
            if (argsLength !== numArgs) {
              var nonProcessedArgs = this.nonProcessedArgs;

              while (argsLength > numArgs) {
                nonProcessedArgs.push(args.shift());
                argsLength--;
              }

              while (argsLength < numArgs && nonProcessedArgs.length !== 0) {
                if (args === null) {
                  args = [];
                }

                args.unshift(nonProcessedArgs.pop());
                argsLength++;
              }
            }

            if (argsLength < numArgs) {
              var partialMsg = "command ".concat(cmd, ": expected ").concat(numArgs, " args, ") + "but received ".concat(argsLength, " args.");

              if (fn >= _util.OPS.moveTo && fn <= _util.OPS.endPath && ++this._numInvalidPathOPS > EvaluatorPreprocessor.MAX_INVALID_PATH_OPS) {
                throw new _util.FormatError("Invalid ".concat(partialMsg));
              }

              (0, _util.warn)("Skipping ".concat(partialMsg));

              if (args !== null) {
                args.length = 0;
              }

              continue;
            }
          } else if (argsLength > numArgs) {
            (0, _util.info)("Command ".concat(cmd, ": expected [0, ").concat(numArgs, "] args, ") + "but received ".concat(argsLength, " args."));
          }

          this.preprocessCommand(fn, args);
          operation.fn = fn;
          operation.args = args;
          return true;
        }

        if (obj === _primitives.EOF) {
          return false;
        }

        if (obj !== null) {
          if (args === null) {
            args = [];
          }

          args.push(obj);

          if (args.length > 33) {
            throw new _util.FormatError("Too many arguments");
          }
        }
      }
    }
  }, {
    key: "preprocessCommand",
    value: function preprocessCommand(fn, args) {
      switch (fn | 0) {
        case _util.OPS.save:
          this.stateManager.save();
          break;

        case _util.OPS.restore:
          this.stateManager.restore();
          break;

        case _util.OPS.transform:
          this.stateManager.transform(args);
          break;
      }
    }
  }], [{
    key: "opMap",
    get: function get() {
      var getOPMap = (0, _core_utils.getLookupTableFactory)(function (t) {
        t.w = {
          id: _util.OPS.setLineWidth,
          numArgs: 1,
          variableArgs: false
        };
        t.J = {
          id: _util.OPS.setLineCap,
          numArgs: 1,
          variableArgs: false
        };
        t.j = {
          id: _util.OPS.setLineJoin,
          numArgs: 1,
          variableArgs: false
        };
        t.M = {
          id: _util.OPS.setMiterLimit,
          numArgs: 1,
          variableArgs: false
        };
        t.d = {
          id: _util.OPS.setDash,
          numArgs: 2,
          variableArgs: false
        };
        t.ri = {
          id: _util.OPS.setRenderingIntent,
          numArgs: 1,
          variableArgs: false
        };
        t.i = {
          id: _util.OPS.setFlatness,
          numArgs: 1,
          variableArgs: false
        };
        t.gs = {
          id: _util.OPS.setGState,
          numArgs: 1,
          variableArgs: false
        };
        t.q = {
          id: _util.OPS.save,
          numArgs: 0,
          variableArgs: false
        };
        t.Q = {
          id: _util.OPS.restore,
          numArgs: 0,
          variableArgs: false
        };
        t.cm = {
          id: _util.OPS.transform,
          numArgs: 6,
          variableArgs: false
        };
        t.m = {
          id: _util.OPS.moveTo,
          numArgs: 2,
          variableArgs: false
        };
        t.l = {
          id: _util.OPS.lineTo,
          numArgs: 2,
          variableArgs: false
        };
        t.c = {
          id: _util.OPS.curveTo,
          numArgs: 6,
          variableArgs: false
        };
        t.v = {
          id: _util.OPS.curveTo2,
          numArgs: 4,
          variableArgs: false
        };
        t.y = {
          id: _util.OPS.curveTo3,
          numArgs: 4,
          variableArgs: false
        };
        t.h = {
          id: _util.OPS.closePath,
          numArgs: 0,
          variableArgs: false
        };
        t.re = {
          id: _util.OPS.rectangle,
          numArgs: 4,
          variableArgs: false
        };
        t.S = {
          id: _util.OPS.stroke,
          numArgs: 0,
          variableArgs: false
        };
        t.s = {
          id: _util.OPS.closeStroke,
          numArgs: 0,
          variableArgs: false
        };
        t.f = {
          id: _util.OPS.fill,
          numArgs: 0,
          variableArgs: false
        };
        t.F = {
          id: _util.OPS.fill,
          numArgs: 0,
          variableArgs: false
        };
        t["f*"] = {
          id: _util.OPS.eoFill,
          numArgs: 0,
          variableArgs: false
        };
        t.B = {
          id: _util.OPS.fillStroke,
          numArgs: 0,
          variableArgs: false
        };
        t["B*"] = {
          id: _util.OPS.eoFillStroke,
          numArgs: 0,
          variableArgs: false
        };
        t.b = {
          id: _util.OPS.closeFillStroke,
          numArgs: 0,
          variableArgs: false
        };
        t["b*"] = {
          id: _util.OPS.closeEOFillStroke,
          numArgs: 0,
          variableArgs: false
        };
        t.n = {
          id: _util.OPS.endPath,
          numArgs: 0,
          variableArgs: false
        };
        t.W = {
          id: _util.OPS.clip,
          numArgs: 0,
          variableArgs: false
        };
        t["W*"] = {
          id: _util.OPS.eoClip,
          numArgs: 0,
          variableArgs: false
        };
        t.BT = {
          id: _util.OPS.beginText,
          numArgs: 0,
          variableArgs: false
        };
        t.ET = {
          id: _util.OPS.endText,
          numArgs: 0,
          variableArgs: false
        };
        t.Tc = {
          id: _util.OPS.setCharSpacing,
          numArgs: 1,
          variableArgs: false
        };
        t.Tw = {
          id: _util.OPS.setWordSpacing,
          numArgs: 1,
          variableArgs: false
        };
        t.Tz = {
          id: _util.OPS.setHScale,
          numArgs: 1,
          variableArgs: false
        };
        t.TL = {
          id: _util.OPS.setLeading,
          numArgs: 1,
          variableArgs: false
        };
        t.Tf = {
          id: _util.OPS.setFont,
          numArgs: 2,
          variableArgs: false
        };
        t.Tr = {
          id: _util.OPS.setTextRenderingMode,
          numArgs: 1,
          variableArgs: false
        };
        t.Ts = {
          id: _util.OPS.setTextRise,
          numArgs: 1,
          variableArgs: false
        };
        t.Td = {
          id: _util.OPS.moveText,
          numArgs: 2,
          variableArgs: false
        };
        t.TD = {
          id: _util.OPS.setLeadingMoveText,
          numArgs: 2,
          variableArgs: false
        };
        t.Tm = {
          id: _util.OPS.setTextMatrix,
          numArgs: 6,
          variableArgs: false
        };
        t["T*"] = {
          id: _util.OPS.nextLine,
          numArgs: 0,
          variableArgs: false
        };
        t.Tj = {
          id: _util.OPS.showText,
          numArgs: 1,
          variableArgs: false
        };
        t.TJ = {
          id: _util.OPS.showSpacedText,
          numArgs: 1,
          variableArgs: false
        };
        t["'"] = {
          id: _util.OPS.nextLineShowText,
          numArgs: 1,
          variableArgs: false
        };
        t['"'] = {
          id: _util.OPS.nextLineSetSpacingShowText,
          numArgs: 3,
          variableArgs: false
        };
        t.d0 = {
          id: _util.OPS.setCharWidth,
          numArgs: 2,
          variableArgs: false
        };
        t.d1 = {
          id: _util.OPS.setCharWidthAndBounds,
          numArgs: 6,
          variableArgs: false
        };
        t.CS = {
          id: _util.OPS.setStrokeColorSpace,
          numArgs: 1,
          variableArgs: false
        };
        t.cs = {
          id: _util.OPS.setFillColorSpace,
          numArgs: 1,
          variableArgs: false
        };
        t.SC = {
          id: _util.OPS.setStrokeColor,
          numArgs: 4,
          variableArgs: true
        };
        t.SCN = {
          id: _util.OPS.setStrokeColorN,
          numArgs: 33,
          variableArgs: true
        };
        t.sc = {
          id: _util.OPS.setFillColor,
          numArgs: 4,
          variableArgs: true
        };
        t.scn = {
          id: _util.OPS.setFillColorN,
          numArgs: 33,
          variableArgs: true
        };
        t.G = {
          id: _util.OPS.setStrokeGray,
          numArgs: 1,
          variableArgs: false
        };
        t.g = {
          id: _util.OPS.setFillGray,
          numArgs: 1,
          variableArgs: false
        };
        t.RG = {
          id: _util.OPS.setStrokeRGBColor,
          numArgs: 3,
          variableArgs: false
        };
        t.rg = {
          id: _util.OPS.setFillRGBColor,
          numArgs: 3,
          variableArgs: false
        };
        t.K = {
          id: _util.OPS.setStrokeCMYKColor,
          numArgs: 4,
          variableArgs: false
        };
        t.k = {
          id: _util.OPS.setFillCMYKColor,
          numArgs: 4,
          variableArgs: false
        };
        t.sh = {
          id: _util.OPS.shadingFill,
          numArgs: 1,
          variableArgs: false
        };
        t.BI = {
          id: _util.OPS.beginInlineImage,
          numArgs: 0,
          variableArgs: false
        };
        t.ID = {
          id: _util.OPS.beginImageData,
          numArgs: 0,
          variableArgs: false
        };
        t.EI = {
          id: _util.OPS.endInlineImage,
          numArgs: 1,
          variableArgs: false
        };
        t.Do = {
          id: _util.OPS.paintXObject,
          numArgs: 1,
          variableArgs: false
        };
        t.MP = {
          id: _util.OPS.markPoint,
          numArgs: 1,
          variableArgs: false
        };
        t.DP = {
          id: _util.OPS.markPointProps,
          numArgs: 2,
          variableArgs: false
        };
        t.BMC = {
          id: _util.OPS.beginMarkedContent,
          numArgs: 1,
          variableArgs: false
        };
        t.BDC = {
          id: _util.OPS.beginMarkedContentProps,
          numArgs: 2,
          variableArgs: false
        };
        t.EMC = {
          id: _util.OPS.endMarkedContent,
          numArgs: 0,
          variableArgs: false
        };
        t.BX = {
          id: _util.OPS.beginCompat,
          numArgs: 0,
          variableArgs: false
        };
        t.EX = {
          id: _util.OPS.endCompat,
          numArgs: 0,
          variableArgs: false
        };
        t.BM = null;
        t.BD = null;
        t["true"] = null;
        t.fa = null;
        t.fal = null;
        t.fals = null;
        t["false"] = null;
        t.nu = null;
        t.nul = null;
        t["null"] = null;
      });
      return (0, _util.shadow)(this, "opMap", getOPMap());
    }
  }, {
    key: "MAX_INVALID_PATH_OPS",
    get: function get() {
      return (0, _util.shadow)(this, "MAX_INVALID_PATH_OPS", 20);
    }
  }]);

  return EvaluatorPreprocessor;
}();

exports.EvaluatorPreprocessor = EvaluatorPreprocessor;