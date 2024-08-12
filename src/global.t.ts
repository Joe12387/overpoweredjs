interface Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

interface BatteryManager {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}
