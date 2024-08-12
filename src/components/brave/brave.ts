import {
  ComponentOutputInterface,
  resolveComponent,
} from '../../utils/interfaces';

interface BraveNavigator extends Navigator {
  brave?: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    isBrave?: Function;
  };
}

export const detectBrave: (
  fingerprint
) => Promise<ComponentOutputInterface> = async () => {
  const braveNavigator = navigator as BraveNavigator;
  if (typeof braveNavigator === 'undefined' || braveNavigator === null)
    return resolveComponent(-1);
  else {
    const braveClues = [
      typeof braveNavigator.brave === 'object',
      'brave' in navigator,
      typeof braveNavigator.brave === 'object' &&
        Object.getPrototypeOf(navigator.brave).constructor.name == 'Brave',
      typeof braveNavigator.brave === 'object' &&
        typeof braveNavigator.brave.isBrave === 'function' &&
        braveNavigator.brave.isBrave.toString() ===
          'function isBrave() { [native code] }',
    ];
    const likeBrave = braveClues.includes(true); // If any of the clues are true, it's likely Brave.
    const isBrave = !braveClues.includes(false); // If all of the clues are true, it's almost certainly Brave.
    const mode = -1; // -1 = unknown, 0 = shields down, 1 = shields up, 2 = shields up + aggressive
    if (likeBrave) {
      // TODO: Implement detection of Brave's shields status
    }
    const brave = {
      likeBrave,
      isBrave,
      mode,
      braveClues,
    };
    return resolveComponent(0, { brave });
  }
};
