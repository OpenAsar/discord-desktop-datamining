"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUtilsSettings = void 0;
const electron_1 = __importDefault(require("electron"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const paths_1 = require("../../bootstrapModules/paths");
const DiscordIPC_1 = require("../common/DiscordIPC");
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
