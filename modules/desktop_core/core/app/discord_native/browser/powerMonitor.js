"use strict";

const electron = require('electron');
const {
  POWER_MONITOR_RESUME,
  POWER_MONITOR_SUSPEND,
  POWER_MONITOR_LOCK_SCREEN,
  POWER_MONITOR_UNLOCK_SCREEN,
  POWER_MONITOR_GET_SYSTEM_IDLE_TIME
} = require('../common/constants').IPCEvents;
electron.ipcMain.handle(POWER_MONITOR_GET_SYSTEM_IDLE_TIME, async () => {
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