"use strict";

var moduleUpdater = _interopRequireWildcard(require("../common/moduleUpdater"));
var paths = _interopRequireWildcard(require("../common/paths"));
var _updater = require("../common/updater");
var _buildInfo = _interopRequireDefault(require("./buildInfo"));
var _requireNative = _interopRequireDefault(require("./requireNative"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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