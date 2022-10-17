<template>
  <div
    class="layui-notice-bar"
    :style="{ background: background, height: `${height}px` }"
    v-show="!state.isMode"
  >
    <div
      class="layui-notice-bar-warp"
      :style="{ color: color, 'font-size': `${size}px` }"
    >
      <lay-icon
        v-if="leftIcon"
        class="layui-notice-bar-warp-left-icon"
        :type="leftIcon"
      ></lay-icon>
      <div
        class="layui-notice-bar-warp-text-box"
        ref="noticeBarWarpRef"
        :style="'--textWidth--:' + text.length + 'em'"
      >
        <div
          class="layui-notice-bar-warp-text"
          ref="noticeBarTextRef"
          v-if="!scrollable"
        >
          {{ text }}
        </div>
        <div class="layui-notice-bar-warp-slot" v-else>
          <lay-carousel
            v-model="active"
            indicator="none"
            anim="updown"
            arrow="none"
            :style="{ height: `40px` }"
          >
            <lay-carousel-item
              v-for="item in textlist"
              :key="item.id"
              :id="item.id"
              class="layui-anim layui-anim-up"
            >
              {{ item.text }}
            </lay-carousel-item>
          </lay-carousel>
          <!-- <slot />   -->
        </div>
      </div>
      <lay-icon
        :type="rightIcon"
        v-if="rightIcon"
        class="layui-notice-bar-warp-right-icon"
        @click="onRightIconClick"
      ></lay-icon>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayNoticeBar",
};
</script>

<script lang="ts" setup>
import { onMounted, reactive, nextTick, ref, onUnmounted } from "vue";
import LayCarousel from "../carousel/index.vue";
import LayCarouselItem from "../carouselItem/index.vue";
import { LayIcon } from "@layui/icons-vue";

export interface NoticeBarProps {
  mode?: string;
  text?: string;
  textlist?: any[];
  color?: string;
  background?: string;
  size?: number | string;
  height?: number | string;
  delay?: number;
  speed?: number;
  scrollable?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

const props = withDefaults(defineProps<NoticeBarProps>(), {
  color: () => "var(--color-warning)",
  background: () => "var(--color-warning-light-9)",
  text: "",
  textlist: () => [],
  size: 14,
  height: 40,
  delay: 1,
  speed: 100,
  scrollable: false,
});

const emit = defineEmits(["close", "link"]);

const noticeBarWarpRef = ref();
const noticeBarTextRef = ref();

const active = ref(props.textlist[0]?.id);
const state = reactive({
  order: 1,
  oneTime: 0,
  twoTime: 0,
  warpOWidth: 0,
  textOWidth: 0,
  isMode: false,
  height: 40,
});

var timer: any;

// 初始化 animation 各项参数
const initAnimation = () => {
  nextTick(() => {
    state.warpOWidth = noticeBarWarpRef.value.offsetWidth;
    state.textOWidth = noticeBarTextRef.value.offsetWidth;
    computeAnimationTime();
    timer = setTimeout(() => {
      changeAnimation();
    }, props.delay * 1000);
  });
};

// 清除定时器
onUnmounted(() => {
  clearInterval(timer);
  timer = null;
});

// 计算 animation 滚动时长
const computeAnimationTime = () => {
  state.oneTime = state.textOWidth / props.speed;
  state.twoTime = (state.textOWidth + state.warpOWidth) / props.speed;
};

// 改变 animation 动画调用
const changeAnimation = () => {
  if (state.order === 1) {
    noticeBarTextRef.value.style.cssText = `animation: around1 ${state.oneTime}s  linear; opactity: 1;`;
    state.order = 2;
  } else {
    noticeBarTextRef.value.style.cssText = `animation: around2 ${state.twoTime}s linear  ; opactity: 1;`;
    state.order = 1;
  }
};

// 监听 animation 动画的结束
const listenerAnimationend = () => {
  noticeBarTextRef.value.addEventListener(
    "animationend",
    () => {
      changeAnimation();
    },
    false
  );
};

// 右侧 icon 图标点击
const onRightIconClick = () => {
  if (!props.mode) return false;
  if (props.mode === "closeable") {
    state.isMode = true;
    emit("close");
  } else if (props.mode === "link") {
    emit("link");
  }
};

// 页面加载时
onMounted(() => {
  if (props.scrollable) return false;
  initAnimation();
  listenerAnimationend();
});
</script>

<style>
@import "../carousel/index.less";

.layui-notice-bar {
  padding: 0 15px;
  border-radius: 4px;
}
.layui-notice-bar .layui-notice-bar-warp {
  display: flex;
  align-items: center;
  width: 100%;
  height: inherit;
}
.layui-notice-bar .layui-notice-bar-warp .layui-notice-bar-warp-text-box {
  flex: 1;
  height: inherit;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.layui-notice-bar
  .layui-notice-bar-warp
  .layui-notice-bar-warp-text-box
  .layui-notice-bar-warp-text {
  white-space: nowrap;
  position: absolute;
  left: 0;
}

@keyframes around1 {
  from {
    left: 0;
  }
  to {
    left: calc(0px - var(--textWidth--));
    /* left: -100%; */
  }
}
@keyframes around2 {
  from {
    left: calc(var(--textWidth--));
    /* left: 100%; */
  }
  to {
    /* left: calc(0px - var(--textWidth--) - 10px); */
    left: 0;
  }
}
.layui-notice-bar
  .layui-notice-bar-warp
  .layui-notice-bar-warp-text-box
  .layui-notice-bar-warp-slot {
  width: 100%;
  white-space: nowrap;
}
.layui-notice-bar
  .layui-notice-bar-warp
  .layui-notice-bar-warp-text-box
  .layui-notice-bar-warp-slot
  .layui-carousel
  > [carousel-item]
  * {
  display: flex;
  align-items: center;
}

.layui-notice-bar .layui-notice-bar-warp .layui-notice-bar-warp-left-icon {
  width: 24px;
  font-size: inherit !important;
}
.layui-notice-bar .layui-notice-bar-warp .layui-notice-bar-warp-right-icon {
  width: 24px;
  text-align: right;
  font-size: inherit !important;
}
.layui-notice-bar
  .layui-notice-bar-warp
  .layui-notice-bar-warp-right-icon:hover {
  cursor: pointer;
}
</style>
