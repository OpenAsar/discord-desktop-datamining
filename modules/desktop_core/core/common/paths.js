"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanOldVersions = cleanOldVersions;
exports.init = init;
exports.getUserData = getUserData;
exports.getUserDataVersioned = getUserDataVersioned;
exports.getResources = getResources;
exports.getModuleDataPath = getModuleDataPath;
exports.getAssetCachePath = getAssetCachePath;
exports.getLogPath = getLogPath;
exports.getInstallPath = getInstallPath;
exports.getRootPath = getRootPath;
const fs_1 = __importDefault(require("fs"));
const original_fs_1 = __importDefault(require("original-fs"));
const path_1 = __importDefault(require("path"));
let userDataPath = null;
let userDataVersionedPath = null;
let resourcesPath = null;
let moduleDataPath = null;
let assetCachePath = null;
let logPath = null;
let installPath = null;
let rootPath = null;
function determineAppUserDataRoot() {
    const userDataPath = process.env.DISCORD_USER_DATA_DIR;
    if (userDataPath != null) {
        return userDataPath;
    }
    const { app } = require('electron');
    return app.getPath('appData');
}
function determineUserData(userDataRoot, buildInfo) {
    return path_1.default.join(userDataRoot, 'discord' + (buildInfo.releaseChannel === 'stable' ? '' : buildInfo.releaseChannel));
}
function cleanOldVersions(buildInfo) {
    if (userDataPath == null) {
        return;
    }
    const entries = fs_1.default.readdirSync(userDataPath);
    entries.forEach((entry) => {
        if (userDataPath == null) {
            return;
        }
        const fullPath = path_1.default.join(userDataPath, entry);
        let stat;
        try {
            stat = fs_1.default.lstatSync(fullPath);
        }
        catch (e) {
            return;
        }
        if (stat.isDirectory() && entry.indexOf(buildInfo.version) === -1) {
            if (entry.match('^[0-9]+.[0-9]+.[0-9]+') != null) {
                console.log('Removing old directory ', entry);
                original_fs_1.default.rm(fullPath, { recursive: true, force: true }, (error) => {
                    if (error != null) {
                        console.warn('...failed with error: ', error);
                    }
                });
            }
        }
    });
}
function init(buildInfo) {
    resourcesPath = path_1.default.join(require.main.filename, '..', '..', '..');
    const userDataRoot = determineAppUserDataRoot();
    userDataPath = determineUserData(userDataRoot, buildInfo);
    const { app } = require('electron');
    app.setPath('userData', userDataPath);
    userDataVersionedPath = path_1.default.join(userDataPath, buildInfo.version);
    fs_1.default.mkdirSync(userDataVersionedPath, { recursive: true });
    if (buildInfo.localModulesRoot != null) {
        moduleDataPath = buildInfo.localModulesRoot;
    }
    else if (buildInfo.newUpdater) {
        moduleDataPath = path_1.default.join(userDataPath, 'module_data');
    }
    else if (buildInfo.standaloneModules) {
        moduleDataPath = path_1.default.join(resourcesPath, 'standalone_modules');
    }
    else {
        moduleDataPath = path_1.default.join(userDataVersionedPath, 'modules');
    }
    assetCachePath = path_1.default.join(userDataPath, 'discord_asset_cache');
    logPath = path_1.default.join(userDataPath, 'logs');
    fs_1.default.mkdirSync(logPath, { recursive: true });
    const exeDir = path_1.default.dirname(app.getPath('exe'));
    const processUtils = require('./processUtils');
    if (/^app-[0-9]+\.[0-9]+\.[0-9]+/.test(path_1.default.basename(exeDir))) {
        installPath = path_1.default.join(exeDir, '..');
    }
    else if (processUtils.IS_OSX) {
        installPath = path_1.default.join(exeDir, '..', '..', '..');
    }
    if (processUtils.IS_OSX) {
        rootPath = userDataPath;
    }
    else {
        rootPath = installPath;
    }
}
function getUserData() {
    return userDataPath;
}
function getUserDataVersioned() {
    return userDataVersionedPath;
}
function getResources() {
    return resourcesPath;
}
function getModuleDataPath() {
    return moduleDataPath;
}
function getAssetCachePath() {
    return assetCachePath;
}
function getLogPath() {
    return logPath;
}
function getInstallPath() {
    return installPath;
}
function getRootPath() {
    return rootPath;
}
