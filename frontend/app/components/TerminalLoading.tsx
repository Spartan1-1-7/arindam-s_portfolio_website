'use client';

import React, { useState, useEffect, useRef } from 'react';
import './TerminalLoading.css';

interface TerminalLoadingProps {
  onReady: () => void;
}

const TerminalLoading: React.FC<TerminalLoadingProps> = ({ onReady }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number>(Date.now());

  // Static prompt
  const staticPrompt = 'Arindam_Shukla@portfolio:~$';

  // Terminal messages sequence (after the prompt)
  const terminalSequence = [
    { text: ' boot --portfolio', delay: 50 },
    { text: '', delay: 800 }, // Pause
    { text: 'Initializing modules...', delay: 50 },
    { text: '', delay: 600 },
    { text: 'Loading creativity engine...', delay: 40 },
    { text: 'Compiling caffeine-driven code...', delay: 40 },
    { text: 'Optimizing bad decisions from 3AM...', delay: 40 },
    { text: '', delay: 500 },
    { text: 'Hi, user.', delay: 60 },
    { text: '', delay: 400 },
    { text: 'Keep calm.', delay: 60 },
    { text: '', delay: 400 },
    { text: 'Website is waking up...', delay: 50 },
  ];

  // Typing animation effect
  useEffect(() => {
    if (currentLineIndex >= terminalSequence.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentLine = terminalSequence[currentLineIndex];
    
    // Handle empty lines (pauses)
    if (currentLine.text === '') {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, '']);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, currentLine.delay);
      return () => clearTimeout(timer);
    }

    // Type character by character
    if (currentCharIndex < currentLine.text.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, currentLine.delay);
      return () => clearTimeout(timer);
    } else {
      // Line complete, move to next
      const timer = setTimeout(() => {
        setLines(prev => [...prev, currentLine.text]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex]);

  // Backend health check polling
  useEffect(() => {
    if (!isTypingComplete) return;

    const checkBackendHealth = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/health/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status === 'ok') {
            // Backend is ready
            if (pollingInterval.current) {
              clearInterval(pollingInterval.current);
            }
            // Store ready state in session
            sessionStorage.setItem('backend_ready', 'true');
            onReady();
          }
        }
      } catch (error) {
        // Backend not ready yet, continue polling
        console.log('Backend warming up...');
      }

      // Check for timeout (60 seconds)
      const elapsed = Date.now() - startTime.current;
      if (elapsed > 60000 && !showTimeoutMessage) {
        setShowTimeoutMessage(true);
      }
    };

    // Start polling every 4 seconds
    checkBackendHealth(); // Check immediately
    pollingInterval.current = setInterval(checkBackendHealth, 4000);

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, [isTypingComplete, showTimeoutMessage, onReady]);

  // Get current line being typed
  const getCurrentTypingLine = () => {
    if (currentLineIndex < terminalSequence.length) {
      const currentLine = terminalSequence[currentLineIndex];
      if (currentLine.text !== '') {
        return currentLine.text.substring(0, currentCharIndex);
      }
    }
    return '';
  };

  return (
    <div className="terminal-container">
      <div className="terminal-content">
        {/* Static prompt - always visible */}
        <div className="terminal-line">
          <span className="terminal-prompt">{staticPrompt}</span>
          {/* First line - show completed or being typed */}
          {currentLineIndex === 0 ? (
            <>
              {getCurrentTypingLine()}
              <span className="terminal-cursor">█</span>
            </>
          ) : (
            lines[0]
          )}
        </div>

        {/* Completed lines after the first */}
        {lines.slice(1).map((line, index) => (
          <div key={index + 1} className="terminal-line">
            {line}
          </div>
        ))}
        
        {/* Current line being typed (for lines after the first) */}
        {!isTypingComplete && currentLineIndex > 0 && (
          <div className="terminal-line">
            {getCurrentTypingLine()}
            <span className="terminal-cursor">█</span>
          </div>
        )}

        {/* Blinking cursor after typing complete */}
        {isTypingComplete && !showTimeoutMessage && (
          <div className="terminal-line">
            <span className="terminal-cursor blinking">█</span>
          </div>
        )}

        {/* Timeout message */}
        {showTimeoutMessage && (
          <div className="terminal-line timeout-message">
            Still warming up... free tier servers take a moment.
            <span className="terminal-cursor blinking">█</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalLoading;
