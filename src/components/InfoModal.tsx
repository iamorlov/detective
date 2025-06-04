'use client';

import { useTranslations } from '@/hooks/useTranslations';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  const t = useTranslations();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/60 border border-gray-700/70 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in backdrop-blur-md">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-gray-700/50 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-2xl font-light text-gray-100 tracking-wide drop-shadow-lg mb-2 playfair-font uppercase">{t.gameInfo}</h2>
              <div className="h-px bg-blue-500/60 w-16 sm:w-20 shadow-lg"></div>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer p-2 bg-black/40 hover:bg-black/60 text-gray-400 hover:text-gray-200 transition-all duration-200 rounded-lg border border-gray-600/50"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* How to Play */}
          <div className="bg-black/30 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm shadow-lg">
            <h3 className="text-blue-400/90 font-medium mb-3 drop-shadow-lg tracking-wide text-sm sm:text-base">{t.howToPlay}</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>• {t.howToPlayStep1}</p>
              <p>• {t.howToPlayStep2}</p>
              <p>• {t.howToPlayStep3}</p>
              <p>• {t.howToPlayStep4}</p>
              <p>• {t.howToPlayStep5}</p>
            </div>
          </div>

          {/* Core Mechanics */}
          <div className="bg-black/30 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm shadow-lg">
            <h3 className="text-blue-400/90 font-medium mb-3 drop-shadow-lg tracking-wide text-sm sm:text-base">{t.coreMechanics}</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>• {t.mechanicsLimit}</p>
              <p>• {t.mechanicsQuestions}</p>
              <p>• {t.mechanicsDeduction}</p>
              <p>• {t.mechanicsConsequences}</p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-black/30 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm shadow-lg">
            <h3 className="text-blue-400/90 font-medium mb-3 drop-shadow-lg tracking-wide text-sm sm:text-base">{t.tips}</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>• {t.tip1}</p>
              <p>• {t.tip2}</p>
              <p>• {t.tip3}</p>
              <p>• {t.tip4}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}