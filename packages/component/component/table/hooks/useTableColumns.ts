import type { ColumnWeakMap, TableColumn } from "../typing";
import { isEqual, isValueArray, loopForEach } from "@layui/component/utils";

import { computed, watch } from "vue";

export function useTableColumns(
  columns: Array<TableColumn>,
  columnMap: ColumnWeakMap,
) {
  watch(
    () => columns,
    (newValue) => {
      loopForEach(newValue, [setDefaultWidth]);
    },
    {
      immediate: true,
      deep: true,
    },
  );

  /**
   * 设置默认宽度
   */
  function setDefaultWidth(
    column: TableColumn,
    _: number,
    parent: TableColumn | undefined,
  ) {
    if (column.children?.every(child => child.hide)) {
      column.hide = true;
    }

    if (parent?.hide && !isEqual(parent.hide, column?.hide)) {
      column.hide = parent.hide;
    }

    if (parent?.fixed && !isEqual(parent.fixed, column?.fixed)) {
      column.fixed = parent.fixed;
    }

    if (column.fixed && !column.width) {
      column.type ? (column.width = "50px") : (column.width = "100px");
    }

    if (!column.minWidth) {
      column.minWidth = "50px";
    }
  }

  const totalRow = computed(() => {
    function _totalRow(columns: TableColumn[]): number {
      let maxDepth = 0;

      for (const column of columns) {
        const depth = isValueArray(column.children)
          ? _totalRow(column.children)
          : 0;

        maxDepth = Math.max(maxDepth, depth);
      }

      return columns.every(column => column.hide) ? maxDepth : maxDepth + 1;
    }

    return _totalRow(columns);
  });

  /**
   * 设置tr/th rowspan值
   */
  function setRowSpanValue(column: TableColumn) {
    const mapValueColumns = columnMap.get(
      column,
    ) as unknown as Array<TableColumn>;

    const rowspan = isValueArray(column.children)
      ? 1 // 存在children rowspan只需为1
      : mapValueColumns.length > 1
        ? totalRow.value - mapValueColumns.length - 1 // 存在父级column，需要减去父级层级
        : totalRow.value;

    return rowspan;
  }

  /**
   * 设置tr/th colspan值
   */
  function setColSpanValue(column: TableColumn) {
    let colspan = 0;
    if (!isValueArray(column.children)) {
      colspan = 1;
    }
    else {
      colspan = totalCol(column.children);
    }

    function totalCol(columns: TableColumn[], preCol = 0): number {
      return columns!.reduce((total, column): number => {
        if (isValueArray(column.children)) {
          return (total += totalCol(column.children));
        }
        else {
          !column.hide && (total += 1);
          return total;
        }
      }, preCol);
    }

    return colspan;
  }

  return {
    setRowSpanValue,
    setColSpanValue,
  };
}

export type UseTableColumnsReturn = ReturnType<typeof useTableColumns>;
