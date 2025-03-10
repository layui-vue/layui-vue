<script lang="ts" setup>
import { Recordable } from "../../types";
import { LayIcon } from "@layui/icons-vue";
import {
  computed,
  ref,
  StyleValue,
  useSlots,
  WritableComputedRef,
  watch,
} from "vue";
import LayCheckbox from "../checkbox/index.vue";
import LayTooltip from "../tooltip/index.vue";
import LayRadio from "../radio/index.vue";
import LayRender from "../_components/render";
import { TableEmit } from "./typing";
import { useEmit } from "./hooks/useEmit";

export interface TableRowProps {
  index: number;
  indentSize: number;
  currentIndentSize: number;
  expandSpace: boolean;
  expandIndex: number;
  selectedKeys: string[];
  selectedKey: string;
  tableColumnKeys: string[];
  childrenColumnName?: string;
  columnSlotNames: string[];
  page?: any;
  columns: Recordable[];
  checkbox?: boolean;
  cellClassName: string | Function;
  cellStyle: string | Function;
  rowClassName: string | Function;
  rowStyle: string | Function;
  id: string;
  data: any;
  spanMethod: Function;
  defaultExpandAll: boolean;
  expandKeys: string[];
  getCheckboxProps: Function;
  getRadioProps: Function;
}

defineOptions({
  name: "TableRow",
});

const slot = useSlots();

const emit = defineEmits(TableEmit);

const { rowClick, rowDoubleClick, rowContextmenu, cellDoubleClick, rowExpand } =
  useEmit(emit);

const props = withDefaults(defineProps<TableRowProps>(), {
  checkbox: false,
  childrenColumnName: "children",
  cellStyle: "",
  cellClassName: "",
});

// 监听 defaultExpandAll 传递, 保持响应式
watch(
  () => props.defaultExpandAll,
  () => {
    tableExpandAll.value = props.defaultExpandAll;
  }
);

const tableExpandAll = ref(props.defaultExpandAll);

const tableExpandKeys: WritableComputedRef<string[]> = computed({
  get() {
    return [...props.expandKeys];
  },
  set(val) {
    emit("update:expandKeys", val);
  },
});

const tableSelectedKeys: WritableComputedRef<string[]> = computed({
  get() {
    return [...props.selectedKeys];
  },
  set(val) {
    emit("update:selectedKeys", val);
  },
});

const tableSelectedKey: WritableComputedRef<string> = computed({
  get() {
    return props.selectedKey;
  },
  set(val) {
    emit("update:selectedKey", val);
  },
});

const isExpand: WritableComputedRef<any> = computed({
  get() {
    return tableExpandKeys.value.includes(props.data[props.id]);
  },
  set(val) {
    let newTableExpandKeys = [...tableExpandKeys.value];
    if (!val) {
      newTableExpandKeys.splice(
        newTableExpandKeys.indexOf(props.data[props.id]),
        1
      );
    } else {
      newTableExpandKeys.push(props.data[props.id]);
    }
    tableExpandAll.value = false;
    tableExpandKeys.value = newTableExpandKeys;
  },
});

const expandIconType = computed(() => {
  return isExpand.value ? "layui-icon-subtraction" : "layui-icon-addition";
});

const handleExpand = (e: PointerEvent) => {
  rowExpand(props.data, e);
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

const childrenIndentSize = computed(
  () => props.currentIndentSize + props.indentSize
);

const renderFixedStyle = (column: any, columnIndex: number) => {
  if (column.fixed) {
    if (column.fixed == "left") {
      var left = 0;
      for (var i = 0; i < columnIndex; i++) {
        if (
          props.columns[i].fixed &&
          props.columns[i].fixed == "left" &&
          props.tableColumnKeys.includes(props.columns[i].key)
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
          props.tableColumnKeys.includes(props.columns[i].key)
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
        props.tableColumnKeys.includes(props.columns[i].key)
      ) {
        isLast = false;
      }
    }
    return isLast ? ({ "border-right": "none" } as StyleValue) : {};
  }
  return {} as StyleValue;
};

const renderFixedClassName = (column: any, columnIndex: number) => {
  if (column.fixed) {
    if (column.fixed == "left") {
      var left = true;
      for (var i = columnIndex + 1; i < props.columns.length; i++) {
        if (
          props.columns[i].fixed &&
          props.columns[i].fixed == "left" &&
          props.tableColumnKeys.includes(props.columns[i].key)
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
          props.tableColumnKeys.includes(props.columns[i].key)
        ) {
          right = false;
        }
      }
      return right ? `layui-table-fixed-right-first` : "";
    }
  }
};

const spanMethodAttr = (
  row: any,
  column: any,
  rowIndex: number,
  columnIndex: number
) => {
  const attrs = props.spanMethod(row, column, rowIndex, columnIndex);
  if (attrs instanceof Array) {
    return { rowspan: attrs[0], colspan: attrs[1] };
  } else if (attrs instanceof Object) {
    return attrs;
  } else {
    return { rowspan: 1, colspan: 1 };
  }
};

const isAutoShow = (
  row: any,
  column: any,
  rowIndex: number,
  columnIndex: number
) => {
  const attrs = spanMethodAttr(row, column, rowIndex, columnIndex);
  if (attrs.colspan == 0 && attrs.rowspan == 0) {
    return false;
  } else {
    return true;
  }
};

const radioProps = computed(() => {
  return props.getRadioProps(props.data, props.index);
});

const checkboxProps = computed(() => {
  return props.getCheckboxProps(props.data, props.index);
});
</script>

<template>
  <tr
    :style="[renderRowStyle(data, index)]"
    :class="[renderRowClassName(data, index)]"
    @click.stop="rowClick(data, $event)"
    @dblclick="rowDoubleClick(data, $event)"
    @contextmenu.stop="rowContextmenu(data, $event)"
  >
    <template v-for="(column, columnIndex) in columns" :key="columnIndex">
      <template v-if="tableColumnKeys.includes(column.key)">
        <template v-if="column.type">
          <template v-if="column.type == 'radio'">
            <td
              class="layui-table-cell layui-table-cell-radio"
              v-if="isAutoShow(data, column, index, columnIndex)"
              :colspan="
                spanMethodAttr(data, column, index, columnIndex).colspan
              "
              :rowspan="
                spanMethodAttr(data, column, index, columnIndex).rowspan
              "
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
                v-bind="radioProps"
                :value="data[id]"
              />
            </td>
          </template>

          <template v-if="column.type == 'checkbox'">
            <td
              class="layui-table-cell layui-table-cell-checkbox"
              v-if="isAutoShow(data, column, index, columnIndex)"
              :colspan="
                spanMethodAttr(data, column, index, columnIndex).colspan
              "
              :rowspan="
                spanMethodAttr(data, column, index, columnIndex).rowspan
              "
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
                v-bind="checkboxProps"
                :value="data[id]"
                skin="primary"
              />
            </td>
          </template>

          <template v-if="column.type == 'number'">
            <td
              class="layui-table-cell layui-table-cell-number"
              v-if="isAutoShow(data, column, index, columnIndex)"
              :colspan="
                spanMethodAttr(data, column, index, columnIndex).colspan
              "
              :rowspan="
                spanMethodAttr(data, column, index, columnIndex).rowspan
              "
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
              @dblclick="cellDoubleClick(data[column.key], $event)"
            >
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

              {{
                page?.current
                  ? (page?.current - 1) * page?.limit + index + 1
                  : index + 1
              }}
            </td>
          </template>
        </template>

        <template v-else>
          <template v-if="column.customSlot">
            <td
              class="layui-table-cell"
              v-if="isAutoShow(data, column, index, columnIndex)"
              :colspan="
                spanMethodAttr(data, column, index, columnIndex).colspan
              "
              :rowspan="
                spanMethodAttr(data, column, index, columnIndex).rowspan
              "
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
              @dblclick="cellDoubleClick(data[column.key], $event)"
            >
              <div
                class="layui-table-cell-content"
                :style="[
                  { textAlign: column.align, justifyContent: column.align },
                ]"
              >
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
                  :isAutoShow="true"
                  :isDark="
                    column.ellipsisTooltipTheme === 'dark' ? true : false
                  "
                >
                  <lay-render
                    :row="data"
                    :data="data"
                    :column="column"
                    :rowIndex="index"
                    :columnIndex="columnIndex"
                    :render="column.customSlot"
                    :slots="slot"
                  ></lay-render>
                  <template #content>
                    <lay-render
                      :row="data"
                      :data="data"
                      :column="column"
                      :rowIndex="index"
                      :columnIndex="columnIndex"
                      :render="column.customSlot"
                      :slots="slot"
                    ></lay-render>
                  </template>
                </lay-tooltip>

                <lay-render
                  v-else
                  :row="data"
                  :data="data"
                  :column="column"
                  :rowIndex="index"
                  :columnIndex="columnIndex"
                  :render="column.customSlot"
                  :slots="slot"
                ></lay-render>
              </div>
            </td>
          </template>

          <template v-else>
            <td
              class="layui-table-cell"
              v-if="isAutoShow(data, column, index, columnIndex)"
              :colspan="
                spanMethodAttr(data, column, index, columnIndex).colspan
              "
              :rowspan="
                spanMethodAttr(data, column, index, columnIndex).rowspan
              "
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
              @dblclick="cellDoubleClick(data[column.key], $event)"
            >
              <div
                class="layui-table-cell-content"
                :style="[
                  { textAlign: column.align, justifyContent: column.align },
                ]"
              >
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
                  :isDark="
                    column.ellipsisTooltipTheme === 'dark' ? true : false
                  "
                  :isAutoShow="true"
                >
                  {{ data[column.key] }}
                </lay-tooltip>

                <span v-else> {{ data[column.key] }} </span>
              </div>
            </td>
          </template>
        </template>
      </template>
    </template>
  </tr>

  <tr class="layui-table-cell-expand" v-if="slot.expand && isExpand">
    <td
      class="layui-table-cell"
      :colspan="columns.filter((column: any) => !column.hide).length"
    >
      <slot name="expand" :data="data" :row="data"></slot>
    </td>
  </tr>

  <template v-if="data[childrenColumnName] && isExpand">
    <template
      v-for="(children, childrenIndex) in data[childrenColumnName]"
      :key="childrenIndex"
    >
      <table-data
        :id="id"
        :data="children"
        :index="childrenIndex"
        :page="page"
        :columns="columns"
        :columnSlotNames="columnSlotNames"
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
        :spanMethod="spanMethod"
        :defaultExpandAll="defaultExpandAll"
        :getCheckboxProps="getCheckboxProps"
        :childrenColumnName="childrenColumnName"
        :getRadioProps="getRadioProps"
        @row="rowClick"
        @row-double="rowDoubleClick"
        @cell-double="cellDoubleClick"
        @row-contextmenu="rowContextmenu"
        @expand-change="rowExpand"
        v-model:expandKeys="tableExpandKeys"
        v-model:selectedKeys="tableSelectedKeys"
        v-model:selectedKey="tableSelectedKey"
      >
        <template v-for="name in columnSlotNames" #[name]="slotProp: any">
          <slot
            :name="name"
            :row="slotProp.data"
            :data="slotProp.data"
            :column="slotProp.column"
            :rowIndex="slotProp.rowIndex"
            :columnIndex="slotProp.columnIndex"
          ></slot>
        </template>
        <template
          v-if="slot.expand"
          #expand="slotProp: { data: any, row: any }"
        >
          <slot name="expand" :data="slotProp.data" :row="slotProp.row"></slot>
        </template>
      </table-data>
    </template>
  </template>
</template>
