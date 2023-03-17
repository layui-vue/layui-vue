export const TableEmit = [
  "change",
  "update:expandKeys",
  "update:selectedKeys",
  "update:selectedKey",
  "row-contextmenu",
  "row-double",
  "row",
];

export interface TableColumn {
  title: string;
  key: string;
  customS?: string;
  width?: string;
  minWidt?: string;
  sort?: string;
  titleSl?: string;
  align?: string;
  ellipsisTooltip?: boolean;
  fixed?: string;
  type?: string;
  children?: string;
}
