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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _annotation = require("../../core/annotation.js");

var _util = require("../../shared/util.js");

var _test_utils = require("./test_utils.js");

var _api = require("../../display/api.js");

var _primitives = require("../../core/primitives.js");

var _parser = require("../../core/parser.js");

var _evaluator = require("../../core/evaluator.js");

var _stream = require("../../core/stream.js");

var _worker = require("../../core/worker.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

describe("annotation", function () {
  var PDFManagerMock = /*#__PURE__*/function () {
    function PDFManagerMock(params) {
      _classCallCheck(this, PDFManagerMock);

      this.docBaseUrl = params.docBaseUrl || null;
      this.pdfDocument = {
        catalog: {
          acroForm: new _primitives.Dict()
        }
      };
    }

    _createClass(PDFManagerMock, [{
      key: "ensure",
      value: function ensure(obj, prop, args) {
        return new Promise(function (resolve) {
          var value = obj[prop];

          if (typeof value === "function") {
            resolve(value.apply(obj, args));
          } else {
            resolve(value);
          }
        });
      }
    }, {
      key: "ensureCatalog",
      value: function ensureCatalog(prop, args) {
        return this.ensure(this.pdfDocument.catalog, prop, args);
      }
    }, {
      key: "ensureDoc",
      value: function ensureDoc(prop, args) {
        return this.ensure(this.pdfDocument, prop, args);
      }
    }]);

    return PDFManagerMock;
  }();

  var fontDataReader = new _api.DefaultStandardFontDataFactory({
    baseUrl: _test_utils.STANDARD_FONT_DATA_URL
  });

  function HandlerMock() {
    this.inputs = [];
  }

  HandlerMock.prototype = {
    send: function send(name, data) {
      this.inputs.push({
        name: name,
        data: data
      });
    },
    sendWithPromise: function sendWithPromise(name, data) {
      if (name !== "FetchStandardFontData") {
        return Promise.reject(new Error("Unsupported mock ".concat(name, ".")));
      }

      return fontDataReader.fetch(data);
    }
  };
  var pdfManagerMock, idFactoryMock, partialEvaluator;
  beforeAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var CMapReaderFactory, builtInCMapCache;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pdfManagerMock = new PDFManagerMock({
              docBaseUrl: null
            });
            CMapReaderFactory = new _api.DefaultCMapReaderFactory({
              baseUrl: _test_utils.CMAP_PARAMS.cMapUrl,
              isCompressed: _test_utils.CMAP_PARAMS.cMapPacked
            });
            builtInCMapCache = new Map();
            _context.t0 = builtInCMapCache;
            _context.next = 6;
            return CMapReaderFactory.fetch({
              name: "UniJIS-UTF16-H"
            });

          case 6:
            _context.t1 = _context.sent;

            _context.t0.set.call(_context.t0, "UniJIS-UTF16-H", _context.t1);

            _context.t2 = builtInCMapCache;
            _context.next = 11;
            return CMapReaderFactory.fetch({
              name: "Adobe-Japan1-UCS2"
            });

          case 11:
            _context.t3 = _context.sent;

            _context.t2.set.call(_context.t2, "Adobe-Japan1-UCS2", _context.t3);

            idFactoryMock = (0, _test_utils.createIdFactory)(0);
            partialEvaluator = new _evaluator.PartialEvaluator({
              xref: new _test_utils.XRefMock(),
              handler: new HandlerMock(),
              pageIndex: 0,
              idFactory: (0, _test_utils.createIdFactory)(0),
              fontCache: new _primitives.RefSetCache(),
              builtInCMapCache: builtInCMapCache,
              standardFontDataCache: new Map()
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterAll(function () {
    pdfManagerMock = null;
    idFactoryMock = null;
    partialEvaluator = null;
  });
  describe("AnnotationFactory", function () {
    it("should get id for annotation", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var annotationDict, annotationRef, xref, _yield$AnnotationFact, data;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationRef = _primitives.Ref.get(10, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context2.next = 7;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 7:
              _yield$AnnotationFact = _context2.sent;
              data = _yield$AnnotationFact.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.id).toEqual("10R");

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("should handle, and get fallback IDs for, annotations that are not " + "indirect objects (issue 7569)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var annotationDict, xref, idFactory, annotation1, annotation2;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              xref = new _test_utils.XRefMock();
              idFactory = (0, _test_utils.createIdFactory)(0);
              annotation1 = _annotation.AnnotationFactory.create(xref, annotationDict, pdfManagerMock, idFactory).then(function (_ref4) {
                var data = _ref4.data;
                expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
                expect(data.id).toEqual("annot_p0_1");
              });
              annotation2 = _annotation.AnnotationFactory.create(xref, annotationDict, pdfManagerMock, idFactory).then(function (_ref5) {
                var data = _ref5.data;
                expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
                expect(data.id).toEqual("annot_p0_2");
              });
              _context3.next = 9;
              return Promise.all([annotation1, annotation2]);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it("should handle missing /Subtype", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var annotationDict, annotationRef, xref, _yield$AnnotationFact2, data;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationRef = _primitives.Ref.get(1, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context4.next = 6;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 6:
              _yield$AnnotationFact2 = _context4.sent;
              data = _yield$AnnotationFact2.data;
              expect(data.annotationType).toBeUndefined();

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe("getQuadPoints", function () {
    var dict, rect;
    beforeEach(function () {
      dict = new _primitives.Dict();
      rect = [];
    });
    afterEach(function () {
      dict = null;
      rect = null;
    });
    it("should ignore missing quadpoints", function () {
      expect((0, _annotation.getQuadPoints)(dict, rect)).toEqual(null);
    });
    it("should ignore non-array values", function () {
      dict.set("QuadPoints", "foo");
      expect((0, _annotation.getQuadPoints)(dict, rect)).toEqual(null);
    });
    it("should ignore arrays where the length is not a multiple of eight", function () {
      dict.set("QuadPoints", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect((0, _annotation.getQuadPoints)(dict, rect)).toEqual(null);
    });
    it("should ignore quadpoints if one coordinate lies outside the rectangle", function () {
      rect = [10, 10, 20, 20];
      var inputs = [[11, 11, 12, 12, 9, 13, 14, 14], [11, 11, 12, 12, 13, 9, 14, 14], [11, 11, 12, 12, 21, 13, 14, 14], [11, 11, 12, 12, 13, 21, 14, 14]];

      for (var _i = 0, _inputs = inputs; _i < _inputs.length; _i++) {
        var input = _inputs[_i];
        dict.set("QuadPoints", input);
        expect((0, _annotation.getQuadPoints)(dict, rect)).toEqual(null);
      }
    });
    it("should process quadpoints in the standard order", function () {
      rect = [10, 10, 20, 20];
      dict.set("QuadPoints", [10, 20, 20, 20, 10, 10, 20, 10, 11, 19, 19, 19, 11, 11, 19, 11]);
      expect((0, _annotation.getQuadPoints)(dict, rect)).toEqual([[{
        x: 10,
        y: 20
      }, {
        x: 20,
        y: 20
      }, {
        x: 10,
        y: 10
      }, {
        x: 20,
        y: 10
      }], [{
        x: 11,
        y: 19
      }, {
        x: 19,
        y: 19
      }, {
        x: 11,
        y: 11
      }, {
        x: 19,
        y: 11
      }]]);
    });
    it("should normalize and process quadpoints in non-standard orders", function () {
      rect = [10, 10, 20, 20];
      var nonStandardOrders = [[10, 20, 20, 20, 20, 10, 10, 10], [10, 10, 20, 10, 10, 20, 20, 20], [10, 10, 20, 10, 20, 20, 10, 20]];

      for (var _i2 = 0, _nonStandardOrders = nonStandardOrders; _i2 < _nonStandardOrders.length; _i2++) {
        var nonStandardOrder = _nonStandardOrders[_i2];
        dict.set("QuadPoints", nonStandardOrder);
        expect((0, _annotation.getQuadPoints)(dict, rect)).toEqual([[{
          x: 10,
          y: 20
        }, {
          x: 20,
          y: 20
        }, {
          x: 10,
          y: 10
        }, {
          x: 20,
          y: 10
        }]]);
      }
    });
  });
  describe("Annotation", function () {
    var dict, ref;
    beforeAll(function () {
      dict = new _primitives.Dict();
      ref = _primitives.Ref.get(1, 0);
    });
    afterAll(function () {
      dict = ref = null;
    });
    it("should set and get valid contents", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setContents("Foo bar baz");
      expect(annotation._contents).toEqual({
        str: "Foo bar baz",
        dir: "ltr"
      });
    });
    it("should not set and get invalid contents", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setContents(undefined);
      expect(annotation._contents).toEqual({
        str: "",
        dir: "ltr"
      });
    });
    it("should set and get a valid modification date", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setModificationDate("D:20190422");
      expect(annotation.modificationDate).toEqual("D:20190422");
    });
    it("should not set and get an invalid modification date", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setModificationDate(undefined);
      expect(annotation.modificationDate).toEqual(null);
    });
    it("should set and get flags", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setFlags(13);
      expect(annotation.hasFlag(_util.AnnotationFlag.INVISIBLE)).toEqual(true);
      expect(annotation.hasFlag(_util.AnnotationFlag.NOZOOM)).toEqual(true);
      expect(annotation.hasFlag(_util.AnnotationFlag.PRINT)).toEqual(true);
      expect(annotation.hasFlag(_util.AnnotationFlag.READONLY)).toEqual(false);
      expect(annotation.hasFlag(_util.AnnotationFlag.HIDDEN)).toEqual(false);
    });
    it("should be viewable and not printable by default", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      expect(annotation.viewable).toEqual(true);
      expect(annotation.printable).toEqual(false);
    });
    it("should set and get a valid rectangle", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setRectangle([117, 694, 164.298, 720]);
      expect(annotation.rectangle).toEqual([117, 694, 164.298, 720]);
    });
    it("should not set and get an invalid rectangle", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setRectangle([117, 694, 164.298]);
      expect(annotation.rectangle).toEqual([0, 0, 0, 0]);
    });
    it("should reject a color if it is not an array", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor("red");
      expect(annotation.color).toEqual(new Uint8ClampedArray([0, 0, 0]));
    });
    it("should set and get a transparent color", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor([]);
      expect(annotation.color).toEqual(null);
    });
    it("should set and get a grayscale color", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor([0.4]);
      expect(annotation.color).toEqual(new Uint8ClampedArray([102, 102, 102]));
    });
    it("should set and get an RGB color", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor([0, 0, 1]);
      expect(annotation.color).toEqual(new Uint8ClampedArray([0, 0, 255]));
    });
    it("should set and get a CMYK color", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor([0.1, 0.92, 0.84, 0.02]);
      expect(annotation.color).toEqual(new Uint8ClampedArray([234, 59, 48]));
    });
    it("should not set and get an invalid color", function () {
      var annotation = new _annotation.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor([0.4, 0.6]);
      expect(annotation.color).toEqual(new Uint8ClampedArray([0, 0, 0]));
    });
  });
  describe("AnnotationBorderStyle", function () {
    it("should set and get a valid width", function () {
      var borderStyle = new _annotation.AnnotationBorderStyle();
      borderStyle.setWidth(3);
      expect(borderStyle.width).toEqual(3);
    });
    it("should not set and get an invalid width", function () {
      var borderStyle = new _annotation.AnnotationBorderStyle();
      borderStyle.setWidth("three");
      expect(borderStyle.width).toEqual(1);
    });
    it("should set the width to zero, when the input is a `Name` (issue 10385)", function () {
      var borderStyleZero = new _annotation.AnnotationBorderStyle();
      borderStyleZero.setWidth(_primitives.Name.get("0"));
      var borderStyleFive = new _annotation.AnnotationBorderStyle();
      borderStyleFive.setWidth(_primitives.Name.get("5"));
      expect(borderStyleZero.width).toEqual(0);
      expect(borderStyleFive.width).toEqual(0);
    });
    it("should set and get a valid style", function () {
      var borderStyle = new _annotation.AnnotationBorderStyle();
      borderStyle.setStyle(_primitives.Name.get("D"));
      expect(borderStyle.style).toEqual(_util.AnnotationBorderStyleType.DASHED);
    });
    it("should not set and get an invalid style", function () {
      var borderStyle = new _annotation.AnnotationBorderStyle();
      borderStyle.setStyle("Dashed");
      expect(borderStyle.style).toEqual(_util.AnnotationBorderStyleType.SOLID);
    });
    it("should set and get a valid dash array", function () {
      var borderStyle = new _annotation.AnnotationBorderStyle();
      borderStyle.setDashArray([1, 2, 3]);
      expect(borderStyle.dashArray).toEqual([1, 2, 3]);
    });
    it("should not set and get an invalid dash array", function () {
      var borderStyle = new _annotation.AnnotationBorderStyle();
      borderStyle.setDashArray([0, 0]);
      expect(borderStyle.dashArray).toEqual([3]);
    });
    it("should set and get a valid horizontal corner radius", function () {
      var borderStyle = new _annotation.AnnotationBorderStyle();
      borderStyle.setHorizontalCornerRadius(3);
      expect(borderStyle.horizontalCornerRadius).toEqual(3);
    });
    it("should not set and get an invalid horizontal corner radius", function () {
      var borderStyle = new _annotation.AnnotationBorderStyle();
      borderStyle.setHorizontalCornerRadius("three");
      expect(borderStyle.horizontalCornerRadius).toEqual(0);
    });
    it("should set and get a valid vertical corner radius", function () {
      var borderStyle = new _annotation.AnnotationBorderStyle();
      borderStyle.setVerticalCornerRadius(3);
      expect(borderStyle.verticalCornerRadius).toEqual(3);
    });
    it("should not set and get an invalid vertical corner radius", function () {
      var borderStyle = new _annotation.AnnotationBorderStyle();
      borderStyle.setVerticalCornerRadius("three");
      expect(borderStyle.verticalCornerRadius).toEqual(0);
    });
  });
  describe("MarkupAnnotation", function () {
    var dict, ref;
    beforeAll(function () {
      dict = new _primitives.Dict();
      ref = _primitives.Ref.get(1, 0);
    });
    afterAll(function () {
      dict = ref = null;
    });
    it("should set and get a valid creation date", function () {
      var markupAnnotation = new _annotation.MarkupAnnotation({
        dict: dict,
        ref: ref
      });
      markupAnnotation.setCreationDate("D:20190422");
      expect(markupAnnotation.creationDate).toEqual("D:20190422");
    });
    it("should not set and get an invalid creation date", function () {
      var markupAnnotation = new _annotation.MarkupAnnotation({
        dict: dict,
        ref: ref
      });
      markupAnnotation.setCreationDate(undefined);
      expect(markupAnnotation.creationDate).toEqual(null);
    });
    it("should not parse IRT/RT when not defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var xref, _yield$AnnotationFact3, data;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              dict.set("Type", _primitives.Name.get("Annot"));
              dict.set("Subtype", _primitives.Name.get("Text"));
              xref = new _test_utils.XRefMock([{
                ref: ref,
                data: dict
              }]);
              _context5.next = 5;
              return _annotation.AnnotationFactory.create(xref, ref, pdfManagerMock, idFactoryMock);

            case 5:
              _yield$AnnotationFact3 = _context5.sent;
              data = _yield$AnnotationFact3.data;
              expect(data.inReplyTo).toBeUndefined();
              expect(data.replyType).toBeUndefined();

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it("should parse IRT and set default RT when not defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var annotationRef, annotationDict, replyRef, replyDict, xref, _yield$AnnotationFact4, data;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              annotationRef = _primitives.Ref.get(819, 0);
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Text"));
              replyRef = _primitives.Ref.get(820, 0);
              replyDict = new _primitives.Dict();
              replyDict.set("Type", _primitives.Name.get("Annot"));
              replyDict.set("Subtype", _primitives.Name.get("Text"));
              replyDict.set("IRT", annotationRef);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }, {
                ref: replyRef,
                data: replyDict
              }]);
              annotationDict.assignXref(xref);
              replyDict.assignXref(xref);
              _context6.next = 14;
              return _annotation.AnnotationFactory.create(xref, replyRef, pdfManagerMock, idFactoryMock);

            case 14:
              _yield$AnnotationFact4 = _context6.sent;
              data = _yield$AnnotationFact4.data;
              expect(data.inReplyTo).toEqual(annotationRef.toString());
              expect(data.replyType).toEqual("R");

            case 18:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it("should parse IRT/RT for a group type", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var annotationRef, annotationDict, popupRef, popupDict, replyRef, replyDict, xref, _yield$AnnotationFact5, data;

      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              annotationRef = _primitives.Ref.get(819, 0);
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Text"));
              annotationDict.set("T", "ParentTitle");
              annotationDict.set("Contents", "ParentText");
              annotationDict.set("CreationDate", "D:20180423");
              annotationDict.set("M", "D:20190423");
              annotationDict.set("C", [0, 0, 1]);
              popupRef = _primitives.Ref.get(820, 0);
              popupDict = new _primitives.Dict();
              popupDict.set("Type", _primitives.Name.get("Annot"));
              popupDict.set("Subtype", _primitives.Name.get("Popup"));
              popupDict.set("Parent", annotationRef);
              annotationDict.set("Popup", popupRef);
              replyRef = _primitives.Ref.get(821, 0);
              replyDict = new _primitives.Dict();
              replyDict.set("Type", _primitives.Name.get("Annot"));
              replyDict.set("Subtype", _primitives.Name.get("Text"));
              replyDict.set("IRT", annotationRef);
              replyDict.set("RT", _primitives.Name.get("Group"));
              replyDict.set("T", "ReplyTitle");
              replyDict.set("Contents", "ReplyText");
              replyDict.set("CreationDate", "D:20180523");
              replyDict.set("M", "D:20190523");
              replyDict.set("C", [0.4]);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }, {
                ref: popupRef,
                data: popupDict
              }, {
                ref: replyRef,
                data: replyDict
              }]);
              annotationDict.assignXref(xref);
              popupDict.assignXref(xref);
              replyDict.assignXref(xref);
              _context7.next = 32;
              return _annotation.AnnotationFactory.create(xref, replyRef, pdfManagerMock, idFactoryMock);

            case 32:
              _yield$AnnotationFact5 = _context7.sent;
              data = _yield$AnnotationFact5.data;
              expect(data.inReplyTo).toEqual(annotationRef.toString());
              expect(data.replyType).toEqual("Group");
              expect(data.titleObj).toEqual({
                str: "ParentTitle",
                dir: "ltr"
              });
              expect(data.contentsObj).toEqual({
                str: "ParentText",
                dir: "ltr"
              });
              expect(data.creationDate).toEqual("D:20180423");
              expect(data.modificationDate).toEqual("D:20190423");
              expect(data.color).toEqual(new Uint8ClampedArray([0, 0, 255]));
              expect(data.hasPopup).toEqual(true);

            case 42:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it("should parse IRT/RT for a reply type", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var annotationRef, annotationDict, popupRef, popupDict, replyRef, replyDict, xref, _yield$AnnotationFact6, data;

      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              annotationRef = _primitives.Ref.get(819, 0);
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Text"));
              annotationDict.set("T", "ParentTitle");
              annotationDict.set("Contents", "ParentText");
              annotationDict.set("CreationDate", "D:20180423");
              annotationDict.set("M", "D:20190423");
              annotationDict.set("C", [0, 0, 1]);
              popupRef = _primitives.Ref.get(820, 0);
              popupDict = new _primitives.Dict();
              popupDict.set("Type", _primitives.Name.get("Annot"));
              popupDict.set("Subtype", _primitives.Name.get("Popup"));
              popupDict.set("Parent", annotationRef);
              annotationDict.set("Popup", popupRef);
              replyRef = _primitives.Ref.get(821, 0);
              replyDict = new _primitives.Dict();
              replyDict.set("Type", _primitives.Name.get("Annot"));
              replyDict.set("Subtype", _primitives.Name.get("Text"));
              replyDict.set("IRT", annotationRef);
              replyDict.set("RT", _primitives.Name.get("R"));
              replyDict.set("T", "ReplyTitle");
              replyDict.set("Contents", "ReplyText");
              replyDict.set("CreationDate", "D:20180523");
              replyDict.set("M", "D:20190523");
              replyDict.set("C", [0.4]);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }, {
                ref: popupRef,
                data: popupDict
              }, {
                ref: replyRef,
                data: replyDict
              }]);
              annotationDict.assignXref(xref);
              popupDict.assignXref(xref);
              replyDict.assignXref(xref);
              _context8.next = 32;
              return _annotation.AnnotationFactory.create(xref, replyRef, pdfManagerMock, idFactoryMock);

            case 32:
              _yield$AnnotationFact6 = _context8.sent;
              data = _yield$AnnotationFact6.data;
              expect(data.inReplyTo).toEqual(annotationRef.toString());
              expect(data.replyType).toEqual("R");
              expect(data.titleObj).toEqual({
                str: "ReplyTitle",
                dir: "ltr"
              });
              expect(data.contentsObj).toEqual({
                str: "ReplyText",
                dir: "ltr"
              });
              expect(data.creationDate).toEqual("D:20180523");
              expect(data.modificationDate).toEqual("D:20190523");
              expect(data.color).toEqual(new Uint8ClampedArray([102, 102, 102]));
              expect(data.hasPopup).toEqual(false);

            case 42:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe("TextAnnotation", function () {
    it("should not parse state model and state when not defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var annotationRef, annotationDict, replyRef, replyDict, xref, _yield$AnnotationFact7, data;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              annotationRef = _primitives.Ref.get(819, 0);
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Text"));
              annotationDict.set("Contents", "TestText");
              replyRef = _primitives.Ref.get(820, 0);
              replyDict = new _primitives.Dict();
              replyDict.set("Type", _primitives.Name.get("Annot"));
              replyDict.set("Subtype", _primitives.Name.get("Text"));
              replyDict.set("IRT", annotationRef);
              replyDict.set("RT", _primitives.Name.get("R"));
              replyDict.set("Contents", "ReplyText");
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }, {
                ref: replyRef,
                data: replyDict
              }]);
              annotationDict.assignXref(xref);
              replyDict.assignXref(xref);
              _context9.next = 17;
              return _annotation.AnnotationFactory.create(xref, replyRef, pdfManagerMock, idFactoryMock);

            case 17:
              _yield$AnnotationFact7 = _context9.sent;
              data = _yield$AnnotationFact7.data;
              expect(data.stateModel).toBeNull();
              expect(data.state).toBeNull();

            case 21:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it("should correctly parse state model and state when defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var annotationRef, annotationDict, replyRef, replyDict, xref, _yield$AnnotationFact8, data;

      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              annotationRef = _primitives.Ref.get(819, 0);
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Text"));
              replyRef = _primitives.Ref.get(820, 0);
              replyDict = new _primitives.Dict();
              replyDict.set("Type", _primitives.Name.get("Annot"));
              replyDict.set("Subtype", _primitives.Name.get("Text"));
              replyDict.set("IRT", annotationRef);
              replyDict.set("RT", _primitives.Name.get("R"));
              replyDict.set("StateModel", "Review");
              replyDict.set("State", "Rejected");
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }, {
                ref: replyRef,
                data: replyDict
              }]);
              annotationDict.assignXref(xref);
              replyDict.assignXref(xref);
              _context10.next = 17;
              return _annotation.AnnotationFactory.create(xref, replyRef, pdfManagerMock, idFactoryMock);

            case 17:
              _yield$AnnotationFact8 = _context10.sent;
              data = _yield$AnnotationFact8.data;
              expect(data.stateModel).toEqual("Review");
              expect(data.state).toEqual("Rejected");

            case 21:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  describe("LinkAnnotation", function () {
    it("should correctly parse a URI action", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var actionDict, annotationDict, annotationRef, xref, _yield$AnnotationFact9, data;

      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              actionDict = new _primitives.Dict();
              actionDict.set("Type", _primitives.Name.get("Action"));
              actionDict.set("S", _primitives.Name.get("URI"));
              actionDict.set("URI", "http://www.ctan.org/tex-archive/info/lshort");
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("A", actionDict);
              annotationRef = _primitives.Ref.get(820, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context11.next = 12;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 12:
              _yield$AnnotationFact9 = _context11.sent;
              data = _yield$AnnotationFact9.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toEqual("http://www.ctan.org/tex-archive/info/lshort");
              expect(data.unsafeUrl).toEqual("http://www.ctan.org/tex-archive/info/lshort");
              expect(data.dest).toBeUndefined();

            case 18:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it("should correctly parse a URI action, where the URI entry " + "is missing a protocol", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var actionDict, annotationDict, annotationRef, xref, _yield$AnnotationFact10, data;

      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              actionDict = new _primitives.Dict();
              actionDict.set("Type", _primitives.Name.get("Action"));
              actionDict.set("S", _primitives.Name.get("URI"));
              actionDict.set("URI", "www.hmrc.gov.uk");
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("A", actionDict);
              annotationRef = _primitives.Ref.get(353, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context12.next = 12;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 12:
              _yield$AnnotationFact10 = _context12.sent;
              data = _yield$AnnotationFact10.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toEqual("http://www.hmrc.gov.uk/");
              expect(data.unsafeUrl).toEqual("www.hmrc.gov.uk");
              expect(data.dest).toBeUndefined();

            case 18:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it("should correctly parse a URI action, where the URI entry " + "has an incorrect encoding (bug 1122280)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var actionStream, parser, actionDict, annotationDict, annotationRef, xref, _yield$AnnotationFact11, data;

      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              actionStream = new _stream.StringStream("<<\n" + "/Type /Action\n" + "/S /URI\n" + "/URI (http://www.example.com/\\303\\274\\303\\266\\303\\244)\n" + ">>\n");
              parser = new _parser.Parser({
                lexer: new _parser.Lexer(actionStream),
                xref: null
              });
              actionDict = parser.getObj();
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("A", actionDict);
              annotationRef = _primitives.Ref.get(8, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context13.next = 11;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 11:
              _yield$AnnotationFact11 = _context13.sent;
              data = _yield$AnnotationFact11.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toEqual(new URL((0, _util.stringToUTF8String)("http://www.example.com/\xC3\xBC\xC3\xB6\xC3\xA4")).href);
              expect(data.unsafeUrl).toEqual("http://www.example.com/\xC3\xBC\xC3\xB6\xC3\xA4");
              expect(data.dest).toBeUndefined();

            case 17:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    it("should correctly parse a GoTo action", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var actionDict, annotationDict, annotationRef, xref, _yield$AnnotationFact12, data;

      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              actionDict = new _primitives.Dict();
              actionDict.set("Type", _primitives.Name.get("Action"));
              actionDict.set("S", _primitives.Name.get("GoTo"));
              actionDict.set("D", "page.157");
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("A", actionDict);
              annotationRef = _primitives.Ref.get(798, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context14.next = 12;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 12:
              _yield$AnnotationFact12 = _context14.sent;
              data = _yield$AnnotationFact12.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toBeUndefined();
              expect(data.unsafeUrl).toBeUndefined();
              expect(data.dest).toEqual("page.157");

            case 18:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it("should correctly parse a GoToR action, where the FileSpec entry " + "is a string containing a relative URL", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var actionDict, annotationDict, annotationRef, xref, _yield$AnnotationFact13, data;

      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              actionDict = new _primitives.Dict();
              actionDict.set("Type", _primitives.Name.get("Action"));
              actionDict.set("S", _primitives.Name.get("GoToR"));
              actionDict.set("F", "../../0013/001346/134685E.pdf");
              actionDict.set("D", "4.3");
              actionDict.set("NewWindow", true);
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("A", actionDict);
              annotationRef = _primitives.Ref.get(489, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context15.next = 14;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 14:
              _yield$AnnotationFact13 = _context15.sent;
              data = _yield$AnnotationFact13.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toBeUndefined();
              expect(data.unsafeUrl).toEqual("../../0013/001346/134685E.pdf#4.3");
              expect(data.dest).toBeUndefined();
              expect(data.newWindow).toEqual(true);

            case 21:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it("should correctly parse a GoToR action, containing a relative URL, " + 'with the "docBaseUrl" parameter specified', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var actionDict, annotationDict, annotationRef, xref, pdfManager, _yield$AnnotationFact14, data;

      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              actionDict = new _primitives.Dict();
              actionDict.set("Type", _primitives.Name.get("Action"));
              actionDict.set("S", _primitives.Name.get("GoToR"));
              actionDict.set("F", "../../0013/001346/134685E.pdf");
              actionDict.set("D", "4.3");
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("A", actionDict);
              annotationRef = _primitives.Ref.get(489, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              pdfManager = new PDFManagerMock({
                docBaseUrl: "http://www.example.com/test/pdfs/qwerty.pdf"
              });
              _context16.next = 14;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManager, idFactoryMock);

            case 14:
              _yield$AnnotationFact14 = _context16.sent;
              data = _yield$AnnotationFact14.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toEqual("http://www.example.com/0013/001346/134685E.pdf#4.3");
              expect(data.unsafeUrl).toEqual("../../0013/001346/134685E.pdf#4.3");
              expect(data.dest).toBeUndefined();

            case 20:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    it("should correctly parse a GoToR action, with named destination", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var actionDict, annotationDict, annotationRef, xref, _yield$AnnotationFact15, data;

      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              actionDict = new _primitives.Dict();
              actionDict.set("Type", _primitives.Name.get("Action"));
              actionDict.set("S", _primitives.Name.get("GoToR"));
              actionDict.set("F", "http://www.example.com/test.pdf");
              actionDict.set("D", "15");
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("A", actionDict);
              annotationRef = _primitives.Ref.get(495, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context17.next = 13;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 13:
              _yield$AnnotationFact15 = _context17.sent;
              data = _yield$AnnotationFact15.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toEqual("http://www.example.com/test.pdf#15");
              expect(data.unsafeUrl).toEqual("http://www.example.com/test.pdf#15");
              expect(data.dest).toBeUndefined();
              expect(data.newWindow).toBeFalsy();

            case 20:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
    it("should correctly parse a GoToR action, with explicit destination array", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var actionDict, annotationDict, annotationRef, xref, _yield$AnnotationFact16, data;

      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              actionDict = new _primitives.Dict();
              actionDict.set("Type", _primitives.Name.get("Action"));
              actionDict.set("S", _primitives.Name.get("GoToR"));
              actionDict.set("F", "http://www.example.com/test.pdf");
              actionDict.set("D", [14, _primitives.Name.get("XYZ"), null, 298.043, null]);
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("A", actionDict);
              annotationRef = _primitives.Ref.get(489, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context18.next = 13;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 13:
              _yield$AnnotationFact16 = _context18.sent;
              data = _yield$AnnotationFact16.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toEqual(new URL("http://www.example.com/test.pdf#" + '[14,{"name":"XYZ"},null,298.043,null]').href);
              expect(data.unsafeUrl).toEqual("http://www.example.com/test.pdf#" + '[14,{"name":"XYZ"},null,298.043,null]');
              expect(data.dest).toBeUndefined();
              expect(data.newWindow).toBeFalsy();

            case 20:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
    it("should correctly parse a Launch action, where the FileSpec dict " + 'contains a relative URL, with the "docBaseUrl" parameter specified', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var fileSpecDict, actionDict, annotationDict, annotationRef, xref, pdfManager, _yield$AnnotationFact17, data;

      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              fileSpecDict = new _primitives.Dict();
              fileSpecDict.set("Type", _primitives.Name.get("FileSpec"));
              fileSpecDict.set("F", "Part II/Part II.pdf");
              fileSpecDict.set("UF", "Part II/Part II.pdf");
              actionDict = new _primitives.Dict();
              actionDict.set("Type", _primitives.Name.get("Action"));
              actionDict.set("S", _primitives.Name.get("Launch"));
              actionDict.set("F", fileSpecDict);
              actionDict.set("NewWindow", true);
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("A", actionDict);
              annotationRef = _primitives.Ref.get(88, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              pdfManager = new PDFManagerMock({
                docBaseUrl: "http://www.example.com/test/pdfs/qwerty.pdf"
              });
              _context19.next = 18;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManager, idFactoryMock);

            case 18:
              _yield$AnnotationFact17 = _context19.sent;
              data = _yield$AnnotationFact17.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toEqual(new URL("http://www.example.com/test/pdfs/Part II/Part II.pdf").href);
              expect(data.unsafeUrl).toEqual("Part II/Part II.pdf");
              expect(data.dest).toBeUndefined();
              expect(data.newWindow).toEqual(true);

            case 25:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    it("should recover valid URLs from JavaScript actions having certain " + "white-listed formats", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var checkJsAction, annotation1, annotation2, annotation3;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              checkJsAction = function _checkJsAction(params) {
                var jsEntry = params.jsEntry;
                var expectedUrl = params.expectedUrl;
                var expectedUnsafeUrl = params.expectedUnsafeUrl;
                var expectedNewWindow = params.expectedNewWindow;
                var actionDict = new _primitives.Dict();
                actionDict.set("Type", _primitives.Name.get("Action"));
                actionDict.set("S", _primitives.Name.get("JavaScript"));
                actionDict.set("JS", jsEntry);
                var annotationDict = new _primitives.Dict();
                annotationDict.set("Type", _primitives.Name.get("Annot"));
                annotationDict.set("Subtype", _primitives.Name.get("Link"));
                annotationDict.set("A", actionDict);

                var annotationRef = _primitives.Ref.get(46, 0);

                var xref = new _test_utils.XRefMock([{
                  ref: annotationRef,
                  data: annotationDict
                }]);
                return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref23) {
                  var data = _ref23.data;
                  expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
                  expect(data.url).toEqual(expectedUrl);
                  expect(data.unsafeUrl).toEqual(expectedUnsafeUrl);
                  expect(data.dest).toBeUndefined();
                  expect(data.newWindow).toEqual(expectedNewWindow);
                });
              };

              annotation1 = checkJsAction({
                jsEntry: 'function someFun() { return "qwerty"; } someFun();',
                expectedUrl: undefined,
                expectedUnsafeUrl: undefined,
                expectedNewWindow: undefined
              });
              annotation2 = checkJsAction({
                jsEntry: "window.open('http://www.example.com/test.pdf')",
                expectedUrl: new URL("http://www.example.com/test.pdf").href,
                expectedUnsafeUrl: "http://www.example.com/test.pdf",
                expectedNewWindow: false
              });
              annotation3 = checkJsAction({
                jsEntry: new _stream.StringStream('app.launchURL("http://www.example.com/test.pdf", true)'),
                expectedUrl: new URL("http://www.example.com/test.pdf").href,
                expectedUnsafeUrl: "http://www.example.com/test.pdf",
                expectedNewWindow: true
              });
              _context20.next = 6;
              return Promise.all([annotation1, annotation2, annotation3]);

            case 6:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
    it("should correctly parse a Named action", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      var actionDict, annotationDict, annotationRef, xref, _yield$AnnotationFact18, data;

      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              actionDict = new _primitives.Dict();
              actionDict.set("Type", _primitives.Name.get("Action"));
              actionDict.set("S", _primitives.Name.get("Named"));
              actionDict.set("N", _primitives.Name.get("GoToPage"));
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("A", actionDict);
              annotationRef = _primitives.Ref.get(12, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context21.next = 12;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 12:
              _yield$AnnotationFact18 = _context21.sent;
              data = _yield$AnnotationFact18.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toBeUndefined();
              expect(data.unsafeUrl).toBeUndefined();
              expect(data.action).toEqual("GoToPage");

            case 18:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    })));
    it("should correctly parse a simple Dest", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      var annotationDict, annotationRef, xref, _yield$AnnotationFact19, data;

      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("Dest", _primitives.Name.get("LI0"));
              annotationRef = _primitives.Ref.get(583, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context22.next = 8;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 8:
              _yield$AnnotationFact19 = _context22.sent;
              data = _yield$AnnotationFact19.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toBeUndefined();
              expect(data.unsafeUrl).toBeUndefined();
              expect(data.dest).toEqual("LI0");

            case 14:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
    it("should correctly parse a simple Dest, with explicit destination array", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      var annotationDict, annotationRef, xref, _yield$AnnotationFact20, data;

      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("Dest", [_primitives.Ref.get(17, 0), _primitives.Name.get("XYZ"), 0, 841.89, null]);
              annotationRef = _primitives.Ref.get(10, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context23.next = 8;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 8:
              _yield$AnnotationFact20 = _context23.sent;
              data = _yield$AnnotationFact20.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toBeUndefined();
              expect(data.unsafeUrl).toBeUndefined();
              expect(data.dest).toEqual([_primitives.Ref.get(17, 0), _primitives.Name.get("XYZ"), 0, 841.89, null]);

            case 14:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    })));
    it("should correctly parse a Dest, which violates the specification " + "by containing a dictionary", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      var destDict, annotationDict, annotationRef, xref, _yield$AnnotationFact21, data;

      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              destDict = new _primitives.Dict();
              destDict.set("Type", _primitives.Name.get("Action"));
              destDict.set("S", _primitives.Name.get("GoTo"));
              destDict.set("D", "page.157");
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("Dest", destDict);
              annotationRef = _primitives.Ref.get(798, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context24.next = 12;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 12:
              _yield$AnnotationFact21 = _context24.sent;
              data = _yield$AnnotationFact21.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.url).toBeUndefined();
              expect(data.unsafeUrl).toBeUndefined();
              expect(data.dest).toEqual("page.157");

            case 18:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    })));
    it("should not set quadpoints if not defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      var annotationDict, annotationRef, xref, _yield$AnnotationFact22, data;

      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context25.next = 7;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 7:
              _yield$AnnotationFact22 = _context25.sent;
              data = _yield$AnnotationFact22.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.quadPoints).toBeUndefined();

            case 11:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    })));
    it("should set quadpoints if defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      var annotationDict, annotationRef, xref, _yield$AnnotationFact23, data;

      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Link"));
              annotationDict.set("Rect", [10, 10, 20, 20]);
              annotationDict.set("QuadPoints", [10, 20, 20, 20, 10, 10, 20, 10]);
              annotationRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }]);
              _context26.next = 9;
              return _annotation.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact23 = _context26.sent;
              data = _yield$AnnotationFact23.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINK);
              expect(data.quadPoints).toEqual([[{
                x: 10,
                y: 20
              }, {
                x: 20,
                y: 20
              }, {
                x: 10,
                y: 10
              }, {
                x: 20,
                y: 10
              }]]);

            case 13:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    })));
  });
  describe("WidgetAnnotation", function () {
    var widgetDict;
    beforeEach(function () {
      widgetDict = new _primitives.Dict();
      widgetDict.set("Type", _primitives.Name.get("Annot"));
      widgetDict.set("Subtype", _primitives.Name.get("Widget"));
    });
    afterEach(function () {
      widgetDict = null;
    });
    it("should handle unknown field names", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      var widgetRef, xref, _yield$AnnotationFact24, data;

      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              widgetRef = _primitives.Ref.get(20, 0);
              xref = new _test_utils.XRefMock([{
                ref: widgetRef,
                data: widgetDict
              }]);
              _context27.next = 4;
              return _annotation.AnnotationFactory.create(xref, widgetRef, pdfManagerMock, idFactoryMock);

            case 4:
              _yield$AnnotationFact24 = _context27.sent;
              data = _yield$AnnotationFact24.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.fieldName).toEqual("");

            case 8:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27);
    })));
    it("should construct the field name when there are no ancestors", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
      var widgetRef, xref, _yield$AnnotationFact25, data;

      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              widgetDict.set("T", "foo");
              widgetRef = _primitives.Ref.get(21, 0);
              xref = new _test_utils.XRefMock([{
                ref: widgetRef,
                data: widgetDict
              }]);
              _context28.next = 5;
              return _annotation.AnnotationFactory.create(xref, widgetRef, pdfManagerMock, idFactoryMock);

            case 5:
              _yield$AnnotationFact25 = _context28.sent;
              data = _yield$AnnotationFact25.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.fieldName).toEqual("foo");

            case 9:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28);
    })));
    it("should construct the field name when there are ancestors", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
      var firstParent, secondParent, widgetRef, xref, _yield$AnnotationFact26, data;

      return _regenerator["default"].wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              firstParent = new _primitives.Dict();
              firstParent.set("T", "foo");
              secondParent = new _primitives.Dict();
              secondParent.set("Parent", firstParent);
              secondParent.set("T", "bar");
              widgetDict.set("Parent", secondParent);
              widgetDict.set("T", "baz");
              widgetRef = _primitives.Ref.get(22, 0);
              xref = new _test_utils.XRefMock([{
                ref: widgetRef,
                data: widgetDict
              }]);
              _context29.next = 11;
              return _annotation.AnnotationFactory.create(xref, widgetRef, pdfManagerMock, idFactoryMock);

            case 11:
              _yield$AnnotationFact26 = _context29.sent;
              data = _yield$AnnotationFact26.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.fieldName).toEqual("foo.bar.baz");

            case 15:
            case "end":
              return _context29.stop();
          }
        }
      }, _callee29);
    })));
    it("should construct the field name if a parent is not a dictionary " + "(issue 8143)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
      var parentDict, widgetRef, xref, _yield$AnnotationFact27, data;

      return _regenerator["default"].wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              parentDict = new _primitives.Dict();
              parentDict.set("Parent", null);
              parentDict.set("T", "foo");
              widgetDict.set("Parent", parentDict);
              widgetDict.set("T", "bar");
              widgetRef = _primitives.Ref.get(22, 0);
              xref = new _test_utils.XRefMock([{
                ref: widgetRef,
                data: widgetDict
              }]);
              _context30.next = 9;
              return _annotation.AnnotationFactory.create(xref, widgetRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact27 = _context30.sent;
              data = _yield$AnnotationFact27.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.fieldName).toEqual("foo.bar");

            case 13:
            case "end":
              return _context30.stop();
          }
        }
      }, _callee30);
    })));
  });
  describe("TextWidgetAnnotation", function () {
    var textWidgetDict, helvRefObj, gothRefObj;
    beforeEach(function () {
      textWidgetDict = new _primitives.Dict();
      textWidgetDict.set("Type", _primitives.Name.get("Annot"));
      textWidgetDict.set("Subtype", _primitives.Name.get("Widget"));
      textWidgetDict.set("FT", _primitives.Name.get("Tx"));
      var helvDict = new _primitives.Dict();
      helvDict.set("BaseFont", _primitives.Name.get("Helvetica"));
      helvDict.set("Type", _primitives.Name.get("Font"));
      helvDict.set("Subtype", _primitives.Name.get("Type1"));
      var gothDict = new _primitives.Dict();
      gothDict.set("BaseFont", _primitives.Name.get("MSGothic"));
      gothDict.set("Type", _primitives.Name.get("Font"));
      gothDict.set("Subtype", _primitives.Name.get("Type0"));
      gothDict.set("Encoding", _primitives.Name.get("UniJIS-UTF16-H"));
      gothDict.set("Name", _primitives.Name.get("MSGothic"));
      var cidSysInfoDict = new _primitives.Dict();
      cidSysInfoDict.set("Ordering", "Japan1");
      cidSysInfoDict.set("Registry", "Adobe");
      cidSysInfoDict.set("Supplement", "5");
      var fontDescriptorDict = new _primitives.Dict();
      fontDescriptorDict.set("FontName", _primitives.Name.get("MSGothic"));
      fontDescriptorDict.set("CapHeight", "680");
      var gothDescendantDict = new _primitives.Dict();
      gothDescendantDict.set("BaseFont", _primitives.Name.get("MSGothic"));
      gothDescendantDict.set("CIDSystemInfo", cidSysInfoDict);
      gothDescendantDict.set("Subtype", _primitives.Name.get("CIDFontType2"));
      gothDescendantDict.set("Type", _primitives.Name.get("Font"));
      gothDescendantDict.set("FontDescriptor", fontDescriptorDict);
      gothDict.set("DescendantFonts", [gothDescendantDict]);

      var helvRef = _primitives.Ref.get(314, 0);

      var gothRef = _primitives.Ref.get(159, 0);

      helvRefObj = {
        ref: helvRef,
        data: helvDict
      };
      gothRefObj = {
        ref: gothRef,
        data: gothDict
      };
      var resourceDict = new _primitives.Dict();
      var fontDict = new _primitives.Dict();
      fontDict.set("Helv", helvRef);
      resourceDict.set("Font", fontDict);
      textWidgetDict.set("DA", "/Helv 5 Tf");
      textWidgetDict.set("DR", resourceDict);
      textWidgetDict.set("Rect", [0, 0, 32, 10]);
    });
    afterEach(function () {
      textWidgetDict = helvRefObj = gothRefObj = null;
    });
    it("should handle unknown text alignment, maximum length and flags", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
      var textWidgetRef, xref, _yield$AnnotationFact28, data;

      return _regenerator["default"].wrap(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              textWidgetDict.set("DV", "foo");
              textWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }]);
              _context31.next = 5;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 5:
              _yield$AnnotationFact28 = _context31.sent;
              data = _yield$AnnotationFact28.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.textAlignment).toEqual(null);
              expect(data.maxLen).toEqual(null);
              expect(data.readOnly).toEqual(false);
              expect(data.hidden).toEqual(false);
              expect(data.multiLine).toEqual(false);
              expect(data.comb).toEqual(false);
              expect(data.defaultFieldValue).toEqual("foo");

            case 15:
            case "end":
              return _context31.stop();
          }
        }
      }, _callee31);
    })));
    it("should not set invalid text alignment, maximum length and flags", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
      var textWidgetRef, xref, _yield$AnnotationFact29, data;

      return _regenerator["default"].wrap(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              textWidgetDict.set("Q", "center");
              textWidgetDict.set("MaxLen", "five");
              textWidgetDict.set("Ff", "readonly");
              textWidgetRef = _primitives.Ref.get(43, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }]);
              _context32.next = 7;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 7:
              _yield$AnnotationFact29 = _context32.sent;
              data = _yield$AnnotationFact29.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.textAlignment).toEqual(null);
              expect(data.maxLen).toEqual(null);
              expect(data.readOnly).toEqual(false);
              expect(data.hidden).toEqual(false);
              expect(data.multiLine).toEqual(false);
              expect(data.comb).toEqual(false);

            case 16:
            case "end":
              return _context32.stop();
          }
        }
      }, _callee32);
    })));
    it("should set valid text alignment, maximum length and flags", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
      var textWidgetRef, xref, _yield$AnnotationFact30, data;

      return _regenerator["default"].wrap(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              textWidgetDict.set("Q", 1);
              textWidgetDict.set("MaxLen", 20);
              textWidgetDict.set("Ff", _util.AnnotationFieldFlag.READONLY + _util.AnnotationFieldFlag.MULTILINE);
              textWidgetRef = _primitives.Ref.get(84, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }]);
              _context33.next = 7;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 7:
              _yield$AnnotationFact30 = _context33.sent;
              data = _yield$AnnotationFact30.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.textAlignment).toEqual(1);
              expect(data.maxLen).toEqual(20);
              expect(data.readOnly).toEqual(true);
              expect(data.hidden).toEqual(false);
              expect(data.multiLine).toEqual(true);

            case 15:
            case "end":
              return _context33.stop();
          }
        }
      }, _callee33);
    })));
    it("should reject comb fields without a maximum length", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee34() {
      var textWidgetRef, xref, _yield$AnnotationFact31, data;

      return _regenerator["default"].wrap(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              textWidgetDict.set("Ff", _util.AnnotationFieldFlag.COMB);
              textWidgetRef = _primitives.Ref.get(46, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }]);
              _context34.next = 5;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 5:
              _yield$AnnotationFact31 = _context34.sent;
              data = _yield$AnnotationFact31.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.comb).toEqual(false);

            case 9:
            case "end":
              return _context34.stop();
          }
        }
      }, _callee34);
    })));
    it("should accept comb fields with a maximum length", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee35() {
      var textWidgetRef, xref, _yield$AnnotationFact32, data;

      return _regenerator["default"].wrap(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              textWidgetDict.set("MaxLen", 20);
              textWidgetDict.set("Ff", _util.AnnotationFieldFlag.COMB);
              textWidgetRef = _primitives.Ref.get(46, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }]);
              _context35.next = 6;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 6:
              _yield$AnnotationFact32 = _context35.sent;
              data = _yield$AnnotationFact32.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.comb).toEqual(true);

            case 10:
            case "end":
              return _context35.stop();
          }
        }
      }, _callee35);
    })));
    it("should only accept comb fields when the flags are valid", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee36() {
      var invalidFieldFlags, flags, promise, i, ii;
      return _regenerator["default"].wrap(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              invalidFieldFlags = [_util.AnnotationFieldFlag.MULTILINE, _util.AnnotationFieldFlag.PASSWORD, _util.AnnotationFieldFlag.FILESELECT];
              flags = _util.AnnotationFieldFlag.COMB + _util.AnnotationFieldFlag.MULTILINE + _util.AnnotationFieldFlag.PASSWORD + _util.AnnotationFieldFlag.FILESELECT;
              promise = Promise.resolve();

              for (i = 0, ii = invalidFieldFlags.length; i <= ii; i++) {
                promise = promise.then(function () {
                  textWidgetDict.set("MaxLen", 20);
                  textWidgetDict.set("Ff", flags);

                  var textWidgetRef = _primitives.Ref.get(93, 0);

                  var xref = new _test_utils.XRefMock([{
                    ref: textWidgetRef,
                    data: textWidgetDict
                  }]);
                  return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref40) {
                    var data = _ref40.data;
                    expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
                    var valid = invalidFieldFlags.length === 0;
                    expect(data.comb).toEqual(valid);

                    if (!valid) {
                      flags -= invalidFieldFlags.pop();
                    }
                  });
                });
              }

              _context36.next = 6;
              return promise;

            case 6:
            case "end":
              return _context36.stop();
          }
        }
      }, _callee36);
    })));
    it("should render regular text for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
      var textWidgetRef, xref, task, annotation, annotationStorage, appearance;
      return _regenerator["default"].wrap(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              textWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, helvRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context37.next = 6;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 6:
              annotation = _context37.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "test\\print"
              });
              _context37.next = 11;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 11:
              appearance = _context37.sent;
              expect(appearance).toEqual("/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 0 Tm" + " 2.00 2.00 Td (test\\\\print) Tj ET Q EMC");

            case 13:
            case "end":
              return _context37.stop();
          }
        }
      }, _callee37);
    })));
    it("should render regular text in Japanese for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee38() {
      var textWidgetRef, xref, task, annotation, annotationStorage, appearance, utf16String;
      return _regenerator["default"].wrap(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              textWidgetDict.get("DR").get("Font").set("Goth", gothRefObj.ref);
              textWidgetDict.set("DA", "/Goth 5 Tf");
              textWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, gothRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context38.next = 8;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 8:
              annotation = _context38.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "こんにちは世界の"
              });
              _context38.next = 13;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 13:
              appearance = _context38.sent;
              utf16String = "\x30\x53\x30\x93\x30\x6b\x30\x61\x30\x6f\x4e\x16\x75\x4c\x30\x6e";
              expect(appearance).toEqual("/Tx BMC q BT /Goth 5 Tf 1 0 0 1 0 0 Tm" + " 2.00 2.00 Td (".concat(utf16String, ") Tj ET Q EMC"));

            case 16:
            case "end":
              return _context38.stop();
          }
        }
      }, _callee38);
    })));
    it("should render regular text for printing using normal appearance", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee39() {
      var textWidgetRef, appearanceStatesDict, normalAppearanceDict, normalAppearanceStream, xref, task, annotation, annotationStorage, operatorList;
      return _regenerator["default"].wrap(function _callee39$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              textWidgetRef = _primitives.Ref.get(271, 0);
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              normalAppearanceStream = new _stream.StringStream("0.1 0.2 0.3 rg");
              normalAppearanceStream.dict = normalAppearanceDict;
              appearanceStatesDict.set("N", normalAppearanceStream);
              textWidgetDict.set("AP", appearanceStatesDict);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, helvRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context39.next = 12;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 12:
              annotation = _context39.sent;
              annotationStorage = new Map();
              _context39.next = 16;
              return annotation.getOperatorList(partialEvaluator, task, _util.RenderingIntentFlag.PRINT, false, annotationStorage);

            case 16:
              operatorList = _context39.sent;
              expect(operatorList.argsArray.length).toEqual(3);
              expect(operatorList.fnArray).toEqual([_util.OPS.beginAnnotation, _util.OPS.setFillRGBColor, _util.OPS.endAnnotation]);
              expect(operatorList.argsArray[0]).toEqual(["271R", [0, 0, 32, 10], [32, 0, 0, 10, 0, 0], [1, 0, 0, 1, 0, 0], false]);
              expect(operatorList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));

            case 21:
            case "end":
              return _context39.stop();
          }
        }
      }, _callee39);
    })));
    it("should render auto-sized text for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee40() {
      var textWidgetRef, xref, task, annotation, annotationStorage, appearance;
      return _regenerator["default"].wrap(function _callee40$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              textWidgetDict.set("DA", "/Helv 0 Tf");
              textWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, helvRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context40.next = 7;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 7:
              annotation = _context40.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "test (print)"
              });
              _context40.next = 12;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 12:
              appearance = _context40.sent;
              expect(appearance).toEqual("/Tx BMC q BT /Helv 8 Tf 0 g 1 0 0 1 0 0 Tm" + " 2.00 2.00 Td (test \\(print\\)) Tj ET Q EMC");

            case 14:
            case "end":
              return _context40.stop();
          }
        }
      }, _callee40);
    })));
    it("should render auto-sized text in Japanese for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee41() {
      var textWidgetRef, xref, task, annotation, annotationStorage, appearance, utf16String;
      return _regenerator["default"].wrap(function _callee41$(_context41) {
        while (1) {
          switch (_context41.prev = _context41.next) {
            case 0:
              textWidgetDict.get("DR").get("Font").set("Goth", gothRefObj.ref);
              textWidgetDict.set("DA", "/Goth 0 Tf");
              textWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, gothRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context41.next = 8;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 8:
              annotation = _context41.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "こんにちは世界の"
              });
              _context41.next = 13;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 13:
              appearance = _context41.sent;
              utf16String = "\x30\x53\x30\x93\x30\x6b\x30\x61\x30\x6f\x4e\x16\x75\x4c\x30\x6e";
              expect(appearance).toEqual("/Tx BMC q BT /Goth 8 Tf 0 g 1 0 0 1 0 0 Tm" + " 2.00 2.00 Td (".concat(utf16String, ") Tj ET Q EMC"));

            case 16:
            case "end":
              return _context41.stop();
          }
        }
      }, _callee41);
    })));
    it("should not render a password for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee42() {
      var textWidgetRef, xref, task, annotation, annotationStorage, appearance;
      return _regenerator["default"].wrap(function _callee42$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              textWidgetDict.set("Ff", _util.AnnotationFieldFlag.PASSWORD);
              textWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, helvRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context42.next = 7;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 7:
              annotation = _context42.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "mypassword"
              });
              _context42.next = 12;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 12:
              appearance = _context42.sent;
              expect(appearance).toEqual(null);

            case 14:
            case "end":
              return _context42.stop();
          }
        }
      }, _callee42);
    })));
    it("should render multiline text for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee43() {
      var textWidgetRef, xref, task, annotation, annotationStorage, appearance;
      return _regenerator["default"].wrap(function _callee43$(_context43) {
        while (1) {
          switch (_context43.prev = _context43.next) {
            case 0:
              textWidgetDict.set("Ff", _util.AnnotationFieldFlag.MULTILINE);
              textWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, helvRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context43.next = 7;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 7:
              annotation = _context43.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "a aa aaa aaaa aaaaa aaaaaa " + "pneumonoultramicroscopicsilicovolcanoconiosis"
              });
              _context43.next = 12;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 12:
              appearance = _context43.sent;
              expect(appearance).toEqual("/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 10 Tm " + "2.00 -5.00 Td (a aa aaa ) Tj\n" + "0.00 -5.00 Td (aaaa aaaaa ) Tj\n" + "0.00 -5.00 Td (aaaaaa ) Tj\n" + "0.00 -5.00 Td (pneumonoultr) Tj\n" + "0.00 -5.00 Td (amicroscopi) Tj\n" + "0.00 -5.00 Td (csilicovolca) Tj\n" + "0.00 -5.00 Td (noconiosis) Tj ET Q EMC");

            case 14:
            case "end":
              return _context43.stop();
          }
        }
      }, _callee43);
    })));
    it("should render multiline text in Japanese for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee44() {
      var textWidgetRef, xref, task, annotation, annotationStorage, appearance;
      return _regenerator["default"].wrap(function _callee44$(_context44) {
        while (1) {
          switch (_context44.prev = _context44.next) {
            case 0:
              textWidgetDict.set("Ff", _util.AnnotationFieldFlag.MULTILINE);
              textWidgetDict.get("DR").get("Font").set("Goth", gothRefObj.ref);
              textWidgetDict.set("DA", "/Goth 5 Tf");
              textWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, gothRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context44.next = 9;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 9:
              annotation = _context44.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "こんにちは世界の"
              });
              _context44.next = 14;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 14:
              appearance = _context44.sent;
              expect(appearance).toEqual("/Tx BMC q BT /Goth 5 Tf 1 0 0 1 0 10 Tm " + "2.00 -5.00 Td (\x30\x53\x30\x93\x30\x6b\x30\x61\x30\x6f) Tj\n" + "0.00 -5.00 Td (\x4e\x16\x75\x4c\x30\x6e) Tj ET Q EMC");

            case 16:
            case "end":
              return _context44.stop();
          }
        }
      }, _callee44);
    })));
    it("should render multiline text with various EOL for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee45() {
      var textWidgetRef, xref, task, expectedAppearance, annotation, annotationStorage, appearance;
      return _regenerator["default"].wrap(function _callee45$(_context45) {
        while (1) {
          switch (_context45.prev = _context45.next) {
            case 0:
              textWidgetDict.set("Ff", _util.AnnotationFieldFlag.MULTILINE);
              textWidgetDict.set("Rect", [0, 0, 128, 10]);
              textWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, helvRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              expectedAppearance = "/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 10 Tm " + "2.00 -5.00 Td " + "(Lorem ipsum dolor sit amet, consectetur adipiscing elit.) Tj\n" + "0.00 -5.00 Td " + "(Aliquam vitae felis ac lectus bibendum ultricies quis non) Tj\n" + "0.00 -5.00 Td " + "( diam.) Tj\n" + "0.00 -5.00 Td " + "(Morbi id porttitor quam, a iaculis dui.) Tj\n" + "0.00 -5.00 Td " + "(Pellentesque habitant morbi tristique senectus et netus ) Tj\n" + "0.00 -5.00 Td " + "(et malesuada fames ac turpis egestas.) Tj\n" + "0.00 -5.00 Td () Tj\n" + "0.00 -5.00 Td () Tj\n" + "0.00 -5.00 Td " + "(Nulla consectetur, ligula in tincidunt placerat, velit ) Tj\n" + "0.00 -5.00 Td " + "(augue consectetur orci, sed mattis libero nunc ut massa.) Tj\n" + "0.00 -5.00 Td " + "(Etiam facilisis tempus interdum.) Tj ET Q EMC";
              _context45.next = 9;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 9:
              annotation = _context45.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r" + "Aliquam vitae felis ac lectus bibendum ultricies quis non diam.\n" + "Morbi id porttitor quam, a iaculis dui.\r\n" + "Pellentesque habitant morbi tristique senectus et " + "netus et malesuada fames ac turpis egestas.\n\r\n\r" + "Nulla consectetur, ligula in tincidunt placerat, " + "velit augue consectetur orci, sed mattis libero nunc ut massa.\r" + "Etiam facilisis tempus interdum."
              });
              _context45.next = 14;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 14:
              appearance = _context45.sent;
              expect(appearance).toEqual(expectedAppearance);

            case 16:
            case "end":
              return _context45.stop();
          }
        }
      }, _callee45);
    })));
    it("should render comb for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee46() {
      var textWidgetRef, xref, task, annotation, annotationStorage, appearance;
      return _regenerator["default"].wrap(function _callee46$(_context46) {
        while (1) {
          switch (_context46.prev = _context46.next) {
            case 0:
              textWidgetDict.set("Ff", _util.AnnotationFieldFlag.COMB);
              textWidgetDict.set("MaxLen", 4);
              textWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, helvRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context46.next = 8;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 8:
              annotation = _context46.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "aa(aa)a\\"
              });
              _context46.next = 13;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 13:
              appearance = _context46.sent;
              expect(appearance).toEqual("/Tx BMC q BT /Helv 5 Tf 1 0 0 1 2 2 Tm" + " (a) Tj 8.00 0 Td (a) Tj 8.00 0 Td (\\() Tj" + " 8.00 0 Td (a) Tj 8.00 0 Td (a) Tj" + " 8.00 0 Td (\\)) Tj 8.00 0 Td (a) Tj" + " 8.00 0 Td (\\\\) Tj ET Q EMC");

            case 15:
            case "end":
              return _context46.stop();
          }
        }
      }, _callee46);
    })));
    it("should render comb with Japanese text for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee47() {
      var textWidgetRef, xref, task, annotation, annotationStorage, appearance;
      return _regenerator["default"].wrap(function _callee47$(_context47) {
        while (1) {
          switch (_context47.prev = _context47.next) {
            case 0:
              textWidgetDict.set("Ff", _util.AnnotationFieldFlag.COMB);
              textWidgetDict.set("MaxLen", 4);
              textWidgetDict.get("DR").get("Font").set("Goth", gothRefObj.ref);
              textWidgetDict.set("DA", "/Goth 5 Tf");
              textWidgetDict.set("Rect", [0, 0, 32, 10]);
              textWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, gothRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context47.next = 11;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 11:
              annotation = _context47.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "こんにちは世界の"
              });
              _context47.next = 16;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 16:
              appearance = _context47.sent;
              expect(appearance).toEqual("/Tx BMC q BT /Goth 5 Tf 1 0 0 1 2 2 Tm" + " (\x30\x53) Tj 8.00 0 Td (\x30\x93) Tj 8.00 0 Td (\x30\x6b) Tj" + " 8.00 0 Td (\x30\x61) Tj 8.00 0 Td (\x30\x6f) Tj" + " 8.00 0 Td (\x4e\x16) Tj 8.00 0 Td (\x75\x4c) Tj" + " 8.00 0 Td (\x30\x6e) Tj ET Q EMC");

            case 18:
            case "end":
              return _context47.stop();
          }
        }
      }, _callee47);
    })));
    it("should save text", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee48() {
      var textWidgetRef, xref, task, annotation, annotationStorage, data, _data, oldData, newData;

      return _regenerator["default"].wrap(function _callee48$(_context48) {
        while (1) {
          switch (_context48.prev = _context48.next) {
            case 0:
              textWidgetRef = _primitives.Ref.get(123, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, helvRefObj]);
              partialEvaluator.xref = xref;
              task = new _worker.WorkerTask("test save");
              _context48.next = 6;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 6:
              annotation = _context48.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "hello world"
              });
              _context48.next = 11;
              return annotation.save(partialEvaluator, task, annotationStorage);

            case 11:
              data = _context48.sent;
              expect(data.length).toEqual(2);
              _data = _slicedToArray(data, 2), oldData = _data[0], newData = _data[1];
              expect(oldData.ref).toEqual(_primitives.Ref.get(123, 0));
              expect(newData.ref).toEqual(_primitives.Ref.get(2, 0));
              oldData.data = oldData.data.replace(/\(D:\d+\)/, "(date)");
              expect(oldData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Tx /DA (/Helv 5 Tf) /DR " + "<< /Font << /Helv 314 0 R>>>> /Rect [0 0 32 10] " + "/V (hello world) /AP << /N 2 0 R>> /M (date)>>\nendobj\n");
              expect(newData.data).toEqual("2 0 obj\n<< /Length 77 /Subtype /Form /Resources " + "<< /Font << /Helv 314 0 R>>>> /BBox [0 0 32 10]>> stream\n" + "/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 0 Tm 2.00 2.00 Td (hello world) Tj " + "ET Q EMC\nendstream\nendobj\n");

            case 19:
            case "end":
              return _context48.stop();
          }
        }
      }, _callee48);
    })));
    it("should get field object for usage in JS sandbox", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee49() {
      var textWidgetRef, xDictRef, dDictRef, next0Ref, next1Ref, next2Ref, next00Ref, xDict, dDict, next0Dict, next1Dict, next2Dict, next00Dict, xref, JS, additionalActionsDict, eDict, annotation, fieldObject, actions;
      return _regenerator["default"].wrap(function _callee49$(_context49) {
        while (1) {
          switch (_context49.prev = _context49.next) {
            case 0:
              textWidgetRef = _primitives.Ref.get(123, 0);
              xDictRef = _primitives.Ref.get(141, 0);
              dDictRef = _primitives.Ref.get(262, 0);
              next0Ref = _primitives.Ref.get(314, 0);
              next1Ref = _primitives.Ref.get(271, 0);
              next2Ref = _primitives.Ref.get(577, 0);
              next00Ref = _primitives.Ref.get(413, 0);
              xDict = new _primitives.Dict();
              dDict = new _primitives.Dict();
              next0Dict = new _primitives.Dict();
              next1Dict = new _primitives.Dict();
              next2Dict = new _primitives.Dict();
              next00Dict = new _primitives.Dict();
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, {
                ref: xDictRef,
                data: xDict
              }, {
                ref: dDictRef,
                data: dDict
              }, {
                ref: next0Ref,
                data: next0Dict
              }, {
                ref: next00Ref,
                data: next00Dict
              }, {
                ref: next1Ref,
                data: next1Dict
              }, {
                ref: next2Ref,
                data: next2Dict
              }]);
              JS = _primitives.Name.get("JavaScript");
              additionalActionsDict = new _primitives.Dict();
              eDict = new _primitives.Dict();
              eDict.set("JS", "hello()");
              eDict.set("S", JS);
              additionalActionsDict.set("E", eDict);
              xDict.set("JS", "world()");
              xDict.set("S", JS);
              xDict.set("Next", [next0Ref, next1Ref, next2Ref, xDictRef]);
              next0Dict.set("JS", "olleh()");
              next0Dict.set("S", JS);
              next0Dict.set("Next", next00Ref);
              next00Dict.set("JS", "foo()");
              next00Dict.set("S", JS);
              next00Dict.set("Next", next0Ref);
              next1Dict.set("JS", "dlrow()");
              next1Dict.set("S", JS);
              next1Dict.set("Next", xDictRef);
              next2Dict.set("JS", "oof()");
              next2Dict.set("S", JS);
              dDict.set("JS", "bar()");
              dDict.set("S", JS);
              dDict.set("Next", dDictRef);
              additionalActionsDict.set("D", dDictRef);
              additionalActionsDict.set("X", xDictRef);
              textWidgetDict.set("AA", additionalActionsDict);
              partialEvaluator.xref = xref;
              _context49.next = 43;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 43:
              annotation = _context49.sent;
              _context49.next = 46;
              return annotation.getFieldObject();

            case 46:
              fieldObject = _context49.sent;
              actions = fieldObject.actions;
              expect(actions["Mouse Enter"]).toEqual(["hello()"]);
              expect(actions["Mouse Exit"]).toEqual(["world()", "olleh()", "foo()", "dlrow()", "oof()"]);
              expect(actions["Mouse Down"]).toEqual(["bar()"]);

            case 51:
            case "end":
              return _context49.stop();
          }
        }
      }, _callee49);
    })));
    it("should save Japanese text", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee50() {
      var textWidgetRef, xref, task, annotation, annotationStorage, data, utf16String, _data2, oldData, newData;

      return _regenerator["default"].wrap(function _callee50$(_context50) {
        while (1) {
          switch (_context50.prev = _context50.next) {
            case 0:
              textWidgetDict.get("DR").get("Font").set("Goth", gothRefObj.ref);
              textWidgetDict.set("DA", "/Goth 5 Tf");
              textWidgetRef = _primitives.Ref.get(123, 0);
              xref = new _test_utils.XRefMock([{
                ref: textWidgetRef,
                data: textWidgetDict
              }, gothRefObj]);
              partialEvaluator.xref = xref;
              task = new _worker.WorkerTask("test save");
              _context50.next = 8;
              return _annotation.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock);

            case 8:
              annotation = _context50.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "こんにちは世界の"
              });
              _context50.next = 13;
              return annotation.save(partialEvaluator, task, annotationStorage);

            case 13:
              data = _context50.sent;
              utf16String = "\x30\x53\x30\x93\x30\x6b\x30\x61\x30\x6f\x4e\x16\x75\x4c\x30\x6e";
              expect(data.length).toEqual(2);
              _data2 = _slicedToArray(data, 2), oldData = _data2[0], newData = _data2[1];
              expect(oldData.ref).toEqual(_primitives.Ref.get(123, 0));
              expect(newData.ref).toEqual(_primitives.Ref.get(2, 0));
              oldData.data = oldData.data.replace(/\(D:\d+\)/, "(date)");
              expect(oldData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Tx /DA (/Goth 5 Tf) /DR " + "<< /Font << /Helv 314 0 R /Goth 159 0 R>>>> /Rect [0 0 32 10] " + "/V (\xFE\xFF".concat(utf16String, ") /AP << /N 2 0 R>> /M (date)>>\nendobj\n"));
              expect(newData.data).toEqual("2 0 obj\n<< /Length 82 /Subtype /Form /Resources " + "<< /Font << /Helv 314 0 R /Goth 159 0 R>>>> /BBox [0 0 32 10]>> stream\n" + "/Tx BMC q BT /Goth 5 Tf 1 0 0 1 0 0 Tm 2.00 2.00 Td (".concat(utf16String, ") Tj ") + "ET Q EMC\nendstream\nendobj\n");

            case 22:
            case "end":
              return _context50.stop();
          }
        }
      }, _callee50);
    })));
  });
  describe("ButtonWidgetAnnotation", function () {
    var buttonWidgetDict;
    beforeEach(function () {
      buttonWidgetDict = new _primitives.Dict();
      buttonWidgetDict.set("Type", _primitives.Name.get("Annot"));
      buttonWidgetDict.set("Subtype", _primitives.Name.get("Widget"));
      buttonWidgetDict.set("FT", _primitives.Name.get("Btn"));
    });
    afterEach(function () {
      buttonWidgetDict = null;
    });
    it("should handle checkboxes with export value", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee51() {
      var appearanceStatesDict, normalAppearanceDict, buttonWidgetRef, xref, _yield$AnnotationFact33, data;

      return _regenerator["default"].wrap(function _callee51$(_context51) {
        while (1) {
          switch (_context51.prev = _context51.next) {
            case 0:
              buttonWidgetDict.set("V", _primitives.Name.get("Checked"));
              buttonWidgetDict.set("DV", _primitives.Name.get("Off"));
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              normalAppearanceDict.set("Off", 0);
              normalAppearanceDict.set("Checked", 1);
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              _context51.next = 12;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 12:
              _yield$AnnotationFact33 = _context51.sent;
              data = _yield$AnnotationFact33.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.checkBox).toEqual(true);
              expect(data.fieldValue).toEqual("Checked");
              expect(data.defaultFieldValue).toEqual("Off");
              expect(data.radioButton).toEqual(false);
              expect(data.exportValue).toEqual("Checked");

            case 20:
            case "end":
              return _context51.stop();
          }
        }
      }, _callee51);
    })));
    it("should handle checkboxes without export value", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee52() {
      var buttonWidgetRef, xref, _yield$AnnotationFact34, data;

      return _regenerator["default"].wrap(function _callee52$(_context52) {
        while (1) {
          switch (_context52.prev = _context52.next) {
            case 0:
              buttonWidgetDict.set("V", _primitives.Name.get("Checked"));
              buttonWidgetDict.set("DV", _primitives.Name.get("Off"));
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              _context52.next = 6;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 6:
              _yield$AnnotationFact34 = _context52.sent;
              data = _yield$AnnotationFact34.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.checkBox).toEqual(true);
              expect(data.fieldValue).toEqual("Checked");
              expect(data.defaultFieldValue).toEqual("Off");
              expect(data.radioButton).toEqual(false);

            case 13:
            case "end":
              return _context52.stop();
          }
        }
      }, _callee52);
    })));
    it("should handle checkboxes without /Off appearance", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee53() {
      var appearanceStatesDict, normalAppearanceDict, buttonWidgetRef, xref, _yield$AnnotationFact35, data;

      return _regenerator["default"].wrap(function _callee53$(_context53) {
        while (1) {
          switch (_context53.prev = _context53.next) {
            case 0:
              buttonWidgetDict.set("V", _primitives.Name.get("Checked"));
              buttonWidgetDict.set("DV", _primitives.Name.get("Off"));
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              normalAppearanceDict.set("Checked", 1);
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              _context53.next = 11;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 11:
              _yield$AnnotationFact35 = _context53.sent;
              data = _yield$AnnotationFact35.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.checkBox).toEqual(true);
              expect(data.fieldValue).toEqual("Checked");
              expect(data.defaultFieldValue).toEqual("Off");
              expect(data.radioButton).toEqual(false);
              expect(data.exportValue).toEqual("Checked");

            case 19:
            case "end":
              return _context53.stop();
          }
        }
      }, _callee53);
    })));
    it("should render checkbox with fallback font for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee54() {
      var appearanceStatesDict, normalAppearanceDict, checkedAppearanceDict, uncheckedAppearanceDict, checkedStream, uncheckedStream, buttonWidgetRef, xref, task, checkboxEvaluator, annotation, annotationStorage, operatorList;
      return _regenerator["default"].wrap(function _callee54$(_context54) {
        while (1) {
          switch (_context54.prev = _context54.next) {
            case 0:
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              checkedAppearanceDict = new _primitives.Dict();
              uncheckedAppearanceDict = new _primitives.Dict();
              checkedStream = new _stream.StringStream("/ 12 Tf (4) Tj");
              checkedStream.dict = checkedAppearanceDict;
              uncheckedStream = new _stream.StringStream("");
              uncheckedStream.dict = uncheckedAppearanceDict;
              checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
              checkedAppearanceDict.set("FormType", 1);
              checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
              normalAppearanceDict.set("Checked", checkedStream);
              normalAppearanceDict.set("Off", uncheckedStream);
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              task = new _worker.WorkerTask("test print");
              checkboxEvaluator = partialEvaluator.clone({
                ignoreErrors: true
              });
              _context54.next = 21;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 21:
              annotation = _context54.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: true
              });
              _context54.next = 26;
              return annotation.getOperatorList(checkboxEvaluator, task, _util.RenderingIntentFlag.PRINT, false, annotationStorage);

            case 26:
              operatorList = _context54.sent;
              expect(operatorList.argsArray.length).toEqual(5);
              expect(operatorList.fnArray).toEqual([_util.OPS.beginAnnotation, _util.OPS.dependency, _util.OPS.setFont, _util.OPS.showText, _util.OPS.endAnnotation]);
              expect(operatorList.argsArray[0]).toEqual(["124R", [0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], false]);
              expect(operatorList.argsArray[3][0][0].unicode).toEqual("4");

            case 31:
            case "end":
              return _context54.stop();
          }
        }
      }, _callee54);
    })));
    it("should render checkboxes for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee55() {
      var appearanceStatesDict, normalAppearanceDict, checkedAppearanceDict, uncheckedAppearanceDict, checkedStream, uncheckedStream, buttonWidgetRef, xref, task, annotation, annotationStorage, operatorList;
      return _regenerator["default"].wrap(function _callee55$(_context55) {
        while (1) {
          switch (_context55.prev = _context55.next) {
            case 0:
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              checkedAppearanceDict = new _primitives.Dict();
              uncheckedAppearanceDict = new _primitives.Dict();
              checkedStream = new _stream.StringStream("0.1 0.2 0.3 rg");
              checkedStream.dict = checkedAppearanceDict;
              uncheckedStream = new _stream.StringStream("0.3 0.2 0.1 rg");
              uncheckedStream.dict = uncheckedAppearanceDict;
              checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
              checkedAppearanceDict.set("FormType", 1);
              checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
              normalAppearanceDict.set("Checked", checkedStream);
              normalAppearanceDict.set("Off", uncheckedStream);
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              task = new _worker.WorkerTask("test print");
              _context55.next = 20;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 20:
              annotation = _context55.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: true
              });
              _context55.next = 25;
              return annotation.getOperatorList(partialEvaluator, task, _util.RenderingIntentFlag.PRINT, false, annotationStorage);

            case 25:
              operatorList = _context55.sent;
              expect(operatorList.argsArray.length).toEqual(3);
              expect(operatorList.fnArray).toEqual([_util.OPS.beginAnnotation, _util.OPS.setFillRGBColor, _util.OPS.endAnnotation]);
              expect(operatorList.argsArray[0]).toEqual(["124R", [0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], false]);
              expect(operatorList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));
              annotationStorage.set(annotation.data.id, {
                value: false
              });
              _context55.next = 33;
              return annotation.getOperatorList(partialEvaluator, task, _util.RenderingIntentFlag.PRINT, false, annotationStorage);

            case 33:
              operatorList = _context55.sent;
              expect(operatorList.argsArray.length).toEqual(3);
              expect(operatorList.fnArray).toEqual([_util.OPS.beginAnnotation, _util.OPS.setFillRGBColor, _util.OPS.endAnnotation]);
              expect(operatorList.argsArray[0]).toEqual(["124R", [0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], false]);
              expect(operatorList.argsArray[1]).toEqual(new Uint8ClampedArray([76, 51, 26]));

            case 38:
            case "end":
              return _context55.stop();
          }
        }
      }, _callee55);
    })));
    it("should render checkboxes for printing twice", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee56() {
      var appearanceStatesDict, normalAppearanceDict, checkedAppearanceDict, uncheckedAppearanceDict, checkedStream, uncheckedStream, buttonWidgetRef, xref, task, annotation, annotationStorage, i, operatorList;
      return _regenerator["default"].wrap(function _callee56$(_context56) {
        while (1) {
          switch (_context56.prev = _context56.next) {
            case 0:
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              checkedAppearanceDict = new _primitives.Dict();
              uncheckedAppearanceDict = new _primitives.Dict();
              checkedStream = new _stream.StringStream("0.1 0.2 0.3 rg");
              checkedStream.dict = checkedAppearanceDict;
              uncheckedStream = new _stream.StringStream("0.3 0.2 0.1 rg");
              uncheckedStream.dict = uncheckedAppearanceDict;
              checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
              checkedAppearanceDict.set("FormType", 1);
              checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
              normalAppearanceDict.set("Checked", checkedStream);
              normalAppearanceDict.set("Off", uncheckedStream);
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetDict.set("AS", _primitives.Name.get("Off"));
              buttonWidgetRef = _primitives.Ref.get(1249, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              task = new _worker.WorkerTask("test print");
              _context56.next = 21;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 21:
              annotation = _context56.sent;
              annotationStorage = new Map();
              i = 0;

            case 24:
              if (!(i < 2)) {
                _context56.next = 36;
                break;
              }

              annotationStorage.set(annotation.data.id, {
                value: true
              });
              _context56.next = 28;
              return annotation.getOperatorList(partialEvaluator, task, _util.RenderingIntentFlag.PRINT, false, annotationStorage);

            case 28:
              operatorList = _context56.sent;
              expect(operatorList.argsArray.length).toEqual(3);
              expect(operatorList.fnArray).toEqual([_util.OPS.beginAnnotation, _util.OPS.setFillRGBColor, _util.OPS.endAnnotation]);
              expect(operatorList.argsArray[0]).toEqual(["1249R", [0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], false]);
              expect(operatorList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));

            case 33:
              i++;
              _context56.next = 24;
              break;

            case 36:
            case "end":
              return _context56.stop();
          }
        }
      }, _callee56);
    })));
    it("should render checkboxes for printing using normal appearance", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee57() {
      var appearanceStatesDict, normalAppearanceDict, checkedAppearanceDict, uncheckedAppearanceDict, checkedStream, uncheckedStream, buttonWidgetRef, xref, task, annotation, annotationStorage, operatorList;
      return _regenerator["default"].wrap(function _callee57$(_context57) {
        while (1) {
          switch (_context57.prev = _context57.next) {
            case 0:
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              checkedAppearanceDict = new _primitives.Dict();
              uncheckedAppearanceDict = new _primitives.Dict();
              checkedStream = new _stream.StringStream("0.1 0.2 0.3 rg");
              checkedStream.dict = checkedAppearanceDict;
              uncheckedStream = new _stream.StringStream("0.3 0.2 0.1 rg");
              uncheckedStream.dict = uncheckedAppearanceDict;
              checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
              checkedAppearanceDict.set("FormType", 1);
              checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
              normalAppearanceDict.set("Checked", checkedStream);
              normalAppearanceDict.set("Off", uncheckedStream);
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetDict.set("AS", _primitives.Name.get("Checked"));
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              task = new _worker.WorkerTask("test print");
              _context57.next = 21;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 21:
              annotation = _context57.sent;
              annotationStorage = new Map();
              _context57.next = 25;
              return annotation.getOperatorList(partialEvaluator, task, _util.RenderingIntentFlag.PRINT, false, annotationStorage);

            case 25:
              operatorList = _context57.sent;
              expect(operatorList.argsArray.length).toEqual(3);
              expect(operatorList.fnArray).toEqual([_util.OPS.beginAnnotation, _util.OPS.setFillRGBColor, _util.OPS.endAnnotation]);
              expect(operatorList.argsArray[0]).toEqual(["124R", [0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], false]);
              expect(operatorList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));

            case 30:
            case "end":
              return _context57.stop();
          }
        }
      }, _callee57);
    })));
    it("should save checkboxes", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee58() {
      var appearanceStatesDict, normalAppearanceDict, buttonWidgetRef, xref, task, annotation, annotationStorage, _yield$annotation$sav, _yield$annotation$sav2, oldData, data;

      return _regenerator["default"].wrap(function _callee58$(_context58) {
        while (1) {
          switch (_context58.prev = _context58.next) {
            case 0:
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              normalAppearanceDict.set("Checked", _primitives.Ref.get(314, 0));
              normalAppearanceDict.set("Off", _primitives.Ref.get(271, 0));
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetDict.set("V", _primitives.Name.get("Off"));
              buttonWidgetRef = _primitives.Ref.get(123, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              partialEvaluator.xref = xref;
              task = new _worker.WorkerTask("test save");
              _context58.next = 13;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 13:
              annotation = _context58.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: true
              });
              _context58.next = 18;
              return annotation.save(partialEvaluator, task, annotationStorage);

            case 18:
              _yield$annotation$sav = _context58.sent;
              _yield$annotation$sav2 = _slicedToArray(_yield$annotation$sav, 1);
              oldData = _yield$annotation$sav2[0];
              oldData.data = oldData.data.replace(/\(D:\d+\)/, "(date)");
              expect(oldData.ref).toEqual(_primitives.Ref.get(123, 0));
              expect(oldData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Btn " + "/AP << /N << /Checked 314 0 R /Off 271 0 R>>>> " + "/V /Checked /AS /Checked /M (date)>>\nendobj\n");
              annotationStorage.set(annotation.data.id, {
                value: false
              });
              _context58.next = 27;
              return annotation.save(partialEvaluator, task, annotationStorage);

            case 27:
              data = _context58.sent;
              expect(data).toEqual(null);

            case 29:
            case "end":
              return _context58.stop();
          }
        }
      }, _callee58);
    })));
    it("should handle radio buttons with a field value", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee59() {
      var parentDict, normalAppearanceStateDict, appearanceStatesDict, buttonWidgetRef, xref, _yield$AnnotationFact36, data;

      return _regenerator["default"].wrap(function _callee59$(_context59) {
        while (1) {
          switch (_context59.prev = _context59.next) {
            case 0:
              parentDict = new _primitives.Dict();
              parentDict.set("V", _primitives.Name.get("1"));
              normalAppearanceStateDict = new _primitives.Dict();
              normalAppearanceStateDict.set("2", null);
              appearanceStatesDict = new _primitives.Dict();
              appearanceStatesDict.set("N", normalAppearanceStateDict);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.RADIO);
              buttonWidgetDict.set("Parent", parentDict);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              _context59.next = 13;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 13:
              _yield$AnnotationFact36 = _context59.sent;
              data = _yield$AnnotationFact36.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.checkBox).toEqual(false);
              expect(data.radioButton).toEqual(true);
              expect(data.fieldValue).toEqual("1");
              expect(data.buttonValue).toEqual("2");

            case 20:
            case "end":
              return _context59.stop();
          }
        }
      }, _callee59);
    })));
    it("should handle radio buttons with a field value that's not an ASCII string", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee60() {
      var parentDict, normalAppearanceStateDict, appearanceStatesDict, buttonWidgetRef, xref, _yield$AnnotationFact37, data;

      return _regenerator["default"].wrap(function _callee60$(_context60) {
        while (1) {
          switch (_context60.prev = _context60.next) {
            case 0:
              parentDict = new _primitives.Dict();
              parentDict.set("V", _primitives.Name.get("\x91I=\x91\xf0\x93\xe0\x97e3"));
              normalAppearanceStateDict = new _primitives.Dict();
              normalAppearanceStateDict.set("\x91I=\x91\xf0\x93\xe0\x97e3", null);
              appearanceStatesDict = new _primitives.Dict();
              appearanceStatesDict.set("N", normalAppearanceStateDict);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.RADIO);
              buttonWidgetDict.set("Parent", parentDict);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              _context60.next = 13;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 13:
              _yield$AnnotationFact37 = _context60.sent;
              data = _yield$AnnotationFact37.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.checkBox).toEqual(false);
              expect(data.radioButton).toEqual(true);
              expect(data.fieldValue).toEqual("‚I=‚ðﬁàŠe3");
              expect(data.buttonValue).toEqual("‚I=‚ðﬁàŠe3");

            case 20:
            case "end":
              return _context60.stop();
          }
        }
      }, _callee60);
    })));
    it("should handle radio buttons without a field value", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee61() {
      var normalAppearanceStateDict, appearanceStatesDict, buttonWidgetRef, xref, _yield$AnnotationFact38, data;

      return _regenerator["default"].wrap(function _callee61$(_context61) {
        while (1) {
          switch (_context61.prev = _context61.next) {
            case 0:
              normalAppearanceStateDict = new _primitives.Dict();
              normalAppearanceStateDict.set("2", null);
              appearanceStatesDict = new _primitives.Dict();
              appearanceStatesDict.set("N", normalAppearanceStateDict);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.RADIO);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              _context61.next = 10;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 10:
              _yield$AnnotationFact38 = _context61.sent;
              data = _yield$AnnotationFact38.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.checkBox).toEqual(false);
              expect(data.radioButton).toEqual(true);
              expect(data.fieldValue).toEqual(null);
              expect(data.buttonValue).toEqual("2");

            case 17:
            case "end":
              return _context61.stop();
          }
        }
      }, _callee61);
    })));
    it("should render radio buttons for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee62() {
      var appearanceStatesDict, normalAppearanceDict, checkedAppearanceDict, uncheckedAppearanceDict, checkedStream, uncheckedStream, buttonWidgetRef, xref, task, annotation, annotationStorage, operatorList;
      return _regenerator["default"].wrap(function _callee62$(_context62) {
        while (1) {
          switch (_context62.prev = _context62.next) {
            case 0:
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              checkedAppearanceDict = new _primitives.Dict();
              uncheckedAppearanceDict = new _primitives.Dict();
              checkedStream = new _stream.StringStream("0.1 0.2 0.3 rg");
              checkedStream.dict = checkedAppearanceDict;
              uncheckedStream = new _stream.StringStream("0.3 0.2 0.1 rg");
              uncheckedStream.dict = uncheckedAppearanceDict;
              checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
              checkedAppearanceDict.set("FormType", 1);
              checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
              normalAppearanceDict.set("Checked", checkedStream);
              normalAppearanceDict.set("Off", uncheckedStream);
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.RADIO);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              task = new _worker.WorkerTask("test print");
              _context62.next = 21;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 21:
              annotation = _context62.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: true
              });
              _context62.next = 26;
              return annotation.getOperatorList(partialEvaluator, task, _util.RenderingIntentFlag.PRINT, false, annotationStorage);

            case 26:
              operatorList = _context62.sent;
              expect(operatorList.argsArray.length).toEqual(3);
              expect(operatorList.fnArray).toEqual([_util.OPS.beginAnnotation, _util.OPS.setFillRGBColor, _util.OPS.endAnnotation]);
              expect(operatorList.argsArray[0]).toEqual(["124R", [0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], false]);
              expect(operatorList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));
              annotationStorage.set(annotation.data.id, {
                value: false
              });
              _context62.next = 34;
              return annotation.getOperatorList(partialEvaluator, task, _util.RenderingIntentFlag.PRINT, false, annotationStorage);

            case 34:
              operatorList = _context62.sent;
              expect(operatorList.argsArray.length).toEqual(3);
              expect(operatorList.fnArray).toEqual([_util.OPS.beginAnnotation, _util.OPS.setFillRGBColor, _util.OPS.endAnnotation]);
              expect(operatorList.argsArray[0]).toEqual(["124R", [0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], false]);
              expect(operatorList.argsArray[1]).toEqual(new Uint8ClampedArray([76, 51, 26]));

            case 39:
            case "end":
              return _context62.stop();
          }
        }
      }, _callee62);
    })));
    it("should render radio buttons for printing using normal appearance", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee63() {
      var appearanceStatesDict, normalAppearanceDict, checkedAppearanceDict, uncheckedAppearanceDict, checkedStream, uncheckedStream, buttonWidgetRef, xref, task, annotation, annotationStorage, operatorList;
      return _regenerator["default"].wrap(function _callee63$(_context63) {
        while (1) {
          switch (_context63.prev = _context63.next) {
            case 0:
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              checkedAppearanceDict = new _primitives.Dict();
              uncheckedAppearanceDict = new _primitives.Dict();
              checkedStream = new _stream.StringStream("0.1 0.2 0.3 rg");
              checkedStream.dict = checkedAppearanceDict;
              uncheckedStream = new _stream.StringStream("0.3 0.2 0.1 rg");
              uncheckedStream.dict = uncheckedAppearanceDict;
              checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
              checkedAppearanceDict.set("FormType", 1);
              checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
              normalAppearanceDict.set("Checked", checkedStream);
              normalAppearanceDict.set("Off", uncheckedStream);
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.RADIO);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetDict.set("AS", _primitives.Name.get("Off"));
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              task = new _worker.WorkerTask("test print");
              _context63.next = 22;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 22:
              annotation = _context63.sent;
              annotationStorage = new Map();
              _context63.next = 26;
              return annotation.getOperatorList(partialEvaluator, task, _util.RenderingIntentFlag.PRINT, false, annotationStorage);

            case 26:
              operatorList = _context63.sent;
              expect(operatorList.argsArray.length).toEqual(3);
              expect(operatorList.fnArray).toEqual([_util.OPS.beginAnnotation, _util.OPS.setFillRGBColor, _util.OPS.endAnnotation]);
              expect(operatorList.argsArray[0]).toEqual(["124R", [0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], false]);
              expect(operatorList.argsArray[1]).toEqual(new Uint8ClampedArray([76, 51, 26]));

            case 31:
            case "end":
              return _context63.stop();
          }
        }
      }, _callee63);
    })));
    it("should save radio buttons", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee64() {
      var appearanceStatesDict, normalAppearanceDict, buttonWidgetRef, parentRef, parentDict, xref, task, annotation, annotationStorage, data, _data3, _data4, radioData, parentData;

      return _regenerator["default"].wrap(function _callee64$(_context64) {
        while (1) {
          switch (_context64.prev = _context64.next) {
            case 0:
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              normalAppearanceDict.set("Checked", _primitives.Ref.get(314, 0));
              normalAppearanceDict.set("Off", _primitives.Ref.get(271, 0));
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.RADIO);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetRef = _primitives.Ref.get(123, 0);
              parentRef = _primitives.Ref.get(456, 0);
              parentDict = new _primitives.Dict();
              parentDict.set("V", _primitives.Name.get("Off"));
              parentDict.set("Kids", [buttonWidgetRef]);
              buttonWidgetDict.set("Parent", parentRef);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }, {
                ref: parentRef,
                data: parentDict
              }]);
              parentDict.xref = xref;
              buttonWidgetDict.xref = xref;
              partialEvaluator.xref = xref;
              task = new _worker.WorkerTask("test save");
              _context64.next = 20;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 20:
              annotation = _context64.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: true
              });
              _context64.next = 25;
              return annotation.save(partialEvaluator, task, annotationStorage);

            case 25:
              data = _context64.sent;
              expect(data.length).toEqual(2);
              _data3 = data, _data4 = _slicedToArray(_data3, 2), radioData = _data4[0], parentData = _data4[1];
              radioData.data = radioData.data.replace(/\(D:\d+\)/, "(date)");
              expect(radioData.ref).toEqual(_primitives.Ref.get(123, 0));
              expect(radioData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Btn /Ff 32768 " + "/AP << /N << /Checked 314 0 R /Off 271 0 R>>>> " + "/Parent 456 0 R /AS /Checked /M (date)>>\nendobj\n");
              expect(parentData.ref).toEqual(_primitives.Ref.get(456, 0));
              expect(parentData.data).toEqual("456 0 obj\n<< /V /Checked /Kids [123 0 R]>>\nendobj\n");
              annotationStorage.set(annotation.data.id, {
                value: false
              });
              _context64.next = 36;
              return annotation.save(partialEvaluator, task, annotationStorage);

            case 36:
              data = _context64.sent;
              expect(data).toEqual(null);

            case 38:
            case "end":
              return _context64.stop();
          }
        }
      }, _callee64);
    })));
    it("should save radio buttons without a field value", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee65() {
      var appearanceStatesDict, normalAppearanceDict, buttonWidgetRef, parentRef, parentDict, xref, task, annotation, annotationStorage, data, _data5, radioData, parentData;

      return _regenerator["default"].wrap(function _callee65$(_context65) {
        while (1) {
          switch (_context65.prev = _context65.next) {
            case 0:
              appearanceStatesDict = new _primitives.Dict();
              normalAppearanceDict = new _primitives.Dict();
              normalAppearanceDict.set("Checked", _primitives.Ref.get(314, 0));
              normalAppearanceDict.set("Off", _primitives.Ref.get(271, 0));
              appearanceStatesDict.set("N", normalAppearanceDict);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.RADIO);
              buttonWidgetDict.set("AP", appearanceStatesDict);
              buttonWidgetRef = _primitives.Ref.get(123, 0);
              parentRef = _primitives.Ref.get(456, 0);
              parentDict = new _primitives.Dict();
              parentDict.set("Kids", [buttonWidgetRef]);
              buttonWidgetDict.set("Parent", parentRef);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }, {
                ref: parentRef,
                data: parentDict
              }]);
              parentDict.xref = xref;
              buttonWidgetDict.xref = xref;
              partialEvaluator.xref = xref;
              task = new _worker.WorkerTask("test save");
              _context65.next = 19;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 19:
              annotation = _context65.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: true
              });
              _context65.next = 24;
              return annotation.save(partialEvaluator, task, annotationStorage);

            case 24:
              data = _context65.sent;
              expect(data.length).toEqual(2);
              _data5 = _slicedToArray(data, 2), radioData = _data5[0], parentData = _data5[1];
              radioData.data = radioData.data.replace(/\(D:\d+\)/, "(date)");
              expect(radioData.ref).toEqual(_primitives.Ref.get(123, 0));
              expect(radioData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Btn /Ff 32768 " + "/AP << /N << /Checked 314 0 R /Off 271 0 R>>>> " + "/Parent 456 0 R /AS /Checked /M (date)>>\nendobj\n");
              expect(parentData.ref).toEqual(_primitives.Ref.get(456, 0));
              expect(parentData.data).toEqual("456 0 obj\n<< /Kids [123 0 R] /V /Checked>>\nendobj\n");

            case 32:
            case "end":
              return _context65.stop();
          }
        }
      }, _callee65);
    })));
    it("should save nothing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee66() {
      var buttonWidgetRef, xref, task, annotation, annotationStorage, data;
      return _regenerator["default"].wrap(function _callee66$(_context66) {
        while (1) {
          switch (_context66.prev = _context66.next) {
            case 0:
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              task = new _worker.WorkerTask("test save");
              _context66.next = 5;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 5:
              annotation = _context66.sent;
              annotationStorage = new Map();
              _context66.next = 9;
              return annotation.save(partialEvaluator, task, annotationStorage);

            case 9:
              data = _context66.sent;
              expect(data).toEqual(null);

            case 11:
            case "end":
              return _context66.stop();
          }
        }
      }, _callee66);
    })));
    it("should handle push buttons", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee67() {
      var buttonWidgetRef, actionDict, xref, _yield$AnnotationFact39, data;

      return _regenerator["default"].wrap(function _callee67$(_context67) {
        while (1) {
          switch (_context67.prev = _context67.next) {
            case 0:
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.PUSHBUTTON);
              actionDict = new _primitives.Dict();
              actionDict.set("S", _primitives.Name.get("JavaScript"));
              actionDict.set("JS", "do_something();");
              buttonWidgetDict.set("A", actionDict);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              _context67.next = 9;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact39 = _context67.sent;
              data = _yield$AnnotationFact39.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.pushButton).toEqual(true);
              expect(data.actions.Action).toEqual(["do_something();"]);

            case 14:
            case "end":
              return _context67.stop();
          }
        }
      }, _callee67);
    })));
    it("should handle push buttons that act as a tooltip only", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee68() {
      var buttonWidgetRef, xref, _yield$AnnotationFact40, data;

      return _regenerator["default"].wrap(function _callee68$(_context68) {
        while (1) {
          switch (_context68.prev = _context68.next) {
            case 0:
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.PUSHBUTTON);
              buttonWidgetDict.set("TU", "An alternative text");
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              _context68.next = 6;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 6:
              _yield$AnnotationFact40 = _context68.sent;
              data = _yield$AnnotationFact40.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.pushButton).toEqual(true);
              expect(data.alternativeText).toEqual("An alternative text");

            case 11:
            case "end":
              return _context68.stop();
          }
        }
      }, _callee68);
    })));
    it("should handle URL in A dict in push buttons", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee69() {
      var buttonWidgetRef, actionDict, xref, _yield$AnnotationFact41, data;

      return _regenerator["default"].wrap(function _callee69$(_context69) {
        while (1) {
          switch (_context69.prev = _context69.next) {
            case 0:
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.PUSHBUTTON);
              actionDict = new _primitives.Dict();
              actionDict.set("S", _primitives.Name.get("JavaScript"));
              actionDict.set("JS", "app.launchURL('https://developer.mozilla.org/en-US/', true)");
              buttonWidgetDict.set("A", actionDict);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              _context69.next = 9;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact41 = _context69.sent;
              data = _yield$AnnotationFact41.data;
              expect(data.url).toEqual("https://developer.mozilla.org/en-US/");

            case 12:
            case "end":
              return _context69.stop();
          }
        }
      }, _callee69);
    })));
    it("should handle URL in AA dict in push buttons", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee70() {
      var buttonWidgetRef, dDict, actionDict, xref, _yield$AnnotationFact42, data;

      return _regenerator["default"].wrap(function _callee70$(_context70) {
        while (1) {
          switch (_context70.prev = _context70.next) {
            case 0:
              buttonWidgetRef = _primitives.Ref.get(124, 0);
              buttonWidgetDict.set("Ff", _util.AnnotationFieldFlag.PUSHBUTTON);
              dDict = new _primitives.Dict();
              dDict.set("S", _primitives.Name.get("JavaScript"));
              dDict.set("JS", "app.launchURL('https://developer.mozilla.org/en-US/', true)");
              actionDict = new _primitives.Dict();
              actionDict.set("D", dDict);
              buttonWidgetDict.set("AA", actionDict);
              xref = new _test_utils.XRefMock([{
                ref: buttonWidgetRef,
                data: buttonWidgetDict
              }]);
              _context70.next = 11;
              return _annotation.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock);

            case 11:
              _yield$AnnotationFact42 = _context70.sent;
              data = _yield$AnnotationFact42.data;
              expect(data.url).toEqual("https://developer.mozilla.org/en-US/");

            case 14:
            case "end":
              return _context70.stop();
          }
        }
      }, _callee70);
    })));
  });
  describe("ChoiceWidgetAnnotation", function () {
    var choiceWidgetDict, fontRefObj;
    beforeEach(function () {
      choiceWidgetDict = new _primitives.Dict();
      choiceWidgetDict.set("Type", _primitives.Name.get("Annot"));
      choiceWidgetDict.set("Subtype", _primitives.Name.get("Widget"));
      choiceWidgetDict.set("FT", _primitives.Name.get("Ch"));
      var helvDict = new _primitives.Dict();
      helvDict.set("BaseFont", _primitives.Name.get("Helvetica"));
      helvDict.set("Type", _primitives.Name.get("Font"));
      helvDict.set("Subtype", _primitives.Name.get("Type1"));

      var fontRef = _primitives.Ref.get(314, 0);

      fontRefObj = {
        ref: fontRef,
        data: helvDict
      };
      var resourceDict = new _primitives.Dict();
      var fontDict = new _primitives.Dict();
      fontDict.set("Helv", fontRef);
      resourceDict.set("Font", fontDict);
      choiceWidgetDict.set("DA", "/Helv 5 Tf");
      choiceWidgetDict.set("DR", resourceDict);
      choiceWidgetDict.set("Rect", [0, 0, 32, 10]);
    });
    afterEach(function () {
      choiceWidgetDict = fontRefObj = null;
    });
    it("should handle missing option arrays", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee71() {
      var choiceWidgetRef, xref, _yield$AnnotationFact43, data;

      return _regenerator["default"].wrap(function _callee71$(_context71) {
        while (1) {
          switch (_context71.prev = _context71.next) {
            case 0:
              choiceWidgetRef = _primitives.Ref.get(122, 0);
              xref = new _test_utils.XRefMock([{
                ref: choiceWidgetRef,
                data: choiceWidgetDict
              }]);
              _context71.next = 4;
              return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock);

            case 4:
              _yield$AnnotationFact43 = _context71.sent;
              data = _yield$AnnotationFact43.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.options).toEqual([]);

            case 8:
            case "end":
              return _context71.stop();
          }
        }
      }, _callee71);
    })));
    it("should handle option arrays with array elements", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee72() {
      var optionBarRef, optionBarStr, optionOneRef, optionOneArr, options, expected, choiceWidgetRef, xref, _yield$AnnotationFact44, data;

      return _regenerator["default"].wrap(function _callee72$(_context72) {
        while (1) {
          switch (_context72.prev = _context72.next) {
            case 0:
              optionBarRef = _primitives.Ref.get(20, 0);
              optionBarStr = "Bar";
              optionOneRef = _primitives.Ref.get(10, 0);
              optionOneArr = ["bar_export", optionBarRef];
              options = [["foo_export", "Foo"], optionOneRef];
              expected = [{
                exportValue: "foo_export",
                displayValue: "Foo"
              }, {
                exportValue: "bar_export",
                displayValue: "Bar"
              }];
              choiceWidgetDict.set("Opt", options);
              choiceWidgetRef = _primitives.Ref.get(123, 0);
              xref = new _test_utils.XRefMock([{
                ref: choiceWidgetRef,
                data: choiceWidgetDict
              }, {
                ref: optionBarRef,
                data: optionBarStr
              }, {
                ref: optionOneRef,
                data: optionOneArr
              }]);
              _context72.next = 11;
              return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock);

            case 11:
              _yield$AnnotationFact44 = _context72.sent;
              data = _yield$AnnotationFact44.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.options).toEqual(expected);

            case 15:
            case "end":
              return _context72.stop();
          }
        }
      }, _callee72);
    })));
    it("should handle option arrays with string elements", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee73() {
      var optionBarRef, optionBarStr, options, expected, choiceWidgetRef, xref, _yield$AnnotationFact45, data;

      return _regenerator["default"].wrap(function _callee73$(_context73) {
        while (1) {
          switch (_context73.prev = _context73.next) {
            case 0:
              optionBarRef = _primitives.Ref.get(10, 0);
              optionBarStr = "Bar";
              options = ["Foo", optionBarRef];
              expected = [{
                exportValue: "Foo",
                displayValue: "Foo"
              }, {
                exportValue: "Bar",
                displayValue: "Bar"
              }];
              choiceWidgetDict.set("Opt", options);
              choiceWidgetRef = _primitives.Ref.get(981, 0);
              xref = new _test_utils.XRefMock([{
                ref: choiceWidgetRef,
                data: choiceWidgetDict
              }, {
                ref: optionBarRef,
                data: optionBarStr
              }]);
              _context73.next = 9;
              return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact45 = _context73.sent;
              data = _yield$AnnotationFact45.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.options).toEqual(expected);

            case 13:
            case "end":
              return _context73.stop();
          }
        }
      }, _callee73);
    })));
    it("should handle inherited option arrays (issue 8094)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee74() {
      var options, expected, parentDict, choiceWidgetRef, xref, _yield$AnnotationFact46, data;

      return _regenerator["default"].wrap(function _callee74$(_context74) {
        while (1) {
          switch (_context74.prev = _context74.next) {
            case 0:
              options = [["Value1", "Description1"], ["Value2", "Description2"]];
              expected = [{
                exportValue: "Value1",
                displayValue: "Description1"
              }, {
                exportValue: "Value2",
                displayValue: "Description2"
              }];
              parentDict = new _primitives.Dict();
              parentDict.set("Opt", options);
              choiceWidgetDict.set("Parent", parentDict);
              choiceWidgetRef = _primitives.Ref.get(123, 0);
              xref = new _test_utils.XRefMock([{
                ref: choiceWidgetRef,
                data: choiceWidgetDict
              }]);
              _context74.next = 9;
              return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact46 = _context74.sent;
              data = _yield$AnnotationFact46.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.options).toEqual(expected);

            case 13:
            case "end":
              return _context74.stop();
          }
        }
      }, _callee74);
    })));
    it("should decode form values", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee75() {
      var encodedString, decodedString, choiceWidgetRef, xref, _yield$AnnotationFact47, data;

      return _regenerator["default"].wrap(function _callee75$(_context75) {
        while (1) {
          switch (_context75.prev = _context75.next) {
            case 0:
              encodedString = "\xFE\xFF\x00F\x00o\x00o";
              decodedString = "Foo";
              choiceWidgetDict.set("Opt", [encodedString]);
              choiceWidgetDict.set("V", encodedString);
              choiceWidgetDict.set("DV", _primitives.Name.get("foo"));
              choiceWidgetRef = _primitives.Ref.get(984, 0);
              xref = new _test_utils.XRefMock([{
                ref: choiceWidgetRef,
                data: choiceWidgetDict
              }]);
              _context75.next = 9;
              return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact47 = _context75.sent;
              data = _yield$AnnotationFact47.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.fieldValue).toEqual([decodedString]);
              expect(data.defaultFieldValue).toEqual("foo");
              expect(data.options).toEqual([{
                exportValue: decodedString,
                displayValue: decodedString
              }]);

            case 15:
            case "end":
              return _context75.stop();
          }
        }
      }, _callee75);
    })));
    it("should convert the field value to an array", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee76() {
      var inputs, outputs, promise, _loop, i, ii;

      return _regenerator["default"].wrap(function _callee76$(_context76) {
        while (1) {
          switch (_context76.prev = _context76.next) {
            case 0:
              inputs = [null, "Foo", ["Foo", "Bar"]];
              outputs = [[], ["Foo"], ["Foo", "Bar"]];
              promise = Promise.resolve();

              _loop = function _loop(i, ii) {
                promise = promise.then(function () {
                  choiceWidgetDict.set("V", inputs[i]);

                  var choiceWidgetRef = _primitives.Ref.get(968, 0);

                  var xref = new _test_utils.XRefMock([{
                    ref: choiceWidgetRef,
                    data: choiceWidgetDict
                  }]);
                  return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref81) {
                    var data = _ref81.data;
                    expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
                    expect(data.fieldValue).toEqual(outputs[i]);
                  });
                });
              };

              for (i = 0, ii = inputs.length; i < ii; i++) {
                _loop(i, ii);
              }

              _context76.next = 7;
              return promise;

            case 7:
            case "end":
              return _context76.stop();
          }
        }
      }, _callee76);
    })));
    it("should handle unknown flags", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee77() {
      var choiceWidgetRef, xref, _yield$AnnotationFact48, data;

      return _regenerator["default"].wrap(function _callee77$(_context77) {
        while (1) {
          switch (_context77.prev = _context77.next) {
            case 0:
              choiceWidgetRef = _primitives.Ref.get(166, 0);
              xref = new _test_utils.XRefMock([{
                ref: choiceWidgetRef,
                data: choiceWidgetDict
              }]);
              _context77.next = 4;
              return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock);

            case 4:
              _yield$AnnotationFact48 = _context77.sent;
              data = _yield$AnnotationFact48.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.readOnly).toEqual(false);
              expect(data.hidden).toEqual(false);
              expect(data.combo).toEqual(false);
              expect(data.multiSelect).toEqual(false);

            case 11:
            case "end":
              return _context77.stop();
          }
        }
      }, _callee77);
    })));
    it("should not set invalid flags", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee78() {
      var choiceWidgetRef, xref, _yield$AnnotationFact49, data;

      return _regenerator["default"].wrap(function _callee78$(_context78) {
        while (1) {
          switch (_context78.prev = _context78.next) {
            case 0:
              choiceWidgetDict.set("Ff", "readonly");
              choiceWidgetRef = _primitives.Ref.get(165, 0);
              xref = new _test_utils.XRefMock([{
                ref: choiceWidgetRef,
                data: choiceWidgetDict
              }]);
              _context78.next = 5;
              return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock);

            case 5:
              _yield$AnnotationFact49 = _context78.sent;
              data = _yield$AnnotationFact49.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.readOnly).toEqual(false);
              expect(data.hidden).toEqual(false);
              expect(data.combo).toEqual(false);
              expect(data.multiSelect).toEqual(false);

            case 12:
            case "end":
              return _context78.stop();
          }
        }
      }, _callee78);
    })));
    it("should set valid flags", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee79() {
      var choiceWidgetRef, xref, _yield$AnnotationFact50, data;

      return _regenerator["default"].wrap(function _callee79$(_context79) {
        while (1) {
          switch (_context79.prev = _context79.next) {
            case 0:
              choiceWidgetDict.set("Ff", _util.AnnotationFieldFlag.READONLY + _util.AnnotationFieldFlag.COMBO + _util.AnnotationFieldFlag.MULTISELECT);
              choiceWidgetRef = _primitives.Ref.get(512, 0);
              xref = new _test_utils.XRefMock([{
                ref: choiceWidgetRef,
                data: choiceWidgetDict
              }]);
              _context79.next = 5;
              return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock);

            case 5:
              _yield$AnnotationFact50 = _context79.sent;
              data = _yield$AnnotationFact50.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.WIDGET);
              expect(data.readOnly).toEqual(true);
              expect(data.hidden).toEqual(false);
              expect(data.combo).toEqual(true);
              expect(data.multiSelect).toEqual(true);

            case 12:
            case "end":
              return _context79.stop();
          }
        }
      }, _callee79);
    })));
    it("should render choice for printing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee80() {
      var choiceWidgetRef, xref, task, annotation, annotationStorage, appearance;
      return _regenerator["default"].wrap(function _callee80$(_context80) {
        while (1) {
          switch (_context80.prev = _context80.next) {
            case 0:
              choiceWidgetRef = _primitives.Ref.get(271, 0);
              xref = new _test_utils.XRefMock([{
                ref: choiceWidgetRef,
                data: choiceWidgetDict
              }, fontRefObj]);
              task = new _worker.WorkerTask("test print");
              partialEvaluator.xref = xref;
              _context80.next = 6;
              return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock);

            case 6:
              annotation = _context80.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "a value"
              });
              _context80.next = 11;
              return annotation._getAppearance(partialEvaluator, task, annotationStorage);

            case 11:
              appearance = _context80.sent;
              expect(appearance).toEqual("/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 0 Tm" + " 2.00 2.00 Td (a value) Tj ET Q EMC");

            case 13:
            case "end":
              return _context80.stop();
          }
        }
      }, _callee80);
    })));
    it("should save choice", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee81() {
      var choiceWidgetRef, xref, task, annotation, annotationStorage, data, _data6, oldData, newData;

      return _regenerator["default"].wrap(function _callee81$(_context81) {
        while (1) {
          switch (_context81.prev = _context81.next) {
            case 0:
              choiceWidgetDict.set("Opt", ["A", "B", "C"]);
              choiceWidgetDict.set("V", "A");
              choiceWidgetRef = _primitives.Ref.get(123, 0);
              xref = new _test_utils.XRefMock([{
                ref: choiceWidgetRef,
                data: choiceWidgetDict
              }]);
              partialEvaluator.xref = xref;
              task = new _worker.WorkerTask("test save");
              _context81.next = 8;
              return _annotation.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock);

            case 8:
              annotation = _context81.sent;
              annotationStorage = new Map();
              annotationStorage.set(annotation.data.id, {
                value: "C"
              });
              _context81.next = 13;
              return annotation.save(partialEvaluator, task, annotationStorage);

            case 13:
              data = _context81.sent;
              expect(data.length).toEqual(2);
              _data6 = _slicedToArray(data, 2), oldData = _data6[0], newData = _data6[1];
              expect(oldData.ref).toEqual(_primitives.Ref.get(123, 0));
              expect(newData.ref).toEqual(_primitives.Ref.get(1, 0));
              oldData.data = oldData.data.replace(/\(D:\d+\)/, "(date)");
              expect(oldData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Ch /DA (/Helv 5 Tf) /DR " + "<< /Font << /Helv 314 0 R>>>> " + "/Rect [0 0 32 10] /Opt [(A) (B) (C)] /V (C) " + "/AP << /N 1 0 R>> /M (date)>>\nendobj\n");
              expect(newData.data).toEqual("1 0 obj\n" + "<< /Length 67 /Subtype /Form /Resources << /Font << /Helv 314 0 R>>>> " + "/BBox [0 0 32 10]>> stream\n" + "/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 0 Tm 2.00 2.00 Td (C) Tj ET Q EMC\n" + "endstream\nendobj\n");

            case 21:
            case "end":
              return _context81.stop();
          }
        }
      }, _callee81);
    })));
  });
  describe("LineAnnotation", function () {
    it("should set the line coordinates", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee82() {
      var lineDict, lineRef, xref, _yield$AnnotationFact51, data;

      return _regenerator["default"].wrap(function _callee82$(_context82) {
        while (1) {
          switch (_context82.prev = _context82.next) {
            case 0:
              lineDict = new _primitives.Dict();
              lineDict.set("Type", _primitives.Name.get("Annot"));
              lineDict.set("Subtype", _primitives.Name.get("Line"));
              lineDict.set("L", [1, 2, 3, 4]);
              lineRef = _primitives.Ref.get(122, 0);
              xref = new _test_utils.XRefMock([{
                ref: lineRef,
                data: lineDict
              }]);
              _context82.next = 8;
              return _annotation.AnnotationFactory.create(xref, lineRef, pdfManagerMock, idFactoryMock);

            case 8:
              _yield$AnnotationFact51 = _context82.sent;
              data = _yield$AnnotationFact51.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.LINE);
              expect(data.lineCoordinates).toEqual([1, 2, 3, 4]);

            case 12:
            case "end":
              return _context82.stop();
          }
        }
      }, _callee82);
    })));
  });
  describe("FileAttachmentAnnotation", function () {
    it("should correctly parse a file attachment", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee83() {
      var fileStream, parser, fileStreamRef, fileStreamDict, embeddedFileDict, fileSpecRef, fileSpecDict, fileAttachmentRef, fileAttachmentDict, xref, _yield$AnnotationFact52, data;

      return _regenerator["default"].wrap(function _callee83$(_context83) {
        while (1) {
          switch (_context83.prev = _context83.next) {
            case 0:
              fileStream = new _stream.StringStream("<<\n" + "/Type /EmbeddedFile\n" + "/Subtype /text#2Fplain\n" + ">>\n" + "stream\n" + "Test attachment" + "endstream\n");
              parser = new _parser.Parser({
                lexer: new _parser.Lexer(fileStream),
                xref: null,
                allowStreams: true
              });
              fileStreamRef = _primitives.Ref.get(18, 0);
              fileStreamDict = parser.getObj();
              embeddedFileDict = new _primitives.Dict();
              embeddedFileDict.set("F", fileStreamRef);
              fileSpecRef = _primitives.Ref.get(19, 0);
              fileSpecDict = new _primitives.Dict();
              fileSpecDict.set("Type", _primitives.Name.get("Filespec"));
              fileSpecDict.set("Desc", "");
              fileSpecDict.set("EF", embeddedFileDict);
              fileSpecDict.set("UF", "Test.txt");
              fileAttachmentRef = _primitives.Ref.get(20, 0);
              fileAttachmentDict = new _primitives.Dict();
              fileAttachmentDict.set("Type", _primitives.Name.get("Annot"));
              fileAttachmentDict.set("Subtype", _primitives.Name.get("FileAttachment"));
              fileAttachmentDict.set("FS", fileSpecRef);
              fileAttachmentDict.set("T", "Topic");
              fileAttachmentDict.set("Contents", "Test.txt");
              xref = new _test_utils.XRefMock([{
                ref: fileStreamRef,
                data: fileStreamDict
              }, {
                ref: fileSpecRef,
                data: fileSpecDict
              }, {
                ref: fileAttachmentRef,
                data: fileAttachmentDict
              }]);
              embeddedFileDict.assignXref(xref);
              fileSpecDict.assignXref(xref);
              fileAttachmentDict.assignXref(xref);
              _context83.next = 25;
              return _annotation.AnnotationFactory.create(xref, fileAttachmentRef, pdfManagerMock, idFactoryMock);

            case 25:
              _yield$AnnotationFact52 = _context83.sent;
              data = _yield$AnnotationFact52.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.FILEATTACHMENT);
              expect(data.file.filename).toEqual("Test.txt");
              expect(data.file.content).toEqual((0, _util.stringToBytes)("Test attachment"));

            case 30:
            case "end":
              return _context83.stop();
          }
        }
      }, _callee83);
    })));
  });
  describe("PopupAnnotation", function () {
    it("should inherit properties from its parent", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee84() {
      var parentDict, popupDict, popupRef, xref, _yield$AnnotationFact53, data;

      return _regenerator["default"].wrap(function _callee84$(_context84) {
        while (1) {
          switch (_context84.prev = _context84.next) {
            case 0:
              parentDict = new _primitives.Dict();
              parentDict.set("Type", _primitives.Name.get("Annot"));
              parentDict.set("Subtype", _primitives.Name.get("Text"));
              parentDict.set("M", "D:20190423");
              parentDict.set("C", [0, 0, 1]);
              popupDict = new _primitives.Dict();
              popupDict.set("Type", _primitives.Name.get("Annot"));
              popupDict.set("Subtype", _primitives.Name.get("Popup"));
              popupDict.set("Parent", parentDict);
              popupRef = _primitives.Ref.get(13, 0);
              xref = new _test_utils.XRefMock([{
                ref: popupRef,
                data: popupDict
              }]);
              _context84.next = 13;
              return _annotation.AnnotationFactory.create(xref, popupRef, pdfManagerMock, idFactoryMock);

            case 13:
              _yield$AnnotationFact53 = _context84.sent;
              data = _yield$AnnotationFact53.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.POPUP);
              expect(data.modificationDate).toEqual("D:20190423");
              expect(data.color).toEqual(new Uint8ClampedArray([0, 0, 255]));

            case 18:
            case "end":
              return _context84.stop();
          }
        }
      }, _callee84);
    })));
    it("should handle missing parent properties", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee85() {
      var parentDict, popupDict, popupRef, xref, _yield$AnnotationFact54, data;

      return _regenerator["default"].wrap(function _callee85$(_context85) {
        while (1) {
          switch (_context85.prev = _context85.next) {
            case 0:
              parentDict = new _primitives.Dict();
              parentDict.set("Type", _primitives.Name.get("Annot"));
              parentDict.set("Subtype", _primitives.Name.get("Text"));
              popupDict = new _primitives.Dict();
              popupDict.set("Type", _primitives.Name.get("Annot"));
              popupDict.set("Subtype", _primitives.Name.get("Popup"));
              popupDict.set("Parent", parentDict);
              popupRef = _primitives.Ref.get(13, 0);
              xref = new _test_utils.XRefMock([{
                ref: popupRef,
                data: popupDict
              }]);
              _context85.next = 11;
              return _annotation.AnnotationFactory.create(xref, popupRef, pdfManagerMock, idFactoryMock);

            case 11:
              _yield$AnnotationFact54 = _context85.sent;
              data = _yield$AnnotationFact54.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.POPUP);
              expect(data.modificationDate).toEqual(null);
              expect(data.color).toEqual(null);

            case 16:
            case "end":
              return _context85.stop();
          }
        }
      }, _callee85);
    })));
    it("should inherit the parent flags when the Popup is not viewable, " + "but the parent is (PR 7352)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee86() {
      var parentDict, popupDict, popupRef, xref, _yield$AnnotationFact55, data, viewable;

      return _regenerator["default"].wrap(function _callee86$(_context86) {
        while (1) {
          switch (_context86.prev = _context86.next) {
            case 0:
              parentDict = new _primitives.Dict();
              parentDict.set("Type", _primitives.Name.get("Annot"));
              parentDict.set("Subtype", _primitives.Name.get("Text"));
              parentDict.set("F", 28);
              popupDict = new _primitives.Dict();
              popupDict.set("Type", _primitives.Name.get("Annot"));
              popupDict.set("Subtype", _primitives.Name.get("Popup"));
              popupDict.set("F", 25);
              popupDict.set("Parent", parentDict);
              popupRef = _primitives.Ref.get(13, 0);
              xref = new _test_utils.XRefMock([{
                ref: popupRef,
                data: popupDict
              }]);
              _context86.next = 13;
              return _annotation.AnnotationFactory.create(xref, popupRef, pdfManagerMock, idFactoryMock);

            case 13:
              _yield$AnnotationFact55 = _context86.sent;
              data = _yield$AnnotationFact55.data;
              viewable = _yield$AnnotationFact55.viewable;
              expect(data.annotationType).toEqual(_util.AnnotationType.POPUP);
              expect(data.annotationFlags).toEqual(25);
              expect(viewable).toEqual(true);

            case 19:
            case "end":
              return _context86.stop();
          }
        }
      }, _callee86);
    })));
    it("should correctly inherit Contents from group-master annotation " + "if parent has ReplyType == Group", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee87() {
      var annotationRef, annotationDict, replyRef, replyDict, popupRef, popupDict, xref, _yield$AnnotationFact56, data;

      return _regenerator["default"].wrap(function _callee87$(_context87) {
        while (1) {
          switch (_context87.prev = _context87.next) {
            case 0:
              annotationRef = _primitives.Ref.get(819, 0);
              annotationDict = new _primitives.Dict();
              annotationDict.set("Type", _primitives.Name.get("Annot"));
              annotationDict.set("Subtype", _primitives.Name.get("Text"));
              annotationDict.set("T", "Correct Title");
              annotationDict.set("Contents", "Correct Text");
              annotationDict.set("M", "D:20190423");
              annotationDict.set("C", [0, 0, 1]);
              replyRef = _primitives.Ref.get(820, 0);
              replyDict = new _primitives.Dict();
              replyDict.set("Type", _primitives.Name.get("Annot"));
              replyDict.set("Subtype", _primitives.Name.get("Text"));
              replyDict.set("IRT", annotationRef);
              replyDict.set("RT", _primitives.Name.get("Group"));
              replyDict.set("T", "Reply Title");
              replyDict.set("Contents", "Reply Text");
              replyDict.set("M", "D:20190523");
              replyDict.set("C", [0.4]);
              popupRef = _primitives.Ref.get(821, 0);
              popupDict = new _primitives.Dict();
              popupDict.set("Type", _primitives.Name.get("Annot"));
              popupDict.set("Subtype", _primitives.Name.get("Popup"));
              popupDict.set("T", "Wrong Title");
              popupDict.set("Contents", "Wrong Text");
              popupDict.set("Parent", replyRef);
              popupDict.set("M", "D:20190623");
              popupDict.set("C", [0.8]);
              replyDict.set("Popup", popupRef);
              xref = new _test_utils.XRefMock([{
                ref: annotationRef,
                data: annotationDict
              }, {
                ref: replyRef,
                data: replyDict
              }, {
                ref: popupRef,
                data: popupDict
              }]);
              annotationDict.assignXref(xref);
              popupDict.assignXref(xref);
              replyDict.assignXref(xref);
              _context87.next = 34;
              return _annotation.AnnotationFactory.create(xref, popupRef, pdfManagerMock, idFactoryMock);

            case 34:
              _yield$AnnotationFact56 = _context87.sent;
              data = _yield$AnnotationFact56.data;
              expect(data.titleObj).toEqual({
                str: "Correct Title",
                dir: "ltr"
              });
              expect(data.contentsObj).toEqual({
                str: "Correct Text",
                dir: "ltr"
              });
              expect(data.modificationDate).toEqual("D:20190423");
              expect(data.color).toEqual(new Uint8ClampedArray([0, 0, 255]));

            case 40:
            case "end":
              return _context87.stop();
          }
        }
      }, _callee87);
    })));
  });
  describe("InkAnnotation", function () {
    it("should handle a single ink list", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee88() {
      var inkDict, inkRef, xref, _yield$AnnotationFact57, data;

      return _regenerator["default"].wrap(function _callee88$(_context88) {
        while (1) {
          switch (_context88.prev = _context88.next) {
            case 0:
              inkDict = new _primitives.Dict();
              inkDict.set("Type", _primitives.Name.get("Annot"));
              inkDict.set("Subtype", _primitives.Name.get("Ink"));
              inkDict.set("InkList", [[1, 1, 1, 2, 2, 2, 3, 3]]);
              inkRef = _primitives.Ref.get(142, 0);
              xref = new _test_utils.XRefMock([{
                ref: inkRef,
                data: inkDict
              }]);
              _context88.next = 8;
              return _annotation.AnnotationFactory.create(xref, inkRef, pdfManagerMock, idFactoryMock);

            case 8:
              _yield$AnnotationFact57 = _context88.sent;
              data = _yield$AnnotationFact57.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.INK);
              expect(data.inkLists.length).toEqual(1);
              expect(data.inkLists[0]).toEqual([{
                x: 1,
                y: 1
              }, {
                x: 1,
                y: 2
              }, {
                x: 2,
                y: 2
              }, {
                x: 3,
                y: 3
              }]);

            case 13:
            case "end":
              return _context88.stop();
          }
        }
      }, _callee88);
    })));
    it("should handle multiple ink lists", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee89() {
      var inkDict, inkRef, xref, _yield$AnnotationFact58, data;

      return _regenerator["default"].wrap(function _callee89$(_context89) {
        while (1) {
          switch (_context89.prev = _context89.next) {
            case 0:
              inkDict = new _primitives.Dict();
              inkDict.set("Type", _primitives.Name.get("Annot"));
              inkDict.set("Subtype", _primitives.Name.get("Ink"));
              inkDict.set("InkList", [[1, 1, 1, 2], [3, 3, 4, 5]]);
              inkRef = _primitives.Ref.get(143, 0);
              xref = new _test_utils.XRefMock([{
                ref: inkRef,
                data: inkDict
              }]);
              _context89.next = 8;
              return _annotation.AnnotationFactory.create(xref, inkRef, pdfManagerMock, idFactoryMock);

            case 8:
              _yield$AnnotationFact58 = _context89.sent;
              data = _yield$AnnotationFact58.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.INK);
              expect(data.inkLists.length).toEqual(2);
              expect(data.inkLists[0]).toEqual([{
                x: 1,
                y: 1
              }, {
                x: 1,
                y: 2
              }]);
              expect(data.inkLists[1]).toEqual([{
                x: 3,
                y: 3
              }, {
                x: 4,
                y: 5
              }]);

            case 14:
            case "end":
              return _context89.stop();
          }
        }
      }, _callee89);
    })));
  });
  describe("HightlightAnnotation", function () {
    it("should set quadpoints to null if not defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee90() {
      var highlightDict, highlightRef, xref, _yield$AnnotationFact59, data;

      return _regenerator["default"].wrap(function _callee90$(_context90) {
        while (1) {
          switch (_context90.prev = _context90.next) {
            case 0:
              highlightDict = new _primitives.Dict();
              highlightDict.set("Type", _primitives.Name.get("Annot"));
              highlightDict.set("Subtype", _primitives.Name.get("Highlight"));
              highlightRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: highlightRef,
                data: highlightDict
              }]);
              _context90.next = 7;
              return _annotation.AnnotationFactory.create(xref, highlightRef, pdfManagerMock, idFactoryMock);

            case 7:
              _yield$AnnotationFact59 = _context90.sent;
              data = _yield$AnnotationFact59.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.HIGHLIGHT);
              expect(data.quadPoints).toEqual(null);

            case 11:
            case "end":
              return _context90.stop();
          }
        }
      }, _callee90);
    })));
    it("should set quadpoints if defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee91() {
      var highlightDict, highlightRef, xref, _yield$AnnotationFact60, data;

      return _regenerator["default"].wrap(function _callee91$(_context91) {
        while (1) {
          switch (_context91.prev = _context91.next) {
            case 0:
              highlightDict = new _primitives.Dict();
              highlightDict.set("Type", _primitives.Name.get("Annot"));
              highlightDict.set("Subtype", _primitives.Name.get("Highlight"));
              highlightDict.set("Rect", [10, 10, 20, 20]);
              highlightDict.set("QuadPoints", [10, 20, 20, 20, 10, 10, 20, 10]);
              highlightRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: highlightRef,
                data: highlightDict
              }]);
              _context91.next = 9;
              return _annotation.AnnotationFactory.create(xref, highlightRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact60 = _context91.sent;
              data = _yield$AnnotationFact60.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.HIGHLIGHT);
              expect(data.quadPoints).toEqual([[{
                x: 10,
                y: 20
              }, {
                x: 20,
                y: 20
              }, {
                x: 10,
                y: 10
              }, {
                x: 20,
                y: 10
              }]]);

            case 13:
            case "end":
              return _context91.stop();
          }
        }
      }, _callee91);
    })));
    it("should set quadpoints to null when empty", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee92() {
      var highlightDict, highlightRef, xref, _yield$AnnotationFact61, data;

      return _regenerator["default"].wrap(function _callee92$(_context92) {
        while (1) {
          switch (_context92.prev = _context92.next) {
            case 0:
              highlightDict = new _primitives.Dict();
              highlightDict.set("Type", _primitives.Name.get("Annot"));
              highlightDict.set("Subtype", _primitives.Name.get("Highlight"));
              highlightDict.set("Rect", [10, 10, 20, 20]);
              highlightDict.set("QuadPoints", []);
              highlightRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: highlightRef,
                data: highlightDict
              }]);
              _context92.next = 9;
              return _annotation.AnnotationFactory.create(xref, highlightRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact61 = _context92.sent;
              data = _yield$AnnotationFact61.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.HIGHLIGHT);
              expect(data.quadPoints).toEqual(null);

            case 13:
            case "end":
              return _context92.stop();
          }
        }
      }, _callee92);
    })));
  });
  describe("UnderlineAnnotation", function () {
    it("should set quadpoints to null if not defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee93() {
      var underlineDict, underlineRef, xref, _yield$AnnotationFact62, data;

      return _regenerator["default"].wrap(function _callee93$(_context93) {
        while (1) {
          switch (_context93.prev = _context93.next) {
            case 0:
              underlineDict = new _primitives.Dict();
              underlineDict.set("Type", _primitives.Name.get("Annot"));
              underlineDict.set("Subtype", _primitives.Name.get("Underline"));
              underlineRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: underlineRef,
                data: underlineDict
              }]);
              _context93.next = 7;
              return _annotation.AnnotationFactory.create(xref, underlineRef, pdfManagerMock, idFactoryMock);

            case 7:
              _yield$AnnotationFact62 = _context93.sent;
              data = _yield$AnnotationFact62.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.UNDERLINE);
              expect(data.quadPoints).toEqual(null);

            case 11:
            case "end":
              return _context93.stop();
          }
        }
      }, _callee93);
    })));
    it("should set quadpoints if defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee94() {
      var underlineDict, underlineRef, xref, _yield$AnnotationFact63, data;

      return _regenerator["default"].wrap(function _callee94$(_context94) {
        while (1) {
          switch (_context94.prev = _context94.next) {
            case 0:
              underlineDict = new _primitives.Dict();
              underlineDict.set("Type", _primitives.Name.get("Annot"));
              underlineDict.set("Subtype", _primitives.Name.get("Underline"));
              underlineDict.set("Rect", [10, 10, 20, 20]);
              underlineDict.set("QuadPoints", [10, 20, 20, 20, 10, 10, 20, 10]);
              underlineRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: underlineRef,
                data: underlineDict
              }]);
              _context94.next = 9;
              return _annotation.AnnotationFactory.create(xref, underlineRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact63 = _context94.sent;
              data = _yield$AnnotationFact63.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.UNDERLINE);
              expect(data.quadPoints).toEqual([[{
                x: 10,
                y: 20
              }, {
                x: 20,
                y: 20
              }, {
                x: 10,
                y: 10
              }, {
                x: 20,
                y: 10
              }]]);

            case 13:
            case "end":
              return _context94.stop();
          }
        }
      }, _callee94);
    })));
  });
  describe("SquigglyAnnotation", function () {
    it("should set quadpoints to null if not defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee95() {
      var squigglyDict, squigglyRef, xref, _yield$AnnotationFact64, data;

      return _regenerator["default"].wrap(function _callee95$(_context95) {
        while (1) {
          switch (_context95.prev = _context95.next) {
            case 0:
              squigglyDict = new _primitives.Dict();
              squigglyDict.set("Type", _primitives.Name.get("Annot"));
              squigglyDict.set("Subtype", _primitives.Name.get("Squiggly"));
              squigglyRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: squigglyRef,
                data: squigglyDict
              }]);
              _context95.next = 7;
              return _annotation.AnnotationFactory.create(xref, squigglyRef, pdfManagerMock, idFactoryMock);

            case 7:
              _yield$AnnotationFact64 = _context95.sent;
              data = _yield$AnnotationFact64.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.SQUIGGLY);
              expect(data.quadPoints).toEqual(null);

            case 11:
            case "end":
              return _context95.stop();
          }
        }
      }, _callee95);
    })));
    it("should set quadpoints if defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee96() {
      var squigglyDict, squigglyRef, xref, _yield$AnnotationFact65, data;

      return _regenerator["default"].wrap(function _callee96$(_context96) {
        while (1) {
          switch (_context96.prev = _context96.next) {
            case 0:
              squigglyDict = new _primitives.Dict();
              squigglyDict.set("Type", _primitives.Name.get("Annot"));
              squigglyDict.set("Subtype", _primitives.Name.get("Squiggly"));
              squigglyDict.set("Rect", [10, 10, 20, 20]);
              squigglyDict.set("QuadPoints", [10, 20, 20, 20, 10, 10, 20, 10]);
              squigglyRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: squigglyRef,
                data: squigglyDict
              }]);
              _context96.next = 9;
              return _annotation.AnnotationFactory.create(xref, squigglyRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact65 = _context96.sent;
              data = _yield$AnnotationFact65.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.SQUIGGLY);
              expect(data.quadPoints).toEqual([[{
                x: 10,
                y: 20
              }, {
                x: 20,
                y: 20
              }, {
                x: 10,
                y: 10
              }, {
                x: 20,
                y: 10
              }]]);

            case 13:
            case "end":
              return _context96.stop();
          }
        }
      }, _callee96);
    })));
  });
  describe("StrikeOutAnnotation", function () {
    it("should set quadpoints to null if not defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee97() {
      var strikeOutDict, strikeOutRef, xref, _yield$AnnotationFact66, data;

      return _regenerator["default"].wrap(function _callee97$(_context97) {
        while (1) {
          switch (_context97.prev = _context97.next) {
            case 0:
              strikeOutDict = new _primitives.Dict();
              strikeOutDict.set("Type", _primitives.Name.get("Annot"));
              strikeOutDict.set("Subtype", _primitives.Name.get("StrikeOut"));
              strikeOutRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: strikeOutRef,
                data: strikeOutDict
              }]);
              _context97.next = 7;
              return _annotation.AnnotationFactory.create(xref, strikeOutRef, pdfManagerMock, idFactoryMock);

            case 7:
              _yield$AnnotationFact66 = _context97.sent;
              data = _yield$AnnotationFact66.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.STRIKEOUT);
              expect(data.quadPoints).toEqual(null);

            case 11:
            case "end":
              return _context97.stop();
          }
        }
      }, _callee97);
    })));
    it("should set quadpoints if defined", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee98() {
      var strikeOutDict, strikeOutRef, xref, _yield$AnnotationFact67, data;

      return _regenerator["default"].wrap(function _callee98$(_context98) {
        while (1) {
          switch (_context98.prev = _context98.next) {
            case 0:
              strikeOutDict = new _primitives.Dict();
              strikeOutDict.set("Type", _primitives.Name.get("Annot"));
              strikeOutDict.set("Subtype", _primitives.Name.get("StrikeOut"));
              strikeOutDict.set("Rect", [10, 10, 20, 20]);
              strikeOutDict.set("QuadPoints", [10, 20, 20, 20, 10, 10, 20, 10]);
              strikeOutRef = _primitives.Ref.get(121, 0);
              xref = new _test_utils.XRefMock([{
                ref: strikeOutRef,
                data: strikeOutDict
              }]);
              _context98.next = 9;
              return _annotation.AnnotationFactory.create(xref, strikeOutRef, pdfManagerMock, idFactoryMock);

            case 9:
              _yield$AnnotationFact67 = _context98.sent;
              data = _yield$AnnotationFact67.data;
              expect(data.annotationType).toEqual(_util.AnnotationType.STRIKEOUT);
              expect(data.quadPoints).toEqual([[{
                x: 10,
                y: 20
              }, {
                x: 20,
                y: 20
              }, {
                x: 10,
                y: 10
              }, {
                x: 20,
                y: 10
              }]]);

            case 13:
            case "end":
              return _context98.stop();
          }
        }
      }, _callee98);
    })));
  });
});