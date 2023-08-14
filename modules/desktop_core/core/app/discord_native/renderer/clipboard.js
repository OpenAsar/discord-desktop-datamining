"use strict";

var _assert = _interopRequireDefault(require("assert"));
var _electron = _interopRequireDefault(require("electron"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  CLIPBOARD_COPY,
  CLIPBOARD_CUT,
  CLIPBOARD_PASTE
} = require('../common/constants').IPCEvents;
function copy(text) {
  if (text) {
    _electron.default.clipboard.writeText(text);
  } else {
    _electron.default.ipcRenderer.invoke(CLIPBOARD_COPY);
  }
}
function copyImage(imageArrayBuffer, imageSrc) {
  (0, _assert.default)(imageArrayBuffer != null, 'Image data is empty');
  const nativeImg = _electron.default.nativeImage.createFromBuffer(imageArrayBuffer);
  _electron.default.clipboard.write({
    html: `<img src="${imageSrc}">`,
    image: nativeImg
  });
}
function cut() {
  _electron.default.ipcRenderer.invoke(CLIPBOARD_CUT);
}
function paste() {
  _electron.default.ipcRenderer.invoke(CLIPBOARD_PASTE);
}
function read() {
  return _electron.default.clipboard.readText();
}
module.exports = {
  copy,
  copyImage,
  cut,
  paste,
  read
};