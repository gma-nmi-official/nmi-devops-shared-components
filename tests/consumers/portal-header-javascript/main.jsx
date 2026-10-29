import React from "react";
import { CookieAgreement, PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

export function JavaScriptPortalHeaderFixture() {
  return React.createElement(PortalHeader, {
    brand: { sectionLabel: "JavaScript fixture" },
    primaryNavigation: [{ id: "home", label: "Home", href: "/" }],
    socialPreset: "none",
  });
}

export function JavaScriptCookieAgreementFixture() {
  return React.createElement(CookieAgreement, { policyVersion: "2026-01" });
}
