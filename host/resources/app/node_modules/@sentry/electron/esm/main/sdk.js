import { ensureProcess, IPCMode } from '../common';
ensureProcess('main');
import { defaultIntegrations as defaultNodeIntegrations, init as nodeInit } from '@sentry/node';
import { session } from 'electron';
import { getDefaultEnvironment, getDefaultReleaseName } from './context';
import { AdditionalContext, ChildProcess, ElectronBreadcrumbs, MainContext, MainProcessSession, Net, OnUncaughtException, PreloadInjection, Screenshots, SentryMinidump, } from './integrations';
import { configureIPC } from './ipc';
import { makeElectronOfflineTransport } from './transports/electron-offline-net';
import { SDK_VERSION } from './version';
export const defaultIntegrations = [
    new SentryMinidump(),
    new ElectronBreadcrumbs(),
    new Net(),
    new MainContext(),
    new ChildProcess(),
    new OnUncaughtException(),
    new PreloadInjection(),
    new AdditionalContext(),
    new Screenshots(),
    ...defaultNodeIntegrations.filter((integration) => integration.name !== 'OnUncaughtException' && integration.name !== 'Context'),
];
const defaultOptions = {
    _metadata: { sdk: { name: 'sentry.javascript.electron', version: SDK_VERSION } },
    ipcMode: IPCMode.Both,
    getSessions: () => [session.defaultSession],
};
/**
 * Initialize Sentry in the Electron main process
 */
export function init(userOptions) {
    const options = Object.assign(defaultOptions, userOptions);
    const defaults = defaultIntegrations;
    // If we don't set a release, @sentry/node will automatically fetch from environment variables
    if (options.release === undefined) {
        options.release = getDefaultReleaseName();
    }
    // If we don't set an environment, @sentry/core defaults to production
    if (options.environment === undefined) {
        options.environment = getDefaultEnvironment();
    }
    // Unless autoSessionTracking is specifically disabled, we track sessions as the
    // lifetime of the Electron main process
    if (options.autoSessionTracking !== false) {
        defaults.push(new MainProcessSession());
        // We don't want nodejs autoSessionTracking
        options.autoSessionTracking = false;
    }
    setDefaultIntegrations(defaults, options);
    if (options.dsn && options.transport === undefined) {
        options.transport = makeElectronOfflineTransport;
    }
    configureIPC(options);
    nodeInit(options);
}
/** Sets the default integrations and ensures that multiple minidump integrations are not enabled */
function setDefaultIntegrations(defaults, options) {
    if (options.defaultIntegrations === undefined) {
        // If ElectronMinidump has been included, automatically remove SentryMinidump
        if (Array.isArray(options.integrations) && options.integrations.some((i) => i.name === 'ElectronMinidump')) {
            options.defaultIntegrations = defaults.filter((integration) => integration.name !== 'SentryMinidump');
            return;
        }
        else if (typeof options.integrations === 'function') {
            const originalFn = options.integrations;
            options.integrations = (integrations) => {
                const userIntegrations = originalFn(integrations);
                return userIntegrations.some((i) => i.name === 'ElectronMinidump')
                    ? userIntegrations.filter((integration) => integration.name !== 'SentryMinidump')
                    : userIntegrations;
            };
        }
        options.defaultIntegrations = defaults;
    }
}
//# sourceMappingURL=sdk.js.map