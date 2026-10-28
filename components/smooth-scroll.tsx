"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

// Wraps the document scroll in Lenis for inertial smooth-scrolling, the same
// "premium" feel Naresh's portfolio uses. `root` makes Lenis hijack window
// scroll instead of a child container, so window.scrollY values stay correct
// for our IntersectionObserver-based section tracking.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: reducedMotion ? 0 : 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
