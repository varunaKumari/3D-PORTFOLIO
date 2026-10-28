"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const KeyboardScene = dynamic(() => import("@/components/FrozenKeyboard"), {
  ssr: false,
});

/** Load Three.js after the first paint so text and navigation stay responsive. */
export default function LazyKeyboard({ mobile = false }: { mobile?: boolean }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer = 0;
    const requestIdle = window.requestIdleCallback as
      | ((callback: IdleRequestCallback, options?: IdleRequestOptions) => number)
      | undefined;
    if (requestIdle) {
      const idleId = requestIdle(() => setReady(true), {
        timeout: 1200,
      });
      return () => window.cancelIdleCallback?.(idleId);
    }
    timer = window.setTimeout(() => setReady(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  return ready ? <KeyboardScene mobile={mobile} /> : null;
}
