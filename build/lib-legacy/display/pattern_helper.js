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
exports.TilingPattern = exports.PathType = void 0;
exports.getShadingPattern = getShadingPattern;

var _util = require("../shared/util.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PathType = {
  FILL: "Fill",
  STROKE: "Stroke",
  SHADING: "Shading"
};
exports.PathType = PathType;

function applyBoundingBox(ctx, bbox) {
  if (!bbox || typeof Path2D === "undefined") {
    return;
  }

  var width = bbox[2] - bbox[0];
  var height = bbox[3] - bbox[1];
  var region = new Path2D();
  region.rect(bbox[0], bbox[1], width, height);
  ctx.clip(region);
}

var BaseShadingPattern = /*#__PURE__*/function () {
  function BaseShadingPattern() {
    _classCallCheck(this, BaseShadingPattern);

    if (this.constructor === BaseShadingPattern) {
      (0, _util.unreachable)("Cannot initialize BaseShadingPattern.");
    }
  }

  _createClass(BaseShadingPattern, [{
    key: "getPattern",
    value: function getPattern() {
      (0, _util.unreachable)("Abstract method `getPattern` called.");
    }
  }]);

  return BaseShadingPattern;
}();

var RadialAxialShadingPattern = /*#__PURE__*/function (_BaseShadingPattern) {
  _inherits(RadialAxialShadingPattern, _BaseShadingPattern);

  var _super = _createSuper(RadialAxialShadingPattern);

  function RadialAxialShadingPattern(IR) {
    var _this;

    _classCallCheck(this, RadialAxialShadingPattern);

    _this = _super.call(this);
    _this._type = IR[1];
    _this._bbox = IR[2];
    _this._colorStops = IR[3];
    _this._p0 = IR[4];
    _this._p1 = IR[5];
    _this._r0 = IR[6];
    _this._r1 = IR[7];
    _this.matrix = null;
    return _this;
  }

  _createClass(RadialAxialShadingPattern, [{
    key: "_createGradient",
    value: function _createGradient(ctx) {
      var grad;

      if (this._type === "axial") {
        grad = ctx.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]);
      } else if (this._type === "radial") {
        grad = ctx.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1);
      }

      var _iterator = _createForOfIteratorHelper(this._colorStops),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var colorStop = _step.value;
          grad.addColorStop(colorStop[0], colorStop[1]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return grad;
    }
  }, {
    key: "getPattern",
    value: function getPattern(ctx, owner, inverse, pathType) {
      var pattern;

      if (pathType === PathType.STROKE || pathType === PathType.FILL) {
        var ownerBBox = owner.current.getClippedPathBoundingBox(pathType, ctx.mozCurrentTransform) || [0, 0, 0, 0];
        var width = Math.ceil(ownerBBox[2] - ownerBBox[0]) || 1;
        var height = Math.ceil(ownerBBox[3] - ownerBBox[1]) || 1;
        var tmpCanvas = owner.cachedCanvases.getCanvas("pattern", width, height, true);
        var tmpCtx = tmpCanvas.context;
        tmpCtx.clearRect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
        tmpCtx.beginPath();
        tmpCtx.rect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
        tmpCtx.translate(-ownerBBox[0], -ownerBBox[1]);
        inverse = _util.Util.transform(inverse, [1, 0, 0, 1, ownerBBox[0], ownerBBox[1]]);
        tmpCtx.transform.apply(tmpCtx, owner.baseTransform);

        if (this.matrix) {
          tmpCtx.transform.apply(tmpCtx, this.matrix);
        }

        applyBoundingBox(tmpCtx, this._bbox);
        tmpCtx.fillStyle = this._createGradient(tmpCtx);
        tmpCtx.fill();
        pattern = ctx.createPattern(tmpCanvas.canvas, "no-repeat");
        var domMatrix = new DOMMatrix(inverse);

        try {
          pattern.setTransform(domMatrix);
        } catch (ex) {
          (0, _util.warn)("RadialAxialShadingPattern.getPattern: \"".concat(ex === null || ex === void 0 ? void 0 : ex.message, "\"."));
        }
      } else {
        applyBoundingBox(ctx, this._bbox);
        pattern = this._createGradient(ctx);
      }

      return pattern;
    }
  }]);

  return RadialAxialShadingPattern;
}(BaseShadingPattern);

function drawTriangle(data, context, p1, p2, p3, c1, c2, c3) {
  var coords = context.coords,
      colors = context.colors;
  var bytes = data.data,
      rowSize = data.width * 4;
  var tmp;

  if (coords[p1 + 1] > coords[p2 + 1]) {
    tmp = p1;
    p1 = p2;
    p2 = tmp;
    tmp = c1;
    c1 = c2;
    c2 = tmp;
  }

  if (coords[p2 + 1] > coords[p3 + 1]) {
    tmp = p2;
    p2 = p3;
    p3 = tmp;
    tmp = c2;
    c2 = c3;
    c3 = tmp;
  }

  if (coords[p1 + 1] > coords[p2 + 1]) {
    tmp = p1;
    p1 = p2;
    p2 = tmp;
    tmp = c1;
    c1 = c2;
    c2 = tmp;
  }

  var x1 = (coords[p1] + context.offsetX) * context.scaleX;
  var y1 = (coords[p1 + 1] + context.offsetY) * context.scaleY;
  var x2 = (coords[p2] + context.offsetX) * context.scaleX;
  var y2 = (coords[p2 + 1] + context.offsetY) * context.scaleY;
  var x3 = (coords[p3] + context.offsetX) * context.scaleX;
  var y3 = (coords[p3 + 1] + context.offsetY) * context.scaleY;

  if (y1 >= y3) {
    return;
  }

  var c1r = colors[c1],
      c1g = colors[c1 + 1],
      c1b = colors[c1 + 2];
  var c2r = colors[c2],
      c2g = colors[c2 + 1],
      c2b = colors[c2 + 2];
  var c3r = colors[c3],
      c3g = colors[c3 + 1],
      c3b = colors[c3 + 2];
  var minY = Math.round(y1),
      maxY = Math.round(y3);
  var xa, car, cag, cab;
  var xb, cbr, cbg, cbb;

  for (var y = minY; y <= maxY; y++) {
    if (y < y2) {
      var _k = void 0;

      if (y < y1) {
        _k = 0;
      } else {
        _k = (y1 - y) / (y1 - y2);
      }

      xa = x1 - (x1 - x2) * _k;
      car = c1r - (c1r - c2r) * _k;
      cag = c1g - (c1g - c2g) * _k;
      cab = c1b - (c1b - c2b) * _k;
    } else {
      var _k2 = void 0;

      if (y > y3) {
        _k2 = 1;
      } else if (y2 === y3) {
        _k2 = 0;
      } else {
        _k2 = (y2 - y) / (y2 - y3);
      }

      xa = x2 - (x2 - x3) * _k2;
      car = c2r - (c2r - c3r) * _k2;
      cag = c2g - (c2g - c3g) * _k2;
      cab = c2b - (c2b - c3b) * _k2;
    }

    var k = void 0;

    if (y < y1) {
      k = 0;
    } else if (y > y3) {
      k = 1;
    } else {
      k = (y1 - y) / (y1 - y3);
    }

    xb = x1 - (x1 - x3) * k;
    cbr = c1r - (c1r - c3r) * k;
    cbg = c1g - (c1g - c3g) * k;
    cbb = c1b - (c1b - c3b) * k;
    var x1_ = Math.round(Math.min(xa, xb));
    var x2_ = Math.round(Math.max(xa, xb));
    var j = rowSize * y + x1_ * 4;

    for (var x = x1_; x <= x2_; x++) {
      k = (xa - x) / (xa - xb);

      if (k < 0) {
        k = 0;
      } else if (k > 1) {
        k = 1;
      }

      bytes[j++] = car - (car - cbr) * k | 0;
      bytes[j++] = cag - (cag - cbg) * k | 0;
      bytes[j++] = cab - (cab - cbb) * k | 0;
      bytes[j++] = 255;
    }
  }
}

function drawFigure(data, figure, context) {
  var ps = figure.coords;
  var cs = figure.colors;
  var i, ii;

  switch (figure.type) {
    case "lattice":
      var verticesPerRow = figure.verticesPerRow;
      var rows = Math.floor(ps.length / verticesPerRow) - 1;
      var cols = verticesPerRow - 1;

      for (i = 0; i < rows; i++) {
        var q = i * verticesPerRow;

        for (var j = 0; j < cols; j++, q++) {
          drawTriangle(data, context, ps[q], ps[q + 1], ps[q + verticesPerRow], cs[q], cs[q + 1], cs[q + verticesPerRow]);
          drawTriangle(data, context, ps[q + verticesPerRow + 1], ps[q + 1], ps[q + verticesPerRow], cs[q + verticesPerRow + 1], cs[q + 1], cs[q + verticesPerRow]);
        }
      }

      break;

    case "triangles":
      for (i = 0, ii = ps.length; i < ii; i += 3) {
        drawTriangle(data, context, ps[i], ps[i + 1], ps[i + 2], cs[i], cs[i + 1], cs[i + 2]);
      }

      break;

    default:
      throw new Error("illegal figure");
  }
}

var MeshShadingPattern = /*#__PURE__*/function (_BaseShadingPattern2) {
  _inherits(MeshShadingPattern, _BaseShadingPattern2);

  var _super2 = _createSuper(MeshShadingPattern);

  function MeshShadingPattern(IR) {
    var _this2;

    _classCallCheck(this, MeshShadingPattern);

    _this2 = _super2.call(this);
    _this2._coords = IR[2];
    _this2._colors = IR[3];
    _this2._figures = IR[4];
    _this2._bounds = IR[5];
    _this2._bbox = IR[7];
    _this2._background = IR[8];
    _this2.matrix = null;
    return _this2;
  }

  _createClass(MeshShadingPattern, [{
    key: "_createMeshCanvas",
    value: function _createMeshCanvas(combinedScale, backgroundColor, cachedCanvases) {
      var EXPECTED_SCALE = 1.1;
      var MAX_PATTERN_SIZE = 3000;
      var BORDER_SIZE = 2;
      var offsetX = Math.floor(this._bounds[0]);
      var offsetY = Math.floor(this._bounds[1]);
      var boundsWidth = Math.ceil(this._bounds[2]) - offsetX;
      var boundsHeight = Math.ceil(this._bounds[3]) - offsetY;
      var width = Math.min(Math.ceil(Math.abs(boundsWidth * combinedScale[0] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
      var height = Math.min(Math.ceil(Math.abs(boundsHeight * combinedScale[1] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
      var scaleX = boundsWidth / width;
      var scaleY = boundsHeight / height;
      var context = {
        coords: this._coords,
        colors: this._colors,
        offsetX: -offsetX,
        offsetY: -offsetY,
        scaleX: 1 / scaleX,
        scaleY: 1 / scaleY
      };
      var paddedWidth = width + BORDER_SIZE * 2;
      var paddedHeight = height + BORDER_SIZE * 2;
      var tmpCanvas = cachedCanvases.getCanvas("mesh", paddedWidth, paddedHeight, false);
      var tmpCtx = tmpCanvas.context;
      var data = tmpCtx.createImageData(width, height);

      if (backgroundColor) {
        var bytes = data.data;

        for (var i = 0, ii = bytes.length; i < ii; i += 4) {
          bytes[i] = backgroundColor[0];
          bytes[i + 1] = backgroundColor[1];
          bytes[i + 2] = backgroundColor[2];
          bytes[i + 3] = 255;
        }
      }

      var _iterator2 = _createForOfIteratorHelper(this._figures),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var figure = _step2.value;
          drawFigure(data, figure, context);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      tmpCtx.putImageData(data, BORDER_SIZE, BORDER_SIZE);
      var canvas = tmpCanvas.canvas;
      return {
        canvas: canvas,
        offsetX: offsetX - BORDER_SIZE * scaleX,
        offsetY: offsetY - BORDER_SIZE * scaleY,
        scaleX: scaleX,
        scaleY: scaleY
      };
    }
  }, {
    key: "getPattern",
    value: function getPattern(ctx, owner, inverse, pathType) {
      applyBoundingBox(ctx, this._bbox);
      var scale;

      if (pathType === PathType.SHADING) {
        scale = _util.Util.singularValueDecompose2dScale(ctx.mozCurrentTransform);
      } else {
        scale = _util.Util.singularValueDecompose2dScale(owner.baseTransform);

        if (this.matrix) {
          var matrixScale = _util.Util.singularValueDecompose2dScale(this.matrix);

          scale = [scale[0] * matrixScale[0], scale[1] * matrixScale[1]];
        }
      }

      var temporaryPatternCanvas = this._createMeshCanvas(scale, pathType === PathType.SHADING ? null : this._background, owner.cachedCanvases);

      if (pathType !== PathType.SHADING) {
        ctx.setTransform.apply(ctx, owner.baseTransform);

        if (this.matrix) {
          ctx.transform.apply(ctx, this.matrix);
        }
      }

      ctx.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
      ctx.scale(temporaryPatternCanvas.scaleX, temporaryPatternCanvas.scaleY);
      return ctx.createPattern(temporaryPatternCanvas.canvas, "no-repeat");
    }
  }]);

  return MeshShadingPattern;
}(BaseShadingPattern);

var DummyShadingPattern = /*#__PURE__*/function (_BaseShadingPattern3) {
  _inherits(DummyShadingPattern, _BaseShadingPattern3);

  var _super3 = _createSuper(DummyShadingPattern);

  function DummyShadingPattern() {
    _classCallCheck(this, DummyShadingPattern);

    return _super3.apply(this, arguments);
  }

  _createClass(DummyShadingPattern, [{
    key: "getPattern",
    value: function getPattern() {
      return "hotpink";
    }
  }]);

  return DummyShadingPattern;
}(BaseShadingPattern);

function getShadingPattern(IR) {
  switch (IR[0]) {
    case "RadialAxial":
      return new RadialAxialShadingPattern(IR);

    case "Mesh":
      return new MeshShadingPattern(IR);

    case "Dummy":
      return new DummyShadingPattern();
  }

  throw new Error("Unknown IR type: ".concat(IR[0]));
}

var PaintType = {
  COLORED: 1,
  UNCOLORED: 2
};

var TilingPattern = /*#__PURE__*/function () {
  function TilingPattern(IR, color, ctx, canvasGraphicsFactory, baseTransform) {
    _classCallCheck(this, TilingPattern);

    this.operatorList = IR[2];
    this.matrix = IR[3] || [1, 0, 0, 1, 0, 0];
    this.bbox = IR[4];
    this.xstep = IR[5];
    this.ystep = IR[6];
    this.paintType = IR[7];
    this.tilingType = IR[8];
    this.color = color;
    this.ctx = ctx;
    this.canvasGraphicsFactory = canvasGraphicsFactory;
    this.baseTransform = baseTransform;
  }

  _createClass(TilingPattern, [{
    key: "createPatternCanvas",
    value: function createPatternCanvas(owner) {
      var operatorList = this.operatorList;
      var bbox = this.bbox;
      var xstep = this.xstep;
      var ystep = this.ystep;
      var paintType = this.paintType;
      var tilingType = this.tilingType;
      var color = this.color;
      var canvasGraphicsFactory = this.canvasGraphicsFactory;
      (0, _util.info)("TilingType: " + tilingType);
      var x0 = bbox[0],
          y0 = bbox[1],
          x1 = bbox[2],
          y1 = bbox[3];

      var matrixScale = _util.Util.singularValueDecompose2dScale(this.matrix);

      var curMatrixScale = _util.Util.singularValueDecompose2dScale(this.baseTransform);

      var combinedScale = [matrixScale[0] * curMatrixScale[0], matrixScale[1] * curMatrixScale[1]];
      var dimx = this.getSizeAndScale(xstep, this.ctx.canvas.width, combinedScale[0]);
      var dimy = this.getSizeAndScale(ystep, this.ctx.canvas.height, combinedScale[1]);
      var tmpCanvas = owner.cachedCanvases.getCanvas("pattern", dimx.size, dimy.size, true);
      var tmpCtx = tmpCanvas.context;
      var graphics = canvasGraphicsFactory.createCanvasGraphics(tmpCtx);
      graphics.groupLevel = owner.groupLevel;
      this.setFillAndStrokeStyleToContext(graphics, paintType, color);
      var adjustedX0 = x0;
      var adjustedY0 = y0;
      var adjustedX1 = x1;
      var adjustedY1 = y1;

      if (x0 < 0) {
        adjustedX0 = 0;
        adjustedX1 += Math.abs(x0);
      }

      if (y0 < 0) {
        adjustedY0 = 0;
        adjustedY1 += Math.abs(y0);
      }

      tmpCtx.translate(-(dimx.scale * adjustedX0), -(dimy.scale * adjustedY0));
      graphics.transform(dimx.scale, 0, 0, dimy.scale, 0, 0);
      this.clipBbox(graphics, adjustedX0, adjustedY0, adjustedX1, adjustedY1);
      graphics.baseTransform = graphics.ctx.mozCurrentTransform.slice();
      graphics.executeOperatorList(operatorList);
      graphics.endDrawing();
      return {
        canvas: tmpCanvas.canvas,
        scaleX: dimx.scale,
        scaleY: dimy.scale,
        offsetX: adjustedX0,
        offsetY: adjustedY0
      };
    }
  }, {
    key: "getSizeAndScale",
    value: function getSizeAndScale(step, realOutputSize, scale) {
      step = Math.abs(step);
      var maxSize = Math.max(TilingPattern.MAX_PATTERN_SIZE, realOutputSize);
      var size = Math.ceil(step * scale);

      if (size >= maxSize) {
        size = maxSize;
      } else {
        scale = size / step;
      }

      return {
        scale: scale,
        size: size
      };
    }
  }, {
    key: "clipBbox",
    value: function clipBbox(graphics, x0, y0, x1, y1) {
      var bboxWidth = x1 - x0;
      var bboxHeight = y1 - y0;
      graphics.ctx.rect(x0, y0, bboxWidth, bboxHeight);
      graphics.clip();
      graphics.endPath();
    }
  }, {
    key: "setFillAndStrokeStyleToContext",
    value: function setFillAndStrokeStyleToContext(graphics, paintType, color) {
      var context = graphics.ctx,
          current = graphics.current;

      switch (paintType) {
        case PaintType.COLORED:
          var ctx = this.ctx;
          context.fillStyle = ctx.fillStyle;
          context.strokeStyle = ctx.strokeStyle;
          current.fillColor = ctx.fillStyle;
          current.strokeColor = ctx.strokeStyle;
          break;

        case PaintType.UNCOLORED:
          var cssColor = _util.Util.makeHexColor(color[0], color[1], color[2]);

          context.fillStyle = cssColor;
          context.strokeStyle = cssColor;
          current.fillColor = cssColor;
          current.strokeColor = cssColor;
          break;

        default:
          throw new _util.FormatError("Unsupported paint type: ".concat(paintType));
      }
    }
  }, {
    key: "getPattern",
    value: function getPattern(ctx, owner, inverse, pathType) {
      var matrix = inverse;

      if (pathType !== PathType.SHADING) {
        matrix = _util.Util.transform(matrix, owner.baseTransform);

        if (this.matrix) {
          matrix = _util.Util.transform(matrix, this.matrix);
        }
      }

      var temporaryPatternCanvas = this.createPatternCanvas(owner);
      var domMatrix = new DOMMatrix(matrix);
      domMatrix = domMatrix.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
      domMatrix = domMatrix.scale(1 / temporaryPatternCanvas.scaleX, 1 / temporaryPatternCanvas.scaleY);
      var pattern = ctx.createPattern(temporaryPatternCanvas.canvas, "repeat");

      try {
        pattern.setTransform(domMatrix);
      } catch (ex) {
        (0, _util.warn)("TilingPattern.getPattern: \"".concat(ex === null || ex === void 0 ? void 0 : ex.message, "\"."));
      }

      return pattern;
    }
  }], [{
    key: "MAX_PATTERN_SIZE",
    get: function get() {
      return (0, _util.shadow)(this, "MAX_PATTERN_SIZE", 3000);
    }
  }]);

  return TilingPattern;
}();

exports.TilingPattern = TilingPattern;