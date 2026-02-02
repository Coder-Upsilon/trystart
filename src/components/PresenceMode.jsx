import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Timer from './Timer';
import PresenceIndicator from './PresenceIndicator';
import { usePresence } from '../hooks/useFirestore';
import { getRandomExitMessage } from '../utils/exitMessages';

/**
 * Presence Mode - the core experience
 * Shows: timer, presence count, and exit button
 * Philosophy: "You've already started" (affirmation, not pressure)
 */
export default function PresenceMode({ onExit }) {
  const { t } = useTranslation();
  const { count, startSession, endSession } = usePresence();
  const [showExitMessage, setShowExitMessage] = useState(false);
  const [exitMessage, setExitMessage] = useState('');

  useEffect(() => {
    startSession();
    return () => endSession();
  }, []);

  const handleExit = () => {
    // Pick a random message before showing
    setExitMessage(getRandomExitMessage());
    setShowExitMessage(true);
    endSession();

    // Wait for fade-in-out animation to complete (3.5s) + buffer, then exit
    setTimeout(() => {
      onExit();
    }, 4000);
  };

  if (showExitMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <p className="text-2xl font-light text-gray-700 animate-fade-in-out">
            {exitMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-12 animate-fade-in">
        {/* Affirmation title */}
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-700">
            {t('presence.started')}
          </h2>
        </div>

        {/* Timer with breathing circle */}
        <Timer />

        {/* Presence indicator */}
        <PresenceIndicator count={count} />

        {/* Exit button (always visible, no guilt) */}
        <div className="text-center pt-8">
          <button
            onClick={handleExit}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t('presence.exit')}
          </button>
        </div>
      </div>
    </div>
  );
}
