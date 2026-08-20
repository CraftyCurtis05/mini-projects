// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { loadScript } from "./helpers.js";

describe("Patterns page stateful demos", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <article data-demo-loading-card data-demo-loading-state="loading">
        <div data-demo-loading-region></div>
        <button data-demo-loading-toggle type="button">Show loaded content</button>
      </article>
      <article data-demo-theme-card data-demo-theme="light">
        <span data-demo-theme-state>Light</span>
        <button data-demo-theme-toggle type="button">Switch sample to dark</button>
      </article>
    `;
    loadScript("assets/js/patterns-ui.js");
  });

  it("toggles the loading pattern between loading and loaded states", () => {
    initializePatternDemos();
    const card = document.querySelector("[data-demo-loading-card]");
    const button = document.querySelector("[data-demo-loading-toggle]");
    const region = document.querySelector("[data-demo-loading-region]");

    button.click();
    expect(card.dataset.demoLoadingState).toBe("loaded");
    expect(region.textContent).toContain("Content loaded successfully");

    button.click();
    expect(card.dataset.demoLoadingState).toBe("loading");
    expect(region.querySelector(".demo-skeleton")).not.toBeNull();
  });

  it("keeps the live theme preview independent from the site theme", () => {
    initializePatternDemos();
    const card = document.querySelector("[data-demo-theme-card]");
    const button = document.querySelector("[data-demo-theme-toggle]");

    button.click();

    expect(card.dataset.demoTheme).toBe("dark");
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
});
