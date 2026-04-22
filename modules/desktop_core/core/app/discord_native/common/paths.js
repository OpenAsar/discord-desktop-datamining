"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPath = getPath;
exports.getCrashFiles = getCrashFiles;
exports.getUpdaterLogs = getUpdaterLogs;
exports.getSystemServiceLogs = getSystemServiceLogs;
exports.getSquirrelLogs = getSquirrelLogs;
const electron_1 = __importDefault(require("electron"));
const fs_1 = __importDefault(require("fs"));
const original_fs_1 = __importDefault(require("original-fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const processUtils_1 = require("../../../common/processUtils");
const constants_1 = require("../common/constants");
const allowedAppPaths = new Set([
    'home',
    'appData',
    'desktop',
    'documents',
    'downloads',
    'crashDumps',
    'exe',
]);
const readdir = util_1.default.promisify(fs_1.default.readdir);
async function getPath(path) {
    if (!allowedAppPaths.has(path)) {
        throw new Error(`${path} is not an allowed app path`);
    }
    return await electron_1.default.ipcRenderer.invoke(constants_1.IPCEvents.APP_GET_PATH, path);
}
function getTimes(filenames) {
    return Promise.allSettled(filenames.map((filename) => new Promise((resolve, reject) => {
        original_fs_1.default.stat(filename, (err, stats) => {
            if (err != null) {
                return reject(err);
            }
            if (!stats.isFile()) {
                return reject(new Error('Not a file'));
            }
            return resolve({ filename, mtime: stats.mtime });
        });
    })));
}
async function orderedFiles(folder) {
    try {
        const filenames = await readdir(folder);
        const times = await getTimes(filenames.map((filename) => path_1.default.join(folder, filename)));
        return times
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value)
            .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
            .map((a) => a.filename);
    }
    catch (err) {
        return [];
    }
}
async function getCrashFiles() {
    const crashBaseFolder = await getPath('crashDumps');
    const crashFolder = processUtils_1.IS_WIN ? path_1.default.join(crashBaseFolder, 'reports') : path_1.default.join(crashBaseFolder, 'completed');
    return orderedFiles(crashFolder);
}
async function getUpdaterLogs() {
    if (processUtils_1.IS_WIN) {
        const exeFile = await getPath('exe');
        const exeBaseFolder = path_1.default.resolve(exeFile, '..');
        const updaterLogFolder = path_1.default.resolve(exeBaseFolder, '..');
        const files = await orderedFiles(updaterLogFolder);
        const logFiles = files.filter((f) => f.endsWith('updater_rCURRENT.log'));
        return logFiles;
    }
    else {
        return [];
    }
}
function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
async function getSystemServiceLogs() {
    if (processUtils_1.IS_WIN) {
        let commonFilesPath = process.env['CommonProgramFiles'];
        if (commonFilesPath == null) {
            const programFilesPath = process.env['ProgramFiles'];
            if (programFilesPath == null) {
                return [];
            }
            commonFilesPath = path_1.default.join(programFilesPath, 'Common Files');
        }
        const releaseChannel = window?.DiscordNative?.app.getReleaseChannel?.() ?? 'stable';
        const channelFolder = releaseChannel === 'stable' ? 'Discord' : `Discord${capitalizeFirstLetter(releaseChannel)}`;
        const discordServiceLogFolder = path_1.default.join(commonFilesPath, 'Discord', channelFolder, 'logs');
        const files = await orderedFiles(discordServiceLogFolder);
        const logFiles = files.filter((f) => f.endsWith('admin_rCURRENT.log'));
        return logFiles;
    }
    else {
        return [];
    }
}
async function getSquirrelLogs() {
    if (processUtils_1.IS_WIN) {
        const filesToUpload = [];
        const exeFile = await getPath('exe');
        const exeBaseFolder = path_1.default.resolve(exeFile, '..');
        const updaterLogFolder = path_1.default.resolve(exeBaseFolder, '..');
        const discordChannelLog = path_1.default.join(updaterLogFolder, 'SquirrelSetup.log');
        if (fs_1.default.existsSync(discordChannelLog)) {
            filesToUpload.push(discordChannelLog);
        }
        const appData = await getPath('appData');
        const squirrelTempLog = path_1.default.join(appData, 'Local', 'SquirrelTemp', 'SquirrelSetup.log');
        if (fs_1.default.existsSync(squirrelTempLog)) {
            filesToUpload.push(squirrelTempLog);
        }
        return filesToUpload;
    }
    else {
        return [];
    }
}
