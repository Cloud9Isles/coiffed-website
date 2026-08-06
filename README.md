# Coiffed Prototype

This is a lightweight static prototype for Coiffed, a community-centered beauty boutique in Minneapolis. It is intentionally built as ordinary files so the prototype can be revised without touching WordPress or the production homepage.

## Files

- `index.html`: page structure and copy
- `notes.html`: searchable “Notes from Coiffed” archive
- `notes/`: dedicated, directly loadable HTML page for each note
- `note.html`: legacy query-string note route retained for backward compatibility
- `styles.css`: visual system and responsive design
- `script.js`: navigation state, mobile menu behavior, and current-year display
- `notes-data.js`: note titles, slugs, metadata, publication status, and approved bodies
- `notes.js`: archive rendering, search, and topic filtering
- `note.js`: note detail rendering, metadata, and unavailable-note handling
- `assets/`: optimized, original prototype imagery
- `assets/logo/coiffed-logo-rgb.svg`: approved Coiffed RGB logo from the brand asset package

## Notes

- Brand tagline: “Where Beauty Meets Belonging.”
- The header and footer use the approved `Coiffed Logo_RGB.svg` asset. The source artwork includes multiple official color treatments; the site selects the gold treatment for the header and the white treatment for the footer without altering the asset.
- Body and interface text use a Gill Sans-style system stack. Calluna Sans is not bundled or imported because an approved web license/source is not available; headings use a refined system fallback until brand web-font files are provided.
- Customer, mailing-list, and general inquiries use `hello@coiffedbeauty.com`; vendor partnerships use `vendors@coiffedbeauty.com`.
- The footer links to Coiffed on Instagram, Facebook, and TikTok with accessible labels and recognizable icons.
- Notes are managed in `notes-data.js`, with a matching HTML file in `notes/`. Keep each filename and URL unchanged after sharing it. Add approved full text to the corresponding HTML page and to the data entry, then change `status` from `draft` to `published`. A note is treated as published only when both conditions are met.
- Current Notes entries are draft previews. Their complete bodies require Joshua or Brinn’s approval before publication.
- The prototype imagery is AI-generated and should be replaced with original Coiffed photography before the site becomes the production experience. The hero intentionally uses a people-free boutique still life; the consultation concept image is explicitly labeled in the page.
- Copy avoids unconfirmed claims about opening status, inventory, services, hours, and founder details.
- No hosting or DNS changes are made by this prototype.
