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
  assert.doesNotMatch(source, /provisional|still being finalized|Initial Wig Consultation|Wig Care Drop-Off/);
  const context = { window: {} };
  vm.runInNewContext(source, context);
  const operations = context.window.COIFFED_OPERATIONS;
  assert.equal(operations.opening.status, "Coming soon.");
  assert.match(operations.opening.detail, /2325 Hennepin Ave/);
  assert.deepEqual(Array.from(operations.hours.schedule, ({ days, time }) => [days, time]), [
    ["Tuesday-Saturday", "9 AM-4 PM"],
    ["Sunday", "By appointment"],
    ["Monday", "Closed"]
  ]);
  assert.equal(operations.services.length, 4);
  assert.deepEqual(Array.from(operations.services, ({ name, price }) => [name, price]), [
    ["La Petite", "$35"],
    ["Classique", "$55"],
    ["Suprême", "$85"],
    ["Le Renouveau", "$115+"]
  ]);
  operations.services.forEach((service) => assert.ok(service.description.length > 40));
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
  assert.match(css, /--pink-rich:\s*#c81768/);
  assert.match(css, /:focus-visible\s*\{[^}]*outline:\s*3px solid var\(--white\)[^}]*box-shadow:/);
});

test("primary pink surfaces meet WCAG AA contrast with white text", async () => {
  const luminance = (hex) => {
    const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255).map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const contrast = (first, second) => {
    const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };
  for (const pink of ["c81768", "b1115b", "741039", "a10f50"]) {
    assert.ok(contrast(pink, "fffdf9") >= 4.5, `#${pink} must have AA text contrast`);
  }
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
