class CodeOutput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        output {
          display: block;
          width: 100%;
          height: 100%;
          background: var(--color-elevated, #2a2a3c);
          color: var(--color-text, #cdd6f4);
          font-family: monospace;
          padding: 1rem;
          overflow: auto;
          box-sizing: border-box;
        }
      </style>
      <output></output>
    `;
  }
}

customElements.define("code-output", CodeOutput);

export {};
