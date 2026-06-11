import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

const PUBLIC_DIR = path.resolve("dist/public");
const SSR_DIR = path.resolve("dist/ssr");

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function jsonLdScript(jsonLd: object[]): string {
  if (!jsonLd.length) return "";
  const payload = JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd).replace(
    /</g,
    "\\u003c",
  );
  return `<script type="application/ld+json" id="route-jsonld">${payload}</script>`;
}

interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  jsonLd: object[];
}

function applySeoToTemplate(template: string, seo: PageSeo, appHtml: string): string {
  const title = escapeAttr(seo.title);
  const description = escapeAttr(seo.description);

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${seo.ogType}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${description}$2`,
    );

  const headExtras = [
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
    `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
    jsonLdScript(seo.jsonLd),
  ]
    .filter(Boolean)
    .join("\n    ");

  html = html.replace("</head>", `    ${headExtras}\n  </head>`);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );
  return html;
}

async function prerender() {
  console.log("building SSR bundle...");
  await viteBuild({
    build: {
      ssr: "src/entry-server.tsx",
      outDir: SSR_DIR,
      emptyOutDir: true,
    },
  });

  const entryUrl = pathToFileURL(path.join(SSR_DIR, "entry-server.js")).href;
  const { render, getSeoForPath, listAllRoutes } = await import(entryUrl);

  const template = await readFile(path.join(PUBLIC_DIR, "index.html"), "utf-8");
  const routes: { path: string; lastmod?: string; priority: number }[] =
    listAllRoutes();

  console.log(`prerendering ${routes.length} routes...`);
  let rendered = 0;
  let metaOnly = 0;
  for (const route of routes) {
    const seo = getSeoForPath(route.path);
    let appHtml = "";
    try {
      appHtml = render(route.path);
      rendered++;
    } catch (err) {
      metaOnly++;
      console.warn(
        `  SSR failed for ${route.path} (meta-only fallback): ${(err as Error).message}`,
      );
    }
    const html = applySeoToTemplate(template, seo, appHtml);
    const outFile =
      route.path === "/"
        ? path.join(PUBLIC_DIR, "index.html")
        : path.join(PUBLIC_DIR, route.path.slice(1), "index.html");
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html);
  }
  console.log(`prerendered ${rendered} routes (${metaOnly} meta-only fallbacks)`);

  // sitemap.xml from the same route list
  const { SITE_URL } = await import(entryUrl);
  const buildDate = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((r) => {
      const loc = `${SITE_URL}${r.path === "/" ? "" : r.path}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${r.lastmod || buildDate}</lastmod>`,
        `    <priority>${r.priority.toFixed(1)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.join(PUBLIC_DIR, "sitemap.xml"), sitemap);
  console.log("sitemap.xml written");

  await rm(SSR_DIR, { recursive: true, force: true });
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  await prerender();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
