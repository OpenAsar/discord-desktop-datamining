"use strict";

const baseConfig = require('@discordapp/jest-config/jest.config.base');
module.exports = Object.assign({}, baseConfig, {
  testEnvironment: 'jsdom',
  displayName: 'desktop app',
  testPathIgnorePatterns: ['/node_modules/'],
  setupFiles: [...baseConfig.setupFiles],
  maxConcurrency: 1,
  maxWorkers: 1,
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper
  }
});