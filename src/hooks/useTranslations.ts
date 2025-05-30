'use client';

import { useState, useEffect } from 'react';
import { I18n, Translations } from '@/lib/i18n';

export function useTranslations() {
  const [translations, setTranslations] = useState<Translations>(() => {
    const i18n = I18n.getInstance();
    return i18n.getTranslations();
  });

  useEffect(() => {
    const i18n = I18n.getInstance();
    i18n.initialize();
    setTranslations(i18n.getTranslations());

    const unsubscribe = i18n.subscribe(() => {
      setTranslations(i18n.getTranslations());
    });

    return unsubscribe;
  }, []);

  return translations;
}