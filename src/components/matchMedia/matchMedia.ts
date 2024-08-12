import {
  ComponentOutputInterface,
  resolveComponent,
} from '../../utils/interfaces';

export const matchMedia: (
  fingerprint
) => Promise < ComponentOutputInterface > = async (fingerprint) => {
  /**
   *
   * `mediaQueries` list adapted from ThumbmarkJS: https://github.com/thumbmarkjs/thumbmarkjs/blob/b6d6a7f69efe7b72321ff86a11233c814ce097a2/src/components/screen/screen.ts
   *
   * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries
   *
   * I don't know if half of these queries are even supported by any browser, but they are here for completeness.
   *
   */
  const mediaQueries: {
    [k: string]: string[]
  } = {
    'prefers-contrast': ['high', 'more', 'low', 'less', 'forced', 'no-preference', 'high-contrast', 'low-contrast'],
    'color-gamut': ['rec2020', 'p3', 'srgb', 'display-p3', 'a98rgb'],
    'dynamic-range': ['high', 'standard', 'hdr', 'sdr'],
    'video-dynamic-range': ['high', 'standard', 'hdr', 'sdr'],
    'any-hover': ['hover', 'none', 'on-demand'],
    'any-pointer': ['none', 'coarse', 'fine', 'hover'],
    'pointer': ['none', 'coarse', 'fine', 'hover'],
    'hover': ['hover', 'none', 'on-demand'],
    'update': ['fast', 'slow', 'none'],
    'overflow-block': ['scroll', 'none', 'optional-paged', 'paged', 'optional-paged-x', 'optional-paged-y'],
    'overflow-inline': ['scroll', 'none', 'optional-paged', 'paged', 'optional-paged-x', 'optional-paged-y'],
    'color': ['8', '16', '256', '4k', '8k'],
    'inverted-colors': ['inverted', 'none', 'no-preference'],
    'prefers-reduced-motion': ['reduce', 'no-preference', 'motion'],
    'prefers-reduced-transparency': ['reduce', 'no-preference', 'transparency'],
    'grid': ['0', '1', '2'],
    'scripting': ['none', 'initial-only', 'enabled', 'enabled-only'],
    'forced-colors': ['active', 'none', 'none', 'active'],
    'display-mode': ['fullscreen', 'standalone', 'minimal-ui', 'browser', 'window'],
    'aspect-ratio': ['1/1', '16/9', '16/10', '4/3', '8/5', '5/4', '5/3', '3/2', '16/12', '3/4', '9/16', '10/16', '3/5', '2/3', '12/16'],
    'resolution': ['300dpi', '2dppx', '3dppx'],
    'prefers-color-scheme': ['dark', 'light', 'no-preference'],
    'overflow': ['auto', 'hidden'],
    'transform-3d': ['0', '1'],
    'device-aspect-ratio': ['1/1', '16/9', '16/10', '4/3', '8/5', '5/4', '5/3', '3/2', '16/12', '3/4', '9/16', '10/16', '3/5', '2/3', '12/16'],
    'device-height': ['640px', '768px', '1024px'],
    'device-width': ['320px', '360px', '375px'],
    'forced-color-adjust': ['none', 'auto'],
    'orientation': ['portrait', 'landscape'],
    'scan': ['progressive', 'interlace'],
  };
  const matchMedia = self.matchMedia;
  if (typeof matchMedia !== 'function') {
    return resolveComponent(-1);
  }
  const matchMedia_mediaQueries = {};
  for (const [key, value] of Object.entries(mediaQueries)) {
    for (const item of value) {
      const query = `(${key}: ${item})`;
      try {
        const result = window.matchMedia(query);
        matchMedia_mediaQueries[query] = result.matches;
      } catch (e) {
        matchMedia_mediaQueries[query] = { error: true };;
      }
    }
  }
  return resolveComponent(0, { matchMedia_mediaQueries });
};
