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
exports.DownloadManager = void 0;

var _pdf = require("../pdf");

var _app_options = require("./app_options.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

function _download(blobUrl, filename) {
  var a = document.createElement("a");

  if (!a.click) {
    throw new Error('DownloadManager: "a.click()" is not supported.');
  }

  a.href = blobUrl;
  a.target = "_parent";

  if ("download" in a) {
    a.download = filename;
  }

  (document.body || document.documentElement).appendChild(a);
  a.click();
  a.remove();
}

var DownloadManager = /*#__PURE__*/function () {
  function DownloadManager() {
    _classCallCheck(this, DownloadManager);

    this._openBlobUrls = new WeakMap();
  }

  _createClass(DownloadManager, [{
    key: "downloadUrl",
    value: function downloadUrl(url, filename) {
      if (!(0, _pdf.createValidAbsoluteUrl)(url, "http://example.com")) {
        console.error("downloadUrl - not a valid URL: ".concat(url));
        return;
      }

      _download(url + "#pdfjs.action=download", filename);
    }
  }, {
    key: "downloadData",
    value: function downloadData(data, filename, contentType) {
      var blobUrl = (0, _pdf.createObjectURL)(data, contentType, _app_options.compatibilityParams.disableCreateObjectURL);

      _download(blobUrl, filename);
    }
  }, {
    key: "openOrDownloadData",
    value: function openOrDownloadData(element, data, filename) {
      var isPdfData = (0, _pdf.isPdfFile)(filename);
      var contentType = isPdfData ? "application/pdf" : "";

      if (isPdfData && !_app_options.compatibilityParams.disableCreateObjectURL) {
        var blobUrl = this._openBlobUrls.get(element);

        if (!blobUrl) {
          blobUrl = URL.createObjectURL(new Blob([data], {
            type: contentType
          }));

          this._openBlobUrls.set(element, blobUrl);
        }

        var viewerUrl;
        viewerUrl = "?file=" + encodeURIComponent(blobUrl + "#" + filename);

        try {
          window.open(viewerUrl);
          return true;
        } catch (ex) {
          console.error("openOrDownloadData: ".concat(ex));
          URL.revokeObjectURL(blobUrl);

          this._openBlobUrls["delete"](element);
        }
      }

      this.downloadData(data, filename, contentType);
      return false;
    }
  }, {
    key: "download",
    value: function download(blob, url, filename) {
      var sourceEventType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "download";

      if (_app_options.compatibilityParams.disableCreateObjectURL) {
        this.downloadUrl(url, filename);
        return;
      }

      var blobUrl = URL.createObjectURL(blob);

      _download(blobUrl, filename);
    }
  }]);

  return DownloadManager;
}();

exports.DownloadManager = DownloadManager;