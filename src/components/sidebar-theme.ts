import { THEMES, loadTheme, saveTheme } from "../utils/theme";

class SidebarTheme extends HTMLElement {
  connectedCallback() {
    const currentTheme = loadTheme();
    const themeOptions = THEMES.map((t) => `<option value="${t}" ${t === currentTheme ? "selected" : ""}>${t}</option>`).join("");

    this.innerHTML = `
      <style>
        .theme-selector {
          margin-top: 16px;
        }
        .theme-selector label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 600;
        }
        .theme-selector select {
          width: 100%;
          padding: 8px;
          border-radius: 6px;
          border: 1px solid var(--color-border, #333);
          background: var(--color-input, #1e1e2e);
          color: var(--color-text);
          font-size: 14px;
          cursor: pointer;
        }
      </style>
      <div class="theme-selector">
        <label for="theme-select">Theme</label>
        <select id="theme-select">${themeOptions}</select>
      </div>
    `;

    this.querySelector<HTMLSelectElement>("#theme-select")?.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLSelectElement;
      const theme = target.value;
      saveTheme(theme);
      const $root = document.querySelector<HTMLElement>("#app");
      if ($root) {
        THEMES.forEach((t) => $root.classList.remove(t));
        $root.classList.add(theme);
      }
    });
  }
}

customElements.define("sidebar-theme", SidebarTheme);
