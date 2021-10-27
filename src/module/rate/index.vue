<template>
  <ul class="layui-rate">
    <li
      v-for="(rate, index) in rates"
      :key="rate"
      class="layui-inline"
      @mouseenter="mouseenter(index)"
    >
      <i
        v-if="rate"
        class="layui-icon layui-icon-rate-solid"
        :style="{ color: theme }"
      />
      <i v-else class="layui-icon layui-icon-rate" :style="{ color: theme }" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { defineProps, Ref, ref, watch, withDefaults } from 'vue'

const rates: Ref<Array<boolean>> = ref([])

const props = withDefaults(
  defineProps<{
    length?: number
    modelValue?: number
    character?: string
    readonly?: boolean
    theme?: string
  }>(),
  {
    length: 5,
    modelValue: 0,
    readonly: false,
  }
)

watch(
  props,
  function () {
    rates.value = []
    for (let index = 0; index < props.length; index++) {
      rates.value.push(false)
    }
    for (let index = props.modelValue - 1; index >= 0; index--) {
      rates.value[index] = true
    }
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['update:modelValue'])

const mouseenter = function (index: number) {
  if (props.readonly) {
    return false
  }
  for (let i = index; i >= 0; i--) {
    rates.value[i] = true
  }
  for (let i = index + 1; i < props.length; i++) {
    rates.value[i] = false
  }
  emit('update:modelValue', index + 1)
}
</script>
