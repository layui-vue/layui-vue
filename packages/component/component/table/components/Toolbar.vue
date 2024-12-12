<script setup lang="ts">
import type { TableToolBarType } from "./types";
import { useToolBar } from "../hooks/useToolbar";
import LayIcon from "../../icon";
import LayDropdown from "../../dropdown/index.vue";

import { isValueArray } from "../../../utils";

defineOptions({
  name: "LayTableToolBar",
});

const props = defineProps<TableToolBarType>();

const {
  t,
  showToolbar,
  toolbarStyle,
  exportData,
  print,
  handleToolbarFilterCheck,
} = useToolBar(props);
</script>

<template>
  <div v-if="defaultToolbar || $slots.default" class="layui-table-tool">
    <div class="layui-table-tool-temp">
      <slot></slot>
    </div>

    <div v-if="defaultToolbar" class="layui-table-tool-self">
      <!-- 筛选 -->
      <LayDropdown v-if="showToolbar('filter')" placement="bottom-end">
        <div
          class="layui-inline"
          :title="t('table.filter')"
          lay-event
          :style="toolbarStyle('filter')"
        >
          <LayIcon />
          <i class="layui-icon layui-icon-slider"></i>
        </div>
        <template #content>
          <div class="layui-table-tool-checkbox">
            <LayCheckbox
              v-for="column in tableHeadColumns[0]"
              :modelValue="tableColumnKeys"
              skin="primary"
              :disabled="isValueArray(column.children)"
              :key="column.key"
              :value="column.key"
              @change="(value: string[]) => handleToolbarFilterCheck(value, column)"
              >{{ column.title }}</LayCheckbox
            >
          </div>
        </template>
      </LayDropdown>

      <!-- 导出 -->
      <div
        v-if="showToolbar('export')"
        class="layui-inline"
        :title="t('table.export')"
        lay-event
        :style="toolbarStyle('export')"
        @click="exportData()"
      >
        <i class="layui-icon layui-icon-export"></i>
      </div>

      <!-- 打印 -->
      <div
        v-if="showToolbar('print')"
        :style="toolbarStyle('print')"
        class="layui-inline"
        :title="t('table.print')"
        lay-event
        @click="print()"
      >
        <i class="layui-icon layui-icon-print"></i>
      </div>
    </div>
  </div>
</template>
