"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMessage = addMessage;
exports.addSentryReport = addSentryReport;
exports.captureMinidumpFromCrashpadSync = captureMinidumpFromCrashpadSync;
exports.initialize = initialize;
exports.initializeRenderer = initializeRenderer;
exports.minidumpFiles = exports.logFiles = void 0;
var _electron = _interopRequireDefault(require("electron"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _util = _interopRequireDefault(require("util"));
var _utils = require("../common/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MAX_FILE_COUNT = 10;
const MAX_LOG_SIZE = 200 * 1024;
let fileWriteCounter = 0;
let eventCounter = 0;
let logfile = undefined;
let initialized = false;
let storedModulepath = null;
const addMessageSequence = (0, _utils.createLock)();
function captureMinidumpFromCrashpadSync() {
  if (storedModulepath == null || process.platform !== 'win32') return;
  try {
    const reportsDir = _path.default.join(_electron.default.app.getPath('crashDumps'), 'reports');
    let dirContents;
    try {
      dirContents = _fs.default.readdirSync(reportsDir);
    } catch (e) {
      return;
    }
    const dmpFiles = dirContents.filter(f => f.endsWith('.dmp')).map(f => {
      const fullPath = _path.default.join(reportsDir, f);
      return {
        fullPath,
        mtime: _fs.default.statSync(fullPath).mtimeMs
      };
    }).sort((a, b) => b.mtime - a.mtime);
    if (dmpFiles.length === 0) return;
    if (Date.now() - dmpFiles[0].mtime > 60_000) return;
    const crashlogsDir = _path.default.join(storedModulepath, 'crashlogs');
    if (!_fs.default.existsSync(crashlogsDir)) {
      _fs.default.mkdirSync(crashlogsDir, {
        recursive: true
      });
    }
    const existingDmps = _fs.default.readdirSync(crashlogsDir).filter(f => f.endsWith('.dmp')).map(f => ({
      fullPath: _path.default.join(crashlogsDir, f),
      mtime: _fs.default.statSync(_path.default.join(crashlogsDir, f)).mtimeMs
    })).sort((a, b) => b.mtime - a.mtime);
    if (existingDmps.length > MAX_FILE_COUNT) {
      for (let i = MAX_FILE_COUNT; i < existingDmps.length; i++) {
        try {
          _fs.default.unlinkSync(existingDmps[i].fullPath);
        } catch {}
      }
    }
    const filenameStamp = new Date().toLocaleString('en-US', {
      timeZoneName: 'short'
    }).replace(/[^\d\w]/g, '_');
    const dmpFilename = `${filenameStamp}-${fileWriteCounter++}-minidump.dmp`;
    const dmpPath = _path.default.join(crashlogsDir, dmpFilename);
    _fs.default.writeFileSync(dmpPath, _fs.default.readFileSync(dmpFiles[0].fullPath));
    _fs.default.writeFileSync(_path.default.join(crashlogsDir, 'pending_minidump.txt'), dmpFilename);
    console.log(`blackbox: captured minidump ${dmpFilename} from Crashpad`);
  } catch (e) {
    console.error(`blackbox: captureMinidumpFromCrashpadSync error ${e === null || e === void 0 ? void 0 : e.message}`);
  }
}
class Files {
  static directory = undefined;
  constructor(name, extension) {
    this.name = name;
    this.extension = extension;
  }
  static getBlackboxDirectory() {
    if (Files.directory === undefined) {
      try {
        Files.directory = Files.getBlackboxDirectoryCore();
      } catch (e) {
        console.error(`blackbox: getBlackboxDirectory error ${e === null || e === void 0 ? void 0 : e.message}`);
        Files.directory = null;
      }
    }
    return Files.directory;
  }
  static getBlackboxDirectoryCore() {
    if (storedModulepath == null) {
      console.error(`blackbox: Unable to get module path`);
      return null;
    }
    const crashlogsPath = _path.default.join(storedModulepath, 'crashlogs');
    if (!_fs.default.existsSync(crashlogsPath)) {
      _fs.default.mkdirSync(crashlogsPath, {
        recursive: true
      });
    }
    if (!_fs.default.existsSync(crashlogsPath)) {
      console.error(`blackbox: Unable to create crashlogs directory`);
      return null;
    }
    return crashlogsPath;
  }
  static orderFilesNewestFirst(files) {
    return files.map(file => ({
      file,
      time: _fs.default.statSync(file).mtime.getTime()
    })).sort((a, b) => b.time - a.time).map(file => file.file);
  }
  async getFiles() {
    const blackboxDirectory = Files.getBlackboxDirectory();
    if (blackboxDirectory == null) return [];
    try {
      const dircontents = await _fs.default.promises.readdir(blackboxDirectory);
      const existing = dircontents.filter(f => f.endsWith('.' + this.extension));
      return Files.orderFilesNewestFirst(existing.map(file => _path.default.join(blackboxDirectory, file)));
    } catch (e) {
      console.error(`blackbox: getFiles error ${e === null || e === void 0 ? void 0 : e.message}`);
      return [];
    }
  }
  async getNewFilename() {
    const blackboxDirectory = Files.getBlackboxDirectory();
    if (blackboxDirectory == null) return null;
    const existing = await this.getFiles();
    if (existing.length > MAX_FILE_COUNT) {
      for (let i = MAX_FILE_COUNT; i < existing.length; i++) {
        const file = existing[i];
        try {
          console.log(`blackbox: Deleting ${file}`);
          await _fs.default.promises.unlink(file);
        } catch (e) {
          console.error(`blackbox: unlink error ${file}, ${e === null || e === void 0 ? void 0 : e.message}`);
        }
      }
    }
    const now = new Date();
    const filenameStamp = now.toLocaleString('en-US', {
      timeZoneName: 'short'
    }).replace(/[^\d\w]/g, '_');
    const filename = `${filenameStamp}-${fileWriteCounter++}-${this.name}.${this.extension}`;
    return _path.default.join(blackboxDirectory, filename);
  }
  async getNewestFile() {
    return (await this.getFiles())[0] ?? null;
  }
}
const minidumpFiles = exports.minidumpFiles = new Files('minidump', 'dmp');
const logFiles = exports.logFiles = new Files('events', 'log');
async function openLog(forcenew) {
  if (forcenew || logfile === undefined) {
    if (logfile != null) {
      try {
        await logfile.close();
      } catch (e) {
        console.error(`blackbox: openLog close error ${e === null || e === void 0 ? void 0 : e.message}`);
      }
    }
    const logpath = forcenew ? await logFiles.getNewFilename() : (await logFiles.getNewestFile()) ?? (await logFiles.getNewFilename());
    if (logpath == null) {
      logfile = null;
      return null;
    }
    logfile = await _fs.default.promises.open(logpath, 'a');
  }
  return logfile;
}
async function addMessage(message) {
  await addMessageSequence(async () => {
    try {
      const log = await openLog(false);
      if (log == null) return;
      const now = new Date().toLocaleString('en-US', {
        timeZoneName: 'short'
      });
      console.log(`blackbox: ${now} ${eventCounter} ${message}`);
      await log.write(`${now} ${eventCounter}: ${message}\n`);
      ++eventCounter;
      await log.sync();
      if ((await log.stat()).size >= MAX_LOG_SIZE) {
        await openLog(true);
      }
    } catch (e) {
      console.error(`blackbox: addMessage error ${e === null || e === void 0 ? void 0 : e.message}`);
    }
  });
}
async function addSentryReport(event) {
  try {
    await addMessage(`Sentry report: ${JSON.stringify(event)}`);
  } catch (e) {
    console.error(`blackbox: addSentryReport error ${e === null || e === void 0 ? void 0 : e.message}`);
  }
}
function initializeRenderer(modulepath) {
  storedModulepath = modulepath;
}
async function initialize(modulepath, buildInfo) {
  try {
    await initializeCore(modulepath, buildInfo);
  } catch (e) {
    console.error(`blackbox: initialize error ${e === null || e === void 0 ? void 0 : e.message}`);
  }
}
async function initializeCore(modulepath, buildInfo) {
  if (initialized) {
    console.error('blackbox: Ignoring double initialization of blackbox.');
    return;
  }
  initializeRenderer(modulepath);
  await addMessage(`\n\n----------------------------------------------`);
  await addMessage(`Discord starting: ${JSON.stringify(buildInfo)}, modulepath: ${modulepath}`);
  function attachWebContentsEvents(webContents) {
    let id = 'unknown';
    let title = '';
    try {
      id = `web${webContents.id}`;
      title = webContents.getTitle() ?? '';
    } catch (e) {
      console.error(`blackbox: attachWebContentsEvents id error ${e === null || e === void 0 ? void 0 : e.message}`);
    }
    void addMessage(`✅ webContents.created ${id} "${title}"`);
    webContents.on('did-finish-load', () => addMessage(`✅ webContents.did-finish-load ${id}`));
    webContents.on('preload-error', (_, _input, error) => addMessage(`❌ webContents.preload-error ${id}: ${error === null || error === void 0 ? void 0 : error.message}`));
    webContents.on('destroyed', () => addMessage(`webContents.destroyed ${id}`));
    webContents.on('unresponsive', () => addMessage(`❌ webContents.nresponsive ${id}`));
    webContents.on('plugin-crashed', (_, name, version) => addMessage(`❌ webContents.plugin-crashed ${id}: ${name} ${version}`));
    webContents.on('did-fail-load', (_, code, desc) => addMessage(`❌ webContents.did-fail-load ${id}" ${code} ${desc}`));
    webContents.on('did-fail-provisional-load', (_, code, desc) => addMessage(`❌ webContents.did-fail-provisional-load ${id}: ${code} ${desc}`));
  }
  _electron.default.app.on('web-contents-created', (_, webContents) => attachWebContentsEvents(webContents));
  for (const webContents of _electron.default.webContents.getAllWebContents()) {
    attachWebContentsEvents(webContents);
  }
  function attachWindowEvents(window) {
    let id = 'unknown';
    let title = '';
    try {
      id = `win${window.id}`;
      title = window.title ?? '';
    } catch (e) {
      console.error(`blackbox: attachWindowEvents id error ${e === null || e === void 0 ? void 0 : e.message}`);
    }
    void addMessage(`✅ window.created ${id} "${title}"`);
    window.on('close', () => addMessage(`window.close ${id}`));
    window.on('closed', () => addMessage(`window.closed ${id}`));
  }
  _electron.default.app.on('browser-window-created', (_, window) => attachWindowEvents(window));
  for (const window of _electron.default.BrowserWindow.getAllWindows()) {
    attachWindowEvents(window);
  }
  _electron.default.app.on('child-process-gone', (_, details) => addMessage(`❌ child-process-gone ${_util.default.inspect(details)}`));
  _electron.default.app.on('render-process-gone', (_, __, details) => {
    void addMessage(`❌ render-process-gone ${_util.default.inspect(details)}`);
    captureMinidumpFromCrashpadSync();
  });
  _electron.default.app.on('before-quit', () => addMessage(`before-quit`));
  _electron.default.app.on('will-quit', () => addMessage(`will-quit`));
  _electron.default.app.on('quit', (_, exitCode) => addMessage(`quit ${exitCode}`));
  initialized = true;
}