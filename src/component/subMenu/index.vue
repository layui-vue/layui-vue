<script lang="ts">
export default {
  name: "LaySubMenu",
};
</script>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, Ref, useSlots, watch } from "vue";

export interface LaySubMenuProps {
  id: string;
  title?: string;
}

const slots = useSlots();

const props = defineProps<LaySubMenuProps>();

const isTree = inject("isTree");
const selectedKey: Ref<string> = inject("selectedKey") as Ref<string>;
const openKeys: Ref<string[]> = inject("openKeys") as Ref<string[]>;

const openHandle = function () {
  if (openKeys.value.includes(props.id)) {
    openKeys.value.splice(openKeys.value.indexOf(props.id), 1);
  } else {
    openKeys.value.push(props.id);
  }
};

const isOpen = computed(() => {
  return openKeys.value.includes(props.id);
});

// 菜单显示位置
const layuiNavChild = ref<HTMLElement>();
const position = ref<String>();
watch(isOpen, () => {
  if (isOpen.value && position.value !== 'left-nav') {
    setTimeout(setPosition, 0);
  }
});
const setPosition = function() {
  if (!isTree || !layuiNavChild.value) {
    return;
  }
  const offsetWidth = layuiNavChild.value.offsetWidth;
  if (window.innerWidth < layuiNavChild.value.getBoundingClientRect().left + offsetWidth + 10) {
    position.value = 'left-nav';
  } else {
    position.value = '';
  }
}
window.addEventListener('resize', setPosition);
onBeforeUnmount(()=>window.removeEventListener('resize', setPosition));
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
      ref="layuiNavChild"
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
