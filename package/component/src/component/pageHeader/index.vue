<template>
  <div class="lay-page-header">
    <div class="lay-page-header__left" @click="emits('back')">
      <i class="layui-icon" :class="[ backIcon ]"></i>
      <div class="lay-page-header__title">{{ backText }}</div>
    </div>
    <div class="lay-page-header__content">
      <slot v-if="slots.default"></slot>
      <template v-else> {{ content }}</template>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayPageHeader",
};
</script>
<script lang="ts" setup>
import { useSlots } from "vue";
import "./index.less";

export interface PageHeaderProps {
  content?: string;
  backText?: string;
  backIcon?: string;
}
const props = withDefaults(defineProps<PageHeaderProps>(), {
  content: "",
  backText: "返回",
  backIcon: "layui-icon-return"
});

const emits = defineEmits(["back"]);

const slots = useSlots();
</script>
