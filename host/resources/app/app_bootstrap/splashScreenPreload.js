"use strict";

var _electron = require("electron");
var _securityUtils = require("../common/securityUtils");
var _buildInfo = _interopRequireDefault(require("./buildInfo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  quitDiscord: () => {
    _electron.ipcRenderer.send('DISCORD_SPLASH_SCREEN_QUIT');
  }
});