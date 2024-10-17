<script setup lang="ts">
import "./index.less";
import {
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

export interface CarouselProps {
  width?: string;
  height?: string;
  modelValue?: string | number;
  autoplay?: boolean;
  arrow?: "always" | "hover" | "none";
  anim?: "default" | "updown" | "fade";
  indicator?: "inside" | "outside" | "none";
  pauseOnHover?: boolean;
  interval?: number;
}

defineOptions({
  name: "LayCarousel",
});

const props = withDefaults(defineProps<CarouselProps>(), {
  width: "100%",
  height: "280px",
  anim: "default",
  autoplay: true,
  arrow: "hover",
  interval: 3000,
  indicator: "inside",
  pauseOnHover: true,
});

const slot = useSlots() as any;

const active = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const anim = computed(() => props.anim);

const emit = defineEmits(["update:modelValue", "change"]);

const setActive = (id: string | number) => (active.value = id);

watch(
  () => active.value,
  (val) => emit("change", val)
);

const children: Ref<VNode[]> = ref([]);
const slotsChange = ref(true);

const setItemInstanceBySlot = function (nodes: VNode[]) {
  const showNodes = nodes?.filter((item: VNode) => {
    return item.children != "v-if";
  });
  showNodes?.forEach((item) => {
    (item.type as Component).name != CarouselItem.name
      ? setItemInstanceBySlot(item.children as VNode[])
      : children.value.push(item);
  });
};

watch(
  slotsChange,
  () => {
    children.value = [];
    setItemInstanceBySlot((slot.default && slot.default()) as VNode[]);
  },
  { immediate: true, deep: true }
);

const prev = () => {
  // 直接向前一个取即可，findIndex 总是正常工作的，到达第一个时 0-1 = -1，会自动取最后一个
  active.value = children.value.at(
    children.value.findIndex((item) => item.props?.id === active.value) - 1
  )?.props?.id;
};

const next = () => {
  // 利用取余数的方法，向后移动，如果到达末尾则会自动回到第一个
  const index =
    (children.value.findIndex((item) => item.props?.id === active.value) + 1) %
    children.value.length;
  active.value = children.value.at(index)?.props?.id;
};

const autoplay = () => {
  next();
};

let intervalTimer = 0;

const handleMouseEnter = () => {
  props.autoplay &&
    props.pauseOnHover &&
    (window.clearInterval(intervalTimer), (intervalTimer = 0));
};

const handleMouseLeave = () => {
  props.autoplay &&
    props.pauseOnHover &&
    (intervalTimer = window.setInterval(autoplay, props.interval));
};

watch(
  () => props.autoplay,
  () => {
    if (props.autoplay) {
      intervalTimer = window.setInterval(autoplay, props.interval);
    }
  },
  { immediate: true }
);

provide("active", active);
provide("slotsChange", slotsChange);
provide("anim", anim);

defineExpose({
  setActive,
  prev,
  next,
});
</script>

<template>
  <div
    class="layui-carousel"
    :lay-anim="anim"
    :lay-indicator="indicator"
    :lay-arrow="arrow"
    :style="{ width: width, height: height }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div carousel-item>
      <slot></slot>
    </div>
    <template v-if="children.length > 1">
      <div class="layui-carousel-ind">
        <ul>
          <li
            v-for="(child, index) in children"
            :key="index"
            :class="[child.props?.id === active ? 'layui-this' : '']"
            @click.stop="setActive(child.props?.id)"
          ></li>
        </ul>
      </div>
      <button
        class="layui-icon layui-carousel-arrow"
        lay-type="sub"
        @click="prev"
      >
        {{ anim === "updown" ? "" : "" }}
      </button>
      <button
        class="layui-icon layui-carousel-arrow"
        lay-type="add"
        @click="next"
      >
        {{ anim === "updown" ? "" : "" }}
      </button>
    </template>
  </div>
</template>
