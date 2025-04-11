"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
exports.isInstalled = isInstalled;
exports.uninstall = uninstall;
exports.update = update;
var _electron = require("electron");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _buildInfo = _interopRequireDefault(require("../buildInfo"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const appName = _path.default.basename(process.execPath, '.exe');
const exePath = _electron.app.getPath('exe');
const exeDir = _path.default.dirname(exePath);
const iconPath = _path.default.join(exeDir, 'discord.png');
const autostartDir = _path.default.join(_electron.app.getPath('appData'), 'autostart');
const electronAppName = _electron.app.name ?? _electron.app.getName();
const autostartFileName = _path.default.join(autostartDir, electronAppName + '-' + _buildInfo.default.releaseChannel + '.desktop');
const desktopFile = `[Desktop Entry]
Type=Application
Exec=${exePath}
Hidden=false
NoDisplay=false
Name=${appName}
Icon=${iconPath}
Comment=Text and voice chat for gamers.
X-GNOME-Autostart-enabled=true
`;
function ensureDir() {
  try {
    _fs.default.mkdirSync(autostartDir);
    return true;
  } catch (e) {}
  return false;
}
function install(callback) {
  ensureDir();
  try {
    _fs.default.writeFile(autostartFileName, desktopFile, callback);
  } catch (e) {
    callback();
  }
}
function update(callback) {
  callback();
}
function isInstalled(callback) {
  try {
    _fs.default.stat(autostartFileName, (err, stats) => {
      if (err != null) {
        callback(false);
      }
      callback(stats.isFile());
    });
  } catch (e) {
    callback(false);
  }
}
function uninstall(callback) {
  _fs.default.unlink(autostartFileName, callback);
}