<template>
  <div
    class="layui-segmented"
    :class="[
      disabled && `layui-segmented-disabled`,
      `layui-segmented-size-${props.size}`,
    ]"
    ref="segment"
  >
    <div class="layui-segmented-container">
      <div
        class="layui-segmented-item"
        v-for="(item, i) in items"
        :key="i"
        @click.prevent.stop="clickItem(item.label)"
      >
        <input
          class="layui-segmented-item-radio"
          v-if="props.name"
          type="radio"
          :name="props.name"
          :value="item?.value ?? item.label"
        />
        <div
          class="layui-segmented-item-slot"
          v-if="item.slot || $slots.default"
        >
          <slot :name="item.slot || 'default'" v-bind="item"></slot>
        </div>
        <span v-else class="layui-segmented-item-label">{{ item.label }}</span>
      </div>
      <div class="layui-segmented-indicator" ref="segmentIndicator"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, computed, watchEffect } from "vue";
import { LaySegmentedProps } from "./interfaces";

import { isString } from "../../utils";

defineOptions({
  name: "LaySegmented",
});

const emits = defineEmits<{
  (ev: "change", value: string): void;
  (ev: "update:modelValue", value: string): void;
}>();

const props = withDefaults(defineProps<LaySegmentedProps>(), {
  modelValue: "",
  size: "md",
  disabled: false,
});

const segmentIndicator: Ref<HTMLElement | undefined> = ref();
const segment: Ref<HTMLElement | undefined> = ref();
const _disabled = computed(() => props.disabled);

const items = computed(() => {
  return props.options.map((option) => {
    return isString(option) ? { label: option } : option;
  });
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

const clickItem = (label: string) => {
  if (_disabled.value) return;

  emits("change", label);
  emits("update:modelValue", label);
};

watchEffect(() => {
  if (props.name) {
    segment.value
      ?.querySelectorAll(".layui-segmented-item-radio")
      .forEach((radio) => {
        (radio as HTMLInputElement).checked = false;
      });

    const radioDom = segment.value
      ?.querySelectorAll(`.layui-segmented-item-radio`)
      .item(
        items.value.findIndex((a) => a.label === props.modelValue)
      ) as HTMLInputElement;

    if (radioDom) {
      radioDom.checked = true;
    }
  }
  const itemDom = (segment?.value
    ?.querySelectorAll(".layui-segmented-item")
    .item(items.value?.findIndex((a) => a.label === props.modelValue)) ||
    {}) as HTMLElement;

  setItem(itemDom);
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
