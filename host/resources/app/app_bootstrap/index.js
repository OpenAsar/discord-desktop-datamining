"use strict";

const buildInfo = require('./buildInfo');
const paths = require('../common/paths');
paths.init(buildInfo);
const moduleUpdater = require('../common/moduleUpdater');
const updater = require('../common/updater');
const requireNative = require('./requireNative');
function getAppMode() {
  if (process.argv && process.argv.includes('--overlay-host')) {
    return 'overlay-host';
  }
  return 'app';
}
const mode = getAppMode();
if (mode === 'app') {
  require('./bootstrap');
} else if (mode === 'overlay-host') {
  const appSettings = require('./appSettings');
  appSettings.init();
  const {
    NEW_UPDATE_ENDPOINT
  } = require('./Constants');
  if (!buildInfo.debug && buildInfo.newUpdater) {
    if (!updater.tryInitUpdater(buildInfo, NEW_UPDATE_ENDPOINT)) {
      throw new Error('Failed to initialize modules in overlay host.');
    }
    updater.getUpdater().startCurrentVersionSync({
      allowObsoleteHost: true
    });
  } else {
    moduleUpdater.initPathsOnly(buildInfo);
  }
  requireNative('discord_overlay2/standalone_host.js');
}