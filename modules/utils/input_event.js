"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapInputEventRegister = wrapInputEventRegister;
exports.wrapInputEventUnregister = wrapInputEventUnregister;
const discordNative = globalThis.window?.DiscordNative;
const RESTRICTED_SCAN_CODE_RANGES = {
    win32: [[65, 90]],
    darwin: [[4, 29]],
    linux: [
        [24, 33],
        [38, 46],
        [52, 58],
    ],
};
const MAX_SINGLE_CHARACTER_BINDS = 8;
const singleCharacterBinds = new Set();
const isRestrictedSingleCharacterKeybind = (buttons) => {
    if (buttons == null || buttons.length !== 1) {
        return false;
    }
    const button = buttons[0];
    if (button.length !== 2) {
        return false;
    }
    const deviceType = button[0];
    if (deviceType !== 0) {
        return false;
    }
    const _scanCode = button[1];
    if (buttons.length === 1 && buttons[0].length === 2) {
        const deviceType = buttons[0][0];
        const scanCode = buttons[0][1];
        if (deviceType === 0) {
            const restrictedRanges = RESTRICTED_SCAN_CODE_RANGES[discordNative.process.platform];
            for (const restrictedRange of restrictedRanges) {
                if (scanCode >= restrictedRange[0] && scanCode <= restrictedRange[1]) {
                    return true;
                }
            }
        }
    }
    return false;
};
function wrapInputEventRegister(originalFunction) {
    return (eventId, buttons, callback, options) => {
        singleCharacterBinds.delete(eventId);
        if (isRestrictedSingleCharacterKeybind(buttons)) {
            if (singleCharacterBinds.size >= MAX_SINGLE_CHARACTER_BINDS) {
                throw new Error('Invalid keybind');
            }
            singleCharacterBinds.add(eventId);
        }
        originalFunction(eventId, buttons, callback, options);
    };
}
function wrapInputEventUnregister(originalFunction) {
    return (eventId) => {
        singleCharacterBinds.delete(eventId);
        originalFunction(eventId);
    };
}
