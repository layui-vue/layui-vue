<script lang="ts">
export default {
  name: "TableRow",
};
</script>

<script lang="ts" setup>
import { computed, ref, useSlots, WritableComputedRef } from "vue";
import { Recordable } from "../../types";

export interface LayTableRowProps {
  selectedKeys: Recordable[];
  tableColumnKeys: Recordable[];
  columns: Recordable[];
  checkbox?: boolean;
  id: string;
  data: any;
}

const slot = useSlots();
const emit = defineEmits([
  "row",
  "row-double",
  "contextmenu",
  "update:selectedKeys",
]);

const props = withDefaults(defineProps<LayTableRowProps>(), {
  checkbox: false
});

const tableSelectedKeys: WritableComputedRef<Recordable[]> = computed({
  get() {
    return [...props.selectedKeys];
  },
  set(val) {
    emit("update:selectedKeys", val);
  },
});

const isExpand = ref(false);
const slotsData = ref<string[]>([]);

props.columns.map((value: any) => {
  if (value.customSlot) {
    slotsData.value.push(value.customSlot);
  }
});

const rowClick = function (data: any, evt: MouseEvent) {
  emit("row", data, evt);
};

const rowDoubleClick = function (data: any, evt: MouseEvent) {
  emit("row-double", data, evt);
};

const contextmenu = function (data: any, evt: MouseEvent) {
  emit("contextmenu", data, evt);
};

const expandIconType = computed(() => {
  return isExpand.value ? "layui-icon-subtraction" : "layui-icon-addition";
});

const handleExpand = () => {
  isExpand.value = !isExpand.value;
};
</script>

<template>
  <tr
    @click.stop="rowClick(data, $event)"
    @dblclick.stop="rowDoubleClick(data, $event)"
    @contextmenu.stop="contextmenu(data, $event)"
  >
    <!-- 复选框 -->
    <td v-if="checkbox" class="layui-table-col-special">
      <div class="layui-table-cell laytable-cell-checkbox">
        <lay-checkbox
          v-model="tableSelectedKeys"
          :label="data[id]"
          skin="primary"
        />
      </div>
    </td>

    <!-- 数据列 -->
    <template v-for="(column, index) in columns" :key="column">
      <!-- 展示否 -->
      <template v-if="tableColumnKeys.includes(column.key)">
        <!-- 插槽列 -->
        <template v-if="column.customSlot">
          <td
            class="layui-table-cell"
            :style="{
              textAlign: column.align,
              width: column.width ? column.width : '0',
              minWidth: column.minWidth ? column.minWidth : '47px',
              whiteSpace: column.ellipsisTooltip ? 'nowrap' : 'normal',
            }"
          >
            <lay-icon
              v-if="(slot.expand || data.children) && index === 0"
              class="layui-table-cell-expand-icon"
              :type="expandIconType"
              @click="handleExpand"
            ></lay-icon>

            <lay-tooltip
              v-if="column.ellipsisTooltip"
              :content="data[column.key]"
              :isAutoShow="true"
            >
              <slot :name="column.customSlot" :data="data"></slot>
            </lay-tooltip>
            <slot v-else :name="column.customSlot" :data="data"></slot>
          </td>
        </template>

        <!-- 匹 配 Column -->
        <template v-else>
          <template v-if="column.key in data">
            <td
              class="layui-table-cell"
              :style="{
                textAlign: column.align,
                width: column.width ? column.width : '0',
                minWidth: column.minWidth ? column.minWidth : '47px',
                whiteSpace: column.ellipsisTooltip ? 'nowrap' : 'normal',
              }"
            >
              <lay-icon
                v-if="(slot.expand || data.children) && index === 0"
                class="layui-table-cell-expand-icon"
                :type="expandIconType"
                @click="handleExpand"
              ></lay-icon>

              <lay-tooltip
                v-if="column.ellipsisTooltip"
                :content="data[column.key]"
                :isAutoShow="true"
              >
                {{ data[column.key] }}
              </lay-tooltip>
              <span v-else> {{ data[column.key] }} </span>
            </td>
          </template>
        </template>
      </template>
    </template>
  </tr>

  <!-- 嵌套表单 -->
  <tr class="layui-table-cell-expand" v-if="slot.expand && isExpand">
    <slot name="expand"></slot>
  </tr>

  <!-- 树形结构 -->
  <template v-if="data.children && isExpand">
    <template v-for="(children, index) in data.children" :key="index">
      <table-row
        :id="id"
        :data="children"
        :columns="columns"
        :checkbox="checkbox"
        :tableColumnKeys="tableColumnKeys"
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
  </template>
</template>
