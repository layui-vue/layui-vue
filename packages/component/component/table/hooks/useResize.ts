/*
 * @Author: baobaobao
 * @Date: 2024-07-07 22:08:19
 * @LastEditTime: 2024-07-07 23:04:30
 * @LastEditors: baobaobao
 */
import { TableColumn, TableEmit } from "../typing";
import { useThrottleFn } from "@vueuse/core";


export const initResize = (emit) => {
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
  emit('resize-change', {
    oldWidth: startWidth,
    ...stashColumn
  })
  startX = 0;
  startWidth = 0;
  colWidthTotal = 0;
  stashColumn = null;
  targetElem = null;
  targetElemBody = null;
  isResizing = false;
  // console.log(1111, stashColumn.width, stashColumn)

};

const removeMouseup = () => {
  stopResize();
  document.removeEventListener("mousemove", resizing);
  document.removeEventListener("mouseup", removeMouseup);
};

const startResize = (
  e: MouseEvent,
  column: TableColumn,
  tableHeaderTable: any,
  tableBodyTable: any,
  emit
) => {
  document.addEventListener("mousemove", resizing);
  document.addEventListener("mouseup", removeMouseup);

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
return {
  startResize

}
}