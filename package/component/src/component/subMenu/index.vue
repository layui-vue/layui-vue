<script lang="ts">
export default {
  name: "LaySubMenu",
};
</script>

<script setup lang="ts">
import {
  computed,
  inject,
  onBeforeUnmount,
  ref,
  Ref,
  useSlots,
  watch,
} from "vue";
import { onClickOutside } from "@vueuse/core";
import LayTransition from "../transition/index.vue";

export interface LaySubMenuProps {
  id: string;
  title?: string;
}

const slots = useSlots();
const props = defineProps<LaySubMenuProps>();

const isTree: Ref<boolean> = inject("isTree") as Ref<boolean>;
const selectedKey: Ref<string> = inject("selectedKey") as Ref<string>;
const openKeys: Ref<string[]> = inject("openKeys") as Ref<string[]>;
const isCollapse: Ref<boolean> = inject("isCollapse") as Ref<boolean>;
const isCollapseTransition: Ref<boolean> = inject(
  "isCollapseTransition"
) as Ref<boolean>;

const isOpen = computed(() => {
  return openKeys.value.includes(props.id);
});

const subMenuRef = ref<HTMLElement>();
const position = ref<String>();

watch(isOpen, () => {
  if (isOpen.value && position.value !== "left-nav") {
    setTimeout(setPosition, 0);
  }
});

const openHandle = function () {
  if (!isCollapse.value) {
    let newOpenKeys = [...openKeys.value];
    if (openKeys.value.includes(props.id)) {
      newOpenKeys.splice(newOpenKeys.indexOf(props.id), 1);
    } else {
      newOpenKeys.push(props.id);
    }
    openKeys.value = newOpenKeys;
  }
};

const setPosition = function () {
  if (!isTree.value || !subMenuRef.value) {
    return;
  }
  const offsetWidth = subMenuRef.value.offsetWidth;
  if (
    window.innerWidth <
    subMenuRef.value.getBoundingClientRect().left + offsetWidth + 10
  ) {
    position.value = "left-nav";
  } else {
    position.value = "";
  }
};

onClickOutside(subMenuRef, (event: PointerEvent) => {
  if (!isTree.value) {
    let index = openKeys.value.indexOf(props.id);
    if (index != -1) {
      openKeys.value.splice(index, 1);
    }
  }
});

window.addEventListener("resize", setPosition);
onBeforeUnmount(() => window.removeEventListener("resize", setPosition));
</script>

<template>
  <li class="layui-nav-item">
    <a href="javascript:void(0)" @click="openHandle()">
      <!-- 图标 -->
      <i>
        <slot v-if="slots.icon" name="icon"></slot>
      </i>
      <!-- 标题 -->
      <span>
        <slot v-if="slots.title" name="title"></slot>
      </span>
      <!-- 扩展 -->
      <i
        :class="[isOpen ? 'layui-nav-mored' : '']"
        class="layui-icon layui-icon-down layui-nav-more"
      ></i>
    </a>
    <template v-if="isTree">
      <lay-transition :enable="isCollapseTransition">
        <div v-if="isOpen">
          <dl class="layui-nav-child">
            <slot></slot>
          </dl>
        </div>
      </lay-transition>
    </template>
    <template v-else>
      <dl
        ref="subMenuRef"
        class="layui-nav-child layui-anim layui-anim-upbit"
        :class="[{ 'layui-show': isOpen }, position]"
      >
        <slot></slot>
      </dl>
    </template>
  </li>
</template>
