import type { RenderFunc } from "@layui/component/component/_components/render";
import type { TabItemProps } from "@layui/component/component/tabItem/interface";
import type { UseResizeObserverReturn } from "@vueuse/core";
import type { StyleValue } from "vue";

import type { TabHeaderProps, TabItemVNode } from "../components/interface";
import LayIcon from "@layui/component/component/icon";
import { clsPrefix, isFunction, isString } from "@layui/component/utils";
import { useResizeObserver } from "@vueuse/core";

import {
  computed,
  createTextVNode,
  Fragment,
  h,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { LAY_TAB_CONTEXT } from "../constant";

export function useTabHeader(props: TabHeaderProps) {
  const TabContext = inject(LAY_TAB_CONTEXT)!;

  const preRef = ref<HTMLSpanElement | null>(null);
  const nextRef = ref<HTMLSpanElement | null>(null);
  const ulRef = ref<HTMLUListElement | null>(null);
  const liSRefS = ref<HTMLLIElement[]>([]);
  const isShowPreNext = ref(false);

  const isHorizontal = computed(() => ["top", "bottom"].includes(props.tabPosition!));
  const direction = computed(() => isHorizontal.value ? "width" : "height");
  const axis = computed(() => isHorizontal.value ? "X" : "Y");

  let ulRefObserver: UseResizeObserverReturn | null = null;

  onMounted(() => {
    ulRefObserver = useResizeObserver(ulRef, () => {
      handleUlRefResizeObserver();
      translateToCurrentTabItem();
      setTabBarStyle();
    });
  });

  onUnmounted(() => {
    ulRefObserver && ulRefObserver.stop();
  });

  /**
   * li内容是否超出视图尺寸
   */
  function handleUlRefResizeObserver() {
    const ulScrollWidthOrHeight = getHorizontalVerticalValue(ulRef.value, ["scrollWidth", "scrollHeight"]);
    const ulViewWidthOrHeight = getHorizontalVerticalValue(ulRef.value, ["offsetWidth", "offsetHeight"]);

    isShowPreNext.value = !!(ulRef.value && ulScrollWidthOrHeight > ulViewWidthOrHeight);
  }

  const classTabHead = computed(() => {
    return [
      clsPrefix("tab-head"),
      {
        [`is-${props.tabPosition}`]: props.tabPosition,
      },
    ];
  });

  const styleTabHead = computed(() => {
    if (!preRef.value || !nextRef.value) {
      return undefined;
    }

    const preSize = getHorizontalVerticalValue(preRef.value, ["offsetWidth", "offsetHeight"]);
    const nextSize = getHorizontalVerticalValue(nextRef.value, ["offsetWidth", "offsetHeight"]);

    return isHorizontal.value
      ? {
          paddingLeft: `${preSize}px`,
          paddingRight: `${nextSize}px`,
        }
      : {
          paddingTop: `${preSize}px`,
          paddingBottom: `${nextSize}px`,
        };
  });

  const classTabTitle = computed(() => {
    return [
      clsPrefix("tab-title"),
      {
        [`is-${props.tabPosition}`]: props.tabPosition,
      },
    ];
  });

  const transformValue = ref(0);
  const styleTabTitle = computed(() => {
    return {
      transform: `translate${axis.value}(-${transformValue.value}px)`,
    } as StyleValue;
  });

  const styleTabBar = ref<StyleValue>();
  function setTabBarStyle() {
    if (props.type !== "brief") {
      return;
    }

    let currentSize = 0;
    let totalSize = 0;

    for (let index = 0; index < liSRefS.value.length; index++) {
      const li = liSRefS.value[index];
      const value = getHorizontalVerticalValue(li, ["offsetWidth", "offsetHeight"]);

      if (li.classList.contains(clsPrefix("this"))) {
        currentSize = value;
        break;
      }
      else {
        totalSize += value;
      }
    }

    styleTabBar.value = {
      [direction.value]: `${currentSize}px`,
      transform: `translate${axis.value}(${totalSize}px)`,
      transition: props.activeBarTransition ? "transform .3s" : undefined,
    };
  }

  /**
   * header icon render function
   */
  function renderTabIcon(params: Parameters<RenderFunc>[0]) {
    const { props } = params.tabData as TabItemVNode;

    if (isFunction(props.icon)) {
      return props.icon();
    }
    else if (isString(props.icon)) {
      return h(LayIcon, {
        type: props.icon as string,
        style: "margin-right: 8px;",
      });
    }
  };

  /**
   * header title render function
   */
  function renderTabTitle(params: Parameters<RenderFunc>[0]) {
    const { children, props } = params.tabData as TabItemVNode;

    if (children?.title) {
      return h(Fragment, children?.title && children.title());
    }
    if (isFunction(props.title)) {
      return props.title();
    }
    else if (isString(props.title)) {
      return createTextVNode(props.title as string);
    }
  };

  function handleChange(id: TabItemProps["id"]) {
    if (props.beforeLeave && props.beforeLeave(id) === false) {
      return;
    }

    TabContext.emits("update:modelValue", id);
    TabContext.emits("change", id);
  }

  /**
   * 向前移动
   */
  function handlePreClick() {
    if (!ulRef.value) {
      return;
    }

    // ul视图宽/高
    const ulViewWidthOrHeight = getHorizontalVerticalValue(ulRef.value, ["offsetWidth", "offsetHeight"]);

    const originTransformValue = transformValue.value;

    if (!originTransformValue) {
      return;
    }

    const v = originTransformValue > ulViewWidthOrHeight
      ? originTransformValue - ulViewWidthOrHeight
      : 0;

    transformValue.value = v;
  }

  /**
   * 向后移动
   */
  function handleNextClick() {
    if (!ulRef.value) {
      return;
    }

    const originTransformValue = transformValue.value;
    // ul实际宽高
    const ulScrollWidthOrHeight = getHorizontalVerticalValue(ulRef.value, ["scrollWidth", "scrollHeight"]);
    // ul视图宽高
    const ulViewWidthOrHeight = getHorizontalVerticalValue(ulRef.value, ["offsetWidth", "offsetHeight"]);

    if (ulScrollWidthOrHeight - originTransformValue <= ulViewWidthOrHeight) {
      return;
    }

    const v = ulScrollWidthOrHeight - originTransformValue > ulViewWidthOrHeight * 2
      ? originTransformValue + ulViewWidthOrHeight
      : ulScrollWidthOrHeight - ulViewWidthOrHeight;

    transformValue.value = v;
  }

  watch(
    () => [props.modelValue, props.tabPosition, props.type],
    async () => {
      await nextTick();
      translateToCurrentTabItem();
      setTabBarStyle();
    },
    {
      deep: true,
      immediate: true,
    },
  );

  watch(
    () => [props.defaultSlot],
    async () => {
      await nextTick();
      handleUlRefResizeObserver();
      setTabBarStyle();
    },
    {
      deep: true,
      immediate: true,
    },
  );

  /**
   * 移动至当前选中的tab
   */
  function translateToCurrentTabItem() {
    if (!ulRef.value) {
      return;
    }

    const currentNode = liSRefS.value.find(node => node.classList.contains(clsPrefix("this")));

    if (!currentNode) {
      return;
    }

    // ul实际宽or高
    const ulScrollWidthOrHeight = getHorizontalVerticalValue(ulRef.value, ["scrollWidth", "scrollHeight"]);
    // ul视图宽or高
    const ulViewWidthOrHeight = getHorizontalVerticalValue(ulRef.value, ["offsetWidth", "offsetHeight"]);

    const ulLeftOrTop = getHorizontalVerticalValue(ulRef.value.getBoundingClientRect(), ["left", "top"]);
    const currentNodeLeftOrTop = getHorizontalVerticalValue(currentNode.getBoundingClientRect(), ["left", "top"]);

    // 点击的 `li左/上侧` 距离 `ul左/上侧`
    const diff = currentNodeLeftOrTop - ulLeftOrTop;

    /**
     * 小于视图一半的距离
     * 移动到最左/上侧
     */
    if (diff < ulViewWidthOrHeight / 2) {
      transformValue.value = 0;
      return;
    }

    /**
     * 大于 （li总宽/高度 - 视图一半距离）
     * 移动到最右侧
     */
    if (diff > (ulScrollWidthOrHeight - ulViewWidthOrHeight / 2)) {
      transformValue.value = ulScrollWidthOrHeight - ulViewWidthOrHeight;
      return;
    }

    transformValue.value = diff - ulViewWidthOrHeight / 2;
  }

  /**
   * 鼠标滚轮滚动
   * 调整偏移展示区域
   */
  function handleUlScroll(e: WheelEvent) {
    e.preventDefault();

    if (!ulRef.value) {
      return;
    }

    // ul实际宽or高
    const ulScrollWidthOrHeight = getHorizontalVerticalValue(ulRef.value, ["scrollWidth", "scrollHeight"]);
    // ul视图宽or高
    const ulViewWidthOrHeight = getHorizontalVerticalValue(ulRef.value, ["offsetWidth", "offsetHeight"]);

    const originTransformValue = transformValue.value;

    const direction = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

    const distance = 50 * (direction > 0 ? 1 : -1);

    const newValue = Math.min(
      Math.max(originTransformValue + distance, 0),
      ulScrollWidthOrHeight - ulViewWidthOrHeight,
    );

    transformValue.value = newValue;
  }

  function handleClose(id: TabItemProps["id"], index: number) {
    if (props.beforeClose && props.beforeClose(id) === false) {
      return;
    }

    props.defaultSlot.splice(index, 1);

    if (props.modelValue === id) {
      const nextItem = props.defaultSlot[index === props.defaultSlot.length ? 0 : index];

      nextItem && handleChange(nextItem.props.id);
    }

    TabContext.emits("close", id);

    handleUlRefResizeObserver();
  }

  type GetHorizontalVerticalValueFields = [string, string];
  /**
   * 根据不同方向获取不同属性
   * 如 [width, height] | [left, top]
   */
  function getHorizontalVerticalValue(
    data: any,
    [l, r]: GetHorizontalVerticalValueFields,
  ) {
    return isHorizontal.value
      ? data[l]
      : data[r];
  }

  return {
    isHorizontal,
    preRef,
    nextRef,
    ulRef,
    liSRefS,
    isShowPreNext,

    classTabHead,
    styleTabHead,
    classTabTitle,
    styleTabTitle,
    styleTabBar,
    renderTabIcon,
    renderTabTitle,

    handleChange,
    handlePreClick,
    handleNextClick,
    handleUlScroll,

    handleClose,
  };
}

export type UseTabHeader = ReturnType<typeof useTabHeader>;
