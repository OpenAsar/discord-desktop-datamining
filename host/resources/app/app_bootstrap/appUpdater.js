"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusSplash = focusSplash;
exports.update = update;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var moduleUpdater = _interopRequireWildcard(require("../common/moduleUpdater"));
var paths = _interopRequireWildcard(require("../common/paths"));
var _updater = require("../common/updater");
var _appSettings = require("./appSettings");
var _buildInfo = _interopRequireDefault(require("./buildInfo"));
var _errorHandler = require("./errorHandler");
var splashScreen = _interopRequireWildcard(require("./splashScreen"));
var _Constants = _interopRequireDefault(require("./Constants"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const USE_PINNED_UPDATE_MANIFEST = 'USE_PINNED_UPDATE_MANIFEST';
function update(startMinimized, doneCallback, showCallback) {
  const settings = (0, _appSettings.getSettings)();
  const isStandaloneModules = _buildInfo.default.releaseChannel === 'development' && _buildInfo.default.standaloneModules;
  if (!isStandaloneModules && (0, _updater.tryInitUpdater)(_buildInfo.default, _Constants.default.NEW_UPDATE_ENDPOINT)) {
    const updater = (0, _updater.getUpdater)();
    const usePinnedUpdateManifest = (settings === null || settings === void 0 ? void 0 : settings.get(USE_PINNED_UPDATE_MANIFEST)) ?? false;
    const autoStart = require('./autoStart');
    const firstRun = require('./firstRun');
    if (updater != null) {
      updater.on('host-updated', () => {
        autoStart.update(() => {});
      });
      updater.on('unhandled-exception', _errorHandler.fatal);
      updater.on(_updater.INCONSISTENT_INSTALLER_STATE_ERROR, _errorHandler.fatal);
      updater.on('update-error', _errorHandler.handled);
      updater.on('starting-new-host', () => {
        splashScreen.events.removeListener(splashScreen.APP_SHOULD_LAUNCH, doneCallback);
        splashScreen.events.removeListener(splashScreen.APP_SHOULD_SHOW, showCallback);
      });
    }
    if (usePinnedUpdateManifest) {
      const manifestPath = _path.default.join(paths.getUserData() ?? '', 'pinned_update.json');
      try {
        const manifest = _fs.default.readFileSync(manifestPath);
        updater === null || updater === void 0 ? void 0 : updater.setPinnedManifestSync(JSON.parse(manifest.toString('utf-8')));
      } catch (err) {
        console.error(`Could not read pinned manifest! (code: ${err.code})`);
        (0, _errorHandler.fatal)(err);
      }
    }
    firstRun.performFirstRunTasks(updater);
  } else {
    moduleUpdater.init(_Constants.default.UPDATE_ENDPOINT, settings, _buildInfo.default);
  }
  splashScreen.initSplash(startMinimized);
  splashScreen.events.once(splashScreen.APP_SHOULD_LAUNCH, doneCallback);
  splashScreen.events.once(splashScreen.APP_SHOULD_SHOW, showCallback);
}
function focusSplash() {
  splashScreen.focusWindow();
}