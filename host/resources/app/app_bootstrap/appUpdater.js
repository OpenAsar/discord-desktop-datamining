"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusSplash = focusSplash;
exports.update = update;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var splashScreen = _interopRequireWildcard(require("./splashScreen"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const USE_PINNED_UPDATE_MANIFEST = 'USE_PINNED_UPDATE_MANIFEST';
function winUpdateRegVersion(updater, callback) {
  if (process.platform !== 'win32') {
    return;
  }
  const buildInfo = require('./buildInfo');
  const releaseChannelSuffix = (() => {
    if (buildInfo.releaseChannel === 'stable') {
      return '';
    } else if (buildInfo.releaseChannel === 'ptb') {
      return 'PTB';
    } else if (buildInfo.releaseChannel === 'canary') {
      return 'Canary';
    } else if (buildInfo.releaseChannel === 'development') {
      return 'Development';
    }
    return null;
  })();
  if (releaseChannelSuffix == null) {
    return;
  }
  const versions = updater.queryCurrentVersionsSync();
  const hostVersion = versions === null || versions === void 0 ? void 0 : versions.current_host;
  if (hostVersion == null || hostVersion.length !== 3) {
    return;
  }
  const hostVersionStr = hostVersion[0] + '.' + hostVersion[1] + '.' + hostVersion[2];
  console.log(`Updating registry install version to: ${hostVersionStr}`);
  const windowsUtils = require('./windowsUtils');
  windowsUtils.addToRegistry([['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\' + ('Discord' + releaseChannelSuffix), '/v', 'DisplayVersion', '/d', hostVersionStr]], callback);
}
function update(startMinimized, doneCallback, showCallback) {
  const buildInfo = require('./buildInfo');
  const bootstrapConstants = require('./Constants');
  const {
    getUpdater,
    tryInitUpdater,
    INCONSISTENT_INSTALLER_STATE_ERROR
  } = require('../common/updater');
  const {
    getSettings
  } = require('./appSettings');
  const settings = getSettings();
  const isStandaloneModules = buildInfo.releaseChannel === 'development' && buildInfo.standaloneModules;
  if (bootstrapConstants.USE_NEW_UPDATER && !isStandaloneModules && tryInitUpdater(buildInfo, bootstrapConstants.NEW_UPDATE_ENDPOINT, bootstrapConstants.USE_RUST_BSPATCH)) {
    const updater = getUpdater();
    const usePinnedUpdateManifest = (settings === null || settings === void 0 ? void 0 : settings.get(USE_PINNED_UPDATE_MANIFEST)) ?? false;
    const autoStart = require('./autoStart');
    const firstRun = require('./firstRun');
    if (updater != null) {
      const {
        handled,
        fatal
      } = require('./errorHandler');
      updater.on('host-updated', () => {
        autoStart.update(() => {});
        winUpdateRegVersion(updater, () => {});
      });
      updater.on('unhandled-exception', fatal);
      updater.on(INCONSISTENT_INSTALLER_STATE_ERROR, fatal);
      updater.on('update-error', handled);
      updater.on('starting-new-host', () => {
        splashScreen.events.removeListener(splashScreen.APP_SHOULD_LAUNCH, doneCallback);
        splashScreen.events.removeListener(splashScreen.APP_SHOULD_SHOW, showCallback);
      });
    }
    if (usePinnedUpdateManifest) {
      const {
        fatal
      } = require('./errorHandler');
      const paths = require('../common/paths');
      const manifestPath = _path.default.join(paths.getUserData() ?? '', 'pinned_update.json');
      try {
        const manifest = _fs.default.readFileSync(manifestPath);
        updater === null || updater === void 0 ? void 0 : updater.setPinnedManifestSync(JSON.parse(manifest.toString('utf-8')));
      } catch (err) {
        console.error(`Could not read pinned manifest! (code: ${err.code})`);
        fatal(err);
      }
    }
    firstRun.performFirstRunTasks(updater);
  } else {
    const moduleUpdater = require('../common/moduleUpdater');
    moduleUpdater.init(bootstrapConstants.UPDATE_ENDPOINT, settings, buildInfo);
  }
  splashScreen.initSplash(startMinimized);
  splashScreen.events.once(splashScreen.APP_SHOULD_LAUNCH, doneCallback);
  splashScreen.events.once(splashScreen.APP_SHOULD_SHOW, showCallback);
}
function focusSplash() {
  splashScreen.focusWindow();
}