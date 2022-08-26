<script lang="ts">
export default {
  name: "LayCarousel",
};
</script>

<script setup lang="ts">
import "./index.less";
import {
  withDefaults,
  provide,
  useSlots,
  ref,
  computed,
  VNode,
  Ref,
  Component,
  watch,
} from "vue";
import CarouselItem from "../carouselItem/index.vue";

const slot = useSlots() as any;
const slots = slot.default && (slot.default() as any[]);

const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    modelValue: string;
    anim?: string;
    autoplay?: boolean;
    arrow?: string;
    interval?: number;
    indicator?: string;
  }>(),
  {
    width: "100%",
    height: "280px",
    anim: "default",
    autoplay: true,
    arrow: "hover",
    interval: 3000,
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

const anim = computed({
  get() {
    return props.anim;
  },
  set() {},
});

const emit = defineEmits(["update:modelValue", "change"]);

const change = function (id: any) {
  emit("change", id);
  active.value = id;
};

const childrens: Ref<VNode[]> = ref([]);
const slotsChange = ref(true);

const setItemInstanceBySlot = function (nodeList: VNode[]) {
  nodeList?.map((item) => {
    let component = item.type as Component;
    if (component.name != CarouselItem.name) {
      setItemInstanceBySlot(item.children as VNode[]);
    } else {
      childrens.value.push(item);
    }
  });
};

watch(
  slotsChange,
  () => {
    childrens.value = [];
    setItemInstanceBySlot((slot.default && slot.default()) as VNode[]);
  },
  { immediate: true }
);

provide("active", active);
provide("slotsChange", slotsChange);
provide("anim", anim);

const sub = () => {
  for (var i = 0; i < childrens.value.length; i++) {
    if (childrens.value[i].props?.id === active.value) {
      if (i === 0) {
        active.value = childrens.value[slots.length - 1].props?.id;
      } else {
        active.value = childrens.value[i - 1].props?.id;
      }
      break;
    }
  }
};

const add = () => {
  for (var i = 0; i < childrens.value.length; i++) {
    if (childrens.value[i].props?.id === active.value) {
      if (i === childrens.value.length - 1) {
        active.value = childrens.value[0].props?.id;
      } else {
        active.value = childrens.value[i + 1].props?.id;
      }
      break;
    }
  }
};

const autoplay = () => {
  for (var i = 0; i < childrens.value.length; i++) {
    if (childrens.value[i].props?.id === active.value) {
      if (i === childrens.value.length - 1) {
        active.value = childrens.value[0].props?.id;
      } else {
        active.value = childrens.value[i + 1].props?.id;
      }
      break;
    }
  }
};

watch(
  () => props.autoplay,
  () => {
    if (props.autoplay) setInterval(autoplay, props.interval);
  },
  { immediate: true }
);
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
          v-for="(ss, index) in childrens"
          :key="index"
          :class="[ss.props?.id === active ? 'layui-this' : '']"
          @click.stop="change(ss.props?.id)"
        ></li>
      </ul>
    </div>
    <button class="layui-icon layui-carousel-arrow" lay-type="sub" @click="sub">
      {{ anim === "updown" ? "" : "" }}
    </button>
    <button class="layui-icon layui-carousel-arrow" lay-type="add" @click="add">
      {{ anim === "updown" ? "" : "" }}
    </button>
  </div>
</template>
