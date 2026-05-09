class CodeTextarea extends HTMLElement {
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
  }
}

customElements.define("code-input", CodeTextarea);

export {};
