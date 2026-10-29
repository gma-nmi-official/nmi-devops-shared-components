import React from "react";
import { AdSlot } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

const provider = {
  createSlot(request) {
    return { id: request.elementId };
  },
  destroySlot() {},
};

export function JavaScriptAdSlotFixture() {
  return React.createElement(AdSlot, {
    enabled: true,
    provider,
    config: {
      key: "sidebar-mrec",
      format: "mrec",
      reservedSize: [300, 250],
      rules: [{ minWidth: 0, adUnitPath: "/123/news/sidebar", sizes: [[300, 250]] }],
    },
  });
}
