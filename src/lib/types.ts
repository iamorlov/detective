export type Language = 'en' | 'ru' | 'uk' | 'es' | 'de' | 'pl';

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
  continueGame: string;
  detective: string;

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
  belongings: string;
  location: string;
  timeOfDeath: string;
  caseBackground: string;
  suspects: string;
  suspectsDropdown: string;
  suspectsDescription: string;
  startInterrogation: string;

  // Investigation
  activeInvestigation: string;
  activeInvestigationCase: string;
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
  giveUp: string;
  giveUpSubtext: string;

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
  soundBy: string;
  from: string;
  language: string;
  continueWithGoogle: string;
  singingIn: string;
  logOut: string;
  loading: string;
  welcomeBack: string;
  toMainPage: string;

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

  // Difficulty Selector
  difficulty: string;
  easy: string;
  medium: string;
  hard: string;
  easyDescription: string;
  mediumDescription: string;
  hardDescription: string;
}