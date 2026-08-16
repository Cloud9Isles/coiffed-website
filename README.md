# Coiffed Prototype

This is a lightweight static prototype for Coiffed, a community-centered beauty boutique in Minneapolis. It is intentionally built as ordinary files so the prototype can be revised without touching WordPress or the production homepage.

## Files

- `index.html`: page structure and copy
- `notes.html`: searchable “Notes from Coiffed” archive
- `notes/`: dedicated, directly loadable HTML page for each note
- `note.html`: legacy query-string note route retained for backward compatibility
- `styles.css`: visual system and responsive design
- `script.js`: navigation state, mobile menu behavior, and current-year display
- `site-config.js`: single source of truth for opening status, services, prices, timing, policies, hours, booking mode, turnaround language, inventory caveats, and the configurable Square URL
- `notes-data.js`: note titles, slugs, metadata, publication status, and approved bodies
- `notes.js`: archive rendering, search, and topic filtering
- `note.js`: note detail rendering, metadata, and unavailable-note handling
- `sitemap.xml`: generated production sitemap containing only indexable public pages
- `scripts/build-sitemap.mjs`: dependency-free sitemap generator and consistency check
- `assets/`: optimized prototype imagery
- `assets/logo/coiffed-logo-rgb.svg`: approved Coiffed RGB logo from the brand asset package

## Notes

- Brand tagline: “Where Beauty Meets Belonging.”
- The header and footer use the approved `Coiffed Logo_RGB.svg` asset. The source artwork includes multiple official color treatments; the site selects the gold treatment for the header and the white treatment for the footer without altering the asset.
- Body and interface text use a Gill Sans-style system stack. Calluna Sans is not bundled or imported because an approved web license/source is not available; headings use a refined system fallback until brand web-font files are provided.
- Customer, mailing-list, and general inquiries use `hello@coiffedbeauty.com`; vendor partnerships use `vendors@coiffedbeauty.com`.
- The footer links to Coiffed on Instagram, Facebook, and TikTok with accessible labels and recognizable icons.
- Notes are managed in `notes-data.js`, with a matching HTML file in `notes/`. Keep each filename and URL unchanged after sharing it. A note appears in the archive only when its status is `published` and every body paragraph is a non-empty string.
- To publish a Note, obtain Joshua or Brinn’s approval, add the approved full text to its data entry and matching HTML page, change its status to `published`, remove the draft page’s `noindex` directive and notice, then run `node scripts/build-sitemap.mjs`. Verify the result with `node scripts/build-sitemap.mjs --check`.
- Current Notes entries remain drafts. Their summaries and reserved pages stay in the repository, but draft cards are excluded from the public archive and draft pages are excluded from the sitemap.
- The prototype imagery is AI-generated and should be replaced with original Coiffed photography before the site becomes the production experience. The hero intentionally uses a people-free boutique still life; the wig-display concept is explicitly labeled in the page.
- `assets/coiffed-wig-display-concept.webp` is generated, conceptual, and temporary. It is a people-free visualization of the planned wig display, not store photography or a depiction of actual inventory.
- Copy avoids unconfirmed claims about opening status, inventory, services, hours, and founder details.
- Appointment and operating information is managed only in `site-config.js`. Set `booking.squareUrl` there after Square provides the confirmed public booking URL. Items in `requiredDecisions` must be resolved before adding related policy language to the site.
- Run `npm test` for dependency-free checks of page structure, accessibility essentials, responsive CSS, operational content, and production configuration.

## Preview-to-production workflow

The checked-in cPanel deployment file is preview-only: when the configured cPanel Git deployment is triggered, `.cpanel.yml` copies the static pages, scripts, sitemap, Notes, and assets into `/public_html/prototype/`. That makes the prototype available for review without changing the production document root. Production promotion is deliberately not encoded in this repository, so it remains a separate, authorized cPanel step after review and approval.

To shorten that path safely, keep the preview deployment as the approval gate, require `npm test` on the exact commit being reviewed, and promote that same immutable commit or build artifact rather than copying edited files by hand. A separately authorized production deployment configuration can then reuse the tested file manifest after approval. This reduces duplicate checking and file drift without changing hosting, DNS, or production from this branch.
- No hosting or DNS changes are made by this prototype.
