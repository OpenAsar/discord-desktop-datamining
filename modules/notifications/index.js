"use strict";

if (process.platform === 'darwin') {
  module.exports = require('./discord_notifications.node');
} else if (process.platform === 'win32') {
  module.exports = require('./notifications_win');
}
