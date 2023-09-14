"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobalSentry = getGlobalSentry;
exports.init = init;
exports.isInitialized = isInitialized;
exports.metadata = void 0;
var _child_process = _interopRequireDefault(require("child_process"));
var blackbox = _interopRequireWildcard(require("./blackbox"));
var processUtils = _interopRequireWildcard(require("./processUtils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let gSentry = null;
let initialized = false;
const metadata = {};
exports.metadata = metadata;
const supportsTls13 = processUtils.supportsTls13();
const SENTRY_PROJECT_ID = '146342';
const SENTRY_PROJECT_HOST = 'o64374';
const STABLE_SENTRY_DSN_KEY = '67a1d187a8602d62872a3d880e723741';
const DEFAULT_SENTRY_DSN_KEY = '384ce4413de74fe0be270abe03b2b35a';
const STAFF_SENTRY_DSN_KEY = 'de156ff7a3f544cca369e77e3f1f5743';
const TEST_SENTRY_DSN_KEY = '1a27a96457b24ff286a000266c573919';
const DEFAULT_SENTRY_DSN = buildSentryDSN(DEFAULT_SENTRY_DSN_KEY);
const CHANNEL_SENTRY_DSN = {
  stable: buildSentryDSN(STABLE_SENTRY_DSN_KEY),
  ptb: buildSentryDSN(TEST_SENTRY_DSN_KEY),
  canary: buildSentryDSN(TEST_SENTRY_DSN_KEY),
  development: buildSentryDSN(TEST_SENTRY_DSN_KEY)
};
function initializeSentrySdk(sentry, buildInfo) {
  sentry.init({
    dsn: getSentryDSN(buildInfo.releaseChannel),
    environment: buildInfo.releaseChannel,
    release: buildInfo.version,
    autoSessionTracking: false,
    maxValueLength: 250,
    beforeSend(event, hint) {
      event.extra = metadata;
      void blackbox.addSentryReport(event, hint);
      return event;
    },
    ignoreErrors: ['EADDRINUSE', 'ResizeObserver loop limit exceeded', 'EACCES: permission denied', 'BetterDiscord', 'VencordPatcher', 'mwittrien.github.io', 'Error: getaddrinfo ENOTFOUND raw.githubusercontent.com'],
    denyUrls: [/betterdiscord:\/\//]
  });
  gSentry = sentry;
}
function init(buildInfo, sentry) {
  if (initialized) {
    console.warn('Ignoring double initialization of crash reporter.');
    return;
  }
  if (process.env.ELECTRON_ENABLE_STACK_DUMPING === 'true') {
    console.warn('Not initializing crash reporter because ELECTRON_ENABLE_STACK_DUMPING is set.');
    return;
  }
  if (sentry != null) {
    initializeSentrySdk(sentry, buildInfo);
  }
  metadata['release_channel'] = buildInfo.releaseChannel;
  const sentryMetadata = metadata['sentry'] != null ? metadata['sentry'] : {};
  sentryMetadata['environment'] = buildInfo.releaseChannel;
  sentryMetadata['release'] = buildInfo.version;
  metadata['sentry'] = sentryMetadata;
  if (processUtils.IS_LINUX) {
    const xdgCurrentDesktop = process.env.XDG_CURRENT_DESKTOP ?? 'unknown';
    const gdmSession = process.env.GDMSESSION ?? 'unknown';
    metadata['wm'] = `${xdgCurrentDesktop},${gdmSession}`;
    try {
      metadata['distro'] = _child_process.default.execFileSync('lsb_release', ['-ds'], {
        timeout: 100,
        maxBuffer: 512,
        encoding: 'utf-8'
      }).trim();
    } catch (_) {}
  }
  initialized = true;
}
function buildSentryDSN(dsnKey) {
  if (supportsTls13) {
    return 'https://' + dsnKey + '@' + SENTRY_PROJECT_HOST + '.ingest.sentry.io/' + SENTRY_PROJECT_ID;
  }
  return 'https://' + dsnKey + '@' + SENTRY_PROJECT_HOST + '.insecure.sentry.io/' + SENTRY_PROJECT_ID;
}
function getSentryDSN(releaseChannel) {
  if (releaseChannel != null && CHANNEL_SENTRY_DSN[releaseChannel] != null) {
    return CHANNEL_SENTRY_DSN[releaseChannel];
  }
  return DEFAULT_SENTRY_DSN;
}
function isInitialized() {
  return initialized;
}
function getGlobalSentry() {
  return gSentry;
}