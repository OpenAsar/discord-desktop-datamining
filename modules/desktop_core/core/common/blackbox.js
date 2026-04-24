"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFiles = exports.minidumpFiles = void 0;
exports.captureMinidumpFromCrashpadSync = captureMinidumpFromCrashpadSync;
exports.addMessage = addMessage;
exports.addSentryReport = addSentryReport;
exports.initializeRenderer = initializeRenderer;
exports.initialize = initialize;
const electron_1 = __importDefault(require("electron"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const utils_1 = require("../common/utils");
const MAX_FILE_COUNT = 10;
const MAX_LOG_SIZE = 200 * 1024;
let fileWriteCounter = 0;
let eventCounter = 0;
let logfile = undefined;
let initialized = false;
let storedModulepath = null;
const addMessageSequence = (0, utils_1.createLock)();
function captureMinidumpFromCrashpadSync() {
    if (storedModulepath == null || process.platform !== 'win32')
        return;
    try {
        const reportsDir = path_1.default.join(electron_1.default.app.getPath('crashDumps'), 'reports');
        let dirContents;
        try {
            dirContents = fs_1.default.readdirSync(reportsDir);
        }
        catch (e) {
            return;
        }
        const dmpFiles = dirContents
            .filter((f) => f.endsWith('.dmp'))
            .map((f) => {
            const fullPath = path_1.default.join(reportsDir, f);
            return { fullPath, mtime: fs_1.default.statSync(fullPath).mtimeMs };
        })
            .sort((a, b) => b.mtime - a.mtime);
        if (dmpFiles.length === 0)
            return;
        if (Date.now() - dmpFiles[0].mtime > 60_000)
            return;
        const crashlogsDir = path_1.default.join(storedModulepath, 'crashlogs');
        if (!fs_1.default.existsSync(crashlogsDir)) {
            fs_1.default.mkdirSync(crashlogsDir, { recursive: true });
        }
        const existingDmps = fs_1.default
            .readdirSync(crashlogsDir)
            .filter((f) => f.endsWith('.dmp'))
            .map((f) => ({ fullPath: path_1.default.join(crashlogsDir, f), mtime: fs_1.default.statSync(path_1.default.join(crashlogsDir, f)).mtimeMs }))
            .sort((a, b) => b.mtime - a.mtime);
        if (existingDmps.length > MAX_FILE_COUNT) {
            for (let i = MAX_FILE_COUNT; i < existingDmps.length; i++) {
                try {
                    fs_1.default.unlinkSync(existingDmps[i].fullPath);
                }
                catch { }
            }
        }
        const filenameStamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' }).replace(/[^\d\w]/g, '_');
        const dmpFilename = `${filenameStamp}-${fileWriteCounter++}-minidump.dmp`;
        const dmpPath = path_1.default.join(crashlogsDir, dmpFilename);
        fs_1.default.writeFileSync(dmpPath, fs_1.default.readFileSync(dmpFiles[0].fullPath));
        fs_1.default.writeFileSync(path_1.default.join(crashlogsDir, 'pending_minidump.txt'), dmpFilename);
        console.log(`blackbox: captured minidump ${dmpFilename} from Crashpad`);
    }
    catch (e) {
        console.error(`blackbox: captureMinidumpFromCrashpadSync error ${e?.message}`);
    }
}
class Files {
    name;
    extension;
    static directory = undefined;
    constructor(name, extension) {
        this.name = name;
        this.extension = extension;
    }
    static getBlackboxDirectory() {
        if (Files.directory === undefined) {
            try {
                Files.directory = Files.getBlackboxDirectoryCore();
            }
            catch (e) {
                console.error(`blackbox: getBlackboxDirectory error ${e?.message}`);
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
        const crashlogsPath = path_1.default.join(storedModulepath, 'crashlogs');
        if (!fs_1.default.existsSync(crashlogsPath)) {
            fs_1.default.mkdirSync(crashlogsPath, { recursive: true });
        }
        if (!fs_1.default.existsSync(crashlogsPath)) {
            console.error(`blackbox: Unable to create crashlogs directory`);
            return null;
        }
        return crashlogsPath;
    }
    static orderFilesNewestFirst(files) {
        return files
            .map((file) => ({
            file,
            time: fs_1.default.statSync(file).mtime.getTime(),
        }))
            .sort((a, b) => b.time - a.time)
            .map((file) => file.file);
    }
    async getFiles() {
        const blackboxDirectory = Files.getBlackboxDirectory();
        if (blackboxDirectory == null)
            return [];
        try {
            const dircontents = await fs_1.default.promises.readdir(blackboxDirectory);
            const existing = dircontents.filter((f) => f.endsWith('.' + this.extension));
            return Files.orderFilesNewestFirst(existing.map((file) => path_1.default.join(blackboxDirectory, file)));
        }
        catch (e) {
            console.error(`blackbox: getFiles error ${e?.message}`);
            return [];
        }
    }
    async getNewFilename() {
        const blackboxDirectory = Files.getBlackboxDirectory();
        if (blackboxDirectory == null)
            return null;
        const existing = await this.getFiles();
        if (existing.length > MAX_FILE_COUNT) {
            for (let i = MAX_FILE_COUNT; i < existing.length; i++) {
                const file = existing[i];
                try {
                    console.log(`blackbox: Deleting ${file}`);
                    await fs_1.default.promises.unlink(file);
                }
                catch (e) {
                    console.error(`blackbox: unlink error ${file}, ${e?.message}`);
                }
            }
        }
        const now = new Date();
        const filenameStamp = now.toLocaleString('en-US', { timeZoneName: 'short' }).replace(/[^\d\w]/g, '_');
        const filename = `${filenameStamp}-${fileWriteCounter++}-${this.name}.${this.extension}`;
        return path_1.default.join(blackboxDirectory, filename);
    }
    async getNewestFile() {
        return (await this.getFiles())[0] ?? null;
    }
}
exports.minidumpFiles = new Files('minidump', 'dmp');
exports.logFiles = new Files('events', 'log');
async function openLog(forcenew) {
    if (forcenew || logfile === undefined) {
        if (logfile != null) {
            try {
                await logfile.close();
            }
            catch (e) {
                console.error(`blackbox: openLog close error ${e?.message}`);
            }
        }
        const logpath = forcenew
            ? await exports.logFiles.getNewFilename()
            : ((await exports.logFiles.getNewestFile()) ?? (await exports.logFiles.getNewFilename()));
        if (logpath == null) {
            logfile = null;
            return null;
        }
        logfile = await fs_1.default.promises.open(logpath, 'a');
    }
    return logfile;
}
async function addMessage(message) {
    await addMessageSequence(async () => {
        try {
            const log = await openLog(false);
            if (log == null)
                return;
            const now = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
            console.log(`blackbox: ${now} ${eventCounter} ${message}`);
            await log.write(`${now} ${eventCounter}: ${message}\n`);
            ++eventCounter;
            await log.sync();
            if ((await log.stat()).size >= MAX_LOG_SIZE) {
                await openLog(true);
            }
        }
        catch (e) {
            console.error(`blackbox: addMessage error ${e?.message}`);
        }
    });
}
async function addSentryReport(event) {
    try {
        await addMessage(`Sentry report: ${JSON.stringify(event)}`);
    }
    catch (e) {
        console.error(`blackbox: addSentryReport error ${e?.message}`);
    }
}
function initializeRenderer(modulepath) {
    storedModulepath = modulepath;
}
async function initialize(modulepath, buildInfo) {
    try {
        await initializeCore(modulepath, buildInfo);
    }
    catch (e) {
        console.error(`blackbox: initialize error ${e?.message}`);
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
        }
        catch (e) {
            console.error(`blackbox: attachWebContentsEvents id error ${e?.message}`);
        }
        void addMessage(`✅ webContents.created ${id} "${title}"`);
        webContents.on('did-finish-load', () => addMessage(`✅ webContents.did-finish-load ${id}`));
        webContents.on('preload-error', (_, _input, error) => addMessage(`❌ webContents.preload-error ${id}: ${error?.message}`));
        webContents.on('destroyed', () => addMessage(`webContents.destroyed ${id}`));
        webContents.on('unresponsive', () => addMessage(`❌ webContents.nresponsive ${id}`));
        webContents.on('plugin-crashed', (_, name, version) => addMessage(`❌ webContents.plugin-crashed ${id}: ${name} ${version}`));
        webContents.on('did-fail-load', (_, code, desc) => addMessage(`❌ webContents.did-fail-load ${id}" ${code} ${desc}`));
        webContents.on('did-fail-provisional-load', (_, code, desc) => addMessage(`❌ webContents.did-fail-provisional-load ${id}: ${code} ${desc}`));
    }
    electron_1.default.app.on('web-contents-created', (_, webContents) => attachWebContentsEvents(webContents));
    for (const webContents of electron_1.default.webContents.getAllWebContents()) {
        attachWebContentsEvents(webContents);
    }
    function attachWindowEvents(window) {
        let id = 'unknown';
        let title = '';
        try {
            id = `win${window.id}`;
            title = window.title ?? '';
        }
        catch (e) {
            console.error(`blackbox: attachWindowEvents id error ${e?.message}`);
        }
        void addMessage(`✅ window.created ${id} "${title}"`);
        window.on('close', () => addMessage(`window.close ${id}`));
        window.on('closed', () => addMessage(`window.closed ${id}`));
    }
    electron_1.default.app.on('browser-window-created', (_, window) => attachWindowEvents(window));
    for (const window of electron_1.default.BrowserWindow.getAllWindows()) {
        attachWindowEvents(window);
    }
    electron_1.default.app.on('child-process-gone', (_, details) => addMessage(`❌ child-process-gone ${util_1.default.inspect(details)}`));
    electron_1.default.app.on('render-process-gone', (_, __, details) => {
        void addMessage(`❌ render-process-gone ${util_1.default.inspect(details)}`);
        captureMinidumpFromCrashpadSync();
    });
    electron_1.default.app.on('before-quit', () => addMessage(`before-quit`));
    electron_1.default.app.on('will-quit', () => addMessage(`will-quit`));
    electron_1.default.app.on('quit', (_, exitCode) => addMessage(`quit ${exitCode}`));
    initialized = true;
}
