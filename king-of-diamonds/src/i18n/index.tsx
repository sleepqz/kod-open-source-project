import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { TRANSLATIONS, type LangCode, type T } from "./translations";

interface LangCtx {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: T;
}

const LangContext = createContext<LangCtx | null>(null);

const STORAGE_KEY = "beauty-contest-lang";

function detect(): LangCode {
  const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
  if (saved && TRANSLATIONS[saved]) return saved;
  const nav = navigator.language.slice(0, 2).toLowerCase();
  const map: Record<string, LangCode> = { fr: "fr", en: "en", pl: "pl", es: "es", ru: "ru", ar: "ar" };
  return map[nav] ?? "fr";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(detect);

  function setLang(l: LangCode) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.setAttribute("dir", t.dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang, t.dir]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
