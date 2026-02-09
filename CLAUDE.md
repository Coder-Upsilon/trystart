# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**trystart** is a no-guilt task initiation PWA that helps users overcome task paralysis. It targets the "10 minutes BEFORE productivity" - the gap before users are ready for tools like Focusmate or bodydoubling.space.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:5173/trystart/
npm run build        # Production build to /dist
npm run preview      # Preview production build locally
npm run deploy       # Manual deploy to GitHub Pages
npm run emulators    # Start local Firebase emulators (Firestore on port 8081)
```

**Firebase Emulator UI:** http://127.0.0.1:4000 (when emulators running)

## Architecture

**State-based screen routing** (not URL-based) in `App.jsx`:
```
Entry Screen → TaskSelection → PresenceMode → Exit → Entry Screen
           └→ TaskInput ────→ PresenceMode ─┘
           └→ PresenceMode (direct) ────────┘
```

**Key files:**
- `src/hooks/useElapsedTimer.js` - Timer with auto-reset at 10 minutes (critical forgiveness design)
- `src/hooks/useFirestore.js` - Firebase integration with mock fallback
- `src/utils/taskPool.js` - 30 curated micro-tasks
- `src/utils/i18n.js` - Language strings (enforces philosophy rules)

**Presence counting:** Not stored as a number. Count = document count in `activeSessions` Firestore collection. Real-time `onSnapshot` listener updates all clients.

## Critical Design Philosophy

### Language Rules (STRICTLY ENFORCED)
- **ALWAYS use:** try, start, move, be here, lighter, put down
- **NEVER use:** goal, persist, complete, focus, efficiency, discipline

### Anti-Features (NEVER ADD)
- Streaks or completion tracking
- Notifications/reminders
- Social features (chat, profiles)
- Gamification (points, badges)
- Task lists or goal management

### Core UX Principles
1. **Forgiveness-first** - Timer resets silently at 10 minutes (no failure evidence)
2. **Permission over motivation** - "I just want to sit" is valid
3. **Fuzzy time** - No seconds displayed, uses phrases like "You've been here for a bit"
4. **Amnesiac interface** - Each visit is a clean slate

**Test every change against:** "Does this make starting harder?"

## Tech Stack

- React 18 + Vite 5 + Tailwind CSS
- Firebase Firestore (free tier: 50K reads/20K writes/day)
- vite-plugin-pwa (offline support, installable)
- GitHub Pages (auto-deploy via GitHub Actions on push to main)

## Tailwind Custom Theme

Custom calming color palettes in `tailwind.config.js`: `calm` (blues), `soft` (purples), `gentle` (teals). Custom `breathe` animation for presence mode.

## Firebase Local Development

Firebase is configured to connect to local emulators when running on localhost:
- Firestore emulator: port 8081
- Config in `src/firebase.js` auto-detects localhost and connects to emulator
- Emulator data viewable at http://127.0.0.1:4000/firestore
