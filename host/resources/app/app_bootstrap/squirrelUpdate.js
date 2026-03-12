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
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const appFolder = _path.default.resolve(process.execPath, '..');
const rootFolder = _path.default.resolve(appFolder, '..');
const exeName = _path.default.basename(process.execPath);
const updateExe = _path.default.join(rootFolder, 'Update.exe');
function spawnUpdateInstall(updateUrl, progressCallback) {
  return new Promise((resolve, reject) => {
    const childProcess = require('child_process');
    const proc = childProcess.spawn(updateExe, ['--update', updateUrl]);
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
      stdout = lines.pop() ?? '';
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
  const windowsUtils = require('./windowsUtils');
  windowsUtils.spawn(updateExe, args, callback);
}
function createShortcuts(callback, updateOnly) {
  const icoSrc = _path.default.join(appFolder, 'app.ico');
  const icoDest = _path.default.join(rootFolder, 'app.ico');
  let icoForTarget = icoDest;
  try {
    const ico = _fs.default.readFileSync(icoSrc);
    _fs.default.writeFileSync(icoDest, new Uint8Array(ico));
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
  const windowsUtils = require('./windowsUtils');
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
  const windowsUtils = require('./windowsUtils');
  windowsUtils.spawnReg(['delete', 'HKCU\\Software\\Classes\\' + protocol, '/f'], callback);
}
function getSystemServiceHelperExe() {
  var _versions$current_mod;
  if (buildInfo.releaseChannel === 'development' && buildInfo.standaloneModules) {
    return null;
  }
  const {
    getUpdater,
    tryInitUpdater
  } = require('../common/updater');
  const bootstrapConstants = require('./Constants');
  if (!tryInitUpdater(buildInfo, bootstrapConstants.NEW_UPDATE_ENDPOINT, bootstrapConstants.USE_RUST_BSPATCH)) {
    return null;
  }
  const updater = getUpdater();
  if (updater == null) {
    return null;
  }
  const versions = updater.queryCurrentVersionsSync();
  const utilsVersion = versions === null || versions === void 0 ? void 0 : (_versions$current_mod = versions.current_modules) === null || _versions$current_mod === void 0 ? void 0 : _versions$current_mod.discord_utils;
  if (utilsVersion == null) {
    return null;
  }
  const hostPath = _path.default.dirname(process.resourcesPath);
  const modulesPath = _path.default.join(hostPath, 'modules');
  const utilsVersionedPath = _path.default.join(modulesPath, `discord_utils-${utilsVersion}`);
  const utilsPath = _path.default.join(utilsVersionedPath, 'discord_utils');
  const serviceHelperExe = _path.default.join(utilsPath, 'DiscordSystemHelper.exe');
  if (!_fs.default.existsSync(serviceHelperExe)) {
    return null;
  }
  return serviceHelperExe;
}
function uninstallSystemService(callback) {
  const serviceHelperExe = getSystemServiceHelperExe();
  if (serviceHelperExe != null) {
    const args = ['uninstall', '--wait'];
    if (buildInfo.releaseChannel !== 'stable') {
      args.push('--channel', buildInfo.releaseChannel);
    }
    const windowsUtils = require('./windowsUtils');
    windowsUtils.spawn(serviceHelperExe, args, callback);
  } else {
    callback();
  }
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
  const autoStart = require('./autoStart');
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
            uninstallSystemService(() => {
              terminate(app);
            });
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
    const childProcess = require('child_process');
    childProcess.spawn(execPath, [], {
      detached: true
    });
  });
  app.quit();
}