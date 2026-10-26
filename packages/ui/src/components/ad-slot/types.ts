import type { ReactNode } from "react";

export type AdSize = readonly [width: number, height: number];
export type AdFormat = "mrec" | "leaderboard" | "custom";
export type AdTargetingValue = string | readonly string[];
export type AdTargeting = Readonly<Record<string, AdTargetingValue>>;
export type AdSlotState = "idle" | "loading" | "filled" | "empty" | "error";

export type ActiveAdResponsiveRule = {
  minWidth: number;
  maxWidth?: number;
  enabled?: true;
  adUnitPath: string;
  sizes: readonly AdSize[];
};

export type DisabledAdResponsiveRule = {
  minWidth: number;
  maxWidth?: number;
  enabled: false;
};

export type AdResponsiveRule = ActiveAdResponsiveRule | DisabledAdResponsiveRule;

type AdPlacementBase = {
  key: string;
  format: AdFormat;
  rules: readonly AdResponsiveRule[];
  targeting?: AdTargeting;
};

export type AdPlacementConfig = AdPlacementBase & (
  | { emptyBehavior?: "reserve"; reservedSize: AdSize }
  | { emptyBehavior: "collapse"; reservedSize?: AdSize }
);

export type AdProviderSlotRequest = {
  elementId: string;
  adUnitPath: string;
  sizes: readonly AdSize[];
  targeting: AdTargeting;
  onStateChange: (state: Exclude<AdSlotState, "idle">, error?: unknown) => void;
};

export type AdProviderSlot = { readonly id: string };

export interface AdProvider {
  createSlot(request: AdProviderSlotRequest): AdProviderSlot | Promise<AdProviderSlot>;
  destroySlot(slot: AdProviderSlot): void | Promise<void>;
}

export type AdSlotProps = {
  config: AdPlacementConfig;
  enabled: boolean;
  provider: AdProvider;
  label?: string;
  placeholder?: ReactNode;
  slotId?: string;
  className?: string;
  onStateChange?: (state: AdSlotState, error?: unknown) => void;
};
