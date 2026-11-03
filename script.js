const root = document.documentElement;
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const themeToggle = document.querySelector(".theme-toggle");
const chips = document.querySelectorAll(".chip");
const projects = document.querySelectorAll(".project");
const copyButton = document.querySelector("[data-email]");
const copyStatus = document.querySelector(".copy-status");

document.querySelector("#year").textContent = new Date().getFullYear();

/* Mobile nav */
const setNav = (open) => {
  siteNav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
};
navToggle.addEventListener("click", () => setNav(!siteNav.classList.contains("open")));
siteNav.addEventListener("click", (e) => { if (e.target.matches("a")) setNav(false); });

/* Theme */
themeToggle.addEventListener("click", () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = isDark ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
});

/* Project filters */
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chips.forEach((c) => c.classList.toggle("is-active", c === chip));
    projects.forEach((p) => {
      p.classList.toggle("is-hidden", filter !== "all" && p.dataset.category !== filter);
    });
  });
});

/* Copy email */
copyButton.addEventListener("click", async () => {
  const email = copyButton.dataset.email;
  const label = copyButton.querySelector(".btn-label");
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = `Copied ${email}`;
    label.textContent = "Copied";
    setTimeout(() => (label.textContent = "Copy email"), 1800);
  } catch {
    copyStatus.textContent = email;
  }
});

/* Active nav link + reveal on scroll */
const navLinks = [...siteNav.querySelectorAll("a")];
const sections = ["top", "projects", "approach", "experience", "stack"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  const revealTargets = document.querySelectorAll(".section-head, .project, .abc article, .t-row, .feature-grid article, .cta > *:not(.rings)");
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          reveal.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    reveal.observe(el);
  });
}

/* Subtle parallax on hero cards */
const floaters = document.querySelectorAll(".floater");
if (floaters.length && matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("pointermove", (e) => {
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    floaters.forEach((f, i) => {
      const depth = 8 + i * 4;
      f.style.setProperty("--px", `${x * depth}px`);
      f.style.setProperty("--py", `${y * depth}px`);
    });
  });
}
