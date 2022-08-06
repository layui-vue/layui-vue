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
  disabled?: boolean;
  shape?: "square" | "round";
  maxWidth?: number | string;
}

const props = withDefaults(defineProps<LayTagProps>(), {
  color: "#EEE",
  size: "md",
  shape: "square",
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
  if (props.disabled) return;
  //visible.value = false;
  emit("close", e);
};

const classTag = computed(() => [
  "layui-tag",
  `layui-tag-size-${props.size}`,
  `layui-tag-shap-${props.shape}`,
  {
    [`layui-bg-${props.color}`]: isBuiltInColor,
    "layui-tag-bordered": props.bordered,
    "layui-tag-disabled": props.disabled,
    "layui-tag-ellipsis": props.maxWidth,
  },
]);

const styleTag = computed(() => [
  isCustomColor.value ? { backgroundColor: props.color } : {},
  {
    "max-width": props.maxWidth ?? "unset"
  },
]
);


</script>
<template>
  <span v-if="visible" :class="classTag" :style="styleTag">
    <span v-if="$slots.icon" class="layui-tag-icon">
      <slot name="icon" />
    </span>
    <span v-if="maxWidth" :style="styleTag" class="layui-tag-text">
      <slot />
    </span>
    <slot v-else />
    <span v-if="closable" class="layui-tag-close-icon" @click.stop="handleClose">
      <slot name="close-icon">
        <lay-icon type="layui-icon-close"></lay-icon>
      </slot>
    </span>
  </span>
</template>
