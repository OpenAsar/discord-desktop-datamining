"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Analytics = void 0;
exports.getAnalytics = getAnalytics;
var _events = require("events");
class Analytics extends _events.EventEmitter {
  events = [];
  pushEvent(type, name, data) {
    const event = {
      type: type,
      name: name,
      data: data
    };
    if (this.listenerCount('event') > 0) {
      process.nextTick(() => this.emit('event', event));
    } else {
      this.events.push(event);
    }
  }
  getAndTruncateEvents() {
    const ret = this.events;
    this.events = [];
    return ret;
  }
}
exports.Analytics = Analytics;
const analyticsInstance = new Analytics();
function getAnalytics() {
  return analyticsInstance;
}