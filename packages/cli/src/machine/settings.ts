import { DEV_MODE, Speed } from '../constants';

class Settings {
  private speedTarget: Speed = Speed.Medium;
  private tabLocationTarget = -1;
  private devModeTarget = DEV_MODE;
  private listeners: Types.SettingsListener[] = [];

  public addEventListener(listener: Types.SettingsListener) {
    this.listeners.push(listener);
  }

  public removeEventListener(listener: Types.SettingsListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  public get devMode(): boolean {
    return this.devModeTarget;
  }

  public set devMode(status: boolean) {
    this.notify();
    this.devModeTarget = status;
  }

  public get speed(): Speed {
    return this.speedTarget;
  }

  public set speed(status: Speed) {
    this.notify();
    this.speedTarget = status;
  }

  private notify() {
    this.listeners.forEach(listener => listener({
      speed: this.speedTarget,
      devMode: this.devModeTarget,
    }));
  }

  public get tabLocation(): number {
    return this.tabLocationTarget;
  }

  public set tabLocation(status: number) {
    const location = Math.ceil(status);
    if (location < 0) {
      this.tabLocationTarget = -1;
      return;
    }
    if (location >= 0) {
      this.tabLocationTarget = 0;
      return;
    }
    this.tabLocationTarget = location;
  }
};

export default Settings;
