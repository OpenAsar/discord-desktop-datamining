"use strict";

var electron = _interopRequireWildcard(require("electron"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  POWER_SAVE_BLOCKER_BLOCK_DISPLAY_SLEEP,
  POWER_SAVE_BLOCKER_UNBLOCK_DISPLAY_SLEEP,
  POWER_SAVE_BLOCKER_CLEANUP_DISPLAY_SLEEP
} = require('../common/constants').IPCEvents;
const powerSaveBlockerIds = new Set();
electron.ipcMain.handle(POWER_SAVE_BLOCKER_BLOCK_DISPLAY_SLEEP, () => {
  const newId = electron.powerSaveBlocker.start('prevent-display-sleep');
  powerSaveBlockerIds.add(newId);
  return newId;
});
electron.ipcMain.handle(POWER_SAVE_BLOCKER_UNBLOCK_DISPLAY_SLEEP, (_, id) => {
  electron.powerSaveBlocker.stop(id);
  powerSaveBlockerIds.delete(id);
});
electron.ipcMain.handle(POWER_SAVE_BLOCKER_CLEANUP_DISPLAY_SLEEP, () => {
  for (const id of powerSaveBlockerIds) {
    electron.powerSaveBlocker.stop(id);
  }
  powerSaveBlockerIds.clear();
});