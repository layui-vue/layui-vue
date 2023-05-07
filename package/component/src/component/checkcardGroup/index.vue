<!--
 * @Author: baobaobao
 * @Date: 2023-04-26 13:28:17
 * @LastEditTime: 2023-04-28 14:32:38
 * @LastEditors: baobaobao
-->
<template>
  <div class="layui-checkcard-group">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: "LayCheckcardGroup",
};
</script>
<script lang="ts" setup>
import {
  ref,
  watch,
  provide,
} from "vue";
import { Recordable } from "../../types";

export interface CheckCardGroup {
  modelValue?: Recordable[];
  disabled?: boolean;
}
const props = withDefaults(defineProps<CheckCardGroup>(), {
  modelValue: () => [],
  disabled: false,
});

const emit = defineEmits(["update:modelValue", "change"]);

const modelVal = ref(props.modelValue);

provide("checkcardGroup", {
  name: "LayCheckCardGroup",
  modelVal: modelVal,
  disabled: props.disabled,
});

watch(
  () => modelVal,
  (val) => {
    emit("update:modelValue", val.value);
    emit("change", val.value);
  },
  { deep: true }
);
</script>
