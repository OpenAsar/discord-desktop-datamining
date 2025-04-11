"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DesktopTTIAnalytics = exports.Analytics = void 0;
exports.getAnalytics = getAnalytics;
exports.getDesktopTTI = getDesktopTTI;
var _assert = _interopRequireDefault(require("assert"));
var _events = require("events");
var fs = _interopRequireWildcard(require("fs"));
var path = _interopRequireWildcard(require("path"));
var process = _interopRequireWildcard(require("process"));
var paths = _interopRequireWildcard(require("./paths"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Analytics extends _events.EventEmitter {
  events = [];
  pushEvent(type, name, data) {
    const event = {
      type: type,
      name: name,
      data: data
    };
    if (this.listenerCount('event') > 0) {
      process.nextTick(() => this.emit('event', event));
    } else {
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
const durationDiffThresholdMS = 30 * 60_000;
function getDurationMS() {
  (0, _assert.default)(process.type === 'browser', 'Expected process to be main');
  return Math.ceil(process.uptime() * 1_000);
}
var DesktopAnalyticsEventType = function (DesktopAnalyticsEventType) {
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainAppInit"] = 0] = "MainAppInit";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashCreated"] = 1] = "SplashCreated";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashDuration"] = 2] = "SplashDuration";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashDurationWithUpdates"] = 3] = "SplashDurationWithUpdates";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashRestart"] = 4] = "SplashRestart";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinCreated"] = 5] = "MainWinCreated";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinLoadStart"] = 6] = "MainWinLoadStart";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinLoadComplete"] = 7] = "MainWinLoadComplete";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinJSAppLoadComplete"] = 8] = "MainWinJSAppLoadComplete";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["FullTTIComplete"] = 9] = "FullTTIComplete";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["FullTTICompleteWithRestart"] = 10] = "FullTTICompleteWithRestart";
  return DesktopAnalyticsEventType;
}(DesktopAnalyticsEventType || {});
function createDesktopAnalyticsEvent(type, durationMS) {
  return {
    desktop_tti_type: function (type) {
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
        case DesktopAnalyticsEventType.SplashRestart:
          return 'splash_restart';
        case DesktopAnalyticsEventType.FullTTIComplete:
          return 'full_tti_complete';
        case DesktopAnalyticsEventType.FullTTICompleteWithRestart:
          return 'full_tti_with_restart_complete';
      }
    }(type),
    process_uptime_ms: getDurationMS(),
    duration_ms: durationMS
  };
}
const DESKTOP_ANALYTICS_CACHE_FILENAME = 'desktop_analytics_cache.json';
class TTISessionData {
  mainWindowCreationTime = null;
  splashCreationTime = null;
  splashRestartTimepoint = null;
  processDuration = null;
}
function getCacheFilePath() {
  try {
    const userDataPath = paths.getUserData();
    if (userDataPath != null) {
      return path.join(userDataPath, DESKTOP_ANALYTICS_CACHE_FILENAME);
    }
  } catch (e) {}
  return null;
}
class DesktopTTIAnalytics {
  previousSessionData = null;
  currentSessionData = new TTISessionData();
  trackedFullTTI = false;
  trackedJSAppLoad = false;
  constructor(enablePushingEvents) {
    this.enablePushingEvents = enablePushingEvents;
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
        fs.unlink(cachePath, err => {
          if (err) {
            console.log(`Failed to cleanup desktop analytics cache file`);
          }
        });
      }
    } catch (_e) {}
    if (data === null) {
      return;
    }
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
  pushDesktopEvent(evt) {
    if (this.enablePushingEvents !== undefined && this.enablePushingEvents) {
      analyticsInstance.pushEvent(DESKTOP_TTI_TYPE, 'desktop_tti', evt);
    }
  }
  trackMainAppTimeToInit() {
    const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainAppInit, null);
    this.pushDesktopEvent(evt);
    this.loadPreviousSessionData();
  }
  trackSplashWindowCreated() {
    this.currentSessionData.splashCreationTime = getDurationMS();
    const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.SplashCreated, null);
    this.pushDesktopEvent(evt);
  }
  trackSplashWindowDuration(installedUpdates) {
    if (this.currentSessionData.splashCreationTime != null) {
      let evtType;
      if (installedUpdates) {
        evtType = DesktopAnalyticsEventType.SplashDurationWithUpdates;
      } else {
        evtType = DesktopAnalyticsEventType.SplashDuration;
      }
      const duration = getDurationMS() - this.currentSessionData.splashCreationTime;
      const evt = createDesktopAnalyticsEvent(evtType, duration);
      this.pushDesktopEvent(evt);
    }
  }
  trackMainWindowCreated() {
    this.currentSessionData.mainWindowCreationTime = getDurationMS();
    const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainWinCreated, null);
    this.pushDesktopEvent(evt);
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
  }
  trackSplashWindowRestart() {
    this.currentSessionData.splashRestartTimepoint = Date.now();
    this.currentSessionData.processDuration = getDurationMS();
    const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.SplashRestart, null);
    this.pushDesktopEvent(evt);
    const persistData = {
      storeTimeMS: Date.now(),
      sessionData: this.currentSessionData
    };
    try {
      const userDataPath = paths.getUserData();
      if (userDataPath != null) {
        const cachePath = path.join(userDataPath, DESKTOP_ANALYTICS_CACHE_FILENAME);
        const serializedState = JSON.stringify(persistData);
        fs.writeFile(cachePath, serializedState, e => {
          if (e != null) {
            console.warn('Desktop analytics failed to write serialized state to disk: ', e);
          }
        });
      } else {
        console.warn('Desktop analytics failed to write serialized state to disk, no user data path discovered');
      }
    } catch (e) {
      console.warn('Desktop analytics failed to write serialized state to disk: ', e);
    }
  }
  trackFullTTI() {
    if (this.trackedFullTTI) {
      return;
    }
    this.trackedFullTTI = true;
    if (this.previousSessionData != null) {
      var _this$previousSession, _this$previousSession2;
      const prevTimepoint = (_this$previousSession = this.previousSessionData) === null || _this$previousSession === void 0 ? void 0 : _this$previousSession.splashRestartTimepoint;
      const prevProcessDuration = (_this$previousSession2 = this.previousSessionData) === null || _this$previousSession2 === void 0 ? void 0 : _this$previousSession2.processDuration;
      let fullDesktopDuration = null;
      if (prevTimepoint != null && prevProcessDuration != null) {
        const durationSinceSplashRestart = Date.now() - prevTimepoint;
        fullDesktopDuration = durationSinceSplashRestart + prevProcessDuration;
        if (durationSinceSplashRestart < 0 || durationSinceSplashRestart > durationDiffThresholdMS || fullDesktopDuration < 0 || fullDesktopDuration > durationDiffThresholdMS) {
          fullDesktopDuration = null;
        }
      }
      const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.FullTTICompleteWithRestart, fullDesktopDuration);
      this.pushDesktopEvent(evt);
    } else {
      const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.FullTTIComplete, null);
      this.pushDesktopEvent(evt);
    }
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