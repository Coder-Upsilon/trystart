// Firebase configuration for trystart
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsnX-x0vhbX0jeVpLLRCXhYeTfdCSUHSA",
  authDomain: "trystart-ae8e9.firebaseapp.com",
  projectId: "trystart-ae8e9",
  storageBucket: "trystart-ae8e9.firebasestorage.app",
  messagingSenderId: "292024095460",
  appId: "1:292024095460:web:07a0f842aa57f6a03212f1",
  measurementId: "G-8WBKY6KX7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Connect to Firestore Emulator when running locally (optional)
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  try {
    // Uncomment below to use emulator locally
    // connectFirestoreEmulator(db, 'localhost', 8081);
    // console.log('🔥 Connected to Firestore Emulator on localhost:8081');
  } catch (error) {
    console.error('Error connecting to Firestore Emulator:', error);
  }
}

export { db };
