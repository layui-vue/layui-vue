import type { WithTableColumn, FixedDirectionType } from "../typing";

import { type Ref, watch } from "vue";
import { isValueArray, normalizeArray } from "../../../utils";

type GetChildrenTotalWidthOptions<T> = {
  parentColumn: T | undefined;
  paramsName: "_left" | "_right";
};

type CallbackFnType = (
  column: WithTableColumn,
  columns: Array<WithTableColumn>
) => void;

// TODO
// 用于等待Table整体重构
export function useTableColumns<UT extends Ref<Array<WithTableColumn>>>(
  columns: UT
) {
  watch(
    () => columns.value,
    (valColumns) => {
      if (!isValueArray(valColumns)) return;

      forEachColumnsCallback(valColumns, [
        setDefaultWidth,
        setRowSpanValue,
        setColSpanValue,
      ]);

      // TODO 下面所有fn待重写至 forEachColumnsCallback

      // 计算存在fixed的column 总left/right
      // _left/_right
      calcSingleColumnLeftRight(valColumns, "left");
      calcSingleColumnLeftRight([...columns.value].reverse(), "right");

      // 设置 fixed[left/right] last/first _isLastColumn/_isFirstColumn 标识
      setLastFirstFixedColumnSign(columns.value);
    },
    { immediate: true, deep: true }
  );

  // 设置默认宽度
  function setDefaultWidth(column: WithTableColumn) {
    if (column.fixed && !column.width) {
      column.type ? (column.width = "50px") : (column.width = "100px");
    }

    if (!column.minWidth) {
      column.minWidth = "50px";
    }
  }

  // 设置tr/th rowspan值
  function setRowSpanValue<T extends WithTableColumn, K extends Array<T>>(
    column: T,
    columns: K
  ) {
    column.rowspan = isValueArray(column.children) ? 1 : totalRow(columns);

    function totalRow(columns: K): number {
      let maxDepth = 0;

      for (const column of columns) {
        const depth = isValueArray(column.children)
          ? totalRow(column.children as K)
          : 0;

        maxDepth = Math.max(maxDepth, depth);
      }

      return maxDepth + 1;
    }
  }

  // 设置tr/th colspan值
  function setColSpanValue<T extends WithTableColumn>(column: T) {
    if (!isValueArray(column.children)) {
      column.colspan = 1;
    } else {
      column.colspan = totalCol(column.children as unknown as T[]);
    }

    function totalCol(columns: Array<T>, preCol = 0): number {
      return columns!.reduce((total, column: T): number => {
        if (isValueArray(column.children)) {
          return (total += totalCol(column.children as unknown as T[]));
        } else {
          return (total += 1);
        }
      }, preCol);
    }
  }

  function forEachColumnsCallback<T extends WithTableColumn>(
    columns: Array<T>,
    callbacks: CallbackFnType | Array<CallbackFnType>
  ) {
    const cbs = normalizeArray(callbacks).filter(Boolean);

    for (const column of columns) {
      for (const cb of cbs) {
        cb(column, columns);
      }

      if (isValueArray(column.children)) {
        forEachColumnsCallback(column.children, callbacks);
      }
    }
  }

  function calcSingleColumnLeftRight(
    columns: Array<WithTableColumn>,
    fixed: "left" | "right"
  ) {
    let parentColumn: WithTableColumn | undefined;
    const paramsName = fixed === "left" ? "_left" : "_right";

    for (let index = 0; index < columns.length; index++) {
      const column = columns[index];

      if (column.fixed === fixed) {
        getChildrenTotalWidth(column, {
          parentColumn,
          paramsName,
        });

        parentColumn = column;
      }
    }
  }

  function getChildrenTotalWidth<T extends WithTableColumn>(
    column: T,
    options: GetChildrenTotalWidthOptions<T>
  ): number {
    const currentWidth = getWidthNumber(column.width);
    const { parentColumn, paramsName } = options;

    column[paramsName] = !parentColumn
      ? 0
      : parentColumn._currentTotalWidth! + parentColumn[paramsName]!;

    if (!isValueArray(column.children)) {
      column._currentTotalWidth = currentWidth;
    } else {
      column._currentTotalWidth = column.children!.reduce(
        (pre, next, index, array) => {
          // 所有的子column统一设置fixed
          next.fixed = column.fixed;

          pre += getChildrenTotalWidth(next, {
            parentColumn: index ? array[index - 1] : parentColumn,
            paramsName,
          });
          return pre;
        },
        0
      );
    }

    return column._currentTotalWidth;
  }

  function setLastFirstFixedColumnSign(columns: Array<WithTableColumn>) {
    const firstRightColumn = columns.find((c) => c.fixed === "right");
    const lastLeftColumn = [...columns]
      .reverse()
      .find((c) => c.fixed === "left");

    if (lastLeftColumn) {
      if (isValueArray(lastLeftColumn.children)) {
        forEachSetLastAndFirst(lastLeftColumn.children, "_isLastColumn");
      }

      lastLeftColumn._isLastColumn = true;
    }

    if (firstRightColumn) {
      if (isValueArray(firstRightColumn.children)) {
        forEachSetLastAndFirst(firstRightColumn.children, "_isFirstColumn");
      }

      firstRightColumn._isFirstColumn = true;
    }
  }

  // 递归找出最后一个Fixed column
  // 存在children column 继续往下查找
  function forEachSetLastAndFirst(
    columns: Array<WithTableColumn>,
    type: FixedDirectionType
  ) {
    const column = type === "_isLastColumn" ? columns.at(-1)! : columns[0]!;

    Object.assign(column, { [type]: true });
    if (isValueArray(column.children!)) {
      forEachSetLastAndFirst(column.children, type);
    }
  }

  function getWidthNumber(width: string | undefined): number {
    return width ? Number(width.replace("px", "")) : 0;
  }

  return { forEachColumnsCallback };
}
