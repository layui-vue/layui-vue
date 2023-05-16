import { TableColumn } from "../typing";
import { useThrottleFn } from "@vueuse/core";

let isResizing = false;
let stashColumn: any = null;
let targetElem: HTMLElement | null = null;
let startX = 0;
let startWidth = 0;

const resizing = useThrottleFn((e: MouseEvent) => {
  if (!isResizing) return;
  const offset = e.clientX - startX;
  const newWidth = startWidth + offset;
  if (newWidth < 0) return false;
  stashColumn.width = newWidth + "px";
  if (targetElem) {
    targetElem.style.width = newWidth + "px";
  }
}, 20);

const stopResize = () => {
  startX = 0;
  startWidth = 0;
  stashColumn = null;
  targetElem = null;
  isResizing = false;
};

document.addEventListener("mousemove", resizing);
document.addEventListener("mouseup", stopResize);

export const startResize = (e: MouseEvent, column: TableColumn) => {
  stashColumn = column;
  startX = e.clientX;
  isResizing = true;
  const target = e.target as HTMLElement;
  const parentNode = target.parentNode as HTMLElement;
  startWidth = parentNode.offsetWidth;
  if (column.width) {
    const match = column.width.match(/^(\d+)px$/i);
    if (match) {
      startWidth = +match[1];
    }
  }
};
