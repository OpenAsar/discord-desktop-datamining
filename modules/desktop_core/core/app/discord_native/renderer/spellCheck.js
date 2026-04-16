"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.on = on;
exports.getAvailableDictionaries = getAvailableDictionaries;
exports.setLocale = setLocale;
exports.setLearnedWords = setLearnedWords;
exports.replaceMisspelling = replaceMisspelling;
const events_1 = __importDefault(require("events"));
const DiscordIPC_1 = require("../common/DiscordIPC");
const events = new events_1.default();
DiscordIPC_1.DiscordIPC.renderer.on(DiscordIPC_1.IPCEvents.SPELLCHECK_RESULT, (_, misspelledWord, dictionarySuggestions) => {
    events.emit('spellcheck-result', misspelledWord, dictionarySuggestions);
});
function on(eventName, callback) {
    events.on(eventName, callback);
    return () => events.removeListener(eventName, callback);
}
function getAvailableDictionaries() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.SPELLCHECK_GET_AVAILABLE_DICTIONARIES);
}
async function setLocale(locale) {
    let succeeded = true;
    try {
        await DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.SPELLCHECK_SET_LOCALE, locale);
    }
    catch (_) {
        succeeded = false;
    }
    return succeeded;
}
function setLearnedWords(learnedWords) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.SPELLCHECK_SET_LEARNED_WORDS, learnedWords);
}
function replaceMisspelling(correction) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.SPELLCHECK_REPLACE_MISSPELLING, correction);
}
