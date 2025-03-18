import type { Recordable, CommonAlign } from "@layui/component/types";
import type { PageProps } from "@layui/component/component/page/interface";

export interface TableProps {
  id?: string;
  dataSource: Recordable[];
  columns: TableColumn[];
  skin?: string;
  size?: string;
  page?: TablePageProps;
  defaultToolbar?: boolean | any[];
  selectedKey?: string | number;
  selectedKeys?: (string | number)[];
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
  expandKeys?: (string | number)[];
  loading?: boolean;
  getCheckboxProps?: Function;
  getRadioProps?: Function;
  resize?: boolean;
  autoColsWidth?: boolean;
  emptyDescription?: string;
  initSort?: initSort;
}

type OptionalKeys = "skin" | "page" | "height" | "emptyDescription";

export type RequiredTableProps = Required<Omit<TableProps, OptionalKeys>> &
  Partial<Pick<TableProps, OptionalKeys>>;

export interface initSort {
  field: string;
  type: SortType;
}

export const sortType = ["", "asc", "desc"] as const;

export type SortType = (typeof sortType)[number];

export const tableEmits = [
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

export type TableEmit = (event: string, ...args: any[]) => void;

export interface TableColumn {
  title: string;
  key: string;
  customSlot?: string;
  width?: string;
  minWidth?: string;
  sort?: string;
  titleSlot?: string;
  align?: CommonAlign;
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
  totalRowMethod?: (
    column: TableColumn,
    dataSource: TableProps["dataSource"]
  ) => void;
}

export type FixedDirectionType =
  | "_isLastFixedRightColumn"
  | "_isFirstFixedLeftColumn";

export type ColumnWeakMap = WeakMap<TableColumn, TableColumn[]>;

export type TablePageProps = Omit<PageProps, "simple" | "modelValue"> & {
  current: number;
  limit: number;
};
