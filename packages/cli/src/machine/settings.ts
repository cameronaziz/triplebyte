import { DEV_MODE, Speed } from '../constants';

class Settings {
  private speedTarget: Speed = Speed.Medium;
  private tabLocationTarget = -1;
  private devModeTarget = DEV_MODE;
  private widthTarget = 2;
  private heightTarget = 1;
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
    this.devModeTarget = status;
    this.notify();
  }

  public get speed(): Speed {
    return this.speedTarget;
  }

  public set speed(status: Speed) {
    this.speedTarget = status;
    this.notify();
  }

  public get width(): number {
    return this.widthTarget;
  }

  public set width(value: number) {
    this.widthTarget = value;
    this.notify();
  }

  public get height(): number {
    return this.heightTarget;
  }

  public set height(value: number) {
    this.heightTarget = value;
    this.notify();
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
    if (location >= 2) {
      this.tabLocationTarget = 2;
      return;
    }
    this.tabLocationTarget = location;
  }
};

export default Settings;
