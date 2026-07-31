/*
 * NOTES CONTENT
 * Add, remove, or reorder notes in this one array. The first note is featured.
 * Replace `sample: true` with `sample: false` when a note is ready to publish.
 */
const coiffedNotes = [
  {
    title: "Why We’re Building Coiffed",
    category: "Owner’s Notes",
    excerpt: "A short note on beauty, confidence, belonging, and why Coiffed is being built with care.",
    tags: ["beauty", "confidence", "belonging", "Minneapolis"],
    date: "2026-07-30",
    dateLabel: "July 2026",
    sample: true,
  },
  {
    title: "Opening Updates: What We’re Working On Now",
    category: "Opening Updates",
    excerpt: "A place to track progress as the boutique, product mix, and community experience come together.",
    tags: ["opening", "boutique", "progress", "behind the scenes"],
    date: "2026-07-29",
    dateLabel: "July 2026",
    sample: true,
  },
  {
    title: "How We Think About Wig Guidance",
    category: "Wigs & Guidance",
    excerpt: "Wig support at Coiffed should feel practical, personal, and never rushed.",
    tags: ["wigs", "fit", "care", "guidance"],
    date: "2026-07-28",
    dateLabel: "July 2026",
    sample: true,
  },
  {
    title: "A Note for Brand and Vendor Partners",
    category: "Vendor Notes",
    excerpt: "What we look for when something earns a place in the Coiffed experience.",
    tags: ["vendors", "brands", "products", "partnerships"],
    date: "2026-07-27",
    dateLabel: "July 2026",
    sample: true,
  },
  {
    title: "Follow the Story as Coiffed Comes to Life",
    category: "Community",
    excerpt: "Where to find updates, behind-the-scenes progress, product arrivals, and owner notes.",
    tags: ["community", "social", "updates", "Minneapolis"],
    date: "2026-07-26",
    dateLabel: "July 2026",
    sample: true,
  },
  {
    title: "What Makes a Beauty Find Worth Sharing",
    category: "Beauty Finds",
    excerpt: "A look at the usefulness, point of view, and everyday delight we hope a Coiffed beauty find can bring.",
    tags: ["beauty", "products", "gifts", "curation"],
    date: "2026-07-25",
    dateLabel: "July 2026",
    sample: true,
  },
  {
    title: "Scalp and Skin Care: Starting with the Basics",
    category: "Scalp & Skin Care",
    excerpt: "A simple starting point for thinking about routines, product questions, and when personal guidance matters.",
    tags: ["scalp care", "skincare", "routines", "guidance"],
    date: "2026-07-24",
    dateLabel: "July 2026",
    sample: true,
  },
];

const featuredNote = document.querySelector("#featured-note");
const notesGrid = document.querySelector("#notes-grid");
const searchInput = document.querySelector("#notes-search");
const clearSearch = document.querySelector("#clear-notes-search");
const topicFilters = document.querySelector("#topic-filters");
const resultsStatus = document.querySelector("#notes-results");
const emptyState = document.querySelector("#notes-empty");
const resetButton = document.querySelector("[data-reset-notes]");

let activeTopic = "All";

const noteSearchText = (note) =>
  [note.title, note.excerpt, note.category, ...note.tags].join(" ").toLocaleLowerCase();

const noteMeta = (note) => `
  <div class="note-meta">
    <span>${note.category}</span>
    <span aria-hidden="true">·</span>
    <time datetime="${note.date}">${note.dateLabel}</time>
    ${note.sample ? '<span class="note-sample">Sample note</span>' : ""}
  </div>
`;

const noteTags = (note) => `
  <ul class="note-tags" aria-label="Topics">
    ${note.tags.map((tag) => `<li>${tag}</li>`).join("")}
  </ul>
`;

const renderFeatured = (note) => {
  featuredNote.innerHTML = `
    <article class="featured-note-card" data-note-search="${noteSearchText(note)}" data-note-category="${note.category}">
      <div class="featured-note-number" aria-hidden="true">01</div>
      <div>
        ${noteMeta(note)}
        <h3>${note.title}</h3>
        <p>${note.excerpt}</p>
        ${noteTags(note)}
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
          <h3>${note.title}</h3>
          <p>${note.excerpt}</p>
          ${noteTags(note)}
        </article>
      `
    )
    .join("");
};

const renderTopics = () => {
  const topics = ["All", ...new Set(coiffedNotes.map((note) => note.category))];
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
  resultsStatus.textContent =
    visibleCount === 1 ? "Showing 1 note." : `Showing ${visibleCount} notes.`;
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

renderFeatured(coiffedNotes[0]);
renderArchive(coiffedNotes.slice(1));
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
