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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
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

    // Check if character has reached question limit
    if (hasReachedQuestionLimit(selectedCharacter.id)) {
      return;
    }

    setIsAsking(true);
    try {
      await onAskCharacter(selectedCharacter.id, question);
      setQuestion('');
      scrollToBottom();
      if (inputRef.current) {
        inputRef.current.focus();
      }
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
    <div className="h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 flex flex-col overflow-hidden relative">
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>

      {/* Header */}
      <div className="bg-black/40 border-b border-gray-700/50 p-3 sm:p-4 flex-shrink-0 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="cursor-pointer lg:hidden p-2 bg-black/30 hover:bg-black/50 text-blue-400/80 hover:text-blue-400 transition-all duration-200 rounded-lg border border-blue-500/30 hover:border-blue-500/50 backdrop-blur-sm shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h1 className="text-lg sm:text-xl font-light text-gray-100 tracking-wide drop-shadow-lg playfair-font">{t.activeInvestigation}</h1>
              <div className="h-px bg-blue-500/60 w-16 sm:w-20 mt-1 shadow-lg"></div>
            </div>

            {/* Details Link */}
            <button
              onClick={() => setShowDetailsModal(true)}
              className="cursor-pointer px-3 sm:px-4 py-2 bg-black/30 hover:bg-black/50 text-blue-400/80 hover:text-blue-400 text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-200 rounded-lg border border-blue-500/30 hover:border-blue-500/50 backdrop-blur-sm shadow-lg"
            >
              <span className="hidden sm:inline">{t.caseDetails}</span>
              <span className="sm:hidden">{t.caseDetails}</span>
            </button>
          </div>

          {/* Language Selector, Music Control, and Sign Out */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Music Control */}
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
              className="cursor-pointer p-2 bg-black/30 hover:bg-black/50 text-blue-400/60 hover:text-blue-400/80 transition-all duration-200 rounded-lg border border-blue-500/30 hover:border-blue-500/50 backdrop-blur-sm shadow-lg"
              title={isPlaying ? t.pauseMusic : t.playMusic}
            >
              {isPlaying ? (
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Sign Out Button */}
            <SignOutButton onSignOut={onResetGame} />
          </div>
        </div>
      </div>

      {/* Case Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/60 border border-gray-700/70 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in backdrop-blur-md">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-gray-700/50 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-2xl font-light text-gray-100 tracking-wide drop-shadow-lg mb-2 playfair-font uppercase">{t.caseFile}</h2>
                  <div className="h-px bg-blue-500/60 w-16 sm:w-20 shadow-lg"></div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="cursor-pointer p-2 bg-black/40 hover:bg-black/60 text-gray-400 hover:text-gray-200 transition-all duration-200 rounded-lg border border-gray-600/50"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-black/30 border border-gray-700/50 rounded-xl p-3 sm:p-4 backdrop-blur-sm shadow-lg">
                  <h3 className="text-blue-400/90 font-medium mb-2 drop-shadow-lg tracking-wide text-sm sm:text-base">{t.victim}</h3>
                  <p className="text-gray-100 font-light text-sm sm:text-lg">{gameState.victim}</p>
                </div>

                <div className="bg-black/30 border border-gray-700/50 rounded-xl p-3 sm:p-4 backdrop-blur-sm shadow-lg">
                  <h3 className="text-blue-400/90 font-medium mb-2 drop-shadow-lg tracking-wide text-sm sm:text-base">{t.weapon}</h3>
                  <p className="text-gray-100 font-light text-sm sm:text-lg">{gameState.murderWeapon}</p>
                </div>

                <div className="bg-black/30 border border-gray-700/50 rounded-xl p-3 sm:p-4 backdrop-blur-sm shadow-lg">
                  <h3 className="text-blue-400/90 font-medium mb-2 drop-shadow-lg tracking-wide text-sm sm:text-base">{t.location}</h3>
                  <p className="text-gray-100 font-light text-sm sm:text-lg">{gameState.murderLocation}</p>
                </div>

                <div className="bg-black/30 border border-gray-700/50 rounded-xl p-3 sm:p-4 backdrop-blur-sm shadow-lg">
                  <h3 className="text-blue-400/90 font-medium mb-2 drop-shadow-lg tracking-wide text-sm sm:text-base">{t.timeOfDeath}</h3>
                  <p className="text-gray-100 font-light text-sm sm:text-lg">{gameState.murderTime}</p>
                </div>
              </div>

              {/* Case Background */}
              <div className="bg-black/30 border border-gray-700/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm shadow-lg">
                <h3 className="text-blue-400/90 font-medium mb-2 drop-shadow-lg tracking-wide text-sm sm:text-base">{t.caseBackground}</h3>
                <p className="text-gray-100 font-light text-sm sm:text-lg">
                  {gameState.backstory}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedCharacter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/60 border border-gray-700/70 rounded-2xl shadow-2xl max-w-lg w-full animate-fade-in backdrop-blur-md">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-gray-700/50 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <h2 className="text-lg sm:text-xl font-light text-gray-100 tracking-wide drop-shadow-lg playfair-font">{t.confirmArrest}</h2>
              </div>
              <div className="h-px bg-blue-500/60 w-16 sm:w-20 mt-1 shadow-lg"></div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <Image
                  src={avatarService.generateAvatarUrl(selectedCharacter, 60)}
                  alt={selectedCharacter.name}
                  width={60}
                  height={60}
                  className="w-12 h-12 sm:w-15 sm:h-15 rounded-xl shadow-lg"
                  unoptimized={true}
                />
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-medium text-gray-100 mb-1 drop-shadow-lg">{selectedCharacter.name}</h3>
                  <span className="text-blue-400/80 text-xs sm:text-sm mb-1">{selectedCharacter.occupation}</span> • <span className="text-gray-400 text-xs sm:text-sm">{selectedCharacter.age} {t.yearsOld}</span>
                </div>
              </div>

              <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 backdrop-blur-sm shadow-lg">
                <h4 className="text-red-400/90 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 drop-shadow-lg">{t.warning}</h4>
                <p className="text-gray-300 font-light leading-relaxed text-sm">
                  {t.arrestWarningMessage.replace('{name}', selectedCharacter.name)}
                </p>
              </div>

              <div className="text-center mb-4">
                <p className="text-gray-500 text-xs sm:text-sm font-light">
                  {t.noGoingBack}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-6 border-t border-gray-700/50 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 rounded-b-2xl">
              <button
                onClick={handleCancelArrest}
                className="cursor-pointer flex-1 px-4 py-3 bg-black/40 hover:bg-gray-800/60 text-gray-200 font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 rounded-xl border border-gray-600/50 backdrop-blur-sm shadow-lg playfair-font"
              >
                {t.continueInvestigation}
              </button>
              <button
                onClick={handleConfirmArrest}
                className="cursor-pointer flex-1 px-4 py-3 bg-gradient-to-r from-red-800/80 to-red-700/80 hover:from-red-700/90 hover:to-red-600/90 text-gray-100 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 rounded-xl shadow-xl border border-red-500/50"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className='playfair-font'>{t.arrestNow}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full min-h-0 overflow-hidden relative z-10">
        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setShowSidebar(false)} />
        )}

        {/* Sidebar - Character List */}
        <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-72 sm:w-80 bg-black/30 border-r border-gray-700/50 flex flex-col backdrop-blur-sm shadow-2xl transition-transform duration-300 ease-in-out`}>

          <div className="p-3 sm:p-4 border-b border-gray-700/50 flex-shrink-0 flex items-center justify-between">
            <h2 className="text-blue-400/80 text-sm font-medium uppercase tracking-wider drop-shadow-lg">{t.suspects}</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSidebar(false)}
                className="lg:hidden p-1 text-gray-400 hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
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
                  className={`cursor-pointer w-full p-3 sm:p-4 text-left border-b border-gray-700/30 transition-all duration-200 ${isSelected
                    ? 'bg-blue-900/40 border-l-4 border-l-blue-400/80 shadow-lg'
                    : 'hover:bg-black/40'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2 sm:space-x-3 flex-1">
                      <Image
                        src={avatarService.generateAvatarUrl(character, 48)}
                        alt={character.name}
                        width={48}
                        height={48}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg"
                        unoptimized={true}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-100 font-medium drop-shadow-lg text-sm sm:text-base truncate">{character.name}</h3>
                        <span className="text-gray-500 text-xs truncate">{character.occupation}</span>
                      </div>
                    </div>
                    {questionCount > 0 && (
                      <div className={`text-black text-xs px-2 py-1 rounded-full shadow-lg flex-shrink-0 ${hasReachedLimit ? 'bg-red-400' : 'bg-blue-600/80'
                        }`}>
                        {questionCount}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Police-style accusation section */}
          <div className="p-4 sm:p-6 flex-shrink-0">
            <div className="space-y-3">
              <button
                onClick={handleArrestClick}
                disabled={!selectedCharacter}
                className="rounded-xl group cursor-pointer w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-700/50 disabled:cursor-not-allowed text-gray-100 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-xl border-1 border-gray-600/50 hover:border-gray-500/70 disabled:border-gray-700/30"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className='playfair-font'>{t.arrestSuspect}</span>
                </div>
                <div className="text-xs opacity-70 mt-1 truncate">
                  {selectedCharacter ? selectedCharacter.name : '¯\\_(ツ)_/¯'}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-black/20 min-h-0 overflow-hidden backdrop-blur-sm shadow-2xl">
          {selectedCharacter ? (
            <>
              {/* Character Header */}
              <div className="bg-black/40 p-3 sm:p-6 flex-shrink-0 backdrop-blur-sm">
                <div className="flex items-start space-x-3 sm:space-x-6">
                  <Image
                    src={avatarService.generateAvatarUrl(selectedCharacter, 80)}
                    alt={selectedCharacter.name}
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl shadow-xl"
                    unoptimized={true}
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-2xl font-light text-gray-100 drop-shadow-xl truncate">{selectedCharacter.name}</h2>
                    <span className="text-blue-400/80 text-xs sm:text-sm">{selectedCharacter.occupation}</span>
                    <span className="text-gray-500 text-xs mt-1"> • {selectedCharacter.age} {t.yearsOld}</span>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-1 line-clamp-2">{selectedCharacter.description}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-gray-600/70 hover:scrollbar-thumb-gray-500/70"
              >
                <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
                  {getConversation(selectedCharacter.id)?.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.speaker === 'player' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`min-w-[60%] max-w-[85%] sm:min-w-[50%] sm:max-w-[80%] p-3 sm:p-4 rounded-xl shadow-lg ${message.speaker === 'player'
                          ? 'bg-blue-600/80 text-black backdrop-blur-sm'
                          : `bg-black/40 text-gray-100 backdrop-blur-sm}`
                          }`}
                      >
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          {message.speaker === 'character' && (
                            <Image
                              src={avatarService.generateAvatarUrl(selectedCharacter, 32)}
                              alt={selectedCharacter.name}
                              width={32}
                              height={32}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0 mt-1 shadow-lg"
                              unoptimized={true}
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div
                              className="font-light leading-relaxed prose prose-invert max-w-none chat-message text-sm sm:text-base"
                              dangerouslySetInnerHTML={{
                                __html: message.content
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
                                  .replace(/_(.*?)_/g, '<em>$1</em>')
                                  .replace(/`(.*?)`/g, '<code class="bg-gray-700/50 px-1 py-0.5 rounded text-sm">$1</code>')
                                  .replace(/\n/g, '<br>')
                              }}
                            />
                            <div className="flex items-center justify-between mt-2">
                              <span className={`text-xs ${message.speaker === 'player' ? 'text-black/70' : 'text-gray-400'
                                }`}>
                                {message.speaker === 'player' ? t.you : selectedCharacter.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-black/40 p-3 sm:p-6 flex-shrink-0 backdrop-blur-sm">
                <div className="space-y-3 sm:space-y-4">
                  {(() => {
                    const hasReachedLimit = hasReachedQuestionLimit(selectedCharacter.id);

                    if (hasReachedLimit) {
                      return (
                        <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-4 text-center backdrop-blur-sm">
                          <h4 className="text-red-400 font-medium mb-2">{t.questionsLimitReached}</h4>
                          <p className="text-gray-300 text-sm">
                            {t.questionsLimitReachedMessage} {selectedCharacter.name}.&nbsp;
                            {t.questionsLimitReachedMessageDetails}
                          </p>
                          <p className="text-gray-400 text-xs mt-2">
                            {t.questionsLimitReachedMessageDetails2}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <>
                        <div className="flex space-x-3 sm:space-x-4">
                          <div className="relative w-[65%] sm:flex-1">
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
                              className="w-full px-3 sm:px-5 py-3 sm:py-4 bg-black/40 border border-gray-600/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent rounded-xl backdrop-blur-sm shadow-lg text-sm sm:text-base resize-none pr-12"
                              disabled={isAsking}
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-white/30 pointer-events-none">
                              {question.length}/200
                            </div>
                          </div>
                          <button
                            onClick={handleAskQuestion}
                            disabled={!question.trim() || isAsking}
                            className="cursor-pointer w-[35%] sm:w-auto px-3 sm:px-10 py-4 sm:py-5 bg-blue-600/80 hover:bg-blue-700/80 disabled:bg-gray-600/40 disabled:cursor-not-allowed text-black transition-all duration-200 rounded-xl shadow-lg backdrop-blur-sm sm:min-w-[120px] flex items-center justify-center text-sm sm:text-md"
                          >
                            {isAsking ? (
                              <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-black/30 border-t-black/80 rounded-full animate-spin"></div>
                            ) : (
                              t.ask
                            )}
                          </button>
                        </div>

                        <div className="text-center">
                          <p className="text-gray-500 text-xs sm:text-sm">
                            {t.askSpecificQuestions} • <strong>{getQuestionCount(selectedCharacter.id)}/{MAX_QUESTIONS_PER_CHARACTER}</strong>
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
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-black/40 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 backdrop-blur-sm shadow-xl">
                  <span className="text-blue-400/80 text-2xl sm:text-3xl drop-shadow-lg">?</span>
                </div>
                <h3 className="text-lg sm:text-xl font-light text-gray-100 mb-2 drop-shadow-xl playfair-font">{t.selectSuspect}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{t.chooseInterrogate}</p>
                <button
                  onClick={() => setShowSidebar(true)}
                  className="lg:hidden mt-4 px-4 py-2 bg-blue-600/80 hover:bg-blue-700/80 text-black font-medium rounded-lg transition-all duration-200"
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