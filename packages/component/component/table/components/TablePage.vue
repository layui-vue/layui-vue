<script lang="ts" setup>
import type { WritableComputedRef } from "vue";
import type { TablePageProps as _TablePageProps } from "../typing";
import LayPage from "@layui/component/component/page/index.vue";
import { LayIcon } from "@layui/icons-vue";
import { computed, inject } from "vue";
import { LAY_TABLE_CONTEXT } from "../constant";

export type TablePageProps = _TablePageProps;

defineOptions({
  name: "LayTablePage",
});

const props = withDefaults(defineProps<TablePageProps>(), {
  layout: () => ["prev", "page", "next", "limits", "skip"],
});

const emit = defineEmits(["update:current", "update:limit"]);

const { tableEmits } = inject(LAY_TABLE_CONTEXT)!;

const current: WritableComputedRef<number> = computed({
  get() {
    return props.current;
  },
  set(val) {
    emit("update:current", val);
  },
});

const limit: WritableComputedRef<number> = computed({
  get() {
    return props.limit;
  },
  set(val) {
    emit("update:limit", val);
  },
});

function change(pageData: any) {
  if (!props.change) {
    console.warn(
      "layui-vue： LayTable的change事件，将在未来版本中废弃，请将回调函数移至为props.page中的change属性。",
    );
  }

  tableEmits("change", pageData);
  props.change && props.change(pageData);
}
</script>

<template>
  <LayPage
    v-model="current"
    v-model:limit="limit"
    :total="total"
    :theme="theme"
    :pages="pages"
    :layout="layout"
    :limits="limits"
    :disabled="disabled"
    :hide-on-single-page="hideOnSinglePage"
    :ellipsis-tooltip="ellipsisTooltip"
    @change="change"
  >
    <template #prev>
      <LayIcon type="layui-icon-left" />
    </template>
    <template #next>
      <LayIcon type="layui-icon-right" />
    </template>
  </LayPage>
</template>
