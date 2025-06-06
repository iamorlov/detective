'use client';

import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

interface SignOutButtonProps {
  onSignOut?: () => void;
  className?: string;
}

export default function SignOutButton({ onSignOut, className }: SignOutButtonProps) {
  const { signOut, user } = useAuth();
  const t = useTranslations();

  const handleSignOut = async () => {
    await signOut();
    onSignOut?.();
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Splitter - only show if user is logged in */}
      {user && (
        <div className="w-px h-6 bg-gray-600/50"></div>
      )}

      {/* Account Photo */}
      {user?.photoURL && (
        <Image
          src={user.photoURL}
          alt={user.displayName || 'User'}
          title={user.displayName || 'User'}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full border border-gray-600/50 hover:border-gray-500/70 transition-all duration-200"
        />
      )}

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className={className || "cursor-pointer flex items-center justify-center px-3 py-2 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-all duration-200 rounded-lg border border-gray-600/50 hover:border-gray-500/70 backdrop-blur-sm shadow-lg h-[38px]"}
        title={t.logOut}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  );
}