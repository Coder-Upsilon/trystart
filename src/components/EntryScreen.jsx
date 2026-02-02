import { useTranslation } from 'react-i18next';

/**
 * Entry screen - first thing users see
 * Three pathways: get choices, have task, just sit
 */
export default function EntryScreen({ onChoice }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        {/* Main title */}
        <div className="text-center">
          <h1 className="text-3xl font-light text-gray-700">
            {t('entry.title')}
          </h1>
        </div>

        {/* Three option buttons */}
        <div className="space-y-4">
          <button
            onClick={() => onChoice('choices')}
            className="btn-primary w-full text-center py-4"
          >
            {t('entry.giveChoices')}
          </button>

          <button
            onClick={() => onChoice('have-task')}
            className="btn-soft w-full text-center py-4"
          >
            {t('entry.haveTask')}
          </button>

          <button
            onClick={() => onChoice('just-sit')}
            className="btn-soft w-full text-center py-4"
          >
            {t('entry.justSit')}
          </button>
        </div>

        {/* Subtle app name at bottom */}
        <div className="text-center mt-12">
          <p className="text-xs text-gray-400 font-light">trystart</p>
        </div>
      </div>
    </div>
  );
}
