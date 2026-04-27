"use strict";
const hook = require('./discord_hook.node');
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
hook.initialize(initializationParams);
module.exports = hook;
