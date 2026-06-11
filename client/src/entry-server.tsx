import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export { getSeoForPath, listAllRoutes, SITE_URL } from "./lib/seo";

/** Renders the app for a given URL at build time (prerendering). */
export function render(url: string): string {
  return renderToString(
    <Router ssrPath={url}>
      <App />
    </Router>,
  );
}
