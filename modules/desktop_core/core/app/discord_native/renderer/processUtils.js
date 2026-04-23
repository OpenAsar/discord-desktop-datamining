"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flushDNSCache = flushDNSCache;
exports.getLastCrash = getLastCrash;
exports.flushCookies = flushCookies;
exports.getSystemInfo = getSystemInfo;
exports.flushStorageData = flushStorageData;
exports.purgeMemory = purgeMemory;
exports.getProcessUptime = getProcessUptime;
exports.getCurrentCPUUsagePercent = getCurrentCPUUsagePercent;
exports.getCumulativeCPUUsage = getCumulativeCPUUsage;
exports.getCPUCoreCount = getCPUCoreCount;
exports.getMainArgvSync = getMainArgvSync;
exports.getUsedHeapSize = getUsedHeapSize;
exports.getHeapStats = getHeapStats;
exports.getBlinkMemoryInfo = getBlinkMemoryInfo;
exports.getPartitionAllocatorStats = getPartitionAllocatorStats;
exports.enablePAMemoryProfiler = enablePAMemoryProfiler;
exports.disablePAMemoryProfiler = disablePAMemoryProfiler;
exports.getPerfAttributedPAMemory = getPerfAttributedPAMemory;
exports.getPerfAttributedPAMemoryCallstacks = getPerfAttributedPAMemoryCallstacks;
exports.enableProfilingV8Heap = enableProfilingV8Heap;
exports.disableProfilingV8Heap = disableProfilingV8Heap;
exports.getProfilerV8MemoryCallstacks = getProfilerV8MemoryCallstacks;
exports.setCrashInformation = setCrashInformation;
exports.setMemoryInformation = setMemoryInformation;
exports.setCrashReason = setCrashReason;
exports.getGpuProcessId = getGpuProcessId;
exports.getSystemMetrics = getSystemMetrics;
const electron_1 = __importDefault(require("electron"));
const os_1 = __importDefault(require("os"));
const process_1 = __importDefault(require("process"));
const DiscordIPC_1 = require("../common/DiscordIPC");
const minidumpReader_1 = require("./minidumpReader");
const CPU_USAGE_GATHER_INTERVAL = 1000;
const mainArgv = DiscordIPC_1.DiscordIPC.renderer.sendSync(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_MAIN_ARGV_SYNC);
let totalProcessorUsagePercent = 0;
let cumulativeCpuUsage;
const cpuCoreCount = os_1.default.cpus().length;
setInterval(() => {
    void DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_CPU_USAGE).then((usage) => {
        ({ totalProcessorUsagePercent } = usage);
        if (usage.totalCumulativeUsage != null)
            cumulativeCpuUsage = usage.totalCumulativeUsage;
    });
}, CPU_USAGE_GATHER_INTERVAL);
function flushDNSCache() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_FLUSH_DNS_CACHE);
}
async function getLastCrash() {
    const lastCrash = await DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_LAST_CRASH);
    const minidumpInformation = lastCrash?.pendingMinidumpPath != null ? await (0, minidumpReader_1.getNewestMinidumpInformation)(lastCrash.pendingMinidumpPath) : null;
    return {
        date: lastCrash.date,
        id: lastCrash.id,
        rendererCrashReason: lastCrash.rendererCrashReason,
        rendererCrashExitCode: lastCrash.rendererCrashExitCode,
        minidumpInformation,
        storedInformation: lastCrash.storedInformation,
        lastMemoryInformation: lastCrash.lastMemoryInformation,
        highestMemoryInformation: lastCrash.highestMemoryInformation,
    };
}
async function flushCookies(callback) {
    try {
        await DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_FLUSH_COOKIES);
        callback();
    }
    catch (err) {
        callback(err);
    }
}
function getSystemInfo() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_SYSTEM_INFO);
}
async function flushStorageData(callback) {
    try {
        await DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_FLUSH_STORAGE_DATA);
        callback();
    }
    catch (err) {
        callback(err);
    }
}
function purgeMemory() {
    electron_1.default.webFrame.clearCache();
}
function getProcessUptime() {
    return process_1.default.uptime();
}
function getCurrentCPUUsagePercent() {
    return totalProcessorUsagePercent;
}
function getCumulativeCPUUsage() {
    return cumulativeCpuUsage;
}
function getCPUCoreCount() {
    return cpuCoreCount;
}
function getMainArgvSync() {
    return mainArgv;
}
function getUsedHeapSize() {
    const heapStats = process_1.default.getHeapStatistics();
    return heapStats.usedHeapSize;
}
function getHeapStats() {
    return process_1.default.getHeapStatistics();
}
function getBlinkMemoryInfo() {
    return process_1.default.getBlinkMemoryInfo();
}
function getPartitionAllocatorStats() {
    return electron_1.default?.discordMemoryProfiler?.getPartitionAllocatorStats?.();
}
function enablePAMemoryProfiler(config) {
    electron_1.default?.discordMemoryProfiler?.enableProfiling?.(config);
}
function disablePAMemoryProfiler() {
    electron_1.default?.discordMemoryProfiler?.disableProfiling?.();
}
function getPerfAttributedPAMemory() {
    return electron_1.default?.discordMemoryProfiler?.getTypeNameMemoryAllocated?.();
}
function getPerfAttributedPAMemoryCallstacks(options) {
    return electron_1.default?.discordMemoryProfiler?.getTypeNameMemoryCallstacks?.(options);
}
function enableProfilingV8Heap(options) {
    return electron_1.default?.discordMemoryProfiler?.enableProfilingV8Heap?.(options);
}
function disableProfilingV8Heap() {
    return electron_1.default?.discordMemoryProfiler?.disableProfilingV8Heap?.();
}
function getProfilerV8MemoryCallstacks() {
    return electron_1.default?.discordMemoryProfiler?.getProfilerV8MemoryCallstacks?.();
}
function setCrashInformation(crashInformation, state) {
    void DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_SET_CRASH_INFORMATION, crashInformation, state);
}
function setMemoryInformation(memoryInformation) {
    void DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_SET_MEMORY_INFORMATION, {
        uptimeSeconds: Math.floor(process_1.default.uptime()),
        memoryUsageKB: memoryInformation.memoryUsageKB,
        usedJSHeapSizeKB: memoryInformation.usedJSHeapSizeKB,
    });
}
function setCrashReason(reason) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_SET_CRASH_REASON, reason);
}
function getGpuProcessId() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_GPU_PROCESS_ID);
}
function getSystemMetrics() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.PROCESS_UTILS_GET_SYSTEM_METRICS);
}
