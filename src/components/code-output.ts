class CodeOutput extends HTMLElement {
  private _output: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        div {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          background: var(--base);
          color: var(--text);
          font-family: monospace;
          overflow: auto;
          box-sizing: border-box;
          white-space: pre-wrap;
        }
        output {
          flex: 1;
          padding: 1rem;
        }
        header {
          background: var(--surface);
          padding: 4px 8px;
          color: var(--text);
          border-bottom: 1px solid var(--overlay);
          font-weight: 700;
        }
      </style>
      <div>
        <header>OUTPUT</header>
        <output></output>
      </div>
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
