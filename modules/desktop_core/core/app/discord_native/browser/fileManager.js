"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable require-await */

function getModulePath() {
  // The smoketest's need to be able to:
  //   1) store multiple running instances data separately,
  //   2) have it in a known location so it can be used as a build artifact.
  if (process.env.DISCORD_USER_DATA_DIR != null) {
    return process.env.DISCORD_USER_DATA_DIR;
  }
  return global.moduleDataPath ?? global.modulePath;
}
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_PATH, async _ => {
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
  // This is kind of a lie... we offer no promise that moduleDataPath or modulePath are set.
  event.returnValue = getModulePath();
});