import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from "styled-components";

/* ---------------- THEME CONTEXT ---------------- */
const ThemeContext = createContext();

/* ---------------- COLOR PALETTES ---------------- */
const lightTheme = {
  mode: "light",
  background: "#F4F6F8",
  card: "#FFFFFF",
  text: "#2E2E2E",
  border: "#DDDDDD",
  primary: "#008080",
};

const darkTheme = {
  mode: "dark",
  background: "#121212",
  card: "#1E1E1E",
  text: "#EAEAEA",
  border: "#2C2C2C",
  primary: "#00B3B3",
};

/* ---------------- GLOBAL STYLES ---------------- */
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: Inter, system-ui, sans-serif;
    transition: background 0.25s ease, color 0.25s ease;
  }
`;

/* ---------------- PROVIDER ---------------- */
export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setMode(saved);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */
export function useTheme() {
  return useContext(ThemeContext);
}
