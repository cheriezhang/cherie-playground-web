"use client";

import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface IThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}
export const ThemeContext = createContext<IThemeContext>(null!);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  // add data-theme to HTML
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // react 19+, no need to write provider
  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};
