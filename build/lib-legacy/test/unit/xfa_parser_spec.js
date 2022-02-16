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

var _xfa_object = require("../../core/xfa/xfa_object.js");

var _bind = require("../../core/xfa/bind.js");

var _som = require("../../core/xfa/som.js");

var _parser = require("../../core/xfa/parser.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe("XFAParser", function () {
  describe("Parse XFA", function () {
    it("should parse a xfa document and create an object to represent it", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\" uuid=\"1234\" invalid=\"foo\">\n  <config xmlns=\"http://www.xfa.org/schema/xci/3.1/\">\n    <present>\n      <pdf name=\"hello\">\n        <adobeExtensionLevel>\n          7\n        </adobeExtensionLevel>\n      </pdf>\n      <invalid><a>foobar</a></invalid>\n    </present>\n    <acrobat>\n      <submitUrl>http://a.b.c</submitUrl>\n      <acrobat7>\n        <dynamicRender>\n          forbidden\n        </dynamicRender>\n      </acrobat7>\n      <autoSave>enabled</autoSave>\n      <submitUrl>\n                 http://d.e.f\n      </submitUrl>\n      <submitUrl>http://g.h.i</submitUrl>\n      <validate>foobar</validate>\n    </acrobat>\n  </config>\n  <template baseProfile=\"full\" xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <extras>\n      <float>1.23</float>\n      <boolean>1</boolean>\n      <integer>314</integer>\n      <float>2.71</float>\n    </extras>\n    <subform>\n      <proto>\n        <area x=\"hello\" y=\"-3.14in\" relevant=\"-foo +bar\" />\n        <color value=\"111, 222, 123\" />\n        <color value=\"111, abc, 123\" />\n        <medium imagingBBox=\"1,2in,3.4cm,5.67px\" />\n        <medium imagingBBox=\"1,2in,-3cm,4px\" />\n      </proto>\n    </subform>\n  </template>\n</xdp:xdp>\n      ";
      var attributes = {
        id: "",
        name: "",
        use: "",
        usehref: ""
      };
      var mediumAttributes = {
        id: "",
        "long": 0,
        orientation: "portrait",
        "short": 0,
        stock: "",
        trayIn: "auto",
        trayOut: "auto",
        use: "",
        usehref: ""
      };
      var colorAttributes = {
        cSpace: "SRGB",
        id: "",
        use: "",
        usehref: ""
      };
      var root = new _parser.XFAParser().parse(xml);
      var expected = {
        uuid: "1234",
        timeStamp: "",
        template: {
          baseProfile: "full",
          extras: _objectSpread(_objectSpread({}, attributes), {}, {
            "float": [_objectSpread(_objectSpread({}, attributes), {}, {
              $content: 1.23
            }), _objectSpread(_objectSpread({}, attributes), {}, {
              $content: 2.71
            })],
            "boolean": _objectSpread(_objectSpread({}, attributes), {}, {
              $content: 1
            }),
            integer: _objectSpread(_objectSpread({}, attributes), {}, {
              $content: 314
            })
          }),
          subform: {
            access: "open",
            allowMacro: 0,
            anchorType: "topLeft",
            colSpan: 1,
            columnWidths: [0],
            h: "",
            hAlign: "left",
            id: "",
            layout: "position",
            locale: "",
            maxH: 0,
            maxW: 0,
            mergeMode: "consumeData",
            minH: 0,
            minW: 0,
            name: "",
            presence: "visible",
            relevant: [],
            restoreState: "manual",
            scope: "name",
            use: "",
            usehref: "",
            w: "",
            x: 0,
            y: 0,
            proto: {
              area: _objectSpread(_objectSpread({}, attributes), {}, {
                colSpan: 1,
                x: 0,
                y: -226.08,
                relevant: [{
                  excluded: true,
                  viewname: "foo"
                }, {
                  excluded: false,
                  viewname: "bar"
                }]
              }),
              color: [_objectSpread(_objectSpread({}, colorAttributes), {}, {
                value: {
                  r: 111,
                  g: 222,
                  b: 123
                }
              }), _objectSpread(_objectSpread({}, colorAttributes), {}, {
                value: {
                  r: 111,
                  g: 0,
                  b: 123
                }
              })],
              medium: [_objectSpread(_objectSpread({}, mediumAttributes), {}, {
                imagingBBox: {
                  x: 1,
                  y: 144,
                  width: 96.3779527559055,
                  height: 5.67
                }
              }), _objectSpread(_objectSpread({}, mediumAttributes), {}, {
                imagingBBox: {
                  x: -1,
                  y: -1,
                  width: -1,
                  height: -1
                }
              })]
            }
          }
        },
        config: {
          acrobat: {
            acrobat7: {
              dynamicRender: {
                $content: "forbidden"
              }
            },
            autoSave: {
              $content: "enabled"
            },
            validate: {
              $content: "preSubmit"
            },
            submitUrl: [{
              $content: "http://a.b.c"
            }, {
              $content: "http://d.e.f"
            }, {
              $content: "http://g.h.i"
            }]
          },
          present: {
            pdf: {
              name: "hello",
              adobeExtensionLevel: {
                $content: 7
              }
            }
          }
        }
      };
      expect(root[_xfa_object.$dump]()).toEqual(expected);
    });
    it("should parse a xfa document and check namespaces", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <config xmlns:foo=\"http:/www.foo.com\" xmlns=\"http://www.xfa.org/schema/xci/3.1/\">\n    <present xmlns=\"http://www.mozilla.org\">\n      <pdf name=\"hello\">\n        <adobeExtensionLevel>\n          7\n        </adobeExtensionLevel>\n      </pdf>\n    </present>\n    <acrobat>\n      <foo:submitUrl>http://a.b.c</foo:submitUrl>\n      <submitUrl>http://c.b.a</submitUrl>\n    </acrobat>\n  </config>\n  <template baseProfile=\"full\" xmlns=\"http://www.allizom.org\">\n    <extras>\n      <float>1.23</float>\n    </extras>\n  </template>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var expected = {
        uuid: "",
        timeStamp: "",
        config: {
          acrobat: {
            submitUrl: {
              $content: "http://c.b.a"
            }
          }
        }
      };
      expect(root[_xfa_object.$dump]()).toEqual(expected);
    });
    it("should parse a xfa document and parse CDATA when needed", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform>\n      <field>\n        <extras>\n          <exData contentType=\"text/html\" name=\"foo\">\n            <![CDATA[<body xmlns=\"http://www.w3.org/1999/xhtml\">\n              <span>hello</span></body>]]>\n          </exData>\n        </extra>\n      </field>\n    </subform>\n  </template>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var exdata = (0, _som.searchNode)(root, root, "foo")[0];

      var body = exdata[_xfa_object.$dump]().$content[_xfa_object.$dump]();

      var expected = {
        $name: "body",
        attributes: {},
        children: [{
          $content: "hello",
          $name: "span",
          attributes: {},
          children: []
        }]
      };
      expect(body).toEqual(expected);
    });
    it("should parse a xfa document and apply some prototypes", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform>\n      <proto>\n        <font id=\"id1\" typeface=\"Foo\" size=\"123pt\" weight=\"bold\" posture=\"italic\">\n          <fill>\n            <color value=\"1,2,3\"/>\n          </fill>\n        </font>\n      </proto>\n      <field>\n        <font use=\"#id1\"/>\n      </field>\n      <field>\n        <font use=\"#id1\" size=\"456pt\" weight=\"bold\" posture=\"normal\">\n          <fill>\n            <color value=\"4,5,6\"/>\n          </fill>\n          <extras id=\"id2\"/>\n        </font>\n      </field>\n    </subform>\n  </template>\n</xdp:xdp>\n      ";

      var root = new _parser.XFAParser().parse(xml)[_xfa_object.$dump]();

      var font = root.template.subform.field[0].font;
      expect(font.typeface).toEqual("Foo");
      expect(font.overline).toEqual(0);
      expect(font.size).toEqual(123);
      expect(font.weight).toEqual("bold");
      expect(font.posture).toEqual("italic");
      expect(font.fill.color.value).toEqual({
        r: 1,
        g: 2,
        b: 3
      });
      expect(font.extras).toEqual(undefined);
      font = root.template.subform.field[1].font;
      expect(font.typeface).toEqual("Foo");
      expect(font.overline).toEqual(0);
      expect(font.size).toEqual(456);
      expect(font.weight).toEqual("bold");
      expect(font.posture).toEqual("normal");
      expect(font.fill.color.value).toEqual({
        r: 4,
        g: 5,
        b: 6
      });
      expect(font.extras.id).toEqual("id2");
    });
    it("should parse a xfa document and apply some prototypes through usehref", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform>\n      <proto>\n        <draw name=\"foo\">\n          <font typeface=\"Foo\" size=\"123pt\" weight=\"bold\" posture=\"italic\">\n            <fill>\n              <color value=\"1,2,3\"/>\n            </fill>\n          </font>\n        </draw>\n      </proto>\n      <field>\n        <font usehref=\".#som($template.#subform.foo.#font)\"/>\n      </field>\n      <field>\n        <font usehref=\".#som($template.#subform.foo.#font)\" size=\"456pt\" weight=\"bold\" posture=\"normal\">\n          <fill>\n            <color value=\"4,5,6\"/>\n          </fill>\n          <extras id=\"id2\"/>\n        </font>\n      </field>\n    </subform>\n  </template>\n</xdp:xdp>\n      ";

      var root = new _parser.XFAParser().parse(xml)[_xfa_object.$dump]();

      var font = root.template.subform.field[0].font;
      expect(font.typeface).toEqual("Foo");
      expect(font.overline).toEqual(0);
      expect(font.size).toEqual(123);
      expect(font.weight).toEqual("bold");
      expect(font.posture).toEqual("italic");
      expect(font.fill.color.value).toEqual({
        r: 1,
        g: 2,
        b: 3
      });
      expect(font.extras).toEqual(undefined);
      font = root.template.subform.field[1].font;
      expect(font.typeface).toEqual("Foo");
      expect(font.overline).toEqual(0);
      expect(font.size).toEqual(456);
      expect(font.weight).toEqual("bold");
      expect(font.posture).toEqual("normal");
      expect(font.fill.color.value).toEqual({
        r: 4,
        g: 5,
        b: 6
      });
      expect(font.extras.id).toEqual("id2");
    });
    it("should parse a xfa document with xhtml", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <extras>\n      <text>\n        <body xmlns=\"http://www.w3.org/1999/xhtml\">\n          <p style=\"foo: bar; text-indent:0.5in; line-height:11px;bar:foo;tab-stop: left 0.5in\">\n            The first line of this paragraph is indented a half-inch.<br/>\n            Successive lines are not indented.<br/>\n            This is the last line of the paragraph.<br/>\n          </p>\n        </body>\n      </text>\n    </extras>\n  </template>\n</xdp:xdp>\n      ";

      var root = new _parser.XFAParser().parse(xml)[_xfa_object.$dump]();

      var p = root.template.extras.text.$content[_xfa_object.$getChildren]()[0];

      expect(p.style).toEqual("text-indent:0.5in;line-height:11px;tab-stop:left 0.5in");
      expect(p[_xfa_object.$text]()).toEqual([" The first line of this paragraph is indented a half-inch.\n", " Successive lines are not indented.\n", " This is the last line of the paragraph.\n "].join(""));
    });
    it("should parse a xfa document and apply some prototypes with cycle", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform>\n      <proto>\n        <subform id=\"id1\">\n          <subform use=\"#id1\"/>\n        </subform>\n      </proto>\n    </subform>\n    <subform use=\"#id1\"/>\n  </template>\n</xdp:xdp>\n      ";

      var root = new _parser.XFAParser().parse(xml)[_xfa_object.$dump]();

      var subform = root.template.subform[1];
      expect(subform.id).toEqual("id1");
      expect(subform.subform.id).toEqual("id1");
    });
    it("should parse a xfa document and apply some nested prototypes", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform>\n      <proto>\n        <color id=\"RED\" value=\"7, 8, 9\"/>\n        <font id=\"HELV\" typeface=\"helvetica\" size=\"31pt\" weight=\"normal\" posture=\"italic\"> </font>\n        <font id=\"HELV-RED\" use=\"#HELV\">\n          <fill>\n            <color use=\"#RED\"/>\n          </fill>\n        </font>\n      </proto>\n      <field>\n        <font use=\"#HELV-RED\"/>\n      </field>\n    </subform>\n  </template>\n</xdp:xdp>\n      ";

      var root = new _parser.XFAParser().parse(xml)[_xfa_object.$dump]();

      var font = root.template.subform.field.font;
      expect(font.typeface).toEqual("helvetica");
      expect(font.overline).toEqual(0);
      expect(font.size).toEqual(31);
      expect(font.weight).toEqual("normal");
      expect(font.posture).toEqual("italic");
      expect(font.fill.color.value).toEqual({
        r: 7,
        g: 8,
        b: 9
      });
    });
    it("should parse a xfa document and apply a prototype with content", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform>\n      <proto>\n        <text id=\"TEXT\">default TEXT</text>\n      </proto>\n      <field>\n        <value>\n          <text use=\"#TEXT\"></text>\n        </value>\n      </field>\n      <field>\n        <value>\n          <text use=\"#TEXT\">Overriding text</text>\n        </value>\n      </field>\n    </subform>\n  </template>\n</xdp:xdp>\n      ";

      var root = new _parser.XFAParser().parse(xml)[_xfa_object.$dump]();

      var field = root.template.subform.field[0];
      expect(field.value.text.$content).toEqual("default TEXT");
      field = root.template.subform.field[1];
      expect(field.value.text.$content).toEqual("Overriding text");
    });
  });
  describe("Search in XFA", function () {
    it("should search some nodes in a template object", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n    <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n      <subform name=\"Receipt\" id=\"l\">\n        <subform id=\"m\">\n          <field name=\"Description\" id=\"a\">  </field>\n          <field name=\"Units\" id=\"b\">  </field>\n          <field name=\"Unit_Price\" id=\"c\">  </field>\n          <field name=\"Total_Price\" id=\"d\">  </field>\n        </subform>\n        <subform id=\"n\">\n          <field name=\"Description\" id=\"e\">  </field>\n          <field name=\"Units\" id=\"f\">  </field>\n          <field name=\"Unit_Price\" id=\"g\">  </field>\n          <field name=\"Total_Price\" id=\"h\">  </field>\n        </subform>\n        <subform name=\"foo\" id=\"o\">\n          <field name=\"Description\" id=\"p\">  </field>\n          <field name=\"Units\" id=\"q\">  </field>\n          <field name=\"Unit_Price\" id=\"r\">  </field>\n          <field name=\"Total_Price\" id=\"s\">  </field>\n        </subform>\n        <field name=\"Sub_Total\" id=\"i\">  </field>\n        <field name=\"Tax\" id=\"j\">  </field>\n        <field name=\"Total_Price\" id=\"k\">  </field>\n      </subform>\n    </template>\n</xdp:xdp>\n        ";
      var root = new _parser.XFAParser().parse(xml);

      var found = root[_xfa_object.$getChildrenByName]("subform", true);

      expect(found.map(function (x) {
        return x.id;
      })).toEqual(["l", "m", "n", "o"]);
      found = root[_xfa_object.$getChildrenByName]("Total_Price", true);
      expect(found.map(function (x) {
        return x.id;
      })).toEqual(["d", "h", "s", "k"]);
      found = root.template[_xfa_object.$getChildrenByName]("Receipt", false);
      var receipt = found[0];
      found = receipt[_xfa_object.$getChildrenByName]("Total_Price", false);
      expect(found.map(function (x) {
        return x.id;
      })).toEqual(["d", "h", "k"]);
      expect(receipt[_xfa_object.$getChildrenByClass]("name")).toEqual("Receipt");

      var subforms = receipt[_xfa_object.$getChildrenByClass]("subform");

      expect(subforms.children.map(function (x) {
        return x.id;
      })).toEqual(["m", "n", "o"]);
    });
    it("should search some nodes in a template object using SOM", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n    <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n      <subform name=\"Receipt\" id=\"l\">\n        <subform id=\"m\">\n          <field name=\"Description\" id=\"a\">  </field>\n          <field name=\"Units\" id=\"b\">  </field>\n          <field name=\"Unit_Price\" id=\"c\">  </field>\n          <field name=\"Total_Price\" id=\"d\">  </field>\n        </subform>\n        <subform id=\"n\">\n          <field name=\"Description\" id=\"e\">  </field>\n          <field name=\"Units\" id=\"f\">  </field>\n          <field name=\"Unit_Price\" id=\"g\">  </field>\n          <field name=\"Total_Price\" id=\"h\">  </field>\n        </subform>\n        <subform name=\"foo\" id=\"o\">\n          <field name=\"Description\" id=\"p\">  </field>\n          <field name=\"Units\" id=\"q\">  </field>\n          <field name=\"Unit_Price\" id=\"r\">  </field>\n          <field name=\"Total_Price\" id=\"s\">  </field>\n        </subform>\n        <field name=\"Sub_Total\" id=\"i\">  </field>\n        <field name=\"Tax\" id=\"j\">  </field>\n        <field name=\"Total_Price\" id=\"k\">  </field>\n      </subform>\n    </template>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      expect((0, _som.searchNode)(root, null, "$template..Description.id")[0][_xfa_object.$text]()).toBe("a");
      expect((0, _som.searchNode)(root, null, "$template..Description.id")[0][_xfa_object.$text]()).toBe("a");
      expect((0, _som.searchNode)(root, null, "$template..Description[0].id")[0][_xfa_object.$text]()).toBe("a");
      expect((0, _som.searchNode)(root, null, "$template..Description[1].id")[0][_xfa_object.$text]()).toBe("e");
      expect((0, _som.searchNode)(root, null, "$template..Description[2].id")[0][_xfa_object.$text]()).toBe("p");
      expect((0, _som.searchNode)(root, null, "$template.Receipt.id")[0][_xfa_object.$text]()).toBe("l");
      expect((0, _som.searchNode)(root, null, "$template.Receipt.Description[1].id")[0][_xfa_object.$text]()).toBe("e");
      expect((0, _som.searchNode)(root, null, "$template.Receipt.Description[2]")).toBe(null);
      expect((0, _som.searchNode)(root, null, "$template.Receipt.foo.Description.id")[0][_xfa_object.$text]()).toBe("p");
      expect((0, _som.searchNode)(root, null, "$template.#subform.Sub_Total.id")[0][_xfa_object.$text]()).toBe("i");
      expect((0, _som.searchNode)(root, null, "$template.#subform.Units.id")[0][_xfa_object.$text]()).toBe("b");
      expect((0, _som.searchNode)(root, null, "$template.#subform.Units.parent.id")[0][_xfa_object.$text]()).toBe("m");
    });
    it("should search some nodes in a datasets object", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <Receipt>\n        <Page>1</Page>\n        <Detail PartNo=\"GS001\">\n          <Description>Giant Slingshot</Description>\n          <Units>1</Units>\n          <Unit_Price>250.00</Unit_Price>\n          <Total_Price>250.00</Total_Price>\n        </Detail>\n        <Page>2</Page>\n        <Detail PartNo=\"RRB-LB\">\n          <Description>Road Runner Bait, large bag</Description>\n          <Units>5</Units>\n          <Unit_Price>12.00</Unit_Price>\n          <Total_Price>60.00</Total_Price>\n        </Detail>\n        <Sub_Total>310.00</Sub_Total>\n        <Tax>24.80</Tax>\n        <Total_Price>334.80</Total_Price>\n      </Receipt>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var data = root.datasets.data;

      var found = data[_xfa_object.$getChildrenByName]("Description", true);

      expect(found.map(function (x) {
        return x[_xfa_object.$text]();
      })).toEqual(["Giant Slingshot", "Road Runner Bait, large bag"]);
      found = data[_xfa_object.$getChildrenByName]("Total_Price", true);
      expect(found.map(function (x) {
        return x[_xfa_object.$text]();
      })).toEqual(["250.00", "60.00", "334.80"]);
    });
    it("should search some nodes using SOM from a non-root node", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <Receipt>\n        <Page>1</Page>\n        <Detail PartNo=\"GS001\">\n          <Description>Giant Slingshot</Description>\n          <Units>1</Units>\n          <Unit_Price>250.00</Unit_Price>\n          <Total_Price>250.00</Total_Price>\n        </Detail>\n        <Page>2</Page>\n        <Detail PartNo=\"RRB-LB\">\n          <Description>Road Runner Bait, large bag</Description>\n          <Units>5</Units>\n          <Unit_Price>12.00</Unit_Price>\n          <Total_Price>60.00</Total_Price>\n        </Detail>\n        <Sub_Total>310.00</Sub_Total>\n        <Tax>24.80</Tax>\n        <Total_Price>334.80</Total_Price>\n      </Receipt>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);

      var _root$datasets$data$$ = root.datasets.data[_xfa_object.$getChildren]("Receipt"),
          _root$datasets$data$$2 = _slicedToArray(_root$datasets$data$$, 1),
          receipt = _root$datasets$data$$2[0];

      expect((0, _som.searchNode)(root, receipt, "Detail[*].Total_Price").map(function (x) {
        return x[_xfa_object.$text]();
      })).toEqual(["250.00", "60.00"]);

      var _searchNode = (0, _som.searchNode)(root, receipt, "Detail[1].Units"),
          _searchNode2 = _slicedToArray(_searchNode, 1),
          units = _searchNode2[0];

      expect(units[_xfa_object.$text]()).toBe("5");

      var _searchNode3 = (0, _som.searchNode)(root, units, "Total_Price"),
          _searchNode4 = _slicedToArray(_searchNode3, 1),
          found = _searchNode4[0];

      expect(found[_xfa_object.$text]()).toBe("60.00");
      found = (0, _som.searchNode)(root, units, "Total_Pric");
      expect(found).toEqual(null);
    });
    it("should search some nodes in a datasets object using SOM", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <Receipt Detail=\"Acme\">\n        <Detail>foo</Detail>\n        <Detail>bar</Detail>\n     </Receipt>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      expect((0, _som.searchNode)(root, null, "$data.Receipt.Detail")[0][_xfa_object.$text]()).toBe("Acme");
      expect((0, _som.searchNode)(root, null, "$data.Receipt.Detail[0]")[0][_xfa_object.$text]()).toBe("Acme");
      expect((0, _som.searchNode)(root, null, "$data.Receipt.Detail[1]")[0][_xfa_object.$text]()).toBe("foo");
      expect((0, _som.searchNode)(root, null, "$data.Receipt.Detail[2]")[0][_xfa_object.$text]()).toBe("bar");
    });
  });
  describe("Bind data into form", function () {
    it("should make a basic binding", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"A\">\n      <subform name=\"B\">\n        <field name=\"C\">\n        </field>\n        <field name=\"D\">\n        </field>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <A>\n        <C>xyz</C>\n      </A>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "A.B.C.value.text")[0][_xfa_object.$dump]().$content).toBe("xyz");
    });
    it("should make a basic binding and create a non-existing node", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"A\" mergeMode=\"matchTemplate\">\n      <subform name=\"B\">\n        <field name=\"C\">\n        </field>\n        <field name=\"D\">\n          <value>\n            <text>foobar</text>\n          </value>\n        </field>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <A>\n      </A>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var binder = new _bind.Binder(root);
      var form = binder.bind();
      var data = binder.getData();
      expect((0, _som.searchNode)(form, form, "A.B.D.value.text")[0][_xfa_object.$dump]().$content).toBe("foobar");
      var expected = {
        $name: "A",
        attributes: {},
        children: [{
          $name: "B",
          attributes: {},
          children: [{
            $name: "C",
            attributes: {},
            children: []
          }, {
            $name: "D",
            attributes: {},
            children: []
          }]
        }]
      };
      expect((0, _som.searchNode)(data, data, "A")[0][_xfa_object.$dump]()).toEqual(expected);
    });
    it("should make a basic binding and create a non-existing node with namespaceId equal to -1", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"A\">\n      <subform name=\"B\">\n        <field name=\"C\">\n        </field>\n        <field name=\"D\">\n          <value>\n            <text>foobar</text>\n          </value>\n        </field>\n      </subform>\n    </subform>\n  </template>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var binder = new _bind.Binder(root);
      var form = binder.bind();
      var data = binder.getData();
      expect((0, _som.searchNode)(form, form, "A.B.D.value.text")[0][_xfa_object.$dump]().$content).toBe("foobar");
      var expected = {
        $name: "A",
        $ns: -1,
        attributes: {},
        children: [{
          $name: "B",
          $ns: -1,
          attributes: {},
          children: [{
            $name: "C",
            $ns: -1,
            attributes: {},
            children: []
          }, {
            $name: "D",
            $ns: -1,
            attributes: {},
            children: []
          }]
        }]
      };
      expect((0, _som.searchNode)(data, data, "A")[0][_xfa_object.$dump](true)).toEqual(expected);
    });
    it("should make another basic binding", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"registration\">\n      <field name=\"first\"> </field>\n      <field name=\"last\">  </field>\n      <field name=\"apt\">  </field>\n      <field name=\"street\">  </field>\n      <field name=\"city\">  </field>\n      <field name=\"country\">  </field>\n      <field name=\"postalcode\"/>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <registration>\n        <first>Jack</first>\n        <last>Spratt</last>\n        <apt/>\n        <street>99 Candlestick Lane</street>\n        <city>London</city>\n        <country>UK</country>\n        <postalcode>SW1</postalcode>\n      </registration>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "registration.first..text")[0][_xfa_object.$dump]().$content).toBe("Jack");
      expect((0, _som.searchNode)(form, form, "registration.last..text")[0][_xfa_object.$dump]().$content).toBe("Spratt");
      expect((0, _som.searchNode)(form, form, "registration.apt..text")[0][_xfa_object.$dump]().$content).toBe(undefined);
      expect((0, _som.searchNode)(form, form, "registration.street..text")[0][_xfa_object.$dump]().$content).toBe("99 Candlestick Lane");
      expect((0, _som.searchNode)(form, form, "registration.city..text")[0][_xfa_object.$dump]().$content).toBe("London");
      expect((0, _som.searchNode)(form, form, "registration.country..text")[0][_xfa_object.$dump]().$content).toBe("UK");
      expect((0, _som.searchNode)(form, form, "registration.postalcode..text")[0][_xfa_object.$dump]().$content).toBe("SW1");
    });
    it("should make basic binding with extra subform", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"registration\">\n      <field name=\"first\"> </field>\n      <field name=\"last\">  </field>\n      <subform name=\"address\">\n        <field name=\"apt\">  </field>\n        <field name=\"street\">  </field>\n        <field name=\"city\">  </field>\n        <field name=\"country\">  </field>\n        <field name=\"postalcode\">  </field>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <registration>\n        <first>Jack</first>\n        <last>Spratt</last>\n        <apt/>\n        <street>99 Candlestick Lane</street>\n        <city>London</city>\n        <country>UK</country>\n        <postalcode>SW1</postalcode>\n      </registration>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "registration..first..text")[0][_xfa_object.$dump]().$content).toBe("Jack");
      expect((0, _som.searchNode)(form, form, "registration..last..text")[0][_xfa_object.$dump]().$content).toBe("Spratt");
      expect((0, _som.searchNode)(form, form, "registration..apt..text")[0][_xfa_object.$dump]().$content).toBe(undefined);
      expect((0, _som.searchNode)(form, form, "registration..street..text")[0][_xfa_object.$dump]().$content).toBe("99 Candlestick Lane");
      expect((0, _som.searchNode)(form, form, "registration..city..text")[0][_xfa_object.$dump]().$content).toBe("London");
      expect((0, _som.searchNode)(form, form, "registration..country..text")[0][_xfa_object.$dump]().$content).toBe("UK");
      expect((0, _som.searchNode)(form, form, "registration..postalcode..text")[0][_xfa_object.$dump]().$content).toBe("SW1");
    });
    it("should make basic binding with extra subform", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"registration\" mergeMode=\"consumeData\">\n      <subform name=\"address\">\n        <field name=\"first\"/>\n        <field name=\"last\"/>\n        <field name=\"apt\"/>\n        <field name=\"street\"/>\n        <field name=\"city\"/>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <registration>\n        <first>Jack</first>\n        <last>Spratt</last>\n        <address>\n          <apt>7</apt>\n          <street>99 Candlestick Lane</street>\n          <city>London</city>\n        </address>\n      </registration>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "registration..first..text")[0][_xfa_object.$dump]().$content).toBe("Jack");
      expect((0, _som.searchNode)(form, form, "registration..last..text")[0][_xfa_object.$dump]().$content).toBe("Spratt");
      expect((0, _som.searchNode)(form, form, "registration..apt..text")[0][_xfa_object.$dump]().$content).toBe("7");
      expect((0, _som.searchNode)(form, form, "registration..street..text")[0][_xfa_object.$dump]().$content).toBe("99 Candlestick Lane");
      expect((0, _som.searchNode)(form, form, "registration..city..text")[0][_xfa_object.$dump]().$content).toBe("London");
    });
    it("should make basic binding with same names in different parts", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"application\" mergeMode=\"consumeData\">\n      <subform name=\"sponsor\">\n        <field name=\"lastname\">  </field>\n        <!-- sponsor's last name -->\n      </subform>\n      <field name=\"lastname\">  </field>\n      <!-- applicant's last name -->\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <application>\n        <lastname>Abott</lastname>\n        <sponsor>\n          <lastname>Costello</lastname>\n        </sponsor>\n      </application>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "application.sponsor.lastname..text")[0][_xfa_object.$dump]().$content).toBe("Costello");
      expect((0, _som.searchNode)(form, form, "application.lastname..text")[0][_xfa_object.$dump]().$content).toBe("Abott");
    });
    it("should make binding and create nodes in data", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <subform name=\"A\">\n        <field name=\"a\"/>\n        <field name=\"b\"/>\n        <subform name=\"B\">\n          <field name=\"c\"/>\n          <field name=\"d\"/>\n          <subform name=\"C\">\n            <field name=\"e\"/>\n            <field name=\"f\"/>\n          </subform>\n        </subform>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <root>\n        <A>\n          <b>1</b>\n        </A>\n      </root>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var binder = new _bind.Binder(root);
      var form = binder.bind();
      var data = binder.getData();
      expect((0, _som.searchNode)(form, form, "root..b..text")[0][_xfa_object.$dump]().$content).toBe("1");
      expect((0, _som.searchNode)(data, data, "root.A.a")[0][_xfa_object.$dump]().$name).toBe("a");
      expect((0, _som.searchNode)(data, data, "root.A.B.c")[0][_xfa_object.$dump]().$name).toBe("c");
      expect((0, _som.searchNode)(data, data, "root.A.B.d")[0][_xfa_object.$dump]().$name).toBe("d");
      expect((0, _som.searchNode)(data, data, "root.A.B.C.e")[0][_xfa_object.$dump]().$name).toBe("e");
      expect((0, _som.searchNode)(data, data, "root.A.B.C.f")[0][_xfa_object.$dump]().$name).toBe("f");
    });
    it("should make binding and set properties", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"Id\">\n      <field name=\"LastName\">\n        <setProperty ref=\"$data.Main.Style.NameFont\" target=\"font.typeface\"/>\n        <setProperty ref=\"$data.Main.Style.NameSize\" target=\"font.size\"/>\n        <setProperty ref=\"$data.Main.Help.LastName\" target=\"assist.toolTip\"/>\n        <font></font>\n        <assist>\n          <toolTip>\n          </toolTip>\n        </assist>\n      </field>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <Id>\n        <LastName>foo</LastName>\n      </Id>\n      <Main>\n        <Style>\n          <NameFont>myfont</NameFont>\n          <NameSize>123.4pt</NameSize>\n        </Style>\n        <Help>\n          <LastName>Give the name!</LastName>\n        </Help>\n      </Main>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "Id.LastName..text")[0][_xfa_object.$dump]().$content).toBe("foo");
      expect((0, _som.searchNode)(form, form, "Id.LastName.font.typeface")[0][_xfa_object.$text]()).toBe("myfont");
      expect((0, _som.searchNode)(form, form, "Id.LastName.font.size")[0][_xfa_object.$text]()).toEqual(123.4);
      expect((0, _som.searchNode)(form, form, "Id.LastName.assist.toolTip")[0][_xfa_object.$dump]().$content).toBe("Give the name!");
    });
    it("should make binding and bind items", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"main\">\n      <field name=\"CardName\">\n        <bindItems ref=\"$data.main.ccs.cc[*]\" labelRef=\"uiname\" valueRef=\"token\"/>\n        <ui>\n          <choiceList/>\n        </ui>\n      </field>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <main>\n        <ccs>\n          <cc uiname=\"Visa\" token=\"VISA\"/>\n          <cc uiname=\"Mastercard\" token=\"MC\"/>\n          <cc uiname=\"American Express\" token=\"AMEX\"/>\n        </ccs>\n        <CardName>MC</CardName>\n      </main>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "subform.CardName.items[*].text[*]").map(function (x) {
        return x[_xfa_object.$text]();
      })).toEqual(["Visa", "Mastercard", "American Express", "VISA", "MC", "AMEX"]);
    });
    it("should make binding and bind items with a ref", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"main\">\n      <field name=\"CardName\">\n        <bind match=\"dataRef\" ref=\"$data.main.value\"/>\n        <bindItems ref=\"$data.main.ccs.cc[*]\" labelRef=\"uiname\" valueRef=\"token\"/>\n        <ui>\n          <choiceList/>\n        </ui>\n      </field>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <main>\n        <value>VISA</value>\n        <ccs>\n          <cc uiname=\"Visa\" token=\"VISA\"/>\n          <cc uiname=\"Mastercard\" token=\"MC\"/>\n          <cc uiname=\"American Express\" token=\"AMEX\"/>\n        </ccs>\n        <CardName>MC</CardName>\n      </main>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "subform.CardName.value.text").map(function (x) {
        return x[_xfa_object.$text]();
      })).toEqual(["VISA"]);
      expect((0, _som.searchNode)(form, form, "subform.CardName.items[*].text[*]").map(function (x) {
        return x[_xfa_object.$text]();
      })).toEqual(["Visa", "Mastercard", "American Express", "VISA", "MC", "AMEX"]);
    });
    it("should make binding with occurrences in consumeData mode", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"consumeData\">\n      <subform name=\"section\" id=\"section1\">\n        <occur min=\"0\" max=\"-1\"/>\n        <bind match=\"dataRef\" ref=\"$.section[*]\"/>\n        <field name=\"line-item\"/>\n      </subform>\n      <subform name=\"section\" id=\"section2\">\n        <occur min=\"0\" max=\"-1\"/>\n        <bind match=\"dataRef\" ref=\"$.section[*]\"/>\n        <field name=\"line-item\"/>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <root>\n        <section>\n          <line-item>item1</line-item>\n        </section>\n        <section>\n          <line-item>item2</line-item>\n        </section>\n      </root>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "root.section[*].id").map(function (x) {
        return x[_xfa_object.$text]();
      })).toEqual(["section1", "section1"]);
      expect((0, _som.searchNode)(form, form, "root.section[*].line-item..text").map(function (x) {
        return x[_xfa_object.$text]();
      })).toEqual(["item1", "item2"]);
    });
    it("should make binding with occurrences in matchTemplate mode", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <subform name=\"section\" id=\"section1\">\n        <occur min=\"0\" max=\"-1\"/>\n        <bind match=\"dataRef\" ref=\"$.section[*]\"/>\n        <field name=\"line-item\"/>\n      </subform>\n      <subform name=\"section\" id=\"section2\">\n        <occur min=\"0\" max=\"-1\"/>\n        <bind match=\"dataRef\" ref=\"$.section[*]\"/>\n        <field name=\"line-item\"/>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <root>\n        <section>\n          <line-item>item1</line-item>\n        </section>\n        <section>\n          <line-item>item2</line-item>\n        </section>\n      </root>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "root.section[*].id").map(function (x) {
        return x[_xfa_object.$text]();
      })).toEqual(["section1", "section1", "section2", "section2"]);
      expect((0, _som.searchNode)(form, form, "root.section[*].line-item..text").map(function (x) {
        return x[_xfa_object.$text]();
      })).toEqual(["item1", "item2", "item1", "item2"]);
    });
    it("should make binding and create nodes in data with some bind tag", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"root\" mergeMode=\"matchTemplate\">\n      <subform name=\"A\">\n        <occur max=\"-1\"/>\n        <bind ref=\"$.root.foo[*]\" match=\"dataRef\"/>\n      </subform>\n      <subform name=\"B\">\n        <occur max=\"2\"/>\n        <bind ref=\"$.root.bar[2]\" match=\"dataRef\"/>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <root>\n      </root>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var binder = new _bind.Binder(root);
      binder.bind();
      var data = binder.getData();
      var expected = {
        $name: "root",
        children: [{
          $name: "root",
          children: [{
            $name: "foo",
            children: [],
            attributes: {}
          }, {
            $name: "bar",
            children: [],
            attributes: {}
          }, {
            $name: "bar",
            children: [],
            attributes: {}
          }, {
            $name: "bar",
            children: [],
            attributes: {}
          }],
          attributes: {}
        }],
        attributes: {}
      };
      expect((0, _som.searchNode)(data, data, "root")[0][_xfa_object.$dump]()).toEqual(expected);
    });
    it("should make a binding with a bindItems", function () {
      var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"A\" mergeMode=\"matchTemplate\">\n      <subform name=\"B\">\n        <field name=\"C\">\n          <ui>\n            <choicelist/>\n          </ui>\n          <bindItems ref=\"xfa.datasets.foo.bar[*]\" labelRef=\"$\" valueRef=\"oof\"/>\n        </field>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <foo>\n      <bar oof=\"a\">1</bar>\n      <bar oof=\"b\">2</bar>\n      <bar oof=\"c\">3</bar>\n      <bar oof=\"d\">4</bar>\n      <bar oof=\"e\">5</bar>\n    </foo>\n    <xfa:data>\n      <A><B></B></A>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ";
      var root = new _parser.XFAParser().parse(xml);
      var form = new _bind.Binder(root).bind();
      expect((0, _som.searchNode)(form, form, "A.B.C.items[0].text[*]").map(function (x) {
        return x[_xfa_object.$dump]().$content;
      })).toEqual(["1", "2", "3", "4", "5"]);
      expect((0, _som.searchNode)(form, form, "A.B.C.items[1].text[*]").map(function (x) {
        return x[_xfa_object.$dump]().$content;
      })).toEqual(["a", "b", "c", "d", "e"]);
    });
  });
  it("should make a binding with a element in an area", function () {
    var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <template xmlns=\"http://www.xfa.org/schema/xfa-template/3.3\">\n    <subform name=\"A\" mergeMode=\"matchTemplate\">\n      <area>\n        <field name=\"B\"/>\n      </area>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <xfa:data>\n      <A><B>foobar</B></A>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n    ";
    var root = new _parser.XFAParser().parse(xml);
    var form = new _bind.Binder(root).bind();
    expect((0, _som.searchNode)(form, form, "A..B..text")[0][_xfa_object.$dump]().$content).toBe("foobar");
  });
});