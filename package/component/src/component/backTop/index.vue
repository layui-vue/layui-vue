<script lang="ts">
export default {
  name: "LayBacktop",
};
</script>

<script lang="ts" setup>
import {
  ref,
  shallowRef,
  withDefaults,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { LayIcon } from "@layui/icons-vue";
import "./index.less";

export interface BackTopProps {
  target?: string;
  showHeight?: number;
  disabled?: boolean;
  position?: "fixed" | "absolute";
  right?: number;
  bottom?: number;
  size?: "medium" | "small";
  bgcolor?: string;
  opacity?: number;
  color?: string;
  borderRadius?: number | string;
  circle?: boolean;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
}

const props = withDefaults(defineProps<BackTopProps>(), {
  target: "window",
  showHeight: 200,
  icon: "layui-icon-top",
  iconSize: 30,
  disabled: false,
  circle: false,
});

const emit = defineEmits(["click"]);

const backtopRef = ref<HTMLElement | null>(null);
const scrollTarget = shallowRef<Window | HTMLElement | undefined>(undefined);
let visible = ref(props.showHeight === 0);

const classBacktop = computed(() => {
  return {
    "layui-backtop-medium": props.size === "medium",
    "layui-backtop-small": props.size === "small",
  };
});

const borderRadius = computed(() => {
  if (props.circle) {
    return "50%";
  }
  return typeof props.borderRadius === "number"
    ? `${props.borderRadius}px`
    : props.borderRadius;
});

const styleBacktop = computed(() => {
  return {
    position: props.position,
    right: `${props.right}px`,
    bottom: `${props.bottom}px`,
    backgroundColor: props.bgcolor,
    opacity: props.opacity,
    color: props.color,
    borderRadius: borderRadius.value,
  };
});

// TODO 待改进
const easeInOut = (value: number): number => {
  return value < 0.5 ? 2 * value * value : 1 - 2 * (value - 1) * (value - 1);
};

const scrollToTop = () => {
  if (!scrollTarget.value) return;
  if (scrollTarget.value instanceof Window) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // smooth | instant(default)
  } else {
    const previous: number = Date.now();
    const scrollHeight: number = scrollTarget.value.scrollTop;
    const animationFunc = () => {
      if (!scrollTarget.value || scrollTarget.value instanceof Window) return;
      const elapsed = (Date.now() - previous) / 450;
      if (elapsed < 1) {
        scrollTarget.value.scrollTop = scrollHeight * (1 - easeInOut(elapsed));
        window.requestAnimationFrame(animationFunc);
      } else {
        scrollTarget.value.scrollTop = 0;
      }
    };
    window.requestAnimationFrame(animationFunc);
  }
};

const handleScroll = () => {
  if (!scrollTarget.value) return;
  const scrollTop =
    scrollTarget.value instanceof Window
      ? window.pageYOffset
      : scrollTarget.value.scrollTop;
  visible.value = scrollTop >= props.showHeight;
};

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    scrollToTop();
  }
  emit("click", event);
};

const handlerMousedown = () => {
  backtopRef.value!.style.opacity = "1";
};

const handlerMouseup = () => {
  backtopRef.value!.style.opacity = "0.95";
};

// 获取滚动目标元素
const getScrollTarget = () => {
  if (props.target === "window") {
    // @ts-ignore
    return getScrollParent(backtopRef.value!, false);
  } else {
    const targetElement = document.querySelector<HTMLElement>(props.target);
    if (!targetElement) {
      throw new Error(`target is not existed: ${props.target}`);
    }
    // 特定容器内部显示
    if (props.position === "absolute") {
      if (!targetElement.parentElement) {
        throw new Error(
          `target parent element is not existed: ${props.target}`
        );
      }
      targetElement.parentElement.style.position = "relative";
      // backtopRef.value!.style.position = props.position;
    }
    return targetElement;
  }
};

// 获取距离元素最近的可滚动祖先元素
const getScrollParent = (
  element: HTMLElement,
  includeHidden: boolean
): HTMLElement => {
  let style: CSSStyleDeclaration = getComputedStyle(element);
  let excludeStaticParent: boolean = style.position === "absolute";
  let overflowRegex: RegExp = includeHidden
    ? /(auto|scroll|hidden)/
    : /(auto|scroll)/;
  //if (style.position === "fixed") return document.documentElement || document.body || window;
  for (let parent: HTMLElement = element; (parent = parent.parentElement!); ) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === "static") {
      continue;
    }
    if (
      overflowRegex.test(style.overflow + style.overflowY + style.overflowX)
    ) {
      return parent;
    }
  }
  // @ts-ignore
  return window;
};

// 节流
const throttle = (func: Function, wait: number) => {
  var timer: any = null;
  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, wait);
    }
  };
};
const callback = throttle(handleScroll, 300);
onMounted(() => {
  if (!props.target) return;
  scrollTarget.value = getScrollTarget();
  scrollTarget.value.addEventListener("scroll", callback);
});

onBeforeUnmount(() => {
  scrollTarget.value?.removeEventListener("scroll", callback);
});
</script>

<template>
  <div
    v-show="visible"
    ref="backtopRef"
    class="layui-backtop"
    :class="classBacktop"
    :style="{ ...styleBacktop }"
    @click.stop="handleClick"
    @mousedown="handlerMousedown"
    @mouseup="handlerMouseup"
  >
    <slot>
      <lay-icon
        :type="props.icon"
        :size="`${props.iconSize}px`"
        :color="props.iconColor"
      />
    </slot>
  </div>
</template>
