"use client";

import { createContext, useEffect, useState } from "react";

type Language = "en" | "zh";

interface ILanguageContext {
  theme: Language;
  setTheme: React.Dispatch<React.SetStateAction<Language>>;
}
export const LanguageContext = createContext<ILanguageContext>(null!);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Language>("zh");
  // add data-theme to HTML
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // react 19+, no need to write provider
  return (
    <LanguageContext value={{ theme, setTheme }}>{children}</LanguageContext>
  );
};
