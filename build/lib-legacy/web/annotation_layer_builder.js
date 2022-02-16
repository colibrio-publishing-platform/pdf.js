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
exports.AnnotationLayerBuilder = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _pdf = require("../pdf");

var _l10n_utils = require("./l10n_utils.js");

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

var AnnotationLayerBuilder = /*#__PURE__*/function () {
  function AnnotationLayerBuilder(_ref) {
    var pageDiv = _ref.pageDiv,
        pdfPage = _ref.pdfPage,
        linkService = _ref.linkService,
        downloadManager = _ref.downloadManager,
        _ref$annotationStorag = _ref.annotationStorage,
        annotationStorage = _ref$annotationStorag === void 0 ? null : _ref$annotationStorag,
        _ref$imageResourcesPa = _ref.imageResourcesPath,
        imageResourcesPath = _ref$imageResourcesPa === void 0 ? "" : _ref$imageResourcesPa,
        _ref$renderForms = _ref.renderForms,
        renderForms = _ref$renderForms === void 0 ? true : _ref$renderForms,
        _ref$l10n = _ref.l10n,
        l10n = _ref$l10n === void 0 ? _l10n_utils.NullL10n : _ref$l10n,
        _ref$enableScripting = _ref.enableScripting,
        enableScripting = _ref$enableScripting === void 0 ? false : _ref$enableScripting,
        _ref$hasJSActionsProm = _ref.hasJSActionsPromise,
        hasJSActionsPromise = _ref$hasJSActionsProm === void 0 ? null : _ref$hasJSActionsProm,
        _ref$fieldObjectsProm = _ref.fieldObjectsPromise,
        fieldObjectsPromise = _ref$fieldObjectsProm === void 0 ? null : _ref$fieldObjectsProm,
        _ref$mouseState = _ref.mouseState,
        mouseState = _ref$mouseState === void 0 ? null : _ref$mouseState,
        _ref$annotationCanvas = _ref.annotationCanvasMap,
        annotationCanvasMap = _ref$annotationCanvas === void 0 ? null : _ref$annotationCanvas;

    _classCallCheck(this, AnnotationLayerBuilder);

    this.pageDiv = pageDiv;
    this.pdfPage = pdfPage;
    this.linkService = linkService;
    this.downloadManager = downloadManager;
    this.imageResourcesPath = imageResourcesPath;
    this.renderForms = renderForms;
    this.l10n = l10n;
    this.annotationStorage = annotationStorage;
    this.enableScripting = enableScripting;
    this._hasJSActionsPromise = hasJSActionsPromise;
    this._fieldObjectsPromise = fieldObjectsPromise;
    this._mouseState = mouseState;
    this._annotationCanvasMap = annotationCanvasMap;
    this.div = null;
    this._cancelled = false;
  }

  _createClass(AnnotationLayerBuilder, [{
    key: "render",
    value: function () {
      var _render = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(viewport) {
        var intent,
            _yield$Promise$all,
            _yield$Promise$all2,
            annotations,
            _yield$Promise$all2$,
            hasJSActions,
            _yield$Promise$all2$2,
            fieldObjects,
            parameters,
            _args = arguments;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                intent = _args.length > 1 && _args[1] !== undefined ? _args[1] : "display";
                _context.next = 3;
                return Promise.all([this.pdfPage.getAnnotations({
                  intent: intent
                }), this._hasJSActionsPromise, this._fieldObjectsPromise]);

              case 3:
                _yield$Promise$all = _context.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
                annotations = _yield$Promise$all2[0];
                _yield$Promise$all2$ = _yield$Promise$all2[1];
                hasJSActions = _yield$Promise$all2$ === void 0 ? false : _yield$Promise$all2$;
                _yield$Promise$all2$2 = _yield$Promise$all2[2];
                fieldObjects = _yield$Promise$all2$2 === void 0 ? null : _yield$Promise$all2$2;

                if (!(this._cancelled || annotations.length === 0)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return");

              case 12:
                parameters = {
                  viewport: viewport.clone({
                    dontFlip: true
                  }),
                  div: this.div,
                  annotations: annotations,
                  page: this.pdfPage,
                  imageResourcesPath: this.imageResourcesPath,
                  renderForms: this.renderForms,
                  linkService: this.linkService,
                  downloadManager: this.downloadManager,
                  annotationStorage: this.annotationStorage,
                  enableScripting: this.enableScripting,
                  hasJSActions: hasJSActions,
                  fieldObjects: fieldObjects,
                  mouseState: this._mouseState,
                  annotationCanvasMap: this._annotationCanvasMap
                };

                if (this.div) {
                  _pdf.AnnotationLayer.update(parameters);
                } else {
                  this.div = document.createElement("div");
                  this.div.className = "annotationLayer";
                  this.pageDiv.appendChild(this.div);
                  parameters.div = this.div;

                  _pdf.AnnotationLayer.render(parameters);

                  this.l10n.translate(this.div);
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render(_x) {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: "cancel",
    value: function cancel() {
      this._cancelled = true;
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.div) {
        return;
      }

      this.div.hidden = true;
    }
  }]);

  return AnnotationLayerBuilder;
}();

exports.AnnotationLayerBuilder = AnnotationLayerBuilder;