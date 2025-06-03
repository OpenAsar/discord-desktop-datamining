"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerBuildOverrideUtils = registerBuildOverrideUtils;
var _electron = _interopRequireDefault(require("electron"));
var _ipcMain = _interopRequireDefault(require("./ipcMain"));
var _Constants = _interopRequireDefault(require("./Constants"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BUILD_OVERRIDE_COOKIE_NAME = 'buildOverride';
const IPCEvents = _Constants.default.IPCEvents;
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
  } catch (error) {
    console.error('Error decoding build override cookie in main process:', error);
    return 'failed decoding';
  }
}
async function getBuildOverrideCookie() {
  const cookies = await _electron.default.session.defaultSession.cookies.get({
    name: BUILD_OVERRIDE_COOKIE_NAME
  });
  if (cookies.length === 1) {
    return cookies[0];
  } else {
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
  _ipcMain.default.handle(IPCEvents.GET_BUILD_OVERRIDE_STATUS, async () => {
    try {
      const buildOverrideCookie = await getBuildOverrideCookie();
      return buildOverrideCookie !== null ? tryDecodeCookie(buildOverrideCookie.value) : null;
    } catch (error) {
      console.error('Error checking for build override cookie in main process:', error);
      return null;
    }
  });
  _ipcMain.default.handle(IPCEvents.CLEAR_BUILD_OVERRIDE, async () => {
    try {
      const buildOverrideCookie = await getBuildOverrideCookie();
      if (buildOverrideCookie === null) {
        console.log('No build override cookie found.');
        return false;
      }
      const url = getCookieUrl(buildOverrideCookie);
      await _electron.default.session.defaultSession.cookies.remove(url, BUILD_OVERRIDE_COOKIE_NAME);
      console.log('Build override cookie cleared.');
      return true;
    } catch (error) {
      console.error('Error clearing build override cookie in main process:', error);
      return false;
    }
  });
}