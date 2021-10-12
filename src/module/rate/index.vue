<template>
  <ul class="layui-rate">
    <li
      v-for="(rate, index) in rates"
      :key="rate"
      class="layui-inline"
      @mouseenter="mouseenter(index)"
    >
      <i class="layui-icon" :class="[rate]" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { defineProps, Ref, ref, withDefaults } from 'vue'

const rates: Ref<Array<string>> = ref([])

const props = withDefaults(
  defineProps<{
    length?: number
    modelValue?: number
  }>(),
  {
    length: 5,
    modelValue: 0,
  }
)

for (let index = 0; index < props.length; index++) {
  rates.value.push('layui-icon-rate')
}

for (let index = props.modelValue - 1; index >= 0; index--) {
  rates.value[index] = 'layui-icon-rate-solid'
}

const emit = defineEmits(['update:modelValue'])

const mouseenter = function (index: number) {
  for (let i = index; i >= 0; i--) {
    rates.value[i] = 'layui-icon-rate-solid'
  }
  for (let j = index + 1; j < props.length; j++) {
    rates.value[j] = 'layui-icon-rate'
  }

  // select update 时, 通知 change 事件

  emit('update:modelValue', index + 1)
}
</script>
