"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
var _electron = require("electron");
var _constants = require("./discord_native/common/constants");
var _ipcMain = _interopRequireDefault(require("./ipcMain"));
var _mainScreen = require("./mainScreen");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let hasInit = false;
const ThumbarButtonName = {
  VIDEO: 'VIDEO',
  MUTE: 'MUTE',
  DEAFEN: 'DEAFEN',
  DISCONNECT: 'DISCONNECT'
};
function init() {
  if (hasInit) return;
  hasInit = true;
  _ipcMain.default.on(_constants.IPCEvents.THUMBAR_BUTTONS_UPDATE, (event, buttons, isSystemDarkMode) => {
    if (_utils.isWindows) {
      setThumbarButtons(event, buttons, isSystemDarkMode);
    } else if (_utils.isOSX) {
      setTouchbarButtons(event, buttons);
    } else {
      console.log(`thumbarButtons.init: Unknown operating system "${_utils.platform}".`);
    }
  });
}
function getButtonIcon(name, active, isSystemDarkMode) {
  const root = ThumbarButtonName[name].toLowerCase();
  const postfix = active ? '' : '-off';
  const theme = isSystemDarkMode ? '' : '-light';
  return (0, _utils.exposeModuleResource)(`app/images/thumbar/${_utils.platform}`, `${root}${postfix}${theme}.png`);
}
function createButtons(event, buttons, isSystemDarkMode) {
  for (const button of buttons) {
    if (typeof button.name !== 'string') {
      console.error('setThumbarButtons: button.icon missing.');
      return;
    }
    if (!(button.name in ThumbarButtonName)) {
      console.error(`setThumbarButtons: button.icon for unknown icon "${button.icon}.`);
      return;
    }
    const buttonName = button.name;
    button.click = () => _ipcMain.default.reply(event, 'THUMBAR_BUTTONS_CLICKED', {
      buttonName
    });
    button.icon = getButtonIcon(button.name, button.active ?? false, isSystemDarkMode);
  }
  return buttons;
}
function setTouchbarButtons(event, buttons) {
  buttons = createButtons(event, buttons, true);
  const touchbarButtons = buttons.map(button => {
    var _button$flags;
    return new _electron.TouchBar.TouchBarButton({
      accessibilityLabel: button.tooltip,
      click: button.click,
      icon: button.icon,
      enabled: ((_button$flags = button.flags) === null || _button$flags === void 0 ? void 0 : _button$flags.includes('disabled')) ? false : true
    });
  });
  const win = _electron.BrowserWindow.fromId((0, _mainScreen.getMainWindowId)());
  const touchbar = new _electron.TouchBar({
    items: touchbarButtons.length === 0 ? null : touchbarButtons
  });
  win.setTouchBar(touchbar);
}
function setThumbarButtons(event, buttons, isSystemDarkMode) {
  buttons = createButtons(event, buttons, isSystemDarkMode);
  const win = _electron.BrowserWindow.fromId((0, _mainScreen.getMainWindowId)());
  if (!win.setThumbarButtons(buttons)) {
    console.error('setThumbarButtons: setThumbarButtons failed', buttons);
  }
}