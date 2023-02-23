<template>
  <teleport to="body" v-if="isExist">
    <transition v-show="innerVisible">
      <div
        ref="popperRefEl"
        :class="['layui-popper', { 'layui-dark': isDark }, props.popperClass]"
        :style="[style, props.popperStyle ?? '']"
        :position="innnerPosition"
        @mouseenter="handlerPopperMouseEnter"
        @mouseleave="handlerPopperMouseLeave"
      >
        <slot> {{ content }}</slot>
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
  nextTick,
  useSlots,
  shallowRef,
  computed,
  toRef,
  StyleValue,
  Ref,
} from "vue";
import {
  onClickOutside,
  useEventListener,
  useResizeObserver,
  useThrottleFn,
} from "@vueuse/core";

export type PopperTrigger = "click" | "hover" | "focus" | "contextMenu";

export interface PopperProps {
  el: HTMLElement;
  position?: string;
  enterable?: boolean;
  isDark?: boolean;
  disabled?: boolean;
  isCanHide?: boolean;
  isAutoShow?: boolean;
  visible?: boolean;
  content?: string | Number;
  trigger?: PopperTrigger | PopperTrigger[];
  popperClass?: string | Array<string | object> | object;
  popperStyle?: StyleValue;
}

const props = withDefaults(defineProps<PopperProps>(), {
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
const style = ref<CSSProperties>({ top: -window.innerHeight + "px", left: 0 });
const triggerRefEl = toRef(props, "el");
const popperRefEl = shallowRef<HTMLDivElement>({} as HTMLDivElement);
const innnerPosition = ref(props.position);
const innerVisible = ref(props.visible);
const isExist = ref(props.visible);
let scrollElements: HTMLElement[] | undefined;

const triggerMethods = computed(() =>
  ([] as Array<PopperTrigger>).concat(props.trigger)
);

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
  // isCanHide参数由外控制
  if (props.isCanHide === false) {
    return;
  }
  innerVisible.value = false;
  innnerPosition.value = props.position;
  style.value = { top: -window.innerHeight + "px", left: 0 };
};

const calcPosistion = function () {
  postionFns[props.position] &&
    (style.value = postionFns[props.position](
      triggerRefEl.value,
      popperRefEl.value,
      innnerPosition
    ));
};

const updatePosistion = function () {
  if (innerVisible.value) {
    popperRefEl.value.offsetWidth === 0
      ? nextTick(() => calcPosistion())
      : calcPosistion();
    nextTick(() => {
      calcPosistion();
    });
  }
};

const handlerPopperMouseEnter = function () {
  if (triggerMethods.value.includes("hover") && props.enterable) {
    doShow();
  }
};

const handlerPopperMouseLeave = function () {
  if (triggerMethods.value.includes("hover") && props.enterable) {
    doHidden();
  }
};

const handlerTriggerClick = function () {
  if (!triggerMethods.value.includes("click")) return;
  if (innerVisible.value) {
    doHidden();
  } else {
    doShow();
  }
};

const handleTriggerContextMenu = function (e: MouseEvent) {
  if (!triggerMethods.value.includes("contextMenu")) return;
  e.preventDefault();
  if (innerVisible.value) {
    doHidden();
  } else {
    doShow();
  }
};

const handlerTriggerMouseEnter = function () {
  if (!triggerMethods.value.includes("hover")) return;
  doShow();
};

const handlerTriggerMouseLeave = function () {
  if (!triggerMethods.value.includes("hover")) return;
  doHidden();
};

const handleTriggerFocusin = function () {
  if (triggerMethods.value.includes("focus") && props.enterable) {
    doShow();
  }
};

const handleTriggerFocusout = function () {
  if (triggerMethods.value.includes("focus") && props.enterable) {
    doHidden();
  }
};

const handlerTriggerEventRegist = function () {
  useEventListener(triggerRefEl.value, "click", handlerTriggerClick);
  useEventListener(triggerRefEl.value, "contextmenu", handleTriggerContextMenu);
  useEventListener(triggerRefEl.value, "mouseenter", handlerTriggerMouseEnter);
  useEventListener(triggerRefEl.value, "mouseleave", handlerTriggerMouseLeave);
  useEventListener(triggerRefEl.value, "focusin", handleTriggerFocusin);
  useEventListener(triggerRefEl.value, "focusout", handleTriggerFocusout);
};

const handleScroll = useThrottleFn(() => {
  if (innerVisible.value) {
    updatePosistion();
  }
}, 15);

onClickOutside(
  triggerRefEl.value,
  (e) => {
    if (
      !innerVisible.value ||
      triggerRefEl.value.contains(e.target as HTMLElement) ||
      popperRefEl.value.contains(e.target as HTMLElement)
    ) {
      return;
    }

    doHidden();
  },
  {
    ignore: [popperRefEl.value],
  }
);

useResizeObserver(triggerRefEl, () => {
  updatePosistion();
});

let popperObserver: { stop: any; isSupported?: boolean } | undefined;

watch(innerVisible, (isShow) => {
  updatePosistion();
  if (isShow) {
    popperObserver = useResizeObserver(popperRefEl, () => {
      updatePosistion();
    });
  } else {
    popperObserver && popperObserver.stop();
  }
});

watch(
  () => props.visible,
  (isShow) => (isShow ? doShow() : doHidden())
);

watch(
  () => props.content,
  () => {
    updatePosistion();
  }
);

const isScrollElement = function (element: HTMLElement) {
  return (
    element.scrollHeight > element.offsetHeight ||
    element.scrollWidth > element.offsetWidth
  );
};

const getScrollElements = function (container: HTMLElement | undefined) {
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

onMounted(() => {
  updatePosistion();
  scrollElements = getScrollElements(triggerRefEl.value);
  for (const item of scrollElements) {
    useEventListener(item, "scroll", handleScroll);
  }
  useEventListener("resize", handleScroll);
  handlerTriggerEventRegist();
});
</script>
