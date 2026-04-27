"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = install;
exports.update = update;
exports.isInstalled = isInstalled;
exports.uninstall = uninstall;
const electron_1 = require("electron");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const appName = path_1.default.basename(process.execPath, '.exe');
const exePath = electron_1.app.getPath('exe');
const exeDir = path_1.default.dirname(exePath);
const iconPath = path_1.default.join(exeDir, 'discord.png');
const autostartDir = path_1.default.join(electron_1.app.getPath('appData'), 'autostart');
const electronAppName = electron_1.app.name ?? electron_1.app.getName();
const autostartFileName = path_1.default.join(autostartDir, electronAppName + '.desktop');
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
        fs_1.default.mkdirSync(autostartDir);
        return true;
    }
    catch (e) {
    }
    return false;
}
function install(callback) {
    ensureDir();
    try {
        fs_1.default.writeFile(autostartFileName, desktopFile, callback);
    }
    catch (e) {
        callback();
    }
}
function update(callback) {
    callback();
}
function isInstalled(callback) {
    try {
        fs_1.default.stat(autostartFileName, (err, stats) => {
            if (err != null) {
                callback(false);
                return;
            }
            callback(stats.isFile());
        });
    }
    catch (e) {
        callback(false);
    }
}
function uninstall(callback) {
    fs_1.default.unlink(autostartFileName, callback);
}
