"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectGpuSettingsBackend = injectGpuSettingsBackend;
var electron = _interopRequireWildcard(require("electron"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  GPU_SETTINGS_SET_ENABLE_HWACCEL,
  GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC,
  GPU_SETTINGS_SET_CHROMIUM_SWITCHES,
  GPU_SETTINGS_SET_SETTING
} = require('../common/constants').IPCEvents;
let injectedGpuSettings = null;
function injectGpuSettingsBackend(gpuSettings) {
  injectedGpuSettings = gpuSettings;
}
electron.ipcMain.handle(GPU_SETTINGS_SET_ENABLE_HWACCEL, (_, enable) => {
  var _injectedGpuSettings;
  (_injectedGpuSettings = injectedGpuSettings) === null || _injectedGpuSettings === void 0 ? void 0 : _injectedGpuSettings.setEnableHardwareAcceleration(enable);
});
electron.ipcMain.on(GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC, event => {
  event.returnValue = injectedGpuSettings != null ? injectedGpuSettings.getEnableHardwareAcceleration() : false;
});
electron.ipcMain.handle(GPU_SETTINGS_SET_CHROMIUM_SWITCHES, (_, switches) => {
  var _injectedGpuSettings2;
  (_injectedGpuSettings2 = injectedGpuSettings) === null || _injectedGpuSettings2 === void 0 ? void 0 : _injectedGpuSettings2.setChromiumSwitches(switches);
});
electron.ipcMain.handle(GPU_SETTINGS_SET_SETTING, (_, key, value) => {
  var _injectedGpuSettings3;
  (_injectedGpuSettings3 = injectedGpuSettings) === null || _injectedGpuSettings3 === void 0 ? void 0 : _injectedGpuSettings3.setSetting(key, value);
});