import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getTwoRandomTasks } from '../utils/taskPool';

/**
 * Task selection screen - presents two low-effort options
 * User picks which feels "less effort" (not "better" or "more productive")
 */
export default function TaskSelection({ onSelect, onNeither }) {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTwoRandomTasks());
  }, []);

  if (tasks.length === 0) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        {/* Question */}
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-700">
            {t('selection.title')}
          </h2>
        </div>

        {/* Two task options */}
        <div className="space-y-4">
          <button
            onClick={() => onSelect(tasks[0])}
            className="btn-soft w-full text-center py-6 hover:bg-gentle-100"
          >
            <p className="text-lg">{tasks[0]}</p>
          </button>

          <button
            onClick={() => onSelect(tasks[1])}
            className="btn-soft w-full text-center py-6 hover:bg-gentle-100"
          >
            <p className="text-lg">{tasks[1]}</p>
          </button>
        </div>

        {/* Neither option (important - gives permission to not choose) */}
        <div className="text-center mt-6">
          <button
            onClick={onNeither}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t('selection.neither')}
          </button>
        </div>
      </div>
    </div>
  );
}
