"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToRegistry = addToRegistry;
exports.spawn = spawn;
exports.spawnReg = spawnReg;
var _child_process = _interopRequireDefault(require("child_process"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const regExe = process.env.SystemRoot ? _path.default.join(process.env.SystemRoot, 'System32', 'reg.exe') : 'reg.exe';
function spawn(command, args, callback) {
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
  spawnedProcess.stdout.on('data', data => {
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
      err = new Error('Command failed: ' + (signal || code));
    }
    if (err != null) {
      err.code = err.code || code;
      err.stdout = err.stdout || stdout;
    }
    if (callback != null) {
      callback(err, stdout);
    }
  });
}
function spawnReg(args, callback) {
  return spawn(regExe, args, callback);
}
function addToRegistry(queue, callback) {
  if (queue.length === 0) {
    return callback && callback();
  }
  const args = queue.shift();
  args.unshift('add');
  args.push('/f');
  return spawnReg(args, () => addToRegistry(queue, callback));
}