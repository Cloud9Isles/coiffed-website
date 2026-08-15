const coiffedNotes = window.coiffedNotes || [];
const featuredNote = document.querySelector("#featured-note");
const notesGrid = document.querySelector("#notes-grid");
const searchInput = document.querySelector("#notes-search");
const clearSearch = document.querySelector("#clear-notes-search");
const topicFilters = document.querySelector("#topic-filters");
const resultsStatus = document.querySelector("#notes-results");
const emptyState = document.querySelector("#notes-empty");
const resetButton = document.querySelector("[data-reset-notes]");
const emptyEyebrow = document.querySelector("[data-empty-eyebrow]");
const emptyTitle = document.querySelector("[data-empty-title]");

let activeTopic = "All";

const hasPublishedBody = window.isCoiffedNotePublished || (() => false);

const publishedNotes = coiffedNotes.filter(hasPublishedBody);

const noteUrl = (note) => note.url;

const noteSearchText = (note) =>
  [note.title, note.excerpt, note.category, ...note.tags].join(" ").toLocaleLowerCase();

const noteMeta = (note) => `
  <div class="note-meta">
    <span>${note.category}</span>
    <span aria-hidden="true">·</span>
    <time datetime="${note.date}">${note.dateLabel}</time>
  </div>
`;

const noteTags = (note) => `
  <ul class="note-tags" aria-label="Topics">
    ${note.tags.map((tag) => `<li>${tag}</li>`).join("")}
  </ul>
`;

const noteLink = (note) => `
  <a class="note-read-link" href="${noteUrl(note)}">
    Read full note
    <span aria-hidden="true">→</span>
  </a>
`;

const renderFeatured = (note) => {
  if (!note) {
    featuredNote.innerHTML = '<p class="notes-unavailable">Published notes are coming soon.</p>';
    return;
  }

  featuredNote.innerHTML = `
    <article class="featured-note-card" data-note-search="${noteSearchText(note)}" data-note-category="${note.category}">
      <div class="featured-note-number" aria-hidden="true">01</div>
      <div>
        ${noteMeta(note)}
        <h3><a href="${noteUrl(note)}">${note.title}</a></h3>
        <p>${note.excerpt}</p>
        ${noteTags(note)}
        ${noteLink(note)}
      </div>
    </article>
  `;
};

const renderArchive = (notes) => {
  notesGrid.innerHTML = notes
    .map(
      (note, index) => `
        <article class="note-card" data-note-search="${noteSearchText(note)}" data-note-category="${note.category}">
          <span class="note-card-number" aria-hidden="true">${String(index + 2).padStart(2, "0")}</span>
          ${noteMeta(note)}
          <h3><a href="${noteUrl(note)}">${note.title}</a></h3>
          <p>${note.excerpt}</p>
          ${noteTags(note)}
          ${noteLink(note)}
        </article>
      `
    )
    .join("");
};

const renderTopics = () => {
  const topics = ["All", ...new Set(publishedNotes.map((note) => note.category))];
  topicFilters.innerHTML = topics
    .map(
      (topic) => `
        <button type="button" aria-pressed="${topic === activeTopic}" data-topic="${topic}">
          ${topic}
        </button>
      `
    )
    .join("");
};

const filterNotes = () => {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const cards = [...document.querySelectorAll("[data-note-search]")];
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesQuery = !query || card.dataset.noteSearch.includes(query);
    const matchesTopic = activeTopic === "All" || card.dataset.noteCategory === activeTopic;
    const isVisible = matchesQuery && matchesTopic;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  clearSearch.hidden = query.length === 0;
  emptyState.hidden = visibleCount !== 0;
  if (publishedNotes.length === 0) {
    emptyEyebrow.textContent = "Notes coming soon";
    emptyTitle.textContent = "There aren’t any published notes yet.";
    resetButton.hidden = true;
    resultsStatus.textContent = "No published notes yet.";
  } else {
    emptyEyebrow.textContent = "No matching notes";
    emptyTitle.textContent = "Try another word or topic.";
    resetButton.hidden = false;
    resultsStatus.textContent =
      visibleCount === 1 ? "Showing 1 note." : `Showing ${visibleCount} notes.`;
  }
};

const resetNotes = () => {
  activeTopic = "All";
  searchInput.value = "";
  topicFilters.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.topic === "All"));
  });
  filterNotes();
  searchInput.focus();
};

renderFeatured(publishedNotes[0]);
renderArchive(publishedNotes.slice(1));
renderTopics();
filterNotes();

searchInput.addEventListener("input", filterNotes);
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  filterNotes();
  searchInput.focus();
});
resetButton.addEventListener("click", resetNotes);

topicFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-topic]");
  if (!button) return;
  activeTopic = button.dataset.topic;
  topicFilters.querySelectorAll("button").forEach((topicButton) => {
    topicButton.setAttribute("aria-pressed", String(topicButton === button));
  });
  filterNotes();
});
