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
exports.XfaLayer = void 0;

var _util = require("../shared/util.js");

var _xfa_text = require("./xfa_text.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var XfaLayer = /*#__PURE__*/function () {
  function XfaLayer() {
    _classCallCheck(this, XfaLayer);
  }

  _createClass(XfaLayer, null, [{
    key: "setupStorage",
    value: function setupStorage(html, id, element, storage, intent) {
      var storedData = storage.getValue(id, {
        value: null
      });

      switch (element.name) {
        case "textarea":
          if (storedData.value !== null) {
            html.textContent = storedData.value;
          }

          if (intent === "print") {
            break;
          }

          html.addEventListener("input", function (event) {
            storage.setValue(id, {
              value: event.target.value
            });
          });
          break;

        case "input":
          if (element.attributes.type === "radio" || element.attributes.type === "checkbox") {
            if (storedData.value === element.attributes.xfaOn) {
              html.setAttribute("checked", true);
            } else if (storedData.value === element.attributes.xfaOff) {
              html.removeAttribute("checked");
            }

            if (intent === "print") {
              break;
            }

            html.addEventListener("change", function (event) {
              storage.setValue(id, {
                value: event.target.checked ? event.target.getAttribute("xfaOn") : event.target.getAttribute("xfaOff")
              });
            });
          } else {
            if (storedData.value !== null) {
              html.setAttribute("value", storedData.value);
            }

            if (intent === "print") {
              break;
            }

            html.addEventListener("input", function (event) {
              storage.setValue(id, {
                value: event.target.value
              });
            });
          }

          break;

        case "select":
          if (storedData.value !== null) {
            var _iterator = _createForOfIteratorHelper(element.children),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var option = _step.value;

                if (option.attributes.value === storedData.value) {
                  option.attributes.selected = true;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }

          html.addEventListener("input", function (event) {
            var options = event.target.options;
            var value = options.selectedIndex === -1 ? "" : options[options.selectedIndex].value;
            storage.setValue(id, {
              value: value
            });
          });
          break;
      }
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(_ref) {
      var html = _ref.html,
          element = _ref.element,
          _ref$storage = _ref.storage,
          storage = _ref$storage === void 0 ? null : _ref$storage,
          intent = _ref.intent,
          linkService = _ref.linkService;
      var attributes = element.attributes;
      var isHTMLAnchorElement = html instanceof HTMLAnchorElement;

      if (attributes.type === "radio") {
        attributes.name = "".concat(attributes.name, "-").concat(intent);
      }

      for (var _i = 0, _Object$entries = Object.entries(attributes); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (value === null || value === undefined || key === "dataId") {
          continue;
        }

        if (key !== "style") {
          if (key === "textContent") {
            html.textContent = value;
          } else if (key === "class") {
            if (value.length) {
              html.setAttribute(key, value.join(" "));
            }
          } else {
            if (isHTMLAnchorElement && (key === "href" || key === "newWindow")) {
              continue;
            }

            html.setAttribute(key, value);
          }
        } else {
          Object.assign(html.style, value);
        }
      }

      if (isHTMLAnchorElement) {
        var _linkService$addLinkA;

        if (!linkService.addLinkAttributes) {
          (0, _util.warn)("XfaLayer.setAttribute - missing `addLinkAttributes`-method on the `linkService`-instance.");
        }

        (_linkService$addLinkA = linkService.addLinkAttributes) === null || _linkService$addLinkA === void 0 ? void 0 : _linkService$addLinkA.call(linkService, html, attributes.href, attributes.newWindow);
      }

      if (storage && attributes.dataId) {
        this.setupStorage(html, attributes.dataId, element, storage);
      }
    }
  }, {
    key: "render",
    value: function render(parameters) {
      var storage = parameters.annotationStorage;
      var linkService = parameters.linkService;
      var root = parameters.xfaHtml;
      var intent = parameters.intent || "display";
      var rootHtml = document.createElement(root.name);

      if (root.attributes) {
        this.setAttributes({
          html: rootHtml,
          element: root,
          intent: intent,
          linkService: linkService
        });
      }

      var stack = [[root, -1, rootHtml]];
      var rootDiv = parameters.div;
      rootDiv.appendChild(rootHtml);

      if (parameters.viewport) {
        var transform = "matrix(".concat(parameters.viewport.transform.join(","), ")");
        rootDiv.style.transform = transform;
      }

      if (intent !== "richText") {
        rootDiv.setAttribute("class", "xfaLayer xfaFont");
      }

      var textDivs = [];

      while (stack.length > 0) {
        var _child$attributes;

        var _stack = _slicedToArray(stack[stack.length - 1], 3),
            parent = _stack[0],
            i = _stack[1],
            html = _stack[2];

        if (i + 1 === parent.children.length) {
          stack.pop();
          continue;
        }

        var child = parent.children[++stack[stack.length - 1][1]];

        if (child === null) {
          continue;
        }

        var name = child.name;

        if (name === "#text") {
          var node = document.createTextNode(child.value);
          textDivs.push(node);
          html.appendChild(node);
          continue;
        }

        var childHtml = void 0;

        if (child !== null && child !== void 0 && (_child$attributes = child.attributes) !== null && _child$attributes !== void 0 && _child$attributes.xmlns) {
          childHtml = document.createElementNS(child.attributes.xmlns, name);
        } else {
          childHtml = document.createElement(name);
        }

        html.appendChild(childHtml);

        if (child.attributes) {
          this.setAttributes({
            html: childHtml,
            element: child,
            storage: storage,
            intent: intent,
            linkService: linkService
          });
        }

        if (child.children && child.children.length > 0) {
          stack.push([child, -1, childHtml]);
        } else if (child.value) {
          var _node = document.createTextNode(child.value);

          if (_xfa_text.XfaText.shouldBuildText(name)) {
            textDivs.push(_node);
          }

          childHtml.appendChild(_node);
        }
      }

      var _iterator2 = _createForOfIteratorHelper(rootDiv.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea")),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var el = _step2.value;
          el.setAttribute("readOnly", true);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return {
        textDivs: textDivs
      };
    }
  }, {
    key: "update",
    value: function update(parameters) {
      var transform = "matrix(".concat(parameters.viewport.transform.join(","), ")");
      parameters.div.style.transform = transform;
      parameters.div.hidden = false;
    }
  }]);

  return XfaLayer;
}();

exports.XfaLayer = XfaLayer;