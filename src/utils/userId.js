// Anonymous user identification via localStorage
// Generates a UUID on first visit and persists it for returning user detection

const STORAGE_KEY = 'trystart_user_id';

/**
 * Generate a UUID v4
 */
function generateUUID() {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get or create a persistent user ID
 * Returns the same UUID for returning users
 */
export function getUserId() {
  try {
    let userId = localStorage.getItem(STORAGE_KEY);

    if (!userId) {
      userId = generateUUID();
      localStorage.setItem(STORAGE_KEY, userId);
      console.log('New user ID created:', userId);
    } else {
      console.log('Returning user:', userId);
    }

    return userId;
  } catch (error) {
    // localStorage might be blocked (private browsing, etc.)
    console.warn('Could not access localStorage, generating temporary ID');
    return generateUUID();
  }
}

/**
 * Check if this is a new user (first visit)
 */
export function isNewUser() {
  try {
    return !localStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

/**
 * Clear the user ID (for testing purposes)
 */
export function clearUserId() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('User ID cleared');
  } catch (error) {
    console.warn('Could not clear user ID');
  }
}
