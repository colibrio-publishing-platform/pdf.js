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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkupAnnotation = exports.AnnotationFactory = exports.AnnotationBorderStyle = exports.Annotation = void 0;
exports.getQuadPoints = getQuadPoints;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util.js");

var _core_utils = require("./core_utils.js");

var _default_appearance = require("./default_appearance.js");

var _primitives = require("./primitives.js");

var _bidi = require("./bidi.js");

var _catalog = require("./catalog.js");

var _colorspace = require("./colorspace.js");

var _file_spec = require("./file_spec.js");

var _object_loader = require("./object_loader.js");

var _operator_list = require("./operator_list.js");

var _stream = require("./stream.js");

var _writer = require("./writer.js");

var _factory = require("./xfa/factory.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var AnnotationFactory = /*#__PURE__*/function () {
  function AnnotationFactory() {
    _classCallCheck(this, AnnotationFactory);
  }

  _createClass(AnnotationFactory, null, [{
    key: "create",
    value: function create(xref, ref, pdfManager, idFactory, collectFields) {
      var _this = this;

      return Promise.all([pdfManager.ensureCatalog("acroForm"), collectFields ? this._getPageIndex(xref, ref, pdfManager) : -1]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            acroForm = _ref2[0],
            pageIndex = _ref2[1];

        return pdfManager.ensure(_this, "_create", [xref, ref, pdfManager, idFactory, acroForm, collectFields, pageIndex]);
      });
    }
  }, {
    key: "_create",
    value: function _create(xref, ref, pdfManager, idFactory, acroForm, collectFields) {
      var pageIndex = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : -1;
      var dict = xref.fetchIfRef(ref);

      if (!(0, _primitives.isDict)(dict)) {
        return undefined;
      }

      var id = (0, _primitives.isRef)(ref) ? ref.toString() : "annot_".concat(idFactory.createObjId());
      var subtype = dict.get("Subtype");
      subtype = (0, _primitives.isName)(subtype) ? subtype.name : null;
      var parameters = {
        xref: xref,
        ref: ref,
        dict: dict,
        subtype: subtype,
        id: id,
        pdfManager: pdfManager,
        acroForm: acroForm instanceof _primitives.Dict ? acroForm : _primitives.Dict.empty,
        collectFields: collectFields,
        pageIndex: pageIndex
      };

      switch (subtype) {
        case "Link":
          return new LinkAnnotation(parameters);

        case "Text":
          return new TextAnnotation(parameters);

        case "Widget":
          var fieldType = (0, _core_utils.getInheritableProperty)({
            dict: dict,
            key: "FT"
          });
          fieldType = (0, _primitives.isName)(fieldType) ? fieldType.name : null;

          switch (fieldType) {
            case "Tx":
              return new TextWidgetAnnotation(parameters);

            case "Btn":
              return new ButtonWidgetAnnotation(parameters);

            case "Ch":
              return new ChoiceWidgetAnnotation(parameters);

            case "Sig":
              return new SignatureWidgetAnnotation(parameters);
          }

          (0, _util.warn)("Unimplemented widget field type \"".concat(fieldType, "\", ") + "falling back to base field type.");
          return new WidgetAnnotation(parameters);

        case "Popup":
          return new PopupAnnotation(parameters);

        case "FreeText":
          return new FreeTextAnnotation(parameters);

        case "Line":
          return new LineAnnotation(parameters);

        case "Square":
          return new SquareAnnotation(parameters);

        case "Circle":
          return new CircleAnnotation(parameters);

        case "PolyLine":
          return new PolylineAnnotation(parameters);

        case "Polygon":
          return new PolygonAnnotation(parameters);

        case "Caret":
          return new CaretAnnotation(parameters);

        case "Ink":
          return new InkAnnotation(parameters);

        case "Highlight":
          return new HighlightAnnotation(parameters);

        case "Underline":
          return new UnderlineAnnotation(parameters);

        case "Squiggly":
          return new SquigglyAnnotation(parameters);

        case "StrikeOut":
          return new StrikeOutAnnotation(parameters);

        case "Stamp":
          return new StampAnnotation(parameters);

        case "FileAttachment":
          return new FileAttachmentAnnotation(parameters);

        default:
          if (!collectFields) {
            if (!subtype) {
              (0, _util.warn)("Annotation is missing the required /Subtype.");
            } else {
              (0, _util.warn)("Unimplemented annotation type \"".concat(subtype, "\", ") + "falling back to base annotation.");
            }
          }

          return new Annotation(parameters);
      }
    }
  }, {
    key: "_getPageIndex",
    value: function () {
      var _getPageIndex2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(xref, ref, pdfManager) {
        var annotDict, pageRef, pageIndex;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return xref.fetchIfRefAsync(ref);

              case 3:
                annotDict = _context.sent;

                if ((0, _primitives.isDict)(annotDict)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", -1);

              case 6:
                pageRef = annotDict.getRaw("P");

                if ((0, _primitives.isRef)(pageRef)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", -1);

              case 9:
                _context.next = 11;
                return pdfManager.ensureCatalog("getPageIndex", [pageRef]);

              case 11:
                pageIndex = _context.sent;
                return _context.abrupt("return", pageIndex);

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](0);
                (0, _util.warn)("_getPageIndex: \"".concat(_context.t0, "\"."));
                return _context.abrupt("return", -1);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 15]]);
      }));

      function _getPageIndex(_x, _x2, _x3) {
        return _getPageIndex2.apply(this, arguments);
      }

      return _getPageIndex;
    }()
  }]);

  return AnnotationFactory;
}();

exports.AnnotationFactory = AnnotationFactory;

function getRgbColor(color) {
  var defaultColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Uint8ClampedArray(3);

  if (!Array.isArray(color)) {
    return defaultColor;
  }

  var rgbColor = defaultColor || new Uint8ClampedArray(3);

  switch (color.length) {
    case 0:
      return null;

    case 1:
      _colorspace.ColorSpace.singletons.gray.getRgbItem(color, 0, rgbColor, 0);

      return rgbColor;

    case 3:
      _colorspace.ColorSpace.singletons.rgb.getRgbItem(color, 0, rgbColor, 0);

      return rgbColor;

    case 4:
      _colorspace.ColorSpace.singletons.cmyk.getRgbItem(color, 0, rgbColor, 0);

      return rgbColor;

    default:
      return defaultColor;
  }
}

function getQuadPoints(dict, rect) {
  if (!dict.has("QuadPoints")) {
    return null;
  }

  var quadPoints = dict.getArray("QuadPoints");

  if (!Array.isArray(quadPoints) || quadPoints.length === 0 || quadPoints.length % 8 > 0) {
    return null;
  }

  var quadPointsLists = [];

  for (var i = 0, ii = quadPoints.length / 8; i < ii; i++) {
    quadPointsLists.push([]);

    for (var j = i * 8, jj = i * 8 + 8; j < jj; j += 2) {
      var x = quadPoints[j];
      var y = quadPoints[j + 1];

      if (rect !== null && (x < rect[0] || x > rect[2] || y < rect[1] || y > rect[3])) {
        return null;
      }

      quadPointsLists[i].push({
        x: x,
        y: y
      });
    }
  }

  return quadPointsLists.map(function (quadPointsList) {
    var _quadPointsList$reduc = quadPointsList.reduce(function (_ref3, quadPoint) {
      var _ref4 = _slicedToArray(_ref3, 4),
          mX = _ref4[0],
          MX = _ref4[1],
          mY = _ref4[2],
          MY = _ref4[3];

      return [Math.min(mX, quadPoint.x), Math.max(MX, quadPoint.x), Math.min(mY, quadPoint.y), Math.max(MY, quadPoint.y)];
    }, [Number.MAX_VALUE, Number.MIN_VALUE, Number.MAX_VALUE, Number.MIN_VALUE]),
        _quadPointsList$reduc2 = _slicedToArray(_quadPointsList$reduc, 4),
        minX = _quadPointsList$reduc2[0],
        maxX = _quadPointsList$reduc2[1],
        minY = _quadPointsList$reduc2[2],
        maxY = _quadPointsList$reduc2[3];

    return [{
      x: minX,
      y: maxY
    }, {
      x: maxX,
      y: maxY
    }, {
      x: minX,
      y: minY
    }, {
      x: maxX,
      y: minY
    }];
  });
}

function getTransformMatrix(rect, bbox, matrix) {
  var _Util$getAxialAligned = _util.Util.getAxialAlignedBoundingBox(bbox, matrix),
      _Util$getAxialAligned2 = _slicedToArray(_Util$getAxialAligned, 4),
      minX = _Util$getAxialAligned2[0],
      minY = _Util$getAxialAligned2[1],
      maxX = _Util$getAxialAligned2[2],
      maxY = _Util$getAxialAligned2[3];

  if (minX === maxX || minY === maxY) {
    return [1, 0, 0, 1, rect[0], rect[1]];
  }

  var xRatio = (rect[2] - rect[0]) / (maxX - minX);
  var yRatio = (rect[3] - rect[1]) / (maxY - minY);
  return [xRatio, 0, 0, yRatio, rect[0] - minX * xRatio, rect[1] - minY * yRatio];
}

var Annotation = /*#__PURE__*/function () {
  function Annotation(params) {
    _classCallCheck(this, Annotation);

    var dict = params.dict;
    this.setTitle(dict.get("T"));
    this.setContents(dict.get("Contents"));
    this.setModificationDate(dict.get("M"));
    this.setFlags(dict.get("F"));
    this.setRectangle(dict.getArray("Rect"));
    this.setColor(dict.getArray("C"));
    this.setBorderStyle(dict);
    this.setAppearance(dict);
    this.setBorderAndBackgroundColors(dict.get("MK"));
    this._streams = [];

    if (this.appearance) {
      this._streams.push(this.appearance);
    }

    this.data = {
      annotationFlags: this.flags,
      borderStyle: this.borderStyle,
      color: this.color,
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      contentsObj: this._contents,
      hasAppearance: !!this.appearance,
      id: params.id,
      modificationDate: this.modificationDate,
      rect: this.rectangle,
      subtype: params.subtype,
      hasOwnCanvas: false
    };

    if (params.collectFields) {
      var kids = dict.get("Kids");

      if (Array.isArray(kids)) {
        var kidIds = [];

        var _iterator = _createForOfIteratorHelper(kids),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var kid = _step.value;

            if ((0, _primitives.isRef)(kid)) {
              kidIds.push(kid.toString());
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (kidIds.length !== 0) {
          this.data.kidIds = kidIds;
        }
      }

      this.data.actions = (0, _core_utils.collectActions)(params.xref, dict, _util.AnnotationActionEventType);
      this.data.fieldName = this._constructFieldName(dict);
      this.data.pageIndex = params.pageIndex;
    }

    this._fallbackFontDict = null;
  }

  _createClass(Annotation, [{
    key: "_hasFlag",
    value: function _hasFlag(flags, flag) {
      return !!(flags & flag);
    }
  }, {
    key: "_isViewable",
    value: function _isViewable(flags) {
      return !this._hasFlag(flags, _util.AnnotationFlag.INVISIBLE) && !this._hasFlag(flags, _util.AnnotationFlag.NOVIEW);
    }
  }, {
    key: "_isPrintable",
    value: function _isPrintable(flags) {
      return this._hasFlag(flags, _util.AnnotationFlag.PRINT) && !this._hasFlag(flags, _util.AnnotationFlag.INVISIBLE);
    }
  }, {
    key: "mustBeViewed",
    value: function mustBeViewed(annotationStorage) {
      var storageEntry = annotationStorage && annotationStorage.get(this.data.id);

      if (storageEntry && storageEntry.hidden !== undefined) {
        return !storageEntry.hidden;
      }

      return this.viewable && !this._hasFlag(this.flags, _util.AnnotationFlag.HIDDEN);
    }
  }, {
    key: "mustBePrinted",
    value: function mustBePrinted(annotationStorage) {
      var storageEntry = annotationStorage && annotationStorage.get(this.data.id);

      if (storageEntry && storageEntry.print !== undefined) {
        return storageEntry.print;
      }

      return this.printable;
    }
  }, {
    key: "viewable",
    get: function get() {
      if (this.data.quadPoints === null) {
        return false;
      }

      if (this.flags === 0) {
        return true;
      }

      return this._isViewable(this.flags);
    }
  }, {
    key: "printable",
    get: function get() {
      if (this.data.quadPoints === null) {
        return false;
      }

      if (this.flags === 0) {
        return false;
      }

      return this._isPrintable(this.flags);
    }
  }, {
    key: "_parseStringHelper",
    value: function _parseStringHelper(data) {
      var str = typeof data === "string" ? (0, _util.stringToPDFString)(data) : "";
      var dir = str && (0, _bidi.bidi)(str).dir === "rtl" ? "rtl" : "ltr";
      return {
        str: str,
        dir: dir
      };
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this._title = this._parseStringHelper(title);
    }
  }, {
    key: "setContents",
    value: function setContents(contents) {
      this._contents = this._parseStringHelper(contents);
    }
  }, {
    key: "setModificationDate",
    value: function setModificationDate(modificationDate) {
      this.modificationDate = (0, _util.isString)(modificationDate) ? modificationDate : null;
    }
  }, {
    key: "setFlags",
    value: function setFlags(flags) {
      this.flags = Number.isInteger(flags) && flags > 0 ? flags : 0;
    }
  }, {
    key: "hasFlag",
    value: function hasFlag(flag) {
      return this._hasFlag(this.flags, flag);
    }
  }, {
    key: "setRectangle",
    value: function setRectangle(rectangle) {
      if (Array.isArray(rectangle) && rectangle.length === 4) {
        this.rectangle = _util.Util.normalizeRect(rectangle);
      } else {
        this.rectangle = [0, 0, 0, 0];
      }
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.color = getRgbColor(color);
    }
  }, {
    key: "setBorderAndBackgroundColors",
    value: function setBorderAndBackgroundColors(mk) {
      if (mk instanceof _primitives.Dict) {
        this.borderColor = getRgbColor(mk.getArray("BC"), null);
        this.backgroundColor = getRgbColor(mk.getArray("BG"), null);
      } else {
        this.borderColor = this.backgroundColor = null;
      }
    }
  }, {
    key: "setBorderStyle",
    value: function setBorderStyle(borderStyle) {
      (0, _util.assert)(this.rectangle, "setRectangle must have been called previously.");
      this.borderStyle = new AnnotationBorderStyle();

      if (!(0, _primitives.isDict)(borderStyle)) {
        return;
      }

      if (borderStyle.has("BS")) {
        var dict = borderStyle.get("BS");
        var dictType = dict.get("Type");

        if (!dictType || (0, _primitives.isName)(dictType, "Border")) {
          this.borderStyle.setWidth(dict.get("W"), this.rectangle);
          this.borderStyle.setStyle(dict.get("S"));
          this.borderStyle.setDashArray(dict.getArray("D"));
        }
      } else if (borderStyle.has("Border")) {
        var array = borderStyle.getArray("Border");

        if (Array.isArray(array) && array.length >= 3) {
          this.borderStyle.setHorizontalCornerRadius(array[0]);
          this.borderStyle.setVerticalCornerRadius(array[1]);
          this.borderStyle.setWidth(array[2], this.rectangle);

          if (array.length === 4) {
            this.borderStyle.setDashArray(array[3], true);
          }
        }
      } else {
        this.borderStyle.setWidth(0);
      }
    }
  }, {
    key: "setAppearance",
    value: function setAppearance(dict) {
      this.appearance = null;
      var appearanceStates = dict.get("AP");

      if (!(0, _primitives.isDict)(appearanceStates)) {
        return;
      }

      var normalAppearanceState = appearanceStates.get("N");

      if ((0, _primitives.isStream)(normalAppearanceState)) {
        this.appearance = normalAppearanceState;
        return;
      }

      if (!(0, _primitives.isDict)(normalAppearanceState)) {
        return;
      }

      var as = dict.get("AS");

      if (!(0, _primitives.isName)(as) || !normalAppearanceState.has(as.name)) {
        return;
      }

      this.appearance = normalAppearanceState.get(as.name);
    }
  }, {
    key: "loadResources",
    value: function loadResources(keys, appearance) {
      return appearance.dict.getAsync("Resources").then(function (resources) {
        if (!resources) {
          return undefined;
        }

        var objectLoader = new _object_loader.ObjectLoader(resources, keys, resources.xref);
        return objectLoader.load().then(function () {
          return resources;
        });
      });
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList(evaluator, task, intent, renderForms, annotationStorage) {
      var _this2 = this;

      var data = this.data;
      var appearance = this.appearance;
      var isUsingOwnCanvas = data.hasOwnCanvas && intent & _util.RenderingIntentFlag.DISPLAY;

      if (!appearance) {
        if (!isUsingOwnCanvas) {
          return Promise.resolve(new _operator_list.OperatorList());
        }

        appearance = new _stream.StringStream("");
        appearance.dict = new _primitives.Dict();
      }

      var appearanceDict = appearance.dict;
      var resourcesPromise = this.loadResources(["ExtGState", "ColorSpace", "Pattern", "Shading", "XObject", "Font"], appearance);
      var bbox = appearanceDict.getArray("BBox") || [0, 0, 1, 1];
      var matrix = appearanceDict.getArray("Matrix") || [1, 0, 0, 1, 0, 0];
      var transform = getTransformMatrix(data.rect, bbox, matrix);
      return resourcesPromise.then(function (resources) {
        var opList = new _operator_list.OperatorList();
        opList.addOp(_util.OPS.beginAnnotation, [data.id, data.rect, transform, matrix, isUsingOwnCanvas]);
        return evaluator.getOperatorList({
          stream: appearance,
          task: task,
          resources: resources,
          operatorList: opList,
          fallbackFontDict: _this2._fallbackFontDict
        }).then(function () {
          opList.addOp(_util.OPS.endAnnotation, []);

          _this2.reset();

          return opList;
        });
      });
    }
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(evaluator, task, annotationStorage) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", null);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function save(_x4, _x5, _x6) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "getFieldObject",
    value: function getFieldObject() {
      if (this.data.kidIds) {
        return {
          id: this.data.id,
          actions: this.data.actions,
          name: this.data.fieldName,
          strokeColor: this.data.borderColor,
          fillColor: this.data.backgroundColor,
          type: "",
          kidIds: this.data.kidIds,
          page: this.data.pageIndex
        };
      }

      return null;
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.appearance && !this._streams.includes(this.appearance)) {
        (0, _util.unreachable)("The appearance stream should always be reset.");
      }

      var _iterator2 = _createForOfIteratorHelper(this._streams),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var stream = _step2.value;
          stream.reset();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "_constructFieldName",
    value: function _constructFieldName(dict) {
      if (!dict.has("T") && !dict.has("Parent")) {
        (0, _util.warn)("Unknown field name, falling back to empty field name.");
        return "";
      }

      if (!dict.has("Parent")) {
        return (0, _util.stringToPDFString)(dict.get("T"));
      }

      var fieldName = [];

      if (dict.has("T")) {
        fieldName.unshift((0, _util.stringToPDFString)(dict.get("T")));
      }

      var loopDict = dict;
      var visited = new _primitives.RefSet();

      if (dict.objId) {
        visited.put(dict.objId);
      }

      while (loopDict.has("Parent")) {
        loopDict = loopDict.get("Parent");

        if (!(loopDict instanceof _primitives.Dict) || loopDict.objId && visited.has(loopDict.objId)) {
          break;
        }

        if (loopDict.objId) {
          visited.put(loopDict.objId);
        }

        if (loopDict.has("T")) {
          fieldName.unshift((0, _util.stringToPDFString)(loopDict.get("T")));
        }
      }

      return fieldName.join(".");
    }
  }]);

  return Annotation;
}();

exports.Annotation = Annotation;

var AnnotationBorderStyle = /*#__PURE__*/function () {
  function AnnotationBorderStyle() {
    _classCallCheck(this, AnnotationBorderStyle);

    this.width = 1;
    this.style = _util.AnnotationBorderStyleType.SOLID;
    this.dashArray = [3];
    this.horizontalCornerRadius = 0;
    this.verticalCornerRadius = 0;
  }

  _createClass(AnnotationBorderStyle, [{
    key: "setWidth",
    value: function setWidth(width) {
      var rect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0, 0];
      (0, _util.assert)(Array.isArray(rect) && rect.length === 4, "A valid `rect` parameter must be provided.");

      if ((0, _primitives.isName)(width)) {
        this.width = 0;
        return;
      }

      if (Number.isInteger(width)) {
        if (width > 0) {
          var maxWidth = (rect[2] - rect[0]) / 2;
          var maxHeight = (rect[3] - rect[1]) / 2;

          if (maxWidth > 0 && maxHeight > 0 && (width > maxWidth || width > maxHeight)) {
            (0, _util.warn)("AnnotationBorderStyle.setWidth - ignoring width: ".concat(width));
            width = 1;
          }
        }

        this.width = width;
      }
    }
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      if (!(0, _primitives.isName)(style)) {
        return;
      }

      switch (style.name) {
        case "S":
          this.style = _util.AnnotationBorderStyleType.SOLID;
          break;

        case "D":
          this.style = _util.AnnotationBorderStyleType.DASHED;
          break;

        case "B":
          this.style = _util.AnnotationBorderStyleType.BEVELED;
          break;

        case "I":
          this.style = _util.AnnotationBorderStyleType.INSET;
          break;

        case "U":
          this.style = _util.AnnotationBorderStyleType.UNDERLINE;
          break;

        default:
          break;
      }
    }
  }, {
    key: "setDashArray",
    value: function setDashArray(dashArray) {
      var forceStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (Array.isArray(dashArray) && dashArray.length > 0) {
        var isValid = true;
        var allZeros = true;

        var _iterator3 = _createForOfIteratorHelper(dashArray),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var element = _step3.value;
            var validNumber = +element >= 0;

            if (!validNumber) {
              isValid = false;
              break;
            } else if (element > 0) {
              allZeros = false;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        if (isValid && !allZeros) {
          this.dashArray = dashArray;

          if (forceStyle) {
            this.setStyle(_primitives.Name.get("D"));
          }
        } else {
          this.width = 0;
        }
      } else if (dashArray) {
        this.width = 0;
      }
    }
  }, {
    key: "setHorizontalCornerRadius",
    value: function setHorizontalCornerRadius(radius) {
      if (Number.isInteger(radius)) {
        this.horizontalCornerRadius = radius;
      }
    }
  }, {
    key: "setVerticalCornerRadius",
    value: function setVerticalCornerRadius(radius) {
      if (Number.isInteger(radius)) {
        this.verticalCornerRadius = radius;
      }
    }
  }]);

  return AnnotationBorderStyle;
}();

exports.AnnotationBorderStyle = AnnotationBorderStyle;

var MarkupAnnotation = /*#__PURE__*/function (_Annotation) {
  _inherits(MarkupAnnotation, _Annotation);

  var _super = _createSuper(MarkupAnnotation);

  function MarkupAnnotation(parameters) {
    var _this3;

    _classCallCheck(this, MarkupAnnotation);

    _this3 = _super.call(this, parameters);
    var dict = parameters.dict;

    if (dict.has("IRT")) {
      var rawIRT = dict.getRaw("IRT");
      _this3.data.inReplyTo = (0, _primitives.isRef)(rawIRT) ? rawIRT.toString() : null;
      var rt = dict.get("RT");
      _this3.data.replyType = (0, _primitives.isName)(rt) ? rt.name : _util.AnnotationReplyType.REPLY;
    }

    if (_this3.data.replyType === _util.AnnotationReplyType.GROUP) {
      var parent = dict.get("IRT");

      _this3.setTitle(parent.get("T"));

      _this3.data.titleObj = _this3._title;

      _this3.setContents(parent.get("Contents"));

      _this3.data.contentsObj = _this3._contents;

      if (!parent.has("CreationDate")) {
        _this3.data.creationDate = null;
      } else {
        _this3.setCreationDate(parent.get("CreationDate"));

        _this3.data.creationDate = _this3.creationDate;
      }

      if (!parent.has("M")) {
        _this3.data.modificationDate = null;
      } else {
        _this3.setModificationDate(parent.get("M"));

        _this3.data.modificationDate = _this3.modificationDate;
      }

      _this3.data.hasPopup = parent.has("Popup");

      if (!parent.has("C")) {
        _this3.data.color = null;
      } else {
        _this3.setColor(parent.getArray("C"));

        _this3.data.color = _this3.color;
      }
    } else {
      _this3.data.titleObj = _this3._title;

      _this3.setCreationDate(dict.get("CreationDate"));

      _this3.data.creationDate = _this3.creationDate;
      _this3.data.hasPopup = dict.has("Popup");

      if (!dict.has("C")) {
        _this3.data.color = null;
      }
    }

    if (dict.has("RC")) {
      _this3.data.richText = _factory.XFAFactory.getRichTextAsHtml(dict.get("RC"));
    }

    return _this3;
  }

  _createClass(MarkupAnnotation, [{
    key: "setCreationDate",
    value: function setCreationDate(creationDate) {
      this.creationDate = (0, _util.isString)(creationDate) ? creationDate : null;
    }
  }, {
    key: "_setDefaultAppearance",
    value: function _setDefaultAppearance(_ref5) {
      var xref = _ref5.xref,
          extra = _ref5.extra,
          strokeColor = _ref5.strokeColor,
          fillColor = _ref5.fillColor,
          blendMode = _ref5.blendMode,
          strokeAlpha = _ref5.strokeAlpha,
          fillAlpha = _ref5.fillAlpha,
          pointsCallback = _ref5.pointsCallback;
      var minX = Number.MAX_VALUE;
      var minY = Number.MAX_VALUE;
      var maxX = Number.MIN_VALUE;
      var maxY = Number.MIN_VALUE;
      var buffer = ["q"];

      if (extra) {
        buffer.push(extra);
      }

      if (strokeColor) {
        buffer.push("".concat(strokeColor[0], " ").concat(strokeColor[1], " ").concat(strokeColor[2], " RG"));
      }

      if (fillColor) {
        buffer.push("".concat(fillColor[0], " ").concat(fillColor[1], " ").concat(fillColor[2], " rg"));
      }

      var pointsArray = this.data.quadPoints;

      if (!pointsArray) {
        pointsArray = [[{
          x: this.rectangle[0],
          y: this.rectangle[3]
        }, {
          x: this.rectangle[2],
          y: this.rectangle[3]
        }, {
          x: this.rectangle[0],
          y: this.rectangle[1]
        }, {
          x: this.rectangle[2],
          y: this.rectangle[1]
        }]];
      }

      var _iterator4 = _createForOfIteratorHelper(pointsArray),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var points = _step4.value;

          var _pointsCallback = pointsCallback(buffer, points),
              _pointsCallback2 = _slicedToArray(_pointsCallback, 4),
              mX = _pointsCallback2[0],
              MX = _pointsCallback2[1],
              mY = _pointsCallback2[2],
              MY = _pointsCallback2[3];

          minX = Math.min(minX, mX);
          maxX = Math.max(maxX, MX);
          minY = Math.min(minY, mY);
          maxY = Math.max(maxY, MY);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      buffer.push("Q");
      var formDict = new _primitives.Dict(xref);
      var appearanceStreamDict = new _primitives.Dict(xref);
      appearanceStreamDict.set("Subtype", _primitives.Name.get("Form"));
      var appearanceStream = new _stream.StringStream(buffer.join(" "));
      appearanceStream.dict = appearanceStreamDict;
      formDict.set("Fm0", appearanceStream);
      var gsDict = new _primitives.Dict(xref);

      if (blendMode) {
        gsDict.set("BM", _primitives.Name.get(blendMode));
      }

      if (typeof strokeAlpha === "number") {
        gsDict.set("CA", strokeAlpha);
      }

      if (typeof fillAlpha === "number") {
        gsDict.set("ca", fillAlpha);
      }

      var stateDict = new _primitives.Dict(xref);
      stateDict.set("GS0", gsDict);
      var resources = new _primitives.Dict(xref);
      resources.set("ExtGState", stateDict);
      resources.set("XObject", formDict);
      var appearanceDict = new _primitives.Dict(xref);
      appearanceDict.set("Resources", resources);
      var bbox = this.data.rect = [minX, minY, maxX, maxY];
      appearanceDict.set("BBox", bbox);
      this.appearance = new _stream.StringStream("/GS0 gs /Fm0 Do");
      this.appearance.dict = appearanceDict;

      this._streams.push(this.appearance, appearanceStream);
    }
  }]);

  return MarkupAnnotation;
}(Annotation);

exports.MarkupAnnotation = MarkupAnnotation;

var WidgetAnnotation = /*#__PURE__*/function (_Annotation2) {
  _inherits(WidgetAnnotation, _Annotation2);

  var _super2 = _createSuper(WidgetAnnotation);

  function WidgetAnnotation(params) {
    var _this4;

    _classCallCheck(this, WidgetAnnotation);

    _this4 = _super2.call(this, params);
    var dict = params.dict;
    var data = _this4.data;
    _this4.ref = params.ref;
    data.annotationType = _util.AnnotationType.WIDGET;

    if (data.fieldName === undefined) {
      data.fieldName = _this4._constructFieldName(dict);
    }

    if (data.actions === undefined) {
      data.actions = (0, _core_utils.collectActions)(params.xref, dict, _util.AnnotationActionEventType);
    }

    var fieldValue = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "V",
      getArray: true
    });
    data.fieldValue = _this4._decodeFormValue(fieldValue);
    var defaultFieldValue = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "DV",
      getArray: true
    });
    data.defaultFieldValue = _this4._decodeFormValue(defaultFieldValue);

    if (fieldValue === undefined && data.defaultFieldValue !== null) {
      data.fieldValue = data.defaultFieldValue;
    }

    data.alternativeText = (0, _util.stringToPDFString)(dict.get("TU") || "");
    var defaultAppearance = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "DA"
    }) || params.acroForm.get("DA");
    _this4._defaultAppearance = (0, _util.isString)(defaultAppearance) ? defaultAppearance : "";
    data.defaultAppearanceData = (0, _default_appearance.parseDefaultAppearance)(_this4._defaultAppearance);
    var fieldType = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "FT"
    });
    data.fieldType = (0, _primitives.isName)(fieldType) ? fieldType.name : null;
    var localResources = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "DR"
    });
    var acroFormResources = params.acroForm.get("DR");

    var appearanceResources = _this4.appearance && _this4.appearance.dict.get("Resources");

    _this4._fieldResources = {
      localResources: localResources,
      acroFormResources: acroFormResources,
      appearanceResources: appearanceResources,
      mergedResources: _primitives.Dict.merge({
        xref: params.xref,
        dictArray: [localResources, appearanceResources, acroFormResources],
        mergeSubDicts: true
      })
    };
    data.fieldFlags = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "Ff"
    });

    if (!Number.isInteger(data.fieldFlags) || data.fieldFlags < 0) {
      data.fieldFlags = 0;
    }

    data.readOnly = _this4.hasFieldFlag(_util.AnnotationFieldFlag.READONLY);
    data.hidden = _this4._hasFlag(data.annotationFlags, _util.AnnotationFlag.HIDDEN);
    return _this4;
  }

  _createClass(WidgetAnnotation, [{
    key: "_decodeFormValue",
    value: function _decodeFormValue(formValue) {
      if (Array.isArray(formValue)) {
        return formValue.filter(function (item) {
          return (0, _util.isString)(item);
        }).map(function (item) {
          return (0, _util.stringToPDFString)(item);
        });
      } else if ((0, _primitives.isName)(formValue)) {
        return (0, _util.stringToPDFString)(formValue.name);
      } else if ((0, _util.isString)(formValue)) {
        return (0, _util.stringToPDFString)(formValue);
      }

      return null;
    }
  }, {
    key: "hasFieldFlag",
    value: function hasFieldFlag(flag) {
      return !!(this.data.fieldFlags & flag);
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList(evaluator, task, intent, renderForms, annotationStorage) {
      var _this5 = this;

      if (renderForms && !(this instanceof SignatureWidgetAnnotation)) {
        return Promise.resolve(new _operator_list.OperatorList());
      }

      if (!this._hasText) {
        return _get(_getPrototypeOf(WidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, intent, renderForms, annotationStorage);
      }

      return this._getAppearance(evaluator, task, annotationStorage).then(function (content) {
        if (_this5.appearance && content === null) {
          return _get(_getPrototypeOf(WidgetAnnotation.prototype), "getOperatorList", _this5).call(_this5, evaluator, task, intent, renderForms, annotationStorage);
        }

        var operatorList = new _operator_list.OperatorList();

        if (!_this5._defaultAppearance || content === null) {
          return operatorList;
        }

        var matrix = [1, 0, 0, 1, 0, 0];
        var bbox = [0, 0, _this5.data.rect[2] - _this5.data.rect[0], _this5.data.rect[3] - _this5.data.rect[1]];
        var transform = getTransformMatrix(_this5.data.rect, bbox, matrix);
        operatorList.addOp(_util.OPS.beginAnnotation, [_this5.data.id, _this5.data.rect, transform, matrix]);
        var stream = new _stream.StringStream(content);
        return evaluator.getOperatorList({
          stream: stream,
          task: task,
          resources: _this5._fieldResources.mergedResources,
          operatorList: operatorList
        }).then(function () {
          operatorList.addOp(_util.OPS.endAnnotation, []);
          return operatorList;
        });
      });
    }
  }, {
    key: "save",
    value: function () {
      var _save2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(evaluator, task, annotationStorage) {
        var storageEntry, value, appearance, xref, dict, bbox, xfa, newRef, AP, encrypt, originalTransform, newTransform, appearanceDict, bufferOriginal, bufferNew;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (annotationStorage) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", null);

              case 2:
                storageEntry = annotationStorage.get(this.data.id);
                value = storageEntry && storageEntry.value;

                if (!(value === this.data.fieldValue || value === undefined)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", null);

              case 6:
                _context3.next = 8;
                return this._getAppearance(evaluator, task, annotationStorage);

              case 8:
                appearance = _context3.sent;

                if (!(appearance === null)) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return", null);

              case 11:
                xref = evaluator.xref;
                dict = xref.fetchIfRef(this.ref);

                if ((0, _primitives.isDict)(dict)) {
                  _context3.next = 15;
                  break;
                }

                return _context3.abrupt("return", null);

              case 15:
                bbox = [0, 0, this.data.rect[2] - this.data.rect[0], this.data.rect[3] - this.data.rect[1]];
                xfa = {
                  path: (0, _util.stringToPDFString)(dict.get("T") || ""),
                  value: value
                };
                newRef = xref.getNewRef();
                AP = new _primitives.Dict(xref);
                AP.set("N", newRef);
                encrypt = xref.encrypt;
                originalTransform = null;
                newTransform = null;

                if (encrypt) {
                  originalTransform = encrypt.createCipherTransform(this.ref.num, this.ref.gen);
                  newTransform = encrypt.createCipherTransform(newRef.num, newRef.gen);
                  appearance = newTransform.encryptString(appearance);
                }

                dict.set("V", (0, _util.isAscii)(value) ? value : (0, _util.stringToUTF16BEString)(value));
                dict.set("AP", AP);
                dict.set("M", "D:".concat((0, _util.getModificationDate)()));
                appearanceDict = new _primitives.Dict(xref);
                appearanceDict.set("Length", appearance.length);
                appearanceDict.set("Subtype", _primitives.Name.get("Form"));
                appearanceDict.set("Resources", this._getSaveFieldResources(xref));
                appearanceDict.set("BBox", bbox);
                bufferOriginal = ["".concat(this.ref.num, " ").concat(this.ref.gen, " obj\n")];
                (0, _writer.writeDict)(dict, bufferOriginal, originalTransform);
                bufferOriginal.push("\nendobj\n");
                bufferNew = ["".concat(newRef.num, " ").concat(newRef.gen, " obj\n")];
                (0, _writer.writeDict)(appearanceDict, bufferNew, newTransform);
                bufferNew.push(" stream\n", appearance, "\nendstream\nendobj\n");
                return _context3.abrupt("return", [{
                  ref: this.ref,
                  data: bufferOriginal.join(""),
                  xfa: xfa
                }, {
                  ref: newRef,
                  data: bufferNew.join(""),
                  xfa: null
                }]);

              case 39:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function save(_x7, _x8, _x9) {
        return _save2.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "_getAppearance",
    value: function () {
      var _getAppearance2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(evaluator, task, annotationStorage) {
        var isPassword, storageEntry, value, lineCount, defaultPadding, hPadding, totalHeight, totalWidth, _this$_computeFontSiz, _this$_computeFontSiz2, defaultAppearance, fontSize, font, descent, vPadding, alignment, encodedString, renderedText;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                isPassword = this.hasFieldFlag(_util.AnnotationFieldFlag.PASSWORD);

                if (!(!annotationStorage || isPassword)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", null);

              case 3:
                storageEntry = annotationStorage.get(this.data.id);
                value = storageEntry && storageEntry.value;

                if (!(value === undefined)) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", null);

              case 7:
                value = value.trim();

                if (!(value === "")) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", "");

              case 10:
                lineCount = -1;

                if (this.data.multiLine) {
                  lineCount = value.split(/\r\n|\r|\n/).length;
                }

                defaultPadding = 2;
                hPadding = defaultPadding;
                totalHeight = this.data.rect[3] - this.data.rect[1];
                totalWidth = this.data.rect[2] - this.data.rect[0];

                if (!this._defaultAppearance) {
                  this.data.defaultAppearanceData = (0, _default_appearance.parseDefaultAppearance)(this._defaultAppearance = "/Helvetica 0 Tf 0 g");
                }

                _this$_computeFontSiz = this._computeFontSize(totalHeight, lineCount), _this$_computeFontSiz2 = _slicedToArray(_this$_computeFontSiz, 2), defaultAppearance = _this$_computeFontSiz2[0], fontSize = _this$_computeFontSiz2[1];
                _context4.next = 20;
                return this._getFontData(evaluator, task);

              case 20:
                font = _context4.sent;
                descent = font.descent;

                if (isNaN(descent)) {
                  descent = 0;
                }

                vPadding = defaultPadding + Math.abs(descent) * fontSize;
                alignment = this.data.textAlignment;

                if (!this.data.multiLine) {
                  _context4.next = 27;
                  break;
                }

                return _context4.abrupt("return", this._getMultilineAppearance(defaultAppearance, value, font, fontSize, totalWidth, totalHeight, alignment, hPadding, vPadding));

              case 27:
                encodedString = font.encodeString(value).join("");

                if (!this.data.comb) {
                  _context4.next = 30;
                  break;
                }

                return _context4.abrupt("return", this._getCombAppearance(defaultAppearance, font, encodedString, totalWidth, hPadding, vPadding));

              case 30:
                if (!(alignment === 0 || alignment > 2)) {
                  _context4.next = 32;
                  break;
                }

                return _context4.abrupt("return", "/Tx BMC q BT " + defaultAppearance + " 1 0 0 1 ".concat(hPadding, " ").concat(vPadding, " Tm (").concat((0, _util.escapeString)(encodedString), ") Tj") + " ET Q EMC");

              case 32:
                renderedText = this._renderText(encodedString, font, fontSize, totalWidth, alignment, hPadding, vPadding);
                return _context4.abrupt("return", "/Tx BMC q BT " + defaultAppearance + " 1 0 0 1 0 0 Tm ".concat(renderedText) + " ET Q EMC");

              case 34:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _getAppearance(_x10, _x11, _x12) {
        return _getAppearance2.apply(this, arguments);
      }

      return _getAppearance;
    }()
  }, {
    key: "_getFontData",
    value: function () {
      var _getFontData2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(evaluator, task) {
        var operatorList, initialState, _this$data$defaultApp, fontName, fontSize;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                operatorList = new _operator_list.OperatorList();
                initialState = {
                  font: null,
                  clone: function clone() {
                    return this;
                  }
                };
                _this$data$defaultApp = this.data.defaultAppearanceData, fontName = _this$data$defaultApp.fontName, fontSize = _this$data$defaultApp.fontSize;
                _context5.next = 5;
                return evaluator.handleSetFont(this._fieldResources.mergedResources, [fontName && _primitives.Name.get(fontName), fontSize], null, operatorList, task, initialState, null);

              case 5:
                return _context5.abrupt("return", initialState.font);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _getFontData(_x13, _x14) {
        return _getFontData2.apply(this, arguments);
      }

      return _getFontData;
    }()
  }, {
    key: "_computeFontSize",
    value: function _computeFontSize(height, lineCount) {
      var fontSize = this.data.defaultAppearanceData.fontSize;

      if (!fontSize) {
        var roundWithOneDigit = function roundWithOneDigit(x) {
          return Math.round(x * 10) / 10;
        };

        var FONT_FACTOR = 0.8;

        if (lineCount === -1) {
          fontSize = roundWithOneDigit(FONT_FACTOR * height);
        } else {
          fontSize = 10;
          var lineHeight = fontSize / FONT_FACTOR;
          var numberOfLines = Math.round(height / lineHeight);
          numberOfLines = Math.max(numberOfLines, lineCount);
          lineHeight = height / numberOfLines;
          fontSize = roundWithOneDigit(FONT_FACTOR * lineHeight);
        }

        var _this$data$defaultApp2 = this.data.defaultAppearanceData,
            fontName = _this$data$defaultApp2.fontName,
            fontColor = _this$data$defaultApp2.fontColor;
        this._defaultAppearance = (0, _default_appearance.createDefaultAppearance)({
          fontSize: fontSize,
          fontName: fontName,
          fontColor: fontColor
        });
      }

      return [this._defaultAppearance, fontSize];
    }
  }, {
    key: "_renderText",
    value: function _renderText(text, font, fontSize, totalWidth, alignment, hPadding, vPadding) {
      var glyphs = font.charsToGlyphs(text);
      var scale = fontSize / 1000;
      var width = 0;

      var _iterator5 = _createForOfIteratorHelper(glyphs),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var glyph = _step5.value;
          width += glyph.width * scale;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var shift;

      if (alignment === 1) {
        shift = (totalWidth - width) / 2;
      } else if (alignment === 2) {
        shift = totalWidth - width - hPadding;
      } else {
        shift = hPadding;
      }

      shift = shift.toFixed(2);
      vPadding = vPadding.toFixed(2);
      return "".concat(shift, " ").concat(vPadding, " Td (").concat((0, _util.escapeString)(text), ") Tj");
    }
  }, {
    key: "_getSaveFieldResources",
    value: function _getSaveFieldResources(xref) {
      (0, _util.assert)(this.data.defaultAppearanceData, "Expected `_defaultAppearanceData` to have been set.");
      var _this$_fieldResources = this._fieldResources,
          localResources = _this$_fieldResources.localResources,
          appearanceResources = _this$_fieldResources.appearanceResources,
          acroFormResources = _this$_fieldResources.acroFormResources;
      var fontName = this.data.defaultAppearanceData && this.data.defaultAppearanceData.fontName;

      if (!fontName) {
        return localResources || _primitives.Dict.empty;
      }

      for (var _i2 = 0, _arr2 = [localResources, appearanceResources]; _i2 < _arr2.length; _i2++) {
        var resources = _arr2[_i2];

        if (resources instanceof _primitives.Dict) {
          var localFont = resources.get("Font");

          if (localFont instanceof _primitives.Dict && localFont.has(fontName)) {
            return resources;
          }
        }
      }

      if (acroFormResources instanceof _primitives.Dict) {
        var acroFormFont = acroFormResources.get("Font");

        if (acroFormFont instanceof _primitives.Dict && acroFormFont.has(fontName)) {
          var subFontDict = new _primitives.Dict(xref);
          subFontDict.set(fontName, acroFormFont.getRaw(fontName));
          var subResourcesDict = new _primitives.Dict(xref);
          subResourcesDict.set("Font", subFontDict);
          return _primitives.Dict.merge({
            xref: xref,
            dictArray: [subResourcesDict, localResources],
            mergeSubDicts: true
          });
        }
      }

      return localResources || _primitives.Dict.empty;
    }
  }, {
    key: "getFieldObject",
    value: function getFieldObject() {
      return null;
    }
  }]);

  return WidgetAnnotation;
}(Annotation);

var TextWidgetAnnotation = /*#__PURE__*/function (_WidgetAnnotation) {
  _inherits(TextWidgetAnnotation, _WidgetAnnotation);

  var _super3 = _createSuper(TextWidgetAnnotation);

  function TextWidgetAnnotation(params) {
    var _this6;

    _classCallCheck(this, TextWidgetAnnotation);

    _this6 = _super3.call(this, params);
    _this6._hasText = true;
    var dict = params.dict;

    if (!(0, _util.isString)(_this6.data.fieldValue)) {
      _this6.data.fieldValue = "";
    }

    var alignment = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "Q"
    });

    if (!Number.isInteger(alignment) || alignment < 0 || alignment > 2) {
      alignment = null;
    }

    _this6.data.textAlignment = alignment;
    var maximumLength = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "MaxLen"
    });

    if (!Number.isInteger(maximumLength) || maximumLength < 0) {
      maximumLength = null;
    }

    _this6.data.maxLen = maximumLength;
    _this6.data.multiLine = _this6.hasFieldFlag(_util.AnnotationFieldFlag.MULTILINE);
    _this6.data.comb = _this6.hasFieldFlag(_util.AnnotationFieldFlag.COMB) && !_this6.hasFieldFlag(_util.AnnotationFieldFlag.MULTILINE) && !_this6.hasFieldFlag(_util.AnnotationFieldFlag.PASSWORD) && !_this6.hasFieldFlag(_util.AnnotationFieldFlag.FILESELECT) && _this6.data.maxLen !== null;
    return _this6;
  }

  _createClass(TextWidgetAnnotation, [{
    key: "_getCombAppearance",
    value: function _getCombAppearance(defaultAppearance, font, text, width, hPadding, vPadding) {
      var combWidth = (width / this.data.maxLen).toFixed(2);
      var buf = [];
      var positions = font.getCharPositions(text);

      var _iterator6 = _createForOfIteratorHelper(positions),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _step6$value = _slicedToArray(_step6.value, 2),
              start = _step6$value[0],
              end = _step6$value[1];

          buf.push("(".concat((0, _util.escapeString)(text.substring(start, end)), ") Tj"));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      var renderedComb = buf.join(" ".concat(combWidth, " 0 Td "));
      return "/Tx BMC q BT " + defaultAppearance + " 1 0 0 1 ".concat(hPadding, " ").concat(vPadding, " Tm ").concat(renderedComb) + " ET Q EMC";
    }
  }, {
    key: "_getMultilineAppearance",
    value: function _getMultilineAppearance(defaultAppearance, text, font, fontSize, width, height, alignment, hPadding, vPadding) {
      var lines = text.split(/\r\n|\r|\n/);
      var buf = [];
      var totalWidth = width - 2 * hPadding;

      var _iterator7 = _createForOfIteratorHelper(lines),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var line = _step7.value;

          var chunks = this._splitLine(line, font, fontSize, totalWidth);

          var _iterator8 = _createForOfIteratorHelper(chunks),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var chunk = _step8.value;
              var padding = buf.length === 0 ? hPadding : 0;
              buf.push(this._renderText(chunk, font, fontSize, width, alignment, padding, -fontSize));
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      var renderedText = buf.join("\n");
      return "/Tx BMC q BT " + defaultAppearance + " 1 0 0 1 0 ".concat(height, " Tm ").concat(renderedText) + " ET Q EMC";
    }
  }, {
    key: "_splitLine",
    value: function _splitLine(line, font, fontSize, width) {
      line = font.encodeString(line).join("");
      var glyphs = font.charsToGlyphs(line);

      if (glyphs.length <= 1) {
        return [line];
      }

      var positions = font.getCharPositions(line);
      var scale = fontSize / 1000;
      var chunks = [];
      var lastSpacePosInStringStart = -1,
          lastSpacePosInStringEnd = -1,
          lastSpacePos = -1,
          startChunk = 0,
          currentWidth = 0;

      for (var i = 0, ii = glyphs.length; i < ii; i++) {
        var _positions$i = _slicedToArray(positions[i], 2),
            start = _positions$i[0],
            end = _positions$i[1];

        var glyph = glyphs[i];
        var glyphWidth = glyph.width * scale;

        if (glyph.unicode === " ") {
          if (currentWidth + glyphWidth > width) {
            chunks.push(line.substring(startChunk, start));
            startChunk = start;
            currentWidth = glyphWidth;
            lastSpacePosInStringStart = -1;
            lastSpacePos = -1;
          } else {
            currentWidth += glyphWidth;
            lastSpacePosInStringStart = start;
            lastSpacePosInStringEnd = end;
            lastSpacePos = i;
          }
        } else {
          if (currentWidth + glyphWidth > width) {
            if (lastSpacePosInStringStart !== -1) {
              chunks.push(line.substring(startChunk, lastSpacePosInStringEnd));
              startChunk = lastSpacePosInStringEnd;
              i = lastSpacePos + 1;
              lastSpacePosInStringStart = -1;
              currentWidth = 0;
            } else {
              chunks.push(line.substring(startChunk, start));
              startChunk = start;
              currentWidth = glyphWidth;
            }
          } else {
            currentWidth += glyphWidth;
          }
        }
      }

      if (startChunk < line.length) {
        chunks.push(line.substring(startChunk, line.length));
      }

      return chunks;
    }
  }, {
    key: "getFieldObject",
    value: function getFieldObject() {
      return {
        id: this.data.id,
        value: this.data.fieldValue,
        defaultValue: this.data.defaultFieldValue,
        multiline: this.data.multiLine,
        password: this.hasFieldFlag(_util.AnnotationFieldFlag.PASSWORD),
        charLimit: this.data.maxLen,
        comb: this.data.comb,
        editable: !this.data.readOnly,
        hidden: this.data.hidden,
        name: this.data.fieldName,
        rect: this.data.rect,
        actions: this.data.actions,
        page: this.data.pageIndex,
        strokeColor: this.data.borderColor,
        fillColor: this.data.backgroundColor,
        type: "text"
      };
    }
  }]);

  return TextWidgetAnnotation;
}(WidgetAnnotation);

var ButtonWidgetAnnotation = /*#__PURE__*/function (_WidgetAnnotation2) {
  _inherits(ButtonWidgetAnnotation, _WidgetAnnotation2);

  var _super4 = _createSuper(ButtonWidgetAnnotation);

  function ButtonWidgetAnnotation(params) {
    var _this7;

    _classCallCheck(this, ButtonWidgetAnnotation);

    _this7 = _super4.call(this, params);
    _this7.checkedAppearance = null;
    _this7.uncheckedAppearance = null;
    _this7.data.checkBox = !_this7.hasFieldFlag(_util.AnnotationFieldFlag.RADIO) && !_this7.hasFieldFlag(_util.AnnotationFieldFlag.PUSHBUTTON);
    _this7.data.radioButton = _this7.hasFieldFlag(_util.AnnotationFieldFlag.RADIO) && !_this7.hasFieldFlag(_util.AnnotationFieldFlag.PUSHBUTTON);
    _this7.data.pushButton = _this7.hasFieldFlag(_util.AnnotationFieldFlag.PUSHBUTTON);
    _this7.data.isTooltipOnly = false;

    if (_this7.data.checkBox) {
      _this7._processCheckBox(params);
    } else if (_this7.data.radioButton) {
      _this7._processRadioButton(params);
    } else if (_this7.data.pushButton) {
      _this7.data.hasOwnCanvas = true;

      _this7._processPushButton(params);
    } else {
      (0, _util.warn)("Invalid field flags for button widget annotation");
    }

    return _this7;
  }

  _createClass(ButtonWidgetAnnotation, [{
    key: "getOperatorList",
    value: function () {
      var _getOperatorList = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6(evaluator, task, intent, renderForms, annotationStorage) {
        var value, storageEntry, appearance, savedAppearance, operatorList;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.data.pushButton) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", _get(_getPrototypeOf(ButtonWidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, intent, false, annotationStorage));

              case 2:
                value = null;

                if (annotationStorage) {
                  storageEntry = annotationStorage.get(this.data.id);
                  value = storageEntry ? storageEntry.value : null;
                }

                if (!(value === null)) {
                  _context6.next = 8;
                  break;
                }

                if (!this.appearance) {
                  _context6.next = 7;
                  break;
                }

                return _context6.abrupt("return", _get(_getPrototypeOf(ButtonWidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, intent, renderForms, annotationStorage));

              case 7:
                if (this.data.checkBox) {
                  value = this.data.fieldValue === this.data.exportValue;
                } else {
                  value = this.data.fieldValue === this.data.buttonValue;
                }

              case 8:
                appearance = value ? this.checkedAppearance : this.uncheckedAppearance;

                if (!appearance) {
                  _context6.next = 15;
                  break;
                }

                savedAppearance = this.appearance;
                this.appearance = appearance;
                operatorList = _get(_getPrototypeOf(ButtonWidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, intent, renderForms, annotationStorage);
                this.appearance = savedAppearance;
                return _context6.abrupt("return", operatorList);

              case 15:
                return _context6.abrupt("return", new _operator_list.OperatorList());

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getOperatorList(_x15, _x16, _x17, _x18, _x19) {
        return _getOperatorList.apply(this, arguments);
      }

      return getOperatorList;
    }()
  }, {
    key: "save",
    value: function () {
      var _save3 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7(evaluator, task, annotationStorage) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this.data.checkBox) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return", this._saveCheckbox(evaluator, task, annotationStorage));

              case 2:
                if (!this.data.radioButton) {
                  _context7.next = 4;
                  break;
                }

                return _context7.abrupt("return", this._saveRadioButton(evaluator, task, annotationStorage));

              case 4:
                return _context7.abrupt("return", null);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function save(_x20, _x21, _x22) {
        return _save3.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "_saveCheckbox",
    value: function () {
      var _saveCheckbox2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8(evaluator, task, annotationStorage) {
        var storageEntry, value, defaultValue, dict, xfa, name, encrypt, originalTransform, buffer;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (annotationStorage) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return", null);

              case 2:
                storageEntry = annotationStorage.get(this.data.id);
                value = storageEntry && storageEntry.value;

                if (!(value === undefined)) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt("return", null);

              case 6:
                defaultValue = this.data.fieldValue === this.data.exportValue;

                if (!(defaultValue === value)) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return", null);

              case 9:
                dict = evaluator.xref.fetchIfRef(this.ref);

                if ((0, _primitives.isDict)(dict)) {
                  _context8.next = 12;
                  break;
                }

                return _context8.abrupt("return", null);

              case 12:
                xfa = {
                  path: (0, _util.stringToPDFString)(dict.get("T") || ""),
                  value: value ? this.data.exportValue : ""
                };
                name = _primitives.Name.get(value ? this.data.exportValue : "Off");
                dict.set("V", name);
                dict.set("AS", name);
                dict.set("M", "D:".concat((0, _util.getModificationDate)()));
                encrypt = evaluator.xref.encrypt;
                originalTransform = null;

                if (encrypt) {
                  originalTransform = encrypt.createCipherTransform(this.ref.num, this.ref.gen);
                }

                buffer = ["".concat(this.ref.num, " ").concat(this.ref.gen, " obj\n")];
                (0, _writer.writeDict)(dict, buffer, originalTransform);
                buffer.push("\nendobj\n");
                return _context8.abrupt("return", [{
                  ref: this.ref,
                  data: buffer.join(""),
                  xfa: xfa
                }]);

              case 24:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _saveCheckbox(_x23, _x24, _x25) {
        return _saveCheckbox2.apply(this, arguments);
      }

      return _saveCheckbox;
    }()
  }, {
    key: "_saveRadioButton",
    value: function () {
      var _saveRadioButton2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9(evaluator, task, annotationStorage) {
        var storageEntry, value, defaultValue, dict, xfa, name, parentBuffer, encrypt, parent, parentTransform, originalTransform, buffer, newRefs;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (annotationStorage) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return", null);

              case 2:
                storageEntry = annotationStorage.get(this.data.id);
                value = storageEntry && storageEntry.value;

                if (!(value === undefined)) {
                  _context9.next = 6;
                  break;
                }

                return _context9.abrupt("return", null);

              case 6:
                defaultValue = this.data.fieldValue === this.data.buttonValue;

                if (!(defaultValue === value)) {
                  _context9.next = 9;
                  break;
                }

                return _context9.abrupt("return", null);

              case 9:
                dict = evaluator.xref.fetchIfRef(this.ref);

                if ((0, _primitives.isDict)(dict)) {
                  _context9.next = 12;
                  break;
                }

                return _context9.abrupt("return", null);

              case 12:
                xfa = {
                  path: (0, _util.stringToPDFString)(dict.get("T") || ""),
                  value: value ? this.data.buttonValue : ""
                };
                name = _primitives.Name.get(value ? this.data.buttonValue : "Off");
                parentBuffer = null;
                encrypt = evaluator.xref.encrypt;

                if (value) {
                  if ((0, _primitives.isRef)(this.parent)) {
                    parent = evaluator.xref.fetch(this.parent);
                    parentTransform = null;

                    if (encrypt) {
                      parentTransform = encrypt.createCipherTransform(this.parent.num, this.parent.gen);
                    }

                    parent.set("V", name);
                    parentBuffer = ["".concat(this.parent.num, " ").concat(this.parent.gen, " obj\n")];
                    (0, _writer.writeDict)(parent, parentBuffer, parentTransform);
                    parentBuffer.push("\nendobj\n");
                  } else if ((0, _primitives.isDict)(this.parent)) {
                    this.parent.set("V", name);
                  }
                }

                dict.set("AS", name);
                dict.set("M", "D:".concat((0, _util.getModificationDate)()));
                originalTransform = null;

                if (encrypt) {
                  originalTransform = encrypt.createCipherTransform(this.ref.num, this.ref.gen);
                }

                buffer = ["".concat(this.ref.num, " ").concat(this.ref.gen, " obj\n")];
                (0, _writer.writeDict)(dict, buffer, originalTransform);
                buffer.push("\nendobj\n");
                newRefs = [{
                  ref: this.ref,
                  data: buffer.join(""),
                  xfa: xfa
                }];

                if (parentBuffer !== null) {
                  newRefs.push({
                    ref: this.parent,
                    data: parentBuffer.join(""),
                    xfa: null
                  });
                }

                return _context9.abrupt("return", newRefs);

              case 27:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _saveRadioButton(_x26, _x27, _x28) {
        return _saveRadioButton2.apply(this, arguments);
      }

      return _saveRadioButton;
    }()
  }, {
    key: "_getDefaultCheckedAppearance",
    value: function _getDefaultCheckedAppearance(params, type) {
      var width = this.data.rect[2] - this.data.rect[0];
      var height = this.data.rect[3] - this.data.rect[1];
      var bbox = [0, 0, width, height];
      var FONT_RATIO = 0.8;
      var fontSize = Math.min(width, height) * FONT_RATIO;

      var metrics, _char;

      if (type === "check") {
        metrics = {
          width: 0.755 * fontSize,
          height: 0.705 * fontSize
        };
        _char = "\x33";
      } else if (type === "disc") {
        metrics = {
          width: 0.791 * fontSize,
          height: 0.705 * fontSize
        };
        _char = "\x6C";
      } else {
        (0, _util.unreachable)("_getDefaultCheckedAppearance - unsupported type: ".concat(type));
      }

      var xShift = (width - metrics.width) / 2;
      var yShift = (height - metrics.height) / 2;
      var appearance = "q BT /PdfJsZaDb ".concat(fontSize, " Tf 0 g ").concat(xShift, " ").concat(yShift, " Td (").concat(_char, ") Tj ET Q");
      var appearanceStreamDict = new _primitives.Dict(params.xref);
      appearanceStreamDict.set("FormType", 1);
      appearanceStreamDict.set("Subtype", _primitives.Name.get("Form"));
      appearanceStreamDict.set("Type", _primitives.Name.get("XObject"));
      appearanceStreamDict.set("BBox", bbox);
      appearanceStreamDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
      appearanceStreamDict.set("Length", appearance.length);
      var resources = new _primitives.Dict(params.xref);
      var font = new _primitives.Dict(params.xref);
      font.set("PdfJsZaDb", this.fallbackFontDict);
      resources.set("Font", font);
      appearanceStreamDict.set("Resources", resources);
      this.checkedAppearance = new _stream.StringStream(appearance);
      this.checkedAppearance.dict = appearanceStreamDict;

      this._streams.push(this.checkedAppearance);
    }
  }, {
    key: "_processCheckBox",
    value: function _processCheckBox(params) {
      var customAppearance = params.dict.get("AP");

      if (!(0, _primitives.isDict)(customAppearance)) {
        return;
      }

      var normalAppearance = customAppearance.get("N");

      if (!(0, _primitives.isDict)(normalAppearance)) {
        return;
      }

      var asValue = this._decodeFormValue(params.dict.get("AS"));

      if (typeof asValue === "string") {
        this.data.fieldValue = asValue;
      }

      var yes = this.data.fieldValue !== null && this.data.fieldValue !== "Off" ? this.data.fieldValue : "Yes";
      var exportValues = normalAppearance.getKeys();

      if (exportValues.length === 0) {
        exportValues.push("Off", yes);
      } else if (exportValues.length === 1) {
        if (exportValues[0] === "Off") {
          exportValues.push(yes);
        } else {
          exportValues.unshift("Off");
        }
      } else if (exportValues.includes(yes)) {
        exportValues.length = 0;
        exportValues.push("Off", yes);
      } else {
        var otherYes = exportValues.find(function (v) {
          return v !== "Off";
        });
        exportValues.length = 0;
        exportValues.push("Off", otherYes);
      }

      if (!exportValues.includes(this.data.fieldValue)) {
        this.data.fieldValue = "Off";
      }

      this.data.exportValue = exportValues[1];
      this.checkedAppearance = normalAppearance.get(this.data.exportValue) || null;
      this.uncheckedAppearance = normalAppearance.get("Off") || null;

      if (this.checkedAppearance) {
        this._streams.push(this.checkedAppearance);
      } else {
        this._getDefaultCheckedAppearance(params, "check");
      }

      if (this.uncheckedAppearance) {
        this._streams.push(this.uncheckedAppearance);
      }

      this._fallbackFontDict = this.fallbackFontDict;
    }
  }, {
    key: "_processRadioButton",
    value: function _processRadioButton(params) {
      this.data.fieldValue = this.data.buttonValue = null;
      var fieldParent = params.dict.get("Parent");

      if ((0, _primitives.isDict)(fieldParent)) {
        this.parent = params.dict.getRaw("Parent");
        var fieldParentValue = fieldParent.get("V");

        if ((0, _primitives.isName)(fieldParentValue)) {
          this.data.fieldValue = this._decodeFormValue(fieldParentValue);
        }
      }

      var appearanceStates = params.dict.get("AP");

      if (!(0, _primitives.isDict)(appearanceStates)) {
        return;
      }

      var normalAppearance = appearanceStates.get("N");

      if (!(0, _primitives.isDict)(normalAppearance)) {
        return;
      }

      var _iterator9 = _createForOfIteratorHelper(normalAppearance.getKeys()),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var key = _step9.value;

          if (key !== "Off") {
            this.data.buttonValue = this._decodeFormValue(key);
            break;
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      this.checkedAppearance = normalAppearance.get(this.data.buttonValue) || null;
      this.uncheckedAppearance = normalAppearance.get("Off") || null;

      if (this.checkedAppearance) {
        this._streams.push(this.checkedAppearance);
      } else {
        this._getDefaultCheckedAppearance(params, "disc");
      }

      if (this.uncheckedAppearance) {
        this._streams.push(this.uncheckedAppearance);
      }

      this._fallbackFontDict = this.fallbackFontDict;
    }
  }, {
    key: "_processPushButton",
    value: function _processPushButton(params) {
      if (!params.dict.has("A") && !params.dict.has("AA") && !this.data.alternativeText) {
        (0, _util.warn)("Push buttons without action dictionaries are not supported");
        return;
      }

      this.data.isTooltipOnly = !params.dict.has("A") && !params.dict.has("AA");

      _catalog.Catalog.parseDestDictionary({
        destDict: params.dict,
        resultObj: this.data,
        docBaseUrl: params.pdfManager.docBaseUrl
      });
    }
  }, {
    key: "getFieldObject",
    value: function getFieldObject() {
      var type = "button";
      var exportValues;

      if (this.data.checkBox) {
        type = "checkbox";
        exportValues = this.data.exportValue;
      } else if (this.data.radioButton) {
        type = "radiobutton";
        exportValues = this.data.buttonValue;
      }

      return {
        id: this.data.id,
        value: this.data.fieldValue || "Off",
        defaultValue: this.data.defaultFieldValue,
        exportValues: exportValues,
        editable: !this.data.readOnly,
        name: this.data.fieldName,
        rect: this.data.rect,
        hidden: this.data.hidden,
        actions: this.data.actions,
        page: this.data.pageIndex,
        strokeColor: this.data.borderColor,
        fillColor: this.data.backgroundColor,
        type: type
      };
    }
  }, {
    key: "fallbackFontDict",
    get: function get() {
      var dict = new _primitives.Dict();
      dict.set("BaseFont", _primitives.Name.get("ZapfDingbats"));
      dict.set("Type", _primitives.Name.get("FallbackType"));
      dict.set("Subtype", _primitives.Name.get("FallbackType"));
      dict.set("Encoding", _primitives.Name.get("ZapfDingbatsEncoding"));
      return (0, _util.shadow)(this, "fallbackFontDict", dict);
    }
  }]);

  return ButtonWidgetAnnotation;
}(WidgetAnnotation);

var ChoiceWidgetAnnotation = /*#__PURE__*/function (_WidgetAnnotation3) {
  _inherits(ChoiceWidgetAnnotation, _WidgetAnnotation3);

  var _super5 = _createSuper(ChoiceWidgetAnnotation);

  function ChoiceWidgetAnnotation(params) {
    var _this8;

    _classCallCheck(this, ChoiceWidgetAnnotation);

    _this8 = _super5.call(this, params);
    _this8.data.options = [];
    var options = (0, _core_utils.getInheritableProperty)({
      dict: params.dict,
      key: "Opt"
    });

    if (Array.isArray(options)) {
      var xref = params.xref;

      for (var i = 0, ii = options.length; i < ii; i++) {
        var option = xref.fetchIfRef(options[i]);
        var isOptionArray = Array.isArray(option);
        _this8.data.options[i] = {
          exportValue: _this8._decodeFormValue(isOptionArray ? xref.fetchIfRef(option[0]) : option),
          displayValue: _this8._decodeFormValue(isOptionArray ? xref.fetchIfRef(option[1]) : option)
        };
      }
    }

    if ((0, _util.isString)(_this8.data.fieldValue)) {
      _this8.data.fieldValue = [_this8.data.fieldValue];
    } else if (!_this8.data.fieldValue) {
      _this8.data.fieldValue = [];
    }

    _this8.data.combo = _this8.hasFieldFlag(_util.AnnotationFieldFlag.COMBO);
    _this8.data.multiSelect = _this8.hasFieldFlag(_util.AnnotationFieldFlag.MULTISELECT);
    _this8._hasText = true;
    return _this8;
  }

  _createClass(ChoiceWidgetAnnotation, [{
    key: "getFieldObject",
    value: function getFieldObject() {
      var type = this.data.combo ? "combobox" : "listbox";
      var value = this.data.fieldValue.length > 0 ? this.data.fieldValue[0] : null;
      return {
        id: this.data.id,
        value: value,
        defaultValue: this.data.defaultFieldValue,
        editable: !this.data.readOnly,
        name: this.data.fieldName,
        rect: this.data.rect,
        numItems: this.data.fieldValue.length,
        multipleSelection: this.data.multiSelect,
        hidden: this.data.hidden,
        actions: this.data.actions,
        items: this.data.options,
        page: this.data.pageIndex,
        strokeColor: this.data.borderColor,
        fillColor: this.data.backgroundColor,
        type: type
      };
    }
  }]);

  return ChoiceWidgetAnnotation;
}(WidgetAnnotation);

var SignatureWidgetAnnotation = /*#__PURE__*/function (_WidgetAnnotation4) {
  _inherits(SignatureWidgetAnnotation, _WidgetAnnotation4);

  var _super6 = _createSuper(SignatureWidgetAnnotation);

  function SignatureWidgetAnnotation(params) {
    var _this9;

    _classCallCheck(this, SignatureWidgetAnnotation);

    _this9 = _super6.call(this, params);
    _this9.data.fieldValue = null;
    return _this9;
  }

  _createClass(SignatureWidgetAnnotation, [{
    key: "getFieldObject",
    value: function getFieldObject() {
      return {
        id: this.data.id,
        value: null,
        page: this.data.pageIndex,
        type: "signature"
      };
    }
  }]);

  return SignatureWidgetAnnotation;
}(WidgetAnnotation);

var TextAnnotation = /*#__PURE__*/function (_MarkupAnnotation) {
  _inherits(TextAnnotation, _MarkupAnnotation);

  var _super7 = _createSuper(TextAnnotation);

  function TextAnnotation(parameters) {
    var _this10;

    _classCallCheck(this, TextAnnotation);

    var DEFAULT_ICON_SIZE = 22;
    _this10 = _super7.call(this, parameters);
    var dict = parameters.dict;
    _this10.data.annotationType = _util.AnnotationType.TEXT;

    if (_this10.data.hasAppearance) {
      _this10.data.name = "NoIcon";
    } else {
      _this10.data.rect[1] = _this10.data.rect[3] - DEFAULT_ICON_SIZE;
      _this10.data.rect[2] = _this10.data.rect[0] + DEFAULT_ICON_SIZE;
      _this10.data.name = dict.has("Name") ? dict.get("Name").name : "Note";
    }

    if (dict.has("State")) {
      _this10.data.state = dict.get("State") || null;
      _this10.data.stateModel = dict.get("StateModel") || null;
    } else {
      _this10.data.state = null;
      _this10.data.stateModel = null;
    }

    return _this10;
  }

  return _createClass(TextAnnotation);
}(MarkupAnnotation);

var LinkAnnotation = /*#__PURE__*/function (_Annotation3) {
  _inherits(LinkAnnotation, _Annotation3);

  var _super8 = _createSuper(LinkAnnotation);

  function LinkAnnotation(params) {
    var _this11;

    _classCallCheck(this, LinkAnnotation);

    _this11 = _super8.call(this, params);
    _this11.data.annotationType = _util.AnnotationType.LINK;
    var quadPoints = getQuadPoints(params.dict, _this11.rectangle);

    if (quadPoints) {
      _this11.data.quadPoints = quadPoints;
    }

    _catalog.Catalog.parseDestDictionary({
      destDict: params.dict,
      resultObj: _this11.data,
      docBaseUrl: params.pdfManager.docBaseUrl
    });

    return _this11;
  }

  return _createClass(LinkAnnotation);
}(Annotation);

var PopupAnnotation = /*#__PURE__*/function (_Annotation4) {
  _inherits(PopupAnnotation, _Annotation4);

  var _super9 = _createSuper(PopupAnnotation);

  function PopupAnnotation(parameters) {
    var _this12;

    _classCallCheck(this, PopupAnnotation);

    _this12 = _super9.call(this, parameters);
    _this12.data.annotationType = _util.AnnotationType.POPUP;
    var parentItem = parameters.dict.get("Parent");

    if (!parentItem) {
      (0, _util.warn)("Popup annotation has a missing or invalid parent annotation.");
      return _possibleConstructorReturn(_this12);
    }

    var parentSubtype = parentItem.get("Subtype");
    _this12.data.parentType = (0, _primitives.isName)(parentSubtype) ? parentSubtype.name : null;
    var rawParent = parameters.dict.getRaw("Parent");
    _this12.data.parentId = (0, _primitives.isRef)(rawParent) ? rawParent.toString() : null;
    var parentRect = parentItem.getArray("Rect");

    if (Array.isArray(parentRect) && parentRect.length === 4) {
      _this12.data.parentRect = _util.Util.normalizeRect(parentRect);
    } else {
      _this12.data.parentRect = [0, 0, 0, 0];
    }

    var rt = parentItem.get("RT");

    if ((0, _primitives.isName)(rt, _util.AnnotationReplyType.GROUP)) {
      parentItem = parentItem.get("IRT");
    }

    if (!parentItem.has("M")) {
      _this12.data.modificationDate = null;
    } else {
      _this12.setModificationDate(parentItem.get("M"));

      _this12.data.modificationDate = _this12.modificationDate;
    }

    if (!parentItem.has("C")) {
      _this12.data.color = null;
    } else {
      _this12.setColor(parentItem.getArray("C"));

      _this12.data.color = _this12.color;
    }

    if (!_this12.viewable) {
      var parentFlags = parentItem.get("F");

      if (_this12._isViewable(parentFlags)) {
        _this12.setFlags(parentFlags);
      }
    }

    _this12.setTitle(parentItem.get("T"));

    _this12.data.titleObj = _this12._title;

    _this12.setContents(parentItem.get("Contents"));

    _this12.data.contentsObj = _this12._contents;

    if (parentItem.has("RC")) {
      _this12.data.richText = _factory.XFAFactory.getRichTextAsHtml(parentItem.get("RC"));
    }

    return _this12;
  }

  return _createClass(PopupAnnotation);
}(Annotation);

var FreeTextAnnotation = /*#__PURE__*/function (_MarkupAnnotation2) {
  _inherits(FreeTextAnnotation, _MarkupAnnotation2);

  var _super10 = _createSuper(FreeTextAnnotation);

  function FreeTextAnnotation(parameters) {
    var _this13;

    _classCallCheck(this, FreeTextAnnotation);

    _this13 = _super10.call(this, parameters);
    _this13.data.annotationType = _util.AnnotationType.FREETEXT;
    return _this13;
  }

  return _createClass(FreeTextAnnotation);
}(MarkupAnnotation);

var LineAnnotation = /*#__PURE__*/function (_MarkupAnnotation3) {
  _inherits(LineAnnotation, _MarkupAnnotation3);

  var _super11 = _createSuper(LineAnnotation);

  function LineAnnotation(parameters) {
    var _this14;

    _classCallCheck(this, LineAnnotation);

    _this14 = _super11.call(this, parameters);
    _this14.data.annotationType = _util.AnnotationType.LINE;
    var lineCoordinates = parameters.dict.getArray("L");
    _this14.data.lineCoordinates = _util.Util.normalizeRect(lineCoordinates);

    if (!_this14.appearance) {
      var strokeColor = _this14.color ? Array.from(_this14.color).map(function (c) {
        return c / 255;
      }) : [0, 0, 0];
      var strokeAlpha = parameters.dict.get("CA");
      var fillColor = null,
          interiorColor = parameters.dict.getArray("IC");

      if (interiorColor) {
        interiorColor = getRgbColor(interiorColor, null);
        fillColor = interiorColor ? Array.from(interiorColor).map(function (c) {
          return c / 255;
        }) : null;
      }

      var fillAlpha = fillColor ? strokeAlpha : null;
      var borderWidth = _this14.borderStyle.width || 1,
          borderAdjust = 2 * borderWidth;
      var bbox = [_this14.data.lineCoordinates[0] - borderAdjust, _this14.data.lineCoordinates[1] - borderAdjust, _this14.data.lineCoordinates[2] + borderAdjust, _this14.data.lineCoordinates[3] + borderAdjust];

      if (!_util.Util.intersect(_this14.rectangle, bbox)) {
        _this14.rectangle = bbox;
      }

      _this14._setDefaultAppearance({
        xref: parameters.xref,
        extra: "".concat(borderWidth, " w"),
        strokeColor: strokeColor,
        fillColor: fillColor,
        strokeAlpha: strokeAlpha,
        fillAlpha: fillAlpha,
        pointsCallback: function pointsCallback(buffer, points) {
          buffer.push("".concat(lineCoordinates[0], " ").concat(lineCoordinates[1], " m"), "".concat(lineCoordinates[2], " ").concat(lineCoordinates[3], " l"), "S");
          return [points[0].x - borderWidth, points[1].x + borderWidth, points[3].y - borderWidth, points[1].y + borderWidth];
        }
      });
    }

    return _this14;
  }

  return _createClass(LineAnnotation);
}(MarkupAnnotation);

var SquareAnnotation = /*#__PURE__*/function (_MarkupAnnotation4) {
  _inherits(SquareAnnotation, _MarkupAnnotation4);

  var _super12 = _createSuper(SquareAnnotation);

  function SquareAnnotation(parameters) {
    var _this15;

    _classCallCheck(this, SquareAnnotation);

    _this15 = _super12.call(this, parameters);
    _this15.data.annotationType = _util.AnnotationType.SQUARE;

    if (!_this15.appearance) {
      var strokeColor = _this15.color ? Array.from(_this15.color).map(function (c) {
        return c / 255;
      }) : [0, 0, 0];
      var strokeAlpha = parameters.dict.get("CA");
      var fillColor = null,
          interiorColor = parameters.dict.getArray("IC");

      if (interiorColor) {
        interiorColor = getRgbColor(interiorColor, null);
        fillColor = interiorColor ? Array.from(interiorColor).map(function (c) {
          return c / 255;
        }) : null;
      }

      var fillAlpha = fillColor ? strokeAlpha : null;

      if (_this15.borderStyle.width === 0 && !fillColor) {
        return _possibleConstructorReturn(_this15);
      }

      _this15._setDefaultAppearance({
        xref: parameters.xref,
        extra: "".concat(_this15.borderStyle.width, " w"),
        strokeColor: strokeColor,
        fillColor: fillColor,
        strokeAlpha: strokeAlpha,
        fillAlpha: fillAlpha,
        pointsCallback: function pointsCallback(buffer, points) {
          var x = points[2].x + _this15.borderStyle.width / 2;
          var y = points[2].y + _this15.borderStyle.width / 2;
          var width = points[3].x - points[2].x - _this15.borderStyle.width;
          var height = points[1].y - points[3].y - _this15.borderStyle.width;
          buffer.push("".concat(x, " ").concat(y, " ").concat(width, " ").concat(height, " re"));

          if (fillColor) {
            buffer.push("B");
          } else {
            buffer.push("S");
          }

          return [points[0].x, points[1].x, points[3].y, points[1].y];
        }
      });
    }

    return _this15;
  }

  return _createClass(SquareAnnotation);
}(MarkupAnnotation);

var CircleAnnotation = /*#__PURE__*/function (_MarkupAnnotation5) {
  _inherits(CircleAnnotation, _MarkupAnnotation5);

  var _super13 = _createSuper(CircleAnnotation);

  function CircleAnnotation(parameters) {
    var _this16;

    _classCallCheck(this, CircleAnnotation);

    _this16 = _super13.call(this, parameters);
    _this16.data.annotationType = _util.AnnotationType.CIRCLE;

    if (!_this16.appearance) {
      var strokeColor = _this16.color ? Array.from(_this16.color).map(function (c) {
        return c / 255;
      }) : [0, 0, 0];
      var strokeAlpha = parameters.dict.get("CA");
      var fillColor = null;
      var interiorColor = parameters.dict.getArray("IC");

      if (interiorColor) {
        interiorColor = getRgbColor(interiorColor, null);
        fillColor = interiorColor ? Array.from(interiorColor).map(function (c) {
          return c / 255;
        }) : null;
      }

      var fillAlpha = fillColor ? strokeAlpha : null;

      if (_this16.borderStyle.width === 0 && !fillColor) {
        return _possibleConstructorReturn(_this16);
      }

      var controlPointsDistance = 4 / 3 * Math.tan(Math.PI / (2 * 4));

      _this16._setDefaultAppearance({
        xref: parameters.xref,
        extra: "".concat(_this16.borderStyle.width, " w"),
        strokeColor: strokeColor,
        fillColor: fillColor,
        strokeAlpha: strokeAlpha,
        fillAlpha: fillAlpha,
        pointsCallback: function pointsCallback(buffer, points) {
          var x0 = points[0].x + _this16.borderStyle.width / 2;
          var y0 = points[0].y - _this16.borderStyle.width / 2;
          var x1 = points[3].x - _this16.borderStyle.width / 2;
          var y1 = points[3].y + _this16.borderStyle.width / 2;
          var xMid = x0 + (x1 - x0) / 2;
          var yMid = y0 + (y1 - y0) / 2;
          var xOffset = (x1 - x0) / 2 * controlPointsDistance;
          var yOffset = (y1 - y0) / 2 * controlPointsDistance;
          buffer.push("".concat(xMid, " ").concat(y1, " m"), "".concat(xMid + xOffset, " ").concat(y1, " ").concat(x1, " ").concat(yMid + yOffset, " ").concat(x1, " ").concat(yMid, " c"), "".concat(x1, " ").concat(yMid - yOffset, " ").concat(xMid + xOffset, " ").concat(y0, " ").concat(xMid, " ").concat(y0, " c"), "".concat(xMid - xOffset, " ").concat(y0, " ").concat(x0, " ").concat(yMid - yOffset, " ").concat(x0, " ").concat(yMid, " c"), "".concat(x0, " ").concat(yMid + yOffset, " ").concat(xMid - xOffset, " ").concat(y1, " ").concat(xMid, " ").concat(y1, " c"), "h");

          if (fillColor) {
            buffer.push("B");
          } else {
            buffer.push("S");
          }

          return [points[0].x, points[1].x, points[3].y, points[1].y];
        }
      });
    }

    return _this16;
  }

  return _createClass(CircleAnnotation);
}(MarkupAnnotation);

var PolylineAnnotation = /*#__PURE__*/function (_MarkupAnnotation6) {
  _inherits(PolylineAnnotation, _MarkupAnnotation6);

  var _super14 = _createSuper(PolylineAnnotation);

  function PolylineAnnotation(parameters) {
    var _this17;

    _classCallCheck(this, PolylineAnnotation);

    _this17 = _super14.call(this, parameters);
    _this17.data.annotationType = _util.AnnotationType.POLYLINE;
    _this17.data.vertices = [];
    var rawVertices = parameters.dict.getArray("Vertices");

    if (!Array.isArray(rawVertices)) {
      return _possibleConstructorReturn(_this17);
    }

    for (var i = 0, ii = rawVertices.length; i < ii; i += 2) {
      _this17.data.vertices.push({
        x: rawVertices[i],
        y: rawVertices[i + 1]
      });
    }

    if (!_this17.appearance) {
      var strokeColor = _this17.color ? Array.from(_this17.color).map(function (c) {
        return c / 255;
      }) : [0, 0, 0];
      var strokeAlpha = parameters.dict.get("CA");
      var borderWidth = _this17.borderStyle.width || 1,
          borderAdjust = 2 * borderWidth;
      var bbox = [Infinity, Infinity, -Infinity, -Infinity];

      var _iterator10 = _createForOfIteratorHelper(_this17.data.vertices),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var vertex = _step10.value;
          bbox[0] = Math.min(bbox[0], vertex.x - borderAdjust);
          bbox[1] = Math.min(bbox[1], vertex.y - borderAdjust);
          bbox[2] = Math.max(bbox[2], vertex.x + borderAdjust);
          bbox[3] = Math.max(bbox[3], vertex.y + borderAdjust);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      if (!_util.Util.intersect(_this17.rectangle, bbox)) {
        _this17.rectangle = bbox;
      }

      _this17._setDefaultAppearance({
        xref: parameters.xref,
        extra: "".concat(borderWidth, " w"),
        strokeColor: strokeColor,
        strokeAlpha: strokeAlpha,
        pointsCallback: function pointsCallback(buffer, points) {
          var vertices = _this17.data.vertices;

          for (var _i3 = 0, _ii = vertices.length; _i3 < _ii; _i3++) {
            buffer.push("".concat(vertices[_i3].x, " ").concat(vertices[_i3].y, " ").concat(_i3 === 0 ? "m" : "l"));
          }

          buffer.push("S");
          return [points[0].x, points[1].x, points[3].y, points[1].y];
        }
      });
    }

    return _this17;
  }

  return _createClass(PolylineAnnotation);
}(MarkupAnnotation);

var PolygonAnnotation = /*#__PURE__*/function (_PolylineAnnotation) {
  _inherits(PolygonAnnotation, _PolylineAnnotation);

  var _super15 = _createSuper(PolygonAnnotation);

  function PolygonAnnotation(parameters) {
    var _this18;

    _classCallCheck(this, PolygonAnnotation);

    _this18 = _super15.call(this, parameters);
    _this18.data.annotationType = _util.AnnotationType.POLYGON;
    return _this18;
  }

  return _createClass(PolygonAnnotation);
}(PolylineAnnotation);

var CaretAnnotation = /*#__PURE__*/function (_MarkupAnnotation7) {
  _inherits(CaretAnnotation, _MarkupAnnotation7);

  var _super16 = _createSuper(CaretAnnotation);

  function CaretAnnotation(parameters) {
    var _this19;

    _classCallCheck(this, CaretAnnotation);

    _this19 = _super16.call(this, parameters);
    _this19.data.annotationType = _util.AnnotationType.CARET;
    return _this19;
  }

  return _createClass(CaretAnnotation);
}(MarkupAnnotation);

var InkAnnotation = /*#__PURE__*/function (_MarkupAnnotation8) {
  _inherits(InkAnnotation, _MarkupAnnotation8);

  var _super17 = _createSuper(InkAnnotation);

  function InkAnnotation(parameters) {
    var _this20;

    _classCallCheck(this, InkAnnotation);

    _this20 = _super17.call(this, parameters);
    _this20.data.annotationType = _util.AnnotationType.INK;
    _this20.data.inkLists = [];
    var rawInkLists = parameters.dict.getArray("InkList");

    if (!Array.isArray(rawInkLists)) {
      return _possibleConstructorReturn(_this20);
    }

    var xref = parameters.xref;

    for (var i = 0, ii = rawInkLists.length; i < ii; ++i) {
      _this20.data.inkLists.push([]);

      for (var j = 0, jj = rawInkLists[i].length; j < jj; j += 2) {
        _this20.data.inkLists[i].push({
          x: xref.fetchIfRef(rawInkLists[i][j]),
          y: xref.fetchIfRef(rawInkLists[i][j + 1])
        });
      }
    }

    if (!_this20.appearance) {
      var strokeColor = _this20.color ? Array.from(_this20.color).map(function (c) {
        return c / 255;
      }) : [0, 0, 0];
      var strokeAlpha = parameters.dict.get("CA");
      var borderWidth = _this20.borderStyle.width || 1,
          borderAdjust = 2 * borderWidth;
      var bbox = [Infinity, Infinity, -Infinity, -Infinity];

      var _iterator11 = _createForOfIteratorHelper(_this20.data.inkLists),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var inkLists = _step11.value;

          var _iterator13 = _createForOfIteratorHelper(inkLists),
              _step13;

          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var vertex = _step13.value;
              bbox[0] = Math.min(bbox[0], vertex.x - borderAdjust);
              bbox[1] = Math.min(bbox[1], vertex.y - borderAdjust);
              bbox[2] = Math.max(bbox[2], vertex.x + borderAdjust);
              bbox[3] = Math.max(bbox[3], vertex.y + borderAdjust);
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      if (!_util.Util.intersect(_this20.rectangle, bbox)) {
        _this20.rectangle = bbox;
      }

      _this20._setDefaultAppearance({
        xref: parameters.xref,
        extra: "".concat(borderWidth, " w"),
        strokeColor: strokeColor,
        strokeAlpha: strokeAlpha,
        pointsCallback: function pointsCallback(buffer, points) {
          var _iterator12 = _createForOfIteratorHelper(_this20.data.inkLists),
              _step12;

          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var inkList = _step12.value;

              for (var _i4 = 0, _ii2 = inkList.length; _i4 < _ii2; _i4++) {
                buffer.push("".concat(inkList[_i4].x, " ").concat(inkList[_i4].y, " ").concat(_i4 === 0 ? "m" : "l"));
              }

              buffer.push("S");
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }

          return [points[0].x, points[1].x, points[3].y, points[1].y];
        }
      });
    }

    return _this20;
  }

  return _createClass(InkAnnotation);
}(MarkupAnnotation);

var HighlightAnnotation = /*#__PURE__*/function (_MarkupAnnotation9) {
  _inherits(HighlightAnnotation, _MarkupAnnotation9);

  var _super18 = _createSuper(HighlightAnnotation);

  function HighlightAnnotation(parameters) {
    var _this21;

    _classCallCheck(this, HighlightAnnotation);

    _this21 = _super18.call(this, parameters);
    _this21.data.annotationType = _util.AnnotationType.HIGHLIGHT;
    var quadPoints = _this21.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      var resources = _this21.appearance && _this21.appearance.dict.get("Resources");

      if (!_this21.appearance || !(resources && resources.has("ExtGState"))) {
        if (_this21.appearance) {
          (0, _util.warn)("HighlightAnnotation - ignoring built-in appearance stream.");
        }

        var fillColor = _this21.color ? Array.from(_this21.color).map(function (c) {
          return c / 255;
        }) : [1, 1, 0];
        var fillAlpha = parameters.dict.get("CA");

        _this21._setDefaultAppearance({
          xref: parameters.xref,
          fillColor: fillColor,
          blendMode: "Multiply",
          fillAlpha: fillAlpha,
          pointsCallback: function pointsCallback(buffer, points) {
            buffer.push("".concat(points[0].x, " ").concat(points[0].y, " m"), "".concat(points[1].x, " ").concat(points[1].y, " l"), "".concat(points[3].x, " ").concat(points[3].y, " l"), "".concat(points[2].x, " ").concat(points[2].y, " l"), "f");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      _this21.data.hasPopup = false;
    }

    return _this21;
  }

  return _createClass(HighlightAnnotation);
}(MarkupAnnotation);

var UnderlineAnnotation = /*#__PURE__*/function (_MarkupAnnotation10) {
  _inherits(UnderlineAnnotation, _MarkupAnnotation10);

  var _super19 = _createSuper(UnderlineAnnotation);

  function UnderlineAnnotation(parameters) {
    var _this22;

    _classCallCheck(this, UnderlineAnnotation);

    _this22 = _super19.call(this, parameters);
    _this22.data.annotationType = _util.AnnotationType.UNDERLINE;
    var quadPoints = _this22.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!_this22.appearance) {
        var strokeColor = _this22.color ? Array.from(_this22.color).map(function (c) {
          return c / 255;
        }) : [0, 0, 0];
        var strokeAlpha = parameters.dict.get("CA");

        _this22._setDefaultAppearance({
          xref: parameters.xref,
          extra: "[] 0 d 1 w",
          strokeColor: strokeColor,
          strokeAlpha: strokeAlpha,
          pointsCallback: function pointsCallback(buffer, points) {
            buffer.push("".concat(points[2].x, " ").concat(points[2].y, " m"), "".concat(points[3].x, " ").concat(points[3].y, " l"), "S");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      _this22.data.hasPopup = false;
    }

    return _this22;
  }

  return _createClass(UnderlineAnnotation);
}(MarkupAnnotation);

var SquigglyAnnotation = /*#__PURE__*/function (_MarkupAnnotation11) {
  _inherits(SquigglyAnnotation, _MarkupAnnotation11);

  var _super20 = _createSuper(SquigglyAnnotation);

  function SquigglyAnnotation(parameters) {
    var _this23;

    _classCallCheck(this, SquigglyAnnotation);

    _this23 = _super20.call(this, parameters);
    _this23.data.annotationType = _util.AnnotationType.SQUIGGLY;
    var quadPoints = _this23.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!_this23.appearance) {
        var strokeColor = _this23.color ? Array.from(_this23.color).map(function (c) {
          return c / 255;
        }) : [0, 0, 0];
        var strokeAlpha = parameters.dict.get("CA");

        _this23._setDefaultAppearance({
          xref: parameters.xref,
          extra: "[] 0 d 1 w",
          strokeColor: strokeColor,
          strokeAlpha: strokeAlpha,
          pointsCallback: function pointsCallback(buffer, points) {
            var dy = (points[0].y - points[2].y) / 6;
            var shift = dy;
            var x = points[2].x;
            var y = points[2].y;
            var xEnd = points[3].x;
            buffer.push("".concat(x, " ").concat(y + shift, " m"));

            do {
              x += 2;
              shift = shift === 0 ? dy : 0;
              buffer.push("".concat(x, " ").concat(y + shift, " l"));
            } while (x < xEnd);

            buffer.push("S");
            return [points[2].x, xEnd, y - 2 * dy, y + 2 * dy];
          }
        });
      }
    } else {
      _this23.data.hasPopup = false;
    }

    return _this23;
  }

  return _createClass(SquigglyAnnotation);
}(MarkupAnnotation);

var StrikeOutAnnotation = /*#__PURE__*/function (_MarkupAnnotation12) {
  _inherits(StrikeOutAnnotation, _MarkupAnnotation12);

  var _super21 = _createSuper(StrikeOutAnnotation);

  function StrikeOutAnnotation(parameters) {
    var _this24;

    _classCallCheck(this, StrikeOutAnnotation);

    _this24 = _super21.call(this, parameters);
    _this24.data.annotationType = _util.AnnotationType.STRIKEOUT;
    var quadPoints = _this24.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!_this24.appearance) {
        var strokeColor = _this24.color ? Array.from(_this24.color).map(function (c) {
          return c / 255;
        }) : [0, 0, 0];
        var strokeAlpha = parameters.dict.get("CA");

        _this24._setDefaultAppearance({
          xref: parameters.xref,
          extra: "[] 0 d 1 w",
          strokeColor: strokeColor,
          strokeAlpha: strokeAlpha,
          pointsCallback: function pointsCallback(buffer, points) {
            buffer.push("".concat((points[0].x + points[2].x) / 2, " ") + "".concat((points[0].y + points[2].y) / 2, " m"), "".concat((points[1].x + points[3].x) / 2, " ") + "".concat((points[1].y + points[3].y) / 2, " l"), "S");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      _this24.data.hasPopup = false;
    }

    return _this24;
  }

  return _createClass(StrikeOutAnnotation);
}(MarkupAnnotation);

var StampAnnotation = /*#__PURE__*/function (_MarkupAnnotation13) {
  _inherits(StampAnnotation, _MarkupAnnotation13);

  var _super22 = _createSuper(StampAnnotation);

  function StampAnnotation(parameters) {
    var _this25;

    _classCallCheck(this, StampAnnotation);

    _this25 = _super22.call(this, parameters);
    _this25.data.annotationType = _util.AnnotationType.STAMP;
    return _this25;
  }

  return _createClass(StampAnnotation);
}(MarkupAnnotation);

var FileAttachmentAnnotation = /*#__PURE__*/function (_MarkupAnnotation14) {
  _inherits(FileAttachmentAnnotation, _MarkupAnnotation14);

  var _super23 = _createSuper(FileAttachmentAnnotation);

  function FileAttachmentAnnotation(parameters) {
    var _this26;

    _classCallCheck(this, FileAttachmentAnnotation);

    _this26 = _super23.call(this, parameters);
    var file = new _file_spec.FileSpec(parameters.dict.get("FS"), parameters.xref);
    _this26.data.annotationType = _util.AnnotationType.FILEATTACHMENT;
    _this26.data.file = file.serializable;
    return _this26;
  }

  return _createClass(FileAttachmentAnnotation);
}(MarkupAnnotation);