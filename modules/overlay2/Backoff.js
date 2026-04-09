"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// copied from discord_app/lib because including from there is broken.
var Backoff = exports["default"] = /*#__PURE__*/function () {
  /**
   * Create a backoff instance can automatically backoff retries.
   */
  function Backoff() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var jitter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    _classCallCheck(this, Backoff);
    this.min = min;
    this.max = max != null ? max : min * 10;
    this.jitter = jitter;
    this._current = min;
    this._timeoutId = null;
    this._fails = 0;
  }

  /**
   * Return the number of failures.
   */
  return _createClass(Backoff, [{
    key: "fails",
    get: function get() {
      return this._fails;
    }

    /**
     * Current backoff value in milliseconds.
     */
  }, {
    key: "current",
    get: function get() {
      return this._current;
    }

    /**
     * A callback is going to fire.
     */
  }, {
    key: "pending",
    get: function get() {
      return this._timeoutId != null;
    }

    /**
     * Clear any pending callbacks and reset the backoff.
     */
  }, {
    key: "succeed",
    value: function succeed() {
      this.cancel();
      this._fails = 0;
      this._current = this.min;
    }

    /**
     * Increment the backoff and schedule a callback if provided.
     */
  }, {
    key: "fail",
    value: function fail(callback) {
      var _this = this;
      this._fails += 1;
      var delay = this._current * 2;
      if (this.jitter) {
        delay *= Math.random();
      }
      this._current = Math.min(this._current + delay, this.max);
      if (callback != null) {
        if (this._timeoutId != null) {
          throw new Error('callback already pending');
        }
        this._timeoutId = setTimeout(function () {
          try {
            if (callback != null) {
              callback();
            }
          } finally {
            _this._timeoutId = null;
          }
        }, this._current);
      }
      return this._current;
    }

    /**
     *  Clear any pending callbacks.
     */
  }, {
    key: "cancel",
    value: function cancel() {
      if (this._timeoutId != null) {
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
      }
    }
  }]);
}();
module.exports = exports.default;
