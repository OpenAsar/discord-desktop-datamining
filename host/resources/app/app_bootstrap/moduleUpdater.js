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
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportsEventObjects = exports.events = exports.NO_PENDING_UPDATES = exports.INSTALLING_MODULE_PROGRESS = exports.INSTALLING_MODULE = exports.INSTALLING_MODULES_FINISHED = exports.DOWNLOADED_MODULE = exports.UPDATE_MANUALLY = exports.DOWNLOADING_MODULES_FINISHED = exports.DOWNLOADING_MODULE_PROGRESS = exports.DOWNLOADING_MODULE = exports.UPDATE_CHECK_FINISHED = exports.INSTALLED_MODULE = exports.CHECKING_FOR_UPDATES = void 0;
exports.initPathsOnly = initPathsOnly;
exports.init = init;
exports.checkForUpdates = checkForUpdates;
exports.setInBackground = setInBackground;
exports.quitAndInstallUpdates = quitAndInstallUpdates;
exports.isInstalled = isInstalled;
exports.getInstalled = getInstalled;
exports.install = install;
exports.installPendingUpdates = installPendingUpdates;
const events_1 = require("events");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const yauzl_1 = __importDefault(require("yauzl"));
const Backoff_1 = __importDefault(require("../common/Backoff"));
const analytics = __importStar(require("../common/analytics"));
const nodeGlobalPaths_1 = require("../common/nodeGlobalPaths");
const paths = __importStar(require("../common/paths"));
const processUtils_1 = require("../common/processUtils");
const request_1 = __importDefault(require("./request"));
const originalFs = require('original-fs');
exports.CHECKING_FOR_UPDATES = 'checking-for-updates';
exports.INSTALLED_MODULE = 'installed-module';
exports.UPDATE_CHECK_FINISHED = 'update-check-finished';
exports.DOWNLOADING_MODULE = 'downloading-module';
exports.DOWNLOADING_MODULE_PROGRESS = 'downloading-module-progress';
exports.DOWNLOADING_MODULES_FINISHED = 'downloading-modules-finished';
exports.UPDATE_MANUALLY = 'update-manually';
exports.DOWNLOADED_MODULE = 'downloaded-module';
exports.INSTALLING_MODULES_FINISHED = 'installing-modules-finished';
exports.INSTALLING_MODULE = 'installing-module';
exports.INSTALLING_MODULE_PROGRESS = 'installing-module-progress';
exports.NO_PENDING_UPDATES = 'no-pending-updates';
const ALWAYS_ALLOW_UPDATES = 'ALWAYS_ALLOW_UPDATES';
const SKIP_HOST_UPDATE = 'SKIP_HOST_UPDATE';
const SKIP_MODULE_UPDATE = 'SKIP_MODULE_UPDATE';
const ALWAYS_BOOTSTRAP_MODULES = 'ALWAYS_BOOTSTRAP_MODULES';
const USE_LOCAL_MODULE_VERSIONS = 'USE_LOCAL_MODULE_VERSIONS';
class Events extends events_1.EventEmitter {
    history;
    constructor() {
        super();
        this.history = [];
    }
    append(evt) {
        evt.now = String(process_1.default.hrtime.bigint());
        if (this._eventIsInteresting(evt)) {
            this.history.push(evt);
        }
        process_1.default.nextTick(() => this.emit(evt.type, evt));
    }
    _eventIsInteresting(evt) {
        return evt.type !== exports.DOWNLOADING_MODULE_PROGRESS && evt.type !== exports.INSTALLING_MODULE_PROGRESS;
    }
}
class LogStream {
    logStream = null;
    constructor(logPath) {
        try {
            this.logStream = fs_1.default.createWriteStream(logPath, { flags: 'a' });
        }
        catch (e) {
            console.error(`Failed to create ${logPath}: ${String(e)}`);
        }
    }
    log(message) {
        message = `${new Date().toLocaleString('en-US', { timeZoneName: 'short' })} [Modules] ${message}`;
        console.log(message);
        if (this.logStream !== null) {
            this.logStream.write(message);
            this.logStream.write('\r\n');
        }
    }
    error(message) {
        message = `${new Date().toLocaleString('en-US', { timeZoneName: 'short' })} [Modules] ERROR: ${message}`;
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
const { app } = require('electron');
const REQUEST_TIMEOUT = 15000;
const backoff = new Backoff_1.default(1000, 20000);
exports.events = new Events();
exports.supportsEventObjects = true;
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
    const { localModulesRoot, standaloneModules } = _buildInfo;
    locallyInstalledModules = localModulesRoot != null || standaloneModules === true;
    if (locallyInstalledModules) {
        if (_buildInfo.localModulesRoot != null) {
            (0, nodeGlobalPaths_1.addGlobalPath)(_buildInfo.localModulesRoot);
        }
        else if (standaloneModules) {
            (0, nodeGlobalPaths_1.addGlobalPath)(path_1.default.join(paths.getResources() ?? '', 'standalone_modules'));
        }
    }
    else {
        const userDataVersioned = paths.getUserDataVersioned();
        if (userDataVersioned != null) {
            moduleInstallPath = path_1.default.join(userDataVersioned, 'modules');
            (0, nodeGlobalPaths_1.addGlobalPath)(moduleInstallPath);
        }
    }
}
function checkOSVersionSupported() {
    if (process_1.default.platform === 'darwin') {
        try {
            const osVersion = os_1.default.release();
            const osMajorVersion = Number(osVersion.split('.')[0]);
            const osMinimumSupportedVersion = 20;
            console.log(`MacOS major version was ${osMajorVersion}, minimum supported version for future updates is ${osMinimumSupportedVersion}`);
            if (osMajorVersion < osMinimumSupportedVersion) {
                return false;
            }
        }
        catch (e) {
            console.error(`Failed to retrieve the MacOS version for update skips: ${e.message}`);
        }
    }
    return true;
}
function init(_endpoint, _settings, _buildInfo) {
    const endpoint = _endpoint;
    settings = _settings;
    const buildInfo = _buildInfo;
    updatable = (buildInfo.version !== '0.0.0' && !buildInfo.debug) || settings?.get(ALWAYS_ALLOW_UPDATES);
    const versionTriple = buildInfo.version.split(/-|\+/, 1)[0];
    const hostUpdatable = (versionTriple !== '0.0.0' && !buildInfo.debug && checkOSVersionSupported())
        || settings?.get(ALWAYS_ALLOW_UPDATES);
    initPathsOnly(buildInfo);
    logger = new LogStream(path_1.default.join(paths.getUserData() ?? '', 'logs', 'legacyModulesUpdater.log'));
    bootstrapping = false;
    hostUpdateAvailable = false;
    checkingForUpdates = false;
    skipHostUpdate = settings?.get(SKIP_HOST_UPDATE) || !hostUpdatable;
    skipModuleUpdate = settings?.get(SKIP_MODULE_UPDATE) || locallyInstalledModules || !updatable;
    localModuleVersionsFilePath = path_1.default.join(paths.getUserData() ?? '', 'local_module_versions.json');
    bootstrapManifestFilePath = path_1.default.join(paths.getResources() ?? '', 'bootstrap', 'manifest.json');
    installedModules = {};
    remoteModuleVersions = {};
    newInstallInProgress = {};
    download = {
        active: false,
        queue: [],
        next: 0,
        failures: 0,
    };
    unzip = {
        active: false,
        queue: [],
        next: 0,
        failures: 0,
    };
    logger.log(`Modules initializing`);
    logger.log(`Distribution: ${locallyInstalledModules ? 'local' : 'remote'}`);
    logger.log(`Host updates: ${skipHostUpdate ? 'disabled' : 'enabled'}`);
    logger.log(`Module updates: ${skipModuleUpdate ? 'disabled' : 'enabled'}`);
    if (!locallyInstalledModules) {
        installedModulesFilePath = path_1.default.join(moduleInstallPath, 'installed.json');
        moduleDownloadPath = path_1.default.join(moduleInstallPath, 'pending');
        fs_1.default.mkdirSync(moduleDownloadPath, { recursive: true });
        logger.log(`Module install path: ${moduleInstallPath}`);
        logger.log(`Module installed file path: ${installedModulesFilePath}`);
        logger.log(`Module download path: ${moduleDownloadPath}`);
        let failedLoadingInstalledModules = false;
        try {
            installedModules = JSON.parse(fs_1.default.readFileSync(installedModulesFilePath).toString());
        }
        catch (err) {
            failedLoadingInstalledModules = true;
        }
        cleanDownloadedModules(installedModules);
        bootstrapping = failedLoadingInstalledModules || settings?.get(ALWAYS_BOOTSTRAP_MODULES);
    }
    hostUpdater = require('./hostUpdater');
    hostUpdater.on('checking-for-update', () => exports.events.append({
        type: exports.CHECKING_FOR_UPDATES,
    }));
    hostUpdater.on('update-available', () => hostOnUpdateAvailable());
    hostUpdater.on('update-progress', (progress) => hostOnUpdateProgress(progress));
    hostUpdater.on('update-not-available', () => hostOnUpdateNotAvailable());
    hostUpdater.on('update-manually', (newVersion) => hostOnUpdateManually(newVersion));
    hostUpdater.on('update-downloaded', (_ev, _releaseNotes, version, _releaseDate, _updateURL) => hostOnUpdateDownloaded(version));
    hostUpdater.on('error', (err) => hostOnError(err));
    const setFeedURL = hostUpdater.setFeedURL.bind(hostUpdater);
    remoteBaseURL = `${endpoint}/modules/${buildInfo.releaseChannel}`;
    remoteQuery = { host_version: buildInfo.version };
    if (processUtils_1.IS_OSX) {
        const appFolder = path_1.default.resolve(process_1.default.execPath);
        fs_1.default.access(appFolder, fs_1.default.constants.W_OK, (err) => {
            if (err != null) {
                const isInApplicationFolder = app.isInApplicationsFolder();
                logger.log(`Installer is in read-only volume in OSX. In Application folder: ${isInApplicationFolder}. Err: ${err}`);
                if (!isInApplicationFolder) {
                    try {
                        logger.log(`Moving to Application folder ${appFolder}`);
                        const moveResult = app.moveToApplicationsFolder({
                            conflictHandler: (conflictErr) => {
                                logger.error(`moveToApplicationsFolder: conflicted: ${conflictErr}`);
                                return true;
                            },
                        });
                        if (!moveResult) {
                            logger.error('moveToApplicationsFolder: failed.');
                        }
                    }
                    catch (err) {
                        logger.log(`moveToApplicationsFolder: Could not move installer file to Application folder: ${err}`);
                    }
                }
            }
        });
    }
    switch (process_1.default.platform) {
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
        const entries = fs_1.default.readdirSync(moduleDownloadPath) ?? [];
        entries.forEach((entry) => {
            const entryPath = path_1.default.join(moduleDownloadPath, entry);
            let isStale = true;
            for (const moduleName of Object.keys(installedModules)) {
                if (entryPath === installedModules[moduleName].updateZipfile) {
                    isStale = false;
                    break;
                }
            }
            if (isStale) {
                fs_1.default.unlinkSync(path_1.default.join(moduleDownloadPath, entry));
            }
        });
    }
    catch (err) {
        logger.log('Could not clean downloaded modules');
        logger.log(err.stack);
    }
}
function hostOnUpdateAvailable() {
    logger.log(`Host update is available.`);
    hostUpdateAvailable = true;
    exports.events.append({
        type: exports.UPDATE_CHECK_FINISHED,
        succeeded: true,
        updateCount: 1,
        manualRequired: false,
    });
    exports.events.append({
        type: exports.DOWNLOADING_MODULE,
        name: 'host',
        current: 1,
        total: 1,
        foreground: !runningInBackground,
    });
}
function hostOnUpdateProgress(progress) {
    logger.log(`Host update progress: ${progress}%`);
    exports.events.append({
        type: exports.DOWNLOADING_MODULE_PROGRESS,
        name: 'host',
        progress: progress,
    });
}
function hostOnUpdateNotAvailable() {
    logger.log(`Host is up to date.`);
    if (!skipModuleUpdate) {
        void checkForModuleUpdates();
    }
    else {
        exports.events.append({
            type: exports.UPDATE_CHECK_FINISHED,
            succeeded: true,
            updateCount: 0,
            manualRequired: false,
        });
    }
}
function hostOnUpdateManually(newVersion) {
    logger.log(`Host update is available. Manual update required!`);
    hostUpdateAvailable = true;
    checkingForUpdates = false;
    exports.events.append({
        type: exports.UPDATE_MANUALLY,
        newVersion: newVersion,
    });
    exports.events.append({
        type: exports.UPDATE_CHECK_FINISHED,
        succeeded: true,
        updateCount: 1,
        manualRequired: true,
    });
}
function hostOnUpdateDownloaded(version) {
    logger.log(`Host update downloaded (version ${version ?? 'unknown'})`);
    checkingForUpdates = false;
    pendingVersionDownloaded = version;
    exports.events.append({
        type: exports.DOWNLOADED_MODULE,
        name: 'host',
        current: 1,
        total: 1,
        succeeded: true,
    });
    exports.events.append({
        type: exports.DOWNLOADING_MODULES_FINISHED,
        succeeded: 1,
        failed: 0,
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
        exports.events.append({
            type: exports.UPDATE_CHECK_FINISHED,
            succeeded: false,
            updateCount: 0,
            manualRequired: false,
        });
    }
    else {
        exports.events.append({
            type: exports.DOWNLOADED_MODULE,
            name: 'host',
            current: 1,
            total: 1,
            succeeded: false,
        });
        exports.events.append({
            type: exports.DOWNLOADING_MODULES_FINISHED,
            succeeded: 0,
            failed: 1,
        });
    }
}
async function checkForHostUpdates() {
    if (process_1.default.platform === 'darwin' && (releaseChannel === 'development' || releaseChannel === 'canary')) {
        let shouldSkipUpdate = false;
        try {
            logger.log('Performing host update pre-check (macOS only)...');
            const response = await request_1.default.get({ url: feedURL, timeout: REQUEST_TIMEOUT });
            if (response.statusCode === 204) {
                logger.log(`...no content; we're up to date.`);
                shouldSkipUpdate = true;
            }
            else {
                if (response.body == null) {
                    logger.log(`...response body not provided (unexpected); can't update`);
                    shouldSkipUpdate = true;
                }
                else {
                    const { name: newVersion } = JSON.parse(response.body.toString('utf-8'));
                    logger.log(`...update available for ${newVersion}...`);
                    if (newVersion === currentVersion) {
                        logger.log(`...but we already have it; we're up to date.`);
                        shouldSkipUpdate = true;
                    }
                    else if (newVersion === pendingVersionDownloaded) {
                        logger.log(`...but we've already downloaded it and are awaiting install.`);
                        shouldSkipUpdate = true;
                    }
                }
            }
        }
        catch (err) {
            logger.log(`...failed: ${String(err)}.`);
            hostOnError(err);
            return;
        }
        if (shouldSkipUpdate) {
            if (pendingVersionDownloaded != null) {
                exports.events.append({ type: exports.CHECKING_FOR_UPDATES });
                hostOnUpdateAvailable();
                hostOnUpdateProgress(100);
                hostOnUpdateDownloaded(pendingVersionDownloaded);
            }
            else {
                exports.events.append({ type: exports.CHECKING_FOR_UPDATES });
                hostOnUpdateNotAvailable();
            }
            return;
        }
    }
    hostUpdater.checkForUpdates();
}
function checkForUpdates() {
    if (checkingForUpdates)
        return;
    checkingForUpdates = true;
    hostUpdateAvailable = false;
    if (skipHostUpdate) {
        exports.events.append({ type: exports.CHECKING_FOR_UPDATES });
        hostOnUpdateNotAvailable();
    }
    else {
        logger.log('Checking for host updates.');
        void checkForHostUpdates();
    }
}
function setInBackground() {
    runningInBackground = true;
}
function getRemoteModuleName(name) {
    if (processUtils_1.IS_WIN && process_1.default.arch === 'x64') {
        return `${name}.x64`;
    }
    return name;
}
function reportFailedUpdate(failureStr) {
    checkingForUpdates = false;
    logger.log(failureStr);
    exports.events.append({
        type: exports.UPDATE_CHECK_FINISHED,
        succeeded: false,
        updateCount: 0,
        manualRequired: false,
    });
}
async function checkForModuleUpdates() {
    const query = { ...remoteQuery, _: Math.floor(Date.now() / 1000 / 60 / 5) };
    const url = `${remoteBaseURL}/versions.json`;
    logger.log(`Checking for module updates at ${url}`);
    let response;
    try {
        response = await request_1.default.get({ url, qs: query, timeout: REQUEST_TIMEOUT });
        checkingForUpdates = false;
    }
    catch (err) {
        reportFailedUpdate(`Failed fetching module versions: ${String(err)}`);
        return;
    }
    if (response.body == null) {
        reportFailedUpdate('Failed fetching module versions: empty response body');
        return;
    }
    remoteModuleVersions = JSON.parse(response.body.toString('utf-8'));
    if (settings?.get(USE_LOCAL_MODULE_VERSIONS)) {
        try {
            remoteModuleVersions = JSON.parse(fs_1.default.readFileSync(localModuleVersionsFilePath).toString());
            console.log('Using local module versions: ', remoteModuleVersions);
        }
        catch (err) {
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
            updatesToDownload.push({ name: moduleName, version: remote });
        }
    }
    exports.events.append({
        type: exports.UPDATE_CHECK_FINISHED,
        succeeded: true,
        updateCount: updatesToDownload.length,
        manualRequired: false,
    });
    if (updatesToDownload.length === 0) {
        logger.log(`No module updates available.`);
    }
    else {
        updatesToDownload.forEach((e) => addModuleToDownloadQueue(e.name, e.version));
    }
}
function addModuleToDownloadQueue(name, version, authToken) {
    download.queue.push({ name, version, data: authToken });
    process_1.default.nextTick(() => processDownloadQueue());
}
async function processDownloadQueue() {
    if (download.active)
        return;
    if (download.queue.length === 0)
        return;
    download.active = true;
    const queuedModule = download.queue[download.next];
    download.next += 1;
    exports.events.append({
        type: exports.DOWNLOADING_MODULE,
        name: queuedModule.name,
        current: download.next,
        total: download.queue.length,
        foreground: !runningInBackground,
    });
    let progress = 0;
    let receivedBytes = 0;
    const url = `${remoteBaseURL}/${encodeURIComponent(getRemoteModuleName(queuedModule.name))}/${encodeURIComponent(queuedModule.version ?? '')}`;
    logger.log(`Fetching ${queuedModule.name}@${queuedModule.version} from ${url}`);
    const headers = {};
    if (queuedModule.data != null) {
        headers['Authorization'] = queuedModule.data;
    }
    const moduleZipPath = path_1.default.join(moduleDownloadPath, `${queuedModule.name}-${queuedModule.version}.zip`);
    const stream = fs_1.default.createWriteStream(moduleZipPath);
    stream.on('progress', ({ receivedBytes: newReceivedBytes, totalBytes }) => {
        receivedBytes = newReceivedBytes;
        const newProgress = Math.min(Math.floor(100 * (receivedBytes / totalBytes)), 100);
        if (progress !== newProgress) {
            progress = newProgress;
            logger.log(`Streaming ${queuedModule.name}@${queuedModule.version} to ${moduleZipPath}: ${progress}%`);
            exports.events.append({
                type: exports.DOWNLOADING_MODULE_PROGRESS,
                name: queuedModule.name,
                progress: progress,
            });
        }
    });
    logger.log(`Streaming ${queuedModule.name}@${queuedModule.version} to ${moduleZipPath}`);
    try {
        const response = await request_1.default.get({
            url,
            qs: remoteQuery,
            headers,
            timeout: REQUEST_TIMEOUT,
            stream,
        });
        finishModuleDownload(queuedModule.name, queuedModule.version, moduleZipPath, receivedBytes, response.statusCode === 200);
    }
    catch (err) {
        logger.log(`Failed fetching module ${queuedModule.name}@${queuedModule.version}: ${String(err)}`);
        finishModuleDownload(queuedModule.name, queuedModule.version, undefined, receivedBytes, false);
    }
}
function commitInstalledModules() {
    const data = JSON.stringify(installedModules, null, 2);
    fs_1.default.writeFileSync(installedModulesFilePath, data);
}
function finishModuleDownload(name, version, zipfile, receivedBytes, succeeded) {
    if (!installedModules[name]) {
        installedModules[name] = {};
    }
    if (succeeded) {
        installedModules[name].updateVersion = version;
        installedModules[name].updateZipfile = zipfile;
        commitInstalledModules();
    }
    else {
        download.failures += 1;
    }
    exports.events.append({
        type: exports.DOWNLOADED_MODULE,
        name: name,
        current: download.next,
        total: download.queue.length,
        succeeded: succeeded,
        receivedBytes: receivedBytes,
    });
    if (download.next >= download.queue.length) {
        const successes = download.queue.length - download.failures;
        logger.log(`Finished module downloads. [success: ${successes}] [failure: ${download.failures}]`);
        exports.events.append({
            type: exports.DOWNLOADING_MODULES_FINISHED,
            succeeded: successes,
            failed: download.failures,
        });
        download.queue = [];
        download.next = 0;
        download.failures = 0;
        download.active = false;
    }
    else {
        const continueDownloads = () => {
            download.active = false;
            void processDownloadQueue();
        };
        if (succeeded) {
            backoff.succeed();
            process_1.default.nextTick(continueDownloads);
        }
        else {
            logger.log(`Waiting ${Math.floor(backoff.current)}ms before next download.`);
            backoff.fail(continueDownloads);
        }
    }
    if (newInstallInProgress[name] != null) {
        addModuleToUnzipQueue(name, version, zipfile);
    }
}
function addModuleToUnzipQueue(name, version, zipfile) {
    unzip.queue.push({ name, version, data: zipfile });
    process_1.default.nextTick(() => processUnzipQueue());
}
function processUnzipQueue() {
    if (unzip.active)
        return;
    if (unzip.queue.length === 0)
        return;
    unzip.active = true;
    const queuedModule = unzip.queue[unzip.next];
    const installedModule = installedModules[queuedModule.name];
    const installedVersion = installedModule != null ? installedModule.installedVersion : null;
    unzip.next += 1;
    exports.events.append({
        type: exports.INSTALLING_MODULE,
        name: queuedModule.name,
        current: unzip.next,
        total: unzip.queue.length,
        foreground: !runningInBackground,
        oldVersion: installedVersion,
        newVersion: queuedModule.version,
    });
    let hasErrored = false;
    const onError = (error, zipfile) => {
        if (hasErrored)
            return;
        hasErrored = true;
        logger.log(`Failed installing ${queuedModule.name}@${queuedModule.version}: ${String(error)}`);
        succeeded = false;
        if (zipfile) {
            zipfile.close();
        }
        finishModuleUnzip(queuedModule, succeeded);
    };
    let succeeded = true;
    const extractRoot = path_1.default.join(moduleInstallPath, queuedModule.name);
    logger.log(`Installing ${queuedModule.name}@${queuedModule.version} from ${queuedModule.data}`);
    const processZipfile = (err, zipfile) => {
        if (err != null) {
            onError(err, null);
            return;
        }
        const totalEntries = zipfile.entryCount;
        let processedEntries = 0;
        zipfile.on('entry', (entry) => {
            processedEntries += 1;
            const percent = Math.min(Math.floor((processedEntries / totalEntries) * 100), 100);
            exports.events.append({
                type: exports.INSTALLING_MODULE_PROGRESS,
                name: queuedModule.name,
                progress: percent,
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
                stream.on('error', (e) => onError(e, zipfile));
                fs_1.default.promises
                    .mkdir(path_1.default.join(extractRoot, path_1.default.dirname(entry.fileName)), { recursive: true })
                    .then(() => {
                    const tempFileName = path_1.default.join(extractRoot, entry.fileName + '.tmp');
                    const finalFileName = path_1.default.join(extractRoot, entry.fileName);
                    const writeStream = originalFs.createWriteStream(tempFileName);
                    writeStream.on('error', (e) => {
                        stream.destroy();
                        try {
                            originalFs.unlinkSync(tempFileName);
                        }
                        catch (err) { }
                        onError(e, zipfile);
                    });
                    writeStream.on('finish', () => {
                        try {
                            originalFs.unlinkSync(finalFileName);
                        }
                        catch (err) { }
                        try {
                            if (!processUtils_1.IS_WIN) {
                                const mask = fs_1.default.constants.S_IRWXU | fs_1.default.constants.S_IRWXG | fs_1.default.constants.S_IRWXO;
                                const permissions = (entry.externalFileAttributes >> 16) & mask;
                                if (permissions !== 0) {
                                    originalFs.chmodSync(tempFileName, permissions);
                                }
                            }
                            originalFs.renameSync(tempFileName, finalFileName);
                        }
                        catch (err) {
                            onError(err, zipfile);
                            return;
                        }
                        zipfile.readEntry();
                    });
                    stream.pipe(writeStream);
                })
                    .catch((err) => {
                    onError(err, zipfile);
                });
            });
        });
        zipfile.on('error', (err) => {
            onError(err, zipfile);
        });
        zipfile.on('end', () => {
            if (!succeeded)
                return;
            installedModules[queuedModule.name].installedVersion = queuedModule.version;
            finishModuleUnzip(queuedModule, succeeded);
        });
        zipfile.readEntry();
    };
    try {
        yauzl_1.default.open(queuedModule.data ?? '', { lazyEntries: true, autoClose: true }, processZipfile);
    }
    catch (err) {
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
    exports.events.append({
        type: exports.INSTALLED_MODULE,
        name: unzippedModule.name,
        current: unzip.next,
        total: unzip.queue.length,
        succeeded: succeeded,
    });
    if (unzip.next >= unzip.queue.length) {
        const successes = unzip.queue.length - unzip.failures;
        bootstrapping = false;
        logger.log(`Finished module installations. [success: ${successes}] [failure: ${unzip.failures}]`);
        unzip.queue = [];
        unzip.next = 0;
        unzip.failures = 0;
        unzip.active = false;
        exports.events.append({
            type: exports.INSTALLING_MODULES_FINISHED,
            succeeded: successes,
            failed: unzip.failures,
        });
        return;
    }
    process_1.default.nextTick(() => {
        unzip.active = false;
        processUnzipQueue();
    });
}
function quitAndInstallUpdates() {
    logger.log(`Relaunching to install ${hostUpdateAvailable ? 'host' : 'module'} updates...`);
    if (hostUpdateAvailable) {
        const desktopTTI = analytics.getDesktopTTI();
        desktopTTI.trackSplashWindowRestart();
        hostUpdater.quitAndInstall();
    }
    else {
        relaunch();
    }
}
function relaunch() {
    logger.end();
    const { app } = require('electron');
    app.relaunch();
    app.quit();
}
function isInstalled(name, version) {
    const metadata = installedModules[name];
    if (locallyInstalledModules)
        return true;
    if (metadata && metadata.installedVersion > 0) {
        if (version == null)
            return true;
        if (metadata.installedVersion === version)
            return true;
    }
    return false;
}
function getInstalled() {
    return { ...installedModules };
}
function install(name, defer, options) {
    let { version, authToken } = options ?? {};
    if (isInstalled(name, version)) {
        if (!defer) {
            exports.events.append({
                type: exports.INSTALLED_MODULE,
                name: name,
                current: 1,
                total: 1,
                succeeded: true,
            });
        }
        return;
    }
    if (newInstallInProgress[name] != null)
        return;
    if (!updatable) {
        logger.log(`Not updatable; ignoring request to install ${name}...`);
        return;
    }
    if (defer) {
        if (version != null) {
            throw new Error(`Cannot defer install for a specific version module (${name}, ${version})`);
        }
        logger.log(`Deferred install for ${name}...`);
        installedModules[name] = { installedVersion: 0 };
        commitInstalledModules();
    }
    else {
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
            modules = JSON.parse(fs_1.default.readFileSync(bootstrapManifestFilePath).toString());
        }
        catch (err) { }
        for (const moduleName of Object.keys(modules)) {
            installedModules[moduleName] = { installedVersion: 0 };
            const zipPath = paths.getResources();
            if (zipPath == null) {
                logger.error('No resource path');
            }
            else {
                const zipfile = path_1.default.join(zipPath, 'bootstrap', `${moduleName}.zip`);
                updatesToInstall.push({ moduleName, update: modules[moduleName], zipfile });
            }
        }
    }
    for (const moduleName of Object.keys(installedModules)) {
        const update = installedModules[moduleName].updateVersion || 0;
        const zipfile = installedModules[moduleName].updateZipfile;
        if (update > 0 && zipfile != null) {
            updatesToInstall.push({ moduleName, update, zipfile });
        }
    }
    if (updatesToInstall.length > 0) {
        logger.log(`${bootstrapping ? 'Bootstrapping' : 'Installing updates'}...`);
        updatesToInstall.forEach((e) => addModuleToUnzipQueue(e.moduleName, e.update, e.zipfile));
    }
    else {
        logger.log('No updates to install');
        exports.events.append({
            type: exports.NO_PENDING_UPDATES,
        });
    }
}
