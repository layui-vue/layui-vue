<template>
  <div
    class="layui-scroll"
    :class="{ hide: data.winWidth < 500 }"
    :style="{ height: height }"
  >
    <div class="layui-scroll-y">
      <div ref="scrollRef" class="layui-scroll-wrap" @scroll="onMosewheel">
        <slot></slot>
      </div>
      <div
        ref="barRef"
        class="layui-scroll-track"
        :style="{
          backgroundColor: data.heightPre == 1 ? 'transparent' : trackColor,
        }"
      >
        <div
          :style="{
            height: data.barHeight + 'px',
            width: thumbWidth + 'px',
            transform: 'translateY(' + data.translateY + 'px)',
            backgroundColor: data.heightPre == 1 ? 'transparent' : thumbColor,
          }"
          class="layui-scroll-thumb"
          @mousedown.stop.prevent="moveStart"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayScroll",
};
</script>

<script lang="ts" setup>
import "./index.less";
import { onMounted, nextTick, reactive, onUnmounted, ref } from "vue";

export interface ScrollProps {
  height?: string;
  trackColor?: string;
  thumbColor?: string;
  thumbWidth?: number;
}

const props = withDefaults(defineProps<ScrollProps>(), {
  height: "100%",
  trackColor: "rgba(0,0,0,0)",
  thumbColor: "#eeeeee",
  thumbWidth: 6,
});

const emit = defineEmits(["arrive"]);

const scrollRef = ref<HTMLElement | null | undefined>();
const barRef = ref<HTMLElement | null | undefined>();

const data = reactive({
  translateY: 0, // 滚动块平移的距离
  heightPre: 0, // 可视高度和内容高度比
  barHeight: 0, // 滑块高度
  winWidth: document.body.clientWidth, //初始化浏览器页面宽度
});

let time: NodeJS.Timeout; // 定时器
let isMove = false; // 判断鼠标是否点击滑块（为松开）
let moveClientY = 0; // 鼠标点击滑块时，相对滑块的位置
let trackHeight = 0; // 滚动条轨道高度
let wrapHeight = 0; // 容器高度（可视高度）
let wrapContentHeight = 0; // 内容高度（可滚动内容的高度）

onMounted(() => {
  monitorWindow();
  monitorScrollBar();
  nextTick(() => {
    calculationLength();
  });
});

// 页面卸载清除定时器
onUnmounted(() => {
  window.clearInterval(time);
});

// 监听页面尺寸改变计算滚动条
const monitorWindow = function () {
  let time: NodeJS.Timeout;
  window.addEventListener("resize", () => {
    data.winWidth = document.body.clientWidth;
    clearTimeout(time);
    time = setTimeout(() => {
      initScrollListner();
    }, 500);
  });
};

//监听内容元素尺寸变化
const monitorScrollBar = function () {
  // @ts-ignore
  let MutationObserver =
    window.MutationObserver ||
    // @ts-ignore
    window.WebKitMutationObserver ||
    // @ts-ignore
    window.MozMutationObserver;
  const observer: any = new MutationObserver((mutations) => {
    initScrollListner();
  });

  observer.observe(scrollRef.value, {
    attributes: true,
    childList: true,
    subtree: true,
  });
};

// 初始化延迟监听滚动条
const calculationLength = function () {
  // 直接执行initScrollListner函数，获取滚动条长度部准确
  // 因为页面渲染有延迟，获取dom元素需要延迟
  // 每间隔10毫秒更新滑块长度
  time = setInterval(() => {
    // 计算滚动条长度
    initScrollListner();
  }, 50);
  // 间隔500毫秒清除定时器，滑块缩短会有动画效果，时间可延长没有影响
  setTimeout(() => {
    window.clearInterval(time);
  }, 2000);
};

// 计算滚动条高度
const initScrollListner = function () {
  let scroll = scrollRef.value;
  let bar = barRef.value;
  // scroll有时候拿不到元素，要判断一下
  if (scroll && bar) {
    wrapContentHeight = scroll.scrollHeight;
    wrapHeight = scroll.clientHeight;
    trackHeight = bar.clientHeight;
    data.heightPre = wrapHeight / wrapContentHeight;
    data.barHeight = data.heightPre * trackHeight;
  }
};

// 内容滚动时，计算滑块移动的距离
const onMosewheel = (e: any) => {
  data.translateY = e.target.scrollTop * data.heightPre;
  if (data.translateY == 0) {
    // 到达顶部
    arrive("top");
  } else if (
    e.target.scrollTop + e.target.offsetHeight ==
    e.target.scrollHeight
  ) {
    // 滚出高度 + 可视区域高度 == 内容高度
    arrive("bottom");
  }
};

// 到达顶部或者底部通知父级元素
const arrive = (tb: string) => {
  emit("arrive", tb);
};

// 鼠标点击滑块时
const moveStart = (e: any) => {
  isMove = true;
  // clientY：当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置
  // data.translateY 滚动块平移的距离
  // moveClientY 鼠标点击滑块时，相对滑块的位置
  moveClientY = e.clientY - data.translateY;
  moveTo(); //移动时
  moveEnd(); //鼠标松开时
};

// 鼠标移动，改变thumb的位置以及容器scrollTop的位置
const moveTo = () => {
  document.onmousemove = (e) => {
    // 移动时候判断是不是松开，松开就不在执行滑块移动操作
    if (isMove) {
      // 移动滑块时，判断时候到达顶部或者底部
      if (e.clientY - moveClientY > trackHeight - data.barHeight) {
        // 滑块到达  底部  就不在改变滑块translateY值
        data.translateY = trackHeight - data.barHeight;
      } else if (e.clientY - moveClientY < 0) {
        // 滑块到达  顶部  就不在改变滑块 translateY 值
        data.translateY = 0;
      } else {
        //改变滑块位置
        data.translateY = e.clientY - moveClientY;
      }
      // 计算出内容盒子滚出顶部的距离
      if (scrollRef.value) {
        scrollRef.value.scrollTop = data.translateY / data.heightPre;
      }
    }
  };
};

// 鼠标从滑块松开时，不在监听滑块移动操作
const moveEnd = function () {
  document.onmouseup = (e) => {
    if (isMove) {
      isMove = false;
    }
  };
};
</script>
