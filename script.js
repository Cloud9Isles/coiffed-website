const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...nav.querySelectorAll("a[href^='#']")];
const sections = [...document.querySelectorAll("[data-section]")];

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
