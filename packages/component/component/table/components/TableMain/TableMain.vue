<script lang="ts" setup>
import { type TableColumn } from "../../typing";

import { computed, inject } from "vue";

import LayCheckboxV2 from "@layui/component/component/checkboxV2/index.vue";
import LayTooltip from "@layui/component/component/tooltip/index.vue";
import LayRadio from "@layui/component/component/radio/index.vue";
import LayRender from "@layui/component/component/_components/render";

import LayTableMainTd from "./TableMainTd";

import { LAY_TABLE_CONTEXT, columnsTypeList } from "../../constant";

export interface TableRowProps {
  id: string;
  index: number;
  data: any;
  page?: any;
  columns: TableColumn[];
  indentSize: number;
  currentIndentSize: number;
  expandSpace: boolean;
  expandIndex: number;
  cellStyle: string | Function;
  cellClassName: string | Function;
  rowStyle: string | Function;
  rowClassName: string | Function;
  spanMethod: Function;
  defaultExpandAll: boolean;
  getCheckboxProps: Function;
  getRadioProps: Function;
  childrenColumnName?: string;
}

defineOptions({
  name: "LayTableMain",
});

const { tableEmits, tableSlots, selectedState, expandState } =
  inject(LAY_TABLE_CONTEXT)!;

const props = withDefaults(defineProps<TableRowProps>(), {
  childrenColumnName: "children",
  cellStyle: "",
  cellClassName: "",
});

const isExpand = computed(() => {
  return expandState.checkExpand(props.data[props.id]);
});

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
    @click.stop="tableEmits('row', data, $event)"
    @dblclick="tableEmits('row-double', data, $event)"
    @contextmenu.stop="tableEmits('row-contextmenu', data, $event)"
  >
    <template v-for="(column, columnIndex) in columns" :key="columnIndex">
      <template v-if="column.type && columnsTypeList.includes(column.type)">
        <LayTableMainTd
          :class="`layui-table-cell-${column.type}`"
          :data="data"
          :column="column"
          :dataIndex="index"
          :columnIndex="columnIndex"
          :expandSpace="expandSpace"
          :expandIndex="expandIndex"
          :currentIndentSize="currentIndentSize"
        >
          <LayRadio
            v-if="column.type === 'radio'"
            :modelValue="selectedState.tableSelectedKey.value"
            @change="() => selectedState.toggleSelected(data[id])"
            v-bind="radioProps"
            :value="data[id]"
          />

          <LayCheckboxV2
            v-if="column.type === 'checkbox'"
            :modelValue="selectedState.tableMSelectedKeys.includes(data[id])"
            @change="(value: boolean) => selectedState.toggleMSelected(data, value)"
            v-bind="checkboxProps"
            :value="data[id]"
            skin="primary"
          />

          <template v-if="column.type === 'number'">
            {{
              page?.current
                ? (page?.current - 1) * page?.limit + index + 1
                : index + 1
            }}
          </template>
        </LayTableMainTd>
      </template>

      <template v-else>
        <LayTableMainTd
          v-if="column.customSlot"
          :data="data"
          :column="column"
          :dataIndex="index"
          :columnIndex="columnIndex"
          :expandSpace="expandSpace"
          :expandIndex="expandIndex"
          :currentIndentSize="currentIndentSize"
        >
          <lay-tooltip
            v-if="column.ellipsisTooltip"
            :isAutoShow="true"
            :isDark="column.ellipsisTooltipTheme === 'dark' ? true : false"
          >
            <lay-render
              :row="data"
              :data="data"
              :column="column"
              :rowIndex="index"
              :columnIndex="columnIndex"
              :render="column.customSlot"
              :slots="tableSlots"
            ></lay-render>
            <template #content>
              <lay-render
                :row="data"
                :data="data"
                :column="column"
                :rowIndex="index"
                :columnIndex="columnIndex"
                :render="column.customSlot"
                :slots="tableSlots"
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
            :slots="tableSlots"
          ></lay-render
        ></LayTableMainTd>

        <LayTableMainTd
          v-else
          :data="data"
          :column="column"
          :dataIndex="index"
          :columnIndex="columnIndex"
          :expandSpace="expandSpace"
          :expandIndex="expandIndex"
          :currentIndentSize="currentIndentSize"
        >
          <lay-tooltip
            v-if="column.ellipsisTooltip"
            :content="data[column.key]"
            :isDark="column.ellipsisTooltipTheme === 'dark' ? true : false"
            :isAutoShow="true"
          >
            {{ data[column.key] }}
          </lay-tooltip>

          <span v-else> {{ data[column.key] }} </span>
        </LayTableMainTd>
      </template>
    </template>
  </tr>

  <tr class="layui-table-cell-expand" v-if="tableSlots.expand && isExpand">
    <td class="layui-table-cell" :colspan="columns.length">
      <LayRender
        :slots="tableSlots"
        render="expand"
        :data="data"
        :row="data"
      ></LayRender>
    </td>
  </tr>

  <template v-if="data[childrenColumnName] && isExpand">
    <template
      v-for="(children, childrenIndex) in data[childrenColumnName]"
      :key="children[id]"
    >
      <LayTableMain
        v-bind="props"
        :index="childrenIndex"
        :data="children"
        :current-indent-size="childrenIndentSize"
      >
      </LayTableMain>
    </template>
  </template>
</template>
