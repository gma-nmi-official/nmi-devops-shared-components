export type CookieAgreementRecord = {
  policyVersion: string;
  status: "accepted";
  decidedAt: string;
  expiresAt?: string;
};

export type ConsentStore = {
  read: () => CookieAgreementRecord | null | Promise<CookieAgreementRecord | null>;
  write: (record: CookieAgreementRecord) => void | Promise<void>;
  clear: () => void | Promise<void>;
};

export type CookieAgreementCopy = {
  accessibleName?: string;
  body?: string;
  acceptLabel?: string;
  findOutMoreLabel?: string;
  rejectLabel?: string;
};

export type CookieAgreementSeal = {
  src?: string;
  alt?: string;
  href?: string;
};

export type CookieAgreementProps = {
  policyVersion: string;
  record?: CookieAgreementRecord | null;
  store?: ConsentStore;
  copy?: CookieAgreementCopy;
  rejectEnabled?: boolean;
  /** Fraction of the viewport height that must be scrolled before the notice slides up. */
  scrollRevealThreshold?: number;
  seal?: CookieAgreementSeal | null;
  findOutMoreHref?: string;
  onAccepted?: (record: CookieAgreementRecord) => void;
  onStorageError?: (error: unknown) => void;
  className?: string;
};
