"use strict";

var electron = _interopRequireWildcard(require("electron"));
var _processUtils = require("../../../common/processUtils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE,
  SAFE_STORAGE_ENCRYPT_STRING,
  SAFE_STORAGE_DECRYPT_STRING
} = require('../common/constants').IPCEvents;
electron.ipcMain.on(SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE, event => {
  event.returnValue = electron.safeStorage != null && electron.safeStorage.isEncryptionAvailable();
});
electron.ipcMain.on(SAFE_STORAGE_ENCRYPT_STRING, (event, plainText) => {
  if (plainText != null) {
    event.returnValue = electron.safeStorage.encryptString(plainText).toString('base64');
  } else {
    event.returnValue = null;
  }
});
electron.ipcMain.on(SAFE_STORAGE_DECRYPT_STRING, (event, encrypted) => {
  if (encrypted != null) {
    try {
      event.returnValue = electron.safeStorage.decryptString(Buffer.from(encrypted, 'base64'));
    } catch {
      event.returnValue = null;
    }
  } else {
    event.returnValue = null;
  }
});