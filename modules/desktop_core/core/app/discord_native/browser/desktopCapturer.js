"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function mapDiscordDesktopCaptureSourcesToElectron(options) {
  const requiredTypes = ['screen', 'window'];
  const types = options.types.filter(type => requiredTypes.includes(type.toLocaleLowerCase())).map(type => type.toLocaleLowerCase());
  return {
    types,
    thumbnailSize: options.thumbnailSize,
    fetchWindowIcons: true
  };
}
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, async (_, opts) => {
  const electronOptions = mapDiscordDesktopCaptureSourcesToElectron(opts);
  const sources = await _electron.default.desktopCapturer.getSources(electronOptions);
  return sources.map(source => {
    var _source$appIcon;
    return {
      id: source.id,
      name: source.name,
      url: source.thumbnail.toDataURL(),
      icon: (_source$appIcon = source.appIcon) === null || _source$appIcon === void 0 ? void 0 : _source$appIcon.toDataURL()
    };
  });
});