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
exports.FileSpec = void 0;

var _primitives = require("./primitives.js");

var _util = require("../shared/util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function pickPlatformItem(dict) {
  if (dict.has("UF")) {
    return dict.get("UF");
  } else if (dict.has("F")) {
    return dict.get("F");
  } else if (dict.has("Unix")) {
    return dict.get("Unix");
  } else if (dict.has("Mac")) {
    return dict.get("Mac");
  } else if (dict.has("DOS")) {
    return dict.get("DOS");
  }

  return null;
}

var FileSpec = /*#__PURE__*/function () {
  function FileSpec(root, xref) {
    _classCallCheck(this, FileSpec);

    if (!root || !(0, _primitives.isDict)(root)) {
      return;
    }

    this.xref = xref;
    this.root = root;

    if (root.has("FS")) {
      this.fs = root.get("FS");
    }

    this.description = root.has("Desc") ? (0, _util.stringToPDFString)(root.get("Desc")) : "";

    if (root.has("RF")) {
      (0, _util.warn)("Related file specifications are not supported");
    }

    this.contentAvailable = true;

    if (!root.has("EF")) {
      this.contentAvailable = false;
      (0, _util.warn)("Non-embedded file specifications are not supported");
    }
  }

  _createClass(FileSpec, [{
    key: "filename",
    get: function get() {
      if (!this._filename && this.root) {
        var filename = pickPlatformItem(this.root) || "unnamed";
        this._filename = (0, _util.stringToPDFString)(filename).replace(/\\\\/g, "\\").replace(/\\\//g, "/").replace(/\\/g, "/");
      }

      return this._filename;
    }
  }, {
    key: "content",
    get: function get() {
      if (!this.contentAvailable) {
        return null;
      }

      if (!this.contentRef && this.root) {
        this.contentRef = pickPlatformItem(this.root.get("EF"));
      }

      var content = null;

      if (this.contentRef) {
        var fileObj = this.xref.fetchIfRef(this.contentRef);

        if (fileObj && (0, _primitives.isStream)(fileObj)) {
          content = fileObj.getBytes();
        } else {
          (0, _util.warn)("Embedded file specification points to non-existing/invalid content");
        }
      } else {
        (0, _util.warn)("Embedded file specification does not have a content");
      }

      return content;
    }
  }, {
    key: "serializable",
    get: function get() {
      return {
        filename: this.filename,
        content: this.content
      };
    }
  }]);

  return FileSpec;
}();

exports.FileSpec = FileSpec;