const notes = window.coiffedNotes || [];
const noteRoot = document.querySelector("#note-detail");
const requestedSlug = new URLSearchParams(window.location.search).get("note");
const note = notes.find((item) => item.slug === requestedSlug);
const canonical = document.querySelector("link[rel='canonical']");
const metaDescription = document.querySelector("meta[name='description']");
const openGraphTitle = document.querySelector("meta[property='og:title']");
const openGraphDescription = document.querySelector("meta[property='og:description']");
const openGraphUrl = document.querySelector("meta[property='og:url']");

const hasPublishedBody = (item) =>
  item.status === "published" && Array.isArray(item.body) && item.body.length > 0;

const renderMeta = (item) => `
  <div class="note-meta note-detail-meta">
    <span>${item.category}</span>
    <span aria-hidden="true">·</span>
    <time datetime="${item.date}">${item.dateLabel}</time>
    ${hasPublishedBody(item) ? "" : '<span class="note-sample">Draft preview</span>'}
  </div>
`;

const renderTags = (item) => `
  <ul class="note-tags" aria-label="Topics">
    ${item.tags.map((tag) => `<li>${tag}</li>`).join("")}
  </ul>
`;

const updateMetadata = (item) => {
  const title = `${item.title} | Notes from Coiffed`;
  const url = `https://coiffedbeauty.com/prototype/note.html?note=${encodeURIComponent(item.slug)}`;
  document.title = title;
  metaDescription.setAttribute("content", item.excerpt);
  openGraphTitle.setAttribute("content", title);
  openGraphDescription.setAttribute("content", item.excerpt);
  openGraphUrl.setAttribute("content", url);
  canonical.setAttribute("href", url);
};

const renderMissingNote = () => {
  document.title = "Note not found | Notes from Coiffed";
  noteRoot.innerHTML = `
    <section class="note-detail-shell shell" aria-labelledby="note-title">
      <p class="eyebrow">Notes from Coiffed</p>
      <h1 id="note-title">That note isn’t available.</h1>
      <p class="note-detail-intro">The link may be incomplete, or the note may no longer be listed.</p>
      <a class="button button-gold" href="./notes.html#archive">Browse all notes</a>
    </section>
  `;
};

const renderNote = (item) => {
  updateMetadata(item);
  const published = hasPublishedBody(item);
  const body = published
    ? `<div class="note-body">${item.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}</div>`
    : `
      <aside class="note-draft-notice" aria-labelledby="draft-notice-title">
        <p class="eyebrow" id="draft-notice-title">Full note awaiting approval</p>
        <p>This draft preview has a reserved shareable link, but its complete text has not been approved for publication.</p>
      </aside>
    `;

  noteRoot.innerHTML = `
    <article class="note-detail-shell shell" aria-labelledby="note-title">
      <a class="note-back-link" href="./notes.html#archive"><span aria-hidden="true">←</span> Back to Notes</a>
      ${renderMeta(item)}
      <h1 id="note-title">${item.title}</h1>
      <p class="note-detail-intro">${item.excerpt}</p>
      ${body}
      ${renderTags(item)}
      <footer class="note-detail-footer">
        <a class="button button-gold" href="./notes.html#archive">Browse all notes</a>
      </footer>
    </article>
  `;
};

if (note) renderNote(note);
else renderMissingNote();
