/**
 * Permanent (301) redirects, single source of truth for both the Express server
 * (which issues the redirect) and the build's route list (which excludes these
 * paths from prerendering and the sitemap).
 *
 * These consolidate thin, duplicate city pages into their richer canonical
 * equivalent so Google spends crawl budget on one strong page per city instead
 * of two or three overlapping ones.
 */
export const REDIRECTS: Record<string, string> = {
  // Neighborhood stubs that duplicate a dedicated /cities/* deep-dive.
  "/neighborhoods/el-cerrito": "/cities/el-cerrito",
  "/neighborhoods/richmond": "/cities/richmond",
  "/neighborhoods/hercules": "/cities/hercules",
  "/neighborhoods/san-pablo": "/cities/san-pablo",
  "/neighborhoods/pinole": "/cities/pinole",
  "/neighborhoods/el-sobrante": "/cities/el-sobrante",
  "/neighborhoods/rodeo": "/cities/rodeo",
  // Neighborhood stubs whose richest equivalent is the buyer guide.
  "/neighborhoods/albany": "/buying-in-albany",
  "/neighborhoods/berkeley": "/buying-in-berkeley",
};

/** Paths that should be redirected away and therefore never prerendered or listed. */
export const REDIRECT_SOURCES = new Set(Object.keys(REDIRECTS));
