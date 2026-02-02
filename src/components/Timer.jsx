import { useTranslation } from 'react-i18next';
import { useElapsedTimer } from '../hooks/useElapsedTimer';

/**
 * Elapsed timer component with fuzzy time display
 * Auto-hides after 10 minutes (forgiveness design)
 * Shows elapsed time, NOT countdown (no deadline pressure)
 */
export default function Timer() {
  const { t } = useTranslation();
  const { elapsed, isActive, minutes } = useElapsedTimer();

  // Don't show timer after 10 minutes (amnesiac interface)
  if (!isActive || elapsed >= 600) {
    return null;
  }

  // Fuzzy time display (no seconds to reduce anxiety)
  const getDisplayText = () => {
    if (minutes === 0) {
      return t('timer.justStarted');
    } else if (minutes < 3) {
      return t('timer.abit');
    } else if (minutes < 7) {
      return t('timer.going', { minutes });
    } else {
      return t('timer.stillGoing');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      {/* Breathing circle visual (calming, non-numerical) */}
      <div className="breathing-circle" />

      {/* Fuzzy time text */}
      <p className="text-lg text-gray-600 font-light">
        {getDisplayText()}
      </p>
    </div>
  );
}
