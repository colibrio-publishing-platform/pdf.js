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
exports.Catalog = void 0;

var _primitives = require("./primitives.js");

var _core_utils = require("./core_utils.js");

var _util = require("../shared/util.js");

var _name_number_tree = require("./name_number_tree.js");

var _base_stream = require("./base_stream.js");

var _colorspace = require("./colorspace.js");

var _file_spec = require("./file_spec.js");

var _image_utils = require("./image_utils.js");

var _metadata_parser = require("./metadata_parser.js");

var _struct_tree = require("./struct_tree.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function fetchDestination(dest) {
  if (dest instanceof _primitives.Dict) {
    dest = dest.get("D");
  }

  return Array.isArray(dest) ? dest : null;
}

var Catalog = /*#__PURE__*/function () {
  function Catalog(pdfManager, xref) {
    _classCallCheck(this, Catalog);

    this.pdfManager = pdfManager;
    this.xref = xref;
    this._catDict = xref.getCatalogObj();

    if (!(this._catDict instanceof _primitives.Dict)) {
      throw new _util.FormatError("Catalog object is not a dictionary.");
    }

    this.toplevelPagesDict;
    this._actualNumPages = null;
    this.fontCache = new _primitives.RefSetCache();
    this.builtInCMapCache = new Map();
    this.standardFontDataCache = new Map();
    this.globalImageCache = new _image_utils.GlobalImageCache();
    this.pageKidsCountCache = new _primitives.RefSetCache();
    this.pageIndexCache = new _primitives.RefSetCache();
    this.nonBlendModesSet = new _primitives.RefSet();
  }

  _createClass(Catalog, [{
    key: "version",
    get: function get() {
      var version = this._catDict.get("Version");

      return (0, _util.shadow)(this, "version", version instanceof _primitives.Name ? version.name : null);
    }
  }, {
    key: "lang",
    get: function get() {
      var lang = this._catDict.get("Lang");

      return (0, _util.shadow)(this, "lang", typeof lang === "string" ? (0, _util.stringToPDFString)(lang) : null);
    }
  }, {
    key: "needsRendering",
    get: function get() {
      var needsRendering = this._catDict.get("NeedsRendering");

      return (0, _util.shadow)(this, "needsRendering", typeof needsRendering === "boolean" ? needsRendering : false);
    }
  }, {
    key: "collection",
    get: function get() {
      var collection = null;

      try {
        var obj = this._catDict.get("Collection");

        if ((0, _primitives.isDict)(obj) && obj.size > 0) {
          collection = obj;
        }
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.info)("Cannot fetch Collection entry; assuming no collection is present.");
      }

      return (0, _util.shadow)(this, "collection", collection);
    }
  }, {
    key: "acroForm",
    get: function get() {
      var acroForm = null;

      try {
        var obj = this._catDict.get("AcroForm");

        if ((0, _primitives.isDict)(obj) && obj.size > 0) {
          acroForm = obj;
        }
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.info)("Cannot fetch AcroForm entry; assuming no forms are present.");
      }

      return (0, _util.shadow)(this, "acroForm", acroForm);
    }
  }, {
    key: "acroFormRef",
    get: function get() {
      var value = this._catDict.getRaw("AcroForm");

      return (0, _util.shadow)(this, "acroFormRef", (0, _primitives.isRef)(value) ? value : null);
    }
  }, {
    key: "metadata",
    get: function get() {
      var streamRef = this._catDict.getRaw("Metadata");

      if (!(streamRef instanceof _primitives.Ref)) {
        return (0, _util.shadow)(this, "metadata", null);
      }

      var metadata = null;

      try {
        var suppressEncryption = !(this.xref.encrypt && this.xref.encrypt.encryptMetadata);
        var stream = this.xref.fetch(streamRef, suppressEncryption);

        if (stream instanceof _base_stream.BaseStream && stream.dict instanceof _primitives.Dict) {
          var type = stream.dict.get("Type");
          var subtype = stream.dict.get("Subtype");

          if ((0, _primitives.isName)(type, "Metadata") && (0, _primitives.isName)(subtype, "XML")) {
            var data = (0, _util.stringToUTF8String)(stream.getString());

            if (data) {
              metadata = new _metadata_parser.MetadataParser(data).serializable;
            }
          }
        }
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.info)("Skipping invalid Metadata: \"".concat(ex, "\"."));
      }

      return (0, _util.shadow)(this, "metadata", metadata);
    }
  }, {
    key: "markInfo",
    get: function get() {
      var markInfo = null;

      try {
        markInfo = this._readMarkInfo();
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.warn)("Unable to read mark info.");
      }

      return (0, _util.shadow)(this, "markInfo", markInfo);
    }
  }, {
    key: "_readMarkInfo",
    value: function _readMarkInfo() {
      var obj = this._catDict.get("MarkInfo");

      if (!(0, _primitives.isDict)(obj)) {
        return null;
      }

      var markInfo = Object.assign(Object.create(null), {
        Marked: false,
        UserProperties: false,
        Suspects: false
      });

      for (var key in markInfo) {
        if (!obj.has(key)) {
          continue;
        }

        var value = obj.get(key);

        if (!(0, _util.isBool)(value)) {
          continue;
        }

        markInfo[key] = value;
      }

      return markInfo;
    }
  }, {
    key: "structTreeRoot",
    get: function get() {
      var structTree = null;

      try {
        structTree = this._readStructTreeRoot();
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.warn)("Unable read to structTreeRoot info.");
      }

      return (0, _util.shadow)(this, "structTreeRoot", structTree);
    }
  }, {
    key: "_readStructTreeRoot",
    value: function _readStructTreeRoot() {
      var obj = this._catDict.get("StructTreeRoot");

      if (!(0, _primitives.isDict)(obj)) {
        return null;
      }

      var root = new _struct_tree.StructTreeRoot(obj);
      root.init();
      return root;
    }
  }, {
    key: "toplevelPagesDict",
    get: function get() {
      var pagesObj = this._catDict.get("Pages");

      if (!(0, _primitives.isDict)(pagesObj)) {
        throw new _util.FormatError("Invalid top-level pages dictionary.");
      }

      return (0, _util.shadow)(this, "toplevelPagesDict", pagesObj);
    }
  }, {
    key: "documentOutline",
    get: function get() {
      var obj = null;

      try {
        obj = this._readDocumentOutline();
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.warn)("Unable to read document outline.");
      }

      return (0, _util.shadow)(this, "documentOutline", obj);
    }
  }, {
    key: "_readDocumentOutline",
    value: function _readDocumentOutline() {
      var obj = this._catDict.get("Outlines");

      if (!(0, _primitives.isDict)(obj)) {
        return null;
      }

      obj = obj.getRaw("First");

      if (!(0, _primitives.isRef)(obj)) {
        return null;
      }

      var root = {
        items: []
      };
      var queue = [{
        obj: obj,
        parent: root
      }];
      var processed = new _primitives.RefSet();
      processed.put(obj);
      var xref = this.xref,
          blackColor = new Uint8ClampedArray(3);

      while (queue.length > 0) {
        var i = queue.shift();
        var outlineDict = xref.fetchIfRef(i.obj);

        if (outlineDict === null) {
          continue;
        }

        if (!outlineDict.has("Title")) {
          throw new _util.FormatError("Invalid outline item encountered.");
        }

        var data = {
          url: null,
          dest: null
        };
        Catalog.parseDestDictionary({
          destDict: outlineDict,
          resultObj: data,
          docBaseUrl: this.pdfManager.docBaseUrl
        });
        var title = outlineDict.get("Title");
        var flags = outlineDict.get("F") || 0;
        var color = outlineDict.getArray("C");
        var count = outlineDict.get("Count");
        var rgbColor = blackColor;

        if (Array.isArray(color) && color.length === 3 && (color[0] !== 0 || color[1] !== 0 || color[2] !== 0)) {
          rgbColor = _colorspace.ColorSpace.singletons.rgb.getRgb(color, 0);
        }

        var outlineItem = {
          dest: data.dest,
          url: data.url,
          unsafeUrl: data.unsafeUrl,
          newWindow: data.newWindow,
          title: (0, _util.stringToPDFString)(title),
          color: rgbColor,
          count: Number.isInteger(count) ? count : undefined,
          bold: !!(flags & 2),
          italic: !!(flags & 1),
          items: []
        };
        i.parent.items.push(outlineItem);
        obj = outlineDict.getRaw("First");

        if ((0, _primitives.isRef)(obj) && !processed.has(obj)) {
          queue.push({
            obj: obj,
            parent: outlineItem
          });
          processed.put(obj);
        }

        obj = outlineDict.getRaw("Next");

        if ((0, _primitives.isRef)(obj) && !processed.has(obj)) {
          queue.push({
            obj: obj,
            parent: i.parent
          });
          processed.put(obj);
        }
      }

      return root.items.length > 0 ? root.items : null;
    }
  }, {
    key: "permissions",
    get: function get() {
      var permissions = null;

      try {
        permissions = this._readPermissions();
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.warn)("Unable to read permissions.");
      }

      return (0, _util.shadow)(this, "permissions", permissions);
    }
  }, {
    key: "_readPermissions",
    value: function _readPermissions() {
      var encrypt = this.xref.trailer.get("Encrypt");

      if (!(0, _primitives.isDict)(encrypt)) {
        return null;
      }

      var flags = encrypt.get("P");

      if (!(0, _util.isNum)(flags)) {
        return null;
      }

      flags += Math.pow(2, 32);
      var permissions = [];

      for (var key in _util.PermissionFlag) {
        var value = _util.PermissionFlag[key];

        if (flags & value) {
          permissions.push(value);
        }
      }

      return permissions;
    }
  }, {
    key: "optionalContentConfig",
    get: function get() {
      var config = null;

      try {
        var properties = this._catDict.get("OCProperties");

        if (!properties) {
          return (0, _util.shadow)(this, "optionalContentConfig", null);
        }

        var defaultConfig = properties.get("D");

        if (!defaultConfig) {
          return (0, _util.shadow)(this, "optionalContentConfig", null);
        }

        var groupsData = properties.get("OCGs");

        if (!Array.isArray(groupsData)) {
          return (0, _util.shadow)(this, "optionalContentConfig", null);
        }

        var groups = [];
        var groupRefs = [];

        var _iterator = _createForOfIteratorHelper(groupsData),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var groupRef = _step.value;

            if (!(0, _primitives.isRef)(groupRef)) {
              continue;
            }

            groupRefs.push(groupRef);
            var group = this.xref.fetchIfRef(groupRef);
            groups.push({
              id: groupRef.toString(),
              name: (0, _util.isString)(group.get("Name")) ? (0, _util.stringToPDFString)(group.get("Name")) : null,
              intent: (0, _util.isString)(group.get("Intent")) ? (0, _util.stringToPDFString)(group.get("Intent")) : null
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        config = this._readOptionalContentConfig(defaultConfig, groupRefs);
        config.groups = groups;
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.warn)("Unable to read optional content config: ".concat(ex));
      }

      return (0, _util.shadow)(this, "optionalContentConfig", config);
    }
  }, {
    key: "_readOptionalContentConfig",
    value: function _readOptionalContentConfig(config, contentGroupRefs) {
      function parseOnOff(refs) {
        var onParsed = [];

        if (Array.isArray(refs)) {
          var _iterator2 = _createForOfIteratorHelper(refs),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var value = _step2.value;

              if (!(0, _primitives.isRef)(value)) {
                continue;
              }

              if (contentGroupRefs.includes(value)) {
                onParsed.push(value.toString());
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        return onParsed;
      }

      function parseOrder(refs) {
        var nestedLevels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (!Array.isArray(refs)) {
          return null;
        }

        var order = [];

        var _iterator3 = _createForOfIteratorHelper(refs),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var value = _step3.value;

            if ((0, _primitives.isRef)(value) && contentGroupRefs.includes(value)) {
              parsedOrderRefs.put(value);
              order.push(value.toString());
              continue;
            }

            var nestedOrder = parseNestedOrder(value, nestedLevels);

            if (nestedOrder) {
              order.push(nestedOrder);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        if (nestedLevels > 0) {
          return order;
        }

        var hiddenGroups = [];

        var _iterator4 = _createForOfIteratorHelper(contentGroupRefs),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var groupRef = _step4.value;

            if (parsedOrderRefs.has(groupRef)) {
              continue;
            }

            hiddenGroups.push(groupRef.toString());
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        if (hiddenGroups.length) {
          order.push({
            name: null,
            order: hiddenGroups
          });
        }

        return order;
      }

      function parseNestedOrder(ref, nestedLevels) {
        if (++nestedLevels > MAX_NESTED_LEVELS) {
          (0, _util.warn)("parseNestedOrder - reached MAX_NESTED_LEVELS.");
          return null;
        }

        var value = xref.fetchIfRef(ref);

        if (!Array.isArray(value)) {
          return null;
        }

        var nestedName = xref.fetchIfRef(value[0]);

        if (typeof nestedName !== "string") {
          return null;
        }

        var nestedOrder = parseOrder(value.slice(1), nestedLevels);

        if (!nestedOrder || !nestedOrder.length) {
          return null;
        }

        return {
          name: (0, _util.stringToPDFString)(nestedName),
          order: nestedOrder
        };
      }

      var xref = this.xref,
          parsedOrderRefs = new _primitives.RefSet(),
          MAX_NESTED_LEVELS = 10;
      return {
        name: (0, _util.isString)(config.get("Name")) ? (0, _util.stringToPDFString)(config.get("Name")) : null,
        creator: (0, _util.isString)(config.get("Creator")) ? (0, _util.stringToPDFString)(config.get("Creator")) : null,
        baseState: (0, _primitives.isName)(config.get("BaseState")) ? config.get("BaseState").name : null,
        on: parseOnOff(config.get("ON")),
        off: parseOnOff(config.get("OFF")),
        order: parseOrder(config.get("Order")),
        groups: null
      };
    }
  }, {
    key: "setActualNumPages",
    value: function setActualNumPages() {
      var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this._actualNumPages = num;
    }
  }, {
    key: "hasActualNumPages",
    get: function get() {
      return this._actualNumPages !== null;
    }
  }, {
    key: "_pagesCount",
    get: function get() {
      var obj = this.toplevelPagesDict.get("Count");

      if (!Number.isInteger(obj)) {
        throw new _util.FormatError("Page count in top-level pages dictionary is not an integer.");
      }

      return (0, _util.shadow)(this, "_pagesCount", obj);
    }
  }, {
    key: "numPages",
    get: function get() {
      return this.hasActualNumPages ? this._actualNumPages : this._pagesCount;
    }
  }, {
    key: "destinations",
    get: function get() {
      var obj = this._readDests(),
          dests = Object.create(null);

      if (obj instanceof _name_number_tree.NameTree) {
        var _iterator5 = _createForOfIteratorHelper(obj.getAll()),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _step5$value = _slicedToArray(_step5.value, 2),
                key = _step5$value[0],
                value = _step5$value[1];

            var dest = fetchDestination(value);

            if (dest) {
              dests[key] = dest;
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      } else if (obj instanceof _primitives.Dict) {
        obj.forEach(function (key, value) {
          var dest = fetchDestination(value);

          if (dest) {
            dests[key] = dest;
          }
        });
      }

      return (0, _util.shadow)(this, "destinations", dests);
    }
  }, {
    key: "getDestination",
    value: function getDestination(id) {
      var obj = this._readDests();

      if (obj instanceof _name_number_tree.NameTree) {
        var dest = fetchDestination(obj.get(id));

        if (dest) {
          return dest;
        }

        var allDest = this.destinations[id];

        if (allDest) {
          (0, _util.warn)("Found \"".concat(id, "\" at an incorrect position in the NameTree."));
          return allDest;
        }
      } else if (obj instanceof _primitives.Dict) {
        var _dest = fetchDestination(obj.get(id));

        if (_dest) {
          return _dest;
        }
      }

      return null;
    }
  }, {
    key: "_readDests",
    value: function _readDests() {
      var obj = this._catDict.get("Names");

      if (obj && obj.has("Dests")) {
        return new _name_number_tree.NameTree(obj.getRaw("Dests"), this.xref);
      } else if (this._catDict.has("Dests")) {
        return this._catDict.get("Dests");
      }

      return undefined;
    }
  }, {
    key: "pageLabels",
    get: function get() {
      var obj = null;

      try {
        obj = this._readPageLabels();
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util.warn)("Unable to read page labels.");
      }

      return (0, _util.shadow)(this, "pageLabels", obj);
    }
  }, {
    key: "_readPageLabels",
    value: function _readPageLabels() {
      var obj = this._catDict.getRaw("PageLabels");

      if (!obj) {
        return null;
      }

      var pageLabels = new Array(this.numPages);
      var style = null,
          prefix = "";
      var numberTree = new _name_number_tree.NumberTree(obj, this.xref);
      var nums = numberTree.getAll();
      var currentLabel = "",
          currentIndex = 1;

      for (var i = 0, ii = this.numPages; i < ii; i++) {
        var labelDict = nums.get(i);

        if (labelDict !== undefined) {
          if (!(0, _primitives.isDict)(labelDict)) {
            throw new _util.FormatError("PageLabel is not a dictionary.");
          }

          if (labelDict.has("Type") && !(0, _primitives.isName)(labelDict.get("Type"), "PageLabel")) {
            throw new _util.FormatError("Invalid type in PageLabel dictionary.");
          }

          if (labelDict.has("S")) {
            var s = labelDict.get("S");

            if (!(0, _primitives.isName)(s)) {
              throw new _util.FormatError("Invalid style in PageLabel dictionary.");
            }

            style = s.name;
          } else {
            style = null;
          }

          if (labelDict.has("P")) {
            var p = labelDict.get("P");

            if (!(0, _util.isString)(p)) {
              throw new _util.FormatError("Invalid prefix in PageLabel dictionary.");
            }

            prefix = (0, _util.stringToPDFString)(p);
          } else {
            prefix = "";
          }

          if (labelDict.has("St")) {
            var st = labelDict.get("St");

            if (!(Number.isInteger(st) && st >= 1)) {
              throw new _util.FormatError("Invalid start in PageLabel dictionary.");
            }

            currentIndex = st;
          } else {
            currentIndex = 1;
          }
        }

        switch (style) {
          case "D":
            currentLabel = currentIndex;
            break;

          case "R":
          case "r":
            currentLabel = (0, _core_utils.toRomanNumerals)(currentIndex, style === "r");
            break;

          case "A":
          case "a":
            var LIMIT = 26;
            var A_UPPER_CASE = 0x41,
                A_LOWER_CASE = 0x61;
            var baseCharCode = style === "a" ? A_LOWER_CASE : A_UPPER_CASE;
            var letterIndex = currentIndex - 1;
            var character = String.fromCharCode(baseCharCode + letterIndex % LIMIT);
            var charBuf = [];

            for (var j = 0, jj = letterIndex / LIMIT | 0; j <= jj; j++) {
              charBuf.push(character);
            }

            currentLabel = charBuf.join("");
            break;

          default:
            if (style) {
              throw new _util.FormatError("Invalid style \"".concat(style, "\" in PageLabel dictionary."));
            }

            currentLabel = "";
        }

        pageLabels[i] = prefix + currentLabel;
        currentIndex++;
      }

      return pageLabels;
    }
  }, {
    key: "pageLayout",
    get: function get() {
      var obj = this._catDict.get("PageLayout");

      var pageLayout = "";

      if ((0, _primitives.isName)(obj)) {
        switch (obj.name) {
          case "SinglePage":
          case "OneColumn":
          case "TwoColumnLeft":
          case "TwoColumnRight":
          case "TwoPageLeft":
          case "TwoPageRight":
            pageLayout = obj.name;
        }
      }

      return (0, _util.shadow)(this, "pageLayout", pageLayout);
    }
  }, {
    key: "pageMode",
    get: function get() {
      var obj = this._catDict.get("PageMode");

      var pageMode = "UseNone";

      if ((0, _primitives.isName)(obj)) {
        switch (obj.name) {
          case "UseNone":
          case "UseOutlines":
          case "UseThumbs":
          case "FullScreen":
          case "UseOC":
          case "UseAttachments":
            pageMode = obj.name;
        }
      }

      return (0, _util.shadow)(this, "pageMode", pageMode);
    }
  }, {
    key: "viewerPreferences",
    get: function get() {
      var _this = this;

      var ViewerPreferencesValidators = {
        HideToolbar: _util.isBool,
        HideMenubar: _util.isBool,
        HideWindowUI: _util.isBool,
        FitWindow: _util.isBool,
        CenterWindow: _util.isBool,
        DisplayDocTitle: _util.isBool,
        NonFullScreenPageMode: _primitives.isName,
        Direction: _primitives.isName,
        ViewArea: _primitives.isName,
        ViewClip: _primitives.isName,
        PrintArea: _primitives.isName,
        PrintClip: _primitives.isName,
        PrintScaling: _primitives.isName,
        Duplex: _primitives.isName,
        PickTrayByPDFSize: _util.isBool,
        PrintPageRange: Array.isArray,
        NumCopies: Number.isInteger
      };

      var obj = this._catDict.get("ViewerPreferences");

      var prefs = null;

      if ((0, _primitives.isDict)(obj)) {
        for (var key in ViewerPreferencesValidators) {
          if (!obj.has(key)) {
            continue;
          }

          var value = obj.get(key);

          if (!ViewerPreferencesValidators[key](value)) {
            (0, _util.info)("Bad value in ViewerPreferences for \"".concat(key, "\"."));
            continue;
          }

          var prefValue = void 0;

          switch (key) {
            case "NonFullScreenPageMode":
              switch (value.name) {
                case "UseNone":
                case "UseOutlines":
                case "UseThumbs":
                case "UseOC":
                  prefValue = value.name;
                  break;

                default:
                  prefValue = "UseNone";
              }

              break;

            case "Direction":
              switch (value.name) {
                case "L2R":
                case "R2L":
                  prefValue = value.name;
                  break;

                default:
                  prefValue = "L2R";
              }

              break;

            case "ViewArea":
            case "ViewClip":
            case "PrintArea":
            case "PrintClip":
              switch (value.name) {
                case "MediaBox":
                case "CropBox":
                case "BleedBox":
                case "TrimBox":
                case "ArtBox":
                  prefValue = value.name;
                  break;

                default:
                  prefValue = "CropBox";
              }

              break;

            case "PrintScaling":
              switch (value.name) {
                case "None":
                case "AppDefault":
                  prefValue = value.name;
                  break;

                default:
                  prefValue = "AppDefault";
              }

              break;

            case "Duplex":
              switch (value.name) {
                case "Simplex":
                case "DuplexFlipShortEdge":
                case "DuplexFlipLongEdge":
                  prefValue = value.name;
                  break;

                default:
                  prefValue = "None";
              }

              break;

            case "PrintPageRange":
              var length = value.length;

              if (length % 2 !== 0) {
                break;
              }

              var isValid = value.every(function (page, i, arr) {
                return Number.isInteger(page) && page > 0 && (i === 0 || page >= arr[i - 1]) && page <= _this.numPages;
              });

              if (isValid) {
                prefValue = value;
              }

              break;

            case "NumCopies":
              if (value > 0) {
                prefValue = value;
              }

              break;

            default:
              if (typeof value !== "boolean") {
                throw new _util.FormatError("viewerPreferences - expected a boolean value for: ".concat(key));
              }

              prefValue = value;
          }

          if (prefValue !== undefined) {
            if (!prefs) {
              prefs = Object.create(null);
            }

            prefs[key] = prefValue;
          } else {
            (0, _util.info)("Bad value in ViewerPreferences for \"".concat(key, "\"."));
          }
        }
      }

      return (0, _util.shadow)(this, "viewerPreferences", prefs);
    }
  }, {
    key: "openAction",
    get: function get() {
      var obj = this._catDict.get("OpenAction");

      var openAction = Object.create(null);

      if ((0, _primitives.isDict)(obj)) {
        var destDict = new _primitives.Dict(this.xref);
        destDict.set("A", obj);
        var resultObj = {
          url: null,
          dest: null,
          action: null
        };
        Catalog.parseDestDictionary({
          destDict: destDict,
          resultObj: resultObj
        });

        if (Array.isArray(resultObj.dest)) {
          openAction.dest = resultObj.dest;
        } else if (resultObj.action) {
          openAction.action = resultObj.action;
        }
      } else if (Array.isArray(obj)) {
        openAction.dest = obj;
      }

      return (0, _util.shadow)(this, "openAction", (0, _util.objectSize)(openAction) > 0 ? openAction : null);
    }
  }, {
    key: "attachments",
    get: function get() {
      var obj = this._catDict.get("Names");

      var attachments = null;

      if (obj instanceof _primitives.Dict && obj.has("EmbeddedFiles")) {
        var nameTree = new _name_number_tree.NameTree(obj.getRaw("EmbeddedFiles"), this.xref);

        var _iterator6 = _createForOfIteratorHelper(nameTree.getAll()),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _step6$value = _slicedToArray(_step6.value, 2),
                key = _step6$value[0],
                value = _step6$value[1];

            var fs = new _file_spec.FileSpec(value, this.xref);

            if (!attachments) {
              attachments = Object.create(null);
            }

            attachments[(0, _util.stringToPDFString)(key)] = fs.serializable;
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }

      return (0, _util.shadow)(this, "attachments", attachments);
    }
  }, {
    key: "xfaImages",
    get: function get() {
      var obj = this._catDict.get("Names");

      var xfaImages = null;

      if (obj instanceof _primitives.Dict && obj.has("XFAImages")) {
        var nameTree = new _name_number_tree.NameTree(obj.getRaw("XFAImages"), this.xref);

        var _iterator7 = _createForOfIteratorHelper(nameTree.getAll()),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _step7$value = _slicedToArray(_step7.value, 2),
                key = _step7$value[0],
                value = _step7$value[1];

            if (!xfaImages) {
              xfaImages = new _primitives.Dict(this.xref);
            }

            xfaImages.set(key, value);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }

      return (0, _util.shadow)(this, "xfaImages", xfaImages);
    }
  }, {
    key: "_collectJavaScript",
    value: function _collectJavaScript() {
      var obj = this._catDict.get("Names");

      var javaScript = null;

      function appendIfJavaScriptDict(name, jsDict) {
        if (!(jsDict instanceof _primitives.Dict)) {
          return;
        }

        if (!(0, _primitives.isName)(jsDict.get("S"), "JavaScript")) {
          return;
        }

        var js = jsDict.get("JS");

        if ((0, _primitives.isStream)(js)) {
          js = js.getString();
        } else if (typeof js !== "string") {
          return;
        }

        if (javaScript === null) {
          javaScript = new Map();
        }

        javaScript.set(name, (0, _util.stringToPDFString)(js));
      }

      if (obj instanceof _primitives.Dict && obj.has("JavaScript")) {
        var nameTree = new _name_number_tree.NameTree(obj.getRaw("JavaScript"), this.xref);

        var _iterator8 = _createForOfIteratorHelper(nameTree.getAll()),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var _step8$value = _slicedToArray(_step8.value, 2),
                key = _step8$value[0],
                value = _step8$value[1];

            appendIfJavaScriptDict(key, value);
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }

      var openAction = this._catDict.get("OpenAction");

      if (openAction) {
        appendIfJavaScriptDict("OpenAction", openAction);
      }

      return javaScript;
    }
  }, {
    key: "javaScript",
    get: function get() {
      var javaScript = this._collectJavaScript();

      return (0, _util.shadow)(this, "javaScript", javaScript ? _toConsumableArray(javaScript.values()) : null);
    }
  }, {
    key: "jsActions",
    get: function get() {
      var javaScript = this._collectJavaScript();

      var actions = (0, _core_utils.collectActions)(this.xref, this._catDict, _util.DocumentActionEventType);

      if (javaScript) {
        if (!actions) {
          actions = Object.create(null);
        }

        var _iterator9 = _createForOfIteratorHelper(javaScript),
            _step9;

        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var _step9$value = _slicedToArray(_step9.value, 2),
                key = _step9$value[0],
                val = _step9$value[1];

            if (key in actions) {
              actions[key].push(val);
            } else {
              actions[key] = [val];
            }
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      }

      return (0, _util.shadow)(this, "jsActions", actions);
    }
  }, {
    key: "fontFallback",
    value: function fontFallback(id, handler) {
      var promises = [];
      this.fontCache.forEach(function (promise) {
        promises.push(promise);
      });
      return Promise.all(promises).then(function (translatedFonts) {
        var _iterator10 = _createForOfIteratorHelper(translatedFonts),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var translatedFont = _step10.value;

            if (translatedFont.loadedName === id) {
              translatedFont.fallback(handler);
              return;
            }
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      });
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      var _this2 = this;

      var manuallyTriggered = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      (0, _primitives.clearPrimitiveCaches)();
      this.globalImageCache.clear(manuallyTriggered);
      this.pageKidsCountCache.clear();
      this.pageIndexCache.clear();
      this.nonBlendModesSet.clear();
      var promises = [];
      this.fontCache.forEach(function (promise) {
        promises.push(promise);
      });
      return Promise.all(promises).then(function (translatedFonts) {
        var _iterator11 = _createForOfIteratorHelper(translatedFonts),
            _step11;

        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var dict = _step11.value.dict;
            delete dict.cacheKey;
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }

        _this2.fontCache.clear();

        _this2.builtInCMapCache.clear();

        _this2.standardFontDataCache.clear();
      });
    }
  }, {
    key: "getPageDict",
    value: function getPageDict(pageIndex) {
      var capability = (0, _util.createPromiseCapability)();
      var nodesToVisit = [this.toplevelPagesDict];
      var visitedNodes = new _primitives.RefSet();

      var pagesRef = this._catDict.getRaw("Pages");

      if (pagesRef instanceof _primitives.Ref) {
        visitedNodes.put(pagesRef);
      }

      var xref = this.xref,
          pageKidsCountCache = this.pageKidsCountCache;
      var currentPageIndex = 0;

      function next() {
        var _loop = function _loop() {
          var currentNode = nodesToVisit.pop();

          if (currentNode instanceof _primitives.Ref) {
            var _count = pageKidsCountCache.get(currentNode);

            if (_count >= 0 && currentPageIndex + _count <= pageIndex) {
              currentPageIndex += _count;
              return "continue";
            }

            if (visitedNodes.has(currentNode)) {
              capability.reject(new _util.FormatError("Pages tree contains circular reference."));
              return {
                v: void 0
              };
            }

            visitedNodes.put(currentNode);
            xref.fetchAsync(currentNode).then(function (obj) {
              if ((0, _primitives.isDict)(obj, "Page") || (0, _primitives.isDict)(obj) && !obj.has("Kids")) {
                if (currentNode && !pageKidsCountCache.has(currentNode)) {
                  pageKidsCountCache.put(currentNode, 1);
                }

                if (pageIndex === currentPageIndex) {
                  capability.resolve([obj, currentNode]);
                } else {
                  currentPageIndex++;
                  next();
                }

                return;
              }

              nodesToVisit.push(obj);
              next();
            }, capability.reject);
            return {
              v: void 0
            };
          }

          if (!(currentNode instanceof _primitives.Dict)) {
            capability.reject(new _util.FormatError("Page dictionary kid reference points to wrong type of object."));
            return {
              v: void 0
            };
          }

          var count = void 0;

          try {
            count = currentNode.get("Count");
          } catch (ex) {
            if (ex instanceof _core_utils.MissingDataException) {
              throw ex;
            }
          }

          if (Number.isInteger(count) && count >= 0) {
            var objId = currentNode.objId;

            if (objId && !pageKidsCountCache.has(objId)) {
              pageKidsCountCache.put(objId, count);
            }

            if (currentPageIndex + count <= pageIndex) {
              currentPageIndex += count;
              return "continue";
            }
          }

          var kids = void 0;

          try {
            kids = currentNode.get("Kids");
          } catch (ex) {
            if (ex instanceof _core_utils.MissingDataException) {
              throw ex;
            }
          }

          if (!Array.isArray(kids)) {
            var type;

            try {
              type = currentNode.get("Type");
            } catch (ex) {
              if (ex instanceof _core_utils.MissingDataException) {
                throw ex;
              }
            }

            if ((0, _primitives.isName)(type, "Page") || !currentNode.has("Type") && currentNode.has("Contents")) {
              if (currentPageIndex === pageIndex) {
                capability.resolve([currentNode, null]);
                return {
                  v: void 0
                };
              }

              currentPageIndex++;
              return "continue";
            }

            capability.reject(new _util.FormatError("Page dictionary kids object is not an array."));
            return {
              v: void 0
            };
          }

          for (var last = kids.length - 1; last >= 0; last--) {
            nodesToVisit.push(kids[last]);
          }
        };

        while (nodesToVisit.length) {
          var _ret = _loop();

          if (_ret === "continue") continue;
          if (_typeof(_ret) === "object") return _ret.v;
        }

        capability.reject(new Error("Page index ".concat(pageIndex, " not found.")));
      }

      next();
      return capability.promise;
    }
  }, {
    key: "getAllPageDicts",
    value: function getAllPageDicts() {
      var recoveryMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var queue = [{
        currentNode: this.toplevelPagesDict,
        posInKids: 0
      }];
      var visitedNodes = new _primitives.RefSet();

      var pagesRef = this._catDict.getRaw("Pages");

      if (pagesRef instanceof _primitives.Ref) {
        visitedNodes.put(pagesRef);
      }

      var map = new Map();
      var pageIndex = 0;

      function addPageDict(pageDict, pageRef) {
        map.set(pageIndex++, [pageDict, pageRef]);
      }

      function addPageError(error) {
        map.set(pageIndex++, [error, null]);
      }

      while (queue.length > 0) {
        var queueItem = queue[queue.length - 1];
        var currentNode = queueItem.currentNode,
            posInKids = queueItem.posInKids;
        var kids = void 0;

        try {
          kids = currentNode.get("Kids");
        } catch (ex) {
          if (ex instanceof _core_utils.MissingDataException) {
            throw ex;
          }

          if (ex instanceof _core_utils.XRefEntryException && !recoveryMode) {
            throw ex;
          }

          addPageError(ex);
          break;
        }

        if (!Array.isArray(kids)) {
          addPageError(new _util.FormatError("Page dictionary kids object is not an array."));
          break;
        }

        if (posInKids >= kids.length) {
          queue.pop();
          continue;
        }

        var kidObj = kids[posInKids];
        var obj = void 0;

        if (kidObj instanceof _primitives.Ref) {
          try {
            obj = this.xref.fetch(kidObj);
          } catch (ex) {
            if (ex instanceof _core_utils.MissingDataException) {
              throw ex;
            }

            if (ex instanceof _core_utils.XRefEntryException && !recoveryMode) {
              throw ex;
            }

            addPageError(ex);
            break;
          }

          if (visitedNodes.has(kidObj)) {
            addPageError(new _util.FormatError("Pages tree contains circular reference."));
            break;
          }

          visitedNodes.put(kidObj);
        } else {
          obj = kidObj;
        }

        if (!(obj instanceof _primitives.Dict)) {
          addPageError(new _util.FormatError("Page dictionary kid reference points to wrong type of object."));
          break;
        }

        if ((0, _primitives.isDict)(obj, "Page") || !obj.has("Kids")) {
          addPageDict(obj, kidObj instanceof _primitives.Ref ? kidObj : null);
        } else {
          queue.push({
            currentNode: obj,
            posInKids: 0
          });
        }

        queueItem.posInKids++;
      }

      return map;
    }
  }, {
    key: "getPageIndex",
    value: function getPageIndex(pageRef) {
      var _this3 = this;

      var cachedPageIndex = this.pageIndexCache.get(pageRef);

      if (cachedPageIndex !== undefined) {
        return Promise.resolve(cachedPageIndex);
      }

      var xref = this.xref;

      function pagesBeforeRef(kidRef) {
        var total = 0,
            parentRef;
        return xref.fetchAsync(kidRef).then(function (node) {
          if ((0, _primitives.isRefsEqual)(kidRef, pageRef) && !(0, _primitives.isDict)(node, "Page") && !((0, _primitives.isDict)(node) && !node.has("Type") && node.has("Contents"))) {
            throw new _util.FormatError("The reference does not point to a /Page dictionary.");
          }

          if (!node) {
            return null;
          }

          if (!(0, _primitives.isDict)(node)) {
            throw new _util.FormatError("Node must be a dictionary.");
          }

          parentRef = node.getRaw("Parent");
          return node.getAsync("Parent");
        }).then(function (parent) {
          if (!parent) {
            return null;
          }

          if (!(0, _primitives.isDict)(parent)) {
            throw new _util.FormatError("Parent must be a dictionary.");
          }

          return parent.getAsync("Kids");
        }).then(function (kids) {
          if (!kids) {
            return null;
          }

          var kidPromises = [];
          var found = false;

          for (var i = 0, ii = kids.length; i < ii; i++) {
            var kid = kids[i];

            if (!(0, _primitives.isRef)(kid)) {
              throw new _util.FormatError("Kid must be a reference.");
            }

            if ((0, _primitives.isRefsEqual)(kid, kidRef)) {
              found = true;
              break;
            }

            kidPromises.push(xref.fetchAsync(kid).then(function (obj) {
              if (!(0, _primitives.isDict)(obj)) {
                throw new _util.FormatError("Kid node must be a dictionary.");
              }

              if (obj.has("Count")) {
                total += obj.get("Count");
              } else {
                total++;
              }
            }));
          }

          if (!found) {
            throw new _util.FormatError("Kid reference not found in parent's kids.");
          }

          return Promise.all(kidPromises).then(function () {
            return [total, parentRef];
          });
        });
      }

      var total = 0;

      var next = function next(ref) {
        return pagesBeforeRef(ref).then(function (args) {
          if (!args) {
            _this3.pageIndexCache.put(pageRef, total);

            return total;
          }

          var _args = _slicedToArray(args, 2),
              count = _args[0],
              parentRef = _args[1];

          total += count;
          return next(parentRef);
        });
      };

      return next(pageRef);
    }
  }], [{
    key: "parseDestDictionary",
    value: function parseDestDictionary(params) {
      var destDict = params.destDict;

      if (!(0, _primitives.isDict)(destDict)) {
        (0, _util.warn)("parseDestDictionary: `destDict` must be a dictionary.");
        return;
      }

      var resultObj = params.resultObj;

      if (_typeof(resultObj) !== "object") {
        (0, _util.warn)("parseDestDictionary: `resultObj` must be an object.");
        return;
      }

      var docBaseUrl = params.docBaseUrl || null;
      var action = destDict.get("A"),
          url,
          dest;

      if (!(0, _primitives.isDict)(action)) {
        if (destDict.has("Dest")) {
          action = destDict.get("Dest");
        } else {
          action = destDict.get("AA");

          if ((0, _primitives.isDict)(action)) {
            if (action.has("D")) {
              action = action.get("D");
            } else if (action.has("U")) {
              action = action.get("U");
            }
          }
        }
      }

      if ((0, _primitives.isDict)(action)) {
        var actionType = action.get("S");

        if (!(0, _primitives.isName)(actionType)) {
          (0, _util.warn)("parseDestDictionary: Invalid type in Action dictionary.");
          return;
        }

        var actionName = actionType.name;

        switch (actionName) {
          case "ResetForm":
            var flags = action.get("Flags");
            var include = (((0, _util.isNum)(flags) ? flags : 0) & 1) === 0;
            var fields = [];
            var refs = [];

            var _iterator12 = _createForOfIteratorHelper(action.get("Fields") || []),
                _step12;

            try {
              for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                var obj = _step12.value;

                if ((0, _primitives.isRef)(obj)) {
                  refs.push(obj.toString());
                } else if ((0, _util.isString)(obj)) {
                  fields.push((0, _util.stringToPDFString)(obj));
                }
              }
            } catch (err) {
              _iterator12.e(err);
            } finally {
              _iterator12.f();
            }

            resultObj.resetForm = {
              fields: fields,
              refs: refs,
              include: include
            };
            break;

          case "URI":
            url = action.get("URI");

            if (url instanceof _primitives.Name) {
              url = "/" + url.name;
            }

            break;

          case "GoTo":
            dest = action.get("D");
            break;

          case "Launch":
          case "GoToR":
            var urlDict = action.get("F");

            if ((0, _primitives.isDict)(urlDict)) {
              url = urlDict.get("F") || null;
            } else if ((0, _util.isString)(urlDict)) {
              url = urlDict;
            }

            var remoteDest = action.get("D");

            if (remoteDest) {
              if ((0, _primitives.isName)(remoteDest)) {
                remoteDest = remoteDest.name;
              }

              if ((0, _util.isString)(url)) {
                var baseUrl = url.split("#")[0];

                if ((0, _util.isString)(remoteDest)) {
                  url = baseUrl + "#" + remoteDest;
                } else if (Array.isArray(remoteDest)) {
                  url = baseUrl + "#" + JSON.stringify(remoteDest);
                }
              }
            }

            var newWindow = action.get("NewWindow");

            if ((0, _util.isBool)(newWindow)) {
              resultObj.newWindow = newWindow;
            }

            break;

          case "Named":
            var namedAction = action.get("N");

            if ((0, _primitives.isName)(namedAction)) {
              resultObj.action = namedAction.name;
            }

            break;

          case "JavaScript":
            var jsAction = action.get("JS");
            var js;

            if ((0, _primitives.isStream)(jsAction)) {
              js = jsAction.getString();
            } else if ((0, _util.isString)(jsAction)) {
              js = jsAction;
            }

            var jsURL = js && (0, _core_utils.recoverJsURL)((0, _util.stringToPDFString)(js));

            if (jsURL) {
              url = jsURL.url;
              resultObj.newWindow = jsURL.newWindow;
              break;
            }

          default:
            if (actionName === "JavaScript" || actionName === "SubmitForm") {
              break;
            }

            (0, _util.warn)("parseDestDictionary - unsupported action: \"".concat(actionName, "\"."));
            break;
        }
      } else if (destDict.has("Dest")) {
        dest = destDict.get("Dest");
      }

      if ((0, _util.isString)(url)) {
        var absoluteUrl = (0, _util.createValidAbsoluteUrl)(url, docBaseUrl, {
          addDefaultProtocol: true,
          tryConvertEncoding: true
        });

        if (absoluteUrl) {
          resultObj.url = absoluteUrl.href;
        }

        resultObj.unsafeUrl = url;
      }

      if (dest) {
        if ((0, _primitives.isName)(dest)) {
          dest = dest.name;
        }

        if ((0, _util.isString)(dest) || Array.isArray(dest)) {
          resultObj.dest = dest;
        }
      }
    }
  }]);

  return Catalog;
}();

exports.Catalog = Catalog;