<script lang="ts">
export default {
  name: "LayLayer",
};
</script>

<script lang="ts" setup>
import Shade from "./Shade.vue";
import Iframe from "./Iframe.vue";
import Title from "./Header.vue";
import CloseBtn from "./CloseBtn.vue";
import Photos from "./Photos.vue";
import Notifiy from "./Notifiy.vue";
import {
  Ref,
  ref,
  watch,
  computed,
  useSlots,
  VNodeTypes,
  nextTick,
  onMounted,
  onUnmounted,
} from "vue";
import {
  nextId,
  maxArea,
  maxOffset,
  getArea,
  calculateArea,
  calculateOffset,
  calculateContent,
  calculateType,
  minArea,
  minOffset,
  updateMinArrays,
  getDrawerAnimationClass,
  calculateDrawerArea,
  calculatePhotosArea,
  calculateNotifOffset,
  removeNotifiyFromQueen,
  getNotifyAnimationClass,
} from "../utils";
import { useMove, useResize } from "../composable/useDragable";
import { nextIndex } from "../tokens";

export interface LayerProps {
  id?: string;
  title?: string | boolean | Function;
  icon?: string | number;
  skin?: string;
  zIndex?: number | Function;
  setTop?: boolean;
  offset?: string[] | string;
  area?: string[] | "auto";
  modelValue?: boolean;
  maxmin?: boolean | string;
  btn?: Record<string, Function>[] | false;
  move?: boolean | string;
  resize?: boolean | string;
  type?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | "dialog"
    | "page"
    | "iframe"
    | "loading"
    | "drawer"
    | "photos"
    | "notifiy";
  content?: string | Function | object | VNodeTypes;
  isHtmlFragment?: boolean;
  shade?: boolean | string;
  shadeClose?: boolean | string;
  shadeOpacity?: string;
  closeBtn?: boolean | string;
  btnAlign?: "l" | "c" | "r";
  time?: number;
  load?: number;
  anim?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  isOutAnim?: boolean;
  destroy?: Function;
  success?: Function;
  end?: Function;
  yes?: Function;
  yesText?: string;
  isFunction?: boolean;
  isMessage?: boolean;
  appContext?: any;
  startIndex?: number;
  imgList?: { src: string; alt: string; thumb: string }[];
  min?: Function;
  full?: Function;
  restore?: Function;
}

const props = withDefaults(defineProps<LayerProps>(), {
  title: "标题",
  setTop: false,
  offset: "auto",
  area: "auto",
  modelValue: false,
  maxmin: false,
  move: true,
  type: 1,
  time: 0,
  shade: true,
  shadeClose: true,
  shadeOpacity: "0.1",
  closeBtn: "1",
  btnAlign: "r",
  load: 0,
  anim: 0,
  resize: false,
  isHtmlFragment: false,
  isOutAnim: true,
  destroy: () => {},
  success: () => {},
  end: () => {},
  full: () => {},
  min: () => {},
  restore: () => {},
  yesText: "确定",
  isFunction: false,
  isMessage: false,
  startIndex: 0,
  imgList: () => [],
});

const emit = defineEmits(["close", "update:modelValue"]);

const slots = useSlots();
const max: Ref<boolean> = ref(false);
const min: Ref<boolean> = ref(false);
const id: Ref<string> = ref(props.id || nextId());
const layero = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | undefined>();
const type: number = calculateType(props.type);
const area: Ref<string[]> = ref(
  calculateArea(props.type, props.area, props.offset)
);
const offset: Ref<string[]> = ref(
  calculateOffset(props.offset, area.value, type)
);
const contentHeight = ref(
  calculateContent(props.title, area.value[1], props.btn, type, props.isMessage)
);
const index: Ref<number | Function> = ref(99999);
const visible: Ref<boolean> = ref(false);
const first: Ref<boolean> = ref(true);

const w: Ref<string> = ref(area.value[0]);
const h: Ref<string> = ref(area.value[1]);
const t: Ref<string> = ref(offset.value[0]);
const l: Ref<string> = ref(offset.value[1]);

const _w: Ref<string> = ref(area.value[0]);
const _h: Ref<string> = ref(area.value[0]);
const _t: Ref<string> = ref(offset.value[0]);
const _l: Ref<string> = ref(offset.value[1]);

/**
 * 监听 props 的 zIndex 改变, 更新弹出层元素层级
 */
watch(
  () => props.zIndex,
  () => {
    index.value = props.zIndex ?? nextIndex();
  },
  { immediate: true }
);

/**
 * 首次打开
 * <p>
 */
const firstOpenDelayCalculation = function () {
  nextTick(async () => {
    if (type == 4) {
      area.value = calculateDrawerArea(props.offset, props.area);
    }
    if (type == 5) {
      area.value = await calculatePhotosArea(
        props.imgList[props.startIndex].src,
        props
      );
    }
    // TODO 如果 area 是空数组, 开启自适应
    var _area = area.value;
    if (_area[0] == undefined || _area[1] == undefined) {
      _area = getArea(layero.value);
    }
    offset.value = calculateOffset(props.offset, _area, type);
    if (type == 6) {
      offset.value = calculateNotifOffset(props.offset, _area, id.value);
    }
    resetPosition();
    resetArea();
    supportMove();
  });
};

/**
 * 监听标题, 进行 contentHeight 重置
 */
watch(
  () => props.title,
  () => {
    contentHeight.value = calculateContent(
      props.title,
      area.value[1],
      props.btn,
      type,
      props.isMessage
    );
  }
);

/**
 * 普通打开
 * <p>
 */
const notFirstOpenLayerInit = function () {
  w.value = _w.value;
  h.value = _h.value;
  t.value = _t.value;
  l.value = _l.value;
  supportMove();
};

/**
 * Component 模式, 关闭事件
 * <p>
 * 在 Component 模式下, 隐藏前需要恢复正常窗体位置与尺寸, 保存
 **/
const beforeCloseSaveData = function () {
  if (min.value) minHandle();
  if (max.value) maxHandle();
  _w.value = w.value;
  _h.value = h.value;
  _t.value = t.value;
  _l.value = l.value;
};

/**
 * 弹层最大化
 * <p>
 */
const maxHandle = () => {
  if (max.value) {
    w.value = _w.value;
    h.value = _h.value;
    t.value = _t.value;
    l.value = _l.value;
    props.restore(props.id);
  } else {
    _t.value = t.value;
    _l.value = l.value;
    _w.value = w.value;
    _h.value = h.value;
    w.value = maxArea().w;
    h.value = maxArea().h;
    t.value = maxOffset().t;
    l.value = maxOffset().l;
    props.full(props.id);
  }
  max.value = !max.value;
};

/**
 * 弹层最小化
 * <p>
 */
const minHandle = () => {
  let left = 180 * updateMinArrays(id.value, !min.value);
  if (left > document.documentElement.clientWidth - 180) {
    left = document.documentElement.clientWidth - 180;
  }
  if (min.value) {
    w.value = _w.value;
    h.value = _h.value;
    t.value = _t.value;
    l.value = _l.value;
    props.restore(props.id);
  } else {
    _w.value = w.value;
    _h.value = h.value;
    _t.value = t.value;
    _l.value = l.value;
    h.value = minArea().h;
    w.value = minArea().w;
    t.value = minOffset(left).t;
    l.value = minOffset(left).l;
    props.min(props.id);
  }
  min.value = !min.value;
};

/**
 * 重置弹层
 * <p>
 */
const reset = function () {
  if (!first.value) {
    min.value = false;
    max.value = false;
    resetPosition();
    resetArea();
  }
  if (!props.modelValue) {
    emit("update:modelValue", true);
  }
};

/**
 * 监听 modalValue 的值 (template 专属)
 */
watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue;
    if (visible.value) {
      if (first.value) {
        first.value = false;
        firstOpenDelayCalculation();
      } else {
        notFirstOpenLayerInit();
      }
    } else {
      beforeCloseSaveData();
    }
  },
  { deep: true, immediate: true }
);

/**
 * 监听 visible 值
 * <p>
 */
watch(
  () => visible.value,
  () => {
    if (visible.value) {
      if (props.isFunction) {
        firstOpenDelayCalculation();
      }
      props.success();
    }
  },
  { immediate: true, flush: "post" }
);

watch(
  () => visible.value,
  () => {
    if (!visible.value) {
      props.end();
    }
  }
);

/**
 * 高度监听
 * <p>
 *
 * 在发生拖拽时, 需根据弹出层的外层高度计算 content 高度, 需要
 * 考虑 btn 操作栏, 计算公式：contentHeight = h - btnHeight
 *
 * @param h 弹层高度
 * @param btn 操作栏
 * @param type 弹层类型
 */
watch(
  () => h.value,
  () => {
    contentHeight.value = calculateContent(
      props.title,
      h.value,
      props.btn,
      type,
      props.isMessage
    );
  }
);

/**
 * 弹层类型
 *
 * @param type 类型
 * @param isMessage 是消息
 * @param icon 图标类型
 */
const boxClasses = computed(() => {
  return [
    {
      "layui-layer-dialog": type === 0,
      "layui-layer-page": type === 1,
      "layui-layer-iframe": type === 2,
      "layui-layer-loading": type === 3,
      "layui-layer-drawer": type === 4,
      "layui-layer-photos": type === 5,
      "layui-layer-notifiy": type === 6,
      "layui-layer-msg": props.isMessage,
      "layui-layer-hui": props.isMessage && !props.icon,
    },
    props.skin,
  ];
});

/**
 * 拖拽拉伸
 * <p>
 */
const supportMove = function () {
  if (props.move && type != 4) {
    nextTick(() => {
      if (layero.value) {
        // 拖拽, 在首次拖拽前, 移除 resizeObserver 监听
        useMove(layero.value, (left: string, top: string) => {
          removeListener();
          l.value = left;
          t.value = top;
        });
        // 拉伸, 在首次拉伸前, 移除 resizeObserver 监听
        useResize(layero.value, (width: string, height: string) => {
          removeListener();
          h.value = height;
          w.value = width;
        });
      }
    });
  }
};

/**
 * 弹层样式
 * <p>
 */
const styles = computed<any>(() => {
  let style = {
    top: t.value,
    left: l.value,
    width: w.value,
    height: h.value,
    zIndex: index.value,
  };
  return style;
});

/**
 * 弹层内容
 * <p>
 * @param type 类型
 * @param load 加载动画
 * @param icon 图标
 */
const contentClasses = computed(() => {
  return [
    type === 3 ? `layui-layer-loading${props.load}` : "",
    props.icon ? "layui-layer-padding" : "",
  ];
});

/**
 * 关闭操作
 * <p>
 * @param null
 */
const closeHandle = () => {
  emit("close");
  emit("update:modelValue", false);
  props.destroy();
  if (type === 6) {
    //@ts-ignore
    removeNotifiyFromQueen(props.id);
  }
};

/**
 * 确定操作
 * <p>
 * @param null
 */
const yesHandle = () => {
  if (props.yes != undefined) props.yes();
  else closeHandle();
};

/**
 * 遮盖层点击
 * <p>
 * @param null
 */
const shadeHandle = () => {
  if (props.shadeClose) closeHandle();
};

/**
 * 获取内容
 * <p>
 * @param content 文本 / 方法
 */
const renderContent = function (content: any) {
  if (content instanceof Function) {
    return content();
  }
  return content;
};

/**
 * 弹层图标
 * <p>
 * @param icon 图标
 */
const iconClass = computed(() => {
  return ["layui-layer-ico", `layui-layer-ico${props.icon}`];
});

/**
 * 入场动画
 * <p>
 * @param type 类型
 * @param anim 入场动画
 */
const enterActiveClass = computed(() => {
  if (type === 4) {
    return getDrawerAnimationClass(props.offset);
  }
  if (type === 6) {
    return getNotifyAnimationClass(props.offset);
  }
  return `layer-anim layer-anim-0${props.anim}`;
});

/**
 * 离场动画
 * <p>
 * @param type 类型
 * @param isOutAnim 离场动画
 */
const leaveActiveClass = computed(() => {
  if (type === 4) {
    return getDrawerAnimationClass(props.offset, true);
  }
  return props.isOutAnim ? `layer-anim-close` : "";
});

/**
 * 打开弹层
 * <p>
 */
const open = () => {
  visible.value = true;
};

/**
 * 关闭弹层
 * <p>
 */
const close = () => {
  visible.value = false;
};

/**
 * 显示遮盖
 * <p>
 * @param visible 弹层状态
 * @param shade 开启遮盖
 * @param min 最小化
 */
const shadeVisible = computed(() => {
  return visible.value && props.shade && !min.value;
});

/**
 * 拉伸支持
 * <p>
 * @param resize 拉伸
 * @param max 最大化
 * @param min 最小化
 */
const showResize = computed(() => {
  return props.resize && !max.value && !min.value;
});

/**
 * 显示标题
 * <p>
 * @param title 标题
 * @param type  类型
 */
const showTitle = computed(() => {
  return props.title && props.type != 3 && props.type != 5 && props.type != 6;
});

/*
 * 图片弹层重新计算
 */
const resetCalculationPohtosArea = function (index: number) {
  nextTick(async () => {
    area.value = await calculatePhotosArea(props.imgList[index].src, props);
    offset.value = calculateOffset(props.offset, area.value, type);
    w.value = area.value[0];
    h.value = area.value[1];
    t.value = offset.value[0];
    l.value = offset.value[1];
    _w.value = area.value[0];
    _l.value = area.value[1];
    _t.value = offset.value[0];
    _l.value = offset.value[1];
  });
};

/**
 * 指定弹出层, 在点击标题时, 设置当前弹出层为最上层
 *
 * 顾: 修改 index 为最新的 nextIndex 值
 *
 * 备注: 其实在 nextIndex 之前应判定当前弹出层是否时最上层, 如果为否不做任何改变, 该问题暂时不会造成任何影响不做处理。
 */
const setTop = function () {
  if (!props.zIndex) {
    index.value = nextIndex();
  }
};

/**
 * 当 content 高度发生变化时, 重新计算 offset 偏移量
 *
 * TODO 该监听只作用于指定的弹出层类型, 其他不可控制
 *
 * 只考虑 1 和 4 做自适应处理
 *
 * 备注: 该监听应在首次拖拽后清除
 *
 * 这里不采用 onMounted 的原因是因为 visible 为 true 时, 并不会触发该事件。
 */
onMounted(() => {
  listenDocument();
});

onUnmounted(() => {
  removeListener();
});

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      listenDocument();
    } else {
      removeListener();
    }
  }
);

var resizeObserver: ResizeObserver | undefined;

const listenDocument = function () {
  nextTick(() => {
    if (
      contentRef.value &&
      resizeObserver === undefined &&
      (props.area == "auto" ||
        (typeof props.area == "string" && props.area != "auto") ||
        (Array.isArray(props.area) &&
          props.area[1] &&
          props.area[1] == "auto") ||
        (Array.isArray(props.area) && props.area[1] == undefined)) &&
      type != 6
    ) {
      resizeObserver = new ResizeObserver((e) => {
        if (layero.value) {
          offset.value = calculateOffset(
            props.offset,
            getArea(layero.value),
            type
          );
          resetPosition();
        }
      });
      resizeObserver.observe(contentRef.value);
    }
  });
};

/**
 * Remove 删除 document 元素
 */
const removeListener = function () {
  if (resizeObserver != undefined && contentRef.value) {
    resizeObserver.unobserve(contentRef.value);
    resizeObserver = undefined;
  }
};

/**
 * 根据 offset 重新定位 Dom 位置
 */
const resetPosition = function () {
  t.value = offset.value[0];
  l.value = offset.value[1];
  _t.value = offset.value[0];
  _l.value = offset.value[1];
};

/**
 * 根据 area 重新设置 Dom 尺寸
 */
const resetArea = function () {
  w.value = area.value[0];
  h.value = area.value[1];
  _w.value = area.value[0];
  _l.value = area.value[1];
};

defineExpose({ reset, open, close });
</script>

<template>
  <div>
    <!-- 遮盖层 -->
    <Shade
      :index="index"
      :visible="shadeVisible"
      :opacity="shadeOpacity"
      @shadeClick="shadeHandle"
    ></Shade>
    <!-- 动画容器 -->
    <transition
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
    >
      <!-- 弹出层 -->
      <div
        ref="layero"
        class="layui-layer layui-layer-border"
        :class="boxClasses"
        :style="styles"
        v-if="visible"
      >
        <!-- 标题 -->
        <Title v-if="showTitle" :title="title" @mousedown="setTop"></Title>
        <!-- 内容 -->
        <div
          ref="contentRef"
          class="layui-layer-content"
          :style="{ height: contentHeight }"
          :class="contentClasses"
        >
          <template v-if="type === 0 || type === 1 || type === 4">
            <i v-if="icon" :class="iconClass"></i>
            <slot v-if="slots.default"></slot>
            <template v-else>
              <template v-if="isHtmlFragment">
                <span v-html="renderContent(props.content)"></span>
              </template>
              <template v-else>{{ renderContent(props.content) }}</template>
            </template>
          </template>
          <Iframe v-if="type === 2" :src="props.content"></Iframe>
          <Photos
            v-if="type === 5"
            :imgList="props.imgList"
            :startIndex="props.startIndex"
            @resetCalculationPohtosArea="resetCalculationPohtosArea"
          ></Photos>
          <Notifiy
            v-if="type === 6"
            @close="closeHandle"
            :title="props.title"
            :content="props.content"
            :isHtmlFragment="props.isHtmlFragment"
            :icon="props.icon"
            :iconClass="iconClass"
          ></Notifiy>
        </div>
        <!-- 工具栏 -->
        <span
          class="layui-layer-setwin"
          v-if="type != 3 && type != 5 && type != 6"
        >
          <a
            v-if="maxmin && !max"
            class="layui-layer-min"
            :class="[min ? 'layui-layer-ico layui-layer-maxmin' : '']"
            href="javascript:;"
            @click="minHandle"
          >
            <cite v-if="!min"></cite>
          </a>
          <a
            v-if="maxmin && !min"
            class="layui-layer-ico layui-layer-max"
            :class="[max ? 'layui-layer-maxmin' : '']"
            href="javascript:;"
            @click="maxHandle"
          ></a>
          <CloseBtn
            v-if="closeBtn != false"
            :close-btn="closeBtn"
            @closeHandle="closeHandle"
          ></CloseBtn>
        </span>
        <!-- 操作栏 -->
        <div
          v-if="((btn && btn.length > 0) || type === 0) && !isMessage"
          class="layui-layer-btn"
          :class="[`layui-layer-btn-${btnAlign}`]"
        >
          <template v-if="btn && btn.length > 0">
            <template v-for="(b, index) in btn" :key="index">
              <a
                :class="[
                  `layui-layer-btn${index}`,
                  { 'layui-layer-btn-disabled': b.disabled },
                ]"
                @click="!b.disabled && b.callback(id)"
                >{{ b.text }}</a
              >
            </template>
          </template>
          <template v-else>
            <template v-if="type === 0">
              <a class="layui-layer-btn0" @click="yesHandle()">{{ yesText }}</a>
            </template>
          </template>
        </div>
        <!-- 辅助栏 -->
        <span v-if="showResize" class="layui-layer-resize"></span>
      </div>
    </transition>
  </div>
</template>
