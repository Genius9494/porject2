"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

type Lang = "en" | "ar";

const translations: Record<Lang, Record<string, string>> = {
  en,
  ar,
};

const TranslationContext = createContext<{
  t: (key: string) => string;
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  t: (key: string) => key,
  lang: "en",
  setLang: () => {},
});

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Lang;
    if (savedLang === "en" || savedLang === "ar") {
      setLangState(savedLang);
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const t = (key: string) => {
    return translations[lang]?.[key] ?? key;
  };

  return (
    <TranslationContext.Provider value={{ t, lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => useContext(TranslationContext);
