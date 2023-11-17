"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleStartupEvent = handleStartupEvent;
exports.installProtocol = installProtocol;
exports.restart = restart;
exports.spawnUpdate = spawnUpdate;
exports.spawnUpdateInstall = spawnUpdateInstall;
exports.updateExistsSync = updateExistsSync;
var _child_process = _interopRequireDefault(require("child_process"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var autoStart = _interopRequireWildcard(require("./autoStart"));
var windowsUtils = _interopRequireWildcard(require("./windowsUtils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const appFolder = _path.default.resolve(process.execPath, '..');
const rootFolder = _path.default.resolve(appFolder, '..');
const exeName = _path.default.basename(process.execPath);
const updateExe = _path.default.join(rootFolder, 'Update.exe');
function spawnUpdateInstall(updateUrl, progressCallback) {
  return new Promise((resolve, reject) => {
    const proc = _child_process.default.spawn(updateExe, ['--update', updateUrl]);
    proc.on('error', reject);
    proc.on('exit', code => {
      if (code !== 0) {
        return reject(new Error(`Update failed with exit code ${code}`));
      }
      return resolve();
    });
    let lastProgress = -1;
    function parseProgress() {
      const lines = stdout.split(/\r?\n/);
      if (lines.length === 1) return;
      stdout = lines.pop();
      let currentProgress;
      for (const line of lines) {
        if (!/^\d\d?$/.test(line)) continue;
        const progress = Number(line);
        if (lastProgress > progress) continue;
        currentProgress = progress;
      }
      if (currentProgress == null) return;
      lastProgress = currentProgress;
      progressCallback(Math.min(currentProgress, 100));
    }
    let stdout = '';
    proc.stdout.on('data', chunk => {
      stdout += String(chunk);
      parseProgress();
    });
  });
}
function spawnUpdate(args, callback) {
  windowsUtils.spawn(updateExe, args, callback);
}
function createShortcuts(callback, updateOnly) {
  const icoSrc = _path.default.join(appFolder, 'app.ico');
  const icoDest = _path.default.join(rootFolder, 'app.ico');
  let icoForTarget = icoDest;
  try {
    const ico = _fs.default.readFileSync(icoSrc);
    _fs.default.writeFileSync(icoDest, ico);
  } catch (e) {
    icoForTarget = icoSrc;
  }
  const createShortcutArgs = ['--createShortcut', exeName, '--setupIcon', icoForTarget];
  if (updateOnly) {
    createShortcutArgs.push('--updateOnly');
  }
  spawnUpdate(createShortcutArgs, callback);
}
function installProtocol(protocol, callback) {
  const queue = [['HKCU\\Software\\Classes\\' + protocol, '/ve', '/d', `URL:${protocol} Protocol`], ['HKCU\\Software\\Classes\\' + protocol, '/v', 'URL Protocol'], ['HKCU\\Software\\Classes\\' + protocol + '\\DefaultIcon', '/ve', '/d', '"' + process.execPath + '",-1'], ['HKCU\\Software\\Classes\\' + protocol + '\\shell\\open\\command', '/ve', '/d', `"${process.execPath}" --url -- "%1"`]];
  windowsUtils.addToRegistry(queue, callback);
}
function terminate(app) {
  app.quit();
  process.exit(0);
}
function removeShortcuts(callback) {
  spawnUpdate(['--removeShortcut', exeName], callback);
}
function updateShortcuts(callback) {
  createShortcuts(callback, true);
}
function uninstallProtocol(protocol, callback) {
  windowsUtils.spawnReg(['delete', 'HKCU\\Software\\Classes\\' + protocol, '/f'], callback);
}
function maybeInstallNewUpdaterSeedDb() {
  const installerDbSrc = _path.default.join(appFolder, 'installer.db');
  const installerDbDest = _path.default.join(rootFolder, 'installer.db');
  if (_fs.default.existsSync(installerDbSrc)) {
    try {
      _fs.default.renameSync(installerDbSrc, installerDbDest);
    } catch (e) {
      console.log(`Failed to rename '${installerDbSrc}' to '${installerDbDest}'`);
    }
  }
}
function handleStartupEvent(protocol, app, squirrelCommand) {
  switch (squirrelCommand) {
    case '--squirrel-install':
      createShortcuts(() => {
        autoStart.install(() => {
          installProtocol(protocol, () => {
            terminate(app);
          });
        });
      }, false);
      return true;
    case '--squirrel-updated':
      updateShortcuts(() => {
        autoStart.update(() => {
          installProtocol(protocol, () => {
            terminate(app);
          });
        });
      });
      return true;
    case '--squirrel-uninstall':
      removeShortcuts(() => {
        autoStart.uninstall(() => {
          uninstallProtocol(protocol, () => {
            terminate(app);
          });
        });
      });
      return true;
    case '--squirrel-obsolete':
      terminate(app);
      return true;
    case '--squirrel-firstrun':
      maybeInstallNewUpdaterSeedDb();
      return false;
    default:
      return false;
  }
}
function updateExistsSync() {
  return _fs.default.existsSync(updateExe);
}
function restart(app, newVersion) {
  app.once('will-quit', () => {
    const execPath = _path.default.resolve(rootFolder, `app-${newVersion}/${exeName}`);
    _child_process.default.spawn(execPath, [], {
      detached: true
    });
  });
  app.quit();
}