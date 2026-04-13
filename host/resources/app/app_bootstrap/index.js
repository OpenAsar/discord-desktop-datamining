"use strict";

performance.mark('index-init');
const buildInfo = require('./buildInfo');
const paths = require('../common/paths');
paths.init(buildInfo);
function getAppMode() {
  if (process.argv != null && process.argv.includes('--overlay-host')) {
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
    NEW_UPDATE_ENDPOINT,
    USE_RUST_BSPATCH,
    USE_NEW_UPDATER
  } = require('./Constants');
  const isStandaloneModules = buildInfo.releaseChannel === 'development' && buildInfo.standaloneModules;
  if (USE_NEW_UPDATER && !buildInfo.debug && !isStandaloneModules && buildInfo.newUpdater) {
    var _getUpdater;
    const {
      getUpdater,
      tryInitUpdater
    } = require('../common/updater');
    if (!tryInitUpdater(buildInfo, NEW_UPDATE_ENDPOINT, USE_RUST_BSPATCH)) {
      throw new Error('Failed to initialize modules in overlay host.');
    }
    (_getUpdater = getUpdater()) === null || _getUpdater === void 0 ? void 0 : _getUpdater.startCurrentVersionSync({
      allowObsoleteHost: true
    });
  } else {
    const moduleUpdater = require('./moduleUpdater');
    moduleUpdater.initPathsOnly(buildInfo);
  }
  const requireNative = require('./requireNative');
  requireNative('discord_overlay2/standalone_host.js');
}
performance.measure('index-init-duration', 'index-init');