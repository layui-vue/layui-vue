<template>
  <ul class="layui-rate">
    <li
      v-for="index of length"
      :key="index"
      class="layui-inline"
      @mouseenter="mouseenter(index, $event)"
    >
      <i
        v-if="index <= currentValue"
        class="layui-icon layui-icon-rate-solid"
        :style="{ color: theme }"
      />
      <i v-else class="layui-icon layui-icon-rate" :style="{ color: theme }" />
    </li>
    {{
      currentValue
    }}
  </ul>
</template>
<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    length?: number
    modelValue: number
    readonly?: boolean | string
    theme?: string
  }>(),
  {
    length: 5,
    modelValue: 0,
    readonly: false,
    theme: 'green',
  }
)

const emit = defineEmits(['update:modelValue'])

const currentValue = computed({
  get: function () {
    return props.modelValue
  },
  set: function (val) {
    emit('update:modelValue', val)
  },
})

const mouseenter = function (index: number, event: any) {
  if (props.readonly) {
    return false
  }
  currentValue.value = index
}
</script>
