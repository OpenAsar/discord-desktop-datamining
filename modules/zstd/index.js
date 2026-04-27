"use strict";
const native = require('./discord_zstd.node');
const discordNative = globalThis.window?.DiscordNative;
const isLogDirAvailable = discordNative?.fileManager?.getAndCreateLogDirectorySync;
let initializeArgs = {};
if (isLogDirAvailable != null) {
    const logDirectory = discordNative.fileManager.getAndCreateLogDirectorySync();
    const logLevel = discordNative.fileManager.logLevelSync();
    initializeArgs = {
        logDirectory: logDirectory,
        logLevel: logLevel,
        logNumFiles: 1,
        logFileSize: 3 * 1024 * 1024,
    };
}
native.initializeLogging(initializeArgs);
let id = 1;
let buffer = null;
function decompress(data) {
    if (this.id !== id) {
        throw new Error('Attempting to use a stale zstd context. Only one may be active at a time');
    }
    return buffer.decompress(data);
}
function getLastError() {
    if (this.id !== id) {
        throw new Error('Attempting to use a stale zstd context. Only one may be active at a time');
    }
    return buffer.getLastError();
}
function createContext() {
    id += 1;
    if (buffer != null) {
        buffer.reset();
    }
    else {
        buffer = new native.DecompressStream();
    }
    return { id, decompress, getLastError };
}
module.exports = { createContext };
