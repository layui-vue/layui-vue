import type { InjectionKey, ShallowRef, Slots } from "vue";
import type { UseTableReturn } from "./hooks/useTable";

import type { UseTableColumnsReturn } from "./hooks/useTableColumns";
import type { UseTableExpandReturn } from "./hooks/useTableExpand";
import type { UseTableSelectedReturn } from "./hooks/useTableSelected";
import type { RequiredTableProps, TableEmit, TableProps } from "./typing";

export const columnsTypeList = ["radio", "checkbox", "number"];

export interface LayTableContextType {
  tableEmits: TableEmit;
  tableProps: RequiredTableProps;
  tableSlots: Slots;

  tableRef: ShallowRef<HTMLDivElement | null>;
  tableBodyTableRef: ShallowRef<HTMLElement | null>;
  tableHeaderRef: ShallowRef<HTMLDivElement | null>;
  tableHeaderTableRef: ShallowRef<HTMLElement | null>;
  tableTotalRef: ShallowRef<HTMLDivElement | null>;
  tableTotalTableRef: ShallowRef<HTMLElement | null>;

  tableDataSource: TableProps["dataSource"];

  columnsState: UseTableColumnsReturn;
  selectedState: UseTableSelectedReturn;
  expandState: UseTableExpandReturn;

  commonGetClasses: UseTableReturn["commonGetClasses"];
  commonGetStylees: UseTableReturn["commonGetStylees"];
}

export const LAY_TABLE_CONTEXT: InjectionKey<LayTableContextType>
  = Symbol("LayTableContext");
