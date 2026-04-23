"use strict";
const KrispModule = require('./discord_krisp.node');
const discordNative = globalThis.window?.DiscordNative;
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
KrispModule._initialize(initializationParams);
KrispModule.getNcModels = function () {
    return new Promise((resolve) => {
        KrispModule._getNcModels((models) => resolve(models));
    });
};
KrispModule.getVadModels = function () {
    return new Promise((resolve) => {
        KrispModule._getVadModels((models) => resolve(models));
    });
};
KrispModule.getNcModelFilename = function () {
    return new Promise((resolve) => {
        KrispModule._getNcModelFilename((model) => resolve(model));
    });
};
module.exports = KrispModule;
