"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exposeModuleResource = exposeModuleResource;
exports.platform = exports.isWindows = exports.isOSX = exports.isLinux = void 0;
var _electron = require("electron");
var _fs = _interopRequireDefault(require("fs"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _paths = require("./bootstrapModules/paths");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function exposeModuleResource(asarPath, fileName) {
  const appPath = _path.default.resolve(__dirname, '..');
  const fullPathToAsarFile = _path.default.join(appPath, asarPath, fileName);
  const data = _fs.default.readFileSync(fullPathToAsarFile);
  const userDataPath = _paths.paths.getUserData();
  if (userDataPath == null) {
    return null;
  }
  const moduleResourcePath = _path.default.join(userDataPath, 'ModuleResource');
  if (!_fs.default.existsSync(moduleResourcePath)) {
    _fs.default.mkdirSync(moduleResourcePath, {
      recursive: true
    });
  }
  const baseNativeFilePath = _path.default.join(moduleResourcePath, fileName);
  _fs.default.writeFileSync(baseNativeFilePath, data);
  const prevBaseNativeFilePath = _path.default.join(userDataPath, fileName);
  if (_fs.default.existsSync(prevBaseNativeFilePath)) {
    _fs.default.unlinkSync(prevBaseNativeFilePath);
  }
  const baseName = _path.default.basename(fileName, _path.default.extname(fileName));
  const variants = ['@1.25x', '@1.33x', '@1.4x', '@1.5x', '@1.8x', '@2.5x', '@2x', '@3x', '@4x', '@5x'];
  const image = _electron.nativeImage.createFromPath(baseNativeFilePath);
  for (const variant of variants) {
    const variantFileName = `${baseName}${variant}${_path.default.extname(fileName)}`;
    const variantFullPath = _path.default.join(appPath, asarPath, variantFileName);
    if (_fs.default.existsSync(variantFullPath)) {
      const variantData = _fs.default.readFileSync(variantFullPath);
      const variantNativeFilePath = _path.default.join(moduleResourcePath, variantFileName);
      _fs.default.writeFileSync(variantNativeFilePath, variantData);
      image.addRepresentation({
        scaleFactor: parseFloat(variant.replace('@', '').replace('x', '')),
        buffer: _electron.nativeImage.createFromPath(variantNativeFilePath).toPNG()
      });
    }
  }
  return baseNativeFilePath;
}
const platform = exports.platform = _os.default.platform();
const isWindows = exports.isWindows = /^win/.test(platform);
const isOSX = exports.isOSX = platform === 'darwin';
const isLinux = exports.isLinux = platform === 'linux';