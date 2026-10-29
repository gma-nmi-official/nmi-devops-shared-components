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
  const [ruleActive, setRuleActive] = useState<boolean | undefined>(undefined);
  const genRef = useRef(0);
  const queueRef = useRef<Promise<void>>(Promise.resolve());
  const cancelRef = useRef<(() => void) | undefined>(undefined);
  const cleanupRef = useRef<object | undefined>(undefined);
  const cfgRef = useRef(config);
  const stateRef = useRef(onStateChange);
  const slotRef = useRef<{
    provider: AdProvider;
    slot: AdProviderSlot;
  } | undefined>(undefined);

  let configSignature: string;
  try {
    configSignature = getAdPlacementConfigSignature(config);
  } catch (error) {
    configSignature = `invalid:${error instanceof Error ? error.message : "configuration"}`;
  }

  useEffect(() => {
    cfgRef.current = config;
  }, [config]);

  useEffect(() => {
    stateRef.current = onStateChange;
  }, [onStateChange]);

  useEffect(() => {
    cleanupRef.current = undefined;
    const activeConfig = cfgRef.current;
    const generation = ++genRef.current;
    let cancelled = false;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let signature: string | undefined;

    const enqueue = (operation: () => Promise<void>) => {
      const queued = queueRef.current.then(operation, operation);
      queueRef.current = queued.catch(() => undefined);
      return queued;
    };

    const isCurrent = () => !cancelled && genRef.current === generation;
    const emit = (nextState: AdSlotState, error?: unknown) => {
      if (!isCurrent()) {
        return;
      }
      setState(nextState);
      stateRef.current?.(nextState, error);
    };
    const reportCleanupError = (error: unknown) => {
      if (isCurrent()) {
        setState("error");
      }
      try {
        stateRef.current?.("error", error);
      } catch {
        // A consumer callback must not prevent the owned slot cleanup retry.
      }
    };
    const destroy = async () => {
      const owned = slotRef.current;
      if (!owned) {
        return;
      }

      let lastError: unknown;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          await owned.provider.destroySlot(owned.slot);
          if (slotRef.current === owned) {
            slotRef.current = undefined;
          }
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
        if (!isCurrent()) {
          return;
        }
        assertValidAdPlacementConfig(activeConfig);
        if (!enabled) {
          await destroy();
          if (!isCurrent()) {
            return;
          }
          signature = "disabled-by-prop";
          setRuleActive(false);
          emit("idle");
          return;
        }

        const rule = resolveAdResponsiveRule(activeConfig, window.innerWidth);
        const nextSignature = getAdResponsiveRuleSignature(rule);
        if (nextSignature === signature) {
          return;
        }

        await destroy();
        if (!isCurrent()) {
          return;
        }
        signature = nextSignature;

        if (!isActiveAdResponsiveRule(rule)) {
          setRuleActive(false);
          emit("idle");
          return;
        }

        setRuleActive(true);
        emit("loading");
        const requestGen = genRef.current;
        let cancel!: () => void;
        const cancelled = new Promise<void>((resolve) => {
          cancel = resolve;
        });
        cancelRef.current = cancel;
        const request = Promise.resolve().then(() => provider.createSlot({
          elementId,
          adUnitPath: rule.adUnitPath,
          sizes: rule.sizes,
          targeting: activeConfig.targeting ?? {},
          onStateChange: (nextState, error) => {
            if (
              isCurrent()
                && requestGen === genRef.current
                && signature === nextSignature
            ) {
              emit(nextState, error);
            }
          },
        }));
        const created = await Promise.race([request, cancelled.then(() => undefined)]);
        if (cancelRef.current === cancel) {
          cancelRef.current = undefined;
        }
        if (!created) {
          void request.then((lateSlot) => {
            void Promise.resolve(provider.destroySlot(lateSlot)).catch(() => undefined);
          }, () => undefined);
          return;
        }
        slotRef.current = { provider, slot: created };

        if (!isCurrent() || requestGen !== genRef.current || signature !== nextSignature) {
          await destroy();
          return;
        }
      } catch (error) {
        if (!slotRef.current) {
          signature = undefined;
        }
        emit("error", error);
      }
    };

    const schedule = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        void enqueue(activate);
      }, RESIZE_DEBOUNCE_MS);
    };

    if (!enabled) {
      cancelRef.current?.();
      cancelRef.current = undefined;
    }
    void enqueue(activate);
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      cancelled = true;
      genRef.current += 1;
      const marker = {};
      cleanupRef.current = marker;
      queueMicrotask(() => {
        if (cleanupRef.current === marker) {
          cancelRef.current?.();
          cancelRef.current = undefined;
        }
      });
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      window.removeEventListener("resize", schedule);
      void enqueue(destroy).catch(() => undefined);
    };
  }, [configSignature, elementId, enabled, provider]);

  const emptyBehavior = config.emptyBehavior ?? "reserve";
  const collapsed = emptyBehavior === "collapse" && (state === "empty" || state === "error");
  const disabled = ruleActive === false;
  const reservedSize = config.reservedSize;
  const style = reservedSize && !collapsed && !disabled
    ? ({
      "--gno-ad-slot-width": `${reservedSize[0]}px`,
      "--gno-ad-slot-height": `${reservedSize[1]}px`,
    } as CSSProperties)
    : undefined;

  return (
    <aside
      aria-label={label}
      className={[
        "gno-ad-slot",
        `gno-ad-slot--${config.format}`,
        collapsed ? "gno-ad-slot--collapsed" : "",
        disabled ? "gno-ad-slot--disabled" : "",
        className,
      ].filter(Boolean).join(" ")}
      data-ad-format={config.format}
      data-ad-state={state}
      style={style}
    >
      <span className="gno-ad-slot__label">{label}</span>
      {state === "loading" && placeholder ? (
        <div className="gno-ad-slot__placeholder">{placeholder}</div>
      ) : null}
      <div className="gno-ad-slot__provider" id={elementId} />
    </aside>
  );
}

export { RESIZE_DEBOUNCE_MS };
