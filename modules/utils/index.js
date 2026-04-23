"use strict";
const util = require('util');
const childProcess = require('child_process');
const execFile = util.promisify(childProcess.execFile);
const fs = require('fs');
const path = require('path');
const { wrapInputEventRegister, wrapInputEventUnregister } = require('./input_event');
const { getNotificationState } = require('windows-notification-state');
const nativeUtils = require('./discord_utils.node');
nativeUtils.clearCandidateGamesCallback = nativeUtils.setCandidateGamesCallback;
const discordNative = globalThis.window?.DiscordNative;
const isElectronRenderer = discordNative?.isRenderer != null;
if (isElectronRenderer) {
    const { inputCaptureSetWatcher, inputCaptureRegisterElement } = require('./input_capture');
    inputCaptureSetWatcher(nativeUtils.inputWatchAll);
    delete nativeUtils.inputWatchAll;
    nativeUtils.inputCaptureRegisterElement = inputCaptureRegisterElement;
}
else {
    delete nativeUtils.inputWatchAll;
}
nativeUtils.inputEventRegister = wrapInputEventRegister(nativeUtils.inputEventRegister);
nativeUtils.inputEventUnregister = wrapInputEventUnregister(nativeUtils.inputEventUnregister);
let dataDirectory = null;
if (isElectronRenderer) {
    try {
        const fileManager = discordNative.fileManager;
        dataDirectory = fileManager.getModuleDataPathSync
            ? path.join(fileManager.getModuleDataPathSync(), 'discord_utils')
            : null;
    }
    catch (e) {
        console.error('Failed to get data directory: ', e);
    }
    if (dataDirectory != null) {
        try {
            fs.mkdirSync(dataDirectory, { recursive: true });
        }
        catch (e) {
            console.warn('Could not create utils data directory ', dataDirectory, ':', e);
        }
    }
}
const isLogDirAvailable = discordNative?.fileManager?.getAndCreateLogDirectorySync;
if (isElectronRenderer && isLogDirAvailable != null) {
    const logDirectory = discordNative.fileManager.getAndCreateLogDirectorySync();
    const logLevel = discordNative.fileManager.logLevelSync();
    nativeUtils.init({ logDirectory, logLevel });
}
else {
    nativeUtils.init();
}
if (process.platform === 'win32' && isElectronRenderer) {
    const releaseChannel = discordNative?.app?.getReleaseChannel?.();
    if (releaseChannel != null && releaseChannel !== '') {
        console.log('service release channel:', releaseChannel);
        nativeUtils.setServiceChannel?.(releaseChannel);
    }
}
function parseNvidiaSmiOutput(result) {
    if (result == null || result.stdout === '') {
        return { error: 'nvidia-smi produced no output' };
    }
    const match = result.stdout.match(/Driver Version: (\d+)\.(\d+)/);
    if (match != null && match.length === 3) {
        return { major: parseInt(match[1], 10), minor: parseInt(match[2], 10) };
    }
    else {
        return { error: 'failed to parse nvidia-smi output' };
    }
}
nativeUtils.getGPUDriverVersions = async () => {
    if (process.platform !== 'win32') {
        return {};
    }
    const result = {};
    const nvidiaSmiPath = `"${process.env['SystemRoot']}/System32/nvidia-smi.exe"`;
    try {
        result.nvidia = parseNvidiaSmiOutput(await execFile(nvidiaSmiPath, { windowsHide: true }));
    }
    catch (e) {
        result.nvidia = { error: e.toString() };
    }
    return result;
};
nativeUtils.submitLiveCrashReport = async (channel, sentryMetadata) => {
    console.log('submitLiveCrashReport: submitting...');
    const path = nativeUtils._generateLiveMinidump(dataDirectory);
    if (!path) {
        console.log('submitLiveCrashReport: minidump not created.');
        return null;
    }
    try {
        const fileData = await fs.promises.readFile(path);
        const blob = new Blob([fileData], { type: 'text/plain' });
        const formData = new FormData();
        formData.append('upload_file_minidump', blob, 'live_minidump.dmp');
        formData.append('channel', channel);
        formData.append('sentry', JSON.stringify(sentryMetadata));
        const sentryEndPoint = 'https://o64374.ingest.sentry.io/api/146342/minidump/?sentry_key=f11e8c3e62cb46b5a006c339b2086ba3';
        const response = await fetch(sentryEndPoint, {
            method: 'POST',
            body: formData,
        });
        console.log('submitLiveCrashReport: completed.', response);
    }
    catch (e) {
        console.error('submitLiveCrashReport: error', e);
    }
    return null;
};
nativeUtils.shouldDisplayNotifications = () => {
    let shouldDisplay = true;
    if (process.platform === 'win32') {
        const state = getNotificationState();
        shouldDisplay = state === 'QUNS_ACCEPTS_NOTIFICATIONS' || state === 'QUNS_APP';
    }
    return shouldDisplay;
};
module.exports = nativeUtils;
