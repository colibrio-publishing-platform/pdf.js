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
exports.LocaleSetNamespace = void 0;

var _namespaces = require("./namespaces.js");

var _xfa_object = require("./xfa_object.js");

var _utils = require("./utils.js");

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

var LOCALE_SET_NS_ID = _namespaces.NamespaceIds.localeSet.id;

var CalendarSymbols = /*#__PURE__*/function (_XFAObject) {
  _inherits(CalendarSymbols, _XFAObject);

  var _super = _createSuper(CalendarSymbols);

  function CalendarSymbols(attributes) {
    var _this;

    _classCallCheck(this, CalendarSymbols);

    _this = _super.call(this, LOCALE_SET_NS_ID, "calendarSymbols", true);
    _this.name = "gregorian";
    _this.dayNames = new _xfa_object.XFAObjectArray(2);
    _this.eraNames = null;
    _this.meridiemNames = null;
    _this.monthNames = new _xfa_object.XFAObjectArray(2);
    return _this;
  }

  return CalendarSymbols;
}(_xfa_object.XFAObject);

var CurrencySymbol = /*#__PURE__*/function (_StringObject) {
  _inherits(CurrencySymbol, _StringObject);

  var _super2 = _createSuper(CurrencySymbol);

  function CurrencySymbol(attributes) {
    var _this2;

    _classCallCheck(this, CurrencySymbol);

    _this2 = _super2.call(this, LOCALE_SET_NS_ID, "currencySymbol");
    _this2.name = (0, _utils.getStringOption)(attributes.name, ["symbol", "isoname", "decimal"]);
    return _this2;
  }

  return CurrencySymbol;
}(_xfa_object.StringObject);

var CurrencySymbols = /*#__PURE__*/function (_XFAObject2) {
  _inherits(CurrencySymbols, _XFAObject2);

  var _super3 = _createSuper(CurrencySymbols);

  function CurrencySymbols(attributes) {
    var _this3;

    _classCallCheck(this, CurrencySymbols);

    _this3 = _super3.call(this, LOCALE_SET_NS_ID, "currencySymbols", true);
    _this3.currencySymbol = new _xfa_object.XFAObjectArray(3);
    return _this3;
  }

  return CurrencySymbols;
}(_xfa_object.XFAObject);

var DatePattern = /*#__PURE__*/function (_StringObject2) {
  _inherits(DatePattern, _StringObject2);

  var _super4 = _createSuper(DatePattern);

  function DatePattern(attributes) {
    var _this4;

    _classCallCheck(this, DatePattern);

    _this4 = _super4.call(this, LOCALE_SET_NS_ID, "datePattern");
    _this4.name = (0, _utils.getStringOption)(attributes.name, ["full", "long", "med", "short"]);
    return _this4;
  }

  return DatePattern;
}(_xfa_object.StringObject);

var DatePatterns = /*#__PURE__*/function (_XFAObject3) {
  _inherits(DatePatterns, _XFAObject3);

  var _super5 = _createSuper(DatePatterns);

  function DatePatterns(attributes) {
    var _this5;

    _classCallCheck(this, DatePatterns);

    _this5 = _super5.call(this, LOCALE_SET_NS_ID, "datePatterns", true);
    _this5.datePattern = new _xfa_object.XFAObjectArray(4);
    return _this5;
  }

  return DatePatterns;
}(_xfa_object.XFAObject);

var DateTimeSymbols = /*#__PURE__*/function (_ContentObject) {
  _inherits(DateTimeSymbols, _ContentObject);

  var _super6 = _createSuper(DateTimeSymbols);

  function DateTimeSymbols(attributes) {
    _classCallCheck(this, DateTimeSymbols);

    return _super6.call(this, LOCALE_SET_NS_ID, "dateTimeSymbols");
  }

  return DateTimeSymbols;
}(_xfa_object.ContentObject);

var Day = /*#__PURE__*/function (_StringObject3) {
  _inherits(Day, _StringObject3);

  var _super7 = _createSuper(Day);

  function Day(attributes) {
    _classCallCheck(this, Day);

    return _super7.call(this, LOCALE_SET_NS_ID, "day");
  }

  return Day;
}(_xfa_object.StringObject);

var DayNames = /*#__PURE__*/function (_XFAObject4) {
  _inherits(DayNames, _XFAObject4);

  var _super8 = _createSuper(DayNames);

  function DayNames(attributes) {
    var _this6;

    _classCallCheck(this, DayNames);

    _this6 = _super8.call(this, LOCALE_SET_NS_ID, "dayNames", true);
    _this6.abbr = (0, _utils.getInteger)({
      data: attributes.abbr,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this6.day = new _xfa_object.XFAObjectArray(7);
    return _this6;
  }

  return DayNames;
}(_xfa_object.XFAObject);

var Era = /*#__PURE__*/function (_StringObject4) {
  _inherits(Era, _StringObject4);

  var _super9 = _createSuper(Era);

  function Era(attributes) {
    _classCallCheck(this, Era);

    return _super9.call(this, LOCALE_SET_NS_ID, "era");
  }

  return Era;
}(_xfa_object.StringObject);

var EraNames = /*#__PURE__*/function (_XFAObject5) {
  _inherits(EraNames, _XFAObject5);

  var _super10 = _createSuper(EraNames);

  function EraNames(attributes) {
    var _this7;

    _classCallCheck(this, EraNames);

    _this7 = _super10.call(this, LOCALE_SET_NS_ID, "eraNames", true);
    _this7.era = new _xfa_object.XFAObjectArray(2);
    return _this7;
  }

  return EraNames;
}(_xfa_object.XFAObject);

var Locale = /*#__PURE__*/function (_XFAObject6) {
  _inherits(Locale, _XFAObject6);

  var _super11 = _createSuper(Locale);

  function Locale(attributes) {
    var _this8;

    _classCallCheck(this, Locale);

    _this8 = _super11.call(this, LOCALE_SET_NS_ID, "locale", true);
    _this8.desc = attributes.desc || "";
    _this8.name = "isoname";
    _this8.calendarSymbols = null;
    _this8.currencySymbols = null;
    _this8.datePatterns = null;
    _this8.dateTimeSymbols = null;
    _this8.numberPatterns = null;
    _this8.numberSymbols = null;
    _this8.timePatterns = null;
    _this8.typeFaces = null;
    return _this8;
  }

  return Locale;
}(_xfa_object.XFAObject);

var LocaleSet = /*#__PURE__*/function (_XFAObject7) {
  _inherits(LocaleSet, _XFAObject7);

  var _super12 = _createSuper(LocaleSet);

  function LocaleSet(attributes) {
    var _this9;

    _classCallCheck(this, LocaleSet);

    _this9 = _super12.call(this, LOCALE_SET_NS_ID, "localeSet", true);
    _this9.locale = new _xfa_object.XFAObjectArray();
    return _this9;
  }

  return LocaleSet;
}(_xfa_object.XFAObject);

var Meridiem = /*#__PURE__*/function (_StringObject5) {
  _inherits(Meridiem, _StringObject5);

  var _super13 = _createSuper(Meridiem);

  function Meridiem(attributes) {
    _classCallCheck(this, Meridiem);

    return _super13.call(this, LOCALE_SET_NS_ID, "meridiem");
  }

  return Meridiem;
}(_xfa_object.StringObject);

var MeridiemNames = /*#__PURE__*/function (_XFAObject8) {
  _inherits(MeridiemNames, _XFAObject8);

  var _super14 = _createSuper(MeridiemNames);

  function MeridiemNames(attributes) {
    var _this10;

    _classCallCheck(this, MeridiemNames);

    _this10 = _super14.call(this, LOCALE_SET_NS_ID, "meridiemNames", true);
    _this10.meridiem = new _xfa_object.XFAObjectArray(2);
    return _this10;
  }

  return MeridiemNames;
}(_xfa_object.XFAObject);

var Month = /*#__PURE__*/function (_StringObject6) {
  _inherits(Month, _StringObject6);

  var _super15 = _createSuper(Month);

  function Month(attributes) {
    _classCallCheck(this, Month);

    return _super15.call(this, LOCALE_SET_NS_ID, "month");
  }

  return Month;
}(_xfa_object.StringObject);

var MonthNames = /*#__PURE__*/function (_XFAObject9) {
  _inherits(MonthNames, _XFAObject9);

  var _super16 = _createSuper(MonthNames);

  function MonthNames(attributes) {
    var _this11;

    _classCallCheck(this, MonthNames);

    _this11 = _super16.call(this, LOCALE_SET_NS_ID, "monthNames", true);
    _this11.abbr = (0, _utils.getInteger)({
      data: attributes.abbr,
      defaultValue: 0,
      validate: function validate(x) {
        return x === 1;
      }
    });
    _this11.month = new _xfa_object.XFAObjectArray(12);
    return _this11;
  }

  return MonthNames;
}(_xfa_object.XFAObject);

var NumberPattern = /*#__PURE__*/function (_StringObject7) {
  _inherits(NumberPattern, _StringObject7);

  var _super17 = _createSuper(NumberPattern);

  function NumberPattern(attributes) {
    var _this12;

    _classCallCheck(this, NumberPattern);

    _this12 = _super17.call(this, LOCALE_SET_NS_ID, "numberPattern");
    _this12.name = (0, _utils.getStringOption)(attributes.name, ["full", "long", "med", "short"]);
    return _this12;
  }

  return NumberPattern;
}(_xfa_object.StringObject);

var NumberPatterns = /*#__PURE__*/function (_XFAObject10) {
  _inherits(NumberPatterns, _XFAObject10);

  var _super18 = _createSuper(NumberPatterns);

  function NumberPatterns(attributes) {
    var _this13;

    _classCallCheck(this, NumberPatterns);

    _this13 = _super18.call(this, LOCALE_SET_NS_ID, "numberPatterns", true);
    _this13.numberPattern = new _xfa_object.XFAObjectArray(4);
    return _this13;
  }

  return NumberPatterns;
}(_xfa_object.XFAObject);

var NumberSymbol = /*#__PURE__*/function (_StringObject8) {
  _inherits(NumberSymbol, _StringObject8);

  var _super19 = _createSuper(NumberSymbol);

  function NumberSymbol(attributes) {
    var _this14;

    _classCallCheck(this, NumberSymbol);

    _this14 = _super19.call(this, LOCALE_SET_NS_ID, "numberSymbol");
    _this14.name = (0, _utils.getStringOption)(attributes.name, ["decimal", "grouping", "percent", "minus", "zero"]);
    return _this14;
  }

  return NumberSymbol;
}(_xfa_object.StringObject);

var NumberSymbols = /*#__PURE__*/function (_XFAObject11) {
  _inherits(NumberSymbols, _XFAObject11);

  var _super20 = _createSuper(NumberSymbols);

  function NumberSymbols(attributes) {
    var _this15;

    _classCallCheck(this, NumberSymbols);

    _this15 = _super20.call(this, LOCALE_SET_NS_ID, "numberSymbols", true);
    _this15.numberSymbol = new _xfa_object.XFAObjectArray(5);
    return _this15;
  }

  return NumberSymbols;
}(_xfa_object.XFAObject);

var TimePattern = /*#__PURE__*/function (_StringObject9) {
  _inherits(TimePattern, _StringObject9);

  var _super21 = _createSuper(TimePattern);

  function TimePattern(attributes) {
    var _this16;

    _classCallCheck(this, TimePattern);

    _this16 = _super21.call(this, LOCALE_SET_NS_ID, "timePattern");
    _this16.name = (0, _utils.getStringOption)(attributes.name, ["full", "long", "med", "short"]);
    return _this16;
  }

  return TimePattern;
}(_xfa_object.StringObject);

var TimePatterns = /*#__PURE__*/function (_XFAObject12) {
  _inherits(TimePatterns, _XFAObject12);

  var _super22 = _createSuper(TimePatterns);

  function TimePatterns(attributes) {
    var _this17;

    _classCallCheck(this, TimePatterns);

    _this17 = _super22.call(this, LOCALE_SET_NS_ID, "timePatterns", true);
    _this17.timePattern = new _xfa_object.XFAObjectArray(4);
    return _this17;
  }

  return TimePatterns;
}(_xfa_object.XFAObject);

var TypeFace = /*#__PURE__*/function (_XFAObject13) {
  _inherits(TypeFace, _XFAObject13);

  var _super23 = _createSuper(TypeFace);

  function TypeFace(attributes) {
    var _this18;

    _classCallCheck(this, TypeFace);

    _this18 = _super23.call(this, LOCALE_SET_NS_ID, "typeFace", true);
    _this18.name = attributes.name | "";
    return _this18;
  }

  return TypeFace;
}(_xfa_object.XFAObject);

var TypeFaces = /*#__PURE__*/function (_XFAObject14) {
  _inherits(TypeFaces, _XFAObject14);

  var _super24 = _createSuper(TypeFaces);

  function TypeFaces(attributes) {
    var _this19;

    _classCallCheck(this, TypeFaces);

    _this19 = _super24.call(this, LOCALE_SET_NS_ID, "typeFaces", true);
    _this19.typeFace = new _xfa_object.XFAObjectArray();
    return _this19;
  }

  return TypeFaces;
}(_xfa_object.XFAObject);

var LocaleSetNamespace = /*#__PURE__*/function () {
  function LocaleSetNamespace() {
    _classCallCheck(this, LocaleSetNamespace);
  }

  _createClass(LocaleSetNamespace, null, [{
    key: _namespaces.$buildXFAObject,
    value: function value(name, attributes) {
      if (LocaleSetNamespace.hasOwnProperty(name)) {
        return LocaleSetNamespace[name](attributes);
      }

      return undefined;
    }
  }, {
    key: "calendarSymbols",
    value: function calendarSymbols(attrs) {
      return new CalendarSymbols(attrs);
    }
  }, {
    key: "currencySymbol",
    value: function currencySymbol(attrs) {
      return new CurrencySymbol(attrs);
    }
  }, {
    key: "currencySymbols",
    value: function currencySymbols(attrs) {
      return new CurrencySymbols(attrs);
    }
  }, {
    key: "datePattern",
    value: function datePattern(attrs) {
      return new DatePattern(attrs);
    }
  }, {
    key: "datePatterns",
    value: function datePatterns(attrs) {
      return new DatePatterns(attrs);
    }
  }, {
    key: "dateTimeSymbols",
    value: function dateTimeSymbols(attrs) {
      return new DateTimeSymbols(attrs);
    }
  }, {
    key: "day",
    value: function day(attrs) {
      return new Day(attrs);
    }
  }, {
    key: "dayNames",
    value: function dayNames(attrs) {
      return new DayNames(attrs);
    }
  }, {
    key: "era",
    value: function era(attrs) {
      return new Era(attrs);
    }
  }, {
    key: "eraNames",
    value: function eraNames(attrs) {
      return new EraNames(attrs);
    }
  }, {
    key: "locale",
    value: function locale(attrs) {
      return new Locale(attrs);
    }
  }, {
    key: "localeSet",
    value: function localeSet(attrs) {
      return new LocaleSet(attrs);
    }
  }, {
    key: "meridiem",
    value: function meridiem(attrs) {
      return new Meridiem(attrs);
    }
  }, {
    key: "meridiemNames",
    value: function meridiemNames(attrs) {
      return new MeridiemNames(attrs);
    }
  }, {
    key: "month",
    value: function month(attrs) {
      return new Month(attrs);
    }
  }, {
    key: "monthNames",
    value: function monthNames(attrs) {
      return new MonthNames(attrs);
    }
  }, {
    key: "numberPattern",
    value: function numberPattern(attrs) {
      return new NumberPattern(attrs);
    }
  }, {
    key: "numberPatterns",
    value: function numberPatterns(attrs) {
      return new NumberPatterns(attrs);
    }
  }, {
    key: "numberSymbol",
    value: function numberSymbol(attrs) {
      return new NumberSymbol(attrs);
    }
  }, {
    key: "numberSymbols",
    value: function numberSymbols(attrs) {
      return new NumberSymbols(attrs);
    }
  }, {
    key: "timePattern",
    value: function timePattern(attrs) {
      return new TimePattern(attrs);
    }
  }, {
    key: "timePatterns",
    value: function timePatterns(attrs) {
      return new TimePatterns(attrs);
    }
  }, {
    key: "typeFace",
    value: function typeFace(attrs) {
      return new TypeFace(attrs);
    }
  }, {
    key: "typeFaces",
    value: function typeFaces(attrs) {
      return new TypeFaces(attrs);
    }
  }]);

  return LocaleSetNamespace;
}();

exports.LocaleSetNamespace = LocaleSetNamespace;