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
  onUnmounted,
  PropType,
  ref,
  shallowRef,
  StyleValue,
} from "vue";
import { unrefElement, useEventListener } from "@vueuse/core";

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
    default: false,
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
const tooltipRef = shallowRef<HTMLElement | undefined>(undefined);
const popperRef = ref<HTMLElement | undefined>();

const innerProps = computed(() => {
  return { el: vm.proxy!.$el.nextElementSibling, ...vm.proxy!.$props };
});

const setEllipsis = function () {
  if (tooltipRef.value) {
    let tooltipHtml = tooltipRef.value;
    if (tooltipHtml.offsetWidth >= (tooltipHtml.firstChild as HTMLElement)?.offsetWidth) {
      isMounted.value = false;
    } else {
      isMounted.value = true;
    }
  } else {
    isMounted.value = true;
  }
};

const observer = new MutationObserver(() => {
  nextTick(() => {
    setEllipsis();
  })
})

onMounted(() => {
  if (props.isAutoShow) {
    useEventListener("resize", () => {
      setEllipsis();
    });
    if (tooltipRef.value) {
      observer.observe(tooltipRef.value, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
  }
  nextTick(() => {
    setEllipsis();
  });
});

const doHidden = function () {
  nextTick(() => {
    // @ts-ignore
    popperRef.value.hide();
  });
};

const update = function () {
  nextTick(() => {
    // @ts-ignore
    popperRef.value.updatePosistion();
  });
};

defineExpose({ hide: doHidden, update });
</script>
<template>
  <div ref="tooltipRef" v-if="isAutoShow" class="lay-tooltip-content">
    <span>
      <slot></slot>
    </span>
  </div>
  <slot v-else></slot>
  <lay-popper ref="popperRef" v-if="isMounted" v-bind="innerProps">
    <slot name="content"></slot>
  </lay-popper>
</template>
