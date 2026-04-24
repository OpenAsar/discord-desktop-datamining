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
exports.injectBuildInfo = injectBuildInfo;
exports.injectModuleUpdater = injectModuleUpdater;
exports.injectUpdater = injectUpdater;
const electron_1 = __importDefault(require("electron"));
const process = __importStar(require("process"));
const DiscordIPC_1 = require("../common/DiscordIPC");
let injectedBuildInfo = null;
let injectedModuleUpdater = null;
let injectedUpdater = null;
function injectBuildInfo(buildInfo) {
    injectedBuildInfo = buildInfo;
}
function injectModuleUpdater(moduleUpdater) {
    injectedModuleUpdater = moduleUpdater;
}
function injectUpdater(updater) {
    injectedUpdater = updater;
}
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.APP_GET_RELEASE_CHANNEL_SYNC, (event) => {
    event.returnValue = injectedBuildInfo.releaseChannel;
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.APP_GET_HOST_VERSION_SYNC, (event) => {
    event.returnValue = electron_1.default.app.getVersion();
});
async function newUpdaterGetModuleVersions(updater) {
    const queryOptions = {};
    return (await updater.queryCurrentVersionsWithOptions(queryOptions)).current_modules;
}
function newUpdaterGetBuildNumber(updater) {
    const queryOptions = {};
    const version = updater.queryCurrentVersionsWithOptionsSync(queryOptions);
    if (version.running_update != null) {
        return version.running_update.metadata_version;
    }
    return version.last_successful_update.metadata_version;
}
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.APP_GET_BUILD_NUMBER, (event) => {
    const newUpdater = injectedUpdater?.getUpdater();
    if (newUpdater != null) {
        event.returnValue = newUpdaterGetBuildNumber(newUpdater);
        return;
    }
    event.returnValue = null;
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.APP_GET_ARCH, (event) => {
    event.returnValue = process.arch;
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_GET_MODULE_VERSIONS, async (_) => {
    const newUpdater = injectedUpdater?.getUpdater();
    if (newUpdater != null) {
        return newUpdaterGetModuleVersions(newUpdater);
    }
    const versions = {};
    const installed = injectedModuleUpdater != null ? injectedModuleUpdater.getInstalled() : {};
    for (const name of Object.keys(installed)) {
        versions[name] = installed[name].installedVersion;
    }
    return versions;
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_GET_PATH, async (_, path) => {
    return electron_1.default.app.getPath(path);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_SET_BADGE_COUNT, async (_, count) => {
    electron_1.default.app.setBadgeCount(count);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_DOCK_SET_BADGE, async (_, badge) => {
    if (electron_1.default.app.dock != null) {
        electron_1.default.app.dock.setBadge(badge);
    }
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_DOCK_BOUNCE, async (_, type) => {
    if (electron_1.default.app.dock != null) {
        return electron_1.default.app.dock.bounce(type);
    }
    else {
        return -1;
    }
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_DOCK_CANCEL_BOUNCE, async (_, id) => {
    if (electron_1.default.app.dock != null) {
        electron_1.default.app.dock.cancelBounce(id);
    }
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_RELAUNCH, async (_) => {
    electron_1.default.session.defaultSession.flushStorageData();
    electron_1.default.app.relaunch();
    electron_1.default.app.exit(0);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_GET_DEFAULT_DOUBLE_CLICK_ACTION, async (_) => {
    return electron_1.default.systemPreferences.getUserDefault('AppleActionOnDoubleClick', 'string');
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_PAUSE_FRAME_EVICTOR, async (_) => {
    return electron_1.default.app.pauseFrameEvictionManager?.();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_UNPAUSE_FRAME_EVICTOR, async (_) => {
    return electron_1.default.app.unpauseFrameEvictionManager?.();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_GET_PREFERRED_SYSTEM_LANGUAGES, async (_) => {
    return electron_1.default.app.getPreferredSystemLanguages();
});
