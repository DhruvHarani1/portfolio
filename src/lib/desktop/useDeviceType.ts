"use client";

import { useEffect, useState } from "react";

export type DeviceType = "desktop" | "ios" | "android";

/**
 * Picks the shell to render: the Windows-style desktop for anything
 * wide enough to use it, or a native-feeling phone home screen (iOS or
 * Android chrome, detected from the user agent) below the breakpoint.
 */
export function useDeviceType(): DeviceType {
  const [type, setType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");

    function update() {
      if (!mq.matches) {
        setType("desktop");
        return;
      }
      const ua = navigator.userAgent;
      if (/iPhone|iPad|iPod/i.test(ua)) {
        setType("ios");
      } else {
        // Android and any other touch-mobile UA fall back to the
        // Android-styled shell — it's the more OS-agnostic of the two.
        setType("android");
      }
    }

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return type;
}
