import type { TableProps, WithTableColumn } from "../typing";
import { ref, watchEffect } from "vue";
import { useTableColumns } from "./useTableColumns";

import { isValueArray } from "../../../utils";

// type ColumnsType = TableProps["columns"];

export function useNextTable(props: TableProps) {
  const deepColumns = ref<Array<WithTableColumn>>([]);

  watchEffect(() => {
    // deepColumns.value = deepCopyColumns(props.columns);
    deepColumns.value = [...props.columns];
  });

  const { forEachColumnsCallback } = useTableColumns(deepColumns);

  const tableColumnKeys = ref<Array<string | undefined>>([]);
  const tableHeadColumns = ref<Array<Array<WithTableColumn>>>([]);
  const tableBodyColumns = ref<Array<WithTableColumn>>([]);

  watchEffect(() => {
    initData();

    forEachColumnsCallback(deepColumns.value, [
      getTableColumnsKeys,
      getTableBodyColumns,
    ]);

    getTableHeadColumns(deepColumns.value);
  });

  function getTableColumnsKeys(column: WithTableColumn) {
    if (!column.hide) {
      tableColumnKeys.value.push(column.key);
    }
  }

  function getTableHeadColumns<T extends WithTableColumn>(
    columns: Array<T>,
    level = 0
  ) {
    if (!tableHeadColumns.value[level]) {
      tableHeadColumns.value[level] = [];
    }

    for (const column of columns) {
      tableHeadColumns.value[level].push(column);

      if (isValueArray(column.children)) {
        getTableHeadColumns(column.children, level + 1);
      }
    }
  }

  function getTableBodyColumns(column: WithTableColumn) {
    if (!isValueArray(column.children)) {
      tableBodyColumns.value.push(column);
    }
  }

  function initData() {
    tableColumnKeys.value = [];
    tableHeadColumns.value = [];
    tableBodyColumns.value = [];
  }

  // function deepCopyColumns<T extends ColumnsType, K extends WithTableColumn>(
  //   columns: T
  // ): Array<K> {
  //   const _columns = [] as unknown as Array<K>;

  //   for (const column of columns) {
  //     let children: Array<K> | undefined;

  //     if (isValueArray(column.children)) {
  //       children = deepCopyColumns(column.children);
  //     }

  //     _columns.push({
  //       ...column,
  //       children,
  //     } as K);
  //   }

  //   return _columns;
  // }

  return {
    tableColumnKeys,
    tableHeadColumns,
    tableBodyColumns,
  };
}
