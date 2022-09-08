<template>
  <teleport to="body" v-if="isExist">
    <transition v-show="innerVisible">
      <div
        ref="popper"
        :class="['layui-popper', { 'layui-dark': isDark }]"
        :style="style"
        :position="position"
      >
        <slot>{{ content }}</slot>
        <div class="layui-popper-arrow"></div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
const NAME = "LayPopper";
export default {
  name: NAME,
};
</script>

<script setup lang="ts">
import "./index.less";
import postionFns from "./calcPosition";
import {
  CSSProperties,
  ref,
  watch,
  onMounted,
  watchEffect,
  nextTick,
  onBeforeUnmount,
  useSlots,
} from "vue";
import { on } from "../../utils/domUtil";
import { useThrottleFn } from "@vueuse/core";

export interface LayPopperProps {
  el: any;
  content?: string | Number;
  position?: string;
  trigger?: string;
  enterable?: boolean;
  isDark?: boolean;
  disabled?: boolean;
  isCanHide?: boolean;
  isAutoShow?: boolean;
  visible?: boolean;
}

const props = withDefaults(defineProps<LayPopperProps>(), {
  position: "top",
  isDark: true,
  disabled: false,
  enterable: true,
  isCanHide: true,
  isAutoShow: false,
  trigger: "hover",
  visible: false,
});

const slots = useSlots();

const EVENT_MAP: any = {
  hover: ["mouseenter", null, "mouseleave", false],
  click: ["click", document, "click", true],
};

const triggerArr = EVENT_MAP[props.trigger];
if (!triggerArr) {
  console.error(`${NAME} render error!cause: 'Trigger' must be 'hover/click' `);
}

const style = ref<CSSProperties>({ top: -window.innerHeight + "px", left: 0 });
const checkTarget = ref(false);
const popper = ref<HTMLDivElement>({} as HTMLDivElement);
const innnerPosition = ref(props.position);
const innerVisible = ref(props.visible);
const isExist = ref(props.visible);

watch(
  () => props.visible,
  (val) => {
    if (val) {
      doShow();
    } else {
      doHidden();
    }
  }
);

watch(innerVisible, (val) => {
  invokeShowPosistion();
});

watch(popper, (val) => {
  if (props.trigger === "hover" && props.enterable) {
    on(popper.value, EVENT_MAP["hover"][0], doShow);
    on(popper.value, EVENT_MAP["hover"][2], doHidden);
  }
});

watch([() => props.content, () => slots.content && slots?.content()], (val) => {
  innerVisible.value && invokeShowPosistion();
});

const doShow = function () {
  if (!props.disabled) {
    if (!isExist.value) {
      isExist.value = true;
      nextTick(() => {
        innerVisible.value = true;
      });
    } else {
      innerVisible.value = true;
    }
  }
};

const doHidden = function (e?: MouseEvent) {
  if (checkTarget.value && props.el.contains(e?.target)) {
    return;
  }

  // isCanHide参数由外控制
  if (props.isCanHide === false) {
    return;
  }
  innerVisible.value = false;
  innnerPosition.value = props.position;
  style.value = { top: -window.innerHeight + "px", left: 0 };
};

// 计算位置显示
const showPosistion = function () {
  postionFns[props.position] &&
    (style.value = postionFns[props.position](
      props.el,
      popper.value,
      innnerPosition
    ));
};
const invokeShowPosistion = function () {
  if (innerVisible.value) {
    popper.value.offsetWidth === 0
      ? nextTick(() => showPosistion())
      : showPosistion();
    nextTick(() => {
      showPosistion();
    });
  }
};

let scrollElements: HTMLElement[] | undefined;

const isScrollElement = (element: HTMLElement) => {
  return (
    element.scrollHeight > element.offsetHeight ||
    element.scrollWidth > element.offsetWidth
  );
};

const getScrollElements = (container: HTMLElement | undefined) => {
  const scrollElements: HTMLElement[] = [];
  let element: HTMLElement | undefined = container;
  while (element && element !== document.documentElement) {
    if (isScrollElement(element)) {
      scrollElements.push(element);
    }
    element = element.parentElement ?? undefined;
  }
  return scrollElements;
};

const handleScroll = useThrottleFn(() => {
  if (innerVisible.value) {
    invokeShowPosistion();
  }
}, 15);

// 事件绑定
on(props.el, triggerArr[0], doShow);
on(triggerArr[1] ?? props.el, triggerArr[2], doHidden);
checkTarget.value = triggerArr[3];

onMounted(() => {
  invokeShowPosistion();
  scrollElements = getScrollElements(props.el);
  for (const item of scrollElements) {
    item.addEventListener("scroll", handleScroll);
  }
  window.addEventListener("resize", handleScroll);
});

onBeforeUnmount(() => {
  if (scrollElements) {
    for (const item of scrollElements) {
      item.removeEventListener("scroll", handleScroll);
    }
    scrollElements = undefined;
  }
  window.removeEventListener("resize", handleScroll);
});
</script>
