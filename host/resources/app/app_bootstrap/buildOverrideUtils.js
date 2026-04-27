"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBuildOverrideUtils = registerBuildOverrideUtils;
const electron_1 = __importDefault(require("electron"));
const ipcMain_1 = __importDefault(require("./ipcMain"));
const Constants_1 = __importDefault(require("./Constants"));
const BUILD_OVERRIDE_COOKIE_NAME = 'buildOverride';
const IPCEvents = Constants_1.default.IPCEvents;
function tryDecodeCookie(encodedValue) {
    try {
        const urlDecoded = decodeURIComponent(encodedValue);
        const payload = urlDecoded.split('.')[1];
        const decodedPayload = Buffer.from(payload, 'base64').toString('utf8');
        const buildOverride = JSON.parse(decodedPayload);
        if (buildOverride['discord_web'] == null) {
            return null;
        }
        return buildOverride['discord_web']['id'];
    }
    catch (error) {
        console.error('Error decoding build override cookie in main process:', error);
        return 'failed decoding';
    }
}
async function getBuildOverrideCookie() {
    const cookies = await electron_1.default.session.defaultSession.cookies.get({
        name: BUILD_OVERRIDE_COOKIE_NAME,
    });
    if (cookies.length === 1) {
        return cookies[0];
    }
    else {
        return null;
    }
}
function getCookieUrl(cookie) {
    if (cookie.domain == null) {
        throw new Error('Build override cookie has no domain');
    }
    const protocol = cookie.secure ? 'https' : 'http';
    const domain = cookie.domain.startsWith('.') ? cookie.domain.slice(1) : cookie.domain;
    const path = cookie.path !== null ? cookie.path : '/';
    return `${protocol}://${domain}${path}`;
}
function registerBuildOverrideUtils() {
    ipcMain_1.default.handle(IPCEvents.GET_BUILD_OVERRIDE_STATUS, async () => {
        try {
            const buildOverrideCookie = await getBuildOverrideCookie();
            return buildOverrideCookie !== null ? tryDecodeCookie(buildOverrideCookie.value) : null;
        }
        catch (error) {
            console.error('Error checking for build override cookie in main process:', error);
            return null;
        }
    });
    ipcMain_1.default.handle(IPCEvents.CLEAR_BUILD_OVERRIDE, async () => {
        try {
            const buildOverrideCookie = await getBuildOverrideCookie();
            if (buildOverrideCookie === null) {
                console.log('No build override cookie found.');
                return false;
            }
            const url = getCookieUrl(buildOverrideCookie);
            await electron_1.default.session.defaultSession.cookies.remove(url, BUILD_OVERRIDE_COOKIE_NAME);
            console.log('Build override cookie cleared.');
            return true;
        }
        catch (error) {
            console.error('Error clearing build override cookie in main process:', error);
            return false;
        }
    });
}
