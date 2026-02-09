// Low-effort task suggestions for users who need a gentle start
// All tasks are genuinely micro-actions with zero guilt
const taskPool = [
  "Drink a glass of water",
  "Stretch for 30 seconds",
  "Open a window",
  "Take three deep breaths",
  "Put on comfortable clothes",
  "Look at something green outside",
  "Stand up and sit back down",
  "Move one thing to where it belongs",
  "Check the weather",
  "Pet an animal (if nearby)",
  "Listen to one song",
  "Wash your hands with nice soap",
  "Make a cup of tea",
  "Change your socks",
  "Smile at yourself in a mirror",
  "Turn on a lamp",
  "Look up from your phone",
  "Wiggle your toes",
  "Hum a tune",
  "Notice three things you can see",
  "Feel your feet on the floor",
  "Roll your shoulders",
  "Blink slowly five times",
  "Say something kind to yourself",
  "Touch something soft",
  "Step outside for a moment",
  "Close your eyes for 10 seconds",
  "Shake your hands out",
  "Sit in a different spot",
  "Look at a plant",
];

/**
 * Get two random unique tasks from the pool
 * @returns {[string, string]} Array of two task strings
 */
export function getTwoRandomTasks() {
  const shuffled = [...taskPool].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

/**
 * Get a single random task
 * @returns {string} Random task string
 */
export function getRandomTask() {
  return taskPool[Math.floor(Math.random() * taskPool.length)];
}

export default taskPool;
