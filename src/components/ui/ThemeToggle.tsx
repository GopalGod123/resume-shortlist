import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-start w-12 h-6 
        bg-gray-300 dark:bg-gray-600 rounded-full 
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        hover:bg-gray-400 dark:hover:bg-gray-500
        p-0.5
        ${className || ''}
      `}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Toggle Circle */}
      <span
        className={`
          inline-block w-5 h-5 bg-white dark:bg-gray-200 rounded-full 
          transform transition-all duration-300 ease-in-out
          shadow-lg flex items-center justify-center
          ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}
        `}
      >
        {isDarkMode ? (
          <Moon className="w-3 h-3 text-gray-800" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle; 