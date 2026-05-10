import "./style.css";
import "./components/code-input";
import "./components/code-output";
import "./components/code-controller";
import "./components/app-sidebar";
import "./components/app-header";

const $root = document.querySelector<HTMLElement>("#app");

if ($root) {
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
