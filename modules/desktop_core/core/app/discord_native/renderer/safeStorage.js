"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptString = decryptString;
exports.encryptString = encryptString;
exports.isEncryptionAvailable = isEncryptionAvailable;
var electron = _interopRequireWildcard(require("electron"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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