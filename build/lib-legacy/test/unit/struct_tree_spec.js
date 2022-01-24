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

var _test_utils = require("./test_utils.js");

var _api = require("../../display/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function equalTrees(rootA, rootB) {
  function walk(a, b) {
    expect(a.role).toEqual(b.role);
    expect(a.lang).toEqual(b.lang);
    expect(a.type).toEqual(b.type);
    expect("children" in a).toEqual("children" in b);

    if (!a.children) {
      return;
    }

    expect(a.children.length).toEqual(b.children.length);

    for (var i = 0; i < rootA.children.length; i++) {
      walk(a.children[i], b.children[i]);
    }
  }

  return walk(rootA, rootB);
}

describe("struct tree", function () {
  describe("getStructTree", function () {
    it("parses basic structure", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var filename, params, loadingTask, doc, page, struct;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              filename = "structure_simple.pdf";
              params = (0, _test_utils.buildGetDocumentParams)(filename);
              loadingTask = (0, _api.getDocument)(params);
              _context.next = 5;
              return loadingTask.promise;

            case 5:
              doc = _context.sent;
              _context.next = 8;
              return doc.getPage(1);

            case 8:
              page = _context.sent;
              _context.next = 11;
              return page.getStructTree();

            case 11:
              struct = _context.sent;
              equalTrees({
                role: "Root",
                children: [{
                  role: "Document",
                  lang: "en-US",
                  children: [{
                    role: "H1",
                    children: [{
                      role: "NonStruct",
                      children: [{
                        type: "content"
                      }]
                    }]
                  }, {
                    role: "P",
                    children: [{
                      role: "NonStruct",
                      children: [{
                        type: "content"
                      }]
                    }]
                  }, {
                    role: "H2",
                    children: [{
                      role: "NonStruct",
                      children: [{
                        type: "content"
                      }]
                    }]
                  }, {
                    role: "P",
                    children: [{
                      role: "NonStruct",
                      children: [{
                        type: "content"
                      }]
                    }]
                  }]
                }]
              }, struct);
              _context.next = 15;
              return loadingTask.destroy();

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it("parses structure with marked content reference", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var filename, params, loadingTask, doc, page, struct;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              filename = "issue6782.pdf";
              params = (0, _test_utils.buildGetDocumentParams)(filename);
              loadingTask = (0, _api.getDocument)(params);
              _context2.next = 5;
              return loadingTask.promise;

            case 5:
              doc = _context2.sent;
              _context2.next = 8;
              return doc.getPage(1);

            case 8:
              page = _context2.sent;
              _context2.next = 11;
              return page.getStructTree();

            case 11:
              struct = _context2.sent;
              equalTrees({
                role: "Root",
                children: [{
                  role: "Part",
                  children: [{
                    role: "P",
                    children: Array(27).fill({
                      type: "content"
                    })
                  }]
                }]
              }, struct);
              _context2.next = 15;
              return loadingTask.destroy();

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
});