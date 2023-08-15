import React from 'react';
import { useTheme } from './ThemeContext';

const GlobalStyles = () => {
    const { isDarkMode } = useTheme();

    return (
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
          background: ${isDarkMode ? '#121212' : 'beige'}; /* Dark mode'a göre arka plan rengi */
          color: ${isDarkMode ? 'purple' : 'black'}; /* Dark mode'a göre yazı rengi */
        }


        * {
          box-sizing: border-box;
        }
      `}</style>
    );
  };

  export default GlobalStyles;
