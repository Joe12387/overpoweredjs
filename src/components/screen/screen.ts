import {
  ComponentOutputInterface,
  resolveComponent,
} from '../../utils/interfaces';

import { getSpecificType, getSpecificTypeAndValue } from '../../utils/utils';

interface ScreenOutput {
  screen_width: ReturnType<typeof getSpecificTypeAndValue>;
  screen_height: ReturnType<typeof getSpecificTypeAndValue>;
  screen_pixelDepth: ReturnType<typeof getSpecificTypeAndValue>;
  screen_colorDepth: ReturnType<typeof getSpecificTypeAndValue>;
  screen_availWidth: ReturnType<typeof getSpecificTypeAndValue>;
  screen_availHeight: ReturnType<typeof getSpecificTypeAndValue>;
  screen_availTop: ReturnType<typeof getSpecificTypeAndValue>;
  screen_availLeft: ReturnType<typeof getSpecificTypeAndValue>;
  screen_isExtended: ReturnType<typeof getSpecificTypeAndValue>;
  screen_orientationType: ReturnType<typeof getSpecificType>;
  screen_orientation?: {
    angle: ReturnType<typeof getSpecificTypeAndValue>;
    type: ReturnType<typeof getSpecificTypeAndValue>;
  };
}

interface ExtendedScreen extends Screen {
  availTop?: number;
  availLeft?: number;
  isExtended?: boolean;
}

export const screen: (
  fingerprint: any
) => Promise<ComponentOutputInterface> = async (fingerprint) => {
  const screen = window.screen as ExtendedScreen;
  if (typeof screen !== 'object') return resolveComponent(-1);

  const output: ScreenOutput = {
    screen_width: getSpecificTypeAndValue(screen.width),
    screen_height: getSpecificTypeAndValue(screen.height),
    screen_pixelDepth: getSpecificTypeAndValue(screen.pixelDepth),
    screen_colorDepth: getSpecificTypeAndValue(screen.colorDepth),
    screen_availWidth: getSpecificTypeAndValue(screen.availWidth),
    screen_availHeight: getSpecificTypeAndValue(screen.availHeight),
    screen_availTop: getSpecificTypeAndValue(screen.availTop ?? undefined),
    screen_availLeft: getSpecificTypeAndValue(screen.availLeft ?? undefined),
    screen_isExtended: getSpecificTypeAndValue(screen.isExtended ?? undefined),
    screen_orientationType: getSpecificType(screen.orientation),
  };

  if (output.screen_orientationType === 'object') {
    output.screen_orientation = {
      angle: getSpecificTypeAndValue(screen.orientation.angle),
      type: getSpecificTypeAndValue(screen.orientation.type),
    };
  }

  return resolveComponent(0, output);
};
