<template>
  <div
    v-show="visible"
    ref="backtopRef"
    class="layui-backtop"
    :style="{ ...styleBacktop }"
    @click.stop="handleClick"
    @mousedown="handlerMousedown"
    @mouseup="handlerMouseup"
  >
    <slot>
      <lay-icon
        :type="props.icon"
        :size="`${props.iconSize}px`"
        :prefix="props.iconPrefix"
        :color="props.iconColor"
      ></lay-icon>
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
import LayIcon from '../icon/index';
import './index.less';

export interface LayBacktopProps {
  /**通用*/
  target?: string;
  showHeight?: number;
  disabled?: boolean;
  /**组件样式*/
  position?: 'fixed' | 'absolute';
  right?: number;
  bottom?: number;
  bgcolor?: string;
  opacity?: number;
  color?: string;
  borderRadius?: number | string;
  circular?: boolean;
  /**图标样式*/
  icon?: string;
  iconSize?: number;
  iconPrefix?: string;
  iconColor?: string;
}

const props = withDefaults(defineProps<LayBacktopProps>(), {
  target: 'window',
  showHeight: 200,
  right: 30,
  bottom: 40,
  icon: 'layui-icon-top',
  iconSize: 30,
  iconPrefix: 'layui-icon',
  disabled: false,
  circular: false,
});

const emit = defineEmits(['click']);

const backtopRef = ref<HTMLElement | null>(null);
const scrollTarget = shallowRef<Window | HTMLElement | undefined>(undefined);
let visible = ref(props.showHeight === 0);
const borderRadius = computed(() => {
  if (props.circular) return "50%";
  return typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius;
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
  }
});

// TODO 临时动画方案
const scrollToTop = () => {
  if (!scrollTarget.value) return;
  if (scrollTarget.value instanceof Window) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); // smooth | instant(default)
  } else {
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

const handlerMousedown = () => {
  backtopRef.value!.style.opacity = '1';
}

const handlerMouseup = () => {
  backtopRef.value!.style.opacity = '0.95';
}

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
      // backtopRef.value!.style.position = props.position;
    }
    return targetElement;
  }
};

onMounted(() => {
  let timer: any = undefined;
  scrollTarget.value = getScrollTarget();
  // TODO 节流待改进
  scrollTarget.value.addEventListener('scroll', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleScroll();
    }, 100);
  });
});
</script>
