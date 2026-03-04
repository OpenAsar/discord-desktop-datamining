const util = require('util');
const childProcess = require('child_process');
const execFile = util.promisify(childProcess.execFile);
const fs = require('fs');
const path = require('path');
const {wrapInputEventRegister, wrapInputEventUnregister} = require('./input_event');
const {getNotificationState} = require('windows-notification-state');

/* eslint-disable no-console */

module.exports = require('./discord_utils.node');
module.exports.clearCandidateGamesCallback = module.exports.setCandidateGamesCallback;

const isElectronRenderer = typeof window !== 'undefined' && window.DiscordNative?.isRenderer;

if (isElectronRenderer) {
  const {inputCaptureSetWatcher, inputCaptureRegisterElement} = require('./input_capture');
  inputCaptureSetWatcher(module.exports.inputWatchAll);
  delete module.exports.inputWatchAll;
  module.exports.inputCaptureRegisterElement = inputCaptureRegisterElement;
} else {
  delete module.exports.inputWatchAll;
}

module.exports.inputEventRegister = wrapInputEventRegister(module.exports.inputEventRegister);
module.exports.inputEventUnregister = wrapInputEventUnregister(module.exports.inputEventUnregister);
let dataDirectory;
if (isElectronRenderer) {
  try {
    dataDirectory = window.DiscordNative.fileManager.getModuleDataPathSync
      ? path.join(window.DiscordNative.fileManager.getModuleDataPathSync(), 'discord_utils')
      : null;
  } catch (e) {
    console.error('Failed to get data directory: ', e);
  }
  if (dataDirectory != null) {
    try {
      fs.mkdirSync(dataDirectory, {recursive: true});
    } catch (e) {
      console.warn('Could not create utils data directory ', dataDirectory, ':', e);
    }
  }
}

// Init logging
if (isElectronRenderer) {
  const isFileManagerAvailable = window.DiscordNative?.fileManager;
  const isLogDirAvailable = isFileManagerAvailable?.getAndCreateLogDirectorySync;
  if (isLogDirAvailable) {
    const logDirectory = window.DiscordNative.fileManager.getAndCreateLogDirectorySync();
    const logLevel = window.DiscordNative.fileManager.logLevelSync();
    module.exports.init({logDirectory: logDirectory, logLevel: logLevel});
  } else {
    console.warn('Unable to find log directory');
    module.exports.init();
  }
} else {
  module.exports.init();
}

if (process.platform === 'win32' && isElectronRenderer) {
  const releaseChannel = window.DiscordNative?.app?.getReleaseChannel?.();
  if (releaseChannel) {
    console.log('service release channel:', releaseChannel);
    module.exports.setServiceChannel?.(releaseChannel);
  }
}

function parseNvidiaSmiOutput(result) {
  if (!result || !result.stdout) {
    return {error: 'nvidia-smi produced no output'};
  }

  const match = result.stdout.match(/Driver Version: (\d+)\.(\d+)/);

  if (match.length === 3) {
    return {major: parseInt(match[1], 10), minor: parseInt(match[2], 10)};
  } else {
    return {error: 'failed to parse nvidia-smi output'};
  }
}

module.exports.getGPUDriverVersions = async () => {
  if (process.platform !== 'win32') {
    return {};
  }

  const result = {};
  const nvidiaSmiPath = `"${process.env['SystemRoot']}/System32/nvidia-smi.exe"`;

  try {
    result.nvidia = parseNvidiaSmiOutput(await execFile(nvidiaSmiPath, {windowsHide: true}));
  } catch (e) {
    result.nvidia = {error: e.toString()};
  }

  return result;
};

module.exports.submitLiveCrashReport = async (channel, sentryMetadata) => {
  console.log('submitLiveCrashReport: submitting...');

  const path = module.exports._generateLiveMinidump(dataDirectory);
  if (!path) {
    console.log('submitLiveCrashReport: minidump not created.');
    return null;
  }

  try {
    const fileData = await fs.promises.readFile(path);
    const blob = new Blob([fileData], {type: 'text/plain'});

    const formData = new FormData();
    formData.append('upload_file_minidump', blob, 'live_minidump.dmp');
    formData.append('channel', channel);
    formData.append('sentry', JSON.stringify(sentryMetadata));

    const sentryEndPoint =
      'https://o64374.ingest.sentry.io/api/146342/minidump/?sentry_key=f11e8c3e62cb46b5a006c339b2086ba3';
    const response = await fetch(sentryEndPoint, {
      method: 'POST',
      body: formData,
    });

    console.log('submitLiveCrashReport: completed.', response);
  } catch (e) {
    console.error('submitLiveCrashReport: error', e);
  }
};

module.exports.shouldDisplayNotifications = () => {
  const dnd = false;
  let shouldDisplay = true;
  if (process.platform === 'win32') {
    const state = getNotificationState();
    shouldDisplay = state === 'QUNS_ACCEPTS_NOTIFICATIONS' || state === 'QUNS_APP';
  }

  return !dnd && shouldDisplay;
};
