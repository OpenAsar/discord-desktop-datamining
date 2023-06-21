import { __awaiter } from "tslib";
import { getCurrentHub } from '@sentry/core';
import { app } from 'electron';
import { mergeEvents, normalizeEvent } from '../../common';
import { getEventDefaults } from '../context';
/** Adds Electron context to events and normalises paths. */
export class MainContext {
    constructor() {
        /** @inheritDoc */
        this.name = MainContext.id;
    }
    /** @inheritDoc */
    setupOnce(addGlobalEventProcessor) {
        var _a;
        const options = (_a = getCurrentHub().getClient()) === null || _a === void 0 ? void 0 : _a.getOptions();
        addGlobalEventProcessor((event) => __awaiter(this, void 0, void 0, function* () {
            const normalized = normalizeEvent(event, app.getAppPath());
            const defaults = yield getEventDefaults(options === null || options === void 0 ? void 0 : options.release, options === null || options === void 0 ? void 0 : options.environment);
            return mergeEvents(defaults, normalized);
        }));
    }
}
/** @inheritDoc */
MainContext.id = 'MainContext';
//# sourceMappingURL=main-context.js.map