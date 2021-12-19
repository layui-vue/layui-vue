<template>
  <div
    v-show="visible"
    ref="backtopRef"
    class="lay-backtop"
    :style="{
      right: `${props.right}px`,
      bottom: `${props.bottom}px`,
      backgroundColor: `${props.bgcolor}`
    }"
    @click.stop="handleClick"
  >
    <slot>
      <lay-icon type="layui-icon-top" size="40px"></lay-icon>
    </slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayBacktop',
};
</script>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, shallowRef, withDefaults, computed, onMounted, } from 'vue';
import layIcon from '../icon/index';
import './index.less';

export interface LayBacktopProps {
  target?: string; // 触发滚动的对象
  showHeight?: number;
  position?: 'fixed' | 'absolute';  // 定位方式,显示在特定容器内部需要设置为 absolute
  right?: number;
  bottom?: number;
  bgcolor?: string;
  disabled?: boolean; // 禁用返回顶部
}

const props = withDefaults(defineProps<LayBacktopProps>(), {
  target: 'window',
  showHeight: 200,
  position: 'fixed',
  right: 30,
  bottom: 40,
  bgcolor: '#9F9F9F',
  disabled: false,
});

const emit = defineEmits(['click']);

let visible = ref(props.showHeight === 0);
const backtopRef = ref<HTMLElement | null>(null);
const scrollTarget = shallowRef<Window | HTMLElement | undefined>(undefined);

const scrollToTop = () => {
  if (!scrollTarget.value) return;
  if (scrollTarget.value instanceof Window) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' //smooth(平滑滚动),instant(瞬间滚动)，默认instant
    });
  } else {
    // FIXME 初版待改进
    let step = scrollTarget.value.scrollTop / 4;
    if (scrollTarget.value.scrollTop > 0) {
      scrollTarget.value.scrollTop -= Math.max(step, 10);
      setTimeout(() => {
        scrollToTop();
      }, 1000 / 60);
    }
  }
};

const handleScroll = () => {
  if (!scrollTarget.value) return;
  const scrollTop = scrollTarget.value instanceof Window ? window.pageYOffset : scrollTarget.value.scrollTop;
  visible.value = scrollTop >= props.showHeight;
};

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    scrollToTop()
  };
  emit('click', event);
};

// 获取滚动目标元素
const getScrollTarget = () => {
  if (props.target === 'window') {
    return window || document.documentElement || document.body;
  } else {
    const targetElement = document.querySelector<HTMLElement>(props.target);
    if (!targetElement) throw new Error(`target is not existed: ${props.target}`);
    // 特定容器内部显示
    if (props.position === 'absolute') {
      if (!targetElement.parentElement) throw new Error(`target parent element is not existed: ${props.target}`);
      targetElement.parentElement.style.position = 'relative';
      console.log(backtopRef.value);
      if (!backtopRef.value) throw new Error(`target ref is null: ${props.target}`);
      backtopRef.value.style.position = props.position;
    }
    return targetElement;
  }
};

onMounted(() => {
  let timer: any = undefined;
  scrollTarget.value = getScrollTarget();
  // FIXME 节流待改进
  scrollTarget.value.addEventListener('scroll', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleScroll();
    }, 100);
  });
});
</script>
