import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { getUserId } from '../utils/userId';

// Check if Firebase is configured
const isFirebaseConfigured = db !== null;

/**
 * Hook for managing Firebase presence
 * Falls back to mock data if Firebase is not configured
 */
export function usePresence() {
  const [count, setCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  // Start a presence session
  const startSession = async () => {
    if (!isFirebaseConfigured) {
      // MOCK: Simulate presence count
      const mockCount = Math.floor(Math.random() * 20) + 5;
      setCount(mockCount);
      setSessionId(Date.now().toString());
      return;
    }

    // REAL: Create Firebase session
    try {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const userId = getUserId();
      const sessionRef = await addDoc(collection(db, 'activeSessions'), {
        userId,
        createdAt: serverTimestamp(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      });
      setSessionId(sessionRef.id);
      console.log('Firebase session started:', sessionRef.id, 'for user:', userId);
    } catch (error) {
      console.error('Error starting Firebase session:', error);
    }
  };

  // End a presence session
  const endSession = async () => {
    if (!sessionId) return;

    if (!isFirebaseConfigured) {
      // MOCK: Just clear session
      setSessionId(null);
      return;
    }

    // REAL: Delete Firebase session
    try {
      const { doc, deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'activeSessions', sessionId));
      setSessionId(null);
      console.log('Firebase session ended');
    } catch (error) {
      console.error('Error ending Firebase session:', error);
    }
  };

  // Listen to presence count in real-time
  useEffect(() => {
    if (!isFirebaseConfigured) {
      // MOCK: Simulate real-time updates
      if (sessionId) {
        const interval = setInterval(() => {
          setCount(prev => {
            const change = Math.random() > 0.5 ? 1 : -1;
            return Math.max(1, prev + change);
          });
        }, 15000);
        return () => clearInterval(interval);
      }
      return;
    }

    // REAL: Subscribe to Firebase collection
    let unsubscribe;
    (async () => {
      try {
        const { collection, query, where, onSnapshot } = await import('firebase/firestore');
        const q = query(
          collection(db, 'activeSessions'),
          where('expiresAt', '>', new Date())
        );

        unsubscribe = onSnapshot(q, (snapshot) => {
          setCount(snapshot.size);
          console.log('Real-time presence count:', snapshot.size);
        }, (error) => {
          console.error('Error listening to presence:', error);
        });
      } catch (error) {
        console.error('Error setting up Firebase listener:', error);
      }
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [sessionId]);

  return {
    count,
    startSession,
    endSession,
    isActive: !!sessionId,
    usingFirebase: isFirebaseConfigured
  };
}
