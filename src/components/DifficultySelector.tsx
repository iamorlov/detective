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
        return `${t.easy} (${config.suspectCount} ${t.suspectsDropdown || 'suspects'})`;
      case 'medium':
        return `${t.medium} (${config.suspectCount} ${t.suspectsDropdown || 'suspects'})`;
      case 'hard':
        return `${t.hard} (${config.suspectCount} ${t.suspectsDropdown || 'suspects'})`;
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
        className="flex items-center justify-between w-full px-4 py-3 bg-slate-800/60 hover:bg-slate-700/60 text-blue-300 hover:text-blue-200 text-sm font-medium tracking-wide transition-all duration-200 rounded-full border border-slate-600/30 hover:border-slate-500/50 backdrop-blur-sm shadow-lg cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-slate-300 text-xs uppercase tracking-wider">
            {t.difficulty || 'Difficulty'}:
          </span>
          <span className="text-blue-300">
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
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600/30 rounded-2xl shadow-2xl backdrop-blur-sm z-50 overflow-hidden elevation-2 ">
            {Object.entries(DIFFICULTY_CONFIGS).map(([key]) => {
              const difficulty = key as DifficultyLevel;
              const isSelected = selectedDifficulty === difficulty;

              return (
                <button
                  key={difficulty}
                  onClick={() => handleDifficultySelect(difficulty)}
                  className={`w-full px-4 py-3 text-left transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl cursor-pointer ${isSelected
                      ? 'bg-blue-600/20 text-blue-300'
                      : 'text-slate-100 hover:bg-slate-700/50 hover:text-blue-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {getDifficultyLabel(difficulty)}
                      </span>
                      <span className="text-xs text-slate-400 mt-1">
                        {difficulty === 'easy' && t.easyDescription}
                        {difficulty === 'medium' && t.mediumDescription}
                        {difficulty === 'hard' && t.hardDescription}
                      </span>
                    </div>
                    {isSelected && (
                      <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
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