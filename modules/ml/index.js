"use strict";
const MLModule = require('./discord_ml.node');
const discordNative = globalThis.window?.DiscordNative;
const isElectronRenderer = discordNative?.isRenderer != null;
let dataDirectory = null;
if (isElectronRenderer) {
    try {
        const fileManager = discordNative.fileManager;
        dataDirectory = fileManager.getMLDataDirSync ? fileManager.getMLDataDirSync() : null;
    }
    catch (e) {
        console.error('Failed to get ML data directory: ', e);
    }
}
const isLogDirAvailable = discordNative?.fileManager?.getAndCreateLogDirectorySync;
let initializationParams;
if (isLogDirAvailable != null) {
    const logDirectory = discordNative.fileManager.getAndCreateLogDirectorySync() ?? undefined;
    const logLevel = discordNative.fileManager.logLevelSync();
    initializationParams = { logDirectory, logLevel };
}
else {
    console.warn('Unable to find log directory');
}
function promisify(func, ...prefixArgs) {
    return (...args) => new Promise((resolve, reject) => func(...prefixArgs, ...args, resolve, (msg) => reject(new Error(msg))));
}
MLModule.setupResources = promisify(MLModule._setupResources, dataDirectory);
MLModule.setMLResultCallback = promisify(MLModule._setMLResultCallback);
console.info('Initializing ML module');
MLModule._initialize(initializationParams);
module.exports = MLModule;
