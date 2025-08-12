'use client';

import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

