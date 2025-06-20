/* eslint-disable no-console */

const VoiceFiltersModule = require('./discord_voice_filters.node');

const isElectronRenderer = window?.DiscordNative?.isRenderer != null;

let dataDirectory;
if (isElectronRenderer) {
  try {
    dataDirectory =
      isElectronRenderer && window.DiscordNative.fileManager.getVoiceFilterDataDirSync
        ? window.DiscordNative.fileManager.getVoiceFilterDataDirSync()
        : null;
  } catch (e) {
    console.error('Failed to get voice filters data directory: ', e);
  }
}

const isLogDirAvailable = window?.DiscordNative?.fileManager?.getAndCreateLogDirectorySync;
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

VoiceFiltersModule.setVoiceFilter = promisify(VoiceFiltersModule._setVoiceFilter);
VoiceFiltersModule.setupResources = promisify(VoiceFiltersModule._setupResources, dataDirectory);
VoiceFiltersModule.fetchCatalog = promisify(VoiceFiltersModule._fetchCatalog);
VoiceFiltersModule.setCatalog = promisify(VoiceFiltersModule._setCatalog);
VoiceFiltersModule.setVoiceFilterLaggingCallback = promisify(VoiceFiltersModule._setVoiceFilterLaggingCallback);
VoiceFiltersModule.setVoiceFilterReadyCallback = promisify(VoiceFiltersModule._setVoiceFilterReadyCallback);

console.info('Initializing voice filters module');
VoiceFiltersModule._initialize(initializationParams);

module.exports = VoiceFiltersModule;
