import "./style.css";
import "./theme.css";
import "./components/code-input";
import "./components/code-output";
import "./components/code-controller";
import "./components/sidebar-theme";
import "./components/app-sidebar";
import "./components/app-header";
import { loadTheme } from "./utils/theme";

const $root = document.querySelector<HTMLElement>("#app");
const theme = loadTheme();

if ($root) {
  $root.classList.add(theme);
  $root.innerHTML = `
    <app-header></app-header>
    <main>
      <app-sidebar></app-sidebar>
      <code-controller>
        <code-input></code-input>
        <code-output></code-output>
      </code-controller>
    </main>
  `;
}
