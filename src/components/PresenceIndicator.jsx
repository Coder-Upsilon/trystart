import { useTranslation } from 'react-i18next';

/**
 * Shows anonymous presence count
 * Real-time updates from Firebase (currently simulated)
 */
export default function PresenceIndicator({ count }) {
  const { t } = useTranslation();
  
  // count includes the current user, so others = count - 1
  const others = Math.max(0, count - 1);

  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 font-light">
        {others === 0 
          ? t('presence.first')
          : t('presence.peopleCount', { count: others })}
      </p>

      {/* Subtle visual feedback - small dots representing other people */}
      {others > 0 && (
        <div className="flex justify-center mt-3 space-x-1">
          {Array.from({ length: Math.min(others, 10) }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gentle-300 opacity-60"
              style={{
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
          {others > 10 && (
            <span className="text-xs text-gray-400 ml-2">+{others - 10}</span>
          )}
        </div>
      )}
    </div>
  );
}
