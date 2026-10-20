/**
 * Permanent (301) redirects, single source of truth for both the Express server
 * (which issues the redirect) and the build's route list (which excludes these
 * paths from prerendering and the sitemap).
 *
 * These consolidate thin, duplicate city pages into their richer canonical
 * equivalent so Google spends crawl budget on one strong page per city, and
 * carry old URLs over to the Oct 2026 navigation.
 */
export const REDIRECTS: Record<string, string> = {
  // Neighborhood stubs that duplicate a dedicated /cities/* deep-dive.
  "/neighborhoods/richmond": "/cities/richmond",
  "/neighborhoods/hercules": "/cities/hercules",
  "/neighborhoods/san-pablo": "/cities/san-pablo",
  "/neighborhoods/pinole": "/cities/pinole",
  "/neighborhoods/el-sobrante": "/cities/el-sobrante",
  "/neighborhoods/rodeo": "/cities/rodeo",
  // Core cities: one page each (Oct 2026 redesign).
  "/neighborhoods/el-cerrito": "/buying-in-el-cerrito",
  "/cities/el-cerrito": "/buying-in-el-cerrito",
  "/neighborhoods/albany": "/buying-in-albany",
  "/neighborhoods/berkeley": "/buying-in-berkeley",
  "/neighborhoods/oakland": "/buying-in-oakland",
  // Cities outside the service area were removed in the redesign.
  "/neighborhoods/alameda": "/neighborhoods",
  "/neighborhoods/walnut-creek": "/neighborhoods",
  "/neighborhoods/concord": "/neighborhoods",
  "/neighborhoods/pleasant-hill": "/neighborhoods",
  "/neighborhoods/fremont": "/neighborhoods",
  "/neighborhoods/hayward": "/neighborhoods",
  // Hubs and pages folded into the new navigation.
  "/testimonials": "/about#reviews",
  "/buyer-hub": "/buy",
  "/seller-hub": "/sell",
};

/** Paths that should be redirected away and therefore never prerendered or listed. */
export const REDIRECT_SOURCES = new Set(Object.keys(REDIRECTS));
