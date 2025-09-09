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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let gSentry = null;
let initialized = false;
const metadata = exports.metadata = {};
const SENTRY_PROJECT_ID = '146342';
const SENTRY_PROJECT_HOST = 'o64374';
const STABLE_SENTRY_DSN_KEY = '7a60c374cb0e99ac8a57388db6933711';
const DEFAULT_SENTRY_DSN_KEY = '384ce4413de74fe0be270abe03b2b35a';
const STAFF_SENTRY_DSN_KEY = 'de156ff7a3f544cca369e77e3f1f5743';
const TEST_SENTRY_DSN_KEY = '1a27a96457b24ff286a000266c573919';
const LINUX_SENTRY_DSN_KEY = 'd2558f321dfc7ab68366d8258fd256c7';
const MACOS_SENTRY_DSN_KEY = '098008bd74508d75b72f31244ddb1d04';
const DEFAULT_SENTRY_DSN = buildSentryDSN(DEFAULT_SENTRY_DSN_KEY);
const CHANNEL_SENTRY_DSN = {
  stable: buildSentryDSN(STABLE_SENTRY_DSN_KEY),
  ptb: buildSentryDSN(TEST_SENTRY_DSN_KEY),
  canary: buildSentryDSN(TEST_SENTRY_DSN_KEY),
  development: buildSentryDSN(TEST_SENTRY_DSN_KEY)
};
const CHANNEL_SENTRY_SAMPLE = {
  stable: 0.01,
  ptb: 1,
  canary: 1,
  development: 1
};
const LINUX_SENTRY_SAMPLE = 1;
const MACOS_SENTRY_SAMPLE = 1;
let defaultDsn = DEFAULT_SENTRY_DSN;
function dsnFromUser({
  getEvent
}) {
  var _event$tags;
  const event = getEvent();
  if ((event === null || event === void 0 ? void 0 : (_event$tags = event.tags) === null || _event$tags === void 0 ? void 0 : _event$tags.isStaff) === 'true') {
    return [buildSentryDSN(STAFF_SENTRY_DSN_KEY)];
  } else {
    return [defaultDsn];
  }
}
function initializeSentrySdk(config, buildInfo) {
  defaultDsn = getSentryDSN(buildInfo.releaseChannel);
  config.sentry.init({
    dsn: getSentryDSN(buildInfo.releaseChannel),
    transport: config.getTransport(dsnFromUser),
    environment: buildInfo.releaseChannel,
    release: buildInfo.version,
    sampleRate: getSampleRate(buildInfo.releaseChannel),
    autoSessionTracking: false,
    maxValueLength: 250,
    beforeSend(event, hint) {
      event.extra = metadata;
      void blackbox.addSentryReport(event, hint);
      return event;
    },
    ignoreErrors: ['EADDRINUSE', 'ResizeObserver loop limit exceeded', 'ResizeObserver loop completed with undelivered notifications.', 'EACCES: permission denied', 'BetterDiscord', 'VencordPatcher', 'mwittrien.github.io', 'Error: getaddrinfo ENOTFOUND raw.githubusercontent.com'],
    denyUrls: [/betterdiscord:\/\//]
  });
  gSentry = config.sentry;
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
  return 'https://' + dsnKey + '@' + SENTRY_PROJECT_HOST + '.ingest.sentry.io/' + SENTRY_PROJECT_ID;
}
function getSentryDSN(releaseChannel) {
  if (processUtils.IS_LINUX) {
    return buildSentryDSN(LINUX_SENTRY_DSN_KEY);
  } else if (processUtils.IS_OSX) {
    return buildSentryDSN(MACOS_SENTRY_DSN_KEY);
  } else {
    if (releaseChannel != null && CHANNEL_SENTRY_DSN[releaseChannel] != null) {
      return CHANNEL_SENTRY_DSN[releaseChannel];
    }
  }
  return DEFAULT_SENTRY_DSN;
}
function getSampleRate(releaseChannel) {
  if (processUtils.IS_LINUX) {
    return LINUX_SENTRY_SAMPLE;
  } else if (processUtils.IS_OSX) {
    return MACOS_SENTRY_SAMPLE;
  } else {
    if (releaseChannel != null && CHANNEL_SENTRY_SAMPLE[releaseChannel] != null) {
      return CHANNEL_SENTRY_SAMPLE[releaseChannel];
    }
  }
  return 0.01;
}
function isInitialized() {
  return initialized;
}
function getGlobalSentry() {
  return gSentry;
}