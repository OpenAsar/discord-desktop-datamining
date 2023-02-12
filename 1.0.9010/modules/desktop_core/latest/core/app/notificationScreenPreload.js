"use strict";

const {
  contextBridge,
  ipcRenderer
} = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (event, ...args) => {
    ipcRenderer.send(`DISCORD_${event}`, ...args);
  },
  on: (event, callback) => {
    ipcRenderer.on(`DISCORD_${event}`, callback);
  },
  removeListener: (event, callback) => {
    ipcRenderer.removeListener(`DISCORD_${event}`, callback);
  }
});