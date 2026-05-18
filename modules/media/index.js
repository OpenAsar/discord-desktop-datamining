"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native = require('./discord_media.node');
const discordNative = globalThis.window?.DiscordNative;
const isLogDirAvailable = discordNative?.fileManager?.getAndCreateLogDirectorySync;
let initializeArgs = {};
let nativeData = {
    nativeReleaseChannel: 'unknown',
    nativeVersion: 'unknown',
    nativeBuildNumber: 0,
    nativeAppArch: 'unknown',
};
if (isLogDirAvailable != null) {
    const logDirectory = discordNative.fileManager.getAndCreateLogDirectorySync();
    const logLevel = discordNative.fileManager.logLevelSync();
    const nativeReleaseChannel = discordNative?.app.getReleaseChannel?.();
    const nativeVersion = discordNative?.app.getVersion?.();
    const nativeBuildNumber = discordNative?.app.getBuildNumber?.();
    const nativeAppArch = discordNative?.app.getAppArch?.();
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
    getGpuStats(pid) {
        return Promise.resolve(JSON.parse(native.getGpuStats(pid)));
    },
};
