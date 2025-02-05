/* eslint-disable no-console */

const VoiceFiltersModule = require('./discord_voice_filters.node');
const path = require('path');

const isElectronRenderer = window?.DiscordNative?.isRenderer != null;

let dataDirectory;
if (isElectronRenderer) {
  try {
    dataDirectory =
      isElectronRenderer && window.DiscordNative.fileManager.getModuleDataPathSync
        ? path.join(window.DiscordNative.fileManager.getModuleDataPathSync(), 'discord_voice_filters', 'data')
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

console.info('Initializing voice filters module');
VoiceFiltersModule._initialize(initializationParams);

VoiceFiltersModule.setVoiceFilter = (voiceParams) =>
  new Promise((resolve, reject) =>
    VoiceFiltersModule._setVoiceFilter(voiceParams, resolve, (msg) => reject(new Error(msg))),
  );

VoiceFiltersModule.setupResources = () =>
  new Promise((resolve) => VoiceFiltersModule._setupResources(dataDirectory, resolve));

VoiceFiltersModule.fetchCatalog = (token, superProperties) =>
  new Promise((resolve, reject) =>
    VoiceFiltersModule._fetchCatalog(token, superProperties, resolve, (msg) => reject(new Error(msg))),
  );

module.exports = VoiceFiltersModule;
