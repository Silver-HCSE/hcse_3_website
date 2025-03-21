"use strict";
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return self;
}
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}
!(function (t, e) {
  "object" ==
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) &&
  "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
      ? define(["exports"], e)
      : e(((t = t || self).lithtml = {}));
})(void 0, function (t) {
  "use strict";
  var e = new WeakMap(),
    s = function s(t) {
      return "function" == typeof t && e.has(t);
    },
    i =
      void 0 !== window.customElements &&
      void 0 !== window.customElements.polyfillWrapFlushCallback,
    n = function n(t, e) {
      var s =
        arguments.length > 2 && arguments[2] !== undefined
          ? arguments[2]
          : null;
      var i =
        arguments.length > 3 && arguments[3] !== undefined
          ? arguments[3]
          : null;
      var n = e;
      for (; n !== s; ) {
        var _e = n.nextSibling;
        t.insertBefore(n, i), (n = _e);
      }
    },
    o = function o(t, e) {
      var s =
        arguments.length > 2 && arguments[2] !== undefined
          ? arguments[2]
          : null;
      var i = e;
      for (; i !== s; ) {
        var _e2 = i.nextSibling;
        t.removeChild(i), (i = _e2);
      }
    },
    r = {},
    a = {},
    l = "{{lit-".concat(String(Math.random()).slice(2), "}}"),
    h = "\x3c!--".concat(l, "--\x3e"),
    d = new RegExp("".concat(l, "|").concat(h)),
    c = "$lit$";
  var u = function u(t, e) {
    var _this = this;
    _classCallCheck(this, u);
    (this.parts = []), (this.element = e);
    var s = -1,
      i = 0;
    var n = [],
      o = function o(e) {
        var r = e.content,
          a = document.createTreeWalker(r, 133, null, !1);
        var h = 0;
        for (; a.nextNode(); ) {
          s++;
          var _e3 = a.currentNode;
          if (1 === _e3.nodeType) {
            if (_e3.hasAttributes()) {
              var _n = _e3.attributes;
              var _o = 0;
              for (var _t = 0; _t < _n.length; _t++) {
                _n[_t].value.indexOf(l) >= 0 && _o++;
              }
              for (; _o-- > 0; ) {
                var _n2 = t.strings[i],
                  _o2 = g.exec(_n2)[2],
                  _r = _o2.toLowerCase() + c,
                  _a = _e3.getAttribute(_r).split(d);
                _this.parts.push({
                  type: "attribute",
                  index: s,
                  name: _o2,
                  strings: _a,
                }),
                  _e3.removeAttribute(_r),
                  (i += _a.length - 1);
              }
            }
            "TEMPLATE" === _e3.tagName && o(_e3);
          } else if (3 === _e3.nodeType) {
            var _t2 = _e3.data;
            if (_t2.indexOf(l) >= 0) {
              var _o3 = _e3.parentNode,
                _r2 = _t2.split(d),
                _a2 = _r2.length - 1;
              for (var _t3 = 0; _t3 < _a2; _t3++) {
                _o3.insertBefore(
                  "" === _r2[_t3] ? m() : document.createTextNode(_r2[_t3]),
                  _e3,
                ),
                  _this.parts.push({ type: "node", index: ++s });
              }
              "" === _r2[_a2]
                ? (_o3.insertBefore(m(), _e3), n.push(_e3))
                : (_e3.data = _r2[_a2]),
                (i += _a2);
            }
          } else if (8 === _e3.nodeType)
            if (_e3.data === l) {
              var _t4 = _e3.parentNode;
              (null !== _e3.previousSibling && s !== h) ||
                (s++, _t4.insertBefore(m(), _e3)),
                (h = s),
                _this.parts.push({ type: "node", index: s }),
                null === _e3.nextSibling ? (_e3.data = "") : (n.push(_e3), s--),
                i++;
            } else {
              var _t5 = -1;
              for (; -1 !== (_t5 = _e3.data.indexOf(l, _t5 + 1)); ) {
                _this.parts.push({ type: "node", index: -1 });
              }
            }
        }
      };
    o(e);
    for (var _i = 0; _i < n.length; _i++) {
      var _t6 = n[_i];
      _t6.parentNode.removeChild(_t6);
    }
  };
  var p = function p(t) {
      return -1 !== t.index;
    },
    m = function m() {
      return document.createComment("");
    },
    g =
      /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
  var v = (function () {
    function v(t, e, s) {
      _classCallCheck(this, v);
      (this._parts = []),
        (this.template = t),
        (this.processor = e),
        (this.options = s);
    }
    _createClass(v, [
      {
        key: "update",
        value: function update(t) {
          var e = 0;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;
          try {
            for (
              var _iterator = this._parts[Symbol.iterator](), _step;
              !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
              _iteratorNormalCompletion = true
            ) {
              var _s = _step.value;
              void 0 !== _s && _s.setValue(t[e]), e++;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;
          try {
            for (
              var _iterator2 = this._parts[Symbol.iterator](), _step2;
              !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
              _iteratorNormalCompletion2 = true
            ) {
              var _t7 = _step2.value;
              void 0 !== _t7 && _t7.commit();
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        },
      },
      {
        key: "_clone",
        value: function _clone() {
          var _this2 = this;
          var t = i
              ? this.template.element.content.cloneNode(!0)
              : document.importNode(this.template.element.content, !0),
            e = this.template.parts;
          var s = 0,
            n = 0;
          var o = function o(t) {
            var i = document.createTreeWalker(t, 133, null, !1);
            var r = i.nextNode();
            for (; s < e.length && null !== r; ) {
              var _t8 = e[s];
              if (p(_t8)) {
                if (n === _t8.index) {
                  var _this2$_parts;
                  if ("node" === _t8.type) {
                    var _t9 = _this2.processor.handleTextExpression(
                      _this2.options,
                    );
                    _t9.insertAfterNode(r.previousSibling),
                      _this2._parts.push(_t9);
                  } else
                    (_this2$_parts = _this2._parts).push.apply(
                      _this2$_parts,
                      _toConsumableArray(
                        _this2.processor.handleAttributeExpressions(
                          r,
                          _t8.name,
                          _t8.strings,
                          _this2.options,
                        ),
                      ),
                    );
                  s++;
                } else
                  n++,
                    "TEMPLATE" === r.nodeName && o(r.content),
                    (r = i.nextNode());
              } else _this2._parts.push(void 0), s++;
            }
          };
          return (
            o(t), i && (document.adoptNode(t), customElements.upgrade(t)), t
          );
        },
      },
    ]);
    return v;
  })();
  var f = (function () {
    function f(t, e, s, i) {
      _classCallCheck(this, f);
      (this.strings = t),
        (this.values = e),
        (this.type = s),
        (this.processor = i);
    }
    _createClass(f, [
      {
        key: "getHTML",
        value: function getHTML() {
          var t = this.strings.length - 1;
          var e = "";
          for (var _s2 = 0; _s2 < t; _s2++) {
            var _t10 = this.strings[_s2],
              _i2 = g.exec(_t10);
            e += _i2
              ? _t10.substr(0, _i2.index) + _i2[1] + _i2[2] + c + _i2[3] + l
              : _t10 + h;
          }
          return e + this.strings[t];
        },
      },
      {
        key: "getTemplateElement",
        value: function getTemplateElement() {
          var t = document.createElement("template");
          return (t.innerHTML = this.getHTML()), t;
        },
      },
    ]);
    return f;
  })();
  var x = (function (_f) {
    _inherits(x, _f);
    function x() {
      _classCallCheck(this, x);
      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(x).apply(this, arguments),
      );
    }
    _createClass(x, [
      {
        key: "getHTML",
        value: function getHTML() {
          return "<svg>".concat(
            _get(_getPrototypeOf(x.prototype), "getHTML", this).call(this),
            "</svg>",
          );
        },
      },
      {
        key: "getTemplateElement",
        value: function getTemplateElement() {
          var t = _get(
              _getPrototypeOf(x.prototype),
              "getTemplateElement",
              this,
            ).call(this),
            e = t.content,
            s = e.firstChild;
          return e.removeChild(s), n(e, s.firstChild), t;
        },
      },
    ]);
    return x;
  })(f);
  var _ = function _(t) {
    return null === t || !("object" == _typeof(t) || "function" == typeof t);
  };
  var y = (function () {
    function y(t, e, s) {
      _classCallCheck(this, y);
      (this.dirty = !0),
        (this.element = t),
        (this.name = e),
        (this.strings = s),
        (this.parts = []);
      for (var _t11 = 0; _t11 < s.length - 1; _t11++) {
        this.parts[_t11] = this._createPart();
      }
    }
    _createClass(y, [
      {
        key: "_createPart",
        value: function _createPart() {
          return new N(this);
        },
      },
      {
        key: "_getValue",
        value: function _getValue() {
          var t = this.strings,
            e = t.length - 1;
          var s = "";
          for (var _i3 = 0; _i3 < e; _i3++) {
            s += t[_i3];
            var _e4 = this.parts[_i3];
            if (void 0 !== _e4) {
              var _t12 = _e4.value;
              if (
                null != _t12 &&
                (Array.isArray(_t12) ||
                  ("string" != typeof _t12 && _t12[Symbol.iterator]))
              ) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;
                try {
                  for (
                    var _iterator3 = _t12[Symbol.iterator](), _step3;
                    !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next())
                      .done);
                    _iteratorNormalCompletion3 = true
                  ) {
                    var _e5 = _step3.value;
                    s += "string" == typeof _e5 ? _e5 : String(_e5);
                  }
                } catch (err) {
                  _didIteratorError3 = true;
                  _iteratorError3 = err;
                } finally {
                  try {
                    if (
                      !_iteratorNormalCompletion3 &&
                      _iterator3.return != null
                    ) {
                      _iterator3.return();
                    }
                  } finally {
                    if (_didIteratorError3) {
                      throw _iteratorError3;
                    }
                  }
                }
              } else s += "string" == typeof _t12 ? _t12 : String(_t12);
            }
          }
          return (s += t[e]);
        },
      },
      {
        key: "commit",
        value: function commit() {
          this.dirty &&
            ((this.dirty = !1),
            this.element.setAttribute(this.name, this._getValue()));
        },
      },
    ]);
    return y;
  })();
  var N = (function () {
    function N(t) {
      _classCallCheck(this, N);
      (this.value = void 0), (this.committer = t);
    }
    _createClass(N, [
      {
        key: "setValue",
        value: function setValue(t) {
          t === r ||
            (_(t) && t === this.value) ||
            ((this.value = t), s(t) || (this.committer.dirty = !0));
        },
      },
      {
        key: "commit",
        value: function commit() {
          for (; s(this.value); ) {
            var _t13 = this.value;
            (this.value = r), _t13(this);
          }
          this.value !== r && this.committer.commit();
        },
      },
    ]);
    return N;
  })();
  var V = (function () {
    function V(t) {
      _classCallCheck(this, V);
      (this.value = void 0), (this._pendingValue = void 0), (this.options = t);
    }
    _createClass(V, [
      {
        key: "appendInto",
        value: function appendInto(t) {
          (this.startNode = t.appendChild(m())),
            (this.endNode = t.appendChild(m()));
        },
      },
      {
        key: "insertAfterNode",
        value: function insertAfterNode(t) {
          (this.startNode = t), (this.endNode = t.nextSibling);
        },
      },
      {
        key: "appendIntoPart",
        value: function appendIntoPart(t) {
          t._insert((this.startNode = m())), t._insert((this.endNode = m()));
        },
      },
      {
        key: "insertAfterPart",
        value: function insertAfterPart(t) {
          t._insert((this.startNode = m())),
            (this.endNode = t.endNode),
            (t.endNode = this.startNode);
        },
      },
      {
        key: "setValue",
        value: function setValue(t) {
          this._pendingValue = t;
        },
      },
      {
        key: "commit",
        value: function commit() {
          for (; s(this._pendingValue); ) {
            var _t14 = this._pendingValue;
            (this._pendingValue = r), _t14(this);
          }
          var t = this._pendingValue;
          t !== r &&
            (_(t)
              ? t !== this.value && this._commitText(t)
              : t instanceof f
                ? this._commitTemplateResult(t)
                : t instanceof Node
                  ? this._commitNode(t)
                  : Array.isArray(t) || t[Symbol.iterator]
                    ? this._commitIterable(t)
                    : t === a
                      ? ((this.value = a), this.clear())
                      : this._commitText(t));
        },
      },
      {
        key: "_insert",
        value: function _insert(t) {
          this.endNode.parentNode.insertBefore(t, this.endNode);
        },
      },
      {
        key: "_commitNode",
        value: function _commitNode(t) {
          this.value !== t && (this.clear(), this._insert(t), (this.value = t));
        },
      },
      {
        key: "_commitText",
        value: function _commitText(t) {
          var e = this.startNode.nextSibling;
          (t = null == t ? "" : t),
            e === this.endNode.previousSibling && 3 === e.nodeType
              ? (e.data = t)
              : this._commitNode(
                  document.createTextNode("string" == typeof t ? t : String(t)),
                ),
            (this.value = t);
        },
      },
      {
        key: "_commitTemplateResult",
        value: function _commitTemplateResult(t) {
          var e = this.options.templateFactory(t);
          if (this.value instanceof v && this.value.template === e)
            this.value.update(t.values);
          else {
            var _s3 = new v(e, t.processor, this.options),
              _i4 = _s3._clone();
            _s3.update(t.values), this._commitNode(_i4), (this.value = _s3);
          }
        },
      },
      {
        key: "_commitIterable",
        value: function _commitIterable(t) {
          Array.isArray(this.value) || ((this.value = []), this.clear());
          var e = this.value;
          var s,
            i = 0;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;
          try {
            for (
              var _iterator4 = t[Symbol.iterator](), _step4;
              !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
              _iteratorNormalCompletion4 = true
            ) {
              var _n3 = _step4.value;
              void 0 === (s = e[i]) &&
                ((s = new V(this.options)),
                e.push(s),
                0 === i ? s.appendIntoPart(this) : s.insertAfterPart(e[i - 1])),
                s.setValue(_n3),
                s.commit(),
                i++;
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
          i < e.length && ((e.length = i), this.clear(s && s.endNode));
        },
      },
      {
        key: "clear",
        value: function clear() {
          var t =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : this.startNode;
          o(this.startNode.parentNode, t.nextSibling, this.endNode);
        },
      },
    ]);
    return V;
  })();
  var b = (function () {
    function b(t, e, s) {
      _classCallCheck(this, b);
      if (
        ((this.value = void 0),
        (this._pendingValue = void 0),
        2 !== s.length || "" !== s[0] || "" !== s[1])
      )
        throw new Error(
          "Boolean attributes can only contain a single expression",
        );
      (this.element = t), (this.name = e), (this.strings = s);
    }
    _createClass(b, [
      {
        key: "setValue",
        value: function setValue(t) {
          this._pendingValue = t;
        },
      },
      {
        key: "commit",
        value: function commit() {
          for (; s(this._pendingValue); ) {
            var _t15 = this._pendingValue;
            (this._pendingValue = r), _t15(this);
          }
          if (this._pendingValue === r) return;
          var t = !!this._pendingValue;
          this.value !== t &&
            (t
              ? this.element.setAttribute(this.name, "")
              : this.element.removeAttribute(this.name)),
            (this.value = t),
            (this._pendingValue = r);
        },
      },
    ]);
    return b;
  })();
  var w = (function (_y) {
    _inherits(w, _y);
    function w(t, e, s) {
      var _this3;
      _classCallCheck(this, w);
      (_this3 = _possibleConstructorReturn(
        this,
        _getPrototypeOf(w).call(this, t, e, s),
      )),
        (_this3.single = 2 === s.length && "" === s[0] && "" === s[1]);
      return _this3;
    }
    _createClass(w, [
      {
        key: "_createPart",
        value: function _createPart() {
          return new T(this);
        },
      },
      {
        key: "_getValue",
        value: function _getValue() {
          return this.single
            ? this.parts[0].value
            : _get(_getPrototypeOf(w.prototype), "_getValue", this).call(this);
        },
      },
      {
        key: "commit",
        value: function commit() {
          this.dirty &&
            ((this.dirty = !1), (this.element[this.name] = this._getValue()));
        },
      },
    ]);
    return w;
  })(y);
  var T = (function (_N) {
    _inherits(T, _N);
    function T() {
      _classCallCheck(this, T);
      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(T).apply(this, arguments),
      );
    }
    return T;
  })(N);
  var E = !1;
  try {
    var _t16 = {
      get capture() {
        return (E = !0), !1;
      },
    };
    window.addEventListener("test", _t16, _t16),
      window.removeEventListener("test", _t16, _t16);
  } catch (t) {}
  var A = (function () {
    function A(t, e, s) {
      var _this4 = this;
      _classCallCheck(this, A);
      (this.value = void 0),
        (this._pendingValue = void 0),
        (this.element = t),
        (this.eventName = e),
        (this.eventContext = s),
        (this._boundHandleEvent = function (t) {
          return _this4.handleEvent(t);
        });
    }
    _createClass(A, [
      {
        key: "setValue",
        value: function setValue(t) {
          this._pendingValue = t;
        },
      },
      {
        key: "commit",
        value: function commit() {
          for (; s(this._pendingValue); ) {
            var _t17 = this._pendingValue;
            (this._pendingValue = r), _t17(this);
          }
          if (this._pendingValue === r) return;
          var t = this._pendingValue,
            e = this.value,
            i =
              null == t ||
              (null != e &&
                (t.capture !== e.capture ||
                  t.once !== e.once ||
                  t.passive !== e.passive)),
            n = null != t && (null == e || i);
          i &&
            this.element.removeEventListener(
              this.eventName,
              this._boundHandleEvent,
              this._options,
            ),
            n &&
              ((this._options = P(t)),
              this.element.addEventListener(
                this.eventName,
                this._boundHandleEvent,
                this._options,
              )),
            (this.value = t),
            (this._pendingValue = r);
        },
      },
      {
        key: "handleEvent",
        value: function handleEvent(t) {
          "function" == typeof this.value
            ? this.value.call(this.eventContext || this.element, t)
            : this.value.handleEvent(t);
        },
      },
    ]);
    return A;
  })();
  var P = function P(t) {
    return (
      t &&
      (E ? { capture: t.capture, passive: t.passive, once: t.once } : t.capture)
    );
  };
  var S = (function () {
    function S() {
      _classCallCheck(this, S);
    }
    _createClass(S, [
      {
        key: "handleAttributeExpressions",
        value: function handleAttributeExpressions(t, e, s, i) {
          var n = e[0];
          if ("." === n) {
            return new w(t, e.slice(1), s).parts;
          }
          return "@" === n
            ? [new A(t, e.slice(1), i.eventContext)]
            : "?" === n
              ? [new b(t, e.slice(1), s)]
              : new y(t, e, s).parts;
        },
      },
      {
        key: "handleTextExpression",
        value: function handleTextExpression(t) {
          return new V(t);
        },
      },
    ]);
    return S;
  })();
  var C = new S();
  function M(t) {
    var e = L.get(t.type);
    void 0 === e &&
      ((e = { stringsArray: new WeakMap(), keyString: new Map() }),
      L.set(t.type, e));
    var s = e.stringsArray.get(t.strings);
    if (void 0 !== s) return s;
    var i = t.strings.join(l);
    return (
      void 0 === (s = e.keyString.get(i)) &&
        ((s = new u(t, t.getTemplateElement())), e.keyString.set(i, s)),
      e.stringsArray.set(t.strings, s),
      s
    );
  }
  var L = new Map(),
    k = new WeakMap();
  (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.0.0");
  (t.html = function (t) {
    for (
      var _len = arguments.length,
        e = new Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      e[_key - 1] = arguments[_key];
    }
    return new f(t, e, "html", C);
  }),
    (t.svg = function (t) {
      for (
        var _len2 = arguments.length,
          e = new Array(_len2 > 1 ? _len2 - 1 : 0),
          _key2 = 1;
        _key2 < _len2;
        _key2++
      ) {
        e[_key2 - 1] = arguments[_key2];
      }
      return new x(t, e, "svg", C);
    }),
    (t.DefaultTemplateProcessor = S),
    (t.defaultTemplateProcessor = C),
    (t.directive = function (t) {
      return function () {
        var i = t.apply(void 0, arguments);
        return e.set(i, !0), i;
      };
    }),
    (t.isDirective = s),
    (t.removeNodes = o),
    (t.reparentNodes = n),
    (t.noChange = r),
    (t.nothing = a),
    (t.AttributeCommitter = y),
    (t.AttributePart = N),
    (t.BooleanAttributePart = b),
    (t.EventPart = A),
    (t.isPrimitive = _),
    (t.NodePart = V),
    (t.PropertyCommitter = w),
    (t.PropertyPart = T),
    (t.parts = k),
    (t.render = function (t, e, s) {
      var i = k.get(e);
      void 0 === i &&
        (o(e, e.firstChild),
        k.set(e, (i = new V(Object.assign({ templateFactory: M }, s)))),
        i.appendInto(e)),
        i.setValue(t),
        i.commit();
    }),
    (t.templateCaches = L),
    (t.templateFactory = M),
    (t.TemplateInstance = v),
    (t.SVGTemplateResult = x),
    (t.TemplateResult = f),
    (t.createMarker = m),
    (t.isTemplatePartActive = p),
    (t.Template = u),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
