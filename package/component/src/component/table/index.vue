<script lang="ts">
export default {
  name: "LayTable",
};
</script>

<script setup lang="ts">
import { ref, watch, useSlots, withDefaults, onMounted } from "vue";
import { v4 as uuidv4 } from "../../utils/guidUtil";
import { Recordable } from "../../types";
import LayCheckbox from "../checkbox/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LayPage from "../page/index.vue";
import { LayIcon } from "@layui/icons-vue";
import "./index.less";

const tableId = uuidv4();

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
}

const props = withDefaults(defineProps<LayTableProps>(), {
  id: "id",
  size: "md",
  dataSource: () => [],
  selectedKeys: () => [],
});

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
const tableDataSource = ref([...props.dataSource]);
const tableSelectedKeys = ref([...props.selectedKeys]);
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
  tableSelectedKeys.value.splice(0, ids.length);
  if (checked) {
    ids.forEach((id) => {
      tableSelectedKeys.value.push(id);
    });
  }
  emit("update:selectedKeys", tableSelectedKeys.value);
};

watch(
  tableSelectedKeys,
  function () {
    if (tableSelectedKeys.value.length === props.dataSource.length) {
      allChecked.value = true;
    } else {
      allChecked.value = false;
    }
    emit("update:selectedKeys", tableSelectedKeys.value);
  },
  { deep: true }
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

// 打印 table 数据
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
  const head = [];
  const body = [];
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
    let obj = [];
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

function exportToExcel(headerList, bodyList) {
  let excelList = [];
  excelList.push(headerList.join("\t,"));
  excelList.push("\n");
  bodyList.forEach((item) => {
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
  // 当前排序
  let currentSort = e.target.parentNode.getAttribute("lay-sort");
  // 点击排序
  if (sort === "desc") {
    if (currentSort === sort) {
      // 取消排序
      e.target.parentNode.setAttribute("lay-sort", "");
      tableDataSource.value = [...props.dataSource];
    } else {
      // 进行 desc 排序
      e.target.parentNode.setAttribute("lay-sort", "desc");
      tableDataSource.value.sort((x, y) => {
        if (x[key] < y[key]) return 1;
        else if (x[key] > y[key]) return -1;
        else return 0;
      });
    }
  } else {
    if (currentSort === sort) {
      // 取消排序
      e.target.parentNode.setAttribute("lay-sort", "");
      tableDataSource.value = [...props.dataSource];
    } else {
      // 进行 asc 排序
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

// 拖动监听
onMounted(() => {
  tableBody.value?.addEventListener("scroll", () => {
    tableHeader.value!.scrollLeft = tableBody.value?.scrollLeft || 0;
  });
});
</script>

<template>
  <div :id="tableId">
    <table class="layui-hide" lay-filter="test"></table>
    <div class="layui-form layui-border-box layui-table-view">
      <div v-if="defaultToolbar || slot.toolbar" class="layui-table-tool">
        <div v-if="slot.toolbar" class="layui-table-tool-temp">
          <slot name="toolbar"></slot>
        </div>
        <div v-if="defaultToolbar" class="layui-table-tool-self">
          <LayDropdown>
            <div class="layui-inline" title="筛选列" lay-event="LAYTABLE_PRINT">
              <i class="layui-icon layui-icon-cols"></i>
            </div>
            <template #content>
              <div style="padding: 10px">
                <LayCheckbox
                  v-for="column in columns"
                  :key="column"
                  v-model="tableColumnKeys"
                  skin="primary"
                  :label="column.key"
                  >{{ column.title }}</LayCheckbox
                >
              </div>
            </template>
          </LayDropdown>
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
        <!-- table header -->
        <div class="layui-table-header" ref="tableHeader">
          <table class="layui-table" :lay-size="size">
            <thead>
              <tr>
                <th v-if="checkbox" class="layui-table-col-special">
                  <div class="layui-table-cell laytable-cell-checkbox">
                    <LayCheckbox
                      v-model="allChecked"
                      skin="primary"
                      label="all"
                      @change="changeAll"
                    />
                  </div>
                </th>
                <template v-for="column in columns" :key="column">
                  <th
                    class="layui-table-cell"
                    :style="{
                      textAlign: column.align,
                      flex: column.width ? '0 0 ' + column.width : '1',
                    }"
                    v-if="tableColumnKeys.includes(column.key)"
                  >
                    <span>
                      <template v-if="column.titleSlot">
                        <slot :name="column.titleSlot"></slot>
                      </template>
                      <template v-else>
                        {{ column.title }}
                      </template>
                    </span>
                    <span
                      v-if="column.sort"
                      class="layui-table-sort layui-inline"
                      lay-sort=""
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
              </tr>
            </thead>
          </table>
        </div>
        <!-- table body -->
        <div class="layui-table-body layui-table-main" ref="tableBody">
          <table class="layui-table" :lay-size="size">
            <tbody>
              <template v-for="data in tableDataSource" :key="data">
                <!-- sub table impl -->
                <tr
                  @click.stop="rowClick(data, $event)"
                  @dblclick.stop="rowDoubleClick(data, $event)"
                  @contextmenu.stop="contextmenu(data, $event)"
                >
                  <!-- 复选框 -->
                  <td v-if="checkbox" class="layui-table-col-special">
                    <div class="layui-table-cell laytable-cell-checkbox">
                      <LayCheckbox
                        v-model="tableSelectedKeys"
                        skin="primary"
                        :label="data[id]"
                      />
                    </div>
                  </td>

                  <!-- 数据列 -->
                  <template v-for="column in columns" :key="column">
                    <template v-if="tableColumnKeys.includes(column.key)">
                      <!-- 插 槽 Column -->
                      <template v-if="column.customSlot">
                        <td
                          class="layui-table-cell"
                          :style="{
                            textAlign: column.align,
                            flex: column.width ? '0 0 ' + column.width : '1',
                          }"
                        >
                          <slot :name="column.customSlot" :data="data"></slot>
                        </td>
                      </template>
                      <!-- 匹 配 Column -->
                      <template
                        v-else
                        v-for="(value, key) in data"
                        :key="value"
                      >
                        <td
                          v-if="column.key == key"
                          class="layui-table-cell"
                          :style="{
                            textAlign: column.align,
                            flex: column.width ? '0 0 ' + column.width : '1',
                          }"
                        >
                          <span> {{ value }} </span>
                        </td>
                      </template>
                    </template>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="page" class="layui-table-page">
        <LayPage
          :total="page.total"
          :limit="page.limit"
          v-model="page.current"
          show-page
          show-limit
          show-skip
          @jump="change"
        >
          <template #prev><LayIcon type="layui-icon-left" /></template>
          <template #next><LayIcon type="layui-icon-right" /></template>
        </LayPage>
      </div>
    </div>
  </div>
</template>
