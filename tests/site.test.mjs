import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage includes essential metadata and accessible landmarks", async () => {
  const html = await read("index.html");
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<meta name="viewport"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/coiffedbeauty\.com\/"/);
  assert.match(html, /class="skip-link" href="#main"/);
  assert.match(html, /<main id="main">/);
  assert.match(html, /aria-controls="primary-nav"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /data-opening-status/);
  assert.match(html, /<noscript>/);
  for (const id of ["experience", "wigs", "appointments", "beauty", "partners", "story", "visit"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag);
  assert.ok(images.length > 0);
  images.forEach((tag) => assert.match(tag, /\balt="[^"]*"/, `missing alt text: ${tag}`));
});

test("operational configuration contains publishable service, opening, and hours data", async () => {
  const source = await read("site-config.js");
  const context = { window: {} };
  vm.runInNewContext(source, context);
  const operations = context.window.COIFFED_OPERATIONS;
  assert.equal(operations.opening.status, "Preparing to open");
  assert.match(operations.opening.detail, /2325 Hennepin Ave/);
  assert.match(operations.hours.walkIns, /Exact hours are still being finalized/);
  assert.equal(operations.services.length, 2);
  assert.deepEqual(Array.from(operations.services, ({ name, price }) => [name, price]), [
    ["Initial Wig Consultation", "$50 total"],
    ["Wig Care Drop-Off", "$35"]
  ]);
  assert.equal(operations.booking.squareUrl, "");
  assert.match(operations.booking.fallbackUrl, /^mailto:/);
});

test("responsive and accessibility styles are present", async () => {
  const css = await read("styles.css");
  assert.match(css, /:focus-visible\s*\{/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.match(css, /\.appointment-hours\s*\{[^}]*grid-column:\s*1 \/ -1/);
});

test("runtime renders configured operations without injecting HTML", async () => {
  const script = await read("script.js");
  assert.match(script, /data-opening-status/);
  assert.match(script, /operations\.services\.forEach/);
  assert.doesNotMatch(script, /innerHTML\s*=/);
  assert.match(script, /event\.key === "Escape"/);
  assert.match(script, /aria-current/);
});

test("deployment copies every homepage runtime dependency", async () => {
  const deployment = await read(".cpanel.yml");
  for (const file of ["index.html", "styles.css", "script.js", "site-config.js", "sitemap.xml"]) {
    assert.match(deployment, new RegExp(`/bin/cp ${file.replace(".", "\\.")} `));
  }
  assert.match(deployment, /\/bin\/cp -R assets /);
});
