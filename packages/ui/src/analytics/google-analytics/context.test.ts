import { describe, expect, it } from "vitest";
import { cloneContext, createDefaults, replaceContext, updateContext } from "./context";

const definitions = {
  section: { default: "" },
  subsection: { default: "" },
  portal_section: { default: "News" },
  article_series: { default: "" },
};

describe("Google Analytics context", () => {
  it("creates defaults and normalizes section values without mutation", () => {
    expect(createDefaults(definitions)).toEqual({ section: "", subsection: "", portal_section: "News", article_series: "" });
    const input = { section: "cbb", article_series: "Series" };
    expect(replaceContext(definitions, input)).toEqual({ section: "Community Bulletin Board", subsection: "", portal_section: "News", article_series: "Series" });
    expect(input).toEqual({ section: "cbb", article_series: "Series" });
  });

  it("updates only registered keys and returns isolated snapshots", () => {
    const current = replaceContext(definitions, { section: "News", article_series: "A" });
    const next = updateContext(definitions, current, { subsection: "Top stories", unknown: "ignored" });
    const snapshot = cloneContext(next) as Record<string, string>;
    snapshot.section = "mutated";
    expect(next.section).toBe("News");
    expect(next.subsection).toBe("Top Stories");
    expect(next).not.toHaveProperty("unknown");
  });
});
