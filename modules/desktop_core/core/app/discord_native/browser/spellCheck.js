"use strict";

var _DiscordIPC = require("../common/DiscordIPC");
const electron = require('electron');
let _learnedWords = new Set();
let _hasLoadedLearnedWords = false;
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.SPELLCHECK_REPLACE_MISSPELLING, (event, correction) => {
  event.sender.replaceMisspelling(correction);
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.SPELLCHECK_GET_AVAILABLE_DICTIONARIES, () => {
  return Promise.resolve(electron.session.defaultSession.availableSpellCheckerLanguages);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.SPELLCHECK_SET_LOCALE, (_, locale) => {
  try {
    electron.session.defaultSession.setSpellCheckerLanguages([locale]);
  } catch (_) {
    console.error(`Failed to set the spellcheck locale: ${locale}`);
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.SPELLCHECK_SET_LEARNED_WORDS, async (_, newLearnedWords) => {
  const session = electron.session.defaultSession;
  if (!_hasLoadedLearnedWords) {
    const dictionaryContents = await session.listWordsInSpellCheckerDictionary();
    _learnedWords = new Set(dictionaryContents);
    _hasLoadedLearnedWords = true;
  }
  _learnedWords.forEach(word => {
    if (!newLearnedWords.has(word)) {
      session.removeWordFromSpellCheckerDictionary(word);
    }
  });
  newLearnedWords.forEach(word => {
    if (!_learnedWords.has(word)) {
      session.addWordToSpellCheckerDictionary(word);
    }
  });
  _learnedWords = new Set(newLearnedWords);
});