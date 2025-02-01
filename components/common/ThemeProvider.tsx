"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.style.setProperty(
        "--background-color",
        "#191919"
      );
      document.documentElement.style.setProperty("--text-color", "white");
      document.documentElement.style.setProperty(
        "--inkfilter-background-color",
        "#333"
      );
      document.documentElement.style.setProperty(
        "--inkfilter-blend-mode",
        "screen"
      );
    } else {
      document.documentElement.style.setProperty(
        "--background-color",
        "#f3f3f3"
      );
      document.documentElement.style.setProperty("--text-color", "black");
      document.documentElement.style.setProperty(
        "--inkfilter-background-color",
        "#f3f3f3"
      );
      document.documentElement.style.setProperty(
        "--inkfilter-blend-mode",
        "multiply"
      );
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
