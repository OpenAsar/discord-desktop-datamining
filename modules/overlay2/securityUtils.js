"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldOpenExternalUrl = shouldOpenExternalUrl;
exports.saferShellOpenExternal = saferShellOpenExternal;
exports.checkUrlOriginMatches = checkUrlOriginMatches;
const electron_1 = require("electron");
const BLOCKED_URL_PROTOCOLS = [
    'file:',
    'javascript:',
    'vbscript:',
    'data:',
    'about:',
    'chrome:',
    'ms-cxh:',
    'ms-cxh-full:',
    'ms-word:',
    'shell:',
    'ms-msdt:',
    'search-ms:',
    'search:',
    'explorer.assocprotocol.search-ms:',
    'ms-device-enrollment:',
    'ldap:',
    'ldaps:',
    'smb:',
    'ms-officecmd:',
    'ms-appinstaller:',
];
const MIN_URL_SCHEME_LENGTH = 2;
function isAllowedWindowsSettingsUrl(externalUrl) {
    const destination = externalUrl.slice(externalUrl.indexOf(':') + 1);
    if (['privacy-microphone', 'privacy-webcam', 'camera', 'sound'].includes(destination)) {
        return true;
    }
    if (/^sound-properties\?endpointId=[a-zA-Z0-9{}._-]*$/.test(destination)) {
        return true;
    }
    const cameraId = /^camera\?cameraId=([^&#]*)$/.exec(destination)?.[1];
    if (cameraId == null) {
        return false;
    }
    try {
        const decodedCameraId = decodeURIComponent(cameraId);
        return !/[\x00-\x1f\x7f]/.test(decodedCameraId) && encodeURIComponent(decodedCameraId) === cameraId;
    }
    catch (_) {
        return false;
    }
}
function shouldOpenExternalUrl(externalUrl) {
    if (typeof externalUrl !== 'string' || externalUrl.trim() !== externalUrl || /[\x00-\x1f\x7f]/.test(externalUrl)) {
        return false;
    }
    let protocol;
    try {
        protocol = new URL(externalUrl).protocol.toLowerCase();
    }
    catch (_) {
        return false;
    }
    if (BLOCKED_URL_PROTOCOLS.includes(protocol)) {
        return false;
    }
    if (protocol.replace(/:$/, '').length < MIN_URL_SCHEME_LENGTH) {
        return false;
    }
    return protocol !== 'ms-settings:' || isAllowedWindowsSettingsUrl(externalUrl);
}
function saferShellOpenExternal(externalUrl) {
    if (shouldOpenExternalUrl(externalUrl)) {
        return electron_1.shell.openExternal(externalUrl);
    }
    else {
        return Promise.reject(new Error('External url open request blocked'));
    }
}
function checkUrlOriginMatches(urlA, urlB) {
    let parsedUrlA;
    let parsedUrlB;
    try {
        parsedUrlA = new URL(urlA);
        parsedUrlB = new URL(urlB);
    }
    catch (_) {
        return false;
    }
    return parsedUrlA.protocol === parsedUrlB.protocol && parsedUrlA.host === parsedUrlB.host;
}
