import type { StyleValue } from "vue";
import type {
  ColumnWeakMap,
  RequiredTableProps,
  TableColumn,
  TableEmit,
} from "../typing";

import { isEqual, isValueArray, loopForEach } from "@layui/component/utils";
import {
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useAutoColsWidth } from "./useAutoColsWidth";
import { useTableColumns } from "./useTableColumns";
import { useTableExpand } from "./useTableExpand";
import { useTablePage } from "./useTablePage";

import { useTableSelected } from "./useTableSelected";

export function useTable(props: RequiredTableProps, emit: TableEmit) {
  const columnMap: ColumnWeakMap = new WeakMap();

  /**
   * 根据 `children` 将 `props.columns` 分为多层
   */
  const hierarchicalColumns = ref<Array<Array<TableColumn>>>([]);
  /**
   * 最后一级column集合
   */
  const lastLevelAllColumns = ref<Array<TableColumn>>([]);
  /**
   * 最后一级column集合 hide: false
   */
  const lastLevelShowColumns = ref<Array<TableColumn>>([]);

  const hasTotalRow = ref(false);

  const columnsState = useTableColumns(props.columns, columnMap);

  /**
   * checkbox hook
   */
  const selectedState = useTableSelected(props, emit);

  /**
   * expand hook
   */
  const expandState = useTableExpand(props, emit);

  /**
   * 分页 hook
   */
  useTablePage(props);

  const tableDataSource = reactive([...props.dataSource]);

  watch(
    () => props.dataSource,
    (newValue) => {
      tableDataSource.splice(0, tableDataSource.length, ...newValue);
    },
    {
      deep: true,
    },
  );

  const _columns = ref<TableColumn[]>([]);

  /**
   * props.columns 变化时，重新计算
   */
  watch(
    () => props.columns,
    (newValue) => {
      _columns.value = newValue;
    },
    {
      immediate: true,
      deep: true,
    },
  );

  watchEffect(() => {
    props.autoColsWidth && useAutoColsWidth(_columns.value, tableDataSource);

    setColumnMap(_columns.value, []);

    hierarchicalColumns.value = [];
    lastLevelAllColumns.value = [];
    lastLevelShowColumns.value = [];

    loopForEach(_columns.value, [getLastLevelColumns, checkHasTotal]);

    getHierarchicalColumns(_columns.value);
  });

  function setColumnMap<T extends TableColumn[]>(columns: T, parentColumns: T) {
    for (let index = 0; index < columns.length; index++) {
      const column = columns[index];

      const data = isValueArray(parentColumns) ? parentColumns : [column];
      columnMap.set(column, data);

      if (isValueArray(column.children)) {
        setColumnMap(column.children, [...(data as T), column]);
      }
    }
  }

  /**
   * 获得lastLevelAllColumns、lastLevelShowColumns
   */
  function getLastLevelColumns(column: TableColumn) {
    if (!isValueArray(column.children)) {
      lastLevelAllColumns.value.push(column);

      !column.hide && lastLevelShowColumns.value.push(column);
    }
  }

  /**
   * 将tree columns转为一维数组
   */
  function getHierarchicalColumns<T extends TableColumn>(
    columns: Array<T>,
    level = 0,
  ) {
    if (!hierarchicalColumns.value[level]) {
      hierarchicalColumns.value[level] = [];
    }

    for (const column of columns) {
      hierarchicalColumns.value[level].push(column);

      if (isValueArray(column.children)) {
        getHierarchicalColumns(column.children, level + 1);
      }
    }
  }

  /**
   * total
   */
  function checkHasTotal(column: TableColumn) {
    if (column.totalRow) {
      hasTotalRow.value = true;
    }
  }

  /** common */
  function commonGetClasses(column: TableColumn, ...args: any[]) {
    return [
      "layui-table-cell",

      // layui-table-fixed-left-last
      // layui-table-fixed-right-first
      getLastLeftAndFirstRight(column),
      // layui-table-fixed-left/right
      getFixedLeftRight(column),
      column.type === "checkbox" ? "layui-table-cell-checkbox" : "",
      column.type === "radio" ? "layui-table-cell-radio" : "",
      column.type === "number" ? "layui-table-cell-number" : "",
      ...args,
    ];
  }

  function commonGetStylees(column: TableColumn, ...age: any[]) {
    return [
      {
        textAlign: column.align,
        ...getLeftOrRight(column),
      },
      ...age,
    ] as StyleValue;
  }

  function getLeftOrRight<T extends TableColumn>(column: T) {
    const mapValueColumns = columnMap.get(column) as unknown as T[];
    const [topColumn] = mapValueColumns;

    if (topColumn.fixed && topColumn.fixed === "left") {
      return {
        left:
          `${getCurrentColumnOtherColumnTotalWidth(mapValueColumns)
          + getCurrentTopColumnBeforeColumnsTotalWidth(mapValueColumns)
          }px`,
      };
    }

    if (topColumn.fixed && topColumn.fixed === "right") {
      return {
        right:
          `${getCurrentColumnOtherColumnTotalWidth(mapValueColumns, false)
          + getCurrentTopColumnBeforeColumnsTotalWidth(mapValueColumns, false)
          }px`,
      };
    }
    return {};

    /**
     * {
        title: "姓名",
        fixed: "left",
        children: [
          { title: "姓名1",
           children: [
              { title: "姓名3"},
              { title: "姓名4" },
            ]
          },
          {
            title: "姓名2",
            children: [
              { title: "姓名5"},
              { title: "姓名6" },
            ],
          },
        ],
      }
      假如当前节点为 `姓名6` 获得同级前面所有节点的总宽度
     */
    function getCurrentColumnOtherColumnTotalWidth(
      mapValueColumns: TableColumn[],
      isLeft = true,
    ): number {
      if (mapValueColumns.length > 1) {
        let width = 0;

        function getBeforeTotal(children: TableColumn[]): boolean {
          const _children = isLeft ? children : [...children].reverse();

          for (let index = 0; index < _children.length; index++) {
            const _column = _children[index];

            if (isEqual(_column, column))
              return true;

            if (!isValueArray(_column?.children)) {
              width += getWidthNumber(_column);
            }
            else {
              const result = getBeforeTotal(_column.children);
              if (result)
                return true;
            }
          }
          return false;
        }

        const [topColumn] = mapValueColumns;
        getBeforeTotal(topColumn?.children || []);

        return width;
      }

      return 0;
    }

    /**
     * 获得当前节点前面所有包含 `fixed` 节点的总宽度
     */
    function getCurrentTopColumnBeforeColumnsTotalWidth(
      mapValueColumns: TableColumn[],
      isLeft = true,
    ) {
      const [topColumn] = mapValueColumns;

      const columnsValue = isLeft ? _columns.value : [..._columns.value].reverse();

      let index
        = columnsValue.findIndex(column => isEqual(column, topColumn)) - 1;
      const fixedColumns = [];

      while (index > -1) {
        const column = columnsValue[index];
        if (column.fixed && column.fixed === (isLeft ? "left" : "right")) {
          fixedColumns.push(column);
        }
        index--;
      }

      return loopAllWidthTotal(fixedColumns, 0);

      function loopAllWidthTotal(columns: TableColumn[], total: number) {
        return columns.reduce((total, column) => {
          if (!isValueArray(column.children)) {
            total += getWidthNumber(column);
          }
          else {
            loopAllWidthTotal(column.children, total);
          }
          return total;
        }, total);
      }
    }
  }

  function getLastLeftAndFirstRight<T extends TableColumn>(column: T) {
    const [topColumn] = columnMap.get(column) as unknown as T[];

    const lastLeftClassNameConstant = "layui-table-fixed-left-last";
    const firstRightClassNameConstant = "layui-table-fixed-right-first";

    let lastLeftClassName = "";
    let firstRightClassName = "";

    const topLastLeft = (_columns.value as any).findLast(
      (column: T) => column.fixed === "left",
    );

    const topFirstRight = _columns.value.find(
      column => column.fixed === "right",
    );

    if (isEqual(topColumn, topLastLeft)) {
      loopJudge(topColumn, "left")
      && (lastLeftClassName = lastLeftClassNameConstant);
    }

    if (isEqual(topColumn, topFirstRight)) {
      loopJudge(topColumn, "right")
      && (firstRightClassName = firstRightClassNameConstant);
    }

    function loopJudge(
      diffColumn: TableColumn,
      fixed: "left" | "right",
    ): boolean {
      if (isEqual(diffColumn, column)) {
        return true;
      }
      if (isValueArray(diffColumn.children)) {
        return loopJudge(
          fixed === "left"
            ? diffColumn.children.at(-1)!
            : diffColumn.children[0]!,
          fixed,
        );
      }
      return false;
    }

    return `${lastLeftClassName} ${firstRightClassName}`;
  }

  function getFixedLeftRight(column: TableColumn) {
    const [topColumn] = columnMap.get(column) as unknown as TableColumn[];

    return (topColumn.fixed && `layui-table-fixed-${topColumn.fixed}`) ?? "";
  }

  function getWidthNumber(column: TableColumn): number {
    return column.hide || !column.width
      ? 0
      : Number(column.width.replace("px", ""));
  }

  return {
    hierarchicalColumns,
    lastLevelAllColumns,
    lastLevelShowColumns,

    tableDataSource,

    columnsState,
    selectedState,
    expandState,

    hasTotalRow,

    commonGetClasses,
    commonGetStylees,
  };
}

export type UseTableReturn = ReturnType<typeof useTable>;
