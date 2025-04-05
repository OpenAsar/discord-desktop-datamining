"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const electron = require('electron');
const {
  SETTINGS_GET,
  SETTINGS_SET,
  SETTINGS_GET_SYNC
} = require('../common/constants').IPCEvents;
const RENDERER_SET_WHITELIST = ['audioSubsystem', 'useLegacyAudioDevice', 'debugLogging', 'ALWAYS_ALLOW_UPDATES'];
async function get(name, defaultValue) {
  return electron.ipcRenderer.invoke(SETTINGS_GET, name, defaultValue);
}
async function set(name, value) {
  if (!RENDERER_SET_WHITELIST.includes(name)) {
    throw new Error('cannot set this setting key');
  }
  return electron.ipcRenderer.invoke(SETTINGS_SET, name, value);
}
function getSync(name, defaultValue) {
  return electron.ipcRenderer.sendSync(SETTINGS_GET_SYNC, name, defaultValue);
}
const settings = {
  get,
  set,
  getSync
};
var _default = settings;
exports.default = _default;
module.exports = settings;