import * as monaco from "monaco-editor";

export function renderMonacoEditor(container: HTMLElement) {
  monaco.editor.create(container, {
    value: "",
    language: "typescript",
    theme: "custom-dark",
    automaticLayout: true,
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    scrollbar: { vertical: "hidden", horizontal: "hidden" },
  });
}
