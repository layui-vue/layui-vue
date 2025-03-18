import { type InjectionKey, type Ref, type ShallowRef, type Slots } from "vue";
import {
  type TableColumn,
  type TableProps,
  type RequiredTableProps,
  type TableEmit,
} from "./typing";

import type { UseTableReturn } from "./hooks/useTable";
import type { UseTableSelectedReturn } from "./hooks/useTableSelected";
import type { UseTableExpandReturn } from "./hooks/useTableExpand";
import { UseTableColumnsReturn } from "./hooks/useTableColumns";

export const columnsTypeList = ["radio", "checkbox", "number"];

interface LayTableContextType {
  tableEmits: TableEmit;
  tableProps: RequiredTableProps;
  tableSlots: Slots;

  tableRef: ShallowRef<HTMLDivElement | null>;
  tableBodyTableRef: ShallowRef<HTMLElement | null>;
  tableHeaderTableRef: ShallowRef<HTMLElement | null>;
  tableTotalRef: ShallowRef<HTMLElement | null>;

  tableDataSource: TableProps["dataSource"];

  columnsState: UseTableColumnsReturn;
  selectedState: UseTableSelectedReturn;
  expandState: UseTableExpandReturn;

  commonGetClasses: UseTableReturn["commonGetClasses"];
  commonGetStylees: UseTableReturn["commonGetStylees"];
}

export const LAY_TABLE_CONTEXT: InjectionKey<LayTableContextType> =
  Symbol("LayTableContext");
