"use client";

import {
  AdSlot,
  type AdPlacementConfig,
  type AdProvider,
} from "nmi-devops-shared-components";

const provider: AdProvider = {
  createSlot(request) {
    queueMicrotask(() => request.onStateChange("filled"));
    return { id: request.elementId };
  },
  destroySlot() {},
};

const config: AdPlacementConfig = {
  key: "catalog-mrec",
  format: "mrec",
  reservedSize: [300, 250],
  targeting: { section: "component-catalog" },
  rules: [
    {
      minWidth: 0,
      adUnitPath: "/example/catalog/mrec",
      sizes: [[300, 250]],
    },
  ],
};

export function AdSlotPreview() {
  return (
    <AdSlot
      config={config}
      enabled
      label="Example advertisement"
      provider={provider}
    />
  );
}
