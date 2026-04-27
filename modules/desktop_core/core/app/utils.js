"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLinux = exports.isOSX = exports.isWindows = exports.platform = void 0;
exports.exposeModuleResource = exposeModuleResource;
const electron_1 = require("electron");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const paths_1 = require("./bootstrapModules/paths");
function exposeModuleResource(asarPath, fileName) {
    const userDataPath = paths_1.paths.getUserData();
    const appPath = path_1.default.resolve(__dirname, '..');
    const fullPathToAsarFile = path_1.default.join(appPath, asarPath, fileName);
    const buffer = fs_1.default.existsSync(fullPathToAsarFile) ? fs_1.default.readFileSync(fullPathToAsarFile) : null;
    const image = buffer != null ? electron_1.nativeImage.createFromBuffer(buffer) : null;
    if (path_1.default.extname(fileName) === '.ico') {
        if (userDataPath == null || buffer == null) {
            return null;
        }
        const nativeFilePath = path_1.default.join(userDataPath, fileName);
        fs_1.default.writeFileSync(nativeFilePath, buffer);
        return electron_1.nativeImage.createFromPath(nativeFilePath);
    }
    const baseName = path_1.default.basename(fileName, path_1.default.extname(fileName));
    if (userDataPath != null && fs_1.default.existsSync(path_1.default.join(userDataPath, fileName))) {
        fs_1.default.unlinkSync(path_1.default.join(userDataPath, fileName));
    }
    const scaleFactor = electron_1.screen.getPrimaryDisplay().scaleFactor;
    if (/^win/.test(exports.platform)) {
        if (scaleFactor <= 1 && buffer != null) {
            return electron_1.nativeImage.createFromBuffer(buffer, { scaleFactor: 1 });
        }
    }
    const variants = ['@1.25x', '@1.33x', '@1.4x', '@1.5x', '@1.8x', '@2x', '@2.5x', '@3x', '@4x', '@5x'];
    for (const variant of variants) {
        const variantFileName = `${baseName}${variant}${path_1.default.extname(fileName)}`;
        const variantFullPath = path_1.default.join(appPath, asarPath, variantFileName);
        const variantScale = Number(variant.replace('@', '').replace('x', ''));
        if (fs_1.default.existsSync(variantFullPath)) {
            const variantBuffer = fs_1.default.readFileSync(variantFullPath);
            if (/^win/.test(exports.platform)) {
                if (variantScale >= scaleFactor || variant === variants[variants.length - 1]) {
                    return electron_1.nativeImage.createFromBuffer(variantBuffer, { scaleFactor: variantScale });
                }
            }
            else if (image != null) {
                image.addRepresentation({
                    scaleFactor: variantScale,
                    buffer: variantBuffer,
                });
            }
        }
    }
    if (image != null && baseName.endsWith('Template')) {
        image.setTemplateImage(true);
    }
    return image;
}
exports.platform = os_1.default.platform();
exports.isWindows = /^win/.test(exports.platform);
exports.isOSX = exports.platform === 'darwin';
exports.isLinux = exports.platform === 'linux';
