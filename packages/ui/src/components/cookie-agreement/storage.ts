import type { ConsentStore, CookieAgreementRecord } from "./types";

export const DEFAULT_COOKIE_NAME = "gno_cookie_consent";
export const DEFAULT_RETENTION_DAYS = 365;

function parseCookieValue(value: string): CookieAgreementRecord {
  const parsed: unknown = JSON.parse(decodeURIComponent(value));
  if (!parsed || typeof parsed !== "object" || (parsed as { status?: unknown }).status !== "accepted") {
    throw new Error("Invalid cookie agreement record");
  }
  return parsed as CookieAgreementRecord;
}

export function createCookieConsentStore(cookieName = DEFAULT_COOKIE_NAME): ConsentStore {
  return {
    read: () => {
      const prefix = `${encodeURIComponent(cookieName)}=`;
      const entry = document.cookie.split("; ").find((cookie) => cookie.startsWith(prefix));
      return entry ? parseCookieValue(entry.slice(prefix.length)) : null;
    },
    write: (record) => {
      const maxAge = DEFAULT_RETENTION_DAYS * 24 * 60 * 60;
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      const serializedRecord = encodeURIComponent(JSON.stringify(record));
      document.cookie = `${encodeURIComponent(cookieName)}=${serializedRecord}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
    },
    clear: () => {
      document.cookie = `${encodeURIComponent(cookieName)}=; Max-Age=0; Path=/; SameSite=Lax`;
    },
  };
}
