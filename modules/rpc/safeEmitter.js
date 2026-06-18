"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSafeEmitter = createSafeEmitter;
function createSafeEmitter() {
    const callbackMap = new Map();
    function addListener(name, listener, once) {
        let listeners = callbackMap.get(name);
        if (listeners == null) {
            listeners = new Set();
            callbackMap.set(name, listeners);
        }
        if (once) {
            const originalListener = listener;
            listener = (...args) => {
                originalListener(...args);
                listeners.delete(originalListener);
            };
        }
        listeners.add(listener);
    }
    function invokeListener(name, ...args) {
        const listeners = callbackMap.get(name);
        if (listeners == null) {
            return;
        }
        for (const listener of listeners) {
            listener(...args);
        }
    }
    function removeAllListeners() {
        callbackMap.clear();
    }
    return {
        on: (name, callback) => addListener(name, callback, false),
        once: (name, callback) => addListener(name, callback, true),
        emit: (name, ...args) => invokeListener(name, ...args),
        removeAllListeners: removeAllListeners,
    };
}
exports.default = createSafeEmitter;
