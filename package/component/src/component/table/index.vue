<script lang="ts">
export default {
  name: "LayTable",
};
</script>

<script setup lang="ts">
import "./index.less";
import {
  ref,
  watch,
  useSlots,
  withDefaults,
  onMounted,
  StyleValue,
  WritableComputedRef,
  computed,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { Recordable } from "../../types";
import LayCheckbox from "../checkbox/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LayEmpty from "../empty/index.vue";
import TableData from "./TableData.vue";
import TablePage from "./TablePage.vue";
import useTable from "./composables/useTable";
import { TableEmit } from "./typing";

export interface TableProps {
  id?: string;
  skin?: string;
  size?: string;
  page?: Recordable;
  columns: Recordable[];
  dataSource: Recordable[];
  defaultToolbar?: boolean | any[];
  selectedKey?: string;
  selectedKeys?: Recordable[];
  indentSize?: number;
  childrenColumnName?: string;
  height?: number;
  maxHeight?: string;
  even?: boolean;
  expandIndex?: number;
  rowClassName?: string | Function;
  cellClassName?: string | Function;
  rowStyle?: string | Function;
  cellStyle?: string | Function;
  spanMethod?: Function;
  defaultExpandAll?: boolean;
  expandKeys?: Recordable[];
  loading?: boolean;
  getCheckboxProps?: Function;
  getRadioProps?: Function;
}

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
});

const emit = defineEmits(TableEmit);

const slot = useSlots();
const slots = slot.default && slot.default();
const tableRef = ref();

const s = "";
const allChecked = ref(false);
const hasChecked = ref(false);
const tableDataSource = ref<any[]>([...props.dataSource]);
const tableColumns = computed(() => {
  return [...props.columns];
});

const tableColumnKeys = ref<any[]>([]);
const tableHeadColumns = ref<any[]>([]);
const tableBodyColumns = ref<any[]>([]);

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
 * 计算标题列
 *
 * @param level 层级, 用于决定会被 push 到的目标数组
 */
const findFinalNode = (level: number, columns: any[]) => {
  columns.forEach((column) => {
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
      findFinalNode(level + 1, column.children);
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

const tableExpandKeys = ref<Recordable[]>([...props.expandKeys]);
const tableSelectedKeys = ref<Recordable[]>([...props.selectedKeys]);

/**
 * 监听 columns 变化
 */
watch(
  tableColumns,
  () => {
    tableColumnKeys.value = [];
    tableBodyColumns.value = [];
    tableHeadColumns.value = [];

    findFindNode(tableColumns.value);
    findFindNodes(tableColumns.value);
    findFinalNode(0, tableColumns.value);
  },
  { immediate: true }
);

watch(
  () => props.selectedKeys,
  () => {
    tableSelectedKeys.value = props.selectedKeys;
  },
  { deep: true }
);

watch(
  () => props.expandKeys,
  () => {
    tableExpandKeys.value = props.expandKeys;
  },
  { deep: true }
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
    tableSelectedKeys.value = [];
    tableSelectedKey.value = s;
  },
  { deep: true }
);

const changeAll = (isChecked: boolean) => {
  if (isChecked) {
    const datasources = props.dataSource.filter((item: any, index: number) => {
      return !props.getCheckboxProps(item, index)?.disabled;
    });
    const ids = datasources.map((item) => {
      return item[props.id];
    });
    tableSelectedKeys.value = [...ids];
  } else {
    tableSelectedKeys.value = [];
  }
};

watch(
  tableSelectedKeys,
  () => {
    if (tableSelectedKeys.value.length === props.dataSource.length) {
      allChecked.value = true;
    } else {
      allChecked.value = false;
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

watch(
  tableExpandKeys,
  () => {
    emit("update:expandKeys", tableExpandKeys.value);
  },
  { deep: true, immediate: true }
);

const change = function (page: any) {
  emit("change", page);
};

const rowClick = function (data: any, evt: MouseEvent) {
  emit("row", data, evt);
};

const rowDoubleClick = function (data: any, evt: MouseEvent) {
  emit("row-double", data, evt);
};

const rowContextmenu = (data: any, evt: MouseEvent) => {
  emit("row-contextmenu", data, evt);
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
      tableStr += `<td colspan=${column.colspan} rowspan=${column.rowspan}>${column.title}</td>`;
    }
    tableStr += "</tr>";
  }
  tableDataSource.value.forEach((item, rowIndex) => {
    tableStr += "<tr>";
    tableBodyColumns.value.forEach((tableColumn, columnIndex) => {
      Object.keys(item).forEach((name) => {
        if (tableColumn.key === name) {
          const rowColSpan = props.spanMethod(
            item,
            tableColumn,
            rowIndex,
            columnIndex
          );
          const rowspan = rowColSpan ? rowColSpan[0] : 1;
          const colspan = rowColSpan ? rowColSpan[1] : 1;
          if (rowspan != 0 && colspan != 0) {
            tableStr += `<td colspan=${colspan} rowspan=${rowspan}>${item[name]}</td>`;
          }
        }
      });
    });
    tableStr += "</tr>";
  });
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

// 列排序
const sortTable = (e: any, key: string, sort: string) => {
  let currentSort = e.target.parentNode.getAttribute("lay-sort");
  if (sort === "desc") {
    if (currentSort === sort) {
      e.target.parentNode.setAttribute("lay-sort", "");
      tableDataSource.value = [...props.dataSource];
    } else {
      e.target.parentNode.setAttribute("lay-sort", "desc");
      tableDataSource.value.sort((x, y) => {
        if (x[key] < y[key]) return 1;
        else if (x[key] > y[key]) return -1;
        else return 0;
      });
    }
  } else {
    if (currentSort === sort) {
      e.target.parentNode.setAttribute("lay-sort", "");
      tableDataSource.value = [...props.dataSource];
    } else {
      e.target.parentNode.setAttribute("lay-sort", "asc");
      tableDataSource.value.sort((x, y) => {
        if (x[key] < y[key]) return -1;
        else if (x[key] > y[key]) return 1;
        else return 0;
      });
    }
  }
};

let tableBody = ref<HTMLElement | null>(null);
let tableHeader = ref<HTMLElement | null>(null);
let tableHeaderTable = ref<HTMLElement | null>(null);
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
  ];
});

watch(
  () => [props.height, props.maxHeight, props.dataSource],
  () => {
    nextTick(() => {
      getScrollWidth();
    });
  }
);

onMounted(() => {
  getScrollWidth();
  getFixedColumn();

  tableBody.value?.addEventListener("scroll", () => {
    getFixedColumn();
  });

  tableBody.value?.addEventListener("transitionend", () => {
    getScrollWidth();
  });

  window.onresize = () => {
    getScrollWidth();
    getFixedColumn();
  };
});

const getFixedColumn = () => {
  tableHeader.value!.scrollLeft = tableBody.value?.scrollLeft || 0;
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

const { columnSlotNames } = useTable(props);

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
  return {} as StyleValue;
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
  return {} as StyleValue;
};

/**
 * @remark 排除 hide 列
 */
const renderFixedClassName = (column: any, columnIndex: number) => {
  if (column.fixed) {
    if (column.fixed == "left") {
      var left = true;
      for (var i = columnIndex + 1; i < props.columns.length; i++) {
        if (
          props.columns[i].fixed &&
          props.columns[i].fixed == "left" &&
          tableColumnKeys.value.includes(props.columns[i].key)
        ) {
          left = false;
        }
      }
      return left ? `layui-table-fixed-left-last` : "";
    } else {
      var right = true;
      for (var i = 0; i < columnIndex; i++) {
        if (
          props.columns[i].fixed &&
          props.columns[i].fixed == "right" &&
          tableColumnKeys.value.includes(props.columns[i].key)
        ) {
          right = false;
        }
      }
      return right ? `layui-table-fixed-right-first` : "";
    }
  }
};

const hasTotalRow = computed(() => {
  let b = false;
  props.columns.forEach((item) => {
    if (item.totalRow) {
      b = true;
    }
  });
  return b;
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
  let total = 0;
  dataSource.forEach((item) => {
    total = total + Number(item[column.key]);
  });
  return total;
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
  window.onresize = null;
});
</script>

<template>
  <div ref="tableRef">
    <table class="layui-hide" lay-filter="test"></table>
    <div class="layui-form layui-border-box layui-table-view" :class="classes">
      <div v-if="defaultToolbar || slot.toolbar" class="layui-table-tool">
        <div class="layui-table-tool-temp">
          <slot name="toolbar"></slot>
        </div>
        <div v-if="defaultToolbar" class="layui-table-tool-self">
          <!-- 筛选 -->
          <lay-dropdown
            v-if="showToolbar('filter')"
            updateAtScroll
            :style="toolbarStyle('filter')"
          >
            <div class="layui-inline" title="筛选" lay-event>
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
                  >{{ column.title }}</lay-checkbox
                >
              </div>
            </template>
          </lay-dropdown>

          <!-- 导出 -->
          <div
            v-if="showToolbar('export')"
            class="layui-inline"
            title="导出"
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
            title="打印"
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
                          renderFixedClassName(column, columnIndex),
                          column.fixed
                            ? `layui-table-fixed-${column.fixed}`
                            : '',
                          column.type == 'checkbox'
                            ? 'layui-table-cell-checkbox'
                            : '',
                          column.type == 'radio'
                            ? 'layui-table-cell-radio'
                            : '',
                          column.type == 'number'
                            ? 'layui-table-cell-number'
                            : '',
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
                              <slot :name="column.titleSlot"></slot>
                            </template>
                            <template v-else>
                              {{ column.title }}
                            </template>
                          </span>
                          <!-- 插槽 -->
                          <span
                            v-if="column.sort"
                            class="layui-table-sort layui-inline"
                            lay-sort
                          >
                            <i
                              @click.stop="sortTable($event, column.key, 'asc')"
                              class="layui-edge layui-table-sort-asc"
                              title="升序"
                            ></i>
                            <i
                              @click.stop="
                                sortTable($event, column.key, 'desc')
                              "
                              class="layui-edge layui-table-sort-desc"
                              title="降序"
                            ></i>
                          </span>
                        </template>
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
          :style="{ height: height, maxHeight: maxHeight }"
          ref="tableBody"
        >
          <table
            class="layui-table"
            v-if="tableDataSource.length > 0 && loading == false"
            :class="{ 'layui-table-even': props.even }"
            :lay-size="size"
            :lay-skin="skin"
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
              <template
                v-for="(children, index) in tableDataSource"
                :key="index"
              >
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
                  v-model:expandKeys="tableExpandKeys"
                  v-model:selectedKeys="tableSelectedKeys"
                  v-model:selectedKey="tableSelectedKey"
                  @row="rowClick"
                  @row-double="rowDoubleClick"
                  @row-contextmenu="rowContextmenu"
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
              <tr v-if="hasTotalRow" class="layui-table-total">
                <template
                  v-for="(column, columnIndex) in columns"
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
                        renderFixedClassName(column, columnIndex),
                        column.fixed ? `layui-table-fixed-${column.fixed}` : '',
                      ]"
                      v-html="renderTotalRowCell(column)"
                    ></td>
                  </template>
                </template>
              </tr>
            </tbody>
          </table>
          <template v-if="tableDataSource.length == 0 && loading == false">
            <lay-empty></lay-empty>
            <div :style="{ width: tableBodyEmptyWidth }"></div>
          </template>
          <template v-if="loading == true">
            <div class="layui-table-loading">
              <i
                class="layui-icon-loading layui-icon layui-anim layui-anim-rotate layui-anim-loop"
              ></i>
            </div>
          </template>
        </div>
        <div class="layui-table-footer" v-if="slot.footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <div v-if="page && page.total > 0" class="layui-table-page">
        <table-page
          :total="page.total"
          :pages="page.pages"
          :theme="page.theme"
          :limits="page.limits"
          :showSkip="page.showSkip"
          :show-page="page.showPage"
          :showRefresh="page.showRefresh"
          :showLimit="page.showLimit"
          :showCount="page.showCount"
          v-model:current="page.current"
          v-model:limit="page.limit"
          @change="change"
        >
        </table-page>
      </div>
    </div>
  </div>
</template>
