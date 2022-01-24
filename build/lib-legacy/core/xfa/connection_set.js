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
exports.ConnectionSetNamespace = void 0;

var _namespaces = require("./namespaces.js");

var _xfa_object = require("./xfa_object.js");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CONNECTION_SET_NS_ID = _namespaces.NamespaceIds.connectionSet.id;

var ConnectionSet = /*#__PURE__*/function (_XFAObject) {
  _inherits(ConnectionSet, _XFAObject);

  var _super = _createSuper(ConnectionSet);

  function ConnectionSet(attributes) {
    var _this;

    _classCallCheck(this, ConnectionSet);

    _this = _super.call(this, CONNECTION_SET_NS_ID, "connectionSet", true);
    _this.wsdlConnection = new _xfa_object.XFAObjectArray();
    _this.xmlConnection = new _xfa_object.XFAObjectArray();
    _this.xsdConnection = new _xfa_object.XFAObjectArray();
    return _this;
  }

  return ConnectionSet;
}(_xfa_object.XFAObject);

var EffectiveInputPolicy = /*#__PURE__*/function (_XFAObject2) {
  _inherits(EffectiveInputPolicy, _XFAObject2);

  var _super2 = _createSuper(EffectiveInputPolicy);

  function EffectiveInputPolicy(attributes) {
    var _this2;

    _classCallCheck(this, EffectiveInputPolicy);

    _this2 = _super2.call(this, CONNECTION_SET_NS_ID, "effectiveInputPolicy");
    _this2.id = attributes.id || "";
    _this2.name = attributes.name || "";
    _this2.use = attributes.use || "";
    _this2.usehref = attributes.usehref || "";
    return _this2;
  }

  return EffectiveInputPolicy;
}(_xfa_object.XFAObject);

var EffectiveOutputPolicy = /*#__PURE__*/function (_XFAObject3) {
  _inherits(EffectiveOutputPolicy, _XFAObject3);

  var _super3 = _createSuper(EffectiveOutputPolicy);

  function EffectiveOutputPolicy(attributes) {
    var _this3;

    _classCallCheck(this, EffectiveOutputPolicy);

    _this3 = _super3.call(this, CONNECTION_SET_NS_ID, "effectiveOutputPolicy");
    _this3.id = attributes.id || "";
    _this3.name = attributes.name || "";
    _this3.use = attributes.use || "";
    _this3.usehref = attributes.usehref || "";
    return _this3;
  }

  return EffectiveOutputPolicy;
}(_xfa_object.XFAObject);

var Operation = /*#__PURE__*/function (_StringObject) {
  _inherits(Operation, _StringObject);

  var _super4 = _createSuper(Operation);

  function Operation(attributes) {
    var _this4;

    _classCallCheck(this, Operation);

    _this4 = _super4.call(this, CONNECTION_SET_NS_ID, "operation");
    _this4.id = attributes.id || "";
    _this4.input = attributes.input || "";
    _this4.name = attributes.name || "";
    _this4.output = attributes.output || "";
    _this4.use = attributes.use || "";
    _this4.usehref = attributes.usehref || "";
    return _this4;
  }

  return Operation;
}(_xfa_object.StringObject);

var RootElement = /*#__PURE__*/function (_StringObject2) {
  _inherits(RootElement, _StringObject2);

  var _super5 = _createSuper(RootElement);

  function RootElement(attributes) {
    var _this5;

    _classCallCheck(this, RootElement);

    _this5 = _super5.call(this, CONNECTION_SET_NS_ID, "rootElement");
    _this5.id = attributes.id || "";
    _this5.name = attributes.name || "";
    _this5.use = attributes.use || "";
    _this5.usehref = attributes.usehref || "";
    return _this5;
  }

  return RootElement;
}(_xfa_object.StringObject);

var SoapAction = /*#__PURE__*/function (_StringObject3) {
  _inherits(SoapAction, _StringObject3);

  var _super6 = _createSuper(SoapAction);

  function SoapAction(attributes) {
    var _this6;

    _classCallCheck(this, SoapAction);

    _this6 = _super6.call(this, CONNECTION_SET_NS_ID, "soapAction");
    _this6.id = attributes.id || "";
    _this6.name = attributes.name || "";
    _this6.use = attributes.use || "";
    _this6.usehref = attributes.usehref || "";
    return _this6;
  }

  return SoapAction;
}(_xfa_object.StringObject);

var SoapAddress = /*#__PURE__*/function (_StringObject4) {
  _inherits(SoapAddress, _StringObject4);

  var _super7 = _createSuper(SoapAddress);

  function SoapAddress(attributes) {
    var _this7;

    _classCallCheck(this, SoapAddress);

    _this7 = _super7.call(this, CONNECTION_SET_NS_ID, "soapAddress");
    _this7.id = attributes.id || "";
    _this7.name = attributes.name || "";
    _this7.use = attributes.use || "";
    _this7.usehref = attributes.usehref || "";
    return _this7;
  }

  return SoapAddress;
}(_xfa_object.StringObject);

var Uri = /*#__PURE__*/function (_StringObject5) {
  _inherits(Uri, _StringObject5);

  var _super8 = _createSuper(Uri);

  function Uri(attributes) {
    var _this8;

    _classCallCheck(this, Uri);

    _this8 = _super8.call(this, CONNECTION_SET_NS_ID, "uri");
    _this8.id = attributes.id || "";
    _this8.name = attributes.name || "";
    _this8.use = attributes.use || "";
    _this8.usehref = attributes.usehref || "";
    return _this8;
  }

  return Uri;
}(_xfa_object.StringObject);

var WsdlAddress = /*#__PURE__*/function (_StringObject6) {
  _inherits(WsdlAddress, _StringObject6);

  var _super9 = _createSuper(WsdlAddress);

  function WsdlAddress(attributes) {
    var _this9;

    _classCallCheck(this, WsdlAddress);

    _this9 = _super9.call(this, CONNECTION_SET_NS_ID, "wsdlAddress");
    _this9.id = attributes.id || "";
    _this9.name = attributes.name || "";
    _this9.use = attributes.use || "";
    _this9.usehref = attributes.usehref || "";
    return _this9;
  }

  return WsdlAddress;
}(_xfa_object.StringObject);

var WsdlConnection = /*#__PURE__*/function (_XFAObject4) {
  _inherits(WsdlConnection, _XFAObject4);

  var _super10 = _createSuper(WsdlConnection);

  function WsdlConnection(attributes) {
    var _this10;

    _classCallCheck(this, WsdlConnection);

    _this10 = _super10.call(this, CONNECTION_SET_NS_ID, "wsdlConnection", true);
    _this10.dataDescription = attributes.dataDescription || "";
    _this10.name = attributes.name || "";
    _this10.effectiveInputPolicy = null;
    _this10.effectiveOutputPolicy = null;
    _this10.operation = null;
    _this10.soapAction = null;
    _this10.soapAddress = null;
    _this10.wsdlAddress = null;
    return _this10;
  }

  return WsdlConnection;
}(_xfa_object.XFAObject);

var XmlConnection = /*#__PURE__*/function (_XFAObject5) {
  _inherits(XmlConnection, _XFAObject5);

  var _super11 = _createSuper(XmlConnection);

  function XmlConnection(attributes) {
    var _this11;

    _classCallCheck(this, XmlConnection);

    _this11 = _super11.call(this, CONNECTION_SET_NS_ID, "xmlConnection", true);
    _this11.dataDescription = attributes.dataDescription || "";
    _this11.name = attributes.name || "";
    _this11.uri = null;
    return _this11;
  }

  return XmlConnection;
}(_xfa_object.XFAObject);

var XsdConnection = /*#__PURE__*/function (_XFAObject6) {
  _inherits(XsdConnection, _XFAObject6);

  var _super12 = _createSuper(XsdConnection);

  function XsdConnection(attributes) {
    var _this12;

    _classCallCheck(this, XsdConnection);

    _this12 = _super12.call(this, CONNECTION_SET_NS_ID, "xsdConnection", true);
    _this12.dataDescription = attributes.dataDescription || "";
    _this12.name = attributes.name || "";
    _this12.rootElement = null;
    _this12.uri = null;
    return _this12;
  }

  return XsdConnection;
}(_xfa_object.XFAObject);

var ConnectionSetNamespace = /*#__PURE__*/function () {
  function ConnectionSetNamespace() {
    _classCallCheck(this, ConnectionSetNamespace);
  }

  _createClass(ConnectionSetNamespace, null, [{
    key: _namespaces.$buildXFAObject,
    value: function value(name, attributes) {
      if (ConnectionSetNamespace.hasOwnProperty(name)) {
        return ConnectionSetNamespace[name](attributes);
      }

      return undefined;
    }
  }, {
    key: "connectionSet",
    value: function connectionSet(attrs) {
      return new ConnectionSet(attrs);
    }
  }, {
    key: "effectiveInputPolicy",
    value: function effectiveInputPolicy(attrs) {
      return new EffectiveInputPolicy(attrs);
    }
  }, {
    key: "effectiveOutputPolicy",
    value: function effectiveOutputPolicy(attrs) {
      return new EffectiveOutputPolicy(attrs);
    }
  }, {
    key: "operation",
    value: function operation(attrs) {
      return new Operation(attrs);
    }
  }, {
    key: "rootElement",
    value: function rootElement(attrs) {
      return new RootElement(attrs);
    }
  }, {
    key: "soapAction",
    value: function soapAction(attrs) {
      return new SoapAction(attrs);
    }
  }, {
    key: "soapAddress",
    value: function soapAddress(attrs) {
      return new SoapAddress(attrs);
    }
  }, {
    key: "uri",
    value: function uri(attrs) {
      return new Uri(attrs);
    }
  }, {
    key: "wsdlAddress",
    value: function wsdlAddress(attrs) {
      return new WsdlAddress(attrs);
    }
  }, {
    key: "wsdlConnection",
    value: function wsdlConnection(attrs) {
      return new WsdlConnection(attrs);
    }
  }, {
    key: "xmlConnection",
    value: function xmlConnection(attrs) {
      return new XmlConnection(attrs);
    }
  }, {
    key: "xsdConnection",
    value: function xsdConnection(attrs) {
      return new XsdConnection(attrs);
    }
  }]);

  return ConnectionSetNamespace;
}();

exports.ConnectionSetNamespace = ConnectionSetNamespace;