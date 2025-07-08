import { FILE_CONFIG, UI_CONFIG } from '../constants';

// File utilities
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidFileType = (file: File): boolean => {
  return FILE_CONFIG.ACCEPTED_FILE_TYPES.includes(file.type as any);
};

export const isValidFileSize = (file: File): boolean => {
  return file.size <= FILE_CONFIG.MAX_FILE_SIZE;
};

// Text utilities
export const getWordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const getEstimatedReadTime = (text: string): number => {
  const wordCount = getWordCount(text);
  return Math.ceil(wordCount / UI_CONFIG.WORDS_PER_MINUTE);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Score utilities
export const getScoreColor = (score: number): string => {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-blue-600';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-500';
};

export const getScoreGradient = (score: number): string => {
  if (score >= 85) return 'from-emerald-500 to-green-600';
  if (score >= 70) return 'from-blue-500 to-purple-600';
  if (score >= 50) return 'from-yellow-500 to-orange-600';
  return 'from-red-500 to-red-600';
};

export const getScoreBackground = (score: number): string => {
  if (score >= 85) return 'bg-emerald-50 border-emerald-200';
  if (score >= 70) return 'bg-blue-50 border-blue-200';
  if (score >= 50) return 'bg-yellow-50 border-yellow-200';
  return 'bg-red-50 border-red-200';
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateApiKey = (apiKey: string): boolean => {
  return apiKey.trim().length > 0 && apiKey !== 'your_gemini_api_key_here';
};

// Array utilities
export const groupByScore = <T extends { match_score: number }>(
  items: T[]
): { excellent: T[]; good: T[]; fair: T[]; poor: T[] } => {
  return items.reduce(
    (acc, item) => {
      if (item.match_score >= 85) acc.excellent.push(item);
      else if (item.match_score >= 70) acc.good.push(item);
      else if (item.match_score >= 50) acc.fair.push(item);
      else acc.poor.push(item);
      return acc;
    },
    { excellent: [], good: [], fair: [], poor: [] } as {
      excellent: T[];
      good: T[];
      fair: T[];
      poor: T[];
    }
  );
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Local storage utilities
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently fail if localStorage is not available
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail if localStorage is not available
    }
  },
}; 