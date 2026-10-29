import axe from "axe-core";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CookieAgreement, DEFAULT_FIND_OUT_MORE_HREF, DEFAULT_SEAL_HREF } from "./cookie-agreement";
import type { ConsentStore, CookieAgreementRecord } from "./types";

afterEach(() => {
  cleanup();
  document.cookie = "gno_cookie_consent=; Max-Age=0; Path=/";
});

const acceptedRecord: CookieAgreementRecord = {
  policyVersion: "2026-01",
  status: "accepted",
  decidedAt: "2026-01-01T00:00:00.000Z",
};

describe("CookieAgreement", () => {
  it("renders the approved defaults and independent privacy destinations", async () => {
    render(<CookieAgreement policyVersion="2026-01" />);
    await waitFor(() => expect(screen.getByRole("region", { name: "Cookie notice" })).toBeInTheDocument());
    expect(screen.getByRole("region", { name: "Cookie notice" })).not.toHaveClass("gno-cookie-agreement--visible");
    expect(screen.getByRole("button", { name: "I AGREE" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FIND OUT MORE" })).toHaveAttribute("href", DEFAULT_FIND_OUT_MORE_HREF);
    expect(screen.getByRole("link", { name: "National Privacy Commission seal" })).toHaveAttribute("href", DEFAULT_SEAL_HREF);
    expect(screen.queryByRole("button", { name: "REJECT" })).not.toBeInTheDocument();
  });

  it("keeps the no-seal body in a readable layout", () => {
    const { container } = render(<CookieAgreement policyVersion="2026-01" seal={null} record={null} />);
    expect(container.querySelector(".gno-cookie-agreement__inner--no-seal")).toBeInTheDocument();
  });

  it("reveals after the configurable viewport scroll threshold", async () => {
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 1000 });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0, writable: true });
    render(<CookieAgreement policyVersion="2026-01" scrollRevealThreshold={0.2} />);
    await waitFor(() => expect(screen.getByRole("region", { name: "Cookie notice" })).toBeInTheDocument());
    const notice = screen.getByRole("region", { name: "Cookie notice" });
    expect(notice).not.toHaveClass("gno-cookie-agreement--visible");
    window.scrollY = 199;
    fireEvent.scroll(window);
    expect(notice).not.toHaveClass("gno-cookie-agreement--visible");
    window.scrollY = 200;
    fireEvent.scroll(window);
    expect(notice).toHaveClass("gno-cookie-agreement--visible");
  });

  it("hides the agreement for a current accepted record", () => {
    render(<CookieAgreement policyVersion="2026-01" record={acceptedRecord} />);
    expect(screen.queryByRole("region", { name: "Cookie notice" })).not.toBeInTheDocument();
  });

  it("shows the agreement when a controlled accepted record is reset to null", () => {
    const view = render(<CookieAgreement policyVersion="2026-01" record={acceptedRecord} />);
    expect(screen.queryByRole("region", { name: "Cookie notice" })).not.toBeInTheDocument();
    view.rerender(<CookieAgreement policyVersion="2026-01" record={null} />);
    expect(screen.getByRole("region", { name: "Cookie notice" })).toBeInTheDocument();
  });

  it("persists acceptance only after I AGREE", async () => {
    const write = vi.fn();
    const onAccepted = vi.fn();
    const store: ConsentStore = { read: () => null, write, clear: vi.fn() };
    render(<CookieAgreement onAccepted={onAccepted} policyVersion="2026-01" store={store} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "I AGREE" })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "I AGREE" }));
    await waitFor(() => expect(write).toHaveBeenCalledWith(expect.objectContaining({ policyVersion: "2026-01", status: "accepted" })));
    expect(onAccepted).toHaveBeenCalledWith(expect.objectContaining({ status: "accepted" }));
    await waitFor(() => expect(screen.queryByRole("region", { name: "Cookie notice" })).not.toBeInTheDocument());
  });

  it("uses the approved default cookie adapter when no store is supplied", async () => {
    const { unmount } = render(<CookieAgreement policyVersion="2026-01" />);
    await waitFor(() => expect(screen.getByRole("button", { name: "I AGREE" })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "I AGREE" }));
    await waitFor(() => expect(document.cookie).toContain("gno_cookie_consent="));
    unmount();
    render(<CookieAgreement policyVersion="2026-01" />);
    await waitFor(() => expect(screen.queryByRole("region", { name: "Cookie notice" })).not.toBeInTheDocument());
  });

  it("treats malformed cookies as no consent without crashing", async () => {
    document.cookie = "gno_cookie_consent=%7Bmalformed; Path=/";
    render(<CookieAgreement policyVersion="2026-01" />);
    await waitFor(() => expect(screen.getByRole("region", { name: "Cookie notice" })).toBeInTheDocument());
  });

  it("reports synchronous custom storage read failures without crashing", async () => {
    const onStorageError = vi.fn();
    const store: ConsentStore = { read: () => { throw new Error("read failed"); }, write: vi.fn(), clear: vi.fn() };
    render(<CookieAgreement onStorageError={onStorageError} policyVersion="2026-01" store={store} />);
    await waitFor(() => expect(onStorageError).toHaveBeenCalled());
    expect(screen.getByRole("region", { name: "Cookie notice" })).toBeInTheDocument();
  });

  it("dismisses only for the current session when Reject is enabled", async () => {
    const store: ConsentStore = { read: () => null, write: vi.fn(), clear: vi.fn() };
    const { unmount } = render(<CookieAgreement policyVersion="2026-01" rejectEnabled store={store} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "REJECT" })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "REJECT" }));
    expect(store.write).not.toHaveBeenCalled();
    expect(screen.queryByRole("region", { name: "Cookie notice" })).not.toBeInTheDocument();
    unmount();
    render(<CookieAgreement policyVersion="2026-01" rejectEnabled store={store} />);
    await waitFor(() => expect(screen.getByRole("region", { name: "Cookie notice" })).toBeInTheDocument());
  });

  it("does not treat navigation as consent", async () => {
    const onAccepted = vi.fn();
    render(<CookieAgreement onAccepted={onAccepted} policyVersion="2026-01" />);
    await waitFor(() => expect(screen.getByRole("link", { name: "FIND OUT MORE" })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("link", { name: "FIND OUT MORE" }));
    expect(onAccepted).not.toHaveBeenCalled();
  });

  it("does not load remote or non-local seal asset overrides", async () => {
    for (const src of ["https://cdn.example.test/seal.webp", "//cdn.example.test/seal.webp", "blob:https://example.test/id", "file:///tmp/seal.webp", "javascript:alert(1)"]) {
      const view = render(<CookieAgreement policyVersion="2026-01" seal={{ src }} />);
      await waitFor(() => expect(screen.getByRole("img", { name: "National Privacy Commission seal" })).toBeInTheDocument());
      expect(screen.getByRole("img", { name: "National Privacy Commission seal" })).not.toHaveAttribute("src", src);
      view.unmount();
    }
  });

  it("reports storage failures without hiding the agreement", async () => {
    const onStorageError = vi.fn();
    const store: ConsentStore = { read: () => null, write: () => { throw new Error("storage unavailable"); }, clear: vi.fn() };
    render(<CookieAgreement onStorageError={onStorageError} policyVersion="2026-01" store={store} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "I AGREE" })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "I AGREE" }));
    expect(onStorageError).toHaveBeenCalled();
    expect(screen.getByRole("region", { name: "Cookie notice" })).toBeInTheDocument();
  });

  it("has no serious or critical accessibility violations", async () => {
    const { container } = render(<CookieAgreement policyVersion="2026-01" />);
    const results = await axe.run(container, { resultTypes: ["violations"], rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
  });
});
