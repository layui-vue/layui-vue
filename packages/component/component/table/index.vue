<script setup lang="ts">
import "./index.less";
import type { TableProps as _TableProps, SortType } from "./typing";

import {
  ref,
  watch,
  useSlots,
  onMounted,
  StyleValue,
  WritableComputedRef,
  computed,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useResizeObserver, type UseResizeObserverReturn } from "@vueuse/core";
import LayCheckbox from "../checkbox/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LayEmpty from "../empty/index.vue";
import TableData from "./TableData.vue";
import TablePage from "./TablePage.vue";
import useTable from "./hooks/useTable";
import { TableEmit, sortType } from "./typing";
import { startResize } from "./hooks/useResize";
import useAutoColsWidth from "./hooks/useAutoColsWidth";
import { useEmit } from "./hooks/useEmit";
import { useI18n } from "../../language";

export type TableProps = _TableProps;

defineOptions({
  name: "LayTable",
});

const props = withDefaults(defineProps<TableProps>(), {
  id: "id",
  size: "md",
  indentSize: 30,
  childrenColumnName: "children",
  dataSource: () => [],
  selectedKeys: () => [],
  defaultToolbar: false,
  selectedKey: "",
  maxHeight: "auto",
  even: false,
  rowClassName: "",
  cellClassName: "",
  expandIndex: 0,
  rowStyle: "",
  cellStyle: "",
  defaultExpandAll: false,
  spanMethod: () => {},
  expandKeys: () => [],
  loading: false,
  getCheckboxProps: () => {},
  getRadioProps: () => {},
  resize: false,
  autoColsWidth: false,
  initSort: () => ({
    field: "",
    type: "",
  }),
});

const emit = defineEmits(TableEmit);

const { rowClick, rowDoubleClick, rowContextmenu, cellDoubleClick, rowExpand } =
  useEmit(emit);
const { t } = useI18n();
const slot = useSlots();
const tableRef = ref();

const allChecked = ref(false);
const hasChecked = ref(false);
const tableDataSource = ref<any[]>([...props.dataSource]);
const tableColumns = computed(() => {
  return [...props.columns];
});

const { columnSlotNames, dataSourceCount, needSelectedKeys } = useTable(props);

const tableColumnKeys = ref<any[]>([]);
const tableHeadColumns = ref<any[]>([]);
const tableBodyColumns = ref<any[]>([]);
const tableFlattenColumns = ref<any[]>([]);

/**
 * 获取叶节点集合
 *
 * @param columns 原始 columns 配置结构
 */
const flattenColumns = (columns: any[]) => {
  let result: any[] = [];
  for (const item of columns) {
    if (item.children && item.children.length > 0) {
      // 如果存在子项，则使用 concat 方法将子项的遍历结果合并到当前结果中
      result = result.concat(flattenColumns(item.children));
    } else {
      // 否则，将当前项添加到结果集合中
      result.push(item);
    }
  }
  return result;
};

/**
 * 获取数组深度
 *
 * @param arr 数组
 */
const getLevel = (arr: any[]) => {
  let maxLevel = 0;
  (function callBack(arr, level) {
    ++level;
    maxLevel = Math.max(level, maxLevel);
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (item.children && item.children.length > 0) {
        callBack(item.children, level);
      } else {
        delete item.children;
      }
    }
  })(arr, 0);
  return maxLevel;
};

/**
 * 获取叶节点的数量
 *
 * @param json 当前节点
 */
function getLeafCountTree(json: any) {
  if (!json.children || json.children.length == 0) {
    json.colspan = 1;
    return 1;
  } else {
    var leafCount = 0;
    for (var i = 0; i < json.children.length; i++) {
      leafCount = leafCount + getLeafCountTree(json.children[i]);
    }
    json.colspan = leafCount;
    return leafCount;
  }
}

/**
 * 计算内容列
 *
 * @param columns 原始列
 */
const findFindNode = (columns: any[]) => {
  columns.forEach((column) => {
    if (column.children) {
      findFindNode(column.children);
    } else {
      tableBodyColumns.value.push(column);
    }
  });
};

/**
 * 计算显示列
 *
 * @param columns 原始列
 */
const findFindNodes = (columns: any[]) => {
  columns.forEach((column) => {
    if (column.children) {
      tableColumnKeys.value.push(column.key);
      findFindNodes(column.children);
    } else {
      if (!column.hide) {
        tableColumnKeys.value.push(column.key);
      }
    }
  });
};

/**
 * 将 columns 复杂表头，分割为多维度数组。
 *
 * @param level 层级, 用于决定会被 push 到的目标数组
 * @remark 注意：当父层级为 fixed 属性时, 子集将自动继承
 */
const findFinalNode = (
  level: number,
  columns: any[],
  parentFixed: string | undefined
) => {
  columns.forEach((column) => {
    if (parentFixed != undefined) {
      column.fixed = parentFixed;
    }
    if (column.children) {
      const colSpan = getLeafCountTree(column);
      column.colspan = colSpan;
      if (!tableHeadColumns.value[level]) {
        tableHeadColumns.value[level] = [];
      }
      // 如果列固定，并且 width 不存在, 设置默认值
      if (column.fixed && !column.width) {
        column.type ? (column.width = "50px") : (column.width = "100px");
      }
      tableHeadColumns.value[level].push(column);
      // 如果 level = 0, 并且 column.fixed 不为 undefined 向下传递，否则 undefined.
      findFinalNode(
        level + 1,
        column.children,
        level === 0 && column.fixed != undefined ? column.fixed : undefined
      );
    } else {
      const rowSpan = getLevel(columns);
      column.rowspan = rowSpan;
      if (!tableHeadColumns.value[level]) {
        tableHeadColumns.value[level] = [];
      }
      // 如果列固定，并且 width 不存在, 设置默认值
      if (column.fixed && !column.width) {
        column.type ? (column.width = "50px") : (column.width = "100px");
      }
      tableHeadColumns.value[level].push(column);
    }
  });
};

const tableExpandKeys = ref<string[]>([...props.expandKeys]);
const tableSelectedKeys = ref<string[]>([...props.selectedKeys]);

/**
 * 对 width 属性的预处理
 */
props.autoColsWidth && useAutoColsWidth(tableColumns, tableDataSource);

/**
 * 监听 columns 变化
 */
watch(
  tableColumns,
  () => {
    tableColumnKeys.value = [];
    tableBodyColumns.value = [];
    tableHeadColumns.value = [];
    tableFlattenColumns.value = [];
    findFindNode(tableColumns.value);
    findFindNodes(tableColumns.value);
    findFinalNode(0, tableColumns.value, undefined);
    tableFlattenColumns.value = flattenColumns(tableColumns.value);
  },
  { immediate: true, deep: true }
);

/**
 * 监听 props.selectedKeys 变化，响应内部
 */
watch(
  () => props.selectedKeys,
  () => {
    tableSelectedKeys.value = props.selectedKeys;
  },
  { deep: true }
);

/**
 * 监听 props.expandKeys 变化，响应内容
 */
watch(
  () => props.expandKeys,
  () => {
    tableExpandKeys.value = props.expandKeys;
  },
  { deep: true }
);

/**
 * 监听 tableExpandKeys 变化，响应外部
 */
watch(
  tableExpandKeys,
  () => {
    if (props.expandKeys !== tableExpandKeys.value) {
      emit("update:expandKeys", tableExpandKeys.value);
    }
  },
  { deep: true, immediate: true }
);

/**
 * 获取可展开的节点编码
 *
 * @param data
 * @param ids
 */
const lookForAllId = (data: any[] = [], ids: string[] = []) => {
  for (let item of data) {
    if (item[props.childrenColumnName]) {
      ids.push(item[props.id]);
      lookForAllId(item[props.childrenColumnName], ids);
    }
  }
  return ids;
};

/**
 * 监听 default-expand-all 变化，修改 expandKeys 内部属性
 *
 * @remark 向内向外，都是响应式
 */
watch(
  () => [props.defaultExpandAll, props.dataSource],
  () => {
    if (props.defaultExpandAll) {
      const ids: string[] = [];
      lookForAllId(props.dataSource, ids);
      tableExpandKeys.value = ids;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  () => [props.defaultExpandAll],
  () => {
    if (!props.defaultExpandAll) {
      tableExpandKeys.value = [];
    }
  },
  {
    deep: true,
  }
);

const tableSelectedKey: WritableComputedRef<string> = computed({
  get() {
    return props.selectedKey;
  },
  set(val) {
    emit("update:selectedKey", val);
  },
});

watch(
  () => props.dataSource,
  () => {
    tableDataSource.value = [...props.dataSource];
  },
  { deep: true }
);

const changeAll = (isChecked: boolean) => {
  if (isChecked) {
    tableSelectedKeys.value = [...needSelectedKeys.value];
  } else {
    tableSelectedKeys.value = [];
  }
};

watch(
  tableSelectedKeys,
  () => {
    if (props.page) {
      if (tableSelectedKeys.value.length === props.page.total) {
        allChecked.value = true;
      } else {
        allChecked.value = false;
      }
    } else {
      if (tableSelectedKeys.value.length === dataSourceCount.value) {
        allChecked.value = true;
      } else {
        allChecked.value = false;
      }
    }
    if (tableSelectedKeys.value.length > 0) {
      hasChecked.value = true;
    } else {
      hasChecked.value = false;
    }
    emit("update:selectedKeys", tableSelectedKeys.value);
  },
  { deep: true, immediate: true }
);

const change = function (page: any) {
  emit("change", page);
};

// 页面打印
const print = () => {
  let subOutputRankPrint = tableRef.value as HTMLElement;
  let newContent = subOutputRankPrint.innerHTML;
  let oldContent = document.body.innerHTML;
  document.body.innerHTML = newContent;
  window.print();
  window.location.reload();
  document.body.innerHTML = oldContent;
};

// 报表导出
const exportData = () => {
  var tableStr = ``;
  for (let tableHeadColumn of tableHeadColumns.value) {
    tableStr += "<tr>";
    for (let column of tableHeadColumn) {
      if (!column.ignoreExport) {
        // 如果 column.type 等于 checkbox 或 radio 时，该列不导出
        if ((column.type && column.type === "number") || !column.type) {
          tableStr += `<td colspan=${column.colspan} rowspan=${
            column.rowspan
          }>${column.title || ""}</td>`;
        }
      }
    }
    tableStr += "</tr>";
  }
  const doExport = (source: Array<any>) => {
    source.forEach((item, rowIndex) => {
      tableStr += "<tr>";
      tableBodyColumns.value.forEach((tableColumn, columnIndex) => {
        if (!tableColumn.ignoreExport) {
          // 如果该列是特殊列，并且类型为 number 时，特殊处理
          if (tableColumn.type && tableColumn.type == "number") {
            tableStr += `<td>${rowIndex + 1}</td>`;
          } else {
            // 如果不是特殊列，进行字段匹配处理
            if (tableColumn.type == undefined) {
              var columnData = undefined;
              Object.keys(item).forEach((name) => {
                if (tableColumn.key === name) {
                  columnData = item;
                }
              });
              // 拼接列
              const rowColSpan = props.spanMethod(
                item,
                tableColumn,
                rowIndex,
                columnIndex
              );
              const rowspan = rowColSpan ? rowColSpan[0] : 1;
              const colspan = rowColSpan ? rowColSpan[1] : 1;

              // 如果 rowspan 和 colspan 是 0 说明该列作为合并列的辅助列。
              // 则不再进行结构拼接。
              if (rowspan != 0 && colspan != 0) {
                tableStr += `<td colspan=${colspan} rowspan=${rowspan} x:str>${
                  columnData ? columnData[tableColumn.key] : ""
                }</td>`;
              }
            }
          }
        }
      });
      tableStr += "</tr>";
      if (item.children) doExport(item.children);
    });
  };
  doExport(tableDataSource.value);
  var worksheet = "Sheet1";
  var uri = "data:application/vnd.ms-excel;base64,";
  var exportTemplate = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns="http://www.w3.org/TR/REC-html40">
        <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>${worksheet}</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
            </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head>
        <body>
            <table syle="table-layout: fixed;word-wrap: break-word; word-break: break-all;">${tableStr}</table>
        </body>
    </html>`;
  window.location.href = uri + base64(exportTemplate);
  return;
};

// BASE64编码
function base64(s: string) {
  return window.btoa(unescape(encodeURIComponent(s)));
}

const thSort = (e: Event, key: string) => {
  const spanDom = (e.currentTarget as HTMLElement).querySelector(
    "span[lay-sort]"
  ) as HTMLSpanElement;

  if (!spanDom) return;

  const sortValue = spanDom.getAttribute("lay-sort") as SortType;

  const currentIndex = sortType.indexOf(sortValue);
  const nextSort = sortType[(currentIndex + 1) % sortType.length];

  baseSort(spanDom, key, nextSort);
};

const iconSort = (e: Event, key: string, sort: Exclude<SortType, "">) => {
  const spanDom = (e.target as HTMLElement).parentNode as HTMLSpanElement;

  const sortValue = spanDom.getAttribute("lay-sort") as SortType;

  baseSort(spanDom, key, sortValue !== sort ? sort : "");
};

/**
 *
 * @param spanDom 包含lay-sort属性的span dom
 * @param key column.key
 * @param nextSort 下一次的sort
 */
const baseSort = (
  spanDom: HTMLSpanElement,
  key: string,
  nextSort: SortType
) => {
  removeAllSortState();
  spanDom.setAttribute("lay-sort", nextSort);

  switch (nextSort) {
    case "":
      tableDataSource.value = [...props.dataSource];
      break;

    case "asc":
      tableDataSource.value.sort((x, y) => {
        if (x[key] < y[key]) return -1;
        else if (x[key] > y[key]) return 1;
        else return 0;
      });
      break;

    case "desc":
      tableDataSource.value.sort((x, y) => {
        if (x[key] < y[key]) return 1;
        else if (x[key] > y[key]) return -1;
        else return 0;
      });
      break;
  }

  emit("sort-change", key, nextSort);
};

// 清空所有的sort状态
const removeAllSortState = () => {
  const sortElements = tableRef.value.querySelectorAll("[lay-sort]");
  if (sortElements && sortElements.length > 0) {
    sortElements.forEach((element: HTMLElement) => {
      element.setAttribute("lay-sort", "");
    });
  }
};

let tableBody = ref<HTMLElement | null>(null);
let tableHeader = ref<HTMLElement | null>(null);
let tableTotal = ref<HTMLElement | null>(null);
let tableHeaderTable = ref<HTMLElement | null>(null);
let tableBodyTable = ref<HTMLElement | null>(null);
const tableBodyEmptyWidth = ref();
let scrollWidthCell = ref(0);

const getScrollWidth = () => {
  const clientWidth: number = tableBody.value?.clientWidth || 0;
  const offsetWidth: number = tableBody.value?.offsetWidth || 0;
  if (clientWidth < offsetWidth) {
    scrollWidthCell.value = offsetWidth - clientWidth;
  } else {
    scrollWidthCell.value = 0;
  }
  tableBodyEmptyWidth.value = tableHeaderTable.value?.offsetWidth + "px";
};

const hasl = ref(false);
const hasr = ref(false);

const classes = computed(() => {
  return [
    hasl.value ? "layui-table-has-fixed-left" : "",
    hasr.value ? "layui-table-has-fixed-right" : "",
    hasTotalRow.value || (props.page && props.page.total > 0)
      ? ""
      : "layui-table-has-bottom-width",
  ];
});

const totalWrapperStyles = computed(() => {
  return [
    {
      "padding-right": `${scrollWidthCell.value}px`,
      "margin-top": `${!scrollWidthCell.value ? 0 : 1}px`,
    },
  ] as StyleValue;
});

const tablePageStyles = computed(() => {
  return [
    {
      "border-width": `${hasTotalRow.value ? 1 : 0}px 0 0 `,
    },
  ] as StyleValue;
});

watch(
  () => [props.height, props.maxHeight, props.dataSource],
  () => {
    nextTick(() => {
      getScrollWidth();
    });
  }
);

let resizeInstance: UseResizeObserverReturn | null;

onMounted(() => {
  nextTick(() => {
    getScrollWidth();
  });
  getFixedColumn();

  tableBody.value?.addEventListener("scroll", () => {
    // todo issue中开发者小新笔记本 滚动X轴 Y轴会出现滚动条
    // 但子元素高度未变，暂时在滚动回调中重新计算scrollWidthCell
    // https://gitee.com/layui/layui-vue/issues/I8TSK1
    getScrollWidth();

    getFixedColumn();
  });

  tableBody.value?.addEventListener("transitionend", () => {
    getScrollWidth();
  });

  resizeInstance = useResizeObserver(tableBody, () => {
    getScrollWidth();
    getFixedColumn();
  });
});

const getFixedColumn = () => {
  tableHeader.value!.scrollLeft = tableBody.value?.scrollLeft || 0;

  if (tableTotal.value) {
    tableTotal.value.scrollLeft = tableBody.value?.scrollLeft || 0;
  }

  // @ts-ignore
  if (tableBody.value?.scrollWidth > tableBody.value?.clientWidth) {
    if (tableBody.value?.scrollLeft == 0) {
      hasl.value = false;
      hasr.value = true;
    } else {
      // @ts-ignore
      const t = tableBody.value?.scrollLeft + tableBody.value?.offsetWidth + 2;
      const s = tableBody.value?.scrollWidth;
      // @ts-ignore
      if (t > s) {
        hasl.value = true;
        hasr.value = false;
      } else {
        hasl.value = true;
        hasr.value = true;
      }
    }
  } else {
    hasl.value = false;
    hasr.value = false;
  }
};

const currentIndentSize = ref(0);

const childrenExpandSpace = computed(() => {
  return (
    props.dataSource.find((value: any) => {
      if (value[props.childrenColumnName]) {
        return true;
      }
    }) != undefined
  );
});

const renderFixedStyle = (column: any, columnIndex: number) => {
  if (column.fixed) {
    if (column.fixed == "left") {
      var left = 0;
      for (var i = 0; i < columnIndex; i++) {
        if (
          props.columns[i].fixed &&
          props.columns[i].fixed == "left" &&
          tableColumnKeys.value.includes(props.columns[i].key)
        ) {
          left = left + Number(props.columns[i]?.width?.replace("px", ""));
        }
      }
      return { left: `${left}px` } as StyleValue;
    } else {
      var right = 0;
      for (var i = columnIndex + 1; i < props.columns.length; i++) {
        if (
          props.columns[i].fixed &&
          props.columns[i].fixed == "right" &&
          tableColumnKeys.value.includes(props.columns[i].key)
        ) {
          right = right + Number(props.columns[i]?.width?.replace("px", ""));
        }
      }
      return { right: `${right}px` } as StyleValue;
    }
  } else {
    var isLast = true;
    for (var i = columnIndex + 1; i < props.columns.length; i++) {
      if (
        props.columns[i].fixed == undefined &&
        tableColumnKeys.value.includes(props.columns[i].key)
      ) {
        isLast = false;
      }
    }
    return isLast ? ({ "border-right": "none" } as StyleValue) : {};
  }
};

/**
 * 根据目标列查找它的父级
 *
 * @param data 查找的数据
 * @param target 目标节点
 */
const findTopicParent = (data: any[], target: any) => {
  const parents: any[] = [];
  const findParent = (data: any[], target: any, result: any[]) => {
    for (let i in data) {
      let item = data[i];
      if (item.key === target.key) {
        result.unshift(item);
        return true;
      }
      if (item.children && item.children.length > 0) {
        let ok = findParent(item.children, target, result);
        if (ok) {
          result.unshift(item);
          return true;
        }
      }
    }
    return false;
  };
  findParent(data, target, parents);
  return parents[0];
};

/**
 * 计算 td 的 style 属性
 *
 * @param column 列信息
 * @param columnIndex 列索引
 * @param tableHeadColumn 列集合 (current)
 */
const renderHeadFixedStyle = (
  column: any,
  columnIndex: number,
  tableHeadColumn: any[],
  tableHeadColumnIndex: number,
  tableHeadColumns: any[]
) => {
  if (column.fixed) {
    if (column.fixed == "left") {
      // 如果是简单固定列
      if (tableHeadColumnIndex == 0) {
        // 如果是左固定。
        var left = 0;
        // 累加左侧列宽。
        for (var i = 0; i < columnIndex; i++) {
          if (
            props.columns[i].fixed &&
            props.columns[i].fixed == "left" &&
            tableColumnKeys.value.includes(props.columns[i].key)
          ) {
            left = left + Number(props.columns[i]?.width?.replace("px", ""));
          }
        }
        return { left: `${left}px` } as StyleValue;
      } else {
        // 复杂表头固定
        var left = 0;
        var topicColumns = tableHeadColumns[0];
        var topicColumn = findTopicParent(topicColumns, column);
        var index: number = topicColumns.indexOf(topicColumn);

        // 累加父级位置
        for (var i = 0; i < index; i++) {
          if (topicColumns[i].fixed && topicColumns[i].fixed == "left") {
            left = left + Number(topicColumns[i]?.width?.replace("px", ""));
          }
        }

        // 累加当前位置
        for (var i = 0; i < columnIndex; i++) {
          if (tableHeadColumn[i].fixed && tableHeadColumn[i].fixed == "left") {
            left = left + Number(tableHeadColumn[i]?.width?.replace("px", ""));
          }
        }
        return { left: `${left}px` } as StyleValue;
      }
    } else {
      if (tableHeadColumnIndex == 0) {
        // 如果是右固定。
        var right = 0;
        // 累计右侧列宽。
        for (var i = columnIndex + 1; i < props.columns.length; i++) {
          if (
            props.columns[i].fixed &&
            props.columns[i].fixed == "right" &&
            tableColumnKeys.value.includes(props.columns[i].key)
          ) {
            right = right + Number(props.columns[i]?.width?.replace("px", ""));
          }
        }
        return { right: `${right}px` } as StyleValue;
      } else {
        // 复杂表头固定
        var right = 0;
        var topicColumns = tableHeadColumns[0];
        var topicColumn = findTopicParent(topicColumns, column);
        var index: number = topicColumns.indexOf(topicColumn);

        // 累计右侧列宽。
        for (var i = index + 1; i < topicColumns.length; i++) {
          if (topicColumns[i].fixed && topicColumns[i].fixed == "right") {
            right = right + Number(topicColumns[i]?.width?.replace("px", ""));
          }
        }

        // 累加当前位置
        for (var i = columnIndex + 1; i < tableHeadColumn.length; i++) {
          if (tableHeadColumn[i].fixed && tableHeadColumn[i].fixed == "right") {
            right =
              right + Number(tableHeadColumn[i]?.width?.replace("px", ""));
          }
        }

        return { right: `${right}px` } as StyleValue;
      }
    }
  } else {
    // 如果是简单表头，则判定当前列是否为尾列。
    if (tableHeadColumnIndex == 0) {
      var isLast = true;
      for (var i = columnIndex + 1; i < tableHeadColumn.length; i++) {
        if (
          tableHeadColumn[i].fixed == undefined &&
          tableColumnKeys.value.includes(tableHeadColumn[i].key)
        ) {
          isLast = false;
        }
      }
      return isLast ? ({ "border-right": "none" } as StyleValue) : {};
    } else {
      // 如果是复杂表头，则判定根节点与子节点是否同时为尾节点。
      var topicColumns = tableHeadColumns[0];
      var topicColumn = findTopicParent(topicColumns, column);
      var index: number = topicColumns.indexOf(topicColumn);
      var isLast = true;
      // 父节点是否为当前层级的尾节点。
      for (var i = index + 1; i < topicColumns.length; i++) {
        if (
          topicColumns[i].fixed == undefined &&
          tableColumnKeys.value.includes(topicColumns[i].key)
        ) {
          isLast = false;
        }
      }
      // 子节点是否为当前层级的尾节点。
      for (var i = columnIndex + 1; i < tableHeadColumn.length; i++) {
        if (
          tableHeadColumn[i].fixed == undefined &&
          tableColumnKeys.value.includes(tableHeadColumn[i].key)
        ) {
          isLast = false;
        }
      }
      // 当前两者满足条件时，去掉右侧边框显示。
      return isLast ? ({ "border-right": "none" } as StyleValue) : {};
    }
  }
};

/**
 * 在 fixed 为 left 时，如果是尾列，增加阴影。
 * 在 fixed 为 right 时，如果是首列，增加阴影。
 *
 * @remark 排除 hide 列
 */
const renderFixedClassName = (
  column: any,
  columnIndex: number,
  currentColumns: any[]
) => {
  if (column.fixed) {
    if (column.fixed == "left") {
      var left = true;
      for (var i = columnIndex + 1; i < currentColumns.length; i++) {
        if (
          currentColumns[i].fixed &&
          currentColumns[i].fixed == "left" &&
          tableColumnKeys.value.includes(currentColumns[i].key)
        ) {
          left = false;
        }
      }
      return left ? `layui-table-fixed-left-last` : "";
    } else {
      var right = true;
      for (var i = 0; i < columnIndex; i++) {
        if (
          currentColumns[i].fixed &&
          currentColumns[i].fixed == "right" &&
          tableColumnKeys.value.includes(currentColumns[i].key)
        ) {
          right = false;
        }
      }
      return right ? `layui-table-fixed-right-first` : "";
    }
  }
};

const hasTotalRow = computed(() => {
  const checkTotalRow = (columns: any[]) => {
    for (const item of columns) {
      if (item.totalRow) {
        return true;
      }
      if (item.children && item.children.length > 0) {
        if (checkTotalRow(item.children)) {
          return true;
        }
      }
    }
    return false;
  };
  return checkTotalRow(props.columns);
});

const renderTotalRowCell = (column: any) => {
  if (column.totalRow) {
    if (column.totalRow != true) {
      return column.totalRow;
    } else {
      if (column.totalRowMethod) {
        return column.totalRowMethod(column, tableDataSource.value);
      } else {
        return totalRowMethod(column, tableDataSource.value);
      }
    }
  }
};

const totalRowMethod = (column: any, dataSource: any[]) => {
  let precision = 0;
  const values = dataSource.map((item) => Number(item[column.key]));

  values.forEach((value) => {
    const decimal = `${value}`.split(".")[1];
    precision = Math.max(precision, decimal ? decimal.length : 0);
  });

  return values.reduce((pre, next) => {
    return Number.parseFloat((pre + next).toFixed(Math.min(precision, 20)));
  }, 0);
};

const showToolbar = (toolbarName: string) => {
  if (props.defaultToolbar instanceof Array) {
    return props.defaultToolbar.includes(toolbarName);
  }
  return props.defaultToolbar;
};

const toolbarStyle = (toolbarName: string) => {
  if (props.defaultToolbar instanceof Array) {
    return { order: props.defaultToolbar.indexOf(toolbarName) } as StyleValue;
  }
};

onBeforeUnmount(() => {
  resizeInstance?.stop();
});

const getCheckData = () => {
  const ids = [tableSelectedKey.value, ...tableSelectedKeys.value];
  const checkDataSources: any[] = [];
  getCheckDataInner(ids, props.dataSource, checkDataSources);
  return checkDataSources;
};

const getCheckDataInner = (
  ids: string[],
  dataSources: any[],
  checkDataSources: any[]
) => {
  dataSources.forEach((dataSource) => {
    if (dataSource[props.childrenColumnName]) {
      getCheckDataInner(
        ids,
        dataSource[props.childrenColumnName],
        checkDataSources
      );
    }
    if (ids.includes(dataSource[props.id])) {
      const checkDataSource = { ...dataSource };
      delete checkDataSource[props.childrenColumnName];
      checkDataSources.push(checkDataSource);
    }
  });
};

const handleToolbarFilterCheck = (value: string[], column: any) => {
  column.hide = !value.some((v) => v === column.key);
};

defineExpose({ getCheckData });
</script>

<template>
  <div
    ref="tableRef"
    class="layui-form layui-border-box layui-table-view"
    :class="classes"
    :style="{ height: height, maxHeight: maxHeight }"
  >
    <div v-if="defaultToolbar || slot.toolbar" class="layui-table-tool">
      <div class="layui-table-tool-temp">
        <slot name="toolbar"></slot>
      </div>
      <div v-if="defaultToolbar" class="layui-table-tool-self">
        <!-- 筛选 -->
        <lay-dropdown v-if="showToolbar('filter')" placement="bottom-end">
          <div
            class="layui-inline"
            :title="t('table.filter')"
            lay-event
            :style="toolbarStyle('filter')"
          >
            <i class="layui-icon layui-icon-slider"></i>
          </div>
          <template #content>
            <div class="layui-table-tool-checkbox">
              <lay-checkbox
                v-for="column in tableHeadColumns[0]"
                v-model="tableColumnKeys"
                skin="primary"
                :disabled="column.children"
                :key="column.key"
                :value="column.key"
                @change="(value: string[]) => handleToolbarFilterCheck(value, column)"
                >{{ column.title }}</lay-checkbox
              >
            </div>
          </template>
        </lay-dropdown>

        <!-- 导出 -->
        <div
          v-if="showToolbar('export')"
          class="layui-inline"
          :title="t('table.export')"
          lay-event
          :style="toolbarStyle('export')"
          @click="exportData()"
        >
          <i class="layui-icon layui-icon-export"></i>
        </div>

        <!-- 打印 -->
        <div
          v-if="showToolbar('print')"
          :style="toolbarStyle('print')"
          class="layui-inline"
          :title="t('table.print')"
          lay-event
          @click="print()"
        >
          <i class="layui-icon layui-icon-print"></i>
        </div>
      </div>
    </div>

    <div class="layui-table-box-header" v-if="slot.header">
      <slot name="header"></slot>
    </div>

    <div class="layui-table-box">
      <!-- 表头 -->
      <div
        class="layui-table-header"
        :style="[{ 'padding-right': `${scrollWidthCell}px` }]"
      >
        <div class="layui-table-header-wrapper" ref="tableHeader">
          <table
            class="layui-table"
            :lay-size="size"
            :lay-skin="skin"
            ref="tableHeaderTable"
          >
            <colgroup>
              <template v-for="column in tableBodyColumns" :key="column">
                <template v-if="tableColumnKeys.includes(column.key)">
                  <col
                    :width="column.width"
                    :style="{
                      minWidth: column.minWidth ? column.minWidth : '50px',
                    }"
                  />
                </template>
              </template>
            </colgroup>
            <thead>
              <template
                v-for="(
                  tableHeadColumn, tableHeadColumnIndex
                ) in tableHeadColumns"
                :key="tableHeadColumnIndex"
              >
                <tr>
                  <template
                    v-for="(column, columnIndex) in tableHeadColumn"
                    :key="column"
                  >
                    <th
                      v-if="tableColumnKeys.includes(column.key)"
                      :colspan="column.colspan"
                      :rowspan="column.rowspan"
                      class="layui-table-cell"
                      :class="[
                        renderFixedClassName(
                          column,
                          columnIndex,
                          tableHeadColumn
                        ),
                        column.fixed ? `layui-table-fixed-${column.fixed}` : '',
                        column.type == 'checkbox'
                          ? 'layui-table-cell-checkbox'
                          : '',
                        column.type == 'radio' ? 'layui-table-cell-radio' : '',
                        column.type == 'number'
                          ? 'layui-table-cell-number'
                          : '',
                        {
                          'layui-table-is-sort': column.sort,
                        },
                      ]"
                      :style="[
                        {
                          textAlign: column.align,
                        },
                        renderHeadFixedStyle(
                          column,
                          columnIndex,
                          tableHeadColumn,
                          tableHeadColumnIndex,
                          tableHeadColumns
                        ),
                      ]"
                      @click="thSort($event, column.key)"
                    >
                      <template v-if="column.type == 'checkbox'">
                        <lay-checkbox
                          v-model="hasChecked"
                          :is-indeterminate="!allChecked"
                          skin="primary"
                          value="all"
                          @change="changeAll"
                        />
                      </template>
                      <template v-else>
                        <span>
                          <template v-if="column.titleSlot">
                            <slot
                              :name="column.titleSlot"
                              :column="column"
                              :columnIndex="columnIndex"
                            ></slot>
                          </template>
                          <template v-else>
                            {{ column.title }}
                          </template>
                        </span>
                        <!-- 插槽 -->
                        <span
                          v-if="column.sort"
                          class="layui-table-sort layui-inline"
                          :lay-sort="
                            initSort.field === column.key ? initSort.type : ''
                          "
                        >
                          <i
                            @click.stop="iconSort($event, column.key, 'asc')"
                            class="layui-edge layui-table-sort-asc"
                            title="升序"
                          ></i>
                          <i
                            @click.stop="iconSort($event, column.key, 'desc')"
                            class="layui-edge layui-table-sort-desc"
                            title="降序"
                          ></i>
                        </span>
                      </template>
                      <!-- 列宽拖动区 -->
                      <div
                        v-if="props.resize || column.resize"
                        class="lay-table-cols-resize"
                        @mousedown.stop="
                          startResize(
                            $event,
                            column,
                            tableHeaderTable,
                            tableBodyTable
                          )
                        "
                        @click.stop
                      ></div>
                    </th>
                  </template>
                </tr>
              </template>
            </thead>
          </table>
        </div>
      </div>
      <!-- 表身 -->
      <div
        class="layui-table-body layui-table-main"
        :class="{ 'layui-table-body-loading': props.loading }"
        ref="tableBody"
      >
        <table
          class="layui-table"
          v-show="loading == false"
          :class="{ 'layui-table-even': props.even }"
          :lay-size="size"
          :lay-skin="skin"
          ref="tableBodyTable"
        >
          <colgroup>
            <template
              v-for="(column, columnIndex) in tableBodyColumns"
              :key="columnIndex"
            >
              <template v-if="tableColumnKeys.includes(column.key)">
                <col
                  :width="column.width"
                  :style="{
                    minWidth: column.minWidth ? column.minWidth : '50px',
                  }"
                />
              </template>
            </template>
          </colgroup>
          <tbody>
            <!-- 渲染 -->
            <template v-for="(children, index) in tableDataSource" :key="index">
              <table-data
                :id="id"
                :index="index"
                :data="children"
                :page="page"
                :columns="tableBodyColumns"
                :columnSlotNames="columnSlotNames"
                :indent-size="indentSize"
                :currentIndentSize="currentIndentSize"
                :tableColumnKeys="tableColumnKeys"
                :expandSpace="childrenExpandSpace"
                :expandIndex="expandIndex"
                :cellStyle="cellStyle"
                :cellClassName="cellClassName"
                :rowStyle="rowStyle"
                :rowClassName="rowClassName"
                :spanMethod="spanMethod"
                :defaultExpandAll="defaultExpandAll"
                :getCheckboxProps="getCheckboxProps"
                :getRadioProps="getRadioProps"
                :childrenColumnName="childrenColumnName"
                v-model:expandKeys="tableExpandKeys"
                v-model:selectedKeys="tableSelectedKeys"
                v-model:selectedKey="tableSelectedKey"
                @row="rowClick"
                @row-double="rowDoubleClick"
                @row-contextmenu="rowContextmenu"
                @cell-double="cellDoubleClick"
                @expand-change="rowExpand"
              >
                <template
                  v-for="name in columnSlotNames"
                  #[name]="slotProp: {
                    data: any,
                    column: any,
                    row: any,
                    rowIndex: number,
                    columnIndex: number,
                  }"
                >
                  <slot
                    :name="name"
                    :row="slotProp.data"
                    :data="slotProp.data"
                    :column="slotProp.column"
                    :rowIndex="slotProp.rowIndex"
                    :columnIndex="slotProp.columnIndex"
                  >
                  </slot>
                </template>
                <template
                  v-if="slot.expand"
                  #expand="slotProp: { data: any, row: any }"
                >
                  <slot
                    name="expand"
                    :data="slotProp.data"
                    :row="slotProp.row"
                  ></slot>
                </template>
              </table-data>
            </template>
          </tbody>
        </table>

        <template v-if="tableDataSource.length == 0 && loading == false">
          <slot name="empty">
            <lay-empty :description="emptyDescription"></lay-empty>
          </slot>
          <div :style="{ width: tableBodyEmptyWidth }"></div>
        </template>
        <template v-if="loading == true">
          <!-- 根据 table 实际高度，设置 loading 位置 -->
          <div class="layui-table-loading">
            <i
              class="layui-icon-loading layui-icon layui-anim layui-anim-rotate layui-anim-loop"
            ></i>
          </div>
        </template>
      </div>
      <template v-if="hasTotalRow">
        <div class="table-total-wrapper" :style="totalWrapperStyles">
          <div class="table-total-wrapper-main" ref="tableTotal">
            <table class="layui-table">
              <colgroup>
                <template
                  v-for="(column, columnIndex) in tableBodyColumns"
                  :key="columnIndex"
                >
                  <template v-if="tableColumnKeys.includes(column.key)">
                    <col
                      :width="column.width"
                      :style="{
                        minWidth: column.minWidth ? column.minWidth : '50px',
                      }"
                    />
                  </template>
                </template>
              </colgroup>
              <tbody>
                <tr class="layui-table-total">
                  <template
                    v-for="(column, columnIndex) in tableFlattenColumns"
                    :key="columnIndex"
                  >
                    <template v-if="tableColumnKeys.includes(column.key)">
                      <td
                        :style="[
                          {
                            textAlign: column.align,
                            whiteSpace: column.ellipsisTooltip
                              ? 'nowrap'
                              : 'normal',
                          },
                          renderFixedStyle(column, columnIndex),
                        ]"
                        :class="[
                          'layui-table-cell',
                          renderFixedClassName(
                            column,
                            columnIndex,
                            tableFlattenColumns
                          ),
                          column.fixed
                            ? `layui-table-fixed-${column.fixed}`
                            : '',
                        ]"
                        v-html="renderTotalRowCell(column)"
                      ></td>
                    </template>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
      <div class="layui-table-footer" v-if="slot.footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <div
      v-if="page && page.total > 0"
      class="layui-table-page"
      :style="tablePageStyles"
    >
      <table-page
        :total="page.total"
        :pages="page.pages"
        :theme="page.theme"
        :limits="page.limits"
        :layout="page.layout"
        :disabled="page.disabled"
        :ellipsisTooltip="page.ellipsisTooltip"
        :hide-on-single-page="page.hideOnSinglePage"
        v-model:current="page.current"
        v-model:limit="page.limit"
        @change="change"
      >
      </table-page>
    </div>
  </div>
</template>
