<script lang="ts">
export default {
  name: "LayTable",
};
</script>

<script setup lang="ts">
import {
  ref,
  watch,
  useSlots,
  defineProps,
  withDefaults,
  defineEmits,
} from "vue";
import { Recordable } from "../type";
import { guid } from "../../tools/guidUtil";

const tableId = guid();

const props = withDefaults(
  defineProps<{
    id?: string;
    skin?: string;
    size?: string;
    page?: Recordable;
    checkbox?: boolean;
    columns: Recordable[];
    dataSource: Recordable[];
    defaultToolbar?: boolean;
    selectedKeys?: Recordable[];
  }>(),
  {
    id: "id",
    size: "md",
    dataSource: () => [],
    selectedKeys: () => [],
  }
);

const emit = defineEmits([
  "change",
  "row",
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
          <lay-dropdown>
            <div class="layui-inline" title="筛选列" lay-event="LAYTABLE_COLS">
              <i class="layui-icon layui-icon-cols"></i>
            </div>
            <template #content>
              <div style="padding: 10px">
                <lay-checkbox
                  v-for="column in columns"
                  :key="column"
                  v-model="tableColumnKeys"
                  skin="primary"
                  :label="column.key"
                  >{{ column.title }}</lay-checkbox
                >
              </div>
            </template>
          </lay-dropdown>
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
        <!-- 表格头部 -->
        <div class="layui-table-header">
          <table class="layui-table" :lay-size="size">
            <thead>
              <tr>
                <th v-if="checkbox" class="layui-table-col-special">
                  <div class="layui-table-cell laytable-cell-checkbox">
                    <lay-checkbox
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
        <!-- 表格数据 -->
        <div class="layui-table-body layui-table-main">
          <table class="layui-table" :lay-size="size">
            <tbody>
              <template v-for="data in dataSource" :key="data">
                <tr
                  @click.stop="rowClick(data)"
                  @dblclick.stop="rowDoubleClick(data)"
                >
                  <td v-if="checkbox" class="layui-table-col-special">
                    <div class="layui-table-cell laytable-cell-checkbox">
                      <lay-checkbox
                        v-model="tableSelectedKeys"
                        skin="primary"
                        :label="data[id]"
                      />
                    </div>
                  </td>

                  <template v-for="column in columns" :key="column">
                    <template v-if="tableColumnKeys.includes(column.key)">
                      <template v-if="column.customSlot">
                        <td class="layui-table-cell">
                          <div :style="{ width: column.width }">
                            <slot :name="column.customSlot" :data="data"></slot>
                          </div>
                        </td>
                      </template>

                      <template
                        v-for="(value, key) in data"
                        v-else
                        :key="value"
                      >
                        <td v-if="column.key == key" class="layui-table-cell">
                          <div :style="{ width: column.width }">
                            <span v-if="column.slot">
                              <slot :name="column.slot" :data="data"></slot>
                            </span>
                            <span v-else> {{ value }} </span>
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
        <lay-page
          :total="page.total"
          :limit="page.limit"
          show-page
          show-limit
          show-skip
          @jump="change"
        >
          <template #prev><lay-icon type="layui-icon-left" /></template>
          <template #next><lay-icon type="layui-icon-right" /></template>
        </lay-page>
      </div>
    </div>
  </div>
</template>

<style scoped>
.laytable-cell-checkbox {
  width: 34px;
}
.layui-table-col-special {
  width: 34px;
}
</style>
