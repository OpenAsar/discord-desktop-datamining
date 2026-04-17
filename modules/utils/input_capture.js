"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCaptureSetWatcher = inputCaptureSetWatcher;
exports.inputCaptureRegisterElement = inputCaptureRegisterElement;
const discordNative = globalThis.window?.DiscordNative;
const MOUSE_BUTTON_TYPE = 1;
const LEFT_MOUSE_BUTTON_CODE = discordNative.process.platform === 'win32' ? 0 : 1;
const SEQUENCE_CAPTURE_TIMEOUT = 5000;
const MAX_SEQUENCE_LENGTH = 4;
let inputWatchAll = null;
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
        }
    }
    stop() {
        InputCapturer._activeCapturers = InputCapturer._activeCapturers.filter((x) => x !== this);
        if (InputCapturer._activeCapturers.length === 0) {
            inputWatchAll(null);
        }
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        const inputSequence = this._capturedInputSequence.map((entry) => [entry[0], entry[1], entry[3]]);
        this._capturedInputSequence = [];
        if (this._callback != null) {
            this._callback(inputSequence);
        }
    }
    isActive() {
        return this._timeout != null;
    }
    _handleInputEvent(type, state, code, deviceId) {
        if (state === 0) {
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
        else if (!this._capturedInputSequence.some(([t, c, _s, did]) => t === type && c === code && did === deviceId)) {
            this._capturedInputSequence.push([type, code, true, deviceId]);
            if (this._capturedInputSequence.length === MAX_SEQUENCE_LENGTH) {
                this.stop();
            }
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
}
function inputCaptureSetWatcher(inputWatcher) {
    inputWatchAll = inputWatcher;
}
function inputCaptureRegisterElement(elementId, callback) {
    if (inputWatchAll == null) {
        throw new Error('Input capturing is missing an input watcher');
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
