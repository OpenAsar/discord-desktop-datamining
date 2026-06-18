"use strict";
const DesktopOverlay = require('./discord_desktop_overlay.node');
let createHostWindowCallback = (pid) => '';
let destroyHostWindowCallback = () => { };
let reloadHostWindowCallback = (pid) => { };
const trackedGames = new Set();
let targetGamePID = 0;
const DesktopOverlayModuleInterface = {
    ...DesktopOverlay,
    version: 1,
    setHostWindowCallbacks: (create, destroy, reload) => {
        createHostWindowCallback = create;
        destroyHostWindowCallback = destroy;
        reloadHostWindowCallback = reload;
    },
    readyToShow: (_pid) => {
    },
    trackGame: async (pid) => {
        if (trackedGames.size === 0) {
            const windowHandle = await createHostWindowCallback(pid);
            DesktopOverlay.setWindowHandle(windowHandle);
        }
        trackedGames.add(pid);
        DesktopOverlay.trackGame(pid);
    },
    untrackGame: (pid) => {
        DesktopOverlay.untrackGame(pid);
        trackedGames.delete(pid);
        if (trackedGames.size === 0) {
            DesktopOverlay.setWindowHandle('');
            destroyHostWindowCallback();
            targetGamePID = 0;
        }
    },
    setFocusCallback: (focus) => {
        function wrappedCallback(pid, windowHandle, windowClass) {
            const previousTargetGamePID = targetGamePID;
            targetGamePID = pid;
            if (previousTargetGamePID !== 0 && targetGamePID !== 0 && targetGamePID !== previousTargetGamePID) {
                reloadHostWindowCallback(targetGamePID);
            }
            focus(targetGamePID, windowHandle, windowClass);
        }
        DesktopOverlay.setFocusCallback(wrappedCallback);
    },
    setFocusLostCallback: (focus) => {
        DesktopOverlay.setFocusLostCallback(focus);
    },
};
module.exports = DesktopOverlayModuleInterface;
