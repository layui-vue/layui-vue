<script lang="ts">
export default {
  name: "GiteeIcon",
};
</script>
<script setup lang="ts">
import LayIcon from "../component/icon/index";

const props = defineProps<{
  color?: string;
  size?: string;
}>();
</script>
<template>
  <lay-icon :color="props.color" :size="props.size" type="layui-icon-gitee" />
</template>
