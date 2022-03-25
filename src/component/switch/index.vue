<script lang="ts">
export default {
  name: "LaySwitch",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import "./index.less";

export interface LaySwitchProps {
  disabled?: boolean;
  modelValue?: boolean;
  onswitchText?: string;
  unswitchText?: string;
}

const props = withDefaults(defineProps<LaySwitchProps>(), {
  disabled: false
});

const emit = defineEmits(["update:modelValue", "change"]);

const isActive = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("change", val);
    emit("update:modelValue", val);
  },
});

const handleClick = function () {
  if (!props.disabled) {
    isActive.value = !isActive.value;
  }
};
</script>

<template>
  <span @click.stop="handleClick">
    <div
      class="layui-unselect layui-form-switch"
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
