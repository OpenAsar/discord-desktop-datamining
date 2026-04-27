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
exports.OPENH264_LIBRARY_FILE_NAME = exports.join = exports.dirname = exports.basename = exports.extname = void 0;
exports.saveWithDialog = saveWithDialog;
exports.saveWithDialog2 = saveWithDialog2;
exports.showOpenDialog = showOpenDialog;
exports.maybeDownloadMLModelFile = maybeDownloadMLModelFile;
exports.stopMLModelDownloads = stopMLModelDownloads;
exports.checkMLModelFilesExist = checkMLModelFilesExist;
exports.cleanupUnusedMLModelFiles = cleanupUnusedMLModelFiles;
exports.maybeDownloadClipsFile = maybeDownloadClipsFile;
exports.stopClipsDownloads = stopClipsDownloads;
exports.checkClipsFilesExist = checkClipsFilesExist;
exports.cleanupUnusedClipsFiles = cleanupUnusedClipsFiles;
exports.maybeDownloadOpenH264 = maybeDownloadOpenH264;
exports.cleanupUnusedOpenH264Files = cleanupUnusedOpenH264Files;
exports.getAndCreateLogDirectorySync = getAndCreateLogDirectorySync;
exports.logLevelSync = logLevelSync;
exports.readLogFiles = readLogFiles;
exports.combineWebRtcLogs = combineWebRtcLogs;
exports.uploadDiscordHookCrashes = uploadDiscordHookCrashes;
exports.showItemInFolder = showItemInFolder;
exports.openFiles = openFiles;
exports.getMLDataDir = getMLDataDir;
exports.getMLDataDirSync = getMLDataDirSync;
exports.getClipsDataDir = getClipsDataDir;
exports.getClipsDataDirSync = getClipsDataDirSync;
exports.getOpenH264Dir = getOpenH264Dir;
exports.getOpenH264LibraryPathSync = getOpenH264LibraryPathSync;
exports.getModulePath = getModulePath;
exports.getModuleDataPathSync = getModuleDataPathSync;
exports.getLogPath = getLogPath;
exports.getLogPathSync = getLogPathSync;
exports.getAssetCachePath = getAssetCachePath;
exports.getAssetCachePathSync = getAssetCachePathSync;
const unbzip2_stream_1 = __importDefault(require("@openpgp/unbzip2-stream"));
const fs_1 = __importDefault(require("fs"));
const node_downloader_helper_1 = require("node-downloader-helper");
const node_crypto_1 = require("node:crypto");
const promises_1 = require("node:fs/promises");
const node_stream_1 = require("node:stream");
const promises_2 = require("node:stream/promises");
const path_1 = __importDefault(require("path"));
const blackbox = __importStar(require("../../../common/blackbox"));
const utils_1 = require("../../../common/utils");
const DiscordIPC_1 = require("../common/DiscordIPC");
const fileutils_1 = require("../common/fileutils");
const paths_1 = require("../common/paths");
const crashReporter_1 = require("./crashReporter");
const endpoints_1 = __importDefault(require("./endpoints"));
const files_1 = require("./files");
const minidump_1 = require("./minidump");
const Settings = __importStar(require("./settings"));
var path_2 = require("path");
Object.defineProperty(exports, "extname", { enumerable: true, get: function () { return path_2.extname; } });
Object.defineProperty(exports, "basename", { enumerable: true, get: function () { return path_2.basename; } });
Object.defineProperty(exports, "dirname", { enumerable: true, get: function () { return path_2.dirname; } });
Object.defineProperty(exports, "join", { enumerable: true, get: function () { return path_2.join; } });
const uploadHookCrashSequence = (0, utils_1.createLock)();
const combineWebRtcLogsSequence = (0, utils_1.createLock)();
async function saveWithDialog(fileContents, fileName, defaultDirectory) {
    const result = await saveWithDialog2(fileContents, fileName, defaultDirectory, true);
    return result?.directory ?? null;
}
async function saveWithDialog2(fileContents, fileName, defaultDirectory, throwOnCancel = false) {
    if ((0, files_1.containsInvalidFileChar)(fileName)) {
        throw new Error('fileName has invalid characters');
    }
    const defaultPath = defaultDirectory != null && defaultDirectory !== '' ? defaultDirectory : await (0, paths_1.getPath)('downloads');
    const options = {
        defaultPath: path_1.default.join(defaultPath, fileName),
    };
    const extension = path_1.default.extname(fileName);
    if (extension != null && extension !== '' && extension !== '.') {
        const trimmedExtension = extension.slice(1);
        options.filters = [
            { name: trimmedExtension, extensions: [trimmedExtension] },
            { name: 'All', extensions: ['*'] },
        ];
    }
    const results = await DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.FILE_MANAGER_SHOW_SAVE_DIALOG, options);
    if (results == null || results.filePath == null) {
        return null;
    }
    if (results.canceled || results.filePath === '') {
        if (throwOnCancel) {
            throw new Error('Save dialog was canceled by user');
        }
        return {
            canceledByUser: true,
            filePath: '',
            directory: '',
        };
    }
    fs_1.default.writeFileSync(results.filePath, fileContents);
    return {
        canceledByUser: false,
        filePath: results.filePath,
        directory: path_1.default.dirname(results.filePath),
    };
}
async function showOpenDialog({ filters, properties }) {
    const results = await DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.FILE_MANAGER_SHOW_OPEN_DIALOG, { filters, properties });
    return results.filePaths;
}
async function maybeDownloadAsset(cdnURL, fileName, category, onProgress) {
    const { destination, downloaders } = category;
    if ((0, files_1.containsInvalidFileChar)(fileName)) {
        throw new Error(category.name + ' fileName has invalid characters');
    }
    if (!Boolean(fileName)) {
        throw new Error(category.name + ' fileName is not set');
    }
    try {
        await (0, promises_1.mkdir)(destination, { recursive: true });
    }
    catch (cause) {
        throw new Error(category.name + ' unable create data dir', { cause });
    }
    const finishedFilePath = path_1.default.join(destination, fileName);
    try {
        await fs_1.default.promises.access(finishedFilePath);
        return { fetchedFromNetwork: false };
    }
    catch {
    }
    const partialFileName = `${fileName}.partial`;
    const partialFilePath = path_1.default.join(destination, partialFileName);
    const dl = new node_downloader_helper_1.DownloaderHelper(cdnURL, destination, {
        method: 'GET',
        resumeOnIncomplete: true,
        resumeOnIncompleteMaxRetry: 5,
        resumeIfFileExists: true,
        fileName: partialFileName,
        retry: { maxRetries: 3, delay: 1000 },
        removeOnStop: false,
        removeOnFail: false,
        progressThrottle: 200,
    });
    downloaders.push(new WeakRef(dl));
    return new Promise((resolve, reject) => {
        dl.on('end', ({ incomplete }) => {
            if (incomplete) {
                reject(new Error(category.name + ' download incomplete'));
            }
            else {
                (0, promises_1.rename)(partialFilePath, finishedFilePath)
                    .then(() => resolve({ fetchedFromNetwork: true }))
                    .catch(reject);
            }
        });
        dl.on('skip', (_stats) => {
            (0, promises_1.rename)(partialFilePath, finishedFilePath)
                .then(() => resolve({ fetchedFromNetwork: false }))
                .catch(reject);
        });
        dl.on('progress.throttled', ({ downloaded: downloadedBytes, total: totalBytes }) => {
            onProgress({ downloadedBytes, totalBytes });
        });
        dl.on('timeout', () => reject(new Error(category.name + ' timeout')));
        dl.on('error', reject);
        dl.on('stop', () => reject({ USER_CANCELED_DOWNLOAD: true }));
        dl.start().catch(reject);
    });
}
async function cleanupUnusedAssets(neededFileNames, assetPath, category) {
    const deletedFiles = [];
    const errors = [];
    try {
        try {
            await fs_1.default.promises.access(assetPath);
        }
        catch {
            return { deletedFiles, errors };
        }
        const existingFiles = await fs_1.default.promises.readdir(assetPath);
        const neededFileSet = new Set(neededFileNames);
        const neededPartialFileSet = new Set(neededFileNames.map((fileName) => `${fileName}.partial`));
        for (const fileName of existingFiles) {
            if (neededFileSet.has(fileName)) {
                continue;
            }
            if (fileName.endsWith('.partial')) {
                if (neededPartialFileSet.has(fileName)) {
                    continue;
                }
            }
            else {
                if (fileName.startsWith('.') || !fileName.includes('.')) {
                    continue;
                }
            }
            const fullPath = path_1.default.join(assetPath, fileName);
            try {
                await fs_1.default.promises.unlink(fullPath);
                deletedFiles.push(fileName);
                console.log(`${category} cleanup: Deleted unused file "${fileName}"`);
            }
            catch (error) {
                const errorMsg = `Failed to delete "${fileName}": ${error}`;
                errors.push(errorMsg);
                console.error(`${category} cleanup: ${errorMsg}`);
            }
        }
        if (deletedFiles.length > 0) {
            console.log(`${category} cleanup: Deleted ${deletedFiles.length} unused files`);
        }
    }
    catch (cause) {
        const errorMsg = `${category} cleanup failed: ${cause}`;
        errors.push(errorMsg);
        console.error(errorMsg);
    }
    return { deletedFiles, errors };
}
const mlModelDownloaders = [];
async function maybeDownloadMLModelFile(cdnURL, fileName, onProgress) {
    if (!cdnURL.startsWith('https://cdn.discordapp.com/assets/content')) {
        throw new Error('ML Models invalid CDN URL');
    }
    let mlModelsDataPath;
    try {
        mlModelsDataPath = await getMLDataDir();
    }
    catch (cause) {
        throw new Error('ML Models unable to get path of data dir', { cause });
    }
    return maybeDownloadAsset(cdnURL, fileName, { name: 'ML Models', destination: mlModelsDataPath, downloaders: mlModelDownloaders }, onProgress);
}
function stopMLModelDownloads() {
    while (mlModelDownloaders.length > 0) {
        const dl = mlModelDownloaders.pop()?.deref();
        void dl?.stop();
    }
}
async function checkMLModelFilesExist(files) {
    let mlModelsDataPath;
    try {
        mlModelsDataPath = getMLDataDirSync();
    }
    catch (cause) {
        throw new Error('ML Models unable to get path of data dir', { cause });
    }
    const results = await Promise.all(files.map(async (file) => {
        const fullPath = path_1.default.join(mlModelsDataPath, file.fileName);
        try {
            await fs_1.default.promises.access(fullPath);
            return { ...file, exists: true };
        }
        catch (error) {
            return { ...file, exists: false };
        }
    }));
    return results;
}
async function cleanupUnusedMLModelFiles(neededFileNames) {
    let mlModelsDataPath;
    try {
        mlModelsDataPath = await getMLDataDir();
    }
    catch (cause) {
        const errorMsg = `ML Models cleanup failed: ${cause}`;
        console.error(errorMsg);
        return { deletedFiles: [], errors: [errorMsg] };
    }
    return cleanupUnusedAssets(neededFileNames, mlModelsDataPath, 'ML Models');
}
const clipsDownloaders = [];
async function maybeDownloadClipsFile(cdnURL, fileName, onProgress) {
    if (!cdnURL.startsWith('https://cdn.discordapp.com/assets/content/')) {
        throw new Error('Clips invalid CDN URL');
    }
    let clipsDataPath;
    try {
        clipsDataPath = await getClipsDataDir();
    }
    catch (cause) {
        throw new Error('Clips unable to get path of data dir', { cause });
    }
    return maybeDownloadAsset(cdnURL, fileName, { name: 'Clips', destination: clipsDataPath, downloaders: clipsDownloaders }, onProgress);
}
function stopClipsDownloads() {
    while (clipsDownloaders.length > 0) {
        const dl = clipsDownloaders.pop()?.deref();
        void dl?.stop();
    }
}
async function checkClipsFilesExist(files) {
    let clipsDataPath;
    try {
        clipsDataPath = getClipsDataDirSync();
    }
    catch (cause) {
        throw new Error('Clips unable to get path of data dir', { cause });
    }
    const results = await Promise.all(files.map(async (file) => {
        const fullPath = path_1.default.join(clipsDataPath, file.fileName);
        try {
            await fs_1.default.promises.access(fullPath);
            return { ...file, exists: true };
        }
        catch (error) {
            return { ...file, exists: false };
        }
    }));
    return results;
}
async function cleanupUnusedClipsFiles(neededFileNames) {
    let clipsDataPath;
    try {
        clipsDataPath = await getClipsDataDir();
    }
    catch (cause) {
        const errorMsg = `Clips cleanup failed: ${cause}`;
        console.error(errorMsg);
        return { deletedFiles: [], errors: [errorMsg] };
    }
    return cleanupUnusedAssets(neededFileNames, clipsDataPath, 'Clips');
}
async function maybeDownloadOpenH264(cdnURL, fileName, sha256, onProgress) {
    if (!cdnURL.startsWith('https://ciscobinary.openh264.org/')) {
        throw new Error('OpenH264 invalid CDN URL');
    }
    if (!cdnURL.endsWith('.bz2')) {
        throw new Error('OpenH264 CDN URL must point to a bzip2 archive');
    }
    let openH264Path;
    try {
        openH264Path = await getOpenH264Dir();
    }
    catch (cause) {
        throw new Error('Unable to get OpenH264 path', { cause });
    }
    const filePath = path_1.default.join(openH264Path, fileName);
    try {
        await fs_1.default.promises.access(filePath);
        return { fetchedFromNetwork: false };
    }
    catch {
    }
    const archiveName = fileName + '.bz2';
    const result = await maybeDownloadAsset(cdnURL, archiveName, { name: 'OpenH264', destination: openH264Path, downloaders: [] }, onProgress);
    const archivePath = openH264Path + '/' + archiveName;
    const stream = (0, unbzip2_stream_1.default)(node_stream_1.Readable.toWeb(fs_1.default.createReadStream(archivePath)));
    const hash = (0, node_crypto_1.createHash)('sha256');
    try {
        await (0, promises_2.pipeline)(stream, async function* (source) {
            for await (const chunk of source) {
                hash.update(chunk);
                yield chunk;
            }
        }, fs_1.default.createWriteStream(filePath));
    }
    catch (cause) {
        try {
            await cleanupUnusedOpenH264Files([]);
        }
        catch (e) {
            console.warn('Removing bad OpenH264 download failed', e);
        }
        throw new Error('OpenH264 unbzip2 failed', { cause });
    }
    const calcSha = hash.digest('hex');
    if (calcSha !== sha256) {
        try {
            await cleanupUnusedOpenH264Files([]);
        }
        catch (e) {
            console.warn('Removing bad OpenH264 download failed', e);
        }
        throw new Error('OpenH264 Expected sha256 ' + sha256 + ', but got ' + calcSha);
    }
    return result;
}
async function cleanupUnusedOpenH264Files(neededFileNames) {
    let openH264Path;
    try {
        openH264Path = await getOpenH264Dir();
    }
    catch (cause) {
        const errorMsg = `OpenH264 cleanup failed: ${cause}`;
        console.error(errorMsg);
        return { deletedFiles: [], errors: [errorMsg] };
    }
    return cleanupUnusedAssets(neededFileNames, openH264Path, 'OpenH264');
}
function getAndCreateLogDirectorySync() {
    let logDir = null;
    try {
        logDir = getLogPathSync();
    }
    catch (e) {
        console.error('Failed to get log directory: ', e);
    }
    if (logDir != null) {
        try {
            fs_1.default.mkdirSync(logDir, { recursive: true });
        }
        catch (e) {
            console.warn('Could not create module log directory ', logDir, ':', e);
        }
    }
    return logDir;
}
function logLevelSync() {
    return Settings.getSync('LOG_LEVEL', 'info');
}
async function readLogFiles(maxSize) {
    await combineWebRtcLogs('discord-webrtc_0', 'discord-webrtc_1', 'discord-webrtc');
    await combineWebRtcLogs('discord-last-webrtc_0', 'discord-last-webrtc_1', 'discord-last-webrtc');
    const modulePath = await getModulePath();
    const voicePath = path_1.default.join(modulePath, 'discord_voice');
    const utilsPath = path_1.default.join(modulePath, 'discord_utils');
    const filesToUpload = [path_1.default.join(voicePath, 'audio_state.json'), path_1.default.join(utilsPath, 'live_minidump.dmp')];
    const logPath = await getLogPath();
    const filenames = await (0, promises_1.readdir)(logPath);
    const validLogFiles = filenames
        .filter((filename) => filename.endsWith('.log'))
        .map((filename) => path_1.default.join(logPath, filename));
    filesToUpload.push(...validLogFiles);
    const voiceLogFiles = ['discord-webrtc', 'discord-last-webrtc']
        .map((filename) => path_1.default.join(logPath, filename))
        .filter((filename) => fs_1.default.existsSync(filename));
    filesToUpload.push(...voiceLogFiles);
    blackbox.initializeRenderer(modulePath);
    const minidump = await blackbox.minidumpFiles.getNewestFile();
    if (minidump != null) {
        filesToUpload.push(minidump);
    }
    const blackboxLog = await blackbox.logFiles.getNewestFile();
    if (blackboxLog != null) {
        filesToUpload.push(blackboxLog);
    }
    const updaterLogs = await (0, paths_1.getUpdaterLogs)();
    if (updaterLogs.length > 0) {
        filesToUpload.push(updaterLogs[0]);
    }
    const systemServiceLogs = await (0, paths_1.getSystemServiceLogs)();
    if (systemServiceLogs.length > 0) {
        filesToUpload.push(systemServiceLogs[0]);
    }
    const squirrelLogs = await (0, paths_1.getSquirrelLogs)();
    if (squirrelLogs.length > 0) {
        filesToUpload.push(...squirrelLogs);
    }
    const crashFiles = await (0, paths_1.getCrashFiles)();
    if (crashFiles.length > 0) {
        filesToUpload.push(crashFiles[0]);
    }
    return (0, fileutils_1.readFulfilledFiles)(filesToUpload, maxSize, false, (filename) => (0, files_1.isMinidumpFile)(filename));
}
async function combineWebRtcLogs(path1, path2, destinationPath) {
    const logPath = await getLogPath();
    const webRtcFile1 = path_1.default.join(logPath, path1);
    const webRtcFile2 = path_1.default.join(logPath, path2);
    const combinedFilePath = path_1.default.join(logPath, destinationPath);
    await combineWebRtcLogsSequence(async () => {
        try {
            const [file1Data, file2Data] = await Promise.all([
                fs_1.default.promises.readFile(webRtcFile1).catch((_) => null),
                fs_1.default.promises.readFile(webRtcFile2).catch((_) => null),
            ]);
            if (file1Data !== null && file2Data === null) {
                await fs_1.default.promises.writeFile(combinedFilePath, file1Data);
            }
            else if (file1Data === null && file2Data !== null) {
                await fs_1.default.promises.writeFile(combinedFilePath, file2Data);
            }
            else if (file1Data !== null && file2Data !== null) {
                const webRtcFile1Stats = await fs_1.default.promises.stat(webRtcFile1);
                const webRtcFile2Stats = await fs_1.default.promises.stat(webRtcFile2);
                if (webRtcFile1Stats.mtimeMs > webRtcFile2Stats.mtimeMs) {
                    await fs_1.default.promises.writeFile(combinedFilePath, Buffer.concat([file2Data, file1Data]));
                }
                else {
                    await fs_1.default.promises.writeFile(combinedFilePath, Buffer.concat([file1Data, file2Data]));
                }
            }
        }
        catch (e) {
            console.error(`combineWebRtcLogs: Failed ${e?.message}`, e);
        }
    });
}
async function uploadHookMinidumpFile(filename, fullpath, metadata) {
    const maxFileSize = 10 * 1024 * 1024;
    const file = (await (0, fileutils_1.readFulfilledFiles)([fullpath], maxFileSize, true))[0];
    const blob = new Blob([file.data], { type: 'text/plain' });
    const minidump = await (0, minidump_1.readMinidump)(fullpath);
    const formData = new FormData();
    for (const key of Object.keys(metadata)) {
        formData.append(key, String(metadata[key]));
    }
    formData.append('sentry[tags][game]', minidump?.processName ?? 'Unknown');
    formData.append('game', minidump?.processName ?? 'Unknown');
    formData.append('upload_file_minidump', blob, filename);
    const response = await fetch(endpoints_1.default.HOOK_MINIDUMP_SENTRY, {
        method: 'POST',
        body: formData,
    });
    return { response, minidump };
}
async function uploadDiscordHookCrashes() {
    const metadata = (0, crashReporter_1.getFlattenedMetadata)();
    let crashCount = 0;
    const minidumps = [];
    await uploadHookCrashSequence(async () => {
        try {
            const modulePath = await getModulePath();
            const hookPath = path_1.default.join(modulePath, 'discord_hook');
            for (const filename of await fs_1.default.promises.readdir(hookPath)) {
                if (!(0, files_1.isHookMinidumpFile)(filename)) {
                    continue;
                }
                ++crashCount;
                const fullpath = path_1.default.join(hookPath, filename);
                try {
                    console.log(`uploadDiscordHookCrashes: Uploading "${fullpath}".`);
                    const uploadResult = await uploadHookMinidumpFile(filename, fullpath, metadata);
                    console.log(`uploadDiscordHookCrashes: Uploaded "${uploadResult.response?.status}".`);
                    if (uploadResult.minidump != null) {
                        minidumps.push(uploadResult.minidump);
                    }
                }
                catch (e) {
                    console.error(`uploadDiscordHookCrashes: uploadHookMinidumpFile failed ${fullpath}: ${e}`);
                }
                console.log(`uploadDiscordHookCrashes: Deleting.`);
                try {
                    await fs_1.default.promises.unlink(fullpath);
                }
                catch (e) {
                    console.error(`uploadDiscordHookCrashes: unlink failed ${fullpath}: ${e}`);
                }
            }
        }
        catch (e) {
            console.error(`uploadDiscordHookCrashes: Failed ${e}`);
        }
        if (crashCount === 0) {
            console.log(`uploadDiscordHookCrashes: No crash reports found.`);
        }
    });
    return minidumps;
}
function showItemInFolder(path) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.FILE_MANAGER_SHOW_ITEM_IN_FOLDER, path);
}
async function openFiles(dialogOptions, maxSize) {
    const filenames = await showOpenDialog(dialogOptions);
    return (0, fileutils_1.readFulfilledFiles)(filenames, maxSize, true);
}
async function getMLDataDir() {
    const assetCachePath = await getAssetCachePath();
    return path_1.default.join(assetCachePath, 'ml');
}
function getMLDataDirSync() {
    return path_1.default.join(getAssetCachePathSync(), 'ml');
}
async function getClipsDataDir() {
    const assetCachePath = await getAssetCachePath();
    return path_1.default.join(assetCachePath, 'clips');
}
function getClipsDataDirSync() {
    return path_1.default.join(getAssetCachePathSync(), 'clips');
}
async function getOpenH264Dir() {
    const assetCachePath = await getAssetCachePath();
    return path_1.default.join(assetCachePath, 'openh264');
}
exports.OPENH264_LIBRARY_FILE_NAME = 'libopenh264-2.5.1-linux64.7.so';
function getOpenH264LibraryPathSync() {
    return path_1.default.join(getAssetCachePathSync(), 'openh264', exports.OPENH264_LIBRARY_FILE_NAME);
}
function getModulePath() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_PATH);
}
function getModuleDataPathSync() {
    return DiscordIPC_1.DiscordIPC.renderer.sendSync(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_DATA_PATH_SYNC);
}
function getLogPath() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_LOG_PATH);
}
function getLogPathSync() {
    return DiscordIPC_1.DiscordIPC.renderer.sendSync(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_LOG_PATH_SYNC);
}
function getAssetCachePath() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_ASSET_CACHE_PATH);
}
function getAssetCachePathSync() {
    return DiscordIPC_1.DiscordIPC.renderer.sendSync(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_ASSET_CACHE_PATH_SYNC);
}
