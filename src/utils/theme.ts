const THEME_KEY = "jsrunner-theme";
const DEFAULT_THEME = "rosepine";

export const THEMES = ["rosepine", "tokyo-night"];

export function loadTheme(): string {
  const theme = localStorage.getItem(THEME_KEY);
  if (!theme || !THEMES.includes(theme)) {
    saveTheme(DEFAULT_THEME);
    return DEFAULT_THEME;
  }
  return theme;
}

export function saveTheme(theme: string): void {
  localStorage.setItem(THEME_KEY, theme);
}
