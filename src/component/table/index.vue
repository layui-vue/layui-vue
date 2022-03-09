<script lang="ts">
export default {
  name: "LayTable",
};
</script>

<script setup lang="ts">
import { ref, watch, useSlots, withDefaults, onMounted } from "vue";
import { guid } from "../../utils/guidUtil";
import { Recordable } from "../../types";
import LayCheckbox from "../checkbox";
import LayDropdown from "../dropdown";
import LayPage from "../page";
import LayIcon from "../icon";
import "./index.less";

const tableId = guid();

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
]);

const slot = useSlots();
const slots = slot.default && slot.default();

const allChecked = ref(false);
const tableSelectedKeys = ref([...props.selectedKeys]);
const tableColumns = ref([...props.columns]);
const tableColumnKeys = ref(
  props.columns.map((item: any) => {
    return item.key;
  })
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

const rowClick = function (data: any) {
  emit("row", data);
};

const rowDoubleClick = function (data: any) {
  emit("row-double", data);
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

let tableHeader = ref<HTMLElement | null>(null);
let tableBody = ref<HTMLElement | null>(null);

onMounted(() => {
  tableBody.value?.addEventListener("scroll", () => {
    tableHeader.value!.scrollLeft = tableBody.value?.scrollLeft || 0;
  });
});
</script>

<template>
  <div :id="tableId">
    <table class="layui-hide" lay-filter="test"></table>
    <div
      class="layui-form layui-border-box layui-table-view layui-table-view-1"
    >
      <div v-if="defaultToolbar || slot.toolbar" class="layui-table-tool">
        <div v-if="slot.toolbar" class="layui-table-tool-temp">
          <slot name="toolbar"></slot>
        </div>
        <div v-if="defaultToolbar" class="layui-table-tool-self">
          <LayDropdown>
            <div class="layui-inline" title="筛选列" lay-event="LAYTABLE_COLS">
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
                  <th v-if="tableColumnKeys.includes(column.key)">
                    <div
                      class="layui-table-cell"
                      :style="{ width: column.width }"
                    >
                      <span>{{ column.title }}</span>
                    </div>
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
              <template v-for="data in dataSource" :key="data">
                <tr
                  @click.stop="rowClick(data)"
                  @dblclick.stop="rowDoubleClick(data)"
                >
                  <td v-if="checkbox" class="layui-table-col-special">
                    <div class="layui-table-cell laytable-cell-checkbox">
                      <LayCheckbox
                        v-model="tableSelectedKeys"
                        skin="primary"
                        :label="data[id]"
                      />
                    </div>
                  </td>

                  <template v-for="column in columns" :key="column">
                    <template v-if="tableColumnKeys.includes(column.key)">
                      <!-- 插 槽 Column -->
                      <template v-if="column.customSlot">
                        <td class="layui-table-cell">
                          <div :style="{ width: column.width }">
                            <slot :name="column.customSlot" :data="data"></slot>
                          </div>
                        </td>
                      </template>
                      <!-- 匹 配 Column -->
                      <template
                        v-else
                        v-for="(value, key) in data"
                        :key="value"
                      >
                        <td v-if="column.key == key" class="layui-table-cell">
                          <div :style="{ width: column.width }">
                            <span> {{ value }} </span>
                          </div>
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
