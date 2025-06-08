'use client';

import { useState } from 'react';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '@/lib/game-engine';
import { useTranslations } from '@/hooks/useTranslations';

interface DifficultySelectorProps {
  selectedDifficulty: DifficultyLevel;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  className?: string;
}

export default function DifficultySelector({
  selectedDifficulty,
  onDifficultyChange,
  className = ''
}: DifficultySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  const getDifficultyLabel = (difficulty: DifficultyLevel): string => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    switch (difficulty) {
      case 'easy':
        return `${t.easy || 'Easy'} (${config.suspectCount} ${t.suspectsDropdown || 'suspects'})`;
      case 'medium':
        return `${t.medium || 'Medium'} (${config.suspectCount} ${t.suspectsDropdown || 'suspects'})`;
      case 'hard':
        return `${t.hard || 'Hard'} (${config.suspectCount} ${t.suspectsDropdown || 'suspects'})`;
      default:
        return `${config.label} (${config.suspectCount})`;
    }
  };

  const handleDifficultySelect = (difficulty: DifficultyLevel) => {
    onDifficultyChange(difficulty);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center justify-between w-full px-4 py-3 bg-black/30 hover:bg-black/50 text-blue-400/80 hover:text-blue-400 text-sm font-medium tracking-wide transition-all duration-200 rounded-lg border border-blue-500/30 hover:border-blue-500/50 backdrop-blur-sm shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-300 text-xs uppercase tracking-wider">
            {t.difficulty || 'Difficulty'}:
          </span>
          <span className="text-blue-400">
            {getDifficultyLabel(selectedDifficulty)}
          </span>
        </div>
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
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-blue-500/30 rounded-lg shadow-2xl backdrop-blur-sm z-50 overflow-hidden">
            {Object.entries(DIFFICULTY_CONFIGS).map(([key]) => {
              const difficulty = key as DifficultyLevel;
              const isSelected = selectedDifficulty === difficulty;

              return (
                <button
                  key={difficulty}
                  onClick={() => handleDifficultySelect(difficulty)}
                  className={`cursor-pointer w-full px-4 py-3 text-left transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${isSelected
                      ? 'bg-indigo-900 text-white'
                      : 'text-gray-300 hover:bg-slate-950 hover:text-white'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {getDifficultyLabel(difficulty)}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        {difficulty === 'easy' && (t.easyDescription || 'Perfect for beginners')}
                        {difficulty === 'medium' && (t.mediumDescription || 'Balanced challenge')}
                        {difficulty === 'hard' && (t.hardDescription || 'For experienced detectives')}
                      </span>
                    </div>
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}