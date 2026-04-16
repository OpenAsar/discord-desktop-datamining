"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.getSync = getSync;
exports.set = set;
var electron = _interopRequireWildcard(require("electron"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  SETTINGS_GET,
  SETTINGS_SET,
  SETTINGS_GET_SYNC
} = require('../common/constants').IPCEvents;
const RENDERER_SET_WHITELIST = ['audioSubsystem', 'offloadAdmControls', 'debugLogging', 'asyncVideoInputDeviceInit', 'ALWAYS_ALLOW_UPDATES', 'ALLOW_OPTIONAL_UPDATES', 'openH264Enabled', 'USE_NEW_UPDATER', 'USE_RUST_BSPATCH'];
function get(name, defaultValue) {
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