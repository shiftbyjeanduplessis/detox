(() => {
  'use strict';

  const STORAGE_KEY = 'perfectWomenFreshStartV4';
  const LEGACY_KEY = 'perfectWomenFreshStartV3';
  const FAV_KEY = 'perfectWomenFreshStartRecipeFavouritesV1';
  const DAY_MS = 86400000;

  const main = document.getElementById('main');
  const modalRoot = document.getElementById('modalRoot');
  const bottomNav = document.getElementById('bottomNav');
  const backBtn = document.getElementById('backBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const topbar = document.getElementById('topbar');
  const dayIndicator = document.getElementById('dayIndicator');
  const recipes = Array.isArray(window.FRESH_START_RECIPES) ? window.FRESH_START_RECIPES : [];

  const APP_ART = {
    food: 'assets/art-food.png',
    phone: 'assets/art-phone.png',
    movement: 'assets/art-move.png',
    sleep: 'assets/art-sleep.png',
    recipes: 'assets/art-recipes.png',
    progress: 'assets/art-progress.png',
    home: 'assets/app-shot.png',
    categories: {
      'Smoothies': 'assets/cat-smoothies.png',
      'Fruit Salads': 'assets/cat-fruit-salads.png',
      'Soups': 'assets/cat-soups.png',
      'Stir-Fries': 'assets/cat-stir-fries.png',
      'Vegetable Meals': 'assets/cat-vegetable-meals.png',
      'Air Fryer': 'assets/cat-air-fryer.png'
    }
  };

  const icon = (name, size = 24) => {
    const paths = {
      sun: '<circle cx="12" cy="12" r="3.5"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path>',
      calendar: '<rect x="3" y="5" width="18" height="16" rx="3"></rect><path d="M8 3v4M16 3v4M3 10h18"></path><path d="M8 14h2M14 14h2M8 18h2M14 18h2"></path>',
      bowl: '<path d="M4 11h16c0 5-3.6 8-8 8s-8-3-8-8Z"></path><path d="M7 21h10M8 8c0-2 2-2 2-4M13 8c0-2 2-2 2-4"></path>',
      chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"></path>',
      reset: '<rect x="5" y="3" width="10" height="18" rx="2"></rect><path d="M9 17h2M18 8a5 5 0 1 1-1.2 8.2"></path><path d="M18 4v4h4"></path>',
      leaf: '<path d="M20 4C12 4 6 8 5 15c4 1 10 0 15-11Z"></path><path d="M5 20c1-6 5-10 11-13"></path>',
      phone: '<rect x="6" y="2" width="12" height="20" rx="3"></rect><path d="M10 18h4"></path>',
      moon: '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"></path>',
      walk: '<circle cx="13" cy="4" r="2"></circle><path d="m11 9 3-2 3 3M12 8l-2 5 4 2 2 6M10 13l-4 4"></path>',
      water: '<path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"></path>',
      heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"></path>',
      check: '<path d="m5 12 4 4L19 6"></path>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"></path>',
      settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.64 15a1.7 1.7 0 0 0-1.56-1.03H3v-4h.08A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.64a1.7 1.7 0 0 0 1.03-1.56V3h4v.08A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.36 9a1.7 1.7 0 0 0 1.56 1.03H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"></path>',
      back: '<path d="m15 18-6-6 6-6"></path>',
      clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
      fork: '<path d="M6 2v8M3 2v5a3 3 0 0 0 6 0V2M6 10v12M16 2v20M16 2c3 2 4 6 0 9"></path>',
      journal: '<path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2V3Z"></path><path d="M9 7h6M9 11h6M9 15h4"></path>',
      search: '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path>',
      chevron: '<path d="m9 18 6-6-6-6"></path>',
      close: '<path d="M6 6l12 12M18 6 6 18"></path>',
      plus: '<path d="M12 5v14M5 12h14"></path>',
      minus: '<path d="M5 12h14"></path>',
      edit: '<path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"></path><path d="m14 7 3 3"></path>'
    };
    return `<svg class="ui-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.leaf}</svg>`;
  };

  const FOOD_OPTIONS = {
    vegetables: [
      { id: 'tomatoes', label: 'Tomatoes', quantity: '6–8 tomatoes or 2 punnets', keywords: ['tomato'] },
      { id: 'carrots', label: 'Carrots', quantity: '1 kg bag', keywords: ['carrot'] },
      { id: 'broccoli', label: 'Broccoli', quantity: '2 heads', keywords: ['broccoli'] },
      { id: 'cauliflower', label: 'Cauliflower', quantity: '1 large head', keywords: ['cauliflower'] },
      { id: 'spinach', label: 'Spinach', quantity: '2 bags or bunches', keywords: ['spinach'] },
      { id: 'cabbage', label: 'Cabbage', quantity: '1 medium cabbage', keywords: ['cabbage'] },
      { id: 'courgettes', label: 'Courgettes', quantity: '6 courgettes', keywords: ['courgette', 'zucchini'] },
      { id: 'mushrooms', label: 'Mushrooms', quantity: '500–750 g', keywords: ['mushroom'] },
      { id: 'peppers', label: 'Peppers', quantity: '5–6 mixed peppers', keywords: ['red pepper', 'yellow pepper', 'mixed peppers', 'peppers'] },
      { id: 'butternut', label: 'Butternut', quantity: '1 medium butternut', keywords: ['butternut'] },
      { id: 'sweet-potatoes', label: 'Sweet potatoes', quantity: '4 medium', keywords: ['sweet potato'] },
      { id: 'aubergine', label: 'Aubergine', quantity: '2 aubergines', keywords: ['aubergine', 'eggplant'] },
      { id: 'cucumber', label: 'Cucumber', quantity: '2 cucumbers', keywords: ['cucumber'] },
      { id: 'green-beans', label: 'Green beans', quantity: '400–500 g', keywords: ['green bean'] },
      { id: 'peas', label: 'Peas', quantity: '1 frozen bag', keywords: ['peas', 'pea'] },
      { id: 'onions', label: 'Onions', quantity: '6 onions', keywords: ['onion'] },
      { id: 'avocado', label: 'Avocado', quantity: '3–4 avocados', keywords: ['avocado'] },
      { id: 'potatoes', label: 'Potatoes', quantity: '1 kg', keywords: ['potato'] },
      { id: 'celery', label: 'Celery', quantity: '1 bunch', keywords: ['celery'] },
      { id: 'kale', label: 'Kale', quantity: '1 bag or bunch', keywords: ['kale'] },
      { id: 'spring-onions', label: 'Spring onions', quantity: '1 bunch', keywords: ['spring onion'] }
    ],
    fruits: [
      { id: 'apples', label: 'Apples', quantity: '6 apples', keywords: ['apple'] },
      { id: 'bananas', label: 'Bananas', quantity: '6–8 bananas', keywords: ['banana'] },
      { id: 'oranges', label: 'Oranges or naartjies', quantity: '6', keywords: ['orange', 'naartjie'] },
      { id: 'strawberries', label: 'Strawberries', quantity: '2 punnets', keywords: ['strawberr'] },
      { id: 'berries', label: 'Blueberries or mixed berries', quantity: '2 punnets or frozen bags', keywords: ['blueberr', 'berries', 'berry'] },
      { id: 'grapes', label: 'Grapes', quantity: '1 bunch', keywords: ['grape'] },
      { id: 'pineapple', label: 'Pineapple', quantity: '1 pineapple', keywords: ['pineapple'] },
      { id: 'mango', label: 'Mango', quantity: '2–3 mangoes or frozen', keywords: ['mango'] },
      { id: 'pears', label: 'Pears', quantity: '4 pears', keywords: ['pear'] },
      { id: 'peaches', label: 'Peaches or nectarines', quantity: '4', keywords: ['peach', 'nectarine'] },
      { id: 'kiwi', label: 'Kiwi fruit', quantity: '4 kiwi fruit', keywords: ['kiwi'] },
      { id: 'watermelon', label: 'Watermelon', quantity: '1 small or half', keywords: ['watermelon'] },
      { id: 'lemons-limes', label: 'Lemons and limes', quantity: '4–6 mixed', keywords: ['lemon', 'lime'] },
      { id: 'pawpaw', label: 'Pawpaw', quantity: '1 medium', keywords: ['pawpaw'] },
      { id: 'grapefruit', label: 'Grapefruit', quantity: '2', keywords: ['grapefruit'] }
    ],
    herbs: [
      { id: 'garlic', label: 'Garlic', quantity: '2 bulbs', keywords: ['garlic'] },
      { id: 'ginger', label: 'Fresh ginger', quantity: '1 piece', keywords: ['ginger'] },
      { id: 'parsley', label: 'Parsley', quantity: '1 bunch', keywords: ['parsley'] },
      { id: 'coriander', label: 'Coriander', quantity: '1 bunch', keywords: ['coriander'] },
      { id: 'basil', label: 'Basil', quantity: '1 bunch or jar dried', keywords: ['basil'] },
      { id: 'mint', label: 'Mint', quantity: '1 bunch', keywords: ['mint'] },
      { id: 'rosemary', label: 'Rosemary', quantity: '1 small bunch or jar', keywords: ['rosemary'] },
      { id: 'thyme', label: 'Thyme', quantity: '1 jar or bunch', keywords: ['thyme'] },
      { id: 'oregano', label: 'Oregano', quantity: '1 jar', keywords: ['oregano'] }
    ],
    spices: [
      { id: 'black-pepper', label: 'Black pepper', quantity: '1 jar or grinder', keywords: ['black pepper', 'pepper'] },
      { id: 'paprika', label: 'Paprika', quantity: '1 jar', keywords: ['paprika'] },
      { id: 'smoked-paprika', label: 'Smoked paprika', quantity: '1 jar', keywords: ['smoked paprika'] },
      { id: 'cumin', label: 'Ground cumin', quantity: '1 jar', keywords: ['cumin'] },
      { id: 'curry-powder', label: 'Curry powder', quantity: '1 jar', keywords: ['curry powder'] },
      { id: 'turmeric', label: 'Turmeric', quantity: '1 jar', keywords: ['turmeric'] },
      { id: 'cinnamon', label: 'Cinnamon', quantity: '1 jar', keywords: ['cinnamon'] },
      { id: 'chilli', label: 'Chilli flakes', quantity: '1 jar', keywords: ['chilli', 'chili'] },
      { id: 'mixed-herbs', label: 'Mixed herbs', quantity: '1 jar', keywords: ['mixed herbs', 'dried herbs'] }
    ]
  };

  const PROGRAM = [
    {
      title: 'Begin with solid food',
      subtitle: 'Simple structure makes Day 1 easier.',
      phase: 'SOLID DAYS · 1–3',
      food: { title: 'Fruit and vegetables — solid meals', action: 'Choose solid meals built around fruit, vegetables, beans or lentils and optional low-fat plain yoghurt. No smoothies or soups today.' },
      phone: { title: 'See your real baseline', action: 'Check your screen-time total tonight. Park the phone away from your bed for the final 30 minutes before sleep.' },
      sleep: { title: 'Choose a steady wake time', action: 'Use the wake time you can repeat this week. Begin a calm 30-minute wind-down before bed.', windDown: 30 },
      movement: { title: 'Easy walking start', minutes: 15, action: 'Take a comfortable 15-minute walk. Keep the pace easy enough to talk.', steps: ['5 minutes easy', '5 minutes purposeful', '5 minutes easy'] }
    },
    {
      title: 'Add colour and variety',
      subtitle: 'Keep meals solid and make them colourful.',
      phase: 'SOLID DAYS · 1–3',
      food: { title: 'Eat the rainbow', action: 'Use solid fruit-and-vegetable meals again today. Aim for several colours and include a satisfying bean, lentil or yoghurt option where useful.' },
      phone: { title: 'Delay the first scroll', action: 'Keep the first 20 minutes after waking phone-free. Get dressed, drink water or step outside first.' },
      sleep: { title: 'Use morning light', action: 'Spend a few minutes outdoors within the first hour after waking, then keep the same planned wake time tomorrow.', windDown: 30 },
      movement: { title: 'Walk and loosen up', minutes: 20, action: 'Walk for 15 minutes, then do 5 minutes of gentle mobility.', steps: ['15-minute comfortable walk', 'Shoulder circles', 'Hip circles', 'Gentle calf stretch'] }
    },
    {
      title: 'Prepare for the liquid day',
      subtitle: 'Finish the solid phase and prepare tomorrow’s soups and smoothies.',
      phase: 'SOLID DAYS · 1–3',
      food: { title: 'Solid meals plus preparation', action: 'Eat solid fruit-and-vegetable meals today. Prepare or choose tomorrow’s filling smoothies and substantial soups before the evening.' },
      phone: { title: 'Phone-free meals', action: 'Keep the phone away during every meal today. Eat, talk or simply notice the food instead.' },
      sleep: { title: 'Extend the screen break', action: 'Switch off entertainment screens 45 minutes before bed and use the time for a shower, reading or quiet preparation.', windDown: 45 },
      movement: { title: 'Purposeful walk', minutes: 20, action: 'Take a 20-minute purposeful walk, or split it into two 10-minute walks.', steps: ['5 minutes easy', '10 minutes purposeful', '5 minutes easy'] }
    },
    {
      title: 'The filling liquid day',
      subtitle: 'Smoothies and substantial soups — never a juice-only fast.',
      phase: 'LIQUID-MEAL DAY · 4',
      food: { title: 'Filling smoothies and soups', action: 'Use smoothies and blended or substantial soups for your meals. Choose recipes containing yoghurt, oats, beans, lentils, peas, potato or butternut where possible. If you remain hungry, have another filling soup or smoothie or switch to a solid meal.' },
      phone: { title: 'Silence what is not useful', action: 'Turn off non-essential notifications. Leave calls and genuinely important messages available.' },
      sleep: { title: 'Reset the bedroom', action: 'Make the room as dark, quiet and comfortable as practical. Put tomorrow’s essentials out before wind-down.', windDown: 45 },
      movement: { title: 'Gentle strength circuit', minutes: 12, action: 'Complete two easy rounds. Stop before strain and use a chair or wall for support.', steps: ['8 chair sit-to-stands', '8 wall push-ups', '8 slow hip hinges', '60 seconds marching'] }
    },
    {
      title: 'Bring solid food back in',
      subtitle: 'Mix a smoothie or soup with satisfying solid meals.',
      phase: 'MIXED DAYS · 5–7',
      food: { title: 'A balanced mix', action: 'Use one smoothie or soup and two solid fruit-and-vegetable meals. Include beans, lentils or optional low-fat plain yoghurt for staying power.' },
      phone: { title: 'One hour fully offline', action: 'Choose one 60-minute block with the phone out of reach. Use it for cooking, walking, reading or being with people.' },
      sleep: { title: 'Empty your head', action: 'Write tomorrow’s short task list before wind-down so unfinished thoughts do not follow you to bed.', windDown: 45 },
      movement: { title: 'Longer easy walk', minutes: 25, action: 'Walk for 25 minutes at a comfortable pace. Split it into shorter walks if that fits your day better.', steps: ['10 minutes easy', '10 minutes purposeful', '5 minutes easy'] }
    },
    {
      title: 'Build your own rhythm',
      subtitle: 'Use the formats that felt best during the week.',
      phase: 'MIXED DAYS · 5–7',
      food: { title: 'Mix and repeat favourites', action: 'Choose a solid breakfast or fruit bowl, a soup or smoothie, and a colourful solid main meal. Repeating leftovers is encouraged.' },
      phone: { title: 'Social-free evening', action: 'Choose an evening cut-off for social media and news. Calls and essential messages can stay available.' },
      sleep: { title: 'Use a full wind-down ritual', action: 'Create a repeatable 45–60 minute sequence: tidy, wash, prepare tomorrow, dim lights, then quiet activity.', windDown: 60 },
      movement: { title: 'Enjoyable movement', minutes: 30, action: 'Choose 30 minutes of enjoyable, moderate movement such as walking, dancing, cycling or gardening.', steps: ['Choose something enjoyable', 'Keep the pace manageable', 'Finish feeling better, not flattened'] }
    },
    {
      title: 'Choose what continues',
      subtitle: 'Finish with a flexible mix you can keep using.',
      phase: 'MIXED DAYS · 5–7',
      food: { title: 'Your preferred mix', action: 'Use the solid meals, soup and smoothie combinations that suited you best. This is a transition day, not a juice fast or a final restriction.' },
      phone: { title: 'Write your three phone rules', action: 'Choose three boundaries to keep, such as phone-free meals, no phone in bed or one offline hour each evening.' },
      sleep: { title: 'Keep two sleep anchors', action: 'Choose the wake time and one wind-down habit you will continue after the programme.', windDown: 45 },
      movement: { title: 'Move and make a plan', minutes: 30, action: 'Do your favourite movement from the week, then choose realistic movement days for next week.', steps: ['30 minutes of preferred movement', 'Choose next week’s movement days', 'Keep the plan simple'] }
    }
  ];

  const defaultState = {
    onboarded: false,
    setupComplete: false,
    setupVersion: 13,
    setupStep: 1,
    setupChecks: {
      kitchen: false,
      phone: false,
      movement: false,
      understanding: false
    },
    foodPreferences: {
      vegetables: [],
      fruits: [],
      herbs: [],
      spices: [],
      avoid: '',
      planGenerated: false
    },
    profile: {
      name: '',
      startDate: tomorrowISO(),
      startWeight: '',
      finishWeight: '',
      bedtime: '22:30',
      wakeTime: '06:30',
      startEnergy: 3,
      startSleep: 3,
      finishEnergy: '',
      finishSleep: '',
      baselinePhoneHours: '',
      baselinePhoneMinutes: '',
      baselinePhoneTotalMinutes: '',
      baselineSleepHours: ''
    },
    days: {},
    shoppingChecks: {},
    view: 'today',
    selectedDay: 1,
    recipeCategory: 'All',
    recipeSearch: '',
    protocolTab: 'phone'
  };

  let state = loadState();
  let favourites = loadJSON(FAV_KEY, []);
  let previousView = null;

  function todayISO() {
    const d = new Date();
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function addDaysISO(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function tomorrowISO() {
    return addDaysISO(1);
  }

  function dateAtMidnight(dateString) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString || '')) return null;
    const date = new Date(`${dateString}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function isBeforeStart() {
    const start = dateAtMidnight(state.profile.startDate);
    if (!start) return false;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today < start;
  }

  function formatDateLong(dateString) {
    const date = dateAtMidnight(dateString);
    if (!date) return 'your chosen date';
    return new Intl.DateTimeFormat(undefined, { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
  }

  function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
    catch { return fallback; }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadState() {
    const saved = loadJSON(STORAGE_KEY, null) || migrateLegacy();
    if (!saved) return clone(defaultState);
    const merged = {
      ...clone(defaultState),
      ...saved,
      profile: { ...clone(defaultState.profile), ...(saved.profile || {}) },
      setupChecks: { ...clone(defaultState.setupChecks), ...(saved.setupChecks || {}) },
      foodPreferences: { ...clone(defaultState.foodPreferences), ...(saved.foodPreferences || {}) },
      days: saved.days || {}
    };
    if (!Object.prototype.hasOwnProperty.call(saved, 'setupComplete')) {
      merged.setupComplete = false;
      merged.profile.startDate = todayISO();
    }
    if (!saved.foodPreferences?.planGenerated) {
      merged.setupComplete = false;
      merged.profile.startDate = tomorrowISO();
    }
    if (saved.setupVersion !== 13) {
      merged.setupComplete = false;
      merged.setupVersion = 13;
      merged.setupStep = 1;
      merged.profile.startDate = merged.profile.startDate || tomorrowISO();
    }
    return merged;
  }

  function migrateLegacy() {
    const old = loadJSON(LEGACY_KEY, null);
    if (!old) return null;
    return {
      ...old,
      view: old.view === 'more' ? 'protocols' : old.view,
      profile: { ...clone(defaultState.profile), ...(old.profile || {}) }
    };
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function safeNumber(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
  }

  function dayState(day) {
    const key = String(day);
    const existing = state.days[key] || {};
    if (!state.days[key]) state.days[key] = existing;
    existing.water = existing.water ?? 0;
    existing.phone = existing.phone ?? '';
    existing.phoneHours = existing.phoneHours ?? (existing.phone !== '' ? Math.floor(safeNumber(existing.phone)) : '');
    existing.phoneMinutes = existing.phoneMinutes ?? (existing.phone !== '' ? Math.round((safeNumber(existing.phone) % 1) * 60) : '');
    existing.phoneTotalMinutes = existing.phoneTotalMinutes ?? (existing.phone !== '' ? Math.round(safeNumber(existing.phone) * 60) : '');
    existing.sleep = existing.sleep ?? '';
    existing.sleepQuality = existing.sleepQuality ?? '';
    existing.movementMinutes = existing.movementMinutes ?? '';
    existing.mood = existing.mood ?? '';
    existing.journal = existing.journal ?? '';
    existing.tasks = existing.tasks || {};
    if (existing.missions && !Object.keys(existing.tasks).length) {
      existing.tasks = {
        food: Boolean(existing.missions.plants),
        phone: Boolean(existing.missions.screen),
        sleep: Boolean(existing.missions.sleep),
        movement: false
      };
    }
    return existing;
  }

  function scheduledDay() {
    if (!state.profile.startDate) return 1;
    const start = new Date(`${state.profile.startDate}T00:00:00`);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = Math.floor((today - start) / DAY_MS) + 1;
    return Math.min(7, Math.max(1, diff));
  }

  function dayActionsComplete(day) {
    const tasks = dayState(day).tasks || {};
    return ['food', 'phone', 'movement', 'sleep'].every(key => Boolean(tasks[key]));
  }

  function dayResolved(day) {
    const d = dayState(day);
    return dayActionsComplete(day) || Boolean(d.skipped);
  }

  function currentDay() {
    const scheduled = scheduledDay();
    for (let day = 1; day <= scheduled; day += 1) {
      if (!dayResolved(day)) return day;
    }
    return scheduled;
  }

  function isFutureDay(day) {
    return day > scheduledDay();
  }

  function completionPct(day) {
    const d = dayState(day);
    const completed = ['food', 'phone', 'movement', 'sleep'].filter(key => Boolean(d.tasks[key])).length;
    return completed * 25;
  }

  function checkInPct(day) {
    const d = dayState(day);
    const entries = [safeNumber(d.water) > 0, d.phone !== '', d.sleep !== '', safeNumber(d.movementMinutes) > 0, d.mood !== '', Boolean((d.journal || '').trim())];
    return Math.round((entries.filter(Boolean).length / entries.length) * 100);
  }

  function weekCompletion() {
    const resolved = Array.from({ length: 7 }, (_, i) => dayResolved(i + 1)).filter(Boolean).length;
    return Math.round((resolved / 7) * 100);
  }


  function setView(view, remember = true) {
    if (remember && state.view !== view) previousView = state.view;
    state.view = view;
    saveState();
    render();
  }

  function subtractMinutes(timeString, minutes) {
    if (!/^\d{2}:\d{2}$/.test(timeString || '')) return '';
    const [hours, mins] = timeString.split(':').map(Number);
    const total = (hours * 60 + mins - minutes + 1440) % 1440;
    return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  }

  function formatTime(timeString) {
    if (!/^\d{2}:\d{2}$/.test(timeString || '')) return 'your chosen time';
    const [hours, mins] = timeString.split(':').map(Number);
    const suffix = hours >= 12 ? 'pm' : 'am';
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${String(mins).padStart(2, '0')} ${suffix}`;
  }

  function formatPhoneDuration(totalMinutes, fallbackHours = '') {
    const total = totalMinutes !== '' && totalMinutes !== undefined ? safeNumber(totalMinutes) : (fallbackHours !== '' ? Math.round(safeNumber(fallbackHours) * 60) : NaN);
    if (!Number.isFinite(total)) return 'Not logged';
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    if (!hours) return `${minutes} min`;
    return minutes ? `${hours} h ${minutes} min` : `${hours} h`;
  }

  function protocolIcon(type) {
    return { food: 'leaf', phone: 'phone', sleep: 'moon', movement: 'walk' }[type] || 'leaf';
  }

  function programmePhaseLabel(day) {
    if (day <= 3) return 'Solid meals';
    if (day === 4) return 'Filling liquid day';
    return 'Mixed meals';
  }

  function indicatorDisplayDay() {
    if (state.view === 'day-detail') {
      return Math.min(7, Math.max(1, safeNumber(state.selectedDay, currentDay())));
    }
    return currentDay();
  }

  function renderDayIndicator() {
    if (!dayIndicator || !state.setupComplete || isBeforeStart()) return;
    const activeDay = currentDay();
    const displayDay = indicatorDisplayDay();
    const preview = displayDay > scheduledDay();
    const viewingAnotherDay = state.view === 'day-detail' && displayDay !== activeDay;
    const label = preview ? 'PREVIEWING' : viewingAnotherDay ? 'VIEWING' : 'CURRENT PROGRAMME DAY';

    dayIndicator.innerHTML = `
      <div class="day-indicator-summary">
        <div>
          <small>${label}</small>
          <strong>Day ${displayDay} of 7</strong>
        </div>
        <span class="day-phase-chip">${escapeHTML(programmePhaseLabel(displayDay))}</span>
      </div>
      <div class="day-indicator-track" role="list" aria-label="Days 1 to 7">
        ${Array.from({ length: 7 }, (_, index) => {
          const day = index + 1;
          const d = dayState(day);
          const complete = dayActionsComplete(day);
          const skipped = Boolean(d.skipped);
          const selected = day === displayDay;
          const active = day === activeDay;
          const future = isFutureDay(day);
          const status = complete ? 'complete' : skipped ? 'skipped' : selected ? 'selected' : future ? 'future' : day < activeDay ? 'unfinished' : 'available';
          const accessibleStatus = complete ? 'complete' : skipped ? 'skipped' : active ? 'current day' : future ? 'preview' : 'available';
          return `<button class="day-indicator-step ${status} ${active ? 'active-day' : ''}" type="button" data-indicator-day="${day}" role="listitem" aria-label="Day ${day}, ${accessibleStatus}" ${selected ? 'aria-current="step"' : ''}><span>${complete ? icon('check', 14) : skipped ? '–' : day}</span></button>`;
        }).join('')}
      </div>`;

    dayIndicator.querySelectorAll('[data-indicator-day]').forEach(button => button.addEventListener('click', () => {
      const day = Number(button.dataset.indicatorDay);
      if (state.view !== 'day-detail') previousView = state.view;
      state.selectedDay = day;
      state.view = 'day-detail';
      saveState();
      render();
    }));
  }

  function render() {
    const setupDone = Boolean(state.setupComplete);
    const waitingToStart = setupDone && isBeforeStart();
    const detailView = ['day-detail', 'settings'].includes(state.view);
    const showAppChrome = setupDone && !waitingToStart;
    topbar.classList.toggle('hidden', !showAppChrome);
    dayIndicator?.classList.toggle('hidden', !showAppChrome);
    bottomNav.classList.toggle('hidden', !showAppChrome);
    backBtn.classList.toggle('hidden', !detailView);
    topbar.classList.toggle('no-back', !detailView);
    document.querySelectorAll('.nav-item').forEach(btn => {
      const active = btn.dataset.view === state.view || (state.view === 'day-detail' && btn.dataset.view === 'days');
      btn.classList.toggle('active', active);
    });
    if (showAppChrome) renderDayIndicator();

    if (!setupDone) return renderSetup();
    if (waitingToStart) return renderReadyForDayOne();

    switch (state.view) {
      case 'days': return renderDays();
      case 'recipes': return renderRecipes();
      case 'progress': return renderProgress();
      case 'protocols': return renderProtocols();
      case 'settings': return renderSettings();
      case 'day-detail': return renderDayDetail(state.selectedDay || currentDay());
      default: return renderToday();
    }
  }

  function foodOptionById(group, id) {
    return (FOOD_OPTIONS[group] || []).find(item => item.id === id);
  }

  function selectedFoodOptions(group) {
    const selected = state.foodPreferences?.[group] || [];
    return selected.map(id => foodOptionById(group, id)).filter(Boolean);
  }

  function foodChoiceGroupHTML(group, title, hint) {
    const selected = new Set(state.foodPreferences?.[group] || []);
    return `<div class="food-choice-group"><div class="food-choice-heading"><div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(hint)}</p></div><span data-food-count="${group}">${selected.size} selected</span></div><div class="food-choice-grid">${FOOD_OPTIONS[group].map(item => `<label class="food-choice-chip"><input type="checkbox" data-food-choice data-food-group="${group}" value="${escapeHTML(item.id)}" ${selected.has(item.id) ? 'checked' : ''} /><span>${escapeHTML(item.label)}</span></label>`).join('')}</div></div>`;
  }

  function avoidTerms() {
    return String(state.foodPreferences?.avoid || '')
      .split(',')
      .map(term => term.trim().toLowerCase())
      .filter(Boolean);
  }

  function recipeHaystack(recipe) {
    return [recipe.title, recipe.category, ...(recipe.ingredients || []), ...(recipe.tags || [])].join(' ').toLowerCase();
  }

  function programmeRecipeAllowed(recipe) {
    const haystack = recipeHaystack(recipe);
    const excludedByProgramme = [/\btofu\b/, /\beggs?\b/, /\bcheese\b/, /\bfeta\b/].some(pattern => pattern.test(haystack));
    const excludedByUser = avoidTerms().some(term => haystack.includes(term));
    return !excludedByProgramme && !excludedByUser;
  }

  function recipePreferenceScore(recipe) {
    const haystack = recipeHaystack(recipe);
    let score = 0;
    ['vegetables', 'fruits'].forEach(group => selectedFoodOptions(group).forEach(item => {
      if (item.keywords.some(keyword => haystack.includes(keyword))) score += 4;
    }));
    ['herbs', 'spices'].forEach(group => selectedFoodOptions(group).forEach(item => {
      if (item.keywords.some(keyword => haystack.includes(keyword))) score += 1;
    }));
    return score;
  }

  function fillingLiquidScore(recipe) {
    const haystack = recipeHaystack(recipe);
    return ['yoghurt', 'oats', 'peanut butter', 'lentil', 'bean', 'peas', 'potato', 'butternut', 'coconut milk'].reduce((score, term) => score + (haystack.includes(term) ? 3 : 0), 0);
  }

  function rankedFoodRecipes(categories, count, excluded = new Set(), extraScore = () => 0) {
    const categorySet = new Set(categories);
    return recipes
      .filter(recipe => categorySet.has(recipe.category) && !excluded.has(recipe.id) && programmeRecipeAllowed(recipe))
      .map((recipe, index) => ({ recipe, score: recipePreferenceScore(recipe) + extraScore(recipe), index }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, count)
      .map(item => item.recipe);
  }

  function rankedLiquidSoups(count) {
    return recipes
      .filter(recipe => recipe.category === 'Soups' && programmeRecipeAllowed(recipe) && (recipe.method || []).join(' ').toLowerCase().includes('blend'))
      .map((recipe, index) => ({ recipe, score: recipePreferenceScore(recipe) + fillingLiquidScore(recipe) + 4, index }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, count)
      .map(item => item.recipe);
  }

  function takeRecipe(list, index, fallbackList = recipes) {
    return list[index % Math.max(1, list.length)] || fallbackList.find(programmeRecipeAllowed) || fallbackList[0];
  }

  function uniqueRecipesFromPlan(mealPlan) {
    const seen = new Set();
    const output = [];
    mealPlan.forEach(day => [day.breakfast, day.lunch, day.dinner].forEach(recipe => {
      if (recipe && !seen.has(recipe.id)) { seen.add(recipe.id); output.push(recipe); }
    }));
    return output;
  }

  function buildFoodSuggestions() {
    const fruitSalads = rankedFoodRecipes(['Fruit Salads'], 3);
    const solidMains = rankedFoodRecipes(['Stir-Fries', 'Air Fryer', 'Vegetable Meals'], 6);
    const smoothies = rankedFoodRecipes(['Smoothies'], 3, new Set(), fillingLiquidScore);
    const liquidSoups = rankedLiquidSoups(3);
    const soups = rankedFoodRecipes(['Soups'], 4, new Set(), fillingLiquidScore);

    const mealPlan = [
      { day: 1, phase: 'Solid fruit & vegetable meals', note: 'No soups or smoothies today.', breakfast: takeRecipe(fruitSalads, 0), lunch: takeRecipe(solidMains, 0), dinner: takeRecipe(solidMains, 1) },
      { day: 2, phase: 'Solid fruit & vegetable meals', note: 'Use leftovers whenever that makes the day easier.', breakfast: takeRecipe(fruitSalads, 1), lunch: takeRecipe(solidMains, 2), dinner: takeRecipe(solidMains, 3) },
      { day: 3, phase: 'Solid meals + prepare Day 4', note: 'Prepare tomorrow’s soup or smoothie tonight.', breakfast: takeRecipe(fruitSalads, 2), lunch: takeRecipe(solidMains, 4), dinner: takeRecipe(solidMains, 5) },
      { day: 4, phase: 'Filling liquid meals', note: 'Smoothies and substantial soups—not juice alone. Add another filling serving or a solid meal if needed.', breakfast: takeRecipe(smoothies, 0), lunch: takeRecipe(liquidSoups, 0, soups), dinner: takeRecipe(liquidSoups, 1, soups) },
      { day: 5, phase: 'Mixed meals', note: 'One liquid meal and two solid meals.', breakfast: takeRecipe(smoothies, 1), lunch: takeRecipe(soups, 2), dinner: takeRecipe(solidMains, 0) },
      { day: 6, phase: 'Mixed meals', note: 'Mix formats and repeat favourites.', breakfast: takeRecipe(fruitSalads, 1), lunch: takeRecipe(soups, 3), dinner: takeRecipe(solidMains, 2) },
      { day: 7, phase: 'Mixed transition day', note: 'Choose the combination you would realistically continue.', breakfast: takeRecipe(smoothies, 2), lunch: takeRecipe(solidMains, 4), dinner: takeRecipe(soups, 1) }
    ];
    const all = uniqueRecipesFromPlan(mealPlan);
    return { fruitSalads, solidMains, smoothies, liquidSoups, soups, all, mealPlan, shopping: buildShoppingList(mealPlan) };
  }

  function shoppingKey(group, label) {
    return `${group}:${String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  function buildShoppingList(mealPlan) {
    const recommended = uniqueRecipesFromPlan(mealPlan);
    const ingredientLines = recommended.flatMap(recipe => recipe.ingredients || []);
    const fullText = ingredientLines.join(' ').toLowerCase();
    const matchedLines = new Set();

    const collectOptions = group => FOOD_OPTIONS[group].filter(item => {
      const matched = item.keywords.some(keyword => fullText.includes(keyword));
      if (matched) ingredientLines.forEach(line => {
        if (item.keywords.some(keyword => line.toLowerCase().includes(keyword))) matchedLines.add(line);
      });
      return matched;
    }).map(item => ({ key: shoppingKey(group, item.id), label: `${item.label}: ${item.quantity}` }));

    const produce = [...collectOptions('vegetables'), ...collectOptions('fruits')];
    const flavour = [...collectOptions('herbs'), ...collectOptions('spices')];

    const pantryRules = [
      ['vegetable stock', 'Vegetable stock or stock cubes'], ['chopped tomatoes', 'Canned chopped tomatoes'],
      ['chickpea', 'Canned chickpeas'], ['bean', 'Canned beans'], ['lentil', 'Lentils'],
      ['brown rice', 'Brown rice'], ['quinoa', 'Quinoa'], ['oats', 'Oats'],
      ['yoghurt', 'Low-fat plain yoghurt'], ['coconut milk', 'Light coconut milk'],
      ['soy sauce', 'Low-sodium soy sauce'], ['sesame seeds', 'Sesame seeds'],
      ['chia', 'Chia seeds'], ['pumpkin', 'Pumpkin or sunflower seeds'],
      ['peanut butter', 'Unsweetened peanut butter'], ['olive oil', 'Olive oil or cooking spray'],
      ['tomato paste', 'Tomato paste'], ['pasta', 'Wholewheat pasta or barley']
    ];
    const basics = [];
    pantryRules.forEach(([term, label]) => {
      if (fullText.includes(term)) basics.push({ key: shoppingKey('basic', label), label });
    });

    const ignorable = ['water', 'ice', 'black pepper', 'salt', 'juice of', 'pinch of'];
    ingredientLines.forEach(line => {
      const lower = line.toLowerCase();
      if (matchedLines.has(line) || ignorable.some(term => lower.includes(term)) || pantryRules.some(([term]) => lower.includes(term))) return;
      const normalized = line.replace(/,\s*(chopped|sliced|cubed|halved|quartered|grated|drained|rinsed|optional).*$/i, '').trim();
      if (!normalized) return;
      const key = shoppingKey('other', normalized);
      if (!basics.some(item => item.key === key)) basics.push({ key, label: normalized });
    });
    return { produce, flavour, basics };
  }

  function compactRecipeLink(recipe, label) {
    if (!recipe) return '';
    return `<button class="meal-plan-recipe" type="button" data-setup-recipe="${escapeHTML(recipe.id)}"><span>${escapeHTML(label)}</span><strong>${escapeHTML(recipe.title)}</strong>${icon('chevron', 16)}</button>`;
  }

  function splitShoppingLabel(value) {
    const text = String(value || '').trim();
    const colon = text.indexOf(':');
    if (colon > 0) {
      return { name: text.slice(0, colon).trim(), quantity: text.slice(colon + 1).trim() };
    }
    return { name: text, quantity: '' };
  }

  function shoppingListHTML(shopping) {
    const sectionMeta = {
      produce: { title: 'Fruit & vegetables', iconName: 'leaf' },
      flavour: { title: 'Herbs & spices', iconName: 'sparkles' },
      basics: { title: 'Recipe basics', iconName: 'bowl' }
    };
    const section = (type, items) => {
      const meta = sectionMeta[type];
      const rows = items.length ? items.map(item => {
        const parsed = splitShoppingLabel(item.label);
        return `<li class="shopping-item"><label class="shopping-check"><input type="checkbox" data-shopping-key="${escapeHTML(item.key)}" ${state.shoppingChecks?.[item.key] ? 'checked' : ''} /><span class="shopping-check-box">${icon('check', 14)}</span><span class="shopping-item-copy"><strong>${escapeHTML(parsed.name)}</strong>${parsed.quantity ? `<small>${escapeHTML(parsed.quantity)}</small>` : ''}</span></label></li>`;
      }).join('') : '<li class="shopping-empty">Nothing additional for this section.</li>';
      return `<section class="shopping-section shopping-section-${type}"><header class="shopping-section-heading"><span>${icon(meta.iconName, 19)}</span><div><h4>${escapeHTML(meta.title)}</h4><small>${items.length} item${items.length === 1 ? '' : 's'}</small></div></header><ul>${rows}</ul></section>`;
    };
    const allItems = [...shopping.produce, ...shopping.flavour, ...shopping.basics];
    const checked = allItems.filter(item => state.shoppingChecks?.[item.key]).length;
    return `<div class="shopping-list-toolbar"><div><strong>Shopping checklist</strong><span>Check your cupboards first, then tick items as you shop.</span></div><span class="shopping-progress"><b data-shopping-checked>${checked}</b> / ${allItems.length}</span></div><div class="shopping-columns">${section('produce', shopping.produce)}${section('flavour', shopping.flavour)}${section('basics', shopping.basics)}</div>`;
  }

  function mealPlanDayHTML(day) {
    return `<article class="meal-plan-entry phase-${day.day === 4 ? 'liquid' : day.day <= 3 ? 'solid' : 'mixed'}"><div class="meal-plan-day"><strong>Day ${day.day}</strong><span>${escapeHTML(day.phase)}</span></div><p>${escapeHTML(day.note)}</p><div>${compactRecipeLink(day.breakfast, 'Breakfast')}${compactRecipeLink(day.lunch, 'Lunch')}${compactRecipeLink(day.dinner, 'Dinner')}</div></article>`;
  }

  function foodSuggestionsHTML() {
    if (!state.foodPreferences?.planGenerated) return '';
    const suggestions = buildFoodSuggestions();
    return `<div id="foodPlanResults" class="food-plan-results">
      <div class="suggestion-notice"><strong>This is only a suggestion.</strong><span>Repeat favourites, swap meals, change portions and use leftovers. You do not have to follow the plan exactly.</span></div>
      <div class="phase-explainer"><div><strong>Days 1–3</strong><span>Solid fruit-and-vegetable meals</span></div><div><strong>Day 4</strong><span>Filling smoothies and soups</span></div><div><strong>Days 5–7</strong><span>A flexible mix</span></div></div>
      <section class="food-result-section"><div class="food-result-heading"><span>${icon('calendar', 21)}</span><div><h3>Your structured 7-day meal suggestion</h3><p>The meals follow the programme progression automatically.</p></div></div><div class="simple-meal-plan">${suggestions.mealPlan.map(mealPlanDayHTML).join('')}</div></section>
      <section class="food-result-section shopping-result"><div class="food-result-heading"><span>${icon('leaf', 21)}</span><div><h3>Your recipe-based shopping list</h3><p>This list is built from the actual recipes above. Quantities remain approximate, so check recipe servings and your cupboards first.</p></div></div>${shoppingListHTML(suggestions.shopping)}</section>
    </div>`;
  }

  function bindShoppingChecks() {
    const updateProgress = () => {
      const inputs = [...document.querySelectorAll('[data-shopping-key]')];
      const progress = document.querySelector('[data-shopping-checked]');
      if (progress) progress.textContent = String(inputs.filter(input => input.checked).length);
    };
    document.querySelectorAll('[data-shopping-key]').forEach(input => input.addEventListener('change', () => {
      state.shoppingChecks = state.shoppingChecks || {};
      state.shoppingChecks[input.dataset.shoppingKey] = input.checked;
      saveState();
      updateProgress();
    }));
    updateProgress();
  }

  function mealPlanForDay(day) {
    return buildFoodSuggestions().mealPlan.find(item => item.day === day);
  }

  function dayMealPlanHTML(day, heading = 'Suggested meals for today') {
    if (!state.foodPreferences?.planGenerated) return '';
    const plan = mealPlanForDay(day);
    if (!plan) return '';
    return `<section class="daily-meal-plan"><div class="daily-meal-heading"><span>${icon('bowl', 22)}</span><div><small>${escapeHTML(plan.phase)}</small><h2>${escapeHTML(heading)}</h2><p>${escapeHTML(plan.note)} This remains a suggestion—swap or repeat meals as needed.</p></div></div><div class="daily-meal-links">${compactRecipeLink(plan.breakfast, 'Breakfast')}${compactRecipeLink(plan.lunch, 'Lunch')}${compactRecipeLink(plan.dinner, 'Dinner')}</div></section>`;
  }


  function startDateDescription(dateString) {
    if (dateString === todayISO()) return 'today';
    if (dateString === tomorrowISO()) return 'tomorrow';
    return `on ${formatDateLong(dateString)}`;
  }

  function dayOneBriefingHTML(context = 'setup') {
    const plan = PROGRAM[0];
    const windDown = subtractMinutes(state.profile.bedtime, plan.sleep.windDown);
    const when = startDateDescription(state.profile.startDate || tomorrowISO());
    const heading = state.profile.startDate === tomorrowISO() ? 'What to do tomorrow' : 'What to do on Day 1';
    return `
      <section id="${context === 'ready' ? 'readyDayOneBriefing' : 'setupDayOneBriefing'}" class="setup-card day-one-briefing">
        <div class="setup-heading">
          <span>YOUR DAY 1 BRIEFING</span>
          <h2 data-briefing-title>${escapeHTML(heading)}</h2>
          <p>Your programme begins ${escapeHTML(when)}. Read this before your phone goes away so you do not need to reopen the app during your wind-down.</p>
        </div>

        <div class="phone-away-warning">
          ${icon('phone', 21)}
          <div>
            <strong>Read the evening steps before parking your phone</strong>
            <span>On Day 1, the phone is put away only for the final 30 minutes before bed. Once it is parked, no app instructions are needed.</span>
          </div>
        </div>

        <div class="day-one-plan-grid">
          <article class="day-one-plan food">
            <span>${icon('leaf', 21)}</span>
            <div><small>Fresh food</small><strong>${escapeHTML(plan.food.title)}</strong><p>Use your suggested meal plan as a guide. Repeat or swap meals if that is easier.</p></div>
          </article>
          <article class="day-one-plan movement">
            <span>${icon('walk', 21)}</span>
            <div><small>Movement</small><strong>${escapeHTML(plan.movement.title)}</strong><p>Take one comfortable 15-minute walk. It can happen at any convenient time.</p></div>
          </article>
          <article class="day-one-plan phone">
            <span>${icon('phone', 21)}</span>
            <div><small>Phone</small><strong>${escapeHTML(plan.phone.title)}</strong><p>Check your screen-time total before the evening wind-down. Then leave the phone in its parking place.</p></div>
          </article>
          <article class="day-one-plan sleep">
            <span>${icon('moon', 21)}</span>
            <div><small>Sleep</small><strong>Wind-down at <span data-brief-winddown>${escapeHTML(formatTime(windDown))}</span></strong><p>After the phone is away: wash, prepare tomorrow’s essentials, dim the lights and choose a quiet activity. Bedtime is <span data-brief-bedtime>${escapeHTML(formatTime(state.profile.bedtime))}</span>.</p></div>
          </article>
        </div>

        <div class="tomorrow-note">
          ${icon('journal', 19)}
          <span><strong>Make it phone-free:</strong> write down your wind-down and bedtime, or print/save this briefing before the phone is parked.</span>
        </div>
        <button class="secondary-button print-briefing-button" data-print-briefing type="button">${icon('journal', 18)} Print or save Day 1 briefing</button>
      </section>`;
  }

  function nextDayBriefingHTML(day) {
    if (day >= 7) return `<section class="next-day-card final"><span>${icon('heart', 22)}</span><div><small>AFTER DAY 7</small><h2>Choose what you want to continue</h2><p>Before bed, write down the food, phone, sleep and movement habits you want to keep next week.</p></div></section>`;
    const tomorrow = PROGRAM[day];
    const tomorrowMeal = mealPlanForDay(day + 1);
    const windDown = subtractMinutes(state.profile.bedtime, tomorrow.sleep.windDown);
    return `<section class="next-day-card"><div class="next-day-heading"><span>${icon('moon', 23)}</span><div><small>BEFORE YOU PUT YOUR PHONE AWAY</small><h2>What to do tomorrow</h2><p>Read this tonight. You should not need to reopen the app during tomorrow morning’s phone-free period.</p></div></div><div class="next-day-grid"><div><span>${icon('phone', 18)}</span><small>Phone</small><strong>${escapeHTML(tomorrow.phone.title)}</strong><p>${escapeHTML(tomorrow.phone.action)}</p></div><div><span>${icon('leaf', 18)}</span><small>Food</small><strong>${escapeHTML(tomorrowMeal?.phase || tomorrow.food.title)}</strong><p>${escapeHTML(tomorrow.food.action)}</p></div><div><span>${icon('walk', 18)}</span><small>Movement</small><strong>${tomorrow.movement.minutes} minutes</strong><p>${escapeHTML(tomorrow.movement.action)}</p></div><div><span>${icon('moon', 18)}</span><small>Evening</small><strong>Wind-down ${escapeHTML(formatTime(windDown))}</strong><p>Keep your ${escapeHTML(formatTime(state.profile.wakeTime))} wake-time anchor.</p></div></div><div class="tomorrow-note">${icon('journal', 19)}<span>Write down any morning instruction before the phone is parked.</span></div></section>`;
  }


  function setupProgressHTML(step) {
    return `<div class="setup-progress"><div><span style="width:${Math.round((step / 6) * 100)}%"></span></div><strong>Step ${step} of 6</strong></div>`;
  }

  function setupNavHTML(step, nextLabel = 'Continue') {
    return `<div class="setup-wizard-nav">${step > 1 ? `<button id="setupBackBtn" class="secondary-button" type="button">${icon('back', 18)} Back</button>` : '<span></span>'}<button id="setupNextBtn" class="primary-button" type="button">${escapeHTML(nextLabel)} ${icon('arrow', 18)}</button></div>`;
  }

  function setupWizardShell(step, body, nextLabel = 'Continue') {
    return `<section class="setup-flow setup-wizard"><div class="setup-logo-panel compact"><img class="setup-logo" src="assets/logo-detox-full-transparent.png" alt="Detox — A 7 Day Fresh Start — By Perfect Women" /><span class="day-zero-badge">DAY 0 · SETUP</span>${setupProgressHTML(step)}</div>${body}${setupNavHTML(step, nextLabel)}</section>`;
  }

  function renderSetup() {
    state.view = 'setup';
    const step = Math.min(6, Math.max(1, safeNumber(state.setupStep, 1)));
    state.setupStep = step;
    saveState();
    const checks = { ...defaultState.setupChecks, ...(state.setupChecks || {}) };
    let body = '';

    if (step === 1) {
      body = `<div class="setup-card wizard-intro-card"><div class="setup-heading"><span>WELCOME</span><h1>Prepare first, then begin your seven days</h1><p>Day 0 helps you understand the progression, choose food you enjoy and shop before Day 1. Setup does not count as one of the seven days.</p></div><div class="phase-explainer large"><div><strong>Days 1–3</strong><span>Solid fruit-and-vegetable meals</span></div><div><strong>Day 4</strong><span>Filling soups and smoothies</span></div><div><strong>Days 5–7</strong><span>A mix of solid and liquid meals</span></div></div><div class="setup-explainer-grid"><article><span>${icon('leaf', 23)}</span><div><strong>Fresh food</strong><small>Plant-focused meals with optional low-fat plain yoghurt. No tofu, eggs, cheese or feta in the suggested programme.</small></div></article><article><span>${icon('phone', 23)}</span><div><strong>Phone reset</strong><small>Morning, mealtime and bedtime boundaries progress across the week.</small></div></article><article><span>${icon('walk', 23)}</span><div><strong>Daily movement</strong><small>Manageable walking, mobility and gentle strength every day.</small></div></article><article><span>${icon('moon', 23)}</span><div><strong>Sleep routine</strong><small>Your bedtime and wake time create each day’s wind-down plan.</small></div></article></div><div class="safety-note"><strong>Day 4 is not a fast.</strong><span>It uses substantial soups and smoothies rather than juice alone. If you are hungry or do not feel well, add more food or choose a solid meal.</span></div></div>`;
    }

    if (step === 2) {
      body = `<div class="setup-card setup-form-card"><div class="setup-heading"><span>YOUR STARTING POINT</span><h2>Set your sleep anchors and baseline</h2><p>Weight is optional. Phone use and sleep are recorded only to compare the start and end of the week.</p></div><div class="form-grid two-col"><div class="field"><label for="obName">Your name <span>(optional)</span></label><input id="obName" autocomplete="name" placeholder="First name" value="${escapeHTML(state.profile.name)}" /></div><div class="field"><label for="obWeight">Starting weight <span>(optional)</span></label><input id="obWeight" type="number" min="20" max="400" step="0.1" placeholder="kg" value="${escapeHTML(state.profile.startWeight)}" /></div><div class="field"><label for="obBedtime">Target bedtime</label><div class="input-shell"><input id="obBedtime" type="time" value="${escapeHTML(state.profile.bedtime)}" /></div></div><div class="field"><label for="obWake">Target wake time</label><div class="input-shell"><input id="obWake" type="time" value="${escapeHTML(state.profile.wakeTime)}" /></div></div><div class="field"><label for="obSleepHours">Usual sleep <span>(optional)</span></label><input id="obSleepHours" type="number" min="1" max="14" step="0.25" placeholder="hours" value="${escapeHTML(state.profile.baselineSleepHours)}" /></div><div class="field"><label for="obEnergy">Starting energy</label><select id="obEnergy">${[1,2,3,4,5].map(n => `<option value="${n}" ${String(state.profile.startEnergy) === String(n) ? 'selected' : ''}>${n} / 5</option>`).join('')}</select></div><div class="field full"><label>Current daily phone use <span>(recommended)</span></label><div class="split-input-row"><label><span>Hours</span><input id="obPhoneHours" type="number" min="0" max="23" step="1" value="${escapeHTML(state.profile.baselinePhoneHours)}" /></label><label><span>Minutes</span><input id="obPhoneMinutes" type="number" min="0" max="59" step="1" value="${escapeHTML(state.profile.baselinePhoneMinutes)}" /></label></div></div></div><details class="screen-time-help"><summary>${icon('phone', 18)} Where do I find my screen time?</summary><div><p><strong>iPhone:</strong> Settings → Screen Time → See All App & Website Activity.</p><p><strong>Android:</strong> Settings → Digital Wellbeing & parental controls.</p></div></details></div>`;
    }

    if (step === 3) {
      body = `<div id="foodSetupCard" class="setup-card food-setup-card"><div class="setup-heading"><span>FOODS YOU ENJOY</span><h2>Choose what you are happy to eat</h2><p>Your choices guide the recipes. Pick at least five fruit or vegetables and two herbs or spices.</p></div>${foodChoiceGroupHTML('vegetables', 'Vegetables', 'Choose as many as you genuinely enjoy.')}${foodChoiceGroupHTML('fruits', 'Fruit', 'Fresh or frozen fruit both work.')}${foodChoiceGroupHTML('herbs', 'Fresh herbs and aromatics', 'These make simple meals more enjoyable.')}${foodChoiceGroupHTML('spices', 'Spices and dried herbs', 'Choose the flavours you use comfortably.')}<div class="field avoid-field"><label for="avoidFoods">Do not include <span>(optional)</span></label><input id="avoidFoods" value="${escapeHTML(state.foodPreferences?.avoid || '')}" placeholder="e.g. mushrooms, chilli, peanuts" /><small>Separate foods with commas. Recipes containing these words will be excluded.</small></div><div id="foodChoiceError" class="setup-error hidden" role="alert"></div></div>`;
    }

    if (step === 4) {
      body = `<div class="setup-card food-setup-card"><div class="setup-heading"><span>YOUR FOOD PLAN</span><h2>Review the progression and shopping list</h2><p>The plan uses fewer unique recipes and encourages leftovers so shopping stays manageable.</p></div>${state.foodPreferences?.planGenerated ? foodSuggestionsHTML() : `<div class="empty-food-plan">${icon('bowl', 34)}<h3>Build your suggestions</h3><p>We will structure Days 1–3 as solids, Day 4 as filling liquids and Days 5–7 as a mix.</p><button id="buildFoodPlanBtn" class="primary-button" type="button">Build my food plan ${icon('arrow', 18)}</button></div>`}<div id="foodChoiceError" class="setup-error hidden" role="alert"></div></div>`;
    }

    if (step === 5) {
      body = `<div class="setup-card setup-form-card"><div class="setup-heading"><span>CHOOSE DAY 1</span><h2>Give yourself enough time to shop</h2><p>Your seven days do not begin until the date you choose.</p></div><div class="start-choice-panel"><button id="chooseTomorrowBtn" class="start-choice-button ${state.profile.startDate === tomorrowISO() ? 'active' : ''}" type="button"><span>${icon('sun', 21)}</span><div><strong>Start tomorrow</strong><small>Use today to finish shopping.</small></div>${icon('chevron', 18)}</button><button id="chooseLaterBtn" class="start-choice-button ${state.profile.startDate && state.profile.startDate !== tomorrowISO() ? 'active' : ''}" type="button"><span>${icon('calendar', 21)}</span><div><strong>I need more time</strong><small>Choose a later date.</small></div>${icon('chevron', 18)}</button></div><div class="field"><label for="obDate">Day 1 start date</label><div class="input-shell"><input id="obDate" type="date" min="${escapeHTML(todayISO())}" value="${escapeHTML(state.profile.startDate || tomorrowISO())}" /></div><small id="startDateStatus" class="field-help">Day 1 starts ${escapeHTML(startDateDescription(state.profile.startDate || tomorrowISO()))}.</small></div><div class="countdown-preview"><span>${icon('calendar', 21)}</span><div><strong>${escapeHTML(formatDateLong(state.profile.startDate || tomorrowISO()))}</strong><small>Shopping and preparation can continue until then.</small></div></div></div>`;
    }

    if (step === 6) {
      body = `<div class="setup-card preparation-card"><div class="setup-heading"><span>FINAL PREPARATION</span><h2>Prepare for Day 1</h2><p>These checks can be updated later from the waiting screen if your start date is still a few days away.</p></div><div class="readiness-list"><label class="readiness-item"><input id="checkKitchen" type="checkbox" ${checks.kitchen ? 'checked' : ''} /><span class="readiness-check">${icon('check', 17)}</span><span><strong>My shopping is ready or planned</strong><small>I have reviewed the recipe-based list and know what I still need.</small></span></label><label class="readiness-item"><input id="checkPhone" type="checkbox" ${checks.phone ? 'checked' : ''} /><span class="readiness-check">${icon('check', 17)}</span><span><strong>My phone has a parking place</strong><small>I know where it will stay during meals and the evening wind-down.</small></span></label><label class="readiness-item"><input id="checkMovement" type="checkbox" ${checks.movement ? 'checked' : ''} /><span class="readiness-check">${icon('check', 17)}</span><span><strong>I have a movement option</strong><small>I have a safe route or a small indoor space.</small></span></label><label class="readiness-item"><input id="checkUnderstanding" type="checkbox" ${checks.understanding ? 'checked' : ''} /><span class="readiness-check">${icon('check', 17)}</span><span><strong>I understand this is a flexible suggestion</strong><small>“Detox” is the programme name. This is not a medical detox, fast or treatment.</small></span></label></div></div>${dayOneBriefingHTML('setup')}<div id="setupError" class="setup-error hidden" role="alert"></div>`;
    }

    main.innerHTML = setupWizardShell(step, body, step === 6 ? 'Complete setup' : 'Continue');

    const go = nextStep => { state.setupStep = Math.min(6, Math.max(1, nextStep)); saveState(); renderSetup(); };
    document.getElementById('setupBackBtn')?.addEventListener('click', () => go(step - 1));

    if (step === 2) {
      const saveBaseline = () => {
        state.profile.name = document.getElementById('obName').value.trim();
        state.profile.startWeight = document.getElementById('obWeight').value;
        state.profile.bedtime = document.getElementById('obBedtime').value || '22:30';
        state.profile.wakeTime = document.getElementById('obWake').value || '06:30';
        state.profile.baselineSleepHours = document.getElementById('obSleepHours').value;
        state.profile.startEnergy = document.getElementById('obEnergy').value;
        state.profile.baselinePhoneHours = document.getElementById('obPhoneHours').value;
        state.profile.baselinePhoneMinutes = document.getElementById('obPhoneMinutes').value;
        state.profile.baselinePhoneTotalMinutes = safeNumber(state.profile.baselinePhoneHours) * 60 + safeNumber(state.profile.baselinePhoneMinutes);
        saveState();
      };
      document.querySelectorAll('input,select').forEach(el => el.addEventListener('change', saveBaseline));
      document.getElementById('setupNextBtn').addEventListener('click', () => { saveBaseline(); go(3); });
      return;
    }

    if (step === 3) {
      const saveFood = () => {
        state.foodPreferences = state.foodPreferences || clone(defaultState.foodPreferences);
        ['vegetables','fruits','herbs','spices'].forEach(group => { state.foodPreferences[group] = Array.from(document.querySelectorAll(`[data-food-choice][data-food-group="${group}"]:checked`)).map(input => input.value); });
        state.foodPreferences.avoid = document.getElementById('avoidFoods').value.trim();
        state.foodPreferences.planGenerated = false;
        state.shoppingChecks = {};
        saveState();
      };
      document.querySelectorAll('[data-food-choice]').forEach(control => control.addEventListener('change', () => {
        saveFood(); const group=control.dataset.foodGroup; const count=document.querySelectorAll(`[data-food-choice][data-food-group="${group}"]:checked`).length; const counter=document.querySelector(`[data-food-count="${group}"]`); if(counter) counter.textContent=`${count} selected`;
      }));
      document.getElementById('avoidFoods').addEventListener('change', saveFood);
      document.getElementById('setupNextBtn').addEventListener('click', () => {
        saveFood();
        const produceCount=state.foodPreferences.vegetables.length+state.foodPreferences.fruits.length;
        const flavourCount=state.foodPreferences.herbs.length+state.foodPreferences.spices.length;
        const error=document.getElementById('foodChoiceError');
        if(produceCount<5 || flavourCount<2){ error.textContent='Please choose at least five fruit or vegetables and two herbs or spices.'; error.classList.remove('hidden'); return; }
        state.foodPreferences.planGenerated=true; saveState(); go(4);
      });
      return;
    }

    if (step === 4) {
      document.getElementById('buildFoodPlanBtn')?.addEventListener('click', () => { state.foodPreferences.planGenerated=true; saveState(); renderSetup(); });
      document.querySelectorAll('[data-setup-recipe]').forEach(button => button.addEventListener('click', () => openRecipe(button.dataset.setupRecipe)));
      bindRecipeCards(); bindShoppingChecks();
      document.getElementById('setupNextBtn').addEventListener('click', () => {
        const error=document.getElementById('foodChoiceError');
        if(!state.foodPreferences?.planGenerated){ error.textContent='Build your food plan before continuing.'; error.classList.remove('hidden'); return; }
        go(5);
      });
      return;
    }

    if (step === 5) {
      const saveDate=()=>{ state.profile.startDate=document.getElementById('obDate').value || tomorrowISO(); saveState(); const status=document.getElementById('startDateStatus'); if(status) status.textContent=`Day 1 starts ${startDateDescription(state.profile.startDate)}.`; document.getElementById('chooseTomorrowBtn')?.classList.toggle('active',state.profile.startDate===tomorrowISO()); document.getElementById('chooseLaterBtn')?.classList.toggle('active',state.profile.startDate!==tomorrowISO()); };
      document.getElementById('chooseTomorrowBtn').addEventListener('click',()=>{ document.getElementById('obDate').value=tomorrowISO(); saveDate(); renderSetup(); });
      document.getElementById('chooseLaterBtn').addEventListener('click',()=>{ const input=document.getElementById('obDate'); if(!input.value||input.value===tomorrowISO()) input.value=addDaysISO(2); saveDate(); input.focus(); if(typeof input.showPicker==='function'){try{input.showPicker();}catch{}} });
      document.getElementById('obDate').addEventListener('change',saveDate);
      document.getElementById('setupNextBtn').addEventListener('click',()=>{ saveDate(); go(6); });
      return;
    }

    if (step === 6) {
      const saveChecks=()=>{ state.setupChecks={ kitchen:document.getElementById('checkKitchen').checked, phone:document.getElementById('checkPhone').checked, movement:document.getElementById('checkMovement').checked, understanding:document.getElementById('checkUnderstanding').checked }; saveState(); };
      document.querySelectorAll('.readiness-item input').forEach(input=>input.addEventListener('change',saveChecks));
      document.querySelectorAll('[data-print-briefing]').forEach(button=>button.addEventListener('click',()=>window.print()));
      document.getElementById('setupNextBtn').addEventListener('click',()=>{
        saveChecks(); const error=document.getElementById('setupError');
        if(!state.setupChecks.understanding){ error.textContent='Please confirm that you understand the programme is flexible and is not a medical detox or fast.'; error.classList.remove('hidden'); return; }
        state.setupComplete=true; state.onboarded=true; state.setupVersion=13; state.view='today'; saveState(); render();
      });
      return;
    }

    document.getElementById('setupNextBtn').addEventListener('click', () => go(step + 1));
  }


  function renderReadyForDayOne() {
    state.view = 'ready';
    const start = dateAtMidnight(state.profile.startDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const daysAway = start ? Math.max(1, Math.ceil((start - today) / DAY_MS)) : 1;
    const checks = { ...defaultState.setupChecks, ...(state.setupChecks || {}) };
    main.innerHTML = `<section class="ready-screen"><div class="ready-logo-wrap"><img src="assets/logo-detox-full-transparent.png" alt="Detox — A 7 Day Fresh Start — By Perfect Women" /></div><div class="ready-card"><span class="day-zero-badge">DAY 0 COMPLETE</span><div class="ready-checkmark">${icon('check', 42)}</div><h1>${daysAway === 1 ? 'Day 1 starts tomorrow' : `${daysAway} days until Day 1`}</h1><p>Your Fresh Start begins on <strong>${escapeHTML(formatDateLong(state.profile.startDate))}</strong>.</p><div class="ready-anchor-grid"><div><span>${icon('moon',20)}</span><small>Bedtime</small><strong>${escapeHTML(formatTime(state.profile.bedtime))}</strong></div><div><span>${icon('sun',20)}</span><small>Wake time</small><strong>${escapeHTML(formatTime(state.profile.wakeTime))}</strong></div></div><div class="ready-prep-status"><h2>Preparation status</h2><label><input id="readyKitchen" type="checkbox" ${checks.kitchen?'checked':''}/><span>${icon('check',14)}</span>Shopping ready or planned</label><label><input id="readyPhone" type="checkbox" ${checks.phone?'checked':''}/><span>${icon('check',14)}</span>Phone parking place chosen</label><label><input id="readyMovement" type="checkbox" ${checks.movement?'checked':''}/><span>${icon('check',14)}</span>Movement option ready</label></div><button id="readyFoodPlanBtn" class="primary-button" type="button">Review shopping list and meals</button>${dayOneBriefingHTML('ready')}<button id="startNowBtn" class="secondary-button" type="button">Start Day 1 now ${icon('arrow',19)}</button><button id="editSetupBtn" class="secondary-button" type="button">Edit my setup</button></div></section>`;
    const saveReady=()=>{ state.setupChecks.kitchen=document.getElementById('readyKitchen').checked; state.setupChecks.phone=document.getElementById('readyPhone').checked; state.setupChecks.movement=document.getElementById('readyMovement').checked; saveState(); };
    document.querySelectorAll('.ready-prep-status input').forEach(input=>input.addEventListener('change',saveReady));
    document.getElementById('readyFoodPlanBtn').addEventListener('click', openFoodPlanModal);
    document.querySelectorAll('[data-print-briefing]').forEach(button=>button.addEventListener('click',()=>window.print()));
    document.getElementById('startNowBtn').addEventListener('click',()=>{ if(!window.confirm('Starting now will make today Day 1. Are you ready to begin?')) return; state.profile.startDate=todayISO(); state.view='today'; saveState(); render(); });
    document.getElementById('editSetupBtn').addEventListener('click',()=>{ state.setupComplete=false; state.setupStep=1; saveState(); render(); });
  }


  function renderToday() {
    renderDayIndicator();
    const day = currentDay();
    const d = dayState(day);
    const plan = PROGRAM[day - 1];
    const pct = completionPct(day);
    const windDownTime = subtractMinutes(state.profile.bedtime, plan.sleep.windDown);
    const behind = scheduledDay() > day;
    main.innerHTML = `<section class="day-hero"><div class="hero-copy"><span class="eyebrow">DAY ${day} OF 7 · ${escapeHTML(plan.phase)}</span><h1>${escapeHTML(plan.title)}</h1><p>${escapeHTML(plan.subtitle)}</p></div><div class="progress-orb" style="--pct:${pct}"><div><strong>${pct}%</strong><span>actions</span></div></div></section>${behind ? `<div class="recovery-banner"><span>${icon('calendar',22)}</span><div><strong>You are continuing Day ${day}</strong><p>The calendar has moved on, but this day is unfinished. Continue it, or skip it deliberately.</p></div><button id="skipDayBtn" type="button">Skip to Day ${Math.min(7,day+1)}</button></div>`:''}<div class="section-heading"><div><span>TODAY'S FOUR ACTIONS</span><h2>Complete these before worrying about tracking</h2></div></div><div class="protocol-card-list">${['food','phone','movement','sleep'].map(type=>protocolCardHTML(type,plan[type],d,day)).join('')}</div>${dayMealPlanHTML(day)}<div class="anchor-strip"><div><span>${icon('clock',19)}</span><small>Wind-down starts</small><strong>${formatTime(windDownTime)}</strong></div><div><span>${icon('sun',19)}</span><small>Wake anchor</small><strong>${formatTime(state.profile.wakeTime)}</strong></div></div><div class="section-heading"><div><span>OPTIONAL CHECK-IN · ${checkInPct(day)}%</span><h2>Record what actually happened</h2></div><button id="editTracking" class="link-button" type="button">Add details</button></div><div class="metric-grid">${metricHTML('water','Water',safeNumber(d.water)?`${safeNumber(d.water)} cups`:'Not logged')}${metricHTML('walk','Movement',d.movementMinutes!==''?`${escapeHTML(d.movementMinutes)} min`:'Not logged')}${metricHTML('phone','Phone use',formatPhoneDuration(d.phoneTotalMinutes,d.phone))}${metricHTML('moon','Sleep',d.sleep!==''?`${escapeHTML(d.sleep)} h`:'Not logged')}</div><div class="quick-log-card"><div><span class="quick-log-icon">${icon('water',24)}</span><div><strong>Water so far</strong><small>This does not affect your programme-completion score.</small></div></div><div class="stepper"><button id="waterMinus" type="button">${icon('minus',18)}</button><strong>${safeNumber(d.water)}</strong><button id="waterAdd" type="button">${icon('plus',18)}</button></div></div>${nextDayBriefingHTML(day)}`;
    bindTaskButtons(day);
    bindRecipeCards();
    document.querySelectorAll('[data-setup-recipe]').forEach(button=>button.addEventListener('click',()=>openRecipe(button.dataset.setupRecipe)));
    document.getElementById('editTracking').addEventListener('click',()=>renderDayDetail(day,true));
    document.getElementById('waterAdd').addEventListener('click',()=>{d.water=safeNumber(d.water)+1;saveState();renderToday();});
    document.getElementById('waterMinus').addEventListener('click',()=>{d.water=Math.max(0,safeNumber(d.water)-1);saveState();renderToday();});
    document.getElementById('skipDayBtn')?.addEventListener('click',()=>{ if(!window.confirm(`Skip Day ${day}? You can still preview it later.`)) return; d.skipped=true; saveState(); renderToday(); });
  }


  function categoryImage(category) {
    return APP_ART.categories[category] || APP_ART.food;
  }

  function protocolArt(type) {
    return ({ phone: APP_ART.phone, sleep: APP_ART.sleep, movement: APP_ART.movement })[type] || APP_ART.progress;
  }

  function todayVisualTileHTML(type, title, caption, image) {
    return `<article class="today-visual-tile ${escapeHTML(type)}"><img src="${escapeHTML(image)}" alt="" loading="lazy" /><div><small>${escapeHTML(title)}</small><strong>${escapeHTML(caption)}</strong></div></article>`;
  }

  function heroArtHTML(image, alt, extraClass = '') {
    return `<div class="hero-art ${extraClass}"><img src="${escapeHTML(image)}" alt="${escapeHTML(alt)}" loading="lazy" /></div>`;
  }

  function protocolCardHTML(type, item, d, day) {
    const done = Boolean(d.tasks[type]);
    const label = { food: 'Fresh food', phone: 'Phone reset', movement: 'Movement', sleep: 'Sleep protocol' }[type];
    const meta = type === 'movement'
      ? `${item.minutes} minute plan`
      : type === 'sleep'
        ? `${item.windDown} minute wind-down`
        : `Day ${day} action`;
    return `
      <article class="protocol-card ${type} ${done ? 'complete' : ''}">
        <div class="protocol-icon">${icon(protocolIcon(type), 25)}</div>
        <div class="protocol-copy"><span>${escapeHTML(label)} · ${escapeHTML(meta)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.action)}</p></div>
        <button class="task-check ${done ? 'done' : ''}" data-task="${type}" type="button" aria-label="Mark ${escapeHTML(label)} complete">${icon('check', 19)}</button>
      </article>`;
  }

  function metricHTML(iconName, label, value) {
    return `<div class="metric-card"><span>${icon(iconName, 20)}</span><small>${escapeHTML(label)}</small><strong>${escapeHTML(value)}</strong></div>`;
  }

  function bindTaskButtons(day) {
    document.querySelectorAll('[data-task]').forEach(btn => btn.addEventListener('click', () => {
      const d = dayState(day);
      const task = btn.dataset.task;
      d.tasks[task] = !d.tasks[task];
      saveState();
      render();
    }));
  }

  function featuredRecipesHTML(day) {
    return dayMealPlanHTML(day, 'Suggested meals');
  }


  function renderDays() {
    const cur=currentDay();
    main.innerHTML=`<section class="page-hero compact"><span class="eyebrow">YOUR 7-DAY ROADMAP</span><h1>A clear food progression across the week</h1><p>Preview every day. The programme pauses on an unfinished day instead of silently moving past it.</p><div class="week-progress"><div><span style="width:${weekCompletion()}%"></span></div><strong>${weekCompletion()}%</strong></div></section><div class="phase-explainer roadmap"><div><strong>Days 1–3</strong><span>Solid meals</span></div><div><strong>Day 4</strong><span>Filling liquids</span></div><div><strong>Days 5–7</strong><span>Mixed meals</span></div></div><div class="section-heading"><div><span>THE WEEK</span><h2>Tap any day to preview it</h2></div></div><div class="day-list">${PROGRAM.map((plan,idx)=>{const day=idx+1;const future=isFutureDay(day);const pct=completionPct(day);const status=dayState(day).skipped?'SKIPPED':dayActionsComplete(day)?'COMPLETE':day===cur?'CURRENT DAY':future?'PREVIEW':'INCOMPLETE';return `<button class="journey-day ${day===cur?'current':''} ${future?'preview':''}" data-day="${day}" type="button"><div class="journey-number">${dayActionsComplete(day)?icon('check',22):day}</div><div class="journey-copy"><span>${status}</span><h3>${escapeHTML(plan.title)}</h3><p>${escapeHTML(plan.phase)} · ${plan.movement.minutes} min movement</p></div><div class="journey-arrow">${icon('chevron',20)}</div></button>`;}).join('')}</div>`;
    document.querySelectorAll('[data-day]').forEach(btn=>btn.addEventListener('click',()=>renderDayDetail(Number(btn.dataset.day))));
  }


  function renderDayDetail(day, focusTracking = false) {
    const preview = isFutureDay(day);
    if (state.view !== 'day-detail') previousView = state.view;
    state.view = 'day-detail';
    state.selectedDay = day;
    saveState();
    renderDayIndicator();

    const d = dayState(day);
    const plan = PROGRAM[day - 1];
    const windDownTime = subtractMinutes(state.profile.bedtime, plan.sleep.windDown);

    main.innerHTML = `
      <section class="page-hero day-detail-hero">
        <span class="eyebrow">DAY ${day} · ${preview ? 'PREVIEW' : 'FULL PLAN'} · ${escapeHTML(plan.phase)}</span>
        <h1>${escapeHTML(plan.title)}</h1>
        <p>${escapeHTML(plan.subtitle)}</p>
        <div class="detail-anchor-row"><span>${icon('clock', 18)} Wind-down ${formatTime(windDownTime)}</span><span>${icon('sun', 18)} Wake ${formatTime(state.profile.wakeTime)}</span></div>
      </section>

      ${preview ? `<div class="preview-banner">${icon('calendar', 20)} <span>This is a preview. Day ${day} begins after the earlier days are resolved.</span></div>` : ''}
      ${dayMealPlanHTML(day)}
      <div class="guided-sections">
        ${guidedSectionHTML('food', 'Fresh food', plan.food, d)}
        ${guidedSectionHTML('phone', 'Phone reset', plan.phone, d)}
        ${guidedMovementHTML(plan.movement, d)}
        ${guidedSectionHTML('sleep', 'Sleep protocol', plan.sleep, d, `Start winding down at ${formatTime(windDownTime)} for your ${formatTime(state.profile.bedtime)} bedtime.`)}
      </div>

      ${preview ? '' : nextDayBriefingHTML(day)}
      <div class="section-heading"><div><span>OPTIONAL DAILY LOG</span><h2>Record what actually happened</h2></div></div>
      <div class="tracking-card" id="trackingCard">
        <div class="tracking-grid">
          <div class="field"><label for="dayWater">Water cups</label><input id="dayWater" type="number" min="0" max="30" value="${safeNumber(d.water)}" /></div>
          <div class="field"><label for="dayMovement">Movement minutes</label><input id="dayMovement" type="number" min="0" max="300" value="${escapeHTML(d.movementMinutes)}" placeholder="e.g. ${plan.movement.minutes}" /></div>
          <div class="field"><label>Phone use</label><div class="split-input-row"><label><span>Hours</span><input id="dayPhoneHours" type="number" min="0" max="23" step="1" value="${escapeHTML(d.phoneHours)}" /></label><label><span>Minutes</span><input id="dayPhoneMinutes" type="number" min="0" max="59" step="1" value="${escapeHTML(d.phoneMinutes)}" /></label></div></div>
          <div class="field"><label for="daySleep">Sleep (hours)</label><input id="daySleep" type="number" min="0" max="24" step="0.1" value="${escapeHTML(d.sleep)}" placeholder="e.g. 7.5" /></div>
          <div class="field full"><label for="sleepQuality">Sleep quality</label><select id="sleepQuality"><option value="">Choose</option>${['Poor','Restless','Okay','Good','Excellent'].map(v => `<option value="${v}" ${d.sleepQuality === v ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
        </div>
        <div class="mood-block"><label>How do you feel?</label><div class="mood-row">${['Low','Flat','Okay','Good','Great'].map((m, idx) => `<button class="mood-button ${d.mood === m ? 'active' : ''}" data-mood="${m}" type="button"><span>${['1','2','3','4','5'][idx]}</span><small>${m}</small></button>`).join('')}</div></div>
        <div class="field journal-field"><label for="dayJournal">A quick note</label><textarea id="dayJournal" placeholder="What helped today? What would you change tomorrow?">${escapeHTML(d.journal)}</textarea></div>
        <button id="saveDayBtn" class="primary-button" type="button">Save Day ${day} ${icon('check', 19)}</button>
      </div>`;

    bindTaskButtons(day);
    document.querySelectorAll('[data-setup-recipe]').forEach(button => button.addEventListener('click', () => openRecipe(button.dataset.setupRecipe)));
    if (preview) document.querySelectorAll('[data-task], #saveDayBtn, [data-mood]').forEach(control => { control.disabled = true; });
    document.querySelectorAll('[data-mood]').forEach(btn => btn.addEventListener('click', () => {
      d.mood = btn.dataset.mood;
      saveState();
      document.querySelectorAll('[data-mood]').forEach(b => b.classList.toggle('active', b.dataset.mood === d.mood));
    }));
    document.getElementById('saveDayBtn').addEventListener('click', () => {
      d.water = safeNumber(document.getElementById('dayWater').value);
      d.movementMinutes = document.getElementById('dayMovement').value;
      d.phoneHours = document.getElementById('dayPhoneHours').value;
      d.phoneMinutes = document.getElementById('dayPhoneMinutes').value;
      d.phoneTotalMinutes = d.phoneHours === '' && d.phoneMinutes === '' ? '' : safeNumber(d.phoneHours) * 60 + Math.min(59, Math.max(0, safeNumber(d.phoneMinutes)));
      d.phone = d.phoneTotalMinutes === '' ? '' : (d.phoneTotalMinutes / 60).toFixed(2);
      d.sleep = document.getElementById('daySleep').value;
      d.sleepQuality = document.getElementById('sleepQuality').value;
      d.journal = document.getElementById('dayJournal').value;
      saveState();
      showToast(`Day ${day} saved`);
    });
    if (focusTracking) setTimeout(() => document.getElementById('trackingCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  function guidedSectionHTML(type, label, item, d, extra = '') {
    const done = Boolean(d.tasks[type]);
    return `
      <article class="guided-card ${type}">
        <div class="guided-top"><span class="guided-icon">${icon(protocolIcon(type), 26)}</span><div><small>${escapeHTML(label)}</small><h2>${escapeHTML(item.title)}</h2></div><button class="task-check ${done ? 'done' : ''}" data-task="${type}" type="button">${icon('check', 19)}</button></div>
        <p>${escapeHTML(item.action)}</p>
        ${extra ? `<div class="guided-note">${icon('clock', 17)} ${escapeHTML(extra)}</div>` : ''}
      </article>`;
  }

  function guidedMovementHTML(item, d) {
    const done = Boolean(d.tasks.movement);
    return `
      <article class="guided-card movement">
        <div class="guided-top"><span class="guided-icon">${icon('walk', 26)}</span><div><small>Movement · ${item.minutes} minutes</small><h2>${escapeHTML(item.title)}</h2></div><button class="task-check ${done ? 'done' : ''}" data-task="movement" type="button">${icon('check', 19)}</button></div>
        <p>${escapeHTML(item.action)}</p>
        <ol class="movement-steps">${item.steps.map(step => `<li><span>${icon('check', 14)}</span>${escapeHTML(step)}</li>`).join('')}</ol>
      </article>`;
  }

  function renderProtocols() {
    const tab = state.protocolTab || 'phone';
    const tabMeta = {
      phone: { title: 'The phone reset', intro: 'The goal is not a perfect screen-time number. Each day creates a clearer boundary around mornings, meals, focused time and bedtime.', icon: 'phone' },
      sleep: { title: 'The sleep protocol', intro: 'The routine builds around two anchors: a repeatable wake time and a calm wind-down. Consistency matters more than a flawless night.', icon: 'moon' },
      movement: { title: 'The movement protocol', intro: 'Movement happens every day, but it stays manageable: walking, mobility, one gentle strength session and enjoyable activity.', icon: 'walk' }
    }[tab];

    main.innerHTML = `
      <section class="page-hero protocol-hero with-hero-art">
        <span class="eyebrow">THE RESET PROTOCOLS</span>
        <h1>Food is only one part of the Fresh Start</h1>
        <p>The app deliberately guides phone use, sleep and movement across all seven days.</p>
        ${heroArtHTML(protocolArt(tab), `${tabMeta.title} illustration`, 'hero-art-float')}
      </section>

      <div class="protocol-tabs" role="tablist">
        ${[['phone','Phone'],['sleep','Sleep'],['movement','Movement']].map(([id, label]) => `<button class="protocol-tab ${tab === id ? 'active' : ''}" data-protocol-tab="${id}" type="button">${icon(protocolIcon(id), 20)} ${label}</button>`).join('')}
      </div>

      <div class="protocol-intro with-art"><span>${icon(tabMeta.icon, 30)}</span><div><h2>${escapeHTML(tabMeta.title)}</h2><p>${escapeHTML(tabMeta.intro)}</p></div><img class="protocol-art" src="${escapeHTML(protocolArt(tab))}" alt="${escapeHTML(tabMeta.title)} illustration" loading="lazy" /></div>

      <div class="protocol-timeline">
        ${PROGRAM.map((plan, idx) => {
          const item = plan[tab];
          const day = idx + 1;
          const detail = tab === 'movement' ? `${item.minutes} minutes · ${item.action}` : item.action;
          return `<article><div class="timeline-day">${day}</div><div><span>DAY ${day}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(detail)}</p>${tab === 'sleep' ? `<small>Wind-down begins ${formatTime(subtractMinutes(state.profile.bedtime, item.windDown))}</small>` : ''}</div></article>`;
        }).join('')}
      </div>

      <div class="section-heading"><div><span>YOUR ANCHORS</span><h2>Adjust the times that guide sleep</h2></div></div>
      <div class="anchor-settings-card">
        <div class="field"><label for="protocolBedtime">Target bedtime</label><div class="input-shell"><input id="protocolBedtime" type="time" value="${escapeHTML(state.profile.bedtime)}" /></div></div>
        <div class="field"><label for="protocolWake">Target wake time</label><div class="input-shell"><input id="protocolWake" type="time" value="${escapeHTML(state.profile.wakeTime)}" /></div></div>
        <button id="saveAnchors" class="secondary-button" type="button">Update my anchors</button>
      </div>`;

    document.querySelectorAll('[data-protocol-tab]').forEach(btn => btn.addEventListener('click', () => {
      state.protocolTab = btn.dataset.protocolTab;
      saveState();
      renderProtocols();
    }));
    document.getElementById('saveAnchors').addEventListener('click', () => {
      state.profile.bedtime = document.getElementById('protocolBedtime').value || state.profile.bedtime;
      state.profile.wakeTime = document.getElementById('protocolWake').value || state.profile.wakeTime;
      saveState();
      showToast('Sleep anchors updated');
      renderProtocols();
    });
  }

  function categories() {
    return ['All', ...Array.from(new Set(recipes.map(r => r.category))), 'Favourites'];
  }

  function filteredRecipes() {
    const q = state.recipeSearch.trim().toLowerCase();
    return recipes.filter(r => {
      const categoryMatch = state.recipeCategory === 'All' || (state.recipeCategory === 'Favourites' ? favourites.includes(r.id) : r.category === state.recipeCategory);
      const searchMatch = !q || [r.title, r.category, ...(r.ingredients || []), ...(r.tags || [])].join(' ').toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
  }

  function categoryIcon(category) {
    if (category === 'Smoothies') return 'water';
    if (category === 'Soups') return 'bowl';
    if (category === 'Fruit Salads') return 'sun';
    if (category === 'Air Fryer') return 'clock';
    if (category === 'Stir-Fries') return 'fork';
    return 'leaf';
  }

  function renderRecipes() {
    const list = filteredRecipes();
    main.innerHTML = `
      <section class="page-hero recipe-hero with-hero-art">
        <span class="eyebrow">FRESH START RECIPES</span>
        <h1>${recipes.length} vegetarian recipes with no tofu</h1>
        <p>Fruit salads, smoothies, soups, stir-fries, vegetable meals and air-fryer ideas — bright, simple and easy to use.</p>
        ${heroArtHTML(APP_ART.recipes, 'Recipe illustration', 'hero-art-float')}
      </section>
      ${state.foodPreferences?.planGenerated ? `<div class="saved-food-plan-card"><img src="${escapeHTML(APP_ART.recipes)}" alt="" /><div><span>YOUR DAY 0 FOOD PLAN</span><h2>Shopping list and meal suggestions</h2><p>Review the flexible plan created from the foods you selected.</p><button id="reviewFoodPlanBtn" class="secondary-button" type="button">Review my food plan</button></div></div>` : ''}
      <div class="recipe-toolbar">
        <label class="search-wrap">${icon('search', 20)}<input id="recipeSearch" type="search" value="${escapeHTML(state.recipeSearch)}" placeholder="Search recipe or ingredient" /></label>
        <div class="chip-row">${categories().map(cat => `<button class="filter-chip ${state.recipeCategory === cat ? 'active' : ''}" data-category="${escapeHTML(cat)}" type="button">${escapeHTML(cat)}</button>`).join('')}</div>
      </div>
      <div class="recipe-count"><span>${list.length} recipes</span><span>${favourites.length} saved</span></div>
      ${list.length ? `<div class="recipe-grid">${list.map(recipeCardHTML).join('')}</div>` : `<div class="empty-state">${icon('search', 34)}<h3>No recipes found</h3><p>Try a different ingredient or category.</p></div>`}`;

    document.getElementById('reviewFoodPlanBtn')?.addEventListener('click', openFoodPlanModal);
    const search = document.getElementById('recipeSearch');
    search.addEventListener('input', e => {
      state.recipeSearch = e.target.value;
      saveState();
      renderRecipes();
      const next = document.getElementById('recipeSearch');
      next.focus();
      next.setSelectionRange(next.value.length, next.value.length);
    });
    document.querySelectorAll('[data-category]').forEach(btn => btn.addEventListener('click', () => {
      state.recipeCategory = btn.dataset.category;
      saveState();
      renderRecipes();
    }));
    bindRecipeCards();
  }

  function recipeCardHTML(r) {
    const fav = favourites.includes(r.id);
    return `
      <article class="recipe-card" data-recipe-card="${escapeHTML(r.id)}">
        <button class="favourite-button ${fav ? 'active' : ''}" data-favourite="${escapeHTML(r.id)}" type="button" aria-label="${fav ? 'Remove from' : 'Add to'} favourites">${icon('heart', 19)}</button>
        <div class="recipe-visual ${escapeHTML(r.category.toLowerCase().replace(/[^a-z]+/g, '-'))}">
          <img src="${escapeHTML(categoryImage(r.category))}" alt="" loading="lazy" />
          <div class="recipe-visual-overlay"></div>
          <span class="recipe-visual-icon">${icon(categoryIcon(r.category), 24)}</span>
          <small>${escapeHTML(r.category)}</small>
        </div>
        <div class="recipe-body"><h3>${escapeHTML(r.title)}</h3><div class="recipe-meta"><span>${escapeHTML(r.time)}</span><span>Serves ${escapeHTML(r.serves)}</span></div></div>
      </article>`;
  }

  function bindRecipeCards() {
    document.querySelectorAll('[data-recipe-card]').forEach(card => card.addEventListener('click', e => {
      if (!e.target.closest('[data-favourite]')) openRecipe(card.dataset.recipeCard);
    }));
    document.querySelectorAll('[data-favourite]').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavourite(btn.dataset.favourite);
    }));
  }

  function toggleFavourite(id) {
    favourites = favourites.includes(id) ? favourites.filter(x => x !== id) : [...favourites, id];
    localStorage.setItem(FAV_KEY, JSON.stringify(favourites));
    if (state.view === 'recipes') renderRecipes();
    else if (state.view === 'today') renderToday();
  }

  function openRecipe(id) {
    const r = recipes.find(x => x.id === id);
    if (!r) return;
    const fav = favourites.includes(r.id);
    modalRoot.innerHTML = `
      <div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="${escapeHTML(r.title)}">
        <div class="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-top"><div><span class="eyebrow">${escapeHTML(r.category)}</span><h2>${escapeHTML(r.title)}</h2></div><button class="close-button" data-close-modal type="button">${icon('close', 20)}</button></div>
          <div class="recipe-detail-banner"><img class="detail-banner-art" src="${escapeHTML(categoryImage(r.category))}" alt="" loading="lazy" /><div><strong>${escapeHTML(r.time)}</strong><small>Serves ${escapeHTML(r.serves)}</small></div></div>
          <button id="modalFavourite" class="secondary-button" type="button">${icon('heart', 18)} ${fav ? 'Saved to favourites' : 'Save to favourites'}</button>
          <section class="detail-section"><h3>Ingredients</h3><ul>${r.ingredients.map(i => `<li>${escapeHTML(i)}</li>`).join('')}</ul></section>
          <section class="detail-section"><h3>Method</h3><ol>${r.method.map(m => `<li>${escapeHTML(m)}</li>`).join('')}</ol></section>
          <div class="notice">Low-fat plain yoghurt is optional where listed. The recipe collection is vegetarian and contains no tofu.</div>
        </div>
      </div>`;

    const close = () => { modalRoot.innerHTML = ''; };
    modalRoot.querySelector('[data-close-modal]').addEventListener('click', close);
    modalRoot.querySelector('.modal-backdrop').addEventListener('click', e => { if (e.target.classList.contains('modal-backdrop')) close(); });
    document.getElementById('modalFavourite').addEventListener('click', () => {
      favourites = favourites.includes(r.id) ? favourites.filter(x => x !== r.id) : [...favourites, r.id];
      localStorage.setItem(FAV_KEY, JSON.stringify(favourites));
      close();
      if (state.view === 'recipes') renderRecipes();
      else if (state.view === 'today') renderToday();
    });
  }

  function openFoodPlanModal() {
    if (!state.foodPreferences?.planGenerated) return;
    const suggestions = buildFoodSuggestions();
    modalRoot.innerHTML = `<div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="My suggested food plan"><div class="modal-sheet food-plan-modal"><div class="modal-handle"></div><div class="modal-top"><div><span class="eyebrow">YOUR DAY 0 FOOD PLAN</span><h2>Shopping list and meal suggestions</h2><p>This is only a suggestion. Swap meals, repeat favourites and adjust portions to suit you.</p></div><button class="close-button" data-close-modal type="button">${icon('close', 20)}</button></div>${foodSuggestionsHTML()}<button id="editFoodChoicesBtn" class="secondary-button" type="button">Edit my food choices</button></div></div>`;
    const close = () => { modalRoot.innerHTML = ''; };
    modalRoot.querySelector('[data-close-modal]').addEventListener('click', close);
    modalRoot.querySelector('.modal-backdrop').addEventListener('click', event => { if (event.target.classList.contains('modal-backdrop')) close(); });
    modalRoot.querySelectorAll('[data-setup-recipe]').forEach(button => button.addEventListener('click', () => openRecipe(button.dataset.setupRecipe)));
    bindShoppingChecks();
    modalRoot.querySelectorAll('[data-recipe-card]').forEach(card => card.addEventListener('click', event => { if (!event.target.closest('[data-favourite]')) openRecipe(card.dataset.recipeCard); }));
    document.getElementById('editFoodChoicesBtn').addEventListener('click', () => {
      close();
      state.setupComplete = false;
      state.setupStep = 3;
      saveState();
      render();
      requestAnimationFrame(() => document.getElementById('foodSetupCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    });
  }

  function average(values) {
    const nums = values.map(v => safeNumber(v, NaN)).filter(Number.isFinite).filter(v => v > 0);
    return nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1) : '—';
  }

  function renderProgress() {
    const entries = Array.from({ length: 7 }, (_, i) => dayState(i + 1));
    const pct = weekCompletion();
    const avgWater = average(entries.map(d => d.water));
    const avgSleep = average(entries.map(d => d.sleep));
    const avgPhoneMinutesRaw = entries.map(d => d.phoneTotalMinutes !== '' ? safeNumber(d.phoneTotalMinutes) : (d.phone !== '' ? Math.round(safeNumber(d.phone) * 60) : NaN)).filter(Number.isFinite).filter(v => v >= 0);
    const avgPhoneMinutes = avgPhoneMinutesRaw.length ? Math.round(avgPhoneMinutesRaw.reduce((a,b)=>a+b,0)/avgPhoneMinutesRaw.length) : null;
    const avgMove = average(entries.map(d => d.movementMinutes));
    const weightChange = state.profile.startWeight && state.profile.finishWeight ? (safeNumber(state.profile.finishWeight) - safeNumber(state.profile.startWeight)).toFixed(1) : null;

    main.innerHTML = `
      <div class="progress-screen">
      <section class="page-hero progress-hero with-hero-art">
        <span class="eyebrow">YOUR PROGRESS</span>
        <h1>Measure the whole reset, not only weight</h1>
        <p>Review consistency across food, phone boundaries, sleep and daily movement.</p>
        ${heroArtHTML(APP_ART.progress, 'Progress illustration', 'hero-art-float')}
      </section>
      <div class="progress-content-surface">
      <div class="progress-summary">
        <div class="progress-orb large" style="--pct:${pct}"><div><strong>${pct}%</strong><span>week</span></div></div>
        <div><span>FRESH START COMPLETION</span><h2>${pct < 35 ? 'You are getting started' : pct < 75 ? 'Your routine is taking shape' : 'You are finishing strongly'}</h2><p>Each day combines four actions and a short check-in.</p></div>
      </div>
      <div class="metric-grid progress-metrics">
        ${metricHTML('walk', 'Avg movement', avgMove === '—' ? '—' : `${avgMove} min`)}
        ${metricHTML('moon', 'Avg sleep', avgSleep === '—' ? '—' : `${avgSleep} h`)}
        ${metricHTML('phone', 'Avg phone', avgPhoneMinutes === null ? '—' : formatPhoneDuration(avgPhoneMinutes))}
        ${metricHTML('water', 'Avg water', avgWater === '—' ? '—' : `${avgWater} cups`)}
      </div>
      <div class="section-heading"><div><span>DAY BY DAY</span><h2>Your consistency</h2></div></div>
      <div class="progress-days">${PROGRAM.map((plan, i) => `<div><span>Day ${i + 1}</span><div><i style="width:${completionPct(i + 1)}%"></i></div><strong>${completionPct(i + 1)}%</strong></div>`).join('')}</div>
      <div class="section-heading"><div><span>FINISH CHECK-IN</span><h2>Complete this after Day 7</h2></div></div>
      <div class="tracking-card">
        <div class="tracking-grid">
          <div class="field"><label for="finishWeight">Finishing weight <span>(optional)</span></label><input id="finishWeight" type="number" step="0.1" value="${escapeHTML(state.profile.finishWeight)}" placeholder="kg" ${currentDay() < 7 ? 'disabled' : ''} /></div>
          <div class="field"><label for="finishEnergy">Finishing energy</label><select id="finishEnergy" ${currentDay() < 7 ? 'disabled' : ''}><option value="">Choose</option>${[1,2,3,4,5].map(n => `<option value="${n}" ${String(state.profile.finishEnergy) === String(n) ? 'selected' : ''}>${n} / 5</option>`).join('')}</select></div>
          <div class="field full"><label for="finishSleep">Finishing sleep quality</label><select id="finishSleep" ${currentDay() < 7 ? 'disabled' : ''}><option value="">Choose</option>${[1,2,3,4,5].map(n => `<option value="${n}" ${String(state.profile.finishSleep) === String(n) ? 'selected' : ''}>${n} / 5</option>`).join('')}</select></div>
        </div>
        ${weightChange !== null ? `<div class="result-strip"><span>Weight change</span><strong>${weightChange} kg</strong></div>` : ''}
        <button id="saveFinish" class="primary-button" type="button" ${currentDay() < 7 ? 'disabled' : ''}>Save finish check-in</button>
      </div>
      </div>
      </div>`;

    document.getElementById('saveFinish').addEventListener('click', () => {
      state.profile.finishWeight = document.getElementById('finishWeight').value;
      state.profile.finishEnergy = document.getElementById('finishEnergy').value;
      state.profile.finishSleep = document.getElementById('finishSleep').value;
      saveState();
      showToast('Finish check-in saved');
      renderProgress();
    });
  }

  function renderSettings() {
    previousView = previousView || 'protocols';
    state.view = 'settings';
    saveState();
    main.innerHTML = `
      <section class="page-hero compact"><span class="eyebrow">SETTINGS</span><h1>Your Fresh Start details</h1><p>Update the anchors used to guide your seven days.</p></section>
      <div class="tracking-card settings-card">
        <div class="tracking-grid">
          <div class="field"><label for="setName">Name</label><input id="setName" value="${escapeHTML(state.profile.name)}" /></div>
          <div class="field"><label for="setDate">Start date</label><div class="input-shell"><input id="setDate" type="date" value="${escapeHTML(state.profile.startDate)}" /></div></div>
          <div class="field"><label for="setBedtime">Target bedtime</label><div class="input-shell"><input id="setBedtime" type="time" value="${escapeHTML(state.profile.bedtime)}" /></div></div>
          <div class="field"><label for="setWake">Target wake time</label><div class="input-shell"><input id="setWake" type="time" value="${escapeHTML(state.profile.wakeTime)}" /></div></div>
          <div class="field full"><label for="setWeight">Starting weight <span>(optional)</span></label><input id="setWeight" type="number" step="0.1" value="${escapeHTML(state.profile.startWeight)}" /></div>
        </div>
        <button id="saveSettings" class="primary-button" type="button">Save settings</button>
        <button id="editFoodPlan" class="secondary-button" type="button">Edit food choices and rebuild plan</button>
        <button id="resetApp" class="danger-button" type="button">Reset all app data</button>
        <div class="app-version">Detox v17 · Progress background final</div>
      </div>`;

    document.getElementById('saveSettings').addEventListener('click', () => {
      state.profile.name = document.getElementById('setName').value.trim();
      state.profile.startDate = document.getElementById('setDate').value || todayISO();
      state.profile.bedtime = document.getElementById('setBedtime').value || state.profile.bedtime;
      state.profile.wakeTime = document.getElementById('setWake').value || state.profile.wakeTime;
      state.profile.startWeight = document.getElementById('setWeight').value;
      saveState();
      showToast('Settings saved');
    });
    document.getElementById('editFoodPlan').addEventListener('click', () => {
      state.setupComplete = false;
      state.setupStep = 3;
      saveState();
      render();
      requestAnimationFrame(() => document.getElementById('foodSetupCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    });
    document.getElementById('resetApp').addEventListener('click', () => {
      openConfirm('Reset all Fresh Start data?', 'This removes daily tracking, journal notes and your profile from this device.', () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(LEGACY_KEY);
        localStorage.removeItem(FAV_KEY);
        state = clone(defaultState);
        favourites = [];
        render();
      });
    });
  }

  function openConfirm(title, text, onConfirm) {
    modalRoot.innerHTML = `
      <div class="modal-backdrop"><div class="modal-sheet confirm-sheet"><div class="modal-handle"></div><div class="modal-top"><div><h2>${escapeHTML(title)}</h2><p>${escapeHTML(text)}</p></div><button class="close-button" data-close-modal type="button">${icon('close', 20)}</button></div><div class="button-row"><button id="confirmCancel" class="secondary-button" type="button">Cancel</button><button id="confirmYes" class="danger-solid" type="button">Reset data</button></div></div></div>`;
    const close = () => { modalRoot.innerHTML = ''; };
    modalRoot.querySelector('[data-close-modal]').addEventListener('click', close);
    document.getElementById('confirmCancel').addEventListener('click', close);
    document.getElementById('confirmYes').addEventListener('click', () => { close(); onConfirm(); });
  }

  function showToast(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }

  bottomNav.addEventListener('click', e => {
    const btn = e.target.closest('[data-view]');
    if (!btn) return;
    setView(btn.dataset.view);
  });

  backBtn.addEventListener('click', () => {
    if (modalRoot.innerHTML) {
      modalRoot.innerHTML = '';
      return;
    }
    const fallback = state.view === 'day-detail' ? 'days' : 'protocols';
    setView(previousView || fallback, false);
  });

  settingsBtn.addEventListener('click', () => setView('settings'));

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }

  render();
})();
