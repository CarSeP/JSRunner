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
          gap: 2px;
          min-width: 0;
        }
        .tabs-bar::-webkit-scrollbar {
          height: 2px;
        }
        .tab {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          background: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          border-radius: 4px 4px 0 0;
          position: relative;
          min-width: 0;
        }
        .tab:hover {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.08);
        }
        .tab.active {
          color: white;
          background: rgba(255, 255, 255, 0.12);
        }
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-header);
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
        }
        .tab:hover .tab-close,
        .tab.active .tab-close {
          opacity: 0.6;
        }
        .tab-close:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.15);
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
          color: white;
          border: none;
          background: none;
          cursor: pointer;
        }
        .tab-add:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
        }
        .tab-edit-input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.3);
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

    this.querySelector("#tab-add")?.addEventListener("click", () => this.#handleAddTab());
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
    this.dispatchEvent(new CustomEvent("tab-switch", { detail: { tabId: id } }));
  }

  #handleAddTab() {
    const newTab = addTab("Unnamed window");
    this.#renderTabs();
    this.dispatchEvent(new CustomEvent("tab-switch", { detail: { tabId: newTab.id } }));
  }

  #handleRemoveTab(id: string) {
    removeTab(id);
    this.#renderTabs();
    const activeId = getActiveTabId();
    if (activeId) {
      this.dispatchEvent(new CustomEvent("tab-switch", { detail: { tabId: activeId } }));
    }
  }

  #startEdit(id: string) {
    this.#editingTabId = id;
    this.#renderTabs();
  }

  #finishEdit(id: string) {
    const $bar = this.querySelector("#tabs-bar");
    const $input = $bar?.querySelector(".tab-edit-input") as HTMLInputElement | null;
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
