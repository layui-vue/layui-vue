<script lang="ts">
export default {
  name: "LaySubMenu",
};
</script>

<script setup lang="ts">
import { computed, defineProps, inject, Ref, useSlots } from "vue";

const slots = useSlots();

const props = defineProps<{
  id: string;
  title: string;
}>();

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
      :class="[
        isOpen && !isTree ? 'layui-show' : '',
        !isTree ? 'layui-anim layui-anim-upbit' : '',
      ]"
    >
      <slot></slot>
    </dl>
  </li>
</template>
