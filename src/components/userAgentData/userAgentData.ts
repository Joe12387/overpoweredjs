import {
  ComponentOutputInterface,
  resolveComponent,
} from '../../utils/interfaces';

import { getSpecificType, getSpecificTypeAndValue } from '../../utils/utils';

interface BrandItem {
  brand: string;
  fullVersion: string;
}

const parseBrand = (arr: unknown[]): string[] => {
  const brands: string[] = [];
  if (!arr) return [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i] as BrandItem;
    if (item.brand) {
      const brand = item.brand;
      if (!new RegExp('Brand', 'i').test(brand)) {
        brands.push(brand);
      }
    }
  }
  return brands.sort();
};

export const userAgentData: (
  fingerprint
) => Promise<ComponentOutputInterface> = async (fingerprint) => {
  const userAgentData = navigator.userAgentData;
  if (!userAgentData) return resolveComponent(-1);
  if (typeof userAgentData.getHighEntropyValues !== 'function')
    return resolveComponent(-2);
  const highEntropyKeys = [
    'architecture',
    'bitness',
    'brands',
    'formFactor',
    'fullVersionList',
    'mobile',
    'model',
    'platform',
    'platformVersion',
    'uaFullVersion',
    'wow64',
  ];
  const promises: Promise<
    { [x: string]: { brands: string[] } } | { error: boolean }
  >[] = [];
  for (const key of highEntropyKeys) {
    try {
      promises.push(
        userAgentData.getHighEntropyValues([key]).then((value) => {
          return { [key]: value };
        })
      );
    } catch (e: unknown) {
      promises.push(Promise.resolve({ error: true }));
    }
  }
  return Promise.all(promises).then((values) => {
    const output = {};
    for (const value of values) {
      const key = Object.keys(value)[0];
      const highEntropyValues = value[key];
      highEntropyValues.brands =
        getSpecificType(highEntropyValues.brands) === 'array'
          ? parseBrand(highEntropyValues.brands)
          : highEntropyValues.brands;

      (() => {
        if (Array.isArray(highEntropyValues.fullVersionList)) {
          const sortedList = {};
          for (const item of highEntropyValues.fullVersionList) {
            if (!new RegExp('Brand', 'i').test(item.brand)) {
              sortedList[item.brand] = item.version;
            }
          }
          highEntropyValues.fullVersionList = sortedList;
        }
      })();

      for (const k in highEntropyValues) {
        if (Object.prototype.hasOwnProperty.call(highEntropyValues, k)) {
          output['userAgentData_' + k] = getSpecificTypeAndValue(highEntropyValues[k]);
        } else {
          output['userAgentData_' + k] = { type: 'undefined' };
        }
      }
    }
    return resolveComponent(0, output);
  });
};
