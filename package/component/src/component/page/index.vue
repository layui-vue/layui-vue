<script lang="ts">
export default {
  name: "LayPage",
};
</script>

<script setup lang="ts">
import "./index.less";
import { Ref, ref, watch, useSlots, computed } from "vue";
import { useI18n } from "../../language";

export interface LayPageProps {
  total: number;
  limit: number;
  theme?: string;
  showPage?: boolean;
  showSkip?: boolean;
  showCount?: boolean;
  showLimit?: boolean;
  showInput?: boolean;
  showRefresh?: boolean;
  pages?: number;
  limits?: number[];
  modelValue?: number;
}

const props = withDefaults(defineProps<LayPageProps>(), {
  limit: 10,
  pages: 10,
  modelValue: 1,
  theme: "green",
  showPage: false,
  showSkip: false,
  showCount: false,
  showLimit: true,
  showInput: false,
  showRefresh: false,
  limits: () => [10, 20, 30, 40, 50],
});

const { t } = useI18n();
const slots = useSlots();

const maxPage = ref(0);
const limits = ref(props.limits);
const pages = Math.floor(props.pages / 2);
const currentPage: Ref<number> = ref(props.modelValue);
const currentPageShow: Ref<number> = ref(currentPage.value);
const inlimit = ref(props.limit);

watch(() => props.limit, () => {
  inlimit.value = props.limit;
})

const totalPage = computed(() => {
  maxPage.value = Math.ceil(props.total / inlimit.value);
  let r: number[] = [];
  let start = maxPage.value <= props.pages ? 1 : currentPage.value > pages ? currentPage.value - pages : 1;
  for (let i = start; ; i++) {
    if (r.length >= props.pages || i > maxPage.value) {
      break;
    }
    r.push(i);
  }
  return r;
});

const emit = defineEmits(["update:modelValue", "update:limit", "change"]);

const prev = () => {
  if (currentPage.value === 1) {
    return;
  }
  currentPage.value--;
  emit("change", { current: currentPage.value, limit: inlimit.value });
};

const next = () => {
  if (currentPage.value === maxPage.value) {
    return;
  }
  currentPage.value++;
  emit("change", { current: currentPage.value, limit: inlimit.value });
};

const jump = (page: number) => {
  currentPage.value = page;
  emit("change", { current: currentPage.value, limit: inlimit.value });
};

const jumpPage = () => {
  currentPage.value = currentPageShow.value;
  emit("change", { current: currentPage.value, limit: inlimit.value });
};

const changelimit = () => {
  currentPage.value = 1;
  emit("change", { current: currentPage.value, limit: inlimit.value });
}

const refresh = () => {
  emit("change", { current: currentPage.value, limit: inlimit.value });
}

watch(inlimit, () => {
  emit("update:limit", inlimit.value);
})

watch(currentPage, () => {
  const min = totalPage.value[0];
  const max = totalPage.value[totalPage.value.length - 1];
  if (currentPage.value > max) currentPage.value = max;
  if (currentPage.value < min) currentPage.value = min;
  currentPageShow.value = currentPage.value;
  emit("update:modelValue", currentPage.value);
});

watch(
  () => props.modelValue,
  () => {
    currentPage.value = props.modelValue;
    currentPageShow.value = currentPage.value;
  }
);
</script>

<template>
  <div class="layui-laypage layui-laypage-default">
    <span v-if="showCount" class="layui-laypage-count"
      >共 {{ total }} 条 {{ maxPage }} 页</span
    >
    <a
      href="javascript:;"
      class="layui-laypage-prev"
      :class="[
        currentPage === 1 ? 'layui-disabled' : '',
        theme && currentPage !== 1 ? 'layui-laypage-a-' + theme : '',
      ]"
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
        <a
          v-else
          href="javascript:;"
          @click="jump(index)"
          :class="[theme ? 'layui-laypage-a-' + theme : '']"
          >{{ index }}</a
        >
      </template>
    </template>
    <a
      href="javascript:;"
      class="layui-laypage-next"
      :class="[
        currentPage === maxPage ? 'layui-disabled' : '',
        theme && currentPage !== maxPage ? 'layui-laypage-a-' + theme : '',
      ]"
      @click="next()"
    >
      <slot v-if="slots.next" name="next"></slot>
      <template v-else>{{ t("page.next") }}</template>
    </a>
    <span v-if="showLimit" class="layui-laypage-limits">
      <select v-model="inlimit" @change="changelimit">
        <option v-for="val of limits" :key="val" :value="val">
          {{ val }} 条/页
        </option>
      </select>
    </span>
    <a v-if="showRefresh" href="javascript:;" @click="refresh" class="layui-laypage-refresh">
      <i class="layui-icon layui-icon-refresh"></i>
    </a>
    <span v-if="props.showSkip" class="layui-laypage-skip">
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
        :disabled="currentPageShow > maxPage || currentPageShow == currentPage"
      >
        确定
      </button>
    </span>
  </div>
</template>