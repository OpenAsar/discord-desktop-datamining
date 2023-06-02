Object.defineProperty(exports, "__esModule", { value: true });
exports.Screenshots = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@sentry/core");
const utils_1 = require("@sentry/utils");
const electron_1 = require("electron");
const electron_normalize_1 = require("../electron-normalize");
/** Adds Screenshots to events */
class Screenshots {
    constructor() {
        /** @inheritDoc */
        this.name = Screenshots.id;
    }
    /** @inheritDoc */
    setupOnce(addGlobalEventProcessor) {
        var _a;
        const attachScreenshot = !!((_a = (0, core_1.getCurrentHub)().getClient()) === null || _a === void 0 ? void 0 : _a.getOptions()).attachScreenshot;
        if (attachScreenshot) {
            addGlobalEventProcessor((event, hint) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                // We don't capture screenshots for transactions or native crashes
                if (!event.transaction && event.platform !== 'native') {
                    let count = 1;
                    for (const window of electron_1.BrowserWindow.getAllWindows()) {
                        if (!hint.attachments) {
                            hint.attachments = [];
                        }
                        try {
                            if (!window.isDestroyed() && window.isVisible()) {
                                const filename = count === 1 ? 'screenshot.png' : `screenshot-${count}.png`;
                                const image = yield (0, electron_normalize_1.capturePage)(window);
                                hint.attachments.push({ filename, data: image.toPNG(), contentType: 'image/png' });
                                count += 1;
                            }
                        }
                        catch (e) {
                            // Catch all errors so we don't break event submission if something goes wrong
                            utils_1.logger.error('Error capturing screenshot', e);
                        }
                    }
                }
                return event;
            }));
        }
    }
}
exports.Screenshots = Screenshots;
/** @inheritDoc */
Screenshots.id = 'Screenshots';
//# sourceMappingURL=screenshots.js.map