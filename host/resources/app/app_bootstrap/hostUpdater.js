"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
var _events = require("events");
var _request = _interopRequireDefault(require("./request"));
var squirrelUpdate = _interopRequireWildcard(require("./squirrelUpdate"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function versionParse(verString) {
  return verString.split('.').map(i => parseInt(i));
}
function versionNewer(verA, verB) {
  let i = 0;
  while (true) {
    const a = verA[i];
    const b = verB[i];
    i++;
    if (a === undefined) {
      return false;
    } else {
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
class AutoUpdaterWin32 extends _events.EventEmitter {
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
      squirrelUpdate.restart(_electron.app, this.updateVersion ?? _electron.app.getVersion());
    } else {
      require('auto-updater').quitAndInstall();
    }
  }
  downloadAndInstallUpdate(callback) {
    if (this.updateUrl == null) {
      throw new Error('Update URL is not set');
    }
    void squirrelUpdate.spawnUpdateInstall(this.updateUrl, progress => {
      this.emit('update-progress', progress);
    }).catch(err => callback(err)).then(() => callback());
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
        this.downloadAndInstallUpdate(error => {
          if (error != null) {
            this.emit('error', error);
            return;
          }
          this.updateVersion = update.version;
          this.emit('update-downloaded', {}, update.release, update.version, new Date(), this.updateUrl, this.quitAndInstall.bind(this));
        });
      } catch (error) {
        error.stdout = stdout;
        this.emit('error', error);
      }
    });
  }
}
class AutoUpdaterLinux extends _events.EventEmitter {
  constructor() {
    super();
    this.updateUrl = null;
  }
  setFeedURL(url) {
    this.updateUrl = url;
  }
  quitAndInstall() {
    _electron.app.relaunch();
    _electron.app.quit();
  }
  async checkForUpdates() {
    if (this.updateUrl == null) {
      throw new Error('Update URL is not set');
    }
    const currVersion = versionParse(_electron.app.getVersion());
    this.emit('checking-for-update');
    try {
      const response = await _request.default.get(this.updateUrl);
      if (response.statusCode === 204) {
        this.emit('update-not-available');
        return;
      }
      let latestVerStr = '';
      let latestVersion = [];
      try {
        var _response$body;
        const latestMetadata = JSON.parse(((_response$body = response.body) === null || _response$body === void 0 ? void 0 : _response$body.toString('utf-8')) ?? '');
        latestVerStr = latestMetadata.name;
        latestVersion = versionParse(latestVerStr);
      } catch (_) {}
      if (versionNewer(latestVersion, currVersion)) {
        console.log('[Updates] You are out of date!');
        this.emit('update-manually', latestVerStr);
      } else if (versionNewer(currVersion, latestVersion)) {
        console.log('[Updates] You are living in the future! Come back time traveller!');
        this.emit('update-manually', latestVerStr);
      } else if (versionEqual(latestVersion, currVersion)) {
        console.log('[Updates] You are up to date.');
        this.emit('update-not-available');
      } else {
        console.log('[Updates] You are in a very strange place.');
        this.emit('update-not-available');
      }
    } catch (err) {
      console.error('[Updates] Error fetching ' + this.updateUrl + ': ' + err.message);
      this.emit('error', err);
    }
  }
}
let autoUpdater;
switch (process.platform) {
  case 'darwin':
    autoUpdater = require('electron').autoUpdater;
    break;
  case 'win32':
    autoUpdater = new AutoUpdaterWin32();
    break;
  case 'linux':
    autoUpdater = new AutoUpdaterLinux();
    break;
}
var _default = exports.default = autoUpdater;
module.exports = exports.default;