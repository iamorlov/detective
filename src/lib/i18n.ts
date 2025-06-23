import { Language, Translations } from './types';
import { en } from './translations/en';
import { ru } from './translations/ru';
import { uk } from './translations/uk';
import { es } from './translations/es';
import { de } from './translations/de';
import { pl } from './translations/pl';

export type { Language, Translations };

export const translations: Record<Language, Translations> = {
  en,
  ru,
  uk,
  es,
  de,
  pl
};

export class I18n {
  private static instance: I18n;
  private currentLanguage: Language = 'en';
  private listeners: Array<(lang: Language) => void> = [];

  static getInstance(): I18n {
    if (!I18n.instance) {
      I18n.instance = new I18n();
    }
    return I18n.instance;
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  setLanguage(language: Language): void {
    this.currentLanguage = language;
    if (typeof window !== 'undefined') {
      localStorage.setItem('detective-game-language', language);
    }
    this.listeners.forEach(listener => listener(language));
  }

  getTranslations(): Translations {
    return translations[this.currentLanguage];
  }

  subscribe(listener: (lang: Language) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  initialize(): void {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('detective-game-language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru' || savedLanguage === 'uk' || savedLanguage === 'es' || savedLanguage === 'de' || savedLanguage === 'pl')) {
        this.currentLanguage = savedLanguage;
      }
    }
  }
}