<template>
  <div class="layui-segmented" ref="segment">
    <div class="layui-segmented-container">
      <div
        class="layui-segmented-item"
        v-for="(item, i) in items"
        :key="i"
        @click="clickItem($event, item.label)"
      >
        <span class="layui-segmented-item-label">{{ item.label }}</span>
      </div>
      <div class="layui-segmented-indicator" ref="segmentIndicator"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref, watch, onMounted } from "vue";

export interface ItemProps {
  items:
    | {
        label: string;
      }[]
    | undefined;
  modelValue: string;
}

defineOptions({
  name: "LaySegmented",
});
const emits = defineEmits<{
  (ev: "update:modelValue", value: string): void;
}>();

const props = withDefaults(defineProps<ItemProps>(), {
  modelValue: "",
});

const segmentIndicator: Ref<HTMLElement | undefined> = ref();
const segment: Ref<HTMLElement | undefined> = ref();
const items = ref(props.items);

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

const clickItem = (ev: Event, label: string) => {
  let target = ev.target;
  setItem(target as HTMLElement);
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
