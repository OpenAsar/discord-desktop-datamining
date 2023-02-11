"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.isInitialized = isInitialized;
exports.metadata = void 0;

var processUtils = _interopRequireWildcard(require("./processUtils"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-console */
const electron = require('electron');

const childProcess = require('child_process');

const {
  flatten
} = require('./crashReporterUtils');

let initialized = false;
const metadata = {};
exports.metadata = metadata;
const supportsTls13 = processUtils.supportsTls13();
const DEFAULT_SENTRY_KEY = '384ce4413de74fe0be270abe03b2b35a';
const TEST_SENTRY_KEY = '1a27a96457b24ff286a000266c573919';
const CHANNEL_SENTRY_KEYS = {
  stable: DEFAULT_SENTRY_KEY,
  ptb: TEST_SENTRY_KEY,
  canary: TEST_SENTRY_KEY,
  development: TEST_SENTRY_KEY
};

function getCrashReporterArgs(metadata) {
  // NB: we need to flatten the metadata because modern electron caps metadata values at 127 bytes,
  // which our sentry subobject can easily exceed.
  const flatMetadata = flatten(metadata);
  const channel = metadata['channel'];
  const sentryKey = CHANNEL_SENTRY_KEYS[channel] != null ? CHANNEL_SENTRY_KEYS[channel] : DEFAULT_SENTRY_KEY;
  const sentryHost = supportsTls13 ? 'sentry.io' : 'insecure.sentry.io';
  return {
    productName: 'Discord',
    companyName: 'Discord Inc.',
    submitURL: `https://${sentryHost}/api/146342/minidump/?sentry_key=${sentryKey}`,
    uploadToServer: true,
    ignoreSystemCrashHandler: false,
    extra: flatMetadata
  };
}

function initializeSentrySdk(sentry) {
  const sentryDsn = supportsTls13 ? 'https://8405981abe5045908f0d88135eba7ba5@o64374.ingest.sentry.io/1197903' : 'https://8405981abe5045908f0d88135eba7ba5@o64374.insecure.sentry.io/1197903';
  sentry.init({
    dsn: sentryDsn
  });
}

function init(buildInfo, sentry) {
  if (initialized) {
    console.warn('Ignoring double initialization of crash reporter.');
    return;
  } // It's desirable for test runs to have the stacktrace print to the console (and thusly, be shown in buildkite logs).


  if (process.env.ELECTRON_ENABLE_STACK_DUMPING === 'true') {
    console.warn('Not initializing crash reporter because ELECTRON_ENABLE_STACK_DUMPING is set.');
    return;
  }

  if (sentry != null) {
    initializeSentrySdk(sentry);
  }

  metadata['channel'] = buildInfo.releaseChannel;
  const sentryMetadata = metadata['sentry'] != null ? metadata['sentry'] : {};
  sentryMetadata['environment'] = buildInfo.releaseChannel;
  sentryMetadata['release'] = buildInfo.version;
  metadata['sentry'] = sentryMetadata;

  if (processUtils.IS_LINUX) {
    const XDG_CURRENT_DESKTOP = process.env.XDG_CURRENT_DESKTOP || 'unknown';
    const GDMSESSION = process.env.GDMSESSION || 'unknown';
    metadata['wm'] = `${XDG_CURRENT_DESKTOP},${GDMSESSION}`;

    try {
      metadata['distro'] = childProcess.execFileSync('lsb_release', ['-ds'], {
        timeout: 100,
        maxBuffer: 512,
        encoding: 'utf-8'
      }).trim();
    } catch (_) {} // just in case lsb_release doesn't exist

  }

  const config = getCrashReporterArgs(metadata);
  electron.crashReporter.start(config);
  initialized = true;
}

function isInitialized() {
  return initialized;
}