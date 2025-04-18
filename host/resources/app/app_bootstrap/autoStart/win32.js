"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
exports.isInstalled = isInstalled;
exports.uninstall = uninstall;
exports.update = update;
var _path = _interopRequireDefault(require("path"));
var _appSettings = require("../appSettings");
var windowsUtils = _interopRequireWildcard(require("../windowsUtils"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const settings = (0, _appSettings.getSettings)();
const appName = _path.default.basename(process.execPath, '.exe');
const fullExeName = _path.default.basename(process.execPath);
const updatePath = _path.default.join(_path.default.dirname(process.execPath), '..', 'Update.exe');
function install(callback) {
  const startMinimized = settings === null || settings === void 0 ? void 0 : settings.get('START_MINIMIZED', false);
  let execPath = `"${updatePath}" --processStart ${fullExeName}`;
  if (startMinimized) {
    execPath = `${execPath} --process-start-args --start-minimized`;
  }
  const queue = [['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', '/v', appName, '/d', execPath]];
  windowsUtils.addToRegistry(queue, callback);
}
function isInstalled(callback) {
  const queryValue = ['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', '/v', appName];
  queryValue.unshift('query');
  windowsUtils.spawnReg(queryValue, (_error, stdout) => {
    const doesOldKeyExist = stdout.indexOf(appName) >= 0;
    callback(doesOldKeyExist);
  });
}
function update(callback) {
  isInstalled(installed => {
    if (installed) {
      install(callback);
    } else {
      callback();
    }
  });
}
function uninstall(callback) {
  const queryValue = ['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', '/v', appName, '/f'];
  queryValue.unshift('delete');
  windowsUtils.spawnReg(queryValue, () => {
    callback();
  });
}