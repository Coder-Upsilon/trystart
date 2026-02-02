// Firebase configuration for local emulators
// This connects to Firebase Emulators for local testing
// No cloud credentials needed!

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Demo Firebase config (used for emulators only)
const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-trystart",
  storageBucket: "demo-trystart.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Connect to Firestore Emulator when running locally
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8081);
    console.log('🔥 Connected to Firestore Emulator on localhost:8081');
  } catch (error) {
    console.error('Error connecting to Firestore Emulator:', error);
  }
}

export { db };
