"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputCapturer = void 0;
exports.inputCaptureSetWatcher = inputCaptureSetWatcher;
exports.inputCaptureRegisterElement = inputCaptureRegisterElement;
const linux_dom_keycodes_1 = require("./linux_dom_keycodes");
const discordNative = globalThis.window?.DiscordNative;
const KEYBOARD_TYPE = 0;
const MOUSE_BUTTON_TYPE = 1;
const LEFT_MOUSE_BUTTON_CODE = discordNative.process.platform === 'win32' ? 0 : 1;
const SEQUENCE_CAPTURE_TIMEOUT = 5000;
const MAX_SEQUENCE_LENGTH = 4;
const IS_LINUX = discordNative.process.platform === 'linux';
const IS_WAYLAND_SESSION = IS_LINUX
    && (process.env.XDG_SESSION_TYPE?.startsWith('wayland') === true || (process.env.WAYLAND_DISPLAY ?? '') !== '');
let inputWatchAll = null;
let portalTriggerFor = null;
function isPortalTrigger(entries) {
    return portalTriggerFor(entries.map(([type, code]) => [type, code])) !== '';
}
class InputCapturer {
    static _activeCapturers = [];
    _timeout = null;
    _callback = null;
    _capturedInputSequence = [];
    constructor(callback) {
        this._callback = callback;
    }
    start() {
        if (this.isActive()) {
            return;
        }
        this._timeout = setTimeout(() => this.stop(), SEQUENCE_CAPTURE_TIMEOUT);
        InputCapturer._activeCapturers.push(this);
        if (InputCapturer._activeCapturers.length === 1) {
            inputWatchAll(InputCapturer._globalInputHandler);
            InputCapturer._setDomListeners(true);
        }
    }
    stop() {
        InputCapturer._activeCapturers = InputCapturer._activeCapturers.filter((x) => x !== this);
        if (InputCapturer._activeCapturers.length === 0) {
            inputWatchAll(null);
            InputCapturer._setDomListeners(false);
        }
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        const captured = this._capturedInputSequence;
        this._capturedInputSequence = [];
        const sequence = IS_WAYLAND_SESSION && !isPortalTrigger(captured) ? [] : captured;
        if (this._callback != null) {
            this._callback(sequence.map((entry) => [entry[0], entry[1], entry[3]]));
        }
    }
    isActive() {
        return this._timeout != null;
    }
    _handleInputEvent(type, state, code, deviceId) {
        if (state === 0) {
            this._handleRelease(type, code);
            return;
        }
        if (this._capturedInputSequence.some(([t, c, _s, did]) => t === type && c === code && did === deviceId)) {
            return;
        }
        const entry = [type, code, true, deviceId];
        if (IS_WAYLAND_SESSION) {
            this._handleWaylandPress(entry);
            return;
        }
        this._capturedInputSequence.push(entry);
        if (this._capturedInputSequence.length === MAX_SEQUENCE_LENGTH) {
            this.stop();
        }
    }
    _handleRelease(type, code) {
        if (IS_WAYLAND_SESSION) {
            this._capturedInputSequence = this._capturedInputSequence.filter(([t, c]) => !(t === type && c === code));
            return;
        }
        let allEntriesReleased = true;
        for (const entry of this._capturedInputSequence) {
            if (entry[0] === type && entry[1] === code) {
                entry[2] = false;
            }
            allEntriesReleased = allEntriesReleased && entry[2] === false;
        }
        if (this._capturedInputSequence.length > 0 && allEntriesReleased) {
            this.stop();
        }
    }
    _handleWaylandPress(entry) {
        const [type, code] = entry;
        if (type !== KEYBOARD_TYPE) {
            return;
        }
        if (linux_dom_keycodes_1.LINUX_MODIFIER_X11_CODES.has(code)) {
            this._capturedInputSequence.push(entry);
            return;
        }
        const candidate = [...this._capturedInputSequence, entry];
        if (isPortalTrigger(candidate)) {
            this._capturedInputSequence = candidate;
            this.stop();
        }
    }
    static _globalInputHandler(type, state, code, deviceId) {
        if (type === MOUSE_BUTTON_TYPE && code === LEFT_MOUSE_BUTTON_CODE) {
            return;
        }
        for (const capturer of InputCapturer._activeCapturers) {
            capturer._handleInputEvent(type, state, code, deviceId);
        }
    }
    static _handleDomKeyEvent(event) {
        const pressed = event.type === 'keydown';
        if (!event.isTrusted || event.code === 'Escape' || (pressed && event.repeat)) {
            return;
        }
        const code = (0, linux_dom_keycodes_1.domCodeToX11KeyCode)(event.code);
        if (code == null) {
            return;
        }
        if (pressed) {
            event.preventDefault();
        }
        InputCapturer._globalInputHandler(KEYBOARD_TYPE, pressed ? 1 : 0, code, linux_dom_keycodes_1.LINUX_DEFAULT_DEVICE_ID);
    }
    static _handleDomMouseEvent(event) {
        const button = (0, linux_dom_keycodes_1.domMouseButtonToX11Button)(event.button);
        if (!event.isTrusted || button == null) {
            return;
        }
        const pressed = event.type === 'mousedown';
        InputCapturer._globalInputHandler(MOUSE_BUTTON_TYPE, pressed ? 1 : 0, button, linux_dom_keycodes_1.LINUX_DEFAULT_DEVICE_ID);
    }
    static _setDomListeners(enabled) {
        if (!IS_LINUX) {
            return;
        }
        const method = enabled ? 'addEventListener' : 'removeEventListener';
        for (const type of ['keydown', 'keyup']) {
            window[method](type, InputCapturer._handleDomKeyEvent, true);
        }
        for (const type of ['mousedown', 'mouseup']) {
            window[method](type, InputCapturer._handleDomMouseEvent, true);
        }
    }
}
exports.InputCapturer = InputCapturer;
function inputCaptureSetWatcher(inputWatcher, portalTrigger) {
    inputWatchAll = inputWatcher;
    portalTriggerFor = portalTrigger ?? null;
}
function inputCaptureRegisterElement(elementId, callback) {
    if (inputWatchAll == null) {
        throw new Error('Input capturing is missing an input watcher');
    }
    if (IS_WAYLAND_SESSION && portalTriggerFor == null) {
        throw new Error('Input capturing is missing a portal trigger formatter');
    }
    const capturer = new InputCapturer(callback);
    const registerUserInteractionHandler = discordNative.app.registerUserInteractionHandler;
    const unregisterFunctions = [
        registerUserInteractionHandler(elementId, 'click', (_) => capturer.start()),
        registerUserInteractionHandler(elementId, 'focus', (_) => capturer.start()),
        registerUserInteractionHandler(elementId, 'blur', (_) => capturer.stop()),
    ];
    return () => {
        for (const unregister of unregisterFunctions) {
            unregister();
        }
        capturer.stop();
    };
}
