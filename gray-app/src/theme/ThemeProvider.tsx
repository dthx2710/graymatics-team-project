import { useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';

type ThemeProp = {
  theme: string;
  children: any | undefined;
}

export const ThemeContext = createContext((_themeName: string): void => {});

const ThemeProviderWrapper = (props: ThemeProp) => {
  const [themeName, _setThemeName] = useState(props.theme);

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || props.theme;
    _setThemeName(curThemeName);
  }, [props.theme]);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
