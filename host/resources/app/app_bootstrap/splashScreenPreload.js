"use strict";

var _electron = require("electron");
var _securityUtils = require("../common/securityUtils");
var _buildInfo = _interopRequireDefault(require("./buildInfo"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LINUX_DOWNLOAD_URL_BASE = `https://discord.com/api/download/${_buildInfo.default.releaseChannel}?platform=linux&format=`;
const DOWNLOAD_OPTIONS = [{
  value: 'deb',
  label: 'Ubuntu (deb)'
}, {
  value: 'tar.gz',
  label: 'Linux (tar.gz)'
}, {
  value: 'nope',
  label: "I'll figure it out"
}];
function shouldShowProgress(state) {
  return typeof state.progress === 'number' && (state.status === 'downloading-updates' || state.status === 'installing-updates');
}
let countdownInterval = null;
let currentState = {};
let domReady = false;
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
  const options = DOWNLOAD_OPTIONS.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
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
  const progress = shouldShowProgress(state) ? `<div class="progress"><div class="progress-bar"><div class="complete" style="width: ${Number(state.progress)}%"></div></div></div>` : '<div class="progress-placeholder">&nbsp;</div>';
  return `<div id="splash">
    <div class="splash-inner">
      <video autoplay width="200" height="200" loop id="splash-video">
        <source src="./videos/connecting.webm" type="video/webm" />
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
  if (currentLayout !== 'splash') return false;
  const statusEl = document.querySelector('.splash-status');
  if (statusEl == null) return false;
  statusEl.textContent = getStatusText(state);
  const splashText = statusEl.closest('.splash-text');
  if (splashText != null) {
    const existing = splashText.querySelector('.progress, .progress-placeholder');
    if (shouldShowProgress(state)) {
      const newProgress = createProgressElement(state.progress);
      if (existing != null) {
        existing.replaceWith(newProgress);
      } else {
        splashText.appendChild(newProgress);
      }
    } else if (existing != null && !existing.classList.contains('progress-placeholder')) {
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
  if (mount == null) return;
  if (state.status === 'update-manually') {
    currentLayout = 'update-manually';
    mount.innerHTML = renderUpdateManually(state, buildOverride);
    bindManualUpdateEvents();
    return;
  }
  if (updateSplashInPlace(state)) return;
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
  btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
    const quit = () => _electron.ipcRenderer.send('DISCORD_SPLASH_SCREEN_QUIT');
    if (selectedDownload !== 'nope') {
      (0, _securityUtils.saferShellOpenExternal)(LINUX_DOWNLOAD_URL_BASE + selectedDownload).then(quit, quit);
    } else {
      quit();
    }
  });
  bindBuildOverrideEvents();
}
function bindBuildOverrideEvents() {
  const clearBtn = document.getElementById('build-override-clear');
  clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener('click', () => {
    void _electron.ipcRenderer.invoke('DISCORD_CLEAR_BUILD_OVERRIDE').then(success => {
      console.log(`clearBuildOverride: cookie cleared ${success}`);
      _electron.ipcRenderer.send('DISCORD_SPLASH_SCREEN_QUIT');
    }).catch(error => {
      console.error('Error clearing build override cookie:', error);
    });
  });
}
_electron.ipcRenderer.on('DISCORD_SPLASH_UPDATE_STATE', (_, state) => {
  console.log(`splashScreenPreload: onStateUpdate: ${JSON.stringify(state)}`);
  currentState = state;
  if (domReady) {
    startCountdown();
    renderSplash(state);
  }
});
_electron.ipcRenderer.on('DISCORD_SPLASH_SCREEN_QUOTE', () => {});
void _electron.ipcRenderer.invoke('DISCORD_GET_BUILD_OVERRIDE_STATUS').then(override => {
  if (override != null) {
    buildOverride = override;
    if (domReady) {
      currentLayout = null;
      renderSplash(currentState);
    }
  }
}).catch(error => {
  console.error('Error fetching build override status:', error);
});
window.addEventListener('DOMContentLoaded', () => {
  domReady = true;
  if (currentState.status != null) {
    startCountdown();
  }
  renderSplash(currentState.status != null ? currentState : {
    status: 'checking-for-updates'
  });
  console.log('splashScreenPreload: signalReady');
  _electron.ipcRenderer.send('DISCORD_SPLASH_SCREEN_READY');
});