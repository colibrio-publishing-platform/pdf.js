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
exports.HTMLResult = void 0;
exports.getBBox = getBBox;
exports.getColor = getColor;
exports.getFloat = getFloat;
exports.getInteger = getInteger;
exports.getKeyword = getKeyword;
exports.getMeasurement = getMeasurement;
exports.getRatio = getRatio;
exports.getRelevant = getRelevant;
exports.getStringOption = getStringOption;
exports.stripQuotes = stripQuotes;

var _util = require("../../shared/util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var dimConverters = {
  pt: function pt(x) {
    return x;
  },
  cm: function cm(x) {
    return x / 2.54 * 72;
  },
  mm: function mm(x) {
    return x / (10 * 2.54) * 72;
  },
  "in": function _in(x) {
    return x * 72;
  },
  px: function px(x) {
    return x;
  }
};
var measurementPattern = /([+-]?\d+\.?\d*)(.*)/;

function stripQuotes(str) {
  if (str.startsWith("'") || str.startsWith('"')) {
    return str.slice(1, str.length - 1);
  }

  return str;
}

function getInteger(_ref) {
  var data = _ref.data,
      defaultValue = _ref.defaultValue,
      validate = _ref.validate;

  if (!data) {
    return defaultValue;
  }

  data = data.trim();
  var n = parseInt(data, 10);

  if (!isNaN(n) && validate(n)) {
    return n;
  }

  return defaultValue;
}

function getFloat(_ref2) {
  var data = _ref2.data,
      defaultValue = _ref2.defaultValue,
      validate = _ref2.validate;

  if (!data) {
    return defaultValue;
  }

  data = data.trim();
  var n = parseFloat(data);

  if (!isNaN(n) && validate(n)) {
    return n;
  }

  return defaultValue;
}

function getKeyword(_ref3) {
  var data = _ref3.data,
      defaultValue = _ref3.defaultValue,
      validate = _ref3.validate;

  if (!data) {
    return defaultValue;
  }

  data = data.trim();

  if (validate(data)) {
    return data;
  }

  return defaultValue;
}

function getStringOption(data, options) {
  return getKeyword({
    data: data,
    defaultValue: options[0],
    validate: function validate(k) {
      return options.includes(k);
    }
  });
}

function getMeasurement(str) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0";
  def = def || "0";

  if (!str) {
    return getMeasurement(def);
  }

  var match = str.trim().match(measurementPattern);

  if (!match) {
    return getMeasurement(def);
  }

  var _match = _slicedToArray(match, 3),
      valueStr = _match[1],
      unit = _match[2];

  var value = parseFloat(valueStr);

  if (isNaN(value)) {
    return getMeasurement(def);
  }

  if (value === 0) {
    return 0;
  }

  var conv = dimConverters[unit];

  if (conv) {
    return conv(value);
  }

  return value;
}

function getRatio(data) {
  if (!data) {
    return {
      num: 1,
      den: 1
    };
  }

  var ratio = data.trim().split(/\s*:\s*/).map(function (x) {
    return parseFloat(x);
  }).filter(function (x) {
    return !isNaN(x);
  });

  if (ratio.length === 1) {
    ratio.push(1);
  }

  if (ratio.length === 0) {
    return {
      num: 1,
      den: 1
    };
  }

  var _ratio = _slicedToArray(ratio, 2),
      num = _ratio[0],
      den = _ratio[1];

  return {
    num: num,
    den: den
  };
}

function getRelevant(data) {
  if (!data) {
    return [];
  }

  return data.trim().split(/\s+/).map(function (e) {
    return {
      excluded: e[0] === "-",
      viewname: e.substring(1)
    };
  });
}

function getColor(data) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0];

  var _def = _slicedToArray(def, 3),
      r = _def[0],
      g = _def[1],
      b = _def[2];

  if (!data) {
    return {
      r: r,
      g: g,
      b: b
    };
  }

  var color = data.trim().split(/\s*,\s*/).map(function (c) {
    return Math.min(Math.max(0, parseInt(c.trim(), 10)), 255);
  }).map(function (c) {
    return isNaN(c) ? 0 : c;
  });

  if (color.length < 3) {
    return {
      r: r,
      g: g,
      b: b
    };
  }

  var _color = _slicedToArray(color, 3);

  r = _color[0];
  g = _color[1];
  b = _color[2];
  return {
    r: r,
    g: g,
    b: b
  };
}

function getBBox(data) {
  var def = -1;

  if (!data) {
    return {
      x: def,
      y: def,
      width: def,
      height: def
    };
  }

  var bbox = data.trim().split(/\s*,\s*/).map(function (m) {
    return getMeasurement(m, "-1");
  });

  if (bbox.length < 4 || bbox[2] < 0 || bbox[3] < 0) {
    return {
      x: def,
      y: def,
      width: def,
      height: def
    };
  }

  var _bbox = _slicedToArray(bbox, 4),
      x = _bbox[0],
      y = _bbox[1],
      width = _bbox[2],
      height = _bbox[3];

  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}

var HTMLResult = /*#__PURE__*/function () {
  function HTMLResult(success, html, bbox, breakNode) {
    _classCallCheck(this, HTMLResult);

    this.success = success;
    this.html = html;
    this.bbox = bbox;
    this.breakNode = breakNode;
  }

  _createClass(HTMLResult, [{
    key: "isBreak",
    value: function isBreak() {
      return !!this.breakNode;
    }
  }], [{
    key: "FAILURE",
    get: function get() {
      return (0, _util.shadow)(this, "FAILURE", new HTMLResult(false, null, null, null));
    }
  }, {
    key: "EMPTY",
    get: function get() {
      return (0, _util.shadow)(this, "EMPTY", new HTMLResult(true, null, null, null));
    }
  }, {
    key: "breakNode",
    value: function breakNode(node) {
      return new HTMLResult(false, null, null, node);
    }
  }, {
    key: "success",
    value: function success(html) {
      var bbox = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return new HTMLResult(true, html, bbox, null);
    }
  }]);

  return HTMLResult;
}();

exports.HTMLResult = HTMLResult;