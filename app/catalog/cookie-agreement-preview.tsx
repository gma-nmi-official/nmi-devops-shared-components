"use client";

import {
  CookieAgreement,
  type ConsentStore,
} from "nmi-devops-shared-components";

const catalogStore: ConsentStore = {
  read: () => null,
  write: () => undefined,
  clear: () => undefined,
};

export function CookieAgreementPreview() {
  return (
    <CookieAgreement
      policyVersion="2026-01"
      scrollRevealThreshold={0}
      store={catalogStore}
    />
  );
}
