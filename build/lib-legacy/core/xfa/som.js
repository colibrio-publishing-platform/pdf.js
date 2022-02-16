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
exports.createDataNode = createDataNode;
exports.searchNode = searchNode;

var _xfa_object = require("./xfa_object.js");

var _namespaces = require("./namespaces.js");

var _util = require("../../shared/util.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var namePattern = /^[^.[]+/;
var indexPattern = /^[^\]]+/;
var operators = {
  dot: 0,
  dotDot: 1,
  dotHash: 2,
  dotBracket: 3,
  dotParen: 4
};
var shortcuts = new Map([["$data", function (root, current) {
  return root.datasets ? root.datasets.data : root;
}], ["$record", function (root, current) {
  return (root.datasets ? root.datasets.data : root)[_xfa_object.$getChildren]()[0];
}], ["$template", function (root, current) {
  return root.template;
}], ["$connectionSet", function (root, current) {
  return root.connectionSet;
}], ["$form", function (root, current) {
  return root.form;
}], ["$layout", function (root, current) {
  return root.layout;
}], ["$host", function (root, current) {
  return root.host;
}], ["$dataWindow", function (root, current) {
  return root.dataWindow;
}], ["$event", function (root, current) {
  return root.event;
}], ["!", function (root, current) {
  return root.datasets;
}], ["$xfa", function (root, current) {
  return root;
}], ["xfa", function (root, current) {
  return root;
}], ["$", function (root, current) {
  return current;
}]]);
var somCache = new WeakMap();
var NS_DATASETS = _namespaces.NamespaceIds.datasets.id;

function parseIndex(index) {
  index = index.trim();

  if (index === "*") {
    return Infinity;
  }

  return parseInt(index, 10) || 0;
}

function parseExpression(expr, dotDotAllowed) {
  var noExpr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var match = expr.match(namePattern);

  if (!match) {
    return null;
  }

  var _match = match,
      _match2 = _slicedToArray(_match, 1),
      name = _match2[0];

  var parsed = [{
    name: name,
    cacheName: "." + name,
    index: 0,
    js: null,
    formCalc: null,
    operator: operators.dot
  }];
  var pos = name.length;

  while (pos < expr.length) {
    var spos = pos;

    var _char = expr.charAt(pos++);

    if (_char === "[") {
      match = expr.slice(pos).match(indexPattern);

      if (!match) {
        (0, _util.warn)("XFA - Invalid index in SOM expression");
        return null;
      }

      parsed[parsed.length - 1].index = parseIndex(match[0]);
      pos += match[0].length + 1;
      continue;
    }

    var operator = void 0;

    switch (expr.charAt(pos)) {
      case ".":
        if (!dotDotAllowed) {
          return null;
        }

        pos++;
        operator = operators.dotDot;
        break;

      case "#":
        pos++;
        operator = operators.dotHash;
        break;

      case "[":
        if (noExpr) {
          (0, _util.warn)("XFA - SOM expression contains a FormCalc subexpression which is not supported for now.");
          return null;
        }

        operator = operators.dotBracket;
        break;

      case "(":
        if (noExpr) {
          (0, _util.warn)("XFA - SOM expression contains a JavaScript subexpression which is not supported for now.");
          return null;
        }

        operator = operators.dotParen;
        break;

      default:
        operator = operators.dot;
        break;
    }

    match = expr.slice(pos).match(namePattern);

    if (!match) {
      break;
    }

    var _match3 = match;

    var _match4 = _slicedToArray(_match3, 1);

    name = _match4[0];
    pos += name.length;
    parsed.push({
      name: name,
      cacheName: expr.slice(spos, pos),
      operator: operator,
      index: 0,
      js: null,
      formCalc: null
    });
  }

  return parsed;
}

function searchNode(root, container, expr) {
  var dotDotAllowed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var useCache = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var parsed = parseExpression(expr, dotDotAllowed);

  if (!parsed) {
    return null;
  }

  var fn = shortcuts.get(parsed[0].name);
  var i = 0;
  var isQualified;

  if (fn) {
    isQualified = true;
    root = [fn(root, container)];
    i = 1;
  } else {
    isQualified = container === null;
    root = [container || root];
  }

  var _loop = function _loop(ii) {
    var _parsed$i = parsed[i],
        name = _parsed$i.name,
        cacheName = _parsed$i.cacheName,
        operator = _parsed$i.operator,
        index = _parsed$i.index;
    var nodes = [];

    var _iterator = _createForOfIteratorHelper(root),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;

        if (!(node instanceof _xfa_object.XFAObject)) {
          continue;
        }

        var children = void 0,
            cached = void 0;

        if (useCache) {
          cached = somCache.get(node);

          if (!cached) {
            cached = new Map();
            somCache.set(node, cached);
          }

          children = cached.get(cacheName);
        }

        if (!children) {
          switch (operator) {
            case operators.dot:
              children = node[_xfa_object.$getChildrenByName](name, false);
              break;

            case operators.dotDot:
              children = node[_xfa_object.$getChildrenByName](name, true);
              break;

            case operators.dotHash:
              children = node[_xfa_object.$getChildrenByClass](name);

              if (children instanceof _xfa_object.XFAObjectArray) {
                children = children.children;
              } else {
                children = [children];
              }

              break;

            default:
              break;
          }

          if (useCache) {
            cached.set(cacheName, children);
          }
        }

        if (children.length > 0) {
          nodes.push(children);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (nodes.length === 0 && !isQualified && i === 0) {
      var parent = container[_xfa_object.$getParent]();

      container = parent;

      if (!container) {
        return {
          v: null
        };
      }

      i = -1;
      root = [container];
      return "continue";
    }

    if (isFinite(index)) {
      root = nodes.filter(function (node) {
        return index < node.length;
      }).map(function (node) {
        return node[index];
      });
    } else {
      root = nodes.reduce(function (acc, node) {
        return acc.concat(node);
      }, []);
    }
  };

  for (var ii = parsed.length; i < ii; i++) {
    var _ret = _loop(ii);

    if (_ret === "continue") continue;
    if (_typeof(_ret) === "object") return _ret.v;
  }

  if (root.length === 0) {
    return null;
  }

  return root;
}

function createNodes(root, path) {
  var node = null;

  var _iterator2 = _createForOfIteratorHelper(path),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = _step2.value,
          name = _step2$value.name,
          index = _step2$value.index;

      for (var i = 0, ii = !isFinite(index) ? 0 : index; i <= ii; i++) {
        var nsId = root[_xfa_object.$namespaceId] === NS_DATASETS ? -1 : root[_xfa_object.$namespaceId];
        node = new _xfa_object.XmlObject(nsId, name);

        root[_xfa_object.$appendChild](node);
      }

      root = node;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return node;
}

function createDataNode(root, container, expr) {
  var parsed = parseExpression(expr);

  if (!parsed) {
    return null;
  }

  if (parsed.some(function (x) {
    return x.operator === operators.dotDot;
  })) {
    return null;
  }

  var fn = shortcuts.get(parsed[0].name);
  var i = 0;

  if (fn) {
    root = fn(root, container);
    i = 1;
  } else {
    root = container || root;
  }

  for (var ii = parsed.length; i < ii; i++) {
    var _parsed$i2 = parsed[i],
        name = _parsed$i2.name,
        operator = _parsed$i2.operator,
        index = _parsed$i2.index;

    if (!isFinite(index)) {
      parsed[i].index = 0;
      return createNodes(root, parsed.slice(i));
    }

    var children = void 0;

    switch (operator) {
      case operators.dot:
        children = root[_xfa_object.$getChildrenByName](name, false);
        break;

      case operators.dotDot:
        children = root[_xfa_object.$getChildrenByName](name, true);
        break;

      case operators.dotHash:
        children = root[_xfa_object.$getChildrenByClass](name);

        if (children instanceof _xfa_object.XFAObjectArray) {
          children = children.children;
        } else {
          children = [children];
        }

        break;

      default:
        break;
    }

    if (children.length === 0) {
      return createNodes(root, parsed.slice(i));
    }

    if (index < children.length) {
      var child = children[index];

      if (!(child instanceof _xfa_object.XFAObject)) {
        (0, _util.warn)("XFA - Cannot create a node.");
        return null;
      }

      root = child;
    } else {
      parsed[i].index = index - children.length;
      return createNodes(root, parsed.slice(i));
    }
  }

  return null;
}