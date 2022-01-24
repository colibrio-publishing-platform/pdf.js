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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _is_node = require("../../shared/is_node.js");

var _factory = require("../../core/xfa/factory.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

describe("XFAFactory", function () {
  function searchHtmlNode(root, name, value) {
    var byAttributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var nth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [0];

    if (!byAttributes && root[name] === value || byAttributes && root.attributes && root.attributes[name] === value) {
      if (nth[0]-- === 0) {
        return root;
      }
    }

    if (!root.children) {
      return null;
    }

    var _iterator = _createForOfIteratorHelper(root.children),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;
        var node = searchHtmlNode(child, name, value, byAttributes, nth);

        if (node) {
          return node;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return null;
  }

  describe("toHTML", function () {
    it("should convert some basic properties to CSS", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var xml, factory, pages, page1, container, wrapper, draw;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"123pt\" w=\"456pt\" h=\"789pt\"/>\n          <medium stock=\"default\" short=\"456pt\" long=\"789pt\"/>\n          <draw y=\"1pt\" w=\"11pt\" h=\"22pt\" rotate=\"90\" x=\"2pt\">\n            <assist><toolTip>A tooltip !!</toolTip></assist>\n            <font size=\"7pt\" typeface=\"FooBar\" baselineShift=\"2pt\">\n              <fill>\n                <color value=\"12,23,34\"/>\n                <solid/>\n              </fill>\n            </font>\n            <value/>\n            <margin topInset=\"1pt\" bottomInset=\"2pt\" leftInset=\"3pt\" rightInset=\"4pt\"/>\n            <para spaceAbove=\"1pt\" spaceBelow=\"2pt\" textIndent=\"3pt\" marginLeft=\"4pt\" marginRight=\"5pt\"/>\n          </draw>\n        </pageArea>\n      </pageSet>\n      <subform name=\"second\">\n        <breakBefore targetType=\"pageArea\" startNew=\"1\"/>\n        <subform>\n          <draw w=\"1pt\" h=\"1pt\"><value><text>foo</text></value></draw>\n        </subform>\n      </subform>\n      <subform name=\"third\">\n        <breakBefore targetType=\"pageArea\" startNew=\"1\"/>\n        <subform>\n          <draw w=\"1pt\" h=\"1pt\"><value><text>bar</text></value></draw>\n        </subform>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
              factory = new _factory.XFAFactory({
                "xdp:xdp": xml
              });
              factory.setFonts([]);
              _context.t0 = expect;
              _context.next = 6;
              return factory.getNumPages();

            case 6:
              _context.t1 = _context.sent;
              (0, _context.t0)(_context.t1).toEqual(2);
              _context.next = 10;
              return factory.getPages();

            case 10:
              pages = _context.sent;
              page1 = pages.children[0];
              expect(page1.attributes.style).toEqual({
                height: "789px",
                width: "456px"
              });
              expect(page1.children.length).toEqual(2);
              container = page1.children[1];
              expect(container.attributes["class"]).toEqual(["xfaContentarea"]);
              expect(container.attributes.style).toEqual({
                height: "789px",
                width: "456px",
                left: "123px",
                top: "0px"
              });
              wrapper = page1.children[0];
              draw = wrapper.children[0];
              expect(wrapper.attributes["class"]).toEqual(["xfaWrapper"]);
              expect(wrapper.attributes.style).toEqual({
                alignSelf: "start",
                height: "22px",
                left: "2px",
                position: "absolute",
                top: "1px",
                transform: "rotate(-90deg)",
                transformOrigin: "top left",
                width: "11px"
              });
              expect(draw.attributes["class"]).toEqual(["xfaDraw", "xfaFont", "xfaWrapped"]);
              expect(draw.attributes.title).toEqual("A tooltip !!");
              expect(draw.attributes.style).toEqual({
                color: "#0c1722",
                fontFamily: '"FooBar"',
                fontKerning: "none",
                letterSpacing: "0px",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "6.93px",
                padding: "1px 4px 2px 3px",
                verticalAlign: "2px"
              });
              expect(draw.attributes.style).toEqual(pages.children[1].children[0].children[0].attributes.style);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it("should have an alt attribute from toolTip", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var xml, factory, pages, field;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_is_node.isNodeJS) {
                pending("Image is not supported in Node.js.");
              }

              xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"0pt\" w=\"456pt\" h=\"789pt\"/>\n          <draw name=\"BA-Logo\" y=\"5.928mm\" x=\"128.388mm\" w=\"71.237mm\" h=\"9.528mm\">\n            <value>\n              <image contentType=\"image/png\">iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=</image>\n            </value>\n            <assist><toolTip>alt text</toolTip></assist>\n          </draw>\n        </pageArea>\n      </pageSet>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
              factory = new _factory.XFAFactory({
                "xdp:xdp": xml
              });
              _context2.t0 = expect;
              _context2.next = 6;
              return factory.getNumPages();

            case 6:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).toEqual(1);
              _context2.next = 10;
              return factory.getPages();

            case 10:
              pages = _context2.sent;
              field = searchHtmlNode(pages, "name", "img");
              expect(field.attributes.alt).toEqual("alt text");

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("should have a aria heading role and level", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var xml, factory, pages, page1, wrapper, draw;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"0pt\" w=\"456pt\" h=\"789pt\"/>\n          <medium stock=\"default\" short=\"456pt\" long=\"789pt\"/>\n          <draw name=\"BA-Logo\" y=\"5.928mm\" x=\"128.388mm\" w=\"71.237mm\" h=\"9.528mm\">\n            <value><text>foo</text></value>\n            <assist role=\"H2\"></assist>\n          </draw>\n        </pageArea>\n      </pageSet>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
              factory = new _factory.XFAFactory({
                "xdp:xdp": xml
              });
              _context3.t0 = expect;
              _context3.next = 5;
              return factory.getNumPages();

            case 5:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).toEqual(1);
              _context3.next = 9;
              return factory.getPages();

            case 9:
              pages = _context3.sent;
              page1 = pages.children[0];
              wrapper = page1.children[0];
              draw = wrapper.children[0];
              expect(draw.attributes.role).toEqual("heading");
              expect(draw.attributes["aria-level"]).toEqual("2");

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it("should have aria table role", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var xml, factory, pages, table, headerRow, headerCell, row, cell;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"0pt\" w=\"456pt\" h=\"789pt\"/>\n          <medium stock=\"default\" short=\"456pt\" long=\"789pt\"/>\n          <font size=\"7pt\" typeface=\"FooBar\" baselineShift=\"2pt\">\n          </font>\n        </pageArea>\n      </pageSet>\n      <subform name=\"table\" mergeMode=\"matchTemplate\" layout=\"table\">\n        <subform layout=\"row\" name=\"row1\">\n          <assist role=\"TH\"></assist>\n          <draw name=\"header1\" y=\"5.928mm\" x=\"128.388mm\" w=\"71.237mm\" h=\"9.528mm\">\n            <value><text>Header Col 1</text></value>\n          </draw>\n          <draw name=\"header2\" y=\"5.928mm\" x=\"128.388mm\" w=\"71.237mm\" h=\"9.528mm\">\n            <value><text>Header Col 2</text></value>\n          </draw>\n        </subform>\n        <subform layout=\"row\" name=\"row2\">\n          <draw name=\"cell1\" y=\"5.928mm\" x=\"128.388mm\" w=\"71.237mm\" h=\"9.528mm\">\n            <value><text>Cell 1</text></value>\n          </draw>\n          <draw name=\"cell2\" y=\"5.928mm\" x=\"128.388mm\" w=\"71.237mm\" h=\"9.528mm\">\n            <value><text>Cell 2</text></value>\n          </draw>\n        </subform>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
              factory = new _factory.XFAFactory({
                "xdp:xdp": xml
              });
              factory.setFonts([]);
              _context4.t0 = expect;
              _context4.next = 6;
              return factory.getNumPages();

            case 6:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).toEqual(1);
              _context4.next = 10;
              return factory.getPages();

            case 10:
              pages = _context4.sent;
              table = searchHtmlNode(pages, "xfaName", "table", true);
              expect(table.attributes.role).toEqual("table");
              headerRow = searchHtmlNode(pages, "xfaName", "row1", true);
              expect(headerRow.attributes.role).toEqual("row");
              headerCell = searchHtmlNode(pages, "xfaName", "header2", true);
              expect(headerCell.attributes.role).toEqual("columnheader");
              row = searchHtmlNode(pages, "xfaName", "row2", true);
              expect(row.attributes.role).toEqual("row");
              cell = searchHtmlNode(pages, "xfaName", "cell2", true);
              expect(cell.attributes.role).toEqual("cell");

            case 21:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it("should have a maxLength property", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var xml, factory, pages, field;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"0pt\" w=\"456pt\" h=\"789pt\"/>\n          <medium stock=\"default\" short=\"456pt\" long=\"789pt\"/>\n          <field y=\"1pt\" w=\"11pt\" h=\"22pt\" x=\"2pt\">\n            <ui>\n              <textEdit multiLine=\"0\"/>\n            </ui>\n            <value>\n              <text maxChars=\"123\"/>\n            </value>\n          </field>\n        </pageArea>\n      </pageSet>\n      <subform name=\"first\">\n        <draw w=\"1pt\" h=\"1pt\"><value><text>foo</text></value></draw>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
              factory = new _factory.XFAFactory({
                "xdp:xdp": xml
              });
              _context5.t0 = expect;
              _context5.next = 5;
              return factory.getNumPages();

            case 5:
              _context5.t1 = _context5.sent;
              (0, _context5.t0)(_context5.t1).toEqual(1);
              _context5.next = 9;
              return factory.getPages();

            case 9:
              pages = _context5.sent;
              field = searchHtmlNode(pages, "name", "input");
              expect(field.attributes.maxLength).toEqual(123);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it("should have an aria-label property from speak", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var xml, factory, pages, field;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"0pt\" w=\"456pt\" h=\"789pt\"/>\n          <medium stock=\"default\" short=\"456pt\" long=\"789pt\"/>\n          <field y=\"1pt\" w=\"11pt\" h=\"22pt\" x=\"2pt\">\n            <assist><speak>Screen Reader</speak></assist>\n            <ui>\n              <textEdit multiLine=\"0\"/>\n            </ui>\n            <value>\n              <text maxChars=\"123\"/>\n            </value>\n          </field>\n        </pageArea>\n      </pageSet>\n      <subform name=\"first\">\n        <draw w=\"1pt\" h=\"1pt\"><value><text>foo</text></value></draw>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
              factory = new _factory.XFAFactory({
                "xdp:xdp": xml
              });
              _context6.t0 = expect;
              _context6.next = 5;
              return factory.getNumPages();

            case 5:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1).toEqual(1);
              _context6.next = 9;
              return factory.getPages();

            case 9:
              pages = _context6.sent;
              field = searchHtmlNode(pages, "name", "input");
              expect(field.attributes["aria-label"]).toEqual("Screen Reader");

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it("should have an aria-label property from toolTip", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var xml, factory, pages, field;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"0pt\" w=\"456pt\" h=\"789pt\"/>\n          <medium stock=\"default\" short=\"456pt\" long=\"789pt\"/>\n          <field y=\"1pt\" w=\"11pt\" h=\"22pt\" x=\"2pt\">\n            <assist><toolTip>Screen Reader</toolTip></assist>\n            <ui>\n              <textEdit multiLine=\"0\"/>\n            </ui>\n            <value>\n              <text maxChars=\"123\"/>\n            </value>\n          </field>\n        </pageArea>\n      </pageSet>\n      <subform name=\"first\">\n        <draw w=\"1pt\" h=\"1pt\"><value><text>foo</text></value></draw>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
              factory = new _factory.XFAFactory({
                "xdp:xdp": xml
              });
              _context7.t0 = expect;
              _context7.next = 5;
              return factory.getNumPages();

            case 5:
              _context7.t1 = _context7.sent;
              (0, _context7.t0)(_context7.t1).toEqual(1);
              _context7.next = 9;
              return factory.getPages();

            case 9:
              pages = _context7.sent;
              field = searchHtmlNode(pages, "name", "input");
              expect(field.attributes["aria-label"]).toEqual("Screen Reader");

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it("should have an input or textarea", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var xml, factory, pages, field1, field2;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"123pt\" w=\"456pt\" h=\"789pt\"/>\n          <medium stock=\"default\" short=\"456pt\" long=\"789pt\"/>\n          <field y=\"1pt\" w=\"11pt\" h=\"22pt\" x=\"2pt\">\n            <ui>\n              <textEdit/>\n            </ui>\n          </field>\n          <field y=\"1pt\" w=\"11pt\" h=\"22pt\" x=\"2pt\">\n            <ui>\n              <textEdit multiLine=\"1\"/>\n            </ui>\n          </field>\n        </pageArea>\n      </pageSet>\n      <subform name=\"first\">\n        <draw w=\"1pt\" h=\"1pt\"><value><text>foo</text></value></draw>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
              factory = new _factory.XFAFactory({
                "xdp:xdp": xml
              });
              _context8.t0 = expect;
              _context8.next = 5;
              return factory.getNumPages();

            case 5:
              _context8.t1 = _context8.sent;
              (0, _context8.t0)(_context8.t1).toEqual(1);
              _context8.next = 9;
              return factory.getPages();

            case 9:
              pages = _context8.sent;
              field1 = searchHtmlNode(pages, "name", "input");
              expect(field1).not.toEqual(null);
              field2 = searchHtmlNode(pages, "name", "textarea");
              expect(field2).not.toEqual(null);

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  it("should have an input or textarea", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var xml, factory, pages, field1;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"123pt\" w=\"456pt\" h=\"789pt\"/>\n          <medium stock=\"default\" short=\"456pt\" long=\"789pt\"/>\n          <field y=\"1pt\" w=\"11pt\" h=\"22pt\" x=\"2pt\">\n            <ui>\n              <textEdit multiLine=\"1\"/>\n            </ui>\n          </field>\n        </pageArea>\n      </pageSet>\n      <subform name=\"first\">\n        <field y=\"1pt\" w=\"11pt\" h=\"22pt\" x=\"2pt\" name=\"hello\">\n          <ui>\n            <textEdit/>\n          </ui>\n          <value>\n            <integer/>\n          </value>\n        </field>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <toto>\n        <first>\n          <hello>123\n          </hello>\n        </first>\n      </toto>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n    ";
            factory = new _factory.XFAFactory({
              "xdp:xdp": xml
            });
            _context9.t0 = expect;
            _context9.next = 5;
            return factory.getNumPages();

          case 5:
            _context9.t1 = _context9.sent;
            (0, _context9.t0)(_context9.t1).toEqual(1);
            _context9.next = 9;
            return factory.getPages();

          case 9:
            pages = _context9.sent;
            field1 = searchHtmlNode(pages, "name", "input");
            expect(field1).not.toEqual(null);
            expect(field1.attributes.value).toEqual("123");

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it("should parse URLs correctly", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var getXml, factory, pages, a;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            getXml = function _getXml(href) {
              return "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"0pt\" w=\"456pt\" h=\"789pt\"/>\n          <medium stock=\"default\" short=\"456pt\" long=\"789pt\"/>\n          <draw name=\"url\" y=\"5.928mm\" x=\"128.388mm\" w=\"71.237mm\" h=\"9.528mm\">\n            <value>\n              <exData contentType=\"text/html\">\n                <body xmlns=\"http://www.w3.org/1999/xhtml\">\n                  <a href=\"".concat(href, "\">").concat(href, "</a>\n                </body>\n              </exData>\n            </value>\n          </draw>\n        </pageArea>\n      </pageSet>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ");
            };

            factory = new _factory.XFAFactory({
              "xdp:xdp": getXml("https://www.example.com/")
            });
            _context10.t0 = expect;
            _context10.next = 5;
            return factory.getNumPages();

          case 5:
            _context10.t1 = _context10.sent;
            (0, _context10.t0)(_context10.t1).toEqual(1);
            _context10.next = 9;
            return factory.getPages();

          case 9:
            pages = _context10.sent;
            a = searchHtmlNode(pages, "name", "a");
            expect(a.value).toEqual("https://www.example.com/");
            expect(a.attributes.href).toEqual("https://www.example.com/");
            factory = new _factory.XFAFactory({
              "xdp:xdp": getXml("www.example.com/")
            });
            _context10.t2 = expect;
            _context10.next = 17;
            return factory.getNumPages();

          case 17:
            _context10.t3 = _context10.sent;
            (0, _context10.t2)(_context10.t3).toEqual(1);
            _context10.next = 21;
            return factory.getPages();

          case 21:
            pages = _context10.sent;
            a = searchHtmlNode(pages, "name", "a");
            expect(a.value).toEqual("www.example.com/");
            expect(a.attributes.href).toEqual("http://www.example.com/");
            factory = new _factory.XFAFactory({
              "xdp:xdp": getXml("mailto:test@example.com")
            });
            _context10.t4 = expect;
            _context10.next = 29;
            return factory.getNumPages();

          case 29:
            _context10.t5 = _context10.sent;
            (0, _context10.t4)(_context10.t5).toEqual(1);
            _context10.next = 33;
            return factory.getPages();

          case 33:
            pages = _context10.sent;
            a = searchHtmlNode(pages, "name", "a");
            expect(a.value).toEqual("mailto:test@example.com");
            expect(a.attributes.href).toEqual("mailto:test@example.com");
            factory = new _factory.XFAFactory({
              "xdp:xdp": getXml("qwerty/")
            });
            _context10.t6 = expect;
            _context10.next = 41;
            return factory.getNumPages();

          case 41:
            _context10.t7 = _context10.sent;
            (0, _context10.t6)(_context10.t7).toEqual(1);
            _context10.next = 45;
            return factory.getPages();

          case 45:
            pages = _context10.sent;
            a = searchHtmlNode(pages, "name", "a");
            expect(a.value).toEqual("qwerty/");
            expect(a.attributes.href).toEqual("");

          case 49:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it("should replace button with an URL by a link", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var xml, factory, pages, a;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <pageSet>\n        <pageArea>\n          <contentArea x=\"123pt\" w=\"456pt\" h=\"789pt\"/>\n          <medium stock=\"default\" short=\"456pt\" long=\"789pt\"/>\n        </pageArea>\n      </pageSet>\n      <subform name=\"first\">\n        <field y=\"1pt\" w=\"11pt\" h=\"22pt\" x=\"2pt\">\n          <ui>\n            <button/>\n          </ui>\n          <event activity=\"click\" name=\"event__click\">\n            <script contentType=\"application/x-javascript\">\n              app.launchURL(\"https://github.com/mozilla/pdf.js\", true);\n            </script>\n          </event>\n        </field>\n        <field y=\"1pt\" w=\"11pt\" h=\"22pt\" x=\"2pt\">\n          <ui>\n            <button/>\n          </ui>\n          <event activity=\"click\" name=\"event__click\">\n            <script contentType=\"application/x-javascript\">\n              xfa.host.gotoURL(\"https://github.com/allizom/pdf.js\");\n            </script>\n          </event>\n        </field>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n    ";
            factory = new _factory.XFAFactory({
              "xdp:xdp": xml
            });
            _context11.t0 = expect;
            _context11.next = 5;
            return factory.getNumPages();

          case 5:
            _context11.t1 = _context11.sent;
            (0, _context11.t0)(_context11.t1).toEqual(1);
            _context11.next = 9;
            return factory.getPages();

          case 9:
            pages = _context11.sent;
            a = searchHtmlNode(pages, "name", "a");
            expect(a.attributes.href).toEqual("https://github.com/mozilla/pdf.js");
            expect(a.attributes.newWindow).toEqual(true);
            a = searchHtmlNode(pages, "name", "a", false, [1]);
            expect(a.attributes.href).toEqual("https://github.com/allizom/pdf.js");
            expect(a.attributes.newWindow).toEqual(false);

          case 16:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
});