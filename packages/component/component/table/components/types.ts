import type { TableColumn, TableProps } from "../typing";

export interface TableToolBarType {
  defaultToolbar: TableProps["defaultToolbar"];
  spanMethod: TableProps["spanMethod"];
  hierarchicalColumns: Array<Array<TableColumn>>;
  lastLevelAllColumns: Array<TableColumn>;
  tableDataSource: TableProps["dataSource"];
  tableRef: HTMLDivElement | null;
}
