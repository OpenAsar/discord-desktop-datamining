"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerBuildOverrideUtils = registerBuildOverrideUtils;
var _electron = _interopRequireDefault(require("electron"));
var _ipcMain = _interopRequireDefault(require("../../ipcMain"));
var _constants = require("../common/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BUILD_OVERRIDE_COOKIE_NAME = 'buildOverride';
function tryDecodeCookie(encodedValue) {
  try {
    const urlDecoded = decodeURIComponent(encodedValue);
    const payload = urlDecoded.split('.')[1];
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf8');
    const buildOverride = JSON.parse(decodedPayload);
    return buildOverride['discord_web']['id'];
  } catch (error) {
    console.error('Error decoding build override cookie in main process:', error);
    return 'failed decoding';
  }
}
function registerBuildOverrideUtils(webappEndpoint) {
  _ipcMain.default.handle(_constants.IPCEvents.GET_BUILD_OVERRIDE_STATUS, async () => {
    try {
      const cookies = await _electron.default.session.defaultSession.cookies.get({
        url: webappEndpoint,
        name: BUILD_OVERRIDE_COOKIE_NAME
      });
      if (cookies.length === 1) {
        const encodedValue = cookies[0].value;
        return tryDecodeCookie(encodedValue);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error checking for build override cookie in main process:', error);
      return null;
    }
  });
  _ipcMain.default.handle(_constants.IPCEvents.CLEAR_BUILD_OVERRIDE, async () => {
    try {
      await _electron.default.session.defaultSession.cookies.remove(webappEndpoint, BUILD_OVERRIDE_COOKIE_NAME);
      console.log('Build override cookie cleared.');
      return true;
    } catch (error) {
      console.error('Error clearing build override cookie in main process:', error);
      return false;
    }
  });
}