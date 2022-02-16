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
exports.CanvasGraphics = void 0;

var _util = require("../shared/util.js");

var _pattern_helper = require("./pattern_helper.js");

var _display_utils = require("./display_utils.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MIN_FONT_SIZE = 16;
var MAX_FONT_SIZE = 100;
var MAX_GROUP_SIZE = 4096;
var EXECUTION_TIME = 15;
var EXECUTION_STEPS = 10;
var COMPILE_TYPE3_GLYPHS = true;
var MAX_SIZE_TO_COMPILE = 1000;
var FULL_CHUNK_HEIGHT = 16;
var LINEWIDTH_SCALE_FACTOR = 1.000001;

function mirrorContextOperations(ctx, destCtx) {
  if (ctx._removeMirroring) {
    throw new Error("Context is already forwarding operations.");
  }

  ctx.__originalSave = ctx.save;
  ctx.__originalRestore = ctx.restore;
  ctx.__originalRotate = ctx.rotate;
  ctx.__originalScale = ctx.scale;
  ctx.__originalTranslate = ctx.translate;
  ctx.__originalTransform = ctx.transform;
  ctx.__originalSetTransform = ctx.setTransform;
  ctx.__originalResetTransform = ctx.resetTransform;
  ctx.__originalClip = ctx.clip;
  ctx.__originalMoveTo = ctx.moveTo;
  ctx.__originalLineTo = ctx.lineTo;
  ctx.__originalBezierCurveTo = ctx.bezierCurveTo;
  ctx.__originalRect = ctx.rect;
  ctx.__originalClosePath = ctx.closePath;
  ctx.__originalBeginPath = ctx.beginPath;

  ctx._removeMirroring = function () {
    ctx.save = ctx.__originalSave;
    ctx.restore = ctx.__originalRestore;
    ctx.rotate = ctx.__originalRotate;
    ctx.scale = ctx.__originalScale;
    ctx.translate = ctx.__originalTranslate;
    ctx.transform = ctx.__originalTransform;
    ctx.setTransform = ctx.__originalSetTransform;
    ctx.resetTransform = ctx.__originalResetTransform;
    ctx.clip = ctx.__originalClip;
    ctx.moveTo = ctx.__originalMoveTo;
    ctx.lineTo = ctx.__originalLineTo;
    ctx.bezierCurveTo = ctx.__originalBezierCurveTo;
    ctx.rect = ctx.__originalRect;
    ctx.closePath = ctx.__originalClosePath;
    ctx.beginPath = ctx.__originalBeginPath;
    delete ctx._removeMirroring;
  };

  ctx.save = function ctxSave() {
    destCtx.save();

    this.__originalSave();
  };

  ctx.restore = function ctxRestore() {
    destCtx.restore();

    this.__originalRestore();
  };

  ctx.translate = function ctxTranslate(x, y) {
    destCtx.translate(x, y);

    this.__originalTranslate(x, y);
  };

  ctx.scale = function ctxScale(x, y) {
    destCtx.scale(x, y);

    this.__originalScale(x, y);
  };

  ctx.transform = function ctxTransform(a, b, c, d, e, f) {
    destCtx.transform(a, b, c, d, e, f);

    this.__originalTransform(a, b, c, d, e, f);
  };

  ctx.setTransform = function ctxSetTransform(a, b, c, d, e, f) {
    destCtx.setTransform(a, b, c, d, e, f);

    this.__originalSetTransform(a, b, c, d, e, f);
  };

  ctx.resetTransform = function ctxResetTransform() {
    destCtx.resetTransform();

    this.__originalResetTransform();
  };

  ctx.rotate = function ctxRotate(angle) {
    destCtx.rotate(angle);

    this.__originalRotate(angle);
  };

  ctx.clip = function ctxRotate(rule) {
    destCtx.clip(rule);

    this.__originalClip(rule);
  };

  ctx.moveTo = function (x, y) {
    destCtx.moveTo(x, y);

    this.__originalMoveTo(x, y);
  };

  ctx.lineTo = function (x, y) {
    destCtx.lineTo(x, y);

    this.__originalLineTo(x, y);
  };

  ctx.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
    destCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

    this.__originalBezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  };

  ctx.rect = function (x, y, width, height) {
    destCtx.rect(x, y, width, height);

    this.__originalRect(x, y, width, height);
  };

  ctx.closePath = function () {
    destCtx.closePath();

    this.__originalClosePath();
  };

  ctx.beginPath = function () {
    destCtx.beginPath();

    this.__originalBeginPath();
  };
}

function addContextCurrentTransform(ctx) {
  if (ctx.mozCurrentTransform) {
    return;
  }

  ctx._originalSave = ctx.save;
  ctx._originalRestore = ctx.restore;
  ctx._originalRotate = ctx.rotate;
  ctx._originalScale = ctx.scale;
  ctx._originalTranslate = ctx.translate;
  ctx._originalTransform = ctx.transform;
  ctx._originalSetTransform = ctx.setTransform;
  ctx._originalResetTransform = ctx.resetTransform;
  ctx._transformMatrix = ctx._transformMatrix || [1, 0, 0, 1, 0, 0];
  ctx._transformStack = [];

  try {
    var desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ctx), "lineWidth");
    ctx._setLineWidth = desc.set;
    ctx._getLineWidth = desc.get;
    Object.defineProperty(ctx, "lineWidth", {
      set: function setLineWidth(width) {
        this._setLineWidth(width * LINEWIDTH_SCALE_FACTOR);
      },
      get: function getLineWidth() {
        return this._getLineWidth();
      }
    });
  } catch (_) {}

  Object.defineProperty(ctx, "mozCurrentTransform", {
    get: function getCurrentTransform() {
      return this._transformMatrix;
    }
  });
  Object.defineProperty(ctx, "mozCurrentTransformInverse", {
    get: function getCurrentTransformInverse() {
      var _this$_transformMatri = _slicedToArray(this._transformMatrix, 6),
          a = _this$_transformMatri[0],
          b = _this$_transformMatri[1],
          c = _this$_transformMatri[2],
          d = _this$_transformMatri[3],
          e = _this$_transformMatri[4],
          f = _this$_transformMatri[5];

      var ad_bc = a * d - b * c;
      var bc_ad = b * c - a * d;
      return [d / ad_bc, b / bc_ad, c / bc_ad, a / ad_bc, (d * e - c * f) / bc_ad, (b * e - a * f) / ad_bc];
    }
  });

  ctx.save = function ctxSave() {
    var old = this._transformMatrix;

    this._transformStack.push(old);

    this._transformMatrix = old.slice(0, 6);

    this._originalSave();
  };

  ctx.restore = function ctxRestore() {
    var prev = this._transformStack.pop();

    if (prev) {
      this._transformMatrix = prev;

      this._originalRestore();
    }
  };

  ctx.translate = function ctxTranslate(x, y) {
    var m = this._transformMatrix;
    m[4] = m[0] * x + m[2] * y + m[4];
    m[5] = m[1] * x + m[3] * y + m[5];

    this._originalTranslate(x, y);
  };

  ctx.scale = function ctxScale(x, y) {
    var m = this._transformMatrix;
    m[0] *= x;
    m[1] *= x;
    m[2] *= y;
    m[3] *= y;

    this._originalScale(x, y);
  };

  ctx.transform = function ctxTransform(a, b, c, d, e, f) {
    var m = this._transformMatrix;
    this._transformMatrix = [m[0] * a + m[2] * b, m[1] * a + m[3] * b, m[0] * c + m[2] * d, m[1] * c + m[3] * d, m[0] * e + m[2] * f + m[4], m[1] * e + m[3] * f + m[5]];

    ctx._originalTransform(a, b, c, d, e, f);
  };

  ctx.setTransform = function ctxSetTransform(a, b, c, d, e, f) {
    this._transformMatrix = [a, b, c, d, e, f];

    ctx._originalSetTransform(a, b, c, d, e, f);
  };

  ctx.resetTransform = function ctxResetTransform() {
    this._transformMatrix = [1, 0, 0, 1, 0, 0];

    ctx._originalResetTransform();
  };

  ctx.rotate = function ctxRotate(angle) {
    var cosValue = Math.cos(angle);
    var sinValue = Math.sin(angle);
    var m = this._transformMatrix;
    this._transformMatrix = [m[0] * cosValue + m[2] * sinValue, m[1] * cosValue + m[3] * sinValue, m[0] * -sinValue + m[2] * cosValue, m[1] * -sinValue + m[3] * cosValue, m[4], m[5]];

    this._originalRotate(angle);
  };
}

var CachedCanvases = /*#__PURE__*/function () {
  function CachedCanvases(canvasFactory) {
    _classCallCheck(this, CachedCanvases);

    this.canvasFactory = canvasFactory;
    this.cache = Object.create(null);
  }

  _createClass(CachedCanvases, [{
    key: "getCanvas",
    value: function getCanvas(id, width, height, trackTransform) {
      var canvasEntry;

      if (this.cache[id] !== undefined) {
        canvasEntry = this.cache[id];
        this.canvasFactory.reset(canvasEntry, width, height);
        canvasEntry.context.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        canvasEntry = this.canvasFactory.create(width, height);
        this.cache[id] = canvasEntry;
      }

      if (trackTransform) {
        addContextCurrentTransform(canvasEntry.context);
      }

      return canvasEntry;
    }
  }, {
    key: "clear",
    value: function clear() {
      for (var id in this.cache) {
        var canvasEntry = this.cache[id];
        this.canvasFactory.destroy(canvasEntry);
        delete this.cache[id];
      }
    }
  }]);

  return CachedCanvases;
}();

function compileType3Glyph(imgData) {
  var POINT_TO_PROCESS_LIMIT = 1000;
  var POINT_TYPES = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]);
  var width = imgData.width,
      height = imgData.height,
      width1 = width + 1;
  var i, ii, j, j0;
  var points = new Uint8Array(width1 * (height + 1));
  var lineSize = width + 7 & ~7,
      data0 = imgData.data;
  var data = new Uint8Array(lineSize * height);
  var pos = 0;

  for (i = 0, ii = data0.length; i < ii; i++) {
    var elem = data0[i];
    var mask = 128;

    while (mask > 0) {
      data[pos++] = elem & mask ? 0 : 255;
      mask >>= 1;
    }
  }

  var count = 0;
  pos = 0;

  if (data[pos] !== 0) {
    points[0] = 1;
    ++count;
  }

  for (j = 1; j < width; j++) {
    if (data[pos] !== data[pos + 1]) {
      points[j] = data[pos] ? 2 : 1;
      ++count;
    }

    pos++;
  }

  if (data[pos] !== 0) {
    points[j] = 2;
    ++count;
  }

  for (i = 1; i < height; i++) {
    pos = i * lineSize;
    j0 = i * width1;

    if (data[pos - lineSize] !== data[pos]) {
      points[j0] = data[pos] ? 1 : 8;
      ++count;
    }

    var sum = (data[pos] ? 4 : 0) + (data[pos - lineSize] ? 8 : 0);

    for (j = 1; j < width; j++) {
      sum = (sum >> 2) + (data[pos + 1] ? 4 : 0) + (data[pos - lineSize + 1] ? 8 : 0);

      if (POINT_TYPES[sum]) {
        points[j0 + j] = POINT_TYPES[sum];
        ++count;
      }

      pos++;
    }

    if (data[pos - lineSize] !== data[pos]) {
      points[j0 + j] = data[pos] ? 2 : 4;
      ++count;
    }

    if (count > POINT_TO_PROCESS_LIMIT) {
      return null;
    }
  }

  pos = lineSize * (height - 1);
  j0 = i * width1;

  if (data[pos] !== 0) {
    points[j0] = 8;
    ++count;
  }

  for (j = 1; j < width; j++) {
    if (data[pos] !== data[pos + 1]) {
      points[j0 + j] = data[pos] ? 4 : 8;
      ++count;
    }

    pos++;
  }

  if (data[pos] !== 0) {
    points[j0 + j] = 4;
    ++count;
  }

  if (count > POINT_TO_PROCESS_LIMIT) {
    return null;
  }

  var steps = new Int32Array([0, width1, -1, 0, -width1, 0, 0, 0, 1]);
  var outlines = [];

  for (i = 0; count && i <= height; i++) {
    var p = i * width1;
    var end = p + width;

    while (p < end && !points[p]) {
      p++;
    }

    if (p === end) {
      continue;
    }

    var coords = [p % width1, i];
    var p0 = p;
    var type = points[p];

    do {
      var step = steps[type];

      do {
        p += step;
      } while (!points[p]);

      var pp = points[p];

      if (pp !== 5 && pp !== 10) {
        type = pp;
        points[p] = 0;
      } else {
        type = pp & 0x33 * type >> 4;
        points[p] &= type >> 2 | type << 2;
      }

      coords.push(p % width1, p / width1 | 0);

      if (!points[p]) {
        --count;
      }
    } while (p0 !== p);

    outlines.push(coords);
    --i;
  }

  var drawOutline = function drawOutline(c) {
    c.save();
    c.scale(1 / width, -1 / height);
    c.translate(0, -height);
    c.beginPath();

    for (var k = 0, kk = outlines.length; k < kk; k++) {
      var o = outlines[k];
      c.moveTo(o[0], o[1]);

      for (var l = 2, ll = o.length; l < ll; l += 2) {
        c.lineTo(o[l], o[l + 1]);
      }
    }

    c.fill();
    c.beginPath();
    c.restore();
  };

  return drawOutline;
}

var CanvasExtraState = /*#__PURE__*/function () {
  function CanvasExtraState(width, height) {
    _classCallCheck(this, CanvasExtraState);

    this.alphaIsShape = false;
    this.fontSize = 0;
    this.fontSizeScale = 1;
    this.textMatrix = _util.IDENTITY_MATRIX;
    this.textMatrixScale = 1;
    this.fontMatrix = _util.FONT_IDENTITY_MATRIX;
    this.leading = 0;
    this.x = 0;
    this.y = 0;
    this.lineX = 0;
    this.lineY = 0;
    this.charSpacing = 0;
    this.wordSpacing = 0;
    this.textHScale = 1;
    this.textRenderingMode = _util.TextRenderingMode.FILL;
    this.textRise = 0;
    this.fillColor = "#000000";
    this.strokeColor = "#000000";
    this.patternFill = false;
    this.fillAlpha = 1;
    this.strokeAlpha = 1;
    this.lineWidth = 1;
    this.activeSMask = null;
    this.transferMaps = null;
    this.startNewPathAndClipBox([0, 0, width, height]);
  }

  _createClass(CanvasExtraState, [{
    key: "clone",
    value: function clone() {
      var clone = Object.create(this);
      clone.clipBox = this.clipBox.slice();
      return clone;
    }
  }, {
    key: "setCurrentPoint",
    value: function setCurrentPoint(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "updatePathMinMax",
    value: function updatePathMinMax(transform, x, y) {
      var _Util$applyTransform = _util.Util.applyTransform([x, y], transform);

      var _Util$applyTransform2 = _slicedToArray(_Util$applyTransform, 2);

      x = _Util$applyTransform2[0];
      y = _Util$applyTransform2[1];
      this.minX = Math.min(this.minX, x);
      this.minY = Math.min(this.minY, y);
      this.maxX = Math.max(this.maxX, x);
      this.maxY = Math.max(this.maxY, y);
    }
  }, {
    key: "updateCurvePathMinMax",
    value: function updateCurvePathMinMax(transform, x0, y0, x1, y1, x2, y2, x3, y3) {
      var box = _util.Util.bezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3);

      this.updatePathMinMax(transform, box[0], box[1]);
      this.updatePathMinMax(transform, box[2], box[3]);
    }
  }, {
    key: "getPathBoundingBox",
    value: function getPathBoundingBox() {
      var pathType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _pattern_helper.PathType.FILL;
      var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var box = [this.minX, this.minY, this.maxX, this.maxY];

      if (pathType === _pattern_helper.PathType.STROKE) {
        if (!transform) {
          (0, _util.unreachable)("Stroke bounding box must include transform.");
        }

        var scale = _util.Util.singularValueDecompose2dScale(transform);

        var xStrokePad = scale[0] * this.lineWidth / 2;
        var yStrokePad = scale[1] * this.lineWidth / 2;
        box[0] -= xStrokePad;
        box[1] -= yStrokePad;
        box[2] += xStrokePad;
        box[3] += yStrokePad;
      }

      return box;
    }
  }, {
    key: "updateClipFromPath",
    value: function updateClipFromPath() {
      var intersect = _util.Util.intersect(this.clipBox, this.getPathBoundingBox());

      this.startNewPathAndClipBox(intersect || [0, 0, 0, 0]);
    }
  }, {
    key: "startNewPathAndClipBox",
    value: function startNewPathAndClipBox(box) {
      this.clipBox = box;
      this.minX = Infinity;
      this.minY = Infinity;
      this.maxX = 0;
      this.maxY = 0;
    }
  }, {
    key: "getClippedPathBoundingBox",
    value: function getClippedPathBoundingBox() {
      var pathType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _pattern_helper.PathType.FILL;
      var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return _util.Util.intersect(this.clipBox, this.getPathBoundingBox(pathType, transform));
    }
  }]);

  return CanvasExtraState;
}();

function putBinaryImageData(ctx, imgData) {
  var transferMaps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (typeof ImageData !== "undefined" && imgData instanceof ImageData) {
    ctx.putImageData(imgData, 0, 0);
    return;
  }

  var height = imgData.height,
      width = imgData.width;
  var partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  var fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
  var totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  var chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
  var srcPos = 0,
      destPos;
  var src = imgData.data;
  var dest = chunkImgData.data;
  var i, j, thisChunkHeight, elemsInThisChunk;
  var transferMapRed, transferMapGreen, transferMapBlue, transferMapGray;

  if (transferMaps) {
    switch (transferMaps.length) {
      case 1:
        transferMapRed = transferMaps[0];
        transferMapGreen = transferMaps[0];
        transferMapBlue = transferMaps[0];
        transferMapGray = transferMaps[0];
        break;

      case 4:
        transferMapRed = transferMaps[0];
        transferMapGreen = transferMaps[1];
        transferMapBlue = transferMaps[2];
        transferMapGray = transferMaps[3];
        break;
    }
  }

  if (imgData.kind === _util.ImageKind.GRAYSCALE_1BPP) {
    var srcLength = src.byteLength;
    var dest32 = new Uint32Array(dest.buffer, 0, dest.byteLength >> 2);
    var dest32DataLength = dest32.length;
    var fullSrcDiff = width + 7 >> 3;
    var white = 0xffffffff;
    var black = _util.IsLittleEndianCached.value ? 0xff000000 : 0x000000ff;

    if (transferMapGray) {
      if (transferMapGray[0] === 0xff && transferMapGray[0xff] === 0) {
        var _ref = [black, white];
        white = _ref[0];
        black = _ref[1];
      }
    }

    for (i = 0; i < totalChunks; i++) {
      thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
      destPos = 0;

      for (j = 0; j < thisChunkHeight; j++) {
        var srcDiff = srcLength - srcPos;
        var k = 0;
        var kEnd = srcDiff > fullSrcDiff ? width : srcDiff * 8 - 7;
        var kEndUnrolled = kEnd & ~7;
        var mask = 0;
        var srcByte = 0;

        for (; k < kEndUnrolled; k += 8) {
          srcByte = src[srcPos++];
          dest32[destPos++] = srcByte & 128 ? white : black;
          dest32[destPos++] = srcByte & 64 ? white : black;
          dest32[destPos++] = srcByte & 32 ? white : black;
          dest32[destPos++] = srcByte & 16 ? white : black;
          dest32[destPos++] = srcByte & 8 ? white : black;
          dest32[destPos++] = srcByte & 4 ? white : black;
          dest32[destPos++] = srcByte & 2 ? white : black;
          dest32[destPos++] = srcByte & 1 ? white : black;
        }

        for (; k < kEnd; k++) {
          if (mask === 0) {
            srcByte = src[srcPos++];
            mask = 128;
          }

          dest32[destPos++] = srcByte & mask ? white : black;
          mask >>= 1;
        }
      }

      while (destPos < dest32DataLength) {
        dest32[destPos++] = 0;
      }

      ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
    }
  } else if (imgData.kind === _util.ImageKind.RGBA_32BPP) {
    var hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);
    j = 0;
    elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;

    for (i = 0; i < fullChunks; i++) {
      dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
      srcPos += elemsInThisChunk;

      if (hasTransferMaps) {
        for (var _k = 0; _k < elemsInThisChunk; _k += 4) {
          if (transferMapRed) {
            dest[_k + 0] = transferMapRed[dest[_k + 0]];
          }

          if (transferMapGreen) {
            dest[_k + 1] = transferMapGreen[dest[_k + 1]];
          }

          if (transferMapBlue) {
            dest[_k + 2] = transferMapBlue[dest[_k + 2]];
          }
        }
      }

      ctx.putImageData(chunkImgData, 0, j);
      j += FULL_CHUNK_HEIGHT;
    }

    if (i < totalChunks) {
      elemsInThisChunk = width * partialChunkHeight * 4;
      dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));

      if (hasTransferMaps) {
        for (var _k2 = 0; _k2 < elemsInThisChunk; _k2 += 4) {
          if (transferMapRed) {
            dest[_k2 + 0] = transferMapRed[dest[_k2 + 0]];
          }

          if (transferMapGreen) {
            dest[_k2 + 1] = transferMapGreen[dest[_k2 + 1]];
          }

          if (transferMapBlue) {
            dest[_k2 + 2] = transferMapBlue[dest[_k2 + 2]];
          }
        }
      }

      ctx.putImageData(chunkImgData, 0, j);
    }
  } else if (imgData.kind === _util.ImageKind.RGB_24BPP) {
    var _hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);

    thisChunkHeight = FULL_CHUNK_HEIGHT;
    elemsInThisChunk = width * thisChunkHeight;

    for (i = 0; i < totalChunks; i++) {
      if (i >= fullChunks) {
        thisChunkHeight = partialChunkHeight;
        elemsInThisChunk = width * thisChunkHeight;
      }

      destPos = 0;

      for (j = elemsInThisChunk; j--;) {
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = 255;
      }

      if (_hasTransferMaps) {
        for (var _k3 = 0; _k3 < destPos; _k3 += 4) {
          if (transferMapRed) {
            dest[_k3 + 0] = transferMapRed[dest[_k3 + 0]];
          }

          if (transferMapGreen) {
            dest[_k3 + 1] = transferMapGreen[dest[_k3 + 1]];
          }

          if (transferMapBlue) {
            dest[_k3 + 2] = transferMapBlue[dest[_k3 + 2]];
          }
        }
      }

      ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
    }
  } else {
    throw new Error("bad image kind: ".concat(imgData.kind));
  }
}

function putBinaryImageMask(ctx, imgData) {
  var height = imgData.height,
      width = imgData.width;
  var partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  var fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
  var totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  var chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
  var srcPos = 0;
  var src = imgData.data;
  var dest = chunkImgData.data;

  for (var i = 0; i < totalChunks; i++) {
    var thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
    var destPos = 3;

    for (var j = 0; j < thisChunkHeight; j++) {
      var elem = void 0,
          mask = 0;

      for (var k = 0; k < width; k++) {
        if (!mask) {
          elem = src[srcPos++];
          mask = 128;
        }

        dest[destPos] = elem & mask ? 0 : 255;
        destPos += 4;
        mask >>= 1;
      }
    }

    ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
  }
}

function copyCtxState(sourceCtx, destCtx) {
  var properties = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font"];

  for (var i = 0, ii = properties.length; i < ii; i++) {
    var property = properties[i];

    if (sourceCtx[property] !== undefined) {
      destCtx[property] = sourceCtx[property];
    }
  }

  if (sourceCtx.setLineDash !== undefined) {
    destCtx.setLineDash(sourceCtx.getLineDash());
    destCtx.lineDashOffset = sourceCtx.lineDashOffset;
  }
}

function resetCtxToDefault(ctx) {
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  ctx.fillRule = "nonzero";
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1;
  ctx.lineCap = "butt";
  ctx.lineJoin = "miter";
  ctx.miterLimit = 10;
  ctx.globalCompositeOperation = "source-over";
  ctx.font = "10px sans-serif";

  if (ctx.setLineDash !== undefined) {
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
  }
}

function composeSMaskBackdrop(bytes, r0, g0, b0) {
  var length = bytes.length;

  for (var i = 3; i < length; i += 4) {
    var alpha = bytes[i];

    if (alpha === 0) {
      bytes[i - 3] = r0;
      bytes[i - 2] = g0;
      bytes[i - 1] = b0;
    } else if (alpha < 255) {
      var alpha_ = 255 - alpha;
      bytes[i - 3] = bytes[i - 3] * alpha + r0 * alpha_ >> 8;
      bytes[i - 2] = bytes[i - 2] * alpha + g0 * alpha_ >> 8;
      bytes[i - 1] = bytes[i - 1] * alpha + b0 * alpha_ >> 8;
    }
  }
}

function composeSMaskAlpha(maskData, layerData, transferMap) {
  var length = maskData.length;
  var scale = 1 / 255;

  for (var i = 3; i < length; i += 4) {
    var alpha = transferMap ? transferMap[maskData[i]] : maskData[i];
    layerData[i] = layerData[i] * alpha * scale | 0;
  }
}

function composeSMaskLuminosity(maskData, layerData, transferMap) {
  var length = maskData.length;

  for (var i = 3; i < length; i += 4) {
    var y = maskData[i - 3] * 77 + maskData[i - 2] * 152 + maskData[i - 1] * 28;
    layerData[i] = transferMap ? layerData[i] * transferMap[y >> 8] >> 8 : layerData[i] * y >> 16;
  }
}

function genericComposeSMask(maskCtx, layerCtx, width, height, subtype, backdrop, transferMap, layerOffsetX, layerOffsetY, maskOffsetX, maskOffsetY) {
  var hasBackdrop = !!backdrop;
  var r0 = hasBackdrop ? backdrop[0] : 0;
  var g0 = hasBackdrop ? backdrop[1] : 0;
  var b0 = hasBackdrop ? backdrop[2] : 0;
  var composeFn;

  if (subtype === "Luminosity") {
    composeFn = composeSMaskLuminosity;
  } else {
    composeFn = composeSMaskAlpha;
  }

  var PIXELS_TO_PROCESS = 1048576;
  var chunkSize = Math.min(height, Math.ceil(PIXELS_TO_PROCESS / width));

  for (var row = 0; row < height; row += chunkSize) {
    var chunkHeight = Math.min(chunkSize, height - row);
    var maskData = maskCtx.getImageData(layerOffsetX - maskOffsetX, row + (layerOffsetY - maskOffsetY), width, chunkHeight);
    var layerData = layerCtx.getImageData(layerOffsetX, row + layerOffsetY, width, chunkHeight);

    if (hasBackdrop) {
      composeSMaskBackdrop(maskData.data, r0, g0, b0);
    }

    composeFn(maskData.data, layerData.data, transferMap);
    layerCtx.putImageData(layerData, layerOffsetX, row + layerOffsetY);
  }
}

function composeSMask(ctx, smask, layerCtx, layerBox) {
  var layerOffsetX = layerBox[0];
  var layerOffsetY = layerBox[1];
  var layerWidth = layerBox[2] - layerOffsetX;
  var layerHeight = layerBox[3] - layerOffsetY;

  if (layerWidth === 0 || layerHeight === 0) {
    return;
  }

  genericComposeSMask(smask.context, layerCtx, layerWidth, layerHeight, smask.subtype, smask.backdrop, smask.transferMap, layerOffsetX, layerOffsetY, smask.offsetX, smask.offsetY);
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(layerCtx.canvas, 0, 0);
  ctx.restore();
}

function getImageSmoothingEnabled(transform, interpolate) {
  var scale = _util.Util.singularValueDecompose2dScale(transform);

  scale[0] = Math.fround(scale[0]);
  scale[1] = Math.fround(scale[1]);
  var actualScale = Math.fround((globalThis.devicePixelRatio || 1) * _display_utils.PixelsPerInch.PDF_TO_CSS_UNITS);

  if (interpolate !== undefined) {
    return interpolate;
  } else if (scale[0] <= actualScale || scale[1] <= actualScale) {
    return true;
  }

  return false;
}

var LINE_CAP_STYLES = ["butt", "round", "square"];
var LINE_JOIN_STYLES = ["miter", "round", "bevel"];
var NORMAL_CLIP = {};
var EO_CLIP = {};

var CanvasGraphics = /*#__PURE__*/function () {
  function CanvasGraphics(canvasCtx, commonObjs, objs, canvasFactory, imageLayer, optionalContentConfig, annotationCanvasMap) {
    _classCallCheck(this, CanvasGraphics);

    this.ctx = canvasCtx;
    this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height);
    this.stateStack = [];
    this.pendingClip = null;
    this.pendingEOFill = false;
    this.res = null;
    this.xobjs = null;
    this.commonObjs = commonObjs;
    this.objs = objs;
    this.canvasFactory = canvasFactory;
    this.imageLayer = imageLayer;
    this.groupStack = [];
    this.processingType3 = null;
    this.baseTransform = null;
    this.baseTransformStack = [];
    this.groupLevel = 0;
    this.smaskStack = [];
    this.smaskCounter = 0;
    this.tempSMask = null;
    this.suspendedCtx = null;
    this.contentVisible = true;
    this.markedContentStack = [];
    this.optionalContentConfig = optionalContentConfig;
    this.cachedCanvases = new CachedCanvases(this.canvasFactory);
    this.cachedPatterns = new Map();
    this.annotationCanvasMap = annotationCanvasMap;
    this.viewportScale = 1;
    this.outputScaleX = 1;
    this.outputScaleY = 1;

    if (canvasCtx) {
      addContextCurrentTransform(canvasCtx);
    }

    this._cachedGetSinglePixelWidth = null;
  }

  _createClass(CanvasGraphics, [{
    key: "beginDrawing",
    value: function beginDrawing(_ref2) {
      var transform = _ref2.transform,
          viewport = _ref2.viewport,
          _ref2$transparency = _ref2.transparency,
          transparency = _ref2$transparency === void 0 ? false : _ref2$transparency,
          _ref2$background = _ref2.background,
          background = _ref2$background === void 0 ? null : _ref2$background;
      var width = this.ctx.canvas.width;
      var height = this.ctx.canvas.height;
      this.ctx.save();
      this.ctx.fillStyle = background || "rgb(255, 255, 255)";
      this.ctx.fillRect(0, 0, width, height);
      this.ctx.restore();

      if (transparency) {
        var transparentCanvas = this.cachedCanvases.getCanvas("transparent", width, height, true);
        this.compositeCtx = this.ctx;
        this.transparentCanvas = transparentCanvas.canvas;
        this.ctx = transparentCanvas.context;
        this.ctx.save();
        this.ctx.transform.apply(this.ctx, this.compositeCtx.mozCurrentTransform);
      }

      this.ctx.save();
      resetCtxToDefault(this.ctx);

      if (transform) {
        this.ctx.transform.apply(this.ctx, transform);
        this.outputScaleX = transform[0];
        this.outputScaleY = transform[0];
      }

      this.ctx.transform.apply(this.ctx, viewport.transform);
      this.viewportScale = viewport.scale;
      this.baseTransform = this.ctx.mozCurrentTransform.slice();
      this._combinedScaleFactor = Math.hypot(this.baseTransform[0], this.baseTransform[2]);

      if (this.imageLayer) {
        this.imageLayer.beginLayout();
      }
    }
  }, {
    key: "executeOperatorList",
    value: function executeOperatorList(operatorList, executionStartIdx, continueCallback, stepper) {
      var argsArray = operatorList.argsArray;
      var fnArray = operatorList.fnArray;
      var i = executionStartIdx || 0;
      var argsArrayLen = argsArray.length;

      if (argsArrayLen === i) {
        return i;
      }

      var chunkOperations = argsArrayLen - i > EXECUTION_STEPS && typeof continueCallback === "function";
      var endTime = chunkOperations ? Date.now() + EXECUTION_TIME : 0;
      var steps = 0;
      var commonObjs = this.commonObjs;
      var objs = this.objs;
      var fnId;

      while (true) {
        if (stepper !== undefined && i === stepper.nextBreakPoint) {
          stepper.breakIt(i, continueCallback);
          return i;
        }

        fnId = fnArray[i];

        if (fnId !== _util.OPS.dependency) {
          this[fnId].apply(this, argsArray[i]);
        } else {
          var _iterator = _createForOfIteratorHelper(argsArray[i]),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var depObjId = _step.value;
              var objsPool = depObjId.startsWith("g_") ? commonObjs : objs;

              if (!objsPool.has(depObjId)) {
                objsPool.get(depObjId, continueCallback);
                return i;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        i++;

        if (i === argsArrayLen) {
          return i;
        }

        if (chunkOperations && ++steps > EXECUTION_STEPS) {
          if (Date.now() > endTime) {
            continueCallback();
            return i;
          }

          steps = 0;
        }
      }
    }
  }, {
    key: "endDrawing",
    value: function endDrawing() {
      while (this.stateStack.length || this.current.activeSMask !== null) {
        this.restore();
      }

      this.ctx.restore();

      if (this.transparentCanvas) {
        this.ctx = this.compositeCtx;
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.drawImage(this.transparentCanvas, 0, 0);
        this.ctx.restore();
        this.transparentCanvas = null;
      }

      this.cachedCanvases.clear();
      this.cachedPatterns.clear();

      if (this.imageLayer) {
        this.imageLayer.endLayout();
      }
    }
  }, {
    key: "_scaleImage",
    value: function _scaleImage(img, inverseTransform) {
      var width = img.width;
      var height = img.height;
      var widthScale = Math.max(Math.hypot(inverseTransform[0], inverseTransform[1]), 1);
      var heightScale = Math.max(Math.hypot(inverseTransform[2], inverseTransform[3]), 1);
      var paintWidth = width,
          paintHeight = height;
      var tmpCanvasId = "prescale1";
      var tmpCanvas, tmpCtx;

      while (widthScale > 2 && paintWidth > 1 || heightScale > 2 && paintHeight > 1) {
        var newWidth = paintWidth,
            newHeight = paintHeight;

        if (widthScale > 2 && paintWidth > 1) {
          newWidth = Math.ceil(paintWidth / 2);
          widthScale /= paintWidth / newWidth;
        }

        if (heightScale > 2 && paintHeight > 1) {
          newHeight = Math.ceil(paintHeight / 2);
          heightScale /= paintHeight / newHeight;
        }

        tmpCanvas = this.cachedCanvases.getCanvas(tmpCanvasId, newWidth, newHeight);
        tmpCtx = tmpCanvas.context;
        tmpCtx.clearRect(0, 0, newWidth, newHeight);
        tmpCtx.drawImage(img, 0, 0, paintWidth, paintHeight, 0, 0, newWidth, newHeight);
        img = tmpCanvas.canvas;
        paintWidth = newWidth;
        paintHeight = newHeight;
        tmpCanvasId = tmpCanvasId === "prescale1" ? "prescale2" : "prescale1";
      }

      return {
        img: img,
        paintWidth: paintWidth,
        paintHeight: paintHeight
      };
    }
  }, {
    key: "_createMaskCanvas",
    value: function _createMaskCanvas(img) {
      var ctx = this.ctx;
      var width = img.width,
          height = img.height;
      var fillColor = this.current.fillColor;
      var isPatternFill = this.current.patternFill;
      var maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
      var maskCtx = maskCanvas.context;
      putBinaryImageMask(maskCtx, img);
      var objToCanvas = ctx.mozCurrentTransform;

      var maskToCanvas = _util.Util.transform(objToCanvas, [1 / width, 0, 0, -1 / height, 0, 0]);

      maskToCanvas = _util.Util.transform(maskToCanvas, [1, 0, 0, 1, 0, -height]);

      var cord1 = _util.Util.applyTransform([0, 0], maskToCanvas);

      var cord2 = _util.Util.applyTransform([width, height], maskToCanvas);

      var rect = _util.Util.normalizeRect([cord1[0], cord1[1], cord2[0], cord2[1]]);

      var drawnWidth = Math.ceil(rect[2] - rect[0]);
      var drawnHeight = Math.ceil(rect[3] - rect[1]);
      var fillCanvas = this.cachedCanvases.getCanvas("fillCanvas", drawnWidth, drawnHeight, true);
      var fillCtx = fillCanvas.context;
      var offsetX = Math.min(cord1[0], cord2[0]);
      var offsetY = Math.min(cord1[1], cord2[1]);
      fillCtx.translate(-offsetX, -offsetY);
      fillCtx.transform.apply(fillCtx, maskToCanvas);

      var scaled = this._scaleImage(maskCanvas.canvas, fillCtx.mozCurrentTransformInverse);

      fillCtx.imageSmoothingEnabled = getImageSmoothingEnabled(fillCtx.mozCurrentTransform, img.interpolate);
      fillCtx.drawImage(scaled.img, 0, 0, scaled.img.width, scaled.img.height, 0, 0, width, height);
      fillCtx.globalCompositeOperation = "source-in";

      var inverse = _util.Util.transform(fillCtx.mozCurrentTransformInverse, [1, 0, 0, 1, -offsetX, -offsetY]);

      fillCtx.fillStyle = isPatternFill ? fillColor.getPattern(ctx, this, inverse, _pattern_helper.PathType.FILL) : fillColor;
      fillCtx.fillRect(0, 0, width, height);
      return {
        canvas: fillCanvas.canvas,
        offsetX: Math.round(offsetX),
        offsetY: Math.round(offsetY)
      };
    }
  }, {
    key: "setLineWidth",
    value: function setLineWidth(width) {
      this.current.lineWidth = width;
      this.ctx.lineWidth = width;
    }
  }, {
    key: "setLineCap",
    value: function setLineCap(style) {
      this.ctx.lineCap = LINE_CAP_STYLES[style];
    }
  }, {
    key: "setLineJoin",
    value: function setLineJoin(style) {
      this.ctx.lineJoin = LINE_JOIN_STYLES[style];
    }
  }, {
    key: "setMiterLimit",
    value: function setMiterLimit(limit) {
      this.ctx.miterLimit = limit;
    }
  }, {
    key: "setDash",
    value: function setDash(dashArray, dashPhase) {
      var ctx = this.ctx;

      if (ctx.setLineDash !== undefined) {
        ctx.setLineDash(dashArray);
        ctx.lineDashOffset = dashPhase;
      }
    }
  }, {
    key: "setRenderingIntent",
    value: function setRenderingIntent(intent) {}
  }, {
    key: "setFlatness",
    value: function setFlatness(flatness) {}
  }, {
    key: "setGState",
    value: function setGState(states) {
      for (var i = 0, ii = states.length; i < ii; i++) {
        var state = states[i];
        var key = state[0];
        var value = state[1];

        switch (key) {
          case "LW":
            this.setLineWidth(value);
            break;

          case "LC":
            this.setLineCap(value);
            break;

          case "LJ":
            this.setLineJoin(value);
            break;

          case "ML":
            this.setMiterLimit(value);
            break;

          case "D":
            this.setDash(value[0], value[1]);
            break;

          case "RI":
            this.setRenderingIntent(value);
            break;

          case "FL":
            this.setFlatness(value);
            break;

          case "Font":
            this.setFont(value[0], value[1]);
            break;

          case "CA":
            this.current.strokeAlpha = state[1];
            break;

          case "ca":
            this.current.fillAlpha = state[1];
            this.ctx.globalAlpha = state[1];
            break;

          case "BM":
            this.ctx.globalCompositeOperation = value;
            break;

          case "SMask":
            this.current.activeSMask = value ? this.tempSMask : null;
            this.tempSMask = null;
            this.checkSMaskState();
            break;

          case "TR":
            this.current.transferMaps = value;
        }
      }
    }
  }, {
    key: "checkSMaskState",
    value: function checkSMaskState() {
      var inSMaskMode = !!this.suspendedCtx;

      if (this.current.activeSMask && !inSMaskMode) {
        this.beginSMaskMode();
      } else if (!this.current.activeSMask && inSMaskMode) {
        this.endSMaskMode();
      }
    }
  }, {
    key: "beginSMaskMode",
    value: function beginSMaskMode() {
      if (this.suspendedCtx) {
        throw new Error("beginSMaskMode called while already in smask mode");
      }

      var drawnWidth = this.ctx.canvas.width;
      var drawnHeight = this.ctx.canvas.height;
      var cacheId = "smaskGroupAt" + this.groupLevel;
      var scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight, true);
      this.suspendedCtx = this.ctx;
      this.ctx = scratchCanvas.context;
      var ctx = this.ctx;
      ctx.setTransform.apply(ctx, this.suspendedCtx.mozCurrentTransform);
      copyCtxState(this.suspendedCtx, ctx);
      mirrorContextOperations(ctx, this.suspendedCtx);
      this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
    }
  }, {
    key: "endSMaskMode",
    value: function endSMaskMode() {
      if (!this.suspendedCtx) {
        throw new Error("endSMaskMode called while not in smask mode");
      }

      this.ctx._removeMirroring();

      copyCtxState(this.ctx, this.suspendedCtx);
      this.ctx = this.suspendedCtx;
      this.current.activeSMask = null;
      this.suspendedCtx = null;
    }
  }, {
    key: "compose",
    value: function compose(dirtyBox) {
      if (!this.current.activeSMask) {
        return;
      }

      if (!dirtyBox) {
        dirtyBox = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
      } else {
        dirtyBox[0] = Math.floor(dirtyBox[0]);
        dirtyBox[1] = Math.floor(dirtyBox[1]);
        dirtyBox[2] = Math.ceil(dirtyBox[2]);
        dirtyBox[3] = Math.ceil(dirtyBox[3]);
      }

      var smask = this.current.activeSMask;
      var suspendedCtx = this.suspendedCtx;
      composeSMask(suspendedCtx, smask, this.ctx, dirtyBox);
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.restore();
    }
  }, {
    key: "save",
    value: function save() {
      this.ctx.save();
      var old = this.current;
      this.stateStack.push(old);
      this.current = old.clone();
    }
  }, {
    key: "restore",
    value: function restore() {
      if (this.stateStack.length === 0 && this.current.activeSMask) {
        this.endSMaskMode();
      }

      if (this.stateStack.length !== 0) {
        this.current = this.stateStack.pop();
        this.ctx.restore();
        this.checkSMaskState();
        this.pendingClip = null;
        this._cachedGetSinglePixelWidth = null;
      }
    }
  }, {
    key: "transform",
    value: function transform(a, b, c, d, e, f) {
      this.ctx.transform(a, b, c, d, e, f);
      this._cachedGetSinglePixelWidth = null;
    }
  }, {
    key: "constructPath",
    value: function constructPath(ops, args) {
      var ctx = this.ctx;
      var current = this.current;
      var x = current.x,
          y = current.y;
      var startX, startY;

      for (var i = 0, j = 0, ii = ops.length; i < ii; i++) {
        switch (ops[i] | 0) {
          case _util.OPS.rectangle:
            x = args[j++];
            y = args[j++];
            var width = args[j++];
            var height = args[j++];
            var xw = x + width;
            var yh = y + height;
            ctx.moveTo(x, y);

            if (width === 0 || height === 0) {
              ctx.lineTo(xw, yh);
            } else {
              ctx.lineTo(xw, y);
              ctx.lineTo(xw, yh);
              ctx.lineTo(x, yh);
            }

            current.updatePathMinMax(ctx.mozCurrentTransform, x, y);
            current.updatePathMinMax(ctx.mozCurrentTransform, xw, yh);
            ctx.closePath();
            break;

          case _util.OPS.moveTo:
            x = args[j++];
            y = args[j++];
            ctx.moveTo(x, y);
            current.updatePathMinMax(ctx.mozCurrentTransform, x, y);
            break;

          case _util.OPS.lineTo:
            x = args[j++];
            y = args[j++];
            ctx.lineTo(x, y);
            current.updatePathMinMax(ctx.mozCurrentTransform, x, y);
            break;

          case _util.OPS.curveTo:
            startX = x;
            startY = y;
            x = args[j + 4];
            y = args[j + 5];
            ctx.bezierCurveTo(args[j], args[j + 1], args[j + 2], args[j + 3], x, y);
            current.updateCurvePathMinMax(ctx.mozCurrentTransform, startX, startY, args[j], args[j + 1], args[j + 2], args[j + 3], x, y);
            j += 6;
            break;

          case _util.OPS.curveTo2:
            startX = x;
            startY = y;
            ctx.bezierCurveTo(x, y, args[j], args[j + 1], args[j + 2], args[j + 3]);
            current.updateCurvePathMinMax(ctx.mozCurrentTransform, startX, startY, x, y, args[j], args[j + 1], args[j + 2], args[j + 3]);
            x = args[j + 2];
            y = args[j + 3];
            j += 4;
            break;

          case _util.OPS.curveTo3:
            startX = x;
            startY = y;
            x = args[j + 2];
            y = args[j + 3];
            ctx.bezierCurveTo(args[j], args[j + 1], x, y, x, y);
            current.updateCurvePathMinMax(ctx.mozCurrentTransform, startX, startY, args[j], args[j + 1], x, y, x, y);
            j += 4;
            break;

          case _util.OPS.closePath:
            ctx.closePath();
            break;
        }
      }

      current.setCurrentPoint(x, y);
    }
  }, {
    key: "closePath",
    value: function closePath() {
      this.ctx.closePath();
    }
  }, {
    key: "stroke",
    value: function stroke(consumePath) {
      consumePath = typeof consumePath !== "undefined" ? consumePath : true;
      var ctx = this.ctx;
      var strokeColor = this.current.strokeColor;
      ctx.globalAlpha = this.current.strokeAlpha;

      if (this.contentVisible) {
        if (_typeof(strokeColor) === "object" && strokeColor !== null && strokeColor !== void 0 && strokeColor.getPattern) {
          var lineWidth = this.getSinglePixelWidth();
          ctx.save();
          ctx.strokeStyle = strokeColor.getPattern(ctx, this, ctx.mozCurrentTransformInverse, _pattern_helper.PathType.STROKE);
          ctx.lineWidth = Math.max(lineWidth, this.current.lineWidth);
          ctx.stroke();
          ctx.restore();
        } else {
          var _lineWidth = this.getSinglePixelWidth();

          if (_lineWidth < 0 && -_lineWidth >= this.current.lineWidth) {
            ctx.save();
            ctx.resetTransform();
            ctx.lineWidth = Math.round(this._combinedScaleFactor);
            ctx.stroke();
            ctx.restore();
          } else {
            ctx.lineWidth = Math.max(_lineWidth, this.current.lineWidth);
            ctx.stroke();
          }
        }
      }

      if (consumePath) {
        this.consumePath(this.current.getClippedPathBoundingBox());
      }

      ctx.globalAlpha = this.current.fillAlpha;
    }
  }, {
    key: "closeStroke",
    value: function closeStroke() {
      this.closePath();
      this.stroke();
    }
  }, {
    key: "fill",
    value: function fill(consumePath) {
      consumePath = typeof consumePath !== "undefined" ? consumePath : true;
      var ctx = this.ctx;
      var fillColor = this.current.fillColor;
      var isPatternFill = this.current.patternFill;
      var needRestore = false;

      if (isPatternFill) {
        ctx.save();
        ctx.fillStyle = fillColor.getPattern(ctx, this, ctx.mozCurrentTransformInverse, _pattern_helper.PathType.FILL);
        needRestore = true;
      }

      var intersect = this.current.getClippedPathBoundingBox();

      if (this.contentVisible && intersect !== null) {
        if (this.pendingEOFill) {
          ctx.fill("evenodd");
          this.pendingEOFill = false;
        } else {
          ctx.fill();
        }
      }

      if (needRestore) {
        ctx.restore();
      }

      if (consumePath) {
        this.consumePath(intersect);
      }
    }
  }, {
    key: "eoFill",
    value: function eoFill() {
      this.pendingEOFill = true;
      this.fill();
    }
  }, {
    key: "fillStroke",
    value: function fillStroke() {
      this.fill(false);
      this.stroke(false);
      this.consumePath();
    }
  }, {
    key: "eoFillStroke",
    value: function eoFillStroke() {
      this.pendingEOFill = true;
      this.fillStroke();
    }
  }, {
    key: "closeFillStroke",
    value: function closeFillStroke() {
      this.closePath();
      this.fillStroke();
    }
  }, {
    key: "closeEOFillStroke",
    value: function closeEOFillStroke() {
      this.pendingEOFill = true;
      this.closePath();
      this.fillStroke();
    }
  }, {
    key: "endPath",
    value: function endPath() {
      this.consumePath();
    }
  }, {
    key: "clip",
    value: function clip() {
      this.pendingClip = NORMAL_CLIP;
    }
  }, {
    key: "eoClip",
    value: function eoClip() {
      this.pendingClip = EO_CLIP;
    }
  }, {
    key: "beginText",
    value: function beginText() {
      this.current.textMatrix = _util.IDENTITY_MATRIX;
      this.current.textMatrixScale = 1;
      this.current.x = this.current.lineX = 0;
      this.current.y = this.current.lineY = 0;
    }
  }, {
    key: "endText",
    value: function endText() {
      var paths = this.pendingTextPaths;
      var ctx = this.ctx;

      if (paths === undefined) {
        ctx.beginPath();
        return;
      }

      ctx.save();
      ctx.beginPath();

      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        ctx.setTransform.apply(ctx, path.transform);
        ctx.translate(path.x, path.y);
        path.addToPath(ctx, path.fontSize);
      }

      ctx.restore();
      ctx.clip();
      ctx.beginPath();
      delete this.pendingTextPaths;
    }
  }, {
    key: "setCharSpacing",
    value: function setCharSpacing(spacing) {
      this.current.charSpacing = spacing;
    }
  }, {
    key: "setWordSpacing",
    value: function setWordSpacing(spacing) {
      this.current.wordSpacing = spacing;
    }
  }, {
    key: "setHScale",
    value: function setHScale(scale) {
      this.current.textHScale = scale / 100;
    }
  }, {
    key: "setLeading",
    value: function setLeading(leading) {
      this.current.leading = -leading;
    }
  }, {
    key: "setFont",
    value: function setFont(fontRefName, size) {
      var fontObj = this.commonObjs.get(fontRefName);
      var current = this.current;

      if (!fontObj) {
        throw new Error("Can't find font for ".concat(fontRefName));
      }

      current.fontMatrix = fontObj.fontMatrix || _util.FONT_IDENTITY_MATRIX;

      if (current.fontMatrix[0] === 0 || current.fontMatrix[3] === 0) {
        (0, _util.warn)("Invalid font matrix for font " + fontRefName);
      }

      if (size < 0) {
        size = -size;
        current.fontDirection = -1;
      } else {
        current.fontDirection = 1;
      }

      this.current.font = fontObj;
      this.current.fontSize = size;

      if (fontObj.isType3Font) {
        return;
      }

      var name = fontObj.loadedName || "sans-serif";
      var bold = "normal";

      if (fontObj.black) {
        bold = "900";
      } else if (fontObj.bold) {
        bold = "bold";
      }

      var italic = fontObj.italic ? "italic" : "normal";
      var typeface = "\"".concat(name, "\", ").concat(fontObj.fallbackName);
      var browserFontSize = size;

      if (size < MIN_FONT_SIZE) {
        browserFontSize = MIN_FONT_SIZE;
      } else if (size > MAX_FONT_SIZE) {
        browserFontSize = MAX_FONT_SIZE;
      }

      this.current.fontSizeScale = size / browserFontSize;
      this.ctx.font = "".concat(italic, " ").concat(bold, " ").concat(browserFontSize, "px ").concat(typeface);
    }
  }, {
    key: "setTextRenderingMode",
    value: function setTextRenderingMode(mode) {
      this.current.textRenderingMode = mode;
    }
  }, {
    key: "setTextRise",
    value: function setTextRise(rise) {
      this.current.textRise = rise;
    }
  }, {
    key: "moveText",
    value: function moveText(x, y) {
      this.current.x = this.current.lineX += x;
      this.current.y = this.current.lineY += y;
    }
  }, {
    key: "setLeadingMoveText",
    value: function setLeadingMoveText(x, y) {
      this.setLeading(-y);
      this.moveText(x, y);
    }
  }, {
    key: "setTextMatrix",
    value: function setTextMatrix(a, b, c, d, e, f) {
      this.current.textMatrix = [a, b, c, d, e, f];
      this.current.textMatrixScale = Math.hypot(a, b);
      this.current.x = this.current.lineX = 0;
      this.current.y = this.current.lineY = 0;
    }
  }, {
    key: "nextLine",
    value: function nextLine() {
      this.moveText(0, this.current.leading);
    }
  }, {
    key: "paintChar",
    value: function paintChar(character, x, y, patternTransform, resetLineWidthToOne) {
      var ctx = this.ctx;
      var current = this.current;
      var font = current.font;
      var textRenderingMode = current.textRenderingMode;
      var fontSize = current.fontSize / current.fontSizeScale;
      var fillStrokeMode = textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;
      var isAddToPathSet = !!(textRenderingMode & _util.TextRenderingMode.ADD_TO_PATH_FLAG);
      var patternFill = current.patternFill && !font.missingFile;
      var addToPath;

      if (font.disableFontFace || isAddToPathSet || patternFill) {
        addToPath = font.getPathGenerator(this.commonObjs, character);
      }

      if (font.disableFontFace || patternFill) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        addToPath(ctx, fontSize);

        if (patternTransform) {
          ctx.setTransform.apply(ctx, patternTransform);
        }

        if (fillStrokeMode === _util.TextRenderingMode.FILL || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          ctx.fill();
        }

        if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          if (resetLineWidthToOne) {
            ctx.resetTransform();
            ctx.lineWidth = Math.round(this._combinedScaleFactor);
          }

          ctx.stroke();
        }

        ctx.restore();
      } else {
        if (fillStrokeMode === _util.TextRenderingMode.FILL || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          ctx.fillText(character, x, y);
        }

        if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          if (resetLineWidthToOne) {
            ctx.save();
            ctx.moveTo(x, y);
            ctx.resetTransform();
            ctx.lineWidth = Math.round(this._combinedScaleFactor);
            ctx.strokeText(character, 0, 0);
            ctx.restore();
          } else {
            ctx.strokeText(character, x, y);
          }
        }
      }

      if (isAddToPathSet) {
        var paths = this.pendingTextPaths || (this.pendingTextPaths = []);
        paths.push({
          transform: ctx.mozCurrentTransform,
          x: x,
          y: y,
          fontSize: fontSize,
          addToPath: addToPath
        });
      }
    }
  }, {
    key: "isFontSubpixelAAEnabled",
    get: function get() {
      var _this$cachedCanvases$ = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10),
          ctx = _this$cachedCanvases$.context;

      ctx.scale(1.5, 1);
      ctx.fillText("I", 0, 10);
      var data = ctx.getImageData(0, 0, 10, 10).data;
      var enabled = false;

      for (var i = 3; i < data.length; i += 4) {
        if (data[i] > 0 && data[i] < 255) {
          enabled = true;
          break;
        }
      }

      return (0, _util.shadow)(this, "isFontSubpixelAAEnabled", enabled);
    }
  }, {
    key: "showText",
    value: function showText(glyphs) {
      var current = this.current;
      var font = current.font;

      if (font.isType3Font) {
        return this.showType3Text(glyphs);
      }

      var fontSize = current.fontSize;

      if (fontSize === 0) {
        return undefined;
      }

      var ctx = this.ctx;
      var fontSizeScale = current.fontSizeScale;
      var charSpacing = current.charSpacing;
      var wordSpacing = current.wordSpacing;
      var fontDirection = current.fontDirection;
      var textHScale = current.textHScale * fontDirection;
      var glyphsLength = glyphs.length;
      var vertical = font.vertical;
      var spacingDir = vertical ? 1 : -1;
      var defaultVMetrics = font.defaultVMetrics;
      var widthAdvanceScale = fontSize * current.fontMatrix[0];
      var simpleFillText = current.textRenderingMode === _util.TextRenderingMode.FILL && !font.disableFontFace && !current.patternFill;
      ctx.save();
      ctx.transform.apply(ctx, current.textMatrix);
      ctx.translate(current.x, current.y + current.textRise);

      if (fontDirection > 0) {
        ctx.scale(textHScale, -1);
      } else {
        ctx.scale(textHScale, 1);
      }

      var patternTransform;

      if (current.patternFill) {
        ctx.save();
        var pattern = current.fillColor.getPattern(ctx, this, ctx.mozCurrentTransformInverse, _pattern_helper.PathType.FILL);
        patternTransform = ctx.mozCurrentTransform;
        ctx.restore();
        ctx.fillStyle = pattern;
      }

      var lineWidth = current.lineWidth;
      var resetLineWidthToOne = false;
      var scale = current.textMatrixScale;

      if (scale === 0 || lineWidth === 0) {
        var fillStrokeMode = current.textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;

        if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          this._cachedGetSinglePixelWidth = null;
          lineWidth = this.getSinglePixelWidth();
          resetLineWidthToOne = lineWidth < 0;
        }
      } else {
        lineWidth /= scale;
      }

      if (fontSizeScale !== 1.0) {
        ctx.scale(fontSizeScale, fontSizeScale);
        lineWidth /= fontSizeScale;
      }

      ctx.lineWidth = lineWidth;
      var x = 0,
          i;

      for (i = 0; i < glyphsLength; ++i) {
        var glyph = glyphs[i];

        if ((0, _util.isNum)(glyph)) {
          x += spacingDir * glyph * fontSize / 1000;
          continue;
        }

        var restoreNeeded = false;
        var spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
        var character = glyph.fontChar;
        var accent = glyph.accent;
        var scaledX = void 0,
            scaledY = void 0;
        var width = glyph.width;

        if (vertical) {
          var vmetric = glyph.vmetric || defaultVMetrics;
          var vx = -(glyph.vmetric ? vmetric[1] : width * 0.5) * widthAdvanceScale;
          var vy = vmetric[2] * widthAdvanceScale;
          width = vmetric ? -vmetric[0] : width;
          scaledX = vx / fontSizeScale;
          scaledY = (x + vy) / fontSizeScale;
        } else {
          scaledX = x / fontSizeScale;
          scaledY = 0;
        }

        if (font.remeasure && width > 0) {
          var measuredWidth = ctx.measureText(character).width * 1000 / fontSize * fontSizeScale;

          if (width < measuredWidth && this.isFontSubpixelAAEnabled) {
            var characterScaleX = width / measuredWidth;
            restoreNeeded = true;
            ctx.save();
            ctx.scale(characterScaleX, 1);
            scaledX /= characterScaleX;
          } else if (width !== measuredWidth) {
            scaledX += (width - measuredWidth) / 2000 * fontSize / fontSizeScale;
          }
        }

        if (this.contentVisible && (glyph.isInFont || font.missingFile)) {
          if (simpleFillText && !accent) {
            ctx.fillText(character, scaledX, scaledY);
          } else {
            this.paintChar(character, scaledX, scaledY, patternTransform, resetLineWidthToOne);

            if (accent) {
              var scaledAccentX = scaledX + fontSize * accent.offset.x / fontSizeScale;
              var scaledAccentY = scaledY - fontSize * accent.offset.y / fontSizeScale;
              this.paintChar(accent.fontChar, scaledAccentX, scaledAccentY, patternTransform, resetLineWidthToOne);
            }
          }
        }

        var charWidth = void 0;

        if (vertical) {
          charWidth = width * widthAdvanceScale - spacing * fontDirection;
        } else {
          charWidth = width * widthAdvanceScale + spacing * fontDirection;
        }

        x += charWidth;

        if (restoreNeeded) {
          ctx.restore();
        }
      }

      if (vertical) {
        current.y -= x;
      } else {
        current.x += x * textHScale;
      }

      ctx.restore();
      this.compose();
      return undefined;
    }
  }, {
    key: "showType3Text",
    value: function showType3Text(glyphs) {
      var ctx = this.ctx;
      var current = this.current;
      var font = current.font;
      var fontSize = current.fontSize;
      var fontDirection = current.fontDirection;
      var spacingDir = font.vertical ? 1 : -1;
      var charSpacing = current.charSpacing;
      var wordSpacing = current.wordSpacing;
      var textHScale = current.textHScale * fontDirection;
      var fontMatrix = current.fontMatrix || _util.FONT_IDENTITY_MATRIX;
      var glyphsLength = glyphs.length;
      var isTextInvisible = current.textRenderingMode === _util.TextRenderingMode.INVISIBLE;
      var i, glyph, width, spacingLength;

      if (isTextInvisible || fontSize === 0) {
        return;
      }

      this._cachedGetSinglePixelWidth = null;
      ctx.save();
      ctx.transform.apply(ctx, current.textMatrix);
      ctx.translate(current.x, current.y);
      ctx.scale(textHScale, fontDirection);

      for (i = 0; i < glyphsLength; ++i) {
        glyph = glyphs[i];

        if ((0, _util.isNum)(glyph)) {
          spacingLength = spacingDir * glyph * fontSize / 1000;
          this.ctx.translate(spacingLength, 0);
          current.x += spacingLength * textHScale;
          continue;
        }

        var spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
        var operatorList = font.charProcOperatorList[glyph.operatorListId];

        if (!operatorList) {
          (0, _util.warn)("Type3 character \"".concat(glyph.operatorListId, "\" is not available."));
          continue;
        }

        if (this.contentVisible) {
          this.processingType3 = glyph;
          this.save();
          ctx.scale(fontSize, fontSize);
          ctx.transform.apply(ctx, fontMatrix);
          this.executeOperatorList(operatorList);
          this.restore();
        }

        var transformed = _util.Util.applyTransform([glyph.width, 0], fontMatrix);

        width = transformed[0] * fontSize + spacing;
        ctx.translate(width, 0);
        current.x += width * textHScale;
      }

      ctx.restore();
      this.processingType3 = null;
    }
  }, {
    key: "setCharWidth",
    value: function setCharWidth(xWidth, yWidth) {}
  }, {
    key: "setCharWidthAndBounds",
    value: function setCharWidthAndBounds(xWidth, yWidth, llx, lly, urx, ury) {
      this.ctx.rect(llx, lly, urx - llx, ury - lly);
      this.clip();
      this.endPath();
    }
  }, {
    key: "getColorN_Pattern",
    value: function getColorN_Pattern(IR) {
      var _this = this;

      var pattern;

      if (IR[0] === "TilingPattern") {
        var color = IR[1];
        var baseTransform = this.baseTransform || this.ctx.mozCurrentTransform.slice();
        var canvasGraphicsFactory = {
          createCanvasGraphics: function createCanvasGraphics(ctx) {
            return new CanvasGraphics(ctx, _this.commonObjs, _this.objs, _this.canvasFactory);
          }
        };
        pattern = new _pattern_helper.TilingPattern(IR, color, this.ctx, canvasGraphicsFactory, baseTransform);
      } else {
        pattern = this._getPattern(IR[1], IR[2]);
      }

      return pattern;
    }
  }, {
    key: "setStrokeColorN",
    value: function setStrokeColorN() {
      this.current.strokeColor = this.getColorN_Pattern(arguments);
    }
  }, {
    key: "setFillColorN",
    value: function setFillColorN() {
      this.current.fillColor = this.getColorN_Pattern(arguments);
      this.current.patternFill = true;
    }
  }, {
    key: "setStrokeRGBColor",
    value: function setStrokeRGBColor(r, g, b) {
      var color = _util.Util.makeHexColor(r, g, b);

      this.ctx.strokeStyle = color;
      this.current.strokeColor = color;
    }
  }, {
    key: "setFillRGBColor",
    value: function setFillRGBColor(r, g, b) {
      var color = _util.Util.makeHexColor(r, g, b);

      this.ctx.fillStyle = color;
      this.current.fillColor = color;
      this.current.patternFill = false;
    }
  }, {
    key: "_getPattern",
    value: function _getPattern(objId) {
      var matrix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var pattern;

      if (this.cachedPatterns.has(objId)) {
        pattern = this.cachedPatterns.get(objId);
      } else {
        pattern = (0, _pattern_helper.getShadingPattern)(this.objs.get(objId));
        this.cachedPatterns.set(objId, pattern);
      }

      if (matrix) {
        pattern.matrix = matrix;
      }

      return pattern;
    }
  }, {
    key: "shadingFill",
    value: function shadingFill(objId) {
      if (!this.contentVisible) {
        return;
      }

      var ctx = this.ctx;
      this.save();

      var pattern = this._getPattern(objId);

      ctx.fillStyle = pattern.getPattern(ctx, this, ctx.mozCurrentTransformInverse, _pattern_helper.PathType.SHADING);
      var inv = ctx.mozCurrentTransformInverse;

      if (inv) {
        var canvas = ctx.canvas;
        var width = canvas.width;
        var height = canvas.height;

        var bl = _util.Util.applyTransform([0, 0], inv);

        var br = _util.Util.applyTransform([0, height], inv);

        var ul = _util.Util.applyTransform([width, 0], inv);

        var ur = _util.Util.applyTransform([width, height], inv);

        var x0 = Math.min(bl[0], br[0], ul[0], ur[0]);
        var y0 = Math.min(bl[1], br[1], ul[1], ur[1]);
        var x1 = Math.max(bl[0], br[0], ul[0], ur[0]);
        var y1 = Math.max(bl[1], br[1], ul[1], ur[1]);
        this.ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      } else {
        this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
      }

      this.compose(this.current.getClippedPathBoundingBox());
      this.restore();
    }
  }, {
    key: "beginInlineImage",
    value: function beginInlineImage() {
      (0, _util.unreachable)("Should not call beginInlineImage");
    }
  }, {
    key: "beginImageData",
    value: function beginImageData() {
      (0, _util.unreachable)("Should not call beginImageData");
    }
  }, {
    key: "paintFormXObjectBegin",
    value: function paintFormXObjectBegin(matrix, bbox) {
      if (!this.contentVisible) {
        return;
      }

      this.save();
      this.baseTransformStack.push(this.baseTransform);

      if (Array.isArray(matrix) && matrix.length === 6) {
        this.transform.apply(this, matrix);
      }

      this.baseTransform = this.ctx.mozCurrentTransform;

      if (bbox) {
        var width = bbox[2] - bbox[0];
        var height = bbox[3] - bbox[1];
        this.ctx.rect(bbox[0], bbox[1], width, height);
        this.current.updatePathMinMax(this.ctx.mozCurrentTransform, bbox[0], bbox[1]);
        this.current.updatePathMinMax(this.ctx.mozCurrentTransform, bbox[2], bbox[3]);
        this.clip();
        this.endPath();
      }
    }
  }, {
    key: "paintFormXObjectEnd",
    value: function paintFormXObjectEnd() {
      if (!this.contentVisible) {
        return;
      }

      this.restore();
      this.baseTransform = this.baseTransformStack.pop();
    }
  }, {
    key: "beginGroup",
    value: function beginGroup(group) {
      if (!this.contentVisible) {
        return;
      }

      this.save();
      var suspendedCtx = this.suspendedCtx;

      if (this.current.activeSMask) {
        this.suspendedCtx = null;
        this.current.activeSMask = null;
      }

      var currentCtx = this.ctx;

      if (!group.isolated) {
        (0, _util.info)("TODO: Support non-isolated groups.");
      }

      if (group.knockout) {
        (0, _util.warn)("Knockout groups not supported.");
      }

      var currentTransform = currentCtx.mozCurrentTransform;

      if (group.matrix) {
        currentCtx.transform.apply(currentCtx, group.matrix);
      }

      if (!group.bbox) {
        throw new Error("Bounding box is required.");
      }

      var bounds = _util.Util.getAxialAlignedBoundingBox(group.bbox, currentCtx.mozCurrentTransform);

      var canvasBounds = [0, 0, currentCtx.canvas.width, currentCtx.canvas.height];
      bounds = _util.Util.intersect(bounds, canvasBounds) || [0, 0, 0, 0];
      var offsetX = Math.floor(bounds[0]);
      var offsetY = Math.floor(bounds[1]);
      var drawnWidth = Math.max(Math.ceil(bounds[2]) - offsetX, 1);
      var drawnHeight = Math.max(Math.ceil(bounds[3]) - offsetY, 1);
      var scaleX = 1,
          scaleY = 1;

      if (drawnWidth > MAX_GROUP_SIZE) {
        scaleX = drawnWidth / MAX_GROUP_SIZE;
        drawnWidth = MAX_GROUP_SIZE;
      }

      if (drawnHeight > MAX_GROUP_SIZE) {
        scaleY = drawnHeight / MAX_GROUP_SIZE;
        drawnHeight = MAX_GROUP_SIZE;
      }

      this.current.startNewPathAndClipBox([0, 0, drawnWidth, drawnHeight]);
      var cacheId = "groupAt" + this.groupLevel;

      if (group.smask) {
        cacheId += "_smask_" + this.smaskCounter++ % 2;
      }

      var scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight, true);
      var groupCtx = scratchCanvas.context;
      groupCtx.scale(1 / scaleX, 1 / scaleY);
      groupCtx.translate(-offsetX, -offsetY);
      groupCtx.transform.apply(groupCtx, currentTransform);

      if (group.smask) {
        this.smaskStack.push({
          canvas: scratchCanvas.canvas,
          context: groupCtx,
          offsetX: offsetX,
          offsetY: offsetY,
          scaleX: scaleX,
          scaleY: scaleY,
          subtype: group.smask.subtype,
          backdrop: group.smask.backdrop,
          transferMap: group.smask.transferMap || null,
          startTransformInverse: null
        });
      } else {
        currentCtx.setTransform(1, 0, 0, 1, 0, 0);
        currentCtx.translate(offsetX, offsetY);
        currentCtx.scale(scaleX, scaleY);
        currentCtx.save();
      }

      copyCtxState(currentCtx, groupCtx);
      this.ctx = groupCtx;
      this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
      this.groupStack.push({
        ctx: currentCtx,
        suspendedCtx: suspendedCtx
      });
      this.groupLevel++;
    }
  }, {
    key: "endGroup",
    value: function endGroup(group) {
      if (!this.contentVisible) {
        return;
      }

      this.groupLevel--;
      var groupCtx = this.ctx;

      var _this$groupStack$pop = this.groupStack.pop(),
          ctx = _this$groupStack$pop.ctx,
          suspendedCtx = _this$groupStack$pop.suspendedCtx;

      this.ctx = ctx;
      this.ctx.imageSmoothingEnabled = false;

      if (suspendedCtx) {
        this.suspendedCtx = suspendedCtx;
      }

      if (group.smask) {
        this.tempSMask = this.smaskStack.pop();
        this.restore();
      } else {
        this.ctx.restore();
        var currentMtx = this.ctx.mozCurrentTransform;
        this.restore();
        this.ctx.save();
        this.ctx.setTransform.apply(this.ctx, currentMtx);

        var dirtyBox = _util.Util.getAxialAlignedBoundingBox([0, 0, groupCtx.canvas.width, groupCtx.canvas.height], currentMtx);

        this.ctx.drawImage(groupCtx.canvas, 0, 0);
        this.ctx.restore();
        this.compose(dirtyBox);
      }
    }
  }, {
    key: "beginAnnotations",
    value: function beginAnnotations() {
      this.save();

      if (this.baseTransform) {
        this.ctx.setTransform.apply(this.ctx, this.baseTransform);
      }
    }
  }, {
    key: "endAnnotations",
    value: function endAnnotations() {
      this.restore();
    }
  }, {
    key: "beginAnnotation",
    value: function beginAnnotation(id, rect, transform, matrix, hasOwnCanvas) {
      this.save();

      if (Array.isArray(rect) && rect.length === 4) {
        var width = rect[2] - rect[0];
        var height = rect[3] - rect[1];

        if (hasOwnCanvas && this.annotationCanvasMap) {
          transform = transform.slice();
          transform[4] -= rect[0];
          transform[5] -= rect[1];
          rect = rect.slice();
          rect[0] = rect[1] = 0;
          rect[2] = width;
          rect[3] = height;

          var _Util$singularValueDe = _util.Util.singularValueDecompose2dScale(this.ctx.mozCurrentTransform),
              _Util$singularValueDe2 = _slicedToArray(_Util$singularValueDe, 2),
              scaleX = _Util$singularValueDe2[0],
              scaleY = _Util$singularValueDe2[1];

          var viewportScale = this.viewportScale;
          var canvasWidth = Math.ceil(width * this.outputScaleX * viewportScale);
          var canvasHeight = Math.ceil(height * this.outputScaleY * viewportScale);
          this.annotationCanvas = this.canvasFactory.create(canvasWidth, canvasHeight);
          var _this$annotationCanva = this.annotationCanvas,
              canvas = _this$annotationCanva.canvas,
              context = _this$annotationCanva.context;
          canvas.style.width = "calc(".concat(width, "px * var(--viewport-scale-factor))");
          canvas.style.height = "calc(".concat(height, "px * var(--viewport-scale-factor))");
          this.annotationCanvasMap.set(id, canvas);
          this.annotationCanvas.savedCtx = this.ctx;
          this.ctx = context;
          this.ctx.setTransform(scaleX, 0, 0, -scaleY, 0, height * scaleY);
          addContextCurrentTransform(this.ctx);
          resetCtxToDefault(this.ctx);
        } else {
          resetCtxToDefault(this.ctx);
          this.ctx.rect(rect[0], rect[1], width, height);
          this.clip();
          this.endPath();
        }
      }

      this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height);
      this.transform.apply(this, transform);
      this.transform.apply(this, matrix);
    }
  }, {
    key: "endAnnotation",
    value: function endAnnotation() {
      if (this.annotationCanvas) {
        this.ctx = this.annotationCanvas.savedCtx;
        delete this.annotationCanvas.savedCtx;
        delete this.annotationCanvas;
      }

      this.restore();
    }
  }, {
    key: "paintImageMaskXObject",
    value: function paintImageMaskXObject(img) {
      if (!this.contentVisible) {
        return;
      }

      var ctx = this.ctx;
      var width = img.width,
          height = img.height;
      var glyph = this.processingType3;

      if (COMPILE_TYPE3_GLYPHS && glyph && glyph.compiled === undefined) {
        if (width <= MAX_SIZE_TO_COMPILE && height <= MAX_SIZE_TO_COMPILE) {
          glyph.compiled = compileType3Glyph({
            data: img.data,
            width: width,
            height: height
          });
        } else {
          glyph.compiled = null;
        }
      }

      if (glyph !== null && glyph !== void 0 && glyph.compiled) {
        glyph.compiled(ctx);
        return;
      }

      var mask = this._createMaskCanvas(img);

      var maskCanvas = mask.canvas;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(maskCanvas, mask.offsetX, mask.offsetY);
      ctx.restore();
      this.compose();
    }
  }, {
    key: "paintImageMaskXObjectRepeat",
    value: function paintImageMaskXObjectRepeat(imgData, scaleX) {
      var skewX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var skewY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var scaleY = arguments.length > 4 ? arguments[4] : undefined;
      var positions = arguments.length > 5 ? arguments[5] : undefined;

      if (!this.contentVisible) {
        return;
      }

      var ctx = this.ctx;
      ctx.save();
      var currentTransform = ctx.mozCurrentTransform;
      ctx.transform(scaleX, skewX, skewY, scaleY, 0, 0);

      var mask = this._createMaskCanvas(imgData);

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      for (var i = 0, ii = positions.length; i < ii; i += 2) {
        var trans = _util.Util.transform(currentTransform, [scaleX, skewX, skewY, scaleY, positions[i], positions[i + 1]]);

        var _Util$applyTransform3 = _util.Util.applyTransform([0, 0], trans),
            _Util$applyTransform4 = _slicedToArray(_Util$applyTransform3, 2),
            x = _Util$applyTransform4[0],
            y = _Util$applyTransform4[1];

        ctx.drawImage(mask.canvas, x, y);
      }

      ctx.restore();
      this.compose();
    }
  }, {
    key: "paintImageMaskXObjectGroup",
    value: function paintImageMaskXObjectGroup(images) {
      if (!this.contentVisible) {
        return;
      }

      var ctx = this.ctx;
      var fillColor = this.current.fillColor;
      var isPatternFill = this.current.patternFill;

      for (var i = 0, ii = images.length; i < ii; i++) {
        var image = images[i];
        var width = image.width,
            height = image.height;
        var maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
        var maskCtx = maskCanvas.context;
        maskCtx.save();
        putBinaryImageMask(maskCtx, image);
        maskCtx.globalCompositeOperation = "source-in";
        maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this, ctx.mozCurrentTransformInverse, _pattern_helper.PathType.FILL) : fillColor;
        maskCtx.fillRect(0, 0, width, height);
        maskCtx.restore();
        ctx.save();
        ctx.transform.apply(ctx, image.transform);
        ctx.scale(1, -1);
        ctx.drawImage(maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
        ctx.restore();
      }

      this.compose();
    }
  }, {
    key: "paintImageXObject",
    value: function paintImageXObject(objId) {
      if (!this.contentVisible) {
        return;
      }

      var imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

      if (!imgData) {
        (0, _util.warn)("Dependent image isn't ready yet");
        return;
      }

      this.paintInlineImageXObject(imgData);
    }
  }, {
    key: "paintImageXObjectRepeat",
    value: function paintImageXObjectRepeat(objId, scaleX, scaleY, positions) {
      if (!this.contentVisible) {
        return;
      }

      var imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

      if (!imgData) {
        (0, _util.warn)("Dependent image isn't ready yet");
        return;
      }

      var width = imgData.width;
      var height = imgData.height;
      var map = [];

      for (var i = 0, ii = positions.length; i < ii; i += 2) {
        map.push({
          transform: [scaleX, 0, 0, scaleY, positions[i], positions[i + 1]],
          x: 0,
          y: 0,
          w: width,
          h: height
        });
      }

      this.paintInlineImageXObjectGroup(imgData, map);
    }
  }, {
    key: "paintInlineImageXObject",
    value: function paintInlineImageXObject(imgData) {
      if (!this.contentVisible) {
        return;
      }

      var width = imgData.width;
      var height = imgData.height;
      var ctx = this.ctx;
      this.save();
      ctx.scale(1 / width, -1 / height);
      var imgToPaint;

      if (typeof HTMLElement === "function" && imgData instanceof HTMLElement || !imgData.data) {
        imgToPaint = imgData;
      } else {
        var tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", width, height);
        var tmpCtx = tmpCanvas.context;
        putBinaryImageData(tmpCtx, imgData, this.current.transferMaps);
        imgToPaint = tmpCanvas.canvas;
      }

      var scaled = this._scaleImage(imgToPaint, ctx.mozCurrentTransformInverse);

      ctx.imageSmoothingEnabled = getImageSmoothingEnabled(ctx.mozCurrentTransform, imgData.interpolate);
      ctx.drawImage(scaled.img, 0, 0, scaled.paintWidth, scaled.paintHeight, 0, -height, width, height);

      if (this.imageLayer) {
        var position = this.getCanvasPosition(0, -height);
        this.imageLayer.appendImage({
          imgData: imgData,
          left: position[0],
          top: position[1],
          width: width / ctx.mozCurrentTransformInverse[0],
          height: height / ctx.mozCurrentTransformInverse[3]
        });
      }

      this.compose();
      this.restore();
    }
  }, {
    key: "paintInlineImageXObjectGroup",
    value: function paintInlineImageXObjectGroup(imgData, map) {
      if (!this.contentVisible) {
        return;
      }

      var ctx = this.ctx;
      var w = imgData.width;
      var h = imgData.height;
      var tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", w, h);
      var tmpCtx = tmpCanvas.context;
      putBinaryImageData(tmpCtx, imgData, this.current.transferMaps);

      for (var i = 0, ii = map.length; i < ii; i++) {
        var entry = map[i];
        ctx.save();
        ctx.transform.apply(ctx, entry.transform);
        ctx.scale(1, -1);
        ctx.drawImage(tmpCanvas.canvas, entry.x, entry.y, entry.w, entry.h, 0, -1, 1, 1);

        if (this.imageLayer) {
          var position = this.getCanvasPosition(entry.x, entry.y);
          this.imageLayer.appendImage({
            imgData: imgData,
            left: position[0],
            top: position[1],
            width: w,
            height: h
          });
        }

        ctx.restore();
      }

      this.compose();
    }
  }, {
    key: "paintSolidColorImageMask",
    value: function paintSolidColorImageMask() {
      if (!this.contentVisible) {
        return;
      }

      this.ctx.fillRect(0, 0, 1, 1);
      this.compose();
    }
  }, {
    key: "markPoint",
    value: function markPoint(tag) {}
  }, {
    key: "markPointProps",
    value: function markPointProps(tag, properties) {}
  }, {
    key: "beginMarkedContent",
    value: function beginMarkedContent(tag) {
      this.markedContentStack.push({
        visible: true
      });
    }
  }, {
    key: "beginMarkedContentProps",
    value: function beginMarkedContentProps(tag, properties) {
      if (tag === "OC") {
        this.markedContentStack.push({
          visible: this.optionalContentConfig.isVisible(properties)
        });
      } else {
        this.markedContentStack.push({
          visible: true
        });
      }

      this.contentVisible = this.isContentVisible();
    }
  }, {
    key: "endMarkedContent",
    value: function endMarkedContent() {
      this.markedContentStack.pop();
      this.contentVisible = this.isContentVisible();
    }
  }, {
    key: "beginCompat",
    value: function beginCompat() {}
  }, {
    key: "endCompat",
    value: function endCompat() {}
  }, {
    key: "consumePath",
    value: function consumePath(clipBox) {
      if (this.pendingClip) {
        this.current.updateClipFromPath();
      }

      if (!this.pendingClip) {
        this.compose(clipBox);
      }

      var ctx = this.ctx;

      if (this.pendingClip) {
        if (this.pendingClip === EO_CLIP) {
          ctx.clip("evenodd");
        } else {
          ctx.clip();
        }

        this.pendingClip = null;
      }

      this.current.startNewPathAndClipBox(this.current.clipBox);
      ctx.beginPath();
    }
  }, {
    key: "getSinglePixelWidth",
    value: function getSinglePixelWidth() {
      if (this._cachedGetSinglePixelWidth === null) {
        var m = this.ctx.mozCurrentTransform;
        var absDet = Math.abs(m[0] * m[3] - m[2] * m[1]);
        var sqNorm1 = Math.pow(m[0], 2) + Math.pow(m[2], 2);
        var sqNorm2 = Math.pow(m[1], 2) + Math.pow(m[3], 2);
        var pixelHeight = Math.sqrt(Math.max(sqNorm1, sqNorm2)) / absDet;

        if (sqNorm1 !== sqNorm2 && this._combinedScaleFactor * pixelHeight > 1) {
          this._cachedGetSinglePixelWidth = -(this._combinedScaleFactor * pixelHeight);
        } else if (absDet > Number.EPSILON) {
          this._cachedGetSinglePixelWidth = pixelHeight;
        } else {
          this._cachedGetSinglePixelWidth = 1;
        }
      }

      return this._cachedGetSinglePixelWidth;
    }
  }, {
    key: "getCanvasPosition",
    value: function getCanvasPosition(x, y) {
      var transform = this.ctx.mozCurrentTransform;
      return [transform[0] * x + transform[2] * y + transform[4], transform[1] * x + transform[3] * y + transform[5]];
    }
  }, {
    key: "isContentVisible",
    value: function isContentVisible() {
      for (var i = this.markedContentStack.length - 1; i >= 0; i--) {
        if (!this.markedContentStack[i].visible) {
          return false;
        }
      }

      return true;
    }
  }]);

  return CanvasGraphics;
}();

exports.CanvasGraphics = CanvasGraphics;

for (var op in _util.OPS) {
  if (CanvasGraphics.prototype[op] !== undefined) {
    CanvasGraphics.prototype[_util.OPS[op]] = CanvasGraphics.prototype[op];
  }
}