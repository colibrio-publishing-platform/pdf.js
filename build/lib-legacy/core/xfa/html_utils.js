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
exports.computeBbox = computeBbox;
exports.createWrapper = createWrapper;
exports.fixDimensions = fixDimensions;
exports.fixTextIndent = fixTextIndent;
exports.fixURL = fixURL;
exports.isPrintOnly = isPrintOnly;
exports.layoutClass = layoutClass;
exports.layoutNode = layoutNode;
exports.measureToString = measureToString;
exports.setAccess = setAccess;
exports.setFontFamily = setFontFamily;
exports.setMinMaxDimensions = setMinMaxDimensions;
exports.setPara = setPara;
exports.toStyle = toStyle;

var _xfa_object = require("./xfa_object.js");

var _util = require("../../shared/util.js");

var _utils = require("./utils.js");

var _fonts = require("./fonts.js");

var _text = require("./text.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function measureToString(m) {
  if (typeof m === "string") {
    return "0px";
  }

  return Number.isInteger(m) ? "".concat(m, "px") : "".concat(m.toFixed(2), "px");
}

var converters = {
  anchorType: function anchorType(node, style) {
    var parent = node[_xfa_object.$getSubformParent]();

    if (!parent || parent.layout && parent.layout !== "position") {
      return;
    }

    if (!("transform" in style)) {
      style.transform = "";
    }

    switch (node.anchorType) {
      case "bottomCenter":
        style.transform += "translate(-50%, -100%)";
        break;

      case "bottomLeft":
        style.transform += "translate(0,-100%)";
        break;

      case "bottomRight":
        style.transform += "translate(-100%,-100%)";
        break;

      case "middleCenter":
        style.transform += "translate(-50%,-50%)";
        break;

      case "middleLeft":
        style.transform += "translate(0,-50%)";
        break;

      case "middleRight":
        style.transform += "translate(-100%,-50%)";
        break;

      case "topCenter":
        style.transform += "translate(-50%,0)";
        break;

      case "topRight":
        style.transform += "translate(-100%,0)";
        break;
    }
  },
  dimensions: function dimensions(node, style) {
    var parent = node[_xfa_object.$getSubformParent]();

    var width = node.w;
    var height = node.h;

    if (parent.layout && parent.layout.includes("row")) {
      var extra = parent[_xfa_object.$extra];
      var colSpan = node.colSpan;
      var w;

      if (colSpan === -1) {
        w = extra.columnWidths.slice(extra.currentColumn).reduce(function (a, x) {
          return a + x;
        }, 0);
        extra.currentColumn = 0;
      } else {
        w = extra.columnWidths.slice(extra.currentColumn, extra.currentColumn + colSpan).reduce(function (a, x) {
          return a + x;
        }, 0);
        extra.currentColumn = (extra.currentColumn + node.colSpan) % extra.columnWidths.length;
      }

      if (!isNaN(w)) {
        width = node.w = w;
      }
    }

    if (width !== "") {
      style.width = measureToString(width);
    } else {
      style.width = "auto";
    }

    if (height !== "") {
      style.height = measureToString(height);
    } else {
      style.height = "auto";
    }
  },
  position: function position(node, style) {
    var parent = node[_xfa_object.$getSubformParent]();

    if (parent && parent.layout && parent.layout !== "position") {
      return;
    }

    style.position = "absolute";
    style.left = measureToString(node.x);
    style.top = measureToString(node.y);
  },
  rotate: function rotate(node, style) {
    if (node.rotate) {
      if (!("transform" in style)) {
        style.transform = "";
      }

      style.transform += "rotate(-".concat(node.rotate, "deg)");
      style.transformOrigin = "top left";
    }
  },
  presence: function presence(node, style) {
    switch (node.presence) {
      case "invisible":
        style.visibility = "hidden";
        break;

      case "hidden":
      case "inactive":
        style.display = "none";
        break;
    }
  },
  hAlign: function hAlign(node, style) {
    if (node[_xfa_object.$nodeName] === "para") {
      switch (node.hAlign) {
        case "justifyAll":
          style.textAlign = "justify-all";
          break;

        case "radix":
          style.textAlign = "left";
          break;

        default:
          style.textAlign = node.hAlign;
      }
    } else {
      switch (node.hAlign) {
        case "left":
          style.alignSelf = "start";
          break;

        case "center":
          style.alignSelf = "center";
          break;

        case "right":
          style.alignSelf = "end";
          break;
      }
    }
  },
  margin: function margin(node, style) {
    if (node.margin) {
      style.margin = node.margin[_xfa_object.$toStyle]().margin;
    }
  }
};

function setMinMaxDimensions(node, style) {
  var parent = node[_xfa_object.$getSubformParent]();

  if (parent.layout === "position") {
    if (node.minW > 0) {
      style.minWidth = measureToString(node.minW);
    }

    if (node.maxW > 0) {
      style.maxWidth = measureToString(node.maxW);
    }

    if (node.minH > 0) {
      style.minHeight = measureToString(node.minH);
    }

    if (node.maxH > 0) {
      style.maxHeight = measureToString(node.maxH);
    }
  }
}

function layoutText(text, xfaFont, margin, lineHeight, fontFinder, width) {
  var measure = new _text.TextMeasure(xfaFont, margin, lineHeight, fontFinder);

  if (typeof text === "string") {
    measure.addString(text);
  } else {
    text[_xfa_object.$pushGlyphs](measure);
  }

  return measure.compute(width);
}

function layoutNode(node, availableSpace) {
  var height = null;
  var width = null;
  var isBroken = false;

  if ((!node.w || !node.h) && node.value) {
    var marginH = 0;
    var marginV = 0;

    if (node.margin) {
      marginH = node.margin.leftInset + node.margin.rightInset;
      marginV = node.margin.topInset + node.margin.bottomInset;
    }

    var lineHeight = null;
    var margin = null;

    if (node.para) {
      margin = Object.create(null);
      lineHeight = node.para.lineHeight === "" ? null : node.para.lineHeight;
      margin.top = node.para.spaceAbove === "" ? 0 : node.para.spaceAbove;
      margin.bottom = node.para.spaceBelow === "" ? 0 : node.para.spaceBelow;
      margin.left = node.para.marginLeft === "" ? 0 : node.para.marginLeft;
      margin.right = node.para.marginRight === "" ? 0 : node.para.marginRight;
    }

    var font = node.font;

    if (!font) {
      var root = node[_xfa_object.$getTemplateRoot]();

      var parent = node[_xfa_object.$getParent]();

      while (parent && parent !== root) {
        if (parent.font) {
          font = parent.font;
          break;
        }

        parent = parent[_xfa_object.$getParent]();
      }
    }

    var maxWidth = (!node.w ? availableSpace.width : node.w) - marginH;
    var fontFinder = node[_xfa_object.$globalData].fontFinder;

    if (node.value.exData && node.value.exData[_xfa_object.$content] && node.value.exData.contentType === "text/html") {
      var res = layoutText(node.value.exData[_xfa_object.$content], font, margin, lineHeight, fontFinder, maxWidth);
      width = res.width;
      height = res.height;
      isBroken = res.isBroken;
    } else {
      var text = node.value[_xfa_object.$text]();

      if (text) {
        var _res = layoutText(text, font, margin, lineHeight, fontFinder, maxWidth);

        width = _res.width;
        height = _res.height;
        isBroken = _res.isBroken;
      }
    }

    if (width !== null && !node.w) {
      width += marginH;
    }

    if (height !== null && !node.h) {
      height += marginV;
    }
  }

  return {
    w: width,
    h: height,
    isBroken: isBroken
  };
}

function computeBbox(node, html, availableSpace) {
  var bbox;

  if (node.w !== "" && node.h !== "") {
    bbox = [node.x, node.y, node.w, node.h];
  } else {
    if (!availableSpace) {
      return null;
    }

    var width = node.w;

    if (width === "") {
      if (node.maxW === 0) {
        var parent = node[_xfa_object.$getSubformParent]();

        if (parent.layout === "position" && parent.w !== "") {
          width = 0;
        } else {
          width = node.minW;
        }
      } else {
        width = Math.min(node.maxW, availableSpace.width);
      }

      html.attributes.style.width = measureToString(width);
    }

    var height = node.h;

    if (height === "") {
      if (node.maxH === 0) {
        var _parent = node[_xfa_object.$getSubformParent]();

        if (_parent.layout === "position" && _parent.h !== "") {
          height = 0;
        } else {
          height = node.minH;
        }
      } else {
        height = Math.min(node.maxH, availableSpace.height);
      }

      html.attributes.style.height = measureToString(height);
    }

    bbox = [node.x, node.y, width, height];
  }

  return bbox;
}

function fixDimensions(node) {
  var parent = node[_xfa_object.$getSubformParent]();

  if (parent.layout && parent.layout.includes("row")) {
    var extra = parent[_xfa_object.$extra];
    var colSpan = node.colSpan;
    var width;

    if (colSpan === -1) {
      width = extra.columnWidths.slice(extra.currentColumn).reduce(function (a, w) {
        return a + w;
      }, 0);
    } else {
      width = extra.columnWidths.slice(extra.currentColumn, extra.currentColumn + colSpan).reduce(function (a, w) {
        return a + w;
      }, 0);
    }

    if (!isNaN(width)) {
      node.w = width;
    }
  }

  if (parent.layout && parent.layout !== "position") {
    node.x = node.y = 0;
  }

  if (node.layout === "table") {
    if (node.w === "" && Array.isArray(node.columnWidths)) {
      node.w = node.columnWidths.reduce(function (a, x) {
        return a + x;
      }, 0);
    }
  }
}

function layoutClass(node) {
  switch (node.layout) {
    case "position":
      return "xfaPosition";

    case "lr-tb":
      return "xfaLrTb";

    case "rl-row":
      return "xfaRlRow";

    case "rl-tb":
      return "xfaRlTb";

    case "row":
      return "xfaRow";

    case "table":
      return "xfaTable";

    case "tb":
      return "xfaTb";

    default:
      return "xfaPosition";
  }
}

function toStyle(node) {
  var style = Object.create(null);

  for (var _len = arguments.length, names = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _names = names; _i < _names.length; _i++) {
    var name = _names[_i];
    var value = node[name];

    if (value === null) {
      continue;
    }

    if (converters.hasOwnProperty(name)) {
      converters[name](node, style);
      continue;
    }

    if (value instanceof _xfa_object.XFAObject) {
      var newStyle = value[_xfa_object.$toStyle]();

      if (newStyle) {
        Object.assign(style, newStyle);
      } else {
        (0, _util.warn)("(DEBUG) - XFA - style for ".concat(name, " not implemented yet"));
      }
    }
  }

  return style;
}

function createWrapper(node, html) {
  var attributes = html.attributes;
  var style = attributes.style;
  var wrapper = {
    name: "div",
    attributes: {
      "class": ["xfaWrapper"],
      style: Object.create(null)
    },
    children: []
  };
  attributes["class"].push("xfaWrapped");

  if (node.border) {
    var _node$border$$extra = node.border[_xfa_object.$extra],
        widths = _node$border$$extra.widths,
        insets = _node$border$$extra.insets;
    var width, height;
    var top = insets[0];
    var left = insets[3];
    var insetsH = insets[0] + insets[2];
    var insetsW = insets[1] + insets[3];

    switch (node.border.hand) {
      case "even":
        top -= widths[0] / 2;
        left -= widths[3] / 2;
        width = "calc(100% + ".concat((widths[1] + widths[3]) / 2 - insetsW, "px)");
        height = "calc(100% + ".concat((widths[0] + widths[2]) / 2 - insetsH, "px)");
        break;

      case "left":
        top -= widths[0];
        left -= widths[3];
        width = "calc(100% + ".concat(widths[1] + widths[3] - insetsW, "px)");
        height = "calc(100% + ".concat(widths[0] + widths[2] - insetsH, "px)");
        break;

      case "right":
        width = insetsW ? "calc(100% - ".concat(insetsW, "px)") : "100%";
        height = insetsH ? "calc(100% - ".concat(insetsH, "px)") : "100%";
        break;
    }

    var classNames = ["xfaBorder"];

    if (isPrintOnly(node.border)) {
      classNames.push("xfaPrintOnly");
    }

    var border = {
      name: "div",
      attributes: {
        "class": classNames,
        style: {
          top: "".concat(top, "px"),
          left: "".concat(left, "px"),
          width: width,
          height: height
        }
      },
      children: []
    };

    for (var _i2 = 0, _arr = ["border", "borderWidth", "borderColor", "borderRadius", "borderStyle"]; _i2 < _arr.length; _i2++) {
      var key = _arr[_i2];

      if (style[key] !== undefined) {
        border.attributes.style[key] = style[key];
        delete style[key];
      }
    }

    wrapper.children.push(border, html);
  } else {
    wrapper.children.push(html);
  }

  for (var _i3 = 0, _arr2 = ["background", "backgroundClip", "top", "left", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "transform", "transformOrigin", "visibility"]; _i3 < _arr2.length; _i3++) {
    var _key2 = _arr2[_i3];

    if (style[_key2] !== undefined) {
      wrapper.attributes.style[_key2] = style[_key2];
      delete style[_key2];
    }
  }

  if (style.position === "absolute") {
    wrapper.attributes.style.position = "absolute";
  } else {
    wrapper.attributes.style.position = "relative";
  }

  delete style.position;

  if (style.alignSelf) {
    wrapper.attributes.style.alignSelf = style.alignSelf;
    delete style.alignSelf;
  }

  return wrapper;
}

function fixTextIndent(styles) {
  var indent = (0, _utils.getMeasurement)(styles.textIndent, "0px");

  if (indent >= 0) {
    return;
  }

  var align = styles.textAlign === "right" ? "right" : "left";
  var name = "padding" + (align === "left" ? "Left" : "Right");
  var padding = (0, _utils.getMeasurement)(styles[name], "0px");
  styles[name] = "".concat(padding - indent, "px");
}

function setAccess(node, classNames) {
  switch (node.access) {
    case "nonInteractive":
      classNames.push("xfaNonInteractive");
      break;

    case "readOnly":
      classNames.push("xfaReadOnly");
      break;

    case "protected":
      classNames.push("xfaDisabled");
      break;
  }
}

function isPrintOnly(node) {
  return node.relevant.length > 0 && !node.relevant[0].excluded && node.relevant[0].viewname === "print";
}

function getCurrentPara(node) {
  var stack = node[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].paraStack;

  return stack.length ? stack[stack.length - 1] : null;
}

function setPara(node, nodeStyle, value) {
  if (value.attributes["class"] && value.attributes["class"].includes("xfaRich")) {
    if (nodeStyle) {
      if (node.h === "") {
        nodeStyle.height = "auto";
      }

      if (node.w === "") {
        nodeStyle.width = "auto";
      }
    }

    var para = getCurrentPara(node);

    if (para) {
      var valueStyle = value.attributes.style;
      valueStyle.display = "flex";
      valueStyle.flexDirection = "column";

      switch (para.vAlign) {
        case "top":
          valueStyle.justifyContent = "start";
          break;

        case "bottom":
          valueStyle.justifyContent = "end";
          break;

        case "middle":
          valueStyle.justifyContent = "center";
          break;
      }

      var paraStyle = para[_xfa_object.$toStyle]();

      for (var _i4 = 0, _Object$entries = Object.entries(paraStyle); _i4 < _Object$entries.length; _i4++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i4], 2),
            key = _Object$entries$_i[0],
            val = _Object$entries$_i[1];

        if (!(key in valueStyle)) {
          valueStyle[key] = val;
        }
      }
    }
  }
}

function setFontFamily(xfaFont, node, fontFinder, style) {
  if (!fontFinder) {
    delete style.fontFamily;
    return;
  }

  var name = (0, _utils.stripQuotes)(xfaFont.typeface);
  style.fontFamily = "\"".concat(name, "\"");
  var typeface = fontFinder.find(name);

  if (typeface) {
    var fontFamily = typeface.regular.cssFontInfo.fontFamily;

    if (fontFamily !== name) {
      style.fontFamily = "\"".concat(fontFamily, "\"");
    }

    var para = getCurrentPara(node);

    if (para && para.lineHeight !== "") {
      return;
    }

    if (style.lineHeight) {
      return;
    }

    var pdfFont = (0, _fonts.selectFont)(xfaFont, typeface);

    if (pdfFont) {
      style.lineHeight = Math.max(1.2, pdfFont.lineHeight);
    }
  }
}

function fixURL(str) {
  var absoluteUrl = (0, _util.createValidAbsoluteUrl)(str, null, {
    addDefaultProtocol: true,
    tryConvertEncoding: true
  });
  return absoluteUrl ? absoluteUrl.href : null;
}