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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FontInspector = function FontInspectorClosure() {
  var fonts;
  var active = false;
  var fontAttribute = "data-font-name";

  function removeSelection() {
    var divs = document.querySelectorAll("span[".concat(fontAttribute, "]"));

    var _iterator = _createForOfIteratorHelper(divs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var div = _step.value;
        div.className = "";
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  function resetSelection() {
    var divs = document.querySelectorAll("span[".concat(fontAttribute, "]"));

    var _iterator2 = _createForOfIteratorHelper(divs),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var div = _step2.value;
        div.className = "debuggerHideText";
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  function selectFont(fontName, show) {
    var divs = document.querySelectorAll("span[".concat(fontAttribute, "=").concat(fontName, "]"));

    var _iterator3 = _createForOfIteratorHelper(divs),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var div = _step3.value;
        div.className = show ? "debuggerShowText" : "debuggerHideText";
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  function textLayerClick(e) {
    if (!e.target.dataset.fontName || e.target.tagName.toUpperCase() !== "SPAN") {
      return;
    }

    var fontName = e.target.dataset.fontName;
    var selects = document.getElementsByTagName("input");

    for (var i = 0; i < selects.length; ++i) {
      var select = selects[i];

      if (select.dataset.fontName !== fontName) {
        continue;
      }

      select.checked = !select.checked;
      selectFont(fontName, select.checked);
      select.scrollIntoView();
    }
  }

  return {
    id: "FontInspector",
    name: "Font Inspector",
    panel: null,
    manager: null,
    init: function init(pdfjsLib) {
      var panel = this.panel;
      var tmp = document.createElement("button");
      tmp.addEventListener("click", resetSelection);
      tmp.textContent = "Refresh";
      panel.appendChild(tmp);
      fonts = document.createElement("div");
      panel.appendChild(fonts);
    },
    cleanup: function cleanup() {
      fonts.textContent = "";
    },
    enabled: false,

    get active() {
      return active;
    },

    set active(value) {
      active = value;

      if (active) {
        document.body.addEventListener("click", textLayerClick, true);
        resetSelection();
      } else {
        document.body.removeEventListener("click", textLayerClick, true);
        removeSelection();
      }
    },

    fontAdded: function fontAdded(fontObj, url) {
      var _this = this;

      function properties(obj, list) {
        var moreInfo = document.createElement("table");

        for (var i = 0; i < list.length; i++) {
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.textContent = list[i];
          tr.appendChild(td1);
          var td2 = document.createElement("td");
          td2.textContent = obj[list[i]].toString();
          tr.appendChild(td2);
          moreInfo.appendChild(tr);
        }

        return moreInfo;
      }

      var moreInfo = properties(fontObj, ["name", "type"]);
      var fontName = fontObj.loadedName;
      var font = document.createElement("div");
      var name = document.createElement("span");
      name.textContent = fontName;
      var download = document.createElement("a");

      if (url) {
        url = /url\(['"]?([^)"']+)/.exec(url);
        download.href = url[1];
      } else if (fontObj.data) {
        download.href = URL.createObjectURL(new Blob([fontObj.data], {
          type: fontObj.mimeType
        }));
      }

      download.textContent = "Download";
      var logIt = document.createElement("a");
      logIt.href = "";
      logIt.textContent = "Log";
      logIt.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(fontObj);
      });
      var select = document.createElement("input");
      select.setAttribute("type", "checkbox");
      select.dataset.fontName = fontName;
      select.addEventListener("click", function () {
        selectFont(fontName, select.checked);
      });
      font.appendChild(select);
      font.appendChild(name);
      font.appendChild(document.createTextNode(" "));
      font.appendChild(download);
      font.appendChild(document.createTextNode(" "));
      font.appendChild(logIt);
      font.appendChild(moreInfo);
      fonts.appendChild(font);
      setTimeout(function () {
        if (_this.active) {
          resetSelection();
        }
      }, 2000);
    }
  };
}();

var opMap;

var StepperManager = function StepperManagerClosure() {
  var steppers = [];
  var stepperDiv = null;
  var stepperControls = null;
  var stepperChooser = null;
  var breakPoints = Object.create(null);
  return {
    id: "Stepper",
    name: "Stepper",
    panel: null,
    manager: null,
    init: function init(pdfjsLib) {
      var self = this;
      stepperControls = document.createElement("div");
      stepperChooser = document.createElement("select");
      stepperChooser.addEventListener("change", function (event) {
        self.selectStepper(this.value);
      });
      stepperControls.appendChild(stepperChooser);
      stepperDiv = document.createElement("div");
      this.panel.appendChild(stepperControls);
      this.panel.appendChild(stepperDiv);

      if (sessionStorage.getItem("pdfjsBreakPoints")) {
        breakPoints = JSON.parse(sessionStorage.getItem("pdfjsBreakPoints"));
      }

      opMap = Object.create(null);

      for (var key in pdfjsLib.OPS) {
        opMap[pdfjsLib.OPS[key]] = key;
      }
    },
    cleanup: function cleanup() {
      stepperChooser.textContent = "";
      stepperDiv.textContent = "";
      steppers = [];
    },
    enabled: false,
    active: false,
    create: function create(pageIndex) {
      var debug = document.createElement("div");
      debug.id = "stepper" + pageIndex;
      debug.hidden = true;
      debug.className = "stepper";
      stepperDiv.appendChild(debug);
      var b = document.createElement("option");
      b.textContent = "Page " + (pageIndex + 1);
      b.value = pageIndex;
      stepperChooser.appendChild(b);
      var initBreakPoints = breakPoints[pageIndex] || [];
      var stepper = new Stepper(debug, pageIndex, initBreakPoints);
      steppers.push(stepper);

      if (steppers.length === 1) {
        this.selectStepper(pageIndex, false);
      }

      return stepper;
    },
    selectStepper: function selectStepper(pageIndex, selectPanel) {
      var i;
      pageIndex |= 0;

      if (selectPanel) {
        this.manager.selectPanel(this);
      }

      for (i = 0; i < steppers.length; ++i) {
        var stepper = steppers[i];
        stepper.panel.hidden = stepper.pageIndex !== pageIndex;
      }

      var options = stepperChooser.options;

      for (i = 0; i < options.length; ++i) {
        var option = options[i];
        option.selected = (option.value | 0) === pageIndex;
      }
    },
    saveBreakPoints: function saveBreakPoints(pageIndex, bps) {
      breakPoints[pageIndex] = bps;
      sessionStorage.setItem("pdfjsBreakPoints", JSON.stringify(breakPoints));
    }
  };
}();

var Stepper = function StepperClosure() {
  function c(tag, textContent) {
    var d = document.createElement(tag);

    if (textContent) {
      d.textContent = textContent;
    }

    return d;
  }

  function simplifyArgs(args) {
    if (typeof args === "string") {
      var MAX_STRING_LENGTH = 75;
      return args.length <= MAX_STRING_LENGTH ? args : args.substring(0, MAX_STRING_LENGTH) + "...";
    }

    if (_typeof(args) !== "object" || args === null) {
      return args;
    }

    if ("length" in args) {
      var MAX_ITEMS = 10,
          simpleArgs = [];
      var i, ii;

      for (i = 0, ii = Math.min(MAX_ITEMS, args.length); i < ii; i++) {
        simpleArgs.push(simplifyArgs(args[i]));
      }

      if (i < args.length) {
        simpleArgs.push("...");
      }

      return simpleArgs;
    }

    var simpleObj = {};

    for (var key in args) {
      simpleObj[key] = simplifyArgs(args[key]);
    }

    return simpleObj;
  }

  var Stepper = /*#__PURE__*/function () {
    function Stepper(panel, pageIndex, initialBreakPoints) {
      _classCallCheck(this, Stepper);

      this.panel = panel;
      this.breakPoint = 0;
      this.nextBreakPoint = null;
      this.pageIndex = pageIndex;
      this.breakPoints = initialBreakPoints;
      this.currentIdx = -1;
      this.operatorListIdx = 0;
      this.indentLevel = 0;
    }

    _createClass(Stepper, [{
      key: "init",
      value: function init(operatorList) {
        var panel = this.panel;
        var content = c("div", "c=continue, s=step");
        var table = c("table");
        content.appendChild(table);
        table.cellSpacing = 0;
        var headerRow = c("tr");
        table.appendChild(headerRow);
        headerRow.appendChild(c("th", "Break"));
        headerRow.appendChild(c("th", "Idx"));
        headerRow.appendChild(c("th", "fn"));
        headerRow.appendChild(c("th", "args"));
        panel.appendChild(content);
        this.table = table;
        this.updateOperatorList(operatorList);
      }
    }, {
      key: "updateOperatorList",
      value: function updateOperatorList(operatorList) {
        var self = this;

        function cboxOnClick() {
          var x = +this.dataset.idx;

          if (this.checked) {
            self.breakPoints.push(x);
          } else {
            self.breakPoints.splice(self.breakPoints.indexOf(x), 1);
          }

          StepperManager.saveBreakPoints(self.pageIndex, self.breakPoints);
        }

        var MAX_OPERATORS_COUNT = 15000;

        if (this.operatorListIdx > MAX_OPERATORS_COUNT) {
          return;
        }

        var chunk = document.createDocumentFragment();
        var operatorsToDisplay = Math.min(MAX_OPERATORS_COUNT, operatorList.fnArray.length);

        for (var i = this.operatorListIdx; i < operatorsToDisplay; i++) {
          var line = c("tr");
          line.className = "line";
          line.dataset.idx = i;
          chunk.appendChild(line);
          var checked = this.breakPoints.includes(i);
          var args = operatorList.argsArray[i] || [];
          var breakCell = c("td");
          var cbox = c("input");
          cbox.type = "checkbox";
          cbox.className = "points";
          cbox.checked = checked;
          cbox.dataset.idx = i;
          cbox.onclick = cboxOnClick;
          breakCell.appendChild(cbox);
          line.appendChild(breakCell);
          line.appendChild(c("td", i.toString()));
          var fn = opMap[operatorList.fnArray[i]];
          var decArgs = args;

          if (fn === "showText") {
            var glyphs = args[0];
            var charCodeRow = c("tr");
            var fontCharRow = c("tr");
            var unicodeRow = c("tr");

            for (var j = 0; j < glyphs.length; j++) {
              var glyph = glyphs[j];

              if (_typeof(glyph) === "object" && glyph !== null) {
                charCodeRow.appendChild(c("td", glyph.originalCharCode));
                fontCharRow.appendChild(c("td", glyph.fontChar));
                unicodeRow.appendChild(c("td", glyph.unicode));
              } else {
                var advanceEl = c("td", glyph);
                advanceEl.classList.add("advance");
                charCodeRow.appendChild(advanceEl);
                fontCharRow.appendChild(c("td"));
                unicodeRow.appendChild(c("td"));
              }
            }

            decArgs = c("td");
            var table = c("table");
            table.classList.add("showText");
            decArgs.appendChild(table);
            table.appendChild(charCodeRow);
            table.appendChild(fontCharRow);
            table.appendChild(unicodeRow);
          } else if (fn === "restore") {
            this.indentLevel--;
          }

          line.appendChild(c("td", " ".repeat(this.indentLevel * 2) + fn));

          if (fn === "save") {
            this.indentLevel++;
          }

          if (decArgs instanceof HTMLElement) {
            line.appendChild(decArgs);
          } else {
            line.appendChild(c("td", JSON.stringify(simplifyArgs(decArgs))));
          }
        }

        if (operatorsToDisplay < operatorList.fnArray.length) {
          var lastCell = c("td", "...");
          lastCell.colspan = 4;
          chunk.appendChild(lastCell);
        }

        this.operatorListIdx = operatorList.fnArray.length;
        this.table.appendChild(chunk);
      }
    }, {
      key: "getNextBreakPoint",
      value: function getNextBreakPoint() {
        this.breakPoints.sort(function (a, b) {
          return a - b;
        });

        for (var i = 0; i < this.breakPoints.length; i++) {
          if (this.breakPoints[i] > this.currentIdx) {
            return this.breakPoints[i];
          }
        }

        return null;
      }
    }, {
      key: "breakIt",
      value: function breakIt(idx, callback) {
        var _this2 = this;

        StepperManager.selectStepper(this.pageIndex, true);
        this.currentIdx = idx;

        var listener = function listener(evt) {
          switch (evt.keyCode) {
            case 83:
              document.removeEventListener("keydown", listener);
              _this2.nextBreakPoint = _this2.currentIdx + 1;

              _this2.goTo(-1);

              callback();
              break;

            case 67:
              document.removeEventListener("keydown", listener);
              _this2.nextBreakPoint = _this2.getNextBreakPoint();

              _this2.goTo(-1);

              callback();
              break;
          }
        };

        document.addEventListener("keydown", listener);
        this.goTo(idx);
      }
    }, {
      key: "goTo",
      value: function goTo(idx) {
        var allRows = this.panel.getElementsByClassName("line");

        for (var x = 0, xx = allRows.length; x < xx; ++x) {
          var row = allRows[x];

          if ((row.dataset.idx | 0) === idx) {
            row.style.backgroundColor = "rgb(251,250,207)";
            row.scrollIntoView();
          } else {
            row.style.backgroundColor = null;
          }
        }
      }
    }]);

    return Stepper;
  }();

  return Stepper;
}();

var Stats = function Stats() {
  var stats = [];

  function clear(node) {
    node.textContent = "";
  }

  function getStatIndex(pageNumber) {
    for (var i = 0, ii = stats.length; i < ii; ++i) {
      if (stats[i].pageNumber === pageNumber) {
        return i;
      }
    }

    return false;
  }

  return {
    id: "Stats",
    name: "Stats",
    panel: null,
    manager: null,
    init: function init(pdfjsLib) {},
    enabled: false,
    active: false,
    add: function add(pageNumber, stat) {
      if (!stat) {
        return;
      }

      var statsIndex = getStatIndex(pageNumber);

      if (statsIndex !== false) {
        stats[statsIndex].div.remove();
        stats.splice(statsIndex, 1);
      }

      var wrapper = document.createElement("div");
      wrapper.className = "stats";
      var title = document.createElement("div");
      title.className = "title";
      title.textContent = "Page: " + pageNumber;
      var statsDiv = document.createElement("div");
      statsDiv.textContent = stat.toString();
      wrapper.appendChild(title);
      wrapper.appendChild(statsDiv);
      stats.push({
        pageNumber: pageNumber,
        div: wrapper
      });
      stats.sort(function (a, b) {
        return a.pageNumber - b.pageNumber;
      });
      clear(this.panel);

      for (var i = 0, ii = stats.length; i < ii; ++i) {
        this.panel.appendChild(stats[i].div);
      }
    },
    cleanup: function cleanup() {
      stats = [];
      clear(this.panel);
    }
  };
}();

window.PDFBug = function PDFBugClosure() {
  var panelWidth = 300;
  var buttons = [];
  var activePanel = null;
  return {
    tools: [FontInspector, StepperManager, Stats],
    enable: function enable(ids) {
      var all = ids.length === 1 && ids[0] === "all";
      var tools = this.tools;

      for (var i = 0; i < tools.length; ++i) {
        var tool = tools[i];

        if (all || ids.includes(tool.id)) {
          tool.enabled = true;
        }
      }

      if (!all) {
        tools.sort(function (a, b) {
          var indexA = ids.indexOf(a.id);
          indexA = indexA < 0 ? tools.length : indexA;
          var indexB = ids.indexOf(b.id);
          indexB = indexB < 0 ? tools.length : indexB;
          return indexA - indexB;
        });
      }
    },
    init: function init(pdfjsLib, container, ids) {
      this.enable(ids);
      var ui = document.createElement("div");
      ui.id = "PDFBug";
      var controls = document.createElement("div");
      controls.setAttribute("class", "controls");
      ui.appendChild(controls);
      var panels = document.createElement("div");
      panels.setAttribute("class", "panels");
      ui.appendChild(panels);
      container.appendChild(ui);
      container.style.right = panelWidth + "px";
      var tools = this.tools;
      var self = this;

      for (var i = 0; i < tools.length; ++i) {
        var tool = tools[i];
        var panel = document.createElement("div");
        var panelButton = document.createElement("button");
        panelButton.textContent = tool.name;
        panelButton.addEventListener("click", function (selected) {
          return function (event) {
            event.preventDefault();
            self.selectPanel(selected);
          };
        }(i));
        controls.appendChild(panelButton);
        panels.appendChild(panel);
        tool.panel = panel;
        tool.manager = this;

        if (tool.enabled) {
          tool.init(pdfjsLib);
        } else {
          panel.textContent = "".concat(tool.name, " is disabled. To enable add \"").concat(tool.id, "\" to ") + "the pdfBug parameter and refresh (separate multiple by commas).";
        }

        buttons.push(panelButton);
      }

      this.selectPanel(0);
    },
    cleanup: function cleanup() {
      for (var i = 0, ii = this.tools.length; i < ii; i++) {
        if (this.tools[i].enabled) {
          this.tools[i].cleanup();
        }
      }
    },
    selectPanel: function selectPanel(index) {
      if (typeof index !== "number") {
        index = this.tools.indexOf(index);
      }

      if (index === activePanel) {
        return;
      }

      activePanel = index;
      var tools = this.tools;

      for (var j = 0; j < tools.length; ++j) {
        var isActive = j === index;
        buttons[j].classList.toggle("active", isActive);
        tools[j].active = isActive;
        tools[j].panel.hidden = !isActive;
      }
    }
  };
}();