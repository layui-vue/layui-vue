<template>
  <aside :class="classAside">
    <div class="lay-aside-top">
      <lay-button
        type="primary"
        size="xs"
        :class="classAsideBtn"
        @click="handlerBtnClick()"
      >
        <lay-icon :type="iconType" size="40"> </lay-icon>
      </lay-button>
    </div>
    <lay-scroll :thumbWidth="0">
      <ul>
        <li
          v-for="(anchor, index) in anchorList"
          :key="index"
          class="lay-aside-list"
          :class="{ active: index === activeIndex }"
          @click.prevent="handlerListItemClick(index, anchor)"
        >
          <a
            :href="`#${anchor}`"
            class="lay-aside-link"
            :class="{ active: index === activeIndex }"
            >{{ anchor }}</a
          >
        </li>
      </ul>
    </lay-scroll>
  </aside>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, watch } from "vue";

const props = defineProps<{
  anchors?: Array<string> | string;
  currIndex: number;
  show: boolean;
}>();

let activeIndex = ref<number>(0);
const show = ref<boolean>(props.show);
const iconType = ref<string>("layui-icon-right");
const anchors: string | string[] | undefined = props.anchors;
const scrollTop = ref<number>(0);
const scrollRefEl = shallowRef<HTMLElement | undefined>(undefined);
let enableAnimation = false;

const anchorList = computed(() => {
  return typeof anchors === "string" ? anchors?.split(",") : anchors;
});

const classAside = computed(() => [
  "lay-aside",
  { "lay-aside-animation": enableAnimation },
  { "lay-aside-collapse": !show.value },
]);

const classAsideBtn = computed(() => {
  let classBtn = [];
  if (enableAnimation) {
    classBtn = [
      "lay-aside-collapse-btn",
      "lay-aside-animation",
      { "lay-aside-collapse-btn-collapse": !show.value },
    ];
  } else {
    classBtn = [
      "lay-aside-collapse-btn",
      { "lay-aside-collapse-btn-collapse": !show.value },
    ];

    enableAnimation = true;
  }
  return classBtn;
});

const handlerBtnClick = () => {
  show.value = !show.value;
};

const handlerListItemClick = (index: number, id: string) => {
  activeIndex.value = index;
  scrollToTitle(id);
};

/**锚点标签跟随滚动高亮 */
const handlerScroll = () => {
  // 距离顶部 90 改变 activeIndex
  scrollTop.value = getScrollTop(scrollRefEl.value) + 90;
  anchorList.value?.forEach((item, index) => {
    const elOffsetTop = document.getElementById(item)?.offsetTop;
    if (elOffsetTop) {
      if (index === 0 && scrollTop.value < elOffsetTop) {
        activeIndex.value = 0;
      } else if (scrollTop.value >= elOffsetTop) {
        activeIndex.value = index;
      }
    }
  });
};

const handlerCollapse = () => {
  iconType.value = show.value ? "layui-icon-right" : "layui-icon-left";
  // @ts-ignore
  scrollRefEl.value!.firstElementChild!.style.marginRight = show.value
    ? "180px"
    : "0px";
};

watch(show, () => {
  handlerCollapse();
});

onMounted(() => {
  // @ts-ignore TODO 封装 hooks
  scrollRefEl.value = document.querySelector(".layui-body");
  if (!scrollRefEl.value) {
    throw new Error(`scroll element is not existed: ".layui-body"`);
  }
  scrollRefEl.value.scrollTop = 0;
  scrollRefEl.value?.addEventListener("scroll", throttle(handlerScroll, 500));
  // 如果已折叠,关闭组件初始渲染时的动画,然后自动开启
  // @ts-ignore
  show.value =
    // @ts-ignore
    scrollRefEl.value!.firstElementChild!.style.marginRight !== "0px";
  enableAnimation = show.value;
});

/**获取滚动高度 */
const getScrollTop = (el: HTMLElement | undefined): number => {
  return el
    ? el.scrollTop
    : window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
};

/**平滑滚动 */
const scrollToTitle = (id: string): void => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};

const throttle = (func: Function, wait: number) => {
  var timer: any = null;
  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, wait);
    }
  };
};
</script>

<style lang="less" scoped>
.lay-aside {
  position: fixed;
  top: 65px;
  right: 17px;
  box-sizing: border-box;
  width: 180px;
  padding: 0 25px;
  border-left: 1px solid rgb(229 230 235);
  transition: none;
  -webkit-transition: none;
  height: calc(100% - 60px);
}

.lay-aside-collapse {
  right: -180px;
  opacity: 0.7;
}

.lay-aside-top {
  height: 29px;
}

.lay-aside-link {
  display: inline-block;
  padding: 1px 4px;
  color: grey;
  font-size: 13px;
  line-height: 2;
  max-width: 140px;
  min-width: 68px;
  text-decoration: none;
  background-color: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
}
.lay-aside-list {
  position: relative;
  margin: 5px 0px 0px 4px;
  padding-left: 2px;
  max-width: 140px;
  border-radius: 2px;
  list-style: none;
  &:hover {
    background-color: #f6f6f6 !important;
    color: var(--global-checked-color);
  }
  &:active {
    background-color: #f6f6f6 !important;
    color: var(--global-checked-color);
  }
  &.active {
    background-color: #f6f6f6 !important;
    * {
      color: var(--global-checked-color);
    }
  }
}

.lay-aside-collapse-btn {
  position: fixed;
  right: 197px;
  top: calc(50% - 20px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 40px;
  background-color: #f6f6f6;
  border-radius: 0px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: rgb(229 230 235) 1px solid;
  border-right: none;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  transition: none;
  -webkit-transition: none;
  color: rgba(0, 0, 0, 0.8);
  &:hover {
    background-color: #e2e2e2;
  }
}
.lay-aside-collapse-btn-collapse {
  right: 0px;
}

.lay-aside-animation {
  transition: right 200ms;
  -webkit-transition: right 200ms;
}

@media screen and (max-width: 768px) {
  .lay-aside {
    width: 100px !important;
  }
  .lay-aside-collapse-btn {
    right: 98px;
  }
  .lay-aside-collapse-btn-collapse {
    right: 15px;
  }
  .lay-aside-list {
    max-width: 68px;
  }
}
</style>
