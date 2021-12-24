<template>
  <li
    v-if="slots.default"
    class="layui-nav-item"
    :class="[openKeys.includes(id) && isTree ? 'layui-nav-itemed' : '']"
  >
    <a href="javascript:void(0)" @click="openHandle">
      {{ title }}
      <i class="layui-icon layui-icon-down layui-nav-more" />
    </a>
    <dl
      class="layui-nav-child"
      :class="[
        openKeys.includes(id) && !isTree ? 'layui-show' : '',
        !isTree ? 'layui-anim layui-anim-upbit' : '',
      ]"
    >
      <slot />
    </dl>
  </li>

  <li
    v-else
    class="layui-nav-item"
    :class="[selectedKey === id ? 'layui-this' : '']"
    @click="selectHandle()"
  >
    <slot v-if="slots.title" name="title"></slot>
    <a v-else href="javascript:void(0)">
      {{ title }}
    </a>
  </li>
</template>

<script setup name="LayMenuItem" lang="ts">
import { defineProps, inject, Ref, ref, useSlots } from "vue";
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

const selectHandle = function () {
  selectedKey.value = props.id;
};
</script>
