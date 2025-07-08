"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdaterEvents = exports.MenuEvents = exports.AnalyticsEvents = exports.AllowedMediaOrigins = void 0;
exports.init = init;
const UpdaterEvents = exports.UpdaterEvents = {
  UPDATE_NOT_AVAILABLE: 'UPDATE_NOT_AVAILABLE',
  CHECKING_FOR_UPDATES: 'CHECKING_FOR_UPDATES',
  UPDATE_ERROR: 'UPDATE_ERROR',
  UPDATE_MANUALLY: 'UPDATE_MANUALLY',
  UPDATE_AVAILABLE: 'UPDATE_AVAILABLE',
  MODULE_INSTALL_PROGRESS: 'MODULE_INSTALL_PROGRESS',
  UPDATE_DOWNLOADED: 'UPDATE_DOWNLOADED',
  MODULE_INSTALLED: 'MODULE_INSTALLED',
  CHECK_FOR_UPDATES: 'CHECK_FOR_UPDATES',
  QUIT_AND_INSTALL: 'QUIT_AND_INSTALL',
  MODULE_INSTALL: 'MODULE_INSTALL',
  MODULE_QUERY: 'MODULE_QUERY',
  UPDATER_HISTORY_QUERY_AND_TRUNCATE: 'UPDATER_HISTORY_QUERY_AND_TRUNCATE',
  UPDATER_HISTORY_RESPONSE: 'UPDATER_HISTORY_RESPONSE'
};
const AnalyticsEvents = exports.AnalyticsEvents = {
  APP_GET_ANALYTICS_EVENTS: 'APP_GET_ANALYTICS_EVENTS',
  APP_PUSH_ANALYTICS: 'APP_PUSH_ANALYTICS',
  APP_VIEWED: 'APP_VIEWED',
  APP_LOADED: 'APP_LOADED'
};
const MenuEvents = exports.MenuEvents = {
  OPEN_HELP: 'menu:open-help',
  OPEN_SETTINGS: 'menu:open-settings',
  CHECK_FOR_UPDATES: 'menu:check-for-updates'
};
const AllowedMediaOrigins = exports.AllowedMediaOrigins = {
  K_ID: 'https://d3ogqhtsivkon3.cloudfront.net'
};
function init(bootstrapConstants) {
  const APP_NAME = bootstrapConstants.APP_NAME;
  const APP_NAME_FOR_HUMANS = bootstrapConstants.APP_NAME_FOR_HUMANS;
  const API_ENDPOINT = bootstrapConstants.API_ENDPOINT;
  const NEW_UPDATE_ENDPOINT = bootstrapConstants.NEW_UPDATE_ENDPOINT;
  const UPDATE_ENDPOINT = bootstrapConstants.UPDATE_ENDPOINT;
  const APP_ID = bootstrapConstants.APP_ID;
  const DISABLE_WINDOWS_64BIT_TRANSITION = bootstrapConstants.DISABLE_WINDOWS_64BIT_TRANSITION;
  const OPTIN_WINDOWS_64BIT_TRANSITION_PROGRESSION = bootstrapConstants.OPTIN_WINDOWS_64BIT_TRANSITION_PROGRESSION;
  const ALLOW_OPTIONAL_UPDATES = bootstrapConstants.ALLOW_OPTIONAL_UPDATES;
  const LOG_LEVEL = bootstrapConstants.LOG_LEVEL;
  const MAIN_APP_DIRNAME = __dirname;
  const exported = {
    APP_NAME,
    APP_NAME_FOR_HUMANS,
    DISABLE_WINDOWS_64BIT_TRANSITION,
    OPTIN_WINDOWS_64BIT_TRANSITION_PROGRESSION,
    ALLOW_OPTIONAL_UPDATES,
    LOG_LEVEL,
    DEFAULT_MAIN_WINDOW_ID: 0,
    MAIN_APP_DIRNAME,
    APP_ID,
    API_ENDPOINT,
    NEW_UPDATE_ENDPOINT,
    UPDATE_ENDPOINT
  };
  for (const [k, v] of Object.entries(exported)) {
    module.exports[k] = v;
  }
}