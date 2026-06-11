import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, { redirect: false }));

  // serve the prerendered page for the route if one exists,
  // otherwise fall through to the SPA shell
  app.use("*", (req, res) => {
    let reqPath: string;
    try {
      reqPath = decodeURIComponent(req.originalUrl.split("?")[0]);
    } catch {
      reqPath = "/";
    }
    const candidate = path.normalize(path.join(distPath, reqPath, "index.html"));
    if (candidate.startsWith(distPath + path.sep) && fs.existsSync(candidate)) {
      return res.sendFile(candidate);
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
