/* =========================================================
   Web Development Reference
   Site-wide light/dark theme behavior
   ========================================================= */

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.dataset.theme = ["dark", "light"].includes(savedTheme) ? savedTheme : systemTheme;

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  updateThemeButton(toggle);
  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", root.dataset.theme);
    updateThemeButton(toggle);
  });
}

function updateThemeButton(toggle) {
  const isDark = root.dataset.theme === "dark";

  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.setAttribute("title", isDark ? "Use light theme" : "Use dark theme");
}

/* ---------- Page search ---------- */
