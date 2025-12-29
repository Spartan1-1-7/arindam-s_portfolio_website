'use client';

import React, { useState, useEffect } from 'react';
import TerminalLoading from './TerminalLoading';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if backend was already confirmed ready in this session
    const backendReady = sessionStorage.getItem('backend_ready');
    if (backendReady === 'true') {
      setIsBackendReady(true);
      setIsChecking(false);
    } else {
      setIsChecking(true);
    }
  }, []);

  const handleBackendReady = () => {
    setIsBackendReady(true);
    // Small delay for smooth transition
    setTimeout(() => {
      setIsChecking(false);
    }, 500);
  };

  if (isChecking && !isBackendReady) {
    return <TerminalLoading onReady={handleBackendReady} />;
  }

  return <>{children}</>;
};

export default AppWrapper;
