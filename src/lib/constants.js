/**
 * App-wide constants and configuration
 * Centralizes colors, theme, and shared values
 */

// Theme colors (matching existing design)
export const COLORS = {
  navy: {
    900: '#0A0E1F', // Deep Space Blue
    800: '#111827',
    700: '#1F2937',
  },
  tech: {
    primary: '#00FF88',   // Matrix Green
    secondary: '#60A5FA', // Hologram Blue
    accent: '#FF6B35',    // Alert Orange
    danger: '#EF4444',    // Red
  },
};

// App configuration
export const APP_CONFIG = {
  name: 'Nutri-Tech',
  tagline: 'Smart Student Fuel',
  dailyBudgetDefault: 1000, // ₦1,000 default budget
};

// Meal times
export const MEAL_TIMES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
};

// Onboarding steps
export const ONBOARDING_STEPS = {
  BASIC_INFO: 1,
  HEALTH_GOALS: 2,
  DIET_ASSESSMENT: 3,
  BUDGET_CONSTRAINTS: 4,
  SYMPTOMS: 5,
  TOTAL: 5,
};

// Navigation routes
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  MEAL_PLAN: '/meal-plan',
  TRACKING: '/tracking',
  LEARN: '/learn',
  PROFILE: '/profile',
  FOODS: '/foods',
};

// Universities list
export const UNIVERSITIES = [
  { value: 'UI', label: 'University of Ibadan (UI)' },
  { value: 'UNILAG', label: 'University of Lagos (UNILAG)' },
  { value: 'OAU', label: 'Obafemi Awolowo University (OAU)' },
  { value: 'ABU', label: 'Ahmadu Bello University (ABU)' },
  { value: 'UNIBEN', label: 'University of Benin (UNIBEN)' },
  { value: 'OTHER', label: 'Other' },
];

// Health goals
export const HEALTH_GOALS = [
  { value: 'energy', label: 'Boost Energy ⚡' },
  { value: 'weight_loss', label: 'Weight Management ⚖️' },
  { value: 'performance', label: 'Athletic Performance 💪' },
  { value: 'focus', label: 'Improve Focus 🧠' },
];

// Activity levels
export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary (Study/Desk)', icon: '🪑' },
  { value: 'light', label: 'Light (Walking to class)', icon: '🚶' },
  { value: 'active', label: 'Active (Sports/Gym)', icon: '🏃' },
];

// Error messages
export const ERROR_MESSAGES = {
  AUTH_FAILED: 'Authentication failed. Please try again.',
  NETWORK_ERROR: 'Network error. Check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  WEAK_PASSWORD: 'Password must be at least 6 characters.',
  EMAIL_IN_USE: 'Email already in use.',
  GENERATION_FAILED: 'Failed to generate meal plan. Please try again.',
};
