"use strict";

const electron = require('electron');

const {
  FILE_MANAGER_GET_MODULE_PATH,
  FILE_MANAGER_GET_MODULE_DATA_PATH_SYNC,
  FILE_MANAGER_SHOW_SAVE_DIALOG,
  FILE_MANAGER_SHOW_OPEN_DIALOG,
  FILE_MANAGER_SHOW_ITEM_IN_FOLDER
} = require('../common/constants').IPCEvents;

function getModulePath() {
  // The smoketest's need to be able to:
  //   1) store multiple running instances data separately,
  //   2) have it in a known location so it can be used as a build artifact.
  if (process.env.DISCORD_USER_DATA_DIR != null) {
    return process.env.DISCORD_USER_DATA_DIR;
  }

  return global.moduleDataPath || global.modulePath;
}

electron.ipcMain.handle(FILE_MANAGER_GET_MODULE_PATH, async _ => {
  return getModulePath();
});
electron.ipcMain.handle(FILE_MANAGER_SHOW_SAVE_DIALOG, async (_, dialogOptions) => {
  return await electron.dialog.showSaveDialog(dialogOptions);
});
electron.ipcMain.handle(FILE_MANAGER_SHOW_OPEN_DIALOG, async (_, dialogOptions) => {
  return await electron.dialog.showOpenDialog(dialogOptions);
});
electron.ipcMain.handle(FILE_MANAGER_SHOW_ITEM_IN_FOLDER, async (_, path) => {
  electron.shell.showItemInFolder(path);
});
electron.ipcMain.on(FILE_MANAGER_GET_MODULE_DATA_PATH_SYNC, event => {
  event.returnValue = getModulePath();
});