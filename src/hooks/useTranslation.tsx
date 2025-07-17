"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';

const translations: Record<string, Record<string, string>> = {
  en,
  hi
};

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
