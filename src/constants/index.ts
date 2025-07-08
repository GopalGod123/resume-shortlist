// API Configuration
export const API_CONFIG = {
  GEMINI_MODEL: 'gemini-2.5-flash',
  MAX_RETRIES: 3,
  TIMEOUT: 30000,
} as const;

// File Upload Configuration
export const FILE_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_FILE_TYPES: ['application/pdf'],
  MAX_FILES: 50,
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  WORDS_PER_MINUTE: 200,
} as const;

// Scoring Configuration
export const SCORING_CONFIG = {
  EXCELLENT_THRESHOLD: 85,
  GOOD_THRESHOLD: 70,
  FAIR_THRESHOLD: 50,
  MIN_SCORE: 0,
  MAX_SCORE: 100,
} as const;

// Application Info
export const APP_INFO = {
  NAME: 'AI Resume Shortlister',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-powered resume analysis and shortlisting tool',
  AUTHOR: 'AI Resume Shortlister Team',
} as const;

// External Links
export const EXTERNAL_LINKS = {
  GEMINI_API_KEY: 'https://makersuite.google.com/app/apikey',
  DOCUMENTATION: '#',
  SUPPORT: '#',
  GITHUB: '#',
} as const; 