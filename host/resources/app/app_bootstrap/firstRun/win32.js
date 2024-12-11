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
var _Constants = require("../Constants");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const appFolder = _path.default.resolve(process.execPath, '..');
const rootFolder = _path.default.resolve(appFolder, '..');
const exeName = _path.default.basename(process.execPath);
const updateExe = _path.default.join(rootFolder, 'Update.exe');
function copyIconToRoot() {
  const icoSrc = _path.default.join(appFolder, 'app.ico');
  const icoDest = _path.default.join(rootFolder, 'app.ico');
  try {
    const ico = _fs.default.readFileSync(icoSrc);
    _fs.default.writeFileSync(icoDest, ico);
    return icoDest;
  } catch (e) {
    return icoSrc;
  }
}
function updateShortcuts(updater) {
  const shortcutFileName = `${_Constants.APP_NAME_FOR_HUMANS}.lnk`;
  const shortcutPaths = [_path.default.join(updater.getKnownFolder('desktop'), shortcutFileName), _path.default.join(updater.getKnownFolder('programs'), _Constants.APP_COMPANY, shortcutFileName)];
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
      description: _Constants.APP_DESCRIPTION,
      app_user_model_id: _Constants.APP_ID,
      working_directory: appFolder
    });
  }
}
function performFirstRunTasks(updater) {
  const firstRunCompletePath = _path.default.join(paths.getUserDataVersioned(), '.first-run');
  if (!_fs.default.existsSync(firstRunCompletePath)) {
    let updatedShortcuts = false;
    try {
      updateShortcuts(updater);
      updatedShortcuts = true;
    } catch (e) {
      (0, _errorHandler.handled)(e);
    }
    (0, _squirrelUpdate.installProtocol)(_Constants.APP_PROTOCOL, () => {
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