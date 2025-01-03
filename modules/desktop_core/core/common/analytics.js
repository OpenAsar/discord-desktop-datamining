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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
function getDurationMS() {
  (0, _assert.default)(process.type === 'browser', 'Expected process to be main');
  return Math.ceil(process.uptime() * 1_000);
}
var DesktopAnalyticsEventType = function (DesktopAnalyticsEventType) {
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainAppInit"] = 0] = "MainAppInit";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashCreated"] = 1] = "SplashCreated";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashDuration"] = 2] = "SplashDuration";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["SplashRestart"] = 3] = "SplashRestart";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinCreated"] = 4] = "MainWinCreated";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinLoadStart"] = 5] = "MainWinLoadStart";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["MainWinLoadComplete"] = 6] = "MainWinLoadComplete";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["FullTTIComplete"] = 7] = "FullTTIComplete";
  DesktopAnalyticsEventType[DesktopAnalyticsEventType["FullTTICompleteWithRestart"] = 8] = "FullTTICompleteWithRestart";
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
        case DesktopAnalyticsEventType.MainWinCreated:
          return 'mainwin_created';
        case DesktopAnalyticsEventType.MainWinLoadStart:
          return 'mainwin_loadstart';
        case DesktopAnalyticsEventType.MainWinLoadComplete:
          return 'mainwin_loadcomplete';
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
  mainWindowLoadTime = null;
  splashCreationTime = null;
  splashRestartTime = null;
  splashRestartTimepoint = null;
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
    if (Math.abs(Date.now() - persistedData.storeTimeMS) > 60 * 1000) {
      return;
    }
    this.previousSessionData = persistedData.sessionData;
  }
  pushDesktopEvent(evt) {
    analyticsInstance.pushEvent(DESKTOP_TTI_TYPE, 'desktop_tti', evt);
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
  trackSplashWindowDuration() {
    if (this.currentSessionData.splashCreationTime != null) {
      const duration = getDurationMS() - this.currentSessionData.splashCreationTime;
      const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.SplashDuration, duration);
      this.pushDesktopEvent(evt);
    }
  }
  trackMainWindowCreated() {
    this.currentSessionData.mainWindowCreationTime = getDurationMS();
    const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainWinCreated, null);
    this.pushDesktopEvent(evt);
  }
  trackMainWindowLoadStart() {
    this.currentSessionData.mainWindowLoadTime = getDurationMS();
    if (this.currentSessionData.mainWindowCreationTime != null) {
      const duration = getDurationMS() - this.currentSessionData.mainWindowCreationTime;
      const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainWinLoadStart, duration);
      this.pushDesktopEvent(evt);
    }
  }
  trackMainWindowDuration() {
    if (this.currentSessionData.mainWindowLoadTime != null) {
      const duration = getDurationMS() - this.currentSessionData.mainWindowLoadTime;
      const evt = createDesktopAnalyticsEvent(DesktopAnalyticsEventType.MainWinLoadComplete, duration);
      this.pushDesktopEvent(evt);
    }
  }
  trackSplashWindowRestart() {
    this.currentSessionData.splashRestartTime = getDurationMS();
    this.currentSessionData.splashRestartTimepoint = Date.now();
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
    var _this$previousSession;
    if (this.trackedFullTTI) {
      return;
    }
    this.trackedFullTTI = true;
    let fullDesktopDuration = null;
    const prevTimepoint = (_this$previousSession = this.previousSessionData) === null || _this$previousSession === void 0 ? void 0 : _this$previousSession.splashRestartTimepoint;
    if (prevTimepoint != null) {
      fullDesktopDuration = Date.now() - prevTimepoint;
      if (fullDesktopDuration < 0 || fullDesktopDuration > 120_000) {
        fullDesktopDuration = null;
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
const desktopTTIInstance = new DesktopTTIAnalytics();
function getDesktopTTI() {
  return desktopTTIInstance;
}