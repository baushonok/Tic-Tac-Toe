import { createContext, MouseEvent } from 'react';

import { THEMES } from './constants';

export const DEFAULT_THEME = THEMES[0];

export interface IThemeContext {
  theme: string;
  toggleTheme: (event: MouseEvent) => void;
}
export const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  toggleTheme: (event: MouseEvent) => {},
} as IThemeContext);
