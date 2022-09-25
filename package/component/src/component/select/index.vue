<script lang="ts">
export default {
  name: "LaySelect",
};
</script>

<script setup lang="ts">
import "./index.less";
import { provide, computed, WritableComputedRef, ref, Ref, useSlots, onMounted, VNode, Component } from "vue";
import LayInput from "../input/index.vue";
import LayTagInput from "../tagInput/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LaySelectOption, { LaySelectOptionProps } from "../selectOption/index.vue";

export interface LaySelectProps {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  modelValue?: any;
  multiple?: boolean;
  create?: boolean;
  items?: LaySelectOptionProps[];
  size?: "lg" | "md" | "sm" | "xs";
  allowClear?: boolean;
}

export interface SelectEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}

const props = withDefaults(defineProps<LaySelectProps>(), {
  modelValue: null,
  placeholder: "请选择",
  disabled: false,
  multiple: false,
  create: false,
  size: "md",
  allowClear: false,
});

const slots = useSlots();
const emits = defineEmits<SelectEmits>();
const searchValue = ref("");
const openState: Ref<boolean> = ref(false);
const selectedItem: Ref<any> = ref([]);
const options = ref<any>([]);

onMounted(() => {
    if(slots.default) {
      getOption(slots.default());
    }
})

const getOption = function (nodes: VNode[]) {
  nodes?.map((item: VNode) => {
    let component = item.type as Component;
    if (component.name === LaySelectOption.name) {
      options.value.push(item.props);
    } else {
      getOption(item.children as VNode[]);
    }
  });
};

const selectedValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
    emits("change", val);
  },
});

const multiple = computed(() => {
  return props.multiple;
});

provide("selectedItem", selectedItem);
provide("openState", openState);
provide("selectedValue", selectedValue);
provide("searchValue", searchValue);
provide("multiple", multiple);
</script>

<template>
  可选项: {{ options }}
  选中值: {{ selectedValue }}
  <div class="layui-select">
    <lay-dropdown
      :disabled="disabled"     
      :update-at-scroll = "true"  
      @show="openState = true"
      @hide="openState = false">
      <lay-tag-input
        v-if="multiple"
        v-model="selectedValue"
        :allow-clear="allowClear"
        :disabledInput="true"
      >
        <template #suffix>
          <lay-icon type="layui-icon-triangle-d"></lay-icon>
        </template>
      </lay-tag-input>
      <lay-input
        v-else
        v-model="selectedValue"
        :placeholder="placeholder"
        :allow-clear="allowClear"
      >
        <template #suffix>
          <lay-icon type="layui-icon-triangle-d"></lay-icon>
        </template>
      </lay-input>
      <template #content>
        <dl class="layui-select-options">
          <div class="layui-select-search">
            <lay-input
              v-model="searchValue"
              size="sm"
              placeholder="请选择"
              prefix-icon="layui-icon-search"
            ></lay-input>
          </div>
          <template v-if="items">
            <lay-select-option
              v-for="(item, index) in items"
              v-bind="item"
              :key="index"
            ></lay-select-option>
          </template>
          <slot></slot>
        </dl>
      </template>
    </lay-dropdown>
  </div>
</template>