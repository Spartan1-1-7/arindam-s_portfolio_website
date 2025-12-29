'use client';

import React, { useState, useEffect } from 'react';
import TerminalLoading from './TerminalLoading';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isBackendReady, setIsBackendReady] = useState(false);

  const handleBackendReady = () => {
    setIsBackendReady(true);
  };

  if (!isBackendReady) {
    return <TerminalLoading onReady={handleBackendReady} />;
  }

  return <>{children}</>;
};

export default AppWrapper;
