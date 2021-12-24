<template>
  <dd
    :value="value"
    :class="[
      {'layui-this' : selected},
      {'layui-disabled' : disabled}
    ]"
    @click="selectHandle"
  >
    <template v-if="selectItem.multiple">
      <lay-checkbox skin="primary" v-model="selected" @change="selectHandle" label=""></lay-checkbox>
    </template>
    <slot>{{ label }}</slot>
  </dd>
</template>

<script lang="ts">
export default {
  name : 'LaySelectOption'
}
</script>

<script setup lang="ts">
import LayCheckbox from '../checkbox';
import { SelectItem, SelectItemHandle } from '../type'
import { computed, defineProps, inject, onMounted, Ref} from 'vue'

const props = withDefaults(
  defineProps<{
    value: string | null | undefined
    label?: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  }
)

const selectItemHandle = inject('selectItemHandle') as SelectItemHandle
const selectItem = inject('selectItem') as Ref<SelectItem>

const selectHandle = function () {
  !props.disabled && callSelectItemHandle(!selected.value);
}
const callSelectItemHandle = function(isChecked ?: boolean){
  selectItemHandle({
    value : props.value,
    label : props.label,
    disabled : props.disabled
  }, isChecked);
}
const selected = computed({
  get(){
    const selectValues = selectItem.value.value;
    if (Array.isArray(selectValues)) {
      return (selectValues as any[]).indexOf(props.value) > -1;
    }
    return selectItem.value.value === props.value
  },
  set(val){}
})
onMounted(() => selected.value && callSelectItemHandle())
</script>
