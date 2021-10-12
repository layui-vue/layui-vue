<template>
  <span @click.stop="handleClick">
    <input type="checkbox" :name="name" :value="label" />
    <div
      class="layui-unselect"
      :class="[
        {
          'layui-checkbox-disbaled layui-disabled': disabled,
        },
        {
          'layui-form-checked': needCustomChecked
            ? customChecked
            : props.checked,
        },
        'layui-form-checkbox',
      ]"
      :lay-skin="skin"
    >
      <span><slot /></span>
      <i class="layui-icon layui-icon-ok" />
    </div>
  </span>
</template>

<script setup name="LayCheckbox" lang="ts">
import { defineProps, ref } from 'vue'

const props =
  defineProps<{
    name?: string
    skin?: string
    label?: string
    checked?: Boolean
    disabled?: Boolean
  }>()

const customChecked = ref(false)
const needCustomChecked = props.checked == undefined

const emit = defineEmits(['update:checked', 'change'])

const handleClick = function () {
  if (!props.disabled) {
    if (needCustomChecked) {
      customChecked.value = !customChecked.value
      emit('change', !customChecked.value)
    } else {
      emit('update:checked', !props.checked)
      emit('change', !props.checked)
    }
  }
}
</script>
