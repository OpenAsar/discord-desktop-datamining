Object.defineProperty(exports, "__esModule", { value: true });
exports.mkdirp = exports.renameAsync = exports.readDirAsync = exports.unlinkAsync = exports.statAsync = exports.mkdirAsync = exports.readFileAsync = exports.writeFileAsync = exports.sentryCachePath = void 0;
const tslib_1 = require("tslib");
const electron_1 = require("electron");
const fs_1 = require("fs");
const path_1 = require("path");
const util_1 = require("util");
exports.sentryCachePath = (0, path_1.join)(electron_1.app.getPath('userData'), 'sentry');
exports.writeFileAsync = (0, util_1.promisify)(fs_1.writeFile);
exports.readFileAsync = (0, util_1.promisify)(fs_1.readFile);
exports.mkdirAsync = (0, util_1.promisify)(fs_1.mkdir);
exports.statAsync = (0, util_1.promisify)(fs_1.stat);
exports.unlinkAsync = (0, util_1.promisify)(fs_1.unlink);
exports.readDirAsync = (0, util_1.promisify)(fs_1.readdir);
exports.renameAsync = (0, util_1.promisify)(fs_1.rename);
// mkdir with recursive was only added in Node 10+
/**
 * Recursively creates the given path.
 *
 * @param path A relative or absolute path to create.
 * @returns A Promise that resolves when the path has been created.
 */
function mkdirp(path) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line no-bitwise
        const realPath = (0, path_1.resolve)(path);
        try {
            yield (0, exports.mkdirAsync)(realPath, 0o777);
        }
        catch (err) {
            const error = err;
            if (error && error.code === 'ENOENT') {
                yield mkdirp((0, path_1.dirname)(realPath));
                yield (0, exports.mkdirAsync)(realPath, 0o777);
            }
            try {
                if (!(0, fs_1.statSync)(realPath).isDirectory()) {
                    throw err;
                }
            }
            catch (_) {
                throw err;
            }
        }
    });
}
exports.mkdirp = mkdirp;
//# sourceMappingURL=fs.js.map