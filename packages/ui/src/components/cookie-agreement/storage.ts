import type { ConsentStore, CookieAgreementRecord } from "./types";

export const DEFAULT_COOKIE_NAME = "gno_cookie_consent";
export const DEFAULT_RETENTION_DAYS = 365;

function isCookieAgreementRecord(value: unknown): value is CookieAgreementRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return record.status === "accepted"
    && typeof record.policyVersion === "string"
    && typeof record.decidedAt === "string"
    && (record.expiresAt === undefined || typeof record.expiresAt === "string");
}

function parseCookieValue(value: string): CookieAgreementRecord | null {
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(value));
    return isCookieAgreementRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
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
