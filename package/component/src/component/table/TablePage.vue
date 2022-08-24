<script lang="ts">
export default {
  name: "TablePage",
};
</script>

<script lang="ts" setup>
import { LayIcon } from "@layui/icons-vue";
import LayPage from "../page/index.vue";

export interface LayTablePageProps {
  showPage?: boolean;
  showSkip?: boolean;
  showLimit?: boolean;
  showCount?: boolean;
  showRefresh?: boolean;
  modelValue: number;
  limits?: number[];
  pages?: number;
  total: number;
  limit?: number;
  theme?: string;
}

const props = withDefaults(defineProps<LayTablePageProps>(), {
  showPage: true,
  showLimit: true,
  showSkip: true,
});

const emit = defineEmits(["update:modelValue", "update:limit", "change"]);

const change = (pageData: any) => {
  emit("change", pageData);
  emit("update:modelValue", pageData.current);
  emit("update:limit", pageData.limit);
};
</script>

<template>
  <lay-page
    :total="total"
    :show-page="showPage"
    :show-skip="showSkip"
    :show-limit="showLimit"
    :show-count="showCount"
    :show-refresh="showRefresh"
    :limits="limits"
    :theme="theme"
    :pages="pages"
    v-model:modelValue="modelValue"
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
