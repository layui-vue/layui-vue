import type { RenderProps } from "@layui/component/component/_components/render";
import type { PageProps } from "@layui/component/component/page/interface";
// import type { TooltipProps } from "@layui/component/component/tooltip/types";
import type { CommonAlign, Recordable } from "@layui/component/types";
import type { VNode } from "vue";

export interface TableProps {
  id?: string;
  dataSource: Recordable[];
  columns: TableColumn[];
  skin?: string;
  size?: string;
  page?: TablePageProps;
  defaultToolbar?: boolean | TableDefaultToolbar[];
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
  "checkbox",
  "checkbox-all",
];

export type TableEmit = (event: string, ...args: any[]) => void;

interface TableBaseColumn {
  title: string;
  customSlot?: RenderProps["render"];
  width?: string;
  minWidth?: string;
  sort?: boolean | string;
  titleSlot?: RenderProps["render"];
  align?: CommonAlign;
  ellipsisTooltip?: boolean;
  ellipsisTooltipTheme?: string;
  /**
   * 使用TooltipProps会导致TS递归报错
   * 等待后续升级TS版本解决
   * Omit<TooltipProps, "content">
   */
  ellipsisTooltipProps?: Record<string, any>;
  fixed?: "left" | "right";
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
  exportCellType?: string;
}

export type TableColumn =
  (TableBaseColumn & { type?: undefined; key: string }) |
  (TableBaseColumn & { type: string; key?: string });

export type FixedDirectionType =
  | "_isLastFixedRightColumn"
  | "_isFirstFixedLeftColumn";

export type ColumnWeakMap = WeakMap<TableColumn, TableColumn[]>;

export type TablePageProps = Omit<PageProps, "simple" | "modelValue"> & {
  current: number;
  limit: number;
  change?: (pageData: { current: number; limit: number }) => void;
};

export type TableDefaultToolbar =
  | "filter"
  | "export"
  | "print"
  | TableDefaultToolbarComplex;

export interface TableDefaultToolbarComplex {
  title: string;
  icon: string;
  onClick?: () => void;
  render?: () => VNode;
}
