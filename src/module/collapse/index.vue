<template>
  <div class="layui-collapse">
    <slot />
  </div>
</template>

<script setup name="LayCollapse"></script>
<script setup lang="ts">
import {
  withDefaults,
  defineProps,
  provide,
  ref,
  defineEmits,
  watch,
} from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: number | string | [];
    accordion?: boolean;
  }>(),
  {
    modelValue: () => [],
    accordion: false,
  }
);

// 监听传入的值
watch(
  () => props.modelValue,
  (val, oldVal) => {
    activeValues.value = ([] as any[]).concat(val);
  }
);
const emit = defineEmits(["update:modelValue", "change"]);

const activeValues = ref<Array<any>>(([] as any[]).concat(props.modelValue));

provide("layCollapse", {
  accordion: props.accordion,
  activeValues,
  emit,
});
</script>
