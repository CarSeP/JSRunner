import Split from "split.js";

type direction = "horizontal" | "vertical";

export function createSplit(elements: [HTMLElement, HTMLElement]): void {
  let currentDirection: direction = window.innerWidth >= 768 ? "horizontal" : "vertical";
  let splitInstance = Split(elements, {
    direction: currentDirection,
    sizes: [50, 50],
    minSize: 0,
  });

  const clearInlineStyles = () => {
    elements.forEach((el) => {
      el.style.width = "";
      el.style.height = "";
      el.style.flex = "";
    });
    document.querySelectorAll(".gutter").forEach((gutter) => {
      (gutter as HTMLElement).style.width = "";
      (gutter as HTMLElement).style.height = "";
      (gutter as HTMLElement).style.flex = "";
    });
  };

  const onResize = () => {
    const newDirection = window.innerWidth >= 768 ? "horizontal" : "vertical";
    if (newDirection !== currentDirection) {
      currentDirection = newDirection;
      splitInstance.destroy(true);
      clearInlineStyles();
      splitInstance = Split(elements, {
        direction: currentDirection,
        sizes: [50, 50],
        minSize: 0,
      });
    }
  };

  window.addEventListener("resize", onResize);
}
