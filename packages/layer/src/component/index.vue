<script lang="ts">
export default {
  name: "LayLayer",
};
</script>

<script lang="ts" setup>
import type { BtnType, ImgListType } from "../types";

import Shade from "./Shade.vue";
import Iframe from "./Iframe.vue";
import Title from "./Header.vue";
import HeaderBtn from "./HeaderBtn.vue";
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
  StyleValue,
} from "vue";
import {
  nextId,
  maxArea,
  maxOffset,
  getArea,
  calculateArea,
  calculateOffset,
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
import "../theme/index.css";

export interface LayerProps {
  modelValue?: boolean;
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
    | "notify";
  title?: string | boolean | Function;
  titleStyle?: string | StyleValue;
  content?: string | Function | VNodeTypes;
  isHtmlFragment?: boolean;
  offset?: string | string[];
  area?: string | string[];
  move?: boolean;
  maxmin?: boolean;
  resize?: boolean;
  shade?: boolean;
  shadeClose?: boolean;
  shadeStyle?: StyleValue;
  shadeOpacity?: string;
  layerClasses?: string;
  zIndex?: number;
  closeBtn?: boolean | string;
  btn?: BtnType[];
  btnAlign?: "l" | "c" | "r";
  anim?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  isOutAnim?: boolean;
  icon?: string | number;
  imgList?: ImgListType[];
  startIndex?: number;
  animDuration?: string;
  moveOut?: boolean;
  teleport?: string;
  teleportDisabled?: boolean;
  lastPosition?: boolean;
  time?: number;
  load?: 0 | 1;
  yesText?: string;

  isMessage?: boolean;
  id?: string;
  isFunction?: boolean;
  appContext?: any;

  success?: Function;
  end?: Function;
  yes?: Function;
  beforeClose?: Function;
  close?: Function;
  min?: Function;
  full?: Function;
  revert?: Function;
  moveStart?: Function;
  moving?: Function;
  moveEnd?: Function;
  resizeStart?: Function;
  resizing?: Function;
  resizeEnd?: Function;
  internalDestroy?: Function;
}

const props = withDefaults(defineProps<LayerProps>(), {
  modelValue: false,
  type: 1,
  title: "标题",
  titleStyle: "",
  isHtmlFragment: false,
  offset: "auto",
  area: "auto",
  move: true,
  maxmin: false,
  resize: false,
  shade: true,
  shadeClose: true,
  shadeOpacity: "0.1",
  closeBtn: "1",
  btnAlign: "r",
  anim: 0,
  isOutAnim: true,
  imgList: () => [],
  startIndex: 0,
  animDuration: "0.3s",
  moveOut: false,
  teleport: "body",
  teleportDisabled: false,
  lastPosition: true,
  time: 0,
  load: 0,
  yesText: "确定",

  isMessage: false,
  isFunction: false,

  success: () => {},
  end: () => {},
  beforeClose: () => true,
  close: () => {},
  min: () => {},
  full: () => {},
  revert: () => {},
  moveStart: () => {},
  moving: () => {},
  moveEnd: () => {},
  resizeStart: () => {},
  resizing: () => {},
  resizeEnd: () => {},
});

const emit = defineEmits(["close", "update:modelValue"]);

const slots = useSlots();
const max: Ref<boolean> = ref(false);
const min: Ref<boolean> = ref(false);
const id: Ref<string> = ref(props.id || nextId());
const layerRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLElement | undefined>();
const type: number = calculateType(props.type);
const area: Ref<string[]> = ref(
  calculateArea(props.type, props.area, props.offset)
);
const offset: Ref<string[]> = ref(
  calculateOffset(props.offset, area.value, type)
);
const index: Ref<number | Function> = ref(99999);
const visible: Ref<boolean> = ref(false);

const w: Ref<string> = ref(area.value[0]);
const h: Ref<string> = ref(area.value[1]);
const t: Ref<string> = ref(offset.value[0]);
const l: Ref<string> = ref(offset.value[1]);

const _w: Ref<string> = ref("");
const _h: Ref<string> = ref("");
const _t: Ref<string> = ref("");
const _l: Ref<string> = ref("");

const setIndex = () => {
  index.value = props.zIndex ?? nextIndex();
};

/**
 * 监听 props 的 zIndex 改变, 更新弹出层元素层级
 */
watch(
  () => props.zIndex,
  () => {
    setIndex();
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
    let _area = area.value;
    if (_area[0] == undefined || _area[1] == undefined) {
      _area = getArea(layerRef.value);
    }

    if (type == 6) {
      offset.value = calculateNotifOffset(props.offset, _area, id.value);
    }

    resetPosition();
    resetArea();
    supportMove();
  });
};

/**
 * Component 模式, 关闭事件
 * <p>
 * 在 Component 模式下, 隐藏前需要恢复正常窗体位置与尺寸, 保存
 **/
const beforeCloseSaveData = function () {
  if (min.value) minHandle();
  if (max.value) maxHandle();
  _w.value = "";
  _h.value = "";
  _t.value = "";
  _l.value = "";
};

const baseMaxHandle = () => {
  _t.value = t.value;
  _l.value = l.value;
  _w.value = w.value;
  _h.value = h.value;
  w.value = maxArea().w;
  h.value = maxArea().h;
  t.value = maxOffset().t;
  l.value = maxOffset().l;
};

/**
 * 弹层最大化
 * <p>
 */
const maxHandle = () => {
  if (max.value) {
    // 恢复 ResizeObserver
    // t、l 偏移值由 ResizeObserver设置 _t、_l缓存
    listenDocument();
    w.value = _w.value;
    h.value = _h.value;
    props.revert(id.value);
  } else {
    // 防止ResizeObserver改动 t、l 偏移值
    removeListener();
    baseMaxHandle();
    props.full(id.value);
  }
  max.value = !max.value;
};

const baseMinHandle = () => {
  let left = 180 * updateMinArrays(id.value, true);
  if (left > document.documentElement.clientWidth - 180) {
    left = document.documentElement.clientWidth - 180;
  }
  _w.value = w.value;
  _h.value = h.value;
  _t.value = t.value;
  _l.value = l.value;
  h.value = minArea().h;
  w.value = minArea().w;
  t.value = minOffset(left).t;
  l.value = minOffset(left).l;
};

/**
 * 弹层最小化
 * <p>
 */
const minHandle = async () => {
  if (min.value) {
    // 恢复 ResizeObserver
    // t、l 偏移值由 ResizeObserver设置 _t、_l缓存
    listenDocument();
    updateMinArrays(id.value, false);
    w.value = _w.value;
    h.value = _h.value;
    // 取消最小化
    // 为保证定位位置可返回最后一次拖动位置|初始位置
    // 放置 ResizeObserver 统一设置
    props.revert(id.value);
  } else {
    // 防止ResizeObserver改动 t、l 偏移值
    removeListener();
    baseMinHandle();
    props.min(id.value);
  }
  min.value = !min.value;
};

/**
 * 监听 modalValue 的值 (template 专属)
 */
watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue;

    if (visible.value) {
      firstOpenDelayCalculation();
      setIndex();
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
      nextTick(() => {
        props.success(id.value);
      });
    }
  },
  { immediate: true, flush: "post" }
);

watch(
  () => visible.value,
  () => {
    if (!visible.value) {
      props.end(id.value);
    }
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
    props.layerClasses,
  ];
});

/**
 * 拖拽拉伸
 * <p>
 */
const supportMove = function () {
  if (props.move && type != 4) {
    nextTick(() => {
      if (layerRef.value) {
        // 拖拽, 在首次拖拽前, 移除 resizeObserver 监听
        useMove(
          layerRef.value,
          props.moveOut,
          (left: string, top: string) => {
            l.value = left;
            t.value = top;
            // 最小化不cache
            if (!min.value) {
              _l.value = left;
              _t.value = top;
            }
            props.moving(id.value, { top: top, left: left });
          },
          () => {
            // 拖拽结束
            props.moveEnd(id.value);
          },
          () => {
            // 拖拽开始
            props.moveStart(id.value);
          }
        );
        // 拉伸, 在首次拉伸前, 移除 resizeObserver 监听
        useResize(
          layerRef.value,
          (width: string, height: string) => {
            h.value = height;
            w.value = width;
            _h.value = height;
            _w.value = width;
            props.resizing(id.value, { width: width, height: height });
          },
          () => {
            // 拉伸结束
            props.resizeEnd(id.value);
          },
          () => {
            // 拉伸开始
            props.resizeStart(id.value);
          }
        );
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
    position:
      props.teleportDisabled || props.teleport != "body" ? "absolute" : "fixed",
    top: t.value,
    left: l.value,
    height: h.value,
    width: w.value,
    animationDuration: props.animDuration,
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
  if (typeof props.beforeClose === "function") {
    const result = props.beforeClose(id.value);
    // @ts-ignore
    if (result === undefined || (result != undefined && result === true)) {
      props.close(id.value);
      emit("close");
      emit("update:modelValue", false);

      // 函数式调用专用.
      // 不对外使用
      props.internalDestroy && props.internalDestroy();
      if (type === 6) {
        // @ts-ignore
        removeNotifiyFromQueen(id.value);
      }
      if (min.value) {
        updateMinArrays(id.value, !min.value);
      }
    }
  }
};

/**
 * 确定操作
 * <p>
 * @param null
 */
const yesHandle = () => {
  if (typeof props.yes === "function") props.yes(id.value);
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
  return ["layer-icon", `layer-icon-ico${props.icon}`];
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
  return `layer-anim-0${props.anim}`;
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
  return props.title && type != 3 && type != 5 && type != 6;
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
    _h.value = area.value[1];
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

let resizeObserver: ResizeObserver | undefined;

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
        if (layerRef.value) {
          offset.value = calculateOffset(
            props.offset,
            getArea(layerRef.value),
            type
          );
          t.value = (props.lastPosition && _t.value) || offset.value[0];
          l.value = (props.lastPosition && _l.value) || offset.value[1];
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
 * 根据 offset 重新定位至初始 Dom 位置
 */
const resetPosition = function () {
  t.value = offset.value[0];
  l.value = offset.value[1];
};

/**
 * 根据 area 重新设置 Dom 尺寸
 */
const resetArea = function () {
  w.value = area.value[0];
  h.value = area.value[1];
  _w.value = area.value[0];
  _h.value = area.value[1];
};

/**
 * 重置弹层
 * <p>
 */
const reset = function () {
  listenDocument();
  updateMinArrays(id.value, false);

  min.value = false;
  max.value = false;
  // 删除缓存偏移量
  _t.value = "";
  _l.value = "";
  resetPosition();
  resetArea();
  if (!props.modelValue) {
    emit("update:modelValue", true);
  }
};

const full = function () {
  if (!max.value) {
    removeListener();
    baseMaxHandle();
    max.value = true;
  }
};

const mini = function () {
  if (!min.value) {
    removeListener();
    baseMinHandle();
    min.value = true;
  }
};

const revert = () => {
  listenDocument();
  updateMinArrays(id.value, false);

  min.value = false;
  max.value = false;
  w.value = _w.value;
  h.value = _h.value;
};

defineExpose({ reset, open, close, full, min: mini, revert });
</script>

<template>
  <Teleport :to="teleport" :disabled="teleportDisabled">
    <Shade
      :index="index"
      :shade-style="shadeStyle"
      :visible="shadeVisible"
      :opacity="shadeOpacity"
      :teleport="teleport"
      :teleportDisabled="teleportDisabled"
      @shadeClick="shadeHandle"
    ></Shade>
    <transition
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
    >
      <div
        ref="layerRef"
        class="layui-layer layui-layer-border"
        :id="id"
        :class="boxClasses"
        :style="styles"
        v-if="visible"
      >
        <!-- 标题 -->
        <Title
          v-if="showTitle"
          :title="title"
          :titleStyle="titleStyle"
          :move="move"
          @mousedown="setTop"
        >
          <slot name="title"></slot>
        </Title>
        <!-- 内容 -->
        <div
          ref="contentRef"
          class="layui-layer-content"
          :class="contentClasses"
          :style="min === true ? 'display:none' : ''"
        >
          <template v-if="type === 0 || type === 1 || type === 4">
            <i v-if="icon" :class="iconClass"></i>
            <template v-if="slots.default">
              <div class="slot-fragment">
                <slot></slot>
              </div>
            </template>
            <template v-else>
              <template v-if="isHtmlFragment">
                <div
                  class="html-fragment"
                  v-html="renderContent(props.content)"
                ></div>
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
        <HeaderBtn
          v-if="type != 3 && type != 5 && type != 6"
          :maxmin="maxmin"
          :max="max"
          :min="min"
          :closeBtn="closeBtn"
          @on-min="minHandle"
          @on-max="maxHandle"
          @on-close="closeHandle"
        ></HeaderBtn>
        <!-- 操作栏 -->
        <div :style="min === true ? 'display:none' : ''">
          <template v-if="slots.footer">
            <div class="layui-layer-footer">
              <slot name="footer"></slot>
            </div>
          </template>
          <template v-else>
            <div
              v-if="((btn && btn.length > 0) || type === 0) && !isMessage"
              class="layui-layer-btn"
              :class="[`layui-layer-btn-${btnAlign}`]"
            >
              <template v-if="btn && btn.length > 0">
                <template v-for="(b, index) in btn" :key="index">
                  <a
                    :style="b.style"
                    :class="[
                      b.class,
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
                  <a class="layui-layer-btn0" @click="yesHandle()">{{
                    yesText
                  }}</a>
                </template>
              </template>
            </div>
          </template>
        </div>
        <!-- 辅助栏 -->
        <span v-if="showResize" class="layui-layer-resize"></span>
      </div>
    </transition>
  </Teleport>
</template>
