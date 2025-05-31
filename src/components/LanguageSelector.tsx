'use client';

import { useState, useEffect } from 'react';
import { I18n, Language } from '@/lib/i18n';

interface LanguageSelectorProps {
  className?: string;
}

export default function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isOpen, setIsOpen] = useState(false);
  const i18n = I18n.getInstance();

  useEffect(() => {
    i18n.initialize();
    setCurrentLanguage(i18n.getCurrentLanguage());

    const unsubscribe = i18n.subscribe((lang) => {
      setCurrentLanguage(lang);
    });

    return unsubscribe;
  }, [i18n]);

  const handleLanguageChange = (language: Language) => {
    i18n.setLanguage(language);
    setIsOpen(false);
  };

  const languages = [
    { code: 'en' as Language, name: 'EN' },
    { code: 'ru' as Language, name: 'RU' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center justify-between w-16 px-3 py-2 bg-black/30 hover:bg-black/50 text-amber-400/80 hover:text-amber-400 text-sm font-medium tracking-wide transition-all duration-200 rounded-lg border border-amber-500/30 hover:border-amber-500/50 backdrop-blur-sm shadow-lg"
      >
        <span>{currentLang?.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-16 bg-black/90 border border-amber-500/30 rounded-lg shadow-2xl backdrop-blur-sm z-50">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`cursor-pointer w-full px-3 py-3 text-center transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  currentLanguage === language.code
                    ? 'bg-amber-600/20 text-amber-400'
                    : 'text-gray-300 hover:bg-amber-600/10 hover:text-amber-400'
                }`}
              >
                <span className="text-sm font-medium">{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}