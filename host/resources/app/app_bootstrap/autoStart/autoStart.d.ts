export interface AutoStart {
  install(callback: () => void): void;
  update(callback: () => void): void;
  isInstalled(callback: (installed: boolean) => void): void;
  uninstall(callback: () => void): void;
}
