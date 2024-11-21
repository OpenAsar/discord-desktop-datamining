"use strict";

const process = require('process');
const env = process.env;
module.exports = {
  pid: process.pid,
  platform: process.platform,
  arch: process.arch,
  env: {
    DISCORD_TEST: env['DISCORD_TEST'],
    DISCORD_GATEWAY_PLAINTEXT: env['DISCORD_GATEWAY_PLAINTEXT'],
    DISCORD_DISALLOW_POPUPS: env['DISCORD_DISALLOW_POPUPS'],
    LOCALAPPDATA: env['LOCALAPPDATA'],
    'PROGRAMFILES(X86)': env['PROGRAMFILES(X86)'],
    PROGRAMFILES: env['PROGRAMFILES'],
    PROGRAMW6432: env['PROGRAMW6432'],
    PROGRAMDATA: env['PROGRAMDATA']
  }
};