// GA4 measurement IDs are public by design (visible in any site's page source),
// so a committed default is fine; the env var still allows overriding per deploy.
const GA_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ||
  "G-XD8QPD7X2K";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function initAnalytics() {
  if (initialized || !GA_ID || typeof window === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  // SPA: we send page_view manually on route changes
  window.gtag("config", GA_ID, { send_page_view: false });

  // Delegated CTA tracking: phone, sms, email, and booking links anywhere on the site
  document.addEventListener("click", (e) => {
    const anchor = (e.target as HTMLElement)?.closest?.("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("tel:")) {
      trackEvent("phone_click", { link_url: href });
    } else if (href.startsWith("sms:")) {
      trackEvent("text_click", { link_url: href });
    } else if (href.startsWith("mailto:")) {
      trackEvent("email_click", { link_url: href });
    } else if (href.includes("calendly.com")) {
      trackEvent("book_consultation_click", { link_url: href });
    } else if (href.includes("zillow.com")) {
      trackEvent("zillow_profile_click", { link_url: href });
    } else if (href.includes("instagram.com")) {
      trackEvent("instagram_click", { link_url: href });
    }
  });
}

export function trackPageview(path: string) {
  if (!initialized || !GA_ID) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!initialized || !GA_ID) return;
  window.gtag("event", name, params);
}
