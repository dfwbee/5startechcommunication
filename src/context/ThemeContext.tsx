import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('startech_theme') as ThemeMode | null;
      if (saved && (saved === 'default' || saved === 'dark' || saved === 'light')) {
        return saved;
      }
    } catch {
      // LocalStorage fallback
    }
    return 'light';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('startech_theme', newTheme);
    } catch {
      // ignore
    }
  };

  const cycleTheme = () => {
    if (theme === 'default') setTheme('dark');
    else if (theme === 'dark') setTheme('light');
    else setTheme('default');
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    // Apply styling classes to body based on theme
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    } else if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
      document.body.style.backgroundColor = '#030712';
      document.body.style.color = '#F9FAFB';
    } else {
      // Default: Technical Charcoal / Navy
      root.classList.remove('light', 'dark');
      document.body.style.backgroundColor = '#0B111E';
      document.body.style.color = '#F8FAFC';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
