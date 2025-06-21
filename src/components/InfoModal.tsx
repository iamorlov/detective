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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-600/30 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto elevation-3">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-600/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-2xl font-medium text-slate-100 tracking-wide playfair-font uppercase">{t.gameInfo}</h2>
              <div className="h-0.5 bg-blue-400/60 w-16 sm:w-20 mt-2"></div>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer p-2 hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors duration-200 rounded-xl"
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
          <div className="bg-slate-750/50 border border-slate-600/20 rounded-2xl p-4 backdrop-blur-sm shadow-md">
            <h3 className="text-blue-300 font-medium mb-3 tracking-wide text-sm sm:text-base">{t.howToPlay}</h3>
            <div className="space-y-3 text-slate-100 text-sm">
              <p>• {t.howToPlayStep1}</p>
              <p>• {t.howToPlayStep2}</p>
              <p>• {t.howToPlayStep3}</p>
              <p>• {t.howToPlayStep4}</p>
              <p>• {t.howToPlayStep5}</p>
            </div>
          </div>

          {/* Core Mechanics */}
          <div className="bg-slate-750/50 border border-slate-600/20 rounded-2xl p-4 backdrop-blur-sm shadow-md">
            <h3 className="text-blue-300 font-medium mb-3 tracking-wide text-sm sm:text-base">{t.coreMechanics}</h3>
            <div className="space-y-3 text-slate-100 text-sm">
              <p>• {t.mechanicsLimit}</p>
              <p>• {t.mechanicsQuestions}</p>
              <p>• {t.mechanicsDeduction}</p>
              <p>• {t.mechanicsConsequences}</p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-slate-750/50 border border-slate-600/20 rounded-2xl p-4 backdrop-blur-sm shadow-md">
            <h3 className="text-blue-300 font-medium mb-3 tracking-wide text-sm sm:text-base">{t.tips}</h3>
            <div className="space-y-3 text-slate-100 text-sm">
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