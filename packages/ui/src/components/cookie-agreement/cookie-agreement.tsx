"use client";

/* eslint-disable @next/next/no-img-element -- Public library code cannot depend on Next.js Image. */

import { useEffect, useId, useRef, useState } from "react";
import { createCookieConsentStore, DEFAULT_RETENTION_DAYS } from "./storage";
import type { CookieAgreementProps, CookieAgreementRecord } from "./types";

const DEFAULT_FIND_OUT_MORE_HREF = "https://www.gmanetwork.com/privacypolicy/";
const DEFAULT_SEAL_HREF = "https://www.gmanetwork.com/news/privacy-notice/";
const defaultNpcSeal = new URL("../../assets/gno-npc-seal.webp", import.meta.url).toString();
const defaultConsentStore = createCookieConsentStore();
const DEFAULT_COPY = {
  accessibleName: "Cookie notice",
  body: "We use cookies to help provide the best browsing experience. Select I AGREE to accept our use of cookies. Select FIND OUT MORE to learn how we use cookies and protect your privacy.",
  acceptLabel: "I AGREE",
  findOutMoreLabel: "FIND OUT MORE",
  rejectLabel: "REJECT",
} as const;

function isValidHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isLocalAssetSource(value: string) {
  const source = value.trim();
  return source.length > 0
    && !source.startsWith("//")
    && /^(?:\/|\.\.?\/)/.test(source)
    && !/^[a-z][a-z0-9+.-]*:/i.test(source);
}

function isCurrentAcceptedRecord(record: CookieAgreementRecord | null | undefined, policyVersion: string) {
  if (!record || record.status !== "accepted" || record.policyVersion !== policyVersion) {
    return false;
  }
  if (!record.expiresAt) {
    return true;
  }
  const expiry = Date.parse(record.expiresAt);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export function CookieAgreement({
  policyVersion,
  record,
  store,
  copy,
  rejectEnabled = false,
  scrollRevealThreshold = 0.1,
  seal,
  findOutMoreHref = DEFAULT_FIND_OUT_MORE_HREF,
  onAccepted,
  onStorageError,
  className,
}: CookieAgreementProps) {
  const [storedRecord, setStoredRecord] = useState<CookieAgreementRecord | null | undefined>(record);
  const [storageLoaded, setStorageLoaded] = useState(record !== undefined);
  const [sessionDismissed, setSessionDismissed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [saving, setSaving] = useState(false);
  const decisionVersion = useRef(0);
  const descriptionId = useId();
  const resolvedCopy = { ...DEFAULT_COPY, ...copy };
  const requestedSealSrc = seal?.src ?? defaultNpcSeal;
  const resolvedSeal = seal === null
    ? null
    : {
      src: seal?.src === undefined || isLocalAssetSource(requestedSealSrc)
        ? requestedSealSrc
        : defaultNpcSeal,
      alt: seal?.alt ?? "National Privacy Commission seal",
      href: seal?.href ?? DEFAULT_SEAL_HREF,
    };
  const safeFindOutMoreHref = isValidHttpsUrl(findOutMoreHref) ? findOutMoreHref : DEFAULT_FIND_OUT_MORE_HREF;
  const safeSealHref = resolvedSeal && isValidHttpsUrl(resolvedSeal.href)
    ? resolvedSeal.href
    : DEFAULT_SEAL_HREF;
  const visibleRecord = record !== undefined ? record : storedRecord;
  const needsDecision = !isCurrentAcceptedRecord(visibleRecord, policyVersion);
  const activeStore = store ?? defaultConsentStore;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const threshold = Math.max(0, Math.min(1, scrollRevealThreshold));
    const reveal = () => {
      if (window.scrollY >= window.innerHeight * threshold) {
        setRevealed(true);
      }
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    return () => window.removeEventListener("scroll", reveal);
  }, [scrollRevealThreshold]);

  useEffect(() => {
    if (record !== undefined) {
      return;
    }
    let active = true;
    const readVersion = decisionVersion.current;
    Promise.resolve()
      .then(() => activeStore.read())
      .then((nextRecord) => {
        if (active && readVersion === decisionVersion.current) {
          setStoredRecord(nextRecord);
          setStorageLoaded(true);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setStoredRecord(null);
          setStorageLoaded(true);
          onStorageError?.(error);
        }
      });
    return () => {
      active = false;
    };
  }, [activeStore, onStorageError, record]);

  const accept = async () => {
    decisionVersion.current += 1;
    const nextRecord: CookieAgreementRecord = {
      policyVersion,
      status: "accepted",
      decidedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + DEFAULT_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    };
    setSaving(true);
    try {
      await activeStore.write(nextRecord);
      setStoredRecord(nextRecord);
      setSessionDismissed(false);
      onAccepted?.(nextRecord);
    } catch (error: unknown) {
      onStorageError?.(error);
    } finally {
      setSaving(false);
    }
  };

  if (!storageLoaded || !needsDecision || sessionDismissed) {
    return null;
  }

  return (
    <aside
      aria-describedby={descriptionId}
      aria-label={resolvedCopy.accessibleName}
      className={[
        "gno-cookie-agreement",
        revealed ? "gno-cookie-agreement--visible" : "",
        className,
      ].filter(Boolean).join(" ")}
      role="region"
    >
      <div
        className={[
          "gno-cookie-agreement__inner",
          resolvedSeal ? "" : "gno-cookie-agreement__inner--no-seal",
        ].filter(Boolean).join(" ")}
      >
        {resolvedSeal ? (
          <a
            className="gno-cookie-agreement__seal-link"
            href={safeSealHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={resolvedSeal.alt}
              className="gno-cookie-agreement__seal"
              src={resolvedSeal.src}
            />
          </a>
        ) : null}
        <p className="gno-cookie-agreement__body" id={descriptionId}>
          {resolvedCopy.body}
        </p>
        <div className="gno-cookie-agreement__actions">
          <a
            className="gno-cookie-agreement__privacy-link"
            href={safeFindOutMoreHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            {resolvedCopy.findOutMoreLabel}
          </a>
          <button
            className="gno-cookie-agreement__accept"
            disabled={saving}
            onClick={accept}
            type="button"
          >
            {resolvedCopy.acceptLabel}
          </button>
          {rejectEnabled ? (
            <button
              className="gno-cookie-agreement__reject"
              onClick={() => setSessionDismissed(true)}
              type="button"
            >
              {resolvedCopy.rejectLabel}
            </button>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

export { DEFAULT_FIND_OUT_MORE_HREF, DEFAULT_SEAL_HREF };
