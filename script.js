const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...nav.querySelectorAll("a[href^='#']")];
const sections = [...document.querySelectorAll("[data-section]")];
const operations = window.COIFFED_OPERATIONS;

const appendTextElement = (parent, tagName, className, content) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = content;
  parent.append(element);
  return element;
};

const renderOperations = () => {
  if (!operations) return;

  const serviceList = document.querySelector("[data-service-list]");
  operations.services.forEach((service, index) => {
    const card = document.createElement("article");
    card.className = "service-card reveal";
    card.id = service.id;

    appendTextElement(card, "span", "service-number", String(index + 1).padStart(2, "0"));
    appendTextElement(card, "h3", "", service.name);

    const summary = document.createElement("dl");
    summary.className = "service-summary";
    [["Fee", service.price], ["Appointment time", service.customerDuration]].forEach(([label, value]) => {
      appendTextElement(summary, "dt", "", label);
      appendTextElement(summary, "dd", "", value);
    });
    if (service.internalDuration) {
      appendTextElement(summary, "dt", "", "Service time");
      appendTextElement(summary, "dd", "", service.internalDuration);
    }
    card.append(summary);

    appendTextElement(card, "p", "service-description", service.description);
    const details = document.createElement("ul");
    details.className = "service-details";
    service.details.forEach((detail) => appendTextElement(details, "li", "", detail));
    card.append(details);
    serviceList.append(card);
  });

  document.querySelector("[data-booking-copy]").textContent = `Appointments will be managed through ${operations.booking.mode}.`;
  document.querySelector("[data-specialist-copy]").textContent = operations.specialist;
  document.querySelector("[data-hours-copy]").textContent = operations.hours.walkIns;
  document.querySelector("[data-hours-pattern]").textContent = operations.hours.provisionalPattern;
  document.querySelector("[data-inventory-copy]").textContent = operations.inventory;
  document.querySelector("[data-visit-booking]").textContent = `${operations.booking.mode}; official booking link to come.`;
  document.querySelector("[data-visit-hours]").textContent = `${operations.hours.walkIns} ${operations.hours.provisionalPattern}`;

  const hasSquareUrl = Boolean(operations.booking.squareUrl);
  const bookingLink = document.createElement("a");
  bookingLink.className = "button button-gold";
  bookingLink.href = hasSquareUrl ? operations.booking.squareUrl : operations.booking.fallbackUrl;
  bookingLink.textContent = hasSquareUrl ? operations.booking.activeLabel : operations.booking.fallbackLabel;
  if (hasSquareUrl) {
    bookingLink.target = "_blank";
    bookingLink.rel = "noopener noreferrer";
    bookingLink.setAttribute("aria-label", `${operations.booking.activeLabel} Appointments (opens in a new tab)`);
  }
  document.querySelector("[data-booking-action]").append(bookingLink);
  document.querySelector("[data-booking-status]").textContent = hasSquareUrl ? "" : operations.booking.pendingLabel;
};

renderOperations();

const setMenu = (isOpen) => {
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
};

navToggle.addEventListener("click", () => setMenu(!document.body.classList.contains("nav-open")));
navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
    setMenu(false);
    navToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) setMenu(false);
});

const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-25% 0px -55%", threshold: [0, 0.2, 0.6] }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
