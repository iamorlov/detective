'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  // Firebase handles auth state automatically, no provider needed
  return <>{children}</>;
}