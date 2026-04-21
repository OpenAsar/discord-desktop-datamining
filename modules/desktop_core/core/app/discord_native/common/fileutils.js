"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = exports.dirname = exports.basename = exports.extname = void 0;
exports.readFulfilledFiles = readFulfilledFiles;
exports.readFiles = readFiles;
exports.ensureDirectoryExists = ensureDirectoryExists;
exports.getFilesnamesFromDirectory = getFilesnamesFromDirectory;
exports.deleteFile = deleteFile;
exports.readExactly = readExactly;
const buffer_1 = __importDefault(require("buffer"));
const original_fs_1 = __importDefault(require("original-fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const zlib_1 = require("zlib");
var path_2 = require("path");
Object.defineProperty(exports, "extname", { enumerable: true, get: function () { return path_2.extname; } });
Object.defineProperty(exports, "basename", { enumerable: true, get: function () { return path_2.basename; } });
Object.defineProperty(exports, "dirname", { enumerable: true, get: function () { return path_2.dirname; } });
Object.defineProperty(exports, "join", { enumerable: true, get: function () { return path_2.join; } });
const MAX_LENGTH = buffer_1.default.constants.MAX_LENGTH;
const promiseFs = {
    readdir: util_1.default.promisify(original_fs_1.default.readdir),
    open: util_1.default.promisify(original_fs_1.default.open),
    fstat: util_1.default.promisify(original_fs_1.default.fstat),
    stat: util_1.default.promisify(original_fs_1.default.stat),
    unlink: util_1.default.promisify(original_fs_1.default.unlink),
    read: util_1.default.promisify(original_fs_1.default.read),
    readFile: util_1.default.promisify(original_fs_1.default.readFile),
    close: util_1.default.promisify(original_fs_1.default.close),
    mkdir: util_1.default.promisify(original_fs_1.default.mkdir),
};
const promiseZlib = {
    gzip: util_1.default.promisify(zlib_1.gzip),
};
async function readFulfilledFiles(filepaths, maxSize, orException, shouldGzip) {
    const files = await readFiles(filepaths, maxSize, shouldGzip);
    if (orException) {
        files.forEach((result) => {
            if (result.status === 'rejected') {
                throw result.reason;
            }
        });
    }
    return files
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);
}
function readFiles(filepaths, dataMaxSize, shouldGzip) {
    dataMaxSize = Math.min(dataMaxSize, MAX_LENGTH);
    return Promise.allSettled(filepaths.map(async (filepath) => {
        const handle = await promiseFs.open(filepath, 'r');
        try {
            let finalFilename = path_1.default.basename(filepath);
            const willGzip = shouldGzip != null && shouldGzip(finalFilename);
            const fileMaxSize = willGzip ? dataMaxSize * 10 : dataMaxSize;
            const stats = await promiseFs.fstat(handle);
            const resultError = {
                code: 'ETOOLARGE',
                message: 'upload too large',
                filesize: stats.size,
                maxSize: dataMaxSize,
            };
            if (stats.size > fileMaxSize) {
                throw resultError;
            }
            const buffer = new Uint8Array(stats.size);
            const data = await promiseFs.read(handle, buffer, 0, stats.size, 0);
            let finalData = new Uint8Array(data.buffer.slice(0, data.bytesRead));
            if (willGzip) {
                try {
                    finalData = new Uint8Array(await promiseZlib.gzip(finalData));
                    finalFilename = finalFilename + '.gz';
                    if (finalData.byteLength > dataMaxSize) {
                        throw resultError;
                    }
                }
                catch (e) {
                    console.error(`Failed to gzip ${finalFilename}`, e);
                }
            }
            return {
                data: finalData,
                filename: finalFilename,
            };
        }
        finally {
            void promiseFs.close(handle);
        }
    }));
}
function ensureDirectoryExists(path) {
    return promiseFs.mkdir(path, { recursive: true });
}
function getFilesnamesFromDirectory(path) {
    return promiseFs.readdir(path);
}
function deleteFile(filename) {
    return promiseFs.unlink(filename);
}
async function readExactly({ handle, buffer, position, length, }) {
    let bytesRead = 0;
    if (length == null)
        length = buffer.byteLength;
    while (bytesRead < length) {
        const result = await handle.read(buffer, bytesRead, length - bytesRead, position + bytesRead);
        if (result.bytesRead === 0) {
            throw new Error('Unexpected end of file');
        }
        bytesRead += result.bytesRead;
    }
}
