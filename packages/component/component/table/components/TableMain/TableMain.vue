<script lang="ts" setup>
import type { TableColumn } from "../../typing";

import LayRender from "@layui/component/component/_components/render";
import LayCheckboxV2 from "@layui/component/component/checkboxV2/index.vue";

import LayRadio from "@layui/component/component/radio/index.vue";
import LayTooltip from "@layui/component/component/tooltip/index.vue";
import { computed, inject } from "vue";

import { columnsTypeList, LAY_TABLE_CONTEXT } from "../../constant";

import LayTableMainTd from "./TableMainTd";

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

const props = withDefaults(defineProps<TableRowProps>(), {
  childrenColumnName: "children",
});

const { tableEmits, tableSlots, selectedState, expandState }
  = inject(LAY_TABLE_CONTEXT)!;

const isExpand = computed(() => {
  return expandState.checkExpand(props.data[props.id]);
});

function renderRowStyle(data: any, index: number) {
  if (typeof props.rowStyle === "string") {
    return props.rowStyle;
  }
  return props.rowStyle(data, index);
}

function renderRowClassName(data: any, index: number) {
  if (typeof props.rowClassName === "string") {
    return props.rowClassName;
  }
  return props.rowClassName(data, index);
}

const childrenIndentSize = computed(
  () => props.currentIndentSize + props.indentSize,
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
    <template
      v-for="(column, columnIndex) in columns"
      :key="column.key || column.type"
    >
      <template v-if="column.type && columnsTypeList.includes(column.type)">
        <LayTableMainTd
          :class="`layui-table-cell-${column.type}`"
          :data="data"
          :column="column"
          :data-index="index"
          :column-index="columnIndex"
          :expand-space="expandSpace"
          :expand-index="expandIndex"
          :current-indent-size="currentIndentSize"
        >
          <LayRadio
            v-if="column.type === 'radio'"
            :model-value="selectedState.tableSelectedKey.value"
            v-bind="radioProps"
            :value="data[id]"
            @change="() => selectedState.toggleSelected(data[id])"
          />

          <LayCheckboxV2
            v-if="column.type === 'checkbox'"
            :model-value="selectedState.tableMSelectedKeys.includes(data[id])"
            v-bind="checkboxProps"
            :value="data[id]"
            skin="primary"
            @change="(value: boolean) => selectedState.toggleMSelected(data, value)"
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
          :data-index="index"
          :column-index="columnIndex"
          :expand-space="expandSpace"
          :expand-index="expandIndex"
          :current-indent-size="currentIndentSize"
        >
          <LayTooltip
            v-if="column.ellipsisTooltip"
            :is-auto-show="true"
            :is-dark="column.ellipsisTooltipTheme === 'dark' ? true : false"
            v-bind="column.ellipsisTooltipProps"
          >
            <LayRender
              :row="data"
              :data="data"
              :column="column"
              :row-index="index"
              :column-index="columnIndex"
              :render="column.customSlot"
              :slots="tableSlots"
            />
            <template #content>
              <LayRender
                :row="data"
                :data="data"
                :column="column"
                :row-index="index"
                :column-index="columnIndex"
                :render="column.customSlot"
                :slots="tableSlots"
              />
            </template>
          </LayTooltip>

          <LayRender
            v-else
            :row="data"
            :data="data"
            :column="column"
            :row-index="index"
            :column-index="columnIndex"
            :render="column.customSlot"
            :slots="tableSlots"
          />
        </LayTableMainTd>

        <LayTableMainTd
          v-else
          :data="data"
          :column="column"
          :data-index="index"
          :column-index="columnIndex"
          :expand-space="expandSpace"
          :expand-index="expandIndex"
          :current-indent-size="currentIndentSize"
        >
          <LayTooltip
            v-if="column.ellipsisTooltip"
            :is-dark="column.ellipsisTooltipTheme === 'dark' ? true : false"
            :is-auto-show="true"
            v-bind="column.ellipsisTooltipProps"
            :content="data[column.key]"
          >
            {{ data[column.key] }}
          </LayTooltip>

          <span v-else> {{ data[column.key] }} </span>
        </LayTableMainTd>
      </template>
    </template>
  </tr>

  <tr v-if="tableSlots.expand && isExpand" class="layui-table-cell-expand">
    <td class="layui-table-cell" :colspan="columns.length">
      <LayRender
        :slots="tableSlots"
        render="expand"
        :data="data"
        :row="data"
      />
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
      />
    </template>
  </template>
</template>
