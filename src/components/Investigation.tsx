'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GameState, Character } from '@/types/game';
import { AvatarService } from '@/lib/avatar-service';
import { useTranslations } from '@/hooks/useTranslations';
import SignOutButton from './SignOutButton';

interface InvestigationProps {
  gameState: GameState;
  onAskCharacter: (characterId: string, question: string) => Promise<void>;
  onMakeAccusation: (characterId: string) => void;
  onResetGame?: () => void;
}

export default function Investigation({ gameState, onAskCharacter, onMakeAccusation, onResetGame }: InvestigationProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [question, setQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isCharacterHeaderExpanded, setIsCharacterHeaderExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const notificationAudioRef = useRef<HTMLAudioElement>(null);
  const avatarService = new AvatarService();
  const t = useTranslations();

  // Maximum questions per character
  const MAX_QUESTIONS_PER_CHARACTER = 10;

  // Helper function to count player questions for a character
  const getQuestionCount = (characterId: string) => {
    const conversation = getConversation(characterId);
    if (!conversation) return 0;
    return conversation.messages.filter(message => message.speaker === 'player').length;
  };

  // Check if character has reached question limit
  const hasReachedQuestionLimit = (characterId: string) => {
    return getQuestionCount(characterId) >= MAX_QUESTIONS_PER_CHARACTER;
  };

  // Play notification sound
  const playNotificationSound = () => {
    if (notificationAudioRef.current) {
      try {
        notificationAudioRef.current.currentTime = 0;
        const playPromise = notificationAudioRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Could not play notification sound:', error);
          });
        }
      } catch (error) {
        console.error('Error playing notification sound:', error);
      }
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleAskQuestion = async () => {
    if (!selectedCharacter || !question.trim()) return;
    scrollToBottom();

    // Check if character has reached question limit
    if (hasReachedQuestionLimit(selectedCharacter.id)) {
      return;
    }

    setIsAsking(true);
    try {
      await onAskCharacter(selectedCharacter.id, question);
      setQuestion('');
      scrollToBottom();

      // Play notification sound when response is received
      playNotificationSound();

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } finally {
      setIsAsking(false);
    }
  };

  const handleArrestClick = () => {
    if (!selectedCharacter) return;
    setShowConfirmModal(true);
  };

  const handleConfirmArrest = () => {
    if (selectedCharacter) {
      onMakeAccusation(selectedCharacter.id);
    }
    setShowConfirmModal(false);
  };

  const handleCancelArrest = () => {
    setShowConfirmModal(false);
  };

  const getConversation = (characterId: string) => {
    return gameState.conversations.find(c => c.characterId === characterId);
  };

  const selectCharacterAndCloseSidebar = (character: Character) => {
    setSelectedCharacter(character);
    setShowSidebar(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [gameState.conversations]);

  useEffect(() => {
    if (selectedCharacter) {
      scrollToBottom();
    }
  }, [selectedCharacter]);

  return (
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden relative">
      {/* Notification audio element */}
      <audio ref={notificationAudioRef} preload="auto">
        <source src="/music/notification.mp3" type="audio/mpeg" />
      </audio>

      {/* Material 3 surface container */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      {/* Header - Material 3 Top App Bar */}
      <div className="bg-slate-800/90 border-b border-slate-600/20 px-4 py-2 sm:p-4 flex-shrink-0 backdrop-blur-md relative z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Material 3 Icon Button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="cursor-pointer lg:hidden p-3 hover:bg-slate-700/50 text-blue-300 hover:text-blue-200 transition-colors duration-200 rounded-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="hidden sm:block">
              <h1 className="text-xl font-medium text-slate-100 tracking-wide playfair-font">{t.activeInvestigation}</h1>
            </div>

            {/* Material 3 Outlined Button */}
            <button
              onClick={() => setShowDetailsModal(true)}
              className="cursor-pointer px-6 py-2.5 border border-blue-300/30 hover:border-blue-300/50 text-blue-300 hover:text-blue-200 text-sm font-medium transition-all duration-200 rounded-full hover:bg-blue-300/5"
            >
              <span className="hidden sm:inline">{t.caseDetails}</span>
              <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {/* Material 3 Icon Button for Music */}
            <button
              onClick={() => {
                const audio = document.querySelector('audio');
                if (audio) {
                  if (audio.paused) {
                    audio.play();
                    setIsPlaying(true);
                  } else {
                    audio.pause();
                    setIsPlaying(false);
                  }
                }
              }}
              className="cursor-pointer p-3 hover:bg-slate-700/50 text-blue-300/70 hover:text-blue-300 transition-colors duration-200 rounded-xl"
              title={isPlaying ? t.pauseMusic : t.playMusic}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <SignOutButton onSignOut={onResetGame} />
          </div>
        </div>
      </div>

      {/* Case Details Modal - Material 3 Dialog */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-600/30 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-600/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium text-slate-100 playfair-font">{t.caseFile}</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="cursor-pointer p-2 hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors duration-200 rounded-xl"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content - Material 3 Cards */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-750 border border-slate-600/20 rounded-2xl p-4 shadow-sm">
                  <h3 className="text-blue-300 font-medium mb-2 text-sm uppercase tracking-wider">{t.victim}</h3>
                  <p className="text-slate-100 text-base">{gameState.victim}</p>
                </div>

                <div className="bg-slate-750 border border-slate-600/20 rounded-2xl p-4 shadow-sm">
                  <h3 className="text-blue-300 font-medium mb-2 text-sm uppercase tracking-wider">{t.weapon}</h3>
                  <p className="text-slate-100 text-base">{gameState.murderWeapon}</p>
                </div>

                <div className="bg-slate-750 border border-slate-600/20 rounded-2xl p-4 shadow-sm">
                  <h3 className="text-blue-300 font-medium mb-2 text-sm uppercase tracking-wider">{t.location}</h3>
                  <p className="text-slate-100 text-base">{gameState.murderLocation}</p>
                </div>

                <div className="bg-slate-750 border border-slate-600/20 rounded-2xl p-4 shadow-sm">
                  <h3 className="text-blue-300 font-medium mb-2 text-sm uppercase tracking-wider">{t.timeOfDeath}</h3>
                  <p className="text-slate-100 text-base">{gameState.murderTime}</p>
                </div>
              </div>

              <div className="bg-slate-750 border border-slate-600/20 rounded-2xl p-6 shadow-sm mb-4">
                <h3 className="text-blue-300 font-medium mb-3 text-sm uppercase tracking-wider">{t.belongings}</h3>
                <p className="text-slate-100 text-base leading-relaxed">{gameState.belongings}</p>
              </div>

              <div className="bg-slate-750 border border-slate-600/20 rounded-2xl p-6 shadow-sm">
                <h3 className="text-blue-300 font-medium mb-3 text-sm uppercase tracking-wider">{t.caseBackground}</h3>
                <p className="text-slate-100 text-base leading-relaxed">{gameState.backstory}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal - Material 3 Dialog */}
      {showConfirmModal && selectedCharacter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-600/30 rounded-3xl shadow-2xl max-w-lg w-full">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-600/20">
              <h2 className="text-xl font-medium text-slate-100 playfair-font">{t.confirmArrest}</h2>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <Image
                  src={avatarService.generateAvatarUrl(selectedCharacter, 60)}
                  alt={selectedCharacter.name}
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-2xl shadow-md"
                  unoptimized={true}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-100 mb-1">{selectedCharacter.name}</h3>
                  <p className="text-blue-300 text-sm">{selectedCharacter.occupation} • {selectedCharacter.age} {t.yearsOld}</p>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-400/30 rounded-2xl p-4 mb-6">
                <h4 className="text-red-300 text-sm font-medium uppercase tracking-wider mb-2">{t.warning}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t.arrestWarningMessage.replace('{name}', selectedCharacter.name)}
                </p>
              </div>

              <p className="text-slate-400 text-sm text-center mb-6">{t.noGoingBack}</p>
            </div>

            {/* Modal Actions - Material 3 Buttons */}
            <div className="p-6 border-t border-slate-600/20 flex space-x-3">
              <button
                onClick={handleCancelArrest}
                className="cursor-pointer flex-1 px-6 py-3 border border-slate-500/30 hover:border-slate-400/50 text-slate-200 hover:text-slate-100 font-medium text-sm transition-all duration-200 rounded-full hover:bg-slate-700/30"
              >
                {t.continueInvestigation}
              </button>
              <button
                onClick={handleConfirmArrest}
                className="cursor-pointer flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-all duration-200 rounded-full shadow-lg hover:shadow-xl"
              >
                {t.arrestNow}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full min-h-0 overflow-hidden relative z-10">
        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowSidebar(false)} />
        )}

        {/* Sidebar - Material 3 Navigation Rail */}
        <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-80 bg-slate-800/95 border-r border-slate-600/20 flex flex-col backdrop-blur-md shadow-xl transition-transform duration-300 ease-in-out`}>

          <div className="p-4 border-b border-slate-600/20 flex-shrink-0 flex items-center justify-between">
            <h2 className="text-blue-300 text-sm font-medium uppercase tracking-wider">{t.suspects}</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="cursor-pointer lg:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-xl transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {gameState.characters.map((character) => {
              const questionCount = getQuestionCount(character.id);
              const isSelected = selectedCharacter?.id === character.id;
              const hasReachedLimit = hasReachedQuestionLimit(character.id);

              return (
                <button
                  key={character.id}
                  onClick={() => selectCharacterAndCloseSidebar(character)}
                  className={`cursor-pointer w-full p-4 text-left border-b border-slate-600/10 transition-all duration-200 hover:bg-slate-700/30 ${isSelected
                    ? 'bg-blue-600/20 border-l-4 border-l-blue-400'
                    : ''
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Image
                        src={avatarService.generateAvatarUrl(character, 48)}
                        alt={character.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-2xl shadow-md"
                        unoptimized={true}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-100 font-medium text-base truncate">{character.name}</h3>
                        <p className="text-slate-400 text-sm truncate">{character.occupation}</p>
                      </div>
                    </div>
                    {questionCount > 0 && (
                      <div className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${hasReachedLimit ? 'bg-zinc-800 text-neutral-400' : 'bg-blue-600 text-white'
                        }`}>
                        {questionCount}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Material 3 Action Buttons */}
          <div className="p-6 flex-shrink-0 space-y-3">
            <button
              onClick={handleArrestClick}
              disabled={!selectedCharacter}
              className="cursor-pointer w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-100 font-medium text-sm transition-all duration-200 rounded-full shadow-lg disabled:shadow-none"
            >
              <div className="text-center">
                <div className="font-medium playfair-font">{t.arrestSuspect}</div>
                <div className="text-xs text-slate-300 mt-1 truncate">
                  {selectedCharacter ? selectedCharacter.name : '¯\\_(ツ)_/¯'}
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                const nonKillerCharacter = gameState.characters.find(char => !char.isKiller);
                if (nonKillerCharacter) {
                  onMakeAccusation(nonKillerCharacter.id);
                }
              }}
              className="cursor-pointer w-full py-3 px-4 bg-red-600/80 hover:bg-red-600 text-white font-medium text-sm transition-all duration-200 rounded-full shadow-lg"
            >
              <div className="text-center">
                <div className="font-medium uppercase playfair-font">{t.giveUp}</div>
                <div className="text-xs text-red-100 mt-1">{t.giveUpSubtext}</div>
              </div>
            </button>
          </div>
        </div>

        {/* Chat Area - Material 3 Surface */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden shadow-inner">
          {selectedCharacter ? (
            <>
              {/* Character Header - Material 3 Card */}
              <div className="bg-slate-800/90 flex-shrink-0 border-b border-slate-600/20">
                {/* Mobile Compact Header */}
                <div className="block sm:hidden">
                  <div className="p-3 flex items-center space-x-3">
                    <Image
                      src={avatarService.generateAvatarUrl(selectedCharacter, 40)}
                      alt={selectedCharacter.name}
                      width={40}
                      height={40}
                      className="cursor-pointer w-10 h-10 rounded-xl shadow-md transition-transform duration-200 hover:scale-105"
                      unoptimized={true}
                      onClick={handleArrestClick}
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-medium text-slate-100 truncate">{selectedCharacter.name}</h2>
                      <p className="text-blue-300 text-xs truncate">{selectedCharacter.occupation}</p>
                    </div>
                    <button
                      onClick={() => setIsCharacterHeaderExpanded(!isCharacterHeaderExpanded)}
                      className="cursor-pointer p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-xl transition-colors duration-200"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${isCharacterHeaderExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isCharacterHeaderExpanded && (
                    <div className="px-3 pb-3 border-t border-slate-600/20">
                      <div className="pt-3">
                        <p className="text-blue-300 text-xs mb-1">{selectedCharacter.age} {t.yearsOld}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{selectedCharacter.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Desktop Full Header */}
                <div className="hidden sm:block p-6">
                  <div className="flex items-start space-x-6">
                    <Image
                      src={avatarService.generateAvatarUrl(selectedCharacter, 80)}
                      alt={selectedCharacter.name}
                      title={t.arrestNow}
                      width={80}
                      height={80}
                      className="cursor-pointer w-20 h-20 rounded-2xl shadow-lg transition-transform duration-200 hover:scale-105"
                      unoptimized={true}
                      onClick={handleArrestClick}
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-medium text-slate-100 truncate">{selectedCharacter.name}</h2>
                      <p className="text-blue-300 text-sm">{selectedCharacter.occupation} • {selectedCharacter.age} {t.yearsOld}</p>
                      <p className="text-slate-400 text-sm mt-2 line-clamp-2">{selectedCharacter.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages - Material 3 Chat Bubbles */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500"
              >
                <div className="p-6 space-y-4">
                  {getConversation(selectedCharacter.id)?.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.speaker === 'player' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[95%] sm:max-w-[80%] min-w-[50%] p-4 rounded-3xl shadow-sm ${message.speaker === 'player'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-700 text-slate-100'
                          }`}
                      >
                        <div className="flex items-start space-x-3">
                          {message.speaker === 'character' && (
                            <Image
                              src={avatarService.generateAvatarUrl(selectedCharacter, 32)}
                              alt={selectedCharacter.name}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full flex-shrink-0 mt-1 shadow-md"
                              unoptimized={true}
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-base chat-message"
                              dangerouslySetInnerHTML={{
                                __html: message.content
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
                                  .replace(/_(.*?)_/g, '<em>$1</em>')
                                  .replace(/`(.*?)`/g, '<code class="bg-slate-600/50 px-1 py-0.5 rounded">$1</code>')
                                  .replace(/\n/g, '<br>')
                              }}
                            />
                            <div className="mt-1">
                              <span className={`text-xs ${message.speaker === 'player' ? 'text-blue-100' : 'text-slate-400'
                                }`}>
                                {message.speaker === 'player' ? t.you : selectedCharacter.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Animated ellipsis when asking */}
                  {isAsking && (
                    <div className="flex justify-center">
                      <div className="flex space-x-1 p-4">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area - Material 3 Text Field */}
              <div className="bg-slate-800/90 px-6 py-3 sm:p-6 flex-shrink-0 border-t border-slate-600/20">
                <div className="space-y-4">
                  {(() => {
                    const hasReachedLimit = hasReachedQuestionLimit(selectedCharacter.id);

                    if (hasReachedLimit) {
                      return (
                        <div className="bg-red-900/20 border border-red-400/30 rounded-2xl p-4 text-center">
                          <h4 className="text-red-300 font-medium">{t.questionsLimitReached}</h4>
                          <div className="hidden mt-2 sm:block">
                            <p className="text-slate-300 text-sm">
                              {t.questionsLimitReachedMessage}&nbsp;
                              {t.questionsLimitReachedMessageDetails}
                            </p>
                            <p className="text-slate-400 text-xs mt-2">
                              {t.questionsLimitReachedMessageDetails2}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <>
                        <div className="flex space-x-3">
                          <div className="relative flex-1">
                            <textarea
                              id='questionInput'
                              ref={inputRef}
                              value={question}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 200) {
                                  setQuestion(value);
                                }
                              }}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAskQuestion();
                                }
                              }}
                              placeholder={t.askQuestion}
                              rows={2}
                              maxLength={200}
                              className="w-full px-4 py-3 bg-slate-700 border border-slate-500/30 focus:border-blue-400 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 rounded-2xl text-base resize-none pr-12 transition-colors duration-200"
                              disabled={isAsking}
                            />
                            <div className="absolute bottom-2 right-3 text-xs text-slate-400 pointer-events-none">
                              {question.length}/200
                            </div>
                          </div>
                          <button
                            onClick={handleAskQuestion}
                            disabled={!question.trim() || isAsking}
                            className="cursor-pointer px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium transition-all duration-200 rounded-2xl shadow-lg hover:shadow-xl min-w-[80px] flex items-center justify-center"
                          >
                            {isAsking ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                              t.ask
                            )}
                          </button>
                        </div>

                        <div className="text-center">
                          <p className="text-slate-400 text-sm">
                            <span className="hidden sm:inline">{t.askSpecificQuestions} • </span>
                            <strong>{getQuestionCount(selectedCharacter.id)}/{MAX_QUESTIONS_PER_CHARACTER}</strong>
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-blue-300 text-3xl">?</span>
                </div>
                <h3 className="text-xl font-medium text-slate-100 mb-2 playfair-font">{t.selectSuspect}</h3>
                <p className="text-slate-400 text-base mb-6">{t.chooseInterrogate}</p>
                <button
                  onClick={() => setShowSidebar(true)}
                  className="cursor-pointer lg:hidden px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-200 shadow-lg"
                >
                  {t.viewSuspects}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}