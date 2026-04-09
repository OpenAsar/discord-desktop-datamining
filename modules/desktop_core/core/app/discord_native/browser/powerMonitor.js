"use strict";

var electron = _interopRequireWildcard(require("electron"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  POWER_MONITOR_RESUME,
  POWER_MONITOR_SUSPEND,
  POWER_MONITOR_LOCK_SCREEN,
  POWER_MONITOR_UNLOCK_SCREEN,
  POWER_MONITOR_GET_SYSTEM_IDLE_TIME
} = require('../common/constants').IPCEvents;
electron.ipcMain.handle(POWER_MONITOR_GET_SYSTEM_IDLE_TIME, () => {
  var _process$env$XDG_SESS;
  if (process.platform === 'linux' && ((_process$env$XDG_SESS = process.env.XDG_SESSION_TYPE) === null || _process$env$XDG_SESS === void 0 ? void 0 : _process$env$XDG_SESS.startsWith('wayland')) && process.env.WAYLAND_DISPLAY != null) {
    try {
      var _discordUtils$isWayla;
      const discordUtils = require('discord_utils');
      if ((_discordUtils$isWayla = discordUtils.isWaylandIdleAvailable) === null || _discordUtils$isWayla === void 0 ? void 0 : _discordUtils$isWayla.call(discordUtils)) {
        return Number(discordUtils.getWaylandSystemIdleTimeMs());
      }
    } catch (error) {
      console.error('Wayland idle time query failed:', error);
    }
  }
  return electron.powerMonitor.getSystemIdleTime() * 1000;
});
function sendToAllWindows(channel) {
  electron.BrowserWindow.getAllWindows().forEach(win => {
    const contents = win.webContents;
    if (contents != null) {
      contents.send(channel);
    }
  });
}
electron.powerMonitor.on('resume', () => {
  sendToAllWindows(POWER_MONITOR_RESUME);
});
electron.powerMonitor.on('suspend', () => {
  sendToAllWindows(POWER_MONITOR_SUSPEND);
});
electron.powerMonitor.on('lock-screen', () => {
  sendToAllWindows(POWER_MONITOR_LOCK_SCREEN);
});
electron.powerMonitor.on('unlock-screen', () => {
  sendToAllWindows(POWER_MONITOR_UNLOCK_SCREEN);
});