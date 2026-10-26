import { PortalHeader, type PortalHeaderNavigationItem } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

const navigation: PortalHeaderNavigationItem[] = [
  { id: "home", label: "Home", href: "/", current: true },
];

export function TypeScriptPortalHeaderFixture() {
  return <PortalHeader primaryNavigation={navigation} socialPreset="news" />;
}
