import { addBreadcrumb, getCurrentHub } from '@sentry/core';
import { app, autoUpdater, powerMonitor, screen } from 'electron';
import { onBrowserWindowCreated, onWebContentsCreated, whenAppReady } from '../electron-normalize';
import { getRendererProperties, trackRendererProperties } from '../renderers';
const DEFAULT_OPTIONS = {
    // We exclude events starting with remote as they can be quite verbose
    app: (name) => !name.startsWith('remote-'),
    autoUpdater: () => true,
    webContents: (name) => ['dom-ready', 'context-menu', 'load-url', 'destroyed'].includes(name),
    browserWindow: (name) => [
        'closed',
        'close',
        'unresponsive',
        'responsive',
        'show',
        'blur',
        'focus',
        'hide',
        'maximize',
        'minimize',
        'restore',
        'enter-full-screen',
        'leave-full-screen',
    ].includes(name),
    screen: () => true,
    powerMonitor: () => true,
    captureWindowTitles: false,
};
/** Converts all user supplied options to function | false */
export function normalizeOptions(options) {
    return Object.keys(options).reduce((obj, k) => {
        if (k === 'captureWindowTitles') {
            obj[k] = !!options[k];
        }
        else {
            const val = options[k];
            if (Array.isArray(val)) {
                obj[k] = (name) => val.includes(name);
            }
            else if (typeof val === 'function' || val === false) {
                obj[k] = val;
            }
        }
        return obj;
    }, {});
}
/** Adds breadcrumbs for Electron events. */
export class ElectronBreadcrumbs {
    /**
     * @param _options Integration options
     */
    constructor(options = {}) {
        /** @inheritDoc */
        this.name = ElectronBreadcrumbs.id;
        this._options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), normalizeOptions(options));
    }
    /** @inheritDoc */
    setupOnce() {
        var _a;
        const initOptions = (_a = getCurrentHub().getClient()) === null || _a === void 0 ? void 0 : _a.getOptions();
        trackRendererProperties();
        void whenAppReady.then(() => {
            // We can't access these until app 'ready'
            if (this._options.screen) {
                this._patchEventEmitter(screen, 'screen', this._options.screen);
            }
            if (this._options.powerMonitor) {
                this._patchEventEmitter(powerMonitor, 'powerMonitor', this._options.powerMonitor);
            }
        });
        if (this._options.app) {
            this._patchEventEmitter(app, 'app', this._options.app);
        }
        if (this._options.autoUpdater) {
            this._patchEventEmitter(autoUpdater, 'autoUpdater', this._options.autoUpdater);
        }
        if (this._options.browserWindow) {
            onBrowserWindowCreated((window) => {
                var _a;
                const id = window.webContents.id;
                const windowName = ((_a = initOptions === null || initOptions === void 0 ? void 0 : initOptions.getRendererName) === null || _a === void 0 ? void 0 : _a.call(initOptions, window.webContents)) || 'window';
                this._patchEventEmitter(window, windowName, this._options.browserWindow, id);
            });
        }
        if (this._options.webContents) {
            onWebContentsCreated((contents) => {
                var _a;
                const id = contents.id;
                const webContentsName = ((_a = initOptions === null || initOptions === void 0 ? void 0 : initOptions.getRendererName) === null || _a === void 0 ? void 0 : _a.call(initOptions, contents)) || 'renderer';
                this._patchEventEmitter(contents, webContentsName, this._options.webContents, id);
            });
        }
    }
    /**
     * Monkey patches the EventEmitter to capture breadcrumbs for the specified events. 🙈
     */
    _patchEventEmitter(emitter, category, shouldCapture, id) {
        const emit = emitter.emit.bind(emitter);
        emitter.emit = (event, ...args) => {
            var _a, _b;
            if (shouldCapture && shouldCapture(event)) {
                const breadcrumb = {
                    category: 'electron',
                    message: `${category}.${event}`,
                    timestamp: new Date().getTime() / 1000,
                    type: 'ui',
                };
                if (id) {
                    breadcrumb.data = Object.assign({}, getRendererProperties(id));
                    if (!this._options.captureWindowTitles && ((_a = breadcrumb.data) === null || _a === void 0 ? void 0 : _a.title)) {
                        (_b = breadcrumb.data) === null || _b === void 0 ? true : delete _b.title;
                    }
                }
                addBreadcrumb(breadcrumb);
            }
            return emit(event, ...args);
        };
    }
}
/** @inheritDoc */
ElectronBreadcrumbs.id = 'ElectronBreadcrumbs';
//# sourceMappingURL=electron-breadcrumbs.js.map