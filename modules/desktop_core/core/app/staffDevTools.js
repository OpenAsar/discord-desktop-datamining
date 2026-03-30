"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._STAFF_DEV_TOOLS_KEY = void 0;
exports.tryLoadStaffDevToolsModule = tryLoadStaffDevToolsModule;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _url = _interopRequireDefault(require("url"));
var _crashReporterSetup = require("./bootstrapModules/crashReporterSetup");
var _paths = require("./bootstrapModules/paths");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function extractZip(zipBuffer, destDir) {
  const yauzl = require('yauzl');
  const resolvedDest = _path.default.resolve(destDir);
  return new Promise((resolve, reject) => {
    yauzl.fromBuffer(zipBuffer, {
      lazyEntries: true
    }, (err, zipfile) => {
      if (err != null) {
        reject(err);
        return;
      }
      zipfile.on('entry', entry => {
        const filePath = _path.default.resolve(destDir, entry.fileName);
        if (!filePath.startsWith(resolvedDest + _path.default.sep) && filePath !== resolvedDest) {
          reject(new Error(`Zip entry escapes destination: ${entry.fileName}`));
          zipfile.close();
          return;
        }
        if (/\/$/.test(entry.fileName)) {
          _fs.default.mkdirSync(filePath, {
            recursive: true
          });
          zipfile.readEntry();
          return;
        }
        _fs.default.mkdirSync(_path.default.dirname(filePath), {
          recursive: true
        });
        zipfile.openReadStream(entry, (streamErr, stream) => {
          if (streamErr != null) {
            zipfile.close();
            reject(streamErr);
            return;
          }
          const writeStream = _fs.default.createWriteStream(filePath);
          stream.on('error', e => {
            zipfile.close();
            reject(e);
          });
          writeStream.on('error', e => {
            zipfile.close();
            reject(e);
          });
          writeStream.on('finish', () => zipfile.readEntry());
          stream.pipe(writeStream);
        });
      });
      zipfile.on('error', reject);
      zipfile.on('end', resolve);
      zipfile.readEntry();
    });
  });
}
const _STAFF_DEV_TOOLS_DIR = 'staff_dev_tools_module';
const _STAFF_DEV_TOOLS_KEY = exports._STAFF_DEV_TOOLS_KEY = 'ENABLE_STAFF_DEV_TOOLS_BUNDLE';
const _STAFF_DEV_TOOLS_ACTIVE_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAIoaTnSgNjloxqzHKGBXIp0F7JX3AaZKZCocqMBpSi/A=
-----END PUBLIC KEY-----`;
const _STAFF_DEV_TOOLS_INACTIVE_PUBLIC_KEY = null;
function _verifyStaffDevToolsSignature(version, hash, signatureB64) {
  const crypto = require('crypto');
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`Invalid version format: ${version}`);
  }
  const payload = Buffer.from(`staff_dev_tools:v1:${version}:${hash.toLowerCase()}`);
  const signature = Buffer.from(signatureB64, 'base64');
  const verified = crypto.verify(null, payload, _STAFF_DEV_TOOLS_ACTIVE_PUBLIC_KEY, signature);
  if (verified) {
    return;
  }
  throw new Error('Module signature verification failed');
}
function _getRendererToken() {
  const ENCRYPTED_PREFIX = 'dQw4w9WgXcQ:';
  try {
    const stored = localStorage.getItem('token');
    if (stored == null) return null;
    const parsed = JSON.parse(stored);
    if (parsed == null) return null;
    if (typeof parsed === 'string' && parsed.startsWith(ENCRYPTED_PREFIX)) {
      var _window$DiscordNative, _window$DiscordNative2;
      const decrypted = (_window$DiscordNative = window.DiscordNative) === null || _window$DiscordNative === void 0 ? void 0 : (_window$DiscordNative2 = _window$DiscordNative.safeStorage) === null || _window$DiscordNative2 === void 0 ? void 0 : _window$DiscordNative2.decryptString(parsed.substring(ENCRYPTED_PREFIX.length));
      return decrypted ?? null;
    }
    return parsed;
  } catch (_e) {}
  return null;
}
async function waitForRendererToken(window, maxAttempts = 10, intervalMs = 2000) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (window.isDestroyed()) {
      return null;
    }
    const token = await window.webContents.executeJavaScript(`(${_getRendererToken.toString()})()`, true);
    if (token != null) {
      return token;
    }
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
  return null;
}
let _staffDevToolsLoading = null;
let _staffDevToolsModule = null;
async function tryLoadStaffDevToolsModule(mainWindow, webappEndpoint) {
  if (mainWindow == null || mainWindow.isDestroyed()) {
    return;
  }
  if (_staffDevToolsModule != null) {
    try {
      _staffDevToolsModule.installBridge();
      void mainWindow.webContents.executeJavaScript(`console.log('[STAFF_DEV_TOOLS] Module loaded successfully')`);
    } catch (e) {
      const sentry = _crashReporterSetup.crashReporterSetup.getGlobalSentry();
      sentry === null || sentry === void 0 ? void 0 : sentry.captureException(e instanceof Error ? e : new Error(`[STAFF_DEV_TOOLS] Bridge reinstall failed: ${e}`));
    }
    return;
  }
  if (_staffDevToolsLoading != null) {
    await _staffDevToolsLoading;
    return;
  }
  _staffDevToolsLoading = _tryLoadStaffDevToolsModuleImpl(mainWindow, webappEndpoint);
  try {
    await _staffDevToolsLoading;
  } finally {
    _staffDevToolsLoading = null;
  }
}
async function _tryLoadStaffDevToolsModuleImpl(mainWindow, webappEndpoint) {
  const token = await waitForRendererToken(mainWindow);
  if (token == null) {
    return;
  }
  const userDataPath = _paths.paths.getUserData();
  if (userDataPath == null) {
    return;
  }
  const staffDevToolsBasePath = _path.default.join(userDataPath, _STAFF_DEV_TOOLS_DIR);
  const versionFilePath = _path.default.join(staffDevToolsBasePath, 'version.json');
  const fetchFromWorker = (urlPath, authToken, mode) => {
    const parsedUrl = new _url.default.URL(urlPath, webappEndpoint);
    const isHttps = parsedUrl.protocol === 'https:';
    const httpModule = isHttps ? require('https') : require('http');
    return new Promise((resolve, reject) => {
      const req = httpModule.request({
        hostname: parsedUrl.hostname,
        port: parsedUrl.port !== '' ? parsedUrl.port : isHttps ? 443 : 80,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        headers: {
          Authorization: authToken
        }
      }, res => {
        res.on('error', reject);
        if (mode === 'buffer') {
          const chunks = [];
          res.on('data', chunk => {
            chunks.push(chunk);
          });
          res.on('end', () => {
            if (res.statusCode !== 200) {
              reject(new Error(`Worker ${parsedUrl.pathname}: HTTP ${res.statusCode}`));
              return;
            }
            resolve(Buffer.concat(chunks));
          });
        } else {
          res.setEncoding('utf8');
          let data = '';
          res.on('data', chunk => {
            data += chunk;
          });
          res.on('end', () => {
            if (res.statusCode !== 200) {
              reject(new Error(`Worker ${parsedUrl.pathname}: HTTP ${res.statusCode}`));
              return;
            }
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          });
        }
      });
      req.on('error', reject);
      req.end();
    });
  };
  let activeHash = null;
  try {
    const remoteVersion = await fetchFromWorker('/__development/staff_dev_tools/version', token, 'json');
    activeHash = remoteVersion.hash ?? null;
    if (activeHash == null || typeof activeHash !== 'string' || !/^[a-f0-9]{64}$/.test(activeHash)) {
      throw new Error('Version endpoint returned invalid hash');
    }
    _verifyStaffDevToolsSignature(remoteVersion.version, remoteVersion.hash, remoteVersion.signature);
    const versionedModulePath = _path.default.join(staffDevToolsBasePath, `discord_staff_dev_tools_${activeHash}`);
    if (!_fs.default.existsSync(_path.default.join(versionedModulePath, 'package.json'))) {
      const zipBuffer = await fetchFromWorker(`/__development/staff_dev_tools/module?hash=${activeHash}`, token, 'buffer');
      const crypto = require('crypto');
      const actualHash = crypto.createHash('sha256').update(zipBuffer).digest('hex');
      if (actualHash !== activeHash) {
        throw new Error(`Hash mismatch: expected ${activeHash}, got ${actualHash}`);
      }
      const tmpModulePath = versionedModulePath + '_tmp';
      try {
        _fs.default.rmSync(tmpModulePath, {
          recursive: true,
          force: true
        });
        _fs.default.mkdirSync(tmpModulePath, {
          recursive: true
        });
        await extractZip(zipBuffer, tmpModulePath);
        _fs.default.renameSync(tmpModulePath, versionedModulePath);
      } catch (extractErr) {
        _fs.default.rmSync(tmpModulePath, {
          recursive: true,
          force: true
        });
        throw extractErr;
      }
    }
    _fs.default.writeFileSync(versionFilePath, JSON.stringify(remoteVersion));
    try {
      for (const entry of _fs.default.readdirSync(staffDevToolsBasePath)) {
        if (entry.startsWith('discord_staff_dev_tools_') && entry !== `discord_staff_dev_tools_${activeHash}`) {
          _fs.default.rmSync(_path.default.join(staffDevToolsBasePath, entry), {
            recursive: true,
            force: true
          });
        }
      }
    } catch (_e) {}
  } catch (e) {
    activeHash = null;
    const sentry = _crashReporterSetup.crashReporterSetup.getGlobalSentry();
    sentry === null || sentry === void 0 ? void 0 : sentry.captureMessage(`[STAFF_DEV_TOOLS] Remote update failed: ${e instanceof Error ? e.message : e}`);
  }
  if (activeHash == null) {
    try {
      const cachedVersion = JSON.parse(_fs.default.readFileSync(versionFilePath, 'utf-8'));
      activeHash = cachedVersion.hash ?? null;
      if (activeHash == null || typeof activeHash !== 'string' || !/^[a-f0-9]{64}$/.test(activeHash)) {
        return;
      }
      _verifyStaffDevToolsSignature(cachedVersion.version, cachedVersion.hash, cachedVersion.signature);
    } catch (_e) {
      return;
    }
  }
  const staffDevToolsModulePath = _path.default.join(staffDevToolsBasePath, `discord_staff_dev_tools_${activeHash}`);
  if (!_fs.default.existsSync(_path.default.join(staffDevToolsModulePath, 'package.json'))) {
    return;
  }
  try {
    const discordStaffDevTools = require(staffDevToolsModulePath);
    discordStaffDevTools.init();
    discordStaffDevTools.installBridge();
    global.features.declareSupported('staff_dev_tools');
    _staffDevToolsModule = discordStaffDevTools;
    if (!mainWindow.isDestroyed()) {
      void mainWindow.webContents.executeJavaScript(`console.log('[STAFF_DEV_TOOLS] Module loaded successfully')`);
    }
  } catch (e) {
    const sentry = _crashReporterSetup.crashReporterSetup.getGlobalSentry();
    sentry === null || sentry === void 0 ? void 0 : sentry.captureException(e instanceof Error ? e : new Error(`[STAFF_DEV_TOOLS] Module load failed: ${e}`));
  }
}