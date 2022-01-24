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
exports.ObjectLoader = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _primitives = require("./primitives.js");

var _core_utils = require("./core_utils.js");

var _util = require("../shared/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function mayHaveChildren(value) {
  return value instanceof _primitives.Ref || value instanceof _primitives.Dict || Array.isArray(value) || (0, _primitives.isStream)(value);
}

function addChildren(node, nodesToVisit) {
  if (node instanceof _primitives.Dict) {
    node = node.getRawValues();
  } else if ((0, _primitives.isStream)(node)) {
    node = node.dict.getRawValues();
  } else if (!Array.isArray(node)) {
    return;
  }

  var _iterator = _createForOfIteratorHelper(node),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rawValue = _step.value;

      if (mayHaveChildren(rawValue)) {
        nodesToVisit.push(rawValue);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

var ObjectLoader = /*#__PURE__*/function () {
  function ObjectLoader(dict, keys, xref) {
    _classCallCheck(this, ObjectLoader);

    this.dict = dict;
    this.keys = keys;
    this.xref = xref;
    this.refSet = null;
  }

  _createClass(ObjectLoader, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var keys, dict, nodesToVisit, i, ii, rawValue;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.xref.stream.isDataLoaded) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", undefined);

              case 2:
                keys = this.keys, dict = this.dict;
                this.refSet = new _primitives.RefSet();
                nodesToVisit = [];

                for (i = 0, ii = keys.length; i < ii; i++) {
                  rawValue = dict.getRaw(keys[i]);

                  if (rawValue !== undefined) {
                    nodesToVisit.push(rawValue);
                  }
                }

                return _context.abrupt("return", this._walk(nodesToVisit));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "_walk",
    value: function () {
      var _walk2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(nodesToVisit) {
        var nodesToRevisit, pendingRequests, currentNode, manager, baseStreams, foundMissingData, _iterator2, _step2, stream, _iterator3, _step3, node;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                nodesToRevisit = [];
                pendingRequests = [];

              case 2:
                if (!nodesToVisit.length) {
                  _context2.next = 48;
                  break;
                }

                currentNode = nodesToVisit.pop();

                if (!(currentNode instanceof _primitives.Ref)) {
                  _context2.next = 21;
                  break;
                }

                if (!this.refSet.has(currentNode)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("continue", 2);

              case 7:
                _context2.prev = 7;
                this.refSet.put(currentNode);
                currentNode = this.xref.fetch(currentNode);
                _context2.next = 21;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](7);

                if (_context2.t0 instanceof _core_utils.MissingDataException) {
                  _context2.next = 19;
                  break;
                }

                (0, _util.warn)("ObjectLoader._walk - requesting all data: \"".concat(_context2.t0, "\"."));
                this.refSet = null;
                manager = this.xref.stream.manager;
                return _context2.abrupt("return", manager.requestAllChunks());

              case 19:
                nodesToRevisit.push(currentNode);
                pendingRequests.push({
                  begin: _context2.t0.begin,
                  end: _context2.t0.end
                });

              case 21:
                if (!(0, _primitives.isStream)(currentNode)) {
                  _context2.next = 45;
                  break;
                }

                baseStreams = currentNode.getBaseStreams();

                if (!baseStreams) {
                  _context2.next = 45;
                  break;
                }

                foundMissingData = false;
                _iterator2 = _createForOfIteratorHelper(baseStreams);
                _context2.prev = 26;

                _iterator2.s();

              case 28:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 36;
                  break;
                }

                stream = _step2.value;

                if (!stream.isDataLoaded) {
                  _context2.next = 32;
                  break;
                }

                return _context2.abrupt("continue", 34);

              case 32:
                foundMissingData = true;
                pendingRequests.push({
                  begin: stream.start,
                  end: stream.end
                });

              case 34:
                _context2.next = 28;
                break;

              case 36:
                _context2.next = 41;
                break;

              case 38:
                _context2.prev = 38;
                _context2.t1 = _context2["catch"](26);

                _iterator2.e(_context2.t1);

              case 41:
                _context2.prev = 41;

                _iterator2.f();

                return _context2.finish(41);

              case 44:
                if (foundMissingData) {
                  nodesToRevisit.push(currentNode);
                }

              case 45:
                addChildren(currentNode, nodesToVisit);
                _context2.next = 2;
                break;

              case 48:
                if (!pendingRequests.length) {
                  _context2.next = 54;
                  break;
                }

                _context2.next = 51;
                return this.xref.stream.manager.requestRanges(pendingRequests);

              case 51:
                _iterator3 = _createForOfIteratorHelper(nodesToRevisit);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    node = _step3.value;

                    if (node instanceof _primitives.Ref) {
                      this.refSet.remove(node);
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

                return _context2.abrupt("return", this._walk(nodesToRevisit));

              case 54:
                this.refSet = null;
                return _context2.abrupt("return", undefined);

              case 56:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 12], [26, 38, 41, 44]]);
      }));

      function _walk(_x) {
        return _walk2.apply(this, arguments);
      }

      return _walk;
    }()
  }]);

  return ObjectLoader;
}();

exports.ObjectLoader = ObjectLoader;