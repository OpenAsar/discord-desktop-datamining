"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
exports.focusSplash = focusSplash;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const splashScreen = __importStar(require("./splashScreen"));
const USE_PINNED_UPDATE_MANIFEST = 'USE_PINNED_UPDATE_MANIFEST';
function winUpdateRegVersion(updater, callback) {
    if (process.platform !== 'win32') {
        return;
    }
    const buildInfo = require('./buildInfo');
    const releaseChannelSuffix = (() => {
        if (buildInfo.releaseChannel === 'stable') {
            return '';
        }
        else if (buildInfo.releaseChannel === 'ptb') {
            return 'PTB';
        }
        else if (buildInfo.releaseChannel === 'canary') {
            return 'Canary';
        }
        else if (buildInfo.releaseChannel === 'development') {
            return 'Development';
        }
        return null;
    })();
    if (releaseChannelSuffix == null) {
        return;
    }
    const appName = 'Discord' + releaseChannelSuffix;
    const versions = updater.queryCurrentVersionsSync();
    const hostVersion = versions?.current_host;
    if (hostVersion == null || hostVersion.length !== 3) {
        return;
    }
    const hostVersionStr = hostVersion[0] + '.' + hostVersion[1] + '.' + hostVersion[2];
    console.log(`Updating registry install version to: ${hostVersionStr}`);
    const queue = [
        [
            'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\' + appName,
            '/v',
            'DisplayVersion',
            '/d',
            hostVersionStr,
        ],
    ];
    const windowsUtils = require('./windowsUtils');
    windowsUtils.addToRegistry(queue, callback);
}
function update(startMinimized, doneCallback, showCallback) {
    const buildInfo = require('./buildInfo');
    const bootstrapConstants = require('./Constants');
    const { getUpdater, tryInitUpdater, INCONSISTENT_INSTALLER_STATE_ERROR } = require('../common/updater');
    const { getSettings } = require('./appSettings');
    const settings = getSettings();
    const isStandaloneModules = buildInfo.releaseChannel === 'development' && buildInfo.standaloneModules;
    if (bootstrapConstants.USE_NEW_UPDATER
        && !isStandaloneModules
        && tryInitUpdater(buildInfo, bootstrapConstants.NEW_UPDATE_ENDPOINT, bootstrapConstants.USE_RUST_BSPATCH)) {
        const updater = getUpdater();
        const usePinnedUpdateManifest = settings?.get(USE_PINNED_UPDATE_MANIFEST) ?? false;
        const autoStart = require('./autoStart');
        const firstRun = require('./firstRun');
        if (updater != null) {
            const { handled, fatal } = require('./errorHandler');
            updater.on('host-updated', () => {
                autoStart.update(() => { });
                winUpdateRegVersion(updater, () => { });
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
            const { fatal } = require('./errorHandler');
            const paths = require('../common/paths');
            const manifestPath = path_1.default.join(paths.getUserData() ?? '', 'pinned_update.json');
            try {
                const manifest = fs_1.default.readFileSync(manifestPath);
                updater?.setPinnedManifestSync(JSON.parse(manifest.toString('utf-8')));
            }
            catch (err) {
                console.error(`Could not read pinned manifest! (code: ${err.code})`);
                fatal(err);
            }
        }
        firstRun.performFirstRunTasks(updater);
    }
    else {
        const moduleUpdater = require('./moduleUpdater');
        moduleUpdater.init(bootstrapConstants.UPDATE_ENDPOINT, settings, buildInfo);
    }
    splashScreen.initSplash(startMinimized);
    splashScreen.events.once(splashScreen.APP_SHOULD_LAUNCH, doneCallback);
    splashScreen.events.once(splashScreen.APP_SHOULD_SHOW, showCallback);
}
function focusSplash() {
    splashScreen.focusWindow();
}
