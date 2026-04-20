"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canBootstrapNewUpdater = void 0;
exports.ensureModule = ensureModule;
exports.getModulePath = getModulePath;
exports.getUpdaterVersion = getUpdaterVersion;
exports.requireModule = requireModule;
var electron = _interopRequireWildcard(require("electron"));
var commonConstants = _interopRequireWildcard(require("../common/constants"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  NATIVE_MODULES_GET_PATHS,
  NATIVE_MODULES_INSTALL,
  NATIVE_MODULES_GET_HAS_NEW_UPDATER,
  NATIVE_MODULES_GET_MODULE_PATH
} = commonConstants.IPCEvents;
const modulePromises = {};
function getSanitizedModulePaths() {
  let sanitizedModulePaths = [];
  const {
    mainAppDirname,
    browserModulePaths
  } = electron.ipcRenderer.sendSync(NATIVE_MODULES_GET_PATHS);
  browserModulePaths.forEach(modulePath => {
    if (!modulePath.includes('electron.asar')) {
      sanitizedModulePaths.push(modulePath);
    }
  });
  const rendererModulePaths = require('module')._nodeModulePaths(mainAppDirname);
  sanitizedModulePaths = sanitizedModulePaths.concat(rendererModulePaths.slice(0, 2));
  return sanitizedModulePaths;
}
function getHasNewUpdater() {
  return electron.ipcRenderer.sendSync(NATIVE_MODULES_GET_HAS_NEW_UPDATER);
}
function getUpdaterVersion() {
  return 4;
}
async function ensureModule(name) {
  if (modulePromises[name] == null) {
    modulePromises[name] = electron.ipcRenderer.invoke(NATIVE_MODULES_INSTALL, name);
  }
  const moduleInstall = modulePromises[name];
  await moduleInstall.catch(e => {
    modulePromises[name] = null;
    return Promise.reject(e);
  });
  module.paths = getSanitizedModulePaths();
}
function requireModule(name) {
  if (!/^discord_[a-z0-9_-]+$/.test(name) && name !== 'erlpack') {
    throw new Error('"' + String(name) + '" is not a whitelisted native module');
  }
  return require(name);
}
function getModulePath(name) {
  return electron.ipcRenderer.sendSync(NATIVE_MODULES_GET_MODULE_PATH, name);
}
const canBootstrapNewUpdater = exports.canBootstrapNewUpdater = !getHasNewUpdater();
module.paths = getSanitizedModulePaths();