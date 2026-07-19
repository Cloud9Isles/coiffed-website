const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const panels = [...document.querySelectorAll("[data-panel]")];
const revealItems = [...document.querySelectorAll(".reveal")];

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

const setActiveLink = () => {
  const current = panels.reduce((active, panel) => {
    const rect = panel.getBoundingClientRect();
    return rect.top <= 130 ? panel.id : active;
  }, "home");

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  setHeaderState();
  setActiveLink();
});

setHeaderState();
setActiveLink();
