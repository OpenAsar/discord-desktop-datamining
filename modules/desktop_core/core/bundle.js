(() => {
var __webpack_modules__ = ({
1783(module, __unused_rspack_exports, __webpack_require__) {
var map = {
  "./": "7034",
  "./darwin": "8307",
  "./darwin.js": "8307",
  "./index": "7034",
  "./index.js": "7034",
  "./linux": "4832",
  "./linux.js": "4832",
  "./win32": "6673",
  "./win32.js": "6673"
};


function __rspack_context(req) {
  var id = __rspack_context_resolve(req);
  return __webpack_require__(id);
}
function __rspack_context_resolve(req) {
  if(!__webpack_require__.o(map, req)) {
    var e = new Error("Cannot find module '" + req + "'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
  }
  return map[req];
}
__rspack_context.keys = function webpackContextKeys() {
  return Object.keys(map);
};
__rspack_context.resolve = __rspack_context_resolve;
module.exports = __rspack_context;
__rspack_context.id = 1783;


},
8554(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IPCEvents = void 0;
var IPCEvents;
(function (IPCEvents) {
    IPCEvents["ACCESSIBILITY_GET_ENABLED"] = "DISCORD_ACCESSIBILITY_GET_ENABLED";
    IPCEvents["APP_ASYNC_INDEX_TSX_LOADED"] = "DISCORD_APP_ASYNC_INDEX_TSX_LOADED";
    IPCEvents["APP_BADGE_SET"] = "DISCORD_APP_BADGE_SET";
    IPCEvents["APP_GET_RELEASE_CHANNEL_SYNC"] = "DISCORD_APP_GET_RELEASE_CHANNEL_SYNC";
    IPCEvents["APP_GET_HOST_VERSION_SYNC"] = "DISCORD_APP_GET_HOST_VERSION_SYNC";
    IPCEvents["APP_GET_ANALYTICS_EVENTS"] = "DISCORD_APP_GET_ANALYTICS_EVENTS";
    IPCEvents["APP_GET_BUILD_NUMBER"] = "DISCORD_APP_GET_BUILD_NUMBER";
    IPCEvents["APP_GET_ARCH"] = "DISCORD_APP_GET_ARCH";
    IPCEvents["APP_GET_MODULE_VERSIONS"] = "DISCORD_APP_GET_MODULE_VERSIONS";
    IPCEvents["APP_GET_PATH"] = "DISCORD_APP_GET_PATH";
    IPCEvents["APP_SET_BADGE_COUNT"] = "DISCORD_APP_SET_BADGE_COUNT";
    IPCEvents["APP_DOCK_SET_BADGE"] = "DISCORD_APP_DOCK_SET_BADGE";
    IPCEvents["APP_DOCK_BOUNCE"] = "DISCORD_APP_DOCK_BOUNCE";
    IPCEvents["APP_DOCK_CANCEL_BOUNCE"] = "DISCORD_APP_DOCK_CANCEL_BOUNCE";
    IPCEvents["APP_LOADED"] = "DISCORD_APP_LOADED";
    IPCEvents["APP_PUSH_ANALYTICS"] = "DISCORD_APP_PUSH_ANALYTICS";
    IPCEvents["APP_RELAUNCH"] = "DISCORD_APP_RELAUNCH";
    IPCEvents["APP_VIEWED"] = "DISCORD_APP_VIEWED";
    IPCEvents["APP_FIRST_RENDER_AFTER_READY_PAYLOAD"] = "DISCORD_APP_FIRST_RENDER_AFTER_READY_PAYLOAD";
    IPCEvents["APP_GET_DEFAULT_DOUBLE_CLICK_ACTION"] = "DISCORD_APP_GET_DEFAULT_DOUBLE_CLICK_ACTION";
    IPCEvents["APP_PAUSE_FRAME_EVICTOR"] = "DISCORD_APP_PAUSE_FRAME_EVICTOR";
    IPCEvents["APP_UNPAUSE_FRAME_EVICTOR"] = "DISCORD_APP_UNPAUSE_FRAME_EVICTOR";
    IPCEvents["APP_GET_PREFERRED_SYSTEM_LANGUAGES"] = "DISCORD_APP_GET_PREFERRED_SYSTEM_LANGUAGES";
    IPCEvents["APP_GET_OPEN_ON_START"] = "DISCORD_APP_GET_OPEN_ON_START";
    IPCEvents["CLIPBOARD_COPY"] = "DISCORD_CLIPBOARD_COPY";
    IPCEvents["CLIPBOARD_CUT"] = "DISCORD_CLIPBOARD_CUT";
    IPCEvents["CLIPBOARD_PASTE"] = "DISCORD_CLIPBOARD_PASTE";
    IPCEvents["LOAD_CLIP"] = "DISCORD_LOAD_CLIP";
    IPCEvents["LOAD_CLIPS_DIRECTORY"] = "DISCORD_LOAD_CLIPS_DIRECTORY";
    IPCEvents["DELETE_CLIP"] = "DISCORD_DELETE_CLIP";
    IPCEvents["CHECK_FOR_UPDATES"] = "DISCORD_CHECK_FOR_UPDATES";
    IPCEvents["DESKTOP_CAPTURER_GET_SOURCES"] = "DISCORD_DESKTOP_CAPTURER_GET_SOURCES";
    IPCEvents["CONSTANTS_GET"] = "DISCORD_CONSTANTS_GET";
    IPCEvents["CRASH_REPORTER_UPDATE_METADATA"] = "DISCORD_CRASH_REPORTER_UPDATE_METADATA";
    IPCEvents["CRASH_REPORTER_NEW_CRASH"] = "DISCORD_CRASH_REPORTER_NEW_CRASH";
    IPCEvents["FEATURES_GET_BROWSER_FEATURES"] = "DISCORD_FEATURES_GET_BROWSER_FEATURES";
    IPCEvents["FILE_MANAGER_GET_MODULE_PATH"] = "DISCORD_FILE_MANAGER_GET_MODULE_PATH";
    IPCEvents["FILE_MANAGER_GET_MODULE_DATA_PATH_SYNC"] = "DISCORD_FILE_MANAGER_GET_MODULE_DATA_PATH_SYNC";
    IPCEvents["FILE_MANAGER_GET_MODULE_LOG_PATH"] = "DISCORD_FILE_MANAGER_GET_MODULE_LOG_PATH_SYNC";
    IPCEvents["FILE_MANAGER_GET_MODULE_LOG_PATH_SYNC"] = "DISCORD_FILE_MANAGER_GET_MODULE_LOG_PATH_SYNC";
    IPCEvents["FILE_MANAGER_GET_ASSET_CACHE_PATH"] = "DISCORD_FILE_MANAGER_GET_ASSET_CACHE_PATH";
    IPCEvents["FILE_MANAGER_GET_ASSET_CACHE_PATH_SYNC"] = "DISCORD_FILE_MANAGER_GET_ASSET_CACHE_PATH_SYNC";
    IPCEvents["FILE_MANAGER_SHOW_SAVE_DIALOG"] = "DISCORD_FILE_MANAGER_SHOW_SAVE_DIALOG";
    IPCEvents["FILE_MANAGER_SHOW_OPEN_DIALOG"] = "DISCORD_FILE_MANAGER_SHOW_OPEN_DIALOG";
    IPCEvents["FILE_MANAGER_SHOW_ITEM_IN_FOLDER"] = "DISCORD_FILE_MANAGER_SHOW_ITEM_IN_FOLDER";
    IPCEvents["GPU_SETTINGS_SET_ENABLE_HWACCEL"] = "DISCORD_GPU_SETTINGS_SET_ENABLE_HWACCEL";
    IPCEvents["GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC"] = "DISCORD_GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC";
    IPCEvents["GPU_SETTINGS_SET_CHROMIUM_SWITCHES"] = "DISCORD_GPU_SETTINGS_SET_CHROMIUM_SWITCHES";
    IPCEvents["GPU_SETTINGS_SET_SETTING"] = "DISCORD_GPU_SETTINGS_SET_SETTING";
    IPCEvents["HARDWARE_GET_DISPLAY_COUNT"] = "DISCORD_HARDWARE_GET_DISPLAY_COUNT";
    IPCEvents["INTENTS_SET_ACTIVITY"] = "DISCORD_INTENTS_SET_ACTIVITY";
    IPCEvents["INTENTS_RESIGN_ACTIVITY"] = "DISCORD_INTENTS_RESIGN_ACTIVITY";
    IPCEvents["NATIVE_MODULES_GET_PATHS"] = "DISCORD_NATIVE_MODULES_GET_PATHS";
    IPCEvents["NATIVE_MODULES_INSTALL"] = "DISCORD_NATIVE_MODULES_INSTALL";
    IPCEvents["NATIVE_MODULES_FINISH_UPDATER_BOOTSTRAP"] = "DISCORD_NATIVE_MODULES_FINISH_UPDATER_BOOTSTRAP";
    IPCEvents["NATIVE_MODULES_GET_HAS_NEW_UPDATER"] = "DISCORD_NATIVE_MODULES_GET_HAS_NEW_UPDATER";
    IPCEvents["NAVIGATION_HISTORY_CLEAR"] = "DISCORD_NAVIGATION_HISTORY_CLEAR";
    IPCEvents["NOTIFICATION_CLOSE"] = "DISCORD_NOTIFICATION_CLOSE";
    IPCEvents["NOTIFICATION_SHOW"] = "DISCORD_NOTIFICATION_SHOW";
    IPCEvents["NOTIFICATIONS_CLEAR"] = "DISCORD_NOTIFICATIONS_CLEAR";
    IPCEvents["NOTIFICATIONS_GET_AUTHORIZATION"] = "DISCORD_NOTIFICATIONS_GET_AUTHORIZATION";
    IPCEvents["NOTIFICATIONS_GET_SETTINGS"] = "DISCORD_NOTIFICATIONS_GET_SETTINGS";
    IPCEvents["NOTIFICATIONS_SEND_NOTIFICATION"] = "DISCORD_NOTIFICATIONS_SEND_NOTIFICATION";
    IPCEvents["NOTIFICATIONS_REMOVE_NOTIFICATIONS"] = "DISCORD_NOTIFICATIONS_REMOVE_NOTIFICATIONS";
    IPCEvents["NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS"] = "DISCORD_NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS";
    IPCEvents["NOTIFICATIONS_RECEIVED_RESPONSE"] = "DISCORD_NOTIFICATIONS_RECEIVED_RESPONSE";
    IPCEvents["REQUEST_OPEN_EXTERNAL_URL"] = "DISCORD_REQUEST_OPEN_EXTERNAL_URL";
    IPCEvents["OPEN_EXTERNAL_URL"] = "DISCORD_OPEN_EXTERNAL_URL";
    IPCEvents["POWER_MONITOR_RESUME"] = "DISCORD_POWER_MONITOR_RESUME";
    IPCEvents["POWER_MONITOR_SUSPEND"] = "DISCORD_POWER_MONITOR_SUSPEND";
    IPCEvents["POWER_MONITOR_LOCK_SCREEN"] = "DISCORD_POWER_MONITOR_LOCK_SCREEN";
    IPCEvents["POWER_MONITOR_UNLOCK_SCREEN"] = "DISCORD_POWER_MONITOR_UNLOCK_SCREEN";
    IPCEvents["POWER_MONITOR_GET_SYSTEM_IDLE_TIME"] = "DISCORD_POWER_MONITOR_GET_SYSTEM_IDLE_TIME";
    IPCEvents["POWER_SAVE_BLOCKER_BLOCK_DISPLAY_SLEEP"] = "DISCORD_POWER_SAVE_BLOCKER_BLOCK_DISPLAY_SLEEP";
    IPCEvents["POWER_SAVE_BLOCKER_UNBLOCK_DISPLAY_SLEEP"] = "DISCORD_POWER_SAVE_BLOCKER_UNBLOCK_DISPLAY_SLEEP";
    IPCEvents["POWER_SAVE_BLOCKER_CLEANUP_DISPLAY_SLEEP"] = "DISCORD_POWER_SAVE_BLOCKER_CLEANUP_DISPLAY_SLEEP";
    IPCEvents["PROCESS_UTILS_GET_CPU_USAGE"] = "DISCORD_PROCESS_UTILS_GET_CPU_USAGE";
    IPCEvents["PROCESS_UTILS_FLUSH_DNS_CACHE"] = "DISCORD_PROCESS_UTILS_FLUSH_DNS_CACHE";
    IPCEvents["PROCESS_UTILS_FLUSH_COOKIES"] = "DISCORD_PROCESS_UTILS_FLUSH_COOKIES";
    IPCEvents["PROCESS_UTILS_FLUSH_STORAGE_DATA"] = "DISCORD_PROCESS_UTILS_FLUSH_STORAGE_DATA";
    IPCEvents["PROCESS_UTILS_GET_MAIN_ARGV_SYNC"] = "DISCORD_PROCESS_UTILS_GET_MAIN_ARGV_SYNC";
    IPCEvents["PROCESS_UTILS_GET_LAST_CRASH"] = "DISCORD_PROCESS_UTILS_GET_LAST_CRASH";
    IPCEvents["PROCESS_UTILS_SET_CRASH_REASON"] = "DISCORD_PROCESS_UTILS_SET_CRASH_REASON";
    IPCEvents["PROCESS_UTILS_SET_CRASH_INFORMATION"] = "DISCORD_PROCESS_UTILS_SET_CRASH_INFORMATION";
    IPCEvents["PROCESS_UTILS_SET_MEMORY_INFORMATION"] = "DISCORD_PROCESS_UTILS_SET_MEMORY_INFORMATION";
    IPCEvents["PROCESS_UTILS_GET_SYSTEM_INFO"] = "DISCORD_PROCESS_UTILS_GET_SYSTEM_INFO";
    IPCEvents["PROCESS_UTILS_GET_GPU_PROCESS_ID"] = "DISCORD_PROCESS_UTILS_GET_GPU_PROCESS_ID";
    IPCEvents["PROCESS_UTILS_GET_SYSTEM_METRICS"] = "DISCORD_PROCESS_UTILS_GET_SYSTEM_METRICS";
    IPCEvents["QUIT_AND_INSTALL"] = "DISCORD_QUIT_AND_INSTALL";
    IPCEvents["SAFE_STORAGE_DECRYPT_STRING"] = "DISCORD_SAFE_STORAGE_DECRYPT_STRING";
    IPCEvents["SAFE_STORAGE_ENCRYPT_STRING"] = "DISCORD_SAFE_STORAGE_ENCRYPT_STRING";
    IPCEvents["SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE"] = "DISCORD_SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE";
    IPCEvents["SEARCH_INDEX_DOMAINS"] = "DISCORD_SEARCH_INDEX_DOMAINS";
    IPCEvents["SEARCH_CLEAR_INDEX"] = "DISCORD_SEARCH_CLEAR_INDEX";
    IPCEvents["SEARCH_DELETE_DOMAINS"] = "DISCORD_SEARCH_DELETE_DOMAINS";
    IPCEvents["SEARCH_DELETE_ITEMS"] = "DISCORD_SEARCH_DELETE_ITEMS";
    IPCEvents["SETTINGS_GET"] = "DISCORD_SETTINGS_GET";
    IPCEvents["SETTINGS_SET"] = "DISCORD_SETTINGS_SET";
    IPCEvents["SETTINGS_GET_SYNC"] = "DISCORD_SETTINGS_GET_SYNC";
    IPCEvents["SETTINGS_UPDATE_BACKGROUND_COLOR"] = "DISCORD_SETTINGS_UPDATE_BACKGROUND_COLOR";
    IPCEvents["SPELLCHECK_RESULT"] = "DISCORD_SPELLCHECK_RESULT";
    IPCEvents["SPELLCHECK_REPLACE_MISSPELLING"] = "DISCORD_SPELLCHECK_REPLACE_MISSPELLING";
    IPCEvents["SPELLCHECK_GET_AVAILABLE_DICTIONARIES"] = "DISCORD_SPELLCHECK_GET_AVAILABLE_DICTIONARIES";
    IPCEvents["SPELLCHECK_SET_LOCALE"] = "DISCORD_SPELLCHECK_SET_LOCALE";
    IPCEvents["SPELLCHECK_SET_LEARNED_WORDS"] = "DISCORD_SPELLCHECK_SET_LEARNED_WORDS";
    IPCEvents["SYSTEM_TRAY_SET_ICON"] = "DISCORD_SYSTEM_TRAY_SET_ICON";
    IPCEvents["SYSTEM_TRAY_SET_APPLICATIONS"] = "DISCORD_SYSTEM_TRAY_SET_APPLICATIONS";
    IPCEvents["THUMBAR_BUTTONS_UPDATE"] = "DISCORD_THUMBAR_BUTTONS_UPDATE";
    IPCEvents["THUMBAR_BUTTONS_CLICKED"] = "DISCORD_THUMBAR_BUTTONS_CLICKED";
    IPCEvents["TOGGLE_MINIMIZE_TO_TRAY"] = "DISCORD_TOGGLE_MINIMIZE_TO_TRAY";
    IPCEvents["TOGGLE_OPEN_ON_STARTUP"] = "DISCORD_TOGGLE_OPEN_ON_STARTUP";
    IPCEvents["TOGGLE_START_MINIMIZED"] = "DISCORD_TOGGLE_START_MINIMIZED";
    IPCEvents["UPDATE_OPEN_ON_STARTUP"] = "DISCORD_UPDATE_OPEN_ON_STARTUP";
    IPCEvents["UNHANDLED_JS_EXCEPTION"] = "DISCORD_UNHANDLED_JS_EXCEPTION";
    IPCEvents["UPDATER_HISTORY_QUERY_AND_TRUNCATE"] = "DISCORD_UPDATER_HISTORY_QUERY_AND_TRUNCATE";
    IPCEvents["UPDATED_QUOTES"] = "DISCORD_UPDATED_QUOTES";
    IPCEvents["USER_DATA_CACHE_DELETE"] = "DISCORD_USER_DATA_CACHE_DELETE";
    IPCEvents["USER_DATA_CACHE_GET"] = "DISCORD_USER_DATA_CACHE_GET";
    IPCEvents["USER_DATA_CACHE_SAVE"] = "DISCORD_USER_DATA_CACHE_SAVE";
    IPCEvents["WINDOW_BLUR"] = "DISCORD_WINDOW_BLUR";
    IPCEvents["WINDOW_CLOSE"] = "DISCORD_WINDOW_CLOSE";
    IPCEvents["WINDOW_FOCUS"] = "DISCORD_WINDOW_FOCUS";
    IPCEvents["WINDOW_MAXIMIZE"] = "DISCORD_WINDOW_MAXIMIZE";
    IPCEvents["WINDOW_MINIMIZE"] = "DISCORD_WINDOW_MINIMIZE";
    IPCEvents["WINDOW_SET_MINIMUM_SIZE"] = "DISCORD_WINDOW_SET_MINIMUM_SIZE";
    IPCEvents["WINDOW_RESTORE"] = "DISCORD_WINDOW_RESTORE";
    IPCEvents["WEBAUTHN_REGISTER_MAC"] = "DISCORD_WEBAUTHN_REGISTER_MAC";
    IPCEvents["WEBAUTHN_AUTHENTICATE_MAC"] = "DISCORD_WEBAUTHN_AUTHENTICATE_MAC";
    IPCEvents["WEBAUTHN_SIGNAL_ALL_ACCEPTED_CREDENTIALS"] = "DISCORD_WEBAUTHN_SIGNAL_ALL_ACCEPTED_CREDENTIALS";
    IPCEvents["WEBAUTHN_SIGNAL_CURRENT_USER_DETAILS"] = "DISCORD_WEBAUTHN_SIGNAL_CURRENT_USER_DETAILS";
    IPCEvents["WEBAUTHN_SIGNAL_UNKNOWN_CREDENTIAL"] = "DISCORD_WEBAUTHN_SIGNAL_UNKNOWN_CREDENTIAL";
    IPCEvents["WINDOW_FLASH_FRAME"] = "DISCORD_WINDOW_FLASH_FRAME";
    IPCEvents["WINDOW_TOGGLE_FULLSCREEN"] = "DISCORD_WINDOW_TOGGLE_FULLSCREEN";
    IPCEvents["WINDOW_SET_BACKGROUND_THROTTLING"] = "DISCORD_WINDOW_SET_BACKGROUND_THROTTLING";
    IPCEvents["WINDOW_SET_PROGRESS_BAR"] = "DISCORD_WINDOW_SET_PROGRESS_BAR";
    IPCEvents["WINDOW_IS_ALWAYS_ON_TOP"] = "DISCORD_WINDOW_IS_ALWAYS_ON_TOP";
    IPCEvents["WINDOW_SET_ALWAYS_ON_TOP"] = "DISCORD_WINDOW_SET_ALWAYS_ON_TOP";
    IPCEvents["WINDOW_DEVTOOLS_OPENED"] = "DISCORD_WINDOW_DEVTOOLS_OPENED";
    IPCEvents["WINDOW_DEVTOOLS_CLOSED"] = "DISCORD_WINDOW_DEVTOOLS_CLOSED";
    IPCEvents["WINDOW_SET_CONTENT_PROTCTION"] = "DISCORD_WINDOW_SET_CONTENT_PROTCTION";
    IPCEvents["WINDOW_SET_WINDOW_CONTENT_PROTECTION"] = "DISCORD_WINDOW_SET_WINDOW_CONTENT_PROTECTION";
    IPCEvents["WINDOW_GET_NATIVE_HANDLE"] = "DISCORD_WINDOW_GET_NATIVE_HANDLE";
    IPCEvents["WINDOW_GET_MEDIA_SOURCE_ID"] = "DISCORD_WINDOW_GET_MEDIA_SOURCE_ID";
    IPCEvents["WINDOW_SET_FOCUSABLE"] = "DISCORD_WINDOW_SET_FOCUSABLE";
    IPCEvents["WINDOW_SHOW_INACTIVE"] = "DISCORD_WINDOW_SHOW_INACTIVE";
    IPCEvents["WINDOW_SET_TRAFFIC_LIGHT_POSITION"] = "DISCORD_WINDOW_SET_TRAFFIC_LIGHT_POSITION";
    IPCEvents["WINDOW_SET_FRAME_RATE"] = "DISCORD_WINDOW_SET_FRAME_RATE";
    IPCEvents["GET_MOUSE_COORDINATES"] = "DISCORD_GET_MOUSE_COORDINATES";
})(IPCEvents || (exports.IPCEvents = IPCEvents = {}));


},
7174(module, __unused_rspack_exports, __webpack_require__) {
var Buffer = (__webpack_require__(181)/* .Buffer */.Buffer);

var CRC_TABLE = [
  0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419,
  0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4,
  0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07,
  0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de,
  0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856,
  0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9,
  0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4,
  0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b,
  0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3,
  0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a,
  0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599,
  0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924,
  0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190,
  0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f,
  0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0x0f00f934, 0x9609a88e,
  0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01,
  0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed,
  0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950,
  0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3,
  0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2,
  0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a,
  0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5,
  0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010,
  0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f,
  0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17,
  0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6,
  0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615,
  0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8,
  0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1, 0xf00f9344,
  0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb,
  0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a,
  0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5,
  0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1,
  0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c,
  0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef,
  0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236,
  0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe,
  0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31,
  0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c,
  0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713,
  0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b,
  0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242,
  0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1,
  0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c,
  0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278,
  0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7,
  0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66,
  0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
  0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605,
  0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8,
  0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b,
  0x2d02ef8d
];

if (typeof Int32Array !== 'undefined') {
  CRC_TABLE = new Int32Array(CRC_TABLE);
}

function ensureBuffer(input) {
  if (Buffer.isBuffer(input)) {
    return input;
  }

  var hasNewBufferAPI =
      typeof Buffer.alloc === "function" &&
      typeof Buffer.from === "function";

  if (typeof input === "number") {
    return hasNewBufferAPI ? Buffer.alloc(input) : new Buffer(input);
  }
  else if (typeof input === "string") {
    return hasNewBufferAPI ? Buffer.from(input) : new Buffer(input);
  }
  else {
    throw new Error("input must be buffer, number, or string, received " +
                    typeof input);
  }
}

function bufferizeInt(num) {
  var tmp = ensureBuffer(4);
  tmp.writeInt32BE(num, 0);
  return tmp;
}

function _crc32(buf, previous) {
  buf = ensureBuffer(buf);
  if (Buffer.isBuffer(previous)) {
    previous = previous.readUInt32BE(0);
  }
  var crc = ~~previous ^ -1;
  for (var n = 0; n < buf.length; n++) {
    crc = CRC_TABLE[(crc ^ buf[n]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ -1);
}

function crc32() {
  return bufferizeInt(_crc32.apply(null, arguments));
}
crc32.signed = function () {
  return _crc32.apply(null, arguments);
};
crc32.unsigned = function () {
  return _crc32.apply(null, arguments) >>> 0;
};

module.exports = crc32;


},
5979(__unused_rspack_module, exports, __webpack_require__) {
var fs = __webpack_require__(9896);
var util = __webpack_require__(9023);
var stream = __webpack_require__(2203);
var Readable = stream.Readable;
var Writable = stream.Writable;
var PassThrough = stream.PassThrough;
var Pend = __webpack_require__(4135);
var EventEmitter = (__webpack_require__(4434)/* .EventEmitter */.EventEmitter);

exports.createFromBuffer = createFromBuffer;
exports.createFromFd = createFromFd;
exports.BufferSlicer = BufferSlicer;
exports.FdSlicer = FdSlicer;

util.inherits(FdSlicer, EventEmitter);
function FdSlicer(fd, options) {
  options = options || {};
  EventEmitter.call(this);

  this.fd = fd;
  this.pend = new Pend();
  this.pend.max = 1;
  this.refCount = 0;
  this.autoClose = !!options.autoClose;
}

FdSlicer.prototype.read = function(buffer, offset, length, position, callback) {
  var self = this;
  self.pend.go(function(cb) {
    fs.read(self.fd, buffer, offset, length, position, function(err, bytesRead, buffer) {
      cb();
      callback(err, bytesRead, buffer);
    });
  });
};

FdSlicer.prototype.write = function(buffer, offset, length, position, callback) {
  var self = this;
  self.pend.go(function(cb) {
    fs.write(self.fd, buffer, offset, length, position, function(err, written, buffer) {
      cb();
      callback(err, written, buffer);
    });
  });
};

FdSlicer.prototype.createReadStream = function(options) {
  return new ReadStream(this, options);
};

FdSlicer.prototype.createWriteStream = function(options) {
  return new WriteStream(this, options);
};

FdSlicer.prototype.ref = function() {
  this.refCount += 1;
};

FdSlicer.prototype.unref = function() {
  var self = this;
  self.refCount -= 1;

  if (self.refCount > 0) return;
  if (self.refCount < 0) throw new Error("invalid unref");

  if (self.autoClose) {
    fs.close(self.fd, onCloseDone);
  }

  function onCloseDone(err) {
    if (err) {
      self.emit('error', err);
    } else {
      self.emit('close');
    }
  }
};

util.inherits(ReadStream, Readable);
function ReadStream(context, options) {
  options = options || {};
  Readable.call(this, options);

  this.context = context;
  this.context.ref();

  this.start = options.start || 0;
  this.endOffset = options.end;
  this.pos = this.start;
  this.destroyed = false;
}

ReadStream.prototype._read = function(n) {
  var self = this;
  if (self.destroyed) return;

  var toRead = Math.min(self._readableState.highWaterMark, n);
  if (self.endOffset != null) {
    toRead = Math.min(toRead, self.endOffset - self.pos);
  }
  if (toRead <= 0) {
    self.destroyed = true;
    self.push(null);
    self.context.unref();
    return;
  }
  self.context.pend.go(function(cb) {
    if (self.destroyed) return cb();
    var buffer = new Buffer(toRead);
    fs.read(self.context.fd, buffer, 0, toRead, self.pos, function(err, bytesRead) {
      if (err) {
        self.destroy(err);
      } else if (bytesRead === 0) {
        self.destroyed = true;
        self.push(null);
        self.context.unref();
      } else {
        self.pos += bytesRead;
        self.push(buffer.slice(0, bytesRead));
      }
      cb();
    });
  });
};

ReadStream.prototype.destroy = function(err) {
  if (this.destroyed) return;
  err = err || new Error("stream destroyed");
  this.destroyed = true;
  this.emit('error', err);
  this.context.unref();
};

util.inherits(WriteStream, Writable);
function WriteStream(context, options) {
  options = options || {};
  Writable.call(this, options);

  this.context = context;
  this.context.ref();

  this.start = options.start || 0;
  this.endOffset = (options.end == null) ? Infinity : +options.end;
  this.bytesWritten = 0;
  this.pos = this.start;
  this.destroyed = false;

  this.on('finish', this.destroy.bind(this));
}

WriteStream.prototype._write = function(buffer, encoding, callback) {
  var self = this;
  if (self.destroyed) return;

  if (self.pos + buffer.length > self.endOffset) {
    var err = new Error("maximum file length exceeded");
    err.code = 'ETOOBIG';
    self.destroy();
    callback(err);
    return;
  }
  self.context.pend.go(function(cb) {
    if (self.destroyed) return cb();
    fs.write(self.context.fd, buffer, 0, buffer.length, self.pos, function(err, bytes) {
      if (err) {
        self.destroy();
        cb();
        callback(err);
      } else {
        self.bytesWritten += bytes;
        self.pos += bytes;
        self.emit('progress');
        cb();
        callback();
      }
    });
  });
};

WriteStream.prototype.destroy = function() {
  if (this.destroyed) return;
  this.destroyed = true;
  this.context.unref();
};

util.inherits(BufferSlicer, EventEmitter);
function BufferSlicer(buffer, options) {
  EventEmitter.call(this);

  options = options || {};
  this.refCount = 0;
  this.buffer = buffer;
  this.maxChunkSize = options.maxChunkSize || Number.MAX_SAFE_INTEGER;
}

BufferSlicer.prototype.read = function(buffer, offset, length, position, callback) {
  var end = position + length;
  var delta = end - this.buffer.length;
  var written = (delta > 0) ? delta : length;
  this.buffer.copy(buffer, offset, position, end);
  setImmediate(function() {
    callback(null, written);
  });
};

BufferSlicer.prototype.write = function(buffer, offset, length, position, callback) {
  buffer.copy(this.buffer, position, offset, offset + length);
  setImmediate(function() {
    callback(null, length, buffer);
  });
};

BufferSlicer.prototype.createReadStream = function(options) {
  options = options || {};
  var readStream = new PassThrough(options);
  readStream.destroyed = false;
  readStream.start = options.start || 0;
  readStream.endOffset = options.end;
  // by the time this function returns, we'll be done.
  readStream.pos = readStream.endOffset || this.buffer.length;

  // respect the maxChunkSize option to slice up the chunk into smaller pieces.
  var entireSlice = this.buffer.slice(readStream.start, readStream.pos);
  var offset = 0;
  while (true) {
    var nextOffset = offset + this.maxChunkSize;
    if (nextOffset >= entireSlice.length) {
      // last chunk
      if (offset < entireSlice.length) {
        readStream.write(entireSlice.slice(offset, entireSlice.length));
      }
      break;
    }
    readStream.write(entireSlice.slice(offset, nextOffset));
    offset = nextOffset;
  }

  readStream.end();
  readStream.destroy = function() {
    readStream.destroyed = true;
  };
  return readStream;
};

BufferSlicer.prototype.createWriteStream = function(options) {
  var bufferSlicer = this;
  options = options || {};
  var writeStream = new Writable(options);
  writeStream.start = options.start || 0;
  writeStream.endOffset = (options.end == null) ? this.buffer.length : +options.end;
  writeStream.bytesWritten = 0;
  writeStream.pos = writeStream.start;
  writeStream.destroyed = false;
  writeStream._write = function(buffer, encoding, callback) {
    if (writeStream.destroyed) return;

    var end = writeStream.pos + buffer.length;
    if (end > writeStream.endOffset) {
      var err = new Error("maximum file length exceeded");
      err.code = 'ETOOBIG';
      writeStream.destroyed = true;
      callback(err);
      return;
    }
    buffer.copy(bufferSlicer.buffer, writeStream.pos, 0, buffer.length);

    writeStream.bytesWritten += buffer.length;
    writeStream.pos = end;
    writeStream.emit('progress');
    callback();
  };
  writeStream.destroy = function() {
    writeStream.destroyed = true;
  };
  return writeStream;
};

BufferSlicer.prototype.ref = function() {
  this.refCount += 1;
};

BufferSlicer.prototype.unref = function() {
  this.refCount -= 1;

  if (this.refCount < 0) {
    throw new Error("invalid unref");
  }
};

function createFromBuffer(buffer, options) {
  return new BufferSlicer(buffer, options);
}

function createFromFd(fd, options) {
  return new FdSlicer(fd, options);
}


},
7014(module, exports, __webpack_require__) {
/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '4.17.21';

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Error message constants. */
  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      FUNC_ERROR_TEXT = 'Expected a function',
      INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;

  /** Used as default options for `_.truncate`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2,
      LAZY_WHILE_FLAG = 3;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

  /** Used to associate wrap methods with their bit flags. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
  ];

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      domExcTag = '[object DOMException]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]',
      weakSetTag = '[object WeakSet]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reUnescapedHtml = /[&<>"']/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.source);

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /** Used to match a single whitespace character. */
  var reWhitespace = /\s/;

  /** Used to match wrap detail comments. */
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /**
   * Used to validate the `validate` option in `_.template` variable.
   *
   * Forbids characters which could potentially change the meaning of the function argument definition:
   * - "()," (modification of function parameters)
   * - "=" (default value)
   * - "[]{}" (destructuring of function parameters)
   * - "/" (beginning of a comment)
   * - whitespace
   */
  var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Used to match
   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]",
      rsAstral = '[' + rsAstralRange + ']',
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos, 'g');

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Used to match complex or compound words. */
  var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join('|'), 'g');

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Built-in method references without a dependency on `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports =  true && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
      nodeIsDate = nodeUtil && nodeUtil.isDate,
      nodeIsMap = nodeUtil && nodeUtil.isMap,
      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
      nodeIsSet = nodeUtil && nodeUtil.isSet,
      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /*--------------------------------------------------------------------------*/

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length;

    while (length--) {
      if (iteratee(array[length], length, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.reduceRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the last element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
    var length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[--length];
    }
    while (length--) {
      accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  var asciiSize = baseProperty('length');

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  /**
   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
   * without support for iteratee shorthands, which iterates over `collection`
   * using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = key;
        return false;
      }
    });
    return result;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex(array, baseIsNaN, fromIndex);
  }

  /**
   * This function is like `baseIndexOf` except that it accepts a comparator.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (comparator(array[index], value)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (baseSum(array, iteratee) / length) : NAN;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initAccum
        ? (initAccum = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined) {
        result = result === undefined ? current : (result + current);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
   * of key-value pairs for `object` corresponding to the property names of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the key-value pairs.
   */
  function baseToPairs(object, props) {
    return arrayMap(props, function(key) {
      return [key, object[key]];
    });
  }

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim(string) {
    return string
      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;

    while (length--) {
      if (array[length] === placeholder) {
        ++result;
      }
    }
    return result;
  }

  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  var deburrLetter = basePropertyOf(deburredLetters);

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER) {
        array[index] = PLACEHOLDER;
        result[resIndex++] = index;
      }
    }
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /**
   * Converts `set` to its value-value pairs.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the value-value pairs.
   */
  function setToPairs(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = [value, value];
    });
    return result;
  }

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * A specialized version of `_.lastIndexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictLastIndexOf(array, value, fromIndex) {
    var index = fromIndex + 1;
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return index;
  }

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return hasUnicode(string)
      ? unicodeSize(string)
      : asciiSize(string);
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string)
      ? unicodeToArray(string)
      : asciiToArray(string);
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex(string) {
    var index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) {
      ++result;
    }
    return result;
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the `context` object.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Util
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // Create a suped-up `defer` in Node.js.
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  var runInContext = (function runInContext(context) {
    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

    /** Built-in constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = context['__core-js_shared__'];

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = root._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? context.Buffer : undefined,
        Symbol = context.Symbol,
        Uint8Array = context.Uint8Array,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
        symIterator = Symbol ? Symbol.iterator : undefined,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    /** Mocked built-ins. */
    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
        ctxNow = Date && Date.now !== root.Date.now && Date.now,
        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil,
        nativeFloor = Math.floor,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeIsFinite = context.isFinite,
        nativeJoin = arrayProto.join,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = Date.now,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeReverse = arrayProto.reverse;

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(context, 'DataView'),
        Map = getNative(context, 'Map'),
        Promise = getNative(context, 'Promise'),
        Set = getNative(context, 'Set'),
        WeakMap = getNative(context, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit method
     * chain sequences. Methods that operate on and return arrays, collections,
     * and functions can be chained together. Methods that retrieve a single value
     * or may return a primitive value will automatically end the chain sequence
     * and return the unwrapped value. Otherwise, the value must be unwrapped
     * with `_#value`.
     *
     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
     * enabled using `_.chain`.
     *
     * The execution of chained methods is lazy, that is, it's deferred until
     * `_#value` is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion.
     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
     * the creation of intermediate arrays and can greatly reduce the number of
     * iteratee executions. Sections of a chain sequence qualify for shortcut
     * fusion if the section is applied to an array and iteratees accept only
     * one argument. The heuristic for whether a section qualifies for shortcut
     * fusion is subject to change.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
     * `zipObject`, `zipObjectDeep`, and `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
     * `upperFirst`, `value`, and `words`
     *
     * @name _
     * @constructor
     * @category Seq
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // Returns an unwrapped value.
     * wrapped.reduce(_.add);
     * // => 6
     *
     * // Returns a wrapped value.
     * var squares = wrapped.map(square);
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    /**
     * The function whose prototype chain sequence wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable explicit method chain sequences.
     */
    function LodashWrapper(value, chainAll) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__chain__ = !!chainAll;
      this.__index__ = 0;
      this.__values__ = undefined;
    }

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        '_': lodash
      }
    };

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;
    lodash.prototype.constructor = lodash;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @constructor
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = MAX_ARRAY_LENGTH;
      this.__views__ = [];
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = copyArray(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = copyArray(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = copyArray(this.__views__);
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);

      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);

          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    // Ensure `LazyWrapper` is an instance of `baseLodash`.
    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.sample` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @returns {*} Returns the random element.
     */
    function arraySample(array) {
      var length = array.length;
      return length ? array[baseRandom(0, length - 1)] : undefined;
    }

    /**
     * A specialized version of `_.sampleSize` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function arraySampleSize(array, n) {
      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    /**
     * A specialized version of `_.shuffle` for arrays.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function arrayShuffle(array) {
      return shuffleSelf(copyArray(array));
    }

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined && !eq(object[key], value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Aggregates elements of `collection` on `accumulator` with keys transformed
     * by `iteratee` and values set by `setter`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * The base implementation of `_.at` without support for individual paths.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {string[]} paths The property paths to pick.
     * @returns {Array} Returns the picked elements.
     */
    function baseAt(object, paths) {
      var index = -1,
          length = paths.length,
          result = Array(length),
          skip = object == null;

      while (++index < length) {
        result[index] = skip ? undefined : get(object, paths[index]);
      }
      return result;
    }

    /**
     * The base implementation of `_.clamp` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     */
    function baseClamp(number, lower, upper) {
      if (number === number) {
        if (upper !== undefined) {
          number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
      }

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    /**
     * The base implementation of `_.conforms` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     */
    function baseConforms(source) {
      var props = keys(source);
      return function(object) {
        return baseConformsTo(object, source, props);
      };
    }

    /**
     * The base implementation of `_.conformsTo` which accepts `props` to check.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     */
    function baseConformsTo(object, source, props) {
      var length = props.length;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (length--) {
        var key = props[length],
            predicate = source[key],
            value = object[key];

        if ((value === undefined && !(key in object)) || !predicate(value)) {
          return false;
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts `args`
     * to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Array} args The arguments to provide to `func`.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          isCommon = true,
          length = array.length,
          result = [],
          valuesLength = values.length;

      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      }
      else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee == null ? value : iteratee(value);

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * The base implementation of methods like `_.max` and `_.min` which accepts a
     * `comparator` to determine the extremum value.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The iteratee invoked per iteration.
     * @param {Function} comparator The comparator used to compare values.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(array, iteratee, comparator) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index],
            current = iteratee(value);

        if (current != null && (computed === undefined
              ? (current === current && !isSymbol(current))
              : comparator(current, computed)
            )) {
          var computed = current,
              result = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = toInteger(start);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : toInteger(end);
      if (end < 0) {
        end += length;
      }
      end = start > end ? 0 : toLength(end);
      while (start < end) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return object && baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from `props`.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the function names.
     */
    function baseFunctions(object, props) {
      return arrayFilter(props, function(key) {
        return isFunction(object[key]);
      });
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * The base implementation of `_.gt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     */
    function baseGt(value, other) {
      return value > other;
    }

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * The base implementation of `_.inRange` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to check.
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     */
    function baseInRange(number, start, end) {
      return number >= nativeMin(start, end) && number < nativeMax(start, end);
    }

    /**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     */
    function baseIntersection(arrays, iteratee, comparator) {
      var includes = comparator ? arrayIncludesWith : arrayIncludes,
          length = arrays[0].length,
          othLength = arrays.length,
          othIndex = othLength,
          caches = Array(othLength),
          maxLength = Infinity,
          result = [];

      while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
          ? new SetCache(othIndex && array)
          : undefined;
      }
      array = arrays[0];

      var index = -1,
          seen = caches[0];

      outer:
      while (++index < length && result.length < maxLength) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
              ? cacheHas(seen, computed)
              : includes(result, computed, comparator)
            )) {
          othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if (!(cache
                  ? cacheHas(cache, computed)
                  : includes(arrays[othIndex], computed, comparator))
                ) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.invert` and `_.invertBy` which inverts
     * `object` with values transformed by `iteratee` and set by `setter`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform values.
     * @param {Object} accumulator The initial inverted object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseInverter(object, setter, iteratee, accumulator) {
      baseForOwn(object, function(value, key, object) {
        setter(accumulator, iteratee(value), key, object);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.invoke` without support for individual
     * method arguments.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function baseInvoke(object, path, args) {
      path = castPath(path, object);
      object = parent(object, path);
      var func = object == null ? object : object[toKey(last(path))];
      return func == null ? undefined : apply(func, object, args);
    }

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    /**
     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     */
    function baseIsArrayBuffer(value) {
      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
    }

    /**
     * The base implementation of `_.isDate` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     */
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : getTag(object),
          othTag = othIsArr ? arrayTag : getTag(other);

      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.isRegExp` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     */
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.lt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     */
    function baseLt(value, other) {
      return value < other;
    }

    /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack);
        if (isObject(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
            : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key),
          srcValue = safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          }
          else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          }
          else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          }
          else {
            newValue = [];
          }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          }
          else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }

    /**
     * The base implementation of `_.nth` which doesn't coerce arguments.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {number} n The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     */
    function baseNth(array, n) {
      var length = array.length;
      if (!length) {
        return;
      }
      n += n < 0 ? length : 0;
      return isIndex(n, length) ? array[n] : undefined;
    }

    /**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseOrderBy(collection, iteratees, orders) {
      if (iteratees.length) {
        iteratees = arrayMap(iteratees, function(iteratee) {
          if (isArray(iteratee)) {
            return function(value) {
              return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
            }
          }
          return iteratee;
        });
      } else {
        iteratees = [identity];
      }

      var index = -1;
      iteratees = arrayMap(iteratees, baseUnary(getIteratee()));

      var result = baseMap(collection, function(value, key, collection) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.pick` without support for individual
     * property identifiers.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @returns {Object} Returns the new object.
     */
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }

    /**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */
    function basePickBy(object, paths, predicate) {
      var index = -1,
          length = paths.length,
          result = {};

      while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;

      if (array === values) {
        values = copyArray(values);
      }
      if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice.call(seen, fromIndex, 1);
          }
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0,
          lastIndex = length - 1;

      while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
          var previous = index;
          if (isIndex(index)) {
            splice.call(array, index, 1);
          } else {
            baseUnset(array, index);
          }
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for returning
     * floating-point numbers.
     *
     * @private
     * @param {number} lower The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the random number.
     */
    function baseRandom(lower, upper) {
      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
    }

    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }

    /**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */
    function baseRepeat(string, n) {
      var result = '';
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);

      return result;
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    /**
     * The base implementation of `_.sample`.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     */
    function baseSample(collection) {
      return arraySample(values(collection));
    }

    /**
     * The base implementation of `_.sampleSize` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function baseSampleSize(collection, n) {
      var array = values(collection);
      return shuffleSelf(array, baseClamp(n, 0, array.length));
    }

    /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
          return object;
        }

        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = isObject(objValue)
              ? objValue
              : (isIndex(path[index + 1]) ? [] : {});
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }

    /**
     * The base implementation of `setData` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    /**
     * The base implementation of `_.shuffle`.
     *
     * @private
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function baseShuffle(collection) {
      return shuffleSelf(values(collection));
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
     * performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndex(array, value, retHighest) {
      var low = 0,
          high = array == null ? low : array.length;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if (computed !== null && !isSymbol(computed) &&
              (retHighest ? (computed <= value) : (computed < value))) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return baseSortedIndexBy(array, value, identity, retHighest);
    }

    /**
     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
     * which invokes `iteratee` for `value` and each element of `array` to compute
     * their sort ranking. The iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The iteratee invoked per element.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndexBy(array, value, iteratee, retHighest) {
      var low = 0,
          high = array == null ? 0 : array.length;
      if (high === 0) {
        return 0;
      }

      value = iteratee(value);
      var valIsNaN = value !== value,
          valIsNull = value === null,
          valIsSymbol = isSymbol(value),
          valIsUndefined = value === undefined;

      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            othIsDefined = computed !== undefined,
            othIsNull = computed === null,
            othIsReflexive = computed === computed,
            othIsSymbol = isSymbol(computed);

        if (valIsNaN) {
          var setLow = retHighest || othIsReflexive;
        } else if (valIsUndefined) {
          setLow = othIsReflexive && (retHighest || othIsDefined);
        } else if (valIsNull) {
          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        } else if (valIsSymbol) {
          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        } else if (othIsNull || othIsSymbol) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseSortedUniq(array, iteratee) {
      var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        if (!index || !eq(computed, seen)) {
          var seen = computed;
          result[resIndex++] = value === 0 ? 0 : value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.toNumber` which doesn't ensure correct
     * conversions of binary, hexadecimal, or octal string values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     */
    function baseToNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      return +value;
    }

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      }
      else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache;
      }
      else {
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }

    /**
     * The base implementation of `_.update`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to update.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseUpdate(object, path, updater, customizer) {
      return baseSet(object, path, updater(baseGet(object, path)), customizer);
    }

    /**
     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
     * without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) {}

      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to perform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      return arrayReduce(actions, function(result, action) {
        return action.func.apply(action.thisArg, arrayPush([result], action.args));
      }, result);
    }

    /**
     * The base implementation of methods like `_.xor`, without support for
     * iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     */
    function baseXor(arrays, iteratee, comparator) {
      var length = arrays.length;
      if (length < 2) {
        return length ? baseUniq(arrays[0]) : [];
      }
      var index = -1,
          result = Array(length);

      while (++index < length) {
        var array = arrays[index],
            othIndex = -1;

        while (++othIndex < length) {
          if (othIndex != index) {
            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
          }
        }
      }
      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
    }

    /**
     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
     *
     * @private
     * @param {Array} props The property identifiers.
     * @param {Array} values The property values.
     * @param {Function} assignFunc The function to assign values.
     * @returns {Object} Returns the new object.
     */
    function baseZipObject(props, values, assignFunc) {
      var index = -1,
          length = props.length,
          valsLength = values.length,
          result = {};

      while (++index < length) {
        var value = index < valsLength ? values[index] : undefined;
        assignFunc(result, props[index], value);
      }
      return result;
    }

    /**
     * Casts `value` to an empty array if it's not an array like object.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array|Object} Returns the cast array-like object.
     */
    function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }

    /**
     * Casts `value` to `identity` if it's not a function.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Function} Returns cast function.
     */
    function castFunction(value) {
      return typeof value == 'function' ? value : identity;
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    /**
     * A `baseRest` alias which can be replaced with `identity` by module
     * replacement plugins.
     *
     * @private
     * @type {Function}
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    var castRest = baseRest;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
     *
     * @private
     * @param {number|Object} id The timer id or timeout object of the timer to clear.
     */
    var clearTimeout = ctxClearTimeout || function(id) {
      return root.clearTimeout(id);
    };

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Compares values to sort them in ascending order.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {number} Returns the sort order indicator for `value`.
     */
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== undefined,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);

        var othIsDefined = other !== undefined,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);

        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
          return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }

    /**
     * Used by `_.orderBy` to compare multiple properties of a value to another
     * and stable sort them.
     *
     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
     * specify an order of "desc" for descending or "asc" for ascending sort order
     * of corresponding values.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {boolean[]|string[]} orders The order to sort by for each property.
     * @returns {number} Returns the sort order indicator for `object`.
     */
    function compareMultiple(object, other, orders) {
      var index = -1,
          objCriteria = object.criteria,
          othCriteria = other.criteria,
          length = objCriteria.length,
          ordersLength = orders.length;

      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == 'desc' ? -1 : 1);
        }
      }
      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
      // that causes it, under certain circumstances, to provide the same value for
      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
      // for more details.
      //
      // This also ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersLength = holders.length,
          leftIndex = -1,
          leftLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(leftLength + rangeLength),
          isUncurried = !isCurried;

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[holders[argsIndex]] = args[argsIndex];
        }
      }
      while (rangeLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersIndex = -1,
          holdersLength = holders.length,
          rightIndex = -1,
          rightLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(rangeLength + rightLength),
          isUncurried = !isCurried;

      while (++argsIndex < rangeLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[offset + holders[holdersIndex]] = args[argsIndex++];
        }
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }

    /**
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} [initializer] The accumulator object initializer.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};

        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
      };
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createBind(func, bitmask, thisArg) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString(string);

        var strSymbols = hasUnicode(string)
          ? stringToArray(string)
          : undefined;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtor(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors. See
        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a function that wraps `func` to enable currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {number} arity The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCurry(func, bitmask, arity) {
      var Ctor = createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length,
            placeholder = getHolder(wrapper);

        while (index--) {
          args[index] = arguments[index];
        }
        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
          ? []
          : replaceHolders(args, placeholder);

        length -= holders.length;
        if (length < arity) {
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, undefined,
            args, holders, undefined, undefined, arity - length);
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return apply(fn, this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = getIteratee(predicate, 3);
          collection = keys(collection);
          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return flatRest(function(funcs) {
        var length = funcs.length,
            index = length,
            prereq = LodashWrapper.prototype.thru;

        if (fromRight) {
          funcs.reverse();
        }
        while (index--) {
          var func = funcs[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
            var wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? index : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined;

          if (data && isLaziable(data[0]) &&
                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                !data[4].length && data[9] == 1
              ) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func))
              ? wrapper[funcName]()
              : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];

          if (wrapper && args.length == 1 && isArray(value)) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      });
    }

    /**
     * Creates a function that wraps `func` to invoke it with optional `this`
     * binding of `thisArg`, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided
     *  to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & WRAP_ARY_FLAG,
          isBind = bitmask & WRAP_BIND_FLAG,
          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask & WRAP_FLIP_FLAG,
          Ctor = isBindKey ? undefined : createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length;

        while (index--) {
          args[index] = arguments[index];
        }
        if (isCurried) {
          var placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
        }
        if (partials) {
          args = composeArgs(args, partials, holders, isCurried);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        if (isCurried && length < arity) {
          var newHolders = replaceHolders(args, placeholder);
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
          args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
          args.reverse();
        }
        if (isAry && ary < length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.invertBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} toIteratee The function to resolve iteratees.
     * @returns {Function} Returns the new inverter function.
     */
    function createInverter(setter, toIteratee) {
      return function(object, iteratee) {
        return baseInverter(object, setter, toIteratee(iteratee), {});
      };
    }

    /**
     * Creates a function that performs a mathematical operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @param {number} [defaultValue] The value used for `undefined` arguments.
     * @returns {Function} Returns the new mathematical operation function.
     */
    function createMathOperation(operator, defaultValue) {
      return function(value, other) {
        var result;
        if (value === undefined && other === undefined) {
          return defaultValue;
        }
        if (value !== undefined) {
          result = value;
        }
        if (other !== undefined) {
          if (result === undefined) {
            return other;
          }
          if (typeof value == 'string' || typeof other == 'string') {
            value = baseToString(value);
            other = baseToString(other);
          } else {
            value = baseToNumber(value);
            other = baseToNumber(other);
          }
          result = operator(value, other);
        }
        return result;
      };
    }

    /**
     * Creates a function like `_.over`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over iteratees.
     * @returns {Function} Returns the new over function.
     */
    function createOver(arrayFunc) {
      return flatRest(function(iteratees) {
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        return baseRest(function(args) {
          var thisArg = this;
          return arrayFunc(iteratees, function(iteratee) {
            return apply(iteratee, thisArg, args);
          });
        });
      });
    }

    /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */
    function createPadding(length, chars) {
      chars = chars === undefined ? ' ' : baseToString(chars);

      var charsLength = chars.length;
      if (charsLength < 2) {
        return charsLength ? baseRepeat(chars, length) : chars;
      }
      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
      return hasUnicode(chars)
        ? castSlice(stringToArray(result), 0, length).join('')
        : result.slice(0, length);
    }

    /**
     * Creates a function that wraps `func` to invoke it with the `this` binding
     * of `thisArg` and `partials` prepended to the arguments it receives.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to
     *  the new function.
     * @returns {Function} Returns the new wrapped function.
     */
    function createPartial(func, bitmask, thisArg, partials) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        return apply(fn, isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.range` or `_.rangeRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new range function.
     */
    function createRange(fromRight) {
      return function(start, end, step) {
        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
          end = step = undefined;
        }
        // Ensure the sign of `-0` is preserved.
        start = toFinite(start);
        if (end === undefined) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRight);
      };
    }

    /**
     * Creates a function that performs a relational operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @returns {Function} Returns the new relational operation function.
     */
    function createRelationalOperation(operator) {
      return function(value, other) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
          value = toNumber(value);
          other = toNumber(other);
        }
        return operator(value, other);
      };
    }

    /**
     * Creates a function that wraps `func` to continue currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {Function} wrapFunc The function to create the `func` wrapper.
     * @param {*} placeholder The placeholder value.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
      var isCurry = bitmask & WRAP_CURRY_FLAG,
          newHolders = isCurry ? holders : undefined,
          newHoldersRight = isCurry ? undefined : holders,
          newPartials = isCurry ? partials : undefined,
          newPartialsRight = isCurry ? undefined : partials;

      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
      }
      var newData = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
        newHoldersRight, argPos, ary, arity
      ];

      var result = wrapFunc.apply(undefined, newData);
      if (isLaziable(func)) {
        setData(result, newData);
      }
      result.placeholder = placeholder;
      return setWrapToString(result, func, bitmask);
    }

    /**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        number = toNumber(number);
        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
        if (precision && nativeIsFinite(number)) {
          // Shift with exponential notation to avoid floating-point issues.
          // See [MDN](https://mdn.io/round#Examples) for more details.
          var pair = (toString(number) + 'e').split('e'),
              value = func(pair[0] + 'e' + (+pair[1] + precision));

          pair = (toString(value) + 'e').split('e');
          return +(pair[0] + 'e' + (+pair[1] - precision));
        }
        return func(number);
      };
    }

    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */
    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
      return new Set(values);
    };

    /**
     * Creates a `_.toPairs` or `_.toPairsIn` function.
     *
     * @private
     * @param {Function} keysFunc The function to get the keys of a given object.
     * @returns {Function} Returns the new pairs function.
     */
    function createToPairs(keysFunc) {
      return function(object) {
        var tag = getTag(object);
        if (tag == mapTag) {
          return mapToArray(object);
        }
        if (tag == setTag) {
          return setToPairs(object);
        }
        return baseToPairs(object, keysFunc(object));
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind`
     *    2 - `_.bindKey`
     *    4 - `_.curry` or `_.curryRight` of a bound function
     *    8 - `_.curry`
     *   16 - `_.curryRight`
     *   32 - `_.partial`
     *   64 - `_.partialRight`
     *  128 - `_.rearg`
     *  256 - `_.ary`
     *  512 - `_.flip`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
      }
      ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
      arity = arity === undefined ? arity : toInteger(arity);
      length -= holders ? holders.length : 0;

      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined;
      }
      var data = isBindKey ? undefined : getData(func);

      var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];

      if (data) {
        mergeData(newData, data);
      }
      func = newData[0];
      bitmask = newData[1];
      thisArg = newData[2];
      partials = newData[3];
      holders = newData[4];
      arity = newData[9] = newData[9] === undefined
        ? (isBindKey ? 0 : func.length)
        : nativeMax(newData[9] - length, 0);

      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = createBind(func, bitmask, thisArg);
      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity);
      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
      } else {
        result = createHybrid.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setWrapToString(setter(result, newData), func, bitmask);
    }

    /**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsAssignIn(objValue, srcValue, key, object) {
      if (objValue === undefined ||
          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
     * objects into destination objects that are passed thru.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
      if (isObject(objValue) && isObject(srcValue)) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
        stack['delete'](srcValue);
      }
      return objValue;
    }

    /**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */
    function customOmitClone(value) {
      return isPlainObject(value) ? undefined : value;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Check that cyclic values are equal.
      var arrStacked = stack.get(array);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      // Check that cyclic values are equal.
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    function flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = (func.name + ''),
          array = realNames[result],
          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the argument placeholder value for `func`.
     *
     * @private
     * @param {Function} func The function to inspect.
     * @returns {*} Returns the placeholder value.
     */
    function getHolder(func) {
      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
      return object.placeholder;
    }

    /**
     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
     * this function returns the custom method, otherwise it returns `baseIteratee`.
     * If arguments are provided, the chosen function is invoked with them and
     * its result is returned.
     *
     * @private
     * @param {*} [value] The value to convert to an iteratee.
     * @param {number} [arity] The arity of the created iteratee.
     * @returns {Function} Returns the chosen function or its result.
     */
    function getIteratee() {
      var result = lodash.iteratee || iteratee;
      result = result === iteratee ? baseIteratee : result;
      return arguments.length ? result(arguments[0], arguments[1]) : result;
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Extracts wrapper details from the `source` body comment.
     *
     * @private
     * @param {string} source The source to inspect.
     * @returns {Array} Returns the wrapper details.
     */
    function getWrapDetails(source) {
      var match = source.match(reWrapDetails);
      return match ? match[1].split(reSplitDetails) : [];
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isArguments(object));
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return new Ctor;

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return new Ctor;

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    /**
     * Inserts wrapper `details` in a comment at the top of the `source` body.
     *
     * @private
     * @param {string} source The source to modify.
     * @returns {Array} details The details to insert.
     * @returns {string} Returns the modified source.
     */
    function insertWrapDetails(source, details) {
      var length = details.length;
      if (!length) {
        return source;
      }
      var lastIndex = length - 1;
      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
      details = details.join(length > 2 ? ', ' : ' ');
      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
    }

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
     *  else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func),
          other = lodash[funcName];

      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
      }
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `func` is capable of being masked.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
     */
    var isMaskable = coreJsData ? isFunction : stubFalse;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers used to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and
     * `_.rearg` modify function arguments, making the order in which they are
     * executed important, preventing the merging of metadata. However, we make
     * an exception for a safe combined case where curried functions have `_.ary`
     * and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

      var isCombo =
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & WRAP_BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = value;
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & WRAP_ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = copyArray(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }

    /**
     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function safeGet(object, key) {
      if (key === 'constructor' && typeof object[key] === 'function') {
        return;
      }

      if (key == '__proto__') {
        return;
      }

      return object[key];
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity
     * function to avoid garbage collection pauses in V8. See
     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = shortOut(baseSetData);

    /**
     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    var setTimeout = ctxSetTimeout || function(func, wait) {
      return root.setTimeout(func, wait);
    };

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString);

    /**
     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
     * with wrapper details in a comment at the top of the source body.
     *
     * @private
     * @param {Function} wrapper The function to modify.
     * @param {Function} reference The reference function.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Function} Returns `wrapper`.
     */
    function setWrapToString(wrapper, reference, bitmask) {
      var source = (reference + '');
      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
    }

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    /**
     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @param {number} [size=array.length] The size of `array`.
     * @returns {Array} Returns `array`.
     */
    function shuffleSelf(array, size) {
      var index = -1,
          length = array.length,
          lastIndex = length - 1;

      size = size === undefined ? length : size;
      while (++index < size) {
        var rand = baseRandom(index, lastIndex),
            value = array[rand];

        array[rand] = array[index];
        array[index] = value;
      }
      array.length = size;
      return array;
    }

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Updates wrapper `details` based on `bitmask` flags.
     *
     * @private
     * @returns {Array} details The details to modify.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Array} Returns `details`.
     */
    function updateWrapDetails(details, bitmask) {
      arrayEach(wrapFlags, function(pair) {
        var value = '_.' + pair[0];
        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
          details.push(value);
        }
      });
      return details.sort();
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      if (wrapper instanceof LazyWrapper) {
        return wrapper.clone();
      }
      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
      result.__actions__ = copyArray(wrapper.__actions__);
      result.__index__  = wrapper.__index__;
      result.__values__ = wrapper.__values__;
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the new array of chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
        size = 1;
      } else {
        size = nativeMax(toInteger(size), 0);
      }
      var length = array == null ? 0 : array.length;
      if (!length || size < 1) {
        return [];
      }
      var index = 0,
          resIndex = 0,
          result = Array(nativeCeil(length / size));

      while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * Creates a new array concatenating `array` with any additional arrays
     * and/or values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    function concat() {
      var length = arguments.length;
      if (!length) {
        return [];
      }
      var args = Array(length - 1),
          array = arguments[0],
          index = length;

      while (index--) {
        args[index - 1] = arguments[index];
      }
      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
    }

    /**
     * Creates an array of `array` values not included in the other given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * **Note:** Unlike `_.pullAll`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.without, _.xor
     * @example
     *
     * _.difference([2, 1], [2, 3]);
     * // => [1]
     */
    var difference = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `iteratee` which
     * is invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var differenceBy = baseRest(function(array, values) {
      var iteratee = last(values);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `comparator`
     * which is invoked to compare elements of `array` to `values`. The order and
     * references of result values are determined by the first array. The comparator
     * is invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */
    var differenceWith = baseRest(function(array, values) {
      var comparator = last(values);
      if (isArrayLikeObject(comparator)) {
        comparator = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropRightWhile(users, ['active', false]);
     * // => objects for ['barney']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropRightWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.dropWhile(users, function(o) { return !o.active; });
     * // => objects for ['pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropWhile(users, ['active', false]);
     * // => objects for ['pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */
    function fill(array, value, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index);
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
     * // => 2
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastIndex(users, ['active', false]);
     * // => 2
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    function findLastIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length - 1;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = fromIndex < 0
          ? nativeMax(length + index, 0)
          : nativeMin(index, length - 1);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
    }

    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }

    /**
     * Recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    function flattenDeep(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, INFINITY) : [];
    }

    /**
     * Recursively flatten `array` up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * var array = [1, [2, [3, [4]], 5]];
     *
     * _.flattenDepth(array, 1);
     * // => [1, 2, [3, [4]], 5]
     *
     * _.flattenDepth(array, 2);
     * // => [1, 2, 3, [4], 5]
     */
    function flattenDepth(array, depth) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(array, depth);
    }

    /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    function fromPairs(pairs) {
      var index = -1,
          length = pairs == null ? 0 : pairs.length,
          result = {};

      while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
      }
      return result;
    }

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias first
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.head([1, 2, 3]);
     * // => 1
     *
     * _.head([]);
     * // => undefined
     */
    function head(array) {
      return (array && array.length) ? array[0] : undefined;
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the
     * offset from the end of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // Search from the `fromIndex`.
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */
    function indexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseIndexOf(array, value, index);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 0, -1) : [];
    }

    /**
     * Creates an array of unique values that are included in all given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersection([2, 1], [2, 3]);
     * // => [2]
     */
    var intersection = baseRest(function(arrays) {
      var mapped = arrayMap(arrays, castArrayLikeObject);
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped)
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `iteratee`
     * which is invoked for each element of each `arrays` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [2.1]
     *
     * // The `_.property` iteratee shorthand.
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */
    var intersectionBy = baseRest(function(arrays) {
      var iteratee = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      if (iteratee === last(mapped)) {
        iteratee = undefined;
      } else {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `comparator`
     * which is invoked to compare elements of `arrays`. The order and references
     * of result values are determined by the first array. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */
    var intersectionWith = baseRest(function(arrays) {
      var comparator = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      comparator = typeof comparator == 'function' ? comparator : undefined;
      if (comparator) {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, undefined, comparator)
        : [];
    });

    /**
     * Converts all elements in `array` into a string separated by `separator`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to convert.
     * @param {string} [separator=','] The element separator.
     * @returns {string} Returns the joined string.
     * @example
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */
    function join(array, separator) {
      return array == null ? '' : nativeJoin.call(array, separator);
    }

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // Search from the `fromIndex`.
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
      }
      return value === value
        ? strictLastIndexOf(array, value, index)
        : baseFindIndex(array, baseIsNaN, index, true);
    }

    /**
     * Gets the element at index `n` of `array`. If `n` is negative, the nth
     * element from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.11.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=0] The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     *
     * _.nth(array, 1);
     * // => 'b'
     *
     * _.nth(array, -2);
     * // => 'c';
     */
    function nth(array, n) {
      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
    }

    /**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */
    var pull = baseRest(pullAll);

    /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */
    function pullAll(array, values) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values)
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `iteratee` which is
     * invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The iteratee is invoked with one argument: (value).
     *
     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(array);
     * // => [{ 'x': 2 }]
     */
    function pullAllBy(array, values, iteratee) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, getIteratee(iteratee, 2))
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `comparator` which
     * is invoked to compare elements of `array` to `values`. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
     *
     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
     * console.log(array);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
     */
    function pullAllWith(array, values, comparator) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, undefined, comparator)
        : array;
    }

    /**
     * Removes elements from `array` corresponding to `indexes` and returns an
     * array of removed elements.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     * var pulled = _.pullAt(array, [1, 3]);
     *
     * console.log(array);
     * // => ['a', 'c']
     *
     * console.log(pulled);
     * // => ['b', 'd']
     */
    var pullAt = flatRest(function(array, indexes) {
      var length = array == null ? 0 : array.length,
          result = baseAt(array, indexes);

      basePullAt(array, arrayMap(indexes, function(index) {
        return isIndex(index, length) ? +index : index;
      }).sort(compareAscending));

      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getIteratee(predicate, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Reverses `array` so that the first element becomes the last, the second
     * element becomes the second to last, and so on.
     *
     * **Note:** This method mutates `array` and is based on
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.reverse(array);
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function reverse(array) {
      return array == null ? array : nativeReverse.call(array);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
     * returned.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      else {
        start = start == null ? 0 : toInteger(start);
        end = end === undefined ? length : toInteger(end);
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     */
    function sortedIndex(array, value) {
      return baseSortedIndex(array, value);
    }

    /**
     * This method is like `_.sortedIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
     * // => 0
     */
    function sortedIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
    }

    /**
     * This method is like `_.indexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
     * // => 1
     */
    function sortedIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value);
        if (index < length && eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
     * // => 4
     */
    function sortedLastIndex(array, value) {
      return baseSortedIndex(array, value, true);
    }

    /**
     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 1
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
     * // => 1
     */
    function sortedLastIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
    }

    /**
     * This method is like `_.lastIndexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
     * // => 3
     */
    function sortedLastIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value, true) - 1;
        if (eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.uniq` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */
    function sortedUniq(array) {
      return (array && array.length)
        ? baseSortedUniq(array)
        : [];
    }

    /**
     * This method is like `_.uniqBy` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1.1, 2.3]
     */
    function sortedUniqBy(array, iteratee) {
      return (array && array.length)
        ? baseSortedUniq(array, getIteratee(iteratee, 2))
        : [];
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.tail([1, 2, 3]);
     * // => [2, 3]
     */
    function tail(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 1, length) : [];
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      if (!(array && array.length)) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeRightWhile(users, ['active', false]);
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeRightWhile(users, 'active');
     * // => []
     */
    function takeRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeWhile(users, ['active', false]);
     * // => objects for ['barney', 'fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeWhile(users, 'active');
     * // => []
     */
    function takeWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all given arrays using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */
    var union = baseRest(function(arrays) {
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
    });

    /**
     * This method is like `_.union` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which uniqueness is computed. Result values are chosen from the first
     * array in which the value occurs. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    var unionBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.union` except that it accepts `comparator` which
     * is invoked to compare elements of `arrays`. Result values are chosen from
     * the first array in which the value occurs. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var unionWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept. The order of result values is determined by the order they occur
     * in the array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    function uniq(array) {
      return (array && array.length) ? baseUniq(array) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The order of result values is determined by the
     * order they occur in the array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniqBy(array, iteratee) {
      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `comparator` which
     * is invoked to compare elements of `array`. The order of result values is
     * determined by the order they occur in the array.The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(objects, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */
    function uniqWith(array, comparator) {
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @since 1.2.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     *
     * _.unzip(zipped);
     * // => [['a', 'b'], [1, 2], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var length = 0;
      array = arrayFilter(array, function(group) {
        if (isArrayLikeObject(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      return baseTimes(length, function(index) {
        return arrayMap(array, baseProperty(index));
      });
    }

    /**
     * This method is like `_.unzip` except that it accepts `iteratee` to specify
     * how regrouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  regrouped values.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee) {
      if (!(array && array.length)) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      return arrayMap(result, function(group) {
        return apply(iteratee, undefined, group);
      });
    }

    /**
     * Creates an array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.pull`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.xor
     * @example
     *
     * _.without([2, 1, 2, 3], 1, 2);
     * // => [3]
     */
    var without = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the
     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the given arrays. The order of result values is determined by the order
     * they occur in the arrays.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.without
     * @example
     *
     * _.xor([2, 1], [2, 3]);
     * // => [1, 3]
     */
    var xor = baseRest(function(arrays) {
      return baseXor(arrayFilter(arrays, isArrayLikeObject));
    });

    /**
     * This method is like `_.xor` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which by which they're compared. The order of result values is determined
     * by the order they occur in the arrays. The iteratee is invoked with one
     * argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2, 3.4]
     *
     * // The `_.property` iteratee shorthand.
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var xorBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.xor` except that it accepts `comparator` which is
     * invoked to compare elements of `arrays`. The order of result values is
     * determined by the order they occur in the arrays. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(objects, others, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var xorWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
    });

    /**
     * Creates an array of grouped elements, the first of which contains the
     * first elements of the given arrays, the second of which contains the
     * second elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     */
    var zip = baseRest(unzip);

    /**
     * This method is like `_.fromPairs` except that it accepts two arrays,
     * one of property identifiers and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 0.4.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject(['a', 'b'], [1, 2]);
     * // => { 'a': 1, 'b': 2 }
     */
    function zipObject(props, values) {
      return baseZipObject(props || [], values || [], assignValue);
    }

    /**
     * This method is like `_.zipObject` except that it supports property paths.
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
     */
    function zipObjectDeep(props, values) {
      return baseZipObject(props || [], values || [], baseSet);
    }

    /**
     * This method is like `_.zip` except that it accepts `iteratee` to specify
     * how grouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  grouped values.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     *   return a + b + c;
     * });
     * // => [111, 222]
     */
    var zipWith = baseRest(function(arrays) {
      var length = arrays.length,
          iteratee = length > 1 ? arrays[length - 1] : undefined;

      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
      return unzipWith(arrays, iteratee);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
     * chain sequences enabled. The result of such sequences must be unwrapped
     * with `_#value`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Seq
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _
     *   .chain(users)
     *   .sortBy('age')
     *   .map(function(o) {
     *     return o.user + ' is ' + o.age;
     *   })
     *   .head()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor
     * is invoked with one argument; (value). The purpose of this method is to
     * "tap into" a method chain sequence in order to modify intermediate results.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    // Mutate input array.
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     * The purpose of this method is to "pass thru" values replacing intermediate
     * results in a method chain sequence.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor) {
      return interceptor(value);
    }

    /**
     * This method is the wrapper version of `_.at`.
     *
     * @name at
     * @memberOf _
     * @since 1.0.0
     * @category Seq
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(object).at(['a[0].b.c', 'a[1]']).value();
     * // => [3, 4]
     */
    var wrapperAt = flatRest(function(paths) {
      var length = paths.length,
          start = length ? paths[0] : 0,
          value = this.__wrapped__,
          interceptor = function(object) { return baseAt(object, paths); };

      if (length > 1 || this.__actions__.length ||
          !(value instanceof LazyWrapper) || !isIndex(start)) {
        return this.thru(interceptor);
      }
      value = value.slice(start, +start + (length ? 1 : 0));
      value.__actions__.push({
        'func': thru,
        'args': [interceptor],
        'thisArg': undefined
      });
      return new LodashWrapper(value, this.__chain__).thru(function(array) {
        if (length && !array.length) {
          array.push(undefined);
        }
        return array;
      });
    });

    /**
     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
     *
     * @name chain
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // A sequence without explicit chaining.
     * _(users).head();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // A sequence with explicit chaining.
     * _(users)
     *   .chain()
     *   .head()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chain sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Gets the next value on a wrapped object following the
     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
     *
     * @name next
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the next iterator value.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 1 }
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 2 }
     *
     * wrapped.next();
     * // => { 'done': true, 'value': undefined }
     */
    function wrapperNext() {
      if (this.__values__ === undefined) {
        this.__values__ = toArray(this.value());
      }
      var done = this.__index__ >= this.__values__.length,
          value = done ? undefined : this.__values__[this.__index__++];

      return { 'done': done, 'value': value };
    }

    /**
     * Enables the wrapper to be iterable.
     *
     * @name Symbol.iterator
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped[Symbol.iterator]() === wrapped;
     * // => true
     *
     * Array.from(wrapped);
     * // => [1, 2]
     */
    function wrapperToIterator() {
      return this;
    }

    /**
     * Creates a clone of the chain sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @param {*} value The value to plant.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2]).map(square);
     * var other = wrapped.plant([3, 4]);
     *
     * other.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        clone.__index__ = 0;
        clone.__values__ = undefined;
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * This method is the wrapper version of `_.reverse`.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({
          'func': thru,
          'args': [reverse],
          'thisArg': undefined
        });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(reverse);
    }

    /**
     * Executes the chain sequence to resolve the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @since 0.1.0
     * @alias toJSON, valueOf
     * @category Seq
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the number of times the key was returned by `iteratee`. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        ++result[key];
      } else {
        baseAssignValue(result, key, 1);
      }
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * Iteration is stopped once `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * **Note:** This method returns `true` for
     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
     * elements of empty collections.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.every(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, guard) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * **Note:** Unlike `_.remove`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.reject
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.filter(users, 'active');
     * // => objects for ['barney']
     *
     * // Combining several predicates using `_.overEvery` or `_.overSome`.
     * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
     * // => objects for ['fred', 'barney']
     */
    function filter(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */
    var find = createFind(findIndex);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=collection.length-1] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(findLastIndex);

    /**
     * Creates a flattened array of values by running each element in `collection`
     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
     * with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _.flatMap([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMap(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), 1);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDeep([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMapDeep(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), INFINITY);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDepth([1, 2], duplicate, 2);
     * // => [[1, 1], [2, 2]]
     */
    function flatMapDepth(collection, iteratee, depth) {
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(map(collection, iteratee), depth);
    }

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _.forEach([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @alias eachRight
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEach
     * @example
     *
     * _.forEachRight([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `2` then `1`.
     */
    function forEachRight(collection, iteratee) {
      var func = isArray(collection) ? arrayEachRight : baseEachRight;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The order of grouped values
     * is determined by the order they occur in `collection`. The corresponding
     * value of each key is an array of elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // The `_.property` iteratee shorthand.
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue(result, key, [value]);
      }
    });

    /**
     * Checks if `value` is in `collection`. If `collection` is a string, it's
     * checked for a substring of `value`, otherwise
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => true
     *
     * _.includes('abcd', 'bc');
     * // => true
     */
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection)
        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
    }

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `path` is a function, it's invoked
     * for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke each method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invokeMap = baseRest(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
      });
      return result;
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the last element responsible for generating the key. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var array = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(array, function(o) {
     *   return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(array, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     */
    var keyBy = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });

    /**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.sortBy` except that it allows specifying the sort
     * orders of the iteratees to sort by. If `orders` is unspecified, all values
     * are sorted in ascending order. Otherwise, specify an order of "desc" for
     * descending or "asc" for ascending sort order of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @param {string[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // Sort by `user` in ascending order and by `age` in descending order.
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     */
    function orderBy(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      orders = guard ? undefined : orders;
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseOrderBy(collection, iteratees, orders);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, the second of which
     * contains elements `predicate` returns falsey for. The predicate is
     * invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * _.partition(users, function(o) { return o.active; });
     * // => objects for [['fred'], ['barney', 'pebbles']]
     *
     * // The `_.matches` iteratee shorthand.
     * _.partition(users, { 'age': 1, 'active': false });
     * // => objects for [['pebbles'], ['barney', 'fred']]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.partition(users, ['active', false]);
     * // => objects for [['barney', 'pebbles'], ['fred']]
     *
     * // The `_.property` iteratee shorthand.
     * _.partition(users, 'active');
     * // => objects for [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` thru `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not given, the first element of `collection` is used as the initial
     * value. The iteratee is invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * and `sortBy`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduceRight
     * @example
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * }, 0);
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     *   return result;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
     */
    function reduce(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduce : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduce
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduceRight : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
    }

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.filter
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * _.reject(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.reject(users, { 'age': 40, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.reject(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.reject(users, 'active');
     * // => objects for ['barney']
     */
    function reject(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, negate(getIteratee(predicate, 3)));
    }

    /**
     * Gets a random element from `collection`.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     */
    function sample(collection) {
      var func = isArray(collection) ? arraySample : baseSample;
      return func(collection);
    }

    /**
     * Gets `n` random elements at unique keys from `collection` up to the
     * size of `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @param {number} [n=1] The number of elements to sample.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the random elements.
     * @example
     *
     * _.sampleSize([1, 2, 3], 2);
     * // => [3, 1]
     *
     * _.sampleSize([1, 2, 3], 4);
     * // => [2, 3, 1]
     */
    function sampleSize(collection, n, guard) {
      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
      return func(collection, n);
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      var func = isArray(collection) ? arrayShuffle : baseShuffle;
      return func(collection);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable string keyed properties for objects.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the collection size.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
      }
      var tag = getTag(collection);
      if (tag == mapTag || tag == setTag) {
        return collection.size;
      }
      return baseKeys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * Iteration is stopped once `predicate` returns truthy. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.some(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, guard) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection thru each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 30 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, [function(o) { return o.user; }]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
     */
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = ctxNow || function() {
      return root.Date.now();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => Logs 'done saving!' after the two async saves have completed.
     */
    function after(n, func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that invokes `func`, with up to `n` arguments,
     * ignoring any additional arguments.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      n = guard ? undefined : n;
      n = (func && n == null) ? func.length : n;
      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery(element).on('click', _.before(5, addContactToList));
     * // => Allows adding up to 4 contacts to the list.
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and `partials` prepended to the arguments it receives.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * function greet(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * }
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = baseRest(function(func, thisArg, partials) {
      var bitmask = WRAP_BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bind));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Creates a function that invokes the method at `object[key]` with `partials`
     * prepended to the arguments it receives.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist. See
     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Function
     * @param {Object} object The object to invoke the method on.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = baseRest(function(object, key, partials) {
      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts arguments of `func` and either invokes
     * `func` returning its result, if at least `arity` number of arguments have
     * been provided, or returns a function that accepts the remaining `func`
     * arguments, and so on. The arity of `func` may be specified if `func.length`
     * is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    function curry(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curry.placeholder;
      return result;
    }

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    function curryRight(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curryRight.placeholder;
      return result;
    }

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;

        return maxing
          ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // => Logs 'deferred' after one millisecond.
     */
    var defer = baseRest(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => Logs 'later' after one second.
     */
    var delay = baseRest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) || 0, args);
    });

    /**
     * Creates a function that invokes `func` with arguments reversed.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to flip arguments for.
     * @returns {Function} Returns the new flipped function.
     * @example
     *
     * var flipped = _.flip(function() {
     *   return _.toArray(arguments);
     * });
     *
     * flipped('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */
    function flip(func) {
      return createWrap(func, WRAP_FLIP_FLAG);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = MapCache;

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new negated function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        var args = arguments;
        switch (args.length) {
          case 0: return !predicate.call(this);
          case 1: return !predicate.call(this, args[0]);
          case 2: return !predicate.call(this, args[0], args[1]);
          case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // => `createApplication` is invoked once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with its arguments transformed.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms=[_.identity]]
     *  The argument transforms.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var func = _.overArgs(function(x, y) {
     *   return [x, y];
     * }, [square, doubled]);
     *
     * func(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */
    var overArgs = castRest(function(func, transforms) {
      transforms = (transforms.length == 1 && isArray(transforms[0]))
        ? arrayMap(transforms[0], baseUnary(getIteratee()))
        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

      var funcsLength = transforms.length;
      return baseRest(function(args) {
        var index = -1,
            length = nativeMin(args.length, funcsLength);

        while (++index < length) {
          args[index] = transforms[index].call(this, args[index]);
        }
        return apply(func, this, args);
      });
    });

    /**
     * Creates a function that invokes `func` with `partials` prepended to the
     * arguments it receives. This method is like `_.bind` except it does **not**
     * alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 0.2.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // Partially applied with placeholders.
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partial));
      return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
    });

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to the arguments it receives.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // Partially applied with placeholders.
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partialRight));
      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
    });

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified `indexes` where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, [2, 0, 1]);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */
    var rearg = flatRest(function(func, indexes) {
      return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start === undefined ? start : toInteger(start);
      return baseRest(func, start);
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * create function and an array of arguments much like
     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
     *
     * **Note:** This method is based on the
     * [spread operator](https://mdn.io/spread_operator).
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @param {number} [start=0] The start position of the spread.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start == null ? 0 : nativeMax(toInteger(start), 0);
      return baseRest(function(args) {
        var array = args[start],
            otherArgs = castSlice(args, 0, start);

        if (array) {
          arrayPush(otherArgs, array);
        }
        return apply(func, this, otherArgs);
      });
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * Creates a function that accepts up to one argument, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */
    function unary(func) {
      return ary(func, 1);
    }

    /**
     * Creates a function that provides `value` to `wrapper` as its first
     * argument. Any additional arguments provided to the function are appended
     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
     * binding of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} [wrapper=identity] The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      return partial(castFunction(wrapper), value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Casts `value` as an array if it's not one.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Lang
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast array.
     * @example
     *
     * _.castArray(1);
     * // => [1]
     *
     * _.castArray({ 'a': 1 });
     * // => [{ 'a': 1 }]
     *
     * _.castArray('abc');
     * // => ['abc']
     *
     * _.castArray(null);
     * // => [null]
     *
     * _.castArray(undefined);
     * // => [undefined]
     *
     * _.castArray();
     * // => []
     *
     * var array = [1, 2, 3];
     * console.log(_.castArray(array) === array);
     * // => true
     */
    function castArray() {
      if (!arguments.length) {
        return [];
      }
      var value = arguments[0];
      return isArray(value) ? value : [value];
    }

    /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */
    function clone(value) {
      return baseClone(value, CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to four arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeepWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.cloneWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */
    function cloneWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @see _.cloneWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeepWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */
    function cloneDeepWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * Checks if `object` conforms to `source` by invoking the predicate
     * properties of `source` with the corresponding property values of `object`.
     *
     * **Note:** This method is equivalent to `_.conforms` when `source` is
     * partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
     * // => true
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
     * // => false
     */
    function conformsTo(object, source) {
      return source == null || baseConformsTo(object, source, keys(source));
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     * @see _.lt
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    var gt = createRelationalOperation(baseGt);

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to
     *  `other`, else `false`.
     * @see _.lte
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    var gte = createRelationalOperation(function(value, other) {
      return value >= other;
    });

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is classified as an `ArrayBuffer` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     * @example
     *
     * _.isArrayBuffer(new ArrayBuffer(2));
     * // => true
     *
     * _.isArrayBuffer(new Array(2));
     * // => false
     */
    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        (isObjectLike(value) && baseGetTag(value) == boolTag);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

    /**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
    }

    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) &&
          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are compared by strict equality, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }

    /**
     * This method is like `_.isEqual` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with up to
     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, othValue) {
     *   if (isGreeting(objValue) && isGreeting(othValue)) {
     *     return true;
     *   }
     * }
     *
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqualWith(array, other, customizer);
     * // => true
     */
    function isEqualWith(value, other, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      if (!isObjectLike(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on
     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(3);
     * // => true
     *
     * _.isFinite(Number.MIN_VALUE);
     * // => true
     *
     * _.isFinite(Infinity);
     * // => false
     *
     * _.isFinite('3');
     * // => false
     */
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /**
     * Checks if `value` is an integer.
     *
     * **Note:** This method is based on
     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
     * @example
     *
     * _.isInteger(3);
     * // => true
     *
     * _.isInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isInteger(Infinity);
     * // => false
     *
     * _.isInteger('3');
     * // => false
     */
    function isInteger(value) {
      return typeof value == 'number' && value == toInteger(value);
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    /**
     * Performs a partial deep comparison between `object` and `source` to
     * determine if `object` contains equivalent property values.
     *
     * **Note:** This method is equivalent to `_.matches` when `source` is
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.isMatch(object, { 'b': 2 });
     * // => true
     *
     * _.isMatch(object, { 'b': 1 });
     * // => false
     */
    function isMatch(object, source) {
      return object === source || baseIsMatch(object, source, getMatchData(source));
    }

    /**
     * This method is like `_.isMatch` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with five
     * arguments: (objValue, srcValue, index|key, object, source).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, srcValue) {
     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
     *     return true;
     *   }
     * }
     *
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatchWith(object, source, customizer);
     * // => true
     */
    function isMatchWith(object, source, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseIsMatch(object, source, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is based on
     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
     * `undefined` and other non-number values.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some
      // ActiveX objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a pristine native function.
     *
     * **Note:** This method can't reliably detect native functions in the presence
     * of the core-js package because core-js circumvents this kind of detection.
     * Despite multiple requests, the core-js maintainer has made it clear: any
     * attempt to fix the detection will be obstructed. As a result, we're left
     * with little choice but to throw an error. Unfortunately, this also affects
     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
     * which rely on core-js.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (isMaskable(value)) {
        throw new Error(CORE_ERROR_TEXT);
      }
      return baseIsNative(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
     * @example
     *
     * _.isNil(null);
     * // => true
     *
     * _.isNil(void 0);
     * // => true
     *
     * _.isNil(NaN);
     * // => false
     */
    function isNil(value) {
      return value == null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
     * classified as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        (isObjectLike(value) && baseGetTag(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

    /**
     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
     * double precision number which isn't the result of a rounded unsafe integer.
     *
     * **Note:** This method is based on
     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
     * @example
     *
     * _.isSafeInteger(3);
     * // => true
     *
     * _.isSafeInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isSafeInteger(Infinity);
     * // => false
     *
     * _.isSafeInteger('3');
     * // => false
     */
    function isSafeInteger(value) {
      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Checks if `value` is classified as a `WeakMap` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
     * @example
     *
     * _.isWeakMap(new WeakMap);
     * // => true
     *
     * _.isWeakMap(new Map);
     * // => false
     */
    function isWeakMap(value) {
      return isObjectLike(value) && getTag(value) == weakMapTag;
    }

    /**
     * Checks if `value` is classified as a `WeakSet` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
     * @example
     *
     * _.isWeakSet(new WeakSet);
     * // => true
     *
     * _.isWeakSet(new Set);
     * // => false
     */
    function isWeakSet(value) {
      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     * @see _.gt
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    var lt = createRelationalOperation(baseLt);

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to
     *  `other`, else `false`.
     * @see _.gte
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    var lte = createRelationalOperation(function(value, other) {
      return value <= other;
    });

    /**
     * Converts `value` to an array.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */
    function toArray(value) {
      if (!value) {
        return [];
      }
      if (isArrayLike(value)) {
        return isString(value) ? stringToArray(value) : copyArray(value);
      }
      if (symIterator && value[symIterator]) {
        return iteratorToArray(value[symIterator]());
      }
      var tag = getTag(value),
          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

      return func(value);
    }

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /**
     * Converts `value` to an integer suitable for use as the length of an
     * array-like object.
     *
     * **Note:** This method is based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toLength(3.2);
     * // => 3
     *
     * _.toLength(Number.MIN_VALUE);
     * // => 0
     *
     * _.toLength(Infinity);
     * // => 4294967295
     *
     * _.toLength('3.2');
     * // => 3
     */
    function toLength(value) {
      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    /**
     * Converts `value` to a safe integer. A safe integer can be compared and
     * represented correctly.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toSafeInteger(3.2);
     * // => 3
     *
     * _.toSafeInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toSafeInteger(Infinity);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3.2');
     * // => 3
     */
    function toSafeInteger(value) {
      return value
        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
        : (value === 0 ? value : 0);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable string keyed properties of source objects to the
     * destination object. Source objects are applied from left to right.
     * Subsequent sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assignIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });

    /**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assign
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, keysIn(source), object);
    });

    /**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });

    /**
     * This method is like `_.assign` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignInWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keys(source), object, customizer);
    });

    /**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Array} Returns the picked values.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */
    var at = flatRest(baseAt);

    /**
     * Creates an object that inherits from the `prototype` object. If a
     * `properties` object is given, its own enumerable string keyed properties
     * are assigned to the created object.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties == null ? result : baseAssign(result, properties);
    }

    /**
     * Assigns own and inherited enumerable string keyed properties of source
     * objects to the destination object for all destination properties that
     * resolve to `undefined`. Source objects are applied from left to right.
     * Once a property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaultsDeep
     * @example
     *
     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var defaults = baseRest(function(object, sources) {
      object = Object(object);

      var index = -1;
      var length = sources.length;
      var guard = length > 2 ? sources[2] : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
      }

      while (++index < length) {
        var source = sources[index];
        var props = keysIn(source);
        var propsIndex = -1;
        var propsLength = props.length;

        while (++propsIndex < propsLength) {
          var key = props[propsIndex];
          var value = object[key];

          if (value === undefined ||
              (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
            object[key] = source[key];
          }
        }
      }

      return object;
    });

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaults
     * @example
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */
    var defaultsDeep = baseRest(function(args) {
      args.push(undefined, customDefaultsMerge);
      return apply(mergeWith, undefined, args);
    });

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // The `_.matches` iteratee shorthand.
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    function findKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    function findLastKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
    }

    /**
     * Iterates over own and inherited enumerable string keyed properties of an
     * object and invokes `iteratee` for each property. The iteratee is invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forInRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
     */
    function forIn(object, iteratee) {
      return object == null
        ? object
        : baseFor(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
     */
    function forInRight(object, iteratee) {
      return object == null
        ? object
        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forOwn(object, iteratee) {
      return object && baseForOwn(object, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
     */
    function forOwnRight(object, iteratee) {
      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
    }

    /**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functionsIn
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */
    function functions(object) {
      return object == null ? [] : baseFunctions(object, keys(object));
    }

    /**
     * Creates an array of function property names from own and inherited
     * enumerable properties of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functions
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(new Foo);
     * // => ['a', 'b', 'c']
     */
    function functionsIn(object) {
      return object == null ? [] : baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */
    function has(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite
     * property assignments of previous values.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Object
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    var invert = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      result[value] = key;
    }, constant(identity));

    /**
     * This method is like `_.invert` except that the inverted object is generated
     * from the results of running each element of `object` thru `iteratee`. The
     * corresponding inverted value of each inverted key is an array of keys
     * responsible for generating the inverted value. The iteratee is invoked
     * with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Object
     * @param {Object} object The object to invert.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invertBy(object);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     *
     * _.invertBy(object, function(value) {
     *   return 'group' + value;
     * });
     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
     */
    var invertBy = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }, getIteratee);

    /**
     * Invokes the method at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
     * // => [2, 3]
     */
    var invoke = baseRest(baseInvoke);

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
     * with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapValues
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    function mapKeys(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, iteratee(value, key, object), value);
      });
      return result;
    }

    /**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, key, iteratee(value, key, object));
      });
      return result;
    }

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });

    /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with six arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */
    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });

    /**
     * The opposite of `_.pickBy`; this method creates an object composed of
     * the own and inherited enumerable string keyed properties of `object` that
     * `predicate` doesn't return truthy for. The predicate is invoked with two
     * arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */
    function omitBy(object, predicate) {
      return pickBy(object, negate(getIteratee(predicate)));
    }

    /**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });

    /**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with two arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */
    function pickBy(object, predicate) {
      if (object == null) {
        return {};
      }
      var props = arrayMap(getAllKeysIn(object), function(prop) {
        return [prop];
      });
      predicate = getIteratee(predicate);
      return basePickBy(object, props, function(value, path) {
        return predicate(value, path[0]);
      });
    }

    /**
     * This method is like `_.get` except that if the resolved value is a
     * function it's invoked with the `this` binding of its parent object and
     * its result is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a[0].b.c3', 'default');
     * // => 'default'
     *
     * _.result(object, 'a[0].b.c3', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      path = castPath(path, object);

      var index = -1,
          length = path.length;

      // Ensure the loop is entered when path is empty.
      if (!length) {
        length = 1;
        object = undefined;
      }
      while (++index < length) {
        var value = object == null ? undefined : object[toKey(path[index])];
        if (value === undefined) {
          index = length;
          value = defaultValue;
        }
        object = isFunction(value) ? value.call(object) : value;
      }
      return object;
    }

    /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }

    /**
     * This method is like `_.set` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.setWith(object, '[0][1]', 'a', Object);
     * // => { '0': { '1': 'a' } }
     */
    function setWith(object, path, value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseSet(object, path, value, customizer);
    }

    /**
     * Creates an array of own enumerable string keyed-value pairs for `object`
     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
     * entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entries
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairs(new Foo);
     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
     */
    var toPairs = createToPairs(keys);

    /**
     * Creates an array of own and inherited enumerable string keyed-value pairs
     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
     * or set, its entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entriesIn
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairsIn(new Foo);
     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
     */
    var toPairsIn = createToPairs(keysIn);

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable string keyed properties thru `iteratee`, with each invocation
     * potentially mutating the `accumulator` object. If `accumulator` is not
     * provided, a new object with the same `[[Prototype]]` will be used. The
     * iteratee is invoked with four arguments: (accumulator, value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * }, []);
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function transform(object, iteratee, accumulator) {
      var isArr = isArray(object),
          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

      iteratee = getIteratee(iteratee, 4);
      if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
          accumulator = isArr ? new Ctor : [];
        }
        else if (isObject(object)) {
          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        }
        else {
          accumulator = {};
        }
      }
      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Removes the property at `path` of `object`.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(object, ['a', '0', 'b', 'c']);
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     */
    function unset(object, path) {
      return object == null ? true : baseUnset(object, path);
    }

    /**
     * This method is like `_.set` except that accepts `updater` to produce the
     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
     * is invoked with one argument: (value).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
     * console.log(object.a[0].b.c);
     * // => 9
     *
     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
     * console.log(object.x[0].y.z);
     * // => 0
     */
    function update(object, path, updater) {
      return object == null ? object : baseUpdate(object, path, castFunction(updater));
    }

    /**
     * This method is like `_.update` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
     * // => { '0': { '1': 'a' } }
     */
    function updateWith(object, path, updater, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
    }

    /**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable string keyed property
     * values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return object == null ? [] : baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Clamps `number` within the inclusive `lower` and `upper` bounds.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Number
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     * @example
     *
     * _.clamp(-10, -5, 5);
     * // => -5
     *
     * _.clamp(10, -5, 5);
     * // => 5
     */
    function clamp(number, lower, upper) {
      if (upper === undefined) {
        upper = lower;
        lower = undefined;
      }
      if (upper !== undefined) {
        upper = toNumber(upper);
        upper = upper === upper ? upper : 0;
      }
      if (lower !== undefined) {
        lower = toNumber(lower);
        lower = lower === lower ? lower : 0;
      }
      return baseClamp(toNumber(number), lower, upper);
    }

    /**
     * Checks if `n` is between `start` and up to, but not including, `end`. If
     * `end` is not specified, it's set to `start` with `start` then set to `0`.
     * If `start` is greater than `end` the params are swapped to support
     * negative ranges.
     *
     * @static
     * @memberOf _
     * @since 3.3.0
     * @category Number
     * @param {number} number The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     * @see _.range, _.rangeRight
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     *
     * _.inRange(-3, -2, -6);
     * // => true
     */
    function inRange(number, start, end) {
      start = toFinite(start);
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = toFinite(end);
      }
      number = toNumber(number);
      return baseInRange(number, start, end);
    }

    /**
     * Produces a random number between the inclusive `lower` and `upper` bounds.
     * If only one argument is provided a number between `0` and the given number
     * is returned. If `floating` is `true`, or either `lower` or `upper` are
     * floats, a floating-point number is returned instead of an integer.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Number
     * @param {number} [lower=0] The lower bound.
     * @param {number} [upper=1] The upper bound.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(lower, upper, floating) {
      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
        upper = floating = undefined;
      }
      if (floating === undefined) {
        if (typeof upper == 'boolean') {
          floating = upper;
          upper = undefined;
        }
        else if (typeof lower == 'boolean') {
          floating = lower;
          lower = undefined;
        }
      }
      if (lower === undefined && upper === undefined) {
        lower = 0;
        upper = 1;
      }
      else {
        lower = toFinite(lower);
        if (upper === undefined) {
          upper = lower;
          lower = 0;
        } else {
          upper = toFinite(upper);
        }
      }
      if (lower > upper) {
        var temp = lower;
        lower = upper;
        upper = temp;
      }
      if (floating || lower % 1 || upper % 1) {
        var rand = nativeRandom();
        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
      }
      return baseRandom(lower, upper);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search up to.
     * @returns {boolean} Returns `true` if `string` ends with `target`,
     *  else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = toString(string);
      target = baseToString(target);

      var length = string.length;
      position = position === undefined
        ? length
        : baseClamp(toInteger(position), 0, length);

      var end = position;
      position -= target.length;
      return position >= 0 && string.slice(position, end) == target;
    }

    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */
    function escapeRegExp(string) {
      string = toString(string);
      return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : string;
    }

    /**
     * Converts `string` to
     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */
    var lowerCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toLowerCase();
    });

    /**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */
    var lowerFirst = createCaseFirst('toLowerCase');

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      if (!length || strLength >= length) {
        return string;
      }
      var mid = (length - strLength) / 2;
      return (
        createPadding(nativeFloor(mid), chars) +
        string +
        createPadding(nativeCeil(mid), chars)
      );
    }

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (string + createPadding(length - strLength, chars))
        : string;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (createPadding(length - strLength, chars) + string)
        : string;
    }

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
     * hexadecimal, in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the
     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix=10] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (guard || radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=1] The number of times to repeat the string.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n, guard) {
      if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }

    /**
     * Replaces matches for `pattern` in `string` with `replacement`.
     *
     * **Note:** This method is based on
     * [`String#replace`](https://mdn.io/String/replace).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to modify.
     * @param {RegExp|string} pattern The pattern to replace.
     * @param {Function|string} replacement The match replacement.
     * @returns {string} Returns the modified string.
     * @example
     *
     * _.replace('Hi Fred', 'Fred', 'Barney');
     * // => 'Hi Barney'
     */
    function replace() {
      var args = arguments,
          string = toString(args[0]);

      return args.length < 3 ? string : string.replace(args[1], args[2]);
    }

    /**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Splits `string` by `separator`.
     *
     * **Note:** This method is based on
     * [`String#split`](https://mdn.io/String/split).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to split.
     * @param {RegExp|string} separator The separator pattern to split by.
     * @param {number} [limit] The length to truncate results to.
     * @returns {Array} Returns the string segments.
     * @example
     *
     * _.split('a-b-c', '-', 2);
     * // => ['a', 'b']
     */
    function split(string, separator, limit) {
      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
        separator = limit = undefined;
      }
      limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
      if (!limit) {
        return [];
      }
      string = toString(string);
      if (string && (
            typeof separator == 'string' ||
            (separator != null && !isRegExp(separator))
          )) {
        separator = baseToString(separator);
        if (!separator && hasUnicode(string)) {
          return castSlice(stringToArray(string), 0, limit);
        }
      }
      return string.split(separator, limit);
    }

    /**
     * Converts `string` to
     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @since 3.1.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar--');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__FOO_BAR__');
     * // => 'FOO BAR'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + upperFirst(word);
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`,
     *  else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = toString(string);
      position = position == null
        ? 0
        : baseClamp(toInteger(position), 0, string.length);

      target = baseToString(target);
      return string.slice(position, position + target.length) == target;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='lodash.templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, guard) {
      // Based on John Resig's `tmpl` implementation
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      string = toString(string);
      options = assignInWith({}, options, settings, customDefaultsAssignIn);

      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      // The sourceURL gets injected into the source that's eval-ed, so be careful
      // to normalize all kinds of whitespace, so e.g. newlines (and unicode versions of it) can't sneak in
      // and escape the comment, thus injecting code that gets evaled.
      var sourceURL = '//# sourceURL=' +
        (hasOwnProperty.call(options, 'sourceURL')
          ? (options.sourceURL + '').replace(/\s/g, ' ')
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = hasOwnProperty.call(options, 'variable') && options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Throw an error if a forbidden character was found in `variable`, to prevent
      // potential command injection attacks.
      else if (reForbiddenIdentifierChars.test(variable)) {
        throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
      }

      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source)
          .apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Converts `string`, as a whole, to lower case just like
     * [String#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */
    function toLower(value) {
      return toString(value).toLowerCase();
    }

    /**
     * Converts `string`, as a whole, to upper case just like
     * [String#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */
    function toUpper(value) {
      return toString(value).toUpperCase();
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return baseTrim(string);
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimEnd(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.slice(0, trimmedEndIndex(string) + 1);
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

      return castSlice(strSymbols, 0, end).join('');
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimStart(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimStart, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          start = charsStartIndex(strSymbols, stringToArray(chars));

      return castSlice(strSymbols, start).join('');
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options={}] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function truncate(string, options) {
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (isObject(options)) {
        var separator = 'separator' in options ? options.separator : separator;
        length = 'length' in options ? toInteger(options.length) : length;
        omission = 'omission' in options ? baseToString(options.omission) : omission;
      }
      string = toString(string);

      var strLength = string.length;
      if (hasUnicode(string)) {
        var strSymbols = stringToArray(string);
        strLength = strSymbols.length;
      }
      if (length >= strLength) {
        return string;
      }
      var end = length - stringSize(omission);
      if (end < 1) {
        return omission;
      }
      var result = strSymbols
        ? castSlice(strSymbols, 0, end).join('')
        : string.slice(0, end);

      if (separator === undefined) {
        return result + omission;
      }
      if (strSymbols) {
        end += (result.length - end);
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              substring = result;

          if (!separator.global) {
            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            var newEnd = match.index;
          }
          result = result.slice(0, newEnd === undefined ? end : newEnd);
        }
      } else if (string.indexOf(baseToString(separator), end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
     * their corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional
     * HTML entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @since 0.6.0
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = toString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */
    var upperCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toUpperCase();
    });

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? undefined : pattern;

      if (pattern === undefined) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = baseRest(function(func, args) {
      try {
        return apply(func, undefined, args);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method.
     *
     * **Note:** This method doesn't set the "length" property of bound functions.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} methodNames The object method names to bind.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'click': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view, ['click']);
     * jQuery(element).on('click', view.click);
     * // => Logs 'clicked docs' when clicked.
     */
    var bindAll = flatRest(function(object, methodNames) {
      arrayEach(methodNames, function(key) {
        key = toKey(key);
        baseAssignValue(object, key, bind(object[key], object));
      });
      return object;
    });

    /**
     * Creates a function that iterates over `pairs` and invokes the corresponding
     * function of the first predicate to return truthy. The predicate-function
     * pairs are invoked with the `this` binding and arguments of the created
     * function.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Array} pairs The predicate-function pairs.
     * @returns {Function} Returns the new composite function.
     * @example
     *
     * var func = _.cond([
     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
     *   [_.stubTrue,                      _.constant('no match')]
     * ]);
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'matches A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'matches B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'no match'
     */
    function cond(pairs) {
      var length = pairs == null ? 0 : pairs.length,
          toIteratee = getIteratee();

      pairs = !length ? [] : arrayMap(pairs, function(pair) {
        if (typeof pair[1] != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return [toIteratee(pair[0]), pair[1]];
      });

      return baseRest(function(args) {
        var index = -1;
        while (++index < length) {
          var pair = pairs[index];
          if (apply(pair[0], this, args)) {
            return apply(pair[1], this, args);
          }
        }
      });
    }

    /**
     * Creates a function that invokes the predicate properties of `source` with
     * the corresponding property values of a given object, returning `true` if
     * all predicates return truthy, else `false`.
     *
     * **Note:** The created function is equivalent to `_.conformsTo` with
     * `source` partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 2, 'b': 1 },
     *   { 'a': 1, 'b': 2 }
     * ];
     *
     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
     * // => [{ 'a': 1, 'b': 2 }]
     */
    function conforms(source) {
      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Util
     * @param {*} value The value to check.
     * @param {*} defaultValue The default value.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * _.defaultTo(1, 10);
     * // => 1
     *
     * _.defaultTo(undefined, 10);
     * // => 10
     */
    function defaultTo(value, defaultValue) {
      return (value == null || value !== value) ? defaultValue : value;
    }

    /**
     * Creates a function that returns the result of invoking the given functions
     * with the `this` binding of the created function, where each successive
     * invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flowRight
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow([_.add, square]);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the given functions from right to left.
     *
     * @static
     * @since 3.0.0
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flow
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight([square, _.add]);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that invokes `func` with the arguments of the created
     * function. If `func` is a property name, the created function returns the
     * property value for a given element. If `func` is an array or object, the
     * created function returns `true` for elements that contain the equivalent
     * source properties, otherwise it returns `false`.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Util
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, _.iteratee(['user', 'fred']));
     * // => [{ 'user': 'fred', 'age': 40 }]
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, _.iteratee('user'));
     * // => ['barney', 'fred']
     *
     * // Create custom iteratee shorthands.
     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
     *     return func.test(string);
     *   };
     * });
     *
     * _.filter(['abc', 'def'], /ef/);
     * // => ['def']
     */
    function iteratee(func) {
      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between a given
     * object and `source`, returning `true` if the given object has equivalent
     * property values, else `false`.
     *
     * **Note:** The created function is equivalent to `_.isMatch` with `source`
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * **Note:** Multiple values can be checked by combining several matchers
     * using `_.overSome`
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
     *
     * // Checking for several possible values
     * _.filter(objects, _.overSome([_.matches({ 'a': 1 }), _.matches({ 'a': 4 })]));
     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between the
     * value at `path` of a given object to `srcValue`, returning `true` if the
     * object value is equivalent, else `false`.
     *
     * **Note:** Partial comparisons will match empty array and empty object
     * `srcValue` values against any array or object value, respectively. See
     * `_.isEqual` for a list of supported value comparisons.
     *
     * **Note:** Multiple values can be checked by combining several matchers
     * using `_.overSome`
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.find(objects, _.matchesProperty('a', 4));
     * // => { 'a': 4, 'b': 5, 'c': 6 }
     *
     * // Checking for several possible values
     * _.filter(objects, _.overSome([_.matchesProperty('a', 1), _.matchesProperty('a', 4)]));
     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that invokes the method at `path` of a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': _.constant(2) } },
     *   { 'a': { 'b': _.constant(1) } }
     * ];
     *
     * _.map(objects, _.method('a.b'));
     * // => [2, 1]
     *
     * _.map(objects, _.method(['a', 'b']));
     * // => [2, 1]
     */
    var method = baseRest(function(path, args) {
      return function(object) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path of `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = baseRest(function(object, args) {
      return function(path) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * Adds all own enumerable string keyed function properties of a source
     * object to the destination object. If `object` is a function, then methods
     * are added to its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      var props = keys(source),
          methodNames = baseFunctions(source, props);

      if (options == null &&
          !(isObject(source) && (methodNames.length || !props.length))) {
        options = source;
        source = object;
        object = this;
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);

      arrayEach(methodNames, function(methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);

              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, arrayPush([this.value()], arguments));
          };
        }
      });

      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }

    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that gets the argument at index `n`. If `n` is negative,
     * the nth argument from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [n=0] The index of the argument to return.
     * @returns {Function} Returns the new pass-thru function.
     * @example
     *
     * var func = _.nthArg(1);
     * func('a', 'b', 'c', 'd');
     * // => 'b'
     *
     * var func = _.nthArg(-2);
     * func('a', 'b', 'c', 'd');
     * // => 'c'
     */
    function nthArg(n) {
      n = toInteger(n);
      return baseRest(function(args) {
        return baseNth(args, n);
      });
    }

    /**
     * Creates a function that invokes `iteratees` with the arguments it receives
     * and returns their results.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.over([Math.max, Math.min]);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */
    var over = createOver(arrayMap);

    /**
     * Creates a function that checks if **all** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * Following shorthands are possible for providing predicates.
     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overEvery([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => false
     *
     * func(NaN);
     * // => false
     */
    var overEvery = createOver(arrayEvery);

    /**
     * Creates a function that checks if **any** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * Following shorthands are possible for providing predicates.
     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overSome([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => true
     *
     * func(NaN);
     * // => false
     *
     * var matchesFunc = _.overSome([{ 'a': 1 }, { 'a': 2 }])
     * var matchesPropertyFunc = _.overSome([['a', 1], ['a', 2]])
     */
    var overSome = createOver(arraySome);

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the value at a given path of `object`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return object == null ? undefined : baseGet(object, path);
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
     * `start` is specified without an `end` or `step`. If `end` is not specified,
     * it's set to `start` with `start` then set to `0`.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.rangeRight
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(-4);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    var range = createRange();

    /**
     * This method is like `_.range` except that it populates values in
     * descending order.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.range
     * @example
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */
    var rangeRight = createRange(true);

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /**
     * This method returns a new empty object.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Object} Returns the new empty object.
     * @example
     *
     * var objects = _.times(2, _.stubObject);
     *
     * console.log(objects);
     * // => [{}, {}]
     *
     * console.log(objects[0] === objects[1]);
     * // => false
     */
    function stubObject() {
      return {};
    }

    /**
     * This method returns an empty string.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {string} Returns the empty string.
     * @example
     *
     * _.times(2, _.stubString);
     * // => ['', '']
     */
    function stubString() {
      return '';
    }

    /**
     * This method returns `true`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `true`.
     * @example
     *
     * _.times(2, _.stubTrue);
     * // => [true, true]
     */
    function stubTrue() {
      return true;
    }

    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argument; (index).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.times(3, String);
     * // => ['0', '1', '2']
     *
     *  _.times(4, _.constant(0));
     * // => [0, 0, 0, 0]
     */
    function times(n, iteratee) {
      n = toInteger(n);
      if (n < 1 || n > MAX_SAFE_INTEGER) {
        return [];
      }
      var index = MAX_ARRAY_LENGTH,
          length = nativeMin(n, MAX_ARRAY_LENGTH);

      iteratee = getIteratee(iteratee);
      n -= MAX_ARRAY_LENGTH;

      var result = baseTimes(length, iteratee);
      while (++index < n) {
        iteratee(index);
      }
      return result;
    }

    /**
     * Converts `value` to a property path array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {*} value The value to convert.
     * @returns {Array} Returns the new property path array.
     * @example
     *
     * _.toPath('a.b.c');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].b.c');
     * // => ['a', '0', 'b', 'c']
     */
    function toPath(value) {
      if (isArray(value)) {
        return arrayMap(value, toKey);
      }
      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
    }

    /**
     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {string} [prefix=''] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    var add = createMathOperation(function(augend, addend) {
      return augend + addend;
    }, 0);

    /**
     * Computes `number` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = createRound('ceil');

    /**
     * Divide two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} dividend The first number in a division.
     * @param {number} divisor The second number in a division.
     * @returns {number} Returns the quotient.
     * @example
     *
     * _.divide(6, 4);
     * // => 1.5
     */
    var divide = createMathOperation(function(dividend, divisor) {
      return dividend / divisor;
    }, 1);

    /**
     * Computes `number` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Computes the maximum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => undefined
     */
    function max(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseGt)
        : undefined;
    }

    /**
     * This method is like `_.max` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(objects, function(o) { return o.n; });
     * // => { 'n': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.maxBy(objects, 'n');
     * // => { 'n': 2 }
     */
    function maxBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
        : undefined;
    }

    /**
     * Computes the mean of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the mean.
     * @example
     *
     * _.mean([4, 2, 8, 6]);
     * // => 5
     */
    function mean(array) {
      return baseMean(array, identity);
    }

    /**
     * This method is like `_.mean` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be averaged.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the mean.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.meanBy(objects, function(o) { return o.n; });
     * // => 5
     *
     * // The `_.property` iteratee shorthand.
     * _.meanBy(objects, 'n');
     * // => 5
     */
    function meanBy(array, iteratee) {
      return baseMean(array, getIteratee(iteratee, 2));
    }

    /**
     * Computes the minimum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => undefined
     */
    function min(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseLt)
        : undefined;
    }

    /**
     * This method is like `_.min` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return o.n; });
     * // => { 'n': 1 }
     *
     * // The `_.property` iteratee shorthand.
     * _.minBy(objects, 'n');
     * // => { 'n': 1 }
     */
    function minBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
        : undefined;
    }

    /**
     * Multiply two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} multiplier The first number in a multiplication.
     * @param {number} multiplicand The second number in a multiplication.
     * @returns {number} Returns the product.
     * @example
     *
     * _.multiply(6, 4);
     * // => 24
     */
    var multiply = createMathOperation(function(multiplier, multiplicand) {
      return multiplier * multiplicand;
    }, 1);

    /**
     * Computes `number` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Subtract two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {number} minuend The first number in a subtraction.
     * @param {number} subtrahend The second number in a subtraction.
     * @returns {number} Returns the difference.
     * @example
     *
     * _.subtract(6, 4);
     * // => 2
     */
    var subtract = createMathOperation(function(minuend, subtrahend) {
      return minuend - subtrahend;
    }, 0);

    /**
     * Computes the sum of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */
    function sum(array) {
      return (array && array.length)
        ? baseSum(array, identity)
        : 0;
    }

    /**
     * This method is like `_.sum` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be summed.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the sum.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return o.n; });
     * // => 20
     *
     * // The `_.property` iteratee shorthand.
     * _.sumBy(objects, 'n');
     * // => 20
     */
    function sumBy(array, iteratee) {
      return (array && array.length)
        ? baseSum(array, getIteratee(iteratee, 2))
        : 0;
    }

    /*------------------------------------------------------------------------*/

    // Add methods that return wrapped values in chain sequences.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.assignIn = assignIn;
    lodash.assignInWith = assignInWith;
    lodash.assignWith = assignWith;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.castArray = castArray;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.concat = concat;
    lodash.cond = cond;
    lodash.conforms = conforms;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.differenceBy = differenceBy;
    lodash.differenceWith = differenceWith;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatMap = flatMap;
    lodash.flatMapDeep = flatMapDeep;
    lodash.flatMapDepth = flatMapDepth;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flattenDepth = flattenDepth;
    lodash.flip = flip;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.fromPairs = fromPairs;
    lodash.functions = functions;
    lodash.functionsIn = functionsIn;
    lodash.groupBy = groupBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.intersectionBy = intersectionBy;
    lodash.intersectionWith = intersectionWith;
    lodash.invert = invert;
    lodash.invertBy = invertBy;
    lodash.invokeMap = invokeMap;
    lodash.iteratee = iteratee;
    lodash.keyBy = keyBy;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.mergeWith = mergeWith;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.nthArg = nthArg;
    lodash.omit = omit;
    lodash.omitBy = omitBy;
    lodash.once = once;
    lodash.orderBy = orderBy;
    lodash.over = over;
    lodash.overArgs = overArgs;
    lodash.overEvery = overEvery;
    lodash.overSome = overSome;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pickBy = pickBy;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAll = pullAll;
    lodash.pullAllBy = pullAllBy;
    lodash.pullAllWith = pullAllWith;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rangeRight = rangeRight;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.reverse = reverse;
    lodash.sampleSize = sampleSize;
    lodash.set = set;
    lodash.setWith = setWith;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortedUniq = sortedUniq;
    lodash.sortedUniqBy = sortedUniqBy;
    lodash.split = split;
    lodash.spread = spread;
    lodash.tail = tail;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.toArray = toArray;
    lodash.toPairs = toPairs;
    lodash.toPairsIn = toPairsIn;
    lodash.toPath = toPath;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.unary = unary;
    lodash.union = union;
    lodash.unionBy = unionBy;
    lodash.unionWith = unionWith;
    lodash.uniq = uniq;
    lodash.uniqBy = uniqBy;
    lodash.uniqWith = uniqWith;
    lodash.unset = unset;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.update = update;
    lodash.updateWith = updateWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.without = without;
    lodash.words = words;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.xorBy = xorBy;
    lodash.xorWith = xorWith;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipObjectDeep = zipObjectDeep;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.entries = toPairs;
    lodash.entriesIn = toPairsIn;
    lodash.extend = assignIn;
    lodash.extendWith = assignInWith;

    // Add methods to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add methods that return unwrapped values in chain sequences.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clamp = clamp;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.cloneDeepWith = cloneDeepWith;
    lodash.cloneWith = cloneWith;
    lodash.conformsTo = conformsTo;
    lodash.deburr = deburr;
    lodash.defaultTo = defaultTo;
    lodash.divide = divide;
    lodash.endsWith = endsWith;
    lodash.eq = eq;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.floor = floor;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.hasIn = hasIn;
    lodash.head = head;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.invoke = invoke;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isArrayBuffer = isArrayBuffer;
    lodash.isArrayLike = isArrayLike;
    lodash.isArrayLikeObject = isArrayLikeObject;
    lodash.isBoolean = isBoolean;
    lodash.isBuffer = isBuffer;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isEqualWith = isEqualWith;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isInteger = isInteger;
    lodash.isLength = isLength;
    lodash.isMap = isMap;
    lodash.isMatch = isMatch;
    lodash.isMatchWith = isMatchWith;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNil = isNil;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isObjectLike = isObjectLike;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isSafeInteger = isSafeInteger;
    lodash.isSet = isSet;
    lodash.isString = isString;
    lodash.isSymbol = isSymbol;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.isWeakMap = isWeakMap;
    lodash.isWeakSet = isWeakSet;
    lodash.join = join;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lowerCase = lowerCase;
    lodash.lowerFirst = lowerFirst;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.maxBy = maxBy;
    lodash.mean = mean;
    lodash.meanBy = meanBy;
    lodash.min = min;
    lodash.minBy = minBy;
    lodash.stubArray = stubArray;
    lodash.stubFalse = stubFalse;
    lodash.stubObject = stubObject;
    lodash.stubString = stubString;
    lodash.stubTrue = stubTrue;
    lodash.multiply = multiply;
    lodash.nth = nth;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padEnd = padEnd;
    lodash.padStart = padStart;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.replace = replace;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.sample = sample;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedIndexBy = sortedIndexBy;
    lodash.sortedIndexOf = sortedIndexOf;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.sortedLastIndexBy = sortedLastIndexBy;
    lodash.sortedLastIndexOf = sortedLastIndexOf;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.subtract = subtract;
    lodash.sum = sum;
    lodash.sumBy = sumBy;
    lodash.template = template;
    lodash.times = times;
    lodash.toFinite = toFinite;
    lodash.toInteger = toInteger;
    lodash.toLength = toLength;
    lodash.toLower = toLower;
    lodash.toNumber = toNumber;
    lodash.toSafeInteger = toSafeInteger;
    lodash.toString = toString;
    lodash.toUpper = toUpper;
    lodash.trim = trim;
    lodash.trimEnd = trimEnd;
    lodash.trimStart = trimStart;
    lodash.truncate = truncate;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.upperCase = upperCase;
    lodash.upperFirst = upperFirst;

    // Add aliases.
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.first = head;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), { 'chain': false });

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type {string}
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        n = n === undefined ? 1 : nativeMax(toInteger(n), 0);

        var result = (this.__filtered__ && !index)
          ? new LazyWrapper(this)
          : this.clone();

        if (result.__filtered__) {
          result.__takeCount__ = nativeMin(n, result.__takeCount__);
        } else {
          result.__views__.push({
            'size': nativeMin(n, MAX_ARRAY_LENGTH),
            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
          });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee) {
        var result = this.clone();
        result.__iteratees__.push({
          'iteratee': getIteratee(iteratee, 3),
          'type': type
        });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.head` and `_.last`.
    arrayEach(['head', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
    arrayEach(['initial', 'tail'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.find = function(predicate) {
      return this.filter(predicate).head();
    };

    LazyWrapper.prototype.findLast = function(predicate) {
      return this.reverse().find(predicate);
    };

    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
      if (typeof path == 'function') {
        return new LazyWrapper(this);
      }
      return this.map(function(value) {
        return baseInvoke(value, path, args);
      });
    });

    LazyWrapper.prototype.reject = function(predicate) {
      return this.filter(negate(getIteratee(predicate)));
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = toInteger(start);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined) {
        end = toInteger(end);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate) {
      return this.reverse().takeWhile(predicate).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(MAX_ARRAY_LENGTH);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
          isTaker = /^(?:head|last)$/.test(methodName),
          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
          retUnwrapped = isTaker || /^find/.test(methodName);

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__,
            args = isTaker ? [1] : arguments,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        var interceptor = function(value) {
          var result = lodashFunc.apply(lodash, arrayPush([value], args));
          return (isTaker && chainAll) ? result[0] : result;
        };

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var chainAll = this.__chain__,
            isHybrid = !!this.__actions__.length,
            isUnwrapped = retUnwrapped && !chainAll,
            onlyLazy = isLazy && !isHybrid;

        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
          return new LodashWrapper(result, chainAll);
        }
        if (isUnwrapped && onlyLazy) {
          return func.apply(this, args);
        }
        result = this.thru(interceptor);
        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
      };
    });

    // Add `Array` methods to `lodash.prototype`.
    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = arrayProto[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });

    // Map minified method names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = lodashFunc.name + '';
        if (!hasOwnProperty.call(realNames, key)) {
          realNames[key] = [];
        }
        realNames[key].push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
      'name': 'wrapper',
      'func': undefined
    }];

    // Add methods to `LazyWrapper`.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chain sequence methods to the `lodash` wrapper.
    lodash.prototype.at = wrapperAt;
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.next = wrapperNext;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add lazy aliases.
    lodash.prototype.first = lodash.prototype.head;

    if (symIterator) {
      lodash.prototype[symIterator] = wrapperToIterator;
    }
    return lodash;
  });

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = _)._ = _;
    // Export for CommonJS support.
    freeExports._ = _;
  }
  else {
    // Export to the global object.
    root._ = _;
  }
}.call(this));


},
4135(module) {
module.exports = Pend;

function Pend() {
  this.pending = 0;
  this.max = Infinity;
  this.listeners = [];
  this.waiting = [];
  this.error = null;
}

Pend.prototype.go = function(fn) {
  if (this.pending < this.max) {
    pendGo(this, fn);
  } else {
    this.waiting.push(fn);
  }
};

Pend.prototype.wait = function(cb) {
  if (this.pending === 0) {
    cb(this.error);
  } else {
    this.listeners.push(cb);
  }
};

Pend.prototype.hold = function() {
  return pendHold(this);
};

function pendHold(self) {
  self.pending += 1;
  var called = false;
  return onCb;
  function onCb(err) {
    if (called) throw new Error("callback called twice");
    called = true;
    self.error = self.error || err;
    self.pending -= 1;
    if (self.waiting.length > 0 && self.pending < self.max) {
      pendGo(self, self.waiting.shift());
    } else if (self.pending === 0) {
      var listeners = self.listeners;
      self.listeners = [];
      listeners.forEach(cbListener);
    }
  }
  function cbListener(listener) {
    listener(self.error);
  }
}

function pendGo(self, fn) {
  fn(pendHold(self));
}


},
505(__unused_rspack_module, exports, __webpack_require__) {
var fs = __webpack_require__(9896);
var zlib = __webpack_require__(3106);
var fd_slicer = __webpack_require__(5979);
var crc32 = __webpack_require__(7174);
var util = __webpack_require__(9023);
var EventEmitter = (__webpack_require__(4434)/* .EventEmitter */.EventEmitter);
var Transform = (__webpack_require__(2203)/* .Transform */.Transform);
var PassThrough = (__webpack_require__(2203)/* .PassThrough */.PassThrough);
var Writable = (__webpack_require__(2203)/* .Writable */.Writable);

exports.open = open;
exports.fromFd = fromFd;
exports.fromBuffer = fromBuffer;
exports.fromRandomAccessReader = fromRandomAccessReader;
exports.dosDateTimeToDate = dosDateTimeToDate;
exports.validateFileName = validateFileName;
exports.ZipFile = ZipFile;
exports.Entry = Entry;
exports.RandomAccessReader = RandomAccessReader;

function open(path, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = null;
  }
  if (options == null) options = {};
  if (options.autoClose == null) options.autoClose = true;
  if (options.lazyEntries == null) options.lazyEntries = false;
  if (options.decodeStrings == null) options.decodeStrings = true;
  if (options.validateEntrySizes == null) options.validateEntrySizes = true;
  if (options.strictFileNames == null) options.strictFileNames = false;
  if (callback == null) callback = defaultCallback;
  fs.open(path, "r", function(err, fd) {
    if (err) return callback(err);
    fromFd(fd, options, function(err, zipfile) {
      if (err) fs.close(fd, defaultCallback);
      callback(err, zipfile);
    });
  });
}

function fromFd(fd, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = null;
  }
  if (options == null) options = {};
  if (options.autoClose == null) options.autoClose = false;
  if (options.lazyEntries == null) options.lazyEntries = false;
  if (options.decodeStrings == null) options.decodeStrings = true;
  if (options.validateEntrySizes == null) options.validateEntrySizes = true;
  if (options.strictFileNames == null) options.strictFileNames = false;
  if (callback == null) callback = defaultCallback;
  fs.fstat(fd, function(err, stats) {
    if (err) return callback(err);
    var reader = fd_slicer.createFromFd(fd, {autoClose: true});
    fromRandomAccessReader(reader, stats.size, options, callback);
  });
}

function fromBuffer(buffer, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = null;
  }
  if (options == null) options = {};
  options.autoClose = false;
  if (options.lazyEntries == null) options.lazyEntries = false;
  if (options.decodeStrings == null) options.decodeStrings = true;
  if (options.validateEntrySizes == null) options.validateEntrySizes = true;
  if (options.strictFileNames == null) options.strictFileNames = false;
  // limit the max chunk size. see https://github.com/thejoshwolfe/yauzl/issues/87
  var reader = fd_slicer.createFromBuffer(buffer, {maxChunkSize: 0x10000});
  fromRandomAccessReader(reader, buffer.length, options, callback);
}

function fromRandomAccessReader(reader, totalSize, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = null;
  }
  if (options == null) options = {};
  if (options.autoClose == null) options.autoClose = true;
  if (options.lazyEntries == null) options.lazyEntries = false;
  if (options.decodeStrings == null) options.decodeStrings = true;
  var decodeStrings = !!options.decodeStrings;
  if (options.validateEntrySizes == null) options.validateEntrySizes = true;
  if (options.strictFileNames == null) options.strictFileNames = false;
  if (callback == null) callback = defaultCallback;
  if (typeof totalSize !== "number") throw new Error("expected totalSize parameter to be a number");
  if (totalSize > Number.MAX_SAFE_INTEGER) {
    throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
  }

  // the matching unref() call is in zipfile.close()
  reader.ref();

  // eocdr means End of Central Directory Record.
  // search backwards for the eocdr signature.
  // the last field of the eocdr is a variable-length comment.
  // the comment size is encoded in a 2-byte field in the eocdr, which we can't find without trudging backwards through the comment to find it.
  // as a consequence of this design decision, it's possible to have ambiguous zip file metadata if a coherent eocdr was in the comment.
  // we search backwards for a eocdr signature, and hope that whoever made the zip file was smart enough to forbid the eocdr signature in the comment.
  var eocdrWithoutCommentSize = 22;
  var maxCommentSize = 0xffff; // 2-byte size
  var bufferSize = Math.min(eocdrWithoutCommentSize + maxCommentSize, totalSize);
  var buffer = newBuffer(bufferSize);
  var bufferReadStart = totalSize - buffer.length;
  readAndAssertNoEof(reader, buffer, 0, bufferSize, bufferReadStart, function(err) {
    if (err) return callback(err);
    for (var i = bufferSize - eocdrWithoutCommentSize; i >= 0; i -= 1) {
      if (buffer.readUInt32LE(i) !== 0x06054b50) continue;
      // found eocdr
      var eocdrBuffer = buffer.slice(i);

      // 0 - End of central directory signature = 0x06054b50
      // 4 - Number of this disk
      var diskNumber = eocdrBuffer.readUInt16LE(4);
      if (diskNumber !== 0) {
        return callback(new Error("multi-disk zip files are not supported: found disk number: " + diskNumber));
      }
      // 6 - Disk where central directory starts
      // 8 - Number of central directory records on this disk
      // 10 - Total number of central directory records
      var entryCount = eocdrBuffer.readUInt16LE(10);
      // 12 - Size of central directory (bytes)
      // 16 - Offset of start of central directory, relative to start of archive
      var centralDirectoryOffset = eocdrBuffer.readUInt32LE(16);
      // 20 - Comment length
      var commentLength = eocdrBuffer.readUInt16LE(20);
      var expectedCommentLength = eocdrBuffer.length - eocdrWithoutCommentSize;
      if (commentLength !== expectedCommentLength) {
        return callback(new Error("invalid comment length. expected: " + expectedCommentLength + ". found: " + commentLength));
      }
      // 22 - Comment
      // the encoding is always cp437.
      var comment = decodeStrings ? decodeBuffer(eocdrBuffer, 22, eocdrBuffer.length, false)
                                  : eocdrBuffer.slice(22);

      if (!(entryCount === 0xffff || centralDirectoryOffset === 0xffffffff)) {
        return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
      }

      // ZIP64 format

      // ZIP64 Zip64 end of central directory locator
      var zip64EocdlBuffer = newBuffer(20);
      var zip64EocdlOffset = bufferReadStart + i - zip64EocdlBuffer.length;
      readAndAssertNoEof(reader, zip64EocdlBuffer, 0, zip64EocdlBuffer.length, zip64EocdlOffset, function(err) {
        if (err) return callback(err);

        // 0 - zip64 end of central dir locator signature = 0x07064b50
        if (zip64EocdlBuffer.readUInt32LE(0) !== 0x07064b50) {
          return callback(new Error("invalid zip64 end of central directory locator signature"));
        }
        // 4 - number of the disk with the start of the zip64 end of central directory
        // 8 - relative offset of the zip64 end of central directory record
        var zip64EocdrOffset = readUInt64LE(zip64EocdlBuffer, 8);
        // 16 - total number of disks

        // ZIP64 end of central directory record
        var zip64EocdrBuffer = newBuffer(56);
        readAndAssertNoEof(reader, zip64EocdrBuffer, 0, zip64EocdrBuffer.length, zip64EocdrOffset, function(err) {
          if (err) return callback(err);

          // 0 - zip64 end of central dir signature                           4 bytes  (0x06064b50)
          if (zip64EocdrBuffer.readUInt32LE(0) !== 0x06064b50) {
            return callback(new Error("invalid zip64 end of central directory record signature"));
          }
          // 4 - size of zip64 end of central directory record                8 bytes
          // 12 - version made by                                             2 bytes
          // 14 - version needed to extract                                   2 bytes
          // 16 - number of this disk                                         4 bytes
          // 20 - number of the disk with the start of the central directory  4 bytes
          // 24 - total number of entries in the central directory on this disk         8 bytes
          // 32 - total number of entries in the central directory            8 bytes
          entryCount = readUInt64LE(zip64EocdrBuffer, 32);
          // 40 - size of the central directory                               8 bytes
          // 48 - offset of start of central directory with respect to the starting disk number     8 bytes
          centralDirectoryOffset = readUInt64LE(zip64EocdrBuffer, 48);
          // 56 - zip64 extensible data sector                                (variable size)
          return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
        });
      });
      return;
    }
    callback(new Error("end of central directory record signature not found"));
  });
}

util.inherits(ZipFile, EventEmitter);
function ZipFile(reader, centralDirectoryOffset, fileSize, entryCount, comment, autoClose, lazyEntries, decodeStrings, validateEntrySizes, strictFileNames) {
  var self = this;
  EventEmitter.call(self);
  self.reader = reader;
  // forward close events
  self.reader.on("error", function(err) {
    // error closing the fd
    emitError(self, err);
  });
  self.reader.once("close", function() {
    self.emit("close");
  });
  self.readEntryCursor = centralDirectoryOffset;
  self.fileSize = fileSize;
  self.entryCount = entryCount;
  self.comment = comment;
  self.entriesRead = 0;
  self.autoClose = !!autoClose;
  self.lazyEntries = !!lazyEntries;
  self.decodeStrings = !!decodeStrings;
  self.validateEntrySizes = !!validateEntrySizes;
  self.strictFileNames = !!strictFileNames;
  self.isOpen = true;
  self.emittedError = false;

  if (!self.lazyEntries) self._readEntry();
}
ZipFile.prototype.close = function() {
  if (!this.isOpen) return;
  this.isOpen = false;
  this.reader.unref();
};

function emitErrorAndAutoClose(self, err) {
  if (self.autoClose) self.close();
  emitError(self, err);
}
function emitError(self, err) {
  if (self.emittedError) return;
  self.emittedError = true;
  self.emit("error", err);
}

ZipFile.prototype.readEntry = function() {
  if (!this.lazyEntries) throw new Error("readEntry() called without lazyEntries:true");
  this._readEntry();
};
ZipFile.prototype._readEntry = function() {
  var self = this;
  if (self.entryCount === self.entriesRead) {
    // done with metadata
    setImmediate(function() {
      if (self.autoClose) self.close();
      if (self.emittedError) return;
      self.emit("end");
    });
    return;
  }
  if (self.emittedError) return;
  var buffer = newBuffer(46);
  readAndAssertNoEof(self.reader, buffer, 0, buffer.length, self.readEntryCursor, function(err) {
    if (err) return emitErrorAndAutoClose(self, err);
    if (self.emittedError) return;
    var entry = new Entry();
    // 0 - Central directory file header signature
    var signature = buffer.readUInt32LE(0);
    if (signature !== 0x02014b50) return emitErrorAndAutoClose(self, new Error("invalid central directory file header signature: 0x" + signature.toString(16)));
    // 4 - Version made by
    entry.versionMadeBy = buffer.readUInt16LE(4);
    // 6 - Version needed to extract (minimum)
    entry.versionNeededToExtract = buffer.readUInt16LE(6);
    // 8 - General purpose bit flag
    entry.generalPurposeBitFlag = buffer.readUInt16LE(8);
    // 10 - Compression method
    entry.compressionMethod = buffer.readUInt16LE(10);
    // 12 - File last modification time
    entry.lastModFileTime = buffer.readUInt16LE(12);
    // 14 - File last modification date
    entry.lastModFileDate = buffer.readUInt16LE(14);
    // 16 - CRC-32
    entry.crc32 = buffer.readUInt32LE(16);
    // 20 - Compressed size
    entry.compressedSize = buffer.readUInt32LE(20);
    // 24 - Uncompressed size
    entry.uncompressedSize = buffer.readUInt32LE(24);
    // 28 - File name length (n)
    entry.fileNameLength = buffer.readUInt16LE(28);
    // 30 - Extra field length (m)
    entry.extraFieldLength = buffer.readUInt16LE(30);
    // 32 - File comment length (k)
    entry.fileCommentLength = buffer.readUInt16LE(32);
    // 34 - Disk number where file starts
    // 36 - Internal file attributes
    entry.internalFileAttributes = buffer.readUInt16LE(36);
    // 38 - External file attributes
    entry.externalFileAttributes = buffer.readUInt32LE(38);
    // 42 - Relative offset of local file header
    entry.relativeOffsetOfLocalHeader = buffer.readUInt32LE(42);

    if (entry.generalPurposeBitFlag & 0x40) return emitErrorAndAutoClose(self, new Error("strong encryption is not supported"));

    self.readEntryCursor += 46;

    buffer = newBuffer(entry.fileNameLength + entry.extraFieldLength + entry.fileCommentLength);
    readAndAssertNoEof(self.reader, buffer, 0, buffer.length, self.readEntryCursor, function(err) {
      if (err) return emitErrorAndAutoClose(self, err);
      if (self.emittedError) return;
      // 46 - File name
      var isUtf8 = (entry.generalPurposeBitFlag & 0x800) !== 0;
      entry.fileName = self.decodeStrings ? decodeBuffer(buffer, 0, entry.fileNameLength, isUtf8)
                                          : buffer.slice(0, entry.fileNameLength);

      // 46+n - Extra field
      var fileCommentStart = entry.fileNameLength + entry.extraFieldLength;
      var extraFieldBuffer = buffer.slice(entry.fileNameLength, fileCommentStart);
      entry.extraFields = [];
      var i = 0;
      while (i < extraFieldBuffer.length - 3) {
        var headerId = extraFieldBuffer.readUInt16LE(i + 0);
        var dataSize = extraFieldBuffer.readUInt16LE(i + 2);
        var dataStart = i + 4;
        var dataEnd = dataStart + dataSize;
        if (dataEnd > extraFieldBuffer.length) return emitErrorAndAutoClose(self, new Error("extra field length exceeds extra field buffer size"));
        var dataBuffer = newBuffer(dataSize);
        extraFieldBuffer.copy(dataBuffer, 0, dataStart, dataEnd);
        entry.extraFields.push({
          id: headerId,
          data: dataBuffer,
        });
        i = dataEnd;
      }

      // 46+n+m - File comment
      entry.fileComment = self.decodeStrings ? decodeBuffer(buffer, fileCommentStart, fileCommentStart + entry.fileCommentLength, isUtf8)
                                             : buffer.slice(fileCommentStart, fileCommentStart + entry.fileCommentLength);
      // compatibility hack for https://github.com/thejoshwolfe/yauzl/issues/47
      entry.comment = entry.fileComment;

      self.readEntryCursor += buffer.length;
      self.entriesRead += 1;

      if (entry.uncompressedSize            === 0xffffffff ||
          entry.compressedSize              === 0xffffffff ||
          entry.relativeOffsetOfLocalHeader === 0xffffffff) {
        // ZIP64 format
        // find the Zip64 Extended Information Extra Field
        var zip64EiefBuffer = null;
        for (var i = 0; i < entry.extraFields.length; i++) {
          var extraField = entry.extraFields[i];
          if (extraField.id === 0x0001) {
            zip64EiefBuffer = extraField.data;
            break;
          }
        }
        if (zip64EiefBuffer == null) {
          return emitErrorAndAutoClose(self, new Error("expected zip64 extended information extra field"));
        }
        var index = 0;
        // 0 - Original Size          8 bytes
        if (entry.uncompressedSize === 0xffffffff) {
          if (index + 8 > zip64EiefBuffer.length) {
            return emitErrorAndAutoClose(self, new Error("zip64 extended information extra field does not include uncompressed size"));
          }
          entry.uncompressedSize = readUInt64LE(zip64EiefBuffer, index);
          index += 8;
        }
        // 8 - Compressed Size        8 bytes
        if (entry.compressedSize === 0xffffffff) {
          if (index + 8 > zip64EiefBuffer.length) {
            return emitErrorAndAutoClose(self, new Error("zip64 extended information extra field does not include compressed size"));
          }
          entry.compressedSize = readUInt64LE(zip64EiefBuffer, index);
          index += 8;
        }
        // 16 - Relative Header Offset 8 bytes
        if (entry.relativeOffsetOfLocalHeader === 0xffffffff) {
          if (index + 8 > zip64EiefBuffer.length) {
            return emitErrorAndAutoClose(self, new Error("zip64 extended information extra field does not include relative header offset"));
          }
          entry.relativeOffsetOfLocalHeader = readUInt64LE(zip64EiefBuffer, index);
          index += 8;
        }
        // 24 - Disk Start Number      4 bytes
      }

      // check for Info-ZIP Unicode Path Extra Field (0x7075)
      // see https://github.com/thejoshwolfe/yauzl/issues/33
      if (self.decodeStrings) {
        for (var i = 0; i < entry.extraFields.length; i++) {
          var extraField = entry.extraFields[i];
          if (extraField.id === 0x7075) {
            if (extraField.data.length < 6) {
              // too short to be meaningful
              continue;
            }
            // Version       1 byte      version of this extra field, currently 1
            if (extraField.data.readUInt8(0) !== 1) {
              // > Changes may not be backward compatible so this extra
              // > field should not be used if the version is not recognized.
              continue;
            }
            // NameCRC32     4 bytes     File Name Field CRC32 Checksum
            var oldNameCrc32 = extraField.data.readUInt32LE(1);
            if (crc32.unsigned(buffer.slice(0, entry.fileNameLength)) !== oldNameCrc32) {
              // > If the CRC check fails, this UTF-8 Path Extra Field should be
              // > ignored and the File Name field in the header should be used instead.
              continue;
            }
            // UnicodeName   Variable    UTF-8 version of the entry File Name
            entry.fileName = decodeBuffer(extraField.data, 5, extraField.data.length, true);
            break;
          }
        }
      }

      // validate file size
      if (self.validateEntrySizes && entry.compressionMethod === 0) {
        var expectedCompressedSize = entry.uncompressedSize;
        if (entry.isEncrypted()) {
          // traditional encryption prefixes the file data with a header
          expectedCompressedSize += 12;
        }
        if (entry.compressedSize !== expectedCompressedSize) {
          var msg = "compressed/uncompressed size mismatch for stored file: " + entry.compressedSize + " != " + entry.uncompressedSize;
          return emitErrorAndAutoClose(self, new Error(msg));
        }
      }

      if (self.decodeStrings) {
        if (!self.strictFileNames) {
          // allow backslash
          entry.fileName = entry.fileName.replace(/\\/g, "/");
        }
        var errorMessage = validateFileName(entry.fileName, self.validateFileNameOptions);
        if (errorMessage != null) return emitErrorAndAutoClose(self, new Error(errorMessage));
      }
      self.emit("entry", entry);

      if (!self.lazyEntries) self._readEntry();
    });
  });
};

ZipFile.prototype.openReadStream = function(entry, options, callback) {
  var self = this;
  // parameter validation
  var relativeStart = 0;
  var relativeEnd = entry.compressedSize;
  if (callback == null) {
    callback = options;
    options = {};
  } else {
    // validate options that the caller has no excuse to get wrong
    if (options.decrypt != null) {
      if (!entry.isEncrypted()) {
        throw new Error("options.decrypt can only be specified for encrypted entries");
      }
      if (options.decrypt !== false) throw new Error("invalid options.decrypt value: " + options.decrypt);
      if (entry.isCompressed()) {
        if (options.decompress !== false) throw new Error("entry is encrypted and compressed, and options.decompress !== false");
      }
    }
    if (options.decompress != null) {
      if (!entry.isCompressed()) {
        throw new Error("options.decompress can only be specified for compressed entries");
      }
      if (!(options.decompress === false || options.decompress === true)) {
        throw new Error("invalid options.decompress value: " + options.decompress);
      }
    }
    if (options.start != null || options.end != null) {
      if (entry.isCompressed() && options.decompress !== false) {
        throw new Error("start/end range not allowed for compressed entry without options.decompress === false");
      }
      if (entry.isEncrypted() && options.decrypt !== false) {
        throw new Error("start/end range not allowed for encrypted entry without options.decrypt === false");
      }
    }
    if (options.start != null) {
      relativeStart = options.start;
      if (relativeStart < 0) throw new Error("options.start < 0");
      if (relativeStart > entry.compressedSize) throw new Error("options.start > entry.compressedSize");
    }
    if (options.end != null) {
      relativeEnd = options.end;
      if (relativeEnd < 0) throw new Error("options.end < 0");
      if (relativeEnd > entry.compressedSize) throw new Error("options.end > entry.compressedSize");
      if (relativeEnd < relativeStart) throw new Error("options.end < options.start");
    }
  }
  // any further errors can either be caused by the zipfile,
  // or were introduced in a minor version of yauzl,
  // so should be passed to the client rather than thrown.
  if (!self.isOpen) return callback(new Error("closed"));
  if (entry.isEncrypted()) {
    if (options.decrypt !== false) return callback(new Error("entry is encrypted, and options.decrypt !== false"));
  }
  // make sure we don't lose the fd before we open the actual read stream
  self.reader.ref();
  var buffer = newBuffer(30);
  readAndAssertNoEof(self.reader, buffer, 0, buffer.length, entry.relativeOffsetOfLocalHeader, function(err) {
    try {
      if (err) return callback(err);
      // 0 - Local file header signature = 0x04034b50
      var signature = buffer.readUInt32LE(0);
      if (signature !== 0x04034b50) {
        return callback(new Error("invalid local file header signature: 0x" + signature.toString(16)));
      }
      // all this should be redundant
      // 4 - Version needed to extract (minimum)
      // 6 - General purpose bit flag
      // 8 - Compression method
      // 10 - File last modification time
      // 12 - File last modification date
      // 14 - CRC-32
      // 18 - Compressed size
      // 22 - Uncompressed size
      // 26 - File name length (n)
      var fileNameLength = buffer.readUInt16LE(26);
      // 28 - Extra field length (m)
      var extraFieldLength = buffer.readUInt16LE(28);
      // 30 - File name
      // 30+n - Extra field
      var localFileHeaderEnd = entry.relativeOffsetOfLocalHeader + buffer.length + fileNameLength + extraFieldLength;
      var decompress;
      if (entry.compressionMethod === 0) {
        // 0 - The file is stored (no compression)
        decompress = false;
      } else if (entry.compressionMethod === 8) {
        // 8 - The file is Deflated
        decompress = options.decompress != null ? options.decompress : true;
      } else {
        return callback(new Error("unsupported compression method: " + entry.compressionMethod));
      }
      var fileDataStart = localFileHeaderEnd;
      var fileDataEnd = fileDataStart + entry.compressedSize;
      if (entry.compressedSize !== 0) {
        // bounds check now, because the read streams will probably not complain loud enough.
        // since we're dealing with an unsigned offset plus an unsigned size,
        // we only have 1 thing to check for.
        if (fileDataEnd > self.fileSize) {
          return callback(new Error("file data overflows file bounds: " +
              fileDataStart + " + " + entry.compressedSize + " > " + self.fileSize));
        }
      }
      var readStream = self.reader.createReadStream({
        start: fileDataStart + relativeStart,
        end: fileDataStart + relativeEnd,
      });
      var endpointStream = readStream;
      if (decompress) {
        var destroyed = false;
        var inflateFilter = zlib.createInflateRaw();
        readStream.on("error", function(err) {
          // setImmediate here because errors can be emitted during the first call to pipe()
          setImmediate(function() {
            if (!destroyed) inflateFilter.emit("error", err);
          });
        });
        readStream.pipe(inflateFilter);

        if (self.validateEntrySizes) {
          endpointStream = new AssertByteCountStream(entry.uncompressedSize);
          inflateFilter.on("error", function(err) {
            // forward zlib errors to the client-visible stream
            setImmediate(function() {
              if (!destroyed) endpointStream.emit("error", err);
            });
          });
          inflateFilter.pipe(endpointStream);
        } else {
          // the zlib filter is the client-visible stream
          endpointStream = inflateFilter;
        }
        // this is part of yauzl's API, so implement this function on the client-visible stream
        endpointStream.destroy = function() {
          destroyed = true;
          if (inflateFilter !== endpointStream) inflateFilter.unpipe(endpointStream);
          readStream.unpipe(inflateFilter);
          // TODO: the inflateFilter may cause a memory leak. see Issue #27.
          readStream.destroy();
        };
      }
      callback(null, endpointStream);
    } finally {
      self.reader.unref();
    }
  });
};

function Entry() {
}
Entry.prototype.getLastModDate = function() {
  return dosDateTimeToDate(this.lastModFileDate, this.lastModFileTime);
};
Entry.prototype.isEncrypted = function() {
  return (this.generalPurposeBitFlag & 0x1) !== 0;
};
Entry.prototype.isCompressed = function() {
  return this.compressionMethod === 8;
};

function dosDateTimeToDate(date, time) {
  var day = date & 0x1f; // 1-31
  var month = (date >> 5 & 0xf) - 1; // 1-12, 0-11
  var year = (date >> 9 & 0x7f) + 1980; // 0-128, 1980-2108

  var millisecond = 0;
  var second = (time & 0x1f) * 2; // 0-29, 0-58 (even numbers)
  var minute = time >> 5 & 0x3f; // 0-59
  var hour = time >> 11 & 0x1f; // 0-23

  return new Date(year, month, day, hour, minute, second, millisecond);
}

function validateFileName(fileName) {
  if (fileName.indexOf("\\") !== -1) {
    return "invalid characters in fileName: " + fileName;
  }
  if (/^[a-zA-Z]:/.test(fileName) || /^\//.test(fileName)) {
    return "absolute path: " + fileName;
  }
  if (fileName.split("/").indexOf("..") !== -1) {
    return "invalid relative path: " + fileName;
  }
  // all good
  return null;
}

function readAndAssertNoEof(reader, buffer, offset, length, position, callback) {
  if (length === 0) {
    // fs.read will throw an out-of-bounds error if you try to read 0 bytes from a 0 byte file
    return setImmediate(function() { callback(null, newBuffer(0)); });
  }
  reader.read(buffer, offset, length, position, function(err, bytesRead) {
    if (err) return callback(err);
    if (bytesRead < length) {
      return callback(new Error("unexpected EOF"));
    }
    callback();
  });
}

util.inherits(AssertByteCountStream, Transform);
function AssertByteCountStream(byteCount) {
  Transform.call(this);
  this.actualByteCount = 0;
  this.expectedByteCount = byteCount;
}
AssertByteCountStream.prototype._transform = function(chunk, encoding, cb) {
  this.actualByteCount += chunk.length;
  if (this.actualByteCount > this.expectedByteCount) {
    var msg = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
    return cb(new Error(msg));
  }
  cb(null, chunk);
};
AssertByteCountStream.prototype._flush = function(cb) {
  if (this.actualByteCount < this.expectedByteCount) {
    var msg = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
    return cb(new Error(msg));
  }
  cb();
};

util.inherits(RandomAccessReader, EventEmitter);
function RandomAccessReader() {
  EventEmitter.call(this);
  this.refCount = 0;
}
RandomAccessReader.prototype.ref = function() {
  this.refCount += 1;
};
RandomAccessReader.prototype.unref = function() {
  var self = this;
  self.refCount -= 1;

  if (self.refCount > 0) return;
  if (self.refCount < 0) throw new Error("invalid unref");

  self.close(onCloseDone);

  function onCloseDone(err) {
    if (err) return self.emit('error', err);
    self.emit('close');
  }
};
RandomAccessReader.prototype.createReadStream = function(options) {
  var start = options.start;
  var end = options.end;
  if (start === end) {
    var emptyStream = new PassThrough();
    setImmediate(function() {
      emptyStream.end();
    });
    return emptyStream;
  }
  var stream = this._readStreamForRange(start, end);

  var destroyed = false;
  var refUnrefFilter = new RefUnrefFilter(this);
  stream.on("error", function(err) {
    setImmediate(function() {
      if (!destroyed) refUnrefFilter.emit("error", err);
    });
  });
  refUnrefFilter.destroy = function() {
    stream.unpipe(refUnrefFilter);
    refUnrefFilter.unref();
    stream.destroy();
  };

  var byteCounter = new AssertByteCountStream(end - start);
  refUnrefFilter.on("error", function(err) {
    setImmediate(function() {
      if (!destroyed) byteCounter.emit("error", err);
    });
  });
  byteCounter.destroy = function() {
    destroyed = true;
    refUnrefFilter.unpipe(byteCounter);
    refUnrefFilter.destroy();
  };

  return stream.pipe(refUnrefFilter).pipe(byteCounter);
};
RandomAccessReader.prototype._readStreamForRange = function(start, end) {
  throw new Error("not implemented");
};
RandomAccessReader.prototype.read = function(buffer, offset, length, position, callback) {
  var readStream = this.createReadStream({start: position, end: position + length});
  var writeStream = new Writable();
  var written = 0;
  writeStream._write = function(chunk, encoding, cb) {
    chunk.copy(buffer, offset + written, 0, chunk.length);
    written += chunk.length;
    cb();
  };
  writeStream.on("finish", callback);
  readStream.on("error", function(error) {
    callback(error);
  });
  readStream.pipe(writeStream);
};
RandomAccessReader.prototype.close = function(callback) {
  setImmediate(callback);
};

util.inherits(RefUnrefFilter, PassThrough);
function RefUnrefFilter(context) {
  PassThrough.call(this);
  this.context = context;
  this.context.ref();
  this.unreffedYet = false;
}
RefUnrefFilter.prototype._flush = function(cb) {
  this.unref();
  cb();
};
RefUnrefFilter.prototype.unref = function(cb) {
  if (this.unreffedYet) return;
  this.unreffedYet = true;
  this.context.unref();
};

var cp437 = '\u0000☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ';
function decodeBuffer(buffer, start, end, isUtf8) {
  if (isUtf8) {
    return buffer.toString("utf8", start, end);
  } else {
    var result = "";
    for (var i = start; i < end; i++) {
      result += cp437[buffer[i]];
    }
    return result;
  }
}

function readUInt64LE(buffer, offset) {
  // there is no native function for this, because we can't actually store 64-bit integers precisely.
  // after 53 bits, JavaScript's Number type (IEEE 754 double) can't store individual integers anymore.
  // but since 53 bits is a whole lot more than 32 bits, we do our best anyway.
  var lower32 = buffer.readUInt32LE(offset);
  var upper32 = buffer.readUInt32LE(offset + 4);
  // we can't use bitshifting here, because JavaScript bitshifting only works on 32-bit integers.
  return upper32 * 0x100000000 + lower32;
  // as long as we're bounds checking the result of this function against the total file size,
  // we'll catch any overflow errors, because we already made sure the total file size was within reason.
}

// Node 10 deprecated new Buffer().
var newBuffer;
if (typeof Buffer.allocUnsafe === "function") {
  newBuffer = function(len) {
    return Buffer.allocUnsafe(len);
  };
} else {
  newBuffer = function(len) {
    return new Buffer(len);
  };
}

function defaultCallback(err) {
  if (err) throw err;
}


},
2009(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MAIN_APP_DIRNAME = exports.DEFAULT_MAIN_WINDOW_ID = exports.LOG_LEVEL = exports.ALLOW_OPTIONAL_UPDATES = exports.APP_ID = exports.UPDATE_ENDPOINT = exports.NEW_UPDATE_ENDPOINT = exports.API_ENDPOINT = exports.APP_NAME_FOR_HUMANS = exports.APP_NAME = exports.WEBAPP_PATHS = exports.AllowedMediaOrigins = exports.MenuEvents = exports.AnalyticsEvents = exports.UpdaterEvents = void 0;
exports.init = init;
exports.UpdaterEvents = {
    UPDATE_NOT_AVAILABLE: 'UPDATE_NOT_AVAILABLE',
    CHECKING_FOR_UPDATES: 'CHECKING_FOR_UPDATES',
    UPDATE_ERROR: 'UPDATE_ERROR',
    UPDATE_MANUALLY: 'UPDATE_MANUALLY',
    UPDATE_AVAILABLE: 'UPDATE_AVAILABLE',
    MODULE_INSTALL_PROGRESS: 'MODULE_INSTALL_PROGRESS',
    UPDATE_DOWNLOADED: 'UPDATE_DOWNLOADED',
    MODULE_INSTALLED: 'MODULE_INSTALLED',
    CHECK_FOR_UPDATES: 'CHECK_FOR_UPDATES',
    QUIT_AND_INSTALL: 'QUIT_AND_INSTALL',
    MODULE_INSTALL: 'MODULE_INSTALL',
    MODULE_QUERY: 'MODULE_QUERY',
    UPDATER_HISTORY_QUERY_AND_TRUNCATE: 'UPDATER_HISTORY_QUERY_AND_TRUNCATE',
    UPDATER_HISTORY_RESPONSE: 'UPDATER_HISTORY_RESPONSE',
};
exports.AnalyticsEvents = {
    APP_GET_ANALYTICS_EVENTS: 'APP_GET_ANALYTICS_EVENTS',
    APP_PUSH_ANALYTICS: 'APP_PUSH_ANALYTICS',
    APP_VIEWED: 'APP_VIEWED',
    APP_LOADED: 'APP_LOADED',
    APP_FIRST_RENDER_AFTER_READY_PAYLOAD: 'APP_FIRST_RENDER_AFTER_READY_PAYLOAD',
};
exports.MenuEvents = {
    OPEN_HELP: 'menu:open-help',
    OPEN_SETTINGS: 'menu:open-settings',
    CHECK_FOR_UPDATES: 'menu:check-for-updates',
};
exports.AllowedMediaOrigins = {
    K_ID: 'https://d3ogqhtsivkon3.cloudfront.net',
    K_ID_V2: 'https://family.k-id.com',
    K_ID_FACE_SCAN: 'https://age-verification-k-id.privately.swiss',
};
exports.WEBAPP_PATHS = {
    APP: '/app',
    CONFERENCE_MODE: '/conference-mode',
};
function init(bootstrapConstants) {
    exports.APP_NAME = bootstrapConstants.APP_NAME;
    exports.APP_NAME_FOR_HUMANS = bootstrapConstants.APP_NAME_FOR_HUMANS;
    exports.API_ENDPOINT = bootstrapConstants.API_ENDPOINT;
    exports.NEW_UPDATE_ENDPOINT = bootstrapConstants.NEW_UPDATE_ENDPOINT;
    exports.UPDATE_ENDPOINT = bootstrapConstants.UPDATE_ENDPOINT;
    exports.APP_ID = bootstrapConstants.APP_ID;
    exports.ALLOW_OPTIONAL_UPDATES = bootstrapConstants.ALLOW_OPTIONAL_UPDATES;
    exports.LOG_LEVEL = bootstrapConstants.LOG_LEVEL;
    exports.DEFAULT_MAIN_WINDOW_ID = 0;
    exports.MAIN_APP_DIRNAME = __dirname;
}


},
123(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEnableHardwareAcceleration = getEnableHardwareAcceleration;
exports.setEnableHardwareAcceleration = setEnableHardwareAcceleration;
exports.setChromiumSwitches = setChromiumSwitches;
exports.setSetting = setSetting;
const electron_1 = __webpack_require__(1288);
const appSettings_1 = __webpack_require__(9076);
const settings = appSettings_1.appSettings.getSettings();
function getEnableHardwareAcceleration() {
    if (process.platform === 'darwin') {
        return true;
    }
    if (settings == null) {
        return false;
    }
    return settings.get('enableHardwareAcceleration', true);
}
function setEnableHardwareAcceleration(enableHardwareAcceleration) {
    if (settings == null) {
        return;
    }
    settings.set('enableHardwareAcceleration', enableHardwareAcceleration);
    settings.save();
    electron_1.app.relaunch();
    electron_1.app.exit(0);
}
function setChromiumSwitches(switches) {
    if (settings == null) {
        return;
    }
    settings.set('chromiumSwitches', switches);
    settings.save();
}
function setSetting(key, value) {
    if (settings == null) {
        return;
    }
    settings.set(key, value);
    settings.save();
}


},
8728(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasInit = void 0;
exports.init = init;
exports.refreshAppBadge = refreshAppBadge;
const electron_1 = __webpack_require__(1288);
const ipcMain_1 = __importDefault(__webpack_require__(9139));
const mainScreen_1 = __webpack_require__(1559);
const utils_1 = __webpack_require__(8557);
exports.hasInit = false;
let lastIndex = null;
let lastCount = null;
const appIcons = [];
function isSupported() {
    return process.platform === 'win32';
}
function init() {
    if (!isSupported())
        return;
    if (exports.hasInit) {
        console.warn('appBadge: Has already init! Cancelling init.');
        return;
    }
    exports.hasInit = true;
    lastIndex = null;
    const resourcePath = `app/images/badges`;
    for (let i = 1; i <= 11; i++) {
        const image = (0, utils_1.exposeModuleResource)(resourcePath, `badge-${i}.ico`);
        appIcons.push(image);
    }
    ipcMain_1.default.on('APP_BADGE_SET', (_event, count) => setAppBadge(count, false));
}
function refreshAppBadge() {
    if (!isSupported() || lastCount == null)
        return;
    setAppBadge(lastCount, true);
}
function setAppBadge(count, force) {
    const win = electron_1.BrowserWindow.fromId((0, mainScreen_1.getMainWindowId)());
    if (win == null || win.isDestroyed()) {
        return;
    }
    const { index, description } = getOverlayIconData(count);
    if (force || lastIndex !== index) {
        if (index == null) {
            win.setOverlayIcon(null, description);
        }
        else {
            win.setOverlayIcon(appIcons[index], description);
        }
        lastIndex = index;
    }
    lastCount = count;
}
function getOverlayIconData(count) {
    if (count === -1) {
        return {
            index: 10,
            description: `Unread messages`,
        };
    }
    if (count === 0) {
        return {
            index: null,
            description: 'No Notifications',
        };
    }
    const index = Math.max(1, Math.min(count, 10)) - 1;
    return {
        index,
        description: `${index} notifications`,
    };
}


},
6529(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasInit = void 0;
exports.init = init;
const appSettings_1 = __webpack_require__(9076);
const autoStart_1 = __webpack_require__(3671);
const constants_1 = __webpack_require__(3672);
const ipcMain_1 = __importDefault(__webpack_require__(9139));
const settings = appSettings_1.appSettings.getSettings();
const NOOP = () => { };
exports.hasInit = false;
function init() {
    if (exports.hasInit) {
        return;
    }
    exports.hasInit = true;
    ipcMain_1.default.on('TOGGLE_MINIMIZE_TO_TRAY', (_event, value) => setMinimizeOnClose(value));
    ipcMain_1.default.on('TOGGLE_OPEN_ON_STARTUP', (_event, value) => toggleRunOnStartup(value));
    ipcMain_1.default.on('TOGGLE_START_MINIMIZED', (_event, value) => toggleStartMinimized(value));
    ipcMain_1.default.on('UPDATE_OPEN_ON_STARTUP', (_event) => updateOpenOnStartup());
    ipcMain_1.default.handle(constants_1.IPCEvents.APP_GET_OPEN_ON_START, () => {
        return new Promise((resolve) => {
            autoStart_1.autoStart.isInstalled(resolve);
        });
    });
}
function setMinimizeOnClose(minimizeToTray) {
    if (settings == null) {
        console.warn(`Could not execute 'setMinimizeOnClose', settings was null`);
        return;
    }
    settings.set('MINIMIZE_TO_TRAY', minimizeToTray);
}
function toggleRunOnStartup(openOnStartup) {
    if (openOnStartup) {
        autoStart_1.autoStart.install(NOOP);
    }
    else {
        autoStart_1.autoStart.uninstall(NOOP);
    }
}
function toggleStartMinimized(startMinimized) {
    if (settings == null) {
        console.warn(`Could not execute 'toggleStartMinimized', settings was null`);
        return;
    }
    settings.set('START_MINIMIZED', startMinimized);
    autoStart_1.autoStart.isInstalled((installed) => {
        if (installed) {
            autoStart_1.autoStart.install(NOOP);
        }
    });
}
function updateOpenOnStartup() {
    autoStart_1.autoStart.update(NOOP);
}


},
5444(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = init;
exports.getFeatures = getFeatures;
const FeatureFlags_1 = __importDefault(__webpack_require__(263));
let features;
function init() {
    features = new FeatureFlags_1.default();
}
function getFeatures() {
    return features;
}


},
8307(module, __unused_rspack_exports, __webpack_require__) {
"use strict";

const electron_1 = __webpack_require__(1288);
const securityUtils_1 = __webpack_require__(7815);
const Constants_1 = __webpack_require__(2009);
const { APP_NAME_FOR_HUMANS } = __webpack_require__(2009);
const SEPARATOR = { type: 'separator' };
const developerMenuSection = [
    SEPARATOR,
    {
        label: 'Developer',
        submenu: [
            {
                role: 'toggleDevTools',
            },
        ],
    },
];
const createMenu = (enableDevtools) => [
    {
        role: 'appMenu',
        submenu: [
            {
                label: `About ${APP_NAME_FOR_HUMANS}`,
                role: 'about',
            },
            {
                label: 'Check for Updates...',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.CHECK_FOR_UPDATES),
            },
            {
                label: 'Acknowledgements',
                click: () => (0, securityUtils_1.saferShellOpenExternal)('https://discord.com/acknowledgements'),
            },
            SEPARATOR,
            {
                label: 'Preferences',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.OPEN_SETTINGS),
                accelerator: 'Command+,',
            },
            SEPARATOR,
            {
                role: 'services',
            },
            SEPARATOR,
            {
                label: `Hide ${APP_NAME_FOR_HUMANS}`,
                role: 'hide',
            },
            {
                role: 'hideOthers',
            },
            {
                role: 'unhide',
            },
            SEPARATOR,
            {
                label: `Quit ${APP_NAME_FOR_HUMANS}`,
                role: 'quit',
            },
        ],
    },
    {
        role: 'editMenu',
        submenu: [
            { role: 'undo', accelerator: 'Command+Z' },
            { role: 'redo', accelerator: 'Shift+Command+Z' },
            SEPARATOR,
            { role: 'cut', accelerator: 'Command+X' },
            { role: 'copy', accelerator: 'Command+C' },
            { role: 'paste', accelerator: 'Command+V' },
            { role: 'selectAll', accelerator: 'Command+A' },
        ],
    },
    {
        role: 'viewMenu',
        submenu: [
            {
                label: 'Reload',
                role: 'forceReload',
                accelerator: 'Command+R',
            },
            {
                role: 'togglefullscreen',
            },
            ...(enableDevtools ? developerMenuSection : []),
        ],
    },
    {
        role: 'windowMenu',
        submenu: [
            {
                role: 'minimize',
            },
            {
                role: 'close',
            },
        ],
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Discord Help',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.OPEN_HELP),
            },
        ],
    },
];
module.exports = createMenu;


},
7034(module, __unused_rspack_exports, __webpack_require__) {
"use strict";

const electron_1 = __webpack_require__(1288);
const createMenu = __webpack_require__(1783)("./" + process.platform);
const buildMenu = (enableDevtools) => {
    return electron_1.Menu.buildFromTemplate(createMenu(enableDevtools));
};
module.exports = buildMenu;


},
4832(module, __unused_rspack_exports, __webpack_require__) {
"use strict";

const electron_1 = __webpack_require__(1288);
const Constants_1 = __webpack_require__(2009);
const SEPARATOR = { type: 'separator' };
const buildMenu = (enableDevtools) => [
    {
        label: 'File',
        submenu: [
            {
                label: 'Options',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.OPEN_SETTINGS),
                accelerator: 'Control+,',
            },
            SEPARATOR,
            {
                label: 'Exit',
                click: () => electron_1.app.quit(),
                accelerator: 'Control+Q',
            },
        ],
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo',
                accelerator: 'Control+Z',
            },
            {
                role: 'redo',
                accelerator: 'Shift+Control+Z',
            },
            SEPARATOR,
            {
                role: 'cut',
                accelerator: 'Control+X',
            },
            {
                role: 'copy',
                accelerator: 'Control+C',
            },
            {
                role: 'paste',
                accelerator: 'Control+V',
            },
            {
                role: 'selectAll',
                accelerator: 'Control+A',
            },
        ],
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                click: () => electron_1.BrowserWindow.getFocusedWindow()?.webContents.reloadIgnoringCache(),
                accelerator: 'Control+R',
            },
            {
                label: 'Toggle Full Screen',
                click: () => {
                    const window = electron_1.BrowserWindow.getFocusedWindow();
                    if (window != null) {
                        window.setFullScreen(!window.isFullScreen());
                    }
                },
                accelerator: 'Control+Shift+F',
            },
            ...(enableDevtools
                ? [
                    SEPARATOR,
                    {
                        label: 'Developer',
                        submenu: [
                            {
                                label: 'Toggle Developer Tools',
                                click: () => electron_1.BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools(),
                                accelerator: 'Control+Shift+I',
                            },
                        ],
                    },
                ]
                : []),
        ],
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Check for Updates',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.CHECK_FOR_UPDATES),
            },
            SEPARATOR,
            {
                label: 'Discord Help',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.OPEN_HELP),
            },
        ],
    },
];
module.exports = buildMenu;


},
6673(module, __unused_rspack_exports, __webpack_require__) {
"use strict";

const electron_1 = __webpack_require__(1288);
const Constants_1 = __webpack_require__(2009);
const SEPARATOR = { type: 'separator' };
const buildMenu = (enableDevtools) => [
    {
        label: 'File',
        submenu: [
            {
                label: 'Options',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.OPEN_SETTINGS),
                accelerator: 'Ctrl+,',
            },
            SEPARATOR,
            {
                label: 'Exit',
                click: () => electron_1.app.quit(),
                accelerator: 'Alt+F4',
            },
        ],
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                click: () => electron_1.BrowserWindow.getFocusedWindow()?.webContents.reloadIgnoringCache(),
                accelerator: 'Control+R',
            },
            {
                label: 'Toggle Full Screen',
                click: () => {
                    const window = electron_1.BrowserWindow.getFocusedWindow();
                    if (window != null) {
                        window.setFullScreen(!window.isFullScreen());
                    }
                },
                accelerator: 'F11',
            },
            ...(enableDevtools
                ? [
                    SEPARATOR,
                    {
                        label: 'Developer',
                        submenu: [
                            {
                                label: 'Toggle Developer Tools',
                                click: () => electron_1.BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools(),
                                accelerator: 'Control+Shift+I',
                            },
                        ],
                    },
                ]
                : []),
        ],
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Check for Updates',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.CHECK_FOR_UPDATES),
            },
            SEPARATOR,
            {
                label: 'Discord Help',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.OPEN_HELP),
            },
        ],
    },
];
module.exports = buildMenu;


},
9076(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appSettings = void 0;
var bootstrapModules_1 = __webpack_require__(7475);
Object.defineProperty(exports, "appSettings", ({ enumerable: true, get: function () { return bootstrapModules_1.appSettings; } }));


},
3671(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.autoStart = void 0;
var bootstrapModules_1 = __webpack_require__(7475);
Object.defineProperty(exports, "autoStart", ({ enumerable: true, get: function () { return bootstrapModules_1.autoStart; } }));


},
7475(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updater = exports.splashScreen = exports.paths = exports.moduleUpdater = exports.logger = exports.crashReporterSetup = exports.buildInfo = exports.autoStart = exports.appSettings = exports.analytics = exports.GPUSettings = exports.Constants = void 0;
exports.init = init;
let hasInit = false;
exports.Constants = null;
exports.GPUSettings = null;
exports.analytics = null;
exports.appSettings = null;
exports.autoStart = null;
exports.buildInfo = null;
exports.crashReporterSetup = null;
exports.logger = null;
exports.moduleUpdater = null;
exports.paths = null;
exports.splashScreen = null;
exports.updater = null;
function init(bootstrapModules) {
    if (hasInit) {
        throw new Error(`bootstrapModules has already init`);
    }
    exports.Constants = bootstrapModules.Constants;
    exports.GPUSettings = bootstrapModules.GPUSettings;
    exports.analytics = bootstrapModules.analytics;
    exports.appSettings = bootstrapModules.appSettings;
    exports.autoStart = bootstrapModules.autoStart;
    exports.buildInfo = bootstrapModules.buildInfo;
    exports.crashReporterSetup = bootstrapModules.crashReporterSetup;
    exports.logger = bootstrapModules.logger;
    exports.moduleUpdater = bootstrapModules.moduleUpdater;
    exports.paths = bootstrapModules.paths;
    exports.splashScreen = bootstrapModules.splashScreen;
    exports.updater = bootstrapModules.updater;
    hasInit = true;
}


},
6774(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildInfo = void 0;
var bootstrapModules_1 = __webpack_require__(7475);
Object.defineProperty(exports, "buildInfo", ({ enumerable: true, get: function () { return bootstrapModules_1.buildInfo; } }));


},
623(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.crashReporterSetup = void 0;
const bootstrapModules_1 = __webpack_require__(7475);
const crashReporterSetup = bootstrapModules_1.crashReporterSetup ?? __webpack_require__(1453);
exports.crashReporterSetup = crashReporterSetup;


},
7036(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = void 0;
var bootstrapModules_1 = __webpack_require__(7475);
Object.defineProperty(exports, "logger", ({ enumerable: true, get: function () { return bootstrapModules_1.logger; } }));


},
8919(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.moduleUpdater = void 0;
var bootstrapModules_1 = __webpack_require__(7475);
Object.defineProperty(exports, "moduleUpdater", ({ enumerable: true, get: function () { return bootstrapModules_1.moduleUpdater; } }));


},
1410(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paths = void 0;
var bootstrapModules_1 = __webpack_require__(7475);
Object.defineProperty(exports, "paths", ({ enumerable: true, get: function () { return bootstrapModules_1.paths; } }));


},
4139(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.splashScreen = void 0;
var bootstrapModules_1 = __webpack_require__(7475);
Object.defineProperty(exports, "splashScreen", ({ enumerable: true, get: function () { return bootstrapModules_1.splashScreen; } }));


},
923(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updater = void 0;
var bootstrapModules_1 = __webpack_require__(7475);
Object.defineProperty(exports, "updater", ({ enumerable: true, get: function () { return bootstrapModules_1.updater; } }));


},
356(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __importDefault(__webpack_require__(1288));
const DiscordIPC_1 = __webpack_require__(4443);
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.ACCESSIBILITY_GET_ENABLED, (_) => {
    return Promise.resolve(electron_1.default.app.accessibilitySupportEnabled);
});


},
8883(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectBuildInfo = injectBuildInfo;
exports.injectModuleUpdater = injectModuleUpdater;
exports.injectUpdater = injectUpdater;
const electron_1 = __importDefault(__webpack_require__(1288));
const process = __importStar(__webpack_require__(932));
const DiscordIPC_1 = __webpack_require__(4443);
let injectedBuildInfo = null;
let injectedModuleUpdater = null;
let injectedUpdater = null;
function injectBuildInfo(buildInfo) {
    injectedBuildInfo = buildInfo;
}
function injectModuleUpdater(moduleUpdater) {
    injectedModuleUpdater = moduleUpdater;
}
function injectUpdater(updater) {
    injectedUpdater = updater;
}
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.APP_GET_RELEASE_CHANNEL_SYNC, (event) => {
    event.returnValue = injectedBuildInfo.releaseChannel;
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.APP_GET_HOST_VERSION_SYNC, (event) => {
    event.returnValue = electron_1.default.app.getVersion();
});
async function newUpdaterGetModuleVersions(updater) {
    const queryOptions = {};
    return (await updater.queryCurrentVersionsWithOptions(queryOptions)).current_modules;
}
function newUpdaterGetBuildNumber(updater) {
    const queryOptions = {};
    const version = updater.queryCurrentVersionsWithOptionsSync(queryOptions);
    if (version.running_update != null) {
        return version.running_update.metadata_version;
    }
    return version.last_successful_update.metadata_version;
}
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.APP_GET_BUILD_NUMBER, (event) => {
    const newUpdater = injectedUpdater?.getUpdater();
    if (newUpdater != null) {
        event.returnValue = newUpdaterGetBuildNumber(newUpdater);
        return;
    }
    event.returnValue = null;
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.APP_GET_ARCH, (event) => {
    event.returnValue = process.arch;
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_GET_MODULE_VERSIONS, async (_) => {
    const newUpdater = injectedUpdater?.getUpdater();
    if (newUpdater != null) {
        return newUpdaterGetModuleVersions(newUpdater);
    }
    const versions = {};
    const installed = injectedModuleUpdater != null ? injectedModuleUpdater.getInstalled() : {};
    for (const name of Object.keys(installed)) {
        versions[name] = installed[name].installedVersion;
    }
    return versions;
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_GET_PATH, async (_, path) => {
    return electron_1.default.app.getPath(path);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_SET_BADGE_COUNT, async (_, count) => {
    electron_1.default.app.setBadgeCount(count);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_DOCK_SET_BADGE, async (_, badge) => {
    if (electron_1.default.app.dock != null) {
        electron_1.default.app.dock.setBadge(badge);
    }
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_DOCK_BOUNCE, async (_, type) => {
    if (electron_1.default.app.dock != null) {
        return electron_1.default.app.dock.bounce(type);
    }
    else {
        return -1;
    }
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_DOCK_CANCEL_BOUNCE, async (_, id) => {
    if (electron_1.default.app.dock != null) {
        electron_1.default.app.dock.cancelBounce(id);
    }
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_RELAUNCH, async (_) => {
    electron_1.default.session.defaultSession.flushStorageData();
    electron_1.default.app.relaunch();
    electron_1.default.app.exit(0);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_GET_DEFAULT_DOUBLE_CLICK_ACTION, async (_) => {
    return electron_1.default.systemPreferences.getUserDefault('AppleActionOnDoubleClick', 'string');
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_PAUSE_FRAME_EVICTOR, async (_) => {
    return electron_1.default.app.pauseFrameEvictionManager?.();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_UNPAUSE_FRAME_EVICTOR, async (_) => {
    return electron_1.default.app.unpauseFrameEvictionManager?.();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.APP_GET_PREFERRED_SYSTEM_LANGUAGES, async (_) => {
    return electron_1.default.app.getPreferredSystemLanguages();
});


},
6290(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron = __importStar(__webpack_require__(1288));
const { CLIPBOARD_COPY, CLIPBOARD_CUT, CLIPBOARD_PASTE } = (__webpack_require__(3672)/* .IPCEvents */.IPCEvents);
electron.ipcMain.handle(CLIPBOARD_COPY, async (_) => {
    electron.webContents.getFocusedWebContents()?.copy();
});
electron.ipcMain.handle(CLIPBOARD_CUT, async (_) => {
    electron.webContents.getFocusedWebContents()?.cut();
});
electron.ipcMain.handle(CLIPBOARD_PASTE, async (_) => {
    electron.webContents.getFocusedWebContents()?.paste();
});


},
6351(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupClipsProtocol = setupClipsProtocol;
const buffer_1 = __importDefault(__webpack_require__(181));
const electron_1 = __webpack_require__(1288);
const node_fs_1 = __webpack_require__(3024);
const promises_1 = __importDefault(__webpack_require__(1455));
const node_stream_1 = __webpack_require__(7075);
const path_1 = __importDefault(__webpack_require__(6928));
const constants_1 = __webpack_require__(7233);
const utils_1 = __webpack_require__(5109);
const DiscordIPC_1 = __webpack_require__(4443);
const fileutils_1 = __webpack_require__(7138);
const MAX_LENGTH = buffer_1.default.constants.MAX_LENGTH;
const INVALID_FILE_ERROR = 'Invalid file';
const BOX_HEADER_SIZE_BYTES = 8;
const DISCORD_UUID = 'a1c8529933464db888f083f57a75a5ef';
const UUID_BOX_NAME = 'uuid';
const UUID_SIZE_BYTES = 16;
const MP4_SIGNATURE = 'ftypisom';
const MP4_SIGNATURE_SIZE_BYTES = 8;
const MP4_SIGNATURE_OFFSET_BYTES = 4;
const RANGE_HEADER_REGEX = /bytes=(\d+)?-(\d+)?/;
class InvalidFileError extends Error {
}
function verifyIsMP4(buffer) {
    if (buffer.toString('ascii', MP4_SIGNATURE_OFFSET_BYTES, MP4_SIGNATURE_OFFSET_BYTES + MP4_SIGNATURE_SIZE_BYTES)
        !== MP4_SIGNATURE) {
        throw new InvalidFileError(INVALID_FILE_ERROR);
    }
}
function verifyHasMP4Extension(filename) {
    if (path_1.default.parse(filename).ext.toLowerCase() !== '.mp4') {
        throw new InvalidFileError(INVALID_FILE_ERROR);
    }
}
function getBoxSize(buffer, startIndex) {
    return buffer.readUInt32BE(startIndex);
}
function getBoxHeaderName(buffer, startIndex) {
    return buffer.toString('ascii', startIndex + 4, startIndex + BOX_HEADER_SIZE_BYTES);
}
function getUUID(buffer, startIndex) {
    return buffer.toString('hex', startIndex + BOX_HEADER_SIZE_BYTES, startIndex + BOX_HEADER_SIZE_BYTES + UUID_SIZE_BYTES);
}
function isDiscordUUIDBox(buffer, startIndex) {
    return getBoxHeaderName(buffer, startIndex) === UUID_BOX_NAME && getUUID(buffer, startIndex) === DISCORD_UUID;
}
function setupClipsProtocol() {
    electron_1.protocol.handle(constants_1.DISCORD_CLIP_PROTOCOL, async function handleClipsProtocolRequest(request) {
        const parsedURL = new URL(request.url);
        let originalPathname = parsedURL.pathname;
        if (process.platform === 'win32') {
            originalPathname = originalPathname.slice(1);
        }
        const pathname = path_1.default.normalize(decodeURIComponent(originalPathname));
        const filename = path_1.default.basename(pathname);
        const dirname = path_1.default.dirname(pathname);
        try {
            console.log('[Clips] protocol requested: ', filename);
            const clipMetadata = await getClipMetadata(filename, dirname);
            if (clipMetadata == null) {
                throw new Error(INVALID_FILE_ERROR);
            }
        }
        catch (e) {
            console.error('Invalid clip requested via protocol:', e);
            return new Response('Clip not found', { status: 404 });
        }
        try {
            const stats = await promises_1.default.stat(pathname);
            const rangeHeader = request.headers.get('Range');
            if (rangeHeader == null) {
                return new Response(node_stream_1.Readable.toWeb((0, node_fs_1.createReadStream)(pathname)), {
                    status: 200,
                    headers: {
                        'Content-Type': 'video/mp4',
                        'Accept-Ranges': 'bytes',
                        'Content-Length': `${stats.size}`,
                    },
                });
            }
            const matches = RANGE_HEADER_REGEX.exec(rangeHeader);
            if (matches == null) {
                return new Response(null, {
                    status: 416,
                    headers: {
                        'Content-Range': `bytes */${stats.size}`,
                    },
                });
            }
            const start = matches[1] != null ? parseInt(matches[1], 10) : 0;
            const end = matches[2] != null ? parseInt(matches[2], 10) : stats.size - 1;
            if (Number.isNaN(start) || start > stats.size || end > stats.size) {
                return new Response(null, {
                    status: 416,
                    headers: {
                        'Content-Range': `bytes */${stats.size}`,
                    },
                });
            }
            const stream = (0, node_fs_1.createReadStream)(pathname, { start, end });
            const resp = new Response(node_stream_1.Readable.toWeb(stream), {
                status: 206,
                headers: {
                    'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': `${end - start + 1}`,
                    'Content-Type': `video/mp4`,
                },
            });
            return resp;
        }
        catch (e) {
            console.error('Something went wrong when serving the clip:', e);
            return new Response('Clip serve failure', { status: 500 });
        }
    });
}
function verifyValidClip(buffer) {
    let currIndex = 0;
    while (currIndex < buffer.byteLength) {
        if (isDiscordUUIDBox(buffer, currIndex)) {
            return;
        }
        const boxSize = getBoxSize(buffer, currIndex);
        if (boxSize < BOX_HEADER_SIZE_BYTES) {
            throw new InvalidFileError(INVALID_FILE_ERROR);
        }
        currIndex += boxSize;
    }
    throw new InvalidFileError(INVALID_FILE_ERROR);
}
async function loadClip(filename) {
    try {
        verifyHasMP4Extension(filename);
        const result = await (0, fileutils_1.readFulfilledFiles)([filename], MAX_LENGTH, true);
        const buffer = Buffer.from(result[0].data);
        verifyIsMP4(buffer);
        verifyValidClip(buffer);
        return result[0];
    }
    catch (e) {
        if (e instanceof InvalidFileError) {
            console.log(`Invalid clips file: ${e}`);
        }
        else {
            console.error(`Invalid clips file: ${e}`);
        }
        throw new Error(INVALID_FILE_ERROR);
    }
}
async function getClipMetadata(filename, dirPath) {
    try {
        verifyHasMP4Extension(filename);
    }
    catch (e) {
        return null;
    }
    let currIndex = 0;
    const filepath = path_1.default.join(dirPath, filename);
    const handle = await promises_1.default.open(filepath, 'r');
    try {
        const stats = await handle.stat();
        const mp4HeaderBuffer = Buffer.alloc(BOX_HEADER_SIZE_BYTES + UUID_SIZE_BYTES);
        await (0, fileutils_1.readExactly)({ handle, buffer: mp4HeaderBuffer, position: 0 });
        verifyIsMP4(mp4HeaderBuffer);
        currIndex += getBoxSize(mp4HeaderBuffer, currIndex);
        while (currIndex < stats.size) {
            await (0, fileutils_1.readExactly)({ handle, buffer: mp4HeaderBuffer, position: currIndex });
            const boxSize = getBoxSize(mp4HeaderBuffer, 0);
            if (boxSize < BOX_HEADER_SIZE_BYTES) {
                return null;
            }
            if (isDiscordUUIDBox(mp4HeaderBuffer, 0)) {
                const metadataOffset = BOX_HEADER_SIZE_BYTES + UUID_SIZE_BYTES;
                const metadataBuffer = Buffer.alloc(boxSize - metadataOffset);
                await (0, fileutils_1.readExactly)({ handle, buffer: metadataBuffer, position: currIndex + metadataOffset });
                const metadata = JSON.parse(metadataBuffer.toString('utf-8'));
                return {
                    filepath: filepath,
                    metadata: metadata,
                };
            }
            currIndex += boxSize;
        }
        return null;
    }
    catch (e) {
        console.log(`error: ${e}`);
        return null;
    }
    finally {
        await handle?.close();
    }
}
async function extractJpegComment(filepath) {
    const handle = await promises_1.default.open(filepath, 'r');
    try {
        const headerBuffer = Buffer.alloc(2);
        await (0, fileutils_1.readExactly)({ handle, buffer: headerBuffer, position: 0 });
        if (headerBuffer[0] !== 0xff || headerBuffer[1] !== 0xd8) {
            return null;
        }
        let position = 2;
        const markerBuffer = Buffer.alloc(4);
        while (true) {
            await (0, fileutils_1.readExactly)({ handle, buffer: markerBuffer, position });
            if (markerBuffer[0] !== 0xff) {
                return null;
            }
            const markerType = markerBuffer[1];
            const segmentLength = markerBuffer.readUInt16BE(2);
            if (markerType === 0xfe) {
                const commentLength = segmentLength - 2;
                const commentBuffer = Buffer.alloc(commentLength);
                await (0, fileutils_1.readExactly)({ handle, buffer: commentBuffer, position: position + 4 });
                return commentBuffer.toString('utf-8');
            }
            if (markerType === 0xda) {
                return null;
            }
            position += 2 + segmentLength;
        }
    }
    catch (e) {
        console.log(`Error reading JPEG comment from ${filepath}: ${e}`);
        return null;
    }
    finally {
        await handle?.close();
    }
}
async function getScreenshotMetadata(filename, dirPath) {
    try {
        const isScreenshot = filename.endsWith('.jpeg') || filename.endsWith('.jpg');
        if (!isScreenshot) {
            return null;
        }
        const filepath = path_1.default.join(dirPath, filename);
        const jpegComment = await extractJpegComment(filepath);
        if (jpegComment == null) {
            return null;
        }
        const handle = await promises_1.default.open(filepath, 'r');
        let thumbnail;
        try {
            const buffer = await promises_1.default.readFile(handle);
            const base64 = buffer.toString('base64');
            thumbnail = `data:image/jpeg;base64,${base64}`;
        }
        catch (e) {
            console.log(`Failed to create thumbnail for ${filename}: ${e}`);
        }
        finally {
            await handle.close();
        }
        try {
            const metadata = JSON.parse(jpegComment);
            return {
                filepath: filepath,
                metadata: {
                    ...metadata,
                    thumbnail,
                },
            };
        }
        catch (e) {
            console.log(`Failed to parse JPEG comment as JSON for ${filename}: ${e}`);
            return null;
        }
    }
    catch (e) {
        console.log(`Error loading screenshot metadata for ${filename}: ${e}`);
        return null;
    }
}
async function deleteClip(filepath) {
    try {
        const isScreenshot = filepath.endsWith('.jpeg') || filepath.endsWith('.jpg');
        if (isScreenshot) {
            await (0, fileutils_1.deleteFile)(filepath);
        }
        else {
            await loadClip(filepath);
            await (0, fileutils_1.deleteFile)(filepath);
        }
    }
    catch (e) {
        console.log(`Invalid clips file to delete: ${e}`);
        throw new Error(INVALID_FILE_ERROR);
    }
}
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.LOAD_CLIP, (_, path) => {
    return loadClip(path);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.LOAD_CLIPS_DIRECTORY, async (_, dirPath) => {
    await (0, fileutils_1.ensureDirectoryExists)(dirPath);
    const filenames = await (0, fileutils_1.getFilesnamesFromDirectory)(dirPath);
    const loadedFiles = await Promise.all(filenames.map(async (filename) => {
        const clipMetadata = await getClipMetadata(filename, dirPath);
        if (clipMetadata != null) {
            return clipMetadata;
        }
        const screenshotMetadata = await getScreenshotMetadata(filename, dirPath);
        if (screenshotMetadata != null) {
            return screenshotMetadata;
        }
        return null;
    }));
    const filteredFiles = loadedFiles.filter(utils_1.isNotNullish);
    return filteredFiles;
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.DELETE_CLIP, (_, path) => {
    return deleteClip(path);
});


},
3597(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron = __importStar(__webpack_require__(1288));
const { CONSTANTS_GET } = (__webpack_require__(3672)/* .IPCEvents */.IPCEvents);
const { APP_NAME, APP_ID, API_ENDPOINT, UPDATE_ENDPOINT } = __webpack_require__(2009);
const exposedConstants = {
    APP_NAME,
    APP_ID,
    API_ENDPOINT,
    UPDATE_ENDPOINT,
};
electron.ipcMain.handle(CONSTANTS_GET, (_, name) => {
    if (!exposedConstants.hasOwnProperty(name)) {
        return undefined;
    }
    return exposedConstants[name];
});


},
2582(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const assert_1 = __importDefault(__webpack_require__(2613));
const electron_1 = __importDefault(__webpack_require__(1288));
const lodash_1 = __importDefault(__webpack_require__(7014));
const crashReporterUtils_1 = __webpack_require__(4069);
const crashReporterSetup_1 = __webpack_require__(623);
const DiscordIPC_1 = __webpack_require__(4443);
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.CRASH_REPORTER_UPDATE_METADATA, (_, additionalMetadata) => {
    const metadata = crashReporterSetup_1.crashReporterSetup.metadata;
    (0, assert_1.default)(metadata != null, 'Metadata imported improperly.');
    const finalMetadata = lodash_1.default.defaultsDeep(metadata, additionalMetadata ?? {});
    (0, crashReporterUtils_1.reconcileCrashReporterMetadata)(electron_1.default.crashReporter, finalMetadata);
    const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
    if (sentry != null) {
        const user = additionalMetadata.sentry?.user;
        if (user != null) {
            sentry.setUser(user);
        }
        const nativeBuildNumber = additionalMetadata.nativeBuildNumber;
        if (nativeBuildNumber != null) {
            sentry.setTag('nativeBuildNumber', nativeBuildNumber);
        }
        const staff = additionalMetadata.staff;
        if (staff != null) {
            sentry.setTag('isStaff', staff.toString());
        }
    }
    return Promise.resolve({ metadata: finalMetadata });
});
electron_1.default.ipcMain.handle(DiscordIPC_1.IPCEvents.UNHANDLED_JS_EXCEPTION, (_) => {
    setTimeout(() => {
        throw new Error('UNHANDLED_EXCEPTION ' + process.type);
    }, 50);
});


},
2504(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __importDefault(__webpack_require__(1288));
const DiscordIPC_1 = __webpack_require__(4443);
function mapDiscordDesktopCaptureSourcesToElectron(options) {
    const requiredTypes = ['screen', 'window'];
    const types = options.types
        .filter((type) => requiredTypes.includes(type.toLocaleLowerCase()))
        .map((type) => type.toLocaleLowerCase());
    return {
        types,
        thumbnailSize: options.thumbnailSize,
        fetchWindowIcons: true,
    };
}
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, async (_, opts) => {
    const electronOptions = mapDiscordDesktopCaptureSourcesToElectron(opts);
    const sources = await electron_1.default.desktopCapturer.getSources(electronOptions);
    return sources.map((source) => {
        return {
            id: source.id,
            name: source.name,
            url: source.thumbnail.toDataURL(),
            icon: source.appIcon?.toDataURL(),
        };
    });
});


},
4077(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectFeaturesBackend = injectFeaturesBackend;
const DiscordIPC_1 = __webpack_require__(4443);
let injectedFeatures = null;
function injectFeaturesBackend(features) {
    injectedFeatures = features;
}
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.FEATURES_GET_BROWSER_FEATURES, (event) => {
    event.returnValue = injectedFeatures?.getSupported() ?? [];
});


},
5293(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __importDefault(__webpack_require__(1288));
const DiscordIPC_1 = __webpack_require__(4443);
function getModulePath() {
    return global.moduleDataPath ?? global.modulePath;
}
function getLogPath() {
    return global.logPath;
}
function getAssetCachePath() {
    return global.assetCachePath;
}
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_PATH, async (_) => {
    return getModulePath();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_SHOW_SAVE_DIALOG, async (_, dialogOptions) => {
    return await electron_1.default.dialog.showSaveDialog(dialogOptions);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_SHOW_OPEN_DIALOG, async (_, dialogOptions) => {
    return await electron_1.default.dialog.showOpenDialog(dialogOptions);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_SHOW_ITEM_IN_FOLDER, async (_, path) => {
    electron_1.default.shell.showItemInFolder(path);
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_DATA_PATH_SYNC, (event) => {
    event.returnValue = getModulePath();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_LOG_PATH, async (_) => {
    return getLogPath();
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_MODULE_LOG_PATH_SYNC, (event) => {
    event.returnValue = getLogPath();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_ASSET_CACHE_PATH, async (_) => {
    return getAssetCachePath();
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.FILE_MANAGER_GET_ASSET_CACHE_PATH_SYNC, (event) => {
    event.returnValue = getAssetCachePath();
});


},
2175(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectGpuSettingsBackend = injectGpuSettingsBackend;
const electron = __importStar(__webpack_require__(1288));
const { GPU_SETTINGS_SET_ENABLE_HWACCEL, GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC, GPU_SETTINGS_SET_CHROMIUM_SWITCHES, GPU_SETTINGS_SET_SETTING, } = (__webpack_require__(3672)/* .IPCEvents */.IPCEvents);
let injectedGpuSettings = null;
function injectGpuSettingsBackend(gpuSettings) {
    injectedGpuSettings = gpuSettings;
}
electron.ipcMain.handle(GPU_SETTINGS_SET_ENABLE_HWACCEL, (_, enable) => {
    injectedGpuSettings?.setEnableHardwareAcceleration(enable);
});
electron.ipcMain.on(GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC, (event) => {
    event.returnValue = injectedGpuSettings != null ? injectedGpuSettings.getEnableHardwareAcceleration() : false;
});
electron.ipcMain.handle(GPU_SETTINGS_SET_CHROMIUM_SWITCHES, (_, switches) => {
    injectedGpuSettings?.setChromiumSwitches(switches);
});
electron.ipcMain.handle(GPU_SETTINGS_SET_SETTING, (_, key, value) => {
    injectedGpuSettings?.setSetting(key, value);
});


},
962(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(1288);
const DiscordIPC_1 = __webpack_require__(4443);
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.HARDWARE_GET_DISPLAY_COUNT, () => {
    return Promise.resolve(electron_1.screen.getAllDisplays().length);
});


},
2815(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const path_1 = __importDefault(__webpack_require__(6928));
const appFeatures_1 = __webpack_require__(5444);
const utils_1 = __webpack_require__(8557);
const DiscordIPC_1 = __webpack_require__(4443);
if (utils_1.isOSX) {
    try {
        if (moduleDataPath == null) {
            throw new Error('no moduleDataPath');
        }
        const modulePath = path_1.default.join(moduleDataPath, 'discord_intents');
        const lib = require(modulePath);
        lib.setDataPath(modulePath);
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SEARCH_INDEX_DOMAINS, (_event, domains) => {
            lib.indexDomains(domains);
            return Promise.resolve();
        });
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SEARCH_CLEAR_INDEX, (_event) => {
            lib.clearIndex();
            return Promise.resolve();
        });
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SEARCH_DELETE_DOMAINS, (_event, domains) => {
            lib.deleteDomains(domains);
            return Promise.resolve();
        });
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SEARCH_DELETE_ITEMS, (_event, items) => {
            lib.deleteItems(items);
            return Promise.resolve();
        });
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.INTENTS_SET_ACTIVITY, (_event, activity) => {
            lib.setActivity(activity);
            return Promise.resolve();
        });
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.INTENTS_RESIGN_ACTIVITY, (_event) => {
            lib.resignActivity();
            return Promise.resolve();
        });
        (0, appFeatures_1.getFeatures)().declareSupported('intents');
    }
    catch (e) {
        console.warn('discord_intents setup failed with error: ', e);
    }
}


},
5596(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectModuleUpdater = injectModuleUpdater;
exports.injectUpdater = injectUpdater;
const childProcess = __importStar(__webpack_require__(5317));
const electron = __importStar(__webpack_require__(1288));
const path = __importStar(__webpack_require__(6928));
const process = __importStar(__webpack_require__(932));
const nodeGlobalPaths_1 = __webpack_require__(8329);
const { NATIVE_MODULES_GET_PATHS, NATIVE_MODULES_INSTALL, NATIVE_MODULES_FINISH_UPDATER_BOOTSTRAP, NATIVE_MODULES_GET_HAS_NEW_UPDATER, } = (__webpack_require__(3672)/* .IPCEvents */.IPCEvents);
let injectedModuleUpdater = null;
let injectedUpdater = null;
function injectModuleUpdater(moduleUpdater) {
    injectedModuleUpdater = moduleUpdater;
}
function injectUpdater(updater) {
    injectedUpdater = updater;
}
electron.ipcMain.on(NATIVE_MODULES_GET_PATHS, (event) => {
    event.returnValue = {
        mainAppDirname: global.mainAppDirname,
        browserModulePaths: (0, nodeGlobalPaths_1.getGlobalPaths)(),
    };
});
async function newUpdaterInstall(updater, moduleName) {
    try {
        await updater.installModule(moduleName);
        const queryOptions = {};
        await updater.commitModules(queryOptions);
    }
    catch (e) {
        throw new Error(`Failed to install ${moduleName}: ${e}`);
    }
}
electron.ipcMain.handle(NATIVE_MODULES_INSTALL, async (_, moduleName) => {
    const newUpdater = injectedUpdater?.getUpdater();
    if (newUpdater != null) {
        return newUpdaterInstall(newUpdater, moduleName);
    }
    const updater = injectedModuleUpdater;
    if (updater === null) {
        throw new Error('Module updater is not available!');
    }
    const waitForInstall = new Promise((resolve, reject) => {
        const installedHandler = (installedModuleEvent) => {
            if (installedModuleEvent.name === moduleName) {
                updater.events.removeListener(updater.INSTALLED_MODULE, installedHandler);
                if (installedModuleEvent.succeeded) {
                    resolve();
                }
                else {
                    reject(new Error(`Failed to install ${moduleName}`));
                }
            }
        };
        updater.events.on(updater.INSTALLED_MODULE, installedHandler);
    });
    updater.install(moduleName, false);
    return await waitForInstall;
});
electron.ipcMain.on(NATIVE_MODULES_GET_HAS_NEW_UPDATER, (event) => {
    event.returnValue = injectedUpdater?.getUpdater() != null;
});
electron.ipcMain.on(NATIVE_MODULES_FINISH_UPDATER_BOOTSTRAP, (_, [major, minor, revision]) => {
    if (typeof major !== 'number' || typeof minor !== 'number' || typeof revision !== 'number') {
        throw new Error('You tried.');
    }
    const hostVersionStr = `${major}.${minor}.${revision}`;
    const hostExePath = path.join(path.dirname(process.execPath), '..', `app-${hostVersionStr}`, path.basename(process.execPath));
    electron.app.once('will-quit', () => {
        childProcess.spawn(hostExePath, [], { detached: true, stdio: 'inherit' });
    });
    console.log(`Restarting from ${path.resolve(process.execPath)} to ${path.resolve(hostExePath)}`);
    electron.app.quit();
});


},
1540(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron = __importStar(__webpack_require__(1288));
const os_1 = __importDefault(__webpack_require__(857));
const path_1 = __importDefault(__webpack_require__(6928));
const appFeatures_1 = __webpack_require__(5444);
const utils_1 = __webpack_require__(8557);
const DiscordIPC_1 = __webpack_require__(4443);
function sendToAllWindows(channel, ...args) {
    electron.BrowserWindow.getAllWindows().forEach((win) => {
        const contents = win.webContents;
        if (contents != null) {
            contents.send(channel, ...args);
        }
    });
}
if (utils_1.isOSX) {
    let majorVersion;
    try {
        majorVersion = parseInt(os_1.default.release().split('.')[0], 10);
    }
    catch (_e) {
        majorVersion = 0;
    }
    if (majorVersion >= 21 && moduleDataPath != null) {
        try {
            const modulePath = path_1.default.join(moduleDataPath, 'discord_notifications');
            const lib = require(modulePath);
            lib.setDataPath(modulePath);
            lib.setCallbacks((action, identifier, userText, fallbackDeepLink) => {
                sendToAllWindows(DiscordIPC_1.IPCEvents.NOTIFICATIONS_RECEIVED_RESPONSE, action, identifier, userText, fallbackDeepLink);
            }, (_identifier) => {
                return ['badge', 'banner', 'list', 'sound'];
            }, (identifier) => {
                sendToAllWindows('USER_SETTINGS_OPEN', identifier, 'Notifications');
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_GET_AUTHORIZATION, async (_event, provisional) => {
                return await lib.getAuthorization(provisional);
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_GET_SETTINGS, async (_event) => {
                return await lib.getSettings();
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_SEND_NOTIFICATION, async (_event, options) => {
                return await lib.sendNotification(options);
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_REMOVE_NOTIFICATIONS, (_event, identifiers) => {
                lib.removeNotifications(identifiers);
                return Promise.resolve();
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS, (_event) => {
                lib.removeAllNotifications();
                return Promise.resolve();
            });
            (0, appFeatures_1.getFeatures)().declareSupported('notifications');
            (0, appFeatures_1.getFeatures)().declareSupported('notifications_provisional');
        }
        catch (e) {
            console.warn('discord_notifications setup failed with error: ', e);
        }
    }
}
else if (utils_1.isWindows && electron.Notification.isSupported()) {
    try {
        const lib = __webpack_require__(5385);
        if (lib == null) {
            console.warn('discord_notifications module not found.');
        }
        else {
            lib.setCallbacks((action, identifier, userText) => {
                sendToAllWindows(DiscordIPC_1.IPCEvents.NOTIFICATIONS_RECEIVED_RESPONSE, action, identifier, userText);
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_GET_AUTHORIZATION, async (_event) => {
                return await lib.getAuthorization();
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_GET_SETTINGS, async (_event) => {
                return await lib.getSettings();
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_SEND_NOTIFICATION, async (_event, options) => {
                return await lib.showNotification(options);
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_REMOVE_NOTIFICATIONS, async (_event, identifiers) => {
                return await lib.removeNotifications(identifiers);
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS, async (_event) => {
                return await lib.removeAllNotifications();
            });
            (0, appFeatures_1.getFeatures)().declareSupported('notifications');
        }
    }
    catch (e) {
        console.warn('discord_notifications setup failed with error: ', e);
    }
}


},
5343(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron = __importStar(__webpack_require__(1288));
const { POWER_MONITOR_RESUME, POWER_MONITOR_SUSPEND, POWER_MONITOR_LOCK_SCREEN, POWER_MONITOR_UNLOCK_SCREEN, POWER_MONITOR_GET_SYSTEM_IDLE_TIME, } = (__webpack_require__(3672)/* .IPCEvents */.IPCEvents);
electron.ipcMain.handle(POWER_MONITOR_GET_SYSTEM_IDLE_TIME, (_) => {
    if (process.platform === 'linux'
        && process.env.XDG_SESSION_TYPE?.startsWith('wayland')
        && process.env.WAYLAND_DISPLAY != null) {
        try {
            const discordUtils = __webpack_require__(4928);
            if (discordUtils.isWaylandIdleAvailable?.()) {
                return Number(discordUtils.getWaylandSystemIdleTimeMs());
            }
        }
        catch (error) {
            console.error('Wayland idle time query failed:', error);
        }
    }
    return electron.powerMonitor.getSystemIdleTime() * 1000;
});
function sendToAllWindows(channel) {
    electron.BrowserWindow.getAllWindows().forEach((win) => {
        const contents = win.webContents;
        if (contents != null) {
            contents.send(channel);
        }
    });
}
electron.powerMonitor.on('resume', () => {
    sendToAllWindows(POWER_MONITOR_RESUME);
});
electron.powerMonitor.on('suspend', () => {
    sendToAllWindows(POWER_MONITOR_SUSPEND);
});
electron.powerMonitor.on('lock-screen', () => {
    sendToAllWindows(POWER_MONITOR_LOCK_SCREEN);
});
electron.powerMonitor.on('unlock-screen', () => {
    sendToAllWindows(POWER_MONITOR_UNLOCK_SCREEN);
});


},
9096(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron = __importStar(__webpack_require__(1288));
const { POWER_SAVE_BLOCKER_BLOCK_DISPLAY_SLEEP, POWER_SAVE_BLOCKER_UNBLOCK_DISPLAY_SLEEP, POWER_SAVE_BLOCKER_CLEANUP_DISPLAY_SLEEP, } = (__webpack_require__(3672)/* .IPCEvents */.IPCEvents);
const powerSaveBlockerIds = new Set();
electron.ipcMain.handle(POWER_SAVE_BLOCKER_BLOCK_DISPLAY_SLEEP, (_) => {
    const newId = electron.powerSaveBlocker.start('prevent-display-sleep');
    powerSaveBlockerIds.add(newId);
    return newId;
});
electron.ipcMain.handle(POWER_SAVE_BLOCKER_UNBLOCK_DISPLAY_SLEEP, (_, id) => {
    electron.powerSaveBlocker.stop(id);
    powerSaveBlockerIds.delete(id);
});
electron.ipcMain.handle(POWER_SAVE_BLOCKER_CLEANUP_DISPLAY_SLEEP, (_) => {
    for (const id of powerSaveBlockerIds) {
        electron.powerSaveBlocker.stop(id);
    }
    powerSaveBlockerIds.clear();
});


},
2020(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.processUtilsSettings = void 0;
const electron_1 = __importDefault(__webpack_require__(1288));
const fs_1 = __importDefault(__webpack_require__(9896));
const os_1 = __importDefault(__webpack_require__(857));
const path_1 = __importDefault(__webpack_require__(6928));
const process_1 = __importDefault(__webpack_require__(932));
const paths_1 = __webpack_require__(1410);
const DiscordIPC_1 = __webpack_require__(4443);
exports.processUtilsSettings = {
    rendererCrashReason: null,
    rendererCrashExitCode: null,
    lastRunsStoredInformation: {},
    currentStoredInformation: {},
    lastMemoryInformation: null,
    highestMemoryInformation: null,
};
let usageOffset = 0;
let lastUsage = 0;
const cpuCoreCount = os_1.default.cpus().length;
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_CPU_USAGE, (_) => {
    let totalProcessorUsagePercent = 0.0;
    let totalCumulativeUsage = undefined;
    const sampleTime = performance.now();
    for (const processMetric of electron_1.default.app.getAppMetrics()) {
        totalProcessorUsagePercent += processMetric.cpu.percentCPUUsage;
        const cpu = processMetric.cpu;
        if (cpu.cumulativeCPUUsage !== undefined) {
            if (totalCumulativeUsage === undefined) {
                totalCumulativeUsage = {
                    usage: 0,
                    sampleTime,
                };
            }
            totalCumulativeUsage.usage += cpu.cumulativeCPUUsage / cpuCoreCount;
        }
    }
    if (totalCumulativeUsage != null) {
        if (totalCumulativeUsage.usage < lastUsage) {
            usageOffset = totalCumulativeUsage.usage - lastUsage;
        }
        lastUsage = totalCumulativeUsage.usage;
        totalCumulativeUsage.usage += usageOffset;
    }
    return Promise.resolve({ totalProcessorUsagePercent, totalCumulativeUsage });
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_LAST_CRASH, async (_) => {
    const lastCrashReport = electron_1.default.crashReporter.getLastCrashReport();
    let pendingMinidumpPath = null;
    const moduleDataPath = paths_1.paths.getModuleDataPath();
    if (moduleDataPath != null) {
        const crashlogsPath = path_1.default.join(moduleDataPath, 'crashlogs');
        const sentinelPath = path_1.default.join(crashlogsPath, 'pending_minidump.txt');
        try {
            const filename = (await fs_1.default.promises.readFile(sentinelPath, 'utf-8')).trim();
            if (filename.length > 0) {
                pendingMinidumpPath = path_1.default.join(crashlogsPath, filename);
                await fs_1.default.promises.unlink(sentinelPath);
            }
        }
        catch {
        }
    }
    return {
        date: lastCrashReport?.date ?? null,
        id: lastCrashReport?.id ?? null,
        rendererCrashReason: exports.processUtilsSettings.rendererCrashReason,
        rendererCrashExitCode: exports.processUtilsSettings.rendererCrashExitCode,
        storedInformation: exports.processUtilsSettings.lastRunsStoredInformation,
        lastMemoryInformation: exports.processUtilsSettings.lastMemoryInformation,
        highestMemoryInformation: exports.processUtilsSettings.highestMemoryInformation,
        pendingMinidumpPath,
    };
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_SYSTEM_INFO, async (_) => {
    return {
        cpus: os_1.default.cpus().map((cpu) => ({ model: cpu.model, speed: cpu.speed })),
        gpus: [],
        electronGPUInfo: (await electron_1.default.app.getGPUInfo('complete')),
        total_memory: os_1.default.totalmem(),
    };
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_FLUSH_DNS_CACHE, (_) => {
    const defaultSession = electron_1.default.session.defaultSession;
    if (defaultSession != null && defaultSession.clearHostResolverCache != null) {
        return defaultSession.clearHostResolverCache();
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_FLUSH_COOKIES, (_) => {
    return electron_1.default.session.defaultSession.cookies.flushStore();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_FLUSH_STORAGE_DATA, (_) => {
    electron_1.default.session.defaultSession.flushStorageData();
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_MAIN_ARGV_SYNC, (event) => {
    event.returnValue = process_1.default.argv;
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_SET_CRASH_INFORMATION, (_, crashInformation, state) => {
    exports.processUtilsSettings.currentStoredInformation[crashInformation] = state;
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_SET_MEMORY_INFORMATION, (_, memoryInformation) => {
    exports.processUtilsSettings.lastMemoryInformation = memoryInformation;
    const highest = exports.processUtilsSettings.highestMemoryInformation;
    if (highest == null || highest.memoryUsageKB < memoryInformation.memoryUsageKB) {
        exports.processUtilsSettings.highestMemoryInformation = memoryInformation;
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_SET_CRASH_REASON, (_, reason) => {
    exports.processUtilsSettings.rendererCrashReason = reason;
    exports.processUtilsSettings.rendererCrashExitCode = 1;
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_SYSTEM_METRICS, (_) => {
    const cpus = os_1.default.cpus();
    let totalIdle = 0;
    let totalTick = 0;
    for (const cpu of cpus) {
        for (const type of Object.values(cpu.times)) {
            totalTick += type;
        }
        totalIdle += cpu.times.idle;
    }
    return Promise.resolve({
        cpuTotalTick: totalTick,
        cpuTotalIdle: totalIdle,
        memoryTotal: os_1.default.totalmem(),
        memoryFree: os_1.default.freemem(),
    });
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_GPU_PROCESS_ID, (_) => {
    for (const processMetric of electron_1.default.app.getAppMetrics()) {
        if (processMetric.type === 'GPU') {
            return Promise.resolve(processMetric.pid);
        }
    }
    return Promise.resolve(null);
});


},
9410(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron = __importStar(__webpack_require__(1288));
const processUtils_1 = __webpack_require__(5888);
const { SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE, SAFE_STORAGE_ENCRYPT_STRING, SAFE_STORAGE_DECRYPT_STRING } = (__webpack_require__(3672)/* .IPCEvents */.IPCEvents);
electron.ipcMain.on(SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE, (event) => {
    if (process.env.DISCORD_TEST === '1') {
        if (processUtils_1.IS_OSX) {
            event.returnValue = false;
            return;
        }
    }
    event.returnValue = electron.safeStorage != null && electron.safeStorage.isEncryptionAvailable();
});
electron.ipcMain.on(SAFE_STORAGE_ENCRYPT_STRING, (event, plainText) => {
    if (plainText != null) {
        event.returnValue = electron.safeStorage.encryptString(plainText).toString('base64');
    }
    else {
        event.returnValue = null;
    }
});
electron.ipcMain.on(SAFE_STORAGE_DECRYPT_STRING, (event, encrypted) => {
    if (encrypted != null) {
        try {
            event.returnValue = electron.safeStorage.decryptString(Buffer.from(encrypted, 'base64'));
        }
        catch {
            event.returnValue = null;
        }
    }
    else {
        event.returnValue = null;
    }
});


},
8823(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectSettingsBackend = injectSettingsBackend;
const electron = __importStar(__webpack_require__(1288));
const { SETTINGS_GET, SETTINGS_SET, SETTINGS_GET_SYNC } = (__webpack_require__(3672)/* .IPCEvents */.IPCEvents);
let injectedSettings = null;
function getSettings() {
    return injectedSettings != null
        ? injectedSettings
        : {
            get: () => { },
            set: () => { },
            save: () => { },
        };
}
function injectSettingsBackend(settings) {
    injectedSettings = settings;
}
electron.ipcMain.handle(SETTINGS_GET, (_, name, defaultValue) => {
    const settings = getSettings();
    return settings.get(name, defaultValue);
});
electron.ipcMain.handle(SETTINGS_SET, (_, name, value) => {
    const settings = getSettings();
    settings.set(name, value);
    settings.save();
});
electron.ipcMain.on(SETTINGS_GET_SYNC, (event, name, defaultValue) => {
    const settings = getSettings();
    event.returnValue = settings.get(name, defaultValue);
});


},
1432(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron = __webpack_require__(1288);
const DiscordIPC_1 = __webpack_require__(4443);
let _learnedWords = new Set();
let _hasLoadedLearnedWords = false;
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SPELLCHECK_REPLACE_MISSPELLING, (event, correction) => {
    event.sender.replaceMisspelling(correction);
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SPELLCHECK_GET_AVAILABLE_DICTIONARIES, (_) => {
    return Promise.resolve(electron.session.defaultSession.availableSpellCheckerLanguages);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SPELLCHECK_SET_LOCALE, (_, locale) => {
    try {
        electron.session.defaultSession.setSpellCheckerLanguages([locale]);
    }
    catch (_) {
        console.error(`Failed to set the spellcheck locale: ${locale}`);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SPELLCHECK_SET_LEARNED_WORDS, async (_, newLearnedWords) => {
    const session = electron.session.defaultSession;
    if (!_hasLoadedLearnedWords) {
        const dictionaryContents = await session.listWordsInSpellCheckerDictionary();
        _learnedWords = new Set(dictionaryContents);
        _hasLoadedLearnedWords = true;
    }
    _learnedWords.forEach((word) => {
        if (!newLearnedWords.has(word)) {
            session.removeWordFromSpellCheckerDictionary(word);
        }
    });
    newLearnedWords.forEach((word) => {
        if (!_learnedWords.has(word)) {
            session.addWordToSpellCheckerDictionary(word);
        }
    });
    _learnedWords = new Set(newLearnedWords);
});


},
1831(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __importDefault(__webpack_require__(1288));
const fs_1 = __importDefault(__webpack_require__(9896));
const path_1 = __importDefault(__webpack_require__(6928));
const appFeatures_1 = __webpack_require__(5444);
const paths_1 = __webpack_require__(1410);
const constants_1 = __webpack_require__(3672);
const { USER_DATA_CACHE_SAVE, USER_DATA_CACHE_GET, USER_DATA_CACHE_DELETE } = constants_1.IPCEvents;
const features = (0, appFeatures_1.getFeatures)();
function getCachePath() {
    const userData = paths_1.paths.getUserData();
    if (userData === null) {
        return null;
    }
    return path_1.default.join(userData, 'userDataCache.json');
}
function getMigratedPath() {
    const userData = paths_1.paths.getUserData();
    if (userData === null) {
        return null;
    }
    return path_1.default.join(userData, 'domainMigrated');
}
function cacheUserData(userData) {
    const cachePath = getCachePath();
    if (cachePath === null) {
        return;
    }
    fs_1.default.writeFile(cachePath, userData, (e) => {
        if (e !== null) {
            console.warn('Failed updating user data cache with error: ', e);
        }
    });
}
function getCachedUserData() {
    const cachePath = getCachePath();
    if (cachePath === null) {
        return null;
    }
    try {
        return JSON.parse(fs_1.default.readFileSync(cachePath).toString('utf-8'));
    }
    catch (_err) { }
    return null;
}
function deleteCachedUserData() {
    try {
        const cachePath = getCachePath();
        const migratedPath = getMigratedPath();
        if (cachePath === null || migratedPath === null) {
            return;
        }
        fs_1.default.unlinkSync(cachePath);
        fs_1.default.writeFile(migratedPath, '', (e) => {
            if (e !== null) {
                console.warn('Failed to create domainMigrated file with error: ', e);
            }
        });
    }
    catch (_err) { }
}
electron_1.default.ipcMain.handle(USER_DATA_CACHE_GET, () => {
    return getCachedUserData();
});
electron_1.default.ipcMain.on(USER_DATA_CACHE_SAVE, (_event, userData) => {
    cacheUserData(userData);
});
electron_1.default.ipcMain.on(USER_DATA_CACHE_DELETE, (_event) => {
    deleteCachedUserData();
});
features.declareSupported('user_data_cache');


},
8348(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os_1 = __importDefault(__webpack_require__(857));
const path_1 = __importDefault(__webpack_require__(6928));
const appFeatures_1 = __webpack_require__(5444);
const utils_1 = __webpack_require__(8557);
const DiscordIPC_1 = __webpack_require__(4443);
const features = (0, appFeatures_1.getFeatures)();
let majorVersion;
try {
    majorVersion = parseInt(os_1.default.release().split('.')[0], 10);
}
catch (_e) {
    majorVersion = 0;
}
if (utils_1.isOSX && majorVersion >= 21) {
    features.declareSupported('webauthn');
    DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WEBAUTHN_REGISTER_MAC, (_event, challenge) => {
        return callNative('webAuthnRegister', challenge);
    });
    DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WEBAUTHN_AUTHENTICATE_MAC, (_event, challenge) => {
        return callNative('webAuthnAuthenticate', challenge);
    });
    DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WEBAUTHN_SIGNAL_ALL_ACCEPTED_CREDENTIALS, (_event, rpId, userId, allAcceptedCredentialIds) => {
        return callSignalNative('signalAllAcceptedCredentials', rpId, userId, [...allAcceptedCredentialIds]);
    });
    DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WEBAUTHN_SIGNAL_CURRENT_USER_DETAILS, (_event, rpId, userId, name, displayName) => {
        return callSignalNative('signalCurrentUserDetails', rpId, userId, name, displayName);
    });
    DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WEBAUTHN_SIGNAL_UNKNOWN_CREDENTIAL, (_event, rpId, credentialId) => {
        return callSignalNative('signalUnknownCredential', rpId, credentialId);
    });
    function callNative(method, challenge) {
        if (moduleDataPath == null) {
            return Promise.reject(new Error('Module data path unset'));
        }
        const webAuthnPath = path_1.default.join(moduleDataPath, 'discord_webauthn');
        return new Promise((resolve, _reject) => {
            const lib = require(webAuthnPath);
            const callback = (code, message) => resolve({ code, message });
            lib[method](challenge, callback);
        });
    }
    function callSignalNative(method, ...args) {
        if (moduleDataPath == null) {
            return Promise.resolve();
        }
        const webAuthnPath = path_1.default.join(moduleDataPath, 'discord_webauthn');
        return new Promise((resolve) => {
            const lib = require(webAuthnPath);
            lib[method](...args, (_error) => resolve());
        });
    }
}


},
3934(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectGetWindow = injectGetWindow;
exports.newWindowEvent = newWindowEvent;
const electron_1 = __importDefault(__webpack_require__(1288));
const process_1 = __importDefault(__webpack_require__(932));
const DiscordIPC_1 = __webpack_require__(4443);
let injectedGetWindow = (_key) => null;
let injectedGetAllWindows = () => [];
let contentProtectionEnabled = false;
const windowContentProtectionOverride = new Set();
function injectGetWindow(getWindow, getAllWindows) {
    injectedGetWindow = getWindow;
    injectedGetAllWindows = getAllWindows;
}
function newWindowEvent(window) {
    if (contentProtectionEnabled) {
        window.setContentProtection(true);
        console.log(`window: WINDOW_SET_CONTENT_PROTCTION ${window.id} = true`);
    }
}
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_FLASH_FRAME, (_, flag) => {
    const currentWindow = injectedGetWindow(null);
    if (currentWindow == null || currentWindow.flashFrame == null)
        return Promise.resolve();
    currentWindow.flashFrame(!currentWindow.isFocused() && flag);
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_MINIMIZE, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.minimize();
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_RESTORE, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.restore();
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_MAXIMIZE, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        if (win.isMaximized()) {
            win.unmaximize();
        }
        else {
            win.maximize();
        }
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_FOCUS, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.show();
        win.setSkipTaskbar(false);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_ALWAYS_ON_TOP, (_, key, enabled) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.setAlwaysOnTop(enabled);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_IS_ALWAYS_ON_TOP, (_, key) => {
    const win = injectedGetWindow(key);
    if (win == null)
        return Promise.resolve(false);
    return Promise.resolve(win.isAlwaysOnTop());
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_BLUR, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null && !win.isDestroyed()) {
        win.blur();
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_PROGRESS_BAR, (_, key, progress) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.setProgressBar(progress);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_TOGGLE_FULLSCREEN, (_, key) => {
    const currentWindow = injectedGetWindow(key);
    if (currentWindow == null) {
        console.error(`window: Unable to find window with key ${key}`);
        return Promise.resolve();
    }
    currentWindow.setFullScreen(!currentWindow.isFullScreen());
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_CLOSE, (_, key) => {
    if (key == null && process_1.default.platform === 'darwin') {
        electron_1.default.Menu.sendActionToFirstResponder('hide:');
    }
    else {
        const win = injectedGetWindow(key);
        if (win != null) {
            win.close();
        }
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_BACKGROUND_THROTTLING, (_, enabled) => {
    const win = injectedGetWindow();
    if (win != null) {
        win.webContents.setBackgroundThrottling(enabled);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_FRAME_RATE, (_, key, fps) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.webContents?.setMaxFPS?.(fps);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_CONTENT_PROTCTION, (_, enabled) => {
    const windows = injectedGetAllWindows();
    for (const window of windows) {
        if (window != null) {
            if (!windowContentProtectionOverride.has(window.id)) {
                window.setContentProtection(enabled);
                console.log(`window: WINDOW_SET_CONTENT_PROTCTION ${window.id} = ${enabled}`);
            }
        }
    }
    contentProtectionEnabled = enabled;
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_WINDOW_CONTENT_PROTECTION, (_, key, enabled) => {
    const window = injectedGetWindow(key);
    if (window != null) {
        if (enabled) {
            windowContentProtectionOverride.add(window.id);
        }
        else {
            windowContentProtectionOverride.delete(window.id);
        }
        const combinedEnabled = enabled || contentProtectionEnabled;
        window.setContentProtection(combinedEnabled);
        console.log(`window: WINDOW_SET_WINDOW_CONTENT_PROTECTION ${key} ${window.id} = ${combinedEnabled}`);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_GET_NATIVE_HANDLE, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        return Promise.resolve(win.getNativeWindowHandle().readInt32LE().toString(10));
    }
    return Promise.resolve(null);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_GET_MEDIA_SOURCE_ID, (_, key) => {
    const win = injectedGetWindow(key);
    return Promise.resolve(win?.getMediaSourceId() ?? null);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_MINIMUM_SIZE, (_, width, height) => {
    const win = injectedGetWindow();
    if (win != null) {
        win.setMinimumSize(width, height);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_FOCUSABLE, (_, key, enabled) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.setFocusable(enabled);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SHOW_INACTIVE, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.showInactive();
    }
    return Promise.resolve();
});


},
4443(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscordIPC = exports.IPCEvents = void 0;
const electron_1 = __importDefault(__webpack_require__(1288));
const constants_1 = __webpack_require__(3672);
var constants_2 = __webpack_require__(3672);
Object.defineProperty(exports, "IPCEvents", ({ enumerable: true, get: function () { return constants_2.IPCEvents; } }));
class DiscordMainIPC {
    static on(channel, listener) {
        electron_1.default.ipcMain.on(channel, (...args) => {
            return listener.apply(this, args);
        });
    }
    static handle(channel, listener) {
        return electron_1.default.ipcMain.handle(channel, (...args) => {
            return listener.apply(this, args);
        });
    }
}
class DiscordRendererIPC {
    static sendSync(...args) {
        return electron_1.default.ipcRenderer.sendSync.apply(electron_1.default.ipcRenderer, args);
    }
    static invoke(...args) {
        return electron_1.default.ipcRenderer.invoke.apply(electron_1.default.ipcRenderer, args);
    }
    static on(channel, listener) {
        electron_1.default.ipcRenderer.on(channel, (...args) => {
            return listener.apply(this, args);
        });
    }
}
exports.DiscordIPC = {
    main: DiscordMainIPC,
    renderer: DiscordRendererIPC,
};


},
3672(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IPCEvents = void 0;
exports.getDiscordIPCEvent = getDiscordIPCEvent;
var IPCEvents_1 = __webpack_require__(8554);
Object.defineProperty(exports, "IPCEvents", ({ enumerable: true, get: function () { return IPCEvents_1.IPCEvents; } }));
const discordPrefixRegex = /^DISCORD_/;
function getDiscordIPCEvent(ev) {
    return discordPrefixRegex.test(ev) ? ev : `DISCORD_${ev}`;
}


},
7138(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.join = exports.dirname = exports.basename = exports.extname = void 0;
exports.readFulfilledFiles = readFulfilledFiles;
exports.readFiles = readFiles;
exports.ensureDirectoryExists = ensureDirectoryExists;
exports.getFilesnamesFromDirectory = getFilesnamesFromDirectory;
exports.deleteFile = deleteFile;
exports.readExactly = readExactly;
const buffer_1 = __importDefault(__webpack_require__(181));
const original_fs_1 = __importDefault(__webpack_require__(215));
const path_1 = __importDefault(__webpack_require__(6928));
const util_1 = __importDefault(__webpack_require__(9023));
const zlib_1 = __webpack_require__(3106);
var path_2 = __webpack_require__(6928);
Object.defineProperty(exports, "extname", ({ enumerable: true, get: function () { return path_2.extname; } }));
Object.defineProperty(exports, "basename", ({ enumerable: true, get: function () { return path_2.basename; } }));
Object.defineProperty(exports, "dirname", ({ enumerable: true, get: function () { return path_2.dirname; } }));
Object.defineProperty(exports, "join", ({ enumerable: true, get: function () { return path_2.join; } }));
const MAX_LENGTH = buffer_1.default.constants.MAX_LENGTH;
const promiseFs = {
    readdir: util_1.default.promisify(original_fs_1.default.readdir),
    open: util_1.default.promisify(original_fs_1.default.open),
    fstat: util_1.default.promisify(original_fs_1.default.fstat),
    stat: util_1.default.promisify(original_fs_1.default.stat),
    unlink: util_1.default.promisify(original_fs_1.default.unlink),
    read: util_1.default.promisify(original_fs_1.default.read),
    readFile: util_1.default.promisify(original_fs_1.default.readFile),
    close: util_1.default.promisify(original_fs_1.default.close),
    mkdir: util_1.default.promisify(original_fs_1.default.mkdir),
};
const promiseZlib = {
    gzip: util_1.default.promisify(zlib_1.gzip),
};
async function readFulfilledFiles(filepaths, maxSize, orException, shouldGzip) {
    const files = await readFiles(filepaths, maxSize, shouldGzip);
    if (orException) {
        files.forEach((result) => {
            if (result.status === 'rejected') {
                throw result.reason;
            }
        });
    }
    return files
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);
}
function readFiles(filepaths, dataMaxSize, shouldGzip) {
    dataMaxSize = Math.min(dataMaxSize, MAX_LENGTH);
    return Promise.allSettled(filepaths.map(async (filepath) => {
        const handle = await promiseFs.open(filepath, 'r');
        try {
            let finalFilename = path_1.default.basename(filepath);
            const willGzip = shouldGzip != null && shouldGzip(finalFilename);
            const fileMaxSize = willGzip ? dataMaxSize * 10 : dataMaxSize;
            const stats = await promiseFs.fstat(handle);
            const resultError = {
                code: 'ETOOLARGE',
                message: 'upload too large',
                filesize: stats.size,
                maxSize: dataMaxSize,
            };
            if (stats.size > fileMaxSize) {
                throw resultError;
            }
            const buffer = new Uint8Array(stats.size);
            const data = await promiseFs.read(handle, buffer, 0, stats.size, 0);
            let finalData = new Uint8Array(data.buffer.slice(0, data.bytesRead));
            if (willGzip) {
                try {
                    finalData = new Uint8Array(await promiseZlib.gzip(finalData));
                    finalFilename = finalFilename + '.gz';
                    if (finalData.byteLength > dataMaxSize) {
                        throw resultError;
                    }
                }
                catch (e) {
                    console.error(`Failed to gzip ${finalFilename}`, e);
                }
            }
            return {
                data: finalData,
                filename: finalFilename,
            };
        }
        finally {
            void promiseFs.close(handle);
        }
    }));
}
function ensureDirectoryExists(path) {
    return promiseFs.mkdir(path, { recursive: true });
}
function getFilesnamesFromDirectory(path) {
    return promiseFs.readdir(path);
}
function deleteFile(filename) {
    return promiseFs.unlink(filename);
}
async function readExactly({ handle, buffer, position, length, }) {
    let bytesRead = 0;
    if (length == null)
        length = buffer.byteLength;
    while (bytesRead < length) {
        const result = await handle.read(buffer, bytesRead, length - bytesRead, position + bytesRead);
        if (result.bytesRead === 0) {
            throw new Error('Unexpected end of file');
        }
        bytesRead += result.bytesRead;
    }
}


},
9139(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(1288);
const constants_1 = __webpack_require__(3672);
exports["default"] = {
    on: (event, callback) => electron_1.ipcMain.on((0, constants_1.getDiscordIPCEvent)(event), callback),
    removeListener: (event, callback) => electron_1.ipcMain.removeListener((0, constants_1.getDiscordIPCEvent)(event), callback),
    reply: (event, channel, ...args) => event.sender.send((0, constants_1.getDiscordIPCEvent)(channel), ...args),
    handle: (event, callback) => electron_1.ipcMain.handle((0, constants_1.getDiscordIPCEvent)(event), callback),
};


},
1559(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WEBAPP_ENDPOINT = void 0;
exports.getMainWindowId = getMainWindowId;
exports.webContentsSend = webContentsSend;
exports.init = init;
exports.handleOpenUrl = handleOpenUrl;
exports.setMainWindowVisible = setMainWindowVisible;
const electron_1 = __importStar(__webpack_require__(1288));
const fs_1 = __importDefault(__webpack_require__(9896));
const path_1 = __importDefault(__webpack_require__(6928));
const url_1 = __importDefault(__webpack_require__(7016));
const Backoff_1 = __importDefault(__webpack_require__(7480));
const securityUtils_1 = __webpack_require__(7815);
const appBadge = __importStar(__webpack_require__(8728));
const appConfig = __importStar(__webpack_require__(6529));
const appSettings_1 = __webpack_require__(9076);
const bootstrapModules_1 = __webpack_require__(7475);
const crashReporterSetup_1 = __webpack_require__(623);
const logger_1 = __webpack_require__(7036);
const moduleUpdater_1 = __webpack_require__(8919);
const paths_1 = __webpack_require__(1410);
const splashScreen_1 = __webpack_require__(4139);
const updater_1 = __webpack_require__(923);
const processUtils_1 = __webpack_require__(2020);
const constants_1 = __webpack_require__(3672);
const ipcMain_1 = __importDefault(__webpack_require__(9139));
const mouse = __importStar(__webpack_require__(5439));
const networkDebugUtils_1 = __webpack_require__(9738);
const popoutWindows = __importStar(__webpack_require__(2782));
const staffDevTools_1 = __webpack_require__(1660);
const systemTray = __importStar(__webpack_require__(2199));
const thumbarButtons = __importStar(__webpack_require__(2862));
const { buildInfo } = __webpack_require__(6774);
const Constants_1 = __webpack_require__(2009);
const BootstrapConstants = __webpack_require__(2009);
const settings = appSettings_1.appSettings.getSettings();
const connectionBackoff = new Backoff_1.default(1000, 20000);
const DISCORD_NAMESPACE = 'DISCORD_';
const envVariables = {
    disableRestart: process.env.DISCORD_DISABLE_RESTART,
    webappEndpoint: process.env.DISCORD_WEBAPP_ENDPOINT,
    test: process.env.DISCORD_TEST,
    networkDebugLog: process.env.DISCORD_NETWORK_DEBUG_LOG,
};
let webAppLoaded = false;
function checkCanMigrate() {
    return fs_1.default.existsSync(path_1.default.join(paths_1.paths.getUserData(), 'userDataCache.json'));
}
function checkAlreadyMigrated() {
    return fs_1.default.existsSync(path_1.default.join(paths_1.paths.getUserData(), 'domainMigrated'));
}
const getWebappEndpoint = () => {
    if (envVariables.webappEndpoint != null) {
        console.log(`Using DISCORD_WEBAPP_ENDPOINT override: ${envVariables.webappEndpoint}`);
        return envVariables.webappEndpoint;
    }
    let endpoint = settings?.get('WEBAPP_ENDPOINT');
    if (endpoint === false || endpoint == null) {
        if (buildInfo.releaseChannel === 'stable') {
            const canMigrate = checkCanMigrate();
            const alreadyMigrated = checkAlreadyMigrated();
            if (canMigrate || alreadyMigrated) {
                endpoint = 'https://discord.com';
            }
            else {
                endpoint = 'https://discordapp.com';
            }
        }
        else if (buildInfo.releaseChannel === 'development') {
            endpoint = 'https://canary.discord.com';
        }
        else {
            endpoint = `https://${buildInfo.releaseChannel}.discord.com`;
        }
    }
    return endpoint;
};
function getWebappLaunchPath() {
    const explicitSetting = settings?.get('WEBAPP_PATH', null);
    if (explicitSetting != null) {
        return explicitSetting;
    }
    const isConferenceModeEnabled = settings?.get('enableConferenceMode', false);
    return `${isConferenceModeEnabled ? Constants_1.WEBAPP_PATHS.CONFERENCE_MODE : Constants_1.WEBAPP_PATHS.APP}?_=${Date.now()}`;
}
exports.WEBAPP_ENDPOINT = getWebappEndpoint();
function getSanitizedPath(path) {
    return new url_1.default.URL(path, exports.WEBAPP_ENDPOINT).pathname;
}
function getSanitizedProtocolUrl(fullUrl) {
    try {
        const parsedURL = url_1.default.parse(fullUrl);
        if (parsedURL.protocol === 'discord:') {
            return {
                path: getSanitizedPath(parsedURL.path ?? ''),
                query: parsedURL.query ?? '',
            };
        }
    }
    catch (_) { }
    return null;
}
const WEBAPP_PATH = getWebappLaunchPath();
const URL_TO_LOAD = `${exports.WEBAPP_ENDPOINT}${WEBAPP_PATH}`;
const MIN_WIDTH = settings?.get('MIN_WIDTH', 940);
const MIN_HEIGHT = settings?.get('MIN_HEIGHT', 500);
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;
const MIN_VISIBLE_ON_SCREEN = 32;
const ENABLE_DEVTOOLS = buildInfo.releaseChannel === 'stable'
    ? settings?.get('DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING', false)
    : true;
const ENABLE_NET_DEBUG = envVariables.networkDebugLog?.toLowerCase() === 'true';
let mainWindow = null;
let mainWindowId = BootstrapConstants.DEFAULT_MAIN_WINDOW_ID;
let mainWindowInitialPath = null;
let mainWindowDidFinishLoad = false;
let mainWindowIsVisible = false;
let insideAuthFlow = false;
let lastCrashed = 0;
let lastCrashedNonRenderer = 0;
let lastPageLoadFailed = false;
const retryUpdateOptions = {
    skip_host_delta: false,
    skip_module_delta: {},
    skip_all_module_delta: false,
    allow_optional_updates: false,
};
function getMainWindowId() {
    return mainWindowId;
}
function webContentsSend(...args) {
    if (mainWindow == null || mainWindow.isDestroyed()) {
        console.error('mainScreen.webContentsSend: mainWindow is null or destroyed');
        return;
    }
    if (mainWindow.webContents == null || mainWindow.webContents.isDestroyed()) {
        console.error('mainScreen.webContentsSend: mainWindow.webContents is null or destroyed.');
        return;
    }
    const [event, ...options] = args;
    mainWindow.webContents.send(`${DISCORD_NAMESPACE}${event}`, ...options);
}
function saveWindowConfig(browserWindow) {
    try {
        if (browserWindow == null || browserWindow.isDestroyed()) {
            return;
        }
        settings?.set('IS_MAXIMIZED', browserWindow.isMaximized());
        settings?.set('IS_MINIMIZED', browserWindow.isMinimized());
        if (!settings?.get('IS_MAXIMIZED') && !settings?.get('IS_MINIMIZED')) {
            settings?.set('WINDOW_BOUNDS', browserWindow.getBounds());
        }
        settings?.save();
    }
    catch (e) {
        console.error(e);
    }
}
function setWindowVisible(isVisible, andUnminimize) {
    if (mainWindow == null) {
        console.error('mainScreen.setWindowVisible: mainWindow is null.');
        return;
    }
    if (mainWindow.isDestroyed()) {
        console.error('mainScreen.setWindowVisible: mainWindow isDestroyed.');
        return;
    }
    if (isVisible) {
        const isMinimized = mainWindow.isMinimized();
        if (andUnminimize || !isMinimized) {
            mainWindow.show();
            webContentsSend('MAIN_WINDOW_FOCUS');
        }
        else {
            console.log(`mainScreen.setWindowVisible: didn't show. andUnminimize: ${andUnminimize}, isMinimized: ${isMinimized}.`);
        }
    }
    else {
        webContentsSend('MAIN_WINDOW_BLUR');
        mainWindow.hide();
        if (systemTray.hasInit) {
            systemTray.displayHowToCloseHint();
        }
    }
    mainWindow.setSkipTaskbar(!isVisible);
    mainWindowIsVisible = isVisible;
}
function doAABBsOverlap(a, b) {
    const ax1 = a.x + a.width;
    const bx1 = b.x + b.width;
    const ay1 = a.y + a.height;
    const by1 = b.y + b.height;
    const cx0 = a.x < b.x ? b.x : a.x;
    const cx1 = ax1 < bx1 ? ax1 : bx1;
    if (cx1 - cx0 > 0) {
        const cy0 = a.y < b.y ? b.y : a.y;
        const cy1 = ay1 < by1 ? ay1 : by1;
        if (cy1 - cy0 > 0) {
            return true;
        }
    }
    return false;
}
function getDisplayForBounds(displays, bounds) {
    return displays.find((display) => {
        const displayBound = display.workArea;
        displayBound.x += MIN_VISIBLE_ON_SCREEN;
        displayBound.y += MIN_VISIBLE_ON_SCREEN;
        displayBound.width -= 2 * MIN_VISIBLE_ON_SCREEN;
        displayBound.height -= 2 * MIN_VISIBLE_ON_SCREEN;
        return doAABBsOverlap(bounds, displayBound);
    });
}
function getSavedWindowBounds() {
    if (!settings?.get('WINDOW_BOUNDS')) {
        return null;
    }
    const bounds = settings.get('WINDOW_BOUNDS');
    bounds.width = Math.max(MIN_WIDTH, bounds.width);
    bounds.height = Math.max(MIN_HEIGHT, bounds.height);
    const displays = electron_1.screen.getAllDisplays();
    const display = getDisplayForBounds(displays, bounds);
    return display != null ? bounds : null;
}
function applyWindowBoundsToConfig(mainWindowOptions) {
    const bounds = getSavedWindowBounds();
    if (bounds == null) {
        mainWindowOptions.center = true;
        return;
    }
    mainWindowOptions.width = bounds.width;
    mainWindowOptions.height = bounds.height;
    mainWindowOptions.x = bounds.x;
    mainWindowOptions.y = bounds.y;
}
function restoreMainWindowBounds(mainWindow) {
    const savedWindowBounds = getSavedWindowBounds();
    const currentBounds = mainWindow.getBounds();
    if (savedWindowBounds != null
        && (currentBounds.height !== savedWindowBounds.height || currentBounds.width !== savedWindowBounds.width)) {
        mainWindow.setBounds(savedWindowBounds);
    }
}
function adjustWindowBounds(window) {
    const bounds = window.getBounds();
    const displays = electron_1.screen.getAllDisplays();
    const display = getDisplayForBounds(displays, bounds);
    if (!display && displays.length > 0) {
        const displayBounds = displays[0].bounds;
        bounds.x = displayBounds.x;
        bounds.y = displayBounds.y;
        bounds.width = Math.min(bounds.width, displayBounds.width);
        bounds.height = Math.min(bounds.height, displayBounds.height);
        window.setBounds(bounds);
    }
}
function setupSystemTray() {
    if (!systemTray.hasInit) {
        systemTray.init({
            onCheckForUpdates: () => {
                const updater = updater_1.updater?.getUpdater();
                if (updater != null) {
                    void checkForUpdatesWithUpdater(updater);
                }
                else {
                    moduleUpdater_1.moduleUpdater.checkForUpdates();
                }
            },
            onTrayClicked: () => setWindowVisible(true, true),
            onOpenVoiceSettings: openVoiceSettings,
            onToggleMute: toggleMute,
            onToggleDeafen: toggleDeafen,
            onLaunchApplication: launchApplication,
        });
    }
}
function setupAppBadge() {
    if (!appBadge.hasInit) {
        appBadge.init();
    }
}
function setupAppConfig() {
    if (!appConfig.hasInit) {
        appConfig.init();
    }
}
function setupPopouts() {
    if (!popoutWindows.hasInit) {
        popoutWindows.init();
    }
}
function openVoiceSettings() {
    setWindowVisible(true, true);
    webContentsSend('SYSTEM_TRAY_OPEN_VOICE_SETTINGS');
}
function toggleMute() {
    webContentsSend('SYSTEM_TRAY_TOGGLE_MUTE');
}
function toggleDeafen() {
    webContentsSend('SYSTEM_TRAY_TOGGLE_DEAFEN');
}
function launchApplication(applicationId) {
    webContentsSend('LAUNCH_APPLICATION', applicationId);
}
const loadMainPage = () => {
    performance.mark('mainscreen-loadmainpage');
    bootstrapModules_1.analytics?.getDesktopTTI?.().trackMainWindowLoadStart();
    lastPageLoadFailed = false;
    mainWindow.loadURL(URL_TO_LOAD);
    setTimeout(() => {
        if (!webAppLoaded && Math.random() < 0.05) {
            const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
            if (sentry != null) {
                sentry.captureMessage('WebApp timed out loading (timeout=60s)');
            }
        }
    }, 60000);
};
const DEFAULT_BACKGROUND_COLOR = '#2f3136';
const BACKGROUND_COLOR_KEY = 'BACKGROUND_COLOR';
function getBackgroundColor() {
    return settings?.get(BACKGROUND_COLOR_KEY, DEFAULT_BACKGROUND_COLOR) ?? DEFAULT_BACKGROUND_COLOR;
}
function setBackgroundColor(color) {
    settings?.set(BACKGROUND_COLOR_KEY, color);
    mainWindow?.setBackgroundColor(color);
    settings?.save();
}
async function launchMainAppWindow(isVisible) {
    performance.mark('mainscreen-launch-window');
    if (mainWindow) {
        mainWindow.destroy();
    }
    const earlyWindow = global.__earlyMainWindow;
    const adoptedEarlyWindow = earlyWindow != null && !earlyWindow.isDestroyed();
    if (adoptedEarlyWindow) {
        performance.mark('mainscreen-adopt-early-window');
        console.log(`[mainScreen] Adopting early-created main window (id=${earlyWindow.id})`);
        mainWindow = earlyWindow;
        mainWindowId = mainWindow.id;
        global.mainWindowId = mainWindowId;
        global.__earlyMainWindow = undefined;
        global.__earlyMainWindowUrl = undefined;
        global.__earlyMainWindowWebappEndpoint = undefined;
        bootstrapModules_1.analytics?.getDesktopTTI?.().trackMainWindowCreated();
        includeOptionalModule('./ElectronTestRpc', (module) => module.initialize(mainWindow));
        restoreMainWindowBounds(mainWindow);
        performance.measure('mainscreen-adopt-early-window-duration', 'mainscreen-adopt-early-window');
    }
    else {
        if (earlyWindow != null) {
            console.warn('[mainScreen] Early window exists but is destroyed, creating new window');
            global.__earlyMainWindow = undefined;
            global.__earlyMainWindowUrl = undefined;
            global.__earlyMainWindowWebappEndpoint = undefined;
        }
        const additionalArguments = ['--enable-node-leakage-in-renderers'];
        if (exports.WEBAPP_ENDPOINT.startsWith('http://') && !exports.WEBAPP_ENDPOINT.startsWith('http://localhost')) {
            console.log('Allowing insecure origin for development');
            additionalArguments.push(`--unsafely-treat-insecure-origin-as-secure=${exports.WEBAPP_ENDPOINT}`);
        }
        const mainWindowOptions = {
            title: 'Discord',
            backgroundColor: getBackgroundColor(),
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            minWidth: MIN_WIDTH,
            minHeight: MIN_HEIGHT,
            transparent: false,
            frame: false,
            resizable: true,
            show: isVisible,
            webPreferences: {
                enableBlinkFeatures: 'EnumerateDevices,AudioOutputDevices',
                nodeIntegration: false,
                sandbox: false,
                preload: path_1.default.join(__dirname, 'mainScreenPreload.js'),
                spellcheck: true,
                contextIsolation: true,
                additionalArguments,
                devTools: ENABLE_DEVTOOLS,
            },
        };
        if (process.platform === 'linux') {
            mainWindowOptions.icon = path_1.default.join(path_1.default.dirname(electron_1.app.getPath('exe')), 'discord.png');
        }
        if (process.platform === 'darwin') {
            mainWindowOptions.titleBarStyle = 'hidden';
            mainWindowOptions.trafficLightPosition = { x: 9, y: 9 };
        }
        applyWindowBoundsToConfig(mainWindowOptions);
        bootstrapModules_1.analytics?.getDesktopTTI?.().trackMainWindowCreated();
        mainWindow = new electron_1.BrowserWindow(mainWindowOptions);
        mainWindowId = mainWindow.id;
        global.mainWindowId = mainWindowId;
        includeOptionalModule('./ElectronTestRpc', (module) => module.initialize(mainWindow));
        console.log('Clearing GPU shader cache...');
        try {
            await mainWindow.webContents.session.clearStorageData({
                storages: ['shadercache'],
            });
        }
        catch (error) {
            console.error('Failed to clear shader cache:', error);
        }
        restoreMainWindowBounds(mainWindow);
    }
    mainWindow.webContents.on('did-start-loading', () => {
        performance.mark('mainwindow-did-start-loading');
        console.log(`[mainScreen] webContents did-start-loading at ${performance.now().toFixed(2)}ms`);
    });
    mainWindow.webContents.on('dom-ready', () => {
        performance.mark('mainwindow-dom-ready');
        console.log(`[mainScreen] webContents dom-ready at ${performance.now().toFixed(2)}ms`);
    });
    mainWindow.webContents.on('did-finish-load', () => {
        performance.mark('mainwindow-did-finish-load');
        console.log(`[mainScreen] webContents did-finish-load at ${performance.now().toFixed(2)}ms`);
    });
    mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback, details) => {
        switch (permission) {
            case 'accessibility-events':
                callback(true);
                return;
            case 'notifications':
            case 'pointerLock':
                callback((0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, exports.WEBAPP_ENDPOINT));
                return;
            case 'fullscreen':
            case 'clipboard-sanitized-write':
                let result = false;
                if (details.isMainFrame) {
                    result = (0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, exports.WEBAPP_ENDPOINT);
                }
                else {
                    result = true;
                }
                callback(result);
                return;
            case 'media':
                callback((0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID)
                    || (0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID_V2)
                    || (0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID_FACE_SCAN));
                return;
        }
        callback(false);
    });
    mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
        switch (permission) {
            case 'notifications':
            case 'fullscreen':
            case 'pointerLock':
            case 'clipboard-sanitized-write':
                if (details.isMainFrame || details.embeddingOrigin == null) {
                    return (0, securityUtils_1.checkUrlOriginMatches)(requestingOrigin, exports.WEBAPP_ENDPOINT);
                }
                else {
                    return (0, securityUtils_1.checkUrlOriginMatches)(details.embeddingOrigin, exports.WEBAPP_ENDPOINT);
                }
            case 'media':
                return ((0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID)
                    || (0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID_V2)
                    || (0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID_FACE_SCAN)
                    || (0, securityUtils_1.checkUrlOriginMatches)(requestingOrigin, exports.WEBAPP_ENDPOINT));
        }
        return false;
    });
    mainWindow.setMenuBarVisibility(false);
    if (settings?.get('IS_MAXIMIZED')) {
        mainWindow.maximize();
    }
    if (settings?.get('IS_MINIMIZED')) {
        mainWindow.minimize();
    }
    mainWindow.webContents.setWindowOpenHandler(({ url, frameName, features }) => {
        if (frameName.startsWith(DISCORD_NAMESPACE)
            && (0, securityUtils_1.checkUrlOriginMatches)(url, exports.WEBAPP_ENDPOINT)
            && getSanitizedPath(url) === '/popout') {
            return popoutWindows.openOrFocusWindow(url, frameName, features);
        }
        else if ((0, securityUtils_1.shouldOpenExternalUrl)(url)) {
            void (0, securityUtils_1.saferShellOpenExternal)(url);
        }
        return { action: 'deny' };
    });
    mainWindow.webContents.on('did-fail-load', (e, errCode, errDesc, validatedUrl) => {
        if (insideAuthFlow) {
            return;
        }
        if (validatedUrl !== URL_TO_LOAD) {
            return;
        }
        if (errCode === -3 || errCode === 0)
            return;
        lastPageLoadFailed = true;
        console.error('[WebContents] did-fail-load', errCode, errDesc, `retry in ${connectionBackoff.current} ms`);
        connectionBackoff.fail(() => {
            console.log('[WebContents] retrying load', URL_TO_LOAD);
            loadMainPage();
        });
    });
    mainWindow.webContents.on('did-create-window', (childWindow, { options, frameName }) => {
        const extendedWindow = childWindow;
        extendedWindow.setMenuBarVisibility(false);
        extendedWindow.windowKey = frameName;
        popoutWindows.setupPopout(extendedWindow, frameName, options, exports.WEBAPP_ENDPOINT);
        adjustWindowBounds(childWindow);
    });
    ipcMain_1.default.on(constants_1.IPCEvents.APP_ASYNC_INDEX_TSX_LOADED, () => {
        if (!mainWindowDidFinishLoad) {
            bootstrapModules_1.analytics?.getDesktopTTI?.().trackMainWindowLoadDuration();
        }
        console.log(`ipcMain.on(IPCEvents.APP_ASYNC_INDEX_TSX_LOADED) ${lastPageLoadFailed} ${mainWindowDidFinishLoad}`);
        if (insideAuthFlow
            && mainWindow.webContents
            && (0, securityUtils_1.checkUrlOriginMatches)(mainWindow.webContents.getURL(), exports.WEBAPP_ENDPOINT)) {
            insideAuthFlow = false;
        }
        mainWindowDidFinishLoad = true;
        if (ENABLE_NET_DEBUG) {
            const netLogger = logger_1.logger.networkDebugLogger();
            if (netLogger != null) {
                (0, networkDebugUtils_1.setupNetworkLogging)(mainWindow, netLogger);
            }
        }
        if (mainWindowInitialPath != null) {
            webContentsSend('MAIN_WINDOW_PATH', mainWindowInitialPath.path, mainWindowInitialPath.query);
            mainWindowInitialPath = null;
        }
        webContentsSend(mainWindow?.isFocused() ? 'MAIN_WINDOW_FOCUS' : 'MAIN_WINDOW_BLUR');
        if (!lastPageLoadFailed) {
            connectionBackoff.succeed();
            splashScreen_1.splashScreen.pageReady();
            if (settings?.get(staffDevTools_1._STAFF_DEV_TOOLS_KEY, false)) {
                (0, staffDevTools_1.tryLoadStaffDevToolsModule)(mainWindow, exports.WEBAPP_ENDPOINT).catch((e) => {
                    const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
                    sentry?.captureMessage(`[STAFF_DEV_TOOLS] Unexpected error: ${e instanceof Error ? e.message : e}`);
                });
            }
        }
    });
    mainWindow.webContents.on('render-process-gone', (e, details) => {
        const reason = details?.reason ?? 'Unknown';
        const killed = reason === 'killed';
        processUtils_1.processUtilsSettings.rendererCrashReason = reason;
        processUtils_1.processUtilsSettings.rendererCrashExitCode = details?.exitCode ?? null;
        processUtils_1.processUtilsSettings.lastRunsStoredInformation = processUtils_1.processUtilsSettings.currentStoredInformation;
        processUtils_1.processUtilsSettings.currentStoredInformation = {};
        if (killed) {
            electron_1.app.quit();
            return;
        }
        const crashTime = Date.now();
        if (crashTime - lastCrashed < 5 * 1000) {
            console.error(`[WebContents] double crashed (reason: ${reason}, exitCode: ${details?.exitCode})... RIP =(`);
            electron_1.app.quit();
            return;
        }
        lastCrashed = crashTime;
        console.error(`[WebContents] crashed (reason: ${reason}, exitCode: ${details?.exitCode})... reloading`);
        if (envVariables.disableRestart != null) {
            electron_1.app.quit();
            return;
        }
        mainWindow.webContents.reload();
    });
    mainWindow.webContents.on('will-navigate', (evt, url) => {
        if (!insideAuthFlow && !(0, securityUtils_1.checkUrlOriginMatches)(url, exports.WEBAPP_ENDPOINT)) {
            evt.preventDefault();
        }
    });
    mainWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
        if ((0, securityUtils_1.checkUrlOriginMatches)(oldUrl, exports.WEBAPP_ENDPOINT)
            && (0, securityUtils_1.checkUrlOriginMatches)(newUrl, 'https://accounts.google.com/')) {
            insideAuthFlow = true;
        }
    });
    mainWindow.webContents.on('context-menu', (_, params) => {
        webContentsSend('SPELLCHECK_RESULT', params.misspelledWord, params.dictionarySuggestions);
    });
    mainWindow.webContents.on('devtools-opened', () => {
        webContentsSend('WINDOW_DEVTOOLS_OPENED');
    });
    mainWindow.webContents.on('devtools-closed', () => {
        webContentsSend('WINDOW_DEVTOOLS_CLOSED');
    });
    mainWindow.on('focus', () => {
        webContentsSend('MAIN_WINDOW_FOCUS');
    });
    mainWindow.on('blur', () => {
        webContentsSend('MAIN_WINDOW_BLUR');
    });
    mainWindow.on('page-title-updated', (e, title) => {
        if (mainWindow == null) {
            return;
        }
        e.preventDefault();
        setMainWindowTitle(title);
    });
    mainWindow.on('leave-html-full-screen', () => {
        if (mainWindow == null) {
            return;
        }
        mainWindow.setMenuBarVisibility(false);
    });
    mainWindow.on('show', () => {
        setTimeout(() => appBadge.refreshAppBadge(), 500);
    });
    mainWindow.webContents.on('did-navigate-in-page', (_, eventUrl) => {
        if (mainWindow == null) {
            return;
        }
        let parsedUrl;
        try {
            parsedUrl = url_1.default.parse(eventUrl);
        }
        catch (_) {
            return;
        }
        if (parsedUrl?.pathname === '/login') {
            mainWindow.webContents.clearHistory();
        }
        setMainWindowTitle(mainWindow.webContents.getTitle());
    });
    mainWindow.on('swipe', (_, direction) => {
        switch (direction) {
            case 'left':
                webContentsSend('NAVIGATE_BACK', 'SWIPE');
                break;
            case 'right':
                webContentsSend('NAVIGATE_FORWARD', 'SWIPE');
                break;
        }
    });
    if (logger_1.logger != null) {
        mainWindow.webContents.on('console-message', logger_1.logger.ipcMainRendererLogger);
    }
    if (process.platform === 'win32') {
        mainWindow.on('app-command', (_, cmd) => {
            switch (cmd) {
                case 'browser-backward':
                    webContentsSend('NAVIGATE_BACK', 'BROWSER');
                    break;
                case 'browser-forward':
                    webContentsSend('NAVIGATE_FORWARD', 'BROWSER');
                    break;
            }
        });
    }
    if (process.platform === 'darwin') {
        mainWindow.on('close', (e) => {
            if (mainWindow != null) {
                if (mainWindow.isFullScreen()) {
                    mainWindow.setFullScreen(false);
                }
                else {
                    webContentsSend('MAIN_WINDOW_HIDDEN');
                    electron_1.default.Menu.sendActionToFirstResponder('hide:');
                }
                e.preventDefault();
            }
            return false;
        });
    }
    performance.mark('mainscreen-launch-window-misc-setup');
    setupAppConfig();
    setupPopouts();
    thumbarButtons.init();
    mouse.init();
    performance.measure('mainscreen-launch-window-misc-setup-duration', 'mainscreen-launch-window-misc-setup');
    setImmediate(() => {
        performance.mark('mainscreen-deferred-setup');
        setupSystemTray();
        setupAppBadge();
        if (process.platform === 'linux' || process.platform === 'win32') {
            systemTray.show();
            mainWindow.on('close', (e) => {
                if (mainWindow == null) {
                    popoutWindows.closePopouts();
                    return;
                }
                webContentsSend('MAIN_WINDOW_BLUR');
                saveWindowConfig(mainWindow);
                if (!settings?.get('MINIMIZE_TO_TRAY', true)) {
                    electron_1.app.quit();
                    return;
                }
                webContentsSend('MAIN_WINDOW_HIDDEN');
                setWindowVisible(false, false);
                e.preventDefault();
            });
        }
        performance.measure('mainscreen-deferred-setup-duration', 'mainscreen-deferred-setup');
    });
    if (adoptedEarlyWindow) {
        performance.mark('mainscreen-loadmainpage');
        bootstrapModules_1.analytics?.getDesktopTTI?.().trackMainWindowLoadStart();
        console.log('[mainScreen] Skipping loadMainPage — early window already loading URL');
    }
    else {
        loadMainPage();
    }
    performance.measure('mainscreen-launch-window-duration', 'mainscreen-launch-window');
}
let updaterState = Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE;
function includeOptionalModule(path, cb) {
    try {
        const module = require(path);
        if (cb != null) {
            cb(module);
        }
        console.log(`Module ${path} was included.`);
        return module;
    }
    catch (e) {
        if (e?.code === 'MODULE_NOT_FOUND') {
            console.log(`Optional module ${path} was not included.`);
        }
        else {
            console.error(`Failed to initialize ${path}`, e);
            console.error(`e.toString() ${e.toString()}`);
        }
    }
    return undefined;
}
function handleModuleUpdateCheckFinished(succeeded, updateCount, manualRequired) {
    if (!succeeded) {
        updaterState = Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE;
        webContentsSend(Constants_1.UpdaterEvents.UPDATE_ERROR);
        return;
    }
    if (updateCount === 0) {
        updaterState = Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE;
    }
    else if (manualRequired) {
        updaterState = Constants_1.UpdaterEvents.UPDATE_MANUALLY;
    }
    else {
        updaterState = Constants_1.UpdaterEvents.UPDATE_AVAILABLE;
    }
    webContentsSend(updaterState);
}
function handleModuleUpdateDownloadProgress(name, progress) {
    if (mainWindow) {
        mainWindow.setProgressBar(progress);
    }
    webContentsSend(Constants_1.UpdaterEvents.MODULE_INSTALL_PROGRESS, name, progress);
}
function handleModuleUpdateDownloadsFinished(succeeded, failed) {
    if (mainWindow) {
        mainWindow.setProgressBar(-1);
    }
    if (updaterState === Constants_1.UpdaterEvents.UPDATE_AVAILABLE) {
        if (failed > 0) {
            updaterState = Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE;
            webContentsSend(Constants_1.UpdaterEvents.UPDATE_ERROR);
        }
        else {
            updaterState = Constants_1.UpdaterEvents.UPDATE_DOWNLOADED;
            webContentsSend(updaterState);
        }
    }
}
function handleModuleUpdateInstalledModule(name, current, total, succeeded) {
    if (mainWindow) {
        mainWindow.setProgressBar(-1);
    }
    webContentsSend(Constants_1.UpdaterEvents.MODULE_INSTALLED, name, succeeded);
}
function setUpdaterState(newUpdaterState) {
    updaterState = newUpdaterState;
    webContentsSend(updaterState);
}
function setMainWindowTitle(title) {
    if (!title.endsWith('Discord')) {
        title += ' - Discord';
    }
    if (mainWindow) {
        mainWindow.setTitle(title);
    }
}
async function checkForUpdatesWithUpdater(updater, options) {
    const allowMultipleUpdates = options?.allowMultipleUpdates ?? false;
    if (updaterState === Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE || allowMultipleUpdates) {
        setUpdaterState(Constants_1.UpdaterEvents.CHECKING_FOR_UPDATES);
        try {
            let installedAnything = false;
            const progressCallback = (progress) => {
                const task = progress.task.HostInstall || progress.task.ModuleInstall;
                if (task != null && progress.state === 'Complete') {
                    if (!installedAnything) {
                        installedAnything = true;
                        setUpdaterState(Constants_1.UpdaterEvents.UPDATE_AVAILABLE);
                    }
                }
                if (task != null && progress.state.Failed != null) {
                    if (progress.task.HostInstall != null) {
                        retryUpdateOptions.skip_host_delta = true;
                    }
                    else if (progress.task.ModuleInstall != null) {
                        retryUpdateOptions.skip_module_delta[task.version.module.name] = true;
                    }
                }
            };
            if (updater.updateToLatestWithOptions) {
                await updater.updateToLatestWithOptions(retryUpdateOptions, progressCallback);
            }
            else {
                await updater.updateToLatest(progressCallback);
            }
            setUpdaterState(installedAnything ? Constants_1.UpdaterEvents.UPDATE_DOWNLOADED : Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE);
        }
        catch (e) {
            console.error('Update to latest failed: ', e);
            updaterState = Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE;
            webContentsSend(Constants_1.UpdaterEvents.UPDATE_ERROR);
        }
    }
    else {
        webContentsSend(updaterState);
    }
}
const analyticsState = {
    ready: false,
    cached: [],
};
function setupAnalyticsEvents() {
    bootstrapModules_1.analytics?.getAnalytics()?.on('event', (event) => {
        if (analyticsState.ready) {
            webContentsSend(Constants_1.AnalyticsEvents.APP_PUSH_ANALYTICS, [event]);
        }
        else {
            analyticsState.cached.push(event);
        }
    });
    ipcMain_1.default.on(Constants_1.AnalyticsEvents.APP_GET_ANALYTICS_EVENTS, (_event) => {
        const a = bootstrapModules_1.analytics?.getAnalytics();
        if (a == null) {
            console.log(`[app] null analytics`);
            return;
        }
        const events = a.getAndTruncateEvents();
        if (!analyticsState.ready) {
            analyticsState.ready = true;
            events.push(...analyticsState.cached);
            analyticsState.cached = [];
        }
        webContentsSend(Constants_1.AnalyticsEvents.APP_PUSH_ANALYTICS, events);
    });
    ipcMain_1.default.on(Constants_1.AnalyticsEvents.APP_VIEWED, (_event) => {
        const a = bootstrapModules_1.analytics?.getDesktopTTI?.();
        if (a == null) {
            return;
        }
        a.trackMainWindowJSAppLoadDuration();
        a.trackFullTTI();
    });
    ipcMain_1.default.on(Constants_1.AnalyticsEvents.APP_LOADED, (_event) => {
        performance.measure('mainscreen-loadmainpage-duration', 'mainscreen-loadmainpage');
        webAppLoaded = true;
    });
    ipcMain_1.default.on(Constants_1.AnalyticsEvents.APP_FIRST_RENDER_AFTER_READY_PAYLOAD, (_event) => {
        const a = bootstrapModules_1.analytics?.getDesktopTTI?.();
        if (a == null) {
            return;
        }
        if (process.platform !== 'linux') {
            a.trackMainWindowJSAppInteractiveDuration();
            a.trackFullInteractiveTTI();
        }
    });
}
function setupUpdaterEventsWithUpdater(updater) {
    electron_1.app.on(Constants_1.MenuEvents.CHECK_FOR_UPDATES, () => checkForUpdatesWithUpdater(updater));
    ipcMain_1.default.on(Constants_1.UpdaterEvents.CHECK_FOR_UPDATES, (_evt, options) => {
        return checkForUpdatesWithUpdater(updater, options);
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.QUIT_AND_INSTALL, () => {
        saveWindowConfig(mainWindow);
        mainWindow = null;
        try {
            moduleUpdater_1.moduleUpdater.quitAndInstallUpdates();
        }
        catch (e) {
            electron_1.app.relaunch();
            electron_1.app.quit();
        }
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE, () => {
        if (updater.queryAndTruncateHistory != null) {
            webContentsSend(Constants_1.UpdaterEvents.UPDATER_HISTORY_RESPONSE, updater.queryAndTruncateHistory());
        }
        else {
            webContentsSend(Constants_1.UpdaterEvents.UPDATER_HISTORY_RESPONSE, []);
        }
    });
}
function setupLegacyUpdaterEvents() {
    electron_1.app.on(Constants_1.MenuEvents.CHECK_FOR_UPDATES, () => moduleUpdater_1.moduleUpdater.checkForUpdates());
    moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.CHECKING_FOR_UPDATES, () => {
        updaterState = Constants_1.UpdaterEvents.CHECKING_FOR_UPDATES;
        webContentsSend(updaterState);
    });
    if (moduleUpdater_1.moduleUpdater.supportsEventObjects) {
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.UPDATE_CHECK_FINISHED, ({ succeeded, updateCount, manualRequired, }) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.UPDATE_CHECK_FINISHED}`);
            handleModuleUpdateCheckFinished(succeeded, updateCount, manualRequired);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULE_PROGRESS, ({ name, progress }) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULE_PROGRESS} ${name} ${progress}`);
            handleModuleUpdateDownloadProgress(name, progress);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULES_FINISHED, ({ succeeded, failed }) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULES_FINISHED} ${succeeded} ${failed}`);
            handleModuleUpdateDownloadsFinished(succeeded, failed);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.INSTALLED_MODULE, ({ name, current, total, succeeded }) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.INSTALLED_MODULE} ${name} ${current} ${total} ${succeeded}`);
            handleModuleUpdateInstalledModule(name, current, total, succeeded);
        });
    }
    else {
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.UPDATE_CHECK_FINISHED, (succeeded, updateCount, manualRequired) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.UPDATE_CHECK_FINISHED} ${succeeded} ${updateCount} ${manualRequired}`);
            handleModuleUpdateCheckFinished(succeeded, updateCount, manualRequired);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULE_PROGRESS, (name, progress) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULE_PROGRESS} ${name} ${progress}`);
            handleModuleUpdateDownloadProgress(name, progress);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULES_FINISHED, (succeeded, failed) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULES_FINISHED} ${succeeded} ${failed}`);
            handleModuleUpdateDownloadsFinished(succeeded, failed);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.INSTALLED_MODULE, (name, current, total, succeeded) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.INSTALLED_MODULE} ${name} ${current} ${total} ${succeeded}`);
            handleModuleUpdateInstalledModule(name, current, total, succeeded);
        });
    }
    ipcMain_1.default.on(Constants_1.UpdaterEvents.CHECK_FOR_UPDATES, () => {
        console.log(`mainScreen.UpdaterEvents: ${Constants_1.UpdaterEvents.CHECK_FOR_UPDATES} ${updaterState}`);
        if (updaterState === Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE) {
            moduleUpdater_1.moduleUpdater.checkForUpdates();
        }
        else {
            webContentsSend(updaterState);
        }
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.QUIT_AND_INSTALL, () => {
        console.log(`mainScreen.UpdaterEvents: ${Constants_1.UpdaterEvents.QUIT_AND_INSTALL} ${updaterState}`);
        saveWindowConfig(mainWindow);
        mainWindow = null;
        try {
            moduleUpdater_1.moduleUpdater.quitAndInstallUpdates();
        }
        catch (e) {
            electron_1.app.relaunch();
            electron_1.app.quit();
        }
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.MODULE_INSTALL, (_event, name) => {
        console.log(`mainScreen.UpdaterEvents: ${Constants_1.UpdaterEvents.MODULE_INSTALL} ${name}`);
        moduleUpdater_1.moduleUpdater.install(name, false);
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.MODULE_QUERY, (_event, name) => {
        console.log(`mainScreen.UpdaterEvents: ${Constants_1.UpdaterEvents.MODULE_QUERY} ${name}`);
        webContentsSend(Constants_1.UpdaterEvents.MODULE_INSTALLED, name, moduleUpdater_1.moduleUpdater.isInstalled(name, undefined));
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE, () => {
        console.log(`mainScreen.UpdaterEvents: ${Constants_1.UpdaterEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE}`);
        webContentsSend(Constants_1.UpdaterEvents.UPDATER_HISTORY_RESPONSE, moduleUpdater_1.moduleUpdater.events.history);
        moduleUpdater_1.moduleUpdater.events.history = [];
    });
}
function handleDisplayChange() {
    if (mainWindow == null) {
        return;
    }
    if (process.platform === 'win32' && !mainWindowIsVisible) {
        setWindowVisible(mainWindowIsVisible, false);
    }
}
function init() {
    electron_1.screen.on('display-added', handleDisplayChange);
    electron_1.screen.on('display-removed', handleDisplayChange);
    electron_1.screen.on('display-metrics-changed', handleDisplayChange);
    electron_1.app.on('window-all-closed', () => {
        if (envVariables.test != null) {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('before-quit', () => {
        saveWindowConfig(mainWindow);
        mainWindow = null;
    });
    electron_1.app.on('child-process-gone', (_event, details) => {
        if (details.exitCode === 0) {
            return;
        }
        const serviceDescription = `${details.type} (${details.name})`;
        console.error(`child-process-gone! child: ${serviceDescription} exitCode: ${details.exitCode}`);
        if (details.type === 'GPU' || details.type === 'Utility') {
            const crashTime = performance.now();
            if (crashTime - lastCrashedNonRenderer > 30_000) {
                webContentsSend('CRASH_REPORTER_NEW_CRASH', details);
            }
            else {
                console.error(`Detected frequent crash for non-renderer process`);
            }
            lastCrashedNonRenderer = crashTime;
        }
        const { reason } = details;
        if (reason === 'crashed' || reason === 'oom') {
            const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
            if (sentry != null) {
                const skipSentryCapture = details.type === 'Utility' && details.exitCode === -1073741205;
                if (!skipSentryCapture) {
                    sentry.captureMessage(`'${details.type}' process exited with '${details.reason}' with exitcode '${details.exitCode}'`);
                }
            }
        }
    });
    electron_1.app.on(Constants_1.MenuEvents.OPEN_HELP, () => webContentsSend('HELP_OPEN'));
    electron_1.app.on(Constants_1.MenuEvents.OPEN_SETTINGS, () => webContentsSend('USER_SETTINGS_OPEN'));
    electron_1.app.on('second-instance', (_event, args) => {
        if (args?.indexOf('--squirrel-uninstall') > -1) {
            return;
        }
        if (process.argv?.slice(1).includes('--multi-instance')) {
            return;
        }
        if (mainWindow == null || mainWindow.isDestroyed()) {
            return;
        }
        setWindowVisible(true, false);
        mainWindow.focus();
    });
    ipcMain_1.default.on('SETTINGS_UPDATE_BACKGROUND_COLOR', (_event, backgroundColor) => {
        if (getBackgroundColor() !== backgroundColor) {
            setBackgroundColor(backgroundColor);
        }
    });
    ipcMain_1.default.on(constants_1.IPCEvents.WINDOW_SET_TRAFFIC_LIGHT_POSITION, (_event, position) => {
        if (process.platform !== 'darwin')
            return;
        if (mainWindow == null || mainWindow.isDestroyed())
            return;
        try {
            mainWindow.setWindowButtonPosition(position);
        }
        catch (e) {
            console.error('Failed to set traffic light position', e);
        }
    });
    ipcMain_1.default.on(constants_1.IPCEvents.NAVIGATION_HISTORY_CLEAR, () => {
        if (mainWindow != null && !mainWindow.isDestroyed()) {
            mainWindow.webContents.navigationHistory?.clear();
        }
    });
    ipcMain_1.default.on('OPEN_EXTERNAL_URL', (_event, externalUrl) => {
        (0, securityUtils_1.saferShellOpenExternal)(externalUrl).catch((_) => {
            console.error('Failed to open external URL', externalUrl);
        });
    });
    setupAnalyticsEvents();
    const updater = updater_1.updater?.getUpdater();
    if (updater != null) {
        setupUpdaterEventsWithUpdater(updater);
    }
    else {
        setupLegacyUpdaterEvents();
    }
    void launchMainAppWindow(false);
}
function handleOpenUrl(url) {
    const sanitizedUrl = getSanitizedProtocolUrl(url);
    if (sanitizedUrl != null) {
        if (!mainWindowDidFinishLoad) {
            mainWindowInitialPath = {
                path: sanitizedUrl.path,
                query: sanitizedUrl.query,
            };
        }
        webContentsSend('MAIN_WINDOW_PATH', sanitizedUrl.path, sanitizedUrl.query);
    }
    if (mainWindow == null) {
        return;
    }
    setWindowVisible(true, false);
    mainWindow.focus();
}
function setMainWindowVisible(visible) {
    setWindowVisible(visible, false);
}


},
5439(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = init;
const electron_1 = __webpack_require__(1288);
const constants_1 = __webpack_require__(3672);
const ipcMain_1 = __importDefault(__webpack_require__(9139));
let hasInit = false;
function init() {
    if (hasInit) {
        return;
    }
    ipcMain_1.default.handle(constants_1.IPCEvents.GET_MOUSE_COORDINATES, () => electron_1.screen.getCursorScreenPoint());
    hasInit = true;
}


},
9738(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupNetworkLogging = setupNetworkLogging;
function sanitizeHeaders(payload) {
    if (!payload.headers) {
        return payload;
    }
    const strippedHeaders = Object.keys(payload.headers).reduce((acc, key) => {
        if (key.toLowerCase() === 'authorization' || key.toLowerCase() === 'cookie') {
            return acc;
        }
        acc[key] = payload.headers[key];
        return acc;
    }, {});
    return {
        ...payload,
        headers: strippedHeaders,
    };
}
function setupNetworkLogging(mainWindow, logger) {
    if (mainWindow?.webContents == null) {
        return;
    }
    try {
        mainWindow.webContents.debugger.attach('1.1');
    }
    catch (err) {
        logger.error('debugger attach failed: ' + err, 3);
        return;
    }
    mainWindow.webContents.debugger.on('message', (event, method, params) => {
        let entry = null;
        if (method === 'Network.requestWillBeSent') {
            const { requestId, request, initiator, type } = params;
            entry = {
                timestamp: new Date().toISOString(),
                method,
                requestId,
                resource: sanitizeHeaders(request || {}),
                resourceType: type,
                initiator: initiator?.type,
            };
        }
        else if (method === 'Network.responseReceived') {
            const { requestId, response, type } = params;
            entry = {
                timestamp: new Date().toISOString(),
                method,
                requestId,
                resource: sanitizeHeaders(response || {}),
                resourceType: type?.type,
            };
        }
        if (entry != null) {
            logger.info(JSON.stringify(entry));
        }
    });
    mainWindow.webContents.debugger.sendCommand('Network.enable');
}


},
2782(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasInit = void 0;
exports.init = init;
exports.getWindow = getWindow;
exports.getAllWindows = getAllWindows;
exports.setNewWindowEvent = setNewWindowEvent;
exports.openOrFocusWindow = openOrFocusWindow;
exports.setupPopout = setupPopout;
exports.closePopouts = closePopouts;
const electron_1 = __webpack_require__(1288);
const path_1 = __importDefault(__webpack_require__(6928));
const securityUtils_1 = __webpack_require__(7815);
const appFeatures_1 = __webpack_require__(5444);
const ALLOWED_FEATURES = [
    'width',
    'height',
    'left',
    'top',
    'resizable',
    'movable',
    'alwaysOnTop',
    'frame',
    'transparent',
    'hasShadow',
    'closable',
    'skipTaskbar',
    'backgroundColor',
    'menubar',
    'toolbar',
    'location',
    'directories',
    'titleBarStyle',
    'outOfProcessOverlay',
    'focusable',
];
const MIN_POPOUT_WIDTH = 320;
const MIN_POPOUT_HEIGHT = 180;
const DEFAULT_POPOUT_OPTIONS = {
    title: 'Discord Popout',
    backgroundColor: '#2f3136',
    minWidth: MIN_POPOUT_WIDTH,
    minHeight: MIN_POPOUT_HEIGHT,
    transparent: false,
    frame: false,
    resizable: true,
    show: true,
    titleBarStyle: process.platform === 'darwin' ? 'hidden' : undefined,
    trafficLightPosition: process.platform === 'darwin' ? { x: 12, y: 5 } : undefined,
    webPreferences: {
        nodeIntegration: false,
        nativeWindowOpen: true,
        enableRemoteModule: false,
        contextIsolation: true,
    },
};
const features = (0, appFeatures_1.getFeatures)();
exports.hasInit = false;
let popoutWindows = {};
let newWindowEvent = () => { };
function init() {
    if (exports.hasInit) {
        console.warn('popoutWindows: Has already init! Cancelling init.');
        return;
    }
    exports.hasInit = true;
    features.declareSupported('popout_windows');
}
function focusWindow(window) {
    if (window == null)
        return;
    window.setAlwaysOnTop(true);
    window.focus();
    window.setAlwaysOnTop(false);
}
function getWindow(key) {
    return popoutWindows[key];
}
function getAllWindows() {
    return Object.values(popoutWindows);
}
function setNewWindowEvent(event) {
    newWindowEvent = event;
}
function parseFeatureValue(feature) {
    if (feature === 'yes') {
        return true;
    }
    else if (feature === 'no') {
        return false;
    }
    const parsedNumber = Number.parseInt(feature);
    if (!Number.isNaN(parsedNumber)) {
        return parsedNumber;
    }
    return feature;
}
function filterWindowFeatures(hasKey, getKey) {
    return ALLOWED_FEATURES.reduce((acc, curr) => {
        if (hasKey(curr)) {
            return {
                ...acc,
                [curr]: getKey(curr),
            };
        }
        return acc;
    }, {});
}
function parseWindowFeatures(features) {
    const keyValuesParsed = features.split(',');
    const parsedFeatures = {};
    for (const feature of keyValuesParsed) {
        const [key, value] = feature.split('=');
        parsedFeatures[key] = parseFeatureValue(value);
    }
    return filterWindowFeatures((key) => parsedFeatures.hasOwnProperty(key), (key) => parsedFeatures[key]);
}
function openOrFocusWindow(_windowURL, key, features) {
    const windowOptions = {
        ...DEFAULT_POPOUT_OPTIONS,
        ...parseWindowFeatures(features),
    };
    const existingWindow = popoutWindows[key];
    if (existingWindow != null) {
        if (!windowOptions.outOfProcessOverlay) {
            focusWindow(existingWindow);
        }
        return { action: 'deny' };
    }
    if (windowOptions.outOfProcessOverlay) {
        const rect = {
            x: 0,
            y: 0,
            width: 1280,
            height: 720,
        };
        for (const { bounds } of electron_1.screen.getAllDisplays()) {
            rect.x = Math.min(bounds.x, rect.x);
            rect.y = Math.min(bounds.y, rect.y);
        }
        windowOptions.x = rect.x - rect.width;
        windowOptions.y = rect.y - rect.height;
        windowOptions.width = rect.width;
        windowOptions.height = rect.height;
        windowOptions.resizable = true;
        windowOptions.title = 'Discord Overlay';
        windowOptions.show = false;
        windowOptions.backgroundColor = '#00000000';
        windowOptions.type = 'toolbar';
        windowOptions.alwaysOnTop = true;
        windowOptions.skipTaskbar = true;
        windowOptions.webPreferences = windowOptions.webPreferences ?? {};
        windowOptions.webPreferences.preload = path_1.default.join(__dirname, 'mainScreenPreload.js');
        windowOptions.frame = false;
        windowOptions.transparent = true;
        windowOptions.webPreferences.backgroundThrottling = false;
        windowOptions.paintWhenInitiallyHidden = true;
    }
    return { action: 'allow', overrideBrowserWindowOptions: windowOptions };
}
function setupPopout(popoutWindow, key, options, webappEndpoint) {
    if (options.outOfProcessOverlay) {
        popoutWindow.on('will-resize', (event, _newBounds, _details) => {
            event.preventDefault();
        });
    }
    popoutWindows[popoutWindow.windowKey] = popoutWindow;
    popoutWindow.webContents.on('will-navigate', (evt, url) => {
        if (!(0, securityUtils_1.checkUrlOriginMatches)(url, webappEndpoint)) {
            evt.preventDefault();
        }
    });
    popoutWindow.webContents.setWindowOpenHandler(({ url }) => {
        void (0, securityUtils_1.saferShellOpenExternal)(url);
        return { action: 'deny' };
    });
    popoutWindow.once('closed', () => {
        popoutWindow.removeAllListeners();
        delete popoutWindows[popoutWindow.windowKey];
    });
    newWindowEvent(popoutWindow);
}
function closePopouts() {
    Object.values(popoutWindows).forEach((popoutWindow) => popoutWindow.close());
    popoutWindows = {};
}


},
1702(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = init;
exports.getRequestCA = getRequestCA;
const fs_1 = __importDefault(__webpack_require__(9896));
const path_1 = __importDefault(__webpack_require__(6928));
let requestCA;
function init() {
    let rootCertificateAuthorities;
    try {
        rootCertificateAuthorities = fs_1.default.readFileSync(path_1.default.join(__dirname, 'data', 'cacert.pem'));
    }
    catch (err) {
        console.error('Unable to load root certificate authorities.');
        console.error(err);
    }
    requestCA = rootCertificateAuthorities ? { ca: rootCertificateAuthorities } : {};
}
function getRequestCA() {
    return requestCA;
}


},
1660(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._STAFF_DEV_TOOLS_KEY = void 0;
exports.tryLoadStaffDevToolsModule = tryLoadStaffDevToolsModule;
const electron_1 = __webpack_require__(1288);
const fs_1 = __importDefault(__webpack_require__(9896));
const path_1 = __importDefault(__webpack_require__(6928));
const url_1 = __importDefault(__webpack_require__(7016));
const buildInfo_1 = __webpack_require__(6774);
const crashReporterSetup_1 = __webpack_require__(623);
const paths_1 = __webpack_require__(1410);
const buildInfo = buildInfo_1.buildInfo;
const LOG_PREFIX = '[STAFF_DEV_TOOLS]';
function log(message) {
    console.log(`${LOG_PREFIX} ${message}`);
}
function extractZip(zipBuffer, destDir) {
    const yauzl = __webpack_require__(505);
    const resolvedDest = path_1.default.resolve(destDir);
    return new Promise((resolve, reject) => {
        yauzl.fromBuffer(zipBuffer, { lazyEntries: true }, (err, zipfile) => {
            if (err != null) {
                reject(err);
                return;
            }
            zipfile.on('entry', (entry) => {
                const filePath = path_1.default.resolve(destDir, entry.fileName);
                if (!filePath.startsWith(resolvedDest + path_1.default.sep) && filePath !== resolvedDest) {
                    reject(new Error(`Zip entry escapes destination: ${entry.fileName}`));
                    zipfile.close();
                    return;
                }
                if (/\/$/.test(entry.fileName)) {
                    fs_1.default.mkdirSync(filePath, { recursive: true });
                    zipfile.readEntry();
                    return;
                }
                fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
                zipfile.openReadStream(entry, (streamErr, stream) => {
                    if (streamErr != null) {
                        zipfile.close();
                        reject(streamErr);
                        return;
                    }
                    const writeStream = fs_1.default.createWriteStream(filePath);
                    stream.on('error', (e) => {
                        zipfile.close();
                        reject(e);
                    });
                    writeStream.on('error', (e) => {
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
exports._STAFF_DEV_TOOLS_KEY = 'ENABLE_STAFF_DEV_TOOLS_BUNDLE';
const _STAFF_DEV_TOOLS_ACTIVE_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAIoaTnSgNjloxqzHKGBXIp0F7JX3AaZKZCocqMBpSi/A=
-----END PUBLIC KEY-----`;
const _STAFF_DEV_TOOLS_INACTIVE_PUBLIC_KEY = null;
function _verifyStaffDevToolsSignature(version, hash, signatureB64) {
    const crypto = __webpack_require__(6982);
    if (!/^\d+\.\d+\.\d+$/.test(version)) {
        throw new Error(`Invalid version format: ${version}`);
    }
    const payload = Buffer.from(`staff_dev_tools:v1:${version}:${hash.toLowerCase()}`);
    const signature = Buffer.from(signatureB64, 'base64');
    const verified = crypto.verify(null, payload, _STAFF_DEV_TOOLS_ACTIVE_PUBLIC_KEY, signature);
    if (verified) {
        return;
    }
    if (false) {}
    throw new Error('Module signature verification failed');
}
const ENCRYPTED_PREFIX = 'dQw4w9WgXcQ:';
async function _getTokenFromDisk(userDataPath) {
    const leveldbDir = path_1.default.join(userDataPath, 'Local Storage', 'leveldb');
    let entries;
    try {
        entries = await fs_1.default.promises.readdir(leveldbDir);
    }
    catch (_e) {
        log(`Token read failed: leveldb directory not found`);
        return null;
    }
    const files = entries.filter((f) => f.endsWith('.ldb') || f.endsWith('.log'));
    files.sort().reverse();
    for (const file of files) {
        try {
            const data = await fs_1.default.promises.readFile(path_1.default.join(leveldbDir, file));
            const str = data.toString('latin1');
            const encryptedMatches = [...str.matchAll(/"(dQw4w9WgXcQ:[A-Za-z0-9+/=]+)"/g)];
            if (encryptedMatches.length > 0) {
                const encryptedPart = encryptedMatches[encryptedMatches.length - 1][1].substring(ENCRYPTED_PREFIX.length);
                try {
                    return electron_1.safeStorage.decryptString(Buffer.from(encryptedPart, 'base64'));
                }
                catch (e) {
                    log(`Token decryption failed in ${file}: ${e instanceof Error ? e.message : e}`);
                }
            }
            const plaintextMatches = [...str.matchAll(/"([\w-]{24,}\.[\w-]{6,}\.[\w-]{27,})"/g)];
            if (plaintextMatches.length > 0) {
                return plaintextMatches[plaintextMatches.length - 1][1];
            }
        }
        catch (_e) {
        }
    }
    log(`Token not found in Local Storage`);
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
            log('Bridge reinstalled for new renderer context');
        }
        catch (e) {
            const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
            sentry?.captureException(e instanceof Error ? e : new Error(`${LOG_PREFIX} Bridge reinstall failed: ${e}`));
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
    }
    finally {
        _staffDevToolsLoading = null;
    }
}
function _tryLoadLocalDevModule() {
    if (buildInfo.localModulesRoot == null) {
        return false;
    }
    const localModulePath = path_1.default.join(buildInfo.localModulesRoot, '..', '..', 'native_modules', 'discord_staff_dev_tools');
    if (!fs_1.default.existsSync(path_1.default.join(localModulePath, 'package.json'))) {
        return false;
    }
    try {
        const discordStaffDevTools = require(localModulePath);
        discordStaffDevTools.init();
        discordStaffDevTools.installBridge();
        global.features.declareSupported('staff_dev_tools');
        _staffDevToolsModule = discordStaffDevTools;
        log('Module loaded from local native_modules (dev mode)');
        return true;
    }
    catch (e) {
        log(`Local module load failed: ${e instanceof Error ? e.message : e}`);
        return false;
    }
}
async function _tryLoadStaffDevToolsModuleImpl(mainWindow, webappEndpoint) {
    if (_tryLoadLocalDevModule()) {
        return;
    }
    const userDataPath = paths_1.paths.getUserData();
    if (userDataPath == null) {
        log('Aborted: userDataPath is null');
        return;
    }
    const token = await _getTokenFromDisk(userDataPath);
    if (token == null) {
        return;
    }
    const staffDevToolsBasePath = path_1.default.join(userDataPath, _STAFF_DEV_TOOLS_DIR);
    const versionFilePath = path_1.default.join(staffDevToolsBasePath, 'version.json');
    const fetchFromWorker = (urlPath, authToken, mode) => {
        const parsedUrl = new url_1.default.URL(urlPath, webappEndpoint);
        const isHttps = parsedUrl.protocol === 'https:';
        const httpModule = isHttps ? __webpack_require__(5692) : __webpack_require__(8611);
        return new Promise((resolve, reject) => {
            const req = httpModule.request({
                hostname: parsedUrl.hostname,
                port: parsedUrl.port !== '' ? parsedUrl.port : isHttps ? 443 : 80,
                path: parsedUrl.pathname + parsedUrl.search,
                method: 'GET',
                headers: { Authorization: authToken },
            }, (res) => {
                res.on('error', reject);
                if (mode === 'buffer') {
                    const chunks = [];
                    res.on('data', (chunk) => {
                        chunks.push(chunk);
                    });
                    res.on('end', () => {
                        if (res.statusCode !== 200) {
                            reject(new Error(`Worker ${parsedUrl.pathname}: HTTP ${res.statusCode}`));
                            return;
                        }
                        resolve(Buffer.concat(chunks));
                    });
                }
                else {
                    res.setEncoding('utf8');
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', () => {
                        if (res.statusCode !== 200) {
                            reject(new Error(`Worker ${parsedUrl.pathname}: HTTP ${res.statusCode}`));
                            return;
                        }
                        try {
                            resolve(JSON.parse(data));
                        }
                        catch (e) {
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
        log(`Remote version: ${remoteVersion.version} (${activeHash.substring(0, 12)}…)`);
        const versionedModulePath = path_1.default.join(staffDevToolsBasePath, `discord_staff_dev_tools_${activeHash}`);
        if (!fs_1.default.existsSync(path_1.default.join(versionedModulePath, 'package.json'))) {
            const zipBuffer = await fetchFromWorker(`/__development/staff_dev_tools/module?hash=${activeHash}`, token, 'buffer');
            const crypto = __webpack_require__(6982);
            const actualHash = crypto.createHash('sha256').update(zipBuffer).digest('hex');
            if (actualHash !== activeHash) {
                throw new Error(`Hash mismatch: expected ${activeHash}, got ${actualHash}`);
            }
            const tmpModulePath = versionedModulePath + '_tmp';
            try {
                fs_1.default.rmSync(tmpModulePath, { recursive: true, force: true });
                fs_1.default.mkdirSync(tmpModulePath, { recursive: true });
                await extractZip(zipBuffer, tmpModulePath);
                fs_1.default.renameSync(tmpModulePath, versionedModulePath);
            }
            catch (extractErr) {
                fs_1.default.rmSync(tmpModulePath, { recursive: true, force: true });
                throw extractErr;
            }
        }
        fs_1.default.writeFileSync(versionFilePath, JSON.stringify(remoteVersion));
        try {
            for (const entry of fs_1.default.readdirSync(staffDevToolsBasePath)) {
                if (entry.startsWith('discord_staff_dev_tools_') && entry !== `discord_staff_dev_tools_${activeHash}`) {
                    fs_1.default.rmSync(path_1.default.join(staffDevToolsBasePath, entry), { recursive: true, force: true });
                }
            }
        }
        catch (_e) {
        }
    }
    catch (e) {
        activeHash = null;
        log(`Remote update failed: ${e instanceof Error ? e.message : e}`);
        const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
        sentry?.captureMessage(`${LOG_PREFIX} Remote update failed: ${e instanceof Error ? e.message : e}`);
    }
    if (activeHash == null) {
        try {
            const cachedVersion = JSON.parse(fs_1.default.readFileSync(versionFilePath, 'utf-8'));
            activeHash = cachedVersion.hash ?? null;
            if (activeHash == null || typeof activeHash !== 'string' || !/^[a-f0-9]{64}$/.test(activeHash)) {
                log('Aborted: cached version has invalid hash');
                return;
            }
            _verifyStaffDevToolsSignature(cachedVersion.version, cachedVersion.hash, cachedVersion.signature);
            log(`Using cached version: ${cachedVersion.version} (${activeHash.substring(0, 12)}…)`);
        }
        catch (e) {
            log(`Aborted: no cached version available (${e instanceof Error ? e.message : e})`);
            return;
        }
    }
    const staffDevToolsModulePath = path_1.default.join(staffDevToolsBasePath, `discord_staff_dev_tools_${activeHash}`);
    if (!fs_1.default.existsSync(path_1.default.join(staffDevToolsModulePath, 'package.json'))) {
        log('Aborted: module package.json not found on disk');
        return;
    }
    try {
        const discordStaffDevTools = require(staffDevToolsModulePath);
        discordStaffDevTools.init();
        discordStaffDevTools.installBridge();
        global.features.declareSupported('staff_dev_tools');
        _staffDevToolsModule = discordStaffDevTools;
        log('Module loaded successfully');
    }
    catch (e) {
        log(`Module load failed: ${e instanceof Error ? e.message : e}`);
        const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
        sentry?.captureException(e instanceof Error ? e : new Error(`${LOG_PREFIX} Module load failed: ${e}`));
    }
}


},
2199(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasInit = void 0;
exports.init = init;
exports.show = show;
exports.displayHowToCloseHint = displayHowToCloseHint;
const electron_1 = __webpack_require__(1288);
const securityUtils_1 = __webpack_require__(7815);
const appSettings_1 = __webpack_require__(9076);
const ipcMain_1 = __importDefault(__webpack_require__(9139));
const utils_1 = __webpack_require__(8557);
const { APP_NAME } = __webpack_require__(2009);
const buildInfo = (__webpack_require__(6774)/* .buildInfo */.buildInfo);
const settings = appSettings_1.appSettings.getSettings();
const TrayIconNames = {
    DEFAULT: 'tray',
    UNREAD: 'tray-unread',
    CONNECTED: 'tray-connected',
    SPEAKING: 'tray-speaking',
    MUTED: 'tray-muted',
    DEAFENED: 'tray-deafened',
};
const MenuItems = {
    SECRET: 'SECRET',
    MUTE: 'MUTE',
    DEAFEN: 'DEAFEN',
    OPEN: 'OPEN',
    VOICE_SETTINGS: 'VOICE_SETTINGS',
    CHECK_UPDATE: 'CHECK_UPDATE',
    QUIT: 'QUIT',
    ACKNOWLEDGEMENTS: 'ACKNOWLEDGEMENTS',
};
const TrayGuidByChannel = {
    stable: '699e423d-73da-42ba-b94e-881ff8672467',
    ptb: '8bdf397e-37fc-440a-ac55-ec80cc585152',
    canary: 'd9c5e1da-d4ab-424f-97cf-00c2ce9bec67',
    development: '6603ea8b-b21d-46e9-8ea5-d87b9105613f',
};
exports.hasInit = false;
let currentIcon = null;
let options;
let menuItems;
let contextMenu;
let atomTray = null;
let trayIcons;
let applications = null;
function init(_options) {
    if (exports.hasInit) {
        console.warn('systemTray: Has already init! Cancelling init.');
        return;
    }
    trayIcons = {};
    generateTrayIconPaths();
    exports.hasInit = true;
    options = _options;
    currentIcon = trayIcons.DEFAULT;
    menuItems = {};
    applications = [];
    contextMenu = [];
    initializeMenuItems();
    buildContextMenu();
    ipcMain_1.default.on('SYSTEM_TRAY_SET_ICON', (evt, icon) => setTrayIcon(icon));
    ipcMain_1.default.on('SYSTEM_TRAY_SET_APPLICATIONS', (evt, newApplications) => setApplications(newApplications));
}
function generateTrayIconPaths() {
    const resourcePath = `app/images/systemtray/${process.platform}`;
    const suffix = process.platform === 'darwin' ? 'Template' : '';
    for (const key of Object.keys(TrayIconNames)) {
        trayIcons[key] = (0, utils_1.exposeModuleResource)(resourcePath, `${TrayIconNames[key]}${suffix}.png`);
    }
}
function initializeMenuItems() {
    const { onToggleMute, onToggleDeafen, onTrayClicked, onOpenVoiceSettings, onCheckForUpdates } = options;
    const voiceConnected = currentIcon !== trayIcons.DEFAULT && currentIcon !== trayIcons.UNREAD;
    menuItems[MenuItems.SECRET] = {
        label: `Discord`,
        icon: trayIcons.DEFAULT,
        enabled: false,
    };
    menuItems[MenuItems.MUTE] = {
        label: `Mute`,
        type: 'checkbox',
        checked: currentIcon === trayIcons.MUTED || currentIcon === trayIcons.DEAFENED,
        visible: voiceConnected,
        click: onToggleMute,
    };
    menuItems[MenuItems.DEAFEN] = {
        label: `Deafen`,
        type: 'checkbox',
        checked: currentIcon === trayIcons.DEAFENED,
        visible: voiceConnected,
        click: onToggleDeafen,
    };
    menuItems[MenuItems.OPEN] = {
        label: `Open ${APP_NAME}`,
        type: 'normal',
        visible: process.platform === 'linux',
        click: onTrayClicked,
    };
    menuItems[MenuItems.VOICE_SETTINGS] = {
        label: 'Voice / Video Settings',
        type: 'normal',
        visible: voiceConnected,
        click: onOpenVoiceSettings,
    };
    menuItems[MenuItems.CHECK_UPDATE] = {
        label: 'Check for Updates...',
        type: 'normal',
        visible: process.platform !== 'darwin',
        click: onCheckForUpdates,
    };
    menuItems[MenuItems.QUIT] = {
        label: `Quit ${APP_NAME}`,
        role: 'quit',
    };
    menuItems[MenuItems.ACKNOWLEDGEMENTS] = {
        label: 'Acknowledgements',
        type: 'normal',
        visible: process.platform !== 'darwin',
        click: () => (0, securityUtils_1.saferShellOpenExternal)('https://discord.com/acknowledgements'),
    };
}
function buildContextMenu() {
    const separator = { type: 'separator' };
    const hasApplications = applications != null && applications.length > 0;
    contextMenu = [
        menuItems[MenuItems.SECRET],
        separator,
        ...(hasApplications ? [...applications, separator] : []),
        menuItems[MenuItems.OPEN],
        menuItems[MenuItems.MUTE],
        menuItems[MenuItems.DEAFEN],
        menuItems[MenuItems.VOICE_SETTINGS],
        menuItems[MenuItems.CHECK_UPDATE],
        menuItems[MenuItems.ACKNOWLEDGEMENTS],
        separator,
        menuItems[MenuItems.QUIT],
    ];
}
function setTrayIcon(icon) {
    currentIcon = icon !== null ? trayIcons[icon] : null;
    if (icon == null) {
        hide();
        return;
    }
    else {
        show();
    }
    const muteIndex = contextMenu.indexOf(menuItems[MenuItems.MUTE]);
    const deafenIndex = contextMenu.indexOf(menuItems[MenuItems.DEAFEN]);
    const voiceConnected = contextMenu[muteIndex].visible;
    let shouldSetContextMenu = false;
    if (currentIcon !== trayIcons.DEFAULT && currentIcon !== trayIcons.UNREAD) {
        if (!voiceConnected) {
            contextMenu[muteIndex].visible = true;
            contextMenu[deafenIndex].visible = true;
            shouldSetContextMenu = true;
        }
        if (currentIcon === trayIcons.DEAFENED) {
            contextMenu[muteIndex].checked = true;
            contextMenu[deafenIndex].checked = true;
            shouldSetContextMenu = true;
        }
        else if (currentIcon === trayIcons.MUTED) {
            contextMenu[muteIndex].checked = true;
            contextMenu[deafenIndex].checked = false;
            shouldSetContextMenu = true;
        }
        else if (contextMenu[muteIndex].checked || contextMenu[deafenIndex].checked) {
            contextMenu[muteIndex].checked = false;
            contextMenu[deafenIndex].checked = false;
            shouldSetContextMenu = true;
        }
    }
    else if (voiceConnected) {
        contextMenu[muteIndex].visible = false;
        contextMenu[deafenIndex].visible = false;
        shouldSetContextMenu = true;
    }
    shouldSetContextMenu && setContextMenu();
    if (atomTray != null && currentIcon != null) {
        try {
            atomTray.setImage(currentIcon);
        }
        catch (e) {
            console.error('systemTray: Failed to set tray icon:', e);
        }
    }
}
function launchApplication(applicationId) {
    options.onLaunchApplication(applicationId);
}
function setApplications(newApplications) {
    applications = newApplications.map((application) => ({
        type: 'normal',
        label: application.name,
        click: () => launchApplication(application.id),
    }));
    buildContextMenu();
    setContextMenu();
}
function setContextMenu() {
    let menu = null;
    try {
        menu = electron_1.Menu.buildFromTemplate(contextMenu);
    }
    catch (_) {
    }
    if (atomTray != null) {
        atomTray.setContextMenu(menu);
    }
}
function show() {
    if (atomTray != null)
        return;
    if (currentIcon == null) {
        console.error('systemTray: Cannot create tray icon: currentIcon is null');
        return;
    }
    const guid = ['win32', 'darwin'].includes(process.platform) ? TrayGuidByChannel[buildInfo.releaseChannel] : undefined;
    try {
        atomTray = guid !== undefined ? new electron_1.Tray(currentIcon, guid) : new electron_1.Tray(currentIcon);
        atomTray.setToolTip(APP_NAME);
        setContextMenu();
        atomTray.on('click', options.onTrayClicked);
    }
    catch (e) {
        console.error('systemTray: Failed to create tray icon:', e);
    }
}
function hide() {
    if (atomTray == null) {
        return;
    }
    atomTray.destroy();
    atomTray = null;
}
function displayHowToCloseHint() {
    if (settings == null || atomTray == null) {
        return;
    }
    if (settings.get('trayBalloonShown') != null) {
        return;
    }
    const balloonMessage = 'Hi! Discord will run in the background to keep you in touch with your friends.'
        + ' You can right-click here to quit.';
    settings.set('trayBalloonShown', true);
    settings.save();
    atomTray.displayBalloon({
        title: 'Discord',
        content: balloonMessage,
    });
}


},
2862(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = init;
const electron_1 = __webpack_require__(1288);
const constants_1 = __webpack_require__(3672);
const ipcMain_1 = __importDefault(__webpack_require__(9139));
const mainScreen_1 = __webpack_require__(1559);
const utils_1 = __webpack_require__(8557);
let hasInit = false;
const ThumbarButtonName = {
    VIDEO: 'VIDEO',
    MUTE: 'MUTE',
    DEAFEN: 'DEAFEN',
    DISCONNECT: 'DISCONNECT',
};
function init() {
    if (hasInit)
        return;
    hasInit = true;
    ipcMain_1.default.on(constants_1.IPCEvents.THUMBAR_BUTTONS_UPDATE, (event, buttons, isSystemDarkMode) => {
        if (utils_1.isWindows) {
            setThumbarButtons(event, buttons, isSystemDarkMode);
        }
        else if (utils_1.isOSX) {
            setTouchbarButtons(event, buttons);
        }
        else {
            console.log(`thumbarButtons.init: Unknown operating system "${utils_1.platform}".`);
        }
    });
}
function getButtonIcon(name, active, isSystemDarkMode) {
    const root = ThumbarButtonName[name].toLowerCase();
    const postfix = active ? '' : '-off';
    const theme = isSystemDarkMode ? '' : '-light';
    return (0, utils_1.exposeModuleResource)(`app/images/thumbar/${utils_1.platform}`, `${root}${postfix}${theme}.png`);
}
function createButtons(event, buttons, isSystemDarkMode) {
    for (const button of buttons) {
        if (typeof button.name !== 'string') {
            console.error('setThumbarButtons: button.icon missing.');
            return [];
        }
        if (!(button.name in ThumbarButtonName)) {
            console.error(`setThumbarButtons: button.icon for unknown icon "${button.icon}.`);
            return [];
        }
        const buttonName = button.name;
        button.click = () => ipcMain_1.default.reply(event, 'THUMBAR_BUTTONS_CLICKED', { buttonName });
        button.icon = getButtonIcon(button.name, button.active ?? false, isSystemDarkMode);
    }
    return buttons;
}
function setTouchbarButtons(event, buttons) {
    buttons = createButtons(event, buttons, true);
    const touchbarButtons = buttons.map((button) => new electron_1.TouchBar.TouchBarButton({
        accessibilityLabel: button.tooltip,
        click: button.click,
        icon: button.icon,
        enabled: button.flags?.includes('disabled') ? false : true,
    }));
    const win = electron_1.BrowserWindow.fromId((0, mainScreen_1.getMainWindowId)());
    const touchbar = new electron_1.TouchBar({
        items: touchbarButtons.length === 0 ? [] : touchbarButtons,
    });
    win?.setTouchBar(touchbar);
}
function setThumbarButtons(event, buttons, isSystemDarkMode) {
    const thumbarButtons = createButtons(event, buttons, isSystemDarkMode);
    const win = electron_1.BrowserWindow.fromId((0, mainScreen_1.getMainWindowId)());
    if (!win?.setThumbarButtons(thumbarButtons)) {
        console.error('setThumbarButtons: setThumbarButtons failed', buttons);
    }
}


},
8557(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isLinux = exports.isOSX = exports.isWindows = exports.platform = void 0;
exports.exposeModuleResource = exposeModuleResource;
const electron_1 = __webpack_require__(1288);
const fs_1 = __importDefault(__webpack_require__(9896));
const os_1 = __importDefault(__webpack_require__(857));
const path_1 = __importDefault(__webpack_require__(6928));
const paths_1 = __webpack_require__(1410);
function exposeModuleResource(asarPath, fileName) {
    const userDataPath = paths_1.paths.getUserData();
    const appPath = path_1.default.resolve(__dirname, '..');
    const fullPathToAsarFile = path_1.default.join(appPath, asarPath, fileName);
    const buffer = fs_1.default.existsSync(fullPathToAsarFile) ? fs_1.default.readFileSync(fullPathToAsarFile) : null;
    const image = buffer != null ? electron_1.nativeImage.createFromBuffer(buffer) : null;
    if (path_1.default.extname(fileName) === '.ico') {
        if (userDataPath == null || buffer == null) {
            return null;
        }
        const nativeFilePath = path_1.default.join(userDataPath, fileName);
        fs_1.default.writeFileSync(nativeFilePath, buffer);
        return electron_1.nativeImage.createFromPath(nativeFilePath);
    }
    const baseName = path_1.default.basename(fileName, path_1.default.extname(fileName));
    if (userDataPath != null && fs_1.default.existsSync(path_1.default.join(userDataPath, fileName))) {
        fs_1.default.unlinkSync(path_1.default.join(userDataPath, fileName));
    }
    const scaleFactor = electron_1.screen.getPrimaryDisplay().scaleFactor;
    if (/^win/.test(exports.platform)) {
        if (scaleFactor <= 1 && buffer != null) {
            return electron_1.nativeImage.createFromBuffer(buffer, { scaleFactor: 1 });
        }
    }
    const variants = ['@1.25x', '@1.33x', '@1.4x', '@1.5x', '@1.8x', '@2x', '@2.5x', '@3x', '@4x', '@5x'];
    for (const variant of variants) {
        const variantFileName = `${baseName}${variant}${path_1.default.extname(fileName)}`;
        const variantFullPath = path_1.default.join(appPath, asarPath, variantFileName);
        const variantScale = Number(variant.replace('@', '').replace('x', ''));
        if (fs_1.default.existsSync(variantFullPath)) {
            const variantBuffer = fs_1.default.readFileSync(variantFullPath);
            if (/^win/.test(exports.platform)) {
                if (variantScale >= scaleFactor || variant === variants[variants.length - 1]) {
                    return electron_1.nativeImage.createFromBuffer(variantBuffer, { scaleFactor: variantScale });
                }
            }
            else if (image != null) {
                image.addRepresentation({
                    scaleFactor: variantScale,
                    buffer: variantBuffer,
                });
            }
        }
    }
    if (image != null && baseName.endsWith('Template')) {
        image.setTemplateImage(true);
    }
    return image;
}
exports.platform = os_1.default.platform();
exports.isWindows = /^win/.test(exports.platform);
exports.isOSX = exports.platform === 'darwin';
exports.isLinux = exports.platform === 'linux';


},
7480(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class Backoff {
    min;
    max;
    jitter;
    _current;
    _timeoutId;
    _fails;
    constructor(min = 500, max = null, jitter = true) {
        this.min = min;
        this.max = max != null ? max : min * 10;
        this.jitter = jitter;
        this._current = min;
        this._timeoutId = null;
        this._fails = 0;
    }
    get fails() {
        return this._fails;
    }
    get current() {
        return this._current;
    }
    get pending() {
        return this._timeoutId != null;
    }
    succeed() {
        this.cancel();
        this._fails = 0;
        this._current = this.min;
    }
    fail(callback) {
        this._fails += 1;
        let delay = this._current * 2;
        if (this.jitter) {
            delay *= Math.random();
        }
        this._current = Math.min(this._current + delay, this.max);
        if (callback != null) {
            if (this._timeoutId != null) {
                throw new Error('callback already pending');
            }
            this._timeoutId = setTimeout(() => {
                try {
                    if (callback != null) {
                        callback();
                    }
                }
                finally {
                    this._timeoutId = null;
                }
            }, this._current);
        }
        return this._current;
    }
    cancel() {
        if (this._timeoutId != null) {
            clearTimeout(this._timeoutId);
            this._timeoutId = null;
        }
    }
}
exports["default"] = Backoff;


},
263(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class FeatureFlags {
    flags;
    constructor() {
        this.flags = new Set();
    }
    getSupported() {
        return Array.from(this.flags);
    }
    supports(feature) {
        return this.flags.has(feature);
    }
    declareSupported(feature) {
        if (this.supports(feature)) {
            console.error('Feature redeclared; is this a duplicate flag? ', feature);
            return;
        }
        this.flags.add(feature);
    }
}
exports["default"] = FeatureFlags;


},
682(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logFiles = exports.minidumpFiles = void 0;
exports.captureMinidumpFromCrashpadSync = captureMinidumpFromCrashpadSync;
exports.addMessage = addMessage;
exports.addSentryReport = addSentryReport;
exports.initializeRenderer = initializeRenderer;
exports.initialize = initialize;
const electron_1 = __importDefault(__webpack_require__(1288));
const fs_1 = __importDefault(__webpack_require__(9896));
const path_1 = __importDefault(__webpack_require__(6928));
const util_1 = __importDefault(__webpack_require__(9023));
const utils_1 = __webpack_require__(5109);
const MAX_FILE_COUNT = 10;
const MAX_LOG_SIZE = 200 * 1024;
let fileWriteCounter = 0;
let eventCounter = 0;
let logfile = undefined;
let initialized = false;
let storedModulepath = null;
const addMessageSequence = (0, utils_1.createLock)();
function captureMinidumpFromCrashpadSync() {
    if (storedModulepath == null || process.platform !== 'win32')
        return;
    try {
        const reportsDir = path_1.default.join(electron_1.default.app.getPath('crashDumps'), 'reports');
        let dirContents;
        try {
            dirContents = fs_1.default.readdirSync(reportsDir);
        }
        catch (e) {
            return;
        }
        const dmpFiles = dirContents
            .filter((f) => f.endsWith('.dmp'))
            .map((f) => {
            const fullPath = path_1.default.join(reportsDir, f);
            return { fullPath, mtime: fs_1.default.statSync(fullPath).mtimeMs };
        })
            .sort((a, b) => b.mtime - a.mtime);
        if (dmpFiles.length === 0)
            return;
        if (Date.now() - dmpFiles[0].mtime > 60_000)
            return;
        const crashlogsDir = path_1.default.join(storedModulepath, 'crashlogs');
        if (!fs_1.default.existsSync(crashlogsDir)) {
            fs_1.default.mkdirSync(crashlogsDir, { recursive: true });
        }
        const existingDmps = fs_1.default
            .readdirSync(crashlogsDir)
            .filter((f) => f.endsWith('.dmp'))
            .map((f) => ({ fullPath: path_1.default.join(crashlogsDir, f), mtime: fs_1.default.statSync(path_1.default.join(crashlogsDir, f)).mtimeMs }))
            .sort((a, b) => b.mtime - a.mtime);
        if (existingDmps.length > MAX_FILE_COUNT) {
            for (let i = MAX_FILE_COUNT; i < existingDmps.length; i++) {
                try {
                    fs_1.default.unlinkSync(existingDmps[i].fullPath);
                }
                catch { }
            }
        }
        const filenameStamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' }).replace(/[^\d\w]/g, '_');
        const dmpFilename = `${filenameStamp}-${fileWriteCounter++}-minidump.dmp`;
        const dmpPath = path_1.default.join(crashlogsDir, dmpFilename);
        fs_1.default.writeFileSync(dmpPath, fs_1.default.readFileSync(dmpFiles[0].fullPath));
        fs_1.default.writeFileSync(path_1.default.join(crashlogsDir, 'pending_minidump.txt'), dmpFilename);
        console.log(`blackbox: captured minidump ${dmpFilename} from Crashpad`);
    }
    catch (e) {
        console.error(`blackbox: captureMinidumpFromCrashpadSync error ${e?.message}`);
    }
}
class Files {
    name;
    extension;
    static directory = undefined;
    constructor(name, extension) {
        this.name = name;
        this.extension = extension;
    }
    static getBlackboxDirectory() {
        if (Files.directory === undefined) {
            try {
                Files.directory = Files.getBlackboxDirectoryCore();
            }
            catch (e) {
                console.error(`blackbox: getBlackboxDirectory error ${e?.message}`);
                Files.directory = null;
            }
        }
        return Files.directory;
    }
    static getBlackboxDirectoryCore() {
        if (storedModulepath == null) {
            console.error(`blackbox: Unable to get module path`);
            return null;
        }
        const crashlogsPath = path_1.default.join(storedModulepath, 'crashlogs');
        if (!fs_1.default.existsSync(crashlogsPath)) {
            fs_1.default.mkdirSync(crashlogsPath, { recursive: true });
        }
        if (!fs_1.default.existsSync(crashlogsPath)) {
            console.error(`blackbox: Unable to create crashlogs directory`);
            return null;
        }
        return crashlogsPath;
    }
    static orderFilesNewestFirst(files) {
        return files
            .map((file) => ({
            file,
            time: fs_1.default.statSync(file).mtime.getTime(),
        }))
            .sort((a, b) => b.time - a.time)
            .map((file) => file.file);
    }
    async getFiles() {
        const blackboxDirectory = Files.getBlackboxDirectory();
        if (blackboxDirectory == null)
            return [];
        try {
            const dircontents = await fs_1.default.promises.readdir(blackboxDirectory);
            const existing = dircontents.filter((f) => f.endsWith('.' + this.extension));
            return Files.orderFilesNewestFirst(existing.map((file) => path_1.default.join(blackboxDirectory, file)));
        }
        catch (e) {
            console.error(`blackbox: getFiles error ${e?.message}`);
            return [];
        }
    }
    async getNewFilename() {
        const blackboxDirectory = Files.getBlackboxDirectory();
        if (blackboxDirectory == null)
            return null;
        const existing = await this.getFiles();
        if (existing.length > MAX_FILE_COUNT) {
            for (let i = MAX_FILE_COUNT; i < existing.length; i++) {
                const file = existing[i];
                try {
                    console.log(`blackbox: Deleting ${file}`);
                    await fs_1.default.promises.unlink(file);
                }
                catch (e) {
                    console.error(`blackbox: unlink error ${file}, ${e?.message}`);
                }
            }
        }
        const now = new Date();
        const filenameStamp = now.toLocaleString('en-US', { timeZoneName: 'short' }).replace(/[^\d\w]/g, '_');
        const filename = `${filenameStamp}-${fileWriteCounter++}-${this.name}.${this.extension}`;
        return path_1.default.join(blackboxDirectory, filename);
    }
    async getNewestFile() {
        return (await this.getFiles())[0] ?? null;
    }
}
exports.minidumpFiles = new Files('minidump', 'dmp');
exports.logFiles = new Files('events', 'log');
async function openLog(forcenew) {
    if (forcenew || logfile === undefined) {
        if (logfile != null) {
            try {
                await logfile.close();
            }
            catch (e) {
                console.error(`blackbox: openLog close error ${e?.message}`);
            }
        }
        const logpath = forcenew
            ? await exports.logFiles.getNewFilename()
            : ((await exports.logFiles.getNewestFile()) ?? (await exports.logFiles.getNewFilename()));
        if (logpath == null) {
            logfile = null;
            return null;
        }
        logfile = await fs_1.default.promises.open(logpath, 'a');
    }
    return logfile;
}
async function addMessage(message) {
    await addMessageSequence(async () => {
        try {
            const log = await openLog(false);
            if (log == null)
                return;
            const now = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
            console.log(`blackbox: ${now} ${eventCounter} ${message}`);
            await log.write(`${now} ${eventCounter}: ${message}\n`);
            ++eventCounter;
            await log.sync();
            if ((await log.stat()).size >= MAX_LOG_SIZE) {
                await openLog(true);
            }
        }
        catch (e) {
            console.error(`blackbox: addMessage error ${e?.message}`);
        }
    });
}
async function addSentryReport(event) {
    try {
        await addMessage(`Sentry report: ${JSON.stringify(event)}`);
    }
    catch (e) {
        console.error(`blackbox: addSentryReport error ${e?.message}`);
    }
}
function initializeRenderer(modulepath) {
    storedModulepath = modulepath;
}
async function initialize(modulepath, buildInfo) {
    try {
        await initializeCore(modulepath, buildInfo);
    }
    catch (e) {
        console.error(`blackbox: initialize error ${e?.message}`);
    }
}
async function initializeCore(modulepath, buildInfo) {
    if (initialized) {
        console.error('blackbox: Ignoring double initialization of blackbox.');
        return;
    }
    initializeRenderer(modulepath);
    await addMessage(`\n\n----------------------------------------------`);
    await addMessage(`Discord starting: ${JSON.stringify(buildInfo)}, modulepath: ${modulepath}`);
    function attachWebContentsEvents(webContents) {
        let id = 'unknown';
        let title = '';
        try {
            id = `web${webContents.id}`;
            title = webContents.getTitle() ?? '';
        }
        catch (e) {
            console.error(`blackbox: attachWebContentsEvents id error ${e?.message}`);
        }
        void addMessage(`✅ webContents.created ${id} "${title}"`);
        webContents.on('did-finish-load', () => addMessage(`✅ webContents.did-finish-load ${id}`));
        webContents.on('preload-error', (_, _input, error) => addMessage(`❌ webContents.preload-error ${id}: ${error?.message}`));
        webContents.on('destroyed', () => addMessage(`webContents.destroyed ${id}`));
        webContents.on('unresponsive', () => addMessage(`❌ webContents.nresponsive ${id}`));
        webContents.on('plugin-crashed', (_, name, version) => addMessage(`❌ webContents.plugin-crashed ${id}: ${name} ${version}`));
        webContents.on('did-fail-load', (_, code, desc) => addMessage(`❌ webContents.did-fail-load ${id}" ${code} ${desc}`));
        webContents.on('did-fail-provisional-load', (_, code, desc) => addMessage(`❌ webContents.did-fail-provisional-load ${id}: ${code} ${desc}`));
    }
    electron_1.default.app.on('web-contents-created', (_, webContents) => attachWebContentsEvents(webContents));
    for (const webContents of electron_1.default.webContents.getAllWebContents()) {
        attachWebContentsEvents(webContents);
    }
    function attachWindowEvents(window) {
        let id = 'unknown';
        let title = '';
        try {
            id = `win${window.id}`;
            title = window.title ?? '';
        }
        catch (e) {
            console.error(`blackbox: attachWindowEvents id error ${e?.message}`);
        }
        void addMessage(`✅ window.created ${id} "${title}"`);
        window.on('close', () => addMessage(`window.close ${id}`));
        window.on('closed', () => addMessage(`window.closed ${id}`));
    }
    electron_1.default.app.on('browser-window-created', (_, window) => attachWindowEvents(window));
    for (const window of electron_1.default.BrowserWindow.getAllWindows()) {
        attachWindowEvents(window);
    }
    electron_1.default.app.on('child-process-gone', (_, details) => addMessage(`❌ child-process-gone ${util_1.default.inspect(details)}`));
    electron_1.default.app.on('render-process-gone', (_, __, details) => {
        void addMessage(`❌ render-process-gone ${util_1.default.inspect(details)}`);
        captureMinidumpFromCrashpadSync();
    });
    electron_1.default.app.on('before-quit', () => addMessage(`before-quit`));
    electron_1.default.app.on('will-quit', () => addMessage(`will-quit`));
    electron_1.default.app.on('quit', (_, exitCode) => addMessage(`quit ${exitCode}`));
    initialized = true;
}


},
7233(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DISCORD_CLIP_PROTOCOL = void 0;
exports.DISCORD_CLIP_PROTOCOL = 'disclip';


},
1453(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.metadata = void 0;
exports.init = init;
exports.isInitialized = isInitialized;
exports.getGlobalSentry = getGlobalSentry;
const fs_1 = __importDefault(__webpack_require__(9896));
let gSentry = null;
let initialized = false;
exports.metadata = {};
const SENTRY_PROJECT_ID = '146342';
const SENTRY_PROJECT_HOST = 'o64374';
const STABLE_SENTRY_DSN_KEY = '7a60c374cb0e99ac8a57388db6933711';
const DEFAULT_SENTRY_DSN_KEY = '384ce4413de74fe0be270abe03b2b35a';
const STAFF_SENTRY_DSN_KEY = 'de156ff7a3f544cca369e77e3f1f5743';
const TEST_SENTRY_DSN_KEY = '1a27a96457b24ff286a000266c573919';
const LINUX_SENTRY_DSN_KEY = 'd2558f321dfc7ab68366d8258fd256c7';
const MACOS_SENTRY_DSN_KEY = '098008bd74508d75b72f31244ddb1d04';
const DEFAULT_SENTRY_DSN = buildSentryDSN(DEFAULT_SENTRY_DSN_KEY);
const CHANNEL_SENTRY_DSN = {
    stable: buildSentryDSN(STABLE_SENTRY_DSN_KEY),
    ptb: buildSentryDSN(TEST_SENTRY_DSN_KEY),
    canary: buildSentryDSN(TEST_SENTRY_DSN_KEY),
    development: buildSentryDSN(TEST_SENTRY_DSN_KEY),
};
const CHANNEL_SENTRY_SAMPLE = {
    stable: 0.01,
    ptb: 1,
    canary: 1,
    development: 1,
};
const LINUX_SENTRY_SAMPLE = 1;
const MACOS_SENTRY_SAMPLE = 1;
let defaultDsn = DEFAULT_SENTRY_DSN;
function dsnFromUser({ getEvent }) {
    const event = getEvent();
    if (event?.tags?.isStaff === 'true') {
        return [buildSentryDSN(STAFF_SENTRY_DSN_KEY)];
    }
    else {
        return [defaultDsn];
    }
}
function initializeSentrySdk(config, buildInfo) {
    defaultDsn = getSentryDSN(buildInfo.releaseChannel);
    config.sentry.init({
        dsn: getSentryDSN(buildInfo.releaseChannel),
        transport: config.getTransport(dsnFromUser),
        environment: buildInfo.releaseChannel,
        release: buildInfo.version,
        sampleRate: getSampleRate(buildInfo.releaseChannel),
        integrations: (defaults) => defaults.filter((i) => i.name !== 'MainProcessSession'),
        maxValueLength: 250,
        beforeSend(event, _hint) {
            event.extra = exports.metadata;
            const blackbox = __webpack_require__(682);
            void blackbox.addSentryReport(event);
            return event;
        },
        ignoreErrors: [
            'EADDRINUSE',
            'ResizeObserver loop limit exceeded',
            'ResizeObserver loop completed with undelivered notifications.',
            'EACCES: permission denied',
            'BetterDiscord',
            'VencordPatcher',
            'mwittrien.github.io',
            'Error: getaddrinfo ENOTFOUND raw.githubusercontent.com',
        ],
        denyUrls: [/betterdiscord:\/\//],
    });
    gSentry = config.sentry;
}
function init(buildInfo, sentry) {
    if (initialized) {
        console.warn('Ignoring double initialization of crash reporter.');
        return;
    }
    if (process.env.ELECTRON_ENABLE_STACK_DUMPING === 'true') {
        console.warn('Not initializing crash reporter because ELECTRON_ENABLE_STACK_DUMPING is set.');
        return;
    }
    if (sentry != null) {
        initializeSentrySdk(sentry, buildInfo);
    }
    exports.metadata.release_channel = buildInfo.releaseChannel;
    const sentryMetadata = exports.metadata.sentry != null ? exports.metadata.sentry : {};
    sentryMetadata['environment'] = buildInfo.releaseChannel;
    sentryMetadata['release'] = buildInfo.version;
    exports.metadata.sentry = sentryMetadata;
    const processUtils = __webpack_require__(5888);
    if (processUtils.IS_LINUX) {
        const xdgCurrentDesktop = process.env.XDG_CURRENT_DESKTOP ?? 'unknown';
        const gdmSession = process.env.GDMSESSION ?? 'unknown';
        exports.metadata.wm = `${xdgCurrentDesktop},${gdmSession}`;
        let runtimeEnvironment = 'native';
        if (process.env.FLATPAK_ID != null) {
            runtimeEnvironment = 'flatpak';
        }
        else if (process.env.SNAP != null || process.env.SNAP_NAME != null) {
            runtimeEnvironment = 'snap';
        }
        else if (process.env.APPIMAGE != null || process.env.APPDIR != null) {
            runtimeEnvironment = 'appimage';
        }
        exports.metadata.runtime_environment = runtimeEnvironment;
        let displayServer = 'unknown';
        if (process.env.XDG_SESSION_TYPE != null) {
            displayServer = process.env.XDG_SESSION_TYPE;
        }
        exports.metadata.display_server = displayServer;
        try {
            const childProcess = __webpack_require__(1421);
            exports.metadata.distro = childProcess
                .execFileSync('lsb_release', ['-ds'], { timeout: 100, maxBuffer: 512, encoding: 'utf-8' })
                .trim();
        }
        catch (_) {
            try {
                const osRelease = fs_1.default.readFileSync('/etc/os-release', 'utf-8');
                const prettyNameMatch = osRelease.match(/^PRETTY_NAME="?([^"\n]+)"?$/m);
                if (prettyNameMatch != null) {
                    exports.metadata.distro = prettyNameMatch[1];
                }
            }
            catch (_) { }
        }
    }
    initialized = true;
}
function buildSentryDSN(dsnKey) {
    return 'https://' + dsnKey + '@' + SENTRY_PROJECT_HOST + '.ingest.sentry.io/' + SENTRY_PROJECT_ID;
}
function getSentryDSN(releaseChannel) {
    const processUtils = __webpack_require__(5888);
    if (processUtils.IS_LINUX) {
        return buildSentryDSN(LINUX_SENTRY_DSN_KEY);
    }
    else if (processUtils.IS_OSX) {
        return buildSentryDSN(MACOS_SENTRY_DSN_KEY);
    }
    else {
        if (releaseChannel != null && CHANNEL_SENTRY_DSN[releaseChannel] != null) {
            return CHANNEL_SENTRY_DSN[releaseChannel];
        }
    }
    return DEFAULT_SENTRY_DSN;
}
function getSampleRate(releaseChannel) {
    const processUtils = __webpack_require__(5888);
    if (processUtils.IS_LINUX) {
        return LINUX_SENTRY_SAMPLE;
    }
    else if (processUtils.IS_OSX) {
        return MACOS_SENTRY_SAMPLE;
    }
    else {
        if (releaseChannel != null && CHANNEL_SENTRY_SAMPLE[releaseChannel] != null) {
            return CHANNEL_SENTRY_SAMPLE[releaseChannel];
        }
    }
    return 0.01;
}
function isInitialized() {
    return initialized;
}
function getGlobalSentry() {
    return gSentry;
}


},
4069(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.flatten = flatten;
exports.reconcileCrashReporterMetadata = reconcileCrashReporterMetadata;
function flatten(metadata, prefix = null, root = null) {
    root = root !== null ? root : {};
    prefix = prefix !== null ? prefix : '';
    if (typeof metadata === 'object') {
        for (const key in metadata) {
            const nextPrefix = prefix === '' ? key : `${prefix}[${key}]`;
            flatten(metadata[key], nextPrefix, root);
        }
    }
    else {
        root[prefix] = String(metadata);
    }
    return root;
}
function reconcileCrashReporterMetadata(crashReporter, metadata) {
    const newMetadata = flatten(metadata);
    const oldMetadata = crashReporter.getParameters();
    for (const key in oldMetadata) {
        if (!newMetadata.hasOwnProperty(key)) {
            crashReporter.removeExtraParameter(key);
        }
    }
    for (const key in newMetadata) {
        if (!oldMetadata.hasOwnProperty(key)) {
            crashReporter.addExtraParameter(key, String(newMetadata[key]));
        }
    }
}


},
8329(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGlobalPaths = getGlobalPaths;
exports.addGlobalPath = addGlobalPath;
exports.globalPathExists = globalPathExists;
const module_1 = __importDefault(__webpack_require__(3339));
const resolveLookupPaths = module_1.default._resolveLookupPaths;
module_1.default._resolveLookupPaths = (request, parent) => {
    const length = parent?.paths?.length;
    if (length != null && length !== 0) {
        parent.paths = parent.paths.concat(module_1.default.globalPaths);
    }
    else {
        parent.paths = module_1.default.globalPaths;
    }
    return resolveLookupPaths(request, parent);
};
function getGlobalPaths() {
    return module_1.default.globalPaths;
}
function addGlobalPath(path) {
    if (module_1.default.globalPaths.indexOf(path) === -1) {
        module_1.default.globalPaths.push(path);
    }
}
function globalPathExists(path) {
    return module_1.default.globalPaths.indexOf(path) !== -1;
}


},
5888(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IS_LINUX = exports.IS_OSX = exports.IS_WIN = void 0;
const process_1 = __importDefault(__webpack_require__(932));
exports.IS_WIN = process_1.default.platform === 'win32';
exports.IS_OSX = process_1.default.platform === 'darwin';
exports.IS_LINUX = process_1.default.platform === 'linux';


},
7815(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shouldOpenExternalUrl = shouldOpenExternalUrl;
exports.saferShellOpenExternal = saferShellOpenExternal;
exports.checkUrlOriginMatches = checkUrlOriginMatches;
const electron_1 = __webpack_require__(1288);
const url_1 = __importDefault(__webpack_require__(7016));
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
5109(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNotNullish = isNotNullish;
exports.createLock = createLock;
function isNotNullish(value) {
    return value != null;
}
function createLock() {
    let p = Promise.resolve(null);
    return (criticalSection) => new Promise((resolve, reject) => {
        p = p.then(criticalSection).then(resolve, reject);
    });
}


},
5385(module) {
"use strict";
module.exports = require("discord_notifications");

},
4928(module) {
"use strict";
module.exports = require("discord_utils");

},
1288(module) {
"use strict";
module.exports = require("electron");

},
215(module) {
"use strict";
module.exports = require("original-fs");

},
2613(module) {
"use strict";
module.exports = require("assert");

},
181(module) {
"use strict";
module.exports = require("buffer");

},
5317(module) {
"use strict";
module.exports = require("child_process");

},
6982(module) {
"use strict";
module.exports = require("crypto");

},
4434(module) {
"use strict";
module.exports = require("events");

},
9896(module) {
"use strict";
module.exports = require("fs");

},
8611(module) {
"use strict";
module.exports = require("http");

},
5692(module) {
"use strict";
module.exports = require("https");

},
3339(module) {
"use strict";
module.exports = require("module");

},
1421(module) {
"use strict";
module.exports = require("node:child_process");

},
3024(module) {
"use strict";
module.exports = require("node:fs");

},
1455(module) {
"use strict";
module.exports = require("node:fs/promises");

},
7075(module) {
"use strict";
module.exports = require("node:stream");

},
857(module) {
"use strict";
module.exports = require("os");

},
6928(module) {
"use strict";
module.exports = require("path");

},
932(module) {
"use strict";
module.exports = require("process");

},
2203(module) {
"use strict";
module.exports = require("stream");

},
7016(module) {
"use strict";
module.exports = require("url");

},
9023(module) {
"use strict";
module.exports = require("util");

},
3106(module) {
"use strict";
module.exports = require("zlib");

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
id: moduleId,
loaded: false,
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);

// Flag the module as loaded
module.loaded = true;
// Return the exports of the module
return module.exports;

}

// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/node_module_decorator
(() => {
__webpack_require__.nmd = (module) => {
  module.paths = [];
  if (!module.children) module.children = [];
  return module;
};
})();
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startup = startup;
exports.handleOpenUrl = handleOpenUrl;
exports.setMainWindowVisible = setMainWindowVisible;
const electron_1 = __webpack_require__(1288);
let mainScreen;
function startup(bootstrapModules) {
    performance.mark('coremodule-index-startup');
    if (typeof global.__removeEarlyIpcHandlers === 'function') {
        performance.mark('coremodule-remove-early-ipc');
        global.__removeEarlyIpcHandlers();
        global.__removeEarlyIpcHandlers = undefined;
        performance.measure('coremodule-remove-early-ipc-duration', 'coremodule-remove-early-ipc');
    }
    performance.mark('coremodule-bootstrap-modules');
    (__webpack_require__(7475)/* .init */.init)(bootstrapModules);
    __webpack_require__(1410);
    __webpack_require__(4139);
    const { moduleUpdater } = __webpack_require__(8919);
    const { updater } = __webpack_require__(923);
    __webpack_require__(3671);
    const { buildInfo } = __webpack_require__(6774);
    const { appSettings } = __webpack_require__(9076);
    performance.measure('coremodule-bootstrap-modules-duration', 'coremodule-bootstrap-modules');
    performance.mark('coremodule-constants-features');
    const Constants = __webpack_require__(2009);
    Constants.init(bootstrapModules.Constants);
    const appFeatures = __webpack_require__(5444);
    appFeatures.init();
    const GPUSettings = __webpack_require__(123);
    bootstrapModules.GPUSettings.replace(GPUSettings);
    performance.measure('coremodule-constants-features-duration', 'coremodule-constants-features');
    performance.mark('coremodule-root-certs');
    const rootCertificates = __webpack_require__(1702);
    rootCertificates.init();
    performance.measure('coremodule-root-certs-duration', 'coremodule-root-certs');
    performance.mark('coremodule-native-handlers-critical');
    const { crashReporterSetup } = __webpack_require__(623);
    if (!crashReporterSetup.isInitialized()) {
        crashReporterSetup.init(buildInfo);
    }
    const app = __webpack_require__(8883);
    app.injectBuildInfo(buildInfo);
    app.injectModuleUpdater(moduleUpdater);
    app.injectUpdater(updater);
    __webpack_require__(2582);
    const features = __webpack_require__(4077);
    features.injectFeaturesBackend(appFeatures.getFeatures());
    const gpuSettings = __webpack_require__(2175);
    gpuSettings.injectGpuSettingsBackend(GPUSettings);
    const nativeModules = __webpack_require__(5596);
    nativeModules.injectModuleUpdater(moduleUpdater);
    nativeModules.injectUpdater(updater);
    __webpack_require__(2020);
    const settings = __webpack_require__(8823);
    const appSettingsInject = appSettings.getSettings();
    if (appSettingsInject != null) {
        settings.injectSettingsBackend(appSettingsInject);
    }
    const windowNative = __webpack_require__(3934);
    performance.measure('coremodule-native-handlers-critical-duration', 'coremodule-native-handlers-critical');
    global.crashReporterMetadata = crashReporterSetup.metadata;
    global.mainAppDirname = Constants.MAIN_APP_DIRNAME;
    global.features = appFeatures.getFeatures();
    global.appSettings = appSettingsInject;
    global.mainWindowId = Constants.DEFAULT_MAIN_WINDOW_ID;
    global.moduleUpdater = moduleUpdater;
    const earlyWindow = global.__earlyMainWindow;
    if (earlyWindow != null && !earlyWindow.isDestroyed()) {
        performance.mark('coremodule-native-modules-ready-signal');
        console.log(`[coreModule] Sending NATIVE_MODULES_READY to early window (id=${earlyWindow.id})`);
        earlyWindow.webContents.send('DISCORD_NATIVE_MODULES_READY');
    }
    else if (earlyWindow != null) {
        console.warn('[coreModule] Early window was destroyed before NATIVE_MODULES_READY could be sent');
    }
    performance.mark('coremodule-app-menu');
    const enableDevtoolsSetting = global.appSettings.get('DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING', false);
    const enableDevtools = buildInfo.releaseChannel === 'stable' ? enableDevtoolsSetting : true;
    const createApplicationMenu = __webpack_require__(7034);
    electron_1.Menu.setApplicationMenu(createApplicationMenu(enableDevtools));
    performance.measure('coremodule-app-menu-duration', 'coremodule-app-menu');
    if (process.platform === 'darwin'
        && (buildInfo.releaseChannel === 'development' || buildInfo.releaseChannel === 'canary')) {
        electron_1.systemPreferences.setUserDefault('SquirrelMacEnableDirectContentsWrite', 'boolean', true);
    }
    performance.mark('coremodule-mainscreen-init');
    mainScreen = __webpack_require__(1559);
    mainScreen.init();
    performance.measure('coremodule-mainscreen-init-duration', 'coremodule-mainscreen-init');
    setImmediate(() => {
        performance.mark('coremodule-native-handlers-deferred');
        __webpack_require__(356);
        __webpack_require__(6290);
        __webpack_require__(3597);
        __webpack_require__(2504);
        __webpack_require__(5293);
        __webpack_require__(962);
        const { setupClipsProtocol } = __webpack_require__(6351);
        setupClipsProtocol();
        __webpack_require__(1831);
        __webpack_require__(2815);
        __webpack_require__(1540);
        __webpack_require__(5343);
        __webpack_require__(9096);
        __webpack_require__(9410);
        __webpack_require__(1432);
        __webpack_require__(8348);
        performance.measure('coremodule-native-handlers-deferred-duration', 'coremodule-native-handlers-deferred');
    });
    const { getWindow: getPopoutWindowByKey, getAllWindows: getAllPopoutWindows, setNewWindowEvent, } = __webpack_require__(2782);
    windowNative.injectGetWindow((key) => {
        if (key == null) {
            return electron_1.BrowserWindow.fromId(mainScreen.getMainWindowId());
        }
        return getPopoutWindowByKey(key);
    }, () => [...getAllPopoutWindows(), electron_1.BrowserWindow.fromId(mainScreen.getMainWindowId())]);
    setNewWindowEvent((window) => windowNative.newWindowEvent(window));
    performance.measure('coremodule-index-startup-duration', 'coremodule-index-startup');
}
function handleOpenUrl(url) {
    if (mainScreen == null) {
        return;
    }
    mainScreen.handleOpenUrl(url);
}
function setMainWindowVisible(visible) {
    mainScreen.setMainWindowVisible(visible);
}

})();

module.exports = __webpack_exports__;
})()
;