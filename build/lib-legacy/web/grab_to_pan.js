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
exports.GrabToPan = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var CSS_CLASS_GRAB = "grab-to-pan-grab";

var _onMouseDown = /*#__PURE__*/new WeakSet();

var _onMouseMove = /*#__PURE__*/new WeakSet();

var _endPan = /*#__PURE__*/new WeakSet();

var GrabToPan = /*#__PURE__*/function () {
  function GrabToPan(options) {
    _classCallCheck(this, GrabToPan);

    _classPrivateMethodInitSpec(this, _endPan);

    _classPrivateMethodInitSpec(this, _onMouseMove);

    _classPrivateMethodInitSpec(this, _onMouseDown);

    this.element = options.element;
    this.document = options.element.ownerDocument;

    if (typeof options.ignoreTarget === "function") {
      this.ignoreTarget = options.ignoreTarget;
    }

    this.onActiveChanged = options.onActiveChanged;
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.toggle = this.toggle.bind(this);
    this._onMouseDown = _classPrivateMethodGet(this, _onMouseDown, _onMouseDown2).bind(this);
    this._onMouseMove = _classPrivateMethodGet(this, _onMouseMove, _onMouseMove2).bind(this);
    this._endPan = _classPrivateMethodGet(this, _endPan, _endPan2).bind(this);
    var overlay = this.overlay = document.createElement("div");
    overlay.className = "grab-to-pan-grabbing";
  }

  _createClass(GrabToPan, [{
    key: "activate",
    value: function activate() {
      if (!this.active) {
        var _this$onActiveChanged;

        this.active = true;
        this.element.addEventListener("mousedown", this._onMouseDown, true);
        this.element.classList.add(CSS_CLASS_GRAB);
        (_this$onActiveChanged = this.onActiveChanged) === null || _this$onActiveChanged === void 0 ? void 0 : _this$onActiveChanged.call(this, true);
      }
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      if (this.active) {
        var _this$onActiveChanged2;

        this.active = false;
        this.element.removeEventListener("mousedown", this._onMouseDown, true);

        this._endPan();

        this.element.classList.remove(CSS_CLASS_GRAB);
        (_this$onActiveChanged2 = this.onActiveChanged) === null || _this$onActiveChanged2 === void 0 ? void 0 : _this$onActiveChanged2.call(this, false);
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.active) {
        this.deactivate();
      } else {
        this.activate();
      }
    }
  }, {
    key: "ignoreTarget",
    value: function ignoreTarget(node) {
      return node.matches("a[href], a[href] *, input, textarea, button, button *, select, option");
    }
  }]);

  return GrabToPan;
}();

exports.GrabToPan = GrabToPan;

function _onMouseDown2(event) {
  if (event.button !== 0 || this.ignoreTarget(event.target)) {
    return;
  }

  if (event.originalTarget) {
    try {
      event.originalTarget.tagName;
    } catch (e) {
      return;
    }
  }

  this.scrollLeftStart = this.element.scrollLeft;
  this.scrollTopStart = this.element.scrollTop;
  this.clientXStart = event.clientX;
  this.clientYStart = event.clientY;
  this.document.addEventListener("mousemove", this._onMouseMove, true);
  this.document.addEventListener("mouseup", this._endPan, true);
  this.element.addEventListener("scroll", this._endPan, true);
  event.preventDefault();
  event.stopPropagation();
  var focusedElement = document.activeElement;

  if (focusedElement && !focusedElement.contains(event.target)) {
    focusedElement.blur();
  }
}

function _onMouseMove2(event) {
  this.element.removeEventListener("scroll", this._endPan, true);

  if (!(event.buttons & 1)) {
    this._endPan();

    return;
  }

  var xDiff = event.clientX - this.clientXStart;
  var yDiff = event.clientY - this.clientYStart;
  var scrollTop = this.scrollTopStart - yDiff;
  var scrollLeft = this.scrollLeftStart - xDiff;

  if (this.element.scrollTo) {
    this.element.scrollTo({
      top: scrollTop,
      left: scrollLeft,
      behavior: "instant"
    });
  } else {
    this.element.scrollTop = scrollTop;
    this.element.scrollLeft = scrollLeft;
  }

  if (!this.overlay.parentNode) {
    document.body.appendChild(this.overlay);
  }
}

function _endPan2() {
  this.element.removeEventListener("scroll", this._endPan, true);
  this.document.removeEventListener("mousemove", this._onMouseMove, true);
  this.document.removeEventListener("mouseup", this._endPan, true);
  this.overlay.remove();
}