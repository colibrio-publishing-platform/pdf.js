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

var _is_node = require("../../shared/is_node.js");

var _svg = require("../../display/svg.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var XLINK_NS = "http://www.w3.org/1999/xlink";

function withZlib(isZlibRequired, callback) {
  if (isZlibRequired) {
    if (!_is_node.isNodeJS) {
      throw new Error("zlib test can only be run in Node.js");
    }

    return callback();
  }

  if (!_is_node.isNodeJS) {
    return callback();
  }

  var zlib = require("zlib");

  var deflateSync = zlib.deflateSync;
  zlib.deflateSync = disabledDeflateSync;

  function disabledDeflateSync() {
    throw new Error("zlib.deflateSync is explicitly disabled for testing.");
  }

  function restoreDeflateSync() {
    if (zlib.deflateSync === disabledDeflateSync) {
      zlib.deflateSync = deflateSync;
    }
  }

  var promise = callback();
  promise.then(restoreDeflateSync, restoreDeflateSync);
  return promise;
}

describe("SVGGraphics", function () {
  var loadingTask;
  var page;
  beforeAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var doc;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)("xobject-image.pdf"));
            _context.next = 3;
            return loadingTask.promise;

          case 3:
            doc = _context.sent;
            _context.next = 6;
            return doc.getPage(1);

          case 6:
            page = _context.sent;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return loadingTask.destroy();

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  describe("paintImageXObject", function () {
    function getSVGImage() {
      var svgGfx;
      return page.getOperatorList().then(function (opList) {
        var forceDataSchema = true;
        svgGfx = new _svg.SVGGraphics(page.commonObjs, page.objs, forceDataSchema);
        return svgGfx.loadDependencies(opList);
      }).then(function () {
        var svgImg;
        var elementContainer = {
          appendChild: function appendChild(element) {
            svgImg = element;
          }
        };
        var xobjectObjId = "img_p0_1";

        if (_is_node.isNodeJS) {
          var _non_webpack_require = require("../../examples/node/domstubs.js"),
              setStubs = _non_webpack_require.setStubs;

          setStubs(global);
        }

        try {
          var imgData = svgGfx.objs.get(xobjectObjId);
          svgGfx.paintInlineImageXObject(imgData, elementContainer);
        } finally {
          if (_is_node.isNodeJS) {
            var _non_webpack_require2 = require("../../examples/node/domstubs.js"),
                unsetStubs = _non_webpack_require2.unsetStubs;

            unsetStubs(global);
          }
        }

        return svgImg;
      });
    }

    it('should fail require("zlib") unless in Node.js', function () {
      function testFunc() {
        require("zlib");
      }

      if (_is_node.isNodeJS) {
        expect(testFunc.toString()).toMatch(/\srequire\(["']zlib["']\)/);
        expect(testFunc).not.toThrow();
      } else {
        expect(testFunc).toThrow();
      }
    });
    it("should produce a reasonably small svg:image", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var svgImg, imgUrl;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!_is_node.isNodeJS) {
                pending("zlib.deflateSync is not supported in non-Node environments.");
              }

              _context3.next = 3;
              return withZlib(true, getSVGImage);

            case 3:
              svgImg = _context3.sent;
              expect(svgImg.nodeName).toBe("svg:image");
              expect(svgImg.getAttributeNS(null, "width")).toBe("200px");
              expect(svgImg.getAttributeNS(null, "height")).toBe("100px");
              imgUrl = svgImg.getAttributeNS(XLINK_NS, "href");
              expect(imgUrl).toMatch(/^data:image\/png;base64,/);
              expect(imgUrl.length).toBeLessThan(367);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it("should be able to produce a svg:image without zlib", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var svgImg, imgUrl;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return withZlib(false, getSVGImage);

            case 2:
              svgImg = _context4.sent;
              expect(svgImg.nodeName).toBe("svg:image");
              expect(svgImg.getAttributeNS(null, "width")).toBe("200px");
              expect(svgImg.getAttributeNS(null, "height")).toBe("100px");
              imgUrl = svgImg.getAttributeNS(XLINK_NS, "href");
              expect(imgUrl).toMatch(/^data:image\/png;base64,/);
              expect(imgUrl.length).toBe(80246);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
});