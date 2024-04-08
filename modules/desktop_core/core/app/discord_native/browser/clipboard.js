"use strict";

var electron = _interopRequireWildcard(require("electron"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  CLIPBOARD_COPY,
  CLIPBOARD_CUT,
  CLIPBOARD_PASTE
} = require('../common/constants').IPCEvents;
electron.ipcMain.handle(CLIPBOARD_COPY, async () => {
  var _electron$webContents;
  (_electron$webContents = electron.webContents.getFocusedWebContents()) === null || _electron$webContents === void 0 ? void 0 : _electron$webContents.copy();
});
electron.ipcMain.handle(CLIPBOARD_CUT, async () => {
  var _electron$webContents2;
  (_electron$webContents2 = electron.webContents.getFocusedWebContents()) === null || _electron$webContents2 === void 0 ? void 0 : _electron$webContents2.cut();
});
electron.ipcMain.handle(CLIPBOARD_PASTE, async () => {
  var _electron$webContents3;
  (_electron$webContents3 = electron.webContents.getFocusedWebContents()) === null || _electron$webContents3 === void 0 ? void 0 : _electron$webContents3.paste();
});