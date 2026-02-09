# Quick Start Guide

Get trystart running locally in 2 minutes.

## Prerequisites

- Node.js 18+ installed ([download here](https://nodejs.org/))
- Basic terminal/command line familiarity

## Installation

```bash
# 1. Clone or navigate to the project directory
cd trystart

# 2. Install dependencies (takes ~1 minute)
npm install

# 3. Start the development server
npm run dev
```

## Testing the App

Once the dev server starts, you'll see:

```
  ➜  Local:   http://localhost:5173/trystart/
```

Open that URL in your browser.

## Expected Flow

### First Visit
1. You'll see: **"Try starting something?"**
2. Three buttons appear:
   - "Give me two choices"
   - "I already have something to do"
   - "I just want to sit for a while"

### Try "Give me two choices"
1. Click the button
2. You'll see two random low-effort tasks
3. Pick one (or click "Neither")
4. You enter **Presence Mode**

### Presence Mode
- Title: "You've already started"
- Breathing circle (animated)
- Timer: "You've started" → "You've been here for a bit" → etc.
- Presence count: "X people are also trying to start"
- Exit button: "I'm putting it down now"

### Timer Behavior
- Shows elapsed time (NOT countdown)
- Updates every minute with fuzzy language
- After 10 minutes, timer disappears (silent reset)
- No guilt, no pressure

### Exit Flow
1. Click "I'm putting it down now"
2. See message: "You showed up. That's enough."
3. Return to entry screen after ~2 seconds

## Testing Checklist

Quick sanity checks:

- [ ] Entry screen loads with 3 buttons
- [ ] Task selection shows 2 different tasks each time
- [ ] Task input allows blank submission
- [ ] Presence mode shows timer and breathing circle
- [ ] Timer displays fuzzy time ("You've started", etc.)
- [ ] Exit button works and shows affirmation message
- [ ] Can restart immediately after exit

## Common Issues

### "Cannot find module" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Port 5173 already in use
```bash
# Kill the existing process
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Build fails
```bash
# Try a clean build
rm -rf dist node_modules
npm install
npm run build
```

## Next Steps

Once local testing works:

1. **Firebase Setup** (optional for MVP)
   - See: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   - Enables real-time presence tracking

2. **Deployment**
   - See: [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Deploy to GitHub Pages (free)

3. **Testing**
   - See: [TESTING.md](./TESTING.md)
   - Comprehensive testing checklist

## File Structure Overview

```
src/
├── components/        # React components
│   ├── EntryScreen.jsx
│   ├── TaskSelection.jsx
│   ├── TaskInput.jsx
│   ├── PresenceMode.jsx
│   ├── Timer.jsx
│   └── PresenceIndicator.jsx
├── hooks/             # Custom React hooks
│   ├── useElapsedTimer.js
│   └── useFirestore.js
├── utils/             # Utilities
│   ├── taskPool.js
│   └── i18n.js
└── App.jsx            # Main app routing
```

## Modifying the App

### Change Task Pool
Edit: `src/utils/taskPool.js`

Add/remove tasks in the array.

### Change Colors
Edit: `tailwind.config.js`

Adjust the `calm`, `soft`, and `gentle` color palettes.

### Change Language
Edit: `src/utils/i18n.js`

Update translation strings. Follow language rules:
- ✅ Use: try, start, move, be here
- ❌ Avoid: goal, persist, complete, focus

### Change Timer Duration
Edit: `src/hooks/useElapsedTimer.js`

Change `MAX_TIME` constant (currently 600 seconds = 10 minutes).

## Scripts Reference

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run deploy     # Deploy to GitHub Pages (manual)
```

## Support

- **Documentation:** Check the other .md files in this directory
- **Issues:** Open an issue on GitHub (if repository is public)
- **Philosophy:** Read PROJECT_SUMMARY.md for full context

## Design Philosophy Reminder

This app is for **starting**, not completing. Key principles:

- Zero guilt (timer resets silently)
- Permission over motivation ("I just want to sit" is valid)
- Fuzzy time (no anxiety-inducing seconds)
- Anonymous presence (connection without pressure)
- Amnesiac interface (forgets what happened)

---

**Goal:** Help users move from "stuck" to "started"
**Non-goal:** Track productivity, enforce completion, measure success

---

Ready to try? Run `npm run dev` and open the local URL.
