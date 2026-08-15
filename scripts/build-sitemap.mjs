import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";

const repositoryRoot = new URL("../", import.meta.url);
const sitemapPath = new URL("sitemap.xml", repositoryRoot);
const sandbox = { window: {} };

for (const filename of ["site-config.js", "notes-data.js"]) {
  const source = await readFile(new URL(filename, repositoryRoot), "utf8");
  vm.runInNewContext(source, sandbox, { filename });
}

const site = sandbox.window.COIFFED_SITE;
const notes = sandbox.window.coiffedNotes;
const hasApprovedBody = sandbox.window.isCoiffedNotePublished;

if (!site?.productionOrigin || !Array.isArray(site.indexedPages) || !Array.isArray(notes) || typeof hasApprovedBody !== "function") {
  throw new Error("The sitemap source data is incomplete.");
}

const productionOrigin = new URL(site.productionOrigin);
if (productionOrigin.protocol !== "https:" || productionOrigin.pathname !== "/") {
  throw new Error("productionOrigin must be an HTTPS origin without a path.");
}

const publicUrls = site.indexedPages.map((path) => new URL(path, productionOrigin).href);
const publishedNoteUrls = notes.filter(hasApprovedBody).map((note) => new URL(note.url, `${productionOrigin.href}`).href);
const sitemapUrls = [...new Set([...publicUrls, ...publishedNoteUrls])];

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls.flatMap((url) => ["  <url>", `    <loc>${escapeXml(url)}</loc>`, "  </url>"]),
  "</urlset>",
  ""
].join("\n");

if (process.argv.includes("--check")) {
  const currentSitemap = await readFile(sitemapPath, "utf8");
  if (currentSitemap !== sitemap) {
    console.error("sitemap.xml is out of date. Run: node scripts/build-sitemap.mjs");
    process.exitCode = 1;
  } else {
    console.log(`sitemap.xml is current with ${sitemapUrls.length} public URLs.`);
  }
} else {
  await writeFile(sitemapPath, sitemap, "utf8");
  console.log(`Wrote sitemap.xml with ${sitemapUrls.length} public URLs.`);
}
