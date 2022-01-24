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
exports.GenericScripting = void 0;
exports.docPropertiesLookup = docPropertiesLookup;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _pdf = require("../pdf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function docPropertiesLookup(_x) {
  return _docPropertiesLookup.apply(this, arguments);
}

function _docPropertiesLookup() {
  _docPropertiesLookup = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(pdfDocument) {
    var url, baseUrl, _yield$pdfDocument$ge, info, metadata, contentDispositionFilename, contentLength, _yield$pdfDocument$ge2, length;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = "", baseUrl = url.split("#")[0];
            _context4.next = 3;
            return pdfDocument.getMetadata();

          case 3:
            _yield$pdfDocument$ge = _context4.sent;
            info = _yield$pdfDocument$ge.info;
            metadata = _yield$pdfDocument$ge.metadata;
            contentDispositionFilename = _yield$pdfDocument$ge.contentDispositionFilename;
            contentLength = _yield$pdfDocument$ge.contentLength;

            if (contentLength) {
              _context4.next = 14;
              break;
            }

            _context4.next = 11;
            return pdfDocument.getDownloadInfo();

          case 11:
            _yield$pdfDocument$ge2 = _context4.sent;
            length = _yield$pdfDocument$ge2.length;
            contentLength = length;

          case 14:
            return _context4.abrupt("return", _objectSpread(_objectSpread({}, info), {}, {
              baseURL: baseUrl,
              filesize: contentLength,
              filename: contentDispositionFilename || (0, _pdf.getPdfFilenameFromUrl)(url),
              metadata: metadata === null || metadata === void 0 ? void 0 : metadata.getRaw(),
              authors: metadata === null || metadata === void 0 ? void 0 : metadata.get("dc:creator"),
              numPages: pdfDocument.numPages,
              URL: url
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _docPropertiesLookup.apply(this, arguments);
}

var GenericScripting = /*#__PURE__*/function () {
  function GenericScripting(sandboxBundleSrc) {
    _classCallCheck(this, GenericScripting);

    this._ready = (0, _pdf.loadScript)(sandboxBundleSrc, true).then(function () {
      return window.pdfjsSandbox.QuickJSSandbox();
    });
  }

  _createClass(GenericScripting, [{
    key: "createSandbox",
    value: function () {
      var _createSandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var sandbox;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._ready;

              case 2:
                sandbox = _context.sent;
                sandbox.create(data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createSandbox(_x2) {
        return _createSandbox.apply(this, arguments);
      }

      return createSandbox;
    }()
  }, {
    key: "dispatchEventInSandbox",
    value: function () {
      var _dispatchEventInSandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(event) {
        var sandbox;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._ready;

              case 2:
                sandbox = _context2.sent;
                sandbox.dispatchEvent(event);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function dispatchEventInSandbox(_x3) {
        return _dispatchEventInSandbox.apply(this, arguments);
      }

      return dispatchEventInSandbox;
    }()
  }, {
    key: "destroySandbox",
    value: function () {
      var _destroySandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var sandbox;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._ready;

              case 2:
                sandbox = _context3.sent;
                sandbox.nukeSandbox();

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function destroySandbox() {
        return _destroySandbox.apply(this, arguments);
      }

      return destroySandbox;
    }()
  }]);

  return GenericScripting;
}();

exports.GenericScripting = GenericScripting;