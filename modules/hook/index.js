/* eslint-disable no-console */
const hook = require('./discord_hook.node');

const isLogDirAvailable = globalThis.window?.DiscordNative?.fileManager?.getAndCreateLogDirectorySync;
let initializationParams;
if (isLogDirAvailable) {
  const logDirectory = globalThis.window.DiscordNative.fileManager.getAndCreateLogDirectorySync(globalThis.window);
  const logLevel = globalThis.window.DiscordNative.fileManager.logLevelSync(globalThis.window);
  initializationParams = {logDirectory, logLevel};
} else {
  console.warn('Unable to find log directory');
}

hook.initialize(initializationParams);

module.exports = hook;
