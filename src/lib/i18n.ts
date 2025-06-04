export type Language = 'en' | 'ru' | 'uk';

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
      creatingScene: "Generating the crime scene...",
      generatingSuspects: "Creating suspects...",
      weavingMystery: "Adding the victim...",
      settingAlibis: "Setting alibis...",
      plantingEvidence: "Placing evidence...",
      craftingTwist: "Creating a plot twist...",
      buildingNarrative: "Writing the narrative...",
      preparingInvestigation: "Preparing the investigation...",
      assemblingClues: "Making a cup of coffee...",
      finalizingDetails: "Finalizing the details..."
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
    justiceServedMessage: "Through careful investigation and sharp deduction, you exposed the lies and brought the truth to light.",
    killerWalksFreeMessage: "Justice has not been served. An innocent soul bears the blame, while the real killer disappears into the night, leaving only questions behind.",
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
      creatingScene: "Генерируем место преступления...",
      generatingSuspects: "Создаём подозреваемых...",
      weavingMystery: "Добавляем жертву...",
      settingAlibis: "Прописываем алиби...",
      plantingEvidence: "Размещаем улики...",
      craftingTwist: "Создаём сюжетный поворот...",
      buildingNarrative: "Прописываем повествование...",
      preparingInvestigation: "Подготавливаем расследование...",
      assemblingClues: "Завариваем чашечку кофе...",
      finalizingDetails: "Завершаем детали..."
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
    justiceServedMessage: "Благодаря тщательному расследованию и острой дедукции вы разоблачили ложь и пролили свет на правду.",
    killerWalksFreeMessage: "Правосудие не свершилось. Невинная душа несёт вину, пока настоящий убийца исчезает в ночи, оставляя лишь вопросы.",
    investigationSummary: "Сводка расследования",
    questionsAsked: "Задано вопросов",
    startNewInvestigation: "Начать новое расследование",

    musicBy: "Музыка",
    from: "от",
    language: "Язык"
  },

  uk: {
    title: "NOIRE",
    detectiveAgency: "Детективне Агентство",
    tagline: "Де закінчується правда, починається наша робота. В темряві міста — ми ваше світло",
    beginInvestigation: "Почати розслідування",
    generatingNewCase: "Відкриваємо нову справу...",
    pleasewait: "Будь ласка, зачекайте...",
    ask: "Запитати",
    askSpecificQuestions: "Поставте конкретні питання, щоб розкрити правду.",
    chooseInterrogate: "Виберіть кого допитати зі списку",
    questions: "питань поставлено",
    questionsLimit: "Ви не можете поставити більше питань",
    questionsLimitReached: "Досягнуто ліміт питань",
    questionsLimitReachedMessage: "Ви поставили максимальну кількість питань ",
    questionsLimitReachedMessageDetails: "Ви більше не можете допитати цього підозрюваного.",
    questionsLimitReachedMessageDetails2: "Перегляньте розмову або виберіть іншого підозрюваного, щоб продовжити розслідування.",

    loadingSteps: {
      creatingScene: "Генеруємо місце злочину...",
      generatingSuspects: "Створюємо підозрюваних...",
      weavingMystery: "Додаємо жертву...",
      settingAlibis: "Прописуємо алібі...",
      plantingEvidence: "Розміщуємо докази...",
      craftingTwist: "Створюємо сюжетний поворот...",
      buildingNarrative: "Прописуємо оповідання...",
      preparingInvestigation: "Готуємо розслідування...",
      assemblingClues: "Заварюємо чашечку кави...",
      finalizingDetails: "Завершуємо деталі..."
    },

    // GameIntro
    caseFile: "Деталі",
    theInvestigationBegins: "Розслідування починається",
    victim: "Жертва",
    weapon: "Знаряддя",
    location: "Місце",
    timeOfDeath: "Час Смерті",
    caseBackground: "Обставини Справи",
    suspects: "Підозрювані",
    suspectsDescription: "осіб були присутні на місці події. Допитайте їх обережно - один з них убивця.",
    startInterrogation: "Почати Допит",

    activeInvestigation: "РОЗСЛІДУВАННЯ",
    selectSuspect: "Оберіть підозрюваного",
    chooseToInterrogate: "Оберіть кого допитати зі списку",
    viewSuspects: "Показати Підозрюваних",
    askQuestion: "Поставте питання...",
    arrestSuspect: "ЗААРЕШТУВАТИ",
    arrestNow: "Заарештувати",
    caseDetails: "Деталі",
    you: "Ви",
    confirmArrest: "ПІДТВЕРДИТИ АРЕШТ",
    warning: "ПОПЕРЕДЖЕННЯ",
    arrestWarningMessage: "Ви збираєтеся заарештувати {name} за вбивство. Ця дія назавжди закриє справу. Ви впевнені, що у вас достатньо доказів?",
    continueInvestigation: "Продовжити Розслідування",
    noGoingBack: "Після звинувачення шляху назад не буде.",
    yearsOld: "років",
    pauseMusic: "Призупинити музику",
    playMusic: "Увімкнути музику",

    // Game result
    caseClosed: "Справу Закрито",
    justiceDenied: "Справу Провалено",
    theTruthRevealed: "Фінальний звіт",
    motive: "Мотив",
    falseAlibi: "Хибне алібі",
    justiceServed: "Справедливість перемогла",
    theKillerWalksFree: "Вбивця залишився на волі",
    justiceServedMessage: "Завдяки ретельному розслідуванню та гострій дедукції ви викрили брехню і пролили світло на правду.",
    killerWalksFreeMessage: "Правосуддя не відбулося. Невинна душа несе провину, поки справжній вбивця зникає в ночі, залишаючи лише питання.",
    investigationSummary: "Підсумок розслідування",
    questionsAsked: "Поставлено питань",
    startNewInvestigation: "Почати нове розслідування",

    musicBy: "Музика",
    from: "від",
    language: "Мова"
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
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru' || savedLanguage === 'uk')) {
        this.currentLanguage = savedLanguage;
      }
    }
  }
}