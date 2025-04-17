import type { TableColumn } from "../typing";
import { useThrottleFn } from "@vueuse/core";

let isResizing = false;
let stashColumn: any = null;
let targetElem: HTMLElement | null = null;
let targetElemBody: HTMLElement | null = null;
let targetElemTotal: HTMLElement | null = null;
let startX = 0;
let startWidth = 0;
let colWidthTotal = 0;

const resizing = useThrottleFn((e: MouseEvent) => {
  if (!isResizing)
    return;
  const offset = e.clientX - startX;
  const newWidth = startWidth + offset;
  if (newWidth < 0)
    return false;
  stashColumn.width = `${newWidth}px`;
  targetElem && (targetElem.style.width = `${colWidthTotal + offset}px`);
  targetElemBody
  && (targetElemBody.style.width = `${colWidthTotal + offset}px`);
  targetElemTotal
  && (targetElemTotal.style.width = `${colWidthTotal + offset}px`);
}, 20);

function stopResize() {
  startX = 0;
  startWidth = 0;
  colWidthTotal = 0;
  stashColumn = null;
  targetElem = null;
  targetElemBody = null;
  isResizing = false;
}

function removeMouseup() {
  stopResize();
  document.removeEventListener("mousemove", resizing);
  document.removeEventListener("mouseup", removeMouseup);
}

export function startResize(e: MouseEvent, column: TableColumn, tableHeaderTableRef: HTMLElement | null, tableBodyTableRef: HTMLElement | null, tableTotalTableRef: HTMLElement | null) {
  document.addEventListener("mousemove", resizing);
  document.addEventListener("mouseup", removeMouseup);

  targetElem = tableHeaderTableRef;
  targetElemBody = tableBodyTableRef;
  targetElemTotal = tableTotalTableRef;
  stashColumn = column;
  startX = e.clientX;
  const colWidthArr: any[] = [];
  tableHeaderTableRef
  && tableHeaderTableRef.firstChild?.childNodes?.forEach((item: any) => {
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
}
