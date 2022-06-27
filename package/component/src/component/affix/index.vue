<template>
  <div class="lay-affix-content" :style="getStyle" ref="dom">
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
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
export interface LayAiffxProps {
  top?: number;
  bottom?: number;
  target?: HTMLElement;
}
const props = withDefaults(defineProps<LayAiffxProps>(), {
  top: 0,
  target: () => {
    return document.body;
  },
});

const outWindow = ref(false);
const affixTop = ref(false);
const dom = ref();

let changeScrollTop = 0;
let orginOffsetLeft = 0;
let marginLeft = 0;
let marginTop = 0;
let fixedTop = 0;
let fixedBottom = 0;
const getStyle = computed(() => {
  if (outWindow.value && dom.value) {
    let style = {
      position: "fixed !important",
      top: "unset",
      bottom: "unset",
      left: orginOffsetLeft - marginLeft + "px",
    };
    if (affixTop.value) {
      style.top = fixedTop - marginTop + "px";
      return style;
    } else {
      if (props.hasOwnProperty("bottom")) {
        style.bottom = props.bottom + "px";
        return style;
      } else {
        return {};
      }
    }
  }
});
//检查是否在窗口内
const checkInWindow = () => {
  if (dom.value) {
    let offsetTop = dom.value.offsetTop;
    let scrollTop = props.target?.scrollTop;

    if (typeof props.bottom === "undefined") {
      //top检查 当前元素与容器顶部距离-减去滚动条的高度+容器offsetTop
      let result = offsetTop - scrollTop + props.target.offsetTop;
      if (result < fixedTop) {
        if (outWindow.value) {
          if (scrollTop <= changeScrollTop) {
            outWindow.value = false;
          }
        } else {
          changeScrollTop = scrollTop;
          outWindow.value = true;
          affixTop.value = true;
        }
        return;
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
          if (props.bottom == 0) {
            console.log(scrollTop);
          }
          outWindow.value = false;
        }
      } else {
        if (result < fixedBottom) {
          changeScrollTop = scrollTop - result + props.bottom;
          console.log(changeScrollTop);
          outWindow.value = true;
          affixTop.value = false;
        }
      }
    }
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
    orginOffsetLeft = dom.value.getBoundingClientRect().left;
    fixedTop = props.top + props.target.offsetTop;
    if (typeof props.bottom !== "undefined") {
      fixedBottom =
        props.bottom + parseFloat(getDomStyle(dom.value, "marginBottom"));
    }
    marginLeft = parseFloat(getDomStyle(dom.value, "marginLeft"));
    marginTop = parseFloat(getDomStyle(dom.value, "marginTop"));
    props.target.addEventListener("scroll", checkInWindow, true);
    checkInWindow();
  });
});

onUnmounted(() => {
  props.target.removeEventListener("scroll", checkInWindow);
});
</script>
