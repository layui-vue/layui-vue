<template>
    <dd :value="value" @click="selectHandle" :class="[selectItem.value === value?'layui-this':'']">
        {{label}}
    </dd>
</template>

<script setup name="LaySelectOption" lang="ts">
import { SelectItem } from '../type'
import { defineProps, inject } from 'vue'

const props =
  defineProps<{
    value?: string
    label?: string
  }>()

const selectItem = inject("selectItem") as SelectItem

const selectHandle = function(){
  selectItem.value = props.value
  selectItem.label = props.label
}

// init selected

if(selectItem.value === props.value) {
  selectItem.value = props.value
  selectItem.label = props.label
}

</script>
