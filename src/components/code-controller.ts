import { runCode } from "../utils/run-code";

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

    let timer: ReturnType<typeof setTimeout>;
    $input.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        $output.value = await runCode($input.value);
      }, 1000);
    });
  }
}

customElements.define("code-controller", CodeController);
