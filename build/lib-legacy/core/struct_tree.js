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
exports.StructTreeRoot = exports.StructTreePage = void 0;

var _primitives = require("./primitives.js");

var _util = require("../shared/util.js");

var _name_number_tree = require("./name_number_tree.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MAX_DEPTH = 40;
var StructElementType = {
  PAGE_CONTENT: "PAGE_CONTENT",
  STREAM_CONTENT: "STREAM_CONTENT",
  OBJECT: "OBJECT",
  ELEMENT: "ELEMENT"
};

var StructTreeRoot = /*#__PURE__*/function () {
  function StructTreeRoot(rootDict) {
    _classCallCheck(this, StructTreeRoot);

    this.dict = rootDict;
    this.roleMap = new Map();
  }

  _createClass(StructTreeRoot, [{
    key: "init",
    value: function init() {
      this.readRoleMap();
    }
  }, {
    key: "readRoleMap",
    value: function readRoleMap() {
      var _this = this;

      var roleMapDict = this.dict.get("RoleMap");

      if (!(0, _primitives.isDict)(roleMapDict)) {
        return;
      }

      roleMapDict.forEach(function (key, value) {
        if (!(0, _primitives.isName)(value)) {
          return;
        }

        _this.roleMap.set(key, value.name);
      });
    }
  }]);

  return StructTreeRoot;
}();

exports.StructTreeRoot = StructTreeRoot;

var StructElementNode = /*#__PURE__*/function () {
  function StructElementNode(tree, dict) {
    _classCallCheck(this, StructElementNode);

    this.tree = tree;
    this.dict = dict;
    this.kids = [];
    this.parseKids();
  }

  _createClass(StructElementNode, [{
    key: "role",
    get: function get() {
      var nameObj = this.dict.get("S");
      var name = (0, _primitives.isName)(nameObj) ? nameObj.name : "";
      var root = this.tree.root;

      if (root.roleMap.has(name)) {
        return root.roleMap.get(name);
      }

      return name;
    }
  }, {
    key: "parseKids",
    value: function parseKids() {
      var pageObjId = null;
      var objRef = this.dict.getRaw("Pg");

      if ((0, _primitives.isRef)(objRef)) {
        pageObjId = objRef.toString();
      }

      var kids = this.dict.get("K");

      if (Array.isArray(kids)) {
        var _iterator = _createForOfIteratorHelper(kids),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var kid = _step.value;
            var element = this.parseKid(pageObjId, kid);

            if (element) {
              this.kids.push(element);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        var _element = this.parseKid(pageObjId, kids);

        if (_element) {
          this.kids.push(_element);
        }
      }
    }
  }, {
    key: "parseKid",
    value: function parseKid(pageObjId, kid) {
      if (Number.isInteger(kid)) {
        if (this.tree.pageDict.objId !== pageObjId) {
          return null;
        }

        return new StructElement({
          type: StructElementType.PAGE_CONTENT,
          mcid: kid,
          pageObjId: pageObjId
        });
      }

      var kidDict = null;

      if ((0, _primitives.isRef)(kid)) {
        kidDict = this.dict.xref.fetch(kid);
      } else if ((0, _primitives.isDict)(kid)) {
        kidDict = kid;
      }

      if (!kidDict) {
        return null;
      }

      var pageRef = kidDict.getRaw("Pg");

      if ((0, _primitives.isRef)(pageRef)) {
        pageObjId = pageRef.toString();
      }

      var type = (0, _primitives.isName)(kidDict.get("Type")) ? kidDict.get("Type").name : null;

      if (type === "MCR") {
        if (this.tree.pageDict.objId !== pageObjId) {
          return null;
        }

        return new StructElement({
          type: StructElementType.STREAM_CONTENT,
          refObjId: (0, _primitives.isRef)(kidDict.getRaw("Stm")) ? kidDict.getRaw("Stm").toString() : null,
          pageObjId: pageObjId,
          mcid: kidDict.get("MCID")
        });
      }

      if (type === "OBJR") {
        if (this.tree.pageDict.objId !== pageObjId) {
          return null;
        }

        return new StructElement({
          type: StructElementType.OBJECT,
          refObjId: (0, _primitives.isRef)(kidDict.getRaw("Obj")) ? kidDict.getRaw("Obj").toString() : null,
          pageObjId: pageObjId
        });
      }

      return new StructElement({
        type: StructElementType.ELEMENT,
        dict: kidDict
      });
    }
  }]);

  return StructElementNode;
}();

var StructElement = function StructElement(_ref) {
  var type = _ref.type,
      _ref$dict = _ref.dict,
      dict = _ref$dict === void 0 ? null : _ref$dict,
      _ref$mcid = _ref.mcid,
      mcid = _ref$mcid === void 0 ? null : _ref$mcid,
      _ref$pageObjId = _ref.pageObjId,
      pageObjId = _ref$pageObjId === void 0 ? null : _ref$pageObjId,
      _ref$refObjId = _ref.refObjId,
      refObjId = _ref$refObjId === void 0 ? null : _ref$refObjId;

  _classCallCheck(this, StructElement);

  this.type = type;
  this.dict = dict;
  this.mcid = mcid;
  this.pageObjId = pageObjId;
  this.refObjId = refObjId;
  this.parentNode = null;
};

var StructTreePage = /*#__PURE__*/function () {
  function StructTreePage(structTreeRoot, pageDict) {
    _classCallCheck(this, StructTreePage);

    this.root = structTreeRoot;
    this.rootDict = structTreeRoot ? structTreeRoot.dict : null;
    this.pageDict = pageDict;
    this.nodes = [];
  }

  _createClass(StructTreePage, [{
    key: "parse",
    value: function parse() {
      if (!this.root || !this.rootDict) {
        return;
      }

      var parentTree = this.rootDict.get("ParentTree");

      if (!parentTree) {
        return;
      }

      var id = this.pageDict.get("StructParents");

      if (!Number.isInteger(id)) {
        return;
      }

      var numberTree = new _name_number_tree.NumberTree(parentTree, this.rootDict.xref);
      var parentArray = numberTree.get(id);

      if (!Array.isArray(parentArray)) {
        return;
      }

      var map = new Map();

      var _iterator2 = _createForOfIteratorHelper(parentArray),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var ref = _step2.value;

          if ((0, _primitives.isRef)(ref)) {
            this.addNode(this.rootDict.xref.fetch(ref), map);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "addNode",
    value: function addNode(dict, map) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (level > MAX_DEPTH) {
        (0, _util.warn)("StructTree MAX_DEPTH reached.");
        return null;
      }

      if (map.has(dict)) {
        return map.get(dict);
      }

      var element = new StructElementNode(this, dict);
      map.set(dict, element);
      var parent = dict.get("P");

      if (!parent || (0, _primitives.isName)(parent.get("Type"), "StructTreeRoot")) {
        if (!this.addTopLevelNode(dict, element)) {
          map["delete"](dict);
        }

        return element;
      }

      var parentNode = this.addNode(parent, map, level + 1);

      if (!parentNode) {
        return element;
      }

      var save = false;

      var _iterator3 = _createForOfIteratorHelper(parentNode.kids),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var kid = _step3.value;

          if (kid.type === StructElementType.ELEMENT && kid.dict === dict) {
            kid.parentNode = element;
            save = true;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (!save) {
        map["delete"](dict);
      }

      return element;
    }
  }, {
    key: "addTopLevelNode",
    value: function addTopLevelNode(dict, element) {
      var obj = this.rootDict.get("K");

      if (!obj) {
        return false;
      }

      if ((0, _primitives.isDict)(obj)) {
        if (obj.objId !== dict.objId) {
          return false;
        }

        this.nodes[0] = element;
        return true;
      }

      if (!Array.isArray(obj)) {
        return true;
      }

      var save = false;

      for (var i = 0; i < obj.length; i++) {
        var kidRef = obj[i];

        if (kidRef && kidRef.toString() === dict.objId) {
          this.nodes[i] = element;
          save = true;
        }
      }

      return save;
    }
  }, {
    key: "serializable",
    get: function get() {
      function nodeToSerializable(node, parent) {
        var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        if (level > MAX_DEPTH) {
          (0, _util.warn)("StructTree too deep to be fully serialized.");
          return;
        }

        var obj = Object.create(null);
        obj.role = node.role;
        obj.children = [];
        parent.children.push(obj);
        var alt = node.dict.get("Alt");

        if ((0, _util.isString)(alt)) {
          obj.alt = (0, _util.stringToPDFString)(alt);
        }

        var lang = node.dict.get("Lang");

        if ((0, _util.isString)(lang)) {
          obj.lang = (0, _util.stringToPDFString)(lang);
        }

        var _iterator4 = _createForOfIteratorHelper(node.kids),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var kid = _step4.value;
            var kidElement = kid.type === StructElementType.ELEMENT ? kid.parentNode : null;

            if (kidElement) {
              nodeToSerializable(kidElement, obj, level + 1);
              continue;
            } else if (kid.type === StructElementType.PAGE_CONTENT || kid.type === StructElementType.STREAM_CONTENT) {
              obj.children.push({
                type: "content",
                id: "page".concat(kid.pageObjId, "_mcid").concat(kid.mcid)
              });
            } else if (kid.type === StructElementType.OBJECT) {
              obj.children.push({
                type: "object",
                id: kid.refObjId
              });
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }

      var root = Object.create(null);
      root.children = [];
      root.role = "Root";

      var _iterator5 = _createForOfIteratorHelper(this.nodes),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var child = _step5.value;

          if (!child) {
            continue;
          }

          nodeToSerializable(child, root);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return root;
    }
  }]);

  return StructTreePage;
}();

exports.StructTreePage = StructTreePage;