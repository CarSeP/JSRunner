import { runCode } from "../utils/run-code";
import { createSplit } from "../utils/split-panel";

class CodeController extends HTMLElement {
  connectedCallback() {
    this.style.display = "contents";

    const $input = this.querySelector<HTMLElement & { value: string }>(
      "code-input",
    );
    const $output = this.querySelector<HTMLElement & { value: string }>(
      "code-output",
    );

    if (!$input || !$output) return;

    createSplit([$input, $output]);

    let timer: ReturnType<typeof setTimeout>;
    $input.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        $output.value = await runCode($input.value);
      }, 1000);
    });

    const $header = document.querySelector("app-header");
    $header?.addEventListener("tab-switch", async () => {
      document.dispatchEvent(new Event("tab-switch-global"));
      clearTimeout(timer);
      $output.value = await runCode($input.value);
    });
  }
}

customElements.define("code-controller", CodeController);
