"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANG,
  translate,
  type Lang,
} from "@/lib/i18n";

type LanguageCtx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
};

const Ctx = createContext<LanguageCtx | null>(null);

const STORAGE_KEY = "portfolio-lang";

// Inlined in <head> before hydration so the document language is English-only,
// even if an older bilingual version saved a different preference.
export const LANG_BOOT_SCRIPT = `(function(){try{localStorage.removeItem(${JSON.stringify(STORAGE_KEY)});}catch(e){}document.documentElement.lang=${JSON.stringify(DEFAULT_LANG)};})();`;

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    // Sync React state with whatever the boot script already applied to the
    // <html> element. No-op if the boot script didn't find a stored pref.
    const domLang = document.documentElement.lang;
    if (domLang === DEFAULT_LANG && domLang !== lang) {
      setLangState(domLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = useCallback((next: Lang) => {
    void next;
    setLangState(DEFAULT_LANG);
    document.documentElement.lang = DEFAULT_LANG;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore - state still updates in-memory.
    }
  }, []);

  const t = useCallback((path: string) => translate(path, lang), [lang]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLanguage(): LanguageCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Safe fallback outside the provider: default language, no-op setter.
    return {
      lang: DEFAULT_LANG,
      setLang: () => {},
      t: (path) => translate(path, DEFAULT_LANG),
    };
  }
  return ctx;
}
