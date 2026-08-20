"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import zh from "./data/site-data.json";
import en from "./data/site-data-en.json";

export type Lang = "zh" | "en";

type SiteData = typeof zh;

const dataMap: Record<Lang, SiteData> = { zh, en };

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  data: SiteData;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  data: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("lang");
    if (saved === "zh" || saved === "en") {
      setLangState(saved);
    }
    // sync <html lang>
    document.documentElement.lang = saved === "zh" ? "zh-CN" : "en";
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lang", l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  };

  const toggleLang = () => setLang(lang === "zh" ? "en" : "zh");

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggleLang, data: dataMap[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useSiteData(): SiteData {
  return useContext(LanguageContext).data;
}

export function useLanguage() {
  const { lang, setLang, toggleLang } = useContext(LanguageContext);
  return { lang, setLang, toggleLang };
}
