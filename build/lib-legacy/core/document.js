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
exports.Page = exports.PDFDocument = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

var _core_utils = require("./core_utils.js");

var _xfa_fonts = require("./xfa_fonts.js");

var _stream = require("./stream.js");

var _annotation = require("./annotation.js");

var _base_stream = require("./base_stream.js");

var _crypto = require("./crypto.js");

var _catalog = require("./catalog.js");

var _parser = require("./parser.js");

var _object_loader = require("./object_loader.js");

var _operator_list = require("./operator_list.js");

var _evaluator = require("./evaluator.js");

var _decode_stream = require("./decode_stream.js");

var _struct_tree = require("./struct_tree.js");

var _factory = require("./xfa/factory.js");

var _xref = require("./xref.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_USER_UNIT = 1.0;
var LETTER_SIZE_MEDIABOX = [0, 0, 612, 792];

var Page = /*#__PURE__*/function () {
  function Page(_ref) {
    var pdfManager = _ref.pdfManager,
        xref = _ref.xref,
        pageIndex = _ref.pageIndex,
        pageDict = _ref.pageDict,
        ref = _ref.ref,
        globalIdFactory = _ref.globalIdFactory,
        fontCache = _ref.fontCache,
        builtInCMapCache = _ref.builtInCMapCache,
        standardFontDataCache = _ref.standardFontDataCache,
        globalImageCache = _ref.globalImageCache,
        nonBlendModesSet = _ref.nonBlendModesSet,
        xfaFactory = _ref.xfaFactory;

    _classCallCheck(this, Page);

    this.pdfManager = pdfManager;
    this.pageIndex = pageIndex;
    this.pageDict = pageDict;
    this.xref = xref;
    this.ref = ref;
    this.fontCache = fontCache;
    this.builtInCMapCache = builtInCMapCache;
    this.standardFontDataCache = standardFontDataCache;
    this.globalImageCache = globalImageCache;
    this.nonBlendModesSet = nonBlendModesSet;
    this.evaluatorOptions = pdfManager.evaluatorOptions;
    this.resourcesPromise = null;
    this.xfaFactory = xfaFactory;
    var idCounters = {
      obj: 0
    };

    this._localIdFactory = /*#__PURE__*/function (_globalIdFactory) {
      _inherits(_class, _globalIdFactory);

      var _super = _createSuper(_class);

      function _class() {
        _classCallCheck(this, _class);

        return _super.apply(this, arguments);
      }

      _createClass(_class, null, [{
        key: "createObjId",
        value: function createObjId() {
          return "p".concat(pageIndex, "_").concat(++idCounters.obj);
        }
      }, {
        key: "getPageObjId",
        value: function getPageObjId() {
          return "page".concat(ref.toString());
        }
      }]);

      return _class;
    }(globalIdFactory);
  }

  _createClass(Page, [{
    key: "_getInheritableProperty",
    value: function _getInheritableProperty(key) {
      var getArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var value = (0, _core_utils.getInheritableProperty)({
        dict: this.pageDict,
        key: key,
        getArray: getArray,
        stopWhenFound: false
      });

      if (!Array.isArray(value)) {
        return value;
      }

      if (value.length === 1 || !(0, _primitives.isDict)(value[0])) {
        return value[0];
      }

      return _primitives.Dict.merge({
        xref: this.xref,
        dictArray: value
      });
    }
  }, {
    key: "content",
    get: function get() {
      return this.pageDict.getArray("Contents");
    }
  }, {
    key: "resources",
    get: function get() {
      return (0, _util.shadow)(this, "resources", this._getInheritableProperty("Resources") || _primitives.Dict.empty);
    }
  }, {
    key: "_getBoundingBox",
    value: function _getBoundingBox(name) {
      if (this.xfaData) {
        return this.xfaData.bbox;
      }

      var box = this._getInheritableProperty(name, true);

      if (Array.isArray(box) && box.length === 4) {
        if (box[2] - box[0] !== 0 && box[3] - box[1] !== 0) {
          return box;
        }

        (0, _util.warn)("Empty /".concat(name, " entry."));
      }

      return null;
    }
  }, {
    key: "mediaBox",
    get: function get() {
      return (0, _util.shadow)(this, "mediaBox", this._getBoundingBox("MediaBox") || LETTER_SIZE_MEDIABOX);
    }
  }, {
    key: "cropBox",
    get: function get() {
      return (0, _util.shadow)(this, "cropBox", this._getBoundingBox("CropBox") || this.mediaBox);
    }
  }, {
    key: "userUnit",
    get: function get() {
      var obj = this.pageDict.get("UserUnit");

      if (!(0, _util.isNum)(obj) || obj <= 0) {
        obj = DEFAULT_USER_UNIT;
      }

      return (0, _util.shadow)(this, "userUnit", obj);
    }
  }, {
    key: "view",
    get: function get() {
      var cropBox = this.cropBox,
          mediaBox = this.mediaBox;
      var view;

      if (cropBox === mediaBox || (0, _util.isArrayEqual)(cropBox, mediaBox)) {
        view = mediaBox;
      } else {
        var box = _util.Util.intersect(cropBox, mediaBox);

        if (box && box[2] - box[0] !== 0 && box[3] - box[1] !== 0) {
          view = box;
        } else {
          (0, _util.warn)("Empty /CropBox and /MediaBox intersection.");
        }
      }

      return (0, _util.shadow)(this, "view", view || mediaBox);
    }
  }, {
    key: "rotate",
    get: function get() {
      var rotate = this._getInheritableProperty("Rotate") || 0;

      if (rotate % 90 !== 0) {
        rotate = 0;
      } else if (rotate >= 360) {
        rotate %= 360;
      } else if (rotate < 0) {
        rotate = (rotate % 360 + 360) % 360;
      }

      return (0, _util.shadow)(this, "rotate", rotate);
    }
  }, {
    key: "_onSubStreamError",
    value: function _onSubStreamError(handler, reason, objId) {
      if (this.evaluatorOptions.ignoreErrors) {
        handler.send("UnsupportedFeature", {
          featureId: _util.UNSUPPORTED_FEATURES.errorContentSubStream
        });
        (0, _util.warn)("getContentStream - ignoring sub-stream (".concat(objId, "): \"").concat(reason, "\"."));
        return;
      }

      throw reason;
    }
  }, {
    key: "getContentStream",
    value: function getContentStream(handler) {
      var _this = this;

      return this.pdfManager.ensure(this, "content").then(function (content) {
        if (content instanceof _base_stream.BaseStream) {
          return content;
        }

        if (Array.isArray(content)) {
          return new _decode_stream.StreamsSequenceStream(content, _this._onSubStreamError.bind(_this, handler));
        }

        return new _stream.NullStream();
      });
    }
  }, {
    key: "xfaData",
    get: function get() {
      return (0, _util.shadow)(this, "xfaData", this.xfaFactory ? {
        bbox: this.xfaFactory.getBoundingBox(this.pageIndex)
      } : null);
    }
  }, {
    key: "save",
    value: function save(handler, task, annotationStorage) {
      var partialEvaluator = new _evaluator.PartialEvaluator({
        xref: this.xref,
        handler: handler,
        pageIndex: this.pageIndex,
        idFactory: this._localIdFactory,
        fontCache: this.fontCache,
        builtInCMapCache: this.builtInCMapCache,
        standardFontDataCache: this.standardFontDataCache,
        globalImageCache: this.globalImageCache,
        options: this.evaluatorOptions
      });
      return this._parsedAnnotations.then(function (annotations) {
        var newRefsPromises = [];

        var _iterator = _createForOfIteratorHelper(annotations),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var annotation = _step.value;

            if (!annotation.mustBePrinted(annotationStorage)) {
              continue;
            }

            newRefsPromises.push(annotation.save(partialEvaluator, task, annotationStorage)["catch"](function (reason) {
              (0, _util.warn)("save - ignoring annotation data during " + "\"".concat(task.name, "\" task: \"").concat(reason, "\"."));
              return null;
            }));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return Promise.all(newRefsPromises);
      });
    }
  }, {
    key: "loadResources",
    value: function loadResources(keys) {
      var _this2 = this;

      if (!this.resourcesPromise) {
        this.resourcesPromise = this.pdfManager.ensure(this, "resources");
      }

      return this.resourcesPromise.then(function () {
        var objectLoader = new _object_loader.ObjectLoader(_this2.resources, keys, _this2.xref);
        return objectLoader.load();
      });
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList(_ref2) {
      var _this3 = this;

      var handler = _ref2.handler,
          sink = _ref2.sink,
          task = _ref2.task,
          intent = _ref2.intent,
          cacheKey = _ref2.cacheKey,
          _ref2$annotationStora = _ref2.annotationStorage,
          annotationStorage = _ref2$annotationStora === void 0 ? null : _ref2$annotationStora;
      var contentStreamPromise = this.getContentStream(handler);
      var resourcesPromise = this.loadResources(["ColorSpace", "ExtGState", "Font", "Pattern", "Properties", "Shading", "XObject"]);
      var partialEvaluator = new _evaluator.PartialEvaluator({
        xref: this.xref,
        handler: handler,
        pageIndex: this.pageIndex,
        idFactory: this._localIdFactory,
        fontCache: this.fontCache,
        builtInCMapCache: this.builtInCMapCache,
        standardFontDataCache: this.standardFontDataCache,
        globalImageCache: this.globalImageCache,
        options: this.evaluatorOptions
      });
      var dataPromises = Promise.all([contentStreamPromise, resourcesPromise]);
      var pageListPromise = dataPromises.then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            contentStream = _ref4[0];

        var opList = new _operator_list.OperatorList(intent, sink);
        handler.send("StartRenderPage", {
          transparency: partialEvaluator.hasBlendModes(_this3.resources, _this3.nonBlendModesSet),
          pageIndex: _this3.pageIndex,
          cacheKey: cacheKey
        });
        return partialEvaluator.getOperatorList({
          stream: contentStream,
          task: task,
          resources: _this3.resources,
          operatorList: opList
        }).then(function () {
          return opList;
        });
      });
      return Promise.all([pageListPromise, this._parsedAnnotations]).then(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            pageOpList = _ref6[0],
            annotations = _ref6[1];

        if (annotations.length === 0 || intent & _util.RenderingIntentFlag.ANNOTATIONS_DISABLE) {
          pageOpList.flush(true);
          return {
            length: pageOpList.totalLength
          };
        }

        var renderForms = !!(intent & _util.RenderingIntentFlag.ANNOTATIONS_FORMS),
            intentAny = !!(intent & _util.RenderingIntentFlag.ANY),
            intentDisplay = !!(intent & _util.RenderingIntentFlag.DISPLAY),
            intentPrint = !!(intent & _util.RenderingIntentFlag.PRINT);
        var opListPromises = [];

        var _iterator2 = _createForOfIteratorHelper(annotations),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var annotation = _step2.value;

            if (intentAny || intentDisplay && annotation.mustBeViewed(annotationStorage) || intentPrint && annotation.mustBePrinted(annotationStorage)) {
              opListPromises.push(annotation.getOperatorList(partialEvaluator, task, intent, renderForms, annotationStorage)["catch"](function (reason) {
                (0, _util.warn)("getOperatorList - ignoring annotation data during " + "\"".concat(task.name, "\" task: \"").concat(reason, "\"."));
                return null;
              }));
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return Promise.all(opListPromises).then(function (opLists) {
          pageOpList.addOp(_util.OPS.beginAnnotations, []);

          var _iterator3 = _createForOfIteratorHelper(opLists),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var opList = _step3.value;
              pageOpList.addOpList(opList);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          pageOpList.addOp(_util.OPS.endAnnotations, []);
          pageOpList.flush(true);
          return {
            length: pageOpList.totalLength
          };
        });
      });
    }
  }, {
    key: "extractTextContent",
    value: function extractTextContent(_ref7) {
      var _this4 = this;

      var handler = _ref7.handler,
          task = _ref7.task,
          normalizeWhitespace = _ref7.normalizeWhitespace,
          includeMarkedContent = _ref7.includeMarkedContent,
          sink = _ref7.sink,
          combineTextItems = _ref7.combineTextItems;
      var contentStreamPromise = this.getContentStream(handler);
      var resourcesPromise = this.loadResources(["ExtGState", "Font", "Properties", "XObject"]);
      var dataPromises = Promise.all([contentStreamPromise, resourcesPromise]);
      return dataPromises.then(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 1),
            contentStream = _ref9[0];

        var partialEvaluator = new _evaluator.PartialEvaluator({
          xref: _this4.xref,
          handler: handler,
          pageIndex: _this4.pageIndex,
          idFactory: _this4._localIdFactory,
          fontCache: _this4.fontCache,
          builtInCMapCache: _this4.builtInCMapCache,
          standardFontDataCache: _this4.standardFontDataCache,
          globalImageCache: _this4.globalImageCache,
          options: _this4.evaluatorOptions
        });
        return partialEvaluator.getTextContent({
          stream: contentStream,
          task: task,
          resources: _this4.resources,
          normalizeWhitespace: normalizeWhitespace,
          includeMarkedContent: includeMarkedContent,
          combineTextItems: combineTextItems,
          sink: sink
        });
      });
    }
  }, {
    key: "getStructTree",
    value: function () {
      var _getStructTree = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var structTreeRoot, structTree;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.pdfManager.ensureCatalog("structTreeRoot");

              case 2:
                structTreeRoot = _context.sent;

                if (structTreeRoot) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", null);

              case 5:
                _context.next = 7;
                return this.pdfManager.ensure(this, "_parseStructTree", [structTreeRoot]);

              case 7:
                structTree = _context.sent;
                return _context.abrupt("return", structTree.serializable);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getStructTree() {
        return _getStructTree.apply(this, arguments);
      }

      return getStructTree;
    }()
  }, {
    key: "_parseStructTree",
    value: function _parseStructTree(structTreeRoot) {
      var tree = new _struct_tree.StructTreePage(structTreeRoot, this.pageDict);
      tree.parse();
      return tree;
    }
  }, {
    key: "getAnnotationsData",
    value: function getAnnotationsData(intent) {
      return this._parsedAnnotations.then(function (annotations) {
        var annotationsData = [];

        if (annotations.length === 0) {
          return annotationsData;
        }

        var intentAny = !!(intent & _util.RenderingIntentFlag.ANY),
            intentDisplay = !!(intent & _util.RenderingIntentFlag.DISPLAY),
            intentPrint = !!(intent & _util.RenderingIntentFlag.PRINT);

        var _iterator4 = _createForOfIteratorHelper(annotations),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var annotation = _step4.value;

            if (intentAny || intentDisplay && annotation.viewable || intentPrint && annotation.printable) {
              annotationsData.push(annotation.data);
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        return annotationsData;
      });
    }
  }, {
    key: "annotations",
    get: function get() {
      var annots = this._getInheritableProperty("Annots");

      return (0, _util.shadow)(this, "annotations", Array.isArray(annots) ? annots : []);
    }
  }, {
    key: "_parsedAnnotations",
    get: function get() {
      var _this5 = this;

      var parsedAnnotations = this.pdfManager.ensure(this, "annotations").then(function () {
        var annotationPromises = [];

        var _iterator5 = _createForOfIteratorHelper(_this5.annotations),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var annotationRef = _step5.value;
            annotationPromises.push(_annotation.AnnotationFactory.create(_this5.xref, annotationRef, _this5.pdfManager, _this5._localIdFactory, false)["catch"](function (reason) {
              (0, _util.warn)("_parsedAnnotations: \"".concat(reason, "\"."));
              return null;
            }));
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        return Promise.all(annotationPromises).then(function (annotations) {
          return annotations.filter(function (annotation) {
            return !!annotation;
          });
        });
      });
      return (0, _util.shadow)(this, "_parsedAnnotations", parsedAnnotations);
    }
  }, {
    key: "jsActions",
    get: function get() {
      var actions = (0, _core_utils.collectActions)(this.xref, this.pageDict, _util.PageActionEventType);
      return (0, _util.shadow)(this, "jsActions", actions);
    }
  }]);

  return Page;
}();

exports.Page = Page;
var PDF_HEADER_SIGNATURE = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
var STARTXREF_SIGNATURE = new Uint8Array([0x73, 0x74, 0x61, 0x72, 0x74, 0x78, 0x72, 0x65, 0x66]);
var ENDOBJ_SIGNATURE = new Uint8Array([0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a]);
var FINGERPRINT_FIRST_BYTES = 1024;
var EMPTY_FINGERPRINT = "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00";
var PDF_HEADER_VERSION_REGEXP = /^[1-9]\.\d$/;

function find(stream, signature) {
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1024;
  var backwards = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  (0, _util.assert)(limit > 0, 'The "limit" must be a positive integer.');
  var signatureLength = signature.length;
  var scanBytes = stream.peekBytes(limit);
  var scanLength = scanBytes.length - signatureLength;

  if (scanLength <= 0) {
    return false;
  }

  if (backwards) {
    var signatureEnd = signatureLength - 1;
    var pos = scanBytes.length - 1;

    while (pos >= signatureEnd) {
      var j = 0;

      while (j < signatureLength && scanBytes[pos - j] === signature[signatureEnd - j]) {
        j++;
      }

      if (j >= signatureLength) {
        stream.pos += pos - signatureEnd;
        return true;
      }

      pos--;
    }
  } else {
    var _pos = 0;

    while (_pos <= scanLength) {
      var _j = 0;

      while (_j < signatureLength && scanBytes[_pos + _j] === signature[_j]) {
        _j++;
      }

      if (_j >= signatureLength) {
        stream.pos += _pos;
        return true;
      }

      _pos++;
    }
  }

  return false;
}

var PDFDocument = /*#__PURE__*/function () {
  function PDFDocument(pdfManager, arg) {
    _classCallCheck(this, PDFDocument);

    var stream;

    if ((0, _primitives.isStream)(arg)) {
      stream = arg;
    } else if ((0, _util.isArrayBuffer)(arg)) {
      stream = new _stream.Stream(arg);
    } else {
      throw new Error("PDFDocument: Unknown argument type");
    }

    if (stream.length <= 0) {
      throw new _util.InvalidPDFException("The PDF file is empty, i.e. its size is zero bytes.");
    }

    this.pdfManager = pdfManager;
    this.stream = stream;
    this.xref = new _xref.XRef(stream, pdfManager);
    this._pagePromises = new Map();
    this._version = null;
    var idCounters = {
      font: 0
    };

    this._globalIdFactory = /*#__PURE__*/function () {
      function _class2() {
        _classCallCheck(this, _class2);
      }

      _createClass(_class2, null, [{
        key: "getDocId",
        value: function getDocId() {
          return "g_".concat(pdfManager.docId);
        }
      }, {
        key: "createFontId",
        value: function createFontId() {
          return "f".concat(++idCounters.font);
        }
      }, {
        key: "createObjId",
        value: function createObjId() {
          (0, _util.unreachable)("Abstract method `createObjId` called.");
        }
      }, {
        key: "getPageObjId",
        value: function getPageObjId() {
          (0, _util.unreachable)("Abstract method `getPageObjId` called.");
        }
      }]);

      return _class2;
    }();
  }

  _createClass(PDFDocument, [{
    key: "parse",
    value: function parse(recoveryMode) {
      this.xref.parse(recoveryMode);
      this.catalog = new _catalog.Catalog(this.pdfManager, this.xref);

      if (this.catalog.version) {
        this._version = this.catalog.version;
      }
    }
  }, {
    key: "linearization",
    get: function get() {
      var linearization = null;

      try {
        linearization = _parser.Linearization.create(this.stream);
      } catch (err) {
        if (err instanceof _core_utils.MissingDataException) {
          throw err;
        }

        (0, _util.info)(err);
      }

      return (0, _util.shadow)(this, "linearization", linearization);
    }
  }, {
    key: "startXRef",
    get: function get() {
      var stream = this.stream;
      var startXRef = 0;

      if (this.linearization) {
        stream.reset();

        if (find(stream, ENDOBJ_SIGNATURE)) {
          startXRef = stream.pos + 6 - stream.start;
        }
      } else {
        var step = 1024;
        var startXRefLength = STARTXREF_SIGNATURE.length;
        var found = false,
            pos = stream.end;

        while (!found && pos > 0) {
          pos -= step - startXRefLength;

          if (pos < 0) {
            pos = 0;
          }

          stream.pos = pos;
          found = find(stream, STARTXREF_SIGNATURE, step, true);
        }

        if (found) {
          stream.skip(9);
          var ch;

          do {
            ch = stream.getByte();
          } while ((0, _core_utils.isWhiteSpace)(ch));

          var str = "";

          while (ch >= 0x20 && ch <= 0x39) {
            str += String.fromCharCode(ch);
            ch = stream.getByte();
          }

          startXRef = parseInt(str, 10);

          if (isNaN(startXRef)) {
            startXRef = 0;
          }
        }
      }

      return (0, _util.shadow)(this, "startXRef", startXRef);
    }
  }, {
    key: "checkHeader",
    value: function checkHeader() {
      var stream = this.stream;
      stream.reset();

      if (!find(stream, PDF_HEADER_SIGNATURE)) {
        return;
      }

      stream.moveStart();
      var MAX_PDF_VERSION_LENGTH = 12;
      var version = "",
          ch;

      while ((ch = stream.getByte()) > 0x20) {
        if (version.length >= MAX_PDF_VERSION_LENGTH) {
          break;
        }

        version += String.fromCharCode(ch);
      }

      if (!this._version) {
        this._version = version.substring(5);
      }
    }
  }, {
    key: "parseStartXRef",
    value: function parseStartXRef() {
      this.xref.setStartXRef(this.startXRef);
    }
  }, {
    key: "numPages",
    get: function get() {
      var num = 0;

      if (this.catalog.hasActualNumPages) {
        num = this.catalog.numPages;
      } else if (this.xfaFactory) {
        num = this.xfaFactory.getNumPages();
      } else if (this.linearization) {
        num = this.linearization.numPages;
      } else {
        num = this.catalog.numPages;
      }

      return (0, _util.shadow)(this, "numPages", num);
    }
  }, {
    key: "_hasOnlyDocumentSignatures",
    value: function _hasOnlyDocumentSignatures(fields) {
      var _this6 = this;

      var recursionDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var RECURSION_LIMIT = 10;

      if (!Array.isArray(fields)) {
        return false;
      }

      return fields.every(function (field) {
        field = _this6.xref.fetchIfRef(field);

        if (!(field instanceof _primitives.Dict)) {
          return false;
        }

        if (field.has("Kids")) {
          if (++recursionDepth > RECURSION_LIMIT) {
            (0, _util.warn)("_hasOnlyDocumentSignatures: maximum recursion depth reached");
            return false;
          }

          return _this6._hasOnlyDocumentSignatures(field.get("Kids"), recursionDepth);
        }

        var isSignature = (0, _primitives.isName)(field.get("FT"), "Sig");
        var rectangle = field.get("Rect");
        var isInvisible = Array.isArray(rectangle) && rectangle.every(function (value) {
          return value === 0;
        });
        return isSignature && isInvisible;
      });
    }
  }, {
    key: "xfaData",
    get: function get() {
      var acroForm = this.catalog.acroForm;

      if (!acroForm) {
        return null;
      }

      var xfa = acroForm.get("XFA");
      var entries = {
        "xdp:xdp": "",
        template: "",
        datasets: "",
        config: "",
        connectionSet: "",
        localeSet: "",
        stylesheet: "",
        "/xdp:xdp": ""
      };

      if ((0, _primitives.isStream)(xfa) && !xfa.isEmpty) {
        try {
          entries["xdp:xdp"] = (0, _util.stringToUTF8String)(xfa.getString());
          return entries;
        } catch (_) {
          (0, _util.warn)("XFA - Invalid utf-8 string.");
          return null;
        }
      }

      if (!Array.isArray(xfa) || xfa.length === 0) {
        return null;
      }

      for (var i = 0, ii = xfa.length; i < ii; i += 2) {
        var name = void 0;

        if (i === 0) {
          name = "xdp:xdp";
        } else if (i === ii - 2) {
          name = "/xdp:xdp";
        } else {
          name = xfa[i];
        }

        if (!entries.hasOwnProperty(name)) {
          continue;
        }

        var data = this.xref.fetchIfRef(xfa[i + 1]);

        if (!(0, _primitives.isStream)(data) || data.isEmpty) {
          continue;
        }

        try {
          entries[name] = (0, _util.stringToUTF8String)(data.getString());
        } catch (_) {
          (0, _util.warn)("XFA - Invalid utf-8 string.");
          return null;
        }
      }

      return entries;
    }
  }, {
    key: "xfaFactory",
    get: function get() {
      var data;

      if (this.pdfManager.enableXfa && this.catalog.needsRendering && this.formInfo.hasXfa && !this.formInfo.hasAcroForm) {
        data = this.xfaData;
      }

      return (0, _util.shadow)(this, "xfaFactory", data ? new _factory.XFAFactory(data) : null);
    }
  }, {
    key: "isPureXfa",
    get: function get() {
      return this.xfaFactory ? this.xfaFactory.isValid() : false;
    }
  }, {
    key: "htmlForXfa",
    get: function get() {
      return this.xfaFactory ? this.xfaFactory.getPages() : null;
    }
  }, {
    key: "loadXfaImages",
    value: function () {
      var _loadXfaImages = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var xfaImagesDict, keys, objectLoader, xfaImages, _iterator6, _step6, key, stream;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.pdfManager.ensureCatalog("xfaImages");

              case 2:
                xfaImagesDict = _context2.sent;

                if (xfaImagesDict) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return");

              case 5:
                keys = xfaImagesDict.getKeys();
                objectLoader = new _object_loader.ObjectLoader(xfaImagesDict, keys, this.xref);
                _context2.next = 9;
                return objectLoader.load();

              case 9:
                xfaImages = new Map();
                _iterator6 = _createForOfIteratorHelper(keys);
                _context2.prev = 11;

                _iterator6.s();

              case 13:
                if ((_step6 = _iterator6.n()).done) {
                  _context2.next = 21;
                  break;
                }

                key = _step6.value;
                stream = xfaImagesDict.get(key);

                if ((0, _primitives.isStream)(stream)) {
                  _context2.next = 18;
                  break;
                }

                return _context2.abrupt("continue", 19);

              case 18:
                xfaImages.set(key, stream.getBytes());

              case 19:
                _context2.next = 13;
                break;

              case 21:
                _context2.next = 26;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](11);

                _iterator6.e(_context2.t0);

              case 26:
                _context2.prev = 26;

                _iterator6.f();

                return _context2.finish(26);

              case 29:
                this.xfaFactory.setImages(xfaImages);

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[11, 23, 26, 29]]);
      }));

      function loadXfaImages() {
        return _loadXfaImages.apply(this, arguments);
      }

      return loadXfaImages;
    }()
  }, {
    key: "loadXfaFonts",
    value: function () {
      var _loadXfaFonts = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(handler, task) {
        var acroForm, resources, objectLoader, fontRes, options, partialEvaluator, operatorList, pdfFonts, initialState, fonts, promises, _iterator7, _step7, _step7$value, fontName, font, descriptor, fontFamily, fontWeight, italicAngle, cssFontInfo, missingFonts, reallyMissingFonts, _iterator8, _step8, missing, _iterator9, _step9, _missing, _i2, _arr2, fontInfo, name, dict;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.pdfManager.ensureCatalog("acroForm");

              case 2:
                acroForm = _context3.sent;

                if (acroForm) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return");

              case 5:
                _context3.next = 7;
                return acroForm.getAsync("DR");

              case 7:
                resources = _context3.sent;

                if (resources instanceof _primitives.Dict) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return");

              case 10:
                objectLoader = new _object_loader.ObjectLoader(resources, ["Font"], this.xref);
                _context3.next = 13;
                return objectLoader.load();

              case 13:
                fontRes = resources.get("Font");

                if (fontRes instanceof _primitives.Dict) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("return");

              case 16:
                options = Object.assign(Object.create(null), this.pdfManager.evaluatorOptions);
                options.useSystemFonts = false;
                partialEvaluator = new _evaluator.PartialEvaluator({
                  xref: this.xref,
                  handler: handler,
                  pageIndex: -1,
                  idFactory: this._globalIdFactory,
                  fontCache: this.catalog.fontCache,
                  builtInCMapCache: this.catalog.builtInCMapCache,
                  standardFontDataCache: this.catalog.standardFontDataCache,
                  options: options
                });
                operatorList = new _operator_list.OperatorList();
                pdfFonts = [];

                _context3.t0 = function clone() {
                  return this;
                };

                initialState = {
                  get font() {
                    return pdfFonts[pdfFonts.length - 1];
                  },

                  set font(font) {
                    pdfFonts.push(font);
                  },

                  clone: _context3.t0
                };
                fonts = new Map();
                fontRes.forEach(function (fontName, font) {
                  fonts.set(fontName, font);
                });
                promises = [];
                _iterator7 = _createForOfIteratorHelper(fonts);
                _context3.prev = 27;

                _iterator7.s();

              case 29:
                if ((_step7 = _iterator7.n()).done) {
                  _context3.next = 44;
                  break;
                }

                _step7$value = _slicedToArray(_step7.value, 2), fontName = _step7$value[0], font = _step7$value[1];
                descriptor = font.get("FontDescriptor");

                if (descriptor instanceof _primitives.Dict) {
                  _context3.next = 34;
                  break;
                }

                return _context3.abrupt("continue", 42);

              case 34:
                fontFamily = descriptor.get("FontFamily");
                fontFamily = fontFamily.replace(/[ ]+(\d)/g, "$1");
                fontWeight = descriptor.get("FontWeight");
                italicAngle = -descriptor.get("ItalicAngle");
                cssFontInfo = {
                  fontFamily: fontFamily,
                  fontWeight: fontWeight,
                  italicAngle: italicAngle
                };

                if ((0, _core_utils.validateCSSFont)(cssFontInfo)) {
                  _context3.next = 41;
                  break;
                }

                return _context3.abrupt("continue", 42);

              case 41:
                promises.push(partialEvaluator.handleSetFont(resources, [_primitives.Name.get(fontName), 1], null, operatorList, task, initialState, null, cssFontInfo)["catch"](function (reason) {
                  (0, _util.warn)("loadXfaFonts: \"".concat(reason, "\"."));
                  return null;
                }));

              case 42:
                _context3.next = 29;
                break;

              case 44:
                _context3.next = 49;
                break;

              case 46:
                _context3.prev = 46;
                _context3.t1 = _context3["catch"](27);

                _iterator7.e(_context3.t1);

              case 49:
                _context3.prev = 49;

                _iterator7.f();

                return _context3.finish(49);

              case 52:
                _context3.next = 54;
                return Promise.all(promises);

              case 54:
                missingFonts = this.xfaFactory.setFonts(pdfFonts);

                if (missingFonts) {
                  _context3.next = 57;
                  break;
                }

                return _context3.abrupt("return");

              case 57:
                options.ignoreErrors = true;
                promises.length = 0;
                pdfFonts.length = 0;
                reallyMissingFonts = new Set();
                _iterator8 = _createForOfIteratorHelper(missingFonts);

                try {
                  for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                    missing = _step8.value;

                    if (!(0, _xfa_fonts.getXfaFontName)("".concat(missing, "-Regular"))) {
                      reallyMissingFonts.add(missing);
                    }
                  }
                } catch (err) {
                  _iterator8.e(err);
                } finally {
                  _iterator8.f();
                }

                if (reallyMissingFonts.size) {
                  missingFonts.push("PdfJS-Fallback");
                }

                _iterator9 = _createForOfIteratorHelper(missingFonts);
                _context3.prev = 65;

                _iterator9.s();

              case 67:
                if ((_step9 = _iterator9.n()).done) {
                  _context3.next = 74;
                  break;
                }

                _missing = _step9.value;

                if (!reallyMissingFonts.has(_missing)) {
                  _context3.next = 71;
                  break;
                }

                return _context3.abrupt("continue", 72);

              case 71:
                for (_i2 = 0, _arr2 = [{
                  name: "Regular",
                  fontWeight: 400,
                  italicAngle: 0
                }, {
                  name: "Bold",
                  fontWeight: 700,
                  italicAngle: 0
                }, {
                  name: "Italic",
                  fontWeight: 400,
                  italicAngle: 12
                }, {
                  name: "BoldItalic",
                  fontWeight: 700,
                  italicAngle: 12
                }]; _i2 < _arr2.length; _i2++) {
                  fontInfo = _arr2[_i2];
                  name = "".concat(_missing, "-").concat(fontInfo.name);
                  dict = (0, _xfa_fonts.getXfaFontDict)(name);
                  promises.push(partialEvaluator.handleSetFont(resources, [_primitives.Name.get(name), 1], null, operatorList, task, initialState, dict, {
                    fontFamily: _missing,
                    fontWeight: fontInfo.fontWeight,
                    italicAngle: fontInfo.italicAngle
                  })["catch"](function (reason) {
                    (0, _util.warn)("loadXfaFonts: \"".concat(reason, "\"."));
                    return null;
                  }));
                }

              case 72:
                _context3.next = 67;
                break;

              case 74:
                _context3.next = 79;
                break;

              case 76:
                _context3.prev = 76;
                _context3.t2 = _context3["catch"](65);

                _iterator9.e(_context3.t2);

              case 79:
                _context3.prev = 79;

                _iterator9.f();

                return _context3.finish(79);

              case 82:
                _context3.next = 84;
                return Promise.all(promises);

              case 84:
                this.xfaFactory.appendFonts(pdfFonts, reallyMissingFonts);

              case 85:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[27, 46, 49, 52], [65, 76, 79, 82]]);
      }));

      function loadXfaFonts(_x, _x2) {
        return _loadXfaFonts.apply(this, arguments);
      }

      return loadXfaFonts;
    }()
  }, {
    key: "serializeXfaData",
    value: function () {
      var _serializeXfaData = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(annotationStorage) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.xfaFactory ? this.xfaFactory.serializeData(annotationStorage) : null);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function serializeXfaData(_x3) {
        return _serializeXfaData.apply(this, arguments);
      }

      return serializeXfaData;
    }()
  }, {
    key: "formInfo",
    get: function get() {
      var formInfo = {
        hasFields: false,
        hasAcroForm: false,
        hasXfa: false,
        hasSignatures: false
      };
      var acroForm = this.catalog.acroForm;

      if (!acroForm) {
        return (0, _util.shadow)(this, "formInfo", formInfo);
      }

      try {
        var fields = acroForm.get("Fields");
        var hasFields = Array.isArray(fields) && fields.length > 0;
        formInfo.hasFields = hasFields;
        var xfa = acroForm.get("XFA");
        formInfo.hasXfa = Array.isArray(xfa) && xfa.length > 0 || (0, _primitives.isStream)(xfa) && !xfa.isEmpty;
        var sigFlags = acroForm.get("SigFlags");
        var hasSignatures = !!(sigFlags & 0x1);

        var hasOnlyDocumentSignatures = hasSignatures && this._hasOnlyDocumentSignatures(fields);

        formInfo.hasAcroForm = hasFields && !hasOnlyDocumentSignatures;
        formInfo.hasSignatures = hasSignatures;
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.warn)("Cannot fetch form information: \"".concat(ex, "\"."));
      }

      return (0, _util.shadow)(this, "formInfo", formInfo);
    }
  }, {
    key: "documentInfo",
    get: function get() {
      var DocumentInfoValidators = {
        Title: _util.isString,
        Author: _util.isString,
        Subject: _util.isString,
        Keywords: _util.isString,
        Creator: _util.isString,
        Producer: _util.isString,
        CreationDate: _util.isString,
        ModDate: _util.isString,
        Trapped: _primitives.isName
      };
      var version = this._version;

      if (typeof version !== "string" || !PDF_HEADER_VERSION_REGEXP.test(version)) {
        (0, _util.warn)("Invalid PDF header version number: ".concat(version));
        version = null;
      }

      var docInfo = {
        PDFFormatVersion: version,
        Language: this.catalog.lang,
        EncryptFilterName: this.xref.encrypt ? this.xref.encrypt.filterName : null,
        IsLinearized: !!this.linearization,
        IsAcroFormPresent: this.formInfo.hasAcroForm,
        IsXFAPresent: this.formInfo.hasXfa,
        IsCollectionPresent: !!this.catalog.collection,
        IsSignaturesPresent: this.formInfo.hasSignatures
      };
      var infoDict;

      try {
        infoDict = this.xref.trailer.get("Info");
      } catch (err) {
        if (err instanceof _core_utils.MissingDataException) {
          throw err;
        }

        (0, _util.info)("The document information dictionary is invalid.");
      }

      if ((0, _primitives.isDict)(infoDict)) {
        var _iterator10 = _createForOfIteratorHelper(infoDict.getKeys()),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var key = _step10.value;
            var value = infoDict.get(key);

            if (DocumentInfoValidators[key]) {
              if (DocumentInfoValidators[key](value)) {
                docInfo[key] = typeof value !== "string" ? value : (0, _util.stringToPDFString)(value);
              } else {
                (0, _util.info)("Bad value in document info for \"".concat(key, "\"."));
              }
            } else if (typeof key === "string") {
              var customValue = void 0;

              if ((0, _util.isString)(value)) {
                customValue = (0, _util.stringToPDFString)(value);
              } else if ((0, _primitives.isName)(value) || (0, _util.isNum)(value) || (0, _util.isBool)(value)) {
                customValue = value;
              } else {
                (0, _util.info)("Unsupported value in document info for (custom) \"".concat(key, "\"."));
                continue;
              }

              if (!docInfo.Custom) {
                docInfo.Custom = Object.create(null);
              }

              docInfo.Custom[key] = customValue;
            }
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      }

      return (0, _util.shadow)(this, "documentInfo", docInfo);
    }
  }, {
    key: "fingerprints",
    get: function get() {
      function validate(data) {
        return typeof data === "string" && data.length > 0 && data !== EMPTY_FINGERPRINT;
      }

      function hexString(hash) {
        var buf = [];

        for (var i = 0, ii = hash.length; i < ii; i++) {
          var hex = hash[i].toString(16);
          buf.push(hex.padStart(2, "0"));
        }

        return buf.join("");
      }

      var idArray = this.xref.trailer.get("ID");
      var hashOriginal, hashModified;

      if (Array.isArray(idArray) && validate(idArray[0])) {
        hashOriginal = (0, _util.stringToBytes)(idArray[0]);

        if (idArray[1] !== idArray[0] && validate(idArray[1])) {
          hashModified = (0, _util.stringToBytes)(idArray[1]);
        }
      } else {
        hashOriginal = (0, _crypto.calculateMD5)(this.stream.getByteRange(0, FINGERPRINT_FIRST_BYTES), 0, FINGERPRINT_FIRST_BYTES);
      }

      return (0, _util.shadow)(this, "fingerprints", [hexString(hashOriginal), hashModified ? hexString(hashModified) : null]);
    }
  }, {
    key: "_getLinearizationPage",
    value: function () {
      var _getLinearizationPage2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(pageIndex) {
        var catalog, linearization, ref, obj;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                catalog = this.catalog, linearization = this.linearization;
                (0, _util.assert)(linearization && linearization.pageFirst === pageIndex, "_getLinearizationPage - invalid pageIndex argument.");
                ref = _primitives.Ref.get(linearization.objectNumberFirst, 0);
                _context5.prev = 3;
                _context5.next = 6;
                return this.xref.fetchAsync(ref);

              case 6:
                obj = _context5.sent;

                if (!((0, _primitives.isDict)(obj, "Page") || (0, _primitives.isDict)(obj) && !obj.has("Type") && obj.has("Contents"))) {
                  _context5.next = 10;
                  break;
                }

                if (ref && !catalog.pageKidsCountCache.has(ref)) {
                  catalog.pageKidsCountCache.put(ref, 1);
                }

                return _context5.abrupt("return", [obj, ref]);

              case 10:
                throw new _util.FormatError("The Linearization dictionary doesn't point to a valid Page dictionary.");

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](3);
                (0, _util.info)(_context5.t0);
                return _context5.abrupt("return", catalog.getPageDict(pageIndex));

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[3, 13]]);
      }));

      function _getLinearizationPage(_x4) {
        return _getLinearizationPage2.apply(this, arguments);
      }

      return _getLinearizationPage;
    }()
  }, {
    key: "getPage",
    value: function getPage(pageIndex) {
      var _this7 = this;

      var cachedPromise = this._pagePromises.get(pageIndex);

      if (cachedPromise) {
        return cachedPromise;
      }

      var catalog = this.catalog,
          linearization = this.linearization,
          xfaFactory = this.xfaFactory;
      var promise;

      if (xfaFactory) {
        promise = Promise.resolve([_primitives.Dict.empty, null]);
      } else if (linearization && linearization.pageFirst === pageIndex) {
        promise = this._getLinearizationPage(pageIndex);
      } else {
        promise = catalog.getPageDict(pageIndex);
      }

      promise = promise.then(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
            pageDict = _ref11[0],
            ref = _ref11[1];

        return new Page({
          pdfManager: _this7.pdfManager,
          xref: _this7.xref,
          pageIndex: pageIndex,
          pageDict: pageDict,
          ref: ref,
          globalIdFactory: _this7._globalIdFactory,
          fontCache: catalog.fontCache,
          builtInCMapCache: catalog.builtInCMapCache,
          standardFontDataCache: catalog.standardFontDataCache,
          globalImageCache: catalog.globalImageCache,
          nonBlendModesSet: catalog.nonBlendModesSet,
          xfaFactory: xfaFactory
        });
      });

      this._pagePromises.set(pageIndex, promise);

      return promise;
    }
  }, {
    key: "checkFirstPage",
    value: function () {
      var _checkFirstPage = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var recoveryMode,
            _args6 = arguments;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                recoveryMode = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : false;

                if (!recoveryMode) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return");

              case 3:
                _context6.prev = 3;
                _context6.next = 6;
                return this.getPage(0);

              case 6:
                _context6.next = 15;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](3);

                if (!(_context6.t0 instanceof _core_utils.XRefEntryException)) {
                  _context6.next = 15;
                  break;
                }

                this._pagePromises["delete"](0);

                _context6.next = 14;
                return this.cleanup();

              case 14:
                throw new _core_utils.XRefParseException();

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[3, 8]]);
      }));

      function checkFirstPage() {
        return _checkFirstPage.apply(this, arguments);
      }

      return checkFirstPage;
    }()
  }, {
    key: "checkLastPage",
    value: function () {
      var _checkLastPage = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var recoveryMode,
            catalog,
            pdfManager,
            numPages,
            pagesTree,
            _iterator11,
            _step11,
            _step11$value,
            pageIndex,
            _step11$value$,
            pageDict,
            ref,
            promise,
            _args7 = arguments;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                recoveryMode = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : false;
                catalog = this.catalog, pdfManager = this.pdfManager;
                catalog.setActualNumPages();
                _context7.prev = 3;
                _context7.next = 6;
                return Promise.all([pdfManager.ensureDoc("xfaFactory"), pdfManager.ensureDoc("linearization"), pdfManager.ensureCatalog("numPages")]);

              case 6:
                if (!this.xfaFactory) {
                  _context7.next = 10;
                  break;
                }

                return _context7.abrupt("return");

              case 10:
                if (this.linearization) {
                  numPages = this.linearization.numPages;
                } else {
                  numPages = catalog.numPages;
                }

              case 11:
                if (Number.isInteger(numPages)) {
                  _context7.next = 15;
                  break;
                }

                throw new _util.FormatError("Page count is not an integer.");

              case 15:
                if (!(numPages <= 1)) {
                  _context7.next = 17;
                  break;
                }

                return _context7.abrupt("return");

              case 17:
                _context7.next = 19;
                return this.getPage(numPages - 1);

              case 19:
                _context7.next = 44;
                break;

              case 21:
                _context7.prev = 21;
                _context7.t0 = _context7["catch"](3);

                this._pagePromises["delete"](numPages - 1);

                _context7.next = 26;
                return this.cleanup();

              case 26:
                if (!(_context7.t0 instanceof _core_utils.XRefEntryException && !recoveryMode)) {
                  _context7.next = 28;
                  break;
                }

                throw new _core_utils.XRefParseException();

              case 28:
                (0, _util.warn)("checkLastPage - invalid /Pages tree /Count: ".concat(numPages, "."));
                _context7.prev = 29;
                _context7.next = 32;
                return pdfManager.ensureCatalog("getAllPageDicts", [recoveryMode]);

              case 32:
                pagesTree = _context7.sent;
                _context7.next = 41;
                break;

              case 35:
                _context7.prev = 35;
                _context7.t1 = _context7["catch"](29);

                if (!(_context7.t1 instanceof _core_utils.XRefEntryException && !recoveryMode)) {
                  _context7.next = 39;
                  break;
                }

                throw new _core_utils.XRefParseException();

              case 39:
                catalog.setActualNumPages(1);
                return _context7.abrupt("return");

              case 41:
                _iterator11 = _createForOfIteratorHelper(pagesTree);

                try {
                  for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                    _step11$value = _slicedToArray(_step11.value, 2), pageIndex = _step11$value[0], _step11$value$ = _slicedToArray(_step11$value[1], 2), pageDict = _step11$value$[0], ref = _step11$value$[1];
                    promise = void 0;

                    if (pageDict instanceof Error) {
                      promise = Promise.reject(pageDict);
                      promise["catch"](function () {});
                    } else {
                      promise = Promise.resolve(new Page({
                        pdfManager: pdfManager,
                        xref: this.xref,
                        pageIndex: pageIndex,
                        pageDict: pageDict,
                        ref: ref,
                        globalIdFactory: this._globalIdFactory,
                        fontCache: catalog.fontCache,
                        builtInCMapCache: catalog.builtInCMapCache,
                        standardFontDataCache: catalog.standardFontDataCache,
                        globalImageCache: catalog.globalImageCache,
                        nonBlendModesSet: catalog.nonBlendModesSet,
                        xfaFactory: null
                      }));
                    }

                    this._pagePromises.set(pageIndex, promise);
                  }
                } catch (err) {
                  _iterator11.e(err);
                } finally {
                  _iterator11.f();
                }

                catalog.setActualNumPages(pagesTree.size);

              case 44:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[3, 21], [29, 35]]);
      }));

      function checkLastPage() {
        return _checkLastPage.apply(this, arguments);
      }

      return checkLastPage;
    }()
  }, {
    key: "fontFallback",
    value: function fontFallback(id, handler) {
      return this.catalog.fontFallback(id, handler);
    }
  }, {
    key: "cleanup",
    value: function () {
      var _cleanup = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var manuallyTriggered,
            _args8 = arguments;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                manuallyTriggered = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : false;
                return _context8.abrupt("return", this.catalog ? this.catalog.cleanup(manuallyTriggered) : (0, _primitives.clearPrimitiveCaches)());

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function cleanup() {
        return _cleanup.apply(this, arguments);
      }

      return cleanup;
    }()
  }, {
    key: "_collectFieldObjects",
    value: function _collectFieldObjects(name, fieldRef, promises) {
      var field = this.xref.fetchIfRef(fieldRef);

      if (field.has("T")) {
        var partName = (0, _util.stringToPDFString)(field.get("T"));

        if (name === "") {
          name = partName;
        } else {
          name = "".concat(name, ".").concat(partName);
        }
      }

      if (!promises.has(name)) {
        promises.set(name, []);
      }

      promises.get(name).push(_annotation.AnnotationFactory.create(this.xref, fieldRef, this.pdfManager, this._localIdFactory, true).then(function (annotation) {
        return annotation && annotation.getFieldObject();
      })["catch"](function (reason) {
        (0, _util.warn)("_collectFieldObjects: \"".concat(reason, "\"."));
        return null;
      }));

      if (field.has("Kids")) {
        var kids = field.get("Kids");

        var _iterator12 = _createForOfIteratorHelper(kids),
            _step12;

        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var kid = _step12.value;

            this._collectFieldObjects(name, kid, promises);
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }
      }
    }
  }, {
    key: "fieldObjects",
    get: function get() {
      if (!this.formInfo.hasFields) {
        return (0, _util.shadow)(this, "fieldObjects", Promise.resolve(null));
      }

      var allFields = Object.create(null);
      var fieldPromises = new Map();

      var _iterator13 = _createForOfIteratorHelper(this.catalog.acroForm.get("Fields")),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var fieldRef = _step13.value;

          this._collectFieldObjects("", fieldRef, fieldPromises);
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }

      var allPromises = [];

      var _iterator14 = _createForOfIteratorHelper(fieldPromises),
          _step14;

      try {
        var _loop = function _loop() {
          var _step14$value = _slicedToArray(_step14.value, 2),
              name = _step14$value[0],
              promises = _step14$value[1];

          allPromises.push(Promise.all(promises).then(function (fields) {
            fields = fields.filter(function (field) {
              return !!field;
            });

            if (fields.length > 0) {
              allFields[name] = fields;
            }
          }));
        };

        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }

      return (0, _util.shadow)(this, "fieldObjects", Promise.all(allPromises).then(function () {
        return allFields;
      }));
    }
  }, {
    key: "hasJSActions",
    get: function get() {
      var promise = this.pdfManager.ensureDoc("_parseHasJSActions");
      return (0, _util.shadow)(this, "hasJSActions", promise);
    }
  }, {
    key: "_parseHasJSActions",
    value: function () {
      var _parseHasJSActions2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var _yield$Promise$all, _yield$Promise$all2, catalogJsActions, fieldObjects;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return Promise.all([this.pdfManager.ensureCatalog("jsActions"), this.pdfManager.ensureDoc("fieldObjects")]);

              case 2:
                _yield$Promise$all = _context9.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                catalogJsActions = _yield$Promise$all2[0];
                fieldObjects = _yield$Promise$all2[1];

                if (!catalogJsActions) {
                  _context9.next = 8;
                  break;
                }

                return _context9.abrupt("return", true);

              case 8:
                if (!fieldObjects) {
                  _context9.next = 10;
                  break;
                }

                return _context9.abrupt("return", Object.values(fieldObjects).some(function (fieldObject) {
                  return fieldObject.some(function (object) {
                    return object.actions !== null;
                  });
                }));

              case 10:
                return _context9.abrupt("return", false);

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _parseHasJSActions() {
        return _parseHasJSActions2.apply(this, arguments);
      }

      return _parseHasJSActions;
    }()
  }, {
    key: "calculationOrderIds",
    get: function get() {
      var acroForm = this.catalog.acroForm;

      if (!acroForm || !acroForm.has("CO")) {
        return (0, _util.shadow)(this, "calculationOrderIds", null);
      }

      var calculationOrder = acroForm.get("CO");

      if (!Array.isArray(calculationOrder) || calculationOrder.length === 0) {
        return (0, _util.shadow)(this, "calculationOrderIds", null);
      }

      var ids = calculationOrder.filter(_primitives.isRef).map(function (ref) {
        return ref.toString();
      });

      if (ids.length === 0) {
        return (0, _util.shadow)(this, "calculationOrderIds", null);
      }

      return (0, _util.shadow)(this, "calculationOrderIds", ids);
    }
  }]);

  return PDFDocument;
}();

exports.PDFDocument = PDFDocument;