import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  isDark: true,
  setIsDark: () => {},
});

export const useTheme = () => useContext(ThemeContext);
