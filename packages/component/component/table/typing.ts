import type { Recordable } from "../../types";

export interface TableProps {
  id?: string;
  dataSource: Recordable[];
  columns: TableColumn[];
  skin?: string;
  size?: string;
  page?: Recordable;
  defaultToolbar?: boolean | any[];
  selectedKey?: string;
  selectedKeys?: string[];
  indentSize?: number;
  childrenColumnName?: string;
  height?: number | string;
  maxHeight?: string;
  even?: boolean;
  expandIndex?: number;
  rowClassName?: string | Function;
  cellClassName?: string | Function;
  rowStyle?: string | Function;
  cellStyle?: string | Function;
  spanMethod?: Function;
  defaultExpandAll?: boolean;
  expandKeys?: string[];
  loading?: boolean;
  getCheckboxProps?: Function;
  getRadioProps?: Function;
  resize?: boolean;
  autoColsWidth?: boolean;
  emptyDescription?: string;
  initSort?: initSort;
}

export interface initSort {
  field: string;
  type: SortType;
}

export const sortType = ["", "asc", "desc"] as const;

export type SortType = (typeof sortType)[number];

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
  ellipsisTooltipTheme?: boolean;
  fixed?: "left" | "right";
  type?: string;
  children?: TableColumn[];
  rowspan?: number;
  resize?: boolean;
  hide?: boolean;
  ignoreExport?: boolean;
  totalRow?: boolean | string | number;
  totalRowMethod: () => void;
}

export interface WithTableColumn extends TableColumn {
  children?: WithTableColumn[];
  _leftStyle?: number;
  _isLastColumn?: boolean; // last fixed left
  _isFirstColumn?: boolean; // first fixed right
  _currentTotalWidth?: number;
}

export type FixedDirectionType = "_isLastColumn" | "_isFirstColumn";
