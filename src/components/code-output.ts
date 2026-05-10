class CodeOutput extends HTMLElement {
  private _output: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        output {
          display: block;
          width: 100%;
          height: 100%;
          background: var(--color-panel2);
          color: var(--color-text);
          font-family: monospace;
          padding: 1rem;
          overflow: auto;
          box-sizing: border-box;
          white-space: pre-wrap;
        }
      </style>
      <output></output>
    `;
    this._output = this.shadowRoot!.querySelector("output")!;
  }

  get value(): string {
    return this._output.textContent || "";
  }

  set value(v: string) {
    this._output.textContent = v;
  }
}

customElements.define("code-output", CodeOutput);
