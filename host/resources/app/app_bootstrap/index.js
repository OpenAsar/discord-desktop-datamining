"use strict";

var _moduleUpdater = require("../common/moduleUpdater");
var _paths = require("../common/paths");
var _updater = require("../common/updater");
var _buildInfo = _interopRequireDefault(require("./buildInfo"));
var _requireNative = _interopRequireDefault(require("./requireNative"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _paths.init)(_buildInfo.default);
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
    NEW_UPDATE_ENDPOINT
  } = require('./Constants');
  const isStandaloneModules = _buildInfo.default.releaseChannel === 'development' && _buildInfo.default.standaloneModules;
  if (!_buildInfo.default.debug && !isStandaloneModules && _buildInfo.default.newUpdater) {
    var _getUpdater;
    if (!(0, _updater.tryInitUpdater)(_buildInfo.default, NEW_UPDATE_ENDPOINT)) {
      throw new Error('Failed to initialize modules in overlay host.');
    }
    (_getUpdater = (0, _updater.getUpdater)()) === null || _getUpdater === void 0 ? void 0 : _getUpdater.startCurrentVersionSync({
      allowObsoleteHost: true
    });
  } else {
    (0, _moduleUpdater.initPathsOnly)(_buildInfo.default);
  }
  (0, _requireNative.default)('discord_overlay2/standalone_host.js');
}