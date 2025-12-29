'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import TerminalLoading to reduce initial bundle size
const TerminalLoading = dynamic(() => import('./TerminalLoading'), {
  ssr: false,
});

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  // Check sessionStorage immediately on mount
  const [shouldShowLoading, setShouldShowLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('loadingScreenSeen') !== 'true';
    }
    return true;
  });

  const handleBackendReady = () => {
    // Mark that loading screen has been shown
    sessionStorage.setItem('loadingScreenSeen', 'true');
    setShouldShowLoading(false);
  };

  // Skip loading screen if already seen in this session
  if (!shouldShowLoading) {
    return <>{children}</>;
  }

  return <TerminalLoading onReady={handleBackendReady} />;
};

export default AppWrapper;
