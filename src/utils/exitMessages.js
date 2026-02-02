// Random exit messages - all follow the zero-guilt philosophy
// ✅ ALWAYS use: affirming, permission-giving, gentle
// ❌ NEVER use: guilt, achievement language, productivity terms

const exitMessages = [
  "You showed up. That's enough.",
  "You tried. That matters.",
  "You were here. That counts.",
  "You gave it a moment. That's something.",
  "You started. That's the hardest part.",
  "You moved a little. That's real.",
  "You showed up for yourself.",
  "That was enough for now.",
  "You did something. That's not nothing.",
  "You were present. That's rare.",
  "You took a breath. That's a start.",
  "You made space for yourself.",
  "You're allowed to put it down.",
  "Rest is part of trying.",
  "You listened to yourself. Good.",
];

/**
 * Get a random exit message
 */
export function getRandomExitMessage() {
  const index = Math.floor(Math.random() * exitMessages.length);
  return exitMessages[index];
}

/**
 * Get all exit messages (for testing)
 */
export function getAllExitMessages() {
  return [...exitMessages];
}
