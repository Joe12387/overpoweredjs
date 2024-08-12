import {
  ComponentOutputInterface,
  resolveComponent,
} from '../../utils/interfaces';

import { getSpecificTypeAndValue } from '../../utils/utils';

export const getBattery: (
  fingerprint
) => Promise<ComponentOutputInterface> = async (fingerprint) => {
  if (typeof self.navigator !== 'object') {
    return resolveComponent(-2);
  }
  if (typeof self.navigator.getBattery !== 'function') {
    return resolveComponent(-1);
  }
  try {
    const battery = await self.navigator.getBattery();
    return resolveComponent(0, {
      getBattery_level: getSpecificTypeAndValue(battery.level),
      getBattery_charging: getSpecificTypeAndValue(battery.charging),
      getBattery_chargingTime: getSpecificTypeAndValue(battery.chargingTime),
      getBattery_dischargingTime: getSpecificTypeAndValue(battery.dischargingTime),
    });
  } catch (error) {
    return resolveComponent(-3);
  }
};
