Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryMinidump = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@sentry/core");
const utils_1 = require("@sentry/utils");
const electron_1 = require("electron");
const common_1 = require("../../../common");
const context_1 = require("../../context");
const electron_normalize_1 = require("../../electron-normalize");
const fs_1 = require("../../fs");
const renderers_1 = require("../../renderers");
const sessions_1 = require("../../sessions");
const store_1 = require("../../store");
const minidump_loader_1 = require("./minidump-loader");
/** Sends minidumps via the Sentry uploader */
class SentryMinidump {
    constructor() {
        /** @inheritDoc */
        this.name = SentryMinidump.id;
    }
    /** @inheritDoc */
    setupOnce() {
        // Mac AppStore builds cannot run the crash reporter due to the sandboxing
        // requirements. In this case, we prevent enabling native crashes entirely.
        // https://electronjs.org/docs/tutorial/mac-app-store-submission-guide#limitations-of-mas-build
        if (process.mas) {
            return;
        }
        this._startCrashReporter();
        this._scopeStore = new store_1.BufferedWriteStore(fs_1.sentryCachePath, 'scope_v2', new core_1.Scope());
        // We need to store the scope in a variable here so it can be attached to minidumps
        this._scopeLastRun = this._scopeStore.get();
        this._setupScopeListener();
        const client = (0, core_1.getCurrentHub)().getClient();
        const options = client === null || client === void 0 ? void 0 : client.getOptions();
        if (!(options === null || options === void 0 ? void 0 : options.dsn)) {
            throw new utils_1.SentryError('Attempted to enable Electron native crash reporter but no DSN was supplied');
        }
        (0, renderers_1.trackRendererProperties)();
        this._minidumpLoader = (0, minidump_loader_1.getMinidumpLoader)();
        (0, electron_normalize_1.onRendererProcessGone)(electron_normalize_1.EXIT_REASONS, (contents, details) => this._sendRendererCrash(options, contents, details));
        (0, electron_normalize_1.onChildProcessGone)(electron_normalize_1.EXIT_REASONS, (details) => this._sendChildProcessCrash(options, details));
        // Start to submit recent minidump crashes. This will load breadcrumbs and
        // context information that was cached on disk prior to the crash.
        this._sendNativeCrashes({
            level: 'fatal',
            platform: 'native',
            tags: {
                'event.environment': 'native',
                'event.process': 'browser',
                event_type: 'native',
            },
        })
            .then((minidumpsFound) => 
        // Check for previous uncompleted session. If a previous session exists
        // and no minidumps were found, its likely an abnormal exit
        (0, sessions_1.checkPreviousSession)(minidumpsFound))
            .catch((error) => utils_1.logger.error(error));
    }
    /** Starts the native crash reporter */
    _startCrashReporter() {
        utils_1.logger.log('Starting Electron crashReporter');
        electron_1.crashReporter.start({
            companyName: '',
            ignoreSystemCrashHandler: true,
            productName: electron_1.app.name || electron_1.app.getName(),
            // Empty string doesn't work for Linux Crashpad and no submitURL doesn't work for older versions of Electron
            submitURL: 'https://f.a.k/e',
            uploadToServer: false,
            compress: true,
        });
    }
    /**
     * Helper function for sending renderer crashes
     */
    _sendRendererCrash(options, contents, details) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { getRendererName, release, environment } = options;
            const crashedProcess = (getRendererName === null || getRendererName === void 0 ? void 0 : getRendererName(contents)) || 'renderer';
            utils_1.logger.log(`'${crashedProcess}' process '${details.reason}'`);
            const event = (0, common_1.mergeEvents)(yield (0, context_1.getEventDefaults)(release, environment), {
                contexts: {
                    electron: {
                        crashed_url: ((_a = (0, renderers_1.getRendererProperties)(contents.id)) === null || _a === void 0 ? void 0 : _a.url) || 'unknown',
                        details,
                    },
                },
                level: 'fatal',
                // The default is javascript
                platform: 'native',
                tags: {
                    'event.environment': 'native',
                    'event.process': crashedProcess,
                    'exit.reason': details.reason,
                    event_type: 'native',
                },
            });
            const found = yield this._sendNativeCrashes(event);
            if (found) {
                (0, sessions_1.sessionCrashed)();
            }
        });
    }
    /**
     * Helper function for sending child process crashes
     */
    _sendChildProcessCrash(options, details) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            utils_1.logger.log(`${details.type} process has ${details.reason}`);
            const { release, environment } = options;
            const event = (0, common_1.mergeEvents)(yield (0, context_1.getEventDefaults)(release, environment), {
                contexts: {
                    electron: { details },
                },
                level: 'fatal',
                // The default is javascript
                platform: 'native',
                tags: {
                    'event.environment': 'native',
                    'event.process': details.type,
                    'exit.reason': details.reason,
                    event_type: 'native',
                },
            });
            const found = yield this._sendNativeCrashes(event);
            if (found) {
                (0, sessions_1.sessionCrashed)();
            }
        });
    }
    /**
     * Adds a scope listener to persist changes to disk.
     */
    _setupScopeListener() {
        const hubScope = (0, core_1.getCurrentHub)().getScope();
        if (hubScope) {
            hubScope.addScopeListener((updatedScope) => {
                const scope = core_1.Scope.clone(updatedScope);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                scope._eventProcessors = [];
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                scope._scopeListeners = [];
                // Since the initial scope read is async, we need to ensure that any writes do not beat that
                // https://github.com/getsentry/sentry-electron/issues/585
                setImmediate(() => {
                    var _a;
                    void ((_a = this._scopeStore) === null || _a === void 0 ? void 0 : _a.set(scope));
                });
            });
        }
    }
    /**
     * Loads new native crashes from disk and sends them to Sentry.
     *
     * Returns true if one or more minidumps were found
     */
    _sendNativeCrashes(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Whenever we are called, assume that the crashes we are going to load down
            // below have occurred recently. This means, we can use the same event data
            // for all minidumps that we load now. There are two conditions:
            //
            //  1. The application crashed and we are just starting up. The stored
            //     breadcrumbs and context reflect the state during the application
            //     crash.
            //
            //  2. A renderer process crashed recently and we have just been notified
            //     about it. Just use the breadcrumbs and context information we have
            //     right now and hope that the delay was not too long.
            if (this._minidumpLoader === undefined) {
                throw new utils_1.SentryError('Invariant violation: Native crashes not enabled');
            }
            try {
                const minidumps = yield this._minidumpLoader();
                if (minidumps.length > 0) {
                    const hub = (0, core_1.getCurrentHub)();
                    const client = hub.getClient();
                    if (!client) {
                        return true;
                    }
                    const enabled = client.getOptions().enabled;
                    // If the SDK is not enabled, we delete the minidump files so they
                    // dont accumulate and/or get sent later
                    if (enabled === false) {
                        minidumps.forEach(minidump_loader_1.deleteMinidump);
                        return false;
                    }
                    const storedScope = core_1.Scope.clone(yield this._scopeLastRun);
                    let newEvent = yield storedScope.applyToEvent(event);
                    const hubScope = hub.getScope();
                    newEvent = hubScope ? yield hubScope.applyToEvent(event) : event;
                    if (!newEvent) {
                        return false;
                    }
                    for (const minidump of minidumps) {
                        const data = yield minidump.load();
                        if (data) {
                            (0, core_1.captureEvent)(newEvent, {
                                attachments: [
                                    {
                                        attachmentType: 'event.minidump',
                                        filename: (0, utils_1.basename)(minidump.path),
                                        data,
                                    },
                                ],
                            });
                        }
                        void (0, minidump_loader_1.deleteMinidump)(minidump);
                    }
                    // Unset to recover memory
                    this._scopeLastRun = undefined;
                    return true;
                }
            }
            catch (_oO) {
                utils_1.logger.error('Error while sending native crash.');
            }
            return false;
        });
    }
}
exports.SentryMinidump = SentryMinidump;
/** @inheritDoc */
SentryMinidump.id = 'SentryMinidump';
//# sourceMappingURL=index.js.map