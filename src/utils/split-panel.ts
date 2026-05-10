import Split from "split.js";

export function createSplit(elements: [HTMLElement, HTMLElement]): void {
  Split(elements, {
    direction: "horizontal",
  });
}
