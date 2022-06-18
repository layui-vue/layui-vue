<script lang="ts">
export default {
  name: "Title",
};
</script>

<script lang="ts" setup>
export interface HeaderProps {
  title: string | boolean | Function;
}

const renderContent = function (content: any) {
  if (typeof content === "function") {
    return content();
  }
  return content;
};

const props = defineProps<HeaderProps>();
</script>

<template>
  <div class="layui-layer-title" style="cursor: move">
    {{ renderContent(title) }}
  </div>
</template>
