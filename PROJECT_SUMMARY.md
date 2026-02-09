# No-Guilt Task Initiation App - Project Summary & Plan

**Date**: 2026-02-01
**Status**: Planning complete, ready for implementation

---

## 🎯 Project Concept

A minimal web app (PWA) that helps users overcome **task paralysis** through:
- Low-pressure task initiation prompts
- Anonymous body doubling presence
- Zero-guilt entry/exit experience

**Core Insight**: Help users move from "stuck/scrolling" to "started" - NOT productivity tracking.

**Positioning**: "For the 10 minutes BEFORE productivity" - addresses the gap before users are ready for tools like bodydoubling.space or Focusmate.

---

## ✅ Market Validation (Research Completed)

### Market Size
- **11.4M U.S. adults** with current ADHD diagnosis
- **2.2M members** in r/ADHD (highly engaged community)
- ADHD prevalence increased **42% from 2003-2011**
- Target early adopters: **5,000-50,000 users**

### Validated Gap
1. **Problem**: Existing tools help with focus/accountability, but ADHD struggles are with **starting/transitions**
2. **User Pain Point**: "The hardest part isn't doing things — it's starting, switching, stopping"
3. **Competitive Gap**: No tool targets the "stuck scrolling" → "starting something" moment
4. **Quote**: "ADHD needs permission more than motivation"

### Competition Analysis

| Tool | Focus | Entry Friction | Social Pressure | Price | Our Differentiation |
|------|-------|----------------|-----------------|-------|---------------------|
| Focusmate | 1-on-1 accountability | Medium (scheduled) | High | Free + Premium | We're pre-work, they're during-work |
| bodydoubling.space | Drop-in co-working | Low | Low | Free | We allow "don't know what to do" state |
| FLOWN | Facilitated sessions | Medium | Medium | $29-99/mo | We're anonymous, no facilitation |
| Deepwrk | Structured sessions | Medium | Medium | Unknown | We're unstructured, no gamification |

**Our Unique Position**: We serve users who are too stuck to even join a body doubling session.

### Monetization Viability
- **Operating Cost**: $0/month (GitHub Pages + Firebase free tier)
- **Break-even**: 50-100 users at $2-5/month (if monetizing)
- **Market Proof**: ADHD tools successfully monetize (FLOWN: $29-99/mo, Shimmer: coaching fees)
- **Strategy**: Keep core "presence" free, optional paid tier later

---

## 🏗️ Technical Architecture

### Tech Stack (Decisions Made)

**Frontend**
- Framework: **React 18** with **Vite** (fast build, modern)
- Styling: **Tailwind CSS** (rapid prototyping, responsive)
- i18n: **react-i18next** (English-first, extensible to other languages)
- Hosting: **GitHub Pages** (free, unlimited bandwidth)

**Backend**
- Database: **Firebase Firestore** (real-time, generous free tier)
- Auth: Anonymous sessions (no accounts needed)
- Functions: Optional Cloud Functions for cleanup tasks

**PWA**
- Service worker for offline support
- Installable on mobile home screen
- Fast loading, minimal dependencies

### Cost Structure
- **MVP: $0/month** 🎉
  - GitHub Pages: Free static hosting
  - Firebase Firestore: Free tier (50K reads/day, 20K writes/day, 1GB storage)
- **Scale**: Can handle 500-1000 daily active users before hitting limits

### Deployment
- GitHub Actions auto-deploy on push to main
- Live at: `https://yourusername.github.io/trystart/`
- Optional custom domain (~$10-15/year)

---

## 🎨 UX Design Specification

### Core User Flow

**Screen 1: Entry Point**
```
"Try starting something?"

[Give me two choices]
[I already have something to do]
[I just want to sit for a while]
```

**Screen 2A: Task Selection** (if "Give me two choices")
```
"Which feels less effort?"

[Open a file]
[Sit for 2 minutes]

[Neither] — that's okay too
```

**Screen 2B: Task Input** (if "I already have something")
```
"One sentence is fine (or leave blank)"

[text input]
[Start]
```

**Screen 3: Presence Mode**
```
"You've already started"

11 people are also trying to start

[I'm putting it down now]

→ Exit: "You showed up. That's enough."
```

### Language Rules (CRITICAL - DO NOT VIOLATE)

**NEVER use**: goal, persist, complete, focus, efficiency, discipline
**ALWAYS use**: try, start, move a bit, be here, put down, lighter

**Philosophy**: Give permission, not motivation. Allow failure without shame.

### Anti-Features (Never Add)
❌ Streaks or completion tracking
❌ Notifications/reminders (create guilt)
❌ Social features (chat, profiles)
❌ Gamification (points, badges)
❌ Task lists or goal management
❌ AI coaching or suggestions

**Test**: Every feature must pass "Does this make starting harder?"

---

## 📋 Implementation Plan

### Phase 1: Project Setup (Week 1)
**Goal**: Working dev environment

1. **Initialize React + Vite Project**
   ```bash
   npm create vite@latest trystart -- --template react
   cd trystart
   npm install
   ```

2. **Install Dependencies**
   ```bash
   # Tailwind CSS
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

   # Core dependencies
   npm install firebase react-i18next i18next

   # Deployment
   npm install -D gh-pages vite-plugin-pwa
   ```

3. **Configure Tailwind**
   - Update `tailwind.config.js` to scan src files
   - Configure calming color palette (soft blues, grays)
   - Add to `src/index.css`

4. **Set Up i18n**
   - Create `src/i18n/config.js`
   - Add `src/i18n/en.json` (English copy)
   - Add `src/i18n/zh.json` (future Chinese support)
   - Configure browser language detection

5. **Firebase Setup**

   **A. Create Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add project" → name it "trystart"
   - Disable Google Analytics

   **B. Enable Firestore**
   - Click "Firestore Database" → "Create database"
   - Start in test mode (we'll add security rules later)
   - Choose location closest to users

   **C. Register Web App**
   - Click web icon (</>)
   - Register app, copy config

   **D. Configure in Code**
   - Create `.env.local`:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```
   - Create `src/firebase/config.js` to initialize Firebase
   - Add `.env.local` to `.gitignore`

6. **Configure GitHub Pages**
   - Update `vite.config.js`:
     ```javascript
     import { defineConfig } from 'vite'
     import react from '@vitejs/plugin-react'
     import { VitePWA } from 'vite-plugin-pwa'

     export default defineConfig({
       plugins: [react(), VitePWA()],
       base: '/trystart/', // or '/' for custom domain
     })
     ```
   - Add to `package.json` scripts:
     ```json
     "deploy": "vite build && gh-pages -d dist"
     ```

7. **Project Structure**
   ```
   src/
   ├── components/
   │   ├── EntryScreen.jsx
   │   ├── TaskSelection.jsx
   │   ├── TaskInput.jsx
   │   ├── PresenceMode.jsx
   │   └── LanguageSwitcher.jsx
   ├── firebase/
   │   ├── config.js
   │   ├── presence.js
   │   └── tasks.js
   ├── i18n/
   │   ├── config.js
   │   ├── en.json
   │   └── zh.json
   ├── hooks/
   │   └── usePresence.js
   ├── App.jsx
   ├── main.jsx
   └── index.css
   ```

8. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial setup: React, Vite, Firebase, Tailwind"
   git remote add origin https://github.com/yourusername/trystart.git
   git push -u origin main
   ```

**Deliverable**: Can run `npm run dev`, see blank app, Firebase connected

---

### Phase 2: Core UI Implementation (Week 1-2)
**Goal**: Build three main screens

1. **EntryScreen Component**
   - Display main prompt: "Try starting something?"
   - Three button options
   - Handle navigation to appropriate screen
   - Implement calming design with Tailwind

2. **TaskSelection Component**
   - Display "Which feels less effort?"
   - Show 2 random tasks from pool
   - Built-in task pool:
     - "Open a file"
     - "Sit for 2 minutes"
     - "Think about something you've been avoiding"
     - "Do nothing, just be here"
   - "Neither" button → goes to PresenceMode
   - Click task → goes to PresenceMode with task

3. **TaskInput Component**
   - Simple text input: "One sentence is fine (or leave blank)"
   - Allow empty submission
   - No validation or requirements
   - Submit → goes to PresenceMode with optional task

4. **PresenceMode Component**
   - Display: "You've already started" OR "You're already here"
   - Real-time presence count: "11 people are also trying to start"
   - Subtle time flow indicator (breathing animation, no countdown)
   - Single exit button: "I'm putting it down now"
   - Exit message: "You showed up. That's enough." → auto-close

**Deliverable**: Complete user flow working locally (no backend yet)

---

### Phase 3: Real-time Backend Integration (Week 2)
**Goal**: Make presence count and task pool dynamic

1. **Firestore Schema**

   **Collection: `activeSessions`**
   ```javascript
   {
     sessionId: "auto-generated",
     timestamp: Timestamp,
     lastActive: Timestamp
   }
   ```

   **Collection: `taskPool`**
   ```javascript
   {
     taskId: "auto-generated",
     text: {
       en: "Open a file",
       zh: "打开一个文件"
     },
     isBuiltIn: true,
     createdAt: Timestamp
   }
   ```

2. **Presence Tracking** (`src/firebase/presence.js`)
   - Create session on entry to PresenceMode
   - Real-time listener for session count
   - Update lastActive every 30 seconds
   - Remove session on exit or tab close
   - Cleanup function: Remove stale sessions (>30min inactive)

3. **Task Pool Management** (`src/firebase/tasks.js`)
   - Pre-populate built-in tasks on first deploy
   - Random selection algorithm for 2 tasks
   - Optional: Allow user submissions (anonymous)

4. **Custom Hook** (`src/hooks/usePresence.js`)
   - Manages presence lifecycle
   - Returns current count
   - Handles cleanup on unmount

5. **Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /activeSessions/{sessionId} {
         allow read: if true;
         allow create: if true;
         allow delete: if true;
         allow update: if true;
       }

       match /taskPool/{taskId} {
         allow read: if true;
         allow write: if false; // Admin only initially
       }
     }
   }
   ```

**Deliverable**: Multi-user presence working, real-time updates

---

### Phase 4: PWA Polish & Mobile Optimization (Week 2-3)
**Goal**: Production-ready PWA

1. **PWA Configuration**
   - Create `public/manifest.json`:
     ```json
     {
       "name": "trystart",
       "short_name": "trystart",
       "description": "Try starting something",
       "start_url": "/",
       "display": "standalone",
       "background_color": "#ffffff",
       "theme_color": "#3b82f6",
       "icons": [
         {
           "src": "/icon-192.png",
           "sizes": "192x192",
           "type": "image/png"
         },
         {
           "src": "/icon-512.png",
           "sizes": "512x512",
           "type": "image/png"
         }
       ]
     }
     ```
   - Configure service worker with vite-plugin-pwa
   - Add "Add to Home Screen" prompt

2. **Mobile UX**
   - Touch-friendly buttons (min 44x44px)
   - Safe area handling (iOS notch)
   - Prevent zoom/scroll issues
   - Test on actual iOS and Android devices

3. **Visual Polish**
   - Calming color palette (blues, soft grays)
   - Breathing animation for presence mode
   - Smooth transitions between screens
   - Loading states and skeleton screens
   - Subtle micro-interactions (no gamification)

4. **Performance**
   - Lazy load components
   - Optimize bundle size
   - Cache Firebase config
   - Test with Lighthouse (aim for 90+ PWA score)

**Deliverable**: Installable PWA, smooth mobile experience

---

### Phase 5: Deploy & Launch (Week 3)
**Goal**: Live app with initial users

1. **GitHub Actions Deployment**
   - Create `.github/workflows/deploy.yml`:
     ```yaml
     name: Deploy to GitHub Pages
     on:
       push:
         branches: [ main ]
     jobs:
       build-and-deploy:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v3
           - uses: actions/setup-node@v3
             with:
               node-version: '18'
           - run: npm ci
           - run: npm run build
           - uses: peaceiris/actions-gh-pages@v3
             with:
               github_token: ${{ secrets.GITHUB_TOKEN }}
               publish_dir: ./dist
     ```

2. **Enable GitHub Pages**
   - Repo Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages`
   - Live at: `https://yourusername.github.io/trystart/`

3. **Firebase Rules Deployment**
   ```bash
   firebase deploy --only firestore:rules
   ```

4. **Testing Checklist**
   - [ ] Load app on mobile (iOS Safari, Android Chrome)
   - [ ] Add to home screen works
   - [ ] Presence count updates in real-time across devices
   - [ ] Can complete full flow: entry → task → presence → exit
   - [ ] Works offline (cached shell)
   - [ ] No console errors
   - [ ] Lighthouse PWA score >90

5. **Soft Launch (5-10 Beta Users)**
   - Share with friends/ADHD community members
   - Gather qualitative feedback
   - Monitor Firebase usage in console
   - Observe: Do they re-open when stuck?

6. **Reddit Community Launch**
   - Post in: r/ADHD, r/ADHDers, r/adhdwomen
   - **Tone**: Humble, personal
   - **Example**: "I built this because I kept getting stuck scrolling when I knew I should start something. It just helps me try. Maybe it helps you too. It's free and doesn't track anything."
   - Share GitHub Pages link
   - Mention open-source (builds trust)
   - Respond to feedback, iterate

**Deliverable**: Live app at zero cost with initial users

---

## 🧪 Verification Plan

### Local Testing
- [ ] Entry screen loads, 3 buttons work
- [ ] "Give me two choices" shows 2 random tasks
- [ ] "I already have something" shows input
- [ ] "Just sit" goes to presence mode
- [ ] Presence count updates in real-time (test with 2+ browser windows)
- [ ] Exit button works, shows correct message

### Multi-Device Testing
- [ ] Open on 2+ devices simultaneously
- [ ] Verify presence count syncs
- [ ] Test one device entering, another exiting
- [ ] Check real-time updates (<5 second delay)

### PWA Testing
- [ ] Lighthouse PWA score >90
- [ ] "Add to Home Screen" works on iOS Safari
- [ ] "Add to Home Screen" works on Android Chrome
- [ ] Offline fallback shows cached content
- [ ] Icons display correctly when installed

### Mobile Responsiveness
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Buttons are touch-friendly (44x44px minimum)
- [ ] No horizontal scroll
- [ ] Safe area respected (iOS notch)
- [ ] Text is readable without zoom

### Firebase Monitoring
- [ ] Check active sessions in Firestore console
- [ ] Verify stale sessions are cleaned up
- [ ] Monitor read/write operations (stay within free tier)
- [ ] Test security rules (can't write to taskPool without auth)

---

## 🎯 Success Metrics

### MVP Success (Month 1-2)
**Primary**: Users say "I opened it when I was stuck"
**Secondary**: >50% of users return within 48 hours
**Cost**: Stay at $0 (Firebase free tier)

### Growth Success (Month 3-6)
**Users**: 100-500 active users
**Retention**: 30% weekly retention
**Monetization**: 50-100 users donate/subscribe ($2-5/mo)

### Failure Signals (Pivot/Abandon)
- Users download but never reopen
- Feedback: "This is just another app"
- No engagement in Reddit posts
- Can't reach break-even subscribers

---

## ⚠️ Critical Success Factors

### What Will Make This Work

1. **First 10 Seconds**
   - Must not ask user to think, plan, or commit
   - Test: Would a depressed, anxious ADHD person click?

2. **Exit Experience**
   - Making it easy to leave makes people stay
   - No shame, no judgment, no "are you sure?"

3. **Anti-Feature Discipline**
   - Resist adding streaks, achievements, AI, task lists
   - Every feature must pass: "Does this make starting harder?"

4. **Community-First Launch**
   - Don't "pitch product" - share personal story
   - Let Reddit ADHD communities validate (or reject) it

5. **Stay Free**
   - Core "presence" feature must stay free forever
   - Only charge for optional enhancements later

---

## 📝 Next Steps

1. **Set up development environment** (Phase 1)
2. **Build core UI** (Phase 2)
3. **Integrate Firebase** (Phase 3)
4. **Polish & test** (Phase 4)
5. **Deploy & launch** (Phase 5)

**Estimated Timeline**: 2-3 weeks to MVP

---

## 📚 Key Resources

### Firebase
- Console: https://console.firebase.google.com/
- Firestore Docs: https://firebase.google.com/docs/firestore
- Security Rules: https://firebase.google.com/docs/firestore/security/get-started

### GitHub Pages
- Docs: https://docs.github.com/en/pages
- Actions: https://github.com/peaceiris/actions-gh-pages

### ADHD Communities (Launch Targets)
- r/ADHD: https://reddit.com/r/ADHD (2.2M members)
- r/ADHDers: https://reddit.com/r/ADHDers (36K members)
- r/adhdwomen: https://reddit.com/r/adhdwomen (532K members)

### Competitors (for reference)
- bodydoubling.space (free, drop-in)
- Focusmate (scheduled 1-on-1)
- FLOWN (facilitated sessions, $29-99/mo)

---

## 💡 The One Thing to Remember

**Quote from research:**
> "If I've done nothing today and already feel guilty, will I want to close this app when I see this text?"

**If the answer stays "No" - this is worth building.**

---

**Status**: Planning complete. Ready to implement.
**Next Session**: Start with Phase 1 - Project Setup
