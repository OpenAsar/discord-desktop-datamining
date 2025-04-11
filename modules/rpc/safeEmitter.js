"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSafeEmitter = createSafeEmitter;
exports["default"] = void 0;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// NB: this is a limited functionality version of EventEmitter safe for passing over contextBridge

function createSafeEmitter() {
  var callbackMap = new Map();
  var addListener = function addListener(name, listener, once) {
    var listeners = callbackMap[name];
    if (listeners == null) {
      listeners = callbackMap[name] = new Set();
    }
    if (once) {
      var originalListener = listener;
      listener = function listener() {
        originalListener.apply(void 0, arguments);
        listeners["delete"](originalListener);
      };
    }
    listeners.add(listener);
  };
  var invokeListener = function invokeListener(name) {
    var listeners = callbackMap[name];
    if (listeners == null) {
      return;
    }
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var _iterator = _createForOfIteratorHelper(listeners),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var listener = _step.value;
        listener.apply(void 0, args);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  return {
    on: function on(name, callback) {
      return addListener(name, callback, false);
    },
    once: function once(name, callback) {
      return addListener(name, callback, true);
    },
    emit: function emit(name) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return invokeListener.apply(void 0, [name].concat(args));
    }
  };
}
var _default = exports["default"] = createSafeEmitter;
