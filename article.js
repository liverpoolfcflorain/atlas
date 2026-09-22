const articles = [
  {
    "slug": "afghanistan-pakistan-conflict",
    "title": "Afghanistan\u2013Pakistan Conflict",
    "category": "GEOPOLITICS",
    "date": "September 2026",
    "read": "8 min read",
    "summary": "An analytical overview of the evolving relationship between Afghanistan and Pakistan, examining the security, political and regional factors shaping the conflict.",
    "image": "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "slug": "usa-iran-conflict",
    "title": "USA\u2013Iran Conflict",
    "category": "GEOPOLITICS",
    "date": "September 2026",
    "read": "7 min read",
    "summary": "A concise examination of the strategic tensions between the United States and Iran and the wider implications for the Middle East.",
    "image": "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "slug": "el-salvador-gang-crackdown",
    "title": "The El Salvador Gang Crackdown: 4 Years Later",
    "category": "SOCIETY",
    "date": "September 2026",
    "read": "9 min read",
    "summary": "Four years into El Salvador's sweeping security campaign, what has changed, and what questions remain about its social and political cost?",
    "image": "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "slug": "russia-ukraine",
    "title": "NATO's Strategy and Posture in the Russia\u2013Ukraine Conflict",
    "category": "INTERNATIONAL SECURITY",
    "date": "September 2026",
    "read": "10 min read",
    "summary": "How NATO's strategic posture has evolved around the Russia\u2013Ukraine war, and what its changing role means for European security.",
    "image": "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "slug": "red-sea-crisis",
    "title": "The Red Sea Crisis: A Maritime Warzone",
    "category": "SECURITY",
    "date": "September 2026",
    "read": "8 min read",
    "summary": "A look at the strategic importance of the Red Sea, the actors involved and the risks posed to one of the world's critical maritime corridors.",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "slug": "darfur-genocide",
    "title": "Darfur Genocide",
    "category": "HUMAN RIGHTS",
    "date": "September 2026",
    "read": "11 min read",
    "summary": "An accessible analysis of the humanitarian catastrophe in Darfur, its historical roots and the international response.",
    "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
  }
];

import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

const params = new URLSearchParams(location.search);
const slug = params.get("slug");
const article = articles.find(a => a.slug === slug) || articles[0];

document.title = `Atlas Analytica — ${article.title}`;
document.getElementById("viewerTitle").textContent = article.title;
document.getElementById("category").textContent = article.category;
document.getElementById("title").textContent = article.title;
document.getElementById("summary").textContent = article.summary;
document.getElementById("meta").textContent = `${article.date} · ${article.read}`;
document.getElementById("openPdf").href = `articles/${article.slug}.pdf`;

const track = document.getElementById("pageTrack");
const pageNumber = document.getElementById("pageNumber");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let current = 0;
let total = 0;

function updateSlider() {
  track.style.transform = `translateX(-${current * 100}%)`;
  pageNumber.textContent = `PAGE ${current + 1} / ${total}`;
  prev.disabled = current === 0;
  next.disabled = current === total - 1;
}

prev.addEventListener("click", () => {
  if (current > 0) {
    current--;
    updateSlider();
  }
});

next.addEventListener("click", () => {
  if (current < total - 1) {
    current++;
    updateSlider();
  }
});

// Touch/swipe support on mobile and trackpads.
let startX = 0;
let dragging = false;

track.addEventListener("pointerdown", e => {
  startX = e.clientX;
  dragging = true;
});

track.addEventListener("pointerup", e => {
  if (!dragging) return;
  const dx = e.clientX - startX;
  dragging = false;
  if (Math.abs(dx) > 50) {
    if (dx < 0 && current < total - 1) current++;
    if (dx > 0 && current > 0) current--;
    updateSlider();
  }
});

async function renderPdf() {
  const pdf = await pdfjsLib.getDocument(`articles/${article.slug}.pdf`).promise;
  total = pdf.numPages;

  for (let pageNo = 1; pageNo <= total; pageNo++) {
    const page = await pdf.getPage(pageNo);
    const baseViewport = page.getViewport({ scale: 1 });
    const availableWidth = Math.min(window.innerWidth - 70, 1050);
    const scale = Math.min(2, availableWidth / baseViewport.width);
    const viewport = page.getViewport({ scale });

    const wrap = document.createElement("div");
    wrap.className = "pdf-page";

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(viewport.width * ratio);
    canvas.height = Math.floor(viewport.height * ratio);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;

    await page.render({
      canvasContext: context,
      viewport,
      transform: [ratio, 0, 0, ratio, 0, 0]
    }).promise;

    wrap.appendChild(canvas);
    track.appendChild(wrap);
  }

  updateSlider();
}

renderPdf().catch(error => {
  track.innerHTML = `<div class="pdf-page" style="color:#c5cbd1;padding:80px;text-align:center">
    <div>
      <h2>Unable to load this article</h2>
      <p>${error.message}</p>
      <p>Make sure the site is being served through a web server and the PDF exists in the articles folder.</p>
    </div>
  </div>`;
});
