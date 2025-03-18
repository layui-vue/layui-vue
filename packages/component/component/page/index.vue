<!--
 * @Author: baobaobao
 * @Date: 2023-07-07 15:34:38
 * @LastEditTime: 2023-10-23 18:00:53
 * @LastEditors: baobaobao
-->

<script setup lang="ts">
import "./index.less";
import { PageProps as _PageProps, LayoutKey as _LayOutKey } from "./interface";
import {
  Ref,
  ref,
  watch,
  useSlots,
  computed,
  ComputedRef,
  h,
  provide,
  VNode,
} from "vue";
import LayPageCount from "./components/count.vue";
import LayPagePrev from "./components/prev.vue";
import LayPager from "./components/pager.vue";
import LayPageNext from "./components/next.vue";
import LayPageLimits from "./components/limits.vue";
import LayPageRefresh from "./components/refresh.vue";
import LayPageSkip from "./components/skip.vue";
import LayPageSimple from "./components/simple.vue";
import { LAYUI_PAGE_KEY } from "./usePage";
// export type MODE = "border" | "background" | "none";
export interface PageOtionInfo {
  resetLeft?: number[];
  resetRight?: number[];
}
export type LayoutKey = _LayOutKey;
export interface ComponentVnode {
  name: LayoutKey;
  componentName: VNode | null;
  show: boolean;
}
export type PageProps = _PageProps;

defineOptions({
  name: "LayPage",
});

const props = withDefaults(defineProps<PageProps>(), {
  limit: 10,
  pages: 5,
  modelValue: 1,
  total: 0,
  simple: false,
  disabled: false,
  hideOnSinglePage: false,
  ellipsisTooltip: false,
  limits: () => [10, 20, 30, 40, 50],
  layout: () => ["prev", "page", "next", "limits"],
});

const slots = useSlots();
const limits: Ref<number[]> = ref(props.limits);
const groups: Ref<number> = ref(props.pages);
const getLayout: Ref<LayoutKey[]> = ref(props.layout);
const currentPage: Ref<number> = ref(props.modelValue);
const inlimit: Ref<number> = ref(props.limit);
const theme: Ref<string | undefined> = ref(props.theme);
const ellipsisTooltip: Ref<boolean> = ref(props.ellipsisTooltip);
const emit = defineEmits(["update:modelValue", "change", "update:limit"]);
const iconPrevHover: Ref<boolean> = ref<boolean>(true);
const iconNextHover: Ref<boolean> = ref<boolean>(true);
let pageOpionData = ref<PageOtionInfo>({
  resetLeft: [],
  resetRight: [],
});
const jumpNumber: Ref<number> = ref(props.modelValue);
const simple: ComputedRef<boolean> = computed(() => props.simple);
const disabled: Ref<boolean> = ref(props.disabled);
const getHideOnSinglePage: ComputedRef<boolean> = computed(() => {
  return !(pageCount.value < 2 && props.hideOnSinglePage);
});
watch(
  () => props.limit,
  () => {
    inlimit.value = props.limit;
  }
);
watch(
  () => props.disabled,
  () => {
    disabled.value = props.disabled;
  }
);
watch(
  () => props.theme,
  () => {
    theme.value = props.theme;
  }
);
watch(
  () => props.ellipsisTooltip,
  () => {
    ellipsisTooltip.value = props.ellipsisTooltip;
  }
);
watch(
  () => inlimit,
  (limit) => {
    emit("update:limit", +limit.value);
    emit("change", { current: +currentPage.value, limit: +inlimit.value });
  },
  {
    deep: true,
  }
);

watch(
  () => props.layout,
  () => {
    getLayout.value = props.layout;
  }
);
watch(
  () => props.modelValue,
  () => {
    currentPage.value = props.modelValue;
  }
);

watch(currentPage, (val) => {
  jumpNumber.value = val;
  emit("update:modelValue", +currentPage.value);
  emit("change", { current: +currentPage.value, limit: +inlimit.value });
});
// 分页
const pageTotal = computed(() => props.total);
const pageCount = computed(() => Math.ceil(props.total / inlimit.value) || 1);
const setPage = computed(() => {
  let joinPage = [];
  // 解释如下, 向上取值(当前值 + 1)/要连续出现的页数 如果等于1, 则代表从最小值为1,
  // 这里加1进行边界处理, 当前值等于要连续出现的页数时, 页数最小值不从1开始, 这种方式代表一种约定吧。
  // 如当前值 4, 连续出现的页数 为5时, 一定要满足从1开始取5个。
  if (groups.value <= 0) {
    groups.value = 1;
  }
  const index =
    pageCount.value > groups.value
      ? Math.ceil((currentPage.value + 1) / groups.value)
      : 1;
  // 根据当前值一分为2, 算出当前值最小值, 要连续出现的页数 一定包含当前值
  const halve = Math.floor((groups.value - 1) / 2);
  // 当前值 - 左边值
  let start = index > 1 ? currentPage.value - halve : 1;
  let end =
    index > 1
      ? (() => {
          // 算出右边 值
          const max = currentPage.value + (groups.value - halve - 1);
          return max > pageCount.value ? pageCount.value : max;
        })()
      : groups.value;
  // 当 (最大值 减去最小值 + 1) 小于连续出现的页数 则代表 不满足连续出现的页数
  // 故而 进行开始值 = 结束值 - 续出现的页数
  // 例子 总页数11 当前值  10 , 连续出现的页数为4   应该为 8 9 10 11, 当前 start 为9 , end - 连续出现的页数 =  11 - 4 = 7 + 1
  if (end > pageCount.value) {
    end = pageCount.value;
  }
  if (pageCount.value > groups.value) {
    if (end - start < groups.value - 1) {
      start = end - groups.value + 1;
    }
  }
  if (currentPage.value > pageCount.value) {
    currentPage.value = pageCount.value;
  }
  // 不包括 1 和 start
  pageOpionData.value.resetLeft = Array.from({ length: start - 2 })
    .map((_, index) => index + 2)
    .reverse();
  pageOpionData.value.resetRight = Array.from({
    length: pageCount.value - end - 1,
  }).map((_, index) => end + index + 1);
  for (let index = start; index <= end; index++) {
    joinPage.push(index);
  }
  return joinPage;
});

// 分页事件
const handlePage = (page: number) => {
  if (disabled.value) return;
  if (page <= 0) {
    page = 1;
  }
  if (page >= pageCount.value) {
    page = pageCount.value;
  }
  iconNextHover.value = true;
  iconPrevHover.value = true;
  currentPage.value = page;
};
// 下一页
const handleNext = () => {
  if (disabled.value) return;
  if (currentPage.value === pageCount.value) {
    return;
  }
  currentPage.value++;
};
// 上一页
const handlePrev = () => {
  if (disabled.value) return;
  if (currentPage.value <= 1) {
    return;
  }
  currentPage.value--;
};
// 失去焦点
const handleBlur = () => {
  if (simple.value) {
    if (currentPage.value >= pageCount.value) {
      currentPage.value = pageCount.value;
    }
    if (currentPage.value <= 1) {
      currentPage.value = 1;
    }
  } else {
    if (+jumpNumber.value >= pageCount.value) {
      jumpNumber.value = pageCount.value;
    }
    if (+jumpNumber.value < 1) {
      jumpNumber.value = 1;
    }
  }
};
const handleRefresh = () => {
  emit("change", { current: currentPage.value, limit: inlimit.value });
};
const handleJumpPage = () => {
  handlePage(+jumpNumber.value);
};

const PAGE_TEMPLATE: Record<string, VNode | null> = {
  count: h(LayPageCount),
  prev: h(LayPagePrev, {}, slots),
  page: h(LayPager),
  next: h(LayPageNext, {}, slots),
  limits: h(LayPageLimits),
  refresh: h(LayPageRefresh),
  skip: h(LayPageSkip),
};

const getPageComponent: ComputedRef<ComponentVnode[]> = computed(() => {
  return getLayout.value.reduce((init: ComponentVnode[], element) => {
    init.push({
      componentName: PAGE_TEMPLATE[element],
      show: PAGE_TEMPLATE[element] ? true : false,
      name: element,
    });
    return init;
  }, []);
});

provide(LAYUI_PAGE_KEY, {
  pageCount,
  pageTotal,
  currentPage,
  pageOpionData,
  iconNextHover,
  iconPrevHover,
  inlimit,
  limits,
  disabled,
  handleRefresh,
  handleNext,
  handlePrev,
  handlePage,
  jumpNumber,
  handleJumpPage,
  handleBlur,
  ellipsisTooltip,
  theme,
  setPage,
});
</script>

<template>
  <div
    v-if="getHideOnSinglePage"
    :class="[
      'layui-page',
      disabled ? 'is-disabled' : '',
      simple ? 'layui-page-simple' : '',
    ]"
  >
    <template v-if="!simple">
      <template v-for="component of getPageComponent" :key="component">
        <component
          :is="component.componentName"
          v-if="component.show"
        ></component>
      </template>
    </template>
    <!-- simple -->
    <template v-else>
      <lay-page-simple></lay-page-simple>
    </template>
  </div>
</template>
