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
  "expand-change",
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
