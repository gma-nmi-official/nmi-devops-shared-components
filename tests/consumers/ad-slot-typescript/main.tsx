"use client";

import { useMemo } from "react";
import { AdSlot, createGptAdProvider, type AdPlacementConfig, type GptCompatible } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

const config: AdPlacementConfig = {
  key: "article-mrec",
  format: "mrec",
  reservedSize: [300, 250],
  rules: [
    {
      minWidth: 768,
      adUnitPath: "/123/news/article-mrec",
      sizes: [[300, 250]],
    },
  ],
};

export function ArticleAd({
  googletag,
  hasAdConsent,
}: {
  googletag: GptCompatible;
  hasAdConsent: boolean;
}) {
  const provider = useMemo(
    () => createGptAdProvider({ googletag }),
    [googletag],
  );

  return <AdSlot config={config} enabled={hasAdConsent} provider={provider} />;
}
