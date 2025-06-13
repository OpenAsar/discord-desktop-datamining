"use strict";

var _path = _interopRequireDefault(require("path"));
var _appFeatures = require("../../appFeatures");
var _utils = require("../../utils");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
if (_utils.isOSX) {
  try {
    if (moduleDataPath == null) {
      throw new Error('no moduleDataPath');
    }
    const modulePath = _path.default.join(moduleDataPath, 'discord_intents');
    const lib = require(modulePath);
    lib.setDataPath(modulePath);
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.SEARCH_INDEX_DOMAINS, (_event, domains) => {
      lib.indexDomains(domains);
      return Promise.resolve();
    });
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.SEARCH_CLEAR_INDEX, () => {
      lib.clearIndex();
      return Promise.resolve();
    });
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.SEARCH_DELETE_DOMAINS, (_event, domains) => {
      lib.deleteDomains(domains);
      return Promise.resolve();
    });
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.SEARCH_DELETE_ITEMS, (_event, items) => {
      lib.deleteItems(items);
      return Promise.resolve();
    });
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.INTENTS_SET_ACTIVITY, (_event, activity) => {
      lib.setActivity(activity);
      return Promise.resolve();
    });
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.INTENTS_RESIGN_ACTIVITY, () => {
      lib.resignActivity();
      return Promise.resolve();
    });
    (0, _appFeatures.getFeatures)().declareSupported('intents');
  } catch (e) {
    console.warn('discord_intents setup failed with error: ', e);
  }
}