<script lang="ts">
export default {
  name: "LaySwitch",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import "./index.less";

export interface LaySwitchProps {
  name?: string;
  disabled?: boolean;
  modelValue?: string | number | boolean;
  onswitchText?: string;
  unswitchText?: string;
  onswitchColor?: string;
  unswitchColor?: string;
  onswitchValue?: string | number | boolean;
  unswitchValue?: string | number | boolean;
  size?: "lg" | "md" | "sm" | "xs";
}

const props = withDefaults(defineProps<LaySwitchProps>(), {
  disabled: false,
  onswitchValue: true,
  unswitchValue: false,
  size: "md",
});

const emit = defineEmits(["update:modelValue", "change"]);

const isActive = computed({
  get() {
    return props.modelValue === props.onswitchValue;
  },
  set(val) {
    if (val) {
      emit("change", props.onswitchValue);
      emit("update:modelValue", props.onswitchValue);
    } else {
      emit("change", props.unswitchValue);
      emit("update:modelValue", props.unswitchValue);
    }
  },
});

const handleClick = () => {
  if (!props.disabled) {
    isActive.value = !isActive.value;
  }
};

const styles = computed(() => {
  return {
    "background-color": isActive.value ? props.onswitchColor : props.unswitchColor,
  };
});
</script>

<template>
  <span @click.stop="handleClick" class="layui-switch-container" :size="size">
    <input class="layui-switch-input" :name="name" :value="modelValue" />
    <div
      class="layui-unselect layui-form-switch"
      :style="styles"
      :class="{
        'layui-disabled': disabled,
        'layui-form-onswitch': isActive,
        'layui-switch-disabled': disabled,
      }"
    >
      <em>{{ isActive == true ? onswitchText : unswitchText }}</em>
      <span>
        <div>
          <slot v-if="isActive" name="onswitch-icon"></slot>
          <slot v-else name="unswitch-icon"></slot>
        </div>
      </span>
    </div>
  </span>
</template>
