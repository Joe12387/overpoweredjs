import {
  ComponentOutputInterface,
  resolveComponent,
} from '../../utils/interfaces';

import { getSpecificTypeAndValue } from '../../utils/utils';

export const devicePixelRatio: (
  fingerprint
) => Promise<ComponentOutputInterface> = async () => {
  const devicePixelRatio = getSpecificTypeAndValue(self.devicePixelRatio);
  return resolveComponent(0, { devicePixelRatio });
};
