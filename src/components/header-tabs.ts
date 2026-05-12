import {
  getTabs,
  getActiveTabId,
  addTab,
  removeTab,
  updateTabName,
  setActiveTabId,
} from "../utils/storage";

class HeaderTabs extends HTMLElement {
  #editingTabId: string | null = null;

  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
        }
        .tabs-bar {
          display: flex;
          align-items: center;
          flex: 1;
          overflow-x: auto;
          min-width: 0;
          height: 36px;
          border-left: 1px solid var(--overlay);
        }
        .tabs-bar::-webkit-scrollbar {
          height: 2px;
        }
        .tab {
          display: flex;
          align-items: center;
          gap: 4px;
          padding-inline: 8px;
          font-size: 13px;
          color: var(--text);
          background: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          min-width: 0;
          height: 100%;
          border-right: 1px solid var(--overlay);
        }
        .tab:hover {
          background: var(--highlight-low);
        }
        .tab.active {
          background: var(--surface);
        }
        .tab-name {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tab-close {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          opacity: 0;
          font-size: 14px;
          line-height: 1;
          padding: 0;
          color: var(--text);
        }
        .tab:hover .tab-close,
        .tab.active .tab-close {
          opacity: 0.6;
        }
        .tab-add {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 18px;
          padding: 0;
          opacity: 0.6;
          color: var(--text);
          border: none;
          background: none;
          cursor: pointer;
          margin-left: 5px;
        }
        .tab-edit-input {
          background: var(--surface);
          border: 1px solid var(--overlay);
          color: white;
          font-size: 13px;
          padding: 2px 4px;
          border-radius: 3px;
          outline: none;
          width: 100px;
          font-family: inherit;
        }
        .tabs-container {
          display: flex;
          align-items: center;
        }
      </style>
      <div class="tabs-container">
        <div class="tabs-bar" id="tabs-bar"></div>
        <button class="tab-add" id="tab-add" title="New tab">+</button>
      </div>
    `;

    this.querySelector("#tab-add")?.addEventListener("click", () =>
      this.#handleAddTab(),
    );
    this.#renderTabs();
  }

  #renderTabs() {
    const tabs = getTabs();
    const activeId = getActiveTabId();
    const $bar = this.querySelector("#tabs-bar");
    if (!$bar) return;

    $bar.innerHTML = "";

    tabs.forEach((tab) => {
      const $tab = document.createElement("button");
      $tab.className = `tab${tab.id === activeId ? " active" : ""}`;
      $tab.dataset.tabId = tab.id;

      if (this.#editingTabId === tab.id) {
        const $input = document.createElement("input");
        $input.className = "tab-edit-input";
        $input.value = tab.name;
        $input.addEventListener("blur", () => this.#finishEdit(tab.id));
        $input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") this.#finishEdit(tab.id);
          if (e.key === "Escape") this.#cancelEdit();
        });
        $tab.appendChild($input);
        requestAnimationFrame(() => $input.focus());
      } else {
        const $name = document.createElement("span");
        $name.className = "tab-name";
        $name.textContent = tab.name;
        $name.addEventListener("dblclick", (e) => {
          e.stopPropagation();
          this.#startEdit(tab.id);
        });
        $tab.appendChild($name);

        if (tabs.length > 1) {
          const $close = document.createElement("span");
          $close.className = "tab-close";
          $close.textContent = "×";
          $close.addEventListener("click", (e) => {
            e.stopPropagation();
            this.#handleRemoveTab(tab.id);
          });
          $tab.appendChild($close);
        }
      }

      $tab.addEventListener("click", (e) => {
        if ((e.target as HTMLElement).classList.contains("tab-close")) return;
        if (this.#editingTabId) this.#cancelEdit();
        this.#switchTab(tab.id);
      });

      $bar.appendChild($tab);
    });
  }

  #switchTab(id: string) {
    setActiveTabId(id);
    this.#renderTabs();
    this.dispatchEvent(
      new CustomEvent("tab-switch", { detail: { tabId: id } }),
    );
  }

  #handleAddTab() {
    const newTab = addTab("Unnamed window");
    this.#renderTabs();
    this.dispatchEvent(
      new CustomEvent("tab-switch", { detail: { tabId: newTab.id } }),
    );
  }

  #handleRemoveTab(id: string) {
    removeTab(id);
    this.#renderTabs();
    const activeId = getActiveTabId();
    if (activeId) {
      this.dispatchEvent(
        new CustomEvent("tab-switch", { detail: { tabId: activeId } }),
      );
    }
  }

  #startEdit(id: string) {
    this.#editingTabId = id;
    this.#renderTabs();
  }

  #finishEdit(id: string) {
    const $bar = this.querySelector("#tabs-bar");
    const $input = $bar?.querySelector(
      ".tab-edit-input",
    ) as HTMLInputElement | null;
    if ($input && $input.value.trim()) {
      updateTabName(id, $input.value.trim());
    }
    this.#editingTabId = null;
    this.#renderTabs();
  }

  #cancelEdit() {
    this.#editingTabId = null;
    this.#renderTabs();
  }
}

customElements.define("header-tabs", HeaderTabs);
