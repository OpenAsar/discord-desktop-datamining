import { parseSemver } from '@sentry/utils';
import { app, crashReporter } from 'electron';
import { basename } from 'path';
const parsed = parseSemver(process.versions.electron);
const version = { major: parsed.major || 0, minor: parsed.minor || 0, patch: parsed.patch || 0 };
/** Returns if the app is packaged. Copied from Electron to support < v3 */
export const isPackaged = (() => {
    const execFile = basename(process.execPath).toLowerCase();
    if (process.platform === 'win32') {
        return execFile !== 'electron.exe';
    }
    return execFile !== 'electron';
})();
/** A promise that is resolved when the app is ready */
export const whenAppReady = (() => {
    return app.isReady()
        ? Promise.resolve()
        : new Promise((resolve) => {
            app.once('ready', () => {
                resolve();
            });
        });
})();
/**
 * Electron >= 5 support full protocol API
 */
export function supportsFullProtocol() {
    return version.major >= 5;
}
export const EXIT_REASONS = [
    'clean-exit',
    'abnormal-exit',
    'killed',
    'crashed',
    'oom',
    'launch-failed',
    'integrity-failure',
];
export const CRASH_REASONS = ['crashed', 'oom'];
/**
 * Implements 'render-process-gone' event across Electron versions
 */
export function onRendererProcessGone(reasons, callback) {
    const supportsRenderProcessGone = version.major >= 10 || (version.major === 9 && version.minor >= 1) || (version.major === 8 && version.minor >= 4);
    if (supportsRenderProcessGone) {
        app.on('render-process-gone', (_, contents, details) => {
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
/**
 * Calls callback on child process crash if Electron version support 'child-process-gone' event
 */
export function onChildProcessGone(reasons, callback) {
    if (version.major >= 11) {
        app.on('child-process-gone', (_, details) => {
            if (reasons.includes(details.reason)) {
                callback(details);
            }
        });
    }
    else {
        // eslint-disable-next-line deprecation/deprecation
        app.on('gpu-process-crashed', (_, killed) => {
            const reason = killed ? 'killed' : 'crashed';
            if (reasons.includes(reason)) {
                callback({ type: 'GPU', reason });
            }
        });
    }
}
/** Calls callback when BrowserWindow are created */
export function onBrowserWindowCreated(callback) {
    app.on('browser-window-created', (_, window) => {
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
/** Calls callback when WebContents are created */
export function onWebContentsCreated(callback) {
    app.on('web-contents-created', (_, contents) => {
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
/**
 * Electron < 9 requires `crashReporter.start()` in the renderer
 */
export function rendererRequiresCrashReporterStart() {
    if (process.platform === 'darwin') {
        return false;
    }
    return version.major < 9;
}
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
    return app.commandLine.hasSwitch('enable-crashpad');
}
/** Is using Crashpad */
export function usesCrashpad() {
    return (process.platform === 'darwin' ||
        (process.platform === 'win32' && version.major >= 6) ||
        (process.platform === 'linux' && crashpadLinux()));
}
/**
 * Electron >= 9 uses `app.getPath('crashDumps')` rather than
 * `crashReporter.getCrashesDirectory()`
 */
export function getCrashesDirectory() {
    return version.major >= 9
        ? app.getPath('crashDumps')
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            crashReporter.getCrashesDirectory();
}
/** Captures a NativeImage from a BrowserWindow */
export function capturePage(window) {
    // Pre-Electron 5, BrowserWindow.capturePage() uses callbacks
    if (version.major < 5) {
        return new Promise((resolve) => {
            window.capturePage(resolve);
        });
    }
    return window.capturePage();
}
//# sourceMappingURL=electron-normalize.js.map