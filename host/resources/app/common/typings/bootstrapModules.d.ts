/**
 * Type declarations shared between app_bootstrap and app.
 *
 * These live here (rather than as imports from app_bootstrap/) so that
 * tsc does not pull app_bootstrap source files into the app compilation unit.
 * The two builds (app/ and app_bootstrap/) are separate tsc projects; this
 * file is visible to both via the shared common/typings typeRoots entry.
 */

declare namespace BootstrapModuleTypes {
  /** Represents the app_bootstrap/Constants module passed across the boundary. */
  interface Constants {
    APP_COMPANY: string;
    APP_DESCRIPTION: string;
    APP_NAME: string;
    APP_NAME_FOR_HUMANS: string;
    APP_ID: string;
    APP_PROTOCOL: string;
    API_ENDPOINT: string;
    NEW_UPDATE_ENDPOINT: string;
    UPDATE_ENDPOINT: string;
    ALLOW_OPTIONAL_UPDATES: boolean;
    LOG_LEVEL: string;
    USE_RUST_BSPATCH: boolean;
    USE_NEW_UPDATER: boolean;
    IPCEvents: {
      readonly GET_BUILD_OVERRIDE_STATUS: 'DISCORD_GET_BUILD_OVERRIDE_STATUS';
      readonly CLEAR_BUILD_OVERRIDE: 'DISCORD_CLEAR_BUILD_OVERRIDE';
    };
  }

  interface GPUSettings {
    replace(gpuSettings: unknown): void;
  }

  interface AppSettings {
    getSettings(): import('../Settings').default | undefined;
  }

  interface AutoStart {
    isInstalled(callback: (installed: boolean) => void): void;
    install(callback: () => void): void;
    uninstall(callback: () => void): void;
    update(callback: () => void): void;
  }

  interface BuildInfo {
    releaseChannel: string;
    localModulesRoot?: string | null;
  }

  interface Logger {
    initializeLogging(paths: typeof import('../paths')): void;
    ipcMainRendererLogger(
      event: Electron.Event,
      level: number,
      message: string,
      lineNo: number,
      sourceId: string,
    ): void;
    ipcMainRendererLog(message: string, level?: number): void;
    networkDebugLogger(): import('electron-log').Logger | null;
  }

  interface ModuleUpdater {
    checkForUpdates(): void;
    quitAndInstallUpdates(): void;
    install(moduleName: string, defer: boolean): void;
    isInstalled(moduleName: string, param?: unknown): boolean | undefined;
    getInstalled(): Record<string, {installedVersion: number}>;
    events: ModuleUpdaterEvents;
    supportsEventObjects: boolean;
    CHECKING_FOR_UPDATES: string;
    UPDATE_CHECK_FINISHED: string;
    DOWNLOADING_MODULE_PROGRESS: string;
    DOWNLOADING_MODULES_FINISHED: string;
    INSTALLED_MODULE: string;
  }

  interface ModuleUpdaterEvents {
    on(eventName: string, handler: (...args: any[]) => void): void;
    removeListener(eventName: string, handler: (...args: any[]) => void): void;
    history?: unknown[];
  }

  interface SplashScreen {
    pageReady(): void;
  }

  type Analytics = typeof import('../analytics');
  type CrashReporterSetup = typeof import('../crashReporterSetup');
  type Paths = typeof import('../paths');
  type Updater = typeof import('../updater');

  /** The object passed from bootstrap.tsx → coreModule.startup() → bootstrapModules.init() */
  interface BootstrapModules {
    Constants: Constants;
    GPUSettings: GPUSettings;
    analytics: Analytics;
    appSettings: AppSettings;
    autoStart: AutoStart;
    buildInfo: BuildInfo;
    crashReporterSetup: CrashReporterSetup;
    logger: Logger;
    moduleUpdater: ModuleUpdater;
    paths: Paths;
    splashScreen: SplashScreen;
    updater: Updater;
  }

  /** The core module loaded via requireNative('discord_desktop_core') */
  interface CoreModule {
    startup(modules: BootstrapModules): void;
    handleOpenUrl(url: string | null): void;
    setMainWindowVisible(visible: boolean): void;
  }
}
