import "./style.css";
import "./components/code-input";
import "./components/code-output";

const $root = document.querySelector<HTMLElement>("#app");

if ($root) {
  $root.innerHTML = `
    <main>
      <code-input/></code-input>
      <code-output></code-output>
    </div>
`;
}
