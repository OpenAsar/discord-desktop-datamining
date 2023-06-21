Object.defineProperty(exports, "__esModule", { value: true });
exports.capturePage = exports.getCrashesDirectory = exports.usesCrashpad = exports.rendererRequiresCrashReporterStart = exports.onWebContentsCreated = exports.onBrowserWindowCreated = exports.onChildProcessGone = exports.onRendererProcessGone = exports.CRASH_REASONS = exports.EXIT_REASONS = exports.supportsFullProtocol = exports.whenAppReady = exports.isPackaged = void 0;
const utils_1 = require("@sentry/utils");
const electron_1 = require("electron");
const path_1 = require("path");
const parsed = (0, utils_1.parseSemver)(process.versions.electron);
const version = { major: parsed.major || 0, minor: parsed.minor || 0, patch: parsed.patch || 0 };
/** Returns if the app is packaged. Copied from Electron to support < v3 */
exports.isPackaged = (() => {
    const execFile = (0, path_1.basename)(process.execPath).toLowerCase();
    if (process.platform === 'win32') {
        return execFile !== 'electron.exe';
    }
    return execFile !== 'electron';
})();
/** A promise that is resolved when the app is ready */
exports.whenAppReady = (() => {
    return electron_1.app.isReady()
        ? Promise.resolve()
        : new Promise((resolve) => {
            electron_1.app.once('ready', () => {
                resolve();
            });
        });
})();
/**
 * Electron >= 5 support full protocol API
 */
function supportsFullProtocol() {
    return version.major >= 5;
}
exports.supportsFullProtocol = supportsFullProtocol;
exports.EXIT_REASONS = [
    'clean-exit',
    'abnormal-exit',
    'killed',
    'crashed',
    'oom',
    'launch-failed',
    'integrity-failure',
];
exports.CRASH_REASONS = ['crashed', 'oom'];
/**
 * Implements 'render-process-gone' event across Electron versions
 */
function onRendererProcessGone(reasons, callback) {
    const supportsRenderProcessGone = version.major >= 10 || (version.major === 9 && version.minor >= 1) || (version.major === 8 && version.minor >= 4);
    if (supportsRenderProcessGone) {
        electron_1.app.on('render-process-gone', (_, contents, details) => {
            if (reasons.includes(details.reason)) {
                callback(contents, details);
            }
        });
    }
    else {
        onWebContentsCreated((contents) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            contents.on('crashed', (__, killed) => {
                // When using Breakpad, crashes are incorrectly reported as killed
                const reason = usesCrashpad() && killed ? 'killed' : 'crashed';
                if (reasons.includes(reason)) {
                    callback(contents, { reason });
                }
            });
        });
    }
}
exports.onRendererProcessGone = onRendererProcessGone;
/**
 * Calls callback on child process crash if Electron version support 'child-process-gone' event
 */
function onChildProcessGone(reasons, callback) {
    if (version.major >= 11) {
        electron_1.app.on('child-process-gone', (_, details) => {
            if (reasons.includes(details.reason)) {
                callback(details);
            }
        });
    }
    else {
        // eslint-disable-next-line deprecation/deprecation
        electron_1.app.on('gpu-process-crashed', (_, killed) => {
            const reason = killed ? 'killed' : 'crashed';
            if (reasons.includes(reason)) {
                callback({ type: 'GPU', reason });
            }
        });
    }
}
exports.onChildProcessGone = onChildProcessGone;
/** Calls callback when BrowserWindow are created */
function onBrowserWindowCreated(callback) {
    electron_1.app.on('browser-window-created', (_, window) => {
        // SetImmediate is required for window.id to be correct in older versions of Electron
        // https://github.com/electron/electron/issues/12036
        if (version.major >= 3) {
            callback(window);
        }
        else {
            setImmediate(() => {
                if (window.isDestroyed()) {
                    return;
                }
                callback(window);
            });
        }
    });
}
exports.onBrowserWindowCreated = onBrowserWindowCreated;
/** Calls callback when WebContents are created */
function onWebContentsCreated(callback) {
    electron_1.app.on('web-contents-created', (_, contents) => {
        // SetImmediate is required for contents.id to be correct in older versions of Electron
        // https://github.com/electron/electron/issues/12036
        if (version.major >= 3) {
            callback(contents);
        }
        else {
            setImmediate(() => {
                if (contents.isDestroyed()) {
                    return;
                }
                callback(contents);
            });
        }
    });
}
exports.onWebContentsCreated = onWebContentsCreated;
/**
 * Electron < 9 requires `crashReporter.start()` in the renderer
 */
function rendererRequiresCrashReporterStart() {
    if (process.platform === 'darwin') {
        return false;
    }
    return version.major < 9;
}
exports.rendererRequiresCrashReporterStart = rendererRequiresCrashReporterStart;
/**
 * Uses Crashpad on Linux
 * https://github.com/electron/electron/issues/27859
 */
function crashpadLinux() {
    if (version.major >= 16) {
        return true;
    }
    if (version.major < 15) {
        return false;
    }
    // Crashpad Linux for v15 is behind a switch
    return electron_1.app.commandLine.hasSwitch('enable-crashpad');
}
/** Is using Crashpad */
function usesCrashpad() {
    return (process.platform === 'darwin' ||
        (process.platform === 'win32' && version.major >= 6) ||
        (process.platform === 'linux' && crashpadLinux()));
}
exports.usesCrashpad = usesCrashpad;
/**
 * Electron >= 9 uses `app.getPath('crashDumps')` rather than
 * `crashReporter.getCrashesDirectory()`
 */
function getCrashesDirectory() {
    return version.major >= 9
        ? electron_1.app.getPath('crashDumps')
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            electron_1.crashReporter.getCrashesDirectory();
}
exports.getCrashesDirectory = getCrashesDirectory;
/** Captures a NativeImage from a BrowserWindow */
function capturePage(window) {
    // Pre-Electron 5, BrowserWindow.capturePage() uses callbacks
    if (version.major < 5) {
        return new Promise((resolve) => {
            window.capturePage(resolve);
        });
    }
    return window.capturePage();
}
exports.capturePage = capturePage;
//# sourceMappingURL=electron-normalize.js.map