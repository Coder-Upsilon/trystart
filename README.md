# trystart

> Try starting something

A no-guilt task initiation tool for the 10 minutes *before* productivity.

## What is this?

trystart is a gentle web app that helps when you're stuck scrolling, frozen, or unable to start. It's not a productivity tracker—it's for the moment when you *want* to do something but can't figure out what or how to begin.

### Who is this for?

People who experience:
- Task paralysis (knowing you should do something but feeling frozen)
- Decision fatigue (too many options, can't choose)
- The need for body doubling without scheduling/video pressure

### What it does

- Gives you two low-effort task options (or lets you enter your own)
- Shows you others are also trying to start (anonymous presence)
- Tracks elapsed time (not countdown - no deadline pressure)
- Automatically resets after 10 minutes (forgiveness design)
- No streaks, no tracking, no guilt

## Philosophy

**Language we use:**
- ✅ try, start, move, be here, lighter

**Language we never use:**
- ❌ goal, persist, complete, focus, efficiency, discipline

**Core principles:**
1. Zero negative guilt
2. Permission over motivation
3. Helps starting, not completing
4. Anonymous presence without social pressure
5. Amnesiac interface (forgives and forgets)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Tech Stack

- React 18 + Vite
- Tailwind CSS (calming color palette)
- Firebase Firestore (real-time presence)
- PWA (installable, works offline)
- react-i18next (internationalization)

## Project Structure

```
src/
├── components/
│   ├── EntryScreen.jsx       # "Try starting something?"
│   ├── TaskSelection.jsx     # "Which feels less effort?"
│   ├── TaskInput.jsx          # "One sentence is fine"
│   ├── PresenceMode.jsx       # Main presence screen
│   ├── Timer.jsx              # Elapsed timer (resets at 10min)
│   └── PresenceIndicator.jsx  # Anonymous presence count
├── hooks/
│   ├── useElapsedTimer.js     # Elapsed timer logic
│   └── useFirestore.js        # Firebase real-time sync
├── utils/
│   ├── taskPool.js            # Low-effort task suggestions
│   └── i18n.js                # Internationalization
└── App.jsx                    # Main routing
```

## Development Status

**Current:** MVP implementation complete (Phase 1-2)

**Next steps:**
- [ ] Set up Firebase project (Task #3)
- [ ] Connect real-time presence tracking
- [ ] Add PWA icons
- [ ] Test mobile experience
- [ ] Deploy to GitHub Pages

## License

MIT

---

*For the 10 minutes before productivity.*
