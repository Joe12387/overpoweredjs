/*
    cyrb53a beta (c) 2023 bryc (github.com/bryc)
    License: Public domain (or MIT if needed). Attribution appreciated.
    This is a work-in-progress, and changes to the algorithm are expected.
    The original cyrb53 has a slight mixing bias in the low bits of h1.
    This doesn't affect collision rate, but I want to try to improve it.
    This new version has preliminary improvements in avalanche behavior.
*/
const cyrb53a_beta = (str: string, seed: number = 0): number => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch: number; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 0x85ebca77);
    h2 = Math.imul(h2 ^ ch, 0xc2b2ae3d);
  }
  h1 ^= Math.imul(h1 ^ (h2 >>> 15), 0x735a2d97);
  h2 ^= Math.imul(h2 ^ (h1 >>> 15), 0xcaf649a9);
  h1 ^= h2 >>> 16;
  h2 ^= h1 >>> 16;
  return 2097152 * (h2 >>> 0) + (h1 >>> 11);
};

export const hash = (str: string, seed: number = 420): number => {
  return cyrb53a_beta(str, seed);
};
