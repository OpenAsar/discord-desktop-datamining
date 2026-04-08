(() => {
"use strict";
var __webpack_modules__ = ({
28539(module, __unused_rspack_exports, __webpack_require__) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(__webpack_require__(16928));
const buildInfo = require(path_1.default.join(process.resourcesPath, 'build_info.json'));
module.exports = buildInfo;


},
6951(__unused_rspack_module, exports, __webpack_require__) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(91288);
const securityUtils_1 = __webpack_require__(67445);
const buildInfo_1 = __importDefault(__webpack_require__(28539));
const LINUX_DOWNLOAD_URL_BASE = `https://discord.com/api/download/${buildInfo_1.default.releaseChannel}?platform=linux&format=`;
const DOWNLOAD_OPTIONS = [
    { value: 'deb', label: 'Ubuntu (deb)' },
    { value: 'tar.gz', label: 'Linux (tar.gz)' },
    { value: 'nope', label: "I'll figure it out" },
];
let countdownInterval = null;
let currentState = {};
function clearCountdown() {
    if (countdownInterval != null) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}
function startCountdown() {
    clearCountdown();
    countdownInterval = setInterval(() => {
        if (currentState.seconds != null && currentState.seconds > 0) {
            currentState.seconds -= 1;
            renderSplash(currentState);
        }
    }, 1000);
}
function createProgressElement(percent) {
    const progress = document.createElement('div');
    progress.className = 'progress';
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    const complete = document.createElement('div');
    complete.className = 'complete';
    complete.style.width = `${percent}%`;
    bar.appendChild(complete);
    progress.appendChild(bar);
    return progress;
}
function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
function renderBuildOverride(override) {
    return `<div class="splash-text splash-build-override">
    <span>Override: ${escapeHtml(override)}</span>
    <button class="build-override-clear-button" id="build-override-clear">clear?</button>
  </div>`;
}
function renderUpdateManually(state, override) {
    const options = DOWNLOAD_OPTIONS.map((opt) => `<option value="${opt.value}">${opt.label}</option>`).join('');
    return `<div id="splash">
    <div class="splash-inner-dl">
      <div class="dice-image"></div>
      <div class="dl-update-message">Must be your lucky day, there's a new update!</div>
      <div class="dl-select-frame">
        <div class="dl-select">
          <select id="dl-select-input">${options}</select>
        </div>
        <div class="dl-button" id="dl-button">${selectedDownload !== 'nope' ? 'Download' : 'Okay'}</div>
      </div>
      <div class="dl-version-message">Version ${escapeHtml(state.newVersion ?? '')} available</div>
    </div>
    ${override != null ? renderBuildOverride(override) : ''}
  </div>`;
}
function renderSplashHtml(state) {
    const progress = typeof state.progress === 'number'
        ? `<div class="progress"><div class="progress-bar"><div class="complete" style="width: ${Number(state.progress)}%"></div></div></div>`
        : '<div class="progress-placeholder">&nbsp;</div>';
    return `<div id="splash">
    <div class="splash-inner">
      <video autoplay width="200" height="200" loop id="splash-video">
        <source src="../videos/connecting.webm" type="video/webm" />
      </video>
      <div class="splash-text">
        <span class="splash-status">${getStatusText(state)}</span>
        ${progress}
      </div>
      ${buildOverride != null ? renderBuildOverride(buildOverride) : ''}
    </div>
  </div>`;
}
let selectedDownload = 'deb';
let buildOverride;
let currentLayout = null;
function getStatusText(state) {
    switch (state.status) {
        case 'installing-updates':
            return `Installing update ${Number(state.current ?? 0)} of ${Number(state.total ?? 0)}\u2026`;
        case 'downloading-updates':
            return `Downloading update ${Number(state.current ?? 0)} of ${Number(state.total ?? 0)}\u2026`;
        case 'update-failure':
            return `Update failed \u2014 retrying in ${Number(state.seconds ?? 0)} sec\u2026`;
        case 'launching':
            return 'Starting\u2026';
        case 'checking-for-updates':
        default:
            return 'Checking for updates\u2026';
    }
}
function updateSplashInPlace(state) {
    if (currentLayout !== 'splash')
        return false;
    const statusEl = document.querySelector('.splash-status');
    if (statusEl == null)
        return false;
    statusEl.textContent = getStatusText(state);
    const splashText = statusEl.closest('.splash-text');
    if (splashText != null) {
        const existing = splashText.querySelector('.progress, .progress-placeholder');
        if (typeof state.progress === 'number') {
            const newProgress = createProgressElement(state.progress);
            if (existing != null) {
                existing.replaceWith(newProgress);
            }
            else {
                splashText.appendChild(newProgress);
            }
        }
        else if (existing != null && !existing.classList.contains('progress-placeholder')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'progress-placeholder';
            placeholder.textContent = '\u00a0';
            existing.replaceWith(placeholder);
        }
    }
    return true;
}
function renderSplash(state) {
    const mount = document.getElementById('splash-mount');
    if (mount == null)
        return;
    if (state.status === 'update-manually') {
        currentLayout = 'update-manually';
        mount.innerHTML = renderUpdateManually(state, buildOverride);
        bindManualUpdateEvents();
        return;
    }
    if (updateSplashInPlace(state))
        return;
    currentLayout = 'splash';
    mount.innerHTML = renderSplashHtml(state);
    bindVideoEvents();
    bindBuildOverrideEvents();
}
function bindVideoEvents() {
    const video = document.getElementById('splash-video');
    if (video != null) {
        video.addEventListener('loadeddata', () => {
            video.classList.add('loaded');
        });
    }
}
function bindManualUpdateEvents() {
    const select = document.getElementById('dl-select-input');
    if (select != null) {
        select.value = selectedDownload;
        select.addEventListener('change', () => {
            selectedDownload = select.value;
            const btn = document.getElementById('dl-button');
            if (btn != null) {
                btn.textContent = selectedDownload !== 'nope' ? 'Download' : 'Okay';
            }
        });
    }
    const btn = document.getElementById('dl-button');
    if (btn != null) {
        btn.addEventListener('click', () => {
            if (selectedDownload !== 'nope') {
                void (0, securityUtils_1.saferShellOpenExternal)(LINUX_DOWNLOAD_URL_BASE + selectedDownload);
            }
            electron_1.ipcRenderer.send('DISCORD_SPLASH_SCREEN_QUIT');
        });
    }
    bindBuildOverrideEvents();
}
function bindBuildOverrideEvents() {
    const clearBtn = document.getElementById('build-override-clear');
    if (clearBtn != null) {
        clearBtn.addEventListener('click', () => {
            void electron_1.ipcRenderer
                .invoke('DISCORD_CLEAR_BUILD_OVERRIDE')
                .then((success) => {
                console.log(`clearBuildOverride: cookie cleared ${success}`);
                electron_1.ipcRenderer.send('DISCORD_SPLASH_SCREEN_QUIT');
            })
                .catch((error) => {
                console.error('Error clearing build override cookie:', error);
            });
        });
    }
}
let domReady = false;
electron_1.ipcRenderer.on('DISCORD_SPLASH_UPDATE_STATE', (_, state) => {
    console.log(`splashScreenPreload: onStateUpdate: ${JSON.stringify(state)}`);
    currentState = state;
    if (domReady) {
        startCountdown();
        renderSplash(state);
    }
});
electron_1.ipcRenderer.on('DISCORD_SPLASH_SCREEN_QUOTE', (_, _quote) => {
});
void electron_1.ipcRenderer
    .invoke('DISCORD_GET_BUILD_OVERRIDE_STATUS')
    .then((override) => {
    if (override != null) {
        buildOverride = override;
        if (domReady) {
            renderSplash(currentState);
        }
    }
})
    .catch((error) => {
    console.error('Error fetching build override status:', error);
});
window.addEventListener('DOMContentLoaded', () => {
    domReady = true;
    if (currentState.status != null) {
        startCountdown();
    }
    renderSplash(currentState.status != null ? currentState : { status: 'checking-for-updates' });
    console.log('splashScreenPreload: signalReady');
    electron_1.ipcRenderer.send('DISCORD_SPLASH_SCREEN_READY');
});


},
67445(__unused_rspack_module, exports, __webpack_require__) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shouldOpenExternalUrl = shouldOpenExternalUrl;
exports.saferShellOpenExternal = saferShellOpenExternal;
exports.checkUrlOriginMatches = checkUrlOriginMatches;
const electron_1 = __webpack_require__(91288);
const url_1 = __importDefault(__webpack_require__(87016));
const BLOCKED_URL_PROTOCOLS = [
    'file:',
    'javascript:',
    'vbscript:',
    'data:',
    'about:',
    'chrome:',
    'ms-cxh:',
    'ms-cxh-full:',
    'ms-word:',
];
function shouldOpenExternalUrl(externalUrl) {
    let parsedUrl;
    try {
        parsedUrl = url_1.default.parse(externalUrl);
    }
    catch (_) {
        return false;
    }
    if (parsedUrl.protocol == null || BLOCKED_URL_PROTOCOLS.includes(parsedUrl.protocol.toLowerCase())) {
        return false;
    }
    return true;
}
function saferShellOpenExternal(externalUrl) {
    if (shouldOpenExternalUrl(externalUrl)) {
        return electron_1.shell.openExternal(externalUrl);
    }
    else {
        return Promise.reject(new Error('External url open request blocked'));
    }
}
function checkUrlOriginMatches(urlA, urlB) {
    let parsedUrlA;
    let parsedUrlB;
    try {
        parsedUrlA = url_1.default.parse(urlA);
        parsedUrlB = url_1.default.parse(urlB);
    }
    catch (_) {
        return false;
    }
    return (parsedUrlA.protocol === parsedUrlB.protocol
        && parsedUrlA.slashes === parsedUrlB.slashes
        && parsedUrlA.host === parsedUrlB.host);
}


},
91288(module) {
module.exports = require("electron");

},
16928(module) {
module.exports = require("path");

},
87016(module) {
module.exports = require("url");

},

});
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

// startup
// Load entry module and return exports
// This entry module is referenced by other modules so it can't be inlined
var __webpack_exports__ = __webpack_require__(6951);
module.exports = __webpack_exports__;
})()
;