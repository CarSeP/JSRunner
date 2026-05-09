import "./style.css";
import "./components/code-input";
import "./components/code-output";
import "./components/code-controller";

const $root = document.querySelector<HTMLElement>("#app");

if ($root) {
  $root.innerHTML = `
    <main>
      <code-controller>
        <code-input></code-input>
        <code-output></code-output>
      </code-controller>
    </main>
  `;
}
