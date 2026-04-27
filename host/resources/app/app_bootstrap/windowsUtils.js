"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawn = spawn;
exports.spawnReg = spawnReg;
exports.addToRegistry = addToRegistry;
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
const regExe = process.env.SystemRoot != null ? path_1.default.join(process.env.SystemRoot ?? '', 'System32', 'reg.exe') : 'reg.exe';
function spawn(command, args, callback) {
    let stdout = '';
    let spawnedProcess;
    try {
        spawnedProcess = child_process_1.default.spawn(command, args);
    }
    catch (err) {
        process.nextTick(() => {
            if (callback != null) {
                callback(err, stdout);
            }
        });
        return;
    }
    spawnedProcess.stdout?.on('data', (data) => {
        stdout += data;
    });
    let err = null;
    spawnedProcess.on('error', (err) => {
        if (err != null) {
            err = err;
        }
    });
    spawnedProcess.on('close', (code, signal) => {
        if (err === null && code !== 0) {
            err = new Error('Command failed: ' + (signal ?? '') + ' ' + (code ?? ''));
        }
        if (err != null) {
            err.name = err.name ?? `${code}`;
            err.message = err.message ?? stdout;
        }
        if (callback != null) {
            callback(err ?? new Error('Error is null'), stdout);
        }
    });
}
function spawnReg(args, callback) {
    return spawn(regExe, args, callback);
}
function addToRegistry(queue, callback) {
    if (queue.length === 0) {
        callback?.();
    }
    const args = queue.shift();
    if (args == null)
        return;
    args.unshift('add');
    args.push('/f');
    spawnReg(args, () => addToRegistry(queue, callback));
}
