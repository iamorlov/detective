export type Language = 'en' | 'ru' | 'uk' | 'es';

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
  continueWithGoogle: string;
  singingIn: string;
  logOut: string;
  loading: string;
  welcomeBack: string;

  // Game Info Modal
  infoButton: string;
  gameInfo: string;
  howToPlay: string;
  howToPlayStep1: string;
  howToPlayStep2: string;
  howToPlayStep3: string;
  howToPlayStep4: string;
  howToPlayStep5: string;
  coreMechanics: string;
  mechanicsLimit: string;
  mechanicsQuestions: string;
  mechanicsDeduction: string;
  mechanicsConsequences: string;
  tips: string;
  tip1: string;
  tip2: string;
  tip3: string;
  tip4: string;
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

    // Game Info Modal
    infoButton: "INFO",
    gameInfo: "Information",
    howToPlay: "How to Play",
    howToPlayStep1: "Read the case details carefully - victim, weapon, location, and background",
    howToPlayStep2: "Select suspects from the list to interrogate them one by one",
    howToPlayStep3: "Ask specific questions to uncover lies, alibis, and motives",
    howToPlayStep4: "Pay attention to inconsistencies and bold keywords in responses",
    howToPlayStep5: "When you're confident, arrest the suspect you believe is the killer",
    coreMechanics: "Core Mechanics",
    mechanicsLimit: "Each suspect can only be asked 10 questions maximum",
    mechanicsQuestions: "Questions should be specific and focused on alibis, motives, and evidence",
    mechanicsDeduction: "The length of each message cannot exceed 200 characters.",
    mechanicsConsequences: "Arresting the wrong person will result in failure - choose wisely",
    tips: "Detective Tips",
    tip1: "Ask about where suspects were during the time of murder",
    tip2: "Inquire about relationships between suspects and the victim",
    tip3: "Look for motives - money, revenge, jealousy, or secrets",
    tip4: "Cross-reference information between different suspects' testimonies",

    // Other
    musicBy: "Music by",
    from: "from",
    language: "Language",
    continueWithGoogle: "Continue with Google",
    singingIn: "Signing in...",
    logOut: "Log Out",
    loading: "Loading...",
    welcomeBack: "Welcome back"
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
    language: "Язык",
    continueWithGoogle: "Продолжить с Google",
    singingIn: "Вход...",
    logOut: "Выйти",
    loading: "Загрузка...",
    welcomeBack: "С возвращением",

    // Game Info Modal
    infoButton: "ИНФО",
    gameInfo: "Информация",
    howToPlay: "Как играть",
    howToPlayStep1: "Внимательно изучите детали дела - жертва, орудие, место и обстоятельства",
    howToPlayStep2: "Выбирайте подозреваемых из списка для допроса один за другим",
    howToPlayStep3: "Задавайте конкретные вопросы, чтобы раскрыть ложь, алиби и мотивы",
    howToPlayStep4: "Обращайте внимание на несоответствия и выделенные слова в ответах",
    howToPlayStep5: "Когда будете уверены, арестуйте подозреваемого, которого считаете убийцей",
    coreMechanics: "Основная механика",
    mechanicsLimit: "Каждому подозреваемому можно задать максимум 10 вопросов",
    mechanicsQuestions: "Вопросы должны быть конкретными и сосредоточены на алиби, мотивах и уликах",
    mechanicsDeduction: "Длинна каждого сообщения не может превышать 200 символов",
    mechanicsConsequences: "Арест невиновного приведет к провалу - выбирайте мудро",
    tips: "Советы детектива",
    tip1: "Спрашивайте о том, где находились подозреваемые во время убийства",
    tip2: "Выясняйте отношения между подозреваемыми и жертвой",
    tip3: "Ищите мотивы - деньги, месть, ревность или секреты",
    tip4: "Сопоставляйте информацию из показаний разных подозреваемых"
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
    language: "Мова",
    continueWithGoogle: "Продовжити з Google",
    singingIn: "Вхід...",
    logOut: "Вийти",
    loading: "Завантаження...",
    welcomeBack: "З поверненням",

    // Game Info Modal
    infoButton: "ІНФО",
    gameInfo: "Інформація",
    howToPlay: "Як грати",
    howToPlayStep1: "Уважно вивчіть деталі справи - жертва, знаряддя, місце та обставини",
    howToPlayStep2: "Обирайте підозрюваних зі списку для допиту один за одним",
    howToPlayStep3: "Ставте конкретні питання, щоб розкрити брехню, алібі та мотиви",
    howToPlayStep4: "Звертайте увагу на невідповідності та виділені слова у відповідях",
    howToPlayStep5: "Коли будете впевнені, заарештуйте підозрюваного, якого вважаєте вбивцею",
    coreMechanics: "Основна механіка",
    mechanicsLimit: "Кожному підозрюваному можна поставити максимум 10 питань",
    mechanicsQuestions: "Питання повинні бути конкретними і зосереджені на алібі, мотивах та доказах",
    mechanicsDeduction: "Довжина кожного повідомлення не може перевищувати 200 символів",
    mechanicsConsequences: "Арешт невинного призведе до провалу - обирайте мудро",
    tips: "Поради детектива",
    tip1: "Запитуйте про те, де перебували підозрювані під час вбивства",
    tip2: "З'ясовуйте стосунки між підозрюваними та жертвою",
    tip3: "Шукайте мотиви - гроші, помста, ревнощі або секрети",
    tip4: "Зіставляйте інформацію з показань різних підозрюваних"
  },

  es: {
    title: "NOIRE",
    detectiveAgency: "Agencia de detectives",
    tagline: "Donde termina la verdad, comienza nuestro trabajo. En la oscuridad de la ciudad, somos tu luz",
    beginInvestigation: "Comenzar la investigación",
    generatingNewCase: "Abrimos un nuevo caso...",
    pleasewait: "Por favor, espere...",
    ask: "Preguntar",
    askSpecificQuestions: "Haga preguntas específicas para descubrir la verdad",
    chooseInterrogate: "Elija a quién interrogar de la lista",
    questions: "preguntas formuladas",
    questionsLimit: "No puede hacer más preguntas",
    questionsLimitReached: "Se ha alcanzado el límite de preguntas",
    questionsLimitReachedMessage: "Ha hecho el número máximo de preguntas",
    questionsLimitReachedMessageDetails: "Ya no puede interrogar a este sospechoso",
    questionsLimitReachedMessageDetails2: "Revisa la conversación o selecciona otro sospechoso para continuar con la investigación",

    loadingSteps: {
      creatingScene: "Generando la escena del crimen...",
      generatingSuspects: "Creando sospechosos...",
      weavingMystery: "Añadiendo a la víctima...",
      settingAlibis: "Estableciendo coartadas...",
      plantingEvidence: "Colocando pruebas...",
      craftingTwist: "Creando un giro en la trama...",
      buildingNarrative: "Escribiendo la narrativa...",
      preparingInvestigation: "Preparando la investigación...",
      assemblingClues: "Preparamos una taza de café...",
      finalizingDetails: "Ultimamos los detalles..."
    },

    // GameIntro
    caseFile: "Detalles",
    theInvestigationBegins: "Comienza la investigación",
    victim: "Víctima",
    weapon: "Arma",
    location: "Lugar",
    timeOfDeath: "Hora de la muerte",
    caseBackground: "Circunstancias del caso",
    suspects: "Sospechosos",
    suspectsDescription: "Había personas presentes en el lugar de los hechos. Interrógalas con cuidado: una de ellas es el asesino.",
    startInterrogation: "Comience el interrogatorio",

    activeInvestigation: "INVESTIGACIÓN",
    selectSuspect: "Seleccione al sospechoso",
    chooseToInterrogate: "Seleccione a quién interrogar de la lista",
    viewSuspects: "Mostrar sospechosos",
    askQuestion: "Haga una pregunta...",
    arrestSuspect: "ARRESTAR",
    arrestNow: "Arrestar",
    caseDetails: "Detalles",
    you: "Tú",
    confirmArrest: "CONFIRMAR ARRESTO",
    warning: "ADVERTENCIA",
    arrestWarningMessage: "Vas a arrestar a {name} por asesinato. Esta acción cerrará el caso para siempre. ¿Estás seguro de que tienes suficientes pruebas?",
    continueInvestigation: "Continuar con la investigación",
    noGoingBack: "Una vez presentados los cargos, no habrá vuelta atrás",
    yearsOld: "años",
    pauseMusic: "Pausar música",
    playMusic: "Reproducir música",

    // Resultado del juego
    caseClosed: "Caso cerrado",
    justiceDenied: "Caso fallido",
    theTruthRevealed: "Informe final",
    motive: "Móvil",
    falseAlibi: "Falsa coartada",
    justiceServed: "Se ha hecho justicia",
    theKillerWalksFree: "El asesino sigue libre",
    justiceServedMessage: "Gracias a una minuciosa investigación y a una aguda deducción, has desenmascarado la mentira y has sacado a la luz la verdad",
    killerWalksFreeMessage: "No se ha hecho justicia. Un inocente carga con la culpa, mientras que el verdadero asesino desaparece en la noche, dejando solo preguntas.",
    investigationSummary: "Resumen de la investigación",
    questionsAsked: "Preguntas formuladas",
    startNewInvestigation: "Iniciar nueva investigación",

    musicBy: "Música",
    from: "De",
    language: "Idioma",
    continueWithGoogle: "Continuar con Google",
    singingIn: "Iniciando sesión...",
    logOut: "Cerrar sesión",
    loading: "Cargando...",
    welcomeBack: "Bienvenido de nuevo",

    // Modal de información del juego
    infoButton: "INFO",
    gameInfo: "Información",
    howToPlay: "Cómo jugar",
    howToPlayStep1: "Estudia detenidamente los detalles del caso: la víctima, el arma, el lugar y las circunstancias",
    howToPlayStep2: "Elige a los sospechosos de la lista para interrogarlos uno por uno",
    howToPlayStep3: "Haz preguntas concretas para descubrir mentiras, coartadas y motivos",
    howToPlayStep4: "Presta atención a las inconsistencias y a las palabras destacadas en las respuestas",
    howToPlayStep5: "Cuando estés seguro, arresta al sospechoso que crees que es el asesino",
    coreMechanics: "Mecánica principal",
    mechanicsLimit: "Se pueden hacer un máximo de 10 preguntas a cada sospechoso",
    mechanicsQuestions: "Las preguntas deben ser concretas y centrarse en las coartadas, los motivos y las pruebas",
    mechanicsDeduction: "La longitud de cada mensaje no puede superar los 200 caracteres",
    mechanicsConsequences: "El arresto de un inocente provocará un fracaso, elige sabiamente",
    tips: "Consejos del detective",
    tip1: "Pregunta dónde estaban los sospechosos en el momento del asesinato",
    tip2: "Averigua la relación entre los sospechosos y la víctima",
    tip3: "Busque motivos: dinero, venganza, celos o secretos",
    tip4: "Compare la información de los testimonios de los diferentes sospechosos"
  },
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
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru' || savedLanguage === 'uk' || savedLanguage === 'es')) {
        this.currentLanguage = savedLanguage;
      }
    }
  }
}