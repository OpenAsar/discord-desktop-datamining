"use strict";

const electron = require('electron');

function getDesktopCaptureSources(options) {
  return new Promise(resolve => {
    var sourcesPromise;

    if (electron.desktopCapturer) {
      // TODO(atlante45): For backwards compatibility with Electron 13, remove once we've fully
      // transitionned off of Electron 13
      sourcesPromise = electron.desktopCapturer.getSources(options);
    } else {
      sourcesPromise = electron.ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', options);
    }

    sourcesPromise.then(sources => {
      return resolve(sources.map(source => {
        return {
          id: source.id,
          name: source.name,
          url: source.thumbnail.toDataURL()
        };
      }));
    });
  });
}

module.exports = {
  getDesktopCaptureSources
};