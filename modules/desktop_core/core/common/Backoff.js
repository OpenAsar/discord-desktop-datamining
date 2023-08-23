"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Backoff {
  constructor(min = 500, max = null, jitter = true) {
    this.min = min;
    this.max = max != null ? max : min * 10;
    this.jitter = jitter;
    this._current = min;
    this._timeoutId = null;
    this._fails = 0;
  }
  get fails() {
    return this._fails;
  }
  get current() {
    return this._current;
  }
  get pending() {
    return this._timeoutId != null;
  }
  succeed() {
    this.cancel();
    this._fails = 0;
    this._current = this.min;
  }
  fail(callback) {
    this._fails += 1;
    let delay = this._current * 2;
    if (this.jitter) {
      delay *= Math.random();
    }
    this._current = Math.min(this._current + delay, this.max);
    if (callback != null) {
      if (this._timeoutId != null) {
        throw new Error('callback already pending');
      }
      this._timeoutId = setTimeout(() => {
        try {
          if (callback != null) {
            callback();
          }
        } finally {
          this._timeoutId = null;
        }
      }, this._current);
    }
    return this._current;
  }
  cancel() {
    if (this._timeoutId != null) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }
}
exports.default = Backoff;
module.exports = exports.default;