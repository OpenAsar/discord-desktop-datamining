"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const electron_1 = require("electron");
const events_1 = require("events");
const request_1 = __importDefault(require("./request"));
const squirrelUpdate = __importStar(require("./squirrelUpdate"));
function versionParse(verString) {
    return verString.split('.').map((i) => parseInt(i));
}
function versionNewer(verA, verB) {
    let i = 0;
    while (true) {
        const a = verA[i];
        const b = verB[i];
        i++;
        if (a === undefined) {
            return false;
        }
        else {
            if (b === undefined || a > b) {
                return true;
            }
            if (a < b) {
                return false;
            }
        }
    }
}
function versionEqual(verA, verB) {
    if (verA.length !== verB.length) {
        return false;
    }
    for (let i = 0; i < verA.length; ++i) {
        const a = verA[i];
        const b = verB[i];
        if (a !== b) {
            return false;
        }
    }
    return true;
}
class AutoUpdaterWin32 extends events_1.EventEmitter {
    updateUrl;
    updateVersion;
    constructor() {
        super();
        this.updateUrl = null;
        this.updateVersion = null;
    }
    setFeedURL(updateUrl) {
        this.updateUrl = updateUrl;
    }
    quitAndInstall() {
        if (squirrelUpdate.updateExistsSync()) {
            squirrelUpdate.restart(electron_1.app, this.updateVersion ?? electron_1.app.getVersion());
        }
        else {
            require('auto-updater').quitAndInstall();
        }
    }
    downloadAndInstallUpdate(callback) {
        if (this.updateUrl == null) {
            throw new Error('Update URL is not set');
        }
        void squirrelUpdate
            .spawnUpdateInstall(this.updateUrl, (progress) => {
            this.emit('update-progress', progress);
        })
            .catch((err) => callback(err))
            .then(() => callback());
    }
    checkForUpdates() {
        if (this.updateUrl == null) {
            throw new Error('Update URL is not set');
        }
        this.emit('checking-for-update');
        if (!squirrelUpdate.updateExistsSync()) {
            this.emit('update-not-available');
            return;
        }
        squirrelUpdate.spawnUpdate(['--check', this.updateUrl], (error, stdout) => {
            if (error != null) {
                this.emit('error', error);
                return;
            }
            try {
                const json = stdout.trim().split('\n').pop();
                const releasesFound = JSON.parse(json).releasesToApply;
                if (releasesFound == null || releasesFound.length === 0) {
                    this.emit('update-not-available');
                    return;
                }
                const update = releasesFound.pop();
                this.emit('update-available');
                this.downloadAndInstallUpdate((error) => {
                    if (error != null) {
                        this.emit('error', error);
                        return;
                    }
                    this.updateVersion = update.version;
                    this.emit('update-downloaded', {}, update.release, update.version, new Date(), this.updateUrl, this.quitAndInstall.bind(this));
                });
            }
            catch (error) {
                error.stdout = stdout;
                this.emit('error', error);
            }
        });
    }
}
class AutoUpdaterLinux extends events_1.EventEmitter {
    updateUrl;
    constructor() {
        super();
        this.updateUrl = null;
    }
    setFeedURL(url) {
        this.updateUrl = url;
    }
    quitAndInstall() {
        electron_1.app.relaunch();
        electron_1.app.quit();
    }
    async checkForUpdates() {
        if (this.updateUrl == null) {
            throw new Error('Update URL is not set');
        }
        const currVersion = versionParse(electron_1.app.getVersion());
        this.emit('checking-for-update');
        try {
            const response = await request_1.default.get(this.updateUrl);
            if (response.statusCode === 204) {
                this.emit('update-not-available');
                return;
            }
            let latestVerStr = '';
            let latestVersion = [];
            try {
                const latestMetadata = JSON.parse(response.body?.toString('utf-8') ?? '');
                latestVerStr = latestMetadata.name;
                latestVersion = versionParse(latestVerStr);
            }
            catch (_) { }
            if (versionNewer(latestVersion, currVersion)) {
                console.log('[Updates] You are out of date!');
                this.emit('update-manually', latestVerStr);
            }
            else if (versionNewer(currVersion, latestVersion)) {
                console.log('[Updates] You are living in the future! Come back time traveller!');
                this.emit('update-manually', latestVerStr);
            }
            else if (versionEqual(latestVersion, currVersion)) {
                console.log('[Updates] You are up to date.');
                this.emit('update-not-available');
            }
            else {
                console.log('[Updates] You are in a very strange place.');
                this.emit('update-not-available');
            }
        }
        catch (err) {
            console.error('[Updates] Error fetching ' + this.updateUrl + ': ' + err.message);
            this.emit('error', err);
        }
    }
}
let autoUpdater;
switch (process.platform) {
    case 'darwin':
        const electron = require('electron');
        autoUpdater = electron.autoUpdater;
        break;
    case 'win32':
        autoUpdater = new AutoUpdaterWin32();
        break;
    case 'linux':
        autoUpdater = new AutoUpdaterLinux();
        break;
}
module.exports = autoUpdater;
