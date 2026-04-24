"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setThumbarButtons = setThumbarButtons;
const constants_1 = require("../common/constants");
const ipc_1 = require("./ipc");
function setThumbarButtons(buttons, isSystemDarkMode) {
    return (0, ipc_1.send)(constants_1.IPCEvents.THUMBAR_BUTTONS_UPDATE, buttons, isSystemDarkMode);
}
