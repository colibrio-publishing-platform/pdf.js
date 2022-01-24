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
exports.addHTML = addHTML;
exports.checkDimensions = checkDimensions;
exports.flushHTML = flushHTML;
exports.getAvailableSpace = getAvailableSpace;

var _xfa_object = require("./xfa_object.js");

var _html_utils = require("./html_utils.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function createLine(node, children) {
  return {
    name: "div",
    attributes: {
      "class": [node.layout === "lr-tb" ? "xfaLr" : "xfaRl"]
    },
    children: children
  };
}

function flushHTML(node) {
  if (!node[_xfa_object.$extra]) {
    return null;
  }

  var attributes = node[_xfa_object.$extra].attributes;
  var html = {
    name: "div",
    attributes: attributes,
    children: node[_xfa_object.$extra].children
  };

  if (node[_xfa_object.$extra].failingNode) {
    var htmlFromFailing = node[_xfa_object.$extra].failingNode[_xfa_object.$flushHTML]();

    if (htmlFromFailing) {
      if (node.layout.endsWith("-tb")) {
        html.children.push(createLine(node, [htmlFromFailing]));
      } else {
        html.children.push(htmlFromFailing);
      }
    }
  }

  if (html.children.length === 0) {
    return null;
  }

  return html;
}

function addHTML(node, html, bbox) {
  var extra = node[_xfa_object.$extra];
  var availableSpace = extra.availableSpace;

  var _bbox = _slicedToArray(bbox, 4),
      x = _bbox[0],
      y = _bbox[1],
      w = _bbox[2],
      h = _bbox[3];

  switch (node.layout) {
    case "position":
      {
        extra.width = Math.max(extra.width, x + w);
        extra.height = Math.max(extra.height, y + h);
        extra.children.push(html);
        break;
      }

    case "lr-tb":
    case "rl-tb":
      if (!extra.line || extra.attempt === 1) {
        extra.line = createLine(node, []);
        extra.children.push(extra.line);
        extra.numberInLine = 0;
      }

      extra.numberInLine += 1;
      extra.line.children.push(html);

      if (extra.attempt === 0) {
        extra.currentWidth += w;
        extra.height = Math.max(extra.height, extra.prevHeight + h);
      } else {
        extra.currentWidth = w;
        extra.prevHeight = extra.height;
        extra.height += h;
        extra.attempt = 0;
      }

      extra.width = Math.max(extra.width, extra.currentWidth);
      break;

    case "rl-row":
    case "row":
      {
        extra.children.push(html);
        extra.width += w;
        extra.height = Math.max(extra.height, h);
        var height = (0, _html_utils.measureToString)(extra.height);

        var _iterator = _createForOfIteratorHelper(extra.children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            child.attributes.style.height = height;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        break;
      }

    case "table":
      {
        extra.width = Math.min(availableSpace.width, Math.max(extra.width, w));
        extra.height += h;
        extra.children.push(html);
        break;
      }

    case "tb":
      {
        extra.width = Math.min(availableSpace.width, Math.max(extra.width, w));
        extra.height += h;
        extra.children.push(html);
        break;
      }
  }
}

function getAvailableSpace(node) {
  var availableSpace = node[_xfa_object.$extra].availableSpace;
  var marginV = node.margin ? node.margin.topInset + node.margin.bottomInset : 0;
  var marginH = node.margin ? node.margin.leftInset + node.margin.rightInset : 0;

  switch (node.layout) {
    case "lr-tb":
    case "rl-tb":
      if (node[_xfa_object.$extra].attempt === 0) {
        return {
          width: availableSpace.width - marginH - node[_xfa_object.$extra].currentWidth,
          height: availableSpace.height - marginV - node[_xfa_object.$extra].prevHeight
        };
      }

      return {
        width: availableSpace.width - marginH,
        height: availableSpace.height - marginV - node[_xfa_object.$extra].height
      };

    case "rl-row":
    case "row":
      var width = node[_xfa_object.$extra].columnWidths.slice(node[_xfa_object.$extra].currentColumn).reduce(function (a, x) {
        return a + x;
      });

      return {
        width: width,
        height: availableSpace.height - marginH
      };

    case "table":
    case "tb":
      return {
        width: availableSpace.width - marginH,
        height: availableSpace.height - marginV - node[_xfa_object.$extra].height
      };

    case "position":
    default:
      return availableSpace;
  }
}

function getTransformedBBox(node) {
  var w = node.w === "" ? NaN : node.w;
  var h = node.h === "" ? NaN : node.h;
  var centerX = 0,
      centerY = 0;

  switch (node.anchorType || "") {
    case "bottomCenter":
      centerX = w / 2;
      centerY = h;
      break;

    case "bottomLeft":
      centerX = 0;
      centerY = h;
      break;

    case "bottomRight":
      centerX = w;
      centerY = h;
      break;

    case "middleCenter":
      centerX = w / 2;
      centerY = h / 2;
      break;

    case "middleLeft":
      centerX = 0;
      centerY = h / 2;
      break;

    case "middleRight":
      centerX = w;
      centerY = h / 2;
      break;

    case "topCenter":
      centerX = w / 2;
      centerY = 0;
      break;

    case "topRight":
      centerX = w;
      centerY = 0;
      break;
  }

  var x, y;

  switch (node.rotate || 0) {
    case 0:
      x = -centerX;
      y = -centerY;
      break;

    case 90:
      x = -centerY;
      y = centerX;
      var _ref = [h, -w];
      w = _ref[0];
      h = _ref[1];
      break;

    case 180:
      x = centerX;
      y = centerY;
      var _ref2 = [-w, -h];
      w = _ref2[0];
      h = _ref2[1];
      break;

    case 270:
      x = centerY;
      y = -centerX;
      var _ref3 = [-h, w];
      w = _ref3[0];
      h = _ref3[1];
      break;
  }

  return [node.x + x + Math.min(0, w), node.y + y + Math.min(0, h), Math.abs(w), Math.abs(h)];
}

function checkDimensions(node, space) {
  if (node[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].firstUnsplittable === null) {
    return true;
  }

  if (node.w === 0 || node.h === 0) {
    return true;
  }

  var ERROR = 2;

  var parent = node[_xfa_object.$getSubformParent]();

  var attempt = parent[_xfa_object.$extra] && parent[_xfa_object.$extra].attempt || 0;

  var _getTransformedBBox = getTransformedBBox(node),
      _getTransformedBBox2 = _slicedToArray(_getTransformedBBox, 4),
      y = _getTransformedBBox2[1],
      w = _getTransformedBBox2[2],
      h = _getTransformedBBox2[3];

  switch (parent.layout) {
    case "lr-tb":
    case "rl-tb":
      if (attempt === 0) {
        if (!node[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure) {
          if (node.h !== "" && Math.round(h - space.height) > ERROR) {
            return false;
          }

          if (node.w !== "") {
            if (Math.round(w - space.width) <= ERROR) {
              return true;
            }

            if (parent[_xfa_object.$extra].numberInLine === 0) {
              return space.height > ERROR;
            }

            return false;
          }

          return space.width > ERROR;
        }

        if (node.w !== "") {
          return Math.round(w - space.width) <= ERROR;
        }

        return space.width > ERROR;
      }

      if (node[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure) {
        return true;
      }

      if (node.h !== "" && Math.round(h - space.height) > ERROR) {
        return false;
      }

      if (node.w === "" || Math.round(w - space.width) <= ERROR) {
        return space.height > ERROR;
      }

      if (parent[_xfa_object.$isThereMoreWidth]()) {
        return false;
      }

      return space.height > ERROR;

    case "table":
    case "tb":
      if (node[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure) {
        return true;
      }

      if (node.h !== "" && !node[_xfa_object.$isSplittable]()) {
        return Math.round(h - space.height) <= ERROR;
      }

      if (node.w === "" || Math.round(w - space.width) <= ERROR) {
        return space.height > ERROR;
      }

      if (parent[_xfa_object.$isThereMoreWidth]()) {
        return false;
      }

      return space.height > ERROR;

    case "position":
      if (node[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure) {
        return true;
      }

      if (node.h === "" || Math.round(h + y - space.height) <= ERROR) {
        return true;
      }

      var area = node[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].currentContentArea;

      return h + y > area.h;

    case "rl-row":
    case "row":
      if (node[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure) {
        return true;
      }

      if (node.h !== "") {
        return Math.round(h - space.height) <= ERROR;
      }

      return true;

    default:
      return true;
  }
}