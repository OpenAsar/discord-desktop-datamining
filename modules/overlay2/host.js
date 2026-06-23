"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRenderer = createRenderer;
exports.destroyRenderer = destroyRenderer;
exports.eventHandler = eventHandler;
const electron_1 = require("electron");
const Backoff_1 = __importDefault(require("./Backoff"));
const overlay_module_1 = __importDefault(require("./overlay_module"));
const securityUtils_1 = require("./securityUtils");
const ipcMain = {
    on: (event, callback) => electron_1.ipcMain.on(`DISCORD_${event}`, callback),
    removeListener: (event, callback) => electron_1.ipcMain.removeListener(`DISCORD_${event}`, callback),
};
ipcMain.on('OPEN_EXTERNAL_URL', (_e, externalUrl) => {
    (0, securityUtils_1.saferShellOpenExternal)(externalUrl).catch((_err) => {
        console.error('Failed to open external URL', externalUrl);
    });
});
function webContentsSend(win, event, ...args) {
    if (win != null && win.webContents != null) {
        win.webContents.send(`DISCORD_${event}`, ...args);
    }
}
const renderers = {};
const accelerators = {
    Z: 'undo',
    Y: 'redo',
    X: 'cut',
    C: 'copy',
    V: 'paste',
    A: 'selectAll',
};
function handleAccelerators(contents, event) {
    if (event['type'] !== 'keyDown') {
        return false;
    }
    if (!event['modifiers'] || !event['modifiers'].includes('control')) {
        return false;
    }
    const fname = accelerators[event['keyCode']];
    if (fname == null) {
        return false;
    }
    const fn = contents[fname];
    if (!fn) {
        return false;
    }
    fn.apply(contents);
    return true;
}
function createRenderer(pid, url) {
    if (renderers[pid] != null) {
        return;
    }
    const { URL } = require('url');
    const urlWithPid = new URL(url);
    urlWithPid.searchParams.append('pid', pid.toString());
    url = urlWithPid.toString();
    renderers[pid] = {
        pid,
        url: `file://${__dirname}/start.html?pid=${pid.toString()}`,
        overlayURL: url,
        backoff: new Backoff_1.default(1000, 30000),
        window: new electron_1.BrowserWindow({
            show: false,
            skipTaskbar: true,
            transparent: true,
            webPreferences: {
                offscreen: true,
                nodeIntegration: false,
                sandbox: false,
                preload: require.resolve('./overlayPreload'),
                enableRemoteModule: false,
                contextIsolation: true,
            },
        }),
    };
    const renderer = renderers[pid];
    overlay_module_1.default.connectProcess(pid);
    if (renderer.window.webContents._setDiscordOverlayProcessId) {
        renderer.window.webContents._setDiscordOverlayProcessId(pid);
    }
    renderer.window.webContents.on('render-process-gone', (_e, details) => {
        overlay_module_1.default.logMessage(`Overlay for pid ${renderer.pid} crashed (${details.reason} | exit code: ${details.exitCode})`);
        overlay_module_1.default.sendCommand(renderer.pid, { message: 'relay', _relay: 'renderer_crashed' });
        destroyRenderer(pid);
    });
    renderer.window.webContents.on('preload-error', (_event, _input, error) => {
        overlay_module_1.default.logMessage(`Overlay for pid ${renderer.pid} crashed in preload: ${error}\n${error.stack}`);
        overlay_module_1.default.sendCommand(renderer.pid, { message: 'relay', _relay: 'renderer_preload_crashed' });
        destroyRenderer(pid);
    });
    renderer.window.webContents.on('console-message', (_event, _level, message, _lineNo, _sourceId) => {
        overlay_module_1.default.logMessage(`OverlayRenderer[${pid}]: ${message}`);
    });
    renderer.window.webContents.on('paint', (_event, _dirty, image, legacyWidth, legacyHeight) => {
        if (Buffer.isBuffer(image)) {
            const width = legacyWidth;
            const height = legacyHeight;
            overlay_module_1.default.sendFramebuffer(renderer.pid, image, width, height);
            return;
        }
        overlay_module_1.default.sendFramebuffer(renderer.pid, image.getBitmap(), image.getSize().width, image.getSize().height);
    });
    renderer.window.webContents.setWindowOpenHandler(({ url }) => {
        webContentsSend(renderer.window, 'REQUEST_OPEN_EXTERNAL_URL', url);
        return { action: 'deny' };
    });
    void renderer.window.loadURL(renderer.url);
}
function loadOverlay(pid) {
    const renderer = renderers[pid];
    if (renderer == null) {
        return;
    }
    if (renderer.url === renderer.overlayURL) {
        return;
    }
    renderer.window.webContents.on('cursor-changed', (_event, type) => {
        let cursor;
        switch (type) {
            case 'default':
                cursor = 'IDC_ARROW';
                break;
            case 'pointer':
                cursor = 'IDC_HAND';
                break;
            case 'crosshair':
                cursor = 'IDC_CROSS';
                break;
            case 'text':
                cursor = 'IDC_IBEAM';
                break;
            case 'wait':
                cursor = 'IDC_WAIT';
                break;
            case 'help':
                cursor = 'IDC_HELP';
                break;
            case 'move':
                cursor = 'IDC_SIZEALL';
                break;
            case 'ns-resize':
                cursor = 'IDC_SIZENS';
                break;
            case 'ew-resize':
                cursor = 'IDC_SIZEWE';
                break;
            case 'nwse-resize':
                cursor = 'IDC_SIZENWSE';
                break;
            case 'nesw-resize':
                cursor = 'IDC_SIZENESW';
                break;
            case 'none':
                cursor = '';
                break;
        }
        if (cursor != null) {
            overlay_module_1.default.sendCommand(renderer.pid, { message: 'set_cursor', cursor });
        }
    });
    renderer.window.webContents.on('start-drag', (_event, image, offset) => {
        overlay_module_1.default.sendCommand(renderer.pid, {
            message: 'set_drag_state',
            dragging: true,
            image: image.getBitmap().toJSON().data,
            size: image.getSize(),
            offset,
        });
    });
    renderer.window.webContents.on('stop-drag', (_event) => {
        overlay_module_1.default.sendCommand(renderer.pid, { message: 'set_drag_state', dragging: false });
    });
    renderer.window.webContents.on('ime-composition-range-changed', (_event, start, end, bounds) => {
        overlay_module_1.default.sendCommand(renderer.pid, { message: 'ime_composition_range_changed', start, end, bounds });
    });
    renderer.window.webContents.on('selection-bounds-changed', (_event, anchor, focus, isAnchorFirst) => {
        overlay_module_1.default.sendCommand(renderer.pid, { message: 'ime_selection_bounds_changed', anchor, focus, isAnchorFirst });
    });
    renderer.window.webContents.on('did-fail-load', (_e, errCode, errDesc, validatedURL) => {
        if (validatedURL !== renderer.url) {
            overlay_module_1.default.logMessage(`Failed non-overlay URL load (${validatedURL}) with code ${errCode} and description ${errDesc}`);
            return;
        }
        overlay_module_1.default.logMessage(`Failed overlay URL load (${validatedURL}) with code ${errCode} and description ${errDesc}`);
        overlay_module_1.default.sendCommand(renderer.pid, { message: 'relay', _relay: 'renderer_load_failed' });
        renderer.backoff.fail(() => {
            overlay_module_1.default.logMessage(`Retrying overlay URL load ${renderer.url}`);
            void renderer.window.loadURL(renderer.url);
        });
    });
    renderer.window.webContents.on('did-finish-load', () => {
        if (renderer.window.webContents.getURL() === renderer.overlayURL) {
            renderer.window.focusOnWebView();
            renderer.backoff.succeed();
            overlay_module_1.default.logMessage('Overlay is ready to show');
            renderer.window.webContents.invalidate();
            setTimeout(() => {
                overlay_module_1.default.sendCommand(renderer.pid, { message: 'relay', _relay: 'ready_to_show' });
            }, 200);
        }
    });
    if (renderer.window.webContents.sendImeEvent) {
        overlay_module_1.default.sendCommand(renderer.pid, { message: 'notify_ime_supported' });
    }
    renderer.url = renderer.overlayURL;
    void renderer.window.loadURL(renderer.url);
}
function destroyRenderer(pid) {
    const renderer = renderers[pid];
    if (renderer == null) {
        return;
    }
    overlay_module_1.default.disconnectProcess(pid);
    renderer.backoff.cancel();
    if (!renderer.window.isDestroyed()) {
        renderer.window.destroy();
    }
    delete renderers[pid];
}
function needsTranslation(event) {
    return 'msg' in event || !('type' in event);
}
function eventHandler(pid, event) {
    const renderer = renderers[pid];
    if (renderer == null || renderer.window == null || renderer.window.isDestroyed()) {
        return;
    }
    const _screen = require('electron').screen;
    const osrPaintsAtDpr1 = parseInt(process.versions.electron, 10) >= 42;
    if (event.message === 'graphics_info') {
        if (event.width > 0 && event.height > 0) {
            if (osrPaintsAtDpr1) {
                renderer.window.setContentSize(event.width, event.height);
            }
            else {
                const screenRect = { x: 0, y: 0, width: event.width, height: event.height };
                const dipRect = _screen.screenToDipRect(renderer.window, screenRect);
                renderer.window.setContentSize(dipRect.width, dipRect.height);
            }
            renderer.window.webContents.setFrameRate(60);
        }
        else {
            renderer.window.webContents.setFrameRate(1);
        }
        renderer.window.webContents.invalidate();
    }
    else if (event.message === 'input_event') {
        renderer.window.focusOnWebView();
        const translated = needsTranslation(event) ? overlay_module_1.default.translateInputEvent(event) : event;
        if (translated) {
            if (!handleAccelerators(renderer.window.webContents, translated)) {
                if (!osrPaintsAtDpr1 && translated.x && translated.y) {
                    const dipPoint = _screen.screenToDipPoint({ x: translated.x, y: translated.y });
                    translated.x = dipPoint.x;
                    translated.y = dipPoint.y;
                }
                renderer.window.webContents.sendInputEvent(translated);
            }
        }
    }
    else if (event.message === 'renderer_started') {
        overlay_module_1.default.logMessage(`Overlay renderer for ${pid} started successfully.`);
        renderer.started = true;
        if (!renderer.first_framebuffer) {
            renderer.window.webContents.invalidate();
        }
        else {
            loadOverlay(pid);
        }
    }
    else if (event.message === 'first_framebuffer') {
        renderer.first_framebuffer = true;
        if (renderer.started) {
            loadOverlay(pid);
        }
    }
    else if (event.message === 'ime') {
        renderer.window.webContents.sendImeEvent(event);
    }
}
