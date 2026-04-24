"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldOpenExternalUrl = shouldOpenExternalUrl;
exports.saferShellOpenExternal = saferShellOpenExternal;
exports.checkUrlOriginMatches = checkUrlOriginMatches;
const electron_1 = require("electron");
const url_1 = __importDefault(require("url"));
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
];
function shouldOpenExternalUrl(externalUrl) {
    let parsedUrl;
    try {
        parsedUrl = url_1.default.parse(externalUrl);
    }
    catch (_) {
        return false;
    }
    if (parsedUrl.protocol == null || BLOCKED_URL_PROTOCOLS.includes(parsedUrl.protocol.toLowerCase())) {
        return false;
    }
    return true;
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
        parsedUrlA = url_1.default.parse(urlA);
        parsedUrlB = url_1.default.parse(urlB);
    }
    catch (_) {
        return false;
    }
    return (parsedUrlA.protocol === parsedUrlB.protocol
        && parsedUrlA.slashes === parsedUrlB.slashes
        && parsedUrlA.host === parsedUrlB.host);
}
