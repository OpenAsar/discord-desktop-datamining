"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnUpdateInstall = spawnUpdateInstall;
exports.spawnUpdate = spawnUpdate;
exports.installProtocol = installProtocol;
exports.handleStartupEvent = handleStartupEvent;
exports.updateExistsSync = updateExistsSync;
exports.restart = restart;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const appFolder = path_1.default.resolve(process.execPath, '..');
const rootFolder = path_1.default.resolve(appFolder, '..');
const exeName = path_1.default.basename(process.execPath);
const updateExe = path_1.default.join(rootFolder, 'Update.exe');
function spawnUpdateInstall(updateUrl, progressCallback) {
    return new Promise((resolve, reject) => {
        const childProcess = require('child_process');
        const proc = childProcess.spawn(updateExe, ['--update', updateUrl]);
        proc.on('error', reject);
        proc.on('exit', (code) => {
            if (code !== 0) {
                return reject(new Error(`Update failed with exit code ${code}`));
            }
            return resolve();
        });
        let lastProgress = -1;
        function parseProgress() {
            const lines = stdout.split(/\r?\n/);
            if (lines.length === 1)
                return;
            stdout = lines.pop() ?? '';
            let currentProgress;
            for (const line of lines) {
                if (!/^\d\d?$/.test(line))
                    continue;
                const progress = Number(line);
                if (lastProgress > progress)
                    continue;
                currentProgress = progress;
            }
            if (currentProgress == null)
                return;
            lastProgress = currentProgress;
            progressCallback(Math.min(currentProgress, 100));
        }
        let stdout = '';
        proc.stdout.on('data', (chunk) => {
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
    const icoSrc = path_1.default.join(appFolder, 'app.ico');
    const icoDest = path_1.default.join(rootFolder, 'app.ico');
    let icoForTarget = icoDest;
    try {
        const ico = fs_1.default.readFileSync(icoSrc);
        fs_1.default.writeFileSync(icoDest, new Uint8Array(ico));
    }
    catch (e) {
        icoForTarget = icoSrc;
    }
    const createShortcutArgs = ['--createShortcut', exeName, '--setupIcon', icoForTarget];
    if (updateOnly) {
        createShortcutArgs.push('--updateOnly');
    }
    spawnUpdate(createShortcutArgs, callback);
}
function installProtocol(protocol, callback) {
    const queue = [
        ['HKCU\\Software\\Classes\\' + protocol, '/ve', '/d', `URL:${protocol} Protocol`],
        ['HKCU\\Software\\Classes\\' + protocol, '/v', 'URL Protocol'],
        ['HKCU\\Software\\Classes\\' + protocol + '\\DefaultIcon', '/ve', '/d', '"' + process.execPath + '",-1'],
        [
            'HKCU\\Software\\Classes\\' + protocol + '\\shell\\open\\command',
            '/ve',
            '/d',
            `"${process.execPath}" --url -- "%1"`,
        ],
    ];
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
    const buildInfo = require('./buildInfo');
    if (buildInfo.releaseChannel === 'development' && buildInfo.standaloneModules) {
        return null;
    }
    const { getUpdater, tryInitUpdater } = require('../common/updater');
    const bootstrapConstants = require('./Constants');
    if (!tryInitUpdater(buildInfo, bootstrapConstants.NEW_UPDATE_ENDPOINT, bootstrapConstants.USE_RUST_BSPATCH)) {
        return null;
    }
    const updater = getUpdater();
    if (updater == null) {
        return null;
    }
    const versions = updater.queryCurrentVersionsSync();
    const utilsVersion = versions?.current_modules?.discord_utils;
    if (utilsVersion == null) {
        return null;
    }
    const hostPath = path_1.default.dirname(process.resourcesPath);
    const modulesPath = path_1.default.join(hostPath, 'modules');
    const utilsVersionedPath = path_1.default.join(modulesPath, `discord_utils-${utilsVersion}`);
    const utilsPath = path_1.default.join(utilsVersionedPath, 'discord_utils');
    const serviceHelperExe = path_1.default.join(utilsPath, 'DiscordSystemHelper.exe');
    if (!fs_1.default.existsSync(serviceHelperExe)) {
        return null;
    }
    return serviceHelperExe;
}
function uninstallSystemService(callback) {
    const serviceHelperExe = getSystemServiceHelperExe();
    if (serviceHelperExe != null) {
        const args = ['uninstall', '--wait'];
        const buildInfo = require('./buildInfo');
        if (buildInfo.releaseChannel !== 'stable') {
            args.push('--channel', buildInfo.releaseChannel);
        }
        const windowsUtils = require('./windowsUtils');
        windowsUtils.spawn(serviceHelperExe, args, callback);
    }
    else {
        callback();
    }
}
function maybeInstallNewUpdaterSeedDb() {
    const installerDbSrc = path_1.default.join(appFolder, 'installer.db');
    const installerDbDest = path_1.default.join(rootFolder, 'installer.db');
    if (fs_1.default.existsSync(installerDbSrc)) {
        try {
            fs_1.default.renameSync(installerDbSrc, installerDbDest);
        }
        catch (e) {
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
    return fs_1.default.existsSync(updateExe);
}
function restart(app, newVersion) {
    app.once('will-quit', () => {
        const execPath = path_1.default.resolve(rootFolder, `app-${newVersion}/${exeName}`);
        const childProcess = require('child_process');
        childProcess.spawn(execPath, [], { detached: true });
    });
    app.quit();
}
