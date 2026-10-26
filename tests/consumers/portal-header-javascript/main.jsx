import React from "react";
import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

export function JavaScriptPortalHeaderFixture() {
  return React.createElement(PortalHeader, {
    brand: { sectionLabel: "JavaScript fixture" },
    primaryNavigation: [{ id: "home", label: "Home", href: "/" }],
    socialPreset: "none",
  });
}
