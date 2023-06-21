Object.defineProperty(exports, "__esModule", { value: true });
exports.OnUncaughtException = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@sentry/core");
const electron_1 = require("electron");
/** Capture unhandled errors. */
class OnUncaughtException {
    constructor() {
        /** @inheritDoc */
        this.name = OnUncaughtException.id;
    }
    /**
     * @inheritDoc
     */
    setupOnce() {
        var _a;
        const options = (_a = (0, core_1.getCurrentHub)().getClient()) === null || _a === void 0 ? void 0 : _a.getOptions();
        global.process.on('uncaughtException', (error) => {
            const self = (0, core_1.getCurrentHub)().getIntegration(OnUncaughtException);
            if (self) {
                (0, core_1.getCurrentHub)().withScope((scope) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    scope.addEventProcessor((event) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        return (Object.assign(Object.assign({}, event), { level: 'fatal' }));
                    }));
                    const nodeClient = (0, core_1.getCurrentHub)().getClient();
                    nodeClient.captureException(error, { originalException: error }, (0, core_1.getCurrentHub)().getScope());
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
                        electron_1.dialog.showErrorBox('A JavaScript error occurred in the main process', message);
                    }
                }));
            }
        });
    }
}
exports.OnUncaughtException = OnUncaughtException;
/** @inheritDoc */
OnUncaughtException.id = 'OnUncaughtException';
//# sourceMappingURL=onuncaughtexception.js.map