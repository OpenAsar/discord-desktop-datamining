"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
exports.isInstalled = isInstalled;
exports.uninstall = uninstall;
exports.update = update;
var _path = _interopRequireDefault(require("path"));
var windowsUtils = _interopRequireWildcard(require("../windowsUtils"));
var _appSettings = require("../appSettings");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const settings = (0, _appSettings.getSettings)();
const appName = _path.default.basename(process.execPath, '.exe');
const fullExeName = _path.default.basename(process.execPath);
const updatePath = _path.default.join(_path.default.dirname(process.execPath), '..', 'Update.exe');
function install(callback) {
  const startMinimized = settings.get('START_MINIMIZED', false);
  let execPath = `"${updatePath}" --processStart ${fullExeName}`;
  if (startMinimized) {
    execPath = `${execPath} --process-start-args --start-minimized`;
  }
  const queue = [['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', '/v', appName, '/d', execPath]];
  windowsUtils.addToRegistry(queue, callback);
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
function isInstalled(callback) {
  const queryValue = ['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', '/v', appName];
  queryValue.unshift('query');
  windowsUtils.spawnReg(queryValue, (error, stdout) => {
    const doesOldKeyExist = stdout.indexOf(appName) >= 0;
    callback(doesOldKeyExist);
  });
}
function uninstall(callback) {
  const queryValue = ['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', '/v', appName, '/f'];
  queryValue.unshift('delete');
  windowsUtils.spawnReg(queryValue, () => {
    callback();
  });
}