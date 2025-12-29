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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
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

  // Backend health check and data loading
  useEffect(() => {
    if (!isTypingComplete) return;

    const checkBackendAndLoadData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        
        // First check health
        const healthResponse = await fetch(`${apiUrl}/api/health/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (healthResponse.ok) {
          const healthData = await healthResponse.json();
          if (healthData.status === 'ok') {
            // Backend is awake, now load actual data
            if (pollingInterval.current) {
              clearInterval(pollingInterval.current);
            }

            // Fetch all required data in parallel
            try {
              const [profileRes, projectsRes, skillsRes, experienceRes, achievementsRes] = await Promise.all([
                fetch(`${apiUrl}/api/profile/`),
                fetch(`${apiUrl}/api/projects/`),
                fetch(`${apiUrl}/api/skills/`),
                fetch(`${apiUrl}/api/experience/`),
                fetch(`${apiUrl}/api/achievements/`)
              ]);

              // Check if all requests succeeded
              if (profileRes.ok && projectsRes.ok && skillsRes.ok && experienceRes.ok && achievementsRes.ok) {
                // Parse the data to ensure it's valid
                await Promise.all([
                  profileRes.json(),
                  projectsRes.json(),
                  skillsRes.json(),
                  experienceRes.json(),
                  achievementsRes.json()
                ]);

                // All data loaded successfully
                setIsDataLoaded(true);
                sessionStorage.setItem('backend_ready', 'true');
              }
            } catch (dataError) {
              console.log('Error loading data, retrying...');
              // Continue polling if data load fails
            }
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
    checkBackendAndLoadData(); // Check immediately
    pollingInterval.current = setInterval(checkBackendAndLoadData, 4000);

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, [isTypingComplete, showTimeoutMessage]);

  // Trigger transition only when both animation is complete AND data is loaded
  useEffect(() => {
    if (isTypingComplete && isDataLoaded) {
      onReady();
    }
  }, [isTypingComplete, isDataLoaded, onReady]);

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
