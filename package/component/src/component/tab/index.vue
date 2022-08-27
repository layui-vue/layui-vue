<script lang="ts">
export default {
  name: "LayTab",
};
</script>

<script setup lang="ts">
import "./index.less";
import { LayIcon } from "@layui/icons-vue";
import tabItem from "../tabItem/index.vue";
import RenderTitle from "./renderTitle.vue";
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
} from "vue";
import { useResizeObserver } from "@vueuse/core";
import { TabData, TabInjectKey } from "./interface";

export type tabPositionType = "top" | "bottom" | "left" | "right";

export interface LayTabProps {
  type?: string;
  modelValue: string;
  allowClose?: boolean;
  tabPosition?: tabPositionType;
  beforeClose?: Function;
  beforeLeave?: Function;
  activeBarTransition?: boolean;
}

const slot = useSlots();
const slots = slot.default && slot.default();
const childrens: Ref<VNode[]> = ref([]);
const slotsChange = ref(true);
const tabMap = reactive(new Map<number, TabData>());

const setItemInstanceBySlot = function (nodeList: VNode[]) {
  nodeList?.map((item) => {
    let component = item.type as Component;
    if (component.name != tabItem.name) {
      setItemInstanceBySlot(item.children as VNode[]);
    } else {
      childrens.value.push(item);
    }
  });
};

const props = withDefaults(defineProps<LayTabProps>(), {
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

const renderTabChild = (child: TabData) => {
  return child.slots?.title
    ? () => h("span", child.slots?.title && child.slots.title())
    : () => createTextVNode(child.title);
};

useResizeObserver(navRef, update);

watch(
  slotsChange,
  function () {
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
provide("slotsChange", slotsChange);
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
          v-for="(children, index) in tabItems"
          :key="children.id"
          :class="[children.id === active ? 'layui-this' : '']"
          @click.stop="change(children.id)"
        >
          <RenderFunction :renderFunc="renderTabChild(children)" />
          <i
            v-if="allowClose && children.closable != false"
            class="layui-icon layui-icon-close layui-unselect layui-tab-close"
            @click.stop="close(index, children.id)"
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
