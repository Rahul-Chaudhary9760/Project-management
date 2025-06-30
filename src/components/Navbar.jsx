import { useTheme } from '@/theme/Themeprovider';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <>
          <Sun className="w-5 h-5 text-yellow-400" />
          <span className="text-sm text-gray-800 dark:text-gray-200">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5 text-gray-800" />
          <span className="text-sm text-gray-800 dark:text-gray-200">Dark Mode</span>
        </>
      )}
    </button>
  );
}
