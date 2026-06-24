"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCallbacks = setCallbacks;
exports.getAuthorization = getAuthorization;
exports.getSettings = getSettings;
exports.sendNotification = sendNotification;
exports.removeNotifications = removeNotifications;
exports.removeAllNotifications = removeAllNotifications;
const electron = __importStar(require("electron"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const stream_1 = require("stream");
const uuid_1 = require("uuid");
const notifications = new Map();
const assetMap = new Map();
let handlerOnNotificationAction = () => { };
function handleNotificationAction(action, identifier, args) {
    handlerOnNotificationAction(action, identifier, args);
}
function setCallbacks(onNotificationAction) {
    handlerOnNotificationAction = onNotificationAction;
}
function getAuthorization() {
    return Promise.resolve(true);
}
function getSettings() {
    return Promise.resolve({ authorizationStatus: 'authorized' });
}
async function getAssetUrl(assetUrl) {
    if (assetUrl == null || assetUrl === '') {
        return Promise.resolve(undefined);
    }
    if (assetMap.has(assetUrl)) {
        return Promise.resolve(assetMap.get(assetUrl));
    }
    const path = os_1.default.tmpdir() + '/' + (0, uuid_1.v4)() + '.png';
    const filePath = await new Promise((resolve, _reject) => {
        fetch(assetUrl)
            .then((response) => {
            if (response.body == null) {
                resolve(undefined);
                return;
            }
            const readable = stream_1.Readable.fromWeb(response.body);
            const stream = fs_1.default.createWriteStream(path);
            stream.on('finish', () => {
                resolve(path);
            });
            stream.on('error', (err) => {
                fs_1.default.unlink(path, () => { });
                console.warn('Failed to write notification icon:', err);
                resolve(undefined);
            });
            readable.pipe(stream);
        })
            .catch((err) => {
            console.warn('Failed to fetch notification icon:', err);
            resolve(undefined);
        });
    });
    if (filePath != null) {
        assetMap.set(assetUrl, filePath);
    }
    return Promise.resolve(filePath);
}
function escapeXml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
class ToastBuilder {
    title;
    body;
    icon;
    actions;
    _identifier;
    threadIdentifier;
    groupName;
    fallbackDeepLink;
    _senderIdentifier;
    _senderDisplayName;
    constructor(content) {
        this.title = content.title;
        this.body = content.body;
        this.icon = content.icon;
        this.actions = content.actions;
        this._identifier = content.identifier;
        this.threadIdentifier = content.threadIdentifier;
        this.groupName = content.groupName;
        this._senderIdentifier = content.senderIdentifier;
        this._senderDisplayName = content.senderDisplayName;
        this.fallbackDeepLink = content.fallbackDeepLink;
    }
    setIcon(icon) {
        this.icon = icon;
        return this;
    }
    supportsHeaders() {
        return false;
    }
    build() {
        let xml = '<toast>';
        xml += `<visual><binding template="ToastGeneric">`;
        if (this.title != null && this.title !== '') {
            xml += `<text>${escapeXml(this.title)}</text>`;
        }
        if (this.body != null && this.body !== '') {
            xml += `<text>${escapeXml(this.body)}</text>`;
        }
        if (this.icon != null && this.icon !== '') {
            xml += `<image placement='appLogoOverride' src='${escapeXml(this.icon)}' />`;
        }
        xml += `</binding></visual>`;
        xml += `<audio silent='true' />`;
        if (this.supportsHeaders()
            && this.threadIdentifier != null
            && this.threadIdentifier !== ''
            && this.groupName != null
            && this.groupName !== '') {
            xml += `<header id='${escapeXml(this.threadIdentifier)}' title='${escapeXml(this.groupName)}' arguments='${escapeXml(this.threadIdentifier)}' />`;
        }
        if (Array.isArray(this.actions)) {
            xml += `<actions>`;
            for (const action of this.actions) {
                let actionXml = `<action content="${escapeXml(action.content)}" arguments="${escapeXml(action.args)}" `;
                if (action.hintTooltip != null && action.hintTooltip !== '') {
                    actionXml += `hint-toolTip="${escapeXml(action.hintTooltip)}" `;
                }
                if (action.hintButtonStyle != null) {
                    actionXml += `hint-buttonStyle="${escapeXml(action.hintButtonStyle)}" `;
                }
                actionXml += `/>`;
                xml += actionXml;
            }
            xml += `</actions>`;
        }
        xml += `</toast>`;
        return xml;
    }
}
async function sendNotification(options) {
    const toast = new ToastBuilder(options);
    if (options.icon != null) {
        toast.setIcon(await getAssetUrl(options.icon));
    }
    const uuid = (0, uuid_1.v4)();
    const notification = new electron.Notification({ toastXml: toast.build() });
    notification.on('click', (_event, action = '') => {
        handleNotificationAction('clicked', uuid, action);
    });
    notification.on('close', (_event, action = '') => {
        handleNotificationAction('dismiss', uuid, action);
    });
    notification.on('failed', (_event, error) => {
        handleNotificationAction('failed', uuid, error);
    });
    notifications.set(uuid, notification);
    notification.show();
    return Promise.resolve({ identifier: uuid, delivered: true });
}
function removeNotifications(identifiers) {
    for (const identifier of identifiers) {
        const notification = notifications.get(identifier);
        if (notification != null) {
            notification.close();
            notifications.delete(identifier);
        }
    }
    return Promise.resolve();
}
function removeAllNotifications() {
    for (const notification of notifications.values()) {
        notification.close();
    }
    notifications.clear();
    return Promise.resolve();
}
