<script lang="ts">
export default {
  name: "LayPage",
};
</script>

<script setup lang="ts">
import "./index.less";
import { Ref, ref, watch, useSlots, computed } from "vue";
import { useI18n } from "vue-i18n";

export interface LayPageProps {
  total: number;
  limit: number;
  theme?: string;
  modelValue?: number;
  showPage?: boolean | string;
  showSkip?: boolean | string;
  showCount?: boolean | string;
  showLimit?: boolean | string;
  showInput?: boolean | string;
  showRefresh?: boolean | string;
  pages?: number;
  limits?: number[];
}

const slots = useSlots();

const { t } = useI18n();

const props = withDefaults(defineProps<LayPageProps>(), {
  limit: 10,
  theme: "green",
  showPage: false,
  showSkip: false,
  showCount: false,
  showLimit: true,
  showInput: false,
  showRefresh: false,
  modelValue: 1,
  pages: 10,
  limits: () => [10, 20, 30, 40, 50],
});

const limits = ref(props.limits);
const pages = Math.ceil(props.pages / 2);

const inlimit = computed({
  get() {
    return props.limit;
  },
  set(v: number) {
    emit("limit", v);
  },
});

const maxPage = ref(0);

const totalPage = computed(() => {
  maxPage.value = Math.ceil(props.total / props.limit);
  let r: number[] = [],
    start =
      maxPage.value <= props.pages
        ? 1
        : currentPage.value > pages
        ? currentPage.value - pages
        : 1;
  for (let i = start; ; i++) {
    if (r.length >= props.pages || i > maxPage.value) {
      break;
    }
    r.push(i);
  }
  return r;
});

const currentPage: Ref<number> = ref(props.modelValue);
const currentPageShow: Ref<number> = ref(currentPage.value);

const emit = defineEmits(["jump", "limit"]);

const prev = function () {
  if (currentPage.value === 1) {
    return;
  }
  currentPage.value--;
};

const next = function () {
  if (currentPage.value === maxPage.value) {
    return;
  }
  currentPage.value++;
};

const jump = function (page: number) {
  currentPage.value = page;
};

const jumpPage = function () {
  currentPage.value = currentPageShow.value;
};

watch(inlimit, function () {
  currentPage.value = 1;
});

watch(currentPage, function () {
  currentPageShow.value = currentPage.value;
  emit("jump", { current: currentPage.value });
});
</script>

<template>
  <div class="layui-box layui-laypage layui-laypage-default">
    <span v-if="showCount" class="layui-laypage-count"
      >共 {{ total }} 条 {{ maxPage }} 页</span
    >
    <a
      href="javascript:;"
      class="layui-laypage-prev"
      :class="[currentPage === 1 ? 'layui-disabled' : '']"
      @click="prev()"
    >
      <slot v-if="slots.prev" name="prev"></slot>
      <template v-else>{{ t("page.prev") }}</template>
    </a>
    <template v-if="showPage">
      <template v-for="index of totalPage" :key="index">
        <span v-if="index === currentPage" class="layui-laypage-curr">
          <em
            class="layui-laypage-em"
            :class="[theme ? 'layui-bg-' + theme : '']"
          ></em>
          <em>{{ index }}</em>
        </span>
        <a v-else href="javascript:;" @click="jump(index)">{{ index }}</a>
      </template>
    </template>

    <a
      href="javascript:;"
      class="layui-laypage-next"
      :class="[currentPage === maxPage ? 'layui-disabled' : '']"
      @click="next()"
    >
      <slot v-if="slots.next" name="next"></slot>
      <template v-else>{{ t("page.next") }}</template>
    </a>
    <span v-if="showLimit" class="layui-laypage-limits">
      <select v-model="inlimit">
        <option v-for="val of limits" :key="val" :value="val">
          {{ val }} 条/页
        </option>
      </select>
    </span>
    <a v-if="showRefresh" href="javascript:;" class="layui-laypage-refresh">
      <i class="layui-icon layui-icon-refresh"></i>
    </a>
    <span v-if="showSkip" class="layui-laypage-skip">
      到第
      <input
        v-model="currentPageShow"
        @keypress.enter="jumpPage()"
        type="number"
        class="layui-input layui-input-number"
      />页
      <button
        type="button"
        class="layui-laypage-btn"
        @click="jumpPage()"
        :disabled="currentPageShow > maxPage"
      >
        确定
      </button>
    </span>
  </div>
</template>
