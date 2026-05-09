import { saveCode, loadCode } from "../utils/storage";

class CodeInput extends HTMLElement {
  private _textarea: HTMLTextAreaElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        textarea {
          width: 100%;
          height: 100%;
          color: var(--color-text, #cdd6f4);
          background: var(--color-surface, #181825);
          font-family: monospace;
          padding: 1rem;
          resize: none;
          outline: none;
          box-sizing: border-box;
          border: 0;
        }
      </style>
      <textarea></textarea>
    `;
    this._textarea = this.shadowRoot!.querySelector("textarea")!;
    this._textarea.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        this.dispatchEvent(new CustomEvent("run"));
      }
    });
    this._textarea.addEventListener("input", () => {
      saveCode(this._textarea.value);
    });
  }

  connectedCallback() {
    this._textarea.value = loadCode();
  }

  get value(): string {
    return this._textarea.value;
  }

  set value(v: string) {
    this._textarea.value = v;
  }
}

customElements.define("code-input", CodeInput);
