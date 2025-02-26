"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getModulePath() {
  if (process.env.DISCORD_USER_DATA_DIR != null) {
    return process.env.DISCORD_USER_DATA_DIR;
  }
  return global.moduleDataPath ?? global.modulePath;
}
function getLogPath() {
  if (process.env.DISCORD_USER_DATA_DIR != null) {
    return process.env.DISCORD_USER_DATA_DIR;
  }
  return global.logPath;
}
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_PATH, async () => {
  return getModulePath();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.FILE_MANAGER_SHOW_SAVE_DIALOG, async (_, dialogOptions) => {
  return await _electron.default.dialog.showSaveDialog(dialogOptions);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.FILE_MANAGER_SHOW_OPEN_DIALOG, async (_, dialogOptions) => {
  return await _electron.default.dialog.showOpenDialog(dialogOptions);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.FILE_MANAGER_SHOW_ITEM_IN_FOLDER, async (_, path) => {
  _electron.default.shell.showItemInFolder(path);
});
_DiscordIPC.DiscordIPC.main.on(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_DATA_PATH_SYNC, event => {
  event.returnValue = getModulePath();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_LOG_PATH, async () => {
  return getLogPath();
});
_DiscordIPC.DiscordIPC.main.on(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_LOG_PATH_SYNC, event => {
  event.returnValue = getLogPath();
});