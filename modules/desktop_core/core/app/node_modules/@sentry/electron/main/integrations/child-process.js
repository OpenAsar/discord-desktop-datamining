Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildProcess = void 0;
const core_1 = require("@sentry/core");
const electron_normalize_1 = require("../electron-normalize");
const DEFAULT_OPTIONS = {
    breadcrumbs: electron_normalize_1.EXIT_REASONS,
    events: ['abnormal-exit', 'launch-failed', 'integrity-failure'],
};
/** Gets message and severity */
function getMessageAndSeverity(reason, proc) {
    const message = `'${proc}' process exited with '${reason}'`;
    switch (reason) {
        case 'abnormal-exit':
        case 'killed':
            return { message, level: 'warning' };
        case 'crashed':
        case 'oom':
        case 'launch-failed':
        case 'integrity-failure':
            return { message, level: 'fatal' };
        default:
            return { message, level: 'debug' };
    }
}
/** Adds breadcrumbs for Electron events. */
class ChildProcess {
    /**
     * @param _options Integration options
     */
    constructor(options = {}) {
        /** @inheritDoc */
        this.name = ChildProcess.id;
        const { breadcrumbs, events } = options;
        this._options = {
            breadcrumbs: Array.isArray(breadcrumbs) ? breadcrumbs : breadcrumbs == false ? [] : DEFAULT_OPTIONS.breadcrumbs,
            events: Array.isArray(events) ? events : events == false ? [] : DEFAULT_OPTIONS.events,
        };
    }
    /** @inheritDoc */
    setupOnce() {
        var _a;
        const { breadcrumbs, events } = this._options;
        const allReasons = Array.from(new Set([...breadcrumbs, ...events]));
        // only hook these events if we're after more than just the unresponsive event
        if (allReasons.length > 0) {
            const options = (_a = (0, core_1.getCurrentHub)().getClient()) === null || _a === void 0 ? void 0 : _a.getOptions();
            (0, electron_normalize_1.onChildProcessGone)(allReasons, (details) => {
                const { reason } = details;
                // Capture message first
                if (events.includes(reason)) {
                    const { message, level } = getMessageAndSeverity(details.reason, details.type);
                    (0, core_1.captureMessage)(message, { level, tags: { 'event.process': details.type } });
                }
                // And then add breadcrumbs for subsequent events
                if (breadcrumbs.includes(reason)) {
                    (0, core_1.addBreadcrumb)(Object.assign(Object.assign({ type: 'process', category: 'child-process' }, getMessageAndSeverity(details.reason, details.type)), { data: details }));
                }
            });
            (0, electron_normalize_1.onRendererProcessGone)(allReasons, (contents, details) => {
                var _a;
                const { reason } = details;
                const name = ((_a = options === null || options === void 0 ? void 0 : options.getRendererName) === null || _a === void 0 ? void 0 : _a.call(options, contents)) || 'renderer';
                // Capture message first
                if (events.includes(reason)) {
                    const { message, level } = getMessageAndSeverity(details.reason, name);
                    (0, core_1.captureMessage)(message, level);
                }
                // And then add breadcrumbs for subsequent events
                if (breadcrumbs.includes(reason)) {
                    (0, core_1.addBreadcrumb)(Object.assign(Object.assign({ type: 'process', category: 'child-process' }, getMessageAndSeverity(details.reason, name)), { data: details }));
                }
            });
        }
    }
}
exports.ChildProcess = ChildProcess;
/** @inheritDoc */
ChildProcess.id = 'ChildProcess';
//# sourceMappingURL=child-process.js.map