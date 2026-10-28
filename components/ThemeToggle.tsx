"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "portfolio-theme";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
function getSnapshot() {
  return document.documentElement.dataset.theme === "light";
}
function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const light = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !light;
    document.documentElement.dataset.theme = next ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
    } catch {
      // Keep the toggle usable when storage is disabled.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="frost-icon !w-9 !h-9"
      aria-label={`Switch to ${light ? "dark" : "light"} theme`}
      aria-pressed={light}
      title={`Switch to ${light ? "dark" : "light"} theme`}
    >
      {light ? "☾" : "☼"}
    </button>
  );
}
