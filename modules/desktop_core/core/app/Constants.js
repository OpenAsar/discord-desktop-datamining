"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEBAPP_PATHS = exports.UpdaterEvents = exports.UPDATE_ENDPOINT = exports.NEW_UPDATE_ENDPOINT = exports.MenuEvents = exports.MAIN_APP_DIRNAME = exports.LOG_LEVEL = exports.DEFAULT_MAIN_WINDOW_ID = exports.AnalyticsEvents = exports.AllowedMediaOrigins = exports.APP_NAME_FOR_HUMANS = exports.APP_NAME = exports.APP_ID = exports.API_ENDPOINT = exports.ALLOW_OPTIONAL_UPDATES = void 0;
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
  APP_LOADED: 'APP_LOADED',
  APP_FIRST_RENDER_AFTER_READY_PAYLOAD: 'APP_FIRST_RENDER_AFTER_READY_PAYLOAD'
};
const MenuEvents = exports.MenuEvents = {
  OPEN_HELP: 'menu:open-help',
  OPEN_SETTINGS: 'menu:open-settings',
  CHECK_FOR_UPDATES: 'menu:check-for-updates'
};
const AllowedMediaOrigins = exports.AllowedMediaOrigins = {
  K_ID: 'https://d3ogqhtsivkon3.cloudfront.net',
  K_ID_V2: 'https://family.k-id.com',
  K_ID_FACE_SCAN: 'https://age-verification-k-id.privately.swiss'
};
const WEBAPP_PATHS = exports.WEBAPP_PATHS = {
  APP: '/app',
  CONFERENCE_MODE: '/conference-mode'
};
let APP_NAME = exports.APP_NAME = void 0;
let APP_NAME_FOR_HUMANS = exports.APP_NAME_FOR_HUMANS = void 0;
let API_ENDPOINT = exports.API_ENDPOINT = void 0;
let NEW_UPDATE_ENDPOINT = exports.NEW_UPDATE_ENDPOINT = void 0;
let UPDATE_ENDPOINT = exports.UPDATE_ENDPOINT = void 0;
let APP_ID = exports.APP_ID = void 0;
let ALLOW_OPTIONAL_UPDATES = exports.ALLOW_OPTIONAL_UPDATES = void 0;
let LOG_LEVEL = exports.LOG_LEVEL = void 0;
let DEFAULT_MAIN_WINDOW_ID = exports.DEFAULT_MAIN_WINDOW_ID = void 0;
let MAIN_APP_DIRNAME = exports.MAIN_APP_DIRNAME = void 0;
function init(bootstrapConstants) {
  const APP_NAME = bootstrapConstants.APP_NAME;
  const APP_NAME_FOR_HUMANS = bootstrapConstants.APP_NAME_FOR_HUMANS;
  const API_ENDPOINT = bootstrapConstants.API_ENDPOINT;
  const NEW_UPDATE_ENDPOINT = bootstrapConstants.NEW_UPDATE_ENDPOINT;
  const UPDATE_ENDPOINT = bootstrapConstants.UPDATE_ENDPOINT;
  const APP_ID = bootstrapConstants.APP_ID;
  const ALLOW_OPTIONAL_UPDATES = bootstrapConstants.ALLOW_OPTIONAL_UPDATES;
  const LOG_LEVEL = bootstrapConstants.LOG_LEVEL;
  const MAIN_APP_DIRNAME = __dirname;
  const exported = {
    APP_NAME,
    APP_NAME_FOR_HUMANS,
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