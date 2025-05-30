<script setup lang="ts">
import type { UseResizeObserverReturn } from "@vueuse/core";
import type { TableProps as _TableProps, RequiredTableProps } from "./typing";
import { useResizeObserver } from "@vueuse/core";

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowRef,
  useSlots,
  watch,
} from "vue";
import LayEmpty from "../empty/index.vue";

import TableHeader from "./components/TableHeader.vue";
import TableMain from "./components/TableMain";
import TablePage from "./components/TablePage.vue";
import TableToolbar from "./components/TableToolbar";
import TableTotal from "./components/TableTotal.vue";
import { LAY_TABLE_CONTEXT } from "./constant";

import { useTable } from "./hooks/useTable";
import { tableEmits } from "./typing";
import "./index.less";

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

const emit = defineEmits(tableEmits);
const slots = useSlots();

const {
  hierarchicalColumns,
  lastLevelAllColumns,
  lastLevelShowColumns,

  tableDataSource,

  columnsState,
  /**
   * selected
   */
  selectedState,
  expandState,

  /**
   * total
   */
  hasTotalRow,

  commonGetClasses,
  commonGetStylees,
} = useTable(props, emit);

const tableRef = shallowRef<HTMLDivElement | null>(null);

const tableBodyRef = shallowRef<HTMLDivElement | null>(null);
const tableBodyTableRef = shallowRef<HTMLElement | null>(null);
const tableBodyEmptyWidth = ref();
const tableBodyScrollWidth = ref(0);

const tableHeaderRef = shallowRef<HTMLDivElement | null>(null);
const tableHeaderTableRef = shallowRef<HTMLElement | null>(null);

const tableTotalRef = shallowRef<HTMLDivElement | null>(null);
const tableTotalTableRef = shallowRef<HTMLElement | null>(null);

const fixedLeftState = ref(false);
const fixedRightState = ref(false);

const classes = computed(() => {
  return [
    fixedLeftState.value ? "layui-table-has-fixed-left" : "",
    fixedRightState.value ? "layui-table-has-fixed-right" : "",
    {
      "layui-table-has-bottom-width": !(
        hasTotalRow.value
        || (props.page && props.page.total > 0)
        || slots.footer
      ),
    },
  ];
});

function getScrollWidth() {
  const clientWidth: number = tableBodyRef.value?.clientWidth || 0;
  const offsetWidth: number = tableBodyRef.value?.offsetWidth || 0;
  if (clientWidth < offsetWidth) {
    tableBodyScrollWidth.value = offsetWidth - clientWidth;
  }
  else {
    tableBodyScrollWidth.value = 0;
  }
  tableBodyEmptyWidth.value = `${tableHeaderTableRef.value?.offsetWidth}px`;
}

watch(
  () => [props.height, props.maxHeight, tableDataSource],
  () => {
    nextTick(() => {
      getScrollWidth();
    });
  },
);

let tableBodyRefInstance: UseResizeObserverReturn | null;
let tableHeaderTableRefInstance: UseResizeObserverReturn | null;

onMounted(() => {
  nextTick(() => {
    getScrollWidth();
  });
  getFixedColumn();

  tableBodyRef.value?.addEventListener("scroll", () => {
    // todo issue中开发者小新笔记本 滚动X轴 Y轴会出现滚动条
    // 但子元素高度未变，暂时在滚动回调中重新计算scrollWidthCell
    // https://gitee.com/layui/layui-vue/issues/I8TSK1
    getScrollWidth();

    getFixedColumn();
  });

  tableBodyRef.value?.addEventListener("transitionend", () => {
    getScrollWidth();
  });

  tableBodyRefInstance = useResizeObserver(tableBodyRef, () => {
    getScrollWidth();
    getFixedColumn();
  });

  tableHeaderTableRefInstance = useResizeObserver(tableHeaderTableRef, () => {
    getScrollWidth();
    getFixedColumn();
  });
});

onBeforeUnmount(() => {
  tableBodyRefInstance?.stop();
  tableHeaderTableRefInstance?.stop();
});

function getFixedColumn() {
  const tableBodyScrollLeft = tableBodyRef.value?.scrollLeft || 0;
  const tableBodyScrollWidth = tableBodyRef.value?.scrollWidth || 0;
  const tableBodyClientWidth = tableBodyRef.value?.clientWidth || 0;
  const tableBodyOffsetWidth = tableBodyRef.value?.offsetWidth || 0;

  if (tableHeaderRef.value) {
    tableHeaderRef.value.scrollLeft = tableBodyScrollLeft;
  }

  if (tableTotalRef.value) {
    tableTotalRef.value.scrollLeft = tableBodyScrollLeft;
  }

  if (tableBodyScrollWidth > tableBodyClientWidth) {
    // tableBody scrollBar最左边
    if (tableBodyScrollLeft === 0) {
      fixedLeftState.value = false;
      fixedRightState.value = true;
    }
    else {
      if (
        tableBodyScrollLeft + tableBodyOffsetWidth + 2
        > tableBodyScrollWidth
      ) {
        // tableBody scrollBar最左边
        fixedLeftState.value = true;
        fixedRightState.value = false;
      }
      else {
        // tableBody scrollBar 中间
        fixedLeftState.value = true;
        fixedRightState.value = true;
      }
    }
  }
  else {
    fixedLeftState.value = false;
    fixedRightState.value = false;
  }
}

const currentIndentSize = ref(0);

const childrenExpandSpace = computed(() => {
  return (
    tableDataSource.find((value: any) => {
      return value[props.childrenColumnName];
    }) !== undefined
  );
});

const tableToolbarProps = computed(() => {
  return {
    defaultToolbar: props.defaultToolbar,
    spanMethod: props.spanMethod,
    tableDataSource,
    hierarchicalColumns: hierarchicalColumns.value,
    lastLevelAllColumns: lastLevelAllColumns.value,
    tableRef: tableRef.value,
  };
});

defineExpose({ getCheckData: selectedState.getAllSelectedDataSource });

provide(LAY_TABLE_CONTEXT, {
  tableEmits: emit,
  tableProps: props as RequiredTableProps,
  tableSlots: slots,

  tableRef,
  tableBodyTableRef,
  tableHeaderRef,
  tableHeaderTableRef,
  tableTotalRef,
  tableTotalTableRef,

  tableDataSource,
  columnsState,
  selectedState,
  expandState,

  commonGetClasses,
  commonGetStylees,
});
</script>

<template>
  <div
    ref="tableRef"
    class="layui-form layui-border-box layui-table-view"
    :class="classes"
    :style="{ height, maxHeight }"
  >
    <!-- 工具栏 -->
    <TableToolbar v-bind="tableToolbarProps" />

    <div v-if="slots.header" class="layui-table-box-header">
      <slot name="header" />
    </div>

    <div class="layui-table-box">
      <!-- 表头 -->
      <TableHeader
        :last-level-show-columns="lastLevelShowColumns"
        :hierarchical-columns="hierarchicalColumns"
        :table-body-scroll-width="tableBodyScrollWidth"
      />

      <!-- 表身 -->
      <div
        ref="tableBodyRef"
        class="layui-table-body layui-table-main"
        :class="{ 'layui-table-body-loading': props.loading }"
      >
        <table
          v-show="!loading"
          ref="tableBodyTableRef"
          class="layui-table"
          :class="{ 'layui-table-even': props.even }"
          :lay-size="size"
          :lay-skin="skin"
        >
          <colgroup>
            <col
              v-for="column in lastLevelShowColumns"
              :key="column.key || column.type"
              :width="column.width"
              :style="{ minWidth: column.minWidth }"
            >
          </colgroup>
          <tbody>
            <!-- 渲染 -->
            <template
              v-for="(children, index) in tableDataSource"
              :key="children[id]"
            >
              <TableMain
                :id="id"
                :index="index"
                :data="children"
                :page="page"
                :columns="lastLevelShowColumns"
                :indent-size="indentSize"
                :current-indent-size="currentIndentSize"
                :expand-space="childrenExpandSpace"
                :expand-index="expandIndex"
                :cell-style="cellStyle"
                :cell-class-name="cellClassName"
                :row-style="rowStyle"
                :row-class-name="rowClassName"
                :span-method="spanMethod"
                :default-expand-all="defaultExpandAll"
                :get-checkbox-props="getCheckboxProps"
                :get-radio-props="getRadioProps"
                :children-column-name="childrenColumnName"
              />
            </template>
          </tbody>
        </table>

        <template v-if="tableDataSource.length === 0 && !loading">
          <slot name="empty">
            <LayEmpty :description="emptyDescription" />
          </slot>
          <div :style="{ width: tableBodyEmptyWidth }" />
        </template>
        <template v-if="loading">
          <!-- 根据 table 实际高度，设置 loading 位置 -->
          <div class="layui-table-loading">
            <i
              class="layui-icon-loading layui-icon layui-anim layui-anim-rotate layui-anim-loop"
            />
          </div>
        </template>
      </div>

      <TableTotal
        v-if="hasTotalRow"
        :last-level-show-columns="lastLevelShowColumns"
        :table-body-scroll-width="tableBodyScrollWidth"
      />

      <div v-if="slots.footer" class="layui-table-footer">
        <slot name="footer" />
      </div>
    </div>

    <div v-if="page && page.total > 0" class="layui-table-page">
      <TablePage
        v-bind="page"
        v-model:current="page.current"
        v-model:limit="page.limit"
      />
      <div v-if="slots.page" class="layui-table-page-slot">
        <slot name="page" />
      </div>
    </div>
  </div>
</template>
