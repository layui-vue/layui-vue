import { TableColumn } from "../typing";
// 节流
const throttle = (func: Function, wait: number) => {
  let timer: any = null;
  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, wait);
    }
  };
};

// TODO add type
let stashColumn: any = null;
let isResizing = false;
let startX = 0;
let startWidth = 0;
let targetElem: HTMLElement | null = null;

const resizing = throttle((e: MouseEvent) => {
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
