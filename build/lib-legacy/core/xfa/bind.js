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
exports.Binder = void 0;

var _xfa_object = require("./xfa_object.js");

var _template = require("./template.js");

var _som = require("./som.js");

var _namespaces = require("./namespaces.js");

var _util = require("../../shared/util.js");

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

var NS_DATASETS = _namespaces.NamespaceIds.datasets.id;

function createText(content) {
  var node = new _template.Text({});
  node[_xfa_object.$content] = content;
  return node;
}

var Binder = /*#__PURE__*/function () {
  function Binder(root) {
    _classCallCheck(this, Binder);

    this.root = root;
    this.datasets = root.datasets;

    if (root.datasets && root.datasets.data) {
      this.data = root.datasets.data;
    } else {
      this.data = new _xfa_object.XmlObject(_namespaces.NamespaceIds.datasets.id, "data");
    }

    this.emptyMerge = this.data[_xfa_object.$getChildren]().length === 0;
    this.root.form = this.form = root.template[_xfa_object.$clone]();
  }

  _createClass(Binder, [{
    key: "_isConsumeData",
    value: function _isConsumeData() {
      return !this.emptyMerge && this._mergeMode;
    }
  }, {
    key: "_isMatchTemplate",
    value: function _isMatchTemplate() {
      return !this._isConsumeData();
    }
  }, {
    key: "bind",
    value: function bind() {
      this._bindElement(this.form, this.data);

      return this.form;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "_bindValue",
    value: function _bindValue(formNode, data, picture) {
      formNode[_xfa_object.$data] = data;

      if (formNode[_xfa_object.$hasSettableValue]()) {
        if (data[_xfa_object.$isDataValue]()) {
          var value = data[_xfa_object.$getDataValue]();

          formNode[_xfa_object.$setValue](createText(value));
        } else if (formNode instanceof _template.Field && formNode.ui && formNode.ui.choiceList && formNode.ui.choiceList.open === "multiSelect") {
          var _value = data[_xfa_object.$getChildren]().map(function (child) {
            return child[_xfa_object.$content].trim();
          }).join("\n");

          formNode[_xfa_object.$setValue](createText(_value));
        } else if (this._isConsumeData()) {
          (0, _util.warn)("XFA - Nodes haven't the same type.");
        }
      } else if (!data[_xfa_object.$isDataValue]() || this._isMatchTemplate()) {
        this._bindElement(formNode, data);
      } else {
        (0, _util.warn)("XFA - Nodes haven't the same type.");
      }
    }
  }, {
    key: "_findDataByNameToConsume",
    value: function _findDataByNameToConsume(name, isValue, dataNode, global) {
      if (!name) {
        return null;
      }

      var generator, match;

      for (var i = 0; i < 3; i++) {
        generator = dataNode[_xfa_object.$getRealChildrenByNameIt](name, false, true);

        while (true) {
          match = generator.next().value;

          if (!match) {
            break;
          }

          if (isValue === match[_xfa_object.$isDataValue]()) {
            return match;
          }
        }

        if (dataNode[_xfa_object.$namespaceId] === _namespaces.NamespaceIds.datasets.id && dataNode[_xfa_object.$nodeName] === "data") {
          break;
        }

        dataNode = dataNode[_xfa_object.$getParent]();
      }

      if (!global) {
        return null;
      }

      generator = this.data[_xfa_object.$getRealChildrenByNameIt](name, true, false);
      match = generator.next().value;

      if (match) {
        return match;
      }

      generator = this.data[_xfa_object.$getAttributeIt](name, true);
      match = generator.next().value;

      if (match && match[_xfa_object.$isDataValue]()) {
        return match;
      }

      return null;
    }
  }, {
    key: "_setProperties",
    value: function _setProperties(formNode, dataNode) {
      if (!formNode.hasOwnProperty("setProperty")) {
        return;
      }

      var _iterator = _createForOfIteratorHelper(formNode.setProperty.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _step.value,
              ref = _step$value.ref,
              target = _step$value.target,
              connection = _step$value.connection;

          if (connection) {
            continue;
          }

          if (!ref) {
            continue;
          }

          var nodes = (0, _som.searchNode)(this.root, dataNode, ref, false, false);

          if (!nodes) {
            (0, _util.warn)("XFA - Invalid reference: ".concat(ref, "."));
            continue;
          }

          var _nodes = _slicedToArray(nodes, 1),
              node = _nodes[0];

          if (!node[_xfa_object.$isDescendent](this.data)) {
            (0, _util.warn)("XFA - Invalid node: must be a data node.");
            continue;
          }

          var targetNodes = (0, _som.searchNode)(this.root, formNode, target, false, false);

          if (!targetNodes) {
            (0, _util.warn)("XFA - Invalid target: ".concat(target, "."));
            continue;
          }

          var _targetNodes = _slicedToArray(targetNodes, 1),
              targetNode = _targetNodes[0];

          if (!targetNode[_xfa_object.$isDescendent](formNode)) {
            (0, _util.warn)("XFA - Invalid target: must be a property or subproperty.");
            continue;
          }

          var targetParent = targetNode[_xfa_object.$getParent]();

          if (targetNode instanceof _template.SetProperty || targetParent instanceof _template.SetProperty) {
            (0, _util.warn)("XFA - Invalid target: cannot be a setProperty or one of its properties.");
            continue;
          }

          if (targetNode instanceof _template.BindItems || targetParent instanceof _template.BindItems) {
            (0, _util.warn)("XFA - Invalid target: cannot be a bindItems or one of its properties.");
            continue;
          }

          var content = node[_xfa_object.$text]();

          var name = targetNode[_xfa_object.$nodeName];

          if (targetNode instanceof _xfa_object.XFAAttribute) {
            var attrs = Object.create(null);
            attrs[name] = content;
            var obj = Reflect.construct(Object.getPrototypeOf(targetParent).constructor, [attrs]);
            targetParent[name] = obj[name];
            continue;
          }

          if (!targetNode.hasOwnProperty(_xfa_object.$content)) {
            (0, _util.warn)("XFA - Invalid node to use in setProperty");
            continue;
          }

          targetNode[_xfa_object.$data] = node;
          targetNode[_xfa_object.$content] = content;

          targetNode[_xfa_object.$finalize]();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_bindItems",
    value: function _bindItems(formNode, dataNode) {
      if (!formNode.hasOwnProperty("items") || !formNode.hasOwnProperty("bindItems") || formNode.bindItems.isEmpty()) {
        return;
      }

      var _iterator2 = _createForOfIteratorHelper(formNode.items.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;

          formNode[_xfa_object.$removeChild](item);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      formNode.items.clear();
      var labels = new _template.Items({});
      var values = new _template.Items({});

      formNode[_xfa_object.$appendChild](labels);

      formNode.items.push(labels);

      formNode[_xfa_object.$appendChild](values);

      formNode.items.push(values);

      var _iterator3 = _createForOfIteratorHelper(formNode.bindItems.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _step3.value,
              ref = _step3$value.ref,
              labelRef = _step3$value.labelRef,
              valueRef = _step3$value.valueRef,
              connection = _step3$value.connection;

          if (connection) {
            continue;
          }

          if (!ref) {
            continue;
          }

          var nodes = (0, _som.searchNode)(this.root, dataNode, ref, false, false);

          if (!nodes) {
            (0, _util.warn)("XFA - Invalid reference: ".concat(ref, "."));
            continue;
          }

          var _iterator4 = _createForOfIteratorHelper(nodes),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var node = _step4.value;

              if (!node[_xfa_object.$isDescendent](this.datasets)) {
                (0, _util.warn)("XFA - Invalid ref (".concat(ref, "): must be a datasets child."));
                continue;
              }

              var labelNodes = (0, _som.searchNode)(this.root, node, labelRef, true, false);

              if (!labelNodes) {
                (0, _util.warn)("XFA - Invalid label: ".concat(labelRef, "."));
                continue;
              }

              var _labelNodes = _slicedToArray(labelNodes, 1),
                  labelNode = _labelNodes[0];

              if (!labelNode[_xfa_object.$isDescendent](this.datasets)) {
                (0, _util.warn)("XFA - Invalid label: must be a datasets child.");
                continue;
              }

              var valueNodes = (0, _som.searchNode)(this.root, node, valueRef, true, false);

              if (!valueNodes) {
                (0, _util.warn)("XFA - Invalid value: ".concat(valueRef, "."));
                continue;
              }

              var _valueNodes = _slicedToArray(valueNodes, 1),
                  valueNode = _valueNodes[0];

              if (!valueNode[_xfa_object.$isDescendent](this.datasets)) {
                (0, _util.warn)("XFA - Invalid value: must be a datasets child.");
                continue;
              }

              var label = createText(labelNode[_xfa_object.$text]());
              var value = createText(valueNode[_xfa_object.$text]());

              labels[_xfa_object.$appendChild](label);

              labels.text.push(label);

              values[_xfa_object.$appendChild](value);

              values.text.push(value);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "_bindOccurrences",
    value: function _bindOccurrences(formNode, matches, picture) {
      var baseClone;

      if (matches.length > 1) {
        baseClone = formNode[_xfa_object.$clone]();

        baseClone[_xfa_object.$removeChild](baseClone.occur);

        baseClone.occur = null;
      }

      this._bindValue(formNode, matches[0], picture);

      this._setProperties(formNode, matches[0]);

      this._bindItems(formNode, matches[0]);

      if (matches.length === 1) {
        return;
      }

      var parent = formNode[_xfa_object.$getParent]();

      var name = formNode[_xfa_object.$nodeName];

      var pos = parent[_xfa_object.$indexOf](formNode);

      for (var i = 1, ii = matches.length; i < ii; i++) {
        var match = matches[i];

        var clone = baseClone[_xfa_object.$clone]();

        parent[name].push(clone);

        parent[_xfa_object.$insertAt](pos + i, clone);

        this._bindValue(clone, match, picture);

        this._setProperties(clone, match);

        this._bindItems(clone, match);
      }
    }
  }, {
    key: "_createOccurrences",
    value: function _createOccurrences(formNode) {
      if (!this.emptyMerge) {
        return;
      }

      var occur = formNode.occur;

      if (!occur || occur.initial <= 1) {
        return;
      }

      var parent = formNode[_xfa_object.$getParent]();

      var name = formNode[_xfa_object.$nodeName];

      if (!(parent[name] instanceof _xfa_object.XFAObjectArray)) {
        return;
      }

      var currentNumber;

      if (formNode.name) {
        currentNumber = parent[name].children.filter(function (e) {
          return e.name === formNode.name;
        }).length;
      } else {
        currentNumber = parent[name].children.length;
      }

      var pos = parent[_xfa_object.$indexOf](formNode) + 1;
      var ii = occur.initial - currentNumber;

      if (ii) {
        var nodeClone = formNode[_xfa_object.$clone]();

        nodeClone[_xfa_object.$removeChild](nodeClone.occur);

        nodeClone.occur = null;
        parent[name].push(nodeClone);

        parent[_xfa_object.$insertAt](pos, nodeClone);

        for (var i = 1; i < ii; i++) {
          var clone = nodeClone[_xfa_object.$clone]();

          parent[name].push(clone);

          parent[_xfa_object.$insertAt](pos + i, clone);
        }
      }
    }
  }, {
    key: "_getOccurInfo",
    value: function _getOccurInfo(formNode) {
      var name = formNode.name,
          occur = formNode.occur;

      if (!occur || !name) {
        return [1, 1];
      }

      var max = occur.max === -1 ? Infinity : occur.max;
      return [occur.min, max];
    }
  }, {
    key: "_setAndBind",
    value: function _setAndBind(formNode, dataNode) {
      this._setProperties(formNode, dataNode);

      this._bindItems(formNode, dataNode);

      this._bindElement(formNode, dataNode);
    }
  }, {
    key: "_bindElement",
    value: function _bindElement(formNode, dataNode) {
      var uselessNodes = [];

      this._createOccurrences(formNode);

      var _iterator5 = _createForOfIteratorHelper(formNode[_xfa_object.$getChildren]()),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var child = _step5.value;

          if (child[_xfa_object.$data]) {
            continue;
          }

          if (this._mergeMode === undefined && child[_xfa_object.$nodeName] === "subform") {
            this._mergeMode = child.mergeMode === "consumeData";

            var dataChildren = dataNode[_xfa_object.$getChildren]();

            if (dataChildren.length > 0) {
              this._bindOccurrences(child, [dataChildren[0]], null);
            } else if (this.emptyMerge) {
              var nsId = dataNode[_xfa_object.$namespaceId] === NS_DATASETS ? -1 : dataNode[_xfa_object.$namespaceId];
              var dataChild = child[_xfa_object.$data] = new _xfa_object.XmlObject(nsId, child.name || "root");

              dataNode[_xfa_object.$appendChild](dataChild);

              this._bindElement(child, dataChild);
            }

            continue;
          }

          if (!child[_xfa_object.$isBindable]()) {
            continue;
          }

          var global = false;
          var picture = null;
          var ref = null;
          var match = null;

          if (child.bind) {
            switch (child.bind.match) {
              case "none":
                this._setAndBind(child, dataNode);

                continue;

              case "global":
                global = true;
                break;

              case "dataRef":
                if (!child.bind.ref) {
                  (0, _util.warn)("XFA - ref is empty in node ".concat(child[_xfa_object.$nodeName], "."));

                  this._setAndBind(child, dataNode);

                  continue;
                }

                ref = child.bind.ref;
                break;

              default:
                break;
            }

            if (child.bind.picture) {
              picture = child.bind.picture[_xfa_object.$content];
            }
          }

          var _this$_getOccurInfo = this._getOccurInfo(child),
              _this$_getOccurInfo2 = _slicedToArray(_this$_getOccurInfo, 2),
              min = _this$_getOccurInfo2[0],
              max = _this$_getOccurInfo2[1];

          if (ref) {
            match = (0, _som.searchNode)(this.root, dataNode, ref, true, false);

            if (match === null) {
              match = (0, _som.createDataNode)(this.data, dataNode, ref);

              if (!match) {
                continue;
              }

              if (this._isConsumeData()) {
                match[_xfa_object.$consumed] = true;
              }

              this._setAndBind(child, match);

              continue;
            } else {
              if (this._isConsumeData()) {
                match = match.filter(function (node) {
                  return !node[_xfa_object.$consumed];
                });
              }

              if (match.length > max) {
                match = match.slice(0, max);
              } else if (match.length === 0) {
                match = null;
              }

              if (match && this._isConsumeData()) {
                match.forEach(function (node) {
                  node[_xfa_object.$consumed] = true;
                });
              }
            }
          } else {
            if (!child.name) {
              this._setAndBind(child, dataNode);

              continue;
            }

            if (this._isConsumeData()) {
              var matches = [];

              while (matches.length < max) {
                var found = this._findDataByNameToConsume(child.name, child[_xfa_object.$hasSettableValue](), dataNode, global);

                if (!found) {
                  break;
                }

                found[_xfa_object.$consumed] = true;
                matches.push(found);
              }

              match = matches.length > 0 ? matches : null;
            } else {
              match = dataNode[_xfa_object.$getRealChildrenByNameIt](child.name, false, this.emptyMerge).next().value;

              if (!match) {
                if (min === 0) {
                  uselessNodes.push(child);
                  continue;
                }

                var _nsId = dataNode[_xfa_object.$namespaceId] === NS_DATASETS ? -1 : dataNode[_xfa_object.$namespaceId];

                match = child[_xfa_object.$data] = new _xfa_object.XmlObject(_nsId, child.name);

                if (this.emptyMerge) {
                  match[_xfa_object.$consumed] = true;
                }

                dataNode[_xfa_object.$appendChild](match);

                this._setAndBind(child, match);

                continue;
              }

              if (this.emptyMerge) {
                match[_xfa_object.$consumed] = true;
              }

              match = [match];
            }
          }

          if (match) {
            this._bindOccurrences(child, match, picture);
          } else if (min > 0) {
            this._setAndBind(child, dataNode);
          } else {
            uselessNodes.push(child);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      uselessNodes.forEach(function (node) {
        return node[_xfa_object.$getParent]()[_xfa_object.$removeChild](node);
      });
    }
  }]);

  return Binder;
}();

exports.Binder = Binder;