"use strict";

const electron = require('electron');
const {
  IS_OSX
} = require('../../../common/processUtils');
const {
  SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE,
  SAFE_STORAGE_ENCRYPT_STRING,
  SAFE_STORAGE_DECRYPT_STRING
} = require('../common/constants').IPCEvents;
electron.ipcMain.on(SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE, event => {
  event.returnValue = electron.safeStorage != null && electron.safeStorage.isEncryptionAvailable();
});
electron.ipcMain.on(SAFE_STORAGE_ENCRYPT_STRING, (event, plainText) => {
  if (plainText) {
    event.returnValue = electron.safeStorage.encryptString(plainText).toString('base64');
  } else {
    event.returnValue = null;
  }
});
electron.ipcMain.on(SAFE_STORAGE_DECRYPT_STRING, (event, encrypted) => {
  if (encrypted) {
    try {
      event.returnValue = electron.safeStorage.decryptString(Buffer.from(encrypted, 'base64'));
    } catch {
      event.returnValue = null;
    }
  } else {
    event.returnValue = null;
  }
});