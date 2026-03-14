"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { translations, Locale, Translations } from "./translations";

type I18nContextType = {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      document.documentElement.lang = l;
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "es" : "en");
  }, [locale, setLocale]);

  return (
    <I18nContext.Provider
      value={{ locale, t: translations[locale], setLocale, toggleLocale }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
