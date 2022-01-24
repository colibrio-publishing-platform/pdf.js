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
exports.XFAFactory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _xfa_object = require("./xfa_object.js");

var _bind = require("./bind.js");

var _data = require("./data.js");

var _fonts = require("./fonts.js");

var _utils = require("./utils.js");

var _util = require("../../shared/util.js");

var _parser = require("./parser.js");

var _xhtml = require("./xhtml.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var XFAFactory = /*#__PURE__*/function () {
  function XFAFactory(data) {
    _classCallCheck(this, XFAFactory);

    try {
      this.root = new _parser.XFAParser().parse(XFAFactory._createDocument(data));
      var binder = new _bind.Binder(this.root);
      this.form = binder.bind();
      this.dataHandler = new _data.DataHandler(this.root, binder.getData());
      this.form[_xfa_object.$globalData].template = this.form;
    } catch (e) {
      (0, _util.warn)("XFA - an error occurred during parsing and binding: ".concat(e));
    }
  }

  _createClass(XFAFactory, [{
    key: "isValid",
    value: function isValid() {
      return this.root && this.form;
    }
  }, {
    key: "_createPagesHelper",
    value: function _createPagesHelper() {
      var iterator = this.form[_xfa_object.$toPages]();

      return new Promise(function (resolve, reject) {
        var nextIteration = function nextIteration() {
          try {
            var value = iterator.next();

            if (value.done) {
              resolve(value.value);
            } else {
              setTimeout(nextIteration, 0);
            }
          } catch (e) {
            reject(e);
          }
        };

        setTimeout(nextIteration, 0);
      });
    }
  }, {
    key: "_createPages",
    value: function () {
      var _createPages2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this._createPagesHelper();

              case 3:
                this.pages = _context.sent;
                this.dims = this.pages.children.map(function (c) {
                  var _c$attributes$style = c.attributes.style,
                      width = _c$attributes$style.width,
                      height = _c$attributes$style.height;
                  return [0, 0, parseInt(width), parseInt(height)];
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                (0, _util.warn)("XFA - an error occurred during layout: ".concat(_context.t0));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function _createPages() {
        return _createPages2.apply(this, arguments);
      }

      return _createPages;
    }()
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox(pageIndex) {
      return this.dims[pageIndex];
    }
  }, {
    key: "getNumPages",
    value: function () {
      var _getNumPages = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.pages) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this._createPages();

              case 3:
                return _context2.abrupt("return", this.dims.length);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getNumPages() {
        return _getNumPages.apply(this, arguments);
      }

      return getNumPages;
    }()
  }, {
    key: "setImages",
    value: function setImages(images) {
      this.form[_xfa_object.$globalData].images = images;
    }
  }, {
    key: "setFonts",
    value: function setFonts(fonts) {
      this.form[_xfa_object.$globalData].fontFinder = new _fonts.FontFinder(fonts);
      var missingFonts = [];

      var _iterator = _createForOfIteratorHelper(this.form[_xfa_object.$globalData].usedTypefaces),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var typeface = _step.value;
          typeface = (0, _utils.stripQuotes)(typeface);

          var font = this.form[_xfa_object.$globalData].fontFinder.find(typeface);

          if (!font) {
            missingFonts.push(typeface);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (missingFonts.length > 0) {
        return missingFonts;
      }

      return null;
    }
  }, {
    key: "appendFonts",
    value: function appendFonts(fonts, reallyMissingFonts) {
      this.form[_xfa_object.$globalData].fontFinder.add(fonts, reallyMissingFonts);
    }
  }, {
    key: "getPages",
    value: function () {
      var _getPages = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var pages;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.pages) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this._createPages();

              case 3:
                pages = this.pages;
                this.pages = null;
                return _context3.abrupt("return", pages);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPages() {
        return _getPages.apply(this, arguments);
      }

      return getPages;
    }()
  }, {
    key: "serializeData",
    value: function serializeData(storage) {
      return this.dataHandler.serialize(storage);
    }
  }], [{
    key: "_createDocument",
    value: function _createDocument(data) {
      if (!data["/xdp:xdp"]) {
        return data["xdp:xdp"];
      }

      return Object.values(data).join("");
    }
  }, {
    key: "getRichTextAsHtml",
    value: function getRichTextAsHtml(rc) {
      if (!rc || typeof rc !== "string") {
        return null;
      }

      try {
        var root = new _parser.XFAParser(_xhtml.XhtmlNamespace, true).parse(rc);

        if (!["body", "xhtml"].includes(root[_xfa_object.$nodeName])) {
          var newRoot = _xhtml.XhtmlNamespace.body({});

          newRoot[_xfa_object.$appendChild](root);

          root = newRoot;
        }

        var result = root[_xfa_object.$toHTML]();

        if (!result.success) {
          return null;
        }

        var html = result.html;
        var attributes = html.attributes;

        if (attributes) {
          if (attributes["class"]) {
            attributes["class"] = attributes["class"].filter(function (attr) {
              return !attr.startsWith("xfa");
            });
          }

          attributes.dir = "auto";
        }

        return {
          html: html,
          str: root[_xfa_object.$text]()
        };
      } catch (e) {
        (0, _util.warn)("XFA - an error occurred during parsing of rich text: ".concat(e));
      }

      return null;
    }
  }]);

  return XFAFactory;
}();

exports.XFAFactory = XFAFactory;