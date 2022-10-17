<script lang="ts">
export default {
  name: "LayRate",
};
</script>

<script setup lang="ts">
import { computed, ref, watch, withDefaults } from "vue";
import "./index.less";

export interface RateProps {
  theme?: string;
  length?: number;
  modelValue: number;
  readonly?: boolean | string;
  half?: boolean;
  text?: boolean;
  isBlock?: boolean;
  allowClear?: boolean;
  clearIcon?: string;
  icons?: string[];
}

const props = withDefaults(defineProps<RateProps>(), {
  length: 5,
  modelValue: 0,
  readonly: false,
  half: false,
  text: false,
  isBlock: false,
  allowClear: false,
  clearIcon: "layui-icon-close-fill",
  icons: () => [
    "layui-icon-rate",
    "layui-icon-rate-half",
    "layui-icon-rate-solid",
  ],
});

const emit = defineEmits(["update:modelValue", "select", "clear"]);

const currentValue = ref<number>(props.modelValue);
// 临时存储值
const tempValue = ref(currentValue.value);
// 是否存在半颗星
const isHalf = computed(
  () => props.half && Math.round(currentValue.value) !== currentValue.value
);

watch(
  () => props.modelValue,
  () => {
    currentValue.value = props.modelValue;
    tempValue.value = props.modelValue;
  }
);
// 计算评分星值
const getValue = function (index: number, event: any): number {
  if (!props.half) {
    return index;
  }
  return index - (event.offsetX <= event.target.offsetWidth / 2 ? 0.5 : 0);
};

// 在评分星移动事件
const mousemove = function (index: number, event: any) {
  if (props.readonly) {
    return false;
  }
  currentValue.value = getValue(index, event);
};

// 离开评分星事件
const mouseleave = function () {
  if (props.readonly) {
    return false;
  }
  currentValue.value = tempValue.value;
};

// 选择评分星 --> 单击事件
const action = function (index: number, event: any) {
  if (props.readonly) {
    return false;
  }
  currentValue.value = getValue(index, event);
  tempValue.value = currentValue.value;
  emit("update:modelValue", currentValue.value);
  emit("select", currentValue.value);
};

// 清除评分图标
const showClearIcon = computed(() => !props.readonly && props.allowClear);
const clearRate = function () {
  tempValue.value = 0;
  currentValue.value = 0;
  emit("clear", currentValue.value);
};
</script>

<template>
  <div :class="isBlock ? 'layui-block' : 'layui-inline'">
    <ul class="layui-rate" @mouseleave="mouseleave">
      <li
        v-for="index of length"
        :key="index"
        class="layui-inline"
        @mousemove="mousemove(index, $event)"
        @click="action(index, $event)"
      >
        <i
          v-if="index <= Math.ceil(currentValue)"
          :class="[
            'layui-icon',
            `${
              icons[
                icons.length -
                  (isHalf && index === Math.ceil(currentValue) ? 2 : 1)
              ]
            }`,
          ]"
          :style="{ color: theme }"
        ></i>
        <i
          v-else
          :class="['layui-icon'].concat(icons[0])"
          :style="{ color: theme }"
        ></i>
      </li>
    </ul>
    <template v-if="text">
      <span class="layui-inline">
        <slot :value="currentValue">
          {{ currentValue + "星" }}
        </slot>
      </span>
    </template>
    <template v-if="showClearIcon">
      <i
        :class="['layui-icon', 'layui-rate-clear-icon', clearIcon]"
        @click="clearRate"
        title="清除评分"
      ></i>
    </template>
  </div>
</template>
