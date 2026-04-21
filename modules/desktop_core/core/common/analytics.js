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
exports.DesktopTTIAnalytics = exports.Analytics = void 0;
exports.getAnalytics = getAnalytics;
exports.getDesktopTTI = getDesktopTTI;
const assert_1 = __importDefault(require("assert"));
const events_1 = require("events");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const process = __importStar(require("process"));
class Analytics extends events_1.EventEmitter {
    events = [];
    pushEvent(type, name, data) {
        const event = { type: type, name: name, data: data };
        if (this.listenerCount('event') > 0) {
            process.nextTick(() => this.emit('event', event));
        }
        else {
            this.events.push(event);
        }
    }
    getAndTruncateEvents() {
        const ret = this.events;
        this.events = [];
        return ret;
    }
}
exports.Analytics = Analytics;
const analyticsInstance = new Analytics();
function getAnalytics() {
    return analyticsInstance;
}
const DESKTOP_TTI_TYPE = 'desktop_tti';
const DESKTOP_TTI_V2_TYPE = 'desktop_tti_v2';
const durationDiffThresholdMS = 30 * 60_000;
function getDurationMS() {
    (0, assert_1.default)(process.type === 'browser', 'Expected process to be main');
    return Math.ceil(process.uptime() * 1_000);
}
var DesktopAnalyticsEventType;
(function (DesktopAnalyticsEventType) {
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainAppInit"] = 0] = "MainAppInit";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashCreated"] = 1] = "SplashCreated";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashDuration"] = 2] = "SplashDuration";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashDurationWithUpdates"] = 3] = "SplashDurationWithUpdates";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashRestart"] = 4] = "SplashRestart";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinCreated"] = 5] = "MainWinCreated";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinLoadStart"] = 6] = "MainWinLoadStart";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinLoadComplete"] = 7] = "MainWinLoadComplete";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinJSAppLoadComplete"] = 8] = "MainWinJSAppLoadComplete";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinJSAppInteractiveComplete"] = 9] = "MainWinJSAppInteractiveComplete";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["FullTTIComplete"] = 10] = "FullTTIComplete";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["FullTTICompleteWithRestart"] = 11] = "FullTTICompleteWithRestart";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["FullInteractiveTTIComplete"] = 12] = "FullInteractiveTTIComplete";
    DesktopAnalyticsEventType[DesktopAnalyticsEventType["FullInteractiveTTICompleteWithRestart"] = 13] = "FullInteractiveTTICompleteWithRestart";
})(DesktopAnalyticsEventType || (DesktopAnalyticsEventType = {}));
function createDesktopAnalyticsEvent(type, durationMS) {
    function eventTypeToStr(type) {
        switch (type) {
            case DesktopAnalyticsEventType.MainAppInit:
                return 'mainapp_init';
            case DesktopAnalyticsEventType.SplashCreated:
                return 'splash_created';
            case DesktopAnalyticsEventType.SplashDuration:
                return 'splash_duration';
            case DesktopAnalyticsEventType.SplashDurationWithUpdates:
                return 'splash_duration_with_updates';
            case DesktopAnalyticsEventType.MainWinCreated:
                return 'mainwin_created';
            case DesktopAnalyticsEventType.MainWinLoadStart:
                return 'mainwin_loadstart';
            case DesktopAnalyticsEventType.MainWinLoadComplete:
                return 'mainwin_loadcomplete';
            case DesktopAnalyticsEventType.MainWinJSAppLoadComplete:
                return 'mainwin_loadjsappcomplete';
            case DesktopAnalyticsEventType.MainWinJSAppInteractiveComplete:
                return 'mainwin_interactive_jsappcomplete';
            case DesktopAnalyticsEventType.SplashRestart:
                return 'splash_restart';
            case DesktopAnalyticsEventType.FullTTIComplete:
                return 'full_tti_complete';
            case DesktopAnalyticsEventType.FullTTICompleteWithRestart:
                return 'full_tti_with_restart_complete';
            case DesktopAnalyticsEventType.FullInteractiveTTIComplete:
                return 'full_interactive_tti_complete';
            case DesktopAnalyticsEventType.FullInteractiveTTICompleteWithRestart:
                return 'full_interactive_tti_with_restart_complete';
        }
    }
    return {
        desktop_tti_type: eventTypeToStr(type),
        process_uptime_ms: getDurationMS(),
        duration_ms: durationMS,
    };
}
const DESKTOP_ANALYTICS_CACHE_FILENAME = 'desktop_analytics_cache.json';
class TTISessionData {
    mainWindowCreationTime = null;
    mainWindowShownTime = null;
    splashCreationTime = null;
    splashRestartTimepoint = null;
    processDuration = null;
}
function getCacheFilePath() {
    try {
        const paths = require('./paths');
        const userDataPath = paths.getUserData();
        if (userDataPath != null) {
            return path.join(userDataPath, DESKTOP_ANALYTICS_CACHE_FILENAME);
        }
    }
    catch (e) { }
    return null;
}
class TTIV2Data {
    mainInitTime = null;
    mainAppReadyTime = null;
    splashWindowCreated = null;
    splashWindowShown = null;
    splashWindowDuration = null;
    mainWindowCreated = null;
    mainWindowShown = null;
    mainWindowHiddenDuration = null;
    mainWindowDocumentLoad = null;
    mainWindowLoadWebapp = null;
    mainWindowInteractiveWebapp = null;
}
class DesktopTTIAnalytics {
    previousSessionData = null;
    currentSessionData = new TTISessionData();
    trackedFullTTI = false;
    trackedFullInteractiveTTI = false;
    trackedJSAppLoad = false;
    trackedJSAppInteractive = false;
    trackedDetailedTTI = false;
    installedUpdates = false;
    details = new TTIV2Data();
    enablePushingEvents;
    constructor(enablePushingEvents) {
        this.enablePushingEvents = enablePushingEvents;
    }
    hadRestart() {
        return this.previousSessionData != null;
    }
    loadPreviousSessionData() {
        const cachePath = getCacheFilePath();
        if (cachePath === null) {
            return;
        }
        let data = null;
        try {
            if (fs.existsSync(cachePath)) {
                data = fs.readFileSync(cachePath, 'utf8');
                fs.unlink(cachePath, (err) => {
                    if (err) {
                        console.log(`Failed to cleanup desktop analytics cache file`);
                    }
                });
            }
        }
        catch (_e) { }
        if (data === null) {
            return;
        }
        try {
            const parsedData = JSON.parse(data);
            if (parsedData.storeTimeMS == null || parsedData.sessionData == null) {
                return;
            }
            const persistedData = parsedData;
            if (Math.abs(Date.now() - persistedData.storeTimeMS) > durationDiffThresholdMS) {
                return;
            }
            this.previousSessionData = persistedData.sessionData;
        }
        catch (_e) {
            return;
        }
    }
    pushDesktopEvent(evt) {
        if (this.enablePushingEvents !== undefined && this.enablePushingEvents) {
            analyticsInstance.pushEvent(DESKTOP_TTI_TYPE, 'desktop_tti', evt);
        }
    }
    pushV2Event(evt) {
        if (this.enablePushingEvents !== undefined && this.enablePushingEvents) {
            analyticsInstance.pushEvent(DESKTOP_TTI_V2_TYPE, 'desktop_tti_v2', evt);
        }
    }
    trackMainAppTimeToInit() {
        const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainAppInit, null);
        this.details.mainInitTime = evt.process_uptime_ms;
        this.pushDesktopEvent(evt);
        this.loadPreviousSessionData();
    }
    trackMainAppReady() {
        this.details.mainAppReadyTime = getDurationMS();
    }
    trackSplashWindowCreated() {
        this.currentSessionData.splashCreationTime = getDurationMS();
        const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.SplashCreated, null);
        this.details.splashWindowCreated = evt.process_uptime_ms;
        this.pushDesktopEvent(evt);
    }
    trackSplashWindowShown() {
        this.details.splashWindowShown = getDurationMS();
    }
    trackSplashWindowDuration(installedUpdates) {
        this.installedUpdates = installedUpdates;
        if (this.currentSessionData.splashCreationTime != null) {
            let evtType;
            if (installedUpdates) {
                evtType = DesktopAnalyticsEventType.SplashDurationWithUpdates;
            }
            else {
                evtType = DesktopAnalyticsEventType.SplashDuration;
            }
            const duration = getDurationMS() - this.currentSessionData.splashCreationTime;
            const evt = createDesktopAnalyticsEvent(evtType, duration);
            this.pushDesktopEvent(evt);
            if (this.details.splashWindowShown != null) {
                this.details.splashWindowDuration = getDurationMS() - this.details.splashWindowShown;
            }
        }
    }
    trackMainWindowCreated() {
        this.currentSessionData.mainWindowCreationTime = getDurationMS();
        const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainWinCreated, null);
        this.details.mainWindowCreated = evt.process_uptime_ms;
        this.pushDesktopEvent(evt);
    }
    trackMainWindowShown() {
        this.currentSessionData.mainWindowShownTime = getDurationMS();
        this.details.mainWindowShown = this.currentSessionData.mainWindowShownTime;
        if (this.currentSessionData.mainWindowCreationTime != null) {
            this.details.mainWindowHiddenDuration =
                this.currentSessionData.mainWindowShownTime - this.currentSessionData.mainWindowCreationTime;
        }
    }
    trackMainWindowDocumentLoad() {
        this.details.mainWindowDocumentLoad = getDurationMS();
    }
    trackMainWindowLoadStart() {
        if (this.currentSessionData.mainWindowCreationTime != null) {
            const duration = getDurationMS() - this.currentSessionData.mainWindowCreationTime;
            const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainWinLoadStart, duration);
            this.pushDesktopEvent(evt);
        }
    }
    trackMainWindowLoadDuration() {
        if (this.currentSessionData.mainWindowCreationTime != null) {
            const duration = getDurationMS() - this.currentSessionData.mainWindowCreationTime;
            const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainWinLoadComplete, duration);
            this.pushDesktopEvent(evt);
        }
    }
    trackMainWindowJSAppLoadDuration() {
        if (this.trackedJSAppLoad) {
            return;
        }
        this.trackedJSAppLoad = true;
        if (this.currentSessionData.mainWindowCreationTime != null) {
            const duration = getDurationMS() - this.currentSessionData.mainWindowCreationTime;
            const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainWinJSAppLoadComplete, duration);
            this.pushDesktopEvent(evt);
        }
        if (this.currentSessionData.mainWindowShownTime != null) {
            this.details.mainWindowLoadWebapp = getDurationMS() - this.currentSessionData.mainWindowShownTime;
        }
    }
    trackMainWindowJSAppInteractiveDuration() {
        if (this.trackedJSAppInteractive) {
            return;
        }
        this.trackedJSAppInteractive = true;
        if (this.currentSessionData.mainWindowCreationTime != null) {
            const duration = getDurationMS() - this.currentSessionData.mainWindowCreationTime;
            const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainWinJSAppInteractiveComplete, duration);
            this.pushDesktopEvent(evt);
        }
        if (this.currentSessionData.mainWindowShownTime != null) {
            this.details.mainWindowInteractiveWebapp = getDurationMS() - this.currentSessionData.mainWindowShownTime;
        }
    }
    trackSplashWindowRestart() {
        this.currentSessionData.splashRestartTimepoint = Date.now();
        this.currentSessionData.processDuration = getDurationMS();
        const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.SplashRestart, null);
        this.pushDesktopEvent(evt);
        const persistData = {
            storeTimeMS: Date.now(),
            sessionData: this.currentSessionData,
        };
        try {
            const paths = require('./paths');
            const userDataPath = paths.getUserData();
            if (userDataPath != null) {
                const cachePath = path.join(userDataPath, DESKTOP_ANALYTICS_CACHE_FILENAME);
                const serializedState = JSON.stringify(persistData);
                fs.writeFile(cachePath, serializedState, (e) => {
                    if (e != null) {
                        console.warn('Desktop analytics failed to write serialized state to disk: ', e);
                    }
                });
            }
            else {
                console.warn('Desktop analytics failed to write serialized state to disk, no user data path discovered');
            }
        }
        catch (e) {
            console.warn('Desktop analytics failed to write serialized state to disk: ', e);
        }
    }
    getRestartAndFullTTIDuration() {
        if (this.previousSessionData != null) {
            const prevTimepoint = this.previousSessionData?.splashRestartTimepoint;
            const prevProcessDuration = this.previousSessionData?.processDuration;
            let fullDesktopDuration = null;
            if (prevTimepoint != null && prevProcessDuration != null) {
                const durationSinceSplashRestart = Date.now() - prevTimepoint;
                fullDesktopDuration = durationSinceSplashRestart + prevProcessDuration;
                if (durationSinceSplashRestart < 0
                    || durationSinceSplashRestart > durationDiffThresholdMS
                    || fullDesktopDuration < 0
                    || fullDesktopDuration > durationDiffThresholdMS) {
                    fullDesktopDuration = null;
                }
            }
            else {
            }
            return fullDesktopDuration;
        }
        else {
            return undefined;
        }
    }
    trackFullTTI() {
        if (this.trackedFullTTI) {
            return;
        }
        this.trackedFullTTI = true;
        const fullDesktopDuration = this.getRestartAndFullTTIDuration();
        if (fullDesktopDuration === undefined) {
            const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.FullTTIComplete, null);
            this.pushDesktopEvent(evt);
        }
        else {
            const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.FullTTICompleteWithRestart, fullDesktopDuration);
            this.pushDesktopEvent(evt);
        }
    }
    trackFullInteractiveTTI() {
        if (this.trackedFullInteractiveTTI) {
            return;
        }
        this.trackedFullInteractiveTTI = true;
        const fullDesktopDuration = this.getRestartAndFullTTIDuration();
        if (fullDesktopDuration === undefined) {
            const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.FullInteractiveTTIComplete, null);
            this.pushDesktopEvent(evt);
        }
        else {
            const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.FullInteractiveTTICompleteWithRestart, fullDesktopDuration);
            this.pushDesktopEvent(evt);
        }
    }
    trackDetailedTTI(bundleStats, fullInteractiveTTIMs) {
        if (this.trackedDetailedTTI) {
            return;
        }
        this.trackedDetailedTTI = true;
        let fullTTI = fullInteractiveTTIMs;
        const restartDuration = this.getRestartAndFullTTIDuration();
        if (restartDuration !== undefined) {
            fullTTI = restartDuration;
        }
        const event = {
            full_tti_duration_ms: fullTTI,
            main_init_time_ms: this.details.mainInitTime,
            main_appready_time_ms: this.details.mainAppReadyTime,
            splash_window_created_time_ms: this.details.splashWindowCreated,
            splash_window_shown_time_ms: this.details.splashWindowShown,
            splash_window_shown_duration_ms: this.details.splashWindowDuration,
            main_window_created_time_ms: this.details.mainWindowCreated,
            main_window_shown_time_ms: this.details.mainWindowShown,
            main_window_hidden_duration_ms: this.details.mainWindowHiddenDuration,
            main_window_document_load_time_ms: this.details.mainWindowDocumentLoad,
            main_window_webapp_load_duration_ms: this.details.mainWindowLoadWebapp,
            main_window_webapp_interactive_duration_ms: this.details.mainWindowInteractiveWebapp,
            main_window_webapp_bundle_name: bundleStats.main_window_webapp_bundle_name ?? null,
            main_window_webapp_bundle_ttfb_ms: bundleStats.main_window_webapp_bundle_ttfb_ms ?? null,
            main_window_webapp_bundle_download_decompress_duration_ms: bundleStats.main_window_webapp_bundle_download_decompress_duration_ms ?? null,
            main_window_webapp_bundle_compressed_size_bytes: bundleStats.main_window_webapp_bundle_compressed_size_bytes ?? null,
            main_window_webapp_bundle_uncompressed_size_bytes: bundleStats.main_window_webapp_bundle_uncompressed_size_bytes ?? null,
            main_window_webapp_bundle_transfer_size_bytes: bundleStats.main_window_webapp_bundle_transfer_size_bytes ?? null,
            main_window_webapp_bundle_compile_foreground_duration_us: bundleStats.main_window_webapp_bundle_compile_foreground_duration_us ?? null,
            main_window_webapp_bundle_compile_background_duration_us: bundleStats.main_window_webapp_bundle_compile_background_duration_us ?? null,
            main_window_webapp_bundle_compile_streamed: bundleStats.main_window_webapp_bundle_compile_streamed ?? null,
            connection_rtt_ms: bundleStats.connection_rtt_ms ?? null,
            connection_downlink_kbps: bundleStats.connection_downlink_kbps ?? null,
            main_window_navigation_start_time_ms: null,
            main_window_first_paint_time_ms: null,
            main_window_first_contentful_paint_time_ms: null,
            had_update: this.installedUpdates,
            had_restart: this.hadRestart(),
        };
        const navOrigin = bundleStats.main_window_navigation_origin_ms;
        if (navOrigin != null) {
            const processStartMs = Date.now() - Math.ceil(process.uptime() * 1_000);
            const navStartProcessRelative = Math.round(navOrigin - processStartMs);
            event.main_window_navigation_start_time_ms = navStartProcessRelative;
            const fp = bundleStats.main_window_first_paint_time_ms;
            if (fp != null) {
                event.main_window_first_paint_time_ms = navStartProcessRelative + fp;
            }
            const fcp = bundleStats.main_window_first_contentful_paint_time_ms;
            if (fcp != null) {
                event.main_window_first_contentful_paint_time_ms = navStartProcessRelative + fcp;
            }
        }
        this.pushV2Event(event);
    }
}
exports.DesktopTTIAnalytics = DesktopTTIAnalytics;
let desktopTTIInstance = null;
function getDesktopTTI() {
    if (desktopTTIInstance === null) {
        desktopTTIInstance = new DesktopTTIAnalytics(true);
    }
    return desktopTTIInstance;
}
