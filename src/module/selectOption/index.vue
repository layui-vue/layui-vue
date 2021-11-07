<template>
  <dd
    :value="value"
    :class="[
      selectItem.value === value ? 'layui-this' : '',
      disabled ? 'layui-disabled' : '',
    ]"
    @click="selectHandle"
  >
    {{ label }}
  </dd>
</template>

<script setup name="LaySelectOption" lang="ts">
import { SelectItem } from '../type'
import { defineProps, inject, onMounted, Ref } from 'vue'

const props = withDefaults(
  defineProps<{
    value: string
    label: string
    disabled?: boolean | string
  }>(),
  {
    disabled: false,
  }
)

const selectItem = inject('selectItem') as SelectItem
const openState = inject('openState') as Ref<boolean>

const selectHandle = function () {
  if (props.disabled) {
    return
  }
  openState.value = false
  selectItem.value = props.value
  selectItem.label = props.label
}

// init selected
onMounted(() => {
  if (selectItem.value === props.value) {
    selectItem.value = props.value
    selectItem.label = props.label
  }
})
</script>
