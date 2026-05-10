import { getTabs, getActiveTabId, updateTabCode } from "../utils/storage";

class CodeInput extends HTMLElement {
  private _textarea: HTMLTextAreaElement;
  private _activeTabId: string | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        textarea {
          width: 100%;
          height: 100%;
          color: var(--color-text);
          background: var(--color-panel1);
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
      if (this._activeTabId) {
        updateTabCode(this._activeTabId, this._textarea.value);
      }
    });
  }

  connectedCallback() {
    this.#loadActiveTab();
    document.addEventListener("tab-switch-global", this.#onTabSwitch);
  }

  disconnectedCallback() {
    document.removeEventListener("tab-switch-global", this.#onTabSwitch);
  }

  #onTabSwitch = () => {
    this.#loadActiveTab();
  };

  #loadActiveTab() {
    this._activeTabId = getActiveTabId();
    const tabs = getTabs();
    const active = tabs.find((t) => t.id === this._activeTabId);
    this._textarea.value = active?.code ?? "";
  }

  get value(): string {
    return this._textarea.value;
  }

  set value(v: string) {
    this._textarea.value = v;
  }
}

customElements.define("code-input", CodeInput);
