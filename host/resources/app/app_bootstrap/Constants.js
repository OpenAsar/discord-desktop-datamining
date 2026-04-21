"use strict";
const appSettings_1 = require("./appSettings");
const { releaseChannel } = require('./buildInfo');
const settings = (0, appSettings_1.getSettings)();
function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
const appNameSuffix = releaseChannel === 'stable' ? '' : capitalizeFirstLetter(releaseChannel);
const APP_COMPANY = 'Discord Inc';
const APP_DESCRIPTION = 'Discord - https://discord.com';
const APP_NAME = 'Discord' + appNameSuffix;
const APP_NAME_FOR_HUMANS = 'Discord' + (appNameSuffix !== '' ? ' ' + appNameSuffix : '');
const APP_ID_BASE = 'com.squirrel';
const APP_ID = `${APP_ID_BASE}.${APP_NAME}.${APP_NAME}`;
const APP_PROTOCOL = 'Discord';
const API_ENDPOINT = settings?.get('API_ENDPOINT') || 'https://discord.com/api';
const UPDATE_ENDPOINT = settings?.get('UPDATE_ENDPOINT') || API_ENDPOINT;
const NEW_UPDATE_ENDPOINT = settings?.get('NEW_UPDATE_ENDPOINT') || 'https://updates.discord.com/';
const ALLOW_OPTIONAL_UPDATES = settings?.get('ALLOW_OPTIONAL_UPDATES', true);
const LOG_LEVEL = settings?.get('LOG_LEVEL') || 'info';
const USE_RUST_BSPATCH = settings?.get('USE_RUST_BSPATCH', false) || process.platform === 'darwin';
const USE_NEW_UPDATER = settings?.get('USE_NEW_UPDATER', false) || process.platform === 'win32';
var IPCEvents;
(function (IPCEvents) {
    IPCEvents["GET_BUILD_OVERRIDE_STATUS"] = "DISCORD_GET_BUILD_OVERRIDE_STATUS";
    IPCEvents["CLEAR_BUILD_OVERRIDE"] = "DISCORD_CLEAR_BUILD_OVERRIDE";
})(IPCEvents || (IPCEvents = {}));
const bootstrapConstants = {
    APP_COMPANY,
    APP_DESCRIPTION,
    APP_NAME,
    APP_NAME_FOR_HUMANS,
    APP_ID,
    APP_PROTOCOL,
    API_ENDPOINT,
    NEW_UPDATE_ENDPOINT,
    ALLOW_OPTIONAL_UPDATES,
    LOG_LEVEL,
    UPDATE_ENDPOINT,
    USE_RUST_BSPATCH,
    USE_NEW_UPDATER,
    IPCEvents,
};
module.exports = bootstrapConstants;
