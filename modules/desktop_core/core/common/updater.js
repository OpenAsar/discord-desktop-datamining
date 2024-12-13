"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Updater = exports.TASK_STATE_WORKING = exports.TASK_STATE_WAITING = exports.TASK_STATE_FAILED = exports.TASK_STATE_COMPLETE = exports.INCONSISTENT_INSTALLER_STATE_ERROR = void 0;
exports.getUpdater = getUpdater;
exports.tryInitUpdater = tryInitUpdater;
var _child_process = _interopRequireDefault(require("child_process"));
var _electron = require("electron");
var _events = require("events");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _process = require("process");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const arch = require('arch');
let instance;
const TASK_STATE_COMPLETE = 'Complete';
exports.TASK_STATE_COMPLETE = TASK_STATE_COMPLETE;
const TASK_STATE_FAILED = 'Failed';
exports.TASK_STATE_FAILED = TASK_STATE_FAILED;
const TASK_STATE_WAITING = 'Waiting';
exports.TASK_STATE_WAITING = TASK_STATE_WAITING;
const TASK_STATE_WORKING = 'Working';
exports.TASK_STATE_WORKING = TASK_STATE_WORKING;
const INCONSISTENT_INSTALLER_STATE_ERROR = 'InconsistentInstallerState';
exports.INCONSISTENT_INSTALLER_STATE_ERROR = INCONSISTENT_INSTALLER_STATE_ERROR;
const EVENT_CACHE_FILENAME = 'updater_events.json';
const INVALID_UPDATER_ERROR = "Can't send request to updater because the native updater isn't loaded.";
class Updater extends _events.EventEmitter {
  constructor(options) {
    super();
    let nativeUpdaterModule = options.nativeUpdaterModule;
    if (nativeUpdaterModule == null) {
      try {
        nativeUpdaterModule = require('../../../updater');
      } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
          return;
        }
        throw e;
      }
    }
    this.committedHostVersion = null;
    this.committedModules = new Set();
    this.rootPath = options.root_path;
    this.nextRequestId = 0;
    this.requests = new Map();
    this.updateEventHistory = [];
    this.isRunningInBackground = false;
    this.currentlyDownloading = {};
    this.currentlyInstalling = {};
    this.hasEmittedUnhandledException = false;
    this.nativeUpdater = new nativeUpdaterModule.Updater({
      response_handler: this._handleResponse.bind(this),
      ...options
    });
  }
  get valid() {
    return this.nativeUpdater != null;
  }
  _sendRequest(detail, progressCallback) {
    if (!this.valid) {
      throw new Error(INVALID_UPDATER_ERROR);
    }
    const requestId = this.nextRequestId++;
    return new Promise((resolve, reject) => {
      this.requests.set(requestId, {
        resolve,
        reject,
        progressCallback
      });
      this.nativeUpdater.command(JSON.stringify([requestId, detail]));
    });
  }
  _sendRequestSync(detail) {
    if (!this.valid) {
      throw new Error(INVALID_UPDATER_ERROR);
    }
    const requestId = this.nextRequestId++;
    return this.nativeUpdater.command_blocking(JSON.stringify([requestId, detail]));
  }
  _handleResponse(response) {
    try {
      const [id, detail] = JSON.parse(response);
      const request = this.requests.get(id);
      if (request == null) {
        console.error('Received response ', detail, ' for a request (', id, ') not in the updater request map.');
        return;
      }
      if (detail['Error'] != null) {
        const {
          kind,
          details,
          severity
        } = detail['Error'];
        let e = new Error(`(${kind}) ${details}`);
        if (severity === 'Fatal') {
          const handled = this.emit(kind, e);
          if (!handled) {
            throw e;
          }
        } else {
          if (details != null) {
            if (details.includes('code: 10013')) {
              e = new Error(`(${kind}) (network_error): An attempt was made to access a socket in a way forbidden by its access permissions`);
            } else if (details.includes('code: 10054')) {
              e = new Error(`(${kind}) (network_error): An existing connection was forcibly closed by the remote host`);
            } else if (details.includes('code: 10055')) {
              e = new Error(`(${kind}) (network_error): An operation on a socket could not be performed because the system lacked sufficient buffer space or because a queue was full`);
            } else if (details.includes('code: 10060')) {
              e = new Error(`(${kind}) (network_error): A connection attempt failed because the connected party did not properly respond after a period of time`);
            } else if (details.includes('code: 10061')) {
              e = new Error(`(${kind}) (network_error): No connection could be made because the target machine actively refused it`);
            } else if (details.includes('code: 11001')) {
              e = new Error(`(${kind}) (network_error): No such host is known`);
            } else if (details.includes('code: 11002')) {
              e = new Error(`(${kind}) (network_error): This is usually a temporary error during hostname resolution and means that the local server did not receive a response from an authoritative server`);
            } else if (details.includes('code: 11004')) {
              e = new Error(`(${kind}) (network_error): The requested name is valid, but no data of the requested type was found`);
            } else if (details.includes('kind: Status(500)')) {
              e = new Error(`(${kind}) (network_error): Status 500`);
            } else if (details.includes('kind: Status(502)')) {
              e = new Error(`(${kind}) (network_error): Status 502`);
            } else if (details.includes('kind: UnexpectedEof')) {
              e = new Error(`(${kind}) (network_error): Unexpected EOF during handshake`);
            } else if (details.includes('code: -2146762487')) {
              e = new Error(`(${kind}) (cert_chain_failed): Cert chain processed, root cert not trusted by trust provider`);
            } else if (details.includes('code: -2146893018')) {
              e = new Error(`(${kind}) (cert_chain_failed): The message received was unexpected or badly formatted`);
            } else if (details.includes('code: -2146762481')) {
              e = new Error(`(${kind}) (cert_chain_failed): The certificate's CN name does not match the passed value`);
            } else if (details.includes('kind: StorageFull')) {
              e = new Error(`(${kind}) (storage_error): Storage full`);
            }
          }
          this.emit('update-error', e);
          request.reject(e);
          this.requests.delete(id);
        }
      } else if (detail === 'Ok') {
        request.resolve();
        this.requests.delete(id);
      } else if (detail['VersionInfo'] != null) {
        request.resolve(detail['VersionInfo']);
        this.requests.delete(id);
      } else if (detail['ManifestInfo'] != null) {
        request.resolve(detail['ManifestInfo']);
        this.requests.delete(id);
      } else if (detail['TaskProgress'] != null) {
        const msg = detail['TaskProgress'];
        const progress = {
          task: msg[0],
          state: msg[1],
          percent: msg[2],
          bytesProcessed: msg[3]
        };
        this._recordTaskProgress(progress);
        if (request.progressCallback != null) {
          request.progressCallback(progress);
        }
        if (progress.task['HostInstall'] != null && progress.state === TASK_STATE_COMPLETE) {
          this.emit('host-updated');
        }
      } else if (detail['Analytics'] != null) {
        this._reportAnalytics(detail['Analytics']);
      } else {
        console.warn('Unknown updater response', detail);
      }
    } catch (e) {
      console.error('Unhandled exception in updater response handler:', e);
      if (!this.hasEmittedUnhandledException) {
        this.hasEmittedUnhandledException = true;
        this.emit('unhandled-exception', e);
      }
    }
  }
  _reportAnalytics(analytics) {
    const transformedEvent = this._transformAnalyticEvent(analytics);
    let transformedEventSpread = {};
    if (typeof transformedEvent === 'object' && transformedEvent !== null) {
      transformedEventSpread = {
        ...transformedEvent
      };
    }
    this.updateEventHistory.push({
      type: 'analytics',
      transformedEventSpread
    });
  }
  _transformAnalyticEvent(event) {
    if (event['name'] === 'updater_metrics_download') {
      event['data']['background'] = this.isRunningInBackground;
    }
    return event;
  }
  _handleSyncResponse(response) {
    const detail = JSON.parse(response);
    if (detail['Error'] != null) {
      throw new Error(detail['Error']);
    } else if (detail === 'Ok') {
      return null;
    } else if (detail['VersionInfo'] != null) {
      return detail['VersionInfo'];
    }
    console.warn('Unknown updater response', detail);
    return null;
  }
  _getHostPath() {
    const [major, minor, revision] = this.committedHostVersion;
    return _path.default.join(this.rootPath, `app-${`${major}.${minor}.${revision}`}`);
  }
  _startCurrentVersionInner(options, versions) {
    if (this.committedHostVersion == null) {
      this.committedHostVersion = versions.current_host;
    }
    const hostPath = this._getHostPath();
    const hostExePath = _path.default.join(hostPath, _path.default.basename(process.execPath));
    if (_path.default.resolve(hostExePath) !== _path.default.resolve(process.execPath) && !(options === null || options === void 0 ? void 0 : options.allowObsoleteHost)) {
      _electron.app.once('will-quit', () => {
        _child_process.default.spawn(hostExePath, [], {
          detached: true,
          stdio: 'inherit'
        });
      });
      console.log(`Will Restart from ${_path.default.resolve(process.execPath)} to ${_path.default.resolve(hostExePath)}`);
      try {
        const paths = require('./paths');
        const userDataPath = paths.getUserData();
        const eventCachePath = _path.default.join(userDataPath, EVENT_CACHE_FILENAME);
        const updaterEvents = this.queryAndTruncateHistory();
        if (updaterEvents.length > 0) {
          _fs.default.writeFile(eventCachePath, JSON.stringify(updaterEvents), e => {
            if (e != null) {
              console.warn('splashScreen: Failed writing updaterEvents with error: ', e);
            }
          });
        }
      } catch (e) {
        console.error(`Error caching updater events: ${e}`);
      }
      console.log(`Restarting from ${_path.default.resolve(process.execPath)} to ${_path.default.resolve(hostExePath)}`);
      _electron.app.quit();
      this.emit('starting-new-host');
      return;
    }
    this._commitModulesInner(versions);
  }
  _commitModulesInner(versions) {
    const {
      addGlobalPath,
      globalPathExists
    } = require('./nodeGlobalPaths');
    const hostPath = this._getHostPath();
    const modulesPath = _path.default.join(hostPath, 'modules');
    for (const module in versions.current_modules) {
      const moduleVersion = versions.current_modules[module];
      const moduleSearchPath = _path.default.join(modulesPath, `${module}-${moduleVersion}`);
      if (!this.committedModules.has(module) && !globalPathExists(moduleSearchPath)) {
        this.committedModules.add(module);
        addGlobalPath(moduleSearchPath);
      }
    }
  }
  _recordDownloadProgress(name, progress) {
    const now = String(_process.hrtime.bigint());
    if (progress.state === TASK_STATE_WORKING && !this.currentlyDownloading[name]) {
      this.currentlyDownloading[name] = true;
      this.updateEventHistory.push({
        type: 'downloading-module',
        name: name,
        now: now
      });
    } else if (progress.state === TASK_STATE_COMPLETE || progress.state === TASK_STATE_FAILED) {
      this.currentlyDownloading[name] = false;
      this.updateEventHistory.push({
        type: 'downloaded-module',
        name: name,
        now: now,
        succeeded: progress.state === TASK_STATE_COMPLETE,
        receivedBytes: progress.bytesProcessed
      });
    }
  }
  _recordInstallProgress(name, progress, newVersion, isDelta) {
    const now = String(_process.hrtime.bigint());
    if (progress.state === TASK_STATE_WORKING && !this.currentlyInstalling[name]) {
      this.currentlyInstalling[name] = true;
      this.updateEventHistory.push({
        type: 'installing-module',
        name,
        now,
        newVersion,
        foreground: !this.isRunningInBackground
      });
    } else if (progress.state === TASK_STATE_COMPLETE || progress.state === TASK_STATE_FAILED) {
      this.currentlyInstalling[name] = false;
      this.updateEventHistory.push({
        type: 'installed-module',
        name,
        now,
        newVersion,
        succeeded: progress.state === TASK_STATE_COMPLETE,
        delta: isDelta,
        foreground: !this.isRunningInBackground
      });
    }
  }
  _recordTaskProgress(progress) {
    if (progress.task.HostDownload != null) {
      this._recordDownloadProgress('host', progress);
    } else if (progress.task.HostInstall != null) {
      this._recordInstallProgress('host', progress, null, progress.task.HostInstall.from_version != null);
    } else if (progress.task.ModuleDownload != null) {
      this._recordDownloadProgress(progress.task.ModuleDownload.version.module.name, progress);
    } else if (progress.task.ModuleInstall != null) {
      this._recordInstallProgress(progress.task.ModuleInstall.version.module.name, progress, progress.task.ModuleInstall.version.version, progress.task.ModuleInstall.from_version != null);
    }
  }
  queryCurrentVersions() {
    return this.queryCurrentVersionsWithOptions(null);
  }
  queryCurrentVersionsWithOptions(options) {
    return this._sendRequest({
      QueryCurrentVersions: {
        options
      }
    });
  }
  queryCurrentVersionsSync() {
    return this.queryCurrentVersionsWithOptionsSync(null);
  }
  queryCurrentVersionsWithOptionsSync(options) {
    return this._handleSyncResponse(this._sendRequestSync({
      QueryCurrentVersions: {
        options
      }
    }));
  }
  repair(progressCallback) {
    return this.repairWithOptions(null, progressCallback);
  }
  repairWithOptions(options, progressCallback) {
    return this._sendRequest({
      Repair: {
        options
      }
    }, progressCallback);
  }
  collectGarbage() {
    return this._sendRequest('CollectGarbage');
  }
  setRunningManifest(manifest) {
    return this._sendRequest({
      SetManifests: ['Running', manifest]
    });
  }
  setPinnedManifestSync(manifest) {
    return this._handleSyncResponse(this._sendRequestSync({
      SetManifests: ['Pinned', manifest]
    }));
  }
  installModule(name, progressCallback) {
    return this.installModuleWithOptions(name, null, progressCallback);
  }
  installModuleWithOptions(name, options, progressCallback) {
    return this._sendRequest({
      InstallModule: {
        name,
        options
      }
    }, progressCallback);
  }
  updateToLatest(progressCallback) {
    return this.updateToLatestWithOptions(null, progressCallback);
  }
  updateToLatestWithOptions(options, progressCallback) {
    return this._sendRequest({
      UpdateToLatest: {
        options
      }
    }, progressCallback);
  }
  async startCurrentVersion(queryOptions, options) {
    const versions = await this.queryCurrentVersionsWithOptions(queryOptions);
    await this.setRunningManifest(versions.last_successful_update);
    this._startCurrentVersionInner(options, versions);
  }
  startCurrentVersionSync(options) {
    const versions = this.queryCurrentVersionsSync();
    this._startCurrentVersionInner(options, versions);
  }
  async commitModules(queryOptions, versions) {
    if (this.committedHostVersion == null) {
      throw new Error('Cannot commit modules before host version.');
    }
    if (versions == null) {
      versions = await this.queryCurrentVersionsWithOptions(queryOptions);
    }
    this._commitModulesInner(versions);
  }
  setRunningInBackground() {
    this.isRunningInBackground = true;
  }
  queryAndTruncateHistory() {
    const history = this.updateEventHistory;
    this.updateEventHistory = [];
    return history;
  }
  getKnownFolder(name) {
    if (!this.valid) {
      throw new Error(INVALID_UPDATER_ERROR);
    }
    return this.nativeUpdater.known_folder(name);
  }
  createShortcut(options) {
    if (!this.valid) {
      throw new Error(INVALID_UPDATER_ERROR);
    }
    return this.nativeUpdater.create_shortcut(options);
  }
}
exports.Updater = Updater;
function getUpdaterPlatformName(platform) {
  switch (platform) {
    case 'darwin':
      return 'osx';
    case 'win32':
      return 'win';
    default:
      return platform;
  }
}
function tryInitUpdater(buildInfo, repositoryUrl) {
  const paths = require('./paths');
  const rootPath = paths.getInstallPath();
  const userDataPath = paths.getUserData();
  if (rootPath == null) {
    return false;
  }
  const platform = getUpdaterPlatformName(process.platform);
  let currentArch = null;
  if (platform === 'win') {
    currentArch = arch();
    console.log(`Determined current Windows architecture: ${currentArch}`);
  }
  instance = new Updater({
    release_channel: buildInfo.releaseChannel,
    platform: platform,
    repository_url: repositoryUrl,
    root_path: rootPath,
    current_os_arch: currentArch,
    user_data_path: userDataPath
  });
  const eventCachePath = _path.default.join(userDataPath, EVENT_CACHE_FILENAME);
  if (_fs.default.existsSync(eventCachePath)) {
    try {
      instance.updateEventHistory = JSON.parse(_fs.default.readFileSync(eventCachePath).toString('utf-8'));
    } catch (e) {
      console.log('Failed to read updater events cache with error ', e);
    }
    try {
      _fs.default.unlinkSync(eventCachePath);
    } catch (e) {
      console.log('Failed to remove updater events cache with error ', e);
    }
  }
  return instance.valid;
}
function getUpdater() {
  if (instance != null && instance.valid) {
    return instance;
  }
  return null;
}