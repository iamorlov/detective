export type Language = 'en' | 'ru';

export interface Translations {
  // Main page
  title: string;
  detectiveAgency: string;
  tagline: string;
  beginInvestigation: string;
  generatingNewCase: string;
  pleasewait: string;
  ask: string;
  askSpecificQuestions: string;
  chooseInterrogate: string;
  
  // Loading steps
  loadingSteps: {
    creatingScene: string;
    generatingSuspects: string;
    weavingMystery: string;
    settingAlibis: string;
    plantingEvidence: string;
    craftingTwist: string;
    buildingNarrative: string;
    preparingInvestigation: string;
    assemblingClues: string;
    finalizingDetails: string;
  };
  
  // Investigation
  activeInvestigation: string;
  suspects: string;
  selectSuspect: string;
  chooseToInterrogate: string;
  viewSuspects: string;
  askQuestion: string;
  arrestSuspect: string;
  arrestNow: string;
  caseDetails: string;
  you: string;
  
  // Game result
  questionsAsked: string;
  startNewInvestigation: string;
  
  // Other
  musicBy: string;
  from: string;
  language: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    title: "NOIRE",
    detectiveAgency: "Detective Agency",
    tagline: "Step into the shadows of mystery. Every clue matters. Every question reveals truth. The darkness holds secrets...",
    beginInvestigation: "Begin Investigation",
    generatingNewCase: "Generating New Case...",
    pleasewait: "Please wait while we craft your unique detective story...",
    ask: "Ask",
    askSpecificQuestions: "Ask specific questions to uncover the truth.",
    chooseInterrogate: "Choose someone to interrogate from the list",
    
    loadingSteps: {
      creatingScene: "Creating crime scene...",
      generatingSuspects: "Generating suspects...",
      weavingMystery: "Weaving the mystery...",
      settingAlibis: "Setting alibis...",
      plantingEvidence: "Planting evidence...",
      craftingTwist: "Crafting the plot twist...",
      buildingNarrative: "Building the narrative...",
      preparingInvestigation: "Preparing the investigation...",
      assemblingClues: "Assembling the clues...",
      finalizingDetails: "Finalizing details..."
    },
    
    activeInvestigation: "ACTIVE INVESTIGATION",
    suspects: "Suspects",
    selectSuspect: "Select a Suspect",
    chooseToInterrogate: "Choose someone to interrogate from the list",
    viewSuspects: "View Suspects",
    askQuestion: "Ask a question...",
    arrestSuspect: "ARREST SUSPECT",
    arrestNow: "Arrest Now",
    caseDetails: "Case Details",
    you: "You",
    
    questionsAsked: "Questions Asked",
    startNewInvestigation: "Start New Investigation",
    
    musicBy: "Music by",
    from: "from",
    language: "Language"
  },
  
  ru: {
    title: "NOIRE",
    detectiveAgency: "Детективное Агентство",
    tagline: "Окунитесь в тени тайны. Каждая улика важна. Каждый вопрос раскрывает правду. Тьма хранит секреты...",
    beginInvestigation: "Начать Расследование",
    generatingNewCase: "Создание Нового Дела...",
    pleasewait: "Пожалуйста, подождите, пока мы создаем вашу уникальную детективную историю...",
    ask: "Спросить",
    askSpecificQuestions: "Задайте конкретные вопросы, чтобы раскрыть правду.",
    chooseInterrogate: "Выберите кого допросить из списка",
    
    loadingSteps: {
      creatingScene: "Создание места преступления...",
      generatingSuspects: "Создание подозреваемых...",
      weavingMystery: "Плетение тайны...",
      settingAlibis: "Установка алиби...",
      plantingEvidence: "Размещение улик...",
      craftingTwist: "Создание сюжетного поворота...",
      buildingNarrative: "Построение повествования...",
      preparingInvestigation: "Подготовка расследования...",
      assemblingClues: "Сбор улик...",
      finalizingDetails: "Завершение деталей..."
    },
    
    activeInvestigation: "АКТИВНОЕ РАССЛЕДОВАНИЕ",
    suspects: "Подозреваемые",
    selectSuspect: "Выберите Подозреваемого",
    chooseToInterrogate: "Выберите кого допросить из списка",
    viewSuspects: "Показать Подозреваемых",
    askQuestion: "Задайте вопрос...",
    arrestSuspect: "АРЕСТОВАТЬ ПОДОЗРЕВАЕМОГО",
    arrestNow: "Арестовать",
    caseDetails: "Детали Дела",
    you: "Вы",
    
    questionsAsked: "Задано Вопросов",
    startNewInvestigation: "Начать Новое Расследование",
    
    musicBy: "Музыка",
    from: "от",
    language: "Язык"
  }
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
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
        this.currentLanguage = savedLanguage;
      }
    }
  }
}