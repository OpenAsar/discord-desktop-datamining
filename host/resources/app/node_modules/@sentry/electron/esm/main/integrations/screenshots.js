import { __awaiter } from "tslib";
import { getCurrentHub } from '@sentry/core';
import { logger } from '@sentry/utils';
import { BrowserWindow } from 'electron';
import { capturePage } from '../electron-normalize';
/** Adds Screenshots to events */
export class Screenshots {
    constructor() {
        /** @inheritDoc */
        this.name = Screenshots.id;
    }
    /** @inheritDoc */
    setupOnce(addGlobalEventProcessor) {
        var _a;
        const attachScreenshot = !!((_a = getCurrentHub().getClient()) === null || _a === void 0 ? void 0 : _a.getOptions()).attachScreenshot;
        if (attachScreenshot) {
            addGlobalEventProcessor((event, hint) => __awaiter(this, void 0, void 0, function* () {
                // We don't capture screenshots for transactions or native crashes
                if (!event.transaction && event.platform !== 'native') {
                    let count = 1;
                    for (const window of BrowserWindow.getAllWindows()) {
                        if (!hint.attachments) {
                            hint.attachments = [];
                        }
                        try {
                            if (!window.isDestroyed() && window.isVisible()) {
                                const filename = count === 1 ? 'screenshot.png' : `screenshot-${count}.png`;
                                const image = yield capturePage(window);
                                hint.attachments.push({ filename, data: image.toPNG(), contentType: 'image/png' });
                                count += 1;
                            }
                        }
                        catch (e) {
                            // Catch all errors so we don't break event submission if something goes wrong
                            logger.error('Error capturing screenshot', e);
                        }
                    }
                }
                return event;
            }));
        }
    }
}
/** @inheritDoc */
Screenshots.id = 'Screenshots';
//# sourceMappingURL=screenshots.js.map