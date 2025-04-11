"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToRegistry = addToRegistry;
exports.spawn = spawn;
exports.spawnReg = spawnReg;
var _child_process = _interopRequireDefault(require("child_process"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const regExe = process.env.SystemRoot != null ? _path.default.join(process.env.SystemRoot ?? '', 'System32', 'reg.exe') : 'reg.exe';
function spawn(command, args, callback) {
  var _spawnedProcess$stdou;
  let stdout = '';
  let spawnedProcess;
  try {
    spawnedProcess = _child_process.default.spawn(command, args);
  } catch (err) {
    process.nextTick(() => {
      if (callback != null) {
        callback(err, stdout);
      }
    });
    return;
  }
  (_spawnedProcess$stdou = spawnedProcess.stdout) === null || _spawnedProcess$stdou === void 0 ? void 0 : _spawnedProcess$stdou.on('data', data => {
    stdout += data;
  });
  let err = null;
  spawnedProcess.on('error', err => {
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
    callback === null || callback === void 0 ? void 0 : callback();
  }
  const args = queue.shift();
  if (args == null) return;
  args.unshift('add');
  args.push('/f');
  spawnReg(args, () => addToRegistry(queue, callback));
}