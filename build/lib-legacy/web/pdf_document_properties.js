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
exports.PDFDocumentProperties = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _pdf = require("../pdf");

var _ui_utils = require("./ui_utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var DEFAULT_FIELD_CONTENT = "-";
var NON_METRIC_LOCALES = ["en-us", "en-lr", "my"];
var US_PAGE_NAMES = {
  "8.5x11": "Letter",
  "8.5x14": "Legal"
};
var METRIC_PAGE_NAMES = {
  "297x420": "A3",
  "210x297": "A4"
};

function getPageName(size, isPortrait, pageNames) {
  var width = isPortrait ? size.width : size.height;
  var height = isPortrait ? size.height : size.width;
  return pageNames["".concat(width, "x").concat(height)];
}

var PDFDocumentProperties = /*#__PURE__*/function () {
  function PDFDocumentProperties(_ref, overlayManager, eventBus, l10n) {
    var _this = this;

    var overlayName = _ref.overlayName,
        fields = _ref.fields,
        container = _ref.container,
        closeButton = _ref.closeButton;

    _classCallCheck(this, PDFDocumentProperties);

    this.overlayName = overlayName;
    this.fields = fields;
    this.container = container;
    this.overlayManager = overlayManager;
    this.l10n = l10n;

    this._reset();

    closeButton.addEventListener("click", this.close.bind(this));
    this.overlayManager.register(this.overlayName, this.container, this.close.bind(this));

    eventBus._on("pagechanging", function (evt) {
      _this._currentPageNumber = evt.pageNumber;
    });

    eventBus._on("rotationchanging", function (evt) {
      _this._pagesRotation = evt.pagesRotation;
    });

    this._isNonMetricLocale = true;
    l10n.getLanguage().then(function (locale) {
      _this._isNonMetricLocale = NON_METRIC_LOCALES.includes(locale);
    });
  }

  _createClass(PDFDocumentProperties, [{
    key: "open",
    value: function () {
      var _open = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this2 = this;

        var freezeFieldData, currentPageNumber, pagesRotation, _yield$this$pdfDocume, info, contentDispositionFilename, contentLength, _yield$Promise$all, _yield$Promise$all2, fileName, fileSize, creationDate, modificationDate, pageSize, isLinearized, _yield$this$pdfDocume2, length, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                freezeFieldData = function freezeFieldData(data) {
                  Object.defineProperty(_this2, "fieldData", {
                    value: Object.freeze(data),
                    writable: false,
                    enumerable: true,
                    configurable: true
                  });
                };

                _context.next = 3;
                return Promise.all([this.overlayManager.open(this.overlayName), this._dataAvailableCapability.promise]);

              case 3:
                currentPageNumber = this._currentPageNumber;
                pagesRotation = this._pagesRotation;

                if (!(this.fieldData && currentPageNumber === this.fieldData._currentPageNumber && pagesRotation === this.fieldData._pagesRotation)) {
                  _context.next = 8;
                  break;
                }

                this._updateUI();

                return _context.abrupt("return");

              case 8:
                _context.next = 10;
                return this.pdfDocument.getMetadata();

              case 10:
                _yield$this$pdfDocume = _context.sent;
                info = _yield$this$pdfDocume.info;
                contentDispositionFilename = _yield$this$pdfDocume.contentDispositionFilename;
                contentLength = _yield$this$pdfDocume.contentLength;
                _context.next = 16;
                return Promise.all([contentDispositionFilename || (0, _pdf.getPdfFilenameFromUrl)(this.url), this._parseFileSize(contentLength), this._parseDate(info.CreationDate), this._parseDate(info.ModDate), this.pdfDocument.getPage(currentPageNumber).then(function (pdfPage) {
                  return _this2._parsePageSize((0, _ui_utils.getPageSizeInches)(pdfPage), pagesRotation);
                }), this._parseLinearization(info.IsLinearized)]);

              case 16:
                _yield$Promise$all = _context.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 6);
                fileName = _yield$Promise$all2[0];
                fileSize = _yield$Promise$all2[1];
                creationDate = _yield$Promise$all2[2];
                modificationDate = _yield$Promise$all2[3];
                pageSize = _yield$Promise$all2[4];
                isLinearized = _yield$Promise$all2[5];
                freezeFieldData({
                  fileName: fileName,
                  fileSize: fileSize,
                  title: info.Title,
                  author: info.Author,
                  subject: info.Subject,
                  keywords: info.Keywords,
                  creationDate: creationDate,
                  modificationDate: modificationDate,
                  creator: info.Creator,
                  producer: info.Producer,
                  version: info.PDFFormatVersion,
                  pageCount: this.pdfDocument.numPages,
                  pageSize: pageSize,
                  linearized: isLinearized,
                  _currentPageNumber: currentPageNumber,
                  _pagesRotation: pagesRotation
                });

                this._updateUI();

                _context.next = 28;
                return this.pdfDocument.getDownloadInfo();

              case 28:
                _yield$this$pdfDocume2 = _context.sent;
                length = _yield$this$pdfDocume2.length;

                if (!(contentLength === length)) {
                  _context.next = 32;
                  break;
                }

                return _context.abrupt("return");

              case 32:
                data = Object.assign(Object.create(null), this.fieldData);
                _context.next = 35;
                return this._parseFileSize(length);

              case 35:
                data.fileSize = _context.sent;
                freezeFieldData(data);

                this._updateUI();

              case 38:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function open() {
        return _open.apply(this, arguments);
      }

      return open;
    }()
  }, {
    key: "close",
    value: function close() {
      this.overlayManager.close(this.overlayName);
    }
  }, {
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.pdfDocument) {
        this._reset();

        this._updateUI(true);
      }

      if (!pdfDocument) {
        return;
      }

      this.pdfDocument = pdfDocument;
      this.url = url;

      this._dataAvailableCapability.resolve();
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.pdfDocument = null;
      this.url = null;
      delete this.fieldData;
      this._dataAvailableCapability = (0, _pdf.createPromiseCapability)();
      this._currentPageNumber = 1;
      this._pagesRotation = 0;
    }
  }, {
    key: "_updateUI",
    value: function _updateUI() {
      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (reset || !this.fieldData) {
        for (var id in this.fields) {
          this.fields[id].textContent = DEFAULT_FIELD_CONTENT;
        }

        return;
      }

      if (this.overlayManager.active !== this.overlayName) {
        return;
      }

      for (var _id in this.fields) {
        var content = this.fieldData[_id];
        this.fields[_id].textContent = content || content === 0 ? content : DEFAULT_FIELD_CONTENT;
      }
    }
  }, {
    key: "_parseFileSize",
    value: function () {
      var _parseFileSize2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var fileSize,
            kb,
            mb,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fileSize = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 0;
                kb = fileSize / 1024, mb = kb / 1024;

                if (kb) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", undefined);

              case 4:
                return _context2.abrupt("return", this.l10n.get("document_properties_".concat(mb >= 1 ? "mb" : "kb"), {
                  size_mb: mb >= 1 && (+mb.toPrecision(3)).toLocaleString(),
                  size_kb: mb < 1 && (+kb.toPrecision(3)).toLocaleString(),
                  size_b: fileSize.toLocaleString()
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _parseFileSize() {
        return _parseFileSize2.apply(this, arguments);
      }

      return _parseFileSize;
    }()
  }, {
    key: "_parsePageSize",
    value: function () {
      var _parsePageSize2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(pageSizeInches, pagesRotation) {
        var isPortrait, sizeInches, sizeMillimeters, rawName, exactMillimeters, intMillimeters, _yield$Promise$all3, _yield$Promise$all4, _yield$Promise$all4$, width, height, unit, name, orientation;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (pageSizeInches) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", undefined);

              case 2:
                if (pagesRotation % 180 !== 0) {
                  pageSizeInches = {
                    width: pageSizeInches.height,
                    height: pageSizeInches.width
                  };
                }

                isPortrait = (0, _ui_utils.isPortraitOrientation)(pageSizeInches);
                sizeInches = {
                  width: Math.round(pageSizeInches.width * 100) / 100,
                  height: Math.round(pageSizeInches.height * 100) / 100
                };
                sizeMillimeters = {
                  width: Math.round(pageSizeInches.width * 25.4 * 10) / 10,
                  height: Math.round(pageSizeInches.height * 25.4 * 10) / 10
                };
                rawName = getPageName(sizeInches, isPortrait, US_PAGE_NAMES) || getPageName(sizeMillimeters, isPortrait, METRIC_PAGE_NAMES);

                if (!rawName && !(Number.isInteger(sizeMillimeters.width) && Number.isInteger(sizeMillimeters.height))) {
                  exactMillimeters = {
                    width: pageSizeInches.width * 25.4,
                    height: pageSizeInches.height * 25.4
                  };
                  intMillimeters = {
                    width: Math.round(sizeMillimeters.width),
                    height: Math.round(sizeMillimeters.height)
                  };

                  if (Math.abs(exactMillimeters.width - intMillimeters.width) < 0.1 && Math.abs(exactMillimeters.height - intMillimeters.height) < 0.1) {
                    rawName = getPageName(intMillimeters, isPortrait, METRIC_PAGE_NAMES);

                    if (rawName) {
                      sizeInches = {
                        width: Math.round(intMillimeters.width / 25.4 * 100) / 100,
                        height: Math.round(intMillimeters.height / 25.4 * 100) / 100
                      };
                      sizeMillimeters = intMillimeters;
                    }
                  }
                }

                _context3.next = 10;
                return Promise.all([this._isNonMetricLocale ? sizeInches : sizeMillimeters, this.l10n.get("document_properties_page_size_unit_".concat(this._isNonMetricLocale ? "inches" : "millimeters")), rawName && this.l10n.get("document_properties_page_size_name_".concat(rawName.toLowerCase())), this.l10n.get("document_properties_page_size_orientation_".concat(isPortrait ? "portrait" : "landscape"))]);

              case 10:
                _yield$Promise$all3 = _context3.sent;
                _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 4);
                _yield$Promise$all4$ = _yield$Promise$all4[0];
                width = _yield$Promise$all4$.width;
                height = _yield$Promise$all4$.height;
                unit = _yield$Promise$all4[1];
                name = _yield$Promise$all4[2];
                orientation = _yield$Promise$all4[3];
                return _context3.abrupt("return", this.l10n.get("document_properties_page_size_dimension_".concat(name ? "name_" : "", "string"), {
                  width: width.toLocaleString(),
                  height: height.toLocaleString(),
                  unit: unit,
                  name: name,
                  orientation: orientation
                }));

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _parsePageSize(_x, _x2) {
        return _parsePageSize2.apply(this, arguments);
      }

      return _parsePageSize;
    }()
  }, {
    key: "_parseDate",
    value: function () {
      var _parseDate2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(inputDate) {
        var dateObject;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dateObject = _pdf.PDFDateString.toDateObject(inputDate);

                if (dateObject) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", undefined);

              case 3:
                return _context4.abrupt("return", this.l10n.get("document_properties_date_string", {
                  date: dateObject.toLocaleDateString(),
                  time: dateObject.toLocaleTimeString()
                }));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _parseDate(_x3) {
        return _parseDate2.apply(this, arguments);
      }

      return _parseDate;
    }()
  }, {
    key: "_parseLinearization",
    value: function _parseLinearization(isLinearized) {
      return this.l10n.get("document_properties_linearized_".concat(isLinearized ? "yes" : "no"));
    }
  }]);

  return PDFDocumentProperties;
}();

exports.PDFDocumentProperties = PDFDocumentProperties;