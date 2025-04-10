"use strict";

var moduleUpdater = _interopRequireWildcard(require("../common/moduleUpdater"));
var paths = _interopRequireWildcard(require("../common/paths"));
var _updater = require("../common/updater");
var _buildInfo = _interopRequireDefault(require("./buildInfo"));
var _requireNative = _interopRequireDefault(require("./requireNative"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
paths.init(_buildInfo.default);
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
    moduleUpdater.initPathsOnly(_buildInfo.default);
  }
  (0, _requireNative.default)('discord_overlay2/standalone_host.js');
}