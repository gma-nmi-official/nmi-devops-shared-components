"use client";

import Link from "next/link";
import {
  PortalHeader,
  type PortalHeaderLinkRenderProps,
} from "nmi-devops-shared-components";

function renderNextLink({ children, href, ...props }: PortalHeaderLinkRenderProps) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export function PortalHeaderPreview() {
  return (
    <PortalHeader
      brand={{ sectionLabel: "News" }}
      primaryNavigation={[{ id: "news", current: true }]}
      renderLink={renderNextLink}
      search={{
        action: "/catalog/portal-header",
        queryParam: "q",
        placeholder: "Search the synthetic catalog",
      }}
      socialPreset="news"
    />
  );
}
