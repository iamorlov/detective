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
  questions: string;
  questionsLimit: string;
  questionsLimitReached: string;
  questionsLimitReachedMessage: string;
  questionsLimitReachedMessageDetails: string;
  questionsLimitReachedMessageDetails2?: string;


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

  // GameIntro
  caseFile: string;
  theInvestigationBegins: string;
  victim: string;
  weapon: string;
  location: string;
  timeOfDeath: string;
  caseBackground: string;
  suspects: string;
  suspectsDescription: string;
  startInterrogation: string;

  // Investigation
  activeInvestigation: string;
  selectSuspect: string;
  chooseToInterrogate: string;
  viewSuspects: string;
  askQuestion: string;
  arrestSuspect: string;
  arrestNow: string;
  caseDetails: string;
  you: string;
  confirmArrest: string;
  warning: string;
  arrestWarningMessage: string;
  continueInvestigation: string;
  noGoingBack: string;
  yearsOld: string;
  pauseMusic: string;
  playMusic: string;

  // Game result
  caseClosed: string;
  justiceDenied: string;
  theTruthRevealed: string;
  motive: string;
  falseAlibi: string;
  justiceServed: string;
  theKillerWalksFree: string;
  justiceServedMessage: string;
  killerWalksFreeMessage: string;
  investigationSummary: string;
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
    tagline: "Where truth ends, our work begins. In the darkness of the city, we are your light.",
    beginInvestigation: "Begin investigation",
    generatingNewCase: "Generating new case...",
    pleasewait: "Please wait...",
    ask: "Ask",
    askSpecificQuestions: "Ask specific questions to uncover the truth.",
    chooseInterrogate: "Choose someone to interrogate from the list",
    questions: "questions asked",
    questionsLimit: "You can't ask more questions",
    questionsLimitReached: "Questions limit reached",
    questionsLimitReachedMessage: "You have asked the maximum number of questions to ",
    questionsLimitReachedMessageDetails: "You can no longer interrogate this suspect.",
    questionsLimitReachedMessageDetails2: "Review the conversation or select another suspect to continue your investigation.",

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

    // GameIntro
    caseFile: "Details",
    theInvestigationBegins: "The Investigation begins",
    victim: "Victim",
    weapon: "Weapon",
    location: "Location",
    timeOfDeath: "Time of Death",
    caseBackground: "Case Background",
    suspects: "Suspects",
    suspectsDescription: "individuals were present at the scene. Question them carefully - one of them is the killer.",
    startInterrogation: "Start Interrogation",

    activeInvestigation: "ACTIVE INVESTIGATION",
    selectSuspect: "Select a suspect",
    chooseToInterrogate: "Choose someone to interrogate from the list",
    viewSuspects: "View Suspects",
    askQuestion: "Ask a question...",
    arrestSuspect: "ARREST SUSPECT",
    arrestNow: "Arrest Now",
    caseDetails: "Details",
    you: "You",
    confirmArrest: "CONFIRM ARREST",
    warning: "WARNING",
    arrestWarningMessage: "You are about to arrest {name} for murder. This action will close the case permanently. Are you certain you have enough evidence?",
    continueInvestigation: "Continue Investigation",
    noGoingBack: "Once you make this accusation, there's no going back.",
    yearsOld: "years old",
    pauseMusic: "Pause music",
    playMusic: "Play music",

    // Game result
    caseClosed: "Case Closed",
    justiceDenied: "Justice Denied",
    theTruthRevealed: "Final report",
    motive: "Motive",
    falseAlibi: "False alibi",
    justiceServed: "Justice served",
    theKillerWalksFree: "The killer walks free",
    justiceServedMessage: "Through careful investigation and sharp deduction, you exposed the lies and brought the truth to light. Another case closed in the shadows of the city.",
    killerWalksFreeMessage: "The darkness claimed another victory. An innocent soul bears the blame while the real killer disappears into the night, leaving only questions behind.",
    investigationSummary: "Investigation summary",
    questionsAsked: "Questions asked",
    startNewInvestigation: "Start new investigation",

    musicBy: "Music by",
    from: "from",
    language: "Language"
  },

  ru: {
    title: "NOIRE",
    detectiveAgency: "Детективное Агентство",
    tagline: "Где кончается правда, начинается наша работа. В темноте города — мы ваш свет",
    beginInvestigation: "Начать расследование",
    generatingNewCase: "Открываем новое дело...",
    pleasewait: "Пожалуйста, подождите...",
    ask: "Спросить",
    askSpecificQuestions: "Задайте конкретные вопросы, чтобы раскрыть правду.",
    chooseInterrogate: "Выберите кого допросить из списка",
    questions: "вопросов задано",
    questionsLimit: "Вы не можете задать больше вопросов",
    questionsLimitReached: "Достигнут лимит вопросов",
    questionsLimitReachedMessage: "Вы задали максимальное количество вопросов ",
    questionsLimitReachedMessageDetails: "Вы больше не можете допросить этого подозреваемого.",
    questionsLimitReachedMessageDetails2: "Просмотрите разговор или выберите другого подозреваемого, чтобы продолжить расследование.",

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

    // GameIntro
    caseFile: "Детали",
    theInvestigationBegins: "Расследование начинается",
    victim: "Жертва",
    weapon: "Орудие",
    location: "Место",
    timeOfDeath: "Время Смерти",
    caseBackground: "Обстоятельства Дела",
    suspects: "Подозреваемые",
    suspectsDescription: "человек присутствовали на месте происшествия. Допросите их осторожно - один из них убийца.",
    startInterrogation: "Начать Допрос",

    activeInvestigation: "РАССЛЕДОВАНИЕ",
    selectSuspect: "Выберите подозреваемого",
    chooseToInterrogate: "Выберите кого допросить из списка",
    viewSuspects: "Показать Подозреваемых",
    askQuestion: "Задайте вопрос...",
    arrestSuspect: "АРЕСТОВАТЬ",
    arrestNow: "Арестовать",
    caseDetails: "Детали",
    you: "Вы",
    confirmArrest: "ПОДТВЕРДИТЬ АРЕСТ",
    warning: "ПРЕДУПРЕЖДЕНИЕ",
    arrestWarningMessage: "Вы собираетесь арестовать {name} за убийство. Это действие навсегда закроет дело. Уверены ли вы, что у вас достаточно улик?",
    continueInvestigation: "Продолжить Расследование",
    noGoingBack: "После обвинения пути назад не будет.",
    yearsOld: "лет",
    pauseMusic: "Приостановить музыку",
    playMusic: "Включить музыку",

    // Game result
    caseClosed: "Дело Закрыто",
    justiceDenied: "Дело Провалено",
    theTruthRevealed: "Финальный отчёт",
    motive: "Мотив",
    falseAlibi: "Ложное алиби",
    justiceServed: "Справедливость восторжествовала",
    theKillerWalksFree: "Убийца остался на свободе",
    justiceServedMessage: "Благодаря тщательному расследованию и острой дедукции вы разоблачили ложь и пролили свет на правду. Ещё одно дело закрыто в тенях города.",
    killerWalksFreeMessage: "Тьма одержала очередную победу. Невинная душа несёт вину, пока настоящий убийца исчезает в ночи, оставляя лишь вопросы.",
    investigationSummary: "Сводка расследования",
    questionsAsked: "Задано вопросов",
    startNewInvestigation: "Начать новое расследование",

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