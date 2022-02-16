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
exports.OpenTypeFileBuilder = void 0;

var _core_utils = require("./core_utils.js");

var _util = require("../shared/util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function writeInt16(dest, offset, num) {
  dest[offset] = num >> 8 & 0xff;
  dest[offset + 1] = num & 0xff;
}

function writeInt32(dest, offset, num) {
  dest[offset] = num >> 24 & 0xff;
  dest[offset + 1] = num >> 16 & 0xff;
  dest[offset + 2] = num >> 8 & 0xff;
  dest[offset + 3] = num & 0xff;
}

function writeData(dest, offset, data) {
  if (data instanceof Uint8Array) {
    dest.set(data, offset);
  } else if (typeof data === "string") {
    for (var i = 0, ii = data.length; i < ii; i++) {
      dest[offset++] = data.charCodeAt(i) & 0xff;
    }
  } else {
    for (var _i = 0, _ii = data.length; _i < _ii; _i++) {
      dest[offset++] = data[_i] & 0xff;
    }
  }
}

var OTF_HEADER_SIZE = 12;
var OTF_TABLE_ENTRY_SIZE = 16;

var OpenTypeFileBuilder = /*#__PURE__*/function () {
  function OpenTypeFileBuilder(sfnt) {
    _classCallCheck(this, OpenTypeFileBuilder);

    this.sfnt = sfnt;
    this.tables = Object.create(null);
  }

  _createClass(OpenTypeFileBuilder, [{
    key: "toArray",
    value: function toArray() {
      var sfnt = this.sfnt;
      var tables = this.tables;
      var tablesNames = Object.keys(tables);
      tablesNames.sort();
      var numTables = tablesNames.length;
      var i, j, jj, table, tableName;
      var offset = OTF_HEADER_SIZE + numTables * OTF_TABLE_ENTRY_SIZE;
      var tableOffsets = [offset];

      for (i = 0; i < numTables; i++) {
        table = tables[tablesNames[i]];
        var paddedLength = (table.length + 3 & ~3) >>> 0;
        offset += paddedLength;
        tableOffsets.push(offset);
      }

      var file = new Uint8Array(offset);

      for (i = 0; i < numTables; i++) {
        table = tables[tablesNames[i]];
        writeData(file, tableOffsets[i], table);
      }

      if (sfnt === "true") {
        sfnt = (0, _util.string32)(0x00010000);
      }

      file[0] = sfnt.charCodeAt(0) & 0xff;
      file[1] = sfnt.charCodeAt(1) & 0xff;
      file[2] = sfnt.charCodeAt(2) & 0xff;
      file[3] = sfnt.charCodeAt(3) & 0xff;
      writeInt16(file, 4, numTables);
      var searchParams = OpenTypeFileBuilder.getSearchParams(numTables, 16);
      writeInt16(file, 6, searchParams.range);
      writeInt16(file, 8, searchParams.entry);
      writeInt16(file, 10, searchParams.rangeShift);
      offset = OTF_HEADER_SIZE;

      for (i = 0; i < numTables; i++) {
        tableName = tablesNames[i];
        file[offset] = tableName.charCodeAt(0) & 0xff;
        file[offset + 1] = tableName.charCodeAt(1) & 0xff;
        file[offset + 2] = tableName.charCodeAt(2) & 0xff;
        file[offset + 3] = tableName.charCodeAt(3) & 0xff;
        var checksum = 0;

        for (j = tableOffsets[i], jj = tableOffsets[i + 1]; j < jj; j += 4) {
          var quad = (0, _core_utils.readUint32)(file, j);
          checksum = checksum + quad >>> 0;
        }

        writeInt32(file, offset + 4, checksum);
        writeInt32(file, offset + 8, tableOffsets[i]);
        writeInt32(file, offset + 12, tables[tableName].length);
        offset += OTF_TABLE_ENTRY_SIZE;
      }

      return file;
    }
  }, {
    key: "addTable",
    value: function addTable(tag, data) {
      if (tag in this.tables) {
        throw new Error("Table " + tag + " already exists");
      }

      this.tables[tag] = data;
    }
  }], [{
    key: "getSearchParams",
    value: function getSearchParams(entriesCount, entrySize) {
      var maxPower2 = 1,
          log2 = 0;

      while ((maxPower2 ^ entriesCount) > maxPower2) {
        maxPower2 <<= 1;
        log2++;
      }

      var searchRange = maxPower2 * entrySize;
      return {
        range: searchRange,
        entry: log2,
        rangeShift: entrySize * entriesCount - searchRange
      };
    }
  }]);

  return OpenTypeFileBuilder;
}();

exports.OpenTypeFileBuilder = OpenTypeFileBuilder;