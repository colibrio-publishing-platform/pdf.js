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

var _data = require("../../core/xfa/data.js");

var _som = require("../../core/xfa/som.js");

var _parser = require("../../core/xfa/parser.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

describe("Data serializer", function () {
  it("should serialize data with an annotationStorage", function () {
    var xml = "\n<?xml version=\"1.0\"?>\n<xdp:xdp xmlns:xdp=\"http://ns.adobe.com/xdp/\">\n  <xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\">\n    <foo>bar</foo>\n    <xfa:data>\n      <Receipt>\n        <Page>1</Page>\n        <Detail PartNo=\"GS001\">\n          <Description>Giant Slingshot</Description>\n          <Units>1</Units>\n          <Unit_Price>250.00</Unit_Price>\n          <Total_Price>250.00</Total_Price>\n          <\xE0\xE9></\xE0\xE9>\n        </Detail>\n        <Page>2</Page>\n        <Detail PartNo=\"RRB-LB\">\n          <Description>Road Runner Bait, large bag</Description>\n          <Units>5</Units>\n          <Unit_Price>12.00</Unit_Price>\n          <Total_Price>60.00</Total_Price>\n        </Detail>\n        <Sub_Total>310.00</Sub_Total>\n        <Tax>24.80</Tax>\n        <Total_Price>334.80</Total_Price>\n      </Receipt>\n    </xfa:data>\n    <bar>foo</bar>\n  </xfa:datasets>\n</xdp:xdp>\n    ";
    var root = new _parser.XFAParser().parse(xml);
    var data = root.datasets.data;
    var dataHandler = new _data.DataHandler(root, data);
    var storage = new Map();

    for (var _i = 0, _arr = [["Receipt.Detail[0].Units", "12&3"], ["Receipt.Detail[0].Unit_Price", "456>"], ["Receipt.Detail[0].Total_Price", "789"], ["Receipt.Detail[0].àé", "1011"], ["Receipt.Detail[1].PartNo", "foo-bar😀"], ["Receipt.Detail[1].Description", "hello world"]]; _i < _arr.length; _i++) {
      var _arr$_i = _slicedToArray(_arr[_i], 2),
          path = _arr$_i[0],
          value = _arr$_i[1];

      storage.set((0, _som.searchNode)(root, data, path)[0][_xfa_object.$uid], {
        value: value
      });
    }

    var serialized = dataHandler.serialize(storage);
    var expected = "<xfa:datasets xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\"><foo>bar</foo><bar>foo</bar><xfa:data><Receipt><Page>1</Page><Detail PartNo=\"GS001\"><Description>Giant Slingshot</Description><Units>12&amp;3</Units><Unit_Price>456&gt;</Unit_Price><Total_Price>789</Total_Price><\xC3\xA0\xC3\xA9>1011</\xC3\xA0\xC3\xA9></Detail><Page>2</Page><Detail PartNo=\"foo-bar&#x1F600;\"><Description>hello world</Description><Units>5</Units><Unit_Price>12.00</Unit_Price><Total_Price>60.00</Total_Price></Detail><Sub_Total>310.00</Sub_Total><Tax>24.80</Tax><Total_Price>334.80</Total_Price></Receipt></xfa:data></xfa:datasets>";
    expect(serialized).toEqual(expected);
  });
});