Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistedRequestQueue = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@sentry/utils");
const path_1 = require("path");
const fs_1 = require("../fs");
const store_1 = require("../store");
const MILLISECONDS_PER_DAY = 86400000;
/** A request queue that is persisted to disk to survive app restarts */
class PersistedRequestQueue {
    constructor(_queuePath, _maxAgeDays = 30, _maxCount = 30) {
        this._queuePath = _queuePath;
        this._maxAgeDays = _maxAgeDays;
        this._maxCount = _maxCount;
        this._queue = new store_1.BufferedWriteStore(this._queuePath, 'queue', []);
    }
    /** Adds a request to the queue */
    add(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyPath = (0, utils_1.uuid4)();
            let queuedEvents = 0;
            yield this._queue.update((queue) => {
                queue.push({
                    bodyPath,
                    date: request.date || new Date(),
                });
                while (queue.length > this._maxCount) {
                    const removed = queue.shift();
                    if (removed) {
                        void this._removeBody(removed.bodyPath);
                    }
                }
                queuedEvents = queue.length;
                return queue;
            });
            try {
                yield (0, fs_1.writeFileAsync)((0, path_1.join)(this._queuePath, bodyPath), request.body);
            }
            catch (_) {
                //
            }
            return queuedEvents;
        });
    }
    /** Pops the oldest event from the queue */
    pop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let found;
            let pendingCount = 0;
            const cutOff = Date.now() - MILLISECONDS_PER_DAY * this._maxAgeDays;
            yield this._queue.update((queue) => {
                while ((found = queue.shift())) {
                    // We drop events created in v3 of the SDK or before the cut-off
                    if ('type' in found || found.date.getTime() < cutOff) {
                        // we're dropping this event so delete the body
                        void this._removeBody(found.bodyPath);
                        found = undefined;
                    }
                    else {
                        pendingCount = queue.length;
                        break;
                    }
                }
                return queue;
            });
            if (found) {
                try {
                    const body = yield (0, fs_1.readFileAsync)((0, path_1.join)(this._queuePath, found.bodyPath));
                    void this._removeBody(found.bodyPath);
                    return {
                        request: {
                            body,
                            date: found.date || new Date(),
                        },
                        pendingCount,
                    };
                }
                catch (e) {
                    utils_1.logger.warn('Filed to read queued request body', e);
                }
            }
            return undefined;
        });
    }
    /** Removes the body of the request */
    _removeBody(bodyPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, fs_1.unlinkAsync)((0, path_1.join)(this._queuePath, bodyPath));
            }
            catch (_) {
                //
            }
        });
    }
}
exports.PersistedRequestQueue = PersistedRequestQueue;
//# sourceMappingURL=queue.js.map