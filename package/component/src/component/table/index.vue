<script lang="ts">
export default {
  name: "LayTable",
};
</script>

<script setup lang="ts">
import "./index.less";
import { ref, watch, useSlots, withDefaults, onMounted, onUpdated } from "vue";
import { v4 as uuidv4 } from "../../utils/guidUtil";
import { Recordable } from "../../types";
import { LayIcon } from "@layui/icons-vue";
import LayCheckbox from "../checkbox/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LayPage from "../page/index.vue";
import TableRow from "./TableRow.vue";

export interface LayTableProps {
  id?: string;
  skin?: string;
  size?: string;
  page?: Recordable;
  checkbox?: boolean;
  columns: Recordable[];
  dataSource: Recordable[];
  defaultToolbar?: boolean;
  selectedKeys?: Recordable[];
  indentSize?: number;
  childrenColumnName?: string;
  height?: number;
  maxHeight?: string;
  even?: boolean;
  rowClassName?: string | Function;
  cellClassName?: string | Function;
  rowStyle?: string | Function;
  cellStyle?: string | Function;
}

const props = withDefaults(defineProps<LayTableProps>(), {
  id: "id",
  size: "md",
  indentSize: 30,
  childrenColumnName: "children",
  dataSource: () => [],
  selectedKeys: () => [],
  maxHeight: "auto",
  even: false,
  rowClassName: "",
  cellClassName: "",
  rowStyle: "",
  cellStyle: "",
});

const tableId = uuidv4();

const emit = defineEmits([
  "row",
  "change",
  "row-double",
  "update:selectedKeys",
  "contextmenu",
]);

const slot = useSlots();
const slots = slot.default && slot.default();

const allChecked = ref(false);
const hasChecked = ref(false);
const tableDataSource = ref([...props.dataSource]);
const tableSelectedKeys = ref<Recordable[]>([...props.selectedKeys]);
const tableColumns = ref([...props.columns]);
const tableColumnKeys = ref(
  props.columns.map((item: any) => {
    return item.key;
  })
);

watch(
  () => props.dataSource,
  () => {
    tableDataSource.value = [...props.dataSource];
  },
  { deep: true }
);

const changeAll = function (checked: any) {
  const ids = props.dataSource.map((item: any) => {
    return item[props.id];
  });
  let arr = [...tableSelectedKeys.value];
  arr.splice(0, ids.length);
  if (checked) {
    ids.forEach((id) => {
      arr.push(id);
    });
  }
  tableSelectedKeys.value = arr;
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

const change = function (page: any) {
  emit("change", page);
};

const rowClick = function (data: any, evt: MouseEvent) {
  emit("row", data, evt);
};

const rowDoubleClick = function (data: any, evt: MouseEvent) {
  emit("row-double", data, evt);
};

const contextmenu = function (data: any, evt: MouseEvent) {
  emit("contextmenu", data, evt);
};

const print = function () {
  let subOutputRankPrint = document.getElementById(tableId) as HTMLElement;
  let newContent = subOutputRankPrint.innerHTML;
  let oldContent = document.body.innerHTML;
  document.body.innerHTML = newContent;
  window.print();
  window.location.reload();
  document.body.innerHTML = oldContent;
};

const exportData = () => {
  const head: any = [];
  const body: any = [];
  tableColumns.value.forEach((item) => {
    try {
      tableDataSource.value.forEach((dataItem) => {
        if (dataItem[item.key] != undefined) {
          head.push(item.title);
          throw new Error("exception");
        }
      });
    } catch (e) {}
  });
  tableDataSource.value.forEach((item) => {
    let obj: any = [];
    tableColumns.value.forEach((tableColumn) => {
      Object.keys(item).forEach((name) => {
        if (tableColumn.key === name) {
          obj.push(item[name]);
        }
      });
    });
    body.push(obj);
  });
  exportToExcel(head, body);
  return;
};

function exportToExcel(headerList: any, bodyList: any) {
  let excelList = [];
  excelList.push(headerList.join("\t,"));
  excelList.push("\n");
  bodyList.forEach((item: any) => {
    excelList.push(item.join("\t,"));
    excelList.push("\n");
  });
  var merged = excelList.join("");
  let link = document.createElement("a");
  link.href = "data:text/xls;charset=utf-8,\ufeff" + encodeURIComponent(merged);
  link.download = `table.xls`;
  link.click();
}

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

let tableHeader = ref<HTMLElement | null>(null);
let tableBody = ref<HTMLElement | null>(null);
let scrollWidthCell = ref(0);

onMounted(() => {
  const scrollWidth: number = tableBody.value?.scrollWidth || 0;
  const offsetWidth: number = tableBody.value?.offsetWidth || 0;

  if (scrollWidth < offsetWidth) {
    scrollWidthCell.value = offsetWidth - scrollWidth;
  }
  tableBody.value?.addEventListener("scroll", () => {
    tableHeader.value!.scrollLeft = tableBody.value?.scrollLeft || 0;
  });
});

const slotsData = ref<string[]>([]);

props.columns.map((value: any) => {
  if (value.customSlot) {
    slotsData.value.push(value.customSlot);
  }
});

const childrenExpandSpace = ref(false);
const currentIndentSize = ref(0);

props.dataSource.map((value: any) => {
  if (value[props.childrenColumnName]) {
    childrenExpandSpace.value = true;
  }
});
</script>

<template>
  <div :id="tableId">
    <table class="layui-hide" lay-filter="test"></table>
    <div class="layui-form layui-border-box layui-table-view">
      <!-- 工具栏 -->
      <div v-if="defaultToolbar || slot.toolbar" class="layui-table-tool">
        <div v-if="slot.toolbar" class="layui-table-tool-temp">
          <slot name="toolbar"></slot>
        </div>
        <div v-if="defaultToolbar" class="layui-table-tool-self">
          <lay-dropdown>
            <div class="layui-inline" title="筛选列" lay-event="LAYTABLE_PRINT">
              <i class="layui-icon layui-icon-cols"></i>
            </div>
            <template #content>
              <div style="padding: 10px">
                <lay-checkbox
                  v-for="column in columns"
                  v-model="tableColumnKeys"
                  skin="primary"
                  :key="column.key"
                  :label="column.key"
                  >{{ column.title }}</lay-checkbox
                >
              </div>
            </template>
          </lay-dropdown>
          <div
            class="layui-inline"
            title="导出"
            lay-event="LAYTABLE_PRINT"
            @click="exportData()"
          >
            <i class="layui-icon layui-icon-export"></i>
          </div>
          <div
            class="layui-inline"
            title="打印"
            lay-event="LAYTABLE_PRINT"
            @click="print()"
          >
            <i class="layui-icon layui-icon-print"></i>
          </div>
        </div>
      </div>

      <div class="layui-table-box">
        <!-- 表头 -->
        <div class="layui-table-header" ref="tableHeader">
          <table class="layui-table" :lay-size="size" :lay-skin="skin">
            <colgroup>
              <col v-if="checkbox" class="layui-table-col-special" />
              <template v-for="column in columns" :key="column">
                <col
                  :width="column.width"
                  :style="{
                    minWidth: column.minWidth ? column.minWidth : '100px',
                  }"
                />
              </template>
              <col v-if="scrollWidthCell > 0" :width="scrollWidthCell" />
            </colgroup>
            <thead>
              <tr>
                <th v-if="checkbox" class="layui-table-col-special">
                  <div class="layui-table-cell laytable-cell-checkbox">
                    <lay-checkbox
                      v-model="hasChecked"
                      :is-indeterminate="!allChecked"
                      skin="primary"
                      label="all"
                      @change="changeAll"
                    />
                  </div>
                </th>
                <template v-for="column in columns" :key="column">
                  <th
                    v-if="tableColumnKeys.includes(column.key)"
                    class="layui-table-cell"
                    :class="[
                      column.fixed ? `layui-table-fixed-${column.fixed}` : '',
                    ]"
                    :style="{
                      textAlign: column.align,
                    }"
                  >
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
                        @click.stop="sortTable($event, column.key, 'desc')"
                        class="layui-edge layui-table-sort-desc"
                        title="降序"
                      ></i>
                    </span>
                  </th>
                </template>
                <th
                  v-if="scrollWidthCell > 0"
                  :style="{
                    padding: 0,
                    width: `${scrollWidthCell}px`,
                  }"
                ></th>
              </tr>
            </thead>
          </table>
        </div>
        <!-- 表身 -->
        <div
          class="layui-table-body layui-table-main"
          :style="{ height: height, maxHeight: maxHeight }"
          ref="tableBody"
        >
          <table
            class="layui-table"
            :class="{ 'layui-table-even': props.even }"
            :lay-size="size"
            :lay-skin="skin"
          >
            <colgroup>
              <col v-if="checkbox" class="layui-table-col-special" />
              <template v-for="column in columns" :key="column">
                <col
                  :width="column.width"
                  :style="{
                    minWidth: column.minWidth ? column.minWidth : '100px',
                  }"
                />
              </template>
            </colgroup>
            <tbody>
              <!-- 渲染 -->
              <template v-for="(data, index) in tableDataSource" :key="data">
                <table-row
                  :id="id"
                  :index="index"
                  :data="data"
                  :columns="columns"
                  :checkbox="checkbox"
                  :indent-size="indentSize"
                  :currentIndentSize="currentIndentSize"
                  :tableColumnKeys="tableColumnKeys"
                  :expandSpace="childrenExpandSpace"
                  :cellStyle="cellStyle"
                  :cellClassName="cellClassName"
                  :rowStyle="rowStyle"
                  :rowClassName="rowClassName"
                  @row="rowClick"
                  @row-double="rowDoubleClick"
                  @contextmenu="contextmenu"
                  v-model:selectedKeys="tableSelectedKeys"
                >
                  <template v-for="name in slotsData" #[name]>
                    <slot :name="name" :data="data"></slot>
                  </template>
                  <template v-if="slot.expand" #expand>
                    <slot name="expand" :data="data"></slot>
                  </template>
                </table-row>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="page" class="layui-table-page">
        <lay-page
          :total="page.total"
          :limit="page.limit"
          v-model="page.current"
          show-page
          show-limit
          show-skip
          @jump="change"
        >
          <template #prev>
            <lay-icon type="layui-icon-left" />
          </template>
          <template #next>
            <lay-icon type="layui-icon-right" />
          </template>
        </lay-page>
      </div>
    </div>
  </div>
</template>
