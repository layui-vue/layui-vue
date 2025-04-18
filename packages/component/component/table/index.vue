<script setup lang="ts">
import "./index.less";
import type { TableProps as _TableProps, RequiredTableProps } from "./typing";

import {
  ref,
  watch,
  useSlots,
  onMounted,
  computed,
  onBeforeUnmount,
  nextTick,
  shallowRef,
  provide,
} from "vue";
import { useResizeObserver, type UseResizeObserverReturn } from "@vueuse/core";

import LayEmpty from "../empty/index.vue";
import TableMain from "./components/TableMain";
import TableHeader from "./components/TableHeader.vue";
import TablePage from "./components/TablePage.vue";
import TableToolbar from "./components/TableToolbar.vue";
import TableTotal from "./components/TableTotal.vue";

import { useTable } from "./hooks/useTable";
import { tableEmits } from "./typing";
import { LAY_TABLE_CONTEXT } from "./constant";

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
        hasTotalRow.value ||
        (props.page && props.page.total > 0) ||
        slots.footer
      ),
    },
  ];
});

function getScrollWidth() {
  const clientWidth: number = tableBodyRef.value?.clientWidth || 0;
  const offsetWidth: number = tableBodyRef.value?.offsetWidth || 0;
  if (clientWidth < offsetWidth) {
    tableBodyScrollWidth.value = offsetWidth - clientWidth;
  } else {
    tableBodyScrollWidth.value = 0;
  }
  tableBodyEmptyWidth.value = tableHeaderTableRef.value?.offsetWidth + "px";
}

watch(
  () => [props.height, props.maxHeight, tableDataSource],
  () => {
    nextTick(() => {
      getScrollWidth();
    });
  }
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
    if (tableBodyScrollLeft == 0) {
      fixedLeftState.value = false;
      fixedRightState.value = true;
    } else {
      if (
        tableBodyScrollLeft + tableBodyOffsetWidth + 2 >
        tableBodyScrollWidth
      ) {
        // tableBody scrollBar最左边
        fixedLeftState.value = true;
        fixedRightState.value = false;
      } else {
        // tableBody scrollBar 中间
        fixedLeftState.value = true;
        fixedRightState.value = true;
      }
    }
  } else {
    fixedLeftState.value = false;
    fixedRightState.value = false;
  }
}

const currentIndentSize = ref(0);

const childrenExpandSpace = computed(() => {
  return (
    tableDataSource.find((value: any) => {
      if (value[props.childrenColumnName]) {
        return true;
      }
    }) != undefined
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
    :style="{ height: height, maxHeight: maxHeight }"
  >
    <!-- 工具栏 -->
    <TableToolbar v-bind="tableToolbarProps"></TableToolbar>

    <div class="layui-table-box-header" v-if="slots.header">
      <slot name="header"></slot>
    </div>

    <div class="layui-table-box">
      <!-- 表头 -->
      <TableHeader
        :lastLevelShowColumns="lastLevelShowColumns"
        :hierarchicalColumns="hierarchicalColumns"
        :tableBodyScrollWidth="tableBodyScrollWidth"
      ></TableHeader>

      <!-- 表身 -->
      <div
        class="layui-table-body layui-table-main"
        :class="{ 'layui-table-body-loading': props.loading }"
        ref="tableBodyRef"
      >
        <table
          class="layui-table"
          v-show="loading == false"
          :class="{ 'layui-table-even': props.even }"
          :lay-size="size"
          :lay-skin="skin"
          ref="tableBodyTableRef"
        >
          <colgroup>
            <col
              v-for="column in lastLevelShowColumns"
              :key="column.key || column.type"
              :width="column.width"
              :style="{ minWidth: column.minWidth }"
            />
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
                :currentIndentSize="currentIndentSize"
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
              >
              </TableMain>
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

      <TableTotal
        v-if="hasTotalRow"
        :lastLevelShowColumns="lastLevelShowColumns"
        :tableBodyScrollWidth="tableBodyScrollWidth"
      ></TableTotal>

      <div class="layui-table-footer" v-if="slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>

    <div v-if="page && page.total > 0" class="layui-table-page">
      <TablePage
        v-bind="page"
        v-model:current="page.current"
        v-model:limit="page.limit"
      >
      </TablePage>
      <div class="layui-table-page-slot" v-if="slots.page">
        <slot name="page"></slot>
      </div>
    </div>
  </div>
</template>
