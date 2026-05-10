export interface CodeTab {
  id: string;
  name: string;
  code: string;
}

const KEY_TABS = "jsrunner-tabs";
const KEY_ACTIVE = "jsrunner-active-tab";

function generateId(): string {
  return `tab-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getDefaultTabs(): CodeTab[] {
  return [{ id: generateId(), name: "Snippet 1", code: "" }];
}

export function getTabs(): CodeTab[] {
  try {
    const raw = localStorage.getItem(KEY_TABS);
    if (!raw) return getDefaultTabs();
    const parsed = JSON.parse(raw) as CodeTab[];
    return parsed.length ? parsed : getDefaultTabs();
  } catch {
    return getDefaultTabs();
  }
}

export function saveTabs(tabs: CodeTab[]): void {
  localStorage.setItem(KEY_TABS, JSON.stringify(tabs));
}

export function getActiveTabId(): string | null {
  return localStorage.getItem(KEY_ACTIVE);
}

export function setActiveTabId(id: string): void {
  localStorage.setItem(KEY_ACTIVE, id);
}

export function addTab(name: string): CodeTab {
  const tabs = getTabs();
  const newTab: CodeTab = { id: generateId(), name, code: "" };
  tabs.push(newTab);
  saveTabs(tabs);
  setActiveTabId(newTab.id);
  return newTab;
}

export function removeTab(id: string): CodeTab[] {
  let tabs = getTabs();
  if (tabs.length <= 1) return tabs;
  tabs = tabs.filter((t) => t.id !== id);
  saveTabs(tabs);
  if (getActiveTabId() === id) {
    setActiveTabId(tabs[tabs.length - 1].id);
  }
  return tabs;
}

export function updateTabCode(id: string, code: string): CodeTab[] {
  const tabs = getTabs();
  const tab = tabs.find((t) => t.id === id);
  if (tab) tab.code = code;
  saveTabs(tabs);
  return tabs;
}

export function updateTabName(id: string, name: string): CodeTab[] {
  const tabs = getTabs();
  const tab = tabs.find((t) => t.id === id);
  if (tab) tab.name = name;
  saveTabs(tabs);
  return tabs;
}
