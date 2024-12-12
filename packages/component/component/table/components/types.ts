import type { TableProps, WithTableColumn } from "../typing";

export interface TableToolBarType {
  defaultToolbar: TableProps["defaultToolbar"];
  spanMethod: TableProps["spanMethod"];
  tableHeadColumns: Array<Array<WithTableColumn>>;
  tableBodyColumns: Array<WithTableColumn>;
  tableDataSource: any;
  tableColumnKeys: any;
  tableRef: HTMLDivElement | undefined;
}
