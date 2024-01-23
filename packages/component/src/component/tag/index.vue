<script lang="ts" setup>
import "./index.less";
import { LayIcon } from "@layui/icons-vue";
import { computed, onMounted, ref } from "vue";
import { TinyColor } from "@ctrl/tinycolor";
import { TagShape, TagType, TagVariant } from "./interface";

export interface TagProps {
  type?: TagType;
  color?: string;
  closable?: boolean;
  size?: string;
  bordered?: boolean;
  disabled?: boolean;
  shape?: TagShape;
  maxWidth?: string;
  variant?: TagVariant;
}

defineOptions({
  name: "LayTag",
});

const props = withDefaults(defineProps<TagProps>(), {
  size: "md",
  shape: "square",
  variant: "dark",
  bordered: true,
});

const emit = defineEmits(["close", "check", "update:checked"]);

const visible = ref(true);

const handleClose = (e: MouseEvent) => {
  if (props.disabled) return;
  emit("close", e);
};

const classTag = computed(() => [
  "layui-tag",
  `layui-tag-size-${props.size}`,
  `layui-tag-shap-${props.shape}`,
  {
    [`layui-tag-variant-${props.variant}`]: props.variant,
    [`layui-tag-variant-${props.variant}-bordered`]: props.bordered,
    [`layui-tag-${props.type}-bordered`]: props.bordered,
    [`layui-tag-${props.type}`]: props.type,
    "layui-tag-bordered": props.bordered,
    "layui-tag-disabled": props.disabled,
  },
]);

const styleTag = computed(() => [
  {
    "max-width": props.maxWidth ?? "100%",
    ...useTagCustomStyle(props).value,
  },
]);

function useTagCustomStyle(props: TagProps) {
  return computed(() => {
    let styles: Record<string, string> = {};

    // Change
    changeFlag.value;

    if (props.color || props.type) {
      var tagColor = undefined;

      if (props.color) {
        tagColor = props.color;
      } else {
        const styles = getComputedStyle(document.documentElement);
        const cssVariableValue = styles.getPropertyValue(
          `--global-${props.type}-color`
        );
        tagColor = cssVariableValue;
      }

      const color = new TinyColor(tagColor);
      if (props.variant === "dark") {
        const isDark = color.getBrightness() < 190;
        const textColor = isDark ? "#FFF" : "#000000";
        styles = {
          "background-color": tagColor,
          "border-color": props.bordered ? tagColor : "transparent",
          color: textColor,
        };
      } else if (props.variant === "light") {
        styles = {
          "background-color": color.tint(90).toString(),
          "border-color": props.bordered
            ? color.tint(50).toString()
            : "transparent",
          color: tagColor,
        };
      } else if (props.variant === "plain") {
        styles = {
          "background-color": "transparent",
          "border-color": props.bordered ? tagColor : "transparent",
          color: tagColor,
        };
      }
    }
    return styles;
  });
}

const changeFlag = ref(true);

onMounted(() => {
  var cssVariableValue: string | undefined = undefined;
  const element = document.documentElement;
  const observer = new MutationObserver(function (mutationsList) {
    for (let mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style"
      ) {
        const styles = getComputedStyle(element);
        const newCssVariableValue = styles.getPropertyValue(
          `--global-${props.type}-color`
        );
        if (
          cssVariableValue == undefined ||
          (cssVariableValue != undefined &&
            cssVariableValue != newCssVariableValue)
        ) {
          cssVariableValue = newCssVariableValue;
          changeFlag.value = !changeFlag.value;
        }
      }
    }
  });

  const config = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["style"],
  };

  observer.observe(element, config);
});
</script>
<template>
  <span v-if="visible" :class="classTag" :style="styleTag">
    <span v-if="$slots.icon" class="layui-tag-icon">
      <slot name="icon" />
    </span>
    <span class="layui-tag-text">
      <slot />
    </span>
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
