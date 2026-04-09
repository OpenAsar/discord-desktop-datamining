"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModulePath = getModulePath;
exports.injectModuleUpdater = injectModuleUpdater;
exports.injectUpdater = injectUpdater;
var childProcess = _interopRequireWildcard(require("child_process"));
var electron = _interopRequireWildcard(require("electron"));
var path = _interopRequireWildcard(require("path"));
var process = _interopRequireWildcard(require("process"));
var _nodeGlobalPaths = require("../../../common/nodeGlobalPaths");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  NATIVE_MODULES_GET_PATHS,
  NATIVE_MODULES_INSTALL,
  NATIVE_MODULES_FINISH_UPDATER_BOOTSTRAP,
  NATIVE_MODULES_GET_HAS_NEW_UPDATER,
  NATIVE_MODULES_GET_MODULE_PATH
} = require('../common/constants').IPCEvents;
let injectedModuleUpdater = null;
let injectedUpdater = null;
function injectModuleUpdater(moduleUpdater) {
  injectedModuleUpdater = moduleUpdater;
}
function injectUpdater(updater) {
  injectedUpdater = updater;
}
electron.ipcMain.on(NATIVE_MODULES_GET_PATHS, event => {
  event.returnValue = {
    mainAppDirname: global.mainAppDirname,
    browserModulePaths: (0, _nodeGlobalPaths.getGlobalPaths)()
  };
});
async function newUpdaterInstall(updater, moduleName) {
  try {
    await updater.installModule(moduleName);
    await updater.commitModules({});
  } catch (e) {
    throw new Error(`Failed to install ${moduleName}: ${e}`);
  }
}
electron.ipcMain.handle(NATIVE_MODULES_INSTALL, async (_, moduleName) => {
  var _injectedUpdater;
  const newUpdater = (_injectedUpdater = injectedUpdater) === null || _injectedUpdater === void 0 ? void 0 : _injectedUpdater.getUpdater();
  if (newUpdater != null) {
    return newUpdaterInstall(newUpdater, moduleName);
  }
  const updater = injectedModuleUpdater;
  if (updater === null) {
    throw new Error('Module updater is not available!');
  }
  const waitForInstall = new Promise((resolve, reject) => {
    const installedHandler = installedModuleEvent => {
      if (installedModuleEvent.name === moduleName) {
        updater.events.removeListener(updater.INSTALLED_MODULE, installedHandler);
        if (installedModuleEvent.succeeded) {
          resolve();
        } else {
          reject(new Error(`Failed to install ${moduleName}`));
        }
      }
    };
    updater.events.on(updater.INSTALLED_MODULE, installedHandler);
  });
  updater.install(moduleName, false);
  return await waitForInstall;
});
electron.ipcMain.on(NATIVE_MODULES_GET_HAS_NEW_UPDATER, event => {
  var _injectedUpdater2;
  event.returnValue = ((_injectedUpdater2 = injectedUpdater) === null || _injectedUpdater2 === void 0 ? void 0 : _injectedUpdater2.getUpdater()) != null;
});
electron.ipcMain.on(NATIVE_MODULES_FINISH_UPDATER_BOOTSTRAP, (_, [major, minor, revision]) => {
  if (typeof major !== 'number' || typeof minor !== 'number' || typeof revision !== 'number') {
    throw new Error('You tried.');
  }
  const hostExePath = path.join(path.dirname(process.execPath), '..', `app-${`${major}.${minor}.${revision}`}`, path.basename(process.execPath));
  electron.app.once('will-quit', () => {
    childProcess.spawn(hostExePath, [], {
      detached: true,
      stdio: 'inherit'
    });
  });
  console.log(`Restarting from ${path.resolve(process.execPath)} to ${path.resolve(hostExePath)}`);
  electron.app.quit();
});
function getModulePath(name) {
  var _injectedUpdater3;
  const newUpdater = (_injectedUpdater3 = injectedUpdater) === null || _injectedUpdater3 === void 0 ? void 0 : _injectedUpdater3.getUpdater();
  if (newUpdater != null) {
    return newUpdater.committedModulePaths.get(name) ?? null;
  }
  return null;
}
electron.ipcMain.on(NATIVE_MODULES_GET_MODULE_PATH, (event, name) => {
  event.returnValue = getModulePath(name) ?? null;
});