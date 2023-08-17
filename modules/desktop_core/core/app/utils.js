"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exposeModuleResource = exposeModuleResource;
exports.platform = exports.isWindows = exports.isOSX = exports.isLinux = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _paths = require("./bootstrapModules/paths");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function exposeModuleResource(asarPath, fileName) {
  const appPath = _path.default.resolve(__dirname, '..');
  const fullPathToAsarFile = _path.default.join(appPath, asarPath, fileName);
  const data = _fs.default.readFileSync(fullPathToAsarFile);
  const userDataPath = _paths.paths.getUserData();
  if (userDataPath == null) {
    return null;
  }
  const nativeFilePath = _path.default.join(userDataPath, fileName);
  _fs.default.writeFileSync(nativeFilePath, data);
  return nativeFilePath;
}
const platform = _os.default.platform();
exports.platform = platform;
const isWindows = /^win/.test(platform);
exports.isWindows = isWindows;
const isOSX = platform === 'darwin';
exports.isOSX = isOSX;
const isLinux = platform === 'linux';
exports.isLinux = isLinux;