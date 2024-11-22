import type {
  TableProps,
  TableColumn,
  WithTableColumn,
  FixedDirectionType,
} from "../typing";

import { computed } from "vue";
import { isValueArray } from "../../../utils";

// TODO
// 用于等待Table整体重构
export const useTableColumns = (props: TableProps) => {
  type Columns = TableProps["columns"];

  const formatColumns = computed((): WithTableColumn[] => {
    if (!isValueArray(props.columns)) return [];

    const _columns: WithTableColumn[] = [...props.columns];

    formatFixedLeft(_columns);

    const firstRightColumn = _columns.find((c) => c.fixed === "right");
    const lastLeftColumn = [..._columns]
      .reverse()
      .find((c) => c.fixed === "left");

    if (lastLeftColumn) {
      if (isValueArray(lastLeftColumn.children)) {
        forEachSetLastAndFirst(lastLeftColumn.children!, "_isLastColumn");
      }

      lastLeftColumn._isLastColumn = true;
    }

    if (firstRightColumn) {
      if (isValueArray(firstRightColumn.children)) {
        forEachSetLastAndFirst(firstRightColumn.children!, "_isFirstColumn");
      }

      firstRightColumn._isFirstColumn = true;
    }

    return _columns;
  });

  const formatFixedLeft = <T extends WithTableColumn>(columns: T[]) => {
    let cacheLastLeftColumn: T | undefined;

    const getChildrenTotalWidth = (
      column: T,
      preColumn: T | undefined
    ): number => {
      const currentWidth = getWidthNumber(column.width);

      column._leftStyle = !preColumn
        ? 0
        : preColumn._currentTotalWidth! + preColumn._leftStyle!;

      if (!isValueArray(column.children)) {
        column._currentTotalWidth = currentWidth;
      } else {
        column._currentTotalWidth = column.children!.reduce(
          (pre, next, index, array) => {
            // 所有的子column统一设置fixed
            next.fixed = column.fixed;

            pre += getChildrenTotalWidth(
              next as T,
              (index ? array[index - 1] : preColumn) as T
            );
            return pre;
          },
          0
        );
      }

      return column._currentTotalWidth;
    };

    for (let index = 0; index < columns.length; index++) {
      const column = columns[index];

      if (column.fixed === "left") {
        getChildrenTotalWidth(column, cacheLastLeftColumn);

        cacheLastLeftColumn = column;

        console.log(column, "column");
      }
    }
  };

  // 递归找出最后一个Fixed column
  // 存在children column 继续往下查找
  const forEachSetLastAndFirst = (
    columns: Columns,
    type: FixedDirectionType
  ) => {
    const column = type === "_isLastColumn" ? columns.at(-1)! : columns[0]!;

    Object.assign(column, { [type]: true });
    if (isValueArray(column.children!)) {
      forEachSetLastAndFirst(column.children!, type);
    }
  };

  const getWidthNumber = (width: string | undefined) =>
    width ? Number(width.replace("px", "")) : 0;

  return { formatColumns };
};
