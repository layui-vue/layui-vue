<template>
  <div class="layui-segmented" :class="[
    disabled && `layui-segmented-disabled`,
    `layui-segmented-size-${props.size}`,
  ]" ref="segment">
    <div class="layui-segmented-container">
      <div
           class="layui-segmented-item"
           v-for="(item, i) in items"
           :key="i"
           @click.prevent.stop="clickItem($event, item.label, i)">
        <input class="layui-segmented-item-radio" v-if="props.name" type="radio" :name="props.name"
               :value="item?.value ?? item.label">
        <div class="layui-segmented-item-slot" v-if="item.slot || $slots.default">
          <slot :name="item.slot || 'default'" v-bind="item"></slot>
        </div>
        <span v-else class="layui-segmented-item-label">{{ item.label }}</span>
      </div>
      <div class="layui-segmented-indicator" ref="segmentIndicator"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref, watch, onMounted, InputHTMLAttributes, ReservedProps } from "vue";
import { LaySegmentedProps } from "./interfaces";

defineOptions({
  name: "LaySegmented",
});

const emits = defineEmits<{
  (ev: "change", value: string): void;
  (ev: "update:modelValue", value: string): void;
}>();

const props = withDefaults(defineProps<LaySegmentedProps>(), {
  modelValue: "",
  size: "default",
  disabled: false,
});

const segmentIndicator: Ref<HTMLElement | undefined> = ref();
const segment: Ref<HTMLElement | undefined> = ref();
const disabled = ref(props.disabled);
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
  if (disabled.value) return;
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

watch(
  () => props.disabled,
  (val) => disabled.value = val
);

watch(
  () => props.options,
  (val) => items.value = val.map(i => typeof i === "string" ? { label: i } : i),
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
