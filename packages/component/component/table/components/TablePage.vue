<script lang="ts" setup>
import { LayIcon } from "@layui/icons-vue";
import LayPage from "@layui/component/component/page/index.vue";
import { type WritableComputedRef, computed, inject } from "vue";
import { LAY_TABLE_CONTEXT } from "../constant";

export type LayoutKey =
  | "count"
  | "prev"
  | "page"
  | "limits"
  | "next"
  | "limits"
  | "refresh"
  | "skip";

export interface TablePageProps {
  current: number;
  layout?: LayoutKey[];
  total: number;
  limit: number;
  limits?: number[];
  pages?: number;
  theme?: string;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  ellipsisTooltip?: boolean;
}

defineOptions({
  name: "LayTablePage",
});

const { tableEmits } = inject(LAY_TABLE_CONTEXT)!;

const props = withDefaults(defineProps<TablePageProps>(), {
  layout: () => ["prev", "page", "next", "limits", "skip"],
});

const emit = defineEmits(["update:current", "update:limit"]);

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

const change = (pageData: any) => {
  tableEmits("change", pageData);
};
</script>

<template>
  <lay-page
    :total="total"
    :theme="theme"
    :pages="pages"
    :layout="layout"
    :limits="limits"
    :disabled="disabled"
    :hide-on-single-page="hideOnSinglePage"
    :ellipsis-tooltip="ellipsisTooltip"
    v-model="current"
    v-model:limit="limit"
    @change="change"
  >
    <template #prev>
      <lay-icon type="layui-icon-left" />
    </template>
    <template #next>
      <lay-icon type="layui-icon-right" />
    </template>
  </lay-page>
</template>
