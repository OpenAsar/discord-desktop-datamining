"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const appFeatures_1 = require("../../appFeatures");
const paths_1 = require("../../bootstrapModules/paths");
const constants_1 = require("../common/constants");
const { USER_DATA_CACHE_SAVE, USER_DATA_CACHE_GET, USER_DATA_CACHE_DELETE } = constants_1.IPCEvents;
const features = (0, appFeatures_1.getFeatures)();
function getCachePath() {
    const userData = paths_1.paths.getUserData();
    if (userData === null) {
        return null;
    }
    return path_1.default.join(userData, 'userDataCache.json');
}
function getMigratedPath() {
    const userData = paths_1.paths.getUserData();
    if (userData === null) {
        return null;
    }
    return path_1.default.join(userData, 'domainMigrated');
}
function cacheUserData(userData) {
    const cachePath = getCachePath();
    if (cachePath === null) {
        return;
    }
    fs_1.default.writeFile(cachePath, userData, (e) => {
        if (e !== null) {
            console.warn('Failed updating user data cache with error: ', e);
        }
    });
}
function getCachedUserData() {
    const cachePath = getCachePath();
    if (cachePath === null) {
        return null;
    }
    try {
        return JSON.parse(fs_1.default.readFileSync(cachePath).toString('utf-8'));
    }
    catch (_err) { }
    return null;
}
function deleteCachedUserData() {
    try {
        const cachePath = getCachePath();
        const migratedPath = getMigratedPath();
        if (cachePath === null || migratedPath === null) {
            return;
        }
        fs_1.default.unlinkSync(cachePath);
        fs_1.default.writeFile(migratedPath, '', (e) => {
            if (e !== null) {
                console.warn('Failed to create domainMigrated file with error: ', e);
            }
        });
    }
    catch (_err) { }
}
electron_1.default.ipcMain.handle(USER_DATA_CACHE_GET, () => {
    return getCachedUserData();
});
electron_1.default.ipcMain.on(USER_DATA_CACHE_SAVE, (_event, userData) => {
    cacheUserData(userData);
});
electron_1.default.ipcMain.on(USER_DATA_CACHE_DELETE, (_event) => {
    deleteCachedUserData();
});
features.declareSupported('user_data_cache');
