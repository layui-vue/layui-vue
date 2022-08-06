<script lang="ts">
export default {
  name: "LayTag",
};
</script>
<script lang="ts" setup>
import "./index.less";
import { LayIcon } from "@layui/icons-vue";
import { computed, ref } from "vue";
import { TAG_COLORS, TagColor } from "./interface";

export interface LayTagProps {
  color?: TagColor | string;
  closable?: boolean;
  size?: string;
  bordered?: boolean;
}

const props = withDefaults(defineProps<LayTagProps>(), {
  color: "green",
  size: "md",
  closable: false,
  bordered: false,
});

const emit = defineEmits(["close"]);

const isBuiltInColor = computed(
  () => props.color && TAG_COLORS.includes(props.color as any)
);
const isCustomColor = computed(
  () => props.color && !TAG_COLORS.includes(props.color as any)
);

const visible = ref(true);

const handleClose = (e: MouseEvent) => {
  //visible.value = false;
  emit("close", e);
};

const classTag = computed(() => [
  "layui-tag",
  `layui-tag-size-${props.size}`,
  {
    [`layui-bg-${props.color}`]: isBuiltInColor,
    "layui-tag-bordered": props.bordered,
  },
]);

const styleTag = computed(() => {
  return isCustomColor.value ? { backgroundColor: props.color } : undefined;
});
</script>
<template>
  <span v-if="visible" :class="classTag" :style="styleTag">
    <span v-if="$slots.icon" class="layui-tag-icon">
      <slot name="icon" />
    </span>
    <slot />
    <span
      v-if="closable"
      class="layui-tag-close-icon"
      @click.stop="handleClose"
    >
      <slot name="close-icon">
        <lay-icon type="layui-icon-close"></lay-icon>
      </slot>
    </span>
  </span>
</template>
