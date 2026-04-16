"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
const DiscordIPC_1 = require("../common/DiscordIPC");
function getModulePath() {
    return global.moduleDataPath ?? global.modulePath;
}
function getLogPath() {
    return global.logPath;
}
function getAssetCachePath() {
    return global.assetCachePath;
}
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_PATH, async (_) => {
    return getModulePath();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_SHOW_SAVE_DIALOG, async (_, dialogOptions) => {
    return await electron_1.default.dialog.showSaveDialog(dialogOptions);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_SHOW_OPEN_DIALOG, async (_, dialogOptions) => {
    return await electron_1.default.dialog.showOpenDialog(dialogOptions);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_SHOW_ITEM_IN_FOLDER, async (_, path) => {
    electron_1.default.shell.showItemInFolder(path);
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_DATA_PATH_SYNC, (event) => {
    event.returnValue = getModulePath();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_LOG_PATH, async (_) => {
    return getLogPath();
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_LOG_PATH_SYNC, (event) => {
    event.returnValue = getLogPath();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_ASSET_CACHE_PATH, async (_) => {
    return getAssetCachePath();
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_ASSET_CACHE_PATH_SYNC, (event) => {
    event.returnValue = getAssetCachePath();
});
