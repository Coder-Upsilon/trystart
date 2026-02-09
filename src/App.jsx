import { useState, useEffect } from 'react';
import EntryScreen from './components/EntryScreen';
import TaskSelection from './components/TaskSelection';
import TaskInput from './components/TaskInput';
import PresenceMode from './components/PresenceMode';
import { getUserId, isNewUser } from './utils/userId';

/**
 * Main App component - manages routing between screens
 * Flow: Entry → (Selection or Input) → Presence
 */
export default function App() {
  const [screen, setScreen] = useState('entry');
  const [selectedTask, setSelectedTask] = useState('');

  // Log user ID on app startup
  useEffect(() => {
    const isFirst = isNewUser();
    const userId = getUserId();
    console.log(`👤 User ID: ${userId} (${isFirst ? 'new user' : 'returning user'})`);
  }, []);

  // Handle entry screen choices
  const handleEntryChoice = (choice) => {
    if (choice === 'choices') {
      setScreen('selection');
    } else if (choice === 'have-task') {
      setScreen('input');
    } else if (choice === 'just-sit') {
      // Go directly to presence mode
      setSelectedTask('');
      setScreen('presence');
    }
  };

  // Handle task selection
  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setScreen('presence');
  };

  // Handle "neither" in selection
  const handleNeither = () => {
    setSelectedTask('');
    setScreen('presence');
  };

  // Handle task input
  const handleTaskInput = (task) => {
    setSelectedTask(task);
    setScreen('presence');
  };

  // Handle exit from presence mode (return to entry)
  const handleExit = () => {
    setSelectedTask('');
    setScreen('entry');
  };

  // Render current screen
  return (
    <div className="app relative min-h-screen">
      {screen === 'entry' && (
        <EntryScreen onChoice={handleEntryChoice} />
      )}

      {screen === 'selection' && (
        <TaskSelection
          onSelect={handleTaskSelect}
          onNeither={handleNeither}
        />
      )}

      {screen === 'input' && (
        <TaskInput onContinue={handleTaskInput} />
      )}

      {screen === 'presence' && (
        <PresenceMode onExit={handleExit} />
      )}

      {/* Copyright footer */}
      <footer className="fixed bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-xs text-gray-400">© 2026 Coder Upsilon</p>
      </footer>
    </div>
  );
}
