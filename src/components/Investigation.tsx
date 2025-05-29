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
    scrollToBottom();
    if (!selectedCharacter || !question.trim()) return;
    
    setIsAsking(true);
    try {
      await onAskCharacter(selectedCharacter.id, question);
      setQuestion('');
      scrollToBottom();
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
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Confirmation Modal */}
      {showConfirmModal && selectedCharacter && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-600 rounded-xl shadow-2xl max-w-lg w-full animate-fade-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🚨</span>
                <h2 className="text-xl font-light text-white tracking-wide">CONFIRM ARREST</h2>
              </div>
              <div className="h-px bg-red-500/30 w-full"></div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <Image
                  src={avatarService.generateAvatarUrl(selectedCharacter, 60)}
                  alt={selectedCharacter.name}
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-lg border-2 border-gray-600"
                  unoptimized={true}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1">{selectedCharacter.name}</h3>
                  <p className="text-amber-400 text-sm mb-1">{selectedCharacter.occupation}</p>
                  <p className="text-gray-400 text-sm">{selectedCharacter.age} years old</p>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <h4 className="text-red-400 text-sm font-medium uppercase tracking-wider mb-2">⚠️ WARNING</h4>
                <p className="text-gray-300 font-light leading-relaxed">
                  You are about to arrest <span className="text-white font-medium">{selectedCharacter.name}</span> for murder. 
                  This action will close the case permanently. Are you certain you have enough evidence?
                </p>
              </div>

              <div className="text-center mb-4">
                <p className="text-gray-400 text-sm font-light">
                  Once you make this accusation, there&apos;s no going back.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-700 flex space-x-4">
              <button
                onClick={handleCancelArrest}
                className="cursor-pointer flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium text-sm uppercase tracking-wider transition-colors duration-200 rounded-lg border border-gray-600"
              >
                Continue Investigation
              </button>
              <button
                onClick={handleConfirmArrest}
                className="cursor-pointer flex-1 px-4 py-3 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 rounded-lg shadow-lg border border-red-500/50"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>🚨</span>
                  <span>Arrest Now</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 border-b border-gray-700 p-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-light text-white tracking-wide">ACTIVE INVESTIGATION</h1>
            <div className="h-px bg-amber-400 w-20 mt-1"></div>
          </div>
        </div>
      </div>

      {/* Main content area - Takes remaining height */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full min-h-0 overflow-hidden">
        {/* Sidebar - Character List */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex-shrink-0">
            <h2 className="text-amber-400 text-sm font-medium uppercase tracking-wider">Suspects</h2>
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
                  className={`cursor-pointer w-full p-4 text-left border-b border-gray-700/50 transition-all duration-200 ${
                    isSelected 
                      ? 'bg-amber-900/30 border-l-4 border-l-amber-400' 
                      : 'hover:bg-gray-700/50'
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
                        className="w-12 h-12 rounded-lg border-2 border-gray-600"
                        unoptimized={true}
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{character.name}</h3>
                        <p className="text-gray-400 text-sm">{character.occupation}</p>
                        <p className="text-gray-500 text-xs mt-1">{character.age} years old</p>
                      </div>
                    </div>
                    {messageCount > 0 && (
                      <div className="bg-amber-600 text-black text-xs px-2 py-1 rounded-full">
                        {messageCount}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Police-style accusation section - Dark theme */}
          <div className="bg-gray-800 p-6 flex-shrink-0">
            <div className="space-y-3">
              <button
                onClick={handleArrestClick}
                disabled={!selectedCharacter}
                className="rounded-lg group cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg border-2 border-gray-500/50 hover:border-gray-400 disabled:border-gray-700"
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

        <div className="flex-1 flex flex-col bg-gray-900 min-h-0 overflow-hidden">
          {selectedCharacter ? (
            <>
              <div className="bg-gray-800 border-b border-gray-700 p-6 flex-shrink-0">
                <div className="flex items-start space-x-6">
                  <Image
                    src={avatarService.generateAvatarUrl(selectedCharacter, 80)}
                    alt={selectedCharacter.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg border-2 border-amber-400"
                    unoptimized={true}
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-light text-white">{selectedCharacter.name}</h2>
                    <p className="text-amber-400 text-sm">{selectedCharacter.occupation}</p>
                    <p className="text-gray-400 text-sm mt-2">{selectedCharacter.description}</p>
                  </div>
                </div>
              </div>

              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
              >
                <div className="p-6 space-y-4">
                  {getConversation(selectedCharacter.id)?.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.speaker === 'player' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`min-w-[50%] max-w-[80%] p-4 rounded-lg ${
                          message.speaker === 'player'
                            ? 'bg-amber-600 text-black'
                            : `bg-gray-800 text-white ${message.isLie ? 'border-l-4 border-l-red-500' : ''}`
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {message.speaker === 'character' && (
                            <Image
                              src={avatarService.generateAvatarUrl(selectedCharacter, 32)}
                              alt={selectedCharacter.name}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
                              unoptimized={true}
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-light leading-relaxed">{message.content}</p>
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
                                  <span className="text-red-400 text-xs font-medium">Suspicious</span>
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

              <div className="bg-gray-800 border-t border-gray-700 p-6 flex-shrink-0">
                <div className="space-y-3">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                      placeholder="Ask a question..."
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent rounded-lg"
                      disabled={isAsking}
                    />
                    <button
                      onClick={handleAskQuestion}
                      disabled={!question.trim() || isAsking}
                      className="cursor-pointer px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-medium transition-colors duration-200 rounded-lg"
                    >
                      {isAsking ? 'Asking...' : 'Ask'}
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">
                      Ask specific questions to uncover inconsistencies in their story.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-amber-400 text-3xl">?</span>
                </div>
                <h3 className="text-xl font-light text-white mb-2">Select a Suspect</h3>
                <p className="text-gray-400">Choose someone to interrogate from the list</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}