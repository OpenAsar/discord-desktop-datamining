"use strict";

var _electron = require("electron");
var _securityUtils = require("../common/securityUtils");
var _buildInfo = _interopRequireDefault(require("./buildInfo"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const quitDiscord = () => {
  _electron.ipcRenderer.send('DISCORD_SPLASH_SCREEN_QUIT');
};
_electron.contextBridge.exposeInMainWorld('DiscordSplash', {
  getReleaseChannel: () => {
    return _buildInfo.default.releaseChannel;
  },
  signalReady: () => {
    console.log(`DiscordSplash.signalReady`);
    _electron.ipcRenderer.send('DISCORD_SPLASH_SCREEN_READY');
  },
  onStateUpdate: callback => {
    _electron.ipcRenderer.on('DISCORD_SPLASH_UPDATE_STATE', (_, state) => {
      console.log(`DiscordSplash.onStateUpdate: ${JSON.stringify(state)}`);
      callback(state);
    });
  },
  onQuoteUpdate: callback => {
    _electron.ipcRenderer.on('DISCORD_SPLASH_SCREEN_QUOTE', (_, quote) => {
      callback(quote);
    });
  },
  openUrl: _securityUtils.saferShellOpenExternal,
  quitDiscord,
  getBuildOverride: async () => {
    try {
      const buildOverride = await _electron.ipcRenderer.invoke('DISCORD_GET_BUILD_OVERRIDE_STATUS');
      return buildOverride;
    } catch (error) {
      console.error('Error fetching build override status:', error);
      return null;
    }
  },
  clearBuildOverride: async () => {
    try {
      const success = await _electron.ipcRenderer.invoke('DISCORD_CLEAR_BUILD_OVERRIDE');
      console.log(`DiscordSplash.clearBuildOverride: cookie cleared ${success}`);
      quitDiscord();
      return success;
    } catch (error) {
      console.error('Error clearing build override cookie:', error);
      return false;
    }
  }
});