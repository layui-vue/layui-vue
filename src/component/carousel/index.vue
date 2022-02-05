<script lang="ts">
export default {
  name: "LayCarousel"
}
</script>

<script setup lang="ts">
import {
  withDefaults,
  provide,
  useSlots,
  ref,
  computed,
} from "vue";

const slot = useSlots() as any;
const slots = slot.default && (slot.default() as any[]);

const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    modelValue: string;
    anim?: string;
    arrow?: string;
    indicator?: string;
  }>(),
  {
    width: "100%",
    height: "280px",
    anim: "default",
    arrow: "hover",
    indicator: "inside",
  }
);

const active = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const change = function (id: any) {
  emit("change", id);
  active.value = id;
};

provide("active", active);

const prev = function () {
  for (var i = 0; i < slots.length; i++) {
    if (slots[i].props.id === active.value) {
      if (i === 0) {
        active.value = slots[slots.length - 1].props.id;
      }
      active.value = slots[i - 1].props.id;
      break;
    }
  }
};

const next = function () {
  for (var i = 0; i < slots.length; i++) {
    if (slots[i].props.id === active.value) {
      if (i === slots.length - 1) {
        active.value = slots[0].props.id;
      }
      active.value = slots[i + 1].props.id;
      break;
    }
  }
};
</script>

<template>
  <div
    class="layui-carousel"
    :lay-anim="anim"
    :lay-indicator="indicator"
    :lay-arrow="arrow"
    :style="{ width: width, height: height }"
  >
    <div carousel-item>
      <slot></slot>
    </div>
    <div class="layui-carousel-ind">
      <ul>
        <li
          v-for="ss in slots"
          :key="ss"
          :class="[ss.props.id === active ? 'layui-this' : '']"
          @click.stop="change(ss.props.id)"
        ></li>
      </ul>
    </div>
    <button
      class="layui-icon layui-carousel-arrow"
      lay-type="sub"
      @click="prev"
    >
      {{ anim === "updown" ? "" : "" }}</button
    ><button
      class="layui-icon layui-carousel-arrow"
      lay-type="add"
      @click="next"
    >
      {{ anim === "updown" ? "" : "" }}
    </button>
  </div>
</template>
