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
exports.XRefParseException = exports.XRefEntryException = exports.ParserEOFException = exports.MissingDataException = exports.DocStats = void 0;
exports.collectActions = collectActions;
exports.encodeToXmlString = encodeToXmlString;
exports.escapePDFName = escapePDFName;
exports.getArrayLookupTableFactory = getArrayLookupTableFactory;
exports.getInheritableProperty = getInheritableProperty;
exports.getLookupTableFactory = getLookupTableFactory;
exports.isWhiteSpace = isWhiteSpace;
exports.log2 = log2;
exports.parseXFAPath = parseXFAPath;
exports.readInt8 = readInt8;
exports.readUint16 = readUint16;
exports.readUint32 = readUint32;
exports.recoverJsURL = recoverJsURL;
exports.toRomanNumerals = toRomanNumerals;
exports.validateCSSFont = validateCSSFont;

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function getLookupTableFactory(initializer) {
  var lookup;
  return function () {
    if (initializer) {
      lookup = Object.create(null);
      initializer(lookup);
      initializer = null;
    }

    return lookup;
  };
}

function getArrayLookupTableFactory(initializer) {
  var lookup;
  return function () {
    if (initializer) {
      var arr = initializer();
      initializer = null;
      lookup = Object.create(null);

      for (var i = 0, ii = arr.length; i < ii; i += 2) {
        lookup[arr[i]] = arr[i + 1];
      }

      arr = null;
    }

    return lookup;
  };
}

var MissingDataException = /*#__PURE__*/function (_BaseException) {
  _inherits(MissingDataException, _BaseException);

  var _super = _createSuper(MissingDataException);

  function MissingDataException(begin, end) {
    var _this;

    _classCallCheck(this, MissingDataException);

    _this = _super.call(this, "Missing data [".concat(begin, ", ").concat(end, ")"), "MissingDataException");
    _this.begin = begin;
    _this.end = end;
    return _this;
  }

  return MissingDataException;
}(_util.BaseException);

exports.MissingDataException = MissingDataException;

var ParserEOFException = /*#__PURE__*/function (_BaseException2) {
  _inherits(ParserEOFException, _BaseException2);

  var _super2 = _createSuper(ParserEOFException);

  function ParserEOFException(msg) {
    _classCallCheck(this, ParserEOFException);

    return _super2.call(this, msg, "ParserEOFException");
  }

  return ParserEOFException;
}(_util.BaseException);

exports.ParserEOFException = ParserEOFException;

var XRefEntryException = /*#__PURE__*/function (_BaseException3) {
  _inherits(XRefEntryException, _BaseException3);

  var _super3 = _createSuper(XRefEntryException);

  function XRefEntryException(msg) {
    _classCallCheck(this, XRefEntryException);

    return _super3.call(this, msg, "XRefEntryException");
  }

  return XRefEntryException;
}(_util.BaseException);

exports.XRefEntryException = XRefEntryException;

var XRefParseException = /*#__PURE__*/function (_BaseException4) {
  _inherits(XRefParseException, _BaseException4);

  var _super4 = _createSuper(XRefParseException);

  function XRefParseException(msg) {
    _classCallCheck(this, XRefParseException);

    return _super4.call(this, msg, "XRefParseException");
  }

  return XRefParseException;
}(_util.BaseException);

exports.XRefParseException = XRefParseException;

var DocStats = /*#__PURE__*/function () {
  function DocStats(handler) {
    _classCallCheck(this, DocStats);

    this._handler = handler;
    this._streamTypes = new Set();
    this._fontTypes = new Set();
  }

  _createClass(DocStats, [{
    key: "_send",
    value: function _send() {
      var streamTypes = Object.create(null),
          fontTypes = Object.create(null);

      var _iterator = _createForOfIteratorHelper(this._streamTypes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var type = _step.value;
          streamTypes[type] = true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(this._fontTypes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _type = _step2.value;
          fontTypes[_type] = true;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this._handler.send("DocStats", {
        streamTypes: streamTypes,
        fontTypes: fontTypes
      });
    }
  }, {
    key: "addStreamType",
    value: function addStreamType(type) {
      (0, _util.assert)(_util.StreamType[type] === type, 'addStreamType: Invalid "type" value.');

      if (this._streamTypes.has(type)) {
        return;
      }

      this._streamTypes.add(type);

      this._send();
    }
  }, {
    key: "addFontType",
    value: function addFontType(type) {
      (0, _util.assert)(_util.FontType[type] === type, 'addFontType: Invalid "type" value.');

      if (this._fontTypes.has(type)) {
        return;
      }

      this._fontTypes.add(type);

      this._send();
    }
  }]);

  return DocStats;
}();

exports.DocStats = DocStats;

function getInheritableProperty(_ref) {
  var dict = _ref.dict,
      key = _ref.key,
      _ref$getArray = _ref.getArray,
      getArray = _ref$getArray === void 0 ? false : _ref$getArray,
      _ref$stopWhenFound = _ref.stopWhenFound,
      stopWhenFound = _ref$stopWhenFound === void 0 ? true : _ref$stopWhenFound;
  var values;
  var visited = new _primitives.RefSet();

  while (dict instanceof _primitives.Dict && !(dict.objId && visited.has(dict.objId))) {
    if (dict.objId) {
      visited.put(dict.objId);
    }

    var value = getArray ? dict.getArray(key) : dict.get(key);

    if (value !== undefined) {
      if (stopWhenFound) {
        return value;
      }

      if (!values) {
        values = [];
      }

      values.push(value);
    }

    dict = dict.get("Parent");
  }

  return values;
}

var ROMAN_NUMBER_MAP = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

function toRomanNumerals(number) {
  var lowerCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  (0, _util.assert)(Number.isInteger(number) && number > 0, "The number should be a positive integer.");
  var romanBuf = [];
  var pos;

  while (number >= 1000) {
    number -= 1000;
    romanBuf.push("M");
  }

  pos = number / 100 | 0;
  number %= 100;
  romanBuf.push(ROMAN_NUMBER_MAP[pos]);
  pos = number / 10 | 0;
  number %= 10;
  romanBuf.push(ROMAN_NUMBER_MAP[10 + pos]);
  romanBuf.push(ROMAN_NUMBER_MAP[20 + number]);
  var romanStr = romanBuf.join("");
  return lowerCase ? romanStr.toLowerCase() : romanStr;
}

function log2(x) {
  if (x <= 0) {
    return 0;
  }

  return Math.ceil(Math.log2(x));
}

function readInt8(data, offset) {
  return data[offset] << 24 >> 24;
}

function readUint16(data, offset) {
  return data[offset] << 8 | data[offset + 1];
}

function readUint32(data, offset) {
  return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
}

function isWhiteSpace(ch) {
  return ch === 0x20 || ch === 0x09 || ch === 0x0d || ch === 0x0a;
}

function parseXFAPath(path) {
  var positionPattern = /(.+)\[(\d+)\]$/;
  return path.split(".").map(function (component) {
    var m = component.match(positionPattern);

    if (m) {
      return {
        name: m[1],
        pos: parseInt(m[2], 10)
      };
    }

    return {
      name: component,
      pos: 0
    };
  });
}

function escapePDFName(str) {
  var buffer = [];
  var start = 0;

  for (var i = 0, ii = str.length; i < ii; i++) {
    var _char = str.charCodeAt(i);

    if (_char < 0x21 || _char > 0x7e || _char === 0x23 || _char === 0x28 || _char === 0x29 || _char === 0x3c || _char === 0x3e || _char === 0x5b || _char === 0x5d || _char === 0x7b || _char === 0x7d || _char === 0x2f || _char === 0x25) {
      if (start < i) {
        buffer.push(str.substring(start, i));
      }

      buffer.push("#".concat(_char.toString(16)));
      start = i + 1;
    }
  }

  if (buffer.length === 0) {
    return str;
  }

  if (start < str.length) {
    buffer.push(str.substring(start, str.length));
  }

  return buffer.join("");
}

function _collectJS(entry, xref, list, parents) {
  if (!entry) {
    return;
  }

  var parent = null;

  if ((0, _primitives.isRef)(entry)) {
    if (parents.has(entry)) {
      return;
    }

    parent = entry;
    parents.put(parent);
    entry = xref.fetch(entry);
  }

  if (Array.isArray(entry)) {
    var _iterator3 = _createForOfIteratorHelper(entry),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var element = _step3.value;

        _collectJS(element, xref, list, parents);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  } else if (entry instanceof _primitives.Dict) {
    if ((0, _primitives.isName)(entry.get("S"), "JavaScript") && entry.has("JS")) {
      var js = entry.get("JS");
      var code;

      if ((0, _primitives.isStream)(js)) {
        code = js.getString();
      } else {
        code = js;
      }

      code = (0, _util.stringToPDFString)(code);

      if (code) {
        list.push(code);
      }
    }

    _collectJS(entry.getRaw("Next"), xref, list, parents);
  }

  if (parent) {
    parents.remove(parent);
  }
}

function collectActions(xref, dict, eventType) {
  var actions = Object.create(null);
  var additionalActionsDicts = getInheritableProperty({
    dict: dict,
    key: "AA",
    stopWhenFound: false
  });

  if (additionalActionsDicts) {
    for (var i = additionalActionsDicts.length - 1; i >= 0; i--) {
      var additionalActions = additionalActionsDicts[i];

      if (!(additionalActions instanceof _primitives.Dict)) {
        continue;
      }

      var _iterator4 = _createForOfIteratorHelper(additionalActions.getKeys()),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var key = _step4.value;
          var action = eventType[key];

          if (!action) {
            continue;
          }

          var actionDict = additionalActions.getRaw(key);
          var parents = new _primitives.RefSet();
          var list = [];

          _collectJS(actionDict, xref, list, parents);

          if (list.length > 0) {
            actions[action] = list;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }

  if (dict.has("A")) {
    var _actionDict = dict.get("A");

    var _parents = new _primitives.RefSet();

    var _list = [];

    _collectJS(_actionDict, xref, _list, _parents);

    if (_list.length > 0) {
      actions.Action = _list;
    }
  }

  return (0, _util.objectSize)(actions) > 0 ? actions : null;
}

var XMLEntities = {
  0x3c: "&lt;",
  0x3e: "&gt;",
  0x26: "&amp;",
  0x22: "&quot;",
  0x27: "&apos;"
};

function encodeToXmlString(str) {
  var buffer = [];
  var start = 0;

  for (var i = 0, ii = str.length; i < ii; i++) {
    var _char2 = str.codePointAt(i);

    if (0x20 <= _char2 && _char2 <= 0x7e) {
      var entity = XMLEntities[_char2];

      if (entity) {
        if (start < i) {
          buffer.push(str.substring(start, i));
        }

        buffer.push(entity);
        start = i + 1;
      }
    } else {
      if (start < i) {
        buffer.push(str.substring(start, i));
      }

      buffer.push("&#x".concat(_char2.toString(16).toUpperCase(), ";"));

      if (_char2 > 0xd7ff && (_char2 < 0xe000 || _char2 > 0xfffd)) {
        i++;
      }

      start = i + 1;
    }
  }

  if (buffer.length === 0) {
    return str;
  }

  if (start < str.length) {
    buffer.push(str.substring(start, str.length));
  }

  return buffer.join("");
}

function validateCSSFont(cssFontInfo) {
  var DEFAULT_CSS_FONT_OBLIQUE = "14";
  var DEFAULT_CSS_FONT_WEIGHT = "400";
  var CSS_FONT_WEIGHT_VALUES = new Set(["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "normal", "bold", "bolder", "lighter"]);
  var fontFamily = cssFontInfo.fontFamily,
      fontWeight = cssFontInfo.fontWeight,
      italicAngle = cssFontInfo.italicAngle;

  if (/^".*"$/.test(fontFamily)) {
    if (/[^\\]"/.test(fontFamily.slice(1, fontFamily.length - 1))) {
      (0, _util.warn)("XFA - FontFamily contains some unescaped \": ".concat(fontFamily, "."));
      return false;
    }
  } else if (/^'.*'$/.test(fontFamily)) {
    if (/[^\\]'/.test(fontFamily.slice(1, fontFamily.length - 1))) {
      (0, _util.warn)("XFA - FontFamily contains some unescaped ': ".concat(fontFamily, "."));
      return false;
    }
  } else {
    var _iterator5 = _createForOfIteratorHelper(fontFamily.split(/[ \t]+/)),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var ident = _step5.value;

        if (/^(\d|(-(\d|-)))/.test(ident) || !/^[\w-\\]+$/.test(ident)) {
          (0, _util.warn)("XFA - FontFamily contains some invalid <custom-ident>: ".concat(fontFamily, "."));
          return false;
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }

  var weight = fontWeight ? fontWeight.toString() : "";
  cssFontInfo.fontWeight = CSS_FONT_WEIGHT_VALUES.has(weight) ? weight : DEFAULT_CSS_FONT_WEIGHT;
  var angle = parseFloat(italicAngle);
  cssFontInfo.italicAngle = isNaN(angle) || angle < -90 || angle > 90 ? DEFAULT_CSS_FONT_OBLIQUE : italicAngle.toString();
  return true;
}

function recoverJsURL(str) {
  var URL_OPEN_METHODS = ["app.launchURL", "window.open", "xfa.host.gotoURL"];
  var regex = new RegExp("^\\s*(" + URL_OPEN_METHODS.join("|").split(".").join("\\.") + ")\\((?:'|\")([^'\"]*)(?:'|\")(?:,\\s*(\\w+)\\)|\\))", "i");
  var jsUrl = regex.exec(str);

  if (jsUrl && jsUrl[2]) {
    var url = jsUrl[2];
    var newWindow = false;

    if (jsUrl[3] === "true" && jsUrl[1] === "app.launchURL") {
      newWindow = true;
    }

    return {
      url: url,
      newWindow: newWindow
    };
  }

  return null;
}