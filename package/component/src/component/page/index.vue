<!--
 * @Author: baobaobao
 * @Date: 2023-07-07 15:34:38
 * @LastEditTime: 2023-09-21 21:07:12
 * @LastEditors: baobaobao
-->
<script lang="ts">
export default {
  name: "LayPage",
};
</script>

<script setup lang="ts">
import "./index.less";
import { Ref, ref, watch, useSlots, computed, ComputedRef } from "vue";
import { useI18n } from "../../language";
export type MODE = "border" | "background" | "none";
export interface PageOtionInfo {
  resetLeft?: number[];
  resetRight?: number[];
}
export interface PageProps {
  total: number;
  limit?: number;
  theme?: string;
  pages?: number;
  limits?: number[];
  simple?: boolean;
  modelValue?: number;
  hideOnSinglePage?: boolean;
  // mode?: MODE;
  disabled?: boolean;
  layout?: string[];
}
export interface IsLayoutChild {
  count?: boolean;
  limits?: boolean;
  next?: boolean;
  page?: boolean;
  prev?: boolean;
  refresh?: boolean;
  skip?: boolean;
}
const props = withDefaults(defineProps<PageProps>(), {
  limit: 10,
  pages: 5,
  modelValue: 1,
  total: 0,
  simple: false,
  disabled: false,
  hideOnSinglePage: false,
  limits: () => [10, 20, 30, 40, 50],
  layout: () => ["prev", "page", "next", "limits"],
});

const { t } = useI18n();
const slots = useSlots();
const limits = ref(props.limits);
const groups = ref(props.pages);
const calcLayout = ref(props.layout);
const currentPage: Ref<number> = ref(props.modelValue);
const inlimit = ref(props.limit);
const emit = defineEmits(["update:modelValue", "change", "update:limit"]);
const iconPrevHover = ref<boolean>(true);
const iconNextHover = ref<boolean>(true);
let pageOpionData = ref<PageOtionInfo>({
  resetLeft: [],
  resetRight: [],
});
const jumpNumber = ref(props.modelValue);
const simple = computed(() => props.simple);
const disabled: Ref<boolean> = ref(props.disabled);
const getHideOnSinglePage: ComputedRef<boolean> = computed(() => {
  return !(getPage.value < 2 && props.hideOnSinglePage);
});
const getLayout: ComputedRef<IsLayoutChild> = computed(() => {
  return calcLayout.value.reduce((init, val) => {
    init = {
      [val]: true,
      ...init,
    };
    return init;
  }, {});
});
// 分页
const getPage = computed(() => Math.ceil(props.total / inlimit.value));
const setPage = computed(() => {
  let joinPage = [];
  // 解释如下, 向上取值(当前值 + 1)/要连续出现的页数 如果等于1, 则代表从最小值为1,
  // 这里加1进行边界处理, 当前值等于要连续出现的页数时, 页数最小值不从1开始, 这种方式代表一种约定吧。
  // 如当前值 4, 连续出现的页数 为5时, 一定要满足从1开始取5个。
  if (groups.value <= 0) {
    groups.value = 1;
  }
  const index =
    getPage.value > groups.value
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
          return max > getPage.value ? getPage.value : max;
        })()
      : groups.value;
  // 当 (最大值 减去最小值 + 1) 小于连续出现的页数 则代表 不满足连续出现的页数
  // 故而 进行开始值 = 结束值 - 续出现的页数
  // 例子 总页数11 当前值  10 , 连续出现的页数为4   应该为 8 9 10 11, 当前 start 为9 , end - 连续出现的页数 =  11 - 4 = 7 + 1
  if (end > getPage.value) {
    end = getPage.value;
  }
  if (getPage.value > groups.value) {
    if (end - start < groups.value - 1) {
      start = end - groups.value + 1;
    }
  }
  if (currentPage.value > getPage.value) {
    currentPage.value = getPage.value;
  }
  // 不包括 1 和 start
  pageOpionData.value.resetLeft = Array.from({ length: start - 2 }).map(
    (_, index) => index + 2
  );
  pageOpionData.value.resetRight = Array.from({
    length: getPage.value - end - 1,
  }).map((_, index) => end + index + 1);
  for (let index = start; index <= end; index++) {
    joinPage.push(index);
  }
  return joinPage;
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
    calcLayout.value = props.layout;
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
// 分页事件
const handlePage = (page: number) => {
  if (disabled.value) return;
  if (page <= 0) {
    page = 1;
  }
  if (page >= getPage.value) {
    page = getPage.value;
  }
  iconNextHover.value = true;
  iconPrevHover.value = true;
  currentPage.value = page;
};
// 下一页
const handleNext = () => {
  if (disabled.value) return;
  if (currentPage.value === getPage.value) {
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
// 国际化分页文字
const getLabel = (page: number) => {
  const usePage = t("page.item") + "/" + t("page.page");
  return `${page} ${usePage}`;
};

const handleBlur = () => {
  if (simple.value) {
    if (currentPage.value >= getPage.value) {
      currentPage.value = getPage.value;
    }
    if (currentPage.value <= 1) {
      currentPage.value = 1;
    }
  } else {
    if (+jumpNumber.value >= getPage.value) {
      jumpNumber.value = getPage.value;
    }
    if (+jumpNumber.value < 1) {
      jumpNumber.value = 1;
    }
  }
};
const refresh = () => {
  emit("change", { current: currentPage.value, limit: inlimit.value });
};
const handleJumpPage = () => {
  handlePage(+jumpNumber.value);
};
</script>

<template>
  <div
    v-if="getHideOnSinglePage"
    :class="['layui-page', disabled ? 'is-disabled' : '']"
  >
    <!-- simple -->
    <template v-if="!simple">
      <span class="layui-page-total-text" v-if="getLayout.count">
        {{ t("page.total") }} {{ getPage }} {{ t("page.item") }}
      </span>
      <div
        v-if="getLayout.prev"
        class="layui-page-prev"
        @click="handlePrev"
        :class="[
          {
            'is-disabled': currentPage <= 1,
          },
        ]"
      >
        <slot name="prev">{{ t("page.previous") }}</slot>
      </div>
      <ul class="layui-pager" v-if="getLayout.page">
        <li
          v-if="setPage[0] !== 1"
          @click="handlePage(1)"
          :data-page="currentPage"
          :class="[
            'layui-page-number',
            {
              [theme ? 'layui-bg-' + theme : '']: 1 === currentPage,
              'is-active': 1 === currentPage,
            },
          ]"
        >
          1
        </li>
        <template v-if="setPage[0] > 2">
          <lay-dropdown ref="manualRef" trigger="hover" placement="bottom">
            <li
              class="layui-page-number layui-page-left-number"
              @mouseleave="iconPrevHover = true"
              @mouseenter="iconPrevHover = false"
              @click="handlePage(currentPage - 3)"
            >
              <lay-icon
                :type="iconPrevHover ? 'layui-icon-more' : 'layui-icon-left'"
                size="12px"
              ></lay-icon>
            </li>
            <template #content>
              <lay-dropdown-menu style="max-height: 140px; overflow-y: auto">
                <lay-dropdown-menu-item
                  v-for="page of pageOpionData.resetLeft"
                  :key="page"
                  @click="handlePage(page)"
                  >{{ page }}</lay-dropdown-menu-item
                >
              </lay-dropdown-menu>
            </template>
          </lay-dropdown>
        </template>

        <li
          v-for="page of setPage"
          :key="page"
          @click="handlePage(page)"
          :data-page="page"
          :class="[
            'layui-page-number',
            {
              [theme ? 'layui-bg-' + theme : '']: page === currentPage,
              'is-active': page === currentPage,
            },
          ]"
        >
          {{ page }}
        </li>

        <template v-if="setPage[setPage.length - 1] < getPage - 1">
          <lay-dropdown trigger="hover" placement="bottom">
            <li
              class="layui-page-number layui-page-right-number"
              @mouseleave="iconNextHover = true"
              @mouseenter="iconNextHover = false"
              @click="handlePage(currentPage + 3)"
            >
              <lay-icon
                :type="iconNextHover ? 'layui-icon-more' : 'layui-icon-right'"
                size="12px"
              ></lay-icon>
            </li>
            <template #content>
              <lay-dropdown-menu style="max-height: 140px; overflow-y: auto">
                <lay-dropdown-menu-item
                  v-for="page of pageOpionData.resetRight"
                  :key="page"
                  @click="handlePage(page)"
                  >{{ page }}</lay-dropdown-menu-item
                >
              </lay-dropdown-menu>
            </template>
          </lay-dropdown>
        </template>
        <li
          v-if="setPage[setPage.length - 1] !== getPage"
          :data-page="getPage"
          :class="[
            'layui-page-number',
            {
              [theme ? 'layui-bg-' + theme : '']: getPage === currentPage,
              'is-active': getPage === currentPage,
            },
          ]"
          @click="handlePage(getPage)"
        >
          {{ getPage }}
        </li>
      </ul>
      <div
        v-if="getLayout.next"
        class="layui-page-next"
        :class="[
          {
            'is-disabled': getPage <= currentPage,
          },
        ]"
        @click="handleNext"
      >
        <slot name="next">{{ t("page.next") }}</slot>
      </div>
      <div class="layui-page-options">
        <div class="layui-page-options-number" v-if="getLayout.limits">
          <lay-select
            v-model="inlimit"
            placeholder="请选择"
            :disabled="disabled"
          >
            <lay-select-option
              :value="option"
              :label="getLabel(option)"
              v-for="option of limits"
              :key="option"
            ></lay-select-option>
          </lay-select>
        </div>
        <div
          @click="refresh"
          class="layui-page-refresh"
          v-if="getLayout.refresh"
        >
          <lay-icon type="layui-icon-refresh"></lay-icon>
        </div>
        <div class="layui-page-jumper" v-if="getLayout.skip">
          {{ t("page.goTo") }}
          <lay-input
            :disabled="disabled"
            @blur="handleBlur"
            type="number"
            v-model="jumpNumber"
          ></lay-input>
          {{ t("page.page") }}
          <lay-button :disabled="disabled" @click="handleJumpPage" size="xs"
            >确定</lay-button
          >
        </div>
      </div>
    </template>
    <template v-else>
      <div class="layui-page-prev" @click="handlePrev">
        <lay-icon type="layui-icon-left" size="16px"></lay-icon>
      </div>
      <div class="layui-pager-jump">
        <lay-input
          :disabled="disabled"
          @blur="handleBlur"
          type="number"
          v-model="currentPage"
          style="height: 30px"
        ></lay-input>
        <span class="layui-simple-page-slash">／</span>
        <span>{{ getPage }}</span>
      </div>
      <div class="layui-page-next" @click="handleNext">
        <lay-icon type="layui-icon-right" size="16px"></lay-icon>
      </div>
    </template>
  </div>
</template>
