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
exports.renderTextLayer = renderTextLayer;

var _util = require("../shared/util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var MAX_TEXT_DIVS_TO_RENDER = 100000;
var DEFAULT_FONT_SIZE = 30;
var DEFAULT_FONT_ASCENT = 0.8;
var ascentCache = new Map();
var AllWhitespaceRegexp = /^\s+$/g;

function getAscent(fontFamily, ctx) {
  var cachedAscent = ascentCache.get(fontFamily);

  if (cachedAscent) {
    return cachedAscent;
  }

  ctx.save();
  ctx.font = "".concat(DEFAULT_FONT_SIZE, "px ").concat(fontFamily);
  var metrics = ctx.measureText("");
  var ascent = metrics.fontBoundingBoxAscent;
  var descent = Math.abs(metrics.fontBoundingBoxDescent);

  if (ascent) {
    ctx.restore();
    var ratio = ascent / (ascent + descent);
    ascentCache.set(fontFamily, ratio);
    return ratio;
  }

  ctx.strokeStyle = "red";
  ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
  ctx.strokeText("g", 0, 0);
  var pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
  descent = 0;

  for (var i = pixels.length - 1 - 3; i >= 0; i -= 4) {
    if (pixels[i] > 0) {
      descent = Math.ceil(i / 4 / DEFAULT_FONT_SIZE);
      break;
    }
  }

  ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
  ctx.strokeText("A", 0, DEFAULT_FONT_SIZE);
  pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
  ascent = 0;

  for (var _i = 0, ii = pixels.length; _i < ii; _i += 4) {
    if (pixels[_i] > 0) {
      ascent = DEFAULT_FONT_SIZE - Math.floor(_i / 4 / DEFAULT_FONT_SIZE);
      break;
    }
  }

  ctx.restore();

  if (ascent) {
    var _ratio = ascent / (ascent + descent);

    ascentCache.set(fontFamily, _ratio);
    return _ratio;
  }

  ascentCache.set(fontFamily, DEFAULT_FONT_ASCENT);
  return DEFAULT_FONT_ASCENT;
}

function appendText(task, geom, styles, ctx) {
  var textDiv = document.createElement("span");
  var textDivProperties = task._enhanceTextSelection ? {
    angle: 0,
    canvasWidth: 0,
    hasText: geom.str !== "",
    hasEOL: geom.hasEOL,
    originalTransform: null,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    scale: 1
  } : {
    angle: 0,
    canvasWidth: 0,
    hasText: geom.str !== "",
    hasEOL: geom.hasEOL
  };

  task._textDivs.push(textDiv);

  var tx = _util.Util.transform(task._viewport.transform, geom.transform);

  var angle = Math.atan2(tx[1], tx[0]);
  var style = styles[geom.fontName];

  if (style.vertical) {
    angle += Math.PI / 2;
  }

  var fontHeight = Math.hypot(tx[2], tx[3]);
  var fontAscent = fontHeight * getAscent(style.fontFamily, ctx);
  var left, top;

  if (angle === 0) {
    left = tx[4];
    top = tx[5] - fontAscent;
  } else {
    left = tx[4] + fontAscent * Math.sin(angle);
    top = tx[5] - fontAscent * Math.cos(angle);
  }

  textDiv.style.left = "".concat(left, "px");
  textDiv.style.top = "".concat(top, "px");
  textDiv.style.fontSize = "".concat(fontHeight, "px");
  textDiv.style.fontFamily = style.fontFamily;
  textDiv.setAttribute("role", "presentation");
  textDiv.textContent = geom.str;
  textDiv.dir = geom.dir;

  if (task._fontInspectorEnabled) {
    textDiv.dataset.fontName = geom.fontName;
  }

  if (angle !== 0) {
    textDivProperties.angle = angle * (180 / Math.PI);
  }

  var shouldScaleText = false;

  if (geom.str.length > 1 || task._enhanceTextSelection && AllWhitespaceRegexp.test(geom.str)) {
    shouldScaleText = true;
  } else if (geom.str !== " " && geom.transform[0] !== geom.transform[3]) {
    var absScaleX = Math.abs(geom.transform[0]),
        absScaleY = Math.abs(geom.transform[3]);

    if (absScaleX !== absScaleY && Math.max(absScaleX, absScaleY) / Math.min(absScaleX, absScaleY) > 1.5) {
      shouldScaleText = true;
    }
  }

  if (shouldScaleText) {
    if (style.vertical) {
      textDivProperties.canvasWidth = geom.height * task._viewport.scale;
    } else {
      textDivProperties.canvasWidth = geom.width * task._viewport.scale;
    }
  }

  task._textDivProperties.set(textDiv, textDivProperties);

  if (task._textContentStream) {
    task._layoutText(textDiv);
  }

  if (task._enhanceTextSelection && textDivProperties.hasText) {
    var angleCos = 1,
        angleSin = 0;

    if (angle !== 0) {
      angleCos = Math.cos(angle);
      angleSin = Math.sin(angle);
    }

    var divWidth = (style.vertical ? geom.height : geom.width) * task._viewport.scale;
    var divHeight = fontHeight;
    var m, b;

    if (angle !== 0) {
      m = [angleCos, angleSin, -angleSin, angleCos, left, top];
      b = _util.Util.getAxialAlignedBoundingBox([0, 0, divWidth, divHeight], m);
    } else {
      b = [left, top, left + divWidth, top + divHeight];
    }

    task._bounds.push({
      left: b[0],
      top: b[1],
      right: b[2],
      bottom: b[3],
      div: textDiv,
      size: [divWidth, divHeight],
      m: m
    });
  }
}

function render(task) {
  if (task._canceled) {
    return;
  }

  var textDivs = task._textDivs;
  var capability = task._capability;
  var textDivsLength = textDivs.length;

  if (textDivsLength > MAX_TEXT_DIVS_TO_RENDER) {
    task._renderingDone = true;
    capability.resolve();
    return;
  }

  if (!task._textContentStream) {
    for (var i = 0; i < textDivsLength; i++) {
      task._layoutText(textDivs[i]);
    }
  }

  task._renderingDone = true;
  capability.resolve();
}

function findPositiveMin(ts, offset, count) {
  var result = 0;

  for (var i = 0; i < count; i++) {
    var t = ts[offset++];

    if (t > 0) {
      result = result ? Math.min(t, result) : t;
    }
  }

  return result;
}

function expand(task) {
  var bounds = task._bounds;
  var viewport = task._viewport;
  var expanded = expandBounds(viewport.width, viewport.height, bounds);

  for (var i = 0; i < expanded.length; i++) {
    var div = bounds[i].div;

    var divProperties = task._textDivProperties.get(div);

    if (divProperties.angle === 0) {
      divProperties.paddingLeft = bounds[i].left - expanded[i].left;
      divProperties.paddingTop = bounds[i].top - expanded[i].top;
      divProperties.paddingRight = expanded[i].right - bounds[i].right;
      divProperties.paddingBottom = expanded[i].bottom - bounds[i].bottom;

      task._textDivProperties.set(div, divProperties);

      continue;
    }

    var e = expanded[i],
        b = bounds[i];
    var m = b.m,
        c = m[0],
        s = m[1];
    var points = [[0, 0], [0, b.size[1]], [b.size[0], 0], b.size];
    var ts = new Float64Array(64);

    for (var j = 0, jj = points.length; j < jj; j++) {
      var t = _util.Util.applyTransform(points[j], m);

      ts[j + 0] = c && (e.left - t[0]) / c;
      ts[j + 4] = s && (e.top - t[1]) / s;
      ts[j + 8] = c && (e.right - t[0]) / c;
      ts[j + 12] = s && (e.bottom - t[1]) / s;
      ts[j + 16] = s && (e.left - t[0]) / -s;
      ts[j + 20] = c && (e.top - t[1]) / c;
      ts[j + 24] = s && (e.right - t[0]) / -s;
      ts[j + 28] = c && (e.bottom - t[1]) / c;
      ts[j + 32] = c && (e.left - t[0]) / -c;
      ts[j + 36] = s && (e.top - t[1]) / -s;
      ts[j + 40] = c && (e.right - t[0]) / -c;
      ts[j + 44] = s && (e.bottom - t[1]) / -s;
      ts[j + 48] = s && (e.left - t[0]) / s;
      ts[j + 52] = c && (e.top - t[1]) / -c;
      ts[j + 56] = s && (e.right - t[0]) / s;
      ts[j + 60] = c && (e.bottom - t[1]) / -c;
    }

    var boxScale = 1 + Math.min(Math.abs(c), Math.abs(s));
    divProperties.paddingLeft = findPositiveMin(ts, 32, 16) / boxScale;
    divProperties.paddingTop = findPositiveMin(ts, 48, 16) / boxScale;
    divProperties.paddingRight = findPositiveMin(ts, 0, 16) / boxScale;
    divProperties.paddingBottom = findPositiveMin(ts, 16, 16) / boxScale;

    task._textDivProperties.set(div, divProperties);
  }
}

function expandBounds(width, height, boxes) {
  var bounds = boxes.map(function (box, i) {
    return {
      x1: box.left,
      y1: box.top,
      x2: box.right,
      y2: box.bottom,
      index: i,
      x1New: undefined,
      x2New: undefined
    };
  });
  expandBoundsLTR(width, bounds);
  var expanded = new Array(boxes.length);

  var _iterator = _createForOfIteratorHelper(bounds),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var b = _step.value;
      var i = b.index;
      expanded[i] = {
        left: b.x1New,
        top: 0,
        right: b.x2New,
        bottom: 0
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  boxes.map(function (box, i) {
    var e = expanded[i],
        b = bounds[i];
    b.x1 = box.top;
    b.y1 = width - e.right;
    b.x2 = box.bottom;
    b.y2 = width - e.left;
    b.index = i;
    b.x1New = undefined;
    b.x2New = undefined;
  });
  expandBoundsLTR(height, bounds);

  var _iterator2 = _createForOfIteratorHelper(bounds),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _b = _step2.value;
      var _i2 = _b.index;
      expanded[_i2].top = _b.x1New;
      expanded[_i2].bottom = _b.x2New;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return expanded;
}

function expandBoundsLTR(width, bounds) {
  bounds.sort(function (a, b) {
    return a.x1 - b.x1 || a.index - b.index;
  });
  var fakeBoundary = {
    x1: -Infinity,
    y1: -Infinity,
    x2: 0,
    y2: Infinity,
    index: -1,
    x1New: 0,
    x2New: 0
  };
  var horizon = [{
    start: -Infinity,
    end: Infinity,
    boundary: fakeBoundary
  }];

  var _iterator3 = _createForOfIteratorHelper(bounds),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var boundary = _step3.value;
      var i = 0;

      while (i < horizon.length && horizon[i].end <= boundary.y1) {
        i++;
      }

      var j = horizon.length - 1;

      while (j >= 0 && horizon[j].start >= boundary.y2) {
        j--;
      }

      var _horizonPart = void 0,
          _affectedBoundary = void 0;

      var q = void 0,
          k = void 0,
          maxXNew = -Infinity;

      for (q = i; q <= j; q++) {
        _horizonPart = horizon[q];
        _affectedBoundary = _horizonPart.boundary;
        var xNew = void 0;

        if (_affectedBoundary.x2 > boundary.x1) {
          xNew = _affectedBoundary.index > boundary.index ? _affectedBoundary.x1New : boundary.x1;
        } else if (_affectedBoundary.x2New === undefined) {
          xNew = (_affectedBoundary.x2 + boundary.x1) / 2;
        } else {
          xNew = _affectedBoundary.x2New;
        }

        if (xNew > maxXNew) {
          maxXNew = xNew;
        }
      }

      boundary.x1New = maxXNew;

      for (q = i; q <= j; q++) {
        _horizonPart = horizon[q];
        _affectedBoundary = _horizonPart.boundary;

        if (_affectedBoundary.x2New === undefined) {
          if (_affectedBoundary.x2 > boundary.x1) {
            if (_affectedBoundary.index > boundary.index) {
              _affectedBoundary.x2New = _affectedBoundary.x2;
            }
          } else {
            _affectedBoundary.x2New = maxXNew;
          }
        } else if (_affectedBoundary.x2New > maxXNew) {
          _affectedBoundary.x2New = Math.max(maxXNew, _affectedBoundary.x2);
        }
      }

      var changedHorizon = [];
      var lastBoundary = null;

      for (q = i; q <= j; q++) {
        _horizonPart = horizon[q];
        _affectedBoundary = _horizonPart.boundary;
        var useBoundary = _affectedBoundary.x2 > boundary.x2 ? _affectedBoundary : boundary;

        if (lastBoundary === useBoundary) {
          changedHorizon[changedHorizon.length - 1].end = _horizonPart.end;
        } else {
          changedHorizon.push({
            start: _horizonPart.start,
            end: _horizonPart.end,
            boundary: useBoundary
          });
          lastBoundary = useBoundary;
        }
      }

      if (horizon[i].start < boundary.y1) {
        changedHorizon[0].start = boundary.y1;
        changedHorizon.unshift({
          start: horizon[i].start,
          end: boundary.y1,
          boundary: horizon[i].boundary
        });
      }

      if (boundary.y2 < horizon[j].end) {
        changedHorizon[changedHorizon.length - 1].end = boundary.y2;
        changedHorizon.push({
          start: boundary.y2,
          end: horizon[j].end,
          boundary: horizon[j].boundary
        });
      }

      for (q = i; q <= j; q++) {
        _horizonPart = horizon[q];
        _affectedBoundary = _horizonPart.boundary;

        if (_affectedBoundary.x2New !== undefined) {
          continue;
        }

        var used = false;

        for (k = i - 1; !used && k >= 0 && horizon[k].start >= _affectedBoundary.y1; k--) {
          used = horizon[k].boundary === _affectedBoundary;
        }

        for (k = j + 1; !used && k < horizon.length && horizon[k].end <= _affectedBoundary.y2; k++) {
          used = horizon[k].boundary === _affectedBoundary;
        }

        for (k = 0; !used && k < changedHorizon.length; k++) {
          used = changedHorizon[k].boundary === _affectedBoundary;
        }

        if (!used) {
          _affectedBoundary.x2New = maxXNew;
        }
      }

      Array.prototype.splice.apply(horizon, [i, j - i + 1].concat(changedHorizon));
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  for (var _i3 = 0, _horizon = horizon; _i3 < _horizon.length; _i3++) {
    var horizonPart = _horizon[_i3];
    var affectedBoundary = horizonPart.boundary;

    if (affectedBoundary.x2New === undefined) {
      affectedBoundary.x2New = Math.max(width, affectedBoundary.x2);
    }
  }
}

var TextLayerRenderTask = /*#__PURE__*/function () {
  function TextLayerRenderTask(_ref) {
    var _globalThis$FontInspe,
        _this = this;

    var textContent = _ref.textContent,
        textContentStream = _ref.textContentStream,
        container = _ref.container,
        viewport = _ref.viewport,
        textDivs = _ref.textDivs,
        textContentItemsStr = _ref.textContentItemsStr,
        enhanceTextSelection = _ref.enhanceTextSelection;

    _classCallCheck(this, TextLayerRenderTask);

    this._textContent = textContent;
    this._textContentStream = textContentStream;
    this._container = container;
    this._document = container.ownerDocument;
    this._viewport = viewport;
    this._textDivs = textDivs || [];
    this._textContentItemsStr = textContentItemsStr || [];
    this._enhanceTextSelection = !!enhanceTextSelection;
    this._fontInspectorEnabled = !!((_globalThis$FontInspe = globalThis.FontInspector) !== null && _globalThis$FontInspe !== void 0 && _globalThis$FontInspe.enabled);
    this._reader = null;
    this._layoutTextLastFontSize = null;
    this._layoutTextLastFontFamily = null;
    this._layoutTextCtx = null;
    this._textDivProperties = new WeakMap();
    this._renderingDone = false;
    this._canceled = false;
    this._capability = (0, _util.createPromiseCapability)();
    this._renderTimer = null;
    this._bounds = [];

    this._capability.promise["finally"](function () {
      if (!_this._enhanceTextSelection) {
        _this._textDivProperties = null;
      }

      if (_this._layoutTextCtx) {
        _this._layoutTextCtx.canvas.width = 0;
        _this._layoutTextCtx.canvas.height = 0;
        _this._layoutTextCtx = null;
      }
    })["catch"](function () {});
  }

  _createClass(TextLayerRenderTask, [{
    key: "promise",
    get: function get() {
      return this._capability.promise;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this._canceled = true;

      if (this._reader) {
        this._reader.cancel(new _util.AbortException("TextLayer task cancelled."))["catch"](function () {});

        this._reader = null;
      }

      if (this._renderTimer !== null) {
        clearTimeout(this._renderTimer);
        this._renderTimer = null;
      }

      this._capability.reject(new Error("TextLayer task cancelled."));
    }
  }, {
    key: "_processItems",
    value: function _processItems(items, styleCache) {
      for (var i = 0, len = items.length; i < len; i++) {
        if (items[i].str === undefined) {
          if (items[i].type === "beginMarkedContentProps" || items[i].type === "beginMarkedContent") {
            var parent = this._container;
            this._container = document.createElement("span");

            this._container.classList.add("markedContent");

            if (items[i].id !== null) {
              this._container.setAttribute("id", "".concat(items[i].id));
            }

            parent.appendChild(this._container);
          } else if (items[i].type === "endMarkedContent") {
            this._container = this._container.parentNode;
          }

          continue;
        }

        this._textContentItemsStr.push(items[i].str);

        appendText(this, items[i], styleCache, this._layoutTextCtx);
      }
    }
  }, {
    key: "_layoutText",
    value: function _layoutText(textDiv) {
      var textDivProperties = this._textDivProperties.get(textDiv);

      var transform = "";

      if (textDivProperties.canvasWidth !== 0 && textDivProperties.hasText) {
        var _textDiv$style = textDiv.style,
            fontSize = _textDiv$style.fontSize,
            fontFamily = _textDiv$style.fontFamily;

        if (fontSize !== this._layoutTextLastFontSize || fontFamily !== this._layoutTextLastFontFamily) {
          this._layoutTextCtx.font = "".concat(fontSize, " ").concat(fontFamily);
          this._layoutTextLastFontSize = fontSize;
          this._layoutTextLastFontFamily = fontFamily;
        }

        var _this$_layoutTextCtx$ = this._layoutTextCtx.measureText(textDiv.textContent),
            width = _this$_layoutTextCtx$.width;

        if (width > 0) {
          var scale = textDivProperties.canvasWidth / width;

          if (this._enhanceTextSelection) {
            textDivProperties.scale = scale;
          }

          transform = "scaleX(".concat(scale, ")");
        }
      }

      if (textDivProperties.angle !== 0) {
        transform = "rotate(".concat(textDivProperties.angle, "deg) ").concat(transform);
      }

      if (transform.length > 0) {
        if (this._enhanceTextSelection) {
          textDivProperties.originalTransform = transform;
        }

        textDiv.style.transform = transform;
      }

      if (textDivProperties.hasText) {
        this._container.appendChild(textDiv);
      }

      if (textDivProperties.hasEOL) {
        var br = document.createElement("br");
        br.setAttribute("role", "presentation");

        this._container.appendChild(br);
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this2 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var capability = (0, _util.createPromiseCapability)();
      var styleCache = Object.create(null);

      var canvas = this._document.createElement("canvas");

      canvas.height = canvas.width = DEFAULT_FONT_SIZE;
      canvas.mozOpaque = true;
      this._layoutTextCtx = canvas.getContext("2d", {
        alpha: false
      });

      if (this._textContent) {
        var textItems = this._textContent.items;
        var textStyles = this._textContent.styles;

        this._processItems(textItems, textStyles);

        capability.resolve();
      } else if (this._textContentStream) {
        var pump = function pump() {
          _this2._reader.read().then(function (_ref2) {
            var value = _ref2.value,
                done = _ref2.done;

            if (done) {
              capability.resolve();
              return;
            }

            Object.assign(styleCache, value.styles);

            _this2._processItems(value.items, styleCache);

            pump();
          }, capability.reject);
        };

        this._reader = this._textContentStream.getReader();
        pump();
      } else {
        throw new Error('Neither "textContent" nor "textContentStream" parameters specified.');
      }

      capability.promise.then(function () {
        styleCache = null;

        if (!timeout) {
          render(_this2);
        } else {
          _this2._renderTimer = setTimeout(function () {
            render(_this2);
            _this2._renderTimer = null;
          }, timeout);
        }
      }, this._capability.reject);
    }
  }, {
    key: "expandTextDivs",
    value: function expandTextDivs() {
      var expandDivs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this._enhanceTextSelection || !this._renderingDone) {
        return;
      }

      if (this._bounds !== null) {
        expand(this);
        this._bounds = null;
      }

      var transformBuf = [],
          paddingBuf = [];

      for (var i = 0, ii = this._textDivs.length; i < ii; i++) {
        var div = this._textDivs[i];

        var divProps = this._textDivProperties.get(div);

        if (!divProps.hasText) {
          continue;
        }

        if (expandDivs) {
          transformBuf.length = 0;
          paddingBuf.length = 0;

          if (divProps.originalTransform) {
            transformBuf.push(divProps.originalTransform);
          }

          if (divProps.paddingTop > 0) {
            paddingBuf.push("".concat(divProps.paddingTop, "px"));
            transformBuf.push("translateY(".concat(-divProps.paddingTop, "px)"));
          } else {
            paddingBuf.push(0);
          }

          if (divProps.paddingRight > 0) {
            paddingBuf.push("".concat(divProps.paddingRight / divProps.scale, "px"));
          } else {
            paddingBuf.push(0);
          }

          if (divProps.paddingBottom > 0) {
            paddingBuf.push("".concat(divProps.paddingBottom, "px"));
          } else {
            paddingBuf.push(0);
          }

          if (divProps.paddingLeft > 0) {
            paddingBuf.push("".concat(divProps.paddingLeft / divProps.scale, "px"));
            transformBuf.push("translateX(".concat(-divProps.paddingLeft / divProps.scale, "px)"));
          } else {
            paddingBuf.push(0);
          }

          div.style.padding = paddingBuf.join(" ");

          if (transformBuf.length) {
            div.style.transform = transformBuf.join(" ");
          }
        } else {
          div.style.padding = null;
          div.style.transform = divProps.originalTransform;
        }
      }
    }
  }]);

  return TextLayerRenderTask;
}();

function renderTextLayer(renderParameters) {
  var task = new TextLayerRenderTask({
    textContent: renderParameters.textContent,
    textContentStream: renderParameters.textContentStream,
    container: renderParameters.container,
    viewport: renderParameters.viewport,
    textDivs: renderParameters.textDivs,
    textContentItemsStr: renderParameters.textContentItemsStr,
    enhanceTextSelection: renderParameters.enhanceTextSelection
  });

  task._render(renderParameters.timeout);

  return task;
}