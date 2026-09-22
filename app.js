// ---------------------------------------------------------
// Loading screen
// Keeps the loader up for a short minimum time so it never
// just flashes, then fades it out once in a single motion.
// ---------------------------------------------------------
(function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minVisibleMs = reduceMotion ? 0 : 700;
  const start = Date.now();

  function dismiss() {
    const elapsed = Date.now() - start;
    const wait = Math.max(0, minVisibleMs - elapsed);
    window.setTimeout(() => {
      loader.setAttribute("data-state", "hidden");
      document.body.classList.remove("is-loading");
    }, wait);
  }

  if (document.readyState === "complete") {
    dismiss();
  } else {
    window.addEventListener("load", dismiss, { once: true });
  }
})();

// ---------------------------------------------------------
// Article data
// Replace this with real publications, or point it at a
// JSON feed / CMS export later.
// ---------------------------------------------------------
const ARTICLES = [
  {
    tag: "Conflict",
    title: "The fault lines redrawing the Sahel",
    excerpt: "How overlapping insurgencies and shifting foreign alliances are reshaping a region already strained by climate pressure.",
    date: "Sep 2026",
    readTime: "8 min read",
    bgImage: "assets/articles/sahel.jpg",
  },
  {
    tag: "Humanitarian",
    title: "Displacement without a horizon",
    excerpt: "A look at protracted displacement crises where return is no longer the working assumption of aid planning.",
    date: "Aug 2026",
    readTime: "6 min read",
    bgImage: "assets/articles/displacement.jpg",
  },
  {
    tag: "Policy",
    title: "Sanctions regimes and their quiet costs",
    excerpt: "Economic sanctions are a blunt instrument. We examine who actually absorbs the impact, and for how long.",
    date: "Aug 2026",
    readTime: "10 min read",
    bgImage: "assets/articles/sanctions.jpg",
  },
  {
    tag: "Geopolitics",
    title: "The new arithmetic of alliances",
    excerpt: "Middle powers are hedging rather than choosing sides. What that means for the next decade of coalition-building.",
    date: "Jul 2026",
    readTime: "7 min read",
    bgImage: "assets/articles/alliances.jpg",
  },
];

// ---------------------------------------------------------
// Render articles into #articleGrid
// ---------------------------------------------------------
function renderArticles(articles) {
  const grid = document.getElementById("articleGrid");
  const count = document.getElementById("articleCount");
  if (!grid) return;

  grid.innerHTML = "";

  articles.forEach((article) => {
    const card = document.createElement("article");
    card.className = "article-card";
    card.innerHTML = `
      <span class="article-tag">${article.tag}</span>
      <h3>${article.title}</h3>
      <p>${article.excerpt}</p>
      <div class="article-meta">
        <span>${article.date}</span>
        <span>${article.readTime}</span>
      </div>
      <a class="article-link" href="#">Read the analysis →</a>
    `;
    grid.appendChild(card);

    // Only apply the background image once it's confirmed to load, so a
    // not-yet-added image quietly falls back to the plain card color
    // instead of showing broken-image artifacts.
    if (article.bgImage) {
      const probe = new Image();
      probe.onload = () => {
        card.style.setProperty("--card-bg-image", `url("${article.bgImage}")`);
      };
      probe.src = article.bgImage;
    }
  });

  if (count) {
    count.textContent = `${articles.length} article${articles.length === 1 ? "" : "s"}`;
  }
}

renderArticles(ARTICLES);

// ---------------------------------------------------------
// Footer year
// ---------------------------------------------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();