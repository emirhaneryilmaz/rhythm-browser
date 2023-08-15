import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const userTheme = localStorage.getItem('theme');
    if (userTheme) {
      setIsDarkMode(userTheme === 'dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light-mode' : 'dark-mode';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
  };

  const themeValues = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};
