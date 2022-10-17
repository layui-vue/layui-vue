<script lang="ts">
export default {
  name: "LayFullscreen",
};
</script>

<script lang="ts" setup>
import {
  ref,
  withDefaults,
  computed,
  onMounted,
  onBeforeUnmount,
  Ref,
} from "vue";
import "./index.less";

export interface FullscreenProps {
  target?: HTMLElement;
  immersive?: boolean;
  position?: string;
  zIndex?: string;
}

const props = withDefaults(defineProps<FullscreenProps>(), {
  immersive: true,
});

const emit = defineEmits(["fullscreenchange"]);
type MethodMap = [
  "requestFullscreen",
  "exitFullscreen",
  "fullscreenElement",
  "fullscreenEnabled",
  "fullscreenchange",
  "fullscreenerror"
];

const methodMap: any[] = [
  [
    "requestFullscreen",
    "exitFullscreen",
    "fullscreenElement",
    "fullscreenEnabled",
    "fullscreenchange",
    "fullscreenerror",
  ],
  [
    "webkitRequestFullscreen",
    "webkitExitFullscreen",
    "webkitFullscreenElement",
    "webkitFullscreenEnabled",
    "webkitfullscreenchange",
    "webkitfullscreenerror",
  ],
  [
    "webkitRequestFullScreen",
    "webkitCancelFullScreen",
    "webkitCurrentFullScreenElement",
    "webkitCancelFullScreen",
    "webkitfullscreenchange",
    "webkitfullscreenerror",
  ],
  [
    "mozRequestFullScreen",
    "mozCancelFullScreen",
    "mozFullScreenElement",
    "mozFullScreenEnabled",
    "mozfullscreenchange",
    "mozfullscreenerror",
  ],
  [
    "msRequestFullscreen",
    "msExitFullscreen",
    "msFullscreenElement",
    "msFullscreenEnabled",
    "MSFullscreenChange",
    "MSFullscreenError",
  ],
];
// 默认请求全屏的元素
const defaultElement: HTMLElement = document.documentElement;
// 要请求全屏显示的元素
let targetEl: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>(
  props.target || defaultElement
);
// 是否全屏
const isFullscreen = ref(false);
// 是否支持全屏
let isSupported: boolean = false;

// 包装全屏 API,屏蔽浏览器差异
const unprefixedMethods: MethodMap = methodMap[0];
const fullscreenAPI: Record<string, string> = {};
for (const methodList of methodMap) {
  if (methodList[1] in document) {
    for (const [index, method] of methodList.entries()) {
      fullscreenAPI[unprefixedMethods[index]] = method;
    }
    isSupported = true;
    break;
  }
}

/**
 * 进入全屏
 * @param targetEl 请求全屏显示的元素,不是所有元素都支持,建议用 div
 */
async function enter(targetEl: HTMLElement | undefined) {
  if (!isSupported) return;
  if (!targetEl) targetEl = activeEl.value || defaultElement;
  let fullscreenEnter = null;
  if (props.immersive) {
    // @ts-ignore
    fullscreenEnter = Promise.resolve(
      // @ts-ignore
      targetEl[fullscreenAPI.requestFullscreen]()
    );
  } else {
    styleLayFullscreen(targetEl, false);
    fullscreenEnter = Promise.resolve(
      targetEl?.classList.add("layui-fullscreen")
    );
  }
  return await fullscreenEnter?.then(() => {
    isFullscreen.value = true;
    emit("fullscreenchange", isFullscreen.value);
    return !!document.fullscreenElement;
  });
}

/**
 * 退出全屏
 * @param targetEl 退出全屏元素
 */
async function exit(targetEl: HTMLElement | Document | undefined) {
  if (!isSupported) return;
  if (!targetEl) targetEl = activeEl.value || document;
  let fullscreenExit = null;
  if (props.immersive) {
    // @ts-ignore
    fullscreenExit = Promise.resolve(document[fullscreenAPI.exitFullscreen]());
  } else {
    if (targetEl instanceof Document) return;
    styleLayFullscreen(targetEl, true);
    fullscreenExit = Promise.resolve(
      targetEl?.classList.remove("layui-fullscreen")
    );
  }
  return await fullscreenExit?.then(() => {
    isFullscreen.value = false;
    emit("fullscreenchange", isFullscreen.value);
    return !!document.fullscreenElement;
  });
}

/**
 * 进入或退出全屏
 */
async function toggle() {
  if (isFullscreen.value) {
    await exit(activeEl.value);
  } else {
    await enter(activeEl.value);
  }
}

/**
 *
 * @param el HTML 元素
 * @param isRemove 是否移除样式
 */
const styleLayFullscreen = function (
  el: HTMLElement,
  isRemove: boolean = false
) {
  el.style.position = isRemove ? "" : props.position || "";
  el.style.zIndex = isRemove ? "" : props.zIndex || "";
};

const activeEl = computed(() => (targetEl.value = props.target));

/**
 * 处理 fullscreenchange 和浏览器窗口内全屏 Escape 按键事件
 * @param event 键盘事件
 */
const onFullscreenchange = function (event: KeyboardEvent) {
  if (isFullscreen.value && !document.fullscreenElement) {
    if (props.immersive) {
      isFullscreen.value = false;
      emit("fullscreenchange", isFullscreen.value);
    } else if (event.key === "Escape") {
      exit(activeEl.value);
    }
  }
};

/**
 * 屏蔽 F11 按键原生事件,用 fullscreenAPI 代替
 * @param event 键盘事件
 */
const onKeydownF11 = function (event: KeyboardEvent) {
  // DOM 根节点全屏
  let isRootNodeFullscreen =
    props.immersive && (!activeEl.value || activeEl.value === defaultElement);
  if (event.key === "F11" && isRootNodeFullscreen) {
    event.preventDefault();
    toggle();
  }
};

onMounted(() => {
  //@ts-ignore
  document.addEventListener(fullscreenAPI.fullscreenchange, onFullscreenchange);
  document.addEventListener("keydown", onFullscreenchange);
  document.addEventListener("keydown", onKeydownF11);
});

onBeforeUnmount(() => {
  //@ts-ignore
  document.removeEventListener(
    fullscreenAPI.fullscreenchange,
    onFullscreenchange
  );
  document.removeEventListener("keydown", onFullscreenchange);
  document.removeEventListener("keydown", onKeydownF11);
});
</script>

<template>
  <slot
    name="default"
    :isFullscreen="isFullscreen"
    :enter="enter"
    :exit="exit"
    :toggle="toggle"
  ></slot>
</template>
