# Testing Checklist

This document outlines testing procedures for the trystart MVP.

## Pre-Launch Testing

### 1. Entry Screen Tests

**Functionality:**
- [ ] "Try starting something?" text displays correctly
- [ ] All three buttons are visible and clickable
- [ ] "Give me two choices" navigates to task selection
- [ ] "I already have something to do" navigates to task input
- [ ] "I just want to sit for a while" goes directly to presence mode
- [ ] App name "trystart" appears at bottom

**Visual:**
- [ ] Buttons have soft, rounded appearance
- [ ] Hover states work (subtle shadow change)
- [ ] Active states work (slight scale down)
- [ ] Spacing is comfortable, not cramped
- [ ] Background gradient is subtle and calming

**Mobile:**
- [ ] All buttons are easily tappable (min 44px touch target)
- [ ] Text is readable without zooming
- [ ] Layout works on iPhone SE (smallest modern screen)
- [ ] Layout works on iPad
- [ ] No horizontal scrolling

---

### 2. Task Selection Tests

**Functionality:**
- [ ] Two different tasks appear each time
- [ ] Tasks are genuinely low-effort
- [ ] Clicking a task navigates to presence mode
- [ ] "Neither" button is visible and works
- [ ] "Neither" goes to presence mode (no task selected)
- [ ] New visit shows different random tasks

**Visual:**
- [ ] Task cards are large enough to read easily
- [ ] "Which feels less effort?" text is clear
- [ ] "Neither" option is subtle but not hidden
- [ ] Hover effects work on task cards

**Edge Cases:**
- [ ] Very long task names don't break layout
- [ ] Tasks never repeat in the same session
- [ ] Works with JavaScript disabled (graceful degradation)

---

### 3. Task Input Tests

**Functionality:**
- [ ] Text area accepts input
- [ ] Placeholder text is helpful and non-pressuring
- [ ] Can submit with blank input (important!)
- [ ] Can submit with text
- [ ] Character counter appears when typing
- [ ] 100 character limit is enforced
- [ ] "Continue" button navigates to presence mode

**Visual:**
- [ ] "One sentence is fine (or leave blank)" is clear
- [ ] Text area is comfortable size
- [ ] Character counter is subtle (gray, small)
- [ ] Focus state is clear but not harsh

**Mobile:**
- [ ] Mobile keyboard doesn't cover input
- [ ] Text area resizes appropriately
- [ ] Continue button remains visible when keyboard is open

---

### 4. Presence Mode Tests (Critical)

**Timer Functionality:**
- [ ] "You've started" appears immediately (0 minutes)
- [ ] "You've been here for a bit" appears at 1-2 minutes
- [ ] "You've been going for X minutes" appears at 3-6 minutes
- [ ] "You're still going" appears at 7-9 minutes
- [ ] Timer disappears after 10 minutes
- [ ] Breathing circle animates smoothly
- [ ] NO seconds are displayed (minutes only)

**Presence Indicator:**
- [ ] "X people are also trying to start" appears
- [ ] Count is reasonable (5-20 in mock mode)
- [ ] Small dots represent presence visually
- [ ] Count updates periodically (every 15 seconds in mock mode)

**Exit Functionality:**
- [ ] "I'm putting it down now" button is always visible
- [ ] Clicking exit shows "You showed up. That's enough."
- [ ] Exit message displays for ~2 seconds
- [ ] Returns to entry screen after exit message
- [ ] No guilt-inducing messages appear

**Visual:**
- [ ] "You've already started" is prominent
- [ ] Breathing circle is calming (not distracting)
- [ ] Overall layout is spacious, not cluttered
- [ ] Colors are soft and non-stimulating

**Philosophy Validation:**
- [ ] No countdown timer (only elapsed time)
- [ ] No "complete task" button
- [ ] No progress bar to fill
- [ ] No guilt for exiting early
- [ ] No streak counter
- [ ] No notifications

---

### 5. Timer Behavior Tests (Critical)

**10-Minute Auto-Reset:**
- [ ] Timer runs for exactly 10 minutes (600 seconds)
- [ ] After 10 minutes, timer disappears completely
- [ ] Screen returns to initial state (no evidence of session)
- [ ] Can start a new session immediately
- [ ] No alert or notification when timer resets

**Forgiveness Design:**
- [ ] If user leaves page and returns, timer continues (or resets gracefully)
- [ ] If user closes browser, no penalty on return
- [ ] If user returns after 10+ minutes, sees fresh entry screen
- [ ] No "you abandoned your task" messages

---

### 6. PWA Tests

**Installation:**
- [ ] "Add to Home Screen" prompt appears on mobile (after engagement)
- [ ] App installs as standalone app
- [ ] Icon appears on home screen
- [ ] App opens without browser chrome (standalone mode)

**Offline:**
- [ ] App loads when offline (cached)
- [ ] Entry screen works offline
- [ ] Task selection works offline (using cached tasks)
- [ ] Presence mode works offline (shows cached count)
- [ ] Graceful message if real-time features unavailable

**Manifest:**
- [ ] App name is "trystart"
- [ ] Theme color is calming teal (#e0f2f1)
- [ ] Display mode is "standalone"
- [ ] Orientation is "portrait-primary"

---

### 7. Performance Tests

**Lighthouse Scores (Target: >90):**
- [ ] Performance: >90
- [ ] Accessibility: >90
- [ ] Best Practices: >90
- [ ] SEO: >90

**Load Times:**
- [ ] First Contentful Paint: <1.5s
- [ ] Time to Interactive: <3s
- [ ] Largest Contentful Paint: <2.5s

**Animations:**
- [ ] Breathing circle is smooth (60fps)
- [ ] Fade-in transitions are smooth
- [ ] No janky scrolling
- [ ] No layout shift during page load

---

### 8. Accessibility Tests

**Keyboard Navigation:**
- [ ] Can tab through all buttons
- [ ] Can activate buttons with Enter/Space
- [ ] Focus indicators are clear
- [ ] Tab order is logical
- [ ] Can exit presence mode with keyboard

**Screen Reader:**
- [ ] All buttons have descriptive labels
- [ ] Timer updates are announced
- [ ] Presence count is announced
- [ ] No "click here" or vague labels
- [ ] Alt text for any visual elements

**Visual Accessibility:**
- [ ] Text meets WCAG AA contrast ratio (4.5:1)
- [ ] Text is readable at 200% zoom
- [ ] Colors are distinguishable for colorblind users
- [ ] No reliance on color alone for information

---

### 9. Cross-Browser Tests

**Desktop:**
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

**Mobile:**
- [ ] iOS Safari (latest)
- [ ] Android Chrome (latest)
- [ ] Samsung Internet (if possible)

---

### 10. Edge Cases & Error Handling

**Network Issues:**
- [ ] App loads when Firebase is down (graceful degradation)
- [ ] Mock presence count appears if real-time sync fails
- [ ] No console errors from failed Firebase calls

**Weird Inputs:**
- [ ] Emoji in task input (should work)
- [ ] Very long task names (should truncate gracefully)
- [ ] Special characters (should work)
- [ ] Empty strings (should be allowed)

**State Management:**
- [ ] Refreshing page returns to entry screen (stateless by design)
- [ ] Back button works as expected
- [ ] Multiple tabs don't interfere with each other

---

## User Testing Scenarios

### Scenario 1: "I'm stuck and don't know what to do"

**Expected Flow:**
1. User opens app
2. Clicks "Give me two choices"
3. Sees two low-effort tasks
4. Picks one (or clicks "Neither")
5. Enters presence mode
6. Sees timer and presence count
7. Stays for a few minutes
8. Clicks "I'm putting it down now"
9. Sees "You showed up. That's enough."

**User Should Feel:**
- ✅ Less stuck
- ✅ Not judged
- ✅ Supported by presence of others
- ✅ Okay to leave anytime

**User Should NOT Feel:**
- ❌ Pressured to complete anything
- ❌ Guilty for leaving
- ❌ Like they "failed"

---

### Scenario 2: "I know what to do but can't start"

**Expected Flow:**
1. User opens app
2. Clicks "I already have something to do"
3. Types task (or leaves blank)
4. Clicks "Continue"
5. Enters presence mode
6. Sees timer and others present
7. Stays as long as needed
8. Exits when ready

---

### Scenario 3: "I just want to exist for a moment"

**Expected Flow:**
1. User opens app
2. Clicks "I just want to sit for a while"
3. Goes directly to presence mode
4. No task, no pressure
5. Just sees presence count
6. Exits when ready

**User Should Feel:**
- ✅ Permission to do nothing
- ✅ Not alone in struggling
- ✅ Accepted as they are

---

## Launch Checklist

Before public launch:

**Technical:**
- [ ] All tests above pass
- [ ] Deployed to production URL
- [ ] Firebase set up (if ready) or mock mode working
- [ ] PWA installable on iOS and Android
- [ ] GitHub Actions deployment working

**Content:**
- [ ] README.md is clear
- [ ] DEPLOYMENT.md guides are accurate
- [ ] No developer TODOs in user-facing text
- [ ] All language follows philosophy (no banned words)

**Legal/Admin:**
- [ ] Privacy policy (even if minimal)
- [ ] Terms of service (optional for MVP)
- [ ] Contact information (GitHub issues link)

**Beta Launch:**
- [ ] Share with 5-10 trusted friends
- [ ] Gather qualitative feedback
- [ ] Verify users say "I opened it when I was stuck"
- [ ] Fix any critical issues

**Public Launch:**
- [ ] Draft Reddit post (humble, personal, no marketing)
- [ ] Prepare for relevant communities
- [ ] Monitor Firebase costs (if using)
- [ ] Have plan for unexpected traffic

---

## Testing Tools

**Manual Testing:**
- Desktop: Chrome DevTools (mobile emulation)
- iOS: Safari Web Inspector
- Android: Chrome Remote Debugging

**Automated Testing:**
- Lighthouse (in Chrome DevTools)
- WAVE (Web Accessibility Evaluation Tool)
- axe DevTools (accessibility)

**Performance:**
- WebPageTest.org
- GTmetrix
- Chrome DevTools Performance tab

---

**Last Updated:** 2026-02-01
**Test Coverage:** MVP Phase 1-2
**Next Testing Phase:** Firebase integration (Phase 3)
