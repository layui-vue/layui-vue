<script lang="ts">
export default {
  name: "TableRow",
};
</script>

<script lang="ts" setup>
import { Recordable } from "../../types";
import { computed, ref, StyleValue, useSlots, WritableComputedRef } from "vue";
import LayCheckbox from "../checkbox/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LayTooltip from "../tooltip/index.vue";
import { LayIcon } from "@layui/icons-vue";

export interface LayTableRowProps {
  index: number;
  indentSize: number;
  currentIndentSize: number;
  expandSpace: boolean;
  expandIndex: number;
  selectedKeys: Recordable[];
  selectedKey: any;
  tableColumnKeys: Recordable[];
  childrenColumnName?: string;
  columns: Recordable[];
  checkbox?: boolean;
  cellClassName: string | Function;
  cellStyle: string | Function;
  rowClassName: string | Function;
  rowStyle: string | Function;
  id: string;
  data: any;
}

const slot = useSlots();
const emit = defineEmits([
  "row",
  "row-double",
  "contextmenu",
  "update:selectedKeys",
  "update:selectedKey",
]);

const props = withDefaults(defineProps<LayTableRowProps>(), {
  checkbox: false,
  childrenColumnName: "children",
  cellStyle: "",
  cellClassName: "",
});

const tableSelectedKeys: WritableComputedRef<Recordable[]> = computed({
  get() {
    return [...props.selectedKeys];
  },
  set(val) {
    emit("update:selectedKeys", val);
  },
});

const tableSelectedKey: WritableComputedRef<Recordable[]> = computed({
  get() {
    return props.selectedKey;
  },
  set(val) {
    emit("update:selectedKey", val);
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

const renderCellStyle = (
  row: any,
  column: any,
  rowIndex: number,
  columnIndex: number
) => {
  if (typeof props.cellStyle === "string") {
    return props.cellStyle;
  }
  return props.cellStyle(row, column, rowIndex, columnIndex);
};

const renderCellClassName = (
  row: any,
  column: any,
  rowIndex: number,
  columnIndex: number
) => {
  if (typeof props.cellClassName === "string") {
    return props.cellClassName;
  }
  return props.cellClassName(row, column, rowIndex, columnIndex);
};

const renderRowStyle = (data: any, index: number) => {
  if (typeof props.rowStyle === "string") {
    return props.rowStyle;
  }
  return props.rowStyle(data, index);
};

const renderRowClassName = (data: any, index: number) => {
  if (typeof props.rowClassName === "string") {
    return props.rowClassName;
  }
  return props.rowClassName(data, index);
};

const childrenIndentSize = props.currentIndentSize + props.indentSize;

const renderFixedStyle = (column: any, columnIndex: number) => {
  if (column.fixed) {
    if (column.fixed == "left") {
      var left = 0;
      for (var i = 0; i < columnIndex; i++) {
        if (props.columns[i].fixed && props.columns[i].fixed == "left") {
          left = left + props.columns[i]?.width.replace("px", "");
        }
      }
      return { left: `${left}px` } as StyleValue;
    } else {
      var right = 0;
      for (var i = columnIndex + 1; i < props.columns.length; i++) {
        if (props.columns[i].fixed && props.columns[i].fixed == "right") {
          right = right + props.columns[i]?.width.replace("px", "");
        }
      }
      return { right: `${right}px` } as StyleValue;
    }
  }
  return {} as StyleValue;
};

const renderFixedClassName = (column: any, columnIndex: number) => {
  if (column.fixed) {
    if (column.fixed == "left") {
      var left = true;
      for (var i = columnIndex + 1; i < props.columns.length; i++) {
        if (props.columns[i].fixed && props.columns[i].fixed == "left") {
          left = false;
        }
      }
      return left ? `layui-table-fixed-left-last` : "";
    } else {
      var right = true;
      for (var i = 0; i < columnIndex; i++) {
        if (props.columns[i].fixed && props.columns[i].fixed == "right") {
          right = false;
        }
      }
      return right ? `layui-table-fixed-right-first` : "";
    }
  }
};
</script>

<template>
  <tr
    :style="[renderRowStyle(data, index)]"
    :class="[renderRowClassName(data, index)]"
    @click.stop="rowClick(data, $event)"
    @dblclick.stop="rowDoubleClick(data, $event)"
    @contextmenu.stop="contextmenu(data, $event)"
  >
    <!-- 数据列 -->
    <template v-for="(column, columnIndex) in columns" :key="columnIndex">
      <!-- 展示否 -->
      <template v-if="tableColumnKeys.includes(column.key)">

        <template v-if="column.type == 'radio'">
          <td
            class="layui-table-cell layui-table-cell-radio"
            :style="[
              {
                textAlign: column.align,
                whiteSpace: column.ellipsisTooltip ? 'nowrap' : 'normal',
              },
              renderFixedStyle(column, columnIndex),
              renderCellStyle(data, column, index, columnIndex),
            ]"
            :class="[
              renderFixedClassName(column, columnIndex),
              renderCellClassName(data, column, index, columnIndex),
              column.fixed ? `layui-table-fixed-${column.fixed}` : '',
            ]"
          >
            <!-- 树表占位与缩进 -->
            <span
              v-if="expandSpace && columnIndex === expandIndex"
              :style="{ 'margin-right': currentIndentSize + 'px' }"
            ></span>

            <span
              v-if="
                expandSpace &&
                !data[childrenColumnName] &&
                !slot.expand &&
                columnIndex === expandIndex
              "
              class="layui-table-cell-expand-icon-spaced"
            ></span>

            <lay-icon
              v-if="
                (slot.expand || data[childrenColumnName]) &&
                columnIndex === expandIndex
              "
              class="layui-table-cell-expand-icon"
              :type="expandIconType"
              @click="handleExpand"
            ></lay-icon>

            <lay-radio
              v-model="tableSelectedKey"
              :value="data[id]"
            />
          </td>
        </template>

        <template v-if="column.type == 'checkbox'">
          <td
            class="layui-table-cell layui-table-cell-checkbox"
            :style="[
              {
                textAlign: column.align,
                whiteSpace: column.ellipsisTooltip ? 'nowrap' : 'normal',
              },
              renderFixedStyle(column, columnIndex),
              renderCellStyle(data, column, index, columnIndex),
            ]"
            :class="[
              renderFixedClassName(column, columnIndex),
              renderCellClassName(data, column, index, columnIndex),
              column.fixed ? `layui-table-fixed-${column.fixed}` : '',
            ]"
          >
            <!-- 树表占位与缩进 -->
            <span
              v-if="expandSpace && columnIndex === expandIndex"
              :style="{ 'margin-right': currentIndentSize + 'px' }"
            ></span>

            <span
              v-if="
                expandSpace &&
                !data[childrenColumnName] &&
                !slot.expand &&
                columnIndex === expandIndex
              "
              class="layui-table-cell-expand-icon-spaced"
            ></span>

            <lay-icon
              v-if="
                (slot.expand || data[childrenColumnName]) &&
                columnIndex === expandIndex
              "
              class="layui-table-cell-expand-icon"
              :type="expandIconType"
              @click="handleExpand"
            ></lay-icon>

            <lay-checkbox
              v-model="tableSelectedKeys"
              :value="data[id]"
              skin="primary"
            />
          </td>
        </template>

        <template v-if="column.type == 'number'">
          <td
            class="layui-table-cell layui-table-cell-number"
            :style="[
              {
                textAlign: column.align,
                whiteSpace: column.ellipsisTooltip ? 'nowrap' : 'normal',
              },
              renderFixedStyle(column, columnIndex),
              renderCellStyle(data, column, index, columnIndex),
            ]"
            :class="[
              renderFixedClassName(column, columnIndex),
              renderCellClassName(data, column, index, columnIndex),
              column.fixed ? `layui-table-fixed-${column.fixed}` : '',
            ]"
          >
            <!-- 树表占位与缩进 -->
            <span
              v-if="expandSpace && columnIndex === expandIndex"
              :style="{ 'margin-right': currentIndentSize + 'px' }"
            ></span>

            <span
              v-if="
                expandSpace &&
                !data[childrenColumnName] &&
                !slot.expand &&
                columnIndex === expandIndex
              "
              class="layui-table-cell-expand-icon-spaced"
            ></span>

            <lay-icon
              v-if="
                (slot.expand || data[childrenColumnName]) &&
                columnIndex === expandIndex
              "
              class="layui-table-cell-expand-icon"
              :type="expandIconType"
              @click="handleExpand"
            ></lay-icon>

            {{ index + 1 }}
          </td>
        </template>

        <!-- 插槽列 -->
        <template v-if="column.customSlot">
          <td
            class="layui-table-cell"
            :style="[
              {
                textAlign: column.align,
                whiteSpace: column.ellipsisTooltip ? 'nowrap' : 'normal',
              },
              renderFixedStyle(column, columnIndex),
              renderCellStyle(data, column, index, columnIndex),
            ]"
            :class="[
              renderFixedClassName(column, columnIndex),
              renderCellClassName(data, column, index, columnIndex),
              column.fixed ? `layui-table-fixed-${column.fixed}` : '',
            ]"
          >
            <!-- 树表占位与缩进 -->
            <span
              v-if="expandSpace && columnIndex === expandIndex"
              :style="{ 'margin-right': currentIndentSize + 'px' }"
            ></span>

            <span
              v-if="
                expandSpace &&
                !data[childrenColumnName] &&
                !slot.expand &&
                columnIndex === expandIndex
              "
              class="layui-table-cell-expand-icon-spaced"
            ></span>

            <lay-icon
              v-if="
                (slot.expand || data[childrenColumnName]) &&
                columnIndex === expandIndex
              "
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
              :style="[
                {
                  textAlign: column.align,
                  whiteSpace: column.ellipsisTooltip ? 'nowrap' : 'normal',
                },
                renderFixedStyle(column, columnIndex),
                renderCellStyle(data, column, index, columnIndex),
              ]"
              :class="[
                renderFixedClassName(column, columnIndex),
                renderCellClassName(data, column, index, columnIndex),
                column.fixed ? `layui-table-fixed-${column.fixed}` : '',
              ]"
            >
              <!-- 树表占位与缩进 -->
              <span
                v-if="expandSpace && columnIndex === expandIndex"
                :style="{ 'margin-right': currentIndentSize + 'px' }"
              ></span>

              <span
                v-if="
                  expandSpace &&
                  !data[childrenColumnName] &&
                  !slot.expand &&
                  columnIndex === expandIndex
                "
                class="layui-table-cell-expand-icon-spaced"
              ></span>

              <lay-icon
                v-if="
                  (slot.expand || data[childrenColumnName]) &&
                  columnIndex === expandIndex
                "
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
    <slot name="expand" :data="data"></slot>
  </tr>

  <!-- 树形结构 -->
  <template v-if="data[childrenColumnName] && isExpand">
    <template
      v-for="(children, childrenIndex) in data[childrenColumnName]"
      :key="childrenIndex"
    >
      <table-row
        :id="id"
        :index="childrenIndex"
        :data="children"
        :columns="columns"
        :indent-size="indentSize"
        :current-indent-size="childrenIndentSize"
        :checkbox="checkbox"
        :tableColumnKeys="tableColumnKeys"
        :expandSpace="expandSpace"
        :expandIndex="expandIndex"
        :cellStyle="cellStyle"
        :cellClassName="cellClassName"
        :rowStyle="rowStyle"
        :rowClassName="rowClassName"
        @row="rowClick"
        @row-double="rowDoubleClick"
        @contextmenu="contextmenu"
        v-model:selectedKeys="tableSelectedKeys"
        v-model:selectedKey="tableSelectedKey"
      >
        <template v-for="name in slotsData" #[name]="{ data }">
          <slot :name="name" :data="data"></slot>
        </template>
        <template v-if="slot.expand" #expand="{ data }">
          <slot name="expand" :data="data"></slot>
        </template>
      </table-row>
    </template>
  </template>
</template>
