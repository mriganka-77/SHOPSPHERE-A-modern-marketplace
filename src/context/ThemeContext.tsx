import { useEffect, useState, type ReactNode } from "react";

const KEY = "shopsphere_theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored === "dark") document.documentElement.classList.add("dark");
  }, []);
  return <>{children}</>;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(KEY, next ? "dark" : "light");
    setIsDark(next);
  };
  return { isDark, toggle };
}
