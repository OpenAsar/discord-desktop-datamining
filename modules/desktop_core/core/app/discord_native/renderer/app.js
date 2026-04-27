"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
const DiscordIPC_1 = require("../common/DiscordIPC");
const paths_1 = require("../common/paths");
const crashReporter_1 = require("./crashReporter");
const releaseChannel = DiscordIPC_1.DiscordIPC.renderer.sendSync(DiscordIPC_1.IPCEvents.APP_GET_RELEASE_CHANNEL_SYNC);
const hostVersion = DiscordIPC_1.DiscordIPC.renderer.sendSync(DiscordIPC_1.IPCEvents.APP_GET_HOST_VERSION_SYNC);
const buildNumber = DiscordIPC_1.DiscordIPC.renderer.sendSync(DiscordIPC_1.IPCEvents.APP_GET_BUILD_NUMBER);
const appArch = DiscordIPC_1.DiscordIPC.renderer.sendSync(DiscordIPC_1.IPCEvents.APP_GET_ARCH);
void (0, crashReporter_1.updateCrashReporter)({ nativeBuildNumber: buildNumber?.toString() ?? 'null' });
let moduleVersions = {};
void DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_GET_MODULE_VERSIONS).then((versions) => {
    moduleVersions = versions;
});
electron_1.default.ipcRenderer.on('DISCORD_MODULE_INSTALLED', async (_) => {
    moduleVersions = await DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_GET_MODULE_VERSIONS);
});
function getReleaseChannel() {
    return releaseChannel;
}
function getVersion() {
    return hostVersion;
}
function getBuildNumber() {
    return buildNumber;
}
function getAppArch() {
    return appArch;
}
function getModuleVersions() {
    return moduleVersions;
}
function setBadgeCount(count) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_SET_BADGE_COUNT, count);
}
function dockSetBadge(badge) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_DOCK_SET_BADGE, badge);
}
async function dockBounce(type) {
    return await DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_DOCK_BOUNCE, type);
}
function dockCancelBounce(id) {
    if (typeof id === 'number' && !isNaN(id) && id >= 0) {
        return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_DOCK_CANCEL_BOUNCE, id);
    }
    return Promise.resolve();
}
function relaunch() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_RELAUNCH);
}
function getDefaultDoubleClickAction() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_GET_DEFAULT_DOUBLE_CLICK_ACTION);
}
function pauseFrameEvictor() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_PAUSE_FRAME_EVICTOR);
}
function unpauseFrameEvictor() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_UNPAUSE_FRAME_EVICTOR);
}
function getPreferredSystemLanguages() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_GET_PREFERRED_SYSTEM_LANGUAGES);
}
function getOpenOnStart() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.APP_GET_OPEN_ON_START);
}
function registerUserInteractionHandler(elementId, eventType, callback) {
    const element = document.getElementById(elementId);
    if (element == null) {
        throw new Error(`Element with id '${elementId}' was not found`);
    }
    function handleUserInteraction(ev) {
        if (!ev.isTrusted) {
            return;
        }
        callback(ev);
    }
    element.addEventListener(eventType, handleUserInteraction);
    return () => {
        element.removeEventListener(eventType, handleUserInteraction);
    };
}
module.exports = {
    getReleaseChannel,
    getVersion,
    getModuleVersions,
    getBuildNumber,
    getAppArch,
    getPath: paths_1.getPath,
    setBadgeCount,
    dock: {
        setBadge: dockSetBadge,
        bounce: dockBounce,
        cancelBounce: dockCancelBounce,
    },
    relaunch,
    getDefaultDoubleClickAction,
    pauseFrameEvictor,
    unpauseFrameEvictor,
    getPreferredSystemLanguages,
    getOpenOnStart,
    registerUserInteractionHandler,
};
