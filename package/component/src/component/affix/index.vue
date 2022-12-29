<template>
  <div class="layui-affix" :style="getStyle" ref="dom">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayAffix",
};
</script>

<script setup lang="ts">
import "./index.less";
import {
  ref,
  onMounted,
  onUnmounted,
  nextTick,
  computed,
  StyleValue,
} from "vue";

export interface AiffxProps {
  offset?: number;
  target?: HTMLElement;
  position?: string;
}

const props = withDefaults(defineProps<AiffxProps>(), {
  offset: 0,
  position: "top",
  target: () => {
    return document.body;
  },
});

const emit = defineEmits(["scroll"]);
const outWindow = ref(false);
const dom = ref();

let changeScrollTop = 0;
let orginOffsetLeft = 0;
let orginOffsetTop = 0;
let marginLeft = 0;
let marginTop = 0;
let marginBottom = 0;
let fixedOffset = 0;

const getStyle = computed(() => {
  if (outWindow.value && dom.value) {
    let style = {
      position: "fixed !important",
      top: "unset",
      bottom: "unset",
      left: orginOffsetLeft - marginLeft + "px",
    };
    if (props.position === "top") {
      style.top = fixedOffset - marginTop + "px";
    } else {
      style.bottom = fixedOffset - marginBottom + "px";
    }
    return style as StyleValue;
  }
});
//检查是否在窗口内
const checkInWindow = () => {
  if (dom.value) {
    let offsetTop = dom.value.offsetTop;
    let scrollTop = props.target?.scrollTop;
    if (props.position === "top") {
      //top检查 当前元素与容器顶部距离-减去滚动条的高度+容器offsetTop
      let result = offsetTop - scrollTop + props.target.offsetTop;
      if (result < fixedOffset) {
        if (outWindow.value) {
          if (scrollTop <= changeScrollTop) {
            outWindow.value = false;
          }
        } else {
          changeScrollTop = scrollTop;
          outWindow.value = true;
        }
      }
    } else {
      //bottom检查 可视区窗口高度 + 文档滚动高度 - 当前元素与容器顶部距离 - 当前元素高度
      let viewHeight =
        props.target.offsetHeight > window.innerHeight
          ? window.innerHeight
          : props.target.offsetHeight;
      let result = viewHeight + scrollTop - offsetTop - dom.value.offsetHeight;
      if (outWindow.value) {
        if (scrollTop >= changeScrollTop) {
          outWindow.value = false;
        }
      } else {
        if (result < fixedOffset) {
          changeScrollTop = scrollTop - result + props.offset;
          outWindow.value = true;
        }
      }
    }
    emit("scroll", {
      targetScroll: scrollTop,
      affixed: outWindow.value,
      offset: !outWindow.value ? 0 : Math.abs(scrollTop - changeScrollTop),
    });
  }
};

const getDomStyle = (dom: any, attr: string) => {
  if (dom.currentStyle) {
    return dom.currentStyle[attr];
  } else {
    // @ts-ignore
    return document.defaultView.getComputedStyle(dom, null)[attr];
  }
};

onMounted(() => {
  nextTick(() => {
    orginOffsetTop = dom.value.offsetTop - props.target.offsetTop;
    orginOffsetLeft = dom.value.getBoundingClientRect().left;
    marginLeft = parseFloat(getDomStyle(dom.value, "marginLeft"));
    marginTop = parseFloat(getDomStyle(dom.value, "marginTop"));
    marginBottom = parseFloat(getDomStyle(dom.value, "marginBottom"));
    fixedOffset = props.offset + props.target.offsetTop;
    if (props.position === "bottom") {
      fixedOffset = props.offset;
    }
    props.target.addEventListener("scroll", checkInWindow, true);
    checkInWindow();
  });
});

onUnmounted(() => {
  props.target.removeEventListener("scroll", checkInWindow);
});
</script>
