<script lang="ts">
export default {
  name: "LayTab",
};
</script>

<script setup lang="ts">
import "./index.less";
import { LayIcon } from "@layui/icons-vue";
import tabItem from "../tabItem/index.vue";
import RenderFunction from "../_components/renderFunction";
import {
  Component,
  computed,
  useSlots,
  provide,
  VNode,
  Ref,
  ref,
  watch,
  shallowRef,
  onMounted,
  nextTick,
  CSSProperties,
  reactive,
  h,
  createTextVNode,
  Fragment,
} from "vue";
import { useResizeObserver } from "@vueuse/core";
import { TabData, TabInjectKey, TabPosition } from "./interface";
import { isArrayChildren } from "../../utils";

export interface TabProps {
  type?: string;
  modelValue: string;
  allowClose?: boolean;
  tabPosition?: TabPosition;
  beforeClose?: Function;
  beforeLeave?: Function;
  activeBarTransition?: boolean;
}

const slot = useSlots();
const tabMap = reactive(new Map<number, TabData>());
const childrens: Ref<VNode[]> = ref([]);

const setItemInstanceBySlot = function (nodes: VNode[]) {
  nodes?.map((item) => {
    if (isArrayChildren(item, item.children)) {
      setItemInstanceBySlot(item.children as VNode[]);
    } else {
      if ((item.type as Component).name == tabItem.name) {
        childrens.value.push(item);
      }
    }
  });
};

const props = withDefaults(defineProps<TabProps>(), {
  tabPosition: "top",
});

const emit = defineEmits(["update:modelValue", "change", "close"]);

const active = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const tabItems = computed(() => {
  const tabData: TabData[] = [];
  childrens.value.forEach((item) => {
    const tab = tabMap.get(item.props?.id);
    if (tab) tabData.push(tab);
  });
  return tabData;
});

const addItem = (id: number, data: any) => {
  tabMap.set(id, data);
};

const removeItem = (id: number) => {
  tabMap.delete(id);
};

provide(
  TabInjectKey,
  reactive({
    active: active,
    addItem,
    removeItem,
  })
);

const change = function (id: any) {
  if (props.beforeLeave && props.beforeLeave(id) === false) {
    return;
  }
  emit("update:modelValue", id);
  emit("change", id);
};

const close = function (index: number, id: any) {
  if (props.beforeClose && props.beforeClose(id) === false) {
    return;
  }
  childrens.value.splice(index, 1);
  if (active.value === id) {
    const nextChildren =
      childrens.value[index === childrens.value.length ? 0 : index];
    change(nextChildren && nextChildren.props ? nextChildren.props.id : "");
  }
  emit("close", id);
};

const activeBarRef = shallowRef<HTMLElement | undefined>(undefined);
const activeEl = shallowRef<HTMLElement | undefined>(undefined);
const tabBarStyle = ref<CSSProperties>();
const getBarStyle = () => {
  let offset = 0;
  let tabSize = 0;
  const sizeName =
    props.tabPosition === "top" || props.tabPosition === "bottom"
      ? "width"
      : "height";
  const axis = sizeName === "width" ? "X" : "Y";
  const position = axis === "X" ? "left" : "top";
  const el = activeEl.value;
  const activeElParentElement = navRef.value;
  if (!el || !activeElParentElement) return;
  const rect = el?.getBoundingClientRect();
  const parentRect = activeElParentElement?.getBoundingClientRect();
  offset = rect[position] - parentRect[position];
  tabSize = el.getBoundingClientRect()[sizeName];
  return {
    [sizeName]: `${tabSize}px`,
    transform: `translate${axis}(${offset}px)`,
    transition: props.activeBarTransition ? `transform .3s` : "",
  };
};

const navRef = shallowRef<HTMLElement | undefined>(undefined);
const scrollable = ref(false);
const navOffset = ref<number>(0);
const navStyle = computed<CSSProperties>(() => {
  const axis =
    props.tabPosition === "top" || props.tabPosition === "bottom" ? "X" : "Y";
  const position = axis === "X" ? "left" : "top";
  const scrollPrevSize = scrollPrevRef.value?.[`offset${sizeName.value}`] ?? 0;
  return {
    transform: `translate${axis}(-${navOffset.value}px)`,
    [position]: scrollable.value ? `${scrollPrevSize}px` : 0,
  };
});
const sizeName = computed(() => {
  return props.tabPosition === "top" || props.tabPosition === "bottom"
    ? "Width"
    : "Height";
});

const getNavSize = function () {
  let size = 0;
  const nodeList = navRef.value?.querySelectorAll("li");
  nodeList?.forEach((item) => {
    size += item[`offset${sizeName.value}`];
  });
  return size;
};

const scrollPrev = function () {
  if (!navRef.value) return;
  const containerSize = navRef.value[`offset${sizeName.value}`];
  const currentOffset = navOffset.value;
  if (!currentOffset) return;
  let newOffset =
    currentOffset > containerSize ? currentOffset - containerSize : 0;
  navOffset.value = newOffset;
};

const scrollNextRef = shallowRef<HTMLElement | undefined>(undefined);
const scrollPrevRef = shallowRef<HTMLElement | undefined>(undefined);
const scrollNext = function () {
  if (!navRef.value) return;
  const navSize = getNavSize();
  const containerSize = navRef.value[`offset${sizeName.value}`];
  const currentOffset = navOffset.value;
  const scrollNextSize = scrollNextRef.value?.[`offset${sizeName.value}`] ?? 0;
  const scrollPrevSize = scrollPrevRef.value?.[`offset${sizeName.value}`] ?? 0;
  if (navSize - currentOffset <= containerSize) return;
  let newOffset =
    navSize - currentOffset > containerSize * 2
      ? currentOffset + containerSize
      : navSize - containerSize + scrollNextSize + scrollPrevSize;
  navOffset.value = newOffset;
};

const headRef = shallowRef<HTMLDivElement | undefined>(undefined);
const scrollToActiveTab = function () {
  if (!scrollable.value) return;
  const activeTab = activeEl.value;
  const container = headRef.value;
  if (!activeTab || !container) return;
  const activeTabRect = activeTab?.getBoundingClientRect();
  const containerRect = container?.getBoundingClientRect();
  const isHorizontal = ["top", "bottom"].includes(props.tabPosition);
  const currentOffset = navOffset.value;
  let newOffset = currentOffset;
  const navSize = getNavSize();
  const scrollNextSize = scrollNextRef.value?.[`offset${sizeName.value}`] ?? 0;
  const scrollPrevSize = scrollPrevRef.value?.[`offset${sizeName.value}`] ?? 0;
  const maxOffset = isHorizontal
    ? navSize - containerRect.width + scrollNextSize + scrollPrevSize
    : navSize - containerRect.height + scrollNextSize + scrollPrevSize;
  if (isHorizontal) {
    if (activeTabRect.left < containerRect.left) {
      newOffset = currentOffset - (containerRect.left - activeTabRect.left);
      newOffset -= scrollPrevSize;
    }
    if (activeTabRect.right > containerRect.right) {
      newOffset = currentOffset + activeTabRect.right - containerRect.right;
      newOffset += scrollNextSize;
    }
  } else {
    if (activeTabRect.top < containerRect.top) {
      newOffset = currentOffset - (containerRect.top - activeTabRect.top);
    }
    if (activeTabRect.bottom > containerRect.bottom) {
      newOffset = currentOffset + (activeTabRect.bottom - containerRect.bottom);
    }
  }
  newOffset = Math.max(newOffset, 0);
  navOffset.value = Math.min(newOffset, maxOffset);
};

const update = () => {
  if (!navRef.value) return;
  activeEl.value = navRef.value?.querySelector(".layui-this") as HTMLElement;
  tabBarStyle.value = getBarStyle();

  if (props.tabPosition !== "top" && props.tabPosition !== "bottom") return; // 暂时屏蔽垂直方向
  const navSize = getNavSize();
  const containerSize = navRef.value[`offset${sizeName.value}`];
  const currentOffset = navOffset.value;
  const scrollNextSize = scrollNextRef.value?.[`offset${sizeName.value}`] ?? 0;
  const scrollPrevSize = scrollPrevRef.value?.[`offset${sizeName.value}`] ?? 0;
  if (containerSize < navSize) {
    const currentOffset = navOffset.value;
    scrollable.value = true;
    if (navSize - currentOffset < containerSize) {
      navOffset.value =
        navSize - containerSize + scrollNextSize + scrollPrevSize;
    }
    scrollToActiveTab();
  } else {
    scrollable.value = false;
    if (currentOffset > 0) {
      navOffset.value = 0;
    }
  }
};

const horizontalScroll = (e: WheelEvent) => {
  e.preventDefault();
  const navSize = getNavSize();
  const containerSize = navRef.value![`offset${sizeName.value}`];
  const currentOffset = navOffset.value;
  const scrollNextSize = scrollNextRef.value?.[`offset${sizeName.value}`] ?? 0;
  const direction =
    Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  const distance = 50 * (direction > 0 ? 1 : -1);
  const newOffset = Math.max(currentOffset + distance, 0);
  if (
    navSize - currentOffset <= containerSize - scrollNextSize &&
    direction > 0
  )
    return;
  navOffset.value = newOffset;
};

const renderTabIcon = (attrs: Record<string, unknown>) => {
  const tab = attrs.tabData as TabData;
  if (typeof tab.icon === "function") {
    return tab.icon();
  } else if (typeof tab.icon === "string") {
    return h(LayIcon, {
      type: tab.icon,
      style: "margin-right: 8px;",
    });
  }
};

const renderTabTitle = (attrs: Record<string, unknown>) => {
  const tab = attrs.tabData as TabData;
  if (tab.slots?.title) {
    return h(Fragment, tab.slots?.title && tab.slots.title());
  }
  if (typeof tab.title === "function") {
    return tab.title();
  } else if (typeof tab.title === "string") {
    return createTextVNode(tab.title as string);
  }
};

useResizeObserver(navRef, update);

watch(
  tabMap,
  () => {
    childrens.value = [];
    setItemInstanceBySlot((slot.default && slot.default()) as VNode[]);
  },
  { immediate: true }
);

watch(
  () => [
    props.modelValue,
    props.tabPosition,
    props.type,
    childrens.value.length,
  ],
  async () => {
    await nextTick();
    update();
  }
);

onMounted(() => {
  update();
  scrollToActiveTab();
});

provide("active", active);
</script>

<template>
  <div
    class="layui-tab"
    :class="[
      type ? 'layui-tab-' + type : '',
      props.tabPosition ? `is-${tabPosition}` : '',
    ]"
  >
    <div
      ref="headRef"
      :class="['layui-tab-head', props.tabPosition ? `is-${tabPosition}` : '']"
    >
      <ul
        ref="navRef"
        @wheel="horizontalScroll"
        :class="[
          'layui-tab-title',
          props.tabPosition ? `is-${tabPosition}` : '',
        ]"
        :style="navStyle"
      >
        <div
          ref="activeBarRef"
          v-if="type === 'brief'"
          class="layui-tab-active-bar"
          :style="tabBarStyle"
        ></div>
        <li
          v-for="(child, index) in tabItems"
          :key="child.id"
          :class="[child.id === active ? 'layui-this' : '']"
          @click.stop="change(child.id)"
        >
          <span>
            <RenderFunction
              v-if="child['icon']"
              :renderFunc="renderTabIcon"
              :tabData="child"
            />
            <RenderFunction :renderFunc="renderTabTitle" :tabData="child" />
          </span>
          <i
            v-if="allowClose && child.closable != false"
            class="layui-icon layui-icon-close layui-unselect layui-tab-close"
            @click.stop="close(index, child.id)"
          ></i>
        </li>
      </ul>
      <span
        ref="scrollPrevRef"
        v-if="scrollable"
        class="layui-unselect layui-tab-bar prev"
        @click="scrollPrev"
      >
        <LayIcon type="layui-icon-left"></LayIcon>
      </span>
      <span
        ref="scrollNextRef"
        v-if="scrollable"
        class="layui-unselect layui-tab-bar"
        @click="scrollNext"
      >
        <LayIcon type="layui-icon-right"></LayIcon>
      </span>
    </div>
    <div class="layui-tab-content">
      <slot></slot>
    </div>
  </div>
</template>
