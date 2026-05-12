import * as monaco from "monaco-editor";

export function renderMonacoEditor(container: HTMLElement) {
  monaco.editor.create(container, {
    value: "",
    language: "typescript",
    theme: "vs-dark",
    automaticLayout: true,
    fontSize: 14,
    minimap: { enabled: true },
    scrollBeyondLastLine: true,
  });
}
