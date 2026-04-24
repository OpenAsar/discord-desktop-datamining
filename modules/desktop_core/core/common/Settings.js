"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Settings {
    path;
    lastSaved;
    lastModified;
    settings;
    constructor(root) {
        this.path = path_1.default.join(root, 'settings.json');
        try {
            this.lastSaved = fs_1.default.readFileSync(this.path, 'utf-8');
            this.settings = JSON.parse(this.lastSaved);
        }
        catch (e) {
            this.lastSaved = '';
            this.settings = {};
        }
        this.lastModified = this._lastModified();
    }
    _lastModified() {
        try {
            return fs_1.default.statSync(this.path).mtime.getTime();
        }
        catch (e) {
            return 0;
        }
    }
    get(key, defaultValue = false) {
        if (this.settings.hasOwnProperty(key)) {
            return this.settings[key];
        }
        return defaultValue;
    }
    set(key, value) {
        this.settings[key] = value;
    }
    save() {
        if (this.lastModified !== 0 && this.lastModified !== this._lastModified()) {
            return false;
        }
        try {
            const toSave = JSON.stringify(this.settings, null, 2);
            if (this.lastSaved !== toSave) {
                this.lastSaved = toSave;
                fs_1.default.writeFileSync(this.path, toSave);
                this.lastModified = this._lastModified();
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
}
exports.default = Settings;
