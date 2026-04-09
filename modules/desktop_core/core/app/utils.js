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
  const userDataPath = _paths.paths.getUserData();
  const appPath = _path.default.resolve(__dirname, '..');
  const fullPathToAsarFile = _path.default.join(appPath, asarPath, fileName);
  const buffer = _fs.default.existsSync(fullPathToAsarFile) ? _fs.default.readFileSync(fullPathToAsarFile) : null;
  const image = buffer != null ? _electron.nativeImage.createFromBuffer(buffer) : null;
  if (_path.default.extname(fileName) === '.ico') {
    if (userDataPath == null || buffer == null) {
      return null;
    }
    const nativeFilePath = _path.default.join(userDataPath, fileName);
    _fs.default.writeFileSync(nativeFilePath, buffer);
    return _electron.nativeImage.createFromPath(nativeFilePath);
  }
  const baseName = _path.default.basename(fileName, _path.default.extname(fileName));
  if (userDataPath != null && _fs.default.existsSync(_path.default.join(userDataPath, fileName))) {
    _fs.default.unlinkSync(_path.default.join(userDataPath, fileName));
  }
  const scaleFactor = _electron.screen.getPrimaryDisplay().scaleFactor;
  if (/^win/.test(platform)) {
    if (scaleFactor <= 1 && buffer != null) {
      return _electron.nativeImage.createFromBuffer(buffer, {
        scaleFactor: 1
      });
    }
  }
  const variants = ['@1.25x', '@1.33x', '@1.4x', '@1.5x', '@1.8x', '@2x', '@2.5x', '@3x', '@4x', '@5x'];
  for (const variant of variants) {
    const variantFileName = `${baseName}${variant}${_path.default.extname(fileName)}`;
    const variantFullPath = _path.default.join(appPath, asarPath, variantFileName);
    const variantScale = Number(variant.replace('@', '').replace('x', ''));
    if (_fs.default.existsSync(variantFullPath)) {
      const variantBuffer = _fs.default.readFileSync(variantFullPath);
      if (/^win/.test(platform)) {
        if (variantScale >= scaleFactor || variant === variants[variants.length - 1]) {
          return _electron.nativeImage.createFromBuffer(variantBuffer, {
            scaleFactor: variantScale
          });
        }
      } else if (image != null) {
        image.addRepresentation({
          scaleFactor: variantScale,
          buffer: variantBuffer
        });
      }
    }
  }
  if (image != null && baseName.endsWith('Template')) {
    image.setTemplateImage(true);
  }
  return image;
}
const platform = exports.platform = _os.default.platform();
const isWindows = exports.isWindows = /^win/.test(platform);
const isOSX = exports.isOSX = platform === 'darwin';
const isLinux = exports.isLinux = platform === 'linux';