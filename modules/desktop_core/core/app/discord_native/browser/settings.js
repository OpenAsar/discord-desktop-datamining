"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectSettingsBackend = injectSettingsBackend;
var electron = _interopRequireWildcard(require("electron"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  SETTINGS_GET,
  SETTINGS_SET,
  SETTINGS_GET_SYNC
} = require('../common/constants').IPCEvents;
let injectedSettings = null;
function getSettings() {
  return injectedSettings != null ? injectedSettings : {
    get: () => {},
    set: () => {},
    save: () => {}
  };
}
function injectSettingsBackend(settings) {
  injectedSettings = settings;
}
electron.ipcMain.handle(SETTINGS_GET, (_, name, defaultValue) => {
  const settings = getSettings();
  return settings.get(name, defaultValue);
});
electron.ipcMain.handle(SETTINGS_SET, (_, name, value) => {
  const settings = getSettings();
  settings.set(name, value);
  settings.save();
});
electron.ipcMain.on(SETTINGS_GET_SYNC, (event, name, defaultValue) => {
  const settings = getSettings();
  event.returnValue = settings.get(name, defaultValue);
});