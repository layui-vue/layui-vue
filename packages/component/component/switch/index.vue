<script setup lang="ts">
import { computed } from "vue";
import "./index.less";
import { SwitchSize } from "./interface";
import useProps from "./index.hooks";

export interface SwitchProps {
  name?: string;
  modelValue?: string | number | boolean;
  disabled?: boolean;
  onswitchColor?: string;
  unswitchColor?: string;
  onswitchText?: string;
  unswitchText?: string;
  onswitchValue?: string | number | boolean;
  unswitchValue?: string | number | boolean;
  size?: SwitchSize;
  loadingIcon?: string;
  loading?: boolean;
}

defineOptions({
  name: "LaySwitch",
});

const props = withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
  onswitchValue: true,
  unswitchValue: false,
  loadingIcon: "layui-icon-loading-one",
});

const { size } = useProps(props);

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
    "background-color": isActive.value
      ? props.onswitchColor
      : props.unswitchColor,
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
        'layui-form-onswitch': isActive,
        'layui-switch-disabled': disabled,
      }"
    >
      <em v-if="onswitchText || unswitchText">{{
        isActive == true ? onswitchText : unswitchText
      }}</em>
      <span>
        <div>
          <template v-if="loading">
            <i
              class="layui-icon layui-anim layui-anim-rotate layui-anim-loop"
              :class="loadingIcon"
            ></i>
          </template>
          <template v-else>
            <slot v-if="isActive" name="onswitch-icon"></slot>
            <slot v-else name="unswitch-icon"></slot>
          </template>
        </div>
      </span>
    </div>
  </span>
</template>
