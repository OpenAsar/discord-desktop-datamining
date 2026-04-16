"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.init = init;
exports.isInitialized = isInitialized;
exports.getGlobalSentry = getGlobalSentry;
const fs_1 = __importDefault(require("fs"));
let gSentry = null;
let initialized = false;
exports.metadata = {};
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
    development: buildSentryDSN(TEST_SENTRY_DSN_KEY),
};
const CHANNEL_SENTRY_SAMPLE = {
    stable: 0.01,
    ptb: 1,
    canary: 1,
    development: 1,
};
const LINUX_SENTRY_SAMPLE = 1;
const MACOS_SENTRY_SAMPLE = 1;
let defaultDsn = DEFAULT_SENTRY_DSN;
function dsnFromUser({ getEvent }) {
    const event = getEvent();
    if (event?.tags?.isStaff === 'true') {
        return [buildSentryDSN(STAFF_SENTRY_DSN_KEY)];
    }
    else {
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
        beforeSend(event, _hint) {
            event.extra = exports.metadata;
            const blackbox = require('./blackbox');
            void blackbox.addSentryReport(event);
            return event;
        },
        ignoreErrors: [
            'EADDRINUSE',
            'ResizeObserver loop limit exceeded',
            'ResizeObserver loop completed with undelivered notifications.',
            'EACCES: permission denied',
            'BetterDiscord',
            'VencordPatcher',
            'mwittrien.github.io',
            'Error: getaddrinfo ENOTFOUND raw.githubusercontent.com',
        ],
        denyUrls: [/betterdiscord:\/\//],
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
    exports.metadata['release_channel'] = buildInfo.releaseChannel;
    const sentryMetadata = exports.metadata['sentry'] != null ? exports.metadata['sentry'] : {};
    sentryMetadata['environment'] = buildInfo.releaseChannel;
    sentryMetadata['release'] = buildInfo.version;
    exports.metadata['sentry'] = sentryMetadata;
    const processUtils = require('./processUtils');
    if (processUtils.IS_LINUX) {
        const xdgCurrentDesktop = process.env.XDG_CURRENT_DESKTOP ?? 'unknown';
        const gdmSession = process.env.GDMSESSION ?? 'unknown';
        exports.metadata['wm'] = `${xdgCurrentDesktop},${gdmSession}`;
        let runtimeEnvironment = 'native';
        if (process.env.FLATPAK_ID != null) {
            runtimeEnvironment = 'flatpak';
        }
        else if (process.env.SNAP != null || process.env.SNAP_NAME != null) {
            runtimeEnvironment = 'snap';
        }
        else if (process.env.APPIMAGE != null || process.env.APPDIR != null) {
            runtimeEnvironment = 'appimage';
        }
        exports.metadata['runtime_environment'] = runtimeEnvironment;
        let displayServer = 'unknown';
        if (process.env.XDG_SESSION_TYPE != null) {
            displayServer = process.env.XDG_SESSION_TYPE;
        }
        exports.metadata['display_server'] = displayServer;
        try {
            const childProcess = require('node:child_process');
            exports.metadata['distro'] = childProcess
                .execFileSync('lsb_release', ['-ds'], { timeout: 100, maxBuffer: 512, encoding: 'utf-8' })
                .trim();
        }
        catch (_) {
            try {
                const osRelease = fs_1.default.readFileSync('/etc/os-release', 'utf-8');
                const prettyNameMatch = osRelease.match(/^PRETTY_NAME="?([^"\n]+)"?$/m);
                if (prettyNameMatch != null) {
                    exports.metadata['distro'] = prettyNameMatch[1];
                }
            }
            catch (_) { }
        }
    }
    initialized = true;
}
function buildSentryDSN(dsnKey) {
    return 'https://' + dsnKey + '@' + SENTRY_PROJECT_HOST + '.ingest.sentry.io/' + SENTRY_PROJECT_ID;
}
function getSentryDSN(releaseChannel) {
    const processUtils = require('./processUtils');
    if (processUtils.IS_LINUX) {
        return buildSentryDSN(LINUX_SENTRY_DSN_KEY);
    }
    else if (processUtils.IS_OSX) {
        return buildSentryDSN(MACOS_SENTRY_DSN_KEY);
    }
    else {
        if (releaseChannel != null && CHANNEL_SENTRY_DSN[releaseChannel] != null) {
            return CHANNEL_SENTRY_DSN[releaseChannel];
        }
    }
    return DEFAULT_SENTRY_DSN;
}
function getSampleRate(releaseChannel) {
    const processUtils = require('./processUtils');
    if (processUtils.IS_LINUX) {
        return LINUX_SENTRY_SAMPLE;
    }
    else if (processUtils.IS_OSX) {
        return MACOS_SENTRY_SAMPLE;
    }
    else {
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
