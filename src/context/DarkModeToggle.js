import React from 'react';
import { useTheme } from './ThemeContext'; 
import styles from '../styles/MyApp.module.css';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <input
        type="checkbox"
        id="dark-mode"
        className={styles.toggleCheckbox}
        onChange={toggleTheme}
        checked={isDarkMode}
      />
      <label className={styles.toggleLabel} htmlFor="dark-mode"></label>
      <div
        className={`${styles.toggleBackground} ${
          isDarkMode ? styles.darkBackground : ''
        }`}
      ></div>
    </>
  );
};

export default DarkModeToggle;
