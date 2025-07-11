'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState<any>({});

  useEffect(() => {
    // Load messages for the current locale
    const loadMessages = async () => {
      try {
        const msgs = await import(`../messages/${locale}.json`);
        setMessages(msgs.default);
      } catch (error) {
        console.error('Error loading messages:', error);
        // Fallback to English
        const msgs = await import(`../messages/en.json`);
        setMessages(msgs.default);
      }
    };

    loadMessages();
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = messages;
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 