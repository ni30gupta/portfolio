// Step 1: ThemeProvider with React Context (similar to React, but "use client" needed)
"use client"; // ← NEXT.JS: Makes this a Client Component (can use hooks/state)

import { createContext, useContext, useEffect, useState } from "react";

// Create context (same as React)
const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

// Custom hook to use theme (same as React)
export function useTheme() {
  return useContext(ThemeContext);
}

// Provider component
export default function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme on mount (runs in browser)
  useEffect(() => {
    // Check localStorage first
    const stored = localStorage.getItem("theme");
    
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // No preference saved - check system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(systemPrefersDark);
      if (systemPrefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle function
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Update DOM class
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
