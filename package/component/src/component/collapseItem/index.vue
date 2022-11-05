<script lang="ts">
export default {
  name: "LayCollapseItem",
};
</script>

<script setup lang="ts">
import LayTransition from "../transition/index.vue";
import { withDefaults, inject, computed, ref } from "vue";

export interface CollapseItemProps {
  id: number | string;
  title: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<CollapseItemProps>(), {
  disabled: false,
});

const { accordion, activeValues, emit, collapseTransition } = inject(
  "layCollapse"
) as any;

let isShow = computed(() => {
  return activeValues.value.includes(props.id);
});

const showHandle = function () {
  if (props.disabled) {
    return;
  }
  const _isShow = isShow.value;
  // 手风琴效果
  if (accordion) {
    activeValues.value = !_isShow ? [props.id] : [];
  } else if (_isShow) {
    // 普通折叠面板 --> 折叠
    activeValues.value.splice(activeValues.value.indexOf(props.id), 1);
  } else {
    // 普通折叠面板 --> 展开
    activeValues.value.push(props.id);
  }
  emit(
    "update:modelValue",
    accordion ? activeValues.value[0] || null : activeValues.value
  );
  emit("change", props.id, !_isShow, activeValues.value);
};
</script>

<template>
  <div class="layui-colla-item">
    <h2
      :class="['layui-colla-title', { 'layui-disabled': disabled }]"
      @click="showHandle"
    >
      <slot name="title" :props="props">{{ title }}</slot>
      <i
        class="layui-icon layui-colla-icon layui-icon-right"
        :style="{
          transform: isShow ? 'rotate(90deg)' : 'none',
          transition: collapseTransition ? 'all 0.2s ease 0s' : '',
        }"
      ></i>
    </h2>
    <lay-transition :enable="collapseTransition">
      <div v-if="isShow">
        <div class="layui-colla-content">
          <p>
            <slot :props="props"></slot>
          </p>
        </div>
      </div>
    </lay-transition>
  </div>
</template>
