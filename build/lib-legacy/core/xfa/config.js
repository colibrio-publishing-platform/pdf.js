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
exports.ConfigNamespace = void 0;

var _namespaces = require("./namespaces.js");

var _xfa_object = require("./xfa_object.js");

var _utils = require("./utils.js");

var _util = require("../../shared/util.js");

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

var CONFIG_NS_ID = _namespaces.NamespaceIds.config.id;

var Acrobat = /*#__PURE__*/function (_XFAObject) {
  _inherits(Acrobat, _XFAObject);

  var _super = _createSuper(Acrobat);

  function Acrobat(attributes) {
    var _this;

    _classCallCheck(this, Acrobat);

    _this = _super.call(this, CONFIG_NS_ID, "acrobat", true);
    _this.acrobat7 = null;
    _this.autoSave = null;
    _this.common = null;
    _this.validate = null;
    _this.validateApprovalSignatures = null;
    _this.submitUrl = new _xfa_object.XFAObjectArray();
    return _this;
  }

  return Acrobat;
}(_xfa_object.XFAObject);

var Acrobat7 = /*#__PURE__*/function (_XFAObject2) {
  _inherits(Acrobat7, _XFAObject2);

  var _super2 = _createSuper(Acrobat7);

  function Acrobat7(attributes) {
    var _this2;

    _classCallCheck(this, Acrobat7);

    _this2 = _super2.call(this, CONFIG_NS_ID, "acrobat7", true);
    _this2.dynamicRender = null;
    return _this2;
  }

  return Acrobat7;
}(_xfa_object.XFAObject);

var _ADBE_JSConsole = /*#__PURE__*/function (_OptionObject) {
  _inherits(ADBE_JSConsole, _OptionObject);

  var _super3 = _createSuper(ADBE_JSConsole);

  function ADBE_JSConsole(attributes) {
    _classCallCheck(this, ADBE_JSConsole);

    return _super3.call(this, CONFIG_NS_ID, "ADBE_JSConsole", ["delegate", "Enable", "Disable"]);
  }

  return ADBE_JSConsole;
}(_xfa_object.OptionObject);

var _ADBE_JSDebugger = /*#__PURE__*/function (_OptionObject2) {
  _inherits(ADBE_JSDebugger, _OptionObject2);

  var _super4 = _createSuper(ADBE_JSDebugger);

  function ADBE_JSDebugger(attributes) {
    _classCallCheck(this, ADBE_JSDebugger);

    return _super4.call(this, CONFIG_NS_ID, "ADBE_JSDebugger", ["delegate", "Enable", "Disable"]);
  }

  return ADBE_JSDebugger;
}(_xfa_object.OptionObject);

var AddSilentPrint = /*#__PURE__*/function (_Option) {
  _inherits(AddSilentPrint, _Option);

  var _super5 = _createSuper(AddSilentPrint);

  function AddSilentPrint(attributes) {
    _classCallCheck(this, AddSilentPrint);

    return _super5.call(this, CONFIG_NS_ID, "addSilentPrint");
  }

  return AddSilentPrint;
}(_xfa_object.Option01);

var AddViewerPreferences = /*#__PURE__*/function (_Option2) {
  _inherits(AddViewerPreferences, _Option2);

  var _super6 = _createSuper(AddViewerPreferences);

  function AddViewerPreferences(attributes) {
    _classCallCheck(this, AddViewerPreferences);

    return _super6.call(this, CONFIG_NS_ID, "addViewerPreferences");
  }

  return AddViewerPreferences;
}(_xfa_object.Option01);

var AdjustData = /*#__PURE__*/function (_Option3) {
  _inherits(AdjustData, _Option3);

  var _super7 = _createSuper(AdjustData);

  function AdjustData(attributes) {
    _classCallCheck(this, AdjustData);

    return _super7.call(this, CONFIG_NS_ID, "adjustData");
  }

  return AdjustData;
}(_xfa_object.Option10);

var AdobeExtensionLevel = /*#__PURE__*/function (_IntegerObject) {
  _inherits(AdobeExtensionLevel, _IntegerObject);

  var _super8 = _createSuper(AdobeExtensionLevel);

  function AdobeExtensionLevel(attributes) {
    _classCallCheck(this, AdobeExtensionLevel);

    return _super8.call(this, CONFIG_NS_ID, "adobeExtensionLevel", 0, function (n) {
      return n >= 1 && n <= 8;
    });
  }

  return AdobeExtensionLevel;
}(_xfa_object.IntegerObject);

var Agent = /*#__PURE__*/function (_XFAObject3) {
  _inherits(Agent, _XFAObject3);

  var _super9 = _createSuper(Agent);

  function Agent(attributes) {
    var _this3;

    _classCallCheck(this, Agent);

    _this3 = _super9.call(this, CONFIG_NS_ID, "agent", true);
    _this3.name = attributes.name ? attributes.name.trim() : "";
    _this3.common = new _xfa_object.XFAObjectArray();
    return _this3;
  }

  return Agent;
}(_xfa_object.XFAObject);

var AlwaysEmbed = /*#__PURE__*/function (_ContentObject) {
  _inherits(AlwaysEmbed, _ContentObject);

  var _super10 = _createSuper(AlwaysEmbed);

  function AlwaysEmbed(attributes) {
    _classCallCheck(this, AlwaysEmbed);

    return _super10.call(this, CONFIG_NS_ID, "alwaysEmbed");
  }

  return AlwaysEmbed;
}(_xfa_object.ContentObject);

var Amd = /*#__PURE__*/function (_StringObject) {
  _inherits(Amd, _StringObject);

  var _super11 = _createSuper(Amd);

  function Amd(attributes) {
    _classCallCheck(this, Amd);

    return _super11.call(this, CONFIG_NS_ID, "amd");
  }

  return Amd;
}(_xfa_object.StringObject);

var Area = /*#__PURE__*/function (_XFAObject4) {
  _inherits(Area, _XFAObject4);

  var _super12 = _createSuper(Area);

  function Area(attributes) {
    var _this4;

    _classCallCheck(this, Area);

    _this4 = _super12.call(this, CONFIG_NS_ID, "area");
    _this4.level = (0, _utils.getInteger)({
      data: attributes.level,
      defaultValue: 0,
      validate: function validate(n) {
        return n >= 1 && n <= 3;
      }
    });
    _this4.name = (0, _utils.getStringOption)(attributes.name, ["", "barcode", "coreinit", "deviceDriver", "font", "general", "layout", "merge", "script", "signature", "sourceSet", "templateCache"]);
    return _this4;
  }

  return Area;
}(_xfa_object.XFAObject);

var Attributes = /*#__PURE__*/function (_OptionObject3) {
  _inherits(Attributes, _OptionObject3);

  var _super13 = _createSuper(Attributes);

  function Attributes(attributes) {
    _classCallCheck(this, Attributes);

    return _super13.call(this, CONFIG_NS_ID, "attributes", ["preserve", "delegate", "ignore"]);
  }

  return Attributes;
}(_xfa_object.OptionObject);

var AutoSave = /*#__PURE__*/function (_OptionObject4) {
  _inherits(AutoSave, _OptionObject4);

  var _super14 = _createSuper(AutoSave);

  function AutoSave(attributes) {
    _classCallCheck(this, AutoSave);

    return _super14.call(this, CONFIG_NS_ID, "autoSave", ["disabled", "enabled"]);
  }

  return AutoSave;
}(_xfa_object.OptionObject);

var Base = /*#__PURE__*/function (_StringObject2) {
  _inherits(Base, _StringObject2);

  var _super15 = _createSuper(Base);

  function Base(attributes) {
    _classCallCheck(this, Base);

    return _super15.call(this, CONFIG_NS_ID, "base");
  }

  return Base;
}(_xfa_object.StringObject);

var BatchOutput = /*#__PURE__*/function (_XFAObject5) {
  _inherits(BatchOutput, _XFAObject5);

  var _super16 = _createSuper(BatchOutput);

  function BatchOutput(attributes) {
    var _this5;

    _classCallCheck(this, BatchOutput);

    _this5 = _super16.call(this, CONFIG_NS_ID, "batchOutput");
    _this5.format = (0, _utils.getStringOption)(attributes.format, ["none", "concat", "zip", "zipCompress"]);
    return _this5;
  }

  return BatchOutput;
}(_xfa_object.XFAObject);

var BehaviorOverride = /*#__PURE__*/function (_ContentObject2) {
  _inherits(BehaviorOverride, _ContentObject2);

  var _super17 = _createSuper(BehaviorOverride);

  function BehaviorOverride(attributes) {
    _classCallCheck(this, BehaviorOverride);

    return _super17.call(this, CONFIG_NS_ID, "behaviorOverride");
  }

  _createClass(BehaviorOverride, [{
    key: _xfa_object.$finalize,
    value: function value() {
      this[_xfa_object.$content] = new Map(this[_xfa_object.$content].trim().split(/\s+/).filter(function (x) {
        return x.includes(":");
      }).map(function (x) {
        return x.split(":", 2);
      }));
    }
  }]);

  return BehaviorOverride;
}(_xfa_object.ContentObject);

var Cache = /*#__PURE__*/function (_XFAObject6) {
  _inherits(Cache, _XFAObject6);

  var _super18 = _createSuper(Cache);

  function Cache(attributes) {
    var _this6;

    _classCallCheck(this, Cache);

    _this6 = _super18.call(this, CONFIG_NS_ID, "cache", true);
    _this6.templateCache = null;
    return _this6;
  }

  return Cache;
}(_xfa_object.XFAObject);

var Change = /*#__PURE__*/function (_Option4) {
  _inherits(Change, _Option4);

  var _super19 = _createSuper(Change);

  function Change(attributes) {
    _classCallCheck(this, Change);

    return _super19.call(this, CONFIG_NS_ID, "change");
  }

  return Change;
}(_xfa_object.Option01);

var Common = /*#__PURE__*/function (_XFAObject7) {
  _inherits(Common, _XFAObject7);

  var _super20 = _createSuper(Common);

  function Common(attributes) {
    var _this7;

    _classCallCheck(this, Common);

    _this7 = _super20.call(this, CONFIG_NS_ID, "common", true);
    _this7.data = null;
    _this7.locale = null;
    _this7.localeSet = null;
    _this7.messaging = null;
    _this7.suppressBanner = null;
    _this7.template = null;
    _this7.validationMessaging = null;
    _this7.versionControl = null;
    _this7.log = new _xfa_object.XFAObjectArray();
    return _this7;
  }

  return Common;
}(_xfa_object.XFAObject);

var Compress = /*#__PURE__*/function (_XFAObject8) {
  _inherits(Compress, _XFAObject8);

  var _super21 = _createSuper(Compress);

  function Compress(attributes) {
    var _this8;

    _classCallCheck(this, Compress);

    _this8 = _super21.call(this, CONFIG_NS_ID, "compress");
    _this8.scope = (0, _utils.getStringOption)(attributes.scope, ["imageOnly", "document"]);
    return _this8;
  }

  return Compress;
}(_xfa_object.XFAObject);

var CompressLogicalStructure = /*#__PURE__*/function (_Option5) {
  _inherits(CompressLogicalStructure, _Option5);

  var _super22 = _createSuper(CompressLogicalStructure);

  function CompressLogicalStructure(attributes) {
    _classCallCheck(this, CompressLogicalStructure);

    return _super22.call(this, CONFIG_NS_ID, "compressLogicalStructure");
  }

  return CompressLogicalStructure;
}(_xfa_object.Option01);

var CompressObjectStream = /*#__PURE__*/function (_Option6) {
  _inherits(CompressObjectStream, _Option6);

  var _super23 = _createSuper(CompressObjectStream);

  function CompressObjectStream(attributes) {
    _classCallCheck(this, CompressObjectStream);

    return _super23.call(this, CONFIG_NS_ID, "compressObjectStream");
  }

  return CompressObjectStream;
}(_xfa_object.Option10);

var Compression = /*#__PURE__*/function (_XFAObject9) {
  _inherits(Compression, _XFAObject9);

  var _super24 = _createSuper(Compression);

  function Compression(attributes) {
    var _this9;

    _classCallCheck(this, Compression);

    _this9 = _super24.call(this, CONFIG_NS_ID, "compression", true);
    _this9.compressLogicalStructure = null;
    _this9.compressObjectStream = null;
    _this9.level = null;
    _this9.type = null;
    return _this9;
  }

  return Compression;
}(_xfa_object.XFAObject);

var Config = /*#__PURE__*/function (_XFAObject10) {
  _inherits(Config, _XFAObject10);

  var _super25 = _createSuper(Config);

  function Config(attributes) {
    var _this10;

    _classCallCheck(this, Config);

    _this10 = _super25.call(this, CONFIG_NS_ID, "config", true);
    _this10.acrobat = null;
    _this10.present = null;
    _this10.trace = null;
    _this10.agent = new _xfa_object.XFAObjectArray();
    return _this10;
  }

  return Config;
}(_xfa_object.XFAObject);

var Conformance = /*#__PURE__*/function (_OptionObject5) {
  _inherits(Conformance, _OptionObject5);

  var _super26 = _createSuper(Conformance);

  function Conformance(attributes) {
    _classCallCheck(this, Conformance);

    return _super26.call(this, CONFIG_NS_ID, "conformance", ["A", "B"]);
  }

  return Conformance;
}(_xfa_object.OptionObject);

var ContentCopy = /*#__PURE__*/function (_Option7) {
  _inherits(ContentCopy, _Option7);

  var _super27 = _createSuper(ContentCopy);

  function ContentCopy(attributes) {
    _classCallCheck(this, ContentCopy);

    return _super27.call(this, CONFIG_NS_ID, "contentCopy");
  }

  return ContentCopy;
}(_xfa_object.Option01);

var Copies = /*#__PURE__*/function (_IntegerObject2) {
  _inherits(Copies, _IntegerObject2);

  var _super28 = _createSuper(Copies);

  function Copies(attributes) {
    _classCallCheck(this, Copies);

    return _super28.call(this, CONFIG_NS_ID, "copies", 1, function (n) {
      return n >= 1;
    });
  }

  return Copies;
}(_xfa_object.IntegerObject);

var Creator = /*#__PURE__*/function (_StringObject3) {
  _inherits(Creator, _StringObject3);

  var _super29 = _createSuper(Creator);

  function Creator(attributes) {
    _classCallCheck(this, Creator);

    return _super29.call(this, CONFIG_NS_ID, "creator");
  }

  return Creator;
}(_xfa_object.StringObject);

var CurrentPage = /*#__PURE__*/function (_IntegerObject3) {
  _inherits(CurrentPage, _IntegerObject3);

  var _super30 = _createSuper(CurrentPage);

  function CurrentPage(attributes) {
    _classCallCheck(this, CurrentPage);

    return _super30.call(this, CONFIG_NS_ID, "currentPage", 0, function (n) {
      return n >= 0;
    });
  }

  return CurrentPage;
}(_xfa_object.IntegerObject);

var Data = /*#__PURE__*/function (_XFAObject11) {
  _inherits(Data, _XFAObject11);

  var _super31 = _createSuper(Data);

  function Data(attributes) {
    var _this11;

    _classCallCheck(this, Data);

    _this11 = _super31.call(this, CONFIG_NS_ID, "data", true);
    _this11.adjustData = null;
    _this11.attributes = null;
    _this11.incrementalLoad = null;
    _this11.outputXSL = null;
    _this11.range = null;
    _this11.record = null;
    _this11.startNode = null;
    _this11.uri = null;
    _this11.window = null;
    _this11.xsl = null;
    _this11.excludeNS = new _xfa_object.XFAObjectArray();
    _this11.transform = new _xfa_object.XFAObjectArray();
    return _this11;
  }

  return Data;
}(_xfa_object.XFAObject);

var Debug = /*#__PURE__*/function (_XFAObject12) {
  _inherits(Debug, _XFAObject12);

  var _super32 = _createSuper(Debug);

  function Debug(attributes) {
    var _this12;

    _classCallCheck(this, Debug);

    _this12 = _super32.call(this, CONFIG_NS_ID, "debug", true);
    _this12.uri = null;
    return _this12;
  }

  return Debug;
}(_xfa_object.XFAObject);

var DefaultTypeface = /*#__PURE__*/function (_ContentObject3) {
  _inherits(DefaultTypeface, _ContentObject3);

  var _super33 = _createSuper(DefaultTypeface);

  function DefaultTypeface(attributes) {
    var _this13;

    _classCallCheck(this, DefaultTypeface);

    _this13 = _super33.call(this, CONFIG_NS_ID, "defaultTypeface");
    _this13.writingScript = (0, _utils.getStringOption)(attributes.writingScript, ["*", "Arabic", "Cyrillic", "EastEuropeanRoman", "Greek", "Hebrew", "Japanese", "Korean", "Roman", "SimplifiedChinese", "Thai", "TraditionalChinese", "Vietnamese"]);
    return _this13;
  }

  return DefaultTypeface;
}(_xfa_object.ContentObject);

var Destination = /*#__PURE__*/function (_OptionObject6) {
  _inherits(Destination, _OptionObject6);

  var _super34 = _createSuper(Destination);

  function Destination(attributes) {
    _classCallCheck(this, Destination);

    return _super34.call(this, CONFIG_NS_ID, "destination", ["pdf", "pcl", "ps", "webClient", "zpl"]);
  }

  return Destination;
}(_xfa_object.OptionObject);

var DocumentAssembly = /*#__PURE__*/function (_Option8) {
  _inherits(DocumentAssembly, _Option8);

  var _super35 = _createSuper(DocumentAssembly);

  function DocumentAssembly(attributes) {
    _classCallCheck(this, DocumentAssembly);

    return _super35.call(this, CONFIG_NS_ID, "documentAssembly");
  }

  return DocumentAssembly;
}(_xfa_object.Option01);

var Driver = /*#__PURE__*/function (_XFAObject13) {
  _inherits(Driver, _XFAObject13);

  var _super36 = _createSuper(Driver);

  function Driver(attributes) {
    var _this14;

    _classCallCheck(this, Driver);

    _this14 = _super36.call(this, CONFIG_NS_ID, "driver", true);
    _this14.name = attributes.name ? attributes.name.trim() : "";
    _this14.fontInfo = null;
    _this14.xdc = null;
    return _this14;
  }

  return Driver;
}(_xfa_object.XFAObject);

var DuplexOption = /*#__PURE__*/function (_OptionObject7) {
  _inherits(DuplexOption, _OptionObject7);

  var _super37 = _createSuper(DuplexOption);

  function DuplexOption(attributes) {
    _classCallCheck(this, DuplexOption);

    return _super37.call(this, CONFIG_NS_ID, "duplexOption", ["simplex", "duplexFlipLongEdge", "duplexFlipShortEdge"]);
  }

  return DuplexOption;
}(_xfa_object.OptionObject);

var DynamicRender = /*#__PURE__*/function (_OptionObject8) {
  _inherits(DynamicRender, _OptionObject8);

  var _super38 = _createSuper(DynamicRender);

  function DynamicRender(attributes) {
    _classCallCheck(this, DynamicRender);

    return _super38.call(this, CONFIG_NS_ID, "dynamicRender", ["forbidden", "required"]);
  }

  return DynamicRender;
}(_xfa_object.OptionObject);

var Embed = /*#__PURE__*/function (_Option9) {
  _inherits(Embed, _Option9);

  var _super39 = _createSuper(Embed);

  function Embed(attributes) {
    _classCallCheck(this, Embed);

    return _super39.call(this, CONFIG_NS_ID, "embed");
  }

  return Embed;
}(_xfa_object.Option01);

var Encrypt = /*#__PURE__*/function (_Option10) {
  _inherits(Encrypt, _Option10);

  var _super40 = _createSuper(Encrypt);

  function Encrypt(attributes) {
    _classCallCheck(this, Encrypt);

    return _super40.call(this, CONFIG_NS_ID, "encrypt");
  }

  return Encrypt;
}(_xfa_object.Option01);

var Encryption = /*#__PURE__*/function (_XFAObject14) {
  _inherits(Encryption, _XFAObject14);

  var _super41 = _createSuper(Encryption);

  function Encryption(attributes) {
    var _this15;

    _classCallCheck(this, Encryption);

    _this15 = _super41.call(this, CONFIG_NS_ID, "encryption", true);
    _this15.encrypt = null;
    _this15.encryptionLevel = null;
    _this15.permissions = null;
    return _this15;
  }

  return Encryption;
}(_xfa_object.XFAObject);

var EncryptionLevel = /*#__PURE__*/function (_OptionObject9) {
  _inherits(EncryptionLevel, _OptionObject9);

  var _super42 = _createSuper(EncryptionLevel);

  function EncryptionLevel(attributes) {
    _classCallCheck(this, EncryptionLevel);

    return _super42.call(this, CONFIG_NS_ID, "encryptionLevel", ["40bit", "128bit"]);
  }

  return EncryptionLevel;
}(_xfa_object.OptionObject);

var Enforce = /*#__PURE__*/function (_StringObject4) {
  _inherits(Enforce, _StringObject4);

  var _super43 = _createSuper(Enforce);

  function Enforce(attributes) {
    _classCallCheck(this, Enforce);

    return _super43.call(this, CONFIG_NS_ID, "enforce");
  }

  return Enforce;
}(_xfa_object.StringObject);

var Equate = /*#__PURE__*/function (_XFAObject15) {
  _inherits(Equate, _XFAObject15);

  var _super44 = _createSuper(Equate);

  function Equate(attributes) {
    var _this16;

    _classCallCheck(this, Equate);

    _this16 = _super44.call(this, CONFIG_NS_ID, "equate");
    _this16.force = (0, _utils.getInteger)({
      data: attributes.force,
      defaultValue: 1,
      validate: function validate(n) {
        return n === 0;
      }
    });
    _this16.from = attributes.from || "";
    _this16.to = attributes.to || "";
    return _this16;
  }

  return Equate;
}(_xfa_object.XFAObject);

var EquateRange = /*#__PURE__*/function (_XFAObject16) {
  _inherits(EquateRange, _XFAObject16);

  var _super45 = _createSuper(EquateRange);

  function EquateRange(attributes) {
    var _this17;

    _classCallCheck(this, EquateRange);

    _this17 = _super45.call(this, CONFIG_NS_ID, "equateRange");
    _this17.from = attributes.from || "";
    _this17.to = attributes.to || "";
    _this17._unicodeRange = attributes.unicodeRange || "";
    return _this17;
  }

  _createClass(EquateRange, [{
    key: "unicodeRange",
    get: function get() {
      var ranges = [];
      var unicodeRegex = /U\+([0-9a-fA-F]+)/;
      var unicodeRange = this._unicodeRange;

      var _iterator = _createForOfIteratorHelper(unicodeRange.split(",").map(function (x) {
        return x.trim();
      }).filter(function (x) {
        return !!x;
      })),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var range = _step.value;
          range = range.split("-", 2).map(function (x) {
            var found = x.match(unicodeRegex);

            if (!found) {
              return 0;
            }

            return parseInt(found[1], 16);
          });

          if (range.length === 1) {
            range.push(range[0]);
          }

          ranges.push(range);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return (0, _util.shadow)(this, "unicodeRange", ranges);
    }
  }]);

  return EquateRange;
}(_xfa_object.XFAObject);

var Exclude = /*#__PURE__*/function (_ContentObject4) {
  _inherits(Exclude, _ContentObject4);

  var _super46 = _createSuper(Exclude);

  function Exclude(attributes) {
    _classCallCheck(this, Exclude);

    return _super46.call(this, CONFIG_NS_ID, "exclude");
  }

  _createClass(Exclude, [{
    key: _xfa_object.$finalize,
    value: function value() {
      this[_xfa_object.$content] = this[_xfa_object.$content].trim().split(/\s+/).filter(function (x) {
        return x && ["calculate", "close", "enter", "exit", "initialize", "ready", "validate"].includes(x);
      });
    }
  }]);

  return Exclude;
}(_xfa_object.ContentObject);

var ExcludeNS = /*#__PURE__*/function (_StringObject5) {
  _inherits(ExcludeNS, _StringObject5);

  var _super47 = _createSuper(ExcludeNS);

  function ExcludeNS(attributes) {
    _classCallCheck(this, ExcludeNS);

    return _super47.call(this, CONFIG_NS_ID, "excludeNS");
  }

  return ExcludeNS;
}(_xfa_object.StringObject);

var FlipLabel = /*#__PURE__*/function (_OptionObject10) {
  _inherits(FlipLabel, _OptionObject10);

  var _super48 = _createSuper(FlipLabel);

  function FlipLabel(attributes) {
    _classCallCheck(this, FlipLabel);

    return _super48.call(this, CONFIG_NS_ID, "flipLabel", ["usePrinterSetting", "on", "off"]);
  }

  return FlipLabel;
}(_xfa_object.OptionObject);

var FontInfo = /*#__PURE__*/function (_XFAObject17) {
  _inherits(FontInfo, _XFAObject17);

  var _super49 = _createSuper(FontInfo);

  function FontInfo(attributes) {
    var _this18;

    _classCallCheck(this, FontInfo);

    _this18 = _super49.call(this, CONFIG_NS_ID, "fontInfo", true);
    _this18.embed = null;
    _this18.map = null;
    _this18.subsetBelow = null;
    _this18.alwaysEmbed = new _xfa_object.XFAObjectArray();
    _this18.defaultTypeface = new _xfa_object.XFAObjectArray();
    _this18.neverEmbed = new _xfa_object.XFAObjectArray();
    return _this18;
  }

  return FontInfo;
}(_xfa_object.XFAObject);

var FormFieldFilling = /*#__PURE__*/function (_Option11) {
  _inherits(FormFieldFilling, _Option11);

  var _super50 = _createSuper(FormFieldFilling);

  function FormFieldFilling(attributes) {
    _classCallCheck(this, FormFieldFilling);

    return _super50.call(this, CONFIG_NS_ID, "formFieldFilling");
  }

  return FormFieldFilling;
}(_xfa_object.Option01);

var GroupParent = /*#__PURE__*/function (_StringObject6) {
  _inherits(GroupParent, _StringObject6);

  var _super51 = _createSuper(GroupParent);

  function GroupParent(attributes) {
    _classCallCheck(this, GroupParent);

    return _super51.call(this, CONFIG_NS_ID, "groupParent");
  }

  return GroupParent;
}(_xfa_object.StringObject);

var IfEmpty = /*#__PURE__*/function (_OptionObject11) {
  _inherits(IfEmpty, _OptionObject11);

  var _super52 = _createSuper(IfEmpty);

  function IfEmpty(attributes) {
    _classCallCheck(this, IfEmpty);

    return _super52.call(this, CONFIG_NS_ID, "ifEmpty", ["dataValue", "dataGroup", "ignore", "remove"]);
  }

  return IfEmpty;
}(_xfa_object.OptionObject);

var IncludeXDPContent = /*#__PURE__*/function (_StringObject7) {
  _inherits(IncludeXDPContent, _StringObject7);

  var _super53 = _createSuper(IncludeXDPContent);

  function IncludeXDPContent(attributes) {
    _classCallCheck(this, IncludeXDPContent);

    return _super53.call(this, CONFIG_NS_ID, "includeXDPContent");
  }

  return IncludeXDPContent;
}(_xfa_object.StringObject);

var IncrementalLoad = /*#__PURE__*/function (_OptionObject12) {
  _inherits(IncrementalLoad, _OptionObject12);

  var _super54 = _createSuper(IncrementalLoad);

  function IncrementalLoad(attributes) {
    _classCallCheck(this, IncrementalLoad);

    return _super54.call(this, CONFIG_NS_ID, "incrementalLoad", ["none", "forwardOnly"]);
  }

  return IncrementalLoad;
}(_xfa_object.OptionObject);

var IncrementalMerge = /*#__PURE__*/function (_Option12) {
  _inherits(IncrementalMerge, _Option12);

  var _super55 = _createSuper(IncrementalMerge);

  function IncrementalMerge(attributes) {
    _classCallCheck(this, IncrementalMerge);

    return _super55.call(this, CONFIG_NS_ID, "incrementalMerge");
  }

  return IncrementalMerge;
}(_xfa_object.Option01);

var Interactive = /*#__PURE__*/function (_Option13) {
  _inherits(Interactive, _Option13);

  var _super56 = _createSuper(Interactive);

  function Interactive(attributes) {
    _classCallCheck(this, Interactive);

    return _super56.call(this, CONFIG_NS_ID, "interactive");
  }

  return Interactive;
}(_xfa_object.Option01);

var Jog = /*#__PURE__*/function (_OptionObject13) {
  _inherits(Jog, _OptionObject13);

  var _super57 = _createSuper(Jog);

  function Jog(attributes) {
    _classCallCheck(this, Jog);

    return _super57.call(this, CONFIG_NS_ID, "jog", ["usePrinterSetting", "none", "pageSet"]);
  }

  return Jog;
}(_xfa_object.OptionObject);

var LabelPrinter = /*#__PURE__*/function (_XFAObject18) {
  _inherits(LabelPrinter, _XFAObject18);

  var _super58 = _createSuper(LabelPrinter);

  function LabelPrinter(attributes) {
    var _this19;

    _classCallCheck(this, LabelPrinter);

    _this19 = _super58.call(this, CONFIG_NS_ID, "labelPrinter", true);
    _this19.name = (0, _utils.getStringOption)(attributes.name, ["zpl", "dpl", "ipl", "tcpl"]);
    _this19.batchOutput = null;
    _this19.flipLabel = null;
    _this19.fontInfo = null;
    _this19.xdc = null;
    return _this19;
  }

  return LabelPrinter;
}(_xfa_object.XFAObject);

var Layout = /*#__PURE__*/function (_OptionObject14) {
  _inherits(Layout, _OptionObject14);

  var _super59 = _createSuper(Layout);

  function Layout(attributes) {
    _classCallCheck(this, Layout);

    return _super59.call(this, CONFIG_NS_ID, "layout", ["paginate", "panel"]);
  }

  return Layout;
}(_xfa_object.OptionObject);

var Level = /*#__PURE__*/function (_IntegerObject4) {
  _inherits(Level, _IntegerObject4);

  var _super60 = _createSuper(Level);

  function Level(attributes) {
    _classCallCheck(this, Level);

    return _super60.call(this, CONFIG_NS_ID, "level", 0, function (n) {
      return n > 0;
    });
  }

  return Level;
}(_xfa_object.IntegerObject);

var Linearized = /*#__PURE__*/function (_Option14) {
  _inherits(Linearized, _Option14);

  var _super61 = _createSuper(Linearized);

  function Linearized(attributes) {
    _classCallCheck(this, Linearized);

    return _super61.call(this, CONFIG_NS_ID, "linearized");
  }

  return Linearized;
}(_xfa_object.Option01);

var Locale = /*#__PURE__*/function (_StringObject8) {
  _inherits(Locale, _StringObject8);

  var _super62 = _createSuper(Locale);

  function Locale(attributes) {
    _classCallCheck(this, Locale);

    return _super62.call(this, CONFIG_NS_ID, "locale");
  }

  return Locale;
}(_xfa_object.StringObject);

var LocaleSet = /*#__PURE__*/function (_StringObject9) {
  _inherits(LocaleSet, _StringObject9);

  var _super63 = _createSuper(LocaleSet);

  function LocaleSet(attributes) {
    _classCallCheck(this, LocaleSet);

    return _super63.call(this, CONFIG_NS_ID, "localeSet");
  }

  return LocaleSet;
}(_xfa_object.StringObject);

var Log = /*#__PURE__*/function (_XFAObject19) {
  _inherits(Log, _XFAObject19);

  var _super64 = _createSuper(Log);

  function Log(attributes) {
    var _this20;

    _classCallCheck(this, Log);

    _this20 = _super64.call(this, CONFIG_NS_ID, "log", true);
    _this20.mode = null;
    _this20.threshold = null;
    _this20.to = null;
    _this20.uri = null;
    return _this20;
  }

  return Log;
}(_xfa_object.XFAObject);

var MapElement = /*#__PURE__*/function (_XFAObject20) {
  _inherits(MapElement, _XFAObject20);

  var _super65 = _createSuper(MapElement);

  function MapElement(attributes) {
    var _this21;

    _classCallCheck(this, MapElement);

    _this21 = _super65.call(this, CONFIG_NS_ID, "map", true);
    _this21.equate = new _xfa_object.XFAObjectArray();
    _this21.equateRange = new _xfa_object.XFAObjectArray();
    return _this21;
  }

  return MapElement;
}(_xfa_object.XFAObject);

var MediumInfo = /*#__PURE__*/function (_XFAObject21) {
  _inherits(MediumInfo, _XFAObject21);

  var _super66 = _createSuper(MediumInfo);

  function MediumInfo(attributes) {
    var _this22;

    _classCallCheck(this, MediumInfo);

    _this22 = _super66.call(this, CONFIG_NS_ID, "mediumInfo", true);
    _this22.map = null;
    return _this22;
  }

  return MediumInfo;
}(_xfa_object.XFAObject);

var Message = /*#__PURE__*/function (_XFAObject22) {
  _inherits(Message, _XFAObject22);

  var _super67 = _createSuper(Message);

  function Message(attributes) {
    var _this23;

    _classCallCheck(this, Message);

    _this23 = _super67.call(this, CONFIG_NS_ID, "message", true);
    _this23.msgId = null;
    _this23.severity = null;
    return _this23;
  }

  return Message;
}(_xfa_object.XFAObject);

var Messaging = /*#__PURE__*/function (_XFAObject23) {
  _inherits(Messaging, _XFAObject23);

  var _super68 = _createSuper(Messaging);

  function Messaging(attributes) {
    var _this24;

    _classCallCheck(this, Messaging);

    _this24 = _super68.call(this, CONFIG_NS_ID, "messaging", true);
    _this24.message = new _xfa_object.XFAObjectArray();
    return _this24;
  }

  return Messaging;
}(_xfa_object.XFAObject);

var Mode = /*#__PURE__*/function (_OptionObject15) {
  _inherits(Mode, _OptionObject15);

  var _super69 = _createSuper(Mode);

  function Mode(attributes) {
    _classCallCheck(this, Mode);

    return _super69.call(this, CONFIG_NS_ID, "mode", ["append", "overwrite"]);
  }

  return Mode;
}(_xfa_object.OptionObject);

var ModifyAnnots = /*#__PURE__*/function (_Option15) {
  _inherits(ModifyAnnots, _Option15);

  var _super70 = _createSuper(ModifyAnnots);

  function ModifyAnnots(attributes) {
    _classCallCheck(this, ModifyAnnots);

    return _super70.call(this, CONFIG_NS_ID, "modifyAnnots");
  }

  return ModifyAnnots;
}(_xfa_object.Option01);

var MsgId = /*#__PURE__*/function (_IntegerObject5) {
  _inherits(MsgId, _IntegerObject5);

  var _super71 = _createSuper(MsgId);

  function MsgId(attributes) {
    _classCallCheck(this, MsgId);

    return _super71.call(this, CONFIG_NS_ID, "msgId", 1, function (n) {
      return n >= 1;
    });
  }

  return MsgId;
}(_xfa_object.IntegerObject);

var NameAttr = /*#__PURE__*/function (_StringObject10) {
  _inherits(NameAttr, _StringObject10);

  var _super72 = _createSuper(NameAttr);

  function NameAttr(attributes) {
    _classCallCheck(this, NameAttr);

    return _super72.call(this, CONFIG_NS_ID, "nameAttr");
  }

  return NameAttr;
}(_xfa_object.StringObject);

var NeverEmbed = /*#__PURE__*/function (_ContentObject5) {
  _inherits(NeverEmbed, _ContentObject5);

  var _super73 = _createSuper(NeverEmbed);

  function NeverEmbed(attributes) {
    _classCallCheck(this, NeverEmbed);

    return _super73.call(this, CONFIG_NS_ID, "neverEmbed");
  }

  return NeverEmbed;
}(_xfa_object.ContentObject);

var NumberOfCopies = /*#__PURE__*/function (_IntegerObject6) {
  _inherits(NumberOfCopies, _IntegerObject6);

  var _super74 = _createSuper(NumberOfCopies);

  function NumberOfCopies(attributes) {
    _classCallCheck(this, NumberOfCopies);

    return _super74.call(this, CONFIG_NS_ID, "numberOfCopies", null, function (n) {
      return n >= 2 && n <= 5;
    });
  }

  return NumberOfCopies;
}(_xfa_object.IntegerObject);

var OpenAction = /*#__PURE__*/function (_XFAObject24) {
  _inherits(OpenAction, _XFAObject24);

  var _super75 = _createSuper(OpenAction);

  function OpenAction(attributes) {
    var _this25;

    _classCallCheck(this, OpenAction);

    _this25 = _super75.call(this, CONFIG_NS_ID, "openAction", true);
    _this25.destination = null;
    return _this25;
  }

  return OpenAction;
}(_xfa_object.XFAObject);

var Output = /*#__PURE__*/function (_XFAObject25) {
  _inherits(Output, _XFAObject25);

  var _super76 = _createSuper(Output);

  function Output(attributes) {
    var _this26;

    _classCallCheck(this, Output);

    _this26 = _super76.call(this, CONFIG_NS_ID, "output", true);
    _this26.to = null;
    _this26.type = null;
    _this26.uri = null;
    return _this26;
  }

  return Output;
}(_xfa_object.XFAObject);

var OutputBin = /*#__PURE__*/function (_StringObject11) {
  _inherits(OutputBin, _StringObject11);

  var _super77 = _createSuper(OutputBin);

  function OutputBin(attributes) {
    _classCallCheck(this, OutputBin);

    return _super77.call(this, CONFIG_NS_ID, "outputBin");
  }

  return OutputBin;
}(_xfa_object.StringObject);

var OutputXSL = /*#__PURE__*/function (_XFAObject26) {
  _inherits(OutputXSL, _XFAObject26);

  var _super78 = _createSuper(OutputXSL);

  function OutputXSL(attributes) {
    var _this27;

    _classCallCheck(this, OutputXSL);

    _this27 = _super78.call(this, CONFIG_NS_ID, "outputXSL", true);
    _this27.uri = null;
    return _this27;
  }

  return OutputXSL;
}(_xfa_object.XFAObject);

var Overprint = /*#__PURE__*/function (_OptionObject16) {
  _inherits(Overprint, _OptionObject16);

  var _super79 = _createSuper(Overprint);

  function Overprint(attributes) {
    _classCallCheck(this, Overprint);

    return _super79.call(this, CONFIG_NS_ID, "overprint", ["none", "both", "draw", "field"]);
  }

  return Overprint;
}(_xfa_object.OptionObject);

var Packets = /*#__PURE__*/function (_StringObject12) {
  _inherits(Packets, _StringObject12);

  var _super80 = _createSuper(Packets);

  function Packets(attributes) {
    _classCallCheck(this, Packets);

    return _super80.call(this, CONFIG_NS_ID, "packets");
  }

  _createClass(Packets, [{
    key: _xfa_object.$finalize,
    value: function value() {
      if (this[_xfa_object.$content] === "*") {
        return;
      }

      this[_xfa_object.$content] = this[_xfa_object.$content].trim().split(/\s+/).filter(function (x) {
        return ["config", "datasets", "template", "xfdf", "xslt"].includes(x);
      });
    }
  }]);

  return Packets;
}(_xfa_object.StringObject);

var PageOffset = /*#__PURE__*/function (_XFAObject27) {
  _inherits(PageOffset, _XFAObject27);

  var _super81 = _createSuper(PageOffset);

  function PageOffset(attributes) {
    var _this28;

    _classCallCheck(this, PageOffset);

    _this28 = _super81.call(this, CONFIG_NS_ID, "pageOffset");
    _this28.x = (0, _utils.getInteger)({
      data: attributes.x,
      defaultValue: "useXDCSetting",
      validate: function validate(n) {
        return true;
      }
    });
    _this28.y = (0, _utils.getInteger)({
      data: attributes.y,
      defaultValue: "useXDCSetting",
      validate: function validate(n) {
        return true;
      }
    });
    return _this28;
  }

  return PageOffset;
}(_xfa_object.XFAObject);

var PageRange = /*#__PURE__*/function (_StringObject13) {
  _inherits(PageRange, _StringObject13);

  var _super82 = _createSuper(PageRange);

  function PageRange(attributes) {
    _classCallCheck(this, PageRange);

    return _super82.call(this, CONFIG_NS_ID, "pageRange");
  }

  _createClass(PageRange, [{
    key: _xfa_object.$finalize,
    value: function value() {
      var numbers = this[_xfa_object.$content].trim().split(/\s+/).map(function (x) {
        return parseInt(x, 10);
      });

      var ranges = [];

      for (var i = 0, ii = numbers.length; i < ii; i += 2) {
        ranges.push(numbers.slice(i, i + 2));
      }

      this[_xfa_object.$content] = ranges;
    }
  }]);

  return PageRange;
}(_xfa_object.StringObject);

var Pagination = /*#__PURE__*/function (_OptionObject17) {
  _inherits(Pagination, _OptionObject17);

  var _super83 = _createSuper(Pagination);

  function Pagination(attributes) {
    _classCallCheck(this, Pagination);

    return _super83.call(this, CONFIG_NS_ID, "pagination", ["simplex", "duplexShortEdge", "duplexLongEdge"]);
  }

  return Pagination;
}(_xfa_object.OptionObject);

var PaginationOverride = /*#__PURE__*/function (_OptionObject18) {
  _inherits(PaginationOverride, _OptionObject18);

  var _super84 = _createSuper(PaginationOverride);

  function PaginationOverride(attributes) {
    _classCallCheck(this, PaginationOverride);

    return _super84.call(this, CONFIG_NS_ID, "paginationOverride", ["none", "forceDuplex", "forceDuplexLongEdge", "forceDuplexShortEdge", "forceSimplex"]);
  }

  return PaginationOverride;
}(_xfa_object.OptionObject);

var Part = /*#__PURE__*/function (_IntegerObject7) {
  _inherits(Part, _IntegerObject7);

  var _super85 = _createSuper(Part);

  function Part(attributes) {
    _classCallCheck(this, Part);

    return _super85.call(this, CONFIG_NS_ID, "part", 1, function (n) {
      return false;
    });
  }

  return Part;
}(_xfa_object.IntegerObject);

var Pcl = /*#__PURE__*/function (_XFAObject28) {
  _inherits(Pcl, _XFAObject28);

  var _super86 = _createSuper(Pcl);

  function Pcl(attributes) {
    var _this29;

    _classCallCheck(this, Pcl);

    _this29 = _super86.call(this, CONFIG_NS_ID, "pcl", true);
    _this29.name = attributes.name || "";
    _this29.batchOutput = null;
    _this29.fontInfo = null;
    _this29.jog = null;
    _this29.mediumInfo = null;
    _this29.outputBin = null;
    _this29.pageOffset = null;
    _this29.staple = null;
    _this29.xdc = null;
    return _this29;
  }

  return Pcl;
}(_xfa_object.XFAObject);

var Pdf = /*#__PURE__*/function (_XFAObject29) {
  _inherits(Pdf, _XFAObject29);

  var _super87 = _createSuper(Pdf);

  function Pdf(attributes) {
    var _this30;

    _classCallCheck(this, Pdf);

    _this30 = _super87.call(this, CONFIG_NS_ID, "pdf", true);
    _this30.name = attributes.name || "";
    _this30.adobeExtensionLevel = null;
    _this30.batchOutput = null;
    _this30.compression = null;
    _this30.creator = null;
    _this30.encryption = null;
    _this30.fontInfo = null;
    _this30.interactive = null;
    _this30.linearized = null;
    _this30.openAction = null;
    _this30.pdfa = null;
    _this30.producer = null;
    _this30.renderPolicy = null;
    _this30.scriptModel = null;
    _this30.silentPrint = null;
    _this30.submitFormat = null;
    _this30.tagged = null;
    _this30.version = null;
    _this30.viewerPreferences = null;
    _this30.xdc = null;
    return _this30;
  }

  return Pdf;
}(_xfa_object.XFAObject);

var Pdfa = /*#__PURE__*/function (_XFAObject30) {
  _inherits(Pdfa, _XFAObject30);

  var _super88 = _createSuper(Pdfa);

  function Pdfa(attributes) {
    var _this31;

    _classCallCheck(this, Pdfa);

    _this31 = _super88.call(this, CONFIG_NS_ID, "pdfa", true);
    _this31.amd = null;
    _this31.conformance = null;
    _this31.includeXDPContent = null;
    _this31.part = null;
    return _this31;
  }

  return Pdfa;
}(_xfa_object.XFAObject);

var Permissions = /*#__PURE__*/function (_XFAObject31) {
  _inherits(Permissions, _XFAObject31);

  var _super89 = _createSuper(Permissions);

  function Permissions(attributes) {
    var _this32;

    _classCallCheck(this, Permissions);

    _this32 = _super89.call(this, CONFIG_NS_ID, "permissions", true);
    _this32.accessibleContent = null;
    _this32.change = null;
    _this32.contentCopy = null;
    _this32.documentAssembly = null;
    _this32.formFieldFilling = null;
    _this32.modifyAnnots = null;
    _this32.plaintextMetadata = null;
    _this32.print = null;
    _this32.printHighQuality = null;
    return _this32;
  }

  return Permissions;
}(_xfa_object.XFAObject);

var PickTrayByPDFSize = /*#__PURE__*/function (_Option16) {
  _inherits(PickTrayByPDFSize, _Option16);

  var _super90 = _createSuper(PickTrayByPDFSize);

  function PickTrayByPDFSize(attributes) {
    _classCallCheck(this, PickTrayByPDFSize);

    return _super90.call(this, CONFIG_NS_ID, "pickTrayByPDFSize");
  }

  return PickTrayByPDFSize;
}(_xfa_object.Option01);

var Picture = /*#__PURE__*/function (_StringObject14) {
  _inherits(Picture, _StringObject14);

  var _super91 = _createSuper(Picture);

  function Picture(attributes) {
    _classCallCheck(this, Picture);

    return _super91.call(this, CONFIG_NS_ID, "picture");
  }

  return Picture;
}(_xfa_object.StringObject);

var PlaintextMetadata = /*#__PURE__*/function (_Option17) {
  _inherits(PlaintextMetadata, _Option17);

  var _super92 = _createSuper(PlaintextMetadata);

  function PlaintextMetadata(attributes) {
    _classCallCheck(this, PlaintextMetadata);

    return _super92.call(this, CONFIG_NS_ID, "plaintextMetadata");
  }

  return PlaintextMetadata;
}(_xfa_object.Option01);

var Presence = /*#__PURE__*/function (_OptionObject19) {
  _inherits(Presence, _OptionObject19);

  var _super93 = _createSuper(Presence);

  function Presence(attributes) {
    _classCallCheck(this, Presence);

    return _super93.call(this, CONFIG_NS_ID, "presence", ["preserve", "dissolve", "dissolveStructure", "ignore", "remove"]);
  }

  return Presence;
}(_xfa_object.OptionObject);

var Present = /*#__PURE__*/function (_XFAObject32) {
  _inherits(Present, _XFAObject32);

  var _super94 = _createSuper(Present);

  function Present(attributes) {
    var _this33;

    _classCallCheck(this, Present);

    _this33 = _super94.call(this, CONFIG_NS_ID, "present", true);
    _this33.behaviorOverride = null;
    _this33.cache = null;
    _this33.common = null;
    _this33.copies = null;
    _this33.destination = null;
    _this33.incrementalMerge = null;
    _this33.layout = null;
    _this33.output = null;
    _this33.overprint = null;
    _this33.pagination = null;
    _this33.paginationOverride = null;
    _this33.script = null;
    _this33.validate = null;
    _this33.xdp = null;
    _this33.driver = new _xfa_object.XFAObjectArray();
    _this33.labelPrinter = new _xfa_object.XFAObjectArray();
    _this33.pcl = new _xfa_object.XFAObjectArray();
    _this33.pdf = new _xfa_object.XFAObjectArray();
    _this33.ps = new _xfa_object.XFAObjectArray();
    _this33.submitUrl = new _xfa_object.XFAObjectArray();
    _this33.webClient = new _xfa_object.XFAObjectArray();
    _this33.zpl = new _xfa_object.XFAObjectArray();
    return _this33;
  }

  return Present;
}(_xfa_object.XFAObject);

var Print = /*#__PURE__*/function (_Option18) {
  _inherits(Print, _Option18);

  var _super95 = _createSuper(Print);

  function Print(attributes) {
    _classCallCheck(this, Print);

    return _super95.call(this, CONFIG_NS_ID, "print");
  }

  return Print;
}(_xfa_object.Option01);

var PrintHighQuality = /*#__PURE__*/function (_Option19) {
  _inherits(PrintHighQuality, _Option19);

  var _super96 = _createSuper(PrintHighQuality);

  function PrintHighQuality(attributes) {
    _classCallCheck(this, PrintHighQuality);

    return _super96.call(this, CONFIG_NS_ID, "printHighQuality");
  }

  return PrintHighQuality;
}(_xfa_object.Option01);

var PrintScaling = /*#__PURE__*/function (_OptionObject20) {
  _inherits(PrintScaling, _OptionObject20);

  var _super97 = _createSuper(PrintScaling);

  function PrintScaling(attributes) {
    _classCallCheck(this, PrintScaling);

    return _super97.call(this, CONFIG_NS_ID, "printScaling", ["appdefault", "noScaling"]);
  }

  return PrintScaling;
}(_xfa_object.OptionObject);

var PrinterName = /*#__PURE__*/function (_StringObject15) {
  _inherits(PrinterName, _StringObject15);

  var _super98 = _createSuper(PrinterName);

  function PrinterName(attributes) {
    _classCallCheck(this, PrinterName);

    return _super98.call(this, CONFIG_NS_ID, "printerName");
  }

  return PrinterName;
}(_xfa_object.StringObject);

var Producer = /*#__PURE__*/function (_StringObject16) {
  _inherits(Producer, _StringObject16);

  var _super99 = _createSuper(Producer);

  function Producer(attributes) {
    _classCallCheck(this, Producer);

    return _super99.call(this, CONFIG_NS_ID, "producer");
  }

  return Producer;
}(_xfa_object.StringObject);

var Ps = /*#__PURE__*/function (_XFAObject33) {
  _inherits(Ps, _XFAObject33);

  var _super100 = _createSuper(Ps);

  function Ps(attributes) {
    var _this34;

    _classCallCheck(this, Ps);

    _this34 = _super100.call(this, CONFIG_NS_ID, "ps", true);
    _this34.name = attributes.name || "";
    _this34.batchOutput = null;
    _this34.fontInfo = null;
    _this34.jog = null;
    _this34.mediumInfo = null;
    _this34.outputBin = null;
    _this34.staple = null;
    _this34.xdc = null;
    return _this34;
  }

  return Ps;
}(_xfa_object.XFAObject);

var Range = /*#__PURE__*/function (_ContentObject6) {
  _inherits(Range, _ContentObject6);

  var _super101 = _createSuper(Range);

  function Range(attributes) {
    _classCallCheck(this, Range);

    return _super101.call(this, CONFIG_NS_ID, "range");
  }

  _createClass(Range, [{
    key: _xfa_object.$finalize,
    value: function value() {
      this[_xfa_object.$content] = this[_xfa_object.$content].trim().split(/\s*,\s*/, 2).map(function (range) {
        return range.split("-").map(function (x) {
          return parseInt(x.trim(), 10);
        });
      }).filter(function (range) {
        return range.every(function (x) {
          return !isNaN(x);
        });
      }).map(function (range) {
        if (range.length === 1) {
          range.push(range[0]);
        }

        return range;
      });
    }
  }]);

  return Range;
}(_xfa_object.ContentObject);

var Record = /*#__PURE__*/function (_ContentObject7) {
  _inherits(Record, _ContentObject7);

  var _super102 = _createSuper(Record);

  function Record(attributes) {
    _classCallCheck(this, Record);

    return _super102.call(this, CONFIG_NS_ID, "record");
  }

  _createClass(Record, [{
    key: _xfa_object.$finalize,
    value: function value() {
      this[_xfa_object.$content] = this[_xfa_object.$content].trim();
      var n = parseInt(this[_xfa_object.$content], 10);

      if (!isNaN(n) && n >= 0) {
        this[_xfa_object.$content] = n;
      }
    }
  }]);

  return Record;
}(_xfa_object.ContentObject);

var Relevant = /*#__PURE__*/function (_ContentObject8) {
  _inherits(Relevant, _ContentObject8);

  var _super103 = _createSuper(Relevant);

  function Relevant(attributes) {
    _classCallCheck(this, Relevant);

    return _super103.call(this, CONFIG_NS_ID, "relevant");
  }

  _createClass(Relevant, [{
    key: _xfa_object.$finalize,
    value: function value() {
      this[_xfa_object.$content] = this[_xfa_object.$content].trim().split(/\s+/);
    }
  }]);

  return Relevant;
}(_xfa_object.ContentObject);

var Rename = /*#__PURE__*/function (_ContentObject9) {
  _inherits(Rename, _ContentObject9);

  var _super104 = _createSuper(Rename);

  function Rename(attributes) {
    _classCallCheck(this, Rename);

    return _super104.call(this, CONFIG_NS_ID, "rename");
  }

  _createClass(Rename, [{
    key: _xfa_object.$finalize,
    value: function value() {
      this[_xfa_object.$content] = this[_xfa_object.$content].trim();

      if (this[_xfa_object.$content].toLowerCase().startsWith("xml") || this[_xfa_object.$content].match(new RegExp("[\\p{L}_][\\p{L}\\d._\\p{M}-]*", "u"))) {
        (0, _util.warn)("XFA - Rename: invalid XFA name");
      }
    }
  }]);

  return Rename;
}(_xfa_object.ContentObject);

var RenderPolicy = /*#__PURE__*/function (_OptionObject21) {
  _inherits(RenderPolicy, _OptionObject21);

  var _super105 = _createSuper(RenderPolicy);

  function RenderPolicy(attributes) {
    _classCallCheck(this, RenderPolicy);

    return _super105.call(this, CONFIG_NS_ID, "renderPolicy", ["server", "client"]);
  }

  return RenderPolicy;
}(_xfa_object.OptionObject);

var RunScripts = /*#__PURE__*/function (_OptionObject22) {
  _inherits(RunScripts, _OptionObject22);

  var _super106 = _createSuper(RunScripts);

  function RunScripts(attributes) {
    _classCallCheck(this, RunScripts);

    return _super106.call(this, CONFIG_NS_ID, "runScripts", ["both", "client", "none", "server"]);
  }

  return RunScripts;
}(_xfa_object.OptionObject);

var Script = /*#__PURE__*/function (_XFAObject34) {
  _inherits(Script, _XFAObject34);

  var _super107 = _createSuper(Script);

  function Script(attributes) {
    var _this35;

    _classCallCheck(this, Script);

    _this35 = _super107.call(this, CONFIG_NS_ID, "script", true);
    _this35.currentPage = null;
    _this35.exclude = null;
    _this35.runScripts = null;
    return _this35;
  }

  return Script;
}(_xfa_object.XFAObject);

var ScriptModel = /*#__PURE__*/function (_OptionObject23) {
  _inherits(ScriptModel, _OptionObject23);

  var _super108 = _createSuper(ScriptModel);

  function ScriptModel(attributes) {
    _classCallCheck(this, ScriptModel);

    return _super108.call(this, CONFIG_NS_ID, "scriptModel", ["XFA", "none"]);
  }

  return ScriptModel;
}(_xfa_object.OptionObject);

var Severity = /*#__PURE__*/function (_OptionObject24) {
  _inherits(Severity, _OptionObject24);

  var _super109 = _createSuper(Severity);

  function Severity(attributes) {
    _classCallCheck(this, Severity);

    return _super109.call(this, CONFIG_NS_ID, "severity", ["ignore", "error", "information", "trace", "warning"]);
  }

  return Severity;
}(_xfa_object.OptionObject);

var SilentPrint = /*#__PURE__*/function (_XFAObject35) {
  _inherits(SilentPrint, _XFAObject35);

  var _super110 = _createSuper(SilentPrint);

  function SilentPrint(attributes) {
    var _this36;

    _classCallCheck(this, SilentPrint);

    _this36 = _super110.call(this, CONFIG_NS_ID, "silentPrint", true);
    _this36.addSilentPrint = null;
    _this36.printerName = null;
    return _this36;
  }

  return SilentPrint;
}(_xfa_object.XFAObject);

var Staple = /*#__PURE__*/function (_XFAObject36) {
  _inherits(Staple, _XFAObject36);

  var _super111 = _createSuper(Staple);

  function Staple(attributes) {
    var _this37;

    _classCallCheck(this, Staple);

    _this37 = _super111.call(this, CONFIG_NS_ID, "staple");
    _this37.mode = (0, _utils.getStringOption)(attributes.mode, ["usePrinterSetting", "on", "off"]);
    return _this37;
  }

  return Staple;
}(_xfa_object.XFAObject);

var StartNode = /*#__PURE__*/function (_StringObject17) {
  _inherits(StartNode, _StringObject17);

  var _super112 = _createSuper(StartNode);

  function StartNode(attributes) {
    _classCallCheck(this, StartNode);

    return _super112.call(this, CONFIG_NS_ID, "startNode");
  }

  return StartNode;
}(_xfa_object.StringObject);

var StartPage = /*#__PURE__*/function (_IntegerObject8) {
  _inherits(StartPage, _IntegerObject8);

  var _super113 = _createSuper(StartPage);

  function StartPage(attributes) {
    _classCallCheck(this, StartPage);

    return _super113.call(this, CONFIG_NS_ID, "startPage", 0, function (n) {
      return true;
    });
  }

  return StartPage;
}(_xfa_object.IntegerObject);

var SubmitFormat = /*#__PURE__*/function (_OptionObject25) {
  _inherits(SubmitFormat, _OptionObject25);

  var _super114 = _createSuper(SubmitFormat);

  function SubmitFormat(attributes) {
    _classCallCheck(this, SubmitFormat);

    return _super114.call(this, CONFIG_NS_ID, "submitFormat", ["html", "delegate", "fdf", "xml", "pdf"]);
  }

  return SubmitFormat;
}(_xfa_object.OptionObject);

var SubmitUrl = /*#__PURE__*/function (_StringObject18) {
  _inherits(SubmitUrl, _StringObject18);

  var _super115 = _createSuper(SubmitUrl);

  function SubmitUrl(attributes) {
    _classCallCheck(this, SubmitUrl);

    return _super115.call(this, CONFIG_NS_ID, "submitUrl");
  }

  return SubmitUrl;
}(_xfa_object.StringObject);

var SubsetBelow = /*#__PURE__*/function (_IntegerObject9) {
  _inherits(SubsetBelow, _IntegerObject9);

  var _super116 = _createSuper(SubsetBelow);

  function SubsetBelow(attributes) {
    _classCallCheck(this, SubsetBelow);

    return _super116.call(this, CONFIG_NS_ID, "subsetBelow", 100, function (n) {
      return n >= 0 && n <= 100;
    });
  }

  return SubsetBelow;
}(_xfa_object.IntegerObject);

var SuppressBanner = /*#__PURE__*/function (_Option20) {
  _inherits(SuppressBanner, _Option20);

  var _super117 = _createSuper(SuppressBanner);

  function SuppressBanner(attributes) {
    _classCallCheck(this, SuppressBanner);

    return _super117.call(this, CONFIG_NS_ID, "suppressBanner");
  }

  return SuppressBanner;
}(_xfa_object.Option01);

var Tagged = /*#__PURE__*/function (_Option21) {
  _inherits(Tagged, _Option21);

  var _super118 = _createSuper(Tagged);

  function Tagged(attributes) {
    _classCallCheck(this, Tagged);

    return _super118.call(this, CONFIG_NS_ID, "tagged");
  }

  return Tagged;
}(_xfa_object.Option01);

var Template = /*#__PURE__*/function (_XFAObject37) {
  _inherits(Template, _XFAObject37);

  var _super119 = _createSuper(Template);

  function Template(attributes) {
    var _this38;

    _classCallCheck(this, Template);

    _this38 = _super119.call(this, CONFIG_NS_ID, "template", true);
    _this38.base = null;
    _this38.relevant = null;
    _this38.startPage = null;
    _this38.uri = null;
    _this38.xsl = null;
    return _this38;
  }

  return Template;
}(_xfa_object.XFAObject);

var Threshold = /*#__PURE__*/function (_OptionObject26) {
  _inherits(Threshold, _OptionObject26);

  var _super120 = _createSuper(Threshold);

  function Threshold(attributes) {
    _classCallCheck(this, Threshold);

    return _super120.call(this, CONFIG_NS_ID, "threshold", ["trace", "error", "information", "warning"]);
  }

  return Threshold;
}(_xfa_object.OptionObject);

var To = /*#__PURE__*/function (_OptionObject27) {
  _inherits(To, _OptionObject27);

  var _super121 = _createSuper(To);

  function To(attributes) {
    _classCallCheck(this, To);

    return _super121.call(this, CONFIG_NS_ID, "to", ["null", "memory", "stderr", "stdout", "system", "uri"]);
  }

  return To;
}(_xfa_object.OptionObject);

var TemplateCache = /*#__PURE__*/function (_XFAObject38) {
  _inherits(TemplateCache, _XFAObject38);

  var _super122 = _createSuper(TemplateCache);

  function TemplateCache(attributes) {
    var _this39;

    _classCallCheck(this, TemplateCache);

    _this39 = _super122.call(this, CONFIG_NS_ID, "templateCache");
    _this39.maxEntries = (0, _utils.getInteger)({
      data: attributes.maxEntries,
      defaultValue: 5,
      validate: function validate(n) {
        return n >= 0;
      }
    });
    return _this39;
  }

  return TemplateCache;
}(_xfa_object.XFAObject);

var Trace = /*#__PURE__*/function (_XFAObject39) {
  _inherits(Trace, _XFAObject39);

  var _super123 = _createSuper(Trace);

  function Trace(attributes) {
    var _this40;

    _classCallCheck(this, Trace);

    _this40 = _super123.call(this, CONFIG_NS_ID, "trace", true);
    _this40.area = new _xfa_object.XFAObjectArray();
    return _this40;
  }

  return Trace;
}(_xfa_object.XFAObject);

var Transform = /*#__PURE__*/function (_XFAObject40) {
  _inherits(Transform, _XFAObject40);

  var _super124 = _createSuper(Transform);

  function Transform(attributes) {
    var _this41;

    _classCallCheck(this, Transform);

    _this41 = _super124.call(this, CONFIG_NS_ID, "transform", true);
    _this41.groupParent = null;
    _this41.ifEmpty = null;
    _this41.nameAttr = null;
    _this41.picture = null;
    _this41.presence = null;
    _this41.rename = null;
    _this41.whitespace = null;
    return _this41;
  }

  return Transform;
}(_xfa_object.XFAObject);

var Type = /*#__PURE__*/function (_OptionObject28) {
  _inherits(Type, _OptionObject28);

  var _super125 = _createSuper(Type);

  function Type(attributes) {
    _classCallCheck(this, Type);

    return _super125.call(this, CONFIG_NS_ID, "type", ["none", "ascii85", "asciiHex", "ccittfax", "flate", "lzw", "runLength", "native", "xdp", "mergedXDP"]);
  }

  return Type;
}(_xfa_object.OptionObject);

var Uri = /*#__PURE__*/function (_StringObject19) {
  _inherits(Uri, _StringObject19);

  var _super126 = _createSuper(Uri);

  function Uri(attributes) {
    _classCallCheck(this, Uri);

    return _super126.call(this, CONFIG_NS_ID, "uri");
  }

  return Uri;
}(_xfa_object.StringObject);

var Validate = /*#__PURE__*/function (_OptionObject29) {
  _inherits(Validate, _OptionObject29);

  var _super127 = _createSuper(Validate);

  function Validate(attributes) {
    _classCallCheck(this, Validate);

    return _super127.call(this, CONFIG_NS_ID, "validate", ["preSubmit", "prePrint", "preExecute", "preSave"]);
  }

  return Validate;
}(_xfa_object.OptionObject);

var ValidateApprovalSignatures = /*#__PURE__*/function (_ContentObject10) {
  _inherits(ValidateApprovalSignatures, _ContentObject10);

  var _super128 = _createSuper(ValidateApprovalSignatures);

  function ValidateApprovalSignatures(attributes) {
    _classCallCheck(this, ValidateApprovalSignatures);

    return _super128.call(this, CONFIG_NS_ID, "validateApprovalSignatures");
  }

  _createClass(ValidateApprovalSignatures, [{
    key: _xfa_object.$finalize,
    value: function value() {
      this[_xfa_object.$content] = this[_xfa_object.$content].trim().split(/\s+/).filter(function (x) {
        return ["docReady", "postSign"].includes(x);
      });
    }
  }]);

  return ValidateApprovalSignatures;
}(_xfa_object.ContentObject);

var ValidationMessaging = /*#__PURE__*/function (_OptionObject30) {
  _inherits(ValidationMessaging, _OptionObject30);

  var _super129 = _createSuper(ValidationMessaging);

  function ValidationMessaging(attributes) {
    _classCallCheck(this, ValidationMessaging);

    return _super129.call(this, CONFIG_NS_ID, "validationMessaging", ["allMessagesIndividually", "allMessagesTogether", "firstMessageOnly", "noMessages"]);
  }

  return ValidationMessaging;
}(_xfa_object.OptionObject);

var Version = /*#__PURE__*/function (_OptionObject31) {
  _inherits(Version, _OptionObject31);

  var _super130 = _createSuper(Version);

  function Version(attributes) {
    _classCallCheck(this, Version);

    return _super130.call(this, CONFIG_NS_ID, "version", ["1.7", "1.6", "1.5", "1.4", "1.3", "1.2"]);
  }

  return Version;
}(_xfa_object.OptionObject);

var VersionControl = /*#__PURE__*/function (_XFAObject41) {
  _inherits(VersionControl, _XFAObject41);

  var _super131 = _createSuper(VersionControl);

  function VersionControl(attributes) {
    var _this42;

    _classCallCheck(this, VersionControl);

    _this42 = _super131.call(this, CONFIG_NS_ID, "VersionControl");
    _this42.outputBelow = (0, _utils.getStringOption)(attributes.outputBelow, ["warn", "error", "update"]);
    _this42.sourceAbove = (0, _utils.getStringOption)(attributes.sourceAbove, ["warn", "error"]);
    _this42.sourceBelow = (0, _utils.getStringOption)(attributes.sourceBelow, ["update", "maintain"]);
    return _this42;
  }

  return VersionControl;
}(_xfa_object.XFAObject);

var ViewerPreferences = /*#__PURE__*/function (_XFAObject42) {
  _inherits(ViewerPreferences, _XFAObject42);

  var _super132 = _createSuper(ViewerPreferences);

  function ViewerPreferences(attributes) {
    var _this43;

    _classCallCheck(this, ViewerPreferences);

    _this43 = _super132.call(this, CONFIG_NS_ID, "viewerPreferences", true);
    _this43.ADBE_JSConsole = null;
    _this43.ADBE_JSDebugger = null;
    _this43.addViewerPreferences = null;
    _this43.duplexOption = null;
    _this43.enforce = null;
    _this43.numberOfCopies = null;
    _this43.pageRange = null;
    _this43.pickTrayByPDFSize = null;
    _this43.printScaling = null;
    return _this43;
  }

  return ViewerPreferences;
}(_xfa_object.XFAObject);

var WebClient = /*#__PURE__*/function (_XFAObject43) {
  _inherits(WebClient, _XFAObject43);

  var _super133 = _createSuper(WebClient);

  function WebClient(attributes) {
    var _this44;

    _classCallCheck(this, WebClient);

    _this44 = _super133.call(this, CONFIG_NS_ID, "webClient", true);
    _this44.name = attributes.name ? attributes.name.trim() : "";
    _this44.fontInfo = null;
    _this44.xdc = null;
    return _this44;
  }

  return WebClient;
}(_xfa_object.XFAObject);

var Whitespace = /*#__PURE__*/function (_OptionObject32) {
  _inherits(Whitespace, _OptionObject32);

  var _super134 = _createSuper(Whitespace);

  function Whitespace(attributes) {
    _classCallCheck(this, Whitespace);

    return _super134.call(this, CONFIG_NS_ID, "whitespace", ["preserve", "ltrim", "normalize", "rtrim", "trim"]);
  }

  return Whitespace;
}(_xfa_object.OptionObject);

var Window = /*#__PURE__*/function (_ContentObject11) {
  _inherits(Window, _ContentObject11);

  var _super135 = _createSuper(Window);

  function Window(attributes) {
    _classCallCheck(this, Window);

    return _super135.call(this, CONFIG_NS_ID, "window");
  }

  _createClass(Window, [{
    key: _xfa_object.$finalize,
    value: function value() {
      var pair = this[_xfa_object.$content].trim().split(/\s*,\s*/, 2).map(function (x) {
        return parseInt(x, 10);
      });

      if (pair.some(function (x) {
        return isNaN(x);
      })) {
        this[_xfa_object.$content] = [0, 0];
        return;
      }

      if (pair.length === 1) {
        pair.push(pair[0]);
      }

      this[_xfa_object.$content] = pair;
    }
  }]);

  return Window;
}(_xfa_object.ContentObject);

var Xdc = /*#__PURE__*/function (_XFAObject44) {
  _inherits(Xdc, _XFAObject44);

  var _super136 = _createSuper(Xdc);

  function Xdc(attributes) {
    var _this45;

    _classCallCheck(this, Xdc);

    _this45 = _super136.call(this, CONFIG_NS_ID, "xdc", true);
    _this45.uri = new _xfa_object.XFAObjectArray();
    _this45.xsl = new _xfa_object.XFAObjectArray();
    return _this45;
  }

  return Xdc;
}(_xfa_object.XFAObject);

var Xdp = /*#__PURE__*/function (_XFAObject45) {
  _inherits(Xdp, _XFAObject45);

  var _super137 = _createSuper(Xdp);

  function Xdp(attributes) {
    var _this46;

    _classCallCheck(this, Xdp);

    _this46 = _super137.call(this, CONFIG_NS_ID, "xdp", true);
    _this46.packets = null;
    return _this46;
  }

  return Xdp;
}(_xfa_object.XFAObject);

var Xsl = /*#__PURE__*/function (_XFAObject46) {
  _inherits(Xsl, _XFAObject46);

  var _super138 = _createSuper(Xsl);

  function Xsl(attributes) {
    var _this47;

    _classCallCheck(this, Xsl);

    _this47 = _super138.call(this, CONFIG_NS_ID, "xsl", true);
    _this47.debug = null;
    _this47.uri = null;
    return _this47;
  }

  return Xsl;
}(_xfa_object.XFAObject);

var Zpl = /*#__PURE__*/function (_XFAObject47) {
  _inherits(Zpl, _XFAObject47);

  var _super139 = _createSuper(Zpl);

  function Zpl(attributes) {
    var _this48;

    _classCallCheck(this, Zpl);

    _this48 = _super139.call(this, CONFIG_NS_ID, "zpl", true);
    _this48.name = attributes.name ? attributes.name.trim() : "";
    _this48.batchOutput = null;
    _this48.flipLabel = null;
    _this48.fontInfo = null;
    _this48.xdc = null;
    return _this48;
  }

  return Zpl;
}(_xfa_object.XFAObject);

var ConfigNamespace = /*#__PURE__*/function () {
  function ConfigNamespace() {
    _classCallCheck(this, ConfigNamespace);
  }

  _createClass(ConfigNamespace, null, [{
    key: _namespaces.$buildXFAObject,
    value: function value(name, attributes) {
      if (ConfigNamespace.hasOwnProperty(name)) {
        return ConfigNamespace[name](attributes);
      }

      return undefined;
    }
  }, {
    key: "acrobat",
    value: function acrobat(attrs) {
      return new Acrobat(attrs);
    }
  }, {
    key: "acrobat7",
    value: function acrobat7(attrs) {
      return new Acrobat7(attrs);
    }
  }, {
    key: "ADBE_JSConsole",
    value: function ADBE_JSConsole(attrs) {
      return new _ADBE_JSConsole(attrs);
    }
  }, {
    key: "ADBE_JSDebugger",
    value: function ADBE_JSDebugger(attrs) {
      return new _ADBE_JSDebugger(attrs);
    }
  }, {
    key: "addSilentPrint",
    value: function addSilentPrint(attrs) {
      return new AddSilentPrint(attrs);
    }
  }, {
    key: "addViewerPreferences",
    value: function addViewerPreferences(attrs) {
      return new AddViewerPreferences(attrs);
    }
  }, {
    key: "adjustData",
    value: function adjustData(attrs) {
      return new AdjustData(attrs);
    }
  }, {
    key: "adobeExtensionLevel",
    value: function adobeExtensionLevel(attrs) {
      return new AdobeExtensionLevel(attrs);
    }
  }, {
    key: "agent",
    value: function agent(attrs) {
      return new Agent(attrs);
    }
  }, {
    key: "alwaysEmbed",
    value: function alwaysEmbed(attrs) {
      return new AlwaysEmbed(attrs);
    }
  }, {
    key: "amd",
    value: function amd(attrs) {
      return new Amd(attrs);
    }
  }, {
    key: "area",
    value: function area(attrs) {
      return new Area(attrs);
    }
  }, {
    key: "attributes",
    value: function attributes(attrs) {
      return new Attributes(attrs);
    }
  }, {
    key: "autoSave",
    value: function autoSave(attrs) {
      return new AutoSave(attrs);
    }
  }, {
    key: "base",
    value: function base(attrs) {
      return new Base(attrs);
    }
  }, {
    key: "batchOutput",
    value: function batchOutput(attrs) {
      return new BatchOutput(attrs);
    }
  }, {
    key: "behaviorOverride",
    value: function behaviorOverride(attrs) {
      return new BehaviorOverride(attrs);
    }
  }, {
    key: "cache",
    value: function cache(attrs) {
      return new Cache(attrs);
    }
  }, {
    key: "change",
    value: function change(attrs) {
      return new Change(attrs);
    }
  }, {
    key: "common",
    value: function common(attrs) {
      return new Common(attrs);
    }
  }, {
    key: "compress",
    value: function compress(attrs) {
      return new Compress(attrs);
    }
  }, {
    key: "compressLogicalStructure",
    value: function compressLogicalStructure(attrs) {
      return new CompressLogicalStructure(attrs);
    }
  }, {
    key: "compressObjectStream",
    value: function compressObjectStream(attrs) {
      return new CompressObjectStream(attrs);
    }
  }, {
    key: "compression",
    value: function compression(attrs) {
      return new Compression(attrs);
    }
  }, {
    key: "config",
    value: function config(attrs) {
      return new Config(attrs);
    }
  }, {
    key: "conformance",
    value: function conformance(attrs) {
      return new Conformance(attrs);
    }
  }, {
    key: "contentCopy",
    value: function contentCopy(attrs) {
      return new ContentCopy(attrs);
    }
  }, {
    key: "copies",
    value: function copies(attrs) {
      return new Copies(attrs);
    }
  }, {
    key: "creator",
    value: function creator(attrs) {
      return new Creator(attrs);
    }
  }, {
    key: "currentPage",
    value: function currentPage(attrs) {
      return new CurrentPage(attrs);
    }
  }, {
    key: "data",
    value: function data(attrs) {
      return new Data(attrs);
    }
  }, {
    key: "debug",
    value: function debug(attrs) {
      return new Debug(attrs);
    }
  }, {
    key: "defaultTypeface",
    value: function defaultTypeface(attrs) {
      return new DefaultTypeface(attrs);
    }
  }, {
    key: "destination",
    value: function destination(attrs) {
      return new Destination(attrs);
    }
  }, {
    key: "documentAssembly",
    value: function documentAssembly(attrs) {
      return new DocumentAssembly(attrs);
    }
  }, {
    key: "driver",
    value: function driver(attrs) {
      return new Driver(attrs);
    }
  }, {
    key: "duplexOption",
    value: function duplexOption(attrs) {
      return new DuplexOption(attrs);
    }
  }, {
    key: "dynamicRender",
    value: function dynamicRender(attrs) {
      return new DynamicRender(attrs);
    }
  }, {
    key: "embed",
    value: function embed(attrs) {
      return new Embed(attrs);
    }
  }, {
    key: "encrypt",
    value: function encrypt(attrs) {
      return new Encrypt(attrs);
    }
  }, {
    key: "encryption",
    value: function encryption(attrs) {
      return new Encryption(attrs);
    }
  }, {
    key: "encryptionLevel",
    value: function encryptionLevel(attrs) {
      return new EncryptionLevel(attrs);
    }
  }, {
    key: "enforce",
    value: function enforce(attrs) {
      return new Enforce(attrs);
    }
  }, {
    key: "equate",
    value: function equate(attrs) {
      return new Equate(attrs);
    }
  }, {
    key: "equateRange",
    value: function equateRange(attrs) {
      return new EquateRange(attrs);
    }
  }, {
    key: "exclude",
    value: function exclude(attrs) {
      return new Exclude(attrs);
    }
  }, {
    key: "excludeNS",
    value: function excludeNS(attrs) {
      return new ExcludeNS(attrs);
    }
  }, {
    key: "flipLabel",
    value: function flipLabel(attrs) {
      return new FlipLabel(attrs);
    }
  }, {
    key: "fontInfo",
    value: function fontInfo(attrs) {
      return new FontInfo(attrs);
    }
  }, {
    key: "formFieldFilling",
    value: function formFieldFilling(attrs) {
      return new FormFieldFilling(attrs);
    }
  }, {
    key: "groupParent",
    value: function groupParent(attrs) {
      return new GroupParent(attrs);
    }
  }, {
    key: "ifEmpty",
    value: function ifEmpty(attrs) {
      return new IfEmpty(attrs);
    }
  }, {
    key: "includeXDPContent",
    value: function includeXDPContent(attrs) {
      return new IncludeXDPContent(attrs);
    }
  }, {
    key: "incrementalLoad",
    value: function incrementalLoad(attrs) {
      return new IncrementalLoad(attrs);
    }
  }, {
    key: "incrementalMerge",
    value: function incrementalMerge(attrs) {
      return new IncrementalMerge(attrs);
    }
  }, {
    key: "interactive",
    value: function interactive(attrs) {
      return new Interactive(attrs);
    }
  }, {
    key: "jog",
    value: function jog(attrs) {
      return new Jog(attrs);
    }
  }, {
    key: "labelPrinter",
    value: function labelPrinter(attrs) {
      return new LabelPrinter(attrs);
    }
  }, {
    key: "layout",
    value: function layout(attrs) {
      return new Layout(attrs);
    }
  }, {
    key: "level",
    value: function level(attrs) {
      return new Level(attrs);
    }
  }, {
    key: "linearized",
    value: function linearized(attrs) {
      return new Linearized(attrs);
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
    key: "log",
    value: function log(attrs) {
      return new Log(attrs);
    }
  }, {
    key: "map",
    value: function map(attrs) {
      return new MapElement(attrs);
    }
  }, {
    key: "mediumInfo",
    value: function mediumInfo(attrs) {
      return new MediumInfo(attrs);
    }
  }, {
    key: "message",
    value: function message(attrs) {
      return new Message(attrs);
    }
  }, {
    key: "messaging",
    value: function messaging(attrs) {
      return new Messaging(attrs);
    }
  }, {
    key: "mode",
    value: function mode(attrs) {
      return new Mode(attrs);
    }
  }, {
    key: "modifyAnnots",
    value: function modifyAnnots(attrs) {
      return new ModifyAnnots(attrs);
    }
  }, {
    key: "msgId",
    value: function msgId(attrs) {
      return new MsgId(attrs);
    }
  }, {
    key: "nameAttr",
    value: function nameAttr(attrs) {
      return new NameAttr(attrs);
    }
  }, {
    key: "neverEmbed",
    value: function neverEmbed(attrs) {
      return new NeverEmbed(attrs);
    }
  }, {
    key: "numberOfCopies",
    value: function numberOfCopies(attrs) {
      return new NumberOfCopies(attrs);
    }
  }, {
    key: "openAction",
    value: function openAction(attrs) {
      return new OpenAction(attrs);
    }
  }, {
    key: "output",
    value: function output(attrs) {
      return new Output(attrs);
    }
  }, {
    key: "outputBin",
    value: function outputBin(attrs) {
      return new OutputBin(attrs);
    }
  }, {
    key: "outputXSL",
    value: function outputXSL(attrs) {
      return new OutputXSL(attrs);
    }
  }, {
    key: "overprint",
    value: function overprint(attrs) {
      return new Overprint(attrs);
    }
  }, {
    key: "packets",
    value: function packets(attrs) {
      return new Packets(attrs);
    }
  }, {
    key: "pageOffset",
    value: function pageOffset(attrs) {
      return new PageOffset(attrs);
    }
  }, {
    key: "pageRange",
    value: function pageRange(attrs) {
      return new PageRange(attrs);
    }
  }, {
    key: "pagination",
    value: function pagination(attrs) {
      return new Pagination(attrs);
    }
  }, {
    key: "paginationOverride",
    value: function paginationOverride(attrs) {
      return new PaginationOverride(attrs);
    }
  }, {
    key: "part",
    value: function part(attrs) {
      return new Part(attrs);
    }
  }, {
    key: "pcl",
    value: function pcl(attrs) {
      return new Pcl(attrs);
    }
  }, {
    key: "pdf",
    value: function pdf(attrs) {
      return new Pdf(attrs);
    }
  }, {
    key: "pdfa",
    value: function pdfa(attrs) {
      return new Pdfa(attrs);
    }
  }, {
    key: "permissions",
    value: function permissions(attrs) {
      return new Permissions(attrs);
    }
  }, {
    key: "pickTrayByPDFSize",
    value: function pickTrayByPDFSize(attrs) {
      return new PickTrayByPDFSize(attrs);
    }
  }, {
    key: "picture",
    value: function picture(attrs) {
      return new Picture(attrs);
    }
  }, {
    key: "plaintextMetadata",
    value: function plaintextMetadata(attrs) {
      return new PlaintextMetadata(attrs);
    }
  }, {
    key: "presence",
    value: function presence(attrs) {
      return new Presence(attrs);
    }
  }, {
    key: "present",
    value: function present(attrs) {
      return new Present(attrs);
    }
  }, {
    key: "print",
    value: function print(attrs) {
      return new Print(attrs);
    }
  }, {
    key: "printHighQuality",
    value: function printHighQuality(attrs) {
      return new PrintHighQuality(attrs);
    }
  }, {
    key: "printScaling",
    value: function printScaling(attrs) {
      return new PrintScaling(attrs);
    }
  }, {
    key: "printerName",
    value: function printerName(attrs) {
      return new PrinterName(attrs);
    }
  }, {
    key: "producer",
    value: function producer(attrs) {
      return new Producer(attrs);
    }
  }, {
    key: "ps",
    value: function ps(attrs) {
      return new Ps(attrs);
    }
  }, {
    key: "range",
    value: function range(attrs) {
      return new Range(attrs);
    }
  }, {
    key: "record",
    value: function record(attrs) {
      return new Record(attrs);
    }
  }, {
    key: "relevant",
    value: function relevant(attrs) {
      return new Relevant(attrs);
    }
  }, {
    key: "rename",
    value: function rename(attrs) {
      return new Rename(attrs);
    }
  }, {
    key: "renderPolicy",
    value: function renderPolicy(attrs) {
      return new RenderPolicy(attrs);
    }
  }, {
    key: "runScripts",
    value: function runScripts(attrs) {
      return new RunScripts(attrs);
    }
  }, {
    key: "script",
    value: function script(attrs) {
      return new Script(attrs);
    }
  }, {
    key: "scriptModel",
    value: function scriptModel(attrs) {
      return new ScriptModel(attrs);
    }
  }, {
    key: "severity",
    value: function severity(attrs) {
      return new Severity(attrs);
    }
  }, {
    key: "silentPrint",
    value: function silentPrint(attrs) {
      return new SilentPrint(attrs);
    }
  }, {
    key: "staple",
    value: function staple(attrs) {
      return new Staple(attrs);
    }
  }, {
    key: "startNode",
    value: function startNode(attrs) {
      return new StartNode(attrs);
    }
  }, {
    key: "startPage",
    value: function startPage(attrs) {
      return new StartPage(attrs);
    }
  }, {
    key: "submitFormat",
    value: function submitFormat(attrs) {
      return new SubmitFormat(attrs);
    }
  }, {
    key: "submitUrl",
    value: function submitUrl(attrs) {
      return new SubmitUrl(attrs);
    }
  }, {
    key: "subsetBelow",
    value: function subsetBelow(attrs) {
      return new SubsetBelow(attrs);
    }
  }, {
    key: "suppressBanner",
    value: function suppressBanner(attrs) {
      return new SuppressBanner(attrs);
    }
  }, {
    key: "tagged",
    value: function tagged(attrs) {
      return new Tagged(attrs);
    }
  }, {
    key: "template",
    value: function template(attrs) {
      return new Template(attrs);
    }
  }, {
    key: "templateCache",
    value: function templateCache(attrs) {
      return new TemplateCache(attrs);
    }
  }, {
    key: "threshold",
    value: function threshold(attrs) {
      return new Threshold(attrs);
    }
  }, {
    key: "to",
    value: function to(attrs) {
      return new To(attrs);
    }
  }, {
    key: "trace",
    value: function trace(attrs) {
      return new Trace(attrs);
    }
  }, {
    key: "transform",
    value: function transform(attrs) {
      return new Transform(attrs);
    }
  }, {
    key: "type",
    value: function type(attrs) {
      return new Type(attrs);
    }
  }, {
    key: "uri",
    value: function uri(attrs) {
      return new Uri(attrs);
    }
  }, {
    key: "validate",
    value: function validate(attrs) {
      return new Validate(attrs);
    }
  }, {
    key: "validateApprovalSignatures",
    value: function validateApprovalSignatures(attrs) {
      return new ValidateApprovalSignatures(attrs);
    }
  }, {
    key: "validationMessaging",
    value: function validationMessaging(attrs) {
      return new ValidationMessaging(attrs);
    }
  }, {
    key: "version",
    value: function version(attrs) {
      return new Version(attrs);
    }
  }, {
    key: "versionControl",
    value: function versionControl(attrs) {
      return new VersionControl(attrs);
    }
  }, {
    key: "viewerPreferences",
    value: function viewerPreferences(attrs) {
      return new ViewerPreferences(attrs);
    }
  }, {
    key: "webClient",
    value: function webClient(attrs) {
      return new WebClient(attrs);
    }
  }, {
    key: "whitespace",
    value: function whitespace(attrs) {
      return new Whitespace(attrs);
    }
  }, {
    key: "window",
    value: function window(attrs) {
      return new Window(attrs);
    }
  }, {
    key: "xdc",
    value: function xdc(attrs) {
      return new Xdc(attrs);
    }
  }, {
    key: "xdp",
    value: function xdp(attrs) {
      return new Xdp(attrs);
    }
  }, {
    key: "xsl",
    value: function xsl(attrs) {
      return new Xsl(attrs);
    }
  }, {
    key: "zpl",
    value: function zpl(attrs) {
      return new Zpl(attrs);
    }
  }]);

  return ConfigNamespace;
}();

exports.ConfigNamespace = ConfigNamespace;