'use client';

import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SignOutButtonProps {
  onSignOut?: () => void;
  className?: string;
}

export default function SignOutButton({ onSignOut, className }: SignOutButtonProps) {
  const { signOut, user } = useAuth();
  const t = useTranslations();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSignOut = async () => {
    await signOut();
    onSignOut?.();
  };

  const handleSignOutClick = () => {
    setShowConfirmation(true);
    setProgress(0);
  };

  useEffect(() => {
    if (showConfirmation) {
      const duration = 4000; // 4 seconds
      const interval = 50; // Update every 50ms for smooth animation
      const step = (interval / duration) * 100;

      const progressTimer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + step;
          if (newProgress >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return newProgress;
        });
      }, interval);

      const timer = setTimeout(() => {
        setShowConfirmation(false);
        setProgress(0);
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
      };
    }
  }, [showConfirmation]);

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Splitter - only show if user is logged in */}
      {user && (
        <div className="w-px h-6 bg-gray-600/50"></div>
      )}

      {/* Sign Out Button or Confirmation Button */}
      <div className="relative">
        {/* Regular Sign Out Button */}
        <div className={`flex items-center transition-all duration-300 ease-in-out ${
          showConfirmation 
            ? 'opacity-0 scale-95 pointer-events-none transform translate-x-2' 
            : 'opacity-100 scale-100 pointer-events-auto transform translate-x-0'
        }`}>
          {/* Account Photo */}
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              alt={user.displayName || 'User'}
              title={user.displayName || 'User'}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border border-gray-600/50 hover:border-gray-500/70 transition-all duration-200 mr-2"
            />
          )}
          <button
            onClick={handleSignOutClick}
            className={className || "cursor-pointer flex items-center justify-center px-3 py-2 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-all duration-200 rounded-lg border border-gray-600/50 hover:border-gray-500/70 backdrop-blur-sm shadow-lg h-[38px]"}
            title={t.logOut}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Confirmation Button */}
        <div className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${
          showConfirmation 
            ? 'opacity-100 scale-100 pointer-events-auto transform translate-x-0' 
            : 'opacity-0 scale-95 pointer-events-none transform -translate-x-2'
        }`}>
          <div className="relative overflow-hidden rounded-lg">
            <button
              onClick={handleSignOut}
              className="cursor-pointer flex items-center justify-center px-4 py-2 bg-red-500/80 hover:bg-red-600/80 text-white text-xs font-medium tracking-wide transition-all duration-200 rounded-lg backdrop-blur-sm shadow-lg h-[38px] leading-tight"
              title={t.logOut}
            >
              {t.logOut}?
            </button>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-red-400 transition-all duration-75 ease-linear"
                 style={{ width: `${progress}%` }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}