import {
  ComponentOutputInterface,
  resolveComponent,
} from '../../utils/interfaces';

import { getSpecificTypeAndValue } from '../../utils/utils';

interface Performance {
  memory?: {
    jsHeapSizeLimit: number;
  };
}

export const jsHeapSizeLimit: (
  fingerprint
) => Promise<ComponentOutputInterface> = async () => {
  const performance = self.performance as Performance;
  if (typeof performance !== 'object') return resolveComponent(-1);
  const memory = performance.memory;
  if (typeof memory !== 'object') return resolveComponent(-2);
  const jsHeapSizeLimit = getSpecificTypeAndValue(memory.jsHeapSizeLimit);
  return resolveComponent(0, { jsHeapSizeLimit });
};
