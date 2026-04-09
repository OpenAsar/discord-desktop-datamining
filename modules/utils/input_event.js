"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapInputEventRegister = wrapInputEventRegister;
exports.wrapInputEventUnregister = wrapInputEventUnregister;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var RESTRICTED_SCAN_CODE_RANGES = {
  win32: [[65, 90]],
  darwin: [[4, 29]],
  linux: [[24, 33], [38, 46], [52, 58]]
};
var MAX_SINGLE_CHARACTER_BINDS = 8;
var singleCharacterBinds = new Set();
var isRestrictedSingleCharacterKeybind = function isRestrictedSingleCharacterKeybind(buttons) {
  if (buttons == null || buttons.length !== 1) {
    return false;
  }
  var button = buttons[0];
  if (button.length !== 2) {
    return false;
  }
  var deviceType = button[0];
  if (deviceType !== 0) {
    return false;
  }

  // eslint-disable-next-line no-unused-vars
  var scanCode = button[1];
  if (buttons.length === 1 && buttons[0].length === 2) {
    var _deviceType = buttons[0][0];
    var _scanCode = buttons[0][1];
    if (_deviceType === 0) {
      var restrictedRanges = RESTRICTED_SCAN_CODE_RANGES[window.DiscordNative.process.platform];
      var _iterator = _createForOfIteratorHelper(restrictedRanges),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var restrictedRange = _step.value;
          if (_scanCode >= restrictedRange[0] && _scanCode <= restrictedRange[1]) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  return false;
};
function wrapInputEventRegister(originalFunction) {
  return function (eventId, buttons, callback, options) {
    singleCharacterBinds["delete"](eventId);
    if (isRestrictedSingleCharacterKeybind(buttons)) {
      if (singleCharacterBinds.size >= MAX_SINGLE_CHARACTER_BINDS) {
        throw new Error('Invalid keybind');
      }
      singleCharacterBinds.add(eventId);
    }
    originalFunction(eventId, buttons, callback, options);
  };
}
function wrapInputEventUnregister(originalFunction) {
  return function (eventId) {
    singleCharacterBinds["delete"](eventId);
    originalFunction(eventId);
  };
}
