import { AdSlot, createGptAdProvider, type AdPlacementConfig, type GptCompatible } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

declare const googletag: GptCompatible;

const config: AdPlacementConfig = {
  key: "article-leaderboard",
  format: "leaderboard",
  reservedSize: [970, 250],
  rules: [
    { minWidth: 0, maxWidth: 767, enabled: false },
    { minWidth: 768, maxWidth: 1199, adUnitPath: "/123/news/tablet", sizes: [[728, 90]] },
    { minWidth: 1200, adUnitPath: "/123/news/desktop", sizes: [[970, 250], [970, 90]] },
  ],
};

const provider = createGptAdProvider({ googletag });

export function TypeScriptAdSlotFixture({ eligible }: { eligible: boolean }) {
  return <AdSlot config={config} enabled={eligible} provider={provider} />;
}
