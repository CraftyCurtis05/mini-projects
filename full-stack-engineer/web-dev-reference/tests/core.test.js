// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { loadScript } from "./helpers.js";

describe("shared utilities", () => {
  beforeEach(() => {
    document.body.dataset.page = "home";
    localStorage.clear();
    window.SEARCH_INDEX = [];
    loadScript("assets/js/core.js");
  });

  it("escapes HTML before inserting user-visible text", () => {
    expect(escapeHTML(`<a title="x">Tom & Jerry</a>`)).toBe(
      "&lt;a title=&quot;x&quot;&gt;Tom &amp; Jerry&lt;/a&gt;"
    );
  });

  it("starts with an empty favorites collection", () => {
    expect(getFavorites()).toEqual([]);
  });
});
