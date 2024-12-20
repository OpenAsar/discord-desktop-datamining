"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_MANUALLY = exports.UPDATE_CHECK_FINISHED = exports.NO_PENDING_UPDATES = exports.INSTALLING_MODULE_PROGRESS = exports.INSTALLING_MODULES_FINISHED = exports.INSTALLING_MODULE = exports.INSTALLED_MODULE = exports.DOWNLOADING_MODULE_PROGRESS = exports.DOWNLOADING_MODULES_FINISHED = exports.DOWNLOADING_MODULE = exports.DOWNLOADED_MODULE = exports.CHECKING_FOR_UPDATES = void 0;
exports.checkForUpdates = checkForUpdates;
exports.events = void 0;
exports.getInstalled = getInstalled;
exports.init = init;
exports.initPathsOnly = initPathsOnly;
exports.install = install;
exports.installPendingUpdates = installPendingUpdates;
exports.isInstalled = isInstalled;
exports.quitAndInstallUpdates = quitAndInstallUpdates;
exports.setInBackground = setInBackground;
exports.supportsEventObjects = void 0;
var _events = require("events");
var _fs = _interopRequireDefault(require("fs"));
var _mkdirp = _interopRequireDefault(require("mkdirp"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _process = require("process");
var _yauzl = _interopRequireDefault(require("yauzl"));
var _Backoff = _interopRequireDefault(require("./Backoff"));
var _nodeGlobalPaths = require("./nodeGlobalPaths");
var paths = _interopRequireWildcard(require("./paths"));
var _processUtils = require("./processUtils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const originalFs = require('original-fs');
const CHECKING_FOR_UPDATES = 'checking-for-updates';
exports.CHECKING_FOR_UPDATES = CHECKING_FOR_UPDATES;
const INSTALLED_MODULE = 'installed-module';
exports.INSTALLED_MODULE = INSTALLED_MODULE;
const UPDATE_CHECK_FINISHED = 'update-check-finished';
exports.UPDATE_CHECK_FINISHED = UPDATE_CHECK_FINISHED;
const DOWNLOADING_MODULE = 'downloading-module';
exports.DOWNLOADING_MODULE = DOWNLOADING_MODULE;
const DOWNLOADING_MODULE_PROGRESS = 'downloading-module-progress';
exports.DOWNLOADING_MODULE_PROGRESS = DOWNLOADING_MODULE_PROGRESS;
const DOWNLOADING_MODULES_FINISHED = 'downloading-modules-finished';
exports.DOWNLOADING_MODULES_FINISHED = DOWNLOADING_MODULES_FINISHED;
const UPDATE_MANUALLY = 'update-manually';
exports.UPDATE_MANUALLY = UPDATE_MANUALLY;
const DOWNLOADED_MODULE = 'downloaded-module';
exports.DOWNLOADED_MODULE = DOWNLOADED_MODULE;
const INSTALLING_MODULES_FINISHED = 'installing-modules-finished';
exports.INSTALLING_MODULES_FINISHED = INSTALLING_MODULES_FINISHED;
const INSTALLING_MODULE = 'installing-module';
exports.INSTALLING_MODULE = INSTALLING_MODULE;
const INSTALLING_MODULE_PROGRESS = 'installing-module-progress';
exports.INSTALLING_MODULE_PROGRESS = INSTALLING_MODULE_PROGRESS;
const NO_PENDING_UPDATES = 'no-pending-updates';
exports.NO_PENDING_UPDATES = NO_PENDING_UPDATES;
const ALWAYS_ALLOW_UPDATES = 'ALWAYS_ALLOW_UPDATES';
const SKIP_HOST_UPDATE = 'SKIP_HOST_UPDATE';
const SKIP_MODULE_UPDATE = 'SKIP_MODULE_UPDATE';
const ALWAYS_BOOTSTRAP_MODULES = 'ALWAYS_BOOTSTRAP_MODULES';
const USE_LOCAL_MODULE_VERSIONS = 'USE_LOCAL_MODULE_VERSIONS';
class Events extends _events.EventEmitter {
  constructor() {
    super();
    this.history = [];
  }
  append(evt) {
    evt.now = String(_process.hrtime.bigint());
    if (this._eventIsInteresting(evt)) {
      this.history.push(evt);
    }
    process.nextTick(() => this.emit(evt.type, evt));
  }
  _eventIsInteresting(evt) {
    return evt.type !== DOWNLOADING_MODULE_PROGRESS && evt.type !== INSTALLING_MODULE_PROGRESS;
  }
}
class LogStream {
  logStream = null;
  constructor(logPath) {
    try {
      this.logStream = _fs.default.createWriteStream(logPath, {
        flags: 'a'
      });
    } catch (e) {
      console.error(`Failed to create ${logPath}: ${String(e)}`);
    }
  }
  log(message) {
    message = `${new Date().toLocaleString('en-US', {
      timeZoneName: 'short'
    })} [Modules] ${message}`;
    console.log(message);
    if (this.logStream !== null) {
      this.logStream.write(message);
      this.logStream.write('\r\n');
    }
  }
  error(message) {
    message = `${new Date().toLocaleString('en-US', {
      timeZoneName: 'short'
    })} [Modules] ERROR: ${message}`;
    console.log(message);
    if (this.logStream !== null) {
      this.logStream.write(message);
      this.logStream.write('\r\n');
    }
  }
  end() {
    if (this.logStream !== null) {
      this.logStream.end();
      this.logStream = null;
    }
  }
}
const request = require('../app_bootstrap/request');
const {
  app
} = require('electron');
const REQUEST_TIMEOUT = 15000;
const backoff = new _Backoff.default(1000, 20000);
const events = new Events();
exports.events = events;
const supportsEventObjects = true;
exports.supportsEventObjects = supportsEventObjects;
let logger;
let locallyInstalledModules;
let moduleInstallPath;
let installedModulesFilePath;
let moduleDownloadPath;
let bootstrapping;
let hostUpdater;
let hostUpdateAvailable;
let skipHostUpdate;
let skipModuleUpdate;
let checkingForUpdates;
let remoteBaseURL;
let remoteQuery;
let settings;
let remoteModuleVersions;
let installedModules;
let download;
let unzip;
let newInstallInProgress;
let localModuleVersionsFilePath;
let updatable;
let bootstrapManifestFilePath;
let runningInBackground = false;
let feedURL;
let currentVersion;
let releaseChannel;
let pendingVersionDownloaded;
function initPathsOnly(_buildInfo) {
  if (locallyInstalledModules || moduleInstallPath != null) {
    return;
  }
  const {
    localModulesRoot,
    standaloneModules
  } = _buildInfo;
  locallyInstalledModules = localModulesRoot != null || standaloneModules === true;
  if (locallyInstalledModules) {
    if (_buildInfo.localModulesRoot != null) {
      (0, _nodeGlobalPaths.addGlobalPath)(_buildInfo.localModulesRoot);
    } else if (standaloneModules) {
      (0, _nodeGlobalPaths.addGlobalPath)(_path.default.join(paths.getResources() ?? '', 'standalone_modules'));
    }
  } else {
    const userDataVersioned = paths.getUserDataVersioned();
    if (userDataVersioned != null) {
      moduleInstallPath = _path.default.join(userDataVersioned, 'modules');
      (0, _nodeGlobalPaths.addGlobalPath)(moduleInstallPath);
    }
  }
}
function checkOSVersionSupported() {
  if (process.platform === 'darwin') {
    try {
      const osVersion = _os.default.release();
      const osMajorVersion = Number(osVersion.split('.')[0]);
      const osMinimumSupportedVersion = 19;
      console.log(`MacOS major version was ${osMajorVersion}, minimum supported version for future updates is ${osMinimumSupportedVersion}`);
      if (osMajorVersion < osMinimumSupportedVersion) {
        return false;
      }
    } catch (e) {
      console.error(`Failed to retrieve the MacOS version for update skips: ${e.message}`);
    }
  }
  return true;
}
function init(_endpoint, _settings, _buildInfo) {
  var _settings2, _settings3, _settings4, _settings5;
  const endpoint = _endpoint;
  settings = _settings;
  const buildInfo = _buildInfo;
  updatable = buildInfo.version !== '0.0.0' && !buildInfo.debug || ((_settings2 = settings) === null || _settings2 === void 0 ? void 0 : _settings2.get(ALWAYS_ALLOW_UPDATES));
  const hostUpdatable = buildInfo.version !== '0.0.0' && !buildInfo.debug && checkOSVersionSupported() || ((_settings3 = settings) === null || _settings3 === void 0 ? void 0 : _settings3.get(ALWAYS_ALLOW_UPDATES));
  initPathsOnly(buildInfo);
  logger = new LogStream(_path.default.join(paths.getUserData() ?? '', 'logs', 'legacyModulesUpdater.log'));
  bootstrapping = false;
  hostUpdateAvailable = false;
  checkingForUpdates = false;
  skipHostUpdate = ((_settings4 = settings) === null || _settings4 === void 0 ? void 0 : _settings4.get(SKIP_HOST_UPDATE)) || !hostUpdatable;
  skipModuleUpdate = ((_settings5 = settings) === null || _settings5 === void 0 ? void 0 : _settings5.get(SKIP_MODULE_UPDATE)) || locallyInstalledModules || !updatable;
  localModuleVersionsFilePath = _path.default.join(paths.getUserData() ?? '', 'local_module_versions.json');
  bootstrapManifestFilePath = _path.default.join(paths.getResources() ?? '', 'bootstrap', 'manifest.json');
  installedModules = {};
  remoteModuleVersions = {};
  newInstallInProgress = {};
  download = {
    active: false,
    queue: [],
    next: 0,
    failures: 0
  };
  unzip = {
    active: false,
    queue: [],
    next: 0,
    failures: 0
  };
  logger.log(`Modules initializing`);
  logger.log(`Distribution: ${locallyInstalledModules ? 'local' : 'remote'}`);
  logger.log(`Host updates: ${skipHostUpdate ? 'disabled' : 'enabled'}`);
  logger.log(`Module updates: ${skipModuleUpdate ? 'disabled' : 'enabled'}`);
  if (!locallyInstalledModules) {
    var _settings6;
    installedModulesFilePath = _path.default.join(moduleInstallPath, 'installed.json');
    moduleDownloadPath = _path.default.join(moduleInstallPath, 'pending');
    _mkdirp.default.sync(moduleDownloadPath);
    logger.log(`Module install path: ${moduleInstallPath}`);
    logger.log(`Module installed file path: ${installedModulesFilePath}`);
    logger.log(`Module download path: ${moduleDownloadPath}`);
    let failedLoadingInstalledModules = false;
    try {
      installedModules = JSON.parse(_fs.default.readFileSync(installedModulesFilePath).toString());
    } catch (err) {
      failedLoadingInstalledModules = true;
    }
    cleanDownloadedModules(installedModules);
    bootstrapping = failedLoadingInstalledModules || ((_settings6 = settings) === null || _settings6 === void 0 ? void 0 : _settings6.get(ALWAYS_BOOTSTRAP_MODULES));
  }
  hostUpdater = require('../app_bootstrap/hostUpdater');
  hostUpdater.on('checking-for-update', () => events.append({
    type: CHECKING_FOR_UPDATES
  }));
  hostUpdater.on('update-available', () => hostOnUpdateAvailable());
  hostUpdater.on('update-progress', progress => hostOnUpdateProgress(progress));
  hostUpdater.on('update-not-available', () => hostOnUpdateNotAvailable());
  hostUpdater.on('update-manually', newVersion => hostOnUpdateManually(newVersion));
  hostUpdater.on('update-downloaded', (_ev, _releaseNotes, version) => hostOnUpdateDownloaded(version));
  hostUpdater.on('error', err => hostOnError(err));
  const setFeedURL = hostUpdater.setFeedURL.bind(hostUpdater);
  remoteBaseURL = `${endpoint}/modules/${buildInfo.releaseChannel}`;
  remoteQuery = {
    host_version: buildInfo.version
  };
  if (_processUtils.IS_OSX) {
    const appFolder = _path.default.resolve(process.execPath);
    _fs.default.access(appFolder, _fs.default.constants.W_OK, err => {
      if (err != null) {
        const isInApplicationFolder = app.isInApplicationsFolder();
        logger.log(`Installer is in read-only volume in OSX. In Application folder: ${isInApplicationFolder}. Err: ${err}`);
        if (!isInApplicationFolder) {
          try {
            logger.log(`Moving to Application folder ${appFolder}`);
            const moveResult = app.moveToApplicationsFolder({
              conflictHandler: conflictErr => {
                logger.error(`moveToApplicationsFolder: conflicted: ${conflictErr}`);
                return true;
              }
            });
            if (!moveResult) {
              logger.error('moveToApplicationsFolder: failed.');
            }
          } catch (err) {
            logger.log(`moveToApplicationsFolder: Could not move installer file to Application folder: ${err}`);
          }
        }
      }
    });
  }
  switch (process.platform) {
    case 'darwin':
      feedURL = `${endpoint}/updates/${buildInfo.releaseChannel}?platform=osx&version=${buildInfo.version}`;
      setFeedURL(feedURL);
      remoteQuery.platform = 'osx';
      break;
    case 'win32':
      feedURL = `${endpoint}/updates/${buildInfo.releaseChannel}`;
      setFeedURL(feedURL);
      remoteQuery.platform = 'win';
      break;
    case 'linux':
      feedURL = `${endpoint}/updates/${buildInfo.releaseChannel}?platform=linux&version=${buildInfo.version}`;
      setFeedURL(feedURL);
      remoteQuery.platform = 'linux';
      break;
  }
  currentVersion = buildInfo.version;
  releaseChannel = buildInfo.releaseChannel;
}
function cleanDownloadedModules(installedModules) {
  try {
    const entries = _fs.default.readdirSync(moduleDownloadPath) ?? [];
    entries.forEach(entry => {
      const entryPath = _path.default.join(moduleDownloadPath, entry);
      let isStale = true;
      for (const moduleName of Object.keys(installedModules)) {
        if (entryPath === installedModules[moduleName].updateZipfile) {
          isStale = false;
          break;
        }
      }
      if (isStale) {
        _fs.default.unlinkSync(_path.default.join(moduleDownloadPath, entry));
      }
    });
  } catch (err) {
    logger.log('Could not clean downloaded modules');
    logger.log(err.stack);
  }
}
function hostOnUpdateAvailable() {
  logger.log(`Host update is available.`);
  hostUpdateAvailable = true;
  events.append({
    type: UPDATE_CHECK_FINISHED,
    succeeded: true,
    updateCount: 1,
    manualRequired: false
  });
  events.append({
    type: DOWNLOADING_MODULE,
    name: 'host',
    current: 1,
    total: 1,
    foreground: !runningInBackground
  });
}
function hostOnUpdateProgress(progress) {
  logger.log(`Host update progress: ${progress}%`);
  events.append({
    type: DOWNLOADING_MODULE_PROGRESS,
    name: 'host',
    progress: progress
  });
}
function hostOnUpdateNotAvailable() {
  logger.log(`Host is up to date.`);
  if (!skipModuleUpdate) {
    void checkForModuleUpdates();
  } else {
    events.append({
      type: UPDATE_CHECK_FINISHED,
      succeeded: true,
      updateCount: 0,
      manualRequired: false
    });
  }
}
function hostOnUpdateManually(newVersion) {
  logger.log(`Host update is available. Manual update required!`);
  hostUpdateAvailable = true;
  checkingForUpdates = false;
  events.append({
    type: UPDATE_MANUALLY,
    newVersion: newVersion
  });
  events.append({
    type: UPDATE_CHECK_FINISHED,
    succeeded: true,
    updateCount: 1,
    manualRequired: true
  });
}
function hostOnUpdateDownloaded(version) {
  logger.log(`Host update downloaded (version ${version ?? 'unknown'})`);
  checkingForUpdates = false;
  pendingVersionDownloaded = version;
  events.append({
    type: DOWNLOADED_MODULE,
    name: 'host',
    current: 1,
    total: 1,
    succeeded: true
  });
  events.append({
    type: DOWNLOADING_MODULES_FINISHED,
    succeeded: 1,
    failed: 0
  });
}
function hostOnError(err) {
  logger.log(`Host update failed: ${err}`);
  if (err != null && String(err).indexOf('Could not get code signature for running application') !== -1) {
    console.warn('Skipping host updates due to code signing failure.');
    skipHostUpdate = true;
  }
  checkingForUpdates = false;
  if (!hostUpdateAvailable) {
    events.append({
      type: UPDATE_CHECK_FINISHED,
      succeeded: false,
      updateCount: 0,
      manualRequired: false
    });
  } else {
    events.append({
      type: DOWNLOADED_MODULE,
      name: 'host',
      current: 1,
      total: 1,
      succeeded: false
    });
    events.append({
      type: DOWNLOADING_MODULES_FINISHED,
      succeeded: 0,
      failed: 1
    });
  }
}
async function checkForHostUpdates() {
  if (process.platform === 'darwin' && (releaseChannel === 'development' || releaseChannel === 'canary')) {
    let shouldSkipUpdate = false;
    try {
      logger.log('Performing host update pre-check (macOS only)...');
      const response = await request.get({
        url: feedURL,
        timeout: REQUEST_TIMEOUT
      });
      if (response.statusCode === 204) {
        logger.log(`...no content; we're up to date.`);
        shouldSkipUpdate = true;
      } else {
        const {
          name: newVersion
        } = JSON.parse(response.body);
        logger.log(`...update available for ${newVersion}...`);
        if (newVersion === currentVersion) {
          logger.log(`...but we already have it; we're up to date.`);
          shouldSkipUpdate = true;
        } else if (newVersion === pendingVersionDownloaded) {
          logger.log(`...but we've already downloaded it and are awaiting install.`);
          shouldSkipUpdate = true;
        }
      }
    } catch (err) {
      logger.log(`...failed: ${String(err)}.`);
      hostOnError(err);
      return;
    }
    if (shouldSkipUpdate) {
      if (pendingVersionDownloaded != null) {
        events.append({
          type: CHECKING_FOR_UPDATES
        });
        hostOnUpdateAvailable();
        hostOnUpdateProgress(100);
        hostOnUpdateDownloaded(pendingVersionDownloaded);
      } else {
        events.append({
          type: CHECKING_FOR_UPDATES
        });
        hostOnUpdateNotAvailable();
      }
      return;
    }
  }
  hostUpdater.checkForUpdates();
}
function checkForUpdates() {
  if (checkingForUpdates) return;
  checkingForUpdates = true;
  hostUpdateAvailable = false;
  if (skipHostUpdate) {
    events.append({
      type: CHECKING_FOR_UPDATES
    });
    hostOnUpdateNotAvailable();
  } else {
    logger.log('Checking for host updates.');
    void checkForHostUpdates();
  }
}
function setInBackground() {
  runningInBackground = true;
}
function getRemoteModuleName(name) {
  if (_processUtils.IS_WIN && process.arch === 'x64') {
    return `${name}.x64`;
  }
  return name;
}
async function checkForModuleUpdates() {
  var _settings7;
  const query = {
    ...remoteQuery,
    _: Math.floor(Date.now() / 1000 / 60 / 5)
  };
  const url = `${remoteBaseURL}/versions.json`;
  logger.log(`Checking for module updates at ${url}`);
  let response;
  try {
    response = await request.get({
      url,
      qs: query,
      timeout: REQUEST_TIMEOUT
    });
    checkingForUpdates = false;
  } catch (err) {
    checkingForUpdates = false;
    logger.log(`Failed fetching module versions: ${String(err)}`);
    events.append({
      type: UPDATE_CHECK_FINISHED,
      succeeded: false,
      updateCount: 0,
      manualRequired: false
    });
    return;
  }
  remoteModuleVersions = JSON.parse(response.body);
  if ((_settings7 = settings) === null || _settings7 === void 0 ? void 0 : _settings7.get(USE_LOCAL_MODULE_VERSIONS)) {
    try {
      remoteModuleVersions = JSON.parse(_fs.default.readFileSync(localModuleVersionsFilePath).toString());
      console.log('Using local module versions: ', remoteModuleVersions);
    } catch (err) {
      console.warn('Failed to parse local module versions: ', err);
    }
  }
  const updatesToDownload = [];
  for (const moduleName of Object.keys(installedModules)) {
    const installedModule = installedModules[moduleName];
    const installed = installedModule.installedVersion;
    if (installed === null) {
      continue;
    }
    const update = installedModule.updateVersion || 0;
    const remote = remoteModuleVersions[getRemoteModuleName(moduleName)] || 0;
    if (installed !== remote && update !== remote) {
      logger.log(`Module update available: ${moduleName}@${remote} [installed: ${installed}]`);
      updatesToDownload.push({
        name: moduleName,
        version: remote
      });
    }
  }
  events.append({
    type: UPDATE_CHECK_FINISHED,
    succeeded: true,
    updateCount: updatesToDownload.length,
    manualRequired: false
  });
  if (updatesToDownload.length === 0) {
    logger.log(`No module updates available.`);
  } else {
    updatesToDownload.forEach(e => addModuleToDownloadQueue(e.name, e.version));
  }
}
function addModuleToDownloadQueue(name, version, authToken) {
  download.queue.push({
    name,
    version,
    data: authToken
  });
  process.nextTick(() => processDownloadQueue());
}
async function processDownloadQueue() {
  if (download.active) return;
  if (download.queue.length === 0) return;
  download.active = true;
  const queuedModule = download.queue[download.next];
  download.next += 1;
  events.append({
    type: DOWNLOADING_MODULE,
    name: queuedModule.name,
    current: download.next,
    total: download.queue.length,
    foreground: !runningInBackground
  });
  let progress = 0;
  let receivedBytes = 0;
  const url = `${remoteBaseURL}/${encodeURIComponent(getRemoteModuleName(queuedModule.name))}/${encodeURIComponent(queuedModule.version ?? '')}`;
  logger.log(`Fetching ${queuedModule.name}@${queuedModule.version} from ${url}`);
  const headers = {};
  if (queuedModule.data != null) {
    headers['Authorization'] = queuedModule.data;
  }
  const moduleZipPath = _path.default.join(moduleDownloadPath, `${queuedModule.name}-${queuedModule.version}.zip`);
  const stream = _fs.default.createWriteStream(moduleZipPath);
  stream.on('progress', ({
    receivedBytes: newReceivedBytes,
    totalBytes
  }) => {
    receivedBytes = newReceivedBytes;
    const newProgress = Math.min(Math.floor(100 * (receivedBytes / totalBytes)), 100);
    if (progress !== newProgress) {
      progress = newProgress;
      logger.log(`Streaming ${queuedModule.name}@${queuedModule.version} to ${moduleZipPath}: ${progress}%`);
      events.append({
        type: DOWNLOADING_MODULE_PROGRESS,
        name: queuedModule.name,
        progress: progress
      });
    }
  });
  logger.log(`Streaming ${queuedModule.name}@${queuedModule.version} to ${moduleZipPath}`);
  try {
    const response = await request.get({
      url,
      qs: remoteQuery,
      headers,
      timeout: REQUEST_TIMEOUT,
      stream
    });
    finishModuleDownload(queuedModule.name, queuedModule.version, moduleZipPath, receivedBytes, response.statusCode === 200);
  } catch (err) {
    logger.log(`Failed fetching module ${queuedModule.name}@${queuedModule.version}: ${String(err)}`);
    finishModuleDownload(queuedModule.name, queuedModule.version, undefined, receivedBytes, false);
  }
}
function commitInstalledModules() {
  const data = JSON.stringify(installedModules, null, 2);
  _fs.default.writeFileSync(installedModulesFilePath, data);
}
function finishModuleDownload(name, version, zipfile, receivedBytes, succeeded) {
  if (!installedModules[name]) {
    installedModules[name] = {};
  }
  if (succeeded) {
    installedModules[name].updateVersion = version;
    installedModules[name].updateZipfile = zipfile;
    commitInstalledModules();
  } else {
    download.failures += 1;
  }
  events.append({
    type: DOWNLOADED_MODULE,
    name: name,
    current: download.next,
    total: download.queue.length,
    succeeded: succeeded,
    receivedBytes: receivedBytes
  });
  if (download.next >= download.queue.length) {
    const successes = download.queue.length - download.failures;
    logger.log(`Finished module downloads. [success: ${successes}] [failure: ${download.failures}]`);
    events.append({
      type: DOWNLOADING_MODULES_FINISHED,
      succeeded: successes,
      failed: download.failures
    });
    download.queue = [];
    download.next = 0;
    download.failures = 0;
    download.active = false;
  } else {
    const continueDownloads = () => {
      download.active = false;
      void processDownloadQueue();
    };
    if (succeeded) {
      backoff.succeed();
      process.nextTick(continueDownloads);
    } else {
      logger.log(`Waiting ${Math.floor(backoff.current)}ms before next download.`);
      backoff.fail(continueDownloads);
    }
  }
  if (newInstallInProgress[name] != null) {
    addModuleToUnzipQueue(name, version, zipfile);
  }
}
function addModuleToUnzipQueue(name, version, zipfile) {
  unzip.queue.push({
    name,
    version,
    data: zipfile
  });
  process.nextTick(() => processUnzipQueue());
}
function processUnzipQueue() {
  if (unzip.active) return;
  if (unzip.queue.length === 0) return;
  unzip.active = true;
  const queuedModule = unzip.queue[unzip.next];
  const installedModule = installedModules[queuedModule.name];
  const installedVersion = installedModule != null ? installedModule.installedVersion : null;
  unzip.next += 1;
  events.append({
    type: INSTALLING_MODULE,
    name: queuedModule.name,
    current: unzip.next,
    total: unzip.queue.length,
    foreground: !runningInBackground,
    oldVersion: installedVersion,
    newVersion: queuedModule.version
  });
  let hasErrored = false;
  const onError = (error, zipfile) => {
    if (hasErrored) return;
    hasErrored = true;
    logger.log(`Failed installing ${queuedModule.name}@${queuedModule.version}: ${String(error)}`);
    succeeded = false;
    if (zipfile) {
      zipfile.close();
    }
    finishModuleUnzip(queuedModule, succeeded);
  };
  let succeeded = true;
  const extractRoot = _path.default.join(moduleInstallPath, queuedModule.name);
  logger.log(`Installing ${queuedModule.name}@${queuedModule.version} from ${queuedModule.data}`);
  const processZipfile = (err, zipfile) => {
    if (err != null) {
      onError(err, null);
      return;
    }
    const totalEntries = zipfile.entryCount;
    let processedEntries = 0;
    zipfile.on('entry', entry => {
      processedEntries += 1;
      const percent = Math.min(Math.floor(processedEntries / totalEntries * 100), 100);
      events.append({
        type: INSTALLING_MODULE_PROGRESS,
        name: queuedModule.name,
        progress: percent
      });
      if (/\/$/.test(entry.fileName)) {
        zipfile.readEntry();
        return;
      }
      zipfile.openReadStream(entry, (err, stream) => {
        if (err != null) {
          onError(err, zipfile);
          return;
        }
        stream.on('error', e => onError(e, zipfile));
        (0, _mkdirp.default)(_path.default.join(extractRoot, _path.default.dirname(entry.fileName))).then(() => {
          const tempFileName = _path.default.join(extractRoot, entry.fileName + '.tmp');
          const finalFileName = _path.default.join(extractRoot, entry.fileName);
          const writeStream = originalFs.createWriteStream(tempFileName);
          writeStream.on('error', e => {
            stream.destroy();
            try {
              originalFs.unlinkSync(tempFileName);
            } catch (err) {}
            onError(e, zipfile);
          });
          writeStream.on('finish', () => {
            try {
              originalFs.unlinkSync(finalFileName);
            } catch (err) {}
            try {
              originalFs.renameSync(tempFileName, finalFileName);
            } catch (err) {
              onError(err, zipfile);
              return;
            }
            zipfile.readEntry();
          });
          stream.pipe(writeStream);
        }).catch(err => {
          onError(err, zipfile);
        });
      });
    });
    zipfile.on('error', err => {
      onError(err, zipfile);
    });
    zipfile.on('end', () => {
      if (!succeeded) return;
      installedModules[queuedModule.name].installedVersion = queuedModule.version;
      finishModuleUnzip(queuedModule, succeeded);
    });
    zipfile.readEntry();
  };
  try {
    _yauzl.default.open(queuedModule.data ?? '', {
      lazyEntries: true,
      autoClose: true
    }, processZipfile);
  } catch (err) {
    onError(err, null);
  }
}
function finishModuleUnzip(unzippedModule, succeeded) {
  delete newInstallInProgress[unzippedModule.name];
  delete installedModules[unzippedModule.name].updateZipfile;
  delete installedModules[unzippedModule.name].updateVersion;
  commitInstalledModules();
  if (!succeeded) {
    unzip.failures += 1;
  }
  events.append({
    type: INSTALLED_MODULE,
    name: unzippedModule.name,
    current: unzip.next,
    total: unzip.queue.length,
    succeeded: succeeded
  });
  if (unzip.next >= unzip.queue.length) {
    const successes = unzip.queue.length - unzip.failures;
    bootstrapping = false;
    logger.log(`Finished module installations. [success: ${successes}] [failure: ${unzip.failures}]`);
    unzip.queue = [];
    unzip.next = 0;
    unzip.failures = 0;
    unzip.active = false;
    events.append({
      type: INSTALLING_MODULES_FINISHED,
      succeeded: successes,
      failed: unzip.failures
    });
    return;
  }
  process.nextTick(() => {
    unzip.active = false;
    processUnzipQueue();
  });
}
function quitAndInstallUpdates() {
  logger.log(`Relaunching to install ${hostUpdateAvailable ? 'host' : 'module'} updates...`);
  if (hostUpdateAvailable) {
    hostUpdater.quitAndInstall();
  } else {
    relaunch();
  }
}
function relaunch() {
  logger.end();
  const {
    app
  } = require('electron');
  app.relaunch();
  app.quit();
}
function isInstalled(name, version) {
  const metadata = installedModules[name];
  if (locallyInstalledModules) return true;
  if (metadata && metadata.installedVersion > 0) {
    if (version == null) return true;
    if (metadata.installedVersion === version) return true;
  }
  return false;
}
function getInstalled() {
  return {
    ...installedModules
  };
}
function install(name, defer, options) {
  let {
    version,
    authToken
  } = options ?? {};
  if (isInstalled(name, version)) {
    if (!defer) {
      events.append({
        type: INSTALLED_MODULE,
        name: name,
        current: 1,
        total: 1,
        succeeded: true
      });
    }
    return;
  }
  if (newInstallInProgress[name] != null) return;
  if (!updatable) {
    logger.log(`Not updatable; ignoring request to install ${name}...`);
    return;
  }
  if (defer) {
    if (version != null) {
      throw new Error(`Cannot defer install for a specific version module (${name}, ${version})`);
    }
    logger.log(`Deferred install for ${name}...`);
    installedModules[name] = {
      installedVersion: 0
    };
    commitInstalledModules();
  } else {
    logger.log(`Starting to install ${name}...`);
    if (version == null) {
      version = remoteModuleVersions[name] || 0;
    }
    newInstallInProgress[name] = version;
    addModuleToDownloadQueue(name, version, authToken);
  }
}
function installPendingUpdates() {
  const updatesToInstall = [];
  if (bootstrapping) {
    let modules = {};
    try {
      modules = JSON.parse(_fs.default.readFileSync(bootstrapManifestFilePath).toString());
    } catch (err) {}
    for (const moduleName of Object.keys(modules)) {
      installedModules[moduleName] = {
        installedVersion: 0
      };
      const zipPath = paths.getResources();
      if (zipPath == null) {
        logger.error('No resource path');
      } else {
        const zipfile = _path.default.join(zipPath, 'bootstrap', `${moduleName}.zip`);
        updatesToInstall.push({
          moduleName,
          update: modules[moduleName],
          zipfile
        });
      }
    }
  }
  for (const moduleName of Object.keys(installedModules)) {
    const update = installedModules[moduleName].updateVersion || 0;
    const zipfile = installedModules[moduleName].updateZipfile;
    if (update > 0 && zipfile != null) {
      updatesToInstall.push({
        moduleName,
        update,
        zipfile
      });
    }
  }
  if (updatesToInstall.length > 0) {
    logger.log(`${bootstrapping ? 'Bootstrapping' : 'Installing updates'}...`);
    updatesToInstall.forEach(e => addModuleToUnzipQueue(e.moduleName, e.update, e.zipfile));
  } else {
    logger.log('No updates to install');
    events.append({
      type: NO_PENDING_UPDATES
    });
  }
}