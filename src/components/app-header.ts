class AppHeader extends HTMLElement {
  #sidebarOpen = false;

  connectedCallback() {
    this.innerHTML = `
      <style>
        header {
          display: flex;
          align-items: center;
          padding-inline: 4px;
          padding-block: 2px;
        }
        button {
          color: white;
          border: none;
          background: none;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        button:focus {
          outline: none;
        }
        svg {
          width: 24px;
        }
        .x-icon {
          display: none;
        }
        .x-icon.visible {
          display: block;
        }
        .hamburger-icon.hidden {
          display: none;
        }
      </style>
      <header>
        <button id="hamburger">
          <svg class="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg class="x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </header>
    `;

    this.querySelector("#hamburger")?.addEventListener("click", () => this.#toggleSidebar());
  }

  #toggleSidebar() {
    this.#sidebarOpen = !this.#sidebarOpen;
    this.querySelector(".hamburger-icon")?.classList.toggle("hidden", this.#sidebarOpen);
    this.querySelector(".x-icon")?.classList.toggle("visible", this.#sidebarOpen);
    this.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: { open: this.#sidebarOpen } }));
  }
}

customElements.define("app-header", AppHeader);
