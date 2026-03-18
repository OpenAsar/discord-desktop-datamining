"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockDisplaySleep = blockDisplaySleep;
exports.cleanupDisplaySleep = cleanupDisplaySleep;
exports.unblockDisplaySleep = unblockDisplaySleep;
var electron = _interopRequireWildcard(require("electron"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  POWER_SAVE_BLOCKER_BLOCK_DISPLAY_SLEEP,
  POWER_SAVE_BLOCKER_UNBLOCK_DISPLAY_SLEEP,
  POWER_SAVE_BLOCKER_CLEANUP_DISPLAY_SLEEP
} = require('../common/constants').IPCEvents;
function blockDisplaySleep() {
  return electron.ipcRenderer.invoke(POWER_SAVE_BLOCKER_BLOCK_DISPLAY_SLEEP);
}
function unblockDisplaySleep(id) {
  return electron.ipcRenderer.invoke(POWER_SAVE_BLOCKER_UNBLOCK_DISPLAY_SLEEP, id);
}
function cleanupDisplaySleep() {
  return electron.ipcRenderer.invoke(POWER_SAVE_BLOCKER_CLEANUP_DISPLAY_SLEEP);
}