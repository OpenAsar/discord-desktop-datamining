"use strict";

const electron = require('electron');
const {
  SAFE_STORAGE_DECRYPT_STRING,
  SAFE_STORAGE_ENCRYPT_STRING,
  SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE
} = require('../common/constants').IPCEvents;
function isEncryptionAvailable() {
  return electron.ipcRenderer.sendSync(SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE);
}
function decryptString(encrypted) {
  return electron.ipcRenderer.sendSync(SAFE_STORAGE_DECRYPT_STRING, encrypted);
}
function encryptString(plainText) {
  return electron.ipcRenderer.sendSync(SAFE_STORAGE_ENCRYPT_STRING, plainText);
}
module.exports = {
  isEncryptionAvailable,
  decryptString,
  encryptString
};