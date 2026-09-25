"use client";

import { useEffect, useState } from "react";

interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
}

interface BatteryState {
  supported: boolean;
  level: number | null;
  charging: boolean;
}

/**
 * Reads the real device battery via the (Chromium-only, deprecated
 * elsewhere) Battery Status API. Firefox and Safari never expose this —
 * `supported` stays false there, and callers should hide the UI rather
 * than show fake data.
 */
export function useBattery(): BatteryState {
  const [state, setState] = useState<BatteryState>({
    supported: true,
    level: null,
    charging: false,
  });

  useEffect(() => {
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<BatteryManager>;
    };
    let battery: BatteryManager | null = null;
    let cancelled = false;

    if (!nav.getBattery) {
      const timeout = setTimeout(
        () => setState((s) => ({ ...s, supported: false })),
        0
      );
      return () => clearTimeout(timeout);
    }

    function handleUpdate() {
      if (!battery || cancelled) return;
      setState({
        supported: true,
        level: Math.round(battery.level * 100),
        charging: battery.charging,
      });
    }

    nav
      .getBattery()
      .then((b) => {
        if (cancelled) return;
        battery = b;
        handleUpdate();
        b.addEventListener("levelchange", handleUpdate);
        b.addEventListener("chargingchange", handleUpdate);
      })
      .catch(() => setState((s) => ({ ...s, supported: false })));

    return () => {
      cancelled = true;
      battery?.removeEventListener("levelchange", handleUpdate);
      battery?.removeEventListener("chargingchange", handleUpdate);
    };
  }, []);

  return state;
}
