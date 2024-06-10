const os = require('os');

// Note: Duplicated from discord_voice, tests if v1 >= v2
function versionGreaterThanOrEqual(v1, v2) {
  const v1parts = v1.split('.').map(Number);
  const v2parts = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const num1 = i < v1parts.length ? v1parts[i] : 0;
    const num2 = i < v2parts.length ? v2parts[i] : 0;
    if (num1 > num2) return true;
    if (num1 < num2) return false;
  }
  return true;
}

// Disable krisp on macOS for OS versions <= 11.7.10 (BigSur or earlier)
let krispSupported = true;
try {
  const osVersion = os.release();
  const isOldVersion = !versionGreaterThanOrEqual(osVersion, '21.0.0');
  const platformMatches = process.platform === 'darwin';
  if (platformMatches && isOldVersion) {
    krispSupported = false;
  }
} catch (e) {}

if (!krispSupported) {
  throw new Error(`Krisp not supported`);
} else {
  // eslint-disable-next-line import/no-unresolved, import/extensions
  const KrispModule = require('./discord_krisp.node');

  // eslint-disable-next-line no-console
  console.info('Initializing krisp module');
  KrispModule._initialize();

  KrispModule.getNcModels = function () {
    return new Promise((resolve) => {
      KrispModule._getNcModels((models) => resolve(models));
    });
  };

  KrispModule.getVadModels = function () {
    return new Promise((resolve) => {
      KrispModule._getVadModels((models) => resolve(models));
    });
  };

  module.exports = KrispModule;
}
