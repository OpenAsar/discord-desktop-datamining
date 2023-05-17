import { getCurrentHub } from '@sentry/core';
import { logger } from '@sentry/utils';
import { app } from 'electron';
import { existsSync } from 'fs';
import { isAbsolute } from 'path';
import { IPCMode } from '../../common';
import { rendererRequiresCrashReporterStart } from '../electron-normalize';
/**
 * Injects the preload script into the provided sessions.
 *
 * Defaults to injecting into the defaultSession
 */
export class PreloadInjection {
    constructor() {
        /** @inheritDoc */
        this.name = PreloadInjection.id;
    }
    /** @inheritDoc */
    setupOnce() {
        var _a;
        const options = (_a = getCurrentHub().getClient()) === null || _a === void 0 ? void 0 : _a.getOptions();
        // If classic IPC mode is disabled, we shouldn't attempt to inject preload scripts
        // eslint-disable-next-line no-bitwise
        if ((options.ipcMode & IPCMode.Classic) == 0) {
            return;
        }
        app.once('ready', () => {
            this._addPreloadToSessions(options);
        });
    }
    /**
     * Attempts to add the preload script the the provided sessions
     */
    _addPreloadToSessions(options) {
        let path = undefined;
        try {
            path = rendererRequiresCrashReporterStart()
                ? require.resolve('../../preload/legacy.js')
                : require.resolve('../../preload/index.js');
        }
        catch (_) {
            //
        }
        if (path && typeof path === 'string' && isAbsolute(path) && existsSync(path)) {
            for (const sesh of options.getSessions()) {
                // Fetch any existing preloads so we don't overwrite them
                const existing = sesh.getPreloads();
                sesh.setPreloads([path, ...existing]);
            }
        }
        else {
            logger.log('The preload script could not be injected automatically. This is most likely caused by bundling of the main process');
        }
    }
}
/** @inheritDoc */
PreloadInjection.id = 'PreloadInjection';
//# sourceMappingURL=preload-injection.js.map