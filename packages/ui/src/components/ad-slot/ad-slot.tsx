"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  assertValidAdPlacementConfig,
  getAdPlacementConfigSignature,
  getAdResponsiveRuleSignature,
  isActiveAdResponsiveRule,
  resolveAdResponsiveRule,
} from "./resolve-rule";
import type { AdProvider, AdProviderSlot, AdSlotProps, AdSlotState } from "./types";

const RESIZE_DEBOUNCE_MS = 100;

function sanitizeElementId(value: string) {
  const sanitized = value.trim().replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return sanitized || "slot";
}

export function AdSlot({
  config,
  enabled,
  provider,
  label = "Advertisement",
  placeholder,
  slotId,
  className,
  onStateChange,
}: AdSlotProps) {
  const reactId = useId();
  const elementId = useMemo(
    () => sanitizeElementId(slotId ?? `gno-ad-slot-${reactId}`),
    [reactId, slotId],
  );
  const [state, setState] = useState<AdSlotState>("idle");
  const generationRef = useRef(0);
  const lifecycleQueueRef = useRef<Promise<void>>(Promise.resolve());
  const configRef = useRef(config);
  const onStateChangeRef = useRef(onStateChange);
  const ownedSlotRef = useRef<{ provider: AdProvider; slot: AdProviderSlot } | undefined>(undefined);

  let configSignature: string;
  try {
    configSignature = getAdPlacementConfigSignature(config);
  } catch (error) {
    configSignature = `invalid:${error instanceof Error ? error.message : "configuration"}`;
  }

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);

  useEffect(() => {
    const activeConfig = configRef.current;
    const generation = ++generationRef.current;
    let cancelled = false;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let activeSignature: string | undefined;

    const enqueue = (operation: () => Promise<void>) => {
      const queued = lifecycleQueueRef.current.then(operation, operation);
      lifecycleQueueRef.current = queued.catch(() => undefined);
      return queued;
    };

    const isCurrent = () => !cancelled && generationRef.current === generation;
    const emit = (nextState: AdSlotState, error?: unknown) => {
      if (!isCurrent()) return;
      setState(nextState);
      onStateChangeRef.current?.(nextState, error);
    };
    const reportCleanupError = (error: unknown) => {
      if (isCurrent()) setState("error");
      try {
        onStateChangeRef.current?.("error", error);
      } catch {
        // A consumer callback must not prevent the owned slot cleanup retry.
      }
    };
    const destroyOwnedSlot = async () => {
      const owned = ownedSlotRef.current;
      if (!owned) return;

      let lastError: unknown;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          await owned.provider.destroySlot(owned.slot);
          if (ownedSlotRef.current === owned) ownedSlotRef.current = undefined;
          return;
        } catch (error) {
          lastError = error;
          reportCleanupError(error);
        }
      }
      throw lastError;
    };

    const activate = async () => {
      try {
        if (!isCurrent()) return;
        assertValidAdPlacementConfig(activeConfig);
        if (!enabled) {
          await destroyOwnedSlot();
          if (!isCurrent()) return;
          activeSignature = "disabled-by-prop";
          emit("idle");
          return;
        }

        const rule = resolveAdResponsiveRule(activeConfig, window.innerWidth);
        const nextSignature = getAdResponsiveRuleSignature(rule);
        if (nextSignature === activeSignature) return;

        await destroyOwnedSlot();
        if (!isCurrent()) return;
        activeSignature = nextSignature;

        if (!isActiveAdResponsiveRule(rule)) {
          emit("idle");
          return;
        }

        emit("loading");
        const requestGeneration = generationRef.current;
        const created = await provider.createSlot({
          elementId,
          adUnitPath: rule.adUnitPath,
          sizes: rule.sizes,
          targeting: activeConfig.targeting ?? {},
          onStateChange: (nextState, error) => {
            if (isCurrent() && requestGeneration === generationRef.current && activeSignature === nextSignature) emit(nextState, error);
          },
        });
        ownedSlotRef.current = { provider, slot: created };

        if (!isCurrent() || requestGeneration !== generationRef.current || activeSignature !== nextSignature) {
          await destroyOwnedSlot();
          return;
        }
      } catch (error) {
        if (!ownedSlotRef.current) activeSignature = undefined;
        emit("error", error);
      }
    };

    const schedule = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        void enqueue(activate);
      }, RESIZE_DEBOUNCE_MS);
    };

    void enqueue(activate);
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      cancelled = true;
      generationRef.current += 1;
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", schedule);
      void enqueue(destroyOwnedSlot).catch(() => undefined);
    };
  }, [configSignature, elementId, enabled, provider]);

  const emptyBehavior = config.emptyBehavior ?? "reserve";
  const collapsed = emptyBehavior === "collapse" && (state === "empty" || state === "error");
  const reservedSize = config.reservedSize;
  const style = reservedSize && !collapsed
    ? ({ "--gno-ad-slot-width": `${reservedSize[0]}px`, "--gno-ad-slot-height": `${reservedSize[1]}px` } as CSSProperties)
    : undefined;

  return (
    <aside
      aria-label={label}
      className={["gno-ad-slot", `gno-ad-slot--${config.format}`, collapsed ? "gno-ad-slot--collapsed" : "", className].filter(Boolean).join(" ")}
      data-ad-format={config.format}
      data-ad-state={state}
      style={style}
    >
      <span className="gno-ad-slot__label">{label}</span>
      {state === "loading" && placeholder ? <div className="gno-ad-slot__placeholder">{placeholder}</div> : null}
      <div className="gno-ad-slot__provider" id={elementId} />
    </aside>
  );
}

export { RESIZE_DEBOUNCE_MS };
