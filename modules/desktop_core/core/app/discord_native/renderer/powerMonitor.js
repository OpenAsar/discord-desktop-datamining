"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSystemIdleTimeMs = getSystemIdleTimeMs;
exports.on = on;
exports.removeAllListeners = removeAllListeners;
var electron = _interopRequireWildcard(require("electron"));
var _events = _interopRequireDefault(require("events"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  POWER_MONITOR_RESUME,
  POWER_MONITOR_SUSPEND,
  POWER_MONITOR_LOCK_SCREEN,
  POWER_MONITOR_UNLOCK_SCREEN,
  POWER_MONITOR_GET_SYSTEM_IDLE_TIME
} = require('../common/constants').IPCEvents;
const events = new _events.default();
electron.ipcRenderer.on(POWER_MONITOR_RESUME, () => {
  events.emit('resume');
});
electron.ipcRenderer.on(POWER_MONITOR_SUSPEND, () => {
  events.emit('suspend');
});
electron.ipcRenderer.on(POWER_MONITOR_LOCK_SCREEN, () => {
  events.emit('lock-screen');
});
electron.ipcRenderer.on(POWER_MONITOR_UNLOCK_SCREEN, () => {
  events.emit('unlock-screen');
});
function on(eventName, listener) {
  events.on(eventName, listener);
  return () => events.removeListener(eventName, listener);
}
function removeAllListeners(eventName) {
  events.removeAllListeners(eventName);
}
function getSystemIdleTimeMs() {
  return electron.ipcRenderer.invoke(POWER_MONITOR_GET_SYSTEM_IDLE_TIME);
}