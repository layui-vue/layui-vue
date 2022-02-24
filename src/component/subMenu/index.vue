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

export interface LaySubMenuProps {
  id: string;
  title?: string;
}

const slots = useSlots();

const props = defineProps<LaySubMenuProps>();

const isTree: Ref<boolean> = inject("isTree") as Ref<boolean>;
const selectedKey: Ref<string> = inject("selectedKey") as Ref<string>;
const openKeys: Ref<string[]> = inject("openKeys") as Ref<string[]>;

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
  if (openKeys.value.includes(props.id)) {
    openKeys.value.splice(openKeys.value.indexOf(props.id), 1);
  } else {
    openKeys.value.push(props.id);
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
  <li
    class="layui-nav-item"
    :class="[isOpen && isTree ? 'layui-nav-itemed' : '']"
  >
    <a href="javascript:void(0)" @click="openHandle()">
      <slot v-if="slots.title" name="title"></slot>
      <span v-else>{{ title }}</span>
      <i
        :class="[isOpen && !isTree ? 'layui-nav-mored' : '']"
        class="layui-icon layui-icon-down layui-nav-more"
      ></i>
    </a>
    <dl
      class="layui-nav-child"
      ref="subMenuRef"
      :class="[
        position,
        isOpen && !isTree ? 'layui-show' : '',
        !isTree ? 'layui-anim layui-anim-upbit' : '',
      ]"
    >
      <slot></slot>
    </dl>
  </li>
</template>
