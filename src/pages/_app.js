import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/MyApp.module.css';
import { ThemeProvider } from '../context/ThemeContext'; 
import DarkModeToggle from '../context/DarkModeToggle';
import GlobalStyles from '../context/GlobalStyles';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider>
       <GlobalStyles />
      <div>
        <div className={styles.toggleWrapper}>
          <DarkModeToggle />
        </div>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
