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
exports.DatasetsNamespace = void 0;

var _xfa_object = require("./xfa_object.js");

var _namespaces = require("./namespaces.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DATASETS_NS_ID = _namespaces.NamespaceIds.datasets.id;

var Data = /*#__PURE__*/function (_XmlObject) {
  _inherits(Data, _XmlObject);

  var _super = _createSuper(Data);

  function Data(attributes) {
    _classCallCheck(this, Data);

    return _super.call(this, DATASETS_NS_ID, "data", attributes);
  }

  _createClass(Data, [{
    key: _xfa_object.$isNsAgnostic,
    value: function value() {
      return true;
    }
  }]);

  return Data;
}(_xfa_object.XmlObject);

var Datasets = /*#__PURE__*/function (_XFAObject) {
  _inherits(Datasets, _XFAObject);

  var _super2 = _createSuper(Datasets);

  function Datasets(attributes) {
    var _this;

    _classCallCheck(this, Datasets);

    _this = _super2.call(this, DATASETS_NS_ID, "datasets", true);
    _this.data = null;
    _this.Signature = null;
    return _this;
  }

  _createClass(Datasets, [{
    key: _xfa_object.$onChild,
    value: function value(child) {
      var name = child[_xfa_object.$nodeName];

      if (name === "data" && child[_xfa_object.$namespaceId] === DATASETS_NS_ID || name === "Signature" && child[_xfa_object.$namespaceId] === _namespaces.NamespaceIds.signature.id) {
        this[name] = child;
      }

      this[_xfa_object.$appendChild](child);
    }
  }]);

  return Datasets;
}(_xfa_object.XFAObject);

var DatasetsNamespace = /*#__PURE__*/function () {
  function DatasetsNamespace() {
    _classCallCheck(this, DatasetsNamespace);
  }

  _createClass(DatasetsNamespace, null, [{
    key: _namespaces.$buildXFAObject,
    value: function value(name, attributes) {
      if (DatasetsNamespace.hasOwnProperty(name)) {
        return DatasetsNamespace[name](attributes);
      }

      return undefined;
    }
  }, {
    key: "datasets",
    value: function datasets(attributes) {
      return new Datasets(attributes);
    }
  }, {
    key: "data",
    value: function data(attributes) {
      return new Data(attributes);
    }
  }]);

  return DatasetsNamespace;
}();

exports.DatasetsNamespace = DatasetsNamespace;