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

var _xml_parser = require("../../core/xml_parser.js");

var _core_utils = require("../../core/core_utils.js");

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

describe("XML", function () {
  describe("searchNode", function () {
    it("should search a node with a given path in xml tree", function () {
      var xml = "\n      <a>\n          <b>\n              <c a=\"123\"/>\n              <d/>\n              <e>\n                  <f>\n                      <g a=\"321\"/>\n                  </f>\n              </e>\n              <c a=\"456\"/>\n              <c a=\"789\"/>\n              <h/>\n              <c a=\"101112\"/>\n          </b>\n          <h>\n              <i/>\n              <j/>\n              <k>\n                  <g a=\"654\"/>\n              </k>\n          </h>\n          <b>\n              <g a=\"987\"/>\n              <h/>\n              <g a=\"121110\"/>\n          </b>\n      </a>";
      var root = new _xml_parser.SimpleXMLParser({
        hasAttributes: true
      }).parseFromString(xml).documentElement;

      function getAttr(path) {
        return root.searchNode((0, _core_utils.parseXFAPath)(path), 0).attributes[0].value;
      }

      expect(getAttr("b.g")).toEqual("321");
      expect(getAttr("e.f.g")).toEqual("321");
      expect(getAttr("e.g")).toEqual("321");
      expect(getAttr("g")).toEqual("321");
      expect(getAttr("h.g")).toEqual("654");
      expect(getAttr("b[0].g")).toEqual("321");
      expect(getAttr("b[1].g")).toEqual("987");
      expect(getAttr("b[1].g[0]")).toEqual("987");
      expect(getAttr("b[1].g[1]")).toEqual("121110");
      expect(getAttr("c")).toEqual("123");
      expect(getAttr("c[1]")).toEqual("456");
      expect(getAttr("c[2]")).toEqual("789");
      expect(getAttr("c[3]")).toEqual("101112");
    });
    it("should dump a xml tree", function () {
      var xml = "\n      <a>\n          <b>\n              <c a=\"123\"/>\n              <d>hello</d>\n              <e>\n                  <f>\n                      <g a=\"321\"/>\n                  </f>\n              </e>\n              <c a=\"456\"/>\n              <c a=\"789\"/>\n              <h/>\n              <c a=\"101112\"/>\n          </b>\n          <h>\n              <i/>\n              <j/>\n              <k>&#xA;W&#x1F602;rld&#xA;<g a=\"654\"/>\n              </k>\n          </h>\n          <b>\n              <g a=\"987\"/>\n              <h/>\n              <g a=\"121110\"/>\n          </b>\n      </a>";
      var root = new _xml_parser.SimpleXMLParser({
        hasAttributes: true
      }).parseFromString(xml).documentElement;
      var buffer = [];
      root.dump(buffer);
      expect(buffer.join("").replace(/\s+/g, "")).toEqual(xml.replace(/\s+/g, ""));
    });
  });
  it("should parse processing instructions", function () {
    var xml = "\n      <a>\n          <?foo bar?>\n          <?foo bar oof?>\n          <?foo?>\n      </a>";
    var pi = [];

    var MyParser = /*#__PURE__*/function (_XMLParserBase) {
      _inherits(MyParser, _XMLParserBase);

      var _super = _createSuper(MyParser);

      function MyParser() {
        _classCallCheck(this, MyParser);

        return _super.apply(this, arguments);
      }

      _createClass(MyParser, [{
        key: "onPi",
        value: function onPi(name, value) {
          pi.push([name, value]);
        }
      }]);

      return MyParser;
    }(_xml_parser.XMLParserBase);

    new MyParser().parseXml(xml);
    expect(pi).toEqual([["foo", "bar"], ["foo", "bar oof"], ["foo", ""]]);
  });
});