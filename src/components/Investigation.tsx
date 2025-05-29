'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GameState, Character } from '@/types/game';
import { AvatarService } from '@/lib/avatar-service';

interface InvestigationProps {
  gameState: GameState;
  onAskCharacter: (characterId: string, question: string) => Promise<void>;
  onMakeAccusation: (characterId: string) => void;
}

export default function Investigation({ gameState, onAskCharacter, onMakeAccusation }: InvestigationProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [question, setQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const avatarService = new AvatarService();

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      // Alternative scroll method if the above doesn't work
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleAskQuestion = async () => {
    if (!selectedCharacter || !question.trim()) return;
    
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
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>
      
      {/* Dark vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60 pointer-events-none"></div>

      {/* Music Copyright */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <p className="text-gray-500 text-xs text-center">
          Music by{' '}
          <a 
            href="https://pixabay.com/users/joelfazhari-16466931/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=201624"
            className="text-amber-400/60 hover:text-amber-400/80 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Joel Fazhari
          </a>
          {' '}from{' '}
          <a 
            href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=201624"
            className="text-amber-400/60 hover:text-amber-400/80 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pixabay
          </a>
        </p>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedCharacter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/60 border border-gray-700/70 rounded-2xl shadow-2xl max-w-lg w-full animate-fade-in backdrop-blur-md">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-700/50 rounded-t-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <h2 className="text-xl font-light text-gray-100 tracking-wide drop-shadow-lg">CONFIRM ARREST</h2>
              </div>
              <div className="h-px bg-red-500/40 w-full shadow-lg"></div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <Image
                  src={avatarService.generateAvatarUrl(selectedCharacter, 60)}
                  alt={selectedCharacter.name}
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-xl border-2 border-gray-600/70 shadow-lg"
                  unoptimized={true}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-100 mb-1 drop-shadow-lg">{selectedCharacter.name}</h3>
                  <p className="text-amber-400/80 text-sm mb-1">{selectedCharacter.occupation}</p>
                  <p className="text-gray-400 text-sm">{selectedCharacter.age} years old</p>
                </div>
              </div>

              <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-4 mb-6 backdrop-blur-sm shadow-lg">
                <h4 className="text-red-400/90 text-sm font-medium uppercase tracking-wider mb-2 drop-shadow-lg">WARNING</h4>
                <p className="text-gray-300 font-light leading-relaxed">
                  You are about to arrest <span className="text-gray-100 font-medium">{selectedCharacter.name}</span> for murder. 
                  This action will close the case permanently. Are you certain you have enough evidence?
                </p>
              </div>

              <div className="text-center mb-4">
                <p className="text-gray-500 text-sm font-light">
                  Once you make this accusation, there&apos;s no going back.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-700/50 flex space-x-4 rounded-b-2xl">
              <button
                onClick={handleCancelArrest}
                className="cursor-pointer flex-1 px-4 py-3 bg-black/40 hover:bg-black/60 text-gray-200 font-medium text-sm uppercase tracking-wider transition-all duration-200 rounded-xl border border-gray-600/50 backdrop-blur-sm shadow-lg"
              >
                Continue Investigation
              </button>
              <button
                onClick={handleConfirmArrest}
                className="cursor-pointer flex-1 px-4 py-3 bg-gradient-to-r from-red-800/80 to-red-700/80 hover:from-red-700/90 hover:to-red-600/90 text-gray-100 font-bold text-sm uppercase tracking-wider transition-all duration-200 rounded-xl shadow-xl border border-red-500/50"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>Arrest Now</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-black/40 border-b border-gray-700/50 p-4 flex-shrink-0 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-light text-gray-100 tracking-wide drop-shadow-lg">ACTIVE INVESTIGATION</h1>
            <div className="h-px bg-amber-500/60 w-20 mt-1 shadow-lg"></div>
          </div>
          
          {/* Music Copyright */}
          <div>
            <p className="text-gray-500 text-xs text-right">
              Music by{' '}
              <a 
                href="https://pixabay.com/users/joelfazhari-16466931/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=201624"
                className="text-amber-400/60 hover:text-amber-400/80 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Joel Fazhari
              </a>
              {' '}from{' '}
              <a 
                href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=201624"
                className="text-amber-400/60 hover:text-amber-400/80 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pixabay
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Main content area - Takes remaining height */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full min-h-0 overflow-hidden relative z-10">
        {/* Sidebar - Character List */}
        <div className="w-80 bg-black/30 border-r border-gray-700/50 flex flex-col backdrop-blur-sm rounded-r-xl shadow-2xl">
          <div className="p-4 border-b border-gray-700/50 flex-shrink-0">
            <h2 className="text-amber-400/80 text-sm font-medium uppercase tracking-wider drop-shadow-lg">Suspects</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {gameState.characters.map((character) => {
              const conversation = getConversation(character.id);
              const messageCount = conversation?.messages.length || 0;
              const isSelected = selectedCharacter?.id === character.id;
              
              return (
                <button
                  key={character.id}
                  onClick={() => setSelectedCharacter(character)}
                  className={`cursor-pointer w-full p-4 text-left border-b border-gray-700/30 transition-all duration-200 ${
                    isSelected 
                      ? 'bg-amber-900/40 border-l-4 border-l-amber-400/80 shadow-lg' 
                      : 'hover:bg-black/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {/* Character Avatar */}
                      <Image
                        src={avatarService.generateAvatarUrl(character, 48)}
                        alt={character.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-xl border-2 border-gray-600/70 shadow-lg"
                        unoptimized={true}
                      />
                      <div className="flex-1">
                        <h3 className="text-gray-100 font-medium drop-shadow-lg">{character.name}</h3>
                        <p className="text-gray-400 text-sm">{character.occupation}</p>
                        <p className="text-gray-500 text-xs mt-1">{character.age} years old</p>
                      </div>
                    </div>
                    {messageCount > 0 && (
                      <div className="bg-amber-600/80 text-black text-xs px-2 py-1 rounded-full shadow-lg">
                        {messageCount}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Police-style accusation section - Dark theme */}
          <div className="p-6 flex-shrink-0">
            <div className="space-y-3">
              <button
                onClick={handleArrestClick}
                disabled={!selectedCharacter}
                className="rounded-xl group cursor-pointer w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-700/50 disabled:cursor-not-allowed text-gray-100 font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-xl border-2 border-gray-600/50 hover:border-gray-500/70 disabled:border-gray-700/30"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>ARREST SUSPECT</span>
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {selectedCharacter ? selectedCharacter.name : 'SELECT SUSPECT'}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-black/20 min-h-0 overflow-hidden backdrop-blur-sm rounded-l-xl shadow-2xl">
          {selectedCharacter ? (
            <>
              <div className="bg-black/40 border-b border-gray-700/50 p-6 flex-shrink-0 backdrop-blur-sm">
                <div className="flex items-start space-x-6">
                  <Image
                    src={avatarService.generateAvatarUrl(selectedCharacter, 80)}
                    alt={selectedCharacter.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-xl border-2 border-amber-400/80 shadow-xl"
                    unoptimized={true}
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-light text-gray-100 drop-shadow-xl">{selectedCharacter.name}</h2>
                    <p className="text-amber-400/80 text-sm">{selectedCharacter.occupation}</p>
                    <p className="text-gray-400 text-sm mt-2">{selectedCharacter.description}</p>
                  </div>
                </div>
              </div>

              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-gray-600/70 hover:scrollbar-thumb-gray-500/70"
              >
                <div className="p-6 space-y-4">
                  {getConversation(selectedCharacter.id)?.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.speaker === 'player' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`min-w-[50%] max-w-[80%] p-4 rounded-xl shadow-lg ${
                          message.speaker === 'player'
                            ? 'bg-amber-600/80 text-black backdrop-blur-sm'
                            : `bg-black/40 text-gray-100 backdrop-blur-sm ${message.isLie ? 'border-l-4 border-l-red-500/80' : ''}`
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {message.speaker === 'character' && (
                            <Image
                              src={avatarService.generateAvatarUrl(selectedCharacter, 32)}
                              alt={selectedCharacter.name}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full flex-shrink-0 mt-1 shadow-lg"
                              unoptimized={true}
                            />
                          )}
                          <div className="flex-1">
                            <div 
                              className="font-light leading-relaxed prose prose-invert max-w-none chat-message"
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
                              <span className={`text-xs ${
                                message.speaker === 'player' ? 'text-black/70' : 'text-gray-400'
                              }`}>
                                {message.speaker === 'player' ? 'You' : selectedCharacter.name}
                              </span>
                              {message.isLie && (
                                <div className="flex items-center space-x-2">
                                  <Image
                                    src={avatarService.generateSuspiciousIcon()}
                                    alt="Suspicious"
                                    width={16}
                                    height={16}
                                    className="w-4 h-4"
                                    unoptimized={true}
                                  />
                                  <span className="text-red-400/90 text-xs font-medium drop-shadow-lg">Suspicious</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="bg-black/40 border-t border-gray-700/50 p-6 flex-shrink-0 backdrop-blur-sm">
                <div className="space-y-3">
                  <div className="flex space-x-4">
                    <input
                      ref={inputRef}
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                      placeholder="Ask a question..."
                      className="flex-1 px-4 py-3 bg-black/40 border border-gray-600/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent rounded-xl backdrop-blur-sm shadow-lg"
                      disabled={isAsking}
                    />
                    <button
                      onClick={handleAskQuestion}
                      disabled={!question.trim() || isAsking}
                      className="cursor-pointer px-8 py-3 bg-amber-600/80 hover:bg-amber-700/80 disabled:bg-gray-600/40 disabled:cursor-not-allowed text-black font-bold transition-all duration-200 rounded-xl shadow-lg backdrop-blur-sm min-w-[100px] flex items-center justify-center"
                    >
                      {isAsking ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black/80 rounded-full animate-spin"></div>
                      ) : (
                        'Ask'
                      )}
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-500 text-xs">
                      Ask specific questions to uncover inconsistencies in their story.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-black/40 rounded-xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-xl">
                  <span className="text-amber-400/80 text-3xl drop-shadow-lg">?</span>
                </div>
                <h3 className="text-xl font-light text-gray-100 mb-2 drop-shadow-xl">Select a Suspect</h3>
                <p className="text-gray-400">Choose someone to interrogate from the list</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}