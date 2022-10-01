<script lang="ts">
export default {
  name: "LayTreeSelect",
};
</script>

<script lang="ts" setup>
import { computed, ref } from "vue";

export interface LayTreeSelect {
  data: any,
  modelValue: string;
  disabled: boolean;
}

export interface TreeSelectEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "search", value: string): void;
}

const props = withDefaults(defineProps<LayTreeSelect>(), {
  disabled: false
});

const singleValue = ref();
const dropdownRef = ref();
const openState = ref(false);
const emits = defineEmits<TreeSelectEmits>();
const selectedValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
    emits("change", value);
  }
})

const handleClick = (node: any) => {
  dropdownRef.value.hide();
  selectedValue.value = node.id;
  singleValue.value = node.title; 
}
</script>

<template>
  <div class="layui-tree-select">
    <lay-dropdown       
      ref="dropdownRef"
      :disabled="disabled"
      :update-at-scroll="true"
      @show="openState = true"
      @hide="openState = false">
      <lay-input v-model="singleValue"></lay-input>
      <template #content>
        <div class="layui-tree-select-content">
          <lay-tree :data="data" :onlyIconControl="true" @node-click="handleClick"></lay-tree>
        </div>
      </template>
  </lay-dropdown>
  </div>
</template>

<style scoped>
.layui-tree-select {
  width: 220px;
}

.layui-tree-select-content {
  padding: 10px;
}
</style>
