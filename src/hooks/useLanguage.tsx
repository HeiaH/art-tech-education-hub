
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../utils/translations';

type LanguageContextType = {
  language: 'en' | 'de';
  setLanguage: (lang: 'en' | 'de') => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to determine browser language, fallback to 'en'
  const getBrowserLanguage = (): 'en' | 'de' => {
    const browserLang = navigator.language.substring(0, 2);
    return browserLang === 'de' ? 'de' : 'en';
  };

  // Try to get saved language from localStorage, or use browser language
  const getSavedLanguage = (): 'en' | 'de' => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'de';
    return savedLanguage || getBrowserLanguage();
  };

  const [language, setLanguageState] = useState<'en' | 'de'>(getSavedLanguage);

  // Set language and save to localStorage
  const setLanguage = (lang: 'en' | 'de') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translate function
  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  // Set language on initial load
  useEffect(() => {
    setLanguageState(getSavedLanguage());
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
