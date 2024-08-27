<template>
  <div class="layui-segmented" :class="[
    `layui-segmented-size-${props.size}`,
  ]" ref="segment">
    <div class="layui-segmented-container">
      <div
           class="layui-segmented-item"
           v-for="(item, i) in items"
           :key="i"
           @click="clickItem($event, item.label, i)">
        <input class="layui-segmented-item-radio" v-if="props.name" type="radio" :name="props.name"
               :value="item?.value ?? item.label">
        <slot v-if="item.slot" :name="item.slot"></slot>
        <span v-else class="layui-segmented-item-label">{{ item.label }}</span>
      </div>
      <div class="layui-segmented-indicator" ref="segmentIndicator"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref, watch, onMounted, InputHTMLAttributes, ReservedProps } from "vue";

export interface ItemProps {
  options:
  | {
    label: string;
    slot?: string;
    [key: string]: any;
  }[]
  | string[];
  modelValue: string;
  size?: "lg" | "default" | "sm" | "xs";
  name?: string;
  disabled?: boolean;
}

defineOptions({
  name: "LaySegmented",
});
const emits = defineEmits<{
  (ev: "change", value: string): void;
  (ev: "update:modelValue", value: string): void;
}>();

const props = withDefaults(defineProps<ItemProps>(), {
  modelValue: "",
  size: "default",
  disabled: false,
});

const segmentIndicator: Ref<HTMLElement | undefined> = ref();
const segment: Ref<HTMLElement | undefined> = ref();
const items = ref((() => {
  return props.options.map(a => {
    return typeof a === "string" ? { label: a } : a;
  });
})());
const currentItem = computed(() => {
  return items.value.find((a) => a.label === props.modelValue);
});

const rect = ref({
  left: "0px",
  top: "0px",
  width: "0px",
  height: "0px",
});

const rectWidth = computed(() => rect.value.width);
const rectHeight = computed(() => rect.value.height);
const rectLeft = computed(() => rect.value.left);
const rectTop = computed(() => rect.value.top);

const setItem = (target: HTMLElement) => {
  rect.value.width = `${target.clientWidth ?? 0}px`;
  rect.value.height = `${target.clientHeight ?? 0}px`;
  rect.value.left = `${target.offsetLeft ?? 0}px`;
  rect.value.top = `${target.offsetTop ?? 0}px`;
};

const clickItem = (ev: Event, label: string, index: number) => {
  if (props.name) {
    (segment.value?.querySelectorAll('.layui-segmented-item-radio').forEach(radio => {
      (radio as HTMLInputElement).checked = false;
    }));
    (segment.value?.querySelectorAll(`.layui-segmented-item-radio`).item(index) as HTMLInputElement).checked = true;
  }
  let target = ev.target;
  setItem(target as HTMLElement);
  emits("change", label);
  emits("update:modelValue", label);
};

const init = (val: any) => {
  try {
    setItem(
      // @ts-ignore
      segment?.value
        ?.querySelectorAll(".layui-segmented-item")
        // @ts-ignore
        .item(items.value?.findIndex((a) => a.label === props.modelValue))
    );
  } catch (e) {
    console.warn(`Cannot find label`, props.modelValue, `in`, items.value);
  }
};

watch(
  () => props.modelValue,
  (val) => init(val)
);

onMounted(() => {
  init(props.modelValue);
});

defineExpose({
  currentItem
});
</script>

<style>
@import "./index.less";

.layui-segmented-indicator {
  top: v-bind(rectTop);
  width: v-bind(rectWidth);
  height: v-bind(rectHeight);
  left: v-bind(rectLeft);
}
</style>
