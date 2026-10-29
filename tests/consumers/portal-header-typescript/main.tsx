import { CookieAgreement, PortalHeader, type PortalHeaderNavigationItem } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

const navigation: PortalHeaderNavigationItem[] = [
  { id: "home", label: "Home", href: "/", current: true },
];

export function TypeScriptPortalHeaderFixture() {
  return <PortalHeader primaryNavigation={navigation} socialPreset="news" />;
}

export function TypeScriptCookieAgreementFixture() {
  return <CookieAgreement policyVersion="2026-01" seal={null} />;
}
