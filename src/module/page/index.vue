<template>
  <div class="layui-box layui-laypage layui-laypage-default">
    <span v-if="showCount" class="layui-laypage-count">共 {{ total }} 条</span
    ><a
      href="javascript:;"
      class="layui-laypage-prev"
      :class="[currentPage === 1 ? 'layui-disabled' : '']"
      @click="prev()"
      ><slot v-if="slots.prev" name="prev"></slot>
      <template v-else>上一页</template></a
    >
    <template v-if="showPage">
      <template v-for="index of totalPage" :key="index">
        <span v-if="index === currentPage" class="layui-laypage-curr"
          ><em
            class="layui-laypage-em"
            :class="[theme ? 'layui-bg-' + theme : '']"
          ></em
          ><em>{{ index }}</em></span
        >
        <a v-else href="javascript:;" @click="jump(index)">
          {{ index }}
        </a>
      </template>
    </template>

    <a
      href="javascript:;"
      class="layui-laypage-next"
      :class="[currentPage === totalPage ? 'layui-disabled' : '']"
      @click="next()"
      ><slot v-if="slots.next" name="next"></slot>
      <template v-else>下一页</template></a
    ><span v-if="showLimit" class="layui-laypage-limits"
      ><select v-model="inlimit">
        <option value="10">10 条/页</option>
        <option value="20">20 条/页</option>
        <option value="30">30 条/页</option>
        <option value="40">40 条/页</option>
        <option value="50">50 条/页</option>
      </select></span
    ><a v-if="showRefresh" href="javascript:;" class="layui-laypage-refresh"
      ><i class="layui-icon layui-icon-refresh"></i></a
    ><span v-if="showSkip" class="layui-laypage-skip"
      >到第<input
        v-model="currentPageShow"
        type="number"
        class="layui-input layui-input-number"
      />页<button type="button" class="layui-laypage-btn" @click="jumpPage()">
        确定
      </button></span
    >
  </div>
</template>

<script setup name="LayPage" lang="ts">
import { defineProps, Ref, ref, watch, useSlots, computed, ComputedRef } from "vue";

const slots = useSlots();

const props = withDefaults(
  defineProps<{
    total: number;
    limit: number;
    theme?: string;
    showPage?: boolean | string;
    showSkip?: boolean | string;
    showCount?: boolean | string;
    showLimit?: boolean | string;
    showInput?: boolean | string;
    showRefresh?: boolean | string;
  }>(),
  {
    limit: 10,
    theme: "green",
    showPage: false,
    showSkip: false,
    showCount: false,
    showLimit: true,
    showInput: false,
    showRefresh: false,
  }
);

const inlimit = ref(props.limit);
const totalPage = ref(Math.ceil(props.total / inlimit.value));
const currentPage: Ref<number> = ref(1);
const currentPageShow: Ref<number> = ref(currentPage.value);
const emit = defineEmits(["jump"]);

const prev = function () {
  if (currentPage.value === 1) {
    return;
  }
  currentPage.value--;
};

const next = function () {
  if (currentPage.value === totalPage.value) {
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
  totalPage.value = Math.ceil(props.total / inlimit.value);
});

watch(currentPage, function () {
  currentPageShow.value = currentPage.value;
  emit("jump", { current: currentPage.value });
});
</script>