<template>
  <div class="lay-page-header">
    <div class="lay-page-header__left" @click="emits('back')">
      <i class="layui-icon layui-icon-return"></i>
      <div class="lay-page-header__title">{{ backText }}</div>
    </div>
    <div class="lay-page-header__content">{{ content }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayPageHeader",
};
</script>
<script lang="ts" setup>
import "./index.less";
export interface LayPageHeaderProps {
  content?: string;
  backText?: string;
}
const props = withDefaults(defineProps<LayPageHeaderProps>(), {
  content: "",
  backText: "返回",
});

const emits = defineEmits(["back"]);
</script>
