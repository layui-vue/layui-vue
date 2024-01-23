<!--
 * @Author: baobaobao
 * @Date: 2023-04-26 13:28:17
 * @LastEditTime: 2023-05-23 13:38:22
 * @LastEditors: baobaobao
-->
<template>
  <div class="layui-checkcard-group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, provide } from "vue";
import "./index.less";

export interface CheckCardGroup {
  modelValue?: [] | string | number | boolean | undefined;
  disabled?: boolean;
  single?: boolean;
}

defineOptions({
  name: "LayCheckcardGroup",
});

const props = withDefaults(defineProps<CheckCardGroup>(), {
  modelValue: undefined,
  disabled: false,
  single: false,
});

const emit = defineEmits(["update:modelValue", "change"]);

const disabled = ref(props.disabled);
const modelVal = ref(props.modelValue);
watch(
  () => props.single,
  (single) => {
    if (single && Array.isArray(modelVal.value)) {
      modelVal.value = "";
    }
    if (!single && !Array.isArray(modelVal.value)) {
      modelVal.value = [];
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
provide("checkcardGroup", {
  name: "LayCheckCardGroup",
  modelVal: modelVal,
  disabled: disabled,
});

watch(
  () => modelVal,
  (val) => {
    emit("update:modelValue", val.value);
    emit("change", val.value);
  },
  { deep: true }
);

watch(
  () => props.disabled,
  (value) => {
    disabled.value = value;
  },
  {
    deep: true,
  }
);

watch(
  () => props.modelValue,
  (value) => {
    modelVal.value = value;
  },
  {
    deep: true,
  }
);
</script>
