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
exports.NodeStandardFontDataFactory = exports.NodeCanvasFactory = exports.NodeCMapReaderFactory = void 0;

var _base_factory = require("./base_factory.js");

var _is_node = require("../shared/is_node.js");

var _util = require("../shared/util.js");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeCanvasFactory = function NodeCanvasFactory() {
  _classCallCheck(this, NodeCanvasFactory);

  (0, _util.unreachable)("Not implemented: NodeCanvasFactory");
};

exports.NodeCanvasFactory = NodeCanvasFactory;

var NodeCMapReaderFactory = function NodeCMapReaderFactory() {
  _classCallCheck(this, NodeCMapReaderFactory);

  (0, _util.unreachable)("Not implemented: NodeCMapReaderFactory");
};

exports.NodeCMapReaderFactory = NodeCMapReaderFactory;

var NodeStandardFontDataFactory = function NodeStandardFontDataFactory() {
  _classCallCheck(this, NodeStandardFontDataFactory);

  (0, _util.unreachable)("Not implemented: NodeStandardFontDataFactory");
};

exports.NodeStandardFontDataFactory = NodeStandardFontDataFactory;

if (_is_node.isNodeJS) {
  var fetchData = function fetchData(url) {
    return new Promise(function (resolve, reject) {
      var fs = require("fs");

      fs.readFile(url, function (error, data) {
        if (error || !data) {
          reject(new Error(error));
          return;
        }

        resolve(new Uint8Array(data));
      });
    });
  };

  exports.NodeCanvasFactory = NodeCanvasFactory = /*#__PURE__*/function (_BaseCanvasFactory) {
    _inherits(NodeCanvasFactory, _BaseCanvasFactory);

    var _super = _createSuper(NodeCanvasFactory);

    function NodeCanvasFactory() {
      _classCallCheck(this, NodeCanvasFactory);

      return _super.apply(this, arguments);
    }

    _createClass(NodeCanvasFactory, [{
      key: "_createCanvas",
      value: function _createCanvas(width, height) {
        var Canvas = require("canvas");

        return Canvas.createCanvas(width, height);
      }
    }]);

    return NodeCanvasFactory;
  }(_base_factory.BaseCanvasFactory);

  exports.NodeCMapReaderFactory = NodeCMapReaderFactory = /*#__PURE__*/function (_BaseCMapReaderFactor) {
    _inherits(NodeCMapReaderFactory, _BaseCMapReaderFactor);

    var _super2 = _createSuper(NodeCMapReaderFactory);

    function NodeCMapReaderFactory() {
      _classCallCheck(this, NodeCMapReaderFactory);

      return _super2.apply(this, arguments);
    }

    _createClass(NodeCMapReaderFactory, [{
      key: "_fetchData",
      value: function _fetchData(url, compressionType) {
        return fetchData(url).then(function (data) {
          return {
            cMapData: data,
            compressionType: compressionType
          };
        });
      }
    }]);

    return NodeCMapReaderFactory;
  }(_base_factory.BaseCMapReaderFactory);

  exports.NodeStandardFontDataFactory = NodeStandardFontDataFactory = /*#__PURE__*/function (_BaseStandardFontData) {
    _inherits(NodeStandardFontDataFactory, _BaseStandardFontData);

    var _super3 = _createSuper(NodeStandardFontDataFactory);

    function NodeStandardFontDataFactory() {
      _classCallCheck(this, NodeStandardFontDataFactory);

      return _super3.apply(this, arguments);
    }

    _createClass(NodeStandardFontDataFactory, [{
      key: "_fetchData",
      value: function _fetchData(url) {
        return fetchData(url);
      }
    }]);

    return NodeStandardFontDataFactory;
  }(_base_factory.BaseStandardFontDataFactory);
}