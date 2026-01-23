export type ThemeMode = "light" | "dark" | "system";

const THEME_KEY = "theme";
const RESOLVED_THEME_KEY = "theme_resolved";
const themeListeners = new Set<() => void>();

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "dark" || stored === "light" || stored === "system"
    ? stored
    : "system";
};

export const getServerTheme = (): ThemeMode => "system";

export const subscribeTheme = (listener: () => void) => {
  themeListeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_KEY) {
      listener();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    themeListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
};

export const setStoredTheme = (value: ThemeMode) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_KEY, value);
  document.cookie = `theme=${value}; path=/; max-age=31536000`;
  themeListeners.forEach((listener) => listener());
};

export const getThemeKey = () => THEME_KEY;

export const getResolvedThemeKey = () => RESOLVED_THEME_KEY;
