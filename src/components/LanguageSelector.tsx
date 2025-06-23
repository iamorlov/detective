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
    { code: 'es' as Language, name: 'ES' },
    { code: 'de' as Language, name: 'DE' },
    { code: 'pl' as Language, name: 'PL' },
    { code: 'uk' as Language, name: 'UA' },
    { code: 'ru' as Language, name: 'RU' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-600/50 text-blue-300/80 hover:text-blue-300 text-sm font-medium tracking-wide transition-all duration-200 rounded-full border border-slate-600/30 hover:border-slate-500/50 backdrop-blur-sm shadow-lg"
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
          <div 
            className="fixed inset-0 z-40 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute top-full right-0 mt-2 min-w-[80px] bg-slate-800 border border-slate-600/30 rounded-2xl shadow-2xl backdrop-blur-sm z-50 overflow-hidden">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`cursor-pointer w-full px-4 py-3 text-center transition-all duration-200 hover:bg-slate-700/50 ${
                  currentLanguage === language.code
                    ? 'bg-blue-600/20 text-blue-300'
                    : 'text-slate-300 hover:text-slate-200'
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