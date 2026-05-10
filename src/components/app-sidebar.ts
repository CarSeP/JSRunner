class AppSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        aside {
          width: 0;
          overflow: hidden;
          background: #1a1a2e;
          color: white;
          padding: 0;
          position: fixed;
          height: 100%;
        }
        aside.open {
          width: 280px;
          padding: 16px;
        }
        @media (max-width: 767px) {
          aside.open {
            width: 100%;
          }
      </style>
      <aside>
      </aside>
    `;

    document
      .querySelector("app-header")
      ?.addEventListener("sidebar-toggle", () => {
        this.toggle();
      });
  }

  toggle() {
    this.querySelector("aside")?.classList.toggle("open");
  }
}

customElements.define("app-sidebar", AppSidebar);
