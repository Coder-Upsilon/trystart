# Firebase Setup Guide

This guide walks through setting up Firebase Firestore for real-time presence tracking.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Project name: `trystart`
4. Disable Google Analytics (not needed for MVP)
5. Click "Create project"

## Step 2: Enable Firestore

1. In Firebase Console, click "Firestore Database" in left sidebar
2. Click "Create database"
3. Select "Start in test mode" (we'll deploy proper rules later)
4. Choose a location (closest to target users)
5. Click "Enable"

## Step 3: Get Firebase Config

1. In Firebase Console, click the gear icon → "Project settings"
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. App nickname: `trystart-web`
5. Check "Also set up Firebase Hosting"
6. Click "Register app"
7. Copy the `firebaseConfig` object

## Step 4: Add Config to Project

1. Open `src/firebase.js`
2. Uncomment the import and initialization code
3. Replace the placeholder config with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "trystart.firebaseapp.com",
  projectId: "trystart",
  storageBucket: "trystart.appspot.com",
  messagingSenderId: "YOUR_ACTUAL_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

## Step 5: Deploy Firestore Rules

1. Install Firebase CLI (if not already installed):
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```
   - Select "Firestore" and "Hosting"
   - Choose existing project: `trystart`
   - Accept default Firestore rules file: `firestore.rules`
   - Accept default Firestore indexes file: `firestore.indexes.json`
   - Set public directory to: `dist`
   - Configure as single-page app: `Yes`
   - Set up automatic builds with GitHub: `No` (for now)

4. Deploy Firestore rules:
```bash
firebase deploy --only firestore:rules
```

## Step 6: Update useFirestore Hook

1. Open `src/hooks/useFirestore.js`
2. Replace the mock implementation with real Firebase code:

```javascript
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  where
} from 'firebase/firestore';

export function usePresence() {
  const [count, setCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  // Start a presence session
  const startSession = async () => {
    try {
      const sessionRef = await addDoc(collection(db, 'activeSessions'), {
        createdAt: serverTimestamp(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      });
      setSessionId(sessionRef.id);
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  // End a presence session
  const endSession = async () => {
    if (sessionId) {
      try {
        await deleteDoc(doc(db, 'activeSessions', sessionId));
        setSessionId(null);
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }
  };

  // Listen to presence count in real-time
  useEffect(() => {
    const q = query(
      collection(db, 'activeSessions'),
      where('expiresAt', '>', new Date())
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  return {
    count,
    startSession,
    endSession,
    isActive: !!sessionId
  };
}
```

## Step 7: Test Real-time Presence

1. Run the development server:
```bash
npm run dev
```

2. Open the app in multiple browser windows
3. Start a presence session in one window
4. Verify the count increases in all windows in real-time

## Step 8: Deploy to Firebase Hosting (Optional)

If you want to use Firebase Hosting instead of GitHub Pages:

```bash
# Build the app
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

Your app will be live at: `https://trystart.web.app`

## Cost Estimate

**Free tier limits (Firebase Spark plan):**
- Firestore: 50K reads, 20K writes, 20K deletes per day
- Hosting: 10GB storage, 360MB/day transfer

**Estimated usage:**
- Each session: 1 write (start) + 1 delete (end) = 2 operations
- Each user: ~10-20 sessions per day = 20-40 operations
- Real-time presence: ~1 read per second per active user

**Free tier supports:** ~500-1000 daily active users

**Beyond free tier:**
- $0.18 per 100K reads
- $0.18 per 100K writes
- Estimated cost at 5K DAU: ~$5-10/month

## Troubleshooting

**Error: "Missing or insufficient permissions"**
- Check that Firestore rules are deployed: `firebase deploy --only firestore:rules`
- Verify rules allow anonymous writes to `activeSessions`

**Count doesn't update in real-time**
- Check that Firebase config is correct in `src/firebase.js`
- Verify Firestore is enabled in Firebase Console
- Check browser console for errors

**Sessions don't auto-expire**
- Firestore doesn't automatically delete expired documents
- Consider using Cloud Functions to clean up expired sessions
- For MVP, manual cleanup is acceptable (documents are small)

## Next Steps

1. Set up Cloud Functions for automatic session cleanup (optional)
2. Add analytics to track usage (optional)
3. Monitor Firebase costs in Firebase Console
4. Consider upgrading to Blaze plan if approaching free tier limits

---

**Firebase project:** `trystart`
**Firestore rules:** `firestore.rules`
**Hosting site:** `https://trystart.web.app` (if using Firebase Hosting)
