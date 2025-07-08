// Environment configuration
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  GEMINI_API_KEY: (import.meta as any).env.VITE_GEMINI_API_KEY || '',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const;

// API endpoints and configuration
export const API_CONFIG = {
  GEMINI_MODEL: 'gemini-2.5-flash',
  MAX_RETRIES: 3,
  TIMEOUT: 30000,
  RATE_LIMIT: 100, // requests per minute
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: false,
  ENABLE_DARK_MODE: false,
  ENABLE_BULK_EXPORT: false,
  ENABLE_CUSTOM_SCORING: false,
} as const;

// Application configuration
export const APP_CONFIG = {
  NAME: 'AI Resume Shortlister',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-powered resume analysis and shortlisting tool',
  AUTHOR: 'AI Resume Shortlister Team',
  REPOSITORY: 'https://github.com/your-repo/ai-resume-shortlister',
  SUPPORT_EMAIL: 'support@example.com',
} as const;

// Validation helper
export const validateConfig = (): void => {
  if (!ENV.GEMINI_API_KEY) {
    throw new Error(
      'VITE_GEMINI_API_KEY is not set. Please check your environment variables.'
    );
  }
  
  if (ENV.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error(
      'Please replace the placeholder GEMINI_API_KEY with your actual API key.'
    );
  }
}; 