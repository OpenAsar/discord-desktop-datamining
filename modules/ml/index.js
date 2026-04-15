/* eslint-disable no-console */

const MLModule = require('./discord_ml.node');

const isElectronRenderer = globalThis.window?.DiscordNative?.isRenderer != null;

let dataDirectory;
if (isElectronRenderer) {
  try {
    dataDirectory =
      isElectronRenderer && window.DiscordNative.fileManager.getMLDataDirSync
        ? window.DiscordNative.fileManager.getMLDataDirSync()
        : null;
  } catch (e) {
    console.error('Failed to get ML data directory: ', e);
  }
}

const isLogDirAvailable = globalThis.window?.DiscordNative?.fileManager?.getAndCreateLogDirectorySync;
let initializationParams;
if (isLogDirAvailable) {
  const logDirectory = window.DiscordNative.fileManager.getAndCreateLogDirectorySync(window);
  const logLevel = window.DiscordNative.fileManager.logLevelSync(window);
  initializationParams = {logDirectory, logLevel};
} else {
  console.warn('Unable to find log directory');
}

function promisify(func, ...prefixArgs) {
  return (...args) =>
    new Promise((resolve, reject) => func(...prefixArgs, ...args, resolve, (msg) => reject(new Error(msg))));
}

// MLModule.setML = promisify(MLModule._setML);
MLModule.setupResources = promisify(MLModule._setupResources, dataDirectory);
MLModule.setMLResultCallback = promisify(MLModule._setMLResultCallback);
// MLModule.setCatalog = promisify(MLModule._setCatalog);
// MLModule.setVoiceFilterLaggingCallback = promisify(MLModule._setVoiceFilterLaggingCallback);
// MLModule.setMLReadyCallback = promisify(MLModule._setMLReadyCallback);

console.info('Initializing ML module');
MLModule._initialize(initializationParams);

module.exports = MLModule;
