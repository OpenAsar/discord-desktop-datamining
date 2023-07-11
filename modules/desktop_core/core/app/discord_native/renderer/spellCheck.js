"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.removeListener = removeListener;
exports.getAvailableDictionaries = getAvailableDictionaries;
exports.setLocale = setLocale;
exports.setLearnedWords = setLearnedWords;
exports.replaceMisspelling = replaceMisspelling;

var _events = _interopRequireDefault(require("events"));

var _DiscordIPC = require("../common/DiscordIPC");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const events = new _events.default();

_DiscordIPC.DiscordIPC.renderer.on(_DiscordIPC.IPCEvents.SPELLCHECK_RESULT, (_, misspelledWord, dictionarySuggestions) => {
  events.emit('spellcheck-result', misspelledWord, dictionarySuggestions);
});

function on(eventName, callback) {
  events.on(eventName, callback);
}

function removeListener(eventName, callback) {
  events.removeListener(eventName, callback);
}

function getAvailableDictionaries() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.SPELLCHECK_GET_AVAILABLE_DICTIONARIES);
}

async function setLocale(locale) {
  let succeeded = true;

  try {
    await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.SPELLCHECK_SET_LOCALE, locale);
  } catch (_) {
    succeeded = false;
  }

  return succeeded;
}

function setLearnedWords(learnedWords) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.SPELLCHECK_SET_LEARNED_WORDS, learnedWords);
}

function replaceMisspelling(correction) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.SPELLCHECK_REPLACE_MISSPELLING, correction);
}