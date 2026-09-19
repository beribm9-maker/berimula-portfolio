/* =========================================================
   YOUR VIDEOS
   ---------------------------------------------------------
   This is the ONLY part most people need to edit.
   Add, remove, or change an entry to update the "Work" grid.

   How to get a YouTube ID:
   Your video URL looks like  https://www.youtube.com/watch?v=dQw4w9WgXcQ
   The ID is everything after "v="  ->  dQw4w9WgXcQ
   ========================================================= */
const videos = [
  {
    title: "Long youtube video",
    tag: "6 Business Tips",
    youtubeId: "aHDX17YEkfU",
  },
  {
    title: "MR Beast-purple cow analogy",
    tag: "Viral analogy",
    youtubeId: "PgH1cC4Ifiw",
  },
  {
    title: "AVA-case studies to go viral",
    tag: "Case Study",
    youtubeId: "oQzlS-7HD9o",
  },
  {
    title: "Daniel-going viral is not consistency",
    tag: "viral advice",
    youtubeId: "vjRR5WMpDig",
  },
  {
    title: "Daniel-Little things give you edge versus your competitor",
    tag: "viral advice",
    youtubeId: "FBfLkQQyXag",
  },
  {
    title: "Ethiopia radio story",
    tag: "Radio story",
    youtubeId: "uqRHpDwU2h8",
  },
];

/* =========================================================
   BUILD THE WORK GRID FROM THE ARRAY ABOVE
   ========================================================= */
function renderWorkGrid() {
  const grid = document.getElementById("workGrid");
  if (!grid) return;

  grid.innerHTML = videos
    .map(
      (video, i) => `
      <article class="work-card" data-animate style="transition-delay:${i * 0.08}s">
        <div
          class="work-card__media video-embed"
          data-video-id="${video.youtubeId}"
          role="button"
          tabindex="0"
          aria-label="Play ${video.title}"
        >
          <img
            class="work-card__thumb"
            src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg"
            alt="${video.title} thumbnail"
            onerror="this.parentElement.classList.add('video-embed--no-thumb')"
          />
          <span class="work-card__play">▶</span>
        </div>
        <div class="work-card__meta">
          <span class="work-card__title">${video.title}</span>
          <span class="work-card__tag">${video.tag}</span>
        </div>
      </article>`
    )
    .join("");
}

/* =========================================================
   LIGHTBOX — plays the clicked YouTube video in a modal
   ========================================================= */
const lightbox = document.getElementById("lightbox");
const lightboxFrame = document.getElementById("lightboxFrame");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");

function openLightbox(youtubeId) {
  if (!youtubeId) return;
  lightboxFrame.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`;
  lightbox.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightboxFrame.innerHTML = ""; // stops playback
  document.body.style.overflow = "";
}

// Any element with class "video-embed" and a data-video-id opens the lightbox
document.addEventListener("click", (e) => {
  const trigger = e.target.closest(".video-embed");
  if (trigger) openLightbox(trigger.dataset.videoId);
});

document.addEventListener("keydown", (e) => {
  const trigger = document.activeElement.closest?.(".video-embed");
  if (trigger && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    openLightbox(trigger.dataset.videoId);
  }
  if (e.key === "Escape") closeLightbox();
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);

/* =========================================================
   SCROLL-TRIGGERED FADE-UP ANIMATIONS
   ---------------------------------------------------------
   Any element with [data-animate] fades/slides in once it
   enters the viewport. This powers the "scroll reveal" feel.
   ========================================================= */
function initScrollReveal() {
  const targets = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => observer.observe(el));
}

/* =========================================================
   NAV: background on scroll + active-link highlighting
   ========================================================= */
function initNav() {
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = document.querySelectorAll("main section[id]");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
    updateScrollProgress();
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

/* =========================================================
   SCROLL PROGRESS BAR
   ========================================================= */
function updateScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = `${percent}%`;
}

/* =========================================================
   MOBILE MENU
   ========================================================= */
function initMobileMenu() {
  const burger = document.getElementById("navBurger");
  const menu = document.getElementById("mobileMenu");

  burger.addEventListener("click", () => {
    burger.classList.toggle("is-open");
    menu.classList.toggle("is-open");
  });

  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      burger.classList.remove("is-open");
      menu.classList.remove("is-open");
    })
  );
}

/* =========================================================
   ANIMATED STAT COUNTERS (About section: "150 projects" etc.)
   ========================================================= */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          el.textContent = Math.floor(progress * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => observer.observe(el));
}

/* =========================================================
   BACK TO TOP + FOOTER YEAR
   ========================================================= */
function initFooter() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("toTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderWorkGrid();
  initScrollReveal();
  initNav();
  initMobileMenu();
  initCounters();
  initFooter();
});
