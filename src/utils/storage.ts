const KEY = "jsrunner-code";

export function saveCode(code: string): void {
  localStorage.setItem(KEY, code);
}

export function loadCode(): string {
  return localStorage.getItem(KEY) ?? "";
}
