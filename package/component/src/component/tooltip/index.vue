<script lang="ts">
export default {
  name: "LayTooltip",
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import "./index.less";
import LayPopper from "../popper/index.vue";
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  PropType,
  ref,
  shallowRef,
  StyleValue,
} from "vue";
import { useEventListener } from "@vueuse/core";

export type PopperTrigger = "click" | "hover" | "focus" | "contextMenu";

const props = defineProps({
  content: {
    type: [Number, String],
    required: false,
  },
  position: {
    type: String,
    default: "top",
  },
  isDark: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isCanHide: {
    type: Boolean,
    default: true,
  },
  isAutoShow: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  trigger: {
    type: String as PropType<PopperTrigger | PopperTrigger[]>,
    default: "hover",
  },
  enterable: {
    type: Boolean,
    default: true,
  },
  popperClass: {
    type: [String, Array, Object],
  },
  popperStyle: {
    type: [String, Object] as PropType<StyleValue>,
  },
});
const vm = getCurrentInstance()!;
const isMounted = ref(false);
const tooltipRefEl = shallowRef<HTMLElement | undefined>(undefined);

const innerProps = computed(() => {
  return { el: vm.proxy!.$el.nextElementSibling, ...vm.proxy!.$props };
});

const setEllipsis = function () {
  if (tooltipRefEl.value) {
    let tooltipHtml = tooltipRefEl.value;

    if (
      tooltipHtml.offsetWidth >=
      (tooltipHtml.firstChild as HTMLElement)?.offsetWidth
    ) {
      isMounted.value = false;
    } else {
      isMounted.value = true;
    }
  } else {
    isMounted.value = true;
  }
};

onMounted(() => {
  if (props.isAutoShow) {
    useEventListener("resize", () => {
      setEllipsis();
    });
  }
  nextTick(() => {
    setEllipsis();
  });
});
</script>
<template>
  <div ref="tooltipRefEl" v-if="isAutoShow" class="lay-tooltip-content">
    <span>
      <slot></slot>
    </span>
  </div>
  <slot v-else></slot>
  <lay-popper v-if="isMounted" v-bind="innerProps">
    <slot name="content"></slot>
  </lay-popper>
</template>
