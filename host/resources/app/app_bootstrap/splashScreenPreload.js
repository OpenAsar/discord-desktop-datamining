"use strict";

const {
  contextBridge,
  ipcRenderer
} = require('electron');
const {
  saferShellOpenExternal
} = require('../common/securityUtils');
contextBridge.exposeInMainWorld('DiscordSplash', {
  getReleaseChannel: () => {
    const buildInfo = require('./buildInfo');
    return buildInfo.releaseChannel;
  },
  signalReady: () => {
    console.log(`DiscordSplash.signalReady`);
    ipcRenderer.send('DISCORD_SPLASH_SCREEN_READY');
  },
  onStateUpdate: callback => {
    ipcRenderer.on('DISCORD_SPLASH_UPDATE_STATE', (_, state) => {
      console.log(`DiscordSplash.onStateUpdate: ${JSON.stringify(state)}`);
      callback(state);
    });
  },
  onQuoteUpdate: callback => {
    ipcRenderer.on('DISCORD_SPLASH_SCREEN_QUOTE', (_, quote) => {
      callback(quote);
    });
  },
  openUrl: saferShellOpenExternal,
  quitDiscord: () => {
    ipcRenderer.send('DISCORD_SPLASH_SCREEN_QUIT');
  }
});