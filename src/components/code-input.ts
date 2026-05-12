import { getActiveTabId, updateTabCode, getTabs } from "../utils/storage";
import * as monaco from "monaco-editor";

class CodeInput extends HTMLElement {
  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private _activeTabId: string | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.style.display = "block";
    this.style.width = "100%";
    this.style.height = "100%";

    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "100%";
    this.appendChild(container);

    this.editor = monaco.editor.create(container, {
      value: "",
      language: "typescript",
      theme: "vs-dark",
      automaticLayout: true,
      fontSize: 14,
      minimap: { enabled: true },
      scrollBeyondLastLine: true,
    });

    this.editor.onKeyDown((e) => {
      if (e.browserEvent.key === "Enter" && (e.browserEvent.ctrlKey || e.browserEvent.metaKey)) {
        this.dispatchEvent(new CustomEvent("run"));
      }
    });

    this.editor.onDidChangeModelContent(() => {
      if (this._activeTabId && this.editor) {
        updateTabCode(this._activeTabId, this.editor.getValue());
      }
      this.dispatchEvent(new Event("input"));
    });

    document.addEventListener("tab-switch-global", this.#onTabSwitch);
    this.#loadActiveTab();
  }

  disconnectedCallback() {
    document.removeEventListener("tab-switch-global", this.#onTabSwitch);
    this.editor?.dispose();
    this.editor = null;
  }

  #onTabSwitch = () => {
    this.#loadActiveTab();
  };

  #loadActiveTab() {
    this._activeTabId = getActiveTabId();
    const tabs = getTabs();
    const active = tabs.find((t) => t.id === this._activeTabId);
    if (this.editor) {
      this.editor.setValue(active?.code ?? "");
    }
  }

  get value(): string {
    return this.editor?.getValue() ?? "";
  }

  set value(v: string) {
    this.editor?.setValue(v);
  }
}

customElements.define("code-input", CodeInput);
