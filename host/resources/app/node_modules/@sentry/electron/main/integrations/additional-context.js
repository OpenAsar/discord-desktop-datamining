Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalContext = void 0;
const tslib_1 = require("tslib");
const electron_1 = require("electron");
const os_1 = require("os");
const common_1 = require("../../common");
const electron_normalize_1 = require("../electron-normalize");
const DEFAULT_OPTIONS = {
    cpu: true,
    screen: true,
    memory: true,
    language: true,
};
/** Adds Electron context to events and normalises paths. */
class AdditionalContext {
    constructor(options = {}) {
        /** @inheritDoc */
        this.name = AdditionalContext.id;
        this._lazyDeviceContext = {};
        this._options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    }
    /** @inheritDoc */
    setupOnce(addGlobalEventProcessor) {
        addGlobalEventProcessor((event) => tslib_1.__awaiter(this, void 0, void 0, function* () { return this._addAdditionalContext(event); }));
        // Some metrics are only available after app ready so we lazily load them
        void electron_normalize_1.whenAppReady.then(() => {
            const { language, screen } = this._options;
            if (language) {
                this._lazyDeviceContext.language = electron_1.app.getLocale();
            }
            if (screen) {
                this._setPrimaryDisplayInfo();
                electron_1.screen.on('display-metrics-changed', () => {
                    this._setPrimaryDisplayInfo();
                });
            }
        });
    }
    /** Adds additional context to event */
    _addAdditionalContext(event) {
        const device = this._lazyDeviceContext;
        const { memory, cpu } = this._options;
        if (memory) {
            const { total, free } = process.getSystemMemoryInfo();
            device.memory_size = total * 1024;
            device.free_memory = free * 1024;
        }
        if (cpu) {
            const cpuInfo = (0, os_1.cpus)();
            if (cpuInfo && cpuInfo.length) {
                const firstCpu = cpuInfo[0];
                device.processor_count = cpuInfo.length;
                device.cpu_description = firstCpu.model;
                device.processor_frequency = firstCpu.speed;
                if (electron_1.app.runningUnderARM64Translation) {
                    device.machine_arch = 'arm64';
                }
            }
        }
        return (0, common_1.mergeEvents)(event, { contexts: { device } });
    }
    /** Sets the display info */
    _setPrimaryDisplayInfo() {
        const display = electron_1.screen.getPrimaryDisplay();
        const width = Math.floor(display.size.width * display.scaleFactor);
        const height = Math.floor(display.size.height * display.scaleFactor);
        this._lazyDeviceContext.screen_density = display.scaleFactor;
        this._lazyDeviceContext.screen_resolution = `${width}x${height}`;
    }
}
exports.AdditionalContext = AdditionalContext;
/** @inheritDoc */
AdditionalContext.id = 'AdditionalContext';
//# sourceMappingURL=additional-context.js.map