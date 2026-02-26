"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _appSettings = require("./appSettings");
const {
  releaseChannel
} = require('./buildInfo');
const settings = (0, _appSettings.getSettings)();
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
const API_ENDPOINT = (settings === null || settings === void 0 ? void 0 : settings.get('API_ENDPOINT')) || 'https://discord.com/api';
const UPDATE_ENDPOINT = (settings === null || settings === void 0 ? void 0 : settings.get('UPDATE_ENDPOINT')) || API_ENDPOINT;
const NEW_UPDATE_ENDPOINT = (settings === null || settings === void 0 ? void 0 : settings.get('NEW_UPDATE_ENDPOINT')) || 'https://updates.discord.com/';
const ALLOW_OPTIONAL_UPDATES = settings === null || settings === void 0 ? void 0 : settings.get('ALLOW_OPTIONAL_UPDATES', true);
const LOG_LEVEL = (settings === null || settings === void 0 ? void 0 : settings.get('LOG_LEVEL')) || 'info';
const USE_RUST_BSPATCH = settings === null || settings === void 0 ? void 0 : settings.get('USE_RUST_BSPATCH', false);
var IPCEvents = function (IPCEvents) {
  IPCEvents["GET_BUILD_OVERRIDE_STATUS"] = "DISCORD_GET_BUILD_OVERRIDE_STATUS";
  IPCEvents["CLEAR_BUILD_OVERRIDE"] = "DISCORD_CLEAR_BUILD_OVERRIDE";
  return IPCEvents;
}(IPCEvents || {});
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
  IPCEvents
};
var _default = exports.default = bootstrapConstants;
module.exports = exports.default;