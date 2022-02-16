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
exports.OperatorList = void 0;

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

function addState(parentState, pattern, checkFn, iterateFn, processFn) {
  var state = parentState;

  for (var i = 0, ii = pattern.length - 1; i < ii; i++) {
    var item = pattern[i];
    state = state[item] || (state[item] = []);
  }

  state[pattern[pattern.length - 1]] = {
    checkFn: checkFn,
    iterateFn: iterateFn,
    processFn: processFn
  };
}

function handlePaintSolidColorImageMask(iFirstSave, count, fnArray, argsArray) {
  var iFirstPIMXO = iFirstSave + 2;
  var i;

  for (i = 0; i < count; i++) {
    var arg = argsArray[iFirstPIMXO + 4 * i];
    var imageMask = arg.length === 1 && arg[0];

    if (imageMask && imageMask.width === 1 && imageMask.height === 1 && (!imageMask.data.length || imageMask.data.length === 1 && imageMask.data[0] === 0)) {
      fnArray[iFirstPIMXO + 4 * i] = _util.OPS.paintSolidColorImageMask;
      continue;
    }

    break;
  }

  return count - i;
}

var InitialState = [];
addState(InitialState, [_util.OPS.save, _util.OPS.transform, _util.OPS.paintInlineImageXObject, _util.OPS.restore], null, function iterateInlineImageGroup(context, i) {
  var fnArray = context.fnArray;
  var iFirstSave = context.iCurr - 3;
  var pos = (i - iFirstSave) % 4;

  switch (pos) {
    case 0:
      return fnArray[i] === _util.OPS.save;

    case 1:
      return fnArray[i] === _util.OPS.transform;

    case 2:
      return fnArray[i] === _util.OPS.paintInlineImageXObject;

    case 3:
      return fnArray[i] === _util.OPS.restore;
  }

  throw new Error("iterateInlineImageGroup - invalid pos: ".concat(pos));
}, function foundInlineImageGroup(context, i) {
  var MIN_IMAGES_IN_INLINE_IMAGES_BLOCK = 10;
  var MAX_IMAGES_IN_INLINE_IMAGES_BLOCK = 200;
  var MAX_WIDTH = 1000;
  var IMAGE_PADDING = 1;
  var fnArray = context.fnArray,
      argsArray = context.argsArray;
  var curr = context.iCurr;
  var iFirstSave = curr - 3;
  var iFirstTransform = curr - 2;
  var iFirstPIIXO = curr - 1;
  var count = Math.min(Math.floor((i - iFirstSave) / 4), MAX_IMAGES_IN_INLINE_IMAGES_BLOCK);

  if (count < MIN_IMAGES_IN_INLINE_IMAGES_BLOCK) {
    return i - (i - iFirstSave) % 4;
  }

  var maxX = 0;
  var map = [];
  var maxLineHeight = 0;
  var currentX = IMAGE_PADDING,
      currentY = IMAGE_PADDING;

  for (var q = 0; q < count; q++) {
    var transform = argsArray[iFirstTransform + (q << 2)];
    var img = argsArray[iFirstPIIXO + (q << 2)][0];

    if (currentX + img.width > MAX_WIDTH) {
      maxX = Math.max(maxX, currentX);
      currentY += maxLineHeight + 2 * IMAGE_PADDING;
      currentX = 0;
      maxLineHeight = 0;
    }

    map.push({
      transform: transform,
      x: currentX,
      y: currentY,
      w: img.width,
      h: img.height
    });
    currentX += img.width + 2 * IMAGE_PADDING;
    maxLineHeight = Math.max(maxLineHeight, img.height);
  }

  var imgWidth = Math.max(maxX, currentX) + IMAGE_PADDING;
  var imgHeight = currentY + maxLineHeight + IMAGE_PADDING;
  var imgData = new Uint8ClampedArray(imgWidth * imgHeight * 4);
  var imgRowSize = imgWidth << 2;

  for (var _q = 0; _q < count; _q++) {
    var data = argsArray[iFirstPIIXO + (_q << 2)][0].data;
    var rowSize = map[_q].w << 2;
    var dataOffset = 0;
    var offset = map[_q].x + map[_q].y * imgWidth << 2;
    imgData.set(data.subarray(0, rowSize), offset - imgRowSize);

    for (var k = 0, kk = map[_q].h; k < kk; k++) {
      imgData.set(data.subarray(dataOffset, dataOffset + rowSize), offset);
      dataOffset += rowSize;
      offset += imgRowSize;
    }

    imgData.set(data.subarray(dataOffset - rowSize, dataOffset), offset);

    while (offset >= 0) {
      data[offset - 4] = data[offset];
      data[offset - 3] = data[offset + 1];
      data[offset - 2] = data[offset + 2];
      data[offset - 1] = data[offset + 3];
      data[offset + rowSize] = data[offset + rowSize - 4];
      data[offset + rowSize + 1] = data[offset + rowSize - 3];
      data[offset + rowSize + 2] = data[offset + rowSize - 2];
      data[offset + rowSize + 3] = data[offset + rowSize - 1];
      offset -= imgRowSize;
    }
  }

  fnArray.splice(iFirstSave, count * 4, _util.OPS.paintInlineImageXObjectGroup);
  argsArray.splice(iFirstSave, count * 4, [{
    width: imgWidth,
    height: imgHeight,
    kind: _util.ImageKind.RGBA_32BPP,
    data: imgData
  }, map]);
  return iFirstSave + 1;
});
addState(InitialState, [_util.OPS.save, _util.OPS.transform, _util.OPS.paintImageMaskXObject, _util.OPS.restore], null, function iterateImageMaskGroup(context, i) {
  var fnArray = context.fnArray;
  var iFirstSave = context.iCurr - 3;
  var pos = (i - iFirstSave) % 4;

  switch (pos) {
    case 0:
      return fnArray[i] === _util.OPS.save;

    case 1:
      return fnArray[i] === _util.OPS.transform;

    case 2:
      return fnArray[i] === _util.OPS.paintImageMaskXObject;

    case 3:
      return fnArray[i] === _util.OPS.restore;
  }

  throw new Error("iterateImageMaskGroup - invalid pos: ".concat(pos));
}, function foundImageMaskGroup(context, i) {
  var MIN_IMAGES_IN_MASKS_BLOCK = 10;
  var MAX_IMAGES_IN_MASKS_BLOCK = 100;
  var MAX_SAME_IMAGES_IN_MASKS_BLOCK = 1000;
  var fnArray = context.fnArray,
      argsArray = context.argsArray;
  var curr = context.iCurr;
  var iFirstSave = curr - 3;
  var iFirstTransform = curr - 2;
  var iFirstPIMXO = curr - 1;
  var count = Math.floor((i - iFirstSave) / 4);
  count = handlePaintSolidColorImageMask(iFirstSave, count, fnArray, argsArray);

  if (count < MIN_IMAGES_IN_MASKS_BLOCK) {
    return i - (i - iFirstSave) % 4;
  }

  var isSameImage = false;
  var iTransform, transformArgs;
  var firstPIMXOArg0 = argsArray[iFirstPIMXO][0];
  var firstTransformArg0 = argsArray[iFirstTransform][0],
      firstTransformArg1 = argsArray[iFirstTransform][1],
      firstTransformArg2 = argsArray[iFirstTransform][2],
      firstTransformArg3 = argsArray[iFirstTransform][3];

  if (firstTransformArg1 === firstTransformArg2) {
    isSameImage = true;
    iTransform = iFirstTransform + 4;
    var iPIMXO = iFirstPIMXO + 4;

    for (var q = 1; q < count; q++, iTransform += 4, iPIMXO += 4) {
      transformArgs = argsArray[iTransform];

      if (argsArray[iPIMXO][0] !== firstPIMXOArg0 || transformArgs[0] !== firstTransformArg0 || transformArgs[1] !== firstTransformArg1 || transformArgs[2] !== firstTransformArg2 || transformArgs[3] !== firstTransformArg3) {
        if (q < MIN_IMAGES_IN_MASKS_BLOCK) {
          isSameImage = false;
        } else {
          count = q;
        }

        break;
      }
    }
  }

  if (isSameImage) {
    count = Math.min(count, MAX_SAME_IMAGES_IN_MASKS_BLOCK);
    var positions = new Float32Array(count * 2);
    iTransform = iFirstTransform;

    for (var _q2 = 0; _q2 < count; _q2++, iTransform += 4) {
      transformArgs = argsArray[iTransform];
      positions[_q2 << 1] = transformArgs[4];
      positions[(_q2 << 1) + 1] = transformArgs[5];
    }

    fnArray.splice(iFirstSave, count * 4, _util.OPS.paintImageMaskXObjectRepeat);
    argsArray.splice(iFirstSave, count * 4, [firstPIMXOArg0, firstTransformArg0, firstTransformArg1, firstTransformArg2, firstTransformArg3, positions]);
  } else {
    count = Math.min(count, MAX_IMAGES_IN_MASKS_BLOCK);
    var images = [];

    for (var _q3 = 0; _q3 < count; _q3++) {
      transformArgs = argsArray[iFirstTransform + (_q3 << 2)];
      var maskParams = argsArray[iFirstPIMXO + (_q3 << 2)][0];
      images.push({
        data: maskParams.data,
        width: maskParams.width,
        height: maskParams.height,
        transform: transformArgs
      });
    }

    fnArray.splice(iFirstSave, count * 4, _util.OPS.paintImageMaskXObjectGroup);
    argsArray.splice(iFirstSave, count * 4, [images]);
  }

  return iFirstSave + 1;
});
addState(InitialState, [_util.OPS.save, _util.OPS.transform, _util.OPS.paintImageXObject, _util.OPS.restore], function (context) {
  var argsArray = context.argsArray;
  var iFirstTransform = context.iCurr - 2;
  return argsArray[iFirstTransform][1] === 0 && argsArray[iFirstTransform][2] === 0;
}, function iterateImageGroup(context, i) {
  var fnArray = context.fnArray,
      argsArray = context.argsArray;
  var iFirstSave = context.iCurr - 3;
  var pos = (i - iFirstSave) % 4;

  switch (pos) {
    case 0:
      return fnArray[i] === _util.OPS.save;

    case 1:
      if (fnArray[i] !== _util.OPS.transform) {
        return false;
      }

      var iFirstTransform = context.iCurr - 2;
      var firstTransformArg0 = argsArray[iFirstTransform][0];
      var firstTransformArg3 = argsArray[iFirstTransform][3];

      if (argsArray[i][0] !== firstTransformArg0 || argsArray[i][1] !== 0 || argsArray[i][2] !== 0 || argsArray[i][3] !== firstTransformArg3) {
        return false;
      }

      return true;

    case 2:
      if (fnArray[i] !== _util.OPS.paintImageXObject) {
        return false;
      }

      var iFirstPIXO = context.iCurr - 1;
      var firstPIXOArg0 = argsArray[iFirstPIXO][0];

      if (argsArray[i][0] !== firstPIXOArg0) {
        return false;
      }

      return true;

    case 3:
      return fnArray[i] === _util.OPS.restore;
  }

  throw new Error("iterateImageGroup - invalid pos: ".concat(pos));
}, function (context, i) {
  var MIN_IMAGES_IN_BLOCK = 3;
  var MAX_IMAGES_IN_BLOCK = 1000;
  var fnArray = context.fnArray,
      argsArray = context.argsArray;
  var curr = context.iCurr;
  var iFirstSave = curr - 3;
  var iFirstTransform = curr - 2;
  var iFirstPIXO = curr - 1;
  var firstPIXOArg0 = argsArray[iFirstPIXO][0];
  var firstTransformArg0 = argsArray[iFirstTransform][0];
  var firstTransformArg3 = argsArray[iFirstTransform][3];
  var count = Math.min(Math.floor((i - iFirstSave) / 4), MAX_IMAGES_IN_BLOCK);

  if (count < MIN_IMAGES_IN_BLOCK) {
    return i - (i - iFirstSave) % 4;
  }

  var positions = new Float32Array(count * 2);
  var iTransform = iFirstTransform;

  for (var q = 0; q < count; q++, iTransform += 4) {
    var transformArgs = argsArray[iTransform];
    positions[q << 1] = transformArgs[4];
    positions[(q << 1) + 1] = transformArgs[5];
  }

  var args = [firstPIXOArg0, firstTransformArg0, firstTransformArg3, positions];
  fnArray.splice(iFirstSave, count * 4, _util.OPS.paintImageXObjectRepeat);
  argsArray.splice(iFirstSave, count * 4, args);
  return iFirstSave + 1;
});
addState(InitialState, [_util.OPS.beginText, _util.OPS.setFont, _util.OPS.setTextMatrix, _util.OPS.showText, _util.OPS.endText], null, function iterateShowTextGroup(context, i) {
  var fnArray = context.fnArray,
      argsArray = context.argsArray;
  var iFirstSave = context.iCurr - 4;
  var pos = (i - iFirstSave) % 5;

  switch (pos) {
    case 0:
      return fnArray[i] === _util.OPS.beginText;

    case 1:
      return fnArray[i] === _util.OPS.setFont;

    case 2:
      return fnArray[i] === _util.OPS.setTextMatrix;

    case 3:
      if (fnArray[i] !== _util.OPS.showText) {
        return false;
      }

      var iFirstSetFont = context.iCurr - 3;
      var firstSetFontArg0 = argsArray[iFirstSetFont][0];
      var firstSetFontArg1 = argsArray[iFirstSetFont][1];

      if (argsArray[i][0] !== firstSetFontArg0 || argsArray[i][1] !== firstSetFontArg1) {
        return false;
      }

      return true;

    case 4:
      return fnArray[i] === _util.OPS.endText;
  }

  throw new Error("iterateShowTextGroup - invalid pos: ".concat(pos));
}, function (context, i) {
  var MIN_CHARS_IN_BLOCK = 3;
  var MAX_CHARS_IN_BLOCK = 1000;
  var fnArray = context.fnArray,
      argsArray = context.argsArray;
  var curr = context.iCurr;
  var iFirstBeginText = curr - 4;
  var iFirstSetFont = curr - 3;
  var iFirstSetTextMatrix = curr - 2;
  var iFirstShowText = curr - 1;
  var iFirstEndText = curr;
  var firstSetFontArg0 = argsArray[iFirstSetFont][0];
  var firstSetFontArg1 = argsArray[iFirstSetFont][1];
  var count = Math.min(Math.floor((i - iFirstBeginText) / 5), MAX_CHARS_IN_BLOCK);

  if (count < MIN_CHARS_IN_BLOCK) {
    return i - (i - iFirstBeginText) % 5;
  }

  var iFirst = iFirstBeginText;

  if (iFirstBeginText >= 4 && fnArray[iFirstBeginText - 4] === fnArray[iFirstSetFont] && fnArray[iFirstBeginText - 3] === fnArray[iFirstSetTextMatrix] && fnArray[iFirstBeginText - 2] === fnArray[iFirstShowText] && fnArray[iFirstBeginText - 1] === fnArray[iFirstEndText] && argsArray[iFirstBeginText - 4][0] === firstSetFontArg0 && argsArray[iFirstBeginText - 4][1] === firstSetFontArg1) {
    count++;
    iFirst -= 5;
  }

  var iEndText = iFirst + 4;

  for (var q = 1; q < count; q++) {
    fnArray.splice(iEndText, 3);
    argsArray.splice(iEndText, 3);
    iEndText += 2;
  }

  return iEndText + 1;
});

var NullOptimizer = /*#__PURE__*/function () {
  function NullOptimizer(queue) {
    _classCallCheck(this, NullOptimizer);

    this.queue = queue;
  }

  _createClass(NullOptimizer, [{
    key: "_optimize",
    value: function _optimize() {}
  }, {
    key: "push",
    value: function push(fn, args) {
      this.queue.fnArray.push(fn);
      this.queue.argsArray.push(args);

      this._optimize();
    }
  }, {
    key: "flush",
    value: function flush() {}
  }, {
    key: "reset",
    value: function reset() {}
  }]);

  return NullOptimizer;
}();

var QueueOptimizer = /*#__PURE__*/function (_NullOptimizer) {
  _inherits(QueueOptimizer, _NullOptimizer);

  var _super = _createSuper(QueueOptimizer);

  function QueueOptimizer(queue) {
    var _this;

    _classCallCheck(this, QueueOptimizer);

    _this = _super.call(this, queue);
    _this.state = null;
    _this.context = {
      iCurr: 0,
      fnArray: queue.fnArray,
      argsArray: queue.argsArray
    };
    _this.match = null;
    _this.lastProcessed = 0;
    return _this;
  }

  _createClass(QueueOptimizer, [{
    key: "_optimize",
    value: function _optimize() {
      var fnArray = this.queue.fnArray;
      var i = this.lastProcessed,
          ii = fnArray.length;
      var state = this.state;
      var match = this.match;

      if (!state && !match && i + 1 === ii && !InitialState[fnArray[i]]) {
        this.lastProcessed = ii;
        return;
      }

      var context = this.context;

      while (i < ii) {
        if (match) {
          var iterate = (0, match.iterateFn)(context, i);

          if (iterate) {
            i++;
            continue;
          }

          i = (0, match.processFn)(context, i + 1);
          ii = fnArray.length;
          match = null;
          state = null;

          if (i >= ii) {
            break;
          }
        }

        state = (state || InitialState)[fnArray[i]];

        if (!state || Array.isArray(state)) {
          i++;
          continue;
        }

        context.iCurr = i;
        i++;

        if (state.checkFn && !(0, state.checkFn)(context)) {
          state = null;
          continue;
        }

        match = state;
        state = null;
      }

      this.state = state;
      this.match = match;
      this.lastProcessed = i;
    }
  }, {
    key: "flush",
    value: function flush() {
      while (this.match) {
        var length = this.queue.fnArray.length;
        this.lastProcessed = (0, this.match.processFn)(this.context, length);
        this.match = null;
        this.state = null;

        this._optimize();
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.state = null;
      this.match = null;
      this.lastProcessed = 0;
    }
  }]);

  return QueueOptimizer;
}(NullOptimizer);

var OperatorList = /*#__PURE__*/function () {
  function OperatorList() {
    var intent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var streamSink = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, OperatorList);

    this._streamSink = streamSink;
    this.fnArray = [];
    this.argsArray = [];

    if (streamSink && !(intent & _util.RenderingIntentFlag.OPLIST)) {
      this.optimizer = new QueueOptimizer(this);
    } else {
      this.optimizer = new NullOptimizer(this);
    }

    this.dependencies = new Set();
    this._totalLength = 0;
    this.weight = 0;
    this._resolved = streamSink ? null : Promise.resolve();
  }

  _createClass(OperatorList, [{
    key: "length",
    get: function get() {
      return this.argsArray.length;
    }
  }, {
    key: "ready",
    get: function get() {
      return this._resolved || this._streamSink.ready;
    }
  }, {
    key: "totalLength",
    get: function get() {
      return this._totalLength + this.length;
    }
  }, {
    key: "addOp",
    value: function addOp(fn, args) {
      this.optimizer.push(fn, args);
      this.weight++;

      if (this._streamSink) {
        if (this.weight >= OperatorList.CHUNK_SIZE) {
          this.flush();
        } else if (this.weight >= OperatorList.CHUNK_SIZE_ABOUT && (fn === _util.OPS.restore || fn === _util.OPS.endText)) {
          this.flush();
        }
      }
    }
  }, {
    key: "addDependency",
    value: function addDependency(dependency) {
      if (this.dependencies.has(dependency)) {
        return;
      }

      this.dependencies.add(dependency);
      this.addOp(_util.OPS.dependency, [dependency]);
    }
  }, {
    key: "addDependencies",
    value: function addDependencies(dependencies) {
      var _iterator = _createForOfIteratorHelper(dependencies),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dependency = _step.value;
          this.addDependency(dependency);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "addOpList",
    value: function addOpList(opList) {
      if (!(opList instanceof OperatorList)) {
        (0, _util.warn)('addOpList - ignoring invalid "opList" parameter.');
        return;
      }

      var _iterator2 = _createForOfIteratorHelper(opList.dependencies),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var dependency = _step2.value;
          this.dependencies.add(dependency);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      for (var i = 0, ii = opList.length; i < ii; i++) {
        this.addOp(opList.fnArray[i], opList.argsArray[i]);
      }
    }
  }, {
    key: "getIR",
    value: function getIR() {
      return {
        fnArray: this.fnArray,
        argsArray: this.argsArray,
        length: this.length
      };
    }
  }, {
    key: "_transfers",
    get: function get() {
      var transfers = [];
      var fnArray = this.fnArray,
          argsArray = this.argsArray,
          length = this.length;

      for (var i = 0; i < length; i++) {
        switch (fnArray[i]) {
          case _util.OPS.paintInlineImageXObject:
          case _util.OPS.paintInlineImageXObjectGroup:
          case _util.OPS.paintImageMaskXObject:
            var arg = argsArray[i][0];
            {
              (0, _util.assert)(arg.data instanceof Uint8ClampedArray, 'OperatorList._transfers: Unsupported "arg.data" type.');
            }

            if (!arg.cached) {
              transfers.push(arg.data.buffer);
            }

            break;
        }
      }

      return transfers;
    }
  }, {
    key: "flush",
    value: function flush() {
      var lastChunk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.optimizer.flush();
      var length = this.length;
      this._totalLength += length;

      this._streamSink.enqueue({
        fnArray: this.fnArray,
        argsArray: this.argsArray,
        lastChunk: lastChunk,
        length: length
      }, 1, this._transfers);

      this.dependencies.clear();
      this.fnArray.length = 0;
      this.argsArray.length = 0;
      this.weight = 0;
      this.optimizer.reset();
    }
  }], [{
    key: "CHUNK_SIZE",
    get: function get() {
      return (0, _util.shadow)(this, "CHUNK_SIZE", 1000);
    }
  }, {
    key: "CHUNK_SIZE_ABOUT",
    get: function get() {
      return (0, _util.shadow)(this, "CHUNK_SIZE_ABOUT", this.CHUNK_SIZE - 5);
    }
  }]);

  return OperatorList;
}();

exports.OperatorList = OperatorList;