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
exports.PDFAttachmentViewer = void 0;

var _pdf = require("../pdf");

var _base_tree_viewer = require("./base_tree_viewer.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDFAttachmentViewer = /*#__PURE__*/function (_BaseTreeViewer) {
  _inherits(PDFAttachmentViewer, _BaseTreeViewer);

  var _super = _createSuper(PDFAttachmentViewer);

  function PDFAttachmentViewer(options) {
    var _this;

    _classCallCheck(this, PDFAttachmentViewer);

    _this = _super.call(this, options);
    _this.downloadManager = options.downloadManager;

    _this.eventBus._on("fileattachmentannotation", _this._appendAttachment.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(PDFAttachmentViewer, [{
    key: "reset",
    value: function reset() {
      var keepRenderedCapability = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      _get(_getPrototypeOf(PDFAttachmentViewer.prototype), "reset", this).call(this);

      this._attachments = null;

      if (!keepRenderedCapability) {
        this._renderedCapability = (0, _pdf.createPromiseCapability)();
      }

      if (this._pendingDispatchEvent) {
        clearTimeout(this._pendingDispatchEvent);
      }

      this._pendingDispatchEvent = null;
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(attachmentsCount) {
      var _this2 = this;

      this._renderedCapability.resolve();

      if (this._pendingDispatchEvent) {
        clearTimeout(this._pendingDispatchEvent);
        this._pendingDispatchEvent = null;
      }

      if (attachmentsCount === 0) {
        this._pendingDispatchEvent = setTimeout(function () {
          _this2.eventBus.dispatch("attachmentsloaded", {
            source: _this2,
            attachmentsCount: 0
          });

          _this2._pendingDispatchEvent = null;
        });
        return;
      }

      this.eventBus.dispatch("attachmentsloaded", {
        source: this,
        attachmentsCount: attachmentsCount
      });
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(element, _ref) {
      var _this3 = this;

      var content = _ref.content,
          filename = _ref.filename;

      element.onclick = function () {
        _this3.downloadManager.openOrDownloadData(element, content, filename);

        return false;
      };
    }
  }, {
    key: "render",
    value: function render(_ref2) {
      var attachments = _ref2.attachments,
          _ref2$keepRenderedCap = _ref2.keepRenderedCapability,
          keepRenderedCapability = _ref2$keepRenderedCap === void 0 ? false : _ref2$keepRenderedCap;

      if (this._attachments) {
        this.reset(keepRenderedCapability);
      }

      this._attachments = attachments || null;

      if (!attachments) {
        this._dispatchEvent(0);

        return;
      }

      var names = Object.keys(attachments).sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      var fragment = document.createDocumentFragment();
      var attachmentsCount = 0;

      var _iterator = _createForOfIteratorHelper(names),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var name = _step.value;
          var item = attachments[name];
          var content = item.content,
              filename = (0, _pdf.getFilenameFromUrl)(item.filename);
          var div = document.createElement("div");
          div.className = "treeItem";
          var element = document.createElement("a");

          this._bindLink(element, {
            content: content,
            filename: filename
          });

          element.textContent = this._normalizeTextContent(filename);
          div.appendChild(element);
          fragment.appendChild(div);
          attachmentsCount++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this._finishRendering(fragment, attachmentsCount);
    }
  }, {
    key: "_appendAttachment",
    value: function _appendAttachment(_ref3) {
      var _this4 = this;

      var id = _ref3.id,
          filename = _ref3.filename,
          content = _ref3.content;
      var renderedPromise = this._renderedCapability.promise;
      renderedPromise.then(function () {
        if (renderedPromise !== _this4._renderedCapability.promise) {
          return;
        }

        var attachments = _this4._attachments;

        if (!attachments) {
          attachments = Object.create(null);
        } else {
          for (var name in attachments) {
            if (id === name) {
              return;
            }
          }
        }

        attachments[id] = {
          filename: filename,
          content: content
        };

        _this4.render({
          attachments: attachments,
          keepRenderedCapability: true
        });
      });
    }
  }]);

  return PDFAttachmentViewer;
}(_base_tree_viewer.BaseTreeViewer);

exports.PDFAttachmentViewer = PDFAttachmentViewer;