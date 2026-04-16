"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeReadyProtocolRegistration = beforeReadyProtocolRegistration;
function beforeReadyProtocolRegistration() {
    const { protocol } = require('electron');
    const { DISCORD_CLIP_PROTOCOL } = require('../common/constants');
    protocol.registerSchemesAsPrivileged([
        {
            scheme: DISCORD_CLIP_PROTOCOL,
            privileges: {
                standard: true,
                secure: true,
                supportFetchAPI: true,
                stream: true,
            },
        },
    ]);
}
