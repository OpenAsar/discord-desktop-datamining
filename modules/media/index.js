"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native = require('./discord_media.node');
const isFileManagerAvailable = window?.DiscordNative?.fileManager;
const isLogDirAvailable = isFileManagerAvailable?.getAndCreateLogDirectorySync;
let initializeArgs = {};
let nativeData = {
    nativeReleaseChannel: 'unknown',
    nativeVersion: 'unknown',
    nativeBuildNumber: 0,
    nativeAppArch: 'unknown',
};
if (isLogDirAvailable) {
    const logDirectory = window.DiscordNative.fileManager.getAndCreateLogDirectorySync();
    const logLevel = window.DiscordNative.fileManager.logLevelSync();
    const nativeReleaseChannel = window?.DiscordNative?.app.getReleaseChannel?.();
    const nativeVersion = window?.DiscordNative?.app.getVersion?.();
    const nativeBuildNumber = window?.DiscordNative?.app.getBuildNumber?.();
    const nativeAppArch = window?.DiscordNative?.app.getAppArch?.();
    initializeArgs = {
        logDirectory: logDirectory,
        logLevel: logLevel,
        logNumFiles: 1,
        logFileSize: 3 * 1024 * 1024,
    };
    nativeData = {
        nativeReleaseChannel: nativeReleaseChannel ?? 'unknown',
        nativeVersion: nativeVersion ?? 'unknown',
        nativeBuildNumber: nativeBuildNumber ?? 0,
        nativeAppArch: nativeAppArch ?? 'unknown',
    };
}
native.initializeLogging(initializeArgs, nativeData);
module.exports = {
    getSystemAnalyticsBlob() {
        return new Promise((resolve) => native.getSystemAnalyticsBlob(resolve));
    },
    getMemoryUsageBlob() {
        return new Promise((resolve) => native.getMemoryUsageBlob(resolve));
    },
};
