import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources following language rules:
// ✅ ALWAYS use: try, start, move, be here, lighter
// ❌ NEVER use: goal, persist, complete, focus, efficiency, discipline
const resources = {
  en: {
    translation: {
      // Entry Screen
      "entry.title": "Try starting something?",
      "entry.giveChoices": "Give me two choices",
      "entry.haveTask": "I already have something to do",
      "entry.justSit": "I just want to sit for a while",

      // Task Selection
      "selection.title": "Which feels less effort?",
      "selection.neither": "Neither",

      // Task Input
      "input.title": "One sentence is fine",
      "input.subtitle": "(or leave blank)",
      "input.placeholder": "What are you trying to start?",
      "input.continue": "Continue",

      // Presence Mode
      "presence.started": "You've already started",
      "presence.first": "You're the first trying to start recently",
      "presence.peopleCount": "{{count}} people are also trying to start",
      "presence.peopleCount_plural": "{{count}} people are also trying to start",
      "presence.exit": "I'm putting it down now",
      "presence.exitMessage": "You showed up. That's enough.",

      // Timer
      "timer.justStarted": "You've started",
      "timer.abit": "You've been here for a bit",
      "timer.going": "You've been going for {{minutes}} minutes",
      "timer.stillGoing": "You're still going",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
