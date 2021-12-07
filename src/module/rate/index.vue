
<script lang="ts">
export default {
  name: "LayRate",
};
</script>

<script setup lang="ts">
import { defineProps, ref, withDefaults } from "vue";
import "./index.less";

export interface LayRateProps {
  theme?: string;
  length?: number;
  modelValue: number;
  readonly?: boolean | string;
  half?: boolean;
  text?: boolean;
  isBlock?: boolean;
}

const props = withDefaults(defineProps<LayRateProps>(), {
  length: 5,
  modelValue: 0,
  readonly: false,
  half: false,
  text: false,
  isBlock: false,
});

const emit = defineEmits(["update:modelValue", "select"]);

const currentValue = ref<number>(props.modelValue);
// 临时存储值
const tempValue = ref(currentValue.value);
// 是否存在半颗星
const isHalf = ref(
  props.half && Math.round(currentValue.value) >= currentValue.value
);

// 计算评分星值
const getValue = function (index: number, event: any): number {
  if (!props.half) {
    return index;
  }
  isHalf.value = event.offsetX <= event.target.offsetWidth / 2;
  return index - (isHalf.value ? 0.5 : 0);
};

// 在评分星移动事件
const mousemove = function (index: number, event: any) {
  if (props.readonly) {
    return false;
  }
  currentValue.value = getValue(index, event);
};

// 离开评分星事件
const mouseleave = function (index: number, event: any) {
  if (props.readonly) {
    return false;
  }
  currentValue.value = tempValue.value;
  isHalf.value = props.half && Math.round(currentValue.value) >= currentValue.value;
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
              half && isHalf && index === Math.ceil(currentValue)
                ? 'layui-icon-rate-half'
                : 'layui-icon-rate-solid'
            }`,
          ]"
          :style="{ color: theme }"
        />
        <i v-else class="layui-icon layui-icon-rate" :style="{ color: theme }"/>
      </li>
    </ul>
    <template v-if="text">
      <span class="layui-inline">
        <slot :value="currentValue">
          {{ currentValue + '星' }}
        </slot>
      </span>
    </template>
  </div>
</template>
