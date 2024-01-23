import { TableColumn } from "../typing";
import { useThrottleFn } from "@vueuse/core";

let isResizing = false;
let stashColumn: any = null;
let targetElem: HTMLElement | null = null;
let targetElemBody: HTMLElement | null = null;
let startX = 0;
let startWidth = 0;
let colWidthTotal = 0;

const resizing = useThrottleFn((e: MouseEvent) => {
  if (!isResizing) return;
  const offset = e.clientX - startX;
  const newWidth = startWidth + offset;
  if (newWidth < 0) return false;
  stashColumn.width = newWidth + "px";
  if (targetElem && targetElemBody) {
    targetElem.style.width = colWidthTotal + offset + "px";
    targetElemBody.style.width = colWidthTotal + offset + "px";
  }
}, 20);

const stopResize = () => {
  startX = 0;
  startWidth = 0;
  colWidthTotal = 0;
  stashColumn = null;
  targetElem = null;
  targetElemBody = null;
  isResizing = false;
};

document.addEventListener("mousemove", resizing);
document.addEventListener("mouseup", stopResize);

export const startResize = (
  e: MouseEvent,
  column: TableColumn,
  tableHeaderTable: any,
  tableBodyTable: any
) => {
  targetElem = tableHeaderTable;
  targetElemBody = tableBodyTable;
  stashColumn = column;
  startX = e.clientX;
  const colWidthArr: any[] = [];
  tableHeaderTable.firstChild.childNodes.forEach((item: any) => {
    if (item.clientWidth) {
      colWidthArr.push(item.clientWidth);
    }
  });
  colWidthTotal = colWidthArr.reduce((sum, item) => sum + item, 0);

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
