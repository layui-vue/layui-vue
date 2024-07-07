/*
 * @Author: baobaobao
 * @Date: 2024-07-07 22:08:19
 * @LastEditTime: 2024-07-07 22:42:01
 * @LastEditors: baobaobao
 */
export const TableEmit = [
  "change",
  "sort-change",
  "update:expandKeys",
  "update:selectedKeys",
  "update:selectedKey",
  "row-contextmenu",
  "row-double",
  "row",
  "cell-double",
  "resize-change"
];

export interface TableColumn {
  title: string;
  key: string;
  customSlot?: string;
  width?: string;
  minWidt?: string;
  sort?: string;
  titleSl?: string;
  align?: string;
  ellipsisTooltip?: boolean;
  fixed?: string;
  type?: string;
  children?: TableColumn[];
  rowspan: number;
  resize?: boolean;
}
