"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputCaptureRegisterElement = inputCaptureRegisterElement;
exports.inputCaptureSetWatcher = inputCaptureSetWatcher;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MOUSE_BUTTON_TYPE = 1;
var LEFT_MOUSE_BUTTON_CODE = window.DiscordNative.process.platform === 'win32' ? 0 : 1;
var SEQUENCE_CAPTURE_TIMEOUT = 5000;
var MAX_SEQUENCE_LENGTH = 4;
var inputWatchAll = null;
var InputCapturer = /*#__PURE__*/function () {
  function InputCapturer(callback) {
    _classCallCheck(this, InputCapturer);
    this._timeout = null;
    this._callback = null;
    this._capturedInputSequence = [];
    this._callback = callback;
  }
  return _createClass(InputCapturer, [{
    key: "start",
    value: function start() {
      var _this = this;
      if (this.isActive()) {
        return;
      }
      this._timeout = setTimeout(function () {
        return _this.stop();
      }, SEQUENCE_CAPTURE_TIMEOUT);
      InputCapturer._activeCapturers.push(this);
      if (InputCapturer._activeCapturers.length === 1) {
        inputWatchAll(InputCapturer._globalInputHandler);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;
      InputCapturer._activeCapturers = InputCapturer._activeCapturers.filter(function (x) {
        return x !== _this2;
      });
      if (InputCapturer._activeCapturers.length === 0) {
        inputWatchAll(null);
      }
      if (this._timeout != null) {
        clearTimeout(this._timeout);
        this._timeout = null;
      }
      var inputSequence = this._capturedInputSequence.map(function (entry) {
        return [entry[0], entry[1], entry[3]];
      });
      this._capturedInputSequence = [];
      if (this._callback != null) {
        this._callback(inputSequence);
      }
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return this._timeout != null;
    }
  }, {
    key: "_handleInputEvent",
    value: function _handleInputEvent(type, state, code, deviceId) {
      if (state === 0) {
        var allEntriesReleased = true;
        var _iterator = _createForOfIteratorHelper(this._capturedInputSequence),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            if (entry[0] === type && entry[1] === code) {
              entry[2] = false;
            }
            allEntriesReleased = allEntriesReleased && entry[2] === false;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (this._capturedInputSequence.length > 0 && allEntriesReleased) {
          this.stop();
        }
      } else if (!this._capturedInputSequence.some(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 4),
          t = _ref2[0],
          c = _ref2[1],
          _s = _ref2[2],
          did = _ref2[3];
        return t === type && c === code && did === deviceId;
      })) {
        this._capturedInputSequence.push([type, code, true, deviceId]);
        if (this._capturedInputSequence.length === MAX_SEQUENCE_LENGTH) {
          this.stop();
        }
      }
    }
  }], [{
    key: "_globalInputHandler",
    value: function _globalInputHandler(type, state, code, deviceId) {
      if (type === MOUSE_BUTTON_TYPE && code === LEFT_MOUSE_BUTTON_CODE) {
        // ignore left click
        return;
      }
      var _iterator2 = _createForOfIteratorHelper(InputCapturer._activeCapturers),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var capturer = _step2.value;
          capturer._handleInputEvent(type, state, code, deviceId);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);
}();
InputCapturer._activeCapturers = [];
function inputCaptureSetWatcher(inputWatcher) {
  inputWatchAll = inputWatcher;
}
function inputCaptureRegisterElement(elementId, callback) {
  if (inputWatchAll == null) {
    throw new Error('Input capturing is missing an input watcher');
  }
  var capturer = new InputCapturer(callback);
  var registerUserInteractionHandler = window.DiscordNative.app.registerUserInteractionHandler;
  var unregisterFunctions = [registerUserInteractionHandler(elementId, 'click', function (_) {
    return capturer.start();
  }), registerUserInteractionHandler(elementId, 'focus', function (_) {
    return capturer.start();
  }), registerUserInteractionHandler(elementId, 'blur', function (_) {
    return capturer.stop();
  })];
  return function () {
    for (var _i = 0, _unregisterFunctions = unregisterFunctions; _i < _unregisterFunctions.length; _i++) {
      var unregister = _unregisterFunctions[_i];
      unregister();
    }
    capturer.stop();
  };
}
