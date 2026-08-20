/* Shared page utilities and progressive enhancements. */

function initializeCopyButtons() {
  document.querySelectorAll("pre > code").forEach((code, index) => {
    const pre = code.parentElement;

    if (!pre || pre.parentElement?.classList.contains("code-block")) {
      return;
    }

    const wrapper = document.createElement("div");
    const toolbar = document.createElement("div");
    const label = document.createElement("span");
    const button = document.createElement("button");

    wrapper.className = "code-block";
    toolbar.className = "code-toolbar";
    label.textContent = "Code example";

    button.type = "button";
    button.className = "copy-button";
    button.textContent = "Copy";
    button.setAttribute(
      "aria-label",
      `Copy code example ${index + 1}`
    );

    pre.replaceWith(wrapper);
    wrapper.append(pre);
    toolbar.append(label, button);
    wrapper.prepend(toolbar);

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
      } catch {
        // Legacy fallback keeps local/file previews useful when the
        // Clipboard API is unavailable.
        const textarea = document.createElement("textarea");
        textarea.value = code.textContent;
        document.body.append(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      const originalLabel = button.textContent;

      button.textContent = "Copied!";
      button.classList.add("is-copied");

      window.setTimeout(() => {
        button.textContent = originalLabel;
        button.classList.remove("is-copied");
      }, 1600);
    });
  });
}

function initializeSiteLoader() {
  const loader = document.getElementById("site-loader");

  if (!loader) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const hideLoader = () => {
    loader.classList.add("is-hidden");

    window.setTimeout(
      () => loader.remove(),
      prefersReducedMotion ? 0 : 420
    );
  };

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader, { once: true });
  }

  // Never let a slow third-party resource trap the user behind
  // a decorative loading screen.
  window.setTimeout(hideLoader, 2200);
}

function initializeNotFoundPage() {
  if (body.dataset.page !== "404") {
    return;
  }

  const path = document.getElementById("not-found-path");
  const searchButton = document.getElementById("not-found-search");

  if (path) {
    const requestedPath =
      window.location.pathname +
      window.location.search +
      window.location.hash;

    path.textContent = requestedPath
      ? `Requested path: ${requestedPath}`
      : "";
  }

  searchButton?.addEventListener("click", () => {
    document.getElementById("global-search-button")?.click();

    requestAnimationFrame(() => {
      document.getElementById("global-search-input")?.focus();
    });
  });
}

function initializeScrollProgress() {
  const progressBar = document.getElementById("scroll-progress-bar");

  if (!progressBar) {
    return;
  }

  const updateProgress = () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
      ? Math.min(window.scrollY / scrollableHeight, 1)
      : 0;

    progressBar.style.transform = `scaleX(${progress})`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  updateProgress();
}

function initializeBackToTop() {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "back-to-top";
  button.setAttribute("aria-label", "Back to top");
  button.innerHTML = `
    <span aria-hidden="true">↑</span>
    <span>Top</span>
  `;

  // Shared controls are created once here instead of repeated in every page.
  document.body.append(button);

  const updateVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 8);
  };

  button.addEventListener("click", () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
}

function initializeRevealAnimations() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const items = document.querySelectorAll(
    ".reference-card, .reference-section, .pattern-section, .intro-panel"
  );

  items.forEach((item) => item.classList.add("reveal-item"));

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  items.forEach((item) => observer.observe(item));
}
