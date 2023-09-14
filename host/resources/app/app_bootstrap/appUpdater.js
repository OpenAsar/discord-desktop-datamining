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
var autoStart = _interopRequireWildcard(require("./autoStart"));
var _buildInfo = _interopRequireDefault(require("./buildInfo"));
var _errorHandler = require("./errorHandler");
var firstRun = _interopRequireWildcard(require("./firstRun"));
var splashScreen = _interopRequireWildcard(require("./splashScreen"));
var _Constants = require("./Constants");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const USE_PINNED_UPDATE_MANIFEST = 'USE_PINNED_UPDATE_MANIFEST';
function update(startMinimized, doneCallback, showCallback) {
  const settings = (0, _appSettings.getSettings)();
  if ((0, _updater.tryInitUpdater)(_buildInfo.default, _Constants.NEW_UPDATE_ENDPOINT)) {
    const updater = (0, _updater.getUpdater)();
    const usePinnedUpdateManifest = settings.get(USE_PINNED_UPDATE_MANIFEST);
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
    if (usePinnedUpdateManifest) {
      const manifestPath = _path.default.join(paths.getUserData(), 'pinned_update.json');
      try {
        const manifest = _fs.default.readFileSync(manifestPath);
        updater.setPinnedManifestSync(JSON.parse(manifest));
      } catch (err) {
        console.error(`Could not read pinned manifest! (code: ${err.code})`);
        (0, _errorHandler.fatal)(err);
      }
    }
    firstRun.performFirstRunTasks(updater);
  } else {
    moduleUpdater.init(_Constants.UPDATE_ENDPOINT, settings, _buildInfo.default);
  }
  splashScreen.initSplash(startMinimized);
  splashScreen.events.once(splashScreen.APP_SHOULD_LAUNCH, doneCallback);
  splashScreen.events.once(splashScreen.APP_SHOULD_SHOW, showCallback);
}
function focusSplash() {
  splashScreen.focusWindow();
}