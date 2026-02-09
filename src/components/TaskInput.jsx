import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Task input screen - optional text entry
 * Explicitly allows blank input (zero pressure)
 */
export default function TaskInput({ onContinue }) {
  const { t } = useTranslation();
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Allow blank submission - that's valid!
    onContinue(task);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-700">
            {t('input.title')}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            {t('input.subtitle')}
          </p>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            id="task-input"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder={t('input.placeholder')}
            className="w-full px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm
                     border-none shadow-sm focus:shadow-md focus:outline-none
                     resize-none h-24 text-gray-700 placeholder-gray-400"
            maxLength={100}
            aria-label="Task description (optional)"
          />

          <button
            type="submit"
            className="btn-primary w-full text-center py-4"
          >
            {t('input.continue')}
          </button>
        </form>

        {/* Character counter (subtle, non-judgmental) */}
        {task.length > 0 && (
          <p className="text-xs text-gray-400 text-right">
            {task.length}/100
          </p>
        )}
      </div>
    </div>
  );
}
