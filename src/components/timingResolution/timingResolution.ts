import {
  ComponentOutputInterface,
  resolveComponent,
} from '../../utils/interfaces';

export const timingResolution: (
  fingerprint
) => Promise<ComponentOutputInterface> = async () => {
  const p = self.performance;

  if (p === undefined) return resolveComponent(-1);
  if (typeof p.now !== 'function') return resolveComponent(-2);

  let smallestInterval = 1;
  let secondSmallestInterval = 1;

  let now = p.now();
  let newNow = now;

  for (let i = 0; i < 5000; i++) {
    now = newNow;
    newNow = p.now();

    if (now < newNow) {
      const difference = newNow - now;
      if (difference > smallestInterval) {
        if (difference < secondSmallestInterval) {
          secondSmallestInterval = difference;
        }
      } else if (difference < smallestInterval) {
        secondSmallestInterval = smallestInterval;
        smallestInterval = difference;
      }
    }
  }
  // Safari (and maybe other non-chromium browsers) may sometimes return a non-persistent value for the smallest interval.
  // In this case, we set the smallest interval to 1 to correct the issue if the second smallest interval is also 1.
  // In a normal Chromium environment excluding Brave's protections, neither of these intervals should ever be 1.
  if (secondSmallestInterval === 1) smallestInterval = 1;
  return resolveComponent(0, {
    timingResolution_smallestInterval: smallestInterval,
    timingResolution_secondSmallestInterval: secondSmallestInterval,
  });
};
