"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performFirstRunTasks = performFirstRunTasks;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var paths = _interopRequireWildcard(require("../../common/paths"));
var _errorHandler = require("../errorHandler");
var _squirrelUpdate = require("../squirrelUpdate");
var _Constants = _interopRequireDefault(require("../Constants"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const appFolder = _path.default.resolve(process.execPath, '..');
const rootFolder = _path.default.resolve(appFolder, '..');
const exeName = _path.default.basename(process.execPath);
const updateExe = _path.default.join(rootFolder, 'Update.exe');
function copyIconToRoot() {
  const icoSrc = _path.default.join(appFolder, 'app.ico');
  const icoDest = _path.default.join(rootFolder, 'app.ico');
  try {
    const ico = _fs.default.readFileSync(icoSrc);
    _fs.default.writeFileSync(icoDest, new Uint8Array(ico));
    return icoDest;
  } catch (e) {
    return icoSrc;
  }
}
function updateShortcuts(updater) {
  const shortcutFileName = `${_Constants.default.APP_NAME_FOR_HUMANS}.lnk`;
  const shortcutPaths = [_path.default.join(updater.getKnownFolder('desktop'), shortcutFileName), _path.default.join(updater.getKnownFolder('programs'), _Constants.default.APP_COMPANY, shortcutFileName)];
  const iconPath = copyIconToRoot();
  for (const shortcutPath of shortcutPaths) {
    if (!_fs.default.existsSync(shortcutPath)) {
      continue;
    }
    updater.createShortcut({
      target_path: updateExe,
      shortcut_path: shortcutPath,
      arguments: `--processStart ${exeName}`,
      icon_path: iconPath,
      icon_index: 0,
      description: _Constants.default.APP_DESCRIPTION,
      app_user_model_id: _Constants.default.APP_ID,
      working_directory: appFolder
    });
  }
}
function performFirstRunTasks(updater) {
  const firstRunCompletePath = _path.default.join(paths.getUserDataVersioned(), '.first-run');
  if (!_fs.default.existsSync(firstRunCompletePath)) {
    let updatedShortcuts = false;
    try {
      if (updater != null) {
        updateShortcuts(updater);
        updatedShortcuts = true;
      }
    } catch (e) {
      (0, _errorHandler.handled)(e);
    }
    (0, _squirrelUpdate.installProtocol)(_Constants.default.APP_PROTOCOL, () => {
      try {
        if (updatedShortcuts) {
          _fs.default.writeFileSync(firstRunCompletePath, 'true');
        }
      } catch (e) {
        (0, _errorHandler.handled)(e);
      }
    });
  }
}