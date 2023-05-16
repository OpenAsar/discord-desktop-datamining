import { __awaiter } from "tslib";
import { getCurrentHub } from '@sentry/core';
import { dialog } from 'electron';
/** Capture unhandled errors. */
export class OnUncaughtException {
    constructor() {
        /** @inheritDoc */
        this.name = OnUncaughtException.id;
    }
    /**
     * @inheritDoc
     */
    setupOnce() {
        var _a;
        const options = (_a = getCurrentHub().getClient()) === null || _a === void 0 ? void 0 : _a.getOptions();
        global.process.on('uncaughtException', (error) => {
            const self = getCurrentHub().getIntegration(OnUncaughtException);
            if (self) {
                getCurrentHub().withScope((scope) => __awaiter(this, void 0, void 0, function* () {
                    scope.addEventProcessor((event) => __awaiter(this, void 0, void 0, function* () {
                        return (Object.assign(Object.assign({}, event), { level: 'fatal' }));
                    }));
                    const nodeClient = getCurrentHub().getClient();
                    nodeClient.captureException(error, { originalException: error }, getCurrentHub().getScope());
                    yield nodeClient.flush(nodeClient.getOptions().shutdownTimeout || 2000);
                    if (options === null || options === void 0 ? void 0 : options.onFatalError) {
                        options.onFatalError(error);
                    }
                    else if (global.process.listenerCount('uncaughtException') <= 2) {
                        // In addition to this handler there is always one in Electron
                        // The dialog is only shown if there are no other handlers
                        // eslint-disable-next-line no-console
                        console.error('Uncaught Exception:');
                        // eslint-disable-next-line no-console
                        console.error(error);
                        const ref = error.stack;
                        const stack = ref !== undefined ? ref : `${error.name}: ${error.message}`;
                        const message = `Uncaught Exception:\n${stack}`;
                        dialog.showErrorBox('A JavaScript error occurred in the main process', message);
                    }
                }));
            }
        });
    }
}
/** @inheritDoc */
OnUncaughtException.id = 'OnUncaughtException';
//# sourceMappingURL=onuncaughtexception.js.map